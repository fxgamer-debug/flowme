/**
 * SVG overlay for node_effect visuals + optional DOM hooks for the real node dots (v1.23.3).
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

export type NodeEffectsLayoutMetrics = { widthPx: number; heightPx: number };

/** Card passes these so glow/badge/alert style the real `.node-dot`; editor omits hooks (SVG-only). */
export type NodeEffectsSyncHooks = {
  resetDomEffects?: () => void;
  getLayoutMetrics?: (svg: SVGSVGElement) => NodeEffectsLayoutMetrics;
  setNodeDotBackground?: (nodeId: string, background: string, options?: { transitionMs?: number }) => void;
  setNodeDotFilter?: (nodeId: string, filter: string | null) => void;
};

type PulseState = {
  lastVal: number;
  hasSample: boolean;
  burstStartMs: number;
};

function layoutMetrics(svg: SVGSVGElement): NodeEffectsLayoutMetrics {
  const r = svg.getBoundingClientRect();
  return { widthPx: Math.max(1, r.width), heightPx: Math.max(1, r.height) };
}

/** Map node radius (px) into viewBox 0–100 circle radius (min of x/y scale). */
function nodeRadiusSvgUnits(nodeRpx: number, m: NodeEffectsLayoutMetrics): number {
  const sx = 100 / m.widthPx;
  const sy = 100 / m.heightPx;
  return Math.min(nodeRpx * sx, nodeRpx * sy);
}

function pad2pxSvg(m: NodeEffectsLayoutMetrics): number {
  const sx = 100 / m.widthPx;
  const sy = 100 / m.heightPx;
  return Math.min(2 * sx, 2 * sy);
}

export class NodeEffectsLayerController {
  private pulseState = new Map<string, PulseState>();
  private lastDiagnosticLogMs = 0;

  reset(): void {
    this.pulseState.clear();
  }

  prunePulseState(validIds: Set<string>): void {
    for (const id of this.pulseState.keys()) {
      if (!validIds.has(id)) this.pulseState.delete(id);
    }
  }

