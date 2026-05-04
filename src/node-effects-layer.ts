/**
 * SVG overlay for node_effect visuals + optional DOM hooks for the real node dots (v1.23.3).
 * Default viewBox 0–100; editor can pass `viewBoxUserWidth` / `viewBoxUserHeight` in layout metrics
 * (e.g. image natural size) so positions match the card/config percentage space.
 */

import type { FlowmeConfig, HomeAssistant, NodeConfig, NodeEffectConfig, NodePosition } from './types.js';
import { getProfile, NEUTRAL_NODE_COLOR, resolveFlowColor } from './flow-profiles/index.js';
import { parseSensorValue } from './utils.js';
import { dlog, isDebugEnabled } from './debug-log.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function parseReading(hass: HomeAssistant | undefined, entityId: string | undefined): number | null {
  if (!hass || !entityId) return null;
  const st = hass.states[entityId];
  if (!st || st.state === 'unavailable' || st.state === 'unknown') return null;
  return parseSensorValue(st.state);
}

/** Resolve node colour — mirrors FlowmeCard grouping logic (simplified). */
function resolveNodeColourForEffect(node: NodeConfig, config: FlowmeConfig): string {
  const domain = config.domain;
  const profile = getProfile(domain);
  if (node.color) return node.color;
  const flowsTouching = config.flows.filter((f) => f.from_node === node.id || f.to_node === node.id);
  if (flowsTouching.length === 0) return profile.default_color_positive;
  const colours = new Set<string>();
  for (const f of flowsTouching) {
    const fi = config.flows.findIndex((x) => x.id === f.id);
    const p = getProfile(f.domain ?? domain);
    const c = resolveFlowColor(f, p, f.domain ?? domain, 1, config.domain_colors, fi >= 0 ? fi : 0);
    colours.add(c);
  }
  if (colours.size === 1) return [...colours][0]!;
  return NEUTRAL_NODE_COLOR;
}

type NodeEffectsLayoutMetrics = {
  widthPx: number;
  heightPx: number;
  /** SVG viewBox user-space width (default 100). Editor uses image natural width. */
  viewBoxUserWidth?: number;
  /** SVG viewBox user-space height (default 100). */
  viewBoxUserHeight?: number;
};

/** Card passes these so glow/badge/alert style the real `.node-dot`; editor omits hooks (SVG-only). */
export type NodeEffectsSyncHooks = {
  resetDomEffects?: () => void;
  getLayoutMetrics?: (svg: SVGSVGElement) => NodeEffectsLayoutMetrics;
  setNodeDotBackground?: (nodeId: string, background: string, options?: { transitionMs?: number }) => void;
  setNodeDotFilter?: (nodeId: string, filter: string | null) => void;
};

function layoutMetrics(svg: SVGSVGElement): NodeEffectsLayoutMetrics {
  const r = svg.getBoundingClientRect();
  return { widthPx: Math.max(1, r.width), heightPx: Math.max(1, r.height) };
}

function viewBoxUserSize(m: NodeEffectsLayoutMetrics): { vbW: number; vbH: number } {
  return {
    vbW: m.viewBoxUserWidth ?? 100,
    vbH: m.viewBoxUserHeight ?? 100,
  };
}

/** Map node radius (px) into SVG user units (min of x/y scale). */
function nodeRadiusSvgUnits(nodeRpx: number, m: NodeEffectsLayoutMetrics): number {
  const { vbW, vbH } = viewBoxUserSize(m);
  const sx = vbW / m.widthPx;
  const sy = vbH / m.heightPx;
  return Math.min(nodeRpx * sx, nodeRpx * sy);
}

function strokeWidthSvgPx(px: number, m: NodeEffectsLayoutMetrics): number {
  const { vbW, vbH } = viewBoxUserSize(m);
  return Math.max(0.04, px * Math.min(vbW / m.widthPx, vbH / m.heightPx));
}

function percentToSvgXY(pos: NodePosition, m: NodeEffectsLayoutMetrics): { cx: number; cy: number } {
  const { vbW, vbH } = viewBoxUserSize(m);
  return {
    cx: (pos.x / 100) * vbW,
    cy: (pos.y / 100) * vbH,
  };
}

