import { describe, it, expect } from 'vitest';

import { validateConfig, FlowmeConfigError } from '../../src/validate-config.js';

function minimalConfig(): Record<string, unknown> {
  return {
    type: 'custom:flowme-card',
    domain: 'energy',
    background: { default: '/local/example.jpg' },
    nodes: [
      { id: 'a', position: { x: 10, y: 10 } },
      { id: 'b', position: { x: 80, y: 80 } },
    ],
    flows: [],
  };
}

describe('validateConfig — happy path', () => {
  it('accepts a minimal config', () => {
    const cfg = validateConfig(minimalConfig());
    expect(cfg.domain).toBe('energy');
    expect(cfg.nodes).toHaveLength(2);
    expect(cfg.flows).toHaveLength(0);
  });

  it('accepts a full config with all optional fields', () => {
    const raw = {
      ...minimalConfig(),
      aspect_ratio: '16:10',
      fullscreen: false,
      edit_mode_password: 'secret',
      background: {
        default: '/local/ok.jpg',
        weather_entity: 'weather.home',
        transition_duration: 1500,
        weather_states: {
          sunny: '/local/sun.jpg',
          rainy: 'https://example.com/rain.jpg',
        },
      },
      flows: [
        {
          id: 'f1',
          from_node: 'a',
          to_node: 'b',
          entity: 'sensor.power',
          waypoints: [{ x: 50, y: 10 }],
          domain: 'energy',
          color_positive: '#FFD700',
          color_negative: '#4ADE80',
          threshold: 5,
          reverse: false,
          speed_multiplier: 1.2,
        },
      ],
    };
    const cfg = validateConfig(raw);
    expect(cfg.aspect_ratio).toBe('16:10');
    expect(cfg.flows[0]?.speed_multiplier).toBe(1.2);
    expect(cfg.background.weather_entity).toBe('weather.home');
  });

  it('parses the v1.0.7 flow.color shorthand', () => {
    const raw = {
      ...minimalConfig(),
      flows: [
        { id: 'f1', from_node: 'a', to_node: 'b', entity: 'sensor.x', color: '#abcdef' },
      ],
    };
    const cfg = validateConfig(raw);
    expect(cfg.flows[0]?.color).toBe('#abcdef');
  });

  it('treats flow.waypoints as optional (straight line when omitted)', () => {
    const raw = {
      ...minimalConfig(),
      flows: [
        { id: 'f1', from_node: 'a', to_node: 'b', entity: 'sensor.x' },
      ],
    };
    const cfg = validateConfig(raw);
    expect(cfg.flows[0]?.waypoints).toEqual([]);
  });

  it('accepts omitted background (renders neutral placeholder)', () => {
    const { background: _omit, ...rest } = minimalConfig();
    const cfg = validateConfig(rest);
    expect(cfg.background.default).toBe('');
  });

  it('accepts an empty string for background.default', () => {
    const cfg = validateConfig({
      ...minimalConfig(),
      background: { default: '' },
    });
    expect(cfg.background.default).toBe('');
  });

  it('accepts overlays of every supported type', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        { id: 'ov_sensor', type: 'sensor', entity: 'sensor.t', position: { x: 20, y: 20 } },
        { id: 'ov_switch', type: 'switch', entity: 'switch.l', position: { x: 30, y: 30 } },
        { id: 'ov_camera', type: 'camera', entity: 'camera.c', position: { x: 40, y: 40 } },
        { id: 'ov_button', type: 'button', position: { x: 50, y: 50 }, label: 'Go' },
        {
          id: 'ov_custom',
          type: 'custom',
          position: { x: 60, y: 60 },
          card_config: { type: 'entity', entity: 'sensor.x' },
        },
      ],
    };
    const cfg = validateConfig(raw);
    expect(cfg.overlays).toHaveLength(5);
  });
});

