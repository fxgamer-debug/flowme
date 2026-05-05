import { describe, it, expect } from 'vitest';

import {
  FLOWME_LOCAL_PATH,
  FLOWME_MEDIA_LABEL,
  flowmeBrowseMediaContentId,
  resolveMediaBrowseItemUrl,
} from '../../src/media-browser.js';

describe('flowme media browser', () => {
  it('flowmeBrowseMediaContentId uses the FlowMe label', () => {
    expect(flowmeBrowseMediaContentId()).toBe(
      `media-source://media_source/${FLOWME_MEDIA_LABEL}/.`,
    );
  });

  it('maps media_content_id under flowme to /local/flowme/backgrounds/', () => {
    expect(
      resolveMediaBrowseItemUrl({
        media_content_id: 'media-source://media_source/flowme/bg.jpg',
      }),
    ).toBe(`${FLOWME_LOCAL_PATH}bg.jpg`);
  });

  it('maps nested paths under the flowme media dir', () => {
    expect(
      resolveMediaBrowseItemUrl({
        media_content_id: 'media-source://media_source/flowme/sub/a.webp',
      }),
    ).toBe(`${FLOWME_LOCAL_PATH}sub/a.webp`);
  });

  it('strips ./ after the flowme prefix', () => {
    expect(
      resolveMediaBrowseItemUrl({
        media_content_id: 'media-source://media_source/flowme/./x.png',
      }),
    ).toBe(`${FLOWME_LOCAL_PATH}x.png`);
  });

  it('falls back to title when media_content_id is not under flowme', () => {
    expect(
      resolveMediaBrowseItemUrl({
        title: 'fallback.jpg',
        media_content_id: 'other',
      }),
    ).toBe(`${FLOWME_LOCAL_PATH}fallback.jpg`);
  });

  it('returns undefined when nothing usable is present', () => {
    expect(resolveMediaBrowseItemUrl({ media_content_id: 'invalid' })).toBeUndefined();
  });
});
