import type {
  FlowConfig,
  FlowmeConfig,
  NodeConfig,
  NodePosition,
  OverlayConfig,
  OverlayType,
  TapActionKind,
} from '../types.js';

/** Deep-ish clone that preserves only the shapes we care about. */
function cloneConfig(config: FlowmeConfig): FlowmeConfig {
  return JSON.parse(JSON.stringify(config)) as FlowmeConfig;
}

export function clampPercent(value: number): number {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

export function snapToGrid(value: number, grid = 8): number {
  return Math.round(value / grid) * grid;
}

export function nextNodeId(config: FlowmeConfig): string {
  const existing = new Set(config.nodes.map((n) => n.id));
  for (let i = 1; i < 10_000; i++) {
    const candidate = `node_${i}`;
    if (!existing.has(candidate)) return candidate;
  }
  return `node_${Date.now()}`;
}

export function nextFlowId(config: FlowmeConfig): string {
  const existing = new Set(config.flows.map((f) => f.id));
  for (let i = 1; i < 10_000; i++) {
    const candidate = `flow_${i}`;
    if (!existing.has(candidate)) return candidate;
  }
  return `flow_${Date.now()}`;
}

export function moveNode(
  config: FlowmeConfig,
  nodeId: string,
  position: NodePosition,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const n of next.nodes) {
    if (n.id === nodeId) {
      n.position = { x: clampPercent(position.x), y: clampPercent(position.y) };
    }
  }
  return next;
}

export function addNode(
  config: FlowmeConfig,
  position: NodePosition,
  label?: string,
): { config: FlowmeConfig; node: NodeConfig } {
  const next = cloneConfig(config);
  const node: NodeConfig = {
    id: nextNodeId(config),
    position: { x: clampPercent(position.x), y: clampPercent(position.y) },
    ...(label ? { label } : {}),
  };
  next.nodes.push(node);
  return { config: next, node };
}

export function deleteNode(config: FlowmeConfig, nodeId: string): FlowmeConfig {
  const next = cloneConfig(config);
  next.nodes = next.nodes.filter((n) => n.id !== nodeId);
  next.flows = next.flows.filter((f) => f.from_node !== nodeId && f.to_node !== nodeId);
  return next;
}

export function setNodeLabel(
  config: FlowmeConfig,
  nodeId: string,
  label: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const n of next.nodes) {
    if (n.id === nodeId) {
      if (label && label.length) n.label = label;
      else delete n.label;
    }
  }
  return next;
}

export function setNodeEntity(
  config: FlowmeConfig,
  nodeId: string,
  entity: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const n of next.nodes) {
    if (n.id === nodeId) {
      if (entity && entity.length) n.entity = entity;
      else delete n.entity;
    }
  }
  return next;
}

export function moveWaypoint(
  config: FlowmeConfig,
  flowId: string,
  waypointIndex: number,
  position: NodePosition,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const f of next.flows) {
    if (f.id !== flowId) continue;
    if (waypointIndex < 0 || waypointIndex >= f.waypoints.length) return config;
    f.waypoints[waypointIndex] = {
      x: clampPercent(position.x),
      y: clampPercent(position.y),
    };
  }
  return next;
}

export function insertWaypoint(
  config: FlowmeConfig,
  flowId: string,
  /** index where the waypoint will live in f.waypoints AFTER insertion. */
  insertionIndex: number,
  position: NodePosition,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const f of next.flows) {
    if (f.id !== flowId) continue;
    const clamped = Math.max(0, Math.min(f.waypoints.length, insertionIndex));
    f.waypoints.splice(clamped, 0, {
      x: clampPercent(position.x),
      y: clampPercent(position.y),
    });
  }
  return next;
}

export function deleteWaypoint(
  config: FlowmeConfig,
  flowId: string,
  waypointIndex: number,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const f of next.flows) {
    if (f.id !== flowId) continue;
    if (waypointIndex < 0 || waypointIndex >= f.waypoints.length) return config;
    f.waypoints.splice(waypointIndex, 1);
  }
  return next;
}

export function addFlow(
  config: FlowmeConfig,
  fromNodeId: string,
  toNodeId: string,
  entity: string,
): { config: FlowmeConfig; flow: FlowConfig } {
  const next = cloneConfig(config);
  const flow: FlowConfig = {
    id: nextFlowId(config),
    from_node: fromNodeId,
    to_node: toNodeId,
    entity,
    waypoints: [],
  };
  next.flows.push(flow);
  return { config: next, flow };
}

export function deleteFlow(config: FlowmeConfig, flowId: string): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.filter((f) => f.id !== flowId);
  return next;
}

