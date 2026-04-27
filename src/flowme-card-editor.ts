import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type {
  FlowmeConfig,
  FlowConfig,
  HomeAssistant,
  NodeConfig,
  NodePosition,
  OverlayConfig,
} from './types.js';
import { validateConfig } from './validate-config.js';
import { parseAspectRatio } from './utils.js';
import { UndoStack } from './editor/undo-stack.js';
import {
  addFlow,
  addNode,
  addOverlay,
  clampPercent,
  deleteFlow,
  deleteNode,
  deleteOverlay,
  deleteWaypoint,
  deleteWeatherState,
  insertWaypoint,
  moveNode,
  moveOverlay,
  moveWaypoint,
  renameWeatherState,
  setBackgroundDefault,
  setOverlayCardConfig,
  setOverlayOpacity,
  setOverlaySize,
  setOverlayVisible,
  setTransitionDuration,
  setWeatherEntity,
  setWeatherStateImage,
  snapToGrid,
} from './editor/commands.js';
import './editor/toolbar.js';
import type { ToolbarAction } from './editor/toolbar.js';
import { suggestPath } from './pathfinding/index.js';
import type { Point } from './pathfinding/types.js';

type DragTarget =
  | { kind: 'node'; id: string }
  | { kind: 'waypoint'; flowId: string; index: number }
  | { kind: 'overlay'; id: string }
  | { kind: 'overlay-resize'; id: string; startSize: { width: number; height: number }; startPx: { x: number; y: number } };

type PendingAction =
  | null
  | { kind: 'add-node' }
  | { kind: 'add-overlay'; overlayType: 'custom' }
  | { kind: 'add-flow'; step: 'pick-from' }
  | { kind: 'add-flow'; step: 'pick-to'; fromId: string };

interface SuggestPreview {
  flowId: string;
  waypoints: Point[];
  edgesUsable: boolean;
  elapsedMs: number;
}

/**
 * v0.2 editor — full drag + undo/redo with waypoints, snap, and keyboard
 * shortcuts. Flows between nodes are rendered as dashed connectors so the
 * user can see topology while editing. Right-click on a waypoint or node
 * opens a context menu (delete / rename). Click on an empty flow segment to
 * insert a waypoint at that point.
 *
 * Keyboard:
 *   ⌘Z / Ctrl+Z          — undo
 *   ⌘⇧Z / Ctrl+Shift+Z   — redo
 *   Ctrl+Y               — redo (Windows convention)
 *   Shift (held during drag) — snap to 8% grid
 */
