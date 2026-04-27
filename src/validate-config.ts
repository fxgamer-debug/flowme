import type {
  FlowmeConfig,
  FlowmeDefaults,
  DomainColors,
  NodeConfig,
  FlowConfig,
  NodePosition,
  OverlayConfig,
  SpeedCurveOverride,
} from './types.js';
import { FLOW_DOMAINS } from './types.js';
import { findUnsafeUrls } from './overlays/url-scan.js';

export class FlowmeConfigError extends Error {
  override name = 'FlowmeConfigError';
}

const ALLOWED_URL_PREFIXES = ['/local/', '/api/', '/hacsfiles/', 'https://', 'http://'];

function fail(path: string, reason: string): never {
  throw new FlowmeConfigError(`${path}: ${reason}`);
}

function validatePosition(pos: unknown, path: string): NodePosition {
  if (!pos || typeof pos !== 'object') fail(path, 'must be an object with x and y');
  const p = pos as Record<string, unknown>;
  const x = p['x'];
  const y = p['y'];
  if (typeof x !== 'number' || !Number.isFinite(x)) fail(`${path}.x`, 'must be a finite number');
  if (typeof y !== 'number' || !Number.isFinite(y)) fail(`${path}.y`, 'must be a finite number');
  const xn = x as number;
  const yn = y as number;
  if (xn < 0 || xn > 100) fail(`${path}.x`, `must be in range 0-100, got ${xn}`);
  if (yn < 0 || yn > 100) fail(`${path}.y`, `must be in range 0-100, got ${yn}`);
  return { x: xn, y: yn };
}

function validateUrlScheme(url: unknown, path: string): string {
  if (typeof url !== 'string' || !url.length) fail(path, 'must be a non-empty string');
  const s = url as string;
  const allowed = ALLOWED_URL_PREFIXES.some((prefix) => s.startsWith(prefix));
  if (!allowed) {
    fail(
      path,
      `must start with one of ${ALLOWED_URL_PREFIXES.join(', ')} (got "${s.slice(0, 40)}")`,
    );
  }
  return s;
}

function validateNode(raw: unknown, idx: number, seenIds: Set<string>): NodeConfig {
  const path = `nodes[${idx}]`;
  if (!raw || typeof raw !== 'object') fail(path, 'must be an object');
  const n = raw as Record<string, unknown>;
  const id = n['id'];
  if (typeof id !== 'string' || !id.length) fail(`${path}.id`, 'must be a non-empty string');
  const idStr = id as string;
  if (seenIds.has(idStr)) fail(`${path}.id`, `duplicate node id "${idStr}"`);
  seenIds.add(idStr);
  const position = validatePosition(n['position'], `${path}.position`);

  const node: NodeConfig = { id: idStr, position };
  if (typeof n['entity'] === 'string') node.entity = n['entity'] as string;
  if (typeof n['label'] === 'string') node.label = n['label'] as string;
  if (typeof n['color'] === 'string') node.color = n['color'] as string;
  if (typeof n['size'] === 'number') node.size = n['size'] as number;
  if (typeof n['show_label'] === 'boolean') node.show_label = n['show_label'] as boolean;
  if (typeof n['show_value'] === 'boolean') node.show_value = n['show_value'] as boolean;
  return node;
}

