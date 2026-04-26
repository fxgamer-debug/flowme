import type { FlowProfile } from '../types.js';
import { clamp, logCurveDuration } from '../utils.js';

/**
 * Network profile: discrete square packets. Both speed and density scale
 * with throughput — residential ISPs span four decades (0.1 Mbps lurking
 * background traffic → 10 000 Mbps fibre peak), so the universal log curve
 * is particularly well suited here.
 *
 * Residential calibration (v1.0.5):
 *   speed_range_min = 0.1 Mbps     (idle background chatter)
 *   speed_range_max = 10 000 Mbps  (10 Gbps — high-end residential fibre)
 */
export const networkProfile: FlowProfile = {
  domain: 'network',
  default_color_positive: '#10B981',
  default_color_negative: '#F59E0B',
  shape: 'square',
  glow: false,
  unit_label: 'Mbps',
  speed_range_min: 0.1,
  speed_range_max: 10_000,
  visibility_threshold: 0.1,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return logCurveDuration(value, 0.1, 10_000);
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
