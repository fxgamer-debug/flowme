import type {
  FlowmeConfig,
  NodeConfig,
  FlowConfig,
  NodePosition,
  OverlayConfig,
  OverlayType,
  TapActionKind,
} from './types.js';
import { FLOW_DOMAINS, OVERLAY_TYPES, TAP_ACTIONS } from './types.js';
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

  const wpRaw = f['waypoints'];
  if (!Array.isArray(wpRaw)) fail(`${path}.waypoints`, 'must be an array (may be empty)');
  const waypoints = (wpRaw as unknown[]).map((wp, wi) =>
    validatePosition(wp, `${path}.waypoints[${wi}]`),
  );

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
  if (typeof f['color_positive'] === 'string') flow.color_positive = f['color_positive'] as string;
  if (typeof f['color_negative'] === 'string') flow.color_negative = f['color_negative'] as string;
  if (typeof f['threshold'] === 'number') flow.threshold = f['threshold'] as number;
  if (typeof f['reverse'] === 'boolean') flow.reverse = f['reverse'] as boolean;
  if (typeof f['speed_multiplier'] === 'number') {
    const sm = f['speed_multiplier'] as number;
    if (sm < 0.1 || sm > 5.0) fail(`${path}.speed_multiplier`, 'must be between 0.1 and 5.0');
    flow.speed_multiplier = sm;
  }
  return flow;
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

  const bgRaw = c['background'];
  if (!bgRaw || typeof bgRaw !== 'object') fail('background', 'must be an object');
  const bg = bgRaw as Record<string, unknown>;
  const defaultImg = validateUrlScheme(bg['default'], 'background.default');

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

  return config;
}

function validateOverlay(raw: unknown, idx: number, seenIds: Set<string>): OverlayConfig {
  const path = `overlays[${idx}]`;
  if (!raw || typeof raw !== 'object') fail(path, 'must be an object');
  const o = raw as Record<string, unknown>;

  const type = o['type'];
  if (typeof type !== 'string' || !OVERLAY_TYPES.includes(type as OverlayType)) {
    fail(`${path}.type`, `must be one of ${OVERLAY_TYPES.join(', ')}`);
  }

  const id = o['id'];
  if (typeof id !== 'string' || !id.length) fail(`${path}.id`, 'must be a non-empty string');
  if (seenIds.has(id)) fail(`${path}.id`, `duplicate overlay id "${id}"`);
  seenIds.add(id);

  const position = validatePosition(o['position'], `${path}.position`);

  const overlay: OverlayConfig = {
    id,
    type: type as OverlayType,
    position,
  };

  if (o['entity'] !== undefined) {
    if (typeof o['entity'] !== 'string' || !o['entity'].length) {
      fail(`${path}.entity`, 'must be a non-empty entity id');
    }
    overlay.entity = o['entity'] as string;
  }

  // entity is required for non-custom overlays
  if ((type === 'sensor' || type === 'switch' || type === 'camera') && !overlay.entity) {
    fail(`${path}.entity`, `is required for overlay type "${type}"`);
  }

  if (o['label'] !== undefined) {
    if (typeof o['label'] !== 'string') fail(`${path}.label`, 'must be a string');
    overlay.label = o['label'] as string;
  }

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

  if (o['tap_action'] !== undefined) {
    const ta = o['tap_action'];
    if (!ta || typeof ta !== 'object') fail(`${path}.tap_action`, 'must be an object');
    const tar = ta as Record<string, unknown>;
    const a = tar['action'];
    if (typeof a !== 'string' || !TAP_ACTIONS.includes(a as TapActionKind)) {
      fail(`${path}.tap_action.action`, `must be one of ${TAP_ACTIONS.join(', ')}`);
    }
    overlay.tap_action = { action: a as TapActionKind };
  }

  if (o['card_config'] !== undefined) {
    const cc = o['card_config'];
    if (!cc || typeof cc !== 'object' || Array.isArray(cc)) {
      fail(`${path}.card_config`, 'must be an object');
    }
    if (type !== 'custom') {
      fail(`${path}.card_config`, 'is only valid when type === "custom"');
    }
    const unsafe = findUnsafeUrls(cc, `${path}.card_config`);
    if (unsafe.length) {
      const first = unsafe[0]!;
      fail(
        first.path,
        `unsafe URL scheme "${first.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in custom overlay configs`,
      );
    }
    overlay.card_config = cc as Record<string, unknown>;
  }

  if (type === 'custom' && !overlay.card_config) {
    fail(`${path}.card_config`, 'is required when type === "custom"');
  }

  return overlay;
}
