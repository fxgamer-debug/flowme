import type { DomainColors, FlowConfig, FlowDomain, FlowProfile } from '../types.js';
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
 * Per-domain default colour for a flow whose id matches a well-known
 * residential pattern. Lets users skip per-flow `color:` config when
 * they follow conventional naming. Only triggered for the *energy*
 * domain — other domains keep their profile defaults.
 *
 * Patterns are word-boundary aware so `solar1`, `solar_string_1`,
 * `pv_string_2`, `grid_power`, `battery_soc` and `house_load` all
 * match. Returns `undefined` when nothing matches, letting the
 * caller fall through to the profile default.
 *
 * `domainColors` (v1.0.8+) is the card-level `domain_colors:` block
 * which lets users override the built-in hex values without having to
 * set `color:` on every individual flow. When provided it takes
 * precedence over the built-in defaults.
 */
export function defaultDomainFlowColor(
  domain: FlowDomain | undefined,
  flowId: string,
  domainColors?: DomainColors,
): string | undefined {
  if (domain !== 'energy') return undefined;
  const id = flowId.toLowerCase();
  // Order matters: more specific patterns first.
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(id)) return domainColors?.solar ?? '#FFD700';
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(id)) return domainColors?.grid ?? '#1EB4FF';
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(id)) return domainColors?.battery ?? '#32DC50';
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(id)) {
    return domainColors?.load ?? '#FF8C1E';
  }
  return undefined;
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
): string {
  const universal = flow.color ?? defaultDomainFlowColor(domain, flow.id, domainColors);
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
