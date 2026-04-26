/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, rt = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), ht = /* @__PURE__ */ new WeakMap();
let kt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (rt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ht.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ht.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bt = (s) => new kt(typeof s == "string" ? s : s + "", void 0, nt), Pt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[r + 1], s[0]);
  return new kt(e, s, nt);
}, Lt = (s, t) => {
  if (rt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = q.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, ut = rt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Bt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wt, defineProperty: Vt, getOwnPropertyDescriptor: Gt, getOwnPropertyNames: qt, getOwnPropertySymbols: Kt, getPrototypeOf: Xt } = Object, A = globalThis, pt = A.trustedTypes, Yt = pt ? pt.emptyScript : "", Zt = A.reactiveElementPolyfillSupport, I = (s, t) => s, K = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Yt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, at = (s, t) => !Wt(s, t), ft = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: at };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Vt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: r } = Gt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const l = o?.call(this);
      r?.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = Xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, i = [...qt(e), ...Kt(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(ut(o));
    } else t !== void 0 && e.push(ut(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Lt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : K).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : K;
      this._$Em = o;
      const l = n.fromAttribute(e, r.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (r = this[t]), i ?? (i = n.getPropertyOptions(t)), !((i.hasChanged ?? at)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, r] of i) {
        const { wrapped: n } = r, l = this[o];
        n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[I("elementProperties")] = /* @__PURE__ */ new Map(), k[I("finalized")] = /* @__PURE__ */ new Map(), Zt?.({ ReactiveElement: k }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, gt = (s) => s, X = z.trustedTypes, $t = X ? X.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Nt = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + w, Jt = `<${Ot}>`, M = document, B = () => M.createComment(""), L = (s) => s === null || typeof s != "object" && typeof s != "function", lt = Array.isArray, Qt = (s) => lt(s) || typeof s?.[Symbol.iterator] == "function", tt = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, _t = />/g, C = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bt = /'/g, yt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, te = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), y = te(1), N = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), vt = /* @__PURE__ */ new WeakMap(), E = M.createTreeWalker(M, 129);
function Ut(s, t) {
  if (!lt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $t !== void 0 ? $t.createHTML(t) : t;
}
const ee = (s, t) => {
  const e = s.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = H;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let c, u, d = -1, g = 0;
    for (; g < a.length && (n.lastIndex = g, u = n.exec(a), u !== null); ) g = n.lastIndex, n === H ? u[1] === "!--" ? n = mt : u[1] !== void 0 ? n = _t : u[2] !== void 0 ? (Rt.test(u[2]) && (o = RegExp("</" + u[2], "g")), n = C) : u[3] !== void 0 && (n = C) : n === C ? u[0] === ">" ? (n = o ?? H, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? C : u[3] === '"' ? yt : bt) : n === yt || n === bt ? n = C : n === mt || n === _t ? n = H : (n = C, o = void 0);
    const p = n === C && s[l + 1].startsWith("/>") ? " " : "";
    r += n === H ? a + Jt : d >= 0 ? (i.push(c), a.slice(0, d) + Nt + a.slice(d) + w + p) : a + w + (d === -2 ? l : p);
  }
  return [Ut(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [c, u] = ee(t, e);
    if (this.el = W.createElement(c, i), E.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = E.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Nt)) {
          const g = u[n++], p = o.getAttribute(d).split(w), f = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: r, name: f[2], strings: p, ctor: f[1] === "." ? ie : f[1] === "?" ? oe : f[1] === "@" ? re : J }), o.removeAttribute(d);
        } else d.startsWith(w) && (a.push({ type: 6, index: r }), o.removeAttribute(d));
        if (Rt.test(o.tagName)) {
          const d = o.textContent.split(w), g = d.length - 1;
          if (g > 0) {
            o.textContent = X ? X.emptyScript : "";
            for (let p = 0; p < g; p++) o.append(d[p], B()), E.nextNode(), a.push({ type: 2, index: ++r });
            o.append(d[g], B());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ot) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(w, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += w.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = M.createElement("template");
    return i.innerHTML = t, i;
  }
}
function O(s, t, e = s, i) {
  if (t === N) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = L(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = O(s, o._$AS(s, t.values), o, i)), t;
}
class se {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? M).importNode(e, !0);
    E.currentNode = o;
    let r = E.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new V(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new ne(r, this, t)), this._$AV.push(c), a = i[++l];
      }
      n !== a?.index && (r = E.nextNode(), n++);
    }
    return E.currentNode = M, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), L(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && L(this._$AH) ? this._$AA.nextSibling.data = t : this.T(M.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = W.createElement(Ut(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const r = new se(o, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = vt.get(t.strings);
    return e === void 0 && vt.set(t.strings, e = new W(t)), e;
  }
  k(t) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const r of t) o === e.length ? e.push(i = new V(this.O(B()), this.O(B()), this, this.options)) : i = e[o], i._$AI(r), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = gt(t).nextSibling;
      gt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, r) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = $;
  }
  _$AI(t, e = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = O(this, t, e, 0), n = !L(t) || t !== this._$AH && t !== N, n && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = O(this, l[i + a], e, a), c === N && (c = this._$AH[a]), n || (n = !L(c) || c !== this._$AH[a]), c === $ ? t = $ : t !== $ && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ie extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class oe extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class re extends J {
  constructor(t, e, i, o, r) {
    super(t, e, i, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? $) === N) return;
    const i = this._$AH, o = t === $ && i !== $ || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== $ && (i === $ || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ne {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const ae = z.litHtmlPolyfillSupport;
ae?.(W, V), (z.litHtmlVersions ?? (z.litHtmlVersions = [])).push("3.3.2");
const le = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = o = new V(t.insertBefore(B(), r), r, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
let P = class extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = le(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return N;
  }
};
P._$litElement$ = !0, P.finalized = !0, D.litElementHydrateSupport?.({ LitElement: P });
const ce = D.litElementPolyfillSupport;
ce?.({ LitElement: P });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: at }, he = (s = de, t, e) => {
  const { kind: i, metadata: o } = e;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ct(s) {
  return (t, e) => typeof e == "object" ? he(s, t, e) : ((i, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(s) {
  return ct({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = (s) => s.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = { CHILD: 2 }, fe = (s) => (...t) => ({ _$litDirective$: s, values: t });
class ge {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = (s, t) => {
  const e = s._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), j(i, t);
  return !0;
}, Y = (s) => {
  let t, e;
  do {
    if ((t = s._$AM) === void 0) break;
    e = t._$AN, e.delete(s), s = t;
  } while (e?.size === 0);
}, Tt = (s) => {
  for (let t; t = s._$AM; s = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(s)) break;
    e.add(s), _e(t);
  }
};
function $e(s) {
  this._$AN !== void 0 ? (Y(this), this._$AM = s, Tt(this)) : this._$AM = s;
}
function me(s, t = !1, e = 0) {
  const i = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (t) if (Array.isArray(i)) for (let r = e; r < i.length; r++) j(i[r], !1), Y(i[r]);
  else i != null && (j(i, !1), Y(i));
  else j(this, s);
}
const _e = (s) => {
  s.type == pe.CHILD && (s._$AP ?? (s._$AP = me), s._$AQ ?? (s._$AQ = $e));
};
class be extends ge {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), Tt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (j(this, t), Y(this));
  }
  setValue(t) {
    if (ue(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = () => new ye();
class ye {
}
const et = /* @__PURE__ */ new WeakMap(), It = fe(class extends be {
  render(s) {
    return $;
  }
  update(s, [t]) {
    const e = t !== this.G;
    return e && this.G !== void 0 && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = s.options?.host, this.rt(this.ct = s.element)), $;
  }
  rt(s) {
    if (this.isConnected || (s = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = et.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), et.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, s), s !== void 0 && this.G.call(this.ht, s);
    } else this.G.value = s;
  }
  get lt() {
    return typeof this.G == "function" ? et.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Z = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
];
class dt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const wt = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function h(s, t) {
  throw new dt(`${s}: ${t}`);
}
function zt(s, t) {
  (!s || typeof s != "object") && h(t, "must be an object with x and y");
  const e = s, i = e.x, o = e.y;
  (typeof i != "number" || !Number.isFinite(i)) && h(`${t}.x`, "must be a finite number"), (typeof o != "number" || !Number.isFinite(o)) && h(`${t}.y`, "must be a finite number");
  const r = i, n = o;
  return (r < 0 || r > 100) && h(`${t}.x`, `must be in range 0-100, got ${r}`), (n < 0 || n > 100) && h(`${t}.y`, `must be in range 0-100, got ${n}`), { x: r, y: n };
}
function At(s, t) {
  (typeof s != "string" || !s.length) && h(t, "must be a non-empty string");
  const e = s;
  return wt.some((o) => e.startsWith(o)) || h(
    t,
    `must start with one of ${wt.join(", ")} (got "${e.slice(0, 40)}")`
  ), e;
}
function ve(s, t, e) {
  const i = `nodes[${t}]`;
  (!s || typeof s != "object") && h(i, "must be an object");
  const o = s, r = o.id;
  (typeof r != "string" || !r.length) && h(`${i}.id`, "must be a non-empty string");
  const n = r;
  e.has(n) && h(`${i}.id`, `duplicate node id "${n}"`), e.add(n);
  const l = zt(o.position, `${i}.position`), a = { id: n, position: l };
  return typeof o.entity == "string" && (a.entity = o.entity), typeof o.label == "string" && (a.label = o.label), typeof o.color == "string" && (a.color = o.color), typeof o.size == "number" && (a.size = o.size), typeof o.show_label == "boolean" && (a.show_label = o.show_label), typeof o.show_value == "boolean" && (a.show_value = o.show_value), a;
}
function we(s, t, e, i) {
  const o = `flows[${t}]`;
  (!s || typeof s != "object") && h(o, "must be an object");
  const r = s, n = r.id;
  (typeof n != "string" || !n.length) && h(`${o}.id`, "must be a non-empty string");
  const l = n;
  e.has(l) && h(`${o}.id`, `duplicate flow id "${l}"`), e.add(l);
  const a = r.from_node;
  (typeof a != "string" || !i.has(a)) && h(`${o}.from_node`, `references unknown node "${String(a)}"`);
  const c = r.to_node;
  (typeof c != "string" || !i.has(c)) && h(`${o}.to_node`, `references unknown node "${String(c)}"`);
  const u = r.entity;
  (typeof u != "string" || !u.length) && h(`${o}.entity`, "must be a non-empty entity id");
  const d = r.waypoints;
  Array.isArray(d) || h(`${o}.waypoints`, "must be an array (may be empty)");
  const g = d.map(
    (f, m) => zt(f, `${o}.waypoints[${m}]`)
  ), p = {
    id: l,
    from_node: a,
    to_node: c,
    entity: u,
    waypoints: g
  };
  if (typeof r.domain == "string" && (Z.includes(r.domain) || h(`${o}.domain`, `must be one of ${Z.join(", ")}`), p.domain = r.domain), typeof r.color_positive == "string" && (p.color_positive = r.color_positive), typeof r.color_negative == "string" && (p.color_negative = r.color_negative), typeof r.threshold == "number" && (p.threshold = r.threshold), typeof r.reverse == "boolean" && (p.reverse = r.reverse), typeof r.speed_multiplier == "number") {
    const f = r.speed_multiplier;
    (f < 0.1 || f > 5) && h(`${o}.speed_multiplier`, "must be between 0.1 and 5.0"), p.speed_multiplier = f;
  }
  return p;
}
function it(s) {
  if (!s || typeof s != "object") throw new dt("config must be an object");
  const t = s;
  t.type !== "custom:flowme-card" && h("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), Z.includes(t.domain) || h("domain", `must be one of ${Z.join(", ")}`);
  const e = t.background;
  (!e || typeof e != "object") && h("background", "must be an object");
  const i = e, r = { default: At(i.default, "background.default") };
  if (i.weather_entity !== void 0 && (typeof i.weather_entity != "string" && h("background.weather_entity", "must be a string entity id"), r.weather_entity = i.weather_entity), i.weather_states !== void 0) {
    (!i.weather_states || typeof i.weather_states != "object") && h("background.weather_states", "must be an object mapping state strings to image URLs");
    const p = Object.entries(i.weather_states), f = {};
    for (const [m, _] of p)
      f[m] = At(_, `background.weather_states.${m}`);
    r.weather_states = f;
  }
  i.transition_duration !== void 0 && (typeof i.transition_duration != "number" && h("background.transition_duration", "must be a number (milliseconds)"), r.transition_duration = i.transition_duration);
  const n = t.nodes;
  Array.isArray(n) || h("nodes", "must be an array");
  const l = /* @__PURE__ */ new Set(), a = n.map((p, f) => ve(p, f, l));
  a.length === 0 && h("nodes", "at least one node is required");
  const c = t.flows;
  Array.isArray(c) || h("flows", "must be an array");
  const u = /* @__PURE__ */ new Set(), d = c.map(
    (p, f) => we(p, f, u, l)
  ), g = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: r,
    nodes: a,
    flows: d
  };
  return t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && h("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), g.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && h("fullscreen", "must be a boolean"), g.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && h("edit_mode_password", "must be a string"), g.edit_mode_password = t.edit_mode_password), t.overlays !== void 0 && (Array.isArray(t.overlays) || h("overlays", "must be an array"), g.overlays = t.overlays), g;
}
function Ae(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function xt(s, t) {
  return { x: s.x / 100 * t.width, y: s.y / 100 * t.height };
}
function St(s, t) {
  if (s.length === 0) return "";
  const [e, ...i] = s;
  if (!e) return "";
  const o = xt(e, t), r = [`M ${o.x.toFixed(2)} ${o.y.toFixed(2)}`];
  for (const n of i) {
    const l = xt(n, t);
    r.push(`L ${l.x.toFixed(2)} ${l.y.toFixed(2)}`);
  }
  return r.join(" ");
}
function Ct(s) {
  if (s == null) return 0;
  if (typeof s == "number") return Number.isFinite(s) ? s : 0;
  const t = s.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const e = Number.parseFloat(t);
  return Number.isFinite(e) ? e : 0;
}
function xe(s, t) {
  let e = null, i = null;
  const o = (...r) => {
    i = r, e !== null && clearTimeout(e), e = setTimeout(() => {
      e = null, i && s(...i), i = null;
    }, t);
  };
  return o.cancel = () => {
    e !== null && (clearTimeout(e), e = null), i = null;
  }, o;
}
function Dt(s) {
  if (!s) return;
  const t = /^(\d+):(\d+)$/.exec(s);
  if (!t) return;
  const e = Number.parseInt(t[1], 10), i = Number.parseInt(t[2], 10);
  if (!(!e || !i))
    return e / i;
}
const Se = {
  domain: "energy",
  default_color_positive: "#FFD700",
  default_color_negative: "#4ADE80",
  shape: "dot",
  glow: !0,
  unit_label: "W",
  visibility_threshold: 10,
  speed_curve(s) {
    const t = Math.abs(s);
    if (t <= 0) return 8e3;
    const e = 8e3 - Math.log10(t / 10) * 2e3;
    return Ae(e, 400, 8e3);
  },
  describe(s) {
    return Math.abs(s) >= 1e3 ? `${(s / 1e3).toFixed(2)} kW` : `${Math.round(s)} W`;
  }
}, F = {
  domain: "generic",
  default_color_positive: "#A78BFA",
  default_color_negative: "#A78BFA",
  shape: "dot",
  glow: !1,
  unit_label: "",
  visibility_threshold: 1,
  speed_curve(s) {
    const t = Math.abs(s);
    return Math.max(1e3, 5e3 - t * 4);
  },
  describe(s) {
    return Math.abs(s) >= 100 ? s.toFixed(0) : Math.abs(s) >= 10 ? s.toFixed(1) : s.toFixed(2);
  }
}, Ce = {
  ...F,
  domain: "water",
  default_color_positive: "#3B82F6",
  default_color_negative: "#3B82F6",
  unit_label: "L/min",
  visibility_threshold: 0.5
}, Ee = {
  ...F,
  domain: "network",
  default_color_positive: "#10B981",
  default_color_negative: "#F59E0B",
  unit_label: "Mbps",
  visibility_threshold: 0.1
}, Me = {
  ...F,
  domain: "hvac",
  default_color_positive: "#EF4444",
  default_color_negative: "#3B82F6",
  unit_label: "CFM",
  visibility_threshold: 10
}, ke = {
  ...F,
  domain: "gas",
  default_color_positive: "#FB923C",
  default_color_negative: "#FB923C",
  unit_label: "m³/h",
  visibility_threshold: 0.01
}, Et = {
  energy: Se,
  water: Ce,
  network: Ee,
  hvac: Me,
  gas: ke,
  generic: F
};
function jt(s) {
  return s && s in Et ? Et[s] : F;
}
const v = "http://www.w3.org/2000/svg", st = "http://www.w3.org/1999/xlink", Mt = 3, Pe = 5, Ne = 2;
class Oe {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = xe(() => this.flushUpdates(), 200);
  }
  async init(t, e) {
    this.container = t, this.config = e, this.flowsById = new Map(e.flows.map((o) => [o.id, o]));
    const i = document.createElementNS(v, "svg");
    i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("preserveAspectRatio", "none"), i.style.position = "absolute", i.style.inset = "0", i.style.pointerEvents = "none", i.style.overflow = "visible", this.svg = i, t.appendChild(i), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t);
  }
  updateFlow(t, e) {
    this.flowsById.has(t) && (this.latestValues.set(t, e), this.applyUpdate());
  }
  destroy() {
    this.applyUpdate.cancel(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear();
  }
  // -- internal --
  containerSize() {
    if (!this.container) return { width: 0, height: 0 };
    const t = this.container.getBoundingClientRect();
    return { width: Math.max(1, t.width), height: Math.max(1, t.height) };
  }
  buildSkeleton() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const e = document.createElementNS(v, "defs");
    this.svg.appendChild(e);
    for (const i of this.config.flows) {
      const o = new Map(this.config.nodes.map((m) => [m.id, m])), r = o.get(i.from_node), n = o.get(i.to_node);
      if (!r || !n) continue;
      const l = [r.position, ...i.waypoints, n.position], a = `flowme-path-${i.id}`, c = document.createElementNS(v, "path");
      c.setAttribute("id", a), c.setAttribute("d", St(l, t)), c.setAttribute("fill", "none"), c.setAttribute("stroke", this.strokeColorFor(i)), c.setAttribute("stroke-width", String(Ne)), c.setAttribute("stroke-opacity", "0.25"), c.setAttribute("stroke-linecap", "round"), c.setAttribute("stroke-linejoin", "round"), e.appendChild(c);
      const u = document.createElementNS(v, "g");
      u.setAttribute("data-flow-id", i.id);
      const d = document.createElementNS(v, "use");
      d.setAttributeNS(st, "href", `#${a}`), d.setAttribute("href", `#${a}`), u.appendChild(d);
      const g = this.profileFor(i), p = this.dotColorFor(i, 1), f = [];
      for (let m = 0; m < Mt; m++) {
        const _ = document.createElementNS(v, "circle");
        _.setAttribute("r", String(Pe)), _.setAttribute("fill", p), _.setAttribute("opacity", "0"), g.glow && (_.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), _.style.color = p);
        const b = document.createElementNS(v, "animateMotion");
        b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", "2s"), b.setAttribute(
          "begin",
          `${(-2 * m / Mt).toFixed(3)}s`
        );
        const S = document.createElementNS(v, "mpath");
        S.setAttributeNS(st, "href", `#${a}`), S.setAttribute("href", `#${a}`), b.appendChild(S), _.appendChild(b), u.appendChild(_), f.push({ circle: _, animateMotion: b });
      }
      this.svg.appendChild(u), this.flowNodes.set(i.id, { group: u, path: c, dotSlots: f, pathId: a });
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const e = new Map(this.config.nodes.map((i) => [i.id, i]));
    for (const i of this.config.flows) {
      const o = this.flowNodes.get(i.id);
      if (!o) continue;
      const r = e.get(i.from_node), n = e.get(i.to_node);
      if (!r || !n) continue;
      const l = [r.position, ...i.waypoints, n.position];
      o.path.setAttribute("d", St(l, t));
    }
  }
  flushUpdates() {
    for (const [t, e] of this.latestValues)
      this.applyFlow(t, e);
  }
  applyFlow(t, e) {
    const i = this.flowsById.get(t), o = this.flowNodes.get(t);
    if (!i || !o) return;
    const r = this.profileFor(i), n = i.threshold ?? r.visibility_threshold, l = Math.abs(e), a = l >= n, c = a ? "1" : "0";
    for (const m of o.dotSlots)
      m.circle.setAttribute("opacity", c);
    if (!a) return;
    const u = i.speed_multiplier ?? 1, d = r.speed_curve(l) * u, g = `${(d / 1e3).toFixed(3)}s`, p = e < 0 != (i.reverse === !0) ? -1 : 1, f = p > 0 ? i.color_positive ?? r.default_color_positive : i.color_negative ?? r.default_color_negative;
    for (let m = 0; m < o.dotSlots.length; m++) {
      const _ = o.dotSlots[m];
      if (!_) continue;
      _.circle.setAttribute("fill", f), r.glow && (_.circle.style.color = f);
      const b = document.createElementNS(v, "animateMotion");
      b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", g), b.setAttribute(
        "begin",
        `${(-d * m / (o.dotSlots.length * 1e3)).toFixed(3)}s`
      ), p < 0 && (b.setAttribute("keyPoints", "1;0"), b.setAttribute("keyTimes", "0;1"));
      const S = document.createElementNS(v, "mpath");
      S.setAttributeNS(st, "href", `#${o.pathId}`), S.setAttribute("href", `#${o.pathId}`), b.appendChild(S), _.animateMotion.replaceWith(b), _.animateMotion = b, _.circle.appendChild(b);
    }
  }
  profileFor(t) {
    return jt(t.domain ?? this.config?.domain);
  }
  strokeColorFor(t) {
    const e = this.profileFor(t);
    return t.color_positive ?? e.default_color_positive;
  }
  dotColorFor(t, e) {
    const i = this.profileFor(t);
    return e >= 0 ? t.color_positive ?? i.default_color_positive : t.color_negative ?? i.default_color_negative;
  }
}
function Re() {
  return new Oe();
}
var Ue = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, T = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Fe(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && Ue(t, e, o), o;
};
let x = class extends P {
  constructor() {
    super(...arguments), this.mode = "view", this.statusMessage = "", this.errorMessage = "", this.stageRef = Ht(), this.dragging = null, this.toggleAddNode = () => {
      this.mode = this.mode === "add-node" ? "view" : "add-node", this.statusMessage = this.mode === "add-node" ? "Click anywhere on the background to drop a new node." : "";
    }, this.onStageClick = (s) => {
      if (this.mode !== "add-node" || !this.config) return;
      const t = this.stageRef.value;
      if (!t) return;
      const e = s.target;
      if (e && e.closest(".handle")) return;
      const i = t.getBoundingClientRect(), o = (s.clientX - i.left) / i.width * 100, r = (s.clientY - i.top) / i.height * 100, n = {
        id: this.freshNodeId(),
        position: { x: G(o), y: G(r) },
        label: "New node"
      }, l = { ...this.config, nodes: [...this.config.nodes, n] };
      this.commitChange(l), this.mode = "view", this.statusMessage = `Added node ${n.id}.`;
    }, this.onHandlePointerDown = (s) => {
      if (this.mode === "add-node") return;
      const t = s.currentTarget, e = t.dataset.nodeId;
      e && (s.preventDefault(), t.setPointerCapture(s.pointerId), this.dragging = { nodeId: e, pointerId: s.pointerId });
    }, this.onHandlePointerMove = (s) => {
      if (!this.dragging || this.dragging.pointerId !== s.pointerId || !this.config) return;
      const t = this.stageRef.value;
      if (!t) return;
      const e = t.getBoundingClientRect(), i = G((s.clientX - e.left) / e.width * 100), o = G((s.clientY - e.top) / e.height * 100), r = this.dragging.nodeId, n = this.config.nodes.map(
        (l) => l.id === r ? { ...l, position: { x: i, y: o } } : l
      );
      this.config = { ...this.config, nodes: n };
    }, this.onHandlePointerUp = (s) => {
      if (!this.dragging || this.dragging.pointerId !== s.pointerId || !this.config) return;
      const t = s.currentTarget;
      t.hasPointerCapture(s.pointerId) && t.releasePointerCapture(s.pointerId), this.dragging = null, this.commitChange(this.config);
    }, this.onHandleClick = (s) => {
      s.stopPropagation();
    };
  }
  setConfig(s) {
    try {
      this.config = it(s), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return y`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : null}
        </div>
      `;
    const t = `${1 / (Dt(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, e = this.config.background.default;
    return y`
      <div class="wrap">
        <div class="toolbar">
          <button
            class=${this.mode === "add-node" ? "on" : ""}
            @click=${this.toggleAddNode}
          >
            ${this.mode === "add-node" ? "Click on image…" : "+ Add node"}
          </button>
          <span class="hint-inline">
            Drag node handles to reposition. Edit flows, entities and advanced options via the
            "Show code editor" toggle.
          </span>
        </div>
        ${this.statusMessage ? y`<div class="status">${this.statusMessage}</div>` : null}
        <div
          class="stage"
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          ${It(this.stageRef)}
        >
          <div
            class="background"
            style=${e ? `background-image: url('${e}');` : ""}
          ></div>
          ${this.config.nodes.map((i) => this.renderHandle(i))}
        </div>
        ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : null}
      </div>
    `;
  }
  renderHandle(s) {
    return y`
      <div
        class="handle"
        data-node-id=${s.id}
        style=${`left: ${s.position.x}%; top: ${s.position.y}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onHandleClick}
      >
        <span class="handle-dot"></span>
        ${s.label ? y`<span class="handle-label">${s.label}</span>` : null}
      </div>
    `;
  }
  commitChange(s) {
    try {
      const t = it(s);
      this.config = t, this.errorMessage = "";
      const e = new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      });
      this.dispatchEvent(e);
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  freshNodeId() {
    const s = new Set(this.config?.nodes.map((t) => t.id) ?? []);
    for (let t = 1; t < 1e3; t++) {
      const e = `node_${t}`;
      if (!s.has(e)) return e;
    }
    return `node_${Date.now()}`;
  }
};
x.styles = Pt`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .wrap {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .toolbar button {
      font: inherit;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    .toolbar button.on {
      background: var(--primary-color, #4ade80);
      color: var(--text-primary-color, #111);
      border-color: var(--primary-color, #4ade80);
    }
    .hint-inline {
      font-size: 12px;
      opacity: 0.7;
    }
    .status {
      font-size: 12px;
      padding: 6px 10px;
      background: rgba(74, 222, 128, 0.12);
      border-radius: 6px;
    }
    .stage {
      position: relative;
      width: 100%;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      background: var(--ha-card-background, #111);
      touch-action: none;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .handle {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }
    .handle:active {
      cursor: grabbing;
    }
    .handle-dot {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 5px rgba(255, 255, 255, 0.9);
    }
    .handle-label {
      font-size: 11px;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      white-space: nowrap;
    }
    .hint {
      opacity: 0.7;
      font-size: 13px;
      margin: 0;
    }
    .error {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.08);
      padding: 8px 10px;
      border-radius: 6px;
      margin: 0;
      font-size: 12px;
      white-space: pre-wrap;
    }
  `;
T([
  ct({ attribute: !1 })
], x.prototype, "hass", 2);
T([
  U()
], x.prototype, "config", 2);
T([
  U()
], x.prototype, "mode", 2);
T([
  U()
], x.prototype, "statusMessage", 2);
T([
  U()
], x.prototype, "errorMessage", 2);
x = T([
  Ft("flowme-card-editor")
], x);
function G(s) {
  return s < 0 ? 0 : s > 100 ? 100 : s;
}
var Te = Object.defineProperty, He = Object.getOwnPropertyDescriptor, Q = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? He(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && Te(t, e, o), o;
};
const Ie = "0.1.0";
console.info(
  `%c flowme %c v${Ie} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
let R = class extends P {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = Ht();
  }
  setConfig(s) {
    try {
      const t = it(s);
      this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
    } catch (t) {
      const e = t instanceof dt ? t.message : String(t);
      this.config = void 0, this.errorMessage = e, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    this.teardownRenderer(), super.disconnectedCallback();
  }
  willUpdate(s) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config && (this.teardownRenderer(), this.renderer = Re(), this.rendererReadyFor = this.config, this.renderer.init(t, this.config)), s.has("hass") && this.renderer && this.hass)
      for (const e of this.config.flows) {
        const i = this.hass.states[e.entity], o = Ct(i?.state);
        this.renderer.updateFlow(e.id, o);
      }
  }
  getCardSize() {
    return 5;
  }
  static getConfigElement() {
    return document.createElement("flowme-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:flowme-card",
      domain: "energy",
      background: {
        default: "/local/flowme/example-house.jpg"
      },
      nodes: [
        { id: "source", position: { x: 20, y: 30 }, label: "Source" },
        { id: "sink", position: { x: 80, y: 70 }, label: "Sink" }
      ],
      flows: [
        {
          id: "example",
          from_node: "source",
          to_node: "sink",
          entity: "sensor.example_power",
          waypoints: [{ x: 80, y: 30 }]
        }
      ]
    };
  }
  render() {
    if (this.errorMessage)
      return y`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const s = this.config;
    if (!s)
      return y`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    const e = `${1 / (Dt(s.aspect_ratio) ?? 16 / 10) * 100}%`, i = this.currentBackgroundUrl();
    return y`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${e};`}
        >
          <div
            class="background"
            style=${i ? `background-image: url('${i}');` : ""}
          ></div>
          <div class="renderer-mount" ${It(this.rendererMount)}></div>
          ${s.nodes.map((o) => this.renderNodeHandle(o))}
          ${(s.overlays ?? []).map((o) => this.renderOverlayPlaceholder(o))}
        </div>
      </ha-card>
    `;
  }
  currentBackgroundUrl() {
    const s = this.config?.background;
    if (!s) return "";
    if (s.weather_entity && s.weather_states && this.hass) {
      const t = this.hass.states[s.weather_entity];
      if (t) {
        const e = s.weather_states[t.state];
        if (e) return e;
      }
    }
    return s.default;
  }
  renderNodeHandle(s) {
    const t = this.hass && s.entity ? this.hass.states[s.entity] : void 0, e = s.show_value !== !1 && !!t, i = s.show_label !== !1 && !!s.label, o = jt(this.config?.domain), r = s.color ?? o.default_color_positive, n = s.size ?? 12, l = t ? `${o.describe(Ct(t.state))}${o.unit_label ? ` ${o.unit_label}` : ""}` : "";
    return y`
      <div
        class="node"
        data-node-id=${s.id}
        style=${`left: ${s.position.x}%; top: ${s.position.y}%;`}
      >
        <span
          class="node-dot"
          style=${`background: ${r}; width: ${n}px; height: ${n}px;`}
        ></span>
        ${i ? y`<span class="node-label">${s.label}</span>` : null}
        ${e ? y`<span class="node-value">${l}</span>` : null}
      </div>
    `;
  }
  // v0.5 replaces this with real overlay rendering; for now we render a
  // subtle marker so users see something at the configured position.
  renderOverlayPlaceholder(s) {
    return y`
      <div
        class="overlay-placeholder"
        style=${`left: ${s.position.x}%; top: ${s.position.y}%;`}
        title=${`overlay: ${s.type}`}
      ></div>
    `;
  }
  teardownRenderer() {
    this.renderer && (this.renderer.destroy(), this.renderer = null), this.rendererReadyFor = void 0;
  }
};
R.styles = Pt`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
      position: relative;
    }
    .stage {
      position: relative;
      width: 100%;
      height: 0;
      overflow: hidden;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--ha-card-background, rgba(0, 0, 0, 0.04));
    }
    .renderer-mount {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .node {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      color: var(--primary-text-color, #fff);
      font-size: 12px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      pointer-events: none;
    }
    .node-dot {
      display: inline-block;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.7);
    }
    .node-label {
      font-weight: 600;
      white-space: nowrap;
    }
    .node-value {
      opacity: 0.85;
      white-space: nowrap;
    }
    .overlay-placeholder {
      position: absolute;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.1);
      border: 1px dashed rgba(255, 255, 255, 0.4);
      pointer-events: none;
    }
    .error {
      padding: 16px;
      color: var(--error-color, #f44336);
    }
    .error pre {
      margin: 8px 0 0;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .placeholder {
      padding: 16px;
      opacity: 0.6;
    }
  `;
Q([
  ct({ attribute: !1 })
], R.prototype, "hass", 2);
Q([
  U()
], R.prototype, "config", 2);
Q([
  U()
], R.prototype, "errorMessage", 2);
R = Q([
  Ft("flowme-card")
], R);
const ot = window;
ot.customCards = ot.customCards ?? [];
ot.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  R as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
