import { describe, it, expect } from 'vitest';

import {
  clampPercent,
  snapToGrid,
  nextNodeId,
  nextFlowId,
  nextOverlayId,
  moveNode,
  addNode,
  deleteNode,
  setNodeLabel,
  addFlow,
  deleteFlow,
  moveWaypoint,
  insertWaypoint,
  deleteWaypoint,
  addOverlay,
  addWeatherStatePlaceholder,
  moveOverlay,
  deleteOverlay,
  setOverlaySize,
  setOverlayCardConfig,
  setOverlayVisible,
  setOverlayOpacity,
  setBackgroundDefault,
  setTransitionDuration,
  setWeatherStateImage,
  deleteWeatherState,
  renameFlowId,
  renameOverlayId,
  renameWeatherState,
  setCardDomain,
  setFlowLabel,
} from '../../src/editor/commands.js';
import type { FlowmeConfig } from '../../src/types.js';

function baseConfig(): FlowmeConfig {
  return {
    type: 'custom:flowme-card',
    domain: 'energy',
    background: { default: '/local/bg.jpg' },
    nodes: [
      { id: 'a', position: { x: 10, y: 10 } },
      { id: 'b', position: { x: 90, y: 90 } },
    ],
    flows: [
      { id: 'f1', from_node: 'a', to_node: 'b', entity: 'sensor.x', waypoints: [] },
    ],
  };
}

describe('clampPercent + snapToGrid', () => {
  it('clampPercent clamps to [0, 100]', () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(50)).toBe(50);
    expect(clampPercent(150)).toBe(100);
  });
  it('snapToGrid rounds to the nearest grid step', () => {
    expect(snapToGrid(7, 8)).toBe(8);
    expect(snapToGrid(12, 8)).toBe(16);
    expect(snapToGrid(0, 8)).toBe(0);
  });
});

describe('id generators', () => {
  it('nextNodeId returns the first free slot', () => {
    const cfg = baseConfig();
    expect(nextNodeId(cfg)).toBe('node_1');
    const next = addNode(cfg, { x: 20, y: 20 }).config;
    expect(nextNodeId(next)).toBe('node_2');
  });
  it('nextFlowId skips over existing ids', () => {
    const cfg = { ...baseConfig(), flows: [{ id: 'flow_1', from_node: 'a', to_node: 'b', entity: 'sensor.x', waypoints: [] }] };
    expect(nextFlowId(cfg)).toBe('flow_2');
  });
  it('nextOverlayId starts at 1 on empty configs', () => {
    expect(nextOverlayId(baseConfig())).toBe('overlay_1');
  });
});

describe('node commands', () => {
  it('moveNode produces a new config with the clamped position', () => {
    const cfg = baseConfig();
    const next = moveNode(cfg, 'a', { x: -10, y: 150 });
    expect(next).not.toBe(cfg);
    expect(cfg.nodes[0]?.position).toEqual({ x: 10, y: 10 });
    expect(next.nodes[0]?.position).toEqual({ x: 0, y: 100 });
  });

  it('addNode appends and returns the created node', () => {
    const cfg = baseConfig();
    const { config, node } = addNode(cfg, { x: 50, y: 50 }, 'Kitchen');
    expect(node.id).toBe('node_1');
    expect(node.label).toBe('Kitchen');
    expect(config.nodes).toHaveLength(3);
    expect(cfg.nodes).toHaveLength(2);
  });

  it('deleteNode removes the node AND any flows that reference it', () => {
    const cfg = baseConfig();
    const next = deleteNode(cfg, 'a');
    expect(next.nodes).toHaveLength(1);
    expect(next.flows).toHaveLength(0);
  });

  it('setNodeLabel sets and clears labels', () => {
    const cfg = baseConfig();
    const withLabel = setNodeLabel(cfg, 'a', 'Hello');
    expect(withLabel.nodes[0]?.label).toBe('Hello');
    const without = setNodeLabel(withLabel, 'a', undefined);
    expect(without.nodes[0]?.label).toBeUndefined();
  });
});

