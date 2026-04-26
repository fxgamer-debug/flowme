/**
 * v1.0.3-debug diagnostic channel. Every log point the user asked for
 * goes through this module so grep-ing `[FlowMe]` in the console gives
 * a complete timeline. This file will be removed / gutted once we've
 * figured out why animation doesn't run in the user's HA instance.
 *
 * Kept as `console.warn` calls because the project's lint config only
 * allows `warn` / `error` without per-line disables. Semantically they
 * are still diagnostic logs — the prefix tells the eye.
 */

/** Top-level tag so everything is one filter away in DevTools. */
const TAG = '[FlowMe]';

export function dlog(...args: unknown[]): void {
  console.warn(TAG, ...args);
}

export function dlogGroup(label: string, body: () => void): void {
  console.warn(`${TAG} ${label}`);
  try {
    body();
  } finally {
    // keep it flat — no groupEnd — because happy-dom doesn't implement groups
  }
}
