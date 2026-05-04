import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type {
  FlowConfig,
  FlowmeConfig,
  HassConnection,
  HomeAssistant,
  NodeConfig,
  OpacityConfig,
  OverlayConfig,
  VisibilityConfig,
} from './types.js';
import { FlowmeConfigError, validateConfig } from './validate-config.js';
import { createRenderer } from './animation/renderer-factory.js';
import { SvgRenderer } from './animation/svg-renderer.js';
import type { FlowRenderer } from './animation/types.js';
import { getProfile, NEUTRAL_NODE_COLOR, resolveFlowColor } from './flow-profiles/index.js';
import { interpolateGradientColor, parseAspectRatio, parseSensorValue, resolveNightBackground, scaleSensorValue } from './utils.js';
import { renderOverlayHost } from './overlays/render.js';
import type { FlowmeCustomOverlay } from './overlays/custom-overlay.js';
import './overlays/custom-overlay.js';
import { dlog, isDebugEnabled, setDebugEnabled } from './debug-log.js';
import { loadLanguage, t } from './i18n.js';
import { NodeEffectsLayerController, type NodeEffectsSyncHooks } from './node-effects-layer.js';

/** Logged once at load so users can confirm the right version is loaded. */
const CARD_VERSION = '1.23.14';
const DEFAULT_TRANSITION_MS = 5000;

// eslint-disable-next-line no-console
console.info(
  `%c flowme %c v${CARD_VERSION} `,
  'color: white; background: #4ADE80; font-weight: 700;',
  'color: #4ADE80; background: #111; font-weight: 700;',
);


/**
 * Build CSS custom-property inline-style string from the opacity config block.
 * Applies defaults (1 for all except darken which defaults to 0).
 */
function buildOpacityVars(opacity?: OpacityConfig): string {
  if (!opacity) return '';
  const pairs: string[] = [];
  const add = (key: keyof OpacityConfig, cssVar: string) => {
    const v = opacity[key];
    if (v !== undefined) pairs.push(`${cssVar}:${v};`);
  };
  add('background', '--flowme-opacity-bg');
  add('darken', '--flowme-opacity-darken');
  add('nodes', '--flowme-opacity-nodes');
  add('flows', '--flowme-opacity-flows');
  add('dots', '--flowme-opacity-dots');
  add('glow', '--flowme-opacity-glow');
  add('labels', '--flowme-opacity-labels');
  add('values', '--flowme-opacity-values');
  add('overlays', '--flowme-opacity-overlays');
  return pairs.join('');
}

/**
 * Build CSS custom-property inline-style string from the visibility config block.
 * A layer value of `false` maps to `display:none` via a CSS variable set to `none`.
 */
function buildVisibilityVars(visibility?: VisibilityConfig): string {
  if (!visibility) return '';
  const pairs: string[] = [];
  const add = (key: keyof VisibilityConfig, cssVar: string) => {
    const v = visibility[key];
    if (v === false) pairs.push(`${cssVar}:none;`);
  };
  add('nodes', '--flowme-vis-nodes');
  add('lines', '--flowme-vis-lines');
  add('dots', '--flowme-vis-dots');
  add('labels', '--flowme-vis-labels');
  add('values', '--flowme-vis-values');
  add('overlays', '--flowme-vis-overlays');
  return pairs.join('');
}

@customElement('flowme-card')
export class FlowmeCard extends LitElement {
  private _hass?: HomeAssistant;
  private _lastLanguage?: string;
  /** WebSocket disconnected since last successful `ready` — drives reconnect toast (ANIM-3). */
  private _connectionAwaitingReconnect = false;
  private _boundHaConnection: HassConnection | null = null;

  private readonly onHaConnectionReady = (): void => {
    this.onReconnect();
  };

  private readonly onHaConnectionDisconnected = (): void => {
    this._connectionAwaitingReconnect = true;
  };

