/**
 * SVG overlay for node_effect visuals (v1.23.1).
 * viewBox 0–100 — matches node position percentages.
 */

import type { FlowmeConfig, HomeAssistant, NodeConfig, NodeEffectConfig } from './types.js';
import { getProfile, NEUTRAL_NODE_COLOR, resolveFlowColor } from './flow-profiles/index.js';
import { parseSensorValue } from './utils.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function parseReading(hass: HomeAssistant | undefined, entityId: string | undefined): number | null {
  if (!hass || !entityId) return null;
  const st = hass.states[entityId];
  if (!st || st.state === 'unavailable' || st.state === 'unknown') return null;
  return parseSensorValue(st.state);
}

/** Resolve node colour — mirrors FlowmeCard grouping logic (simplified). */
export function resolveNodeColourForEffect(node: NodeConfig, config: FlowmeConfig): string {
  const domain = config.domain;
  const profile = getProfile(domain);
  if (node.color) return node.color;
  const flowsTouching = config.flows.filter((f) => f.from_node === node.id || f.to_node === node.id);
  if (flowsTouching.length === 0) return profile.default_color_positive;
  const colours = new Set<string>();
  for (const f of flowsTouching) {
    const p = getProfile(f.domain ?? domain);
    const c = resolveFlowColor(f, p, f.domain ?? domain, 1, config.domain_colors, 0);
    colours.add(c);
  }
  if (colours.size === 1) return [...colours][0]!;
  return NEUTRAL_NODE_COLOR;
}

type PulseState = {
  lastVal: number;
  hasSample: boolean;
  burstStartMs: number;
};

export class NodeEffectsLayerController {
  private pulseState = new Map<string, PulseState>();
  private lastDiagnosticLogMs = 0;

  reset(): void {
    this.pulseState.clear();
  }

  /** Clear pulse timing when config nodes change ids */
  prunePulseState(validIds: Set<string>): void {
    for (const id of this.pulseState.keys()) {
      if (!validIds.has(id)) this.pulseState.delete(id);
    }
  }

  sync(svg: SVGSVGElement | null, config: FlowmeConfig | undefined, hass: HomeAssistant | undefined, nowMs: number): void {
    if (!svg || !config) return;

    let layer = svg.querySelector(':scope > g.node-effects-layer') as SVGGElement | null;
    if (!layer) {
      layer = document.createElementNS(SVG_NS, 'g');
      layer.classList.add('node-effects-layer');
      svg.appendChild(layer);
    }
    while (layer.firstChild) layer.firstChild.remove();

    const defaultR = config.defaults?.node_radius ?? 12;

    if (nowMs - this.lastDiagnosticLogMs > 4000) {
      this.lastDiagnosticLogMs = nowMs;
      for (const node of config.nodes) {
        if (!node.node_effect?.type || !node.entity) continue;
        const st = hass?.states[node.entity];
        // eslint-disable-next-line no-console -- throttled diagnostic
        console.log(
          '[FlowMe] node effect update:',
          node.id,
          node.node_effect.type,
          'entity state:',
          st?.state ?? '(none)',
          'controller exists: true',
        );
      }
    }

    for (const node of config.nodes) {
      const fx = node.node_effect;
      if (!fx || node.visible === false || !node.entity) continue;

      const nodeRpx = node.size ?? defaultR;
      const cx = node.position.x;
      const cy = node.position.y;
      const colour = resolveNodeColourForEffect(node, config);

      const g = document.createElementNS(SVG_NS, 'g');
      g.classList.add('node-effect');
      g.setAttribute('data-node', node.id);

      switch (fx.type) {
        case 'pulse':
          this.appendPulse(g, node, fx, hass, colour, nodeRpx, cx, cy, nowMs);
          break;
        case 'glow':
          this.appendGlow(g, fx, hass, node.entity, colour, nodeRpx, cx, cy);
          break;
        case 'badge':
          this.appendBadge(g, fx, hass, node.entity, colour, nodeRpx, cx, cy);
          break;
        case 'ripple':
          this.appendRipple(g, fx, hass, node.entity, colour, nodeRpx, cx, cy, nowMs);
          break;
        case 'alert':
          this.appendAlert(g, fx, hass, node.entity, colour, nodeRpx, cx, cy, nowMs);
          break;
        default:
          break;
      }
      if (g.childNodes.length > 0) layer.appendChild(g);
    }
  }

