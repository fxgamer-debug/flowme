/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, te = xt.ShadowRoot && (xt.ShadyCSS === void 0 || xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ue = /* @__PURE__ */ new WeakMap();
let Qe = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (te && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = ue.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ue.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mi = (e) => new Qe(typeof e == "string" ? e : e + "", void 0, ee), ie = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Qe(i, e, ee);
}, bi = (e, t) => {
  if (te) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = xt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, he = te ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return mi(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yi, defineProperty: vi, getOwnPropertyDescriptor: wi, getOwnPropertyNames: xi, getOwnPropertySymbols: $i, getPrototypeOf: _i } = Object, H = globalThis, fe = H.trustedTypes, ki = fe ? fe.emptyScript : "", Si = H.reactiveElementPolyfillSupport, dt = (e, t) => e, St = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ki : null;
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
} }, se = (e, t) => !yi(e, t), ge = { attribute: !0, type: String, converter: St, reflect: !1, useDefault: !1, hasChanged: se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let it = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ge) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && vi(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = wi(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const l = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ge;
  }
  static _$Ei() {
    if (this.hasOwnProperty(dt("elementProperties"))) return;
    const t = _i(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(dt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(dt("properties"))) {
      const i = this.properties, s = [...xi(i), ...$i(i)];
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
      for (const n of s) i.unshift(he(n));
    } else t !== void 0 && i.push(he(t));
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
    return bi(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : St).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : St;
      this._$Em = n;
      const l = r.fromAttribute(i, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? se)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
        const { wrapped: r } = o, l = this[n];
        r !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
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
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[dt("elementProperties")] = /* @__PURE__ */ new Map(), it[dt("finalized")] = /* @__PURE__ */ new Map(), Si?.({ ReactiveElement: it }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, me = (e) => e, At = pt.trustedTypes, be = At ? At.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ti = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, ei = "?" + B, Ai = `<${ei}>`, K = document, ft = () => K.createComment(""), gt = (e) => e === null || typeof e != "object" && typeof e != "function", ne = Array.isArray, Ci = (e) => ne(e) || typeof e?.[Symbol.iterator] == "function", Ot = `[ 	
\f\r]`, at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, ve = />/g, W = RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, xe = /"/g, ii = /^(?:script|style|textarea|title)$/i, si = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), m = si(1), $e = si(2), st = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), G = K.createTreeWalker(K, 129);
function ni(e, t) {
  if (!ne(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return be !== void 0 ? be.createHTML(t) : t;
}
const Mi = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = at;
  for (let l = 0; l < i; l++) {
    const a = e[l];
    let d, c, p = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, c = r.exec(a), c !== null); ) u = r.lastIndex, r === at ? c[1] === "!--" ? r = ye : c[1] !== void 0 ? r = ve : c[2] !== void 0 ? (ii.test(c[2]) && (n = RegExp("</" + c[2], "g")), r = W) : c[3] !== void 0 && (r = W) : r === W ? c[0] === ">" ? (r = n ?? at, p = -1) : c[1] === void 0 ? p = -2 : (p = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? W : c[3] === '"' ? xe : we) : r === xe || r === we ? r = W : r === ye || r === ve ? r = at : (r = W, n = void 0);
    const h = r === W && e[l + 1].startsWith("/>") ? " " : "";
    o += r === at ? a + Ai : p >= 0 ? (s.push(d), a.slice(0, p) + ti + a.slice(p) + B + h) : a + B + (p === -2 ? l : h);
  }
  return [ni(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class mt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [d, c] = Mi(t, i);
    if (this.el = mt.createElement(d, s), G.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = G.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(ti)) {
          const u = c[r++], h = n.getAttribute(p).split(B), f = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: f[2], strings: h, ctor: f[1] === "." ? Fi : f[1] === "?" ? Ni : f[1] === "@" ? Ei : Ft }), n.removeAttribute(p);
        } else p.startsWith(B) && (a.push({ type: 6, index: o }), n.removeAttribute(p));
        if (ii.test(n.tagName)) {
          const p = n.textContent.split(B), u = p.length - 1;
          if (u > 0) {
            n.textContent = At ? At.emptyScript : "";
            for (let h = 0; h < u; h++) n.append(p[h], ft()), G.nextNode(), a.push({ type: 2, index: ++o });
            n.append(p[u], ft());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ei) a.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(B, p + 1)) !== -1; ) a.push({ type: 7, index: o }), p += B.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = K.createElement("template");
    return s.innerHTML = t, s;
  }
}
function nt(e, t, i = e, s) {
  if (t === st) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = gt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = nt(e, n._$AS(e, t.values), n, s)), t;
}
class Pi {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? K).importNode(i, !0);
    G.currentNode = n;
    let o = G.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new bt(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Ii(o, this, t)), this._$AV.push(d), a = s[++l];
      }
      r !== a?.index && (o = G.nextNode(), r++);
    }
    return G.currentNode = K, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class bt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = nt(this, t, i), gt(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== st && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ci(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && gt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(K.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = mt.createElement(ni(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Pi(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = _e.get(t.strings);
    return i === void 0 && _e.set(t.strings, i = new mt(t)), i;
  }
  k(t) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new bt(this.O(ft()), this.O(ft()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = me(t).nextSibling;
      me(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = nt(this, t, i, 0), r = !gt(t) || t !== this._$AH && t !== st, r && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = nt(this, l[s + a], i, a), d === st && (d = this._$AH[a]), r || (r = !gt(d) || d !== this._$AH[a]), d === w ? t = w : t !== w && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Fi extends Ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class Ni extends Ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class Ei extends Ft {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = nt(this, t, i, 0) ?? w) === st) return;
    const s = this._$AH, n = t === w && s !== w || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== w && (s === w || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ii {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    nt(this, t);
  }
}
const zi = pt.litHtmlPolyfillSupport;
zi?.(mt, bt), (pt.litHtmlVersions ?? (pt.litHtmlVersions = [])).push("3.3.2");
const Oi = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new bt(t.insertBefore(ft(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis;
let q = class extends it {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Oi(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return st;
  }
};
q._$litElement$ = !0, q.finalized = !0, ut.litElementHydrateSupport?.({ LitElement: q });
const Ti = ut.litElementPolyfillSupport;
Ti?.({ LitElement: q });
(ut.litElementVersions ?? (ut.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Di = { attribute: !0, type: String, converter: St, reflect: !1, hasChanged: se }, Ri = (e = Di, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function yt(e) {
  return (t, i) => typeof i == "object" ? Ri(e, t, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(e) {
  return yt({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Li = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = { CHILD: 2 }, Bi = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Hi {
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
const ht = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const s of i) s._$AO?.(t, !1), ht(s, t);
  return !0;
}, Ct = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, oi = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), Vi(t);
  }
};
function ji(e) {
  this._$AN !== void 0 ? (Ct(this), this._$AM = e, oi(this)) : this._$AM = e;
}
function Wi(e, t = !1, i = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(s)) for (let o = i; o < s.length; o++) ht(s[o], !1), Ct(s[o]);
  else s != null && (ht(s, !1), Ct(s));
  else ht(this, e);
}
const Vi = (e) => {
  e.type == Ui.CHILD && (e._$AP ?? (e._$AP = Wi), e._$AQ ?? (e._$AQ = ji));
};
class Gi extends Hi {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, s) {
    super._$AT(t, i, s), oi(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (ht(this, t), Ct(this));
  }
  setValue(t) {
    if (Li(this._$Ct)) this._$Ct._$AI(t, this);
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
const ri = () => new qi();
class qi {
}
const Tt = /* @__PURE__ */ new WeakMap(), ai = Bi(class extends Gi {
  render(e) {
    return w;
  }
  update(e, [t]) {
    const i = t !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), w;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let i = Tt.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Tt.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? Tt.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Mt = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], Wt = ["corner", "diagonal", "curve", "smooth"], Vt = [
  "dots",
  "dash",
  "pulse",
  "arrow",
  "trail",
  "fluid",
  "spark",
  "none"
], Gt = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], qt = ["auto", "forward", "reverse", "both"], Kt = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], Ki = ["javascript:", "vbscript:", "data:", "file:"];
function li(e, t = "card_config") {
  const i = [], s = /* @__PURE__ */ new WeakSet(), n = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const l = o.trim().toLowerCase();
        for (const a of Ki)
          if (l.startsWith(a)) {
            i.push({ path: r, value: o, scheme: a });
            return;
          }
        return;
      }
      if (typeof o == "object" && !s.has(o)) {
        if (s.add(o), Array.isArray(o)) {
          for (let l = 0; l < o.length; l++) n(o[l], `${r}[${l}]`);
          return;
        }
        for (const [l, a] of Object.entries(o))
          n(a, `${r}.${l}`);
      }
    }
  };
  return n(e, t), i;
}
function Yi(e, t = "card_config") {
  const i = li(e, t);
  if (i.length === 0) return;
  const s = i[0];
  throw new Error(
    `Unsafe URL scheme '${s.scheme}' in ${s.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class re extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const ke = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function v(e, t) {
  throw new re(`${e}: ${t}`);
}
function ae(e, t) {
  (!e || typeof e != "object") && v(t, "must be an object with x and y");
  const i = e, s = i.x, n = i.y;
  (typeof s != "number" || !Number.isFinite(s)) && v(`${t}.x`, "must be a finite number"), (typeof n != "number" || !Number.isFinite(n)) && v(`${t}.y`, "must be a finite number");
  const o = s, r = n;
  return (o < 0 || o > 100) && v(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && v(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function Se(e, t) {
  (typeof e != "string" || !e.length) && v(t, "must be a non-empty string");
  const i = e;
  return ke.some((n) => i.startsWith(n)) || v(
    t,
    `must start with one of ${ke.join(", ")} (got "${i.slice(0, 40)}")`
  ), i;
}
function Ji(e, t, i) {
  const s = `nodes[${t}]`;
  (!e || typeof e != "object") && v(s, "must be an object");
  const n = e, o = n.id;
  (typeof o != "string" || !o.length) && v(`${s}.id`, "must be a non-empty string");
  const r = o;
  i.has(r) && v(`${s}.id`, `duplicate node id "${r}"`), i.add(r);
  const l = ae(n.position, `${s}.position`), a = { id: r, position: l };
  return typeof n.entity == "string" && (a.entity = n.entity), typeof n.label == "string" && (a.label = n.label), typeof n.color == "string" && (a.color = n.color), typeof n.size == "number" && (a.size = n.size), typeof n.show_label == "boolean" && (a.show_label = n.show_label), typeof n.show_value == "boolean" && (a.show_value = n.show_value), n.opacity !== void 0 && (a.opacity = le(n.opacity, `${s}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && v(`${s}.visible`, "must be a boolean"), a.visible = n.visible), a;
}
function Xi(e, t, i, s) {
  const n = `flows[${t}]`;
  (!e || typeof e != "object") && v(n, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && v(`${n}.id`, "must be a non-empty string");
  const l = r;
  i.has(l) && v(`${n}.id`, `duplicate flow id "${l}"`), i.add(l);
  const a = o.from_node;
  (typeof a != "string" || !s.has(a)) && v(`${n}.from_node`, `references unknown node "${String(a)}"`);
  const d = o.to_node;
  (typeof d != "string" || !s.has(d)) && v(`${n}.to_node`, `references unknown node "${String(d)}"`);
  const c = o.entity;
  (typeof c != "string" || !c.length) && v(`${n}.entity`, "must be a non-empty entity id");
  const p = o.waypoints;
  let u = [];
  p !== void 0 && (Array.isArray(p) || v(`${n}.waypoints`, "must be an array (may be empty or omitted)"), u = p.map(
    (f, y) => ae(f, `${n}.waypoints[${y}]`)
  ));
  const h = {
    id: l,
    from_node: a,
    to_node: d,
    entity: c,
    waypoints: u
  };
  if (typeof o.domain == "string" && (Mt.includes(o.domain) || v(`${n}.domain`, `must be one of ${Mt.join(", ")}`), h.domain = o.domain), typeof o.color == "string" && (h.color = o.color), typeof o.color_positive == "string" && (h.color_positive = o.color_positive), typeof o.color_negative == "string" && (h.color_negative = o.color_negative), typeof o.threshold == "number" && (h.threshold = o.threshold), typeof o.reverse == "boolean" && (h.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const f = o.speed_multiplier;
    (f < 0.1 || f > 5) && v(`${n}.speed_multiplier`, "must be between 0.1 and 5.0"), h.speed_multiplier = f;
  }
  return o.opacity !== void 0 && (h.opacity = le(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && v(`${n}.visible`, "must be a boolean"), h.visible = o.visible), o.line_style !== void 0 && (Wt.includes(o.line_style) || v(`${n}.line_style`, `must be one of ${Wt.join(", ")}`), h.line_style = o.line_style), o.speed_curve_override !== void 0 && (h.speed_curve_override = Zi(
    o.speed_curve_override,
    `${n}.speed_curve_override`
  )), o.animation !== void 0 && (h.animation = es(o.animation, `${n}.animation`)), o.value_gradient !== void 0 && (h.value_gradient = is(o.value_gradient, `${n}.value_gradient`)), h;
}
function Zi(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && v(t, "must be an object");
  const i = e, s = {};
  function n(u) {
    const h = i[u];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && v(`${t}.${u}`, "must be a positive finite number"), h;
  }
  function o(u) {
    const h = i[u];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h < 50) && v(`${t}.${u}`, "must be a finite number ≥ 50 (milliseconds)"), h;
  }
  const r = n("threshold");
  r !== void 0 && (s.threshold = r);
  const l = n("p50");
  l !== void 0 && (s.p50 = l);
  const a = n("peak");
  a !== void 0 && (s.peak = a);
  const d = o("max_duration");
  d !== void 0 && (s.max_duration = d);
  const c = o("min_duration");
  if (c !== void 0 && (s.min_duration = c), i.steepness !== void 0) {
    const u = i.steepness;
    (typeof u != "number" || !Number.isFinite(u) || u <= 0) && v(`${t}.steepness`, "must be a positive finite number"), s.steepness = u;
  }
  s.max_duration !== void 0 && s.min_duration !== void 0 && s.min_duration >= s.max_duration && v(t, "min_duration must be < max_duration");
  const p = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const u of Object.keys(i))
    p.has(u) || v(`${t}.${u}`, `unknown key (allowed: ${[...p].join(", ")})`);
  return s;
}
function tt(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e <= 0) && v(t, "must be a positive finite number"), e;
}
function Qi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("defaults", "must be an object");
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = tt(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const s = tt(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    s > 1 && v("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), i.burst_trigger_ratio = s;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = tt(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = tt(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = tt(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = tt(t.line_width, "defaults.line_width")), i;
}
function le(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 1) && v(t, "must be a number between 0 and 1"), e;
}
function ts(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("opacity", "must be an object");
  const t = e, i = {};
  for (const s of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[s] !== void 0 && (i[s] = le(t[s], `opacity.${s}`));
  return i;
}
function es(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && v(t, "must be an object");
  const i = e, s = {};
  i.animation_style !== void 0 && (Vt.includes(i.animation_style) || v(`${t}.animation_style`, `must be one of ${Vt.join(", ")}`), s.animation_style = i.animation_style), i.particle_shape !== void 0 && (Gt.includes(i.particle_shape) || v(`${t}.particle_shape`, `must be one of ${Gt.join(", ")}`), s.particle_shape = i.particle_shape), i.direction !== void 0 && (qt.includes(i.direction) || v(`${t}.direction`, `must be one of ${qt.join(", ")}`), s.direction = i.direction), i.particle_spacing !== void 0 && (Kt.includes(i.particle_spacing) || v(`${t}.particle_spacing`, `must be one of ${Kt.join(", ")}`), s.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && v(`${t}.custom_svg_path`, "must be a string (SVG path d= attribute)"), i.custom_svg_path.length === 0 && console.warn(`[flowme] ${t}.custom_svg_path is empty — will fall back to circle`), s.custom_svg_path = i.custom_svg_path);
  const n = (g, b) => {
    const x = i[g];
    if (x !== void 0)
      return (typeof x != "number" || !Number.isFinite(x) || x <= 0) && v(`${t}.${g}`, "must be a positive finite number"), b !== void 0 && x > b && v(`${t}.${g}`, `must be ≤ ${b}`), x;
  }, o = (g) => {
    const b = i[g];
    if (b !== void 0)
      return typeof b != "boolean" && v(`${t}.${g}`, "must be a boolean"), b;
  }, r = n("particle_size");
  if (r !== void 0 && (s.particle_size = r), i.particle_count !== void 0) {
    const g = i.particle_count;
    (typeof g != "number" || !Number.isFinite(g) || g < 1 || !Number.isInteger(g)) && v(`${t}.particle_count`, "must be a positive integer ≥ 1"), s.particle_count = g;
  }
  if (i.glow_intensity !== void 0) {
    const g = i.glow_intensity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0) && v(`${t}.glow_intensity`, "must be a non-negative finite number"), s.glow_intensity = g;
  }
  const l = o("shimmer");
  l !== void 0 && (s.shimmer = l);
  const a = o("flicker");
  a !== void 0 && (s.flicker = a);
  const d = n("pulse_width");
  d !== void 0 && (s.pulse_width = d);
  const c = n("trail_length");
  if (c !== void 0 && (s.trail_length = c), i.dash_gap !== void 0) {
    const g = i.dash_gap;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 10) && v(`${t}.dash_gap`, "must be a number between 0 and 10"), s.dash_gap = g;
  }
  const p = n("cluster_size");
  p !== void 0 && (s.cluster_size = Math.max(1, Math.round(p)));
  const u = n("cluster_gap");
  u !== void 0 && (s.cluster_gap = u);
  const h = n("pulse_frequency", 20);
  if (h !== void 0 && (s.pulse_frequency = h), i.pulse_ratio !== void 0) {
    const g = i.pulse_ratio;
    (typeof g != "number" || !Number.isFinite(g) || g <= 0 || g >= 1) && v(`${t}.pulse_ratio`, "must be a number between 0 (exclusive) and 1 (exclusive)"), s.pulse_ratio = g;
  }
  const f = n("wave_frequency", 20);
  f !== void 0 && (s.wave_frequency = f);
  const y = n("wave_amplitude");
  return y !== void 0 && (s.wave_amplitude = y), s;
}
function Ae(e, t) {
  return (typeof e != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e)) && v(t, 'must be a CSS hex colour string, e.g. "#FF4500" or "#f00"'), e;
}
function is(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && v(t, "must be an object");
  const i = e;
  typeof i.entity != "string" && v(`${t}.entity`, "must be a string entity id"), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && v(`${t}.low_value`, "must be a finite number"), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && v(`${t}.high_value`, "must be a finite number"), i.low_value >= i.high_value && console.warn(`[flowme] ${t}: low_value should be less than high_value`);
  const s = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: Ae(i.low_color, `${t}.low_color`),
    high_color: Ae(i.high_color, `${t}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || v(`${t}.mode`, "must be one of: flow, line, both"), s.mode = i.mode), s;
}
function ss(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("animation", "must be an object");
  const t = e, i = {};
  if (t.fps !== void 0) {
    const s = t.fps;
    (typeof s != "number" || !Number.isFinite(s) || s < 1 || s > 120) && v("animation.fps", "must be a number between 1 and 120"), i.fps = s;
  }
  return t.smooth_speed !== void 0 && (typeof t.smooth_speed != "boolean" && v("animation.smooth_speed", "must be a boolean"), i.smooth_speed = t.smooth_speed), i;
}
function ns(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("visibility", "must be an object");
  const t = e, i = {};
  for (const s of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[s] !== void 0 && (typeof t[s] != "boolean" && v(`visibility.${s}`, "must be a boolean"), i[s] = t[s]);
  return i;
}
function os(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("domain_colors", "must be an object");
  const t = e, i = {};
  for (const s of ["solar", "grid", "battery", "load"])
    t[s] !== void 0 && (typeof t[s] != "string" && v(`domain_colors.${s}`, "must be a string colour value"), i[s] = t[s]);
  return i;
}
function $t(e) {
  if (!e || typeof e != "object") throw new re("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && v("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), Mt.includes(t.domain) || v("domain", `must be one of ${Mt.join(", ")}`);
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && v("background", "must be an object when provided");
  const s = i ?? {}, o = { default: s.default === void 0 || s.default === "" ? "" : Se(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && v("background.weather_entity", "must be a string entity id"), o.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && v("background.weather_states", "must be an object mapping state strings to image URLs");
    const h = Object.entries(s.weather_states), f = {};
    for (const [y, g] of h)
      f[y] = Se(g, `background.weather_states.${y}`);
    o.weather_states = f;
  }
  s.sun_entity !== void 0 && (typeof s.sun_entity != "string" && v("background.sun_entity", "must be a string entity id (e.g. sun.sun)"), o.sun_entity = s.sun_entity), s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && v("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = s.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || v("nodes", "must be an array");
  const l = /* @__PURE__ */ new Set(), a = r.map((h, f) => Ji(h, f, l));
  a.length === 0 && v("nodes", "at least one node is required");
  const d = t.flows;
  Array.isArray(d) || v("flows", "must be an array");
  const c = /* @__PURE__ */ new Set(), p = d.map(
    (h, f) => Xi(h, f, c, l)
  ), u = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: a,
    flows: p
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && v("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), u.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && v("fullscreen", "must be a boolean"), u.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && v("edit_mode_password", "must be a string"), u.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || v("overlays", "must be an array");
    const h = /* @__PURE__ */ new Set();
    u.overlays = t.overlays.map(
      (f, y) => rs(f, y, h)
    );
  }
  return t.defaults !== void 0 && (u.defaults = Qi(t.defaults)), t.domain_colors !== void 0 && (u.domain_colors = os(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && v("debug", "must be a boolean"), u.debug = t.debug), t.opacity !== void 0 && (u.opacity = ts(t.opacity)), t.visibility !== void 0 && (u.visibility = ns(t.visibility)), t.animation !== void 0 && (u.animation = ss(t.animation)), u;
}
function rs(e, t, i) {
  const s = `overlays[${t}]`;
  (!e || typeof e != "object") && v(s, "must be an object");
  const n = e, o = n.type, l = typeof o == "string" && ["camera", "switch", "sensor", "button"].includes(o);
  !l && o !== "custom" && v(
    `${s}.type`,
    'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.'
  );
  const a = n.id;
  (typeof a != "string" || !a.length) && v(`${s}.id`, "must be a non-empty string"), i.has(a) && v(`${s}.id`, `duplicate overlay id "${a}"`), i.add(a);
  const d = ae(n.position, `${s}.position`);
  if (l) {
    const f = `type: ${o} was removed in v1.0.9. Replace with type: custom and a card: block. See documentation.`;
    console.warn(`[flowme] ${s}: ${f}`);
    const y = {
      id: a,
      type: "custom",
      position: d,
      card: { type: "markdown", content: "" },
      _migration_warning: f
    };
    if (n.size !== void 0) {
      const g = n.size;
      if (g && typeof g == "object") {
        const b = g, x = b.width, _ = b.height;
        typeof x == "number" && typeof _ == "number" && (y.size = { width: x, height: _ });
      }
    }
    return y;
  }
  const c = n.card;
  (!c || typeof c != "object" || Array.isArray(c)) && v(`${s}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  const p = li(c, `${s}.card`);
  if (p.length) {
    const f = p[0];
    v(
      f.path,
      `unsafe URL scheme "${f.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`
    );
  }
  const h = {
    id: a,
    type: "custom",
    position: d,
    card: c
  };
  if (n.size !== void 0) {
    const f = n.size;
    (!f || typeof f != "object") && v(`${s}.size`, "must be an object with width and height");
    const y = f, g = y.width, b = y.height;
    (typeof g != "number" || !Number.isFinite(g) || g <= 0 || g > 100) && v(`${s}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof b != "number" || !Number.isFinite(b) || b <= 0 || b > 100) && v(`${s}.size.height`, "must be a positive number ≤ 100 (percent of card)"), h.size = { width: g, height: b };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && v(`${s}.visible`, "must be a boolean"), h.visible = n.visible), n.opacity !== void 0) {
    const f = n.opacity;
    (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 1) && v(`${s}.opacity`, "must be a number between 0 and 1"), h.opacity = f;
  }
  return h;
}
function ce(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function Ce(e, t, i) {
  return e + (t - e) * i;
}
function Pt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function ci(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const s = e[i - 1], n = e[i];
    if (!s || !n) continue;
    const o = n.x - s.x, r = n.y - s.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function as(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = ci(e), s = ce(t, 0, 1) * i;
  let n = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], l = e[o], a = l.x - r.x, d = l.y - r.y, c = Math.sqrt(a * a + d * d);
    if (n + c >= s) {
      const p = c === 0 ? 0 : (s - n) / c;
      return { x: r.x + a * p, y: r.y + d * p };
    }
    n += c;
  }
  return { ...e[e.length - 1] };
}
function Yt(e, t, i) {
  if (e.length === 0) return "";
  if (e.length === 1) {
    const l = Pt(e[0], t);
    return `M ${l.x.toFixed(2)} ${l.y.toFixed(2)}`;
  }
  const s = e.map((l) => Pt(l, t));
  if (i === "diagonal") {
    const l = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let a = 1; a < s.length; a++)
      l.push(`L ${s[a].x.toFixed(2)} ${s[a].y.toFixed(2)}`);
    return l.join(" ");
  }
  if (i === "corner") {
    const l = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let a = 1; a < s.length; a++) {
      const d = s[a - 1], c = s[a];
      l.push(`L ${c.x.toFixed(2)} ${d.y.toFixed(2)}`), l.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
    }
    return l.join(" ");
  }
  if (i === "curve") {
    const l = s.length, a = [
      { x: 2 * s[0].x - s[1].x, y: 2 * s[0].y - s[1].y },
      ...s,
      { x: 2 * s[l - 1].x - s[l - 2].x, y: 2 * s[l - 1].y - s[l - 2].y }
    ], d = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let c = 1; c < l; c++) {
      const p = a[c - 1], u = a[c], h = a[c + 1], f = a[c + 2], y = u.x + (h.x - p.x) / 6, g = u.y + (h.y - p.y) / 6, b = h.x - (f.x - u.x) / 6, x = h.y - (f.y - u.y) / 6;
      d.push(`C ${y.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} ${x.toFixed(2)} ${h.x.toFixed(2)} ${h.y.toFixed(2)}`);
    }
    return d.join(" ");
  }
  const n = 0.3, o = 20, r = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
  for (let l = 1; l < s.length; l++) {
    const a = s[l - 1], d = s[l], c = s[l + 1];
    if (!c) {
      r.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
      continue;
    }
    const p = Math.sqrt((d.x - a.x) ** 2 + (d.y - a.y) ** 2), u = Math.sqrt((c.x - d.x) ** 2 + (c.y - d.y) ** 2), h = Math.min(Math.min(p, u) * n, o), f = h / (p || 1), y = d.x - (d.x - a.x) * f, g = d.y - (d.y - a.y) * f, b = h / (u || 1), x = d.x + (c.x - d.x) * b, _ = d.y + (c.y - d.y) * b;
    r.push(`L ${y.toFixed(2)} ${g.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${x.toFixed(2)} ${_.toFixed(2)}`);
  }
  return r.join(" ");
}
function Me(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
const Y = 9e3, J = 700, X = 1.5;
function L(e, t) {
  const { threshold: i, p50: s, max_duration: n, min_duration: o, steepness: r } = t, l = Math.abs(e);
  if (!(s > 0) || !(i > 0)) return n;
  const a = Math.max(l, i), d = Math.log10(a / s), c = 1 / (1 + Math.exp(-r * d));
  return n - c * (n - o);
}
function de(e, t) {
  const i = e.speed_curve_override ?? {}, s = i.threshold ?? e.threshold ?? t.threshold, n = i.p50 ?? t.p50, o = i.peak ?? t.peak, r = i.max_duration ?? Y, l = i.min_duration ?? J, a = i.steepness ?? X;
  return { threshold: s, p50: n, peak: o, max_duration: r, min_duration: l, steepness: a };
}
function ls(e, t, i) {
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
    const [r, l] = o[0];
    return { value: e * l, factor: l, matchedUnit: r };
  }
  return { value: e, factor: 1 };
}
function di(e, t) {
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
function cs(e, t, i, s) {
  if (!i) return s;
  const n = t === "below_horizon";
  let o = e;
  n && !e.endsWith("-night") && (o = `${e}-night`);
  const r = i[o];
  if (r) return r;
  if (n && o !== "clear-night") {
    const l = i["clear-night"];
    if (l) return l;
  }
  if (o !== e) {
    const l = i[e];
    if (l) return l;
  }
  return s;
}
function _t(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), s = Number.parseInt(t[2], 10);
  if (!(!i || !s))
    return i / s;
}
function Pe(e) {
  const t = e.replace("#", ""), i = t.length === 3 ? t.split("").map((n) => n + n).join("") : t, s = parseInt(i, 16);
  return [s >> 16 & 255, s >> 8 & 255, s & 255];
}
function Fe(e, t, i) {
  const s = e / 255, n = t / 255, o = i / 255, r = Math.max(s, n, o), l = Math.min(s, n, o), a = (r + l) / 2;
  if (r === l) return [0, 0, a];
  const d = r - l, c = a > 0.5 ? d / (2 - r - l) : d / (r + l);
  let p;
  return r === s ? p = (n - o) / d + (n < o ? 6 : 0) : r === n ? p = (o - s) / d + 2 : p = (s - n) / d + 4, [p * 60, c, a];
}
function Dt(e, t, i) {
  let s = i;
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? e + (t - e) * 6 * s : s < 1 / 2 ? t : s < 2 / 3 ? e + (t - e) * (2 / 3 - s) * 6 : e;
}
function ds(e, t, i) {
  const s = e / 360;
  let n, o, r;
  if (t === 0)
    n = o = r = i;
  else {
    const a = i < 0.5 ? i * (1 + t) : i + t - i * t, d = 2 * i - a;
    n = Dt(d, a, s + 1 / 3), o = Dt(d, a, s), r = Dt(d, a, s - 1 / 3);
  }
  const l = (a) => Math.round(a * 255).toString(16).padStart(2, "0");
  return `#${l(n)}${l(o)}${l(r)}`;
}
function pi(e, t) {
  const i = t.high_value - t.low_value, s = i === 0 ? 0 : Math.max(0, Math.min(1, (e - t.low_value) / i)), [n, o, r] = Pe(t.low_color), [l, a, d] = Pe(t.high_color), [c, p, u] = Fe(n, o, r), [h, f, y] = Fe(l, a, d);
  let g = h - c;
  g > 180 && (g -= 360), g < -180 && (g += 360);
  const b = (c + g * s + 360) % 360, x = Ce(p, f, s), _ = Ce(u, y, s);
  return ds(b, x, _);
}
const ps = {
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
    return L(e, {
      threshold: 30,
      p50: 800,
      max_duration: Y,
      min_duration: J,
      steepness: X
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, us = {
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
    return L(e, {
      threshold: 0.3,
      p50: 6,
      max_duration: Y,
      min_duration: J,
      steepness: X
    });
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, hs = {
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
    return L(e, {
      threshold: 0.05,
      p50: 50,
      max_duration: Y,
      min_duration: J,
      steepness: X
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(ce(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, fs = {
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
    return L(e, {
      threshold: 5,
      p50: 200,
      max_duration: Y,
      min_duration: J,
      steepness: X
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return ce(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, gs = {
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
    return L(e, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: Y,
      min_duration: J,
      steepness: X
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, ui = {
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
    return L(e, {
      threshold: 1,
      p50: 100,
      max_duration: Y,
      min_duration: J,
      steepness: X
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, Ne = {
  energy: ps,
  water: us,
  network: hs,
  hvac: fs,
  gas: gs,
  generic: ui
};
function j(e) {
  return e && e in Ne ? Ne[e] : ui;
}
const ms = "#CCCCCC";
function bs(e, t, i) {
  if (e !== "energy") return;
  const s = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(s)) return i?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(s)) return i?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(s)) return i?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(s))
    return i?.load ?? "#FF8C1E";
}
function ot(e, t, i, s, n) {
  const o = e.color ?? bs(i, e.id, n);
  return s >= 0 ? e.color_positive ?? o ?? t.default_color_positive : e.color_negative ?? o ?? t.default_color_negative;
}
const ys = "[FlowMe]";
let hi = !1;
function vs(e) {
  hi = e;
}
function P(...e) {
  hi && console.warn(ys, ...e);
}
const ws = "[FlowMe Renderer]";
function lt(...e) {
  P(ws, ...e);
}
const A = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xlink";
function xs() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const Rt = xs(), $s = 2e3, Lt = 3, _s = 5, Ut = 2, ks = 14, Ss = 0.9, As = 5e3, ct = 20, Cs = 0.2, Bt = 0.3;
class Jt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = di(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.currentDurMs = /* @__PURE__ */ new Map(), this.targetDurMs = /* @__PURE__ */ new Map(), this.speedTransitionStart = /* @__PURE__ */ new Map(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptiveChange = /* @__PURE__ */ new Map(), this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.frameTimeSamples = [], this.lastFrameForAdaptive = 0;
  }
  async init(t, i) {
    lt("init:", t.getBoundingClientRect(), "flows:", i.flows.length), this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n]));
    const s = document.createElementNS(A, "svg");
    s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("preserveAspectRatio", "none"), s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.overflow = "visible", this.svg = s, t.appendChild(s), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t), this.startFpsLoop();
  }
  updateFlow(t, i) {
    this.flowsById.has(t) && (this.latestValues.set(t, i), this.applyUpdate());
  }
  /**
   * GRADIENT-1: Set the resolved gradient colour for a flow.
   * Called by FlowmeCard whenever the gradient entity's state changes.
   * The colour replaces the normal flow colour in the next render frame.
   * Pass undefined/null to clear and fall back to the flow's own color.
   */
  setGradientColor(t, i) {
    i ? this.gradientColors.set(t, i) : this.gradientColors.delete(t), this.applyUpdate();
  }
  /**
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  startFpsLoop() {
    const i = 1e3 / (this.config?.animation?.fps ?? 60), s = (n) => {
      if (!this.svg) return;
      const o = n - this.lastFrameTime;
      this.sampleFrameTime(), o >= i && (this.lastFrameTime = n - o % i, this.config?.animation?.smooth_speed !== !1 && (this.speedTransitionStart.size > 0 || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(n), this.updateTimeBasedSpacing(n)), this.rafHandle = requestAnimationFrame(s);
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
    const i = document.createElementNS(A, "defs");
    this.svg.appendChild(i);
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const l = [o.position, ...n.waypoints, r.position], a = `flowme-path-${n.id}`, d = document.createElementNS(A, "path");
      d.setAttribute("id", a), d.setAttribute("d", Yt(l, t, n.line_style ?? "corner")), d.setAttribute("fill", "none"), i.appendChild(d);
      const c = document.createElementNS(A, "g");
      c.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && c.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (c.style.display = "none");
      const p = this.config?.defaults?.line_width ?? Ut, u = document.createElementNS(A, "use");
      u.setAttributeNS(U, "href", `#${a}`), u.setAttribute("href", `#${a}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(p)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), c.appendChild(u);
      const h = {
        group: c,
        path: d,
        pathId: a,
        outline: u,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(c), this.flowNodes.set(n.id, h), lt("skeleton:", n.id, "| style=", h.style, "| line_style=", n.line_style ?? "corner (default)");
    }
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
      const l = [o.position, ...s.waypoints, r.position];
      n.path.setAttribute("d", Yt(l, t, s.line_style ?? "corner")), n.style === "pulse" && this.applyFlow(s.id, this.latestValues.get(s.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues)
      this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const s = this.flowsById.get(t), n = this.flowNodes.get(t);
    if (!s || !n) return;
    const o = s.animation ?? {}, r = o.animation_style ?? "dots";
    n.style !== r && (this.teardownStyle(n), n.style = r);
    const l = this.profileFor(s), a = de(s, l), d = Rt ? 0 : a.threshold, c = Math.abs(i), u = o.shimmer === !0 && c < d && c > 0;
    if (!(Rt || c >= d || u)) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const f = Rt ? $s : L(c, a), y = s.speed_multiplier ?? 1;
    let g = Math.max(50, f * y);
    u && (g = g / Cs);
    const b = this.config?.animation?.smooth_speed !== !1;
    g = this.resolveSmoothedDur(t, g, b);
    const x = o.direction ?? "auto";
    let _;
    x === "forward" ? _ = 1 : x === "reverse" ? _ = -1 : _ = i < 0 != (s.reverse === !0) ? -1 : 1;
    let S = _, k = u ? Bt : 1;
    if (b && x === "auto") {
      const It = this.lastDirection.get(t), gi = this.dirChanging.get(t);
      It !== void 0 && It !== _ && !gi && this.dirChanging.set(t, { startMs: performance.now(), oldDir: It, newDir: _ });
      const vt = this.dirChanging.get(t);
      if (vt) {
        const pe = performance.now() - vt.startMs;
        if (pe < 300) {
          const zt = pe / 300;
          zt < 0.5 ? (k = (u ? Bt : 1) * (1 - zt * 2), S = vt.oldDir) : (k = (u ? Bt : 1) * ((zt - 0.5) * 2), S = vt.newDir);
        } else
          this.dirChanging.delete(t), S = _;
      }
    }
    this.lastDirection.set(t, _);
    const I = s.domain ?? this.config?.domain, E = ot(s, l, I, S, this.config?.domain_colors), z = this.gradientColors.get(t), T = s.value_gradient?.mode ?? "flow", Q = z && T !== "line" ? z : E, Et = z && T !== "flow" ? z : E, O = Q;
    n.outline && n.outline.setAttribute("stroke", Et), this.setGroupOpacity(n, k);
    const D = this.updateBurstState(t, c, a, l);
    switch (lt("applyFlow:", t, "style=", r, "dur=", g, "dir=", S, "color=", O), r) {
      case "dots":
        this.applyDots(n, s, l, i, g, O, S, D);
        break;
      case "dash":
        this.applyDash(n, s, g, O, S, D);
        break;
      case "pulse":
        this.applyPulse(n, s, l, i, g, O, D);
        break;
      case "arrow":
        this.applyArrows(n, s, g, O, S, D);
        break;
      case "trail":
        this.applyTrail(n, s, g, O, S, D);
        break;
      case "fluid":
        this.applyFluid(n, s, g, O, S);
        break;
      case "spark":
        this.applySpark(n, s, l, i, g, O, S, D);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, s, l, i, g, O, S, D);
    }
  }
  // ── smooth_speed (ANIM-2) ─────────────────────────────────────────────────
  resolveSmoothedDur(t, i, s) {
    if (!s)
      return this.currentDurMs.set(t, i), this.targetDurMs.set(t, i), i;
    this.targetDurMs.get(t) !== i && (this.speedTransitionStart.set(t, performance.now()), this.targetDurMs.set(t, i));
    const o = this.currentDurMs.get(t) ?? i, r = this.speedTransitionStart.get(t);
    if (r === void 0)
      return this.currentDurMs.set(t, i), i;
    const l = performance.now() - r, a = 500;
    if (l >= a)
      return this.currentDurMs.set(t, i), this.speedTransitionStart.delete(t), i;
    const d = l / a, c = d * d * (3 - 2 * d), p = o + (i - o) * c;
    return this.currentDurMs.set(t, p), p;
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(t, i, s, n) {
    const o = s.peak, r = this.config?.defaults?.burst_trigger_ratio ?? Ss, l = this.config?.defaults?.burst_sustain_ms ?? As, a = o * r;
    if (i < a)
      return this.burstActive.delete(t), this.burstEnteredAt.delete(t), 1;
    let d = this.burstEnteredAt.get(t);
    if (d === void 0 && (d = performance.now(), this.burstEnteredAt.set(t, d)), performance.now() - d < l) return 1;
    const c = n.burst_density_multiplier ?? 1.5;
    return this.burstActive.add(t), c;
  }
  // ── helpers ───────────────────────────────────────────────────────────────
  setGroupOpacity(t, i) {
    const s = String(i);
    for (const n of t.particles) n.shape.setAttribute("opacity", s);
    if (t.particlesBack) for (const n of t.particlesBack) n.shape.setAttribute("opacity", s);
    if (t.lineStroke && t.lineStroke.setAttribute("opacity", i > 0 ? "0.9" : "0"), t.pulseCircles) for (const n of t.pulseCircles) n.circle.setAttribute("opacity", s);
    t.fluidGradient && t.fluidGradient.parentElement?.setAttribute("opacity", s);
  }
  /** Remove all style-specific DOM elements, ready to switch style */
  teardownStyle(t) {
    for (const i of t.particles) i.shape.remove();
    if (t.particles = [], t.particlesBack) {
      for (const i of t.particlesBack) i.shape.remove();
      t.particlesBack = void 0;
    }
    if (t.lineStroke?.remove(), t.lineStroke = void 0, t.pulseCircles) {
      for (const i of t.pulseCircles) i.circle.remove();
      t.pulseCircles = void 0;
    }
    t.fluidGradient?.parentElement?.remove(), t.fluidGradient = void 0;
  }
  sampleFrameTime() {
    const t = performance.now();
    if (this.lastFrameForAdaptive > 0) {
      const i = t - this.lastFrameForAdaptive;
      this.frameTimeSamples.push(i), this.frameTimeSamples.length > 10 && this.frameTimeSamples.shift();
    }
    this.lastFrameForAdaptive = t;
  }
  avgFrameMs() {
    return this.frameTimeSamples.length === 0 ? 16.67 : this.frameTimeSamples.reduce((t, i) => t + i, 0) / this.frameTimeSamples.length;
  }
  resolveParticleCount(t, i, s, n) {
    const o = t.animation ?? {}, l = 1e3 / (this.config?.animation?.fps ?? 60);
    if (o.particle_count !== void 0) return o.particle_count;
    const a = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(s) : Lt)
    ), d = this.config?.defaults?.burst_max_particles ?? ct, c = Math.min(d, Math.max(1, Math.round(a * n))), p = o.animation_style ?? "dots";
    if (p === "dots" || p === "trail") {
      const u = this.adaptiveCount.get(t.id) ?? c, h = this.avgFrameMs(), f = performance.now(), y = this.lastAdaptiveChange.get(t.id) ?? 0;
      if (f - y > 1e3) {
        let b = u;
        h > l * 1.2 && u > 1 ? (b = u - 1, lt("adaptive:", t.id, "reducing particles", u, "→", b, "(avg frame", h.toFixed(1), "ms)")) : h < l * 0.8 && u < c && (b = u + 1, lt("adaptive:", t.id, "restoring particles", u, "→", b)), b !== u && (this.adaptiveCount.set(t.id, b), this.lastAdaptiveChange.set(t.id, f));
      }
      return this.adaptiveCount.get(t.id) ?? c;
    }
    return c;
  }
  resolveParticleRadius(t) {
    return (this.config?.defaults?.dot_radius ?? _s) * (t.animation?.particle_size ?? 1);
  }
  resolveGlow(t, i) {
    return t.animation?.glow_intensity === 0 ? !1 : i.glow;
  }
  glowFilter(t, i, s) {
    return this.resolveGlow(t, i) ? `drop-shadow(0 0 ${(6 * (t.animation?.glow_intensity ?? 1)).toFixed(1)}px ${s})` : "";
  }
  // ── SPACING-1: particle begin-offset computation ─────────────────────────
  /**
   * Compute `begin` offsets (in seconds, negative = pre-delay before cycle
   * start) for all particles given the configured spacing mode.
   *
   * Returns an array of `count` numbers, each representing the `begin`
   * attribute value for `animateMotion`.
   */
  resolveParticleBegins(t, i, s, n) {
    const o = n.particle_spacing ?? "even", r = s / 1e3, l = r / i;
    switch (o) {
      case "even":
      default:
        return Array.from({ length: i }, (a, d) => -(l * d));
      case "random": {
        const a = performance.now(), d = this.randomOffsetsLastUpdate.get(t) ?? 0, c = 3e3;
        let p = this.randomOffsets.get(t);
        if (!p || p.length !== i || a - d > c) {
          const u = l * 0.1, h = [];
          for (let f = 0; f < i; f++) {
            let y, g = 0;
            do
              y = -(Math.random() * r), g++;
            while (g < 20 && h.some((b) => {
              const x = Math.abs((y - b) % r + r) % r;
              return x < u && x > r - u;
            }));
            h.push(y);
          }
          this.randomOffsets.set(t, h), this.randomOffsetsLastUpdate.set(t, a), p = h;
        }
        return p;
      }
      case "clustered": {
        const a = Math.max(1, Math.round(n.cluster_size ?? 3)), d = n.cluster_gap ?? 3, c = l * 0.3, p = [];
        let u = 0;
        for (let h = 0; h < i; h++) {
          const f = h % a;
          h > 0 && f === 0 && (u += c * a * d), p.push(-(u % r)), u += c;
        }
        return p;
      }
      case "pulse": {
        const a = 1 / Math.max(0.01, n.pulse_frequency ?? 1.5), d = n.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % a < a * d ? Array.from({ length: i }, (u, h) => -(l * 0.1 * h)) : Array.from({ length: i }, (u, h) => -(l * h));
      }
      case "wave_spacing": {
        const a = n.wave_frequency ?? 2, d = n.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (c, p) => {
          const u = p / i * Math.PI * 2 * a, h = Math.sin(u) * d * (r / 2);
          return -(l * p + h);
        });
      }
      case "wave_lateral":
        return Array.from({ length: i }, (a, d) => -(l * d));
    }
  }
  /**
   * SPACING-1 wave_lateral: update perpendicular particle offsets each rAF frame.
   *
   * For each particle we:
   * 1. Compute its current progress along the path [0,1]
   * 2. Sample the SVG path at two nearby points to get the local tangent vector
   * 3. Derive the perpendicular (normal) vector: perp = (-dy, dx) normalised
   * 4. Apply sine-wave oscillation along the perpendicular direction:
   *      translate(perp.x * offset, perp.y * offset)
   *
   * This means:
   *   - Horizontal segments: particles oscillate vertically ✓
   *   - Vertical segments:   particles oscillate horizontally ✓
   *   - Diagonal segments:   particles oscillate perpendicular to angle ✓
   *   - Curved segments:     particles follow curvature perpendicular ✓
   */
  updateLateralWaves(t) {
    if (this.config)
      for (const i of this.config.flows) {
        if ((i.animation?.particle_spacing ?? "even") !== "wave_lateral") continue;
        const s = this.flowNodes.get(i.id);
        if (!s || s.particles.length === 0) continue;
        const n = i.animation?.wave_frequency ?? 2, o = i.animation?.wave_amplitude ?? 20, r = s.particles.length, l = Math.PI * 2 / r, a = t * n * 2e-3 % (Math.PI * 2);
        for (let d = 0; d < r; d++) {
          const c = s.particles[d];
          if (!c) continue;
          const p = a + d * l, u = Math.sin(p) * o;
          if (c.shape.getAttribute("data-kind") === "custom_svg") {
            c.shape.hasAttribute("data-base-transform") || c.shape.setAttribute("data-base-transform", c.shape.getAttribute("transform") ?? "");
            const f = c.shape.getAttribute("data-base-transform") ?? "";
            c.shape.setAttribute("transform", `${f} translate(0,${u.toFixed(2)})`);
          } else
            c.shape.setAttribute("transform", `translate(0,${u.toFixed(2)})`);
        }
      }
  }
  /**
   * wave_spacing / pulse: position particles directly via SVGPathElement.getPointAtLength()
   * every rAF frame. This avoids the SVG animateMotion begin= restart problem (calling
   * beginElement() every frame causes visible flashing/zipping).
   *
   * Particles are hidden from animateMotion by setting their animateMotion dur to
   * a very large value and using JS-driven absolute SVG coordinates instead.
   */
  updateTimeBasedSpacing(t) {
    if (this.config)
      for (const i of this.config.flows) {
        const s = i.animation?.particle_spacing ?? "even";
        if (s !== "wave_spacing" && s !== "pulse") continue;
        const n = this.flowNodes.get(i.id);
        if (!n || n.particles.length === 0) continue;
        const o = n.particles.length, l = (this.currentDurMs.get(i.id) ?? 2e3) / 1e3, a = i.animation ?? {}, d = [];
        if (s === "wave_spacing") {
          const u = a.wave_frequency ?? 2, h = Math.min(a.wave_amplitude ?? 0.85, 0.95), f = t * 1e-3 / l, y = [];
          for (let g = 0; g < o; g++) {
            const b = (g / o + f) % 1, x = Math.sin(b * Math.PI * 2 * u) * h * (1 / o);
            y.push(((b + x) % 1 + 1) % 1);
          }
          y.sort((g, b) => g - b), d.push(...y);
        } else {
          const u = a.pulse_frequency ?? 1.5, h = a.pulse_ratio ?? 0.25, f = t * u * 1e-3 % 1, y = t * 1e-3 / l % 1, g = 1 / o;
          let b;
          f < h ? b = 1 - (1 - f / h) * 0.9 : b = (f - h) / (1 - h);
          for (let x = 0; x < o; x++)
            d.push(((y + x * g * b) % 1 + 1) % 1);
        }
        const c = n.path;
        let p = 0;
        try {
          p = c ? c.getTotalLength() : 0;
        } catch {
          p = 0;
        }
        for (let u = 0; u < o; u++) {
          const h = n.particles[u];
          if (!h) continue;
          if (!h.animateMotion.hasAttribute("data-js-driven")) {
            const y = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            y.setAttribute("data-js-driven", "1"), y.setAttribute("begin", "indefinite"), y.setAttribute("dur", "1s"), h.animateMotion.replaceWith(y), h.animateMotion = y, h.shape.appendChild(y);
          }
          const f = d[u] ?? 0;
          if (p > 0 && c)
            try {
              const y = c.getPointAtLength(f * p), g = Math.max(0.5, p * 0.01), b = c.getPointAtLength(Math.max(0, f * p - g)), x = c.getPointAtLength(Math.min(p, f * p + g)), _ = Math.atan2(x.y - b.y, x.x - b.x) * (180 / Math.PI);
              h.shape.setAttribute("transform", `translate(${y.x.toFixed(2)},${y.y.toFixed(2)}) rotate(${_.toFixed(1)})`);
            } catch {
            }
        }
      }
  }
  // ── animation style implementations ──────────────────────────────────────
  /**
   * dots — filled particles moving along path via animateMotion.
   * Supports: circle, square, arrow, teardrop, diamond shapes.
   * Supports: direction, flicker, glow, burst, shimmer.
   */
  applyDots(t, i, s, n, o, r, l, a) {
    const d = i.animation?.direction ?? "auto", c = this.resolveParticleCount(i, s, n, a), p = i.animation?.particle_shape ?? "circle", u = i.animation?.flicker === !0;
    if (t.particles.length !== c || t.particles[0] && this.particleKind(t.particles[0]) !== p) {
      for (const b of t.particles) b.shape.remove();
      t.particles = [];
      for (let b = 0; b < c; b++)
        t.particles.push(this.makeParticle(t, p, r, i, s));
    }
    if (d === "both") {
      if (!t.particlesBack || t.particlesBack.length !== c) {
        if (t.particlesBack) for (const b of t.particlesBack) b.shape.remove();
        t.particlesBack = [];
        for (let b = 0; b < c; b++)
          t.particlesBack.push(this.makeParticle(t, p, r, i, s));
      }
    } else if (t.particlesBack) {
      for (const b of t.particlesBack) b.shape.remove();
      t.particlesBack = void 0;
    }
    const h = `${(o / 1e3).toFixed(3)}s`, f = i.animation ?? {}, y = this.resolveParticleBegins(i.id, c, o, f), g = (b, x) => {
      for (let _ = 0; _ < b.length; _++) {
        const S = b[_];
        this.updateParticleColor(S, r, i, s, u);
        const k = document.createElementNS(A, "animateMotion");
        k.setAttribute("repeatCount", "indefinite"), k.setAttribute("dur", h), k.setAttribute("rotate", "auto"), k.setAttribute("begin", `${(y[_] ?? 0).toFixed(3)}s`), x < 0 && (k.setAttribute("keyPoints", "1;0"), k.setAttribute("keyTimes", "0;1"));
        const I = document.createElementNS(A, "mpath");
        I.setAttributeNS(U, "href", `#${t.pathId}`), I.setAttribute("href", `#${t.pathId}`), k.appendChild(I), S.animateMotion.replaceWith(k), S.animateMotion = k, S.shape.appendChild(k);
      }
    };
    g(t.particles, l), t.particlesBack && g(t.particlesBack, -l);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(t, i, s, n, o, r) {
    for (const b of t.particles) b.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const b = document.createElementNS(A, "use");
      b.setAttributeNS(U, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), b.setAttribute("fill", "none"), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-linejoin", "round"), t.group.appendChild(b), t.lineStroke = b;
    }
    const l = this.config?.defaults?.line_width ?? Ut, d = (i.animation ?? {}).dash_gap ?? 0.5, c = Math.max(0.1, d / r), p = 14, u = p * c, h = this.glowFilter(i, this.profileFor(i), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(l * 2)), t.lineStroke.setAttribute("stroke-dasharray", `${p} ${u}`), h && t.lineStroke.setAttribute("filter", h);
    const f = p + u, y = t.lineStroke.querySelector("animate");
    y && y.remove();
    const g = document.createElementNS(A, "animate");
    g.setAttribute("attributeName", "stroke-dashoffset"), g.setAttribute("from", o > 0 ? "0" : `-${f}`), g.setAttribute("to", o > 0 ? `-${f}` : "0"), g.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), g.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(g);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(t, i, s, n, o, r, l) {
    for (const S of t.particles) S.shape.remove();
    t.particles = [], t.lineStroke?.remove(), t.lineStroke = void 0;
    const a = new Map(this.config?.nodes.map((S) => [S.id, S]) ?? []), d = a.get(i.from_node), c = a.get(i.to_node);
    if (!d || !c) return;
    const p = [d.position, ...i.waypoints, c.position], u = ci(p), h = Math.max(
      2,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Math.max(3, Math.floor(u / 15))
      )
    ), f = this.config?.defaults?.burst_max_particles ?? ct, y = Math.min(f, Math.max(2, Math.round(h * l))), g = this.containerSize(), b = i.animation?.pulse_width ?? 2, x = ks * (i.animation?.particle_size ?? 1), _ = this.resolveGlow(i, s);
    if (!t.pulseCircles || t.pulseCircles.length !== y) {
      if (t.pulseCircles) for (const S of t.pulseCircles) S.circle.remove();
      t.pulseCircles = [];
      for (let S = 0; S < y; S++) {
        const k = document.createElementNS(A, "circle");
        k.setAttribute("r", "0"), k.setAttribute("fill", "none"), k.setAttribute("stroke", r), k.setAttribute("stroke-width", String(b)), k.setAttribute("opacity", "0"), _ && k.setAttribute("filter", this.glowFilter(i, s, r));
        const I = document.createElementNS(A, "animate");
        I.setAttribute("attributeName", "r"), I.setAttribute("values", `0;${x};0`), I.setAttribute("repeatCount", "indefinite"), k.appendChild(I);
        const E = document.createElementNS(A, "animate");
        E.setAttribute("attributeName", "opacity"), E.setAttribute("values", "0;0.9;0"), E.setAttribute("repeatCount", "indefinite"), k.appendChild(E), t.group.appendChild(k), t.pulseCircles.push({ circle: k, animateRadius: I, animateOpacity: E });
      }
    }
    for (let S = 0; S < t.pulseCircles.length; S++) {
      const k = t.pulseCircles[S], I = (S + 0.5) / t.pulseCircles.length, E = as(p, I), z = Pt(E, g);
      k.circle.setAttribute("cx", z.x.toFixed(2)), k.circle.setAttribute("cy", z.y.toFixed(2)), k.circle.setAttribute("stroke", r);
      const T = `${(o / 1e3).toFixed(3)}s`, Q = `${(-o * S / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      k.animateRadius.setAttribute("values", `0;${x};0`), k.animateRadius.setAttribute("dur", T), k.animateRadius.setAttribute("begin", Q), k.animateOpacity.setAttribute("dur", T), k.animateOpacity.setAttribute("begin", Q);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(t, i, s, n, o, r) {
    const l = this.profileFor(i), a = i.animation?.particle_count ?? Lt, d = this.config?.defaults?.burst_max_particles ?? ct, c = Math.min(d, Math.max(1, Math.round(a * r))), p = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++)
        t.particles.push(this.makeParticle(t, "arrow", n, i, l));
    }
    const u = `${(s / 1e3).toFixed(3)}s`, h = this.resolveParticleBegins(i.id, c, s, i.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const y = t.particles[f];
      this.updateParticleColor(y, n, i, l, p);
      const g = document.createElementNS(A, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(h[f] ?? 0).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(A, "mpath");
      b.setAttributeNS(U, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), g.appendChild(b), y.animateMotion.replaceWith(g), y.animateMotion = g, y.shape.appendChild(g);
    }
  }
  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
   */
  applyTrail(t, i, s, n, o, r) {
    const l = this.profileFor(i), a = i.animation?.particle_count ?? Lt, d = this.config?.defaults?.burst_max_particles ?? ct, c = Math.min(d, Math.max(1, Math.round(a * r))), p = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++)
        t.particles.push(this.makeParticle(t, "teardrop", n, i, l));
    }
    const u = `${(s / 1e3).toFixed(3)}s`, h = this.resolveParticleBegins(i.id, c, s, i.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const y = t.particles[f];
      this.updateParticleColor(y, n, i, l, p);
      const g = document.createElementNS(A, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(h[f] ?? 0).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(A, "mpath");
      b.setAttributeNS(U, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), g.appendChild(b), y.animateMotion.replaceWith(g), y.animateMotion = g, y.shape.appendChild(g);
    }
  }
  /**
   * fluid — continuous gradient flowing along the line.
   * Implemented as an animated stroke-dashoffset on a wide stroke.
   */
  applyFluid(t, i, s, n, o) {
    for (const c of t.particles) c.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const c = document.createElementNS(A, "use");
      c.setAttributeNS(U, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), c.setAttribute("fill", "none"), c.setAttribute("stroke-linecap", "round"), t.group.appendChild(c), t.lineStroke = c;
    }
    const r = (this.config?.defaults?.line_width ?? Ut) * 3, l = this.glowFilter(i, this.profileFor(i), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(r)), t.lineStroke.setAttribute("stroke-dasharray", "50 200"), l && t.lineStroke.setAttribute("filter", l);
    const a = t.lineStroke.querySelector("animate");
    a && a.remove();
    const d = document.createElementNS(A, "animate");
    d.setAttribute("attributeName", "stroke-dashoffset"), d.setAttribute("from", o > 0 ? "0" : "-250"), d.setAttribute("to", o > 0 ? "-250" : "0"), d.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), d.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(d);
  }
  /**
   * spark — particles with randomised size/opacity, slight scatter.
   * Scatter is achieved via SVG transform on each particle's <g> wrapper.
   */
  applySpark(t, i, s, n, o, r, l, a) {
    const d = this.resolveParticleCount(i, s, n, a), c = Math.min(
      this.config?.defaults?.burst_max_particles ?? ct,
      Math.round(d * a)
    ), p = i.animation?.particle_shape ?? "circle", u = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++) {
        const y = this.makeParticle(t, p, r, i, s), g = 0.7 + Math.random() * 0.6;
        y.shape.setAttribute("transform", `scale(${g.toFixed(2)})`), t.particles.push(y);
      }
    }
    const h = `${(o / 1e3).toFixed(3)}s`;
    for (let f = 0; f < t.particles.length; f++) {
      const y = t.particles[f], g = 0.5 + Math.random() * 0.5;
      y.shape.setAttribute("opacity", String(g.toFixed(2))), this.updateParticleColor(y, r, i, s, u);
      const b = document.createElementNS(A, "animateMotion");
      b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", h), b.setAttribute("rotate", "auto"), b.setAttribute("begin", `${(-o * f / (t.particles.length * 1e3)).toFixed(3)}s`), l < 0 && (b.setAttribute("keyPoints", "1;0"), b.setAttribute("keyTimes", "0;1"));
      const x = document.createElementNS(A, "mpath");
      x.setAttributeNS(U, "href", `#${t.pathId}`), x.setAttribute("href", `#${t.pathId}`), b.appendChild(x), y.animateMotion.replaceWith(b), y.animateMotion = b, y.shape.appendChild(b);
    }
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(t) {
    const i = t.shape.tagName.toLowerCase();
    return i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? t.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : i === "path" ? t.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  makeParticle(t, i, s, n, o) {
    const r = this.resolveParticleRadius(n), l = this.resolveGlow(n, o);
    let a, d = !1;
    switch (i) {
      case "square": {
        const u = r * 2, h = document.createElementNS(A, "rect");
        h.setAttribute("width", String(u)), h.setAttribute("height", String(u)), h.setAttribute("x", String(-u / 2)), h.setAttribute("y", String(-u / 2)), h.setAttribute("rx", "1.5"), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), a = h;
        break;
      }
      case "arrow": {
        const u = r * 2.2, h = r * 1.5, f = document.createElementNS(A, "polygon");
        f.setAttribute("points", `${u},0 ${-u * 0.4},${h} 0,0 ${-u * 0.4},${-h}`), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), f.setAttribute("data-kind", "arrow"), a = f;
        break;
      }
      case "teardrop": {
        const u = n.animation?.trail_length ?? 2, h = r, f = r * u, y = document.createElementNS(A, "ellipse");
        y.setAttribute("rx", String(h)), y.setAttribute("ry", String(f)), y.setAttribute("cy", String(-f * 0.3)), y.setAttribute("fill", s), y.setAttribute("opacity", "0"), a = y;
        break;
      }
      case "diamond": {
        const u = r * 1.4, h = document.createElementNS(A, "polygon");
        h.setAttribute("points", `0,${-u} ${u},0 0,${u} ${-u},0`), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "diamond"), a = h;
        break;
      }
      case "custom_svg": {
        const u = n.animation?.custom_svg_path ?? "";
        if (!u) {
          console.warn(`[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${n.id}`);
          const f = document.createElementNS(A, "circle");
          f.setAttribute("r", String(r)), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), a = f;
          break;
        }
        const h = document.createElementNS(A, "path");
        h.setAttribute("d", u), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "custom_svg"), t.group.appendChild(h), d = !0;
        try {
          const f = h.getBBox(), y = Math.max(f.width, f.height, 1), b = r * 2 / y, x = -(f.x + f.width / 2), _ = -(f.y + f.height / 2);
          h.setAttribute("transform", `scale(${b.toFixed(4)}) translate(${x.toFixed(4)},${_.toFixed(4)})`);
        } catch {
        }
        a = h;
        break;
      }
      default: {
        const u = document.createElementNS(A, "circle");
        u.setAttribute("r", String(r)), u.setAttribute("fill", s), u.setAttribute("opacity", "0"), a = u;
      }
    }
    l && (a.setAttribute("filter", this.glowFilter(n, o, s)), a.style.color = s);
    const c = document.createElementNS(A, "animateMotion");
    c.setAttribute("repeatCount", "indefinite"), c.setAttribute("dur", "2s");
    const p = document.createElementNS(A, "mpath");
    return p.setAttributeNS(U, "href", `#${t.pathId}`), p.setAttribute("href", `#${t.pathId}`), c.appendChild(p), a.appendChild(c), d || t.group.appendChild(a), { shape: a, animateMotion: c };
  }
  updateParticleColor(t, i, s, n, o) {
    if (t.shape.setAttribute("fill", i), t.shape.style.color = i, this.resolveGlow(s, n) && t.shape.setAttribute("filter", this.glowFilter(s, n, i)), t.shape.setAttribute("opacity", "1"), o) {
      if (!t.flickerAnim) {
        const u = document.createElementNS(A, "animate");
        u.setAttribute("attributeName", "opacity"), u.setAttribute("repeatCount", "indefinite"), t.shape.appendChild(u), t.flickerAnim = u;
      }
      const d = (1 / (2 + Math.random() * 6)).toFixed(3), c = (0.85 + Math.random() * 0.1).toFixed(2), p = (0.95 + Math.random() * 0.05).toFixed(2);
      t.flickerAnim.setAttribute("values", `${p};${c};${p}`), t.flickerAnim.setAttribute("dur", `${d}s`);
    } else t.flickerAnim && (t.flickerAnim.remove(), t.flickerAnim = void 0);
  }
  profileFor(t) {
    return j(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t), s = t.domain ?? this.config?.domain;
    return ot(t, i, s, 1, this.config?.domain_colors);
  }
}
const Ms = `/* eslint-disable no-undef */
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
`, Ee = "flowme-keyframes", Xt = "flowme-cycle", Ps = 5, Fs = 2;
let V = null, Ie = !1;
function Ns() {
  if (document.getElementById(Ee)) return;
  const e = document.createElement("style");
  e.id = Ee, e.textContent = `@keyframes ${Xt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function Es() {
  if (Ie) return;
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
  Ie = !0;
}
async function Is() {
  if (V) return V;
  const e = CSS.paintWorklet;
  if (!e)
    return V = Promise.reject(new Error("paintWorklet not available")), V;
  const t = new Blob([Ms], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return V = e.addModule(i).catch((s) => {
    throw V = null, s;
  }).finally(() => {
  }), V;
}
class zs {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = di(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n])), Ns(), Es(), await Is();
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", t.appendChild(s), this.wrapper = s;
    for (const n of i.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = n.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Xt} 2s linear infinite`, o.style.opacity = "0", s.appendChild(o), this.flowDivs.set(n.id, { el: o });
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
      const d = [o.position, ...s.waypoints, r.position].map((c) => Pt(c, t)).map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
      n.el.style.setProperty("--flowme-path", `"${d}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues) this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const s = this.flowsById.get(t), n = this.flowDivs.get(t);
    if (!s || !n) return;
    const o = this.profileFor(s), r = de(s, o), l = Math.abs(i);
    if (!(l >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = s.speed_multiplier ?? 1, c = Math.max(50, L(l, r) * d), p = i < 0 != (s.reverse === !0) ? -1 : 1, u = s.domain ?? this.config?.domain, h = ot(s, o, u, p, this.config?.domain_colors), f = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(i) : 3)
    ), y = o.wave_amplitude_curve ? o.wave_amplitude_curve(i) : 4, g = n.el.style;
    g.setProperty("--flowme-shape", o.shape), g.setProperty("--flowme-color", h), g.setProperty("--flowme-glow", o.glow ? "1" : "0"), g.setProperty("--flowme-count", String(f)), g.setProperty("--flowme-radius", String(Ps)), g.setProperty("--flowme-line", String(Fs)), g.setProperty("--flowme-amp", String(y)), g.setProperty("--flowme-direction", String(p)), g.animation = `${Xt} ${(c / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return j(t.domain ?? this.config?.domain);
  }
}
function Os() {
  const e = Ds(), t = e ?? "svg", i = Ts();
  return P(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    i,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? i ? new zs() : (P("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Jt()) : new Jt();
}
function Ts() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function Ds() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function ze(e) {
  const t = e.size?.width ?? 20, i = e.size?.height ?? 15;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function Rs(e, t) {
  P(
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
        style=${ze(e) + n}
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
      style=${ze(e) + n}
    >
      <flowme-custom-overlay
        .hass=${t}
        .card=${e.card}
      ></flowme-custom-overlay>
    </div>
    ${w}
  `;
}
let Ht = null, et = null;
async function Ls() {
  if (Ht) return Ht;
  if (et) return et;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (et = t().then((i) => (Ht = i, et = null, i)).catch((i) => {
    throw et = null, i;
  }), et);
}
async function Us(e) {
  const t = await Ls();
  return t ? t.createCardElement(e) : null;
}
var Bs = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, Nt = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Hs(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Bs(t, i, n), n;
};
let rt = class extends q {
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
        Yi(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, Us(e).then((i) => {
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
rt.styles = ie`
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
Nt([
  yt({ attribute: !1 })
], rt.prototype, "hass", 2);
Nt([
  yt({ attribute: !1 })
], rt.prototype, "card", 2);
Nt([
  M()
], rt.prototype, "errorMessage", 2);
rt = Nt([
  oe("flowme-custom-overlay")
], rt);
const js = 100;
class Ws {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > js; ) this.undoStack.shift();
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
function N(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function wt(e, t = 8) {
  return Math.round(e / t) * t;
}
function Vs(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `node_${i}`;
    if (!t.has(s)) return s;
  }
  return `node_${Date.now()}`;
}
function Gs(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `flow_${i}`;
    if (!t.has(s)) return s;
  }
  return `flow_${Date.now()}`;
}
function qs(e, t, i) {
  const s = $(e);
  for (const n of s.nodes)
    n.id === t && (n.position = { x: N(i.x), y: N(i.y) });
  return s;
}
function Ks(e, t, i) {
  const s = $(e), n = {
    id: Vs(e),
    position: { x: N(t.x), y: N(t.y) },
    label: i
  };
  return s.nodes.push(n), { config: s, node: n };
}
function Ys(e, t) {
  const i = $(e);
  return i.nodes = i.nodes.filter((s) => s.id !== t), i.flows = i.flows.filter((s) => s.from_node !== t && s.to_node !== t), i;
}
function Js(e, t) {
  const i = $(e);
  for (const s of i.nodes) {
    const n = t.get(s.id);
    n && (s.position = { x: N(n.x), y: N(n.y) });
  }
  return i;
}
function Xs(e, t) {
  const i = $(e);
  return i.nodes = i.nodes.filter((s) => !t.has(s.id)), i.flows = i.flows.filter((s) => !t.has(s.from_node) && !t.has(s.to_node)), i;
}
function Oe(e, t, i) {
  const s = $(e);
  for (const n of s.nodes)
    t.has(n.id) && (n.visible = i);
  return s;
}
function Zs(e, t, i) {
  const s = e.nodes.find((o) => o.id === i);
  if (!s) return e;
  const n = $(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, y: s.position.y });
  return n;
}
function Qs(e, t, i) {
  const s = e.nodes.find((o) => o.id === i);
  if (!s) return e;
  const n = $(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, x: s.position.x });
  return n;
}
function jt(e, t, i, s) {
  const n = $(e);
  for (const o of n.flows)
    if (o.id === t) {
      if (i < 0 || i >= o.waypoints.length) return e;
      o.waypoints[i] = {
        x: N(s.x),
        y: N(s.y)
      };
    }
  return n;
}
function Te(e, t, i, s) {
  const n = $(e);
  for (const o of n.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, i));
    o.waypoints.splice(r, 0, {
      x: N(s.x),
      y: N(s.y)
    });
  }
  return n;
}
function De(e, t, i) {
  const s = $(e);
  for (const n of s.flows)
    if (n.id === t) {
      if (i < 0 || i >= n.waypoints.length) return e;
      n.waypoints.splice(i, 1);
    }
  return s;
}
function Re(e, t, i, s) {
  const n = $(e), o = {
    id: Gs(e),
    from_node: t,
    to_node: i,
    entity: s,
    waypoints: []
  };
  return n.flows.push(o), { config: n, flow: o };
}
function tn(e, t) {
  const i = $(e);
  return i.flows = i.flows.filter((s) => s.id !== t), i;
}
function en(e, t) {
  const i = $(e);
  return i.background.default = t, i;
}
function sn(e, t) {
  const i = $(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function nn(e, t) {
  const i = $(e);
  return t && t.length ? i.background.sun_entity = t : delete i.background.sun_entity, i;
}
function on(e, t) {
  const i = $(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function Le(e, t, i) {
  var n;
  const s = $(e);
  return (n = s.background).weather_states ?? (n.weather_states = {}), s.background.weather_states[t] = i, s;
}
function rn(e, t) {
  const i = $(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function an(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `overlay_${i}`;
    if (!t.has(s)) return s;
  }
  return `overlay_${Date.now()}`;
}
function ln(e, t) {
  const i = $(e), s = t.id ?? an(e), n = {
    ...t,
    id: s,
    position: {
      x: N(t.position.x),
      y: N(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function cn(e, t) {
  const i = $(e);
  return i.overlays = (i.overlays ?? []).filter((s) => s.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function dn(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && (n.position = { x: N(i.x), y: N(i.y) });
  return s;
}
function Ue(e, t, i) {
  const s = $(e), n = Math.max(2, Math.min(100, i.width)), o = Math.max(2, Math.min(100, i.height));
  for (const r of s.overlays ?? [])
    r.id === t && (r.size = { width: n, height: o });
  return s;
}
function pn(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && i && (n.card = i);
  return s;
}
function un(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && (i ? delete n.visible : n.visible = !1);
  return s;
}
function hn(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    if (n.id === t) {
      const o = Math.max(0, Math.min(1, i));
      o === 1 ? delete n.opacity : n.opacity = o;
    }
  return s;
}
function Be(e, t, i) {
  const s = $(e);
  return s.opacity = { ...s.opacity, [t]: i }, s;
}
function fn(e, t, i) {
  const s = $(e);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function gn(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function mn(e, t, i) {
  const s = $(e);
  return s.defaults = { ...s.defaults, [t]: i }, s;
}
function bn(e, t, i) {
  if (t === i) return e;
  const s = $(e), n = s.background.weather_states;
  if (!n || !(t in n)) return e;
  const o = n[t];
  return o === void 0 ? e : (delete n[t], n[i] = o, s);
}
function yn(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 || i === "corner" ? delete o.line_style : o.line_style = i, o;
  }), s;
}
function He(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.color : o.color = i, o;
  }), s;
}
function vn(e, t, i) {
  const s = $(e);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i ? delete o.visible : o.visible = !1, o;
  }), s;
}
function wn(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i ? delete o.visible : o.visible = !1, o;
  }), s;
}
function xn(e, t, i) {
  const s = $(e);
  return s.visibility = { ...s.visibility, [t]: i }, s;
}
function je(e, t, i) {
  const s = $(e);
  return i === void 0 ? s.domain_colors && (delete s.domain_colors[t], Object.keys(s.domain_colors).length === 0 && delete s.domain_colors) : s.domain_colors = { ...s.domain_colors, [t]: i }, s;
}
function We(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => n.id !== t ? n : { ...n, speed_curve_override: { ...n.speed_curve_override, ...i } }), s;
}
function $n(e, t) {
  const i = $(e);
  return i.flows = i.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.speed_curve_override, n;
  }), i;
}
function _n(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n.animation, ...i };
    for (const r of Object.keys(o))
      o[r] === void 0 && delete o[r];
    if (Object.keys(o).length === 0) {
      const r = { ...n };
      return delete r.animation, r;
    }
    return { ...n, animation: o };
  }), s;
}
function kn(e, t) {
  const i = $(e);
  return i.flows = i.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.animation, n;
  }), i;
}
function Ve(e, t) {
  const i = $(e);
  return i.animation = { ...i.animation, ...t }, i;
}
function Sn(e, t, i) {
  const s = $(e), n = s.flows.find((o) => o.id === t);
  return n && (n.value_gradient = i), s;
}
function An(e, t, i) {
  const s = $(e), n = s.flows.find((o) => o.id === t);
  return n && (n.value_gradient = { ...n.value_gradient, ...i }), s;
}
function Ge(e, t) {
  const i = $(e), s = i.flows.find((n) => n.id === t);
  return s && delete s.value_gradient, i;
}
const fi = 8, qe = 1, Zt = 255;
function Cn(e, t = fi) {
  const i = Math.max(1, Math.floor(t)), s = Math.max(1, Math.ceil(e.width / i)), n = Math.max(1, Math.ceil(e.height / i)), o = new Uint16Array(s * n);
  for (let r = 0; r < n; r++) {
    const l = r * i, a = Math.min(e.height, l + i);
    for (let d = 0; d < s; d++) {
      const c = d * i, p = Math.min(e.width, c + i);
      let u = 0;
      for (let f = l; f < a; f++) {
        const y = f * e.width;
        for (let g = c; g < p; g++) {
          const b = e.data[y + g] ?? 0;
          b > u && (u = b);
        }
      }
      const h = Zt - u;
      o[r * s + d] = h < qe ? qe : h;
    }
  }
  return { cols: s, rows: n, cellSize: i, data: o };
}
function Mn(e, t, i) {
  return i * e.cols + t;
}
function Pn(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? Zt : e.data[Mn(e, t, i)] ?? Zt;
}
const Fn = 50;
class Nn {
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
function En(e, t, i) {
  const [s, n] = t, [o, r] = i;
  if (s < 0 || n < 0 || s >= e.cols || n >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (s === o && n === r) return [[s, n]];
  const l = e.cols * e.rows, a = new Float32Array(l);
  a.fill(1 / 0);
  const d = new Int16Array(l), c = new Int16Array(l);
  d.fill(-1), c.fill(-1);
  const p = new Uint8Array(l), u = new Uint8Array(l), h = n * e.cols + s;
  a[h] = 0;
  const f = new Nn();
  f.push({ col: s, row: n, f: Ke(s, n, o, r) });
  const y = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const g = f.pop(), { col: b, row: x } = g, _ = x * e.cols + b;
    if (!u[_]) {
      if (u[_] = 1, b === o && x === r)
        return In(e, d, c, i);
      for (const [S, k, I] of y) {
        const E = b + S, z = x + k;
        if (E < 0 || z < 0 || E >= e.cols || z >= e.rows) continue;
        const T = z * e.cols + E;
        if (u[T]) continue;
        const Q = Pn(e, E, z), Et = p[_] && p[_] !== I ? Fn : 0, O = (a[_] ?? 1 / 0) + Q + Et;
        if (O < (a[T] ?? 1 / 0)) {
          a[T] = O, d[T] = b, c[T] = x, p[T] = I;
          const D = O + Ke(E, z, o, r);
          f.push({ col: E, row: z, f: D });
        }
      }
    }
  }
  return null;
}
function Ke(e, t, i, s) {
  return Math.abs(e - i) + Math.abs(t - s);
}
function In(e, t, i, s) {
  const n = [];
  let o = s[0], r = s[1];
  for (; o !== -1 && r !== -1; ) {
    n.push([o, r]);
    const l = r * e.cols + o, a = t[l] ?? -1, d = i[l] ?? -1;
    if (a === o && d === r || (o = a, r = d, o < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
const zn = 480, On = 270, Tn = 30;
function Dn(e, t, i = zn, s = On) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / e, s / t, 1);
  return {
    width: Math.max(1, Math.floor(e * n)),
    height: Math.max(1, Math.floor(t * n))
  };
}
function Rn(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 0, o = 0; n < e.length; n += 4, o++) {
    const r = e[n] ?? 0, l = e[n + 1] ?? 0, a = e[n + 2] ?? 0;
    s[o] = 0.2126 * r + 0.7152 * l + 0.0722 * a;
  }
  return s;
}
function Ln(e, t, i) {
  const s = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t;
    for (let l = 0; l < t; l++) {
      const a = e[r + Math.max(0, l - 1)] ?? 0, d = e[r + l] ?? 0, c = e[r + Math.min(t - 1, l + 1)] ?? 0;
      s[r + l] = a + 2 * d + c >> 2;
    }
  }
  const n = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t, l = Math.max(0, o - 1) * t, a = Math.min(i - 1, o + 1) * t;
    for (let d = 0; d < t; d++) {
      const c = s[l + d] ?? 0, p = s[r + d] ?? 0, u = s[a + d] ?? 0;
      n[r + d] = c + 2 * p + u >> 2;
    }
  }
  return n;
}
function Un(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 1; n < i - 1; n++) {
    const o = (n - 1) * t, r = n * t, l = (n + 1) * t;
    for (let a = 1; a < t - 1; a++) {
      const d = e[o + (a - 1)] ?? 0, c = e[o + a] ?? 0, p = e[o + (a + 1)] ?? 0, u = e[r + (a - 1)] ?? 0, h = e[r + (a + 1)] ?? 0, f = e[l + (a - 1)] ?? 0, y = e[l + a] ?? 0, g = e[l + (a + 1)] ?? 0, b = -d - 2 * u - f + p + 2 * h + g, x = -d - 2 * c - p + f + 2 * y + g;
      let _ = Math.sqrt(b * b + x * x);
      _ < Tn && (_ = 0), _ > 255 && (_ = 255), s[r + a] = _;
    }
  }
  return { width: t, height: i, data: s };
}
function Bn(e, t, i) {
  const s = Dn(t, i), n = document.createElement("canvas");
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
function Hn(e, t, i) {
  const { width: s, height: n, rgba: o } = Bn(e, t, i), r = Rn(o, s, n), l = Ln(r, s, n);
  return Un(l, s, n);
}
function jn(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const s = e[i - 1], n = e[i], o = e[i + 1], r = n[0] - s[0], l = n[1] - s[1], a = o[0] - n[0], d = o[1] - n[1];
    r * d - l * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(l) === Math.sign(d) || t.push(n);
  }
  return t.push(e[e.length - 1]), t;
}
const kt = /* @__PURE__ */ new Map();
async function Wn(e, t = {}) {
  const i = performance.now(), s = t.cellSize ?? fi, n = `${e.imageUrl}|${s}`, o = kt.has(n);
  let r = null;
  try {
    r = await Vn(n, e.imageUrl, s);
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
  const l = Je(e.from, r), a = Je(e.to, r), d = En(r, l, a);
  return !d || d.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  } : {
    waypoints: jn(d).slice(1, -1).map((h) => Kn(h, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  };
}
function Vn(e, t, i) {
  const s = kt.get(e);
  if (s) return s;
  const n = Gn(t, i).catch((o) => {
    throw kt.delete(e), o;
  });
  return kt.set(e, n), n;
}
async function Gn(e, t) {
  const i = await qn(e);
  await Ye();
  const s = Hn(i, i.naturalWidth, i.naturalHeight);
  return await Ye(), Cn(s, t);
}
function qn(e) {
  return new Promise((t, i) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.decoding = "async", s.onload = () => t(s), s.onerror = () => i(new Error(`Failed to load background image: ${e}`)), s.src = e;
  });
}
function Ye() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function Je(e, t) {
  const i = Xe(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), s = Xe(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, s];
}
function Kn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function Xe(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
var Yn = Object.defineProperty, Jn = Object.getOwnPropertyDescriptor, F = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Jn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Yn(t, i, n), n;
};
let C = class extends q {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.rubberBand = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.elementTab = "nodes", this.stageRef = ri(), this.undoStack = new Ws((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.rubberBandJustSelected = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, s = en(i, t);
      this.pushPatch(i, s, "edit default background");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = rn(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = C.KNOWN_WEATHER_STATES.find((n) => !e.has(n)) ?? "custom", i = this.config, s = Le(i, t, "");
      this.pushPatch(i, s, `add weather state ${t}`);
    }, this.onStageClick = (e) => {
      if (!(!this.config || e.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const s = this.config, { config: n, node: o } = Ks(s, i, "New node");
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
          }, n = this.config, { config: o, overlay: r } = ln(n, s);
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
    }, this.onStageContextMenu = (e) => {
      this.pending && (e.preventDefault(), this.pending = null, this.statusMessage = "Cancelled.");
    }, this.stageRubberBandPointerId = null, this.onStagePointerDown = (e) => {
      const t = e.target;
      if (!(t.classList.contains("stage") || t.classList.contains("background") || t.classList.contains("connectors")) || this.previewMode || this.pending || e.button !== 0) return;
      const s = this.pointerToPercent(e);
      s && (e.currentTarget.setPointerCapture(e.pointerId), this.stageRubberBandPointerId = e.pointerId, this.dragTarget = {
        kind: "rubber-band",
        startPx: { x: e.clientX, y: e.clientY },
        startPct: s
      }, this.rubberBand = { x1: s.x, y1: s.y, x2: s.x, y2: s.y });
    }, this.onStagePointerMove = (e) => {
      if (this.stageRubberBandPointerId !== e.pointerId || this.dragTarget?.kind !== "rubber-band") return;
      const t = this.pointerToPercent(e);
      if (!t) return;
      const i = this.dragTarget.startPct;
      this.rubberBand = { x1: i.x, y1: i.y, x2: t.x, y2: t.y };
    }, this.onStagePointerUp = (e) => {
      if (this.stageRubberBandPointerId !== e.pointerId || this.dragTarget?.kind !== "rubber-band") {
        this.stageRubberBandPointerId = null;
        return;
      }
      this.stageRubberBandPointerId = null;
      const t = this.rubberBand;
      if (this.rubberBand = null, this.dragTarget = null, !t || !this.config) return;
      const i = Math.min(t.x1, t.x2), s = Math.max(t.x1, t.x2), n = Math.min(t.y1, t.y2), o = Math.max(t.y1, t.y2);
      if (s - i < 2 && o - n < 2) return;
      const r = /* @__PURE__ */ new Set();
      for (const l of this.config.nodes) {
        const { x: a, y: d } = l.position;
        a >= i && a <= s && d >= n && d <= o && r.add(l.id);
      }
      r.size > 0 && (this.selectedNodeIds = r, this.selectedNodeId = r.size === 1 ? Array.from(r)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null, this.rubberBandJustSelected = !0, r.size === 2 ? this.statusMessage = `${r.size} nodes selected — click "Suggest path" to auto-route.` : this.statusMessage = `${r.size} node(s) selected via rubber-band.`);
    }, this.onSegmentClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId;
      if (!i) return;
      const s = t.dataset.segmentIndex, n = s !== void 0 ? Number(s) : NaN;
      if (e.shiftKey && Number.isFinite(n)) {
        const o = this.pointerToPercent(e);
        if (!o) return;
        const r = this.config, l = Te(r, i, n, o);
        this.pushPatch(r, l, `add waypoint to ${i}`);
        return;
      }
      this.selectedFlowId = i, this.selectedNodeId = null, this.selectedOverlayId = null;
    }, this.onNodeClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const i = e.currentTarget.dataset.nodeId;
      if (i && this.pending?.kind === "add-flow") {
        if (this.pending.step === "pick-from") {
          this.pending = { kind: "add-flow", step: "pick-to", fromId: i }, this.statusMessage = "Click the destination node.";
          return;
        }
        if (this.pending.step === "pick-to" && this.pending.fromId !== i) {
          const s = window.prompt(
            "Entity for this flow (e.g. sensor.grid_power):",
            "sensor.placeholder_entity"
          ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Re(n, this.pending.fromId, i, s);
          this.pushPatch(n, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
          return;
        }
        this.statusMessage = "Destination must differ from source.";
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
      const n = this.config, o = De(n, i, s);
      this.pushPatch(n, o, `delete waypoint ${s} of ${i}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = e.currentTarget, i = t.dataset.waypointIndex, s = t.dataset.flowId, n = t.dataset.nodeId, o = t.dataset.overlayId;
      let r = null;
      if (n)
        if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(n)) {
          const l = /* @__PURE__ */ new Map();
          for (const a of this.config.nodes)
            this.selectedNodeIds.has(a.id) && l.set(a.id, { ...a.position });
          r = {
            kind: "node-bulk",
            ids: Array.from(this.selectedNodeIds),
            startPositions: l,
            startPx: { x: e.clientX, y: e.clientY }
          };
        } else
          r = { kind: "node", id: n };
      else o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : s && i !== void 0 && (r = { kind: "waypoint", flowId: s, index: Number(i) });
      r && (t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragStartPx = { x: e.clientX, y: e.clientY }, this.dragMoved = !1, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = e.shiftKey, !this.dragMoved && this.dragStartPx) {
        const n = e.clientX - this.dragStartPx.x, o = e.clientY - this.dragStartPx.y;
        (Math.abs(n) > 4 || Math.abs(o) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      if (t.kind === "overlay-resize") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, l = (e.clientY - t.startPx.y) / o.height * 100;
        let a = t.startSize.width + r, d = t.startSize.height + l;
        this.dragShiftHeld && (a = Math.round(a), d = Math.round(d)), this.config = Ue(this.config, t.id, { width: a, height: d });
        return;
      }
      const i = this.pointerToPercent(e);
      if (!i) return;
      const s = this.dragShiftHeld ? { x: N(wt(i.x)), y: N(wt(i.y)) } : i;
      if (t.kind === "node")
        this.config = qs(this.config, t.id, s);
      else if (t.kind === "node-bulk") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, l = (e.clientY - t.startPx.y) / o.height * 100, a = /* @__PURE__ */ new Map();
        for (const [d, c] of t.startPositions) {
          const p = this.dragShiftHeld ? wt(c.x + r) : c.x + r, u = this.dragShiftHeld ? wt(c.y + l) : c.y + l;
          a.set(d, { x: p, y: u });
        }
        this.config = Js(this.config, a);
      } else t.kind === "overlay" ? this.config = dn(this.config, t.id, s) : t.kind === "waypoint" && (this.config = jt(this.config, t.flowId, t.index, s));
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const i = this.dragStartConfig, s = this.config, n = this.dragTarget, o = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !n) return;
      if (!o && n.kind === "node") {
        const l = n.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (e.shiftKey) {
          const a = new Set(this.selectedNodeIds);
          a.has(l) ? a.delete(l) : a.add(l), this.selectedNodeIds = a, this.selectedNodeId = a.size === 1 ? Array.from(a)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null, a.size === 2 ? this.statusMessage = 'Two nodes selected — click "Suggest path" to auto-route, or use the toolbar actions.' : a.size > 0 ? this.statusMessage = `${a.size} node(s) selected. Shift+click to add/remove. Escape to clear.` : this.statusMessage = "";
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([l]), this.selectedNodeId = l, this.selectedFlowId = null, this.selectedOverlayId = null, this.statusMessage = "";
        return;
      }
      if (!o || !i || !s || i === s) return;
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
      this.pushPatch(i, s, r);
    }, this.onKeyDown = (e) => {
      if (e.key === "Escape") {
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.rubberBand = null, this.statusMessage = "";
        return;
      }
      if (!(e.metaKey || e.ctrlKey)) return;
      const i = e.key.toLowerCase();
      i === "z" && !e.shiftKey ? (e.preventDefault(), e.stopImmediatePropagation(), this.undoStack.undo()) : (i === "z" && e.shiftKey || i === "y") && (e.preventDefault(), e.stopImmediatePropagation(), this.undoStack.redo());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState()), window.addEventListener("keydown", this.onKeyDown), document.addEventListener("keydown", this.onKeyDown, !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown), document.removeEventListener("keydown", this.onKeyDown, !0);
  }
  setConfig(e) {
    try {
      this.config = $t(e), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
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
    const t = `${(1 / (_t(this.config.aspect_ratio) ?? 16 / 10) * 100).toFixed(4)}%`;
    this.style.setProperty("--canvas-aspect-padding", t);
    const i = this.config.background.default, s = this.selectedNodeIds.size >= 2;
    return m`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div class="z-canvas">
          <div
            class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
            style="padding-top: var(--canvas-aspect-padding, 62.5%);"
            @click=${this.onStageClick}
            @contextmenu=${this.onStageContextMenu}
            @pointerdown=${this.onStagePointerDown}
            @pointermove=${this.onStagePointerMove}
            @pointerup=${this.onStagePointerUp}
            @pointercancel=${this.onStagePointerUp}
            ${ai(this.stageRef)}
          >
            <div
              class="background"
              style=${i ? `background-image: url('${i}');` : ""}
            ></div>
            <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
              ${this.config.flows.map((n) => this.renderFlowConnector(n))}
            </svg>
            ${this.config.flows.filter((n) => n.id === this.selectedFlowId).map((n) => this.renderWaypointHandles(n))}
            ${(this.config.overlays ?? []).map((n) => this.renderOverlayHandle(n))}
            ${this.config.nodes.map((n) => this.renderHandle(n))}
            ${this.renderSuggestPreview()}
            ${this.renderRubberBand()}
          </div>
          ${this.renderSuggestBar()}
        </div>

        <!-- ZONE 2 — Toolbar -->
        <div class="z-toolbar">
          <!-- Left: Undo / Redo -->
          <div class="tb-group">
            <button
              class="tb-btn"
              ?disabled=${!this.canUndo}
              title=${this.undoLabel ? `Undo: ${this.undoLabel} (Ctrl+Z)` : "Undo (Ctrl+Z)"}
              @click=${() => this.undoStack.undo()}
            >↶ Undo</button>
            <button
              class="tb-btn"
              ?disabled=${!this.canRedo}
              title=${this.redoLabel ? `Redo: ${this.redoLabel} (Ctrl+Shift+Z)` : "Redo (Ctrl+Shift+Z)"}
              @click=${() => this.undoStack.redo()}
            >↷ Redo</button>
          </div>

          <!-- Centre: add buttons or multi-select toolbar -->
          <div class="tb-group tb-centre">
            ${s ? this.renderMultiSelectToolbar() : m`
                <button class="tb-btn"
                  title="Add node — then click canvas to place"
                  @click=${() => {
      this.pending = { kind: "add-node" }, this.statusMessage = "Click anywhere on the canvas to drop a new node.";
    }}
                >+ Node</button>
                <button class="tb-btn"
                  title="Add flow between two nodes"
                  @click=${() => {
      this.pending = { kind: "add-flow", step: "pick-from" }, this.statusMessage = "Click the source node.";
    }}
                >+ Flow</button>
                <button class="tb-btn"
                  title="Add overlay card"
                  @click=${() => {
      this.pending = { kind: "add-overlay", overlayType: "custom" }, this.statusMessage = "Click anywhere on the canvas to place a custom overlay.";
    }}
                >+ Overlay</button>
                <button
                  class="tb-btn"
                  ?disabled=${this.selectedNodeIds.size !== 2 || this.suggestBusy}
                  title=${this.selectedNodeIds.size !== 2 ? "Shift+click exactly two nodes to enable" : "Auto-route a flow between the two selected nodes"}
                  @click=${() => void this.runSuggestPath()}
                >Suggest path</button>
              `}
          </div>

          <!-- Right: status, Save, Cancel -->
          <div class="tb-group tb-right">
            ${this.statusMessage ? m`<span class="tb-status">${this.statusMessage}</span>` : w}
            ${this.errorMessage ? m`<span class="tb-error">${this.errorMessage}</span>` : w}
            <button
              class="tb-btn"
              title="Apply current configuration to the card"
              @click=${() => {
      this.config && this.commitToHa(this.config), this.statusMessage = "Saved.";
    }}
            >💾 Save</button>
            <button
              class="tb-btn tb-btn-cancel"
              title="Discard all changes since the editor opened"
              ?disabled=${!this.savedConfig}
              @click=${() => {
      if (!this.savedConfig || !this.config) return;
      const n = this.config;
      this.pushPatch(n, this.savedConfig, "cancel all changes");
    }}
            >✕ Cancel</button>
          </div>
        </div>

        <!-- ZONE 3 — Context panel -->
        <div class="z-context">
          ${this.renderContextPanel()}
        </div>

        <!-- ZONE 4 — Element list -->
        <div class="z-elements">
          ${this.renderElementList()}
        </div>

      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return w;
    const t = new Map(this.config.nodes.map((c) => [c.id, c])), i = t.get(e.from_node), s = t.get(e.to_node);
    if (!i || !s) return w;
    const n = [i.position, ...e.waypoints, s.position], o = e.id === this.selectedFlowId, l = Yt(n, { width: 100, height: 100 }, e.line_style ?? "corner");
    if (!l) return w;
    const a = e.color ?? "rgba(255,255,255,0.8)", d = [];
    for (let c = 0; c < n.length - 1; c++) {
      const p = n[c], u = n[c + 1];
      !p || !u || d.push($e`
        <line
          class="segment-hit"
          x1=${p.x}
          y1=${p.y}
          x2=${u.x}
          y2=${u.y}
          data-flow-id=${e.id}
          data-segment-index=${c}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return $e`
      <g>
        ${d}
        <path
          class=${`flow-path ${o ? "selected" : ""}`}
          d=${l}
          data-flow-id=${e.id}
          style=${`stroke: ${a};`}
          @click=${this.onSegmentClick}
        />
      </g>
    `;
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
            ></div>` : w}
      </div>
    `;
  }
  renderHandle(e) {
    const t = this.selectedNodeIds.has(e.id), i = t && this.selectedNodeIds.size === 1, s = t && this.selectedNodeIds.size > 1, n = t ? Array.from(this.selectedNodeIds).indexOf(e.id) : -1, o = e.visible === !1;
    return m`
      <div
        class=${`handle ${i ? "selected" : ""} ${s ? "multi-selected" : ""} ${t ? "in-selection" : ""} ${o ? "handle-hidden" : ""}`}
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
        ${e.label ? m`<span class="handle-label">${e.label}</span>` : w}
        ${t && this.selectedNodeIds.size >= 2 ? m`<span class="suggest-badge">${n + 1}</span>` : w}
        <button
          class="eye-toggle"
          title=${o ? "Show node" : "Hide node"}
          @click=${(r) => {
      if (r.stopPropagation(), !this.config) return;
      const l = this.config, a = vn(l, e.id, o);
      this.pushPatch(l, a, `${o ? "show" : "hide"} node ${e.id}`);
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
  renderEntityPicker(e, t, i) {
    const s = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), n = i?.includeDomains ?? [], o = i?.placeholder ?? "entity.id";
    if (s) {
      const c = (p) => {
        p.stopPropagation(), t((p.detail?.value ?? "").trim());
      };
      return m`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
          .includeDomains=${n}
          @value-changed=${c}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, l = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, a = Object.keys(r).filter((c) => {
      if (n.length === 0) return !0;
      const p = c.split(".")[0];
      return !!p && n.includes(p);
    }).sort();
    return m`
      <input
        type="text"
        list=${l}
        placeholder=${o}
        .value=${e}
        @change=${(c) => {
      t(c.target.value.trim());
    }}
      />
      <datalist id=${l}>
        ${a.map((c) => m`<option value=${c}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return w;
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
        const s = this.config, n = fn(s, e.id, i < 1 || i > 0 ? i : void 0);
        this.pushPatch(s, n, `set opacity of ${e.id}`);
      }}
              />
              <span>${(e.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <button class="danger" @click=${() => this.removeNode(e.id)}>Delete node</button>
        </div>
      ` : w;
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
          ${this.renderWaypointList(e)}
          <label>
            Line style
            <select
              .value=${e.line_style ?? "corner"}
              @change=${(t) => {
        if (!this.config) return;
        const i = t.target.value, s = this.config, n = yn(s, e.id, i);
        this.pushPatch(s, n, `set line style of ${e.id}`);
      }}
            >
              ${Wt.map(
        (t) => m`<option value=${t} ?selected=${(e.line_style ?? "corner") === t}>${t}</option>`
      )}
            </select>
          </label>
          <label>
            Colour override
            <div class="color-row">
              ${(() => {
        const t = j(e.domain ?? this.config.domain), i = ot(e, t, e.domain ?? this.config.domain, 1, this.config.domain_colors);
        return m`
                  <input
                    type="color"
                    .value=${e.color ?? i}
                    @change=${(s) => {
          if (!this.config) return;
          const n = s.target.value, o = this.config, r = He(o, e.id, n);
          this.pushPatch(o, r, `set colour of ${e.id}`);
        }}
                  />
                  <span class="color-effective">${e.color ? "override" : "domain default"}</span>
                  ${e.color ? m`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, n = He(s, e.id, void 0);
          this.pushPatch(s, n, `clear colour of ${e.id}`);
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
                .value=${String(e.opacity ?? 1)}
                @change=${(t) => {
        if (!this.config) return;
        const i = parseFloat(t.target.value);
        if (!Number.isFinite(i)) return;
        const s = this.config, n = gn(s, e.id, i);
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
        const i = t.target.checked, s = this.config, n = wn(s, e.id, i);
        this.pushPatch(s, n, `${i ? "show" : "hide"} flow ${e.id}`);
      }}
              />
              <span>${e.visible !== !1 ? "shown" : "hidden"}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(e)}
          ${this.renderAnimationSection(e)}
          ${this.renderValueGradientSection(e)}
          <button class="danger" @click=${() => this.removeFlow(e.id)}>Delete flow</button>
        </div>
      ` : w;
    }
    if (this.selectedOverlayId) {
      const e = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return e ? this.renderOverlayInspector(e) : w;
    }
    return w;
  }
  renderSpeedCurveSection(e) {
    if (!this.config) return m``;
    const t = j(e.domain ?? this.config.domain), i = de(e, t), s = e.speed_curve_override ?? {}, n = (l, a, d) => m`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${a}${d ? m` <small>(${d})</small>` : w}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof i[l] == "number" ? i[l].toFixed(0) : ""}
          .value=${s[l] !== void 0 ? String(s[l]) : ""}
          @change=${(c) => {
      if (!this.config) return;
      const p = c.target.value.trim();
      if (p === "") {
        const u = {};
        for (const y of Object.keys(s))
          y !== l && (u[y] = s[y]);
        const h = this.config, f = We(h, e.id, u);
        this.pushPatch(h, f, `update speed curve ${l} for ${e.id}`);
      } else {
        const u = parseFloat(p);
        if (!Number.isFinite(u)) return;
        const h = this.config, f = We(h, e.id, { ...s, [l]: u });
        this.pushPatch(h, f, `update speed curve ${l} for ${e.id}`);
      }
    }}
        />
      </div>
    `, r = [i.threshold, i.p50, i.peak].map((l) => `${(L(l, i) / 1e3).toFixed(1)}s`);
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
      const l = this.config, a = $n(l, e.id);
      this.pushPatch(l, a, `reset speed curve for ${e.id}`);
    }}>Reset to domain defaults</button>` : w}
        </div>
      </details>
    `;
  }
  renderAnimationSection(e) {
    if (!this.config) return m``;
    const t = e.animation ?? {}, i = t.animation_style ?? "dots", s = (c) => {
      if (!this.config) return;
      const p = this.config, u = _n(p, e.id, c);
      this.pushPatch(p, u, `update animation for ${e.id}`);
    }, o = !(/* @__PURE__ */ new Set(["dash", "pulse", "fluid", "none"])).has(i), r = i === "pulse", l = i === "trail", a = i === "dash", d = e.color ?? "#4ADE80";
    return m`
      <details class="anim-details" open>
        <summary>Animation</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(i, t, d)}
            </svg>
          </div>

          <label>Style
            <select
              .value=${i}
              @change=${(c) => {
      s({ animation_style: c.target.value });
    }}
            >
              ${Vt.map(
      (c) => m`<option value=${c} ?selected=${i === c}>${c}</option>`
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
                ${Gt.map(
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
              ${qt.map(
      (c) => m`<option value=${c} ?selected=${(t.direction ?? "auto") === c}>${c}</option>`
    )}
            </select>
          </label>

          <label>Particle size
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(t.particle_size ?? 1)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && s({ particle_size: p });
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
      const p = c.target.value.trim();
      if (p === "") {
        s({ particle_count: void 0 });
        return;
      }
      const u = parseInt(p, 10);
      Number.isFinite(u) && u >= 1 && s({ particle_count: u });
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
              ${Kt.map(
      (c) => m`<option value=${c} ?selected=${(t.particle_spacing ?? "even") === c}>${c}</option>`
    )}
            </select>
          </label>

          ${t.particle_spacing === "clustered" ? m`
            <label>Cluster size
              <input type="number" min="1" max="10" step="1"
                .value=${String(t.cluster_size ?? 3)}
                @change=${(c) => {
      const p = parseInt(c.target.value, 10);
      Number.isFinite(p) && p >= 1 && s({ cluster_size: p });
    }}
              />
            </label>
            <label>Cluster gap (×)
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(t.cluster_gap ?? 2)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && s({ cluster_gap: p });
    }}
              />
            </label>
          ` : w}

          ${t.particle_spacing === "pulse" ? m`
            <label>Pulse frequency (Hz)
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.pulse_frequency ?? 1)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && s({ pulse_frequency: p });
    }}
              />
            </label>
            <label>Pulse ratio
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(t.pulse_ratio ?? 0.3)}
                  @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && s({ pulse_ratio: p });
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
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && s({ wave_frequency: p });
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
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && s({ wave_amplitude: p });
    }}
              />
            </label>
          ` : w}

          <label>Glow intensity
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(t.glow_intensity ?? 1)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && s({ glow_intensity: p });
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
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && s({ pulse_width: p });
    }}
              />
            </label>
          ` : w}

          ${l ? m`
            <label>Trail length
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(t.trail_length ?? 2)}
                  @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && s({ trail_length: p });
    }}
                />
                <span>${(t.trail_length ?? 2).toFixed(2)}×</span>
              </div>
            </label>
          ` : w}

          ${a ? m`
            <label>Dash gap ratio
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(t.dash_gap ?? 0.5)}
                  @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && s({ dash_gap: p });
    }}
                />
                <span>${(t.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : w}

          ${e.animation && Object.keys(e.animation).length > 0 ? m`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const c = this.config, p = kn(c, e.id);
      this.pushPatch(c, p, `reset animation for ${e.id}`);
    }}>Reset to defaults</button>` : w}
        </div>
      </details>
    `;
  }
  /**
   * Render a small inline SVG preview strip showing the current animation style.
   * Uses CSS animations (not SVG animateMotion) so it works even with no live data.
   */
  renderAnimPreview(e, t, i) {
    const s = 4 * (t.particle_size ?? 1), n = Math.min(t.particle_count ?? 3, 8);
    if (e === "none")
      return m`<line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="2" stroke-opacity="0.3"/>`;
    if (e === "dash") {
      const r = t.dash_gap ?? 0.5, l = 14, a = l * r;
      return m`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="3"
          stroke-dasharray="${l} ${a}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${l + a}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (e === "fluid")
      return m`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (e === "pulse")
      return m`
        ${[40, 90, 140].map(
        (l, a) => m`
            <circle cx=${l} cy="20" r="0" fill="none"
              stroke=${i} stroke-width=${t.pulse_width ?? 2}>
              <animate attributeName="r" values="0;12;0" dur="1.2s" repeatCount="indefinite"
                begin="${(a * 0.4).toFixed(1)}s"/>
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite"
                begin="${(a * 0.4).toFixed(1)}s"/>
            </circle>
          `
      )}
      `;
    if (t.particle_spacing === "wave_lateral") {
      const r = Array.from({ length: n }, (l, a) => (a + 0.5) / n * 180 + 10);
      return m`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (l, a) => m`
            <circle cx=${l} cy="20" r=${s} fill=${i} opacity="0">
              <animate attributeName="cx" values="${l};190;10;${l}" dur="1.4s"
                repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
              <animate attributeName="cy" values="20;${10 + (a % 2 === 0 ? 6 : -6)};20;${10 + (a % 2 === 0 ? -6 : 6)};20"
                dur="1.4s" repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
                repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
            </circle>
          `
      )}
      `;
    }
    const o = Array.from({ length: n }, (r, l) => (l + 0.5) / n * 180 + 10);
    return m`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${o.map(
      (r, l) => m`
          <circle cx=${r} cy="20" r=${s} fill=${i} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(l / n * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(l / n * -1.4).toFixed(2)}s"/>
          </circle>
        `
    )}
    `;
  }
  renderWaypointList(e) {
    if (!this.config) return m``;
    const t = new Map(this.config.nodes.map((o) => [o.id, o])), i = t.get(e.from_node), s = t.get(e.to_node), n = () => {
      if (!this.config) return;
      const o = [
        ...i ? [i.position] : [],
        ...e.waypoints,
        ...s ? [s.position] : []
      ];
      let r = 0, l = 0;
      for (let f = 0; f < o.length - 1; f++) {
        const y = o[f], g = o[f + 1], b = Math.hypot(g.x - y.x, g.y - y.y);
        b > l && (l = b, r = f);
      }
      const a = o[r], d = o[r + 1], c = { x: (a.x + d.x) / 2, y: (a.y + d.y) / 2 }, p = r > 0 ? r - 1 + 1 : 0, u = this.config, h = Te(u, e.id, p, c);
      this.pushPatch(u, h, `add waypoint to ${e.id}`);
    };
    return m`
      <div class="waypoint-section">
        <div class="waypoint-section-header">
          Waypoints
          <span class="waypoint-count">${e.waypoints.length}</span>
        </div>

        ${e.waypoints.length === 0 ? m`<div class="waypoint-empty">No waypoints — click on the flow line to add one.</div>` : m`
            <div class="waypoint-list">
              ${e.waypoints.map((o, r) => m`
                <div class="waypoint-row">
                  <span class="waypoint-index">#${r + 1}</span>
                  <label class="waypoint-coord">
                    x%
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${o.x.toFixed(1)}
                      @change=${(l) => {
      if (!this.config) return;
      const a = parseFloat(l.target.value);
      if (!Number.isFinite(a)) return;
      const d = this.config, c = jt(d, e.id, r, { x: a, y: o.y });
      this.pushPatch(d, c, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    y%
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${o.y.toFixed(1)}
                      @change=${(l) => {
      if (!this.config) return;
      const a = parseFloat(l.target.value);
      if (!Number.isFinite(a)) return;
      const d = this.config, c = jt(d, e.id, r, { x: o.x, y: a });
      this.pushPatch(d, c, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <button class="icon-btn" title="Delete waypoint"
                    @click=${() => {
      if (!this.config) return;
      const l = this.config, a = De(l, e.id, r);
      this.pushPatch(l, a, `delete waypoint ${r} of ${e.id}`);
    }}
                  >×</button>
                </div>
              `)}
            </div>
          `}

        <button class="ghost full-width" @click=${n}>
          + Add waypoint
        </button>
      </div>
    `;
  }
  renderValueGradientSection(e) {
    if (!this.config) return m``;
    const t = e.value_gradient, i = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, s = (o) => {
      if (!this.config) return;
      const r = this.config, l = An(r, e.id, o);
      this.pushPatch(r, l, `update gradient for ${e.id}`);
    };
    let n = w;
    if (t && t.low_color && t.high_color)
      try {
        const o = pi(
          (t.low_value + t.high_value) / 2,
          t
        ), r = `background: linear-gradient(to right, ${t.low_color}, ${o}, ${t.high_color});`;
        n = m`
          <div class="gradient-preview-bar" style=${r}></div>
          <div class="gradient-preview-labels">
            <span>${t.low_color}</span><span>${t.high_color}</span>
          </div>
        `;
      } catch {
      }
    return m`
      <div class="gradient-section">
        <div class="gradient-section-header">Value gradient</div>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!t}
            @change=${(o) => {
      if (!this.config) return;
      const r = o.target.checked, l = this.config, a = r ? Sn(l, e.id, i) : Ge(l, e.id);
      this.pushPatch(l, a, `${r ? "enable" : "disable"} gradient for ${e.id}`);
    }}
          />
          Enable value gradient
        </label>

        ${t ? m`
          <label>Gradient entity
            <input type="text" placeholder="sensor.my_temperature"
              .value=${t.entity}
              @change=${(o) => s({ entity: o.target.value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>Low value
              <input type="number" step="any"
                .value=${String(t.low_value)}
                @change=${(o) => {
      const r = parseFloat(o.target.value);
      Number.isFinite(r) && s({ low_value: r });
    }}
              />
            </label>
            <label>Low colour
              <div class="color-row">
                <input type="color"
                  .value=${t.low_color}
                  @input=${(o) => s({ low_color: o.target.value })}
                />
                <span>${t.low_color}</span>
              </div>
            </label>
          </div>

          <div class="gradient-row">
            <label>High value
              <input type="number" step="any"
                .value=${String(t.high_value)}
                @change=${(o) => {
      const r = parseFloat(o.target.value);
      Number.isFinite(r) && s({ high_value: r });
    }}
              />
            </label>
            <label>High colour
              <div class="color-row">
                <input type="color"
                  .value=${t.high_color}
                  @input=${(o) => s({ high_color: o.target.value })}
                />
                <span>${t.high_color}</span>
              </div>
            </label>
          </div>

          <label>Apply gradient to
            <select
              .value=${t.mode ?? "both"}
              @change=${(o) => {
      s({ mode: o.target.value });
    }}
            >
              <option value="flow" ?selected=${t.mode === "flow"}>Particles only</option>
              <option value="line" ?selected=${t.mode === "line"}>Line only</option>
              <option value="both" ?selected=${(t.mode ?? "both") === "both"}>Particles and line</option>
            </select>
          </label>

          ${n}

          <button class="ghost" @click=${() => {
      if (!this.config) return;
      const o = this.config, r = Ge(o, e.id);
      this.pushPatch(o, r, `disable gradient for ${e.id}`);
    }}>Remove gradient</button>
        ` : w}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return w;
    const e = this.config.animation ?? {};
    return m`
      <details class="panel anim-global-panel" open>
        <summary>Animation (global)</summary>
        <div class="panel-body">
          <label>
            FPS cap
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(e.fps ?? 60)}
                @change=${(t) => {
      if (!this.config) return;
      const i = parseInt(t.target.value, 10), s = this.config, n = Ve(s, { fps: i });
      this.pushPatch(s, n, "set animation fps");
    }}
              />
              <span>${e.fps ?? 60} fps</span>
            </div>
          </label>
          <label class="visibility-row">
            <input type="checkbox"
              .checked=${e.smooth_speed !== !1}
              @change=${(t) => {
      if (!this.config) return;
      const i = t.target.checked, s = this.config, n = Ve(s, { smooth_speed: i });
      this.pushPatch(s, n, "set smooth_speed");
    }}
            />
            <span class="visibility-label">Smooth speed transitions</span>
            <span class="visibility-val">${e.smooth_speed !== !1 ? "on" : "off"}</span>
          </label>
          <p class="hint-sub">Smooth speed: interpolates duration changes over 500ms instead of restarting abruptly.</p>
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
      const o = n.target.checked, r = this.config, l = un(r, e.id, o);
      this.pushPatch(r, l, `toggle overlay ${e.id} visible`);
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
      const r = this.config, l = hn(r, e.id, o);
      this.pushPatch(r, l, `edit overlay ${e.id} opacity`);
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
      ${this.customConfigError ? m`<div class="custom-config-error">${this.customConfigError}</div>` : w}
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
    if (!this.config) return w;
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
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const a = this.config, d = Be(a, i, l);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const a = this.config, d = Be(a, i, l);
        this.pushPatch(a, d, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${o.toFixed(2)}</span>
        </label>
      `;
    };
    return m`
      <details class="panel opacity-panel" open>
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
            @change=${(l) => {
        if (!this.config) return;
        const a = l.target.value, d = this.config, c = je(d, s, a);
        this.pushPatch(d, c, `set domain_colors.${s}`);
      }}
          />
          <span class="color-picker-value">${o || `${r} (default)`}</span>
          ${o ? m`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const l = this.config, a = je(l, s, void 0);
        this.pushPatch(l, a, `reset domain_colors.${s}`);
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
          ${i("solar", "Solar")}
          ${i("grid", "Grid")}
          ${i("battery", "Battery")}
          ${i("load", "Load")}
        </div>
      </details>
    `;
  }
  renderVisibilityPanel() {
    if (!this.config) return w;
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
        const r = o.target.checked, l = this.config, a = xn(l, i, r);
        this.pushPatch(l, a, `set visibility.${i}`);
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
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const a = Math.max(n.min, Math.min(n.max, l)), d = this.config, c = mn(d, i, a);
        this.pushPatch(d, c, `set defaults.${i}`);
      }}
          />
          <span class="defaults-unit">${o}</span>
        </label>
      `;
    };
    return m`
      <details class="panel defaults-panel" open>
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
  // ── Zone 3: context panel ──────────────────────────────────────────────────
  /** Dispatches to the correct inspector based on current selection. */
  renderContextPanel() {
    return this.config ? this.selectedNodeId || this.selectedFlowId || this.selectedOverlayId ? m`<div class="z-context-body">${this.renderInspector()}</div>` : this.renderStateA() : m``;
  }
  /** State A — nothing selected: background, appearance, defaults panels. */
  renderStateA() {
    return m`
      <div class="z-context-body state-a">
        ${this.renderWeatherPanel()}
        ${this.renderGlobalAnimationPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
      </div>
    `;
  }
  // ── Zone 4: element list ───────────────────────────────────────────────────
  /** Horizontal scrolling chip list with Nodes / Flows / Overlays tabs. */
  renderElementList() {
    if (!this.config) return m``;
    const { nodes: e, flows: t } = this.config, i = this.config.overlays ?? [], s = this.elementTab, n = (a) => {
      this.elementTab = a;
    }, o = s === "nodes" ? m`
      <div class="el-chips">
        ${e.map((a) => m`
          <div
            class=${`el-chip ${this.selectedNodeId === a.id ? "active" : ""}`}
            style="border-left-color: #4ade80;"
            @click=${() => {
      this.selectedNodeId = a.id, this.selectedNodeIds = /* @__PURE__ */ new Set([a.id]), this.selectedFlowId = null, this.selectedOverlayId = null;
    }}
          >
            <span class="el-chip-id">${a.label ?? a.id}</span>
            ${a.visible === !1 ? m`<span class="el-chip-hidden">hidden</span>` : w}
          </div>
        `)}
        <div
          class="el-chip el-chip-add"
          style="border-left-color: transparent;"
          @click=${() => {
      this.pending = { kind: "add-node" }, this.statusMessage = "Click anywhere on the canvas to drop a new node.";
    }}
        >+ Node</div>
      </div>
    ` : w, r = s === "flows" ? m`
      <div class="el-chips">
        ${t.map((a) => {
      const d = j(a.domain ?? this.config.domain), c = ot(a, d, a.domain ?? this.config.domain, 1, this.config.domain_colors);
      return m`
            <div
              class=${`el-chip ${this.selectedFlowId === a.id ? "active" : ""}`}
              style=${`border-left-color: ${c};`}
              @click=${() => {
        this.selectedFlowId = a.id, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null;
      }}
            >
              <span class="el-chip-id">${a.id}</span>
              <span class="el-chip-sub">${a.from_node}→${a.to_node}</span>
              ${a.visible === !1 ? m`<span class="el-chip-hidden">hidden</span>` : w}
            </div>
          `;
    })}
        <div
          class="el-chip el-chip-add"
          style="border-left-color: transparent;"
          @click=${() => {
      this.pending = { kind: "add-flow", step: "pick-from" }, this.statusMessage = "Click the source node.";
    }}
        >+ Flow</div>
      </div>
    ` : w, l = s === "overlays" ? m`
      <div class="el-chips">
        ${i.map((a) => m`
          <div
            class=${`el-chip ${this.selectedOverlayId === a.id ? "active" : ""}`}
            style="border-left-color: var(--primary-color, #03a9f4);"
            @click=${() => {
      this.selectedOverlayId = a.id, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null;
    }}
          >
            <span class="el-chip-id">${a.id}</span>
            ${a.visible === !1 ? m`<span class="el-chip-hidden">hidden</span>` : w}
          </div>
        `)}
        <div
          class="el-chip el-chip-add"
          style="border-left-color: transparent;"
          @click=${() => {
      this.pending = { kind: "add-overlay", overlayType: "custom" }, this.statusMessage = "Click anywhere on the canvas to place a custom overlay.";
    }}
        >+ Overlay</div>
      </div>
    ` : w;
    return m`
      <div class="el-tabs">
        <button class=${`el-tab ${s === "nodes" ? "active" : ""}`} @click=${() => n("nodes")}>
          Nodes (${e.length})
        </button>
        <button class=${`el-tab ${s === "flows" ? "active" : ""}`} @click=${() => n("flows")}>
          Flows (${t.length})
        </button>
        <button class=${`el-tab ${s === "overlays" ? "active" : ""}`} @click=${() => n("overlays")}>
          Overlays (${i.length})
        </button>
      </div>
      ${o}${r}${l}
    `;
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderRubberBand() {
    const e = this.rubberBand;
    if (!e) return w;
    const t = Math.min(e.x1, e.x2), i = Math.min(e.y1, e.y2), s = Math.abs(e.x2 - e.x1), n = Math.abs(e.y2 - e.y1);
    return m`
      <div
        class="rubber-band"
        style=${`left:${t}%;top:${i}%;width:${s}%;height:${n}%;`}
      ></div>
    `;
  }
  renderMultiSelectToolbar() {
    const e = this.selectedNodeIds.size;
    if (e < 2) return w;
    const t = this.selectedNodeIds, i = Array.from(t)[0];
    return m`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${e} nodes selected</span>
        <button
          class="ms-btn"
          title=${e === 2 ? "Suggest path between selected nodes" : "Select exactly 2 nodes to suggest a path"}
          ?disabled=${e !== 2 || this.suggestBusy}
          @click=${() => this.runSuggestPath()}
        >Suggest path</button>
        <button class="ms-btn" @click=${() => this.bulkHide(t)}>Hide</button>
        <button class="ms-btn" @click=${() => this.bulkShow(t)}>Show</button>
        <button class="ms-btn" @click=${() => this.bulkAlignH(t, i)}>Align H</button>
        <button class="ms-btn" @click=${() => this.bulkAlignV(t, i)}>Align V</button>
        <button class="ms-btn danger" @click=${() => this.bulkDelete(t)}>Delete</button>
        <button class="ms-btn ghost" @click=${() => {
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.statusMessage = "";
    }}>✕ Deselect</button>
      </div>
    `;
  }
  bulkHide(e) {
    if (!this.config) return;
    const t = this.config, i = Oe(t, e, !1);
    this.pushPatch(t, i, `hide ${e.size} nodes`);
  }
  bulkShow(e) {
    if (!this.config) return;
    const t = this.config, i = Oe(t, e, !0);
    this.pushPatch(t, i, `show ${e.size} nodes`);
  }
  bulkAlignH(e, t) {
    if (!this.config) return;
    const i = this.config, s = Zs(i, e, t);
    this.pushPatch(i, s, `align ${e.size} nodes horizontally`);
  }
  bulkAlignV(e, t) {
    if (!this.config) return;
    const i = this.config, s = Qs(i, e, t);
    this.pushPatch(i, s, `align ${e.size} nodes vertically`);
  }
  bulkDelete(e) {
    if (!this.config || !window.confirm(`Delete ${e.size} nodes (and their flows)?`)) return;
    const t = this.config, i = Xs(t, e);
    this.pushPatch(t, i, `delete ${e.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderWeatherPanel() {
    if (!this.config) return w;
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
            ${e.default ? m`<img class="weather-thumb" src=${e.default} alt="default background" />` : w}
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
              </div>` : w}
          <label>
            Sun entity (optional) — enables automatic night background variants
            ${this.renderEntityPicker(
      e.sun_entity ?? "",
      (s) => {
        if (!this.config) return;
        const n = this.config, o = nn(n, s || void 0);
        this.pushPatch(n, o, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: "sun.sun" }
    )}
          </label>
          ${e.sun_entity && this.hass?.states[e.sun_entity] ? m`<div class="weather-live-state">
                Sun: <strong>${this.hass.states[e.sun_entity]?.state === "above_horizon" ? "☀️ above horizon" : "🌙 below horizon"}</strong>
              </div>` : w}
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
      const o = this.config, r = on(o, n * 1e3);
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
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), i = this.config, s = sn(i, t || void 0);
    this.pushPatch(i, s, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const s = this.config, n = bn(s, e, i);
    n !== s && this.pushPatch(s, n, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, s = this.config, n = Le(s, e, i);
    this.pushPatch(s, n, `edit weather image ${e}`);
  }
  // -- toolbar --
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || this.selectedNodeIds.size !== 2) {
      this.statusMessage = 'Select exactly 2 nodes (Shift+click or rubber-band), then click "Suggest path".';
      return;
    }
    const [e, t] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((n) => n.id === e), s = this.config.nodes.find((n) => n.id === t);
    if (!i || !s) {
      this.statusMessage = "One or both selected nodes could not be found.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const n = await Wn({
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
    ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Re(n, e, t, s), l = {
      ...o,
      flows: o.flows.map(
        (a) => a.id === r.id ? { ...a, waypoints: i.map((d) => ({ x: d.x, y: d.y })) } : a
      )
    };
    this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = r.id, this.statusMessage = `Created flow ${r.id} with ${i.length} waypoint(s).`, this.pushPatch(n, l, `suggest-path ${r.id}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return w;
    const e = this.config.nodes.find((n) => n.id === this.suggestPreview.fromNodeId), t = this.config.nodes.find((n) => n.id === this.suggestPreview.toNodeId);
    if (!e || !t) return w;
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
    ` : w;
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
    const s = (this.config.overlays ?? []).find((a) => a.id === e);
    if (!s) return;
    const n = s.size ?? { width: 20, height: 15 }, o = Number(i.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, l = Ue(r, e, { ...n, [t]: o });
    this.pushPatch(r, l, `resize overlay ${e}`);
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
      const n = pn(s, e, i), o = $t(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: s, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = cn(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = Ys(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = tn(t, e);
    this.selectedFlowId = null, this.pushPatch(t, i, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const i = t.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return null;
    const s = N((e.clientX - i.left) / i.width * 100), n = N((e.clientY - i.top) / i.height * 100);
    return { x: s, y: n };
  }
  pushPatch(e, t, i) {
    try {
      const s = $t(t);
      this.errorMessage = "", this.undoStack.push({ prev: e, next: s, description: i }), this.commitToHa(s);
    } catch (s) {
      this.errorMessage = s instanceof Error ? s.message : String(s), this.config = e;
    }
  }
  applyConfig(e, t) {
    this.config = e, t ? this.commitToHa(e) : this.commitToHa(e);
  }
  commitToHa(e) {
    this._ownCommit = !0;
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
C.styles = ie`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    /* ── Four-zone layout ──────────────────────────────────────────────── */
    .wrap {
      display: flex;
      flex-direction: column;
      /* min-height ensures usability when HA doesn't give :host an explicit
         height; height: 100% fills the host if HA does size it. */
      min-height: 600px;
      height: 100%;
      padding: 0;
      gap: 0;
      overflow: hidden;
    }
    /* ZONE 1 — Canvas */
    .z-canvas {
      flex: 0 0 auto;
      width: 100%;
    }
    /* ZONE 2 — Toolbar */
    .z-toolbar {
      flex: 0 0 auto;
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: var(--card-background-color, #1a1a1a);
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      flex-wrap: wrap;
    }
    .tb-group {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .tb-centre {
      flex: 1 1 auto;
      flex-wrap: wrap;
    }
    .tb-right {
      margin-left: auto;
      gap: 6px;
    }
    .tb-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-height: 36px;
      padding: 0 12px;
      font: inherit;
      font-size: 12px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
      background: var(--secondary-background-color, rgba(255,255,255,0.06));
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      white-space: nowrap;
      transition: background 120ms;
    }
    .tb-btn:hover:not(:disabled) {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #03a9f4);
    }
    .tb-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .tb-btn-cancel:hover:not(:disabled) {
      background: var(--error-color, #ef4444);
      border-color: var(--error-color, #ef4444);
    }
    .tb-status {
      font-size: 11px;
      color: #4ade80;
      white-space: nowrap;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tb-error {
      font-size: 11px;
      color: var(--error-color, #f44336);
      white-space: nowrap;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* ZONE 3 — Context panel */
    .z-context {
      flex: 1 1 0;
      overflow-y: auto;
      min-height: 0;
    }
    .z-context-body {
      padding: 8px 0;
    }
    .z-context-body.state-a {
      display: flex;
      flex-direction: column;
    }
    /* ZONE 4 — Element list */
    .z-elements {
      flex: 0 0 auto;
      min-height: 96px;
      max-height: 130px;
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      background: var(--card-background-color, #1a1a1a);
    }
    .el-tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      flex-shrink: 0;
    }
    .el-tab {
      flex: 1;
      padding: 5px 4px;
      font: inherit;
      font-size: 11px;
      text-align: center;
      cursor: pointer;
      border: none;
      border-bottom: 2px solid transparent;
      background: none;
      color: var(--secondary-text-color, rgba(255,255,255,0.55));
      transition: color 120ms, border-color 120ms;
    }
    .el-tab.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
    }
    .el-chips {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 6px 10px;
      align-items: stretch;
      flex: 1;
    }
    .el-chip {
      flex: 0 0 auto;
      min-width: 72px;
      max-width: 140px;
      padding: 4px 8px;
      border-radius: 6px;
      border-left: 3px solid var(--primary-color, #03a9f4);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: var(--secondary-background-color, rgba(255,255,255,0.05));
      font-size: 11px;
      transition: background 120ms;
    }
    .el-chip:hover {
      background: rgba(255,255,255,0.1);
    }
    .el-chip.active {
      background: rgba(3,169,244,0.18);
      border-color: var(--primary-color, #03a9f4) !important;
    }
    .el-chip-add {
      border-left-color: transparent !important;
      opacity: 0.55;
      font-style: italic;
    }
    .el-chip-id {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-chip-sub {
      font-size: 10px;
      opacity: 0.6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-chip-hidden {
      font-size: 10px;
      color: var(--error-color, #f44336);
    }
    /* ── Canvas stage ──────────────────────────────────────────────────── */
    .stage {
      position: relative;
      width: calc(100% - 24px);
      margin: 8px 12px 4px;
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
      overflow: visible;
    }
    .connectors .flow-path {
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
      pointer-events: visibleStroke;
      fill: none;
      cursor: pointer;
      opacity: 0.55;
      transition: opacity 0.15s, stroke-width 0.1s;
    }
    .connectors .flow-path:hover {
      opacity: 1;
      stroke-width: 3;
    }
    .connectors .flow-path.selected {
      opacity: 1;
      stroke-width: 3;
      filter: drop-shadow(0 0 4px currentColor);
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
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid var(--primary-color, #03a9f4);
      cursor: grab;
      touch-action: none;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
    }
    .waypoint:hover {
      background: #fff;
      transform: translate(-50%, -50%) scale(1.3);
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
      pointer-events: visibleStroke;
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
    .waypoint-section {
      border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
      border-radius: 6px;
      padding: 10px;
      margin-top: 4px;
      margin-bottom: 4px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .waypoint-section-header {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.7;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .waypoint-count {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-radius: 10px;
      padding: 0 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .waypoint-empty {
      font-size: 11px;
      opacity: 0.6;
      font-style: italic;
    }
    .waypoint-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .waypoint-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .waypoint-index {
      font-size: 10px;
      opacity: 0.5;
      min-width: 20px;
    }
    .waypoint-coord {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11px;
      flex: 1;
    }
    .waypoint-coord input[type="number"] {
      width: 52px;
      padding: 2px 4px;
      font-size: 11px;
    }
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--error-color, #f44);
      font-size: 14px;
      padding: 0 4px;
      line-height: 1;
      opacity: 0.7;
    }
    .icon-btn:hover { opacity: 1; }
    .full-width { width: 100%; }
    .gradient-section {
      border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
      border-radius: 6px;
      padding: 10px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .gradient-section-header {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.7;
      margin-bottom: 2px;
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
    .gradient-row {
      display: flex;
      gap: 8px;
    }
    .gradient-row label {
      flex: 1;
      min-width: 0;
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
  yt({ attribute: !1 })
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
F([
  M()
], C.prototype, "elementTab", 2);
F([
  M()
], C.prototype, "savedConfig", 2);
C = F([
  oe("flowme-card-editor")
], C);
var Xn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, Z = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Zn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Xn(t, i, n), n;
};
const Qn = "1.0.15.2", Ze = 5e3;
console.info(
  `%c flowme %c v${Qn} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function to(e) {
  if (!e) return "";
  const t = [], i = (s, n) => {
    const o = e[s];
    o !== void 0 && t.push(`${n}:${o};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), t.join("");
}
function eo(e) {
  if (!e) return "";
  const t = [], i = (s, n) => {
    e[s] === !1 && t.push(`${n}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), t.join("");
}
let R = class extends q {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = ri(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e) {
      const i = this.config, s = [
        ...i?.flows.map((l) => l.entity) ?? [],
        ...i?.flows.map((l) => l.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((l) => l.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((l) => typeof l == "string" && l.length > 0), n = {};
      for (const l of s)
        n[l] = e.states[l]?.state;
      P("hass setter called. config entity states:", n);
      const o = i?.background.weather_entity;
      if (o) {
        const l = t?.states[o]?.state, a = e.states[o]?.state;
        P("[weather] state:", a, "(was:", l, ")"), l !== a && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const l = t?.states[r]?.state, a = e.states[r]?.state;
        l !== a && (P("[sun] state changed:", l, "→", a), this.syncWeatherBackground());
      }
    } else
      P("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    try {
      const t = $t(e);
      vs(t.debug ?? !1), P("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), P("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof re ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
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
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = Os(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(t, i).then(() => {
        this.hass && this.pushAllValuesToRenderer();
      }).catch((s) => {
        P("renderer init failed — falling back to SVG renderer", s), this.teardownRenderer(), this.renderer = new Jt(), this.rendererReadyFor = i, this.renderer.init(t, i).then(() => {
          this.hass && this.pushAllValuesToRenderer();
        }).catch((n) => {
          console.error("[flowme] SVG renderer init also failed", n);
        });
      });
    }
    e.has("hass") && this.renderer && this.hass && this.pushAllValuesToRenderer(), (e.has("config") || e.has("hass")) && this.syncWeatherBackground();
  }
  /**
   * Push the current hass state values for every flow to the renderer,
   * including gradient colours. Called both on hass changes and after
   * a fresh renderer is initialised so colours never need a hass event
   * to become visible.
   */
  pushAllValuesToRenderer() {
    if (!(!this.config || !this.renderer || !this.hass)) {
      P("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (const e of this.config.flows) {
        const t = this.hass.states[e.entity], i = Me(t?.state), s = j(e.domain ?? this.config.domain), n = t?.attributes?.unit_of_measurement, o = ls(i, n, s.unit_scale);
        if (P(
          "updateFlow →",
          e.id,
          "entity=",
          e.entity,
          "raw=",
          t?.state,
          "parsed=",
          i,
          "sensorUnit=",
          n ?? "(none)",
          "matchedUnit=",
          o.matchedUnit ?? "(none → passthrough)",
          "factor=",
          o.factor,
          "scaledToBase(" + s.unit_label + ")=",
          o.value
        ), t) {
          if (t.state === "unavailable" || t.state === "unknown") {
            const r = `${e.id}:${e.entity}:unavailable`;
            this.warnedMissing.has(r) || (this.warnedMissing.add(r), P(`flow "${e.id}" entity "${e.entity}" is currently ${t.state} — no flow will render until it reports a number`));
          }
        } else {
          const r = `${e.id}:${e.entity}`;
          this.warnedMissing.has(r) || (this.warnedMissing.add(r), P(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(e.id, o.value), e.value_gradient && this.renderer.setGradientColor) {
          const r = e.value_gradient.entity, l = this.hass.states[r];
          if (l && l.state !== "unavailable" && l.state !== "unknown") {
            const a = parseFloat(l.state);
            if (Number.isFinite(a)) {
              const d = e.value_gradient, c = Math.max(d.low_value, Math.min(d.high_value, a)), p = pi(a, d);
              P(
                "[gradient]",
                e.id,
                "entity value:",
                a,
                "clamped:",
                c,
                "range:",
                `${d.low_value}–${d.high_value}`,
                "colour:",
                p
              ), this.renderer.setGradientColor(e.id, p);
            } else
              P(`flow "${e.id}" gradient entity "${r}" state "${l.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            P(`flow "${e.id}" gradient entity "${r}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
        }
      }
    }
  }
  getCardSize() {
    const e = _t(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = _t(this.config?.aspect_ratio) ?? 1.6;
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
    const i = `${1 / (_t(e.aspect_ratio) ?? 16 / 10) * 100}%`, s = e.background.transition_duration ?? Ze, n = to(e.opacity), o = eo(e.visibility);
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
          <div class="renderer-mount" ${ai(this.rendererMount)}></div>
          ${e.nodes.map((r) => this.renderNodeHandle(r))}
          ${(e.overlays ?? []).map((r) => (P("rendering overlay →", r.type, "position=", r.position, "size=", r.size), Rs(r, this.hass)))}
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
        const i = t.state, s = e.sun_entity ? this.hass.states[e.sun_entity]?.state : void 0, n = cs(i, s, e.weather_states, e.default);
        let o = i;
        return s === "below_horizon" && !i.endsWith("-night") && (o = `${i}-night`), P("[FlowMe] sun:", s, "weather:", i, "→ lookup key:", o, "→ image:", n !== e.default ? n : "default"), n;
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
    const t = this.config.background.transition_duration ?? Ze;
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, s = e.show_label !== !1 && !!e.label, n = j(this.config?.domain), o = e.color ?? this.nodeFlowColor(e.id) ?? n.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let l = "";
    if (t) {
      const d = Me(t.state), c = t.attributes?.unit_of_measurement ?? "";
      c ? l = `${this.formatSensorNumber(d)} ${c}` : l = n.describe(d);
    }
    const a = e.visible === !1;
    return m`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; --flowme-dot-size: ${r}px;${e.opacity !== void 0 ? ` opacity: ${e.opacity};` : ""}${a ? " display: none;" : ""}`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${s ? m`<span class="node-label">${e.label}</span>` : null}
        ${i ? m`<span class="node-value">${l}</span>` : null}
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
      const r = j(o.domain ?? t), l = ot(o, r, o.domain ?? t, 1, i), a = l.toLowerCase();
      n.has(a) || (n.add(a), s || (s = l));
    }
    if (n.size !== 0)
      return n.size === 1 ? s : ms;
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
R.styles = ie`
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
Z([
  yt({ attribute: !1 })
], R.prototype, "hass", 1);
Z([
  M()
], R.prototype, "config", 2);
Z([
  M()
], R.prototype, "errorMessage", 2);
Z([
  M()
], R.prototype, "bgLayerA", 2);
Z([
  M()
], R.prototype, "bgLayerB", 2);
Z([
  M()
], R.prototype, "activeLayer", 2);
R = Z([
  oe("flowme-card")
], R);
const Qt = window;
Qt.customCards = Qt.customCards ?? [];
Qt.customCards.push({
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
