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
} from '../../src/flow-profiles/index.js';
import {
  resolveSpeedCurveParams,
  sigmoidSpeedCurve,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
  UNIVERSAL_STEEPNESS,
} from '../../src/utils.js';
import type { FlowConfig, FlowProfile } from '../../src/types.js';

/**
 * v1.0.6 unifies every domain on a single sigmoid curve in log10-value
 * space, parameterised per-domain by `(threshold, p50, peak)` plus the
 * universal `(max_duration=9000, min_duration=700, steepness=1.5)`.
 *
 *   v      = max(|value|, threshold)
 *   ratio  = log10(v / p50)
 *   factor = 1 / (1 + exp(-steepness * ratio))
 *   ms     = max - factor * (max - min)
 *
 * Anchor tests below verify each profile's calibration against this
 * formula so any drift in the shared shape function lights the whole
 * suite up at once.
 */

function expectedDuration(
  value: number,
  threshold: number,
  p50: number,
  maxD: number = UNIVERSAL_MAX_DURATION_MS,
  minD: number = UNIVERSAL_MIN_DURATION_MS,
  k: number = UNIVERSAL_STEEPNESS,
): number {
  const v = Math.max(Math.abs(value), threshold);
  const ratio = Math.log10(v / p50);
  const factor = 1 / (1 + Math.exp(-k * ratio));
  return maxD - factor * (maxD - minD);
}

function profileExpect(profile: FlowProfile, value: number): number {
  return expectedDuration(value, profile.threshold, profile.p50);
}

describe('sigmoidSpeedCurve (shared shape function)', () => {
  const params = {
    threshold: 1,
    p50: 100,
    peak: 10_000,
    max_duration: UNIVERSAL_MAX_DURATION_MS,
    min_duration: UNIVERSAL_MIN_DURATION_MS,
    steepness: UNIVERSAL_STEEPNESS,
  };

  it('returns exactly half the duration span at v == p50', () => {
    const mid = sigmoidSpeedCurve(100, params);
    const expected = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(mid).toBeCloseTo(expected, 6);
  });

  it('clamps small magnitudes up to threshold (no log10(0))', () => {
    expect(sigmoidSpeedCurve(0, params)).toBeCloseTo(
      expectedDuration(1, params.threshold, params.p50),
      6,
    );
    expect(sigmoidSpeedCurve(0.5, params)).toBeCloseTo(
      sigmoidSpeedCurve(1, params),
      6,
    );
  });

  it('approaches but never reaches min_duration as v grows', () => {
    const atPeak = sigmoidSpeedCurve(params.peak, params);
    const farPast = sigmoidSpeedCurve(params.peak * 1000, params);
    expect(atPeak).toBeGreaterThan(UNIVERSAL_MIN_DURATION_MS);
    expect(farPast).toBeGreaterThan(UNIVERSAL_MIN_DURATION_MS);
    expect(farPast).toBeLessThan(atPeak);
  });

  it('steeper steepness gives a sharper transition around p50', () => {
    const steep = sigmoidSpeedCurve(50, { ...params, steepness: 5 });
    const flat = sigmoidSpeedCurve(50, { ...params, steepness: 0.5 });
    // At v=50 (below p50=100) the steeper curve drops further from the median.
    expect(steep).toBeGreaterThan(flat);
  });

  it('honours custom max_duration / min_duration', () => {
    const mid = sigmoidSpeedCurve(100, {
      ...params,
      max_duration: 8000,
      min_duration: 600,
    });
    expect(mid).toBeCloseTo((8000 + 600) / 2, 6);
  });

  it('treats negative magnitudes as positive (sign is direction)', () => {
    expect(sigmoidSpeedCurve(-500, params)).toBeCloseTo(
      sigmoidSpeedCurve(500, params),
      6,
    );
  });

  it('is defensive against non-positive p50 / threshold (returns max_duration)', () => {
    expect(sigmoidSpeedCurve(50, { ...params, p50: 0 })).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(sigmoidSpeedCurve(50, { ...params, threshold: 0 })).toBe(
      UNIVERSAL_MAX_DURATION_MS,
    );
  });
});

