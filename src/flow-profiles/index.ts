import type { DomainColors, FlowConfig, FlowDomain, FlowProfile } from '../types.js';
import { resolveDomainFlowDefaultColour, resolveFlowRoleBasedDomainHue } from './domain-colour-profiles.js';
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
 * Non-energy domains without a matching pattern use the first role colour (v2.1.1+).
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
 *   3. `resolveFlowRoleBasedDomainHue(...)` — manual `flow.role`, then entity
 *      auto-detect (`detectFlowRole`), then flow-id pattern defaults (v2.8+).
 *   4. `profile.default_color_positive` / `profile.default_color_negative`
 *      — profile-level fallback.
 *
 * `direction` is +1 (forward) or -1 (reverse, after `flow.reverse` and
 * the sign of the sensor value have been combined). v1.0.7+.
 */
/** Accepts `#rgb` / `#rrggbb`; anything else falls back so SVG/CSS never see invalid colours. v2.1.1+ */
const HEX_STROKE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export function ensureRenderableStrokeColour(c: string | undefined | null): string {
  if (typeof c === 'string' && HEX_STROKE.test(c.trim())) {
    return c.trim();
  }
  return '#FFFFFF';
}

function nonEmptyColour(s: string | undefined): string | undefined {
  return typeof s === 'string' && s.trim() !== '' ? s.trim() : undefined;
}

export function resolveFlowColor(
  flow: Pick<FlowConfig, 'id' | 'color' | 'color_positive' | 'color_negative' | 'entity' | 'role'>,
  profile: FlowProfile,
  domain: FlowDomain | undefined,
  direction: number,
  domainColors?: DomainColors,
  flowIndex?: number,
): string {
  const explicit = nonEmptyColour(flow.color);
  const domainHue = resolveFlowRoleBasedDomainHue(domain, flow, domainColors, flowIndex);
  const universal = explicit ?? domainHue;

  let resolved: string | undefined;
  if (direction >= 0) {
    resolved =
      nonEmptyColour(flow.color_positive) ?? universal ?? profile.default_color_positive;
  } else {
    resolved =
      nonEmptyColour(flow.color_negative) ?? universal ?? profile.default_color_negative;
  }

  return ensureRenderableStrokeColour(resolved);
}

export {
  energyProfile,
  waterProfile,
  networkProfile,
  hvacProfile,
  gasProfile,
  genericProfile,
};

export { listDomainRoleKeys, resolveFlowRoleBasedDomainHue } from './domain-colour-profiles.js';
export { detectFlowRole } from './role-detection.js';

export {
  calcAnimDuration,
  resolveAnimTiming,
  DEFAULT_ANIM_MIN_DURATION_MS,
  DEFAULT_ANIM_MAX_DURATION_MS,
  DEFAULT_ANIM_EPSILON,
  DEFAULT_ZERO_THRESHOLD,
  normalizeAnimSensorValue,
  isFlowMotionBelowCutoff,
  flowDisplayName,
} from '../utils.js';
