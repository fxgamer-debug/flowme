import type { FlowProfile } from '../types.js';
import { clamp } from '../utils.js';

/**
 * Energy profile: dot trail, glow, watts to speed.
 * Spec §"Default flow profiles — concrete parameters → Energy".
 *
 * Speed curve: at 100W = 4000ms, at 1000W = 2000ms, at 5000W = 800ms-ish,
 * at 10000W = 500ms-ish. Clamped to [400, 8000] ms.
 *   dur_ms = clamp(8000 - log10(value/10) * 2000, 400, 8000)
 */
export const energyProfile: FlowProfile = {
  domain: 'energy',
  default_color_positive: '#FFD700',
  default_color_negative: '#4ADE80',
  shape: 'dot',
  glow: true,
  unit_label: 'W',
  visibility_threshold: 10,

  speed_curve(value: number): number {
    const magnitude = Math.abs(value);
    if (magnitude <= 0) return 8000;
    const raw = 8000 - Math.log10(magnitude / 10) * 2000;
    return clamp(raw, 400, 8000);
  },

  describe(value: number): string {
    const magnitude = Math.abs(value);
    if (magnitude >= 1000) {
      return `${(value / 1000).toFixed(2)} kW`;
    }
    return `${Math.round(value)} W`;
  },
};
