import type { FlowProfile } from '../types.js';

/** Generic fallback — dimensionless peak 100. */
export const genericProfile: FlowProfile = {
  domain: 'generic',
  default_color_positive: '#A78BFA',
  default_color_negative: '#34D399',
  shape: 'dot',
  glow: false,
  unit_label: '',
  peak: 100,
  burst_density_multiplier: 1.5,

  describe(value: number): string {
    if (Math.abs(value) >= 100) return value.toFixed(0);
    if (Math.abs(value) >= 10) return value.toFixed(1);
    return value.toFixed(2);
  },
};
