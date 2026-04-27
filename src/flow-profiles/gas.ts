import type { FlowProfile } from '../types.js';
import {
  sigmoidSpeedCurve,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
  UNIVERSAL_STEEPNESS,
} from '../utils.js';

/**
 * Gas profile: slow expanding-circle pulse along the path.
 *
 * Residential v1.0.6 sigmoid calibration (units: m³/h):
 *   threshold = 0.005    (pilot light / idle boiler standby)
 *   p50       = 0.5      (typical hob burner + DHW pre-heat)
 *   peak      = 10       (full-tilt central heating + cooker)
 */
export const gasProfile: FlowProfile = {
  domain: 'gas',
  default_color_positive: '#FB923C',
  // v1.0.5: previously identical to positive. Darker amber stays in the
  // warm/combustion family so the hue still reads as "gas" but clearly
  // signals reverse flow (rarely meaningful in residential settings, but
  // necessary so a pulse-shape flow isn't ambiguous when sign flips).
  default_color_negative: '#A16207',
  shape: 'pulse',
  glow: true,
  unit_label: 'm³/h',
  threshold: 0.005,
  p50: 0.5,
  peak: 10,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return sigmoidSpeedCurve(value, {
      threshold: 0.005,
      p50: 0.5,
      peak: 10,
      max_duration: UNIVERSAL_MAX_DURATION_MS,
      min_duration: UNIVERSAL_MIN_DURATION_MS,
      steepness: UNIVERSAL_STEEPNESS,
    });
  },

  describe(value: number): string {
    if (Math.abs(value) >= 10) return `${value.toFixed(1)} m³/h`;
    return `${value.toFixed(2)} m³/h`;
  },
};
