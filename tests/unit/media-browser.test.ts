import { describe, it, expect } from 'vitest';

import { resolveMediaBrowseItemUrl } from '../../src/media-browser.js';

describe('resolveMediaBrowseItemUrl', () => {
  it('uses url when it is an absolute path', () => {
    expect(
      resolveMediaBrowseItemUrl({
        url: '/local/backgrounds/bg.jpg',
        media_content_id: 'media-source://media_source/www/ignored',
      }),
    ).toBe('/local/backgrounds/bg.jpg');
  });

  it('uses direct media_content_id path', () => {
    expect(resolveMediaBrowseItemUrl({ media_content_id: '/local/x.png' })).toBe('/local/x.png');
  });

  it('strips media-source prefix for any label', () => {
    expect(
      resolveMediaBrowseItemUrl({
        media_content_id: 'media-source://media_source/backgrounds/sub/folder/a.webp',
      }),
    ).toBe('/local/sub/folder/a.webp');
  });

  it('strips leading ./ after media-source', () => {
    expect(
      resolveMediaBrowseItemUrl({
        media_content_id: 'media-source://media_source/www/./foo.jpg',
      }),
    ).toBe('/local/foo.jpg');
  });

  it('falls back to thumbnail when needed', () => {
    expect(
      resolveMediaBrowseItemUrl({
        media_content_id: 'media-source://frontend/…',
        thumbnail: '/api/media_browser_proxy/some',
      }),
    ).toBe('/api/media_browser_proxy/some');
  });

  it('returns undefined when nothing matches', () => {
    expect(resolveMediaBrowseItemUrl({ media_content_id: 'invalid' })).toBeUndefined();
  });
});
