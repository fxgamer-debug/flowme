import type { FlowProfile } from '../types.js';

/** Gas / volumetric flow — m³/h. Peak 5 m³/h residential boiler. */
export const gasProfile: FlowProfile = {
  domain: 'gas',
  default_color_positive: '#FBBF24',
  default_color_negative: '#F97316',
  shape: 'dot',
  glow: true,
  unit_label: 'm³/h',
  unit_scale: {
    'm³/h': 1,
    'm3/h': 1,
  },
  peak: 5,
  burst_density_multiplier: 1.5,

  describe(value: number): string {
    return `${value.toFixed(2)} m³/h`;
  },
};