  private appendPulse(
    g: SVGGElement,
    node: NodeConfig,
    fx: Extract<NodeEffectConfig, { type: 'pulse' }>,
    hass: HomeAssistant | undefined,
    colour: string,
    nodeRpx: number,
    cx: number,
    cy: number,
    nowMs: number,
  ): void {
    const raw = parseReading(hass, node.entity);
    const threshold = fx.pulse_threshold ?? 0.1;
    const count = Math.max(1, fx.pulse_count ?? 3);
    const duration = fx.pulse_duration ?? 800;
    const strokeC = fx.pulse_color || colour;

    let st = this.pulseState.get(node.id);
    if (!st) {
      st = { lastVal: raw ?? 0, hasSample: false, burstStartMs: -1e12 };
      this.pulseState.set(node.id, st);
    }

    if (raw !== null) {
      if (st.hasSample) {
        const denom = Math.max(Math.abs(st.lastVal), Math.abs(raw), 1e-6);
        const rel = Math.abs(raw - st.lastVal) / denom;
        if (rel >= threshold) {
          st.burstStartMs = nowMs;
        }
      } else {
        st.hasSample = true;
      }
      st.lastVal = raw;
    }

    const burstAge = nowMs - st.burstStartMs;
    const stagger = duration / count;
    if (burstAge < 0 || burstAge > duration + stagger * count) return;

    const maxRNorm = (nodeRpx * 4) / 100;
    const baseRN = nodeRpx / 100;

    for (let i = 0; i < count; i++) {
      const ringAge = burstAge - i * stagger;
      if (ringAge < 0 || ringAge > duration) continue;
      const t = ringAge / duration;
      const ring = document.createElementNS(SVG_NS, 'circle');
      ring.setAttribute('cx', String(cx));
      ring.setAttribute('cy', String(cy));
      ring.setAttribute('r', String(baseRN + t * (maxRNorm - baseRN)));
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', strokeC);
      ring.setAttribute('stroke-width', String(0.12));
      ring.setAttribute('opacity', String(0.8 * (1 - t)));
      g.appendChild(ring);
    }
  }

  private appendGlow(
    g: SVGGElement,
    fx: Extract<NodeEffectConfig, { type: 'glow' }>,
    hass: HomeAssistant | undefined,
    entityId: string,
    colour: string,
    nodeRpx: number,
    cx: number,
    cy: number,
  ): void {
    const raw = parseReading(hass, entityId);
    const peak = fx.peak_value ?? 10000;
    const maxExtra = (fx.glow_max_radius ?? 20) / 100;
    const c = fx.glow_color || colour;
    const t = raw === null ? 0 : Math.max(0, Math.min(1, Math.abs(raw) / peak));
    const glowR = nodeRpx / 100 + t * maxExtra;
    const op = 0.2 + t * 0.6;
    const ring = document.createElementNS(SVG_NS, 'circle');
    ring.setAttribute('cx', String(cx));
    ring.setAttribute('cy', String(cy));
    ring.setAttribute('r', String(glowR));
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', c);
    ring.setAttribute('stroke-width', String(0.08));
    ring.setAttribute('opacity', String(op));
    ring.setAttribute(
      'style',
      `filter: drop-shadow(0 0 ${(4 + t * 16).toFixed(1)}px ${c}); transition: filter 500ms ease, opacity 500ms ease`,
    );
    g.appendChild(ring);
  }

