import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

import type { FlowmeConfig, FlowConfig, HomeAssistant, NodeConfig, NodePosition } from './types.js';
import { validateConfig } from './validate-config.js';
import { parseAspectRatio } from './utils.js';
import { UndoStack } from './editor/undo-stack.js';
import {
  addFlow,
  addNode,
  clampPercent,
  deleteFlow,
  deleteNode,
  deleteWaypoint,
  insertWaypoint,
  moveNode,
  moveWaypoint,
  snapToGrid,
} from './editor/commands.js';
import './editor/toolbar.js';
import type { ToolbarAction } from './editor/toolbar.js';

type DragTarget =
  | { kind: 'node'; id: string }
  | { kind: 'waypoint'; flowId: string; index: number };

type PendingAction = null | { kind: 'add-node' } | { kind: 'add-flow'; step: 'pick-from' } | { kind: 'add-flow'; step: 'pick-to'; fromId: string };

/**
 * v0.2 editor — full drag + undo/redo with waypoints, snap, and keyboard
 * shortcuts. Flows between nodes are rendered as dashed connectors so the
 * user can see topology while editing. Right-click on a waypoint or node
 * opens a context menu (delete / rename). Click on an empty flow segment to
 * insert a waypoint at that point.
 *
 * Keyboard:
 *   ⌘Z / Ctrl+Z          — undo
 *   ⌘⇧Z / Ctrl+Shift+Z   — redo
 *   Ctrl+Y               — redo (Windows convention)
 *   Shift (held during drag) — snap to 8% grid
 */
