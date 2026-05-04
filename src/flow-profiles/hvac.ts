import { clamp } from '../utils.js';
import type { FlowProfile } from '../types.js';

/**
 * HVAC — airflow m³/h internal (editors may show CFM; 1 CFM = 1.699 m³/h).
 * Peak 600 m³/h typical EU heat pump.
 */
export const hvacProfile: FlowProfile = {
  domain: 'hvac',
  default_color_positive: '#A78BFA',
  default_color_negative: '#60A5FA',
  shape: 'wave',
  glow: false,
  unit_label: 'm³/h',
  unit_scale: {
    'm³/h': 1,
    'm3/h': 1,
    CFM: 1.699,
    cfm: 1.699,
  },
  peak: 600,
  burst_density_multiplier: 1.5,

  wave_amplitude_curve(value: number): number {
    const magnitude = Math.abs(value);
    return clamp(2 + magnitude / 60, 2, 10);
  },

  describe(value: number): string {
    return `${Math.round(value)} m³/h`;
  },
};
