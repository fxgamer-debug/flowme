import { LitElement, html, svg, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type {
  AnimationConfig,
  DomainColors,
  FlowmeConfig,
  FlowmeDefaults,
  FlowAnimationConfig,
  FlowConfig,
  HomeAssistant,
  NodeConfig,
  NodePosition,
  OpacityConfig,
  OverlayConfig,
  SpeedCurveOverride,
  ValueGradientConfig,
  VisibilityConfig,
} from './types.js';
import { LINE_STYLES, ANIMATION_STYLES, PARTICLE_SHAPES, PARTICLE_SPACINGS, FLOW_DIRECTIONS } from './types.js';
import { validateConfig } from './validate-config.js';
import { interpolateGradientColor, polylineToSvgPathStyled, resolveSpeedCurveParams, sigmoidSpeedCurve } from './utils.js';
import { getProfile, resolveFlowColor } from './flow-profiles/index.js';
import { UndoStack } from './editor/undo-stack.js';
import {
  addFlow,
  addNode,
  addOverlay,
  clampPercent,
  clearSpeedCurveOverride,
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
  setDefault,
  setDomainColor,
  setFlowColor,
  setFlowLineStyle,
  setFlowOpacity,
  setFlowSpeedCurveOverride,
  setFlowVisible,
  setNodeOpacity,
  setNodeVisible,
  setOpacity,
  setOverlayCardConfig,
  setOverlayOpacity,
  setOverlaySize,
  setOverlayVisible,
  setTransitionDuration,
  setAnimationConfig,
  setFlowAnimation,
  clearFlowAnimation,
  setVisibility,
  setWeatherEntity,
  setSunEntity,
  setWeatherStateImage,
  snapToGrid,
  bulkMoveNodes,
  bulkDeleteNodes,
  bulkSetNodesVisible,
  alignNodesHorizontal,
  alignNodesVertical,
  setValueGradient,
  patchValueGradient,
  clearValueGradient,
} from './editor/commands.js';
import { suggestPath } from './pathfinding/index.js';
import type { Point } from './pathfinding/types.js';

type DragTarget =
  | { kind: 'node'; id: string }
  | { kind: 'node-bulk'; ids: string[]; startPositions: Map<string, NodePosition>; startPx: { x: number; y: number } }
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
  fromNodeId: string;
  toNodeId: string;
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
  /** Primary single-select node (opens inspector when selectedNodeIds.size === 1). */
  @state() private selectedNodeId: string | null = null;
  /**
   * Unified multi-select set — ALL selection state lives here.
   * size === 0 → nothing selected
   * size === 1 → single-select; selectedNodeId === the one entry
   * size === 2 → Suggest Path becomes active
   * size >= 2 → multi-select toolbar shown
   */
  @state() private selectedNodeIds: Set<string> = new Set();
  @state() private selectedFlowId: string | null = null;
  @state() private selectedOverlayId: string | null = null;
  @state() private customConfigDraft = '';
  @state() private customConfigError = '';
  @state() private errorMessage = '';
  @state() private canUndo = false;
  @state() private canRedo = false;
  @state() private undoLabel = '';
  @state() private redoLabel = '';
  @state() private suggestPreview: SuggestPreview | null = null;
  @state() private suggestBusy = false;
  /** Right-column toolbar selector: which type is shown in the element dropdown. */
  @state() private selectorType: 'nodes' | 'flows' | 'overlays' | '' = '';
  /** Config snapshot captured when the editor first opens (external setConfig).
   *  Used by the Cancel button to discard all in-session edits. */
  @state() private savedConfig?: FlowmeConfig;

  // ── Zoom / pan state ──────────────────────────────────────────────────────
  @state() private scale = 1;
  @state() private panX = 0;
  @state() private panY = 0;
  /** Minimum scale: fit entire card in canvas zone. Updated by ResizeObserver. */
  private fitScale = 1;
  /** Pan offset at fit level (centres card horizontally when canvas is wider). */
  private fitPanX = 0;
  private fitPanY = 0;
  /** Natural pixel dimensions of the loaded background image. */
  private imageNaturalW = 1600;
  private imageNaturalH = 1000;
  /** URL for which naturalW/H have been loaded (avoids redundant loads). */
  private _loadedImageUrl = '';
  /** True while spacebar is held (enables drag-to-pan). */
  private spaceHeld = false;
  /** Pointer id captured for middle-mouse or space+drag pan. */
  private panPointerId: number | null = null;
  private _canvasResizeObserver?: ResizeObserver;

  private readonly stageRef: Ref<HTMLDivElement> = createRef();
  private readonly canvasRef: Ref<HTMLDivElement> = createRef();
  private undoStack = new UndoStack((next) => this.applyConfig(next, /*commitToHa*/ false));
  private unsubscribe: (() => void) | null = null;
  /** True while we are in the middle of dispatching a config-changed event.
   *  Prevents setConfig (called back by HA) from clearing the undo stack. */
  private _ownCommit = false;
  private dragPointerId: number | null = null;
  private dragTarget: DragTarget | null = null;
  private dragStartConfig: FlowmeConfig | null = null;
  private dragShiftHeld = false;
  /** Pixel coords where the last pointerdown started (for drag-vs-click detection). */
  private dragStartPx: { x: number; y: number } | null = null;
  /** True once the pointer has moved > 4px from dragStartPx. */
  private dragMoved = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState());
    window.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keydown', this.onKeyDown, true);
    document.addEventListener('keydown', this.onSpaceDown, true);
    document.addEventListener('keyup', this.onSpaceUp, true);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
    window.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keydown', this.onKeyDown, true);
    document.removeEventListener('keydown', this.onSpaceDown, true);
    document.removeEventListener('keyup', this.onSpaceUp, true);
    this._canvasResizeObserver?.disconnect();
    this._canvasResizeObserver = undefined;
    // Reset zoom on editor close
    this.scale = this.fitScale;
    this.panX = this.fitPanX;
    this.panY = this.fitPanY;
    this.spaceHeld = false;
    this.panPointerId = null;
  }

  override firstUpdated(): void {
    const canvasEl = this.canvasRef.value;
    if (!canvasEl) return;
    this._canvasResizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      // Delegate all fit calculation to recalcFit which uses imageNaturalW/H.
      this.recalcFit();
    });
    this._canvasResizeObserver.observe(canvasEl);
  }

  /**
   * Load the background image to read its natural dimensions, then recalculate
   * the fit scale/pan so the image fills the stage width correctly.
   * Called whenever the background URL changes.
   */
  private loadBackgroundImage(url: string): void {
    if (!url || url === this._loadedImageUrl) return;
    this._loadedImageUrl = url;
    const img = new Image();
    img.onload = () => {
      this.imageNaturalW = img.naturalWidth || 1600;
      this.imageNaturalH = img.naturalHeight || 1000;
      this.recalcFit();
    };
    img.onerror = () => {
      // Keep previous/default dimensions on error
      this.recalcFit();
    };
    img.src = url;
  }

  /**
   * Recalculate fitScale / fitPanX / fitPanY based on current stage size and
   * image natural dimensions. Resets live pan/zoom to fit if the user has not
   * interacted (still at the previous fit level).
   */
  private recalcFit(): void {
    const canvasEl = this.canvasRef.value;
    if (!canvasEl) return;
    const stageW = canvasEl.offsetWidth - 16;
    const stageH = canvasEl.offsetHeight - 8;
    if (stageW <= 0 || stageH <= 0) return;
    // Scale so image fills stage width exactly
    const newFitScale = stageW / this.imageNaturalW;
    const scaledH = this.imageNaturalH * newFitScale;
    // Centre vertically: shift up so the middle of the image sits in the centre
    const newFitPanX = 0;
    const newFitPanY = -(scaledH - stageH) / 2;
    const prevScale = this.fitScale;
    this.fitScale = newFitScale;
    this.fitPanX = newFitPanX;
    this.fitPanY = newFitPanY;
    // Reset to fit only if user hasn't moved away from the previous fit level
    if (this.scale === 1 || this.scale === prevScale) {
      this.scale = newFitScale;
      this.panX = newFitPanX;
      this.panY = newFitPanY;
    }
  }

  setConfig(config: unknown): void {
    try {
      this.config = validateConfig(config);
      // Only clear undo when HA pushes a genuinely external config change.
      // When we dispatch config-changed ourselves, _ownCommit is true.
      // Reset the flag here (not in commitToHa) so it stays true whether
      // HA calls setConfig synchronously or asynchronously (microtask / rAF).
      if (this._ownCommit) {
        this._ownCommit = false;
      } else {
        // External load — capture the config as the "clean" state for Cancel.
        this.savedConfig = this.config;
        this.undoStack.clear();
      }
      this.errorMessage = '';
      // Load image dimensions whenever the background URL changes so recalcFit
      // can use the correct aspect ratio.
      const bgUrl = this.config?.background?.default;
      if (bgUrl) this.loadBackgroundImage(bgUrl);
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

    const bgUrl = this.config.background.default;
    const multiSelect = this.selectedNodeIds.size >= 2;

    // Derive selector dropdown values from canvas selection so they stay in sync.
    // When something is selected on canvas, reflect it in the dropdowns.
    // When nothing is selected, keep whatever the user last picked in the type dropdown.
    const derivedType: typeof this.selectorType =
      this.selectedNodeId ? 'nodes'
      : this.selectedFlowId ? 'flows'
      : this.selectedOverlayId ? 'overlays'
      : this.selectorType;
    const derivedElement =
      this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? '';

    return html`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class="z-canvas"
          ${ref(this.canvasRef)}
          @wheel=${this.onCanvasWheel}
          @pointerdown=${this.onCanvasPointerDown}
          @pointermove=${this.onCanvasPointerMove}
          @pointerup=${this.onCanvasPointerUp}
          @pointercancel=${this.onCanvasPointerUp}
        >
          <div
            class=${`stage ${
              this.spaceHeld ? 'mode-pan'
              : this.pending?.kind === 'add-node' ? 'mode-add-node'
              : this.pending?.kind === 'add-overlay' ? 'mode-add-overlay'
              : ''
            }`}
            @click=${this.onStageClick}
            @contextmenu=${this.onStageContextMenu}
            ${ref(this.stageRef)}
          >
            <!-- canvas-content: unified scene layer for background + all content.
                 Sized to image natural dimensions so percentages map to image pixels.
                 Transform pans/zooms the whole scene as one unit. -->
            <div
              class="canvas-content"
              style=${`width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;`}
            >
              ${bgUrl ? html`<div class="background" style="background-image: url('${bgUrl}');"></div>` : nothing}
              <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
                ${this.config.flows.map((f) => this.renderFlowConnector(f))}
              </svg>
              ${this.config.flows.filter((f) => f.id === this.selectedFlowId).map((f) => this.renderWaypointHandles(f))}
              ${(this.config.overlays ?? []).map((o) => this.renderOverlayHandle(o))}
              ${this.config.nodes.map((n) => this.renderHandle(n))}
              ${this.renderSuggestPreview()}
            </div>
          </div>
        </div>

        <!-- Suggest Path accept/cancel bar — shown between canvas and toolbar -->
        ${this.renderSuggestBar()}

        <!-- ZONE 2 — Toolbar (3-column grid) -->
        <div class="z-toolbar">

          <!-- Left (15%): Row 1 = Undo/Redo, Row 2 = Zoom−/+/Fit -->
          <div class="tb-col-undo">
            <div class="tb-icon-row">
              <button
                class="tb-icon-btn"
                ?disabled=${!this.canUndo}
                title=${this.undoLabel ? `Undo: ${this.undoLabel} (Ctrl+Z)` : 'Undo (Ctrl+Z)'}
                @click=${() => this.undoStack.undo()}
              >↩</button>
              <button
                class="tb-icon-btn"
                ?disabled=${!this.canRedo}
                title=${this.redoLabel ? `Redo: ${this.redoLabel} (Ctrl+Shift+Z)` : 'Redo (Ctrl+Shift+Z)'}
                @click=${() => this.undoStack.redo()}
              >↪</button>
            </div>
            <div class="tb-icon-row">
              <button
                class="tb-icon-btn"
                ?disabled=${this.scale <= this.fitScale}
                title="Zoom out"
                @click=${() => this.adjustZoom(0.8)}
              >−</button>
              <button
                class="tb-icon-btn"
                ?disabled=${this.scale >= 5}
                title="Zoom in"
                @click=${() => this.adjustZoom(1.25)}
              >+</button>
              <button
                class="tb-icon-btn"
                title="Fit to canvas"
                @click=${() => this.resetZoom()}
              >⊡</button>
            </div>
          </div>

          <!-- Centre (50%): Row 1 = add/multiselect, Row 2 = Save/Cancel -->
          <div class="tb-col-actions">
            <div class="tb-row tb-row-actions">
              ${multiSelect
                ? this.renderMultiSelectToolbar()
                : html`
                  <button class="tb-btn"
                    title="Add node — then click canvas to place"
                    @click=${() => {
                      this.pending = { kind: 'add-node' };
                    }}
                  >+ Node</button>
                  <button class="tb-btn"
                    title="Add flow between two nodes"
                    @click=${() => {
                      this.pending = { kind: 'add-flow', step: 'pick-from' };
                    }}
                  >+ Flow</button>
                  <button class="tb-btn"
                    title="Add overlay card"
                    @click=${() => {
                      this.pending = { kind: 'add-overlay', overlayType: 'custom' };
                    }}
                  >+ Overlay</button>
                `}
            </div>
            <div class="tb-row tb-row-save">
              <button
                class="tb-btn tb-btn-save"
                title="Apply current configuration to the card"
                @click=${() => {
                  if (this.config) this.commitToHa(this.config);
                }}
              >💾 Save</button>
              <button
                class="tb-btn tb-btn-cancel"
                title="Discard all changes since the editor opened"
                ?disabled=${!this.savedConfig}
                @click=${() => {
                  if (!this.savedConfig || !this.config) return;
                  const prev = this.config;
                  this.pushPatch(prev, this.savedConfig, 'cancel all changes');
                }}
              >✕ Cancel</button>
            </div>
          </div>

          <!-- Right (35%): Type + Element dropdowns stacked -->
          <div class="tb-col-selector">
            <select
              class="tb-select"
              .value=${derivedType}
              @change=${(e: Event) => {
                this.selectorType = (e.target as HTMLSelectElement).value as typeof this.selectorType;
                // Clear canvas selection when manually switching type
                this.selectedNodeId = null;
                this.selectedNodeIds = new Set();
                this.selectedFlowId = null;
                this.selectedOverlayId = null;
              }}
            >
              <option value="">Select type…</option>
              <option value="nodes">Nodes</option>
              <option value="flows">Flows</option>
              <option value="overlays">Overlays</option>
            </select>
            <select
              class="tb-select"
              ?disabled=${!derivedType}
              .value=${derivedElement}
              @change=${(e: Event) => {
                const id = (e.target as HTMLSelectElement).value;
                if (!id) return;
                if (derivedType === 'nodes') {
                  this.selectedNodeId = id;
                  this.selectedNodeIds = new Set([id]);
                  this.selectedFlowId = null;
                  this.selectedOverlayId = null;
                } else if (derivedType === 'flows') {
                  this.selectedFlowId = id;
                  this.selectedNodeId = null;
                  this.selectedNodeIds = new Set();
                  this.selectedOverlayId = null;
                } else if (derivedType === 'overlays') {
                  this.selectedOverlayId = id;
                  this.selectedNodeId = null;
                  this.selectedNodeIds = new Set();
                  this.selectedFlowId = null;
                }
              }}
            >
              <option value="">${derivedType ? 'Select element…' : '—'}</option>
              ${derivedType === 'nodes' ? this.config.nodes.map((n) => html`
                <option value=${n.id}>${n.label ?? n.id}</option>
              `) : nothing}
              ${derivedType === 'flows' ? this.config.flows.map((f) => html`
                <option value=${f.id}>${f.id}</option>
              `) : nothing}
              ${derivedType === 'overlays' ? (this.config.overlays ?? []).map((o, i) => html`
                <option value=${o.id ?? String(i)}>Overlay ${i + 1}${o.id ? ` (${o.id})` : ''}</option>
              `) : nothing}
            </select>
          </div>

        </div>

        <!-- ZONE 3 — Context panel -->
        <div class="z-context">
          ${this.renderContextPanel()}
        </div>

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

    // Build the same SVG path the renderer uses so the editor line matches
    // the animated card line exactly. The connectors SVG has viewBox 0 0 100 100
    // so we use size { width: 100, height: 100 } to keep percent coords as-is.
    const CONNECTOR_SIZE = { width: 100, height: 100 };
    const d = polylineToSvgPathStyled(points, CONNECTOR_SIZE, flow.line_style ?? 'corner');
    if (!d) return nothing;

    const flowColor = flow.color ?? 'rgba(255,255,255,0.8)';

    // Invisible wide hit-area segments (keep per-segment for shift-click waypoint insertion)
    const hitSegments = [] as TemplateResult[];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      hitSegments.push(svg`
        <line
          class="segment-hit"
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

    return svg`
      <g>
        ${hitSegments}
        <path
          class=${`flow-path ${isSelected ? 'selected' : ''}`}
          d=${d}
          data-flow-id=${flow.id}
          style=${`stroke: ${flowColor};`}
          @click=${this.onSegmentClick}
        />
      </g>
    `;
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
    // selectedNodeIds is the single source of truth for all selection states
    const isInSelection = this.selectedNodeIds.has(node.id);
    const isSingleSelected = isInSelection && this.selectedNodeIds.size === 1;
    const isMultiSelected = isInSelection && this.selectedNodeIds.size > 1;
    const selectionIndex = isInSelection ? Array.from(this.selectedNodeIds).indexOf(node.id) : -1;
    const isHidden = node.visible === false;
    return html`
      <div
        class=${`handle ${isSingleSelected ? 'selected' : ''} ${isMultiSelected ? 'multi-selected' : ''} ${isInSelection ? 'in-selection' : ''} ${isHidden ? 'handle-hidden' : ''}`}
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
        ${isInSelection && this.selectedNodeIds.size >= 2
          ? html`<span class="suggest-badge">${selectionIndex + 1}</span>`
          : nothing}
        <button
          class="eye-toggle"
          title=${isHidden ? 'Show node' : 'Hide node'}
          @click=${(e: Event) => {
            e.stopPropagation();
            if (!this.config) return;
            const prev = this.config;
            const next = setNodeVisible(prev, node.id, isHidden);
            this.pushPatch(prev, next, `${isHidden ? 'show' : 'hide'} node ${node.id}`);
          }}
        >${isHidden ? '◉' : '◎'}</button>
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

      const patchNode = (patch: Partial<typeof node>, description: string) => {
        if (!this.config) return;
        const prev = this.config;
        const next = {
          ...prev,
          nodes: prev.nodes.map((n) => n.id === node.id ? { ...n, ...patch } : n),
        };
        this.pushPatch(prev, next, description);
      };

      return html`
        <div class="inspector">
          <h4>Node: ${node.id}</h4>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">Label</span>
              <input
                type="text"
                .value=${node.label ?? ''}
                @change=${(e: Event) => this.onNodeLabelChange(node.id, e)}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Entity</span>
              ${this.renderEntityPicker(
                node.entity ?? '',
                (value) => this.setNodeEntity(node.id, value),
                { includeDomains: ['sensor', 'binary_sensor', 'input_number', 'number'] },
              )}
            </label>
          </div>

          <!-- Row 2: Colour | Visible | Show value | Show label -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">Colour</span>
              <input
                type="color"
                .value=${node.color ?? '#ffffff'}
                @change=${(e: Event) => {
                  const v = (e.target as HTMLInputElement).value;
                  patchNode({ color: v }, `set color of ${node.id}`);
                }}
              />
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${node.visible !== false}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const checked = (e.target as HTMLInputElement).checked;
                  const prev = this.config;
                  const next = setNodeVisible(prev, node.id, checked);
                  this.pushPatch(prev, next, `set visible of ${node.id}`);
                }}
              />
              <span class="node-cell-label">Visible</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${node.show_value !== false}
                @change=${(e: Event) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  patchNode({ show_value: checked || undefined }, `set show_value of ${node.id}`);
                }}
              />
              <span class="node-cell-label">Show value</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${node.show_label !== false}
                @change=${(e: Event) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  patchNode({ show_label: checked || undefined }, `set show_label of ${node.id}`);
                }}
              />
              <span class="node-cell-label">Show label</span>
            </label>
          </div>

          <!-- Row 3: X% | Y% | Size | Opacity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">X %</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(node.position.x))}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (!Number.isFinite(v)) return;
                  const prev = this.config;
                  const next = moveNode(prev, node.id, { x: v, y: node.position.y });
                  this.pushPatch(prev, next, `move ${node.id} x`);
                }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Y %</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(node.position.y))}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (!Number.isFinite(v)) return;
                  const prev = this.config;
                  const next = moveNode(prev, node.id, { x: node.position.x, y: v });
                  this.pushPatch(prev, next, `move ${node.id} y`);
                }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Size px</span>
              <input
                type="number"
                min="4" max="60" step="1"
                .value=${String(node.size ?? 12)}
                @change=${(e: Event) => {
                  const v = parseInt((e.target as HTMLInputElement).value, 10);
                  if (!Number.isFinite(v)) return;
                  patchNode({ size: v }, `set size of ${node.id}`);
                }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Opacity</span>
              <input
                type="number"
                min="0" max="1" step="0.05"
                .value=${String(node.opacity ?? 1)}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (!Number.isFinite(v)) return;
                  const prev = this.config;
                  const next = setNodeOpacity(prev, node.id, v >= 1 ? undefined : v);
                  this.pushPatch(prev, next, `set opacity of ${node.id}`);
                }}
              />
            </label>
          </div>

          <!-- Delete -->
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(node.id)}>Delete node</button>
          </div>
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
          ${this.renderWaypointList(flow)}
          <label>
            Line style
            <select
              .value=${flow.line_style ?? 'corner'}
              @change=${(e: Event) => {
                if (!this.config) return;
                const val = (e.target as HTMLSelectElement).value;
                const prev = this.config;
                const next = setFlowLineStyle(prev, flow.id, val as typeof flow.line_style);
                this.pushPatch(prev, next, `set line style of ${flow.id}`);
              }}
            >
              ${LINE_STYLES.map(
                (s) => html`<option value=${s} ?selected=${(flow.line_style ?? 'corner') === s}>${s}</option>`,
              )}
            </select>
          </label>
          <label>
            Colour override
            <div class="color-row">
              ${(() => {
                const profile = getProfile(flow.domain ?? this.config.domain);
                const effective = resolveFlowColor(flow, profile, flow.domain ?? this.config.domain, 1, this.config.domain_colors);
                return html`
                  <input
                    type="color"
                    .value=${flow.color ?? effective}
                    @change=${(e: Event) => {
                      if (!this.config) return;
                      const val = (e.target as HTMLInputElement).value;
                      const prev = this.config;
                      const next = setFlowColor(prev, flow.id, val);
                      this.pushPatch(prev, next, `set colour of ${flow.id}`);
                    }}
                  />
                  <span class="color-effective">${flow.color ? 'override' : 'domain default'}</span>
                  ${flow.color
                    ? html`<button class="ghost" @click=${() => {
                        if (!this.config) return;
                        const prev = this.config;
                        const next = setFlowColor(prev, flow.id, undefined);
                        this.pushPatch(prev, next, `clear colour of ${flow.id}`);
                      }}>Clear</button>`
                    : nothing}
                `;
              })()}
            </div>
          </label>
          <label>
            Flow opacity
            <div class="inspector-slider-row">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                .value=${String(flow.opacity ?? 1)}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (!Number.isFinite(v)) return;
                  const prev = this.config;
                  const next = setFlowOpacity(prev, flow.id, v);
                  this.pushPatch(prev, next, `set opacity of ${flow.id}`);
                }}
              />
              <span>${(flow.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            Visible
            <div class="row">
              <input
                type="checkbox"
                .checked=${flow.visible !== false}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const checked = (e.target as HTMLInputElement).checked;
                  const prev = this.config;
                  const next = setFlowVisible(prev, flow.id, checked);
                  this.pushPatch(prev, next, `${checked ? 'show' : 'hide'} flow ${flow.id}`);
                }}
              />
              <span>${flow.visible !== false ? 'shown' : 'hidden'}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(flow)}
          ${this.renderAnimationSection(flow)}
          ${this.renderValueGradientSection(flow)}
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

  private renderSpeedCurveSection(flow: FlowConfig): TemplateResult {
    if (!this.config) return html``;
    const profile = getProfile(flow.domain ?? this.config.domain);
    const params = resolveSpeedCurveParams(flow, profile);
    const override: SpeedCurveOverride = flow.speed_curve_override ?? {};

    const numInput = (
      key: keyof SpeedCurveOverride,
      label: string,
      unit?: string,
    ) => html`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${label}${unit ? html` <small>(${unit})</small>` : nothing}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof params[key] === 'number' ? (params[key] as number).toFixed(0) : ''}
          .value=${override[key] !== undefined ? String(override[key]) : ''}
          @change=${(e: Event) => {
            if (!this.config) return;
            const raw = (e.target as HTMLInputElement).value.trim();
            if (raw === '') {
              // Clear this key
              const partial: Partial<SpeedCurveOverride> = {};
              for (const k of Object.keys(override) as (keyof SpeedCurveOverride)[]) {
                if (k !== key) (partial as Record<string, unknown>)[k] = override[k];
              }
              const prev = this.config;
              const next = setFlowSpeedCurveOverride(prev, flow.id, partial);
              this.pushPatch(prev, next, `update speed curve ${key} for ${flow.id}`);
            } else {
              const v = parseFloat(raw);
              if (!Number.isFinite(v)) return;
              const prev = this.config;
              const next = setFlowSpeedCurveOverride(prev, flow.id, { ...override, [key]: v });
              this.pushPatch(prev, next, `update speed curve ${key} for ${flow.id}`);
            }
          }}
        />
      </div>
    `;

    // Live preview: compute duration at threshold, p50, peak
    const previewValues = [params.threshold, params.p50, params.peak];
    const previewDurations = previewValues.map((v) => {
      const ms = sigmoidSpeedCurve(v, params);
      return `${(ms / 1000).toFixed(1)}s`;
    });

    return html`
      <details class="speed-curve-details">
        <summary>Speed curve override</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            Leave blank to use domain profile defaults.
            Domain: <strong>${profile.unit_label}</strong> (${flow.domain ?? this.config.domain})
          </p>
          ${numInput('threshold', 'Threshold', profile.unit_label)}
          ${numInput('p50', 'Median (p50)', profile.unit_label)}
          ${numInput('peak', 'Peak', profile.unit_label)}
          ${numInput('max_duration', 'Max duration', 'ms')}
          ${numInput('min_duration', 'Min duration', 'ms')}
          ${numInput('steepness', 'Steepness', 'k')}
          <div class="speed-curve-preview">
            <span>Preview (at threshold / p50 / peak):</span>
            <strong>${previewDurations[0]}</strong>
            /
            <strong>${previewDurations[1]}</strong>
            /
            <strong>${previewDurations[2]}</strong>
          </div>
          ${Object.keys(override).length > 0
            ? html`<button class="ghost" @click=${() => {
                if (!this.config) return;
                const prev = this.config;
                const next = clearSpeedCurveOverride(prev, flow.id);
                this.pushPatch(prev, next, `reset speed curve for ${flow.id}`);
              }}>Reset to domain defaults</button>`
            : nothing}
        </div>
      </details>
    `;
  }

  private renderAnimationSection(flow: FlowConfig): TemplateResult {
    if (!this.config) return html``;
    const anim: FlowAnimationConfig = flow.animation ?? {};
    const style = anim.animation_style ?? 'dots';

    const patch = (partial: Partial<FlowAnimationConfig>) => {
      if (!this.config) return;
      const prev = this.config;
      const next = setFlowAnimation(prev, flow.id, partial);
      this.pushPatch(prev, next, `update animation for ${flow.id}`);
    };

    // Styles that don't use discrete particles (shape picker irrelevant)
    const noShapeStyles = new Set(['dash', 'pulse', 'fluid', 'none']);
    const showShape = !noShapeStyles.has(style);
    const showPulseWidth = style === 'pulse';
    const showTrailLength = style === 'trail';
    const showDashGap = style === 'dash';

    // Live preview strip — a small SVG preview of the current animation style
    const previewColor = flow.color ?? '#4ADE80';

    return html`
      <details class="anim-details" open>
        <summary>Animation</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(style, anim, previewColor)}
            </svg>
          </div>

          <label>Style
            <select
              .value=${style}
              @change=${(e: Event) => {
                patch({ animation_style: (e.target as HTMLSelectElement).value as FlowAnimationConfig['animation_style'] });
              }}
            >
              ${ANIMATION_STYLES.map(
                (s) => html`<option value=${s} ?selected=${style === s}>${s}</option>`,
              )}
            </select>
          </label>

          ${showShape ? html`
            <label>Particle shape
              <select
                .value=${anim.particle_shape ?? 'circle'}
                @change=${(e: Event) => {
                  patch({ particle_shape: (e.target as HTMLSelectElement).value as FlowAnimationConfig['particle_shape'] });
                }}
              >
                ${PARTICLE_SHAPES.map(
                  (s) => html`<option value=${s} ?selected=${(anim.particle_shape ?? 'circle') === s}>${s}</option>`,
                )}
              </select>
            </label>
            ${(anim.particle_shape ?? 'circle') === 'custom_svg' ? html`
              <label>SVG path (d= attribute)
                <input type="text"
                  placeholder="M 0 -8 L 5 8 L -5 8 Z"
                  .value=${anim.custom_svg_path ?? ''}
                  @change=${(e: Event) => {
                    patch({ custom_svg_path: (e.target as HTMLInputElement).value.trim() });
                  }}
                />
                <svg class="custom-svg-preview" viewBox="-20 -20 40 40" width="40" height="40"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d=${anim.custom_svg_path || 'M 0 -8 L 5 8 L -5 8 Z'}
                        fill=${previewColor} />
                </svg>
              </label>
            ` : nothing}
          ` : nothing}

          <label>Direction
            <select
              .value=${anim.direction ?? 'auto'}
              @change=${(e: Event) => {
                patch({ direction: (e.target as HTMLSelectElement).value as FlowAnimationConfig['direction'] });
              }}
            >
              ${FLOW_DIRECTIONS.map(
                (d) => html`<option value=${d} ?selected=${(anim.direction ?? 'auto') === d}>${d}</option>`,
              )}
            </select>
          </label>

          <label>Particle size
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(anim.particle_size ?? 1.0)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v)) patch({ particle_size: v });
                }}
              />
              <span>${(anim.particle_size ?? 1.0).toFixed(1)}×</span>
            </div>
          </label>

          <label>Particle count
            <input type="number" min="1" max="20" step="1"
              placeholder="profile default"
              .value=${anim.particle_count !== undefined ? String(anim.particle_count) : ''}
              @change=${(e: Event) => {
                const raw = (e.target as HTMLInputElement).value.trim();
                if (raw === '') { patch({ particle_count: undefined }); return; }
                const v = parseInt(raw, 10);
                if (Number.isFinite(v) && v >= 1) patch({ particle_count: v });
              }}
            />
          </label>

          <label>Particle spacing
            <select
              .value=${anim.particle_spacing ?? 'even'}
              @change=${(e: Event) => {
                patch({ particle_spacing: (e.target as HTMLSelectElement).value as FlowAnimationConfig['particle_spacing'] });
              }}
            >
              ${PARTICLE_SPACINGS.map(
                (s) => html`<option value=${s} ?selected=${(anim.particle_spacing ?? 'even') === s}>${s}</option>`,
              )}
            </select>
          </label>

          ${(anim.particle_spacing === 'clustered') ? html`
            <label>Cluster size
              <input type="number" min="1" max="10" step="1"
                .value=${String(anim.cluster_size ?? 3)}
                @change=${(e: Event) => {
                  const v = parseInt((e.target as HTMLInputElement).value, 10);
                  if (Number.isFinite(v) && v >= 1) patch({ cluster_size: v });
                }}
              />
            </label>
            <label>Cluster gap (×)
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(anim.cluster_gap ?? 2.0)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v) && v > 0) patch({ cluster_gap: v });
                }}
              />
            </label>
          ` : nothing}

          ${(anim.particle_spacing === 'pulse') ? html`
            <label>Pulse frequency (Hz)
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(anim.pulse_frequency ?? 1.0)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v) && v > 0) patch({ pulse_frequency: v });
                }}
              />
            </label>
            <label>Pulse ratio
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(anim.pulse_ratio ?? 0.3)}
                  @change=${(e: Event) => {
                    const v = parseFloat((e.target as HTMLInputElement).value);
                    if (Number.isFinite(v)) patch({ pulse_ratio: v });
                  }}
                />
                <span>${(anim.pulse_ratio ?? 0.3).toFixed(2)}</span>
              </div>
            </label>
          ` : nothing}

          ${(anim.particle_spacing === 'wave_spacing' || anim.particle_spacing === 'wave_lateral') ? html`
            <label>Wave frequency
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(anim.wave_frequency ?? 1.0)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v) && v > 0) patch({ wave_frequency: v });
                }}
              />
            </label>
            <label>${anim.particle_spacing === 'wave_lateral' ? 'Wave amplitude (px)' : 'Wave amplitude (0–1)'}
              <input type="number"
                min=${anim.particle_spacing === 'wave_lateral' ? '1' : '0.05'}
                max=${anim.particle_spacing === 'wave_lateral' ? '40' : '1'}
                step=${anim.particle_spacing === 'wave_lateral' ? '1' : '0.05'}
                .value=${String(anim.wave_amplitude ?? (anim.particle_spacing === 'wave_lateral' ? 8 : 0.7))}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v) && v > 0) patch({ wave_amplitude: v });
                }}
              />
            </label>
          ` : nothing}

          <label>Glow intensity
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(anim.glow_intensity ?? 1.0)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v)) patch({ glow_intensity: v });
                }}
              />
              <span>${(anim.glow_intensity ?? 1.0).toFixed(1)}</span>
            </div>
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${anim.shimmer === true}
              @change=${(e: Event) => patch({ shimmer: (e.target as HTMLInputElement).checked })}
            />
            Shimmer at threshold
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${anim.flicker === true}
              @change=${(e: Event) => patch({ flicker: (e.target as HTMLInputElement).checked })}
            />
            Flicker (random opacity variation)
          </label>

          ${showPulseWidth ? html`
            <label>Pulse width (px)
              <input type="number" min="1" max="20" step="0.5"
                .value=${String(anim.pulse_width ?? 2)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v)) patch({ pulse_width: v });
                }}
              />
            </label>
          ` : nothing}

          ${showTrailLength ? html`
            <label>Trail length
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(anim.trail_length ?? 2.0)}
                  @change=${(e: Event) => {
                    const v = parseFloat((e.target as HTMLInputElement).value);
                    if (Number.isFinite(v)) patch({ trail_length: v });
                  }}
                />
                <span>${(anim.trail_length ?? 2.0).toFixed(2)}×</span>
              </div>
            </label>
          ` : nothing}

          ${showDashGap ? html`
            <label>Dash gap ratio
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(anim.dash_gap ?? 0.5)}
                  @change=${(e: Event) => {
                    const v = parseFloat((e.target as HTMLInputElement).value);
                    if (Number.isFinite(v)) patch({ dash_gap: v });
                  }}
                />
                <span>${(anim.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : nothing}

          ${flow.animation && Object.keys(flow.animation).length > 0
            ? html`<button class="ghost" @click=${() => {
                if (!this.config) return;
                const prev = this.config;
                const next = clearFlowAnimation(prev, flow.id);
                this.pushPatch(prev, next, `reset animation for ${flow.id}`);
              }}>Reset to defaults</button>`
            : nothing}
        </div>
      </details>
    `;
  }

  /**
   * Render a small inline SVG preview strip showing the current animation style.
   * Uses CSS animations (not SVG animateMotion) so it works even with no live data.
   */
  private renderAnimPreview(
    style: string,
    anim: FlowAnimationConfig,
    color: string,
  ): TemplateResult {
    const r = 4 * (anim.particle_size ?? 1.0);
    const count = Math.min(anim.particle_count ?? 3, 8);

    if (style === 'none') {
      return html`<line x1="10" y1="20" x2="190" y2="20" stroke=${color} stroke-width="2" stroke-opacity="0.3"/>`;
    }
    if (style === 'dash') {
      const gap = (anim.dash_gap ?? 0.5);
      const dashLen = 14;
      const gapLen = dashLen * gap;
      return html`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${color} stroke-width="3"
          stroke-dasharray="${dashLen} ${gapLen}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${dashLen + gapLen}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (style === 'fluid') {
      return html`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${color} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (style === 'pulse') {
      const positions = [40, 90, 140];
      return html`
        ${positions.map(
          (cx, i) => html`
            <circle cx=${cx} cy="20" r="0" fill="none"
              stroke=${color} stroke-width=${anim.pulse_width ?? 2}>
              <animate attributeName="r" values="0;12;0" dur="1.2s" repeatCount="indefinite"
                begin="${(i * 0.4).toFixed(1)}s"/>
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite"
                begin="${(i * 0.4).toFixed(1)}s"/>
            </circle>
          `,
        )}
      `;
    }

    // wave_lateral — particles moving along a wavy path
    if (anim.particle_spacing === 'wave_lateral') {
      const waveCx = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 180 + 10);
      return html`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${color} stroke-width="1.5" stroke-opacity="0.25"/>
        ${waveCx.map(
          (cx, i) => html`
            <circle cx=${cx} cy="20" r=${r} fill=${color} opacity="0">
              <animate attributeName="cx" values="${cx};190;10;${cx}" dur="1.4s"
                repeatCount="indefinite" begin="${((i / count) * -1.4).toFixed(2)}s"/>
              <animate attributeName="cy" values="20;${10 + (i % 2 === 0 ? 6 : -6)};20;${10 + (i % 2 === 0 ? -6 : 6)};20"
                dur="1.4s" repeatCount="indefinite" begin="${((i / count) * -1.4).toFixed(2)}s"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
                repeatCount="indefinite" begin="${((i / count) * -1.4).toFixed(2)}s"/>
            </circle>
          `,
        )}
      `;
    }

    // dots / arrow / trail / spark — show moving particles
    const positions = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 180 + 10);
    return html`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${color} stroke-width="1.5" stroke-opacity="0.25"/>
      ${positions.map(
        (cx, i) => html`
          <circle cx=${cx} cy="20" r=${r} fill=${color} opacity="0">
            <animate attributeName="cx" values="${cx};190;10;${cx}" dur="1.4s"
              repeatCount="indefinite" begin="${((i / count) * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${((i / count) * -1.4).toFixed(2)}s"/>
          </circle>
        `,
      )}
    `;
  }

  private renderWaypointList(flow: FlowConfig): TemplateResult {
    if (!this.config) return html``;
    const nodesById = new Map(this.config.nodes.map((n) => [n.id, n]));
    const fromNode = nodesById.get(flow.from_node);
    const toNode = nodesById.get(flow.to_node);

    const addAtMidpoint = () => {
      if (!this.config) return;
      // Find the longest segment and insert a waypoint at its midpoint
      const allPoints = [
        ...(fromNode ? [fromNode.position] : []),
        ...flow.waypoints,
        ...(toNode ? [toNode.position] : []),
      ];
      let longestIdx = 0;
      let longestDist = 0;
      for (let i = 0; i < allPoints.length - 1; i++) {
        const a = allPoints[i]!;
        const b = allPoints[i + 1]!;
        const dist = Math.hypot(b.x - a.x, b.y - a.y);
        if (dist > longestDist) { longestDist = dist; longestIdx = i; }
      }
      const a = allPoints[longestIdx]!;
      const b = allPoints[longestIdx + 1]!;
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      // Insertion index = longestIdx − 0 (from_node doesn't count)
      const insertionIndex = longestIdx > 0 ? longestIdx - 1 + 1 : 0;
      const prev = this.config;
      const next = insertWaypoint(prev, flow.id, insertionIndex, mid);
      this.pushPatch(prev, next, `add waypoint to ${flow.id}`);
    };

    return html`
      <div class="waypoint-section">
        <div class="waypoint-section-header">
          Waypoints
          <span class="waypoint-count">${flow.waypoints.length}</span>
        </div>

        ${flow.waypoints.length === 0
          ? html`<div class="waypoint-empty">No waypoints — click on the flow line to add one.</div>`
          : html`
            <div class="waypoint-list">
              ${flow.waypoints.map((wp, index) => html`
                <div class="waypoint-row">
                  <span class="waypoint-index">#${index + 1}</span>
                  <label class="waypoint-coord">
                    x%
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${wp.x.toFixed(1)}
                      @change=${(e: Event) => {
                        if (!this.config) return;
                        const v = parseFloat((e.target as HTMLInputElement).value);
                        if (!Number.isFinite(v)) return;
                        const prev = this.config;
                        const next = moveWaypoint(prev, flow.id, index, { x: v, y: wp.y });
                        this.pushPatch(prev, next, `move waypoint ${index} of ${flow.id}`);
                      }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    y%
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${wp.y.toFixed(1)}
                      @change=${(e: Event) => {
                        if (!this.config) return;
                        const v = parseFloat((e.target as HTMLInputElement).value);
                        if (!Number.isFinite(v)) return;
                        const prev = this.config;
                        const next = moveWaypoint(prev, flow.id, index, { x: wp.x, y: v });
                        this.pushPatch(prev, next, `move waypoint ${index} of ${flow.id}`);
                      }}
                    />
                  </label>
                  <button class="icon-btn" title="Delete waypoint"
                    @click=${() => {
                      if (!this.config) return;
                      const prev = this.config;
                      const next = deleteWaypoint(prev, flow.id, index);
                      this.pushPatch(prev, next, `delete waypoint ${index} of ${flow.id}`);
                    }}
                  >×</button>
                </div>
              `)}
            </div>
          `}

        <button class="ghost full-width" @click=${addAtMidpoint}>
          + Add waypoint
        </button>
      </div>
    `;
  }

  private renderValueGradientSection(flow: FlowConfig): TemplateResult {
    if (!this.config) return html``;
    const vg = flow.value_gradient;

    // Default gradient config for when user enables it
    const defaultVg: ValueGradientConfig = {
      entity: '',
      low_value: 0,
      high_value: 100,
      low_color: '#1EB4FF',
      high_color: '#FF4500',
      mode: 'both',
    };

    const patch = (partial: Partial<ValueGradientConfig>) => {
      if (!this.config) return;
      const prev = this.config;
      const next = patchValueGradient(prev, flow.id, partial);
      this.pushPatch(prev, next, `update gradient for ${flow.id}`);
    };

    // Build live preview gradient if enabled
    let previewBar = nothing as TemplateResult | typeof nothing;
    if (vg && vg.low_color && vg.high_color) {
      try {
        const midColor = interpolateGradientColor(
          (vg.low_value + vg.high_value) / 2,
          vg,
        );
        const gradStyle = `background: linear-gradient(to right, ${vg.low_color}, ${midColor}, ${vg.high_color});`;
        previewBar = html`
          <div class="gradient-preview-bar" style=${gradStyle}></div>
          <div class="gradient-preview-labels">
            <span>${vg.low_color}</span><span>${vg.high_color}</span>
          </div>
        `;
      } catch {
        // ignore parse errors during editing
      }
    }

    // Use a plain border-boxed section (not <details>) so sub-fields
    // are always visible when the checkbox is checked — <details> has
    // browser-managed open/closed state that LitElement cannot reliably
    // override with ?open= across re-renders.
    return html`
      <div class="gradient-section">
        <div class="gradient-section-header">Value gradient</div>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!vg}
            @change=${(e: Event) => {
              if (!this.config) return;
              const checked = (e.target as HTMLInputElement).checked;
              const prev = this.config;
              const next = checked
                ? setValueGradient(prev, flow.id, defaultVg)
                : clearValueGradient(prev, flow.id);
              this.pushPatch(prev, next, `${checked ? 'enable' : 'disable'} gradient for ${flow.id}`);
            }}
          />
          Enable value gradient
        </label>

        ${vg ? html`
          <label>Gradient entity
            <input type="text" placeholder="sensor.my_temperature"
              .value=${vg.entity}
              @change=${(e: Event) => patch({ entity: (e.target as HTMLInputElement).value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>Low value
              <input type="number" step="any"
                .value=${String(vg.low_value)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v)) patch({ low_value: v });
                }}
              />
            </label>
            <label>Low colour
              <div class="color-row">
                <input type="color"
                  .value=${vg.low_color}
                  @input=${(e: Event) => patch({ low_color: (e.target as HTMLInputElement).value })}
                />
                <span>${vg.low_color}</span>
              </div>
            </label>
          </div>

          <div class="gradient-row">
            <label>High value
              <input type="number" step="any"
                .value=${String(vg.high_value)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v)) patch({ high_value: v });
                }}
              />
            </label>
            <label>High colour
              <div class="color-row">
                <input type="color"
                  .value=${vg.high_color}
                  @input=${(e: Event) => patch({ high_color: (e.target as HTMLInputElement).value })}
                />
                <span>${vg.high_color}</span>
              </div>
            </label>
          </div>

          <label>Apply gradient to
            <select
              .value=${vg.mode ?? 'both'}
              @change=${(e: Event) => {
                patch({ mode: (e.target as HTMLSelectElement).value as ValueGradientConfig['mode'] });
              }}
            >
              <option value="flow" ?selected=${vg.mode === 'flow'}>Particles only</option>
              <option value="line" ?selected=${vg.mode === 'line'}>Line only</option>
              <option value="both" ?selected=${(vg.mode ?? 'both') === 'both'}>Particles and line</option>
            </select>
          </label>

          ${previewBar}

          <button class="ghost" @click=${() => {
            if (!this.config) return;
            const prev = this.config;
            const next = clearValueGradient(prev, flow.id);
            this.pushPatch(prev, next, `disable gradient for ${flow.id}`);
          }}>Remove gradient</button>
        ` : nothing}
      </div>
    `;
  }

  private renderGlobalAnimationPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const animCfg: AnimationConfig = this.config.animation ?? {};

    return html`
      <details class="panel anim-global-panel" open>
        <summary>Animation (global)</summary>
        <div class="panel-body">
          <label>
            FPS cap
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(animCfg.fps ?? 60)}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const v = parseInt((e.target as HTMLInputElement).value, 10);
                  const prev = this.config;
                  const next = setAnimationConfig(prev, { fps: v });
                  this.pushPatch(prev, next, 'set animation fps');
                }}
              />
              <span>${animCfg.fps ?? 60} fps</span>
            </div>
          </label>
          <label class="visibility-row">
            <input type="checkbox"
              .checked=${animCfg.smooth_speed !== false}
              @change=${(e: Event) => {
                if (!this.config) return;
                const checked = (e.target as HTMLInputElement).checked;
                const prev = this.config;
                const next = setAnimationConfig(prev, { smooth_speed: checked });
                this.pushPatch(prev, next, 'set smooth_speed');
              }}
            />
            <span class="visibility-label">Smooth speed transitions</span>
            <span class="visibility-val">${animCfg.smooth_speed !== false ? 'on' : 'off'}</span>
          </label>
          <p class="hint-sub">Smooth speed: interpolates duration changes over 500ms instead of restarting abruptly.</p>
        </div>
      </details>
    `;
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

  private renderOpacityPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const op: OpacityConfig = this.config.opacity ?? {};

    const opacitySlider = <K extends keyof OpacityConfig>(
      key: K,
      label: string,
      defaultVal = 1,
    ) => {
      const val = (op[key] as number | undefined) ?? defaultVal;
      return html`
        <label class="opacity-row">
          <span class="opacity-label">${label}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            .value=${String(val)}
            @input=${(e: Event) => {
              if (!this.config) return;
              const v = parseFloat((e.target as HTMLInputElement).value);
              if (!Number.isFinite(v)) return;
              const prev = this.config;
              const next = setOpacity(prev, key, v as OpacityConfig[K]);
              // live preview without undo entry
              this.config = next;
              this.commitToHa(next);
            }}
            @change=${(e: Event) => {
              if (!this.config) return;
              const v = parseFloat((e.target as HTMLInputElement).value);
              if (!Number.isFinite(v)) return;
              const prev = this.config;
              const next = setOpacity(prev, key, v as OpacityConfig[K]);
              this.pushPatch(prev, next, `set opacity.${key}`);
            }}
          />
          <span class="opacity-val">${val.toFixed(2)}</span>
        </label>
      `;
    };

    return html`
      <details class="panel opacity-panel" open>
        <summary>Opacity</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Adjust opacity for each visual layer. 1.0 = fully opaque, 0.0 = invisible.
            "Darken" is 0 by default (no darkening overlay).
          </p>
          ${opacitySlider('background', 'Background image')}
          ${opacitySlider('darken', 'Background darkening (0=none, 1=black)', 0)}
          ${opacitySlider('nodes', 'Nodes')}
          ${opacitySlider('flows', 'Flow lines')}
          ${opacitySlider('dots', 'Animated dots')}
          ${opacitySlider('glow', 'Glow effect')}
          ${opacitySlider('labels', 'Labels')}
          ${opacitySlider('values', 'Values')}
          ${opacitySlider('overlays', 'Overlays (all)')}
        </div>
      </details>
    `;
  }

  private renderDomainColorsPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const dc: DomainColors = this.config.domain_colors ?? {};

    const DOMAIN_DEFAULTS: DomainColors = {
      solar: '#FFD700',
      grid: '#1EB4FF',
      battery: '#32DC50',
      load: '#FF8C1E',
    };

    const colorRow = (key: keyof DomainColors, label: string) => {
      const override = dc[key];
      const defaultVal = DOMAIN_DEFAULTS[key]!;
      return html`
        <div class="color-picker-row">
          <span class="color-picker-label">${label}</span>
          <input
            type="color"
            .value=${override ?? defaultVal}
            @change=${(e: Event) => {
              if (!this.config) return;
              const val = (e.target as HTMLInputElement).value;
              const prev = this.config;
              const next = setDomainColor(prev, key, val);
              this.pushPatch(prev, next, `set domain_colors.${key}`);
            }}
          />
          <span class="color-picker-value">${override ? override : `${defaultVal} (default)`}</span>
          ${override
            ? html`<button class="ghost small" @click=${() => {
                if (!this.config) return;
                const prev = this.config;
                const next = setDomainColor(prev, key, undefined);
                this.pushPatch(prev, next, `reset domain_colors.${key}`);
              }}>Reset</button>`
            : nothing}
        </div>
      `;
    };

    return html`
      <details class="panel domain-colors-panel">
        <summary>Domain colours</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Override the default colour for each energy domain type. Changes apply to all
            flows of that domain unless a per-flow colour is set.
          </p>
          ${colorRow('solar', 'Solar')}
          ${colorRow('grid', 'Grid')}
          ${colorRow('battery', 'Battery')}
          ${colorRow('load', 'Load')}
        </div>
      </details>
    `;
  }

  private renderVisibilityPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const vis: VisibilityConfig = this.config.visibility ?? {};

    const toggle = <K extends keyof VisibilityConfig>(key: K, label: string) => {
      const value = vis[key] !== false;
      return html`
        <label class="visibility-row">
          <span class="visibility-label">${label}</span>
          <input
            type="checkbox"
            .checked=${value}
            @change=${(e: Event) => {
              if (!this.config) return;
              const checked = (e.target as HTMLInputElement).checked;
              const prev = this.config;
              const next = setVisibility(prev, key, checked);
              this.pushPatch(prev, next, `set visibility.${key}`);
            }}
          />
          <span class="visibility-val">${value ? 'visible' : 'hidden'}</span>
        </label>
      `;
    };

    return html`
      <details class="panel visibility-panel">
        <summary>Visibility</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Binary show/hide for each rendering layer. Independent of opacity.
          </p>
          ${toggle('nodes', 'Nodes')}
          ${toggle('lines', 'Flow lines')}
          ${toggle('dots', 'Animated dots')}
          ${toggle('labels', 'Labels')}
          ${toggle('values', 'Values')}
          ${toggle('overlays', 'Overlays')}
        </div>
      </details>
    `;
  }

  private renderDefaultsPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const d: FlowmeDefaults = this.config.defaults ?? {};

    const numInput = <K extends keyof FlowmeDefaults>(
      key: K,
      label: string,
      opts: { min: number; max: number; step: number; defaultVal: number },
    ) => {
      const val = (d[key] as number | undefined) ?? opts.defaultVal;
      return html`
        <label class="defaults-row">
          <span class="defaults-label">${label}</span>
          <input
            type="number"
            min=${opts.min}
            max=${opts.max}
            step=${opts.step}
            .value=${String(val)}
            @change=${(e: Event) => {
              if (!this.config) return;
              const raw = parseFloat((e.target as HTMLInputElement).value);
              if (!Number.isFinite(raw)) return;
              const clamped = Math.max(opts.min, Math.min(opts.max, raw)) as FlowmeDefaults[K];
              const prev = this.config;
              const next = setDefault(prev, key, clamped);
              this.pushPatch(prev, next, `set defaults.${key}`);
            }}
          />
          <span class="defaults-unit">${val}</span>
        </label>
      `;
    };

    return html`
      <details class="panel defaults-panel" open>
        <summary>Defaults</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Card-level rendering defaults. All fields are optional — omitting them
            keeps the built-in values shown in parentheses.
          </p>
          ${numInput('node_radius', 'Node radius (px)', { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${numInput('dot_radius', 'Dot radius (px)', { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${numInput('line_width', 'Line width (px)', { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${numInput('burst_trigger_ratio', 'Burst trigger ratio (0–1)', { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${numInput('burst_sustain_ms', 'Burst sustain (ms)', { min: 1000, max: 30000, step: 500, defaultVal: 5000 })}
          ${numInput('burst_max_particles', 'Burst max particles', { min: 3, max: 50, step: 1, defaultVal: 20 })}
        </div>
      </details>
    `;
  }

  // ── Zone 3: context panel ──────────────────────────────────────────────────

  /** Dispatches to the correct inspector based on current selection. */
  private renderContextPanel(): TemplateResult {
    if (!this.config) return html``;
    if (this.selectedNodeId || this.selectedFlowId || this.selectedOverlayId) {
      return html`<div class="z-context-body">${this.renderInspector()}</div>`;
    }
    return this.renderStateA();
  }

  /** State A — nothing selected: background, appearance, defaults panels. */
  private renderStateA(): TemplateResult {
    return html`
      <div class="z-context-body state-a">
        ${this.renderWeatherPanel()}
        ${this.renderGlobalAnimationPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
      </div>
    `;
  }

  // ──────────────────────────────────────────────────────────────────────────

  private renderMultiSelectToolbar(): TemplateResult | typeof nothing {
    const count = this.selectedNodeIds.size;
    if (count < 2) return nothing;
    const ids = this.selectedNodeIds;
    const anchorId = Array.from(ids)[0]!;
    return html`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${count} nodes selected</span>
        <button
          class="ms-btn"
          title=${count === 2 ? 'Suggest path between selected nodes' : 'Select exactly 2 nodes to suggest a path'}
          ?disabled=${count !== 2 || this.suggestBusy}
          @click=${() => this.runSuggestPath()}
        >Suggest path</button>
        <button class="ms-btn" @click=${() => this.bulkHide(ids)}>Hide</button>
        <button class="ms-btn" @click=${() => this.bulkShow(ids)}>Show</button>
        <button class="ms-btn" @click=${() => this.bulkAlignH(ids, anchorId)}>Align H</button>
        <button class="ms-btn" @click=${() => this.bulkAlignV(ids, anchorId)}>Align V</button>
        <button class="ms-btn danger" @click=${() => this.bulkDelete(ids)}>Delete</button>
        <button class="ms-btn ghost" @click=${() => { this.selectedNodeIds = new Set(); this.selectedNodeId = null; }}>✕ Deselect</button>
      </div>
    `;
  }

  private bulkHide(ids: Set<string>): void {
    if (!this.config) return;
    const prev = this.config;
    const next = bulkSetNodesVisible(prev, ids, false);
    this.pushPatch(prev, next, `hide ${ids.size} nodes`);
  }

  private bulkShow(ids: Set<string>): void {
    if (!this.config) return;
    const prev = this.config;
    const next = bulkSetNodesVisible(prev, ids, true);
    this.pushPatch(prev, next, `show ${ids.size} nodes`);
  }

  private bulkAlignH(ids: Set<string>, anchorId: string): void {
    if (!this.config) return;
    const prev = this.config;
    const next = alignNodesHorizontal(prev, ids, anchorId);
    this.pushPatch(prev, next, `align ${ids.size} nodes horizontally`);
  }

  private bulkAlignV(ids: Set<string>, anchorId: string): void {
    if (!this.config) return;
    const prev = this.config;
    const next = alignNodesVertical(prev, ids, anchorId);
    this.pushPatch(prev, next, `align ${ids.size} nodes vertically`);
  }

  private bulkDelete(ids: Set<string>): void {
    if (!this.config) return;
    if (!window.confirm(`Delete ${ids.size} nodes (and their flows)?`)) return;
    const prev = this.config;
    const next = bulkDeleteNodes(prev, ids);
    this.pushPatch(prev, next, `delete ${ids.size} nodes`);
    this.selectedNodeIds = new Set();
    this.selectedNodeId = null;
  }

  private renderWeatherPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const bg = this.config.background;
    const stateEntries = Object.entries(bg.weather_states ?? {});
    const liveWeatherState =
      bg.weather_entity && this.hass ? this.hass.states[bg.weather_entity]?.state : undefined;
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
          ${liveWeatherState !== undefined
            ? html`<div class="weather-live-state">
                Current state: <strong>${liveWeatherState}</strong>
                ${bg.weather_states?.[liveWeatherState]
                  ? html` → <span class="weather-match-ok">matched</span>`
                  : html` → <span class="weather-match-miss">no mapping (using default)</span>`}
              </div>`
            : nothing}
          <label>
            Sun entity (optional) — enables automatic night background variants
            ${this.renderEntityPicker(
              bg.sun_entity ?? '',
              (value) => {
                if (!this.config) return;
                const prev = this.config;
                const next = setSunEntity(prev, value || undefined);
                this.pushPatch(prev, next, 'set sun entity');
              },
              { includeDomains: ['sun'], placeholder: 'sun.sun' },
            )}
          </label>
          ${bg.sun_entity && this.hass?.states[bg.sun_entity]
            ? html`<div class="weather-live-state">
                Sun: <strong>${this.hass.states[bg.sun_entity]?.state === 'above_horizon'
                  ? '☀️ above horizon'
                  : '🌙 below horizon'}</strong>
              </div>`
            : nothing}
          <label>
            Fade transition (seconds)
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              .value=${String(Math.round((bg.transition_duration ?? 5000) / 1000))}
              @change=${(e: Event) => {
                if (!this.config) return;
                const secs = parseFloat((e.target as HTMLInputElement).value);
                if (!Number.isFinite(secs) || secs < 0) return;
                const prev = this.config;
                const next = setTransitionDuration(prev, secs * 1000);
                this.pushPatch(prev, next, 'set background transition duration');
              }}
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
          <details class="hint-details">
            <summary>Standard Met.no state list (for reference)</summary>
            <div class="hint-states">
              ${FlowmeCardEditor.KNOWN_WEATHER_STATES.map(
                (s) => html`<code>${s}</code>`,
              )}
              <p class="hint-sub">
                Any state string is accepted — custom integrations can use any key.
                State strings are matched exactly as Home Assistant provides them (lowercase, hyphenated).
              </p>
            </div>
          </details>
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

  // -- suggest path --

  private async runSuggestPath(): Promise<void> {
    if (!this.config || this.selectedNodeIds.size !== 2) {
      return;
    }
    const [fromId, toId] = Array.from(this.selectedNodeIds) as [string, string];
    const fromNode = this.config.nodes.find((n) => n.id === fromId);
    const toNode = this.config.nodes.find((n) => n.id === toId);
    if (!fromNode || !toNode) {
      return;
    }

    this.suggestBusy = true;
    try {
      const result = await suggestPath({
        imageUrl: this.config.background.default,
        from: fromNode.position,
        to: toNode.position,
      });
      if (!result.edgesUsable) {
        this.errorMessage =
          'Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.';
        this.suggestPreview = null;
        return;
      }
      if (result.waypoints.length === 0) {
        // Still create the preview so the user can accept (creates a straight-line flow)
      }
      this.suggestPreview = {
        fromNodeId: fromId,
        toNodeId: toId,
        waypoints: result.waypoints,
        edgesUsable: result.edgesUsable,
        elapsedMs: result.elapsedMs,
      };
    } catch (err) {
      this.errorMessage =
        'Auto-route failed: ' + (err instanceof Error ? err.message : String(err));
      this.suggestPreview = null;
    } finally {
      this.suggestBusy = false;
    }
  }

  private acceptSuggestion = (): void => {
    if (!this.config || !this.suggestPreview) return;
    const { fromNodeId, toNodeId, waypoints } = this.suggestPreview;
    const entity =
      window.prompt(
        'Entity for this flow (e.g. sensor.grid_power):',
        'sensor.placeholder_entity',
      ) ?? 'sensor.placeholder_entity';
    const prev = this.config;
    // Check if a flow already exists between these two nodes.
    const existing = prev.flows.find(
      (f) => f.from_node === fromNodeId && f.to_node === toNodeId,
    );
    let next: FlowmeConfig;
    let flowId: string;
    if (existing) {
      // Update waypoints of the existing flow.
      flowId = existing.id;
      next = {
        ...prev,
        flows: prev.flows.map((f) =>
          f.id === existing.id
            ? { ...f, waypoints: waypoints.map((w) => ({ x: w.x, y: w.y })) }
            : f,
        ),
      };
    } else {
      // Create a new flow with the suggested waypoints.
      const { config: withFlow, flow } = addFlow(prev, fromNodeId, toNodeId, entity);
      flowId = flow.id;
      next = {
        ...withFlow,
        flows: withFlow.flows.map((f) =>
          f.id === flow.id
            ? { ...f, waypoints: waypoints.map((w) => ({ x: w.x, y: w.y })) }
            : f,
        ),
      };
    }
    // Clear preview and selection BEFORE pushPatch so Lit sees all state updates
    // in the same render batch.
    this.suggestPreview = null;
    this.selectedNodeIds = new Set();
    this.selectedNodeId = null;
    this.selectedOverlayId = null;
    this.pushPatch(prev, next, `suggest-path ${flowId}`);
    // Select the new/updated flow after config is updated so renderWaypointHandles
    // sees the correct waypoints in this.config.
    this.selectedFlowId = flowId;
  };

  private cancelSuggestion = (): void => {
    this.suggestPreview = null;
  };

  private renderSuggestPreview(): TemplateResult | typeof nothing {
    if (!this.suggestPreview || !this.config) return nothing;
    const fromNode = this.config.nodes.find((n) => n.id === this.suggestPreview!.fromNodeId);
    const toNode = this.config.nodes.find((n) => n.id === this.suggestPreview!.toNodeId);
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
      return;
    }

    if (this.pending?.kind === 'add-flow') {
      if (this.pending.step === 'pick-from') {
        // must click a node; stage clicks don't count
      }
      return;
    }

    this.selectedNodeIds = new Set();
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
    }
  };


  private onSegmentClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as SVGElement;
    const flowId = target.dataset['flowId'];
    if (!flowId) return;

    const segmentIndexRaw = target.dataset['segmentIndex'];
    const segmentIndex = segmentIndexRaw !== undefined ? Number(segmentIndexRaw) : NaN;

    // shift-click on a hit-area segment = insert waypoint at click point
    if (event.shiftKey && Number.isFinite(segmentIndex)) {
      const pos = this.pointerToPercent(event);
      if (!pos) return;
      const prev = this.config;
      const next = insertWaypoint(prev, flowId, segmentIndex, pos);
      this.pushPatch(prev, next, `add waypoint to ${flowId}`);
      return;
    }
    // Plain click (on either visible path or hit segment): select the flow
    this.selectedFlowId = flowId;
    this.selectedNodeId = null;
    this.selectedOverlayId = null;
  };

  private onNodeClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement;
    const nodeId = target.dataset['nodeId'];
    if (!nodeId) return;

    // Selection (shift+click and normal click) is handled in onHandlePointerUp
    // to get reliable shiftKey on all platforms. onNodeClick is only used for
    // the add-flow pending workflow which requires a true 'click' event.
    if (this.pending?.kind === 'add-flow') {
      if (this.pending.step === 'pick-from') {
        this.pending = { kind: 'add-flow', step: 'pick-to', fromId: nodeId };
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
        return;
      }
    }
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
    // Space+drag is handled by the canvas pan; don't start a node/waypoint drag.
    if (this.spaceHeld) return;
    const el = event.currentTarget as HTMLElement;
    const waypointIndexRaw = el.dataset['waypointIndex'];
    const flowId = el.dataset['flowId'];
    const nodeId = el.dataset['nodeId'];
    const overlayId = el.dataset['overlayId'];

    let target: DragTarget | null = null;
    if (nodeId) {
      // If dragged node is in the multi-select set (>1 node), start bulk drag
      if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(nodeId)) {
        const startPositions = new Map<string, NodePosition>();
        for (const n of this.config.nodes) {
          if (this.selectedNodeIds.has(n.id)) startPositions.set(n.id, { ...n.position });
        }
        target = {
          kind: 'node-bulk',
          ids: Array.from(this.selectedNodeIds),
          startPositions,
          startPx: { x: event.clientX, y: event.clientY },
        };
      } else {
        target = { kind: 'node', id: nodeId };
        // NOTE: do NOT change selection here — selection is handled in
        // onHandlePointerUp (when no drag occurred) so that shiftKey is
        // readable reliably. See BUG-2 fix.
      }
    } else if (overlayId && !el.classList.contains('overlay-resize'))
      target = { kind: 'overlay', id: overlayId };
    else if (flowId && waypointIndexRaw !== undefined) {
      target = { kind: 'waypoint', flowId, index: Number(waypointIndexRaw) };
    }
    if (!target) return;

    // Do NOT call event.preventDefault() here — that would suppress the
    // subsequent 'click' event and break shiftKey detection on macOS.
    el.setPointerCapture(event.pointerId);
    this.dragPointerId = event.pointerId;
    this.dragTarget = target;
    this.dragStartConfig = this.config;
    this.dragStartPx = { x: event.clientX, y: event.clientY };
    this.dragMoved = false;
    this.dragShiftHeld = event.shiftKey;
  };

  private onHandlePointerMove = (event: PointerEvent): void => {
    if (this.dragPointerId !== event.pointerId || !this.dragTarget || !this.config) return;
    const target = this.dragTarget;
    this.dragShiftHeld = event.shiftKey;

    // Overlay resize: must run before the 4px drag threshold — resize pointerdown
    // does not set dragStartPx (that path is only for node/waypoint/overlay move).
    // Deltas are in image space (same basis as pointerToPercent): screen Δ / scale
    // → card px, then ÷ imageNaturalW/H → percentage width/height.
    if (target.kind === 'overlay-resize') {
      const iw = this.imageNaturalW > 0 ? this.imageNaturalW : 1;
      const ih = this.imageNaturalH > 0 ? this.imageNaturalH : 1;
      const dxCard = (event.clientX - target.startPx.x) / this.scale;
      const dyCard = (event.clientY - target.startPx.y) / this.scale;
      const dxPct = (dxCard / iw) * 100;
      const dyPct = (dyCard / ih) * 100;
      let w = target.startSize.width + dxPct;
      let h = target.startSize.height + dyPct;
      if (this.dragShiftHeld) {
        w = Math.round(w);
        h = Math.round(h);
      }
      this.dragMoved = true;
      this.config = setOverlaySize(this.config, target.id, { width: w, height: h });
      return;
    }

    // Mark as a real drag once the pointer moves > 4px in either axis
    if (!this.dragMoved && this.dragStartPx) {
      const dx = event.clientX - this.dragStartPx.x;
      const dy = event.clientY - this.dragStartPx.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) this.dragMoved = true;
    }
    if (!this.dragMoved) return; // don't start live-preview until it's a real drag

    const pos = this.pointerToPercent(event);
    if (!pos) return;
    const snapped = this.dragShiftHeld
      ? { x: clampPercent(snapToGrid(pos.x)), y: clampPercent(snapToGrid(pos.y)) }
      : pos;

    // live preview — update this.config directly, no patch pushed
    if (target.kind === 'node') {
      this.config = moveNode(this.config, target.id, snapped);
    } else if (target.kind === 'node-bulk') {
      // Bulk move: delta in screen pixels → card-space pixels → percentage
      const canvas = this.canvasRef.value;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const stageW = rect.width - 16;
      const stageH = rect.height - 8;
      // screen delta / scale = card-space delta; card-space / stageSize * 100 = %
      const dxPct = ((event.clientX - target.startPx.x) / this.scale / stageW) * 100;
      const dyPct = ((event.clientY - target.startPx.y) / this.scale / stageH) * 100;
      const moves = new Map<string, NodePosition>();
      for (const [id, startPos] of target.startPositions) {
        const x = this.dragShiftHeld ? snapToGrid(startPos.x + dxPct) : startPos.x + dxPct;
        const y = this.dragShiftHeld ? snapToGrid(startPos.y + dyPct) : startPos.y + dyPct;
        moves.set(id, { x, y });
      }
      this.config = bulkMoveNodes(this.config, moves);
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
    const wasDrag = this.dragMoved;
    this.dragPointerId = null;
    this.dragTarget = null;
    this.dragStartConfig = null;
    this.dragStartPx = null;
    this.dragMoved = false;

    if (!target) return;

    // --- Click (no significant movement): handle selection here. ---
    // We do this in pointerup rather than click so we can reliably read
    // shiftKey. The browser synthesises 'click' after pointerup but on
    // macOS event.shiftKey is unreliable in some shadow-DOM scenarios.
    if (!wasDrag && target.kind === 'node') {
      const nodeId = target.id;

      if (this.pending?.kind === 'add-flow') {
        // add-flow picking is handled by the @click handler; let it through.
        return;
      }

      if (event.shiftKey) {
        // Shift+click: toggle this node in/out of the selection set
        const next = new Set(this.selectedNodeIds);
        if (next.has(nodeId)) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }
        this.selectedNodeIds = next;
        this.selectedNodeId = next.size === 1 ? Array.from(next)[0]! : null;
        this.selectedFlowId = null;
        this.selectedOverlayId = null;
      } else {
        // Normal click: single-select (clears any multi-selection)
        this.selectedNodeIds = new Set([nodeId]);
        this.selectedNodeId = nodeId;
        this.selectedFlowId = null;
        this.selectedOverlayId = null;
      }
      return;
    }

    // --- Drag: push undo patch only if something actually moved. ---
    if (!wasDrag || !startConfig || !endConfig) return;
    if (startConfig === endConfig) return;

    let description: string;
    switch (target.kind) {
      case 'node':
        description = `move node ${target.id}`;
        break;
      case 'node-bulk':
        description = `move ${target.ids.length} nodes`;
        break;
      case 'overlay':
        description = `move overlay ${target.id}`;
        break;
      case 'overlay-resize':
        description = `resize overlay ${target.id}`;
        break;
      default:
        description = target.kind === 'waypoint'
          ? `move waypoint ${target.index} of ${target.flowId}`
          : `canvas drag`;
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
    // Escape: deselect all
    if (event.key === 'Escape') {
      this.selectedNodeIds = new Set();
      this.selectedNodeId = null;
      this.selectedFlowId = null;
      this.selectedOverlayId = null;
      return;
    }
    const mod = event.metaKey || event.ctrlKey;
    if (!mod) return;
    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.undoStack.undo();
    } else if ((key === 'z' && event.shiftKey) || key === 'y') {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.undoStack.redo();
    }
  };

  // -- zoom / pan --

  /**
   * Clamp panX/panY so the background image always covers the full stage — no
   * black borders in any direction. Must be called after every pan or zoom change.
   */
  private clampPan(): void {
    const canvas = this.canvasRef.value;
    if (!canvas) return;
    const stageW = canvas.offsetWidth - 16;
    const stageH = canvas.offsetHeight - 8;
    const scaledW = this.imageNaturalW * this.scale;
    const scaledH = this.imageNaturalH * this.scale;
    // Image must cover the viewport: max pan is 0 (left/top edge), min pan keeps
    // the right/bottom edge at the stage right/bottom edge.
    this.panX = Math.min(0, Math.max(stageW - scaledW, this.panX));
    this.panY = Math.min(0, Math.max(stageH - scaledH, this.panY));
  }

  private adjustZoom(factor: number, originX?: number, originY?: number): void {
    const canvas = this.canvasRef.value;
    const ox = originX ?? (canvas ? canvas.offsetWidth / 2 : 0);
    const oy = originY ?? (canvas ? canvas.offsetHeight / 2 : 0);
    const newScale = Math.min(5, Math.max(this.fitScale, this.scale * factor));
    if (newScale === this.scale) return;
    // Adjust pan so the point under the origin stays fixed
    this.panX = ox - (ox - this.panX) * (newScale / this.scale);
    this.panY = oy - (oy - this.panY) * (newScale / this.scale);
    this.scale = newScale;
    this.clampPan();
  }

  private resetZoom(): void {
    this.scale = this.fitScale;
    this.panX = this.fitPanX;
    this.panY = this.fitPanY;
  }

  private onSpaceDown = (e: KeyboardEvent): void => {
    if (e.code === 'Space' && !e.repeat && !this.spaceHeld) {
      this.spaceHeld = true;
      e.preventDefault();
    }
  };

  private onSpaceUp = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.spaceHeld = false;
      if (this.panPointerId !== null) {
        const canvas = this.canvasRef.value;
        canvas?.releasePointerCapture(this.panPointerId);
        this.panPointerId = null;
      }
    }
  };

  private onCanvasWheel = (e: WheelEvent): void => {
    e.preventDefault();
    const canvas = this.canvasRef.value;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ox = e.clientX - rect.left;
    const oy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.25 : 0.8;
    this.adjustZoom(factor, ox, oy);
  };

  private onCanvasPointerDown = (e: PointerEvent): void => {
    // Middle-mouse pan
    if (e.button === 1) {
      e.preventDefault();
      const canvas = this.canvasRef.value;
      canvas?.setPointerCapture(e.pointerId);
      this.panPointerId = e.pointerId;
      return;
    }
    // Space+left-drag pan
    if (e.button === 0 && this.spaceHeld) {
      e.preventDefault();
      e.stopPropagation();
      const canvas = this.canvasRef.value;
      canvas?.setPointerCapture(e.pointerId);
      this.panPointerId = e.pointerId;
    }
  };

  private onCanvasPointerMove = (e: PointerEvent): void => {
    if (this.panPointerId !== e.pointerId) return;
    this.panX += e.movementX;
    this.panY += e.movementY;
    this.clampPan();
  };

  private onCanvasPointerUp = (e: PointerEvent): void => {
    if (this.panPointerId !== e.pointerId) return;
    const canvas = this.canvasRef.value;
    canvas?.releasePointerCapture(e.pointerId);
    this.panPointerId = null;
  };

  // -- utilities --

  /**
   * Convert client coordinates to card-space percentage, correctly accounting
   * for zoom (scale) and pan. The canvas-content layer has a CSS transform
   * applied, so stage.getBoundingClientRect() returns visually-scaled dimensions.
   * We reverse the transform to get true card-space coordinates.
   *
   * Transform applied to canvas-content:
   *   screenPos = panOffset + cardPos * scale
   * Inverse:
   *   cardPos = (screenPos - panOffset) / scale
   *
   * The stage's CSS (unscaled) size equals the canvas size because it uses
   * position:absolute;inset:4px 8px. At scale=1 the stage bounding rect
   * equals the canvas rect. At scale>1 the stage bounding rect is larger.
   * Dividing by scale restores the original CSS size.
   */
  /**
   * Convert a screen-space pointer coordinate to a card-space percentage [0..100].
   *
   * Layout chain:
   *   canvas (.z-canvas)
   *     └─ stage (position:absolute; inset:4px 8px)
   *          └─ canvas-content (position:absolute; inset:0)
   *               transform: translate(panX, panY) scale(scale); transform-origin:0 0
   *
   * canvas-content origin is at stage top-left (CSS coords). A card point at
   * (cx%, cy%) sits at CSS position (stageW*cx/100, stageH*cy/100) within
   * canvas-content. After the transform it appears at screen offset:
   *   screenX = stageLeft + panX + stageW*(cx/100)*scale
   *   screenY = stageTop  + panY + stageH*(cy/100)*scale
   *
   * Inverting:
   *   cx% = (screenX - stageLeft - panX) / (stageW * scale) * 100
   *   cy% = (screenY - stageTop  - panY) / (stageH * scale) * 100
   *
   * stageLeft = canvasLeft + 8;  stageTop = canvasTop + 4
   */
  private pointerToPercent(event: { clientX: number; clientY: number }): NodePosition | null {
    const canvas = this.canvasRef.value;
    if (!canvas) return null;
    const canvasRect = canvas.getBoundingClientRect();
    if (canvasRect.width <= 0 || canvasRect.height <= 0) return null;
    // Pointer offset from the stage top-left corner (screen space).
    // Stage is inset 4px top, 8px left within the canvas element.
    const fromStageLeft = event.clientX - (canvasRect.left + 8);
    const fromStageTop  = event.clientY - (canvasRect.top  + 4);
    // canvas-content origin is at stage top-left; its CSS size is imageNaturalW × imageNaturalH.
    // After transform: screenOffset = pan + cardPx * scale
    // Inverting:       cardPx = (screenOffset - pan) / scale
    // Percentage:      x% = cardPx / imageNaturalW * 100
    const cardX = (fromStageLeft - this.panX) / this.scale;
    const cardY = (fromStageTop  - this.panY) / this.scale;
    const x = clampPercent((cardX / this.imageNaturalW) * 100);
    const y = clampPercent((cardY / this.imageNaturalH) * 100);
    return { x, y };
  }

  private pushPatch(prev: FlowmeConfig, next: FlowmeConfig, description: string): void {
    try {
      // Deep-copy both states via validateConfig to ensure undo/redo restores
      // fully independent snapshots (prevents shared-reference bugs with waypoints).
      const validatedPrev = validateConfig(prev);
      const validatedNext = validateConfig(next);
      this.errorMessage = '';
      this.undoStack.push({ prev: validatedPrev, next: validatedNext, description });
      this.commitToHa(validatedNext);
      this.config = validatedNext;
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
    // Set _ownCommit BEFORE dispatch. If HA calls setConfig synchronously
    // inside the event handler the flag is already true. If HA calls it
    // asynchronously (microtask / setTimeout) the flag remains true until
    // setConfig consumes and clears it — never reset it here.
    this._ownCommit = true;
    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    // Do NOT reset _ownCommit here — setConfig() resets it after it reads it.
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
    /* ── Three-zone layout ─────────────────────────────────────────────────
       HA editor dialog is ~510px tall. Target split:
         Canvas  140px  (fixed — avoids %-of-min-height ambiguity)
         Toolbar  36px  (fixed)
         Options  flex-grows to fill all remaining height
    ────────────────────────────────────────────────────────────────────── */
    .wrap {
      display: flex;
      flex-direction: column;
      /* min-height: HA doesn't always give :host an explicit height;
         600px ensures the editor is usable in any context. */
      min-height: 600px;
      height: 100%;
      padding: 0;
      gap: 0;
      overflow: hidden;
    }
    /* ZONE 1 — Canvas (fixed 140px so height is never ambiguous) */
    .z-canvas {
      flex: 0 0 140px;
      width: 100%;
      position: relative;
      overflow: hidden;
    }
    /* ZONE 2 — Toolbar (fixed 72px — two rows of 36px each) */
    .z-toolbar {
      flex: 0 0 72px;
      display: grid;
      grid-template-columns: 15% 50% 35%;
      background: var(--card-background-color, #1a1a1a);
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      overflow: hidden;
    }
    /* ── Toolbar: left column — Undo/Redo (row 1) + Zoom (row 2) ── */
    .tb-col-undo {
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .tb-icon-row {
      flex: 1 1 0;
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.06));
    }
    .tb-icon-row:last-child {
      border-bottom: none;
    }
    .tb-icon-btn {
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font: inherit;
      background: transparent;
      border: none;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.06));
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: background 120ms;
    }
    .tb-icon-btn:last-child {
      border-right: none;
    }
    .tb-icon-btn:hover:not(:disabled) {
      background: var(--secondary-background-color, rgba(255,255,255,0.08));
    }
    .tb-icon-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    /* ── Toolbar: centre column — Actions ── */
    .tb-col-actions {
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      overflow: hidden;
    }
    .tb-row {
      flex: 1 1 0;
      display: flex;
      align-items: stretch;
      min-height: 0;
      overflow: hidden;
    }
    .tb-row-save {
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.06));
    }
    .tb-btn {
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font: inherit;
      font-size: 11px;
      padding: 0 4px;
      border: none;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.08));
      background: transparent;
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 120ms;
    }
    .tb-btn:last-child {
      border-right: none;
    }
    .tb-btn:hover:not(:disabled) {
      background: var(--secondary-background-color, rgba(255,255,255,0.1));
    }
    .tb-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .tb-btn-save {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .tb-btn-save:hover:not(:disabled) {
      filter: brightness(1.15);
    }
    .tb-btn-cancel:hover:not(:disabled) {
      background: var(--error-color, rgba(239,68,68,0.2));
      color: var(--error-color, #ef4444);
    }
    .tb-status {
      flex: 1 1 auto;
      font-size: 10px;
      color: #4ade80;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      padding: 0 4px;
    }
    .tb-error {
      flex: 1 1 auto;
      font-size: 10px;
      color: var(--error-color, #f44336);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      padding: 0 4px;
    }
    /* ── Toolbar: right column — Element selector ── */
    .tb-col-selector {
      display: flex;
      flex-direction: column;
      padding: 1px 2px;
      gap: 1px;
      overflow: hidden;
    }
    .tb-select {
      flex: 1 1 0;
      width: 100%;
      box-sizing: border-box;
      font-size: 11px;
      font: inherit;
      font-size: 11px;
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
      border-radius: 3px;
      padding: 0 2px;
      min-height: 0;
    }
    .tb-select:disabled {
      opacity: 0.4;
    }
    /* ZONE 3 — Context / Options panel (flex-grows to fill remaining height) */
    .z-context {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
    }
    .z-context-body {
      padding: 8px 0;
    }
    .z-context-body.state-a {
      display: flex;
      flex-direction: column;
    }
    /* ── Canvas stage ──────────────────────────────────────────────────── */
    .stage {
      position: absolute;
      /* Inset slightly for border aesthetics; position:absolute fills z-canvas. */
      inset: 4px 8px;
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
    .stage.mode-pan {
      cursor: grab;
    }
    /* canvas-content: unified scene layer sized to image natural dimensions.
       Width/height are set via inline style (imageNaturalW × imageNaturalH px).
       Transform pans/zooms the whole scene as one unit. */
    .canvas-content {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      will-change: transform;
    }
    /* Background image fills canvas-content exactly — no distortion since
       canvas-content is sized to match the image's natural dimensions. */
    .background {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .connectors .flow-path {
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
      pointer-events: visibleStroke;
      fill: none;
      cursor: pointer;
      opacity: 0.55;
      transition: opacity 0.15s, stroke-width 0.1s;
    }
    .connectors .flow-path:hover {
      opacity: 1;
      stroke-width: 3;
    }
    .connectors .flow-path.selected {
      opacity: 1;
      stroke-width: 3;
      filter: drop-shadow(0 0 4px currentColor);
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
    /* Single-select: primary-color ring */
    .handle.selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 6px var(--primary-color, #03a9f4);
    }
    /* Any node in the selection set (single or multi): white ring 4px outside, 2px wide */
    .handle.in-selection .handle-dot {
      box-shadow: 0 0 0 4px transparent, 0 0 0 6px #ffffff, 0 0 0 8px rgba(3,169,244,0.6);
    }
    /* Multi-select additionally brightens the ring */
    .handle.multi-selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0,0,0,0.4), 0 0 0 5px #ffffff, 0 0 0 7px #03a9f4;
    }
    /* Multi-select toolbar */
    .multiselect-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      padding: 6px 8px;
      background: rgba(3,169,244,0.12);
      border: 1px solid rgba(3,169,244,0.3);
      border-radius: 8px;
      margin-top: 4px;
    }
    .multiselect-count {
      font-size: 11px;
      font-weight: 600;
      color: var(--primary-color, #03a9f4);
      flex-shrink: 0;
    }
    .ms-btn {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.07);
      color: #fff;
      cursor: pointer;
    }
    .ms-btn:hover { background: rgba(255,255,255,0.15); }
    .ms-btn:disabled { opacity: 0.4; cursor: default; }
    .ms-btn.danger { border-color: rgba(239,68,68,0.5); color: #fca5a5; }
    .ms-btn.danger:hover { background: rgba(239,68,68,0.2); }
    .ms-btn.ghost { opacity: 0.7; }
    .suggest-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #f59e0b;
      color: #000;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
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
      width: 12px;
      height: 12px;
      border-radius: 2px;
      background: #ffffff;
      border: 2px solid var(--primary-color, #03a9f4);
      cursor: move;
      touch-action: none;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
    }
    .waypoint:hover {
      background: #fff;
      transform: translate(-50%, -50%) scale(1.25);
    }
    .waypoint:active {
      cursor: move;
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
      right: -8px;
      bottom: -8px;
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
      border-radius: 3px;
      background: var(--primary-color, #03a9f4);
      border: 2px solid rgba(255, 255, 255, 0.9);
      cursor: nwse-resize;
      pointer-events: all;
      touch-action: none;
      box-sizing: border-box;
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
    .inspector-slider-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .inspector-slider-row input[type='range'] {
      flex: 1;
    }
    .inspector-slider-row span {
      font-size: 11px;
      opacity: 0.7;
      min-width: 30px;
      text-align: right;
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
    /* ── Node inspector compact rows ── */
    .node-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      align-items: flex-end;
      margin-bottom: 6px;
    }
    .node-cell {
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      min-width: 60px;
      gap: 2px;
      font-size: 11px;
    }
    .node-cell-label {
      font-size: 10px;
      opacity: 0.65;
      white-space: nowrap;
    }
    .node-cell input[type='text'],
    .node-cell input[type='number'] {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      font-size: 11px;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .node-cell input[type='color'] {
      width: 100%;
      height: 26px;
      padding: 1px 2px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
      cursor: pointer;
      box-sizing: border-box;
    }
    .node-cell-toggle {
      flex-direction: row;
      align-items: center;
      gap: 4px;
      min-width: auto;
    }
    .node-cell-toggle input[type='checkbox'] {
      width: 14px;
      height: 14px;
      cursor: pointer;
      flex-shrink: 0;
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
    .panel {
      margin: 0 12px 12px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
    }
    .panel summary {
      list-style: none;
      cursor: pointer;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 600;
    }
    .panel summary::-webkit-details-marker {
      display: none;
    }
    .panel summary::before {
      content: '▸ ';
      font-size: 10px;
      margin-right: 2px;
    }
    .panel[open] summary::before {
      content: '▾ ';
    }
    .panel-body {
      padding: 0 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .defaults-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    .defaults-label {
      flex: 1 1 auto;
      min-width: 0;
    }
    .defaults-row input[type='number'] {
      width: 70px;
      font: inherit;
      padding: 3px 5px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .defaults-unit {
      font-size: 11px;
      opacity: 0.6;
      min-width: 30px;
    }
    .opacity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    .opacity-label {
      flex: 1 1 auto;
      min-width: 0;
    }
    .opacity-row input[type='range'] {
      width: 100px;
      flex-shrink: 0;
    }
    .opacity-val {
      font-size: 11px;
      opacity: 0.7;
      min-width: 32px;
      text-align: right;
    }
    .hint-sub {
      font-size: 11px;
      opacity: 0.7;
      margin: 0 0 4px;
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
    .weather-live-state {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
    }
    .weather-match-ok {
      color: #4ade80;
      font-weight: 600;
    }
    .weather-match-miss {
      color: #fbbf24;
      font-weight: 600;
    }
    .hint-details {
      margin-top: 4px;
    }
    .hint-details summary {
      font-size: 11px;
      opacity: 0.7;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .hint-details summary::before {
      content: '▸ ';
    }
    .hint-details[open] summary::before {
      content: '▾ ';
    }
    .hint-details summary::-webkit-details-marker {
      display: none;
    }
    .hint-states {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 6px 0;
    }
    .hint-states code {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.08);
      font-family: monospace;
    }
    .hint-states .hint-sub {
      width: 100%;
      margin: 4px 0 0;
    }
    /* Speed curve section */
    .speed-curve-details {
      margin-top: 8px;
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      padding-top: 8px;
    }
    .speed-curve-details summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .speed-curve-details summary::before { content: '▸ '; }
    .speed-curve-details[open] summary::before { content: '▾ '; }
    .speed-curve-details summary::-webkit-details-marker { display: none; }
    .speed-curve-body {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 6px 0;
    }
    .speed-curve-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      align-items: center;
      font-size: 12px;
    }
    .speed-curve-label {
      white-space: nowrap;
    }
    .speed-curve-row input {
      font: inherit;
      padding: 3px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .speed-curve-preview {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(255,255,255,0.06);
    }
    /* Color picker rows */
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .color-effective {
      font-size: 11px;
      opacity: 0.65;
    }
    .color-picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      font-size: 12px;
    }
    .color-picker-label {
      min-width: 64px;
    }
    .color-picker-value {
      font-size: 11px;
      opacity: 0.65;
    }
    /* Panel generic */
    .panel {
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .panel > summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 8px 12px;
    }
    .panel > summary::before { content: '▸ '; }
    .panel[open] > summary::before { content: '▾ '; }
    .panel > summary::-webkit-details-marker { display: none; }
    .panel-body {
      padding: 0 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    /* Visibility panel */
    .visibility-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      cursor: pointer;
    }
    .visibility-label {
      min-width: 80px;
    }
    .visibility-val {
      font-size: 11px;
      opacity: 0.65;
    }
    /* Eye toggle on canvas handles */
    .eye-toggle {
      position: absolute;
      top: -8px;
      right: -8px;
      background: rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      width: 16px;
      height: 16px;
      font-size: 9px;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      padding: 0;
      line-height: 1;
    }
    .handle:hover .eye-toggle,
    .handle.selected .eye-toggle {
      display: flex;
    }
    .handle-hidden .handle-dot {
      opacity: 0.3;
      border: 2px dashed rgba(255,255,255,0.5);
      background: transparent !important;
    }
    button.small {
      font-size: 10px;
      padding: 2px 6px;
    }
    /* Hit-area line behind connector segment — wide transparent stroke for easier clicking */
    .connectors .segment-hit {
      stroke: transparent;
      stroke-width: 20;
      vector-effect: non-scaling-stroke;
      pointer-events: visibleStroke;
      cursor: crosshair;
      fill: none;
    }
    /* Flows list panel */
    .flows-list-panel {
      margin-top: 8px;
    }
    .flows-list-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .flow-list-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 6px;
      border-radius: 6px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 0.15s;
      background: rgba(255,255,255,0.04);
    }
    .flow-list-row:hover {
      background: rgba(255,255,255,0.1);
    }
    .flow-list-row.selected {
      background: rgba(var(--rgb-primary-color, 3,169,244), 0.18);
      border-color: var(--primary-color, #03a9f4);
    }
    .flow-list-row.flow-hidden {
      opacity: 0.5;
    }
    .flow-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .flow-list-label {
      font-weight: 600;
      font-size: 12px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .flow-list-sub {
      font-size: 10px;
      opacity: 0.6;
      white-space: nowrap;
    }
    .flow-list-style {
      font-size: 10px;
      opacity: 0.55;
      background: rgba(255,255,255,0.08);
      border-radius: 3px;
      padding: 1px 4px;
      white-space: nowrap;
    }
    .flow-eye {
      position: static;
      width: 20px;
      height: 20px;
      font-size: 11px;
      flex-shrink: 0;
      background: rgba(0,0,0,0.3);
      display: flex;
    }
    /* Animation section */
    .anim-details {
      margin-top: 8px;
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      padding-top: 8px;
    }
    .anim-details summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .anim-details summary::before { content: '▸ '; }
    .anim-details[open] summary::before { content: '▾ '; }
    .anim-details summary::-webkit-details-marker { display: none; }
    .anim-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 6px 0;
    }
    .anim-body label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .anim-body select,
    .anim-body input[type='number'] {
      font: inherit;
      padding: 3px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .anim-toggle {
      flex-direction: row !important;
      align-items: center;
      gap: 8px !important;
    }
    .anim-preview-wrap {
      border-radius: 6px;
      overflow: hidden;
      background: rgba(0,0,0,0.4);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .anim-preview {
      display: block;
      width: 100%;
      height: 40px;
    }
    .anim-global-panel {
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .custom-svg-preview {
      display: block;
      margin-top: 4px;
      border-radius: 4px;
      background: rgba(0,0,0,0.4);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .waypoint-section {
      border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
      border-radius: 6px;
      padding: 10px;
      margin-top: 4px;
      margin-bottom: 4px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .waypoint-section-header {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.7;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .waypoint-count {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-radius: 10px;
      padding: 0 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .waypoint-empty {
      font-size: 11px;
      opacity: 0.6;
      font-style: italic;
    }
    .waypoint-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .waypoint-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .waypoint-index {
      font-size: 10px;
      opacity: 0.5;
      min-width: 20px;
    }
    .waypoint-coord {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11px;
      flex: 1;
    }
    .waypoint-coord input[type="number"] {
      width: 52px;
      padding: 2px 4px;
      font-size: 11px;
    }
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--error-color, #f44);
      font-size: 14px;
      padding: 0 4px;
      line-height: 1;
      opacity: 0.7;
    }
    .icon-btn:hover { opacity: 1; }
    .full-width { width: 100%; }
    .gradient-section {
      border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
      border-radius: 6px;
      padding: 10px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .gradient-section-header {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.7;
      margin-bottom: 2px;
    }
    .gradient-preview-bar {
      height: 20px;
      border-radius: 4px;
      margin: 6px 0 2px;
    }
    .gradient-preview-labels {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      opacity: 0.7;
      margin-bottom: 6px;
    }
    .gradient-row {
      display: flex;
      gap: 8px;
    }
    .gradient-row label {
      flex: 1;
      min-width: 0;
    }
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-row input[type="color"] {
      width: 40px;
      height: 28px;
      padding: 2px;
      cursor: pointer;
    }
  `;
}