describe('validateConfig — schema failures', () => {
  it('rejects non-object input', () => {
    expect(() => validateConfig(null)).toThrow(FlowmeConfigError);
    expect(() => validateConfig('not a config')).toThrow();
  });

  it('rejects wrong card type', () => {
    expect(() => validateConfig({ ...minimalConfig(), type: 'custom:other' })).toThrow(
      /custom:flowme-card/,
    );
  });

  it('rejects unknown domain', () => {
    expect(() => validateConfig({ ...minimalConfig(), domain: 'martian' })).toThrow(
      /domain/,
    );
  });

  it('rejects missing nodes', () => {
    expect(() => validateConfig({ ...minimalConfig(), nodes: [] })).toThrow(/at least one node/);
  });

  it('rejects duplicate node ids', () => {
    const raw = {
      ...minimalConfig(),
      nodes: [
        { id: 'dup', position: { x: 0, y: 0 } },
        { id: 'dup', position: { x: 10, y: 10 } },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/duplicate node id/);
  });

  it('rejects positions outside 0..100', () => {
    const raw = {
      ...minimalConfig(),
      nodes: [{ id: 'a', position: { x: 101, y: 50 } }],
    };
    expect(() => validateConfig(raw)).toThrow(/range 0-100/);
  });

  it('rejects flows that reference unknown nodes', () => {
    const raw = {
      ...minimalConfig(),
      flows: [{ id: 'f', from_node: 'ghost', to_node: 'b', entity: 'sensor.x', waypoints: [] }],
    };
    expect(() => validateConfig(raw)).toThrow(/references unknown node/);
  });

  it('rejects disallowed URL schemes in background.default', () => {
    expect(() =>
      validateConfig({
        ...minimalConfig(),
        background: { default: 'javascript:alert(1)' },
      }),
    ).toThrow(/must start with/);
  });

  it('rejects bad aspect_ratio strings', () => {
    expect(() =>
      validateConfig({ ...minimalConfig(), aspect_ratio: '16x10' }),
    ).toThrow(/aspect_ratio/);
  });

  it('rejects speed_multiplier out of range', () => {
    const raw = {
      ...minimalConfig(),
      flows: [
        {
          id: 'f',
          from_node: 'a',
          to_node: 'b',
          entity: 'sensor.x',
          waypoints: [],
          speed_multiplier: 99,
        },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/speed_multiplier/);
  });
});

describe('validateConfig — speed_curve_override (v1.0.6)', () => {
  function flowWith(override: unknown): Record<string, unknown> {
    return {
      ...minimalConfig(),
      flows: [
        {
          id: 'f',
          from_node: 'a',
          to_node: 'b',
          entity: 'sensor.x',
          waypoints: [],
          speed_curve_override: override,
        },
      ],
    };
  }

  it('accepts a full override block and round-trips every field', () => {
    const cfg = validateConfig(
      flowWith({
        threshold: 50,
        p50: 1000,
        peak: 8000,
        max_duration: 8000,
        min_duration: 600,
        steepness: 2,
      }),
    );
    expect(cfg.flows[0]?.speed_curve_override).toEqual({
      threshold: 50,
      p50: 1000,
      peak: 8000,
      max_duration: 8000,
      min_duration: 600,
      steepness: 2,
    });
  });

  it('accepts a partial override (every field is independently optional)', () => {
    const cfg = validateConfig(flowWith({ p50: 1500 }));
    expect(cfg.flows[0]?.speed_curve_override).toEqual({ p50: 1500 });
  });

  it('rejects non-object overrides', () => {
    expect(() => validateConfig(flowWith('not an object'))).toThrow(/speed_curve_override/);
    expect(() => validateConfig(flowWith([]))).toThrow(/speed_curve_override/);
    expect(() => validateConfig(flowWith(null))).toThrow(/speed_curve_override/);
  });

  it('rejects non-positive threshold / p50 / peak', () => {
    expect(() => validateConfig(flowWith({ threshold: 0 }))).toThrow(/threshold/);
    expect(() => validateConfig(flowWith({ p50: -1 }))).toThrow(/p50/);
    expect(() => validateConfig(flowWith({ peak: 0 }))).toThrow(/peak/);
  });

  it('rejects durations below 50 ms', () => {
    expect(() => validateConfig(flowWith({ max_duration: 10 }))).toThrow(/max_duration/);
    expect(() => validateConfig(flowWith({ min_duration: 0 }))).toThrow(/min_duration/);
  });

  it('rejects min_duration ≥ max_duration when both are set', () => {
    expect(() =>
      validateConfig(flowWith({ max_duration: 1000, min_duration: 1000 })),
    ).toThrow(/min_duration/);
    expect(() =>
      validateConfig(flowWith({ max_duration: 1000, min_duration: 1500 })),
    ).toThrow(/min_duration/);
  });

  it('rejects unknown keys to surface typos', () => {
    expect(() => validateConfig(flowWith({ stepness: 1.5 }))).toThrow(/stepness/);
  });
});

describe('validateConfig — overlay schema', () => {
  it('rejects unknown overlay types', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [{ id: 'x', type: 'martian', position: { x: 0, y: 0 } }],
    };
    expect(() => validateConfig(raw)).toThrow(/type/);
  });

  it('rejects duplicate overlay ids', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        { id: 'dup', type: 'sensor', entity: 'sensor.a', position: { x: 10, y: 10 } },
        { id: 'dup', type: 'sensor', entity: 'sensor.b', position: { x: 20, y: 20 } },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/duplicate overlay id/);
  });

  it('requires entity for sensor / switch / camera overlays', () => {
    for (const type of ['sensor', 'switch', 'camera']) {
      const raw = {
        ...minimalConfig(),
        overlays: [{ id: 'o', type, position: { x: 0, y: 0 } }],
      };
      expect(() => validateConfig(raw)).toThrow(/entity/);
    }
  });

  it('requires card_config for custom overlays', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [{ id: 'o', type: 'custom', position: { x: 0, y: 0 } }],
    };
    expect(() => validateConfig(raw)).toThrow(/card_config/);
  });

  it('rejects card_config on non-custom types', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'o',
          type: 'sensor',
          entity: 'sensor.x',
          position: { x: 0, y: 0 },
          card_config: { type: 'entity', entity: 'sensor.x' },
        },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/card_config/);
  });

  it('rejects unsafe URL schemes in custom overlay card_config', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'o',
          type: 'custom',
          position: { x: 0, y: 0 },
          card_config: { type: 'markdown', tap_action: { url_path: 'javascript:alert(1)' } },
        },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/javascript:/);
  });

  it('validates size bounds', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'o',
          type: 'sensor',
          entity: 'sensor.x',
          position: { x: 10, y: 10 },
          size: { width: -1, height: 10 },
        },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/size\.width/);
  });

  it('rejects unknown tap_action values', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'o',
          type: 'sensor',
          entity: 'sensor.x',
          position: { x: 10, y: 10 },
          tap_action: { action: 'destroy-world' },
        },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/tap_action/);
  });
});
