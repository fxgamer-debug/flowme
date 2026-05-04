import type { FlowConfig, FlowmeConfig, FlowProfile, NodePosition } from '../types.js';
import { getProfile, resolveFlowColor } from '../flow-profiles/index.js';
import { awaitStableSize, debounce, percentToPixel, resolveSpeedCurveParams, sigmoidSpeedCurve } from '../utils.js';
import type { FlowRenderer } from './types.js';
import { isDebugEnabled } from '../debug-log.js';
// Vite inlines the worklet source as a string at build time.
import workletSource from '../flowme-painter-worklet.js?raw';

const KEYFRAMES_STYLE_ID = 'flowme-keyframes';
const ANIMATION_NAME = 'flowme-cycle';
const DEFAULT_DOT_RADIUS = 5;
const DEFAULT_LINE_WIDTH = 2;

let workletReady: Promise<void> | null = null;
let propertiesRegistered = false;

function ensureKeyframesInjected(): void {
  if (document.getElementById(KEYFRAMES_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_STYLE_ID;
  style.textContent = `@keyframes ${ANIMATION_NAME} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`;
  document.head.appendChild(style);
}

function registerPropertiesOnce(): void {
  if (propertiesRegistered) return;
  const cssWithRegister = CSS as unknown as {
    registerProperty?: (opts: {
      name: string;
      syntax: string;
      inherits: boolean;
      initialValue: string;
    }) => void;
  };
  const reg = cssWithRegister.registerProperty?.bind(CSS);
  if (!reg) return;
  const defs: Array<[string, string, string]> = [
    ['--flowme-progress', '<number>', '0'],
    ['--flowme-count', '<number>', '3'],
    ['--flowme-radius', '<number>', '5'],
    ['--flowme-line', '<number>', '2'],
    ['--flowme-amp', '<number>', '4'],
    ['--flowme-direction', '<number>', '1'],
    /** Cycle duration in milliseconds (ANIM-1 — transition for smooth speed changes) */
    ['--flowme-dur', '<number>', '2000'],
  ];
  for (const [name, syntax, initialValue] of defs) {
    try {
      reg({ name, syntax, inherits: false, initialValue });
    } catch {
      // already registered, ignore
    }
  }
  propertiesRegistered = true;
}

async function loadWorkletOnce(): Promise<void> {
  if (workletReady) return workletReady;
  const paintWorklet = (CSS as unknown as { paintWorklet?: { addModule: (url: string) => Promise<void> } })
    .paintWorklet;
  if (!paintWorklet) {
    workletReady = Promise.reject(new Error('paintWorklet not available'));
    return workletReady;
  }
  const blob = new Blob([workletSource], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  workletReady = paintWorklet
    .addModule(url)
    .catch((err) => {
      workletReady = null;
      throw err;
    })
    .finally(() => {
      // keep the URL around until the document is gone — revoking too early
      // can race the worklet load on some Chromium versions.
    });
  return workletReady;
}

interface FlowDiv {
  el: HTMLDivElement;
}

/**
 * Houdini-based renderer using CSS Paint Worklet. For each flow we create an
 * absolutely-positioned div that fills the container and uses
 * `background: paint(flowme-painter)`. Path, shape, colours, etc. are passed
 * via CSS custom properties. `--flowme-progress` is animated 0→1 indefinitely
 * via a CSS @keyframes rule; changing `--flowme-duration` reparents the
 * animation timing.
 */
export class HoudiniRenderer implements FlowRenderer {
  private container: HTMLElement | null = null;
  private config: FlowmeConfig | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private wrapper: HTMLDivElement | null = null;
  private flowDivs = new Map<string, FlowDiv>();
  private flowsById = new Map<string, FlowConfig>();
  private latestValues = new Map<string, number>();
  private applyUpdate = debounce(() => this.flushUpdates(), 120);
  /** Last applied duration (ms) per flow — for <50ms snap vs CSS transition (ANIM-1) */
  private lastDurMsByFlow = new Map<string, number>();

  async init(container: HTMLElement, config: FlowmeConfig): Promise<void> {
    this.container = container;
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log('[FlowMe Renderer] init start dims:', container.offsetWidth, container.offsetHeight);
    }
    this.config = config;
    this.flowsById = new Map(config.flows.map((f) => [f.id, f]));

    ensureKeyframesInjected();
    registerPropertiesOnce();
    await loadWorkletOnce();

    const wrapper = document.createElement('div');
    wrapper.className = 'flow-houdini flow-houdini-root';
    wrapper.style.position = 'absolute';
    wrapper.style.inset = '0';
    wrapper.style.pointerEvents = 'none';
    container.appendChild(wrapper);
    this.wrapper = wrapper;

    for (const flow of config.flows) {
      const el = document.createElement('div');
      el.className = 'flow-houdini';
      el.dataset['flowId'] = flow.id;
      el.style.position = 'absolute';
      el.style.inset = '0';
      el.style.pointerEvents = 'none';
      (el.style as unknown as { background: string }).background = 'paint(flowme-painter)';
      el.style.setProperty('--flowme-dur', '2000');
      el.style.transition = '--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)';
      el.style.animation = `${ANIMATION_NAME} calc(var(--flowme-dur) * 1ms) linear infinite`;
      el.style.opacity = '0';
      wrapper.appendChild(el);
      this.flowDivs.set(flow.id, { el });
    }

    this.rebuildPaths();
    this.resizeObserver = new ResizeObserver(() => this.rebuildPaths());
    this.resizeObserver.observe(container);
    await awaitStableSize(container);
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log('[FlowMe Renderer] stable dims:', container.offsetWidth, container.offsetHeight);
    }
    this.rebuildPaths();
    if (isDebugEnabled()) {
      // eslint-disable-next-line no-console -- gated by config.debug
      console.log('[FlowMe Renderer] post-resize dims:', container.offsetWidth, container.offsetHeight);
    }
  }

  applyConfig(config: FlowmeConfig): void {
    this.config = config;
    this.flowsById = new Map(config.flows.map((f) => [f.id, f]));
    this.rebuildPaths();
  }

  updateFlow(flowId: string, value: number): void {
    if (!this.flowsById.has(flowId)) return;
    this.latestValues.set(flowId, value);
    this.applyUpdate();
  }

  setFlowAriaLabel(flowId: string, label: string): void {
    const div = this.flowDivs.get(flowId);
    if (!div) return;
    div.el.setAttribute('role', 'img');
    div.el.setAttribute('aria-label', label);
  }

  pause(): void {
    if (!this.wrapper) return;
    this.wrapper.querySelectorAll('.flow-houdini').forEach((el) => {
      (el as HTMLElement).style.animationPlayState = 'paused';
    });
  }

  resume(): void {
    if (!this.wrapper) return;
    this.wrapper.querySelectorAll('.flow-houdini').forEach((el) => {
      (el as HTMLElement).style.animationPlayState = 'running';
    });
  }

  destroy(): void {
    this.applyUpdate.cancel();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.wrapper?.remove();
    this.wrapper = null;
    this.flowDivs.clear();
    this.flowsById.clear();
    this.latestValues.clear();
    this.lastDurMsByFlow.clear();
    this.container = null;
    this.config = null;
  }

  // -- internal --

  private containerSize(): { width: number; height: number } {
    if (!this.container) return { width: 1, height: 1 };
    const rect = this.container.getBoundingClientRect();
    return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
  }

  private rebuildPaths(): void {
    if (!this.config) return;
    const size = this.containerSize();
    const nodesById = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const flow of this.config.flows) {
      const div = this.flowDivs.get(flow.id);
      if (!div) continue;
      const from = nodesById.get(flow.from_node);
      const to = nodesById.get(flow.to_node);
      if (!from || !to) continue;
      const points: NodePosition[] = [from.position, ...flow.waypoints, to.position];
      const pixelPoints = points.map((p) => percentToPixel(p, size));
      const serialised = pixelPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
      div.el.style.setProperty('--flowme-path', `"${serialised}"`);
    }
    // re-apply last known values so particle counts etc. stay in sync with resize
    this.flushUpdates();
  }

  private flushUpdates(): void {
    for (const [id, value] of this.latestValues) this.applyFlow(id, value);
  }

  private applyFlow(flowId: string, value: number): void {
    const flow = this.flowsById.get(flowId);
    const div = this.flowDivs.get(flowId);
    if (!flow || !div) return;

    const profile = this.profileFor(flow);
    const params = resolveSpeedCurveParams(flow, profile);
    const magnitude = Math.abs(value);
    const visible = magnitude >= params.threshold;

    if (!visible) {
      div.el.style.opacity = '0';
      return;
    }
    div.el.style.opacity = '1';

    const speedMultiplier = flow.speed_multiplier ?? 1;
    const durMs = Math.max(50, sigmoidSpeedCurve(magnitude, params) * speedMultiplier);
    const dirCfg = flow.animation?.direction ?? 'auto';
    let direction: number;
    if (dirCfg === 'forward') direction = 1;
    else if (dirCfg === 'reverse') direction = -1;
    else if (dirCfg === 'both') direction = 1;
    else direction = value >= 0 ? 1 : -1;
    const domain = flow.domain ?? this.config?.domain;
    const flowIndex = this.config?.flows.findIndex((f) => f.id === flow.id) ?? -1;
    const color = resolveFlowColor(
      flow,
      profile,
      domain,
      direction,
      this.config?.domain_colors,
      flowIndex >= 0 ? flowIndex : 0,
    );

    const count = Math.max(
      1,
      Math.round(profile.particle_count_curve ? profile.particle_count_curve(value) : 3),
    );
    const amp = profile.wave_amplitude_curve ? profile.wave_amplitude_curve(value) : 4;

    const style = div.el.style;
    style.setProperty('--flowme-shape', profile.shape);
    style.setProperty('--flowme-color', color);
    style.setProperty('--flowme-glow', profile.glow ? '1' : '0');
    style.setProperty('--flowme-count', String(count));
    style.setProperty('--flowme-radius', String(DEFAULT_DOT_RADIUS));
    style.setProperty('--flowme-line', String(DEFAULT_LINE_WIDTH));
    style.setProperty('--flowme-amp', String(amp));
    style.setProperty('--flowme-direction', String(direction));
    // ANIM-1: transition --flowme-dur smooths speed changes; snap tiny deltas
    const prevDur = this.lastDurMsByFlow.get(flowId) ?? durMs;
    const rounded = Math.round(durMs);
    if (Math.abs(durMs - prevDur) < 50) {
      style.transition = 'none';
      style.setProperty('--flowme-dur', String(rounded));
      const el = div.el;
      requestAnimationFrame(() => {
        el.style.transition = '--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)';
      });
    } else {
      style.setProperty('--flowme-dur', String(rounded));
    }
    this.lastDurMsByFlow.set(flowId, durMs);
    style.animation = `${ANIMATION_NAME} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }

  private profileFor(flow: FlowConfig): FlowProfile {
    return getProfile(flow.domain ?? this.config?.domain);
  }
}
