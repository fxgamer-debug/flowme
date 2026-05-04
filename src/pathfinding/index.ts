import { buildCostGrid, DEFAULT_CELL_SIZE } from './grid-builder.js';
import { buildEdgeMap, readDownscaledPixels } from './sobel.js';
import { waypointsForGrid } from './compute-waypoints.js';
import type { CostGrid, PathRequest, PathResult } from './types.js';

/**
 * High-level auto-routing façade. Given a background image URL and two
 * percentage-space points, returns the waypoint list that A* picks along
 * the image's strongest edges.
 *
 * The cost grid for a given URL is cached for as long as the tab is open
 * (keyed by the URL string), so repeat calls from the editor are near-free.
 * A* itself re-runs every time because endpoints change.
 *
 * Heavy stages also run in a Web Worker from the card editor (`pathfinding.worker.ts`).
 */
const gridCache = new Map<string, Promise<CostGrid | null>>();

export interface SuggestPathOptions {
  cellSize?: number;
}

export async function suggestPath(
  request: PathRequest,
  options: SuggestPathOptions = {},
): Promise<PathResult> {
  const startedAt = performance.now();
  const cellSize = options.cellSize ?? DEFAULT_CELL_SIZE;
  const cacheKey = `${request.imageUrl}|${cellSize}`;
  const wasCached = gridCache.has(cacheKey);

  let grid: CostGrid | null = null;
  try {
    grid = await getGrid(cacheKey, request.imageUrl, cellSize);
  } catch {
    grid = null;
  }

  if (!grid) {
    return {
      waypoints: [],
      cached: false,
      edgesUsable: false,
      elapsedMs: performance.now() - startedAt,
    };
  }

  const { waypoints, edgesUsable } = waypointsForGrid(grid, request.from, request.to);

  return {
    waypoints,
    cached: wasCached,
    edgesUsable,
    elapsedMs: performance.now() - startedAt,
  };
}

/**
 * Load and downscale the background the same way as `buildEdgeMap`, returning raw RGBA for workers.
 */
export async function loadDownscaledRgbaForPathfinding(
  imageUrl: string,
): Promise<{ rgba: Uint8ClampedArray; width: number; height: number } | null> {
  if (!imageUrl) return null;
  try {
    const img = await loadImage(imageUrl);
    return readDownscaledPixels(img, img.naturalWidth, img.naturalHeight);
  } catch {
    return null;
  }
}

// -- internals --

function getGrid(cacheKey: string, url: string, cellSize: number): Promise<CostGrid | null> {
  const cached = gridCache.get(cacheKey);
  if (cached) return cached;
  const promise = buildGrid(url, cellSize).catch((err) => {
    // remove failed entries so callers can retry once the user fixes CORS etc.
    gridCache.delete(cacheKey);
    throw err;
  });
  gridCache.set(cacheKey, promise);
  return promise;
}

async function buildGrid(url: string, cellSize: number): Promise<CostGrid> {
  const img = await loadImage(url);
  // yield once so we never block a whole frame running Sobel synchronously
  await microYield();
  const edges = buildEdgeMap(img, img.naturalWidth, img.naturalHeight);
  await microYield();
  return buildCostGrid(edges, cellSize);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Opt into CORS so we can read pixels; same-origin images are unaffected.
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load background image: ${url}`));
    img.src = url;
  });
}

function microYield(): Promise<void> {
  return new Promise((resolve) => {
    // postMessage-based yield is ~1ms, keeps us out of a long-task bucket
    if (typeof queueMicrotask === 'function') queueMicrotask(() => setTimeout(resolve, 0));
    else setTimeout(resolve, 0);
  });
}

export type { PathResult, PathRequest } from './types.js';
