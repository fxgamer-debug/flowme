import { html, nothing, type TemplateResult } from 'lit';

import type { HomeAssistant, OverlayConfig, TapActionKind } from '../types.js';
import { parseSensorValue } from '../utils.js';

/**
 * Default tap action for each overlay type when the user hasn't set one.
 */
function defaultTapAction(overlay: OverlayConfig): TapActionKind {
  if (overlay.tap_action?.action) return overlay.tap_action.action;
  switch (overlay.type) {
    case 'switch':
      return 'toggle';
    case 'button':
      return overlay.entity ? 'toggle' : 'none';
    case 'sensor':
    case 'camera':
      return 'more-info';
    case 'custom':
    default:
      return 'none';
  }
}

/** Fire HA's more-info event so the default HA dialog opens. */
function fireMoreInfo(target: HTMLElement, entityId: string): void {
  const ev = new CustomEvent('hass-more-info', {
    detail: { entityId },
    bubbles: true,
    composed: true,
  });
  target.dispatchEvent(ev);
}

/** Call `homeassistant.toggle` for the given entity. */
function toggleEntity(hass: HomeAssistant | undefined, entityId: string): void {
  if (!hass?.callService) return;
  void hass.callService('homeassistant', 'toggle', { entity_id: entityId });
}

function handleOverlayTap(
  overlay: OverlayConfig,
  hass: HomeAssistant | undefined,
  ev: Event,
): void {
  const action = defaultTapAction(overlay);
  if (action === 'none') return;
  const entity = overlay.entity;
  if (!entity) return;
  if (action === 'toggle') {
    toggleEntity(hass, entity);
  } else if (action === 'more-info') {
    fireMoreInfo(ev.currentTarget as HTMLElement, entity);
  }
}

/** Build the inline style that positions and sizes the overlay box. */
export function overlayBoxStyle(overlay: OverlayConfig): string {
  const w = overlay.size?.width ?? 14;
  const h = overlay.size?.height ?? 8;
  return `left: ${overlay.position.x}%; top: ${overlay.position.y}%; width: ${w}%; height: ${h}%;`;
}

/**
 * Render a read-only representation of an overlay for the live card. The
 * caller is responsible for the positioning container; we only produce the
 * inner content so the editor can reuse the same templates.
 */
export function renderOverlayContent(
  overlay: OverlayConfig,
  hass: HomeAssistant | undefined,
): TemplateResult {
  switch (overlay.type) {
    case 'sensor':
      return renderSensor(overlay, hass);
    case 'switch':
      return renderSwitch(overlay, hass);
    case 'button':
      return renderButton(overlay, hass);
    case 'camera':
      return renderCamera(overlay, hass);
    case 'custom':
      return renderCustom(overlay, hass);
  }
}

/** Wrap content with a click-target div that dispatches the tap action. */
export function renderOverlayHost(
  overlay: OverlayConfig,
  hass: HomeAssistant | undefined,
): TemplateResult {
  const action = defaultTapAction(overlay);
  const interactive = action !== 'none';
  const onTap = (ev: Event) => handleOverlayTap(overlay, hass, ev);
  return html`
    <div
      class=${`overlay overlay-${overlay.type} ${interactive ? 'interactive' : ''}`}
      data-overlay-id=${overlay.id}
      style=${overlayBoxStyle(overlay)}
      @click=${interactive ? onTap : undefined}
      tabindex=${interactive ? '0' : '-1'}
      role=${interactive ? 'button' : 'group'}
    >
      ${renderOverlayContent(overlay, hass)}
    </div>
  `;
}

function renderSensor(overlay: OverlayConfig, hass: HomeAssistant | undefined): TemplateResult {
  const state = overlay.entity ? hass?.states[overlay.entity] : undefined;
  const unit = (state?.attributes?.['unit_of_measurement'] as string | undefined) ?? '';
  const friendly =
    overlay.label ??
    (state?.attributes?.['friendly_name'] as string | undefined) ??
    overlay.entity ??
    'sensor';
  const raw = state?.state ?? '—';
  const asNum = parseSensorValue(raw);
  const display = Number.isFinite(asNum) ? formatNumber(asNum) : raw;
  return html`
    <div class="overlay-body sensor-body">
      <div class="overlay-label">${friendly}</div>
      <div class="overlay-value">
        <span class="value-number">${display}</span>
        ${unit ? html`<span class="value-unit">${unit}</span>` : nothing}
      </div>
    </div>
  `;
}

function renderSwitch(overlay: OverlayConfig, hass: HomeAssistant | undefined): TemplateResult {
  const state = overlay.entity ? hass?.states[overlay.entity] : undefined;
  const isOn = state?.state === 'on';
  const friendly =
    overlay.label ??
    (state?.attributes?.['friendly_name'] as string | undefined) ??
    overlay.entity ??
    'switch';
  return html`
    <div class="overlay-body switch-body ${isOn ? 'is-on' : 'is-off'}">
      <div class="overlay-label">${friendly}</div>
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="switch-state">${isOn ? 'on' : 'off'}</div>
    </div>
  `;
}

function renderButton(overlay: OverlayConfig, hass: HomeAssistant | undefined): TemplateResult {
  const state = overlay.entity ? hass?.states[overlay.entity] : undefined;
  const friendly =
    overlay.label ??
    (state?.attributes?.['friendly_name'] as string | undefined) ??
    overlay.entity ??
    'button';
  return html`
    <div class="overlay-body button-body">
      <div class="overlay-label">${friendly}</div>
    </div>
  `;
}

/**
 * Camera snapshots advance every 10 seconds. We bucket the cache-bust
 * timestamp to a 10 s grid so all camera overlays on the card share the
 * same underlying image request when pointed at the same entity — this
 * stops LitElement re-rendering thrashing the browser cache once per
 * frame. When the entity is `unavailable` / `unknown` / missing or has
 * no `entity_picture`, we render a grey placeholder with an SVG camera
 * glyph so the user sees the overlay location even while cameras are
 * offline.
 */
const CAMERA_REFRESH_MS = 10_000;

function cameraBustToken(): number {
  return Math.floor(Date.now() / CAMERA_REFRESH_MS);
}

function renderCamera(overlay: OverlayConfig, hass: HomeAssistant | undefined): TemplateResult {
  const state = overlay.entity ? hass?.states[overlay.entity] : undefined;
  const picture = state?.attributes?.['entity_picture'] as string | undefined;
  const offline =
    !state || state.state === 'unavailable' || state.state === 'unknown' || !picture;
  const src = picture
    ? `${picture}${picture.includes('?') ? '&' : '?'}flowme_bust=${cameraBustToken()}`
    : '';
  return html`
    <div class="overlay-body camera-body">
      ${offline
        ? html`
            <div class="camera-placeholder" title=${overlay.entity ?? 'camera offline'}>
              <svg
                class="camera-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M9.4 5 8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-1.4-2zM12 10a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"
                />
              </svg>
            </div>
          `
        : html`<img class="camera-frame" src=${src} alt=${overlay.entity ?? ''} />`}
      ${overlay.label ? html`<div class="camera-label">${overlay.label}</div>` : nothing}
    </div>
  `;
}

function renderCustom(overlay: OverlayConfig, hass: HomeAssistant | undefined): TemplateResult {
  return html`
    <flowme-custom-overlay
      .hass=${hass}
      .cardConfig=${overlay.card_config}
    ></flowme-custom-overlay>
  `;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(0);
  if (abs >= 100) return n.toFixed(0);
  if (abs >= 10) return n.toFixed(1);
  return n.toFixed(2);
}
