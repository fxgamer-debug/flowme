/**
 * FlowMe custom overlay — embeds any HA card at a fixed canvas position.
 *
 * Design rationale: FlowMe owns flow lines, nodes and backgrounds.
 * For sensors, cameras, switches and other UI elements, FlowMe
 * delegates to the existing HA card ecosystem rather than
 * reimplementing functionality that community cards already provide.
 *
 * Usage: set type: custom and provide any valid HA card config
 * in the card: block. Examples:
 *
 * Camera snapshot (tap for live):
 *   card:
 *     type: picture-entity
 *     entity: camera.front_door
 *     show_name: false
 *
 * Switch toggle:
 *   card:
 *     type: tile
 *     entity: switch.porch_light
 *
 * Sensor value:
 *   card:
 *     type: custom:mushroom-sensor-card
 *     entity: sensor.temperature
 */

import { html, nothing, type TemplateResult } from 'lit';

import type { HomeAssistant, OverlayConfig } from '../types.js';
import { dlog } from '../debug-log.js';

/** Optional handlers for interactive overlay hosts (keyboard, future hooks). */
export interface OverlayHostOptions {
  onOverlayKeydown?: (e: KeyboardEvent, overlay: OverlayConfig) => void;
}

/** Build the inline style that positions and sizes the overlay box. */
export function overlayBoxStyle(overlay: OverlayConfig): string {
  const w = overlay.size?.width ?? 20;
  const h = overlay.size?.height ?? 15;
  return `left: ${overlay.position.x}%; top: ${overlay.position.y}%; width: ${w}%; height: ${h}%;`;
}

/**
 * Render a custom overlay at its configured canvas position. The overlay
 * wraps `<flowme-custom-overlay>` which calls HA's `createCardElement()`
 * to instantiate any installed Lovelace card.
 *
 * Position anchors at the **top-left** corner so x/y map intuitively to
 * what the user sees when placing the overlay on a background photo.
 *
 * `visible: false` hides the wrapper entirely (display:none).
 * `opacity` applies a CSS opacity to the wrapper.
 */
export function renderOverlayHost(
  overlay: OverlayConfig,
  hass: HomeAssistant | undefined,
  options?: OverlayHostOptions,
): TemplateResult {
  dlog(
    'renderOverlayHost →',
    'id=', overlay.id,
    'position=', overlay.position,
    'size=', overlay.size,
    'visible=', overlay.visible ?? true,
    'opacity=', overlay.opacity ?? 1,
  );

  const visible = overlay.visible !== false;
  const opacity = overlay.opacity ?? 1;
  const extraStyle = [
    !visible ? 'display:none;' : '',
    opacity !== 1 ? `opacity:${opacity};` : '',
  ].join('');

  if (overlay._migration_warning) {
    return html`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${overlay.id}
        style=${overlayBoxStyle(overlay) + extraStyle}
        tabindex="-1"
        title=${overlay._migration_warning}
      >
        <div class="migration-warning-inner">
          ⚠ ${overlay._migration_warning}
        </div>
      </div>
    `;
  }

  return html`
    <div
      class="overlay overlay-custom overlay-interactive overlay-wrapper"
      data-overlay-id=${overlay.id}
      style=${overlayBoxStyle(overlay) + extraStyle}
      tabindex=${visible ? '0' : '-1'}
      role="button"
      @keydown=${(e: KeyboardEvent) => options?.onOverlayKeydown?.(e, overlay)}
    >
      <flowme-custom-overlay
        class="overlay-interactive"
        .hass=${hass}
        .card=${overlay.card}
      ></flowme-custom-overlay>
    </div>
    ${nothing}
  `;
}