export function setFlowEntity(
  config: FlowmeConfig,
  flowId: string,
  entity: string,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const f of next.flows) if (f.id === flowId) f.entity = entity;
  return next;
}

export function setBackgroundDefault(config: FlowmeConfig, url: string): FlowmeConfig {
  const next = cloneConfig(config);
  next.background.default = url;
  return next;
}

export function setWeatherEntity(
  config: FlowmeConfig,
  entity: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  if (entity && entity.length) next.background.weather_entity = entity;
  else delete next.background.weather_entity;
  return next;
}

export function setTransitionDuration(
  config: FlowmeConfig,
  ms: number | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  if (ms === undefined || !Number.isFinite(ms)) delete next.background.transition_duration;
  else next.background.transition_duration = Math.max(0, Math.floor(ms));
  return next;
}

export function setWeatherStateImage(
  config: FlowmeConfig,
  stateKey: string,
  url: string,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.background.weather_states ??= {};
  next.background.weather_states[stateKey] = url;
  return next;
}

export function deleteWeatherState(
  config: FlowmeConfig,
  stateKey: string,
): FlowmeConfig {
  const next = cloneConfig(config);
  if (next.background.weather_states) {
    delete next.background.weather_states[stateKey];
    if (Object.keys(next.background.weather_states).length === 0) {
      delete next.background.weather_states;
    }
  }
  return next;
}

export function nextOverlayId(config: FlowmeConfig): string {
  const existing = new Set((config.overlays ?? []).map((o) => o.id));
  for (let i = 1; i < 10_000; i++) {
    const candidate = `overlay_${i}`;
    if (!existing.has(candidate)) return candidate;
  }
  return `overlay_${Date.now()}`;
}

export function addOverlay(
  config: FlowmeConfig,
  overlay: Omit<OverlayConfig, 'id'> & { id?: string },
): { config: FlowmeConfig; overlay: OverlayConfig } {
  const next = cloneConfig(config);
  const id = overlay.id ?? nextOverlayId(config);
  const created: OverlayConfig = {
    ...overlay,
    id,
    position: {
      x: clampPercent(overlay.position.x),
      y: clampPercent(overlay.position.y),
    },
  };
  next.overlays = [...(next.overlays ?? []), created];
  return { config: next, overlay: created };
}

export function deleteOverlay(config: FlowmeConfig, overlayId: string): FlowmeConfig {
  const next = cloneConfig(config);
  next.overlays = (next.overlays ?? []).filter((o) => o.id !== overlayId);
  if (next.overlays.length === 0) delete next.overlays;
  return next;
}

export function moveOverlay(
  config: FlowmeConfig,
  overlayId: string,
  position: NodePosition,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      o.position = { x: clampPercent(position.x), y: clampPercent(position.y) };
    }
  }
  return next;
}

export function setOverlaySize(
  config: FlowmeConfig,
  overlayId: string,
  size: { width: number; height: number },
): FlowmeConfig {
  const next = cloneConfig(config);
  const w = Math.max(2, Math.min(100, size.width));
  const h = Math.max(2, Math.min(100, size.height));
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) o.size = { width: w, height: h };
  }
  return next;
}

export function setOverlayType(
  config: FlowmeConfig,
  overlayId: string,
  type: OverlayType,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      o.type = type;
      // clear incompatible fields when switching away from custom
      if (type !== 'custom') delete o.card_config;
    }
  }
  return next;
}

export function setOverlayEntity(
  config: FlowmeConfig,
  overlayId: string,
  entity: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      if (entity && entity.length) o.entity = entity;
      else delete o.entity;
    }
  }
  return next;
}

export function setOverlayLabel(
  config: FlowmeConfig,
  overlayId: string,
  label: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      if (label && label.length) o.label = label;
      else delete o.label;
    }
  }
  return next;
}

export function setOverlayTapAction(
  config: FlowmeConfig,
  overlayId: string,
  action: TapActionKind | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      if (action) o.tap_action = { action };
      else delete o.tap_action;
    }
  }
  return next;
}

export function setOverlayCardConfig(
  config: FlowmeConfig,
  overlayId: string,
  cardConfig: Record<string, unknown> | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      if (cardConfig) o.card_config = cardConfig;
      else delete o.card_config;
    }
  }
  return next;
}

export function renameWeatherState(
  config: FlowmeConfig,
  oldKey: string,
  newKey: string,
): FlowmeConfig {
  if (oldKey === newKey) return config;
  const next = cloneConfig(config);
  const map = next.background.weather_states;
  if (!map || !(oldKey in map)) return config;
  const url = map[oldKey];
  if (url === undefined) return config;
  delete map[oldKey];
  map[newKey] = url;
  return next;
}
