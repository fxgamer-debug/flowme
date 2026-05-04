import type { DomainColors, FlowDomain } from '../types.js';
import { dlog } from '../debug-log.js';

export interface DomainColourRole {
  key: string;
  label: string;
  patterns: string[];
  default: string;
}

export interface DomainColourProfile {
  roles: DomainColourRole[];
}

export const DOMAIN_COLOUR_PROFILES: Record<string, DomainColourProfile> = {
  energy: {
    roles: [
      { key: 'solar', label: 'Solar', patterns: ['solar', 'pv'], default: '#FFD700' },
      { key: 'grid', label: 'Grid', patterns: ['grid'], default: '#1EB4FF' },
      { key: 'battery', label: 'Battery', patterns: ['battery', 'bat'], default: '#32DC50' },
      { key: 'load', label: 'Load', patterns: ['load'], default: '#FF8C1E' },
    ],
  },
  water: {
    roles: [
      {
        key: 'supply',
        label: 'Supply',
        patterns: ['supply', 'inlet', 'cold', 'mains'],
        default: '#60CFFF',
      },
      { key: 'drain', label: 'Drain', patterns: ['drain', 'out', 'outlet', 'waste'], default: '#0077AA' },
      { key: 'storage', label: 'Storage', patterns: ['tank', 'storage', 'hot'], default: '#004488' },
      { key: 'transfer', label: 'Transfer', patterns: ['pipe', 'transfer', 'circulation'], default: '#88DDFF' },
    ],
  },
  network: {
    roles: [
      { key: 'upload', label: 'Upload', patterns: ['up', 'upload', 'tx', 'send'], default: '#32DC50' },
      { key: 'download', label: 'Download', patterns: ['down', 'download', 'rx', 'receive'], default: '#1EB4FF' },
      { key: 'local', label: 'Local', patterns: ['local', 'lan', 'internal'], default: '#FFD700' },
      { key: 'external', label: 'External', patterns: ['ext', 'external', 'wan', 'internet'], default: '#FF8C1E' },
    ],
  },
  hvac: {
    roles: [
      {
        key: 'supply',
        label: 'Supply air',
        patterns: ['supply', 'hot', 'heat', 'warm'],
        default: '#FF4500',
      },
      {
        key: 'return',
        label: 'Return air',
        patterns: ['return', 'cold', 'cool', 'extract'],
        default: '#1EB4FF',
      },
      { key: 'fresh', label: 'Fresh air', patterns: ['fresh', 'intake', 'outside'], default: '#32DC50' },
      { key: 'exhaust', label: 'Exhaust', patterns: ['exhaust', 'vent', 'outlet'], default: '#AAAAAA' },
    ],
  },
  gas: {
    roles: [
      { key: 'inlet', label: 'Inlet', patterns: ['in', 'inlet', 'supply', 'import'], default: '#FFD700' },
      { key: 'outlet', label: 'Outlet', patterns: ['out', 'outlet', 'exhaust'], default: '#FF8C1E' },
      { key: 'bypass', label: 'Bypass', patterns: ['bypass', 'divert'], default: '#AAAAAA' },
      { key: 'vent', label: 'Vent', patterns: ['vent', 'release'], default: '#888888' },
    ],
  },
  generic: {
    roles: [
      { key: 'flow1', label: 'Flow 1', patterns: [], default: '#FFD700' },
      { key: 'flow2', label: 'Flow 2', patterns: [], default: '#1EB4FF' },
      { key: 'flow3', label: 'Flow 3', patterns: [], default: '#32DC50' },
      { key: 'flow4', label: 'Flow 4', patterns: [], default: '#FF8C1E' },
    ],
  },
};

/** Same word-boundary behaviour as pre-v1.22 energy defaults (see unit tests). */
function matchEnergyRoleKey(flowId: string): 'solar' | 'grid' | 'battery' | 'load' | undefined {
  const id = flowId.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(id)) return 'solar';
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(id)) return 'grid';
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(id)) return 'battery';
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(id)) return 'load';
  return undefined;
}

function matchByPatterns(flowId: string, profile: DomainColourProfile): string | undefined {
  const idLower = flowId.toLowerCase();
  for (const role of profile.roles) {
    for (const pattern of role.patterns) {
      if (pattern && idLower.includes(pattern)) return role.key;
    }
  }
  return undefined;
}

/**
 * When no flow id pattern matches (HVAC, water, network, gas), use the first
 * role’s colour so every flow id still maps to a real hex. Respects
 * `domain_colors` for that role key. v2.1.1+.
 */
function firstRoleDefaultColour(
  profile: DomainColourProfile,
  domainColors?: DomainColors,
): string {
  const r0 = profile.roles[0];
  if (!r0) return '#FFFFFF';
  const o = domainColors?.[r0.key];
  const fromOverride = typeof o === 'string' && o.trim() !== '' ? o.trim() : undefined;
  return (fromOverride ?? r0.default) || '#FFFFFF';
}

function roleColour(
  role: DomainColourRole,
  domainColors: DomainColors | undefined,
): string {
  const o = domainColors?.[role.key];
  const fromOverride = typeof o === 'string' && o.trim() !== '' ? o.trim() : undefined;
  return (fromOverride ?? role.default) || '#FFFFFF';
}

/**
 * Card-level default colour from domain profile + flow id patterns + `domain_colors` overrides.
 * Returns `undefined` for `energy` when no id pattern matches (so `resolveFlowColor` can
 * use profile positive/negative defaults). Other domains return a solid hex, using the
 * first role when no pattern matches. `generic` always maps by flow index. v2.1.1+.
 */
export function resolveDomainFlowDefaultColour(
  domain: FlowDomain | undefined,
  flowId: string,
  domainColors?: DomainColors,
  flowIndex?: number,
): string | undefined {
  if (domain === undefined) {
    dlog('colour resolution:', flowId, 'domain:', 'undefined', 'matched role:', 'none', 'resolved:', undefined);
    return undefined;
  }

  const dom = domain;
  const profile: DomainColourProfile =
    DOMAIN_COLOUR_PROFILES[dom] ?? DOMAIN_COLOUR_PROFILES.generic!;

  let matchedKey: string | undefined;

  if (dom === 'energy') {
    matchedKey = matchEnergyRoleKey(flowId);
    if (!matchedKey) {
      dlog('colour resolution:', flowId, 'domain:', dom, 'matched role:', 'none', 'resolved:', undefined);
      return undefined;
    }
  } else if (dom === 'generic') {
    matchedKey = matchByPatterns(flowId, profile);
    if (!matchedKey) {
      const idx = Math.abs(flowIndex ?? 0) % profile.roles.length;
      const role = profile.roles[idx]!;
      const resolved = roleColour(role, domainColors);
      dlog('colour resolution:', flowId, 'domain:', dom, 'matched role:', 'none (by index)', 'resolved:', resolved);
      return resolved;
    }
  } else {
    matchedKey = matchByPatterns(flowId, profile);
    if (!matchedKey) {
      const resolved = firstRoleDefaultColour(profile, domainColors);
      dlog('colour resolution:', flowId, 'domain:', dom, 'matched role:', 'first', 'resolved:', resolved);
      return resolved;
    }
  }

  const role = profile.roles.find((r) => r.key === matchedKey);
  if (!role) {
    return firstRoleDefaultColour(profile, domainColors);
  }
  const resolved = roleColour(role, domainColors);
  dlog('colour resolution:', flowId, 'domain:', dom, 'matched role:', matchedKey, 'resolved:', resolved);
  return resolved;
}
