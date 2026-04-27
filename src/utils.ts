import type { FlowConfig, FlowProfile, NodePosition, SpeedCurveOverride } from './types.js';

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

/** v1.0.6 universal sigmoid speed-curve constants. Every profile shares
 *  the same shape function and only varies the per-domain
 *  `threshold` / `p50` / `peak` calibration. Picked so a residential
 *  dashboard reads as: low values feel like a slow trickle (~9 s per
 *  cycle), the median residential reading feels medium-paced (~3 – 4 s),
 *  saturation feels rapid (~2 s, asymptoting toward 0.7 s but never
 *  reaching — the asymptote is what burst-density mode compensates for). */
export const UNIVERSAL_MAX_DURATION_MS = 9000;
export const UNIVERSAL_MIN_DURATION_MS = 700;
export const UNIVERSAL_STEEPNESS = 1.5;

/**
 * Resolved sigmoid curve parameters — what the renderer actually feeds
 * into `sigmoidSpeedCurve`. Built by layering, in order:
 *   1. The per-flow `speed_curve_override` (highest precedence).
 *   2. The legacy per-flow `flow.threshold` shortcut (threshold only).
 *   3. The active profile's `threshold` / `p50` / `peak`.
 *   4. The universal constants for `max_duration` / `min_duration` /
 *      `steepness` when neither override nor profile fixes them.
 */
export interface ResolvedSpeedCurveParams {
  threshold: number;
  p50: number;
  peak: number;
  max_duration: number;
  min_duration: number;
  steepness: number;
}

/**
 * Universal sigmoid speed curve. Maps a sensor magnitude to a one-cycle
 * animation duration in milliseconds:
 *
 *   v      = max(|value|, threshold)               // floor away the log10(0) singularity
 *   ratio  = log10(v / p50)                        // log-distance from median, signed
 *   factor = 1 / (1 + exp(-steepness * ratio))     // logistic, 0.5 at v == p50
 *   ms     = max_duration - factor * (max_duration - min_duration)
 *
 * Asymptotic behaviour matches the spec — values > peak keep getting
 * faster but never reach `min_duration`, which is what burst-mode
 * particle density compensates for at saturation. Values < threshold
 * are clamped (the renderer hides them via the visibility check first
 * anyway).
 */
export function sigmoidSpeedCurve(
  value: number,
  params: ResolvedSpeedCurveParams,
): number {
  const { threshold, p50, max_duration, min_duration, steepness } = params;
  const magnitude = Math.abs(value);
  // Defensive — degenerate calibrations (non-positive p50 / threshold)
  // collapse the curve to its slowest duration.
  if (!(p50 > 0) || !(threshold > 0)) return max_duration;
  const v = Math.max(magnitude, threshold);
  const ratio = Math.log10(v / p50);
  const factor = 1 / (1 + Math.exp(-steepness * ratio));
  return max_duration - factor * (max_duration - min_duration);
}

/**
 * Build the effective {@link ResolvedSpeedCurveParams} for a flow. The
 * fallback chain is documented on `ResolvedSpeedCurveParams`. This
 * helper is the *only* place override layering happens — both renderers
 * call it and any future renderer should as well.
 */
export function resolveSpeedCurveParams(
  flow: Pick<FlowConfig, 'threshold' | 'speed_curve_override'>,
  profile: Pick<FlowProfile, 'threshold' | 'p50' | 'peak'>,
): ResolvedSpeedCurveParams {
  const o: SpeedCurveOverride = flow.speed_curve_override ?? {};
  // Legacy `flow.threshold` is honoured as a shortcut for
  // `speed_curve_override.threshold`. Override field still wins.
  const threshold = o.threshold ?? flow.threshold ?? profile.threshold;
  const p50 = o.p50 ?? profile.p50;
  const peak = o.peak ?? profile.peak;
  const max_duration = o.max_duration ?? UNIVERSAL_MAX_DURATION_MS;
  const min_duration = o.min_duration ?? UNIVERSAL_MIN_DURATION_MS;
  const steepness = o.steepness ?? UNIVERSAL_STEEPNESS;
  return { threshold, p50, peak, max_duration, min_duration, steepness };
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