describe('flow commands', () => {
  it('addFlow / deleteFlow', () => {
    const cfg = baseConfig();
    const { config: withFlow, flow } = addFlow(cfg, 'a', 'b', 'sensor.y');
    // baseConfig uses id "f1", so the first free flow_N slot is flow_1
    expect(flow.id).toBe('flow_1');
    expect(withFlow.flows).toHaveLength(2);
    const removed = deleteFlow(withFlow, flow.id);
    expect(removed.flows).toHaveLength(1);
  });

  it('insertWaypoint clamps out-of-range insertion indexes', () => {
    const cfg = baseConfig();
    const withWp = insertWaypoint(cfg, 'f1', 99, { x: 50, y: 50 });
    expect(withWp.flows[0]?.waypoints).toHaveLength(1);
    const withTwo = insertWaypoint(withWp, 'f1', 0, { x: 30, y: 30 });
    expect(withTwo.flows[0]?.waypoints[0]).toEqual({ x: 30, y: 30 });
  });

  it('moveWaypoint is a no-op for an out-of-range index', () => {
    const cfg = baseConfig();
    const after = moveWaypoint(cfg, 'f1', 5, { x: 10, y: 10 });
    expect(after).toBe(cfg);
  });

  it('deleteWaypoint removes at the given index', () => {
    const cfg = baseConfig();
    const withTwo = insertWaypoint(insertWaypoint(cfg, 'f1', 0, { x: 30, y: 30 }), 'f1', 1, { x: 60, y: 60 });
    const afterDelete = deleteWaypoint(withTwo, 'f1', 0);
    expect(afterDelete.flows[0]?.waypoints).toEqual([{ x: 60, y: 60 }]);
  });
});

describe('overlay commands', () => {
  function customOverlaySeed() {
    return {
      type: 'custom' as const,
      position: { x: 50, y: 50 },
      card: { type: 'entity', entity: 'sensor.example' } as Record<string, unknown>,
    };
  }

  it('addOverlay appends and generates ids when missing', () => {
    const cfg = baseConfig();
    const { config, overlay } = addOverlay(cfg, {
      ...customOverlaySeed(),
      position: { x: 200, y: -10 },
    });
    expect(overlay.id).toBe('overlay_1');
    expect(overlay.position).toEqual({ x: 100, y: 0 });
    expect(config.overlays).toHaveLength(1);
  });

  it('moveOverlay clamps, deleteOverlay removes', () => {
    const seed = addOverlay(baseConfig(), customOverlaySeed()).config;
    const moved = moveOverlay(seed, 'overlay_1', { x: -50, y: 150 });
    expect(moved.overlays?.[0]?.position).toEqual({ x: 0, y: 100 });
    const removed = deleteOverlay(moved, 'overlay_1');
    expect(removed.overlays).toBeUndefined();
  });

  it('setOverlaySize clamps to [2, 100]', () => {
    const seed = addOverlay(baseConfig(), customOverlaySeed()).config;
    const tiny = setOverlaySize(seed, 'overlay_1', { width: 0.5, height: 200 });
    expect(tiny.overlays?.[0]?.size).toEqual({ width: 2, height: 100 });
  });

  it('setOverlayCardConfig updates card field', () => {
    let cfg = addOverlay(baseConfig(), customOverlaySeed()).config;
    cfg = setOverlayCardConfig(cfg, 'overlay_1', { type: 'tile', entity: 'sensor.c' });
    expect(cfg.overlays?.[0]?.card).toEqual({ type: 'tile', entity: 'sensor.c' });
  });

  it('setOverlayVisible sets visible: false; true removes the key', () => {
    let cfg = addOverlay(baseConfig(), customOverlaySeed()).config;
    cfg = setOverlayVisible(cfg, 'overlay_1', false);
    expect(cfg.overlays?.[0]?.visible).toBe(false);
    cfg = setOverlayVisible(cfg, 'overlay_1', true);
    expect(cfg.overlays?.[0]?.visible).toBeUndefined();
  });

  it('setOverlayOpacity clamps to 0–1 and removes key when 1', () => {
    let cfg = addOverlay(baseConfig(), customOverlaySeed()).config;
    cfg = setOverlayOpacity(cfg, 'overlay_1', 0.5);
    expect(cfg.overlays?.[0]?.opacity).toBe(0.5);
    cfg = setOverlayOpacity(cfg, 'overlay_1', 1);
    expect(cfg.overlays?.[0]?.opacity).toBeUndefined();
    cfg = setOverlayOpacity(cfg, 'overlay_1', -0.5);
    expect(cfg.overlays?.[0]?.opacity).toBe(0);
    cfg = setOverlayOpacity(cfg, 'overlay_1', 1.5);
    expect(cfg.overlays?.[0]?.opacity).toBeUndefined();
  });
});

