import type { FlowProfile } from '../types.js';

/**
 * Generic fallback profile. Used when no domain matches (should be rare —
 * every config validates its domain first).
 * Spec §"Default flow profiles → Generic".
 *
 *   dur_ms = max(1000, 5000 - v * 4)
 */
export const genericProfile: FlowProfile = {
  domain: 'generic',
  default_color_positive: '#A78BFA',
  default_color_negative: '#A78BFA',
  shape: 'dot',
  glow: false,
  unit_label: '',
  visibility_threshold: 1,

  speed_curve(value: number): number {
    const magnitude = Math.abs(value);
    return Math.max(1000, 5000 - magnitude * 4);
  },

  describe(value: number): string {
    if (Math.abs(value) >= 100) return value.toFixed(0);
    if (Math.abs(value) >= 10) return value.toFixed(1);
    return value.toFixed(2);
  },
};
