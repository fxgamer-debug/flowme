import type { FlowConfig, FlowmeConfig, FlowProfile } from '../types.js';
import { getProfile } from '../flow-profiles/index.js';
import { debounce, polylineToSvgPath } from '../utils.js';
import type { FlowRenderer } from './types.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const DEFAULT_DOTS_PER_FLOW = 3;
const DOT_RADIUS = 5; // px
const STROKE_WIDTH = 2; // px

interface FlowDomNodes {
  group: SVGGElement;
  path: SVGPathElement;
  dotSlots: Array<{ circle: SVGCircleElement; animateMotion: SVGAnimateMotionElement }>;
  pathId: string;
}

/**
 * v0.1 renderer: native SVG with `animateMotion` elements.
 *
 * Known quirk (spec §Animation system → svg-renderer): `animateMotion` `dur`
 * changes don't take effect on some browsers. Work around by replacing the
 * `<animateMotion>` element in the DOM when duration changes. Calls are
 * debounced (200 ms) so rapid sensor updates don't thrash.
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

  async init(container: HTMLElement, config: FlowmeConfig): Promise<void> {
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
  }

  updateFlow(flowId: string, value: number): void {
    if (!this.flowsById.has(flowId)) return;
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
  }

  // -- internal --

  private containerSize(): { width: number; height: number } {
    if (!this.container) return { width: 0, height: 0 };
    const rect = this.container.getBoundingClientRect();
    // avoid zero-size SVGs during initial layout
    return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
  }

  private buildSkeleton(): void {
    if (!this.svg || !this.config) return;
    const size = this.containerSize();
    this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);

    const defs = document.createElementNS(SVG_NS, 'defs');
    this.svg.appendChild(defs);

    for (const flow of this.config.flows) {
      const nodesById = new Map(this.config.nodes.map((n) => [n.id, n]));
      const fromNode = nodesById.get(flow.from_node);
      const toNode = nodesById.get(flow.to_node);
      if (!fromNode || !toNode) continue;

      const points = [fromNode.position, ...flow.waypoints, toNode.position];
      const pathId = `flowme-path-${flow.id}`;

      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('id', pathId);
      path.setAttribute('d', polylineToSvgPath(points, size));
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', this.strokeColorFor(flow));
      path.setAttribute('stroke-width', String(STROKE_WIDTH));
      path.setAttribute('stroke-opacity', '0.25');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      defs.appendChild(path);

      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('data-flow-id', flow.id);

      // visible outline — reuse the same path visually
      const outline = document.createElementNS(SVG_NS, 'use');
      outline.setAttributeNS(XLINK_NS, 'href', `#${pathId}`);
      outline.setAttribute('href', `#${pathId}`);
      group.appendChild(outline);

      const profile = this.profileFor(flow);
      const dotColor = this.dotColorFor(flow, 1);
      const dotSlots: FlowDomNodes['dotSlots'] = [];
      for (let i = 0; i < DEFAULT_DOTS_PER_FLOW; i++) {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', String(DOT_RADIUS));
        circle.setAttribute('fill', dotColor);
        circle.setAttribute('opacity', '0');
        if (profile.glow) {
          circle.setAttribute('filter', 'drop-shadow(0 0 6px currentColor)');
          (circle as unknown as HTMLElement).style.color = dotColor;
        }
        const animateMotion = document.createElementNS(SVG_NS, 'animateMotion');
        animateMotion.setAttribute('repeatCount', 'indefinite');
        animateMotion.setAttribute('dur', '2s');
        animateMotion.setAttribute(
          'begin',
          `${((-2 * i) / DEFAULT_DOTS_PER_FLOW).toFixed(3)}s`,
        );
        const mpath = document.createElementNS(SVG_NS, 'mpath');
        mpath.setAttributeNS(XLINK_NS, 'href', `#${pathId}`);
        mpath.setAttribute('href', `#${pathId}`);
        animateMotion.appendChild(mpath);
        circle.appendChild(animateMotion);
        group.appendChild(circle);
        dotSlots.push({ circle, animateMotion });
      }

      this.svg.appendChild(group);
      this.flowNodes.set(flow.id, { group, path, dotSlots, pathId });
    }
  }

  private onResize(): void {
    if (!this.svg || !this.config) return;
    const size = this.containerSize();
    this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
    // regenerate path d's against the new size
    const nodesById = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const flow of this.config.flows) {
      const dom = this.flowNodes.get(flow.id);
      if (!dom) continue;
      const fromNode = nodesById.get(flow.from_node);
      const toNode = nodesById.get(flow.to_node);
      if (!fromNode || !toNode) continue;
      const points = [fromNode.position, ...flow.waypoints, toNode.position];
      dom.path.setAttribute('d', polylineToSvgPath(points, size));
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

    const profile = this.profileFor(flow);
    const threshold = flow.threshold ?? profile.visibility_threshold;
    const magnitude = Math.abs(value);
    const visible = magnitude >= threshold;

    // hide dots entirely if below threshold
    const opacity = visible ? '1' : '0';
    for (const slot of dom.dotSlots) {
      slot.circle.setAttribute('opacity', opacity);
    }
    if (!visible) return;

    const speedMultiplier = flow.speed_multiplier ?? 1;
    const durMs = profile.speed_curve(magnitude) * speedMultiplier;
    const durStr = `${(durMs / 1000).toFixed(3)}s`;

    const direction = value < 0 !== (flow.reverse === true) ? -1 : 1;
    const colorSource = direction > 0
      ? flow.color_positive ?? profile.default_color_positive
      : flow.color_negative ?? profile.default_color_negative;

    for (let i = 0; i < dom.dotSlots.length; i++) {
      const slot = dom.dotSlots[i];
      if (!slot) continue;
      slot.circle.setAttribute('fill', colorSource);
      if (profile.glow) (slot.circle as unknown as HTMLElement).style.color = colorSource;
      // spec workaround: replace animateMotion element so browsers pick up new dur reliably
      const fresh = document.createElementNS(SVG_NS, 'animateMotion');
      fresh.setAttribute('repeatCount', 'indefinite');
      fresh.setAttribute('dur', durStr);
      fresh.setAttribute(
        'begin',
        `${((-durMs * i) / (dom.dotSlots.length * 1000)).toFixed(3)}s`,
      );
      if (direction < 0) {
        fresh.setAttribute('keyPoints', '1;0');
        fresh.setAttribute('keyTimes', '0;1');
      }
      const mpath = document.createElementNS(SVG_NS, 'mpath');
      mpath.setAttributeNS(XLINK_NS, 'href', `#${dom.pathId}`);
      mpath.setAttribute('href', `#${dom.pathId}`);
      fresh.appendChild(mpath);
      slot.animateMotion.replaceWith(fresh);
      slot.animateMotion = fresh;
      slot.circle.appendChild(fresh);
    }
  }

  private profileFor(flow: FlowConfig): FlowProfile {
    return getProfile(flow.domain ?? this.config?.domain);
  }

  private strokeColorFor(flow: FlowConfig): string {
    const profile = this.profileFor(flow);
    return flow.color_positive ?? profile.default_color_positive;
  }

  private dotColorFor(flow: FlowConfig, sign: number): string {
    const profile = this.profileFor(flow);
    return sign >= 0
      ? flow.color_positive ?? profile.default_color_positive
      : flow.color_negative ?? profile.default_color_negative;
  }
}
