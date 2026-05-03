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
  /** Per-node opacity override, 0–1. Falls back to config.opacity.nodes. */
  opacity?: number;
  /**
   * When false the node circle, label and value are hidden. Default: true.
   * v1.0.11+.
   */
  visible?: boolean;
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
  /** Per-flow opacity override, 0–1. Falls back to config.opacity.flows. */
  opacity?: number;
  /**
   * When false the flow line and its animated dots are hidden. Default: true.
   * v1.0.11+.
   */
  visible?: boolean;
  /**
   * How waypoints are connected. Default: 'corner' (current behaviour).
   * v1.0.11+.
   */
  line_style?: LineStyle;
  /**
   * Per-flow override of the sigmoid speed-curve parameters (v1.0.6+).
   * See `SpeedCurveOverride`.
   */
  speed_curve_override?: SpeedCurveOverride;
  /**
   * Per-flow animation style and particle configuration (v1.0.12+).
   * All fields optional — defaults preserve existing behaviour.
   */
  animation?: FlowAnimationConfig;
  /**
   * Value-gradient colour interpolation (v1.0.14+). When set, particle and/or
   * line colour is driven by a secondary sensor entity's numeric value,
   * interpolating linearly between low_color and high_color in HSL space.
   */
  value_gradient?: ValueGradientConfig;
}

export const LINE_STYLES = ['corner', 'diagonal', 'curve', 'smooth'] as const;
export type LineStyle = (typeof LINE_STYLES)[number];

// ── Animation v1.0.12 ──────────────────────────────────────────────────────

export const ANIMATION_STYLES = [
  'dots', 'dash', 'pulse', 'arrow', 'trail', 'fluid', 'spark', 'none',
] as const;
export type AnimationStyle = (typeof ANIMATION_STYLES)[number];

export const PARTICLE_SHAPES = ['circle', 'square', 'arrow', 'teardrop', 'diamond', 'custom_svg'] as const;
export type ParticleShape = (typeof PARTICLE_SHAPES)[number];

export const FLOW_DIRECTIONS = ['auto', 'forward', 'reverse', 'both'] as const;
export type FlowDirection = (typeof FLOW_DIRECTIONS)[number];

export const PARTICLE_SPACINGS = ['even', 'random', 'clustered', 'pulse', 'wave_spacing', 'wave_lateral'] as const;
export type ParticleSpacing = (typeof PARTICLE_SPACINGS)[number];

/**
 * Value-gradient colour interpolation (v1.0.14+). When configured, the flow
 * line and/or particles interpolate colour based on a secondary sensor value.
 */
export interface ValueGradientConfig {
  /** Sensor entity id providing the gradient value. */
  entity: string;
  /** At or below this value, `low_color` is used. */
  low_value: number;
  /** At or above this value, `high_color` is used. */
  high_value: number;
  /** CSS hex colour string for the low end, e.g. "#1EB4FF". */
  low_color: string;
  /** CSS hex colour string for the high end, e.g. "#FF4500". */
  high_color: string;
  /**
   * Which elements receive the gradient colour.
   * 'flow' = particles only (default), 'line' = base line only, 'both' = both.
   */
  mode?: 'flow' | 'line' | 'both';
}

/**
 * Per-flow animation configuration (v1.0.12+). All fields are optional
 * — existing flows without them default to current behaviour.
 */
