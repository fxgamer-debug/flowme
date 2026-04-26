import type { FlowProfile } from '../types.js';
import { logCurveDuration } from '../utils.js';

/**
 * Water profile: continuous wave-like fluid effect on a thick line.
 *
 * Residential calibration (v1.0.5):
 *   speed_range_min = 0.5 L/min  (drip / low-flow bathroom tap)
 *   speed_range_max = 50 L/min   (shower + washing machine combined)
 * Wave amplitude is a constant 4 px.
 */
export const waterProfile: FlowProfile = {
  domain: 'water',
  default_color_positive: '#3B82F6',
  // v1.0.5: previously identical to positive, meaning bidirectional water
  // flows (mains supply vs greywater return) were visually indistinguishable
  // except for the direction of motion along the path. Cyan sits in the
  // same domain family so negative still reads as "water", just flipped.
  default_color_negative: '#06B6D4',
  shape: 'wave',
  glow: false,
  unit_label: 'L/min',
  speed_range_min: 0.5,
  speed_range_max: 50,
  visibility_threshold: 0.5,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return logCurveDuration(value, 0.5, 50);
  },

  wave_amplitude_curve(_value: number): number {
    return 4;
  },

  describe(value: number): string {
    if (Math.abs(value) >= 100) return `${value.toFixed(0)} L/min`;
    if (Math.abs(value) >= 10) return `${value.toFixed(1)} L/min`;
    return `${value.toFixed(2)} L/min`;
  },
};
