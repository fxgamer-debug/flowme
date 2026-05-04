import type { FlowProfile } from '../types.js';

/**
 * Energy profile — watts to animation speed (linear v2.2+).
 * Peak 5 kW typical residential import/export.
 */
export const energyProfile: FlowProfile = {
  domain: 'energy',
  default_color_positive: '#FFD700',
  default_color_negative: '#4ADE80',
  shape: 'dot',
  glow: true,
  unit_label: 'W',
  unit_scale: {
    W: 1,
    Wh: 1,
    kW: 1000,
    kWh: 1000,
    MW: 1_000_000,
    mW: 1e-3,
  },
  peak: 5000,
  burst_density_multiplier: 1.5,

  describe(value: number): string {
    const magnitude = Math.abs(value);
    if (magnitude >= 1000) {
      return `${(value / 1000).toFixed(2)} kW`;
    }
    return `${Math.round(value)} W`;
  },
};
