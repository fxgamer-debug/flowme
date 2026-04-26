import type { FlowProfile } from '../types.js';
import { clamp } from '../utils.js';

/**
 * Energy profile: dot trail, glow, watts to speed.
 *
 * Speed curve (anchors, verified by `tests/unit/flow-profiles.test.ts`):
 *   10 W    → 8000 ms   (slow dribble at idle)
 *   100 W   → 6000 ms
 *   1000 W  → 4000 ms
 *   10 kW   → 2000 ms   (fast visible flow at inverter peak)
 *   clamped to [400 ms, 8000 ms].
 *
 * Formula: `dur = clamp(8000 - log10(magnitude / 10) * 2000, 400, 8000)`.
 *
 * **Inputs are in WATTS.** The card auto-converts kW / MW / mW sensors to
 * watts via `unit_scale` below before they reach this curve, so users with
 * HA power sensors that natively report kW (inverters, EV chargers, large
 * appliances) get the same animation feel as users whose sensors report W.
 * Prior to v1.0.4 a kW sensor fed raw into this curve (e.g. `2.0` for
 * 2 kW) produced `log10(0.2) = -0.7` and clamped to the 8000 ms ceiling,
 * making every flow look frozen.
 */
export const energyProfile: FlowProfile = {
  domain: 'energy',
  default_color_positive: '#FFD700',
  default_color_negative: '#4ADE80',
  shape: 'dot',
  glow: true,
  unit_label: 'W',
  unit_scale: {
    W: 1,
    Wh: 1, // tolerate energy-as-power sensors, no-op conversion
    kW: 1000,
    kWh: 1000,
    MW: 1_000_000,
    mW: 1e-3,
  },
  // Lowered from 10 → 1 W in v1.0.2. Matches the profile's base unit
  // (watts) — flows on a kW sensor are normalised to watts before this
  // comparison runs, so a 0.5 kW draw is tested as 500 W ≥ 1 W ✓.
  visibility_threshold: 1,

  speed_curve(value: number): number {
    const magnitude = Math.abs(value);
    if (magnitude <= 0) return 8000;
    const raw = 8000 - Math.log10(magnitude / 10) * 2000;
    return clamp(raw, 400, 8000);
  },

  describe(value: number): string {
    const magnitude = Math.abs(value);
    if (magnitude >= 1000) {
      return `${(value / 1000).toFixed(2)} kW`;
    }
    return `${Math.round(value)} W`;
  },
};
