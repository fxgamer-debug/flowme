import type {
  AnimationConfig,
  FlowAnimationConfig,
  FlowConfig,
  FlowDomain,
  FlowmeConfig,
  FlowmeDefaults,
  LineStyle,
  NodeConfig,
  NodePosition,
  OpacityConfig,
  OverlayConfig,
  SpeedCurveOverride,
  ValueGradientConfig,
  VisibilityConfig,
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

/**
 * Bulk-move multiple nodes simultaneously, preserving relative positions.
 * dx/dy are percentage deltas applied to all specified nodeIds.
 * Creates a single undo entry for the whole operation.
 */
export function bulkMoveNodes(
  config: FlowmeConfig,
  moves: Map<string, NodePosition>,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const n of next.nodes) {
    const pos = moves.get(n.id);
    if (pos) {
      n.position = { x: clampPercent(pos.x), y: clampPercent(pos.y) };
    }
  }
  return next;
}

/** Delete all nodes in the set (and their connected flows). Single undo entry. */
export function bulkDeleteNodes(config: FlowmeConfig, nodeIds: Set<string>): FlowmeConfig {
  const next = cloneConfig(config);
  next.nodes = next.nodes.filter((n) => !nodeIds.has(n.id));
  next.flows = next.flows.filter((f) => !nodeIds.has(f.from_node) && !nodeIds.has(f.to_node));
  return next;
}

/** Set visible on all nodes in the set. Single undo entry. */
export function bulkSetNodesVisible(
  config: FlowmeConfig,
  nodeIds: Set<string>,
  visible: boolean,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const n of next.nodes) {
    if (nodeIds.has(n.id)) n.visible = visible;
  }
  return next;
}

/** Align all nodes in the set horizontally (same y as the anchor node). */
export function alignNodesHorizontal(
  config: FlowmeConfig,
  nodeIds: Set<string>,
  anchorId: string,
): FlowmeConfig {
  const anchor = config.nodes.find((n) => n.id === anchorId);
  if (!anchor) return config;
  const next = cloneConfig(config);
  for (const n of next.nodes) {
    if (nodeIds.has(n.id)) n.position = { ...n.position, y: anchor.position.y };
  }
  return next;
}

/** Align all nodes in the set vertically (same x as the anchor node). */
export function alignNodesVertical(
  config: FlowmeConfig,
  nodeIds: Set<string>,
  anchorId: string,
): FlowmeConfig {
  const anchor = config.nodes.find((n) => n.id === anchorId);
  if (!anchor) return config;
  const next = cloneConfig(config);
  for (const n of next.nodes) {
    if (nodeIds.has(n.id)) n.position = { ...n.position, x: anchor.position.x };
  }
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

export function setSunEntity(
  config: FlowmeConfig,
  entity: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  if (entity && entity.length) next.background.sun_entity = entity;
  else delete next.background.sun_entity;
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

export function setOverlayCardConfig(
  config: FlowmeConfig,
  overlayId: string,
  card: Record<string, unknown> | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId && card) {
      o.card = card;
    }
  }
  return next;
}

export function setOverlayVisible(
  config: FlowmeConfig,
  overlayId: string,
  visible: boolean,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      if (visible) delete o.visible; // true is the default, no need to store it
      else o.visible = false;
    }
  }
  return next;
}

export function setOverlayOpacity(
  config: FlowmeConfig,
  overlayId: string,
  opacity: number,
): FlowmeConfig {
  const next = cloneConfig(config);
  for (const o of next.overlays ?? []) {
    if (o.id === overlayId) {
      const clamped = Math.max(0, Math.min(1, opacity));
      if (clamped === 1) delete o.opacity; // 1 is the default, no need to store it
      else o.opacity = clamped;
    }
  }
  return next;
}

export function setOpacity<K extends keyof OpacityConfig>(
  config: FlowmeConfig,
  key: K,
  value: OpacityConfig[K],
): FlowmeConfig {
  const next = cloneConfig(config);
  next.opacity = { ...next.opacity, [key]: value };
  return next;
}

export function setNodeOpacity(config: FlowmeConfig, nodeId: string, opacity: number | undefined): FlowmeConfig {
  const next = cloneConfig(config);
  next.nodes = next.nodes.map((n) => {
    if (n.id !== nodeId) return n;
    const out = { ...n };
    if (opacity === undefined) delete out.opacity;
    else out.opacity = opacity;
    return out;
  });
  return next;
}

export function setFlowOpacity(config: FlowmeConfig, flowId: string, opacity: number | undefined): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    const out = { ...f };
    if (opacity === undefined) delete out.opacity;
    else out.opacity = opacity;
    return out;
  });
  return next;
}

export function setDefault<K extends keyof FlowmeDefaults>(
  config: FlowmeConfig,
  key: K,
  value: FlowmeDefaults[K],
): FlowmeConfig {
  const next = cloneConfig(config);
  next.defaults = { ...next.defaults, [key]: value };
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

export function setFlowLineStyle(
  config: FlowmeConfig,
  flowId: string,
  style: LineStyle | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    const out = { ...f };
    if (style === undefined || style === 'corner') delete out.line_style;
    else out.line_style = style;
    return out;
  });
  return next;
}

