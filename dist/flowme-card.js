/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis, xt = rt.ShadowRoot && (rt.ShadyCSS === void 0 || rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _t = Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let ne = class {
  constructor(t, s, n) {
    if (this._$cssResult$ = !0, n !== _t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (xt && t === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (t = Nt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Nt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ve = (e) => new ne(typeof e == "string" ? e : e + "", void 0, _t), At = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((n, o, i) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[i + 1], e[0]);
  return new ne(s, e, _t);
}, $e = (e, t) => {
  if (xt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), o = rt.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = s.cssText, e.appendChild(n);
  }
}, It = xt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return ve(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xe, defineProperty: _e, getOwnPropertyDescriptor: Ae, getOwnPropertyNames: Se, getOwnPropertySymbols: ke, getPrototypeOf: Me } = Object, N = globalThis, Ut = N.trustedTypes, Ce = Ut ? Ut.emptyScript : "", Pe = N.reactiveElementPolyfillSupport, K = (e, t) => e, lt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ce : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, St = (e, t) => !xe(e, t), Ft = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: St };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), N.litPropertyMetadata ?? (N.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let W = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Ft) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, s);
      o !== void 0 && _e(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: o, set: i } = Ae(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: o, set(r) {
      const l = o?.call(this);
      i?.call(this, r), this.requestUpdate(t, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const t = Me(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const s = this.properties, n = [...Se(s), ...ke(s)];
      for (const o of n) this.createProperty(o, s[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [n, o] of s) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, n] of this.elementProperties) {
      const o = this._$Eu(s, n);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) s.unshift(It(o));
    } else t !== void 0 && s.push(It(t));
    return s;
  }
  static _$Eu(t, s) {
    const n = s.attribute;
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
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const n of s.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $e(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, n) {
    this._$AK(t, n);
  }
  _$ET(t, s) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const i = (n.converter?.toAttribute !== void 0 ? n.converter : lt).toAttribute(s, n.type);
      this._$Em = t, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const i = n.getPropertyOptions(o), r = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : lt;
      this._$Em = o;
      const l = r.fromAttribute(s, i.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, s, n, o = !1, i) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (i = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? St)(i, s) || n.useDefault && n.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, s, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: n, reflect: o, wrapped: i }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), i !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
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
        for (const [o, i] of this._$Ep) this[o] = i;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, i] of n) {
        const { wrapped: r } = i, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, i, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[K("elementProperties")] = /* @__PURE__ */ new Map(), W[K("finalized")] = /* @__PURE__ */ new Map(), Pe?.({ ReactiveElement: W }), (N.reactiveElementVersions ?? (N.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, Rt = (e) => e, ct = X.trustedTypes, Tt = ct ? ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, oe = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + E, Ee = `<${ie}>`, O = document, Y = () => O.createComment(""), Q = (e) => e === null || typeof e != "object" && typeof e != "function", kt = Array.isArray, Ne = (e) => kt(e) || typeof e?.[Symbol.iterator] == "function", mt = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Dt = />/g, U = RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, Ht = /"/g, re = /^(?:script|style|textarea|title)$/i, Ie = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), b = Ie(1), j = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), R = O.createTreeWalker(O, 129);
function ae(e, t) {
  if (!kt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(t) : t;
}
const Ue = (e, t) => {
  const s = e.length - 1, n = [];
  let o, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = G;
  for (let l = 0; l < s; l++) {
    const a = e[l];
    let c, h, d = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, h = r.exec(a), h !== null); ) p = r.lastIndex, r === G ? h[1] === "!--" ? r = Ot : h[1] !== void 0 ? r = Dt : h[2] !== void 0 ? (re.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = U) : h[3] !== void 0 && (r = U) : r === U ? h[0] === ">" ? (r = o ?? G, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? U : h[3] === '"' ? Ht : Lt) : r === Ht || r === Lt ? r = U : r === Ot || r === Dt ? r = G : (r = U, o = void 0);
    const u = r === U && e[l + 1].startsWith("/>") ? " " : "";
    i += r === G ? a + Ee : d >= 0 ? (n.push(c), a.slice(0, d) + oe + a.slice(d) + E + u) : a + E + (d === -2 ? l : u);
  }
  return [ae(e, i + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class tt {
  constructor({ strings: t, _$litType$: s }, n) {
    let o;
    this.parts = [];
    let i = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, h] = Ue(t, s);
    if (this.el = tt.createElement(c, n), R.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = R.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(oe)) {
          const p = h[r++], u = o.getAttribute(d).split(E), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: i, name: g[2], strings: u, ctor: g[1] === "." ? Re : g[1] === "?" ? Te : g[1] === "@" ? Oe : pt }), o.removeAttribute(d);
        } else d.startsWith(E) && (a.push({ type: 6, index: i }), o.removeAttribute(d));
        if (re.test(o.tagName)) {
          const d = o.textContent.split(E), p = d.length - 1;
          if (p > 0) {
            o.textContent = ct ? ct.emptyScript : "";
            for (let u = 0; u < p; u++) o.append(d[u], Y()), R.nextNode(), a.push({ type: 2, index: ++i });
            o.append(d[p], Y());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ie) a.push({ type: 2, index: i });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(E, d + 1)) !== -1; ) a.push({ type: 7, index: i }), d += E.length - 1;
      }
      i++;
    }
  }
  static createElement(t, s) {
    const n = O.createElement("template");
    return n.innerHTML = t, n;
  }
}
function V(e, t, s = e, n) {
  if (t === j) return t;
  let o = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const i = Q(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== i && (o?._$AO?.(!1), i === void 0 ? o = void 0 : (o = new i(e), o._$AT(e, s, n)), n !== void 0 ? (s._$Co ?? (s._$Co = []))[n] = o : s._$Cl = o), o !== void 0 && (t = V(e, o._$AS(e, t.values), o, n)), t;
}
class Fe {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: n } = this._$AD, o = (t?.creationScope ?? O).importNode(s, !0);
    R.currentNode = o;
    let i = R.nextNode(), r = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new et(i, i.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(i, a.name, a.strings, this, t) : a.type === 6 && (c = new De(i, this, t)), this._$AV.push(c), a = n[++l];
      }
      r !== a?.index && (i = R.nextNode(), r++);
    }
    return R.currentNode = O, o;
  }
  p(t) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, s), s += n.strings.length - 2) : n._$AI(t[s])), s++;
  }
}
class et {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, n, o) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = V(this, t, s), Q(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ne(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = tt.createElement(ae(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(s);
    else {
      const i = new Fe(o, this), r = i.u(this.options);
      i.p(s), this.T(r), this._$AH = i;
    }
  }
  _$AC(t) {
    let s = zt.get(t.strings);
    return s === void 0 && zt.set(t.strings, s = new tt(t)), s;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, o = 0;
    for (const i of t) o === s.length ? s.push(n = new et(this.O(Y()), this.O(Y()), this, this.options)) : n = s[o], n._$AI(i), o++;
    o < s.length && (this._$AR(n && n._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const n = Rt(t).nextSibling;
      Rt(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, n, o, i) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, s = this, n, o) {
    const i = this.strings;
    let r = !1;
    if (i === void 0) t = V(this, t, s, 0), r = !Q(t) || t !== this._$AH && t !== j, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = i[0], a = 0; a < i.length - 1; a++) c = V(this, l[n + a], s, a), c === j && (c = this._$AH[a]), r || (r = !Q(c) || c !== this._$AH[a]), c === m ? t = m : t !== m && (t += (c ?? "") + i[a + 1]), this._$AH[a] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Re extends pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Te extends pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Oe extends pt {
  constructor(t, s, n, o, i) {
    super(t, s, n, o, i), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = V(this, t, s, 0) ?? m) === j) return;
    const n = this._$AH, o = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, i = t !== m && (n === m || o);
    o && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class De {
  constructor(t, s, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const Le = X.litHtmlPolyfillSupport;
Le?.(tt, et), (X.litHtmlVersions ?? (X.litHtmlVersions = [])).push("3.3.2");
const He = (e, t, s) => {
  const n = s?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const i = s?.renderBefore ?? null;
    n._$litPart$ = o = new et(t.insertBefore(Y(), i), i, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis;
let T = class extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const t = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = He(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return j;
  }
};
T._$litElement$ = !0, T.finalized = !0, Z.litElementHydrateSupport?.({ LitElement: T });
const ze = Z.litElementPolyfillSupport;
ze?.({ LitElement: T });
(Z.litElementVersions ?? (Z.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: St }, We = (e = Be, t, s) => {
  const { kind: n, metadata: o } = s;
  let i = globalThis.litPropertyMetadata.get(o);
  if (i === void 0 && globalThis.litPropertyMetadata.set(o, i = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(s.name, e), n === "accessor") {
    const { name: r } = s;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (n === "setter") {
    const { name: r } = s;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function P(e) {
  return (t, s) => typeof s == "object" ? We(e, t, s) : ((n, o, i) => {
    const r = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, n), r ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(e) {
  return P({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = { CHILD: 2 }, qe = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Ge {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, n) {
    this._$Ct = t, this._$AM = s, this._$Ci = n;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = (e, t) => {
  const s = e._$AN;
  if (s === void 0) return !1;
  for (const n of s) n._$AO?.(t, !1), J(n, t);
  return !0;
}, dt = (e) => {
  let t, s;
  do {
    if ((t = e._$AM) === void 0) break;
    s = t._$AN, s.delete(e), e = t;
  } while (s?.size === 0);
}, le = (e) => {
  for (let t; t = e._$AM; e = t) {
    let s = t._$AN;
    if (s === void 0) t._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(e)) break;
    s.add(e), Ze(t);
  }
};
function Ke(e) {
  this._$AN !== void 0 ? (dt(this), this._$AM = e, le(this)) : this._$AM = e;
}
function Xe(e, t = !1, s = 0) {
  const n = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (t) if (Array.isArray(n)) for (let i = s; i < n.length; i++) J(n[i], !1), dt(n[i]);
  else n != null && (J(n, !1), dt(n));
  else J(this, e);
}
const Ze = (e) => {
  e.type == Ve.CHILD && (e._$AP ?? (e._$AP = Xe), e._$AQ ?? (e._$AQ = Ke));
};
class Je extends Ge {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, s, n) {
    super._$AT(t, s, n), le(this), this.isConnected = t._$AU;
  }
  _$AO(t, s = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), s && (J(this, t), dt(this));
  }
  setValue(t) {
    if (je(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const s = [...this._$Ct._$AH];
      s[this._$Ci] = t, this._$Ct._$AI(s, this, 0);
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
const ce = () => new Ye();
class Ye {
}
const wt = /* @__PURE__ */ new WeakMap(), de = qe(class extends Je {
  render(e) {
    return m;
  }
  update(e, [t]) {
    const s = t !== this.G;
    return s && this.G !== void 0 && this.rt(void 0), (s || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), m;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let s = wt.get(t);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), wt.set(t, s)), s.get(this.G) !== void 0 && this.G.call(this.ht, void 0), s.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? wt.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), ht = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
];
class Ct extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Bt = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function w(e, t) {
  throw new Ct(`${e}: ${t}`);
}
function he(e, t) {
  (!e || typeof e != "object") && w(t, "must be an object with x and y");
  const s = e, n = s.x, o = s.y;
  (typeof n != "number" || !Number.isFinite(n)) && w(`${t}.x`, "must be a finite number"), (typeof o != "number" || !Number.isFinite(o)) && w(`${t}.y`, "must be a finite number");
  const i = n, r = o;
  return (i < 0 || i > 100) && w(`${t}.x`, `must be in range 0-100, got ${i}`), (r < 0 || r > 100) && w(`${t}.y`, `must be in range 0-100, got ${r}`), { x: i, y: r };
}
function Wt(e, t) {
  (typeof e != "string" || !e.length) && w(t, "must be a non-empty string");
  const s = e;
  return Bt.some((o) => s.startsWith(o)) || w(
    t,
    `must start with one of ${Bt.join(", ")} (got "${s.slice(0, 40)}")`
  ), s;
}
function Qe(e, t, s) {
  const n = `nodes[${t}]`;
  (!e || typeof e != "object") && w(n, "must be an object");
  const o = e, i = o.id;
  (typeof i != "string" || !i.length) && w(`${n}.id`, "must be a non-empty string");
  const r = i;
  s.has(r) && w(`${n}.id`, `duplicate node id "${r}"`), s.add(r);
  const l = he(o.position, `${n}.position`), a = { id: r, position: l };
  return typeof o.entity == "string" && (a.entity = o.entity), typeof o.label == "string" && (a.label = o.label), typeof o.color == "string" && (a.color = o.color), typeof o.size == "number" && (a.size = o.size), typeof o.show_label == "boolean" && (a.show_label = o.show_label), typeof o.show_value == "boolean" && (a.show_value = o.show_value), a;
}
function ts(e, t, s, n) {
  const o = `flows[${t}]`;
  (!e || typeof e != "object") && w(o, "must be an object");
  const i = e, r = i.id;
  (typeof r != "string" || !r.length) && w(`${o}.id`, "must be a non-empty string");
  const l = r;
  s.has(l) && w(`${o}.id`, `duplicate flow id "${l}"`), s.add(l);
  const a = i.from_node;
  (typeof a != "string" || !n.has(a)) && w(`${o}.from_node`, `references unknown node "${String(a)}"`);
  const c = i.to_node;
  (typeof c != "string" || !n.has(c)) && w(`${o}.to_node`, `references unknown node "${String(c)}"`);
  const h = i.entity;
  (typeof h != "string" || !h.length) && w(`${o}.entity`, "must be a non-empty entity id");
  const d = i.waypoints;
  Array.isArray(d) || w(`${o}.waypoints`, "must be an array (may be empty)");
  const p = d.map(
    (g, f) => he(g, `${o}.waypoints[${f}]`)
  ), u = {
    id: l,
    from_node: a,
    to_node: c,
    entity: h,
    waypoints: p
  };
  if (typeof i.domain == "string" && (ht.includes(i.domain) || w(`${o}.domain`, `must be one of ${ht.join(", ")}`), u.domain = i.domain), typeof i.color_positive == "string" && (u.color_positive = i.color_positive), typeof i.color_negative == "string" && (u.color_negative = i.color_negative), typeof i.threshold == "number" && (u.threshold = i.threshold), typeof i.reverse == "boolean" && (u.reverse = i.reverse), typeof i.speed_multiplier == "number") {
    const g = i.speed_multiplier;
    (g < 0.1 || g > 5) && w(`${o}.speed_multiplier`, "must be between 0.1 and 5.0"), u.speed_multiplier = g;
  }
  return u;
}
function yt(e) {
  if (!e || typeof e != "object") throw new Ct("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && w("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), ht.includes(t.domain) || w("domain", `must be one of ${ht.join(", ")}`);
  const s = t.background;
  (!s || typeof s != "object") && w("background", "must be an object");
  const n = s, i = { default: Wt(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && w("background.weather_entity", "must be a string entity id"), i.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && w("background.weather_states", "must be an object mapping state strings to image URLs");
    const u = Object.entries(n.weather_states), g = {};
    for (const [f, y] of u)
      g[f] = Wt(y, `background.weather_states.${f}`);
    i.weather_states = g;
  }
  n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && w("background.transition_duration", "must be a number (milliseconds)"), i.transition_duration = n.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || w("nodes", "must be an array");
  const l = /* @__PURE__ */ new Set(), a = r.map((u, g) => Qe(u, g, l));
  a.length === 0 && w("nodes", "at least one node is required");
  const c = t.flows;
  Array.isArray(c) || w("flows", "must be an array");
  const h = /* @__PURE__ */ new Set(), d = c.map(
    (u, g) => ts(u, g, h, l)
  ), p = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: i,
    nodes: a,
    flows: d
  };
  return t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && w("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), p.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && w("fullscreen", "must be a boolean"), p.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && w("edit_mode_password", "must be a string"), p.edit_mode_password = t.edit_mode_password), t.overlays !== void 0 && (Array.isArray(t.overlays) || w("overlays", "must be an array"), p.overlays = t.overlays), p;
}
function D(e, t, s) {
  return e < t ? t : e > s ? s : e;
}
function ut(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function ue(e) {
  let t = 0;
  for (let s = 1; s < e.length; s++) {
    const n = e[s - 1], o = e[s];
    if (!n || !o) continue;
    const i = o.x - n.x, r = o.y - n.y;
    t += Math.sqrt(i * i + r * r);
  }
  return t;
}
function es(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const s = ue(e), n = D(t, 0, 1) * s;
  let o = 0;
  for (let i = 1; i < e.length; i++) {
    const r = e[i - 1], l = e[i], a = l.x - r.x, c = l.y - r.y, h = Math.sqrt(a * a + c * c);
    if (o + h >= n) {
      const d = h === 0 ? 0 : (n - o) / h;
      return { x: r.x + a * d, y: r.y + c * d };
    }
    o += h;
  }
  return { ...e[e.length - 1] };
}
function jt(e, t) {
  if (e.length === 0) return "";
  const [s, ...n] = e;
  if (!s) return "";
  const o = ut(s, t), i = [`M ${o.x.toFixed(2)} ${o.y.toFixed(2)}`];
  for (const r of n) {
    const l = ut(r, t);
    i.push(`L ${l.x.toFixed(2)} ${l.y.toFixed(2)}`);
  }
  return i.join(" ");
}
function Vt(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const s = Number.parseFloat(t);
  return Number.isFinite(s) ? s : 0;
}
function pe(e, t) {
  let s = null, n = null;
  const o = (...i) => {
    n = i, s !== null && clearTimeout(s), s = setTimeout(() => {
      s = null, n && e(...n), n = null;
    }, t);
  };
  return o.cancel = () => {
    s !== null && (clearTimeout(s), s = null), n = null;
  }, o;
}
function fe(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const s = Number.parseInt(t[1], 10), n = Number.parseInt(t[2], 10);
  if (!(!s || !n))
    return s / n;
}
const ss = {
  domain: "energy",
  default_color_positive: "#FFD700",
  default_color_negative: "#4ADE80",
  shape: "dot",
  glow: !0,
  unit_label: "W",
  visibility_threshold: 10,
  speed_curve(e) {
    const t = Math.abs(e);
    if (t <= 0) return 8e3;
    const s = 8e3 - Math.log10(t / 10) * 2e3;
    return D(s, 400, 8e3);
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, ns = {
  domain: "water",
  default_color_positive: "#3B82F6",
  default_color_negative: "#3B82F6",
  shape: "wave",
  glow: !1,
  unit_label: "L/min",
  visibility_threshold: 0.5,
  speed_curve(e) {
    const t = Math.abs(e);
    return D(6e3 - t * 200, 800, 6e3);
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, os = {
  domain: "network",
  default_color_positive: "#10B981",
  default_color_negative: "#F59E0B",
  shape: "square",
  glow: !1,
  unit_label: "Mbps",
  visibility_threshold: 0.1,
  speed_curve(e) {
    return 1500;
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(D(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, is = {
  domain: "hvac",
  default_color_positive: "#A78BFA",
  default_color_negative: "#60A5FA",
  shape: "wave",
  glow: !1,
  unit_label: "CFM",
  visibility_threshold: 10,
  speed_curve(e) {
    const t = Math.abs(e);
    return D(5e3 - t * 10, 600, 5e3);
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return D(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, rs = {
  domain: "gas",
  default_color_positive: "#FB923C",
  default_color_negative: "#FB923C",
  shape: "pulse",
  glow: !0,
  unit_label: "m³/h",
  visibility_threshold: 0.01,
  speed_curve(e) {
    const t = Math.abs(e);
    return D(1e4 - t * 5e4, 2e3, 1e4);
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, ge = {
  domain: "generic",
  default_color_positive: "#A78BFA",
  default_color_negative: "#A78BFA",
  shape: "dot",
  glow: !1,
  unit_label: "",
  visibility_threshold: 1,
  speed_curve(e) {
    const t = Math.abs(e);
    return Math.max(1e3, 5e3 - t * 4);
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, qt = {
  energy: ss,
  water: ns,
  network: os,
  hvac: is,
  gas: rs,
  generic: ge
};
function Pt(e) {
  return e && e in qt ? qt[e] : ge;
}
const x = "http://www.w3.org/2000/svg", ot = "http://www.w3.org/1999/xlink", as = 3, ls = 5, it = 9, cs = 2, ds = 8, hs = 14;
class Gt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = pe(() => this.flushUpdates(), 200);
  }
  async init(t, s) {
    this.container = t, this.config = s, this.flowsById = new Map(s.flows.map((o) => [o.id, o]));
    const n = document.createElementNS(x, "svg");
    n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("preserveAspectRatio", "none"), n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", n.style.overflow = "visible", this.svg = n, t.appendChild(n), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t);
  }
  updateFlow(t, s) {
    this.flowsById.has(t) && (this.latestValues.set(t, s), this.applyUpdate());
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
    const s = document.createElementNS(x, "defs");
    this.svg.appendChild(s);
    const n = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const i = n.get(o.from_node), r = n.get(o.to_node);
      if (!i || !r) continue;
      const a = this.profileFor(o).shape, c = [i.position, ...o.waypoints, r.position], h = `flowme-path-${o.id}`, d = document.createElementNS(x, "path");
      d.setAttribute("id", h), d.setAttribute("d", jt(c, t)), d.setAttribute("fill", "none"), s.appendChild(d);
      const p = document.createElementNS(x, "g");
      p.setAttribute("data-flow-id", o.id);
      const u = document.createElementNS(x, "use");
      u.setAttributeNS(ot, "href", `#${h}`), u.setAttribute("href", `#${h}`), u.setAttribute("stroke", this.primaryColor(o)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(cs)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), p.appendChild(u);
      const g = {
        group: p,
        path: d,
        pathId: h,
        shape: a,
        particles: []
      };
      if (a === "wave") {
        const f = document.createElementNS(x, "use");
        f.setAttributeNS(ot, "href", `#${h}`), f.setAttribute("href", `#${h}`), f.setAttribute("stroke", this.primaryColor(o)), f.setAttribute("stroke-width", String(ds)), f.setAttribute("stroke-opacity", "0.9"), f.setAttribute("stroke-linecap", "round"), f.setAttribute("stroke-linejoin", "round"), f.setAttribute("fill", "none"), f.setAttribute("stroke-dasharray", "14 10"), f.setAttribute("stroke-dashoffset", "0"), f.setAttribute("opacity", "0"), p.appendChild(f), g.waveStroke = f;
      } else a === "pulse" && (g.pulseCircles = []);
      this.svg.appendChild(p), this.flowNodes.set(o.id, g);
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = this.flowNodes.get(n.id);
      if (!o) continue;
      const i = s.get(n.from_node), r = s.get(n.to_node);
      if (!i || !r) continue;
      const l = [i.position, ...n.waypoints, r.position];
      o.path.setAttribute("d", jt(l, t)), o.shape === "pulse" && this.applyFlow(n.id, this.latestValues.get(n.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, s] of this.latestValues)
      this.applyFlow(t, s);
  }
  applyFlow(t, s) {
    const n = this.flowsById.get(t), o = this.flowNodes.get(t);
    if (!n || !o) return;
    const i = this.profileFor(n), r = n.threshold ?? i.visibility_threshold, l = Math.abs(s);
    if (!(l >= r)) {
      this.setGroupVisible(o, !1);
      return;
    }
    this.setGroupVisible(o, !0);
    const c = n.speed_multiplier ?? 1, h = Math.max(50, i.speed_curve(l) * c), d = s < 0 != (n.reverse === !0) ? -1 : 1, p = d > 0 ? n.color_positive ?? i.default_color_positive : n.color_negative ?? i.default_color_negative;
    switch (o.shape) {
      case "wave":
        this.applyWave(o, i, h, p, d);
        break;
      case "pulse":
        this.applyPulse(o, n, i, s, h, p);
        break;
      case "square":
        this.applyParticles(o, n, i, s, h, p, d, "square");
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(o, n, i, s, h, p, d, "dot");
        break;
    }
  }
  setGroupVisible(t, s) {
    const n = s ? "1" : "0";
    for (const o of t.particles) o.shape.setAttribute("opacity", n);
    if (t.waveStroke && t.waveStroke.setAttribute("opacity", s ? "0.9" : "0"), t.pulseCircles)
      for (const o of t.pulseCircles) o.circle.setAttribute("opacity", n);
  }
  applyParticles(t, s, n, o, i, r, l, a) {
    const c = Math.max(
      1,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(o) : as
      )
    );
    if (t.particles.length !== c) {
      for (const d of t.particles) d.shape.remove();
      t.particles = [];
      for (let d = 0; d < c; d++)
        t.particles.push(this.makeParticle(t, a, r, n.glow));
    }
    const h = `${(i / 1e3).toFixed(3)}s`;
    for (let d = 0; d < t.particles.length; d++) {
      const p = t.particles[d];
      if (!p) continue;
      p.shape.setAttribute("fill", r), n.glow && (p.shape.style.color = r);
      const u = document.createElementNS(x, "animateMotion");
      u.setAttribute("repeatCount", "indefinite"), u.setAttribute("dur", h), u.setAttribute("rotate", "auto"), u.setAttribute(
        "begin",
        `${(-i * d / (t.particles.length * 1e3)).toFixed(3)}s`
      ), l < 0 && (u.setAttribute("keyPoints", "1;0"), u.setAttribute("keyTimes", "0;1"));
      const g = document.createElementNS(x, "mpath");
      g.setAttributeNS(ot, "href", `#${t.pathId}`), g.setAttribute("href", `#${t.pathId}`), u.appendChild(g), p.animateMotion.replaceWith(u), p.animateMotion = u, p.shape.appendChild(u);
    }
  }
  applyWave(t, s, n, o, i) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", o);
    const l = r.querySelector("animate");
    l && l.remove();
    const a = document.createElementNS(x, "animate");
    a.setAttribute("attributeName", "stroke-dashoffset"), a.setAttribute("from", i > 0 ? "0" : "-24"), a.setAttribute("to", i > 0 ? "-24" : "0"), a.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), a.setAttribute("repeatCount", "indefinite"), r.appendChild(a);
  }
  applyPulse(t, s, n, o, i, r) {
    if (!this.svg) return;
    const l = t.group, a = new Map(this.config?.nodes.map((f) => [f.id, f]) ?? []), c = a.get(s.from_node), h = a.get(s.to_node);
    if (!c || !h) return;
    const d = [c.position, ...s.waypoints, h.position], p = ue(d), u = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(o) : Math.max(3, Math.floor(p / 15))
      )
    ), g = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== u) {
      if (t.pulseCircles) for (const f of t.pulseCircles) f.circle.remove();
      t.pulseCircles = [];
      for (let f = 0; f < u; f++) {
        const y = document.createElementNS(x, "circle");
        y.setAttribute("r", "0"), y.setAttribute("fill", r), y.setAttribute("opacity", "0"), n.glow && y.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), y.style.color = r;
        const v = document.createElementNS(x, "animate");
        v.setAttribute("attributeName", "r"), v.setAttribute("values", `0;${hs};0`), v.setAttribute("repeatCount", "indefinite"), y.appendChild(v);
        const _ = document.createElementNS(x, "animate");
        _.setAttribute("attributeName", "opacity"), _.setAttribute("values", "0;1;0"), _.setAttribute("repeatCount", "indefinite"), y.appendChild(_), l.appendChild(y), t.pulseCircles.push({ circle: y, animateRadius: v, animateOpacity: _ });
      }
    }
    for (let f = 0; f < t.pulseCircles.length; f++) {
      const y = t.pulseCircles[f];
      if (!y) continue;
      const v = (f + 0.5) / t.pulseCircles.length, _ = es(d, v), k = ut(_, g);
      y.circle.setAttribute("cx", k.x.toFixed(2)), y.circle.setAttribute("cy", k.y.toFixed(2)), y.circle.setAttribute("fill", r), y.circle.style.color = r;
      const st = `${(i / 1e3).toFixed(3)}s`, nt = `${(-i * f / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      y.animateRadius.setAttribute("dur", st), y.animateRadius.setAttribute("begin", nt), y.animateOpacity.setAttribute("dur", st), y.animateOpacity.setAttribute("begin", nt);
    }
  }
  makeParticle(t, s, n, o) {
    let i;
    if (s === "square") {
      const a = document.createElementNS(x, "rect");
      a.setAttribute("width", String(it)), a.setAttribute("height", String(it)), a.setAttribute("x", String(-it / 2)), a.setAttribute("y", String(-it / 2)), a.setAttribute("rx", "1.5"), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), i = a;
    } else {
      const a = document.createElementNS(x, "circle");
      a.setAttribute("r", String(ls)), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), i = a;
    }
    o && (i.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), i.style.color = n);
    const r = document.createElementNS(x, "animateMotion");
    r.setAttribute("repeatCount", "indefinite"), r.setAttribute("dur", "2s");
    const l = document.createElementNS(x, "mpath");
    return l.setAttributeNS(ot, "href", `#${t.pathId}`), l.setAttribute("href", `#${t.pathId}`), r.appendChild(l), i.appendChild(r), t.group.appendChild(i), { shape: i, animateMotion: r };
  }
  profileFor(t) {
    return Pt(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const s = this.profileFor(t);
    return t.color_positive ?? s.default_color_positive;
  }
}
const us = `/* eslint-disable no-undef */
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
`, Kt = "flowme-keyframes", bt = "flowme-cycle", ps = 5, fs = 2;
let F = null, Xt = !1;
function gs() {
  if (document.getElementById(Kt)) return;
  const e = document.createElement("style");
  e.id = Kt, e.textContent = `@keyframes ${bt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function ms() {
  if (Xt) return;
  const t = CSS.registerProperty?.bind(CSS);
  if (!t) return;
  const s = [
    ["--flowme-progress", "<number>", "0"],
    ["--flowme-count", "<number>", "3"],
    ["--flowme-radius", "<number>", "5"],
    ["--flowme-line", "<number>", "2"],
    ["--flowme-amp", "<number>", "4"],
    ["--flowme-direction", "<number>", "1"]
  ];
  for (const [n, o, i] of s)
    try {
      t({ name: n, syntax: o, inherits: !1, initialValue: i });
    } catch {
    }
  Xt = !0;
}
async function ws() {
  if (F) return F;
  const e = CSS.paintWorklet;
  if (!e)
    return F = Promise.reject(new Error("paintWorklet not available")), F;
  const t = new Blob([us], { type: "application/javascript" }), s = URL.createObjectURL(t);
  return F = e.addModule(s).catch((n) => {
    throw F = null, n;
  }).finally(() => {
  }), F;
}
class Zt {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = pe(() => this.flushUpdates(), 120);
  }
  async init(t, s) {
    this.container = t, this.config = s, this.flowsById = new Map(s.flows.map((o) => [o.id, o])), gs(), ms(), await ws();
    const n = document.createElement("div");
    n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", t.appendChild(n), this.wrapper = n;
    for (const o of s.flows) {
      const i = document.createElement("div");
      i.dataset.flowId = o.id, i.style.position = "absolute", i.style.inset = "0", i.style.pointerEvents = "none", i.style.background = "paint(flowme-painter)", i.style.animation = `${bt} 2s linear infinite`, i.style.opacity = "0", n.appendChild(i), this.flowDivs.set(o.id, { el: i });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(t);
  }
  updateFlow(t, s) {
    this.flowsById.has(t) && (this.latestValues.set(t, s), this.applyUpdate());
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
    const t = this.containerSize(), s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = this.flowDivs.get(n.id);
      if (!o) continue;
      const i = s.get(n.from_node), r = s.get(n.to_node);
      if (!i || !r) continue;
      const c = [i.position, ...n.waypoints, r.position].map((h) => ut(h, t)).map((h) => `${h.x.toFixed(1)},${h.y.toFixed(1)}`).join(" ");
      o.el.style.setProperty("--flowme-path", `"${c}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, s] of this.latestValues) this.applyFlow(t, s);
  }
  applyFlow(t, s) {
    const n = this.flowsById.get(t), o = this.flowDivs.get(t);
    if (!n || !o) return;
    const i = this.profileFor(n), r = n.threshold ?? i.visibility_threshold, l = Math.abs(s);
    if (!(l >= r)) {
      o.el.style.opacity = "0";
      return;
    }
    o.el.style.opacity = "1";
    const c = n.speed_multiplier ?? 1, h = Math.max(50, i.speed_curve(l) * c), d = s < 0 != (n.reverse === !0) ? -1 : 1, p = d > 0 ? n.color_positive ?? i.default_color_positive : n.color_negative ?? i.default_color_negative, u = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(s) : 3)
    ), g = i.wave_amplitude_curve ? i.wave_amplitude_curve(s) : 4, f = o.el.style;
    f.setProperty("--flowme-shape", i.shape), f.setProperty("--flowme-color", p), f.setProperty("--flowme-glow", i.glow ? "1" : "0"), f.setProperty("--flowme-count", String(u)), f.setProperty("--flowme-radius", String(ps)), f.setProperty("--flowme-line", String(fs)), f.setProperty("--flowme-amp", String(g)), f.setProperty("--flowme-direction", String(d)), f.animation = `${bt} ${(h / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return Pt(t.domain ?? this.config?.domain);
  }
}
function ys() {
  const e = vs();
  return e === "svg" ? new Gt() : e === "houdini" ? new Zt() : bs() ? new Zt() : new Gt();
}
function bs() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function vs() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
const $s = 100;
class xs {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > $s; ) this.undoStack.shift();
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
function I(e) {
  return JSON.parse(JSON.stringify(e));
}
function M(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function Jt(e, t = 8) {
  return Math.round(e / t) * t;
}
function _s(e) {
  const t = new Set(e.nodes.map((s) => s.id));
  for (let s = 1; s < 1e4; s++) {
    const n = `node_${s}`;
    if (!t.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function As(e) {
  const t = new Set(e.flows.map((s) => s.id));
  for (let s = 1; s < 1e4; s++) {
    const n = `flow_${s}`;
    if (!t.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function Ss(e, t, s) {
  const n = I(e);
  for (const o of n.nodes)
    o.id === t && (o.position = { x: M(s.x), y: M(s.y) });
  return n;
}
function ks(e, t, s) {
  const n = I(e), o = {
    id: _s(e),
    position: { x: M(t.x), y: M(t.y) },
    label: s
  };
  return n.nodes.push(o), { config: n, node: o };
}
function Ms(e, t) {
  const s = I(e);
  return s.nodes = s.nodes.filter((n) => n.id !== t), s.flows = s.flows.filter((n) => n.from_node !== t && n.to_node !== t), s;
}
function Cs(e, t, s, n) {
  const o = I(e);
  for (const i of o.flows)
    if (i.id === t) {
      if (s < 0 || s >= i.waypoints.length) return e;
      i.waypoints[s] = {
        x: M(n.x),
        y: M(n.y)
      };
    }
  return o;
}
function Ps(e, t, s, n) {
  const o = I(e);
  for (const i of o.flows) {
    if (i.id !== t) continue;
    const r = Math.max(0, Math.min(i.waypoints.length, s));
    i.waypoints.splice(r, 0, {
      x: M(n.x),
      y: M(n.y)
    });
  }
  return o;
}
function Es(e, t, s) {
  const n = I(e);
  for (const o of n.flows)
    if (o.id === t) {
      if (s < 0 || s >= o.waypoints.length) return e;
      o.waypoints.splice(s, 1);
    }
  return n;
}
function Ns(e, t, s, n) {
  const o = I(e), i = {
    id: As(e),
    from_node: t,
    to_node: s,
    entity: n,
    waypoints: []
  };
  return o.flows.push(i), { config: o, flow: i };
}
function Is(e, t) {
  const s = I(e);
  return s.flows = s.flows.filter((n) => n.id !== t), s;
}
var Us = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, L = (e, t, s, n) => {
  for (var o = n > 1 ? void 0 : n ? Fs(t, s) : t, i = e.length - 1, r; i >= 0; i--)
    (r = e[i]) && (o = (n ? r(t, s, o) : r(o)) || o);
  return n && o && Us(t, s, o), o;
};
let C = class extends T {
  constructor() {
    super(...arguments), this.canUndo = !1, this.canRedo = !1, this.previewMode = !1, this.suggestPathDisabled = !0, this.undoLabel = "", this.redoLabel = "";
  }
  render() {
    return b`
      <button @click=${() => this.fire("add-node")} title="Add node">+ Node</button>
      <button @click=${() => this.fire("add-flow")} title="Add flow">+ Flow</button>
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
C.styles = At`
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
L([
  P({ type: Boolean })
], C.prototype, "canUndo", 2);
L([
  P({ type: Boolean })
], C.prototype, "canRedo", 2);
L([
  P({ type: Boolean })
], C.prototype, "previewMode", 2);
L([
  P({ type: Boolean })
], C.prototype, "suggestPathDisabled", 2);
L([
  P({ type: String })
], C.prototype, "undoLabel", 2);
L([
  P({ type: String })
], C.prototype, "redoLabel", 2);
C = L([
  Mt("flowme-editor-toolbar")
], C);
const me = 8, Yt = 1, vt = 255;
function Rs(e, t = me) {
  const s = Math.max(1, Math.floor(t)), n = Math.max(1, Math.ceil(e.width / s)), o = Math.max(1, Math.ceil(e.height / s)), i = new Uint16Array(n * o);
  for (let r = 0; r < o; r++) {
    const l = r * s, a = Math.min(e.height, l + s);
    for (let c = 0; c < n; c++) {
      const h = c * s, d = Math.min(e.width, h + s);
      let p = 0;
      for (let g = l; g < a; g++) {
        const f = g * e.width;
        for (let y = h; y < d; y++) {
          const v = e.data[f + y] ?? 0;
          v > p && (p = v);
        }
      }
      const u = vt - p;
      i[r * n + c] = u < Yt ? Yt : u;
    }
  }
  return { cols: n, rows: o, cellSize: s, data: i };
}
function Ts(e, t, s) {
  return s * e.cols + t;
}
function Os(e, t, s) {
  return t < 0 || s < 0 || t >= e.cols || s >= e.rows ? vt : e.data[Ts(e, t, s)] ?? vt;
}
const Ds = 50;
class Ls {
  constructor() {
    this.arr = [];
  }
  push(t) {
    this.arr.push(t), this.bubbleUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return;
    const t = this.arr[0], s = this.arr.pop();
    return this.arr.length > 0 && (this.arr[0] = s, this.sinkDown(0)), t;
  }
  get size() {
    return this.arr.length;
  }
  bubbleUp(t) {
    for (; t > 0; ) {
      const s = t - 1 >> 1;
      if ((this.arr[s]?.f ?? 0) <= (this.arr[t]?.f ?? 0)) return;
      [this.arr[s], this.arr[t]] = [this.arr[t], this.arr[s]], t = s;
    }
  }
  sinkDown(t) {
    const s = this.arr.length;
    for (; ; ) {
      const n = 2 * t + 1, o = 2 * t + 2;
      let i = t;
      if (n < s && (this.arr[n]?.f ?? 0) < (this.arr[i]?.f ?? 0) && (i = n), o < s && (this.arr[o]?.f ?? 0) < (this.arr[i]?.f ?? 0) && (i = o), i === t) return;
      [this.arr[i], this.arr[t]] = [this.arr[t], this.arr[i]], t = i;
    }
  }
}
function Hs(e, t, s) {
  const [n, o] = t, [i, r] = s;
  if (n < 0 || o < 0 || n >= e.cols || o >= e.rows || i < 0 || r < 0 || i >= e.cols || r >= e.rows) return null;
  if (n === i && o === r) return [[n, o]];
  const l = e.cols * e.rows, a = new Float32Array(l);
  a.fill(1 / 0);
  const c = new Int16Array(l), h = new Int16Array(l);
  c.fill(-1), h.fill(-1);
  const d = new Uint8Array(l), p = new Uint8Array(l), u = o * e.cols + n;
  a[u] = 0;
  const g = new Ls();
  g.push({ col: n, row: o, f: Qt(n, o, i, r) });
  const f = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const y = g.pop(), { col: v, row: _ } = y, k = _ * e.cols + v;
    if (!p[k]) {
      if (p[k] = 1, v === i && _ === r)
        return zs(e, c, h, s);
      for (const [st, nt, Et] of f) {
        const H = v + st, z = _ + nt;
        if (H < 0 || z < 0 || H >= e.cols || z >= e.rows) continue;
        const B = z * e.cols + H;
        if (p[B]) continue;
        const we = Os(e, H, z), ye = d[k] && d[k] !== Et ? Ds : 0, gt = (a[k] ?? 1 / 0) + we + ye;
        if (gt < (a[B] ?? 1 / 0)) {
          a[B] = gt, c[B] = v, h[B] = _, d[B] = Et;
          const be = gt + Qt(H, z, i, r);
          g.push({ col: H, row: z, f: be });
        }
      }
    }
  }
  return null;
}
function Qt(e, t, s, n) {
  return Math.abs(e - s) + Math.abs(t - n);
}
function zs(e, t, s, n) {
  const o = [];
  let i = n[0], r = n[1];
  for (; i !== -1 && r !== -1; ) {
    o.push([i, r]);
    const l = r * e.cols + i, a = t[l] ?? -1, c = s[l] ?? -1;
    if (a === i && c === r || (i = a, r = c, i < 0 || r < 0)) break;
  }
  return o.reverse(), o[0]?.[0] === -1 && o.shift(), o;
}
const Bs = 480, Ws = 270, js = 30;
function Vs(e, t, s = Bs, n = Ws) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const o = Math.min(s / e, n / t, 1);
  return {
    width: Math.max(1, Math.floor(e * o)),
    height: Math.max(1, Math.floor(t * o))
  };
}
function qs(e, t, s) {
  const n = new Uint8ClampedArray(t * s);
  for (let o = 0, i = 0; o < e.length; o += 4, i++) {
    const r = e[o] ?? 0, l = e[o + 1] ?? 0, a = e[o + 2] ?? 0;
    n[i] = 0.2126 * r + 0.7152 * l + 0.0722 * a;
  }
  return n;
}
function Gs(e, t, s) {
  const n = new Uint8ClampedArray(e.length);
  for (let i = 0; i < s; i++) {
    const r = i * t;
    for (let l = 0; l < t; l++) {
      const a = e[r + Math.max(0, l - 1)] ?? 0, c = e[r + l] ?? 0, h = e[r + Math.min(t - 1, l + 1)] ?? 0;
      n[r + l] = a + 2 * c + h >> 2;
    }
  }
  const o = new Uint8ClampedArray(e.length);
  for (let i = 0; i < s; i++) {
    const r = i * t, l = Math.max(0, i - 1) * t, a = Math.min(s - 1, i + 1) * t;
    for (let c = 0; c < t; c++) {
      const h = n[l + c] ?? 0, d = n[r + c] ?? 0, p = n[a + c] ?? 0;
      o[r + c] = h + 2 * d + p >> 2;
    }
  }
  return o;
}
function Ks(e, t, s) {
  const n = new Uint8ClampedArray(t * s);
  for (let o = 1; o < s - 1; o++) {
    const i = (o - 1) * t, r = o * t, l = (o + 1) * t;
    for (let a = 1; a < t - 1; a++) {
      const c = e[i + (a - 1)] ?? 0, h = e[i + a] ?? 0, d = e[i + (a + 1)] ?? 0, p = e[r + (a - 1)] ?? 0, u = e[r + (a + 1)] ?? 0, g = e[l + (a - 1)] ?? 0, f = e[l + a] ?? 0, y = e[l + (a + 1)] ?? 0, v = -c - 2 * p - g + d + 2 * u + y, _ = -c - 2 * h - d + g + 2 * f + y;
      let k = Math.sqrt(v * v + _ * _);
      k < js && (k = 0), k > 255 && (k = 255), n[r + a] = k;
    }
  }
  return { width: t, height: s, data: n };
}
function Xs(e, t, s) {
  const n = Vs(t, s), o = document.createElement("canvas");
  o.width = n.width, o.height = n.height;
  const i = o.getContext("2d", { willReadFrequently: !0 });
  if (!i) throw new Error("2D canvas unavailable");
  i.drawImage(e, 0, 0, n.width, n.height);
  try {
    const r = i.getImageData(0, 0, n.width, n.height);
    return { width: n.width, height: n.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function Zs(e, t, s) {
  const { width: n, height: o, rgba: i } = Xs(e, t, s), r = qs(i, n, o), l = Gs(r, n, o);
  return Ks(l, n, o);
}
function Js(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let s = 1; s < e.length - 1; s++) {
    const n = e[s - 1], o = e[s], i = e[s + 1], r = o[0] - n[0], l = o[1] - n[1], a = i[0] - o[0], c = i[1] - o[1];
    r * c - l * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(l) === Math.sign(c) || t.push(o);
  }
  return t.push(e[e.length - 1]), t;
}
const at = /* @__PURE__ */ new Map();
async function Ys(e, t = {}) {
  const s = performance.now(), n = t.cellSize ?? me, o = `${e.imageUrl}|${n}`, i = at.has(o);
  let r = null;
  try {
    r = await Qs(o, e.imageUrl, n);
  } catch {
    r = null;
  }
  if (!r)
    return {
      waypoints: [],
      cached: !1,
      edgesUsable: !1,
      elapsedMs: performance.now() - s
    };
  const l = ee(e.from, r), a = ee(e.to, r), c = Hs(r, l, a);
  return !c || c.length < 2 ? {
    waypoints: [],
    cached: i,
    edgesUsable: !0,
    elapsedMs: performance.now() - s
  } : {
    waypoints: Js(c).slice(1, -1).map((u) => sn(u, r)),
    cached: i,
    edgesUsable: !0,
    elapsedMs: performance.now() - s
  };
}
function Qs(e, t, s) {
  const n = at.get(e);
  if (n) return n;
  const o = tn(t, s).catch((i) => {
    throw at.delete(e), i;
  });
  return at.set(e, o), o;
}
async function tn(e, t) {
  const s = await en(e);
  await te();
  const n = Zs(s, s.naturalWidth, s.naturalHeight);
  return await te(), Rs(n, t);
}
function en(e) {
  return new Promise((t, s) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => t(n), n.onerror = () => s(new Error(`Failed to load background image: ${e}`)), n.src = e;
  });
}
function te() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function ee(e, t) {
  const s = se(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), n = se(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [s, n];
}
function sn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function se(e, t, s) {
  return e < t ? t : e > s ? s : e;
}
var nn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, S = (e, t, s, n) => {
  for (var o = n > 1 ? void 0 : n ? on(t, s) : t, i = e.length - 1, r; i >= 0; i--)
    (r = e[i]) && (o = (n ? r(t, s, o) : r(o)) || o);
  return n && o && nn(t, s, o), o;
};
let $ = class extends T {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = ce(), this.undoStack = new xs((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onToolbarAction = (e) => {
      switch (e.detail.action) {
        case "add-node":
          this.pending = { kind: "add-node" }, this.statusMessage = "Click anywhere on the background to drop a new node.";
          break;
        case "add-flow":
          this.pending = { kind: "add-flow", step: "pick-from" }, this.statusMessage = "Click the source node.";
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
          const s = this.pointerToPercent(e);
          if (!s) return;
          const n = this.config, { config: o, node: i } = ks(n, s, "New node");
          this.pushPatch(n, o, `add node ${i.id}`), this.pending = null, this.statusMessage = `Added node ${i.id}.`;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step === "pick-from" && (this.statusMessage = "Click the source node handle.");
          return;
        }
        this.selectedNodeId = null, this.selectedFlowId = null;
      }
    }, this.onStageContextMenu = (e) => {
      this.pending && (e.preventDefault(), this.pending = null, this.statusMessage = "Cancelled.");
    }, this.onSegmentClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, s = t.dataset.flowId, n = Number(t.dataset.segmentIndex);
      if (!(!s || !Number.isFinite(n))) {
        if (e.shiftKey) {
          const o = this.pointerToPercent(e);
          if (!o) return;
          const i = this.config, r = Ps(i, s, n, o);
          this.pushPatch(i, r, `add waypoint to ${s}`);
          return;
        }
        this.selectedFlowId = s, this.selectedNodeId = null;
      }
    }, this.onNodeClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const s = e.currentTarget.dataset.nodeId;
      if (s) {
        if (this.pending?.kind === "add-flow") {
          if (this.pending.step === "pick-from") {
            this.pending = { kind: "add-flow", step: "pick-to", fromId: s }, this.statusMessage = "Click the destination node.";
            return;
          }
          if (this.pending.step === "pick-to" && this.pending.fromId !== s) {
            const n = window.prompt(
              "Entity for this flow (e.g. sensor.grid_power):",
              "sensor.placeholder_entity"
            ) ?? "sensor.placeholder_entity", o = this.config, { config: i, flow: r } = Ns(o, this.pending.fromId, s, n);
            this.pushPatch(o, i, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
            return;
          }
          this.statusMessage = "Destination must differ from source.";
          return;
        }
        this.selectedNodeId = s, this.selectedFlowId = null;
      }
    }, this.onNodeContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const s = e.currentTarget.dataset.nodeId;
      s && window.confirm(`Delete node ${s}? This also removes any flows using it.`) && this.removeNode(s);
    }, this.onWaypointContextMenu = (e) => {
      if (e.preventDefault(), e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, s = t.dataset.flowId, n = Number(t.dataset.waypointIndex);
      if (!s || !Number.isFinite(n)) return;
      const o = this.config, i = Es(o, s, n);
      this.pushPatch(o, i, `delete waypoint ${n} of ${s}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = e.currentTarget, s = t.dataset.waypointIndex, n = t.dataset.flowId, o = t.dataset.nodeId;
      let i = null;
      o ? i = { kind: "node", id: o } : n && s !== void 0 && (i = { kind: "waypoint", flowId: n, index: Number(s) }), i && (e.preventDefault(), t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = i, this.dragStartConfig = this.config, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.pointerToPercent(e);
      if (!t) return;
      this.dragShiftHeld = e.shiftKey;
      const s = this.dragShiftHeld ? { x: M(Jt(t.x)), y: M(Jt(t.y)) } : t, n = this.dragTarget;
      n.kind === "node" ? this.config = Ss(this.config, n.id, s) : this.config = Cs(this.config, n.flowId, n.index, s);
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const s = this.dragStartConfig, n = this.config, o = this.dragTarget;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, !s || !n || !o || s === n) return;
      const i = o.kind === "node" ? `move node ${o.id}` : `move waypoint ${o.index} of ${o.flowId}`;
      this.pushPatch(s, n, i);
    }, this.onKeyDown = (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const s = e.key.toLowerCase();
      s === "z" && !e.shiftKey ? (e.preventDefault(), this.undoStack.undo()) : (s === "z" && e.shiftKey || s === "y") && (e.preventDefault(), this.undoStack.redo());
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
      this.config = yt(e), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return b`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? b`<pre class="error">${this.errorMessage}</pre>` : m}
        </div>
      `;
    const t = `${1 / (fe(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, s = this.config.background.default;
    return b`
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
        ${this.statusMessage ? b`<div class="status">${this.statusMessage}</div>` : m}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${de(this.stageRef)}
        >
          <div
            class="background"
            style=${s ? `background-image: url('${s}');` : ""}
          ></div>
          <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.config.flows.map((n) => this.renderFlowConnector(n))}
          </svg>
          ${this.config.flows.map((n) => this.renderWaypointHandles(n))}
          ${this.config.nodes.map((n) => this.renderHandle(n))}
          ${this.renderSuggestPreview()}
        </div>
        ${this.renderSuggestBar()}
        ${this.renderInspector()}
        ${this.errorMessage ? b`<pre class="error">${this.errorMessage}</pre>` : m}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return m;
    const t = new Map(this.config.nodes.map((l) => [l.id, l])), s = t.get(e.from_node), n = t.get(e.to_node);
    if (!s || !n) return m;
    const o = [s.position, ...e.waypoints, n.position], i = e.id === this.selectedFlowId, r = [];
    for (let l = 0; l < o.length - 1; l++) {
      const a = o[l], c = o[l + 1];
      !a || !c || r.push(b`
        <line
          class=${`segment ${i ? "selected" : ""}`}
          x1=${a.x}
          y1=${a.y}
          x2=${c.x}
          y2=${c.y}
          data-flow-id=${e.id}
          data-segment-index=${l}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return b`<g>${r}</g>`;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, s) => b`
        <div
          class="waypoint"
          data-flow-id=${e.id}
          data-waypoint-index=${s}
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
  renderHandle(e) {
    const t = e.id === this.selectedNodeId;
    return b`
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
        ${e.label ? b`<span class="handle-label">${e.label}</span>` : m}
      </div>
    `;
  }
  renderInspector() {
    if (!this.config) return m;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((t) => t.id === this.selectedNodeId);
      return e ? b`
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
            <input
              type="text"
              placeholder="sensor.example"
              .value=${e.entity ?? ""}
              @change=${(t) => this.onNodeEntityChange(e.id, t)}
            />
          </label>
          <button class="danger" @click=${() => this.removeNode(e.id)}>Delete node</button>
        </div>
      ` : m;
    }
    if (this.selectedFlowId) {
      const e = this.config.flows.find((t) => t.id === this.selectedFlowId);
      return e ? b`
        <div class="inspector">
          <h4>Flow: ${e.id}</h4>
          <div class="row">
            <span>${e.from_node} → ${e.to_node}</span>
          </div>
          <div class="row">
            <span>Entity: <code>${e.entity}</code></span>
          </div>
          <div class="row">
            <span>${e.waypoints.length} waypoint(s)</span>
          </div>
          <button class="danger" @click=${() => this.removeFlow(e.id)}>Delete flow</button>
        </div>
      ` : m;
    }
    return m;
  }
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || !this.selectedFlowId) {
      this.statusMessage = "Select a flow first — then use Suggest path.";
      return;
    }
    const e = this.config.flows.find((n) => n.id === this.selectedFlowId);
    if (!e) return;
    const t = this.config.nodes.find((n) => n.id === e.from_node), s = this.config.nodes.find((n) => n.id === e.to_node);
    if (!t || !s) {
      this.statusMessage = "Flow is missing a source or destination node.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const n = await Ys({
        imageUrl: this.config.background.default,
        from: t.position,
        to: s.position
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
    const { flowId: e, waypoints: t } = this.suggestPreview, s = this.config, n = {
      ...s,
      flows: s.flows.map(
        (o) => o.id === e ? { ...o, waypoints: t.map((i) => ({ x: i.x, y: i.y })) } : o
      )
    };
    this.suggestPreview = null, this.statusMessage = "Applied suggested waypoints.", this.pushPatch(s, n, `auto-route ${e}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return m;
    const e = this.config.flows.find((i) => i.id === this.suggestPreview.flowId);
    if (!e) return m;
    const t = this.config.nodes.find((i) => i.id === e.from_node), s = this.config.nodes.find((i) => i.id === e.to_node);
    if (!t || !s) return m;
    const o = [
      t.position,
      ...this.suggestPreview.waypoints,
      s.position
    ].map((i) => `${i.x.toFixed(2)},${i.y.toFixed(2)}`).join(" ");
    return b`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${o} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (i) => b`
          <div class="suggest-marker" style=${`left: ${i.x}%; top: ${i.y}%;`}></div>
        `
    )}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? b`
      <div class="suggest-bar">
        <span>Preview — ${this.suggestPreview.waypoints.length} waypoint(s)</span>
        <button @click=${this.acceptSuggestion}>Accept</button>
        <button class="ghost" @click=${this.cancelSuggestion}>Cancel</button>
      </div>
    ` : m;
  }
  // -- inspector edits --
  onNodeLabelChange(e, t) {
    if (!this.config) return;
    const s = t.target.value, n = this.config, o = {
      ...n,
      nodes: n.nodes.map((i) => i.id === e ? { ...i, label: s || void 0 } : i)
    };
    this.pushPatch(n, o, `rename ${e}`);
  }
  onNodeEntityChange(e, t) {
    if (!this.config) return;
    const s = t.target.value, n = this.config, o = {
      ...n,
      nodes: n.nodes.map(
        (i) => i.id === e ? { ...i, entity: s || void 0 } : i
      )
    };
    this.pushPatch(n, o, `edit entity of ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, s = Ms(t, e);
    this.selectedNodeId = null, this.pushPatch(t, s, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, s = Is(t, e);
    this.selectedFlowId = null, this.pushPatch(t, s, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const s = t.getBoundingClientRect();
    if (s.width === 0 || s.height === 0) return null;
    const n = M((e.clientX - s.left) / s.width * 100), o = M((e.clientY - s.top) / s.height * 100);
    return { x: n, y: o };
  }
  pushPatch(e, t, s) {
    try {
      const n = yt(t);
      this.errorMessage = "", this.undoStack.push({ prev: e, next: n, description: s }), this.commitToHa(n);
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
$.styles = At`
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
    .stage.mode-add-node {
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
  `;
S([
  P({ attribute: !1 })
], $.prototype, "hass", 2);
S([
  A()
], $.prototype, "config", 2);
S([
  A()
], $.prototype, "pending", 2);
S([
  A()
], $.prototype, "previewMode", 2);
S([
  A()
], $.prototype, "selectedNodeId", 2);
S([
  A()
], $.prototype, "selectedFlowId", 2);
S([
  A()
], $.prototype, "statusMessage", 2);
S([
  A()
], $.prototype, "errorMessage", 2);
S([
  A()
], $.prototype, "canUndo", 2);
S([
  A()
], $.prototype, "canRedo", 2);
S([
  A()
], $.prototype, "undoLabel", 2);
S([
  A()
], $.prototype, "redoLabel", 2);
S([
  A()
], $.prototype, "suggestPreview", 2);
S([
  A()
], $.prototype, "suggestBusy", 2);
$ = S([
  Mt("flowme-card-editor")
], $);
var rn = Object.defineProperty, an = Object.getOwnPropertyDescriptor, ft = (e, t, s, n) => {
  for (var o = n > 1 ? void 0 : n ? an(t, s) : t, i = e.length - 1, r; i >= 0; i--)
    (r = e[i]) && (o = (n ? r(t, s, o) : r(o)) || o);
  return n && o && rn(t, s, o), o;
};
const ln = "0.1.0";
console.info(
  `%c flowme %c v${ln} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
let q = class extends T {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = ce();
  }
  setConfig(e) {
    try {
      const t = yt(e);
      this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
    } catch (t) {
      const s = t instanceof Ct ? t.message : String(t);
      this.config = void 0, this.errorMessage = s, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    this.teardownRenderer(), super.disconnectedCallback();
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config && (this.teardownRenderer(), this.renderer = ys(), this.rendererReadyFor = this.config, this.renderer.init(t, this.config)), e.has("hass") && this.renderer && this.hass)
      for (const s of this.config.flows) {
        const n = this.hass.states[s.entity], o = Vt(n?.state);
        this.renderer.updateFlow(s.id, o);
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
      return b`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e)
      return b`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    const s = `${1 / (fe(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = this.currentBackgroundUrl();
    return b`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${s};`}
        >
          <div
            class="background"
            style=${n ? `background-image: url('${n}');` : ""}
          ></div>
          <div class="renderer-mount" ${de(this.rendererMount)}></div>
          ${e.nodes.map((o) => this.renderNodeHandle(o))}
          ${(e.overlays ?? []).map((o) => this.renderOverlayPlaceholder(o))}
        </div>
      </ha-card>
    `;
  }
  currentBackgroundUrl() {
    const e = this.config?.background;
    if (!e) return "";
    if (e.weather_entity && e.weather_states && this.hass) {
      const t = this.hass.states[e.weather_entity];
      if (t) {
        const s = e.weather_states[t.state];
        if (s) return s;
      }
    }
    return e.default;
  }
  renderNodeHandle(e) {
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, s = e.show_value !== !1 && !!t, n = e.show_label !== !1 && !!e.label, o = Pt(this.config?.domain), i = e.color ?? o.default_color_positive, r = e.size ?? 12, l = t ? `${o.describe(Vt(t.state))}${o.unit_label ? ` ${o.unit_label}` : ""}` : "";
    return b`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%;`}
      >
        <span
          class="node-dot"
          style=${`background: ${i}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${n ? b`<span class="node-label">${e.label}</span>` : null}
        ${s ? b`<span class="node-value">${l}</span>` : null}
      </div>
    `;
  }
  // v0.5 replaces this with real overlay rendering; for now we render a
  // subtle marker so users see something at the configured position.
  renderOverlayPlaceholder(e) {
    return b`
      <div
        class="overlay-placeholder"
        style=${`left: ${e.position.x}%; top: ${e.position.y}%;`}
        title=${`overlay: ${e.type}`}
      ></div>
    `;
  }
  teardownRenderer() {
    this.renderer && (this.renderer.destroy(), this.renderer = null), this.rendererReadyFor = void 0;
  }
};
q.styles = At`
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
ft([
  P({ attribute: !1 })
], q.prototype, "hass", 2);
ft([
  A()
], q.prototype, "config", 2);
ft([
  A()
], q.prototype, "errorMessage", 2);
q = ft([
  Mt("flowme-card")
], q);
const $t = window;
$t.customCards = $t.customCards ?? [];
$t.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  q as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
