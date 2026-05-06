import { LitElement, html, svg, css, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type {
  AnimationConfig,
  DomainColors,
  FlowDomain,
  FlowmeConfig,
  FlowmeDefaults,
  FlowAnimationConfig,
  FlowConfig,
  HomeAssistant,
  NodeConfig,
  NodeEffectConfig,
  NodeEffectType,
  NodePosition,
  OpacityConfig,
  OverlayConfig,
  ValueGradientConfig,
  VisibilityConfig,
} from './types.js';
import {
  FLOW_DOMAINS,
  LINE_STYLES,
  ANIMATION_STYLES,
  PARTICLE_SHAPES,
  PARTICLE_SPACINGS,
  FLOW_DIRECTIONS,
  normalizeFlowDomain,
} from './types.js';
import { validateConfig } from './validate-config.js';
import {
  calcAnimDuration,
  DEFAULT_ZERO_THRESHOLD,
  flowDisplayName,
  interpolateGradientColor,
  polylineToSvgPathStyled,
  resolveAnimTiming,
} from './utils.js';
import { getProfile, resolveFlowColor } from './flow-profiles/index.js';
import { UndoStack } from './editor/undo-stack.js';
import {
  addFlow,
  addNode,
  addOverlay,
  addWeatherStatePlaceholder,
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
  renameFlowId,
  renameOverlayId,
  renameWeatherState,
  setBackgroundDefault,
  setDefault,
  setDomainColor,
  setFlowColor,
  setFlowLineStyle,
  setFlowOpacity,
  setFlowPeakValue,
  setFlowLabel,
  setFlowVisible,
  setNodeLabel,
  setNodeOpacity,
  setNodeVisible,
  setOpacity,
  setOverlayCardConfig,
  setOverlayOpacity,
  setOverlaySize,
  setOverlayVisible,
  setTransitionDuration,
  setAnimationConfig,
  setPauseWhenHidden,
  setFlowAnimation,
  clearFlowAnimation,
  setVisibility,
  setWeatherEntity,
  setSunEntity,
  setWeatherEffects,
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
import { loadDownscaledRgbaForPathfinding, suggestPath } from './pathfinding/index.js';
import { DEFAULT_CELL_SIZE } from './pathfinding/grid-builder.js';
import type { Point } from './pathfinding/types.js';
import { DOMAIN_COLOUR_PROFILES } from './flow-profiles/domain-colour-profiles.js';
import { dlog, isDebugEnabled, peekDebugFromRaw, setDebugEnabled } from './debug-log.js';
import { flowmeBrowseMediaContentId, resolveMediaBrowseItemUrl } from './media-browser.js';
import { loadLanguage, t } from './i18n.js';
import { NodeEffectsLayerController, type NodeEffectsSyncHooks } from './node-effects-layer.js';

import PathfindingWorker from './pathfinding/pathfinding.worker.ts?worker&inline';

const IMAGE_BROWSER_NOT_CONFIGURED = 'not_configured';

const IMAGE_BROWSER_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

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

function parseAspectRatioDimensions(value: string | undefined): { w: number; h: number } {
  const v = value ?? '16:10';
  const m = /^(\d+):(\d+)$/.exec(v);
  if (!m) return { w: 16, h: 10 };
  const w = Number.parseInt(m[1] as string, 10);
  const h = Number.parseInt(m[2] as string, 10);
  if (!w || !h) return { w: 16, h: 10 };
  return { w, h };
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
  private _lastLanguage?: string;

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
  /** Inline rename on canvas (node label / overlay chip). */
  @state() private inlineRename: { kind: 'node' | 'overlay'; id: string; draft: string } | null = null;
  @state() private canUndo = false;

  private readonly nodeLabelInputRef = createRef<HTMLInputElement>();
  private readonly flowIdInputRef = createRef<HTMLInputElement>();
  private readonly overlayIdInputRef = createRef<HTMLInputElement>();
  private _pendingInspectorLabelFocus = false;
  @state() private canRedo = false;
  @state() private undoLabel = '';
  @state() private redoLabel = '';
  @state() private suggestPreview: SuggestPreview | null = null;
  @state() private suggestBusy = false;
  /** Flow id while inspector endpoint auto-route runs (shows same busy UX as Suggest Path). */
  @state() private flowEndpointPathfindingFlowId: string | null = null;
  @state() private flowEndpointError: string | null = null;
  /** Live zero-threshold % text while editing (per flow id) — drives reactive cutoff hint. */
  @state() private flowZeroThresholdDraft: Record<string, string> = {};
  /** Advanced-options `<details>` open state per flow (undefined = derive from `zero_threshold` in config). */
  @state() private flowInspectorAdvancedOpen: Record<string, boolean> = {};
  @state() private imageBrowserOpen = false;
  @state() private imageBrowserLoading = false;
  @state() private imageBrowserError = '';
  @state() private imageBrowserField: 'default' | 'weather' = 'default';
  @state() private imageBrowserWeatherState?: string;
  @state() private imageBrowserFiles: { name: string; url: string; thumbnail: string }[] = [];
  private _pathWorker?: Worker;
  private _pathWorkerPending = false;
  private _pathPendingSelection: { fromId: string; toId: string } | null = null;
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
  /** Natural pixel dimensions of the loaded background image (0 until decode). */
  private imageNaturalW = 0;
  private imageNaturalH = 0;
  /** True only after a successful recalcFit applied scale/pan (avoids first paint at scale=1). */
  @state() private imageLayoutReady = false;
  /** URL for which naturalW/H have been loaded (avoids redundant loads). */
  private _loadedImageUrl = '';
  /** True while spacebar is held (enables drag-to-pan). */
  private spaceHeld = false;
  /** Pointer id captured for middle-mouse or space+drag pan. */
  private panPointerId: number | null = null;
  private _canvasResizeObserver?: ResizeObserver;

  private readonly stageRef: Ref<HTMLDivElement> = createRef();
  private readonly canvasRef: Ref<HTMLDivElement> = createRef();
  /** Node effects overlay (same viewBox as connectors). */
  private readonly editorFxSvgRef: Ref<SVGSVGElement> = createRef();
  private readonly editorNodeFx = new NodeEffectsLayerController();
  private _editorFxRaf: number | null = null;
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
    this._pathWorker?.terminate();
    this._pathWorker = undefined;
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
    if (this._editorFxRaf !== null) {
      cancelAnimationFrame(this._editorFxRaf);
      this._editorFxRaf = null;
    }
    this.editorNodeFx.reset();
    this.imageLayoutReady = false;
  }

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (changed.has('hass')) {
      const lang = this.hass?.language;
      if (lang !== this._lastLanguage) {
        this._lastLanguage = lang;
        loadLanguage(lang);
      }
    }
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('selectedFlowId')) {
      this.flowEndpointError = null;
    }
    const pendingInspectorFocus = this._pendingInspectorLabelFocus;
    if (pendingInspectorFocus) this._pendingInspectorLabelFocus = false;

    if (changed.has('inlineRename') && this.inlineRename) {
      void this.updateComplete.then(() => {
        const el = this.shadowRoot?.querySelector<HTMLInputElement>('.inline-rename');
        el?.focus();
        el?.select();
      });
    }
    if (pendingInspectorFocus) {
      void this.updateComplete.then(() => {
        const el =
          this.nodeLabelInputRef.value ?? this.flowIdInputRef.value ?? this.overlayIdInputRef.value;
        el?.focus();
        el?.select();
      });
    }

    void this.updateComplete.then(() => {
      const fxSvg = this.editorFxSvgRef.value;
      if (fxSvg && this.config && this.hass) {
        this.editorNodeFx.sync(fxSvg, this.config, this.hass, performance.now(), this.editorNodeFxHooks());
      }
      this.ensureEditorNodeFxRaf();
    });
  }

  private ensureEditorNodeFxRaf(): void {
    const need = !!this.config?.nodes.some((n) => n.node_effect && n.visible !== false);
    if (!need) {
      if (this._editorFxRaf !== null) {
        cancelAnimationFrame(this._editorFxRaf);
        this._editorFxRaf = null;
      }
      return;
    }
    if (this._editorFxRaf !== null) return;
    const tick = (): void => {
      this._editorFxRaf = requestAnimationFrame(tick);
      const svg = this.editorFxSvgRef.value;
      if (svg && this.config && this.hass) {
        this.editorNodeFx.sync(svg, this.config, this.hass, performance.now(), this.editorNodeFxHooks());
      }
    };
    this._editorFxRaf = requestAnimationFrame(tick);
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
    if (!url) {
      const dims = parseAspectRatioDimensions(this.config?.aspect_ratio ?? '16:10');
      this.imageNaturalW = dims.w * 120;
      this.imageNaturalH = dims.h * 120;
      this._loadedImageUrl = '';
      this.recalcFit();
      return;
    }
    if (url === this._loadedImageUrl) return;
    this._loadedImageUrl = url;
    this.imageNaturalW = 0;
    this.imageNaturalH = 0;
    this.imageLayoutReady = false;
    const img = new Image();
    img.onload = () => {
      this.imageNaturalW = img.naturalWidth || 1600;
      this.imageNaturalH = img.naturalHeight || 1000;
      this.recalcFit();
    };
    img.onerror = () => {
      this.imageNaturalW = 0;
      this.imageNaturalH = 0;
      this.imageLayoutReady = false;
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
    if (this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return;
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
    // First layout after image/stage are valid: always snap to fit so handles use correct scale/pan.
    if (!this.imageLayoutReady) {
      this.scale = newFitScale;
      this.panX = newFitPanX;
      this.panY = newFitPanY;
      this.imageLayoutReady = true;
    } else if (this.scale === 1 || this.scale === prevScale) {
      this.scale = newFitScale;
      this.panX = newFitPanX;
      this.panY = newFitPanY;
    }
  }

  /**
   * Percent (0–100) → pixel offsets in the canvas-content scene (the box sized
   * imageNaturalW × imageNaturalH). Parent `.canvas-content` applies pan/scale;
   * do not multiply scale here.
   */
  private pct2px(pct: Pick<NodePosition, 'x' | 'y'>): { x: number; y: number } {
    return {
      x: (pct.x / 100) * this.imageNaturalW,
      y: (pct.y / 100) * this.imageNaturalH,
    };
  }

  private editorNodeFxHooks(): NodeEffectsSyncHooks {
    return {
      getLayoutMetrics: (svg) => {
        const r = svg.getBoundingClientRect();
        return {
          widthPx: Math.max(1, r.width),
          heightPx: Math.max(1, r.height),
          viewBoxUserWidth: this.imageNaturalW,
          viewBoxUserHeight: this.imageNaturalH,
        };
      },
    };
  }

  setConfig(config: unknown): void {
    try {
      setDebugEnabled(peekDebugFromRaw(config));
      this.config = validateConfig(config);
      setDebugEnabled(this.config.debug ?? false);
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
      // can use the correct aspect ratio (empty URL → virtual canvas from aspect_ratio).
      const bgUrl = this.config?.background?.default ?? '';
      this.loadBackgroundImage(bgUrl);
      // After paint, re-run fit so the first frame after open uses a laid-out stage
      // (recalcFit can no-op if image or stage is not ready yet). When loadBackgroundImage
      // returns early for the same URL, this is the main path that corrects scale/pan.
      void this.updateComplete.then(() => this.recalcFit());
    } catch (err) {
      setDebugEnabled(false);
      this.errorMessage = err instanceof Error ? err.message : String(err);
    }
  }

  override render(): TemplateResult {
    if (!this.config) {
      return html`
        <div class="wrap">
          <p class="hint">${t('editor.hintNoConfig')}</p>
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

    const imageReady =
      this.imageLayoutReady && this.imageNaturalW > 0 && this.imageNaturalH > 0;

    return html`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class="z-canvas"
          role="application"
          aria-label=${t('editor.canvas.ariaLabel')}
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
              class=${`canvas-content${imageReady ? '' : ' canvas-content--pending'}`}
              style=${imageReady
                ? `width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;`
                : 'left:0;top:0;width:100%;height:100%;'}
            >
              ${bgUrl
                ? html`<div
                    class=${`background${imageReady ? '' : ' background--pending'}`}
                    style="background-image: url('${bgUrl}');"
                  ></div>`
                : nothing}
              ${imageReady
                ? html`
                    <svg
                      class="connectors"
                      viewBox=${`0 0 ${this.imageNaturalW} ${this.imageNaturalH}`}
                      preserveAspectRatio="none"
                    >
                      ${this.config.flows.map((f) => this.renderFlowConnector(f))}
                    </svg>
                    <svg
                      class="node-effects-editor"
                      viewBox=${`0 0 ${this.imageNaturalW} ${this.imageNaturalH}`}
                      preserveAspectRatio="none"
                      ${ref(this.editorFxSvgRef)}
                    ></svg>
                    ${this.config.flows
                      .filter((f) => f.id === this.selectedFlowId)
                      .map((f) => this.renderWaypointHandles(f))}
                    ${(this.config.overlays ?? []).map((o) => this.renderOverlayHandle(o))}
                    ${this.config.nodes.map((n) => this.renderHandle(n))}
                    ${this.renderSuggestPreview()}
                  `
                : nothing}
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
                type="button"
                class="tb-icon-btn"
                aria-label=${t('editor.toolbar.undo')}
                ?disabled=${!this.canUndo}
                title=${this.undoLabel ? t('editor.canvas.undoTitleWithDesc', this.undoLabel) : t('editor.canvas.undoTitlePlain')}
                @click=${() => this.undoStack.undo()}
              >↩</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${t('editor.toolbar.redo')}
                ?disabled=${!this.canRedo}
                title=${this.redoLabel ? t('editor.canvas.redoTitleWithDesc', this.redoLabel) : t('editor.canvas.redoTitlePlain')}
                @click=${() => this.undoStack.redo()}
              >↪</button>
            </div>
            <div class="tb-icon-row">
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${t('editor.toolbar.zoomOut')}
                ?disabled=${this.scale <= this.fitScale}
                title=${t('editor.toolbar.zoomOut')}
                @click=${() => this.adjustZoom(0.8)}
              >−</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${t('editor.toolbar.zoomIn')}
                ?disabled=${this.scale >= 5}
                title=${t('editor.toolbar.zoomIn')}
                @click=${() => this.adjustZoom(1.25)}
              >+</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${t('editor.toolbar.fitCanvas')}
                title=${t('editor.toolbar.fitCanvas')}
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
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${t('editor.canvas.addNodeAria')}
                    title=${t('editor.canvas.addNodeAria')}
                    @click=${() => {
                      this.pending = { kind: 'add-node' };
                    }}
                  >${t('editor.toolbar.addNode')}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${t('editor.canvas.addFlowAria')}
                    title=${t('editor.canvas.addFlowAria')}
                    @click=${() => {
                      this.pending = { kind: 'add-flow', step: 'pick-from' };
                    }}
                  >${t('editor.toolbar.addFlow')}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${t('editor.canvas.addOverlayAria')}
                    title=${t('editor.canvas.addOverlayAria')}
                    @click=${() => {
                      this.pending = { kind: 'add-overlay', overlayType: 'custom' };
                    }}
                  >${t('editor.toolbar.addOverlay')}</button>
                `}
            </div>
            <div class="tb-row tb-row-save">
              <button
                type="button"
                class="tb-btn tb-btn-save"
                aria-label=${t('editor.canvas.saveAria')}
                title=${t('editor.canvas.saveTitle')}
                @click=${() => {
                  if (this.config) this.commitToHa(this.config);
                }}
              >💾 ${t('editor.toolbar.save')}</button>
              <button
                type="button"
                class="tb-btn tb-btn-cancel"
                aria-label=${t('editor.canvas.cancelAria')}
                title=${t('editor.canvas.cancelTitle')}
                ?disabled=${!this.savedConfig}
                @click=${() => {
                  if (!this.savedConfig || !this.config) return;
                  const prev = this.config;
                  this.pushPatch(prev, this.savedConfig, 'cancel all changes');
                }}
              >✕ ${t('editor.toolbar.cancel')}</button>
            </div>
          </div>

          <!-- Right (35%): Type + Element dropdowns stacked -->
          <div class="tb-col-selector">
            <select
              class="tb-select"
              aria-label=${t('editor.canvas.selectTypeAria')}
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
              <option value="">${t('editor.toolbar.selectType')}</option>
              <option value="nodes">${t('editor.toolbar.nodes')}</option>
              <option value="flows">${t('editor.toolbar.flows')}</option>
              <option value="overlays">${t('editor.toolbar.overlays')}</option>
            </select>
            <select
              class="tb-select"
              aria-label=${t('editor.canvas.selectElementAria')}
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
                this._pendingInspectorLabelFocus = true;
              }}
            >
              <option value="">${derivedType ? t('editor.toolbar.selectElement') : t('editor.toolbar.selectElementDash')}</option>
              ${derivedType === 'nodes' ? this.config.nodes.map((n) => html`
                <option value=${n.id}>${n.label ?? n.id}</option>
              `) : nothing}
              ${derivedType === 'flows' ? this.config.flows.map((f) => html`
                <option value=${f.id}>${flowDisplayName(f)}</option>
              `) : nothing}
              ${derivedType === 'overlays' ? (this.config.overlays ?? []).map((o, i) => html`
                <option value=${o.id ?? String(i)}>${t('editor.canvas.overlayOption', i, o.id ? t('editor.canvas.overlayOptionIdPart', o.id) : '')}</option>
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
    if (!this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return nothing;
    const nodes = new Map(this.config.nodes.map((n) => [n.id, n]));
    const from = nodes.get(flow.from_node);
    const to = nodes.get(flow.to_node);
    if (!from || !to) return nothing;
    const points: NodePosition[] = [from.position, ...flow.waypoints, to.position];
    const isSelected = flow.id === this.selectedFlowId;

    // Same path logic as the card renderer; map percentages into the connectors
    // SVG viewBox (0 … imageNaturalW × imageNaturalH) so lines align with handles.
    const CONNECTOR_SIZE = { width: this.imageNaturalW, height: this.imageNaturalH };
    const d = polylineToSvgPathStyled(points, CONNECTOR_SIZE, flow.line_style ?? 'corner');
    if (!d) return nothing;

    const flowColor = flow.color ?? 'rgba(255,255,255,0.8)';

    // Invisible wide hit-area segments (keep per-segment for shift-click waypoint insertion)
    const hitSegments = [] as TemplateResult[];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      const pa = this.pct2px(a);
      const pb = this.pct2px(b);
      hitSegments.push(svg`
        <line
          class="segment-hit"
          x1=${pa.x}
          y1=${pa.y}
          x2=${pb.x}
          y2=${pb.y}
          data-flow-id=${flow.id}
          data-segment-index=${i}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
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
          @dblclick=${this.onFlowPathDblClick}
        />
      </g>
    `;
  }

  private renderWaypointHandles(flow: FlowConfig): TemplateResult[] {
    return flow.waypoints.map(
      (wp, index) => {
        const p = this.pct2px(wp);
        return html`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${t('aria.waypointHandle', index, flowDisplayName(flow))}
          data-flow-id=${flow.id}
          data-waypoint-index=${index}
          style=${`left: ${p.x}px; top: ${p.y}px;`}
          @pointerdown=${this.onHandlePointerDown}
          @pointermove=${this.onHandlePointerMove}
          @pointerup=${this.onHandlePointerUp}
          @pointercancel=${this.onHandlePointerUp}
          @contextmenu=${this.onWaypointContextMenu}
          @click=${this.stopClick}
        ></div>
      `;
      },
    );
  }

  private renderOverlayHandle(overlay: OverlayConfig): TemplateResult {
    const selected = overlay.id === this.selectedOverlayId;
    const w = overlay.size?.width ?? 14;
    const h = overlay.size?.height ?? 8;
    const posPx = this.pct2px(overlay.position);
    const wpx = (w / 100) * this.imageNaturalW;
    const hpx = (h / 100) * this.imageNaturalH;
    const editing = this.inlineRename?.kind === 'overlay' && this.inlineRename.id === overlay.id;
    return html`
      <div
        class=${`overlay-handle overlay-wrapper ${selected ? 'selected' : ''} overlay-${overlay.type}`}
        role="button"
        tabindex="0"
        aria-label=${t('aria.overlayHandle', overlay.id)}
        aria-selected=${selected ? 'true' : 'false'}
        data-overlay-id=${overlay.id}
        style=${`left: ${posPx.x}px; top: ${posPx.y}px; width: ${wpx}px; height: ${hpx}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip" @dblclick=${(e: MouseEvent) => this.onOverlayChipDblClick(e, overlay)}>
          ${editing
            ? html`<input
                class="inline-rename overlay-inline-rename"
                type="text"
                spellcheck="false"
                .value=${this.inlineRename!.draft}
                @input=${(e: Event) => {
                  const ir = this.inlineRename;
                  if (!ir || ir.kind !== 'overlay' || ir.id !== overlay.id) return;
                  this.inlineRename = { ...ir, draft: (e.target as HTMLInputElement).value };
                }}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    this.inlineRename = null;
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.commitOverlayInlineRename(true);
                  }
                }}
                @blur=${() => {
                  if (this.inlineRename?.kind === 'overlay' && this.inlineRename.id === overlay.id) {
                    this.commitOverlayInlineRename(true);
                  }
                }}
              />`
            : html`<span>${overlay.id}<span class="overlay-type-badge">${overlay.type}</span></span>`}
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
    const editing = this.inlineRename?.kind === 'node' && this.inlineRename.id === node.id;
    const posPx = this.pct2px(node.position);
    return html`
      <div
        class=${`handle ${isSingleSelected ? 'selected' : ''} ${isMultiSelected ? 'multi-selected' : ''} ${isInSelection ? 'in-selection' : ''} ${isHidden ? 'handle-hidden' : ''}`}
        role="button"
        tabindex="0"
        aria-label=${t('aria.nodeHandle', node.label ?? node.id, node.position.x, node.position.y)}
        aria-selected=${isInSelection ? 'true' : 'false'}
        data-node-id=${node.id}
        style=${`left: ${posPx.x}px; top: ${posPx.y}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span
          class="handle-dot"
          @dblclick=${(e: MouseEvent) => this.onNodeDotDblClick(e, node)}
        ></span>
        ${editing
          ? html`<input
              class="inline-rename"
              type="text"
              spellcheck="false"
              .value=${this.inlineRename!.draft}
              @input=${(e: Event) => {
                const ir = this.inlineRename;
                if (!ir || ir.kind !== 'node' || ir.id !== node.id) return;
                this.inlineRename = { ...ir, draft: (e.target as HTMLInputElement).value };
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  this.inlineRename = null;
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  this.commitNodeInlineRename(true);
                }
              }}
              @blur=${() => {
                if (this.inlineRename?.kind === 'node' && this.inlineRename.id === node.id) {
                  this.commitNodeInlineRename(true);
                }
              }}
            />`
          : node.label
            ? html`<span class="handle-label" @dblclick=${(e: MouseEvent) => this.onNodeLabelTextDblClick(e, node)}
                >${node.label}</span
              >`
            : html`<span class="handle-id" @dblclick=${(e: MouseEvent) => this.onNodeLabelTextDblClick(e, node)}
                >${node.id}</span
              >`}
        ${isInSelection && this.selectedNodeIds.size >= 2
          ? html`<span class="suggest-badge">${selectionIndex + 1}</span>`
          : nothing}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${isHidden ? t('editor.inspector.showNode') : t('editor.inspector.hideNode')}
          title=${isHidden ? t('editor.inspector.showNode') : t('editor.inspector.hideNode')}
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
    const placeholder = opts?.placeholder ?? t('editor.inspector.entityPickerFallbackPlaceholder');

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
          <h3>${t('editor.inspector.nodeHeading', node.id)}</h3>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${t('editor.inspector.label')}</span>
              <input
                type="text"
                ${ref(this.nodeLabelInputRef)}
                .value=${node.label ?? ''}
                @change=${(e: Event) => this.onNodeLabelChange(node.id, e)}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${t('editor.inspector.entity')}</span>
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
              <span class="node-cell-label">${t('editor.inspector.colour')}</span>
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
              <span class="node-cell-label">${t('editor.inspector.visible')}</span>
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
              <span class="node-cell-label">${t('editor.inspector.showValue')}</span>
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
              <span class="node-cell-label">${t('editor.inspector.showLabel')}</span>
            </label>
          </div>

          <!-- Row 3: X% | Y% | Size | Opacity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${t('editor.inspector.positionX')}</span>
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
              <span class="node-cell-label">${t('editor.inspector.positionY')}</span>
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
              <span class="node-cell-label">${t('editor.inspector.sizePx')}</span>
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
              <span class="node-cell-label">${t('editor.inspector.opacity')}</span>
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

          ${this.renderNodeEffectInspector(node, patchNode)}

          <!-- Delete -->
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(node.id)}>${t('editor.inspector.deleteNode')}</button>
          </div>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const flow = this.config.flows.find((f) => f.id === this.selectedFlowId);
      if (!flow) return nothing;
      const flowIndex = this.config.flows.findIndex((f) => f.id === flow.id);
      const flowTitle = flowDisplayName(flow);
      return html`
        <div class="inspector">
          <label class="inspector-id-row">
            <span class="node-cell-label">${t('editor.inspector.flowIdField')}</span>
            <input
              type="text"
              spellcheck="false"
              ${ref(this.flowIdInputRef)}
              .value=${flow.id}
              @change=${(e: Event) => this.onInspectorFlowIdChange(flow.id, e)}
            />
          </label>
          <h3>${t('editor.inspector.flowHeading', flowDisplayName(flow))}</h3>
          <fieldset class="inspector-fieldset">
            <legend class="inspector-legend">${t('editor.inspector.routeAndSensor')}</legend>
            <div class="field-row">
              <label for="flow-label-${flow.id}">${t('editor.inspector.flowLabel')}</label>
              <input
                id="flow-label-${flow.id}"
                type="text"
                maxlength="64"
                placeholder=${flow.id}
                title=${t('editor.inspector.flowLabelPlaceholder')}
                .value=${flow.label ?? ''}
                @change=${(e: Event) => this.onFlowLabelChange(flow.id, (e.target as HTMLInputElement).value)}
              />
            </div>
            <div class="field-row flow-endpoint-row">
              <label for=${`flow-from-${flow.id}`}>${t('editor.inspector.fromNode')}</label>
              <select
                id=${`flow-from-${flow.id}`}
                class="flow-endpoint-select"
                ?disabled=${this.flowEndpointPathfindingFlowId === flow.id}
                .value=${flow.from_node}
                @change=${(e: Event) => {
                  const v = (e.target as HTMLSelectElement).value;
                  this.onFlowFromNodeChange(flow.id, v);
                }}
              >
                ${this.config.nodes.map(
                  (n) =>
                    html`<option value=${n.id} ?selected=${n.id === flow.from_node}>${n.label ?? n.id}</option>`,
                )}
              </select>
            </div>
            <div class="field-row flow-endpoint-row">
              <label for=${`flow-to-${flow.id}`}>${t('editor.inspector.toNode')}</label>
              <select
                id=${`flow-to-${flow.id}`}
                class="flow-endpoint-select"
                ?disabled=${this.flowEndpointPathfindingFlowId === flow.id}
                .value=${flow.to_node}
                @change=${(e: Event) => {
                  const v = (e.target as HTMLSelectElement).value;
                  this.onFlowToNodeChange(flow.id, v);
                }}
              >
                ${this.config.nodes.map(
                  (n) =>
                    html`<option value=${n.id} ?selected=${n.id === flow.to_node}>${n.label ?? n.id}</option>`,
                )}
              </select>
            </div>
            ${this.flowEndpointPathfindingFlowId === flow.id
              ? html`<p class="hint-sub flow-endpoint-busy">
                  ${t('editor.toolbar.suggestPathFinding')}
                  <span class="suggest-path-spinner" aria-hidden="true"></span>
                </p>`
              : nothing}
            ${this.flowEndpointError && this.selectedFlowId === flow.id
              ? html`<p class="flow-endpoint-error">${this.flowEndpointError}</p>`
              : nothing}
            <label>
              ${t('editor.inspector.entity')}
              ${this.renderEntityPicker(
                flow.entity,
                (value) => this.setFlowEntity(flow.id, value),
                { includeDomains: ['sensor', 'input_number', 'number'] },
              )}
            </label>
            ${(() => {
              const prof = getProfile(flow.domain ?? this.config.domain);
              const timing = resolveAnimTiming(flow, prof, this.config);
              const domPeak = prof.peak;
              const previewPts = [0, timing.peak * 0.5, timing.peak];
              const previewDurations = previewPts.map(
                (v) => `${(calcAnimDuration(v, timing) / 1000).toFixed(1)}s`,
              );
              const hasZt = flow.animation?.zero_threshold !== undefined;
              const advancedOpen =
                this.flowInspectorAdvancedOpen[flow.id] !== undefined
                  ? this.flowInspectorAdvancedOpen[flow.id]!
                  : hasZt;
              return html`
                <label>
                  ${t('editor.inspector.peakValue')}
                  <input
                    type="number"
                    step="any"
                    min="0"
                    placeholder="${domPeak}"
                    .value=${flow.peak_value !== undefined ? String(flow.peak_value) : ''}
                    @change=${(e: Event) => {
                      if (!this.config) return;
                      const raw = (e.target as HTMLInputElement).value.trim();
                      const prev = this.config;
                      if (raw === '') {
                        const next = setFlowPeakValue(prev, flow.id, undefined);
                        this.pushPatch(prev, next, `clear peak_value ${flowTitle}`);
                        return;
                      }
                      const v = parseFloat(raw);
                      if (!Number.isFinite(v) || v <= 0) return;
                      const next = setFlowPeakValue(prev, flow.id, v);
                      this.pushPatch(prev, next, `set peak_value ${flowTitle}`);
                    }}
                  />
                  <span class="hint-sub">${t('editor.inspector.peakValueHelper')}</span>
                </label>
                <label>
                  ${t('editor.inspector.minDuration')}
                  <input
                    type="number"
                    min="1"
                    max="60000"
                    step="100"
                    placeholder=${t('editor.inspector.animMinMsPlaceholder')}
                    .value=${flow.animation?.min_duration !== undefined ? String(flow.animation.min_duration) : ''}
                    @change=${(e: Event) => {
                      if (!this.config) return;
                      const raw = (e.target as HTMLInputElement).value.trim();
                      const prev = this.config;
                      if (raw === '') {
                        const next = setFlowAnimation(prev, flow.id, { min_duration: undefined });
                        this.pushPatch(prev, next, `clear flow min_duration ${flowTitle}`);
                        return;
                      }
                      const v = parseInt(raw, 10);
                      if (!Number.isFinite(v) || v <= 0) return;
                      const next = setFlowAnimation(prev, flow.id, { min_duration: v });
                      this.pushPatch(prev, next, `set flow min_duration ${flowTitle}`);
                    }}
                  />
                </label>
                <label>
                  ${t('editor.inspector.maxDuration')}
                  <input
                    type="number"
                    min="2"
                    max="60000"
                    step="500"
                    placeholder=${t('editor.inspector.animMaxMsPlaceholder')}
                    .value=${flow.animation?.max_duration !== undefined ? String(flow.animation.max_duration) : ''}
                    @change=${(e: Event) => {
                      if (!this.config) return;
                      const raw = (e.target as HTMLInputElement).value.trim();
                      const prev = this.config;
                      if (raw === '') {
                        const next = setFlowAnimation(prev, flow.id, { max_duration: undefined });
                        this.pushPatch(prev, next, `clear flow max_duration ${flowTitle}`);
                        return;
                      }
                      const v = parseInt(raw, 10);
                      if (!Number.isFinite(v) || v <= 0) return;
                      const next = setFlowAnimation(prev, flow.id, { max_duration: v });
                      this.pushPatch(prev, next, `set flow max_duration ${flowTitle}`);
                    }}
                  />
                </label>
                <div class="speed-curve-preview inspector-timing-preview">
                  <span>${t('editor.inspector.previewLinearSpeed')}</span>
                  <strong>${previewDurations[0]}</strong>
                  /
                  <strong>${previewDurations[1]}</strong>
                  /
                  <strong>${previewDurations[2]}</strong>
                </div>
                <details
                  class="advanced-options"
                  .open=${advancedOpen}
                  @toggle=${(e: Event) => {
                    const el = e.currentTarget as HTMLDetailsElement;
                    const open = el.open;
                    this.flowInspectorAdvancedOpen = { ...this.flowInspectorAdvancedOpen, [flow.id]: open };
                    if (!open) {
                      const { [flow.id]: _z, ...restDraft } = this.flowZeroThresholdDraft;
                      this.flowZeroThresholdDraft = restDraft;
                      if (this.config && flow.animation?.zero_threshold !== undefined) {
                        const prev = this.config;
                        const next = setFlowAnimation(prev, flow.id, { zero_threshold: undefined });
                        this.pushPatch(prev, next, `advanced closed: clear zero_threshold ${flowTitle}`);
                      }
                    }
                  }}
                >
                  <summary>${t('editor.inspector.advancedOptions')}</summary>
                  <div class="advanced-options-content">
                    ${(() => {
                      const draftPct = this.flowZeroThresholdDraft[flow.id];
                      let ztFracForHint: number;
                      if (draftPct !== undefined && draftPct.trim() !== '') {
                        const p = parseFloat(draftPct);
                        ztFracForHint =
                          Number.isFinite(p) && p > 0 && p <= 100
                            ? p / 100
                            : (flow.animation?.zero_threshold ?? DEFAULT_ZERO_THRESHOLD);
                      } else {
                        ztFracForHint = flow.animation?.zero_threshold ?? DEFAULT_ZERO_THRESHOLD;
                      }
                      const resolvedPeak = flow.peak_value ?? prof.peak;
                      const cutoffHint = `${t('editor.inspector.zeroThresholdCutoff')} ${(ztFracForHint * resolvedPeak).toFixed(1)}${prof.unit_label ? ` ${prof.unit_label}` : ''}`;
                      return html`
                        <div class="field-row advanced-zero-row">
                          <label>
                            ${t('editor.inspector.zeroThreshold')}
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              placeholder=${t('editor.inspector.zeroThresholdAuto')}
                              .value=${this.flowZeroThresholdDraft[flow.id] !== undefined
                                ? this.flowZeroThresholdDraft[flow.id]
                                : flow.animation?.zero_threshold !== undefined
                                  ? (flow.animation.zero_threshold * 100).toFixed(1)
                                  : ''}
                              @input=${(e: Event) => {
                                const v = (e.target as HTMLInputElement).value;
                                this.flowZeroThresholdDraft = { ...this.flowZeroThresholdDraft, [flow.id]: v };
                              }}
                              @change=${(e: Event) => {
                                if (!this.config) return;
                                const raw = (e.target as HTMLInputElement).value.trim();
                                const prev = this.config;
                                const clearDraft = (): void => {
                                  const { [flow.id]: _drop, ...restDraft } = this.flowZeroThresholdDraft;
                                  this.flowZeroThresholdDraft = restDraft;
                                };
                                if (raw === '') {
                                  clearDraft();
                                  const next = setFlowAnimation(prev, flow.id, { zero_threshold: undefined });
                                  this.pushPatch(prev, next, `clear flow zero_threshold ${flowTitle}`);
                                  return;
                                }
                                const v = parseFloat(raw);
                                if (!Number.isFinite(v) || v <= 0 || v > 100) return;
                                clearDraft();
                                const next = setFlowAnimation(prev, flow.id, { zero_threshold: v / 100 });
                                this.pushPatch(prev, next, `set flow zero_threshold ${flowTitle}`);
                              }}
                            />
                            <span class="field-hint hint-sub">${cutoffHint}</span>
                          </label>
                        </div>
                      `;
                    })()}
                  </div>
                </details>
              `;
            })()}
          </fieldset>
          ${this.renderWaypointList(flow)}
          <label>
            ${t('editor.inspector.lineStyle')}
            <select
              .value=${flow.line_style ?? 'corner'}
              @change=${(e: Event) => {
                if (!this.config) return;
                const val = (e.target as HTMLSelectElement).value;
                const prev = this.config;
                const next = setFlowLineStyle(prev, flow.id, val as typeof flow.line_style);
                this.pushPatch(prev, next, `set line style of ${flowTitle}`);
              }}
            >
              ${LINE_STYLES.map(
                (s) => html`<option value=${s} ?selected=${(flow.line_style ?? 'corner') === s}>${s}</option>`,
              )}
            </select>
          </label>
          <label>
            ${t('editor.inspector.colourOverride')}
            <div class="color-row">
              ${(() => {
                const profile = getProfile(flow.domain ?? this.config.domain);
                const effective = resolveFlowColor(
                  flow,
                  profile,
                  flow.domain ?? this.config.domain,
                  1,
                  this.config.domain_colors,
                  flowIndex >= 0 ? flowIndex : 0,
                );
                return html`
                  <input
                    type="color"
                    .value=${flow.color ?? effective}
                    @change=${(e: Event) => {
                      if (!this.config) return;
                      const val = (e.target as HTMLInputElement).value;
                      const prev = this.config;
                      const next = setFlowColor(prev, flow.id, val);
                      this.pushPatch(prev, next, `set colour of ${flowTitle}`);
                    }}
                  />
                  <span class="color-effective">${flow.color ? t('editor.inspector.colourOverrideActive') : t('editor.inspector.colourDomainDefault')}</span>
                  ${flow.color
                    ? html`<button class="ghost" @click=${() => {
                        if (!this.config) return;
                        const prev = this.config;
                        const next = setFlowColor(prev, flow.id, undefined);
                        this.pushPatch(prev, next, `clear colour of ${flowTitle}`);
                      }}>${t('editor.inspector.clearColour')}</button>`
                    : nothing}
                `;
              })()}
            </div>
          </label>
          <label>
            ${t('editor.inspector.flowOpacity')}
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
                  this.pushPatch(prev, next, `set opacity of ${flowTitle}`);
                }}
              />
              <span>${(flow.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            ${t('editor.inspector.flowVisible')}
            <div class="row">
              <input
                type="checkbox"
                .checked=${flow.visible !== false}
                @change=${(e: Event) => {
                  if (!this.config) return;
                  const checked = (e.target as HTMLInputElement).checked;
                  const prev = this.config;
                  const next = setFlowVisible(prev, flow.id, checked);
                  this.pushPatch(prev, next, `${checked ? 'show' : 'hide'} flow ${flowTitle}`);
                }}
              />
              <span>${flow.visible !== false ? t('editor.inspector.shown') : t('editor.inspector.hidden')}</span>
            </div>
          </label>
          ${this.renderAnimationSection(flow)}
          ${this.renderValueGradientSection(flow)}
          <button class="danger" @click=${() => this.removeFlow(flow.id)}>${t('editor.inspector.deleteFlow')}</button>
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

  private defaultNodeEffect(type: NodeEffectType): NodeEffectConfig {
    switch (type) {
      case 'glow':
        return {
          type: 'glow',
          glow_max_radius: 20,
          glow_min_intensity: 0.1,
          peak_value: 10000,
        };
      case 'badge':
        return { type: 'badge', badge_color_on: '#32DC50', badge_color_off: '#CC3333', threshold: null };
      case 'ripple':
        return { type: 'ripple', ripple_duration: 2000, ripple_threshold: 0 };
      case 'alert':
        return {
          type: 'alert',
          alert_threshold: 0,
          alert_condition: 'above',
          alert_color: '#FF0000',
          alert_frequency: 2,
          alert_hysteresis: 0.05,
        };
      default:
        return {
          type: 'glow',
          glow_max_radius: 20,
          glow_min_intensity: 0.1,
          peak_value: 10000,
        };
    }
  }

  /** Self-contained animated SVG (no hass) for the inspector preview box (v1.23.2). */
  private renderNodeEffectPreviewAnim(node: NodeConfig): TemplateResult {
    const accent = node.color ?? '#4ADE80';
    const fx = node.node_effect;
    if (!fx) {
      return html`
        <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        </svg>`;
    }
    const gc = fx.type === 'glow' ? (fx.glow_color || accent) : accent;
    const rc = fx.type === 'ripple' ? (fx.ripple_color || accent) : accent;
    const alertC = fx.type === 'alert' ? (fx.alert_color ?? '#FF0000') : '#FF0000';
    switch (fx.type) {
      case 'glow': {
        const fid = `fm-ed-glow-${node.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
        return html`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id=${fid} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="50" cy="50" r="14" fill="${gc}" filter=${`url(#${fid})`} opacity="0.95">
              <animate attributeName="opacity" values="0.55;1;0.55" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      }
      case 'badge':
        return html`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${accent}"/>
            <circle cx="62" cy="38" r="7" fill="${fx.badge_color_on ?? '#32DC50'}">
              <animate attributeName="fill" values="${fx.badge_color_on ?? '#32DC50'};${fx.badge_color_off ?? '#CC3333'};${fx.badge_color_on ?? '#32DC50'}" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      case 'ripple':
        return html`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${[0, 0.3, 0.6].map(
              (delay) => html`
                <circle cx="50" cy="50" r="14" fill="none" stroke="${rc}" stroke-width="2" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0" keyTimes="0;0.05;1" dur="${fx.ripple_duration ?? 2000}ms" begin="${delay}s" fill="freeze"/>
                  <animate attributeName="r" values="14;56" dur="${fx.ripple_duration ?? 2000}ms" begin="${delay}s" fill="freeze"/>
                </circle>`,
            )}
          </svg>`;
      case 'alert':
        return html`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${accent}">
              <animate attributeName="fill" values="${accent};${alertC};${accent}" dur="250ms" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      default:
        return html`<svg class="node-effect-preview" viewBox="0 0 100 100"></svg>`;
    }
  }

  private renderNodeEffectInspector(
    node: NodeConfig,
    patchNode: (patch: Partial<NodeConfig>, description: string) => void,
  ): TemplateResult {
    const fx = node.node_effect;
    const typeVal = fx?.type ?? '';

    return html`
      <details class="inspector-details node-effect-details">
        <summary>${t('editor.nodeEffect.section')}</summary>
        <div class="node-effect-body">
          ${!node.entity && fx
            ? html`<p class="hint-sub">${t('editor.nodeEffect.needsEntity')}</p>`
            : nothing}
          <div class="node-effect-type-row">
            ${this.renderNodeEffectPreviewAnim(node)}
            <label class="node-effect-type-label">
              ${t('editor.nodeEffect.type')}
              <select
                .value=${typeVal}
                @change=${(e: Event) => {
                  const v = (e.target as HTMLSelectElement).value;
                  if (!v) {
                    patchNode({ node_effect: undefined }, `clear node effect on ${node.id}`);
                    return;
                  }
                  patchNode(
                    { node_effect: this.defaultNodeEffect(v as NodeEffectType) },
                    `set node effect on ${node.id}`,
                  );
                }}
              >
                <option value="" ?selected=${!fx}>${t('editor.nodeEffect.none')}</option>
                <option value="glow" ?selected=${typeVal === 'glow'}>${t('editor.nodeEffect.glow')}</option>
                <option value="badge" ?selected=${typeVal === 'badge'}>${t('editor.nodeEffect.badge')}</option>
                <option value="ripple" ?selected=${typeVal === 'ripple'}>${t('editor.nodeEffect.ripple')}</option>
                <option value="alert" ?selected=${typeVal === 'alert'}>${t('editor.nodeEffect.alert')}</option>
              </select>
            </label>
          </div>

          ${fx?.type === 'glow'
            ? html`
                <label>${t('editor.nodeEffect.glowColor')}
                  <input type="text" placeholder=${t('editor.inspector.colourDomainDefault')}
                    .value=${fx.glow_color ?? ''}
                    @change=${(e: Event) => {
                      const v = (e.target as HTMLInputElement).value.trim();
                      patchNode(
                        { node_effect: { ...fx, glow_color: v || undefined } },
                        `glow color ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.glowMaxRadius')}
                  <input type="number" min="4" max="80" step="1"
                    .value=${String(fx.glow_max_radius ?? 20)}
                    @change=${(e: Event) => {
                      const n = parseFloat((e.target as HTMLInputElement).value);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, glow_max_radius: n } },
                        `glow radius ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.glowMinIntensity')}
                  <input type="range" min="0" max="1" step="0.05"
                    .value=${String(fx.glow_min_intensity ?? 0.1)}
                    @input=${(e: Event) => {
                      const n = parseFloat((e.target as HTMLInputElement).value);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, glow_min_intensity: Math.max(0, Math.min(1, n)) } },
                        `glow min intensity ${node.id}`,
                      );
                    }}
                  />
                  <span>${(fx.glow_min_intensity ?? 0.1).toFixed(2)}</span>
                </label>
                <label>${t('editor.nodeEffect.peakValue')}
                  <input type="number" min="0" step="any"
                    .value=${String(fx.peak_value ?? 10000)}
                    @change=${(e: Event) => {
                      const n = parseFloat((e.target as HTMLInputElement).value);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, peak_value: n } },
                        `glow peak ${node.id}`,
                      );
                    }}
                  />
                </label>
              `
            : nothing}
          ${fx?.type === 'badge'
            ? html`
                <label>${t('editor.nodeEffect.badgeColorOn')}
                  <input type="color"
                    .value=${fx.badge_color_on ?? '#32DC50'}
                    @change=${(e: Event) => {
                      const v = (e.target as HTMLInputElement).value;
                      patchNode(
                        { node_effect: { ...fx, badge_color_on: v } },
                        `badge on ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.badgeColorOff')}
                  <input type="color"
                    .value=${fx.badge_color_off ?? '#CC3333'}
                    @change=${(e: Event) => {
                      const v = (e.target as HTMLInputElement).value;
                      patchNode(
                        { node_effect: { ...fx, badge_color_off: v } },
                        `badge off ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.threshold')}
                  <input type="number" step="any" placeholder="binary"
                    .value=${fx.threshold === null || fx.threshold === undefined ? '' : String(fx.threshold)}
                    @change=${(e: Event) => {
                      const raw = (e.target as HTMLInputElement).value.trim();
                      const num = raw === '' ? null : parseFloat(raw);
                      patchNode(
                        {
                          node_effect: {
                            ...fx,
                            threshold:
                              num === null || Number.isNaN(num) ? null : num,
                          },
                        },
                        `badge threshold ${node.id}`,
                      );
                    }}
                  />
                </label>
              `
            : nothing}
          ${fx?.type === 'ripple'
            ? html`
                <label>${t('editor.nodeEffect.rippleColor')}
                  <input type="text" placeholder=${t('editor.inspector.colourDomainDefault')}
                    .value=${fx.ripple_color ?? ''}
                    @change=${(e: Event) => {
                      const v = (e.target as HTMLInputElement).value.trim();
                      patchNode(
                        { node_effect: { ...fx, ripple_color: v || undefined } },
                        `ripple color ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.rippleDuration')}
                  <input type="number" min="500" max="20000" step="100"
                    .value=${String(fx.ripple_duration ?? 2000)}
                    @change=${(e: Event) => {
                      const n = parseInt((e.target as HTMLInputElement).value, 10);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, ripple_duration: n } },
                        `ripple duration ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.rippleThreshold')}
                  <input type="number" step="any"
                    .value=${String(fx.ripple_threshold ?? 0)}
                    @change=${(e: Event) => {
                      const n = parseFloat((e.target as HTMLInputElement).value);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, ripple_threshold: n } },
                        `ripple threshold ${node.id}`,
                      );
                    }}
                  />
                </label>
              `
            : nothing}
          ${fx?.type === 'alert'
            ? html`
                <label>${t('editor.nodeEffect.alertThreshold')}
                  <input type="number" step="any"
                    .value=${String(fx.alert_threshold ?? 0)}
                    @change=${(e: Event) => {
                      const n = parseFloat((e.target as HTMLInputElement).value);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, alert_threshold: n } },
                        `alert threshold ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.alertCondition')}
                  <select
                    .value=${fx.alert_condition ?? 'above'}
                    @change=${(e: Event) => {
                      const v = (e.target as HTMLSelectElement).value as 'above' | 'below';
                      patchNode(
                        { node_effect: { ...fx, alert_condition: v } },
                        `alert condition ${node.id}`,
                      );
                    }}
                  >
                    <option value="above">${t('editor.nodeEffect.above')}</option>
                    <option value="below">${t('editor.nodeEffect.below')}</option>
                  </select>
                </label>
                <label>${t('editor.nodeEffect.alertColor')}
                  <input type="color"
                    .value=${fx.alert_color ?? '#FF0000'}
                    @change=${(e: Event) => {
                      const v = (e.target as HTMLInputElement).value;
                      patchNode(
                        { node_effect: { ...fx, alert_color: v } },
                        `alert color ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.alertFrequency')}
                  <input type="number" min="0.25" max="10" step="0.25"
                    .value=${String(fx.alert_frequency ?? 2)}
                    @change=${(e: Event) => {
                      const n = parseFloat((e.target as HTMLInputElement).value);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, alert_frequency: n } },
                        `alert frequency ${node.id}`,
                      );
                    }}
                  />
                </label>
                <label>${t('editor.nodeEffect.alertHysteresis')}
                  <input type="number" min="0" max="1" step="0.01"
                    .value=${String(fx.alert_hysteresis ?? 0.05)}
                    @change=${(e: Event) => {
                      const n = parseFloat((e.target as HTMLInputElement).value);
                      if (!Number.isFinite(n)) return;
                      patchNode(
                        { node_effect: { ...fx, alert_hysteresis: n } },
                        `alert hysteresis ${node.id}`,
                      );
                    }}
                  />
                </label>
              `
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
      this.pushPatch(prev, next, `update animation for ${flowDisplayName(flow)}`);
    };

    // Styles that don't use discrete particles (shape picker irrelevant)
    const noShapeStyles = new Set(['dash', 'fluid', 'none']);
    const showShape = !noShapeStyles.has(style);
    const showTrailLength = style === 'trail';
    const showDashGap = style === 'dash';

    // Live preview strip — a small SVG preview of the current animation style
    const previewColor = flow.color ?? '#4ADE80';

    return html`
      <details class="anim-details" open>
        <summary>${t('editor.inspector.animation')}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(style, anim, previewColor)}
            </svg>
          </div>

          <label>${t('editor.inspector.style')}
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

          ${style === 'fluid'
            ? html`<p class="hint-sub">${t('editor.inspector.fluidIgnoresParticleShape')}</p>`
            : nothing}

          ${showShape ? html`
            <label>${t('editor.inspector.particleShape')}
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
              <label>${t('editor.inspector.svgPathLabel')}
                <input type="text"
                  placeholder=${t('editor.inspector.svgPathPlaceholder')}
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

          <label>${t('editor.inspector.direction')}
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

          <label>${t('editor.inspector.particleSize')}
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

          <label>${t('editor.inspector.particleCount')}
            <input type="number" min="1" max="20" step="1"
              placeholder=${t('editor.inspector.profileDefaultPlaceholder')}
              .value=${anim.particle_count !== undefined ? String(anim.particle_count) : ''}
              @change=${(e: Event) => {
                const raw = (e.target as HTMLInputElement).value.trim();
                if (raw === '') { patch({ particle_count: undefined }); return; }
                const v = parseInt(raw, 10);
                if (Number.isFinite(v) && v >= 1) patch({ particle_count: v });
              }}
            />
          </label>

          <label>${t('editor.inspector.particleSpacing')}
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
            <label>${t('editor.inspector.clusterSize')}
              <input type="number" min="1" max="10" step="1"
                .value=${String(anim.cluster_size ?? 3)}
                @change=${(e: Event) => {
                  const v = parseInt((e.target as HTMLInputElement).value, 10);
                  if (Number.isFinite(v) && v >= 1) patch({ cluster_size: v });
                }}
              />
            </label>
            <label>${t('editor.inspector.clusterGap')}
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
            <label>${t('editor.inspector.pulseFrequencyHz')}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(anim.pulse_frequency ?? 1.0)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v) && v > 0) patch({ pulse_frequency: v });
                }}
              />
            </label>
            <label>${t('editor.inspector.pulseRatio')}
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
            <label>${t('editor.inspector.waveFrequency')}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(anim.wave_frequency ?? 1.0)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v) && v > 0) patch({ wave_frequency: v });
                }}
              />
            </label>
            <label>${anim.particle_spacing === 'wave_lateral' ? t('editor.inspector.waveAmplitudePx') : t('editor.inspector.waveAmplitude01')}
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

          <label>${t('editor.inspector.glowIntensity')}
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
            ${t('editor.inspector.shimmerThreshold')}
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${anim.flicker === true}
              @change=${(e: Event) => patch({ flicker: (e.target as HTMLInputElement).checked })}
            />
            ${t('editor.inspector.flicker')}
          </label>

          ${showTrailLength ? html`
            <label>${t('editor.inspector.trailLength')}
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
            <label>${t('editor.inspector.dashGapRatio')}
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
                this.pushPatch(prev, next, `reset animation for ${flowDisplayName(flow)}`);
              }}>${t('editor.inspector.resetToDefaults')}</button>`
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

    // dots / arrow / trail — show moving particles
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
      this.pushPatch(prev, next, `add waypoint to ${flowDisplayName(flow)}`);
    };

    return html`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${t('editor.inspector.waypoints')}
          <span class="waypoint-count">${flow.waypoints.length}</span>
        </h4>

        ${flow.waypoints.length === 0
          ? html`<div class="waypoint-empty">${t('editor.inspector.waypointEmpty')}</div>`
          : html`
            <ul class="waypoint-list">
              ${flow.waypoints.map((wp, index) => html`
                <li class="waypoint-row">
                  <span class="waypoint-index">${t('editor.inspector.waypointSectionHash')}${index + 1}</span>
                  <label class="waypoint-coord">
                    ${t('editor.inspector.waypointCoordX')}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${wp.x.toFixed(1)}
                      @change=${(e: Event) => {
                        if (!this.config) return;
                        const v = parseFloat((e.target as HTMLInputElement).value);
                        if (!Number.isFinite(v)) return;
                        const prev = this.config;
                        const next = moveWaypoint(prev, flow.id, index, { x: v, y: wp.y });
                        this.pushPatch(prev, next, `move waypoint ${index} of ${flowDisplayName(flow)}`);
                      }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    ${t('editor.inspector.waypointCoordY')}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${wp.y.toFixed(1)}
                      @change=${(e: Event) => {
                        if (!this.config) return;
                        const v = parseFloat((e.target as HTMLInputElement).value);
                        if (!Number.isFinite(v)) return;
                        const prev = this.config;
                        const next = moveWaypoint(prev, flow.id, index, { x: wp.x, y: v });
                        this.pushPatch(prev, next, `move waypoint ${index} of ${flowDisplayName(flow)}`);
                      }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${t('editor.inspector.deleteWaypointAria', index)} title=${t('editor.inspector.deleteWaypoint')}
                    @click=${() => {
                      if (!this.config) return;
                      const prev = this.config;
                      const next = deleteWaypoint(prev, flow.id, index);
                      this.pushPatch(prev, next, `delete waypoint ${index} of ${flowDisplayName(flow)}`);
                    }}
                  >×</button>
                </li>
              `)}
            </ul>
          `}

        <button type="button" class="ghost full-width" aria-label=${t('editor.inspector.addWaypointOnFlowAria')} @click=${addAtMidpoint}>
          ${t('editor.inspector.addWaypoint')}
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
      this.pushPatch(prev, next, `update gradient for ${flowDisplayName(flow)}`);
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
        <h4 class="gradient-section-header">${t('editor.inspector.valueGradient')}</h4>

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
              this.pushPatch(prev, next, `${checked ? 'enable' : 'disable'} gradient for ${flowDisplayName(flow)}`);
            }}
          />
          ${t('editor.inspector.enableGradient')}
        </label>

        ${vg ? html`
          <label>${t('editor.inspector.gradientEntity')}
            <input type="text" placeholder=${t('editor.inspector.gradientEntityPlaceholder')}
              .value=${vg.entity}
              @change=${(e: Event) => patch({ entity: (e.target as HTMLInputElement).value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>${t('editor.inspector.lowValue')}
              <input type="number" step="any"
                .value=${String(vg.low_value)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v)) patch({ low_value: v });
                }}
              />
            </label>
            <label>${t('editor.inspector.lowColour')}
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
            <label>${t('editor.inspector.highValue')}
              <input type="number" step="any"
                .value=${String(vg.high_value)}
                @change=${(e: Event) => {
                  const v = parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(v)) patch({ high_value: v });
                }}
              />
            </label>
            <label>${t('editor.inspector.highColour')}
              <div class="color-row">
                <input type="color"
                  .value=${vg.high_color}
                  @input=${(e: Event) => patch({ high_color: (e.target as HTMLInputElement).value })}
                />
                <span>${vg.high_color}</span>
              </div>
            </label>
          </div>

          <label>${t('editor.inspector.applyGradientTo')}
            <select
              .value=${vg.mode ?? 'both'}
              @change=${(e: Event) => {
                patch({ mode: (e.target as HTMLSelectElement).value as ValueGradientConfig['mode'] });
              }}
            >
              <option value="flow" ?selected=${vg.mode === 'flow'}>${t('editor.inspector.gradientModeFlow')}</option>
              <option value="line" ?selected=${vg.mode === 'line'}>${t('editor.inspector.gradientModeLine')}</option>
              <option value="both" ?selected=${(vg.mode ?? 'both') === 'both'}>${t('editor.inspector.gradientModeBoth')}</option>
            </select>
          </label>

          ${previewBar}

          <button class="ghost" @click=${() => {
            if (!this.config) return;
            const prev = this.config;
            const next = clearValueGradient(prev, flow.id);
            this.pushPatch(prev, next, `disable gradient for ${flowDisplayName(flow)}`);
          }}>${t('editor.inspector.removeGradient')}</button>
        ` : nothing}
      </div>
    `;
  }

  private renderGlobalAnimationPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const animCfg: AnimationConfig = this.config.animation ?? {};

    return html`
      <details class="panel anim-global-panel" open>
        <summary>${t('editor.inspector.animationGlobalSummary')}</summary>
        <div class="panel-body">
          <label>
            ${t('editor.inspector.fpsCap')}
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
              <span>${animCfg.fps ?? 60} ${t('editor.inspector.fpsSuffix')}</span>
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
            <span class="visibility-label">${t('editor.stateA.smoothSpeed')}</span>
            <span class="visibility-val">${animCfg.smooth_speed !== false ? t('editor.inspector.on') : t('editor.inspector.off')}</span>
          </label>
          <p class="hint-sub">${t('editor.inspector.smoothSpeedHint')}</p>
          <label class="visibility-row">
            <input
              type="checkbox"
              .checked=${this.config.pause_when_hidden !== false}
              @change=${(e: Event) => {
                if (!this.config) return;
                const checked = (e.target as HTMLInputElement).checked;
                const prev = this.config;
                const next = setPauseWhenHidden(prev, checked);
                this.pushPatch(prev, next, 'set pause_when_hidden');
              }}
            />
            <span class="visibility-label">${t('editor.stateA.pauseWhenHidden')}</span>
            <span class="visibility-val">${this.config.pause_when_hidden !== false ? t('editor.inspector.on') : t('editor.inspector.off')}</span>
          </label>
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
        <label class="inspector-id-row">
          <span class="node-cell-label">${t('editor.inspector.overlayIdField')}</span>
          <input
            type="text"
            spellcheck="false"
            ${ref(this.overlayIdInputRef)}
            .value=${overlay.id}
            @change=${(e: Event) => this.onInspectorOverlayIdChange(overlay.id, e)}
          />
        </label>
        <h3>${t('editor.inspector.overlayHeading', overlay.id)}</h3>
        <div class="row size-row">
          <label>
            ${t('editor.inspector.width')}
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
            ${t('editor.inspector.height')}
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
          ${t('editor.inspector.visible')}
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
          ${t('editor.inspector.opacity')}
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
        <button class="danger" @click=${() => this.removeOverlay(overlay.id)}>${t('editor.inspector.deleteOverlay')}</button>
      </div>
    `;
  }

  private renderCardConfigEditor(overlay: OverlayConfig): TemplateResult {
    const jsonValue =
      this.customConfigDraft ||
      JSON.stringify(overlay.card ?? { type: 'entity', entity: 'sensor.example_sensor' }, null, 2);
    return html`
      <label>
        ${t('editor.inspector.cardConfig')}
        <textarea
          rows="8"
          spellcheck="false"
          placeholder=${t('editor.inspector.cardConfigPlaceholder')}
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
        ${t('editor.inspector.cardConfigHintExamples')}
      </p>
      <p class="hint-sub">
        ${t('editor.inspector.cardConfigHintUrls')}
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(overlay.id)}>${t('editor.inspector.applyCardConfig')}</button>
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
        <summary>${t('editor.inspector.opacitySummary')}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${t('editor.inspector.opacityHint')}
          </p>
          ${opacitySlider('background', t('editor.inspector.opacityBackground'))}
          ${opacitySlider('darken', t('editor.inspector.opacityDarken'), 0)}
          ${opacitySlider('nodes', t('editor.inspector.opacityNodes'))}
          ${opacitySlider('flows', t('editor.inspector.opacityFlows'))}
          ${opacitySlider('dots', t('editor.inspector.opacityDots'))}
          ${opacitySlider('glow', t('editor.inspector.opacityGlow'))}
          ${opacitySlider('labels', t('editor.inspector.opacityLabels'))}
          ${opacitySlider('values', t('editor.inspector.opacityValues'))}
          ${opacitySlider('overlays', t('editor.inspector.opacityOverlays'))}
        </div>
      </details>
    `;
  }

  private renderDomainColorsPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const dc: DomainColors = this.config.domain_colors ?? {};
    const domain = this.config.domain ?? 'energy';
    const profile =
      DOMAIN_COLOUR_PROFILES[domain] ?? DOMAIN_COLOUR_PROFILES.generic!;

    const labelForRole = (roleKey: string, fallbackLabel: string): string => {
      const path = `editor.domainRoles.${domain}.${roleKey}`;
      const s = t(path);
      return s !== path ? s : fallbackLabel;
    };

    return html`
      <details class="panel domain-colors-panel">
        <summary>${t('editor.inspector.domainColoursSummary')}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${t('editor.inspector.domainColoursHint')}
          </p>
          ${profile.roles.map((role) => {
            const override = dc[role.key];
            const defaultVal = role.default;
            const label = labelForRole(role.key, role.label);
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
                    const next = setDomainColor(prev, role.key, val);
                    this.pushPatch(prev, next, `set domain_colors.${role.key}`);
                  }}
                />
                <span class="color-picker-value">${override ? override : t('editor.inspector.colourDefaultSuffix', defaultVal)}</span>
                ${override
                  ? html`<button class="ghost small" @click=${() => {
                      if (!this.config) return;
                      const prev = this.config;
                      const next = setDomainColor(prev, role.key, undefined);
                      this.pushPatch(prev, next, `reset domain_colors.${role.key}`);
                    }}>${t('editor.inspector.reset')}</button>`
                  : nothing}
              </div>
            `;
          })}
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
          <span class="visibility-val">${value ? t('editor.inspector.visibilityVisible') : t('editor.inspector.visibilityHidden')}</span>
        </label>
      `;
    };

    return html`
      <details class="panel visibility-panel">
        <summary>${t('editor.inspector.visibilitySummary')}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${t('editor.inspector.visibilityHint')}
          </p>
          ${toggle('nodes', t('editor.inspector.opacityNodes'))}
          ${toggle('lines', t('editor.inspector.visibilityFlowLines'))}
          ${toggle('dots', t('editor.inspector.visibilityAnimatedDots'))}
          ${toggle('labels', t('editor.inspector.opacityLabels'))}
          ${toggle('values', t('editor.inspector.opacityValues'))}
          ${toggle('overlays', t('editor.toolbar.overlays'))}
        </div>
      </details>
    `;
  }

  private renderDefaultsPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const d: FlowmeDefaults = this.config.defaults ?? {};
    const domain = normalizeFlowDomain(this.config.domain);
    const profile = getProfile(domain);
    const effPeak = d.peak_value ?? profile.peak;
    const cfmDisplay = Math.round(effPeak * 0.5886 * 10) / 10;

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
        <summary>${t('editor.inspector.defaultsSummary')}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${t('editor.inspector.defaultsHint')}
          </p>
          ${numInput('node_radius', t('editor.stateA.nodeRadius'), { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${numInput('dot_radius', t('editor.stateA.dotRadius'), { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${numInput('line_width', t('editor.stateA.lineWidth'), { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${numInput('burst_trigger_ratio', t('editor.inspector.burstTriggerRatio'), { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${numInput('burst_sustain_ms', t('editor.inspector.burstSustainMs'), { min: 1000, max: 30000, step: 500, defaultVal: 5000 })}
          ${numInput('burst_max_particles', t('editor.inspector.burstMaxParticles'), { min: 3, max: 50, step: 1, defaultVal: 20 })}
          ${domain === 'hvac'
            ? html`
                <div class="dual-unit-row">
                  <span class="defaults-label">${t('editor.stateA.peakAirflow')}</span>
                  <div class="field-col">
                    <label>${t('editor.stateA.peakM3h')}</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      .value=${String(effPeak)}
                      @input=${(e: Event) => {
                        if (!this.config) return;
                        const raw = parseFloat((e.target as HTMLInputElement).value);
                        if (!Number.isFinite(raw) || raw <= 0) return;
                        const prev = this.config;
                        const next = setDefault(prev, 'peak_value', raw);
                        this.pushPatch(prev, next, 'set defaults.peak_value m³/h');
                      }}
                    />
                  </div>
                  <div class="unit-divider">${t('editor.stateA.peakOr')}</div>
                  <div class="field-col">
                    <label>${t('editor.stateA.peakCfm')}</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      .value=${String(cfmDisplay)}
                      @input=${(e: Event) => {
                        if (!this.config) return;
                        const raw = parseFloat((e.target as HTMLInputElement).value);
                        if (!Number.isFinite(raw) || raw <= 0) return;
                        const m3h = Math.round(raw * 1.699 * 10) / 10;
                        const prev = this.config;
                        const next = setDefault(prev, 'peak_value', m3h);
                        this.pushPatch(prev, next, 'set defaults.peak_value via CFM');
                      }}
                    />
                  </div>
                </div>
              `
            : numInput('peak_value', t('editor.stateA.domainPeakDefault'), {
                min: 0.0001,
                max: 1e9,
                step: 1,
                defaultVal: profile.peak,
              })}
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
        ${this.renderDomainSelectorPanel()}
        ${this.renderWeatherPanel()}
        ${this.renderGlobalAnimationPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
      </div>
    `;
  }

  private renderDomainSelectorPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const domainSelected = this.config.domain ?? 'energy';
    return html`
      <details class="panel domain-settings-panel" open>
        <summary>${t('editor.stateA.domainSummary')}</summary>
        <div class="panel-body">
          <label class="field-row domain-field">
            <span class="field-label">${t('editor.stateA.domain')}</span>
            <select
              id="flowme-domain-select"
              @change=${(e: Event) => {
                const v = (e.target as HTMLSelectElement).value;
                this.onDomainChange(v);
              }}
            >
              ${FLOW_DOMAINS.map(
                (d) => html`
                  <option value=${d} ?selected=${domainSelected === d}>${this.domainOptionLabel(d)}</option>
                `,
              )}
            </select>
          </label>
        </div>
      </details>
    `;
  }

  /** Deep copy so undo / validation never shares references with `this.config`. */
  private deepCloneConfig(c: FlowmeConfig): FlowmeConfig {
    return JSON.parse(JSON.stringify(c)) as FlowmeConfig;
  }

  private onDomainChange(value: string): void {
    if (!this.config) return;
    const d = value as FlowDomain;
    if (!FLOW_DOMAINS.includes(d)) return;
    const prev = this.deepCloneConfig(this.config);
    const next = this.deepCloneConfig(this.config);
    next.domain = d;
    this.pushPatch(prev, next, 'Change domain');
  }

  private domainOptionLabel(d: FlowDomain): string {
    return t(`editor.stateA.domainOption.${d}`);
  }

  // ──────────────────────────────────────────────────────────────────────────

  private renderMultiSelectToolbar(): TemplateResult | typeof nothing {
    const count = this.selectedNodeIds.size;
    if (count < 2) return nothing;
    const ids = this.selectedNodeIds;
    const anchorId = Array.from(ids)[0]!;
    return html`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${t('editor.inspector.multiselectCount', count)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? 'suggest-path-busy' : ''}"
          aria-label=${t('editor.inspector.suggestPathBetweenAria')}
          title=${count === 2 ? t('editor.inspector.suggestPathBetweenTitle') : t('editor.inspector.suggestPathPickTwoTitle')}
          ?disabled=${count !== 2 || this.suggestBusy}
          @click=${() => void this.runSuggestPath()}
        >${this.suggestBusy
          ? html`${t('editor.toolbar.suggestPathFinding')}<span class="suggest-path-spinner" aria-hidden="true"></span>`
          : t('editor.toolbar.suggestPath')}</button>
        <button type="button" class="ms-btn" aria-label=${t('editor.toolbar.hideSelectedNodesAria')} @click=${() => this.bulkHide(ids)}>${t('editor.toolbar.hideSelected')}</button>
        <button type="button" class="ms-btn" aria-label=${t('editor.toolbar.showSelectedNodesAria')} @click=${() => this.bulkShow(ids)}>${t('editor.toolbar.showSelected')}</button>
        <button type="button" class="ms-btn" aria-label=${t('editor.toolbar.alignSelectedHorizontalAria')} @click=${() => this.bulkAlignH(ids, anchorId)}>${t('editor.toolbar.alignHorizontalShort')}</button>
        <button type="button" class="ms-btn" aria-label=${t('editor.toolbar.alignSelectedVerticalAria')} @click=${() => this.bulkAlignV(ids, anchorId)}>${t('editor.toolbar.alignVerticalShort')}</button>
        <button type="button" class="ms-btn danger" aria-label=${t('editor.toolbar.deleteSelectedNodesAria')} @click=${() => this.bulkDelete(ids)}>${t('editor.toolbar.deleteSelected')}</button>
        <button type="button" class="ms-btn ghost" aria-label=${t('editor.toolbar.clearMultiSelectionAria')} @click=${() => { this.selectedNodeIds = new Set(); this.selectedNodeId = null; }}>${t('editor.toolbar.deselect')}</button>
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
    if (!window.confirm(t('editor.inspector.deleteNodesConfirm', ids.size))) return;
    const prev = this.config;
    const next = bulkDeleteNodes(prev, ids);
    this.pushPatch(prev, next, `delete ${ids.size} nodes`);
    this.selectedNodeIds = new Set();
    this.selectedNodeId = null;
  }

  private renderBrowserPanel(bg: FlowmeConfig['background']): TemplateResult {
    return html`
      <div class="image-browser">
        ${this.imageBrowserLoading
          ? html`<div class="browser-loading">${t('editor.stateA.loading')}</div>`
          : this.imageBrowserError === IMAGE_BROWSER_NOT_CONFIGURED
            ? html`
                <div class="browser-setup-guide">
                  <p>${t('editor.stateA.browserSetupRequired')}</p>
                  <ol class="browser-setup-steps">
                    <li>${t('editor.stateA.browserSetupStep1')}</li>
                    <li>${t('editor.stateA.browserSetupStep2')}</li>
                    <li>
                      <span>${t('editor.stateA.browserSetupStep3')}</span>
                      <pre class="browser-code">homeassistant:
  media_dirs:
    flowme: /config/www/community/flowme/backgrounds</pre>
                    </li>
                    <li>${t('editor.stateA.browserSetupStep4')}</li>
                  </ol>
                  <p>${t('editor.stateA.browserSetupNote')}</p>
                  <a
                    href="https://www.home-assistant.io/more-info/local-media/setup-media/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="browser-setup-link"
                  >
                    ${t('editor.stateA.browserSetupDocs')} ↗
                  </a>
                </div>
              `
            : this.imageBrowserError
              ? html`<div class="browser-error">${this.imageBrowserError}</div>`
              : html`
                  <div class="browser-grid">
                    ${this.imageBrowserFiles.map(
                      (file) => html`
                        <div
                          class="browser-item ${this.currentImageBrowserTargetUrl(bg) === file.url
                            ? 'browser-item--selected'
                            : ''}"
                          role="button"
                          tabindex="0"
                          @click=${() => this.selectBgImage(file.url)}
                          @keydown=${(e: KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              this.selectBgImage(file.url);
                            }
                          }}
                        >
                          <img
                            src=${file.thumbnail}
                            loading="lazy"
                            alt=${file.name}
                            @error=${(e: Event) => this.onBrowserThumbError(e, file)}
                          />
                          <span class="browser-name">${file.name}</span>
                        </div>
                      `,
                    )}
                  </div>
                `}
      </div>
    `;
  }

  private onBrowserThumbError(
    e: Event,
    file: { name: string; url: string; thumbnail: string },
  ): void {
    const el = e.target as HTMLImageElement;
    if (el.dataset.flowmeThumbFallback === '1') return;
    el.dataset.flowmeThumbFallback = '1';
    el.src = file.url;
  }

  private renderWeatherPanel(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const bg = this.config.background;
    const stateEntries = Object.entries(bg.weather_states ?? {});
    const liveWeatherState =
      bg.weather_entity && this.hass ? this.hass.states[bg.weather_entity]?.state : undefined;
    return html`
      <details class="weather-panel" ?open=${stateEntries.length > 0 || !!bg.weather_entity}>
        <summary>${t('editor.inspector.weatherPanelSummary')}</summary>
        <div class="weather-body">
          <label>
            ${t('editor.inspector.defaultImageUrl')}
            <div class="bg-url-row">
              <input
                type="text"
                class="bg-url-input"
                .value=${bg.default}
                @change=${this.onDefaultBgChange}
                placeholder=${t('editor.inspector.defaultBgPlaceholder')}
              />
              <button
                type="button"
                class="tb-icon-btn"
                title=${t('editor.stateA.browseImages')}
                aria-label=${t('editor.stateA.browseImages')}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  void this.openImageBrowser('default');
                }}
              >
                📁
              </button>
            </div>
            ${this.imageBrowserOpen && this.imageBrowserField === 'default' ? this.renderBrowserPanel(bg) : nothing}
            ${bg.default
              ? html`<img class="weather-thumb" src=${bg.default} alt=${t('editor.inspector.defaultBgAlt')} />`
              : nothing}
          </label>
          <label>
            ${t('editor.inspector.weatherEntityOptional')}
            ${this.renderEntityPicker(
              bg.weather_entity ?? '',
              (value) => this.setWeatherEntityValue(value),
              { includeDomains: ['weather'], placeholder: t('editor.inspector.weatherPlaceholder') },
            )}
          </label>
          ${bg.weather_entity?.trim()
            ? html`
                <div class="weather-effects-row">
                  <label class="weather-effects-toggle">
                    <input
                      type="checkbox"
                      .checked=${bg.weather_effects ?? false}
                      @change=${this.onWeatherEffectsChange}
                    />
                    ${t('editor.stateA.weatherEffects')}
                  </label>
                  <p class="weather-effects-hint">${t('editor.stateA.weatherEffectsHelper')}</p>
                </div>
              `
            : nothing}
          ${liveWeatherState !== undefined
            ? html`<div class="weather-live-state">
                ${t('editor.inspector.currentState')} <strong>${liveWeatherState}</strong>
                ${bg.weather_states?.[liveWeatherState]
                  ? html` → <span class="weather-match-ok">${t('editor.inspector.weatherMatched')}</span>`
                  : html` → <span class="weather-match-miss">${t('editor.inspector.weatherNoMapping')}</span>`}
              </div>`
            : nothing}
          <label>
            ${t('editor.inspector.sunEntityOptional')}
            ${this.renderEntityPicker(
              bg.sun_entity ?? '',
              (value) => {
                if (!this.config) return;
                const prev = this.config;
                const next = setSunEntity(prev, value || undefined);
                this.pushPatch(prev, next, 'set sun entity');
              },
              { includeDomains: ['sun'], placeholder: t('editor.inspector.sunPlaceholder') },
            )}
          </label>
          ${bg.sun_entity && this.hass?.states[bg.sun_entity]
            ? html`<div class="weather-live-state">
                ${t('editor.inspector.sunStateLabel')} <strong>${this.hass.states[bg.sun_entity]?.state === 'above_horizon'
                  ? t('editor.inspector.sunAbove')
                  : t('editor.inspector.sunBelow')}</strong>
              </div>`
            : nothing}
          <label>
            ${t('editor.inspector.fadeTransitionSeconds')}
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
              <span>${t('editor.inspector.weatherStateColumn')}</span>
              <span>${t('editor.inspector.weatherImageUrlColumn')}</span>
              <span></span>
            </div>
            ${stateEntries.map(
              ([key, url]) => html`
                <div class="weather-state-block" data-key=${key}>
                  <div class="weather-row">
                    <input
                      type="text"
                      list="flowme-weather-states"
                      .value=${key}
                      @change=${(e: Event) => this.onWeatherStateKeyChange(key, e)}
                    />
                    <div class="bg-url-row weather-url-row">
                      <input
                        type="text"
                        class="bg-url-input"
                        .value=${url}
                        @change=${(e: Event) => this.onWeatherStateUrlChange(key, e)}
                        placeholder=${t('editor.inspector.weatherRowPlaceholder')}
                      />
                      <button
                        type="button"
                        class="tb-icon-btn"
                        title=${t('editor.stateA.browseImages')}
                        aria-label=${t('editor.stateA.browseImages')}
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          void this.openImageBrowser('weather', key);
                        }}
                      >
                        📁
                      </button>
                    </div>
                    <div class="weather-row-end">
                      ${url
                        ? html`<img class="weather-thumb" src=${url} alt=${key} />`
                        : nothing}
                      <button type="button" class="ghost" @click=${() => this.onWeatherStateRemove(key)}>
                        ${t('editor.inspector.remove')}
                      </button>
                    </div>
                  </div>
                  ${this.imageBrowserOpen &&
                  this.imageBrowserField === 'weather' &&
                  this.imageBrowserWeatherState === key
                    ? this.renderBrowserPanel(bg)
                    : nothing}
                </div>
              `,
            )}
            <datalist id="flowme-weather-states">
              ${FlowmeCardEditor.KNOWN_WEATHER_STATES.map(
                (s) => html`<option value=${s}></option>`,
              )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${t('editor.inspector.addWeatherState')}</button>
          </div>
          <details class="hint-details">
            <summary>${t('editor.inspector.metNoReferenceSummary')}</summary>
            <div class="hint-states">
              ${FlowmeCardEditor.KNOWN_WEATHER_STATES.map(
                (s) => html`<code>${s}</code>`,
              )}
              <p class="hint-sub">
                ${t('editor.inspector.metNoHint')}
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

  private currentImageBrowserTargetUrl(bg: FlowmeConfig['background']): string {
    if (this.imageBrowserField === 'weather' && this.imageBrowserWeatherState) {
      return bg.weather_states?.[this.imageBrowserWeatherState] ?? '';
    }
    return bg.default ?? '';
  }

  private async openImageBrowser(field: 'default' | 'weather', weatherState?: string): Promise<void> {
    const sameContext =
      this.imageBrowserOpen &&
      this.imageBrowserField === field &&
      (field === 'default' || this.imageBrowserWeatherState === weatherState);
    if (sameContext) {
      this.imageBrowserOpen = false;
      this.requestUpdate();
      return;
    }

    this.imageBrowserOpen = true;
    this.imageBrowserField = field;
    this.imageBrowserWeatherState = weatherState;
    this.imageBrowserError = '';
    this.imageBrowserFiles = [];
    this.imageBrowserLoading = true;
    this.requestUpdate();

    const hass = this.hass;
    if (!hass || typeof hass.callWS !== 'function') {
      this.imageBrowserLoading = false;
      this.imageBrowserError = t('editor.stateA.browserUnavailable');
      this.requestUpdate();
      return;
    }

    try {
      const result = (await hass.callWS({
        type: 'media_source/browse_media',
        media_content_id: flowmeBrowseMediaContentId(),
      })) as {
        children?: unknown[];
      };
      const children = result?.children ?? [];
      const files: { name: string; url: string; thumbnail: string }[] = [];
      for (const raw of children) {
        const item = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
        if (isDebugEnabled()) {
          dlog('[FlowMe] media item:', JSON.stringify(item, null, 2));
        }
        const id = String(item.media_content_id ?? '').toLowerCase();
        if (!IMAGE_BROWSER_EXTS.some((ext) => id.endsWith(ext))) continue;
        const resolved = resolveMediaBrowseItemUrl(item);
        if (!resolved) continue;
        const name =
          (typeof item.title === 'string' && item.title.length > 0
            ? item.title
            : undefined) ??
          (typeof item.media_content_id === 'string' ? item.media_content_id : undefined) ??
          resolved;
        files.push({ name, url: resolved, thumbnail: resolved });
      }

      if (files.length === 0 && !children.length) {
        this.imageBrowserError = IMAGE_BROWSER_NOT_CONFIGURED;
        this.imageBrowserFiles = [];
      } else {
        this.imageBrowserFiles = files;
      }
    } catch {
      this.imageBrowserError = IMAGE_BROWSER_NOT_CONFIGURED;
      this.imageBrowserFiles = [];
    } finally {
      this.imageBrowserLoading = false;
      this.requestUpdate();
    }
  }

  private selectBgImage(url: string): void {
    if (!this.config) return;
    const prev = this.config;
    let next: FlowmeConfig;
    let desc: string;
    if (this.imageBrowserField === 'weather' && this.imageBrowserWeatherState) {
      next = setWeatherStateImage(prev, this.imageBrowserWeatherState, url);
      desc = 'Set weather state image';
    } else {
      next = setBackgroundDefault(prev, url);
      desc = 'Set background image';
    }
    this.pushPatch(prev, next, desc);
    this.imageBrowserOpen = false;
    this.imageBrowserField = 'default';
    this.imageBrowserWeatherState = undefined;
  }

  private setWeatherEntityValue(value: string): void {
    if (!this.config) return;
    const trimmed = value.trim();
    const prev = this.config;
    const next = setWeatherEntity(prev, trimmed || undefined);
    this.pushPatch(prev, next, 'edit weather entity');
  }

  private onWeatherEffectsChange = (e: Event): void => {
    if (!this.config) return;
    const checked = (e.target as HTMLInputElement).checked;
    const prev = this.config;
    const next = setWeatherEffects(prev, checked);
    this.pushPatch(prev, next, 'toggle weather effects');
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
    const prev = this.config;
    const next = addWeatherStatePlaceholder(prev);
    const prevMap = prev.background.weather_states ?? {};
    const newKey = Object.keys(next.background.weather_states ?? {}).find((k) => !(k in prevMap));
    this.pushPatch(prev, next, newKey ? `Add weather state ${newKey}` : 'Add weather state');
  };

  // -- toolbar --

  // -- suggest path --

  private initPathWorker(): void {
    if (this._pathWorker || typeof Worker === 'undefined') return;
    try {
      this._pathWorker = new PathfindingWorker();
    } catch (e) {
      console.error('[FlowMe] worker init failed:', e);
      this._pathWorker = undefined;
      return;
    }
    this._pathWorker.onmessage = (e: MessageEvent) => {
      this._pathWorkerPending = false;
      this.suggestBusy = false;
      const sel = this._pathPendingSelection;
      this._pathPendingSelection = null;
      if (!sel || !this.config) return;
      const data = e.data as {
        waypoints?: Point[];
        edgesUsable?: boolean;
        elapsedMs?: number;
        error?: string;
      };
      if (data.error) {
        console.error('[FlowMe] pathfinding worker error:', data.error);
        void this.runPathfindingMainThread(sel.fromId, sel.toId, { logFallback: true });
        return;
      }
      this.applySuggestPathWorkerResult(
        {
          waypoints: data.waypoints ?? [],
          edgesUsable: data.edgesUsable ?? false,
          elapsedMs: data.elapsedMs ?? 0,
        },
        sel.fromId,
        sel.toId,
      );
    };
    this._pathWorker.onerror = (err: ErrorEvent) => {
      this._pathWorkerPending = false;
      this.suggestBusy = false;
      const sel = this._pathPendingSelection;
      this._pathPendingSelection = null;
      console.error('[FlowMe] pathfinding worker error:', err);
      if (sel) void this.runPathfindingMainThread(sel.fromId, sel.toId, { logFallback: true });
    };
  }

  private applySuggestPathWorkerResult(
    result: { waypoints: Point[]; edgesUsable: boolean; elapsedMs: number },
    fromId: string,
    toId: string,
  ): void {
    if (!result.edgesUsable) {
      this.errorMessage = t('editor.inspector.suggestCorsError');
      this.suggestPreview = null;
      return;
    }
    this.suggestPreview = {
      fromNodeId: fromId,
      toNodeId: toId,
      waypoints: result.waypoints,
      edgesUsable: result.edgesUsable,
      elapsedMs: result.elapsedMs,
    };
  }

  private async runPathfindingMainThread(
    fromId: string,
    toId: string,
    opts?: { logFallback?: boolean },
  ): Promise<void> {
    if (!this.config) return;
    if (opts?.logFallback) {
      dlog('falling back to main thread pathfinding');
    }
    const fromNode = this.config.nodes.find((n) => n.id === fromId);
    const toNode = this.config.nodes.find((n) => n.id === toId);
    if (!fromNode || !toNode) return;

    this.suggestBusy = true;
    try {
      const pathResult = await suggestPath({
        imageUrl: this.config.background.default,
        from: fromNode.position,
        to: toNode.position,
      });
      if (!pathResult.edgesUsable) {
        this.errorMessage = t('editor.inspector.suggestCorsError');
        this.suggestPreview = null;
        return;
      }
      this.applySuggestPathWorkerResult(pathResult, fromId, toId);
    } catch (err) {
      this.errorMessage = t(
        'editor.inspector.suggestAutoRouteFailed',
        err instanceof Error ? err.message : String(err),
      );
      this.suggestPreview = null;
    } finally {
      this.suggestBusy = false;
    }
  }

  private async runSuggestPath(): Promise<void> {
    if (!this.config || this.selectedNodeIds.size !== 2) {
      return;
    }
    if (this._pathWorkerPending) return;
    const [fromId, toId] = Array.from(this.selectedNodeIds) as [string, string];
    const fromNode = this.config.nodes.find((n) => n.id === fromId);
    const toNode = this.config.nodes.find((n) => n.id === toId);
    if (!fromNode || !toNode) {
      return;
    }

    const imageUrl = this.config.background?.default ?? '';

    if (typeof Worker === 'undefined') {
      await this.runPathfindingMainThread(fromId, toId, { logFallback: true });
      return;
    }

    this.initPathWorker();
    if (!this._pathWorker) {
      await this.runPathfindingMainThread(fromId, toId, { logFallback: true });
      return;
    }

    this.suggestBusy = true;
    const pack = await loadDownscaledRgbaForPathfinding(imageUrl);
    if (!pack) {
      this.suggestBusy = false;
      this.errorMessage = t('editor.inspector.suggestCorsError');
      this.suggestPreview = null;
      return;
    }

    this._pathWorkerPending = true;
    this._pathPendingSelection = { fromId, toId };
    const copy = new Uint8ClampedArray(pack.rgba);
    this._pathWorker.postMessage(
      {
        rgba: copy.buffer,
        width: pack.width,
        height: pack.height,
        fromPos: fromNode.position,
        toPos: toNode.position,
        cellSize: DEFAULT_CELL_SIZE,
      },
      [copy.buffer],
    );
  }

  private acceptSuggestion = (): void => {
    if (!this.config || !this.suggestPreview) return;
    const { fromNodeId, toNodeId, waypoints } = this.suggestPreview;
    const entity =
      window.prompt(t('editor.inspector.flowEntityPrompt'), t('editor.inspector.flowEntityDefault')) ??
      t('editor.inspector.flowEntityDefault');
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

  private onFlowFromNodeChange(flowId: string, value: string): void {
    if (!this.config) return;
    const flow = this.config.flows.find((f) => f.id === flowId);
    if (!flow) return;
    void this.applyFlowEndpointChange(flowId, value, flow.to_node);
  }

  private onFlowToNodeChange(flowId: string, value: string): void {
    if (!this.config) return;
    const flow = this.config.flows.find((f) => f.id === flowId);
    if (!flow) return;
    void this.applyFlowEndpointChange(flowId, flow.from_node, value);
  }

  /** Main-thread pathfinding (same as toolbar fallback) — single undo with endpoints + waypoints. */
  private async resolveWaypointsForEndpoints(fromId: string, toId: string): Promise<NodePosition[]> {
    if (!this.config) return [];
    const fromNode = this.config.nodes.find((n) => n.id === fromId);
    const toNode = this.config.nodes.find((n) => n.id === toId);
    if (!fromNode || !toNode) return [];
    const imageUrl = this.config.background?.default ?? '';
    if (!imageUrl) return [];
    try {
      const pathResult = await suggestPath({
        imageUrl,
        from: fromNode.position,
        to: toNode.position,
      });
      if (!pathResult.edgesUsable) return [];
      return (pathResult.waypoints ?? []).map((w) => ({ x: w.x, y: w.y }));
    } catch {
      return [];
    }
  }

  private async applyFlowEndpointChange(flowId: string, nextFrom: string, nextTo: string): Promise<void> {
    if (!this.config) return;
    if (nextFrom === nextTo) {
      this.flowEndpointError = t('editor.inspector.fromToSameError');
      return;
    }
    const prev = this.config;
    const flow = prev.flows.find((f) => f.id === flowId);
    if (!flow) return;

    this.flowEndpointError = null;
    this.flowEndpointPathfindingFlowId = flowId;
    let waypoints: NodePosition[] = [];
    try {
      waypoints = await this.resolveWaypointsForEndpoints(nextFrom, nextTo);
    } finally {
      this.flowEndpointPathfindingFlowId = null;
    }

    const next: FlowmeConfig = {
      ...prev,
      flows: prev.flows.map((f) =>
        f.id === flowId ? { ...f, from_node: nextFrom, to_node: nextTo, waypoints } : f,
      ),
    };

    this.pushPatch(prev, next, 'Change flow endpoints');
    this.selectedFlowId = flowId;
  }

  private renderSuggestPreview(): TemplateResult | typeof nothing {
    if (!this.suggestPreview || !this.config) return nothing;
    if (!this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return nothing;
    const fromNode = this.config.nodes.find((n) => n.id === this.suggestPreview!.fromNodeId);
    const toNode = this.config.nodes.find((n) => n.id === this.suggestPreview!.toNodeId);
    if (!fromNode || !toNode) return nothing;
    const w = this.imageNaturalW;
    const h = this.imageNaturalH;
    const points: Point[] = [
      fromNode.position,
      ...this.suggestPreview.waypoints,
      toNode.position,
    ];
    const polyline = points
      .map((p) => {
        const px = this.pct2px(p);
        return `${px.x.toFixed(2)},${px.y.toFixed(2)}`;
      })
      .join(' ');
    return html`
      <svg class="suggest-overlay" viewBox=${`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <polyline points=${polyline} />
      </svg>
      ${this.suggestPreview.waypoints.map((wp) => {
        const m = this.pct2px(wp);
        return html`
          <div class="suggest-marker" style=${`left: ${m.x}px; top: ${m.y}px;`}></div>
        `;
      })}
    `;
  }

  private renderSuggestBar(): TemplateResult | typeof nothing {
    if (!this.suggestPreview) return nothing;
    return html`
      <div class="suggest-bar">
        <span>${t('editor.suggestBar.message')}</span>
        <span>${t('editor.inspector.suggestPreviewWaypoints', this.suggestPreview.waypoints.length)}</span>
        <button type="button" aria-label=${t('editor.toolbar.acceptPath')} @click=${this.acceptSuggestion}>${t('editor.inspector.accept')}</button>
        <button type="button" class="ghost" aria-label=${t('editor.toolbar.cancelPath')} @click=${this.cancelSuggestion}>${t('editor.toolbar.cancel')}</button>
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
      const { config: next, node } = addNode(prev, pos, t('editor.inspector.newNodeDefaultLabel'));
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
    this.selectedNodeIds = new Set();
    this.selectedOverlayId = null;
  };

  private onFlowPathDblClick = (event: MouseEvent): void => {
    event.stopPropagation();
    event.preventDefault();
    if (!this.config) return;
    const target = event.currentTarget as SVGElement;
    const flowId = target.dataset['flowId'];
    if (!flowId) return;
    this.selectorType = 'flows';
    this.selectedFlowId = flowId;
    this.selectedNodeId = null;
    this.selectedNodeIds = new Set();
    this.selectedOverlayId = null;
    this._pendingInspectorLabelFocus = true;
  };

  private onNodeDotDblClick(e: MouseEvent, node: NodeConfig): void {
    e.preventDefault();
    e.stopPropagation();
    this.selectorType = 'nodes';
    this.selectedNodeId = node.id;
    this.selectedNodeIds = new Set([node.id]);
    this.selectedFlowId = null;
    this.selectedOverlayId = null;
    this._pendingInspectorLabelFocus = true;
  }

  private onNodeLabelTextDblClick(e: MouseEvent, node: NodeConfig): void {
    e.preventDefault();
    e.stopPropagation();
    if ((e.target as HTMLElement).closest('.eye-toggle')) return;
    const draft = node.label ?? node.id;
    this.inlineRename = { kind: 'node', id: node.id, draft };
  }

  private commitNodeInlineRename(apply: boolean): void {
    const ir = this.inlineRename;
    if (!ir || ir.kind !== 'node' || !this.config) return;
    if (!apply) {
      this.inlineRename = null;
      return;
    }
    const node = this.config.nodes.find((n) => n.id === ir.id);
    if (!node) {
      this.inlineRename = null;
      return;
    }
    const oldDisplay = node.label ?? node.id;
    const newLabel = ir.draft.trim() ? ir.draft.trim() : undefined;
    if ((node.label ?? undefined) === newLabel) {
      this.inlineRename = null;
      return;
    }
    const prev = this.config;
    const next = setNodeLabel(prev, ir.id, newLabel);
    this.inlineRename = null;
    this.pushPatch(
      prev,
      next,
      `Rename node ${oldDisplay} to ${newLabel ?? '(cleared)'}`,
    );
  }

  private onOverlayChipDblClick(e: MouseEvent, overlay: OverlayConfig): void {
    e.preventDefault();
    e.stopPropagation();
    this.inlineRename = { kind: 'overlay', id: overlay.id, draft: overlay.id };
  }

  private commitOverlayInlineRename(apply: boolean): void {
    const ir = this.inlineRename;
    if (!ir || ir.kind !== 'overlay' || !this.config) return;
    if (!apply) {
      this.inlineRename = null;
      return;
    }
    const raw = ir.draft.trim();
    if (!raw || raw === ir.id) {
      this.inlineRename = null;
      return;
    }
    const prev = this.config;
    const next = renameOverlayId(prev, ir.id, raw);
    if (next === prev) {
      this.errorMessage = t('editor.errors.renameIdConflict');
      this.inlineRename = null;
      return;
    }
    this.inlineRename = null;
    this.errorMessage = '';
    this.pushPatch(prev, next, `Rename overlay ${ir.id} to ${raw}`);
    this.selectedOverlayId = raw;
  }

  private onInspectorFlowIdChange(oldId: string, event: Event): void {
    if (!this.config) return;
    const input = event.target as HTMLInputElement;
    const raw = input.value.trim();
    const prev = this.config;
    const next = renameFlowId(prev, oldId, raw);
    if (next === prev) {
      this.errorMessage = t('editor.errors.renameIdConflict');
      input.value = oldId;
      return;
    }
    this.errorMessage = '';
    this.pushPatch(prev, next, `Rename flow ${oldId} to ${raw}`);
    this.selectedFlowId = raw;
  }

  private onInspectorOverlayIdChange(oldId: string, event: Event): void {
    if (!this.config) return;
    const input = event.target as HTMLInputElement;
    const raw = input.value.trim();
    const prev = this.config;
    const next = renameOverlayId(prev, oldId, raw);
    if (next === prev) {
      this.errorMessage = t('editor.errors.renameIdConflict');
      input.value = oldId;
      return;
    }
    this.errorMessage = '';
    this.pushPatch(prev, next, `Rename overlay ${oldId} to ${raw}`);
    this.selectedOverlayId = raw;
  }

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
          window.prompt(t('editor.inspector.flowEntityPrompt'), t('editor.inspector.flowEntityDefault')) ??
          t('editor.inspector.flowEntityDefault');
        const prev = this.config;
        const { config: next, flow } = addFlow(prev, this.pending.fromId, nodeId, entity);
        this.pushPatch(prev, next, `add flow ${flowDisplayName(flow)}`);
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
    if (window.confirm(t('editor.inspector.deleteOverlayConfirm', id))) {
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
    if (window.confirm(t('editor.inspector.deleteNodeContextConfirm', nodeId))) {
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
      // Bulk move: screen Δ / scale → card-space px; % uses image natural size (same as pointerToPercent).
      const iw = this.imageNaturalW > 0 ? this.imageNaturalW : 1;
      const ih = this.imageNaturalH > 0 ? this.imageNaturalH : 1;
      const dxCard = (event.clientX - target.startPx.x) / this.scale;
      const dyCard = (event.clientY - target.startPx.y) / this.scale;
      const dxPct = (dxCard / iw) * 100;
      const dyPct = (dyCard / ih) * 100;
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
    const node = prev.nodes.find((n) => n.id === nodeId);
    const oldDisplay = node?.label ?? nodeId;
    const next = setNodeLabel(prev, nodeId, value.trim() ? value.trim() : undefined);
    const nextLabel = value.trim() ? value.trim() : undefined;
    this.pushPatch(prev, next, `Rename node ${oldDisplay} to ${nextLabel ?? nodeId}`);
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
    const flow = this.config.flows.find((f) => f.id === flowId);
    const prev = this.config;
    const trimmed = value.trim();
    if (!trimmed) return; // flow entity is required — ignore empty submit
    const next = {
      ...prev,
      flows: prev.flows.map((f) =>
        f.id === flowId ? { ...f, entity: trimmed } : f,
      ),
    };
    this.pushPatch(prev, next, `edit entity of ${flow ? flowDisplayName(flow) : flowId}`);
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
      this.customConfigError = t('editor.inspector.invalidCardJson', err instanceof Error ? err.message : String(err));
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
    const flow = this.config.flows.find((f) => f.id === flowId);
    const prev = this.config;
    const next = deleteFlow(prev, flowId);
    this.selectedFlowId = null;
    this.pushPatch(prev, next, `delete flow ${flow ? flowDisplayName(flow) : flowId}`);
  }

  private onFlowLabelChange(flowId: string, raw: string): void {
    if (!this.config) return;
    const flow = this.config.flows.find((f) => f.id === flowId);
    if (!flow) return;
    const label = raw.trim();
    const prev = this.config;
    const next = setFlowLabel(prev, flowId, label === '' || label === flow.id ? undefined : label);
    this.pushPatch(prev, next, `Set flow label ${flow.id}`);
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
      setDebugEnabled(validatedNext.debug ?? false);
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
    .canvas-content--pending {
      transform: none;
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
    .background--pending {
      background-size: contain;
      background-position: center center;
    }
    .connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .node-effects-editor {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      pointer-events: none;
    }
    .inspector-details.node-effect-details {
      margin-top: 6px;
      border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      padding-top: 4px;
    }
    .inspector-details.node-effect-details summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .inspector-details.node-effect-details summary::before {
      content: '▸ ';
    }
    .inspector-details.node-effect-details[open] summary::before {
      content: '▾ ';
    }
    .inspector-details.node-effect-details summary::-webkit-details-marker {
      display: none;
    }
    .node-effect-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 6px 0 8px;
    }
    .node-effect-body label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .node-effect-type-row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 10px;
    }
    .node-effect-preview {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    }
    .node-effect-type-label {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
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
    .ms-btn.suggest-path-busy {
      white-space: nowrap;
    }
    .suggest-path-spinner {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-left: 6px;
      vertical-align: -2px;
      border: 2px solid rgba(255, 255, 255, 0.35);
      border-top-color: rgba(255, 255, 255, 0.92);
      border-radius: 50%;
      animation: flowme-suggest-spin 0.65s linear infinite;
    }
    @keyframes flowme-suggest-spin {
      to {
        transform: rotate(360deg);
      }
    }
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
    .handle-id {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.8);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      white-space: nowrap;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input.inline-rename {
      font-size: 11px;
      color: #fff;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      outline: none;
      min-width: 60px;
      max-width: 200px;
      padding: 0 2px 1px;
      border-radius: 0;
      box-sizing: border-box;
      font-family: inherit;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    input.overlay-inline-rename {
      font-size: 10px;
      max-width: 140px;
      pointer-events: auto;
    }
    .inspector-id-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .inspector-id-row input {
      flex: 1;
      min-width: 120px;
    }
    .field-row.domain-field,
    .domain-field {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .flow-endpoint-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }
    .flow-endpoint-row label {
      font-size: 12px;
      opacity: 0.9;
    }
    .flow-endpoint-select {
      width: 100%;
      max-width: 100%;
    }
    .flow-endpoint-busy {
      margin: 4px 0 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .flow-endpoint-error {
      color: var(--error-color, #f44336);
      font-size: 12px;
      margin: 0 0 8px;
    }
    .field-label {
      min-width: 5rem;
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
      pointer-events: auto;
      cursor: text;
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
    .inspector h3,
    .inspector h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }
    .inspector-fieldset {
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      border-radius: 6px;
      padding: 8px 10px;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .inspector-legend {
      font-size: 11px;
      font-weight: 600;
      padding: 0 4px;
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
    .defaults-nested {
      margin-top: 4px;
      padding: 8px 0 0;
      border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
    }
    .defaults-nested > summary {
      list-style: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .advanced-options {
      margin-top: 12px;
      border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      padding-top: 8px;
    }
    .advanced-options summary {
      cursor: pointer;
      font-size: 0.85em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      user-select: none;
      list-style: none;
    }
    .advanced-options summary::before {
      content: '▶ ';
      font-size: 0.75em;
    }
    .advanced-options[open] summary::before {
      content: '▼ ';
    }
    .advanced-options-content {
      padding-top: 8px;
    }
    .advanced-zero-row label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .advanced-zero-row input[type='number'] {
      max-width: 120px;
    }
    .dual-unit-row {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: 10px 12px;
      margin-top: 4px;
    }
    .dual-unit-row > .defaults-label {
      flex: 1 0 100%;
    }
    .field-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 11px;
    }
    .field-col input[type='number'] {
      width: 88px;
      font: inherit;
      padding: 3px 5px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .unit-divider {
      align-self: center;
      opacity: 0.65;
      font-size: 11px;
      padding-bottom: 6px;
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
    .weather-effects-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .weather-effects-toggle {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .weather-effects-hint {
      margin: 0;
      font-size: 11px;
      opacity: 0.75;
      line-height: 1.35;
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
    .bg-url-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
    .bg-url-row .bg-url-input {
      flex: 1;
      min-width: 0;
    }
    .image-browser {
      margin-top: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      border-radius: 4px;
      max-height: 200px;
      overflow-y: auto;
    }
    .browser-loading,
    .browser-error {
      padding: 10px;
      font-size: 12px;
      opacity: 0.85;
    }
    .browser-error {
      color: var(--error-color, #f87171);
    }
    .browser-setup-guide {
      padding: 12px;
      font-size: 0.85em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
    }
    .browser-setup-steps {
      margin: 8px 0 8px 1.25em;
      padding-left: 1em;
    }
    .browser-setup-steps li {
      margin: 6px 0;
    }
    .browser-setup-steps pre {
      margin-top: 6px;
    }
    .browser-code {
      background: var(--code-editor-background, #1e1e1e);
      color: var(--token-color-text, #d4d4d4);
      padding: 8px;
      border-radius: 4px;
      font-size: 0.9em;
      margin: 8px 0;
      overflow-x: auto;
      white-space: pre;
    }
    .browser-setup-link {
      color: var(--primary-color, #4ade80);
      text-decoration: none;
    }
    .browser-setup-link:hover {
      text-decoration: underline;
    }
    .weather-url-row {
      min-width: 0;
      width: 100%;
    }
    .browser-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 4px;
      padding: 8px;
    }
    .browser-item {
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
      border: 2px solid transparent;
      text-align: center;
    }
    .browser-item:hover {
      border-color: var(--primary-color, #4ade80);
    }
    .browser-item--selected {
      border-color: var(--primary-color, #4ade80);
      background: var(--primary-color-light, rgba(74, 222, 128, 0.12));
    }
    .browser-item img {
      width: 100%;
      height: 60px;
      object-fit: cover;
      display: block;
    }
    .browser-name {
      font-size: 0.7em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      padding: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
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
    .weather-state-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
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
      margin: 0;
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
      list-style: none;
      margin: 0;
      padding: 0;
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
      margin: 0 0 2px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.7;
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

    /* Keyboard focus rings (keyboard only) */
    .tb-icon-btn:focus-visible,
    .tb-btn:focus-visible,
    .tb-select:focus-visible,
    .ms-btn:focus-visible,
    .handle:focus-visible,
    .waypoint:focus-visible,
    .overlay-handle:focus-visible,
    .overlay-resize:focus-visible,
    .inspector button:focus-visible,
    .inspector input:focus-visible,
    .inspector select:focus-visible,
    .inspector textarea:focus-visible,
    .eye-toggle:focus-visible,
    .icon-btn:focus-visible,
    .suggest-bar button:focus-visible,
    .anim-details summary:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (prefers-contrast: more) {
      .overlay-handle.overlay-wrapper {
        outline: 2px solid var(--primary-text-color);
        outline-offset: 1px;
      }
    }
  `;
}
