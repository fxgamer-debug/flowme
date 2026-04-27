import type { FlowProfile } from '../types.js';
import {
  sigmoidSpeedCurve,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
  UNIVERSAL_STEEPNESS,
} from '../utils.js';

/**
 * Generic fallback profile (v1.0.6). A reasonable middle ground for
 * dashboards that don't fit energy / water / network / hvac / gas.
 * Users needing different bounds should pick a closer domain or set
 * `speed_curve_override` directly on the flow.
 *
 *   threshold =     1   (slowest visible flow at magnitude 1)
 *   p50       =   100   (sensible "medium-paced" anchor for unit-less data)
 *   peak      = 10 000  (broad upper bound — overrideable per flow)
 */
export const genericProfile: FlowProfile = {
  domain: 'generic',
  default_color_positive: '#A78BFA',
  // v1.0.5: maximum-contrast pair for arbitrary bidirectional sensors.
  // Violet → emerald is clearly distinguishable at any particle size and
  // any glow radius, which matters most for the generic profile since we
  // have no domain-specific hue vocabulary to draw from.
  default_color_negative: '#34D399',
  shape: 'dot',
  glow: false,
  unit_label: '',
  threshold: 1,
  p50: 100,
  peak: 10_000,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return sigmoidSpeedCurve(value, {
      threshold: 1,
      p50: 100,
      peak: 10_000,
      max_duration: UNIVERSAL_MAX_DURATION_MS,
      min_duration: UNIVERSAL_MIN_DURATION_MS,
      steepness: UNIVERSAL_STEEPNESS,
    });
  },

  describe(value: number): string {
    if (Math.abs(value) >= 100) return value.toFixed(0);
    if (Math.abs(value) >= 10) return value.toFixed(1);
    return value.toFixed(2);
  },
};