@customElement('flowme-card-editor')
export class FlowmeCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: FlowmeConfig;
  @state() private pending: PendingAction = null;
  @state() private previewMode = false;
  @state() private selectedNodeId: string | null = null;
  @state() private selectedFlowId: string | null = null;
  @state() private statusMessage = '';
  @state() private errorMessage = '';
  @state() private canUndo = false;
  @state() private canRedo = false;
  @state() private undoLabel = '';
  @state() private redoLabel = '';

  private readonly stageRef: Ref<HTMLDivElement> = createRef();
  private undoStack = new UndoStack((next) => this.applyConfig(next, /*commitToHa*/ false));
  private unsubscribe: (() => void) | null = null;
  private dragPointerId: number | null = null;
  private dragTarget: DragTarget | null = null;
  private dragStartConfig: FlowmeConfig | null = null;
  private dragShiftHeld = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState());
    window.addEventListener('keydown', this.onKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
    window.removeEventListener('keydown', this.onKeyDown);
  }

  setConfig(config: unknown): void {
    try {
      this.config = validateConfig(config);
      this.undoStack.clear();
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
          ${this.errorMessage ? html`<pre class="error">${this.errorMessage}</pre>` : nothing}
        </div>
      `;
    }

    const aspect = parseAspectRatio(this.config.aspect_ratio) ?? 16 / 10;
    const paddingTop = `${(1 / aspect) * 100}%`;
    const bgUrl = this.config.background.default;

    return html`
      <div class="wrap">
        <flowme-editor-toolbar
          .canUndo=${this.canUndo}
          .canRedo=${this.canRedo}
          .previewMode=${this.previewMode}
          .undoLabel=${this.undoLabel}
          .redoLabel=${this.redoLabel}
          .suggestPathDisabled=${true}
          @toolbar-action=${this.onToolbarAction}
        ></flowme-editor-toolbar>
        ${this.statusMessage ? html`<div class="status">${this.statusMessage}</div>` : nothing}
        <div
          class=${`stage ${this.pending?.kind === 'add-node' ? 'mode-add-node' : ''}`}
          style=${`padding-top: ${paddingTop};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${ref(this.stageRef)}
        >
          <div
            class="background"
            style=${bgUrl ? `background-image: url('${bgUrl}');` : ''}
          ></div>
          <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.config.flows.map((f) => this.renderFlowConnector(f))}
          </svg>
          ${this.config.flows.map((f) => this.renderWaypointHandles(f))}
          ${this.config.nodes.map((n) => this.renderHandle(n))}
        </div>
        ${this.renderInspector()}
        ${this.errorMessage ? html`<pre class="error">${this.errorMessage}</pre>` : nothing}
      </div>
    `;
  }

  // -- rendering helpers --

  private renderFlowConnector(flow: FlowConfig): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const nodes = new Map(this.config.nodes.map((n) => [n.id, n]));
    const from = nodes.get(flow.from_node);
    const to = nodes.get(flow.to_node);
    if (!from || !to) return nothing;
    const points: NodePosition[] = [from.position, ...flow.waypoints, to.position];
    const isSelected = flow.id === this.selectedFlowId;
    const segments = [] as TemplateResult[];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      segments.push(html`
        <line
          class=${`segment ${isSelected ? 'selected' : ''}`}
          x1=${a.x}
          y1=${a.y}
          x2=${b.x}
          y2=${b.y}
          data-flow-id=${flow.id}
          data-segment-index=${i}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return html`<g>${segments}</g>`;
  }

  private renderWaypointHandles(flow: FlowConfig): TemplateResult[] {
    return flow.waypoints.map(
      (wp, index) => html`
        <div
          class="waypoint"
          data-flow-id=${flow.id}
          data-waypoint-index=${index}
          style=${`left: ${wp.x}%; top: ${wp.y}%;`}
          @pointerdown=${this.onHandlePointerDown}
          @pointermove=${this.onHandlePointerMove}
          @pointerup=${this.onHandlePointerUp}
          @pointercancel=${this.onHandlePointerUp}
          @contextmenu=${this.onWaypointContextMenu}
          @click=${this.stopClick}
        ></div>
      `,
    );
  }

  private renderHandle(node: NodeConfig): TemplateResult {
    const selected = node.id === this.selectedNodeId;
    return html`
      <div
        class=${`handle ${selected ? 'selected' : ''}`}
        data-node-id=${node.id}
        style=${`left: ${node.position.x}%; top: ${node.position.y}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span class="handle-dot"></span>
        ${node.label ? html`<span class="handle-label">${node.label}</span>` : nothing}
      </div>
    `;
  }

  private renderInspector(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    if (this.selectedNodeId) {
      const node = this.config.nodes.find((n) => n.id === this.selectedNodeId);
      if (!node) return nothing;
      return html`
        <div class="inspector">
          <h4>Node: ${node.id}</h4>
          <label>
            Label
            <input
              type="text"
              .value=${node.label ?? ''}
              @change=${(e: Event) => this.onNodeLabelChange(node.id, e)}
            />
          </label>
          <label>
            Entity
            <input
              type="text"
              placeholder="sensor.example"
              .value=${node.entity ?? ''}
              @change=${(e: Event) => this.onNodeEntityChange(node.id, e)}
            />
          </label>
          <button class="danger" @click=${() => this.removeNode(node.id)}>Delete node</button>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const flow = this.config.flows.find((f) => f.id === this.selectedFlowId);
      if (!flow) return nothing;
      return html`
        <div class="inspector">
          <h4>Flow: ${flow.id}</h4>
          <div class="row">
            <span>${flow.from_node} → ${flow.to_node}</span>
          </div>
          <div class="row">
            <span>Entity: <code>${flow.entity}</code></span>
          </div>
          <div class="row">
            <span>${flow.waypoints.length} waypoint(s)</span>
          </div>
          <button class="danger" @click=${() => this.removeFlow(flow.id)}>Delete flow</button>
        </div>
      `;
    }
    return nothing;
  }

  // -- toolbar --

  private onToolbarAction = (event: CustomEvent<{ action: ToolbarAction }>): void => {
    switch (event.detail.action) {
      case 'add-node':
        this.pending = { kind: 'add-node' };
        this.statusMessage = 'Click anywhere on the background to drop a new node.';
        break;
      case 'add-flow':
        this.pending = { kind: 'add-flow', step: 'pick-from' };
        this.statusMessage = 'Click the source node.';
        break;
      case 'suggest-path':
        this.statusMessage = 'Auto-routing arrives in v0.3.';
        break;
      case 'undo':
        this.undoStack.undo();
        break;
      case 'redo':
        this.undoStack.redo();
        break;
      case 'toggle-preview':
        this.previewMode = !this.previewMode;
        this.statusMessage = this.previewMode
          ? 'Preview: drag and snap suspended until you leave preview mode.'
          : '';
        break;
      case 'save':
        if (this.config) this.commitToHa(this.config);
        this.statusMessage = 'Saved to card configuration.';
        break;
    }
  };

  // -- stage interactions --

  private onStageClick = (event: MouseEvent): void => {
    if (!this.config) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('.handle, .waypoint')) return;

    if (this.pending?.kind === 'add-node') {
      const pos = this.pointerToPercent(event);
      if (!pos) return;
      const prev = this.config;
      const { config: next, node } = addNode(prev, pos, 'New node');
      this.pushPatch(prev, next, `add node ${node.id}`);
      this.pending = null;
      this.statusMessage = `Added node ${node.id}.`;
      return;
    }

    if (this.pending?.kind === 'add-flow') {
      if (this.pending.step === 'pick-from') {
        // must click a node; stage clicks don't count
        this.statusMessage = 'Click the source node handle.';
      }
      return;
    }

    this.selectedNodeId = null;
    this.selectedFlowId = null;
  };

  private onStageContextMenu = (event: MouseEvent): void => {
    if (this.pending) {
      event.preventDefault();
      this.pending = null;
      this.statusMessage = 'Cancelled.';
    }
  };

  private onSegmentClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as SVGLineElement;
    const flowId = target.dataset['flowId'];
    const segmentIndex = Number(target.dataset['segmentIndex']);
    if (!flowId || !Number.isFinite(segmentIndex)) return;

    // shift-click on a segment = insert waypoint at click point, else just select flow
    if (event.shiftKey) {
      const pos = this.pointerToPercent(event);
      if (!pos) return;
      const prev = this.config;
      const next = insertWaypoint(prev, flowId, segmentIndex, pos);
      this.pushPatch(prev, next, `add waypoint to ${flowId}`);
      return;
    }
    this.selectedFlowId = flowId;
    this.selectedNodeId = null;
  };

  private onNodeClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement;
    const nodeId = target.dataset['nodeId'];
    if (!nodeId) return;

    if (this.pending?.kind === 'add-flow') {
      if (this.pending.step === 'pick-from') {
        this.pending = { kind: 'add-flow', step: 'pick-to', fromId: nodeId };
        this.statusMessage = 'Click the destination node.';
        return;
      }
      if (this.pending.step === 'pick-to' && this.pending.fromId !== nodeId) {
        const entity =
          window.prompt(
            'Entity for this flow (e.g. sensor.grid_power):',
            'sensor.placeholder_entity',
          ) ?? 'sensor.placeholder_entity';
        const prev = this.config;
        const { config: next, flow } = addFlow(prev, this.pending.fromId, nodeId, entity);
        this.pushPatch(prev, next, `add flow ${flow.id}`);
        this.pending = null;
        this.statusMessage = `Added flow ${flow.id}.`;
        return;
      }
      this.statusMessage = 'Destination must differ from source.';
      return;
    }

    this.selectedNodeId = nodeId;
    this.selectedFlowId = null;
  };

  private onNodeContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const nodeId = target.dataset['nodeId'];
    if (!nodeId) return;
    if (window.confirm(`Delete node ${nodeId}? This also removes any flows using it.`)) {
      this.removeNode(nodeId);
    }
  };

  private onWaypointContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement;
    const flowId = target.dataset['flowId'];
    const index = Number(target.dataset['waypointIndex']);
    if (!flowId || !Number.isFinite(index)) return;
    const prev = this.config;
    const next = deleteWaypoint(prev, flowId, index);
    this.pushPatch(prev, next, `delete waypoint ${index} of ${flowId}`);
  };

  private stopClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  // -- drag handling --

  private onHandlePointerDown = (event: PointerEvent): void => {
    if (this.previewMode) return;
    if (this.pending) return;
    if (!this.config) return;
    const el = event.currentTarget as HTMLElement;
    const waypointIndexRaw = el.dataset['waypointIndex'];
    const flowId = el.dataset['flowId'];
    const nodeId = el.dataset['nodeId'];

    let target: DragTarget | null = null;
    if (nodeId) target = { kind: 'node', id: nodeId };
    else if (flowId && waypointIndexRaw !== undefined) {
      target = { kind: 'waypoint', flowId, index: Number(waypointIndexRaw) };
    }
    if (!target) return;

    event.preventDefault();
    el.setPointerCapture(event.pointerId);
    this.dragPointerId = event.pointerId;
    this.dragTarget = target;
    this.dragStartConfig = this.config;
    this.dragShiftHeld = event.shiftKey;
  };

  private onHandlePointerMove = (event: PointerEvent): void => {
    if (this.dragPointerId !== event.pointerId || !this.dragTarget || !this.config) return;
    const pos = this.pointerToPercent(event);
    if (!pos) return;
    this.dragShiftHeld = event.shiftKey;
    const snapped = this.dragShiftHeld
      ? { x: clampPercent(snapToGrid(pos.x)), y: clampPercent(snapToGrid(pos.y)) }
      : pos;

    // live preview — update this.config directly, no patch pushed
    const target = this.dragTarget;
    if (target.kind === 'node') {
      this.config = moveNode(this.config, target.id, snapped);
    } else {
      this.config = moveWaypoint(this.config, target.flowId, target.index, snapped);
    }
  };

  private onHandlePointerUp = (event: PointerEvent): void => {
    if (this.dragPointerId !== event.pointerId) return;
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);

    const startConfig = this.dragStartConfig;
    const endConfig = this.config;
    const target = this.dragTarget;
    this.dragPointerId = null;
    this.dragTarget = null;
    this.dragStartConfig = null;

    if (!startConfig || !endConfig || !target) return;
    if (startConfig === endConfig) return;

    const description =
      target.kind === 'node'
        ? `move node ${target.id}`
        : `move waypoint ${target.index} of ${target.flowId}`;
    this.pushPatch(startConfig, endConfig, description);
  };

  // -- inspector edits --

  private onNodeLabelChange(nodeId: string, event: Event): void {
    if (!this.config) return;
    const value = (event.target as HTMLInputElement).value;
    const prev = this.config;
    const next = {
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, label: value || undefined } : n)),
    };
    this.pushPatch(prev, next, `rename ${nodeId}`);
  }

  private onNodeEntityChange(nodeId: string, event: Event): void {
    if (!this.config) return;
    const value = (event.target as HTMLInputElement).value;
    const prev = this.config;
    const next = {
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === nodeId ? { ...n, entity: value ? value : undefined } : n,
      ),
    };
    this.pushPatch(prev, next, `edit entity of ${nodeId}`);
  }

  private removeNode(nodeId: string): void {
    if (!this.config) return;
    const prev = this.config;
    const next = deleteNode(prev, nodeId);
    this.selectedNodeId = null;
    this.pushPatch(prev, next, `delete node ${nodeId}`);
  }

  private removeFlow(flowId: string): void {
    if (!this.config) return;
    const prev = this.config;
    const next = deleteFlow(prev, flowId);
    this.selectedFlowId = null;
    this.pushPatch(prev, next, `delete flow ${flowId}`);
  }

  // -- keyboard --

  private onKeyDown = (event: KeyboardEvent): void => {
    const mod = event.metaKey || event.ctrlKey;
    if (!mod) return;
    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) {
      event.preventDefault();
      this.undoStack.undo();
    } else if ((key === 'z' && event.shiftKey) || key === 'y') {
      event.preventDefault();
      this.undoStack.redo();
    }
  };

  // -- utilities --

  private pointerToPercent(event: { clientX: number; clientY: number }): NodePosition | null {
    const stage = this.stageRef.value;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const x = clampPercent(((event.clientX - rect.left) / rect.width) * 100);
    const y = clampPercent(((event.clientY - rect.top) / rect.height) * 100);
    return { x, y };
  }

  private pushPatch(prev: FlowmeConfig, next: FlowmeConfig, description: string): void {
    try {
      const validated = validateConfig(next);
      this.errorMessage = '';
      this.undoStack.push({ prev, next: validated, description });
      this.commitToHa(validated);
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : String(err);
      this.config = prev;
    }
  }

  private applyConfig(config: FlowmeConfig, commitToHa: boolean): void {
    this.config = config;
    if (commitToHa) this.commitToHa(config);
    else this.commitToHa(config); // undo/redo should also notify HA so the card re-renders
  }

  private commitToHa(config: FlowmeConfig): void {
    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private refreshUndoState(): void {
    this.canUndo = this.undoStack.canUndo();
    this.canRedo = this.undoStack.canRedo();
    this.undoLabel = this.undoStack.topUndoDescription() ?? '';
    this.redoLabel = this.undoStack.topRedoDescription() ?? '';
  }

  static override styles = css`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .wrap {
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    flowme-editor-toolbar {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .status {
      font-size: 12px;
      padding: 6px 10px;
      margin: 0 12px;
      background: rgba(74, 222, 128, 0.12);
      border-radius: 6px;
    }
    .stage {
      position: relative;
      width: calc(100% - 24px);
      margin: 0 12px;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      background: var(--ha-card-background, #111);
      touch-action: none;
    }
    .stage.mode-add-node {
      cursor: copy;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .connectors .segment {
      stroke: rgba(255, 255, 255, 0.55);
      stroke-width: 0.6;
      stroke-dasharray: 1.5 1.5;
      vector-effect: non-scaling-stroke;
      pointer-events: stroke;
      cursor: crosshair;
    }
    .connectors .segment.selected {
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1;
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
    .handle.selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 6px var(--primary-color, #03a9f4);
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
    .waypoint {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(0, 0, 0, 0.6);
      cursor: grab;
      touch-action: none;
    }
    .waypoint:active {
      cursor: grabbing;
    }
    .inspector {
      margin: 0 12px 12px;
      padding: 10px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
    }
    .inspector h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }
    .inspector label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .inspector input {
      font: inherit;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .inspector .row {
      font-size: 12px;
      opacity: 0.85;
    }
    .inspector code {
      font-family: var(--code-font-family, ui-monospace, monospace);
    }
    button.danger {
      align-self: flex-start;
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--error-color, #ef4444);
      color: #fff;
      border: none;
      cursor: pointer;
    }
    .hint {
      opacity: 0.7;
      font-size: 13px;
      margin: 12px;
    }
    .error {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.08);
      padding: 8px 10px;
      margin: 0 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: pre-wrap;
    }
  `;
}
