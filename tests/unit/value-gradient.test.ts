import { describe, it, expect } from 'vitest';
import { interpolateGradientColor } from '../../src/utils.js';
import type { ValueGradientConfig } from '../../src/types.js';

const cfg: ValueGradientConfig = {
  entity: 'sensor.test',
  low_value: 0,
  high_value: 100,
  low_color: '#0000ff',  // blue
  high_color: '#ff0000', // red
};

describe('interpolateGradientColor', () => {
  it('returns low_color at low_value', () => {
    const result = interpolateGradientColor(0, cfg);
    expect(result.toLowerCase()).toBe('#0000ff');
  });

  it('returns high_color at high_value', () => {
    const result = interpolateGradientColor(100, cfg);
    expect(result.toLowerCase()).toBe('#ff0000');
  });

  it('returns an intermediate colour at the midpoint', () => {
    const result = interpolateGradientColor(50, cfg);
    // At midpoint between pure blue (240°) and pure red (0°/360°), through the
    // short path on the colour wheel the hue should be around 300° (purple/magenta).
    expect(result).toMatch(/^#[0-9a-fA-F]{6}$/);
    // Should differ from both endpoints
    expect(result.toLowerCase()).not.toBe('#0000ff');
    expect(result.toLowerCase()).not.toBe('#ff0000');
  });

  it('clamps to low_color below low_value', () => {
    const result = interpolateGradientColor(-50, cfg);
    expect(result.toLowerCase()).toBe('#0000ff');
  });

  it('clamps to high_color above high_value', () => {
    const result = interpolateGradientColor(200, cfg);
    expect(result.toLowerCase()).toBe('#ff0000');
  });

  it('handles equal low/high values without throwing (clamp to t=0)', () => {
    const flatCfg: ValueGradientConfig = { ...cfg, low_value: 50, high_value: 50 };
    const result = interpolateGradientColor(50, flatCfg);
    // range = 0, t = 0, should return low_color
    expect(result.toLowerCase()).toBe('#0000ff');
  });
});
