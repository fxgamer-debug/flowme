import { describe, it, expect } from 'vitest';

import {
  energyProfile,
  waterProfile,
  networkProfile,
  hvacProfile,
  gasProfile,
  genericProfile,
  getProfile,
  flowProfiles,
  defaultDomainFlowColor,
  ensureRenderableStrokeColour,
  resolveFlowColor,
  NEUTRAL_NODE_COLOR,
  detectFlowRole,
} from '../../src/flow-profiles/index.js';
import {
  calcAnimDuration,
  resolveAnimTiming,
  isFlowMotionBelowCutoff,
  DEFAULT_ANIM_MAX_DURATION_MS,
  DEFAULT_ANIM_MIN_DURATION_MS,
  DEFAULT_ANIM_EPSILON,
  DEFAULT_ZERO_THRESHOLD,
} from '../../src/utils.js';
import type { FlowConfig, FlowmeConfig } from '../../src/types.js';

/** Unvalidated legacy card shape (pre–v2.2.2) — `resolveAnimTiming` must ignore these. */
function legacyCardWithGlobalAnim(): Pick<FlowmeConfig, 'animation' | 'defaults'> {
  return {
    defaults: {},
    animation: { min_duration: 400, max_duration: 9000, zero_threshold: 0.05 },
  } as unknown as Pick<FlowmeConfig, 'animation' | 'defaults'>;
}

const minD = DEFAULT_ANIM_MIN_DURATION_MS;
const maxD = DEFAULT_ANIM_MAX_DURATION_MS;

function timingEpsilon(peak: number, minDur = minD, maxDur = maxD): ReturnType<typeof resolveAnimTiming> {
  return {
    peak,
    minDur,
    maxDur,
    zeroThresholdEnabled: false,
    zeroThresholdSource: 'default',
  };
}

function timingPct(peak: number, zt: number, minDur = minD, maxDur = maxD): ReturnType<typeof resolveAnimTiming> {
  return {
    peak,
    minDur,
    maxDur,
    zeroThreshold: zt,
    zeroThresholdEnabled: true,
    zeroThresholdSource: 'per-flow',
  };
}

function durationForLinear(value: number, peak: number, lo = minD, hi = maxD): number {
  return calcAnimDuration(value, timingEpsilon(peak, lo, hi));
}

describe('calcAnimDuration (v2.2 linear % of peak)', () => {
  const peak = 5000;

  it('interpolates linearly between max (slow) and min (fast) duration (epsilon mode)', () => {
    const atHalf = calcAnimDuration(2500, timingEpsilon(peak));
    const expected = maxD - 0.5 * (maxD - minD);
    expect(atHalf).toBeCloseTo(expected, 5);
  });

  it('at full peak returns min duration (capped)', () => {
    expect(calcAnimDuration(5000, timingEpsilon(peak))).toBeCloseTo(minD, 4);
    expect(calcAnimDuration(12_000, timingEpsilon(peak))).toBeCloseTo(minD, 4);
  });

  it('below DEFAULT_ANIM_EPSILON returns slowest duration (auto-stop)', () => {
    const tiny = DEFAULT_ANIM_EPSILON * 0.5;
    expect(calcAnimDuration(tiny, timingEpsilon(peak))).toBe(maxD);
  });

  it('advanced pct mode: below threshold returns slowest duration', () => {
    const tiny = peak * 0.0005;
    expect(calcAnimDuration(tiny, timingPct(peak, DEFAULT_ZERO_THRESHOLD))).toBe(maxD);
  });

  it('uses abs(value); sign is direction only', () => {
    expect(calcAnimDuration(-2500, timingEpsilon(peak))).toBeCloseTo(
      calcAnimDuration(2500, timingEpsilon(peak)),
      6,
    );
  });

  it('normalizes swapped min/max to lo/hi ordering', () => {
    const a = calcAnimDuration(2500, { ...timingEpsilon(peak), minDur: 800, maxDur: 200 });
    const b = calcAnimDuration(2500, { ...timingEpsilon(peak), minDur: 200, maxDur: 800 });
    expect(a).toBeCloseTo(b, 5);
  });

  it('matches hand-derived envelope against profiles.peak', () => {
    expect(calcAnimDuration(2500, timingEpsilon(energyProfile.peak))).toBeCloseTo(
      durationForLinear(2500, energyProfile.peak),
      5,
    );
  });
});