describe('resolveSpeedCurveParams', () => {
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

  it('falls back to profile values when no override is set', () => {
    const r = resolveSpeedCurveParams(flowWith(), energyProfile);
    expect(r.threshold).toBe(energyProfile.threshold);
    expect(r.p50).toBe(energyProfile.p50);
    expect(r.peak).toBe(energyProfile.peak);
    expect(r.max_duration).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(r.min_duration).toBe(UNIVERSAL_MIN_DURATION_MS);
    expect(r.steepness).toBe(UNIVERSAL_STEEPNESS);
  });

  it('applies a partial override and inherits the rest', () => {
    const r = resolveSpeedCurveParams(
      flowWith({ speed_curve_override: { p50: 1500, peak: 12_000 } }),
      energyProfile,
    );
    expect(r.threshold).toBe(energyProfile.threshold);
    expect(r.p50).toBe(1500);
    expect(r.peak).toBe(12_000);
  });

  it('honours the legacy flow.threshold shortcut', () => {
    const r = resolveSpeedCurveParams(flowWith({ threshold: 250 }), energyProfile);
    expect(r.threshold).toBe(250);
  });

  it('prefers speed_curve_override.threshold over the legacy flow.threshold', () => {
    const r = resolveSpeedCurveParams(
      flowWith({
        threshold: 250,
        speed_curve_override: { threshold: 75 },
      }),
      energyProfile,
    );
    expect(r.threshold).toBe(75);
  });

  it('lets users replace the universal duration bounds', () => {
    const r = resolveSpeedCurveParams(
      flowWith({
        speed_curve_override: { max_duration: 8000, min_duration: 600, steepness: 2 },
      }),
      energyProfile,
    );
    expect(r.max_duration).toBe(8000);
    expect(r.min_duration).toBe(600);
    expect(r.steepness).toBe(2);
  });
});

describe('energyProfile', () => {
  it('declares the v1.0.6 residential calibration', () => {
    expect(energyProfile.threshold).toBe(30);
    expect(energyProfile.p50).toBe(800);
    expect(energyProfile.peak).toBe(10_000);
    expect(energyProfile.burst_density_multiplier).toBe(1.5);
  });

  it('matches the universal sigmoid curve across the residential envelope', () => {
    expect(energyProfile.speed_curve(0)).toBeCloseTo(profileExpect(energyProfile, 30), 6);
    expect(energyProfile.speed_curve(30)).toBeCloseTo(profileExpect(energyProfile, 30), 6);
    expect(energyProfile.speed_curve(100)).toBeCloseTo(profileExpect(energyProfile, 100), 6);
    // p50: exactly halfway between max and min duration.
    const median = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(energyProfile.speed_curve(800)).toBeCloseTo(median, 6);
    expect(energyProfile.speed_curve(5000)).toBeCloseTo(profileExpect(energyProfile, 5000), 6);
    expect(energyProfile.speed_curve(10_000)).toBeCloseTo(profileExpect(energyProfile, 10_000), 6);
  });

  it('clamps symmetrically for negative values (sign is direction, not magnitude)', () => {
    expect(energyProfile.speed_curve(-5000)).toBeCloseTo(profileExpect(energyProfile, 5000), 6);
  });

  it('describe() formats W vs kW correctly', () => {
    expect(energyProfile.describe(120)).toBe('120 W');
    expect(energyProfile.describe(999)).toBe('999 W');
    expect(energyProfile.describe(1000)).toBe('1.00 kW');
    expect(energyProfile.describe(2543)).toBe('2.54 kW');
  });

  it('exposes the v1.0.4 unit_scale map for kW / MW / mW normalisation', () => {
    expect(energyProfile.unit_scale).toBeDefined();
    expect(energyProfile.unit_scale!.W).toBe(1);
    expect(energyProfile.unit_scale!.kW).toBe(1000);
    expect(energyProfile.unit_scale!.MW).toBe(1_000_000);
    expect(energyProfile.unit_scale!.mW).toBeCloseTo(0.001);
  });
});

describe('waterProfile', () => {
  it('declares the v1.0.6 residential calibration', () => {
    expect(waterProfile.threshold).toBe(0.3);
    expect(waterProfile.p50).toBe(6);
    expect(waterProfile.peak).toBe(60);
  });

  it('matches the universal sigmoid curve', () => {
    const median = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(waterProfile.speed_curve(0)).toBeCloseTo(profileExpect(waterProfile, 0.3), 6);
    expect(waterProfile.speed_curve(0.3)).toBeCloseTo(profileExpect(waterProfile, 0.3), 6);
    expect(waterProfile.speed_curve(6)).toBeCloseTo(median, 6);
    expect(waterProfile.speed_curve(60)).toBeCloseTo(profileExpect(waterProfile, 60), 6);
  });

  it('wave amplitude is a constant 4px', () => {
    expect(waterProfile.wave_amplitude_curve?.(0)).toBe(4);
    expect(waterProfile.wave_amplitude_curve?.(50)).toBe(4);
  });

  it('describe() picks precision based on magnitude', () => {
    expect(waterProfile.describe(0.25)).toBe('0.25 L/min');
    expect(waterProfile.describe(12.5)).toBe('12.5 L/min');
    expect(waterProfile.describe(250)).toBe('250 L/min');
  });
});

