import type { Cell } from './astar.js';

/**
 * Remove every cell that sits on a straight line between its neighbours.
 * A raw A* output enumerates every step; waypoints should only mark
 * direction changes.
 */
export function simplifyCollinear(path: Cell[]): Cell[] {
  if (path.length <= 2) return [...path];
  const result: Cell[] = [path[0]!];
  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1]!;
    const curr = path[i]!;
    const next = path[i + 1]!;
    const dx1 = curr[0] - prev[0];
    const dy1 = curr[1] - prev[1];
    const dx2 = next[0] - curr[0];
    const dy2 = next[1] - curr[1];
    // Same direction (cross product = 0 and same sign) → skip curr
    if (dx1 * dy2 - dy1 * dx2 === 0 && Math.sign(dx1) === Math.sign(dx2) && Math.sign(dy1) === Math.sign(dy2)) {
      continue;
    }
    result.push(curr);
  }
  result.push(path[path.length - 1]!);
  return result;
}
