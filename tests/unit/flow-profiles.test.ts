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

describe('energyProfile', () => {
  it('speed curve matches the spec curve at the specified anchor values', () => {
    // Spec anchors: at 10W → 8000, at 100W → 6000, at 1000W → 4000, at 10000W → 2000
    expect(energyProfile.speed_curve(10)).toBeCloseTo(8000, 3);
    expect(energyProfile.speed_curve(100)).toBeCloseTo(6000, 3);
    expect(energyProfile.speed_curve(1000)).toBeCloseTo(4000, 3);
    expect(energyProfile.speed_curve(10_000)).toBeCloseTo(2000, 3);
  });

  it('clamps to [400, 8000] ms', () => {
    expect(energyProfile.speed_curve(0)).toBe(8000);
    expect(energyProfile.speed_curve(1_000_000)).toBe(400);
    expect(energyProfile.speed_curve(-5000)).toBeGreaterThanOrEqual(400);
  });

  it('describe() formats W vs kW correctly', () => {
    expect(energyProfile.describe(120)).toBe('120 W');
    expect(energyProfile.describe(999)).toBe('999 W');
    expect(energyProfile.describe(1000)).toBe('1.00 kW');
    expect(energyProfile.describe(2543)).toBe('2.54 kW');
  });
});

describe('waterProfile', () => {
  it('speed curve follows clamp(6000 - v*200, 800, 6000)', () => {
    expect(waterProfile.speed_curve(0)).toBe(6000);
    expect(waterProfile.speed_curve(5)).toBe(5000);
    expect(waterProfile.speed_curve(30)).toBe(800);
    expect(waterProfile.speed_curve(100)).toBe(800);
  });

  it('wave amplitude is a constant 4px per spec', () => {
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
  it('speed is a constant 1500 ms regardless of throughput', () => {
    expect(networkProfile.speed_curve(0)).toBe(1500);
    expect(networkProfile.speed_curve(1000)).toBe(1500);
  });

  it('packet count grows logarithmically and clamps to [1, 20]', () => {
    const f = networkProfile.particle_count_curve!;
    expect(f(0)).toBe(1);
    expect(f(1)).toBeGreaterThanOrEqual(1);
    // at very high values the formula saturates
    expect(f(1_000_000_000_000)).toBe(20);
  });

  it('describe() switches Mbps → Gbps above 1000', () => {
    expect(networkProfile.describe(0.5)).toBe('0.50 Mbps');
    expect(networkProfile.describe(25)).toBe('25.0 Mbps');
    expect(networkProfile.describe(1500)).toBe('1.50 Gbps');
  });
});

describe('hvacProfile', () => {
  it('speed curve follows clamp(5000 - v*10, 600, 5000)', () => {
    expect(hvacProfile.speed_curve(0)).toBe(5000);
    expect(hvacProfile.speed_curve(100)).toBe(4000);
    expect(hvacProfile.speed_curve(1000)).toBe(600);
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
  it('speed curve follows clamp(10000 - v*50000, 2000, 10000)', () => {
    expect(gasProfile.speed_curve(0)).toBe(10000);
    expect(gasProfile.speed_curve(0.1)).toBe(5000);
    expect(gasProfile.speed_curve(1)).toBe(2000);
    expect(gasProfile.speed_curve(10)).toBe(2000);
  });

  it('describe() formats with 2 decimals below 10, 1 above', () => {
    expect(gasProfile.describe(0.42)).toBe('0.42 m³/h');
    expect(gasProfile.describe(15.7)).toBe('15.7 m³/h');
  });
});

describe('genericProfile', () => {
  it('has a sensible default speed curve', () => {
    expect(genericProfile.speed_curve(0)).toBe(5000);
    expect(genericProfile.speed_curve(10_000)).toBe(1000);
  });

  it('describe() picks precision based on magnitude', () => {
    expect(genericProfile.describe(0.25)).toBe('0.25');
    expect(genericProfile.describe(12.5)).toBe('12.5');
    expect(genericProfile.describe(250)).toBe('250');
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
