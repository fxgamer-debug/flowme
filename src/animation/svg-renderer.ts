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
  private rafHandle: number | null = null;
  private lastFrameTime = 0;

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
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  private startFpsLoop(): void {
    const targetFps = this.config?.animation?.fps ?? 60;
    const frameInterval = 1000 / targetFps;

    const loop = (now: number) => {
      if (!this.svg) return; // destroyed
      const delta = now - this.lastFrameTime;
      if (delta >= frameInterval) {
        this.lastFrameTime = now - (delta % frameInterval);
        // Smooth speed transitions need periodic flush even without new sensor values
        const smoothSpeed = this.config?.animation?.smooth_speed !== false;
        if (smoothSpeed && this.speedTransitionStart.size > 0) {
          this.flushUpdates();
        }
      }
      this.rafHandle = requestAnimationFrame(loop);
    };

    if (targetFps < 60) {
      this.lastFrameTime = performance.now();
      this.rafHandle = requestAnimationFrame(loop);
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
    this.currentDurMs.clear();
    this.targetDurMs.clear();
    this.speedTransitionStart.clear();
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
        style: this.animStyle(flow),
        particles: [],
      };

      this.svg.appendChild(group);
      this.flowNodes.set(flow.id, dom);
      rlog('skeleton:', flow.id, '| style=', dom.style);
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

    if (!visible || style === 'none') {
      this.setGroupOpacity(dom, 0);
      return;
    }

    const rawSpeed = DEBUG ? DEBUG_DUR_MS : sigmoidSpeedCurve(magnitude, params);
    const speedMultiplier = flow.speed_multiplier ?? 1;
    let durMs = Math.max(50, rawSpeed * speedMultiplier);
    if (isShimmer) durMs = durMs / SHIMMER_SPEED_FACTOR;

    // ANIM-2: smooth_speed — interpolate toward new duration
    const smoothSpeed = this.config?.animation?.smooth_speed !== false;
    durMs = this.resolveSmoothedDur(flowId, durMs, smoothSpeed);

    // direction
    const directionMode = anim.direction ?? 'auto';
    let direction: number;
    if (directionMode === 'forward') direction = 1;
    else if (directionMode === 'reverse') direction = -1;
    else direction = value < 0 !== (flow.reverse === true) ? -1 : 1;

    const domain = flow.domain ?? this.config?.domain;
    const color = resolveFlowColor(flow, profile, domain, direction, this.config?.domain_colors);

    const groupOpacity = isShimmer ? SHIMMER_OPACITY : 1;
    this.setGroupOpacity(dom, groupOpacity);

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
  private resolveParticleCount(
    flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    burstMultiplier: number,
  ): number {
    const anim = flow.animation ?? {};
    if (anim.particle_count !== undefined) return anim.particle_count;
    const base = Math.max(
      1,
      Math.round(profile.particle_count_curve ? profile.particle_count_curve(value) : DEFAULT_PARTICLE_COUNT),
    );
    const burstMax = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    return Math.min(burstMax, Math.max(1, Math.round(base * burstMultiplier)));
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
    const installMotion = (particles: ParticleDom[], dir: number) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        this.updateParticleColor(p, color, flow, profile, flicker);

        const fresh = document.createElementNS(SVG_NS, 'animateMotion');
        fresh.setAttribute('repeatCount', 'indefinite');
        fresh.setAttribute('dur', durStr);
        fresh.setAttribute('rotate', 'auto');
        fresh.setAttribute('begin', `${((-durMs * i) / (particles.length * 1000)).toFixed(3)}s`);
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
    for (let i = 0; i < dom.particles.length; i++) {
      const p = dom.particles[i]!;
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
    for (let i = 0; i < dom.particles.length; i++) {
      const p = dom.particles[i]!;
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
    dom.group.appendChild(shape);
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
