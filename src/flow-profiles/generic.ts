import type { FlowProfile } from '../types.js';
import { logCurveDuration } from '../utils.js';

/**
 * Generic fallback profile (v1.0.5). Calibrated as a reasonable middle
 * ground for dashboards that don't fit energy / water / network / hvac /
 * gas. Users needing a different range should pick a closer domain or,
 * once per-flow range overrides land, set `speed_range_min` / `_max`
 * directly on the flow. For now:
 *
 *   speed_range_min = 1      (slowest visible flow at magnitude 1)
 *   speed_range_max = 1000   (saturates at magnitude 1000)
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
  speed_range_min: 1,
  speed_range_max: 1000,
  visibility_threshold: 1,
  burst_density_multiplier: 1.5,

  speed_curve(value: number): number {
    return logCurveDuration(value, 1, 1000);
  },

  describe(value: number): string {
    if (Math.abs(value) >= 100) return value.toFixed(0);
    if (Math.abs(value) >= 10) return value.toFixed(1);
    return value.toFixed(2);
  },
};