@customElement('flowme-card-editor')
export class FlowmeCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: FlowmeConfig;
  @state() private pending: PendingAction = null;
  @state() private previewMode = false;
  @state() private selectedNodeId: string | null = null;
  @state() private selectedFlowId: string | null = null;
  @state() private selectedOverlayId: string | null = null;
  @state() private customConfigDraft = '';
  @state() private customConfigError = '';
  @state() private statusMessage = '';
  @state() private errorMessage = '';
  @state() private canUndo = false;
  @state() private canRedo = false;
  @state() private undoLabel = '';
  @state() private redoLabel = '';
  @state() private suggestPreview: SuggestPreview | null = null;
  @state() private suggestBusy = false;

  private readonly stageRef: Ref<HTMLDivElement> = createRef();
  private undoStack = new UndoStack((next) => this.applyConfig(next, /*commitToHa*/ false));
  private unsubscribe: (() => void) | null = null;
  private dragPointerId: number | null = null;
  private dragTarget: DragTarget | null = null;
  private dragStartConfig: FlowmeConfig | null = null;
  private dragShiftHeld = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState());
    window.addEventListener('keydown', this.onKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
    window.removeEventListener('keydown', this.onKeyDown);
  }

  setConfig(config: unknown): void {
    try {
      this.config = validateConfig(config);
      this.undoStack.clear();
      this.errorMessage = '';
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : String(err);
    }
  }

  override render(): TemplateResult {
    if (!this.config) {
      return html`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? html`<pre class="error">${this.errorMessage}</pre>` : nothing}
        </div>
      `;
    }

    const aspect = parseAspectRatio(this.config.aspect_ratio) ?? 16 / 10;
    const paddingTop = `${(1 / aspect) * 100}%`;
    const bgUrl = this.config.background.default;

    return html`
      <div class="wrap">
        <flowme-editor-toolbar
          .canUndo=${this.canUndo}
          .canRedo=${this.canRedo}
          .previewMode=${this.previewMode}
          .undoLabel=${this.undoLabel}
          .redoLabel=${this.redoLabel}
          .suggestPathDisabled=${this.selectedFlowId === null || this.suggestBusy}
          @toolbar-action=${this.onToolbarAction}
        ></flowme-editor-toolbar>
        ${this.statusMessage ? html`<div class="status">${this.statusMessage}</div>` : nothing}
        <div
          class=${`stage ${
            this.pending?.kind === 'add-node'
              ? 'mode-add-node'
              : this.pending?.kind === 'add-overlay'
                ? 'mode-add-overlay'
                : ''
          }`}
          style=${`padding-top: ${paddingTop};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${ref(this.stageRef)}
        >
          <div
            class="background"
            style=${bgUrl ? `background-image: url('${bgUrl}');` : ''}
          ></div>
          <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.config.flows.map((f) => this.renderFlowConnector(f))}
          </svg>
          ${this.config.flows.map((f) => this.renderWaypointHandles(f))}
          ${(this.config.overlays ?? []).map((o) => this.renderOverlayHandle(o))}
          ${this.config.nodes.map((n) => this.renderHandle(n))}
          ${this.renderSuggestPreview()}
        </div>
        ${this.renderSuggestBar()}
        ${this.renderInspector()}
        ${this.renderWeatherPanel()}
        ${this.errorMessage ? html`<pre class="error">${this.errorMessage}</pre>` : nothing}
      </div>
    `;
  }

  // -- rendering helpers --

  private renderFlowConnector(flow: FlowConfig): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const nodes = new Map(this.config.nodes.map((n) => [n.id, n]));
    const from = nodes.get(flow.from_node);
    const to = nodes.get(flow.to_node);
    if (!from || !to) return nothing;
    const points: NodePosition[] = [from.position, ...flow.waypoints, to.position];
    const isSelected = flow.id === this.selectedFlowId;
    const segments = [] as TemplateResult[];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      segments.push(html`
        <line
          class=${`segment ${isSelected ? 'selected' : ''}`}
          x1=${a.x}
          y1=${a.y}
          x2=${b.x}
          y2=${b.y}
          data-flow-id=${flow.id}
          data-segment-index=${i}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return html`<g>${segments}</g>`;
  }

  private renderWaypointHandles(flow: FlowConfig): TemplateResult[] {
    return flow.waypoints.map(
      (wp, index) => html`
        <div
          class="waypoint"
          data-flow-id=${flow.id}
          data-waypoint-index=${index}
          style=${`left: ${wp.x}%; top: ${wp.y}%;`}
          @pointerdown=${this.onHandlePointerDown}
          @pointermove=${this.onHandlePointerMove}
          @pointerup=${this.onHandlePointerUp}
          @pointercancel=${this.onHandlePointerUp}
          @contextmenu=${this.onWaypointContextMenu}
          @click=${this.stopClick}
        ></div>
      `,
    );
  }

  private renderOverlayHandle(overlay: OverlayConfig): TemplateResult {
    const selected = overlay.id === this.selectedOverlayId;
    const w = overlay.size?.width ?? 14;
    const h = overlay.size?.height ?? 8;
    return html`
      <div
        class=${`overlay-handle ${selected ? 'selected' : ''} overlay-${overlay.type}`}
        data-overlay-id=${overlay.id}
        style=${`left: ${overlay.position.x}%; top: ${overlay.position.y}%; width: ${w}%; height: ${h}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip">
          ${overlay.id}
          <span class="overlay-type-badge">${overlay.type}</span>
        </div>
        ${selected
          ? html`<div
              class="overlay-resize"
              data-overlay-id=${overlay.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>`
          : nothing}
      </div>
    `;
  }

  private renderHandle(node: NodeConfig): TemplateResult {
    const selected = node.id === this.selectedNodeId;
    return html`
      <div
        class=${`handle ${selected ? 'selected' : ''}`}
        data-node-id=${node.id}
        style=${`left: ${node.position.x}%; top: ${node.position.y}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span class="handle-dot"></span>
        ${node.label ? html`<span class="handle-label">${node.label}</span>` : nothing}
      </div>
    `;
  }

  /**
   * Render an <ha-entity-picker> bound to `value` with an onChange callback
   * receiving the chosen entity id (or empty string). Falls back to a plain
   * <input> with a <datalist> of matching entities when the picker element
   * isn't registered yet (happens in some HA versions before card helpers
   * load). The picker fires `value-changed`; the input fires `change`.
   */
  private renderEntityPicker(
    value: string,
    onChange: (entityId: string) => void,
    opts?: { includeDomains?: string[]; placeholder?: string },
  ): TemplateResult {
    const hasPicker =
      typeof window !== 'undefined' &&
      !!window.customElements &&
      !!window.customElements.get('ha-entity-picker');
    const domains = opts?.includeDomains ?? [];
    const placeholder = opts?.placeholder ?? 'entity.id';

    if (hasPicker) {
      const handler = (e: CustomEvent<{ value?: string }>) => {
        e.stopPropagation();
        onChange((e.detail?.value ?? '').trim());
      };
      return html`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${value}
          .includeDomains=${domains}
          @value-changed=${handler}
        ></ha-entity-picker>
      `;
    }

    // Fallback: datalist of same-domain entities from hass.states.
    const states = this.hass?.states ?? {};
    const listId = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`;
    const options = Object.keys(states)
      .filter((id) => {
        if (domains.length === 0) return true;
        const domain = id.split('.')[0];
        return !!domain && domains.includes(domain);
      })
      .sort();
    const handler = (e: Event) => {
      onChange((e.target as HTMLInputElement).value.trim());
    };
    return html`
      <input
        type="text"
        list=${listId}
        placeholder=${placeholder}
        .value=${value}
        @change=${handler}
      />
      <datalist id=${listId}>
        ${options.map((id) => html`<option value=${id}></option>`)}
      </datalist>
    `;
  }

  private renderInspector(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    if (this.selectedNodeId) {
      const node = this.config.nodes.find((n) => n.id === this.selectedNodeId);
      if (!node) return nothing;
      return html`
        <div class="inspector">
          <h4>Node: ${node.id}</h4>
          <label>
            Label
            <input
              type="text"
              .value=${node.label ?? ''}
              @change=${(e: Event) => this.onNodeLabelChange(node.id, e)}
            />
          </label>
          <label>
            Entity
            ${this.renderEntityPicker(
              node.entity ?? '',
              (value) => this.setNodeEntity(node.id, value),
              { includeDomains: ['sensor', 'binary_sensor', 'input_number', 'number'] },
            )}
          </label>
          <button class="danger" @click=${() => this.removeNode(node.id)}>Delete node</button>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const flow = this.config.flows.find((f) => f.id === this.selectedFlowId);
      if (!flow) return nothing;
      return html`
        <div class="inspector">
          <h4>Flow: ${flow.id}</h4>
          <div class="row">
            <span>${flow.from_node} → ${flow.to_node}</span>
          </div>
          <label>
            Entity
            ${this.renderEntityPicker(
              flow.entity,
              (value) => this.setFlowEntity(flow.id, value),
              { includeDomains: ['sensor', 'input_number', 'number'] },
            )}
          </label>
          <div class="row">
            <span>${flow.waypoints.length} waypoint(s)</span>
          </div>
          <button class="danger" @click=${() => this.removeFlow(flow.id)}>Delete flow</button>
        </div>
      `;
    }
    if (this.selectedOverlayId) {
      const overlay = (this.config.overlays ?? []).find((o) => o.id === this.selectedOverlayId);
      if (!overlay) return nothing;
      return this.renderOverlayInspector(overlay);
    }
    return nothing;
  }

  private renderOverlayInspector(overlay: OverlayConfig): TemplateResult {
    const size = overlay.size ?? { width: 20, height: 15 };
    const visible = overlay.visible !== false;
    const opacity = overlay.opacity ?? 1;
    return html`
      <div class="inspector overlay-inspector">
        <h4>Overlay: ${overlay.id}</h4>
        <div class="row size-row">
          <label>
            Width %
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(size.width)}
              @change=${(e: Event) => this.onOverlaySizeChange(overlay.id, 'width', e)}
            />
          </label>
          <label>
            Height %
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(size.height)}
              @change=${(e: Event) => this.onOverlaySizeChange(overlay.id, 'height', e)}
            />
          </label>
        </div>
        <label class="toggle-label">
          Visible
          <input
            type="checkbox"
            .checked=${visible}
            @change=${(e: Event) => {
              if (!this.config) return;
              const checked = (e.target as HTMLInputElement).checked;
              const prev = this.config;
              const next = setOverlayVisible(prev, overlay.id, checked);
              this.pushPatch(prev, next, `toggle overlay ${overlay.id} visible`);
            }}
          />
        </label>
        <label>
          Opacity
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            .value=${String(opacity)}
            @change=${(e: Event) => {
              if (!this.config) return;
              const val = parseFloat((e.target as HTMLInputElement).value);
              if (!Number.isFinite(val)) return;
              const prev = this.config;
              const next = setOverlayOpacity(prev, overlay.id, val);
              this.pushPatch(prev, next, `edit overlay ${overlay.id} opacity`);
            }}
          />
          <span>${Math.round(opacity * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(overlay)}
        <button class="danger" @click=${() => this.removeOverlay(overlay.id)}>Delete overlay</button>
      </div>
    `;
  }

  private renderCardConfigEditor(overlay: OverlayConfig): TemplateResult {
    const jsonValue =
      this.customConfigDraft ||
      JSON.stringify(overlay.card ?? { type: 'entity', entity: 'sensor.example_sensor' }, null, 2);
    return html`
      <label>
        Card configuration (any valid HA card YAML)
        <textarea
          rows="8"
          spellcheck="false"
          placeholder="type: entity&#10;entity: sensor.my_sensor"
          .value=${jsonValue}
          @input=${(e: Event) => {
            this.customConfigDraft = (e.target as HTMLTextAreaElement).value;
            this.customConfigError = '';
          }}
        ></textarea>
      </label>
      ${this.customConfigError
        ? html`<div class="custom-config-error">${this.customConfigError}</div>`
        : nothing}
      <p class="hint-sub">
        Any installed HA card type is supported. Examples: entity, tile, gauge,
        picture-entity, custom:mini-graph-card, …
      </p>
      <p class="hint-sub">
        URLs must not use javascript:, vbscript:, data: or file: schemes.
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(overlay.id)}>Apply card config</button>
      </div>
    `;
  }

  // -- weather backgrounds panel --

  private static readonly KNOWN_WEATHER_STATES = [
    'clear-night',
    'cloudy',
    'exceptional',
    'fog',
    'hail',
    'lightning',
    'lightning-rainy',
    'partlycloudy',
    'pouring',
    'rainy',
    'snowy',
    'snowy-rainy',
    'sunny',
    'windy',
    'windy-variant',
  ] as const;

  private renderWeatherPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const bg = this.config.background;
    const stateEntries = Object.entries(bg.weather_states ?? {});
    return html`
      <details class="weather-panel" ?open=${stateEntries.length > 0 || !!bg.weather_entity}>
        <summary>Backgrounds &amp; weather</summary>
        <div class="weather-body">
          <label>
            Default image URL
            <input
              type="text"
              .value=${bg.default}
              @change=${this.onDefaultBgChange}
              placeholder="/local/flowme/house.jpg"
            />
            ${bg.default
              ? html`<img class="weather-thumb" src=${bg.default} alt="default background" />`
              : nothing}
          </label>
          <label>
            Weather entity (optional)
            ${this.renderEntityPicker(
              bg.weather_entity ?? '',
              (value) => this.setWeatherEntityValue(value),
              { includeDomains: ['weather'], placeholder: 'weather.forecast_home' },
            )}
          </label>
          <label>
            Transition duration (ms)
            <input
              type="number"
              min="0"
              step="100"
              .value=${String(bg.transition_duration ?? 2000)}
              @change=${this.onTransitionChange}
            />
          </label>
          <div class="weather-states">
            <div class="weather-states-header">
              <span>State</span>
              <span>Image URL</span>
              <span></span>
            </div>
            ${stateEntries.map(
              ([key, url]) => html`
                <div class="weather-row" data-key=${key}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${key}
                    @change=${(e: Event) => this.onWeatherStateKeyChange(key, e)}
                  />
                  <input
                    type="text"
                    .value=${url}
                    @change=${(e: Event) => this.onWeatherStateUrlChange(key, e)}
                    placeholder="/local/flowme/rainy.jpg"
                  />
                  <div class="weather-row-end">
                    ${url
                      ? html`<img class="weather-thumb" src=${url} alt=${key} />`
                      : nothing}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(key)}>
                      Remove
                    </button>
                  </div>
                </div>
              `,
            )}
            <datalist id="flowme-weather-states">
              ${FlowmeCardEditor.KNOWN_WEATHER_STATES.map(
                (s) => html`<option value=${s}></option>`,
              )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
        </div>
      </details>
    `;
  }

  private onDefaultBgChange = (event: Event): void => {
    if (!this.config) return;
    const value = (event.target as HTMLInputElement).value;
    const prev = this.config;
    const next = setBackgroundDefault(prev, value);
    this.pushPatch(prev, next, 'edit default background');
  };

  private setWeatherEntityValue(value: string): void {
    if (!this.config) return;
    const trimmed = value.trim();
    const prev = this.config;
    const next = setWeatherEntity(prev, trimmed || undefined);
    this.pushPatch(prev, next, 'edit weather entity');
  }

  private onTransitionChange = (event: Event): void => {
    if (!this.config) return;
    const raw = (event.target as HTMLInputElement).value;
    const parsed = Number(raw);
    const prev = this.config;
    const next = setTransitionDuration(prev, Number.isFinite(parsed) ? parsed : undefined);
    this.pushPatch(prev, next, 'edit transition duration');
  };

  private onWeatherStateKeyChange(oldKey: string, event: Event): void {
    if (!this.config) return;
    const newKey = (event.target as HTMLInputElement).value.trim();
    if (!newKey || newKey === oldKey) return;
    const prev = this.config;
    const next = renameWeatherState(prev, oldKey, newKey);
    if (next === prev) return;
    this.pushPatch(prev, next, `rename weather state ${oldKey}→${newKey}`);
  }

  private onWeatherStateUrlChange(key: string, event: Event): void {
    if (!this.config) return;
    const url = (event.target as HTMLInputElement).value;
    const prev = this.config;
    const next = setWeatherStateImage(prev, key, url);
    this.pushPatch(prev, next, `edit weather image ${key}`);
  }

  private onWeatherStateRemove = (key: string): void => {
    if (!this.config) return;
    const prev = this.config;
    const next = deleteWeatherState(prev, key);
    this.pushPatch(prev, next, `remove weather state ${key}`);
  };

  private onWeatherStateAdd = (): void => {
    if (!this.config) return;
    const existing = new Set(Object.keys(this.config.background.weather_states ?? {}));
    const candidate = FlowmeCardEditor.KNOWN_WEATHER_STATES.find((s) => !existing.has(s)) ?? 'custom';
    const prev = this.config;
    const next = setWeatherStateImage(prev, candidate, '');
    this.pushPatch(prev, next, `add weather state ${candidate}`);
  };

  // -- toolbar --

  private onToolbarAction = (event: CustomEvent<{ action: ToolbarAction }>): void => {
    switch (event.detail.action) {
      case 'add-node':
        this.pending = { kind: 'add-node' };
        this.statusMessage = 'Click anywhere on the background to drop a new node.';
        break;
      case 'add-flow':
        this.pending = { kind: 'add-flow', step: 'pick-from' };
        this.statusMessage = 'Click the source node.';
        break;
      case 'add-overlay':
        this.pending = { kind: 'add-overlay', overlayType: 'custom' };
        this.statusMessage = 'Click anywhere on the background to place a custom overlay.';
        break;
      case 'suggest-path':
        void this.runSuggestPath();
        break;
      case 'undo':
        this.undoStack.undo();
        break;
      case 'redo':
        this.undoStack.redo();
        break;
      case 'toggle-preview':
        this.previewMode = !this.previewMode;
        this.statusMessage = this.previewMode
          ? 'Preview: drag and snap suspended until you leave preview mode.'
          : '';
        break;
      case 'save':
        if (this.config) this.commitToHa(this.config);
        this.statusMessage = 'Saved to card configuration.';
        break;
    }
  };

  // -- suggest path --

  private async runSuggestPath(): Promise<void> {
    if (!this.config || !this.selectedFlowId) {
      this.statusMessage = 'Select a flow first — then use Suggest path.';
      return;
    }
    const flow = this.config.flows.find((f) => f.id === this.selectedFlowId);
    if (!flow) return;
    const fromNode = this.config.nodes.find((n) => n.id === flow.from_node);
    const toNode = this.config.nodes.find((n) => n.id === flow.to_node);
    if (!fromNode || !toNode) {
      this.statusMessage = 'Flow is missing a source or destination node.';
      return;
    }

    this.suggestBusy = true;
    this.statusMessage = 'Analysing background…';
    try {
      const result = await suggestPath({
        imageUrl: this.config.background.default,
        from: fromNode.position,
        to: toNode.position,
      });
      if (!result.edgesUsable) {
        this.statusMessage =
          'Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.';
        this.suggestPreview = null;
        return;
      }
      if (result.waypoints.length === 0) {
        this.statusMessage = 'No waypoints suggested — a straight line already follows the strongest path.';
        this.suggestPreview = null;
        return;
      }
      this.suggestPreview = {
        flowId: flow.id,
        waypoints: result.waypoints,
        edgesUsable: result.edgesUsable,
        elapsedMs: result.elapsedMs,
      };
      this.statusMessage = `Preview: ${result.waypoints.length} waypoint(s) in ${Math.round(
        result.elapsedMs,
      )} ms. Accept to apply.`;
    } catch (err) {
      this.statusMessage =
        'Auto-route failed: ' + (err instanceof Error ? err.message : String(err));
      this.suggestPreview = null;
    } finally {
      this.suggestBusy = false;
    }
  }

  private acceptSuggestion(): void {
    if (!this.config || !this.suggestPreview) return;
    const { flowId, waypoints } = this.suggestPreview;
    const prev = this.config;
    const next: FlowmeConfig = {
      ...prev,
      flows: prev.flows.map((f) =>
        f.id === flowId ? { ...f, waypoints: waypoints.map((w) => ({ x: w.x, y: w.y })) } : f,
      ),
    };
    this.suggestPreview = null;
    this.statusMessage = 'Applied suggested waypoints.';
    this.pushPatch(prev, next, `auto-route ${flowId}`);
  }

  private cancelSuggestion(): void {
    this.suggestPreview = null;
    this.statusMessage = 'Suggestion dismissed.';
  }

  private renderSuggestPreview(): TemplateResult | typeof nothing {
    if (!this.suggestPreview || !this.config) return nothing;
    const flow = this.config.flows.find((f) => f.id === this.suggestPreview!.flowId);
    if (!flow) return nothing;
    const fromNode = this.config.nodes.find((n) => n.id === flow.from_node);
    const toNode = this.config.nodes.find((n) => n.id === flow.to_node);
    if (!fromNode || !toNode) return nothing;
    const points: Point[] = [
      fromNode.position,
      ...this.suggestPreview.waypoints,
      toNode.position,
    ];
    const polyline = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    return html`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${polyline} />
      </svg>
      ${this.suggestPreview.waypoints.map(
        (wp) => html`
          <div class="suggest-marker" style=${`left: ${wp.x}%; top: ${wp.y}%;`}></div>
        `,
      )}
    `;
  }

  private renderSuggestBar(): TemplateResult | typeof nothing {
    if (!this.suggestPreview) return nothing;
    return html`
      <div class="suggest-bar">
        <span>Preview — ${this.suggestPreview.waypoints.length} waypoint(s)</span>
        <button @click=${this.acceptSuggestion}>Accept</button>
        <button class="ghost" @click=${this.cancelSuggestion}>Cancel</button>
      </div>
    `;
  }

  // -- stage interactions --

  private onStageClick = (event: MouseEvent): void => {
    if (!this.config) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('.handle, .waypoint')) return;

    if (this.pending?.kind === 'add-node') {
      const pos = this.pointerToPercent(event);
      if (!pos) return;
      const prev = this.config;
      const { config: next, node } = addNode(prev, pos, 'New node');
      this.pushPatch(prev, next, `add node ${node.id}`);
      this.pending = null;
      this.statusMessage = `Added node ${node.id}.`;
      return;
    }

    if (this.pending?.kind === 'add-overlay') {
      const pos = this.pointerToPercent(event);
      if (!pos) return;
      const seed: Omit<OverlayConfig, 'id'> & { id?: string } = {
        type: 'custom',
        position: pos,
        size: { width: 20, height: 15 },
        card: { type: 'entity', entity: 'sensor.example_sensor' },
      };
      const prev = this.config;
      const { config: next, overlay } = addOverlay(prev, seed);
      this.selectedOverlayId = overlay.id;
      this.selectedNodeId = null;
      this.selectedFlowId = null;
      this.pushPatch(prev, next, `add overlay ${overlay.id}`);
      this.pending = null;
      this.statusMessage = `Added overlay ${overlay.id}. Drag to reposition, corner to resize.`;
      return;
    }

    if (this.pending?.kind === 'add-flow') {
      if (this.pending.step === 'pick-from') {
        // must click a node; stage clicks don't count
        this.statusMessage = 'Click the source node handle.';
      }
      return;
    }

    this.selectedNodeId = null;
    this.selectedFlowId = null;
    this.selectedOverlayId = null;
    this.customConfigDraft = '';
    this.customConfigError = '';
  };

  private onStageContextMenu = (event: MouseEvent): void => {
    if (this.pending) {
      event.preventDefault();
      this.pending = null;
      this.statusMessage = 'Cancelled.';
    }
  };

  private onSegmentClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as SVGLineElement;
    const flowId = target.dataset['flowId'];
    const segmentIndex = Number(target.dataset['segmentIndex']);
    if (!flowId || !Number.isFinite(segmentIndex)) return;

    // shift-click on a segment = insert waypoint at click point, else just select flow
    if (event.shiftKey) {
      const pos = this.pointerToPercent(event);
      if (!pos) return;
      const prev = this.config;
      const next = insertWaypoint(prev, flowId, segmentIndex, pos);
      this.pushPatch(prev, next, `add waypoint to ${flowId}`);
      return;
    }
    this.selectedFlowId = flowId;
    this.selectedNodeId = null;
  };

  private onNodeClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement;
    const nodeId = target.dataset['nodeId'];
    if (!nodeId) return;

    if (this.pending?.kind === 'add-flow') {
      if (this.pending.step === 'pick-from') {
        this.pending = { kind: 'add-flow', step: 'pick-to', fromId: nodeId };
        this.statusMessage = 'Click the destination node.';
        return;
      }
      if (this.pending.step === 'pick-to' && this.pending.fromId !== nodeId) {
        const entity =
          window.prompt(
            'Entity for this flow (e.g. sensor.grid_power):',
            'sensor.placeholder_entity',
          ) ?? 'sensor.placeholder_entity';
        const prev = this.config;
        const { config: next, flow } = addFlow(prev, this.pending.fromId, nodeId, entity);
        this.pushPatch(prev, next, `add flow ${flow.id}`);
        this.pending = null;
        this.statusMessage = `Added flow ${flow.id}.`;
        return;
      }
      this.statusMessage = 'Destination must differ from source.';
      return;
    }

    this.selectedNodeId = nodeId;
    this.selectedFlowId = null;
    this.selectedOverlayId = null;
  };

  private onOverlayClick = (event: MouseEvent): void => {
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const id = target.dataset['overlayId'];
    if (!id) return;
    this.selectedOverlayId = id;
    this.selectedNodeId = null;
    this.selectedFlowId = null;
    this.customConfigDraft = '';
    this.customConfigError = '';
  };

  private onOverlayContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const id = target.dataset['overlayId'];
    if (!id) return;
    if (window.confirm(`Delete overlay ${id}?`)) {
      this.removeOverlay(id);
    }
  };

  private onOverlayResizePointerDown = (event: PointerEvent): void => {
    if (this.previewMode) return;
    if (!this.config) return;
    event.stopPropagation();
    event.preventDefault();
    const el = event.currentTarget as HTMLElement;
    const id = el.dataset['overlayId'];
    if (!id) return;
    const overlay = (this.config.overlays ?? []).find((o) => o.id === id);
    if (!overlay) return;
    const startSize = { ...(overlay.size ?? { width: 20, height: 15 }) };
    el.setPointerCapture(event.pointerId);
    this.dragPointerId = event.pointerId;
    this.dragTarget = {
      kind: 'overlay-resize',
      id,
      startSize,
      startPx: { x: event.clientX, y: event.clientY },
    };
    this.dragStartConfig = this.config;
  };

  private onNodeContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const nodeId = target.dataset['nodeId'];
    if (!nodeId) return;
    if (window.confirm(`Delete node ${nodeId}? This also removes any flows using it.`)) {
      this.removeNode(nodeId);
    }
  };

  private onWaypointContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement;
    const flowId = target.dataset['flowId'];
    const index = Number(target.dataset['waypointIndex']);
    if (!flowId || !Number.isFinite(index)) return;
    const prev = this.config;
    const next = deleteWaypoint(prev, flowId, index);
    this.pushPatch(prev, next, `delete waypoint ${index} of ${flowId}`);
  };

  private stopClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  // -- drag handling --

  private onHandlePointerDown = (event: PointerEvent): void => {
    if (this.previewMode) return;
    if (this.pending) return;
    if (!this.config) return;
    const el = event.currentTarget as HTMLElement;
    const waypointIndexRaw = el.dataset['waypointIndex'];
    const flowId = el.dataset['flowId'];
    const nodeId = el.dataset['nodeId'];
    const overlayId = el.dataset['overlayId'];

    let target: DragTarget | null = null;
    if (nodeId) target = { kind: 'node', id: nodeId };
    else if (overlayId && !el.classList.contains('overlay-resize'))
      target = { kind: 'overlay', id: overlayId };
    else if (flowId && waypointIndexRaw !== undefined) {
      target = { kind: 'waypoint', flowId, index: Number(waypointIndexRaw) };
    }
    if (!target) return;

    event.preventDefault();
    el.setPointerCapture(event.pointerId);
    this.dragPointerId = event.pointerId;
    this.dragTarget = target;
    this.dragStartConfig = this.config;
    this.dragShiftHeld = event.shiftKey;
  };

  private onHandlePointerMove = (event: PointerEvent): void => {
    if (this.dragPointerId !== event.pointerId || !this.dragTarget || !this.config) return;
    const target = this.dragTarget;
    this.dragShiftHeld = event.shiftKey;

    if (target.kind === 'overlay-resize') {
      const stage = this.stageRef.value;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dxPct = ((event.clientX - target.startPx.x) / rect.width) * 100;
      const dyPct = ((event.clientY - target.startPx.y) / rect.height) * 100;
      let w = target.startSize.width + dxPct;
      let h = target.startSize.height + dyPct;
      if (this.dragShiftHeld) {
        w = Math.round(w);
        h = Math.round(h);
      }
      this.config = setOverlaySize(this.config, target.id, { width: w, height: h });
      return;
    }

    const pos = this.pointerToPercent(event);
    if (!pos) return;
    const snapped = this.dragShiftHeld
      ? { x: clampPercent(snapToGrid(pos.x)), y: clampPercent(snapToGrid(pos.y)) }
      : pos;

    // live preview — update this.config directly, no patch pushed
    if (target.kind === 'node') {
      this.config = moveNode(this.config, target.id, snapped);
    } else if (target.kind === 'overlay') {
      this.config = moveOverlay(this.config, target.id, snapped);
    } else if (target.kind === 'waypoint') {
      this.config = moveWaypoint(this.config, target.flowId, target.index, snapped);
    }
  };

  private onHandlePointerUp = (event: PointerEvent): void => {
    if (this.dragPointerId !== event.pointerId) return;
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);

    const startConfig = this.dragStartConfig;
    const endConfig = this.config;
    const target = this.dragTarget;
    this.dragPointerId = null;
    this.dragTarget = null;
    this.dragStartConfig = null;

    if (!startConfig || !endConfig || !target) return;
    if (startConfig === endConfig) return;

    let description: string;
    switch (target.kind) {
      case 'node':
        description = `move node ${target.id}`;
        break;
      case 'overlay':
        description = `move overlay ${target.id}`;
        break;
      case 'overlay-resize':
        description = `resize overlay ${target.id}`;
        break;
      default:
        description = `move waypoint ${target.index} of ${target.flowId}`;
    }
    this.pushPatch(startConfig, endConfig, description);
  };

  // -- inspector edits --

  private onNodeLabelChange(nodeId: string, event: Event): void {
    if (!this.config) return;
    const value = (event.target as HTMLInputElement).value;
    const prev = this.config;
    const next = {
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, label: value || undefined } : n)),
    };
    this.pushPatch(prev, next, `rename ${nodeId}`);
  }

  private setNodeEntity(nodeId: string, value: string): void {
    if (!this.config) return;
    const prev = this.config;
    const trimmed = value.trim();
    const next = {
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === nodeId ? { ...n, entity: trimmed ? trimmed : undefined } : n,
      ),
    };
    this.pushPatch(prev, next, `edit entity of ${nodeId}`);
  }

  private setFlowEntity(flowId: string, value: string): void {
    if (!this.config) return;
    const prev = this.config;
    const trimmed = value.trim();
    if (!trimmed) return; // flow entity is required — ignore empty submit
    const next = {
      ...prev,
      flows: prev.flows.map((f) =>
        f.id === flowId ? { ...f, entity: trimmed } : f,
      ),
    };
    this.pushPatch(prev, next, `edit entity of ${flowId}`);
  }

  private onOverlaySizeChange(id: string, which: 'width' | 'height', event: Event): void {
    if (!this.config) return;
    const overlay = (this.config.overlays ?? []).find((o) => o.id === id);
    if (!overlay) return;
    const current = overlay.size ?? { width: 20, height: 15 };
    const raw = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(raw) || raw <= 0) return;
    const prev = this.config;
    const next = setOverlaySize(prev, id, { ...current, [which]: raw });
    this.pushPatch(prev, next, `resize overlay ${id}`);
  }

  private applyCustomConfig(overlayId: string): void {
    if (!this.config) return;
    const raw = this.customConfigDraft.trim();
    if (!raw) {
      this.customConfigError = 'Config is empty.';
      return;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      this.customConfigError = 'Invalid JSON: ' + (err instanceof Error ? err.message : String(err));
      return;
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      this.customConfigError = 'Top-level value must be a JSON object.';
      return;
    }
    const prev = this.config;
    try {
      const next = setOverlayCardConfig(prev, overlayId, parsed as Record<string, unknown>);
      // let validateConfig (inside pushPatch) run the url-scan to double-check
      const validated = validateConfig(next);
      this.errorMessage = '';
      this.customConfigError = '';
      this.customConfigDraft = '';
      this.undoStack.push({ prev, next: validated, description: `edit overlay ${overlayId} card config` });
      this.commitToHa(validated);
    } catch (err) {
      this.customConfigError = err instanceof Error ? err.message : String(err);
    }
  }

  private removeOverlay(overlayId: string): void {
    if (!this.config) return;
    const prev = this.config;
    const next = deleteOverlay(prev, overlayId);
    this.selectedOverlayId = null;
    this.customConfigDraft = '';
    this.customConfigError = '';
    this.pushPatch(prev, next, `delete overlay ${overlayId}`);
  }

  private removeNode(nodeId: string): void {
    if (!this.config) return;
    const prev = this.config;
    const next = deleteNode(prev, nodeId);
    this.selectedNodeId = null;
    this.pushPatch(prev, next, `delete node ${nodeId}`);
  }

  private removeFlow(flowId: string): void {
    if (!this.config) return;
    const prev = this.config;
    const next = deleteFlow(prev, flowId);
    this.selectedFlowId = null;
    this.pushPatch(prev, next, `delete flow ${flowId}`);
  }

  // -- keyboard --

  private onKeyDown = (event: KeyboardEvent): void => {
    const mod = event.metaKey || event.ctrlKey;
    if (!mod) return;
    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) {
      event.preventDefault();
      this.undoStack.undo();
    } else if ((key === 'z' && event.shiftKey) || key === 'y') {
      event.preventDefault();
      this.undoStack.redo();
    }
  };

  // -- utilities --

  private pointerToPercent(event: { clientX: number; clientY: number }): NodePosition | null {
    const stage = this.stageRef.value;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const x = clampPercent(((event.clientX - rect.left) / rect.width) * 100);
    const y = clampPercent(((event.clientY - rect.top) / rect.height) * 100);
    return { x, y };
  }

  private pushPatch(prev: FlowmeConfig, next: FlowmeConfig, description: string): void {
    try {
      const validated = validateConfig(next);
      this.errorMessage = '';
      this.undoStack.push({ prev, next: validated, description });
      this.commitToHa(validated);
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : String(err);
      this.config = prev;
    }
  }

  private applyConfig(config: FlowmeConfig, commitToHa: boolean): void {
    this.config = config;
    if (commitToHa) this.commitToHa(config);
    else this.commitToHa(config); // undo/redo should also notify HA so the card re-renders
  }

  private commitToHa(config: FlowmeConfig): void {
    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private refreshUndoState(): void {
    this.canUndo = this.undoStack.canUndo();
    this.canRedo = this.undoStack.canRedo();
    this.undoLabel = this.undoStack.topUndoDescription() ?? '';
    this.redoLabel = this.undoStack.topRedoDescription() ?? '';
  }

  static override styles = css`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .wrap {
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    flowme-editor-toolbar {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .status {
      font-size: 12px;
      padding: 6px 10px;
      margin: 0 12px;
      background: rgba(74, 222, 128, 0.12);
      border-radius: 6px;
    }
    .stage {
      position: relative;
      width: calc(100% - 24px);
      margin: 0 12px;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      background: var(--ha-card-background, #111);
      touch-action: none;
    }
    .stage.mode-add-node,
    .stage.mode-add-overlay {
      cursor: copy;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .connectors .segment {
      stroke: rgba(255, 255, 255, 0.55);
      stroke-width: 0.6;
      stroke-dasharray: 1.5 1.5;
      vector-effect: non-scaling-stroke;
      pointer-events: stroke;
      cursor: crosshair;
    }
    .connectors .segment.selected {
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1;
    }
    .handle {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }
    .handle.selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 6px var(--primary-color, #03a9f4);
    }
    .handle:active {
      cursor: grabbing;
    }
    .handle-dot {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 5px rgba(255, 255, 255, 0.9);
    }
    .handle-label {
      font-size: 11px;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      white-space: nowrap;
    }
    .waypoint {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(0, 0, 0, 0.6);
      cursor: grab;
      touch-action: none;
    }
    .waypoint:active {
      cursor: grabbing;
    }
    .overlay-handle {
      position: absolute;
      transform: translate(-50%, -50%);
      border: 1px dashed rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      background: rgba(3, 169, 244, 0.08);
      cursor: grab;
      touch-action: none;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      overflow: visible;
    }
    .overlay-handle.selected {
      border-color: var(--primary-color, #03a9f4);
      border-style: solid;
      box-shadow: 0 0 0 2px rgba(3, 169, 244, 0.25);
    }
    .overlay-handle:active {
      cursor: grabbing;
    }
    .overlay-label-chip {
      position: absolute;
      top: -18px;
      left: 0;
      background: rgba(17, 17, 17, 0.8);
      color: #fff;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      pointer-events: none;
    }
    .overlay-type-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 1px 5px;
      border-radius: 3px;
      text-transform: uppercase;
      font-size: 9px;
      letter-spacing: 0.03em;
    }
    .overlay-resize {
      position: absolute;
      right: -5px;
      bottom: -5px;
      width: 14px;
      height: 14px;
      border-radius: 3px;
      background: var(--primary-color, #03a9f4);
      border: 2px solid rgba(255, 255, 255, 0.9);
      cursor: nwse-resize;
    }
    .overlay-inspector select,
    .overlay-inspector textarea {
      font: inherit;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .overlay-inspector textarea {
      font-family: var(--code-font-family, ui-monospace, monospace);
      font-size: 12px;
      width: 100%;
      box-sizing: border-box;
      resize: vertical;
    }
    .overlay-inspector .size-row {
      display: flex;
      gap: 8px;
    }
    .overlay-inspector .size-row label {
      flex: 1;
    }
    .overlay-inspector button {
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.06));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    .custom-config-error {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.08);
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .hint-sub {
      font-size: 11px;
      opacity: 0.65;
      margin: 0;
    }
    .inspector {
      margin: 0 12px 12px;
      padding: 10px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
    }
    .inspector h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }
    .inspector label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .inspector input {
      font: inherit;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .inspector .row {
      font-size: 12px;
      opacity: 0.85;
    }
    .inspector code {
      font-family: var(--code-font-family, ui-monospace, monospace);
    }
    button.danger {
      align-self: flex-start;
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--error-color, #ef4444);
      color: #fff;
      border: none;
      cursor: pointer;
    }
    .hint {
      opacity: 0.7;
      font-size: 13px;
      margin: 12px;
    }
    .error {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.08);
      padding: 8px 10px;
      margin: 0 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .suggest-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .suggest-overlay polyline {
      fill: none;
      stroke: #f59e0b;
      stroke-width: 1;
      stroke-dasharray: 2 2;
      vector-effect: non-scaling-stroke;
    }
    .suggest-marker {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #f59e0b;
      border: 2px solid rgba(0, 0, 0, 0.6);
      pointer-events: none;
    }
    .suggest-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 12px;
      padding: 8px 10px;
      border-radius: 6px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.4);
      font-size: 12px;
    }
    .suggest-bar span {
      flex: 1;
    }
    .suggest-bar button {
      font: inherit;
      font-size: 12px;
      padding: 4px 12px;
      border-radius: 6px;
      border: none;
      background: #f59e0b;
      color: #111;
      cursor: pointer;
    }
    .suggest-bar button.ghost {
      background: transparent;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      color: var(--primary-text-color, inherit);
    }
    .weather-panel {
      margin: 0 12px 12px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
    }
    .weather-panel summary {
      list-style: none;
      cursor: pointer;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 600;
    }
    .weather-panel summary::-webkit-details-marker {
      display: none;
    }
    .weather-panel summary::before {
      content: '▸ ';
      font-size: 10px;
      margin-right: 2px;
    }
    .weather-panel[open] summary::before {
      content: '▾ ';
    }
    .weather-body {
      padding: 0 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .weather-body label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .weather-body input[type='text'],
    .weather-body input[type='number'] {
      font: inherit;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .weather-thumb {
      margin-top: 4px;
      width: 72px;
      height: 48px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: rgba(0, 0, 0, 0.25);
    }
    .weather-states {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 4px;
    }
    .weather-states-header {
      display: grid;
      grid-template-columns: 1fr 2fr auto;
      gap: 8px;
      font-size: 11px;
      opacity: 0.7;
    }
    .weather-row {
      display: grid;
      grid-template-columns: 1fr 2fr auto;
      gap: 8px;
      align-items: center;
    }
    .weather-row-end {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .weather-row-end .weather-thumb {
      margin-top: 0;
    }
    .weather-row-end button {
      font: inherit;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: transparent;
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    .add-state {
      align-self: flex-start;
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
  `;
}
