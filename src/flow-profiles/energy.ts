import type { FlowProfile } from '../types.js';
import {
  sigmoidSpeedCurve,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
  UNIVERSAL_STEEPNESS,
} from '../utils.js';

/**
 * Energy profile: dot trail, glow, watts to speed.
 *
 * Residential v1.0.6 sigmoid calibration (units: W):
 *   threshold =    30 W   (idle / phantom-load cut-off)
 *   p50       =   800 W   (typical fridge + a few standby loads)
 *   peak      = 10 000 W  (whole-house peak — EV charging, induction hob, kettle)
 *
 * Resulting anchor points (universal max=9000 ms, min=700 ms, k=1.5):
 *   ≤ 30 W      → ~8125 ms (threshold floor — slow visible trickle)
 *     100 W     → ~7000 ms
 *     800 W     →  4850 ms (median, exactly half the duration span)
 *   5 000 W     → ~2700 ms
 *  ≥ 9 000 W sustained → burst density (1.5× particles) after 5 s
 *  10 000 W     → ~2050 ms (sigmoid asymptotes toward 700 ms but never reaches)
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
  threshold: 30,
  p50: 800,
  peak: 10_000,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return sigmoidSpeedCurve(value, {
      threshold: 30,
      p50: 800,
      peak: 10_000,
      max_duration: UNIVERSAL_MAX_DURATION_MS,
      min_duration: UNIVERSAL_MIN_DURATION_MS,
      steepness: UNIVERSAL_STEEPNESS,
    });
  },

  describe(value: number): string {
    const magnitude = Math.abs(value);
    if (magnitude >= 1000) {
      return `${(value / 1000).toFixed(2)} kW`;
    }
    return `${Math.round(value)} W`;
  },
};
