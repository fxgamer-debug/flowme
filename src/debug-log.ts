/**
 * FlowMe diagnostic logging channel. All output is gated behind the
 * card-level `debug: true` config flag so a production install with
 * the default `debug: false` produces zero console output during
 * normal operation.
 *
 * Call `setDebugEnabled(config.debug ?? false)` from `setConfig()` to
 * update the flag. `dlog` checks the flag before every call — no
 * per-call guards needed at the call sites.
 *
 * `console.error` is intentionally NOT gated here: genuine failures
 * (renderer crashes, SVG init errors) always surface regardless of
 * the debug flag.
 */

const TAG = '[FlowMe]';
let _debugEnabled = false;

/** Call once per setConfig() to flip the logging gate. */
export function setDebugEnabled(flag: boolean): void {
  _debugEnabled = flag;
}

/** Read `debug: true` from raw config before `validateConfig` so validation + dlog are gated. */
export function peekDebugFromRaw(raw: unknown): boolean {
  return !!(raw && typeof raw === 'object' && (raw as Record<string, unknown>)['debug'] === true);
}

/** Logs when `debug: true` is set in card config. No-op otherwise. */
export function dlog(...args: unknown[]): void {
  if (!_debugEnabled) return;
  console.warn(TAG, ...args);
}

/** Whether the card was configured with `debug: true` (for adaptive logs, etc.). */
export function isDebugEnabled(): boolean {
  return _debugEnabled;
}
