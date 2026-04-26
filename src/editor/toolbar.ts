import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ToolbarAction =
  | 'add-node'
  | 'add-flow'
  | 'suggest-path'
  | 'undo'
  | 'redo'
  | 'toggle-preview'
  | 'save';

@customElement('flowme-editor-toolbar')
export class FlowmeEditorToolbar extends LitElement {
  @property({ type: Boolean }) canUndo = false;
  @property({ type: Boolean }) canRedo = false;
  @property({ type: Boolean }) previewMode = false;
  @property({ type: Boolean }) suggestPathDisabled = true;
  @property({ type: String }) undoLabel = '';
  @property({ type: String }) redoLabel = '';

  static override styles = css`
    :host {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 6px 8px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      background: var(--card-background-color, #fff);
      flex-wrap: wrap;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      font: inherit;
      font-size: 12px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #111);
      cursor: pointer;
      transition: background-color 120ms ease;
    }
    button:hover:not(:disabled) {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #03a9f4);
    }
    .spacer {
      flex: 1 1 auto;
    }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #666);
    }
  `;

  override render(): TemplateResult {
    return html`
      <button @click=${() => this.fire('add-node')} title="Add node">+ Node</button>
      <button @click=${() => this.fire('add-flow')} title="Add flow">+ Flow</button>
      <button
        @click=${() => this.fire('suggest-path')}
        ?disabled=${this.suggestPathDisabled}
        title="Auto-route waypoints (v0.3)"
      >
        Suggest path
      </button>
      <button
        @click=${() => this.fire('undo')}
        ?disabled=${!this.canUndo}
        title=${this.undoLabel ? `Undo: ${this.undoLabel}` : 'Undo (⌘Z)'}
      >
        ↶ Undo
      </button>
      <button
        @click=${() => this.fire('redo')}
        ?disabled=${!this.canRedo}
        title=${this.redoLabel ? `Redo: ${this.redoLabel}` : 'Redo (⌘⇧Z)'}
      >
        ↷ Redo
      </button>
      <button
        class=${this.previewMode ? 'active' : ''}
        @click=${() => this.fire('toggle-preview')}
        title="Toggle preview animations"
      >
        ${this.previewMode ? 'Editing' : 'Preview'}
      </button>
      <span class="spacer"></span>
      <span class="hint">Shift = 8% snap · right-click waypoint to delete</span>
      <button @click=${() => this.fire('save')} title="Apply to card config">Save</button>
    `;
  }

  private fire(action: ToolbarAction): void {
    this.dispatchEvent(
      new CustomEvent('toolbar-action', { detail: { action }, bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flowme-editor-toolbar': FlowmeEditorToolbar;
  }
}
