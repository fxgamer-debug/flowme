import { describe, it, expect } from 'vitest';
import { imagePctToStagePct, stagePctToImagePct } from '../../src/pathfinding/cover-projection.js';

describe('cover-projection', () => {
  it('round-trips center point for 16:10 stage and 4:3 image', () => {
    const sceneW = 800;
    const sceneH = 500;
    const imageW = 1920;
    const imageH = 1440;
    const s = stagePctToImagePct(50, 50, sceneW, sceneH, imageW, imageH);
    const back = imagePctToStagePct(s.x, s.y, sceneW, sceneH, imageW, imageH);
    expect(back.x).toBeCloseTo(50, 4);
    expect(back.y).toBeCloseTo(50, 4);
  });
});
