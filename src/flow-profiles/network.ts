import type { FlowProfile } from '../types.js';
import { clamp } from '../utils.js';

/**
 * Network profile: discrete square packets. Speed is constant 1500 ms per
 * packet; density varies with throughput. Spec §"Default flow profiles → Network".
 *
 *   packet_count = clamp(1 + log10(value + 1) * 4, 1, 20)
 */
export const networkProfile: FlowProfile = {
  domain: 'network',
  default_color_positive: '#10B981',
  default_color_negative: '#F59E0B',
  shape: 'square',
  glow: false,
  unit_label: 'Mbps',
  visibility_threshold: 0.1,

  speed_curve(_value: number): number {
    return 1500;
  },

  particle_count_curve(value: number): number {
    const magnitude = Math.abs(value);
    return Math.round(clamp(1 + Math.log10(magnitude + 1) * 4, 1, 20));
  },

  describe(value: number): string {
    const magnitude = Math.abs(value);
    if (magnitude >= 1000) return `${(value / 1000).toFixed(2)} Gbps`;
    if (magnitude >= 10) return `${value.toFixed(1)} Mbps`;
    return `${value.toFixed(2)} Mbps`;
  },
};
