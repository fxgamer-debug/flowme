import type { FlowProfile } from '../types.js';
import { genericProfile } from './generic.js';

/** Placeholder — slow pulse shape lands in v0.2. */
export const gasProfile: FlowProfile = {
  ...genericProfile,
  domain: 'gas',
  default_color_positive: '#FB923C',
  default_color_negative: '#FB923C',
  unit_label: 'm³/h',
  visibility_threshold: 0.01,
};
