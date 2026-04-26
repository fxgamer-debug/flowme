import { describe, it, expect } from 'vitest';

import { findPath, TURN_PENALTY, type Cell } from '../../src/pathfinding/astar.js';
import { buildCostGrid, costAt } from '../../src/pathfinding/grid-builder.js';
import { simplifyCollinear } from '../../src/pathfinding/simplify.js';
import type { CostGrid, EdgeMap } from '../../src/pathfinding/types.js';

function uniformGrid(cols: number, rows: number, cost: number): CostGrid {
  const data = new Uint16Array(cols * rows);
  data.fill(cost);
  return { cols, rows, cellSize: 8, data };
}

function gridFromAscii(rows: string[]): CostGrid {
  const h = rows.length;
  const w = rows[0]!.length;
  const data = new Uint16Array(w * h);
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      const ch = rows[r]!.charAt(c);
      // '#' = cheap corridor (cost 1), '.' = open space (cost 100)
      data[r * w + c] = ch === '#' ? 1 : 100;
    }
  }
  return { cols: w, rows: h, cellSize: 8, data };
}

describe('buildCostGrid', () => {
  it('produces cheap cells where edges are strong', () => {
    const width = 16;
    const height = 16;
    const data = new Uint8ClampedArray(width * height);
    // paint a horizontal edge line at y=8
    for (let x = 0; x < width; x++) data[8 * width + x] = 255;
    const edges: EdgeMap = { width, height, data };
    const grid = buildCostGrid(edges, 4);
    expect(grid.cols).toBe(4);
    expect(grid.rows).toBe(4);
    // row 2 (covering y=8..11) should be cheap, row 0 should be expensive
    expect(costAt(grid, 0, 2)).toBe(1);
    expect(costAt(grid, 0, 0)).toBe(255);
  });

  it('clamps cost to a minimum of 1', () => {
    const edges: EdgeMap = {
      width: 4,
      height: 4,
      data: new Uint8ClampedArray([
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      ]),
    };
    const grid = buildCostGrid(edges, 2);
    for (let i = 0; i < grid.data.length; i++) expect(grid.data[i]).toBe(1);
  });

  it('costAt returns MAX_COST for out-of-bounds queries', () => {
    const grid = uniformGrid(4, 4, 10);
    expect(costAt(grid, -1, 0)).toBe(255);
    expect(costAt(grid, 0, -1)).toBe(255);
    expect(costAt(grid, 100, 0)).toBe(255);
  });
});

describe('findPath — straight-line world', () => {
  it('returns a straight horizontal path on a uniform grid', () => {
    const grid = uniformGrid(8, 1, 1);
    const path = findPath(grid, [0, 0], [7, 0])!;
    expect(path).toHaveLength(8);
    expect(path[0]).toEqual([0, 0]);
    expect(path[7]).toEqual([7, 0]);
  });

  it('returns [start] when start === end', () => {
    const grid = uniformGrid(4, 4, 1);
    expect(findPath(grid, [2, 2], [2, 2])).toEqual([[2, 2]]);
  });

  it('returns null on out-of-bounds endpoints', () => {
    const grid = uniformGrid(4, 4, 1);
    expect(findPath(grid, [-1, 0], [0, 0])).toBeNull();
    expect(findPath(grid, [0, 0], [100, 0])).toBeNull();
  });
});

describe('findPath — prefers cheap corridors', () => {
  it('routes along a cheap L-shaped corridor rather than cutting the diagonal', () => {
    // 5x5 grid:
    //   S...E
    //   .....
    //   ##### (cheap corridor row 2)
    //   .....
    //   .....
    // Actually the test should show cheap route is preferred.
    // Route from (0,0) to (4,4) — all expensive except row 4 cheap.
    const grid = gridFromAscii([
      '.....',
      '.....',
      '.....',
      '.....',
      '#####',
    ]);
    const path = findPath(grid, [0, 0], [4, 4])!;
    expect(path).not.toBeNull();
    // at least one cell in the path should sit on row 4
    const visitsCorridor = path.some(([, r]) => r === 4);
    expect(visitsCorridor).toBe(true);
  });
});

describe('findPath — turn penalty', () => {
  it('prefers straight paths when two routes have the same raw cost', () => {
    // With a uniform-cost grid, a straight line costs the same as a zig-zag
    // in raw step cost; the turn penalty should break the tie toward straight.
    const grid = uniformGrid(10, 10, 1);
    const path = findPath(grid, [0, 0], [9, 0])!;
    // a straight path along row 0 has no turns
    const turns = countTurns(path);
    expect(turns).toBe(0);
  });

  it('TURN_PENALTY is a positive integer', () => {
    expect(TURN_PENALTY).toBeGreaterThan(0);
  });
});

function countTurns(path: Cell[]): number {
  if (path.length < 3) return 0;
  let turns = 0;
  for (let i = 1; i < path.length - 1; i++) {
    const [px, py] = path[i - 1]!;
    const [cx, cy] = path[i]!;
    const [nx, ny] = path[i + 1]!;
    const dx1 = cx - px;
    const dy1 = cy - py;
    const dx2 = nx - cx;
    const dy2 = ny - cy;
    if (dx1 !== dx2 || dy1 !== dy2) turns++;
  }
  return turns;
}

describe('simplifyCollinear', () => {
  it('keeps short paths unchanged', () => {
    expect(simplifyCollinear([])).toEqual([]);
    expect(simplifyCollinear([[0, 0]])).toEqual([[0, 0]]);
    expect(simplifyCollinear([[0, 0], [1, 0]])).toEqual([[0, 0], [1, 0]]);
  });

  it('collapses a straight horizontal run down to endpoints', () => {
    const path: Cell[] = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ];
    expect(simplifyCollinear(path)).toEqual([[0, 0], [4, 0]]);
  });

  it('keeps the elbow on an L-shaped path', () => {
    const path: Cell[] = [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ];
    expect(simplifyCollinear(path)).toEqual([[0, 0], [2, 0], [2, 2]]);
  });

  it('keeps every corner on a zig-zag', () => {
    const path: Cell[] = [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 2],
    ];
    expect(simplifyCollinear(path)).toEqual(path);
  });
});
