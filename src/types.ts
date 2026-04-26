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
  color_positive?: string;
  color_negative?: string;
  /** Values with absolute value below this are treated as "no flow". */
  threshold?: number;
  /** Flip direction interpretation (useful when a sensor reports reverse sign). */
  reverse?: boolean;
  /** Speed tweak: 0.1 through 5.0. 1.0 is profile default. */
  speed_multiplier?: number;
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
}

export type FlowShape = 'dot' | 'square' | 'wave' | 'pulse' | 'gradient';

export interface FlowProfile {
  domain: FlowDomain;
  default_color_positive: string;
  default_color_negative: string;
  shape: FlowShape;
  glow: boolean;
  /** Unit label, e.g. 'W', 'L/min', 'Mbps'. This is the profile's *base*
   *  unit — every number the `speed_curve`, `visibility_threshold` and
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
   * Value (in `unit_label`) at which the animation reaches the universal
   * *slowest* visible duration (4500 ms). Values at or below this are
   * animated at the slowest speed. The `visibility_threshold` also
   * defaults to this value — sensor readings below it are considered noise
   * and the flow is hidden altogether. v1.0.5+.
   */
  speed_range_min: number;
  /**
   * Value (in `unit_label`) at which the animation reaches the universal
   * *fastest* duration (600 ms). Values above this saturate — they stay
   * pinned at 600 ms but can trigger burst-density mode (see
   * `burst_density_multiplier`). Should reflect the *typical residential
   * peak* for the domain, not the absolute physical maximum. v1.0.5+.
   */
  speed_range_max: number;
  /**
   * When a flow stays above 90% of `speed_range_max` for ≥ 5 s, particle
   * count is multiplied by this factor (capped at 20 particles). Lets
   * flows look visibly more intense at saturation when they can no longer
   * get any faster. Defaults to 1.5. Set to 1 to disable burst mode for
   * a profile. v1.0.5+.
   */
  burst_density_multiplier?: number;
  /** Map a sensor value (in the profile's base unit) to a one-cycle
   *  animation duration in milliseconds. Profiles should implement this
   *  via `logCurveDuration(value, speed_range_min, speed_range_max)` to
   *  get the universal shape; they may deviate if their domain has an
   *  inherently different feel (e.g. network treats speed as a constant). */
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
  /** Flows with absolute value below this are hidden. */
  visibility_threshold: number;
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
