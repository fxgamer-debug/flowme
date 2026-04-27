import type { FlowConfig, FlowmeConfig, FlowProfile, FlowShape } from '../types.js';
import { getProfile, resolveFlowColor } from '../flow-profiles/index.js';
import {
  debounce,
  percentToPixel,
  polylineToSvgPath,
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

/**
 * `?flowme_debug=1` → bypasses the visibility threshold, forces a 2000 ms
 * animation on every flow and logs each particle-build step. Used to
 * prove the animation engine itself works without depending on real
 * sensor values. See README "Troubleshooting → no animation".
 */
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
const DOT_RADIUS = 5; // px
const SQUARE_SIZE = 9; // px
const STROKE_WIDTH = 2; // px
const WAVE_STROKE_WIDTH = 8; // px
const PULSE_MAX_RADIUS = 14; // px

/** v1.0.5 burst mode (v1.0.6: peak comes from resolved curve params).
 *  When a flow's magnitude stays at or above `BURST_TRIGGER_RATIO × peak`
 *  for at least `BURST_SUSTAIN_MS` ms, the particle count for that flow
 *  is multiplied by the profile's `burst_density_multiplier` (default
 *  1.5) and capped at `BURST_MAX_PARTICLES`. Drops below the ratio reset
 *  the timer. */
const BURST_TRIGGER_RATIO = 0.9;
const BURST_SUSTAIN_MS = 5000;
const BURST_MAX_PARTICLES = 20;

interface FlowDomNodes {
  group: SVGGElement;
  path: SVGPathElement;
  pathId: string;
  shape: FlowShape;
  /** Dots / squares: particles moved via animateMotion. */
  particles: Array<{ shape: SVGGraphicsElement; animateMotion: SVGAnimateMotionElement }>;
  /** Wave: a visible dashed stroke on the same path. */
  waveStroke?: SVGUseElement;
  /** Pulse: stationary circles placed along path, each with its own animation. */
  pulseCircles?: Array<{
    circle: SVGCircleElement;
    animateRadius: SVGAnimateElement;
    animateOpacity: SVGAnimateElement;
  }>;
}

/**
 * SVG-based flow renderer.
 *
 * - shape='dot'     → N circles travelling along the path (animateMotion).
 * - shape='square'  → N squares travelling along the path.
 * - shape='wave'    → thick stroked path with repeating dash pattern,
 *                     animated via stroke-dashoffset (approximation of the
 *                     spec's sinusoidal displacement; the Houdini renderer
 *                     does proper sinusoids).
 * - shape='pulse'   → stationary circles at N evenly spaced points, each
 *                     scaling from 0 → MAX radius while fading out.
 *
 * Rapid updates are debounced (200 ms). animateMotion dur changes are
 * handled by replacing the <animateMotion> element (spec workaround).
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
  /** First timestamp (ms, `performance.now`) at which a flow's magnitude
   *  crossed the burst trigger ratio. Null when below the ratio. */
  private burstEnteredAt = new Map<string, number>();
  /** Currently-active burst flows. Used to fire exactly one transition
   *  log per enter / exit (not once per applyFlow call). */
  private burstActive = new Set<string>();

  async init(container: HTMLElement, config: FlowmeConfig): Promise<void> {
    rlog('init called — container:', container, '| container size:', container.getBoundingClientRect(), '| flows:', config.flows.length, '| nodes:', config.nodes.length);
    rlog('init config flows:', config.flows.map((f) => ({ id: f.id, entity: f.entity, from: f.from_node, to: f.to_node, waypoints: f.waypoints.length, domain: f.domain })));
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
    rlog('<svg> element appended to container. Parent shadow-root?', (container.getRootNode() as ShadowRoot | Document).constructor.name);

    this.buildSkeleton();
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(container);
  }

  updateFlow(flowId: string, value: number): void {
    if (!this.flowsById.has(flowId)) {
      rlog('updateFlow called for UNKNOWN flowId:', flowId);
      return;
    }
    rlog('updateFlow:', flowId, 'value=', value, '→ queued, will flush in 200ms');
    this.latestValues.set(flowId, value);
    this.applyUpdate();
  }

  destroy(): void {
    this.applyUpdate.cancel();
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
  }

  // -- internal --

  private containerSize(): { width: number; height: number } {
    if (!this.container) return { width: 0, height: 0 };
    const rect = this.container.getBoundingClientRect();
    return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
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

      const profile = this.profileFor(flow);
      const shape = profile.shape;
      const points = [fromNode.position, ...flow.waypoints, toNode.position];
      const pathId = `flowme-path-${flow.id}`;

      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('id', pathId);
      path.setAttribute('d', polylineToSvgPath(points, size));
      path.setAttribute('fill', 'none');
      defs.appendChild(path);

      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('data-flow-id', flow.id);
      if (flow.opacity !== undefined) {
        group.setAttribute('opacity', String(flow.opacity));
      }

      const outline = document.createElementNS(SVG_NS, 'use');
      outline.setAttributeNS(XLINK_NS, 'href', `#${pathId}`);
      outline.setAttribute('href', `#${pathId}`);
      const strokeWidth = this.config?.defaults?.line_width ?? STROKE_WIDTH;
      outline.setAttribute('stroke', this.primaryColor(flow));
      outline.setAttribute('stroke-opacity', '0.2');
      outline.setAttribute('stroke-width', String(strokeWidth));
      outline.setAttribute('stroke-linecap', 'round');
      outline.setAttribute('stroke-linejoin', 'round');
      outline.setAttribute('fill', 'none');
      group.appendChild(outline);

      const dom: FlowDomNodes = {
        group,
        path,
        pathId,
        shape,
        particles: [],
      };

      if (shape === 'wave') {
        const stroke = document.createElementNS(SVG_NS, 'use');
        stroke.setAttributeNS(XLINK_NS, 'href', `#${pathId}`);
        stroke.setAttribute('href', `#${pathId}`);
        stroke.setAttribute('stroke', this.primaryColor(flow));
        stroke.setAttribute('stroke-width', String(WAVE_STROKE_WIDTH));
        stroke.setAttribute('stroke-opacity', '0.9');
        stroke.setAttribute('stroke-linecap', 'round');
        stroke.setAttribute('stroke-linejoin', 'round');
        stroke.setAttribute('fill', 'none');
        stroke.setAttribute('stroke-dasharray', '14 10');
        stroke.setAttribute('stroke-dashoffset', '0');
        stroke.setAttribute('opacity', '0');
        // CSS animation on dashoffset — configured per-flow in update().
        group.appendChild(stroke);
        dom.waveStroke = stroke;
      } else if (shape === 'pulse') {
        dom.pulseCircles = [];
        // placeholder — we build actual circles in update() once we know particle count
      } else {
        // dot / square / gradient (gradient falls back to dot visually in SVG)
        // initial particles built in update() once value known
      }

      this.svg.appendChild(group);
      this.flowNodes.set(flow.id, dom);
      const dAttr = path.getAttribute('d') ?? '';
      rlog(
        'flow element appended:', flow.id,
        '| pathId=', pathId,
        '| d=', dAttr,
        '| shape=', shape,
        '| group outerHTML[0..200]=', group.outerHTML.slice(0, 200),
      );
    }
    rlog('buildSkeleton complete. flowNodes map size=', this.flowNodes.size, '| <svg> children=', this.svg.children.length);
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
      dom.path.setAttribute('d', polylineToSvgPath(points, size));
      // pulse circles are positioned in viewBox space and need repositioning
      if (dom.shape === 'pulse') this.applyFlow(flow.id, this.latestValues.get(flow.id) ?? 0);
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
    if (!flow || !dom) {
      rlog('applyFlow SKIP (unknown flow or no DOM):', flowId, 'hasFlow?', !!flow, 'hasDom?', !!dom);
      return;
    }

    const profile = this.profileFor(flow);
    const params = resolveSpeedCurveParams(flow, profile);
    const threshold = DEBUG ? 0 : params.threshold;
    const magnitude = Math.abs(value);
    const visible = DEBUG || magnitude >= threshold;

    rlog(
      'applyFlow:', flowId,
      'value=', value, '| magnitude=', magnitude,
      '| threshold=', threshold, '| visible=', visible, '| DEBUG=', DEBUG,
      '| curve params (resolved)=', params,
      '| override=', flow.speed_curve_override ?? '(none)',
    );

    if (!visible) {
      this.setGroupVisible(dom, false);
      rlog('applyFlow → flow', flowId, 'hidden (below threshold). No animation will run.');
      return;
    }
    this.setGroupVisible(dom, true);

    const speedMultiplier = flow.speed_multiplier ?? 1;
    const rawSpeed = sigmoidSpeedCurve(magnitude, params);
    const durMs = DEBUG
      ? DEBUG_DUR_MS
      : Math.max(50, rawSpeed * speedMultiplier);
    const direction = value < 0 !== (flow.reverse === true) ? -1 : 1;
    const domain = flow.domain ?? this.config?.domain;
    const color = resolveFlowColor(flow, profile, domain, direction, this.config?.domain_colors);

    const burstMultiplier = this.updateBurstState(flowId, magnitude, params, profile);

    rlog(
      'applyFlow → computed:', flowId,
      '| domain=', domain ?? '(default)',
      '| shape=', dom.shape,
      '| sigmoidSpeedCurve(mag)=', rawSpeed,
      '| speedMult=', speedMultiplier,
      '| dur=', durMs, 'ms',
      '| direction=', direction,
      '| resolved color=', color,
      '| burstMultiplier=', burstMultiplier,
      '| flow.color=', flow.color,
      '| flow.color_positive=', flow.color_positive,
      '| flow.color_negative=', flow.color_negative,
      '| profile.default_color_positive=', profile.default_color_positive,
    );

    switch (dom.shape) {
      case 'wave':
        // Wave shape has no particles — burst is a no-op for it until we add
        // an amplitude boost. Keep signature unchanged.
        this.applyWave(dom, profile, durMs, color, direction);
        break;
      case 'pulse':
        this.applyPulse(dom, flow, profile, value, durMs, color, burstMultiplier);
        break;
      case 'square':
        this.applyParticles(dom, flow, profile, value, durMs, color, direction, 'square', burstMultiplier);
        break;
      case 'gradient':
      case 'dot':
      default:
        this.applyParticles(dom, flow, profile, value, durMs, color, direction, 'dot', burstMultiplier);
        break;
    }
  }

  /**
   * Track whether a flow has sustained ≥ 90 % of its resolved `peak`
   * (override-aware) for at least 5 s. Return the particle-count
   * multiplier to apply right now (1 outside burst, profile's
   * `burst_density_multiplier` inside — default 1.5).
   */
  private updateBurstState(
    flowId: string,
    magnitude: number,
    params: ResolvedSpeedCurveParams,
    profile: FlowProfile,
  ): number {
    const peak = params.peak;
    const burstTriggerRatio =
      this.config?.defaults?.burst_trigger_ratio ?? BURST_TRIGGER_RATIO;
    const burstSustainMs = this.config?.defaults?.burst_sustain_ms ?? BURST_SUSTAIN_MS;
    const trigger = peak * burstTriggerRatio;
    const aboveTrigger = magnitude >= trigger;
    const now = performance.now();

    if (!aboveTrigger) {
      if (this.burstActive.has(flowId)) {
        rlog('burst EXIT:', flowId, 'magnitude=', magnitude, 'droppedBelow=', trigger.toFixed(2));
        this.burstActive.delete(flowId);
      }
      this.burstEnteredAt.delete(flowId);
      return 1;
    }

    let enteredAt = this.burstEnteredAt.get(flowId);
    if (enteredAt === undefined) {
      enteredAt = now;
      this.burstEnteredAt.set(flowId, enteredAt);
    }
    const elapsed = now - enteredAt;
    if (elapsed < burstSustainMs) {
      rlog(
        'burst PENDING:', flowId, 'magnitude=', magnitude, '| above', trigger.toFixed(2),
        'for', Math.round(elapsed), 'ms of', burstSustainMs,
      );
      return 1;
    }
    const multiplier = profile.burst_density_multiplier ?? 1.5;
    if (!this.burstActive.has(flowId)) {
      rlog(
        'burst ENTER:', flowId,
        '| sustained ≥', (burstTriggerRatio * 100).toFixed(0) + '%',
        'of peak', peak,
        'for', Math.round(elapsed), 'ms → density ×' + multiplier,
      );
      this.burstActive.add(flowId);
    }
    return multiplier;
  }

  private setGroupVisible(dom: FlowDomNodes, visible: boolean): void {
    const op = visible ? '1' : '0';
    for (const p of dom.particles) p.shape.setAttribute('opacity', op);
    if (dom.waveStroke) dom.waveStroke.setAttribute('opacity', visible ? '0.9' : '0');
    if (dom.pulseCircles) {
      for (const p of dom.pulseCircles) p.circle.setAttribute('opacity', op);
    }
  }

  private applyParticles(
    dom: FlowDomNodes,
    _flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    durMs: number,
    color: string,
    direction: number,
    kind: 'dot' | 'square',
    burstMultiplier: number,
  ): void {
    const base = Math.max(
      1,
      Math.round(
        profile.particle_count_curve ? profile.particle_count_curve(value) : DEFAULT_PARTICLE_COUNT,
      ),
    );
    const burstMaxParticles = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    const desired = Math.min(
      burstMaxParticles,
      Math.max(1, Math.round(base * burstMultiplier)),
    );
    if (burstMultiplier !== 1) {
      rlog('applyParticles burst → base=', base, '× mult=', burstMultiplier, '→ final=', desired);
    }
    // rebuild particle set if count changed
    if (dom.particles.length !== desired) {
      for (const p of dom.particles) p.shape.remove();
      dom.particles = [];
      for (let i = 0; i < desired; i++) {
        dom.particles.push(this.makeParticle(dom, kind, color, profile.glow));
      }
    }

    const durStr = `${(durMs / 1000).toFixed(3)}s`;
    rlog('applyParticles:', dom.pathId, '| kind=', kind, '| count=', dom.particles.length, '| dur=', durStr, '| color=', color, '| direction=', direction);
    for (let i = 0; i < dom.particles.length; i++) {
      const p = dom.particles[i];
      if (!p) continue;
      if (kind === 'dot') {
        p.shape.setAttribute('fill', color);
      } else {
        p.shape.setAttribute('fill', color);
      }
      if (profile.glow) (p.shape as unknown as HTMLElement).style.color = color;

      const fresh = document.createElementNS(SVG_NS, 'animateMotion');
      fresh.setAttribute('repeatCount', 'indefinite');
      fresh.setAttribute('dur', durStr);
      fresh.setAttribute('rotate', 'auto');
      fresh.setAttribute(
        'begin',
        `${((-durMs * i) / (dom.particles.length * 1000)).toFixed(3)}s`,
      );
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

      if (i === 0) {
        // log the first particle only to avoid console flooding on high-count flows
        rlog(
          'animateMotion[0] installed on', dom.pathId,
          '| dur=', fresh.getAttribute('dur'),
          '| mpath href=#' + dom.pathId,
          '| element outerHTML[0..200]=', fresh.outerHTML.slice(0, 200),
          '| parent shape outerHTML[0..200]=', p.shape.outerHTML.slice(0, 200),
        );
      }
    }
    dlog('SVG flow created:', dom.pathId, 'pathD=', dom.path.getAttribute('d'), 'dur=', durStr, 'particles=', dom.particles.length);
  }

  private applyWave(
    dom: FlowDomNodes,
    _profile: FlowProfile,
    durMs: number,
    color: string,
    direction: number,
  ): void {
    const stroke = dom.waveStroke;
    if (!stroke) return;
    stroke.setAttribute('stroke', color);
    // animate stroke-dashoffset via inline <animate>
    const existing = stroke.querySelector('animate');
    if (existing) existing.remove();
    const anim = document.createElementNS(SVG_NS, 'animate');
    anim.setAttribute('attributeName', 'stroke-dashoffset');
    anim.setAttribute('from', direction > 0 ? '0' : '-24');
    anim.setAttribute('to', direction > 0 ? '-24' : '0');
    anim.setAttribute('dur', `${(durMs / 1000).toFixed(3)}s`);
    anim.setAttribute('repeatCount', 'indefinite');
    stroke.appendChild(anim);
  }

  private applyPulse(
    dom: FlowDomNodes,
    flow: FlowConfig,
    profile: FlowProfile,
    value: number,
    durMs: number,
    color: string,
    burstMultiplier: number,
  ): void {
    if (!this.svg) return;
    const group = dom.group;
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
    const burstMaxParticles = this.config?.defaults?.burst_max_particles ?? BURST_MAX_PARTICLES;
    const pulseCount = Math.min(
      burstMaxParticles,
      Math.max(2, Math.round(basePulseCount * burstMultiplier)),
    );
    if (burstMultiplier !== 1) {
      rlog('applyPulse burst → base=', basePulseCount, '× mult=', burstMultiplier, '→ final=', pulseCount);
    }
    const size = this.containerSize();

    // rebuild when count changes
    if (!dom.pulseCircles || dom.pulseCircles.length !== pulseCount) {
      if (dom.pulseCircles) for (const p of dom.pulseCircles) p.circle.remove();
      dom.pulseCircles = [];
      for (let i = 0; i < pulseCount; i++) {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', '0');
        circle.setAttribute('fill', color);
        circle.setAttribute('opacity', '0');
        if (profile.glow) circle.setAttribute('filter', 'drop-shadow(0 0 6px currentColor)');
        (circle as unknown as HTMLElement).style.color = color;

        const animR = document.createElementNS(SVG_NS, 'animate');
        animR.setAttribute('attributeName', 'r');
        animR.setAttribute('values', `0;${PULSE_MAX_RADIUS};0`);
        animR.setAttribute('repeatCount', 'indefinite');
        circle.appendChild(animR);

        const animO = document.createElementNS(SVG_NS, 'animate');
        animO.setAttribute('attributeName', 'opacity');
        animO.setAttribute('values', '0;1;0');
        animO.setAttribute('repeatCount', 'indefinite');
        circle.appendChild(animO);

        group.appendChild(circle);
        dom.pulseCircles.push({ circle, animateRadius: animR, animateOpacity: animO });
      }
    }

    for (let i = 0; i < dom.pulseCircles.length; i++) {
      const p = dom.pulseCircles[i];
      if (!p) continue;
      const progress = (i + 0.5) / dom.pulseCircles.length;
      const pt = pointAtProgress(points, progress);
      const px = percentToPixel(pt, size);
      p.circle.setAttribute('cx', px.x.toFixed(2));
      p.circle.setAttribute('cy', px.y.toFixed(2));
      p.circle.setAttribute('fill', color);
      (p.circle as unknown as HTMLElement).style.color = color;

      const durStr = `${(durMs / 1000).toFixed(3)}s`;
      const begin = `${((-durMs * i) / (dom.pulseCircles.length * 1000)).toFixed(3)}s`;
      p.animateRadius.setAttribute('dur', durStr);
      p.animateRadius.setAttribute('begin', begin);
      p.animateOpacity.setAttribute('dur', durStr);
      p.animateOpacity.setAttribute('begin', begin);
    }
  }

  private makeParticle(
    dom: FlowDomNodes,
    kind: 'dot' | 'square',
    color: string,
    glow: boolean,
  ): { shape: SVGGraphicsElement; animateMotion: SVGAnimateMotionElement } {
    const dotRadius = this.config?.defaults?.dot_radius ?? DOT_RADIUS;
    let shape: SVGGraphicsElement;
    if (kind === 'square') {
      const squareSize = dotRadius * (SQUARE_SIZE / DOT_RADIUS);
      const rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttribute('width', String(squareSize));
      rect.setAttribute('height', String(squareSize));
      rect.setAttribute('x', String(-squareSize / 2));
      rect.setAttribute('y', String(-squareSize / 2));
      rect.setAttribute('rx', '1.5');
      rect.setAttribute('fill', color);
      rect.setAttribute('opacity', '0');
      shape = rect;
    } else {
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('r', String(dotRadius));
      circle.setAttribute('fill', color);
      circle.setAttribute('opacity', '0');
      shape = circle;
    }
    if (glow) {
      shape.setAttribute('filter', 'drop-shadow(0 0 6px currentColor)');
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

  private profileFor(flow: FlowConfig): FlowProfile {
    return getProfile(flow.domain ?? this.config?.domain);
  }

  private primaryColor(flow: FlowConfig): string {
    const profile = this.profileFor(flow);
    const domain = flow.domain ?? this.config?.domain;
    // Outline / wave-stroke colour. Always uses the positive direction
    // so it matches the resting hue users associate with the flow.
    return resolveFlowColor(flow, profile, domain, 1, this.config?.domain_colors);
  }
}
