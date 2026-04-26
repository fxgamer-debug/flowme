import type { FlowProfile } from '../types.js';
import { clamp } from '../utils.js';

/**
 * HVAC profile: wavy ribbon lines with amplitude proportional to CFM.
 * Spec §"Default flow profiles → HVAC".
 *
 * Speed: `dur_ms = clamp(5000 - v*10, 600, 5000)` for v in CFM.
 * Amplitude: scales with CFM, clamped to [2, 10] px.
 *
 * Deviation from spec: the "colour shifts from blue to red based on
 * temperature differential between source and destination nodes" feature
 * depends on reading secondary entities and is deferred to a later version
 * once the node-level secondary-entity support lands in the config schema.
 * For v0.2 we use a single lavender tone.
 */
export const hvacProfile: FlowProfile = {
  domain: 'hvac',
  default_color_positive: '#A78BFA',
  default_color_negative: '#60A5FA',
  shape: 'wave',
  glow: false,
  unit_label: 'CFM',
  visibility_threshold: 10,

  speed_curve(value: number): number {
    const magnitude = Math.abs(value);
    return clamp(5000 - magnitude * 10, 600, 5000);
  },

  wave_amplitude_curve(value: number): number {
    const magnitude = Math.abs(value);
    return clamp(2 + magnitude / 100, 2, 10);
  },

  describe(value: number): string {
    return `${Math.round(value)} CFM`;
  },
};
