/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, jt = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bt = Symbol(), Jt = /* @__PURE__ */ new WeakMap();
let _e = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (jt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Jt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Jt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const He = (e) => new _e(typeof e == "string" ? e : e + "", void 0, Bt), Mt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new _e(i, e, Bt);
}, je = (e, t) => {
  if (jt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = bt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, Xt = jt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return He(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Be, defineProperty: We, getOwnPropertyDescriptor: Ve, getOwnPropertyNames: qe, getOwnPropertySymbols: Ge, getPrototypeOf: Ke } = Object, D = globalThis, Yt = D.trustedTypes, Je = Yt ? Yt.emptyScript : "", Xe = D.reactiveElementPolyfillSupport, rt = (e, t) => e, $t = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Je : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Wt = (e, t) => !Be(e, t), Zt = { attribute: !0, type: String, converter: $t, reflect: !1, useDefault: !1, hasChanged: Wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let tt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Zt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && We(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = Ve(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: s, set(r) {
      const c = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(rt("elementProperties"))) return;
    const t = Ke(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(rt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(rt("properties"))) {
      const i = this.properties, n = [...qe(i), ...Ge(i)];
      for (const s of n) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, s] of i) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const s = this._$Eu(i, n);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) i.unshift(Xt(s));
    } else t !== void 0 && i.push(Xt(t));
    return i;
  }
  static _$Eu(t, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return je(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : $t).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : $t;
      this._$Em = s;
      const c = r.fromAttribute(i, o.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? Wt)(o, i) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, o] of n) {
        const { wrapped: r } = o, c = this[s];
        r !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, o, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
tt.elementStyles = [], tt.shadowRootOptions = { mode: "open" }, tt[rt("elementProperties")] = /* @__PURE__ */ new Map(), tt[rt("finalized")] = /* @__PURE__ */ new Map(), Xe?.({ ReactiveElement: tt }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, Qt = (e) => e, _t = at.trustedTypes, te = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ae = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, Se = "?" + z, Ye = `<${Se}>`, q = document, ut = () => q.createComment(""), pt = (e) => e === null || typeof e != "object" && typeof e != "function", Vt = Array.isArray, Ze = (e) => Vt(e) || typeof e?.[Symbol.iterator] == "function", Ot = `[ 	
\f\r]`, ot = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, ie = />/g, j = RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ne = /'/g, se = /"/g, ke = /^(?:script|style|textarea|title)$/i, Qe = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), m = Qe(1), et = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), oe = /* @__PURE__ */ new WeakMap(), V = q.createTreeWalker(q, 129);
function Ce(e, t) {
  if (!Vt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return te !== void 0 ? te.createHTML(t) : t;
}
const ti = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ot;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let l, d, h = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, d = r.exec(a), d !== null); ) u = r.lastIndex, r === ot ? d[1] === "!--" ? r = ee : d[1] !== void 0 ? r = ie : d[2] !== void 0 ? (ke.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = j) : d[3] !== void 0 && (r = j) : r === j ? d[0] === ">" ? (r = s ?? ot, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, l = d[1], r = d[3] === void 0 ? j : d[3] === '"' ? se : ne) : r === se || r === ne ? r = j : r === ee || r === ie ? r = ot : (r = j, s = void 0);
    const p = r === j && e[c + 1].startsWith("/>") ? " " : "";
    o += r === ot ? a + Ye : h >= 0 ? (n.push(l), a.slice(0, h) + Ae + a.slice(h) + z + p) : a + z + (h === -2 ? c : p);
  }
  return [Ce(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ft {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, d] = ti(t, i);
    if (this.el = ft.createElement(l, n), V.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = V.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ae)) {
          const u = d[r++], p = s.getAttribute(h).split(z), g = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: g[2], strings: p, ctor: g[1] === "." ? ii : g[1] === "?" ? ni : g[1] === "@" ? si : Pt }), s.removeAttribute(h);
        } else h.startsWith(z) && (a.push({ type: 6, index: o }), s.removeAttribute(h));
        if (ke.test(s.tagName)) {
          const h = s.textContent.split(z), u = h.length - 1;
          if (u > 0) {
            s.textContent = _t ? _t.emptyScript : "";
            for (let p = 0; p < u; p++) s.append(h[p], ut()), V.nextNode(), a.push({ type: 2, index: ++o });
            s.append(h[u], ut());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Se) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(z, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += z.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = q.createElement("template");
    return n.innerHTML = t, n;
  }
}
function it(e, t, i = e, n) {
  if (t === et) return t;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const o = pt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = it(e, s._$AS(e, t.values), s, n)), t;
}
class ei {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: n } = this._$AD, s = (t?.creationScope ?? q).importNode(i, !0);
    V.currentNode = s;
    let o = V.nextNode(), r = 0, c = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new gt(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new oi(o, this, t)), this._$AV.push(l), a = n[++c];
      }
      r !== a?.index && (o = V.nextNode(), r++);
    }
    return V.currentNode = q, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class gt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = it(this, t, i), pt(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== et && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ze(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== b && pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(q.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ft.createElement(Ce(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const o = new ei(s, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = oe.get(t.strings);
    return i === void 0 && oe.set(t.strings, i = new ft(t)), i;
  }
  k(t) {
    Vt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new gt(this.O(ut()), this.O(ut()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Qt(t).nextSibling;
      Qt(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = b;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = it(this, t, i, 0), r = !pt(t) || t !== this._$AH && t !== et, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = it(this, c[n + a], i, a), l === et && (l = this._$AH[a]), r || (r = !pt(l) || l !== this._$AH[a]), l === b ? t = b : t !== b && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ii extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
class ni extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== b);
  }
}
class si extends Pt {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = it(this, t, i, 0) ?? b) === et) return;
    const n = this._$AH, s = t === b && n !== b || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== b && (n === b || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oi {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    it(this, t);
  }
}
const ri = at.litHtmlPolyfillSupport;
ri?.(ft, gt), (at.litHtmlVersions ?? (at.litHtmlVersions = [])).push("3.3.2");
const ai = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = i?.renderBefore ?? null;
    n._$litPart$ = s = new gt(t.insertBefore(ut(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis;
let L = class extends tt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const t = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ai(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return et;
  }
};
L._$litElement$ = !0, L.finalized = !0, ct.litElementHydrateSupport?.({ LitElement: L });
const ci = ct.litElementPolyfillSupport;
ci?.({ LitElement: L });
(ct.litElementVersions ?? (ct.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = { attribute: !0, type: String, converter: $t, reflect: !1, hasChanged: Wt }, di = (e = li, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, e, c), c;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function T(e) {
  return (t, i) => typeof i == "object" ? di(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(e) {
  return T({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hi = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ui = { CHILD: 2 }, pi = (e) => (...t) => ({ _$litDirective$: e, values: t });
class fi {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, n) {
    this._$Ct = t, this._$AM = i, this._$Ci = n;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const n of i) n._$AO?.(t, !1), lt(n, t);
  return !0;
}, At = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, Me = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), yi(t);
  }
};
function gi(e) {
  this._$AN !== void 0 ? (At(this), this._$AM = e, Me(this)) : this._$AM = e;
}
function mi(e, t = !1, i = 0) {
  const n = this._$AH, s = this._$AN;
  if (s !== void 0 && s.size !== 0) if (t) if (Array.isArray(n)) for (let o = i; o < n.length; o++) lt(n[o], !1), At(n[o]);
  else n != null && (lt(n, !1), At(n));
  else lt(this, e);
}
const yi = (e) => {
  e.type == ui.CHILD && (e._$AP ?? (e._$AP = mi), e._$AQ ?? (e._$AQ = gi));
};
class bi extends fi {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, n) {
    super._$AT(t, i, n), Me(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (lt(this, t), At(this));
  }
  setValue(t) {
    if (hi(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = t, this._$Ct._$AI(i, this, 0);
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
const Pe = () => new wi();
class wi {
}
const Ft = /* @__PURE__ */ new WeakMap(), Ee = pi(class extends bi {
  render(e) {
    return b;
  }
  update(e, [t]) {
    const i = t !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), b;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let i = Ft.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Ft.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? Ft.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), St = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], dt = ["sensor", "switch", "camera", "button", "custom"], Ut = ["toggle", "more-info", "none"], vi = ["javascript:", "vbscript:", "data:", "file:"];
function Te(e, t = "card_config") {
  const i = [], n = /* @__PURE__ */ new WeakSet(), s = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const c = o.trim().toLowerCase();
        for (const a of vi)
          if (c.startsWith(a)) {
            i.push({ path: r, value: o, scheme: a });
            return;
          }
        return;
      }
      if (typeof o == "object" && !n.has(o)) {
        if (n.add(o), Array.isArray(o)) {
          for (let c = 0; c < o.length; c++) s(o[c], `${r}[${c}]`);
          return;
        }
        for (const [c, a] of Object.entries(o))
          s(a, `${r}.${c}`);
      }
    }
  };
  return s(e, t), i;
}
function xi(e, t = "card_config") {
  const i = Te(e, t);
  if (i.length === 0) return;
  const n = i[0];
  throw new Error(
    `Unsafe URL scheme '${n.scheme}' in ${n.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class qt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const re = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function f(e, t) {
  throw new qt(`${e}: ${t}`);
}
function Gt(e, t) {
  (!e || typeof e != "object") && f(t, "must be an object with x and y");
  const i = e, n = i.x, s = i.y;
  (typeof n != "number" || !Number.isFinite(n)) && f(`${t}.x`, "must be a finite number"), (typeof s != "number" || !Number.isFinite(s)) && f(`${t}.y`, "must be a finite number");
  const o = n, r = s;
  return (o < 0 || o > 100) && f(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && f(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function ae(e, t) {
  (typeof e != "string" || !e.length) && f(t, "must be a non-empty string");
  const i = e;
  return re.some((s) => i.startsWith(s)) || f(
    t,
    `must start with one of ${re.join(", ")} (got "${i.slice(0, 40)}")`
  ), i;
}
function $i(e, t, i) {
  const n = `nodes[${t}]`;
  (!e || typeof e != "object") && f(n, "must be an object");
  const s = e, o = s.id;
  (typeof o != "string" || !o.length) && f(`${n}.id`, "must be a non-empty string");
  const r = o;
  i.has(r) && f(`${n}.id`, `duplicate node id "${r}"`), i.add(r);
  const c = Gt(s.position, `${n}.position`), a = { id: r, position: c };
  return typeof s.entity == "string" && (a.entity = s.entity), typeof s.label == "string" && (a.label = s.label), typeof s.color == "string" && (a.color = s.color), typeof s.size == "number" && (a.size = s.size), typeof s.show_label == "boolean" && (a.show_label = s.show_label), typeof s.show_value == "boolean" && (a.show_value = s.show_value), a;
}
function _i(e, t, i, n) {
  const s = `flows[${t}]`;
  (!e || typeof e != "object") && f(s, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && f(`${s}.id`, "must be a non-empty string");
  const c = r;
  i.has(c) && f(`${s}.id`, `duplicate flow id "${c}"`), i.add(c);
  const a = o.from_node;
  (typeof a != "string" || !n.has(a)) && f(`${s}.from_node`, `references unknown node "${String(a)}"`);
  const l = o.to_node;
  (typeof l != "string" || !n.has(l)) && f(`${s}.to_node`, `references unknown node "${String(l)}"`);
  const d = o.entity;
  (typeof d != "string" || !d.length) && f(`${s}.entity`, "must be a non-empty entity id");
  const h = o.waypoints;
  let u = [];
  h !== void 0 && (Array.isArray(h) || f(`${s}.waypoints`, "must be an array (may be empty or omitted)"), u = h.map(
    (g, w) => Gt(g, `${s}.waypoints[${w}]`)
  ));
  const p = {
    id: c,
    from_node: a,
    to_node: l,
    entity: d,
    waypoints: u
  };
  if (typeof o.domain == "string" && (St.includes(o.domain) || f(`${s}.domain`, `must be one of ${St.join(", ")}`), p.domain = o.domain), typeof o.color == "string" && (p.color = o.color), typeof o.color_positive == "string" && (p.color_positive = o.color_positive), typeof o.color_negative == "string" && (p.color_negative = o.color_negative), typeof o.threshold == "number" && (p.threshold = o.threshold), typeof o.reverse == "boolean" && (p.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const g = o.speed_multiplier;
    (g < 0.1 || g > 5) && f(`${s}.speed_multiplier`, "must be between 0.1 and 5.0"), p.speed_multiplier = g;
  }
  return o.speed_curve_override !== void 0 && (p.speed_curve_override = Ai(
    o.speed_curve_override,
    `${s}.speed_curve_override`
  )), p;
}
function Ai(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && f(t, "must be an object");
  const i = e, n = {};
  function s(u) {
    const p = i[u];
    if (p !== void 0)
      return (typeof p != "number" || !Number.isFinite(p) || p <= 0) && f(`${t}.${u}`, "must be a positive finite number"), p;
  }
  function o(u) {
    const p = i[u];
    if (p !== void 0)
      return (typeof p != "number" || !Number.isFinite(p) || p < 50) && f(`${t}.${u}`, "must be a finite number ≥ 50 (milliseconds)"), p;
  }
  const r = s("threshold");
  r !== void 0 && (n.threshold = r);
  const c = s("p50");
  c !== void 0 && (n.p50 = c);
  const a = s("peak");
  a !== void 0 && (n.peak = a);
  const l = o("max_duration");
  l !== void 0 && (n.max_duration = l);
  const d = o("min_duration");
  if (d !== void 0 && (n.min_duration = d), i.steepness !== void 0) {
    const u = i.steepness;
    (typeof u != "number" || !Number.isFinite(u) || u <= 0) && f(`${t}.steepness`, "must be a positive finite number"), n.steepness = u;
  }
  n.max_duration !== void 0 && n.min_duration !== void 0 && n.min_duration >= n.max_duration && f(t, "min_duration must be < max_duration");
  const h = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const u of Object.keys(i))
    h.has(u) || f(`${t}.${u}`, `unknown key (allowed: ${[...h].join(", ")})`);
  return n;
}
function B(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e <= 0) && f(t, "must be a positive finite number"), e;
}
function Si(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && f("defaults", "must be an object");
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = B(t.node_radius, "defaults.node_radius")), t.camera_refresh_interval !== void 0 && (i.camera_refresh_interval = B(t.camera_refresh_interval, "defaults.camera_refresh_interval")), t.burst_trigger_ratio !== void 0) {
    const n = B(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    n > 1 && f("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), i.burst_trigger_ratio = n;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = B(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = B(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = B(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = B(t.line_width, "defaults.line_width")), i;
}
function ki(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && f("domain_colors", "must be an object");
  const t = e, i = {};
  for (const n of ["solar", "grid", "battery", "load"])
    t[n] !== void 0 && (typeof t[n] != "string" && f(`domain_colors.${n}`, "must be a string colour value"), i[n] = t[n]);
  return i;
}
function wt(e) {
  if (!e || typeof e != "object") throw new qt("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && f("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), St.includes(t.domain) || f("domain", `must be one of ${St.join(", ")}`);
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && f("background", "must be an object when provided");
  const n = i ?? {}, o = { default: n.default === void 0 || n.default === "" ? "" : ae(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && f("background.weather_entity", "must be a string entity id"), o.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && f("background.weather_states", "must be an object mapping state strings to image URLs");
    const p = Object.entries(n.weather_states), g = {};
    for (const [w, y] of p)
      g[w] = ae(y, `background.weather_states.${w}`);
    o.weather_states = g;
  }
  n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && f("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = n.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || f("nodes", "must be an array");
  const c = /* @__PURE__ */ new Set(), a = r.map((p, g) => $i(p, g, c));
  a.length === 0 && f("nodes", "at least one node is required");
  const l = t.flows;
  Array.isArray(l) || f("flows", "must be an array");
  const d = /* @__PURE__ */ new Set(), h = l.map(
    (p, g) => _i(p, g, d, c)
  ), u = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: a,
    flows: h
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && f("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), u.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && f("fullscreen", "must be a boolean"), u.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && f("edit_mode_password", "must be a string"), u.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || f("overlays", "must be an array");
    const p = /* @__PURE__ */ new Set();
    u.overlays = t.overlays.map(
      (g, w) => Ci(g, w, p)
    );
  }
  return t.defaults !== void 0 && (u.defaults = Si(t.defaults)), t.domain_colors !== void 0 && (u.domain_colors = ki(t.domain_colors)), u;
}
function Ci(e, t, i) {
  const n = `overlays[${t}]`;
  (!e || typeof e != "object") && f(n, "must be an object");
  const s = e, o = s.type;
  (typeof o != "string" || !dt.includes(o)) && f(`${n}.type`, `must be one of ${dt.join(", ")}`);
  const r = s.id;
  (typeof r != "string" || !r.length) && f(`${n}.id`, "must be a non-empty string"), i.has(r) && f(`${n}.id`, `duplicate overlay id "${r}"`), i.add(r);
  const c = Gt(s.position, `${n}.position`), a = {
    id: r,
    type: o,
    position: c
  };
  if (s.entity !== void 0 && ((typeof s.entity != "string" || !s.entity.length) && f(`${n}.entity`, "must be a non-empty entity id"), a.entity = s.entity), (o === "sensor" || o === "switch" || o === "camera") && !a.entity && f(`${n}.entity`, `is required for overlay type "${o}"`), s.label !== void 0 && (typeof s.label != "string" && f(`${n}.label`, "must be a string"), a.label = s.label), s.size !== void 0) {
    const l = s.size;
    (!l || typeof l != "object") && f(`${n}.size`, "must be an object with width and height");
    const d = l, h = d.width, u = d.height;
    (typeof h != "number" || !Number.isFinite(h) || h <= 0 || h > 100) && f(`${n}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof u != "number" || !Number.isFinite(u) || u <= 0 || u > 100) && f(`${n}.size.height`, "must be a positive number ≤ 100 (percent of card)"), a.size = { width: h, height: u };
  }
  if (s.tap_action !== void 0) {
    const l = s.tap_action;
    (!l || typeof l != "object") && f(`${n}.tap_action`, "must be an object");
    const h = l.action;
    (typeof h != "string" || !Ut.includes(h)) && f(`${n}.tap_action.action`, `must be one of ${Ut.join(", ")}`), a.tap_action = { action: h };
  }
  if (s.card_config !== void 0) {
    const l = s.card_config;
    (!l || typeof l != "object" || Array.isArray(l)) && f(`${n}.card_config`, "must be an object"), o !== "custom" && f(`${n}.card_config`, 'is only valid when type === "custom"');
    const d = Te(l, `${n}.card_config`);
    if (d.length) {
      const h = d[0];
      f(
        h.path,
        `unsafe URL scheme "${h.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in custom overlay configs`
      );
    }
    a.card_config = l;
  }
  if (o === "custom" && !a.card_config && f(`${n}.card_config`, 'is required when type === "custom"'), s.refresh_interval !== void 0) {
    o !== "camera" && f(`${n}.refresh_interval`, "is only valid for camera overlays");
    const l = s.refresh_interval;
    (typeof l != "number" || !Number.isFinite(l) || l <= 0) && f(`${n}.refresh_interval`, "must be a positive number (seconds)"), a.refresh_interval = l;
  }
  return s.offline_label !== void 0 && (o !== "camera" && f(`${n}.offline_label`, "is only valid for camera overlays"), typeof s.offline_label != "string" && f(`${n}.offline_label`, "must be a string"), a.offline_label = s.offline_label), a;
}
function Kt(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function kt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function Ne(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const n = e[i - 1], s = e[i];
    if (!n || !s) continue;
    const o = s.x - n.x, r = s.y - n.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function Mi(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = Ne(e), n = Kt(t, 0, 1) * i;
  let s = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], c = e[o], a = c.x - r.x, l = c.y - r.y, d = Math.sqrt(a * a + l * l);
    if (s + d >= n) {
      const h = d === 0 ? 0 : (n - s) / d;
      return { x: r.x + a * h, y: r.y + l * h };
    }
    s += d;
  }
  return { ...e[e.length - 1] };
}
function ce(e, t) {
  if (e.length === 0) return "";
  const [i, ...n] = e;
  if (!i) return "";
  const s = kt(i, t), o = [`M ${s.x.toFixed(2)} ${s.y.toFixed(2)}`];
  for (const r of n) {
    const c = kt(r, t);
    o.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
  }
  return o.join(" ");
}
function It(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
const G = 9e3, K = 700, J = 1.5;
function H(e, t) {
  const { threshold: i, p50: n, max_duration: s, min_duration: o, steepness: r } = t, c = Math.abs(e);
  if (!(n > 0) || !(i > 0)) return s;
  const a = Math.max(c, i), l = Math.log10(a / n), d = 1 / (1 + Math.exp(-r * l));
  return s - d * (s - o);
}
function Oe(e, t) {
  const i = e.speed_curve_override ?? {}, n = i.threshold ?? e.threshold ?? t.threshold, s = i.p50 ?? t.p50, o = i.peak ?? t.peak, r = i.max_duration ?? G, c = i.min_duration ?? K, a = i.steepness ?? J;
  return { threshold: n, p50: s, peak: o, max_duration: r, min_duration: c, steepness: a };
}
function Pi(e, t, i) {
  if (!i || !t) return { value: e, factor: 1 };
  const n = t.trim();
  if (!n) return { value: e, factor: 1 };
  if (Object.prototype.hasOwnProperty.call(i, n)) {
    const r = i[n] ?? 1;
    return { value: e * r, factor: r, matchedUnit: n };
  }
  const s = n.toLowerCase(), o = Object.entries(i).filter(
    ([r]) => r.toLowerCase() === s
  );
  if (o.length === 1) {
    const [r, c] = o[0];
    return { value: e * c, factor: c, matchedUnit: r };
  }
  return { value: e, factor: 1 };
}
function Fe(e, t) {
  let i = null, n = null;
  const s = (...o) => {
    n = o, i !== null && clearTimeout(i), i = setTimeout(() => {
      i = null, n && e(...n), n = null;
    }, t);
  };
  return s.cancel = () => {
    i !== null && (clearTimeout(i), i = null), n = null;
  }, s;
}
function vt(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), n = Number.parseInt(t[2], 10);
  if (!(!i || !n))
    return i / n;
}
const Ei = {
  domain: "energy",
  default_color_positive: "#FFD700",
  default_color_negative: "#4ADE80",
  shape: "dot",
  glow: !0,
  unit_label: "W",
  unit_scale: {
    W: 1,
    Wh: 1,
    kW: 1e3,
    kWh: 1e3,
    MW: 1e6,
    mW: 1e-3
  },
  threshold: 30,
  p50: 800,
  peak: 1e4,
  burst_density_multiplier: 1.5,
  speed_curve(e) {
    return H(e, {
      threshold: 30,
      p50: 800,
      max_duration: G,
      min_duration: K,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, Ti = {
  domain: "water",
  default_color_positive: "#3B82F6",
  // v1.0.5: previously identical to positive, meaning bidirectional water
  // flows (mains supply vs greywater return) were visually indistinguishable
  // except for the direction of motion along the path. Cyan sits in the
  // same domain family so negative still reads as "water", just flipped.
  default_color_negative: "#06B6D4",
  shape: "wave",
  glow: !1,
  unit_label: "L/min",
  threshold: 0.3,
  p50: 6,
  peak: 60,
  burst_density_multiplier: 1.5,
  speed_curve(e) {
    return H(e, {
      threshold: 0.3,
      p50: 6,
      max_duration: G,
      min_duration: K,
      steepness: J
    });
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, Ni = {
  domain: "network",
  default_color_positive: "#10B981",
  default_color_negative: "#F59E0B",
  shape: "square",
  glow: !1,
  unit_label: "Mbps",
  threshold: 0.05,
  p50: 50,
  peak: 1e4,
  burst_density_multiplier: 1.5,
  speed_curve(e) {
    return H(e, {
      threshold: 0.05,
      p50: 50,
      max_duration: G,
      min_duration: K,
      steepness: J
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(Kt(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, Oi = {
  domain: "hvac",
  default_color_positive: "#A78BFA",
  default_color_negative: "#60A5FA",
  shape: "wave",
  glow: !1,
  unit_label: "CFM",
  threshold: 5,
  p50: 200,
  peak: 3e3,
  burst_density_multiplier: 1.5,
  speed_curve(e) {
    return H(e, {
      threshold: 5,
      p50: 200,
      max_duration: G,
      min_duration: K,
      steepness: J
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return Kt(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, Fi = {
  domain: "gas",
  default_color_positive: "#FB923C",
  // v1.0.5: previously identical to positive. Darker amber stays in the
  // warm/combustion family so the hue still reads as "gas" but clearly
  // signals reverse flow (rarely meaningful in residential settings, but
  // necessary so a pulse-shape flow isn't ambiguous when sign flips).
  default_color_negative: "#A16207",
  shape: "pulse",
  glow: !0,
  unit_label: "m³/h",
  threshold: 5e-3,
  p50: 0.5,
  peak: 10,
  burst_density_multiplier: 1.5,
  speed_curve(e) {
    return H(e, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: G,
      min_duration: K,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, Re = {
  domain: "generic",
  default_color_positive: "#A78BFA",
  // v1.0.5: maximum-contrast pair for arbitrary bidirectional sensors.
  // Violet → emerald is clearly distinguishable at any particle size and
  // any glow radius, which matters most for the generic profile since we
  // have no domain-specific hue vocabulary to draw from.
  default_color_negative: "#34D399",
  shape: "dot",
  glow: !1,
  unit_label: "",
  threshold: 1,
  p50: 100,
  peak: 1e4,
  burst_density_multiplier: 1.5,
  speed_curve(e) {
    return H(e, {
      threshold: 1,
      p50: 100,
      max_duration: G,
      min_duration: K,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, le = {
  energy: Ei,
  water: Ti,
  network: Ni,
  hvac: Oi,
  gas: Fi,
  generic: Re
};
function ht(e) {
  return e && e in le ? le[e] : Re;
}
const Ri = "#CCCCCC";
function Ui(e, t, i) {
  if (e !== "energy") return;
  const n = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(n)) return i?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(n)) return i?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(n)) return i?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(n))
    return i?.load ?? "#FF8C1E";
}
function Ct(e, t, i, n, s) {
  const o = e.color ?? Ui(i, e.id, s);
  return n >= 0 ? e.color_positive ?? o ?? t.default_color_positive : e.color_negative ?? o ?? t.default_color_negative;
}
const Ii = "[FlowMe]";
function k(...e) {
  console.warn(Ii, ...e);
}
const zi = "[FlowMe Renderer]";
function C(...e) {
  console.warn(zi, ...e);
}
const P = "http://www.w3.org/2000/svg", mt = "http://www.w3.org/1999/xlink";
function Di() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const yt = Di(), Li = 2e3, Hi = 3, de = 5, ji = 9, Bi = 2, Wi = 8, Vi = 14, qi = 0.9, Gi = 5e3, he = 20;
class zt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Fe(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set();
  }
  async init(t, i) {
    C("init called — container:", t, "| container size:", t.getBoundingClientRect(), "| flows:", i.flows.length, "| nodes:", i.nodes.length), C("init config flows:", i.flows.map((s) => ({ id: s.id, entity: s.entity, from: s.from_node, to: s.to_node, waypoints: s.waypoints.length, domain: s.domain }))), this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((s) => [s.id, s]));
    const n = document.createElementNS(P, "svg");
    n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("preserveAspectRatio", "none"), n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", n.style.overflow = "visible", this.svg = n, t.appendChild(n), C("<svg> element appended to container. Parent shadow-root?", t.getRootNode().constructor.name), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t);
  }
  updateFlow(t, i) {
    if (!this.flowsById.has(t)) {
      C("updateFlow called for UNKNOWN flowId:", t);
      return;
    }
    C("updateFlow:", t, "value=", i, "→ queued, will flush in 200ms"), this.latestValues.set(t, i), this.applyUpdate();
  }
  destroy() {
    this.applyUpdate.cancel(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear();
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
    const i = document.createElementNS(P, "defs");
    this.svg.appendChild(i);
    const n = new Map(this.config.nodes.map((s) => [s.id, s]));
    for (const s of this.config.flows) {
      const o = n.get(s.from_node), r = n.get(s.to_node);
      if (!o || !r) continue;
      const a = this.profileFor(s).shape, l = [o.position, ...s.waypoints, r.position], d = `flowme-path-${s.id}`, h = document.createElementNS(P, "path");
      h.setAttribute("id", d), h.setAttribute("d", ce(l, t)), h.setAttribute("fill", "none"), i.appendChild(h);
      const u = document.createElementNS(P, "g");
      u.setAttribute("data-flow-id", s.id);
      const p = document.createElementNS(P, "use");
      p.setAttributeNS(mt, "href", `#${d}`), p.setAttribute("href", `#${d}`);
      const g = this.config?.defaults?.line_width ?? Bi;
      p.setAttribute("stroke", this.primaryColor(s)), p.setAttribute("stroke-opacity", "0.2"), p.setAttribute("stroke-width", String(g)), p.setAttribute("stroke-linecap", "round"), p.setAttribute("stroke-linejoin", "round"), p.setAttribute("fill", "none"), u.appendChild(p);
      const w = {
        group: u,
        path: h,
        pathId: d,
        shape: a,
        particles: []
      };
      if (a === "wave") {
        const x = document.createElementNS(P, "use");
        x.setAttributeNS(mt, "href", `#${d}`), x.setAttribute("href", `#${d}`), x.setAttribute("stroke", this.primaryColor(s)), x.setAttribute("stroke-width", String(Wi)), x.setAttribute("stroke-opacity", "0.9"), x.setAttribute("stroke-linecap", "round"), x.setAttribute("stroke-linejoin", "round"), x.setAttribute("fill", "none"), x.setAttribute("stroke-dasharray", "14 10"), x.setAttribute("stroke-dashoffset", "0"), x.setAttribute("opacity", "0"), u.appendChild(x), w.waveStroke = x;
      } else a === "pulse" && (w.pulseCircles = []);
      this.svg.appendChild(u), this.flowNodes.set(s.id, w);
      const y = h.getAttribute("d") ?? "";
      C(
        "flow element appended:",
        s.id,
        "| pathId=",
        d,
        "| d=",
        y,
        "| shape=",
        a,
        "| group outerHTML[0..200]=",
        u.outerHTML.slice(0, 200)
      );
    }
    C("buildSkeleton complete. flowNodes map size=", this.flowNodes.size, "| <svg> children=", this.svg.children.length);
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const i = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const s = this.flowNodes.get(n.id);
      if (!s) continue;
      const o = i.get(n.from_node), r = i.get(n.to_node);
      if (!o || !r) continue;
      const c = [o.position, ...n.waypoints, r.position];
      s.path.setAttribute("d", ce(c, t)), s.shape === "pulse" && this.applyFlow(n.id, this.latestValues.get(n.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues)
      this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const n = this.flowsById.get(t), s = this.flowNodes.get(t);
    if (!n || !s) {
      C("applyFlow SKIP (unknown flow or no DOM):", t, "hasFlow?", !!n, "hasDom?", !!s);
      return;
    }
    const o = this.profileFor(n), r = Oe(n, o), c = yt ? 0 : r.threshold, a = Math.abs(i), l = yt || a >= c;
    if (C(
      "applyFlow:",
      t,
      "value=",
      i,
      "| magnitude=",
      a,
      "| threshold=",
      c,
      "| visible=",
      l,
      "| DEBUG=",
      yt,
      "| curve params (resolved)=",
      r,
      "| override=",
      n.speed_curve_override ?? "(none)"
    ), !l) {
      this.setGroupVisible(s, !1), C("applyFlow → flow", t, "hidden (below threshold). No animation will run.");
      return;
    }
    this.setGroupVisible(s, !0);
    const d = n.speed_multiplier ?? 1, h = H(a, r), u = yt ? Li : Math.max(50, h * d), p = i < 0 != (n.reverse === !0) ? -1 : 1, g = n.domain ?? this.config?.domain, w = Ct(n, o, g, p, this.config?.domain_colors), y = this.updateBurstState(t, a, r, o);
    switch (C(
      "applyFlow → computed:",
      t,
      "| domain=",
      g ?? "(default)",
      "| shape=",
      s.shape,
      "| sigmoidSpeedCurve(mag)=",
      h,
      "| speedMult=",
      d,
      "| dur=",
      u,
      "ms",
      "| direction=",
      p,
      "| resolved color=",
      w,
      "| burstMultiplier=",
      y,
      "| flow.color=",
      n.color,
      "| flow.color_positive=",
      n.color_positive,
      "| flow.color_negative=",
      n.color_negative,
      "| profile.default_color_positive=",
      o.default_color_positive
    ), s.shape) {
      case "wave":
        this.applyWave(s, o, u, w, p);
        break;
      case "pulse":
        this.applyPulse(s, n, o, i, u, w, y);
        break;
      case "square":
        this.applyParticles(s, n, o, i, u, w, p, "square", y);
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(s, n, o, i, u, w, p, "dot", y);
        break;
    }
  }
  /**
   * Track whether a flow has sustained ≥ 90 % of its resolved `peak`
   * (override-aware) for at least 5 s. Return the particle-count
   * multiplier to apply right now (1 outside burst, profile's
   * `burst_density_multiplier` inside — default 1.5).
   */
  updateBurstState(t, i, n, s) {
    const o = n.peak, r = this.config?.defaults?.burst_trigger_ratio ?? qi, c = this.config?.defaults?.burst_sustain_ms ?? Gi, a = o * r, l = i >= a, d = performance.now();
    if (!l)
      return this.burstActive.has(t) && (C("burst EXIT:", t, "magnitude=", i, "droppedBelow=", a.toFixed(2)), this.burstActive.delete(t)), this.burstEnteredAt.delete(t), 1;
    let h = this.burstEnteredAt.get(t);
    h === void 0 && (h = d, this.burstEnteredAt.set(t, h));
    const u = d - h;
    if (u < c)
      return C(
        "burst PENDING:",
        t,
        "magnitude=",
        i,
        "| above",
        a.toFixed(2),
        "for",
        Math.round(u),
        "ms of",
        c
      ), 1;
    const p = s.burst_density_multiplier ?? 1.5;
    return this.burstActive.has(t) || (C(
      "burst ENTER:",
      t,
      "| sustained ≥",
      (r * 100).toFixed(0) + "%",
      "of peak",
      o,
      "for",
      Math.round(u),
      "ms → density ×" + p
    ), this.burstActive.add(t)), p;
  }
  setGroupVisible(t, i) {
    const n = i ? "1" : "0";
    for (const s of t.particles) s.shape.setAttribute("opacity", n);
    if (t.waveStroke && t.waveStroke.setAttribute("opacity", i ? "0.9" : "0"), t.pulseCircles)
      for (const s of t.pulseCircles) s.circle.setAttribute("opacity", n);
  }
  applyParticles(t, i, n, s, o, r, c, a, l) {
    const d = Math.max(
      1,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(s) : Hi
      )
    ), h = this.config?.defaults?.burst_max_particles ?? he, u = Math.min(
      h,
      Math.max(1, Math.round(d * l))
    );
    if (l !== 1 && C("applyParticles burst → base=", d, "× mult=", l, "→ final=", u), t.particles.length !== u) {
      for (const g of t.particles) g.shape.remove();
      t.particles = [];
      for (let g = 0; g < u; g++)
        t.particles.push(this.makeParticle(t, a, r, n.glow));
    }
    const p = `${(o / 1e3).toFixed(3)}s`;
    C("applyParticles:", t.pathId, "| kind=", a, "| count=", t.particles.length, "| dur=", p, "| color=", r, "| direction=", c);
    for (let g = 0; g < t.particles.length; g++) {
      const w = t.particles[g];
      if (!w) continue;
      w.shape.setAttribute("fill", r), n.glow && (w.shape.style.color = r);
      const y = document.createElementNS(P, "animateMotion");
      y.setAttribute("repeatCount", "indefinite"), y.setAttribute("dur", p), y.setAttribute("rotate", "auto"), y.setAttribute(
        "begin",
        `${(-o * g / (t.particles.length * 1e3)).toFixed(3)}s`
      ), c < 0 && (y.setAttribute("keyPoints", "1;0"), y.setAttribute("keyTimes", "0;1"));
      const x = document.createElementNS(P, "mpath");
      x.setAttributeNS(mt, "href", `#${t.pathId}`), x.setAttribute("href", `#${t.pathId}`), y.appendChild(x), w.animateMotion.replaceWith(y), w.animateMotion = y, w.shape.appendChild(y), g === 0 && C(
        "animateMotion[0] installed on",
        t.pathId,
        "| dur=",
        y.getAttribute("dur"),
        "| mpath href=#" + t.pathId,
        "| element outerHTML[0..200]=",
        y.outerHTML.slice(0, 200),
        "| parent shape outerHTML[0..200]=",
        w.shape.outerHTML.slice(0, 200)
      );
    }
    k("SVG flow created:", t.pathId, "pathD=", t.path.getAttribute("d"), "dur=", p, "particles=", t.particles.length);
  }
  applyWave(t, i, n, s, o) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", s);
    const c = r.querySelector("animate");
    c && c.remove();
    const a = document.createElementNS(P, "animate");
    a.setAttribute("attributeName", "stroke-dashoffset"), a.setAttribute("from", o > 0 ? "0" : "-24"), a.setAttribute("to", o > 0 ? "-24" : "0"), a.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), a.setAttribute("repeatCount", "indefinite"), r.appendChild(a);
  }
  applyPulse(t, i, n, s, o, r, c) {
    if (!this.svg) return;
    const a = t.group, l = new Map(this.config?.nodes.map((S) => [S.id, S]) ?? []), d = l.get(i.from_node), h = l.get(i.to_node);
    if (!d || !h) return;
    const u = [d.position, ...i.waypoints, h.position], p = Ne(u), g = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(s) : Math.max(3, Math.floor(p / 15))
      )
    ), w = this.config?.defaults?.burst_max_particles ?? he, y = Math.min(
      w,
      Math.max(2, Math.round(g * c))
    );
    c !== 1 && C("applyPulse burst → base=", g, "× mult=", c, "→ final=", y);
    const x = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== y) {
      if (t.pulseCircles) for (const S of t.pulseCircles) S.circle.remove();
      t.pulseCircles = [];
      for (let S = 0; S < y; S++) {
        const v = document.createElementNS(P, "circle");
        v.setAttribute("r", "0"), v.setAttribute("fill", r), v.setAttribute("opacity", "0"), n.glow && v.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), v.style.color = r;
        const N = document.createElementNS(P, "animate");
        N.setAttribute("attributeName", "r"), N.setAttribute("values", `0;${Vi};0`), N.setAttribute("repeatCount", "indefinite"), v.appendChild(N);
        const O = document.createElementNS(P, "animate");
        O.setAttribute("attributeName", "opacity"), O.setAttribute("values", "0;1;0"), O.setAttribute("repeatCount", "indefinite"), v.appendChild(O), a.appendChild(v), t.pulseCircles.push({ circle: v, animateRadius: N, animateOpacity: O });
      }
    }
    for (let S = 0; S < t.pulseCircles.length; S++) {
      const v = t.pulseCircles[S];
      if (!v) continue;
      const N = (S + 0.5) / t.pulseCircles.length, O = Mi(u, N), st = kt(O, x);
      v.circle.setAttribute("cx", st.x.toFixed(2)), v.circle.setAttribute("cy", st.y.toFixed(2)), v.circle.setAttribute("fill", r), v.circle.style.color = r;
      const F = `${(o / 1e3).toFixed(3)}s`, R = `${(-o * S / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      v.animateRadius.setAttribute("dur", F), v.animateRadius.setAttribute("begin", R), v.animateOpacity.setAttribute("dur", F), v.animateOpacity.setAttribute("begin", R);
    }
  }
  makeParticle(t, i, n, s) {
    const o = this.config?.defaults?.dot_radius ?? de;
    let r;
    if (i === "square") {
      const l = o * (ji / de), d = document.createElementNS(P, "rect");
      d.setAttribute("width", String(l)), d.setAttribute("height", String(l)), d.setAttribute("x", String(-l / 2)), d.setAttribute("y", String(-l / 2)), d.setAttribute("rx", "1.5"), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), r = d;
    } else {
      const l = document.createElementNS(P, "circle");
      l.setAttribute("r", String(o)), l.setAttribute("fill", n), l.setAttribute("opacity", "0"), r = l;
    }
    s && (r.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), r.style.color = n);
    const c = document.createElementNS(P, "animateMotion");
    c.setAttribute("repeatCount", "indefinite"), c.setAttribute("dur", "2s");
    const a = document.createElementNS(P, "mpath");
    return a.setAttributeNS(mt, "href", `#${t.pathId}`), a.setAttribute("href", `#${t.pathId}`), c.appendChild(a), r.appendChild(c), t.group.appendChild(r), { shape: r, animateMotion: c };
  }
  profileFor(t) {
    return ht(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t), n = t.domain ?? this.config?.domain;
    return Ct(t, i, n, 1, this.config?.domain_colors);
  }
}
const Ki = `/* eslint-disable no-undef */
/**
 * flowme Paint Worklet.
 *
 * Runs in a sandboxed worklet global scope — no DOM, no network, no storage.
 * Loaded at runtime by the Houdini renderer via
 * \`CSS.paintWorklet.addModule(blobUrl)\`.
 *
 * Consumes these CSS custom properties (all registered by the host before
 * first paint):
 *   --flowme-path       "x1,y1 x2,y2 ..." in pixel coordinates
 *   --flowme-progress   0..1 animated by host via a @keyframes rule
 *   --flowme-color      stroke/fill colour
 *   --flowme-glow       "1" or "0" — enable soft glow underneath particles
 *   --flowme-shape      "dot" | "square" | "wave" | "pulse"
 *   --flowme-count      particle count (integer)
 *   --flowme-radius     base particle radius in px
 *   --flowme-line       line stroke width in px (wave uses this as the band width)
 *   --flowme-amp        wave amplitude in px (shape='wave' only)
 *   --flowme-direction  "1" or "-1"
 */

class FlowmePainter {
  static get inputProperties() {
    return [
      '--flowme-path',
      '--flowme-progress',
      '--flowme-color',
      '--flowme-glow',
      '--flowme-shape',
      '--flowme-count',
      '--flowme-radius',
      '--flowme-line',
      '--flowme-amp',
      '--flowme-direction',
    ];
  }

  paint(ctx, size, props) {
    const pathStr = String(props.get('--flowme-path') || '').trim();
    if (!pathStr) return;
    const points = parsePath(pathStr);
    if (points.length < 2) return;

    const progress = clamp01(parseFloat(String(props.get('--flowme-progress') || '0')) || 0);
    const color = String(props.get('--flowme-color') || '#FFFFFF').trim() || '#FFFFFF';
    const glow = String(props.get('--flowme-glow') || '0').trim() === '1';
    const shape = String(props.get('--flowme-shape') || 'dot').trim() || 'dot';
    const count = Math.max(1, Math.round(parseFloat(String(props.get('--flowme-count') || '3')) || 3));
    const radius = Math.max(1, parseFloat(String(props.get('--flowme-radius') || '5')) || 5);
    const lineWidth = Math.max(1, parseFloat(String(props.get('--flowme-line') || '2')) || 2);
    const amplitude = Math.max(0, parseFloat(String(props.get('--flowme-amp') || '4')) || 0);
    const direction = parseFloat(String(props.get('--flowme-direction') || '1')) < 0 ? -1 : 1;

    // faint base stroke for orientation
    drawPolyline(ctx, points, color, lineWidth, 0.2);

    switch (shape) {
      case 'wave':
        drawWave(ctx, points, color, lineWidth, amplitude, progress, direction);
        break;
      case 'pulse':
        drawPulse(ctx, points, color, radius, count, progress, glow);
        break;
      case 'square':
        drawParticles(ctx, points, color, count, progress, direction, 'square', radius, glow);
        break;
      case 'dot':
      case 'gradient':
      default:
        drawParticles(ctx, points, color, count, progress, direction, 'dot', radius, glow);
    }
  }
}

function clamp01(v) {
  if (!Number.isFinite(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function parsePath(str) {
  const points = [];
  const tokens = str.split(/\\s+/);
  for (const token of tokens) {
    const parts = token.split(',');
    if (parts.length !== 2) continue;
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (Number.isFinite(x) && Number.isFinite(y)) points.push({ x, y });
  }
  return points;
}

function totalLength(points) {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return total;
}

function samplePath(points, t) {
  if (points.length === 0) return { x: 0, y: 0, angle: 0 };
  if (points.length === 1) return { x: points[0].x, y: points[0].y, angle: 0 };
  const target = clamp01(t) * totalLength(points);
  let travelled = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const segLen = Math.sqrt(dx * dx + dy * dy);
    if (travelled + segLen >= target) {
      const local = segLen === 0 ? 0 : (target - travelled) / segLen;
      return {
        x: a.x + dx * local,
        y: a.y + dy * local,
        angle: Math.atan2(dy, dx),
      };
    }
    travelled += segLen;
  }
  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  return { x: last.x, y: last.y, angle: Math.atan2(last.y - prev.y, last.x - prev.x) };
}

function drawPolyline(ctx, points, color, width, alpha) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = alpha;
  ctx.stroke();
  ctx.restore();
}

function drawParticles(ctx, points, color, count, progress, direction, kind, radius, glow) {
  for (let i = 0; i < count; i++) {
    const base = (i / count + progress * direction) % 1;
    const t = base < 0 ? base + 1 : base;
    const p = samplePath(points, t);
    ctx.save();
    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
    }
    ctx.fillStyle = color;
    if (kind === 'square') {
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      const size = radius * 1.8;
      ctx.fillRect(-size / 2, -size / 2, size, size);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawPulse(ctx, points, color, radius, count, progress, glow) {
  // stationary rings at N anchor points along the path, each expanding/fading
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const p = samplePath(points, t);
    const local = ((progress + i / count) % 1 + 1) % 1;
    const r = local * (radius * 2.5);
    const alpha = 1 - local;
    if (alpha <= 0) continue;
    ctx.save();
    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
    }
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawWave(ctx, points, color, lineWidth, amplitude, progress, direction) {
  // Sample the path densely and offset each sample perpendicular by a sine
  // term that rolls with \`progress\`. Draws a smooth wavy ribbon along the line.
  const total = totalLength(points);
  if (total <= 0) return;
  const steps = Math.max(48, Math.floor(total / 4));
  const wavelength = Math.max(24, total / 6);
  const pxOffset = progress * wavelength * direction;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const base = samplePath(points, t);
    const phase = ((t * total + pxOffset) / wavelength) * Math.PI * 2;
    const offset = Math.sin(phase) * amplitude;
    const nx = -Math.sin(base.angle);
    const ny = Math.cos(base.angle);
    const x = base.x + nx * offset;
    const y = base.y + ny * offset;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

registerPaint('flowme-painter', FlowmePainter);
`, ue = "flowme-keyframes", Dt = "flowme-cycle", Ji = 5, Xi = 2;
let W = null, pe = !1;
function Yi() {
  if (document.getElementById(ue)) return;
  const e = document.createElement("style");
  e.id = ue, e.textContent = `@keyframes ${Dt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function Zi() {
  if (pe) return;
  const t = CSS.registerProperty?.bind(CSS);
  if (!t) return;
  const i = [
    ["--flowme-progress", "<number>", "0"],
    ["--flowme-count", "<number>", "3"],
    ["--flowme-radius", "<number>", "5"],
    ["--flowme-line", "<number>", "2"],
    ["--flowme-amp", "<number>", "4"],
    ["--flowme-direction", "<number>", "1"]
  ];
  for (const [n, s, o] of i)
    try {
      t({ name: n, syntax: s, inherits: !1, initialValue: o });
    } catch {
    }
  pe = !0;
}
async function Qi() {
  if (W) return W;
  const e = CSS.paintWorklet;
  if (!e)
    return W = Promise.reject(new Error("paintWorklet not available")), W;
  const t = new Blob([Ki], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return W = e.addModule(i).catch((n) => {
    throw W = null, n;
  }).finally(() => {
  }), W;
}
class tn {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Fe(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((s) => [s.id, s])), Yi(), Zi(), await Qi();
    const n = document.createElement("div");
    n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", t.appendChild(n), this.wrapper = n;
    for (const s of i.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = s.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Dt} 2s linear infinite`, o.style.opacity = "0", n.appendChild(o), this.flowDivs.set(s.id, { el: o });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(t);
  }
  updateFlow(t, i) {
    this.flowsById.has(t) && (this.latestValues.set(t, i), this.applyUpdate());
  }
  destroy() {
    this.applyUpdate.cancel(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.wrapper?.remove(), this.wrapper = null, this.flowDivs.clear(), this.flowsById.clear(), this.latestValues.clear(), this.container = null, this.config = null;
  }
  // -- internal --
  containerSize() {
    if (!this.container) return { width: 1, height: 1 };
    const t = this.container.getBoundingClientRect();
    return { width: Math.max(1, t.width), height: Math.max(1, t.height) };
  }
  rebuildPaths() {
    if (!this.config) return;
    const t = this.containerSize(), i = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const s = this.flowDivs.get(n.id);
      if (!s) continue;
      const o = i.get(n.from_node), r = i.get(n.to_node);
      if (!o || !r) continue;
      const l = [o.position, ...n.waypoints, r.position].map((d) => kt(d, t)).map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ");
      s.el.style.setProperty("--flowme-path", `"${l}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues) this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const n = this.flowsById.get(t), s = this.flowDivs.get(t);
    if (!n || !s) return;
    const o = this.profileFor(n), r = Oe(n, o), c = Math.abs(i);
    if (!(c >= r.threshold)) {
      s.el.style.opacity = "0";
      return;
    }
    s.el.style.opacity = "1";
    const l = n.speed_multiplier ?? 1, d = Math.max(50, H(c, r) * l), h = i < 0 != (n.reverse === !0) ? -1 : 1, u = n.domain ?? this.config?.domain, p = Ct(n, o, u, h, this.config?.domain_colors), g = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(i) : 3)
    ), w = o.wave_amplitude_curve ? o.wave_amplitude_curve(i) : 4, y = s.el.style;
    y.setProperty("--flowme-shape", o.shape), y.setProperty("--flowme-color", p), y.setProperty("--flowme-glow", o.glow ? "1" : "0"), y.setProperty("--flowme-count", String(g)), y.setProperty("--flowme-radius", String(Ji)), y.setProperty("--flowme-line", String(Xi)), y.setProperty("--flowme-amp", String(w)), y.setProperty("--flowme-direction", String(h)), y.animation = `${Dt} ${(d / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return ht(t.domain ?? this.config?.domain);
  }
}
function en() {
  const e = sn(), t = e ?? "svg", i = nn();
  return k(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    i,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? i ? new tn() : (k("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new zt()) : new zt();
}
function nn() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function sn() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function Ue(e) {
  if (e.tap_action?.action) return e.tap_action.action;
  switch (e.type) {
    case "switch":
      return "toggle";
    case "button":
      return e.entity ? "toggle" : "none";
    case "sensor":
    case "camera":
      return "more-info";
    case "custom":
    default:
      return "none";
  }
}
function on(e, t) {
  const i = new CustomEvent("hass-more-info", {
    detail: { entityId: t },
    bubbles: !0,
    composed: !0
  });
  e.dispatchEvent(i);
}
function rn(e, t) {
  e?.callService && e.callService("homeassistant", "toggle", { entity_id: t });
}
function an(e, t, i) {
  const n = Ue(e);
  if (n === "none") return;
  const s = e.entity;
  s && (n === "toggle" ? rn(t, s) : n === "more-info" && on(i.currentTarget, s));
}
function cn(e) {
  const t = e.size?.width ?? 14, i = e.size?.height ?? 8;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function ln(e, t, i) {
  switch (e.type) {
    case "sensor":
      return hn(e, t);
    case "switch":
      return un(e, t);
    case "button":
      return pn(e, t);
    case "camera":
      return mn(e, t, i);
    case "custom":
      return yn(e, t);
  }
}
function dn(e, t, i) {
  k("renderOverlayHost →", e.type, "id=", e.id, "entity=", e.entity ?? "(none)", "position=", e.position, "size=", e.size, "entity-state=", e.entity ? t?.states[e.entity]?.state : "(n/a)");
  const s = Ue(e) !== "none", o = (r) => an(e, t, r);
  return m`
    <div
      class=${`overlay overlay-${e.type} ${s ? "interactive" : ""}`}
      data-overlay-id=${e.id}
      style=${cn(e)}
      @click=${s ? o : void 0}
      tabindex=${s ? "0" : "-1"}
      role=${s ? "button" : "group"}
    >
      ${ln(e, t, i)}
    </div>
  `;
}
function hn(e, t) {
  const i = e.entity ? t?.states[e.entity] : void 0, n = i?.attributes?.unit_of_measurement ?? "", s = e.label ?? i?.attributes?.friendly_name ?? e.entity ?? "sensor", o = i?.state ?? "—", r = It(o), c = Number.isFinite(r) ? bn(r) : o;
  return m`
    <div class="overlay-body sensor-body">
      <div class="overlay-label">${s}</div>
      <div class="overlay-value">
        <span class="value-number">${c}</span>
        ${n ? m`<span class="value-unit">${n}</span>` : b}
      </div>
    </div>
  `;
}
function un(e, t) {
  const i = e.entity ? t?.states[e.entity] : void 0, n = i?.state === "on", s = e.label ?? i?.attributes?.friendly_name ?? e.entity ?? "switch";
  return m`
    <div class="overlay-body switch-body ${n ? "is-on" : "is-off"}">
      <div class="overlay-label">${s}</div>
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="switch-state">${n ? "on" : "off"}</div>
    </div>
  `;
}
function pn(e, t) {
  const i = e.entity ? t?.states[e.entity] : void 0, n = e.label ?? i?.attributes?.friendly_name ?? e.entity ?? "button";
  return m`
    <div class="overlay-body button-body">
      <div class="overlay-label">${n}</div>
    </div>
  `;
}
const fn = 10;
function gn(e) {
  return Math.floor(Date.now() / e);
}
function mn(e, t, i) {
  const n = (e.refresh_interval ?? i?.camera_refresh_interval ?? fn) * 1e3, s = e.entity ? t?.states[e.entity] : void 0, o = s?.attributes?.entity_picture, r = !s || s.state === "unavailable" || s.state === "unknown" || !o, c = o ? `${o}${o.includes("?") ? "&" : "?"}flowme_bust=${gn(n)}` : "", a = e.offline_label ?? "";
  return m`
    <div class="overlay-body camera-body">
      ${r ? m`
            <div class="camera-placeholder" title=${a}>
              <svg
                class="camera-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M9.4 5 8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-1.4-2zM12 10a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"
                />
              </svg>
            </div>
          ` : m`<img class="camera-frame" src=${c} alt=${e.entity ?? ""} />`}
      ${e.label ? m`<div class="camera-label">${e.label}</div>` : b}
    </div>
  `;
}
function yn(e, t) {
  return m`
    <flowme-custom-overlay
      .hass=${t}
      .cardConfig=${e.card_config}
    ></flowme-custom-overlay>
  `;
}
function bn(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e3 || t >= 100 ? e.toFixed(0) : t >= 10 ? e.toFixed(1) : e.toFixed(2);
}
let Rt = null, Q = null;
async function wn() {
  if (Rt) return Rt;
  if (Q) return Q;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (Q = t().then((i) => (Rt = i, Q = null, i)).catch((i) => {
    throw Q = null, i;
  }), Q);
}
async function vn(e) {
  const t = await wn();
  return t ? t.createCardElement(e) : null;
}
var xn = Object.defineProperty, $n = Object.getOwnPropertyDescriptor, Tt = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? $n(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && xn(t, i, s), s;
};
let nt = class extends L {
  updated(e) {
    super.updated(e), e.has("cardConfig") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  render() {
    return this.errorMessage ? m`<div class="err" title=${this.errorMessage}>!</div>` : m`<div class="mount"></div>`;
  }
  rebuildChild() {
    const e = this.cardConfig, t = e ? JSON.stringify(e) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!e)) {
      try {
        xi(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, vn(e).then((i) => {
        if (!i) {
          this.errorMessage = "HA card helpers unavailable", this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== t) return;
        this.childCard = i, this.hass && (this.childCard.hass = this.hass);
        const n = this.renderRoot.querySelector(".mount");
        n && (n.innerHTML = "", n.appendChild(this.childCard));
      }).catch((i) => {
        this.errorMessage = i instanceof Error ? i.message : String(i), this.requestUpdate();
      });
    }
  }
  disposeChild() {
    this.childCard && this.childCard.parentElement && this.childCard.parentElement.removeChild(this.childCard), this.childCard = void 0;
  }
};
nt.styles = Mt`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .mount {
      width: 100%;
      height: 100%;
    }
    .err {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: rgba(244, 67, 54, 0.6);
      border-radius: 6px;
      font-weight: 700;
    }
  `;
Tt([
  T({ attribute: !1 })
], nt.prototype, "hass", 2);
Tt([
  T({ attribute: !1 })
], nt.prototype, "cardConfig", 2);
Tt([
  A()
], nt.prototype, "errorMessage", 2);
nt = Tt([
  Et("flowme-custom-overlay")
], nt);
const _n = 100;
class An {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > _n; ) this.undoStack.shift();
      this.redoStack = [], this.notify();
    }
  }
  undo() {
    const t = this.undoStack.pop();
    t && (this.apply(t.prev), this.redoStack.push(t), this.notify());
  }
  redo() {
    const t = this.redoStack.pop();
    t && (this.apply(t.next), this.undoStack.push(t), this.notify());
  }
  canUndo() {
    return this.undoStack.length > 0;
  }
  canRedo() {
    return this.redoStack.length > 0;
  }
  topUndoDescription() {
    return this.undoStack[this.undoStack.length - 1]?.description;
  }
  topRedoDescription() {
    return this.redoStack[this.redoStack.length - 1]?.description;
  }
  clear() {
    this.undoStack = [], this.redoStack = [], this.notify();
  }
  subscribe(t) {
    return this.listeners.add(t), () => this.listeners.delete(t);
  }
  notify() {
    for (const t of this.listeners) t();
  }
}
function _(e) {
  return JSON.parse(JSON.stringify(e));
}
function E(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function fe(e, t = 8) {
  return Math.round(e / t) * t;
}
function Sn(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `node_${i}`;
    if (!t.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function kn(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `flow_${i}`;
    if (!t.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function Cn(e, t, i) {
  const n = _(e);
  for (const s of n.nodes)
    s.id === t && (s.position = { x: E(i.x), y: E(i.y) });
  return n;
}
function Mn(e, t, i) {
  const n = _(e), s = {
    id: Sn(e),
    position: { x: E(t.x), y: E(t.y) },
    label: i
  };
  return n.nodes.push(s), { config: n, node: s };
}
function Pn(e, t) {
  const i = _(e);
  return i.nodes = i.nodes.filter((n) => n.id !== t), i.flows = i.flows.filter((n) => n.from_node !== t && n.to_node !== t), i;
}
function En(e, t, i, n) {
  const s = _(e);
  for (const o of s.flows)
    if (o.id === t) {
      if (i < 0 || i >= o.waypoints.length) return e;
      o.waypoints[i] = {
        x: E(n.x),
        y: E(n.y)
      };
    }
  return s;
}
function Tn(e, t, i, n) {
  const s = _(e);
  for (const o of s.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, i));
    o.waypoints.splice(r, 0, {
      x: E(n.x),
      y: E(n.y)
    });
  }
  return s;
}
function Nn(e, t, i) {
  const n = _(e);
  for (const s of n.flows)
    if (s.id === t) {
      if (i < 0 || i >= s.waypoints.length) return e;
      s.waypoints.splice(i, 1);
    }
  return n;
}
function On(e, t, i, n) {
  const s = _(e), o = {
    id: kn(e),
    from_node: t,
    to_node: i,
    entity: n,
    waypoints: []
  };
  return s.flows.push(o), { config: s, flow: o };
}
function Fn(e, t) {
  const i = _(e);
  return i.flows = i.flows.filter((n) => n.id !== t), i;
}
function Rn(e, t) {
  const i = _(e);
  return i.background.default = t, i;
}
function Un(e, t) {
  const i = _(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function In(e, t) {
  const i = _(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function ge(e, t, i) {
  var s;
  const n = _(e);
  return (s = n.background).weather_states ?? (s.weather_states = {}), n.background.weather_states[t] = i, n;
}
function zn(e, t) {
  const i = _(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function Dn(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `overlay_${i}`;
    if (!t.has(n)) return n;
  }
  return `overlay_${Date.now()}`;
}
function Ln(e, t) {
  const i = _(e), n = t.id ?? Dn(e), s = {
    ...t,
    id: n,
    position: {
      x: E(t.position.x),
      y: E(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], s], { config: i, overlay: s };
}
function Hn(e, t) {
  const i = _(e);
  return i.overlays = (i.overlays ?? []).filter((n) => n.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function jn(e, t, i) {
  const n = _(e);
  for (const s of n.overlays ?? [])
    s.id === t && (s.position = { x: E(i.x), y: E(i.y) });
  return n;
}
function me(e, t, i) {
  const n = _(e), s = Math.max(2, Math.min(100, i.width)), o = Math.max(2, Math.min(100, i.height));
  for (const r of n.overlays ?? [])
    r.id === t && (r.size = { width: s, height: o });
  return n;
}
function Bn(e, t, i) {
  const n = _(e);
  for (const s of n.overlays ?? [])
    s.id === t && (s.type = i, i !== "custom" && delete s.card_config);
  return n;
}
function Wn(e, t, i) {
  const n = _(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i && i.length ? s.entity = i : delete s.entity);
  return n;
}
function Vn(e, t, i) {
  const n = _(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i && i.length ? s.label = i : delete s.label);
  return n;
}
function qn(e, t, i) {
  const n = _(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i ? s.tap_action = { action: i } : delete s.tap_action);
  return n;
}
function Gn(e, t, i) {
  const n = _(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i ? s.card_config = i : delete s.card_config);
  return n;
}
function Kn(e, t, i) {
  if (t === i) return e;
  const n = _(e), s = n.background.weather_states;
  if (!s || !(t in s)) return e;
  const o = s[t];
  return o === void 0 ? e : (delete s[t], s[i] = o, n);
}
var Jn = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, X = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Xn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Jn(t, i, s), s;
};
let U = class extends L {
  constructor() {
    super(...arguments), this.canUndo = !1, this.canRedo = !1, this.previewMode = !1, this.suggestPathDisabled = !0, this.undoLabel = "", this.redoLabel = "";
  }
  render() {
    return m`
      <button @click=${() => this.fire("add-node")} title="Add node">+ Node</button>
      <button @click=${() => this.fire("add-flow")} title="Add flow">+ Flow</button>
      <button @click=${() => this.fire("add-overlay")} title="Add overlay">+ Overlay</button>
      <button
        @click=${() => this.fire("suggest-path")}
        ?disabled=${this.suggestPathDisabled}
        title="Auto-route waypoints (v0.3)"
      >
        Suggest path
      </button>
      <button
        @click=${() => this.fire("undo")}
        ?disabled=${!this.canUndo}
        title=${this.undoLabel ? `Undo: ${this.undoLabel}` : "Undo (⌘Z)"}
      >
        ↶ Undo
      </button>
      <button
        @click=${() => this.fire("redo")}
        ?disabled=${!this.canRedo}
        title=${this.redoLabel ? `Redo: ${this.redoLabel}` : "Redo (⌘⇧Z)"}
      >
        ↷ Redo
      </button>
      <button
        class=${this.previewMode ? "active" : ""}
        @click=${() => this.fire("toggle-preview")}
        title="Toggle preview animations"
      >
        ${this.previewMode ? "Editing" : "Preview"}
      </button>
      <span class="spacer"></span>
      <span class="hint">Shift = 8% snap · right-click waypoint to delete</span>
      <button @click=${() => this.fire("save")} title="Apply to card config">Save</button>
    `;
  }
  fire(e) {
    this.dispatchEvent(
      new CustomEvent("toolbar-action", { detail: { action: e }, bubbles: !0, composed: !0 })
    );
  }
};
U.styles = Mt`
    :host {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 6px 8px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      background: var(--card-background-color, #fff);
      flex-wrap: wrap;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      font: inherit;
      font-size: 12px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #111);
      cursor: pointer;
      transition: background-color 120ms ease;
    }
    button:hover:not(:disabled) {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #03a9f4);
    }
    .spacer {
      flex: 1 1 auto;
    }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #666);
    }
  `;
X([
  T({ type: Boolean })
], U.prototype, "canUndo", 2);
X([
  T({ type: Boolean })
], U.prototype, "canRedo", 2);
X([
  T({ type: Boolean })
], U.prototype, "previewMode", 2);
X([
  T({ type: Boolean })
], U.prototype, "suggestPathDisabled", 2);
X([
  T({ type: String })
], U.prototype, "undoLabel", 2);
X([
  T({ type: String })
], U.prototype, "redoLabel", 2);
U = X([
  Et("flowme-editor-toolbar")
], U);
const Ie = 8, ye = 1, Lt = 255;
function Yn(e, t = Ie) {
  const i = Math.max(1, Math.floor(t)), n = Math.max(1, Math.ceil(e.width / i)), s = Math.max(1, Math.ceil(e.height / i)), o = new Uint16Array(n * s);
  for (let r = 0; r < s; r++) {
    const c = r * i, a = Math.min(e.height, c + i);
    for (let l = 0; l < n; l++) {
      const d = l * i, h = Math.min(e.width, d + i);
      let u = 0;
      for (let g = c; g < a; g++) {
        const w = g * e.width;
        for (let y = d; y < h; y++) {
          const x = e.data[w + y] ?? 0;
          x > u && (u = x);
        }
      }
      const p = Lt - u;
      o[r * n + l] = p < ye ? ye : p;
    }
  }
  return { cols: n, rows: s, cellSize: i, data: o };
}
function Zn(e, t, i) {
  return i * e.cols + t;
}
function Qn(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? Lt : e.data[Zn(e, t, i)] ?? Lt;
}
const ts = 50;
class es {
  constructor() {
    this.arr = [];
  }
  push(t) {
    this.arr.push(t), this.bubbleUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return;
    const t = this.arr[0], i = this.arr.pop();
    return this.arr.length > 0 && (this.arr[0] = i, this.sinkDown(0)), t;
  }
  get size() {
    return this.arr.length;
  }
  bubbleUp(t) {
    for (; t > 0; ) {
      const i = t - 1 >> 1;
      if ((this.arr[i]?.f ?? 0) <= (this.arr[t]?.f ?? 0)) return;
      [this.arr[i], this.arr[t]] = [this.arr[t], this.arr[i]], t = i;
    }
  }
  sinkDown(t) {
    const i = this.arr.length;
    for (; ; ) {
      const n = 2 * t + 1, s = 2 * t + 2;
      let o = t;
      if (n < i && (this.arr[n]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = n), s < i && (this.arr[s]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = s), o === t) return;
      [this.arr[o], this.arr[t]] = [this.arr[t], this.arr[o]], t = o;
    }
  }
}
function is(e, t, i) {
  const [n, s] = t, [o, r] = i;
  if (n < 0 || s < 0 || n >= e.cols || s >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (n === o && s === r) return [[n, s]];
  const c = e.cols * e.rows, a = new Float32Array(c);
  a.fill(1 / 0);
  const l = new Int16Array(c), d = new Int16Array(c);
  l.fill(-1), d.fill(-1);
  const h = new Uint8Array(c), u = new Uint8Array(c), p = s * e.cols + n;
  a[p] = 0;
  const g = new es();
  g.push({ col: n, row: s, f: be(n, s, o, r) });
  const w = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const y = g.pop(), { col: x, row: S } = y, v = S * e.cols + x;
    if (!u[v]) {
      if (u[v] = 1, x === o && S === r)
        return ns(e, l, d, i);
      for (const [N, O, st] of w) {
        const F = x + N, R = S + O;
        if (F < 0 || R < 0 || F >= e.cols || R >= e.rows) continue;
        const Z = R * e.cols + F;
        if (u[Z]) continue;
        const ze = Qn(e, F, R), De = h[v] && h[v] !== st ? ts : 0, Nt = (a[v] ?? 1 / 0) + ze + De;
        if (Nt < (a[Z] ?? 1 / 0)) {
          a[Z] = Nt, l[Z] = x, d[Z] = S, h[Z] = st;
          const Le = Nt + be(F, R, o, r);
          g.push({ col: F, row: R, f: Le });
        }
      }
    }
  }
  return null;
}
function be(e, t, i, n) {
  return Math.abs(e - i) + Math.abs(t - n);
}
function ns(e, t, i, n) {
  const s = [];
  let o = n[0], r = n[1];
  for (; o !== -1 && r !== -1; ) {
    s.push([o, r]);
    const c = r * e.cols + o, a = t[c] ?? -1, l = i[c] ?? -1;
    if (a === o && l === r || (o = a, r = l, o < 0 || r < 0)) break;
  }
  return s.reverse(), s[0]?.[0] === -1 && s.shift(), s;
}
const ss = 480, os = 270, rs = 30;
function as(e, t, i = ss, n = os) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const s = Math.min(i / e, n / t, 1);
  return {
    width: Math.max(1, Math.floor(e * s)),
    height: Math.max(1, Math.floor(t * s))
  };
}
function cs(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let s = 0, o = 0; s < e.length; s += 4, o++) {
    const r = e[s] ?? 0, c = e[s + 1] ?? 0, a = e[s + 2] ?? 0;
    n[o] = 0.2126 * r + 0.7152 * c + 0.0722 * a;
  }
  return n;
}
function ls(e, t, i) {
  const n = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t;
    for (let c = 0; c < t; c++) {
      const a = e[r + Math.max(0, c - 1)] ?? 0, l = e[r + c] ?? 0, d = e[r + Math.min(t - 1, c + 1)] ?? 0;
      n[r + c] = a + 2 * l + d >> 2;
    }
  }
  const s = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t, c = Math.max(0, o - 1) * t, a = Math.min(i - 1, o + 1) * t;
    for (let l = 0; l < t; l++) {
      const d = n[c + l] ?? 0, h = n[r + l] ?? 0, u = n[a + l] ?? 0;
      s[r + l] = d + 2 * h + u >> 2;
    }
  }
  return s;
}
function ds(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let s = 1; s < i - 1; s++) {
    const o = (s - 1) * t, r = s * t, c = (s + 1) * t;
    for (let a = 1; a < t - 1; a++) {
      const l = e[o + (a - 1)] ?? 0, d = e[o + a] ?? 0, h = e[o + (a + 1)] ?? 0, u = e[r + (a - 1)] ?? 0, p = e[r + (a + 1)] ?? 0, g = e[c + (a - 1)] ?? 0, w = e[c + a] ?? 0, y = e[c + (a + 1)] ?? 0, x = -l - 2 * u - g + h + 2 * p + y, S = -l - 2 * d - h + g + 2 * w + y;
      let v = Math.sqrt(x * x + S * S);
      v < rs && (v = 0), v > 255 && (v = 255), n[r + a] = v;
    }
  }
  return { width: t, height: i, data: n };
}
function hs(e, t, i) {
  const n = as(t, i), s = document.createElement("canvas");
  s.width = n.width, s.height = n.height;
  const o = s.getContext("2d", { willReadFrequently: !0 });
  if (!o) throw new Error("2D canvas unavailable");
  o.drawImage(e, 0, 0, n.width, n.height);
  try {
    const r = o.getImageData(0, 0, n.width, n.height);
    return { width: n.width, height: n.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function us(e, t, i) {
  const { width: n, height: s, rgba: o } = hs(e, t, i), r = cs(o, n, s), c = ls(r, n, s);
  return ds(c, n, s);
}
function ps(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const n = e[i - 1], s = e[i], o = e[i + 1], r = s[0] - n[0], c = s[1] - n[1], a = o[0] - s[0], l = o[1] - s[1];
    r * l - c * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(c) === Math.sign(l) || t.push(s);
  }
  return t.push(e[e.length - 1]), t;
}
const xt = /* @__PURE__ */ new Map();
async function fs(e, t = {}) {
  const i = performance.now(), n = t.cellSize ?? Ie, s = `${e.imageUrl}|${n}`, o = xt.has(s);
  let r = null;
  try {
    r = await gs(s, e.imageUrl, n);
  } catch {
    r = null;
  }
  if (!r)
    return {
      waypoints: [],
      cached: !1,
      edgesUsable: !1,
      elapsedMs: performance.now() - i
    };
  const c = ve(e.from, r), a = ve(e.to, r), l = is(r, c, a);
  return !l || l.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  } : {
    waypoints: ps(l).slice(1, -1).map((p) => bs(p, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  };
}
function gs(e, t, i) {
  const n = xt.get(e);
  if (n) return n;
  const s = ms(t, i).catch((o) => {
    throw xt.delete(e), o;
  });
  return xt.set(e, s), s;
}
async function ms(e, t) {
  const i = await ys(e);
  await we();
  const n = us(i, i.naturalWidth, i.naturalHeight);
  return await we(), Yn(n, t);
}
function ys(e) {
  return new Promise((t, i) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => t(n), n.onerror = () => i(new Error(`Failed to load background image: ${e}`)), n.src = e;
  });
}
function we() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function ve(e, t) {
  const i = xe(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), n = xe(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, n];
}
function bs(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function xe(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
var ws = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, M = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? vs(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && ws(t, i, s), s;
};
let $ = class extends L {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = Pe(), this.undoStack = new An((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, n = Rn(i, t);
      this.pushPatch(i, n, "edit default background");
    }, this.onTransitionChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = Number(t), n = this.config, s = In(n, Number.isFinite(i) ? i : void 0);
      this.pushPatch(n, s, "edit transition duration");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = zn(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = $.KNOWN_WEATHER_STATES.find((s) => !e.has(s)) ?? "custom", i = this.config, n = ge(i, t, "");
      this.pushPatch(i, n, `add weather state ${t}`);
    }, this.onToolbarAction = (e) => {
      switch (e.detail.action) {
        case "add-node":
          this.pending = { kind: "add-node" }, this.statusMessage = "Click anywhere on the background to drop a new node.";
          break;
        case "add-flow":
          this.pending = { kind: "add-flow", step: "pick-from" }, this.statusMessage = "Click the source node.";
          break;
        case "add-overlay": {
          const t = window.prompt(
            `Overlay type? One of: ${dt.join(", ")}`,
            "sensor"
          );
          if (!t) break;
          const i = t.trim().toLowerCase();
          if (!dt.includes(i)) {
            this.statusMessage = `Unknown overlay type "${t}".`;
            break;
          }
          this.pending = { kind: "add-overlay", overlayType: i }, this.statusMessage = `Click anywhere on the background to drop a ${i} overlay.`;
          break;
        }
        case "suggest-path":
          this.runSuggestPath();
          break;
        case "undo":
          this.undoStack.undo();
          break;
        case "redo":
          this.undoStack.redo();
          break;
        case "toggle-preview":
          this.previewMode = !this.previewMode, this.statusMessage = this.previewMode ? "Preview: drag and snap suspended until you leave preview mode." : "";
          break;
        case "save":
          this.config && this.commitToHa(this.config), this.statusMessage = "Saved to card configuration.";
          break;
      }
    }, this.onStageClick = (e) => {
      if (!(!this.config || e.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const n = this.config, { config: s, node: o } = Mn(n, i, "New node");
          this.pushPatch(n, s, `add node ${o.id}`), this.pending = null, this.statusMessage = `Added node ${o.id}.`;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const n = this.pending.overlayType, s = {
            type: n,
            position: i,
            size: n === "camera" ? { width: 22, height: 15 } : { width: 14, height: 8 }
          };
          n === "custom" && (s.card_config = { type: "entity", entity: "" });
          const o = this.config, { config: r, overlay: c } = Ln(o, s);
          this.selectedOverlayId = c.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(o, r, `add overlay ${c.id}`), this.pending = null, this.statusMessage = `Added overlay ${c.id}. Drag to reposition, corner to resize.`;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step === "pick-from" && (this.statusMessage = "Click the source node handle.");
          return;
        }
        this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "";
      }
    }, this.onStageContextMenu = (e) => {
      this.pending && (e.preventDefault(), this.pending = null, this.statusMessage = "Cancelled.");
    }, this.onSegmentClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId, n = Number(t.dataset.segmentIndex);
      if (!(!i || !Number.isFinite(n))) {
        if (e.shiftKey) {
          const s = this.pointerToPercent(e);
          if (!s) return;
          const o = this.config, r = Tn(o, i, n, s);
          this.pushPatch(o, r, `add waypoint to ${i}`);
          return;
        }
        this.selectedFlowId = i, this.selectedNodeId = null;
      }
    }, this.onNodeClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const i = e.currentTarget.dataset.nodeId;
      if (i) {
        if (this.pending?.kind === "add-flow") {
          if (this.pending.step === "pick-from") {
            this.pending = { kind: "add-flow", step: "pick-to", fromId: i }, this.statusMessage = "Click the destination node.";
            return;
          }
          if (this.pending.step === "pick-to" && this.pending.fromId !== i) {
            const n = window.prompt(
              "Entity for this flow (e.g. sensor.grid_power):",
              "sensor.placeholder_entity"
            ) ?? "sensor.placeholder_entity", s = this.config, { config: o, flow: r } = On(s, this.pending.fromId, i, n);
            this.pushPatch(s, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
            return;
          }
          this.statusMessage = "Destination must differ from source.";
          return;
        }
        this.selectedNodeId = i, this.selectedFlowId = null, this.selectedOverlayId = null;
      }
    }, this.onOverlayClick = (e) => {
      e.stopPropagation();
      const i = e.currentTarget.dataset.overlayId;
      i && (this.selectedOverlayId = i, this.selectedNodeId = null, this.selectedFlowId = null, this.customConfigDraft = "", this.customConfigError = "");
    }, this.onOverlayContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget.dataset.overlayId;
      i && window.confirm(`Delete overlay ${i}?`) && this.removeOverlay(i);
    }, this.onOverlayResizePointerDown = (e) => {
      if (this.previewMode || !this.config) return;
      e.stopPropagation(), e.preventDefault();
      const t = e.currentTarget, i = t.dataset.overlayId;
      if (!i) return;
      const n = (this.config.overlays ?? []).find((o) => o.id === i);
      if (!n) return;
      const s = { ...n.size ?? { width: 14, height: 8 } };
      t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: i,
        startSize: s,
        startPx: { x: e.clientX, y: e.clientY }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget.dataset.nodeId;
      i && window.confirm(`Delete node ${i}? This also removes any flows using it.`) && this.removeNode(i);
    }, this.onWaypointContextMenu = (e) => {
      if (e.preventDefault(), e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId, n = Number(t.dataset.waypointIndex);
      if (!i || !Number.isFinite(n)) return;
      const s = this.config, o = Nn(s, i, n);
      this.pushPatch(s, o, `delete waypoint ${n} of ${i}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = e.currentTarget, i = t.dataset.waypointIndex, n = t.dataset.flowId, s = t.dataset.nodeId, o = t.dataset.overlayId;
      let r = null;
      s ? r = { kind: "node", id: s } : o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : n && i !== void 0 && (r = { kind: "waypoint", flowId: n, index: Number(i) }), r && (e.preventDefault(), t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = e.shiftKey, t.kind === "overlay-resize") {
        const s = this.stageRef.value;
        if (!s) return;
        const o = s.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, c = (e.clientY - t.startPx.y) / o.height * 100;
        let a = t.startSize.width + r, l = t.startSize.height + c;
        this.dragShiftHeld && (a = Math.round(a), l = Math.round(l)), this.config = me(this.config, t.id, { width: a, height: l });
        return;
      }
      const i = this.pointerToPercent(e);
      if (!i) return;
      const n = this.dragShiftHeld ? { x: E(fe(i.x)), y: E(fe(i.y)) } : i;
      t.kind === "node" ? this.config = Cn(this.config, t.id, n) : t.kind === "overlay" ? this.config = jn(this.config, t.id, n) : t.kind === "waypoint" && (this.config = En(this.config, t.flowId, t.index, n));
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const i = this.dragStartConfig, n = this.config, s = this.dragTarget;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, !i || !n || !s || i === n) return;
      let o;
      switch (s.kind) {
        case "node":
          o = `move node ${s.id}`;
          break;
        case "overlay":
          o = `move overlay ${s.id}`;
          break;
        case "overlay-resize":
          o = `resize overlay ${s.id}`;
          break;
        default:
          o = `move waypoint ${s.index} of ${s.flowId}`;
      }
      this.pushPatch(i, n, o);
    }, this.onKeyDown = (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const i = e.key.toLowerCase();
      i === "z" && !e.shiftKey ? (e.preventDefault(), this.undoStack.undo()) : (i === "z" && e.shiftKey || i === "y") && (e.preventDefault(), this.undoStack.redo());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState()), window.addEventListener("keydown", this.onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown);
  }
  setConfig(e) {
    try {
      this.config = wt(e), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return m`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? m`<pre class="error">${this.errorMessage}</pre>` : b}
        </div>
      `;
    const t = `${1 / (vt(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, i = this.config.background.default;
    return m`
      <div class="wrap">
        <flowme-editor-toolbar
          .canUndo=${this.canUndo}
          .canRedo=${this.canRedo}
          .previewMode=${this.previewMode}
          .undoLabel=${this.undoLabel}
          .redoLabel=${this.redoLabel}
          .suggestPathDisabled=${this.selectedFlowId === null || this.suggestBusy}
          @toolbar-action=${this.onToolbarAction}
        ></flowme-editor-toolbar>
        ${this.statusMessage ? m`<div class="status">${this.statusMessage}</div>` : b}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${Ee(this.stageRef)}
        >
          <div
            class="background"
            style=${i ? `background-image: url('${i}');` : ""}
          ></div>
          <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.config.flows.map((n) => this.renderFlowConnector(n))}
          </svg>
          ${this.config.flows.map((n) => this.renderWaypointHandles(n))}
          ${(this.config.overlays ?? []).map((n) => this.renderOverlayHandle(n))}
          ${this.config.nodes.map((n) => this.renderHandle(n))}
          ${this.renderSuggestPreview()}
        </div>
        ${this.renderSuggestBar()}
        ${this.renderInspector()}
        ${this.renderWeatherPanel()}
        ${this.errorMessage ? m`<pre class="error">${this.errorMessage}</pre>` : b}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return b;
    const t = new Map(this.config.nodes.map((c) => [c.id, c])), i = t.get(e.from_node), n = t.get(e.to_node);
    if (!i || !n) return b;
    const s = [i.position, ...e.waypoints, n.position], o = e.id === this.selectedFlowId, r = [];
    for (let c = 0; c < s.length - 1; c++) {
      const a = s[c], l = s[c + 1];
      !a || !l || r.push(m`
        <line
          class=${`segment ${o ? "selected" : ""}`}
          x1=${a.x}
          y1=${a.y}
          x2=${l.x}
          y2=${l.y}
          data-flow-id=${e.id}
          data-segment-index=${c}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return m`<g>${r}</g>`;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, i) => m`
        <div
          class="waypoint"
          data-flow-id=${e.id}
          data-waypoint-index=${i}
          style=${`left: ${t.x}%; top: ${t.y}%;`}
          @pointerdown=${this.onHandlePointerDown}
          @pointermove=${this.onHandlePointerMove}
          @pointerup=${this.onHandlePointerUp}
          @pointercancel=${this.onHandlePointerUp}
          @contextmenu=${this.onWaypointContextMenu}
          @click=${this.stopClick}
        ></div>
      `
    );
  }
  renderOverlayHandle(e) {
    const t = e.id === this.selectedOverlayId, i = e.size?.width ?? 14, n = e.size?.height ?? 8;
    return m`
      <div
        class=${`overlay-handle ${t ? "selected" : ""} overlay-${e.type}`}
        data-overlay-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; width: ${i}%; height: ${n}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip">
          ${e.label ?? e.entity ?? e.type}
          <span class="overlay-type-badge">${e.type}</span>
        </div>
        ${t ? m`<div
              class="overlay-resize"
              data-overlay-id=${e.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : b}
      </div>
    `;
  }
  renderHandle(e) {
    const t = e.id === this.selectedNodeId;
    return m`
      <div
        class=${`handle ${t ? "selected" : ""}`}
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span class="handle-dot"></span>
        ${e.label ? m`<span class="handle-label">${e.label}</span>` : b}
      </div>
    `;
  }
  /**
   * Render an <ha-entity-picker> bound to `value` with an onChange callback
   * receiving the chosen entity id (or empty string). Falls back to a plain
   * <input> with a <datalist> of matching entities when the picker element
   * isn't registered yet (happens in some HA versions before card helpers
   * load). The picker fires `value-changed`; the input fires `change`.
   */
  renderEntityPicker(e, t, i) {
    const n = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), s = i?.includeDomains ?? [], o = i?.placeholder ?? "entity.id";
    if (n) {
      const d = (h) => {
        h.stopPropagation(), t((h.detail?.value ?? "").trim());
      };
      return m`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
          .includeDomains=${s}
          @value-changed=${d}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, c = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, a = Object.keys(r).filter((d) => {
      if (s.length === 0) return !0;
      const h = d.split(".")[0];
      return !!h && s.includes(h);
    }).sort();
    return m`
      <input
        type="text"
        list=${c}
        placeholder=${o}
        .value=${e}
        @change=${(d) => {
      t(d.target.value.trim());
    }}
      />
      <datalist id=${c}>
        ${a.map((d) => m`<option value=${d}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return b;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((t) => t.id === this.selectedNodeId);
      return e ? m`
        <div class="inspector">
          <h4>Node: ${e.id}</h4>
          <label>
            Label
            <input
              type="text"
              .value=${e.label ?? ""}
              @change=${(t) => this.onNodeLabelChange(e.id, t)}
            />
          </label>
          <label>
            Entity
            ${this.renderEntityPicker(
        e.entity ?? "",
        (t) => this.setNodeEntity(e.id, t),
        { includeDomains: ["sensor", "binary_sensor", "input_number", "number"] }
      )}
          </label>
          <button class="danger" @click=${() => this.removeNode(e.id)}>Delete node</button>
        </div>
      ` : b;
    }
    if (this.selectedFlowId) {
      const e = this.config.flows.find((t) => t.id === this.selectedFlowId);
      return e ? m`
        <div class="inspector">
          <h4>Flow: ${e.id}</h4>
          <div class="row">
            <span>${e.from_node} → ${e.to_node}</span>
          </div>
          <label>
            Entity
            ${this.renderEntityPicker(
        e.entity,
        (t) => this.setFlowEntity(e.id, t),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
          </label>
          <div class="row">
            <span>${e.waypoints.length} waypoint(s)</span>
          </div>
          <button class="danger" @click=${() => this.removeFlow(e.id)}>Delete flow</button>
        </div>
      ` : b;
    }
    if (this.selectedOverlayId) {
      const e = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return e ? this.renderOverlayInspector(e) : b;
    }
    return b;
  }
  renderOverlayInspector(e) {
    const t = e.size ?? { width: 14, height: 8 }, i = e.tap_action?.action ?? "";
    return m`
      <div class="inspector overlay-inspector">
        <h4>Overlay: ${e.id}</h4>
        <label>
          Type
          <select @change=${(n) => this.onOverlayTypeChange(e.id, n)}>
            ${dt.map(
      (n) => m`
                <option value=${n} ?selected=${n === e.type}>${n}</option>
              `
    )}
          </select>
        </label>
        ${e.type !== "custom" ? m`
              <label>
                Entity
                ${this.renderEntityPicker(
      e.entity ?? "",
      (n) => this.setOverlayEntityValue(e.id, n),
      {
        includeDomains: this.includeDomainsForOverlay(e.type),
        placeholder: this.entityPlaceholderFor(e.type)
      }
    )}
              </label>
            ` : b}
        <label>
          Label
          <input
            type="text"
            .value=${e.label ?? ""}
            @change=${(n) => this.onOverlayLabelChange(e.id, n)}
          />
        </label>
        <div class="row size-row">
          <label>
            Width %
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(t.width)}
              @change=${(n) => this.onOverlaySizeChange(e.id, "width", n)}
            />
          </label>
          <label>
            Height %
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(t.height)}
              @change=${(n) => this.onOverlaySizeChange(e.id, "height", n)}
            />
          </label>
        </div>
        <label>
          Tap action
          <select @change=${(n) => this.onOverlayTapActionChange(e.id, n)}>
            <option value="" ?selected=${!i}>default</option>
            ${Ut.map(
      (n) => m`<option value=${n} ?selected=${n === i}>${n}</option>`
    )}
          </select>
        </label>
        ${e.type === "custom" ? this.renderCustomConfigEditor(e) : b}
        <button class="danger" @click=${() => this.removeOverlay(e.id)}>Delete overlay</button>
      </div>
    `;
  }
  renderCustomConfigEditor(e) {
    const t = this.customConfigDraft || JSON.stringify(e.card_config ?? { type: "entity", entity: "" }, null, 2);
    return m`
      <label>
        Card config (JSON)
        <textarea
          rows="8"
          spellcheck="false"
          .value=${t}
          @input=${(i) => {
      this.customConfigDraft = i.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? m`<div class="custom-config-error">${this.customConfigError}</div>` : b}
      <div class="row">
        <button @click=${() => this.applyCustomConfig(e.id)}>Apply card config</button>
      </div>
      <p class="hint-sub">
        URLs must not use javascript:, vbscript:, data: or file: schemes — flowme rejects
        these when the overlay is saved.
      </p>
    `;
  }
  entityPlaceholderFor(e) {
    switch (e) {
      case "sensor":
        return "sensor.my_power_sensor";
      case "switch":
        return "switch.my_switch";
      case "camera":
        return "camera.my_camera";
      case "button":
        return "script.my_script";
      default:
        return "entity.id";
    }
  }
  renderWeatherPanel() {
    if (!this.config) return b;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {});
    return m`
      <details class="weather-panel" ?open=${t.length > 0 || !!e.weather_entity}>
        <summary>Backgrounds &amp; weather</summary>
        <div class="weather-body">
          <label>
            Default image URL
            <input
              type="text"
              .value=${e.default}
              @change=${this.onDefaultBgChange}
              placeholder="/local/flowme/house.jpg"
            />
            ${e.default ? m`<img class="weather-thumb" src=${e.default} alt="default background" />` : b}
          </label>
          <label>
            Weather entity (optional)
            ${this.renderEntityPicker(
      e.weather_entity ?? "",
      (i) => this.setWeatherEntityValue(i),
      { includeDomains: ["weather"], placeholder: "weather.forecast_home" }
    )}
          </label>
          <label>
            Transition duration (ms)
            <input
              type="number"
              min="0"
              step="100"
              .value=${String(e.transition_duration ?? 2e3)}
              @change=${this.onTransitionChange}
            />
          </label>
          <div class="weather-states">
            <div class="weather-states-header">
              <span>State</span>
              <span>Image URL</span>
              <span></span>
            </div>
            ${t.map(
      ([i, n]) => m`
                <div class="weather-row" data-key=${i}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${i}
                    @change=${(s) => this.onWeatherStateKeyChange(i, s)}
                  />
                  <input
                    type="text"
                    .value=${n}
                    @change=${(s) => this.onWeatherStateUrlChange(i, s)}
                    placeholder="/local/flowme/rainy.jpg"
                  />
                  <div class="weather-row-end">
                    ${n ? m`<img class="weather-thumb" src=${n} alt=${i} />` : b}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(i)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${$.KNOWN_WEATHER_STATES.map(
      (i) => m`<option value=${i}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
        </div>
      </details>
    `;
  }
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), i = this.config, n = Un(i, t || void 0);
    this.pushPatch(i, n, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const n = this.config, s = Kn(n, e, i);
    s !== n && this.pushPatch(n, s, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = ge(n, e, i);
    this.pushPatch(n, s, `edit weather image ${e}`);
  }
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || !this.selectedFlowId) {
      this.statusMessage = "Select a flow first — then use Suggest path.";
      return;
    }
    const e = this.config.flows.find((n) => n.id === this.selectedFlowId);
    if (!e) return;
    const t = this.config.nodes.find((n) => n.id === e.from_node), i = this.config.nodes.find((n) => n.id === e.to_node);
    if (!t || !i) {
      this.statusMessage = "Flow is missing a source or destination node.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const n = await fs({
        imageUrl: this.config.background.default,
        from: t.position,
        to: i.position
      });
      if (!n.edgesUsable) {
        this.statusMessage = "Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.", this.suggestPreview = null;
        return;
      }
      if (n.waypoints.length === 0) {
        this.statusMessage = "No waypoints suggested — a straight line already follows the strongest path.", this.suggestPreview = null;
        return;
      }
      this.suggestPreview = {
        flowId: e.id,
        waypoints: n.waypoints,
        edgesUsable: n.edgesUsable,
        elapsedMs: n.elapsedMs
      }, this.statusMessage = `Preview: ${n.waypoints.length} waypoint(s) in ${Math.round(
        n.elapsedMs
      )} ms. Accept to apply.`;
    } catch (n) {
      this.statusMessage = "Auto-route failed: " + (n instanceof Error ? n.message : String(n)), this.suggestPreview = null;
    } finally {
      this.suggestBusy = !1;
    }
  }
  acceptSuggestion() {
    if (!this.config || !this.suggestPreview) return;
    const { flowId: e, waypoints: t } = this.suggestPreview, i = this.config, n = {
      ...i,
      flows: i.flows.map(
        (s) => s.id === e ? { ...s, waypoints: t.map((o) => ({ x: o.x, y: o.y })) } : s
      )
    };
    this.suggestPreview = null, this.statusMessage = "Applied suggested waypoints.", this.pushPatch(i, n, `auto-route ${e}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return b;
    const e = this.config.flows.find((o) => o.id === this.suggestPreview.flowId);
    if (!e) return b;
    const t = this.config.nodes.find((o) => o.id === e.from_node), i = this.config.nodes.find((o) => o.id === e.to_node);
    if (!t || !i) return b;
    const s = [
      t.position,
      ...this.suggestPreview.waypoints,
      i.position
    ].map((o) => `${o.x.toFixed(2)},${o.y.toFixed(2)}`).join(" ");
    return m`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (o) => m`
          <div class="suggest-marker" style=${`left: ${o.x}%; top: ${o.y}%;`}></div>
        `
    )}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? m`
      <div class="suggest-bar">
        <span>Preview — ${this.suggestPreview.waypoints.length} waypoint(s)</span>
        <button @click=${this.acceptSuggestion}>Accept</button>
        <button class="ghost" @click=${this.cancelSuggestion}>Cancel</button>
      </div>
    ` : b;
  }
  // -- inspector edits --
  onNodeLabelChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = {
      ...n,
      nodes: n.nodes.map((o) => o.id === e ? { ...o, label: i || void 0 } : o)
    };
    this.pushPatch(n, s, `rename ${e}`);
  }
  setNodeEntity(e, t) {
    if (!this.config) return;
    const i = this.config, n = t.trim(), s = {
      ...i,
      nodes: i.nodes.map(
        (o) => o.id === e ? { ...o, entity: n || void 0 } : o
      )
    };
    this.pushPatch(i, s, `edit entity of ${e}`);
  }
  setFlowEntity(e, t) {
    if (!this.config) return;
    const i = this.config, n = t.trim();
    if (!n) return;
    const s = {
      ...i,
      flows: i.flows.map(
        (o) => o.id === e ? { ...o, entity: n } : o
      )
    };
    this.pushPatch(i, s, `edit entity of ${e}`);
  }
  onOverlayTypeChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = Bn(n, e, i);
    this.customConfigDraft = "", this.pushPatch(n, s, `change overlay ${e} type`);
  }
  setOverlayEntityValue(e, t) {
    if (!this.config) return;
    const i = t.trim(), n = this.config, s = Wn(n, e, i || void 0);
    this.pushPatch(n, s, `edit overlay ${e} entity`);
  }
  includeDomainsForOverlay(e) {
    switch (e) {
      case "switch":
        return ["switch", "light", "input_boolean", "fan", "cover"];
      case "sensor":
        return ["sensor", "binary_sensor", "input_number", "number"];
      case "camera":
        return ["camera"];
      case "button":
        return ["script", "automation", "button", "input_button"];
      default:
        return [];
    }
  }
  onOverlayLabelChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = Vn(n, e, i || void 0);
    this.pushPatch(n, s, `edit overlay ${e} label`);
  }
  onOverlaySizeChange(e, t, i) {
    if (!this.config) return;
    const n = (this.config.overlays ?? []).find((a) => a.id === e);
    if (!n) return;
    const s = n.size ?? { width: 14, height: 8 }, o = Number(i.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, c = me(r, e, { ...s, [t]: o });
    this.pushPatch(r, c, `resize overlay ${e}`);
  }
  onOverlayTapActionChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = qn(n, e, i || void 0);
    this.pushPatch(n, s, `edit overlay ${e} tap action`);
  }
  applyCustomConfig(e) {
    if (!this.config) return;
    const t = this.customConfigDraft.trim();
    if (!t) {
      this.customConfigError = "Config is empty.";
      return;
    }
    let i;
    try {
      i = JSON.parse(t);
    } catch (s) {
      this.customConfigError = "Invalid JSON: " + (s instanceof Error ? s.message : String(s));
      return;
    }
    if (!i || typeof i != "object" || Array.isArray(i)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const n = this.config;
    try {
      const s = Gn(n, e, i), o = wt(s);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: n, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (s) {
      this.customConfigError = s instanceof Error ? s.message : String(s);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = Hn(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = Pn(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = Fn(t, e);
    this.selectedFlowId = null, this.pushPatch(t, i, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const i = t.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return null;
    const n = E((e.clientX - i.left) / i.width * 100), s = E((e.clientY - i.top) / i.height * 100);
    return { x: n, y: s };
  }
  pushPatch(e, t, i) {
    try {
      const n = wt(t);
      this.errorMessage = "", this.undoStack.push({ prev: e, next: n, description: i }), this.commitToHa(n);
    } catch (n) {
      this.errorMessage = n instanceof Error ? n.message : String(n), this.config = e;
    }
  }
  applyConfig(e, t) {
    this.config = e, t ? this.commitToHa(e) : this.commitToHa(e);
  }
  commitToHa(e) {
    const t = new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  refreshUndoState() {
    this.canUndo = this.undoStack.canUndo(), this.canRedo = this.undoStack.canRedo(), this.undoLabel = this.undoStack.topUndoDescription() ?? "", this.redoLabel = this.undoStack.topRedoDescription() ?? "";
  }
};
$.KNOWN_WEATHER_STATES = [
  "clear-night",
  "cloudy",
  "exceptional",
  "fog",
  "hail",
  "lightning",
  "lightning-rainy",
  "partlycloudy",
  "pouring",
  "rainy",
  "snowy",
  "snowy-rainy",
  "sunny",
  "windy",
  "windy-variant"
];
$.styles = Mt`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .wrap {
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    flowme-editor-toolbar {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .status {
      font-size: 12px;
      padding: 6px 10px;
      margin: 0 12px;
      background: rgba(74, 222, 128, 0.12);
      border-radius: 6px;
    }
    .stage {
      position: relative;
      width: calc(100% - 24px);
      margin: 0 12px;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      background: var(--ha-card-background, #111);
      touch-action: none;
    }
    .stage.mode-add-node,
    .stage.mode-add-overlay {
      cursor: copy;
    }
    .background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .connectors .segment {
      stroke: rgba(255, 255, 255, 0.55);
      stroke-width: 0.6;
      stroke-dasharray: 1.5 1.5;
      vector-effect: non-scaling-stroke;
      pointer-events: stroke;
      cursor: crosshair;
    }
    .connectors .segment.selected {
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1;
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
    .handle.selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 6px var(--primary-color, #03a9f4);
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
    .waypoint {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(0, 0, 0, 0.6);
      cursor: grab;
      touch-action: none;
    }
    .waypoint:active {
      cursor: grabbing;
    }
    .overlay-handle {
      position: absolute;
      transform: translate(-50%, -50%);
      border: 1px dashed rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      background: rgba(3, 169, 244, 0.08);
      cursor: grab;
      touch-action: none;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      overflow: visible;
    }
    .overlay-handle.selected {
      border-color: var(--primary-color, #03a9f4);
      border-style: solid;
      box-shadow: 0 0 0 2px rgba(3, 169, 244, 0.25);
    }
    .overlay-handle:active {
      cursor: grabbing;
    }
    .overlay-label-chip {
      position: absolute;
      top: -18px;
      left: 0;
      background: rgba(17, 17, 17, 0.8);
      color: #fff;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      pointer-events: none;
    }
    .overlay-type-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 1px 5px;
      border-radius: 3px;
      text-transform: uppercase;
      font-size: 9px;
      letter-spacing: 0.03em;
    }
    .overlay-resize {
      position: absolute;
      right: -5px;
      bottom: -5px;
      width: 14px;
      height: 14px;
      border-radius: 3px;
      background: var(--primary-color, #03a9f4);
      border: 2px solid rgba(255, 255, 255, 0.9);
      cursor: nwse-resize;
    }
    .overlay-inspector select,
    .overlay-inspector textarea {
      font: inherit;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .overlay-inspector textarea {
      font-family: var(--code-font-family, ui-monospace, monospace);
      font-size: 12px;
      width: 100%;
      box-sizing: border-box;
      resize: vertical;
    }
    .overlay-inspector .size-row {
      display: flex;
      gap: 8px;
    }
    .overlay-inspector .size-row label {
      flex: 1;
    }
    .overlay-inspector button {
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.06));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    .custom-config-error {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.08);
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .hint-sub {
      font-size: 11px;
      opacity: 0.65;
      margin: 0;
    }
    .inspector {
      margin: 0 12px 12px;
      padding: 10px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
    }
    .inspector h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }
    .inspector label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .inspector input {
      font: inherit;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .inspector .row {
      font-size: 12px;
      opacity: 0.85;
    }
    .inspector code {
      font-family: var(--code-font-family, ui-monospace, monospace);
    }
    button.danger {
      align-self: flex-start;
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--error-color, #ef4444);
      color: #fff;
      border: none;
      cursor: pointer;
    }
    .hint {
      opacity: 0.7;
      font-size: 13px;
      margin: 12px;
    }
    .error {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.08);
      padding: 8px 10px;
      margin: 0 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: pre-wrap;
    }
    .suggest-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .suggest-overlay polyline {
      fill: none;
      stroke: #f59e0b;
      stroke-width: 1;
      stroke-dasharray: 2 2;
      vector-effect: non-scaling-stroke;
    }
    .suggest-marker {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #f59e0b;
      border: 2px solid rgba(0, 0, 0, 0.6);
      pointer-events: none;
    }
    .suggest-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 12px;
      padding: 8px 10px;
      border-radius: 6px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.4);
      font-size: 12px;
    }
    .suggest-bar span {
      flex: 1;
    }
    .suggest-bar button {
      font: inherit;
      font-size: 12px;
      padding: 4px 12px;
      border-radius: 6px;
      border: none;
      background: #f59e0b;
      color: #111;
      cursor: pointer;
    }
    .suggest-bar button.ghost {
      background: transparent;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      color: var(--primary-text-color, inherit);
    }
    .weather-panel {
      margin: 0 12px 12px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
    }
    .weather-panel summary {
      list-style: none;
      cursor: pointer;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 600;
    }
    .weather-panel summary::-webkit-details-marker {
      display: none;
    }
    .weather-panel summary::before {
      content: '▸ ';
      font-size: 10px;
      margin-right: 2px;
    }
    .weather-panel[open] summary::before {
      content: '▾ ';
    }
    .weather-body {
      padding: 0 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .weather-body label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .weather-body input[type='text'],
    .weather-body input[type='number'] {
      font: inherit;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .weather-thumb {
      margin-top: 4px;
      width: 72px;
      height: 48px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: rgba(0, 0, 0, 0.25);
    }
    .weather-states {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 4px;
    }
    .weather-states-header {
      display: grid;
      grid-template-columns: 1fr 2fr auto;
      gap: 8px;
      font-size: 11px;
      opacity: 0.7;
    }
    .weather-row {
      display: grid;
      grid-template-columns: 1fr 2fr auto;
      gap: 8px;
      align-items: center;
    }
    .weather-row-end {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .weather-row-end .weather-thumb {
      margin-top: 0;
    }
    .weather-row-end button {
      font: inherit;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: transparent;
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    .add-state {
      align-self: flex-start;
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
  `;
M([
  T({ attribute: !1 })
], $.prototype, "hass", 2);
M([
  A()
], $.prototype, "config", 2);
M([
  A()
], $.prototype, "pending", 2);
M([
  A()
], $.prototype, "previewMode", 2);
M([
  A()
], $.prototype, "selectedNodeId", 2);
M([
  A()
], $.prototype, "selectedFlowId", 2);
M([
  A()
], $.prototype, "selectedOverlayId", 2);
M([
  A()
], $.prototype, "customConfigDraft", 2);
M([
  A()
], $.prototype, "customConfigError", 2);
M([
  A()
], $.prototype, "statusMessage", 2);
M([
  A()
], $.prototype, "errorMessage", 2);
M([
  A()
], $.prototype, "canUndo", 2);
M([
  A()
], $.prototype, "canRedo", 2);
M([
  A()
], $.prototype, "undoLabel", 2);
M([
  A()
], $.prototype, "redoLabel", 2);
M([
  A()
], $.prototype, "suggestPreview", 2);
M([
  A()
], $.prototype, "suggestBusy", 2);
$ = M([
  Et("flowme-card-editor")
], $);
var xs = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, Y = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? $s(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && xs(t, i, s), s;
};
const _s = "1.0.8", $e = 2e3;
console.info(
  `%c flowme %c v${_s} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
let I = class extends L {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = Pe(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.cameraRefreshTimer = null, this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e) {
      const i = this.config, n = [
        ...i?.flows.map((o) => o.entity) ?? [],
        ...i?.nodes.map((o) => o.entity).filter(Boolean) ?? [],
        ...i?.overlays?.map((o) => o.entity).filter(Boolean) ?? [],
        i?.background.weather_entity
      ].filter((o) => typeof o == "string" && o.length > 0), s = {};
      for (const o of n)
        s[o] = e.states[o]?.state;
      k("hass setter called. config entity states:", s);
    } else
      k("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    k("setConfig called:", JSON.parse(JSON.stringify(e ?? null)));
    try {
      const t = wt(e);
      k("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof qt ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), k("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    k("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), k("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg")), window.setTimeout(() => {
      const e = this.shadowRoot, t = e?.querySelector("animateMotion");
      k("t+2000ms — animateMotion element:", t ? t.outerHTML : "(none found)"), k("t+2000ms — animateMotion.dur=", t?.getAttribute("dur") ?? "(no dur)");
      const i = e?.querySelectorAll("animateMotion");
      k("t+2000ms — total animateMotion elements=", i?.length ?? 0), i?.forEach((n, s) => {
        const o = n.querySelector("mpath"), r = o?.getAttribute("href") ?? o?.getAttributeNS("http://www.w3.org/1999/xlink", "href"), c = r && e ? e.querySelector(r) : null;
        k(`t+2000ms — animateMotion[${s}] mpath href=${r} resolved=${!!c}`);
      });
    }, 2e3), window.setTimeout(() => {
      const e = this.shadowRoot?.innerHTML ?? "";
      k(`t+3000ms — shadow DOM HTML (first 2000 chars):
` + e.slice(0, 2e3));
    }, 3e3);
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.cameraRefreshTimer !== null && (window.clearInterval(this.cameraRefreshTimer), this.cameraRefreshTimer = null), super.disconnectedCallback();
  }
  syncCameraTimer() {
    const e = !!this.config?.overlays?.some((t) => t.type === "camera");
    if (e && this.cameraRefreshTimer === null) {
      const t = this.config?.overlays?.filter((n) => n.type === "camera").map((n) => (n.refresh_interval ?? this.config?.defaults?.camera_refresh_interval ?? 10) * 1e3), i = t?.length ? Math.min(...t) : 1e4;
      this.cameraRefreshTimer = window.setInterval(() => this.requestUpdate(), i);
    } else !e && this.cameraRefreshTimer !== null && (window.clearInterval(this.cameraRefreshTimer), this.cameraRefreshTimer = null);
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = en(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(t, i).catch((n) => {
        console.warn(
          "[flowme] renderer init failed — falling back to SVG renderer",
          n
        ), this.teardownRenderer(), this.renderer = new zt(), this.rendererReadyFor = i, this.renderer.init(t, i).catch((s) => {
          console.error("[flowme] SVG renderer init also failed", s);
        });
      });
    }
    if (e.has("hass") && this.renderer && this.hass) {
      k("willUpdate hass-changed → pushing values for", this.config.flows.length, "flow(s) to renderer", this.renderer.constructor.name);
      for (const i of this.config.flows) {
        const n = this.hass.states[i.entity], s = It(n?.state), o = ht(i.domain ?? this.config.domain), r = n?.attributes?.unit_of_measurement, c = Pi(s, r, o.unit_scale);
        if (k(
          "updateFlow →",
          i.id,
          "entity=",
          i.entity,
          "raw=",
          n?.state,
          "parsed=",
          s,
          "sensorUnit=",
          r ?? "(none)",
          "matchedUnit=",
          c.matchedUnit ?? "(none → passthrough)",
          "factor=",
          c.factor,
          "scaledToBase(" + o.unit_label + ")=",
          c.value
        ), n) {
          if (n.state === "unavailable" || n.state === "unknown") {
            const a = `${i.id}:${i.entity}:unavailable`;
            this.warnedMissing.has(a) || (this.warnedMissing.add(a), console.warn(
              `[flowme] flow "${i.id}" entity "${i.entity}" is currently ${n.state} — no flow will render until it reports a number`
            ));
          }
        } else {
          const a = `${i.id}:${i.entity}`;
          this.warnedMissing.has(a) || (this.warnedMissing.add(a), console.warn(
            `[flowme] flow "${i.id}" references entity "${i.entity}" but it is not present in hass.states — check spelling / domain permissions`
          ));
        }
        this.renderer.updateFlow(i.id, c.value);
      }
    }
    (e.has("config") || e.has("hass")) && this.syncWeatherBackground(), e.has("config") && this.syncCameraTimer();
  }
  getCardSize() {
    const e = vt(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = vt(this.config?.aspect_ratio) ?? 1.6;
    return {
      grid_columns: 4,
      grid_rows: Math.max(2, Math.round(4 / e) + 1),
      grid_min_columns: 2,
      grid_min_rows: 2,
      grid_max_columns: 4
    };
  }
  /** Alias kept for HA versions that look for `getGridOptions` instead. */
  getGridOptions() {
    return this.getLayoutOptions();
  }
  static getConfigElement() {
    return document.createElement("flowme-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:flowme-card",
      domain: "energy",
      background: {
        default: ""
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
          waypoints: []
        }
      ]
    };
  }
  render() {
    if (this.errorMessage)
      return m`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e)
      return m`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    const i = `${1 / (vt(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = e.background.transition_duration ?? $e;
    return m`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${i};`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, n)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, n)}
          ></div>
          <div class="renderer-mount" ${Ee(this.rendererMount)}></div>
          ${e.nodes.map((s) => this.renderNodeHandle(s))}
          ${(e.overlays ?? []).map((s) => (k("rendering overlay →", s.type, "entity=", s.entity ?? "(none)", "position=", s.position, "size=", s.size), dn(s, this.hass, this.config?.defaults)))}
        </div>
      </ha-card>
    `;
  }
  buildLayerStyle(e, t) {
    return `${e ? `background-image: url('${e}');` : ""} transition-duration: ${t}ms;`;
  }
  resolveTargetBackground() {
    const e = this.config?.background;
    if (!e) return "";
    if (e.weather_entity && e.weather_states && this.hass) {
      const t = this.hass.states[e.weather_entity];
      if (t) {
        const i = e.weather_states[t.state];
        if (i) return i;
      }
    }
    return e.default;
  }
  /**
   * Swap to the target weather background if it changed. Preloads the new
   * image first (so the crossfade doesn't fade in a blank layer), then
   * assigns the URL to whichever layer is currently invisible and flips
   * {@link activeLayer} to trigger the CSS opacity transition. After the
   * transition duration elapses the old layer is cleared so it's ready for
   * the next swap.
   */
  syncWeatherBackground() {
    if (!this.config) return;
    const e = this.resolveTargetBackground();
    if (!e || e === this.lastAppliedBgUrl) return;
    const t = this.config.background.transition_duration ?? $e;
    this.preload(e).then(() => {
      if (!this.config || this.resolveTargetBackground() !== e) return;
      this.transitionTimer !== null && window.clearTimeout(this.transitionTimer);
      const i = this.activeLayer === "A" ? "B" : "A";
      i === "A" ? this.bgLayerA = e : this.bgLayerB = e, requestAnimationFrame(() => {
        this.activeLayer = i, this.lastAppliedBgUrl = e, this.transitionTimer = window.setTimeout(() => {
          this.activeLayer === "A" ? this.bgLayerB = "" : this.bgLayerA = "", this.transitionTimer = null;
        }, t + 50);
      });
    });
  }
  preload(e) {
    if (!e) return Promise.resolve();
    const t = this.preloadCache.get(e);
    return t?.complete && t.naturalWidth > 0 ? Promise.resolve() : new Promise((i) => {
      const n = new Image();
      n.decoding = "async", n.onload = () => {
        this.preloadCache.set(e, n), i();
      }, n.onerror = () => i(), n.src = e, this.preloadCache.set(e, n);
    });
  }
  renderNodeHandle(e) {
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, n = e.show_label !== !1 && !!e.label, s = ht(this.config?.domain), o = e.color ?? this.nodeFlowColor(e.id) ?? s.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let c = "";
    if (t) {
      const a = It(t.state), l = t.attributes?.unit_of_measurement ?? "";
      l ? c = `${this.formatSensorNumber(a)} ${l}` : c = s.describe(a);
    }
    return m`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; --flowme-dot-size: ${r}px;`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${n ? m`<span class="node-label">${e.label}</span>` : null}
        ${i ? m`<span class="node-value">${c}</span>` : null}
      </div>
    `;
  }
  /**
   * Resolve a node's fill colour from its connected flows so the
   * dashboard visually groups nodes with their flow colour without the
   * user having to duplicate colours on every node.
   *
   * Each connected flow is resolved through the same `resolveFlowColor`
   * helper the renderer uses (explicit override → `flow.color`
   * shortcut → built-in domain default like solar/grid/battery/load →
   * profile fallback), always evaluated in the positive direction. If
   * every connecting flow resolves to the same colour the node adopts
   * it; if multiple distinct colours connect (the inverter case) the
   * node renders in `NEUTRAL_NODE_COLOR` (#CCCCCC) so it stops claiming
   * any single flow's hue. Returns `undefined` only when no flow
   * touches the node, letting the caller fall through to the profile
   * default. v1.0.7+.
   */
  nodeFlowColor(e) {
    if (!this.config) return;
    const t = this.config.domain, i = this.config.domain_colors;
    let n;
    const s = /* @__PURE__ */ new Set();
    for (const o of this.config.flows) {
      if (o.from_node !== e && o.to_node !== e) continue;
      const r = ht(o.domain ?? t), c = Ct(o, r, o.domain ?? t, 1, i), a = c.toLowerCase();
      s.has(a) || (s.add(a), n || (n = c));
    }
    if (s.size !== 0)
      return s.size === 1 ? n : Ri;
  }
  /**
   * Format a numeric sensor reading for node display. Mirrors the compact
   * thresholds the overlay renderer uses so values stay consistent across
   * the card.
   */
  formatSensorNumber(e) {
    if (!Number.isFinite(e)) return "—";
    const t = Math.abs(e);
    return t >= 1e3 || t >= 100 ? e.toFixed(0) : t >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
  teardownRenderer() {
    this.renderer && (this.renderer.destroy(), this.renderer = null), this.rendererReadyFor = void 0;
  }
};
I.styles = Mt`
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
      opacity: 0;
      transition-property: opacity;
      transition-timing-function: ease-in-out;
    }
    .background.visible {
      opacity: 1;
    }
    .renderer-mount {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .node {
      position: absolute;
      /* The configured (x%, y%) is the dot's CENTRE, not the wrapper's
       * centre. Pull the wrapper horizontally by -50% (column centred
       * on the point) and vertically by -dot_size/2 (so the dot, which
       * is the wrapper's first flex child sitting at y=0, has its own
       * centre on the point). Label / value flow downward in the flex
       * column without ever pushing the dot off-anchor — fixes the
       * v1.0.x bug where toggling show_value drifted the dot upward.
       * v1.0.7+. */
      transform: translate(-50%, calc(var(--flowme-dot-size, 12px) / -2));
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
      flex-shrink: 0;
    }
    .node-label {
      font-weight: 600;
      white-space: nowrap;
    }
    .node-value {
      opacity: 0.85;
      white-space: nowrap;
    }
    .overlay {
      position: absolute;
      transform: translate(-50%, -50%);
      min-width: 24px;
      min-height: 24px;
      border-radius: 8px;
      background: rgba(17, 17, 17, 0.55);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      color: #fff;
      padding: 6px 8px;
      font-size: 12px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      outline: none;
    }
    .overlay.interactive {
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease;
    }
    .overlay.interactive:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
    }
    .overlay.interactive:active {
      transform: translate(-50%, -50%) scale(0.97);
    }
    .overlay-body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: 2px;
      width: 100%;
      height: 100%;
      text-align: center;
    }
    .overlay-label {
      font-size: 10px;
      opacity: 0.75;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .overlay-value {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .value-unit {
      font-size: 10px;
      opacity: 0.75;
      margin-left: 3px;
      font-weight: 500;
    }
    .overlay-switch {
      /* 44 px is the iOS HIG / WCAG minimum touch target. Percentage
         sizes still scale the overlay visually, but we never let the
         actual clickable box shrink below 44×44. */
      min-width: 44px;
      min-height: 44px;
    }
    .switch-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      width: 100%;
      height: 100%;
    }
    .switch-body.is-on {
      box-shadow: inset 0 0 0 1px rgba(74, 222, 128, 0.6);
    }
    .switch-body.is-off {
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.5);
    }
    .switch-body .switch-track {
      width: 28px;
      height: 14px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      position: relative;
      margin: 2px auto;
      transition: background 150ms ease;
    }
    .switch-body.is-on .switch-track {
      background: var(--primary-color, #03a9f4);
    }
    .switch-body .switch-thumb {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      transition: transform 150ms ease;
    }
    .switch-body.is-on .switch-thumb {
      transform: translateX(14px);
    }
    .switch-state {
      font-size: 10px;
      opacity: 0.8;
    }
    .button-body {
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      font-weight: 600;
    }
    .camera-body {
      padding: 0;
      position: relative;
    }
    .camera-frame {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
      display: block;
    }
    .camera-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      color: rgba(255, 255, 255, 0.55);
    }
    .camera-icon {
      width: 40%;
      max-width: 48px;
      max-height: 48px;
      opacity: 0.9;
    }
    .overlay-camera {
      padding: 2px;
      background: rgba(8, 8, 8, 0.75);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    }
    .camera-label {
      position: absolute;
      bottom: 4px;
      left: 6px;
      right: 6px;
      font-size: 10px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .overlay-custom {
      padding: 0;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
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
Y([
  T({ attribute: !1 })
], I.prototype, "hass", 1);
Y([
  A()
], I.prototype, "config", 2);
Y([
  A()
], I.prototype, "errorMessage", 2);
Y([
  A()
], I.prototype, "bgLayerA", 2);
Y([
  A()
], I.prototype, "bgLayerB", 2);
Y([
  A()
], I.prototype, "activeLayer", 2);
I = Y([
  Et("flowme-card")
], I);
const Ht = window;
Ht.customCards = Ht.customCards ?? [];
Ht.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  I as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