function validateFlow(
  raw: unknown,
  idx: number,
  seenIds: Set<string>,
  nodeIds: Set<string>,
): FlowConfig {
  const path = `flows[${idx}]`;
  if (!raw || typeof raw !== 'object') fail(path, 'must be an object');
  const f = raw as Record<string, unknown>;
  const id = f['id'];
  if (typeof id !== 'string' || !id.length) fail(`${path}.id`, 'must be a non-empty string');
  const idStr = id as string;
  if (seenIds.has(idStr)) fail(`${path}.id`, `duplicate flow id "${idStr}"`);
  seenIds.add(idStr);

  const from = f['from_node'];
  if (typeof from !== 'string' || !nodeIds.has(from)) {
    fail(`${path}.from_node`, `references unknown node "${String(from)}"`);
  }
  const to = f['to_node'];
  if (typeof to !== 'string' || !nodeIds.has(to)) {
    fail(`${path}.to_node`, `references unknown node "${String(to)}"`);
  }

  const entity = f['entity'];
  if (typeof entity !== 'string' || !entity.length) {
    fail(`${path}.entity`, 'must be a non-empty entity id');
  }

  // waypoints is optional — omit → straight line. When present it must be an
  // array of valid positions.
  const wpRaw = f['waypoints'];
  let waypoints: NodePosition[] = [];
  if (wpRaw !== undefined) {
    if (!Array.isArray(wpRaw)) fail(`${path}.waypoints`, 'must be an array (may be empty or omitted)');
    waypoints = (wpRaw as unknown[]).map((wp, wi) =>
      validatePosition(wp, `${path}.waypoints[${wi}]`),
    );
  }

  const flow: FlowConfig = {
    id: idStr,
    from_node: from as string,
    to_node: to as string,
    entity: entity as string,
    waypoints,
  };

  if (typeof f['domain'] === 'string') {
    if (!FLOW_DOMAINS.includes(f['domain'] as never)) {
      fail(`${path}.domain`, `must be one of ${FLOW_DOMAINS.join(', ')}`);
    }
    flow.domain = f['domain'] as FlowConfig['domain'];
  }
  if (typeof f['color'] === 'string') flow.color = f['color'] as string;
  if (typeof f['color_positive'] === 'string') flow.color_positive = f['color_positive'] as string;
  if (typeof f['color_negative'] === 'string') flow.color_negative = f['color_negative'] as string;
  if (typeof f['threshold'] === 'number') flow.threshold = f['threshold'] as number;
  if (typeof f['reverse'] === 'boolean') flow.reverse = f['reverse'] as boolean;
  if (typeof f['speed_multiplier'] === 'number') {
    const sm = f['speed_multiplier'] as number;
    if (sm < 0.1 || sm > 5.0) fail(`${path}.speed_multiplier`, 'must be between 0.1 and 5.0');
    flow.speed_multiplier = sm;
  }
  if (f['speed_curve_override'] !== undefined) {
    flow.speed_curve_override = validateSpeedCurveOverride(
      f['speed_curve_override'],
      `${path}.speed_curve_override`,
    );
  }
  return flow;
}

/**
 * Validate the per-flow `speed_curve_override` block (v1.0.6+). Every
 * field is independently optional so users can override only the bits
 * they care about and inherit the rest from the profile / universal
 * defaults. All numeric fields must be finite; `threshold`, `p50` and
 * `peak` must be > 0 (the sigmoid uses log10(v / p50) so zero collapses
 * the curve); `max_duration` and `min_duration` must be ≥ 50 ms; and
 * `min_duration` must be < `max_duration` when both are set.
 */
function validateSpeedCurveOverride(raw: unknown, path: string): SpeedCurveOverride {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail(path, 'must be an object');
  }
  const o = raw as Record<string, unknown>;
  const out: SpeedCurveOverride = {};

  function readPositive(key: keyof SpeedCurveOverride): number | undefined {
    const v = o[key as string];
    if (v === undefined) return undefined;
    if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) {
      fail(`${path}.${key as string}`, 'must be a positive finite number');
    }
    return v as number;
  }
  function readDuration(key: keyof SpeedCurveOverride): number | undefined {
    const v = o[key as string];
    if (v === undefined) return undefined;
    if (typeof v !== 'number' || !Number.isFinite(v) || v < 50) {
      fail(`${path}.${key as string}`, 'must be a finite number ≥ 50 (milliseconds)');
    }
    return v as number;
  }

  const t = readPositive('threshold');
  if (t !== undefined) out.threshold = t;
  const p50 = readPositive('p50');
  if (p50 !== undefined) out.p50 = p50;
  const peak = readPositive('peak');
  if (peak !== undefined) out.peak = peak;
  const maxD = readDuration('max_duration');
  if (maxD !== undefined) out.max_duration = maxD;
  const minD = readDuration('min_duration');
  if (minD !== undefined) out.min_duration = minD;
  if (o['steepness'] !== undefined) {
    const s = o['steepness'];
    if (typeof s !== 'number' || !Number.isFinite(s) || s <= 0) {
      fail(`${path}.steepness`, 'must be a positive finite number');
    }
    out.steepness = s as number;
  }

  if (
    out.max_duration !== undefined &&
    out.min_duration !== undefined &&
    out.min_duration >= out.max_duration
  ) {
    fail(path, 'min_duration must be < max_duration');
  }

  // Allowed extra keys check — surface typos rather than silently dropping.
  const allowedKeys = new Set([
    'threshold',
    'p50',
    'peak',
    'max_duration',
    'min_duration',
    'steepness',
  ]);
  for (const key of Object.keys(o)) {
    if (!allowedKeys.has(key)) {
      fail(`${path}.${key}`, `unknown key (allowed: ${[...allowedKeys].join(', ')})`);
    }
  }
  return out;
}

