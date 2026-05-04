import type {
  FlowAnimationConfig,
  FlowConfig,
  FlowmeConfig,
  FlowProfile,
} from '../types.js';
import { getProfile, resolveFlowColor } from '../flow-profiles/index.js';
import {
  awaitStableSize,
  debounce,
  percentToPixel,
  polylineToSvgPathStyled,
  prefersReducedMotion,
  resolveSpeedCurveParams,
  sigmoidSpeedCurve,
  type ResolvedSpeedCurveParams,
} from '../utils.js';
import type { FlowRenderer } from './types.js';
import { dlog, isDebugEnabled } from '../debug-log.js';
import { createDurInterpState, resolveSmoothedDuration, type DurInterpState } from './dur-interpolation.js';

const RLOG = '[FlowMe Renderer]';
function rlog(...args: unknown[]): void {
  dlog(RLOG, ...args);
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

function readDebugMode(): boolean {
  try {
    const p = new URLSearchParams(window.location.search);
    return p.get('flowme_debug') === '1';
  } catch {
    return false;
  }
}

const DEBUG = readDebugMode();
const DEBUG_DUR_MS = 2000;

const DEFAULT_PARTICLE_COUNT = 3;
const DOT_RADIUS = 5;
const STROKE_WIDTH = 2;

const BURST_TRIGGER_RATIO = 0.9;
const BURST_SUSTAIN_MS = 5000;
const BURST_MAX_PARTICLES = 20;

/** Shimmer: speed factor and opacity when at/near threshold */
const SHIMMER_SPEED_FACTOR = 0.2;
const SHIMMER_OPACITY = 0.3;

/**
 * Chevron / arrow particle (local coords, tip toward +X).
 * `r` = (dot_radius × particle_size) / 10 so the 20r-tall chevron matches the 2R circle diameter (R = dot_radius × particle_size).
 */
function chevronArrowPath(r: number): string {
  const f = (n: number) => n.toFixed(4);
  return [
    `M ${f(15 * r)} 0`,
    `L ${f(10 * r)} ${f(-10 * r)}`,
    `L ${f(0)} ${f(-10 * r)}`,
    `L ${f(5 * r)} 0`,
    `L ${f(0)} ${f(10 * r)}`,
    `L ${f(10 * r)} ${f(10 * r)}`,
    'Z',
  ].join(' ');
}

function teardropShapePath(r: number): string {
  return [
    `M 0,${-r * 2.2}`,
    `C ${r * 1.1},${-r * 1.2} ${r * 1.3},${-r * 0.2} ${r * 1.3},${r * 0.5}`,
    `C ${r * 1.3},${r * 1.4} ${r * 0.7},${r * 2} 0,${r * 2}`,
    `C ${-r * 0.7},${r * 2} ${-r * 1.3},${r * 1.4} ${-r * 1.3},${r * 0.5}`,
    `C ${-r * 1.3},${-r * 0.2} ${-r * 1.1},${-r * 1.2} 0,${-r * 2.2}`,
    'Z',
  ].join(' ');
}

const TRAIL_TAIL_DIST_PX = [8, 16, 24, 32];
const TRAIL_TAIL_SCALE = [0.9, 0.75, 0.6, 0.4];
const TRAIL_TAIL_OPACITY = [0.8, 0.55, 0.35, 0.15];

type AnimStyle = NonNullable<FlowAnimationConfig['animation_style']>;
type ParticleKind = NonNullable<FlowAnimationConfig['particle_shape']>;

interface ParticleDom {
  shape: SVGGraphicsElement;
  animateMotion: SVGAnimateMotionElement;
  /** Flicker animation element (added when flicker:true) */
  flickerAnim?: SVGAnimateElement;
  /** trail style: extra motion elements for tail segments (parallel to head) */
  trailMotions?: SVGAnimateMotionElement[];
}

interface FlowDomNodes {
  group: SVGGElement;
  path: SVGPathElement;
  /** When `direction === 'both'`, reversed polyline for particles travelling opposite.way */
  pathRev?: SVGPathElement;
  pathRevId?: string;
  pathId: string;
  /** The faint background outline <use> element (used for gradient line colour). */
  outline?: SVGUseElement;
  /** Active animation style currently rendered */
  style: AnimStyle;
  particles: ParticleDom[];
  /** dash/fluid: the stroke-animated <use> element */
  lineStroke?: SVGUseElement;
  /** fluid: linear gradient element */
  fluidGradient?: SVGLinearGradientElement;
  /** fluid: first paint fade-in done for this flow (not reset on hass ticks) */
  fluidInitialised?: boolean;
  /** "both" direction uses a second set of particles going the other way */
  particlesBack?: ParticleDom[];
}

/**
 * SVG-based flow renderer (v1.0.12+).
 *
 * Supports animation_style: dots | dash | arrow | trail | fluid | none
 * Supports particle_shape: circle | square | arrow | teardrop | diamond
 * Supports direction: auto | forward | reverse | both
 * Supports shimmer, flicker, glow_intensity, particle_size, particle_count,
 *          trail_length, dash_gap
 * Supports global animation.fps cap and smooth_speed interpolation (v1.23 ANIM-1).
 */
export class SvgRenderer implements FlowRenderer {
  private container: HTMLElement | null = null;
  private svg: SVGSVGElement | null = null;
  private config: FlowmeConfig | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private flowNodes = new Map<string, FlowDomNodes>();
  private flowsById = new Map<string, FlowConfig>();
  private latestValues = new Map<string, number>();
  private applyUpdate = debounce(() => this.flushUpdates(), 200);
  private burstEnteredAt = new Map<string, number>();
  private burstActive = new Set<string>();

  /** ANIM-1: eased duration interpolation state */
  private durInterp: DurInterpState = createDurInterpState();
  // Direction change: track last direction; on sign flip decelerate→0→new direction (600ms total)
  private lastDirection = new Map<string, number>(); // +1 or -1
  private dirChanging = new Map<string, { startMs: number; oldDir: number; newDir: number }>();
  private rafHandle: number | null = null;
  private lastFrameTime = 0;
  // Adaptive particle count per flow — adjusted at most once per second globally (ANIM-2)
  private adaptiveCount = new Map<string, number>();
  private lastAdaptivePassAt = 0;
  private frameTimeSamples: number[] = [];
  private lastFrameForAdaptive = 0;
  // Animation resume (P3-4): track last particle offsets
  private particleOffsets = new Map<string, number[]>();
  // GRADIENT-1: per-flow gradient colour (resolved by FlowmeCard from hass state)
  private gradientColors = new Map<string, string>();
  // SPACING-1: random spacing — per-particle offsets refreshed slowly
  private randomOffsets = new Map<string, number[]>();
  private randomOffsetsLastUpdate = new Map<string, number>();
  // SPACING-1: wave_lateral — per-flow JS-driven position state
  private lateralPhase = new Map<string, number>();
  /** When true, all flows render as static lines (OS reduced-motion preference). */
  private prefersReducedMotionFlag = false;

  /** Last travel sign (+1 from→to, −1 to→from) used for path geometry (resize / sync). */
  private flowPathSyncedDirection = new Map<string, number>();

  async init(container: HTMLElement, config: FlowmeConfig): Promise<void> {
    if (this.svg) {
      this.destroy();
    }
    rlog('init:', container.getBoundingClientRect(), 'flows:', config.flows.length);
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log(
        '[FlowMe Renderer] init start dims:',
        container.offsetWidth,
        container.offsetHeight,
      );
    }
    this.container = container;
    this.config = config;
    this.prefersReducedMotionFlag = prefersReducedMotion();
    this.flowsById = new Map(config.flows.map((f) => [f.id, f]));

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    svg.style.pointerEvents = 'none';
    svg.style.overflow = 'visible';
    this.svg = svg;
    container.appendChild(svg);

    this.buildSkeleton();
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(container);
    this.startFpsLoop();
    // Lovelace preview can reflow after several frames — wait for stable size.
    await awaitStableSize(container);
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log('[FlowMe Renderer] stable dims:', container.offsetWidth, container.offsetHeight);
    }
    this.onResize();
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log('[FlowMe Renderer] post-resize dims:', container.offsetWidth, container.offsetHeight);
    }
  }

  /** Same flow ids as at init — refresh paths and particle layout without destroy/init. */
  applyConfig(config: FlowmeConfig): void {
    if (!this.svg) return;
    this.config = config;
    this.flowsById = new Map(config.flows.map((f) => [f.id, f]));
    this.onResize();
    for (const flow of config.flows) {
      const v = this.latestValues.get(flow.id) ?? 0;
      this.applyFlow(flow.id, v);
    }
  }

  updateFlow(flowId: string, value: number): void {
    if (!this.flowsById.has(flowId)) return;
    this.latestValues.set(flowId, value);
    this.applyUpdate();
  }

  /**
   * GRADIENT-1: Set the resolved gradient colour for a flow.
   * Called by FlowmeCard whenever the gradient entity's state changes.
   * The colour replaces the normal flow colour in the next render frame.
   * Pass undefined/null to clear and fall back to the flow's own color.
   */
  setGradientColor(flowId: string, color: string | null): void {
    if (color) {
      this.gradientColors.set(flowId, color);
    } else {
      this.gradientColors.delete(flowId);
    }
    this.applyUpdate();
  }

  /**
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  private startFpsLoop(): void {
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
    const targetFps = this.config?.animation?.fps ?? 60;
    const frameInterval = 1000 / targetFps;

    const loop = (now: number) => {
      if (!this.svg) return; // destroyed
      const delta = now - this.lastFrameTime;
      this.sampleFrameTime();
      this.runAdaptivePassIfDue(now);
      if (delta >= frameInterval) {
        this.lastFrameTime = now - (delta % frameInterval);
        // Smooth speed/direction transitions need periodic flush
        const smoothSpeed = this.config?.animation?.smooth_speed !== false;
        const hasDurInterp = this.durInterp.interpStartMs.size > 0;
        if (smoothSpeed && (hasDurInterp || this.dirChanging.size > 0)) {
          this.flushUpdates();
        }
        // wave_lateral: update perpendicular offsets every frame
        this.updateLateralWaves(now);
        // wave_spacing / pulse spacing: recompute positions from elapsed time
        this.updateTimeBasedSpacing(now);
      }
      this.rafHandle = requestAnimationFrame(loop);
    };

    // Always run the rAF loop for smooth_speed and direction change transitions
    this.lastFrameTime = performance.now();
    this.rafHandle = requestAnimationFrame(loop);
  }

  pause(): void {
    if (!this.svg) return;
    const root = this.svg as SVGSVGElement & { pauseAnimations?: () => void };
    if (typeof root.pauseAnimations === 'function') {
      root.pauseAnimations();
    } else {
      for (const el of this.svg.querySelectorAll('animateMotion, animate, animateTransform')) {
        const anim = el as SVGAnimationElement & { pauseAnimations?: () => void };
        if (typeof anim.pauseAnimations === 'function') anim.pauseAnimations();
      }
    }
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
  }

  resume(): void {
    if (!this.svg) return;
    const root = this.svg as SVGSVGElement & { unpauseAnimations?: () => void };
    if (typeof root.unpauseAnimations === 'function') {
      root.unpauseAnimations();
    } else {
      for (const el of this.svg.querySelectorAll('animateMotion, animate, animateTransform')) {
        const anim = el as SVGAnimationElement & { unpauseAnimations?: () => void };
        if (typeof anim.unpauseAnimations === 'function') anim.unpauseAnimations();
      }
    }
    if (this.rafHandle === null) {
      this.startFpsLoop();
    }
  }

  destroy(): void {
    this.applyUpdate.cancel();
    if (this.rafHandle !== null) cancelAnimationFrame(this.rafHandle);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.svg?.remove();
    this.svg = null;
    this.container = null;
    this.config = null;
    this.flowNodes.clear();
    this.flowsById.clear();
    this.latestValues.clear();
    this.burstEnteredAt.clear();
    this.burstActive.clear();
    this.durInterp = createDurInterpState();
    this.lastDirection.clear();
    this.dirChanging.clear();
    this.adaptiveCount.clear();
    this.frameTimeSamples.length = 0;
    this.lastAdaptivePassAt = 0;
    this.particleOffsets.clear();
    this.gradientColors.clear();
    this.randomOffsets.clear();
    this.randomOffsetsLastUpdate.clear();
    this.lateralPhase.clear();
    this.flowPathSyncedDirection.clear();
  }

  // ── internal ──────────────────────────────────────────────────────────────

  private containerSize(): { width: number; height: number } {
    if (!this.container) return { width: 0, height: 0 };
    const rect = this.container.getBoundingClientRect();
    return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
  }

  /**
   * Travel sense along the rendered path: +1 = from_node → to_node, −1 = to_node → from_node.
   * Only `direction: auto` uses the sensor sign; `both` uses +1 for geometry sync (dual paths handle streams).
   */
  private computeIntendedTravelSign(flow: FlowConfig, value: number): number {
    const directionMode = flow.animation?.direction ?? 'auto';
    if (directionMode === 'both') return 1;
    if (directionMode === 'forward') return 1;
    if (directionMode === 'reverse') return -1;
    return value >= 0 ? 1 : -1;
  }

  /** Second path in defs for `direction: both` — opposite waypoint order. */
  private ensurePathRev(dom: FlowDomNodes): void {
    if (dom.pathRev || !this.svg) return;
    const defs = this.svg.querySelector('defs');
    if (!defs) return;
    const rev = document.createElementNS(SVG_NS, 'path');
    rev.setAttribute('id', `${dom.pathId}-rev`);
    rev.setAttribute('fill', 'none');
    defs.appendChild(rev);
    dom.pathRev = rev;
    dom.pathRevId = `${dom.pathId}-rev`;
  }

  /**
   * Keep motion path geometry aligned with travel direction so `rotate="auto"` matches flow.
   * Reverse waypoint order when direction &lt; 0 (single-stream); `both` uses forward + reversed paths.
   */
  private syncFlowPathGeometry(flow: FlowConfig, dom: FlowDomNodes, direction: number): void {
    if (!this.config) return;
    const size = this.containerSize();
    const nodesById = new Map(this.config.nodes.map((n) => [n.id, n]));
    const fromNode = nodesById.get(flow.from_node);
    const toNode = nodesById.get(flow.to_node);
    if (!fromNode || !toNode) return;

    const pointsForward = [fromNode.position, ...flow.waypoints, toNode.position];
    const pointsReverse = [toNode.position, ...flow.waypoints.slice().reverse(), fromNode.position];
    const lineStyle = flow.line_style ?? 'corner';
    const dirMode = flow.animation?.direction ?? 'auto';

    if (dirMode === 'both') {
      this.ensurePathRev(dom);
      const fwd = polylineToSvgPathStyled(pointsForward, size, lineStyle);
      const rev = polylineToSvgPathStyled(pointsReverse, size, lineStyle);
      dom.path.setAttribute('d', fwd);
      if (dom.pathRev) dom.pathRev.setAttribute('d', rev);
    } else {
      if (dom.pathRev) {
        dom.pathRev.remove();
        dom.pathRev = undefined;
        dom.pathRevId = undefined;
      }
      const pts = direction >= 0 ? pointsForward : pointsReverse;
      dom.path.setAttribute('d', polylineToSvgPathStyled(pts, size, lineStyle));
    }
    this.flowPathSyncedDirection.set(flow.id, direction);
  }

  private motionPathRef(dom: FlowDomNodes, flow: FlowConfig, particleDirection: number): string {
    const dirMode = flow.animation?.direction ?? 'auto';
    if (dirMode === 'both') {
      return particleDirection >= 0 ? dom.pathId : (dom.pathRevId ?? dom.pathId);
    }
    return dom.pathId;
  }

  private animStyle(flow: FlowConfig): AnimStyle {
    if (this.prefersReducedMotionFlag) return 'none';
    return flow.animation?.animation_style ?? 'dots';
  }

  setFlowAriaLabel(flowId: string, label: string): void {
    const dom = this.flowNodes.get(flowId);
    if (!dom?.group) return;
    dom.group.setAttribute('role', 'img');
    dom.group.setAttribute('aria-label', label);
  }

  private buildSkeleton(): void {
    if (!this.svg || !this.config) return;
    const size = this.containerSize();
    this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);

    const defs = document.createElementNS(SVG_NS, 'defs');
    this.svg.appendChild(defs);

    const nodesById = new Map(this.config.nodes.map((n) => [n.id, n]));

    for (const flow of this.config.flows) {
      const fromNode = nodesById.get(flow.from_node);
      const toNode = nodesById.get(flow.to_node);
      if (!fromNode || !toNode) continue;

      const points = [fromNode.position, ...flow.waypoints, toNode.position];
      const pathId = `flowme-path-${flow.id}`;

      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('id', pathId);
      path.setAttribute('d', polylineToSvgPathStyled(points, size, flow.line_style ?? 'corner'));
      path.setAttribute('fill', 'none');
      defs.appendChild(path);

      const group = document.createElementNS(SVG_NS, 'g');
      group.classList.add('flowme-flow-group');
      group.setAttribute('data-flow-id', flow.id);
      if (flow.opacity !== undefined) group.setAttribute('opacity', String(flow.opacity));
      if (flow.visible === false) group.style.display = 'none';

      const strokeWidth = this.config?.defaults?.line_width ?? STROKE_WIDTH;
      const outline = document.createElementNS(SVG_NS, 'use');
      outline.classList.add('flow-line');
      outline.setAttributeNS(XLINK_NS, 'href', `#${pathId}`);
      outline.setAttribute('href', `#${pathId}`);
      outline.setAttribute('stroke', this.primaryColor(flow));
      outline.setAttribute('stroke-opacity', '0.2');
      outline.setAttribute('stroke-width', String(strokeWidth));
      outline.setAttribute('stroke-linecap', 'round');
      outline.setAttribute('stroke-linejoin', 'round');
      outline.setAttribute('fill', 'none');
      group.appendChild(outline);

      const dom: FlowDomNodes = {
        group, path, pathId,
        outline,
        style: this.animStyle(flow),
        particles: [],
      };

      this.svg.appendChild(group);
      this.flowNodes.set(flow.id, dom);
      rlog('skeleton:', flow.id, '| style=', dom.style, '| line_style=', flow.line_style ?? 'corner (default)');
    }
  }

  private onResize(): void {
    if (!this.svg || !this.config) return;
    const size = this.containerSize();
    this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
    const nodesById = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const flow of this.config.flows) {
      const dom = this.flowNodes.get(flow.id);
      if (!dom) continue;
      const fromNode = nodesById.get(flow.from_node);
      const toNode = nodesById.get(flow.to_node);
      if (!fromNode || !toNode) continue;
      const v = this.latestValues.get(flow.id) ?? 0;
      const syncDir = this.flowPathSyncedDirection.get(flow.id) ?? this.computeIntendedTravelSign(flow, v);
      this.syncFlowPathGeometry(flow, dom, syncDir);
    }
  }

  private flushUpdates(): void {
    for (const [flowId, value] of this.latestValues) {
      this.applyFlow(flowId, value);
    }
  }

  private applyFlow(flowId: string, value: number): void {
    const flow = this.flowsById.get(flowId);
    const dom = this.flowNodes.get(flowId);
    if (!flow || !dom) return;

    const anim = flow.animation ?? {};
    const style: AnimStyle = this.animStyle(flow);

    // Rebuild DOM if style changed since last render
    if (dom.style !== style) {
      this.teardownStyle(dom);
      dom.style = style;
    }

    const profile = this.profileFor(flow);
    const params = resolveSpeedCurveParams(flow, profile);
    const threshold = DEBUG ? 0 : params.threshold;
    const magnitude = Math.abs(value);

    // shimmer: keep a faint animation even below threshold
    const shimmer = anim.shimmer === true;
    const isShimmer = shimmer && magnitude < threshold && magnitude > 0;
    const visible = DEBUG || magnitude >= threshold || isShimmer;

    if (!visible) {
      this.setGroupOpacity(dom, 0);
      return;
    }

    const rawSpeed = DEBUG ? DEBUG_DUR_MS : sigmoidSpeedCurve(magnitude, params);
    const speedMultiplier = flow.speed_multiplier ?? 1;
    let durMs = Math.max(50, rawSpeed * speedMultiplier);
    if (isShimmer) durMs = durMs / SHIMMER_SPEED_FACTOR;

    // ANIM-1: smooth_speed — interpolate duration toward target
    const smoothSpeed = this.config?.animation?.smooth_speed !== false;
    durMs = resolveSmoothedDuration(flowId, durMs, smoothSpeed, performance.now(), this.durInterp);

    // Travel sign (+1 from→to, −1 to→from) — path geometry + motion
    const directionMode = anim.direction ?? 'auto';
    const intendedDirection = this.computeIntendedTravelSign(flow, value);

    // ANIM-1: direction change — 300ms decelerate + 300ms re-accelerate (600ms total)
    let direction = intendedDirection;
    let effectiveGroupOpacity = isShimmer ? SHIMMER_OPACITY : 1;
    const DIR_TOTAL_MS = 600;
    const DIR_HALF_MS = 300;
    if (smoothSpeed && directionMode === 'auto') {
      const prevDir = this.lastDirection.get(flowId);
      const changing = this.dirChanging.get(flowId);
      if (prevDir !== undefined && prevDir !== intendedDirection && !changing) {
        this.dirChanging.set(flowId, { startMs: performance.now(), oldDir: prevDir, newDir: intendedDirection });
      }
      const dirChange = this.dirChanging.get(flowId);
      if (dirChange) {
        const elapsed = performance.now() - dirChange.startMs;
        if (elapsed < DIR_TOTAL_MS) {
          if (elapsed < DIR_HALF_MS) {
            // decelerate: fade group opacity toward crossover
            effectiveGroupOpacity = (isShimmer ? SHIMMER_OPACITY : 1) * (1 - (elapsed / DIR_HALF_MS));
            direction = dirChange.oldDir;
          } else {
            // re-accelerate in new direction
            effectiveGroupOpacity =
              (isShimmer ? SHIMMER_OPACITY : 1) * ((elapsed - DIR_HALF_MS) / DIR_HALF_MS);
            direction = dirChange.newDir;
          }
          // Mid-crossing: shimmer keeps faint motion; otherwise stall particles briefly
          if (!shimmer && elapsed >= 280 && elapsed <= 320) {
            durMs = Math.max(durMs, 45_000);
          }
          if (shimmer && elapsed >= 270 && elapsed <= 330) {
            effectiveGroupOpacity = Math.max(effectiveGroupOpacity, SHIMMER_OPACITY);
          }
        } else {
          this.dirChanging.delete(flowId);
          direction = intendedDirection;
        }
      }
    }
    this.lastDirection.set(flowId, intendedDirection);

    const domain = flow.domain ?? this.config?.domain;
    const flowIndex = this.config?.flows.findIndex((f) => f.id === flowId) ?? -1;
    const baseColor = resolveFlowColor(
      flow,
      profile,
      domain,
      direction,
      this.config?.domain_colors,
      flowIndex >= 0 ? flowIndex : 0,
    );

    // GRADIENT-1: gradient color overrides base color per the mode setting
    const gradientColor = this.gradientColors.get(flowId);
    const gradMode = flow.value_gradient?.mode ?? 'flow';
    // particleColor is used by dot/arrow/trail styles; lineColor for the path line
    const particleColor = gradientColor && gradMode !== 'line' ? gradientColor : baseColor;
    const lineColor = gradientColor && gradMode !== 'flow' ? gradientColor : baseColor;
    // `color` is the legacy single-color variable used by most branches
    const color = particleColor;

    // Apply gradient line colour to the background outline stroke
    if (dom.outline) dom.outline.setAttribute('stroke', lineColor);

    this.setGroupOpacity(dom, effectiveGroupOpacity);

    this.syncFlowPathGeometry(flow, dom, direction);

    const burstMultiplier = this.updateBurstState(flowId, magnitude, params, profile);

    rlog('applyFlow:', flowId, 'style=', style, 'dur=', durMs, 'dir=', direction, 'color=', color);

    switch (style) {
      case 'dots':
        this.applyDots(dom, flow, profile, value, durMs, color, direction, burstMultiplier);
        break;
      case 'dash':
        this.applyDash(dom, flow, durMs, color, direction, burstMultiplier);
        break;
      case 'arrow':
        this.applyArrows(dom, flow, durMs, color, direction, burstMultiplier);
        break;
      case 'trail':
        this.applyTrail(dom, flow, durMs, color, direction, burstMultiplier);
        break;
      case 'fluid':
        this.applyFluid(dom, flow, durMs, color);
        break;
      case 'none':
        // static line — just ensure stroke is visible; no particles
        this.setGroupOpacity(dom, 1);
        break;
      default:
        this.applyDots(dom, flow, profile, value, durMs, color, direction, burstMultiplier);
    }

    if (
      isDebugEnabled() &&
      directionMode === 'both' &&
      (style === 'dots' || style === 'arrow' || style === 'trail')
    ) {
      // eslint-disable-next-line no-console -- debug-only dual-stream diagnostic (gated by config.debug)
      console.log(
        '[FlowMe] direction both:',
        flowId,
        'forward particles:',
        dom.particles.length,
        'reverse particles:',
        dom.particlesBack?.length ?? 0,
        'forward path:',
        dom.path.id,
        'reverse path:',
        dom.pathRev?.id ?? '(none)',
      );
    }
  }

  // ── burst state ───────────────────────────────────────────────────────────

  private updateBurstState(
    flowId: string,
    magnitude: number,
    params: ResolvedSpeedCurveParams,
    profile: FlowProfile,
  ): number {
    const peak = params.peak;
    const ratio = this.config?.defaults?.burst_trigger_ratio ?? BURST_TRIGGER_RATIO;
    const sustainMs = this.config?.defaults?.burst_sustain_ms ?? BURST_SUSTAIN_MS;
    const trigger = peak * ratio;
    if (magnitude < trigger) {
      this.burstActive.delete(flowId);
      this.burstEnteredAt.delete(flowId);
      return 1;
    }
    let enteredAt = this.burstEnteredAt.get(flowId);
    if (enteredAt === undefined) {
      enteredAt = performance.now();
      this.burstEnteredAt.set(flowId, enteredAt);
    }
    if (performance.now() - enteredAt < sustainMs) return 1;
    const multiplier = profile.burst_density_multiplier ?? 1.5;
    this.burstActive.add(flowId);
    return multiplier;
  }

  // ── helpers ───────────────────────────────────────────────────────────────

  private setGroupOpacity(dom: FlowDomNodes, opacity: number): void {
    const op = String(opacity);
    for (const p of dom.particles) p.shape.setAttribute('opacity', op);
    if (dom.particlesBack) for (const p of dom.particlesBack) p.shape.setAttribute('opacity', op);
    if (dom.fluidGradient) {
      dom.group.setAttribute('opacity', opacity <= 0 ? '0' : op);
      if (opacity <= 0) dom.lineStroke?.setAttribute('opacity', '0');
    } else {
      dom.group.removeAttribute('opacity');
      if (dom.lineStroke) dom.lineStroke.setAttribute('opacity', opacity > 0 ? '0.9' : '0');
    }
  }

  /** Remove all style-specific DOM elements, ready to switch style */
  private teardownStyle(dom: FlowDomNodes): void {
    dom.group.removeAttribute('opacity');
    for (const p of dom.particles) p.shape.remove();
    dom.particles = [];
    if (dom.particlesBack) {
      for (const p of dom.particlesBack) p.shape.remove();
      dom.particlesBack = undefined;
    }
    dom.lineStroke?.remove();
    dom.lineStroke = undefined;
    dom.fluidInitialised = undefined;
    dom.fluidGradient?.parentElement?.remove();
    dom.fluidGradient = undefined;
  }

  private sampleFrameTime(): void {
    const now = performance.now();
    if (this.lastFrameForAdaptive > 0) {
      const delta = now - this.lastFrameForAdaptive;
      this.frameTimeSamples.push(delta);
      if (this.frameTimeSamples.length > 60) this.frameTimeSamples.shift();
    }
    this.lastFrameForAdaptive = now;
  }

  private avgFrameMs(): number {
    if (this.frameTimeSamples.length === 0) return 16.67;
    return this.frameTimeSamples.reduce((a, b) => a + b, 0) / this.frameTimeSamples.length;
  }

  /** ANIM-2: at most once per second, tune adaptive particle counts for all eligible flows */
  private runAdaptivePassIfDue(now: number): void {
    if (!this.config || now - this.lastAdaptivePassAt < 1000) return;
    if (this.frameTimeSamples.length < 30) return;

    this.lastAdaptivePassAt = now;
    const targetFps = this.config.animation?.fps ?? 60;
    const budgetMs = 1000 / targetFps;
    const avgMs = this.avgFrameMs();
    const debug = isDebugEnabled();

    const over = avgMs > budgetMs * 1.2;
    const under = avgMs < budgetMs * 0.8;

    for (const flow of this.config.flows) {
      if (flow.animation?.particle_count !== undefined) continue;
      const style = this.animStyle(flow);
      if (style !== 'dots' && style !== 'trail') continue;

      const profile = this.profileFor(flow);
      const rawMag = Math.abs(this.latestValues.get(flow.id) ?? 0);
      const params = resolveSpeedCurveParams(flow, profile);
      const burstMultiplier = this.updateBurstState(flow.id, rawMag, params, profile);

      const base = Math.max(
        1,
        Math.round(profile.particle_count_curve ? profile.particle_count_curve(rawMag) : DEFAULT_PARTICLE_COUNT),
      );
      const burstMax = this.config.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
      const configured = Math.min(burstMax, Math.max(1, Math.round(base * burstMultiplier)));

      let current = this.adaptiveCount.get(flow.id) ?? configured;
      if (over && current > 1) {
        current -= 1;
        if (debug) {
          // eslint-disable-next-line no-console
          console.log('[FlowMe] adaptive count:', flow.id, current, 'avg frame:', avgMs);
        }
      } else if (under && current < configured) {
        current += 1;
        if (debug) {
          // eslint-disable-next-line no-console
          console.log('[FlowMe] adaptive count:', flow.id, current, 'avg frame:', avgMs);
        }
      }
      this.adaptiveCount.set(flow.id, Math.min(current, configured));
    }
  }

  /** Resolve effective particle count, respecting explicit override and burst */
  private resolveParticleCount(
    flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    burstMultiplier: number,
  ): number {
    const anim = flow.animation ?? {};

    // When particle_count is explicitly set, skip adaptive logic
    if (anim.particle_count !== undefined) return anim.particle_count;

    const style = this.animStyle(flow);
    const implicitDefault = Math.max(
      1,
      Math.round(profile.particle_count_curve ? profile.particle_count_curve(value) : DEFAULT_PARTICLE_COUNT),
    );

    const base = Math.max(1, implicitDefault);
    const burstMax = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    const configured = Math.min(burstMax, Math.max(1, Math.round(base * burstMultiplier)));

    if (style === 'dots' || style === 'trail') {
      return Math.min(this.adaptiveCount.get(flow.id) ?? configured, configured);
    }

    return configured;
  }

  private resolveParticleRadius(flow: FlowConfig): number {
    const base = this.config?.defaults?.dot_radius ?? DOT_RADIUS;
    return base * (flow.animation?.particle_size ?? 1.0);
  }

  private resolveGlow(flow: FlowConfig, profile: FlowProfile): boolean {
    const gi = flow.animation?.glow_intensity;
    if (gi === 0) return false;
    return profile.glow;
  }

  private glowFilter(flow: FlowConfig, profile: FlowProfile, color: string): string {
    if (!this.resolveGlow(flow, profile)) return '';
    const intensity = flow.animation?.glow_intensity ?? 1.0;
    const blur = (6 * intensity).toFixed(1);
    return `drop-shadow(0 0 ${blur}px ${color})`;
  }

  /** `animateMotion` rotate: teardrop/diamond stay screen-aligned (point up / 45°). */
  private particleMotionRotateAttr(kind: ParticleKind): '0' | 'auto' {
    return kind === 'teardrop' || kind === 'diamond' ? '0' : 'auto';
  }

  /** Tangent rotation (degrees) for JS-driven `transform`; teardrop/diamond → 0. */
  private particleTangentRotationDegrees(kind: ParticleKind, tangentDeg: number): number {
    return kind === 'teardrop' || kind === 'diamond' ? 0 : tangentDeg;
  }

  // ── SPACING-1: particle begin-offset computation ─────────────────────────

  /**
   * Compute `begin` offsets (in seconds, negative = pre-delay before cycle
   * start) for all particles given the configured spacing mode.
   *
   * Returns an array of `count` numbers, each representing the `begin`
   * attribute value for `animateMotion`.
   */
  private resolveParticleBegins(
    flowId: string,
    count: number,
    durMs: number,
    anim: NonNullable<FlowConfig['animation']>,
  ): number[] {
    const spacing = anim.particle_spacing ?? 'even';
    const durS = durMs / 1000;
    const evenInterval = durS / count;

    switch (spacing) {
      case 'even':
      default:
        return Array.from({ length: count }, (_, i) => -(evenInterval * i));

      case 'random': {
        const now = performance.now();
        const lastUpdate = this.randomOffsetsLastUpdate.get(flowId) ?? 0;
        const UPDATE_INTERVAL_MS = 3000;
        let offsets = this.randomOffsets.get(flowId);
        if (!offsets || offsets.length !== count || (now - lastUpdate) > UPDATE_INTERVAL_MS) {
          // Generate new random offsets with minimum gap of 10% of even interval
          const minGap = evenInterval * 0.1;
          const newOffsets: number[] = [];
          for (let i = 0; i < count; i++) {
            let candidate: number;
            let tries = 0;
            do {
              candidate = -(Math.random() * durS);
              tries++;
            } while (
              tries < 20 &&
              newOffsets.some((o) => {
                const diff = Math.abs(((candidate - o) % durS) + durS) % durS;
                return diff < minGap && diff > durS - minGap;
              })
            );
            newOffsets.push(candidate);
          }
          this.randomOffsets.set(flowId, newOffsets);
          this.randomOffsetsLastUpdate.set(flowId, now);
          offsets = newOffsets;
        }
        return offsets;
      }

      case 'clustered': {
        const clusterSize = Math.max(1, Math.round(anim.cluster_size ?? 3));
        const clusterGap = anim.cluster_gap ?? 3.0;
        const intraInterval = evenInterval * 0.3;
        const begins: number[] = [];
        let pos = 0;
        for (let i = 0; i < count; i++) {
          const posInCluster = i % clusterSize;
          if (i > 0 && posInCluster === 0) {
            // start of a new cluster — advance by the gap
            pos += intraInterval * clusterSize * clusterGap;
          }
          begins.push(-(pos % durS));
          pos += intraInterval;
        }
        return begins;
      }

      case 'pulse': {
        const pulsePeriodS = 1 / Math.max(0.01, anim.pulse_frequency ?? 1.5);
        const bunchedRatio = anim.pulse_ratio ?? 0.25;
        const now = (performance.now() / 1000) % pulsePeriodS;
        const isBunched = now < pulsePeriodS * bunchedRatio;
        if (isBunched) {
          // Compress all particles to first 10% of duration — tight bunch
          return Array.from({ length: count }, (_, i) => -(evenInterval * 0.1 * i));
        } else {
          // Spread: even spacing
          return Array.from({ length: count }, (_, i) => -(evenInterval * i));
        }
      }

      case 'wave_spacing': {
        const waveFreq = anim.wave_frequency ?? 2.0;
        const waveAmp = anim.wave_amplitude ?? 0.85;
        return Array.from({ length: count }, (_, i) => {
          const phase = (i / count) * Math.PI * 2 * waveFreq;
          const jitter = Math.sin(phase) * waveAmp * (durS / 2);
          return -(evenInterval * i + jitter);
        });
      }

      case 'wave_lateral':
        // Lateral movement is handled per-frame in updateLateralWave —
        // begin offsets remain evenly spaced so animateMotion handles timing
        return Array.from({ length: count }, (_, i) => -(evenInterval * i));
    }
  }

  /**
   * SPACING-1 wave_lateral: update perpendicular particle offsets each rAF frame.
   *
   * For each particle we:
   * 1. Compute its current progress along the path [0,1]
   * 2. Sample the SVG path at two nearby points to get the local tangent vector
   * 3. Derive the perpendicular (normal) vector: perp = (-dy, dx) normalised
   * 4. Apply sine-wave oscillation along the perpendicular direction:
   *      translate(perp.x * offset, perp.y * offset)
   *
   * This means:
   *   - Horizontal segments: particles oscillate vertically ✓
   *   - Vertical segments:   particles oscillate horizontally ✓
   *   - Diagonal segments:   particles oscillate perpendicular to angle ✓
   *   - Curved segments:     particles follow curvature perpendicular ✓
   */
  private updateLateralWaves(nowMs: number): void {
    if (!this.config) return;
    for (const flow of this.config.flows) {
      if ((flow.animation?.particle_spacing ?? 'even') !== 'wave_lateral') continue;
      const dom = this.flowNodes.get(flow.id);
      if (!dom || dom.particles.length === 0) continue;

      const waveFreq = flow.animation?.wave_frequency ?? 2.0;
      const waveAmp = flow.animation?.wave_amplitude ?? 20;
      const count = dom.particles.length;

      // Use wall-clock time for a continuously advancing phase — never resets.
      // Each particle is offset by 2π/count around the wave cycle so they
      // form a smooth snake pattern.
      const phasePerParticle = (Math.PI * 2) / count;
      // 0.002 → one full wave cycle per (500 / wave_frequency) ms
      const globalPhase = (nowMs * waveFreq * 0.002) % (Math.PI * 2);

      for (let i = 0; i < count; i++) {
        const p = dom.particles[i];
        if (!p) continue;

        // Continuous lateral offset — phase advances with wall-clock time
        const phase = globalPhase + i * phasePerParticle;
        const offsetPx = Math.sin(phase) * waveAmp;

        // Because animateMotion uses rotate="auto", the element's local coordinate
        // system is already aligned with the path tangent at its current position.
        // translate(0, offsetPx) therefore always moves the particle perpendicular
        // to the path — no manual tangent computation needed.
        //
        // For custom_svg particles we must preserve the existing scale/translate
        // base transform (stored as data-base-transform the first time).
        // For all other shapes there is no base transform.
        const isCustomSvg = p.shape.getAttribute('data-kind') === 'custom_svg';
        if (isCustomSvg) {
          if (!p.shape.hasAttribute('data-base-transform')) {
            p.shape.setAttribute('data-base-transform', p.shape.getAttribute('transform') ?? '');
          }
          const base = p.shape.getAttribute('data-base-transform') ?? '';
          p.shape.setAttribute('transform', `${base} translate(0,${offsetPx.toFixed(2)})`);
        } else {
          // Overwrite transform directly — no base transform for standard shapes
          p.shape.setAttribute('transform', `translate(0,${offsetPx.toFixed(2)})`);
        }
      }
    }
  }

  /**
   * wave_spacing / pulse: position particles directly via SVGPathElement.getPointAtLength()
   * every rAF frame. This avoids the SVG animateMotion begin= restart problem (calling
   * beginElement() every frame causes visible flashing/zipping).
   *
   * Particles are hidden from animateMotion by setting their animateMotion dur to
   * a very large value and using JS-driven absolute SVG coordinates instead.
   */
  private updateTimeBasedSpacing(nowMs: number): void {
    if (!this.config) return;
    for (const flow of this.config.flows) {
      const spacing = flow.animation?.particle_spacing ?? 'even';
      if (spacing !== 'wave_spacing' && spacing !== 'pulse') continue;
      const dom = this.flowNodes.get(flow.id);
      if (!dom || dom.particles.length === 0) continue;

      const count = dom.particles.length;
      const durMs = this.durInterp.currentDurMs.get(flow.id) ?? 2000;
      const durS = durMs / 1000;
      const anim = flow.animation ?? {};

      // Compute normalised [0,1] path positions for each particle
      const positions: number[] = [];

      if (spacing === 'wave_spacing') {
        // Travelling sine-wave density: all N particles span the full path
        // simultaneously with visibly varying gaps.
        const waveFreq = anim.wave_frequency ?? 2.0;
        const waveAmp = Math.min(anim.wave_amplitude ?? 0.85, 0.95); // clamp to avoid positions > 1
        // time advances at the same rate as the animation (one full path per durS)
        const time = (nowMs * 0.001) / durS;

        const rawPositions: number[] = [];
        for (let i = 0; i < count; i++) {
          const base = (i / count + time) % 1;
          const sine = Math.sin(base * Math.PI * 2 * waveFreq) * waveAmp * (1 / count);
          rawPositions.push(((base + sine) % 1 + 1) % 1);
        }
        rawPositions.sort((a, b) => a - b);
        positions.push(...rawPositions);
      } else {
        // pulse: heartbeat / pump stroke — abrupt compress then gradual expand
        const pulseFreq = anim.pulse_frequency ?? 1.5;
        const pulseRatio = anim.pulse_ratio ?? 0.25;
        const cyclePos = (nowMs * pulseFreq * 0.001) % 1;
        // leader position advances uniformly
        const leaderPos = (nowMs * 0.001 / durS) % 1;
        const evenInterval = 1 / count;
        let intervalScale: number;

        if (cyclePos < pulseRatio) {
          const bunchFactor = 1 - (cyclePos / pulseRatio);
          intervalScale = 1 - bunchFactor * 0.9; // compress toward 0
        } else {
          const spreadFactor = (cyclePos - pulseRatio) / (1 - pulseRatio);
          intervalScale = spreadFactor; // expand back to normal
        }
        for (let i = 0; i < count; i++) {
          positions.push(((leaderPos + i * evenInterval * intervalScale) % 1 + 1) % 1);
        }
      }

      // Apply positions: hide animateMotion, use JS-driven SVG translate instead
      const svgPath = dom.path as SVGPathElement | null;
      let totalLen = 0;
      try { totalLen = svgPath ? svgPath.getTotalLength() : 0; } catch { totalLen = 0; }

      for (let i = 0; i < count; i++) {
        const p = dom.particles[i];
        if (!p) continue;

        // Replace the running animateMotion with an inert placeholder so the
        // SMIL engine does not contribute any motion transform.  Simply changing
        // 'begin' on an already-running animation does not stop it in all
        // browsers; replacing the element is the only reliable way.
        if (!p.animateMotion.hasAttribute('data-js-driven')) {
          const inert = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
          inert.setAttribute('data-js-driven', '1');
          inert.setAttribute('begin', 'indefinite');
          inert.setAttribute('dur', '1s');
          p.animateMotion.replaceWith(inert);
          p.animateMotion = inert;
          p.shape.appendChild(inert);
        }

        const pos = positions[i] ?? 0;

        if (totalLen > 0 && svgPath) {
          try {
            const pt = svgPath.getPointAtLength(pos * totalLen);
            const pk = this.particleKind(p);
            const DELTA = Math.max(0.5, totalLen * 0.01);
            const ptA = svgPath.getPointAtLength(Math.max(0, pos * totalLen - DELTA));
            const ptB = svgPath.getPointAtLength(Math.min(totalLen, pos * totalLen + DELTA));
            const angle = Math.atan2(ptB.y - ptA.y, ptB.x - ptA.x) * (180 / Math.PI);
            const rot = this.particleTangentRotationDegrees(pk, angle);
            p.shape.setAttribute(
              'transform',
              rot === 0
                ? `translate(${pt.x.toFixed(2)},${pt.y.toFixed(2)})`
                : `translate(${pt.x.toFixed(2)},${pt.y.toFixed(2)}) rotate(${rot.toFixed(1)})`,
            );
          } catch {
            // getPointAtLength unavailable in this environment; skip frame
          }
        }
      }
    }
  }

  // ── animation style implementations ──────────────────────────────────────

  /**
   * dots — filled particles moving along path via animateMotion.
   * Supports: circle, square, arrow, teardrop, diamond shapes.
   * Supports: direction, flicker, glow, burst, shimmer.
   */
  private applyDots(
    dom: FlowDomNodes,
    flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    durMs: number,
    color: string,
    direction: number,
    burstMultiplier: number,
  ): void {
    const dirMode = flow.animation?.direction ?? 'auto';
    const desired = this.resolveParticleCount(flow, profile, value, burstMultiplier);
    const shape = flow.animation?.particle_shape ?? 'circle';
    const flicker = flow.animation?.flicker === true;

    // rebuild if count or shape changed
    if (dom.particles.length !== desired || (dom.particles[0] && this.particleKind(dom.particles[0]) !== shape)) {
      for (const p of dom.particles) p.shape.remove();
      dom.particles = [];
      for (let i = 0; i < desired; i++) {
        dom.particles.push(this.makeParticle(dom, shape, color, flow, profile));
      }
    }

    if (dirMode === 'both') {
      if (!dom.particlesBack || dom.particlesBack.length !== desired) {
        if (dom.particlesBack) for (const p of dom.particlesBack) p.shape.remove();
        dom.particlesBack = [];
        for (let i = 0; i < desired; i++) {
          dom.particlesBack.push(this.makeParticle(dom, shape, color, flow, profile));
        }
      }
    } else if (dom.particlesBack) {
      for (const p of dom.particlesBack) p.shape.remove();
      dom.particlesBack = undefined;
    }

    const durStr = `${(durMs / 1000).toFixed(3)}s`;
    const durS = durMs / 1000;
    const backBeginPhase = dirMode === 'both' ? durS / 2 : 0;
    const animCfg = flow.animation ?? {};
    const begins = this.resolveParticleBegins(flow.id, desired, durMs, animCfg);

    const installMotion = (particles: ParticleDom[], particleDir: number, beginPhase: number) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        this.updateParticleColor(p, color, flow, profile, flicker);

        const fresh = document.createElementNS(SVG_NS, 'animateMotion');
        fresh.setAttribute('repeatCount', 'indefinite');
        fresh.setAttribute('dur', durStr);
        fresh.setAttribute('rotate', this.particleMotionRotateAttr(shape));
        fresh.setAttribute('begin', `${((begins[i] ?? 0) + beginPhase).toFixed(3)}s`);
        const mpath = document.createElementNS(SVG_NS, 'mpath');
        const href = this.motionPathRef(dom, flow, particleDir);
        mpath.setAttributeNS(XLINK_NS, 'href', `#${href}`);
        mpath.setAttribute('href', `#${href}`);
        fresh.appendChild(mpath);
        p.animateMotion.replaceWith(fresh);
        p.animateMotion = fresh;
        p.shape.appendChild(fresh);
      }
    };

    installMotion(dom.particles, direction, 0);
    if (dom.particlesBack) installMotion(dom.particlesBack, -direction, backBeginPhase);
  }

  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  private applyDash(
    dom: FlowDomNodes,
    flow: FlowConfig,
    durMs: number,
    color: string,
    direction: number,
    burstMultiplier: number,
  ): void {
    for (const p of dom.particles) p.shape.remove();
    dom.particles = [];

    if (!dom.lineStroke) {
      const stroke = document.createElementNS(SVG_NS, 'use');
      stroke.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      stroke.setAttribute('href', `#${dom.pathId}`);
      stroke.setAttribute('fill', 'none');
      stroke.setAttribute('stroke-linecap', 'round');
      stroke.setAttribute('stroke-linejoin', 'round');
      dom.group.appendChild(stroke);
      dom.lineStroke = stroke;
    }

    const strokeWidth = this.config?.defaults?.line_width ?? STROKE_WIDTH;
    const anim = flow.animation ?? {};
    const baseGap = anim.dash_gap ?? 0.5;
    // burst: reduce gap ratio (denser dashes)
    const gap = Math.max(0.1, baseGap / burstMultiplier);
    const dashLen = 14;
    const gapLen = dashLen * gap;
    const glow = this.glowFilter(flow, this.profileFor(flow), color);

    dom.lineStroke.setAttribute('stroke', color);
    dom.lineStroke.setAttribute('stroke-width', String(strokeWidth * 2));
    dom.lineStroke.setAttribute('stroke-dasharray', `${dashLen} ${gapLen}`);
    if (glow) dom.lineStroke.setAttribute('filter', glow);

    const patternLength = dashLen + gapLen;
    const existing = dom.lineStroke.querySelector('animate');
    if (existing) existing.remove();
    const anim0 = document.createElementNS(SVG_NS, 'animate');
    anim0.setAttribute('attributeName', 'stroke-dashoffset');
    anim0.setAttribute('from', direction > 0 ? '0' : `-${patternLength}`);
    anim0.setAttribute('to', direction > 0 ? `-${patternLength}` : '0');
    anim0.setAttribute('dur', `${(durMs / 1000).toFixed(3)}s`);
    anim0.setAttribute('repeatCount', 'indefinite');
    dom.lineStroke.appendChild(anim0);
  }

  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  private applyArrows(
    dom: FlowDomNodes,
    flow: FlowConfig,
    durMs: number,
    color: string,
    direction: number,
    burstMultiplier: number,
  ): void {
    // Reuse dots implementation but force 'arrow' shape
    const profile = this.profileFor(flow);
    const baseCount = flow.animation?.particle_count ?? DEFAULT_PARTICLE_COUNT;
    const burstMax = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    const desired = Math.min(burstMax, Math.max(1, Math.round(baseCount * burstMultiplier)));
    const flicker = flow.animation?.flicker === true;
    const dirMode = flow.animation?.direction ?? 'auto';

    if (dom.particles.length !== desired) {
      for (const p of dom.particles) p.shape.remove();
      dom.particles = [];
      for (let i = 0; i < desired; i++) {
        dom.particles.push(this.makeParticle(dom, 'arrow', color, flow, profile));
      }
    }

    if (dirMode === 'both') {
      if (!dom.particlesBack || dom.particlesBack.length !== desired) {
        if (dom.particlesBack) for (const p of dom.particlesBack) p.shape.remove();
        dom.particlesBack = [];
        for (let i = 0; i < desired; i++) {
          dom.particlesBack.push(this.makeParticle(dom, 'arrow', color, flow, profile));
        }
      }
    } else if (dom.particlesBack) {
      for (const p of dom.particlesBack) p.shape.remove();
      dom.particlesBack = undefined;
    }

    const durStr = `${(durMs / 1000).toFixed(3)}s`;
    const durS = durMs / 1000;
    const backBeginPhase = dirMode === 'both' ? durS / 2 : 0;
    const arrowBegins = this.resolveParticleBegins(flow.id, desired, durMs, flow.animation ?? {});

    const installMotion = (particles: ParticleDom[], particleDir: number, beginPhase: number) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        this.updateParticleColor(p, color, flow, profile, flicker);
        const fresh = document.createElementNS(SVG_NS, 'animateMotion');
        fresh.setAttribute('repeatCount', 'indefinite');
        fresh.setAttribute('dur', durStr);
        fresh.setAttribute('rotate', this.particleMotionRotateAttr('arrow'));
        fresh.setAttribute('begin', `${((arrowBegins[i] ?? 0) + beginPhase).toFixed(3)}s`);
        const mpath = document.createElementNS(SVG_NS, 'mpath');
        const href = this.motionPathRef(dom, flow, particleDir);
        mpath.setAttributeNS(XLINK_NS, 'href', `#${href}`);
        mpath.setAttribute('href', `#${href}`);
        fresh.appendChild(mpath);
        p.animateMotion.replaceWith(fresh);
        p.animateMotion = fresh;
        p.shape.appendChild(fresh);
      }
    };

    installMotion(dom.particles, direction, 0);
    if (dom.particlesBack) installMotion(dom.particlesBack, -direction, backBeginPhase);
  }

  /**
   * trail — head uses particle_shape; four tail segments follow along path with staggered begins.
   */
  private applyTrail(
    dom: FlowDomNodes,
    flow: FlowConfig,
    durMs: number,
    color: string,
    direction: number,
    burstMultiplier: number,
  ): void {
    const profile = this.profileFor(flow);
    const baseCount = flow.animation?.particle_count ?? DEFAULT_PARTICLE_COUNT;
    const burstMax = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    const desired = Math.min(burstMax, Math.max(1, Math.round(baseCount * burstMultiplier)));
    const flicker = flow.animation?.flicker === true;
    const kind = flow.animation?.particle_shape ?? 'circle';
    const trailRot = this.particleMotionRotateAttr(kind);
    const dirMode = flow.animation?.direction ?? 'auto';
    const both = dirMode === 'both';

    const firstOk =
      dom.particles.length === desired &&
      dom.particles[0]?.shape.hasAttribute('data-trail-pack') &&
      dom.particles[0]?.shape.getAttribute('data-head-kind') === kind &&
      (!both ||
        (dom.particlesBack?.length === desired &&
          dom.particlesBack[0]?.shape.hasAttribute('data-trail-pack') &&
          dom.particlesBack[0]?.shape.getAttribute('data-head-kind') === kind));

    if (!firstOk) {
      for (const p of dom.particles) p.shape.remove();
      dom.particles = [];
      if (dom.particlesBack) {
        for (const p of dom.particlesBack) p.shape.remove();
        dom.particlesBack = undefined;
      }
      for (let i = 0; i < desired; i++) {
        dom.particles.push(this.makeTrailParticle(dom, flow, profile, color, kind));
      }
      if (both) {
        dom.particlesBack = [];
        for (let i = 0; i < desired; i++) {
          dom.particlesBack.push(this.makeTrailParticle(dom, flow, profile, color, kind));
        }
      }
    } else if (!both && dom.particlesBack) {
      for (const p of dom.particlesBack) p.shape.remove();
      dom.particlesBack = undefined;
    }

    const durStr = `${(durMs / 1000).toFixed(3)}s`;
    const durS = durMs / 1000;
    const backBeginPhase = both ? durS / 2 : 0;
    const trailBegins = this.resolveParticleBegins(flow.id, desired, durMs, flow.animation ?? {});
    let plen = 100;
    try {
      plen = Math.max(1, dom.path.getTotalLength());
    } catch {
      plen = 100;
    }

    const installMotion = (
      mo: SVGAnimateMotionElement,
      beginS: number,
      particleDir: number,
    ): SVGAnimateMotionElement => {
      const fresh = document.createElementNS(SVG_NS, 'animateMotion');
      fresh.setAttribute('repeatCount', 'indefinite');
      fresh.setAttribute('dur', durStr);
      fresh.setAttribute('rotate', trailRot);
      fresh.setAttribute('begin', `${beginS.toFixed(4)}s`);
      const mpath = document.createElementNS(SVG_NS, 'mpath');
      const href = this.motionPathRef(dom, flow, particleDir);
      mpath.setAttributeNS(XLINK_NS, 'href', `#${href}`);
      mpath.setAttribute('href', `#${href}`);
      fresh.appendChild(mpath);
      mo.replaceWith(fresh);
      return fresh;
    };

    const applyPack = (p: ParticleDom, headBegin: number, particleDir: number): void => {
      this.updateParticleColor(p, color, flow, profile, flicker);
      const tails = p.trailMotions;
      if (tails && tails.length === 4) {
        for (let k = 0; k < 4; k++) {
          const dist = TRAIL_TAIL_DIST_PX[k]!;
          const tb = headBegin + (dist / plen) * durS;
          tails[k] = installMotion(tails[k]!, tb, particleDir);
        }
      }
      p.animateMotion = installMotion(p.animateMotion, headBegin, particleDir);
    };

    for (let i = 0; i < dom.particles.length; i++) {
      const p = dom.particles[i]!;
      applyPack(p, trailBegins[i] ?? 0, direction);
    }
    if (dom.particlesBack) {
      for (let i = 0; i < dom.particlesBack.length; i++) {
        const p = dom.particlesBack[i]!;
        applyPack(p, (trailBegins[i] ?? 0) + backBeginPhase, -direction);
      }
    }
  }

  /**
   * fluid — animated linear gradient along full path (v1.23.1).
   */
  private applyFluid(dom: FlowDomNodes, flow: FlowConfig, durMs: number, color: string): void {
    for (const p of dom.particles) p.shape.remove();
    dom.particles = [];

    if (!this.svg) return;
    const defs = this.svg.querySelector('defs');
    if (!defs) return;

    const nodesById = new Map(this.config!.nodes.map((n) => [n.id, n]));
    const from = nodesById.get(flow.from_node);
    const to = nodesById.get(flow.to_node);
    if (!from || !to) return;

    if (!dom.lineStroke) {
      const stroke = document.createElementNS(SVG_NS, 'use');
      stroke.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      stroke.setAttribute('href', `#${dom.pathId}`);
      stroke.setAttribute('fill', 'none');
      stroke.setAttribute('stroke-linecap', 'round');
      stroke.setAttribute('stroke-linejoin', 'round');
      dom.group.appendChild(stroke);
      dom.lineStroke = stroke;
    }

    const safeFlow = flow.id.replace(/[^a-zA-Z0-9_-]/g, '_');
    const gradId = `fluid-grad-${safeFlow}`;
    let grad = this.svg.getElementById(gradId) as SVGLinearGradientElement | null;
    if (!grad) {
      grad = document.createElementNS(SVG_NS, 'linearGradient');
      grad.setAttribute('id', gradId);
      defs.appendChild(grad);
    }
    dom.fluidGradient = grad;

    const pathEl = dom.path;
    let L = 100;
    try {
      L = Math.max(1, pathEl.getTotalLength());
    } catch {
      L = 100;
    }
    let pStart = { x: 0, y: 0 };
    let pEnd = { x: 0, y: 0 };
    try {
      const a = pathEl.getPointAtLength(0);
      const b = pathEl.getPointAtLength(L);
      pStart = { x: a.x, y: a.y };
      pEnd = { x: b.x, y: b.y };
    } catch {
      const sz = this.containerSize();
      pStart = percentToPixel(from.position, sz);
      pEnd = percentToPixel(to.position, sz);
    }
    const dx = pEnd.x - pStart.x;
    const dy = pEnd.y - pStart.y;
    const chord = Math.hypot(dx, dy) || 1;
    const ux = dx / chord;
    const uy = dy / chord;

    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    grad.setAttribute('x1', String(pStart.x));
    grad.setAttribute('y1', String(pStart.y));
    grad.setAttribute('x2', String(pStart.x + ux * 2 * L));
    grad.setAttribute('y2', String(pStart.y + uy * 2 * L));

    while (grad.firstChild) grad.firstChild.remove();

    const stops: Array<[string, string]> = [
      ['0%', '0'],
      ['12%', '0.3'],
      ['25%', '1'],
      ['37%', '0.3'],
      ['50%', '0'],
      ['62%', '0.3'],
      ['75%', '1'],
      ['87%', '0.3'],
      ['100%', '0'],
    ];
    for (const [off, op] of stops) {
      const s = document.createElementNS(SVG_NS, 'stop');
      s.setAttribute('offset', off);
      s.setAttribute('stop-color', color);
      s.setAttribute('stop-opacity', op);
      grad.appendChild(s);
    }

    const anim = document.createElementNS(SVG_NS, 'animateTransform');
    anim.setAttribute('attributeName', 'gradientTransform');
    anim.setAttribute('type', 'translate');
    anim.setAttribute('additive', 'replace');
    anim.setAttribute('calcMode', 'linear');
    anim.setAttribute('dur', `${Math.max(1, Math.round(durMs))}ms`);
    anim.setAttribute('repeatCount', 'indefinite');
    const tx = ux * L;
    const ty = uy * L;
    /** Slide pattern along path tangent (path `d` already matches travel direction after sync). */
    anim.setAttribute('from', `${-tx} ${-ty}`);
    anim.setAttribute('to', `0 0`);
    grad.appendChild(anim);

    const strokeWidth = (this.config?.defaults?.line_width ?? STROKE_WIDTH) * 3;
    const glowFilter = this.glowFilter(flow, this.profileFor(flow), color);

    dom.lineStroke.setAttribute('stroke', `url(#${gradId})`);
    dom.lineStroke.setAttribute('stroke-width', String(strokeWidth));
    dom.lineStroke.removeAttribute('stroke-dasharray');
    if (glowFilter) dom.lineStroke.setAttribute('filter', glowFilter);

    // Fluid-only one-shot stroke fade-in (dots/dash/arrow/trail/none skip this block)
    if (!dom.fluidInitialised) {
      dom.fluidInitialised = true;
      dom.lineStroke.setAttribute('opacity', '0');
      const opIn = document.createElementNS(SVG_NS, 'animate');
      opIn.setAttribute('attributeName', 'opacity');
      opIn.setAttribute('values', '0;1');
      opIn.setAttribute('dur', '600ms');
      opIn.setAttribute('fill', 'freeze');
      dom.lineStroke.appendChild(opIn);
    }
  }

  private makeTrailParticle(
    dom: FlowDomNodes,
    flow: FlowConfig,
    profile: FlowProfile,
    color: string,
    kind: ParticleKind,
  ): ParticleDom {
    const r = this.resolveParticleRadius(flow);
    const glow = this.resolveGlow(flow, profile);
    const tailKind: ParticleKind = kind === 'custom_svg' ? 'circle' : kind;

    const pack = document.createElementNS(SVG_NS, 'g');
    pack.setAttribute('data-trail-pack', '1');
    pack.setAttribute('data-head-kind', kind);

    const tailMotions: SVGAnimateMotionElement[] = [];
    const tailGroups: SVGGElement[] = [];
    const trailRot = this.particleMotionRotateAttr(kind);

    for (let k = 0; k < 4; k++) {
      const sg = document.createElementNS(SVG_NS, 'g');
      const { shape: geom } = this.buildParticleShapeOnly(dom, tailKind, r * TRAIL_TAIL_SCALE[k]!, color, flow);
      if (glow) geom.setAttribute('filter', this.glowFilter(flow, profile, color));
      geom.setAttribute('opacity', String(TRAIL_TAIL_OPACITY[k]));
      sg.appendChild(geom);
      const motion = document.createElementNS(SVG_NS, 'animateMotion');
      motion.setAttribute('repeatCount', 'indefinite');
      motion.setAttribute('dur', '2s');
      motion.setAttribute('rotate', trailRot);
      const mpath = document.createElementNS(SVG_NS, 'mpath');
      mpath.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      mpath.setAttribute('href', `#${dom.pathId}`);
      motion.appendChild(mpath);
      sg.appendChild(motion);
      tailGroups.push(sg);
      tailMotions.push(motion);
    }
    for (let k = 3; k >= 0; k--) pack.appendChild(tailGroups[k]!);

    const hg = document.createElementNS(SVG_NS, 'g');
    let headGeom: SVGGraphicsElement;
    if (kind === 'custom_svg') {
      const o = this.buildParticleShapeOnly(dom, kind, r, color, flow, hg);
      headGeom = o.shape;
    } else {
      const o = this.buildParticleShapeOnly(dom, kind, r, color, flow);
      headGeom = o.shape;
      hg.appendChild(headGeom);
    }
    if (glow) headGeom.setAttribute('filter', this.glowFilter(flow, profile, color));
    const headMotion = document.createElementNS(SVG_NS, 'animateMotion');
    headMotion.setAttribute('repeatCount', 'indefinite');
    headMotion.setAttribute('dur', '2s');
    headMotion.setAttribute('rotate', trailRot);
    const hmp = document.createElementNS(SVG_NS, 'mpath');
    hmp.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
    hmp.setAttribute('href', `#${dom.pathId}`);
    headMotion.appendChild(hmp);
    hg.appendChild(headMotion);
    pack.appendChild(hg);

    dom.group.appendChild(pack);

    return { shape: pack, animateMotion: headMotion, trailMotions: tailMotions };
  }

  // ── particle shape factories ──────────────────────────────────────────────

  private particleKind(p: ParticleDom): ParticleKind {
    const tag = p.shape.tagName.toLowerCase();
    if (tag === 'g' && p.shape.hasAttribute('data-trail-pack')) {
      return (p.shape.getAttribute('data-head-kind') as ParticleKind) ?? 'circle';
    }
    if (tag === 'circle') return 'circle';
    if (tag === 'rect') return 'square';
    if (tag === 'polygon') {
      // diamond vs arrow — encoded in a data attribute
      return (p.shape.getAttribute('data-kind') as ParticleKind | null) ?? 'arrow';
    }
    if (tag === 'ellipse') return 'teardrop';
    if (tag === 'path') {
      const dk = p.shape.getAttribute('data-kind') as ParticleKind | null;
      return dk ?? 'custom_svg';
    }
    return 'circle';
  }

  /**
   * Geometry only — used by dots/arrow and trail head/tail segments.
   */
  private buildParticleShapeOnly(
    dom: FlowDomNodes,
    kind: ParticleKind,
    r: number,
    color: string,
    flow: FlowConfig,
    /** When set, custom_svg path is appended here instead of dom.group (trail head). */
    customSvgMount?: SVGGElement,
  ): { shape: SVGGraphicsElement; alreadyAppended: boolean } {
    let shape: SVGGraphicsElement;
    let alreadyAppended = false;

    switch (kind) {
      case 'square': {
        const side = r * 2;
        const rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('width', String(side));
        rect.setAttribute('height', String(side));
        rect.setAttribute('x', String(-side / 2));
        rect.setAttribute('y', String(-side / 2));
        rect.setAttribute('rx', '1.5');
        rect.setAttribute('fill', color);
        rect.setAttribute('opacity', '0');
        shape = rect;
        break;
      }
      case 'arrow': {
        const dotR = this.config?.defaults?.dot_radius ?? DOT_RADIUS;
        const ps = flow.animation?.particle_size ?? 1;
        const chevUnit = (dotR * ps) / 10;
        const pathEl = document.createElementNS(SVG_NS, 'path');
        pathEl.setAttribute('d', chevronArrowPath(chevUnit));
        pathEl.setAttribute('fill', color);
        pathEl.setAttribute('opacity', '0');
        pathEl.setAttribute('data-kind', 'arrow');
        shape = pathEl;
        break;
      }
      case 'teardrop': {
        const pathEl = document.createElementNS(SVG_NS, 'path');
        pathEl.setAttribute('d', teardropShapePath(r));
        pathEl.setAttribute('fill', color);
        pathEl.setAttribute('opacity', '0');
        pathEl.setAttribute('data-kind', 'teardrop');
        shape = pathEl;
        break;
      }
      case 'diamond': {
        const d = r * 1.4;
        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', `0,${-d} ${d},0 0,${d} ${-d},0`);
        poly.setAttribute('fill', color);
        poly.setAttribute('opacity', '0');
        poly.setAttribute('data-kind', 'diamond');
        shape = poly;
        break;
      }
      case 'custom_svg': {
        const pathD = flow.animation?.custom_svg_path ?? '';
        if (!pathD) {
          console.warn(`[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${flow.id}`);
          const circle = document.createElementNS(SVG_NS, 'circle');
          circle.setAttribute('r', String(r));
          circle.setAttribute('fill', color);
          circle.setAttribute('opacity', '0');
          shape = circle;
          break;
        }
        const pathEl = document.createElementNS(SVG_NS, 'path');
        pathEl.setAttribute('d', pathD);
        pathEl.setAttribute('fill', color);
        pathEl.setAttribute('opacity', '0');
        pathEl.setAttribute('data-kind', 'custom_svg');
        const mount = customSvgMount ?? dom.group;
        mount.appendChild(pathEl);
        alreadyAppended = true;
        try {
          const bbox = (pathEl as SVGGraphicsElement).getBBox();
          const maxDim = Math.max(bbox.width, bbox.height, 1);
          const targetSize = r * 2;
          const scale = targetSize / maxDim;
          const tx = -(bbox.x + bbox.width / 2);
          const ty = -(bbox.y + bbox.height / 2);
          pathEl.setAttribute('transform', `scale(${scale.toFixed(4)}) translate(${tx.toFixed(4)},${ty.toFixed(4)})`);
        } catch {
          /* getBBox unavailable */
        }
        shape = pathEl as unknown as SVGGraphicsElement;
        break;
      }
      default: {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', String(r));
        circle.setAttribute('fill', color);
        circle.setAttribute('opacity', '0');
        shape = circle;
      }
    }
    return { shape, alreadyAppended };
  }

  private makeParticle(
    dom: FlowDomNodes,
    kind: ParticleKind,
    color: string,
    flow: FlowConfig,
    profile: FlowProfile,
  ): ParticleDom {
    const r = this.resolveParticleRadius(flow);
    const glow = this.resolveGlow(flow, profile);
    const { shape, alreadyAppended } = this.buildParticleShapeOnly(dom, kind, r, color, flow);

    if (glow) {
      shape.setAttribute('filter', this.glowFilter(flow, profile, color));
      (shape as unknown as HTMLElement).style.color = color;
    }

    const animateMotion = document.createElementNS(SVG_NS, 'animateMotion');
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('dur', '2s');
    animateMotion.setAttribute('rotate', this.particleMotionRotateAttr(kind));
    const mpath = document.createElementNS(SVG_NS, 'mpath');
    mpath.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
    mpath.setAttribute('href', `#${dom.pathId}`);
    animateMotion.appendChild(mpath);
    shape.appendChild(animateMotion);
    if (!alreadyAppended) dom.group.appendChild(shape);
    return { shape, animateMotion };
  }

  private updateParticleColor(
    p: ParticleDom,
    color: string,
    flow: FlowConfig,
    profile: FlowProfile,
    flicker: boolean,
  ): void {
    if (p.shape.hasAttribute('data-trail-pack')) {
      p.shape.querySelectorAll('path, circle, rect, ellipse, polygon').forEach((el) => {
        el.setAttribute('fill', color);
      });
    } else {
      p.shape.setAttribute('fill', color);
    }
    (p.shape as unknown as HTMLElement).style.color = color;
    const glow = this.resolveGlow(flow, profile);
    if (glow) {
      p.shape.setAttribute('filter', this.glowFilter(flow, profile, color));
    }

    const baseOp = '1';
    if (!p.shape.hasAttribute('data-trail-pack')) {
      p.shape.setAttribute('opacity', baseOp);
    }

    if (flicker && !p.shape.hasAttribute('data-trail-pack')) {
      // Add/update a <animate> on opacity for flicker effect
      if (!p.flickerAnim) {
        const fa = document.createElementNS(SVG_NS, 'animate');
        fa.setAttribute('attributeName', 'opacity');
        fa.setAttribute('repeatCount', 'indefinite');
        p.shape.appendChild(fa);
        p.flickerAnim = fa;
      }
      // Randomise per particle: freq 2–8 Hz → dur 0.125–0.5s
      const freq = 2 + Math.random() * 6;
      const dur = (1 / freq).toFixed(3);
      const lo = (0.85 + Math.random() * 0.1).toFixed(2);
      const hi = (0.95 + Math.random() * 0.05).toFixed(2);
      p.flickerAnim.setAttribute('values', `${hi};${lo};${hi}`);
      p.flickerAnim.setAttribute('dur', `${dur}s`);
    } else if (p.flickerAnim) {
      p.flickerAnim.remove();
      p.flickerAnim = undefined;
    }
  }

  private profileFor(flow: FlowConfig): FlowProfile {
    return getProfile(flow.domain ?? this.config?.domain);
  }

  private primaryColor(flow: FlowConfig): string {
    const profile = this.profileFor(flow);
    const domain = flow.domain ?? this.config?.domain;
    const flowIndex = this.config?.flows.findIndex((f) => f.id === flow.id) ?? -1;
    return resolveFlowColor(flow, profile, domain, 1, this.config?.domain_colors, flowIndex >= 0 ? flowIndex : 0);
  }
}
