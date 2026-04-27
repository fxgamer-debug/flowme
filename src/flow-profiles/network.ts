import type { FlowProfile } from '../types.js';
import {
  clamp,
  sigmoidSpeedCurve,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
  UNIVERSAL_STEEPNESS,
} from '../utils.js';

/**
 * Network profile: discrete square packets. Both speed and density scale
 * with throughput.
 *
 * Residential v1.0.6 sigmoid calibration (units: Mbps):
 *   threshold = 0.05    (idle background chatter cut-off)
 *   p50       = 50      (typical streaming + browsing combined)
 *   peak      = 10 000  (10 Gbps — high-end residential fibre)
 */
export const networkProfile: FlowProfile = {
  domain: 'network',
  default_color_positive: '#10B981',
  default_color_negative: '#F59E0B',
  shape: 'square',
  glow: false,
  unit_label: 'Mbps',
  threshold: 0.05,
  p50: 50,
  peak: 10_000,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return sigmoidSpeedCurve(value, {
      threshold: 0.05,
      p50: 50,
      peak: 10_000,
      max_duration: UNIVERSAL_MAX_DURATION_MS,
      min_duration: UNIVERSAL_MIN_DURATION_MS,
      steepness: UNIVERSAL_STEEPNESS,
    });
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
