import type { FlowProfile } from '../types.js';
import { clamp, logCurveDuration } from '../utils.js';

/**
 * HVAC profile: wavy ribbon lines with amplitude proportional to CFM.
 *
 * Residential calibration (v1.0.5):
 *   speed_range_min =   10 CFM   (below this the fan is basically off)
 *   speed_range_max = 2000 CFM   (max residential ducted system)
 * Amplitude scales linearly with CFM, clamped to [2, 10] px.
 *
 * Deferred feature: colour shift based on temperature differential between
 * source and destination nodes (needs node-level secondary entities in the
 * config schema).
 */
export const hvacProfile: FlowProfile = {
  domain: 'hvac',
  default_color_positive: '#A78BFA',
  default_color_negative: '#60A5FA',
  shape: 'wave',
  glow: false,
  unit_label: 'CFM',
  speed_range_min: 10,
  speed_range_max: 2000,
  visibility_threshold: 10,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return logCurveDuration(value, 10, 2000);
  },

  wave_amplitude_curve(value: number): number {
    const magnitude = Math.abs(value);
    return clamp(2 + magnitude / 100, 2, 10);
  },

  describe(value: number): string {
    return `${Math.round(value)} CFM`;
  },
};
