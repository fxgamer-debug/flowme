import { describe, expect, it } from 'vitest';
import {
  createDurInterpState,
  easeInOutQuad,
  resolveSmoothedDuration,
} from '../../src/animation/dur-interpolation.js';

describe('easeInOutQuad', () => {
  it('is 0 at 0 and 1 at 1', () => {
    expect(easeInOutQuad(0)).toBe(0);
    expect(easeInOutQuad(1)).toBe(1);
  });

  it('is symmetric-ish mid-point', () => {
    const m = easeInOutQuad(0.5);
    expect(m).toBeGreaterThan(0.4);
    expect(m).toBeLessThan(0.6);
  });
});

describe('resolveSmoothedDuration', () => {
  it('snaps when delta < 50ms', () => {
    const s = createDurInterpState();
    const out = resolveSmoothedDuration('a', 1000, true, 0, s);
    expect(out).toBe(1000);
    const snap = resolveSmoothedDuration('a', 1040, true, 10, s);
    expect(snap).toBe(1040);
    expect(s.interpStartMs.size).toBe(0);
  });

  it('interpolates from fixed start toward target over 500ms', () => {
    const s = createDurInterpState();
    resolveSmoothedDuration('f', 1000, true, 0, s);
    resolveSmoothedDuration('f', 3000, true, 0, s);
    const mid = resolveSmoothedDuration('f', 3000, true, 250, s);
    expect(mid).toBeGreaterThan(1000);
    expect(mid).toBeLessThan(3000);
    const end = resolveSmoothedDuration('f', 3000, true, 600, s);
    expect(end).toBe(3000);
    expect(s.interpStartMs.size).toBe(0);
  });
});
