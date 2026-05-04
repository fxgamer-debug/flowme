import type { FlowProfile } from '../types.js';

/**
 * Network profile — throughput. Peak 100 Mbps (typical residential broadband).
 */
export const networkProfile: FlowProfile = {
  domain: 'network',
  default_color_positive: '#22C55E',
  default_color_negative: '#F87171',
  shape: 'dot',
  glow: true,
  unit_label: 'Mbps',
  unit_scale: {
    Mbps: 1,
    MBps: 8,
    'Mbit/s': 1,
    'Mibit/s': 1,
    Gbps: 1000,
    'Gbit/s': 1000,
    Kbps: 0.001,
    'Kbit/s': 0.001,
    bps: 1e-6,
  },
  peak: 100,
  burst_density_multiplier: 1.5,

  particle_count_curve: (v: number) => {
    const m = Math.abs(v);
    if (m < 0.1) return 1;
    if (m < 1) return 2;
    if (m < 5) return 3;
    if (m < 20) return 4;
    if (m < 100) return 5;
    return 6;
  },

  describe(value: number): string {
    const m = Math.abs(value);
    if (m >= 1000) {
      return `${(value / 1000).toFixed(2)} Gbps`;
    }
    if (m >= 1) {
      return `${value.toFixed(1)} Mbps`;
    }
    return `${(value * 1000).toFixed(0)} Kbps`;
  },
};