describe('background + weather commands', () => {
  it('setBackgroundDefault swaps the URL', () => {
    const cfg = setBackgroundDefault(baseConfig(), '/local/new.jpg');
    expect(cfg.background.default).toBe('/local/new.jpg');
  });

  it('setBackgroundDefault removes default when URL empty', () => {
    const cfg = setBackgroundDefault(baseConfig(), '   ');
    expect(cfg.background.default).toBeUndefined();
  });

  it('setTransitionDuration floors + clamps to ≥0, undefined clears', () => {
    const cfg1 = setTransitionDuration(baseConfig(), 1234.7);
    expect(cfg1.background.transition_duration).toBe(1234);
    const cfg2 = setTransitionDuration(cfg1, -50);
    expect(cfg2.background.transition_duration).toBe(0);
    const cfg3 = setTransitionDuration(cfg2, undefined);
    expect(cfg3.background.transition_duration).toBeUndefined();
  });

  it('setWeatherStateImage / delete / rename', () => {
    let cfg = setWeatherStateImage(baseConfig(), 'sunny', '/local/sun.jpg');
    cfg = setWeatherStateImage(cfg, 'rainy', '/local/rain.jpg');
    expect(cfg.background.weather_states).toEqual({
      sunny: '/local/sun.jpg',
      rainy: '/local/rain.jpg',
    });
    cfg = renameWeatherState(cfg, 'sunny', 'clear');
    expect(cfg.background.weather_states).toEqual({
      clear: '/local/sun.jpg',
      rainy: '/local/rain.jpg',
    });
    cfg = deleteWeatherState(cfg, 'clear');
    cfg = deleteWeatherState(cfg, 'rainy');
    expect(cfg.background.weather_states).toBeUndefined();
  });

  it('addWeatherStatePlaceholder appends state_N with empty URL', () => {
    let cfg = addWeatherStatePlaceholder(baseConfig());
    expect(cfg.background.weather_states).toEqual({ state_1: '' });
    cfg = addWeatherStatePlaceholder(cfg);
    expect(cfg.background.weather_states).toEqual({ state_1: '', state_2: '' });
  });
});

describe('setCardDomain + rename ids (v1.22.1)', () => {
  it('setCardDomain', () => {
    const c = baseConfig();
    const next = setCardDomain(c, 'water');
    expect(next.domain).toBe('water');
  });

  it('setFlowLabel sets and clears optional display label', () => {
    const c = baseConfig();
    const withLabel = setFlowLabel(c, 'f1', 'Main feed');
    expect(withLabel.flows[0]!.label).toBe('Main feed');
    const cleared = setFlowLabel(withLabel, 'f1', undefined);
    expect(cleared.flows[0]!.label).toBeUndefined();
    const sameAsId = setFlowLabel(c, 'f1', 'f1');
    expect(sameAsId.flows[0]!.label).toBeUndefined();
  });

  it('renameFlowId', () => {
    const c = baseConfig();
    const next = renameFlowId(c, 'f1', 'grid_flow');
    expect(next.flows[0]!.id).toBe('grid_flow');
  });

  it('renameFlowId rejects duplicate id', () => {
    const c: FlowmeConfig = {
      ...baseConfig(),
      flows: [
        { id: 'f1', from_node: 'a', to_node: 'b', entity: 'sensor.x', waypoints: [] },
        { id: 'f2', from_node: 'b', to_node: 'a', entity: 'sensor.y', waypoints: [] },
      ],
    };
    const next = renameFlowId(c, 'f1', 'f2');
    expect(next).toBe(c);
  });

  it('renameOverlayId', () => {
    const c: FlowmeConfig = {
      ...baseConfig(),
      overlays: [{ id: 'o1', type: 'custom', position: { x: 5, y: 5 }, card: { type: 'entity', entity: 'x' } }],
    };
    const next = renameOverlayId(c, 'o1', 'status_panel');
    expect(next.overlays![0]!.id).toBe('status_panel');
  });
});
