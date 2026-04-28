import type {
  FlowAnimationConfig,
  FlowConfig,
  FlowmeConfig,
  FlowProfile,
} from '../types.js';
import { getProfile, resolveFlowColor } from '../flow-profiles/index.js';
import {
  debounce,
  percentToPixel,
  polylineToSvgPathStyled,
  pointAtProgress,
  pathLengthPercent,
  resolveSpeedCurveParams,
  sigmoidSpeedCurve,
  type ResolvedSpeedCurveParams,
} from '../utils.js';
import type { FlowRenderer } from './types.js';
import { dlog } from '../debug-log.js';

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
const PULSE_MAX_RADIUS = 14;

const BURST_TRIGGER_RATIO = 0.9;
const BURST_SUSTAIN_MS = 5000;
const BURST_MAX_PARTICLES = 20;

/** Shimmer: speed factor and opacity when at/near threshold */
const SHIMMER_SPEED_FACTOR = 0.2;
const SHIMMER_OPACITY = 0.3;

type AnimStyle = NonNullable<FlowAnimationConfig['animation_style']>;
type ParticleKind = NonNullable<FlowAnimationConfig['particle_shape']>;

interface ParticleDom {
  shape: SVGGraphicsElement;
  animateMotion: SVGAnimateMotionElement;
  /** Flicker animation element (added when flicker:true) */
  flickerAnim?: SVGAnimateElement;
}

interface FlowDomNodes {
  group: SVGGElement;
  path: SVGPathElement;
  pathId: string;
  /** The faint background outline <use> element (used for gradient line colour). */
  outline?: SVGUseElement;
  /** Active animation style currently rendered */
  style: AnimStyle;
  particles: ParticleDom[];
  /** dash/fluid: the stroke-animated <use> element */
  lineStroke?: SVGUseElement;
  /** pulse: stationary expanding circles */
  pulseCircles?: Array<{
    circle: SVGCircleElement;
    animateRadius: SVGAnimateElement;
    animateOpacity: SVGAnimateElement;
  }>;
  /** fluid: linear gradient element */
  fluidGradient?: SVGLinearGradientElement;
  /** "both" direction uses a second set of particles going the other way */
  particlesBack?: ParticleDom[];
}

