/**
 * Map percentage coordinates between a "stage" box (editor / card) and the
 * full background image when the image is shown with CSS `background-size: cover`
 * and `background-position: center`. Pathfinding runs in image pixel space; the
 * editor stores positions as % of the stage.
 */

import type { Point } from './types.js';

function clampPct(n: number): number {
  if (n < 0) return 0;
  if (n > 100) return 100;
  return n;
}

/**
 * Convert a point in **stage** % to **image** % (full bitmap, before cover crop).
 */
export function stagePctToImagePct(
  stagePctX: number,
  stagePctY: number,
  sceneW: number,
  sceneH: number,
  imageW: number,
  imageH: number,
): { x: number; y: number } {
  if (sceneW <= 0 || sceneH <= 0 || imageW <= 0 || imageH <= 0) {
    return { x: clampPct(stagePctX), y: clampPct(stagePctY) };
  }
  const scaleX = sceneW / imageW;
  const scaleY = sceneH / imageH;
  const coverScale = Math.max(scaleX, scaleY);
  const scaledW = imageW * coverScale;
  const scaledH = imageH * coverScale;
  const offsetX = (scaledW - sceneW) / 2;
  const offsetY = (scaledH - sceneH) / 2;
  const stagePx = (stagePctX / 100) * sceneW;
  const stagePy = (stagePctY / 100) * sceneH;
  const imgPx = (stagePx + offsetX) / coverScale;
  const imgPy = (stagePy + offsetY) / coverScale;
  return {
    x: clampPct((imgPx / imageW) * 100),
    y: clampPct((imgPy / imageH) * 100),
  };
}

/**
 * Inverse of {@link stagePctToImagePct}: image % → stage %.
 */
export function imagePctToStagePct(
  imagePctX: number,
  imagePctY: number,
  sceneW: number,
  sceneH: number,
  imageW: number,
  imageH: number,
): { x: number; y: number } {
  if (sceneW <= 0 || sceneH <= 0 || imageW <= 0 || imageH <= 0) {
    return { x: clampPct(imagePctX), y: clampPct(imagePctY) };
  }
  const scaleX = sceneW / imageW;
  const scaleY = sceneH / imageH;
  const coverScale = Math.max(scaleX, scaleY);
  const scaledW = imageW * coverScale;
  const scaledH = imageH * coverScale;
  const offsetX = (scaledW - sceneW) / 2;
  const offsetY = (scaledH - sceneH) / 2;
  const imgPx = (imagePctX / 100) * imageW;
  const imgPy = (imagePctY / 100) * imageH;
  const stagePx = imgPx * coverScale - offsetX;
  const stagePy = imgPy * coverScale - offsetY;
  return {
    x: clampPct((stagePx / sceneW) * 100),
    y: clampPct((stagePy / sceneH) * 100),
  };
}

export function projectPointToPathfindingSpace(p: Point, sceneW: number, sceneH: number, imageW: number, imageH: number): Point {
  const o = stagePctToImagePct(p.x, p.y, sceneW, sceneH, imageW, imageH);
  return { x: o.x, y: o.y };
}

export function projectPathfindingWaypointsToStage(waypoints: Point[], sceneW: number, sceneH: number, imageW: number, imageH: number): Point[] {
  return waypoints.map((w) => {
    const s = imagePctToStagePct(w.x, w.y, sceneW, sceneH, imageW, imageH);
    return { x: s.x, y: s.y };
  });
}
