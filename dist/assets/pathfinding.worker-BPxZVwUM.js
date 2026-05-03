function d(t, n = 8) {
  const o = Math.max(1, Math.floor(n)), c = Math.max(1, Math.ceil(t.width / o)), r = Math.max(1, Math.ceil(t.height / o)), s = new Uint16Array(c * r);
  for (let e = 0; e < r; e++) {
    const l = e * o, a = Math.min(t.height, l + o);
    for (let i = 0; i < c; i++) {
      const f = i * o, u = Math.min(t.width, f + o);
      let h = 0;
      for (let p = l; p < a; p++) {
        const E = p * t.width;
        for (let y = f; y < u; y++) {
          const m = t.data[E + y] ?? 0;
          m > h && (h = m);
        }
      }
      const x = 255 - h;
      s[e * c + i] = x < 1 ? 1 : x;
    }
  }
  return { cols: c, rows: r, cellSize: o, data: s };
}
function P(t, n, o) {
  return o * t.cols + n;
}
function R(t, n, o) {
  return n < 0 || o < 0 || n >= t.cols || o >= t.rows ? 255 : t.data[P(t, n, o)] ?? 255;
}
const N = 50;
class k {
  constructor() {
    this.arr = [];
  }
  push(n) {
    this.arr.push(n), this.bubbleUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return;
    const n = this.arr[0], o = this.arr.pop();
    return this.arr.length > 0 && (this.arr[0] = o, this.sinkDown(0)), n;
  }
  get size() {
    return this.arr.length;
  }
  bubbleUp(n) {
    for (; n > 0; ) {
      const o = n - 1 >> 1;
      if ((this.arr[o]?.f ?? 0) <= (this.arr[n]?.f ?? 0)) return;
      [this.arr[o], this.arr[n]] = [this.arr[n], this.arr[o]], n = o;
    }
  }
  sinkDown(n) {
    const o = this.arr.length;
    for (; ; ) {
      const c = 2 * n + 1, r = 2 * n + 2;
      let s = n;
      if (c < o && (this.arr[c]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = c), r < o && (this.arr[r]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = r), s === n) return;
      [this.arr[s], this.arr[n]] = [this.arr[n], this.arr[s]], n = s;
    }
  }
}
function z(t, n, o) {
  const [c, r] = n, [s, e] = o;
  if (c < 0 || r < 0 || c >= t.cols || r >= t.rows || s < 0 || e < 0 || s >= t.cols || e >= t.rows) return null;
  if (c === s && r === e) return [[c, r]];
  const l = t.cols * t.rows, a = new Float32Array(l);
  a.fill(1 / 0);
  const i = new Int16Array(l), f = new Int16Array(l);
  i.fill(-1), f.fill(-1);
  const u = new Uint8Array(l), h = new Uint8Array(l), x = r * t.cols + c;
  a[x] = 0;
  const p = new k();
  p.push({ col: c, row: r, f: I(c, r, s, e) });
  const E = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; p.size > 0; ) {
    const y = p.pop(), { col: m, row: M } = y, w = M * t.cols + m;
    if (!h[w]) {
      if (h[w] = 1, m === s && M === e)
        return X(t, i, f, o);
      for (const [L, g, _] of E) {
        const C = m + L, b = M + g;
        if (C < 0 || b < 0 || C >= t.cols || b >= t.rows) continue;
        const A = b * t.cols + C;
        if (h[A]) continue;
        const D = R(t, C, b), F = u[w] && u[w] !== _ ? N : 0, U = (a[w] ?? 1 / 0) + D + F;
        if (U < (a[A] ?? 1 / 0)) {
          a[A] = U, i[A] = m, f[A] = M, u[A] = _;
          const O = U + I(C, b, s, e);
          p.push({ col: C, row: b, f: O });
        }
      }
    }
  }
  return null;
}
function I(t, n, o, c) {
  return Math.abs(t - o) + Math.abs(n - c);
}
function X(t, n, o, c) {
  const r = [];
  let s = c[0], e = c[1];
  for (; s !== -1 && e !== -1; ) {
    r.push([s, e]);
    const l = e * t.cols + s, a = n[l] ?? -1, i = o[l] ?? -1;
    if (a === s && i === e || (s = a, e = i, s < 0 || e < 0)) break;
  }
  return r.reverse(), r[0]?.[0] === -1 && r.shift(), r;
}
const Z = 30;
function v(t, n, o) {
  const c = new Uint8ClampedArray(n * o);
  for (let r = 0, s = 0; r < t.length; r += 4, s++) {
    const e = t[r] ?? 0, l = t[r + 1] ?? 0, a = t[r + 2] ?? 0;
    c[s] = 0.2126 * e + 0.7152 * l + 0.0722 * a;
  }
  return c;
}
function G(t, n, o) {
  const c = new Uint8ClampedArray(t.length);
  for (let s = 0; s < o; s++) {
    const e = s * n;
    for (let l = 0; l < n; l++) {
      const a = t[e + Math.max(0, l - 1)] ?? 0, i = t[e + l] ?? 0, f = t[e + Math.min(n - 1, l + 1)] ?? 0;
      c[e + l] = a + 2 * i + f >> 2;
    }
  }
  const r = new Uint8ClampedArray(t.length);
  for (let s = 0; s < o; s++) {
    const e = s * n, l = Math.max(0, s - 1) * n, a = Math.min(o - 1, s + 1) * n;
    for (let i = 0; i < n; i++) {
      const f = c[l + i] ?? 0, u = c[e + i] ?? 0, h = c[a + i] ?? 0;
      r[e + i] = f + 2 * u + h >> 2;
    }
  }
  return r;
}
function H(t, n, o) {
  const c = new Uint8ClampedArray(n * o);
  for (let r = 1; r < o - 1; r++) {
    const s = (r - 1) * n, e = r * n, l = (r + 1) * n;
    for (let a = 1; a < n - 1; a++) {
      const i = t[s + (a - 1)] ?? 0, f = t[s + a] ?? 0, u = t[s + (a + 1)] ?? 0, h = t[e + (a - 1)] ?? 0, x = t[e + (a + 1)] ?? 0, p = t[l + (a - 1)] ?? 0, E = t[l + a] ?? 0, y = t[l + (a + 1)] ?? 0, m = -i - 2 * h - p + u + 2 * x + y, M = -i - 2 * f - u + p + 2 * E + y;
      let w = Math.sqrt(m * m + M * M);
      w < Z && (w = 0), w > 255 && (w = 255), c[e + a] = w;
    }
  }
  return { width: n, height: o, data: c };
}
function W(t) {
  if (t.length <= 2) return [...t];
  const n = [t[0]];
  for (let o = 1; o < t.length - 1; o++) {
    const c = t[o - 1], r = t[o], s = t[o + 1], e = r[0] - c[0], l = r[1] - c[1], a = s[0] - r[0], i = s[1] - r[1];
    e * i - l * a === 0 && Math.sign(e) === Math.sign(a) && Math.sign(l) === Math.sign(i) || n.push(r);
  }
  return n.push(t[t.length - 1]), n;
}
function j(t, n, o, c, r, s = 8) {
  const e = v(t, n, o), l = G(e, n, o), a = H(l, n, o), i = d(a, s);
  return q(i, c, r);
}
function q(t, n, o) {
  const c = S(n, t), r = S(o, t), s = z(t, c, r);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: W(s).slice(1, -1).map((i) => B(i, t)), edgesUsable: !0 };
}
function S(t, n) {
  const o = T(Math.floor(t.x / 100 * n.cols), 0, n.cols - 1), c = T(Math.floor(t.y / 100 * n.rows), 0, n.rows - 1);
  return [o, c];
}
function B(t, n) {
  return {
    x: (t[0] + 0.5) / n.cols * 100,
    y: (t[1] + 0.5) / n.rows * 100
  };
}
function T(t, n, o) {
  return t < n ? n : t > o ? o : t;
}
self.onmessage = (t) => {
  const { rgba: n, width: o, height: c, fromPos: r, toPos: s, cellSize: e } = t.data, l = performance.now();
  try {
    const a = new Uint8ClampedArray(n), i = e ?? 8, { waypoints: f, edgesUsable: u } = j(a, o, c, r, s, i);
    self.postMessage({
      waypoints: f,
      edgesUsable: u,
      elapsedMs: performance.now() - l
    });
  } catch (a) {
    self.postMessage({
      waypoints: [],
      edgesUsable: !1,
      elapsedMs: performance.now() - l,
      error: a instanceof Error ? a.message : String(a)
    });
  }
};
//# sourceMappingURL=pathfinding.worker-BPxZVwUM.js.map
