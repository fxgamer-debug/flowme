import { LitElement, css, html, type TemplateResult } from 'lit';

import { t } from '../i18n.js';
import { customElement, property } from 'lit/decorators.js';

export type ToolbarAction =
  | 'add-node'
  | 'add-flow'
  | 'add-overlay'
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
      <button @click=${() => this.fire('add-node')} title=${t('editor.standaloneToolbar.addNodeTitle')}>${t('editor.toolbar.addNode')}</button>
      <button @click=${() => this.fire('add-flow')} title=${t('editor.standaloneToolbar.addFlowTitle')}>${t('editor.toolbar.addFlow')}</button>
      <button @click=${() => this.fire('add-overlay')} title=${t('editor.standaloneToolbar.addOverlayTitle')}>${t('editor.toolbar.addOverlay')}</button>
      <button
        @click=${() => this.fire('suggest-path')}
        ?disabled=${this.suggestPathDisabled}
        title=${this.suggestPathDisabled
          ? t('editor.standaloneToolbar.suggestDisabled')
          : t('editor.standaloneToolbar.suggestEnabled')}
      >
        ${t('editor.toolbar.suggestPath')}
      </button>
      <button
        @click=${() => this.fire('undo')}
        ?disabled=${!this.canUndo}
        title=${this.undoLabel ? t('editor.standaloneToolbar.undoTitleWithDesc', this.undoLabel) : t('editor.standaloneToolbar.undoTitlePlain')}
      >
        ↶ ${t('editor.toolbar.undo')}
      </button>
      <button
        @click=${() => this.fire('redo')}
        ?disabled=${!this.canRedo}
        title=${this.redoLabel ? t('editor.standaloneToolbar.redoTitleWithDesc', this.redoLabel) : t('editor.standaloneToolbar.redoTitlePlain')}
      >
        ↷ ${t('editor.toolbar.redo')}
      </button>
      <button
        class=${this.previewMode ? 'active' : ''}
        @click=${() => this.fire('toggle-preview')}
        title=${t('editor.standaloneToolbar.togglePreviewTitle')}
      >
        ${this.previewMode ? t('editor.standaloneToolbar.editing') : t('editor.standaloneToolbar.preview')}
      </button>
      <span class="spacer"></span>
      <span class="hint">${t('editor.standaloneToolbar.keyboardHint')}</span>
      <button @click=${() => this.fire('save')} title=${t('editor.standaloneToolbar.saveTitle')}>${t('editor.toolbar.save')}</button>
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
