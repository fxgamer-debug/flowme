import type { FlowProfile } from '../types.js';
import { clamp } from '../utils.js';

/**
 * Water profile: continuous wave-like fluid effect on a thick line.
 * Spec §"Default flow profiles → Water".
 *
 * Speed: `dur_ms = clamp(6000 - v*200, 800, 6000)` for v in L/min.
 * Wave amplitude is a constant 4px (spec).
 */
export const waterProfile: FlowProfile = {
  domain: 'water',
  default_color_positive: '#3B82F6',
  default_color_negative: '#3B82F6',
  shape: 'wave',
  glow: false,
  unit_label: 'L/min',
  visibility_threshold: 0.5,

  speed_curve(value: number): number {
    const magnitude = Math.abs(value);
    return clamp(6000 - magnitude * 200, 800, 6000);
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
