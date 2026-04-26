import type { FlowRenderer } from './types.js';
import { SvgRenderer } from './svg-renderer.js';

/**
 * v0.1 always returns the SVG renderer. v0.2 adds a Houdini path that
 * feature-detects `CSS.paintWorklet` and `CSS.registerProperty` and only
 * falls back to SVG when the browser can't do Houdini.
 */
export function createRenderer(): FlowRenderer {
  return new SvgRenderer();
}