describe('resolveAnimTiming', () => {
  const cardBase: Pick<FlowmeConfig, 'animation' | 'defaults'> = {
    defaults: { peak_value: 800 },
  };

  function flowWith(partial: Partial<FlowConfig> = {}): FlowConfig {
    return {
      id: 'f1',
      from_node: 'a',
      to_node: 'b',
      entity: 'sensor.x',
      waypoints: [],
      ...partial,
    };
  }

  it('uses flow.peak_value first, then override.peak, then defaults.peak_value, then profile.peak', () => {
    const r1 = resolveAnimTiming(flowWith({ peak_value: 123 }), energyProfile, cardBase);
    expect(r1.peak).toBe(123);
    expect(r1.zeroThreshold).toBeUndefined();
    expect(r1.zeroThresholdEnabled).toBe(false);
    expect(r1.zeroThresholdSource).toBe('default');

    const r2 = resolveAnimTiming(
      flowWith({ speed_curve_override: { peak: 456 } }),
      energyProfile,
      cardBase,
    );
    expect(r2.peak).toBe(456);

    const r3 = resolveAnimTiming(flowWith(), energyProfile, cardBase);
    expect(r3.peak).toBe(800);

    const r4 = resolveAnimTiming(flowWith(), energyProfile, {});
    expect(r4.peak).toBe(energyProfile.peak);
  });

  it('uses per-flow zero_threshold when set, else default (card.animation ignored)', () => {
    const r = resolveAnimTiming(
      flowWith({ animation: { zero_threshold: 0.005 } }),
      energyProfile,
      { animation: {}, defaults: {} },
    );
    expect(r.zeroThreshold).toBe(0.005);
    expect(r.zeroThresholdEnabled).toBe(true);
    expect(r.zeroThresholdSource).toBe('per-flow');
    const r2 = resolveAnimTiming(flowWith(), energyProfile, { animation: {}, defaults: {} });
    expect(r2.zeroThreshold).toBeUndefined();
    expect(r2.zeroThresholdEnabled).toBe(false);
    expect(r2.zeroThresholdSource).toBe('default');
    const rLegacy = resolveAnimTiming(flowWith(), energyProfile, legacyCardWithGlobalAnim());
    expect(rLegacy.zeroThreshold).toBeUndefined();
    expect(rLegacy.zeroThresholdEnabled).toBe(false);
    expect(rLegacy.zeroThresholdSource).toBe('default');
  });

  it('uses flow.animation durations when set; ignores legacy card.animation min/max', () => {
    const r = resolveAnimTiming(
      flowWith({ animation: { min_duration: 100, max_duration: 5000 } }),
      energyProfile,
      cardBase,
    );
    expect(r.minDur).toBe(100);
    expect(r.maxDur).toBe(5000);
    const r2 = resolveAnimTiming(flowWith(), energyProfile, legacyCardWithGlobalAnim());
    expect(r2.minDur).toBe(DEFAULT_ANIM_MIN_DURATION_MS);
    expect(r2.maxDur).toBe(DEFAULT_ANIM_MAX_DURATION_MS);
  });

  it('inherits speed_curve_override min/max when flow.animation absent', () => {
    const r = resolveAnimTiming(
      flowWith({ speed_curve_override: { min_duration: 600, max_duration: 12000 } }),
      energyProfile,
      {},
    );
    expect(r.minDur).toBe(600);
    expect(r.maxDur).toBe(12_000);
  });
});