function validatePositiveNumber(val: unknown, path: string): number {
  if (typeof val !== 'number' || !Number.isFinite(val) || val <= 0) {
    fail(path, 'must be a positive finite number');
  }
  return val as number;
}

function validateDefaults(raw: unknown): FlowmeDefaults {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('defaults', 'must be an object');
  }
  const d = raw as Record<string, unknown>;
  const out: FlowmeDefaults = {};
  if (d['node_radius'] !== undefined) out.node_radius = validatePositiveNumber(d['node_radius'], 'defaults.node_radius');
  if (d['burst_trigger_ratio'] !== undefined) {
    const v = validatePositiveNumber(d['burst_trigger_ratio'], 'defaults.burst_trigger_ratio');
    if (v > 1) fail('defaults.burst_trigger_ratio', 'must be ≤ 1 (it is a fraction of peak)');
    out.burst_trigger_ratio = v;
  }
  if (d['burst_sustain_ms'] !== undefined) out.burst_sustain_ms = validatePositiveNumber(d['burst_sustain_ms'], 'defaults.burst_sustain_ms');
  if (d['burst_max_particles'] !== undefined) out.burst_max_particles = validatePositiveNumber(d['burst_max_particles'], 'defaults.burst_max_particles');
  if (d['dot_radius'] !== undefined) out.dot_radius = validatePositiveNumber(d['dot_radius'], 'defaults.dot_radius');
  if (d['line_width'] !== undefined) out.line_width = validatePositiveNumber(d['line_width'], 'defaults.line_width');
  return out;
}

function validateDomainColors(raw: unknown): DomainColors {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('domain_colors', 'must be an object');
  }
  const d = raw as Record<string, unknown>;
  const out: DomainColors = {};
  for (const key of ['solar', 'grid', 'battery', 'load'] as const) {
    if (d[key] !== undefined) {
      if (typeof d[key] !== 'string') fail(`domain_colors.${key}`, 'must be a string colour value');
      out[key] = d[key] as string;
    }
  }
  return out;
}

export function validateConfig(raw: unknown): FlowmeConfig {
  if (!raw || typeof raw !== 'object') throw new FlowmeConfigError('config must be an object');
  const c = raw as Record<string, unknown>;

  if (c['type'] !== 'custom:flowme-card') {
    fail('type', `must equal "custom:flowme-card" (got "${String(c['type'])}")`);
  }
  if (!FLOW_DOMAINS.includes(c['domain'] as never)) {
    fail('domain', `must be one of ${FLOW_DOMAINS.join(', ')}`);
  }

  // background and background.default are both optional. An omitted default
  // renders a neutral placeholder so the card works out of the box without
  // requiring the user to copy any image into /config/www first.
  const bgRaw = c['background'];
  if (bgRaw !== undefined && (bgRaw === null || typeof bgRaw !== 'object')) {
    fail('background', 'must be an object when provided');
  }
  const bg = (bgRaw ?? {}) as Record<string, unknown>;
  const defaultImg =
    bg['default'] === undefined || bg['default'] === ''
      ? ''
      : validateUrlScheme(bg['default'], 'background.default');

  const background: FlowmeConfig['background'] = { default: defaultImg };
  if (bg['weather_entity'] !== undefined) {
    if (typeof bg['weather_entity'] !== 'string') {
      fail('background.weather_entity', 'must be a string entity id');
    }
    background.weather_entity = bg['weather_entity'] as string;
  }
  if (bg['weather_states'] !== undefined) {
    if (!bg['weather_states'] || typeof bg['weather_states'] !== 'object') {
      fail('background.weather_states', 'must be an object mapping state strings to image URLs');
    }
    const entries = Object.entries(bg['weather_states'] as Record<string, unknown>);
    const states: Record<string, string> = {};
    for (const [state, url] of entries) {
      states[state] = validateUrlScheme(url, `background.weather_states.${state}`);
    }
    background.weather_states = states;
  }
  if (bg['transition_duration'] !== undefined) {
    if (typeof bg['transition_duration'] !== 'number') {
      fail('background.transition_duration', 'must be a number (milliseconds)');
    }
    background.transition_duration = bg['transition_duration'] as number;
  }

  const nodesRaw = c['nodes'];
  if (!Array.isArray(nodesRaw)) fail('nodes', 'must be an array');
  const seenNodeIds = new Set<string>();
  const nodes = (nodesRaw as unknown[]).map((n, i) => validateNode(n, i, seenNodeIds));
  if (nodes.length === 0) fail('nodes', 'at least one node is required');

  const flowsRaw = c['flows'];
  if (!Array.isArray(flowsRaw)) fail('flows', 'must be an array');
  const seenFlowIds = new Set<string>();
  const flows = (flowsRaw as unknown[]).map((f, i) =>
    validateFlow(f, i, seenFlowIds, seenNodeIds),
  );

  const config: FlowmeConfig = {
    type: 'custom:flowme-card',
    domain: c['domain'] as FlowmeConfig['domain'],
    background,
    nodes,
    flows,
  };

  if (c['aspect_ratio'] !== undefined) {
    if (typeof c['aspect_ratio'] !== 'string' || !/^\d+:\d+$/.test(c['aspect_ratio'] as string)) {
      fail('aspect_ratio', 'must match regex \\d+:\\d+ (e.g. "16:10")');
    }
    config.aspect_ratio = c['aspect_ratio'] as string;
  }
  if (c['fullscreen'] !== undefined) {
    if (typeof c['fullscreen'] !== 'boolean') fail('fullscreen', 'must be a boolean');
    config.fullscreen = c['fullscreen'] as boolean;
  }
  if (c['edit_mode_password'] !== undefined) {
    if (typeof c['edit_mode_password'] !== 'string') {
      fail('edit_mode_password', 'must be a string');
    }
    config.edit_mode_password = c['edit_mode_password'] as string;
  }

  if (c['overlays'] !== undefined) {
    if (!Array.isArray(c['overlays'])) fail('overlays', 'must be an array');
    const seenOverlayIds = new Set<string>();
    config.overlays = (c['overlays'] as unknown[]).map((o, i) =>
      validateOverlay(o, i, seenOverlayIds),
    );
  }

  if (c['defaults'] !== undefined) {
    config.defaults = validateDefaults(c['defaults']);
  }

  if (c['domain_colors'] !== undefined) {
    config.domain_colors = validateDomainColors(c['domain_colors']);
  }

  if (c['debug'] !== undefined) {
    if (typeof c['debug'] !== 'boolean') fail('debug', 'must be a boolean');
    config.debug = c['debug'] as boolean;
  }

  return config;
}

