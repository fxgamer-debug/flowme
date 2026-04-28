/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = globalThis, ie = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, se = Symbol(), pe = /* @__PURE__ */ new WeakMap();
let Xe = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ie && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = pe.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && pe.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const hi = (i) => new Xe(typeof i == "string" ? i : i + "", void 0, se), Et = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new Xe(e, i, se);
}, fi = (i, t) => {
  if (ie) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = _t.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  }
}, he = ie ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return hi(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: gi, defineProperty: mi, getOwnPropertyDescriptor: bi, getOwnPropertyNames: yi, getOwnPropertySymbols: vi, getPrototypeOf: wi } = Object, W = globalThis, fe = W.trustedTypes, xi = fe ? fe.emptyScript : "", $i = W.reactiveElementPolyfillSupport, ht = (i, t) => i, Ct = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? xi : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, ne = (i, t) => !gi(i, t), ge = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: ne };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), W.litPropertyMetadata ?? (W.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ot = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ge) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && mi(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = bi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ge;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ht("elementProperties"))) return;
    const t = wi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ht("properties"))) {
      const e = this.properties, s = [...yi(e), ...vi(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift(he(n));
    } else t !== void 0 && e.push(he(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
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
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return fi(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Ct).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Ct;
      this._$Em = n;
      const a = r.fromAttribute(e, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? ne)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
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
ot.elementStyles = [], ot.shadowRootOptions = { mode: "open" }, ot[ht("elementProperties")] = /* @__PURE__ */ new Map(), ot[ht("finalized")] = /* @__PURE__ */ new Map(), $i?.({ ReactiveElement: ot }), (W.reactiveElementVersions ?? (W.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis, me = (i) => i, Mt = ft.trustedTypes, be = Mt ? Mt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ze = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, Qe = "?" + j, _i = `<${Qe}>`, J = document, bt = () => J.createComment(""), yt = (i) => i === null || typeof i != "object" && typeof i != "function", oe = Array.isArray, ki = (i) => oe(i) || typeof i?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, dt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, ve = />/g, q = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, xe = /"/g, ti = /^(?:script|style|textarea|title)$/i, Si = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), m = Si(1), rt = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), $e = /* @__PURE__ */ new WeakMap(), Y = J.createTreeWalker(J, 129);
function ei(i, t) {
  if (!oe(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return be !== void 0 ? be.createHTML(t) : t;
}
const Ai = (i, t) => {
  const e = i.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = dt;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let d, c, u = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, c = r.exec(l), c !== null); ) p = r.lastIndex, r === dt ? c[1] === "!--" ? r = ye : c[1] !== void 0 ? r = ve : c[2] !== void 0 ? (ti.test(c[2]) && (n = RegExp("</" + c[2], "g")), r = q) : c[3] !== void 0 && (r = q) : r === q ? c[0] === ">" ? (r = n ?? dt, u = -1) : c[1] === void 0 ? u = -2 : (u = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? q : c[3] === '"' ? xe : we) : r === xe || r === we ? r = q : r === ye || r === ve ? r = dt : (r = q, n = void 0);
    const h = r === q && i[a + 1].startsWith("/>") ? " " : "";
    o += r === dt ? l + _i : u >= 0 ? (s.push(d), l.slice(0, u) + Ze + l.slice(u) + j + h) : l + j + (u === -2 ? a : h);
  }
  return [ei(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class vt {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, c] = Ai(t, e);
    if (this.el = vt.createElement(d, s), Y.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = Y.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(Ze)) {
          const p = c[r++], h = n.getAttribute(u).split(j), f = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: f[2], strings: h, ctor: f[1] === "." ? Mi : f[1] === "?" ? Pi : f[1] === "@" ? Fi : It }), n.removeAttribute(u);
        } else u.startsWith(j) && (l.push({ type: 6, index: o }), n.removeAttribute(u));
        if (ti.test(n.tagName)) {
          const u = n.textContent.split(j), p = u.length - 1;
          if (p > 0) {
            n.textContent = Mt ? Mt.emptyScript : "";
            for (let h = 0; h < p; h++) n.append(u[h], bt()), Y.nextNode(), l.push({ type: 2, index: ++o });
            n.append(u[p], bt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Qe) l.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(j, u + 1)) !== -1; ) l.push({ type: 7, index: o }), u += j.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = J.createElement("template");
    return s.innerHTML = t, s;
  }
}
function at(i, t, e = i, s) {
  if (t === rt) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = yt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(i), n._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = n : e._$Cl = n), n !== void 0 && (t = at(i, n._$AS(i, t.values), n, s)), t;
}
class Ci {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? J).importNode(e, !0);
    Y.currentNode = n;
    let o = Y.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new wt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new Ni(o, this, t)), this._$AV.push(d), l = s[++a];
      }
      r !== l?.index && (o = Y.nextNode(), r++);
    }
    return Y.currentNode = J, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class wt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = at(this, t, e), yt(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ki(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && yt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = vt.createElement(ei(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Ci(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = $e.get(t.strings);
    return e === void 0 && $e.set(t.strings, e = new vt(t)), e;
  }
  k(t) {
    oe(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new wt(this.O(bt()), this.O(bt()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = me(t).nextSibling;
      me(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class It {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = at(this, t, e, 0), r = !yt(t) || t !== this._$AH && t !== rt, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = at(this, a[s + l], e, l), d === rt && (d = this._$AH[l]), r || (r = !yt(d) || d !== this._$AH[l]), d === w ? t = w : t !== w && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mi extends It {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class Pi extends It {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class Fi extends It {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = at(this, t, e, 0) ?? w) === rt) return;
    const s = this._$AH, n = t === w && s !== w || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== w && (s === w || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ni {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    at(this, t);
  }
}
const Ei = ft.litHtmlPolyfillSupport;
Ei?.(vt, wt), (ft.litHtmlVersions ?? (ft.litHtmlVersions = [])).push("3.3.2");
const Ii = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new wt(t.insertBefore(bt(), o), o, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis;
let V = class extends ot {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ii(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return rt;
  }
};
V._$litElement$ = !0, V.finalized = !0, gt.litElementHydrateSupport?.({ LitElement: V });
const zi = gt.litElementPolyfillSupport;
zi?.({ LitElement: V });
(gt.litElementVersions ?? (gt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oi = { attribute: !0, type: String, converter: Ct, reflect: !1, hasChanged: ne }, Ti = (i = Oi, t, e) => {
  const { kind: s, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, i, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function D(i) {
  return (t, e) => typeof e == "object" ? Ti(i, t, e) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(i) {
  return D({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Di = (i) => i.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ri = { CHILD: 2 }, Li = (i) => (...t) => ({ _$litDirective$: i, values: t });
class Ui {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
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
const mt = (i, t) => {
  const e = i._$AN;
  if (e === void 0) return !1;
  for (const s of e) s._$AO?.(t, !1), mt(s, t);
  return !0;
}, Pt = (i) => {
  let t, e;
  do {
    if ((t = i._$AM) === void 0) break;
    e = t._$AN, e.delete(i), i = t;
  } while (e?.size === 0);
}, ii = (i) => {
  for (let t; t = i._$AM; i = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(i)) break;
    e.add(i), ji(t);
  }
};
function Bi(i) {
  this._$AN !== void 0 ? (Pt(this), this._$AM = i, ii(this)) : this._$AM = i;
}
function Hi(i, t = !1, e = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(s)) for (let o = e; o < s.length; o++) mt(s[o], !1), Pt(s[o]);
  else s != null && (mt(s, !1), Pt(s));
  else mt(this, i);
}
const ji = (i) => {
  i.type == Ri.CHILD && (i._$AP ?? (i._$AP = Hi), i._$AQ ?? (i._$AQ = Bi));
};
class Wi extends Ui {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, s) {
    super._$AT(t, e, s), ii(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (mt(this, t), Pt(this));
  }
  setValue(t) {
    if (Di(this._$Ct)) this._$Ct._$AI(t, this);
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
const si = () => new Vi();
class Vi {
}
const Ut = /* @__PURE__ */ new WeakMap(), ni = Li(class extends Wi {
  render(i) {
    return w;
  }
  update(i, [t]) {
    const e = t !== this.G;
    return e && this.G !== void 0 && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = i.options?.host, this.rt(this.ct = i.element)), w;
  }
  rt(i) {
    if (this.isConnected || (i = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = Ut.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), Ut.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, i), i !== void 0 && this.G.call(this.ht, i);
    } else this.G.value = i;
  }
  get lt() {
    return typeof this.G == "function" ? Ut.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Ft = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], qt = ["corner", "diagonal", "curve", "smooth"], Kt = [
  "dots",
  "dash",
  "pulse",
  "arrow",
  "trail",
  "fluid",
  "spark",
  "none"
], Yt = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], Jt = ["auto", "forward", "reverse", "both"], Xt = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], Gi = ["javascript:", "vbscript:", "data:", "file:"];
function oi(i, t = "card_config") {
  const e = [], s = /* @__PURE__ */ new WeakSet(), n = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const a = o.trim().toLowerCase();
        for (const l of Gi)
          if (a.startsWith(l)) {
            e.push({ path: r, value: o, scheme: l });
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
  return n(i, t), e;
}
function qi(i, t = "card_config") {
  const e = oi(i, t);
  if (e.length === 0) return;
  const s = e[0];
  throw new Error(
    `Unsafe URL scheme '${s.scheme}' in ${s.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class re extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const _e = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function y(i, t) {
  throw new re(`${i}: ${t}`);
}
function ae(i, t) {
  (!i || typeof i != "object") && y(t, "must be an object with x and y");
  const e = i, s = e.x, n = e.y;
  (typeof s != "number" || !Number.isFinite(s)) && y(`${t}.x`, "must be a finite number"), (typeof n != "number" || !Number.isFinite(n)) && y(`${t}.y`, "must be a finite number");
  const o = s, r = n;
  return (o < 0 || o > 100) && y(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && y(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function ke(i, t) {
  (typeof i != "string" || !i.length) && y(t, "must be a non-empty string");
  const e = i;
  return _e.some((n) => e.startsWith(n)) || y(
    t,
    `must start with one of ${_e.join(", ")} (got "${e.slice(0, 40)}")`
  ), e;
}
function Ki(i, t, e) {
  const s = `nodes[${t}]`;
  (!i || typeof i != "object") && y(s, "must be an object");
  const n = i, o = n.id;
  (typeof o != "string" || !o.length) && y(`${s}.id`, "must be a non-empty string");
  const r = o;
  e.has(r) && y(`${s}.id`, `duplicate node id "${r}"`), e.add(r);
  const a = ae(n.position, `${s}.position`), l = { id: r, position: a };
  return typeof n.entity == "string" && (l.entity = n.entity), typeof n.label == "string" && (l.label = n.label), typeof n.color == "string" && (l.color = n.color), typeof n.size == "number" && (l.size = n.size), typeof n.show_label == "boolean" && (l.show_label = n.show_label), typeof n.show_value == "boolean" && (l.show_value = n.show_value), n.opacity !== void 0 && (l.opacity = le(n.opacity, `${s}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && y(`${s}.visible`, "must be a boolean"), l.visible = n.visible), l;
}
function Yi(i, t, e, s) {
  const n = `flows[${t}]`;
  (!i || typeof i != "object") && y(n, "must be an object");
  const o = i, r = o.id;
  (typeof r != "string" || !r.length) && y(`${n}.id`, "must be a non-empty string");
  const a = r;
  e.has(a) && y(`${n}.id`, `duplicate flow id "${a}"`), e.add(a);
  const l = o.from_node;
  (typeof l != "string" || !s.has(l)) && y(`${n}.from_node`, `references unknown node "${String(l)}"`);
  const d = o.to_node;
  (typeof d != "string" || !s.has(d)) && y(`${n}.to_node`, `references unknown node "${String(d)}"`);
  const c = o.entity;
  (typeof c != "string" || !c.length) && y(`${n}.entity`, "must be a non-empty entity id");
  const u = o.waypoints;
  let p = [];
  u !== void 0 && (Array.isArray(u) || y(`${n}.waypoints`, "must be an array (may be empty or omitted)"), p = u.map(
    (f, v) => ae(f, `${n}.waypoints[${v}]`)
  ));
  const h = {
    id: a,
    from_node: l,
    to_node: d,
    entity: c,
    waypoints: p
  };
  if (typeof o.domain == "string" && (Ft.includes(o.domain) || y(`${n}.domain`, `must be one of ${Ft.join(", ")}`), h.domain = o.domain), typeof o.color == "string" && (h.color = o.color), typeof o.color_positive == "string" && (h.color_positive = o.color_positive), typeof o.color_negative == "string" && (h.color_negative = o.color_negative), typeof o.threshold == "number" && (h.threshold = o.threshold), typeof o.reverse == "boolean" && (h.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const f = o.speed_multiplier;
    (f < 0.1 || f > 5) && y(`${n}.speed_multiplier`, "must be between 0.1 and 5.0"), h.speed_multiplier = f;
  }
  return o.opacity !== void 0 && (h.opacity = le(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && y(`${n}.visible`, "must be a boolean"), h.visible = o.visible), o.line_style !== void 0 && (qt.includes(o.line_style) || y(`${n}.line_style`, `must be one of ${qt.join(", ")}`), h.line_style = o.line_style), o.speed_curve_override !== void 0 && (h.speed_curve_override = Ji(
    o.speed_curve_override,
    `${n}.speed_curve_override`
  )), o.animation !== void 0 && (h.animation = Qi(o.animation, `${n}.animation`)), o.value_gradient !== void 0 && (h.value_gradient = ts(o.value_gradient, `${n}.value_gradient`)), h;
}
function Ji(i, t) {
  (!i || typeof i != "object" || Array.isArray(i)) && y(t, "must be an object");
  const e = i, s = {};
  function n(p) {
    const h = e[p];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && y(`${t}.${p}`, "must be a positive finite number"), h;
  }
  function o(p) {
    const h = e[p];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h < 50) && y(`${t}.${p}`, "must be a finite number ≥ 50 (milliseconds)"), h;
  }
  const r = n("threshold");
  r !== void 0 && (s.threshold = r);
  const a = n("p50");
  a !== void 0 && (s.p50 = a);
  const l = n("peak");
  l !== void 0 && (s.peak = l);
  const d = o("max_duration");
  d !== void 0 && (s.max_duration = d);
  const c = o("min_duration");
  if (c !== void 0 && (s.min_duration = c), e.steepness !== void 0) {
    const p = e.steepness;
    (typeof p != "number" || !Number.isFinite(p) || p <= 0) && y(`${t}.steepness`, "must be a positive finite number"), s.steepness = p;
  }
  s.max_duration !== void 0 && s.min_duration !== void 0 && s.min_duration >= s.max_duration && y(t, "min_duration must be < max_duration");
  const u = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const p of Object.keys(e))
    u.has(p) || y(`${t}.${p}`, `unknown key (allowed: ${[...u].join(", ")})`);
  return s;
}
function st(i, t) {
  return (typeof i != "number" || !Number.isFinite(i) || i <= 0) && y(t, "must be a positive finite number"), i;
}
function Xi(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && y("defaults", "must be an object");
  const t = i, e = {};
  if (t.node_radius !== void 0 && (e.node_radius = st(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const s = st(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    s > 1 && y("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), e.burst_trigger_ratio = s;
  }
  return t.burst_sustain_ms !== void 0 && (e.burst_sustain_ms = st(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (e.burst_max_particles = st(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (e.dot_radius = st(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (e.line_width = st(t.line_width, "defaults.line_width")), e;
}
function le(i, t) {
  return (typeof i != "number" || !Number.isFinite(i) || i < 0 || i > 1) && y(t, "must be a number between 0 and 1"), i;
}
function Zi(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && y("opacity", "must be an object");
  const t = i, e = {};
  for (const s of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[s] !== void 0 && (e[s] = le(t[s], `opacity.${s}`));
  return e;
}
function Qi(i, t) {
  (!i || typeof i != "object" || Array.isArray(i)) && y(t, "must be an object");
  const e = i, s = {};
  e.animation_style !== void 0 && (Kt.includes(e.animation_style) || y(`${t}.animation_style`, `must be one of ${Kt.join(", ")}`), s.animation_style = e.animation_style), e.particle_shape !== void 0 && (Yt.includes(e.particle_shape) || y(`${t}.particle_shape`, `must be one of ${Yt.join(", ")}`), s.particle_shape = e.particle_shape), e.direction !== void 0 && (Jt.includes(e.direction) || y(`${t}.direction`, `must be one of ${Jt.join(", ")}`), s.direction = e.direction), e.particle_spacing !== void 0 && (Xt.includes(e.particle_spacing) || y(`${t}.particle_spacing`, `must be one of ${Xt.join(", ")}`), s.particle_spacing = e.particle_spacing), e.custom_svg_path !== void 0 && (typeof e.custom_svg_path != "string" && y(`${t}.custom_svg_path`, "must be a string (SVG path d= attribute)"), e.custom_svg_path.length === 0 && console.warn(`[flowme] ${t}.custom_svg_path is empty — will fall back to circle`), s.custom_svg_path = e.custom_svg_path);
  const n = (g, b) => {
    const $ = e[g];
    if ($ !== void 0)
      return (typeof $ != "number" || !Number.isFinite($) || $ <= 0) && y(`${t}.${g}`, "must be a positive finite number"), b !== void 0 && $ > b && y(`${t}.${g}`, `must be ≤ ${b}`), $;
  }, o = (g) => {
    const b = e[g];
    if (b !== void 0)
      return typeof b != "boolean" && y(`${t}.${g}`, "must be a boolean"), b;
  }, r = n("particle_size");
  if (r !== void 0 && (s.particle_size = r), e.particle_count !== void 0) {
    const g = e.particle_count;
    (typeof g != "number" || !Number.isFinite(g) || g < 1 || !Number.isInteger(g)) && y(`${t}.particle_count`, "must be a positive integer ≥ 1"), s.particle_count = g;
  }
  if (e.glow_intensity !== void 0) {
    const g = e.glow_intensity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0) && y(`${t}.glow_intensity`, "must be a non-negative finite number"), s.glow_intensity = g;
  }
  const a = o("shimmer");
  a !== void 0 && (s.shimmer = a);
  const l = o("flicker");
  l !== void 0 && (s.flicker = l);
  const d = n("pulse_width");
  d !== void 0 && (s.pulse_width = d);
  const c = n("trail_length");
  if (c !== void 0 && (s.trail_length = c), e.dash_gap !== void 0) {
    const g = e.dash_gap;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 10) && y(`${t}.dash_gap`, "must be a number between 0 and 10"), s.dash_gap = g;
  }
  const u = n("cluster_size");
  u !== void 0 && (s.cluster_size = Math.max(1, Math.round(u)));
  const p = n("cluster_gap");
  p !== void 0 && (s.cluster_gap = p);
  const h = n("pulse_frequency", 20);
  if (h !== void 0 && (s.pulse_frequency = h), e.pulse_ratio !== void 0) {
    const g = e.pulse_ratio;
    (typeof g != "number" || !Number.isFinite(g) || g <= 0 || g >= 1) && y(`${t}.pulse_ratio`, "must be a number between 0 (exclusive) and 1 (exclusive)"), s.pulse_ratio = g;
  }
  const f = n("wave_frequency", 20);
  f !== void 0 && (s.wave_frequency = f);
  const v = n("wave_amplitude");
  return v !== void 0 && (s.wave_amplitude = v), s;
}
function Se(i, t) {
  return (typeof i != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(i)) && y(t, 'must be a CSS hex colour string, e.g. "#FF4500" or "#f00"'), i;
}
function ts(i, t) {
  (!i || typeof i != "object" || Array.isArray(i)) && y(t, "must be an object");
  const e = i;
  (typeof e.entity != "string" || !e.entity.length) && y(`${t}.entity`, "must be a non-empty entity id string"), (typeof e.low_value != "number" || !Number.isFinite(e.low_value)) && y(`${t}.low_value`, "must be a finite number"), (typeof e.high_value != "number" || !Number.isFinite(e.high_value)) && y(`${t}.high_value`, "must be a finite number"), e.low_value >= e.high_value && console.warn(`[flowme] ${t}: low_value should be less than high_value`);
  const s = {
    entity: e.entity,
    low_value: e.low_value,
    high_value: e.high_value,
    low_color: Se(e.low_color, `${t}.low_color`),
    high_color: Se(e.high_color, `${t}.high_color`)
  };
  return e.mode !== void 0 && (["flow", "line", "both"].includes(e.mode) || y(`${t}.mode`, "must be one of: flow, line, both"), s.mode = e.mode), s;
}
function es(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && y("animation", "must be an object");
  const t = i, e = {};
  if (t.fps !== void 0) {
    const s = t.fps;
    (typeof s != "number" || !Number.isFinite(s) || s < 1 || s > 120) && y("animation.fps", "must be a number between 1 and 120"), e.fps = s;
  }
  return t.smooth_speed !== void 0 && (typeof t.smooth_speed != "boolean" && y("animation.smooth_speed", "must be a boolean"), e.smooth_speed = t.smooth_speed), e;
}
function is(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && y("visibility", "must be an object");
  const t = i, e = {};
  for (const s of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[s] !== void 0 && (typeof t[s] != "boolean" && y(`visibility.${s}`, "must be a boolean"), e[s] = t[s]);
  return e;
}
function ss(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && y("domain_colors", "must be an object");
  const t = i, e = {};
  for (const s of ["solar", "grid", "battery", "load"])
    t[s] !== void 0 && (typeof t[s] != "string" && y(`domain_colors.${s}`, "must be a string colour value"), e[s] = t[s]);
  return e;
}
function kt(i) {
  if (!i || typeof i != "object") throw new re("config must be an object");
  const t = i;
  t.type !== "custom:flowme-card" && y("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), Ft.includes(t.domain) || y("domain", `must be one of ${Ft.join(", ")}`);
  const e = t.background;
  e !== void 0 && (e === null || typeof e != "object") && y("background", "must be an object when provided");
  const s = e ?? {}, o = { default: s.default === void 0 || s.default === "" ? "" : ke(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && y("background.weather_entity", "must be a string entity id"), o.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && y("background.weather_states", "must be an object mapping state strings to image URLs");
    const h = Object.entries(s.weather_states), f = {};
    for (const [v, g] of h)
      f[v] = ke(g, `background.weather_states.${v}`);
    o.weather_states = f;
  }
  s.sun_entity !== void 0 && (typeof s.sun_entity != "string" && y("background.sun_entity", "must be a string entity id (e.g. sun.sun)"), o.sun_entity = s.sun_entity), s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && y("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = s.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || y("nodes", "must be an array");
  const a = /* @__PURE__ */ new Set(), l = r.map((h, f) => Ki(h, f, a));
  l.length === 0 && y("nodes", "at least one node is required");
  const d = t.flows;
  Array.isArray(d) || y("flows", "must be an array");
  const c = /* @__PURE__ */ new Set(), u = d.map(
    (h, f) => Yi(h, f, c, a)
  ), p = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: l,
    flows: u
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && y("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), p.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && y("fullscreen", "must be a boolean"), p.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && y("edit_mode_password", "must be a string"), p.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || y("overlays", "must be an array");
    const h = /* @__PURE__ */ new Set();
    p.overlays = t.overlays.map(
      (f, v) => ns(f, v, h)
    );
  }
  return t.defaults !== void 0 && (p.defaults = Xi(t.defaults)), t.domain_colors !== void 0 && (p.domain_colors = ss(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && y("debug", "must be a boolean"), p.debug = t.debug), t.opacity !== void 0 && (p.opacity = Zi(t.opacity)), t.visibility !== void 0 && (p.visibility = is(t.visibility)), t.animation !== void 0 && (p.animation = es(t.animation)), p;
}
function ns(i, t, e) {
  const s = `overlays[${t}]`;
  (!i || typeof i != "object") && y(s, "must be an object");
  const n = i, o = n.type, a = typeof o == "string" && ["camera", "switch", "sensor", "button"].includes(o);
  !a && o !== "custom" && y(
    `${s}.type`,
    'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.'
  );
  const l = n.id;
  (typeof l != "string" || !l.length) && y(`${s}.id`, "must be a non-empty string"), e.has(l) && y(`${s}.id`, `duplicate overlay id "${l}"`), e.add(l);
  const d = ae(n.position, `${s}.position`);
  if (a) {
    const f = `type: ${o} was removed in v1.0.9. Replace with type: custom and a card: block. See documentation.`;
    console.warn(`[flowme] ${s}: ${f}`);
    const v = {
      id: l,
      type: "custom",
      position: d,
      card: { type: "markdown", content: "" },
      _migration_warning: f
    };
    if (n.size !== void 0) {
      const g = n.size;
      if (g && typeof g == "object") {
        const b = g, $ = b.width, _ = b.height;
        typeof $ == "number" && typeof _ == "number" && (v.size = { width: $, height: _ });
      }
    }
    return v;
  }
  const c = n.card;
  (!c || typeof c != "object" || Array.isArray(c)) && y(`${s}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  const u = oi(c, `${s}.card`);
  if (u.length) {
    const f = u[0];
    y(
      f.path,
      `unsafe URL scheme "${f.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`
    );
  }
  const h = {
    id: l,
    type: "custom",
    position: d,
    card: c
  };
  if (n.size !== void 0) {
    const f = n.size;
    (!f || typeof f != "object") && y(`${s}.size`, "must be an object with width and height");
    const v = f, g = v.width, b = v.height;
    (typeof g != "number" || !Number.isFinite(g) || g <= 0 || g > 100) && y(`${s}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof b != "number" || !Number.isFinite(b) || b <= 0 || b > 100) && y(`${s}.size.height`, "must be a positive number ≤ 100 (percent of card)"), h.size = { width: g, height: b };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && y(`${s}.visible`, "must be a boolean"), h.visible = n.visible), n.opacity !== void 0) {
    const f = n.opacity;
    (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 1) && y(`${s}.opacity`, "must be a number between 0 and 1"), h.opacity = f;
  }
  return h;
}
function ce(i, t, e) {
  return i < t ? t : i > e ? e : i;
}
function Ae(i, t, e) {
  return i + (t - i) * e;
}
function Nt(i, t) {
  return { x: i.x / 100 * t.width, y: i.y / 100 * t.height };
}
function ri(i) {
  let t = 0;
  for (let e = 1; e < i.length; e++) {
    const s = i[e - 1], n = i[e];
    if (!s || !n) continue;
    const o = n.x - s.x, r = n.y - s.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function os(i, t) {
  if (i.length === 0) return { x: 0, y: 0 };
  if (i.length === 1) return { ...i[0] };
  const e = ri(i), s = ce(t, 0, 1) * e;
  let n = 0;
  for (let o = 1; o < i.length; o++) {
    const r = i[o - 1], a = i[o], l = a.x - r.x, d = a.y - r.y, c = Math.sqrt(l * l + d * d);
    if (n + c >= s) {
      const u = c === 0 ? 0 : (s - n) / c;
      return { x: r.x + l * u, y: r.y + d * u };
    }
    n += c;
  }
  return { ...i[i.length - 1] };
}
function Ce(i, t, e) {
  if (i.length === 0) return "";
  if (i.length === 1) {
    const a = Nt(i[0], t);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const s = i.map((a) => Nt(a, t));
  if (e === "diagonal") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++)
      a.push(`L ${s[l].x.toFixed(2)} ${s[l].y.toFixed(2)}`);
    return a.join(" ");
  }
  if (e === "corner") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++) {
      const d = s[l - 1], c = s[l];
      a.push(`L ${c.x.toFixed(2)} ${d.y.toFixed(2)}`), a.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  if (e === "curve") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++) {
      const d = s[l - 1], c = s[l], u = (c.x - d.x) / 3, p = (c.y - d.y) / 3, h = (d.x + u).toFixed(2), f = (d.y + p).toFixed(2), v = (c.x - u).toFixed(2), g = (c.y - p).toFixed(2);
      a.push(`C ${h} ${f} ${v} ${g} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  const n = 0.3, o = 20, r = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
  for (let a = 1; a < s.length; a++) {
    const l = s[a - 1], d = s[a], c = s[a + 1];
    if (!c) {
      r.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
      continue;
    }
    const u = Math.sqrt((d.x - l.x) ** 2 + (d.y - l.y) ** 2), p = Math.sqrt((c.x - d.x) ** 2 + (c.y - d.y) ** 2), h = Math.min(Math.min(u, p) * n, o), f = h / (u || 1), v = d.x - (d.x - l.x) * f, g = d.y - (d.y - l.y) * f, b = h / (p || 1), $ = d.x + (c.x - d.x) * b, _ = d.y + (c.y - d.y) * b;
    r.push(`L ${v.toFixed(2)} ${g.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${$.toFixed(2)} ${_.toFixed(2)}`);
  }
  return r.join(" ");
}
function Me(i) {
  if (i == null) return 0;
  if (typeof i == "number") return Number.isFinite(i) ? i : 0;
  const t = i.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const e = Number.parseFloat(t);
  return Number.isFinite(e) ? e : 0;
}
const X = 9e3, Z = 700, Q = 1.5;
function B(i, t) {
  const { threshold: e, p50: s, max_duration: n, min_duration: o, steepness: r } = t, a = Math.abs(i);
  if (!(s > 0) || !(e > 0)) return n;
  const l = Math.max(a, e), d = Math.log10(l / s), c = 1 / (1 + Math.exp(-r * d));
  return n - c * (n - o);
}
function de(i, t) {
  const e = i.speed_curve_override ?? {}, s = e.threshold ?? i.threshold ?? t.threshold, n = e.p50 ?? t.p50, o = e.peak ?? t.peak, r = e.max_duration ?? X, a = e.min_duration ?? Z, l = e.steepness ?? Q;
  return { threshold: s, p50: n, peak: o, max_duration: r, min_duration: a, steepness: l };
}
function rs(i, t, e) {
  if (!e || !t) return { value: i, factor: 1 };
  const s = t.trim();
  if (!s) return { value: i, factor: 1 };
  if (Object.prototype.hasOwnProperty.call(e, s)) {
    const r = e[s] ?? 1;
    return { value: i * r, factor: r, matchedUnit: s };
  }
  const n = s.toLowerCase(), o = Object.entries(e).filter(
    ([r]) => r.toLowerCase() === n
  );
  if (o.length === 1) {
    const [r, a] = o[0];
    return { value: i * a, factor: a, matchedUnit: r };
  }
  return { value: i, factor: 1 };
}
function ai(i, t) {
  let e = null, s = null;
  const n = (...o) => {
    s = o, e !== null && clearTimeout(e), e = setTimeout(() => {
      e = null, s && i(...s), s = null;
    }, t);
  };
  return n.cancel = () => {
    e !== null && (clearTimeout(e), e = null), s = null;
  }, n;
}
function as(i, t, e, s) {
  if (!e) return s;
  const n = t === "below_horizon";
  let o = i;
  n && !i.endsWith("-night") && (o = `${i}-night`);
  const r = e[o];
  if (r) return r;
  if (n && o !== "clear-night") {
    const a = e["clear-night"];
    if (a) return a;
  }
  if (o !== i) {
    const a = e[i];
    if (a) return a;
  }
  return s;
}
function St(i) {
  if (!i) return;
  const t = /^(\d+):(\d+)$/.exec(i);
  if (!t) return;
  const e = Number.parseInt(t[1], 10), s = Number.parseInt(t[2], 10);
  if (!(!e || !s))
    return e / s;
}
function Pe(i) {
  const t = i.replace("#", ""), e = t.length === 3 ? t.split("").map((n) => n + n).join("") : t, s = parseInt(e, 16);
  return [s >> 16 & 255, s >> 8 & 255, s & 255];
}
function Fe(i, t, e) {
  const s = i / 255, n = t / 255, o = e / 255, r = Math.max(s, n, o), a = Math.min(s, n, o), l = (r + a) / 2;
  if (r === a) return [0, 0, l];
  const d = r - a, c = l > 0.5 ? d / (2 - r - a) : d / (r + a);
  let u;
  return r === s ? u = (n - o) / d + (n < o ? 6 : 0) : r === n ? u = (o - s) / d + 2 : u = (s - n) / d + 4, [u * 60, c, l];
}
function Bt(i, t, e) {
  let s = e;
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? i + (t - i) * 6 * s : s < 1 / 2 ? t : s < 2 / 3 ? i + (t - i) * (2 / 3 - s) * 6 : i;
}
function ls(i, t, e) {
  const s = i / 360;
  let n, o, r;
  if (t === 0)
    n = o = r = e;
  else {
    const l = e < 0.5 ? e * (1 + t) : e + t - e * t, d = 2 * e - l;
    n = Bt(d, l, s + 1 / 3), o = Bt(d, l, s), r = Bt(d, l, s - 1 / 3);
  }
  const a = (l) => Math.round(l * 255).toString(16).padStart(2, "0");
  return `#${a(n)}${a(o)}${a(r)}`;
}
function li(i, t) {
  const e = t.high_value - t.low_value, s = e === 0 ? 0 : Math.max(0, Math.min(1, (i - t.low_value) / e)), [n, o, r] = Pe(t.low_color), [a, l, d] = Pe(t.high_color), [c, u, p] = Fe(n, o, r), [h, f, v] = Fe(a, l, d);
  let g = h - c;
  g > 180 && (g -= 360), g < -180 && (g += 360);
  const b = (c + g * s + 360) % 360, $ = Ae(u, f, s), _ = Ae(p, v, s);
  return ls(b, $, _);
}
const cs = {
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
  speed_curve(i) {
    return B(i, {
      threshold: 30,
      p50: 800,
      max_duration: X,
      min_duration: Z,
      steepness: Q
    });
  },
  describe(i) {
    return Math.abs(i) >= 1e3 ? `${(i / 1e3).toFixed(2)} kW` : `${Math.round(i)} W`;
  }
}, ds = {
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
  speed_curve(i) {
    return B(i, {
      threshold: 0.3,
      p50: 6,
      max_duration: X,
      min_duration: Z,
      steepness: Q
    });
  },
  wave_amplitude_curve(i) {
    return 4;
  },
  describe(i) {
    return Math.abs(i) >= 100 ? `${i.toFixed(0)} L/min` : Math.abs(i) >= 10 ? `${i.toFixed(1)} L/min` : `${i.toFixed(2)} L/min`;
  }
}, us = {
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
  speed_curve(i) {
    return B(i, {
      threshold: 0.05,
      p50: 50,
      max_duration: X,
      min_duration: Z,
      steepness: Q
    });
  },
  particle_count_curve(i) {
    const t = Math.abs(i);
    return Math.round(ce(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(i) {
    const t = Math.abs(i);
    return t >= 1e3 ? `${(i / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${i.toFixed(1)} Mbps` : `${i.toFixed(2)} Mbps`;
  }
}, ps = {
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
  speed_curve(i) {
    return B(i, {
      threshold: 5,
      p50: 200,
      max_duration: X,
      min_duration: Z,
      steepness: Q
    });
  },
  wave_amplitude_curve(i) {
    const t = Math.abs(i);
    return ce(2 + t / 100, 2, 10);
  },
  describe(i) {
    return `${Math.round(i)} CFM`;
  }
}, hs = {
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
  speed_curve(i) {
    return B(i, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: X,
      min_duration: Z,
      steepness: Q
    });
  },
  describe(i) {
    return Math.abs(i) >= 10 ? `${i.toFixed(1)} m³/h` : `${i.toFixed(2)} m³/h`;
  }
}, ci = {
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
  speed_curve(i) {
    return B(i, {
      threshold: 1,
      p50: 100,
      max_duration: X,
      min_duration: Z,
      steepness: Q
    });
  },
  describe(i) {
    return Math.abs(i) >= 100 ? i.toFixed(0) : Math.abs(i) >= 10 ? i.toFixed(1) : i.toFixed(2);
  }
}, Ne = {
  energy: cs,
  water: ds,
  network: us,
  hvac: ps,
  gas: hs,
  generic: ci
};
function G(i) {
  return i && i in Ne ? Ne[i] : ci;
}
const fs = "#CCCCCC";
function gs(i, t, e) {
  if (i !== "energy") return;
  const s = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(s)) return e?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(s)) return e?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(s)) return e?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(s))
    return e?.load ?? "#FF8C1E";
}
function lt(i, t, e, s, n) {
  const o = i.color ?? gs(e, i.id, n);
  return s >= 0 ? i.color_positive ?? o ?? t.default_color_positive : i.color_negative ?? o ?? t.default_color_negative;
}
const ms = "[FlowMe]";
let di = !1;
function bs(i) {
  di = i;
}
function P(...i) {
  di && console.warn(ms, ...i);
}
const ys = "[FlowMe Renderer]";
function ut(...i) {
  P(ys, ...i);
}
const A = "http://www.w3.org/2000/svg", H = "http://www.w3.org/1999/xlink";
function vs() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const Ht = vs(), ws = 2e3, jt = 3, xs = 5, Wt = 2, $s = 14, _s = 0.9, ks = 5e3, pt = 20, Ss = 0.2, Vt = 0.3;
class Zt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ai(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.currentDurMs = /* @__PURE__ */ new Map(), this.targetDurMs = /* @__PURE__ */ new Map(), this.speedTransitionStart = /* @__PURE__ */ new Map(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptiveChange = /* @__PURE__ */ new Map(), this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.frameTimeSamples = [], this.lastFrameForAdaptive = 0;
  }
  async init(t, e) {
    ut("init:", t.getBoundingClientRect(), "flows:", e.flows.length), this.container = t, this.config = e, this.flowsById = new Map(e.flows.map((n) => [n.id, n]));
    const s = document.createElementNS(A, "svg");
    s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("preserveAspectRatio", "none"), s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.overflow = "visible", this.svg = s, t.appendChild(s), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t), this.startFpsLoop();
  }
  updateFlow(t, e) {
    this.flowsById.has(t) && (this.latestValues.set(t, e), this.applyUpdate());
  }
  /**
   * GRADIENT-1: Set the resolved gradient colour for a flow.
   * Called by FlowmeCard whenever the gradient entity's state changes.
   * The colour replaces the normal flow colour in the next render frame.
   * Pass undefined/null to clear and fall back to the flow's own color.
   */
  setGradientColor(t, e) {
    e ? this.gradientColors.set(t, e) : this.gradientColors.delete(t), this.applyUpdate();
  }
  /**
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  startFpsLoop() {
    const e = 1e3 / (this.config?.animation?.fps ?? 60), s = (n) => {
      if (!this.svg) return;
      const o = n - this.lastFrameTime;
      this.sampleFrameTime(), o >= e && (this.lastFrameTime = n - o % e, this.config?.animation?.smooth_speed !== !1 && (this.speedTransitionStart.size > 0 || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(n)), this.rafHandle = requestAnimationFrame(s);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(s);
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.currentDurMs.clear(), this.targetDurMs.clear(), this.speedTransitionStart.clear(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.lastAdaptiveChange.clear(), this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear();
  }
  // ── internal ──────────────────────────────────────────────────────────────
  containerSize() {
    if (!this.container) return { width: 0, height: 0 };
    const t = this.container.getBoundingClientRect();
    return { width: Math.max(1, t.width), height: Math.max(1, t.height) };
  }
  animStyle(t) {
    return t.animation?.animation_style ?? "dots";
  }
  buildSkeleton() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const e = document.createElementNS(A, "defs");
    this.svg.appendChild(e);
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const a = [o.position, ...n.waypoints, r.position], l = `flowme-path-${n.id}`, d = document.createElementNS(A, "path");
      d.setAttribute("id", l), d.setAttribute("d", Ce(a, t, n.line_style ?? "corner")), d.setAttribute("fill", "none"), e.appendChild(d);
      const c = document.createElementNS(A, "g");
      c.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && c.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (c.style.display = "none");
      const u = this.config?.defaults?.line_width ?? Wt, p = document.createElementNS(A, "use");
      p.setAttributeNS(H, "href", `#${l}`), p.setAttribute("href", `#${l}`), p.setAttribute("stroke", this.primaryColor(n)), p.setAttribute("stroke-opacity", "0.2"), p.setAttribute("stroke-width", String(u)), p.setAttribute("stroke-linecap", "round"), p.setAttribute("stroke-linejoin", "round"), p.setAttribute("fill", "none"), c.appendChild(p);
      const h = {
        group: c,
        path: d,
        pathId: l,
        outline: p,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(c), this.flowNodes.set(n.id, h), ut("skeleton:", n.id, "| style=", h.style);
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const e = new Map(this.config.nodes.map((s) => [s.id, s]));
    for (const s of this.config.flows) {
      const n = this.flowNodes.get(s.id);
      if (!n) continue;
      const o = e.get(s.from_node), r = e.get(s.to_node);
      if (!o || !r) continue;
      const a = [o.position, ...s.waypoints, r.position];
      n.path.setAttribute("d", Ce(a, t, s.line_style ?? "corner")), n.style === "pulse" && this.applyFlow(s.id, this.latestValues.get(s.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, e] of this.latestValues)
      this.applyFlow(t, e);
  }
  applyFlow(t, e) {
    const s = this.flowsById.get(t), n = this.flowNodes.get(t);
    if (!s || !n) return;
    const o = s.animation ?? {}, r = o.animation_style ?? "dots";
    n.style !== r && (this.teardownStyle(n), n.style = r);
    const a = this.profileFor(s), l = de(s, a), d = Ht ? 0 : l.threshold, c = Math.abs(e), p = o.shimmer === !0 && c < d && c > 0;
    if (!(Ht || c >= d || p)) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const f = Ht ? ws : B(c, l), v = s.speed_multiplier ?? 1;
    let g = Math.max(50, f * v);
    p && (g = g / Ss);
    const b = this.config?.animation?.smooth_speed !== !1;
    g = this.resolveSmoothedDur(t, g, b);
    const $ = o.direction ?? "auto";
    let _;
    $ === "forward" ? _ = 1 : $ === "reverse" ? _ = -1 : _ = e < 0 != (s.reverse === !0) ? -1 : 1;
    let S = _, k = p ? Vt : 1;
    if (b && $ === "auto") {
      const Dt = this.lastDirection.get(t), pi = this.dirChanging.get(t);
      Dt !== void 0 && Dt !== _ && !pi && this.dirChanging.set(t, { startMs: performance.now(), oldDir: Dt, newDir: _ });
      const xt = this.dirChanging.get(t);
      if (xt) {
        const ue = performance.now() - xt.startMs;
        if (ue < 300) {
          const Rt = ue / 300;
          Rt < 0.5 ? (k = (p ? Vt : 1) * (1 - Rt * 2), S = xt.oldDir) : (k = (p ? Vt : 1) * ((Rt - 0.5) * 2), S = xt.newDir);
        } else
          this.dirChanging.delete(t), S = _;
      }
    }
    this.lastDirection.set(t, _);
    const I = s.domain ?? this.config?.domain, E = lt(s, a, I, S, this.config?.domain_colors), z = this.gradientColors.get(t), T = s.value_gradient?.mode ?? "flow", it = z && T !== "line" ? z : E, Tt = z && T !== "flow" ? z : E, O = it;
    n.outline && n.outline.setAttribute("stroke", Tt), this.setGroupOpacity(n, k);
    const R = this.updateBurstState(t, c, l, a);
    switch (ut("applyFlow:", t, "style=", r, "dur=", g, "dir=", S, "color=", O), r) {
      case "dots":
        this.applyDots(n, s, a, e, g, O, S, R);
        break;
      case "dash":
        this.applyDash(n, s, g, O, S, R);
        break;
      case "pulse":
        this.applyPulse(n, s, a, e, g, O, R);
        break;
      case "arrow":
        this.applyArrows(n, s, g, O, S, R);
        break;
      case "trail":
        this.applyTrail(n, s, g, O, S, R);
        break;
      case "fluid":
        this.applyFluid(n, s, g, O, S);
        break;
      case "spark":
        this.applySpark(n, s, a, e, g, O, S, R);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, s, a, e, g, O, S, R);
    }
  }
  // ── smooth_speed (ANIM-2) ─────────────────────────────────────────────────
  resolveSmoothedDur(t, e, s) {
    if (!s)
      return this.currentDurMs.set(t, e), this.targetDurMs.set(t, e), e;
    this.targetDurMs.get(t) !== e && (this.speedTransitionStart.set(t, performance.now()), this.targetDurMs.set(t, e));
    const o = this.currentDurMs.get(t) ?? e, r = this.speedTransitionStart.get(t);
    if (r === void 0)
      return this.currentDurMs.set(t, e), e;
    const a = performance.now() - r, l = 500;
    if (a >= l)
      return this.currentDurMs.set(t, e), this.speedTransitionStart.delete(t), e;
    const d = a / l, c = d * d * (3 - 2 * d), u = o + (e - o) * c;
    return this.currentDurMs.set(t, u), u;
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(t, e, s, n) {
    const o = s.peak, r = this.config?.defaults?.burst_trigger_ratio ?? _s, a = this.config?.defaults?.burst_sustain_ms ?? ks, l = o * r;
    if (e < l)
      return this.burstActive.delete(t), this.burstEnteredAt.delete(t), 1;
    let d = this.burstEnteredAt.get(t);
    if (d === void 0 && (d = performance.now(), this.burstEnteredAt.set(t, d)), performance.now() - d < a) return 1;
    const c = n.burst_density_multiplier ?? 1.5;
    return this.burstActive.add(t), c;
  }
  // ── helpers ───────────────────────────────────────────────────────────────
  setGroupOpacity(t, e) {
    const s = String(e);
    for (const n of t.particles) n.shape.setAttribute("opacity", s);
    if (t.particlesBack) for (const n of t.particlesBack) n.shape.setAttribute("opacity", s);
    if (t.lineStroke && t.lineStroke.setAttribute("opacity", e > 0 ? "0.9" : "0"), t.pulseCircles) for (const n of t.pulseCircles) n.circle.setAttribute("opacity", s);
    t.fluidGradient && t.fluidGradient.parentElement?.setAttribute("opacity", s);
  }
  /** Remove all style-specific DOM elements, ready to switch style */
  teardownStyle(t) {
    for (const e of t.particles) e.shape.remove();
    if (t.particles = [], t.particlesBack) {
      for (const e of t.particlesBack) e.shape.remove();
      t.particlesBack = void 0;
    }
    if (t.lineStroke?.remove(), t.lineStroke = void 0, t.pulseCircles) {
      for (const e of t.pulseCircles) e.circle.remove();
      t.pulseCircles = void 0;
    }
    t.fluidGradient?.parentElement?.remove(), t.fluidGradient = void 0;
  }
  sampleFrameTime() {
    const t = performance.now();
    if (this.lastFrameForAdaptive > 0) {
      const e = t - this.lastFrameForAdaptive;
      this.frameTimeSamples.push(e), this.frameTimeSamples.length > 10 && this.frameTimeSamples.shift();
    }
    this.lastFrameForAdaptive = t;
  }
  avgFrameMs() {
    return this.frameTimeSamples.length === 0 ? 16.67 : this.frameTimeSamples.reduce((t, e) => t + e, 0) / this.frameTimeSamples.length;
  }
  resolveParticleCount(t, e, s, n) {
    const o = t.animation ?? {}, a = 1e3 / (this.config?.animation?.fps ?? 60);
    if (o.particle_count !== void 0) return o.particle_count;
    const l = Math.max(
      1,
      Math.round(e.particle_count_curve ? e.particle_count_curve(s) : jt)
    ), d = this.config?.defaults?.burst_max_particles ?? pt, c = Math.min(d, Math.max(1, Math.round(l * n))), u = o.animation_style ?? "dots";
    if (u === "dots" || u === "trail") {
      const p = this.adaptiveCount.get(t.id) ?? c, h = this.avgFrameMs(), f = performance.now(), v = this.lastAdaptiveChange.get(t.id) ?? 0;
      if (f - v > 1e3) {
        let b = p;
        h > a * 1.2 && p > 1 ? (b = p - 1, ut("adaptive:", t.id, "reducing particles", p, "→", b, "(avg frame", h.toFixed(1), "ms)")) : h < a * 0.8 && p < c && (b = p + 1, ut("adaptive:", t.id, "restoring particles", p, "→", b)), b !== p && (this.adaptiveCount.set(t.id, b), this.lastAdaptiveChange.set(t.id, f));
      }
      return this.adaptiveCount.get(t.id) ?? c;
    }
    return c;
  }
  resolveParticleRadius(t) {
    return (this.config?.defaults?.dot_radius ?? xs) * (t.animation?.particle_size ?? 1);
  }
  resolveGlow(t, e) {
    return t.animation?.glow_intensity === 0 ? !1 : e.glow;
  }
  glowFilter(t, e, s) {
    return this.resolveGlow(t, e) ? `drop-shadow(0 0 ${(6 * (t.animation?.glow_intensity ?? 1)).toFixed(1)}px ${s})` : "";
  }
  // ── SPACING-1: particle begin-offset computation ─────────────────────────
  /**
   * Compute `begin` offsets (in seconds, negative = pre-delay before cycle
   * start) for all particles given the configured spacing mode.
   *
   * Returns an array of `count` numbers, each representing the `begin`
   * attribute value for `animateMotion`.
   */
  resolveParticleBegins(t, e, s, n) {
    const o = n.particle_spacing ?? "even", r = s / 1e3, a = r / e;
    switch (o) {
      case "even":
      default:
        return Array.from({ length: e }, (l, d) => -(a * d));
      case "random": {
        const l = performance.now(), d = this.randomOffsetsLastUpdate.get(t) ?? 0, c = 3e3;
        let u = this.randomOffsets.get(t);
        if (!u || u.length !== e || l - d > c) {
          const p = a * 0.1, h = [];
          for (let f = 0; f < e; f++) {
            let v, g = 0;
            do
              v = -(Math.random() * r), g++;
            while (g < 20 && h.some((b) => {
              const $ = Math.abs((v - b) % r + r) % r;
              return $ < p && $ > r - p;
            }));
            h.push(v);
          }
          this.randomOffsets.set(t, h), this.randomOffsetsLastUpdate.set(t, l), u = h;
        }
        return u;
      }
      case "clustered": {
        const l = Math.max(1, Math.round(n.cluster_size ?? 3)), d = n.cluster_gap ?? 2, c = a * 0.3, u = [];
        let p = 0;
        for (let h = 0; h < e; h++) {
          const f = h % l;
          h > 0 && f === 0 && (p += c * l * d), u.push(-(p % r)), p += c;
        }
        return u;
      }
      case "pulse": {
        const l = 1 / Math.max(0.01, n.pulse_frequency ?? 1), d = n.pulse_ratio ?? 0.3;
        return performance.now() / 1e3 % l < l * d ? Array.from({ length: e }, (p, h) => -(a * 0.1 * h)) : Array.from({ length: e }, (p, h) => -(a * h));
      }
      case "wave_spacing": {
        const l = n.wave_frequency ?? 1, d = n.wave_amplitude ?? 0.7;
        return Array.from({ length: e }, (c, u) => {
          const p = u / e * Math.PI * 2 * l, h = Math.sin(p) * d * (r / 2);
          return -(a * u + h);
        });
      }
      case "wave_lateral":
        return Array.from({ length: e }, (l, d) => -(a * d));
    }
  }
  /**
   * SPACING-1 wave_lateral: update perpendicular particle offsets each rAF frame.
   * For each flow using wave_lateral spacing, moves each particle's SVG transform
   * to apply a sine-wave perpendicular displacement based on the particle's current
   * progress along the path.
   */
  updateLateralWaves(t) {
    if (this.config)
      for (const e of this.config.flows) {
        if ((e.animation?.particle_spacing ?? "even") !== "wave_lateral") continue;
        const s = this.flowNodes.get(e.id);
        if (!s || s.particles.length === 0) continue;
        const n = e.animation?.wave_frequency ?? 1, o = e.animation?.wave_amplitude ?? 8, r = this.currentDurMs.get(e.id) ?? 2e3, a = s.particles.length;
        for (let l = 0; l < a; l++) {
          const d = s.particles[l];
          if (!d) continue;
          const u = ((t / r + l / a) % 1 + 1) % 1 * Math.PI * 2 * n, p = Math.sin(u) * o;
          !(d.shape.getAttribute("data-base-transform") ?? "") && d.shape.hasAttribute("transform") && d.shape.setAttribute("data-base-transform", d.shape.getAttribute("transform") ?? "");
          const f = d.shape.getAttribute("data-base-transform") ?? "";
          d.shape.setAttribute("transform", `${f} translateY(${p.toFixed(2)})`);
        }
      }
  }
  // ── animation style implementations ──────────────────────────────────────
  /**
   * dots — filled particles moving along path via animateMotion.
   * Supports: circle, square, arrow, teardrop, diamond shapes.
   * Supports: direction, flicker, glow, burst, shimmer.
   */
  applyDots(t, e, s, n, o, r, a, l) {
    const d = e.animation?.direction ?? "auto", c = this.resolveParticleCount(e, s, n, l), u = e.animation?.particle_shape ?? "circle", p = e.animation?.flicker === !0;
    if (t.particles.length !== c || t.particles[0] && this.particleKind(t.particles[0]) !== u) {
      for (const b of t.particles) b.shape.remove();
      t.particles = [];
      for (let b = 0; b < c; b++)
        t.particles.push(this.makeParticle(t, u, r, e, s));
    }
    if (d === "both") {
      if (!t.particlesBack || t.particlesBack.length !== c) {
        if (t.particlesBack) for (const b of t.particlesBack) b.shape.remove();
        t.particlesBack = [];
        for (let b = 0; b < c; b++)
          t.particlesBack.push(this.makeParticle(t, u, r, e, s));
      }
    } else if (t.particlesBack) {
      for (const b of t.particlesBack) b.shape.remove();
      t.particlesBack = void 0;
    }
    const h = `${(o / 1e3).toFixed(3)}s`, f = e.animation ?? {}, v = this.resolveParticleBegins(e.id, c, o, f), g = (b, $) => {
      for (let _ = 0; _ < b.length; _++) {
        const S = b[_];
        this.updateParticleColor(S, r, e, s, p);
        const k = document.createElementNS(A, "animateMotion");
        k.setAttribute("repeatCount", "indefinite"), k.setAttribute("dur", h), k.setAttribute("rotate", "auto"), k.setAttribute("begin", `${(v[_] ?? 0).toFixed(3)}s`), $ < 0 && (k.setAttribute("keyPoints", "1;0"), k.setAttribute("keyTimes", "0;1"));
        const I = document.createElementNS(A, "mpath");
        I.setAttributeNS(H, "href", `#${t.pathId}`), I.setAttribute("href", `#${t.pathId}`), k.appendChild(I), S.animateMotion.replaceWith(k), S.animateMotion = k, S.shape.appendChild(k);
      }
    };
    g(t.particles, a), t.particlesBack && g(t.particlesBack, -a);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(t, e, s, n, o, r) {
    for (const b of t.particles) b.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const b = document.createElementNS(A, "use");
      b.setAttributeNS(H, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), b.setAttribute("fill", "none"), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-linejoin", "round"), t.group.appendChild(b), t.lineStroke = b;
    }
    const a = this.config?.defaults?.line_width ?? Wt, d = (e.animation ?? {}).dash_gap ?? 0.5, c = Math.max(0.1, d / r), u = 14, p = u * c, h = this.glowFilter(e, this.profileFor(e), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(a * 2)), t.lineStroke.setAttribute("stroke-dasharray", `${u} ${p}`), h && t.lineStroke.setAttribute("filter", h);
    const f = u + p, v = t.lineStroke.querySelector("animate");
    v && v.remove();
    const g = document.createElementNS(A, "animate");
    g.setAttribute("attributeName", "stroke-dashoffset"), g.setAttribute("from", o > 0 ? "0" : `-${f}`), g.setAttribute("to", o > 0 ? `-${f}` : "0"), g.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), g.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(g);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(t, e, s, n, o, r, a) {
    for (const S of t.particles) S.shape.remove();
    t.particles = [], t.lineStroke?.remove(), t.lineStroke = void 0;
    const l = new Map(this.config?.nodes.map((S) => [S.id, S]) ?? []), d = l.get(e.from_node), c = l.get(e.to_node);
    if (!d || !c) return;
    const u = [d.position, ...e.waypoints, c.position], p = ri(u), h = Math.max(
      2,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Math.max(3, Math.floor(p / 15))
      )
    ), f = this.config?.defaults?.burst_max_particles ?? pt, v = Math.min(f, Math.max(2, Math.round(h * a))), g = this.containerSize(), b = e.animation?.pulse_width ?? 2, $ = $s * (e.animation?.particle_size ?? 1), _ = this.resolveGlow(e, s);
    if (!t.pulseCircles || t.pulseCircles.length !== v) {
      if (t.pulseCircles) for (const S of t.pulseCircles) S.circle.remove();
      t.pulseCircles = [];
      for (let S = 0; S < v; S++) {
        const k = document.createElementNS(A, "circle");
        k.setAttribute("r", "0"), k.setAttribute("fill", "none"), k.setAttribute("stroke", r), k.setAttribute("stroke-width", String(b)), k.setAttribute("opacity", "0"), _ && k.setAttribute("filter", this.glowFilter(e, s, r));
        const I = document.createElementNS(A, "animate");
        I.setAttribute("attributeName", "r"), I.setAttribute("values", `0;${$};0`), I.setAttribute("repeatCount", "indefinite"), k.appendChild(I);
        const E = document.createElementNS(A, "animate");
        E.setAttribute("attributeName", "opacity"), E.setAttribute("values", "0;0.9;0"), E.setAttribute("repeatCount", "indefinite"), k.appendChild(E), t.group.appendChild(k), t.pulseCircles.push({ circle: k, animateRadius: I, animateOpacity: E });
      }
    }
    for (let S = 0; S < t.pulseCircles.length; S++) {
      const k = t.pulseCircles[S], I = (S + 0.5) / t.pulseCircles.length, E = os(u, I), z = Nt(E, g);
      k.circle.setAttribute("cx", z.x.toFixed(2)), k.circle.setAttribute("cy", z.y.toFixed(2)), k.circle.setAttribute("stroke", r);
      const T = `${(o / 1e3).toFixed(3)}s`, it = `${(-o * S / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      k.animateRadius.setAttribute("values", `0;${$};0`), k.animateRadius.setAttribute("dur", T), k.animateRadius.setAttribute("begin", it), k.animateOpacity.setAttribute("dur", T), k.animateOpacity.setAttribute("begin", it);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(t, e, s, n, o, r) {
    const a = this.profileFor(e), l = e.animation?.particle_count ?? jt, d = this.config?.defaults?.burst_max_particles ?? pt, c = Math.min(d, Math.max(1, Math.round(l * r))), u = e.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++)
        t.particles.push(this.makeParticle(t, "arrow", n, e, a));
    }
    const p = `${(s / 1e3).toFixed(3)}s`, h = this.resolveParticleBegins(e.id, c, s, e.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const v = t.particles[f];
      this.updateParticleColor(v, n, e, a, u);
      const g = document.createElementNS(A, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", p), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(h[f] ?? 0).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(A, "mpath");
      b.setAttributeNS(H, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), g.appendChild(b), v.animateMotion.replaceWith(g), v.animateMotion = g, v.shape.appendChild(g);
    }
  }
  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
   */
  applyTrail(t, e, s, n, o, r) {
    const a = this.profileFor(e), l = e.animation?.particle_count ?? jt, d = this.config?.defaults?.burst_max_particles ?? pt, c = Math.min(d, Math.max(1, Math.round(l * r))), u = e.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++)
        t.particles.push(this.makeParticle(t, "teardrop", n, e, a));
    }
    const p = `${(s / 1e3).toFixed(3)}s`, h = this.resolveParticleBegins(e.id, c, s, e.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const v = t.particles[f];
      this.updateParticleColor(v, n, e, a, u);
      const g = document.createElementNS(A, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", p), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(h[f] ?? 0).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(A, "mpath");
      b.setAttributeNS(H, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), g.appendChild(b), v.animateMotion.replaceWith(g), v.animateMotion = g, v.shape.appendChild(g);
    }
  }
  /**
   * fluid — continuous gradient flowing along the line.
   * Implemented as an animated stroke-dashoffset on a wide stroke.
   */
  applyFluid(t, e, s, n, o) {
    for (const c of t.particles) c.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const c = document.createElementNS(A, "use");
      c.setAttributeNS(H, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), c.setAttribute("fill", "none"), c.setAttribute("stroke-linecap", "round"), t.group.appendChild(c), t.lineStroke = c;
    }
    const r = (this.config?.defaults?.line_width ?? Wt) * 3, a = this.glowFilter(e, this.profileFor(e), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(r)), t.lineStroke.setAttribute("stroke-dasharray", "50 200"), a && t.lineStroke.setAttribute("filter", a);
    const l = t.lineStroke.querySelector("animate");
    l && l.remove();
    const d = document.createElementNS(A, "animate");
    d.setAttribute("attributeName", "stroke-dashoffset"), d.setAttribute("from", o > 0 ? "0" : "-250"), d.setAttribute("to", o > 0 ? "-250" : "0"), d.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), d.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(d);
  }
  /**
   * spark — particles with randomised size/opacity, slight scatter.
   * Scatter is achieved via SVG transform on each particle's <g> wrapper.
   */
  applySpark(t, e, s, n, o, r, a, l) {
    const d = this.resolveParticleCount(e, s, n, l), c = Math.min(
      this.config?.defaults?.burst_max_particles ?? pt,
      Math.round(d * l)
    ), u = e.animation?.particle_shape ?? "circle", p = e.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++) {
        const v = this.makeParticle(t, u, r, e, s), g = 0.7 + Math.random() * 0.6;
        v.shape.setAttribute("transform", `scale(${g.toFixed(2)})`), t.particles.push(v);
      }
    }
    const h = `${(o / 1e3).toFixed(3)}s`;
    for (let f = 0; f < t.particles.length; f++) {
      const v = t.particles[f], g = 0.5 + Math.random() * 0.5;
      v.shape.setAttribute("opacity", String(g.toFixed(2))), this.updateParticleColor(v, r, e, s, p);
      const b = document.createElementNS(A, "animateMotion");
      b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", h), b.setAttribute("rotate", "auto"), b.setAttribute("begin", `${(-o * f / (t.particles.length * 1e3)).toFixed(3)}s`), a < 0 && (b.setAttribute("keyPoints", "1;0"), b.setAttribute("keyTimes", "0;1"));
      const $ = document.createElementNS(A, "mpath");
      $.setAttributeNS(H, "href", `#${t.pathId}`), $.setAttribute("href", `#${t.pathId}`), b.appendChild($), v.animateMotion.replaceWith(b), v.animateMotion = b, v.shape.appendChild(b);
    }
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(t) {
    const e = t.shape.tagName.toLowerCase();
    return e === "circle" ? "circle" : e === "rect" ? "square" : e === "polygon" ? t.shape.getAttribute("data-kind") ?? "arrow" : e === "ellipse" ? "teardrop" : e === "path" ? t.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  makeParticle(t, e, s, n, o) {
    const r = this.resolveParticleRadius(n), a = this.resolveGlow(n, o);
    let l, d = !1;
    switch (e) {
      case "square": {
        const p = r * 2, h = document.createElementNS(A, "rect");
        h.setAttribute("width", String(p)), h.setAttribute("height", String(p)), h.setAttribute("x", String(-p / 2)), h.setAttribute("y", String(-p / 2)), h.setAttribute("rx", "1.5"), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), l = h;
        break;
      }
      case "arrow": {
        const p = r * 2.2, h = r * 1.5, f = document.createElementNS(A, "polygon");
        f.setAttribute("points", `${p},0 ${-p * 0.4},${h} 0,0 ${-p * 0.4},${-h}`), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), f.setAttribute("data-kind", "arrow"), l = f;
        break;
      }
      case "teardrop": {
        const p = n.animation?.trail_length ?? 2, h = r, f = r * p, v = document.createElementNS(A, "ellipse");
        v.setAttribute("rx", String(h)), v.setAttribute("ry", String(f)), v.setAttribute("cy", String(-f * 0.3)), v.setAttribute("fill", s), v.setAttribute("opacity", "0"), l = v;
        break;
      }
      case "diamond": {
        const p = r * 1.4, h = document.createElementNS(A, "polygon");
        h.setAttribute("points", `0,${-p} ${p},0 0,${p} ${-p},0`), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "diamond"), l = h;
        break;
      }
      case "custom_svg": {
        const p = n.animation?.custom_svg_path ?? "";
        if (!p) {
          console.warn("[flowme] particle_shape: custom_svg requires custom_svg_path — falling back to circle");
          const f = document.createElementNS(A, "circle");
          f.setAttribute("r", String(r)), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), l = f;
          break;
        }
        const h = document.createElementNS(A, "path");
        h.setAttribute("d", p), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "custom_svg"), t.group.appendChild(h), d = !0;
        try {
          const f = h.getBBox(), v = Math.max(f.width, f.height, 1), b = r * 2 / v, $ = -(f.x + f.width / 2), _ = -(f.y + f.height / 2);
          h.setAttribute("transform", `scale(${b.toFixed(4)}) translate(${$.toFixed(4)},${_.toFixed(4)})`);
        } catch {
        }
        l = h;
        break;
      }
      default: {
        const p = document.createElementNS(A, "circle");
        p.setAttribute("r", String(r)), p.setAttribute("fill", s), p.setAttribute("opacity", "0"), l = p;
      }
    }
    a && (l.setAttribute("filter", this.glowFilter(n, o, s)), l.style.color = s);
    const c = document.createElementNS(A, "animateMotion");
    c.setAttribute("repeatCount", "indefinite"), c.setAttribute("dur", "2s");
    const u = document.createElementNS(A, "mpath");
    return u.setAttributeNS(H, "href", `#${t.pathId}`), u.setAttribute("href", `#${t.pathId}`), c.appendChild(u), l.appendChild(c), d || t.group.appendChild(l), { shape: l, animateMotion: c };
  }
  updateParticleColor(t, e, s, n, o) {
    if (t.shape.setAttribute("fill", e), t.shape.style.color = e, this.resolveGlow(s, n) && t.shape.setAttribute("filter", this.glowFilter(s, n, e)), t.shape.setAttribute("opacity", "1"), o) {
      if (!t.flickerAnim) {
        const p = document.createElementNS(A, "animate");
        p.setAttribute("attributeName", "opacity"), p.setAttribute("repeatCount", "indefinite"), t.shape.appendChild(p), t.flickerAnim = p;
      }
      const d = (1 / (2 + Math.random() * 6)).toFixed(3), c = (0.85 + Math.random() * 0.1).toFixed(2), u = (0.95 + Math.random() * 0.05).toFixed(2);
      t.flickerAnim.setAttribute("values", `${u};${c};${u}`), t.flickerAnim.setAttribute("dur", `${d}s`);
    } else t.flickerAnim && (t.flickerAnim.remove(), t.flickerAnim = void 0);
  }
  profileFor(t) {
    return G(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const e = this.profileFor(t), s = t.domain ?? this.config?.domain;
    return lt(t, e, s, 1, this.config?.domain_colors);
  }
}
const As = `/* eslint-disable no-undef */
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
`, Ee = "flowme-keyframes", Qt = "flowme-cycle", Cs = 5, Ms = 2;
let K = null, Ie = !1;
function Ps() {
  if (document.getElementById(Ee)) return;
  const i = document.createElement("style");
  i.id = Ee, i.textContent = `@keyframes ${Qt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(i);
}
function Fs() {
  if (Ie) return;
  const t = CSS.registerProperty?.bind(CSS);
  if (!t) return;
  const e = [
    ["--flowme-progress", "<number>", "0"],
    ["--flowme-count", "<number>", "3"],
    ["--flowme-radius", "<number>", "5"],
    ["--flowme-line", "<number>", "2"],
    ["--flowme-amp", "<number>", "4"],
    ["--flowme-direction", "<number>", "1"]
  ];
  for (const [s, n, o] of e)
    try {
      t({ name: s, syntax: n, inherits: !1, initialValue: o });
    } catch {
    }
  Ie = !0;
}
async function Ns() {
  if (K) return K;
  const i = CSS.paintWorklet;
  if (!i)
    return K = Promise.reject(new Error("paintWorklet not available")), K;
  const t = new Blob([As], { type: "application/javascript" }), e = URL.createObjectURL(t);
  return K = i.addModule(e).catch((s) => {
    throw K = null, s;
  }).finally(() => {
  }), K;
}
class Es {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ai(() => this.flushUpdates(), 120);
  }
  async init(t, e) {
    this.container = t, this.config = e, this.flowsById = new Map(e.flows.map((n) => [n.id, n])), Ps(), Fs(), await Ns();
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", t.appendChild(s), this.wrapper = s;
    for (const n of e.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = n.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Qt} 2s linear infinite`, o.style.opacity = "0", s.appendChild(o), this.flowDivs.set(n.id, { el: o });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(t);
  }
  updateFlow(t, e) {
    this.flowsById.has(t) && (this.latestValues.set(t, e), this.applyUpdate());
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
    const t = this.containerSize(), e = new Map(this.config.nodes.map((s) => [s.id, s]));
    for (const s of this.config.flows) {
      const n = this.flowDivs.get(s.id);
      if (!n) continue;
      const o = e.get(s.from_node), r = e.get(s.to_node);
      if (!o || !r) continue;
      const d = [o.position, ...s.waypoints, r.position].map((c) => Nt(c, t)).map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
      n.el.style.setProperty("--flowme-path", `"${d}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, e] of this.latestValues) this.applyFlow(t, e);
  }
  applyFlow(t, e) {
    const s = this.flowsById.get(t), n = this.flowDivs.get(t);
    if (!s || !n) return;
    const o = this.profileFor(s), r = de(s, o), a = Math.abs(e);
    if (!(a >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = s.speed_multiplier ?? 1, c = Math.max(50, B(a, r) * d), u = e < 0 != (s.reverse === !0) ? -1 : 1, p = s.domain ?? this.config?.domain, h = lt(s, o, p, u, this.config?.domain_colors), f = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(e) : 3)
    ), v = o.wave_amplitude_curve ? o.wave_amplitude_curve(e) : 4, g = n.el.style;
    g.setProperty("--flowme-shape", o.shape), g.setProperty("--flowme-color", h), g.setProperty("--flowme-glow", o.glow ? "1" : "0"), g.setProperty("--flowme-count", String(f)), g.setProperty("--flowme-radius", String(Cs)), g.setProperty("--flowme-line", String(Ms)), g.setProperty("--flowme-amp", String(v)), g.setProperty("--flowme-direction", String(u)), g.animation = `${Qt} ${(c / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return G(t.domain ?? this.config?.domain);
  }
}
function Is() {
  const i = Os(), t = i ?? "svg", e = zs();
  return P(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    i ?? "(none)",
    "| Houdini available:",
    e,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? e ? new Es() : (P("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Zt()) : new Zt();
}
function zs() {
  try {
    const i = CSS;
    return "paintWorklet" in i && "registerProperty" in i;
  } catch {
    return !1;
  }
}
function Os() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function ze(i) {
  const t = i.size?.width ?? 20, e = i.size?.height ?? 15;
  return `left: ${i.position.x}%; top: ${i.position.y}%; width: ${t}%; height: ${e}%;`;
}
function Ts(i, t) {
  P(
    "renderOverlayHost →",
    "id=",
    i.id,
    "position=",
    i.position,
    "size=",
    i.size,
    "visible=",
    i.visible ?? !0,
    "opacity=",
    i.opacity ?? 1
  );
  const e = i.visible !== !1, s = i.opacity ?? 1, n = [
    e ? "" : "display:none;",
    s !== 1 ? `opacity:${s};` : ""
  ].join("");
  return i._migration_warning ? m`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${i.id}
        style=${ze(i) + n}
        title=${i._migration_warning}
      >
        <div class="migration-warning-inner">
          ⚠ ${i._migration_warning}
        </div>
      </div>
    ` : m`
    <div
      class="overlay overlay-custom"
      data-overlay-id=${i.id}
      style=${ze(i) + n}
    >
      <flowme-custom-overlay
        .hass=${t}
        .card=${i.card}
      ></flowme-custom-overlay>
    </div>
    ${w}
  `;
}
let Gt = null, nt = null;
async function Ds() {
  if (Gt) return Gt;
  if (nt) return nt;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (nt = t().then((e) => (Gt = e, nt = null, e)).catch((e) => {
    throw nt = null, e;
  }), nt);
}
async function Rs(i) {
  const t = await Ds();
  return t ? t.createCardElement(i) : null;
}
var Ls = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, Ot = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Us(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && Ls(t, e, n), n;
};
let ct = class extends V {
  updated(i) {
    super.updated(i), i.has("card") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  render() {
    return this.errorMessage ? m`<div class="err" title=${this.errorMessage}>!</div>` : m`<div class="mount"></div>`;
  }
  rebuildChild() {
    const i = this.card, t = i ? JSON.stringify(i) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!i)) {
      try {
        qi(i);
      } catch (e) {
        this.errorMessage = e instanceof Error ? e.message : String(e);
        return;
      }
      this.errorMessage = void 0, Rs(i).then((e) => {
        if (!e) {
          this.errorMessage = "HA card helpers unavailable", this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== t) return;
        this.childCard = e, this.hass && (this.childCard.hass = this.hass);
        const s = this.renderRoot.querySelector(".mount");
        s && (s.innerHTML = "", s.appendChild(this.childCard));
      }).catch((e) => {
        this.errorMessage = e instanceof Error ? e.message : String(e), this.requestUpdate();
      });
    }
  }
  disposeChild() {
    this.childCard && this.childCard.parentElement && this.childCard.parentElement.removeChild(this.childCard), this.childCard = void 0;
  }
};
ct.styles = Et`
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
Ot([
  D({ attribute: !1 })
], ct.prototype, "hass", 2);
Ot([
  D({ attribute: !1 })
], ct.prototype, "card", 2);
Ot([
  M()
], ct.prototype, "errorMessage", 2);
ct = Ot([
  zt("flowme-custom-overlay")
], ct);
const Bs = 100;
class Hs {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > Bs; ) this.undoStack.shift();
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
function x(i) {
  return JSON.parse(JSON.stringify(i));
}
function N(i) {
  return i < 0 ? 0 : i > 100 ? 100 : i;
}
function $t(i, t = 8) {
  return Math.round(i / t) * t;
}
function js(i) {
  const t = new Set(i.nodes.map((e) => e.id));
  for (let e = 1; e < 1e4; e++) {
    const s = `node_${e}`;
    if (!t.has(s)) return s;
  }
  return `node_${Date.now()}`;
}
function Ws(i) {
  const t = new Set(i.flows.map((e) => e.id));
  for (let e = 1; e < 1e4; e++) {
    const s = `flow_${e}`;
    if (!t.has(s)) return s;
  }
  return `flow_${Date.now()}`;
}
function Vs(i, t, e) {
  const s = x(i);
  for (const n of s.nodes)
    n.id === t && (n.position = { x: N(e.x), y: N(e.y) });
  return s;
}
function Gs(i, t, e) {
  const s = x(i), n = {
    id: js(i),
    position: { x: N(t.x), y: N(t.y) },
    label: e
  };
  return s.nodes.push(n), { config: s, node: n };
}
function qs(i, t) {
  const e = x(i);
  return e.nodes = e.nodes.filter((s) => s.id !== t), e.flows = e.flows.filter((s) => s.from_node !== t && s.to_node !== t), e;
}
function Ks(i, t) {
  const e = x(i);
  for (const s of e.nodes) {
    const n = t.get(s.id);
    n && (s.position = { x: N(n.x), y: N(n.y) });
  }
  return e;
}
function Ys(i, t) {
  const e = x(i);
  return e.nodes = e.nodes.filter((s) => !t.has(s.id)), e.flows = e.flows.filter((s) => !t.has(s.from_node) && !t.has(s.to_node)), e;
}
function Oe(i, t, e) {
  const s = x(i);
  for (const n of s.nodes)
    t.has(n.id) && (n.visible = e);
  return s;
}
function Js(i, t, e) {
  const s = i.nodes.find((o) => o.id === e);
  if (!s) return i;
  const n = x(i);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, y: s.position.y });
  return n;
}
function Xs(i, t, e) {
  const s = i.nodes.find((o) => o.id === e);
  if (!s) return i;
  const n = x(i);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, x: s.position.x });
  return n;
}
function Zs(i, t, e, s) {
  const n = x(i);
  for (const o of n.flows)
    if (o.id === t) {
      if (e < 0 || e >= o.waypoints.length) return i;
      o.waypoints[e] = {
        x: N(s.x),
        y: N(s.y)
      };
    }
  return n;
}
function Qs(i, t, e, s) {
  const n = x(i);
  for (const o of n.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, e));
    o.waypoints.splice(r, 0, {
      x: N(s.x),
      y: N(s.y)
    });
  }
  return n;
}
function tn(i, t, e) {
  const s = x(i);
  for (const n of s.flows)
    if (n.id === t) {
      if (e < 0 || e >= n.waypoints.length) return i;
      n.waypoints.splice(e, 1);
    }
  return s;
}
function Te(i, t, e, s) {
  const n = x(i), o = {
    id: Ws(i),
    from_node: t,
    to_node: e,
    entity: s,
    waypoints: []
  };
  return n.flows.push(o), { config: n, flow: o };
}
function en(i, t) {
  const e = x(i);
  return e.flows = e.flows.filter((s) => s.id !== t), e;
}
function sn(i, t) {
  const e = x(i);
  return e.background.default = t, e;
}
function nn(i, t) {
  const e = x(i);
  return t && t.length ? e.background.weather_entity = t : delete e.background.weather_entity, e;
}
function on(i, t) {
  const e = x(i);
  return t && t.length ? e.background.sun_entity = t : delete e.background.sun_entity, e;
}
function rn(i, t) {
  const e = x(i);
  return t === void 0 || !Number.isFinite(t) ? delete e.background.transition_duration : e.background.transition_duration = Math.max(0, Math.floor(t)), e;
}
function De(i, t, e) {
  var n;
  const s = x(i);
  return (n = s.background).weather_states ?? (n.weather_states = {}), s.background.weather_states[t] = e, s;
}
function an(i, t) {
  const e = x(i);
  return e.background.weather_states && (delete e.background.weather_states[t], Object.keys(e.background.weather_states).length === 0 && delete e.background.weather_states), e;
}
function ln(i) {
  const t = new Set((i.overlays ?? []).map((e) => e.id));
  for (let e = 1; e < 1e4; e++) {
    const s = `overlay_${e}`;
    if (!t.has(s)) return s;
  }
  return `overlay_${Date.now()}`;
}
function cn(i, t) {
  const e = x(i), s = t.id ?? ln(i), n = {
    ...t,
    id: s,
    position: {
      x: N(t.position.x),
      y: N(t.position.y)
    }
  };
  return e.overlays = [...e.overlays ?? [], n], { config: e, overlay: n };
}
function dn(i, t) {
  const e = x(i);
  return e.overlays = (e.overlays ?? []).filter((s) => s.id !== t), e.overlays.length === 0 && delete e.overlays, e;
}
function un(i, t, e) {
  const s = x(i);
  for (const n of s.overlays ?? [])
    n.id === t && (n.position = { x: N(e.x), y: N(e.y) });
  return s;
}
function Re(i, t, e) {
  const s = x(i), n = Math.max(2, Math.min(100, e.width)), o = Math.max(2, Math.min(100, e.height));
  for (const r of s.overlays ?? [])
    r.id === t && (r.size = { width: n, height: o });
  return s;
}
function pn(i, t, e) {
  const s = x(i);
  for (const n of s.overlays ?? [])
    n.id === t && e && (n.card = e);
  return s;
}
function hn(i, t, e) {
  const s = x(i);
  for (const n of s.overlays ?? [])
    n.id === t && (e ? delete n.visible : n.visible = !1);
  return s;
}
function fn(i, t, e) {
  const s = x(i);
  for (const n of s.overlays ?? [])
    if (n.id === t) {
      const o = Math.max(0, Math.min(1, e));
      o === 1 ? delete n.opacity : n.opacity = o;
    }
  return s;
}
function Le(i, t, e) {
  const s = x(i);
  return s.opacity = { ...s.opacity, [t]: e }, s;
}
function gn(i, t, e) {
  const s = x(i);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 ? delete o.opacity : o.opacity = e, o;
  }), s;
}
function mn(i, t, e) {
  const s = x(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 ? delete o.opacity : o.opacity = e, o;
  }), s;
}
function bn(i, t, e) {
  const s = x(i);
  return s.defaults = { ...s.defaults, [t]: e }, s;
}
function yn(i, t, e) {
  if (t === e) return i;
  const s = x(i), n = s.background.weather_states;
  if (!n || !(t in n)) return i;
  const o = n[t];
  return o === void 0 ? i : (delete n[t], n[e] = o, s);
}
function vn(i, t, e) {
  const s = x(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 || e === "corner" ? delete o.line_style : o.line_style = e, o;
  }), s;
}
function Ue(i, t, e) {
  const s = x(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 ? delete o.color : o.color = e, o;
  }), s;
}
function wn(i, t, e) {
  const s = x(i);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e ? delete o.visible : o.visible = !1, o;
  }), s;
}
function Be(i, t, e) {
  const s = x(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e ? delete o.visible : o.visible = !1, o;
  }), s;
}
function xn(i, t, e) {
  const s = x(i);
  return s.visibility = { ...s.visibility, [t]: e }, s;
}
function He(i, t, e) {
  const s = x(i);
  return e === void 0 ? s.domain_colors && (delete s.domain_colors[t], Object.keys(s.domain_colors).length === 0 && delete s.domain_colors) : s.domain_colors = { ...s.domain_colors, [t]: e }, s;
}
function je(i, t, e) {
  const s = x(i);
  return s.flows = s.flows.map((n) => n.id !== t ? n : { ...n, speed_curve_override: { ...n.speed_curve_override, ...e } }), s;
}
function $n(i, t) {
  const e = x(i);
  return e.flows = e.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.speed_curve_override, n;
  }), e;
}
function _n(i, t, e) {
  const s = x(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n.animation, ...e };
    for (const r of Object.keys(o))
      o[r] === void 0 && delete o[r];
    if (Object.keys(o).length === 0) {
      const r = { ...n };
      return delete r.animation, r;
    }
    return { ...n, animation: o };
  }), s;
}
function kn(i, t) {
  const e = x(i);
  return e.flows = e.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.animation, n;
  }), e;
}
function We(i, t) {
  const e = x(i);
  return e.animation = { ...e.animation, ...t }, e;
}
function Sn(i, t, e) {
  const s = x(i), n = s.flows.find((o) => o.id === t);
  return n && (n.value_gradient = e), s;
}
function An(i, t, e) {
  const s = x(i), n = s.flows.find((o) => o.id === t);
  return n && (n.value_gradient = { ...n.value_gradient, ...e }), s;
}
function Cn(i, t) {
  const e = x(i), s = e.flows.find((n) => n.id === t);
  return s && delete s.value_gradient, e;
}
var Mn = Object.defineProperty, Pn = Object.getOwnPropertyDescriptor, tt = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Pn(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && Mn(t, e, n), n;
};
let L = class extends V {
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
  fire(i) {
    this.dispatchEvent(
      new CustomEvent("toolbar-action", { detail: { action: i }, bubbles: !0, composed: !0 })
    );
  }
};
L.styles = Et`
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
tt([
  D({ type: Boolean })
], L.prototype, "canUndo", 2);
tt([
  D({ type: Boolean })
], L.prototype, "canRedo", 2);
tt([
  D({ type: Boolean })
], L.prototype, "previewMode", 2);
tt([
  D({ type: Boolean })
], L.prototype, "suggestPathDisabled", 2);
tt([
  D({ type: String })
], L.prototype, "undoLabel", 2);
tt([
  D({ type: String })
], L.prototype, "redoLabel", 2);
L = tt([
  zt("flowme-editor-toolbar")
], L);
const ui = 8, Ve = 1, te = 255;
function Fn(i, t = ui) {
  const e = Math.max(1, Math.floor(t)), s = Math.max(1, Math.ceil(i.width / e)), n = Math.max(1, Math.ceil(i.height / e)), o = new Uint16Array(s * n);
  for (let r = 0; r < n; r++) {
    const a = r * e, l = Math.min(i.height, a + e);
    for (let d = 0; d < s; d++) {
      const c = d * e, u = Math.min(i.width, c + e);
      let p = 0;
      for (let f = a; f < l; f++) {
        const v = f * i.width;
        for (let g = c; g < u; g++) {
          const b = i.data[v + g] ?? 0;
          b > p && (p = b);
        }
      }
      const h = te - p;
      o[r * s + d] = h < Ve ? Ve : h;
    }
  }
  return { cols: s, rows: n, cellSize: e, data: o };
}
function Nn(i, t, e) {
  return e * i.cols + t;
}
function En(i, t, e) {
  return t < 0 || e < 0 || t >= i.cols || e >= i.rows ? te : i.data[Nn(i, t, e)] ?? te;
}
const In = 50;
class zn {
  constructor() {
    this.arr = [];
  }
  push(t) {
    this.arr.push(t), this.bubbleUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return;
    const t = this.arr[0], e = this.arr.pop();
    return this.arr.length > 0 && (this.arr[0] = e, this.sinkDown(0)), t;
  }
  get size() {
    return this.arr.length;
  }
  bubbleUp(t) {
    for (; t > 0; ) {
      const e = t - 1 >> 1;
      if ((this.arr[e]?.f ?? 0) <= (this.arr[t]?.f ?? 0)) return;
      [this.arr[e], this.arr[t]] = [this.arr[t], this.arr[e]], t = e;
    }
  }
  sinkDown(t) {
    const e = this.arr.length;
    for (; ; ) {
      const s = 2 * t + 1, n = 2 * t + 2;
      let o = t;
      if (s < e && (this.arr[s]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = s), n < e && (this.arr[n]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = n), o === t) return;
      [this.arr[o], this.arr[t]] = [this.arr[t], this.arr[o]], t = o;
    }
  }
}
function On(i, t, e) {
  const [s, n] = t, [o, r] = e;
  if (s < 0 || n < 0 || s >= i.cols || n >= i.rows || o < 0 || r < 0 || o >= i.cols || r >= i.rows) return null;
  if (s === o && n === r) return [[s, n]];
  const a = i.cols * i.rows, l = new Float32Array(a);
  l.fill(1 / 0);
  const d = new Int16Array(a), c = new Int16Array(a);
  d.fill(-1), c.fill(-1);
  const u = new Uint8Array(a), p = new Uint8Array(a), h = n * i.cols + s;
  l[h] = 0;
  const f = new zn();
  f.push({ col: s, row: n, f: Ge(s, n, o, r) });
  const v = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const g = f.pop(), { col: b, row: $ } = g, _ = $ * i.cols + b;
    if (!p[_]) {
      if (p[_] = 1, b === o && $ === r)
        return Tn(i, d, c, e);
      for (const [S, k, I] of v) {
        const E = b + S, z = $ + k;
        if (E < 0 || z < 0 || E >= i.cols || z >= i.rows) continue;
        const T = z * i.cols + E;
        if (p[T]) continue;
        const it = En(i, E, z), Tt = u[_] && u[_] !== I ? In : 0, O = (l[_] ?? 1 / 0) + it + Tt;
        if (O < (l[T] ?? 1 / 0)) {
          l[T] = O, d[T] = b, c[T] = $, u[T] = I;
          const R = O + Ge(E, z, o, r);
          f.push({ col: E, row: z, f: R });
        }
      }
    }
  }
  return null;
}
function Ge(i, t, e, s) {
  return Math.abs(i - e) + Math.abs(t - s);
}
function Tn(i, t, e, s) {
  const n = [];
  let o = s[0], r = s[1];
  for (; o !== -1 && r !== -1; ) {
    n.push([o, r]);
    const a = r * i.cols + o, l = t[a] ?? -1, d = e[a] ?? -1;
    if (l === o && d === r || (o = l, r = d, o < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
const Dn = 480, Rn = 270, Ln = 30;
function Un(i, t, e = Dn, s = Rn) {
  if (i <= 0 || t <= 0) return { width: 1, height: 1 };
  const n = Math.min(e / i, s / t, 1);
  return {
    width: Math.max(1, Math.floor(i * n)),
    height: Math.max(1, Math.floor(t * n))
  };
}
function Bn(i, t, e) {
  const s = new Uint8ClampedArray(t * e);
  for (let n = 0, o = 0; n < i.length; n += 4, o++) {
    const r = i[n] ?? 0, a = i[n + 1] ?? 0, l = i[n + 2] ?? 0;
    s[o] = 0.2126 * r + 0.7152 * a + 0.0722 * l;
  }
  return s;
}
function Hn(i, t, e) {
  const s = new Uint8ClampedArray(i.length);
  for (let o = 0; o < e; o++) {
    const r = o * t;
    for (let a = 0; a < t; a++) {
      const l = i[r + Math.max(0, a - 1)] ?? 0, d = i[r + a] ?? 0, c = i[r + Math.min(t - 1, a + 1)] ?? 0;
      s[r + a] = l + 2 * d + c >> 2;
    }
  }
  const n = new Uint8ClampedArray(i.length);
  for (let o = 0; o < e; o++) {
    const r = o * t, a = Math.max(0, o - 1) * t, l = Math.min(e - 1, o + 1) * t;
    for (let d = 0; d < t; d++) {
      const c = s[a + d] ?? 0, u = s[r + d] ?? 0, p = s[l + d] ?? 0;
      n[r + d] = c + 2 * u + p >> 2;
    }
  }
  return n;
}
function jn(i, t, e) {
  const s = new Uint8ClampedArray(t * e);
  for (let n = 1; n < e - 1; n++) {
    const o = (n - 1) * t, r = n * t, a = (n + 1) * t;
    for (let l = 1; l < t - 1; l++) {
      const d = i[o + (l - 1)] ?? 0, c = i[o + l] ?? 0, u = i[o + (l + 1)] ?? 0, p = i[r + (l - 1)] ?? 0, h = i[r + (l + 1)] ?? 0, f = i[a + (l - 1)] ?? 0, v = i[a + l] ?? 0, g = i[a + (l + 1)] ?? 0, b = -d - 2 * p - f + u + 2 * h + g, $ = -d - 2 * c - u + f + 2 * v + g;
      let _ = Math.sqrt(b * b + $ * $);
      _ < Ln && (_ = 0), _ > 255 && (_ = 255), s[r + l] = _;
    }
  }
  return { width: t, height: e, data: s };
}
function Wn(i, t, e) {
  const s = Un(t, e), n = document.createElement("canvas");
  n.width = s.width, n.height = s.height;
  const o = n.getContext("2d", { willReadFrequently: !0 });
  if (!o) throw new Error("2D canvas unavailable");
  o.drawImage(i, 0, 0, s.width, s.height);
  try {
    const r = o.getImageData(0, 0, s.width, s.height);
    return { width: s.width, height: s.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function Vn(i, t, e) {
  const { width: s, height: n, rgba: o } = Wn(i, t, e), r = Bn(o, s, n), a = Hn(r, s, n);
  return jn(a, s, n);
}
function Gn(i) {
  if (i.length <= 2) return [...i];
  const t = [i[0]];
  for (let e = 1; e < i.length - 1; e++) {
    const s = i[e - 1], n = i[e], o = i[e + 1], r = n[0] - s[0], a = n[1] - s[1], l = o[0] - n[0], d = o[1] - n[1];
    r * d - a * l === 0 && Math.sign(r) === Math.sign(l) && Math.sign(a) === Math.sign(d) || t.push(n);
  }
  return t.push(i[i.length - 1]), t;
}
const At = /* @__PURE__ */ new Map();
async function qn(i, t = {}) {
  const e = performance.now(), s = t.cellSize ?? ui, n = `${i.imageUrl}|${s}`, o = At.has(n);
  let r = null;
  try {
    r = await Kn(n, i.imageUrl, s);
  } catch {
    r = null;
  }
  if (!r)
    return {
      waypoints: [],
      cached: !1,
      edgesUsable: !1,
      elapsedMs: performance.now() - e
    };
  const a = Ke(i.from, r), l = Ke(i.to, r), d = On(r, a, l);
  return !d || d.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - e
  } : {
    waypoints: Gn(d).slice(1, -1).map((h) => Xn(h, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - e
  };
}
function Kn(i, t, e) {
  const s = At.get(i);
  if (s) return s;
  const n = Yn(t, e).catch((o) => {
    throw At.delete(i), o;
  });
  return At.set(i, n), n;
}
async function Yn(i, t) {
  const e = await Jn(i);
  await qe();
  const s = Vn(e, e.naturalWidth, e.naturalHeight);
  return await qe(), Fn(s, t);
}
function Jn(i) {
  return new Promise((t, e) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.decoding = "async", s.onload = () => t(s), s.onerror = () => e(new Error(`Failed to load background image: ${i}`)), s.src = i;
  });
}
function qe() {
  return new Promise((i) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(i, 0)) : setTimeout(i, 0);
  });
}
function Ke(i, t) {
  const e = Ye(Math.floor(i.x / 100 * t.cols), 0, t.cols - 1), s = Ye(Math.floor(i.y / 100 * t.rows), 0, t.rows - 1);
  return [e, s];
}
function Xn(i, t) {
  return {
    x: (i[0] + 0.5) / t.cols * 100,
    y: (i[1] + 0.5) / t.rows * 100
  };
}
function Ye(i, t, e) {
  return i < t ? t : i > e ? e : i;
}
var Zn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, F = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Qn(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && Zn(t, e, n), n;
};
let C = class extends V {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.rubberBand = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = si(), this.undoStack = new Hs((i) => this.applyConfig(
      i,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.rubberBandJustSelected = !1, this.onDefaultBgChange = (i) => {
      if (!this.config) return;
      const t = i.target.value, e = this.config, s = sn(e, t);
      this.pushPatch(e, s, "edit default background");
    }, this.onWeatherStateRemove = (i) => {
      if (!this.config) return;
      const t = this.config, e = an(t, i);
      this.pushPatch(t, e, `remove weather state ${i}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const i = new Set(Object.keys(this.config.background.weather_states ?? {})), t = C.KNOWN_WEATHER_STATES.find((n) => !i.has(n)) ?? "custom", e = this.config, s = De(e, t, "");
      this.pushPatch(e, s, `add weather state ${t}`);
    }, this.onToolbarAction = (i) => {
      switch (i.detail.action) {
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
    }, this.onStageClick = (i) => {
      if (!(!this.config || i.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const e = this.pointerToPercent(i);
          if (!e) return;
          const s = this.config, { config: n, node: o } = Gs(s, e, "New node");
          this.pushPatch(s, n, `add node ${o.id}`), this.pending = null, this.statusMessage = `Added node ${o.id}.`;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const e = this.pointerToPercent(i);
          if (!e) return;
          const s = {
            type: "custom",
            position: e,
            size: { width: 20, height: 15 },
            card: { type: "entity", entity: "sensor.example_sensor" }
          }, n = this.config, { config: o, overlay: r } = cn(n, s);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(n, o, `add overlay ${r.id}`), this.pending = null, this.statusMessage = `Added overlay ${r.id}. Drag to reposition, corner to resize.`;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step === "pick-from" && (this.statusMessage = "Click the source node handle.");
          return;
        }
        if (this.rubberBandJustSelected) {
          this.rubberBandJustSelected = !1;
          return;
        }
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "";
      }
    }, this.onStageContextMenu = (i) => {
      this.pending && (i.preventDefault(), this.pending = null, this.statusMessage = "Cancelled.");
    }, this.stageRubberBandPointerId = null, this.onStagePointerDown = (i) => {
      const t = i.target;
      if (!(t.classList.contains("stage") || t.classList.contains("background") || t.classList.contains("connectors")) || this.previewMode || this.pending || i.button !== 0) return;
      const s = this.pointerToPercent(i);
      s && (i.currentTarget.setPointerCapture(i.pointerId), this.stageRubberBandPointerId = i.pointerId, this.dragTarget = {
        kind: "rubber-band",
        startPx: { x: i.clientX, y: i.clientY },
        startPct: s
      }, this.rubberBand = { x1: s.x, y1: s.y, x2: s.x, y2: s.y });
    }, this.onStagePointerMove = (i) => {
      if (this.stageRubberBandPointerId !== i.pointerId || this.dragTarget?.kind !== "rubber-band") return;
      const t = this.pointerToPercent(i);
      if (!t) return;
      const e = this.dragTarget.startPct;
      this.rubberBand = { x1: e.x, y1: e.y, x2: t.x, y2: t.y };
    }, this.onStagePointerUp = (i) => {
      if (this.stageRubberBandPointerId !== i.pointerId || this.dragTarget?.kind !== "rubber-band") {
        this.stageRubberBandPointerId = null;
        return;
      }
      this.stageRubberBandPointerId = null;
      const t = this.rubberBand;
      if (this.rubberBand = null, this.dragTarget = null, !t || !this.config) return;
      const e = Math.min(t.x1, t.x2), s = Math.max(t.x1, t.x2), n = Math.min(t.y1, t.y2), o = Math.max(t.y1, t.y2);
      if (s - e < 2 && o - n < 2) return;
      const r = /* @__PURE__ */ new Set();
      for (const a of this.config.nodes) {
        const { x: l, y: d } = a.position;
        l >= e && l <= s && d >= n && d <= o && r.add(a.id);
      }
      r.size > 0 && (this.selectedNodeIds = r, this.selectedNodeId = r.size === 1 ? Array.from(r)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null, this.rubberBandJustSelected = !0, r.size === 2 ? this.statusMessage = `${r.size} nodes selected — click "Suggest path" to auto-route.` : this.statusMessage = `${r.size} node(s) selected via rubber-band.`);
    }, this.onSegmentClick = (i) => {
      if (i.stopPropagation(), !this.config) return;
      const t = i.currentTarget, e = t.dataset.flowId, s = Number(t.dataset.segmentIndex);
      if (!(!e || !Number.isFinite(s))) {
        if (i.shiftKey) {
          const n = this.pointerToPercent(i);
          if (!n) return;
          const o = this.config, r = Qs(o, e, s, n);
          this.pushPatch(o, r, `add waypoint to ${e}`);
          return;
        }
        this.selectedFlowId = e, this.selectedNodeId = null, this.selectedOverlayId = null;
      }
    }, this.onNodeClick = (i) => {
      if (i.stopPropagation(), !this.config) return;
      const e = i.currentTarget.dataset.nodeId;
      if (e && this.pending?.kind === "add-flow") {
        if (this.pending.step === "pick-from") {
          this.pending = { kind: "add-flow", step: "pick-to", fromId: e }, this.statusMessage = "Click the destination node.";
          return;
        }
        if (this.pending.step === "pick-to" && this.pending.fromId !== e) {
          const s = window.prompt(
            "Entity for this flow (e.g. sensor.grid_power):",
            "sensor.placeholder_entity"
          ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Te(n, this.pending.fromId, e, s);
          this.pushPatch(n, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
          return;
        }
        this.statusMessage = "Destination must differ from source.";
      }
    }, this.onOverlayClick = (i) => {
      i.stopPropagation();
      const e = i.currentTarget.dataset.overlayId;
      e && (this.selectedOverlayId = e, this.selectedNodeId = null, this.selectedFlowId = null, this.customConfigDraft = "", this.customConfigError = "");
    }, this.onOverlayContextMenu = (i) => {
      i.preventDefault(), i.stopPropagation();
      const e = i.currentTarget.dataset.overlayId;
      e && window.confirm(`Delete overlay ${e}?`) && this.removeOverlay(e);
    }, this.onOverlayResizePointerDown = (i) => {
      if (this.previewMode || !this.config) return;
      i.stopPropagation(), i.preventDefault();
      const t = i.currentTarget, e = t.dataset.overlayId;
      if (!e) return;
      const s = (this.config.overlays ?? []).find((o) => o.id === e);
      if (!s) return;
      const n = { ...s.size ?? { width: 20, height: 15 } };
      t.setPointerCapture(i.pointerId), this.dragPointerId = i.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: e,
        startSize: n,
        startPx: { x: i.clientX, y: i.clientY }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (i) => {
      i.preventDefault(), i.stopPropagation();
      const e = i.currentTarget.dataset.nodeId;
      e && window.confirm(`Delete node ${e}? This also removes any flows using it.`) && this.removeNode(e);
    }, this.onWaypointContextMenu = (i) => {
      if (i.preventDefault(), i.stopPropagation(), !this.config) return;
      const t = i.currentTarget, e = t.dataset.flowId, s = Number(t.dataset.waypointIndex);
      if (!e || !Number.isFinite(s)) return;
      const n = this.config, o = tn(n, e, s);
      this.pushPatch(n, o, `delete waypoint ${s} of ${e}`);
    }, this.stopClick = (i) => {
      i.stopPropagation();
    }, this.onHandlePointerDown = (i) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = i.currentTarget, e = t.dataset.waypointIndex, s = t.dataset.flowId, n = t.dataset.nodeId, o = t.dataset.overlayId;
      let r = null;
      if (n)
        if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(n)) {
          const a = /* @__PURE__ */ new Map();
          for (const l of this.config.nodes)
            this.selectedNodeIds.has(l.id) && a.set(l.id, { ...l.position });
          r = {
            kind: "node-bulk",
            ids: Array.from(this.selectedNodeIds),
            startPositions: a,
            startPx: { x: i.clientX, y: i.clientY }
          };
        } else
          r = { kind: "node", id: n };
      else o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : s && e !== void 0 && (r = { kind: "waypoint", flowId: s, index: Number(e) });
      r && (t.setPointerCapture(i.pointerId), this.dragPointerId = i.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragStartPx = { x: i.clientX, y: i.clientY }, this.dragMoved = !1, this.dragShiftHeld = i.shiftKey);
    }, this.onHandlePointerMove = (i) => {
      if (this.dragPointerId !== i.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = i.shiftKey, !this.dragMoved && this.dragStartPx) {
        const n = i.clientX - this.dragStartPx.x, o = i.clientY - this.dragStartPx.y;
        (Math.abs(n) > 4 || Math.abs(o) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      if (t.kind === "overlay-resize") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (i.clientX - t.startPx.x) / o.width * 100, a = (i.clientY - t.startPx.y) / o.height * 100;
        let l = t.startSize.width + r, d = t.startSize.height + a;
        this.dragShiftHeld && (l = Math.round(l), d = Math.round(d)), this.config = Re(this.config, t.id, { width: l, height: d });
        return;
      }
      const e = this.pointerToPercent(i);
      if (!e) return;
      const s = this.dragShiftHeld ? { x: N($t(e.x)), y: N($t(e.y)) } : e;
      if (t.kind === "node")
        this.config = Vs(this.config, t.id, s);
      else if (t.kind === "node-bulk") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (i.clientX - t.startPx.x) / o.width * 100, a = (i.clientY - t.startPx.y) / o.height * 100, l = /* @__PURE__ */ new Map();
        for (const [d, c] of t.startPositions) {
          const u = this.dragShiftHeld ? $t(c.x + r) : c.x + r, p = this.dragShiftHeld ? $t(c.y + a) : c.y + a;
          l.set(d, { x: u, y: p });
        }
        this.config = Ks(this.config, l);
      } else t.kind === "overlay" ? this.config = un(this.config, t.id, s) : t.kind === "waypoint" && (this.config = Zs(this.config, t.flowId, t.index, s));
    }, this.onHandlePointerUp = (i) => {
      if (this.dragPointerId !== i.pointerId) return;
      const t = i.currentTarget;
      t.hasPointerCapture(i.pointerId) && t.releasePointerCapture(i.pointerId);
      const e = this.dragStartConfig, s = this.config, n = this.dragTarget, o = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !n) return;
      if (!o && n.kind === "node") {
        const a = n.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (i.shiftKey) {
          const l = new Set(this.selectedNodeIds);
          l.has(a) ? l.delete(a) : l.add(a), this.selectedNodeIds = l, this.selectedNodeId = l.size === 1 ? Array.from(l)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null, l.size === 2 ? this.statusMessage = 'Two nodes selected — click "Suggest path" to auto-route, or use the toolbar actions.' : l.size > 0 ? this.statusMessage = `${l.size} node(s) selected. Shift+click to add/remove. Escape to clear.` : this.statusMessage = "";
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([a]), this.selectedNodeId = a, this.selectedFlowId = null, this.selectedOverlayId = null, this.statusMessage = "";
        return;
      }
      if (!o || !e || !s || e === s) return;
      let r;
      switch (n.kind) {
        case "node":
          r = `move node ${n.id}`;
          break;
        case "node-bulk":
          r = `move ${n.ids.length} nodes`;
          break;
        case "overlay":
          r = `move overlay ${n.id}`;
          break;
        case "overlay-resize":
          r = `resize overlay ${n.id}`;
          break;
        default:
          r = n.kind === "waypoint" ? `move waypoint ${n.index} of ${n.flowId}` : "canvas drag";
      }
      this.pushPatch(e, s, r);
    }, this.onKeyDown = (i) => {
      if (i.key === "Escape") {
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.rubberBand = null, this.statusMessage = "";
        return;
      }
      if (!(i.metaKey || i.ctrlKey)) return;
      const e = i.key.toLowerCase();
      e === "z" && !i.shiftKey ? (i.preventDefault(), this.undoStack.undo()) : (e === "z" && i.shiftKey || e === "y") && (i.preventDefault(), this.undoStack.redo());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState()), window.addEventListener("keydown", this.onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown);
  }
  setConfig(i) {
    try {
      this.config = kt(i), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return m`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? m`<pre class="error">${this.errorMessage}</pre>` : w}
        </div>
      `;
    const t = `${1 / (St(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, e = this.config.background.default;
    return m`
      <div class="wrap">
        <flowme-editor-toolbar
          .canUndo=${this.canUndo}
          .canRedo=${this.canRedo}
          .previewMode=${this.previewMode}
          .undoLabel=${this.undoLabel}
          .redoLabel=${this.redoLabel}
          .suggestPathDisabled=${this.selectedNodeIds.size !== 2 || this.suggestBusy}
          @toolbar-action=${this.onToolbarAction}
        ></flowme-editor-toolbar>
        ${this.statusMessage ? m`<div class="status">${this.statusMessage}</div>` : w}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          @pointerdown=${this.onStagePointerDown}
          @pointermove=${this.onStagePointerMove}
          @pointerup=${this.onStagePointerUp}
          @pointercancel=${this.onStagePointerUp}
          ${ni(this.stageRef)}
        >
          <div
            class="background"
            style=${e ? `background-image: url('${e}');` : ""}
          ></div>
          <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.config.flows.map((s) => this.renderFlowConnector(s))}
          </svg>
          ${this.config.flows.map((s) => this.renderWaypointHandles(s))}
          ${(this.config.overlays ?? []).map((s) => this.renderOverlayHandle(s))}
          ${this.config.nodes.map((s) => this.renderHandle(s))}
          ${this.renderSuggestPreview()}
          ${this.renderRubberBand()}
        </div>
        ${this.renderSuggestBar()}
        ${this.renderMultiSelectToolbar()}
        ${this.renderInspector()}
        ${this.renderFlowsListPanel()}
        ${this.renderWeatherPanel()}
        ${this.renderGlobalAnimationPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
        ${this.errorMessage ? m`<pre class="error">${this.errorMessage}</pre>` : w}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(i) {
    if (!this.config) return w;
    const t = new Map(this.config.nodes.map((a) => [a.id, a])), e = t.get(i.from_node), s = t.get(i.to_node);
    if (!e || !s) return w;
    const n = [e.position, ...i.waypoints, s.position], o = i.id === this.selectedFlowId, r = [];
    for (let a = 0; a < n.length - 1; a++) {
      const l = n[a], d = n[a + 1];
      !l || !d || r.push(m`
        <!-- Invisible wide hit-area (20px) so the line is easy to click -->
        <line
          class="segment-hit"
          x1=${l.x}
          y1=${l.y}
          x2=${d.x}
          y2=${d.y}
          data-flow-id=${i.id}
          data-segment-index=${a}
          @click=${this.onSegmentClick}
        />
        <!-- Visible line with selected highlight -->
        <line
          class=${`segment ${o ? "selected" : ""}`}
          x1=${l.x}
          y1=${l.y}
          x2=${d.x}
          y2=${d.y}
          data-flow-id=${i.id}
          data-segment-index=${a}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return m`<g>${r}</g>`;
  }
  renderWaypointHandles(i) {
    return i.waypoints.map(
      (t, e) => m`
        <div
          class="waypoint"
          data-flow-id=${i.id}
          data-waypoint-index=${e}
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
  renderOverlayHandle(i) {
    const t = i.id === this.selectedOverlayId, e = i.size?.width ?? 14, s = i.size?.height ?? 8;
    return m`
      <div
        class=${`overlay-handle ${t ? "selected" : ""} overlay-${i.type}`}
        data-overlay-id=${i.id}
        style=${`left: ${i.position.x}%; top: ${i.position.y}%; width: ${e}%; height: ${s}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip">
          ${i.id}
          <span class="overlay-type-badge">${i.type}</span>
        </div>
        ${t ? m`<div
              class="overlay-resize"
              data-overlay-id=${i.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : w}
      </div>
    `;
  }
  renderHandle(i) {
    const t = this.selectedNodeIds.has(i.id), e = t && this.selectedNodeIds.size === 1, s = t && this.selectedNodeIds.size > 1, n = t ? Array.from(this.selectedNodeIds).indexOf(i.id) : -1, o = i.visible === !1;
    return m`
      <div
        class=${`handle ${e ? "selected" : ""} ${s ? "multi-selected" : ""} ${t ? "in-selection" : ""} ${o ? "handle-hidden" : ""}`}
        data-node-id=${i.id}
        style=${`left: ${i.position.x}%; top: ${i.position.y}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span class="handle-dot"></span>
        ${i.label ? m`<span class="handle-label">${i.label}</span>` : w}
        ${t && this.selectedNodeIds.size >= 2 ? m`<span class="suggest-badge">${n + 1}</span>` : w}
        <button
          class="eye-toggle"
          title=${o ? "Show node" : "Hide node"}
          @click=${(r) => {
      if (r.stopPropagation(), !this.config) return;
      const a = this.config, l = wn(a, i.id, o);
      this.pushPatch(a, l, `${o ? "show" : "hide"} node ${i.id}`);
    }}
        >${o ? "◉" : "◎"}</button>
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
  renderEntityPicker(i, t, e) {
    const s = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), n = e?.includeDomains ?? [], o = e?.placeholder ?? "entity.id";
    if (s) {
      const c = (u) => {
        u.stopPropagation(), t((u.detail?.value ?? "").trim());
      };
      return m`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${i}
          .includeDomains=${n}
          @value-changed=${c}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, a = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, l = Object.keys(r).filter((c) => {
      if (n.length === 0) return !0;
      const u = c.split(".")[0];
      return !!u && n.includes(u);
    }).sort();
    return m`
      <input
        type="text"
        list=${a}
        placeholder=${o}
        .value=${i}
        @change=${(c) => {
      t(c.target.value.trim());
    }}
      />
      <datalist id=${a}>
        ${l.map((c) => m`<option value=${c}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return w;
    if (this.selectedNodeId) {
      const i = this.config.nodes.find((t) => t.id === this.selectedNodeId);
      return i ? m`
        <div class="inspector">
          <h4>Node: ${i.id}</h4>
          <label>
            Label
            <input
              type="text"
              .value=${i.label ?? ""}
              @change=${(t) => this.onNodeLabelChange(i.id, t)}
            />
          </label>
          <label>
            Entity
            ${this.renderEntityPicker(
        i.entity ?? "",
        (t) => this.setNodeEntity(i.id, t),
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
                .value=${String(i.opacity ?? 1)}
                @change=${(t) => {
        if (!this.config) return;
        const e = parseFloat(t.target.value);
        if (!Number.isFinite(e)) return;
        const s = this.config, n = gn(s, i.id, e < 1 || e > 0 ? e : void 0);
        this.pushPatch(s, n, `set opacity of ${i.id}`);
      }}
              />
              <span>${(i.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <button class="danger" @click=${() => this.removeNode(i.id)}>Delete node</button>
        </div>
      ` : w;
    }
    if (this.selectedFlowId) {
      const i = this.config.flows.find((t) => t.id === this.selectedFlowId);
      return i ? m`
        <div class="inspector">
          <h4>Flow: ${i.id}</h4>
          <div class="row">
            <span>${i.from_node} → ${i.to_node}</span>
          </div>
          <label>
            Entity
            ${this.renderEntityPicker(
        i.entity,
        (t) => this.setFlowEntity(i.id, t),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
          </label>
          <div class="row">
            <span>${i.waypoints.length} waypoint(s)</span>
          </div>
          <label>
            Line style
            <select
              .value=${i.line_style ?? "corner"}
              @change=${(t) => {
        if (!this.config) return;
        const e = t.target.value, s = this.config, n = vn(s, i.id, e);
        this.pushPatch(s, n, `set line style of ${i.id}`);
      }}
            >
              ${qt.map(
        (t) => m`<option value=${t} ?selected=${(i.line_style ?? "corner") === t}>${t}</option>`
      )}
            </select>
          </label>
          <label>
            Colour override
            <div class="color-row">
              ${(() => {
        const t = G(i.domain ?? this.config.domain), e = lt(i, t, i.domain ?? this.config.domain, 1, this.config.domain_colors);
        return m`
                  <input
                    type="color"
                    .value=${i.color ?? e}
                    @change=${(s) => {
          if (!this.config) return;
          const n = s.target.value, o = this.config, r = Ue(o, i.id, n);
          this.pushPatch(o, r, `set colour of ${i.id}`);
        }}
                  />
                  <span class="color-effective">${i.color ? "override" : "domain default"}</span>
                  ${i.color ? m`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, n = Ue(s, i.id, void 0);
          this.pushPatch(s, n, `clear colour of ${i.id}`);
        }}>Clear</button>` : w}
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
                .value=${String(i.opacity ?? 1)}
                @change=${(t) => {
        if (!this.config) return;
        const e = parseFloat(t.target.value);
        if (!Number.isFinite(e)) return;
        const s = this.config, n = mn(s, i.id, e);
        this.pushPatch(s, n, `set opacity of ${i.id}`);
      }}
              />
              <span>${(i.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            Visible
            <div class="row">
              <input
                type="checkbox"
                .checked=${i.visible !== !1}
                @change=${(t) => {
        if (!this.config) return;
        const e = t.target.checked, s = this.config, n = Be(s, i.id, e);
        this.pushPatch(s, n, `${e ? "show" : "hide"} flow ${i.id}`);
      }}
              />
              <span>${i.visible !== !1 ? "shown" : "hidden"}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(i)}
          ${this.renderAnimationSection(i)}
          ${this.renderValueGradientSection(i)}
          <button class="danger" @click=${() => this.removeFlow(i.id)}>Delete flow</button>
        </div>
      ` : w;
    }
    if (this.selectedOverlayId) {
      const i = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return i ? this.renderOverlayInspector(i) : w;
    }
    return w;
  }
  renderSpeedCurveSection(i) {
    if (!this.config) return m``;
    const t = G(i.domain ?? this.config.domain), e = de(i, t), s = i.speed_curve_override ?? {}, n = (a, l, d) => m`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${l}${d ? m` <small>(${d})</small>` : w}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof e[a] == "number" ? e[a].toFixed(0) : ""}
          .value=${s[a] !== void 0 ? String(s[a]) : ""}
          @change=${(c) => {
      if (!this.config) return;
      const u = c.target.value.trim();
      if (u === "") {
        const p = {};
        for (const v of Object.keys(s))
          v !== a && (p[v] = s[v]);
        const h = this.config, f = je(h, i.id, p);
        this.pushPatch(h, f, `update speed curve ${a} for ${i.id}`);
      } else {
        const p = parseFloat(u);
        if (!Number.isFinite(p)) return;
        const h = this.config, f = je(h, i.id, { ...s, [a]: p });
        this.pushPatch(h, f, `update speed curve ${a} for ${i.id}`);
      }
    }}
        />
      </div>
    `, r = [e.threshold, e.p50, e.peak].map((a) => `${(B(a, e) / 1e3).toFixed(1)}s`);
    return m`
      <details class="speed-curve-details">
        <summary>Speed curve override</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            Leave blank to use domain profile defaults.
            Domain: <strong>${t.unit_label}</strong> (${i.domain ?? this.config.domain})
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
      const a = this.config, l = $n(a, i.id);
      this.pushPatch(a, l, `reset speed curve for ${i.id}`);
    }}>Reset to domain defaults</button>` : w}
        </div>
      </details>
    `;
  }
  renderAnimationSection(i) {
    if (!this.config) return m``;
    const t = i.animation ?? {}, e = t.animation_style ?? "dots", s = (c) => {
      if (!this.config) return;
      const u = this.config, p = _n(u, i.id, c);
      this.pushPatch(u, p, `update animation for ${i.id}`);
    }, o = !(/* @__PURE__ */ new Set(["dash", "pulse", "fluid", "none"])).has(e), r = e === "pulse", a = e === "trail", l = e === "dash", d = i.color ?? "#4ADE80";
    return m`
      <details class="anim-details">
        <summary>Animation</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(e, t, d)}
            </svg>
          </div>

          <label>Style
            <select
              .value=${e}
              @change=${(c) => {
      s({ animation_style: c.target.value });
    }}
            >
              ${Kt.map(
      (c) => m`<option value=${c} ?selected=${e === c}>${c}</option>`
    )}
            </select>
          </label>

          ${o ? m`
            <label>Particle shape
              <select
                .value=${t.particle_shape ?? "circle"}
                @change=${(c) => {
      s({ particle_shape: c.target.value });
    }}
              >
                ${Yt.map(
      (c) => m`<option value=${c} ?selected=${(t.particle_shape ?? "circle") === c}>${c}</option>`
    )}
              </select>
            </label>
            ${(t.particle_shape ?? "circle") === "custom_svg" ? m`
              <label>SVG path (d= attribute)
                <input type="text"
                  placeholder="M 0 -8 L 5 8 L -5 8 Z"
                  .value=${t.custom_svg_path ?? ""}
                  @change=${(c) => {
      s({ custom_svg_path: c.target.value.trim() });
    }}
                />
                <svg class="custom-svg-preview" viewBox="-20 -20 40 40" width="40" height="40"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d=${t.custom_svg_path || "M 0 -8 L 5 8 L -5 8 Z"}
                        fill=${d} />
                </svg>
              </label>
            ` : w}
          ` : w}

          <label>Direction
            <select
              .value=${t.direction ?? "auto"}
              @change=${(c) => {
      s({ direction: c.target.value });
    }}
            >
              ${Jt.map(
      (c) => m`<option value=${c} ?selected=${(t.direction ?? "auto") === c}>${c}</option>`
    )}
            </select>
          </label>

          <label>Particle size
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(t.particle_size ?? 1)}
                @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && s({ particle_size: u });
    }}
              />
              <span>${(t.particle_size ?? 1).toFixed(1)}×</span>
            </div>
          </label>

          <label>Particle count
            <input type="number" min="1" max="20" step="1"
              placeholder="profile default"
              .value=${t.particle_count !== void 0 ? String(t.particle_count) : ""}
              @change=${(c) => {
      const u = c.target.value.trim();
      if (u === "") {
        s({ particle_count: void 0 });
        return;
      }
      const p = parseInt(u, 10);
      Number.isFinite(p) && p >= 1 && s({ particle_count: p });
    }}
            />
          </label>

          <label>Particle spacing
            <select
              .value=${t.particle_spacing ?? "even"}
              @change=${(c) => {
      s({ particle_spacing: c.target.value });
    }}
            >
              ${Xt.map(
      (c) => m`<option value=${c} ?selected=${(t.particle_spacing ?? "even") === c}>${c}</option>`
    )}
            </select>
          </label>

          ${t.particle_spacing === "clustered" ? m`
            <label>Cluster size
              <input type="number" min="1" max="10" step="1"
                .value=${String(t.cluster_size ?? 3)}
                @change=${(c) => {
      const u = parseInt(c.target.value, 10);
      Number.isFinite(u) && u >= 1 && s({ cluster_size: u });
    }}
              />
            </label>
            <label>Cluster gap (×)
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(t.cluster_gap ?? 2)}
                @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && u > 0 && s({ cluster_gap: u });
    }}
              />
            </label>
          ` : w}

          ${t.particle_spacing === "pulse" ? m`
            <label>Pulse frequency (Hz)
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.pulse_frequency ?? 1)}
                @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && u > 0 && s({ pulse_frequency: u });
    }}
              />
            </label>
            <label>Pulse ratio
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(t.pulse_ratio ?? 0.3)}
                  @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && s({ pulse_ratio: u });
    }}
                />
                <span>${(t.pulse_ratio ?? 0.3).toFixed(2)}</span>
              </div>
            </label>
          ` : w}

          ${t.particle_spacing === "wave_spacing" || t.particle_spacing === "wave_lateral" ? m`
            <label>Wave frequency
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.wave_frequency ?? 1)}
                @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && u > 0 && s({ wave_frequency: u });
    }}
              />
            </label>
            <label>${t.particle_spacing === "wave_lateral" ? "Wave amplitude (px)" : "Wave amplitude (0–1)"}
              <input type="number"
                min=${t.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                max=${t.particle_spacing === "wave_lateral" ? "40" : "1"}
                step=${t.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                .value=${String(t.wave_amplitude ?? (t.particle_spacing === "wave_lateral" ? 8 : 0.7))}
                @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && u > 0 && s({ wave_amplitude: u });
    }}
              />
            </label>
          ` : w}

          <label>Glow intensity
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(t.glow_intensity ?? 1)}
                @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && s({ glow_intensity: u });
    }}
              />
              <span>${(t.glow_intensity ?? 1).toFixed(1)}</span>
            </div>
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${t.shimmer === !0}
              @change=${(c) => s({ shimmer: c.target.checked })}
            />
            Shimmer at threshold
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${t.flicker === !0}
              @change=${(c) => s({ flicker: c.target.checked })}
            />
            Flicker (random opacity variation)
          </label>

          ${r ? m`
            <label>Pulse width (px)
              <input type="number" min="1" max="20" step="0.5"
                .value=${String(t.pulse_width ?? 2)}
                @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && s({ pulse_width: u });
    }}
              />
            </label>
          ` : w}

          ${a ? m`
            <label>Trail length
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(t.trail_length ?? 2)}
                  @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && s({ trail_length: u });
    }}
                />
                <span>${(t.trail_length ?? 2).toFixed(2)}×</span>
              </div>
            </label>
          ` : w}

          ${l ? m`
            <label>Dash gap ratio
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(t.dash_gap ?? 0.5)}
                  @change=${(c) => {
      const u = parseFloat(c.target.value);
      Number.isFinite(u) && s({ dash_gap: u });
    }}
                />
                <span>${(t.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : w}

          ${i.animation && Object.keys(i.animation).length > 0 ? m`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const c = this.config, u = kn(c, i.id);
      this.pushPatch(c, u, `reset animation for ${i.id}`);
    }}>Reset to defaults</button>` : w}
        </div>
      </details>
    `;
  }
  /**
   * Render a small inline SVG preview strip showing the current animation style.
   * Uses CSS animations (not SVG animateMotion) so it works even with no live data.
   */
  renderAnimPreview(i, t, e) {
    const s = 4 * (t.particle_size ?? 1), n = Math.min(t.particle_count ?? 3, 8);
    if (i === "none")
      return m`<line x1="10" y1="20" x2="190" y2="20" stroke=${e} stroke-width="2" stroke-opacity="0.3"/>`;
    if (i === "dash") {
      const r = t.dash_gap ?? 0.5, a = 14, l = a * r;
      return m`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${e} stroke-width="3"
          stroke-dasharray="${a} ${l}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${a + l}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (i === "fluid")
      return m`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${e} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (i === "pulse")
      return m`
        ${[40, 90, 140].map(
        (a, l) => m`
            <circle cx=${a} cy="20" r="0" fill="none"
              stroke=${e} stroke-width=${t.pulse_width ?? 2}>
              <animate attributeName="r" values="0;12;0" dur="1.2s" repeatCount="indefinite"
                begin="${(l * 0.4).toFixed(1)}s"/>
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite"
                begin="${(l * 0.4).toFixed(1)}s"/>
            </circle>
          `
      )}
      `;
    if (t.particle_spacing === "wave_lateral") {
      const r = Array.from({ length: n }, (a, l) => (l + 0.5) / n * 180 + 10);
      return m`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${e} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (a, l) => m`
            <circle cx=${a} cy="20" r=${s} fill=${e} opacity="0">
              <animate attributeName="cx" values="${a};190;10;${a}" dur="1.4s"
                repeatCount="indefinite" begin="${(l / n * -1.4).toFixed(2)}s"/>
              <animate attributeName="cy" values="20;${10 + (l % 2 === 0 ? 6 : -6)};20;${10 + (l % 2 === 0 ? -6 : 6)};20"
                dur="1.4s" repeatCount="indefinite" begin="${(l / n * -1.4).toFixed(2)}s"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
                repeatCount="indefinite" begin="${(l / n * -1.4).toFixed(2)}s"/>
            </circle>
          `
      )}
      `;
    }
    const o = Array.from({ length: n }, (r, a) => (a + 0.5) / n * 180 + 10);
    return m`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${e} stroke-width="1.5" stroke-opacity="0.25"/>
      ${o.map(
      (r, a) => m`
          <circle cx=${r} cy="20" r=${s} fill=${e} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
          </circle>
        `
    )}
    `;
  }
  renderValueGradientSection(i) {
    if (!this.config) return m``;
    const t = i.value_gradient, e = !!t, s = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "flow"
    }, n = (r) => {
      if (!this.config) return;
      const a = this.config, l = An(a, i.id, r);
      this.pushPatch(a, l, `update gradient for ${i.id}`);
    };
    let o = w;
    if (t && t.low_color && t.high_color)
      try {
        const r = li(
          (t.low_value + t.high_value) / 2,
          t
        ), a = `background: linear-gradient(to right, ${t.low_color}, ${r}, ${t.high_color});`;
        o = m`
          <div class="gradient-preview-bar" style=${a}></div>
          <div class="gradient-preview-labels">
            <span>${t.low_color}</span><span>${t.high_color}</span>
          </div>
        `;
      } catch {
      }
    return m`
      <details class="anim-details">
        <summary>Value gradient</summary>
        <div class="anim-body">

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${e}
              @change=${(r) => {
      if (!this.config) return;
      const a = this.config, l = r.target.checked ? Sn(a, i.id, s) : Cn(a, i.id);
      this.pushPatch(a, l, `${e ? "disable" : "enable"} gradient for ${i.id}`);
    }}
            />
            Enable value gradient
          </label>

          ${e && t ? m`
            <label>Entity
              <input type="text" placeholder="sensor.my_power"
                .value=${t.entity}
                @change=${(r) => n({ entity: r.target.value.trim() })}
              />
            </label>

            <label>Low value
              <input type="number" step="any"
                .value=${String(t.low_value)}
                @change=${(r) => {
      const a = parseFloat(r.target.value);
      Number.isFinite(a) && n({ low_value: a });
    }}
              />
            </label>

            <label>Low colour
              <div class="color-row">
                <input type="color"
                  .value=${t.low_color}
                  @input=${(r) => n({ low_color: r.target.value })}
                />
                <span>${t.low_color}</span>
              </div>
            </label>

            <label>High value
              <input type="number" step="any"
                .value=${String(t.high_value)}
                @change=${(r) => {
      const a = parseFloat(r.target.value);
      Number.isFinite(a) && n({ high_value: a });
    }}
              />
            </label>

            <label>High colour
              <div class="color-row">
                <input type="color"
                  .value=${t.high_color}
                  @input=${(r) => n({ high_color: r.target.value })}
                />
                <span>${t.high_color}</span>
              </div>
            </label>

            <label>Mode
              <select
                .value=${t.mode ?? "flow"}
                @change=${(r) => {
      n({ mode: r.target.value });
    }}
              >
                <option value="flow" ?selected=${(t.mode ?? "flow") === "flow"}>flow (particles only)</option>
                <option value="line" ?selected=${t.mode === "line"}>line (base line only)</option>
                <option value="both" ?selected=${t.mode === "both"}>both</option>
              </select>
            </label>

            ${o}
          ` : w}
        </div>
      </details>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return w;
    const i = this.config.animation ?? {};
    return m`
      <details class="panel anim-global-panel">
        <summary>Animation (global)</summary>
        <div class="panel-body">
          <label>
            FPS cap
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(i.fps ?? 60)}
                @change=${(t) => {
      if (!this.config) return;
      const e = parseInt(t.target.value, 10), s = this.config, n = We(s, { fps: e });
      this.pushPatch(s, n, "set animation fps");
    }}
              />
              <span>${i.fps ?? 60} fps</span>
            </div>
          </label>
          <label class="visibility-row">
            <input type="checkbox"
              .checked=${i.smooth_speed !== !1}
              @change=${(t) => {
      if (!this.config) return;
      const e = t.target.checked, s = this.config, n = We(s, { smooth_speed: e });
      this.pushPatch(s, n, "set smooth_speed");
    }}
            />
            <span class="visibility-label">Smooth speed transitions</span>
            <span class="visibility-val">${i.smooth_speed !== !1 ? "on" : "off"}</span>
          </label>
          <p class="hint-sub">Smooth speed: interpolates duration changes over 500ms instead of restarting abruptly.</p>
        </div>
      </details>
    `;
  }
  renderOverlayInspector(i) {
    const t = i.size ?? { width: 20, height: 15 }, e = i.visible !== !1, s = i.opacity ?? 1;
    return m`
      <div class="inspector overlay-inspector">
        <h4>Overlay: ${i.id}</h4>
        <div class="row size-row">
          <label>
            Width %
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(t.width)}
              @change=${(n) => this.onOverlaySizeChange(i.id, "width", n)}
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
              @change=${(n) => this.onOverlaySizeChange(i.id, "height", n)}
            />
          </label>
        </div>
        <label class="toggle-label">
          Visible
          <input
            type="checkbox"
            .checked=${e}
            @change=${(n) => {
      if (!this.config) return;
      const o = n.target.checked, r = this.config, a = hn(r, i.id, o);
      this.pushPatch(r, a, `toggle overlay ${i.id} visible`);
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
      const r = this.config, a = fn(r, i.id, o);
      this.pushPatch(r, a, `edit overlay ${i.id} opacity`);
    }}
          />
          <span>${Math.round(s * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(i)}
        <button class="danger" @click=${() => this.removeOverlay(i.id)}>Delete overlay</button>
      </div>
    `;
  }
  renderCardConfigEditor(i) {
    const t = this.customConfigDraft || JSON.stringify(i.card ?? { type: "entity", entity: "sensor.example_sensor" }, null, 2);
    return m`
      <label>
        Card configuration (any valid HA card YAML)
        <textarea
          rows="8"
          spellcheck="false"
          placeholder="type: entity&#10;entity: sensor.my_sensor"
          .value=${t}
          @input=${(e) => {
      this.customConfigDraft = e.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? m`<div class="custom-config-error">${this.customConfigError}</div>` : w}
      <p class="hint-sub">
        Any installed HA card type is supported. Examples: entity, tile, gauge,
        picture-entity, custom:mini-graph-card, …
      </p>
      <p class="hint-sub">
        URLs must not use javascript:, vbscript:, data: or file: schemes.
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(i.id)}>Apply card config</button>
      </div>
    `;
  }
  renderOpacityPanel() {
    if (!this.config) return w;
    const i = this.config.opacity ?? {}, t = (e, s, n = 1) => {
      const o = i[e] ?? n;
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
        const l = this.config, d = Le(l, e, a);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, d = Le(l, e, a);
        this.pushPatch(l, d, `set opacity.${e}`);
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
    if (!this.config) return w;
    const i = this.config.domain_colors ?? {}, t = {
      solar: "#FFD700",
      grid: "#1EB4FF",
      battery: "#32DC50",
      load: "#FF8C1E"
    }, e = (s, n) => {
      const o = i[s], r = t[s];
      return m`
        <div class="color-picker-row">
          <span class="color-picker-label">${n}</span>
          <input
            type="color"
            .value=${o ?? r}
            @change=${(a) => {
        if (!this.config) return;
        const l = a.target.value, d = this.config, c = He(d, s, l);
        this.pushPatch(d, c, `set domain_colors.${s}`);
      }}
          />
          <span class="color-picker-value">${o || `${r} (default)`}</span>
          ${o ? m`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, l = He(a, s, void 0);
        this.pushPatch(a, l, `reset domain_colors.${s}`);
      }}>Reset</button>` : w}
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
          ${e("solar", "Solar")}
          ${e("grid", "Grid")}
          ${e("battery", "Battery")}
          ${e("load", "Load")}
        </div>
      </details>
    `;
  }
  renderVisibilityPanel() {
    if (!this.config) return w;
    const i = this.config.visibility ?? {}, t = (e, s) => {
      const n = i[e] !== !1;
      return m`
        <label class="visibility-row">
          <span class="visibility-label">${s}</span>
          <input
            type="checkbox"
            .checked=${n}
            @change=${(o) => {
        if (!this.config) return;
        const r = o.target.checked, a = this.config, l = xn(a, e, r);
        this.pushPatch(a, l, `set visibility.${e}`);
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
    if (!this.config) return w;
    const i = this.config.defaults ?? {}, t = (e, s, n) => {
      const o = i[e] ?? n.defaultVal;
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
        const l = Math.max(n.min, Math.min(n.max, a)), d = this.config, c = bn(d, e, l);
        this.pushPatch(d, c, `set defaults.${e}`);
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
  renderRubberBand() {
    const i = this.rubberBand;
    if (!i) return w;
    const t = Math.min(i.x1, i.x2), e = Math.min(i.y1, i.y2), s = Math.abs(i.x2 - i.x1), n = Math.abs(i.y2 - i.y1);
    return m`
      <div
        class="rubber-band"
        style=${`left:${t}%;top:${e}%;width:${s}%;height:${n}%;`}
      ></div>
    `;
  }
  renderMultiSelectToolbar() {
    const i = this.selectedNodeIds.size;
    if (i < 2) return w;
    const t = this.selectedNodeIds, e = Array.from(t)[0];
    return m`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${i} nodes selected</span>
        <button
          class="ms-btn"
          title=${i === 2 ? "Suggest path between selected nodes" : "Select exactly 2 nodes to suggest a path"}
          ?disabled=${i !== 2 || this.suggestBusy}
          @click=${() => this.runSuggestPath()}
        >Suggest path</button>
        <button class="ms-btn" @click=${() => this.bulkHide(t)}>Hide</button>
        <button class="ms-btn" @click=${() => this.bulkShow(t)}>Show</button>
        <button class="ms-btn" @click=${() => this.bulkAlignH(t, e)}>Align H</button>
        <button class="ms-btn" @click=${() => this.bulkAlignV(t, e)}>Align V</button>
        <button class="ms-btn danger" @click=${() => this.bulkDelete(t)}>Delete</button>
        <button class="ms-btn ghost" @click=${() => {
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.statusMessage = "";
    }}>✕ Deselect</button>
      </div>
    `;
  }
  bulkHide(i) {
    if (!this.config) return;
    const t = this.config, e = Oe(t, i, !1);
    this.pushPatch(t, e, `hide ${i.size} nodes`);
  }
  bulkShow(i) {
    if (!this.config) return;
    const t = this.config, e = Oe(t, i, !0);
    this.pushPatch(t, e, `show ${i.size} nodes`);
  }
  bulkAlignH(i, t) {
    if (!this.config) return;
    const e = this.config, s = Js(e, i, t);
    this.pushPatch(e, s, `align ${i.size} nodes horizontally`);
  }
  bulkAlignV(i, t) {
    if (!this.config) return;
    const e = this.config, s = Xs(e, i, t);
    this.pushPatch(e, s, `align ${i.size} nodes vertically`);
  }
  bulkDelete(i) {
    if (!this.config || !window.confirm(`Delete ${i.size} nodes (and their flows)?`)) return;
    const t = this.config, e = Ys(t, i);
    this.pushPatch(t, e, `delete ${i.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderFlowsListPanel() {
    if (!this.config) return w;
    const i = this.config.flows;
    return m`
      <details class="panel flows-list-panel" ?open=${!0}>
        <summary>Flows (${i.length})</summary>
        <div class="panel-body flows-list-body">
          ${i.length === 0 ? m`<p class="hint-sub">No flows yet. Add nodes first, then add a flow between them.</p>` : i.map((t) => {
      const e = G(t.domain ?? this.config.domain), s = lt(t, e, t.domain ?? this.config.domain, 1, this.config.domain_colors), n = t.id === this.selectedFlowId, o = t.visible === !1;
      return m`
                  <div
                    class=${`flow-list-row ${n ? "selected" : ""} ${o ? "flow-hidden" : ""}`}
                    @click=${() => {
        this.selectedFlowId = n ? null : t.id, this.selectedNodeId = null, this.selectedOverlayId = null;
      }}
                  >
                    <span class="flow-dot" style=${`background:${s};`}></span>
                    <span class="flow-list-label">${t.id}</span>
                    <span class="flow-list-sub">${t.from_node}→${t.to_node}</span>
                    <span class="flow-list-style">${t.animation?.animation_style ?? "dots"}</span>
                    <button
                      class="eye-toggle flow-eye"
                      title=${o ? "Show flow" : "Hide flow"}
                      @click=${(r) => {
        if (r.stopPropagation(), !this.config) return;
        const a = this.config, l = Be(a, t.id, o);
        this.pushPatch(a, l, `${o ? "show" : "hide"} flow ${t.id}`);
      }}
                    >${o ? "◉" : "◎"}</button>
                  </div>
                `;
    })}
          <button
            class="add-state"
            style="margin-top:6px;"
            @click=${() => {
      this.config && (this.pending = { kind: "add-flow", step: "pick-from" });
    }}
          >+ Add flow</button>
        </div>
      </details>
    `;
  }
  renderWeatherPanel() {
    if (!this.config) return w;
    const i = this.config.background, t = Object.entries(i.weather_states ?? {}), e = i.weather_entity && this.hass ? this.hass.states[i.weather_entity]?.state : void 0;
    return m`
      <details class="weather-panel" ?open=${t.length > 0 || !!i.weather_entity}>
        <summary>Backgrounds &amp; weather</summary>
        <div class="weather-body">
          <label>
            Default image URL
            <input
              type="text"
              .value=${i.default}
              @change=${this.onDefaultBgChange}
              placeholder="/local/flowme/house.jpg"
            />
            ${i.default ? m`<img class="weather-thumb" src=${i.default} alt="default background" />` : w}
          </label>
          <label>
            Weather entity (optional)
            ${this.renderEntityPicker(
      i.weather_entity ?? "",
      (s) => this.setWeatherEntityValue(s),
      { includeDomains: ["weather"], placeholder: "weather.forecast_home" }
    )}
          </label>
          ${e !== void 0 ? m`<div class="weather-live-state">
                Current state: <strong>${e}</strong>
                ${i.weather_states?.[e] ? m` → <span class="weather-match-ok">matched</span>` : m` → <span class="weather-match-miss">no mapping (using default)</span>`}
              </div>` : w}
          <label>
            Sun entity (optional) — enables automatic night background variants
            ${this.renderEntityPicker(
      i.sun_entity ?? "",
      (s) => {
        if (!this.config) return;
        const n = this.config, o = on(n, s || void 0);
        this.pushPatch(n, o, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: "sun.sun" }
    )}
          </label>
          ${i.sun_entity && this.hass?.states[i.sun_entity] ? m`<div class="weather-live-state">
                Sun: <strong>${this.hass.states[i.sun_entity]?.state === "above_horizon" ? "☀️ above horizon" : "🌙 below horizon"}</strong>
              </div>` : w}
          <label>
            Fade transition (seconds)
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              .value=${String(Math.round((i.transition_duration ?? 5e3) / 1e3))}
              @change=${(s) => {
      if (!this.config) return;
      const n = parseFloat(s.target.value);
      if (!Number.isFinite(n) || n < 0) return;
      const o = this.config, r = rn(o, n * 1e3);
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
                    ${n ? m`<img class="weather-thumb" src=${n} alt=${s} />` : w}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(s)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${C.KNOWN_WEATHER_STATES.map(
      (s) => m`<option value=${s}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
          <details class="hint-details">
            <summary>Standard Met.no state list (for reference)</summary>
            <div class="hint-states">
              ${C.KNOWN_WEATHER_STATES.map(
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
  setWeatherEntityValue(i) {
    if (!this.config) return;
    const t = i.trim(), e = this.config, s = nn(e, t || void 0);
    this.pushPatch(e, s, "edit weather entity");
  }
  onWeatherStateKeyChange(i, t) {
    if (!this.config) return;
    const e = t.target.value.trim();
    if (!e || e === i) return;
    const s = this.config, n = yn(s, i, e);
    n !== s && this.pushPatch(s, n, `rename weather state ${i}→${e}`);
  }
  onWeatherStateUrlChange(i, t) {
    if (!this.config) return;
    const e = t.target.value, s = this.config, n = De(s, i, e);
    this.pushPatch(s, n, `edit weather image ${i}`);
  }
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || this.selectedNodeIds.size !== 2) {
      this.statusMessage = 'Select exactly 2 nodes (Shift+click or rubber-band), then click "Suggest path".';
      return;
    }
    const [i, t] = Array.from(this.selectedNodeIds), e = this.config.nodes.find((n) => n.id === i), s = this.config.nodes.find((n) => n.id === t);
    if (!e || !s) {
      this.statusMessage = "One or both selected nodes could not be found.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const n = await qn({
        imageUrl: this.config.background.default,
        from: e.position,
        to: s.position
      });
      if (!n.edgesUsable) {
        this.statusMessage = "Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.", this.suggestPreview = null;
        return;
      }
      n.waypoints.length === 0 && (this.statusMessage = "No waypoints needed — a straight line follows the shortest path."), this.suggestPreview = {
        fromNodeId: i,
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
    const { fromNodeId: i, toNodeId: t, waypoints: e } = this.suggestPreview, s = window.prompt(
      "Entity for this flow (e.g. sensor.grid_power):",
      "sensor.placeholder_entity"
    ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Te(n, i, t, s), a = {
      ...o,
      flows: o.flows.map(
        (l) => l.id === r.id ? { ...l, waypoints: e.map((d) => ({ x: d.x, y: d.y })) } : l
      )
    };
    this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = r.id, this.statusMessage = `Created flow ${r.id} with ${e.length} waypoint(s).`, this.pushPatch(n, a, `suggest-path ${r.id}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return w;
    const i = this.config.nodes.find((n) => n.id === this.suggestPreview.fromNodeId), t = this.config.nodes.find((n) => n.id === this.suggestPreview.toNodeId);
    if (!i || !t) return w;
    const s = [
      i.position,
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
    ` : w;
  }
  // -- inspector edits --
  onNodeLabelChange(i, t) {
    if (!this.config) return;
    const e = t.target.value, s = this.config, n = {
      ...s,
      nodes: s.nodes.map((o) => o.id === i ? { ...o, label: e || void 0 } : o)
    };
    this.pushPatch(s, n, `rename ${i}`);
  }
  setNodeEntity(i, t) {
    if (!this.config) return;
    const e = this.config, s = t.trim(), n = {
      ...e,
      nodes: e.nodes.map(
        (o) => o.id === i ? { ...o, entity: s || void 0 } : o
      )
    };
    this.pushPatch(e, n, `edit entity of ${i}`);
  }
  setFlowEntity(i, t) {
    if (!this.config) return;
    const e = this.config, s = t.trim();
    if (!s) return;
    const n = {
      ...e,
      flows: e.flows.map(
        (o) => o.id === i ? { ...o, entity: s } : o
      )
    };
    this.pushPatch(e, n, `edit entity of ${i}`);
  }
  onOverlaySizeChange(i, t, e) {
    if (!this.config) return;
    const s = (this.config.overlays ?? []).find((l) => l.id === i);
    if (!s) return;
    const n = s.size ?? { width: 20, height: 15 }, o = Number(e.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, a = Re(r, i, { ...n, [t]: o });
    this.pushPatch(r, a, `resize overlay ${i}`);
  }
  applyCustomConfig(i) {
    if (!this.config) return;
    const t = this.customConfigDraft.trim();
    if (!t) {
      this.customConfigError = "Config is empty.";
      return;
    }
    let e;
    try {
      e = JSON.parse(t);
    } catch (n) {
      this.customConfigError = "Invalid JSON: " + (n instanceof Error ? n.message : String(n));
      return;
    }
    if (!e || typeof e != "object" || Array.isArray(e)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const s = this.config;
    try {
      const n = pn(s, i, e), o = kt(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: s, next: o, description: `edit overlay ${i} card config` }), this.commitToHa(o);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(i) {
    if (!this.config) return;
    const t = this.config, e = dn(t, i);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, e, `delete overlay ${i}`);
  }
  removeNode(i) {
    if (!this.config) return;
    const t = this.config, e = qs(t, i);
    this.selectedNodeId = null, this.pushPatch(t, e, `delete node ${i}`);
  }
  removeFlow(i) {
    if (!this.config) return;
    const t = this.config, e = en(t, i);
    this.selectedFlowId = null, this.pushPatch(t, e, `delete flow ${i}`);
  }
  // -- utilities --
  pointerToPercent(i) {
    const t = this.stageRef.value;
    if (!t) return null;
    const e = t.getBoundingClientRect();
    if (e.width === 0 || e.height === 0) return null;
    const s = N((i.clientX - e.left) / e.width * 100), n = N((i.clientY - e.top) / e.height * 100);
    return { x: s, y: n };
  }
  pushPatch(i, t, e) {
    try {
      const s = kt(t);
      this.errorMessage = "", this.undoStack.push({ prev: i, next: s, description: e }), this.commitToHa(s);
    } catch (s) {
      this.errorMessage = s instanceof Error ? s.message : String(s), this.config = i;
    }
  }
  applyConfig(i, t) {
    this.config = i, t ? this.commitToHa(i) : this.commitToHa(i);
  }
  commitToHa(i) {
    const t = new CustomEvent("config-changed", {
      detail: { config: i },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  refreshUndoState() {
    this.canUndo = this.undoStack.canUndo(), this.canRedo = this.undoStack.canRedo(), this.undoLabel = this.undoStack.topUndoDescription() ?? "", this.redoLabel = this.undoStack.topRedoDescription() ?? "";
  }
};
C.KNOWN_WEATHER_STATES = [
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
C.styles = Et`
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
      stroke-width: 2.5;
      filter: drop-shadow(0 0 3px var(--primary-color, #03a9f4));
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
    /* Single-select: primary-color ring */
    .handle.selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 6px var(--primary-color, #03a9f4);
    }
    /* Any node in the selection set (single or multi): white ring 4px outside, 2px wide */
    .handle.in-selection .handle-dot {
      box-shadow: 0 0 0 4px transparent, 0 0 0 6px #ffffff, 0 0 0 8px rgba(3,169,244,0.6);
    }
    /* Multi-select additionally brightens the ring */
    .handle.multi-selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0,0,0,0.4), 0 0 0 5px #ffffff, 0 0 0 7px #03a9f4;
    }
    /* Rubber-band selection box */
    .rubber-band {
      position: absolute;
      border: 1.5px solid var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.08);
      border-radius: 2px;
      pointer-events: none;
    }
    /* Multi-select toolbar */
    .multiselect-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      padding: 6px 8px;
      background: rgba(3,169,244,0.12);
      border: 1px solid rgba(3,169,244,0.3);
      border-radius: 8px;
      margin-top: 4px;
    }
    .multiselect-count {
      font-size: 11px;
      font-weight: 600;
      color: var(--primary-color, #03a9f4);
      flex-shrink: 0;
    }
    .ms-btn {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.07);
      color: #fff;
      cursor: pointer;
    }
    .ms-btn:hover { background: rgba(255,255,255,0.15); }
    .ms-btn:disabled { opacity: 0.4; cursor: default; }
    .ms-btn.danger { border-color: rgba(239,68,68,0.5); color: #fca5a5; }
    .ms-btn.danger:hover { background: rgba(239,68,68,0.2); }
    .ms-btn.ghost { opacity: 0.7; }
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
    /* Hit-area line behind connector segment — wide transparent stroke for easier clicking */
    .connectors .segment-hit {
      stroke: transparent;
      stroke-width: 20;
      vector-effect: non-scaling-stroke;
      pointer-events: stroke;
      cursor: crosshair;
      fill: none;
    }
    /* Flows list panel */
    .flows-list-panel {
      margin-top: 8px;
    }
    .flows-list-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .flow-list-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 6px;
      border-radius: 6px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 0.15s;
      background: rgba(255,255,255,0.04);
    }
    .flow-list-row:hover {
      background: rgba(255,255,255,0.1);
    }
    .flow-list-row.selected {
      background: rgba(var(--rgb-primary-color, 3,169,244), 0.18);
      border-color: var(--primary-color, #03a9f4);
    }
    .flow-list-row.flow-hidden {
      opacity: 0.5;
    }
    .flow-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .flow-list-label {
      font-weight: 600;
      font-size: 12px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .flow-list-sub {
      font-size: 10px;
      opacity: 0.6;
      white-space: nowrap;
    }
    .flow-list-style {
      font-size: 10px;
      opacity: 0.55;
      background: rgba(255,255,255,0.08);
      border-radius: 3px;
      padding: 1px 4px;
      white-space: nowrap;
    }
    .flow-eye {
      position: static;
      width: 20px;
      height: 20px;
      font-size: 11px;
      flex-shrink: 0;
      background: rgba(0,0,0,0.3);
      display: flex;
    }
    /* Animation section */
    .anim-details {
      margin-top: 8px;
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      padding-top: 8px;
    }
    .anim-details summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .anim-details summary::before { content: '▸ '; }
    .anim-details[open] summary::before { content: '▾ '; }
    .anim-details summary::-webkit-details-marker { display: none; }
    .anim-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 6px 0;
    }
    .anim-body label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .anim-body select,
    .anim-body input[type='number'] {
      font: inherit;
      padding: 3px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .anim-toggle {
      flex-direction: row !important;
      align-items: center;
      gap: 8px !important;
    }
    .anim-preview-wrap {
      border-radius: 6px;
      overflow: hidden;
      background: rgba(0,0,0,0.4);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .anim-preview {
      display: block;
      width: 100%;
      height: 40px;
    }
    .anim-global-panel {
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .custom-svg-preview {
      display: block;
      margin-top: 4px;
      border-radius: 4px;
      background: rgba(0,0,0,0.4);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .gradient-preview-bar {
      height: 20px;
      border-radius: 4px;
      margin: 6px 0 2px;
    }
    .gradient-preview-labels {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      opacity: 0.7;
      margin-bottom: 6px;
    }
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-row input[type="color"] {
      width: 40px;
      height: 28px;
      padding: 2px;
      cursor: pointer;
    }
  `;
F([
  D({ attribute: !1 })
], C.prototype, "hass", 2);
F([
  M()
], C.prototype, "config", 2);
F([
  M()
], C.prototype, "pending", 2);
F([
  M()
], C.prototype, "previewMode", 2);
F([
  M()
], C.prototype, "selectedNodeId", 2);
F([
  M()
], C.prototype, "selectedNodeIds", 2);
F([
  M()
], C.prototype, "selectedFlowId", 2);
F([
  M()
], C.prototype, "selectedOverlayId", 2);
F([
  M()
], C.prototype, "rubberBand", 2);
F([
  M()
], C.prototype, "customConfigDraft", 2);
F([
  M()
], C.prototype, "customConfigError", 2);
F([
  M()
], C.prototype, "statusMessage", 2);
F([
  M()
], C.prototype, "errorMessage", 2);
F([
  M()
], C.prototype, "canUndo", 2);
F([
  M()
], C.prototype, "canRedo", 2);
F([
  M()
], C.prototype, "undoLabel", 2);
F([
  M()
], C.prototype, "redoLabel", 2);
F([
  M()
], C.prototype, "suggestPreview", 2);
F([
  M()
], C.prototype, "suggestBusy", 2);
C = F([
  zt("flowme-card-editor")
], C);
var to = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, et = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? eo(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && to(t, e, n), n;
};
const io = "1.0.14", Je = 5e3;
console.info(
  `%c flowme %c v${io} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function so(i) {
  if (!i) return "";
  const t = [], e = (s, n) => {
    const o = i[s];
    o !== void 0 && t.push(`${n}:${o};`);
  };
  return e("background", "--flowme-opacity-bg"), e("darken", "--flowme-opacity-darken"), e("nodes", "--flowme-opacity-nodes"), e("flows", "--flowme-opacity-flows"), e("dots", "--flowme-opacity-dots"), e("glow", "--flowme-opacity-glow"), e("labels", "--flowme-opacity-labels"), e("values", "--flowme-opacity-values"), e("overlays", "--flowme-opacity-overlays"), t.join("");
}
function no(i) {
  if (!i) return "";
  const t = [], e = (s, n) => {
    i[s] === !1 && t.push(`${n}:none;`);
  };
  return e("nodes", "--flowme-vis-nodes"), e("lines", "--flowme-vis-lines"), e("dots", "--flowme-vis-dots"), e("labels", "--flowme-vis-labels"), e("values", "--flowme-vis-values"), e("overlays", "--flowme-vis-overlays"), t.join("");
}
let U = class extends V {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = si(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(i) {
    const t = this._hass;
    if (this._hass = i, i) {
      const e = this.config, s = [
        ...e?.flows.map((a) => a.entity) ?? [],
        ...e?.flows.map((a) => a.value_gradient?.entity).filter(Boolean) ?? [],
        ...e?.nodes.map((a) => a.entity).filter(Boolean) ?? [],
        e?.background.weather_entity,
        e?.background.sun_entity
      ].filter((a) => typeof a == "string" && a.length > 0), n = {};
      for (const a of s)
        n[a] = i.states[a]?.state;
      P("hass setter called. config entity states:", n);
      const o = e?.background.weather_entity;
      if (o) {
        const a = t?.states[o]?.state, l = i.states[o]?.state;
        P("[weather] state:", l, "(was:", a, ")"), a !== l && this.syncWeatherBackground();
      }
      const r = e?.background.sun_entity;
      if (r) {
        const a = t?.states[r]?.state, l = i.states[r]?.state;
        a !== l && (P("[sun] state changed:", a, "→", l), this.syncWeatherBackground());
      }
    } else
      P("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(i) {
    try {
      const t = kt(i);
      bs(t.debug ?? !1), P("setConfig called:", JSON.parse(JSON.stringify(i ?? null))), P("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const e = t.background.default;
      this.bgLayerA = e, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = e;
    } catch (t) {
      const e = t instanceof re ? t.message : String(t);
      this.config = void 0, this.errorMessage = e, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), P("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    P("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), P("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), super.disconnectedCallback();
  }
  willUpdate(i) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = Is(), this.rendererReadyFor = this.config;
      const e = this.config;
      this.renderer.init(t, e).catch((s) => {
        P("renderer init failed — falling back to SVG renderer", s), this.teardownRenderer(), this.renderer = new Zt(), this.rendererReadyFor = e, this.renderer.init(t, e).catch((n) => {
          console.error("[flowme] SVG renderer init also failed", n);
        });
      });
    }
    if (i.has("hass") && this.renderer && this.hass) {
      P("willUpdate hass-changed → pushing values for", this.config.flows.length, "flow(s) to renderer", this.renderer.constructor.name);
      for (const e of this.config.flows) {
        const s = this.hass.states[e.entity], n = Me(s?.state), o = G(e.domain ?? this.config.domain), r = s?.attributes?.unit_of_measurement, a = rs(n, r, o.unit_scale);
        if (P(
          "updateFlow →",
          e.id,
          "entity=",
          e.entity,
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
            const l = `${e.id}:${e.entity}:unavailable`;
            this.warnedMissing.has(l) || (this.warnedMissing.add(l), P(`flow "${e.id}" entity "${e.entity}" is currently ${s.state} — no flow will render until it reports a number`));
          }
        } else {
          const l = `${e.id}:${e.entity}`;
          this.warnedMissing.has(l) || (this.warnedMissing.add(l), P(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(e.id, a.value), e.value_gradient && this.renderer.setGradientColor) {
          const l = e.value_gradient.entity, d = this.hass.states[l];
          if (d && d.state !== "unavailable" && d.state !== "unknown") {
            const c = parseFloat(d.state);
            if (Number.isFinite(c)) {
              const u = li(c, e.value_gradient);
              this.renderer.setGradientColor(e.id, u);
            } else
              P(`flow "${e.id}" gradient entity "${l}" state "${d.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            P(`flow "${e.id}" gradient entity "${l}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
        }
      }
    }
    (i.has("config") || i.has("hass")) && this.syncWeatherBackground();
  }
  getCardSize() {
    const i = St(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / i) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const i = St(this.config?.aspect_ratio) ?? 1.6;
    return {
      grid_columns: 4,
      grid_rows: Math.max(2, Math.round(4 / i) + 1),
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
    const i = this.config;
    if (!i)
      return m`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    const e = `${1 / (St(i.aspect_ratio) ?? 16 / 10) * 100}%`, s = i.background.transition_duration ?? Je, n = so(i.opacity), o = no(i.visibility);
    return m`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${e};${n}${o}`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, s)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, s)}
          ></div>
          <div class="renderer-mount" ${ni(this.rendererMount)}></div>
          ${i.nodes.map((r) => this.renderNodeHandle(r))}
          ${(i.overlays ?? []).map((r) => (P("rendering overlay →", r.type, "position=", r.position, "size=", r.size), Ts(r, this.hass)))}
        </div>
      </ha-card>
    `;
  }
  buildLayerStyle(i, t) {
    return `${i ? `background-image: url('${i}');` : ""} transition-duration: ${t}ms;`;
  }
  resolveTargetBackground() {
    const i = this.config?.background;
    if (!i) return "";
    if (i.weather_entity && i.weather_states && this.hass) {
      const t = this.hass.states[i.weather_entity];
      if (t) {
        const e = t.state, s = i.sun_entity ? this.hass.states[i.sun_entity]?.state : void 0, n = as(e, s, i.weather_states, i.default);
        let o = e;
        return s === "below_horizon" && !e.endsWith("-night") && (o = `${e}-night`), P("[FlowMe] sun:", s, "weather:", e, "→ lookup key:", o, "→ image:", n !== i.default ? n : "default"), n;
      }
    }
    return i.default;
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
    const i = this.resolveTargetBackground();
    if (!i || i === this.lastAppliedBgUrl) return;
    const t = this.config.background.transition_duration ?? Je;
    this.preload(i).then(() => {
      if (!this.config || this.resolveTargetBackground() !== i) return;
      this.transitionTimer !== null && window.clearTimeout(this.transitionTimer);
      const e = this.activeLayer === "A" ? "B" : "A";
      e === "A" ? this.bgLayerA = i : this.bgLayerB = i, requestAnimationFrame(() => {
        this.activeLayer = e, this.lastAppliedBgUrl = i, this.transitionTimer = window.setTimeout(() => {
          this.activeLayer === "A" ? this.bgLayerB = "" : this.bgLayerA = "", this.transitionTimer = null;
        }, t + 50);
      });
    });
  }
  preload(i) {
    if (!i) return Promise.resolve();
    const t = this.preloadCache.get(i);
    return t?.complete && t.naturalWidth > 0 ? Promise.resolve() : new Promise((e) => {
      const s = new Image();
      s.decoding = "async", s.onload = () => {
        this.preloadCache.set(i, s), e();
      }, s.onerror = () => e(), s.src = i, this.preloadCache.set(i, s);
    });
  }
  renderNodeHandle(i) {
    const t = this.hass && i.entity ? this.hass.states[i.entity] : void 0, e = i.show_value !== !1 && !!t, s = i.show_label !== !1 && !!i.label, n = G(this.config?.domain), o = i.color ?? this.nodeFlowColor(i.id) ?? n.default_color_positive, r = i.size ?? this.config?.defaults?.node_radius ?? 12;
    let a = "";
    if (t) {
      const d = Me(t.state), c = t.attributes?.unit_of_measurement ?? "";
      c ? a = `${this.formatSensorNumber(d)} ${c}` : a = n.describe(d);
    }
    const l = i.visible === !1;
    return m`
      <div
        class="node"
        data-node-id=${i.id}
        style=${`left: ${i.position.x}%; top: ${i.position.y}%; --flowme-dot-size: ${r}px;${i.opacity !== void 0 ? ` opacity: ${i.opacity};` : ""}${l ? " display: none;" : ""}`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${s ? m`<span class="node-label">${i.label}</span>` : null}
        ${e ? m`<span class="node-value">${a}</span>` : null}
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
  nodeFlowColor(i) {
    if (!this.config) return;
    const t = this.config.domain, e = this.config.domain_colors;
    let s;
    const n = /* @__PURE__ */ new Set();
    for (const o of this.config.flows) {
      if (o.from_node !== i && o.to_node !== i) continue;
      const r = G(o.domain ?? t), a = lt(o, r, o.domain ?? t, 1, e), l = a.toLowerCase();
      n.has(l) || (n.add(l), s || (s = a));
    }
    if (n.size !== 0)
      return n.size === 1 ? s : fs;
  }
  /**
   * Format a numeric sensor reading for node display. Mirrors the compact
   * thresholds the overlay renderer uses so values stay consistent across
   * the card.
   */
  formatSensorNumber(i) {
    if (!Number.isFinite(i)) return "—";
    const t = Math.abs(i);
    return t >= 1e3 || t >= 100 ? i.toFixed(0) : t >= 10 ? i.toFixed(1) : i.toFixed(2);
  }
  teardownRenderer() {
    this.renderer && (this.renderer.destroy(), this.renderer = null), this.rendererReadyFor = void 0;
  }
};
U.styles = Et`
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
et([
  D({ attribute: !1 })
], U.prototype, "hass", 1);
et([
  M()
], U.prototype, "config", 2);
et([
  M()
], U.prototype, "errorMessage", 2);
et([
  M()
], U.prototype, "bgLayerA", 2);
et([
  M()
], U.prototype, "bgLayerB", 2);
et([
  M()
], U.prototype, "activeLayer", 2);
U = et([
  zt("flowme-card")
], U);
const ee = window;
ee.customCards = ee.customCards ?? [];
ee.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  U as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