describe('isFlowMotionBelowCutoff (v2.2.3 epsilon vs advanced)', () => {
  it('uses epsilon when advanced off', () => {
    const t = timingEpsilon(5000);
    expect(isFlowMotionBelowCutoff(DEFAULT_ANIM_EPSILON * 0.5, t)).toBe(true);
    expect(isFlowMotionBelowCutoff(DEFAULT_ANIM_EPSILON * 2, t)).toBe(false);
  });

  it('uses pct of peak when advanced on', () => {
    const t = timingPct(5000, 0.01);
    expect(isFlowMotionBelowCutoff(40, t)).toBe(true);
    expect(isFlowMotionBelowCutoff(60, t)).toBe(false);
  });
});

describe('energyProfile', () => {
  it('declares v2.2 residential peak (W)', () => {
    expect(energyProfile.peak).toBe(5000);
    expect(energyProfile.burst_density_multiplier).toBe(1.5);
  });

  it('describe() formats W vs kW correctly', () => {
    expect(energyProfile.describe(120)).toBe('120 W');
    expect(energyProfile.describe(999)).toBe('999 W');
    expect(energyProfile.describe(1000)).toBe('1.00 kW');
    expect(energyProfile.describe(2543)).toBe('2.54 kW');
  });

  it('exposes unit_scale for HA units', () => {
    expect(energyProfile.unit_scale!.W).toBe(1);
    expect(energyProfile.unit_scale!.kW).toBe(1000);
    expect(energyProfile.unit_scale!.MW).toBe(1_000_000);
    expect(energyProfile.unit_scale!.mW).toBeCloseTo(0.001);
  });
});

describe('waterProfile', () => {
  it('declares v2.2 peak L/min', () => {
    expect(waterProfile.peak).toBe(25);
  });

  it('describe() uses one decimal', () => {
    expect(waterProfile.describe(0.25)).toBe('0.3 L/min');
    expect(waterProfile.describe(12.5)).toBe('12.5 L/min');
  });
});

describe('networkProfile', () => {
  it('declares v2.2 peak Mbps', () => {
    expect(networkProfile.peak).toBe(100);
  });

  it('particle_count_curve steps roughly with throughput', () => {
    const f = networkProfile.particle_count_curve!;
    expect(f(0)).toBe(1);
    expect(f(50)).toBe(5);
    expect(f(120)).toBe(6);
  });

  it('describe() switches Mbps → Gbps and shows Kbps below 1 Mbps', () => {
    expect(networkProfile.describe(0.5)).toBe('500 Kbps');
    expect(networkProfile.describe(25)).toBe('25.0 Mbps');
    expect(networkProfile.describe(1500)).toBe('1.50 Gbps');
  });
});

describe('hvacProfile', () => {
  it('declares v2.2 peak m³/h', () => {
    expect(hvacProfile.peak).toBe(600);
  });

  it('wave amplitude scales with magnitude and clamps', () => {
    const f = hvacProfile.wave_amplitude_curve!;
    expect(f(0)).toBe(2);
    expect(f(100)).toBeCloseTo(2 + 100 / 60, 5);
    expect(f(5000)).toBe(10);
  });

  it('describe() uses m³/h', () => {
    expect(hvacProfile.describe(123.7)).toBe('124 m³/h');
  });

  it('unit_scale maps CFM to m³/h', () => {
    expect(hvacProfile.unit_scale!.CFM).toBe(1.699);
  });
});

describe('gasProfile', () => {
  it('declares v2.2 peak m³/h', () => {
    expect(gasProfile.peak).toBe(5);
  });

  it('describe() formats with two decimals', () => {
    expect(gasProfile.describe(0.42)).toBe('0.42 m³/h');
    expect(gasProfile.describe(15.7)).toBe('15.70 m³/h');
  });
});

describe('genericProfile', () => {
  it('declares dimensionless peak', () => {
    expect(genericProfile.peak).toBe(100);
  });

  it('describe() picks precision based on magnitude', () => {
    expect(genericProfile.describe(0.25)).toBe('0.25');
    expect(genericProfile.describe(12.5)).toBe('12.5');
    expect(genericProfile.describe(250)).toBe('250');
  });
});