  @property({ attribute: false })
  get hass(): HomeAssistant | undefined {
    return this._hass;
  }
  set hass(value: HomeAssistant | undefined) {
    const prev = this._hass;
    this._hass = value;
    if (value && value.language !== this._lastLanguage) {
      this._lastLanguage = value.language;
      loadLanguage(value.language);
    }
    if (value) {
      // Build the watch list dynamically from the current config so no
      // personal entity IDs are ever hardcoded in the bundle.
      const cfg = this.config;
      const watchIds = [
        ...(cfg?.flows.map((f) => f.entity) ?? []),
        ...(cfg?.flows.map((f) => f.value_gradient?.entity).filter(Boolean) ?? []),
        ...(cfg?.nodes.map((n) => n.entity).filter(Boolean) ?? []),
        cfg?.background.weather_entity,
        cfg?.background.sun_entity,
      ].filter((id): id is string => typeof id === 'string' && id.length > 0);

      const watchValues: Record<string, string | undefined> = {};
      for (const id of watchIds) {
        watchValues[id] = value.states[id]?.state;
      }
      dlog('hass setter called. config entity states:', watchValues);

      // BG-1 fix: HA sometimes passes the same object reference with mutated
      // state inside. Check the weather entity state explicitly so we never
      // miss a state change even when prev === value by reference.
      const weatherEntityId = cfg?.background.weather_entity;
      if (weatherEntityId) {
        const prevState = prev?.states[weatherEntityId]?.state;
        const nextState = value.states[weatherEntityId]?.state;
        dlog('[weather] state:', nextState, '(was:', prevState, ')');
        if (prevState !== nextState) {
          // State changed — sync background immediately without waiting for
          // the reactive update cycle (which may be skipped when prev === value).
          this.syncWeatherBackground();
        }
      }
      // SUN-1: watch sun entity state changes explicitly
      const sunEntityId = cfg?.background.sun_entity;
      if (sunEntityId) {
        const prevSun = prev?.states[sunEntityId]?.state;
        const nextSun = value.states[sunEntityId]?.state;
        if (prevSun !== nextSun) {
          dlog('[sun] state changed:', prevSun, '→', nextSun);
          this.syncWeatherBackground();
        }
      }
      const conn = value.connection as HassConnection | undefined;
      this.bindHaConnection(conn);
    } else {
      dlog('hass setter called with undefined');
      this.bindHaConnection(undefined);
      if (prev) {
        this.showToast(t('card.connectionLost'));
      }
    }
    this.requestUpdate('hass', prev);
  }

  /** ANIM-3: subscribe once per hass.connection instance */
  private bindHaConnection(conn: HassConnection | undefined): void {
    if (this._boundHaConnection === conn) return;
    if (this._boundHaConnection) {
      this._boundHaConnection.removeEventListener('ready', this.onHaConnectionReady);
      this._boundHaConnection.removeEventListener('disconnected', this.onHaConnectionDisconnected);
      this._boundHaConnection = null;
    }
    if (conn) {
      conn.addEventListener('ready', this.onHaConnectionReady);
      conn.addEventListener('disconnected', this.onHaConnectionDisconnected);
      this._boundHaConnection = conn;
    }
  }

  /**
   * ANIM-3: after websocket reconnect — refresh renderer values without tearing
   * down SVG/Houdini; optional brief toast.
   */
  private onReconnect(): void {
    if (this.hass && this.config && this.renderer) {
      this.pushAllValuesToRenderer();
    }
    if (this._connectionAwaitingReconnect) {
      this._connectionAwaitingReconnect = false;
      this.showToast(t('card.reconnected'), 1500);
    }
  }

  @state() private config?: FlowmeConfig;
  @state() private errorMessage?: string;
  @state() private toastVisible = false;
  @state() private toastMessage = '';
  private toastHideTimer: number | null = null;

  private renderer: FlowRenderer | null = null;
  private readonly rendererMount: Ref<HTMLDivElement> = createRef();
  private readonly nodeFxSvgRef: Ref<SVGSVGElement> = createRef();
  private readonly nodeFx = new NodeEffectsLayerController();
  /** Drives pulse/ripple/alert time-based visuals every frame (v1.23.2). */
  private _nodeFxRaf: number | null = null;
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
   * Set of `${flowId}:${entityId}` we've already warned about missing data for.
   * Keeps console noise under control when a sensor is permanently stale.
   */
  private warnedMissing = new Set<string>();

