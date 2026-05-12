/**
 * FlowMe image browser uses a dedicated HA `media_dirs` entry so URLs map
 * deterministically to `/local/flowme-backgrounds/…` (outside the HACS-managed card folder).
 *
 * Required one-time setup:
 * - Folder on disk: `/config/www/flowme-backgrounds/`
 * - `configuration.yaml`: `media_dirs: { flowme: /config/www/flowme-backgrounds }`
 */

export const FLOWME_MEDIA_LABEL = 'flowme';

/** Public URL prefix for files under that media dir (HA serves `/config/www/` as `/local/`). */
export const FLOWME_LOCAL_PATH = '/local/flowme-backgrounds/';

/** Root identifier passed to `browse_media` for the FlowMe folder. */
export function flowmeBrowseMediaContentId(): string {
  return `media-source://media_source/${FLOWME_MEDIA_LABEL}/.`;
}

/**
 * Maps a `browse_media` child item to the URL stored in card config and used
 * for thumbnails (HA often omits `thumbnail` for these files).
 */
export function resolveMediaBrowseItemUrl(item: Record<string, unknown>): string | undefined {
  const id = typeof item.media_content_id === 'string' ? item.media_content_id : '';
  const prefix = `media-source://media_source/${FLOWME_MEDIA_LABEL}/`;
  if (id.startsWith(prefix)) {
    let rest = id.slice(prefix.length);
    if (rest.startsWith('./')) rest = rest.slice(2);
    return FLOWME_LOCAL_PATH + rest;
  }
  const title = typeof item.title === 'string' ? item.title : '';
  const trimmed = title.replace(/^\/+/, '');
  if (trimmed.length > 0) {
    return FLOWME_LOCAL_PATH + trimmed;
  }
  return undefined;
}
