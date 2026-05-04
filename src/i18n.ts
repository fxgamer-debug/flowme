import { STRINGS } from './strings.js';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Translation = DeepPartial<typeof STRINGS>;

let activeTranslation: Translation = {};

function loadTranslation(translation: Translation): void {
  activeTranslation = translation;
}

/**
 * Load JSON translations from `/local/flowme/translations/{lang}.json` when the
 * HA UI language is not English.
 */
export function loadLanguage(lang: string | undefined): void {
  const raw = lang ?? 'en';
  const base = raw.split('-')[0]!.toLowerCase();
  if (base === 'en') {
    loadTranslation({});
    return;
  }
  const url = `/local/flowme/translations/${base}.json`;
  void fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then((data: Translation | null) => {
      if (data && typeof data === 'object') loadTranslation(data);
    })
    .catch(() => {
      loadTranslation({});
    });
}

export function t(path: string, ...args: unknown[]): string {
  const parts = path.split('.');
  let val: unknown = activeTranslation;
  for (const p of parts) {
    if (val && typeof val === 'object') {
      val = (val as Record<string, unknown>)[p];
    } else {
      val = undefined;
      break;
    }
  }
  if (val === undefined) {
    val = STRINGS;
    for (const p of parts) {
      if (val && typeof val === 'object') {
        val = (val as Record<string, unknown>)[p];
      } else {
        val = undefined;
        break;
      }
    }
  }
  if (typeof val === 'function') {
    return String((val as (...a: unknown[]) => unknown)(...args));
  }
  return String(val ?? path);
}
