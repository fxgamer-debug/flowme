import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type {
  FlowmeConfig,
  HomeAssistant,
  NodeConfig,
  OverlayConfig,
} from './types.js';
import { FlowmeConfigError, validateConfig } from './validate-config.js';
import { createRenderer } from './animation/renderer-factory.js';
import type { FlowRenderer } from './animation/types.js';
import { getProfile } from './flow-profiles/index.js';
import { parseAspectRatio, parseSensorValue } from './utils.js';

/** Logged once at load so users can confirm the right version is loaded. */
const CARD_VERSION = '0.1.0';

// eslint-disable-next-line no-console
console.info(
  `%c flowme %c v${CARD_VERSION} `,
  'color: white; background: #4ADE80; font-weight: 700;',
  'color: #4ADE80; background: #111; font-weight: 700;',
);

@customElement('flowme-card')
export class FlowmeCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: FlowmeConfig;
  @state() private errorMessage?: string;

  private renderer: FlowRenderer | null = null;
  private readonly rendererMount: Ref<HTMLDivElement> = createRef();
  private rendererReadyFor?: FlowmeConfig;

  setConfig(raw: unknown): void {
    try {
      const config = validateConfig(raw);
      this.config = config;
      this.errorMessage = undefined;
      // if renderer was already init'd for a previous config, reinit on next update
      if (this.rendererReadyFor && this.rendererReadyFor !== config) {
        this.teardownRenderer();
      }
    } catch (err) {
      const message = err instanceof FlowmeConfigError ? err.message : String(err);
      this.config = undefined;
      this.errorMessage = message;
      this.teardownRenderer();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
  }

  override disconnectedCallback(): void {
    this.teardownRenderer();
    super.disconnectedCallback();
  }

  override willUpdate(changed: PropertyValues): void {
    if (!this.config) return;
    const mount = this.rendererMount.value;

    // initialise the renderer once the mount element is live and config valid
    if (mount && this.rendererReadyFor !== this.config) {
      this.teardownRenderer();
      this.renderer = createRenderer();
      this.rendererReadyFor = this.config;
      void this.renderer.init(mount, this.config);
    }

    // push fresh sensor values on any hass update
    if (changed.has('hass') && this.renderer && this.hass) {
      for (const flow of this.config.flows) {
        const state = this.hass.states[flow.entity];
        const value = parseSensorValue(state?.state);
        this.renderer.updateFlow(flow.id, value);
      }
    }
  }

  getCardSize(): number {
    return 5;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('flowme-card-editor');
  }

  static getStubConfig(): FlowmeConfig {
    return {
      type: 'custom:flowme-card',
      domain: 'energy',
      background: {
        default: '/local/flowme/example-house.jpg',
      },
      nodes: [
        { id: 'source', position: { x: 20, y: 30 }, label: 'Source' },
        { id: 'sink', position: { x: 80, y: 70 }, label: 'Sink' },
      ],
      flows: [
        {
          id: 'example',
          from_node: 'source',
          to_node: 'sink',
          entity: 'sensor.example_power',
          waypoints: [{ x: 80, y: 30 }],
        },
      ],
    };
  }

  override render(): TemplateResult {
    if (this.errorMessage) {
      return html`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    }
    const config = this.config;
    if (!config) {
      return html`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    }

    const aspect = parseAspectRatio(config.aspect_ratio) ?? 16 / 10;
    const paddingTop = `${(1 / aspect) * 100}%`;
    const bgUrl = this.currentBackgroundUrl();

    return html`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${paddingTop};`}
        >
          <div
            class="background"
            style=${bgUrl ? `background-image: url('${bgUrl}');` : ''}
          ></div>
          <div class="renderer-mount" ${ref(this.rendererMount)}></div>
          ${config.nodes.map((n) => this.renderNodeHandle(n))}
          ${(config.overlays ?? []).map((o) => this.renderOverlayPlaceholder(o))}
        </div>
      </ha-card>
    `;
  }

  private currentBackgroundUrl(): string {
    const bg = this.config?.background;
    if (!bg) return '';
    if (bg.weather_entity && bg.weather_states && this.hass) {
      const weather = this.hass.states[bg.weather_entity];
      if (weather) {
        const match = bg.weather_states[weather.state];
        if (match) return match;
      }
    }
    return bg.default;
  }

  private renderNodeHandle(node: NodeConfig): TemplateResult {
    const state = this.hass && node.entity ? this.hass.states[node.entity] : undefined;
    const showValue = node.show_value !== false && !!state;
    const showLabel = node.show_label !== false && !!node.label;
    const profile = getProfile(this.config?.domain);
    const fill = node.color ?? profile.default_color_positive;
    const size = node.size ?? 12;
    const valueText = state
      ? `${profile.describe(parseSensorValue(state.state))}${
          profile.unit_label ? ` ${profile.unit_label}` : ''
        }`
      : '';

    return html`
      <div
        class="node"
        data-node-id=${node.id}
        style=${`left: ${node.position.x}%; top: ${node.position.y}%;`}
      >
        <span
          class="node-dot"
          style=${`background: ${fill}; width: ${size}px; height: ${size}px;`}
        ></span>
        ${showLabel ? html`<span class="node-label">${node.label}</span>` : null}
        ${showValue ? html`<span class="node-value">${valueText}</span>` : null}
      </div>
    `;
  }

  // v0.5 replaces this with real overlay rendering; for now we render a
  // subtle marker so users see something at the configured position.
  private renderOverlayPlaceholder(overlay: OverlayConfig): TemplateResult {
    return html`
      <div
        class="overlay-placeholder"
        style=${`left: ${overlay.position.x}%; top: ${overlay.position.y}%;`}
        title=${`overlay: ${overlay.type}`}
      ></div>
    `;
  }

  private teardownRenderer(): void {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
    this.rendererReadyFor = undefined;
  }

  static override styles = css`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
      position: relative;
    }
    .stage {
      position: relative;
      width: 100%;
      height: 0;
      overflow: hidden;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--ha-card-background, rgba(0, 0, 0, 0.04));
    }
    .renderer-mount {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .node {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      color: var(--primary-text-color, #fff);
      font-size: 12px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      pointer-events: none;
    }
    .node-dot {
      display: inline-block;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.7);
    }
    .node-label {
      font-weight: 600;
      white-space: nowrap;
    }
    .node-value {
      opacity: 0.85;
      white-space: nowrap;
    }
    .overlay-placeholder {
      position: absolute;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.1);
      border: 1px dashed rgba(255, 255, 255, 0.4);
      pointer-events: none;
    }
    .error {
      padding: 16px;
      color: var(--error-color, #f44336);
    }
    .error pre {
      margin: 8px 0 0;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .placeholder {
      padding: 16px;
      opacity: 0.6;
    }
  `;
}

// Register the card in HA's custom card catalog so it appears in "Add card" UI.
interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview: boolean;
  documentationURL?: string;
}
const w = window as unknown as { customCards?: CustomCardEntry[] };
w.customCards = w.customCards ?? [];
w.customCards.push({
  type: 'flowme-card',
  name: 'flowme',
  description: 'Animated flow visualisation over a custom background image',
  preview: true,
  documentationURL: 'https://github.com/fxgamer-debug/flowme',
});

// Bootstrap the editor element by side-effect so getConfigElement() works.
import './flowme-card-editor.js';
