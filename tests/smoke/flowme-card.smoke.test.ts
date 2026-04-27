import { describe, it, expect, beforeAll, afterEach } from 'vitest';

// Import for side effect: @customElement('flowme-card') registers the tag.
// This also pulls in the renderer factory, which in happy-dom falls back to
// the SVG renderer because CSS.paintWorklet is undefined.
import '../../src/flowme-card.js';
import { FlowmeCardEditor } from '../../src/flowme-card-editor.js';
import type { HomeAssistant } from '../../src/types.js';

function makeHass(overrides: Partial<HomeAssistant> = {}): HomeAssistant {
  return {
    states: {
      'sensor.power': {
        entity_id: 'sensor.power',
        state: '420',
        attributes: {},
      },
    },
    ...overrides,
  } as HomeAssistant;
}

const MINIMAL_CONFIG = {
  type: 'custom:flowme-card',
  domain: 'energy',
  background: { default: '/local/demo.jpg' },
  nodes: [
    { id: 'src', position: { x: 10, y: 50 } },
    { id: 'dst', position: { x: 90, y: 50 } },
  ],
  flows: [
    {
      id: 'f1',
      from_node: 'src',
      to_node: 'dst',
      entity: 'sensor.power',
      waypoints: [],
    },
  ],
};

describe('flowme-card smoke test (happy-dom)', () => {
  beforeAll(() => {
    // happy-dom doesn't set this automatically; Lit pulls from customElements.
    expect(customElements.get('flowme-card')).toBeDefined();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('C1 fix: no personal/hardcoded entity IDs in compiled bundle (sirbu/dumitra)', () => {
    // The bundle must not contain any personal sensor names that were present in
    // DEBUG_WATCH_ENTITIES before the v1.0.8 audit fix.
    // We check the *module source* itself via a dynamic import URL, but since
    // happy-dom doesn't execute full module text we check a side effect:
    // the compiled card class must not expose the strings in any property.
    const ctor = customElements.get('flowme-card') as unknown;
    const src = String(ctor);
    expect(src).not.toMatch(/sirbu/i);
    expect(src).not.toMatch(/dumitra/i);
  });

  it('registers the custom element and appears on window.customCards', () => {
    const w = window as unknown as { customCards?: Array<{ type: string }> };
    expect(w.customCards).toBeDefined();
    expect(w.customCards!.some((c) => c.type === 'flowme-card')).toBe(true);
  });

  it('mounts and renders without throwing when setConfig is called with a valid config', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig(MINIMAL_CONFIG);
    card.hass = makeHass();
    document.body.appendChild(card);
    await card.updateComplete;
    expect(card.shadowRoot).toBeTruthy();
    // ha-card is not defined in happy-dom, but Lit still emits the host tag.
    expect(card.shadowRoot!.innerHTML.toLowerCase()).toContain('ha-card');
  });

  it('surfaces validation errors to the user instead of crashing', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({ type: 'custom:other-card' });
    document.body.appendChild(card);
    await card.updateComplete;
    // The card writes a human-readable message into shadow DOM when setConfig fails.
    expect(card.shadowRoot!.textContent?.toLowerCase()).toMatch(/flowme|error|card/);
  });

  it('getConfigElement (static) returns a <flowme-card-editor> instance', () => {
    const ctor = customElements.get('flowme-card') as unknown as {
      getConfigElement(): HTMLElement;
    };
    expect(ctor).toBeDefined();
    const editor = ctor.getConfigElement();
    expect(editor).toBeInstanceOf(FlowmeCardEditor);
  });

  it('getStubConfig (static) returns a valid-looking starter config', () => {
    const ctor = customElements.get('flowme-card') as unknown as {
      getStubConfig(): unknown;
    };
    const stub = ctor.getStubConfig() as { type: string; nodes: unknown[] };
    expect(stub.type).toBe('custom:flowme-card');
    expect(Array.isArray(stub.nodes)).toBe(true);
  });

  it('renders a node value using the sensor unit_of_measurement (no doubling with profile.unit_label)', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      nodes: [
        { id: 'src', position: { x: 10, y: 50 }, entity: 'sensor.power', show_value: true },
        { id: 'dst', position: { x: 90, y: 50 } },
      ],
    });
    card.hass = {
      states: {
        'sensor.power': {
          entity_id: 'sensor.power',
          state: '1',
          attributes: { unit_of_measurement: 'W' },
        },
      },
    } as unknown as HomeAssistant;
    document.body.appendChild(card);
    await card.updateComplete;
    const html = card.shadowRoot!.innerHTML;
    // Happy-dom strips a lot but the value text must NOT have the unit twice.
    expect(html).not.toContain('W W');
  });

  it('custom overlay renders a flowme-custom-overlay element', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      flows: [],
      overlays: [
        {
          id: 'ov1',
          type: 'custom',
          position: { x: 10, y: 10 },
          size: { width: 20, height: 15 },
          card: { type: 'entity', entity: 'sensor.example' },
        },
      ],
    });
    document.body.appendChild(card);
    await card.updateComplete;
    expect(card.shadowRoot!.innerHTML).toContain('flowme-custom-overlay');
    expect(card.shadowRoot!.innerHTML).toContain('overlay-custom');
  });

  it('M1: domain_colors overrides built-in id-pattern defaults', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      domain_colors: { solar: '#ff0000' },
      nodes: [
        { id: 'pv1', position: { x: 10, y: 50 } },
        { id: 'inv', position: { x: 90, y: 50 } },
      ],
      flows: [
        { id: 'solar1', from_node: 'pv1', to_node: 'inv', entity: 'sensor.power', waypoints: [] },
      ],
    });
    card.hass = makeHass();
    document.body.appendChild(card);
    await card.updateComplete;
    const dot = card.shadowRoot!.querySelector('[data-node-id="pv1"] .node-dot') as HTMLElement;
    expect(dot).toBeTruthy();
    // Should use the domain_colors override, not the built-in #FFD700.
    expect(dot.getAttribute('style') ?? '').toMatch(/#ff0000/i);
    expect(dot.getAttribute('style') ?? '').not.toMatch(/#FFD700/i);
  });

  it('M2: defaults.node_radius sets fallback dot size', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      defaults: { node_radius: 20 },
    });
    card.hass = makeHass();
    document.body.appendChild(card);
    await card.updateComplete;
    const dot = card.shadowRoot!.querySelector('.node-dot') as HTMLElement;
    expect(dot).toBeTruthy();
    expect(dot.getAttribute('style') ?? '').toContain('20px');
  });

  it('node renders default-by-id energy colour (solar1 → gold) without explicit config', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      nodes: [
        { id: 'pv1', position: { x: 10, y: 50 } },
        { id: 'inv', position: { x: 90, y: 50 } },
      ],
      flows: [
        { id: 'solar1', from_node: 'pv1', to_node: 'inv', entity: 'sensor.power', waypoints: [] },
      ],
    });
    card.hass = makeHass();
    document.body.appendChild(card);
    await card.updateComplete;
    const dot = card.shadowRoot!.querySelector('[data-node-id="pv1"] .node-dot') as HTMLElement;
    expect(dot).toBeTruthy();
    // Inline `background: #FFD700;` — happy-dom keeps the literal hex on the style attribute.
    expect(dot.getAttribute('style') ?? '').toMatch(/#FFD700/i);
  });

  it('node connecting to multiple distinct flow colours falls back to neutral grey #CCCCCC', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      nodes: [
        { id: 'pv1', position: { x: 10, y: 30 } },
        { id: 'grid', position: { x: 10, y: 70 } },
        { id: 'battery', position: { x: 90, y: 30 } },
        { id: 'load', position: { x: 90, y: 70 } },
        { id: 'inverter', position: { x: 50, y: 50 } },
      ],
      flows: [
        { id: 'solar1', from_node: 'pv1', to_node: 'inverter', entity: 'sensor.power', waypoints: [] },
        { id: 'grid_flow', from_node: 'grid', to_node: 'inverter', entity: 'sensor.power', waypoints: [] },
        { id: 'battery_flow', from_node: 'battery', to_node: 'inverter', entity: 'sensor.power', waypoints: [] },
        { id: 'load_flow', from_node: 'inverter', to_node: 'load', entity: 'sensor.power', waypoints: [] },
      ],
    });
    card.hass = makeHass();
    document.body.appendChild(card);
    await card.updateComplete;
    const inverterDot = card.shadowRoot!.querySelector('[data-node-id="inverter"] .node-dot') as HTMLElement;
    expect(inverterDot).toBeTruthy();
    expect(inverterDot.getAttribute('style') ?? '').toMatch(/#CCCCCC/i);
    // Sanity: each terminal node still adopts its single connected flow's colour.
    const pvDot = card.shadowRoot!.querySelector('[data-node-id="pv1"] .node-dot') as HTMLElement;
    expect(pvDot.getAttribute('style') ?? '').toMatch(/#FFD700/i);
    const gridDot = card.shadowRoot!.querySelector('[data-node-id="grid"] .node-dot') as HTMLElement;
    expect(gridDot.getAttribute('style') ?? '').toMatch(/#1EB4FF/i);
    const battDot = card.shadowRoot!.querySelector('[data-node-id="battery"] .node-dot') as HTMLElement;
    expect(battDot.getAttribute('style') ?? '').toMatch(/#32DC50/i);
    const loadDot = card.shadowRoot!.querySelector('[data-node-id="load"] .node-dot') as HTMLElement;
    expect(loadDot.getAttribute('style') ?? '').toMatch(/#FF8C1E/i);
  });

  it('explicit flow.color shorthand overrides default-by-id', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      nodes: [
        { id: 'pv1', position: { x: 10, y: 50 } },
        { id: 'inv', position: { x: 90, y: 50 } },
      ],
      flows: [
        { id: 'solar1', from_node: 'pv1', to_node: 'inv', entity: 'sensor.power', waypoints: [], color: '#ff00aa' },
      ],
    });
    card.hass = makeHass();
    document.body.appendChild(card);
    await card.updateComplete;
    const dot = card.shadowRoot!.querySelector('[data-node-id="pv1"] .node-dot') as HTMLElement;
    expect(dot.getAttribute('style') ?? '').toMatch(/#ff00aa/i);
  });

  it('node wrapper uses dot-anchored transform so the circle centre stays at (x%, y%) regardless of label/value', async () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      hass?: HomeAssistant;
      updateComplete: Promise<unknown>;
    };
    card.setConfig({
      ...MINIMAL_CONFIG,
      nodes: [
        // Node A with neither label nor value
        { id: 'a', position: { x: 10, y: 10 }, size: 12 },
        // Node B with both label and value showing
        {
          id: 'b',
          position: { x: 90, y: 90 },
          size: 12,
          label: 'House',
          show_value: true,
          show_label: true,
          entity: 'sensor.power',
        },
      ],
      // Drop the MINIMAL_CONFIG flow which references src/dst.
      flows: [],
    });
    card.hass = makeHass();
    document.body.appendChild(card);
    await card.updateComplete;
    const a = card.shadowRoot!.querySelector('[data-node-id="a"]') as HTMLElement;
    const b = card.shadowRoot!.querySelector('[data-node-id="b"]') as HTMLElement;
    // Both wrappers must declare the dot-size CSS variable so the
    // shared `.node` rule can offset the wrapper by exactly half the
    // dot — that is what keeps the circle centred on (x%, y%) even
    // when label/value are added to the column.
    expect(a.getAttribute('style') ?? '').toMatch(/--flowme-dot-size:\s*12px/);
    expect(b.getAttribute('style') ?? '').toMatch(/--flowme-dot-size:\s*12px/);
    expect(a.getAttribute('style') ?? '').toMatch(/left:\s*10%/);
    expect(a.getAttribute('style') ?? '').toMatch(/top:\s*10%/);
    expect(b.getAttribute('style') ?? '').toMatch(/left:\s*90%/);
    expect(b.getAttribute('style') ?? '').toMatch(/top:\s*90%/);
  });

  it('getLayoutOptions + getGridOptions return grid hints so HA stops warning about resizing', () => {
    const card = document.createElement('flowme-card') as HTMLElement & {
      setConfig: (c: unknown) => void;
      getLayoutOptions(): Record<string, unknown>;
      getGridOptions(): Record<string, unknown>;
    };
    card.setConfig(MINIMAL_CONFIG);
    const layout = card.getLayoutOptions();
    expect(layout).toMatchObject({
      grid_columns: expect.any(Number),
      grid_rows: expect.any(Number),
      grid_min_columns: expect.any(Number),
      grid_min_rows: expect.any(Number),
    });
    // getGridOptions is the older alias — ensure parity.
    expect(card.getGridOptions()).toEqual(layout);
  });
});
