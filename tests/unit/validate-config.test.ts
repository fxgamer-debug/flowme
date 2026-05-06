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

  it('defaults card domain to energy when key is missing or invalid', () => {
    const noDomain = { ...minimalConfig() } as Record<string, unknown>;
    delete noDomain['domain'];
    expect(validateConfig(noDomain).domain).toBe('energy');
    expect(validateConfig({ ...minimalConfig(), domain: 'martian' }).domain).toBe('energy');
  });

  it('accepts pause_when_hidden', () => {
    const cfg = validateConfig({ ...minimalConfig(), pause_when_hidden: false });
    expect(cfg.pause_when_hidden).toBe(false);
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

  it('parses v1.0.8 defaults block (all fields, no camera_refresh_interval in v1.0.9)', () => {
    const raw = {
      ...minimalConfig(),
      defaults: {
        node_radius: 16,
        burst_trigger_ratio: 0.8,
        burst_sustain_ms: 3000,
        burst_max_particles: 15,
        dot_radius: 7,
        line_width: 3,
      },
    };
    const cfg = validateConfig(raw);
    expect(cfg.defaults?.node_radius).toBe(16);
    expect(cfg.defaults?.burst_trigger_ratio).toBe(0.8);
    expect(cfg.defaults?.burst_sustain_ms).toBe(3000);
    expect(cfg.defaults?.burst_max_particles).toBe(15);
    expect(cfg.defaults?.dot_radius).toBe(7);
    expect(cfg.defaults?.line_width).toBe(3);
  });

  it('parses debug flag', () => {
    const raw = { ...minimalConfig(), debug: true };
    const cfg = validateConfig(raw);
    expect(cfg.debug).toBe(true);
  });

  it('accepts optional flow label and /media/ background URLs', () => {
    const raw = {
      ...minimalConfig(),
      background: { default: '/media/local/photo.jpg' },
      flows: [
        {
          id: 'solar1',
          label: 'Solar String 1',
          from_node: 'a',
          to_node: 'b',
          entity: 'sensor.pv',
          waypoints: [],
        },
      ],
    };
    const cfg = validateConfig(raw);
    expect(cfg.flows[0]?.label).toBe('Solar String 1');
    expect(cfg.background.default).toBe('/media/local/photo.jpg');
  });

  it('allows empty weather_states image URL placeholders', () => {
    const cfg = validateConfig({
      ...minimalConfig(),
      background: {
        default: '/local/bg.jpg',
        weather_states: { partlycloudy: '', sunny: '/local/sun.jpg' },
      },
    });
    expect(cfg.background.weather_states).toEqual({
      partlycloudy: '',
      sunny: '/local/sun.jpg',
    });
  });

  it('omits flow label when empty or identical to id', () => {
    const mk = (label: unknown) =>
      validateConfig({
        ...minimalConfig(),
        flows: [{ id: 'f1', label, from_node: 'a', to_node: 'b', entity: 'sensor.x', waypoints: [] }],
      });
    expect(mk('').flows[0]?.label).toBeUndefined();
    expect(mk('f1').flows[0]?.label).toBeUndefined();
  });

  it('rejects flow label longer than 64 characters', () => {
    expect(() =>
      validateConfig({
        ...minimalConfig(),
        flows: [
          {
            id: 'f1',
            label: 'x'.repeat(65),
            from_node: 'a',
            to_node: 'b',
            entity: 'sensor.x',
            waypoints: [],
          },
        ],
      }),
    ).toThrow(/label/);
  });

  it('rejects defaults.burst_trigger_ratio > 1', () => {
    const raw = { ...minimalConfig(), defaults: { burst_trigger_ratio: 1.5 } };
    expect(() => validateConfig(raw)).toThrow(/burst_trigger_ratio/);
  });

  it('rejects defaults with non-positive values', () => {
    expect(() => validateConfig({ ...minimalConfig(), defaults: { node_radius: -1 } })).toThrow(/node_radius/);
    expect(() => validateConfig({ ...minimalConfig(), defaults: { dot_radius: 0 } })).toThrow(/dot_radius/);
  });

  it('parses v1.0.8 domain_colors block', () => {
    const raw = {
      ...minimalConfig(),
      domain_colors: {
        solar: '#111111',
        grid: '#222222',
        battery: '#333333',
        load: '#444444',
      },
    };
    const cfg = validateConfig(raw);
    expect(cfg.domain_colors?.solar).toBe('#111111');
    expect(cfg.domain_colors?.grid).toBe('#222222');
    expect(cfg.domain_colors?.battery).toBe('#333333');
    expect(cfg.domain_colors?.load).toBe('#444444');
  });

  it('accepts partial domain_colors (only some keys)', () => {
    const raw = { ...minimalConfig(), domain_colors: { solar: '#aabbcc' } };
    const cfg = validateConfig(raw);
    expect(cfg.domain_colors?.solar).toBe('#aabbcc');
    expect(cfg.domain_colors?.grid).toBeUndefined();
  });

  it('parses a custom overlay with visible and opacity', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'ov1',
          type: 'custom',
          position: { x: 50, y: 50 },
          card: { type: 'entity', entity: 'sensor.test' },
          visible: false,
          opacity: 0.7,
        },
      ],
    };
    const cfg = validateConfig(raw);
    expect(cfg.overlays?.[0]?.visible).toBe(false);
    expect(cfg.overlays?.[0]?.opacity).toBe(0.7);
  });

  it('rejects opacity outside 0–1', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'ov1',
          type: 'custom',
          position: { x: 10, y: 10 },
          card: { type: 'entity', entity: 'sensor.x' },
          opacity: 1.5,
        },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/opacity/);
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

  it('accepts omitted background (no default image key)', () => {
    const { background: _omit, ...rest } = minimalConfig();
    const cfg = validateConfig(rest);
    expect(cfg.background.default).toBeUndefined();
  });

  it('treats empty background.default as transparent (omits key)', () => {
    const cfg = validateConfig({
      ...minimalConfig(),
      background: { default: '' },
    });
    expect(cfg.background.default).toBeUndefined();
  });

  it('accepts a custom overlay (only supported type in v1.0.9)', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'ov_custom',
          type: 'custom',
          position: { x: 60, y: 60 },
          card: { type: 'entity', entity: 'sensor.x' },
        },
      ],
    };
    const cfg = validateConfig(raw);
    expect(cfg.overlays).toHaveLength(1);
    expect(cfg.overlays?.[0]?.type).toBe('custom');
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

  it('rejects non-positive animation durations (v2.2+ allows small positive values)', () => {
    expect(() => validateConfig(flowWith({ max_duration: 0 }))).toThrow(/max_duration/);
    expect(() => validateConfig(flowWith({ min_duration: 0 }))).toThrow(/min_duration/);
    const okSmall = validateConfig(flowWith({ max_duration: 10, min_duration: 5 }));
    expect(okSmall.flows[0]?.speed_curve_override?.max_duration).toBe(10);
    expect(okSmall.flows[0]?.speed_curve_override?.min_duration).toBe(5);
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
  function customOverlay(extra: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: 'o',
      type: 'custom',
      position: { x: 10, y: 10 },
      card: { type: 'entity', entity: 'sensor.x' },
      ...extra,
    };
  }

  it('gracefully handles removed native overlay types (warn, not crash) since v1.0.10', () => {
    for (const type of ['sensor', 'switch', 'camera', 'button']) {
      const raw = {
        ...minimalConfig(),
        overlays: [{ id: 'o', type, position: { x: 0, y: 0 } }],
      };
      // Should NOT throw — produces a migration-warning overlay instead
      const result = validateConfig(raw);
      expect(result.overlays).toHaveLength(1);
      expect(result.overlays![0]!._migration_warning).toMatch(/removed in v1\.0\.9/);
    }
  });

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
        customOverlay({ id: 'dup' }),
        { id: 'dup', type: 'custom', position: { x: 20, y: 20 }, card: { type: 'entity', entity: 'sensor.b' } },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/duplicate overlay id/);
  });

  it('requires card: block for custom overlays', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [{ id: 'o', type: 'custom', position: { x: 0, y: 0 } }],
    };
    expect(() => validateConfig(raw)).toThrow(/card/);
  });

  it('rejects unsafe URL schemes in overlay card block', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [
        {
          id: 'o',
          type: 'custom',
          position: { x: 0, y: 0 },
          card: { type: 'markdown', tap_action: { url_path: 'javascript:alert(1)' } },
        },
      ],
    };
    expect(() => validateConfig(raw)).toThrow(/javascript:/);
  });

  it('validates size bounds', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [customOverlay({ size: { width: -1, height: 10 } })],
    };
    expect(() => validateConfig(raw)).toThrow(/size\.width/);
  });

  it('rejects non-boolean visible', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [customOverlay({ visible: 'yes' })],
    };
    expect(() => validateConfig(raw)).toThrow(/visible/);
  });

  it('rejects opacity outside 0–1', () => {
    const raw = {
      ...minimalConfig(),
      overlays: [customOverlay({ opacity: 2 })],
    };
    expect(() => validateConfig(raw)).toThrow(/opacity/);
  });
});
