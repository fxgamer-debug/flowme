import type { FlowProfile } from '../types.js';
import {
  sigmoidSpeedCurve,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
  UNIVERSAL_STEEPNESS,
} from '../utils.js';

/**
 * Water profile: continuous wave-like fluid effect on a thick line.
 *
 * Residential v1.0.6 sigmoid calibration (units: L/min):
 *   threshold = 0.3   (drip / low-flow bathroom tap)
 *   p50       = 6     (kitchen tap full open)
 *   peak      = 60    (shower + washing machine combined; mains supply)
 *
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
  threshold: 0.3,
  p50: 6,
  peak: 60,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return sigmoidSpeedCurve(value, {
      threshold: 0.3,
      p50: 6,
      peak: 60,
      max_duration: UNIVERSAL_MAX_DURATION_MS,
      min_duration: UNIVERSAL_MIN_DURATION_MS,
      steepness: UNIVERSAL_STEEPNESS,
    });
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
