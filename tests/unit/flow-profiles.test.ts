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
  logCurveDuration,
  UNIVERSAL_MAX_DURATION_MS,
  UNIVERSAL_MIN_DURATION_MS,
} from '../../src/utils.js';

/**
 * v1.0.5 unified the speed curves across every profile. The shape is
 * `logCurveDuration(value, domain_min, domain_max)` → clamped between
 * [600 ms, 4500 ms]. Anchor tests below verify each profile's calibration
 * produces the same five reference points (clamp-low, quarter-range,
 * half-range, three-quarter-range, clamp-high) against the math formula
 * so any drift in the shared function lights the whole suite up at once.
 */

function expectedDuration(value: number, min: number, max: number): number {
  if (value <= min) return UNIVERSAL_MAX_DURATION_MS;
  if (value >= max) return UNIVERSAL_MIN_DURATION_MS;
  const factor = Math.log10(value / min) / Math.log10(max / min);
  return UNIVERSAL_MAX_DURATION_MS - factor * (UNIVERSAL_MAX_DURATION_MS - UNIVERSAL_MIN_DURATION_MS);
}

describe('logCurveDuration (shared shape function)', () => {
  it('returns maxDuration at or below domain_min', () => {
    expect(logCurveDuration(0, 1, 100)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(logCurveDuration(1, 1, 100)).toBe(UNIVERSAL_MAX_DURATION_MS);
  });

  it('returns minDuration at or above domain_max', () => {
    expect(logCurveDuration(100, 1, 100)).toBe(UNIVERSAL_MIN_DURATION_MS);
    expect(logCurveDuration(1_000_000, 1, 100)).toBe(UNIVERSAL_MIN_DURATION_MS);
  });

  it('is logarithmic — value √(min*max) sits at exactly half the duration span', () => {
    // Geometric mean of 1 and 100 is 10. That's the log-midpoint.
    const mid = logCurveDuration(10, 1, 100);
    const expected = (UNIVERSAL_MAX_DURATION_MS + UNIVERSAL_MIN_DURATION_MS) / 2;
    expect(mid).toBeCloseTo(expected, 6);
  });

  it('respects custom duration bounds when supplied', () => {
    // Slowest = 3000, fastest = 1000, at domain midpoint should be 2000.
    expect(logCurveDuration(10, 1, 100, 3000, 1000)).toBeCloseTo(2000, 6);
  });

  it('is defensive against nonsense ranges (returns max duration)', () => {
    expect(logCurveDuration(50, 0, 100)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(logCurveDuration(50, 100, 100)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(logCurveDuration(50, 200, 100)).toBe(UNIVERSAL_MAX_DURATION_MS);
  });
});

describe('energyProfile', () => {
  it('declares residential calibration range', () => {
    expect(energyProfile.speed_range_min).toBe(50);
    expect(energyProfile.speed_range_max).toBe(10_000);
    expect(energyProfile.burst_density_multiplier).toBe(1.5);
  });

  it('matches the universal log curve across the residential envelope', () => {
    expect(energyProfile.speed_curve(49)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(energyProfile.speed_curve(50)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(energyProfile.speed_curve(100)).toBeCloseTo(expectedDuration(100, 50, 10_000), 6);
    expect(energyProfile.speed_curve(1000)).toBeCloseTo(expectedDuration(1000, 50, 10_000), 6);
    expect(energyProfile.speed_curve(5000)).toBeCloseTo(expectedDuration(5000, 50, 10_000), 6);
    expect(energyProfile.speed_curve(10_000)).toBe(UNIVERSAL_MIN_DURATION_MS);
    expect(energyProfile.speed_curve(1_000_000)).toBe(UNIVERSAL_MIN_DURATION_MS);
  });

  it('clamps symmetrically for negative values (sign is direction, not magnitude)', () => {
    expect(energyProfile.speed_curve(-5000)).toBeCloseTo(expectedDuration(5000, 50, 10_000), 6);
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
  it('declares residential calibration range', () => {
    expect(waterProfile.speed_range_min).toBe(0.5);
    expect(waterProfile.speed_range_max).toBe(50);
  });

  it('matches the universal log curve', () => {
    expect(waterProfile.speed_curve(0)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(waterProfile.speed_curve(0.5)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(waterProfile.speed_curve(5)).toBeCloseTo(expectedDuration(5, 0.5, 50), 6);
    expect(waterProfile.speed_curve(25)).toBeCloseTo(expectedDuration(25, 0.5, 50), 6);
    expect(waterProfile.speed_curve(50)).toBe(UNIVERSAL_MIN_DURATION_MS);
    expect(waterProfile.speed_curve(100)).toBe(UNIVERSAL_MIN_DURATION_MS);
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
  it('declares residential calibration range', () => {
    expect(networkProfile.speed_range_min).toBe(0.1);
    expect(networkProfile.speed_range_max).toBe(10_000);
  });

  it('matches the universal log curve (v1.0.5 replaces the constant 1500 ms)', () => {
    expect(networkProfile.speed_curve(0)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(networkProfile.speed_curve(0.1)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(networkProfile.speed_curve(10)).toBeCloseTo(expectedDuration(10, 0.1, 10_000), 6);
    expect(networkProfile.speed_curve(1000)).toBeCloseTo(expectedDuration(1000, 0.1, 10_000), 6);
    expect(networkProfile.speed_curve(10_000)).toBe(UNIVERSAL_MIN_DURATION_MS);
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
  it('declares residential calibration range', () => {
    expect(hvacProfile.speed_range_min).toBe(10);
    expect(hvacProfile.speed_range_max).toBe(2000);
  });

  it('matches the universal log curve', () => {
    expect(hvacProfile.speed_curve(0)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(hvacProfile.speed_curve(10)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(hvacProfile.speed_curve(100)).toBeCloseTo(expectedDuration(100, 10, 2000), 6);
    expect(hvacProfile.speed_curve(1000)).toBeCloseTo(expectedDuration(1000, 10, 2000), 6);
    expect(hvacProfile.speed_curve(2000)).toBe(UNIVERSAL_MIN_DURATION_MS);
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
  it('declares residential calibration range', () => {
    expect(gasProfile.speed_range_min).toBe(0.01);
    expect(gasProfile.speed_range_max).toBe(10);
  });

  it('matches the universal log curve', () => {
    expect(gasProfile.speed_curve(0)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(gasProfile.speed_curve(0.01)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(gasProfile.speed_curve(0.1)).toBeCloseTo(expectedDuration(0.1, 0.01, 10), 6);
    expect(gasProfile.speed_curve(1)).toBeCloseTo(expectedDuration(1, 0.01, 10), 6);
    expect(gasProfile.speed_curve(10)).toBe(UNIVERSAL_MIN_DURATION_MS);
  });

  it('describe() formats with 2 decimals below 10, 1 above', () => {
    expect(gasProfile.describe(0.42)).toBe('0.42 m³/h');
    expect(gasProfile.describe(15.7)).toBe('15.7 m³/h');
  });
});

describe('genericProfile', () => {
  it('declares a middle-ground calibration range', () => {
    expect(genericProfile.speed_range_min).toBe(1);
    expect(genericProfile.speed_range_max).toBe(1000);
  });

  it('matches the universal log curve', () => {
    expect(genericProfile.speed_curve(0)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(genericProfile.speed_curve(1)).toBe(UNIVERSAL_MAX_DURATION_MS);
    expect(genericProfile.speed_curve(10)).toBeCloseTo(expectedDuration(10, 1, 1000), 6);
    expect(genericProfile.speed_curve(100)).toBeCloseTo(expectedDuration(100, 1, 1000), 6);
    expect(genericProfile.speed_curve(1000)).toBe(UNIVERSAL_MIN_DURATION_MS);
    expect(genericProfile.speed_curve(10_000)).toBe(UNIVERSAL_MIN_DURATION_MS);
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