  private appendBadge(
    g: SVGGElement,
    fx: Extract<NodeEffectConfig, { type: 'badge' }>,
    hass: HomeAssistant | undefined,
    entityId: string,
    _colour: string,
    nodeRpx: number,
    cx: number,
    cy: number,
  ): void {
    const onC = fx.badge_color_on ?? '#32DC50';
    const offC = fx.badge_color_off ?? '#CC3333';
    const st = hass?.states[entityId];
    let fill = '#888888';
    if (st) {
      if (st.state === 'unavailable' || st.state === 'unknown') fill = '#888888';
      else if (fx.threshold !== undefined && fx.threshold !== null) {
        const v = parseReading(hass, entityId);
        fill = v !== null && v >= fx.threshold ? onC : offC;
      } else {
        const low = String(st.state).toLowerCase();
        fill = low === 'on' || low === 'open' || low === 'true' ? onC : offC;
      }
    }
    const br = (nodeRpx * 0.6) / 100;
    const bx = cx + nodeRpx / 100 * 0.65;
    const by = cy - nodeRpx / 100 * 0.65;
    const badge = document.createElementNS(SVG_NS, 'circle');
    badge.setAttribute('cx', String(bx));
    badge.setAttribute('cy', String(by));
    badge.setAttribute('r', String(br));
    badge.setAttribute('fill', fill);
    badge.setAttribute('stroke', '#ffffff');
    badge.setAttribute('stroke-width', String(0.03));
    g.appendChild(badge);
  }

  private appendRipple(
    g: SVGGElement,
    fx: Extract<NodeEffectConfig, { type: 'ripple' }>,
    hass: HomeAssistant | undefined,
    entityId: string,
    colour: string,
    nodeRpx: number,
    cx: number,
    cy: number,
    _nowMs: number,
  ): void {
    const raw = parseReading(hass, entityId);
    const minV = fx.ripple_threshold ?? 0;
    if (raw === null || Math.abs(raw) <= minV) return;

    const dur = fx.ripple_duration ?? 2000;
    const c = fx.ripple_color || colour;
    const maxRN = (nodeRpx * 3) / 100;
    const baseRN = nodeRpx / 100;

    const ring = document.createElementNS(SVG_NS, 'circle');
    ring.setAttribute('cx', String(cx));
    ring.setAttribute('cy', String(cy));
    ring.setAttribute('r', String(baseRN));
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', c);
    ring.setAttribute('stroke-width', String(0.1));

    const animR = document.createElementNS(SVG_NS, 'animate');
    animR.setAttribute('attributeName', 'r');
    animR.setAttribute('values', `${baseRN};${maxRN};${baseRN}`);
    animR.setAttribute('dur', `${dur}ms`);
    animR.setAttribute('repeatCount', 'indefinite');
    ring.appendChild(animR);

    const animO = document.createElementNS(SVG_NS, 'animate');
    animO.setAttribute('attributeName', 'opacity');
    animO.setAttribute('values', '0.5;0;0.5');
    animO.setAttribute('dur', `${dur}ms`);
    animO.setAttribute('repeatCount', 'indefinite');
    ring.appendChild(animO);

    g.appendChild(ring);
  }

  private appendAlert(
    g: SVGGElement,
    fx: Extract<NodeEffectConfig, { type: 'alert' }>,
    hass: HomeAssistant | undefined,
    entityId: string,
    colour: string,
    nodeRpx: number,
    cx: number,
    cy: number,
    _nowMs: number,
  ): void {
    const raw = parseReading(hass, entityId);
    if (raw === null) return;
    const thr = fx.alert_threshold ?? 0;
    const cond = fx.alert_condition ?? 'above';
    const hyst = fx.alert_hysteresis ?? 0.05;
    const band = Math.abs(thr) * hyst + 1e-6;
    let active = cond === 'above' ? raw > thr : raw < thr;
    if (!active && cond === 'above' && raw > thr - band) active = true;
    if (!active && cond === 'below' && raw < thr + band) active = true;
    if (!active) return;

    const hz = fx.alert_frequency ?? 2;
    const alertC = fx.alert_color ?? '#FF0000';
    const disc = document.createElementNS(SVG_NS, 'circle');
    disc.setAttribute('cx', String(cx));
    disc.setAttribute('cy', String(cy));
    disc.setAttribute('r', String(nodeRpx / 100));
    disc.setAttribute('fill', colour);
    disc.setAttribute('opacity', '0.85');

    const cycleMs = Math.max(100, Math.round(1000 / Math.max(0.25, hz)));
    const anim = document.createElementNS(SVG_NS, 'animate');
    anim.setAttribute('attributeName', 'fill');
    anim.setAttribute('values', `${colour};${alertC};${colour}`);
    anim.setAttribute('dur', `${cycleMs}ms`);
    anim.setAttribute('repeatCount', 'indefinite');
    disc.appendChild(anim);

    g.appendChild(disc);
  }
}