describe('networkProfile', () => {
  it('declares the v1.0.6 residential calibration', () => {
    expect(networkProfile.threshold).toBe(0.05);
    expect(networkProfile.p50).toBe(50);
    expect(networkProfile.peak).toBe(10_000);
  });

  it('matches the universal sigmoid curve', () => {
    const median = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(networkProfile.speed_curve(50)).toBeCloseTo(median, 6);
    expect(networkProfile.speed_curve(10)).toBeCloseTo(profileExpect(networkProfile, 10), 6);
    expect(networkProfile.speed_curve(1000)).toBeCloseTo(profileExpect(networkProfile, 1000), 6);
    expect(networkProfile.speed_curve(10_000)).toBeCloseTo(
      profileExpect(networkProfile, 10_000),
      6,
    );
  });

  it('packet count grows logarithmically and clamps to [1, 20]', () => {
    const f = networkProfile.particle_count_curve!;
    expect(f(0)).toBe(1);
    expect(f(1)).toBeGreaterThanOrEqual(1);
    expect(f(1_000_000_000_000)).toBe(20);
  });

  it('describe() switches Mbps → Gbps above 1000', () => {
    expect(networkProfile.describe(0.5)).toBe('0.50 Mbps');
    expect(networkProfile.describe(25)).toBe('25.0 Mbps');
    expect(networkProfile.describe(1500)).toBe('1.50 Gbps');
  });
});

describe('hvacProfile', () => {
  it('declares the v1.0.6 residential calibration', () => {
    expect(hvacProfile.threshold).toBe(5);
    expect(hvacProfile.p50).toBe(200);
    expect(hvacProfile.peak).toBe(3000);
  });

  it('matches the universal sigmoid curve', () => {
    const median = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(hvacProfile.speed_curve(0)).toBeCloseTo(profileExpect(hvacProfile, 5), 6);
    expect(hvacProfile.speed_curve(200)).toBeCloseTo(median, 6);
    expect(hvacProfile.speed_curve(1000)).toBeCloseTo(profileExpect(hvacProfile, 1000), 6);
    expect(hvacProfile.speed_curve(3000)).toBeCloseTo(profileExpect(hvacProfile, 3000), 6);
  });

  it('amplitude scales with CFM and clamps to [2, 10]', () => {
    const f = hvacProfile.wave_amplitude_curve!;
    expect(f(0)).toBe(2);
    expect(f(100)).toBe(3);
    expect(f(5000)).toBe(10);
  });

  it('describe() rounds to whole CFM', () => {
    expect(hvacProfile.describe(123.7)).toBe('124 CFM');
  });
});

describe('gasProfile', () => {
  it('declares the v1.0.6 residential calibration', () => {
    expect(gasProfile.threshold).toBe(0.005);
    expect(gasProfile.p50).toBe(0.5);
    expect(gasProfile.peak).toBe(10);
  });

  it('matches the universal sigmoid curve', () => {
    const median = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(gasProfile.speed_curve(0)).toBeCloseTo(profileExpect(gasProfile, 0.005), 6);
    expect(gasProfile.speed_curve(0.5)).toBeCloseTo(median, 6);
    expect(gasProfile.speed_curve(1)).toBeCloseTo(profileExpect(gasProfile, 1), 6);
    expect(gasProfile.speed_curve(10)).toBeCloseTo(profileExpect(gasProfile, 10), 6);
  });

  it('describe() formats with 2 decimals below 10, 1 above', () => {
    expect(gasProfile.describe(0.42)).toBe('0.42 m³/h');
    expect(gasProfile.describe(15.7)).toBe('15.7 m³/h');
  });
});

describe('genericProfile', () => {
  it('declares the v1.0.6 default calibration', () => {
    expect(genericProfile.threshold).toBe(1);
    expect(genericProfile.p50).toBe(100);
    expect(genericProfile.peak).toBe(10_000);
  });

  it('matches the universal sigmoid curve', () => {
    const median = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(genericProfile.speed_curve(0)).toBeCloseTo(profileExpect(genericProfile, 1), 6);
    expect(genericProfile.speed_curve(100)).toBeCloseTo(median, 6);
    expect(genericProfile.speed_curve(10)).toBeCloseTo(profileExpect(genericProfile, 10), 6);
    expect(genericProfile.speed_curve(10_000)).toBeCloseTo(
      profileExpect(genericProfile, 10_000),
      6,
    );
  });

  it('describe() picks precision based on magnitude', () => {
    expect(genericProfile.describe(0.25)).toBe('0.25');
    expect(genericProfile.describe(12.5)).toBe('12.5');
    expect(genericProfile.describe(250)).toBe('250');
  });
});

describe('direction colours (v1.0.5 distinct negative colours)', () => {
  // Regression guard: prior to v1.0.5, water / gas / generic shipped the
  // same colour for positive and negative flow directions, which meant a
  // bidirectional sensor's sign flip was only visible through the
  // direction-of-travel animation and (for pulse shapes) not at all.
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
    expect(waterProfile.default_color_negative).toBe('#06B6D4');
    expect(gasProfile.default_color_negative).toBe('#A16207');
    expect(genericProfile.default_color_negative).toBe('#34D399');
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
