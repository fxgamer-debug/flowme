/**
 * Shared types for the auto-routing pipeline.
 *
 * Pipeline stages (spec §"Auto-route pathfinding"):
 *   background image → downscaled edge map (Sobel) → coarse cost grid
 *     → A* over the grid → collinear simplification → waypoints in %
 */

export interface Point {
  /** 0..100 percentage of container width. */
  x: number;
  /** 0..100 percentage of container height. */
  y: number;
}

export interface EdgeMap {
  /** Pixel width of the (possibly downscaled) edge map. */
  width: number;
  /** Pixel height of the edge map. */
  height: number;
  /** Per-pixel edge magnitudes, 0..255, row-major. */
  data: Uint8ClampedArray;
}

export interface CostGrid {
  /** Column count of the coarse cost grid. */
  cols: number;
  /** Row count of the coarse cost grid. */
  rows: number;
  /** Side length of one cell, in edge-map pixels. */
  cellSize: number;
  /**
   * Per-cell traversal cost. Cells that cover strong edges get LOW cost,
   * so A* naturally follows visible architectural features.
   * Values are in `[1, 255]` (never zero — zero would collapse the heuristic).
   */
  data: Uint16Array;
}

export interface PathRequest {
  /** Background image URL to analyse. */
  imageUrl: string;
  /** Start point in percentages. */
  from: Point;
  /** End point in percentages. */
  to: Point;
}

export interface PathResult {
  /** Suggested waypoints in percentages, excluding endpoints. */
  waypoints: Point[];
  /** Whether the result came from cache. */
  cached: boolean;
  /** Whether the edge map could be built (false = fell back to a straight line). */
  edgesUsable: boolean;
  /** Wall time spent in ms. */
  elapsedMs: number;
}