  sync(
    svg: SVGSVGElement | null,
    config: FlowmeConfig | undefined,
    hass: HomeAssistant | undefined,
    nowMs: number,
    hooks?: NodeEffectsSyncHooks,
  ): void {
    if (!svg || !config) return;

    hooks?.resetDomEffects?.();

    let layer = svg.querySelector(':scope > g.node-effects-layer') as SVGGElement | null;
    if (!layer) {
      layer = document.createElementNS(SVG_NS, 'g');
      layer.classList.add('node-effects-layer');
      svg.appendChild(layer);
    }
    while (layer.firstChild) layer.firstChild.remove();

    const m = hooks?.getLayoutMetrics?.(svg) ?? layoutMetrics(svg);
    const defaultRpx = config.defaults?.node_radius ?? 12;

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

      const nodeRpx = node.size ?? defaultRpx;
      const rSvg = nodeRadiusSvgUnits(nodeRpx, m);
      const cx = node.position.x;
      const cy = node.position.y;
      const colour = resolveNodeColourForEffect(node, config);

      const g = document.createElementNS(SVG_NS, 'g');
      g.classList.add('node-effect');
      g.setAttribute('data-node', node.id);

      switch (fx.type) {
        case 'pulse':
          this.appendPulse(g, node, fx, hass, colour, rSvg, cx, cy, nowMs, m);
          break;
        case 'glow':
          this.appendGlow(g, node, fx, hass, node.entity, colour, nodeRpx, hooks);
          break;
        case 'badge':
          this.appendBadge(g, fx, hass, node.entity, colour, node.id, cx, cy, nodeRpx, m, hooks);
          break;
        case 'ripple':
          this.appendRipple(g, fx, hass, node.entity, colour, rSvg, cx, cy, m);
          break;
        case 'alert':
          this.appendAlert(g, fx, hass, node.entity, colour, node.id, cx, cy, rSvg, nowMs, hooks);
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
    rSvg: number,
    cx: number,
    cy: number,
    nowMs: number,
    m: NodeEffectsLayoutMetrics,
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

    const pad = pad2pxSvg(m);
    const baseRN = rSvg + pad;
    const maxRN = rSvg * 4;

    for (let i = 0; i < count; i++) {
      const ringAge = burstAge - i * stagger;
      if (ringAge < 0 || ringAge > duration) continue;
      const t = ringAge / duration;
      const ring = document.createElementNS(SVG_NS, 'circle');
      ring.setAttribute('cx', String(cx));
      ring.setAttribute('cy', String(cy));
      ring.setAttribute('r', String(baseRN + t * (maxRN - baseRN)));
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', strokeC);
      ring.setAttribute('stroke-width', String(0.12));
      ring.setAttribute('opacity', String(0.8 * (1 - t)));
      g.appendChild(ring);
    }
  }

  private appendGlow(
    g: SVGGElement,
    node: NodeConfig,
    fx: Extract<NodeEffectConfig, { type: 'glow' }>,
    hass: HomeAssistant | undefined,
    entityId: string,
    colour: string,
    nodeRpx: number,
    hooks?: NodeEffectsSyncHooks,
  ): void {
    const raw = parseReading(hass, entityId);
    const peak = fx.peak_value ?? 10000;
    const maxExtra = fx.glow_max_radius ?? 20;
    const c = fx.glow_color || colour;
    const t = raw === null ? 0 : Math.max(0, Math.min(1, Math.abs(raw) / peak));
    const blurPx = 4 + t * maxExtra;

    if (hooks?.setNodeDotFilter) {
      hooks.setNodeDotFilter(node.id, `drop-shadow(0 0 ${blurPx.toFixed(1)}px ${c})`);
      return;
    }

    const ring = document.createElementNS(SVG_NS, 'circle');
    ring.setAttribute('cx', String(node.position.x));
    ring.setAttribute('cy', String(node.position.y));
    ring.setAttribute('r', String(nodeRpx / 100));
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', c);
    ring.setAttribute('stroke-width', String(0.08));
    ring.setAttribute('opacity', String(0.2 + t * 0.6));
    ring.setAttribute(
      'style',
      `filter: drop-shadow(0 0 ${blurPx.toFixed(1)}px ${c}); transition: filter 500ms ease, opacity 500ms ease`,
    );
    g.appendChild(ring);
  }

  private appendBadge(
    g: SVGGElement,
    fx: Extract<NodeEffectConfig, { type: 'badge' }>,
    hass: HomeAssistant | undefined,
    entityId: string,
    _colour: string,
    nodeId: string,
    cx: number,
    cy: number,
    nodeRpx: number,
    m: NodeEffectsLayoutMetrics,
    hooks?: NodeEffectsSyncHooks,
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

    if (hooks?.setNodeDotBackground) {
      hooks.setNodeDotBackground(nodeId, fill, { transitionMs: 300 });
      return;
    }

    const br = nodeRadiusSvgUnits(nodeRpx * 0.6, m);
    const bx = cx + Math.min(br * 1.1, 3);
    const by = cy - Math.min(br * 1.1, 3);
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
    rSvg: number,
    cx: number,
    cy: number,
    m: NodeEffectsLayoutMetrics,
  ): void {
    const raw = parseReading(hass, entityId);
    const minV = fx.ripple_threshold ?? 0;
    if (raw === null || Math.abs(raw) <= minV) return;

    const dur = fx.ripple_duration ?? 2000;
    const c = fx.ripple_color || colour;
    const pad = pad2pxSvg(m);
    const baseRN = rSvg + pad;
    const maxRN = rSvg * 3;

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
    animO.setAttribute('values', '0.6;0;0.6');
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
    nodeId: string,
    cx: number,
    cy: number,
    rSvg: number,
    nowMs: number,
    hooks?: NodeEffectsSyncHooks,
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

    const hz = fx.alert_frequency ?? 2;
    const alertC = fx.alert_color ?? '#FF0000';

    if (!active) {
      if (hooks?.setNodeDotBackground) {
        hooks.setNodeDotBackground(nodeId, colour, { transitionMs: 200 });
      }
      return;
    }

    if (hooks?.setNodeDotBackground) {
      const cycleMs = 1000 / Math.max(0.25, hz);
      const flash = Math.floor(nowMs / (cycleMs / 2)) % 2 === 0;
      hooks.setNodeDotBackground(nodeId, flash ? alertC : colour, { transitionMs: 80 });
      return;
    }

    const disc = document.createElementNS(SVG_NS, 'circle');
    disc.setAttribute('cx', String(cx));
    disc.setAttribute('cy', String(cy));
    disc.setAttribute('r', String(rSvg));
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
