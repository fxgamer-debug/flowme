import type { FlowRenderer, FlowRendererKind } from './types.js';
import { SvgRenderer } from './svg-renderer.js';
import { HoudiniRenderer } from './houdini-renderer.js';
import { dlog } from '../debug-log.js';

/**
 * Pick the best renderer available.
 *
 * v1.0.2 changed the default from "auto-select Houdini if supported" to
 * "always SVG unless the user explicitly opts in". Reason: in Home
 * Assistant's Chromium embed the paint-worklet API is reported as
 * supported but CSP / blob-URL handling often silently blocks the
 * painter from registering, leaving flows completely invisible with no
 * console error. SVG + animateMotion renders the same shapes with 100%
 * reliability across every browser HA ships to.
 *
 * To opt into the Houdini renderer (for perf experiments / advanced
 * shapes), append `?flowme_renderer=houdini` to the dashboard URL.
 * `?flowme_renderer=svg` also works to force the default when needed.
 */
export function createRenderer(): FlowRenderer {
  const override = readRendererOverride();
  const kind: FlowRendererKind = override ?? 'svg';
  const houdiniAvailable = hasHoudiniSupport();

  dlog(
    'renderer selected:',
    kind === 'houdini' ? 'HoudiniRenderer' : 'SvgRenderer',
    '| override=', override ?? '(none)',
    '| Houdini available:', houdiniAvailable,
    '| paintWorklet in CSS?', typeof CSS !== 'undefined' && 'paintWorklet' in CSS,
  );

  if (kind === 'houdini') {
    if (!houdiniAvailable) {
      dlog('?flowme_renderer=houdini requested but unsupported — falling back to SVG');
      return new SvgRenderer();
    }
    return new HoudiniRenderer();
  }

  return new SvgRenderer();
}

function hasHoudiniSupport(): boolean {
  try {
    const cssApi = CSS as unknown as {
      paintWorklet?: unknown;
      registerProperty?: unknown;
    };
    return 'paintWorklet' in cssApi && 'registerProperty' in cssApi;
  } catch {
    return false;
  }
}

function readRendererOverride(): FlowRendererKind | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('flowme_renderer');
    if (raw === 'svg' || raw === 'houdini') return raw;
  } catch {
    // SSR / sandboxed contexts
  }
  return null;
}