/**
 * SVG-based flow renderer (v1.0.12+).
 *
 * Supports animation_style: dots | dash | pulse | arrow | trail | fluid | spark | none
 * Supports particle_shape: circle | square | arrow | teardrop | diamond
 * Supports direction: auto | forward | reverse | both
 * Supports shimmer, flicker, glow_intensity, particle_size, particle_count,
 *          pulse_width, trail_length, dash_gap
 * Supports global animation.fps cap and smooth_speed interpolation (ANIM-2)
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

  // ANIM-2: smooth_speed — per-flow speed state
  private currentDurMs = new Map<string, number>();
  private targetDurMs = new Map<string, number>();
  private speedTransitionStart = new Map<string, number>();
  // Direction change: track last direction; on sign flip decelerate→0→new direction
  private lastDirection = new Map<string, number>(); // +1 or -1
  private dirChanging = new Map<string, { startMs: number; oldDir: number; newDir: number }>();
  private rafHandle: number | null = null;
  private lastFrameTime = 0;
  // Adaptive particle count per flow (P3-4)
  private adaptiveCount = new Map<string, number>();
  private lastAdaptiveChange = new Map<string, number>();
  // Animation resume (P3-4): track last particle offsets
  private particleOffsets = new Map<string, number[]>();
  // GRADIENT-1: per-flow gradient colour (resolved by FlowmeCard from hass state)
  private gradientColors = new Map<string, string>();
  // SPACING-1: random spacing — per-particle offsets refreshed slowly
  private randomOffsets = new Map<string, number[]>();
  private randomOffsetsLastUpdate = new Map<string, number>();
  // SPACING-1: wave_lateral — per-flow JS-driven position state
  private lateralPhase = new Map<string, number>();

  async init(container: HTMLElement, config: FlowmeConfig): Promise<void> {
    rlog('init:', container.getBoundingClientRect(), 'flows:', config.flows.length);
    this.container = container;
    this.config = config;
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
    const targetFps = this.config?.animation?.fps ?? 60;
    const frameInterval = 1000 / targetFps;

    const loop = (now: number) => {
      if (!this.svg) return; // destroyed
      const delta = now - this.lastFrameTime;
      this.sampleFrameTime();
      if (delta >= frameInterval) {
        this.lastFrameTime = now - (delta % frameInterval);
        // Smooth speed/direction transitions need periodic flush
        const smoothSpeed = this.config?.animation?.smooth_speed !== false;
        if (smoothSpeed && (this.speedTransitionStart.size > 0 || this.dirChanging.size > 0)) {
          this.flushUpdates();
        }
        // wave_lateral: update perpendicular offsets every frame
        this.updateLateralWaves(now);
        // wave_spacing / pulse: recompute begin= offsets from elapsed time
        this.updateTimeBasedSpacing(now);
      }
      this.rafHandle = requestAnimationFrame(loop);
    };

    // Always run the rAF loop for smooth_speed and direction change transitions
    this.lastFrameTime = performance.now();
    this.rafHandle = requestAnimationFrame(loop);
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
    this.currentDurMs.clear();
    this.targetDurMs.clear();
    this.speedTransitionStart.clear();
    this.lastDirection.clear();
    this.dirChanging.clear();
    this.adaptiveCount.clear();
    this.lastAdaptiveChange.clear();
    this.particleOffsets.clear();
    this.gradientColors.clear();
    this.randomOffsets.clear();
    this.randomOffsetsLastUpdate.clear();
    this.lateralPhase.clear();
  }

  // ── internal ──────────────────────────────────────────────────────────────

  private containerSize(): { width: number; height: number } {
    if (!this.container) return { width: 0, height: 0 };
    const rect = this.container.getBoundingClientRect();
    return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
  }

  private animStyle(flow: FlowConfig): AnimStyle {
    return flow.animation?.animation_style ?? 'dots';
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
      group.setAttribute('data-flow-id', flow.id);
      if (flow.opacity !== undefined) group.setAttribute('opacity', String(flow.opacity));
      if (flow.visible === false) group.style.display = 'none';

      const strokeWidth = this.config?.defaults?.line_width ?? STROKE_WIDTH;
      const outline = document.createElementNS(SVG_NS, 'use');
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
      const points = [fromNode.position, ...flow.waypoints, toNode.position];
      dom.path.setAttribute('d', polylineToSvgPathStyled(points, size, flow.line_style ?? 'corner'));
      if (dom.style === 'pulse') {
        this.applyFlow(flow.id, this.latestValues.get(flow.id) ?? 0);
      }
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
    const style: AnimStyle = anim.animation_style ?? 'dots';

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

    // ANIM-2 / P3-4: smooth_speed
    const smoothSpeed = this.config?.animation?.smooth_speed !== false;
    durMs = this.resolveSmoothedDur(flowId, durMs, smoothSpeed);

    // direction
    const directionMode = anim.direction ?? 'auto';
    let intendedDirection: number;
    if (directionMode === 'forward') intendedDirection = 1;
    else if (directionMode === 'reverse') intendedDirection = -1;
    else intendedDirection = value < 0 !== (flow.reverse === true) ? -1 : 1;

    // P3-4: direction change — decelerate to zero then re-accelerate in new direction (300ms total)
    let direction = intendedDirection;
    let effectiveGroupOpacity = isShimmer ? SHIMMER_OPACITY : 1;
    if (smoothSpeed && directionMode === 'auto') {
      const prevDir = this.lastDirection.get(flowId);
      const changing = this.dirChanging.get(flowId);
      if (prevDir !== undefined && prevDir !== intendedDirection && !changing) {
        this.dirChanging.set(flowId, { startMs: performance.now(), oldDir: prevDir, newDir: intendedDirection });
      }
      const dirChange = this.dirChanging.get(flowId);
      if (dirChange) {
        const DIR_CHANGE_MS = 300;
        const elapsed = performance.now() - dirChange.startMs;
        if (elapsed < DIR_CHANGE_MS) {
          const t = elapsed / DIR_CHANGE_MS;
          if (t < 0.5) {
            // decelerate: fade group opacity toward 0
            effectiveGroupOpacity = (isShimmer ? SHIMMER_OPACITY : 1) * (1 - t * 2);
            direction = dirChange.oldDir;
          } else {
            // re-accelerate in new direction
            effectiveGroupOpacity = (isShimmer ? SHIMMER_OPACITY : 1) * ((t - 0.5) * 2);
            direction = dirChange.newDir;
          }
        } else {
          this.dirChanging.delete(flowId);
          direction = intendedDirection;
        }
      }
    }
    this.lastDirection.set(flowId, intendedDirection);

    const domain = flow.domain ?? this.config?.domain;
    const baseColor = resolveFlowColor(flow, profile, domain, direction, this.config?.domain_colors);

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

    const burstMultiplier = this.updateBurstState(flowId, magnitude, params, profile);

    rlog('applyFlow:', flowId, 'style=', style, 'dur=', durMs, 'dir=', direction, 'color=', color);

    switch (style) {
      case 'dots':
        this.applyDots(dom, flow, profile, value, durMs, color, direction, burstMultiplier);
        break;
      case 'dash':
        this.applyDash(dom, flow, durMs, color, direction, burstMultiplier);
        break;
      case 'pulse':
        this.applyPulse(dom, flow, profile, value, durMs, color, burstMultiplier);
        break;
      case 'arrow':
        this.applyArrows(dom, flow, durMs, color, direction, burstMultiplier);
        break;
      case 'trail':
        this.applyTrail(dom, flow, durMs, color, direction, burstMultiplier);
        break;
      case 'fluid':
        this.applyFluid(dom, flow, durMs, color, direction);
        break;
      case 'spark':
        this.applySpark(dom, flow, profile, value, durMs, color, direction, burstMultiplier);
        break;
      case 'none':
        // static line — just ensure stroke is visible; no particles
        this.setGroupOpacity(dom, 1);
        break;
      default:
        this.applyDots(dom, flow, profile, value, durMs, color, direction, burstMultiplier);
    }
  }

  // ── smooth_speed (ANIM-2) ─────────────────────────────────────────────────

  private resolveSmoothedDur(flowId: string, targetMs: number, smooth: boolean): number {
    if (!smooth) {
      this.currentDurMs.set(flowId, targetMs);
      this.targetDurMs.set(flowId, targetMs);
      return targetMs;
    }
    const prev = this.targetDurMs.get(flowId);
    if (prev !== targetMs) {
      this.speedTransitionStart.set(flowId, performance.now());
      this.targetDurMs.set(flowId, targetMs);
    }
    const current = this.currentDurMs.get(flowId) ?? targetMs;
    const start = this.speedTransitionStart.get(flowId);
    if (start === undefined) {
      this.currentDurMs.set(flowId, targetMs);
      return targetMs;
    }
    const elapsed = performance.now() - start;
    const TRANSITION_MS = 500;
    if (elapsed >= TRANSITION_MS) {
      this.currentDurMs.set(flowId, targetMs);
      this.speedTransitionStart.delete(flowId);
      return targetMs;
    }
    // ease-in-out: t = 3t²-2t³
    const t = elapsed / TRANSITION_MS;
    const eased = t * t * (3 - 2 * t);
    const interpolated = current + (targetMs - current) * eased;
    this.currentDurMs.set(flowId, interpolated);
    return interpolated;
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
    if (dom.lineStroke) dom.lineStroke.setAttribute('opacity', opacity > 0 ? '0.9' : '0');
    if (dom.pulseCircles) for (const p of dom.pulseCircles) p.circle.setAttribute('opacity', op);
    if (dom.fluidGradient) dom.fluidGradient.parentElement?.setAttribute('opacity', op);
  }

  /** Remove all style-specific DOM elements, ready to switch style */
  private teardownStyle(dom: FlowDomNodes): void {
    for (const p of dom.particles) p.shape.remove();
    dom.particles = [];
    if (dom.particlesBack) {
      for (const p of dom.particlesBack) p.shape.remove();
      dom.particlesBack = undefined;
    }
    dom.lineStroke?.remove();
    dom.lineStroke = undefined;
    if (dom.pulseCircles) {
      for (const p of dom.pulseCircles) p.circle.remove();
      dom.pulseCircles = undefined;
    }
    dom.fluidGradient?.parentElement?.remove();
    dom.fluidGradient = undefined;
  }

  /** Resolve effective particle count, respecting explicit override and burst */
  private frameTimeSamples: number[] = [];
  private lastFrameForAdaptive = 0;

  private sampleFrameTime(): void {
    const now = performance.now();
    if (this.lastFrameForAdaptive > 0) {
      const delta = now - this.lastFrameForAdaptive;
      this.frameTimeSamples.push(delta);
      if (this.frameTimeSamples.length > 10) this.frameTimeSamples.shift();
    }
    this.lastFrameForAdaptive = now;
  }

  private avgFrameMs(): number {
    if (this.frameTimeSamples.length === 0) return 16.67;
    return this.frameTimeSamples.reduce((a, b) => a + b, 0) / this.frameTimeSamples.length;
  }

  private resolveParticleCount(
    flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    burstMultiplier: number,
  ): number {
    const anim = flow.animation ?? {};
    const targetFps = this.config?.animation?.fps ?? 60;
    const budgetMs = 1000 / targetFps;

    // When particle_count is explicitly set, skip adaptive logic
    if (anim.particle_count !== undefined) return anim.particle_count;

    const base = Math.max(
      1,
      Math.round(profile.particle_count_curve ? profile.particle_count_curve(value) : DEFAULT_PARTICLE_COUNT),
    );
    const burstMax = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    const configured = Math.min(burstMax, Math.max(1, Math.round(base * burstMultiplier)));

    // P3-4: adaptive particle count — reduce when over frame budget
    const style = anim.animation_style ?? 'dots';
    if (style === 'dots' || style === 'trail') {
      const current = this.adaptiveCount.get(flow.id) ?? configured;
      const avgMs = this.avgFrameMs();
      const now = performance.now();
      const lastChange = this.lastAdaptiveChange.get(flow.id) ?? 0;
      const CHANGE_INTERVAL_MS = 1000;
      if (now - lastChange > CHANGE_INTERVAL_MS) {
        let next = current;
        if (avgMs > budgetMs * 1.2 && current > 1) {
          next = current - 1;
          rlog('adaptive:', flow.id, 'reducing particles', current, '→', next, '(avg frame', avgMs.toFixed(1), 'ms)');
        } else if (avgMs < budgetMs * 0.8 && current < configured) {
          next = current + 1;
          rlog('adaptive:', flow.id, 'restoring particles', current, '→', next);
        }
        if (next !== current) {
          this.adaptiveCount.set(flow.id, next);
          this.lastAdaptiveChange.set(flow.id, now);
        }
      }
      return this.adaptiveCount.get(flow.id) ?? configured;
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
      const durMs = this.currentDurMs.get(flow.id) ?? 2000;
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

        // Freeze the animateMotion so we can drive position ourselves
        p.animateMotion.setAttribute('dur', '999999s');
        p.animateMotion.setAttribute('begin', 'indefinite');

        const pos = positions[i] ?? 0;

        if (totalLen > 0 && svgPath) {
          try {
            const pt = svgPath.getPointAtLength(pos * totalLen);
            // Use a small delta to compute tangent for rotate="auto" emulation
            const DELTA = Math.max(0.5, totalLen * 0.01);
            const ptA = svgPath.getPointAtLength(Math.max(0, pos * totalLen - DELTA));
            const ptB = svgPath.getPointAtLength(Math.min(totalLen, pos * totalLen + DELTA));
            const angle = Math.atan2(ptB.y - ptA.y, ptB.x - ptA.x) * (180 / Math.PI);
            p.shape.setAttribute('transform', `translate(${pt.x.toFixed(2)},${pt.y.toFixed(2)}) rotate(${angle.toFixed(1)})`);
          } catch {
            // getPointAtLength unavailable — fall back to begin= timing
            p.animateMotion.setAttribute('dur', `${durS.toFixed(3)}s`);
            p.animateMotion.setAttribute('begin', `${(-(pos * durS)).toFixed(4)}s`);
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
    const animCfg = flow.animation ?? {};
    const begins = this.resolveParticleBegins(flow.id, desired, durMs, animCfg);

    const installMotion = (particles: ParticleDom[], dir: number) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        this.updateParticleColor(p, color, flow, profile, flicker);

        const fresh = document.createElementNS(SVG_NS, 'animateMotion');
        fresh.setAttribute('repeatCount', 'indefinite');
        fresh.setAttribute('dur', durStr);
        fresh.setAttribute('rotate', 'auto');
        fresh.setAttribute('begin', `${(begins[i] ?? 0).toFixed(3)}s`);
        if (dir < 0) {
          fresh.setAttribute('keyPoints', '1;0');
          fresh.setAttribute('keyTimes', '0;1');
        }
        const mpath = document.createElementNS(SVG_NS, 'mpath');
        mpath.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
        mpath.setAttribute('href', `#${dom.pathId}`);
        fresh.appendChild(mpath);
        p.animateMotion.replaceWith(fresh);
        p.animateMotion = fresh;
        p.shape.appendChild(fresh);
      }
    };

    installMotion(dom.particles, direction);
    if (dom.particlesBack) installMotion(dom.particlesBack, -direction);
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
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  private applyPulse(
    dom: FlowDomNodes,
    flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    durMs: number,
    color: string,
    burstMultiplier: number,
  ): void {
    for (const p of dom.particles) p.shape.remove();
    dom.particles = [];
    dom.lineStroke?.remove();
    dom.lineStroke = undefined;

    const nodesById = new Map(this.config?.nodes.map((n) => [n.id, n]) ?? []);
    const fromNode = nodesById.get(flow.from_node);
    const toNode = nodesById.get(flow.to_node);
    if (!fromNode || !toNode) return;

    const points = [fromNode.position, ...flow.waypoints, toNode.position];
    const totalLenPct = pathLengthPercent(points);
    const basePulseCount = Math.max(
      2,
      Math.round(
        profile.particle_count_curve
          ? profile.particle_count_curve(value)
          : Math.max(3, Math.floor(totalLenPct / 15)),
      ),
    );
    const burstMax = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    const pulseCount = Math.min(burstMax, Math.max(2, Math.round(basePulseCount * burstMultiplier)));

    const size = this.containerSize();
    const pulseWidth = flow.animation?.pulse_width ?? 2;
    const maxR = PULSE_MAX_RADIUS * (flow.animation?.particle_size ?? 1.0);
    const glow = this.resolveGlow(flow, profile);

    if (!dom.pulseCircles || dom.pulseCircles.length !== pulseCount) {
      if (dom.pulseCircles) for (const p of dom.pulseCircles) p.circle.remove();
      dom.pulseCircles = [];
      for (let i = 0; i < pulseCount; i++) {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', '0');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-width', String(pulseWidth));
        circle.setAttribute('opacity', '0');
        if (glow) circle.setAttribute('filter', this.glowFilter(flow, profile, color));

        const animR = document.createElementNS(SVG_NS, 'animate');
        animR.setAttribute('attributeName', 'r');
        animR.setAttribute('values', `0;${maxR};0`);
        animR.setAttribute('repeatCount', 'indefinite');
        circle.appendChild(animR);

        const animO = document.createElementNS(SVG_NS, 'animate');
        animO.setAttribute('attributeName', 'opacity');
        animO.setAttribute('values', '0;0.9;0');
        animO.setAttribute('repeatCount', 'indefinite');
        circle.appendChild(animO);

        dom.group.appendChild(circle);
        dom.pulseCircles.push({ circle, animateRadius: animR, animateOpacity: animO });
      }
    }

    for (let i = 0; i < dom.pulseCircles.length; i++) {
      const p = dom.pulseCircles[i]!;
      const progress = (i + 0.5) / dom.pulseCircles.length;
      const pt = pointAtProgress(points, progress);
      const px = percentToPixel(pt, size);
      p.circle.setAttribute('cx', px.x.toFixed(2));
      p.circle.setAttribute('cy', px.y.toFixed(2));
      p.circle.setAttribute('stroke', color);

      const durStr = `${(durMs / 1000).toFixed(3)}s`;
      const begin = `${((-durMs * i) / (dom.pulseCircles.length * 1000)).toFixed(3)}s`;
      p.animateRadius.setAttribute('values', `0;${maxR};0`);
      p.animateRadius.setAttribute('dur', durStr);
      p.animateRadius.setAttribute('begin', begin);
      p.animateOpacity.setAttribute('dur', durStr);
      p.animateOpacity.setAttribute('begin', begin);
    }
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

    if (dom.particles.length !== desired) {
      for (const p of dom.particles) p.shape.remove();
      dom.particles = [];
      for (let i = 0; i < desired; i++) {
        dom.particles.push(this.makeParticle(dom, 'arrow', color, flow, profile));
      }
    }

    const durStr = `${(durMs / 1000).toFixed(3)}s`;
    const arrowBegins = this.resolveParticleBegins(flow.id, desired, durMs, flow.animation ?? {});
    for (let i = 0; i < dom.particles.length; i++) {
      const p = dom.particles[i]!;
      this.updateParticleColor(p, color, flow, profile, flicker);
      const fresh = document.createElementNS(SVG_NS, 'animateMotion');
      fresh.setAttribute('repeatCount', 'indefinite');
      fresh.setAttribute('dur', durStr);
      fresh.setAttribute('rotate', 'auto');
      fresh.setAttribute('begin', `${(arrowBegins[i] ?? 0).toFixed(3)}s`);
      if (direction < 0) {
        fresh.setAttribute('keyPoints', '1;0');
        fresh.setAttribute('keyTimes', '0;1');
      }
      const mpath = document.createElementNS(SVG_NS, 'mpath');
      mpath.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      mpath.setAttribute('href', `#${dom.pathId}`);
      fresh.appendChild(mpath);
      p.animateMotion.replaceWith(fresh);
      p.animateMotion = fresh;
      p.shape.appendChild(fresh);
    }
  }

  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
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

    if (dom.particles.length !== desired) {
      for (const p of dom.particles) p.shape.remove();
      dom.particles = [];
      for (let i = 0; i < desired; i++) {
        dom.particles.push(this.makeParticle(dom, 'teardrop', color, flow, profile));
      }
    }

    const durStr = `${(durMs / 1000).toFixed(3)}s`;
    const trailBegins = this.resolveParticleBegins(flow.id, desired, durMs, flow.animation ?? {});
    for (let i = 0; i < dom.particles.length; i++) {
      const p = dom.particles[i]!;
      this.updateParticleColor(p, color, flow, profile, flicker);
      const fresh = document.createElementNS(SVG_NS, 'animateMotion');
      fresh.setAttribute('repeatCount', 'indefinite');
      fresh.setAttribute('dur', durStr);
      fresh.setAttribute('rotate', 'auto');
      fresh.setAttribute('begin', `${(trailBegins[i] ?? 0).toFixed(3)}s`);
      if (direction < 0) {
        fresh.setAttribute('keyPoints', '1;0');
        fresh.setAttribute('keyTimes', '0;1');
      }
      const mpath = document.createElementNS(SVG_NS, 'mpath');
      mpath.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      mpath.setAttribute('href', `#${dom.pathId}`);
      fresh.appendChild(mpath);
      p.animateMotion.replaceWith(fresh);
      p.animateMotion = fresh;
      p.shape.appendChild(fresh);
    }
  }

  /**
   * fluid — continuous gradient flowing along the line.
   * Implemented as an animated stroke-dashoffset on a wide stroke.
   */
  private applyFluid(
    dom: FlowDomNodes,
    flow: FlowConfig,
    durMs: number,
    color: string,
    direction: number,
  ): void {
    for (const p of dom.particles) p.shape.remove();
    dom.particles = [];

    if (!dom.lineStroke) {
      const stroke = document.createElementNS(SVG_NS, 'use');
      stroke.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      stroke.setAttribute('href', `#${dom.pathId}`);
      stroke.setAttribute('fill', 'none');
      stroke.setAttribute('stroke-linecap', 'round');
      dom.group.appendChild(stroke);
      dom.lineStroke = stroke;
    }

    const strokeWidth = (this.config?.defaults?.line_width ?? STROKE_WIDTH) * 3;
    const glowFilter = this.glowFilter(flow, this.profileFor(flow), color);

    dom.lineStroke.setAttribute('stroke', color);
    dom.lineStroke.setAttribute('stroke-width', String(strokeWidth));
    // large dash+gap so only one segment visible at a time for the "wave" look
    dom.lineStroke.setAttribute('stroke-dasharray', '50 200');
    if (glowFilter) dom.lineStroke.setAttribute('filter', glowFilter);

    const existing = dom.lineStroke.querySelector('animate');
    if (existing) existing.remove();
    const anim = document.createElementNS(SVG_NS, 'animate');
    anim.setAttribute('attributeName', 'stroke-dashoffset');
    anim.setAttribute('from', direction > 0 ? '0' : '-250');
    anim.setAttribute('to', direction > 0 ? '-250' : '0');
    anim.setAttribute('dur', `${(durMs / 1000).toFixed(3)}s`);
    anim.setAttribute('repeatCount', 'indefinite');
    dom.lineStroke.appendChild(anim);
  }

  /**
   * spark — particles with randomised size/opacity, slight scatter.
   * Scatter is achieved via SVG transform on each particle's <g> wrapper.
   */
  private applySpark(
    dom: FlowDomNodes,
    flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    durMs: number,
    color: string,
    direction: number,
    burstMultiplier: number,
  ): void {
    const baseCount = this.resolveParticleCount(flow, profile, value, burstMultiplier);
    // burst: dramatically more particles
    const desired = Math.min(
      (this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES),
      Math.round(baseCount * burstMultiplier),
    );
    const shape = flow.animation?.particle_shape ?? 'circle';
    const flicker = flow.animation?.flicker === true;

    if (dom.particles.length !== desired) {
      for (const p of dom.particles) p.shape.remove();
      dom.particles = [];
      for (let i = 0; i < desired; i++) {
        const p = this.makeParticle(dom, shape, color, flow, profile);
        // randomise size ±30%
        const scale = 0.7 + Math.random() * 0.6;
        p.shape.setAttribute('transform', `scale(${scale.toFixed(2)})`);
        dom.particles.push(p);
      }
    }

    const durStr = `${(durMs / 1000).toFixed(3)}s`;
    for (let i = 0; i < dom.particles.length; i++) {
      const p = dom.particles[i]!;
      // randomised opacity 0.5–1.0
      const baseOpacity = 0.5 + Math.random() * 0.5;
      p.shape.setAttribute('opacity', String(baseOpacity.toFixed(2)));
      this.updateParticleColor(p, color, flow, profile, flicker);

      const fresh = document.createElementNS(SVG_NS, 'animateMotion');
      fresh.setAttribute('repeatCount', 'indefinite');
      fresh.setAttribute('dur', durStr);
      fresh.setAttribute('rotate', 'auto');
      fresh.setAttribute('begin', `${((-durMs * i) / (dom.particles.length * 1000)).toFixed(3)}s`);
      if (direction < 0) {
        fresh.setAttribute('keyPoints', '1;0');
        fresh.setAttribute('keyTimes', '0;1');
      }
      const mpath = document.createElementNS(SVG_NS, 'mpath');
      mpath.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      mpath.setAttribute('href', `#${dom.pathId}`);
      fresh.appendChild(mpath);
      p.animateMotion.replaceWith(fresh);
      p.animateMotion = fresh;
      p.shape.appendChild(fresh);
    }
    // suppress the unused variable lint error
    void value;
  }

  // ── particle shape factories ──────────────────────────────────────────────

  private particleKind(p: ParticleDom): ParticleKind {
    const tag = p.shape.tagName.toLowerCase();
    if (tag === 'circle') return 'circle';
    if (tag === 'rect') return 'square';
    if (tag === 'polygon') {
      // diamond vs arrow — encoded in a data attribute
      return (p.shape.getAttribute('data-kind') as ParticleKind | null) ?? 'arrow';
    }
    if (tag === 'ellipse') return 'teardrop';
    if (tag === 'path') return (p.shape.getAttribute('data-kind') as ParticleKind | null) ?? 'custom_svg';
    return 'circle';
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
        // Chevron pointing right (animateMotion rotate:auto will orient it)
        const w = r * 2.2;
        const h = r * 1.5;
        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', `${w},0 ${-w * 0.4},${h} 0,0 ${-w * 0.4},${-h}`);
        poly.setAttribute('fill', color);
        poly.setAttribute('opacity', '0');
        poly.setAttribute('data-kind', 'arrow');
        shape = poly;
        break;
      }
      case 'teardrop': {
        const trailLength = flow.animation?.trail_length ?? 2.0;
        const rx = r;
        const ry = r * trailLength;
        const ellipse = document.createElementNS(SVG_NS, 'ellipse');
        ellipse.setAttribute('rx', String(rx));
        ellipse.setAttribute('ry', String(ry));
        ellipse.setAttribute('cy', String(-ry * 0.3));
        ellipse.setAttribute('fill', color);
        ellipse.setAttribute('opacity', '0');
        shape = ellipse;
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
        // Append to group first so getBBox() works in a real SVG context
        dom.group.appendChild(pathEl);
        alreadyAppended = true;
        try {
          const bbox = (pathEl as SVGGraphicsElement).getBBox();
          const maxDim = Math.max(bbox.width, bbox.height, 1);
          const targetSize = r * 2;
          const scale = targetSize / maxDim;
          // Translate to centre the path on origin, then scale to fit
          const tx = -(bbox.x + bbox.width / 2);
          const ty = -(bbox.y + bbox.height / 2);
          pathEl.setAttribute('transform', `scale(${scale.toFixed(4)}) translate(${tx.toFixed(4)},${ty.toFixed(4)})`);
        } catch {
          // getBBox() can fail in JSDOM/SSR — skip scaling
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

    if (glow) {
      shape.setAttribute('filter', this.glowFilter(flow, profile, color));
      (shape as unknown as HTMLElement).style.color = color;
    }

    const animateMotion = document.createElementNS(SVG_NS, 'animateMotion');
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('dur', '2s');
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
    p.shape.setAttribute('fill', color);
    (p.shape as unknown as HTMLElement).style.color = color;
    const glow = this.resolveGlow(flow, profile);
    if (glow) p.shape.setAttribute('filter', this.glowFilter(flow, profile, color));

    // base opacity — visible
    const baseOp = '1';
    p.shape.setAttribute('opacity', baseOp);

    if (flicker) {
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
    return resolveFlowColor(flow, profile, domain, 1, this.config?.domain_colors);
  }
}