describe('direction colours (v1.0.5 distinct negative colours)', () => {
  const cases: Array<[string, { pos: string; neg: string }]> = [
    ['energy', { pos: energyProfile.default_color_positive, neg: energyProfile.default_color_negative }],
    ['water', { pos: waterProfile.default_color_positive, neg: waterProfile.default_color_negative }],
    ['network', { pos: networkProfile.default_color_positive, neg: networkProfile.default_color_negative }],
    ['hvac', { pos: hvacProfile.default_color_positive, neg: hvacProfile.default_color_negative }],
    ['gas', { pos: gasProfile.default_color_positive, neg: gasProfile.default_color_negative }],
    ['generic', { pos: genericProfile.default_color_positive, neg: genericProfile.default_color_negative }],
  ];

  it('every profile declares a negative colour distinct from its positive', () => {
    for (const [domain, { pos, neg }] of cases) {
      expect(
        pos.toLowerCase(),
        `${domain} profile's positive/negative colours must differ`,
      ).not.toBe(neg.toLowerCase());
    }
  });

  it('pins the specific v1.0.5 colour choices so they cannot silently drift', () => {
    expect(waterProfile.default_color_negative).toBe('#F472B6');
    expect(gasProfile.default_color_negative).toBe('#F97316');
    expect(genericProfile.default_color_negative).toBe('#34D399');
  });
});

describe('defaultDomainFlowColor (v1.0.7 energy id-pattern defaults)', () => {
  it('matches solar / pv ids → gold', () => {
    expect(defaultDomainFlowColor('energy', 'solar1')).toBe('#FFD700');
    expect(defaultDomainFlowColor('energy', 'solar_string_1')).toBe('#FFD700');
    expect(defaultDomainFlowColor('energy', 'pv1')).toBe('#FFD700');
    expect(defaultDomainFlowColor('energy', 'pv_string_2')).toBe('#FFD700');
    expect(defaultDomainFlowColor('energy', 'PV2')).toBe('#FFD700');
  });

  it('matches grid ids → blue', () => {
    expect(defaultDomainFlowColor('energy', 'grid')).toBe('#1EB4FF');
    expect(defaultDomainFlowColor('energy', 'grid_flow')).toBe('#1EB4FF');
    expect(defaultDomainFlowColor('energy', 'grid_power')).toBe('#1EB4FF');
  });

  it('matches battery / batt ids → green', () => {
    expect(defaultDomainFlowColor('energy', 'battery')).toBe('#32DC50');
    expect(defaultDomainFlowColor('energy', 'battery_flow')).toBe('#32DC50');
    expect(defaultDomainFlowColor('energy', 'batt_1')).toBe('#32DC50');
  });

  it('matches load / consumption / house ids → orange', () => {
    expect(defaultDomainFlowColor('energy', 'load')).toBe('#FF8C1E');
    expect(defaultDomainFlowColor('energy', 'load_flow')).toBe('#FF8C1E');
    expect(defaultDomainFlowColor('energy', 'house_load')).toBe('#FF8C1E');
    expect(defaultDomainFlowColor('energy', 'consumption')).toBe('#FF8C1E');
  });

  it('non-energy domains use first-role colour when no id pattern matches (v2.1.1+)', () => {
    expect(defaultDomainFlowColor('water', 'solar1')).toBe('#60CFFF');
    expect(defaultDomainFlowColor('network', 'grid')).toBe('#32DC50');
    expect(defaultDomainFlowColor(undefined, 'solar1')).toBeUndefined();
  });

  it('matches water / network domain patterns (v1.22)', () => {
    expect(defaultDomainFlowColor('water', 'cold_supply')).toBe('#60CFFF');
    expect(defaultDomainFlowColor('water', 'sewer_drain')).toBe('#0077AA');
    expect(defaultDomainFlowColor('network', 'download_usage')).toBe('#1EB4FF');
  });

  it('HVAC: unmatched flow id uses first role (supply) colour (v2.1.1)', () => {
    expect(defaultDomainFlowColor('hvac', 'grid_power_like_energy_example')).toBe('#FF4500');
  });

  it('v1.0.8 domainColors parameter overrides built-in defaults', () => {
    const dc = { solar: '#111111', grid: '#222222', battery: '#333333', load: '#444444' };
    expect(defaultDomainFlowColor('energy', 'solar1', dc)).toBe('#111111');
    expect(defaultDomainFlowColor('energy', 'grid_flow', dc)).toBe('#222222');
    expect(defaultDomainFlowColor('energy', 'battery_flow', dc)).toBe('#333333');
    expect(defaultDomainFlowColor('energy', 'load_flow', dc)).toBe('#444444');
  });

  it('v1.0.8 domainColors partial override (only solar)', () => {
    const dc = { solar: '#abcdef' };
    expect(defaultDomainFlowColor('energy', 'solar1', dc)).toBe('#abcdef');
    expect(defaultDomainFlowColor('energy', 'grid_flow', dc)).toBe('#1EB4FF');
  });

  it('returns undefined for energy ids that do not match any pattern', () => {
    expect(defaultDomainFlowColor('energy', 'inverter')).toBeUndefined();
    expect(defaultDomainFlowColor('energy', 'random_sensor')).toBeUndefined();
    expect(defaultDomainFlowColor('energy', 'solarium_temperature')).toBeUndefined();
    expect(defaultDomainFlowColor('energy', 'overload_count')).toBeUndefined();
  });
});

