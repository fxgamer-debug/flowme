import type { EdgeMap } from './types.js';

/**
 * Image-processing primitives for the auto-router. All functions are pure,
 * take plain Uint8ClampedArray pixel buffers, and do no DOM work — they can
 * run unchanged in a web worker when we later add one.
 */

export const MAX_DOWNSCALE_WIDTH = 480;
export const MAX_DOWNSCALE_HEIGHT = 270;
export const EDGE_THRESHOLD = 30;

export interface DownscaleDims {
  width: number;
  height: number;
}

/**
 * Fit a source image into the downscale bounding box while preserving its
 * aspect ratio. Always rounds down to integers ≥ 1.
 */
export function computeDownscaleDims(
  naturalWidth: number,
  naturalHeight: number,
  maxWidth = MAX_DOWNSCALE_WIDTH,
  maxHeight = MAX_DOWNSCALE_HEIGHT,
): DownscaleDims {
  if (naturalWidth <= 0 || naturalHeight <= 0) return { width: 1, height: 1 };
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1);
  return {
    width: Math.max(1, Math.floor(naturalWidth * scale)),
    height: Math.max(1, Math.floor(naturalHeight * scale)),
  };
}

/**
 * Convert interleaved RGBA data to a single-channel luminance buffer.
 * Uses Rec. 709 coefficients (0.2126R + 0.7152G + 0.0722B).
 */
export function greyscale(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(width * height);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j++) {
    const r = rgba[i] ?? 0;
    const g = rgba[i + 1] ?? 0;
    const b = rgba[i + 2] ?? 0;
    out[j] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  return out;
}

/**
 * Separable 3×3 Gaussian blur (σ ≈ 1). Kernel [1, 2, 1] / 4 applied
 * horizontally then vertically. Single-channel input/output.
 */
export function gaussianBlur3x3(
  src: Uint8ClampedArray,
  width: number,
  height: number,
): Uint8ClampedArray {
  const tmp = new Uint8ClampedArray(src.length);
  // horizontal
  for (let y = 0; y < height; y++) {
    const row = y * width;
    for (let x = 0; x < width; x++) {
      const l = src[row + Math.max(0, x - 1)] ?? 0;
      const c = src[row + x] ?? 0;
      const r = src[row + Math.min(width - 1, x + 1)] ?? 0;
      tmp[row + x] = (l + 2 * c + r) >> 2;
    }
  }
  const out = new Uint8ClampedArray(src.length);
  // vertical
  for (let y = 0; y < height; y++) {
    const row = y * width;
    const up = Math.max(0, y - 1) * width;
    const down = Math.min(height - 1, y + 1) * width;
    for (let x = 0; x < width; x++) {
      const a = tmp[up + x] ?? 0;
      const b = tmp[row + x] ?? 0;
      const c = tmp[down + x] ?? 0;
      out[row + x] = (a + 2 * b + c) >> 2;
    }
  }
  return out;
}

/**
 * Sobel Gx / Gy followed by |G| = √(Gx² + Gy²) clamped to 0..255.
 * Pixels whose magnitude is below {@link EDGE_THRESHOLD} are zeroed so
 * the subsequent grid builder doesn't latch onto random sensor noise.
 */
export function sobelMagnitude(
  src: Uint8ClampedArray,
  width: number,
  height: number,
): EdgeMap {
  const out = new Uint8ClampedArray(width * height);
  // iterate inner pixels; border stays zero
  for (let y = 1; y < height - 1; y++) {
    const r0 = (y - 1) * width;
    const r1 = y * width;
    const r2 = (y + 1) * width;
    for (let x = 1; x < width - 1; x++) {
      const tl = src[r0 + (x - 1)] ?? 0;
      const tc = src[r0 + x] ?? 0;
      const tr = src[r0 + (x + 1)] ?? 0;
      const ml = src[r1 + (x - 1)] ?? 0;
      const mr = src[r1 + (x + 1)] ?? 0;
      const bl = src[r2 + (x - 1)] ?? 0;
      const bc = src[r2 + x] ?? 0;
      const br = src[r2 + (x + 1)] ?? 0;

      // Sobel Gx, Gy
      const gx = -tl - 2 * ml - bl + tr + 2 * mr + br;
      const gy = -tl - 2 * tc - tr + bl + 2 * bc + br;
      let mag = Math.sqrt(gx * gx + gy * gy);
      if (mag < EDGE_THRESHOLD) mag = 0;
      if (mag > 255) mag = 255;
      out[r1 + x] = mag;
    }
  }
  return { width, height, data: out };
}

/**
 * Given a drawable source, draw it downscaled into a canvas and return the
 * RGBA pixel buffer. Caller is responsible for ensuring the source is
 * decoded and CORS-safe.
 */
export function readDownscaledPixels(
  source: CanvasImageSource,
  naturalWidth: number,
  naturalHeight: number,
): { width: number; height: number; rgba: Uint8ClampedArray } {
  const dims = computeDownscaleDims(naturalWidth, naturalHeight);
  const canvas = document.createElement('canvas');
  canvas.width = dims.width;
  canvas.height = dims.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2D canvas unavailable');
  ctx.drawImage(source, 0, 0, dims.width, dims.height);
  try {
    const imageData = ctx.getImageData(0, 0, dims.width, dims.height);
    return { width: dims.width, height: dims.height, rgba: imageData.data };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const next = new Error(
      `Canvas was tainted by cross-origin image (${msg}). ` +
        'Serve the background from the same origin or enable CORS.',
    );
    (next as Error & { cause?: unknown }).cause = err;
    throw next;
  }
}

/** One-shot: source → downscaled edge map. */
export function buildEdgeMap(
  source: CanvasImageSource,
  naturalWidth: number,
  naturalHeight: number,
): EdgeMap {
  const { width, height, rgba } = readDownscaledPixels(source, naturalWidth, naturalHeight);
  const grey = greyscale(rgba, width, height);
  const blurred = gaussianBlur3x3(grey, width, height);
  return sobelMagnitude(blurred, width, height);
}
