import type { FlowProfile } from '../types.js';
import { clamp } from '../utils.js';

/**
 * Gas profile: slow expanding-circle pulse along the path.
 * Spec §"Default flow profiles → Gas".
 *
 *   dur_ms = clamp(10000 - v*50000, 2000, 10000)
 */
export const gasProfile: FlowProfile = {
  domain: 'gas',
  default_color_positive: '#FB923C',
  default_color_negative: '#FB923C',
  shape: 'pulse',
  glow: true,
  unit_label: 'm³/h',
  visibility_threshold: 0.01,

  speed_curve(value: number): number {
    const magnitude = Math.abs(value);
    return clamp(10000 - magnitude * 50000, 2000, 10000);
  },

  describe(value: number): string {
    if (Math.abs(value) >= 10) return `${value.toFixed(1)} m³/h`;
    return `${value.toFixed(2)} m³/h`;
  },
};
