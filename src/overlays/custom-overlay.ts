import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { HomeAssistant } from '../types.js';
import { t } from '../i18n.js';
import { createOverlayCardElement } from './card-helpers.js';
import { assertSafeCardConfig } from './url-scan.js';

/**
 * Mounts a user-supplied Lovelace card inside a flowme overlay slot. We treat
 * the child card as a normal HA element: feed it `hass`, let it handle its
 * own renders, and tear it down when the config changes.
 */
@customElement('flowme-custom-overlay')
export class FlowmeCustomOverlay extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) card?: Record<string, unknown>;

  @state() private errorMessage?: string;

  private childCard?: HTMLElement & { hass?: HomeAssistant };
  private lastMountedConfigJson?: string;
  private _needsRebuildOnConnect = false;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this._needsRebuildOnConnect) {
      this._needsRebuildOnConnect = false;
      this.lastMountedConfigJson = undefined;
      this.rebuildChild();
    }
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('card')) {
      this.rebuildChild();
    }
    if (this.childCard && this.hass && this.childCard.hass !== this.hass) {
      this.childCard.hass = this.hass;
    }
  }

  override disconnectedCallback(): void {
    this.disposeChild();
    this._needsRebuildOnConnect = true;
    super.disconnectedCallback();
  }

  /**
   * Simulate a primary click on the mounted HA card so keyboard activation
   * (Enter / Space on the overlay wrapper) matches a tap on the tile/card.
   */
  activatePrimaryAction(): void {
    const root =
      this.childCard ??
      (this.renderRoot.querySelector('.mount')?.firstElementChild as HTMLElement | undefined);
    if (root instanceof HTMLElement) {
      root.click();
    }
  }

  override render(): TemplateResult {
    if (this.errorMessage) {
      return html`<div class="err" title=${this.errorMessage}>!</div>`;
    }
    return html`<div class="mount"></div>`;
  }

  private rebuildChild(): void {
    const config = this.card;
    const json = config ? JSON.stringify(config) : undefined;
    if (json === this.lastMountedConfigJson) return;
    this.lastMountedConfigJson = json;
    this.disposeChild();
    if (!config) return;

    try {
      assertSafeCardConfig(config);
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : String(err);
      return;
    }
    this.errorMessage = undefined;

    void createOverlayCardElement(config)
      .then((el) => {
        if (!el) {
          this.errorMessage = t('overlays.haHelpersUnavailable');
          this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== json) return; // stale
        this.childCard = el as HTMLElement & { hass?: HomeAssistant };
        if (this.hass) this.childCard.hass = this.hass;
        const mount = this.renderRoot.querySelector('.mount');
        if (mount) {
          mount.innerHTML = '';
          mount.appendChild(this.childCard);
          if (this.hass && this.childCard.hass !== this.hass) {
            this.childCard.hass = this.hass;
          }
        }
      })
      .catch((err) => {
        this.errorMessage = err instanceof Error ? err.message : String(err);
        this.requestUpdate();
      });
  }

  private disposeChild(): void {
    if (this.childCard && this.childCard.parentElement) {
      this.childCard.parentElement.removeChild(this.childCard);
    }
    this.childCard = undefined;
  }

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    /* Ripple when the embedded card is pressed (:active applies to host). */
    :host(.overlay-interactive) {
      position: relative;
      overflow: hidden;
    }
    :host(.overlay-interactive)::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.4) 0%,
        transparent 70%
      );
      transform: scale(0);
      opacity: 0;
      transition: none;
      pointer-events: none;
      z-index: 12;
    }
    :host(.overlay-interactive:active)::after {
      transform: scale(2.5);
      opacity: 1;
      transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
    }
    @media (prefers-reduced-motion: reduce) {
      :host(.overlay-interactive)::after {
        display: none !important;
      }
    }
    .mount {
      width: 100%;
      height: 100%;
    }
    .err {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: rgba(244, 67, 54, 0.6);
      border-radius: 6px;
      font-weight: 700;
    }
  `;
}
