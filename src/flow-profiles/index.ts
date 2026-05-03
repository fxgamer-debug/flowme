import type { DomainColors, FlowConfig, FlowDomain, FlowProfile } from '../types.js';
import { resolveDomainFlowDefaultColour } from './domain-colour-profiles.js';
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

/**
 * Neutral grey returned by `nodeFlowColor` when a node connects to
 * flows that resolve to multiple distinct colours (the inverter case
 * in a residential energy diagram). White-ish enough to read against
 * any background without claiming any one flow's hue. v1.0.7+.
 */
export const NEUTRAL_NODE_COLOR = '#CCCCCC';

/**
 * Per-domain default colour from flow id patterns and optional `domain_colors:` overrides.
 * @see resolveDomainFlowDefaultColour
 */
export function defaultDomainFlowColor(
  domain: FlowDomain | undefined,
  flowId: string,
  domainColors?: DomainColors,
): string | undefined {
  return resolveDomainFlowDefaultColour(domain, flowId, domainColors, undefined);
}

/**
 * Single source of truth for "what colour does this flow render as in
 * direction X". Resolution chain (highest precedence first):
 *
 *   1. `flow.color_positive` / `flow.color_negative` — direction-specific
 *      explicit overrides.
 *   2. `flow.color` — single-colour shorthand applied to both directions.
 *   3. `defaultDomainFlowColor(domain, flow.id, domainColors)` — built-in
 *      residential defaults (solar/grid/battery/load), overrideable by the
 *      card-level `domain_colors:` block (v1.0.8+).
 *   4. `profile.default_color_positive` / `profile.default_color_negative`
 *      — profile-level fallback.
 *
 * `direction` is +1 (forward) or -1 (reverse, after `flow.reverse` and
 * the sign of the sensor value have been combined). v1.0.7+.
 */
export function resolveFlowColor(
  flow: Pick<FlowConfig, 'id' | 'color' | 'color_positive' | 'color_negative'>,
  profile: FlowProfile,
  domain: FlowDomain | undefined,
  direction: number,
  domainColors?: DomainColors,
  flowIndex?: number,
): string {
  const universal =
    flow.color ?? resolveDomainFlowDefaultColour(domain, flow.id, domainColors, flowIndex);
  if (direction >= 0) {
    return flow.color_positive ?? universal ?? profile.default_color_positive;
  }
  return flow.color_negative ?? universal ?? profile.default_color_negative;
}

export {
  energyProfile,
  waterProfile,
  networkProfile,
  hvacProfile,
  gasProfile,
  genericProfile,
};
