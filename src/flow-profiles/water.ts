import type { FlowProfile } from '../types.js';
import { genericProfile } from './generic.js';

/**
 * Placeholder — full water profile (wave shape, L/min curve) lands in v0.2.
 * For v0.1 we reuse generic but keep the water domain + unit label so configs
 * pointing at domain: water still render sensibly.
 */
export const waterProfile: FlowProfile = {
  ...genericProfile,
  domain: 'water',
  default_color_positive: '#3B82F6',
  default_color_negative: '#3B82F6',
  unit_label: 'L/min',
  visibility_threshold: 0.5,
};
