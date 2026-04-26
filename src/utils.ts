import type { NodePosition } from './types.js';

export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export interface Size {
  width: number;
  height: number;
}

export function percentToPixel(p: NodePosition, size: Size): { x: number; y: number } {
  return { x: (p.x / 100) * size.width, y: (p.y / 100) * size.height };
}

export function pixelToPercent(px: { x: number; y: number }, size: Size): NodePosition {
  return { x: (px.x / size.width) * 100, y: (px.y / size.height) * 100 };
}

/**
 * Total length of a polyline in percentage-space units, assuming unit aspect.
 * For pixel length, multiply each segment by the actual container dimensions.
 */
export function pathLengthPercent(points: readonly NodePosition[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return total;
}

/**
 * Sample a polyline at `progress` in [0, 1]. Returns the interpolated point.
 */
export function pointAtProgress(
  points: readonly NodePosition[],
  progress: number,
): NodePosition {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return { ...(points[0] as NodePosition) };
  const total = pathLengthPercent(points);
  const target = clamp(progress, 0, 1) * total;
  let travelled = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1] as NodePosition;
    const b = points[i] as NodePosition;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const segLen = Math.sqrt(dx * dx + dy * dy);
    if (travelled + segLen >= target) {
      const t = segLen === 0 ? 0 : (target - travelled) / segLen;
      return { x: a.x + dx * t, y: a.y + dy * t };
    }
    travelled += segLen;
  }
  return { ...(points[points.length - 1] as NodePosition) };
}

/**
 * Build an SVG path `d` attribute from a polyline expressed as NodePositions
 * (0-100 percentages), rendered into a viewBox with the given dimensions.
 */
export function polylineToSvgPath(points: readonly NodePosition[], size: Size): string {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  if (!first) return '';
  const f = percentToPixel(first, size);
  const parts: string[] = [`M ${f.x.toFixed(2)} ${f.y.toFixed(2)}`];
  for (const p of rest) {
    const pt = percentToPixel(p, size);
    parts.push(`L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`);
  }
  return parts.join(' ');
}

/**
 * Parse a numeric-ish sensor state. HA state strings may be 'unavailable',
 * 'unknown', plain numbers, or numbers with units. Return 0 for anything
 * that isn't a finite parseable number.
 */
export function parseSensorValue(raw: string | number | null | undefined): number {
  if (raw == null) return 0;
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : 0;
  const trimmed = raw.trim();
  if (!trimmed || trimmed === 'unavailable' || trimmed === 'unknown') return 0;
  const n = Number.parseFloat(trimmed);
  return Number.isFinite(n) ? n : 0;
}

/** v1.0.5 universal speed-curve bounds. Every profile uses the same
 *  shape function and only varies the per-domain `domain_min` / `domain_max`
 *  calibration. Residential dashboards need the slowest visible flow to
 *  still feel alive (hence 4500 ms — not 8000 ms like pre-1.0.5) and the
 *  fastest to look brisk without blurring (600 ms). */
export const UNIVERSAL_MAX_DURATION_MS = 4500;
export const UNIVERSAL_MIN_DURATION_MS = 600;

/**
 * Shared logarithmic speed-curve shape. Produces a one-cycle animation
 * duration in milliseconds given a sensor value and the profile's
 * calibration range.
 *
 *   speed_factor = log10(value / domain_min) / log10(domain_max / domain_min)
 *   duration_ms  = max_duration - speed_factor * (max_duration - min_duration)
 *
 * Clamped so values at or below `domainMin` produce `maxDurationMs` (slowest
 * visible flow), and values at or above `domainMax` produce `minDurationMs`
 * (fastest). Logarithmic scaling means mid-range values spread out evenly
 * across the dashboard's residential operating envelope rather than
 * clustering at one extreme, which is what happens with a linear curve.
 */
export function logCurveDuration(
  value: number,
  domainMin: number,
  domainMax: number,
  maxDurationMs: number = UNIVERSAL_MAX_DURATION_MS,
  minDurationMs: number = UNIVERSAL_MIN_DURATION_MS,
): number {
  const magnitude = Math.abs(value);
  if (!(domainMax > domainMin) || domainMin <= 0) {
    // Defensive — shouldn't happen for well-formed profiles.
    return maxDurationMs;
  }
  if (magnitude <= domainMin) return maxDurationMs;
  if (magnitude >= domainMax) return minDurationMs;
  const speedFactor =
    Math.log10(magnitude / domainMin) / Math.log10(domainMax / domainMin);
  return maxDurationMs - speedFactor * (maxDurationMs - minDurationMs);
}

/**
 * Scale a sensor value into the profile's base unit using the profile's
 * `unit_scale` map. Matching is **exact-first, then case-insensitive** —
 * exact is required because some SI unit pairs only differ by case
 * (milliwatt `mW` vs megawatt `MW`, picking the wrong one is a 1e9 error).
 * Once no exact match exists, a case-insensitive lookup helps tolerate
 * HA locales that report `KW` or `kw` for kilowatt. An unknown or missing
 * unit leaves the value untouched so v1.0.2 configs that implicitly fed
 * watts keep working.
 *
 * Returns the scale factor alongside the scaled value so callers can log
 * exactly which unit was matched and what multiplier was applied — this
 * is what the `[FlowMe]` debug channel shows next to every `updateFlow`.
 */
export function scaleSensorValue(
  value: number,
  unitAttr: string | undefined,
  scaleMap: Readonly<Record<string, number>> | undefined,
): { value: number; factor: number; matchedUnit?: string } {
  if (!scaleMap || !unitAttr) return { value, factor: 1 };
  const target = unitAttr.trim();
  if (!target) return { value, factor: 1 };
  // Exact match first (preserves mW vs MW semantics).
  if (Object.prototype.hasOwnProperty.call(scaleMap, target)) {
    const factor = scaleMap[target] ?? 1;
    return { value: value * factor, factor, matchedUnit: target };
  }
  // Case-insensitive fallback only if unambiguous — if the lowercased
  // target matches multiple keys (e.g. both `MW` and `mW` would
  // lowercase to `mw`), give up rather than guess.
  const targetLower = target.toLowerCase();
  const ciMatches = Object.entries(scaleMap).filter(
    ([k]) => k.toLowerCase() === targetLower,
  );
  if (ciMatches.length === 1) {
    const [k, factor] = ciMatches[0]!;
    return { value: value * factor, factor, matchedUnit: k };
  }
  return { value, factor: 1 };
}

/**
 * Light debounce helper. Accumulates calls inside `wait` ms and fires once
 * with the most recent args. `cancel()` drops any pending trailing call.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number,
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const wrapped = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (lastArgs) fn(...lastArgs);
      lastArgs = null;
    }, wait);
  }) as T & { cancel: () => void };

  wrapped.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
  };

  return wrapped;
}

/**
 * Parse an `aspect_ratio` string like '16:10'. Returns the numeric ratio
 * width/height, or undefined if the string doesn't parse.
 */
export function parseAspectRatio(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = /^(\d+):(\d+)$/.exec(value);
  if (!match) return undefined;
  const w = Number.parseInt(match[1] as string, 10);
  const h = Number.parseInt(match[2] as string, 10);
  if (!w || !h) return undefined;
  return w / h;
}