describe('ensureRenderableStrokeColour (v2.1.1)', () => {
  it('keeps valid #rgb / #rrggbb and otherwise returns white', () => {
    expect(ensureRenderableStrokeColour('#F00')).toBe('#F00');
    expect(ensureRenderableStrokeColour('#FF0000')).toBe('#FF0000');
    expect(ensureRenderableStrokeColour('')).toBe('#FFFFFF');
    expect(ensureRenderableStrokeColour('#GGG')).toBe('#FFFFFF');
    expect(ensureRenderableStrokeColour(undefined)).toBe('#FFFFFF');
  });
});

describe('resolveFlowColor (v1.0.7 unified colour resolution)', () => {
  function flowFixture(
    overrides: Partial<{
      id: string;
      color: string;
      color_positive: string;
      color_negative: string;
      entity: string;
      role: string;
    }> = {},
  ) {
    return {
      id: 'flow_x',
      entity: 'sensor.flow_fixture_neutral',
      ...overrides,
    } as Parameters<typeof resolveFlowColor>[0];
  }

  it('uses flow.color_positive / color_negative when set, regardless of direction', () => {
    const flow = flowFixture({ color_positive: '#111111', color_negative: '#222222' });
    expect(resolveFlowColor(flow, energyProfile, 'energy', 1)).toBe('#111111');
    expect(resolveFlowColor(flow, energyProfile, 'energy', -1)).toBe('#222222');
  });

  it('flow.color is a shortcut applied to BOTH directions', () => {
    const flow = flowFixture({ color: '#abcdef' });
    expect(resolveFlowColor(flow, energyProfile, 'energy', 1)).toBe('#abcdef');
    expect(resolveFlowColor(flow, energyProfile, 'energy', -1)).toBe('#abcdef');
  });

  it('direction-specific override beats the flow.color shortcut', () => {
    const flow = flowFixture({ color: '#abcdef', color_positive: '#111111' });
    expect(resolveFlowColor(flow, energyProfile, 'energy', 1)).toBe('#111111');
    expect(resolveFlowColor(flow, energyProfile, 'energy', -1)).toBe('#abcdef');
  });

  it('falls back to defaultDomainFlowColor for known energy ids', () => {
    expect(resolveFlowColor(flowFixture({ id: 'solar1' }), energyProfile, 'energy', 1)).toBe('#FFD700');
    expect(resolveFlowColor(flowFixture({ id: 'grid_flow' }), energyProfile, 'energy', 1)).toBe('#1EB4FF');
    expect(resolveFlowColor(flowFixture({ id: 'battery_flow' }), energyProfile, 'energy', 1)).toBe('#32DC50');
    expect(resolveFlowColor(flowFixture({ id: 'load_flow' }), energyProfile, 'energy', 1)).toBe('#FF8C1E');
  });

  it('falls back to profile defaults when no override and no id pattern matches', () => {
    const flow = flowFixture({ id: 'inverter' });
    expect(resolveFlowColor(flow, energyProfile, 'energy', 1)).toBe(energyProfile.default_color_positive);
    expect(resolveFlowColor(flow, energyProfile, 'energy', -1)).toBe(energyProfile.default_color_negative);
  });

  it('uses entity auto-detect before flow id when id does not match', () => {
    const flow = flowFixture({ id: 'inverter', entity: 'sensor.grid_import_power' });
    expect(resolveFlowColor(flow, energyProfile, 'energy', 1)).toBe('#1EB4FF');
  });

  it('manual flow.role beats entity and flow id', () => {
    const flow = flowFixture({
      id: 'solar1',
      entity: 'sensor.grid_power',
      role: 'battery',
    });
    expect(resolveFlowColor(flow, energyProfile, 'energy', 1)).toBe('#32DC50');
  });

  it('non-energy domains: unmatched id uses first domain role colour, not profile fallback', () => {
    const flow = flowFixture({ id: 'solar1' });
    expect(resolveFlowColor(flow, waterProfile, 'water', 1)).toBe('#60CFFF');
  });
});

