import type { FlowConfig, FlowProfile, NodePosition, SpeedCurveOverride, ValueGradientConfig } from './types.js';

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
 * Build an SVG path `d` string from a series of percentage positions using
 * the requested line style. Particles follow this path via <animateMotion>
 * <mpath> regardless of style since SVG animateMotion supports all path shapes.
 *
 * - `corner`   — right-angle routing between waypoints (M H V segments)
 * - `diagonal` — straight lines at any angle between waypoints (M L, same as polylineToSvgPath)
 * - `curve`    — smooth cubic Bézier through waypoints using midpoint tangents
 * - `smooth`   — quadratic arc at each waypoint for rounded corners
 */
export function polylineToSvgPathStyled(
  points: readonly NodePosition[],
  size: Size,
  style: 'corner' | 'diagonal' | 'curve' | 'smooth',
): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const p = percentToPixel(points[0]!, size);
    return `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }

  const px = points.map((p) => percentToPixel(p, size));

  if (style === 'diagonal') {
    // Same as polylineToSvgPath — straight lines at any angle
    const parts = [`M ${px[0]!.x.toFixed(2)} ${px[0]!.y.toFixed(2)}`];
    for (let i = 1; i < px.length; i++) {
      parts.push(`L ${px[i]!.x.toFixed(2)} ${px[i]!.y.toFixed(2)}`);
    }
    return parts.join(' ');
  }

  if (style === 'corner') {
    // Right-angle routing: move horizontally then vertically between segments
    const parts = [`M ${px[0]!.x.toFixed(2)} ${px[0]!.y.toFixed(2)}`];
    for (let i = 1; i < px.length; i++) {
      const prev = px[i - 1]!;
      const curr = px[i]!;
      // Go to the corner point (same x as current, same y as previous)
      parts.push(`L ${curr.x.toFixed(2)} ${prev.y.toFixed(2)}`);
      parts.push(`L ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`);
    }
    return parts.join(' ');
  }

  if (style === 'curve') {
    // Catmull-Rom spline converted to cubic Bézier segments.
    // Each segment P[i]→P[i+1] uses the surrounding points to compute
    // tangents so the curve flows smoothly through every waypoint.
    //
    // CP1 = P[i]   + (P[i+1] - P[i-1]) / 6
    // CP2 = P[i+1] - (P[i+2] - P[i])   / 6
    //
    // For the first point, P[-1] is extrapolated as P[0] - (P[1] - P[0])
    // For the last point,  P[n]  is extrapolated as P[n-1] + (P[n-1] - P[n-2])
    const n = px.length;
    // Build augmented array with ghost start/end points for natural tangents
    const curvePts = [
      { x: 2 * px[0]!.x - px[1]!.x, y: 2 * px[0]!.y - px[1]!.y },
      ...px,
      { x: 2 * px[n - 1]!.x - px[n - 2]!.x, y: 2 * px[n - 1]!.y - px[n - 2]!.y },
    ];
    const curveParts = [`M ${px[0]!.x.toFixed(2)} ${px[0]!.y.toFixed(2)}`];
    // curvePts[0] = ghost, curvePts[1] = px[0], curvePts[2] = px[1] …
    for (let i = 1; i < n; i++) {
      const p0 = curvePts[i - 1]!;
      const p1 = curvePts[i]!;
      const p2 = curvePts[i + 1]!;
      const p3 = curvePts[i + 2]!;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      curveParts.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);
    }
    return curveParts.join(' ');
  }

  // style === 'smooth': quadratic arcs at each waypoint for rounded corners
  // Radius is 15% of the shorter segment length, capped at 20px
  const R_RATIO = 0.3;
  const R_MAX = 20;

  const parts = [`M ${px[0]!.x.toFixed(2)} ${px[0]!.y.toFixed(2)}`];
  for (let i = 1; i < px.length; i++) {
    const prev = px[i - 1]!;
    const curr = px[i]!;
    const next = px[i + 1];

    if (!next) {
      // Last segment — straight line to end
      parts.push(`L ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`);
      continue;
    }

    // Segment lengths
    const d1 = Math.sqrt((curr.x - prev.x) ** 2 + (curr.y - prev.y) ** 2);
    const d2 = Math.sqrt((next.x - curr.x) ** 2 + (next.y - curr.y) ** 2);
    const r = Math.min(Math.min(d1, d2) * R_RATIO, R_MAX);

    // Arc entry point (r before curr on the prev→curr segment)
    const t1 = r / (d1 || 1);
    const ex = curr.x - (curr.x - prev.x) * t1;
    const ey = curr.y - (curr.y - prev.y) * t1;

    // Arc exit point (r after curr on the curr→next segment)
    const t2 = r / (d2 || 1);
    const ex2 = curr.x + (next.x - curr.x) * t2;
    const ey2 = curr.y + (next.y - curr.y) * t2;

    parts.push(`L ${ex.toFixed(2)} ${ey.toFixed(2)}`);
    parts.push(`Q ${curr.x.toFixed(2)} ${curr.y.toFixed(2)} ${ex2.toFixed(2)} ${ey2.toFixed(2)}`);
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
 * Resolve the background image URL for the current weather + sun state.
 *
 * Pure function — can be unit-tested without a DOM or HA instance.
 *
 * Lookup chain (SUN-1):
 *  1. When sun is below_horizon and weatherState doesn't already end in '-night',
 *     synthesise `<weatherState>-night` as the lookup key.
 *  2. Exact match for lookupKey in weatherStates.
 *  3. When sun is below horizon, try 'clear-night' as generic night fallback.
 *  4. Fall back to defaultBg.
 */
export function resolveNightBackground(
  weatherState: string,
  sunState: string | undefined,
  weatherStates: Record<string, string> | undefined,
  defaultBg: string,
): string {
  if (!weatherStates) return defaultBg;

  const belowHorizon = sunState === 'below_horizon';

  let lookupKey = weatherState;
  if (belowHorizon && !weatherState.endsWith('-night')) {
    lookupKey = `${weatherState}-night`;
  }

  const match = weatherStates[lookupKey];
  if (match) return match;

  if (belowHorizon && lookupKey !== 'clear-night') {
    const nightFallback = weatherStates['clear-night'];
    if (nightFallback) return nightFallback;
  }

  // Try direct day state when night key wasn't found (so the card isn't blank)
  if (lookupKey !== weatherState) {
    const dayMatch = weatherStates[weatherState];
    if (dayMatch) return dayMatch;
  }

  return defaultBg;
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

// ── Gradient colour interpolation (v1.0.14) ───────────────────────────────

/** Parse a 3- or 6-digit hex colour string to [r, g, b] in 0–255. */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

/** Convert [r, g, b] (0–255) to HSL [h(0–360), s(0–1), l(0–1)]. */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return [h * 60, s, l];
}

function hueToRgb(p: number, q: number, t: number): number {
  let tt = t;
  if (tt < 0) tt += 1;
  if (tt > 1) tt -= 1;
  if (tt < 1 / 6) return p + (q - p) * 6 * tt;
  if (tt < 1 / 2) return q;
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
  return p;
}

/** Convert HSL [h(0–360), s(0–1), l(0–1)] to hex string. */
function hslToHex(h: number, s: number, l: number): string {
  const hn = h / 360;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, hn + 1 / 3);
    g = hueToRgb(p, q, hn);
    b = hueToRgb(p, q, hn - 1 / 3);
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Interpolate between two hex colours in HSL space based on a numeric value.
 *
 * Pure function — safe to call in unit tests without DOM or HA.
 *
 * @param value  Current sensor value
 * @param config ValueGradientConfig with low/high bounds and colours
 * @returns      CSS hex string (e.g. "#a3c4ff")
 */
export function interpolateGradientColor(value: number, config: ValueGradientConfig): string {
  const range = config.high_value - config.low_value;
  const t = range === 0 ? 0 : Math.max(0, Math.min(1, (value - config.low_value) / range));

  const [r1, g1, b1] = hexToRgb(config.low_color);
  const [r2, g2, b2] = hexToRgb(config.high_color);
  const [h1, s1, l1] = rgbToHsl(r1, g1, b1);
  const [h2, s2, l2] = rgbToHsl(r2, g2, b2);

  // Interpolate hue along the short path around the colour wheel
  let dh = h2 - h1;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  const h = ((h1 + dh * t) + 360) % 360;
  const s = lerp(s1, s2, t);
  const l = lerp(l1, l2, t);
  return hslToHex(h, s, l);
}

/** True when the user prefers minimal motion (OS / browser setting). */
export function prefersReducedMotion(): boolean {
  try {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}
