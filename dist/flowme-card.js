/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis, qt = yt.ShadowRoot && (yt.ShadyCSS === void 0 || yt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Kt = Symbol(), ie = /* @__PURE__ */ new WeakMap();
let Re = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (qt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ie.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ie.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ti = (i) => new Re(typeof i == "string" ? i : i + "", void 0, Kt), Ct = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new Re(e, i, Kt);
}, ei = (i, t) => {
  if (qt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = yt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  }
}, se = qt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ti(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ii, defineProperty: si, getOwnPropertyDescriptor: ni, getOwnPropertyNames: oi, getOwnPropertySymbols: ri, getPrototypeOf: ai } = Object, B = globalThis, ne = B.trustedTypes, li = ne ? ne.emptyScript : "", ci = B.reactiveElementPolyfillSupport, ct = (i, t) => i, $t = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? li : null;
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
} }, Jt = (i, t) => !ii(i, t), oe = { attribute: !0, type: String, converter: $t, reflect: !1, useDefault: !1, hasChanged: Jt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), B.litPropertyMetadata ?? (B.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let it = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = oe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && si(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = ni(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ct("elementProperties"))) return;
    const t = ai(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ct("properties"))) {
      const e = this.properties, s = [...oi(e), ...ri(e)];
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
      for (const n of s) e.unshift(se(n));
    } else t !== void 0 && e.push(se(t));
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
    return ei(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : $t).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : $t;
      this._$Em = n;
      const a = r.fromAttribute(e, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? Jt)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[ct("elementProperties")] = /* @__PURE__ */ new Map(), it[ct("finalized")] = /* @__PURE__ */ new Map(), ci?.({ ReactiveElement: it }), (B.reactiveElementVersions ?? (B.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, re = (i) => i, _t = dt.trustedTypes, ae = _t ? _t.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ue = "$lit$", H = `lit$${Math.random().toFixed(9).slice(2)}$`, Le = "?" + H, di = `<${Le}>`, K = document, ht = () => K.createComment(""), ft = (i) => i === null || typeof i != "object" && typeof i != "function", Yt = Array.isArray, pi = (i) => Yt(i) || typeof i?.[Symbol.iterator] == "function", Nt = `[ 	
\f\r]`, at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, ce = />/g, V = RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, pe = /"/g, He = /^(?:script|style|textarea|title)$/i, ui = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), m = ui(1), st = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), ue = /* @__PURE__ */ new WeakMap(), q = K.createTreeWalker(K, 129);
function Be(i, t) {
  if (!Yt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ae !== void 0 ? ae.createHTML(t) : t;
}
const hi = (i, t) => {
  const e = i.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = at;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let d, c, p = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, c = r.exec(l), c !== null); ) u = r.lastIndex, r === at ? c[1] === "!--" ? r = le : c[1] !== void 0 ? r = ce : c[2] !== void 0 ? (He.test(c[2]) && (n = RegExp("</" + c[2], "g")), r = V) : c[3] !== void 0 && (r = V) : r === V ? c[0] === ">" ? (r = n ?? at, p = -1) : c[1] === void 0 ? p = -2 : (p = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? V : c[3] === '"' ? pe : de) : r === pe || r === de ? r = V : r === le || r === ce ? r = at : (r = V, n = void 0);
    const h = r === V && i[a + 1].startsWith("/>") ? " " : "";
    o += r === at ? l + di : p >= 0 ? (s.push(d), l.slice(0, p) + Ue + l.slice(p) + H + h) : l + H + (p === -2 ? a : h);
  }
  return [Be(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class gt {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, c] = hi(t, e);
    if (this.el = gt.createElement(d, s), q.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = q.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(Ue)) {
          const u = c[r++], h = n.getAttribute(p).split(H), f = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: f[2], strings: h, ctor: f[1] === "." ? gi : f[1] === "?" ? mi : f[1] === "@" ? bi : Mt }), n.removeAttribute(p);
        } else p.startsWith(H) && (l.push({ type: 6, index: o }), n.removeAttribute(p));
        if (He.test(n.tagName)) {
          const p = n.textContent.split(H), u = p.length - 1;
          if (u > 0) {
            n.textContent = _t ? _t.emptyScript : "";
            for (let h = 0; h < u; h++) n.append(p[h], ht()), q.nextNode(), l.push({ type: 2, index: ++o });
            n.append(p[u], ht());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Le) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(H, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += H.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = K.createElement("template");
    return s.innerHTML = t, s;
  }
}
function nt(i, t, e = i, s) {
  if (t === st) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = ft(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(i), n._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = n : e._$Cl = n), n !== void 0 && (t = nt(i, n._$AS(i, t.values), n, s)), t;
}
class fi {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? K).importNode(e, !0);
    q.currentNode = n;
    let o = q.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new mt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new yi(o, this, t)), this._$AV.push(d), l = s[++a];
      }
      r !== l?.index && (o = q.nextNode(), r++);
    }
    return q.currentNode = K, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class mt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = nt(this, t, e), ft(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== st && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && ft(this._$AH) ? this._$AA.nextSibling.data = t : this.T(K.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = gt.createElement(Be(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new fi(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ue.get(t.strings);
    return e === void 0 && ue.set(t.strings, e = new gt(t)), e;
  }
  k(t) {
    Yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new mt(this.O(ht()), this.O(ht()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = re(t).nextSibling;
      re(t).remove(), t = s;
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
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = v;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = nt(this, t, e, 0), r = !ft(t) || t !== this._$AH && t !== st, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = nt(this, a[s + l], e, l), d === st && (d = this._$AH[l]), r || (r = !ft(d) || d !== this._$AH[l]), d === v ? t = v : t !== v && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class gi extends Mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class mi extends Mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class bi extends Mt {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = nt(this, t, e, 0) ?? v) === st) return;
    const s = this._$AH, n = t === v && s !== v || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== v && (s === v || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class yi {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    nt(this, t);
  }
}
const vi = dt.litHtmlPolyfillSupport;
vi?.(gt, mt), (dt.litHtmlVersions ?? (dt.litHtmlVersions = [])).push("3.3.2");
const wi = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new mt(t.insertBefore(ht(), o), o, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis;
let j = class extends it {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = wi(e, this.renderRoot, this.renderOptions);
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
j._$litElement$ = !0, j.finalized = !0, pt.litElementHydrateSupport?.({ LitElement: j });
const xi = pt.litElementPolyfillSupport;
xi?.({ LitElement: j });
(pt.litElementVersions ?? (pt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $i = { attribute: !0, type: String, converter: $t, reflect: !1, hasChanged: Jt }, _i = (i = $i, t, e) => {
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
function I(i) {
  return (t, e) => typeof e == "object" ? _i(i, t, e) : ((s, n, o) => {
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
  return I({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ki = (i) => i.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Si = { CHILD: 2 }, Ai = (i) => (...t) => ({ _$litDirective$: i, values: t });
class Ci {
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
const ut = (i, t) => {
  const e = i._$AN;
  if (e === void 0) return !1;
  for (const s of e) s._$AO?.(t, !1), ut(s, t);
  return !0;
}, kt = (i) => {
  let t, e;
  do {
    if ((t = i._$AM) === void 0) break;
    e = t._$AN, e.delete(i), i = t;
  } while (e?.size === 0);
}, je = (i) => {
  for (let t; t = i._$AM; i = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(i)) break;
    e.add(i), Fi(t);
  }
};
function Mi(i) {
  this._$AN !== void 0 ? (kt(this), this._$AM = i, je(this)) : this._$AM = i;
}
function Pi(i, t = !1, e = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(s)) for (let o = e; o < s.length; o++) ut(s[o], !1), kt(s[o]);
  else s != null && (ut(s, !1), kt(s));
  else ut(this, i);
}
const Fi = (i) => {
  i.type == Si.CHILD && (i._$AP ?? (i._$AP = Pi), i._$AQ ?? (i._$AQ = Mi));
};
class Ei extends Ci {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, s) {
    super._$AT(t, e, s), je(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (ut(this, t), kt(this));
  }
  setValue(t) {
    if (ki(this._$Ct)) this._$Ct._$AI(t, this);
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
const We = () => new Ni();
class Ni {
}
const Ot = /* @__PURE__ */ new WeakMap(), Ve = Ai(class extends Ei {
  render(i) {
    return v;
  }
  update(i, [t]) {
    const e = t !== this.G;
    return e && this.G !== void 0 && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = i.options?.host, this.rt(this.ct = i.element)), v;
  }
  rt(i) {
    if (this.isConnected || (i = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = Ot.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), Ot.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, i), i !== void 0 && this.G.call(this.ht, i);
    } else this.G.value = i;
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
], Ut = ["corner", "diagonal", "curve", "smooth"], Lt = [
  "dots",
  "dash",
  "pulse",
  "arrow",
  "trail",
  "fluid",
  "spark",
  "none"
], Ht = ["circle", "square", "arrow", "teardrop", "diamond"], Bt = ["auto", "forward", "reverse", "both"], he = ["even", "random", "clustered"], Oi = ["javascript:", "vbscript:", "data:", "file:"];
function Ge(i, t = "card_config") {
  const e = [], s = /* @__PURE__ */ new WeakSet(), n = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const a = o.trim().toLowerCase();
        for (const l of Oi)
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
function Ii(i, t = "card_config") {
  const e = Ge(i, t);
  if (e.length === 0) return;
  const s = e[0];
  throw new Error(
    `Unsafe URL scheme '${s.scheme}' in ${s.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class Xt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const fe = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function b(i, t) {
  throw new Xt(`${i}: ${t}`);
}
function Zt(i, t) {
  (!i || typeof i != "object") && b(t, "must be an object with x and y");
  const e = i, s = e.x, n = e.y;
  (typeof s != "number" || !Number.isFinite(s)) && b(`${t}.x`, "must be a finite number"), (typeof n != "number" || !Number.isFinite(n)) && b(`${t}.y`, "must be a finite number");
  const o = s, r = n;
  return (o < 0 || o > 100) && b(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && b(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function ge(i, t) {
  (typeof i != "string" || !i.length) && b(t, "must be a non-empty string");
  const e = i;
  return fe.some((n) => e.startsWith(n)) || b(
    t,
    `must start with one of ${fe.join(", ")} (got "${e.slice(0, 40)}")`
  ), e;
}
function Ti(i, t, e) {
  const s = `nodes[${t}]`;
  (!i || typeof i != "object") && b(s, "must be an object");
  const n = i, o = n.id;
  (typeof o != "string" || !o.length) && b(`${s}.id`, "must be a non-empty string");
  const r = o;
  e.has(r) && b(`${s}.id`, `duplicate node id "${r}"`), e.add(r);
  const a = Zt(n.position, `${s}.position`), l = { id: r, position: a };
  return typeof n.entity == "string" && (l.entity = n.entity), typeof n.label == "string" && (l.label = n.label), typeof n.color == "string" && (l.color = n.color), typeof n.size == "number" && (l.size = n.size), typeof n.show_label == "boolean" && (l.show_label = n.show_label), typeof n.show_value == "boolean" && (l.show_value = n.show_value), n.opacity !== void 0 && (l.opacity = Qt(n.opacity, `${s}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && b(`${s}.visible`, "must be a boolean"), l.visible = n.visible), l;
}
function zi(i, t, e, s) {
  const n = `flows[${t}]`;
  (!i || typeof i != "object") && b(n, "must be an object");
  const o = i, r = o.id;
  (typeof r != "string" || !r.length) && b(`${n}.id`, "must be a non-empty string");
  const a = r;
  e.has(a) && b(`${n}.id`, `duplicate flow id "${a}"`), e.add(a);
  const l = o.from_node;
  (typeof l != "string" || !s.has(l)) && b(`${n}.from_node`, `references unknown node "${String(l)}"`);
  const d = o.to_node;
  (typeof d != "string" || !s.has(d)) && b(`${n}.to_node`, `references unknown node "${String(d)}"`);
  const c = o.entity;
  (typeof c != "string" || !c.length) && b(`${n}.entity`, "must be a non-empty entity id");
  const p = o.waypoints;
  let u = [];
  p !== void 0 && (Array.isArray(p) || b(`${n}.waypoints`, "must be an array (may be empty or omitted)"), u = p.map(
    (f, g) => Zt(f, `${n}.waypoints[${g}]`)
  ));
  const h = {
    id: a,
    from_node: l,
    to_node: d,
    entity: c,
    waypoints: u
  };
  if (typeof o.domain == "string" && (St.includes(o.domain) || b(`${n}.domain`, `must be one of ${St.join(", ")}`), h.domain = o.domain), typeof o.color == "string" && (h.color = o.color), typeof o.color_positive == "string" && (h.color_positive = o.color_positive), typeof o.color_negative == "string" && (h.color_negative = o.color_negative), typeof o.threshold == "number" && (h.threshold = o.threshold), typeof o.reverse == "boolean" && (h.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const f = o.speed_multiplier;
    (f < 0.1 || f > 5) && b(`${n}.speed_multiplier`, "must be between 0.1 and 5.0"), h.speed_multiplier = f;
  }
  return o.opacity !== void 0 && (h.opacity = Qt(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && b(`${n}.visible`, "must be a boolean"), h.visible = o.visible), o.line_style !== void 0 && (Ut.includes(o.line_style) || b(`${n}.line_style`, `must be one of ${Ut.join(", ")}`), h.line_style = o.line_style), o.speed_curve_override !== void 0 && (h.speed_curve_override = Di(
    o.speed_curve_override,
    `${n}.speed_curve_override`
  )), o.animation !== void 0 && (h.animation = Li(o.animation, `${n}.animation`)), h;
}
function Di(i, t) {
  (!i || typeof i != "object" || Array.isArray(i)) && b(t, "must be an object");
  const e = i, s = {};
  function n(u) {
    const h = e[u];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && b(`${t}.${u}`, "must be a positive finite number"), h;
  }
  function o(u) {
    const h = e[u];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h < 50) && b(`${t}.${u}`, "must be a finite number ≥ 50 (milliseconds)"), h;
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
    const u = e.steepness;
    (typeof u != "number" || !Number.isFinite(u) || u <= 0) && b(`${t}.steepness`, "must be a positive finite number"), s.steepness = u;
  }
  s.max_duration !== void 0 && s.min_duration !== void 0 && s.min_duration >= s.max_duration && b(t, "min_duration must be < max_duration");
  const p = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const u of Object.keys(e))
    p.has(u) || b(`${t}.${u}`, `unknown key (allowed: ${[...p].join(", ")})`);
  return s;
}
function tt(i, t) {
  return (typeof i != "number" || !Number.isFinite(i) || i <= 0) && b(t, "must be a positive finite number"), i;
}
function Ri(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && b("defaults", "must be an object");
  const t = i, e = {};
  if (t.node_radius !== void 0 && (e.node_radius = tt(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const s = tt(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    s > 1 && b("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), e.burst_trigger_ratio = s;
  }
  return t.burst_sustain_ms !== void 0 && (e.burst_sustain_ms = tt(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (e.burst_max_particles = tt(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (e.dot_radius = tt(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (e.line_width = tt(t.line_width, "defaults.line_width")), e;
}
function Qt(i, t) {
  return (typeof i != "number" || !Number.isFinite(i) || i < 0 || i > 1) && b(t, "must be a number between 0 and 1"), i;
}
function Ui(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && b("opacity", "must be an object");
  const t = i, e = {};
  for (const s of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[s] !== void 0 && (e[s] = Qt(t[s], `opacity.${s}`));
  return e;
}
function Li(i, t) {
  (!i || typeof i != "object" || Array.isArray(i)) && b(t, "must be an object");
  const e = i, s = {};
  e.animation_style !== void 0 && (Lt.includes(e.animation_style) || b(`${t}.animation_style`, `must be one of ${Lt.join(", ")}`), s.animation_style = e.animation_style), e.particle_shape !== void 0 && (Ht.includes(e.particle_shape) || b(`${t}.particle_shape`, `must be one of ${Ht.join(", ")}`), s.particle_shape = e.particle_shape), e.direction !== void 0 && (Bt.includes(e.direction) || b(`${t}.direction`, `must be one of ${Bt.join(", ")}`), s.direction = e.direction), e.particle_spacing !== void 0 && (he.includes(e.particle_spacing) || b(`${t}.particle_spacing`, `must be one of ${he.join(", ")}`), s.particle_spacing = e.particle_spacing);
  const n = (p, u) => {
    const h = e[p];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && b(`${t}.${p}`, "must be a positive finite number"), h;
  }, o = (p) => {
    const u = e[p];
    if (u !== void 0)
      return typeof u != "boolean" && b(`${t}.${p}`, "must be a boolean"), u;
  }, r = n("particle_size");
  if (r !== void 0 && (s.particle_size = r), e.particle_count !== void 0) {
    const p = e.particle_count;
    (typeof p != "number" || !Number.isFinite(p) || p < 1 || !Number.isInteger(p)) && b(`${t}.particle_count`, "must be a positive integer ≥ 1"), s.particle_count = p;
  }
  if (e.glow_intensity !== void 0) {
    const p = e.glow_intensity;
    (typeof p != "number" || !Number.isFinite(p) || p < 0) && b(`${t}.glow_intensity`, "must be a non-negative finite number"), s.glow_intensity = p;
  }
  const a = o("shimmer");
  a !== void 0 && (s.shimmer = a);
  const l = o("flicker");
  l !== void 0 && (s.flicker = l);
  const d = n("pulse_width");
  d !== void 0 && (s.pulse_width = d);
  const c = n("trail_length");
  if (c !== void 0 && (s.trail_length = c), e.dash_gap !== void 0) {
    const p = e.dash_gap;
    (typeof p != "number" || !Number.isFinite(p) || p < 0 || p > 10) && b(`${t}.dash_gap`, "must be a number between 0 and 10"), s.dash_gap = p;
  }
  return s;
}
function Hi(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && b("animation", "must be an object");
  const t = i, e = {};
  if (t.fps !== void 0) {
    const s = t.fps;
    (typeof s != "number" || !Number.isFinite(s) || s < 1 || s > 120) && b("animation.fps", "must be a number between 1 and 120"), e.fps = s;
  }
  return t.smooth_speed !== void 0 && (typeof t.smooth_speed != "boolean" && b("animation.smooth_speed", "must be a boolean"), e.smooth_speed = t.smooth_speed), e;
}
function Bi(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && b("visibility", "must be an object");
  const t = i, e = {};
  for (const s of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[s] !== void 0 && (typeof t[s] != "boolean" && b(`visibility.${s}`, "must be a boolean"), e[s] = t[s]);
  return e;
}
function ji(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && b("domain_colors", "must be an object");
  const t = i, e = {};
  for (const s of ["solar", "grid", "battery", "load"])
    t[s] !== void 0 && (typeof t[s] != "string" && b(`domain_colors.${s}`, "must be a string colour value"), e[s] = t[s]);
  return e;
}
function vt(i) {
  if (!i || typeof i != "object") throw new Xt("config must be an object");
  const t = i;
  t.type !== "custom:flowme-card" && b("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), St.includes(t.domain) || b("domain", `must be one of ${St.join(", ")}`);
  const e = t.background;
  e !== void 0 && (e === null || typeof e != "object") && b("background", "must be an object when provided");
  const s = e ?? {}, o = { default: s.default === void 0 || s.default === "" ? "" : ge(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && b("background.weather_entity", "must be a string entity id"), o.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && b("background.weather_states", "must be an object mapping state strings to image URLs");
    const h = Object.entries(s.weather_states), f = {};
    for (const [g, y] of h)
      f[g] = ge(y, `background.weather_states.${g}`);
    o.weather_states = f;
  }
  s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && b("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = s.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || b("nodes", "must be an array");
  const a = /* @__PURE__ */ new Set(), l = r.map((h, f) => Ti(h, f, a));
  l.length === 0 && b("nodes", "at least one node is required");
  const d = t.flows;
  Array.isArray(d) || b("flows", "must be an array");
  const c = /* @__PURE__ */ new Set(), p = d.map(
    (h, f) => zi(h, f, c, a)
  ), u = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: l,
    flows: p
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && b("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), u.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && b("fullscreen", "must be a boolean"), u.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && b("edit_mode_password", "must be a string"), u.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || b("overlays", "must be an array");
    const h = /* @__PURE__ */ new Set();
    u.overlays = t.overlays.map(
      (f, g) => Wi(f, g, h)
    );
  }
  return t.defaults !== void 0 && (u.defaults = Ri(t.defaults)), t.domain_colors !== void 0 && (u.domain_colors = ji(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && b("debug", "must be a boolean"), u.debug = t.debug), t.opacity !== void 0 && (u.opacity = Ui(t.opacity)), t.visibility !== void 0 && (u.visibility = Bi(t.visibility)), t.animation !== void 0 && (u.animation = Hi(t.animation)), u;
}
function Wi(i, t, e) {
  const s = `overlays[${t}]`;
  (!i || typeof i != "object") && b(s, "must be an object");
  const n = i, o = n.type, a = typeof o == "string" && ["camera", "switch", "sensor", "button"].includes(o);
  !a && o !== "custom" && b(
    `${s}.type`,
    'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.'
  );
  const l = n.id;
  (typeof l != "string" || !l.length) && b(`${s}.id`, "must be a non-empty string"), e.has(l) && b(`${s}.id`, `duplicate overlay id "${l}"`), e.add(l);
  const d = Zt(n.position, `${s}.position`);
  if (a) {
    const f = `type: ${o} was removed in v1.0.9. Replace with type: custom and a card: block. See documentation.`;
    console.warn(`[flowme] ${s}: ${f}`);
    const g = {
      id: l,
      type: "custom",
      position: d,
      card: { type: "markdown", content: "" },
      _migration_warning: f
    };
    if (n.size !== void 0) {
      const y = n.size;
      if (y && typeof y == "object") {
        const w = y, S = w.width, x = w.height;
        typeof S == "number" && typeof x == "number" && (g.size = { width: S, height: x });
      }
    }
    return g;
  }
  const c = n.card;
  (!c || typeof c != "object" || Array.isArray(c)) && b(`${s}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  const p = Ge(c, `${s}.card`);
  if (p.length) {
    const f = p[0];
    b(
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
    (!f || typeof f != "object") && b(`${s}.size`, "must be an object with width and height");
    const g = f, y = g.width, w = g.height;
    (typeof y != "number" || !Number.isFinite(y) || y <= 0 || y > 100) && b(`${s}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof w != "number" || !Number.isFinite(w) || w <= 0 || w > 100) && b(`${s}.size.height`, "must be a positive number ≤ 100 (percent of card)"), h.size = { width: y, height: w };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && b(`${s}.visible`, "must be a boolean"), h.visible = n.visible), n.opacity !== void 0) {
    const f = n.opacity;
    (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 1) && b(`${s}.opacity`, "must be a number between 0 and 1"), h.opacity = f;
  }
  return h;
}
function te(i, t, e) {
  return i < t ? t : i > e ? e : i;
}
function At(i, t) {
  return { x: i.x / 100 * t.width, y: i.y / 100 * t.height };
}
function qe(i) {
  let t = 0;
  for (let e = 1; e < i.length; e++) {
    const s = i[e - 1], n = i[e];
    if (!s || !n) continue;
    const o = n.x - s.x, r = n.y - s.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function Vi(i, t) {
  if (i.length === 0) return { x: 0, y: 0 };
  if (i.length === 1) return { ...i[0] };
  const e = qe(i), s = te(t, 0, 1) * e;
  let n = 0;
  for (let o = 1; o < i.length; o++) {
    const r = i[o - 1], a = i[o], l = a.x - r.x, d = a.y - r.y, c = Math.sqrt(l * l + d * d);
    if (n + c >= s) {
      const p = c === 0 ? 0 : (s - n) / c;
      return { x: r.x + l * p, y: r.y + d * p };
    }
    n += c;
  }
  return { ...i[i.length - 1] };
}
function me(i, t, e) {
  if (i.length === 0) return "";
  if (i.length === 1) {
    const a = At(i[0], t);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const s = i.map((a) => At(a, t));
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
      const d = s[l - 1], c = s[l], p = (c.x - d.x) / 3, u = (c.y - d.y) / 3, h = (d.x + p).toFixed(2), f = (d.y + u).toFixed(2), g = (c.x - p).toFixed(2), y = (c.y - u).toFixed(2);
      a.push(`C ${h} ${f} ${g} ${y} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
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
    const p = Math.sqrt((d.x - l.x) ** 2 + (d.y - l.y) ** 2), u = Math.sqrt((c.x - d.x) ** 2 + (c.y - d.y) ** 2), h = Math.min(Math.min(p, u) * n, o), f = h / (p || 1), g = d.x - (d.x - l.x) * f, y = d.y - (d.y - l.y) * f, w = h / (u || 1), S = d.x + (c.x - d.x) * w, x = d.y + (c.y - d.y) * w;
    r.push(`L ${g.toFixed(2)} ${y.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${S.toFixed(2)} ${x.toFixed(2)}`);
  }
  return r.join(" ");
}
function be(i) {
  if (i == null) return 0;
  if (typeof i == "number") return Number.isFinite(i) ? i : 0;
  const t = i.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const e = Number.parseFloat(t);
  return Number.isFinite(e) ? e : 0;
}
const J = 9e3, Y = 700, X = 1.5;
function U(i, t) {
  const { threshold: e, p50: s, max_duration: n, min_duration: o, steepness: r } = t, a = Math.abs(i);
  if (!(s > 0) || !(e > 0)) return n;
  const l = Math.max(a, e), d = Math.log10(l / s), c = 1 / (1 + Math.exp(-r * d));
  return n - c * (n - o);
}
function ee(i, t) {
  const e = i.speed_curve_override ?? {}, s = e.threshold ?? i.threshold ?? t.threshold, n = e.p50 ?? t.p50, o = e.peak ?? t.peak, r = e.max_duration ?? J, a = e.min_duration ?? Y, l = e.steepness ?? X;
  return { threshold: s, p50: n, peak: o, max_duration: r, min_duration: a, steepness: l };
}
function Gi(i, t, e) {
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
function Ke(i, t) {
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
function wt(i) {
  if (!i) return;
  const t = /^(\d+):(\d+)$/.exec(i);
  if (!t) return;
  const e = Number.parseInt(t[1], 10), s = Number.parseInt(t[2], 10);
  if (!(!e || !s))
    return e / s;
}
const qi = {
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
    return U(i, {
      threshold: 30,
      p50: 800,
      max_duration: J,
      min_duration: Y,
      steepness: X
    });
  },
  describe(i) {
    return Math.abs(i) >= 1e3 ? `${(i / 1e3).toFixed(2)} kW` : `${Math.round(i)} W`;
  }
}, Ki = {
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
    return U(i, {
      threshold: 0.3,
      p50: 6,
      max_duration: J,
      min_duration: Y,
      steepness: X
    });
  },
  wave_amplitude_curve(i) {
    return 4;
  },
  describe(i) {
    return Math.abs(i) >= 100 ? `${i.toFixed(0)} L/min` : Math.abs(i) >= 10 ? `${i.toFixed(1)} L/min` : `${i.toFixed(2)} L/min`;
  }
}, Ji = {
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
    return U(i, {
      threshold: 0.05,
      p50: 50,
      max_duration: J,
      min_duration: Y,
      steepness: X
    });
  },
  particle_count_curve(i) {
    const t = Math.abs(i);
    return Math.round(te(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(i) {
    const t = Math.abs(i);
    return t >= 1e3 ? `${(i / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${i.toFixed(1)} Mbps` : `${i.toFixed(2)} Mbps`;
  }
}, Yi = {
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
    return U(i, {
      threshold: 5,
      p50: 200,
      max_duration: J,
      min_duration: Y,
      steepness: X
    });
  },
  wave_amplitude_curve(i) {
    const t = Math.abs(i);
    return te(2 + t / 100, 2, 10);
  },
  describe(i) {
    return `${Math.round(i)} CFM`;
  }
}, Xi = {
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
    return U(i, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: J,
      min_duration: Y,
      steepness: X
    });
  },
  describe(i) {
    return Math.abs(i) >= 10 ? `${i.toFixed(1)} m³/h` : `${i.toFixed(2)} m³/h`;
  }
}, Je = {
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
    return U(i, {
      threshold: 1,
      p50: 100,
      max_duration: J,
      min_duration: Y,
      steepness: X
    });
  },
  describe(i) {
    return Math.abs(i) >= 100 ? i.toFixed(0) : Math.abs(i) >= 10 ? i.toFixed(1) : i.toFixed(2);
  }
}, ye = {
  energy: qi,
  water: Ki,
  network: Ji,
  hvac: Yi,
  gas: Xi,
  generic: Je
};
function W(i) {
  return i && i in ye ? ye[i] : Je;
}
const Zi = "#CCCCCC";
function Qi(i, t, e) {
  if (i !== "energy") return;
  const s = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(s)) return e?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(s)) return e?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(s)) return e?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(s))
    return e?.load ?? "#FF8C1E";
}
function ot(i, t, e, s, n) {
  const o = i.color ?? Qi(e, i.id, n);
  return s >= 0 ? i.color_positive ?? o ?? t.default_color_positive : i.color_negative ?? o ?? t.default_color_negative;
}
const ts = "[FlowMe]";
let Ye = !1;
function es(i) {
  Ye = i;
}
function F(...i) {
  Ye && console.warn(ts, ...i);
}
const is = "[FlowMe Renderer]";
function It(...i) {
  F(is, ...i);
}
const k = "http://www.w3.org/2000/svg", L = "http://www.w3.org/1999/xlink";
function ss() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const Tt = ss(), ns = 2e3, zt = 3, os = 5, Dt = 2, rs = 14, as = 0.9, ls = 5e3, lt = 20, cs = 0.2, ds = 0.3;
class jt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Ke(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.currentDurMs = /* @__PURE__ */ new Map(), this.targetDurMs = /* @__PURE__ */ new Map(), this.speedTransitionStart = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0;
  }
  async init(t, e) {
    It("init:", t.getBoundingClientRect(), "flows:", e.flows.length), this.container = t, this.config = e, this.flowsById = new Map(e.flows.map((n) => [n.id, n]));
    const s = document.createElementNS(k, "svg");
    s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("preserveAspectRatio", "none"), s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.overflow = "visible", this.svg = s, t.appendChild(s), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t), this.startFpsLoop();
  }
  updateFlow(t, e) {
    this.flowsById.has(t) && (this.latestValues.set(t, e), this.applyUpdate());
  }
  /**
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  startFpsLoop() {
    const t = this.config?.animation?.fps ?? 60, e = 1e3 / t, s = (n) => {
      if (!this.svg) return;
      const o = n - this.lastFrameTime;
      o >= e && (this.lastFrameTime = n - o % e, this.config?.animation?.smooth_speed !== !1 && this.speedTransitionStart.size > 0 && this.flushUpdates()), this.rafHandle = requestAnimationFrame(s);
    };
    t < 60 && (this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(s));
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.currentDurMs.clear(), this.targetDurMs.clear(), this.speedTransitionStart.clear();
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
    const e = document.createElementNS(k, "defs");
    this.svg.appendChild(e);
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const a = [o.position, ...n.waypoints, r.position], l = `flowme-path-${n.id}`, d = document.createElementNS(k, "path");
      d.setAttribute("id", l), d.setAttribute("d", me(a, t, n.line_style ?? "corner")), d.setAttribute("fill", "none"), e.appendChild(d);
      const c = document.createElementNS(k, "g");
      c.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && c.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (c.style.display = "none");
      const p = this.config?.defaults?.line_width ?? Dt, u = document.createElementNS(k, "use");
      u.setAttributeNS(L, "href", `#${l}`), u.setAttribute("href", `#${l}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(p)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), c.appendChild(u);
      const h = {
        group: c,
        path: d,
        pathId: l,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(c), this.flowNodes.set(n.id, h), It("skeleton:", n.id, "| style=", h.style);
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
      n.path.setAttribute("d", me(a, t, s.line_style ?? "corner")), n.style === "pulse" && this.applyFlow(s.id, this.latestValues.get(s.id) ?? 0);
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
    const a = this.profileFor(s), l = ee(s, a), d = Tt ? 0 : l.threshold, c = Math.abs(e), u = o.shimmer === !0 && c < d && c > 0;
    if (!(Tt || c >= d || u)) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const f = Tt ? ns : U(c, l), g = s.speed_multiplier ?? 1;
    let y = Math.max(50, f * g);
    u && (y = y / cs);
    const w = this.config?.animation?.smooth_speed !== !1;
    y = this.resolveSmoothedDur(t, y, w);
    const S = o.direction ?? "auto";
    let x;
    S === "forward" ? x = 1 : S === "reverse" ? x = -1 : x = e < 0 != (s.reverse === !0) ? -1 : 1;
    const C = s.domain ?? this.config?.domain, _ = ot(s, a, C, x, this.config?.domain_colors), O = u ? ds : 1;
    this.setGroupOpacity(n, O);
    const P = this.updateBurstState(t, c, l, a);
    switch (It("applyFlow:", t, "style=", r, "dur=", y, "dir=", x, "color=", _), r) {
      case "dots":
        this.applyDots(n, s, a, e, y, _, x, P);
        break;
      case "dash":
        this.applyDash(n, s, y, _, x, P);
        break;
      case "pulse":
        this.applyPulse(n, s, a, e, y, _, P);
        break;
      case "arrow":
        this.applyArrows(n, s, y, _, x, P);
        break;
      case "trail":
        this.applyTrail(n, s, y, _, x, P);
        break;
      case "fluid":
        this.applyFluid(n, s, y, _, x);
        break;
      case "spark":
        this.applySpark(n, s, a, e, y, _, x, P);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, s, a, e, y, _, x, P);
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
    const d = a / l, c = d * d * (3 - 2 * d), p = o + (e - o) * c;
    return this.currentDurMs.set(t, p), p;
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(t, e, s, n) {
    const o = s.peak, r = this.config?.defaults?.burst_trigger_ratio ?? as, a = this.config?.defaults?.burst_sustain_ms ?? ls, l = o * r;
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
  /** Resolve effective particle count, respecting explicit override and burst */
  resolveParticleCount(t, e, s, n) {
    const o = t.animation ?? {};
    if (o.particle_count !== void 0) return o.particle_count;
    const r = Math.max(
      1,
      Math.round(e.particle_count_curve ? e.particle_count_curve(s) : zt)
    ), a = this.config?.defaults?.burst_max_particles ?? lt;
    return Math.min(a, Math.max(1, Math.round(r * n)));
  }
  resolveParticleRadius(t) {
    return (this.config?.defaults?.dot_radius ?? os) * (t.animation?.particle_size ?? 1);
  }
  resolveGlow(t, e) {
    return t.animation?.glow_intensity === 0 ? !1 : e.glow;
  }
  glowFilter(t, e, s) {
    return this.resolveGlow(t, e) ? `drop-shadow(0 0 ${(6 * (t.animation?.glow_intensity ?? 1)).toFixed(1)}px ${s})` : "";
  }
  // ── animation style implementations ──────────────────────────────────────
  /**
   * dots — filled particles moving along path via animateMotion.
   * Supports: circle, square, arrow, teardrop, diamond shapes.
   * Supports: direction, flicker, glow, burst, shimmer.
   */
  applyDots(t, e, s, n, o, r, a, l) {
    const d = e.animation?.direction ?? "auto", c = this.resolveParticleCount(e, s, n, l), p = e.animation?.particle_shape ?? "circle", u = e.animation?.flicker === !0;
    if (t.particles.length !== c || t.particles[0] && this.particleKind(t.particles[0]) !== p) {
      for (const g of t.particles) g.shape.remove();
      t.particles = [];
      for (let g = 0; g < c; g++)
        t.particles.push(this.makeParticle(t, p, r, e, s));
    }
    if (d === "both") {
      if (!t.particlesBack || t.particlesBack.length !== c) {
        if (t.particlesBack) for (const g of t.particlesBack) g.shape.remove();
        t.particlesBack = [];
        for (let g = 0; g < c; g++)
          t.particlesBack.push(this.makeParticle(t, p, r, e, s));
      }
    } else if (t.particlesBack) {
      for (const g of t.particlesBack) g.shape.remove();
      t.particlesBack = void 0;
    }
    const h = `${(o / 1e3).toFixed(3)}s`, f = (g, y) => {
      for (let w = 0; w < g.length; w++) {
        const S = g[w];
        this.updateParticleColor(S, r, e, s, u);
        const x = document.createElementNS(k, "animateMotion");
        x.setAttribute("repeatCount", "indefinite"), x.setAttribute("dur", h), x.setAttribute("rotate", "auto"), x.setAttribute("begin", `${(-o * w / (g.length * 1e3)).toFixed(3)}s`), y < 0 && (x.setAttribute("keyPoints", "1;0"), x.setAttribute("keyTimes", "0;1"));
        const C = document.createElementNS(k, "mpath");
        C.setAttributeNS(L, "href", `#${t.pathId}`), C.setAttribute("href", `#${t.pathId}`), x.appendChild(C), S.animateMotion.replaceWith(x), S.animateMotion = x, S.shape.appendChild(x);
      }
    };
    f(t.particles, a), t.particlesBack && f(t.particlesBack, -a);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(t, e, s, n, o, r) {
    for (const w of t.particles) w.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const w = document.createElementNS(k, "use");
      w.setAttributeNS(L, "href", `#${t.pathId}`), w.setAttribute("href", `#${t.pathId}`), w.setAttribute("fill", "none"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("stroke-linejoin", "round"), t.group.appendChild(w), t.lineStroke = w;
    }
    const a = this.config?.defaults?.line_width ?? Dt, d = (e.animation ?? {}).dash_gap ?? 0.5, c = Math.max(0.1, d / r), p = 14, u = p * c, h = this.glowFilter(e, this.profileFor(e), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(a * 2)), t.lineStroke.setAttribute("stroke-dasharray", `${p} ${u}`), h && t.lineStroke.setAttribute("filter", h);
    const f = p + u, g = t.lineStroke.querySelector("animate");
    g && g.remove();
    const y = document.createElementNS(k, "animate");
    y.setAttribute("attributeName", "stroke-dashoffset"), y.setAttribute("from", o > 0 ? "0" : `-${f}`), y.setAttribute("to", o > 0 ? `-${f}` : "0"), y.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), y.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(y);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(t, e, s, n, o, r, a) {
    for (const C of t.particles) C.shape.remove();
    t.particles = [], t.lineStroke?.remove(), t.lineStroke = void 0;
    const l = new Map(this.config?.nodes.map((C) => [C.id, C]) ?? []), d = l.get(e.from_node), c = l.get(e.to_node);
    if (!d || !c) return;
    const p = [d.position, ...e.waypoints, c.position], u = qe(p), h = Math.max(
      2,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Math.max(3, Math.floor(u / 15))
      )
    ), f = this.config?.defaults?.burst_max_particles ?? lt, g = Math.min(f, Math.max(2, Math.round(h * a))), y = this.containerSize(), w = e.animation?.pulse_width ?? 2, S = rs * (e.animation?.particle_size ?? 1), x = this.resolveGlow(e, s);
    if (!t.pulseCircles || t.pulseCircles.length !== g) {
      if (t.pulseCircles) for (const C of t.pulseCircles) C.circle.remove();
      t.pulseCircles = [];
      for (let C = 0; C < g; C++) {
        const _ = document.createElementNS(k, "circle");
        _.setAttribute("r", "0"), _.setAttribute("fill", "none"), _.setAttribute("stroke", r), _.setAttribute("stroke-width", String(w)), _.setAttribute("opacity", "0"), x && _.setAttribute("filter", this.glowFilter(e, s, r));
        const O = document.createElementNS(k, "animate");
        O.setAttribute("attributeName", "r"), O.setAttribute("values", `0;${S};0`), O.setAttribute("repeatCount", "indefinite"), _.appendChild(O);
        const P = document.createElementNS(k, "animate");
        P.setAttribute("attributeName", "opacity"), P.setAttribute("values", "0;0.9;0"), P.setAttribute("repeatCount", "indefinite"), _.appendChild(P), t.group.appendChild(_), t.pulseCircles.push({ circle: _, animateRadius: O, animateOpacity: P });
      }
    }
    for (let C = 0; C < t.pulseCircles.length; C++) {
      const _ = t.pulseCircles[C], O = (C + 0.5) / t.pulseCircles.length, P = Vi(p, O), T = At(P, y);
      _.circle.setAttribute("cx", T.x.toFixed(2)), _.circle.setAttribute("cy", T.y.toFixed(2)), _.circle.setAttribute("stroke", r);
      const z = `${(o / 1e3).toFixed(3)}s`, bt = `${(-o * C / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      _.animateRadius.setAttribute("values", `0;${S};0`), _.animateRadius.setAttribute("dur", z), _.animateRadius.setAttribute("begin", bt), _.animateOpacity.setAttribute("dur", z), _.animateOpacity.setAttribute("begin", bt);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(t, e, s, n, o, r) {
    const a = this.profileFor(e), l = e.animation?.particle_count ?? zt, d = this.config?.defaults?.burst_max_particles ?? lt, c = Math.min(d, Math.max(1, Math.round(l * r))), p = e.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const h of t.particles) h.shape.remove();
      t.particles = [];
      for (let h = 0; h < c; h++)
        t.particles.push(this.makeParticle(t, "arrow", n, e, a));
    }
    const u = `${(s / 1e3).toFixed(3)}s`;
    for (let h = 0; h < t.particles.length; h++) {
      const f = t.particles[h];
      this.updateParticleColor(f, n, e, a, p);
      const g = document.createElementNS(k, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(-s * h / (t.particles.length * 1e3)).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const y = document.createElementNS(k, "mpath");
      y.setAttributeNS(L, "href", `#${t.pathId}`), y.setAttribute("href", `#${t.pathId}`), g.appendChild(y), f.animateMotion.replaceWith(g), f.animateMotion = g, f.shape.appendChild(g);
    }
  }
  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
   */
  applyTrail(t, e, s, n, o, r) {
    const a = this.profileFor(e), l = e.animation?.particle_count ?? zt, d = this.config?.defaults?.burst_max_particles ?? lt, c = Math.min(d, Math.max(1, Math.round(l * r))), p = e.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const h of t.particles) h.shape.remove();
      t.particles = [];
      for (let h = 0; h < c; h++)
        t.particles.push(this.makeParticle(t, "teardrop", n, e, a));
    }
    const u = `${(s / 1e3).toFixed(3)}s`;
    for (let h = 0; h < t.particles.length; h++) {
      const f = t.particles[h];
      this.updateParticleColor(f, n, e, a, p);
      const g = document.createElementNS(k, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(-s * h / (t.particles.length * 1e3)).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const y = document.createElementNS(k, "mpath");
      y.setAttributeNS(L, "href", `#${t.pathId}`), y.setAttribute("href", `#${t.pathId}`), g.appendChild(y), f.animateMotion.replaceWith(g), f.animateMotion = g, f.shape.appendChild(g);
    }
  }
  /**
   * fluid — continuous gradient flowing along the line.
   * Implemented as an animated stroke-dashoffset on a wide stroke.
   */
  applyFluid(t, e, s, n, o) {
    for (const c of t.particles) c.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const c = document.createElementNS(k, "use");
      c.setAttributeNS(L, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), c.setAttribute("fill", "none"), c.setAttribute("stroke-linecap", "round"), t.group.appendChild(c), t.lineStroke = c;
    }
    const r = (this.config?.defaults?.line_width ?? Dt) * 3, a = this.glowFilter(e, this.profileFor(e), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(r)), t.lineStroke.setAttribute("stroke-dasharray", "50 200"), a && t.lineStroke.setAttribute("filter", a);
    const l = t.lineStroke.querySelector("animate");
    l && l.remove();
    const d = document.createElementNS(k, "animate");
    d.setAttribute("attributeName", "stroke-dashoffset"), d.setAttribute("from", o > 0 ? "0" : "-250"), d.setAttribute("to", o > 0 ? "-250" : "0"), d.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), d.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(d);
  }
  /**
   * spark — particles with randomised size/opacity, slight scatter.
   * Scatter is achieved via SVG transform on each particle's <g> wrapper.
   */
  applySpark(t, e, s, n, o, r, a, l) {
    const d = this.resolveParticleCount(e, s, n, l), c = Math.min(
      this.config?.defaults?.burst_max_particles ?? lt,
      Math.round(d * l)
    ), p = e.animation?.particle_shape ?? "circle", u = e.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++) {
        const g = this.makeParticle(t, p, r, e, s), y = 0.7 + Math.random() * 0.6;
        g.shape.setAttribute("transform", `scale(${y.toFixed(2)})`), t.particles.push(g);
      }
    }
    const h = `${(o / 1e3).toFixed(3)}s`;
    for (let f = 0; f < t.particles.length; f++) {
      const g = t.particles[f], y = 0.5 + Math.random() * 0.5;
      g.shape.setAttribute("opacity", String(y.toFixed(2))), this.updateParticleColor(g, r, e, s, u);
      const w = document.createElementNS(k, "animateMotion");
      w.setAttribute("repeatCount", "indefinite"), w.setAttribute("dur", h), w.setAttribute("rotate", "auto"), w.setAttribute("begin", `${(-o * f / (t.particles.length * 1e3)).toFixed(3)}s`), a < 0 && (w.setAttribute("keyPoints", "1;0"), w.setAttribute("keyTimes", "0;1"));
      const S = document.createElementNS(k, "mpath");
      S.setAttributeNS(L, "href", `#${t.pathId}`), S.setAttribute("href", `#${t.pathId}`), w.appendChild(S), g.animateMotion.replaceWith(w), g.animateMotion = w, g.shape.appendChild(w);
    }
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(t) {
    const e = t.shape.tagName.toLowerCase();
    return e === "circle" ? "circle" : e === "rect" ? "square" : e === "polygon" ? t.shape.getAttribute("data-kind") ?? "arrow" : e === "ellipse" ? "teardrop" : "circle";
  }
  makeParticle(t, e, s, n, o) {
    const r = this.resolveParticleRadius(n), a = this.resolveGlow(n, o);
    let l;
    switch (e) {
      case "square": {
        const p = r * 2, u = document.createElementNS(k, "rect");
        u.setAttribute("width", String(p)), u.setAttribute("height", String(p)), u.setAttribute("x", String(-p / 2)), u.setAttribute("y", String(-p / 2)), u.setAttribute("rx", "1.5"), u.setAttribute("fill", s), u.setAttribute("opacity", "0"), l = u;
        break;
      }
      case "arrow": {
        const p = r * 2.2, u = r * 1.5, h = document.createElementNS(k, "polygon");
        h.setAttribute("points", `${p},0 ${-p * 0.4},${u} 0,0 ${-p * 0.4},${-u}`), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "arrow"), l = h;
        break;
      }
      case "teardrop": {
        const p = n.animation?.trail_length ?? 2, u = r, h = r * p, f = document.createElementNS(k, "ellipse");
        f.setAttribute("rx", String(u)), f.setAttribute("ry", String(h)), f.setAttribute("cy", String(-h * 0.3)), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), l = f;
        break;
      }
      case "diamond": {
        const p = r * 1.4, u = document.createElementNS(k, "polygon");
        u.setAttribute("points", `0,${-p} ${p},0 0,${p} ${-p},0`), u.setAttribute("fill", s), u.setAttribute("opacity", "0"), u.setAttribute("data-kind", "diamond"), l = u;
        break;
      }
      default: {
        const p = document.createElementNS(k, "circle");
        p.setAttribute("r", String(r)), p.setAttribute("fill", s), p.setAttribute("opacity", "0"), l = p;
      }
    }
    a && (l.setAttribute("filter", this.glowFilter(n, o, s)), l.style.color = s);
    const d = document.createElementNS(k, "animateMotion");
    d.setAttribute("repeatCount", "indefinite"), d.setAttribute("dur", "2s");
    const c = document.createElementNS(k, "mpath");
    return c.setAttributeNS(L, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), d.appendChild(c), l.appendChild(d), t.group.appendChild(l), { shape: l, animateMotion: d };
  }
  updateParticleColor(t, e, s, n, o) {
    if (t.shape.setAttribute("fill", e), t.shape.style.color = e, this.resolveGlow(s, n) && t.shape.setAttribute("filter", this.glowFilter(s, n, e)), t.shape.setAttribute("opacity", "1"), o) {
      if (!t.flickerAnim) {
        const u = document.createElementNS(k, "animate");
        u.setAttribute("attributeName", "opacity"), u.setAttribute("repeatCount", "indefinite"), t.shape.appendChild(u), t.flickerAnim = u;
      }
      const d = (1 / (2 + Math.random() * 6)).toFixed(3), c = (0.85 + Math.random() * 0.1).toFixed(2), p = (0.95 + Math.random() * 0.05).toFixed(2);
      t.flickerAnim.setAttribute("values", `${p};${c};${p}`), t.flickerAnim.setAttribute("dur", `${d}s`);
    } else t.flickerAnim && (t.flickerAnim.remove(), t.flickerAnim = void 0);
  }
  profileFor(t) {
    return W(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const e = this.profileFor(t), s = t.domain ?? this.config?.domain;
    return ot(t, e, s, 1, this.config?.domain_colors);
  }
}
const ps = `/* eslint-disable no-undef */
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
`, ve = "flowme-keyframes", Wt = "flowme-cycle", us = 5, hs = 2;
let G = null, we = !1;
function fs() {
  if (document.getElementById(ve)) return;
  const i = document.createElement("style");
  i.id = ve, i.textContent = `@keyframes ${Wt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(i);
}
function gs() {
  if (we) return;
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
  we = !0;
}
async function ms() {
  if (G) return G;
  const i = CSS.paintWorklet;
  if (!i)
    return G = Promise.reject(new Error("paintWorklet not available")), G;
  const t = new Blob([ps], { type: "application/javascript" }), e = URL.createObjectURL(t);
  return G = i.addModule(e).catch((s) => {
    throw G = null, s;
  }).finally(() => {
  }), G;
}
class bs {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Ke(() => this.flushUpdates(), 120);
  }
  async init(t, e) {
    this.container = t, this.config = e, this.flowsById = new Map(e.flows.map((n) => [n.id, n])), fs(), gs(), await ms();
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", t.appendChild(s), this.wrapper = s;
    for (const n of e.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = n.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Wt} 2s linear infinite`, o.style.opacity = "0", s.appendChild(o), this.flowDivs.set(n.id, { el: o });
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
      const d = [o.position, ...s.waypoints, r.position].map((c) => At(c, t)).map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
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
    const o = this.profileFor(s), r = ee(s, o), a = Math.abs(e);
    if (!(a >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = s.speed_multiplier ?? 1, c = Math.max(50, U(a, r) * d), p = e < 0 != (s.reverse === !0) ? -1 : 1, u = s.domain ?? this.config?.domain, h = ot(s, o, u, p, this.config?.domain_colors), f = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(e) : 3)
    ), g = o.wave_amplitude_curve ? o.wave_amplitude_curve(e) : 4, y = n.el.style;
    y.setProperty("--flowme-shape", o.shape), y.setProperty("--flowme-color", h), y.setProperty("--flowme-glow", o.glow ? "1" : "0"), y.setProperty("--flowme-count", String(f)), y.setProperty("--flowme-radius", String(us)), y.setProperty("--flowme-line", String(hs)), y.setProperty("--flowme-amp", String(g)), y.setProperty("--flowme-direction", String(p)), y.animation = `${Wt} ${(c / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return W(t.domain ?? this.config?.domain);
  }
}
function ys() {
  const i = ws(), t = i ?? "svg", e = vs();
  return F(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    i ?? "(none)",
    "| Houdini available:",
    e,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? e ? new bs() : (F("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new jt()) : new jt();
}
function vs() {
  try {
    const i = CSS;
    return "paintWorklet" in i && "registerProperty" in i;
  } catch {
    return !1;
  }
}
function ws() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function xe(i) {
  const t = i.size?.width ?? 20, e = i.size?.height ?? 15;
  return `left: ${i.position.x}%; top: ${i.position.y}%; width: ${t}%; height: ${e}%;`;
}
function xs(i, t) {
  F(
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
        style=${xe(i) + n}
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
      style=${xe(i) + n}
    >
      <flowme-custom-overlay
        .hass=${t}
        .card=${i.card}
      ></flowme-custom-overlay>
    </div>
    ${v}
  `;
}
let Rt = null, et = null;
async function $s() {
  if (Rt) return Rt;
  if (et) return et;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (et = t().then((e) => (Rt = e, et = null, e)).catch((e) => {
    throw et = null, e;
  }), et);
}
async function _s(i) {
  const t = await $s();
  return t ? t.createCardElement(i) : null;
}
var ks = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, Ft = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Ss(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && ks(t, e, n), n;
};
let rt = class extends j {
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
        Ii(i);
      } catch (e) {
        this.errorMessage = e instanceof Error ? e.message : String(e);
        return;
      }
      this.errorMessage = void 0, _s(i).then((e) => {
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
rt.styles = Ct`
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
Ft([
  I({ attribute: !1 })
], rt.prototype, "hass", 2);
Ft([
  I({ attribute: !1 })
], rt.prototype, "card", 2);
Ft([
  M()
], rt.prototype, "errorMessage", 2);
rt = Ft([
  Pt("flowme-custom-overlay")
], rt);
const As = 100;
class Cs {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > As; ) this.undoStack.shift();
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
function $(i) {
  return JSON.parse(JSON.stringify(i));
}
function N(i) {
  return i < 0 ? 0 : i > 100 ? 100 : i;
}
function $e(i, t = 8) {
  return Math.round(i / t) * t;
}
function Ms(i) {
  const t = new Set(i.nodes.map((e) => e.id));
  for (let e = 1; e < 1e4; e++) {
    const s = `node_${e}`;
    if (!t.has(s)) return s;
  }
  return `node_${Date.now()}`;
}
function Ps(i) {
  const t = new Set(i.flows.map((e) => e.id));
  for (let e = 1; e < 1e4; e++) {
    const s = `flow_${e}`;
    if (!t.has(s)) return s;
  }
  return `flow_${Date.now()}`;
}
function Fs(i, t, e) {
  const s = $(i);
  for (const n of s.nodes)
    n.id === t && (n.position = { x: N(e.x), y: N(e.y) });
  return s;
}
function Es(i, t, e) {
  const s = $(i), n = {
    id: Ms(i),
    position: { x: N(t.x), y: N(t.y) },
    label: e
  };
  return s.nodes.push(n), { config: s, node: n };
}
function Ns(i, t) {
  const e = $(i);
  return e.nodes = e.nodes.filter((s) => s.id !== t), e.flows = e.flows.filter((s) => s.from_node !== t && s.to_node !== t), e;
}
function Os(i, t, e, s) {
  const n = $(i);
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
function Is(i, t, e, s) {
  const n = $(i);
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
function Ts(i, t, e) {
  const s = $(i);
  for (const n of s.flows)
    if (n.id === t) {
      if (e < 0 || e >= n.waypoints.length) return i;
      n.waypoints.splice(e, 1);
    }
  return s;
}
function _e(i, t, e, s) {
  const n = $(i), o = {
    id: Ps(i),
    from_node: t,
    to_node: e,
    entity: s,
    waypoints: []
  };
  return n.flows.push(o), { config: n, flow: o };
}
function zs(i, t) {
  const e = $(i);
  return e.flows = e.flows.filter((s) => s.id !== t), e;
}
function Ds(i, t) {
  const e = $(i);
  return e.background.default = t, e;
}
function Rs(i, t) {
  const e = $(i);
  return t && t.length ? e.background.weather_entity = t : delete e.background.weather_entity, e;
}
function Us(i, t) {
  const e = $(i);
  return t === void 0 || !Number.isFinite(t) ? delete e.background.transition_duration : e.background.transition_duration = Math.max(0, Math.floor(t)), e;
}
function ke(i, t, e) {
  var n;
  const s = $(i);
  return (n = s.background).weather_states ?? (n.weather_states = {}), s.background.weather_states[t] = e, s;
}
function Ls(i, t) {
  const e = $(i);
  return e.background.weather_states && (delete e.background.weather_states[t], Object.keys(e.background.weather_states).length === 0 && delete e.background.weather_states), e;
}
function Hs(i) {
  const t = new Set((i.overlays ?? []).map((e) => e.id));
  for (let e = 1; e < 1e4; e++) {
    const s = `overlay_${e}`;
    if (!t.has(s)) return s;
  }
  return `overlay_${Date.now()}`;
}
function Bs(i, t) {
  const e = $(i), s = t.id ?? Hs(i), n = {
    ...t,
    id: s,
    position: {
      x: N(t.position.x),
      y: N(t.position.y)
    }
  };
  return e.overlays = [...e.overlays ?? [], n], { config: e, overlay: n };
}
function js(i, t) {
  const e = $(i);
  return e.overlays = (e.overlays ?? []).filter((s) => s.id !== t), e.overlays.length === 0 && delete e.overlays, e;
}
function Ws(i, t, e) {
  const s = $(i);
  for (const n of s.overlays ?? [])
    n.id === t && (n.position = { x: N(e.x), y: N(e.y) });
  return s;
}
function Se(i, t, e) {
  const s = $(i), n = Math.max(2, Math.min(100, e.width)), o = Math.max(2, Math.min(100, e.height));
  for (const r of s.overlays ?? [])
    r.id === t && (r.size = { width: n, height: o });
  return s;
}
function Vs(i, t, e) {
  const s = $(i);
  for (const n of s.overlays ?? [])
    n.id === t && e && (n.card = e);
  return s;
}
function Gs(i, t, e) {
  const s = $(i);
  for (const n of s.overlays ?? [])
    n.id === t && (e ? delete n.visible : n.visible = !1);
  return s;
}
function qs(i, t, e) {
  const s = $(i);
  for (const n of s.overlays ?? [])
    if (n.id === t) {
      const o = Math.max(0, Math.min(1, e));
      o === 1 ? delete n.opacity : n.opacity = o;
    }
  return s;
}
function Ae(i, t, e) {
  const s = $(i);
  return s.opacity = { ...s.opacity, [t]: e }, s;
}
function Ks(i, t, e) {
  const s = $(i);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 ? delete o.opacity : o.opacity = e, o;
  }), s;
}
function Js(i, t, e) {
  const s = $(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 ? delete o.opacity : o.opacity = e, o;
  }), s;
}
function Ys(i, t, e) {
  const s = $(i);
  return s.defaults = { ...s.defaults, [t]: e }, s;
}
function Xs(i, t, e) {
  if (t === e) return i;
  const s = $(i), n = s.background.weather_states;
  if (!n || !(t in n)) return i;
  const o = n[t];
  return o === void 0 ? i : (delete n[t], n[e] = o, s);
}
function Zs(i, t, e) {
  const s = $(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 || e === "corner" ? delete o.line_style : o.line_style = e, o;
  }), s;
}
function Ce(i, t, e) {
  const s = $(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e === void 0 ? delete o.color : o.color = e, o;
  }), s;
}
function Qs(i, t, e) {
  const s = $(i);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e ? delete o.visible : o.visible = !1, o;
  }), s;
}
function Me(i, t, e) {
  const s = $(i);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return e ? delete o.visible : o.visible = !1, o;
  }), s;
}
function tn(i, t, e) {
  const s = $(i);
  return s.visibility = { ...s.visibility, [t]: e }, s;
}
function Pe(i, t, e) {
  const s = $(i);
  return e === void 0 ? s.domain_colors && (delete s.domain_colors[t], Object.keys(s.domain_colors).length === 0 && delete s.domain_colors) : s.domain_colors = { ...s.domain_colors, [t]: e }, s;
}
function Fe(i, t, e) {
  const s = $(i);
  return s.flows = s.flows.map((n) => n.id !== t ? n : { ...n, speed_curve_override: { ...n.speed_curve_override, ...e } }), s;
}
function en(i, t) {
  const e = $(i);
  return e.flows = e.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.speed_curve_override, n;
  }), e;
}
function sn(i, t, e) {
  const s = $(i);
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
function nn(i, t) {
  const e = $(i);
  return e.flows = e.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.animation, n;
  }), e;
}
function Ee(i, t) {
  const e = $(i);
  return e.animation = { ...e.animation, ...t }, e;
}
var on = Object.defineProperty, rn = Object.getOwnPropertyDescriptor, Z = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? rn(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && on(t, e, n), n;
};
let D = class extends j {
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
D.styles = Ct`
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
Z([
  I({ type: Boolean })
], D.prototype, "canUndo", 2);
Z([
  I({ type: Boolean })
], D.prototype, "canRedo", 2);
Z([
  I({ type: Boolean })
], D.prototype, "previewMode", 2);
Z([
  I({ type: Boolean })
], D.prototype, "suggestPathDisabled", 2);
Z([
  I({ type: String })
], D.prototype, "undoLabel", 2);
Z([
  I({ type: String })
], D.prototype, "redoLabel", 2);
D = Z([
  Pt("flowme-editor-toolbar")
], D);
const Xe = 8, Ne = 1, Vt = 255;
function an(i, t = Xe) {
  const e = Math.max(1, Math.floor(t)), s = Math.max(1, Math.ceil(i.width / e)), n = Math.max(1, Math.ceil(i.height / e)), o = new Uint16Array(s * n);
  for (let r = 0; r < n; r++) {
    const a = r * e, l = Math.min(i.height, a + e);
    for (let d = 0; d < s; d++) {
      const c = d * e, p = Math.min(i.width, c + e);
      let u = 0;
      for (let f = a; f < l; f++) {
        const g = f * i.width;
        for (let y = c; y < p; y++) {
          const w = i.data[g + y] ?? 0;
          w > u && (u = w);
        }
      }
      const h = Vt - u;
      o[r * s + d] = h < Ne ? Ne : h;
    }
  }
  return { cols: s, rows: n, cellSize: e, data: o };
}
function ln(i, t, e) {
  return e * i.cols + t;
}
function cn(i, t, e) {
  return t < 0 || e < 0 || t >= i.cols || e >= i.rows ? Vt : i.data[ln(i, t, e)] ?? Vt;
}
const dn = 50;
class pn {
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
function un(i, t, e) {
  const [s, n] = t, [o, r] = e;
  if (s < 0 || n < 0 || s >= i.cols || n >= i.rows || o < 0 || r < 0 || o >= i.cols || r >= i.rows) return null;
  if (s === o && n === r) return [[s, n]];
  const a = i.cols * i.rows, l = new Float32Array(a);
  l.fill(1 / 0);
  const d = new Int16Array(a), c = new Int16Array(a);
  d.fill(-1), c.fill(-1);
  const p = new Uint8Array(a), u = new Uint8Array(a), h = n * i.cols + s;
  l[h] = 0;
  const f = new pn();
  f.push({ col: s, row: n, f: Oe(s, n, o, r) });
  const g = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const y = f.pop(), { col: w, row: S } = y, x = S * i.cols + w;
    if (!u[x]) {
      if (u[x] = 1, w === o && S === r)
        return hn(i, d, c, e);
      for (const [C, _, O] of g) {
        const P = w + C, T = S + _;
        if (P < 0 || T < 0 || P >= i.cols || T >= i.rows) continue;
        const z = T * i.cols + P;
        if (u[z]) continue;
        const bt = cn(i, P, T), Ze = p[x] && p[x] !== O ? dn : 0, Et = (l[x] ?? 1 / 0) + bt + Ze;
        if (Et < (l[z] ?? 1 / 0)) {
          l[z] = Et, d[z] = w, c[z] = S, p[z] = O;
          const Qe = Et + Oe(P, T, o, r);
          f.push({ col: P, row: T, f: Qe });
        }
      }
    }
  }
  return null;
}
function Oe(i, t, e, s) {
  return Math.abs(i - e) + Math.abs(t - s);
}
function hn(i, t, e, s) {
  const n = [];
  let o = s[0], r = s[1];
  for (; o !== -1 && r !== -1; ) {
    n.push([o, r]);
    const a = r * i.cols + o, l = t[a] ?? -1, d = e[a] ?? -1;
    if (l === o && d === r || (o = l, r = d, o < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
const fn = 480, gn = 270, mn = 30;
function bn(i, t, e = fn, s = gn) {
  if (i <= 0 || t <= 0) return { width: 1, height: 1 };
  const n = Math.min(e / i, s / t, 1);
  return {
    width: Math.max(1, Math.floor(i * n)),
    height: Math.max(1, Math.floor(t * n))
  };
}
function yn(i, t, e) {
  const s = new Uint8ClampedArray(t * e);
  for (let n = 0, o = 0; n < i.length; n += 4, o++) {
    const r = i[n] ?? 0, a = i[n + 1] ?? 0, l = i[n + 2] ?? 0;
    s[o] = 0.2126 * r + 0.7152 * a + 0.0722 * l;
  }
  return s;
}
function vn(i, t, e) {
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
      const c = s[a + d] ?? 0, p = s[r + d] ?? 0, u = s[l + d] ?? 0;
      n[r + d] = c + 2 * p + u >> 2;
    }
  }
  return n;
}
function wn(i, t, e) {
  const s = new Uint8ClampedArray(t * e);
  for (let n = 1; n < e - 1; n++) {
    const o = (n - 1) * t, r = n * t, a = (n + 1) * t;
    for (let l = 1; l < t - 1; l++) {
      const d = i[o + (l - 1)] ?? 0, c = i[o + l] ?? 0, p = i[o + (l + 1)] ?? 0, u = i[r + (l - 1)] ?? 0, h = i[r + (l + 1)] ?? 0, f = i[a + (l - 1)] ?? 0, g = i[a + l] ?? 0, y = i[a + (l + 1)] ?? 0, w = -d - 2 * u - f + p + 2 * h + y, S = -d - 2 * c - p + f + 2 * g + y;
      let x = Math.sqrt(w * w + S * S);
      x < mn && (x = 0), x > 255 && (x = 255), s[r + l] = x;
    }
  }
  return { width: t, height: e, data: s };
}
function xn(i, t, e) {
  const s = bn(t, e), n = document.createElement("canvas");
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
function $n(i, t, e) {
  const { width: s, height: n, rgba: o } = xn(i, t, e), r = yn(o, s, n), a = vn(r, s, n);
  return wn(a, s, n);
}
function _n(i) {
  if (i.length <= 2) return [...i];
  const t = [i[0]];
  for (let e = 1; e < i.length - 1; e++) {
    const s = i[e - 1], n = i[e], o = i[e + 1], r = n[0] - s[0], a = n[1] - s[1], l = o[0] - n[0], d = o[1] - n[1];
    r * d - a * l === 0 && Math.sign(r) === Math.sign(l) && Math.sign(a) === Math.sign(d) || t.push(n);
  }
  return t.push(i[i.length - 1]), t;
}
const xt = /* @__PURE__ */ new Map();
async function kn(i, t = {}) {
  const e = performance.now(), s = t.cellSize ?? Xe, n = `${i.imageUrl}|${s}`, o = xt.has(n);
  let r = null;
  try {
    r = await Sn(n, i.imageUrl, s);
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
  const a = Te(i.from, r), l = Te(i.to, r), d = un(r, a, l);
  return !d || d.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - e
  } : {
    waypoints: _n(d).slice(1, -1).map((h) => Mn(h, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - e
  };
}
function Sn(i, t, e) {
  const s = xt.get(i);
  if (s) return s;
  const n = An(t, e).catch((o) => {
    throw xt.delete(i), o;
  });
  return xt.set(i, n), n;
}
async function An(i, t) {
  const e = await Cn(i);
  await Ie();
  const s = $n(e, e.naturalWidth, e.naturalHeight);
  return await Ie(), an(s, t);
}
function Cn(i) {
  return new Promise((t, e) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.decoding = "async", s.onload = () => t(s), s.onerror = () => e(new Error(`Failed to load background image: ${i}`)), s.src = i;
  });
}
function Ie() {
  return new Promise((i) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(i, 0)) : setTimeout(i, 0);
  });
}
function Te(i, t) {
  const e = ze(Math.floor(i.x / 100 * t.cols), 0, t.cols - 1), s = ze(Math.floor(i.y / 100 * t.rows), 0, t.rows - 1);
  return [e, s];
}
function Mn(i, t) {
  return {
    x: (i[0] + 0.5) / t.cols * 100,
    y: (i[1] + 0.5) / t.rows * 100
  };
}
function ze(i, t, e) {
  return i < t ? t : i > e ? e : i;
}
var Pn = Object.defineProperty, Fn = Object.getOwnPropertyDescriptor, E = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Fn(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && Pn(t, e, n), n;
};
let A = class extends j {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [], this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = We(), this.undoStack = new Cs((i) => this.applyConfig(
      i,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (i) => {
      if (!this.config) return;
      const t = i.target.value, e = this.config, s = Ds(e, t);
      this.pushPatch(e, s, "edit default background");
    }, this.onWeatherStateRemove = (i) => {
      if (!this.config) return;
      const t = this.config, e = Ls(t, i);
      this.pushPatch(t, e, `remove weather state ${i}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const i = new Set(Object.keys(this.config.background.weather_states ?? {})), t = A.KNOWN_WEATHER_STATES.find((n) => !i.has(n)) ?? "custom", e = this.config, s = ke(e, t, "");
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
          const s = this.config, { config: n, node: o } = Es(s, e, "New node");
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
          }, n = this.config, { config: o, overlay: r } = Bs(n, s);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(n, o, `add overlay ${r.id}`), this.pending = null, this.statusMessage = `Added overlay ${r.id}. Drag to reposition, corner to resize.`;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step === "pick-from" && (this.statusMessage = "Click the source node handle.");
          return;
        }
        this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [], this.customConfigDraft = "", this.customConfigError = "";
      }
    }, this.onStageContextMenu = (i) => {
      this.pending && (i.preventDefault(), this.pending = null, this.statusMessage = "Cancelled.");
    }, this.onSegmentClick = (i) => {
      if (i.stopPropagation(), !this.config) return;
      const t = i.currentTarget, e = t.dataset.flowId, s = Number(t.dataset.segmentIndex);
      if (!(!e || !Number.isFinite(s))) {
        if (i.shiftKey) {
          const n = this.pointerToPercent(i);
          if (!n) return;
          const o = this.config, r = Is(o, e, s, n);
          this.pushPatch(o, r, `add waypoint to ${e}`);
          return;
        }
        this.selectedFlowId = e, this.selectedNodeId = null, this.selectedOverlayId = null;
      }
    }, this.onNodeClick = (i) => {
      if (i.stopPropagation(), !this.config) return;
      const e = i.currentTarget.dataset.nodeId;
      if (e) {
        if (this.pending?.kind === "add-flow") {
          if (this.pending.step === "pick-from") {
            this.pending = { kind: "add-flow", step: "pick-to", fromId: e }, this.statusMessage = "Click the destination node.";
            return;
          }
          if (this.pending.step === "pick-to" && this.pending.fromId !== e) {
            const s = window.prompt(
              "Entity for this flow (e.g. sensor.grid_power):",
              "sensor.placeholder_entity"
            ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = _e(n, this.pending.fromId, e, s);
            this.pushPatch(n, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
            return;
          }
          this.statusMessage = "Destination must differ from source.";
          return;
        }
        if (i.shiftKey) {
          this.suggestNodeIds.indexOf(e) >= 0 ? this.suggestNodeIds = this.suggestNodeIds.filter((n) => n !== e) : this.suggestNodeIds.length < 2 && (this.suggestNodeIds = [...this.suggestNodeIds, e], this.suggestNodeIds.length === 2 && (this.statusMessage = 'Two nodes selected — click "Suggest path" to auto-route between them.'));
          return;
        }
        this.selectedNodeId = e, this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [];
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
      const n = this.config, o = Ts(n, e, s);
      this.pushPatch(n, o, `delete waypoint ${s} of ${e}`);
    }, this.stopClick = (i) => {
      i.stopPropagation();
    }, this.onHandlePointerDown = (i) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = i.currentTarget, e = t.dataset.waypointIndex, s = t.dataset.flowId, n = t.dataset.nodeId, o = t.dataset.overlayId;
      let r = null;
      n ? r = { kind: "node", id: n } : o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : s && e !== void 0 && (r = { kind: "waypoint", flowId: s, index: Number(e) }), r && (i.preventDefault(), t.setPointerCapture(i.pointerId), this.dragPointerId = i.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragShiftHeld = i.shiftKey);
    }, this.onHandlePointerMove = (i) => {
      if (this.dragPointerId !== i.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = i.shiftKey, t.kind === "overlay-resize") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (i.clientX - t.startPx.x) / o.width * 100, a = (i.clientY - t.startPx.y) / o.height * 100;
        let l = t.startSize.width + r, d = t.startSize.height + a;
        this.dragShiftHeld && (l = Math.round(l), d = Math.round(d)), this.config = Se(this.config, t.id, { width: l, height: d });
        return;
      }
      const e = this.pointerToPercent(i);
      if (!e) return;
      const s = this.dragShiftHeld ? { x: N($e(e.x)), y: N($e(e.y)) } : e;
      t.kind === "node" ? this.config = Fs(this.config, t.id, s) : t.kind === "overlay" ? this.config = Ws(this.config, t.id, s) : t.kind === "waypoint" && (this.config = Os(this.config, t.flowId, t.index, s));
    }, this.onHandlePointerUp = (i) => {
      if (this.dragPointerId !== i.pointerId) return;
      const t = i.currentTarget;
      t.hasPointerCapture(i.pointerId) && t.releasePointerCapture(i.pointerId);
      const e = this.dragStartConfig, s = this.config, n = this.dragTarget;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, !e || !s || !n || e === s) return;
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
      this.pushPatch(e, s, o);
    }, this.onKeyDown = (i) => {
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
      this.config = vt(i), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return m`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? m`<pre class="error">${this.errorMessage}</pre>` : v}
        </div>
      `;
    const t = `${1 / (wt(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, e = this.config.background.default;
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
        ${this.statusMessage ? m`<div class="status">${this.statusMessage}</div>` : v}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${Ve(this.stageRef)}
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
        </div>
        ${this.renderSuggestBar()}
        ${this.renderInspector()}
        ${this.renderFlowsListPanel()}
        ${this.renderWeatherPanel()}
        ${this.renderGlobalAnimationPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
        ${this.errorMessage ? m`<pre class="error">${this.errorMessage}</pre>` : v}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(i) {
    if (!this.config) return v;
    const t = new Map(this.config.nodes.map((a) => [a.id, a])), e = t.get(i.from_node), s = t.get(i.to_node);
    if (!e || !s) return v;
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
            ></div>` : v}
      </div>
    `;
  }
  renderHandle(i) {
    const t = i.id === this.selectedNodeId, e = this.suggestNodeIds.includes(i.id), s = i.visible === !1;
    return m`
      <div
        class=${`handle ${t ? "selected" : ""} ${e ? "suggest-selected" : ""} ${s ? "handle-hidden" : ""}`}
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
        ${i.label ? m`<span class="handle-label">${i.label}</span>` : v}
        ${e ? m`<span class="suggest-badge">${this.suggestNodeIds.indexOf(i.id) + 1}</span>` : v}
        <button
          class="eye-toggle"
          title=${s ? "Show node" : "Hide node"}
          @click=${(n) => {
      if (n.stopPropagation(), !this.config) return;
      const o = this.config, r = Qs(o, i.id, s);
      this.pushPatch(o, r, `${s ? "show" : "hide"} node ${i.id}`);
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
  renderEntityPicker(i, t, e) {
    const s = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), n = e?.includeDomains ?? [], o = e?.placeholder ?? "entity.id";
    if (s) {
      const c = (p) => {
        p.stopPropagation(), t((p.detail?.value ?? "").trim());
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
      const p = c.split(".")[0];
      return !!p && n.includes(p);
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
    if (!this.config) return v;
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
        const s = this.config, n = Ks(s, i.id, e < 1 || e > 0 ? e : void 0);
        this.pushPatch(s, n, `set opacity of ${i.id}`);
      }}
              />
              <span>${(i.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <button class="danger" @click=${() => this.removeNode(i.id)}>Delete node</button>
        </div>
      ` : v;
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
        const e = t.target.value, s = this.config, n = Zs(s, i.id, e);
        this.pushPatch(s, n, `set line style of ${i.id}`);
      }}
            >
              ${Ut.map(
        (t) => m`<option value=${t} ?selected=${(i.line_style ?? "corner") === t}>${t}</option>`
      )}
            </select>
          </label>
          <label>
            Colour override
            <div class="color-row">
              ${(() => {
        const t = W(i.domain ?? this.config.domain), e = ot(i, t, i.domain ?? this.config.domain, 1, this.config.domain_colors);
        return m`
                  <input
                    type="color"
                    .value=${i.color ?? e}
                    @change=${(s) => {
          if (!this.config) return;
          const n = s.target.value, o = this.config, r = Ce(o, i.id, n);
          this.pushPatch(o, r, `set colour of ${i.id}`);
        }}
                  />
                  <span class="color-effective">${i.color ? "override" : "domain default"}</span>
                  ${i.color ? m`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, n = Ce(s, i.id, void 0);
          this.pushPatch(s, n, `clear colour of ${i.id}`);
        }}>Clear</button>` : v}
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
        const s = this.config, n = Js(s, i.id, e);
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
        const e = t.target.checked, s = this.config, n = Me(s, i.id, e);
        this.pushPatch(s, n, `${e ? "show" : "hide"} flow ${i.id}`);
      }}
              />
              <span>${i.visible !== !1 ? "shown" : "hidden"}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(i)}
          ${this.renderAnimationSection(i)}
          <button class="danger" @click=${() => this.removeFlow(i.id)}>Delete flow</button>
        </div>
      ` : v;
    }
    if (this.selectedOverlayId) {
      const i = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return i ? this.renderOverlayInspector(i) : v;
    }
    return v;
  }
  renderSpeedCurveSection(i) {
    if (!this.config) return m``;
    const t = W(i.domain ?? this.config.domain), e = ee(i, t), s = i.speed_curve_override ?? {}, n = (a, l, d) => m`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${l}${d ? m` <small>(${d})</small>` : v}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof e[a] == "number" ? e[a].toFixed(0) : ""}
          .value=${s[a] !== void 0 ? String(s[a]) : ""}
          @change=${(c) => {
      if (!this.config) return;
      const p = c.target.value.trim();
      if (p === "") {
        const u = {};
        for (const g of Object.keys(s))
          g !== a && (u[g] = s[g]);
        const h = this.config, f = Fe(h, i.id, u);
        this.pushPatch(h, f, `update speed curve ${a} for ${i.id}`);
      } else {
        const u = parseFloat(p);
        if (!Number.isFinite(u)) return;
        const h = this.config, f = Fe(h, i.id, { ...s, [a]: u });
        this.pushPatch(h, f, `update speed curve ${a} for ${i.id}`);
      }
    }}
        />
      </div>
    `, r = [e.threshold, e.p50, e.peak].map((a) => `${(U(a, e) / 1e3).toFixed(1)}s`);
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
      const a = this.config, l = en(a, i.id);
      this.pushPatch(a, l, `reset speed curve for ${i.id}`);
    }}>Reset to domain defaults</button>` : v}
        </div>
      </details>
    `;
  }
  renderAnimationSection(i) {
    if (!this.config) return m``;
    const t = i.animation ?? {}, e = t.animation_style ?? "dots", s = (c) => {
      if (!this.config) return;
      const p = this.config, u = sn(p, i.id, c);
      this.pushPatch(p, u, `update animation for ${i.id}`);
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
              ${Lt.map(
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
                ${Ht.map(
      (c) => m`<option value=${c} ?selected=${(t.particle_shape ?? "circle") === c}>${c}</option>`
    )}
              </select>
            </label>
          ` : v}

          <label>Direction
            <select
              .value=${t.direction ?? "auto"}
              @change=${(c) => {
      s({ direction: c.target.value });
    }}
            >
              ${Bt.map(
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
          ` : v}

          ${a ? m`
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
          ` : v}

          ${l ? m`
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
          ` : v}

          ${i.animation && Object.keys(i.animation).length > 0 ? m`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const c = this.config, p = nn(c, i.id);
      this.pushPatch(c, p, `reset animation for ${i.id}`);
    }}>Reset to defaults</button>` : v}
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
  renderGlobalAnimationPanel() {
    if (!this.config) return v;
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
      const e = parseInt(t.target.value, 10), s = this.config, n = Ee(s, { fps: e });
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
      const e = t.target.checked, s = this.config, n = Ee(s, { smooth_speed: e });
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
      const o = n.target.checked, r = this.config, a = Gs(r, i.id, o);
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
      const r = this.config, a = qs(r, i.id, o);
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
      ${this.customConfigError ? m`<div class="custom-config-error">${this.customConfigError}</div>` : v}
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
    if (!this.config) return v;
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
        const l = this.config, d = Ae(l, e, a);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, d = Ae(l, e, a);
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
    if (!this.config) return v;
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
        const l = a.target.value, d = this.config, c = Pe(d, s, l);
        this.pushPatch(d, c, `set domain_colors.${s}`);
      }}
          />
          <span class="color-picker-value">${o || `${r} (default)`}</span>
          ${o ? m`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, l = Pe(a, s, void 0);
        this.pushPatch(a, l, `reset domain_colors.${s}`);
      }}>Reset</button>` : v}
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
    if (!this.config) return v;
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
        const r = o.target.checked, a = this.config, l = tn(a, e, r);
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
    if (!this.config) return v;
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
        const l = Math.max(n.min, Math.min(n.max, a)), d = this.config, c = Ys(d, e, l);
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
  renderFlowsListPanel() {
    if (!this.config) return v;
    const i = this.config.flows;
    return m`
      <details class="panel flows-list-panel" ?open=${!0}>
        <summary>Flows (${i.length})</summary>
        <div class="panel-body flows-list-body">
          ${i.length === 0 ? m`<p class="hint-sub">No flows yet. Add nodes first, then add a flow between them.</p>` : i.map((t) => {
      const e = W(t.domain ?? this.config.domain), s = ot(t, e, t.domain ?? this.config.domain, 1, this.config.domain_colors), n = t.id === this.selectedFlowId, o = t.visible === !1;
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
        const a = this.config, l = Me(a, t.id, o);
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
    if (!this.config) return v;
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
            ${i.default ? m`<img class="weather-thumb" src=${i.default} alt="default background" />` : v}
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
              </div>` : v}
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
      const o = this.config, r = Us(o, n * 1e3);
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
                    ${n ? m`<img class="weather-thumb" src=${n} alt=${s} />` : v}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(s)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${A.KNOWN_WEATHER_STATES.map(
      (s) => m`<option value=${s}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
          <details class="hint-details">
            <summary>Standard Met.no state list (for reference)</summary>
            <div class="hint-states">
              ${A.KNOWN_WEATHER_STATES.map(
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
    const t = i.trim(), e = this.config, s = Rs(e, t || void 0);
    this.pushPatch(e, s, "edit weather entity");
  }
  onWeatherStateKeyChange(i, t) {
    if (!this.config) return;
    const e = t.target.value.trim();
    if (!e || e === i) return;
    const s = this.config, n = Xs(s, i, e);
    n !== s && this.pushPatch(s, n, `rename weather state ${i}→${e}`);
  }
  onWeatherStateUrlChange(i, t) {
    if (!this.config) return;
    const e = t.target.value, s = this.config, n = ke(s, i, e);
    this.pushPatch(s, n, `edit weather image ${i}`);
  }
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || this.suggestNodeIds.length !== 2) {
      this.statusMessage = 'Shift+click exactly two nodes, then click "Suggest path".';
      return;
    }
    const [i, t] = this.suggestNodeIds, e = this.config.nodes.find((n) => n.id === i), s = this.config.nodes.find((n) => n.id === t);
    if (!e || !s) {
      this.statusMessage = "One or both selected nodes could not be found.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const n = await kn({
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
    ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = _e(n, i, t, s), a = {
      ...o,
      flows: o.flows.map(
        (l) => l.id === r.id ? { ...l, waypoints: e.map((d) => ({ x: d.x, y: d.y })) } : l
      )
    };
    this.suggestPreview = null, this.suggestNodeIds = [], this.selectedFlowId = r.id, this.selectedNodeId = null, this.statusMessage = `Created flow ${r.id} with ${e.length} waypoint(s).`, this.pushPatch(n, a, `suggest-path ${r.id}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.suggestNodeIds = [], this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return v;
    const i = this.config.nodes.find((n) => n.id === this.suggestPreview.fromNodeId), t = this.config.nodes.find((n) => n.id === this.suggestPreview.toNodeId);
    if (!i || !t) return v;
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
    ` : v;
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
    const r = this.config, a = Se(r, i, { ...n, [t]: o });
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
      const n = Vs(s, i, e), o = vt(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: s, next: o, description: `edit overlay ${i} card config` }), this.commitToHa(o);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(i) {
    if (!this.config) return;
    const t = this.config, e = js(t, i);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, e, `delete overlay ${i}`);
  }
  removeNode(i) {
    if (!this.config) return;
    const t = this.config, e = Ns(t, i);
    this.selectedNodeId = null, this.pushPatch(t, e, `delete node ${i}`);
  }
  removeFlow(i) {
    if (!this.config) return;
    const t = this.config, e = zs(t, i);
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
      const s = vt(t);
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
A.KNOWN_WEATHER_STATES = [
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
A.styles = Ct`
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
  `;
E([
  I({ attribute: !1 })
], A.prototype, "hass", 2);
E([
  M()
], A.prototype, "config", 2);
E([
  M()
], A.prototype, "pending", 2);
E([
  M()
], A.prototype, "previewMode", 2);
E([
  M()
], A.prototype, "selectedNodeId", 2);
E([
  M()
], A.prototype, "selectedFlowId", 2);
E([
  M()
], A.prototype, "selectedOverlayId", 2);
E([
  M()
], A.prototype, "suggestNodeIds", 2);
E([
  M()
], A.prototype, "customConfigDraft", 2);
E([
  M()
], A.prototype, "customConfigError", 2);
E([
  M()
], A.prototype, "statusMessage", 2);
E([
  M()
], A.prototype, "errorMessage", 2);
E([
  M()
], A.prototype, "canUndo", 2);
E([
  M()
], A.prototype, "canRedo", 2);
E([
  M()
], A.prototype, "undoLabel", 2);
E([
  M()
], A.prototype, "redoLabel", 2);
E([
  M()
], A.prototype, "suggestPreview", 2);
E([
  M()
], A.prototype, "suggestBusy", 2);
A = E([
  Pt("flowme-card-editor")
], A);
var En = Object.defineProperty, Nn = Object.getOwnPropertyDescriptor, Q = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Nn(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && En(t, e, n), n;
};
const On = "1.0.12", De = 5e3;
console.info(
  `%c flowme %c v${On} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function In(i) {
  if (!i) return "";
  const t = [], e = (s, n) => {
    const o = i[s];
    o !== void 0 && t.push(`${n}:${o};`);
  };
  return e("background", "--flowme-opacity-bg"), e("darken", "--flowme-opacity-darken"), e("nodes", "--flowme-opacity-nodes"), e("flows", "--flowme-opacity-flows"), e("dots", "--flowme-opacity-dots"), e("glow", "--flowme-opacity-glow"), e("labels", "--flowme-opacity-labels"), e("values", "--flowme-opacity-values"), e("overlays", "--flowme-opacity-overlays"), t.join("");
}
function Tn(i) {
  if (!i) return "";
  const t = [], e = (s, n) => {
    i[s] === !1 && t.push(`${n}:none;`);
  };
  return e("nodes", "--flowme-vis-nodes"), e("lines", "--flowme-vis-lines"), e("dots", "--flowme-vis-dots"), e("labels", "--flowme-vis-labels"), e("values", "--flowme-vis-values"), e("overlays", "--flowme-vis-overlays"), t.join("");
}
let R = class extends j {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = We(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(i) {
    const t = this._hass;
    if (this._hass = i, i) {
      const e = this.config, s = [
        ...e?.flows.map((r) => r.entity) ?? [],
        ...e?.nodes.map((r) => r.entity).filter(Boolean) ?? [],
        e?.background.weather_entity
      ].filter((r) => typeof r == "string" && r.length > 0), n = {};
      for (const r of s)
        n[r] = i.states[r]?.state;
      F("hass setter called. config entity states:", n);
      const o = e?.background.weather_entity;
      if (o) {
        const r = t?.states[o]?.state, a = i.states[o]?.state;
        F("[weather] state:", a, "(was:", r, ")"), r !== a && this.syncWeatherBackground();
      }
    } else
      F("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(i) {
    try {
      const t = vt(i);
      es(t.debug ?? !1), F("setConfig called:", JSON.parse(JSON.stringify(i ?? null))), F("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const e = t.background.default;
      this.bgLayerA = e, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = e;
    } catch (t) {
      const e = t instanceof Xt ? t.message : String(t);
      this.config = void 0, this.errorMessage = e, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), F("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    F("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), F("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), super.disconnectedCallback();
  }
  willUpdate(i) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = ys(), this.rendererReadyFor = this.config;
      const e = this.config;
      this.renderer.init(t, e).catch((s) => {
        F("renderer init failed — falling back to SVG renderer", s), this.teardownRenderer(), this.renderer = new jt(), this.rendererReadyFor = e, this.renderer.init(t, e).catch((n) => {
          console.error("[flowme] SVG renderer init also failed", n);
        });
      });
    }
    if (i.has("hass") && this.renderer && this.hass) {
      F("willUpdate hass-changed → pushing values for", this.config.flows.length, "flow(s) to renderer", this.renderer.constructor.name);
      for (const e of this.config.flows) {
        const s = this.hass.states[e.entity], n = be(s?.state), o = W(e.domain ?? this.config.domain), r = s?.attributes?.unit_of_measurement, a = Gi(n, r, o.unit_scale);
        if (F(
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
            this.warnedMissing.has(l) || (this.warnedMissing.add(l), F(`flow "${e.id}" entity "${e.entity}" is currently ${s.state} — no flow will render until it reports a number`));
          }
        } else {
          const l = `${e.id}:${e.entity}`;
          this.warnedMissing.has(l) || (this.warnedMissing.add(l), F(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        this.renderer.updateFlow(e.id, a.value);
      }
    }
    (i.has("config") || i.has("hass")) && this.syncWeatherBackground();
  }
  getCardSize() {
    const i = wt(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / i) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const i = wt(this.config?.aspect_ratio) ?? 1.6;
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
    const e = `${1 / (wt(i.aspect_ratio) ?? 16 / 10) * 100}%`, s = i.background.transition_duration ?? De, n = In(i.opacity), o = Tn(i.visibility);
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
          <div class="renderer-mount" ${Ve(this.rendererMount)}></div>
          ${i.nodes.map((r) => this.renderNodeHandle(r))}
          ${(i.overlays ?? []).map((r) => (F("rendering overlay →", r.type, "position=", r.position, "size=", r.size), xs(r, this.hass)))}
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
        const e = i.weather_states[t.state];
        if (F("[weather]", t.state, "→", e ?? "(no match, using default)"), e) return e;
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
    const t = this.config.background.transition_duration ?? De;
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
    const t = this.hass && i.entity ? this.hass.states[i.entity] : void 0, e = i.show_value !== !1 && !!t, s = i.show_label !== !1 && !!i.label, n = W(this.config?.domain), o = i.color ?? this.nodeFlowColor(i.id) ?? n.default_color_positive, r = i.size ?? this.config?.defaults?.node_radius ?? 12;
    let a = "";
    if (t) {
      const d = be(t.state), c = t.attributes?.unit_of_measurement ?? "";
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
      const r = W(o.domain ?? t), a = ot(o, r, o.domain ?? t, 1, e), l = a.toLowerCase();
      n.has(l) || (n.add(l), s || (s = a));
    }
    if (n.size !== 0)
      return n.size === 1 ? s : Zi;
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
Q([
  I({ attribute: !1 })
], R.prototype, "hass", 1);
Q([
  M()
], R.prototype, "config", 2);
Q([
  M()
], R.prototype, "errorMessage", 2);
Q([
  M()
], R.prototype, "bgLayerA", 2);
Q([
  M()
], R.prototype, "bgLayerB", 2);
Q([
  M()
], R.prototype, "activeLayer", 2);
R = Q([
  Pt("flowme-card")
], R);
const Gt = window;
Gt.customCards = Gt.customCards ?? [];
Gt.customCards.push({
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
