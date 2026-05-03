/** Ease-in-out quadratic (matches ANIM-1 spec). */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

export interface DurInterpState {
  currentDurMs: Map<string, number>;
  interpFromMs: Map<string, number>;
  interpTargetMs: Map<string, number>;
  interpStartMs: Map<string, number>;
}

export function createDurInterpState(): DurInterpState {
  return {
    currentDurMs: new Map(),
    interpFromMs: new Map(),
    interpTargetMs: new Map(),
    interpStartMs: new Map(),
  };
}

export function clearDurInterpolation(flowId: string, s: DurInterpState): void {
  s.interpFromMs.delete(flowId);
  s.interpTargetMs.delete(flowId);
  s.interpStartMs.delete(flowId);
}

const SNAP_EPS_MS = 50;
const TRANSITION_MS = 500;

/**
 * Smooth duration transitions for animateMotion / timing updates.
 * Interpolates from a fixed start value toward the target over {@link TRANSITION_MS}.
 */
export function resolveSmoothedDuration(
  flowId: string,
  targetMs: number,
  smooth: boolean,
  now: number,
  s: DurInterpState,
): number {
  if (!smooth) {
    s.currentDurMs.set(flowId, targetMs);
    clearDurInterpolation(flowId, s);
    return targetMs;
  }

  const prevDisplayed = s.currentDurMs.get(flowId) ?? targetMs;

  if (Math.abs(targetMs - prevDisplayed) < SNAP_EPS_MS) {
    s.currentDurMs.set(flowId, targetMs);
    clearDurInterpolation(flowId, s);
    return targetMs;
  }

  const prevTarget = s.interpTargetMs.get(flowId);
  if (prevTarget !== targetMs) {
    s.interpFromMs.set(flowId, prevDisplayed);
    s.interpTargetMs.set(flowId, targetMs);
    s.interpStartMs.set(flowId, now);
  }

  const from = s.interpFromMs.get(flowId) ?? targetMs;
  const to = s.interpTargetMs.get(flowId) ?? targetMs;
  const start = s.interpStartMs.get(flowId) ?? now;
  const elapsed = now - start;
  const t = Math.min(elapsed / TRANSITION_MS, 1);
  const eased = easeInOutQuad(t);
  const dur = from + (to - from) * eased;
  s.currentDurMs.set(flowId, dur);
  if (t >= 1) {
    s.currentDurMs.set(flowId, to);
    clearDurInterpolation(flowId, s);
    return to;
  }
  return dur;
}
