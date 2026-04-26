import type { FlowProfile } from '../types.js';
import { logCurveDuration } from '../utils.js';

/**
 * Gas profile: slow expanding-circle pulse along the path.
 *
 * Residential calibration (v1.0.5):
 *   speed_range_min = 0.01 m³/h  (pilot light / idle boiler)
 *   speed_range_max = 10   m³/h  (full-tilt central heating + cooker)
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
  speed_range_min: 0.01,
  speed_range_max: 10,
  visibility_threshold: 0.01,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return logCurveDuration(value, 0.01, 10);
  },

  describe(value: number): string {
    if (Math.abs(value) >= 10) return `${value.toFixed(1)} m³/h`;
    return `${value.toFixed(2)} m³/h`;
  },
};
