import type { FlowRenderer } from './types.js';
import { SvgRenderer } from './svg-renderer.js';
import { HoudiniRenderer } from './houdini-renderer.js';

/**
 * Pick the best renderer available. v0.2 prefers the Houdini Paint Worklet
 * renderer when the browser supports both `CSS.paintWorklet` and
 * `CSS.registerProperty`. Otherwise we fall back to the native SVG renderer.
 *
 * The factory can be forced via `?flowme_renderer=svg` in the document URL —
 * handy for debugging or users on Houdini-capable browsers who prefer the
 * fallback.
 */
export function createRenderer(): FlowRenderer {
  const override = readRendererOverride();
  if (override === 'svg') return new SvgRenderer();
  if (override === 'houdini') return new HoudiniRenderer();

  if (hasHoudiniSupport()) {
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

function readRendererOverride(): 'svg' | 'houdini' | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('flowme_renderer');
    if (raw === 'svg' || raw === 'houdini') return raw;
  } catch {
    // SSR / sandboxed contexts
  }
  return null;
}
