import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type { FlowmeConfig, HomeAssistant, NodeConfig } from './types.js';
import { validateConfig } from './validate-config.js';
import { parseAspectRatio } from './utils.js';

type EditorMode = 'view' | 'add-node';

/**
 * v0.1 editor: supports dragging existing node handles and adding new nodes
 * by clicking on the background. Flows, waypoints, entities and other fields
 * are edited via HA's raw-YAML editor (the "Show code editor" toggle in the
 * card dialog). v0.2 replaces this with the full drag+undo editor.
 */
@customElement('flowme-card-editor')
export class FlowmeCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: FlowmeConfig;
  @state() private mode: EditorMode = 'view';
  @state() private statusMessage = '';
  @state() private errorMessage = '';

  private readonly stageRef: Ref<HTMLDivElement> = createRef();
  private dragging: { nodeId: string; pointerId: number } | null = null;

  setConfig(config: unknown): void {
    try {
      this.config = validateConfig(config);
      this.errorMessage = '';
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : String(err);
    }
  }

  override render(): TemplateResult {
    if (!this.config) {
      return html`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? html`<pre class="error">${this.errorMessage}</pre>` : null}
        </div>
      `;
    }

    const aspect = parseAspectRatio(this.config.aspect_ratio) ?? 16 / 10;
    const paddingTop = `${(1 / aspect) * 100}%`;
    const bgUrl = this.config.background.default;

    return html`
      <div class="wrap">
        <div class="toolbar">
          <button
            class=${this.mode === 'add-node' ? 'on' : ''}
            @click=${this.toggleAddNode}
          >
            ${this.mode === 'add-node' ? 'Click on image…' : '+ Add node'}
          </button>
          <span class="hint-inline">
            Drag node handles to reposition. Edit flows, entities and advanced options via the
            "Show code editor" toggle.
          </span>
        </div>
        ${this.statusMessage ? html`<div class="status">${this.statusMessage}</div>` : null}
        <div
          class="stage"
          style=${`padding-top: ${paddingTop};`}
          @click=${this.onStageClick}
          ${ref(this.stageRef)}
        >
          <div
            class="background"
            style=${bgUrl ? `background-image: url('${bgUrl}');` : ''}
          ></div>
          ${this.config.nodes.map((node) => this.renderHandle(node))}
        </div>
        ${this.errorMessage ? html`<pre class="error">${this.errorMessage}</pre>` : null}
      </div>
    `;
  }

  private renderHandle(node: NodeConfig): TemplateResult {
    return html`
      <div
        class="handle"
        data-node-id=${node.id}
        style=${`left: ${node.position.x}%; top: ${node.position.y}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onHandleClick}
      >
        <span class="handle-dot"></span>
        ${node.label ? html`<span class="handle-label">${node.label}</span>` : null}
      </div>
    `;
  }

  private toggleAddNode = (): void => {
    this.mode = this.mode === 'add-node' ? 'view' : 'add-node';
    this.statusMessage =
      this.mode === 'add-node'
        ? 'Click anywhere on the background to drop a new node.'
        : '';
  };

  private onStageClick = (event: MouseEvent): void => {
    if (this.mode !== 'add-node' || !this.config) return;
    const stage = this.stageRef.value;
    if (!stage) return;
    // ignore clicks that originated on an existing handle
    const target = event.target as HTMLElement | null;
    if (target && target.closest('.handle')) return;

    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const newNode: NodeConfig = {
      id: this.freshNodeId(),
      position: { x: clampPercent(x), y: clampPercent(y) },
      label: 'New node',
    };
    const next: FlowmeConfig = { ...this.config, nodes: [...this.config.nodes, newNode] };
    this.commitChange(next);
    this.mode = 'view';
    this.statusMessage = `Added node ${newNode.id}.`;
  };

  private onHandlePointerDown = (event: PointerEvent): void => {
    if (this.mode === 'add-node') return;
    const el = event.currentTarget as HTMLElement;
    const nodeId = el.dataset['nodeId'];
    if (!nodeId) return;
    event.preventDefault();
    el.setPointerCapture(event.pointerId);
    this.dragging = { nodeId, pointerId: event.pointerId };
  };

  private onHandlePointerMove = (event: PointerEvent): void => {
    if (!this.dragging || this.dragging.pointerId !== event.pointerId || !this.config) return;
    const stage = this.stageRef.value;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = clampPercent(((event.clientX - rect.left) / rect.width) * 100);
    const y = clampPercent(((event.clientY - rect.top) / rect.height) * 100);

    const nodeId = this.dragging.nodeId;
    const nextNodes = this.config.nodes.map((n) =>
      n.id === nodeId ? { ...n, position: { x, y } } : n,
    );
    // update silently during drag; fire config-changed once on pointerup
    this.config = { ...this.config, nodes: nextNodes };
  };

  private onHandlePointerUp = (event: PointerEvent): void => {
    if (!this.dragging || this.dragging.pointerId !== event.pointerId || !this.config) return;
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    this.dragging = null;
    // commit the final position to HA
    this.commitChange(this.config);
  };

  private onHandleClick = (event: MouseEvent): void => {
    // prevent the stage's add-node click handler from firing when clicking a handle
    event.stopPropagation();
  };

  private commitChange(next: FlowmeConfig): void {
    try {
      const validated = validateConfig(next);
      this.config = validated;
      this.errorMessage = '';
      const event = new CustomEvent('config-changed', {
        detail: { config: validated },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : String(err);
    }
  }

  private freshNodeId(): string {
    const existing = new Set(this.config?.nodes.map((n) => n.id) ?? []);
    for (let i = 1; i < 1000; i++) {
      const candidate = `node_${i}`;
      if (!existing.has(candidate)) return candidate;
    }
    return `node_${Date.now()}`;
  }

  static override styles = css`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .wrap {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .toolbar button {
      font: inherit;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    .toolbar button.on {
      background: var(--primary-color, #4ade80);
      color: var(--text-primary-color, #111);
      border-color: var(--primary-color, #4ade80);
    }
    .hint-inline {
      font-size: 12px;
      opacity: 0.7;
    }
    .status {
      font-size: 12px;
      padding: 6px 10px;
      background: rgba(74, 222, 128, 0.12);
      border-radius: 6px;
    }
    .stage {
      position: relative;
      width: 100%;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      background: var(--ha-card-background, #111);
      touch-action: none;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .handle {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }
    .handle:active {
      cursor: grabbing;
    }
    .handle-dot {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 5px rgba(255, 255, 255, 0.9);
    }
    .handle-label {
      font-size: 11px;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      white-space: nowrap;
    }
    .hint {
      opacity: 0.7;
      font-size: 13px;
      margin: 0;
    }
    .error {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.08);
      padding: 8px 10px;
      border-radius: 6px;
      margin: 0;
      font-size: 12px;
      white-space: pre-wrap;
    }
  `;
}

function clampPercent(value: number): number {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}
