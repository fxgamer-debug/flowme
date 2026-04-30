/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, ee = xt.ShadowRoot && (xt.ShadyCSS === void 0 || xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), he = /* @__PURE__ */ new WeakMap();
let ei = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (ee && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = he.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && he.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const yi = (e) => new ei(typeof e == "string" ? e : e + "", void 0, ie), se = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new ei(i, e, ie);
}, vi = (e, t) => {
  if (ee) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = xt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, fe = ee ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return yi(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wi, defineProperty: xi, getOwnPropertyDescriptor: $i, getOwnPropertyNames: _i, getOwnPropertySymbols: ki, getPrototypeOf: Si } = Object, H = globalThis, ge = H.trustedTypes, Ai = ge ? ge.emptyScript : "", Ci = H.reactiveElementPolyfillSupport, ct = (e, t) => e, kt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ai : null;
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
} }, ne = (e, t) => !wi(e, t), me = { attribute: !0, type: String, converter: kt, reflect: !1, useDefault: !1, hasChanged: ne };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let it = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = me) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && xi(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = $i(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? me;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ct("elementProperties"))) return;
    const t = Si(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ct("properties"))) {
      const i = this.properties, s = [..._i(i), ...ki(i)];
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
      for (const n of s) i.unshift(fe(n));
    } else t !== void 0 && i.push(fe(t));
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
    return vi(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : kt).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : kt;
      this._$Em = n;
      const a = r.fromAttribute(i, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? ne)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[ct("elementProperties")] = /* @__PURE__ */ new Map(), it[ct("finalized")] = /* @__PURE__ */ new Map(), Ci?.({ ReactiveElement: it }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, be = (e) => e, St = dt.trustedTypes, ye = St ? St.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ii = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, si = "?" + B, Mi = `<${si}>`, K = document, ht = () => K.createComment(""), ft = (e) => e === null || typeof e != "object" && typeof e != "function", oe = Array.isArray, Pi = (e) => oe(e) || typeof e?.[Symbol.iterator] == "function", zt = `[ 	
\f\r]`, rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, we = />/g, j = RegExp(`>|${zt}(?:([^\\s"'>=/]+)(${zt}*=${zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, $e = /"/g, ni = /^(?:script|style|textarea|title)$/i, oi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), b = oi(1), _e = oi(2), st = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), V = K.createTreeWalker(K, 129);
function ri(e, t) {
  if (!oe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ye !== void 0 ? ye.createHTML(t) : t;
}
const Fi = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = rt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, c, p = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, c = r.exec(l), c !== null); ) u = r.lastIndex, r === rt ? c[1] === "!--" ? r = ve : c[1] !== void 0 ? r = we : c[2] !== void 0 ? (ni.test(c[2]) && (n = RegExp("</" + c[2], "g")), r = j) : c[3] !== void 0 && (r = j) : r === j ? c[0] === ">" ? (r = n ?? rt, p = -1) : c[1] === void 0 ? p = -2 : (p = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? j : c[3] === '"' ? $e : xe) : r === $e || r === xe ? r = j : r === ve || r === we ? r = rt : (r = j, n = void 0);
    const h = r === j && e[a + 1].startsWith("/>") ? " " : "";
    o += r === rt ? l + Mi : p >= 0 ? (s.push(d), l.slice(0, p) + ii + l.slice(p) + B + h) : l + B + (p === -2 ? a : h);
  }
  return [ri(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class gt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, c] = Fi(t, i);
    if (this.el = gt.createElement(d, s), V.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = V.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(ii)) {
          const u = c[r++], h = n.getAttribute(p).split(B), f = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: f[2], strings: h, ctor: f[1] === "." ? Ei : f[1] === "?" ? Ii : f[1] === "@" ? zi : Pt }), n.removeAttribute(p);
        } else p.startsWith(B) && (l.push({ type: 6, index: o }), n.removeAttribute(p));
        if (ni.test(n.tagName)) {
          const p = n.textContent.split(B), u = p.length - 1;
          if (u > 0) {
            n.textContent = St ? St.emptyScript : "";
            for (let h = 0; h < u; h++) n.append(p[h], ht()), V.nextNode(), l.push({ type: 2, index: ++o });
            n.append(p[u], ht());
          }
        }
      } else if (n.nodeType === 8) if (n.data === si) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(B, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += B.length - 1;
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
  const o = ft(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = nt(e, n._$AS(e, t.values), n, s)), t;
}
class Ni {
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
    V.currentNode = n;
    let o = V.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new bt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new Oi(o, this, t)), this._$AV.push(d), l = s[++a];
      }
      r !== l?.index && (o = V.nextNode(), r++);
    }
    return V.currentNode = K, n;
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
    t = nt(this, t, i), ft(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== st && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && ft(this._$AH) ? this._$AA.nextSibling.data = t : this.T(K.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = gt.createElement(ri(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Ni(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = ke.get(t.strings);
    return i === void 0 && ke.set(t.strings, i = new gt(t)), i;
  }
  k(t) {
    oe(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new bt(this.O(ht()), this.O(ht()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = be(t).nextSibling;
      be(t).remove(), t = s;
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
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = nt(this, t, i, 0), r = !ft(t) || t !== this._$AH && t !== st, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = nt(this, a[s + l], i, l), d === st && (d = this._$AH[l]), r || (r = !ft(d) || d !== this._$AH[l]), d === w ? t = w : t !== w && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ei extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class Ii extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class zi extends Pt {
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
class Oi {
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
const Ti = dt.litHtmlPolyfillSupport;
Ti?.(gt, bt), (dt.litHtmlVersions ?? (dt.litHtmlVersions = [])).push("3.3.2");
const Ri = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new bt(t.insertBefore(ht(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis;
let G = class extends it {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ri(i, this.renderRoot, this.renderOptions);
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
G._$litElement$ = !0, G.finalized = !0, pt.litElementHydrateSupport?.({ LitElement: G });
const Di = pt.litElementPolyfillSupport;
Di?.({ LitElement: G });
(pt.litElementVersions ?? (pt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Li = { attribute: !0, type: String, converter: kt, reflect: !1, hasChanged: ne }, Ui = (e = Li, t, i) => {
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
function yt(e) {
  return (t, i) => typeof i == "object" ? Ui(e, t, i) : ((s, n, o) => {
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
const Bi = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hi = { CHILD: 2 }, ji = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Wi {
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
const ut = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const s of i) s._$AO?.(t, !1), ut(s, t);
  return !0;
}, At = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, ai = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), qi(t);
  }
};
function Vi(e) {
  this._$AN !== void 0 ? (At(this), this._$AM = e, ai(this)) : this._$AM = e;
}
function Gi(e, t = !1, i = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(s)) for (let o = i; o < s.length; o++) ut(s[o], !1), At(s[o]);
  else s != null && (ut(s, !1), At(s));
  else ut(this, e);
}
const qi = (e) => {
  e.type == Hi.CHILD && (e._$AP ?? (e._$AP = Gi), e._$AQ ?? (e._$AQ = Vi));
};
class Ki extends Wi {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, s) {
    super._$AT(t, i, s), ai(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (ut(this, t), At(this));
  }
  setValue(t) {
    if (Bi(this._$Ct)) this._$Ct._$AI(t, this);
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
const li = () => new Yi();
class Yi {
}
const Ot = /* @__PURE__ */ new WeakMap(), ci = ji(class extends Ki {
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
}), Ct = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], Vt = ["corner", "diagonal", "curve", "smooth"], Gt = [
  "dots",
  "dash",
  "pulse",
  "arrow",
  "trail",
  "fluid",
  "spark",
  "none"
], qt = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], Kt = ["auto", "forward", "reverse", "both"], Yt = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], Xi = ["javascript:", "vbscript:", "data:", "file:"];
function di(e, t = "card_config") {
  const i = [], s = /* @__PURE__ */ new WeakSet(), n = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const a = o.trim().toLowerCase();
        for (const l of Xi)
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
function Ji(e, t = "card_config") {
  const i = di(e, t);
  if (i.length === 0) return;
  const s = i[0];
  throw new Error(
    `Unsafe URL scheme '${s.scheme}' in ${s.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class ae extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Se = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function v(e, t) {
  throw new ae(`${e}: ${t}`);
}
function le(e, t) {
  (!e || typeof e != "object") && v(t, "must be an object with x and y");
  const i = e, s = i.x, n = i.y;
  (typeof s != "number" || !Number.isFinite(s)) && v(`${t}.x`, "must be a finite number"), (typeof n != "number" || !Number.isFinite(n)) && v(`${t}.y`, "must be a finite number");
  const o = s, r = n;
  return (o < 0 || o > 100) && v(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && v(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function Ae(e, t) {
  (typeof e != "string" || !e.length) && v(t, "must be a non-empty string");
  const i = e;
  return Se.some((n) => i.startsWith(n)) || v(
    t,
    `must start with one of ${Se.join(", ")} (got "${i.slice(0, 40)}")`
  ), i;
}
function Zi(e, t, i) {
  const s = `nodes[${t}]`;
  (!e || typeof e != "object") && v(s, "must be an object");
  const n = e, o = n.id;
  (typeof o != "string" || !o.length) && v(`${s}.id`, "must be a non-empty string");
  const r = o;
  i.has(r) && v(`${s}.id`, `duplicate node id "${r}"`), i.add(r);
  const a = le(n.position, `${s}.position`), l = { id: r, position: a };
  return typeof n.entity == "string" && (l.entity = n.entity), typeof n.label == "string" && (l.label = n.label), typeof n.color == "string" && (l.color = n.color), typeof n.size == "number" && (l.size = n.size), typeof n.show_label == "boolean" && (l.show_label = n.show_label), typeof n.show_value == "boolean" && (l.show_value = n.show_value), n.opacity !== void 0 && (l.opacity = ce(n.opacity, `${s}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && v(`${s}.visible`, "must be a boolean"), l.visible = n.visible), l;
}
function Qi(e, t, i, s) {
  const n = `flows[${t}]`;
  (!e || typeof e != "object") && v(n, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && v(`${n}.id`, "must be a non-empty string");
  const a = r;
  i.has(a) && v(`${n}.id`, `duplicate flow id "${a}"`), i.add(a);
  const l = o.from_node;
  (typeof l != "string" || !s.has(l)) && v(`${n}.from_node`, `references unknown node "${String(l)}"`);
  const d = o.to_node;
  (typeof d != "string" || !s.has(d)) && v(`${n}.to_node`, `references unknown node "${String(d)}"`);
  const c = o.entity;
  (typeof c != "string" || !c.length) && v(`${n}.entity`, "must be a non-empty entity id");
  const p = o.waypoints;
  let u = [];
  p !== void 0 && (Array.isArray(p) || v(`${n}.waypoints`, "must be an array (may be empty or omitted)"), u = p.map(
    (f, y) => le(f, `${n}.waypoints[${y}]`)
  ));
  const h = {
    id: a,
    from_node: l,
    to_node: d,
    entity: c,
    waypoints: u
  };
  if (typeof o.domain == "string" && (Ct.includes(o.domain) || v(`${n}.domain`, `must be one of ${Ct.join(", ")}`), h.domain = o.domain), typeof o.color == "string" && (h.color = o.color), typeof o.color_positive == "string" && (h.color_positive = o.color_positive), typeof o.color_negative == "string" && (h.color_negative = o.color_negative), typeof o.threshold == "number" && (h.threshold = o.threshold), typeof o.reverse == "boolean" && (h.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const f = o.speed_multiplier;
    (f < 0.1 || f > 5) && v(`${n}.speed_multiplier`, "must be between 0.1 and 5.0"), h.speed_multiplier = f;
  }
  return o.opacity !== void 0 && (h.opacity = ce(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && v(`${n}.visible`, "must be a boolean"), h.visible = o.visible), o.line_style !== void 0 && (Vt.includes(o.line_style) || v(`${n}.line_style`, `must be one of ${Vt.join(", ")}`), h.line_style = o.line_style), o.speed_curve_override !== void 0 && (h.speed_curve_override = ts(
    o.speed_curve_override,
    `${n}.speed_curve_override`
  )), o.animation !== void 0 && (h.animation = ss(o.animation, `${n}.animation`)), o.value_gradient !== void 0 && (h.value_gradient = ns(o.value_gradient, `${n}.value_gradient`)), h;
}
function ts(e, t) {
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
  const a = n("p50");
  a !== void 0 && (s.p50 = a);
  const l = n("peak");
  l !== void 0 && (s.peak = l);
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
function es(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("defaults", "must be an object");
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = tt(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const s = tt(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    s > 1 && v("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), i.burst_trigger_ratio = s;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = tt(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = tt(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = tt(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = tt(t.line_width, "defaults.line_width")), i;
}
function ce(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 1) && v(t, "must be a number between 0 and 1"), e;
}
function is(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("opacity", "must be an object");
  const t = e, i = {};
  for (const s of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[s] !== void 0 && (i[s] = ce(t[s], `opacity.${s}`));
  return i;
}
function ss(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && v(t, "must be an object");
  const i = e, s = {};
  i.animation_style !== void 0 && (Gt.includes(i.animation_style) || v(`${t}.animation_style`, `must be one of ${Gt.join(", ")}`), s.animation_style = i.animation_style), i.particle_shape !== void 0 && (qt.includes(i.particle_shape) || v(`${t}.particle_shape`, `must be one of ${qt.join(", ")}`), s.particle_shape = i.particle_shape), i.direction !== void 0 && (Kt.includes(i.direction) || v(`${t}.direction`, `must be one of ${Kt.join(", ")}`), s.direction = i.direction), i.particle_spacing !== void 0 && (Yt.includes(i.particle_spacing) || v(`${t}.particle_spacing`, `must be one of ${Yt.join(", ")}`), s.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && v(`${t}.custom_svg_path`, "must be a string (SVG path d= attribute)"), i.custom_svg_path.length === 0 && console.warn(`[flowme] ${t}.custom_svg_path is empty — will fall back to circle`), s.custom_svg_path = i.custom_svg_path);
  const n = (g, m) => {
    const x = i[g];
    if (x !== void 0)
      return (typeof x != "number" || !Number.isFinite(x) || x <= 0) && v(`${t}.${g}`, "must be a positive finite number"), m !== void 0 && x > m && v(`${t}.${g}`, `must be ≤ ${m}`), x;
  }, o = (g) => {
    const m = i[g];
    if (m !== void 0)
      return typeof m != "boolean" && v(`${t}.${g}`, "must be a boolean"), m;
  }, r = n("particle_size");
  if (r !== void 0 && (s.particle_size = r), i.particle_count !== void 0) {
    const g = i.particle_count;
    (typeof g != "number" || !Number.isFinite(g) || g < 1 || !Number.isInteger(g)) && v(`${t}.particle_count`, "must be a positive integer ≥ 1"), s.particle_count = g;
  }
  if (i.glow_intensity !== void 0) {
    const g = i.glow_intensity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0) && v(`${t}.glow_intensity`, "must be a non-negative finite number"), s.glow_intensity = g;
  }
  const a = o("shimmer");
  a !== void 0 && (s.shimmer = a);
  const l = o("flicker");
  l !== void 0 && (s.flicker = l);
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
function Ce(e, t) {
  return (typeof e != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e)) && v(t, 'must be a CSS hex colour string, e.g. "#FF4500" or "#f00"'), e;
}
function ns(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && v(t, "must be an object");
  const i = e;
  typeof i.entity != "string" && v(`${t}.entity`, "must be a string entity id"), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && v(`${t}.low_value`, "must be a finite number"), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && v(`${t}.high_value`, "must be a finite number"), i.low_value >= i.high_value && console.warn(`[flowme] ${t}: low_value should be less than high_value`);
  const s = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: Ce(i.low_color, `${t}.low_color`),
    high_color: Ce(i.high_color, `${t}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || v(`${t}.mode`, "must be one of: flow, line, both"), s.mode = i.mode), s;
}
function os(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("animation", "must be an object");
  const t = e, i = {};
  if (t.fps !== void 0) {
    const s = t.fps;
    (typeof s != "number" || !Number.isFinite(s) || s < 1 || s > 120) && v("animation.fps", "must be a number between 1 and 120"), i.fps = s;
  }
  return t.smooth_speed !== void 0 && (typeof t.smooth_speed != "boolean" && v("animation.smooth_speed", "must be a boolean"), i.smooth_speed = t.smooth_speed), i;
}
function rs(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("visibility", "must be an object");
  const t = e, i = {};
  for (const s of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[s] !== void 0 && (typeof t[s] != "boolean" && v(`visibility.${s}`, "must be a boolean"), i[s] = t[s]);
  return i;
}
function as(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && v("domain_colors", "must be an object");
  const t = e, i = {};
  for (const s of ["solar", "grid", "battery", "load"])
    t[s] !== void 0 && (typeof t[s] != "string" && v(`domain_colors.${s}`, "must be a string colour value"), i[s] = t[s]);
  return i;
}
function $t(e) {
  if (!e || typeof e != "object") throw new ae("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && v("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), Ct.includes(t.domain) || v("domain", `must be one of ${Ct.join(", ")}`);
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && v("background", "must be an object when provided");
  const s = i ?? {}, o = { default: s.default === void 0 || s.default === "" ? "" : Ae(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && v("background.weather_entity", "must be a string entity id"), o.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && v("background.weather_states", "must be an object mapping state strings to image URLs");
    const h = Object.entries(s.weather_states), f = {};
    for (const [y, g] of h)
      f[y] = Ae(g, `background.weather_states.${y}`);
    o.weather_states = f;
  }
  s.sun_entity !== void 0 && (typeof s.sun_entity != "string" && v("background.sun_entity", "must be a string entity id (e.g. sun.sun)"), o.sun_entity = s.sun_entity), s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && v("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = s.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || v("nodes", "must be an array");
  const a = /* @__PURE__ */ new Set(), l = r.map((h, f) => Zi(h, f, a));
  l.length === 0 && v("nodes", "at least one node is required");
  const d = t.flows;
  Array.isArray(d) || v("flows", "must be an array");
  const c = /* @__PURE__ */ new Set(), p = d.map(
    (h, f) => Qi(h, f, c, a)
  ), u = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: l,
    flows: p
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && v("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), u.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && v("fullscreen", "must be a boolean"), u.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && v("edit_mode_password", "must be a string"), u.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || v("overlays", "must be an array");
    const h = /* @__PURE__ */ new Set();
    u.overlays = t.overlays.map(
      (f, y) => ls(f, y, h)
    );
  }
  return t.defaults !== void 0 && (u.defaults = es(t.defaults)), t.domain_colors !== void 0 && (u.domain_colors = as(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && v("debug", "must be a boolean"), u.debug = t.debug), t.opacity !== void 0 && (u.opacity = is(t.opacity)), t.visibility !== void 0 && (u.visibility = rs(t.visibility)), t.animation !== void 0 && (u.animation = os(t.animation)), u;
}
function ls(e, t, i) {
  const s = `overlays[${t}]`;
  (!e || typeof e != "object") && v(s, "must be an object");
  const n = e, o = n.type, a = typeof o == "string" && ["camera", "switch", "sensor", "button"].includes(o);
  !a && o !== "custom" && v(
    `${s}.type`,
    'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.'
  );
  const l = n.id;
  (typeof l != "string" || !l.length) && v(`${s}.id`, "must be a non-empty string"), i.has(l) && v(`${s}.id`, `duplicate overlay id "${l}"`), i.add(l);
  const d = le(n.position, `${s}.position`);
  if (a) {
    const f = `type: ${o} was removed in v1.0.9. Replace with type: custom and a card: block. See documentation.`;
    console.warn(`[flowme] ${s}: ${f}`);
    const y = {
      id: l,
      type: "custom",
      position: d,
      card: { type: "markdown", content: "" },
      _migration_warning: f
    };
    if (n.size !== void 0) {
      const g = n.size;
      if (g && typeof g == "object") {
        const m = g, x = m.width, _ = m.height;
        typeof x == "number" && typeof _ == "number" && (y.size = { width: x, height: _ });
      }
    }
    return y;
  }
  const c = n.card;
  (!c || typeof c != "object" || Array.isArray(c)) && v(`${s}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  const p = di(c, `${s}.card`);
  if (p.length) {
    const f = p[0];
    v(
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
    (!f || typeof f != "object") && v(`${s}.size`, "must be an object with width and height");
    const y = f, g = y.width, m = y.height;
    (typeof g != "number" || !Number.isFinite(g) || g <= 0 || g > 100) && v(`${s}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m > 100) && v(`${s}.size.height`, "must be a positive number ≤ 100 (percent of card)"), h.size = { width: g, height: m };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && v(`${s}.visible`, "must be a boolean"), h.visible = n.visible), n.opacity !== void 0) {
    const f = n.opacity;
    (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 1) && v(`${s}.opacity`, "must be a number between 0 and 1"), h.opacity = f;
  }
  return h;
}
function de(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function Me(e, t, i) {
  return e + (t - e) * i;
}
function Mt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function pi(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const s = e[i - 1], n = e[i];
    if (!s || !n) continue;
    const o = n.x - s.x, r = n.y - s.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function cs(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = pi(e), s = de(t, 0, 1) * i;
  let n = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], a = e[o], l = a.x - r.x, d = a.y - r.y, c = Math.sqrt(l * l + d * d);
    if (n + c >= s) {
      const p = c === 0 ? 0 : (s - n) / c;
      return { x: r.x + l * p, y: r.y + d * p };
    }
    n += c;
  }
  return { ...e[e.length - 1] };
}
function Xt(e, t, i) {
  if (e.length === 0) return "";
  if (e.length === 1) {
    const a = Mt(e[0], t);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const s = e.map((a) => Mt(a, t));
  if (i === "diagonal") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++)
      a.push(`L ${s[l].x.toFixed(2)} ${s[l].y.toFixed(2)}`);
    return a.join(" ");
  }
  if (i === "corner") {
    const a = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let l = 1; l < s.length; l++) {
      const d = s[l - 1], c = s[l];
      a.push(`L ${c.x.toFixed(2)} ${d.y.toFixed(2)}`), a.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  if (i === "curve") {
    const a = s.length, l = [
      { x: 2 * s[0].x - s[1].x, y: 2 * s[0].y - s[1].y },
      ...s,
      { x: 2 * s[a - 1].x - s[a - 2].x, y: 2 * s[a - 1].y - s[a - 2].y }
    ], d = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
    for (let c = 1; c < a; c++) {
      const p = l[c - 1], u = l[c], h = l[c + 1], f = l[c + 2], y = u.x + (h.x - p.x) / 6, g = u.y + (h.y - p.y) / 6, m = h.x - (f.x - u.x) / 6, x = h.y - (f.y - u.y) / 6;
      d.push(`C ${y.toFixed(2)} ${g.toFixed(2)} ${m.toFixed(2)} ${x.toFixed(2)} ${h.x.toFixed(2)} ${h.y.toFixed(2)}`);
    }
    return d.join(" ");
  }
  const n = 0.3, o = 20, r = [`M ${s[0].x.toFixed(2)} ${s[0].y.toFixed(2)}`];
  for (let a = 1; a < s.length; a++) {
    const l = s[a - 1], d = s[a], c = s[a + 1];
    if (!c) {
      r.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
      continue;
    }
    const p = Math.sqrt((d.x - l.x) ** 2 + (d.y - l.y) ** 2), u = Math.sqrt((c.x - d.x) ** 2 + (c.y - d.y) ** 2), h = Math.min(Math.min(p, u) * n, o), f = h / (p || 1), y = d.x - (d.x - l.x) * f, g = d.y - (d.y - l.y) * f, m = h / (u || 1), x = d.x + (c.x - d.x) * m, _ = d.y + (c.y - d.y) * m;
    r.push(`L ${y.toFixed(2)} ${g.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${x.toFixed(2)} ${_.toFixed(2)}`);
  }
  return r.join(" ");
}
function Pe(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
const Y = 9e3, X = 700, J = 1.5;
function L(e, t) {
  const { threshold: i, p50: s, max_duration: n, min_duration: o, steepness: r } = t, a = Math.abs(e);
  if (!(s > 0) || !(i > 0)) return n;
  const l = Math.max(a, i), d = Math.log10(l / s), c = 1 / (1 + Math.exp(-r * d));
  return n - c * (n - o);
}
function pe(e, t) {
  const i = e.speed_curve_override ?? {}, s = i.threshold ?? e.threshold ?? t.threshold, n = i.p50 ?? t.p50, o = i.peak ?? t.peak, r = i.max_duration ?? Y, a = i.min_duration ?? X, l = i.steepness ?? J;
  return { threshold: s, p50: n, peak: o, max_duration: r, min_duration: a, steepness: l };
}
function ds(e, t, i) {
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
function ui(e, t) {
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
function ps(e, t, i, s) {
  if (!i) return s;
  const n = t === "below_horizon";
  let o = e;
  n && !e.endsWith("-night") && (o = `${e}-night`);
  const r = i[o];
  if (r) return r;
  if (n && o !== "clear-night") {
    const a = i["clear-night"];
    if (a) return a;
  }
  if (o !== e) {
    const a = i[e];
    if (a) return a;
  }
  return s;
}
function Tt(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), s = Number.parseInt(t[2], 10);
  if (!(!i || !s))
    return i / s;
}
function Fe(e) {
  const t = e.replace("#", ""), i = t.length === 3 ? t.split("").map((n) => n + n).join("") : t, s = parseInt(i, 16);
  return [s >> 16 & 255, s >> 8 & 255, s & 255];
}
function Ne(e, t, i) {
  const s = e / 255, n = t / 255, o = i / 255, r = Math.max(s, n, o), a = Math.min(s, n, o), l = (r + a) / 2;
  if (r === a) return [0, 0, l];
  const d = r - a, c = l > 0.5 ? d / (2 - r - a) : d / (r + a);
  let p;
  return r === s ? p = (n - o) / d + (n < o ? 6 : 0) : r === n ? p = (o - s) / d + 2 : p = (s - n) / d + 4, [p * 60, c, l];
}
function Rt(e, t, i) {
  let s = i;
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? e + (t - e) * 6 * s : s < 1 / 2 ? t : s < 2 / 3 ? e + (t - e) * (2 / 3 - s) * 6 : e;
}
function us(e, t, i) {
  const s = e / 360;
  let n, o, r;
  if (t === 0)
    n = o = r = i;
  else {
    const l = i < 0.5 ? i * (1 + t) : i + t - i * t, d = 2 * i - l;
    n = Rt(d, l, s + 1 / 3), o = Rt(d, l, s), r = Rt(d, l, s - 1 / 3);
  }
  const a = (l) => Math.round(l * 255).toString(16).padStart(2, "0");
  return `#${a(n)}${a(o)}${a(r)}`;
}
function hi(e, t) {
  const i = t.high_value - t.low_value, s = i === 0 ? 0 : Math.max(0, Math.min(1, (e - t.low_value) / i)), [n, o, r] = Fe(t.low_color), [a, l, d] = Fe(t.high_color), [c, p, u] = Ne(n, o, r), [h, f, y] = Ne(a, l, d);
  let g = h - c;
  g > 180 && (g -= 360), g < -180 && (g += 360);
  const m = (c + g * s + 360) % 360, x = Me(p, f, s), _ = Me(u, y, s);
  return us(m, x, _);
}
const hs = {
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
      min_duration: X,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, fs = {
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
      min_duration: X,
      steepness: J
    });
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, gs = {
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
      min_duration: X,
      steepness: J
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(de(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, ms = {
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
      min_duration: X,
      steepness: J
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return de(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, bs = {
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
      min_duration: X,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, fi = {
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
      min_duration: X,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, Ee = {
  energy: hs,
  water: fs,
  network: gs,
  hvac: ms,
  gas: bs,
  generic: fi
};
function q(e) {
  return e && e in Ee ? Ee[e] : fi;
}
const ys = "#CCCCCC";
function vs(e, t, i) {
  if (e !== "energy") return;
  const s = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(s)) return i?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(s)) return i?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(s)) return i?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(s))
    return i?.load ?? "#FF8C1E";
}
function mt(e, t, i, s, n) {
  const o = e.color ?? vs(i, e.id, n);
  return s >= 0 ? e.color_positive ?? o ?? t.default_color_positive : e.color_negative ?? o ?? t.default_color_negative;
}
const ws = "[FlowMe]";
let gi = !1;
function xs(e) {
  gi = e;
}
function P(...e) {
  gi && console.warn(ws, ...e);
}
const $s = "[FlowMe Renderer]";
function at(...e) {
  P($s, ...e);
}
const A = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xlink";
function _s() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const Dt = _s(), ks = 2e3, Lt = 3, Ss = 5, Ut = 2, As = 14, Cs = 0.9, Ms = 5e3, lt = 20, Ps = 0.2, Bt = 0.3;
class Jt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ui(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.currentDurMs = /* @__PURE__ */ new Map(), this.targetDurMs = /* @__PURE__ */ new Map(), this.speedTransitionStart = /* @__PURE__ */ new Map(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptiveChange = /* @__PURE__ */ new Map(), this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.frameTimeSamples = [], this.lastFrameForAdaptive = 0;
  }
  async init(t, i) {
    at("init:", t.getBoundingClientRect(), "flows:", i.flows.length), this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n]));
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
      const a = [o.position, ...n.waypoints, r.position], l = `flowme-path-${n.id}`, d = document.createElementNS(A, "path");
      d.setAttribute("id", l), d.setAttribute("d", Xt(a, t, n.line_style ?? "corner")), d.setAttribute("fill", "none"), i.appendChild(d);
      const c = document.createElementNS(A, "g");
      c.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && c.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (c.style.display = "none");
      const p = this.config?.defaults?.line_width ?? Ut, u = document.createElementNS(A, "use");
      u.setAttributeNS(U, "href", `#${l}`), u.setAttribute("href", `#${l}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(p)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), c.appendChild(u);
      const h = {
        group: c,
        path: d,
        pathId: l,
        outline: u,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(c), this.flowNodes.set(n.id, h), at("skeleton:", n.id, "| style=", h.style, "| line_style=", n.line_style ?? "corner (default)");
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
      const a = [o.position, ...s.waypoints, r.position];
      n.path.setAttribute("d", Xt(a, t, s.line_style ?? "corner")), n.style === "pulse" && this.applyFlow(s.id, this.latestValues.get(s.id) ?? 0);
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
    const a = this.profileFor(s), l = pe(s, a), d = Dt ? 0 : l.threshold, c = Math.abs(i), u = o.shimmer === !0 && c < d && c > 0;
    if (!(Dt || c >= d || u)) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const f = Dt ? ks : L(c, l), y = s.speed_multiplier ?? 1;
    let g = Math.max(50, f * y);
    u && (g = g / Ps);
    const m = this.config?.animation?.smooth_speed !== !1;
    g = this.resolveSmoothedDur(t, g, m);
    const x = o.direction ?? "auto";
    let _;
    x === "forward" ? _ = 1 : x === "reverse" ? _ = -1 : _ = i < 0 != (s.reverse === !0) ? -1 : 1;
    let S = _, k = u ? Bt : 1;
    if (m && x === "auto") {
      const Et = this.lastDirection.get(t), bi = this.dirChanging.get(t);
      Et !== void 0 && Et !== _ && !bi && this.dirChanging.set(t, { startMs: performance.now(), oldDir: Et, newDir: _ });
      const vt = this.dirChanging.get(t);
      if (vt) {
        const ue = performance.now() - vt.startMs;
        if (ue < 300) {
          const It = ue / 300;
          It < 0.5 ? (k = (u ? Bt : 1) * (1 - It * 2), S = vt.oldDir) : (k = (u ? Bt : 1) * ((It - 0.5) * 2), S = vt.newDir);
        } else
          this.dirChanging.delete(t), S = _;
      }
    }
    this.lastDirection.set(t, _);
    const I = s.domain ?? this.config?.domain, E = mt(s, a, I, S, this.config?.domain_colors), z = this.gradientColors.get(t), T = s.value_gradient?.mode ?? "flow", Q = z && T !== "line" ? z : E, Nt = z && T !== "flow" ? z : E, O = Q;
    n.outline && n.outline.setAttribute("stroke", Nt), this.setGroupOpacity(n, k);
    const R = this.updateBurstState(t, c, l, a);
    switch (at("applyFlow:", t, "style=", r, "dur=", g, "dir=", S, "color=", O), r) {
      case "dots":
        this.applyDots(n, s, a, i, g, O, S, R);
        break;
      case "dash":
        this.applyDash(n, s, g, O, S, R);
        break;
      case "pulse":
        this.applyPulse(n, s, a, i, g, O, R);
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
        this.applySpark(n, s, a, i, g, O, S, R);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, s, a, i, g, O, S, R);
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
    const a = performance.now() - r, l = 500;
    if (a >= l)
      return this.currentDurMs.set(t, i), this.speedTransitionStart.delete(t), i;
    const d = a / l, c = d * d * (3 - 2 * d), p = o + (i - o) * c;
    return this.currentDurMs.set(t, p), p;
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(t, i, s, n) {
    const o = s.peak, r = this.config?.defaults?.burst_trigger_ratio ?? Cs, a = this.config?.defaults?.burst_sustain_ms ?? Ms, l = o * r;
    if (i < l)
      return this.burstActive.delete(t), this.burstEnteredAt.delete(t), 1;
    let d = this.burstEnteredAt.get(t);
    if (d === void 0 && (d = performance.now(), this.burstEnteredAt.set(t, d)), performance.now() - d < a) return 1;
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
    const o = t.animation ?? {}, a = 1e3 / (this.config?.animation?.fps ?? 60);
    if (o.particle_count !== void 0) return o.particle_count;
    const l = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(s) : Lt)
    ), d = this.config?.defaults?.burst_max_particles ?? lt, c = Math.min(d, Math.max(1, Math.round(l * n))), p = o.animation_style ?? "dots";
    if (p === "dots" || p === "trail") {
      const u = this.adaptiveCount.get(t.id) ?? c, h = this.avgFrameMs(), f = performance.now(), y = this.lastAdaptiveChange.get(t.id) ?? 0;
      if (f - y > 1e3) {
        let m = u;
        h > a * 1.2 && u > 1 ? (m = u - 1, at("adaptive:", t.id, "reducing particles", u, "→", m, "(avg frame", h.toFixed(1), "ms)")) : h < a * 0.8 && u < c && (m = u + 1, at("adaptive:", t.id, "restoring particles", u, "→", m)), m !== u && (this.adaptiveCount.set(t.id, m), this.lastAdaptiveChange.set(t.id, f));
      }
      return this.adaptiveCount.get(t.id) ?? c;
    }
    return c;
  }
  resolveParticleRadius(t) {
    return (this.config?.defaults?.dot_radius ?? Ss) * (t.animation?.particle_size ?? 1);
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
    const o = n.particle_spacing ?? "even", r = s / 1e3, a = r / i;
    switch (o) {
      case "even":
      default:
        return Array.from({ length: i }, (l, d) => -(a * d));
      case "random": {
        const l = performance.now(), d = this.randomOffsetsLastUpdate.get(t) ?? 0, c = 3e3;
        let p = this.randomOffsets.get(t);
        if (!p || p.length !== i || l - d > c) {
          const u = a * 0.1, h = [];
          for (let f = 0; f < i; f++) {
            let y, g = 0;
            do
              y = -(Math.random() * r), g++;
            while (g < 20 && h.some((m) => {
              const x = Math.abs((y - m) % r + r) % r;
              return x < u && x > r - u;
            }));
            h.push(y);
          }
          this.randomOffsets.set(t, h), this.randomOffsetsLastUpdate.set(t, l), p = h;
        }
        return p;
      }
      case "clustered": {
        const l = Math.max(1, Math.round(n.cluster_size ?? 3)), d = n.cluster_gap ?? 3, c = a * 0.3, p = [];
        let u = 0;
        for (let h = 0; h < i; h++) {
          const f = h % l;
          h > 0 && f === 0 && (u += c * l * d), p.push(-(u % r)), u += c;
        }
        return p;
      }
      case "pulse": {
        const l = 1 / Math.max(0.01, n.pulse_frequency ?? 1.5), d = n.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % l < l * d ? Array.from({ length: i }, (u, h) => -(a * 0.1 * h)) : Array.from({ length: i }, (u, h) => -(a * h));
      }
      case "wave_spacing": {
        const l = n.wave_frequency ?? 2, d = n.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (c, p) => {
          const u = p / i * Math.PI * 2 * l, h = Math.sin(u) * d * (r / 2);
          return -(a * p + h);
        });
      }
      case "wave_lateral":
        return Array.from({ length: i }, (l, d) => -(a * d));
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
        const n = i.animation?.wave_frequency ?? 2, o = i.animation?.wave_amplitude ?? 20, r = s.particles.length, a = Math.PI * 2 / r, l = t * n * 2e-3 % (Math.PI * 2);
        for (let d = 0; d < r; d++) {
          const c = s.particles[d];
          if (!c) continue;
          const p = l + d * a, u = Math.sin(p) * o;
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
        const o = n.particles.length, a = (this.currentDurMs.get(i.id) ?? 2e3) / 1e3, l = i.animation ?? {}, d = [];
        if (s === "wave_spacing") {
          const u = l.wave_frequency ?? 2, h = Math.min(l.wave_amplitude ?? 0.85, 0.95), f = t * 1e-3 / a, y = [];
          for (let g = 0; g < o; g++) {
            const m = (g / o + f) % 1, x = Math.sin(m * Math.PI * 2 * u) * h * (1 / o);
            y.push(((m + x) % 1 + 1) % 1);
          }
          y.sort((g, m) => g - m), d.push(...y);
        } else {
          const u = l.pulse_frequency ?? 1.5, h = l.pulse_ratio ?? 0.25, f = t * u * 1e-3 % 1, y = t * 1e-3 / a % 1, g = 1 / o;
          let m;
          f < h ? m = 1 - (1 - f / h) * 0.9 : m = (f - h) / (1 - h);
          for (let x = 0; x < o; x++)
            d.push(((y + x * g * m) % 1 + 1) % 1);
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
              const y = c.getPointAtLength(f * p), g = Math.max(0.5, p * 0.01), m = c.getPointAtLength(Math.max(0, f * p - g)), x = c.getPointAtLength(Math.min(p, f * p + g)), _ = Math.atan2(x.y - m.y, x.x - m.x) * (180 / Math.PI);
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
  applyDots(t, i, s, n, o, r, a, l) {
    const d = i.animation?.direction ?? "auto", c = this.resolveParticleCount(i, s, n, l), p = i.animation?.particle_shape ?? "circle", u = i.animation?.flicker === !0;
    if (t.particles.length !== c || t.particles[0] && this.particleKind(t.particles[0]) !== p) {
      for (const m of t.particles) m.shape.remove();
      t.particles = [];
      for (let m = 0; m < c; m++)
        t.particles.push(this.makeParticle(t, p, r, i, s));
    }
    if (d === "both") {
      if (!t.particlesBack || t.particlesBack.length !== c) {
        if (t.particlesBack) for (const m of t.particlesBack) m.shape.remove();
        t.particlesBack = [];
        for (let m = 0; m < c; m++)
          t.particlesBack.push(this.makeParticle(t, p, r, i, s));
      }
    } else if (t.particlesBack) {
      for (const m of t.particlesBack) m.shape.remove();
      t.particlesBack = void 0;
    }
    const h = `${(o / 1e3).toFixed(3)}s`, f = i.animation ?? {}, y = this.resolveParticleBegins(i.id, c, o, f), g = (m, x) => {
      for (let _ = 0; _ < m.length; _++) {
        const S = m[_];
        this.updateParticleColor(S, r, i, s, u);
        const k = document.createElementNS(A, "animateMotion");
        k.setAttribute("repeatCount", "indefinite"), k.setAttribute("dur", h), k.setAttribute("rotate", "auto"), k.setAttribute("begin", `${(y[_] ?? 0).toFixed(3)}s`), x < 0 && (k.setAttribute("keyPoints", "1;0"), k.setAttribute("keyTimes", "0;1"));
        const I = document.createElementNS(A, "mpath");
        I.setAttributeNS(U, "href", `#${t.pathId}`), I.setAttribute("href", `#${t.pathId}`), k.appendChild(I), S.animateMotion.replaceWith(k), S.animateMotion = k, S.shape.appendChild(k);
      }
    };
    g(t.particles, a), t.particlesBack && g(t.particlesBack, -a);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(t, i, s, n, o, r) {
    for (const m of t.particles) m.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const m = document.createElementNS(A, "use");
      m.setAttributeNS(U, "href", `#${t.pathId}`), m.setAttribute("href", `#${t.pathId}`), m.setAttribute("fill", "none"), m.setAttribute("stroke-linecap", "round"), m.setAttribute("stroke-linejoin", "round"), t.group.appendChild(m), t.lineStroke = m;
    }
    const a = this.config?.defaults?.line_width ?? Ut, d = (i.animation ?? {}).dash_gap ?? 0.5, c = Math.max(0.1, d / r), p = 14, u = p * c, h = this.glowFilter(i, this.profileFor(i), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(a * 2)), t.lineStroke.setAttribute("stroke-dasharray", `${p} ${u}`), h && t.lineStroke.setAttribute("filter", h);
    const f = p + u, y = t.lineStroke.querySelector("animate");
    y && y.remove();
    const g = document.createElementNS(A, "animate");
    g.setAttribute("attributeName", "stroke-dashoffset"), g.setAttribute("from", o > 0 ? "0" : `-${f}`), g.setAttribute("to", o > 0 ? `-${f}` : "0"), g.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), g.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(g);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(t, i, s, n, o, r, a) {
    for (const S of t.particles) S.shape.remove();
    t.particles = [], t.lineStroke?.remove(), t.lineStroke = void 0;
    const l = new Map(this.config?.nodes.map((S) => [S.id, S]) ?? []), d = l.get(i.from_node), c = l.get(i.to_node);
    if (!d || !c) return;
    const p = [d.position, ...i.waypoints, c.position], u = pi(p), h = Math.max(
      2,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Math.max(3, Math.floor(u / 15))
      )
    ), f = this.config?.defaults?.burst_max_particles ?? lt, y = Math.min(f, Math.max(2, Math.round(h * a))), g = this.containerSize(), m = i.animation?.pulse_width ?? 2, x = As * (i.animation?.particle_size ?? 1), _ = this.resolveGlow(i, s);
    if (!t.pulseCircles || t.pulseCircles.length !== y) {
      if (t.pulseCircles) for (const S of t.pulseCircles) S.circle.remove();
      t.pulseCircles = [];
      for (let S = 0; S < y; S++) {
        const k = document.createElementNS(A, "circle");
        k.setAttribute("r", "0"), k.setAttribute("fill", "none"), k.setAttribute("stroke", r), k.setAttribute("stroke-width", String(m)), k.setAttribute("opacity", "0"), _ && k.setAttribute("filter", this.glowFilter(i, s, r));
        const I = document.createElementNS(A, "animate");
        I.setAttribute("attributeName", "r"), I.setAttribute("values", `0;${x};0`), I.setAttribute("repeatCount", "indefinite"), k.appendChild(I);
        const E = document.createElementNS(A, "animate");
        E.setAttribute("attributeName", "opacity"), E.setAttribute("values", "0;0.9;0"), E.setAttribute("repeatCount", "indefinite"), k.appendChild(E), t.group.appendChild(k), t.pulseCircles.push({ circle: k, animateRadius: I, animateOpacity: E });
      }
    }
    for (let S = 0; S < t.pulseCircles.length; S++) {
      const k = t.pulseCircles[S], I = (S + 0.5) / t.pulseCircles.length, E = cs(p, I), z = Mt(E, g);
      k.circle.setAttribute("cx", z.x.toFixed(2)), k.circle.setAttribute("cy", z.y.toFixed(2)), k.circle.setAttribute("stroke", r);
      const T = `${(o / 1e3).toFixed(3)}s`, Q = `${(-o * S / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      k.animateRadius.setAttribute("values", `0;${x};0`), k.animateRadius.setAttribute("dur", T), k.animateRadius.setAttribute("begin", Q), k.animateOpacity.setAttribute("dur", T), k.animateOpacity.setAttribute("begin", Q);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(t, i, s, n, o, r) {
    const a = this.profileFor(i), l = i.animation?.particle_count ?? Lt, d = this.config?.defaults?.burst_max_particles ?? lt, c = Math.min(d, Math.max(1, Math.round(l * r))), p = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++)
        t.particles.push(this.makeParticle(t, "arrow", n, i, a));
    }
    const u = `${(s / 1e3).toFixed(3)}s`, h = this.resolveParticleBegins(i.id, c, s, i.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const y = t.particles[f];
      this.updateParticleColor(y, n, i, a, p);
      const g = document.createElementNS(A, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(h[f] ?? 0).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const m = document.createElementNS(A, "mpath");
      m.setAttributeNS(U, "href", `#${t.pathId}`), m.setAttribute("href", `#${t.pathId}`), g.appendChild(m), y.animateMotion.replaceWith(g), y.animateMotion = g, y.shape.appendChild(g);
    }
  }
  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
   */
  applyTrail(t, i, s, n, o, r) {
    const a = this.profileFor(i), l = i.animation?.particle_count ?? Lt, d = this.config?.defaults?.burst_max_particles ?? lt, c = Math.min(d, Math.max(1, Math.round(l * r))), p = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++)
        t.particles.push(this.makeParticle(t, "teardrop", n, i, a));
    }
    const u = `${(s / 1e3).toFixed(3)}s`, h = this.resolveParticleBegins(i.id, c, s, i.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const y = t.particles[f];
      this.updateParticleColor(y, n, i, a, p);
      const g = document.createElementNS(A, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(h[f] ?? 0).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const m = document.createElementNS(A, "mpath");
      m.setAttributeNS(U, "href", `#${t.pathId}`), m.setAttribute("href", `#${t.pathId}`), g.appendChild(m), y.animateMotion.replaceWith(g), y.animateMotion = g, y.shape.appendChild(g);
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
    const r = (this.config?.defaults?.line_width ?? Ut) * 3, a = this.glowFilter(i, this.profileFor(i), n);
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
  applySpark(t, i, s, n, o, r, a, l) {
    const d = this.resolveParticleCount(i, s, n, l), c = Math.min(
      this.config?.defaults?.burst_max_particles ?? lt,
      Math.round(d * l)
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
      const m = document.createElementNS(A, "animateMotion");
      m.setAttribute("repeatCount", "indefinite"), m.setAttribute("dur", h), m.setAttribute("rotate", "auto"), m.setAttribute("begin", `${(-o * f / (t.particles.length * 1e3)).toFixed(3)}s`), a < 0 && (m.setAttribute("keyPoints", "1;0"), m.setAttribute("keyTimes", "0;1"));
      const x = document.createElementNS(A, "mpath");
      x.setAttributeNS(U, "href", `#${t.pathId}`), x.setAttribute("href", `#${t.pathId}`), m.appendChild(x), y.animateMotion.replaceWith(m), y.animateMotion = m, y.shape.appendChild(m);
    }
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(t) {
    const i = t.shape.tagName.toLowerCase();
    return i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? t.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : i === "path" ? t.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  makeParticle(t, i, s, n, o) {
    const r = this.resolveParticleRadius(n), a = this.resolveGlow(n, o);
    let l, d = !1;
    switch (i) {
      case "square": {
        const u = r * 2, h = document.createElementNS(A, "rect");
        h.setAttribute("width", String(u)), h.setAttribute("height", String(u)), h.setAttribute("x", String(-u / 2)), h.setAttribute("y", String(-u / 2)), h.setAttribute("rx", "1.5"), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), l = h;
        break;
      }
      case "arrow": {
        const u = r * 2.2, h = r * 1.5, f = document.createElementNS(A, "polygon");
        f.setAttribute("points", `${u},0 ${-u * 0.4},${h} 0,0 ${-u * 0.4},${-h}`), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), f.setAttribute("data-kind", "arrow"), l = f;
        break;
      }
      case "teardrop": {
        const u = n.animation?.trail_length ?? 2, h = r, f = r * u, y = document.createElementNS(A, "ellipse");
        y.setAttribute("rx", String(h)), y.setAttribute("ry", String(f)), y.setAttribute("cy", String(-f * 0.3)), y.setAttribute("fill", s), y.setAttribute("opacity", "0"), l = y;
        break;
      }
      case "diamond": {
        const u = r * 1.4, h = document.createElementNS(A, "polygon");
        h.setAttribute("points", `0,${-u} ${u},0 0,${u} ${-u},0`), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "diamond"), l = h;
        break;
      }
      case "custom_svg": {
        const u = n.animation?.custom_svg_path ?? "";
        if (!u) {
          console.warn(`[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${n.id}`);
          const f = document.createElementNS(A, "circle");
          f.setAttribute("r", String(r)), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), l = f;
          break;
        }
        const h = document.createElementNS(A, "path");
        h.setAttribute("d", u), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "custom_svg"), t.group.appendChild(h), d = !0;
        try {
          const f = h.getBBox(), y = Math.max(f.width, f.height, 1), m = r * 2 / y, x = -(f.x + f.width / 2), _ = -(f.y + f.height / 2);
          h.setAttribute("transform", `scale(${m.toFixed(4)}) translate(${x.toFixed(4)},${_.toFixed(4)})`);
        } catch {
        }
        l = h;
        break;
      }
      default: {
        const u = document.createElementNS(A, "circle");
        u.setAttribute("r", String(r)), u.setAttribute("fill", s), u.setAttribute("opacity", "0"), l = u;
      }
    }
    a && (l.setAttribute("filter", this.glowFilter(n, o, s)), l.style.color = s);
    const c = document.createElementNS(A, "animateMotion");
    c.setAttribute("repeatCount", "indefinite"), c.setAttribute("dur", "2s");
    const p = document.createElementNS(A, "mpath");
    return p.setAttributeNS(U, "href", `#${t.pathId}`), p.setAttribute("href", `#${t.pathId}`), c.appendChild(p), l.appendChild(c), d || t.group.appendChild(l), { shape: l, animateMotion: c };
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
    return q(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t), s = t.domain ?? this.config?.domain;
    return mt(t, i, s, 1, this.config?.domain_colors);
  }
}
const Fs = `/* eslint-disable no-undef */
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
`, Ie = "flowme-keyframes", Zt = "flowme-cycle", Ns = 5, Es = 2;
let W = null, ze = !1;
function Is() {
  if (document.getElementById(Ie)) return;
  const e = document.createElement("style");
  e.id = Ie, e.textContent = `@keyframes ${Zt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function zs() {
  if (ze) return;
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
  ze = !0;
}
async function Os() {
  if (W) return W;
  const e = CSS.paintWorklet;
  if (!e)
    return W = Promise.reject(new Error("paintWorklet not available")), W;
  const t = new Blob([Fs], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return W = e.addModule(i).catch((s) => {
    throw W = null, s;
  }).finally(() => {
  }), W;
}
class Ts {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ui(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n])), Is(), zs(), await Os();
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", t.appendChild(s), this.wrapper = s;
    for (const n of i.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = n.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Zt} 2s linear infinite`, o.style.opacity = "0", s.appendChild(o), this.flowDivs.set(n.id, { el: o });
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
      const d = [o.position, ...s.waypoints, r.position].map((c) => Mt(c, t)).map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
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
    const o = this.profileFor(s), r = pe(s, o), a = Math.abs(i);
    if (!(a >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = s.speed_multiplier ?? 1, c = Math.max(50, L(a, r) * d), p = i < 0 != (s.reverse === !0) ? -1 : 1, u = s.domain ?? this.config?.domain, h = mt(s, o, u, p, this.config?.domain_colors), f = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(i) : 3)
    ), y = o.wave_amplitude_curve ? o.wave_amplitude_curve(i) : 4, g = n.el.style;
    g.setProperty("--flowme-shape", o.shape), g.setProperty("--flowme-color", h), g.setProperty("--flowme-glow", o.glow ? "1" : "0"), g.setProperty("--flowme-count", String(f)), g.setProperty("--flowme-radius", String(Ns)), g.setProperty("--flowme-line", String(Es)), g.setProperty("--flowme-amp", String(y)), g.setProperty("--flowme-direction", String(p)), g.animation = `${Zt} ${(c / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return q(t.domain ?? this.config?.domain);
  }
}
function Rs() {
  const e = Ls(), t = e ?? "svg", i = Ds();
  return P(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    i,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? i ? new Ts() : (P("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Jt()) : new Jt();
}
function Ds() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function Ls() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function Oe(e) {
  const t = e.size?.width ?? 20, i = e.size?.height ?? 15;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function Us(e, t) {
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
  return e._migration_warning ? b`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${e.id}
        style=${Oe(e) + n}
        title=${e._migration_warning}
      >
        <div class="migration-warning-inner">
          ⚠ ${e._migration_warning}
        </div>
      </div>
    ` : b`
    <div
      class="overlay overlay-custom"
      data-overlay-id=${e.id}
      style=${Oe(e) + n}
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
async function Bs() {
  if (Ht) return Ht;
  if (et) return et;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (et = t().then((i) => (Ht = i, et = null, i)).catch((i) => {
    throw et = null, i;
  }), et);
}
async function Hs(e) {
  const t = await Bs();
  return t ? t.createCardElement(e) : null;
}
var js = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, Ft = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ws(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && js(t, i, n), n;
};
let ot = class extends G {
  updated(e) {
    super.updated(e), e.has("card") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  render() {
    return this.errorMessage ? b`<div class="err" title=${this.errorMessage}>!</div>` : b`<div class="mount"></div>`;
  }
  rebuildChild() {
    const e = this.card, t = e ? JSON.stringify(e) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!e)) {
      try {
        Ji(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, Hs(e).then((i) => {
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
ot.styles = se`
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
  yt({ attribute: !1 })
], ot.prototype, "hass", 2);
Ft([
  yt({ attribute: !1 })
], ot.prototype, "card", 2);
Ft([
  M()
], ot.prototype, "errorMessage", 2);
ot = Ft([
  re("flowme-custom-overlay")
], ot);
const Vs = 100;
class Gs {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > Vs; ) this.undoStack.shift();
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
function qs(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `node_${i}`;
    if (!t.has(s)) return s;
  }
  return `node_${Date.now()}`;
}
function Ks(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `flow_${i}`;
    if (!t.has(s)) return s;
  }
  return `flow_${Date.now()}`;
}
function jt(e, t, i) {
  const s = $(e);
  for (const n of s.nodes)
    n.id === t && (n.position = { x: N(i.x), y: N(i.y) });
  return s;
}
function Ys(e, t, i) {
  const s = $(e), n = {
    id: qs(e),
    position: { x: N(t.x), y: N(t.y) },
    label: i
  };
  return s.nodes.push(n), { config: s, node: n };
}
function Xs(e, t) {
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
function Zs(e, t) {
  const i = $(e);
  return i.nodes = i.nodes.filter((s) => !t.has(s.id)), i.flows = i.flows.filter((s) => !t.has(s.from_node) && !t.has(s.to_node)), i;
}
function Te(e, t, i) {
  const s = $(e);
  for (const n of s.nodes)
    t.has(n.id) && (n.visible = i);
  return s;
}
function Qs(e, t, i) {
  const s = e.nodes.find((o) => o.id === i);
  if (!s) return e;
  const n = $(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, y: s.position.y });
  return n;
}
function tn(e, t, i) {
  const s = e.nodes.find((o) => o.id === i);
  if (!s) return e;
  const n = $(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, x: s.position.x });
  return n;
}
function Wt(e, t, i, s) {
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
function Re(e, t, i, s) {
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
function Le(e, t, i, s) {
  const n = $(e), o = {
    id: Ks(e),
    from_node: t,
    to_node: i,
    entity: s,
    waypoints: []
  };
  return n.flows.push(o), { config: n, flow: o };
}
function en(e, t) {
  const i = $(e);
  return i.flows = i.flows.filter((s) => s.id !== t), i;
}
function sn(e, t) {
  const i = $(e);
  return i.background.default = t, i;
}
function nn(e, t) {
  const i = $(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function on(e, t) {
  const i = $(e);
  return t && t.length ? i.background.sun_entity = t : delete i.background.sun_entity, i;
}
function rn(e, t) {
  const i = $(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function Ue(e, t, i) {
  var n;
  const s = $(e);
  return (n = s.background).weather_states ?? (n.weather_states = {}), s.background.weather_states[t] = i, s;
}
function an(e, t) {
  const i = $(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function ln(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `overlay_${i}`;
    if (!t.has(s)) return s;
  }
  return `overlay_${Date.now()}`;
}
function cn(e, t) {
  const i = $(e), s = t.id ?? ln(e), n = {
    ...t,
    id: s,
    position: {
      x: N(t.position.x),
      y: N(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function dn(e, t) {
  const i = $(e);
  return i.overlays = (i.overlays ?? []).filter((s) => s.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function pn(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && (n.position = { x: N(i.x), y: N(i.y) });
  return s;
}
function Be(e, t, i) {
  const s = $(e), n = Math.max(2, Math.min(100, i.width)), o = Math.max(2, Math.min(100, i.height));
  for (const r of s.overlays ?? [])
    r.id === t && (r.size = { width: n, height: o });
  return s;
}
function un(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && i && (n.card = i);
  return s;
}
function hn(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    n.id === t && (i ? delete n.visible : n.visible = !1);
  return s;
}
function fn(e, t, i) {
  const s = $(e);
  for (const n of s.overlays ?? [])
    if (n.id === t) {
      const o = Math.max(0, Math.min(1, i));
      o === 1 ? delete n.opacity : n.opacity = o;
    }
  return s;
}
function He(e, t, i) {
  const s = $(e);
  return s.opacity = { ...s.opacity, [t]: i }, s;
}
function gn(e, t, i) {
  const s = $(e);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function mn(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function bn(e, t, i) {
  const s = $(e);
  return s.defaults = { ...s.defaults, [t]: i }, s;
}
function yn(e, t, i) {
  if (t === i) return e;
  const s = $(e), n = s.background.weather_states;
  if (!n || !(t in n)) return e;
  const o = n[t];
  return o === void 0 ? e : (delete n[t], n[i] = o, s);
}
function vn(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 || i === "corner" ? delete o.line_style : o.line_style = i, o;
  }), s;
}
function je(e, t, i) {
  const s = $(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.color : o.color = i, o;
  }), s;
}
function We(e, t, i) {
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
function Ve(e, t, i) {
  const s = $(e);
  return i === void 0 ? s.domain_colors && (delete s.domain_colors[t], Object.keys(s.domain_colors).length === 0 && delete s.domain_colors) : s.domain_colors = { ...s.domain_colors, [t]: i }, s;
}
function Ge(e, t, i) {
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
function qe(e, t) {
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
function Ke(e, t) {
  const i = $(e), s = i.flows.find((n) => n.id === t);
  return s && delete s.value_gradient, i;
}
const mi = 8, Ye = 1, Qt = 255;
function Cn(e, t = mi) {
  const i = Math.max(1, Math.floor(t)), s = Math.max(1, Math.ceil(e.width / i)), n = Math.max(1, Math.ceil(e.height / i)), o = new Uint16Array(s * n);
  for (let r = 0; r < n; r++) {
    const a = r * i, l = Math.min(e.height, a + i);
    for (let d = 0; d < s; d++) {
      const c = d * i, p = Math.min(e.width, c + i);
      let u = 0;
      for (let f = a; f < l; f++) {
        const y = f * e.width;
        for (let g = c; g < p; g++) {
          const m = e.data[y + g] ?? 0;
          m > u && (u = m);
        }
      }
      const h = Qt - u;
      o[r * s + d] = h < Ye ? Ye : h;
    }
  }
  return { cols: s, rows: n, cellSize: i, data: o };
}
function Mn(e, t, i) {
  return i * e.cols + t;
}
function Pn(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? Qt : e.data[Mn(e, t, i)] ?? Qt;
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
  const a = e.cols * e.rows, l = new Float32Array(a);
  l.fill(1 / 0);
  const d = new Int16Array(a), c = new Int16Array(a);
  d.fill(-1), c.fill(-1);
  const p = new Uint8Array(a), u = new Uint8Array(a), h = n * e.cols + s;
  l[h] = 0;
  const f = new Nn();
  f.push({ col: s, row: n, f: Xe(s, n, o, r) });
  const y = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const g = f.pop(), { col: m, row: x } = g, _ = x * e.cols + m;
    if (!u[_]) {
      if (u[_] = 1, m === o && x === r)
        return In(e, d, c, i);
      for (const [S, k, I] of y) {
        const E = m + S, z = x + k;
        if (E < 0 || z < 0 || E >= e.cols || z >= e.rows) continue;
        const T = z * e.cols + E;
        if (u[T]) continue;
        const Q = Pn(e, E, z), Nt = p[_] && p[_] !== I ? Fn : 0, O = (l[_] ?? 1 / 0) + Q + Nt;
        if (O < (l[T] ?? 1 / 0)) {
          l[T] = O, d[T] = m, c[T] = x, p[T] = I;
          const R = O + Xe(E, z, o, r);
          f.push({ col: E, row: z, f: R });
        }
      }
    }
  }
  return null;
}
function Xe(e, t, i, s) {
  return Math.abs(e - i) + Math.abs(t - s);
}
function In(e, t, i, s) {
  const n = [];
  let o = s[0], r = s[1];
  for (; o !== -1 && r !== -1; ) {
    n.push([o, r]);
    const a = r * e.cols + o, l = t[a] ?? -1, d = i[a] ?? -1;
    if (l === o && d === r || (o = l, r = d, o < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
const zn = 480, On = 270, Tn = 30;
function Rn(e, t, i = zn, s = On) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / e, s / t, 1);
  return {
    width: Math.max(1, Math.floor(e * n)),
    height: Math.max(1, Math.floor(t * n))
  };
}
function Dn(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 0, o = 0; n < e.length; n += 4, o++) {
    const r = e[n] ?? 0, a = e[n + 1] ?? 0, l = e[n + 2] ?? 0;
    s[o] = 0.2126 * r + 0.7152 * a + 0.0722 * l;
  }
  return s;
}
function Ln(e, t, i) {
  const s = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t;
    for (let a = 0; a < t; a++) {
      const l = e[r + Math.max(0, a - 1)] ?? 0, d = e[r + a] ?? 0, c = e[r + Math.min(t - 1, a + 1)] ?? 0;
      s[r + a] = l + 2 * d + c >> 2;
    }
  }
  const n = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t, a = Math.max(0, o - 1) * t, l = Math.min(i - 1, o + 1) * t;
    for (let d = 0; d < t; d++) {
      const c = s[a + d] ?? 0, p = s[r + d] ?? 0, u = s[l + d] ?? 0;
      n[r + d] = c + 2 * p + u >> 2;
    }
  }
  return n;
}
function Un(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 1; n < i - 1; n++) {
    const o = (n - 1) * t, r = n * t, a = (n + 1) * t;
    for (let l = 1; l < t - 1; l++) {
      const d = e[o + (l - 1)] ?? 0, c = e[o + l] ?? 0, p = e[o + (l + 1)] ?? 0, u = e[r + (l - 1)] ?? 0, h = e[r + (l + 1)] ?? 0, f = e[a + (l - 1)] ?? 0, y = e[a + l] ?? 0, g = e[a + (l + 1)] ?? 0, m = -d - 2 * u - f + p + 2 * h + g, x = -d - 2 * c - p + f + 2 * y + g;
      let _ = Math.sqrt(m * m + x * x);
      _ < Tn && (_ = 0), _ > 255 && (_ = 255), s[r + l] = _;
    }
  }
  return { width: t, height: i, data: s };
}
function Bn(e, t, i) {
  const s = Rn(t, i), n = document.createElement("canvas");
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
  const { width: s, height: n, rgba: o } = Bn(e, t, i), r = Dn(o, s, n), a = Ln(r, s, n);
  return Un(a, s, n);
}
function jn(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const s = e[i - 1], n = e[i], o = e[i + 1], r = n[0] - s[0], a = n[1] - s[1], l = o[0] - n[0], d = o[1] - n[1];
    r * d - a * l === 0 && Math.sign(r) === Math.sign(l) && Math.sign(a) === Math.sign(d) || t.push(n);
  }
  return t.push(e[e.length - 1]), t;
}
const _t = /* @__PURE__ */ new Map();
async function Wn(e, t = {}) {
  const i = performance.now(), s = t.cellSize ?? mi, n = `${e.imageUrl}|${s}`, o = _t.has(n);
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
  const a = Ze(e.from, r), l = Ze(e.to, r), d = En(r, a, l);
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
  const s = _t.get(e);
  if (s) return s;
  const n = Gn(t, i).catch((o) => {
    throw _t.delete(e), o;
  });
  return _t.set(e, n), n;
}
async function Gn(e, t) {
  const i = await qn(e);
  await Je();
  const s = Hn(i, i.naturalWidth, i.naturalHeight);
  return await Je(), Cn(s, t);
}
function qn(e) {
  return new Promise((t, i) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.decoding = "async", s.onload = () => t(s), s.onerror = () => i(new Error(`Failed to load background image: ${e}`)), s.src = e;
  });
}
function Je() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function Ze(e, t) {
  const i = Qe(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), s = Qe(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, s];
}
function Kn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function Qe(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
var Yn = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, F = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Xn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Yn(t, i, n), n;
};
let C = class extends G {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.rubberBand = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.selectorType = "", this.stageRef = li(), this.undoStack = new Gs((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.rubberBandJustSelected = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, s = sn(i, t);
      this.pushPatch(i, s, "edit default background");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = an(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = C.KNOWN_WEATHER_STATES.find((n) => !e.has(n)) ?? "custom", i = this.config, s = Ue(i, t, "");
      this.pushPatch(i, s, `add weather state ${t}`);
    }, this.onStageClick = (e) => {
      if (!(!this.config || e.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const s = this.config, { config: n, node: o } = Ys(s, i, "New node");
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
      for (const a of this.config.nodes) {
        const { x: l, y: d } = a.position;
        l >= i && l <= s && d >= n && d <= o && r.add(a.id);
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
        const r = this.config, a = Re(r, i, n, o);
        this.pushPatch(r, a, `add waypoint to ${i}`);
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
          ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Le(n, this.pending.fromId, i, s);
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
          const a = /* @__PURE__ */ new Map();
          for (const l of this.config.nodes)
            this.selectedNodeIds.has(l.id) && a.set(l.id, { ...l.position });
          r = {
            kind: "node-bulk",
            ids: Array.from(this.selectedNodeIds),
            startPositions: a,
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
        const r = (e.clientX - t.startPx.x) / o.width * 100, a = (e.clientY - t.startPx.y) / o.height * 100;
        let l = t.startSize.width + r, d = t.startSize.height + a;
        this.dragShiftHeld && (l = Math.round(l), d = Math.round(d)), this.config = Be(this.config, t.id, { width: l, height: d });
        return;
      }
      const i = this.pointerToPercent(e);
      if (!i) return;
      const s = this.dragShiftHeld ? { x: N(wt(i.x)), y: N(wt(i.y)) } : i;
      if (t.kind === "node")
        this.config = jt(this.config, t.id, s);
      else if (t.kind === "node-bulk") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, a = (e.clientY - t.startPx.y) / o.height * 100, l = /* @__PURE__ */ new Map();
        for (const [d, c] of t.startPositions) {
          const p = this.dragShiftHeld ? wt(c.x + r) : c.x + r, u = this.dragShiftHeld ? wt(c.y + a) : c.y + a;
          l.set(d, { x: p, y: u });
        }
        this.config = Js(this.config, l);
      } else t.kind === "overlay" ? this.config = pn(this.config, t.id, s) : t.kind === "waypoint" && (this.config = Wt(this.config, t.flowId, t.index, s));
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const i = this.dragStartConfig, s = this.config, n = this.dragTarget, o = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !n) return;
      if (!o && n.kind === "node") {
        const a = n.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (e.shiftKey) {
          const l = new Set(this.selectedNodeIds);
          l.has(a) ? l.delete(a) : l.add(a), this.selectedNodeIds = l, this.selectedNodeId = l.size === 1 ? Array.from(l)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null, l.size === 2 ? this.statusMessage = 'Two nodes selected — click "Suggest path" to auto-route, or use the toolbar actions.' : l.size > 0 ? this.statusMessage = `${l.size} node(s) selected. Shift+click to add/remove. Escape to clear.` : this.statusMessage = "";
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([a]), this.selectedNodeId = a, this.selectedFlowId = null, this.selectedOverlayId = null, this.statusMessage = "";
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
      return b`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? b`<pre class="error">${this.errorMessage}</pre>` : w}
        </div>
      `;
    const e = this.config.background.default, t = this.selectedNodeIds.size >= 2, i = this.selectedNodeId ? "nodes" : this.selectedFlowId ? "flows" : this.selectedOverlayId ? "overlays" : this.selectorType, s = this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? "";
    return b`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div class="z-canvas">
          <div
            class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
            style=""
            @click=${this.onStageClick}
            @contextmenu=${this.onStageContextMenu}
            @pointerdown=${this.onStagePointerDown}
            @pointermove=${this.onStagePointerMove}
            @pointerup=${this.onStagePointerUp}
            @pointercancel=${this.onStagePointerUp}
            ${ci(this.stageRef)}
          >
            <div
              class="background"
              style=${e ? `background-image: url('${e}');` : ""}
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

        <!-- ZONE 2 — Toolbar (3-column grid) -->
        <div class="z-toolbar">

          <!-- Left (10%): Undo / Redo stacked -->
          <div class="tb-col-undo">
            <button
              class="tb-icon-btn"
              ?disabled=${!this.canUndo}
              title=${this.undoLabel ? `Undo: ${this.undoLabel} (Ctrl+Z)` : "Undo (Ctrl+Z)"}
              @click=${() => this.undoStack.undo()}
            >↩</button>
            <button
              class="tb-icon-btn"
              ?disabled=${!this.canRedo}
              title=${this.redoLabel ? `Redo: ${this.redoLabel} (Ctrl+Shift+Z)` : "Redo (Ctrl+Shift+Z)"}
              @click=${() => this.undoStack.redo()}
            >↪</button>
          </div>

          <!-- Centre (55%): Row 1 = add/multiselect, Row 2 = Save/Cancel -->
          <div class="tb-col-actions">
            <div class="tb-row tb-row-actions">
              ${t ? this.renderMultiSelectToolbar() : b`
                  <button class="tb-btn"
                    title="Add node — then click canvas to place"
                    @click=${() => {
      this.pending = { kind: "add-node" }, this.statusMessage = "Click canvas to place node.";
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
      this.pending = { kind: "add-overlay", overlayType: "custom" }, this.statusMessage = "Click canvas to place overlay.";
    }}
                  >+ Overlay</button>
                `}
            </div>
            <div class="tb-row tb-row-save">
              ${this.statusMessage ? b`<span class="tb-status">${this.statusMessage}</span>` : w}
              ${this.errorMessage ? b`<span class="tb-error">${this.errorMessage}</span>` : w}
              <button
                class="tb-btn tb-btn-save"
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

          <!-- Right (35%): Type + Element dropdowns stacked -->
          <div class="tb-col-selector">
            <select
              class="tb-select"
              .value=${i}
              @change=${(n) => {
      this.selectorType = n.target.value, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null;
    }}
            >
              <option value="">Select type…</option>
              <option value="nodes">Nodes</option>
              <option value="flows">Flows</option>
              <option value="overlays">Overlays</option>
            </select>
            <select
              class="tb-select"
              ?disabled=${!i}
              .value=${s}
              @change=${(n) => {
      const o = n.target.value;
      o && (i === "nodes" ? (this.selectedNodeId = o, this.selectedNodeIds = /* @__PURE__ */ new Set([o]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = o, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = o, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null));
    }}
            >
              <option value="">${i ? "Select element…" : "—"}</option>
              ${i === "nodes" ? this.config.nodes.map((n) => b`
                <option value=${n.id}>${n.label ?? n.id}</option>
              `) : w}
              ${i === "flows" ? this.config.flows.map((n) => b`
                <option value=${n.id}>${n.id}</option>
              `) : w}
              ${i === "overlays" ? (this.config.overlays ?? []).map((n, o) => b`
                <option value=${n.id ?? String(o)}>Overlay ${o + 1}${n.id ? ` (${n.id})` : ""}</option>
              `) : w}
            </select>
          </div>

        </div>

        <!-- ZONE 3 — Context panel -->
        <div class="z-context">
          ${this.renderContextPanel()}
        </div>

      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return w;
    const t = new Map(this.config.nodes.map((c) => [c.id, c])), i = t.get(e.from_node), s = t.get(e.to_node);
    if (!i || !s) return w;
    const n = [i.position, ...e.waypoints, s.position], o = e.id === this.selectedFlowId, a = Xt(n, { width: 100, height: 100 }, e.line_style ?? "corner");
    if (!a) return w;
    const l = e.color ?? "rgba(255,255,255,0.8)", d = [];
    for (let c = 0; c < n.length - 1; c++) {
      const p = n[c], u = n[c + 1];
      !p || !u || d.push(_e`
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
    return _e`
      <g>
        ${d}
        <path
          class=${`flow-path ${o ? "selected" : ""}`}
          d=${a}
          data-flow-id=${e.id}
          style=${`stroke: ${l};`}
          @click=${this.onSegmentClick}
        />
      </g>
    `;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, i) => b`
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
    return b`
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
        ${t ? b`<div
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
    return b`
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
        ${e.label ? b`<span class="handle-label">${e.label}</span>` : w}
        ${t && this.selectedNodeIds.size >= 2 ? b`<span class="suggest-badge">${n + 1}</span>` : w}
        <button
          class="eye-toggle"
          title=${o ? "Show node" : "Hide node"}
          @click=${(r) => {
      if (r.stopPropagation(), !this.config) return;
      const a = this.config, l = We(a, e.id, o);
      this.pushPatch(a, l, `${o ? "show" : "hide"} node ${e.id}`);
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
      return b`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
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
    return b`
      <input
        type="text"
        list=${a}
        placeholder=${o}
        .value=${e}
        @change=${(c) => {
      t(c.target.value.trim());
    }}
      />
      <datalist id=${a}>
        ${l.map((c) => b`<option value=${c}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return w;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((i) => i.id === this.selectedNodeId);
      if (!e) return w;
      const t = (i, s) => {
        if (!this.config) return;
        const n = this.config, o = {
          ...n,
          nodes: n.nodes.map((r) => r.id === e.id ? { ...r, ...i } : r)
        };
        this.pushPatch(n, o, s);
      };
      return b`
        <div class="inspector">
          <h4>Node: ${e.id}</h4>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">Label</span>
              <input
                type="text"
                .value=${e.label ?? ""}
                @change=${(i) => this.onNodeLabelChange(e.id, i)}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Entity</span>
              ${this.renderEntityPicker(
        e.entity ?? "",
        (i) => this.setNodeEntity(e.id, i),
        { includeDomains: ["sensor", "binary_sensor", "input_number", "number"] }
      )}
            </label>
          </div>

          <!-- Row 2: Colour | Visible | Show value | Show label -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">Colour</span>
              <input
                type="color"
                .value=${e.color ?? "#ffffff"}
                @change=${(i) => {
        const s = i.target.value;
        t({ color: s }, `set color of ${e.id}`);
      }}
              />
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${e.visible !== !1}
                @change=${(i) => {
        if (!this.config) return;
        const s = i.target.checked, n = this.config, o = We(n, e.id, s);
        this.pushPatch(n, o, `set visible of ${e.id}`);
      }}
              />
              <span class="node-cell-label">Visible</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${e.show_value !== !1}
                @change=${(i) => {
        const s = i.target.checked;
        t({ show_value: s || void 0 }, `set show_value of ${e.id}`);
      }}
              />
              <span class="node-cell-label">Show value</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${e.show_label !== !1}
                @change=${(i) => {
        const s = i.target.checked;
        t({ show_label: s || void 0 }, `set show_label of ${e.id}`);
      }}
              />
              <span class="node-cell-label">Show label</span>
            </label>
          </div>

          <!-- Row 3: X% | Y% | Size | Opacity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">X %</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(e.position.x))}
                @change=${(i) => {
        if (!this.config) return;
        const s = parseFloat(i.target.value);
        if (!Number.isFinite(s)) return;
        const n = this.config, o = jt(n, e.id, { x: s, y: e.position.y });
        this.pushPatch(n, o, `move ${e.id} x`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Y %</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(e.position.y))}
                @change=${(i) => {
        if (!this.config) return;
        const s = parseFloat(i.target.value);
        if (!Number.isFinite(s)) return;
        const n = this.config, o = jt(n, e.id, { x: e.position.x, y: s });
        this.pushPatch(n, o, `move ${e.id} y`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Size px</span>
              <input
                type="number"
                min="4" max="60" step="1"
                .value=${String(e.size ?? 12)}
                @change=${(i) => {
        const s = parseInt(i.target.value, 10);
        Number.isFinite(s) && t({ size: s }, `set size of ${e.id}`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">Opacity</span>
              <input
                type="number"
                min="0" max="1" step="0.05"
                .value=${String(e.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const s = parseFloat(i.target.value);
        if (!Number.isFinite(s)) return;
        const n = this.config, o = gn(n, e.id, s >= 1 ? void 0 : s);
        this.pushPatch(n, o, `set opacity of ${e.id}`);
      }}
              />
            </label>
          </div>

          <!-- Delete -->
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(e.id)}>Delete node</button>
          </div>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const e = this.config.flows.find((t) => t.id === this.selectedFlowId);
      return e ? b`
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
        const i = t.target.value, s = this.config, n = vn(s, e.id, i);
        this.pushPatch(s, n, `set line style of ${e.id}`);
      }}
            >
              ${Vt.map(
        (t) => b`<option value=${t} ?selected=${(e.line_style ?? "corner") === t}>${t}</option>`
      )}
            </select>
          </label>
          <label>
            Colour override
            <div class="color-row">
              ${(() => {
        const t = q(e.domain ?? this.config.domain), i = mt(e, t, e.domain ?? this.config.domain, 1, this.config.domain_colors);
        return b`
                  <input
                    type="color"
                    .value=${e.color ?? i}
                    @change=${(s) => {
          if (!this.config) return;
          const n = s.target.value, o = this.config, r = je(o, e.id, n);
          this.pushPatch(o, r, `set colour of ${e.id}`);
        }}
                  />
                  <span class="color-effective">${e.color ? "override" : "domain default"}</span>
                  ${e.color ? b`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, n = je(s, e.id, void 0);
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
        const s = this.config, n = mn(s, e.id, i);
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
    if (!this.config) return b``;
    const t = q(e.domain ?? this.config.domain), i = pe(e, t), s = e.speed_curve_override ?? {}, n = (a, l, d) => b`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${l}${d ? b` <small>(${d})</small>` : w}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof i[a] == "number" ? i[a].toFixed(0) : ""}
          .value=${s[a] !== void 0 ? String(s[a]) : ""}
          @change=${(c) => {
      if (!this.config) return;
      const p = c.target.value.trim();
      if (p === "") {
        const u = {};
        for (const y of Object.keys(s))
          y !== a && (u[y] = s[y]);
        const h = this.config, f = Ge(h, e.id, u);
        this.pushPatch(h, f, `update speed curve ${a} for ${e.id}`);
      } else {
        const u = parseFloat(p);
        if (!Number.isFinite(u)) return;
        const h = this.config, f = Ge(h, e.id, { ...s, [a]: u });
        this.pushPatch(h, f, `update speed curve ${a} for ${e.id}`);
      }
    }}
        />
      </div>
    `, r = [i.threshold, i.p50, i.peak].map((a) => `${(L(a, i) / 1e3).toFixed(1)}s`);
    return b`
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
          ${Object.keys(s).length > 0 ? b`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const a = this.config, l = $n(a, e.id);
      this.pushPatch(a, l, `reset speed curve for ${e.id}`);
    }}>Reset to domain defaults</button>` : w}
        </div>
      </details>
    `;
  }
  renderAnimationSection(e) {
    if (!this.config) return b``;
    const t = e.animation ?? {}, i = t.animation_style ?? "dots", s = (c) => {
      if (!this.config) return;
      const p = this.config, u = _n(p, e.id, c);
      this.pushPatch(p, u, `update animation for ${e.id}`);
    }, o = !(/* @__PURE__ */ new Set(["dash", "pulse", "fluid", "none"])).has(i), r = i === "pulse", a = i === "trail", l = i === "dash", d = e.color ?? "#4ADE80";
    return b`
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
              ${Gt.map(
      (c) => b`<option value=${c} ?selected=${i === c}>${c}</option>`
    )}
            </select>
          </label>

          ${o ? b`
            <label>Particle shape
              <select
                .value=${t.particle_shape ?? "circle"}
                @change=${(c) => {
      s({ particle_shape: c.target.value });
    }}
              >
                ${qt.map(
      (c) => b`<option value=${c} ?selected=${(t.particle_shape ?? "circle") === c}>${c}</option>`
    )}
              </select>
            </label>
            ${(t.particle_shape ?? "circle") === "custom_svg" ? b`
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
              ${Kt.map(
      (c) => b`<option value=${c} ?selected=${(t.direction ?? "auto") === c}>${c}</option>`
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
              ${Yt.map(
      (c) => b`<option value=${c} ?selected=${(t.particle_spacing ?? "even") === c}>${c}</option>`
    )}
            </select>
          </label>

          ${t.particle_spacing === "clustered" ? b`
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

          ${t.particle_spacing === "pulse" ? b`
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

          ${t.particle_spacing === "wave_spacing" || t.particle_spacing === "wave_lateral" ? b`
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

          ${r ? b`
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

          ${a ? b`
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

          ${l ? b`
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

          ${e.animation && Object.keys(e.animation).length > 0 ? b`<button class="ghost" @click=${() => {
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
      return b`<line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="2" stroke-opacity="0.3"/>`;
    if (e === "dash") {
      const r = t.dash_gap ?? 0.5, a = 14, l = a * r;
      return b`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="3"
          stroke-dasharray="${a} ${l}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${a + l}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (e === "fluid")
      return b`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (e === "pulse")
      return b`
        ${[40, 90, 140].map(
        (a, l) => b`
            <circle cx=${a} cy="20" r="0" fill="none"
              stroke=${i} stroke-width=${t.pulse_width ?? 2}>
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
      return b`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (a, l) => b`
            <circle cx=${a} cy="20" r=${s} fill=${i} opacity="0">
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
    return b`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${o.map(
      (r, a) => b`
          <circle cx=${r} cy="20" r=${s} fill=${i} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
          </circle>
        `
    )}
    `;
  }
  renderWaypointList(e) {
    if (!this.config) return b``;
    const t = new Map(this.config.nodes.map((o) => [o.id, o])), i = t.get(e.from_node), s = t.get(e.to_node), n = () => {
      if (!this.config) return;
      const o = [
        ...i ? [i.position] : [],
        ...e.waypoints,
        ...s ? [s.position] : []
      ];
      let r = 0, a = 0;
      for (let f = 0; f < o.length - 1; f++) {
        const y = o[f], g = o[f + 1], m = Math.hypot(g.x - y.x, g.y - y.y);
        m > a && (a = m, r = f);
      }
      const l = o[r], d = o[r + 1], c = { x: (l.x + d.x) / 2, y: (l.y + d.y) / 2 }, p = r > 0 ? r - 1 + 1 : 0, u = this.config, h = Re(u, e.id, p, c);
      this.pushPatch(u, h, `add waypoint to ${e.id}`);
    };
    return b`
      <div class="waypoint-section">
        <div class="waypoint-section-header">
          Waypoints
          <span class="waypoint-count">${e.waypoints.length}</span>
        </div>

        ${e.waypoints.length === 0 ? b`<div class="waypoint-empty">No waypoints — click on the flow line to add one.</div>` : b`
            <div class="waypoint-list">
              ${e.waypoints.map((o, r) => b`
                <div class="waypoint-row">
                  <span class="waypoint-index">#${r + 1}</span>
                  <label class="waypoint-coord">
                    x%
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${o.x.toFixed(1)}
                      @change=${(a) => {
      if (!this.config) return;
      const l = parseFloat(a.target.value);
      if (!Number.isFinite(l)) return;
      const d = this.config, c = Wt(d, e.id, r, { x: l, y: o.y });
      this.pushPatch(d, c, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    y%
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${o.y.toFixed(1)}
                      @change=${(a) => {
      if (!this.config) return;
      const l = parseFloat(a.target.value);
      if (!Number.isFinite(l)) return;
      const d = this.config, c = Wt(d, e.id, r, { x: o.x, y: l });
      this.pushPatch(d, c, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <button class="icon-btn" title="Delete waypoint"
                    @click=${() => {
      if (!this.config) return;
      const a = this.config, l = De(a, e.id, r);
      this.pushPatch(a, l, `delete waypoint ${r} of ${e.id}`);
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
    if (!this.config) return b``;
    const t = e.value_gradient, i = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, s = (o) => {
      if (!this.config) return;
      const r = this.config, a = An(r, e.id, o);
      this.pushPatch(r, a, `update gradient for ${e.id}`);
    };
    let n = w;
    if (t && t.low_color && t.high_color)
      try {
        const o = hi(
          (t.low_value + t.high_value) / 2,
          t
        ), r = `background: linear-gradient(to right, ${t.low_color}, ${o}, ${t.high_color});`;
        n = b`
          <div class="gradient-preview-bar" style=${r}></div>
          <div class="gradient-preview-labels">
            <span>${t.low_color}</span><span>${t.high_color}</span>
          </div>
        `;
      } catch {
      }
    return b`
      <div class="gradient-section">
        <div class="gradient-section-header">Value gradient</div>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!t}
            @change=${(o) => {
      if (!this.config) return;
      const r = o.target.checked, a = this.config, l = r ? Sn(a, e.id, i) : Ke(a, e.id);
      this.pushPatch(a, l, `${r ? "enable" : "disable"} gradient for ${e.id}`);
    }}
          />
          Enable value gradient
        </label>

        ${t ? b`
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
      const o = this.config, r = Ke(o, e.id);
      this.pushPatch(o, r, `disable gradient for ${e.id}`);
    }}>Remove gradient</button>
        ` : w}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return w;
    const e = this.config.animation ?? {};
    return b`
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
      const i = parseInt(t.target.value, 10), s = this.config, n = qe(s, { fps: i });
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
      const i = t.target.checked, s = this.config, n = qe(s, { smooth_speed: i });
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
    return b`
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
      const o = n.target.checked, r = this.config, a = hn(r, e.id, o);
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
      const r = this.config, a = fn(r, e.id, o);
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
    return b`
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
      ${this.customConfigError ? b`<div class="custom-config-error">${this.customConfigError}</div>` : w}
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
      return b`
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
        const l = this.config, d = He(l, i, a);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, d = He(l, i, a);
        this.pushPatch(l, d, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${o.toFixed(2)}</span>
        </label>
      `;
    };
    return b`
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
      return b`
        <div class="color-picker-row">
          <span class="color-picker-label">${n}</span>
          <input
            type="color"
            .value=${o ?? r}
            @change=${(a) => {
        if (!this.config) return;
        const l = a.target.value, d = this.config, c = Ve(d, s, l);
        this.pushPatch(d, c, `set domain_colors.${s}`);
      }}
          />
          <span class="color-picker-value">${o || `${r} (default)`}</span>
          ${o ? b`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, l = Ve(a, s, void 0);
        this.pushPatch(a, l, `reset domain_colors.${s}`);
      }}>Reset</button>` : w}
        </div>
      `;
    };
    return b`
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
      return b`
        <label class="visibility-row">
          <span class="visibility-label">${s}</span>
          <input
            type="checkbox"
            .checked=${n}
            @change=${(o) => {
        if (!this.config) return;
        const r = o.target.checked, a = this.config, l = xn(a, i, r);
        this.pushPatch(a, l, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${n ? "visible" : "hidden"}</span>
        </label>
      `;
    };
    return b`
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
      return b`
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
        const l = Math.max(n.min, Math.min(n.max, a)), d = this.config, c = bn(d, i, l);
        this.pushPatch(d, c, `set defaults.${i}`);
      }}
          />
          <span class="defaults-unit">${o}</span>
        </label>
      `;
    };
    return b`
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
    return this.config ? this.selectedNodeId || this.selectedFlowId || this.selectedOverlayId ? b`<div class="z-context-body">${this.renderInspector()}</div>` : this.renderStateA() : b``;
  }
  /** State A — nothing selected: background, appearance, defaults panels. */
  renderStateA() {
    return b`
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
  // ──────────────────────────────────────────────────────────────────────────
  renderRubberBand() {
    const e = this.rubberBand;
    if (!e) return w;
    const t = Math.min(e.x1, e.x2), i = Math.min(e.y1, e.y2), s = Math.abs(e.x2 - e.x1), n = Math.abs(e.y2 - e.y1);
    return b`
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
    return b`
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
    const t = this.config, i = Te(t, e, !1);
    this.pushPatch(t, i, `hide ${e.size} nodes`);
  }
  bulkShow(e) {
    if (!this.config) return;
    const t = this.config, i = Te(t, e, !0);
    this.pushPatch(t, i, `show ${e.size} nodes`);
  }
  bulkAlignH(e, t) {
    if (!this.config) return;
    const i = this.config, s = Qs(i, e, t);
    this.pushPatch(i, s, `align ${e.size} nodes horizontally`);
  }
  bulkAlignV(e, t) {
    if (!this.config) return;
    const i = this.config, s = tn(i, e, t);
    this.pushPatch(i, s, `align ${e.size} nodes vertically`);
  }
  bulkDelete(e) {
    if (!this.config || !window.confirm(`Delete ${e.size} nodes (and their flows)?`)) return;
    const t = this.config, i = Zs(t, e);
    this.pushPatch(t, i, `delete ${e.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderWeatherPanel() {
    if (!this.config) return w;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {}), i = e.weather_entity && this.hass ? this.hass.states[e.weather_entity]?.state : void 0;
    return b`
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
            ${e.default ? b`<img class="weather-thumb" src=${e.default} alt="default background" />` : w}
          </label>
          <label>
            Weather entity (optional)
            ${this.renderEntityPicker(
      e.weather_entity ?? "",
      (s) => this.setWeatherEntityValue(s),
      { includeDomains: ["weather"], placeholder: "weather.forecast_home" }
    )}
          </label>
          ${i !== void 0 ? b`<div class="weather-live-state">
                Current state: <strong>${i}</strong>
                ${e.weather_states?.[i] ? b` → <span class="weather-match-ok">matched</span>` : b` → <span class="weather-match-miss">no mapping (using default)</span>`}
              </div>` : w}
          <label>
            Sun entity (optional) — enables automatic night background variants
            ${this.renderEntityPicker(
      e.sun_entity ?? "",
      (s) => {
        if (!this.config) return;
        const n = this.config, o = on(n, s || void 0);
        this.pushPatch(n, o, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: "sun.sun" }
    )}
          </label>
          ${e.sun_entity && this.hass?.states[e.sun_entity] ? b`<div class="weather-live-state">
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
      ([s, n]) => b`
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
                    ${n ? b`<img class="weather-thumb" src=${n} alt=${s} />` : w}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(s)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${C.KNOWN_WEATHER_STATES.map(
      (s) => b`<option value=${s}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
          <details class="hint-details">
            <summary>Standard Met.no state list (for reference)</summary>
            <div class="hint-states">
              ${C.KNOWN_WEATHER_STATES.map(
      (s) => b`<code>${s}</code>`
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
    const t = e.trim(), i = this.config, s = nn(i, t || void 0);
    this.pushPatch(i, s, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const s = this.config, n = yn(s, e, i);
    n !== s && this.pushPatch(s, n, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, s = this.config, n = Ue(s, e, i);
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
    ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Le(n, e, t, s), a = {
      ...o,
      flows: o.flows.map(
        (l) => l.id === r.id ? { ...l, waypoints: i.map((d) => ({ x: d.x, y: d.y })) } : l
      )
    };
    this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = r.id, this.statusMessage = `Created flow ${r.id} with ${i.length} waypoint(s).`, this.pushPatch(n, a, `suggest-path ${r.id}`);
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
    return b`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (n) => b`
          <div class="suggest-marker" style=${`left: ${n.x}%; top: ${n.y}%;`}></div>
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
    const s = (this.config.overlays ?? []).find((l) => l.id === e);
    if (!s) return;
    const n = s.size ?? { width: 20, height: 15 }, o = Number(i.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, a = Be(r, e, { ...n, [t]: o });
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
      const n = un(s, e, i), o = $t(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: s, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = dn(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = Xs(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = en(t, e);
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
C.styles = se`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    /* ── Three-zone layout ─────────────────────────────────────────────────
       HA editor dialog is ~510px tall. Target split:
         Canvas  140px  (fixed — avoids %-of-min-height ambiguity)
         Toolbar  36px  (fixed)
         Options  flex-grows to fill all remaining height
    ────────────────────────────────────────────────────────────────────── */
    .wrap {
      display: flex;
      flex-direction: column;
      /* min-height: HA doesn't always give :host an explicit height;
         600px ensures the editor is usable in any context. */
      min-height: 600px;
      height: 100%;
      padding: 0;
      gap: 0;
      overflow: hidden;
    }
    /* ZONE 1 — Canvas (fixed 140px so height is never ambiguous) */
    .z-canvas {
      flex: 0 0 140px;
      width: 100%;
      position: relative;
      overflow: hidden;
    }
    /* ZONE 2 — Toolbar (fixed 72px — two rows of 36px each) */
    .z-toolbar {
      flex: 0 0 72px;
      display: grid;
      grid-template-columns: 10% 55% 35%;
      background: var(--card-background-color, #1a1a1a);
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      overflow: hidden;
    }
    /* ── Toolbar: left column — Undo/Redo ── */
    .tb-col-undo {
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .tb-icon-btn {
      flex: 1 1 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font: inherit;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.06));
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: background 120ms;
    }
    .tb-icon-btn:last-child {
      border-bottom: none;
    }
    .tb-icon-btn:hover:not(:disabled) {
      background: var(--secondary-background-color, rgba(255,255,255,0.08));
    }
    .tb-icon-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    /* ── Toolbar: centre column — Actions ── */
    .tb-col-actions {
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      overflow: hidden;
    }
    .tb-row {
      flex: 1 1 0;
      display: flex;
      align-items: stretch;
      min-height: 0;
      overflow: hidden;
    }
    .tb-row-save {
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.06));
    }
    .tb-btn {
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font: inherit;
      font-size: 11px;
      padding: 0 4px;
      border: none;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.08));
      background: transparent;
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 120ms;
    }
    .tb-btn:last-child {
      border-right: none;
    }
    .tb-btn:hover:not(:disabled) {
      background: var(--secondary-background-color, rgba(255,255,255,0.1));
    }
    .tb-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .tb-btn-save {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .tb-btn-save:hover:not(:disabled) {
      filter: brightness(1.15);
    }
    .tb-btn-cancel:hover:not(:disabled) {
      background: var(--error-color, rgba(239,68,68,0.2));
      color: var(--error-color, #ef4444);
    }
    .tb-status {
      flex: 1 1 auto;
      font-size: 10px;
      color: #4ade80;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      padding: 0 4px;
    }
    .tb-error {
      flex: 1 1 auto;
      font-size: 10px;
      color: var(--error-color, #f44336);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      padding: 0 4px;
    }
    /* ── Toolbar: right column — Element selector ── */
    .tb-col-selector {
      display: flex;
      flex-direction: column;
      padding: 1px 2px;
      gap: 1px;
      overflow: hidden;
    }
    .tb-select {
      flex: 1 1 0;
      width: 100%;
      box-sizing: border-box;
      font-size: 11px;
      font: inherit;
      font-size: 11px;
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
      border-radius: 3px;
      padding: 0 2px;
      min-height: 0;
    }
    .tb-select:disabled {
      opacity: 0.4;
    }
    /* ZONE 3 — Context / Options panel (flex-grows to fill remaining height) */
    .z-context {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
    }
    .z-context-body {
      padding: 8px 0;
    }
    .z-context-body.state-a {
      display: flex;
      flex-direction: column;
    }
    /* ── Canvas stage ──────────────────────────────────────────────────── */
    .stage {
      position: absolute;
      /* Inset slightly for border aesthetics; position:absolute fills z-canvas. */
      inset: 4px 8px;
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
    /* ── Node inspector compact rows ── */
    .node-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      align-items: flex-end;
      margin-bottom: 6px;
    }
    .node-cell {
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      min-width: 60px;
      gap: 2px;
      font-size: 11px;
    }
    .node-cell-label {
      font-size: 10px;
      opacity: 0.65;
      white-space: nowrap;
    }
    .node-cell input[type='text'],
    .node-cell input[type='number'] {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      font-size: 11px;
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.2));
      background: var(--secondary-background-color, rgba(255,255,255,0.06));
      color: var(--primary-text-color, #fff);
    }
    .node-cell input[type='color'] {
      width: 100%;
      height: 24px;
      padding: 1px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.2));
      background: transparent;
      cursor: pointer;
      box-sizing: border-box;
    }
    .node-cell-toggle {
      flex-direction: row;
      align-items: center;
      gap: 4px;
      min-width: auto;
    }
    .node-cell-toggle input[type='checkbox'] {
      width: 14px;
      height: 14px;
      cursor: pointer;
      flex-shrink: 0;
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
], C.prototype, "selectorType", 2);
F([
  M()
], C.prototype, "savedConfig", 2);
C = F([
  re("flowme-card-editor")
], C);
var Jn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, Z = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Zn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Jn(t, i, n), n;
};
const Qn = "1.0.15.5", ti = 5e3;
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
let D = class extends G {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = li(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e) {
      const i = this.config, s = [
        ...i?.flows.map((a) => a.entity) ?? [],
        ...i?.flows.map((a) => a.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((a) => a.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((a) => typeof a == "string" && a.length > 0), n = {};
      for (const a of s)
        n[a] = e.states[a]?.state;
      P("hass setter called. config entity states:", n);
      const o = i?.background.weather_entity;
      if (o) {
        const a = t?.states[o]?.state, l = e.states[o]?.state;
        P("[weather] state:", l, "(was:", a, ")"), a !== l && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const a = t?.states[r]?.state, l = e.states[r]?.state;
        a !== l && (P("[sun] state changed:", a, "→", l), this.syncWeatherBackground());
      }
    } else
      P("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    try {
      const t = $t(e);
      xs(t.debug ?? !1), P("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), P("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof ae ? t.message : String(t);
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
      this.teardownRenderer(), this.renderer = Rs(), this.rendererReadyFor = this.config;
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
        const t = this.hass.states[e.entity], i = Pe(t?.state), s = q(e.domain ?? this.config.domain), n = t?.attributes?.unit_of_measurement, o = ds(i, n, s.unit_scale);
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
          const r = e.value_gradient.entity, a = this.hass.states[r];
          if (a && a.state !== "unavailable" && a.state !== "unknown") {
            const l = parseFloat(a.state);
            if (Number.isFinite(l)) {
              const d = e.value_gradient, c = Math.max(d.low_value, Math.min(d.high_value, l)), p = hi(l, d);
              P(
                "[gradient]",
                e.id,
                "entity value:",
                l,
                "clamped:",
                c,
                "range:",
                `${d.low_value}–${d.high_value}`,
                "colour:",
                p
              ), this.renderer.setGradientColor(e.id, p);
            } else
              P(`flow "${e.id}" gradient entity "${r}" state "${a.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            P(`flow "${e.id}" gradient entity "${r}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
        }
      }
    }
  }
  getCardSize() {
    const e = Tt(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = Tt(this.config?.aspect_ratio) ?? 1.6;
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
    const i = `${1 / (Tt(e.aspect_ratio) ?? 16 / 10) * 100}%`, s = e.background.transition_duration ?? ti, n = to(e.opacity), o = eo(e.visibility);
    return b`
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
          <div class="renderer-mount" ${ci(this.rendererMount)}></div>
          ${e.nodes.map((r) => this.renderNodeHandle(r))}
          ${(e.overlays ?? []).map((r) => (P("rendering overlay →", r.type, "position=", r.position, "size=", r.size), Us(r, this.hass)))}
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
        const i = t.state, s = e.sun_entity ? this.hass.states[e.sun_entity]?.state : void 0, n = ps(i, s, e.weather_states, e.default);
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
    const t = this.config.background.transition_duration ?? ti;
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, s = e.show_label !== !1 && !!e.label, n = q(this.config?.domain), o = e.color ?? this.nodeFlowColor(e.id) ?? n.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let a = "";
    if (t) {
      const d = Pe(t.state), c = t.attributes?.unit_of_measurement ?? "";
      c ? a = `${this.formatSensorNumber(d)} ${c}` : a = n.describe(d);
    }
    const l = e.visible === !1;
    return b`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; --flowme-dot-size: ${r}px;${e.opacity !== void 0 ? ` opacity: ${e.opacity};` : ""}${l ? " display: none;" : ""}`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${s ? b`<span class="node-label">${e.label}</span>` : null}
        ${i ? b`<span class="node-value">${a}</span>` : null}
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
      const r = q(o.domain ?? t), a = mt(o, r, o.domain ?? t, 1, i), l = a.toLowerCase();
      n.has(l) || (n.add(l), s || (s = a));
    }
    if (n.size !== 0)
      return n.size === 1 ? s : ys;
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
D.styles = se`
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
], D.prototype, "hass", 1);
Z([
  M()
], D.prototype, "config", 2);
Z([
  M()
], D.prototype, "errorMessage", 2);
Z([
  M()
], D.prototype, "bgLayerA", 2);
Z([
  M()
], D.prototype, "bgLayerB", 2);
Z([
  M()
], D.prototype, "activeLayer", 2);
D = Z([
  re("flowme-card")
], D);
const te = window;
te.customCards = te.customCards ?? [];
te.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  D as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