describe('detectFlowRole', () => {
  it('detects energy roles from entity id', () => {
    expect(detectFlowRole('sensor.house_consumption', 'energy')).toBe('load');
    expect(detectFlowRole('sensor.solar_power', 'energy')).toBe('solar');
    expect(detectFlowRole('sensor.grid_meter', 'energy')).toBe('grid');
    expect(detectFlowRole('sensor.battery_soc', 'energy')).toBe('battery');
  });

  it('returns undefined for generic', () => {
    expect(detectFlowRole('sensor.solar_power', 'generic')).toBeUndefined();
  });

  it('detects water supply', () => {
    expect(detectFlowRole('sensor.main_inlet_temp', 'water')).toBe('supply');
  });

  it('detects network roles from entity id (v2.9 pattern order)', () => {
    expect(detectFlowRole('sensor.wan_upload_mbps', 'network')).toBe('upload');
    expect(detectFlowRole('sensor.link_up_status', 'network')).toBe('upload');
    expect(detectFlowRole('sensor.tx_bytes', 'network')).toBe('upload');
    expect(detectFlowRole('sensor.bytes_out_total', 'network')).toBe('upload');
    expect(detectFlowRole('sensor.download_speed', 'network')).toBe('download');
    expect(detectFlowRole('sensor.rx_errors', 'network')).toBe('download');
    expect(detectFlowRole('binary_sensor.lan_ping', 'network')).toBe('local');
    expect(detectFlowRole('sensor.external_latency', 'network')).toBe('external');
  });
});

describe('NEUTRAL_NODE_COLOR', () => {
  it('exposes the v1.0.7 inverter-style fallback grey', () => {
    expect(NEUTRAL_NODE_COLOR).toBe('#CCCCCC');
  });
});

describe('getProfile', () => {
  it('returns the domain-specific profile when the domain exists', () => {
    expect(getProfile('energy')).toBe(energyProfile);
    expect(getProfile('water')).toBe(waterProfile);
    expect(getProfile('gas')).toBe(gasProfile);
  });

  it('falls back to generic for undefined or unknown', () => {
    expect(getProfile(undefined)).toBe(genericProfile);
  });

  it('exposes every FLOW_DOMAINS entry via flowProfiles', () => {
    expect(Object.keys(flowProfiles).sort()).toEqual(
      ['energy', 'gas', 'generic', 'hvac', 'network', 'water'],
    );
  });
});
