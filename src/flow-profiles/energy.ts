import type { FlowProfile } from '../types.js';
import { logCurveDuration } from '../utils.js';

/**
 * Energy profile: dot trail, glow, watts to speed.
 *
 * **Calibrated for residential loads** (v1.0.5). The universal log-curve
 * shape maps the calibration range `[speed_range_min, speed_range_max]`
 * to the universal duration bounds `[4500 ms, 600 ms]`. For energy:
 *
 *   speed_range_min = 50 W     (hides small idle loads — bulbs, routers)
 *   speed_range_max = 10 000 W (whole-house peak — EV charging, showers)
 *
 * Resulting anchor points:
 *   ≤ 50 W     → 4500 ms (slowest visible flow; a living pulse, not static)
 *     100 W    → ~3950 ms
 *     500 W    → ~2720 ms
 *     1 000 W  → ~2180 ms
 *     5 000 W  → ~1185 ms
 *   ≥ 10 000 W → 600 ms (fastest)
 *   ≥ 9 000 W sustained → burst density (1.5× particles) after 5 s
 *
 * Inputs are always WATTS. kW / MW / mW sensors are auto-scaled via
 * `unit_scale` before they reach the curve (v1.0.4+).
 */
export const energyProfile: FlowProfile = {
  domain: 'energy',
  default_color_positive: '#FFD700',
  default_color_negative: '#4ADE80',
  shape: 'dot',
  glow: true,
  unit_label: 'W',
  unit_scale: {
    W: 1,
    Wh: 1,
    kW: 1000,
    kWh: 1000,
    MW: 1_000_000,
    mW: 1e-3,
  },
  speed_range_min: 50,
  speed_range_max: 10_000,
  // Defaults to speed_range_min — sensors reporting below 50 W are
  // considered idle / noise and the flow is hidden. Users who want to
  // show phantom-load flows (e.g. a 6 W router) can set a lower per-flow
  // `threshold:` in YAML.
  visibility_threshold: 50,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return logCurveDuration(value, 50, 10_000);
  },

  describe(value: number): string {
    const magnitude = Math.abs(value);
    if (magnitude >= 1000) {
      return `${(value / 1000).toFixed(2)} kW`;
    }
    return `${Math.round(value)} W`;
  },
};
