/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, Bt = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, jt = Symbol(), Jt = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== jt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Bt && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = Jt.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Jt.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (e) => new Ae(typeof e == "string" ? e : e + "", void 0, jt), Mt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Ae(n, e, jt);
}, je = (e, t) => {
  if (Bt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = bt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, e.appendChild(i);
  }
}, Xt = Bt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Be(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: We, defineProperty: Ve, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: qe, getOwnPropertySymbols: Ke, getPrototypeOf: Je } = Object, I = globalThis, Yt = I.trustedTypes, Xe = Yt ? Yt.emptyScript : "", Ye = I.reactiveElementPolyfillSupport, st = (e, t) => e, $t = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Xe : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, Wt = (e, t) => !We(e, t), Zt = { attribute: !0, type: String, converter: $t, reflect: !1, useDefault: !1, hasChanged: Wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), I.litPropertyMetadata ?? (I.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Zt) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, n);
      s !== void 0 && Ve(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: s, set: o } = Ge(this.prototype, t) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: s, set(r) {
      const c = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(st("elementProperties"))) return;
    const t = Je(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(st("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(st("properties"))) {
      const n = this.properties, i = [...qe(n), ...Ke(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) n.unshift(Xt(s));
    } else t !== void 0 && n.push(Xt(t));
    return n;
  }
  static _$Eu(t, n) {
    const i = n.attribute;
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
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
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
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$ET(t, n) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : $t).toAttribute(n, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : $t;
      this._$Em = s;
      const c = r.fromAttribute(n, o.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = r.getPropertyOptions(t)), !((i.hasChanged ?? Wt)(o, n) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? n ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, c = this[s];
        r !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, o, c);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[st("elementProperties")] = /* @__PURE__ */ new Map(), Z[st("finalized")] = /* @__PURE__ */ new Map(), Ye?.({ ReactiveElement: Z }), (I.reactiveElementVersions ?? (I.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, Qt = (e) => e, _t = ot.trustedTypes, te = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Se = "$lit$", U = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + U, Ze = `<${ke}>`, j = document, dt = () => j.createComment(""), ht = (e) => e === null || typeof e != "object" && typeof e != "function", Vt = Array.isArray, Qe = (e) => Vt(e) || typeof e?.[Symbol.iterator] == "function", Ot = `[ 	
\f\r]`, it = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, ne = />/g, L = RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ie = /'/g, se = /"/g, Ce = /^(?:script|style|textarea|title)$/i, tn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), m = tn(1), Q = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), oe = /* @__PURE__ */ new WeakMap(), B = j.createTreeWalker(j, 129);
function Me(e, t) {
  if (!Vt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return te !== void 0 ? te.createHTML(t) : t;
}
const en = (e, t) => {
  const n = e.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = it;
  for (let c = 0; c < n; c++) {
    const a = e[c];
    let l, h, d = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, h = r.exec(a), h !== null); ) p = r.lastIndex, r === it ? h[1] === "!--" ? r = ee : h[1] !== void 0 ? r = ne : h[2] !== void 0 ? (Ce.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = L) : h[3] !== void 0 && (r = L) : r === L ? h[0] === ">" ? (r = s ?? it, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, l = h[1], r = h[3] === void 0 ? L : h[3] === '"' ? se : ie) : r === se || r === ie ? r = L : r === ee || r === ne ? r = it : (r = L, s = void 0);
    const u = r === L && e[c + 1].startsWith("/>") ? " " : "";
    o += r === it ? a + Ze : d >= 0 ? (i.push(l), a.slice(0, d) + Se + a.slice(d) + U + u) : a + U + (d === -2 ? c : u);
  }
  return [Me(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ut {
  constructor({ strings: t, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, h] = en(t, n);
    if (this.el = ut.createElement(l, i), B.currentNode = this.el.content, n === 2 || n === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = B.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Se)) {
          const p = h[r++], u = s.getAttribute(d).split(U), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: o, name: g[2], strings: u, ctor: g[1] === "." ? sn : g[1] === "?" ? on : g[1] === "@" ? rn : Pt }), s.removeAttribute(d);
        } else d.startsWith(U) && (a.push({ type: 6, index: o }), s.removeAttribute(d));
        if (Ce.test(s.tagName)) {
          const d = s.textContent.split(U), p = d.length - 1;
          if (p > 0) {
            s.textContent = _t ? _t.emptyScript : "";
            for (let u = 0; u < p; u++) s.append(d[u], dt()), B.nextNode(), a.push({ type: 2, index: ++o });
            s.append(d[p], dt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ke) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(U, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += U.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const i = j.createElement("template");
    return i.innerHTML = t, i;
  }
}
function tt(e, t, n = e, i) {
  if (t === Q) return t;
  let s = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const o = ht(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (t = tt(e, s._$AS(e, t.values), s, i)), t;
}
class nn {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: i } = this._$AD, s = (t?.creationScope ?? j).importNode(n, !0);
    B.currentNode = s;
    let o = B.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new pt(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new an(o, this, t)), this._$AV.push(l), a = i[++c];
      }
      r !== a?.index && (o = B.nextNode(), r++);
    }
    return B.currentNode = j, s;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class pt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, s) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = tt(this, t, n), ht(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== Q && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== b && ht(this._$AH) ? this._$AA.nextSibling.data = t : this.T(j.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ut.createElement(Me(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const o = new nn(s, this), r = o.u(this.options);
      o.p(n), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let n = oe.get(t.strings);
    return n === void 0 && oe.set(t.strings, n = new ut(t)), n;
  }
  k(t) {
    Vt(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const o of t) s === n.length ? n.push(i = new pt(this.O(dt()), this.O(dt()), this, this.options)) : i = n[s], i._$AI(o), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = Qt(t).nextSibling;
      Qt(t).remove(), t = i;
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
  constructor(t, n, i, s, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  _$AI(t, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = tt(this, t, n, 0), r = !ht(t) || t !== this._$AH && t !== Q, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = tt(this, c[i + a], n, a), l === Q && (l = this._$AH[a]), r || (r = !ht(l) || l !== this._$AH[a]), l === b ? t = b : t !== b && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class sn extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
class on extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== b);
  }
}
class rn extends Pt {
  constructor(t, n, i, s, o) {
    super(t, n, i, s, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = tt(this, t, n, 0) ?? b) === Q) return;
    const i = this._$AH, s = t === b && i !== b || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== b && (i === b || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class an {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    tt(this, t);
  }
}
const cn = ot.litHtmlPolyfillSupport;
cn?.(ut, pt), (ot.litHtmlVersions ?? (ot.litHtmlVersions = [])).push("3.3.2");
const ln = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = n?.renderBefore ?? null;
    i._$litPart$ = s = new pt(t.insertBefore(dt(), o), o, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis;
let z = class extends Z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const t = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = t.firstChild), t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ln(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Q;
  }
};
z._$litElement$ = !0, z.finalized = !0, rt.litElementHydrateSupport?.({ LitElement: z });
const dn = rt.litElementPolyfillSupport;
dn?.({ LitElement: z });
(rt.litElementVersions ?? (rt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hn = { attribute: !0, type: String, converter: $t, reflect: !1, hasChanged: Wt }, un = (e = hn, t, n) => {
  const { kind: i, metadata: s } = n;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(n.name, e), i === "accessor") {
    const { name: r } = n;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, e, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function T(e) {
  return (t, n) => typeof n == "object" ? un(e, t, n) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, n);
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
const pn = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fn = { CHILD: 2 }, gn = (e) => (...t) => ({ _$litDirective$: e, values: t });
class mn {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, n, i) {
    this._$Ct = t, this._$AM = n, this._$Ci = i;
  }
  _$AS(t, n) {
    return this.update(t, n);
  }
  update(t, n) {
    return this.render(...n);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = (e, t) => {
  const n = e._$AN;
  if (n === void 0) return !1;
  for (const i of n) i._$AO?.(t, !1), at(i, t);
  return !0;
}, At = (e) => {
  let t, n;
  do {
    if ((t = e._$AM) === void 0) break;
    n = t._$AN, n.delete(e), e = t;
  } while (n?.size === 0);
}, Pe = (e) => {
  for (let t; t = e._$AM; e = t) {
    let n = t._$AN;
    if (n === void 0) t._$AN = n = /* @__PURE__ */ new Set();
    else if (n.has(e)) break;
    n.add(e), wn(t);
  }
};
function yn(e) {
  this._$AN !== void 0 ? (At(this), this._$AM = e, Pe(this)) : this._$AM = e;
}
function bn(e, t = !1, n = 0) {
  const i = this._$AH, s = this._$AN;
  if (s !== void 0 && s.size !== 0) if (t) if (Array.isArray(i)) for (let o = n; o < i.length; o++) at(i[o], !1), At(i[o]);
  else i != null && (at(i, !1), At(i));
  else at(this, e);
}
const wn = (e) => {
  e.type == fn.CHILD && (e._$AP ?? (e._$AP = bn), e._$AQ ?? (e._$AQ = yn));
};
class vn extends mn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, n, i) {
    super._$AT(t, n, i), Pe(this), this.isConnected = t._$AU;
  }
  _$AO(t, n = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), n && (at(this, t), At(this));
  }
  setValue(t) {
    if (pn(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const n = [...this._$Ct._$AH];
      n[this._$Ci] = t, this._$Ct._$AI(n, this, 0);
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
const Ee = () => new xn();
class xn {
}
const Rt = /* @__PURE__ */ new WeakMap(), Te = gn(class extends vn {
  render(e) {
    return b;
  }
  update(e, [t]) {
    const n = t !== this.G;
    return n && this.G !== void 0 && this.rt(void 0), (n || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), b;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let n = Rt.get(t);
      n === void 0 && (n = /* @__PURE__ */ new WeakMap(), Rt.set(t, n)), n.get(this.G) !== void 0 && this.G.call(this.ht, void 0), n.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? Rt.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
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
], ct = ["sensor", "switch", "camera", "button", "custom"], Ut = ["toggle", "more-info", "none"], $n = ["javascript:", "vbscript:", "data:", "file:"];
function Ne(e, t = "card_config") {
  const n = [], i = /* @__PURE__ */ new WeakSet(), s = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const c = o.trim().toLowerCase();
        for (const a of $n)
          if (c.startsWith(a)) {
            n.push({ path: r, value: o, scheme: a });
            return;
          }
        return;
      }
      if (typeof o == "object" && !i.has(o)) {
        if (i.add(o), Array.isArray(o)) {
          for (let c = 0; c < o.length; c++) s(o[c], `${r}[${c}]`);
          return;
        }
        for (const [c, a] of Object.entries(o))
          s(a, `${r}.${c}`);
      }
    }
  };
  return s(e, t), n;
}
function _n(e, t = "card_config") {
  const n = Ne(e, t);
  if (n.length === 0) return;
  const i = n[0];
  throw new Error(
    `Unsafe URL scheme '${i.scheme}' in ${i.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class Gt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const re = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function f(e, t) {
  throw new Gt(`${e}: ${t}`);
}
function qt(e, t) {
  (!e || typeof e != "object") && f(t, "must be an object with x and y");
  const n = e, i = n.x, s = n.y;
  (typeof i != "number" || !Number.isFinite(i)) && f(`${t}.x`, "must be a finite number"), (typeof s != "number" || !Number.isFinite(s)) && f(`${t}.y`, "must be a finite number");
  const o = i, r = s;
  return (o < 0 || o > 100) && f(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && f(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function ae(e, t) {
  (typeof e != "string" || !e.length) && f(t, "must be a non-empty string");
  const n = e;
  return re.some((s) => n.startsWith(s)) || f(
    t,
    `must start with one of ${re.join(", ")} (got "${n.slice(0, 40)}")`
  ), n;
}
function An(e, t, n) {
  const i = `nodes[${t}]`;
  (!e || typeof e != "object") && f(i, "must be an object");
  const s = e, o = s.id;
  (typeof o != "string" || !o.length) && f(`${i}.id`, "must be a non-empty string");
  const r = o;
  n.has(r) && f(`${i}.id`, `duplicate node id "${r}"`), n.add(r);
  const c = qt(s.position, `${i}.position`), a = { id: r, position: c };
  return typeof s.entity == "string" && (a.entity = s.entity), typeof s.label == "string" && (a.label = s.label), typeof s.color == "string" && (a.color = s.color), typeof s.size == "number" && (a.size = s.size), typeof s.show_label == "boolean" && (a.show_label = s.show_label), typeof s.show_value == "boolean" && (a.show_value = s.show_value), a;
}
function Sn(e, t, n, i) {
  const s = `flows[${t}]`;
  (!e || typeof e != "object") && f(s, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && f(`${s}.id`, "must be a non-empty string");
  const c = r;
  n.has(c) && f(`${s}.id`, `duplicate flow id "${c}"`), n.add(c);
  const a = o.from_node;
  (typeof a != "string" || !i.has(a)) && f(`${s}.from_node`, `references unknown node "${String(a)}"`);
  const l = o.to_node;
  (typeof l != "string" || !i.has(l)) && f(`${s}.to_node`, `references unknown node "${String(l)}"`);
  const h = o.entity;
  (typeof h != "string" || !h.length) && f(`${s}.entity`, "must be a non-empty entity id");
  const d = o.waypoints;
  let p = [];
  d !== void 0 && (Array.isArray(d) || f(`${s}.waypoints`, "must be an array (may be empty or omitted)"), p = d.map(
    (g, w) => qt(g, `${s}.waypoints[${w}]`)
  ));
  const u = {
    id: c,
    from_node: a,
    to_node: l,
    entity: h,
    waypoints: p
  };
  if (typeof o.domain == "string" && (St.includes(o.domain) || f(`${s}.domain`, `must be one of ${St.join(", ")}`), u.domain = o.domain), typeof o.color == "string" && (u.color = o.color), typeof o.color_positive == "string" && (u.color_positive = o.color_positive), typeof o.color_negative == "string" && (u.color_negative = o.color_negative), typeof o.threshold == "number" && (u.threshold = o.threshold), typeof o.reverse == "boolean" && (u.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const g = o.speed_multiplier;
    (g < 0.1 || g > 5) && f(`${s}.speed_multiplier`, "must be between 0.1 and 5.0"), u.speed_multiplier = g;
  }
  return o.speed_curve_override !== void 0 && (u.speed_curve_override = kn(
    o.speed_curve_override,
    `${s}.speed_curve_override`
  )), u;
}
function kn(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && f(t, "must be an object");
  const n = e, i = {};
  function s(p) {
    const u = n[p];
    if (u !== void 0)
      return (typeof u != "number" || !Number.isFinite(u) || u <= 0) && f(`${t}.${p}`, "must be a positive finite number"), u;
  }
  function o(p) {
    const u = n[p];
    if (u !== void 0)
      return (typeof u != "number" || !Number.isFinite(u) || u < 50) && f(`${t}.${p}`, "must be a finite number ≥ 50 (milliseconds)"), u;
  }
  const r = s("threshold");
  r !== void 0 && (i.threshold = r);
  const c = s("p50");
  c !== void 0 && (i.p50 = c);
  const a = s("peak");
  a !== void 0 && (i.peak = a);
  const l = o("max_duration");
  l !== void 0 && (i.max_duration = l);
  const h = o("min_duration");
  if (h !== void 0 && (i.min_duration = h), n.steepness !== void 0) {
    const p = n.steepness;
    (typeof p != "number" || !Number.isFinite(p) || p <= 0) && f(`${t}.steepness`, "must be a positive finite number"), i.steepness = p;
  }
  i.max_duration !== void 0 && i.min_duration !== void 0 && i.min_duration >= i.max_duration && f(t, "min_duration must be < max_duration");
  const d = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const p of Object.keys(n))
    d.has(p) || f(`${t}.${p}`, `unknown key (allowed: ${[...d].join(", ")})`);
  return i;
}
function wt(e) {
  if (!e || typeof e != "object") throw new Gt("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && f("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), St.includes(t.domain) || f("domain", `must be one of ${St.join(", ")}`);
  const n = t.background;
  n !== void 0 && (n === null || typeof n != "object") && f("background", "must be an object when provided");
  const i = n ?? {}, o = { default: i.default === void 0 || i.default === "" ? "" : ae(i.default, "background.default") };
  if (i.weather_entity !== void 0 && (typeof i.weather_entity != "string" && f("background.weather_entity", "must be a string entity id"), o.weather_entity = i.weather_entity), i.weather_states !== void 0) {
    (!i.weather_states || typeof i.weather_states != "object") && f("background.weather_states", "must be an object mapping state strings to image URLs");
    const u = Object.entries(i.weather_states), g = {};
    for (const [w, y] of u)
      g[w] = ae(y, `background.weather_states.${w}`);
    o.weather_states = g;
  }
  i.transition_duration !== void 0 && (typeof i.transition_duration != "number" && f("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = i.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || f("nodes", "must be an array");
  const c = /* @__PURE__ */ new Set(), a = r.map((u, g) => An(u, g, c));
  a.length === 0 && f("nodes", "at least one node is required");
  const l = t.flows;
  Array.isArray(l) || f("flows", "must be an array");
  const h = /* @__PURE__ */ new Set(), d = l.map(
    (u, g) => Sn(u, g, h, c)
  ), p = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: a,
    flows: d
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && f("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), p.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && f("fullscreen", "must be a boolean"), p.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && f("edit_mode_password", "must be a string"), p.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || f("overlays", "must be an array");
    const u = /* @__PURE__ */ new Set();
    p.overlays = t.overlays.map(
      (g, w) => Cn(g, w, u)
    );
  }
  return p;
}
function Cn(e, t, n) {
  const i = `overlays[${t}]`;
  (!e || typeof e != "object") && f(i, "must be an object");
  const s = e, o = s.type;
  (typeof o != "string" || !ct.includes(o)) && f(`${i}.type`, `must be one of ${ct.join(", ")}`);
  const r = s.id;
  (typeof r != "string" || !r.length) && f(`${i}.id`, "must be a non-empty string"), n.has(r) && f(`${i}.id`, `duplicate overlay id "${r}"`), n.add(r);
  const c = qt(s.position, `${i}.position`), a = {
    id: r,
    type: o,
    position: c
  };
  if (s.entity !== void 0 && ((typeof s.entity != "string" || !s.entity.length) && f(`${i}.entity`, "must be a non-empty entity id"), a.entity = s.entity), (o === "sensor" || o === "switch" || o === "camera") && !a.entity && f(`${i}.entity`, `is required for overlay type "${o}"`), s.label !== void 0 && (typeof s.label != "string" && f(`${i}.label`, "must be a string"), a.label = s.label), s.size !== void 0) {
    const l = s.size;
    (!l || typeof l != "object") && f(`${i}.size`, "must be an object with width and height");
    const h = l, d = h.width, p = h.height;
    (typeof d != "number" || !Number.isFinite(d) || d <= 0 || d > 100) && f(`${i}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof p != "number" || !Number.isFinite(p) || p <= 0 || p > 100) && f(`${i}.size.height`, "must be a positive number ≤ 100 (percent of card)"), a.size = { width: d, height: p };
  }
  if (s.tap_action !== void 0) {
    const l = s.tap_action;
    (!l || typeof l != "object") && f(`${i}.tap_action`, "must be an object");
    const d = l.action;
    (typeof d != "string" || !Ut.includes(d)) && f(`${i}.tap_action.action`, `must be one of ${Ut.join(", ")}`), a.tap_action = { action: d };
  }
  if (s.card_config !== void 0) {
    const l = s.card_config;
    (!l || typeof l != "object" || Array.isArray(l)) && f(`${i}.card_config`, "must be an object"), o !== "custom" && f(`${i}.card_config`, 'is only valid when type === "custom"');
    const h = Ne(l, `${i}.card_config`);
    if (h.length) {
      const d = h[0];
      f(
        d.path,
        `unsafe URL scheme "${d.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in custom overlay configs`
      );
    }
    a.card_config = l;
  }
  return o === "custom" && !a.card_config && f(`${i}.card_config`, 'is required when type === "custom"'), a;
}
function Kt(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function kt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function Oe(e) {
  let t = 0;
  for (let n = 1; n < e.length; n++) {
    const i = e[n - 1], s = e[n];
    if (!i || !s) continue;
    const o = s.x - i.x, r = s.y - i.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function Mn(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const n = Oe(e), i = Kt(t, 0, 1) * n;
  let s = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], c = e[o], a = c.x - r.x, l = c.y - r.y, h = Math.sqrt(a * a + l * l);
    if (s + h >= i) {
      const d = h === 0 ? 0 : (i - s) / h;
      return { x: r.x + a * d, y: r.y + l * d };
    }
    s += h;
  }
  return { ...e[e.length - 1] };
}
function ce(e, t) {
  if (e.length === 0) return "";
  const [n, ...i] = e;
  if (!n) return "";
  const s = kt(n, t), o = [`M ${s.x.toFixed(2)} ${s.y.toFixed(2)}`];
  for (const r of i) {
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
  const n = Number.parseFloat(t);
  return Number.isFinite(n) ? n : 0;
}
const W = 9e3, V = 700, G = 1.5;
function D(e, t) {
  const { threshold: n, p50: i, max_duration: s, min_duration: o, steepness: r } = t, c = Math.abs(e);
  if (!(i > 0) || !(n > 0)) return s;
  const a = Math.max(c, n), l = Math.log10(a / i), h = 1 / (1 + Math.exp(-r * l));
  return s - h * (s - o);
}
function Re(e, t) {
  const n = e.speed_curve_override ?? {}, i = n.threshold ?? e.threshold ?? t.threshold, s = n.p50 ?? t.p50, o = n.peak ?? t.peak, r = n.max_duration ?? W, c = n.min_duration ?? V, a = n.steepness ?? G;
  return { threshold: i, p50: s, peak: o, max_duration: r, min_duration: c, steepness: a };
}
function Pn(e, t, n) {
  if (!n || !t) return { value: e, factor: 1 };
  const i = t.trim();
  if (!i) return { value: e, factor: 1 };
  if (Object.prototype.hasOwnProperty.call(n, i)) {
    const r = n[i] ?? 1;
    return { value: e * r, factor: r, matchedUnit: i };
  }
  const s = i.toLowerCase(), o = Object.entries(n).filter(
    ([r]) => r.toLowerCase() === s
  );
  if (o.length === 1) {
    const [r, c] = o[0];
    return { value: e * c, factor: c, matchedUnit: r };
  }
  return { value: e, factor: 1 };
}
function Fe(e, t) {
  let n = null, i = null;
  const s = (...o) => {
    i = o, n !== null && clearTimeout(n), n = setTimeout(() => {
      n = null, i && e(...i), i = null;
    }, t);
  };
  return s.cancel = () => {
    n !== null && (clearTimeout(n), n = null), i = null;
  }, s;
}
function vt(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const n = Number.parseInt(t[1], 10), i = Number.parseInt(t[2], 10);
  if (!(!n || !i))
    return n / i;
}
const En = {
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
    return D(e, {
      threshold: 30,
      p50: 800,
      max_duration: W,
      min_duration: V,
      steepness: G
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, Tn = {
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
    return D(e, {
      threshold: 0.3,
      p50: 6,
      max_duration: W,
      min_duration: V,
      steepness: G
    });
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, Nn = {
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
    return D(e, {
      threshold: 0.05,
      p50: 50,
      max_duration: W,
      min_duration: V,
      steepness: G
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
}, On = {
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
    return D(e, {
      threshold: 5,
      p50: 200,
      max_duration: W,
      min_duration: V,
      steepness: G
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return Kt(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, Rn = {
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
    return D(e, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: W,
      min_duration: V,
      steepness: G
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, Ue = {
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
    return D(e, {
      threshold: 1,
      p50: 100,
      max_duration: W,
      min_duration: V,
      steepness: G
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, le = {
  energy: En,
  water: Tn,
  network: Nn,
  hvac: On,
  gas: Rn,
  generic: Ue
};
function lt(e) {
  return e && e in le ? le[e] : Ue;
}
const Fn = "#CCCCCC";
function Un(e, t) {
  if (e !== "energy") return;
  const n = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(n)) return "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(n)) return "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(n)) return "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(n))
    return "#FF8C1E";
}
function Ct(e, t, n, i) {
  const s = e.color ?? Un(n, e.id);
  return i >= 0 ? e.color_positive ?? s ?? t.default_color_positive : e.color_negative ?? s ?? t.default_color_negative;
}
const In = "[FlowMe]";
function k(...e) {
  console.warn(In, ...e);
}
const zn = "[FlowMe Renderer]";
function C(...e) {
  console.warn(zn, ...e);
}
const P = "http://www.w3.org/2000/svg", gt = "http://www.w3.org/1999/xlink";
function Dn() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const mt = Dn(), Ln = 2e3, Hn = 3, Bn = 5, yt = 9, jn = 2, Wn = 8, Vn = 14, de = 0.9, he = 5e3, ue = 20;
class zt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Fe(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set();
  }
  async init(t, n) {
    C("init called — container:", t, "| container size:", t.getBoundingClientRect(), "| flows:", n.flows.length, "| nodes:", n.nodes.length), C("init config flows:", n.flows.map((s) => ({ id: s.id, entity: s.entity, from: s.from_node, to: s.to_node, waypoints: s.waypoints.length, domain: s.domain }))), this.container = t, this.config = n, this.flowsById = new Map(n.flows.map((s) => [s.id, s]));
    const i = document.createElementNS(P, "svg");
    i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("preserveAspectRatio", "none"), i.style.position = "absolute", i.style.inset = "0", i.style.pointerEvents = "none", i.style.overflow = "visible", this.svg = i, t.appendChild(i), C("<svg> element appended to container. Parent shadow-root?", t.getRootNode().constructor.name), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t);
  }
  updateFlow(t, n) {
    if (!this.flowsById.has(t)) {
      C("updateFlow called for UNKNOWN flowId:", t);
      return;
    }
    C("updateFlow:", t, "value=", n, "→ queued, will flush in 200ms"), this.latestValues.set(t, n), this.applyUpdate();
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
    const n = document.createElementNS(P, "defs");
    this.svg.appendChild(n);
    const i = new Map(this.config.nodes.map((s) => [s.id, s]));
    for (const s of this.config.flows) {
      const o = i.get(s.from_node), r = i.get(s.to_node);
      if (!o || !r) continue;
      const a = this.profileFor(s).shape, l = [o.position, ...s.waypoints, r.position], h = `flowme-path-${s.id}`, d = document.createElementNS(P, "path");
      d.setAttribute("id", h), d.setAttribute("d", ce(l, t)), d.setAttribute("fill", "none"), n.appendChild(d);
      const p = document.createElementNS(P, "g");
      p.setAttribute("data-flow-id", s.id);
      const u = document.createElementNS(P, "use");
      u.setAttributeNS(gt, "href", `#${h}`), u.setAttribute("href", `#${h}`), u.setAttribute("stroke", this.primaryColor(s)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(jn)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), p.appendChild(u);
      const g = {
        group: p,
        path: d,
        pathId: h,
        shape: a,
        particles: []
      };
      if (a === "wave") {
        const y = document.createElementNS(P, "use");
        y.setAttributeNS(gt, "href", `#${h}`), y.setAttribute("href", `#${h}`), y.setAttribute("stroke", this.primaryColor(s)), y.setAttribute("stroke-width", String(Wn)), y.setAttribute("stroke-opacity", "0.9"), y.setAttribute("stroke-linecap", "round"), y.setAttribute("stroke-linejoin", "round"), y.setAttribute("fill", "none"), y.setAttribute("stroke-dasharray", "14 10"), y.setAttribute("stroke-dashoffset", "0"), y.setAttribute("opacity", "0"), p.appendChild(y), g.waveStroke = y;
      } else a === "pulse" && (g.pulseCircles = []);
      this.svg.appendChild(p), this.flowNodes.set(s.id, g);
      const w = d.getAttribute("d") ?? "";
      C(
        "flow element appended:",
        s.id,
        "| pathId=",
        h,
        "| d=",
        w,
        "| shape=",
        a,
        "| group outerHTML[0..200]=",
        p.outerHTML.slice(0, 200)
      );
    }
    C("buildSkeleton complete. flowNodes map size=", this.flowNodes.size, "| <svg> children=", this.svg.children.length);
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const n = new Map(this.config.nodes.map((i) => [i.id, i]));
    for (const i of this.config.flows) {
      const s = this.flowNodes.get(i.id);
      if (!s) continue;
      const o = n.get(i.from_node), r = n.get(i.to_node);
      if (!o || !r) continue;
      const c = [o.position, ...i.waypoints, r.position];
      s.path.setAttribute("d", ce(c, t)), s.shape === "pulse" && this.applyFlow(i.id, this.latestValues.get(i.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, n] of this.latestValues)
      this.applyFlow(t, n);
  }
  applyFlow(t, n) {
    const i = this.flowsById.get(t), s = this.flowNodes.get(t);
    if (!i || !s) {
      C("applyFlow SKIP (unknown flow or no DOM):", t, "hasFlow?", !!i, "hasDom?", !!s);
      return;
    }
    const o = this.profileFor(i), r = Re(i, o), c = mt ? 0 : r.threshold, a = Math.abs(n), l = mt || a >= c;
    if (C(
      "applyFlow:",
      t,
      "value=",
      n,
      "| magnitude=",
      a,
      "| threshold=",
      c,
      "| visible=",
      l,
      "| DEBUG=",
      mt,
      "| curve params (resolved)=",
      r,
      "| override=",
      i.speed_curve_override ?? "(none)"
    ), !l) {
      this.setGroupVisible(s, !1), C("applyFlow → flow", t, "hidden (below threshold). No animation will run.");
      return;
    }
    this.setGroupVisible(s, !0);
    const h = i.speed_multiplier ?? 1, d = D(a, r), p = mt ? Ln : Math.max(50, d * h), u = n < 0 != (i.reverse === !0) ? -1 : 1, g = i.domain ?? this.config?.domain, w = Ct(i, o, g, u), y = this.updateBurstState(t, a, r, o);
    switch (C(
      "applyFlow → computed:",
      t,
      "| domain=",
      g ?? "(default)",
      "| shape=",
      s.shape,
      "| sigmoidSpeedCurve(mag)=",
      d,
      "| speedMult=",
      h,
      "| dur=",
      p,
      "ms",
      "| direction=",
      u,
      "| resolved color=",
      w,
      "| burstMultiplier=",
      y,
      "| flow.color=",
      i.color,
      "| flow.color_positive=",
      i.color_positive,
      "| flow.color_negative=",
      i.color_negative,
      "| profile.default_color_positive=",
      o.default_color_positive
    ), s.shape) {
      case "wave":
        this.applyWave(s, o, p, w, u);
        break;
      case "pulse":
        this.applyPulse(s, i, o, n, p, w, y);
        break;
      case "square":
        this.applyParticles(s, i, o, n, p, w, u, "square", y);
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(s, i, o, n, p, w, u, "dot", y);
        break;
    }
  }
  /**
   * Track whether a flow has sustained ≥ 90 % of its resolved `peak`
   * (override-aware) for at least 5 s. Return the particle-count
   * multiplier to apply right now (1 outside burst, profile's
   * `burst_density_multiplier` inside — default 1.5).
   */
  updateBurstState(t, n, i, s) {
    const o = i.peak, r = o * de, c = n >= r, a = performance.now();
    if (!c)
      return this.burstActive.has(t) && (C("burst EXIT:", t, "magnitude=", n, "droppedBelow=", r.toFixed(2)), this.burstActive.delete(t)), this.burstEnteredAt.delete(t), 1;
    let l = this.burstEnteredAt.get(t);
    l === void 0 && (l = a, this.burstEnteredAt.set(t, l));
    const h = a - l;
    if (h < he)
      return C(
        "burst PENDING:",
        t,
        "magnitude=",
        n,
        "| above",
        r.toFixed(2),
        "for",
        Math.round(h),
        "ms of",
        he
      ), 1;
    const d = s.burst_density_multiplier ?? 1.5;
    return this.burstActive.has(t) || (C(
      "burst ENTER:",
      t,
      "| sustained ≥",
      (de * 100).toFixed(0) + "%",
      "of peak",
      o,
      "for",
      Math.round(h),
      "ms → density ×" + d
    ), this.burstActive.add(t)), d;
  }
  setGroupVisible(t, n) {
    const i = n ? "1" : "0";
    for (const s of t.particles) s.shape.setAttribute("opacity", i);
    if (t.waveStroke && t.waveStroke.setAttribute("opacity", n ? "0.9" : "0"), t.pulseCircles)
      for (const s of t.pulseCircles) s.circle.setAttribute("opacity", i);
  }
  applyParticles(t, n, i, s, o, r, c, a, l) {
    const h = Math.max(
      1,
      Math.round(
        i.particle_count_curve ? i.particle_count_curve(s) : Hn
      )
    ), d = Math.min(
      ue,
      Math.max(1, Math.round(h * l))
    );
    if (l !== 1 && C("applyParticles burst → base=", h, "× mult=", l, "→ final=", d), t.particles.length !== d) {
      for (const u of t.particles) u.shape.remove();
      t.particles = [];
      for (let u = 0; u < d; u++)
        t.particles.push(this.makeParticle(t, a, r, i.glow));
    }
    const p = `${(o / 1e3).toFixed(3)}s`;
    C("applyParticles:", t.pathId, "| kind=", a, "| count=", t.particles.length, "| dur=", p, "| color=", r, "| direction=", c);
    for (let u = 0; u < t.particles.length; u++) {
      const g = t.particles[u];
      if (!g) continue;
      g.shape.setAttribute("fill", r), i.glow && (g.shape.style.color = r);
      const w = document.createElementNS(P, "animateMotion");
      w.setAttribute("repeatCount", "indefinite"), w.setAttribute("dur", p), w.setAttribute("rotate", "auto"), w.setAttribute(
        "begin",
        `${(-o * u / (t.particles.length * 1e3)).toFixed(3)}s`
      ), c < 0 && (w.setAttribute("keyPoints", "1;0"), w.setAttribute("keyTimes", "0;1"));
      const y = document.createElementNS(P, "mpath");
      y.setAttributeNS(gt, "href", `#${t.pathId}`), y.setAttribute("href", `#${t.pathId}`), w.appendChild(y), g.animateMotion.replaceWith(w), g.animateMotion = w, g.shape.appendChild(w), u === 0 && C(
        "animateMotion[0] installed on",
        t.pathId,
        "| dur=",
        w.getAttribute("dur"),
        "| mpath href=#" + t.pathId,
        "| element outerHTML[0..200]=",
        w.outerHTML.slice(0, 200),
        "| parent shape outerHTML[0..200]=",
        g.shape.outerHTML.slice(0, 200)
      );
    }
    k("SVG flow created:", t.pathId, "pathD=", t.path.getAttribute("d"), "dur=", p, "particles=", t.particles.length);
  }
  applyWave(t, n, i, s, o) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", s);
    const c = r.querySelector("animate");
    c && c.remove();
    const a = document.createElementNS(P, "animate");
    a.setAttribute("attributeName", "stroke-dashoffset"), a.setAttribute("from", o > 0 ? "0" : "-24"), a.setAttribute("to", o > 0 ? "-24" : "0"), a.setAttribute("dur", `${(i / 1e3).toFixed(3)}s`), a.setAttribute("repeatCount", "indefinite"), r.appendChild(a);
  }
  applyPulse(t, n, i, s, o, r, c) {
    if (!this.svg) return;
    const a = t.group, l = new Map(this.config?.nodes.map((x) => [x.id, x]) ?? []), h = l.get(n.from_node), d = l.get(n.to_node);
    if (!h || !d) return;
    const p = [h.position, ...n.waypoints, d.position], u = Oe(p), g = Math.max(
      2,
      Math.round(
        i.particle_count_curve ? i.particle_count_curve(s) : Math.max(3, Math.floor(u / 15))
      )
    ), w = Math.min(
      ue,
      Math.max(2, Math.round(g * c))
    );
    c !== 1 && C("applyPulse burst → base=", g, "× mult=", c, "→ final=", w);
    const y = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== w) {
      if (t.pulseCircles) for (const x of t.pulseCircles) x.circle.remove();
      t.pulseCircles = [];
      for (let x = 0; x < w; x++) {
        const v = document.createElementNS(P, "circle");
        v.setAttribute("r", "0"), v.setAttribute("fill", r), v.setAttribute("opacity", "0"), i.glow && v.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), v.style.color = r;
        const S = document.createElementNS(P, "animate");
        S.setAttribute("attributeName", "r"), S.setAttribute("values", `0;${Vn};0`), S.setAttribute("repeatCount", "indefinite"), v.appendChild(S);
        const N = document.createElementNS(P, "animate");
        N.setAttribute("attributeName", "opacity"), N.setAttribute("values", "0;1;0"), N.setAttribute("repeatCount", "indefinite"), v.appendChild(N), a.appendChild(v), t.pulseCircles.push({ circle: v, animateRadius: S, animateOpacity: N });
      }
    }
    for (let x = 0; x < t.pulseCircles.length; x++) {
      const v = t.pulseCircles[x];
      if (!v) continue;
      const S = (x + 0.5) / t.pulseCircles.length, N = Mn(p, S), ft = kt(N, y);
      v.circle.setAttribute("cx", ft.x.toFixed(2)), v.circle.setAttribute("cy", ft.y.toFixed(2)), v.circle.setAttribute("fill", r), v.circle.style.color = r;
      const nt = `${(o / 1e3).toFixed(3)}s`, O = `${(-o * x / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      v.animateRadius.setAttribute("dur", nt), v.animateRadius.setAttribute("begin", O), v.animateOpacity.setAttribute("dur", nt), v.animateOpacity.setAttribute("begin", O);
    }
  }
  makeParticle(t, n, i, s) {
    let o;
    if (n === "square") {
      const a = document.createElementNS(P, "rect");
      a.setAttribute("width", String(yt)), a.setAttribute("height", String(yt)), a.setAttribute("x", String(-yt / 2)), a.setAttribute("y", String(-yt / 2)), a.setAttribute("rx", "1.5"), a.setAttribute("fill", i), a.setAttribute("opacity", "0"), o = a;
    } else {
      const a = document.createElementNS(P, "circle");
      a.setAttribute("r", String(Bn)), a.setAttribute("fill", i), a.setAttribute("opacity", "0"), o = a;
    }
    s && (o.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), o.style.color = i);
    const r = document.createElementNS(P, "animateMotion");
    r.setAttribute("repeatCount", "indefinite"), r.setAttribute("dur", "2s");
    const c = document.createElementNS(P, "mpath");
    return c.setAttributeNS(gt, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), r.appendChild(c), o.appendChild(r), t.group.appendChild(o), { shape: o, animateMotion: r };
  }
  profileFor(t) {
    return lt(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const n = this.profileFor(t), i = t.domain ?? this.config?.domain;
    return Ct(t, n, i, 1);
  }
}
const Gn = `/* eslint-disable no-undef */
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
    const color = String(props.get('--flowme-color') || '#A78BFA').trim() || '#A78BFA';
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
`, pe = "flowme-keyframes", Dt = "flowme-cycle", qn = 5, Kn = 2;
let H = null, fe = !1;
function Jn() {
  if (document.getElementById(pe)) return;
  const e = document.createElement("style");
  e.id = pe, e.textContent = `@keyframes ${Dt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function Xn() {
  if (fe) return;
  const t = CSS.registerProperty?.bind(CSS);
  if (!t) return;
  const n = [
    ["--flowme-progress", "<number>", "0"],
    ["--flowme-count", "<number>", "3"],
    ["--flowme-radius", "<number>", "5"],
    ["--flowme-line", "<number>", "2"],
    ["--flowme-amp", "<number>", "4"],
    ["--flowme-direction", "<number>", "1"]
  ];
  for (const [i, s, o] of n)
    try {
      t({ name: i, syntax: s, inherits: !1, initialValue: o });
    } catch {
    }
  fe = !0;
}
async function Yn() {
  if (H) return H;
  const e = CSS.paintWorklet;
  if (!e)
    return H = Promise.reject(new Error("paintWorklet not available")), H;
  const t = new Blob([Gn], { type: "application/javascript" }), n = URL.createObjectURL(t);
  return H = e.addModule(n).catch((i) => {
    throw H = null, i;
  }).finally(() => {
  }), H;
}
class Zn {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Fe(() => this.flushUpdates(), 120);
  }
  async init(t, n) {
    this.container = t, this.config = n, this.flowsById = new Map(n.flows.map((s) => [s.id, s])), Jn(), Xn(), await Yn();
    const i = document.createElement("div");
    i.style.position = "absolute", i.style.inset = "0", i.style.pointerEvents = "none", t.appendChild(i), this.wrapper = i;
    for (const s of n.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = s.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Dt} 2s linear infinite`, o.style.opacity = "0", i.appendChild(o), this.flowDivs.set(s.id, { el: o });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(t);
  }
  updateFlow(t, n) {
    this.flowsById.has(t) && (this.latestValues.set(t, n), this.applyUpdate());
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
    const t = this.containerSize(), n = new Map(this.config.nodes.map((i) => [i.id, i]));
    for (const i of this.config.flows) {
      const s = this.flowDivs.get(i.id);
      if (!s) continue;
      const o = n.get(i.from_node), r = n.get(i.to_node);
      if (!o || !r) continue;
      const l = [o.position, ...i.waypoints, r.position].map((h) => kt(h, t)).map((h) => `${h.x.toFixed(1)},${h.y.toFixed(1)}`).join(" ");
      s.el.style.setProperty("--flowme-path", `"${l}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, n] of this.latestValues) this.applyFlow(t, n);
  }
  applyFlow(t, n) {
    const i = this.flowsById.get(t), s = this.flowDivs.get(t);
    if (!i || !s) return;
    const o = this.profileFor(i), r = Re(i, o), c = Math.abs(n);
    if (!(c >= r.threshold)) {
      s.el.style.opacity = "0";
      return;
    }
    s.el.style.opacity = "1";
    const l = i.speed_multiplier ?? 1, h = Math.max(50, D(c, r) * l), d = n < 0 != (i.reverse === !0) ? -1 : 1, p = i.domain ?? this.config?.domain, u = Ct(i, o, p, d), g = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(n) : 3)
    ), w = o.wave_amplitude_curve ? o.wave_amplitude_curve(n) : 4, y = s.el.style;
    y.setProperty("--flowme-shape", o.shape), y.setProperty("--flowme-color", u), y.setProperty("--flowme-glow", o.glow ? "1" : "0"), y.setProperty("--flowme-count", String(g)), y.setProperty("--flowme-radius", String(qn)), y.setProperty("--flowme-line", String(Kn)), y.setProperty("--flowme-amp", String(w)), y.setProperty("--flowme-direction", String(d)), y.animation = `${Dt} ${(h / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return lt(t.domain ?? this.config?.domain);
  }
}
function Qn() {
  const e = ei(), t = e ?? "svg", n = ti();
  return k(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    n,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? n ? new Zn() : (k("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new zt()) : new zt();
}
function ti() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function ei() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function Ie(e) {
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
function ni(e, t) {
  const n = new CustomEvent("hass-more-info", {
    detail: { entityId: t },
    bubbles: !0,
    composed: !0
  });
  e.dispatchEvent(n);
}
function ii(e, t) {
  e?.callService && e.callService("homeassistant", "toggle", { entity_id: t });
}
function si(e, t, n) {
  const i = Ie(e);
  if (i === "none") return;
  const s = e.entity;
  s && (i === "toggle" ? ii(t, s) : i === "more-info" && ni(n.currentTarget, s));
}
function oi(e) {
  const t = e.size?.width ?? 14, n = e.size?.height ?? 8;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${n}%;`;
}
function ri(e, t) {
  switch (e.type) {
    case "sensor":
      return ci(e, t);
    case "switch":
      return li(e, t);
    case "button":
      return di(e, t);
    case "camera":
      return pi(e, t);
    case "custom":
      return fi(e, t);
  }
}
function ai(e, t) {
  k("renderOverlayHost →", e.type, "id=", e.id, "entity=", e.entity ?? "(none)", "position=", e.position, "size=", e.size, "entity-state=", e.entity ? t?.states[e.entity]?.state : "(n/a)");
  const i = Ie(e) !== "none", s = (o) => si(e, t, o);
  return m`
    <div
      class=${`overlay overlay-${e.type} ${i ? "interactive" : ""}`}
      data-overlay-id=${e.id}
      style=${oi(e)}
      @click=${i ? s : void 0}
      tabindex=${i ? "0" : "-1"}
      role=${i ? "button" : "group"}
    >
      ${ri(e, t)}
    </div>
  `;
}
function ci(e, t) {
  const n = e.entity ? t?.states[e.entity] : void 0, i = n?.attributes?.unit_of_measurement ?? "", s = e.label ?? n?.attributes?.friendly_name ?? e.entity ?? "sensor", o = n?.state ?? "—", r = It(o), c = Number.isFinite(r) ? gi(r) : o;
  return m`
    <div class="overlay-body sensor-body">
      <div class="overlay-label">${s}</div>
      <div class="overlay-value">
        <span class="value-number">${c}</span>
        ${i ? m`<span class="value-unit">${i}</span>` : b}
      </div>
    </div>
  `;
}
function li(e, t) {
  const n = e.entity ? t?.states[e.entity] : void 0, i = n?.state === "on", s = e.label ?? n?.attributes?.friendly_name ?? e.entity ?? "switch";
  return m`
    <div class="overlay-body switch-body ${i ? "is-on" : "is-off"}">
      <div class="overlay-label">${s}</div>
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="switch-state">${i ? "on" : "off"}</div>
    </div>
  `;
}
function di(e, t) {
  const n = e.entity ? t?.states[e.entity] : void 0, i = e.label ?? n?.attributes?.friendly_name ?? e.entity ?? "button";
  return m`
    <div class="overlay-body button-body">
      <div class="overlay-label">${i}</div>
    </div>
  `;
}
const hi = 1e4;
function ui() {
  return Math.floor(Date.now() / hi);
}
function pi(e, t) {
  const n = e.entity ? t?.states[e.entity] : void 0, i = n?.attributes?.entity_picture, s = !n || n.state === "unavailable" || n.state === "unknown" || !i, o = i ? `${i}${i.includes("?") ? "&" : "?"}flowme_bust=${ui()}` : "";
  return m`
    <div class="overlay-body camera-body">
      ${s ? m`
            <div class="camera-placeholder" title=${e.entity ?? "camera offline"}>
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
          ` : m`<img class="camera-frame" src=${o} alt=${e.entity ?? ""} />`}
      ${e.label ? m`<div class="camera-label">${e.label}</div>` : b}
    </div>
  `;
}
function fi(e, t) {
  return m`
    <flowme-custom-overlay
      .hass=${t}
      .cardConfig=${e.card_config}
    ></flowme-custom-overlay>
  `;
}
function gi(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e3 || t >= 100 ? e.toFixed(0) : t >= 10 ? e.toFixed(1) : e.toFixed(2);
}
let Ft = null, Y = null;
async function mi() {
  if (Ft) return Ft;
  if (Y) return Y;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (Y = t().then((n) => (Ft = n, Y = null, n)).catch((n) => {
    throw Y = null, n;
  }), Y);
}
async function yi(e) {
  const t = await mi();
  return t ? t.createCardElement(e) : null;
}
var bi = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, Tt = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? wi(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && bi(t, n, s), s;
};
let et = class extends z {
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
        _n(e);
      } catch (n) {
        this.errorMessage = n instanceof Error ? n.message : String(n);
        return;
      }
      this.errorMessage = void 0, yi(e).then((n) => {
        if (!n) {
          this.errorMessage = "HA card helpers unavailable", this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== t) return;
        this.childCard = n, this.hass && (this.childCard.hass = this.hass);
        const i = this.renderRoot.querySelector(".mount");
        i && (i.innerHTML = "", i.appendChild(this.childCard));
      }).catch((n) => {
        this.errorMessage = n instanceof Error ? n.message : String(n), this.requestUpdate();
      });
    }
  }
  disposeChild() {
    this.childCard && this.childCard.parentElement && this.childCard.parentElement.removeChild(this.childCard), this.childCard = void 0;
  }
};
et.styles = Mt`
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
], et.prototype, "hass", 2);
Tt([
  T({ attribute: !1 })
], et.prototype, "cardConfig", 2);
Tt([
  A()
], et.prototype, "errorMessage", 2);
et = Tt([
  Et("flowme-custom-overlay")
], et);
const vi = 100;
class xi {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > vi; ) this.undoStack.shift();
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
function ge(e, t = 8) {
  return Math.round(e / t) * t;
}
function $i(e) {
  const t = new Set(e.nodes.map((n) => n.id));
  for (let n = 1; n < 1e4; n++) {
    const i = `node_${n}`;
    if (!t.has(i)) return i;
  }
  return `node_${Date.now()}`;
}
function _i(e) {
  const t = new Set(e.flows.map((n) => n.id));
  for (let n = 1; n < 1e4; n++) {
    const i = `flow_${n}`;
    if (!t.has(i)) return i;
  }
  return `flow_${Date.now()}`;
}
function Ai(e, t, n) {
  const i = _(e);
  for (const s of i.nodes)
    s.id === t && (s.position = { x: E(n.x), y: E(n.y) });
  return i;
}
function Si(e, t, n) {
  const i = _(e), s = {
    id: $i(e),
    position: { x: E(t.x), y: E(t.y) },
    label: n
  };
  return i.nodes.push(s), { config: i, node: s };
}
function ki(e, t) {
  const n = _(e);
  return n.nodes = n.nodes.filter((i) => i.id !== t), n.flows = n.flows.filter((i) => i.from_node !== t && i.to_node !== t), n;
}
function Ci(e, t, n, i) {
  const s = _(e);
  for (const o of s.flows)
    if (o.id === t) {
      if (n < 0 || n >= o.waypoints.length) return e;
      o.waypoints[n] = {
        x: E(i.x),
        y: E(i.y)
      };
    }
  return s;
}
function Mi(e, t, n, i) {
  const s = _(e);
  for (const o of s.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, n));
    o.waypoints.splice(r, 0, {
      x: E(i.x),
      y: E(i.y)
    });
  }
  return s;
}
function Pi(e, t, n) {
  const i = _(e);
  for (const s of i.flows)
    if (s.id === t) {
      if (n < 0 || n >= s.waypoints.length) return e;
      s.waypoints.splice(n, 1);
    }
  return i;
}
function Ei(e, t, n, i) {
  const s = _(e), o = {
    id: _i(e),
    from_node: t,
    to_node: n,
    entity: i,
    waypoints: []
  };
  return s.flows.push(o), { config: s, flow: o };
}
function Ti(e, t) {
  const n = _(e);
  return n.flows = n.flows.filter((i) => i.id !== t), n;
}
function Ni(e, t) {
  const n = _(e);
  return n.background.default = t, n;
}
function Oi(e, t) {
  const n = _(e);
  return t && t.length ? n.background.weather_entity = t : delete n.background.weather_entity, n;
}
function Ri(e, t) {
  const n = _(e);
  return t === void 0 || !Number.isFinite(t) ? delete n.background.transition_duration : n.background.transition_duration = Math.max(0, Math.floor(t)), n;
}
function me(e, t, n) {
  var s;
  const i = _(e);
  return (s = i.background).weather_states ?? (s.weather_states = {}), i.background.weather_states[t] = n, i;
}
function Fi(e, t) {
  const n = _(e);
  return n.background.weather_states && (delete n.background.weather_states[t], Object.keys(n.background.weather_states).length === 0 && delete n.background.weather_states), n;
}
function Ui(e) {
  const t = new Set((e.overlays ?? []).map((n) => n.id));
  for (let n = 1; n < 1e4; n++) {
    const i = `overlay_${n}`;
    if (!t.has(i)) return i;
  }
  return `overlay_${Date.now()}`;
}
function Ii(e, t) {
  const n = _(e), i = t.id ?? Ui(e), s = {
    ...t,
    id: i,
    position: {
      x: E(t.position.x),
      y: E(t.position.y)
    }
  };
  return n.overlays = [...n.overlays ?? [], s], { config: n, overlay: s };
}
function zi(e, t) {
  const n = _(e);
  return n.overlays = (n.overlays ?? []).filter((i) => i.id !== t), n.overlays.length === 0 && delete n.overlays, n;
}
function Di(e, t, n) {
  const i = _(e);
  for (const s of i.overlays ?? [])
    s.id === t && (s.position = { x: E(n.x), y: E(n.y) });
  return i;
}
function ye(e, t, n) {
  const i = _(e), s = Math.max(2, Math.min(100, n.width)), o = Math.max(2, Math.min(100, n.height));
  for (const r of i.overlays ?? [])
    r.id === t && (r.size = { width: s, height: o });
  return i;
}
function Li(e, t, n) {
  const i = _(e);
  for (const s of i.overlays ?? [])
    s.id === t && (s.type = n, n !== "custom" && delete s.card_config);
  return i;
}
function Hi(e, t, n) {
  const i = _(e);
  for (const s of i.overlays ?? [])
    s.id === t && (n && n.length ? s.entity = n : delete s.entity);
  return i;
}
function Bi(e, t, n) {
  const i = _(e);
  for (const s of i.overlays ?? [])
    s.id === t && (n && n.length ? s.label = n : delete s.label);
  return i;
}
function ji(e, t, n) {
  const i = _(e);
  for (const s of i.overlays ?? [])
    s.id === t && (n ? s.tap_action = { action: n } : delete s.tap_action);
  return i;
}
function Wi(e, t, n) {
  const i = _(e);
  for (const s of i.overlays ?? [])
    s.id === t && (n ? s.card_config = n : delete s.card_config);
  return i;
}
function Vi(e, t, n) {
  if (t === n) return e;
  const i = _(e), s = i.background.weather_states;
  if (!s || !(t in s)) return e;
  const o = s[t];
  return o === void 0 ? e : (delete s[t], s[n] = o, i);
}
var Gi = Object.defineProperty, qi = Object.getOwnPropertyDescriptor, q = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? qi(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && Gi(t, n, s), s;
};
let R = class extends z {
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
R.styles = Mt`
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
q([
  T({ type: Boolean })
], R.prototype, "canUndo", 2);
q([
  T({ type: Boolean })
], R.prototype, "canRedo", 2);
q([
  T({ type: Boolean })
], R.prototype, "previewMode", 2);
q([
  T({ type: Boolean })
], R.prototype, "suggestPathDisabled", 2);
q([
  T({ type: String })
], R.prototype, "undoLabel", 2);
q([
  T({ type: String })
], R.prototype, "redoLabel", 2);
R = q([
  Et("flowme-editor-toolbar")
], R);
const ze = 8, be = 1, Lt = 255;
function Ki(e, t = ze) {
  const n = Math.max(1, Math.floor(t)), i = Math.max(1, Math.ceil(e.width / n)), s = Math.max(1, Math.ceil(e.height / n)), o = new Uint16Array(i * s);
  for (let r = 0; r < s; r++) {
    const c = r * n, a = Math.min(e.height, c + n);
    for (let l = 0; l < i; l++) {
      const h = l * n, d = Math.min(e.width, h + n);
      let p = 0;
      for (let g = c; g < a; g++) {
        const w = g * e.width;
        for (let y = h; y < d; y++) {
          const x = e.data[w + y] ?? 0;
          x > p && (p = x);
        }
      }
      const u = Lt - p;
      o[r * i + l] = u < be ? be : u;
    }
  }
  return { cols: i, rows: s, cellSize: n, data: o };
}
function Ji(e, t, n) {
  return n * e.cols + t;
}
function Xi(e, t, n) {
  return t < 0 || n < 0 || t >= e.cols || n >= e.rows ? Lt : e.data[Ji(e, t, n)] ?? Lt;
}
const Yi = 50;
class Zi {
  constructor() {
    this.arr = [];
  }
  push(t) {
    this.arr.push(t), this.bubbleUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return;
    const t = this.arr[0], n = this.arr.pop();
    return this.arr.length > 0 && (this.arr[0] = n, this.sinkDown(0)), t;
  }
  get size() {
    return this.arr.length;
  }
  bubbleUp(t) {
    for (; t > 0; ) {
      const n = t - 1 >> 1;
      if ((this.arr[n]?.f ?? 0) <= (this.arr[t]?.f ?? 0)) return;
      [this.arr[n], this.arr[t]] = [this.arr[t], this.arr[n]], t = n;
    }
  }
  sinkDown(t) {
    const n = this.arr.length;
    for (; ; ) {
      const i = 2 * t + 1, s = 2 * t + 2;
      let o = t;
      if (i < n && (this.arr[i]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = i), s < n && (this.arr[s]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = s), o === t) return;
      [this.arr[o], this.arr[t]] = [this.arr[t], this.arr[o]], t = o;
    }
  }
}
function Qi(e, t, n) {
  const [i, s] = t, [o, r] = n;
  if (i < 0 || s < 0 || i >= e.cols || s >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (i === o && s === r) return [[i, s]];
  const c = e.cols * e.rows, a = new Float32Array(c);
  a.fill(1 / 0);
  const l = new Int16Array(c), h = new Int16Array(c);
  l.fill(-1), h.fill(-1);
  const d = new Uint8Array(c), p = new Uint8Array(c), u = s * e.cols + i;
  a[u] = 0;
  const g = new Zi();
  g.push({ col: i, row: s, f: we(i, s, o, r) });
  const w = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const y = g.pop(), { col: x, row: v } = y, S = v * e.cols + x;
    if (!p[S]) {
      if (p[S] = 1, x === o && v === r)
        return ts(e, l, h, n);
      for (const [N, ft, nt] of w) {
        const O = x + N, J = v + ft;
        if (O < 0 || J < 0 || O >= e.cols || J >= e.rows) continue;
        const X = J * e.cols + O;
        if (p[X]) continue;
        const De = Xi(e, O, J), Le = d[S] && d[S] !== nt ? Yi : 0, Nt = (a[S] ?? 1 / 0) + De + Le;
        if (Nt < (a[X] ?? 1 / 0)) {
          a[X] = Nt, l[X] = x, h[X] = v, d[X] = nt;
          const He = Nt + we(O, J, o, r);
          g.push({ col: O, row: J, f: He });
        }
      }
    }
  }
  return null;
}
function we(e, t, n, i) {
  return Math.abs(e - n) + Math.abs(t - i);
}
function ts(e, t, n, i) {
  const s = [];
  let o = i[0], r = i[1];
  for (; o !== -1 && r !== -1; ) {
    s.push([o, r]);
    const c = r * e.cols + o, a = t[c] ?? -1, l = n[c] ?? -1;
    if (a === o && l === r || (o = a, r = l, o < 0 || r < 0)) break;
  }
  return s.reverse(), s[0]?.[0] === -1 && s.shift(), s;
}
const es = 480, ns = 270, is = 30;
function ss(e, t, n = es, i = ns) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const s = Math.min(n / e, i / t, 1);
  return {
    width: Math.max(1, Math.floor(e * s)),
    height: Math.max(1, Math.floor(t * s))
  };
}
function os(e, t, n) {
  const i = new Uint8ClampedArray(t * n);
  for (let s = 0, o = 0; s < e.length; s += 4, o++) {
    const r = e[s] ?? 0, c = e[s + 1] ?? 0, a = e[s + 2] ?? 0;
    i[o] = 0.2126 * r + 0.7152 * c + 0.0722 * a;
  }
  return i;
}
function rs(e, t, n) {
  const i = new Uint8ClampedArray(e.length);
  for (let o = 0; o < n; o++) {
    const r = o * t;
    for (let c = 0; c < t; c++) {
      const a = e[r + Math.max(0, c - 1)] ?? 0, l = e[r + c] ?? 0, h = e[r + Math.min(t - 1, c + 1)] ?? 0;
      i[r + c] = a + 2 * l + h >> 2;
    }
  }
  const s = new Uint8ClampedArray(e.length);
  for (let o = 0; o < n; o++) {
    const r = o * t, c = Math.max(0, o - 1) * t, a = Math.min(n - 1, o + 1) * t;
    for (let l = 0; l < t; l++) {
      const h = i[c + l] ?? 0, d = i[r + l] ?? 0, p = i[a + l] ?? 0;
      s[r + l] = h + 2 * d + p >> 2;
    }
  }
  return s;
}
function as(e, t, n) {
  const i = new Uint8ClampedArray(t * n);
  for (let s = 1; s < n - 1; s++) {
    const o = (s - 1) * t, r = s * t, c = (s + 1) * t;
    for (let a = 1; a < t - 1; a++) {
      const l = e[o + (a - 1)] ?? 0, h = e[o + a] ?? 0, d = e[o + (a + 1)] ?? 0, p = e[r + (a - 1)] ?? 0, u = e[r + (a + 1)] ?? 0, g = e[c + (a - 1)] ?? 0, w = e[c + a] ?? 0, y = e[c + (a + 1)] ?? 0, x = -l - 2 * p - g + d + 2 * u + y, v = -l - 2 * h - d + g + 2 * w + y;
      let S = Math.sqrt(x * x + v * v);
      S < is && (S = 0), S > 255 && (S = 255), i[r + a] = S;
    }
  }
  return { width: t, height: n, data: i };
}
function cs(e, t, n) {
  const i = ss(t, n), s = document.createElement("canvas");
  s.width = i.width, s.height = i.height;
  const o = s.getContext("2d", { willReadFrequently: !0 });
  if (!o) throw new Error("2D canvas unavailable");
  o.drawImage(e, 0, 0, i.width, i.height);
  try {
    const r = o.getImageData(0, 0, i.width, i.height);
    return { width: i.width, height: i.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function ls(e, t, n) {
  const { width: i, height: s, rgba: o } = cs(e, t, n), r = os(o, i, s), c = rs(r, i, s);
  return as(c, i, s);
}
function ds(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let n = 1; n < e.length - 1; n++) {
    const i = e[n - 1], s = e[n], o = e[n + 1], r = s[0] - i[0], c = s[1] - i[1], a = o[0] - s[0], l = o[1] - s[1];
    r * l - c * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(c) === Math.sign(l) || t.push(s);
  }
  return t.push(e[e.length - 1]), t;
}
const xt = /* @__PURE__ */ new Map();
async function hs(e, t = {}) {
  const n = performance.now(), i = t.cellSize ?? ze, s = `${e.imageUrl}|${i}`, o = xt.has(s);
  let r = null;
  try {
    r = await us(s, e.imageUrl, i);
  } catch {
    r = null;
  }
  if (!r)
    return {
      waypoints: [],
      cached: !1,
      edgesUsable: !1,
      elapsedMs: performance.now() - n
    };
  const c = xe(e.from, r), a = xe(e.to, r), l = Qi(r, c, a);
  return !l || l.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - n
  } : {
    waypoints: ds(l).slice(1, -1).map((u) => gs(u, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - n
  };
}
function us(e, t, n) {
  const i = xt.get(e);
  if (i) return i;
  const s = ps(t, n).catch((o) => {
    throw xt.delete(e), o;
  });
  return xt.set(e, s), s;
}
async function ps(e, t) {
  const n = await fs(e);
  await ve();
  const i = ls(n, n.naturalWidth, n.naturalHeight);
  return await ve(), Ki(i, t);
}
function fs(e) {
  return new Promise((t, n) => {
    const i = new Image();
    i.crossOrigin = "anonymous", i.decoding = "async", i.onload = () => t(i), i.onerror = () => n(new Error(`Failed to load background image: ${e}`)), i.src = e;
  });
}
function ve() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function xe(e, t) {
  const n = $e(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), i = $e(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [n, i];
}
function gs(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function $e(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
var ms = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, M = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ys(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && ms(t, n, s), s;
};
let $ = class extends z {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = Ee(), this.undoStack = new xi((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, n = this.config, i = Ni(n, t);
      this.pushPatch(n, i, "edit default background");
    }, this.onTransitionChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, n = Number(t), i = this.config, s = Ri(i, Number.isFinite(n) ? n : void 0);
      this.pushPatch(i, s, "edit transition duration");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, n = Fi(t, e);
      this.pushPatch(t, n, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = $.KNOWN_WEATHER_STATES.find((s) => !e.has(s)) ?? "custom", n = this.config, i = me(n, t, "");
      this.pushPatch(n, i, `add weather state ${t}`);
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
            `Overlay type? One of: ${ct.join(", ")}`,
            "sensor"
          );
          if (!t) break;
          const n = t.trim().toLowerCase();
          if (!ct.includes(n)) {
            this.statusMessage = `Unknown overlay type "${t}".`;
            break;
          }
          this.pending = { kind: "add-overlay", overlayType: n }, this.statusMessage = `Click anywhere on the background to drop a ${n} overlay.`;
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
          const n = this.pointerToPercent(e);
          if (!n) return;
          const i = this.config, { config: s, node: o } = Si(i, n, "New node");
          this.pushPatch(i, s, `add node ${o.id}`), this.pending = null, this.statusMessage = `Added node ${o.id}.`;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const n = this.pointerToPercent(e);
          if (!n) return;
          const i = this.pending.overlayType, s = {
            type: i,
            position: n,
            size: i === "camera" ? { width: 22, height: 15 } : { width: 14, height: 8 }
          };
          i === "custom" && (s.card_config = { type: "entity", entity: "" });
          const o = this.config, { config: r, overlay: c } = Ii(o, s);
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
      const t = e.currentTarget, n = t.dataset.flowId, i = Number(t.dataset.segmentIndex);
      if (!(!n || !Number.isFinite(i))) {
        if (e.shiftKey) {
          const s = this.pointerToPercent(e);
          if (!s) return;
          const o = this.config, r = Mi(o, n, i, s);
          this.pushPatch(o, r, `add waypoint to ${n}`);
          return;
        }
        this.selectedFlowId = n, this.selectedNodeId = null;
      }
    }, this.onNodeClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const n = e.currentTarget.dataset.nodeId;
      if (n) {
        if (this.pending?.kind === "add-flow") {
          if (this.pending.step === "pick-from") {
            this.pending = { kind: "add-flow", step: "pick-to", fromId: n }, this.statusMessage = "Click the destination node.";
            return;
          }
          if (this.pending.step === "pick-to" && this.pending.fromId !== n) {
            const i = window.prompt(
              "Entity for this flow (e.g. sensor.grid_power):",
              "sensor.placeholder_entity"
            ) ?? "sensor.placeholder_entity", s = this.config, { config: o, flow: r } = Ei(s, this.pending.fromId, n, i);
            this.pushPatch(s, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
            return;
          }
          this.statusMessage = "Destination must differ from source.";
          return;
        }
        this.selectedNodeId = n, this.selectedFlowId = null, this.selectedOverlayId = null;
      }
    }, this.onOverlayClick = (e) => {
      e.stopPropagation();
      const n = e.currentTarget.dataset.overlayId;
      n && (this.selectedOverlayId = n, this.selectedNodeId = null, this.selectedFlowId = null, this.customConfigDraft = "", this.customConfigError = "");
    }, this.onOverlayContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const n = e.currentTarget.dataset.overlayId;
      n && window.confirm(`Delete overlay ${n}?`) && this.removeOverlay(n);
    }, this.onOverlayResizePointerDown = (e) => {
      if (this.previewMode || !this.config) return;
      e.stopPropagation(), e.preventDefault();
      const t = e.currentTarget, n = t.dataset.overlayId;
      if (!n) return;
      const i = (this.config.overlays ?? []).find((o) => o.id === n);
      if (!i) return;
      const s = { ...i.size ?? { width: 14, height: 8 } };
      t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: n,
        startSize: s,
        startPx: { x: e.clientX, y: e.clientY }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const n = e.currentTarget.dataset.nodeId;
      n && window.confirm(`Delete node ${n}? This also removes any flows using it.`) && this.removeNode(n);
    }, this.onWaypointContextMenu = (e) => {
      if (e.preventDefault(), e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, n = t.dataset.flowId, i = Number(t.dataset.waypointIndex);
      if (!n || !Number.isFinite(i)) return;
      const s = this.config, o = Pi(s, n, i);
      this.pushPatch(s, o, `delete waypoint ${i} of ${n}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = e.currentTarget, n = t.dataset.waypointIndex, i = t.dataset.flowId, s = t.dataset.nodeId, o = t.dataset.overlayId;
      let r = null;
      s ? r = { kind: "node", id: s } : o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : i && n !== void 0 && (r = { kind: "waypoint", flowId: i, index: Number(n) }), r && (e.preventDefault(), t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragShiftHeld = e.shiftKey);
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
        this.dragShiftHeld && (a = Math.round(a), l = Math.round(l)), this.config = ye(this.config, t.id, { width: a, height: l });
        return;
      }
      const n = this.pointerToPercent(e);
      if (!n) return;
      const i = this.dragShiftHeld ? { x: E(ge(n.x)), y: E(ge(n.y)) } : n;
      t.kind === "node" ? this.config = Ai(this.config, t.id, i) : t.kind === "overlay" ? this.config = Di(this.config, t.id, i) : t.kind === "waypoint" && (this.config = Ci(this.config, t.flowId, t.index, i));
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const n = this.dragStartConfig, i = this.config, s = this.dragTarget;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, !n || !i || !s || n === i) return;
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
      this.pushPatch(n, i, o);
    }, this.onKeyDown = (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const n = e.key.toLowerCase();
      n === "z" && !e.shiftKey ? (e.preventDefault(), this.undoStack.undo()) : (n === "z" && e.shiftKey || n === "y") && (e.preventDefault(), this.undoStack.redo());
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
    const t = `${1 / (vt(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, n = this.config.background.default;
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
          ${Te(this.stageRef)}
        >
          <div
            class="background"
            style=${n ? `background-image: url('${n}');` : ""}
          ></div>
          <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.config.flows.map((i) => this.renderFlowConnector(i))}
          </svg>
          ${this.config.flows.map((i) => this.renderWaypointHandles(i))}
          ${(this.config.overlays ?? []).map((i) => this.renderOverlayHandle(i))}
          ${this.config.nodes.map((i) => this.renderHandle(i))}
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
    const t = new Map(this.config.nodes.map((c) => [c.id, c])), n = t.get(e.from_node), i = t.get(e.to_node);
    if (!n || !i) return b;
    const s = [n.position, ...e.waypoints, i.position], o = e.id === this.selectedFlowId, r = [];
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
      (t, n) => m`
        <div
          class="waypoint"
          data-flow-id=${e.id}
          data-waypoint-index=${n}
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
    const t = e.id === this.selectedOverlayId, n = e.size?.width ?? 14, i = e.size?.height ?? 8;
    return m`
      <div
        class=${`overlay-handle ${t ? "selected" : ""} overlay-${e.type}`}
        data-overlay-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; width: ${n}%; height: ${i}%;`}
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
  renderEntityPicker(e, t, n) {
    const i = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), s = n?.includeDomains ?? [], o = n?.placeholder ?? "entity.id";
    if (i) {
      const h = (d) => {
        d.stopPropagation(), t((d.detail?.value ?? "").trim());
      };
      return m`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
          .includeDomains=${s}
          @value-changed=${h}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, c = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, a = Object.keys(r).filter((h) => {
      if (s.length === 0) return !0;
      const d = h.split(".")[0];
      return !!d && s.includes(d);
    }).sort();
    return m`
      <input
        type="text"
        list=${c}
        placeholder=${o}
        .value=${e}
        @change=${(h) => {
      t(h.target.value.trim());
    }}
      />
      <datalist id=${c}>
        ${a.map((h) => m`<option value=${h}></option>`)}
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
    const t = e.size ?? { width: 14, height: 8 }, n = e.tap_action?.action ?? "";
    return m`
      <div class="inspector overlay-inspector">
        <h4>Overlay: ${e.id}</h4>
        <label>
          Type
          <select @change=${(i) => this.onOverlayTypeChange(e.id, i)}>
            ${ct.map(
      (i) => m`
                <option value=${i} ?selected=${i === e.type}>${i}</option>
              `
    )}
          </select>
        </label>
        ${e.type !== "custom" ? m`
              <label>
                Entity
                ${this.renderEntityPicker(
      e.entity ?? "",
      (i) => this.setOverlayEntityValue(e.id, i),
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
            @change=${(i) => this.onOverlayLabelChange(e.id, i)}
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
              @change=${(i) => this.onOverlaySizeChange(e.id, "width", i)}
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
              @change=${(i) => this.onOverlaySizeChange(e.id, "height", i)}
            />
          </label>
        </div>
        <label>
          Tap action
          <select @change=${(i) => this.onOverlayTapActionChange(e.id, i)}>
            <option value="" ?selected=${!n}>default</option>
            ${Ut.map(
      (i) => m`<option value=${i} ?selected=${i === n}>${i}</option>`
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
          @input=${(n) => {
      this.customConfigDraft = n.target.value, this.customConfigError = "";
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
        return "sensor.indoor_temperature";
      case "switch":
        return "switch.porch_light";
      case "camera":
        return "camera.front_door";
      case "button":
        return "script.bedtime";
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
      (n) => this.setWeatherEntityValue(n),
      { includeDomains: ["weather"], placeholder: "weather.home" }
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
      ([n, i]) => m`
                <div class="weather-row" data-key=${n}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${n}
                    @change=${(s) => this.onWeatherStateKeyChange(n, s)}
                  />
                  <input
                    type="text"
                    .value=${i}
                    @change=${(s) => this.onWeatherStateUrlChange(n, s)}
                    placeholder="/local/flowme/rainy.jpg"
                  />
                  <div class="weather-row-end">
                    ${i ? m`<img class="weather-thumb" src=${i} alt=${n} />` : b}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(n)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${$.KNOWN_WEATHER_STATES.map(
      (n) => m`<option value=${n}></option>`
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
    const t = e.trim(), n = this.config, i = Oi(n, t || void 0);
    this.pushPatch(n, i, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const n = t.target.value.trim();
    if (!n || n === e) return;
    const i = this.config, s = Vi(i, e, n);
    s !== i && this.pushPatch(i, s, `rename weather state ${e}→${n}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const n = t.target.value, i = this.config, s = me(i, e, n);
    this.pushPatch(i, s, `edit weather image ${e}`);
  }
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || !this.selectedFlowId) {
      this.statusMessage = "Select a flow first — then use Suggest path.";
      return;
    }
    const e = this.config.flows.find((i) => i.id === this.selectedFlowId);
    if (!e) return;
    const t = this.config.nodes.find((i) => i.id === e.from_node), n = this.config.nodes.find((i) => i.id === e.to_node);
    if (!t || !n) {
      this.statusMessage = "Flow is missing a source or destination node.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const i = await hs({
        imageUrl: this.config.background.default,
        from: t.position,
        to: n.position
      });
      if (!i.edgesUsable) {
        this.statusMessage = "Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.", this.suggestPreview = null;
        return;
      }
      if (i.waypoints.length === 0) {
        this.statusMessage = "No waypoints suggested — a straight line already follows the strongest path.", this.suggestPreview = null;
        return;
      }
      this.suggestPreview = {
        flowId: e.id,
        waypoints: i.waypoints,
        edgesUsable: i.edgesUsable,
        elapsedMs: i.elapsedMs
      }, this.statusMessage = `Preview: ${i.waypoints.length} waypoint(s) in ${Math.round(
        i.elapsedMs
      )} ms. Accept to apply.`;
    } catch (i) {
      this.statusMessage = "Auto-route failed: " + (i instanceof Error ? i.message : String(i)), this.suggestPreview = null;
    } finally {
      this.suggestBusy = !1;
    }
  }
  acceptSuggestion() {
    if (!this.config || !this.suggestPreview) return;
    const { flowId: e, waypoints: t } = this.suggestPreview, n = this.config, i = {
      ...n,
      flows: n.flows.map(
        (s) => s.id === e ? { ...s, waypoints: t.map((o) => ({ x: o.x, y: o.y })) } : s
      )
    };
    this.suggestPreview = null, this.statusMessage = "Applied suggested waypoints.", this.pushPatch(n, i, `auto-route ${e}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return b;
    const e = this.config.flows.find((o) => o.id === this.suggestPreview.flowId);
    if (!e) return b;
    const t = this.config.nodes.find((o) => o.id === e.from_node), n = this.config.nodes.find((o) => o.id === e.to_node);
    if (!t || !n) return b;
    const s = [
      t.position,
      ...this.suggestPreview.waypoints,
      n.position
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
    const n = t.target.value, i = this.config, s = {
      ...i,
      nodes: i.nodes.map((o) => o.id === e ? { ...o, label: n || void 0 } : o)
    };
    this.pushPatch(i, s, `rename ${e}`);
  }
  setNodeEntity(e, t) {
    if (!this.config) return;
    const n = this.config, i = t.trim(), s = {
      ...n,
      nodes: n.nodes.map(
        (o) => o.id === e ? { ...o, entity: i || void 0 } : o
      )
    };
    this.pushPatch(n, s, `edit entity of ${e}`);
  }
  setFlowEntity(e, t) {
    if (!this.config) return;
    const n = this.config, i = t.trim();
    if (!i) return;
    const s = {
      ...n,
      flows: n.flows.map(
        (o) => o.id === e ? { ...o, entity: i } : o
      )
    };
    this.pushPatch(n, s, `edit entity of ${e}`);
  }
  onOverlayTypeChange(e, t) {
    if (!this.config) return;
    const n = t.target.value, i = this.config, s = Li(i, e, n);
    this.customConfigDraft = "", this.pushPatch(i, s, `change overlay ${e} type`);
  }
  setOverlayEntityValue(e, t) {
    if (!this.config) return;
    const n = t.trim(), i = this.config, s = Hi(i, e, n || void 0);
    this.pushPatch(i, s, `edit overlay ${e} entity`);
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
    const n = t.target.value, i = this.config, s = Bi(i, e, n || void 0);
    this.pushPatch(i, s, `edit overlay ${e} label`);
  }
  onOverlaySizeChange(e, t, n) {
    if (!this.config) return;
    const i = (this.config.overlays ?? []).find((a) => a.id === e);
    if (!i) return;
    const s = i.size ?? { width: 14, height: 8 }, o = Number(n.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, c = ye(r, e, { ...s, [t]: o });
    this.pushPatch(r, c, `resize overlay ${e}`);
  }
  onOverlayTapActionChange(e, t) {
    if (!this.config) return;
    const n = t.target.value, i = this.config, s = ji(i, e, n || void 0);
    this.pushPatch(i, s, `edit overlay ${e} tap action`);
  }
  applyCustomConfig(e) {
    if (!this.config) return;
    const t = this.customConfigDraft.trim();
    if (!t) {
      this.customConfigError = "Config is empty.";
      return;
    }
    let n;
    try {
      n = JSON.parse(t);
    } catch (s) {
      this.customConfigError = "Invalid JSON: " + (s instanceof Error ? s.message : String(s));
      return;
    }
    if (!n || typeof n != "object" || Array.isArray(n)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const i = this.config;
    try {
      const s = Wi(i, e, n), o = wt(s);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: i, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (s) {
      this.customConfigError = s instanceof Error ? s.message : String(s);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, n = zi(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, n, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, n = ki(t, e);
    this.selectedNodeId = null, this.pushPatch(t, n, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, n = Ti(t, e);
    this.selectedFlowId = null, this.pushPatch(t, n, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const n = t.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return null;
    const i = E((e.clientX - n.left) / n.width * 100), s = E((e.clientY - n.top) / n.height * 100);
    return { x: i, y: s };
  }
  pushPatch(e, t, n) {
    try {
      const i = wt(t);
      this.errorMessage = "", this.undoStack.push({ prev: e, next: i, description: n }), this.commitToHa(i);
    } catch (i) {
      this.errorMessage = i instanceof Error ? i.message : String(i), this.config = e;
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
var bs = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, K = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ws(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && bs(t, n, s), s;
};
const vs = "1.0.7", _e = 2e3;
console.info(
  `%c flowme %c v${vs} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
const xs = [
  "sensor.sirbu_dumitra_pv_string_1_power",
  "sensor.sirbu_dumitra_pv_string_2_power",
  "sensor.sirbu_dumitra_grid_power",
  "sensor.sirbu_dumitra_battery_power",
  "sensor.sirbu_dumitra_load_power"
];
let F = class extends z {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = Ee(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.cameraRefreshTimer = null, this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e) {
      const n = {};
      for (const s of xs)
        n[s] = e.states[s]?.state;
      const i = {};
      for (const s of this.config?.flows ?? [])
        i[s.entity] = e.states[s.entity]?.state;
      k("hass setter called. hardcoded watch:", n, "| flow-entity values:", i);
    } else
      k("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    k("setConfig called:", JSON.parse(JSON.stringify(e ?? null)));
    try {
      const t = wt(e);
      k("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const n = t.background.default;
      this.bgLayerA = n, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = n;
    } catch (t) {
      const n = t instanceof Gt ? t.message : String(t);
      this.config = void 0, this.errorMessage = n, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), k("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    k("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), k("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg")), window.setTimeout(() => {
      const e = this.shadowRoot, t = e?.querySelector("animateMotion");
      k("t+2000ms — animateMotion element:", t ? t.outerHTML : "(none found)"), k("t+2000ms — animateMotion.dur=", t?.getAttribute("dur") ?? "(no dur)");
      const n = e?.querySelectorAll("animateMotion");
      k("t+2000ms — total animateMotion elements=", n?.length ?? 0), n?.forEach((i, s) => {
        const o = i.querySelector("mpath"), r = o?.getAttribute("href") ?? o?.getAttributeNS("http://www.w3.org/1999/xlink", "href"), c = r && e ? e.querySelector(r) : null;
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
    e && this.cameraRefreshTimer === null ? this.cameraRefreshTimer = window.setInterval(() => this.requestUpdate(), 1e4) : !e && this.cameraRefreshTimer !== null && (window.clearInterval(this.cameraRefreshTimer), this.cameraRefreshTimer = null);
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = Qn(), this.rendererReadyFor = this.config;
      const n = this.config;
      this.renderer.init(t, n).catch((i) => {
        console.warn(
          "[flowme] renderer init failed — falling back to SVG renderer",
          i
        ), this.teardownRenderer(), this.renderer = new zt(), this.rendererReadyFor = n, this.renderer.init(t, n).catch((s) => {
          console.error("[flowme] SVG renderer init also failed", s);
        });
      });
    }
    if (e.has("hass") && this.renderer && this.hass) {
      k("willUpdate hass-changed → pushing values for", this.config.flows.length, "flow(s) to renderer", this.renderer.constructor.name);
      for (const n of this.config.flows) {
        const i = this.hass.states[n.entity], s = It(i?.state), o = lt(n.domain ?? this.config.domain), r = i?.attributes?.unit_of_measurement, c = Pn(s, r, o.unit_scale);
        if (k(
          "updateFlow →",
          n.id,
          "entity=",
          n.entity,
          "raw=",
          i?.state,
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
        ), i) {
          if (i.state === "unavailable" || i.state === "unknown") {
            const a = `${n.id}:${n.entity}:unavailable`;
            this.warnedMissing.has(a) || (this.warnedMissing.add(a), console.warn(
              `[flowme] flow "${n.id}" entity "${n.entity}" is currently ${i.state} — no flow will render until it reports a number`
            ));
          }
        } else {
          const a = `${n.id}:${n.entity}`;
          this.warnedMissing.has(a) || (this.warnedMissing.add(a), console.warn(
            `[flowme] flow "${n.id}" references entity "${n.entity}" but it is not present in hass.states — check spelling / domain permissions`
          ));
        }
        this.renderer.updateFlow(n.id, c.value);
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
    const n = `${1 / (vt(e.aspect_ratio) ?? 16 / 10) * 100}%`, i = e.background.transition_duration ?? _e;
    return m`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${n};`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, i)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, i)}
          ></div>
          <div class="renderer-mount" ${Te(this.rendererMount)}></div>
          ${e.nodes.map((s) => this.renderNodeHandle(s))}
          ${(e.overlays ?? []).map((s) => (k("rendering overlay →", s.type, "entity=", s.entity ?? "(none)", "position=", s.position, "size=", s.size), ai(s, this.hass)))}
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
        const n = e.weather_states[t.state];
        if (n) return n;
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
    const t = this.config.background.transition_duration ?? _e;
    this.preload(e).then(() => {
      if (!this.config || this.resolveTargetBackground() !== e) return;
      this.transitionTimer !== null && window.clearTimeout(this.transitionTimer);
      const n = this.activeLayer === "A" ? "B" : "A";
      n === "A" ? this.bgLayerA = e : this.bgLayerB = e, requestAnimationFrame(() => {
        this.activeLayer = n, this.lastAppliedBgUrl = e, this.transitionTimer = window.setTimeout(() => {
          this.activeLayer === "A" ? this.bgLayerB = "" : this.bgLayerA = "", this.transitionTimer = null;
        }, t + 50);
      });
    });
  }
  preload(e) {
    if (!e) return Promise.resolve();
    const t = this.preloadCache.get(e);
    return t?.complete && t.naturalWidth > 0 ? Promise.resolve() : new Promise((n) => {
      const i = new Image();
      i.decoding = "async", i.onload = () => {
        this.preloadCache.set(e, i), n();
      }, i.onerror = () => n(), i.src = e, this.preloadCache.set(e, i);
    });
  }
  renderNodeHandle(e) {
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, n = e.show_value !== !1 && !!t, i = e.show_label !== !1 && !!e.label, s = lt(this.config?.domain), o = e.color ?? this.nodeFlowColor(e.id) ?? s.default_color_positive, r = e.size ?? 12;
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
        ${i ? m`<span class="node-label">${e.label}</span>` : null}
        ${n ? m`<span class="node-value">${c}</span>` : null}
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
    const t = this.config.domain;
    let n;
    const i = /* @__PURE__ */ new Set();
    for (const s of this.config.flows) {
      if (s.from_node !== e && s.to_node !== e) continue;
      const o = lt(s.domain ?? t), r = Ct(s, o, s.domain ?? t, 1), c = r.toLowerCase();
      i.has(c) || (i.add(c), n || (n = r));
    }
    if (i.size !== 0)
      return i.size === 1 ? n : Fn;
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
F.styles = Mt`
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
K([
  T({ attribute: !1 })
], F.prototype, "hass", 1);
K([
  A()
], F.prototype, "config", 2);
K([
  A()
], F.prototype, "errorMessage", 2);
K([
  A()
], F.prototype, "bgLayerA", 2);
K([
  A()
], F.prototype, "bgLayerB", 2);
K([
  A()
], F.prototype, "activeLayer", 2);
F = K([
  Et("flowme-card")
], F);
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
  F as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
