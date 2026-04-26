import type { FlowConfig, FlowmeConfig, NodeConfig, NodePosition } from '../types.js';

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
