import type { CostGrid } from './types.js';
import { costAt } from './grid-builder.js';

/**
 * 4-directional A* over a {@link CostGrid}. Heuristic is Manhattan distance
 * scaled by the grid's minimum observed cost to remain admissible.
 * Each change of direction adds a {@link TURN_PENALTY} to discourage zig-zag
 * paths that tie on total cost.
 */

export const TURN_PENALTY = 50;

export type Cell = readonly [col: number, row: number];

/** 0: none / 1: +x / 2: −x / 3: +y / 4: −y. Stored to spot turns cheaply. */
const DIR_NONE = 0;

interface FrontierEntry {
  col: number;
  row: number;
  f: number;
}

/**
 * Binary min-heap keyed on `f`. Small purpose-built heap to avoid the
 * garbage churn of a generic PriorityQueue<T>.
 */
class MinHeap {
  private arr: FrontierEntry[] = [];

  push(entry: FrontierEntry): void {
    this.arr.push(entry);
    this.bubbleUp(this.arr.length - 1);
  }

  pop(): FrontierEntry | undefined {
    if (this.arr.length === 0) return undefined;
    const top = this.arr[0];
    const last = this.arr.pop()!;
    if (this.arr.length > 0) {
      this.arr[0] = last;
      this.sinkDown(0);
    }
    return top;
  }

  get size(): number {
    return this.arr.length;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if ((this.arr[parent]?.f ?? 0) <= (this.arr[i]?.f ?? 0)) return;
      [this.arr[parent], this.arr[i]] = [this.arr[i]!, this.arr[parent]!];
      i = parent;
    }
  }

  private sinkDown(i: number): void {
    const n = this.arr.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;
      if (left < n && (this.arr[left]?.f ?? 0) < (this.arr[smallest]?.f ?? 0)) smallest = left;
      if (right < n && (this.arr[right]?.f ?? 0) < (this.arr[smallest]?.f ?? 0)) smallest = right;
      if (smallest === i) return;
      [this.arr[smallest], this.arr[i]] = [this.arr[i]!, this.arr[smallest]!];
      i = smallest;
    }
  }
}

export function findPath(
  grid: CostGrid,
  start: Cell,
  end: Cell,
): Cell[] | null {
  const [sCol, sRow] = start;
  const [eCol, eRow] = end;
  if (sCol < 0 || sRow < 0 || sCol >= grid.cols || sRow >= grid.rows) return null;
  if (eCol < 0 || eRow < 0 || eCol >= grid.cols || eRow >= grid.rows) return null;
  if (sCol === eCol && sRow === eRow) return [[sCol, sRow]];

  const total = grid.cols * grid.rows;
  const gScore = new Float32Array(total);
  gScore.fill(Infinity);
  const cameFromCol = new Int16Array(total);
  const cameFromRow = new Int16Array(total);
  cameFromCol.fill(-1);
  cameFromRow.fill(-1);
  const cameDir = new Uint8Array(total);
  const closed = new Uint8Array(total);

  const startIdx = sRow * grid.cols + sCol;
  gScore[startIdx] = 0;

  const open = new MinHeap();
  open.push({ col: sCol, row: sRow, f: manhattan(sCol, sRow, eCol, eRow) });

  const directions: ReadonlyArray<readonly [dx: number, dy: number, dir: number]> = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4],
  ];

  while (open.size > 0) {
    const current = open.pop()!;
    const { col, row } = current;
    const idx = row * grid.cols + col;
    if (closed[idx]) continue;
    closed[idx] = 1;
    if (col === eCol && row === eRow) {
      return reconstruct(grid, cameFromCol, cameFromRow, end);
    }

    for (const [dx, dy, dir] of directions) {
      const nc = col + dx;
      const nr = row + dy;
      if (nc < 0 || nr < 0 || nc >= grid.cols || nr >= grid.rows) continue;
      const nIdx = nr * grid.cols + nc;
      if (closed[nIdx]) continue;
      const stepCost = costAt(grid, nc, nr);
      const turnExtra = cameDir[idx] && cameDir[idx] !== dir ? TURN_PENALTY : 0;
      const tentative = (gScore[idx] ?? Infinity) + stepCost + turnExtra;
      if (tentative < (gScore[nIdx] ?? Infinity)) {
        gScore[nIdx] = tentative;
        cameFromCol[nIdx] = col;
        cameFromRow[nIdx] = row;
        cameDir[nIdx] = dir;
        const f = tentative + manhattan(nc, nr, eCol, eRow);
        open.push({ col: nc, row: nr, f });
      }
    }
  }

  return null;
}

function manhattan(aCol: number, aRow: number, bCol: number, bRow: number): number {
  // min admissible cost per step is 1 (post clamp) — heuristic stays admissible.
  return Math.abs(aCol - bCol) + Math.abs(aRow - bRow);
}

function reconstruct(
  grid: CostGrid,
  cameFromCol: Int16Array,
  cameFromRow: Int16Array,
  end: Cell,
): Cell[] {
  const path: Cell[] = [];
  let col = end[0];
  let row = end[1];
  while (col !== -1 && row !== -1) {
    path.push([col, row]);
    const idx = row * grid.cols + col;
    const nc = cameFromCol[idx] ?? -1;
    const nr = cameFromRow[idx] ?? -1;
    if (nc === col && nr === row) break;
    col = nc;
    row = nr;
    if (col < 0 || row < 0) break;
  }
  path.reverse();
  // guard against a cameFrom sentinel sneaking in as the first element
  if (path[0]?.[0] === -1) path.shift();
  return path;
}

// marker used by reconstruct when we hit the sentinel
export const START_DIR = DIR_NONE;