export function setFlowColor(
  config: FlowmeConfig,
  flowId: string,
  color: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    const out = { ...f };
    if (color === undefined) delete out.color;
    else out.color = color;
    return out;
  });
  return next;
}

export function setNodeVisible(
  config: FlowmeConfig,
  nodeId: string,
  visible: boolean,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.nodes = next.nodes.map((n) => {
    if (n.id !== nodeId) return n;
    const out = { ...n };
    if (visible) delete out.visible;
    else out.visible = false;
    return out;
  });
  return next;
}

export function setFlowVisible(
  config: FlowmeConfig,
  flowId: string,
  visible: boolean,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    const out = { ...f };
    if (visible) delete out.visible;
    else out.visible = false;
    return out;
  });
  return next;
}

export function setVisibility<K extends keyof VisibilityConfig>(
  config: FlowmeConfig,
  key: K,
  value: boolean,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.visibility = { ...next.visibility, [key]: value };
  return next;
}

export function setDomainColor(
  config: FlowmeConfig,
  key: string,
  color: string | undefined,
): FlowmeConfig {
  const next = cloneConfig(config);
  if (color === undefined) {
    if (next.domain_colors) {
      delete next.domain_colors[key];
      if (Object.keys(next.domain_colors).length === 0) delete next.domain_colors;
    }
  } else {
    next.domain_colors = { ...next.domain_colors, [key]: color };
  }
  return next;
}

export function setCardDomain(config: FlowmeConfig, domain: FlowDomain): FlowmeConfig {
  const next = cloneConfig(config);
  next.domain = domain;
  return next;
}

export function renameFlowId(config: FlowmeConfig, oldId: string, newId: string): FlowmeConfig {
  const trimmed = newId.trim();
  if (!trimmed || trimmed === oldId) return config;
  const idx = config.flows.findIndex((f) => f.id === oldId);
  if (idx < 0) return config;
  if (config.flows.some((f, i) => i !== idx && f.id === trimmed)) return config;
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => (f.id === oldId ? { ...f, id: trimmed } : f));
  return next;
}

export function renameOverlayId(config: FlowmeConfig, oldId: string, newId: string): FlowmeConfig {
  const trimmed = newId.trim();
  if (!trimmed || trimmed === oldId) return config;
  const overlays = config.overlays ?? [];
  const idx = overlays.findIndex((o) => o.id === oldId);
  if (idx < 0) return config;
  if (overlays.some((o, i) => i !== idx && o.id === trimmed)) return config;
  const next = cloneConfig(config);
  next.overlays = overlays.map((o) => (o.id === oldId ? { ...o, id: trimmed } : o));
  return next;
}

export function setFlowSpeedCurveOverride(
  config: FlowmeConfig,
  flowId: string,
  partial: Partial<SpeedCurveOverride>,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    return { ...f, speed_curve_override: { ...f.speed_curve_override, ...partial } };
  });
  return next;
}

export function clearSpeedCurveOverride(config: FlowmeConfig, flowId: string): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    const out = { ...f };
    delete out.speed_curve_override;
    return out;
  });
  return next;
}

/**
 * Merge a partial {@link FlowAnimationConfig} into a flow's `animation` block.
 * Use `setFlowAnimationField(config, flowId, 'animation_style', undefined)` to
 * clear a single key back to its default.
 */
export function setFlowAnimation(
  config: FlowmeConfig,
  flowId: string,
  patch: Partial<FlowAnimationConfig>,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    const merged = { ...f.animation, ...patch };
    // prune undefined values so they don't appear in YAML serialisation
    for (const k of Object.keys(merged) as (keyof FlowAnimationConfig)[]) {
      if (merged[k] === undefined) delete merged[k];
    }
    if (Object.keys(merged).length === 0) {
      const out = { ...f };
      delete out.animation;
      return out;
    }
    return { ...f, animation: merged };
  });
  return next;
}

export function clearFlowAnimation(config: FlowmeConfig, flowId: string): FlowmeConfig {
  const next = cloneConfig(config);
  next.flows = next.flows.map((f) => {
    if (f.id !== flowId) return f;
    const out = { ...f };
    delete out.animation;
    return out;
  });
  return next;
}

export function setAnimationConfig(
  config: FlowmeConfig,
  patch: Partial<AnimationConfig>,
): FlowmeConfig {
  const next = cloneConfig(config);
  next.animation = { ...next.animation, ...patch };
  return next;
}

export function setValueGradient(
  config: FlowmeConfig,
  flowId: string,
  gradient: ValueGradientConfig,
): FlowmeConfig {
  const next = cloneConfig(config);
  const flow = next.flows.find((f) => f.id === flowId);
  if (flow) flow.value_gradient = gradient;
  return next;
}

export function patchValueGradient(
  config: FlowmeConfig,
  flowId: string,
  partial: Partial<ValueGradientConfig>,
): FlowmeConfig {
  const next = cloneConfig(config);
  const flow = next.flows.find((f) => f.id === flowId);
  if (flow) flow.value_gradient = { ...(flow.value_gradient as ValueGradientConfig), ...partial };
  return next;
}

export function clearValueGradient(config: FlowmeConfig, flowId: string): FlowmeConfig {
  const next = cloneConfig(config);
  const flow = next.flows.find((f) => f.id === flowId);
  if (flow) delete flow.value_gradient;
  return next;
}
