import type { FlowDomain, FlowProfile } from '../types.js';
import { energyProfile } from './energy.js';
import { waterProfile } from './water.js';
import { networkProfile } from './network.js';
import { hvacProfile } from './hvac.js';
import { gasProfile } from './gas.js';
import { genericProfile } from './generic.js';

export const flowProfiles: Record<FlowDomain, FlowProfile> = {
  energy: energyProfile,
  water: waterProfile,
  network: networkProfile,
  hvac: hvacProfile,
  gas: gasProfile,
  generic: genericProfile,
};

export function getProfile(domain: FlowDomain | undefined): FlowProfile {
  if (domain && domain in flowProfiles) return flowProfiles[domain];
  return genericProfile;
}

export { energyProfile, waterProfile, networkProfile, hvacProfile, gasProfile, genericProfile };
