/**
 * Core type definitions for flowme. Everything else depends on these.
 * See spec §"Type definitions".
 */

export const FLOW_DOMAINS = [
  'energy',
  'water',
  'network',
  'hvac',
  'gas',
  'generic',
] as const;

export type FlowDomain = (typeof FLOW_DOMAINS)[number];

export interface NodePosition {
  /** 0-100 percentage of container width */
  x: number;
  /** 0-100 percentage of container height */
  y: number;
}

export interface NodeConfig {
  id: string;
  position: NodePosition;
  /** Optional sensor entity for value display at the node. */
  entity?: string;
  label?: string;
  /** Override profile colour for this node only. */
  color?: string;
  /** Node radius in px. Falls back to a per-profile default. */
  size?: number;
  show_label?: boolean;
  show_value?: boolean;
}

/**
 * Per-flow override of the unified sigmoid speed curve (v1.0.6+). Every
 * field is independently optional — unset fields fall back to the active
 * profile's calibration, then to the universal constants
 * (`UNIVERSAL_MAX_DURATION_MS`, `UNIVERSAL_MIN_DURATION_MS`,
 * `UNIVERSAL_STEEPNESS`). See `utils.ts → resolveSpeedCurveParams`.
 */
export interface SpeedCurveOverride {
  /** Visibility cut-off and sigmoid lower-bound clamp (in profile units). */
  threshold?: number;
  /** Median value — the sigmoid midpoint. Half the duration span at v == p50. */
  p50?: number;
  /** Asymptote anchor (also drives burst-mode trigger at 0.9 × peak). */
  peak?: number;
  /** Slowest visible duration (ms). Default 9000. */
  max_duration?: number;
  /** Fastest visible duration (ms). Default 700. */
  min_duration?: number;
  /** Sigmoid steepness `k`. Default 1.5 — higher is sharper. */
  steepness?: number;
}

export interface FlowConfig {
  id: string;
  /** Node id to originate at. */
  from_node: string;
  /** Node id to terminate at. */
  to_node: string;
  /** Sensor entity providing the flow value (typically a number). */
  entity: string;
  /**
   * Intermediate waypoints the flow passes through, in order. Optional in
   * YAML — when omitted the flow renders as a straight line from
   * `from_node` to `to_node`. The validator normalises undefined → [].
   */
  waypoints: NodePosition[];
  /** Override the card-level domain for this flow. */
  domain?: FlowDomain;
  /**
   * Single-colour shorthand. When set (and the direction-specific
   * `color_positive` / `color_negative` are omitted) it is used for both
   * directions of flow, and the connected nodes inherit it as well.
   * v1.0.7+.
   */
  color?: string;
  color_positive?: string;
  color_negative?: string;
  /**
   * Legacy shortcut for `speed_curve_override.threshold`. When both are
   * set, `speed_curve_override.threshold` wins. Kept so v1.0.x configs
   * that set `threshold:` directly continue to work unchanged.
   */
  threshold?: number;
  /** Flip direction interpretation (useful when a sensor reports reverse sign). */
  reverse?: boolean;
  /** Speed tweak: 0.1 through 5.0, applied after the curve. 1.0 is profile default. */
  speed_multiplier?: number;
  /**
   * Per-flow override of the sigmoid speed-curve parameters (v1.0.6+).
   * See `SpeedCurveOverride`.
   */
  speed_curve_override?: SpeedCurveOverride;
}

export const OVERLAY_TYPES = ['sensor', 'switch', 'camera', 'button', 'custom'] as const;
export type OverlayType = (typeof OVERLAY_TYPES)[number];

export const TAP_ACTIONS = ['toggle', 'more-info', 'none'] as const;
export type TapActionKind = (typeof TAP_ACTIONS)[number];

export interface TapActionConfig {
  action: TapActionKind;
}

