import type { CostGrid, EdgeMap } from './types.js';

export const DEFAULT_CELL_SIZE = 8;

/** Lowest cost A* will ever see — we keep it strictly positive. */
const MIN_COST = 1;
/** Highest cost — blank cells without any edges. */
const MAX_COST = 255;

/**
 * Reduce an edge map to a coarse cost grid. Each `cellSize × cellSize`
 * block of edge pixels becomes one grid cell; its cost is
 *
 *   cost = MAX_COST - max(edgeMagnitude in cell)
 *
 * so cells that sit on top of strong edges (walls, room dividers, pipes
 * drawn on the background) become cheap to traverse. A* will then prefer
 * paths that hug those features.
 */
export function buildCostGrid(edges: EdgeMap, cellSize: number = DEFAULT_CELL_SIZE): CostGrid {
  const cellW = Math.max(1, Math.floor(cellSize));
  const cols = Math.max(1, Math.ceil(edges.width / cellW));
  const rows = Math.max(1, Math.ceil(edges.height / cellW));
  const data = new Uint16Array(cols * rows);

  for (let row = 0; row < rows; row++) {
    const y0 = row * cellW;
    const y1 = Math.min(edges.height, y0 + cellW);
    for (let col = 0; col < cols; col++) {
      const x0 = col * cellW;
      const x1 = Math.min(edges.width, x0 + cellW);
      let maxEdge = 0;
      for (let y = y0; y < y1; y++) {
        const rowOffset = y * edges.width;
        for (let x = x0; x < x1; x++) {
          const v = edges.data[rowOffset + x] ?? 0;
          if (v > maxEdge) maxEdge = v;
        }
      }
      const cost = MAX_COST - maxEdge;
      data[row * cols + col] = cost < MIN_COST ? MIN_COST : cost;
    }
  }

  return { cols, rows, cellSize: cellW, data };
}

export function gridIndex(grid: CostGrid, col: number, row: number): number {
  return row * grid.cols + col;
}

export function costAt(grid: CostGrid, col: number, row: number): number {
  if (col < 0 || row < 0 || col >= grid.cols || row >= grid.rows) return MAX_COST;
  return grid.data[gridIndex(grid, col, row)] ?? MAX_COST;
}
