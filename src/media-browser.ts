/**
 * Resolve a browser-usable URL from a Home Assistant `browse_media` child item.
 * Prefers explicit paths/URLs from HA; falls back to stripping `media-source://media_source/{label}/`.
 */

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}

function looksLikeDirectUrl(s: string): boolean {
  return s.startsWith('/') || s.startsWith('http://') || s.startsWith('https://');
}

/**
 * Returns a URL suitable for saving in card config and for loading the image,
 * or `undefined` if the item cannot be resolved.
 */
export function resolveMediaBrowseItemUrl(item: Record<string, unknown>): string | undefined {
  if (isNonEmptyString(item.url) && looksLikeDirectUrl(item.url)) {
    return item.url;
  }
  if (isNonEmptyString(item.media_content_id) && looksLikeDirectUrl(item.media_content_id)) {
    return item.media_content_id;
  }
  const mc = item.media_content_id;
  if (isNonEmptyString(mc)) {
    const match = mc.match(/^media-source:\/\/media_source\/[^/]+\/(.+)$/);
    if (match?.[1]) {
      let rest = match[1];
      if (rest.startsWith('./')) rest = rest.slice(2);
      return `/local/${rest}`;
    }
  }
  if (isNonEmptyString(item.thumbnail) && looksLikeDirectUrl(item.thumbnail)) {
    return item.thumbnail;
  }
  return undefined;
}