  /**
   * Full SVG/Houdini rebuild is only needed when the set of flow ids changes.
   * Other edits use {@link FlowRenderer.applyConfig} so the HA editor preview
   * stays responsive (otherwise every keystroke costs a full renderer init).
   */
  private needsRendererReinit(prev: FlowmeConfig, next: FlowmeConfig): boolean {
    const prevIds = new Set(prev.flows.map((f) => f.id));
    const nextIds = new Set(next.flows.map((f) => f.id));
    if (prevIds.size !== nextIds.size) return true;
    for (const id of prevIds) {
      if (!nextIds.has(id)) return true;
    }
    return false;
  }

  /** Avoid resetting background layers when `background.default` is unchanged (editor spam). */
  private updateBackgroundLayersAfterConfig(prev: FlowmeConfig | undefined, next: FlowmeConfig): void {
    const nextDefault = next.background?.default ?? '';
    if (!prev) {
      this.bgLayerA = nextDefault;
      this.bgLayerB = '';
      this.activeLayer = 'A';
      this.lastAppliedBgUrl = nextDefault;
      return;
    }
    if (prev.background?.default === next.background?.default) {
      return;
    }
    this.bgLayerA = nextDefault;
    this.bgLayerB = '';
    this.activeLayer = 'A';
    this.lastAppliedBgUrl = nextDefault;
  }

