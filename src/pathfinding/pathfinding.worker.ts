import { DEFAULT_CELL_SIZE } from './grid-builder.js';
import { computeWaypointsFromRgba } from './compute-waypoints.js';
import type { Point } from './types.js';

export interface PathfindingWorkerMessage {
  rgba: ArrayBuffer;
  width: number;
  height: number;
  fromPos: Point;
  toPos: Point;
  cellSize?: number;
}

self.onmessage = (e: MessageEvent<PathfindingWorkerMessage>): void => {
  const { rgba, width, height, fromPos, toPos, cellSize } = e.data;
  const started = performance.now();
  try {
    const pixels = new Uint8ClampedArray(rgba);
    const cs = cellSize ?? DEFAULT_CELL_SIZE;
    const { waypoints, edgesUsable } = computeWaypointsFromRgba(pixels, width, height, fromPos, toPos, cs);
    self.postMessage({
      waypoints,
      edgesUsable,
      elapsedMs: performance.now() - started,
    });
  } catch (err) {
    self.postMessage({
      waypoints: [],
      edgesUsable: false,
      elapsedMs: performance.now() - started,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

export {};
