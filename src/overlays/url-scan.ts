/**
 * Security helper for custom overlay card configs.
 *
 * A user-supplied `card_config` is passed through to HA's `createCardElement`
 * where it can eventually find its way into `src`, `href`, `background-image`
 * and similar sinks. To avoid a javascript:-flavoured supply-chain attack we
 * walk the whole object graph and reject any string that looks like a URL
 * with a dangerous scheme before the config reaches the DOM.
 *
 * The list of disallowed schemes mirrors `validate-config.ts` for consistency.
 */

import { t } from '../i18n.js';

const DISALLOWED_SCHEMES = ['javascript:', 'vbscript:', 'data:', 'file:'];

/** One offending path + value found during a scan. */
export interface UnsafeUrlMatch {
  path: string;
  value: string;
  scheme: string;
}

/** Recursively inspect any value for strings that carry disallowed schemes. */
export function findUnsafeUrls(root: unknown, rootPath = 'card_config'): UnsafeUrlMatch[] {
  const matches: UnsafeUrlMatch[] = [];
  const seen = new WeakSet<object>();

  const walk = (value: unknown, path: string): void => {
    if (value === null || value === undefined) return;
    if (typeof value === 'string') {
      const trimmed = value.trim().toLowerCase();
      for (const scheme of DISALLOWED_SCHEMES) {
        if (trimmed.startsWith(scheme)) {
          matches.push({ path, value, scheme });
          return;
        }
      }
      return;
    }
    if (typeof value !== 'object') return;
    if (seen.has(value as object)) return;
    seen.add(value as object);

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) walk(value[i], `${path}[${i}]`);
      return;
    }
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      walk(v, `${path}.${k}`);
    }
  };

  walk(root, rootPath);
  return matches;
}

export function assertSafeCardConfig(config: unknown, rootPath = 'card_config'): void {
  const unsafe = findUnsafeUrls(config, rootPath);
  if (unsafe.length === 0) return;
  const first = unsafe[0]!;
  throw new Error(t('security.unsafeUrlInCard', first.scheme, first.path));
}
