import type { FlowProfile } from '../types.js';
import {
  clamp,
  sigmoidSpeedCurve,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
  UNIVERSAL_STEEPNESS,
} from '../utils.js';

/**
 * HVAC profile: wavy ribbon lines with amplitude proportional to CFM.
 *
 * Residential v1.0.6 sigmoid calibration (units: CFM):
 *   threshold =    5 CFM   (below this the fan is basically off)
 *   p50       =  200 CFM   (typical zoned-room circulation rate)
 *   peak      = 3000 CFM   (max residential ducted system at full tilt)
 *
 * Amplitude scales linearly with CFM, clamped to [2, 10] px.
 *
 * Deferred feature: colour shift based on temperature differential
 * between source and destination nodes (needs node-level secondary
 * entities in the config schema).
 */
export const hvacProfile: FlowProfile = {
  domain: 'hvac',
  default_color_positive: '#A78BFA',
  default_color_negative: '#60A5FA',
  shape: 'wave',
  glow: false,
  unit_label: 'CFM',
  threshold: 5,
  p50: 200,
  peak: 3000,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return sigmoidSpeedCurve(value, {
      threshold: 5,
      p50: 200,
      peak: 3000,
      max_duration: UNIVERSAL_MAX_DURATION_MS,
      min_duration: UNIVERSAL_MIN_DURATION_MS,
      steepness: UNIVERSAL_STEEPNESS,
    });
  },

  wave_amplitude_curve(value: number): number {
    const magnitude = Math.abs(value);
    return clamp(2 + magnitude / 100, 2, 10);
  },

  describe(value: number): string {
    return `${Math.round(value)} CFM`;
  },
};
