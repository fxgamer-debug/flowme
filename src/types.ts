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
  /** Intermediate waypoints the flow passes through, in order. */
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

export interface OverlayConfig {
  type: 'sensor' | 'switch' | 'camera' | 'button' | 'custom';
  position: NodePosition;
  entity?: string;
  size?: { width: number; height: number };
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

export interface FlowProfile {
  domain: FlowDomain;
  default_color_positive: string;
  default_color_negative: string;
  shape: 'dot' | 'square' | 'wave' | 'pulse' | 'gradient';
  glow: boolean;
  /** Unit label, e.g. 'W', 'L/min', 'Mbps'. */
  unit_label: string;
  /** Map a sensor value to a one-cycle animation duration in milliseconds. */
  speed_curve: (value: number) => number;
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
  /** Loose — different HA versions have different shapes. */
  [key: string]: unknown;
}