  private logFirstPaint(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isDebugEnabled()) {
          // eslint-disable-next-line no-console -- gated by config.debug
          console.log('[FlowMe] first paint:', performance.now());
        }
      });
    });
  }

  setConfig(raw: unknown): void {
    const t0 = performance.now();
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log('[FlowMe] setConfig start:', t0);
    }
    try {
      const newConfig = validateConfig(raw);
      // Gate all diagnostic logging behind the config flag. Call this
      // before any dlog() so even the "setConfig called" log is gated.
      setDebugEnabled(newConfig.debug ?? false);
      dlog('setConfig called:', JSON.parse(JSON.stringify(raw ?? null)));
      dlog(
        'setConfig validated → flows=',
        newConfig.flows.length,
        'nodes=',
        newConfig.nodes.length,
        'overlays=',
        newConfig.overlays?.length ?? 0,
      );

      const prev = this.config;
      const mustRebuildRenderer =
        !!prev && !!this.renderer && this.needsRendererReinit(prev, newConfig);
      const canPatchInPlace =
        !!this.renderer &&
        !!prev &&
        !mustRebuildRenderer &&
        typeof this.renderer.applyConfig === 'function';

      if (canPatchInPlace) {
        this.config = newConfig;
        this.errorMessage = undefined;
        this.updateBackgroundLayersAfterConfig(prev, newConfig);
        this.renderer!.applyConfig!(newConfig);
        this.rendererReadyFor = newConfig;
        if (this.hass) this.pushAllValuesToRenderer();
        else this.syncRendererAriaLabels();
        if (isDebugEnabled()) {
          const t1 = performance.now();
          // eslint-disable-next-line no-console -- gated by config.debug
          console.log('[FlowMe] teardown complete:', t1, '(skipped — applyConfig)');
          // eslint-disable-next-line no-console -- gated by config.debug
          console.log('[FlowMe] renderer init start:', t1, '(skipped — applyConfig)');
          // eslint-disable-next-line no-console -- gated by config.debug
          console.log('[FlowMe] renderer init complete:', t1, '(skipped — applyConfig)');
        }
        this.logFirstPaint();
        return;
      }

      if (this.renderer && mustRebuildRenderer) {
        this.teardownRenderer();
        if (isDebugEnabled()) {
          // eslint-disable-next-line no-console -- gated by config.debug
          console.log('[FlowMe] teardown complete:', performance.now());
        }
      } else if (isDebugEnabled()) {
        // eslint-disable-next-line no-console -- gated by config.debug
        console.log('[FlowMe] teardown complete:', performance.now(), '(skipped)');
      }

      this.config = newConfig;
      this.errorMessage = undefined;
      this.updateBackgroundLayersAfterConfig(prev, newConfig);
      this.logFirstPaint();
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
  }

  override disconnectedCallback(): void {
    if (this._nodeFxRaf !== null) {
      cancelAnimationFrame(this._nodeFxRaf);
      this._nodeFxRaf = null;
    }
    this.bindHaConnection(undefined);
    this.nodeFx.reset();
    this.teardownRenderer();
    if (this.transitionTimer !== null) {
      window.clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
    if (this.toastHideTimer !== null) {
      window.clearTimeout(this.toastHideTimer);
      this.toastHideTimer = null;
    }
    super.disconnectedCallback();
  }

  /**
   * Start (or restart) the flow renderer when `config` is set and the mount
   * node exists. Runs from {@link willUpdate} when the mount ref already
   * points at a live element from a prior render, and from {@link updated}
   * after the first paint so `ref()` is populated — avoiding a dependency on
   * the next `hass` update (HA preview can delay hass by several seconds).
   */
  private beginRendererInitIfNeeded(): void {
    if (!this.config) return;
    const mount = this.rendererMount.value;
    if (!mount || this.rendererReadyFor === this.config) return;

    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log('[FlowMe] renderer init start:', performance.now());
    }
    this.teardownRenderer();
    this.renderer = createRenderer();
    this.rendererReadyFor = this.config;
    const activeConfig = this.config;
    void this.renderer.init(mount, activeConfig)
      .then(() => {
        if (isDebugEnabled()) {
          // eslint-disable-next-line no-console -- gated by config.debug
          console.log('[FlowMe] renderer init complete:', performance.now());
        }
        // After init, push current hass values (including gradient colours)
        // so flows render immediately without waiting for the next hass change.
        if (this.hass) this.pushAllValuesToRenderer();
        else this.syncRendererAriaLabels();
      })
      .catch((err) => {
        dlog('renderer init failed — falling back to SVG renderer', err);
        this.teardownRenderer();
        this.renderer = new SvgRenderer();
        this.rendererReadyFor = activeConfig;
        void this.renderer.init(mount, activeConfig)
          .then(() => {
            if (isDebugEnabled()) {
              // eslint-disable-next-line no-console -- gated by config.debug
              console.log('[FlowMe] renderer init complete:', performance.now());
            }
            if (this.hass) this.pushAllValuesToRenderer();
            else this.syncRendererAriaLabels();
          })
          .catch((err2) => {
            console.error('[flowme] SVG renderer init also failed', err2);
          });
      });
  }

  override willUpdate(changed: PropertyValues): void {
    if (!this.config) return;
    this.beginRendererInitIfNeeded();

    if (changed.has('hass') && this.renderer) {
      if (this.hass) this.pushAllValuesToRenderer();
      else this.syncRendererAriaLabels();
    }

    if (changed.has('config') || changed.has('hass')) {
      this.syncWeatherBackground();
    }
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    // First paint: `ref(rendererMount)` is set only after commit — run init here
    // if `willUpdate` saw a null mount (no prior render).
    this.beginRendererInitIfNeeded();
    const svg = this.nodeFxSvgRef.value;
    if (svg && this.config) {
      this.nodeFx.sync(svg, this.config, this.hass, performance.now(), this.nodeEffectHooks());
    }
    this.ensureNodeEffectsRaf();
  }

  private queryNodeDot(nodeId: string): HTMLElement | null {
    const safe =
      typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(nodeId)
        : nodeId.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return this.shadowRoot?.querySelector(`[data-node-id="${safe}"] .node-dot`) ?? null;
  }

  private clearNodeEffectDomStyles(): void {
    this.shadowRoot?.querySelectorAll('.node-dot[data-flowme-fx]').forEach((raw) => {
      const el = raw as HTMLElement;
      const base = el.getAttribute('data-flowme-base-fill');
      if (base) el.style.background = base;
      el.style.filter = '';
      el.style.transition = '';
      el.removeAttribute('data-flowme-fx');
    });
  }

  private nodeEffectHooks(): NodeEffectsSyncHooks {
    return {
      resetDomEffects: () => this.clearNodeEffectDomStyles(),
      getLayoutMetrics: (svgEl) => {
        const r = svgEl.getBoundingClientRect();
        return { widthPx: Math.max(1, r.width), heightPx: Math.max(1, r.height) };
      },
      setNodeDotBackground: (nodeId, bg, opts) => {
        const dot = this.queryNodeDot(nodeId);
        if (!dot) return;
        dot.setAttribute('data-flowme-fx', '1');
        dot.style.transition = opts?.transitionMs ? `background-color ${opts.transitionMs}ms ease` : '';
        dot.style.background = bg;
      },
      setNodeDotFilter: (nodeId, filter) => {
        const dot = this.queryNodeDot(nodeId);
        if (!dot) return;
        dot.setAttribute('data-flowme-fx', '1');
        dot.style.filter = filter ?? '';
      },
    };
  }

  private ensureNodeEffectsRaf(): void {
    const need = !!this.config?.nodes.some((n) => n.node_effect && n.visible !== false);
    if (!need) {
      if (this._nodeFxRaf !== null) {
        cancelAnimationFrame(this._nodeFxRaf);
        this._nodeFxRaf = null;
      }
      return;
    }
    if (this._nodeFxRaf !== null) return;
    const tick = (): void => {
      this._nodeFxRaf = requestAnimationFrame(tick);
      const el = this.nodeFxSvgRef.value;
      if (el && this.config) {
        this.nodeFx.sync(el, this.config, this.hass, performance.now(), this.nodeEffectHooks());
      }
    };
    this._nodeFxRaf = requestAnimationFrame(tick);
  }

  /**
   * Push the current hass state values for every flow to the renderer,
   * including gradient colours. Called both on hass changes and after
   * a fresh renderer is initialised so colours never need a hass event
   * to become visible.
   */
  private pushAllValuesToRenderer(): void {
    if (!this.config || !this.renderer) return;
    if (!this.hass) {
      this.syncRendererAriaLabels();
      return;
    }
    dlog('pushAllValuesToRenderer → flows:', this.config.flows.length, 'renderer:', this.renderer.constructor.name);
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
          dlog(`flow "${flow.id}" references entity "${flow.entity}" but it is not present in hass.states — check spelling / domain permissions`);
        }
      } else if (state.state === 'unavailable' || state.state === 'unknown') {
        const key = `${flow.id}:${flow.entity}:unavailable`;
        if (!this.warnedMissing.has(key)) {
          this.warnedMissing.add(key);
          dlog(`flow "${flow.id}" entity "${flow.entity}" is currently ${state.state} — no flow will render until it reports a number`);
        }
      }
      this.renderer.updateFlow(flow.id, scaled.value);

      // GRADIENT-1: compute and push gradient colour when configured
      if (flow.value_gradient && this.renderer.setGradientColor) {
        const gradEntity = flow.value_gradient.entity;
        const gradState = this.hass.states[gradEntity];
        if (gradState && gradState.state !== 'unavailable' && gradState.state !== 'unknown') {
          const gradVal = parseFloat(gradState.state);
          if (Number.isFinite(gradVal)) {
            const vg = flow.value_gradient;
            const clamped = Math.max(vg.low_value, Math.min(vg.high_value, gradVal));
            const gradColor = interpolateGradientColor(gradVal, vg);
            dlog(
              '[gradient]', flow.id,
              'entity value:', gradVal,
              'clamped:', clamped,
              'range:', `${vg.low_value}–${vg.high_value}`,
              'colour:', gradColor,
            );
            this.renderer.setGradientColor(flow.id, gradColor);
          } else {
            dlog(`flow "${flow.id}" gradient entity "${gradEntity}" state "${gradState.state}" is not a number`);
            this.renderer.setGradientColor(flow.id, null);
          }
        } else {
          dlog(`flow "${flow.id}" gradient entity "${gradEntity}" unavailable/unknown — falling back to flow color`);
          this.renderer.setGradientColor(flow.id, null);
        }
      }
    }
    this.syncRendererAriaLabels();
  }

  /** Push screen-reader labels onto flow renderer groups (SVG or Houdini). */
  private syncRendererAriaLabels(): void {
    if (!this.config || !this.renderer?.setFlowAriaLabel) return;
    for (const flow of this.config.flows) {
      this.renderer.setFlowAriaLabel(flow.id, this.formatFlowAriaLabel(flow));
    }
  }

  private describeFlowReading(flow: FlowConfig): string {
    if (!this.hass || !this.config) return t('card.noConnection');
    const state = this.hass.states[flow.entity];
    const profile = getProfile(flow.domain ?? this.config.domain);
    if (!state) return t('card.entityNotFound');
    if (state.state === 'unavailable' || state.state === 'unknown') return state.state;
    const rawParsed = parseSensorValue(state.state);
    const sensorUnit = (state.attributes?.['unit_of_measurement'] as string | undefined) ?? '';
    const scaled = scaleSensorValue(rawParsed, sensorUnit, profile.unit_scale);
    if (sensorUnit) {
      return `${this.formatSensorNumber(scaled.value)} ${sensorUnit}`;
    }
    return profile.describe(scaled.value);
  }

  private formatFlowAriaLabel(flow: FlowConfig): string {
    return t('aria.flowGroup', flow.id, this.describeFlowReading(flow));
  }

  private formatNodeAriaLabel(node: NodeConfig): string {
    const title = node.label ?? node.id;
    if (!this.hass || !node.entity || !this.config) return title;
    const state = this.hass.states[node.entity];
    const profile = getProfile(this.config.domain);
    if (!state) return t('aria.readingWithTitle', title, t('card.entityNotFound'));
    if (state.state === 'unavailable' || state.state === 'unknown') {
      return t('aria.readingWithTitle', title, state.state);
    }
    const rawNum = parseSensorValue(state.state);
    const sensorUnit = (state.attributes?.['unit_of_measurement'] as string | undefined) ?? '';
    if (sensorUnit) {
      return t('aria.readingWithTitle', title, `${this.formatSensorNumber(rawNum)} ${sensorUnit}`);
    }
    return t('aria.readingWithTitle', title, profile.describe(rawNum));
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
      overlays: [
        {
          id: 'example_overlay',
          type: 'custom',
          position: { x: 5, y: 5 },
          size: { width: 20, height: 15 },
          card: { type: 'entity', entity: 'sensor.example_sensor' },
        },
      ],
    };
  }

  override render(): TemplateResult {
    if (this.errorMessage) {
      return html`
        <ha-card role="region" aria-label=${t('aria.card')}>
          <div class="error">
            <strong>${t('card.invalidConfigurationTitle')}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    }
    const config = this.config;
    if (!config) {
      return html`<ha-card role="region" aria-label=${t('aria.card')}><div class="placeholder">${t('card.loading')}</div></ha-card>`;
    }

    const aspect = parseAspectRatio(config.aspect_ratio) ?? 16 / 10;
    const paddingTop = `${(1 / aspect) * 100}%`;
    const transitionMs = config.background.transition_duration ?? DEFAULT_TRANSITION_MS;

    const opacityVars = buildOpacityVars(config.opacity);
    const visibilityVars = buildVisibilityVars(config.visibility);

    return html`
      <ha-card role="region" aria-label=${t('aria.card')}>
        <div
          class="stage"
          style=${`padding-top: ${paddingTop};${opacityVars}${visibilityVars}`}
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
          <svg
            class="node-effects-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            ${ref(this.nodeFxSvgRef)}
          ></svg>
          ${config.nodes.map((n) => this.renderNodeHandle(n))}
          ${(config.overlays ?? []).map((o) => {
            dlog('rendering overlay →', o.type, 'position=', o.position, 'size=', o.size);
            return renderOverlayHost(o, this.hass, {
              onOverlayKeydown: this.onOverlayKeydown,
            });
          })}
        </div>
        <div
          class=${`fm-toast ${this.toastVisible ? 'fm-toast--visible' : ''}`}
        >
          ${this.toastMessage}
        </div>
      </ha-card>
    `;
  }

  private showToast(message: string, durationMs = 3000): void {
    if (this.toastHideTimer !== null) {
      window.clearTimeout(this.toastHideTimer);
      this.toastHideTimer = null;
    }
    this.toastMessage = message;
    this.toastVisible = true;
    this.toastHideTimer = window.setTimeout(() => {
      this.toastVisible = false;
      this.toastHideTimer = null;
    }, durationMs);
  }

  private onOverlayKeydown = (e: KeyboardEvent, overlay: OverlayConfig): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleOverlayTap(overlay);
    }
  };

  /** Activate the embedded HA card (same intent as a tap). Best-effort error toast. */
  private handleOverlayTap(overlay: OverlayConfig): void {
    try {
      const wraps = this.shadowRoot?.querySelectorAll('.overlay-custom') ?? [];
      let custom: FlowmeCustomOverlay | undefined;
      for (const el of wraps) {
        if (el.getAttribute('data-overlay-id') === overlay.id) {
          custom = el.querySelector('flowme-custom-overlay') as FlowmeCustomOverlay | undefined;
          break;
        }
      }
      custom?.activatePrimaryAction();
    } catch {
      this.showToast(t('card.actionFailed'));
    }
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
        const weatherState = weather.state;
        const sunState = bg.sun_entity ? this.hass.states[bg.sun_entity]?.state : undefined;
        const resolved = resolveNightBackground(weatherState, sunState, bg.weather_states, bg.default);

        // Compute lookup key for debug logging only
        let lookupKey = weatherState;
        if (sunState === 'below_horizon' && !weatherState.endsWith('-night')) {
          lookupKey = `${weatherState}-night`;
        }
        dlog('[FlowMe] sun:', sunState, 'weather:', weatherState, '→ lookup key:', lookupKey, '→ image:', resolved !== bg.default ? resolved : 'default');

        return resolved;
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
    const size = node.size ?? this.config?.defaults?.node_radius ?? 12;
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

    const nodeHidden = node.visible === false;
    return html`
      <div
        class="node"
        data-node-id=${node.id}
        role="img"
        aria-label=${this.formatNodeAriaLabel(node)}
        style=${`left: ${node.position.x}%; top: ${node.position.y}%; --flowme-dot-size: ${size}px;${node.opacity !== undefined ? ` opacity: ${node.opacity};` : ''}${nodeHidden ? ' display: none;' : ''}`}
      >
        <span class="node-dot-wrap">
          <span
            class="node-dot node-circle"
            data-flowme-base-fill=${fill}
            style=${`background: ${fill}; width: ${size}px; height: ${size}px;`}
          ></span>
        </span>
        ${showLabel ? html`<span class="node-label">${node.label}</span>` : null}
        ${showValue ? html`<span class="node-value">${valueText}</span>` : null}
      </div>
    `;
  }

  /**
   * Resolve a node's fill colour from its connected flows so the
   * dashboard visually groups nodes with their flow colour without the
   * user having to duplicate colours on every node.
   *
   * Each connected flow is resolved through the same `resolveFlowColor`
   * helper the renderer uses (explicit override → `flow.color`
   * shortcut → built-in domain default like solar/grid/battery/load →
   * profile fallback), always evaluated in the positive direction. If
   * every connecting flow resolves to the same colour the node adopts
   * it; if multiple distinct colours connect (the inverter case) the
   * node renders in `NEUTRAL_NODE_COLOR` (#CCCCCC) so it stops claiming
   * any single flow's hue. Returns `undefined` only when no flow
   * touches the node, letting the caller fall through to the profile
   * default. v1.0.7+.
   */
  private nodeFlowColor(nodeId: string): string | undefined {
    if (!this.config) return undefined;
    const cardDomain = this.config.domain;
    const domainColors = this.config.domain_colors;
    let firstColor: string | undefined;
    const seenKeys = new Set<string>();
    for (let fi = 0; fi < this.config.flows.length; fi++) {
      const flow = this.config.flows[fi]!;
      if (flow.from_node !== nodeId && flow.to_node !== nodeId) continue;
      const profile = getProfile(flow.domain ?? cardDomain);
      const color = resolveFlowColor(flow, profile, flow.domain ?? cardDomain, 1, domainColors, fi);
      const key = color.toLowerCase();
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        if (!firstColor) firstColor = color;
      }
    }
    if (seenKeys.size === 0) return undefined;
    if (seenKeys.size === 1) return firstColor;
    return NEUTRAL_NODE_COLOR;
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
      opacity: var(--flowme-opacity-bg, 1);
    }
    .stage::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, var(--flowme-opacity-darken, 0));
      pointer-events: none;
      z-index: 1;
    }
    .renderer-mount {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: var(--flowme-opacity-flows, 1);
    }
    .node-effects-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      overflow: visible;
    }
    .node {
      position: absolute;
      /* The configured (x%, y%) is the dot's CENTRE, not the wrapper's
       * centre. Pull the wrapper horizontally by -50% (column centred
       * on the point) and vertically by -dot_size/2 (so the dot, which
       * is the wrapper's first flex child sitting at y=0, has its own
       * centre on the point). Label / value flow downward in the flex
       * column without ever pushing the dot off-anchor — fixes the
       * v1.0.x bug where toggling show_value drifted the dot upward.
       * v1.0.7+. */
      transform: translate(-50%, calc(var(--flowme-dot-size, 12px) / -2));
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      color: var(--primary-text-color, #fff);
      font-size: 12px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      pointer-events: none;
      opacity: var(--flowme-opacity-nodes, 1);
      display: var(--flowme-vis-nodes, flex);
    }
    .node-dot-wrap {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
    }
    .node-dot {
      display: inline-block;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.7);
      flex-shrink: 0;
    }
    .node-label {
      font-weight: 600;
      white-space: nowrap;
      opacity: var(--flowme-opacity-labels, 1);
      display: var(--flowme-vis-labels, block);
    }
    .node-value {
      opacity: calc(0.85 * var(--flowme-opacity-values, 1));
      white-space: nowrap;
      display: var(--flowme-vis-values, block);
    }
    .overlay {
      position: absolute;
      min-width: 24px;
      min-height: 24px;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;
      pointer-events: all;
      z-index: 10;
    }
    .overlay-migration-warning {
      background: rgba(200, 40, 40, 0.85);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 80, 80, 0.7);
      padding: 4px 8px;
    }
    .migration-warning-inner {
      color: #fff;
      font-size: 11px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      line-height: 1.4;
      overflow-wrap: break-word;
    }
    .overlay {
      display: var(--flowme-vis-overlays, block);
    }
    .overlay-custom {
      padding: 0;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      opacity: var(--flowme-opacity-overlays, 1);
    }
    /* Material-style tap ripple on interactive overlay wrappers + embedded card host. */
    .overlay.overlay-interactive {
      position: relative;
      overflow: hidden;
    }
    .overlay.overlay-interactive::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.4) 0%,
        transparent 70%
      );
      transform: scale(0);
      opacity: 0;
      transition: none;
      pointer-events: none;
      z-index: 11;
    }
    .overlay.overlay-interactive:active::after {
      transform: scale(2.5);
      opacity: 1;
      transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
    }
    .overlay-wrapper:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .fm-toast {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      opacity: 0;
      transition:
        opacity 0.2s,
        transform 0.2s;
      pointer-events: none;
      z-index: 1000;
      white-space: nowrap;
    }
    .fm-toast--visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
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

    ha-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (prefers-contrast: more) {
      .renderer-mount svg use.flow-line {
        stroke-width: 3px !important;
      }
      .renderer-mount svg g[data-flow-id] * {
        filter: none !important;
      }
      .overlay.overlay-wrapper {
        outline: 2px solid var(--primary-text-color);
        outline-offset: 1px;
      }
      .node-label,
      .node-value {
        text-shadow: none;
        color: var(--primary-text-color);
      }
      .node-dot.node-circle {
        box-shadow: none;
        outline: 2px solid var(--primary-text-color);
        outline-offset: 1px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .renderer-mount svg animateMotion,
      .renderer-mount svg animate {
        animation-play-state: paused !important;
      }
      .flow-houdini {
        animation: none !important;
      }
      .background {
        transition: none !important;
      }
      .overlay.overlay-interactive::after {
        display: none !important;
      }
      .fm-toast {
        transition: none !important;
      }
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
  description: t('card.hacsDescription'),
  preview: true,
  documentationURL: 'https://github.com/fxgamer-debug/flowme',
});

// Bootstrap the editor element by side-effect so getConfigElement() works.
import './flowme-card-editor.js';
