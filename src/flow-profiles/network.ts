import type { FlowProfile } from '../types.js';
import { genericProfile } from './generic.js';

/** Placeholder — packet density curve lands in v0.2. */
export const networkProfile: FlowProfile = {
  ...genericProfile,
  domain: 'network',
  default_color_positive: '#10B981',
  default_color_negative: '#F59E0B',
  unit_label: 'Mbps',
  visibility_threshold: 0.1,
};