export interface FlowAnimationConfig {
  /** Visual style for the flow animation. Default: 'dots'. */
  animation_style?: AnimationStyle;
  /** Shape of individual particles. Ignored for dash/pulse/fluid. Default: 'circle'. */
  particle_shape?: ParticleShape;
  /** Direction behaviour. Default: 'auto' (positive→forward, negative→reverse). */
  direction?: FlowDirection;
  /** Multiplier on defaults.dot_radius for particle size. Default: 1.0. */
  particle_size?: number;
  /**
   * Number of particles on path at once. Overrides burst logic when set explicitly.
   * Default: uses profile particle_count_curve / DEFAULT_PARTICLE_COUNT.
   */
  particle_count?: number;
  /** Multiplier on glow opacity. 0 disables glow entirely. Default: 1.0. */
  glow_intensity?: number;
  /**
   * When true and value is at/near threshold: show a very slow (0.2×) gentle
   * animation with 0.3× opacity instead of hiding the flow completely.
   * Default: false.
   */
  shimmer?: boolean;
  /**
   * When true: subtle random ±15% opacity variation per particle at 2–8 Hz.
   * Adds realism to electrical/energy flows. Default: false.
   */
  flicker?: boolean;
  /** pulse style only — ring stroke thickness in px. Default: 2. */
  pulse_width?: number;
  /** trail style only — tail length as multiplier of particle_size. Default: 2.0. */
  trail_length?: number;
  /** dash style only — ratio of gap length to dash length. Default: 0.5. */
  dash_gap?: number;
  /**
   * Spacing mode for particles along the path. Default: 'even'.
   * v1.0.12 schema; v1.0.14 rendering.
   */
  particle_spacing?: ParticleSpacing;
  /**
   * SVG path d= string for custom particle shape.
   * Only used when particle_shape === 'custom_svg'. v1.0.14+.
   * Example: "M 0 -8 L 5 8 L -5 8 Z" (triangle pointing up).
   */
  custom_svg_path?: string;
  /** clustered spacing — particles per cluster. Default: 3. */
  cluster_size?: number;
  /** clustered spacing — gap between clusters as multiplier of cluster length. Default: 2.0. */
  cluster_gap?: number;
  /** pulse spacing — pulses per second. Default: 1.0. */
  pulse_frequency?: number;
  /** pulse spacing — fraction of cycle spent bunched (0–1). Default: 0.3. */
  pulse_ratio?: number;
  /** wave_spacing / wave_lateral — complete waves along path. Default: 1.0. */
  wave_frequency?: number;
  /**
   * wave_spacing — density variation (0=even, 1=max). Default: 0.7.
   * wave_lateral — max perpendicular offset in px. Default: 8.
   */
  wave_amplitude?: number;
}

/**
 * Global animation settings (v1.0.12+). Applied to the renderer loop.
 */
export interface AnimationConfig {
  /**
   * Target frame rate cap (10–60). Default: 60.
   * Lower values save battery on always-on tablets.
   */
  fps?: number;
  /**
   * When true, interpolate speed transitions over 500ms (ease-in-out)
   * instead of abruptly restarting animation when sensor value changes.
   * Direction changes (sign flip) still decelerate to zero then
   * re-accelerate in new direction over 300ms. Default: true.
   */
  smooth_speed?: boolean;
}

export const OVERLAY_TYPES = ['custom'] as const;
export type OverlayType = (typeof OVERLAY_TYPES)[number];

