/**
 * Thin wrapper around Home Assistant's global `loadCardHelpers()`.
 *
 * HA exposes a card-factory utility on `window.loadCardHelpers`. The helpers
 * object has a `createCardElement(cardConfig)` method that produces a real
 * Lovelace card element. We only need this for `type: 'custom'` overlays, so
 * we lazy-load and memoise to avoid paying the cost on every render.
 */

export interface HaCardHelpers {
  createCardElement: (config: Record<string, unknown>) => HTMLElement;
  [key: string]: unknown;
}

type HelpersLoader = () => Promise<HaCardHelpers>;

interface WindowWithHelpers extends Window {
  loadCardHelpers?: HelpersLoader;
}

let cachedHelpers: HaCardHelpers | null = null;
let pending: Promise<HaCardHelpers> | null = null;

/** Return the card-helpers object, loading it on first call. */
export async function getCardHelpers(): Promise<HaCardHelpers | null> {
  if (cachedHelpers) return cachedHelpers;
  if (pending) return pending;

  const w = window as WindowWithHelpers;
  const loader = w.loadCardHelpers;
  if (typeof loader !== 'function') return null;

  pending = loader()
    .then((h) => {
      cachedHelpers = h;
      pending = null;
      return h;
    })
    .catch((err) => {
      pending = null;
      throw err;
    });
  return pending;
}

/**
 * Build a Lovelace card element from a user-supplied card config.
 * Returns null when HA helpers are not available (e.g. in tests or storybook).
 * The caller is responsible for attaching the returned element to the DOM and
 * updating its `hass` property.
 */
export async function createOverlayCardElement(
  config: Record<string, unknown>,
): Promise<HTMLElement | null> {
  const helpers = await getCardHelpers();
  if (!helpers) return null;
  return helpers.createCardElement(config);
}
