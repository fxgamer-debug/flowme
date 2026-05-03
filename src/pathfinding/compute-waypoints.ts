import { findPath, type Cell } from './astar.js';
import { buildCostGrid, DEFAULT_CELL_SIZE } from './grid-builder.js';
import { gaussianBlur3x3, greyscale, sobelMagnitude } from './sobel.js';
import { simplifyCollinear } from './simplify.js';
import type { CostGrid, Point } from './types.js';

/**
 * Full CPU path: downscaled RGBA → edge map → cost grid → A* → waypoints in %.
 * Used by the pathfinding web worker and available for tests.
 */
export function computeWaypointsFromRgba(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
  from: Point,
  to: Point,
  cellSize: number = DEFAULT_CELL_SIZE,
): { waypoints: Point[]; edgesUsable: boolean } {
  const grey = greyscale(rgba, width, height);
  const blurred = gaussianBlur3x3(grey, width, height);
  const edgeMap = sobelMagnitude(blurred, width, height);
  const grid = buildCostGrid(edgeMap, cellSize);
  return waypointsForGrid(grid, from, to);
}

export function waypointsForGrid(grid: CostGrid, from: Point, to: Point): { waypoints: Point[]; edgesUsable: boolean } {
  const start = pointToCell(from, grid);
  const end = pointToCell(to, grid);
  const rawPath = findPath(grid, start, end);
  if (!rawPath || rawPath.length < 2) {
    return { waypoints: [], edgesUsable: true };
  }
  const simplified = simplifyCollinear(rawPath);
  const interior = simplified.slice(1, -1);
  const waypoints = interior.map((cell) => cellToPoint(cell, grid));
  return { waypoints, edgesUsable: true };
}

function pointToCell(point: Point, grid: CostGrid): Cell {
  const col = clampInt(Math.floor((point.x / 100) * grid.cols), 0, grid.cols - 1);
  const row = clampInt(Math.floor((point.y / 100) * grid.rows), 0, grid.rows - 1);
  return [col, row];
}

function cellToPoint(cell: Cell, grid: CostGrid): Point {
  return {
    x: ((cell[0] + 0.5) / grid.cols) * 100,
    y: ((cell[1] + 0.5) / grid.rows) * 100,
  };
}

function clampInt(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
