import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type {
  FlowmeConfig,
  HomeAssistant,
  NodeConfig,
} from './types.js';
import { FlowmeConfigError, validateConfig } from './validate-config.js';
import { createRenderer } from './animation/renderer-factory.js';
import { SvgRenderer } from './animation/svg-renderer.js';
import type { FlowRenderer } from './animation/types.js';
import { getProfile } from './flow-profiles/index.js';
import { parseAspectRatio, parseSensorValue, scaleSensorValue } from './utils.js';
import { renderOverlayHost } from './overlays/render.js';
import './overlays/custom-overlay.js';
import { dlog } from './debug-log.js';

/** Logged once at load so users can confirm the right version is loaded. */
const CARD_VERSION = '1.0.4';
const DEFAULT_TRANSITION_MS = 2000;

// eslint-disable-next-line no-console
console.info(
  `%c flowme %c v${CARD_VERSION} `,
  'color: white; background: #4ADE80; font-weight: 700;',
  'color: #4ADE80; background: #111; font-weight: 700;',
);

/** Fixed list the user explicitly requested in the debug spec. Logged on
 *  every hass update regardless of whether these entities are wired into
 *  the card — so we can rule out entity naming mismatches immediately. */
const DEBUG_WATCH_ENTITIES = [
  'sensor.sirbu_dumitra_pv_string_1_power',
  'sensor.sirbu_dumitra_pv_string_2_power',
  'sensor.sirbu_dumitra_grid_power',
  'sensor.sirbu_dumitra_battery_power',
  'sensor.sirbu_dumitra_load_power',
] as const;

@customElement('flowme-card')
export class FlowmeCard extends LitElement {
  private _hass?: HomeAssistant;

  @property({ attribute: false })
  get hass(): HomeAssistant | undefined {
    return this._hass;
  }
  set hass(value: HomeAssistant | undefined) {
    const prev = this._hass;
    this._hass = value;
    if (value) {
      const watched: Record<string, string | undefined> = {};
      for (const id of DEBUG_WATCH_ENTITIES) {
        watched[id] = value.states[id]?.state;
      }
      const flowEntities: Record<string, string | undefined> = {};
      for (const flow of this.config?.flows ?? []) {
        flowEntities[flow.entity] = value.states[flow.entity]?.state;
      }
      dlog('hass setter called. hardcoded watch:', watched, '| flow-entity values:', flowEntities);
    } else {
      dlog('hass setter called with undefined');
    }
    this.requestUpdate('hass', prev);
  }

  @state() private config?: FlowmeConfig;
  @state() private errorMessage?: string;

  private renderer: FlowRenderer | null = null;
  private readonly rendererMount: Ref<HTMLDivElement> = createRef();
  private rendererReadyFor?: FlowmeConfig;

  /**
   * Two stacked background layers for weather-aware crossfades. `activeLayer`
   * is the one currently fully opaque; swaps happen on the inactive one so
   * the visible image is never torn.
   */
  @state() private bgLayerA = '';
  @state() private bgLayerB = '';
  @state() private activeLayer: 'A' | 'B' = 'A';
  private transitionTimer: number | null = null;
  private preloadCache = new Map<string, HTMLImageElement>();
  private lastAppliedBgUrl = '';
  /**
   * Interval that forces a LitElement re-render every 10 s when the card
   * contains camera overlays. The overlay renderer uses a bucketed
   * cache-bust token to fetch fresh snapshots, but it can only advance
   * the token when the card actually re-renders.
   */
  private cameraRefreshTimer: number | null = null;
  /**
   * Set of `${flowId}:${entityId}` we've already warned about missing data for.
   * Keeps console noise under control when a sensor is permanently stale.
   */
  private warnedMissing = new Set<string>();

