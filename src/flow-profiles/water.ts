import type { FlowProfile } from '../types.js';

/** Water profile — litres per minute. Peak 25 L/min single-meter residential. */
export const waterProfile: FlowProfile = {
  domain: 'water',
  default_color_positive: '#3B82F6',
  default_color_negative: '#F472B6',
  shape: 'dot',
  glow: true,
  unit_label: 'L/min',
  unit_scale: {
    'L/min': 1,
    'l/min': 1,
    L: 1,
    l: 1,
    'm³/h': 1 / 60,
    'm3/h': 1 / 60,
  },
  peak: 25,
  burst_density_multiplier: 1.5,

  describe(value: number): string {
    return `${value.toFixed(1)} L/min`;
  },
};