function rippleOwnerAttr(nodeId: string): string {
  return nodeId.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export class NodeEffectsLayerController {
  private lastDiagnosticLogMs = 0;
  private rippleLastRaw = new Map<string, number>();
  /** DOM `window.setTimeout` ids — typed as `number[]` so `tsc` with Node-augmented globals (Vitest CI) does not expect `NodeJS.Timeout`. */
  private ripplePendingTimeouts = new Map<string, number[]>();
  private rippleBurstGen = new Map<string, number>();

  reset(): void {
    for (const pending of this.ripplePendingTimeouts.values()) {
      for (const t of pending) window.clearTimeout(t);
    }
    this.ripplePendingTimeouts.clear();
    this.rippleLastRaw.clear();
    this.rippleBurstGen.clear();
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

    let rippleHost = layer.querySelector(':scope > g.node-effects-ripples') as SVGGElement | null;
    if (!rippleHost) {
      rippleHost = document.createElementNS(SVG_NS, 'g');
      rippleHost.classList.add('node-effects-ripples');
      layer.insertBefore(rippleHost, layer.firstChild);
    }

    let syncHost = layer.querySelector(':scope > g.node-effects-sync') as SVGGElement | null;
    if (!syncHost) {
      syncHost = document.createElementNS(SVG_NS, 'g');
      syncHost.classList.add('node-effects-sync');
      layer.appendChild(syncHost);
    }
    while (syncHost.firstChild) syncHost.firstChild.remove();

    const validIds = new Set(config.nodes.map((n) => n.id));
    for (const id of [...this.rippleLastRaw.keys()]) {
      if (!validIds.has(id)) {
        this.cancelRippleBurst(id, rippleHost);
        this.rippleLastRaw.delete(id);
      }
    }
    for (const id of [...this.rippleBurstGen.keys()]) {
      if (!validIds.has(id)) this.cancelRippleBurst(id, rippleHost);
    }

    const m = hooks?.getLayoutMetrics?.(svg) ?? layoutMetrics(svg);
    const defaultRpx = config.defaults?.node_radius ?? 12;

    if (isDebugEnabled() && nowMs - this.lastDiagnosticLogMs > 4000) {
      this.lastDiagnosticLogMs = nowMs;
      for (const node of config.nodes) {
        if (!node.node_effect?.type || !node.entity) continue;
        const st = hass?.states[node.entity];
        dlog(
          'node effect update:',
          node.id,
          node.node_effect.type,
          'entity state:',
          st?.state ?? '(none)',
        );
      }
    }

    for (const node of config.nodes) {
      const fx = node.node_effect;
      if (!fx || node.visible === false || !node.entity) continue;

      const nodeRpx = node.size ?? defaultRpx;
      const rSvg = nodeRadiusSvgUnits(nodeRpx, m);
      const { cx, cy } = percentToSvgXY(node.position, m);
      const colour = resolveNodeColourForEffect(node, config);

      const g = document.createElementNS(SVG_NS, 'g');
      g.classList.add('node-effect');
      g.setAttribute('data-node', node.id);

      switch (fx.type) {
        case 'glow':
          this.appendGlow(g, node, fx, hass, node.entity, colour, nodeRpx, hooks, m);
          break;
        case 'badge':
          this.appendBadge(g, fx, hass, node.entity, colour, node.id, cx, cy, nodeRpx, m, hooks);
          break;
        case 'ripple':
          this.updateRipple(rippleHost, node, fx, hass, colour, nodeRpx, cx, cy, m);
          continue;
        case 'alert':
          this.appendAlert(g, fx, hass, node.entity, colour, node.id, cx, cy, rSvg, nowMs, hooks);
          break;
        default:
          break;
      }
      if (g.childNodes.length > 0) syncHost.appendChild(g);
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
    hooks: NodeEffectsSyncHooks | undefined,
    m: NodeEffectsLayoutMetrics,
  ): void {
    const raw = parseReading(hass, entityId);
    const peak = fx.peak_value ?? 10000;
    const maxExtra = fx.glow_max_radius ?? 20;
    const minI = Math.max(0, Math.min(1, fx.glow_min_intensity ?? 0.1));
    const c = fx.glow_color || colour;
    const rawFactor = raw === null ? 0 : Math.abs(raw) / peak;
    const factor = Math.max(minI, Math.min(1, rawFactor));
    const blurPx = 4 + factor * maxExtra;
    const opacity = 0.2 + factor * 0.6;

    if (hooks?.setNodeDotFilter) {
      hooks.setNodeDotFilter(node.id, `drop-shadow(0 0 ${blurPx.toFixed(1)}px ${c})`);
      return;
    }

    const { cx, cy } = percentToSvgXY(node.position, m);
    const ring = document.createElementNS(SVG_NS, 'circle');
    ring.setAttribute('cx', String(cx));
    ring.setAttribute('cy', String(cy));
    ring.setAttribute('r', String(nodeRadiusSvgUnits(nodeRpx, m)));
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', c);
    ring.setAttribute('stroke-width', String(strokeWidthSvgPx(2, m)));
    ring.setAttribute('opacity', String(opacity));
    ring.setAttribute(
      'style',
      `filter: drop-shadow(0 0 ${blurPx.toFixed(1)}px ${c}); transition: filter 500ms ease, opacity 500ms ease`,
    );
    g.appendChild(ring);
  }

  private cancelRippleBurst(nodeId: string, rippleHost: SVGGElement | null): void {
    const pending = this.ripplePendingTimeouts.get(nodeId);
    if (pending) {
      for (const t of pending) window.clearTimeout(t);
      this.ripplePendingTimeouts.delete(nodeId);
    }
    if (rippleHost) {
      const sel = `[data-ripple-owner="${rippleOwnerAttr(nodeId)}"]`;
      rippleHost.querySelectorAll(sel).forEach((el) => el.remove());
    }
    this.rippleBurstGen.set(nodeId, (this.rippleBurstGen.get(nodeId) ?? 0) + 1);
  }

  private scheduleRippleBurst(
    nodeId: string,
    rippleHost: SVGGElement,
    cx: number,
    cy: number,
    nodeRpx: number,
    durMs: number,
    strokeColor: string,
    m: NodeEffectsLayoutMetrics,
  ): void {
    this.cancelRippleBurst(nodeId, rippleHost);
    const gen = this.rippleBurstGen.get(nodeId)!;
    const staggerMs = 300;
    const timeouts: number[] = [];
    for (let i = 0; i < 3; i++) {
      timeouts.push(
        window.setTimeout(() => {
          if (this.rippleBurstGen.get(nodeId) !== gen) return;
          this.spawnRippleRing(rippleHost, nodeId, cx, cy, nodeRpx, durMs, strokeColor, m);
        }, i * staggerMs),
      );
    }
    this.ripplePendingTimeouts.set(nodeId, timeouts);
  }

  private spawnRippleRing(
    rippleHost: SVGGElement,
    nodeId: string,
    cx: number,
    cy: number,
    nodeRpx: number,
    durMs: number,
    strokeColor: string,
    m: NodeEffectsLayoutMetrics,
  ): void {
    const startR = nodeRadiusSvgUnits(nodeRpx + 2, m);
    const endR = nodeRadiusSvgUnits(nodeRpx * 4, m);
    const sw = strokeWidthSvgPx(2, m);

    const wrap = document.createElementNS(SVG_NS, 'g');
    wrap.setAttribute('data-ripple-owner', nodeId);

    const ring = document.createElementNS(SVG_NS, 'circle');
    ring.setAttribute('cx', String(cx));
    ring.setAttribute('cy', String(cy));
    ring.setAttribute('r', String(startR));
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', strokeColor);
    ring.setAttribute('stroke-width', String(sw));
    ring.setAttribute('opacity', '0.7');

    const animR = document.createElementNS(SVG_NS, 'animate');
    animR.setAttribute('attributeName', 'r');
    animR.setAttribute('from', String(startR));
    animR.setAttribute('to', String(endR));
    animR.setAttribute('dur', `${durMs}ms`);
    animR.setAttribute('fill', 'freeze');
    animR.setAttribute('begin', 'indefinite');

    const animO = document.createElementNS(SVG_NS, 'animate');
    animO.setAttribute('attributeName', 'opacity');
    animO.setAttribute('from', '0.7');
    animO.setAttribute('to', '0');
    animO.setAttribute('dur', `${durMs}ms`);
    animO.setAttribute('fill', 'freeze');
    animO.setAttribute('begin', 'indefinite');

    ring.appendChild(animR);
    ring.appendChild(animO);
    wrap.appendChild(ring);
    rippleHost.appendChild(wrap);

    requestAnimationFrame(() => {
      try {
        animR.beginElement();
        animO.beginElement();
      } catch {
        /* SVG may be detached */
      }
    });

    window.setTimeout(() => wrap.remove(), durMs + 80);
  }

  private updateRipple(
    rippleHost: SVGGElement,
    node: NodeConfig,
    fx: Extract<NodeEffectConfig, { type: 'ripple' }>,
    hass: HomeAssistant | undefined,
    colour: string,
    nodeRpx: number,
    cx: number,
    cy: number,
    m: NodeEffectsLayoutMetrics,
  ): void {
    const raw = parseReading(hass, node.entity);
    const minV = fx.ripple_threshold ?? 0;
    if (raw === null || Math.abs(raw) <= minV) {
      this.cancelRippleBurst(node.id, rippleHost);
      this.rippleLastRaw.delete(node.id);
      return;
    }
    const prev = this.rippleLastRaw.get(node.id);
    if (prev === raw) return;
    this.rippleLastRaw.set(node.id, raw);
    const dur = fx.ripple_duration ?? 2000;
    const c = fx.ripple_color || colour;
    this.scheduleRippleBurst(node.id, rippleHost, cx, cy, nodeRpx, dur, c, m);
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
