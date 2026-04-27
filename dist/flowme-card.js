/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, Lt = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = Symbol(), Jt = /* @__PURE__ */ new WeakMap();
let Ee = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Lt && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Jt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Jt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const qe = (e) => new Ee(typeof e == "string" ? e : e + "", void 0, Ht), Ct = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Ee(i, e, Ht);
}, Ke = (e, t) => {
  if (Lt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = bt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Xt = Lt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return qe(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Je, defineProperty: Xe, getOwnPropertyDescriptor: Ye, getOwnPropertyNames: Ze, getOwnPropertySymbols: Qe, getPrototypeOf: ti } = Object, L = globalThis, Yt = L.trustedTypes, ei = Yt ? Yt.emptyScript : "", ii = L.reactiveElementPolyfillSupport, at = (e, t) => e, $t = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ei : null;
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
} }, jt = (e, t) => !Je(e, t), Zt = { attribute: !0, type: String, converter: $t, reflect: !1, useDefault: !1, hasChanged: jt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), L.litPropertyMetadata ?? (L.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let et = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Zt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Xe(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = Ye(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(at("elementProperties"))) return;
    const t = ti(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(at("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(at("properties"))) {
      const i = this.properties, s = [...Ze(i), ...Qe(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) i.unshift(Xt(n));
    } else t !== void 0 && i.push(Xt(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ke(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : $t).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : $t;
      this._$Em = n;
      const a = r.fromAttribute(i, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? jt)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: r } = o, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
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
et.elementStyles = [], et.shadowRootOptions = { mode: "open" }, et[at("elementProperties")] = /* @__PURE__ */ new Map(), et[at("finalized")] = /* @__PURE__ */ new Map(), ii?.({ ReactiveElement: et }), (L.reactiveElementVersions ?? (L.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = globalThis, Qt = (e) => e, _t = lt.trustedTypes, te = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ne = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, Fe = "?" + D, si = `<${Fe}>`, G = document, ut = () => G.createComment(""), ht = (e) => e === null || typeof e != "object" && typeof e != "function", Bt = Array.isArray, ni = (e) => Bt(e) || typeof e?.[Symbol.iterator] == "function", Ft = `[ 	
\f\r]`, rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, ie = />/g, j = RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ne = /"/g, Oe = /^(?:script|style|textarea|title)$/i, oi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), m = oi(1), it = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), oe = /* @__PURE__ */ new WeakMap(), W = G.createTreeWalker(G, 129);
function Ie(e, t) {
  if (!Bt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return te !== void 0 ? te.createHTML(t) : t;
}
const ri = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = rt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, d, p = -1, h = 0;
    for (; h < l.length && (r.lastIndex = h, d = r.exec(l), d !== null); ) h = r.lastIndex, r === rt ? d[1] === "!--" ? r = ee : d[1] !== void 0 ? r = ie : d[2] !== void 0 ? (Oe.test(d[2]) && (n = RegExp("</" + d[2], "g")), r = j) : d[3] !== void 0 && (r = j) : r === j ? d[0] === ">" ? (r = n ?? rt, p = -1) : d[1] === void 0 ? p = -2 : (p = r.lastIndex - d[2].length, c = d[1], r = d[3] === void 0 ? j : d[3] === '"' ? ne : se) : r === ne || r === se ? r = j : r === ee || r === ie ? r = rt : (r = j, n = void 0);
    const u = r === j && e[a + 1].startsWith("/>") ? " " : "";
    o += r === rt ? l + si : p >= 0 ? (s.push(c), l.slice(0, p) + Ne + l.slice(p) + D + u) : l + D + (p === -2 ? a : u);
  }
  return [Ie(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class pt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, d] = ri(t, i);
    if (this.el = pt.createElement(c, s), W.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = W.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(Ne)) {
          const h = d[r++], u = n.getAttribute(p).split(D), f = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: f[2], strings: u, ctor: f[1] === "." ? li : f[1] === "?" ? ci : f[1] === "@" ? di : Mt }), n.removeAttribute(p);
        } else p.startsWith(D) && (l.push({ type: 6, index: o }), n.removeAttribute(p));
        if (Oe.test(n.tagName)) {
          const p = n.textContent.split(D), h = p.length - 1;
          if (h > 0) {
            n.textContent = _t ? _t.emptyScript : "";
            for (let u = 0; u < h; u++) n.append(p[u], ut()), W.nextNode(), l.push({ type: 2, index: ++o });
            n.append(p[h], ut());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Fe) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(D, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += D.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = G.createElement("template");
    return s.innerHTML = t, s;
  }
}
function st(e, t, i = e, s) {
  if (t === it) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = ht(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = st(e, n._$AS(e, t.values), n, s)), t;
}
class ai {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? G).importNode(i, !0);
    W.currentNode = n;
    let o = W.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new gt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new ui(o, this, t)), this._$AV.push(c), l = s[++a];
      }
      r !== l?.index && (o = W.nextNode(), r++);
    }
    return W.currentNode = G, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class gt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = st(this, t, i), ht(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== it && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ni(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== b && ht(this._$AH) ? this._$AA.nextSibling.data = t : this.T(G.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = pt.createElement(Ie(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new ai(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = oe.get(t.strings);
    return i === void 0 && oe.set(t.strings, i = new pt(t)), i;
  }
  k(t) {
    Bt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new gt(this.O(ut()), this.O(ut()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = Qt(t).nextSibling;
      Qt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = b;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = st(this, t, i, 0), r = !ht(t) || t !== this._$AH && t !== it, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = st(this, a[s + l], i, l), c === it && (c = this._$AH[l]), r || (r = !ht(c) || c !== this._$AH[l]), c === b ? t = b : t !== b && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class li extends Mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
class ci extends Mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== b);
  }
}
class di extends Mt {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = st(this, t, i, 0) ?? b) === it) return;
    const s = this._$AH, n = t === b && s !== b || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== b && (s === b || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ui {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    st(this, t);
  }
}
const hi = lt.litHtmlPolyfillSupport;
hi?.(pt, gt), (lt.litHtmlVersions ?? (lt.litHtmlVersions = [])).push("3.3.2");
const pi = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new gt(t.insertBefore(ut(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis;
let H = class extends et {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = pi(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return it;
  }
};
H._$litElement$ = !0, H.finalized = !0, ct.litElementHydrateSupport?.({ LitElement: H });
const fi = ct.litElementPolyfillSupport;
fi?.({ LitElement: H });
(ct.litElementVersions ?? (ct.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gi = { attribute: !0, type: String, converter: $t, reflect: !1, hasChanged: jt }, mi = (e = gi, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function N(e) {
  return (t, i) => typeof i == "object" ? mi(e, t, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function S(e) {
  return N({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yi = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bi = { CHILD: 2 }, vi = (e) => (...t) => ({ _$litDirective$: e, values: t });
class wi {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, s) {
    this._$Ct = t, this._$AM = i, this._$Ci = s;
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
const dt = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const s of i) s._$AO?.(t, !1), dt(s, t);
  return !0;
}, kt = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, ze = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), _i(t);
  }
};
function xi(e) {
  this._$AN !== void 0 ? (kt(this), this._$AM = e, ze(this)) : this._$AM = e;
}
function $i(e, t = !1, i = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(s)) for (let o = i; o < s.length; o++) dt(s[o], !1), kt(s[o]);
  else s != null && (dt(s, !1), kt(s));
  else dt(this, e);
}
const _i = (e) => {
  e.type == bi.CHILD && (e._$AP ?? (e._$AP = $i), e._$AQ ?? (e._$AQ = xi));
};
class ki extends wi {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, s) {
    super._$AT(t, i, s), ze(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (dt(this, t), kt(this));
  }
  setValue(t) {
    if (yi(this._$Ct)) this._$Ct._$AI(t, this);
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
const Te = () => new Si();
class Si {
}
const Ot = /* @__PURE__ */ new WeakMap(), Re = vi(class extends ki {
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
      let i = Ot.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Ot.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? Ot.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
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
], zt = ["corner", "diagonal", "curve", "smooth"], Ai = ["javascript:", "vbscript:", "data:", "file:"];
function Ue(e, t = "card_config") {
  const i = [], s = /* @__PURE__ */ new WeakSet(), n = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const a = o.trim().toLowerCase();
        for (const l of Ai)
          if (a.startsWith(l)) {
            i.push({ path: r, value: o, scheme: l });
            return;
          }
        return;
      }
      if (typeof o == "object" && !s.has(o)) {
        if (s.add(o), Array.isArray(o)) {
          for (let a = 0; a < o.length; a++) n(o[a], `${r}[${a}]`);
          return;
        }
        for (const [a, l] of Object.entries(o))
          n(l, `${r}.${a}`);
      }
    }
  };
  return n(e, t), i;
}
function Ci(e, t = "card_config") {
  const i = Ue(e, t);
  if (i.length === 0) return;
  const s = i[0];
  throw new Error(
    `Unsafe URL scheme '${s.scheme}' in ${s.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class Wt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const re = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function g(e, t) {
  throw new Wt(`${e}: ${t}`);
}
function Vt(e, t) {
  (!e || typeof e != "object") && g(t, "must be an object with x and y");
  const i = e, s = i.x, n = i.y;
  (typeof s != "number" || !Number.isFinite(s)) && g(`${t}.x`, "must be a finite number"), (typeof n != "number" || !Number.isFinite(n)) && g(`${t}.y`, "must be a finite number");
  const o = s, r = n;
  return (o < 0 || o > 100) && g(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && g(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function ae(e, t) {
  (typeof e != "string" || !e.length) && g(t, "must be a non-empty string");
  const i = e;
  return re.some((n) => i.startsWith(n)) || g(
    t,
    `must start with one of ${re.join(", ")} (got "${i.slice(0, 40)}")`
  ), i;
}
function Mi(e, t, i) {
  const s = `nodes[${t}]`;
  (!e || typeof e != "object") && g(s, "must be an object");
  const n = e, o = n.id;
  (typeof o != "string" || !o.length) && g(`${s}.id`, "must be a non-empty string");
  const r = o;
  i.has(r) && g(`${s}.id`, `duplicate node id "${r}"`), i.add(r);
  const a = Vt(n.position, `${s}.position`), l = { id: r, position: a };
  return typeof n.entity == "string" && (l.entity = n.entity), typeof n.label == "string" && (l.label = n.label), typeof n.color == "string" && (l.color = n.color), typeof n.size == "number" && (l.size = n.size), typeof n.show_label == "boolean" && (l.show_label = n.show_label), typeof n.show_value == "boolean" && (l.show_value = n.show_value), n.opacity !== void 0 && (l.opacity = Gt(n.opacity, `${s}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && g(`${s}.visible`, "must be a boolean"), l.visible = n.visible), l;
}
function Pi(e, t, i, s) {
  const n = `flows[${t}]`;
  (!e || typeof e != "object") && g(n, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && g(`${n}.id`, "must be a non-empty string");
  const a = r;
  i.has(a) && g(`${n}.id`, `duplicate flow id "${a}"`), i.add(a);
  const l = o.from_node;
  (typeof l != "string" || !s.has(l)) && g(`${n}.from_node`, `references unknown node "${String(l)}"`);
  const c = o.to_node;
  (typeof c != "string" || !s.has(c)) && g(`${n}.to_node`, `references unknown node "${String(c)}"`);
  const d = o.entity;
  (typeof d != "string" || !d.length) && g(`${n}.entity`, "must be a non-empty entity id");
  const p = o.waypoints;
  let h = [];
  p !== void 0 && (Array.isArray(p) || g(`${n}.waypoints`, "must be an array (may be empty or omitted)"), h = p.map(
    (f, v) => Vt(f, `${n}.waypoints[${v}]`)
  ));
  const u = {
    id: a,
    from_node: l,
    to_node: c,
    entity: d,
    waypoints: h
  };
  if (typeof o.domain == "string" && (St.includes(o.domain) || g(`${n}.domain`, `must be one of ${St.join(", ")}`), u.domain = o.domain), typeof o.color == "string" && (u.color = o.color), typeof o.color_positive == "string" && (u.color_positive = o.color_positive), typeof o.color_negative == "string" && (u.color_negative = o.color_negative), typeof o.threshold == "number" && (u.threshold = o.threshold), typeof o.reverse == "boolean" && (u.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const f = o.speed_multiplier;
    (f < 0.1 || f > 5) && g(`${n}.speed_multiplier`, "must be between 0.1 and 5.0"), u.speed_multiplier = f;
  }
  return o.opacity !== void 0 && (u.opacity = Gt(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && g(`${n}.visible`, "must be a boolean"), u.visible = o.visible), o.line_style !== void 0 && (zt.includes(o.line_style) || g(`${n}.line_style`, `must be one of ${zt.join(", ")}`), u.line_style = o.line_style), o.speed_curve_override !== void 0 && (u.speed_curve_override = Ei(
    o.speed_curve_override,
    `${n}.speed_curve_override`
  )), u;
}
function Ei(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && g(t, "must be an object");
  const i = e, s = {};
  function n(h) {
    const u = i[h];
    if (u !== void 0)
      return (typeof u != "number" || !Number.isFinite(u) || u <= 0) && g(`${t}.${h}`, "must be a positive finite number"), u;
  }
  function o(h) {
    const u = i[h];
    if (u !== void 0)
      return (typeof u != "number" || !Number.isFinite(u) || u < 50) && g(`${t}.${h}`, "must be a finite number ≥ 50 (milliseconds)"), u;
  }
  const r = n("threshold");
  r !== void 0 && (s.threshold = r);
  const a = n("p50");
  a !== void 0 && (s.p50 = a);
  const l = n("peak");
  l !== void 0 && (s.peak = l);
  const c = o("max_duration");
  c !== void 0 && (s.max_duration = c);
  const d = o("min_duration");
  if (d !== void 0 && (s.min_duration = d), i.steepness !== void 0) {
    const h = i.steepness;
    (typeof h != "number" || !Number.isFinite(h) || h <= 0) && g(`${t}.steepness`, "must be a positive finite number"), s.steepness = h;
  }
  s.max_duration !== void 0 && s.min_duration !== void 0 && s.min_duration >= s.max_duration && g(t, "min_duration must be < max_duration");
  const p = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const h of Object.keys(i))
    p.has(h) || g(`${t}.${h}`, `unknown key (allowed: ${[...p].join(", ")})`);
  return s;
}
function Q(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e <= 0) && g(t, "must be a positive finite number"), e;
}
function Ni(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && g("defaults", "must be an object");
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = Q(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const s = Q(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    s > 1 && g("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), i.burst_trigger_ratio = s;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = Q(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = Q(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = Q(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = Q(t.line_width, "defaults.line_width")), i;
}
function Gt(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 1) && g(t, "must be a number between 0 and 1"), e;
}
function Fi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && g("opacity", "must be an object");
  const t = e, i = {};
  for (const s of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[s] !== void 0 && (i[s] = Gt(t[s], `opacity.${s}`));
  return i;
}
function Oi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && g("visibility", "must be an object");
  const t = e, i = {};
  for (const s of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[s] !== void 0 && (typeof t[s] != "boolean" && g(`visibility.${s}`, "must be a boolean"), i[s] = t[s]);
  return i;
}
function Ii(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && g("domain_colors", "must be an object");
  const t = e, i = {};
  for (const s of ["solar", "grid", "battery", "load"])
    t[s] !== void 0 && (typeof t[s] != "string" && g(`domain_colors.${s}`, "must be a string colour value"), i[s] = t[s]);
  return i;
}
function vt(e) {
  if (!e || typeof e != "object") throw new Wt("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && g("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), St.includes(t.domain) || g("domain", `must be one of ${St.join(", ")}`);
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && g("background", "must be an object when provided");
  const s = i ?? {}, o = { default: s.default === void 0 || s.default === "" ? "" : ae(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && g("background.weather_entity", "must be a string entity id"), o.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && g("background.weather_states", "must be an object mapping state strings to image URLs");
    const u = Object.entries(s.weather_states), f = {};
    for (const [v, y] of u)
      f[v] = ae(y, `background.weather_states.${v}`);
    o.weather_states = f;
  }
  s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && g("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = s.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || g("nodes", "must be an array");
  const a = /* @__PURE__ */ new Set(), l = r.map((u, f) => Mi(u, f, a));
  l.length === 0 && g("nodes", "at least one node is required");
  const c = t.flows;
  Array.isArray(c) || g("flows", "must be an array");
  const d = /* @__PURE__ */ new Set(), p = c.map(
    (u, f) => Pi(u, f, d, a)
  ), h = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: l,
    flows: p
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && g("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), h.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && g("fullscreen", "must be a boolean"), h.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && g("edit_mode_password", "must be a string"), h.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || g("overlays", "must be an array");
    const u = /* @__PURE__ */ new Set();
    h.overlays = t.overlays.map(
      (f, v) => zi(f, v, u)
    );
  }
  return t.defaults !== void 0 && (h.defaults = Ni(t.defaults)), t.domain_colors !== void 0 && (h.domain_colors = Ii(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && g("debug", "must be a boolean"), h.debug = t.debug), t.opacity !== void 0 && (h.opacity = Fi(t.opacity)), t.visibility !== void 0 && (h.visibility = Oi(t.visibility)), h;
}
function zi(e, t, i) {
  const s = `overlays[${t}]`;
  (!e || typeof e != "object") && g(s, "must be an object");
  const n = e, o = n.type, a = typeof o == "string" && ["camera", "switch", "sensor", "button"].includes(o);
  !a && o !== "custom" && g(
    `${s}.type`,
    'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.'
  );
  const l = n.id;
  (typeof l != "string" || !l.length) && g(`${s}.id`, "must be a non-empty string"), i.has(l) && g(`${s}.id`, `duplicate overlay id "${l}"`), i.add(l);
  const c = Vt(n.position, `${s}.position`);
  if (a) {
    const f = `type: ${o} was removed in v1.0.9. Replace with type: custom and a card: block. See documentation.`;
    console.warn(`[flowme] ${s}: ${f}`);
    const v = {
      id: l,
      type: "custom",
      position: c,
      card: { type: "markdown", content: "" },
      _migration_warning: f
    };
    if (n.size !== void 0) {
      const y = n.size;
      if (y && typeof y == "object") {
        const w = y, _ = w.width, x = w.height;
        typeof _ == "number" && typeof x == "number" && (v.size = { width: _, height: x });
      }
    }
    return v;
  }
  const d = n.card;
  (!d || typeof d != "object" || Array.isArray(d)) && g(`${s}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  const p = Ue(d, `${s}.card`);
  if (p.length) {
    const f = p[0];
    g(
      f.path,
      `unsafe URL scheme "${f.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`
    );
  }
  const u = {
    id: l,
    type: "custom",
    position: c,
    card: d
  };
  if (n.size !== void 0) {
    const f = n.size;
    (!f || typeof f != "object") && g(`${s}.size`, "must be an object with width and height");
    const v = f, y = v.width, w = v.height;
    (typeof y != "number" || !Number.isFinite(y) || y <= 0 || y > 100) && g(`${s}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof w != "number" || !Number.isFinite(w) || w <= 0 || w > 100) && g(`${s}.size.height`, "must be a positive number ≤ 100 (percent of card)"), u.size = { width: y, height: w };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && g(`${s}.visible`, "must be a boolean"), u.visible = n.visible), n.opacity !== void 0) {
    const f = n.opacity;
    (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 1) && g(`${s}.opacity`, "must be a number between 0 and 1"), u.opacity = f;
  }
  return u;
}
function qt(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function At(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function De(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const s = e[i - 1], n = e[i];
    if (!s || !n) continue;
    const o = n.x - s.x, r = n.y - s.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function Ti(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = De(e), s = qt(t, 0, 1) * i;
  let n = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], a = e[o], l = a.x - r.x, c = a.y - r.y, d = Math.sqrt(l * l + c * c);
    if (n + d >= s) {
      const p = d === 0 ? 0 : (s - n) / d;
      return { x: r.x + l * p, y: r.y + c * p };
    }
    n += d;
  }
  return { ...e[e.length - 1] };
}
function le(e, t, i) {
  if (e.length === 0) return "";
  if (e.length === 1) {
    const a = At(e[0], t);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const s = e.map((a) => At(a, t));
  if (i === "diagonal") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++)
      a.push(`L ${s[l].x.toFixed(2)} ${s[l].y.toFixed(2)}`);
    return a.join(" ");
  }
  if (i === "corner") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++) {
      const c = s[l - 1], d = s[l];
      a.push(`L ${d.x.toFixed(2)} ${c.y.toFixed(2)}`), a.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  if (i === "curve") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++) {
      const c = s[l - 1], d = s[l], p = (d.x - c.x) / 3, h = (d.y - c.y) / 3, u = (c.x + p).toFixed(2), f = (c.y + h).toFixed(2), v = (d.x - p).toFixed(2), y = (d.y - h).toFixed(2);
      a.push(`C ${u} ${f} ${v} ${y} ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  const n = 0.3, o = 20, r = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
  for (let a = 1; a < s.length; a++) {
    const l = s[a - 1], c = s[a], d = s[a + 1];
    if (!d) {
      r.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
      continue;
    }
    const p = Math.sqrt((c.x - l.x) ** 2 + (c.y - l.y) ** 2), h = Math.sqrt((d.x - c.x) ** 2 + (d.y - c.y) ** 2), u = Math.min(Math.min(p, h) * n, o), f = u / (p || 1), v = c.x - (c.x - l.x) * f, y = c.y - (c.y - l.y) * f, w = u / (h || 1), _ = c.x + (d.x - c.x) * w, x = c.y + (d.y - c.y) * w;
    r.push(`L ${v.toFixed(2)} ${y.toFixed(2)}`), r.push(`Q ${c.x.toFixed(2)} ${c.y.toFixed(2)} ${_.toFixed(2)} ${x.toFixed(2)}`);
  }
  return r.join(" ");
}
function ce(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
const q = 9e3, K = 700, J = 1.5;
function U(e, t) {
  const { threshold: i, p50: s, max_duration: n, min_duration: o, steepness: r } = t, a = Math.abs(e);
  if (!(s > 0) || !(i > 0)) return n;
  const l = Math.max(a, i), c = Math.log10(l / s), d = 1 / (1 + Math.exp(-r * c));
  return n - d * (n - o);
}
function Kt(e, t) {
  const i = e.speed_curve_override ?? {}, s = i.threshold ?? e.threshold ?? t.threshold, n = i.p50 ?? t.p50, o = i.peak ?? t.peak, r = i.max_duration ?? q, a = i.min_duration ?? K, l = i.steepness ?? J;
  return { threshold: s, p50: n, peak: o, max_duration: r, min_duration: a, steepness: l };
}
function Ri(e, t, i) {
  if (!i || !t) return { value: e, factor: 1 };
  const s = t.trim();
  if (!s) return { value: e, factor: 1 };
  if (Object.prototype.hasOwnProperty.call(i, s)) {
    const r = i[s] ?? 1;
    return { value: e * r, factor: r, matchedUnit: s };
  }
  const n = s.toLowerCase(), o = Object.entries(i).filter(
    ([r]) => r.toLowerCase() === n
  );
  if (o.length === 1) {
    const [r, a] = o[0];
    return { value: e * a, factor: a, matchedUnit: r };
  }
  return { value: e, factor: 1 };
}
function Le(e, t) {
  let i = null, s = null;
  const n = (...o) => {
    s = o, i !== null && clearTimeout(i), i = setTimeout(() => {
      i = null, s && e(...s), s = null;
    }, t);
  };
  return n.cancel = () => {
    i !== null && (clearTimeout(i), i = null), s = null;
  }, n;
}
function wt(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), s = Number.parseInt(t[2], 10);
  if (!(!i || !s))
    return i / s;
}
const Ui = {
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
    return U(e, {
      threshold: 30,
      p50: 800,
      max_duration: q,
      min_duration: K,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, Di = {
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
    return U(e, {
      threshold: 0.3,
      p50: 6,
      max_duration: q,
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
}, Li = {
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
    return U(e, {
      threshold: 0.05,
      p50: 50,
      max_duration: q,
      min_duration: K,
      steepness: J
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(qt(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, Hi = {
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
    return U(e, {
      threshold: 5,
      p50: 200,
      max_duration: q,
      min_duration: K,
      steepness: J
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return qt(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, ji = {
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
    return U(e, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: q,
      min_duration: K,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, He = {
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
    return U(e, {
      threshold: 1,
      p50: 100,
      max_duration: q,
      min_duration: K,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, de = {
  energy: Ui,
  water: Di,
  network: Li,
  hvac: Hi,
  gas: ji,
  generic: He
};
function V(e) {
  return e && e in de ? de[e] : He;
}
const Bi = "#CCCCCC";
function Wi(e, t, i) {
  if (e !== "energy") return;
  const s = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(s)) return i?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(s)) return i?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(s)) return i?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(s))
    return i?.load ?? "#FF8C1E";
}
function ft(e, t, i, s, n) {
  const o = e.color ?? Wi(i, e.id, n);
  return s >= 0 ? e.color_positive ?? o ?? t.default_color_positive : e.color_negative ?? o ?? t.default_color_negative;
}
const Vi = "[FlowMe]";
let je = !1;
function Gi(e) {
  je = e;
}
function A(...e) {
  je && console.warn(Vi, ...e);
}
const qi = "[FlowMe Renderer]";
function M(...e) {
  A(qi, ...e);
}
const P = "http://www.w3.org/2000/svg", mt = "http://www.w3.org/1999/xlink";
function Ki() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const yt = Ki(), Ji = 2e3, Xi = 3, ue = 5, Yi = 9, Zi = 2, Qi = 8, ts = 14, es = 0.9, is = 5e3, he = 20;
class Tt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Le(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set();
  }
  async init(t, i) {
    M("init called — container:", t, "| container size:", t.getBoundingClientRect(), "| flows:", i.flows.length, "| nodes:", i.nodes.length), M("init config flows:", i.flows.map((n) => ({ id: n.id, entity: n.entity, from: n.from_node, to: n.to_node, waypoints: n.waypoints.length, domain: n.domain }))), this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n]));
    const s = document.createElementNS(P, "svg");
    s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("preserveAspectRatio", "none"), s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.overflow = "visible", this.svg = s, t.appendChild(s), M("<svg> element appended to container. Parent shadow-root?", t.getRootNode().constructor.name), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t);
  }
  updateFlow(t, i) {
    if (!this.flowsById.has(t)) {
      M("updateFlow called for UNKNOWN flowId:", t);
      return;
    }
    M("updateFlow:", t, "value=", i, "→ queued, will flush in 200ms"), this.latestValues.set(t, i), this.applyUpdate();
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
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const l = this.profileFor(n).shape, c = [o.position, ...n.waypoints, r.position], d = `flowme-path-${n.id}`, p = document.createElementNS(P, "path");
      p.setAttribute("id", d), p.setAttribute("d", le(c, t, n.line_style ?? "corner")), p.setAttribute("fill", "none"), i.appendChild(p);
      const h = document.createElementNS(P, "g");
      h.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && h.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (h.style.display = "none");
      const u = document.createElementNS(P, "use");
      u.setAttributeNS(mt, "href", `#${d}`), u.setAttribute("href", `#${d}`);
      const f = this.config?.defaults?.line_width ?? Zi;
      u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(f)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), h.appendChild(u);
      const v = {
        group: h,
        path: p,
        pathId: d,
        shape: l,
        particles: []
      };
      if (l === "wave") {
        const w = document.createElementNS(P, "use");
        w.setAttributeNS(mt, "href", `#${d}`), w.setAttribute("href", `#${d}`), w.setAttribute("stroke", this.primaryColor(n)), w.setAttribute("stroke-width", String(Qi)), w.setAttribute("stroke-opacity", "0.9"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("stroke-linejoin", "round"), w.setAttribute("fill", "none"), w.setAttribute("stroke-dasharray", "14 10"), w.setAttribute("stroke-dashoffset", "0"), w.setAttribute("opacity", "0"), h.appendChild(w), v.waveStroke = w;
      } else l === "pulse" && (v.pulseCircles = []);
      this.svg.appendChild(h), this.flowNodes.set(n.id, v);
      const y = p.getAttribute("d") ?? "";
      M(
        "flow element appended:",
        n.id,
        "| pathId=",
        d,
        "| d=",
        y,
        "| shape=",
        l,
        "| group outerHTML[0..200]=",
        h.outerHTML.slice(0, 200)
      );
    }
    M("buildSkeleton complete. flowNodes map size=", this.flowNodes.size, "| <svg> children=", this.svg.children.length);
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const i = new Map(this.config.nodes.map((s) => [s.id, s]));
    for (const s of this.config.flows) {
      const n = this.flowNodes.get(s.id);
      if (!n) continue;
      const o = i.get(s.from_node), r = i.get(s.to_node);
      if (!o || !r) continue;
      const a = [o.position, ...s.waypoints, r.position];
      n.path.setAttribute("d", le(a, t, s.line_style ?? "corner")), n.shape === "pulse" && this.applyFlow(s.id, this.latestValues.get(s.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues)
      this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const s = this.flowsById.get(t), n = this.flowNodes.get(t);
    if (!s || !n) {
      M("applyFlow SKIP (unknown flow or no DOM):", t, "hasFlow?", !!s, "hasDom?", !!n);
      return;
    }
    const o = this.profileFor(s), r = Kt(s, o), a = yt ? 0 : r.threshold, l = Math.abs(i), c = yt || l >= a;
    if (M(
      "applyFlow:",
      t,
      "value=",
      i,
      "| magnitude=",
      l,
      "| threshold=",
      a,
      "| visible=",
      c,
      "| DEBUG=",
      yt,
      "| curve params (resolved)=",
      r,
      "| override=",
      s.speed_curve_override ?? "(none)"
    ), !c) {
      this.setGroupVisible(n, !1), M("applyFlow → flow", t, "hidden (below threshold). No animation will run.");
      return;
    }
    this.setGroupVisible(n, !0);
    const d = s.speed_multiplier ?? 1, p = U(l, r), h = yt ? Ji : Math.max(50, p * d), u = i < 0 != (s.reverse === !0) ? -1 : 1, f = s.domain ?? this.config?.domain, v = ft(s, o, f, u, this.config?.domain_colors), y = this.updateBurstState(t, l, r, o);
    switch (M(
      "applyFlow → computed:",
      t,
      "| domain=",
      f ?? "(default)",
      "| shape=",
      n.shape,
      "| sigmoidSpeedCurve(mag)=",
      p,
      "| speedMult=",
      d,
      "| dur=",
      h,
      "ms",
      "| direction=",
      u,
      "| resolved color=",
      v,
      "| burstMultiplier=",
      y,
      "| flow.color=",
      s.color,
      "| flow.color_positive=",
      s.color_positive,
      "| flow.color_negative=",
      s.color_negative,
      "| profile.default_color_positive=",
      o.default_color_positive
    ), n.shape) {
      case "wave":
        this.applyWave(n, o, h, v, u);
        break;
      case "pulse":
        this.applyPulse(n, s, o, i, h, v, y);
        break;
      case "square":
        this.applyParticles(n, s, o, i, h, v, u, "square", y);
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(n, s, o, i, h, v, u, "dot", y);
        break;
    }
  }
  /**
   * Track whether a flow has sustained ≥ 90 % of its resolved `peak`
   * (override-aware) for at least 5 s. Return the particle-count
   * multiplier to apply right now (1 outside burst, profile's
   * `burst_density_multiplier` inside — default 1.5).
   */
  updateBurstState(t, i, s, n) {
    const o = s.peak, r = this.config?.defaults?.burst_trigger_ratio ?? es, a = this.config?.defaults?.burst_sustain_ms ?? is, l = o * r, c = i >= l, d = performance.now();
    if (!c)
      return this.burstActive.has(t) && (M("burst EXIT:", t, "magnitude=", i, "droppedBelow=", l.toFixed(2)), this.burstActive.delete(t)), this.burstEnteredAt.delete(t), 1;
    let p = this.burstEnteredAt.get(t);
    p === void 0 && (p = d, this.burstEnteredAt.set(t, p));
    const h = d - p;
    if (h < a)
      return M(
        "burst PENDING:",
        t,
        "magnitude=",
        i,
        "| above",
        l.toFixed(2),
        "for",
        Math.round(h),
        "ms of",
        a
      ), 1;
    const u = n.burst_density_multiplier ?? 1.5;
    return this.burstActive.has(t) || (M(
      "burst ENTER:",
      t,
      "| sustained ≥",
      (r * 100).toFixed(0) + "%",
      "of peak",
      o,
      "for",
      Math.round(h),
      "ms → density ×" + u
    ), this.burstActive.add(t)), u;
  }
  setGroupVisible(t, i) {
    const s = i ? "1" : "0";
    for (const n of t.particles) n.shape.setAttribute("opacity", s);
    if (t.waveStroke && t.waveStroke.setAttribute("opacity", i ? "0.9" : "0"), t.pulseCircles)
      for (const n of t.pulseCircles) n.circle.setAttribute("opacity", s);
  }
  applyParticles(t, i, s, n, o, r, a, l, c) {
    const d = Math.max(
      1,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Xi
      )
    ), p = this.config?.defaults?.burst_max_particles ?? he, h = Math.min(
      p,
      Math.max(1, Math.round(d * c))
    );
    if (c !== 1 && M("applyParticles burst → base=", d, "× mult=", c, "→ final=", h), t.particles.length !== h) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < h; f++)
        t.particles.push(this.makeParticle(t, l, r, s.glow));
    }
    const u = `${(o / 1e3).toFixed(3)}s`;
    M("applyParticles:", t.pathId, "| kind=", l, "| count=", t.particles.length, "| dur=", u, "| color=", r, "| direction=", a);
    for (let f = 0; f < t.particles.length; f++) {
      const v = t.particles[f];
      if (!v) continue;
      v.shape.setAttribute("fill", r), s.glow && (v.shape.style.color = r);
      const y = document.createElementNS(P, "animateMotion");
      y.setAttribute("repeatCount", "indefinite"), y.setAttribute("dur", u), y.setAttribute("rotate", "auto"), y.setAttribute(
        "begin",
        `${(-o * f / (t.particles.length * 1e3)).toFixed(3)}s`
      ), a < 0 && (y.setAttribute("keyPoints", "1;0"), y.setAttribute("keyTimes", "0;1"));
      const w = document.createElementNS(P, "mpath");
      w.setAttributeNS(mt, "href", `#${t.pathId}`), w.setAttribute("href", `#${t.pathId}`), y.appendChild(w), v.animateMotion.replaceWith(y), v.animateMotion = y, v.shape.appendChild(y), f === 0 && M(
        "animateMotion[0] installed on",
        t.pathId,
        "| dur=",
        y.getAttribute("dur"),
        "| mpath href=#" + t.pathId,
        "| element outerHTML[0..200]=",
        y.outerHTML.slice(0, 200),
        "| parent shape outerHTML[0..200]=",
        v.shape.outerHTML.slice(0, 200)
      );
    }
    A("SVG flow created:", t.pathId, "pathD=", t.path.getAttribute("d"), "dur=", u, "particles=", t.particles.length);
  }
  applyWave(t, i, s, n, o) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", n);
    const a = r.querySelector("animate");
    a && a.remove();
    const l = document.createElementNS(P, "animate");
    l.setAttribute("attributeName", "stroke-dashoffset"), l.setAttribute("from", o > 0 ? "0" : "-24"), l.setAttribute("to", o > 0 ? "-24" : "0"), l.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), l.setAttribute("repeatCount", "indefinite"), r.appendChild(l);
  }
  applyPulse(t, i, s, n, o, r, a) {
    if (!this.svg) return;
    const l = t.group, c = new Map(this.config?.nodes.map((_) => [_.id, _]) ?? []), d = c.get(i.from_node), p = c.get(i.to_node);
    if (!d || !p) return;
    const h = [d.position, ...i.waypoints, p.position], u = De(h), f = Math.max(
      2,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Math.max(3, Math.floor(u / 15))
      )
    ), v = this.config?.defaults?.burst_max_particles ?? he, y = Math.min(
      v,
      Math.max(2, Math.round(f * a))
    );
    a !== 1 && M("applyPulse burst → base=", f, "× mult=", a, "→ final=", y);
    const w = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== y) {
      if (t.pulseCircles) for (const _ of t.pulseCircles) _.circle.remove();
      t.pulseCircles = [];
      for (let _ = 0; _ < y; _++) {
        const x = document.createElementNS(P, "circle");
        x.setAttribute("r", "0"), x.setAttribute("fill", r), x.setAttribute("opacity", "0"), s.glow && x.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), x.style.color = r;
        const F = document.createElementNS(P, "animate");
        F.setAttribute("attributeName", "r"), F.setAttribute("values", `0;${ts};0`), F.setAttribute("repeatCount", "indefinite"), x.appendChild(F);
        const O = document.createElementNS(P, "animate");
        O.setAttribute("attributeName", "opacity"), O.setAttribute("values", "0;1;0"), O.setAttribute("repeatCount", "indefinite"), x.appendChild(O), l.appendChild(x), t.pulseCircles.push({ circle: x, animateRadius: F, animateOpacity: O });
      }
    }
    for (let _ = 0; _ < t.pulseCircles.length; _++) {
      const x = t.pulseCircles[_];
      if (!x) continue;
      const F = (_ + 0.5) / t.pulseCircles.length, O = Ti(h, F), ot = At(O, w);
      x.circle.setAttribute("cx", ot.x.toFixed(2)), x.circle.setAttribute("cy", ot.y.toFixed(2)), x.circle.setAttribute("fill", r), x.circle.style.color = r;
      const I = `${(o / 1e3).toFixed(3)}s`, z = `${(-o * _ / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      x.animateRadius.setAttribute("dur", I), x.animateRadius.setAttribute("begin", z), x.animateOpacity.setAttribute("dur", I), x.animateOpacity.setAttribute("begin", z);
    }
  }
  makeParticle(t, i, s, n) {
    const o = this.config?.defaults?.dot_radius ?? ue;
    let r;
    if (i === "square") {
      const c = o * (Yi / ue), d = document.createElementNS(P, "rect");
      d.setAttribute("width", String(c)), d.setAttribute("height", String(c)), d.setAttribute("x", String(-c / 2)), d.setAttribute("y", String(-c / 2)), d.setAttribute("rx", "1.5"), d.setAttribute("fill", s), d.setAttribute("opacity", "0"), r = d;
    } else {
      const c = document.createElementNS(P, "circle");
      c.setAttribute("r", String(o)), c.setAttribute("fill", s), c.setAttribute("opacity", "0"), r = c;
    }
    n && (r.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), r.style.color = s);
    const a = document.createElementNS(P, "animateMotion");
    a.setAttribute("repeatCount", "indefinite"), a.setAttribute("dur", "2s");
    const l = document.createElementNS(P, "mpath");
    return l.setAttributeNS(mt, "href", `#${t.pathId}`), l.setAttribute("href", `#${t.pathId}`), a.appendChild(l), r.appendChild(a), t.group.appendChild(r), { shape: r, animateMotion: a };
  }
  profileFor(t) {
    return V(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t), s = t.domain ?? this.config?.domain;
    return ft(t, i, s, 1, this.config?.domain_colors);
  }
}
const ss = `/* eslint-disable no-undef */
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
`, pe = "flowme-keyframes", Rt = "flowme-cycle", ns = 5, os = 2;
let B = null, fe = !1;
function rs() {
  if (document.getElementById(pe)) return;
  const e = document.createElement("style");
  e.id = pe, e.textContent = `@keyframes ${Rt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function as() {
  if (fe) return;
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
  for (const [s, n, o] of i)
    try {
      t({ name: s, syntax: n, inherits: !1, initialValue: o });
    } catch {
    }
  fe = !0;
}
async function ls() {
  if (B) return B;
  const e = CSS.paintWorklet;
  if (!e)
    return B = Promise.reject(new Error("paintWorklet not available")), B;
  const t = new Blob([ss], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return B = e.addModule(i).catch((s) => {
    throw B = null, s;
  }).finally(() => {
  }), B;
}
class cs {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Le(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n])), rs(), as(), await ls();
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", t.appendChild(s), this.wrapper = s;
    for (const n of i.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = n.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Rt} 2s linear infinite`, o.style.opacity = "0", s.appendChild(o), this.flowDivs.set(n.id, { el: o });
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
    const t = this.containerSize(), i = new Map(this.config.nodes.map((s) => [s.id, s]));
    for (const s of this.config.flows) {
      const n = this.flowDivs.get(s.id);
      if (!n) continue;
      const o = i.get(s.from_node), r = i.get(s.to_node);
      if (!o || !r) continue;
      const c = [o.position, ...s.waypoints, r.position].map((d) => At(d, t)).map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ");
      n.el.style.setProperty("--flowme-path", `"${c}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues) this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const s = this.flowsById.get(t), n = this.flowDivs.get(t);
    if (!s || !n) return;
    const o = this.profileFor(s), r = Kt(s, o), a = Math.abs(i);
    if (!(a >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const c = s.speed_multiplier ?? 1, d = Math.max(50, U(a, r) * c), p = i < 0 != (s.reverse === !0) ? -1 : 1, h = s.domain ?? this.config?.domain, u = ft(s, o, h, p, this.config?.domain_colors), f = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(i) : 3)
    ), v = o.wave_amplitude_curve ? o.wave_amplitude_curve(i) : 4, y = n.el.style;
    y.setProperty("--flowme-shape", o.shape), y.setProperty("--flowme-color", u), y.setProperty("--flowme-glow", o.glow ? "1" : "0"), y.setProperty("--flowme-count", String(f)), y.setProperty("--flowme-radius", String(ns)), y.setProperty("--flowme-line", String(os)), y.setProperty("--flowme-amp", String(v)), y.setProperty("--flowme-direction", String(p)), y.animation = `${Rt} ${(d / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return V(t.domain ?? this.config?.domain);
  }
}
function ds() {
  const e = hs(), t = e ?? "svg", i = us();
  return A(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    i,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? i ? new cs() : (A("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Tt()) : new Tt();
}
function us() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function hs() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function ge(e) {
  const t = e.size?.width ?? 20, i = e.size?.height ?? 15;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function ps(e, t) {
  A(
    "renderOverlayHost →",
    "id=",
    e.id,
    "position=",
    e.position,
    "size=",
    e.size,
    "visible=",
    e.visible ?? !0,
    "opacity=",
    e.opacity ?? 1
  );
  const i = e.visible !== !1, s = e.opacity ?? 1, n = [
    i ? "" : "display:none;",
    s !== 1 ? `opacity:${s};` : ""
  ].join("");
  return e._migration_warning ? m`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${e.id}
        style=${ge(e) + n}
        title=${e._migration_warning}
      >
        <div class="migration-warning-inner">
          ⚠ ${e._migration_warning}
        </div>
      </div>
    ` : m`
    <div
      class="overlay overlay-custom"
      data-overlay-id=${e.id}
      style=${ge(e) + n}
    >
      <flowme-custom-overlay
        .hass=${t}
        .card=${e.card}
      ></flowme-custom-overlay>
    </div>
    ${b}
  `;
}
let It = null, tt = null;
async function fs() {
  if (It) return It;
  if (tt) return tt;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (tt = t().then((i) => (It = i, tt = null, i)).catch((i) => {
    throw tt = null, i;
  }), tt);
}
async function gs(e) {
  const t = await fs();
  return t ? t.createCardElement(e) : null;
}
var ms = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, Et = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ys(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && ms(t, i, n), n;
};
let nt = class extends H {
  updated(e) {
    super.updated(e), e.has("card") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  render() {
    return this.errorMessage ? m`<div class="err" title=${this.errorMessage}>!</div>` : m`<div class="mount"></div>`;
  }
  rebuildChild() {
    const e = this.card, t = e ? JSON.stringify(e) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!e)) {
      try {
        Ci(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, gs(e).then((i) => {
        if (!i) {
          this.errorMessage = "HA card helpers unavailable", this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== t) return;
        this.childCard = i, this.hass && (this.childCard.hass = this.hass);
        const s = this.renderRoot.querySelector(".mount");
        s && (s.innerHTML = "", s.appendChild(this.childCard));
      }).catch((i) => {
        this.errorMessage = i instanceof Error ? i.message : String(i), this.requestUpdate();
      });
    }
  }
  disposeChild() {
    this.childCard && this.childCard.parentElement && this.childCard.parentElement.removeChild(this.childCard), this.childCard = void 0;
  }
};
nt.styles = Ct`
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
Et([
  N({ attribute: !1 })
], nt.prototype, "hass", 2);
Et([
  N({ attribute: !1 })
], nt.prototype, "card", 2);
Et([
  S()
], nt.prototype, "errorMessage", 2);
nt = Et([
  Pt("flowme-custom-overlay")
], nt);
const bs = 100;
class vs {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > bs; ) this.undoStack.shift();
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
function $(e) {
  return JSON.parse(JSON.stringify(e));
}
function E(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function me(e, t = 8) {
  return Math.round(e / t) * t;
}
function ws(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `node_${i}`;
    if (!t.has(s)) return s;
  }
  return `node_${Date.now()}`;
}
function xs(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `flow_${i}`;
    if (!t.has(s)) return s;
  }
  return `flow_${Date.now()}`;
}
function $s(e, t, i) {
  const s = $(e);
  for (const n of s.nodes)
    n.id === t && (n.position = { x: E(i.x), y: E(i.y) });
  return s;
}
function _s(e, t, i) {
  const s = $(e), n = {
    id: ws(e),
    position: { x: E(t.x), y: E(t.y) },
    label: i
  };
  return s.nodes.push(n), { config: s, node: n };
}
function ks(e, t) {
  const i = $(e);
  return i.nodes = i.nodes.filter((s) => s.id !== t), i.flows = i.flows.filter((s) => s.from_node !== t && s.to_node !== t), i;
}
function Ss(e, t, i, s) {
  const n = $(e);
  for (const o of n.flows)
    if (o.id === t) {
      if (i < 0 || i >= o.waypoints.length) return e;
      o.waypoints[i] = {
        x: E(s.x),
        y: E(s.y)
      };
    }
  return n;
}
function As(e, t, i, s) {
  const n = $(e);
  for (const o of n.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, i));
    o.waypoints.splice(r, 0, {
      x: E(s.x),
      y: E(s.y)
    });
  }
  return n;
}
function Cs(e, t, i) {
  const s = $(e);
  for (const n of s.flows)
    if (n.id === t) {
      if (i < 0 || i >= n.waypoints.length) return e;
      n.waypoints.splice(i, 1);
    }
  return s;
}
function ye(e, t, i, s) {
  const n = $(e), o = {
    id: xs(e),
    from_node: t,
    to_node: i,
    entity: s,
    waypoints: []
  };
  return n.flows.push(o), { config: n, flow: o };
}
function Ms(e, t) {
  const i = $(e);
  return i.flows = i.flows.filter((s) => s.id !== t), i;
}
function Ps(e, t) {
  const i = $(e);
  return i.background.default = t, i;
}
function Es(e, t) {
  const i = $(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function Ns(e, t) {
  const i = $(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function be(e, t, i) {
  var n;
  const s = $(e);
  return (n = s.background).weather_states ?? (n.weather_states = {}), s.background.weather_states[t] = i, s;
}
function Fs(e, t) {
  const i = $(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function Os(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `overlay_${i}`;
    if (!t.has(s)) return s;
  }
  return `overlay_${Date.now()}`;
}
function Is(e, t) {
  const i = $(e), s = t.id ?? Os(e), n = {
    ...t,
    id: s,
    position: {
      x: E(t.position.x),
      y: E(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function zs(e, t) {
  const i = $(e);
  return i.overlays = (i.overlays ?? []).filter((s) => s.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function Ts(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && (n.position = { x: E(i.x), y: E(i.y) });
  return s;
}
function ve(e, t, i) {
  const s = $(e), n = Math.max(2, Math.min(100, i.width)), o = Math.max(2, Math.min(100, i.height));
  for (const r of s.overlays ?? [])
    r.id === t && (r.size = { width: n, height: o });
  return s;
}
function Rs(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && i && (n.card = i);
  return s;
}
function Us(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && (i ? delete n.visible : n.visible = !1);
  return s;
}
function Ds(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    if (n.id === t) {
      const o = Math.max(0, Math.min(1, i));
      o === 1 ? delete n.opacity : n.opacity = o;
    }
  return s;
}
function we(e, t, i) {
  const s = $(e);
  return s.opacity = { ...s.opacity, [t]: i }, s;
}
function Ls(e, t, i) {
  const s = $(e);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function Hs(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function js(e, t, i) {
  const s = $(e);
  return s.defaults = { ...s.defaults, [t]: i }, s;
}
function Bs(e, t, i) {
  if (t === i) return e;
  const s = $(e), n = s.background.weather_states;
  if (!n || !(t in n)) return e;
  const o = n[t];
  return o === void 0 ? e : (delete n[t], n[i] = o, s);
}
function Ws(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 || i === "corner" ? delete o.line_style : o.line_style = i, o;
  }), s;
}
function xe(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.color : o.color = i, o;
  }), s;
}
function Vs(e, t, i) {
  const s = $(e);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i ? delete o.visible : o.visible = !1, o;
  }), s;
}
function Gs(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i ? delete o.visible : o.visible = !1, o;
  }), s;
}
function qs(e, t, i) {
  const s = $(e);
  return s.visibility = { ...s.visibility, [t]: i }, s;
}
function $e(e, t, i) {
  const s = $(e);
  return i === void 0 ? s.domain_colors && (delete s.domain_colors[t], Object.keys(s.domain_colors).length === 0 && delete s.domain_colors) : s.domain_colors = { ...s.domain_colors, [t]: i }, s;
}
function _e(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => n.id !== t ? n : { ...n, speed_curve_override: { ...n.speed_curve_override, ...i } }), s;
}
function Ks(e, t) {
  const i = $(e);
  return i.flows = i.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.speed_curve_override, n;
  }), i;
}
var Js = Object.defineProperty, Xs = Object.getOwnPropertyDescriptor, X = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Xs(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Js(t, i, n), n;
};
let T = class extends H {
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
        title=${this.suggestPathDisabled ? "Shift+click exactly two nodes to suggest a path between them" : "Create a new flow with auto-routed waypoints between the two selected nodes"}
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
      <span class="hint">Shift+click node = select for path · Shift+drag = snap · right-click to delete</span>
      <button @click=${() => this.fire("save")} title="Apply to card config">Save</button>
    `;
  }
  fire(e) {
    this.dispatchEvent(
      new CustomEvent("toolbar-action", { detail: { action: e }, bubbles: !0, composed: !0 })
    );
  }
};
T.styles = Ct`
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
  N({ type: Boolean })
], T.prototype, "canUndo", 2);
X([
  N({ type: Boolean })
], T.prototype, "canRedo", 2);
X([
  N({ type: Boolean })
], T.prototype, "previewMode", 2);
X([
  N({ type: Boolean })
], T.prototype, "suggestPathDisabled", 2);
X([
  N({ type: String })
], T.prototype, "undoLabel", 2);
X([
  N({ type: String })
], T.prototype, "redoLabel", 2);
T = X([
  Pt("flowme-editor-toolbar")
], T);
const Be = 8, ke = 1, Ut = 255;
function Ys(e, t = Be) {
  const i = Math.max(1, Math.floor(t)), s = Math.max(1, Math.ceil(e.width / i)), n = Math.max(1, Math.ceil(e.height / i)), o = new Uint16Array(s * n);
  for (let r = 0; r < n; r++) {
    const a = r * i, l = Math.min(e.height, a + i);
    for (let c = 0; c < s; c++) {
      const d = c * i, p = Math.min(e.width, d + i);
      let h = 0;
      for (let f = a; f < l; f++) {
        const v = f * e.width;
        for (let y = d; y < p; y++) {
          const w = e.data[v + y] ?? 0;
          w > h && (h = w);
        }
      }
      const u = Ut - h;
      o[r * s + c] = u < ke ? ke : u;
    }
  }
  return { cols: s, rows: n, cellSize: i, data: o };
}
function Zs(e, t, i) {
  return i * e.cols + t;
}
function Qs(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? Ut : e.data[Zs(e, t, i)] ?? Ut;
}
const tn = 50;
class en {
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
      const s = 2 * t + 1, n = 2 * t + 2;
      let o = t;
      if (s < i && (this.arr[s]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = s), n < i && (this.arr[n]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = n), o === t) return;
      [this.arr[o], this.arr[t]] = [this.arr[t], this.arr[o]], t = o;
    }
  }
}
function sn(e, t, i) {
  const [s, n] = t, [o, r] = i;
  if (s < 0 || n < 0 || s >= e.cols || n >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (s === o && n === r) return [[s, n]];
  const a = e.cols * e.rows, l = new Float32Array(a);
  l.fill(1 / 0);
  const c = new Int16Array(a), d = new Int16Array(a);
  c.fill(-1), d.fill(-1);
  const p = new Uint8Array(a), h = new Uint8Array(a), u = n * e.cols + s;
  l[u] = 0;
  const f = new en();
  f.push({ col: s, row: n, f: Se(s, n, o, r) });
  const v = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const y = f.pop(), { col: w, row: _ } = y, x = _ * e.cols + w;
    if (!h[x]) {
      if (h[x] = 1, w === o && _ === r)
        return nn(e, c, d, i);
      for (const [F, O, ot] of v) {
        const I = w + F, z = _ + O;
        if (I < 0 || z < 0 || I >= e.cols || z >= e.rows) continue;
        const Z = z * e.cols + I;
        if (h[Z]) continue;
        const We = Qs(e, I, z), Ve = p[x] && p[x] !== ot ? tn : 0, Nt = (l[x] ?? 1 / 0) + We + Ve;
        if (Nt < (l[Z] ?? 1 / 0)) {
          l[Z] = Nt, c[Z] = w, d[Z] = _, p[Z] = ot;
          const Ge = Nt + Se(I, z, o, r);
          f.push({ col: I, row: z, f: Ge });
        }
      }
    }
  }
  return null;
}
function Se(e, t, i, s) {
  return Math.abs(e - i) + Math.abs(t - s);
}
function nn(e, t, i, s) {
  const n = [];
  let o = s[0], r = s[1];
  for (; o !== -1 && r !== -1; ) {
    n.push([o, r]);
    const a = r * e.cols + o, l = t[a] ?? -1, c = i[a] ?? -1;
    if (l === o && c === r || (o = l, r = c, o < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
const on = 480, rn = 270, an = 30;
function ln(e, t, i = on, s = rn) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / e, s / t, 1);
  return {
    width: Math.max(1, Math.floor(e * n)),
    height: Math.max(1, Math.floor(t * n))
  };
}
function cn(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 0, o = 0; n < e.length; n += 4, o++) {
    const r = e[n] ?? 0, a = e[n + 1] ?? 0, l = e[n + 2] ?? 0;
    s[o] = 0.2126 * r + 0.7152 * a + 0.0722 * l;
  }
  return s;
}
function dn(e, t, i) {
  const s = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t;
    for (let a = 0; a < t; a++) {
      const l = e[r + Math.max(0, a - 1)] ?? 0, c = e[r + a] ?? 0, d = e[r + Math.min(t - 1, a + 1)] ?? 0;
      s[r + a] = l + 2 * c + d >> 2;
    }
  }
  const n = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t, a = Math.max(0, o - 1) * t, l = Math.min(i - 1, o + 1) * t;
    for (let c = 0; c < t; c++) {
      const d = s[a + c] ?? 0, p = s[r + c] ?? 0, h = s[l + c] ?? 0;
      n[r + c] = d + 2 * p + h >> 2;
    }
  }
  return n;
}
function un(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 1; n < i - 1; n++) {
    const o = (n - 1) * t, r = n * t, a = (n + 1) * t;
    for (let l = 1; l < t - 1; l++) {
      const c = e[o + (l - 1)] ?? 0, d = e[o + l] ?? 0, p = e[o + (l + 1)] ?? 0, h = e[r + (l - 1)] ?? 0, u = e[r + (l + 1)] ?? 0, f = e[a + (l - 1)] ?? 0, v = e[a + l] ?? 0, y = e[a + (l + 1)] ?? 0, w = -c - 2 * h - f + p + 2 * u + y, _ = -c - 2 * d - p + f + 2 * v + y;
      let x = Math.sqrt(w * w + _ * _);
      x < an && (x = 0), x > 255 && (x = 255), s[r + l] = x;
    }
  }
  return { width: t, height: i, data: s };
}
function hn(e, t, i) {
  const s = ln(t, i), n = document.createElement("canvas");
  n.width = s.width, n.height = s.height;
  const o = n.getContext("2d", { willReadFrequently: !0 });
  if (!o) throw new Error("2D canvas unavailable");
  o.drawImage(e, 0, 0, s.width, s.height);
  try {
    const r = o.getImageData(0, 0, s.width, s.height);
    return { width: s.width, height: s.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function pn(e, t, i) {
  const { width: s, height: n, rgba: o } = hn(e, t, i), r = cn(o, s, n), a = dn(r, s, n);
  return un(a, s, n);
}
function fn(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const s = e[i - 1], n = e[i], o = e[i + 1], r = n[0] - s[0], a = n[1] - s[1], l = o[0] - n[0], c = o[1] - n[1];
    r * c - a * l === 0 && Math.sign(r) === Math.sign(l) && Math.sign(a) === Math.sign(c) || t.push(n);
  }
  return t.push(e[e.length - 1]), t;
}
const xt = /* @__PURE__ */ new Map();
async function gn(e, t = {}) {
  const i = performance.now(), s = t.cellSize ?? Be, n = `${e.imageUrl}|${s}`, o = xt.has(n);
  let r = null;
  try {
    r = await mn(n, e.imageUrl, s);
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
  const a = Ce(e.from, r), l = Ce(e.to, r), c = sn(r, a, l);
  return !c || c.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  } : {
    waypoints: fn(c).slice(1, -1).map((u) => vn(u, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  };
}
function mn(e, t, i) {
  const s = xt.get(e);
  if (s) return s;
  const n = yn(t, i).catch((o) => {
    throw xt.delete(e), o;
  });
  return xt.set(e, n), n;
}
async function yn(e, t) {
  const i = await bn(e);
  await Ae();
  const s = pn(i, i.naturalWidth, i.naturalHeight);
  return await Ae(), Ys(s, t);
}
function bn(e) {
  return new Promise((t, i) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.decoding = "async", s.onload = () => t(s), s.onerror = () => i(new Error(`Failed to load background image: ${e}`)), s.src = e;
  });
}
function Ae() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function Ce(e, t) {
  const i = Me(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), s = Me(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, s];
}
function vn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function Me(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
var wn = Object.defineProperty, xn = Object.getOwnPropertyDescriptor, C = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? xn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && wn(t, i, n), n;
};
let k = class extends H {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [], this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = Te(), this.undoStack = new vs((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, s = Ps(i, t);
      this.pushPatch(i, s, "edit default background");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = Fs(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = k.KNOWN_WEATHER_STATES.find((n) => !e.has(n)) ?? "custom", i = this.config, s = be(i, t, "");
      this.pushPatch(i, s, `add weather state ${t}`);
    }, this.onToolbarAction = (e) => {
      switch (e.detail.action) {
        case "add-node":
          this.pending = { kind: "add-node" }, this.statusMessage = "Click anywhere on the background to drop a new node.";
          break;
        case "add-flow":
          this.pending = { kind: "add-flow", step: "pick-from" }, this.statusMessage = "Click the source node.";
          break;
        case "add-overlay":
          this.pending = { kind: "add-overlay", overlayType: "custom" }, this.statusMessage = "Click anywhere on the background to place a custom overlay.";
          break;
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
          const s = this.config, { config: n, node: o } = _s(s, i, "New node");
          this.pushPatch(s, n, `add node ${o.id}`), this.pending = null, this.statusMessage = `Added node ${o.id}.`;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const s = {
            type: "custom",
            position: i,
            size: { width: 20, height: 15 },
            card: { type: "entity", entity: "sensor.example_sensor" }
          }, n = this.config, { config: o, overlay: r } = Is(n, s);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(n, o, `add overlay ${r.id}`), this.pending = null, this.statusMessage = `Added overlay ${r.id}. Drag to reposition, corner to resize.`;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step === "pick-from" && (this.statusMessage = "Click the source node handle.");
          return;
        }
        this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [], this.customConfigDraft = "", this.customConfigError = "";
      }
    }, this.onStageContextMenu = (e) => {
      this.pending && (e.preventDefault(), this.pending = null, this.statusMessage = "Cancelled.");
    }, this.onSegmentClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId, s = Number(t.dataset.segmentIndex);
      if (!(!i || !Number.isFinite(s))) {
        if (e.shiftKey) {
          const n = this.pointerToPercent(e);
          if (!n) return;
          const o = this.config, r = As(o, i, s, n);
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
            const s = window.prompt(
              "Entity for this flow (e.g. sensor.grid_power):",
              "sensor.placeholder_entity"
            ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = ye(n, this.pending.fromId, i, s);
            this.pushPatch(n, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
            return;
          }
          this.statusMessage = "Destination must differ from source.";
          return;
        }
        if (e.shiftKey) {
          this.suggestNodeIds.indexOf(i) >= 0 ? this.suggestNodeIds = this.suggestNodeIds.filter((n) => n !== i) : this.suggestNodeIds.length < 2 && (this.suggestNodeIds = [...this.suggestNodeIds, i], this.suggestNodeIds.length === 2 && (this.statusMessage = 'Two nodes selected — click "Suggest path" to auto-route between them.'));
          return;
        }
        this.selectedNodeId = i, this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [];
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
      const s = (this.config.overlays ?? []).find((o) => o.id === i);
      if (!s) return;
      const n = { ...s.size ?? { width: 20, height: 15 } };
      t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: i,
        startSize: n,
        startPx: { x: e.clientX, y: e.clientY }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget.dataset.nodeId;
      i && window.confirm(`Delete node ${i}? This also removes any flows using it.`) && this.removeNode(i);
    }, this.onWaypointContextMenu = (e) => {
      if (e.preventDefault(), e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId, s = Number(t.dataset.waypointIndex);
      if (!i || !Number.isFinite(s)) return;
      const n = this.config, o = Cs(n, i, s);
      this.pushPatch(n, o, `delete waypoint ${s} of ${i}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = e.currentTarget, i = t.dataset.waypointIndex, s = t.dataset.flowId, n = t.dataset.nodeId, o = t.dataset.overlayId;
      let r = null;
      n ? r = { kind: "node", id: n } : o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : s && i !== void 0 && (r = { kind: "waypoint", flowId: s, index: Number(i) }), r && (e.preventDefault(), t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = e.shiftKey, t.kind === "overlay-resize") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, a = (e.clientY - t.startPx.y) / o.height * 100;
        let l = t.startSize.width + r, c = t.startSize.height + a;
        this.dragShiftHeld && (l = Math.round(l), c = Math.round(c)), this.config = ve(this.config, t.id, { width: l, height: c });
        return;
      }
      const i = this.pointerToPercent(e);
      if (!i) return;
      const s = this.dragShiftHeld ? { x: E(me(i.x)), y: E(me(i.y)) } : i;
      t.kind === "node" ? this.config = $s(this.config, t.id, s) : t.kind === "overlay" ? this.config = Ts(this.config, t.id, s) : t.kind === "waypoint" && (this.config = Ss(this.config, t.flowId, t.index, s));
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const i = this.dragStartConfig, s = this.config, n = this.dragTarget;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, !i || !s || !n || i === s) return;
      let o;
      switch (n.kind) {
        case "node":
          o = `move node ${n.id}`;
          break;
        case "overlay":
          o = `move overlay ${n.id}`;
          break;
        case "overlay-resize":
          o = `resize overlay ${n.id}`;
          break;
        default:
          o = `move waypoint ${n.index} of ${n.flowId}`;
      }
      this.pushPatch(i, s, o);
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
      this.config = vt(e), this.undoStack.clear(), this.errorMessage = "";
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
    const t = `${1 / (wt(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, i = this.config.background.default;
    return m`
      <div class="wrap">
        <flowme-editor-toolbar
          .canUndo=${this.canUndo}
          .canRedo=${this.canRedo}
          .previewMode=${this.previewMode}
          .undoLabel=${this.undoLabel}
          .redoLabel=${this.redoLabel}
          .suggestPathDisabled=${this.suggestNodeIds.length !== 2 || this.suggestBusy}
          @toolbar-action=${this.onToolbarAction}
        ></flowme-editor-toolbar>
        ${this.statusMessage ? m`<div class="status">${this.statusMessage}</div>` : b}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${Re(this.stageRef)}
        >
          <div
            class="background"
            style=${i ? `background-image: url('${i}');` : ""}
          ></div>
          <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.config.flows.map((s) => this.renderFlowConnector(s))}
          </svg>
          ${this.config.flows.map((s) => this.renderWaypointHandles(s))}
          ${(this.config.overlays ?? []).map((s) => this.renderOverlayHandle(s))}
          ${this.config.nodes.map((s) => this.renderHandle(s))}
          ${this.renderSuggestPreview()}
        </div>
        ${this.renderSuggestBar()}
        ${this.renderInspector()}
        ${this.renderWeatherPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
        ${this.errorMessage ? m`<pre class="error">${this.errorMessage}</pre>` : b}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return b;
    const t = new Map(this.config.nodes.map((a) => [a.id, a])), i = t.get(e.from_node), s = t.get(e.to_node);
    if (!i || !s) return b;
    const n = [i.position, ...e.waypoints, s.position], o = e.id === this.selectedFlowId, r = [];
    for (let a = 0; a < n.length - 1; a++) {
      const l = n[a], c = n[a + 1];
      !l || !c || r.push(m`
        <line
          class=${`segment ${o ? "selected" : ""}`}
          x1=${l.x}
          y1=${l.y}
          x2=${c.x}
          y2=${c.y}
          data-flow-id=${e.id}
          data-segment-index=${a}
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
    const t = e.id === this.selectedOverlayId, i = e.size?.width ?? 14, s = e.size?.height ?? 8;
    return m`
      <div
        class=${`overlay-handle ${t ? "selected" : ""} overlay-${e.type}`}
        data-overlay-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; width: ${i}%; height: ${s}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip">
          ${e.id}
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
    const t = e.id === this.selectedNodeId, i = this.suggestNodeIds.includes(e.id), s = e.visible === !1;
    return m`
      <div
        class=${`handle ${t ? "selected" : ""} ${i ? "suggest-selected" : ""} ${s ? "handle-hidden" : ""}`}
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
        ${i ? m`<span class="suggest-badge">${this.suggestNodeIds.indexOf(e.id) + 1}</span>` : b}
        <button
          class="eye-toggle"
          title=${s ? "Show node" : "Hide node"}
          @click=${(n) => {
      if (n.stopPropagation(), !this.config) return;
      const o = this.config, r = Vs(o, e.id, s);
      this.pushPatch(o, r, `${s ? "show" : "hide"} node ${e.id}`);
    }}
        >${s ? "◉" : "◎"}</button>
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
    const s = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), n = i?.includeDomains ?? [], o = i?.placeholder ?? "entity.id";
    if (s) {
      const d = (p) => {
        p.stopPropagation(), t((p.detail?.value ?? "").trim());
      };
      return m`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
          .includeDomains=${n}
          @value-changed=${d}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, a = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, l = Object.keys(r).filter((d) => {
      if (n.length === 0) return !0;
      const p = d.split(".")[0];
      return !!p && n.includes(p);
    }).sort();
    return m`
      <input
        type="text"
        list=${a}
        placeholder=${o}
        .value=${e}
        @change=${(d) => {
      t(d.target.value.trim());
    }}
      />
      <datalist id=${a}>
        ${l.map((d) => m`<option value=${d}></option>`)}
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
          <label>
            Node opacity
            <div class="inspector-slider-row">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                .value=${String(e.opacity ?? 1)}
                @change=${(t) => {
        if (!this.config) return;
        const i = parseFloat(t.target.value);
        if (!Number.isFinite(i)) return;
        const s = this.config, n = Ls(s, e.id, i < 1 || i > 0 ? i : void 0);
        this.pushPatch(s, n, `set opacity of ${e.id}`);
      }}
              />
              <span>${(e.opacity ?? 1).toFixed(2)}</span>
            </div>
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
          <label>
            Line style
            <select
              .value=${e.line_style ?? "corner"}
              @change=${(t) => {
        if (!this.config) return;
        const i = t.target.value, s = this.config, n = Ws(s, e.id, i);
        this.pushPatch(s, n, `set line style of ${e.id}`);
      }}
            >
              ${zt.map(
        (t) => m`<option value=${t} ?selected=${(e.line_style ?? "corner") === t}>${t}</option>`
      )}
            </select>
          </label>
          <label>
            Colour override
            <div class="color-row">
              ${(() => {
        const t = V(e.domain ?? this.config.domain), i = ft(e, t, e.domain ?? this.config.domain, 1, this.config.domain_colors);
        return m`
                  <input
                    type="color"
                    .value=${e.color ?? i}
                    @change=${(s) => {
          if (!this.config) return;
          const n = s.target.value, o = this.config, r = xe(o, e.id, n);
          this.pushPatch(o, r, `set colour of ${e.id}`);
        }}
                  />
                  <span class="color-effective">${e.color ? "override" : "domain default"}</span>
                  ${e.color ? m`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, n = xe(s, e.id, void 0);
          this.pushPatch(s, n, `clear colour of ${e.id}`);
        }}>Clear</button>` : b}
                `;
      })()}
            </div>
          </label>
          <label>
            Flow opacity
            <div class="inspector-slider-row">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                .value=${String(e.opacity ?? 1)}
                @change=${(t) => {
        if (!this.config) return;
        const i = parseFloat(t.target.value);
        if (!Number.isFinite(i)) return;
        const s = this.config, n = Hs(s, e.id, i);
        this.pushPatch(s, n, `set opacity of ${e.id}`);
      }}
              />
              <span>${(e.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            Visible
            <div class="row">
              <input
                type="checkbox"
                .checked=${e.visible !== !1}
                @change=${(t) => {
        if (!this.config) return;
        const i = t.target.checked, s = this.config, n = Gs(s, e.id, i);
        this.pushPatch(s, n, `${i ? "show" : "hide"} flow ${e.id}`);
      }}
              />
              <span>${e.visible !== !1 ? "shown" : "hidden"}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(e)}
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
  renderSpeedCurveSection(e) {
    if (!this.config) return m``;
    const t = V(e.domain ?? this.config.domain), i = Kt(e, t), s = e.speed_curve_override ?? {}, n = (a, l, c) => m`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${l}${c ? m` <small>(${c})</small>` : b}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof i[a] == "number" ? i[a].toFixed(0) : ""}
          .value=${s[a] !== void 0 ? String(s[a]) : ""}
          @change=${(d) => {
      if (!this.config) return;
      const p = d.target.value.trim();
      if (p === "") {
        const h = {};
        for (const v of Object.keys(s))
          v !== a && (h[v] = s[v]);
        const u = this.config, f = _e(u, e.id, h);
        this.pushPatch(u, f, `update speed curve ${a} for ${e.id}`);
      } else {
        const h = parseFloat(p);
        if (!Number.isFinite(h)) return;
        const u = this.config, f = _e(u, e.id, { ...s, [a]: h });
        this.pushPatch(u, f, `update speed curve ${a} for ${e.id}`);
      }
    }}
        />
      </div>
    `, r = [i.threshold, i.p50, i.peak].map((a) => `${(U(a, i) / 1e3).toFixed(1)}s`);
    return m`
      <details class="speed-curve-details">
        <summary>Speed curve override</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            Leave blank to use domain profile defaults.
            Domain: <strong>${t.unit_label}</strong> (${e.domain ?? this.config.domain})
          </p>
          ${n("threshold", "Threshold", t.unit_label)}
          ${n("p50", "Median (p50)", t.unit_label)}
          ${n("peak", "Peak", t.unit_label)}
          ${n("max_duration", "Max duration", "ms")}
          ${n("min_duration", "Min duration", "ms")}
          ${n("steepness", "Steepness", "k")}
          <div class="speed-curve-preview">
            <span>Preview (at threshold / p50 / peak):</span>
            <strong>${r[0]}</strong>
            /
            <strong>${r[1]}</strong>
            /
            <strong>${r[2]}</strong>
          </div>
          ${Object.keys(s).length > 0 ? m`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const a = this.config, l = Ks(a, e.id);
      this.pushPatch(a, l, `reset speed curve for ${e.id}`);
    }}>Reset to domain defaults</button>` : b}
        </div>
      </details>
    `;
  }
  renderOverlayInspector(e) {
    const t = e.size ?? { width: 20, height: 15 }, i = e.visible !== !1, s = e.opacity ?? 1;
    return m`
      <div class="inspector overlay-inspector">
        <h4>Overlay: ${e.id}</h4>
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
        <label class="toggle-label">
          Visible
          <input
            type="checkbox"
            .checked=${i}
            @change=${(n) => {
      if (!this.config) return;
      const o = n.target.checked, r = this.config, a = Us(r, e.id, o);
      this.pushPatch(r, a, `toggle overlay ${e.id} visible`);
    }}
          />
        </label>
        <label>
          Opacity
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            .value=${String(s)}
            @change=${(n) => {
      if (!this.config) return;
      const o = parseFloat(n.target.value);
      if (!Number.isFinite(o)) return;
      const r = this.config, a = Ds(r, e.id, o);
      this.pushPatch(r, a, `edit overlay ${e.id} opacity`);
    }}
          />
          <span>${Math.round(s * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(e)}
        <button class="danger" @click=${() => this.removeOverlay(e.id)}>Delete overlay</button>
      </div>
    `;
  }
  renderCardConfigEditor(e) {
    const t = this.customConfigDraft || JSON.stringify(e.card ?? { type: "entity", entity: "sensor.example_sensor" }, null, 2);
    return m`
      <label>
        Card configuration (any valid HA card YAML)
        <textarea
          rows="8"
          spellcheck="false"
          placeholder="type: entity&#10;entity: sensor.my_sensor"
          .value=${t}
          @input=${(i) => {
      this.customConfigDraft = i.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? m`<div class="custom-config-error">${this.customConfigError}</div>` : b}
      <p class="hint-sub">
        Any installed HA card type is supported. Examples: entity, tile, gauge,
        picture-entity, custom:mini-graph-card, …
      </p>
      <p class="hint-sub">
        URLs must not use javascript:, vbscript:, data: or file: schemes.
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(e.id)}>Apply card config</button>
      </div>
    `;
  }
  renderOpacityPanel() {
    if (!this.config) return b;
    const e = this.config.opacity ?? {}, t = (i, s, n = 1) => {
      const o = e[i] ?? n;
      return m`
        <label class="opacity-row">
          <span class="opacity-label">${s}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            .value=${String(o)}
            @input=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, c = we(l, i, a);
        this.config = c, this.commitToHa(c);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, c = we(l, i, a);
        this.pushPatch(l, c, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${o.toFixed(2)}</span>
        </label>
      `;
    };
    return m`
      <details class="panel opacity-panel">
        <summary>Opacity</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Adjust opacity for each visual layer. 1.0 = fully opaque, 0.0 = invisible.
            "Darken" is 0 by default (no darkening overlay).
          </p>
          ${t("background", "Background image")}
          ${t("darken", "Background darkening (0=none, 1=black)", 0)}
          ${t("nodes", "Nodes")}
          ${t("flows", "Flow lines")}
          ${t("dots", "Animated dots")}
          ${t("glow", "Glow effect")}
          ${t("labels", "Labels")}
          ${t("values", "Values")}
          ${t("overlays", "Overlays (all)")}
        </div>
      </details>
    `;
  }
  renderDomainColorsPanel() {
    if (!this.config) return b;
    const e = this.config.domain_colors ?? {}, t = {
      solar: "#FFD700",
      grid: "#1EB4FF",
      battery: "#32DC50",
      load: "#FF8C1E"
    }, i = (s, n) => {
      const o = e[s], r = t[s];
      return m`
        <div class="color-picker-row">
          <span class="color-picker-label">${n}</span>
          <input
            type="color"
            .value=${o ?? r}
            @change=${(a) => {
        if (!this.config) return;
        const l = a.target.value, c = this.config, d = $e(c, s, l);
        this.pushPatch(c, d, `set domain_colors.${s}`);
      }}
          />
          <span class="color-picker-value">${o || `${r} (default)`}</span>
          ${o ? m`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, l = $e(a, s, void 0);
        this.pushPatch(a, l, `reset domain_colors.${s}`);
      }}>Reset</button>` : b}
        </div>
      `;
    };
    return m`
      <details class="panel domain-colors-panel">
        <summary>Domain colours</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Override the default colour for each energy domain type. Changes apply to all
            flows of that domain unless a per-flow colour is set.
          </p>
          ${i("solar", "Solar")}
          ${i("grid", "Grid")}
          ${i("battery", "Battery")}
          ${i("load", "Load")}
        </div>
      </details>
    `;
  }
  renderVisibilityPanel() {
    if (!this.config) return b;
    const e = this.config.visibility ?? {}, t = (i, s) => {
      const n = e[i] !== !1;
      return m`
        <label class="visibility-row">
          <span class="visibility-label">${s}</span>
          <input
            type="checkbox"
            .checked=${n}
            @change=${(o) => {
        if (!this.config) return;
        const r = o.target.checked, a = this.config, l = qs(a, i, r);
        this.pushPatch(a, l, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${n ? "visible" : "hidden"}</span>
        </label>
      `;
    };
    return m`
      <details class="panel visibility-panel">
        <summary>Visibility</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Binary show/hide for each rendering layer. Independent of opacity.
          </p>
          ${t("nodes", "Nodes")}
          ${t("lines", "Flow lines")}
          ${t("dots", "Animated dots")}
          ${t("labels", "Labels")}
          ${t("values", "Values")}
          ${t("overlays", "Overlays")}
        </div>
      </details>
    `;
  }
  renderDefaultsPanel() {
    if (!this.config) return b;
    const e = this.config.defaults ?? {}, t = (i, s, n) => {
      const o = e[i] ?? n.defaultVal;
      return m`
        <label class="defaults-row">
          <span class="defaults-label">${s}</span>
          <input
            type="number"
            min=${n.min}
            max=${n.max}
            step=${n.step}
            .value=${String(o)}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = Math.max(n.min, Math.min(n.max, a)), c = this.config, d = js(c, i, l);
        this.pushPatch(c, d, `set defaults.${i}`);
      }}
          />
          <span class="defaults-unit">${o}</span>
        </label>
      `;
    };
    return m`
      <details class="panel defaults-panel">
        <summary>Defaults</summary>
        <div class="panel-body">
          <p class="hint-sub">
            Card-level rendering defaults. All fields are optional — omitting them
            keeps the built-in values shown in parentheses.
          </p>
          ${t("node_radius", "Node radius (px)", { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${t("dot_radius", "Dot radius (px)", { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${t("line_width", "Line width (px)", { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${t("burst_trigger_ratio", "Burst trigger ratio (0–1)", { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${t("burst_sustain_ms", "Burst sustain (ms)", { min: 1e3, max: 3e4, step: 500, defaultVal: 5e3 })}
          ${t("burst_max_particles", "Burst max particles", { min: 3, max: 50, step: 1, defaultVal: 20 })}
        </div>
      </details>
    `;
  }
  renderWeatherPanel() {
    if (!this.config) return b;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {}), i = e.weather_entity && this.hass ? this.hass.states[e.weather_entity]?.state : void 0;
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
      (s) => this.setWeatherEntityValue(s),
      { includeDomains: ["weather"], placeholder: "weather.forecast_home" }
    )}
          </label>
          ${i !== void 0 ? m`<div class="weather-live-state">
                Current state: <strong>${i}</strong>
                ${e.weather_states?.[i] ? m` → <span class="weather-match-ok">matched</span>` : m` → <span class="weather-match-miss">no mapping (using default)</span>`}
              </div>` : b}
          <label>
            Fade transition (seconds)
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              .value=${String(Math.round((e.transition_duration ?? 5e3) / 1e3))}
              @change=${(s) => {
      if (!this.config) return;
      const n = parseFloat(s.target.value);
      if (!Number.isFinite(n) || n < 0) return;
      const o = this.config, r = Ns(o, n * 1e3);
      this.pushPatch(o, r, "set background transition duration");
    }}
            />
          </label>
          <div class="weather-states">
            <div class="weather-states-header">
              <span>State</span>
              <span>Image URL</span>
              <span></span>
            </div>
            ${t.map(
      ([s, n]) => m`
                <div class="weather-row" data-key=${s}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${s}
                    @change=${(o) => this.onWeatherStateKeyChange(s, o)}
                  />
                  <input
                    type="text"
                    .value=${n}
                    @change=${(o) => this.onWeatherStateUrlChange(s, o)}
                    placeholder="/local/flowme/rainy.jpg"
                  />
                  <div class="weather-row-end">
                    ${n ? m`<img class="weather-thumb" src=${n} alt=${s} />` : b}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(s)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${k.KNOWN_WEATHER_STATES.map(
      (s) => m`<option value=${s}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
          <details class="hint-details">
            <summary>Standard Met.no state list (for reference)</summary>
            <div class="hint-states">
              ${k.KNOWN_WEATHER_STATES.map(
      (s) => m`<code>${s}</code>`
    )}
              <p class="hint-sub">
                Any state string is accepted — custom integrations can use any key.
                State strings are matched exactly as Home Assistant provides them (lowercase, hyphenated).
              </p>
            </div>
          </details>
        </div>
      </details>
    `;
  }
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), i = this.config, s = Es(i, t || void 0);
    this.pushPatch(i, s, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const s = this.config, n = Bs(s, e, i);
    n !== s && this.pushPatch(s, n, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, s = this.config, n = be(s, e, i);
    this.pushPatch(s, n, `edit weather image ${e}`);
  }
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || this.suggestNodeIds.length !== 2) {
      this.statusMessage = 'Shift+click exactly two nodes, then click "Suggest path".';
      return;
    }
    const [e, t] = this.suggestNodeIds, i = this.config.nodes.find((n) => n.id === e), s = this.config.nodes.find((n) => n.id === t);
    if (!i || !s) {
      this.statusMessage = "One or both selected nodes could not be found.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const n = await gn({
        imageUrl: this.config.background.default,
        from: i.position,
        to: s.position
      });
      if (!n.edgesUsable) {
        this.statusMessage = "Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.", this.suggestPreview = null;
        return;
      }
      n.waypoints.length === 0 && (this.statusMessage = "No waypoints needed — a straight line follows the shortest path."), this.suggestPreview = {
        fromNodeId: e,
        toNodeId: t,
        waypoints: n.waypoints,
        edgesUsable: n.edgesUsable,
        elapsedMs: n.elapsedMs
      }, this.statusMessage = `Preview: ${n.waypoints.length} waypoint(s) in ${Math.round(
        n.elapsedMs
      )} ms. Accept to create flow.`;
    } catch (n) {
      this.statusMessage = "Auto-route failed: " + (n instanceof Error ? n.message : String(n)), this.suggestPreview = null;
    } finally {
      this.suggestBusy = !1;
    }
  }
  acceptSuggestion() {
    if (!this.config || !this.suggestPreview) return;
    const { fromNodeId: e, toNodeId: t, waypoints: i } = this.suggestPreview, s = window.prompt(
      "Entity for this flow (e.g. sensor.grid_power):",
      "sensor.placeholder_entity"
    ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = ye(n, e, t, s), a = {
      ...o,
      flows: o.flows.map(
        (l) => l.id === r.id ? { ...l, waypoints: i.map((c) => ({ x: c.x, y: c.y })) } : l
      )
    };
    this.suggestPreview = null, this.suggestNodeIds = [], this.selectedFlowId = r.id, this.selectedNodeId = null, this.statusMessage = `Created flow ${r.id} with ${i.length} waypoint(s).`, this.pushPatch(n, a, `suggest-path ${r.id}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.suggestNodeIds = [], this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return b;
    const e = this.config.nodes.find((n) => n.id === this.suggestPreview.fromNodeId), t = this.config.nodes.find((n) => n.id === this.suggestPreview.toNodeId);
    if (!e || !t) return b;
    const s = [
      e.position,
      ...this.suggestPreview.waypoints,
      t.position
    ].map((n) => `${n.x.toFixed(2)},${n.y.toFixed(2)}`).join(" ");
    return m`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (n) => m`
          <div class="suggest-marker" style=${`left: ${n.x}%; top: ${n.y}%;`}></div>
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
    const i = t.target.value, s = this.config, n = {
      ...s,
      nodes: s.nodes.map((o) => o.id === e ? { ...o, label: i || void 0 } : o)
    };
    this.pushPatch(s, n, `rename ${e}`);
  }
  setNodeEntity(e, t) {
    if (!this.config) return;
    const i = this.config, s = t.trim(), n = {
      ...i,
      nodes: i.nodes.map(
        (o) => o.id === e ? { ...o, entity: s || void 0 } : o
      )
    };
    this.pushPatch(i, n, `edit entity of ${e}`);
  }
  setFlowEntity(e, t) {
    if (!this.config) return;
    const i = this.config, s = t.trim();
    if (!s) return;
    const n = {
      ...i,
      flows: i.flows.map(
        (o) => o.id === e ? { ...o, entity: s } : o
      )
    };
    this.pushPatch(i, n, `edit entity of ${e}`);
  }
  onOverlaySizeChange(e, t, i) {
    if (!this.config) return;
    const s = (this.config.overlays ?? []).find((l) => l.id === e);
    if (!s) return;
    const n = s.size ?? { width: 20, height: 15 }, o = Number(i.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, a = ve(r, e, { ...n, [t]: o });
    this.pushPatch(r, a, `resize overlay ${e}`);
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
    } catch (n) {
      this.customConfigError = "Invalid JSON: " + (n instanceof Error ? n.message : String(n));
      return;
    }
    if (!i || typeof i != "object" || Array.isArray(i)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const s = this.config;
    try {
      const n = Rs(s, e, i), o = vt(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: s, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = zs(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = ks(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = Ms(t, e);
    this.selectedFlowId = null, this.pushPatch(t, i, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const i = t.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return null;
    const s = E((e.clientX - i.left) / i.width * 100), n = E((e.clientY - i.top) / i.height * 100);
    return { x: s, y: n };
  }
  pushPatch(e, t, i) {
    try {
      const s = vt(t);
      this.errorMessage = "", this.undoStack.push({ prev: e, next: s, description: i }), this.commitToHa(s);
    } catch (s) {
      this.errorMessage = s instanceof Error ? s.message : String(s), this.config = e;
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
k.KNOWN_WEATHER_STATES = [
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
k.styles = Ct`
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
    .handle.suggest-selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 6px #f59e0b;
    }
    .suggest-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #f59e0b;
      color: #000;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
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
    .inspector-slider-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .inspector-slider-row input[type='range'] {
      flex: 1;
    }
    .inspector-slider-row span {
      font-size: 11px;
      opacity: 0.7;
      min-width: 30px;
      text-align: right;
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
    .panel {
      margin: 0 12px 12px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
    }
    .panel summary {
      list-style: none;
      cursor: pointer;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 600;
    }
    .panel summary::-webkit-details-marker {
      display: none;
    }
    .panel summary::before {
      content: '▸ ';
      font-size: 10px;
      margin-right: 2px;
    }
    .panel[open] summary::before {
      content: '▾ ';
    }
    .panel-body {
      padding: 0 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .defaults-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    .defaults-label {
      flex: 1 1 auto;
      min-width: 0;
    }
    .defaults-row input[type='number'] {
      width: 70px;
      font: inherit;
      padding: 3px 5px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .defaults-unit {
      font-size: 11px;
      opacity: 0.6;
      min-width: 30px;
    }
    .opacity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    .opacity-label {
      flex: 1 1 auto;
      min-width: 0;
    }
    .opacity-row input[type='range'] {
      width: 100px;
      flex-shrink: 0;
    }
    .opacity-val {
      font-size: 11px;
      opacity: 0.7;
      min-width: 32px;
      text-align: right;
    }
    .hint-sub {
      font-size: 11px;
      opacity: 0.7;
      margin: 0 0 4px;
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
    .weather-live-state {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
    }
    .weather-match-ok {
      color: #4ade80;
      font-weight: 600;
    }
    .weather-match-miss {
      color: #fbbf24;
      font-weight: 600;
    }
    .hint-details {
      margin-top: 4px;
    }
    .hint-details summary {
      font-size: 11px;
      opacity: 0.7;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .hint-details summary::before {
      content: '▸ ';
    }
    .hint-details[open] summary::before {
      content: '▾ ';
    }
    .hint-details summary::-webkit-details-marker {
      display: none;
    }
    .hint-states {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 6px 0;
    }
    .hint-states code {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.08);
      font-family: monospace;
    }
    .hint-states .hint-sub {
      width: 100%;
      margin: 4px 0 0;
    }
    /* Speed curve section */
    .speed-curve-details {
      margin-top: 8px;
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      padding-top: 8px;
    }
    .speed-curve-details summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .speed-curve-details summary::before { content: '▸ '; }
    .speed-curve-details[open] summary::before { content: '▾ '; }
    .speed-curve-details summary::-webkit-details-marker { display: none; }
    .speed-curve-body {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 6px 0;
    }
    .speed-curve-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      align-items: center;
      font-size: 12px;
    }
    .speed-curve-label {
      white-space: nowrap;
    }
    .speed-curve-row input {
      font: inherit;
      padding: 3px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .speed-curve-preview {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(255,255,255,0.06);
    }
    /* Color picker rows */
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .color-effective {
      font-size: 11px;
      opacity: 0.65;
    }
    .color-picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      font-size: 12px;
    }
    .color-picker-label {
      min-width: 64px;
    }
    .color-picker-value {
      font-size: 11px;
      opacity: 0.65;
    }
    /* Panel generic */
    .panel {
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .panel > summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 8px 12px;
    }
    .panel > summary::before { content: '▸ '; }
    .panel[open] > summary::before { content: '▾ '; }
    .panel > summary::-webkit-details-marker { display: none; }
    .panel-body {
      padding: 0 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    /* Visibility panel */
    .visibility-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      cursor: pointer;
    }
    .visibility-label {
      min-width: 80px;
    }
    .visibility-val {
      font-size: 11px;
      opacity: 0.65;
    }
    /* Eye toggle on canvas handles */
    .eye-toggle {
      position: absolute;
      top: -8px;
      right: -8px;
      background: rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      width: 16px;
      height: 16px;
      font-size: 9px;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      padding: 0;
      line-height: 1;
    }
    .handle:hover .eye-toggle,
    .handle.selected .eye-toggle {
      display: flex;
    }
    .handle-hidden .handle-dot {
      opacity: 0.3;
      border: 2px dashed rgba(255,255,255,0.5);
      background: transparent !important;
    }
    button.small {
      font-size: 10px;
      padding: 2px 6px;
    }
  `;
C([
  N({ attribute: !1 })
], k.prototype, "hass", 2);
C([
  S()
], k.prototype, "config", 2);
C([
  S()
], k.prototype, "pending", 2);
C([
  S()
], k.prototype, "previewMode", 2);
C([
  S()
], k.prototype, "selectedNodeId", 2);
C([
  S()
], k.prototype, "selectedFlowId", 2);
C([
  S()
], k.prototype, "selectedOverlayId", 2);
C([
  S()
], k.prototype, "suggestNodeIds", 2);
C([
  S()
], k.prototype, "customConfigDraft", 2);
C([
  S()
], k.prototype, "customConfigError", 2);
C([
  S()
], k.prototype, "statusMessage", 2);
C([
  S()
], k.prototype, "errorMessage", 2);
C([
  S()
], k.prototype, "canUndo", 2);
C([
  S()
], k.prototype, "canRedo", 2);
C([
  S()
], k.prototype, "undoLabel", 2);
C([
  S()
], k.prototype, "redoLabel", 2);
C([
  S()
], k.prototype, "suggestPreview", 2);
C([
  S()
], k.prototype, "suggestBusy", 2);
k = C([
  Pt("flowme-card-editor")
], k);
var $n = Object.defineProperty, _n = Object.getOwnPropertyDescriptor, Y = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? _n(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && $n(t, i, n), n;
};
const kn = "1.0.11", Pe = 5e3;
console.info(
  `%c flowme %c v${kn} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function Sn(e) {
  if (!e) return "";
  const t = [], i = (s, n) => {
    const o = e[s];
    o !== void 0 && t.push(`${n}:${o};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), t.join("");
}
function An(e) {
  if (!e) return "";
  const t = [], i = (s, n) => {
    e[s] === !1 && t.push(`${n}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), t.join("");
}
let R = class extends H {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = Te(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e) {
      const i = this.config, s = [
        ...i?.flows.map((r) => r.entity) ?? [],
        ...i?.nodes.map((r) => r.entity).filter(Boolean) ?? [],
        i?.background.weather_entity
      ].filter((r) => typeof r == "string" && r.length > 0), n = {};
      for (const r of s)
        n[r] = e.states[r]?.state;
      A("hass setter called. config entity states:", n);
      const o = i?.background.weather_entity;
      if (o) {
        const r = t?.states[o]?.state, a = e.states[o]?.state;
        A("[weather] state:", a, "(was:", r, ")"), r !== a && this.syncWeatherBackground();
      }
    } else
      A("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    try {
      const t = vt(e);
      Gi(t.debug ?? !1), A("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), A("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof Wt ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), A("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    A("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), A("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), super.disconnectedCallback();
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = ds(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(t, i).catch((s) => {
        A("renderer init failed — falling back to SVG renderer", s), this.teardownRenderer(), this.renderer = new Tt(), this.rendererReadyFor = i, this.renderer.init(t, i).catch((n) => {
          console.error("[flowme] SVG renderer init also failed", n);
        });
      });
    }
    if (e.has("hass") && this.renderer && this.hass) {
      A("willUpdate hass-changed → pushing values for", this.config.flows.length, "flow(s) to renderer", this.renderer.constructor.name);
      for (const i of this.config.flows) {
        const s = this.hass.states[i.entity], n = ce(s?.state), o = V(i.domain ?? this.config.domain), r = s?.attributes?.unit_of_measurement, a = Ri(n, r, o.unit_scale);
        if (A(
          "updateFlow →",
          i.id,
          "entity=",
          i.entity,
          "raw=",
          s?.state,
          "parsed=",
          n,
          "sensorUnit=",
          r ?? "(none)",
          "matchedUnit=",
          a.matchedUnit ?? "(none → passthrough)",
          "factor=",
          a.factor,
          "scaledToBase(" + o.unit_label + ")=",
          a.value
        ), s) {
          if (s.state === "unavailable" || s.state === "unknown") {
            const l = `${i.id}:${i.entity}:unavailable`;
            this.warnedMissing.has(l) || (this.warnedMissing.add(l), A(`flow "${i.id}" entity "${i.entity}" is currently ${s.state} — no flow will render until it reports a number`));
          }
        } else {
          const l = `${i.id}:${i.entity}`;
          this.warnedMissing.has(l) || (this.warnedMissing.add(l), A(`flow "${i.id}" references entity "${i.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        this.renderer.updateFlow(i.id, a.value);
      }
    }
    (e.has("config") || e.has("hass")) && this.syncWeatherBackground();
  }
  getCardSize() {
    const e = wt(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = wt(this.config?.aspect_ratio) ?? 1.6;
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
      ],
      overlays: [
        {
          id: "example_overlay",
          type: "custom",
          position: { x: 5, y: 5 },
          size: { width: 20, height: 15 },
          card: { type: "entity", entity: "sensor.example_sensor" }
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
    const i = `${1 / (wt(e.aspect_ratio) ?? 16 / 10) * 100}%`, s = e.background.transition_duration ?? Pe, n = Sn(e.opacity), o = An(e.visibility);
    return m`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${i};${n}${o}`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, s)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, s)}
          ></div>
          <div class="renderer-mount" ${Re(this.rendererMount)}></div>
          ${e.nodes.map((r) => this.renderNodeHandle(r))}
          ${(e.overlays ?? []).map((r) => (A("rendering overlay →", r.type, "position=", r.position, "size=", r.size), ps(r, this.hass)))}
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
        if (A("[weather]", t.state, "→", i ?? "(no match, using default)"), i) return i;
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
    const t = this.config.background.transition_duration ?? Pe;
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
      const s = new Image();
      s.decoding = "async", s.onload = () => {
        this.preloadCache.set(e, s), i();
      }, s.onerror = () => i(), s.src = e, this.preloadCache.set(e, s);
    });
  }
  renderNodeHandle(e) {
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, s = e.show_label !== !1 && !!e.label, n = V(this.config?.domain), o = e.color ?? this.nodeFlowColor(e.id) ?? n.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let a = "";
    if (t) {
      const c = ce(t.state), d = t.attributes?.unit_of_measurement ?? "";
      d ? a = `${this.formatSensorNumber(c)} ${d}` : a = n.describe(c);
    }
    const l = e.visible === !1;
    return m`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; --flowme-dot-size: ${r}px;${e.opacity !== void 0 ? ` opacity: ${e.opacity};` : ""}${l ? " display: none;" : ""}`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${s ? m`<span class="node-label">${e.label}</span>` : null}
        ${i ? m`<span class="node-value">${a}</span>` : null}
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
    let s;
    const n = /* @__PURE__ */ new Set();
    for (const o of this.config.flows) {
      if (o.from_node !== e && o.to_node !== e) continue;
      const r = V(o.domain ?? t), a = ft(o, r, o.domain ?? t, 1, i), l = a.toLowerCase();
      n.has(l) || (n.add(l), s || (s = a));
    }
    if (n.size !== 0)
      return n.size === 1 ? s : Bi;
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
R.styles = Ct`
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
      opacity: var(--flowme-opacity-bg, 1);
    }
    .stage::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, var(--flowme-opacity-darken, 0));
      pointer-events: none;
      z-index: 1;
    }
    .renderer-mount {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: var(--flowme-opacity-flows, 1);
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
      opacity: var(--flowme-opacity-nodes, 1);
      display: var(--flowme-vis-nodes, flex);
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
      opacity: var(--flowme-opacity-labels, 1);
      display: var(--flowme-vis-labels, block);
    }
    .node-value {
      opacity: calc(0.85 * var(--flowme-opacity-values, 1));
      white-space: nowrap;
      display: var(--flowme-vis-values, block);
    }
    .overlay {
      position: absolute;
      min-width: 24px;
      min-height: 24px;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;
      pointer-events: all;
      z-index: 10;
    }
    .overlay-migration-warning {
      background: rgba(200, 40, 40, 0.85);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 80, 80, 0.7);
      padding: 4px 8px;
    }
    .migration-warning-inner {
      color: #fff;
      font-size: 11px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      line-height: 1.4;
      overflow-wrap: break-word;
    }
    .overlay {
      display: var(--flowme-vis-overlays, block);
    }
    .overlay-custom {
      padding: 0;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      opacity: var(--flowme-opacity-overlays, 1);
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
  N({ attribute: !1 })
], R.prototype, "hass", 1);
Y([
  S()
], R.prototype, "config", 2);
Y([
  S()
], R.prototype, "errorMessage", 2);
Y([
  S()
], R.prototype, "bgLayerA", 2);
Y([
  S()
], R.prototype, "bgLayerB", 2);
Y([
  S()
], R.prototype, "activeLayer", 2);
R = Y([
  Pt("flowme-card")
], R);
const Dt = window;
Dt.customCards = Dt.customCards ?? [];
Dt.customCards.push({
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