export interface OverlayConfig {
  /** Stable identifier. Auto-assigned if omitted during migration. */
  id: string;
  type: OverlayType;
  position: NodePosition;
  entity?: string;
  label?: string;
  /** Size in percentages of the card container. Defaults to 10×6. */
  size?: { width: number; height: number };
  /**
   * What happens when the overlay is tapped. Defaults per type:
   *   switch  → toggle
   *   button  → toggle (if entity set) else none
   *   sensor  → more-info
   *   camera  → more-info
   *   custom  → whatever the embedded card decides
   */
  tap_action?: TapActionConfig;
  /** Full HA card config, only used when type === 'custom'. */
  card_config?: Record<string, unknown>;
  /**
   * Camera only. Refresh interval in seconds. Overrides
   * `FlowmeDefaults.camera_refresh_interval` for this overlay. Default: 10.
   */
  refresh_interval?: number;
  /**
   * Camera only. Text to show in the `title` attribute of the offline
   * placeholder. Set to an empty string to show only the icon with no text.
   * Default: empty string (no text). v1.0.8+.
   */
  offline_label?: string;
}

/**
 * Card-level defaults block (v1.0.8+). Every field is optional — when
 * omitted the built-in constants are used. This lets users tune rendering
 * behaviour once at the card level rather than per-flow.
 */
export interface FlowmeDefaults {
  /** Default node dot radius in px. Used when `node.size` is not set. Default: 12. */
  node_radius?: number;
  /**
   * Camera snapshot refresh interval in seconds. Applies to all camera
   * overlays on this card unless overridden by the individual overlay's
   * `refresh_interval`. Default: 10.
   */
  camera_refresh_interval?: number;
  /**
   * Fraction of `peak` at which a flow enters burst-density mode, e.g. 0.9
   * means 90% of peak. Default: 0.9.
   */
  burst_trigger_ratio?: number;
  /**
   * How many milliseconds a flow must stay above the burst trigger before
   * particle count increases. Default: 5000.
   */
  burst_sustain_ms?: number;
  /** Maximum number of particles allowed in burst mode. Default: 20. */
  burst_max_particles?: number;
  /** Dot/square particle radius in px. Default: 5. */
  dot_radius?: number;
  /** Flow line stroke width in px. Default: 2. */
  line_width?: number;
}

/**
 * Domain-level colour overrides (v1.0.8+). These override the id-pattern
 * defaults applied by `defaultDomainFlowColor` for the energy domain. All
 * fields optional — omit to keep the built-in defaults
 * (#FFD700 / #1EB4FF / #32DC50 / #FF8C1E).
 */
export interface DomainColors {
  solar?: string;
  grid?: string;
  battery?: string;
  load?: string;
}

export interface BackgroundConfig {
  /** Default background image path. */
  default: string;
  /** Map of weather-entity state -> image path. Used when weather_entity is set. */
  weather_states?: Record<string, string>;
  /** Optional weather entity id driving background swaps. */
  weather_entity?: string;
  /** Fade duration between background images, in milliseconds. Default 2000. */
  transition_duration?: number;
}

export interface FlowmeConfig {
  type: 'custom:flowme-card';
  domain: FlowDomain;
  background: BackgroundConfig;
  nodes: NodeConfig[];
  flows: FlowConfig[];
  overlays?: OverlayConfig[];
  /** e.g. '16:10'. Defaults to the background image's native aspect. */
  aspect_ratio?: string;
  /** Panel/fullscreen mode. */
  fullscreen?: boolean;
  /** Optional password required before the editor activates. */
  edit_mode_password?: string;
  /** Card-level rendering defaults (v1.0.8+). All fields optional. */
  defaults?: FlowmeDefaults;
  /**
   * Energy-domain colour overrides (v1.0.8+). Override the built-in
   * id-pattern defaults (solar/grid/battery/load) without having to set
   * `color:` on every individual flow.
   */
  domain_colors?: DomainColors;
}

export type FlowShape = 'dot' | 'square' | 'wave' | 'pulse' | 'gradient';