export interface OverlayConfig {
  /** Stable identifier. Auto-assigned if omitted during migration. */
  id: string;
  type: OverlayType;
  position: NodePosition;
  /** Size in percentages of the card container. Defaults to 20×15. */
  size?: { width: number; height: number };
  /**
   * Any valid HA card configuration object. FlowMe passes this directly to
   * `createCardElement()` — it supports any installed card type.
   * Required for `type: custom`.
   */
  card: Record<string, unknown>;
  /**
   * When false the overlay wrapper is hidden (display:none). Default: true.
   * v1.0.9+.
   */
  visible?: boolean;
  /**
   * CSS opacity applied to the wrapper element, 0–1. Default: 1.
   * v1.0.9+.
   */
  opacity?: number;
  /**
   * Set by the validator when a removed native overlay type (camera, switch,
   * sensor, button) is detected. The renderer shows a visible warning at the
   * overlay position instead of crashing. Internal field — do not set manually.
   */
  _migration_warning?: string;
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
 * Domain-level colour overrides (v1.0.8+). Keys are **role keys** for the
 * active domain (see `DOMAIN_COLOUR_PROFILES`); values are CSS `#hex` colours.
 * All entries optional — omit to keep profile defaults.
 */
export type DomainColors = Record<string, string>;

/**
 * Card-level opacity overrides (v1.0.10+). All fields are optional — when
 * omitted the built-in defaults (all 1.0) are used. Values are 0–1.
 */
export interface OpacityConfig {
  /** Background image layer opacity. Default: 1.0. */
  background?: number;
  /** Semi-transparent dark overlay on top of the background image. 0 = none, 1 = fully black. Default: 0. */
  darken?: number;
  /** Node circles and labels. Default: 1.0. */
  nodes?: number;
  /** Flow path lines. Default: 1.0. */
  flows?: number;
  /** Animated particles/dots on flow lines. Default: 1.0. */
  dots?: number;
  /** Glow halos around flow lines. Default: 1.0. */
  glow?: number;
  /** Node label text. Default: 1.0. */
  labels?: number;
  /** Sensor value text on nodes. Default: 1.0. */
  values?: number;
  /** All custom overlays as a group. Default: 1.0. */
  overlays?: number;
}

/**
 * Global layer visibility toggles (v1.0.11+). Binary show/hide for entire
 * rendering layers, independent of opacity settings. All fields default to true.
 */
export interface VisibilityConfig {
  /** Show/hide all node circles, labels and values. Default: true. */
  nodes?: boolean;
  /** Show/hide all flow lines. Default: true. */
  lines?: boolean;
  /** Show/hide animated dots on all flows. Default: true. */
  dots?: boolean;
  /** Show/hide all node labels. Default: true. */
  labels?: boolean;
  /** Show/hide all sensor values on nodes. Default: true. */
  values?: boolean;
  /** Show/hide all custom overlays. Default: true. */
  overlays?: boolean;
}

export interface BackgroundConfig {
  /** Default background image path. */
  default: string;
  /** Map of weather-entity state -> image path. Used when weather_entity is set. */
  weather_states?: Record<string, string>;
  /** Optional weather entity id driving background swaps. */
  weather_entity?: string;
  /**
   * Optional sun entity id (e.g. `sun.sun`). When configured, enables
   * automatic night background variants: if sun.state === 'below_horizon'
   * the current weather state has '-night' appended before lookup, enabling
   * mappings like `partlycloudy-night`. Falls back to `clear-night` as a
   * generic night image, then to `background.default`. v1.0.13+.
   */
  sun_entity?: string;
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
   * Domain colour overrides (v1.0.8+). Keys match the configured domain's
   * role keys (e.g. energy: solar/grid/battery/load; water: supply/drain/…).
   */
  domain_colors?: DomainColors;
  /**
   * Enable verbose debug logging to the browser console. Default false.
   * When false, zero console output is produced during normal operation.
   * v1.0.9+.
   */
  debug?: boolean;
  /**
   * Card-level opacity overrides (v1.0.10+). All fields are optional.
   */
  opacity?: OpacityConfig;
  /**
   * Global layer visibility toggles (v1.0.11+). All fields default to true.
   */
  visibility?: VisibilityConfig;
  /**
   * Global animation settings (v1.0.12+).
   */
  animation?: AnimationConfig;
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

/** HA core websocket client — optional in tests / minimal mocks. */
export interface HassConnection {
  addEventListener(
    type: 'ready' | 'disconnected' | 'reconnect-error',
    listener: (...args: unknown[]) => void,
  ): void;
  removeEventListener(
    type: 'ready' | 'disconnected' | 'reconnect-error',
    listener: (...args: unknown[]) => void,
  ): void;
}

export interface HomeAssistant {
  states: Record<string, HassState>;
  themes?: unknown;
  language?: string;
  locale?: unknown;
  /** Home Assistant websocket connection — used for reconnect continuity (v1.23+). */
  connection?: HassConnection;
  /** Service dispatcher — not always present in tests, hence optional. */
  callService?: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<unknown>;
  /** Loose — different HA versions have different shapes. */
  [key: string]: unknown;
}
