import type { FlowProfile } from '../types.js';
import { genericProfile } from './generic.js';

/** Placeholder — temperature gradient + wave amplitude lands in v0.2. */
export const hvacProfile: FlowProfile = {
  ...genericProfile,
  domain: 'hvac',
  default_color_positive: '#EF4444',
  default_color_negative: '#3B82F6',
  unit_label: 'CFM',
  visibility_threshold: 10,
};
