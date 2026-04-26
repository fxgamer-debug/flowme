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
