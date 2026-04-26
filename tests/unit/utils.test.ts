import { describe, it, expect } from 'vitest';

import {
  clamp,
  lerp,
  percentToPixel,
  pixelToPercent,
  pathLengthPercent,
  pointAtProgress,
  polylineToSvgPath,
  parseSensorValue,
  debounce,
  parseAspectRatio,
} from '../../src/utils.js';

describe('clamp', () => {
  it('returns the value when inside the range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it('clamps below min', () => {
    expect(clamp(-4, 0, 10)).toBe(0);
  });
  it('clamps above max', () => {
    expect(clamp(42, 0, 10)).toBe(10);
  });
});

describe('lerp', () => {
  it('returns a at t=0 and b at t=1', () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });
  it('interpolates the midpoint', () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
  });
  it('extrapolates past the endpoints without clamping', () => {
    expect(lerp(0, 10, 2)).toBe(20);
    expect(lerp(0, 10, -1)).toBe(-10);
  });
});

describe('percent / pixel conversions', () => {
  const size = { width: 200, height: 100 };
  it('converts percent to pixel', () => {
    expect(percentToPixel({ x: 50, y: 50 }, size)).toEqual({ x: 100, y: 50 });
  });
  it('round-trips through pixelToPercent', () => {
    const original = { x: 37, y: 42 };
    const px = percentToPixel(original, size);
    const back = pixelToPercent(px, size);
    expect(back.x).toBeCloseTo(original.x, 6);
    expect(back.y).toBeCloseTo(original.y, 6);
  });
});

describe('pathLengthPercent', () => {
  it('returns 0 for an empty or single-point path', () => {
    expect(pathLengthPercent([])).toBe(0);
    expect(pathLengthPercent([{ x: 10, y: 10 }])).toBe(0);
  });
  it('measures a straight horizontal line', () => {
    expect(pathLengthPercent([{ x: 0, y: 0 }, { x: 10, y: 0 }])).toBe(10);
  });
  it('sums multiple segments', () => {
    // 3-4-5 triangle hop
    expect(
      pathLengthPercent([
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 4 },
      ]),
    ).toBe(7);
  });
});

describe('pointAtProgress', () => {
  const path = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
  ];
  it('returns the first point at progress 0', () => {
    expect(pointAtProgress(path, 0)).toEqual({ x: 0, y: 0 });
  });
  it('returns the last point at progress 1', () => {
    expect(pointAtProgress(path, 1)).toEqual({ x: 10, y: 10 });
  });
  it('clamps progress above 1 to the last point', () => {
    expect(pointAtProgress(path, 5)).toEqual({ x: 10, y: 10 });
  });
  it('samples the midpoint of a two-segment path', () => {
    // total length = 20, midpoint is at the elbow (10,0)
    expect(pointAtProgress(path, 0.5)).toEqual({ x: 10, y: 0 });
  });
  it('handles empty paths gracefully', () => {
    expect(pointAtProgress([], 0.5)).toEqual({ x: 0, y: 0 });
  });
});

describe('polylineToSvgPath', () => {
  it('returns empty string for an empty path', () => {
    expect(polylineToSvgPath([], { width: 100, height: 100 })).toBe('');
  });
  it('produces M + L commands with pixel coords', () => {
    const d = polylineToSvgPath(
      [
        { x: 0, y: 0 },
        { x: 50, y: 50 },
      ],
      { width: 200, height: 100 },
    );
    expect(d).toBe('M 0.00 0.00 L 100.00 50.00');
  });
});

describe('parseSensorValue', () => {
  it('returns 0 for null / undefined / unavailable / unknown', () => {
    expect(parseSensorValue(null)).toBe(0);
    expect(parseSensorValue(undefined)).toBe(0);
    expect(parseSensorValue('unavailable')).toBe(0);
    expect(parseSensorValue('unknown')).toBe(0);
    expect(parseSensorValue('')).toBe(0);
  });
  it('parses plain numeric strings', () => {
    expect(parseSensorValue('1234')).toBe(1234);
    expect(parseSensorValue('-2.5')).toBe(-2.5);
  });
  it('parses values with trailing units', () => {
    expect(parseSensorValue('42 W')).toBe(42);
    expect(parseSensorValue('3.14 kW')).toBe(3.14);
  });
  it('passes through numbers', () => {
    expect(parseSensorValue(17)).toBe(17);
    expect(parseSensorValue(Number.NaN)).toBe(0);
    expect(parseSensorValue(Number.POSITIVE_INFINITY)).toBe(0);
  });
});

describe('debounce', () => {
  it('collapses multiple calls into the last args', async () => {
    const calls: unknown[] = [];
    const deb = debounce((...args: unknown[]) => calls.push(args[0]), 10);
    deb(1);
    deb(2);
    deb(3);
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(calls).toEqual([3]);
  });

  it('cancels pending trailing call', async () => {
    const calls: unknown[] = [];
    const deb = debounce((...args: unknown[]) => calls.push(args[0]), 10);
    deb(1);
    deb.cancel();
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(calls).toEqual([]);
  });
});

describe('parseAspectRatio', () => {
  it('parses w:h strings', () => {
    expect(parseAspectRatio('16:10')).toBe(1.6);
    expect(parseAspectRatio('4:3')).toBeCloseTo(4 / 3, 6);
    expect(parseAspectRatio('1:1')).toBe(1);
  });
  it('returns undefined for malformed or zero-side strings', () => {
    expect(parseAspectRatio(undefined)).toBeUndefined();
    expect(parseAspectRatio('')).toBeUndefined();
    expect(parseAspectRatio('16x10')).toBeUndefined();
    expect(parseAspectRatio('0:10')).toBeUndefined();
    expect(parseAspectRatio('16:0')).toBeUndefined();
  });
});