function validateOverlay(raw: unknown, idx: number, seenIds: Set<string>): OverlayConfig {
  const path = `overlays[${idx}]`;
  if (!raw || typeof raw !== 'object') fail(path, 'must be an object');
  const o = raw as Record<string, unknown>;

  const type = o['type'];
  if (type !== 'custom') {
    fail(
      `${path}.type`,
      `must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.`,
    );
  }

  const id = o['id'];
  if (typeof id !== 'string' || !id.length) fail(`${path}.id`, 'must be a non-empty string');
  if (seenIds.has(id as string)) fail(`${path}.id`, `duplicate overlay id "${id as string}"`);
  seenIds.add(id as string);

  const position = validatePosition(o['position'], `${path}.position`);

  // card: block is required — any valid HA card config object
  const cardRaw = o['card'];
  if (!cardRaw || typeof cardRaw !== 'object' || Array.isArray(cardRaw)) {
    fail(`${path}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  }
  const unsafe = findUnsafeUrls(cardRaw, `${path}.card`);
  if (unsafe.length) {
    const first = unsafe[0]!;
    fail(
      first.path,
      `unsafe URL scheme "${first.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`,
    );
  }
  const card = cardRaw as Record<string, unknown>;

  const overlay: OverlayConfig = {
    id: id as string,
    type: 'custom',
    position,
    card,
  };

  if (o['size'] !== undefined) {
    const s = o['size'];
    if (!s || typeof s !== 'object') fail(`${path}.size`, 'must be an object with width and height');
    const sr = s as Record<string, unknown>;
    const w = sr['width'];
    const h = sr['height'];
    if (typeof w !== 'number' || !Number.isFinite(w) || w <= 0 || w > 100) {
      fail(`${path}.size.width`, 'must be a positive number ≤ 100 (percent of card)');
    }
    if (typeof h !== 'number' || !Number.isFinite(h) || h <= 0 || h > 100) {
      fail(`${path}.size.height`, 'must be a positive number ≤ 100 (percent of card)');
    }
    overlay.size = { width: w as number, height: h as number };
  }

  if (o['visible'] !== undefined) {
    if (typeof o['visible'] !== 'boolean') fail(`${path}.visible`, 'must be a boolean');
    overlay.visible = o['visible'] as boolean;
  }

  if (o['opacity'] !== undefined) {
    const op = o['opacity'];
    if (typeof op !== 'number' || !Number.isFinite(op as number) || (op as number) < 0 || (op as number) > 1) {
      fail(`${path}.opacity`, 'must be a number between 0 and 1');
    }
    overlay.opacity = op as number;
  }

  return overlay;
}