  setConfig(raw: unknown): void {
    dlog('setConfig called:', JSON.parse(JSON.stringify(raw ?? null)));
    try {
      const config = validateConfig(raw);
      dlog('setConfig validated → flows=', config.flows.length, 'nodes=', config.nodes.length, 'overlays=', config.overlays?.length ?? 0);
      this.config = config;
      this.errorMessage = undefined;
      if (this.rendererReadyFor && this.rendererReadyFor !== config) {
        this.teardownRenderer();
      }
      // seed both layers with the default image on first load — no crossfade
      const initial = config.background.default;
      this.bgLayerA = initial;
      this.bgLayerB = '';
      this.activeLayer = 'A';
      this.lastAppliedBgUrl = initial;
    } catch (err) {
      const message = err instanceof FlowmeConfigError ? err.message : String(err);
      this.config = undefined;
      this.errorMessage = message;
      this.teardownRenderer();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    dlog('connectedCallback — shadowRoot present?', !!this.shadowRoot, 'config present?', !!this.config, 'hass present?', !!this._hass);
  }

  override firstUpdated(): void {
    dlog('firstUpdated — shadowRoot children count=', this.shadowRoot?.children.length ?? 0);
    dlog('firstUpdated — SVG element found?', !!this.shadowRoot?.querySelector('svg'));

    window.setTimeout(() => {
      const sr = this.shadowRoot;
      const anim = sr?.querySelector('animateMotion');
      dlog('t+2000ms — animateMotion element:', anim ? anim.outerHTML : '(none found)');
      dlog('t+2000ms — animateMotion.dur=', anim?.getAttribute('dur') ?? '(no dur)');
      const allAnims = sr?.querySelectorAll('animateMotion');
      dlog('t+2000ms — total animateMotion elements=', allAnims?.length ?? 0);
      // Verify the <mpath href="#..."> references resolve to actual paths
      // in the same shadow root. Chrome historically had bugs with
      // cross-scope fragment refs inside SMIL.
      allAnims?.forEach((a, i) => {
        const mpath = a.querySelector('mpath');
        const href = mpath?.getAttribute('href') ?? mpath?.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
        const resolved = href && sr ? sr.querySelector(href) : null;
        dlog(`t+2000ms — animateMotion[${i}] mpath href=${href} resolved=${!!resolved}`);
      });
    }, 2000);

    window.setTimeout(() => {
      const html = this.shadowRoot?.innerHTML ?? '';
      dlog('t+3000ms — shadow DOM HTML (first 2000 chars):\n' + html.slice(0, 2000));
    }, 3000);
  }

  override disconnectedCallback(): void {
    this.teardownRenderer();
    if (this.transitionTimer !== null) {
      window.clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
    if (this.cameraRefreshTimer !== null) {
      window.clearInterval(this.cameraRefreshTimer);
      this.cameraRefreshTimer = null;
    }
    super.disconnectedCallback();
  }

  private syncCameraTimer(): void {
    const hasCameras = !!this.config?.overlays?.some((o) => o.type === 'camera');
    if (hasCameras && this.cameraRefreshTimer === null) {
      this.cameraRefreshTimer = window.setInterval(() => this.requestUpdate(), 10_000);
    } else if (!hasCameras && this.cameraRefreshTimer !== null) {
      window.clearInterval(this.cameraRefreshTimer);
      this.cameraRefreshTimer = null;
    }
  }

  override willUpdate(changed: PropertyValues): void {
    if (!this.config) return;
    const mount = this.rendererMount.value;

    if (mount && this.rendererReadyFor !== this.config) {
      this.teardownRenderer();
      this.renderer = createRenderer();
      this.rendererReadyFor = this.config;
      const activeConfig = this.config;
      void this.renderer.init(mount, activeConfig).catch((err) => {
        console.warn(
          '[flowme] renderer init failed — falling back to SVG renderer',
          err,
        );
        this.teardownRenderer();
        this.renderer = new SvgRenderer();
        this.rendererReadyFor = activeConfig;
        void this.renderer.init(mount, activeConfig).catch((err2) => {
          console.error('[flowme] SVG renderer init also failed', err2);
        });
      });
    }

    if (changed.has('hass') && this.renderer && this.hass) {
      dlog('willUpdate hass-changed → pushing values for', this.config.flows.length, 'flow(s) to renderer', this.renderer.constructor.name);
      for (const flow of this.config.flows) {
        const state = this.hass.states[flow.entity];
        const rawParsed = parseSensorValue(state?.state);
        const profile = getProfile(flow.domain ?? this.config.domain);
        const sensorUnit = state?.attributes?.['unit_of_measurement'] as string | undefined;
        const scaled = scaleSensorValue(rawParsed, sensorUnit, profile.unit_scale);
        dlog(
          'updateFlow →', flow.id,
          'entity=', flow.entity,
          'raw=', state?.state,
          'parsed=', rawParsed,
          'sensorUnit=', sensorUnit ?? '(none)',
          'matchedUnit=', scaled.matchedUnit ?? '(none → passthrough)',
          'factor=', scaled.factor,
          'scaledToBase(' + profile.unit_label + ')=', scaled.value,
        );
        if (!state) {
          const key = `${flow.id}:${flow.entity}`;
          if (!this.warnedMissing.has(key)) {
            this.warnedMissing.add(key);
            console.warn(
              `[flowme] flow "${flow.id}" references entity "${flow.entity}" but it is not present in hass.states — check spelling / domain permissions`,
            );
          }
        } else if (state.state === 'unavailable' || state.state === 'unknown') {
          const key = `${flow.id}:${flow.entity}:unavailable`;
          if (!this.warnedMissing.has(key)) {
            this.warnedMissing.add(key);
            console.warn(
              `[flowme] flow "${flow.id}" entity "${flow.entity}" is currently ${state.state} — no flow will render until it reports a number`,
            );
          }
        }
        this.renderer.updateFlow(flow.id, scaled.value);
      }
    }

    if (changed.has('config') || changed.has('hass')) {
      this.syncWeatherBackground();
    }

    if (changed.has('config')) {
      this.syncCameraTimer();
    }
  }

  getCardSize(): number {
    // Legacy Masonry-view size, in "rows" where one row is ~50 px. A 16:10
    // aspect card at a typical 500 px width is ~312 px tall ≈ 6 rows.
    const aspect = parseAspectRatio(this.config?.aspect_ratio) ?? 16 / 10;
    return Math.max(3, Math.round(10 / aspect) + 1);
  }

  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions(): Record<string, number | string> {
    const aspect = parseAspectRatio(this.config?.aspect_ratio) ?? 16 / 10;
    return {
      grid_columns: 4,
      grid_rows: Math.max(2, Math.round(4 / aspect) + 1),
      grid_min_columns: 2,
      grid_min_rows: 2,
      grid_max_columns: 4,
    };
  }

  /** Alias kept for HA versions that look for `getGridOptions` instead. */
  getGridOptions(): Record<string, number | string> {
    return this.getLayoutOptions();
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('flowme-card-editor');
  }

  static getStubConfig(): FlowmeConfig {
    // Uses an empty background so the card renders immediately without the
    // user first needing to copy any image into /config/www/flowme/.
    // Waypoints are omitted — a straight line renders fine and the user can
    // click the flow to add bends. Replace `sensor.example_power` with a real
    // numeric entity to see particles animate.
    return {
      type: 'custom:flowme-card',
      domain: 'energy',
      background: {
        default: '',
      },
      nodes: [
        { id: 'source', position: { x: 20, y: 30 }, label: 'Source' },
        { id: 'sink', position: { x: 80, y: 70 }, label: 'Sink' },
      ],
      flows: [
        {
          id: 'example',
          from_node: 'source',
          to_node: 'sink',
          entity: 'sensor.example_power',
          waypoints: [],
        },
      ],
    };
  }

  override render(): TemplateResult {
    if (this.errorMessage) {
      return html`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    }
    const config = this.config;
    if (!config) {
      return html`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    }

    const aspect = parseAspectRatio(config.aspect_ratio) ?? 16 / 10;
    const paddingTop = `${(1 / aspect) * 100}%`;
    const transitionMs = config.background.transition_duration ?? DEFAULT_TRANSITION_MS;

    return html`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${paddingTop};`}
        >
          <div
            class=${`background ${this.activeLayer === 'A' ? 'visible' : ''}`}
            style=${this.buildLayerStyle(this.bgLayerA, transitionMs)}
          ></div>
          <div
            class=${`background ${this.activeLayer === 'B' ? 'visible' : ''}`}
            style=${this.buildLayerStyle(this.bgLayerB, transitionMs)}
          ></div>
          <div class="renderer-mount" ${ref(this.rendererMount)}></div>
          ${config.nodes.map((n) => this.renderNodeHandle(n))}
          ${(config.overlays ?? []).map((o) => {
            dlog('rendering overlay →', o.type, 'entity=', o.entity ?? '(none)', 'position=', o.position, 'size=', o.size);
            return renderOverlayHost(o, this.hass);
          })}
        </div>
      </ha-card>
    `;
  }

  private buildLayerStyle(url: string, transitionMs: number): string {
    const bg = url ? `background-image: url('${url}');` : '';
    return `${bg} transition-duration: ${transitionMs}ms;`;
  }

  private resolveTargetBackground(): string {
    const bg = this.config?.background;
    if (!bg) return '';
    if (bg.weather_entity && bg.weather_states && this.hass) {
      const weather = this.hass.states[bg.weather_entity];
      if (weather) {
        const match = bg.weather_states[weather.state];
        if (match) return match;
      }
    }
    return bg.default;
  }

  /**
   * Swap to the target weather background if it changed. Preloads the new
   * image first (so the crossfade doesn't fade in a blank layer), then
   * assigns the URL to whichever layer is currently invisible and flips
   * {@link activeLayer} to trigger the CSS opacity transition. After the
   * transition duration elapses the old layer is cleared so it's ready for
   * the next swap.
   */
  private syncWeatherBackground(): void {
    if (!this.config) return;
    const target = this.resolveTargetBackground();
    if (!target) return;
    if (target === this.lastAppliedBgUrl) return;

    const transitionMs =
      this.config.background.transition_duration ?? DEFAULT_TRANSITION_MS;
    void this.preload(target).then(() => {
      // config may have changed while preloading
      if (!this.config || this.resolveTargetBackground() !== target) return;

      if (this.transitionTimer !== null) {
        window.clearTimeout(this.transitionTimer);
      }

      const incoming: 'A' | 'B' = this.activeLayer === 'A' ? 'B' : 'A';
      if (incoming === 'A') this.bgLayerA = target;
      else this.bgLayerB = target;

      // force a frame so the inactive layer picks up the new image before we flip opacity
      requestAnimationFrame(() => {
        this.activeLayer = incoming;
        this.lastAppliedBgUrl = target;
        this.transitionTimer = window.setTimeout(() => {
          // clear the now-hidden layer so it can accept the next swap without flash
          if (this.activeLayer === 'A') this.bgLayerB = '';
          else this.bgLayerA = '';
          this.transitionTimer = null;
        }, transitionMs + 50);
      });
    });
  }

  private preload(url: string): Promise<void> {
    if (!url) return Promise.resolve();
    const cached = this.preloadCache.get(url);
    if (cached?.complete && cached.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        this.preloadCache.set(url, img);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = url;
      this.preloadCache.set(url, img);
    });
  }

  private renderNodeHandle(node: NodeConfig): TemplateResult {
    const state = this.hass && node.entity ? this.hass.states[node.entity] : undefined;
    const showValue = node.show_value !== false && !!state;
    const showLabel = node.show_label !== false && !!node.label;
    const profile = getProfile(this.config?.domain);
    const fill = node.color ?? this.nodeFlowColor(node.id) ?? profile.default_color_positive;
    const size = node.size ?? 12;
    // Value rendering: prefer the sensor's own `unit_of_measurement` attribute
    // over the profile's default unit_label, and only append a unit once. This
    // fixes the "1 W W" doubled-unit bug users were seeing when a sensor
    // reported "1 W" and the profile also appended " W".
    let valueText = '';
    if (state) {
      const rawNum = parseSensorValue(state.state);
      const sensorUnit = (state.attributes?.['unit_of_measurement'] as string | undefined) ?? '';
      if (sensorUnit) {
        // sensor knows its own unit — use it verbatim to avoid doubling
        valueText = `${this.formatSensorNumber(rawNum)} ${sensorUnit}`;
      } else {
        // no sensor unit → fall back to the profile's describe() (which
        // embeds the profile unit itself), without appending unit_label
        // again.
        valueText = profile.describe(rawNum);
      }
    }

    return html`
      <div
        class="node"
        data-node-id=${node.id}
        style=${`left: ${node.position.x}%; top: ${node.position.y}%;`}
      >
        <span
          class="node-dot"
          style=${`background: ${fill}; width: ${size}px; height: ${size}px;`}
        ></span>
        ${showLabel ? html`<span class="node-label">${node.label}</span>` : null}
        ${showValue ? html`<span class="node-value">${valueText}</span>` : null}
      </div>
    `;
  }

  /**
   * Walk the configured flows looking for one that either starts or ends at
   * the given node and has a `color_positive` set. That colour is used as the
   * node's fallback fill so the dashboard visually groups nodes with their
   * flow colour (solar nodes glow yellow, grid nodes blue, etc.) without the
   * user having to duplicate colours on every node.
   */
  private nodeFlowColor(nodeId: string): string | undefined {
    if (!this.config) return undefined;
    for (const flow of this.config.flows) {
      if (flow.from_node === nodeId || flow.to_node === nodeId) {
        if (flow.color_positive) return flow.color_positive;
      }
    }
    return undefined;
  }

  /**
   * Format a numeric sensor reading for node display. Mirrors the compact
   * thresholds the overlay renderer uses so values stay consistent across
   * the card.
   */
  private formatSensorNumber(n: number): string {
    if (!Number.isFinite(n)) return '—';
    const abs = Math.abs(n);
    if (abs >= 1000) return n.toFixed(0);
    if (abs >= 100) return n.toFixed(0);
    if (abs >= 10) return n.toFixed(1);
    return n.toFixed(2);
  }

  private teardownRenderer(): void {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
    this.rendererReadyFor = undefined;
  }

  static override styles = css`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
      position: relative;
    }
    .stage {
      position: relative;
      width: 100%;
      height: 0;
      overflow: hidden;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--ha-card-background, rgba(0, 0, 0, 0.04));
      opacity: 0;
      transition-property: opacity;
      transition-timing-function: ease-in-out;
    }
    .background.visible {
      opacity: 1;
    }
    .renderer-mount {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .node {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      color: var(--primary-text-color, #fff);
      font-size: 12px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      pointer-events: none;
    }
    .node-dot {
      display: inline-block;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.7);
    }
    .node-label {
      font-weight: 600;
      white-space: nowrap;
    }
    .node-value {
      opacity: 0.85;
      white-space: nowrap;
    }
    .overlay {
      position: absolute;
      transform: translate(-50%, -50%);
      min-width: 24px;
      min-height: 24px;
      border-radius: 8px;
      background: rgba(17, 17, 17, 0.55);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      color: #fff;
      padding: 6px 8px;
      font-size: 12px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      outline: none;
    }
    .overlay.interactive {
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease;
    }
    .overlay.interactive:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
    }
    .overlay.interactive:active {
      transform: translate(-50%, -50%) scale(0.97);
    }
    .overlay-body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: 2px;
      width: 100%;
      height: 100%;
      text-align: center;
    }
    .overlay-label {
      font-size: 10px;
      opacity: 0.75;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .overlay-value {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .value-unit {
      font-size: 10px;
      opacity: 0.75;
      margin-left: 3px;
      font-weight: 500;
    }
    .overlay-switch {
      /* 44 px is the iOS HIG / WCAG minimum touch target. Percentage
         sizes still scale the overlay visually, but we never let the
         actual clickable box shrink below 44×44. */
      min-width: 44px;
      min-height: 44px;
    }
    .switch-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      width: 100%;
      height: 100%;
    }
    .switch-body.is-on {
      box-shadow: inset 0 0 0 1px rgba(74, 222, 128, 0.6);
    }
    .switch-body.is-off {
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.5);
    }
    .switch-body .switch-track {
      width: 28px;
      height: 14px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      position: relative;
      margin: 2px auto;
      transition: background 150ms ease;
    }
    .switch-body.is-on .switch-track {
      background: var(--primary-color, #03a9f4);
    }
    .switch-body .switch-thumb {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      transition: transform 150ms ease;
    }
    .switch-body.is-on .switch-thumb {
      transform: translateX(14px);
    }
    .switch-state {
      font-size: 10px;
      opacity: 0.8;
    }
    .button-body {
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      font-weight: 600;
    }
    .camera-body {
      padding: 0;
      position: relative;
    }
    .camera-frame {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
      display: block;
    }
    .camera-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      color: rgba(255, 255, 255, 0.55);
    }
    .camera-icon {
      width: 40%;
      max-width: 48px;
      max-height: 48px;
      opacity: 0.9;
    }
    .overlay-camera {
      padding: 2px;
      background: rgba(8, 8, 8, 0.75);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    }
    .camera-label {
      position: absolute;
      bottom: 4px;
      left: 6px;
      right: 6px;
      font-size: 10px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .overlay-custom {
      padding: 0;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .error {
      padding: 16px;
      color: var(--error-color, #f44336);
    }
    .error pre {
      margin: 8px 0 0;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .placeholder {
      padding: 16px;
      opacity: 0.6;
    }
  `;
}

// Register the card in HA's custom card catalog so it appears in "Add card" UI.
interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview: boolean;
  documentationURL?: string;
}
const w = window as unknown as { customCards?: CustomCardEntry[] };
w.customCards = w.customCards ?? [];
w.customCards.push({
  type: 'flowme-card',
  name: 'flowme',
  description: 'Animated flow visualisation over a custom background image',
  preview: true,
  documentationURL: 'https://github.com/fxgamer-debug/flowme',
});

// Bootstrap the editor element by side-effect so getConfigElement() works.
import './flowme-card-editor.js';