export interface FlowProfile {
  domain: FlowDomain;
  default_color_positive: string;
  default_color_negative: string;
  shape: FlowShape;
  glow: boolean;
  /** Unit label, e.g. 'W', 'L/min', 'Mbps'. This is the profile's *base*
   *  unit — every number the `speed_curve`, `threshold`/`p50`/`peak` and
   *  `describe` see is in this unit. */
  unit_label: string;
  /**
   * Optional multiplicative scaling table from a sensor's reported
   * `unit_of_measurement` to the profile's base unit. When set, the card
   * auto-converts kW / MW / mW → W (etc.) before pushing the value to the
   * renderer so users don't have to add a `value_multiplier` to every flow.
   *
   * Example (energy): `{ W: 1, kW: 1000, MW: 1_000_000, mW: 1e-3 }`. A
   * sensor reporting `2.5` with `unit_of_measurement: 'kW'` is scaled to
   * `2500` before `speed_curve(2500)` runs. Unknown / missing units leave
   * the value untouched (assumed to already be in the base unit — keeps
   * backward compat with v1.0.2 configs).
   *
   * Keys are matched case-insensitively.
   */
  unit_scale?: Readonly<Record<string, number>>;
  /**
   * Visibility cut-off (in `unit_label`). Magnitudes below this hide the
   * flow entirely, and the sigmoid curve clamps `v` up to `threshold`
   * before computing duration so we never log10(0). v1.0.6+.
   */
  threshold: number;
  /**
   * Median value — the sigmoid midpoint. At `v == p50` the duration sits
   * exactly halfway between `max_duration` and `min_duration`. Picked
   * per-domain so the *typical* residential reading lands at "medium
   * pace". v1.0.6+.
   */
  p50: number;
  /**
   * Asymptote anchor and burst trigger (in `unit_label`). The sigmoid
   * approaches `min_duration` as `v` grows past `p50`; sustained
   * magnitudes ≥ 0.9 × `peak` enter burst-density mode. Should reflect
   * the *typical residential peak* for the domain, not the absolute
   * physical maximum. v1.0.6+.
   */
  peak: number;
  /**
   * When a flow stays above 90% of `peak` for ≥ 5 s, particle count is
   * multiplied by this factor (capped at 20 particles). Lets flows look
   * visibly more intense at saturation when the sigmoid is asymptoting
   * and they can no longer get any faster. Defaults to 1.5. Set to 1 to
   * disable burst mode for a profile. v1.0.5+.
   */
  burst_density_multiplier?: number;
  /**
   * Map a sensor value (in the profile's base unit) to a one-cycle
   * animation duration in milliseconds. Implemented by every profile via
   * the universal sigmoid (`sigmoidSpeedCurve` in `utils.ts`) using this
   * profile's `threshold` / `p50` / `peak` — domains may *not* deviate
   * from the unified shape function in v1.0.6+; per-flow overrides are
   * the supported escape hatch. v1.0.6+.
   */
  speed_curve: (value: number) => number;
  /**
   * Particle count per flow as a function of value. Used by shapes that
   * encode intensity via density rather than speed (e.g. network packets).
   * Defaults to a constant 3 when omitted.
   */
  particle_count_curve?: (value: number) => number;
  /**
   * Wave amplitude in px as a function of value. Used by shape='wave' only.
   * Defaults to a constant 4 px when omitted.
   */
  wave_amplitude_curve?: (value: number) => number;
  /** Human-readable value rendering. e.g. 1200 -> "1.2 kW". */
  describe: (value: number) => string;
}

/**
 * Minimal subset of the Home Assistant object exposed to cards. We avoid the
 * full `HomeAssistant` type from `custom-card-helpers` in hot paths because
 * it's overweight — only the fields we actually read are declared here.
 */
export interface HassState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassState>;
  themes?: unknown;
  language?: string;
  locale?: unknown;
  /** Service dispatcher — not always present in tests, hence optional. */
  callService?: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<unknown>;
  /** Loose — different HA versions have different shapes. */
  [key: string]: unknown;
}
