/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, Ot = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nt = Symbol(), Lt = /* @__PURE__ */ new WeakMap();
let pe = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ot && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Lt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Lt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Oe = (e) => new pe(typeof e == "string" ? e : e + "", void 0, Nt), bt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new pe(i, e, Nt);
}, Ne = (e, t) => {
  if (Ot) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = dt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, Dt = Ot ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Oe(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Te, defineProperty: Ie, getOwnPropertyDescriptor: Ue, getOwnPropertyNames: Fe, getOwnPropertySymbols: ze, getPrototypeOf: Re } = Object, T = globalThis, Ht = T.trustedTypes, Le = Ht ? Ht.emptyScript : "", De = T.reactiveElementPolyfillSupport, Y = (e, t) => e, pt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Le : null;
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
} }, Tt = (e, t) => !Te(e, t), jt = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let V = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = jt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && Ie(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = Ue(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? jt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const t = Re(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const i = this.properties, n = [...Fe(i), ...ze(i)];
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
      for (const s of n) i.unshift(Dt(s));
    } else t !== void 0 && i.push(Dt(t));
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
    return Ne(t, this.constructor.elementStyles), t;
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
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : pt).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : pt;
      this._$Em = s;
      const c = r.fromAttribute(i, o.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? Tt)(o, i) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[Y("elementProperties")] = /* @__PURE__ */ new Map(), V[Y("finalized")] = /* @__PURE__ */ new Map(), De?.({ ReactiveElement: V }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, Bt = (e) => e, ft = Z.trustedTypes, Wt = ft ? ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, fe = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, ge = "?" + N, He = `<${ge}>`, R = document, it = () => R.createComment(""), nt = (e) => e === null || typeof e != "object" && typeof e != "function", It = Array.isArray, je = (e) => It(e) || typeof e?.[Symbol.iterator] == "function", _t = `[ 	
\f\r]`, X = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Vt = />/g, U = RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, Kt = /"/g, ye = /^(?:script|style|textarea|title)$/i, Be = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), g = Be(1), G = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Jt = /* @__PURE__ */ new WeakMap(), z = R.createTreeWalker(R, 129);
function me(e, t) {
  if (!It(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wt !== void 0 ? Wt.createHTML(t) : t;
}
const We = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = X;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let l, h, d = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, h = r.exec(a), h !== null); ) u = r.lastIndex, r === X ? h[1] === "!--" ? r = qt : h[1] !== void 0 ? r = Vt : h[2] !== void 0 ? (ye.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = U) : h[3] !== void 0 && (r = U) : r === U ? h[0] === ">" ? (r = s ?? X, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, l = h[1], r = h[3] === void 0 ? U : h[3] === '"' ? Kt : Gt) : r === Kt || r === Gt ? r = U : r === qt || r === Vt ? r = X : (r = U, s = void 0);
    const p = r === U && e[c + 1].startsWith("/>") ? " " : "";
    o += r === X ? a + He : d >= 0 ? (n.push(l), a.slice(0, d) + fe + a.slice(d) + N + p) : a + N + (d === -2 ? c : p);
  }
  return [me(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class st {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, h] = We(t, i);
    if (this.el = st.createElement(l, n), z.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = z.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(fe)) {
          const u = h[r++], p = s.getAttribute(d).split(N), b = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: b[2], strings: p, ctor: b[1] === "." ? Ve : b[1] === "?" ? Ge : b[1] === "@" ? Ke : wt }), s.removeAttribute(d);
        } else d.startsWith(N) && (a.push({ type: 6, index: o }), s.removeAttribute(d));
        if (ye.test(s.tagName)) {
          const d = s.textContent.split(N), u = d.length - 1;
          if (u > 0) {
            s.textContent = ft ? ft.emptyScript : "";
            for (let p = 0; p < u; p++) s.append(d[p], it()), z.nextNode(), a.push({ type: 2, index: ++o });
            s.append(d[u], it());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ge) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(N, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += N.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = R.createElement("template");
    return n.innerHTML = t, n;
  }
}
function K(e, t, i = e, n) {
  if (t === G) return t;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const o = nt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = K(e, s._$AS(e, t.values), s, n)), t;
}
class qe {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (t?.creationScope ?? R).importNode(i, !0);
    z.currentNode = s;
    let o = z.nextNode(), r = 0, c = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new ot(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new Je(o, this, t)), this._$AV.push(l), a = n[++c];
      }
      r !== a?.index && (o = z.nextNode(), r++);
    }
    return z.currentNode = R, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class ot {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = K(this, t, i), nt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== G && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : je(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && nt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(R.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = st.createElement(me(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const o = new qe(s, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = Jt.get(t.strings);
    return i === void 0 && Jt.set(t.strings, i = new st(t)), i;
  }
  k(t) {
    It(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new ot(this.O(it()), this.O(it()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Bt(t).nextSibling;
      Bt(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class wt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = K(this, t, i, 0), r = !nt(t) || t !== this._$AH && t !== G, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = K(this, c[n + a], i, a), l === G && (l = this._$AH[a]), r || (r = !nt(l) || l !== this._$AH[a]), l === m ? t = m : t !== m && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ve extends wt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Ge extends wt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Ke extends wt {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = K(this, t, i, 0) ?? m) === G) return;
    const n = this._$AH, s = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== m && (n === m || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Je {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    K(this, t);
  }
}
const Xe = Z.litHtmlPolyfillSupport;
Xe?.(st, ot), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.2");
const Ye = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = i?.renderBefore ?? null;
    n._$litPart$ = s = new ot(t.insertBefore(it(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis;
let I = class extends V {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ye(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return G;
  }
};
I._$litElement$ = !0, I.finalized = !0, Q.litElementHydrateSupport?.({ LitElement: I });
const Ze = Q.litElementPolyfillSupport;
Ze?.({ LitElement: I });
(Q.litElementVersions ?? (Q.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Tt }, ti = (e = Qe, t, i) => {
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
function P(e) {
  return (t, i) => typeof i == "object" ? ti(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(e) {
  return P({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ei = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = { CHILD: 2 }, ni = (e) => (...t) => ({ _$litDirective$: e, values: t });
class si {
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
const tt = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const n of i) n._$AO?.(t, !1), tt(n, t);
  return !0;
}, gt = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, be = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), ai(t);
  }
};
function oi(e) {
  this._$AN !== void 0 ? (gt(this), this._$AM = e, be(this)) : this._$AM = e;
}
function ri(e, t = !1, i = 0) {
  const n = this._$AH, s = this._$AN;
  if (s !== void 0 && s.size !== 0) if (t) if (Array.isArray(n)) for (let o = i; o < n.length; o++) tt(n[o], !1), gt(n[o]);
  else n != null && (tt(n, !1), gt(n));
  else tt(this, e);
}
const ai = (e) => {
  e.type == ii.CHILD && (e._$AP ?? (e._$AP = ri), e._$AQ ?? (e._$AQ = oi));
};
class ci extends si {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, n) {
    super._$AT(t, i, n), be(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (tt(this, t), gt(this));
  }
  setValue(t) {
    if (ei(this._$Ct)) this._$Ct._$AI(t, this);
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
const we = () => new li();
class li {
}
const At = /* @__PURE__ */ new WeakMap(), ve = ni(class extends ci {
  render(e) {
    return m;
  }
  update(e, [t]) {
    const i = t !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), m;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let i = At.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), At.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? At.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), yt = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], et = ["sensor", "switch", "camera", "button", "custom"], St = ["toggle", "more-info", "none"], di = ["javascript:", "vbscript:", "data:", "file:"];
function $e(e, t = "card_config") {
  const i = [], n = /* @__PURE__ */ new WeakSet(), s = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const c = o.trim().toLowerCase();
        for (const a of di)
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
function hi(e, t = "card_config") {
  const i = $e(e, t);
  if (i.length === 0) return;
  const n = i[0];
  throw new Error(
    `Unsafe URL scheme '${n.scheme}' in ${n.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class Ut extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Xt = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function y(e, t) {
  throw new Ut(`${e}: ${t}`);
}
function Ft(e, t) {
  (!e || typeof e != "object") && y(t, "must be an object with x and y");
  const i = e, n = i.x, s = i.y;
  (typeof n != "number" || !Number.isFinite(n)) && y(`${t}.x`, "must be a finite number"), (typeof s != "number" || !Number.isFinite(s)) && y(`${t}.y`, "must be a finite number");
  const o = n, r = s;
  return (o < 0 || o > 100) && y(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && y(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function Yt(e, t) {
  (typeof e != "string" || !e.length) && y(t, "must be a non-empty string");
  const i = e;
  return Xt.some((s) => i.startsWith(s)) || y(
    t,
    `must start with one of ${Xt.join(", ")} (got "${i.slice(0, 40)}")`
  ), i;
}
function ui(e, t, i) {
  const n = `nodes[${t}]`;
  (!e || typeof e != "object") && y(n, "must be an object");
  const s = e, o = s.id;
  (typeof o != "string" || !o.length) && y(`${n}.id`, "must be a non-empty string");
  const r = o;
  i.has(r) && y(`${n}.id`, `duplicate node id "${r}"`), i.add(r);
  const c = Ft(s.position, `${n}.position`), a = { id: r, position: c };
  return typeof s.entity == "string" && (a.entity = s.entity), typeof s.label == "string" && (a.label = s.label), typeof s.color == "string" && (a.color = s.color), typeof s.size == "number" && (a.size = s.size), typeof s.show_label == "boolean" && (a.show_label = s.show_label), typeof s.show_value == "boolean" && (a.show_value = s.show_value), a;
}
function pi(e, t, i, n) {
  const s = `flows[${t}]`;
  (!e || typeof e != "object") && y(s, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && y(`${s}.id`, "must be a non-empty string");
  const c = r;
  i.has(c) && y(`${s}.id`, `duplicate flow id "${c}"`), i.add(c);
  const a = o.from_node;
  (typeof a != "string" || !n.has(a)) && y(`${s}.from_node`, `references unknown node "${String(a)}"`);
  const l = o.to_node;
  (typeof l != "string" || !n.has(l)) && y(`${s}.to_node`, `references unknown node "${String(l)}"`);
  const h = o.entity;
  (typeof h != "string" || !h.length) && y(`${s}.entity`, "must be a non-empty entity id");
  const d = o.waypoints;
  Array.isArray(d) || y(`${s}.waypoints`, "must be an array (may be empty)");
  const u = d.map(
    (b, f) => Ft(b, `${s}.waypoints[${f}]`)
  ), p = {
    id: c,
    from_node: a,
    to_node: l,
    entity: h,
    waypoints: u
  };
  if (typeof o.domain == "string" && (yt.includes(o.domain) || y(`${s}.domain`, `must be one of ${yt.join(", ")}`), p.domain = o.domain), typeof o.color_positive == "string" && (p.color_positive = o.color_positive), typeof o.color_negative == "string" && (p.color_negative = o.color_negative), typeof o.threshold == "number" && (p.threshold = o.threshold), typeof o.reverse == "boolean" && (p.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const b = o.speed_multiplier;
    (b < 0.1 || b > 5) && y(`${s}.speed_multiplier`, "must be between 0.1 and 5.0"), p.speed_multiplier = b;
  }
  return p;
}
function ht(e) {
  if (!e || typeof e != "object") throw new Ut("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && y("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), yt.includes(t.domain) || y("domain", `must be one of ${yt.join(", ")}`);
  const i = t.background;
  (!i || typeof i != "object") && y("background", "must be an object");
  const n = i, o = { default: Yt(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && y("background.weather_entity", "must be a string entity id"), o.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && y("background.weather_states", "must be an object mapping state strings to image URLs");
    const p = Object.entries(n.weather_states), b = {};
    for (const [f, w] of p)
      b[f] = Yt(w, `background.weather_states.${f}`);
    o.weather_states = b;
  }
  n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && y("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = n.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || y("nodes", "must be an array");
  const c = /* @__PURE__ */ new Set(), a = r.map((p, b) => ui(p, b, c));
  a.length === 0 && y("nodes", "at least one node is required");
  const l = t.flows;
  Array.isArray(l) || y("flows", "must be an array");
  const h = /* @__PURE__ */ new Set(), d = l.map(
    (p, b) => pi(p, b, h, c)
  ), u = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: a,
    flows: d
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && y("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), u.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && y("fullscreen", "must be a boolean"), u.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && y("edit_mode_password", "must be a string"), u.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || y("overlays", "must be an array");
    const p = /* @__PURE__ */ new Set();
    u.overlays = t.overlays.map(
      (b, f) => fi(b, f, p)
    );
  }
  return u;
}
function fi(e, t, i) {
  const n = `overlays[${t}]`;
  (!e || typeof e != "object") && y(n, "must be an object");
  const s = e, o = s.type;
  (typeof o != "string" || !et.includes(o)) && y(`${n}.type`, `must be one of ${et.join(", ")}`);
  const r = s.id;
  (typeof r != "string" || !r.length) && y(`${n}.id`, "must be a non-empty string"), i.has(r) && y(`${n}.id`, `duplicate overlay id "${r}"`), i.add(r);
  const c = Ft(s.position, `${n}.position`), a = {
    id: r,
    type: o,
    position: c
  };
  if (s.entity !== void 0 && ((typeof s.entity != "string" || !s.entity.length) && y(`${n}.entity`, "must be a non-empty entity id"), a.entity = s.entity), (o === "sensor" || o === "switch" || o === "camera") && !a.entity && y(`${n}.entity`, `is required for overlay type "${o}"`), s.label !== void 0 && (typeof s.label != "string" && y(`${n}.label`, "must be a string"), a.label = s.label), s.size !== void 0) {
    const l = s.size;
    (!l || typeof l != "object") && y(`${n}.size`, "must be an object with width and height");
    const h = l, d = h.width, u = h.height;
    (typeof d != "number" || !Number.isFinite(d) || d <= 0 || d > 100) && y(`${n}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof u != "number" || !Number.isFinite(u) || u <= 0 || u > 100) && y(`${n}.size.height`, "must be a positive number ≤ 100 (percent of card)"), a.size = { width: d, height: u };
  }
  if (s.tap_action !== void 0) {
    const l = s.tap_action;
    (!l || typeof l != "object") && y(`${n}.tap_action`, "must be an object");
    const d = l.action;
    (typeof d != "string" || !St.includes(d)) && y(`${n}.tap_action.action`, `must be one of ${St.join(", ")}`), a.tap_action = { action: d };
  }
  if (s.card_config !== void 0) {
    const l = s.card_config;
    (!l || typeof l != "object" || Array.isArray(l)) && y(`${n}.card_config`, "must be an object"), o !== "custom" && y(`${n}.card_config`, 'is only valid when type === "custom"');
    const h = $e(l, `${n}.card_config`);
    if (h.length) {
      const d = h[0];
      y(
        d.path,
        `unsafe URL scheme "${d.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in custom overlay configs`
      );
    }
    a.card_config = l;
  }
  return o === "custom" && !a.card_config && y(`${n}.card_config`, 'is required when type === "custom"'), a;
}
function L(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function mt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function xe(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const n = e[i - 1], s = e[i];
    if (!n || !s) continue;
    const o = s.x - n.x, r = s.y - n.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function gi(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = xe(e), n = L(t, 0, 1) * i;
  let s = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], c = e[o], a = c.x - r.x, l = c.y - r.y, h = Math.sqrt(a * a + l * l);
    if (s + h >= n) {
      const d = h === 0 ? 0 : (n - s) / h;
      return { x: r.x + a * d, y: r.y + l * d };
    }
    s += h;
  }
  return { ...e[e.length - 1] };
}
function Zt(e, t) {
  if (e.length === 0) return "";
  const [i, ...n] = e;
  if (!i) return "";
  const s = mt(i, t), o = [`M ${s.x.toFixed(2)} ${s.y.toFixed(2)}`];
  for (const r of n) {
    const c = mt(r, t);
    o.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
  }
  return o.join(" ");
}
function Ct(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
function _e(e, t) {
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
function Ae(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), n = Number.parseInt(t[2], 10);
  if (!(!i || !n))
    return i / n;
}
const yi = {
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
    const i = 8e3 - Math.log10(t / 10) * 2e3;
    return L(i, 400, 8e3);
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, mi = {
  domain: "water",
  default_color_positive: "#3B82F6",
  default_color_negative: "#3B82F6",
  shape: "wave",
  glow: !1,
  unit_label: "L/min",
  visibility_threshold: 0.5,
  speed_curve(e) {
    const t = Math.abs(e);
    return L(6e3 - t * 200, 800, 6e3);
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, bi = {
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
    return Math.round(L(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, wi = {
  domain: "hvac",
  default_color_positive: "#A78BFA",
  default_color_negative: "#60A5FA",
  shape: "wave",
  glow: !1,
  unit_label: "CFM",
  visibility_threshold: 10,
  speed_curve(e) {
    const t = Math.abs(e);
    return L(5e3 - t * 10, 600, 5e3);
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return L(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, vi = {
  domain: "gas",
  default_color_positive: "#FB923C",
  default_color_negative: "#FB923C",
  shape: "pulse",
  glow: !0,
  unit_label: "m³/h",
  visibility_threshold: 0.01,
  speed_curve(e) {
    const t = Math.abs(e);
    return L(1e4 - t * 5e4, 2e3, 1e4);
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, ke = {
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
}, Qt = {
  energy: yi,
  water: mi,
  network: bi,
  hvac: wi,
  gas: vi,
  generic: ke
};
function zt(e) {
  return e && e in Qt ? Qt[e] : ke;
}
const k = "http://www.w3.org/2000/svg", ct = "http://www.w3.org/1999/xlink", $i = 3, xi = 5, lt = 9, _i = 2, Ai = 8, ki = 14;
class te {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = _e(() => this.flushUpdates(), 200);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((s) => [s.id, s]));
    const n = document.createElementNS(k, "svg");
    n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("preserveAspectRatio", "none"), n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", n.style.overflow = "visible", this.svg = n, t.appendChild(n), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t);
  }
  updateFlow(t, i) {
    this.flowsById.has(t) && (this.latestValues.set(t, i), this.applyUpdate());
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
    const i = document.createElementNS(k, "defs");
    this.svg.appendChild(i);
    const n = new Map(this.config.nodes.map((s) => [s.id, s]));
    for (const s of this.config.flows) {
      const o = n.get(s.from_node), r = n.get(s.to_node);
      if (!o || !r) continue;
      const a = this.profileFor(s).shape, l = [o.position, ...s.waypoints, r.position], h = `flowme-path-${s.id}`, d = document.createElementNS(k, "path");
      d.setAttribute("id", h), d.setAttribute("d", Zt(l, t)), d.setAttribute("fill", "none"), i.appendChild(d);
      const u = document.createElementNS(k, "g");
      u.setAttribute("data-flow-id", s.id);
      const p = document.createElementNS(k, "use");
      p.setAttributeNS(ct, "href", `#${h}`), p.setAttribute("href", `#${h}`), p.setAttribute("stroke", this.primaryColor(s)), p.setAttribute("stroke-opacity", "0.2"), p.setAttribute("stroke-width", String(_i)), p.setAttribute("stroke-linecap", "round"), p.setAttribute("stroke-linejoin", "round"), p.setAttribute("fill", "none"), u.appendChild(p);
      const b = {
        group: u,
        path: d,
        pathId: h,
        shape: a,
        particles: []
      };
      if (a === "wave") {
        const f = document.createElementNS(k, "use");
        f.setAttributeNS(ct, "href", `#${h}`), f.setAttribute("href", `#${h}`), f.setAttribute("stroke", this.primaryColor(s)), f.setAttribute("stroke-width", String(Ai)), f.setAttribute("stroke-opacity", "0.9"), f.setAttribute("stroke-linecap", "round"), f.setAttribute("stroke-linejoin", "round"), f.setAttribute("fill", "none"), f.setAttribute("stroke-dasharray", "14 10"), f.setAttribute("stroke-dashoffset", "0"), f.setAttribute("opacity", "0"), u.appendChild(f), b.waveStroke = f;
      } else a === "pulse" && (b.pulseCircles = []);
      this.svg.appendChild(u), this.flowNodes.set(s.id, b);
    }
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
      s.path.setAttribute("d", Zt(c, t)), s.shape === "pulse" && this.applyFlow(n.id, this.latestValues.get(n.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues)
      this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const n = this.flowsById.get(t), s = this.flowNodes.get(t);
    if (!n || !s) return;
    const o = this.profileFor(n), r = n.threshold ?? o.visibility_threshold, c = Math.abs(i);
    if (!(c >= r)) {
      this.setGroupVisible(s, !1);
      return;
    }
    this.setGroupVisible(s, !0);
    const l = n.speed_multiplier ?? 1, h = Math.max(50, o.speed_curve(c) * l), d = i < 0 != (n.reverse === !0) ? -1 : 1, u = d > 0 ? n.color_positive ?? o.default_color_positive : n.color_negative ?? o.default_color_negative;
    switch (s.shape) {
      case "wave":
        this.applyWave(s, o, h, u, d);
        break;
      case "pulse":
        this.applyPulse(s, n, o, i, h, u);
        break;
      case "square":
        this.applyParticles(s, n, o, i, h, u, d, "square");
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(s, n, o, i, h, u, d, "dot");
        break;
    }
  }
  setGroupVisible(t, i) {
    const n = i ? "1" : "0";
    for (const s of t.particles) s.shape.setAttribute("opacity", n);
    if (t.waveStroke && t.waveStroke.setAttribute("opacity", i ? "0.9" : "0"), t.pulseCircles)
      for (const s of t.pulseCircles) s.circle.setAttribute("opacity", n);
  }
  applyParticles(t, i, n, s, o, r, c, a) {
    const l = Math.max(
      1,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(s) : $i
      )
    );
    if (t.particles.length !== l) {
      for (const d of t.particles) d.shape.remove();
      t.particles = [];
      for (let d = 0; d < l; d++)
        t.particles.push(this.makeParticle(t, a, r, n.glow));
    }
    const h = `${(o / 1e3).toFixed(3)}s`;
    for (let d = 0; d < t.particles.length; d++) {
      const u = t.particles[d];
      if (!u) continue;
      u.shape.setAttribute("fill", r), n.glow && (u.shape.style.color = r);
      const p = document.createElementNS(k, "animateMotion");
      p.setAttribute("repeatCount", "indefinite"), p.setAttribute("dur", h), p.setAttribute("rotate", "auto"), p.setAttribute(
        "begin",
        `${(-o * d / (t.particles.length * 1e3)).toFixed(3)}s`
      ), c < 0 && (p.setAttribute("keyPoints", "1;0"), p.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(k, "mpath");
      b.setAttributeNS(ct, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), p.appendChild(b), u.animateMotion.replaceWith(p), u.animateMotion = p, u.shape.appendChild(p);
    }
  }
  applyWave(t, i, n, s, o) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", s);
    const c = r.querySelector("animate");
    c && c.remove();
    const a = document.createElementNS(k, "animate");
    a.setAttribute("attributeName", "stroke-dashoffset"), a.setAttribute("from", o > 0 ? "0" : "-24"), a.setAttribute("to", o > 0 ? "-24" : "0"), a.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), a.setAttribute("repeatCount", "indefinite"), r.appendChild(a);
  }
  applyPulse(t, i, n, s, o, r) {
    if (!this.svg) return;
    const c = t.group, a = new Map(this.config?.nodes.map((f) => [f.id, f]) ?? []), l = a.get(i.from_node), h = a.get(i.to_node);
    if (!l || !h) return;
    const d = [l.position, ...i.waypoints, h.position], u = xe(d), p = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(s) : Math.max(3, Math.floor(u / 15))
      )
    ), b = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== p) {
      if (t.pulseCircles) for (const f of t.pulseCircles) f.circle.remove();
      t.pulseCircles = [];
      for (let f = 0; f < p; f++) {
        const w = document.createElementNS(k, "circle");
        w.setAttribute("r", "0"), w.setAttribute("fill", r), w.setAttribute("opacity", "0"), n.glow && w.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), w.style.color = r;
        const _ = document.createElementNS(k, "animate");
        _.setAttribute("attributeName", "r"), _.setAttribute("values", `0;${ki};0`), _.setAttribute("repeatCount", "indefinite"), w.appendChild(_);
        const C = document.createElementNS(k, "animate");
        C.setAttribute("attributeName", "opacity"), C.setAttribute("values", "0;1;0"), C.setAttribute("repeatCount", "indefinite"), w.appendChild(C), c.appendChild(w), t.pulseCircles.push({ circle: w, animateRadius: _, animateOpacity: C });
      }
    }
    for (let f = 0; f < t.pulseCircles.length; f++) {
      const w = t.pulseCircles[f];
      if (!w) continue;
      const _ = (f + 0.5) / t.pulseCircles.length, C = gi(d, _), M = mt(C, b);
      w.circle.setAttribute("cx", M.x.toFixed(2)), w.circle.setAttribute("cy", M.y.toFixed(2)), w.circle.setAttribute("fill", r), w.circle.style.color = r;
      const rt = `${(o / 1e3).toFixed(3)}s`, at = `${(-o * f / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      w.animateRadius.setAttribute("dur", rt), w.animateRadius.setAttribute("begin", at), w.animateOpacity.setAttribute("dur", rt), w.animateOpacity.setAttribute("begin", at);
    }
  }
  makeParticle(t, i, n, s) {
    let o;
    if (i === "square") {
      const a = document.createElementNS(k, "rect");
      a.setAttribute("width", String(lt)), a.setAttribute("height", String(lt)), a.setAttribute("x", String(-lt / 2)), a.setAttribute("y", String(-lt / 2)), a.setAttribute("rx", "1.5"), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), o = a;
    } else {
      const a = document.createElementNS(k, "circle");
      a.setAttribute("r", String(xi)), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), o = a;
    }
    s && (o.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), o.style.color = n);
    const r = document.createElementNS(k, "animateMotion");
    r.setAttribute("repeatCount", "indefinite"), r.setAttribute("dur", "2s");
    const c = document.createElementNS(k, "mpath");
    return c.setAttributeNS(ct, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), r.appendChild(c), o.appendChild(r), t.group.appendChild(o), { shape: o, animateMotion: r };
  }
  profileFor(t) {
    return zt(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t);
    return t.color_positive ?? i.default_color_positive;
  }
}
const Si = `/* eslint-disable no-undef */
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
`, ee = "flowme-keyframes", Mt = "flowme-cycle", Ci = 5, Mi = 2;
let F = null, ie = !1;
function Pi() {
  if (document.getElementById(ee)) return;
  const e = document.createElement("style");
  e.id = ee, e.textContent = `@keyframes ${Mt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function Ei() {
  if (ie) return;
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
  ie = !0;
}
async function Oi() {
  if (F) return F;
  const e = CSS.paintWorklet;
  if (!e)
    return F = Promise.reject(new Error("paintWorklet not available")), F;
  const t = new Blob([Si], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return F = e.addModule(i).catch((n) => {
    throw F = null, n;
  }).finally(() => {
  }), F;
}
class ne {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = _e(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((s) => [s.id, s])), Pi(), Ei(), await Oi();
    const n = document.createElement("div");
    n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", t.appendChild(n), this.wrapper = n;
    for (const s of i.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = s.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Mt} 2s linear infinite`, o.style.opacity = "0", n.appendChild(o), this.flowDivs.set(s.id, { el: o });
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
      const l = [o.position, ...n.waypoints, r.position].map((h) => mt(h, t)).map((h) => `${h.x.toFixed(1)},${h.y.toFixed(1)}`).join(" ");
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
    const o = this.profileFor(n), r = n.threshold ?? o.visibility_threshold, c = Math.abs(i);
    if (!(c >= r)) {
      s.el.style.opacity = "0";
      return;
    }
    s.el.style.opacity = "1";
    const l = n.speed_multiplier ?? 1, h = Math.max(50, o.speed_curve(c) * l), d = i < 0 != (n.reverse === !0) ? -1 : 1, u = d > 0 ? n.color_positive ?? o.default_color_positive : n.color_negative ?? o.default_color_negative, p = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(i) : 3)
    ), b = o.wave_amplitude_curve ? o.wave_amplitude_curve(i) : 4, f = s.el.style;
    f.setProperty("--flowme-shape", o.shape), f.setProperty("--flowme-color", u), f.setProperty("--flowme-glow", o.glow ? "1" : "0"), f.setProperty("--flowme-count", String(p)), f.setProperty("--flowme-radius", String(Ci)), f.setProperty("--flowme-line", String(Mi)), f.setProperty("--flowme-amp", String(b)), f.setProperty("--flowme-direction", String(d)), f.animation = `${Mt} ${(h / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return zt(t.domain ?? this.config?.domain);
  }
}
function Ni() {
  const e = Ii();
  return e === "svg" ? new te() : e === "houdini" ? new ne() : Ti() ? new ne() : new te();
}
function Ti() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function Ii() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function Se(e) {
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
function Ui(e, t) {
  const i = new CustomEvent("hass-more-info", {
    detail: { entityId: t },
    bubbles: !0,
    composed: !0
  });
  e.dispatchEvent(i);
}
function Fi(e, t) {
  e?.callService && e.callService("homeassistant", "toggle", { entity_id: t });
}
function zi(e, t, i) {
  const n = Se(e);
  if (n === "none") return;
  const s = e.entity;
  s && (n === "toggle" ? Fi(t, s) : n === "more-info" && Ui(i.currentTarget, s));
}
function Ri(e) {
  const t = e.size?.width ?? 14, i = e.size?.height ?? 8;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function Li(e, t) {
  switch (e.type) {
    case "sensor":
      return Hi(e, t);
    case "switch":
      return ji(e, t);
    case "button":
      return Bi(e, t);
    case "camera":
      return Wi(e, t);
    case "custom":
      return qi(e, t);
  }
}
function Di(e, t) {
  const n = Se(e) !== "none", s = (o) => zi(e, t, o);
  return g`
    <div
      class=${`overlay overlay-${e.type} ${n ? "interactive" : ""}`}
      data-overlay-id=${e.id}
      style=${Ri(e)}
      @click=${n ? s : void 0}
      tabindex=${n ? "0" : "-1"}
      role=${n ? "button" : "group"}
    >
      ${Li(e, t)}
    </div>
  `;
}
function Hi(e, t) {
  const i = e.entity ? t?.states[e.entity] : void 0, n = i?.attributes?.unit_of_measurement ?? "", s = e.label ?? i?.attributes?.friendly_name ?? e.entity ?? "sensor", o = i?.state ?? "—", r = Ct(o), c = Number.isFinite(r) ? Vi(r) : o;
  return g`
    <div class="overlay-body sensor-body">
      <div class="overlay-label">${s}</div>
      <div class="overlay-value">
        <span class="value-number">${c}</span>
        ${n ? g`<span class="value-unit">${n}</span>` : m}
      </div>
    </div>
  `;
}
function ji(e, t) {
  const i = e.entity ? t?.states[e.entity] : void 0, n = i?.state === "on", s = e.label ?? i?.attributes?.friendly_name ?? e.entity ?? "switch";
  return g`
    <div class="overlay-body switch-body ${n ? "is-on" : "is-off"}">
      <div class="overlay-label">${s}</div>
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="switch-state">${n ? "on" : "off"}</div>
    </div>
  `;
}
function Bi(e, t) {
  const i = e.entity ? t?.states[e.entity] : void 0, n = e.label ?? i?.attributes?.friendly_name ?? e.entity ?? "button";
  return g`
    <div class="overlay-body button-body">
      <div class="overlay-label">${n}</div>
    </div>
  `;
}
function Wi(e, t) {
  const n = (e.entity ? t?.states[e.entity] : void 0)?.attributes?.entity_picture;
  return g`
    <div class="overlay-body camera-body">
      ${n ? g`<img class="camera-frame" src=${n} alt=${e.entity ?? ""} />` : g`<div class="camera-placeholder">${e.label ?? "camera"}</div>`}
      ${e.label ? g`<div class="camera-label">${e.label}</div>` : m}
    </div>
  `;
}
function qi(e, t) {
  return g`
    <flowme-custom-overlay
      .hass=${t}
      .cardConfig=${e.card_config}
    ></flowme-custom-overlay>
  `;
}
function Vi(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e3 || t >= 100 ? e.toFixed(0) : t >= 10 ? e.toFixed(1) : e.toFixed(2);
}
let kt = null, q = null;
async function Gi() {
  if (kt) return kt;
  if (q) return q;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (q = t().then((i) => (kt = i, q = null, i)).catch((i) => {
    throw q = null, i;
  }), q);
}
async function Ki(e) {
  const t = await Gi();
  return t ? t.createCardElement(e) : null;
}
var Ji = Object.defineProperty, Xi = Object.getOwnPropertyDescriptor, $t = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Xi(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Ji(t, i, s), s;
};
let J = class extends I {
  updated(e) {
    super.updated(e), e.has("cardConfig") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  render() {
    return this.errorMessage ? g`<div class="err" title=${this.errorMessage}>!</div>` : g`<div class="mount"></div>`;
  }
  rebuildChild() {
    const e = this.cardConfig, t = e ? JSON.stringify(e) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!e)) {
      try {
        hi(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, Ki(e).then((i) => {
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
J.styles = bt`
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
$t([
  P({ attribute: !1 })
], J.prototype, "hass", 2);
$t([
  P({ attribute: !1 })
], J.prototype, "cardConfig", 2);
$t([
  x()
], J.prototype, "errorMessage", 2);
J = $t([
  vt("flowme-custom-overlay")
], J);
const Yi = 100;
class Zi {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > Yi; ) this.undoStack.shift();
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
function S(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function se(e, t = 8) {
  return Math.round(e / t) * t;
}
function Qi(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `node_${i}`;
    if (!t.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function tn(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `flow_${i}`;
    if (!t.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function en(e, t, i) {
  const n = $(e);
  for (const s of n.nodes)
    s.id === t && (s.position = { x: S(i.x), y: S(i.y) });
  return n;
}
function nn(e, t, i) {
  const n = $(e), s = {
    id: Qi(e),
    position: { x: S(t.x), y: S(t.y) },
    label: i
  };
  return n.nodes.push(s), { config: n, node: s };
}
function sn(e, t) {
  const i = $(e);
  return i.nodes = i.nodes.filter((n) => n.id !== t), i.flows = i.flows.filter((n) => n.from_node !== t && n.to_node !== t), i;
}
function on(e, t, i, n) {
  const s = $(e);
  for (const o of s.flows)
    if (o.id === t) {
      if (i < 0 || i >= o.waypoints.length) return e;
      o.waypoints[i] = {
        x: S(n.x),
        y: S(n.y)
      };
    }
  return s;
}
function rn(e, t, i, n) {
  const s = $(e);
  for (const o of s.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, i));
    o.waypoints.splice(r, 0, {
      x: S(n.x),
      y: S(n.y)
    });
  }
  return s;
}
function an(e, t, i) {
  const n = $(e);
  for (const s of n.flows)
    if (s.id === t) {
      if (i < 0 || i >= s.waypoints.length) return e;
      s.waypoints.splice(i, 1);
    }
  return n;
}
function cn(e, t, i, n) {
  const s = $(e), o = {
    id: tn(e),
    from_node: t,
    to_node: i,
    entity: n,
    waypoints: []
  };
  return s.flows.push(o), { config: s, flow: o };
}
function ln(e, t) {
  const i = $(e);
  return i.flows = i.flows.filter((n) => n.id !== t), i;
}
function dn(e, t) {
  const i = $(e);
  return i.background.default = t, i;
}
function hn(e, t) {
  const i = $(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function un(e, t) {
  const i = $(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function oe(e, t, i) {
  var s;
  const n = $(e);
  return (s = n.background).weather_states ?? (s.weather_states = {}), n.background.weather_states[t] = i, n;
}
function pn(e, t) {
  const i = $(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function fn(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `overlay_${i}`;
    if (!t.has(n)) return n;
  }
  return `overlay_${Date.now()}`;
}
function gn(e, t) {
  const i = $(e), n = t.id ?? fn(e), s = {
    ...t,
    id: n,
    position: {
      x: S(t.position.x),
      y: S(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], s], { config: i, overlay: s };
}
function yn(e, t) {
  const i = $(e);
  return i.overlays = (i.overlays ?? []).filter((n) => n.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function mn(e, t, i) {
  const n = $(e);
  for (const s of n.overlays ?? [])
    s.id === t && (s.position = { x: S(i.x), y: S(i.y) });
  return n;
}
function re(e, t, i) {
  const n = $(e), s = Math.max(2, Math.min(100, i.width)), o = Math.max(2, Math.min(100, i.height));
  for (const r of n.overlays ?? [])
    r.id === t && (r.size = { width: s, height: o });
  return n;
}
function bn(e, t, i) {
  const n = $(e);
  for (const s of n.overlays ?? [])
    s.id === t && (s.type = i, i !== "custom" && delete s.card_config);
  return n;
}
function wn(e, t, i) {
  const n = $(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i && i.length ? s.entity = i : delete s.entity);
  return n;
}
function vn(e, t, i) {
  const n = $(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i && i.length ? s.label = i : delete s.label);
  return n;
}
function $n(e, t, i) {
  const n = $(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i ? s.tap_action = { action: i } : delete s.tap_action);
  return n;
}
function xn(e, t, i) {
  const n = $(e);
  for (const s of n.overlays ?? [])
    s.id === t && (i ? s.card_config = i : delete s.card_config);
  return n;
}
function _n(e, t, i) {
  if (t === i) return e;
  const n = $(e), s = n.background.weather_states;
  if (!s || !(t in s)) return e;
  const o = s[t];
  return o === void 0 ? e : (delete s[t], s[i] = o, n);
}
var An = Object.defineProperty, kn = Object.getOwnPropertyDescriptor, D = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? kn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && An(t, i, s), s;
};
let E = class extends I {
  constructor() {
    super(...arguments), this.canUndo = !1, this.canRedo = !1, this.previewMode = !1, this.suggestPathDisabled = !0, this.undoLabel = "", this.redoLabel = "";
  }
  render() {
    return g`
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
E.styles = bt`
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
D([
  P({ type: Boolean })
], E.prototype, "canUndo", 2);
D([
  P({ type: Boolean })
], E.prototype, "canRedo", 2);
D([
  P({ type: Boolean })
], E.prototype, "previewMode", 2);
D([
  P({ type: Boolean })
], E.prototype, "suggestPathDisabled", 2);
D([
  P({ type: String })
], E.prototype, "undoLabel", 2);
D([
  P({ type: String })
], E.prototype, "redoLabel", 2);
E = D([
  vt("flowme-editor-toolbar")
], E);
const Ce = 8, ae = 1, Pt = 255;
function Sn(e, t = Ce) {
  const i = Math.max(1, Math.floor(t)), n = Math.max(1, Math.ceil(e.width / i)), s = Math.max(1, Math.ceil(e.height / i)), o = new Uint16Array(n * s);
  for (let r = 0; r < s; r++) {
    const c = r * i, a = Math.min(e.height, c + i);
    for (let l = 0; l < n; l++) {
      const h = l * i, d = Math.min(e.width, h + i);
      let u = 0;
      for (let b = c; b < a; b++) {
        const f = b * e.width;
        for (let w = h; w < d; w++) {
          const _ = e.data[f + w] ?? 0;
          _ > u && (u = _);
        }
      }
      const p = Pt - u;
      o[r * n + l] = p < ae ? ae : p;
    }
  }
  return { cols: n, rows: s, cellSize: i, data: o };
}
function Cn(e, t, i) {
  return i * e.cols + t;
}
function Mn(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? Pt : e.data[Cn(e, t, i)] ?? Pt;
}
const Pn = 50;
class En {
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
function On(e, t, i) {
  const [n, s] = t, [o, r] = i;
  if (n < 0 || s < 0 || n >= e.cols || s >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (n === o && s === r) return [[n, s]];
  const c = e.cols * e.rows, a = new Float32Array(c);
  a.fill(1 / 0);
  const l = new Int16Array(c), h = new Int16Array(c);
  l.fill(-1), h.fill(-1);
  const d = new Uint8Array(c), u = new Uint8Array(c), p = s * e.cols + n;
  a[p] = 0;
  const b = new En();
  b.push({ col: n, row: s, f: ce(n, s, o, r) });
  const f = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; b.size > 0; ) {
    const w = b.pop(), { col: _, row: C } = w, M = C * e.cols + _;
    if (!u[M]) {
      if (u[M] = 1, _ === o && C === r)
        return Nn(e, l, h, i);
      for (const [rt, at, Rt] of f) {
        const j = _ + rt, B = C + at;
        if (j < 0 || B < 0 || j >= e.cols || B >= e.rows) continue;
        const W = B * e.cols + j;
        if (u[W]) continue;
        const Me = Mn(e, j, B), Pe = d[M] && d[M] !== Rt ? Pn : 0, xt = (a[M] ?? 1 / 0) + Me + Pe;
        if (xt < (a[W] ?? 1 / 0)) {
          a[W] = xt, l[W] = _, h[W] = C, d[W] = Rt;
          const Ee = xt + ce(j, B, o, r);
          b.push({ col: j, row: B, f: Ee });
        }
      }
    }
  }
  return null;
}
function ce(e, t, i, n) {
  return Math.abs(e - i) + Math.abs(t - n);
}
function Nn(e, t, i, n) {
  const s = [];
  let o = n[0], r = n[1];
  for (; o !== -1 && r !== -1; ) {
    s.push([o, r]);
    const c = r * e.cols + o, a = t[c] ?? -1, l = i[c] ?? -1;
    if (a === o && l === r || (o = a, r = l, o < 0 || r < 0)) break;
  }
  return s.reverse(), s[0]?.[0] === -1 && s.shift(), s;
}
const Tn = 480, In = 270, Un = 30;
function Fn(e, t, i = Tn, n = In) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const s = Math.min(i / e, n / t, 1);
  return {
    width: Math.max(1, Math.floor(e * s)),
    height: Math.max(1, Math.floor(t * s))
  };
}
function zn(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let s = 0, o = 0; s < e.length; s += 4, o++) {
    const r = e[s] ?? 0, c = e[s + 1] ?? 0, a = e[s + 2] ?? 0;
    n[o] = 0.2126 * r + 0.7152 * c + 0.0722 * a;
  }
  return n;
}
function Rn(e, t, i) {
  const n = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t;
    for (let c = 0; c < t; c++) {
      const a = e[r + Math.max(0, c - 1)] ?? 0, l = e[r + c] ?? 0, h = e[r + Math.min(t - 1, c + 1)] ?? 0;
      n[r + c] = a + 2 * l + h >> 2;
    }
  }
  const s = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t, c = Math.max(0, o - 1) * t, a = Math.min(i - 1, o + 1) * t;
    for (let l = 0; l < t; l++) {
      const h = n[c + l] ?? 0, d = n[r + l] ?? 0, u = n[a + l] ?? 0;
      s[r + l] = h + 2 * d + u >> 2;
    }
  }
  return s;
}
function Ln(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let s = 1; s < i - 1; s++) {
    const o = (s - 1) * t, r = s * t, c = (s + 1) * t;
    for (let a = 1; a < t - 1; a++) {
      const l = e[o + (a - 1)] ?? 0, h = e[o + a] ?? 0, d = e[o + (a + 1)] ?? 0, u = e[r + (a - 1)] ?? 0, p = e[r + (a + 1)] ?? 0, b = e[c + (a - 1)] ?? 0, f = e[c + a] ?? 0, w = e[c + (a + 1)] ?? 0, _ = -l - 2 * u - b + d + 2 * p + w, C = -l - 2 * h - d + b + 2 * f + w;
      let M = Math.sqrt(_ * _ + C * C);
      M < Un && (M = 0), M > 255 && (M = 255), n[r + a] = M;
    }
  }
  return { width: t, height: i, data: n };
}
function Dn(e, t, i) {
  const n = Fn(t, i), s = document.createElement("canvas");
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
function Hn(e, t, i) {
  const { width: n, height: s, rgba: o } = Dn(e, t, i), r = zn(o, n, s), c = Rn(r, n, s);
  return Ln(c, n, s);
}
function jn(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const n = e[i - 1], s = e[i], o = e[i + 1], r = s[0] - n[0], c = s[1] - n[1], a = o[0] - s[0], l = o[1] - s[1];
    r * l - c * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(c) === Math.sign(l) || t.push(s);
  }
  return t.push(e[e.length - 1]), t;
}
const ut = /* @__PURE__ */ new Map();
async function Bn(e, t = {}) {
  const i = performance.now(), n = t.cellSize ?? Ce, s = `${e.imageUrl}|${n}`, o = ut.has(s);
  let r = null;
  try {
    r = await Wn(s, e.imageUrl, n);
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
  const c = de(e.from, r), a = de(e.to, r), l = On(r, c, a);
  return !l || l.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  } : {
    waypoints: jn(l).slice(1, -1).map((p) => Gn(p, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  };
}
function Wn(e, t, i) {
  const n = ut.get(e);
  if (n) return n;
  const s = qn(t, i).catch((o) => {
    throw ut.delete(e), o;
  });
  return ut.set(e, s), s;
}
async function qn(e, t) {
  const i = await Vn(e);
  await le();
  const n = Hn(i, i.naturalWidth, i.naturalHeight);
  return await le(), Sn(n, t);
}
function Vn(e) {
  return new Promise((t, i) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => t(n), n.onerror = () => i(new Error(`Failed to load background image: ${e}`)), n.src = e;
  });
}
function le() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function de(e, t) {
  const i = he(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), n = he(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, n];
}
function Gn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function he(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
var Kn = Object.defineProperty, Jn = Object.getOwnPropertyDescriptor, A = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Jn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Kn(t, i, s), s;
};
let v = class extends I {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = we(), this.undoStack = new Zi((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, n = dn(i, t);
      this.pushPatch(i, n, "edit default background");
    }, this.onWeatherEntityChange = (e) => {
      if (!this.config) return;
      const t = e.target.value.trim(), i = this.config, n = hn(i, t || void 0);
      this.pushPatch(i, n, "edit weather entity");
    }, this.onTransitionChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = Number(t), n = this.config, s = un(n, Number.isFinite(i) ? i : void 0);
      this.pushPatch(n, s, "edit transition duration");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = pn(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = v.KNOWN_WEATHER_STATES.find((s) => !e.has(s)) ?? "custom", i = this.config, n = oe(i, t, "");
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
            `Overlay type? One of: ${et.join(", ")}`,
            "sensor"
          );
          if (!t) break;
          const i = t.trim().toLowerCase();
          if (!et.includes(i)) {
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
          const n = this.config, { config: s, node: o } = nn(n, i, "New node");
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
          const o = this.config, { config: r, overlay: c } = gn(o, s);
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
          const o = this.config, r = rn(o, i, n, s);
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
            ) ?? "sensor.placeholder_entity", s = this.config, { config: o, flow: r } = cn(s, this.pending.fromId, i, n);
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
      const s = this.config, o = an(s, i, n);
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
        this.dragShiftHeld && (a = Math.round(a), l = Math.round(l)), this.config = re(this.config, t.id, { width: a, height: l });
        return;
      }
      const i = this.pointerToPercent(e);
      if (!i) return;
      const n = this.dragShiftHeld ? { x: S(se(i.x)), y: S(se(i.y)) } : i;
      t.kind === "node" ? this.config = en(this.config, t.id, n) : t.kind === "overlay" ? this.config = mn(this.config, t.id, n) : t.kind === "waypoint" && (this.config = on(this.config, t.flowId, t.index, n));
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
      this.config = ht(e), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return g`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? g`<pre class="error">${this.errorMessage}</pre>` : m}
        </div>
      `;
    const t = `${1 / (Ae(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, i = this.config.background.default;
    return g`
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
        ${this.statusMessage ? g`<div class="status">${this.statusMessage}</div>` : m}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${ve(this.stageRef)}
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
        ${this.errorMessage ? g`<pre class="error">${this.errorMessage}</pre>` : m}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return m;
    const t = new Map(this.config.nodes.map((c) => [c.id, c])), i = t.get(e.from_node), n = t.get(e.to_node);
    if (!i || !n) return m;
    const s = [i.position, ...e.waypoints, n.position], o = e.id === this.selectedFlowId, r = [];
    for (let c = 0; c < s.length - 1; c++) {
      const a = s[c], l = s[c + 1];
      !a || !l || r.push(g`
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
    return g`<g>${r}</g>`;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, i) => g`
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
    return g`
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
        ${t ? g`<div
              class="overlay-resize"
              data-overlay-id=${e.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : m}
      </div>
    `;
  }
  renderHandle(e) {
    const t = e.id === this.selectedNodeId;
    return g`
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
        ${e.label ? g`<span class="handle-label">${e.label}</span>` : m}
      </div>
    `;
  }
  renderInspector() {
    if (!this.config) return m;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((t) => t.id === this.selectedNodeId);
      return e ? g`
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
      return e ? g`
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
    if (this.selectedOverlayId) {
      const e = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return e ? this.renderOverlayInspector(e) : m;
    }
    return m;
  }
  renderOverlayInspector(e) {
    const t = e.size ?? { width: 14, height: 8 }, i = e.tap_action?.action ?? "";
    return g`
      <div class="inspector overlay-inspector">
        <h4>Overlay: ${e.id}</h4>
        <label>
          Type
          <select @change=${(n) => this.onOverlayTypeChange(e.id, n)}>
            ${et.map(
      (n) => g`
                <option value=${n} ?selected=${n === e.type}>${n}</option>
              `
    )}
          </select>
        </label>
        ${e.type !== "custom" ? g`
              <label>
                Entity
                <input
                  type="text"
                  placeholder=${this.entityPlaceholderFor(e.type)}
                  .value=${e.entity ?? ""}
                  @change=${(n) => this.onOverlayEntityChange(e.id, n)}
                />
              </label>
            ` : m}
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
            ${St.map(
      (n) => g`<option value=${n} ?selected=${n === i}>${n}</option>`
    )}
          </select>
        </label>
        ${e.type === "custom" ? this.renderCustomConfigEditor(e) : m}
        <button class="danger" @click=${() => this.removeOverlay(e.id)}>Delete overlay</button>
      </div>
    `;
  }
  renderCustomConfigEditor(e) {
    const t = this.customConfigDraft || JSON.stringify(e.card_config ?? { type: "entity", entity: "" }, null, 2);
    return g`
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
      ${this.customConfigError ? g`<div class="custom-config-error">${this.customConfigError}</div>` : m}
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
    if (!this.config) return m;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {});
    return g`
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
            ${e.default ? g`<img class="weather-thumb" src=${e.default} alt="default background" />` : m}
          </label>
          <label>
            Weather entity (optional)
            <input
              type="text"
              .value=${e.weather_entity ?? ""}
              list="flowme-weather-entities"
              @change=${this.onWeatherEntityChange}
              placeholder="weather.home"
            />
          </label>
          <datalist id="flowme-weather-entities">
            ${this.weatherEntityOptions().map(
      (i) => g`<option value=${i}></option>`
    )}
          </datalist>
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
      ([i, n]) => g`
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
                    ${n ? g`<img class="weather-thumb" src=${n} alt=${i} />` : m}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(i)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${v.KNOWN_WEATHER_STATES.map(
      (i) => g`<option value=${i}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
        </div>
      </details>
    `;
  }
  weatherEntityOptions() {
    return this.hass ? Object.keys(this.hass.states).filter((e) => e.startsWith("weather.")).sort() : [];
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const n = this.config, s = _n(n, e, i);
    s !== n && this.pushPatch(n, s, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = oe(n, e, i);
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
      const n = await Bn({
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
    if (!this.suggestPreview || !this.config) return m;
    const e = this.config.flows.find((o) => o.id === this.suggestPreview.flowId);
    if (!e) return m;
    const t = this.config.nodes.find((o) => o.id === e.from_node), i = this.config.nodes.find((o) => o.id === e.to_node);
    if (!t || !i) return m;
    const s = [
      t.position,
      ...this.suggestPreview.waypoints,
      i.position
    ].map((o) => `${o.x.toFixed(2)},${o.y.toFixed(2)}`).join(" ");
    return g`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (o) => g`
          <div class="suggest-marker" style=${`left: ${o.x}%; top: ${o.y}%;`}></div>
        `
    )}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? g`
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
    const i = t.target.value, n = this.config, s = {
      ...n,
      nodes: n.nodes.map((o) => o.id === e ? { ...o, label: i || void 0 } : o)
    };
    this.pushPatch(n, s, `rename ${e}`);
  }
  onNodeEntityChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = {
      ...n,
      nodes: n.nodes.map(
        (o) => o.id === e ? { ...o, entity: i || void 0 } : o
      )
    };
    this.pushPatch(n, s, `edit entity of ${e}`);
  }
  onOverlayTypeChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = bn(n, e, i);
    this.customConfigDraft = "", this.pushPatch(n, s, `change overlay ${e} type`);
  }
  onOverlayEntityChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim(), n = this.config, s = wn(n, e, i || void 0);
    this.pushPatch(n, s, `edit overlay ${e} entity`);
  }
  onOverlayLabelChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = vn(n, e, i || void 0);
    this.pushPatch(n, s, `edit overlay ${e} label`);
  }
  onOverlaySizeChange(e, t, i) {
    if (!this.config) return;
    const n = (this.config.overlays ?? []).find((a) => a.id === e);
    if (!n) return;
    const s = n.size ?? { width: 14, height: 8 }, o = Number(i.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, c = re(r, e, { ...s, [t]: o });
    this.pushPatch(r, c, `resize overlay ${e}`);
  }
  onOverlayTapActionChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = $n(n, e, i || void 0);
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
      const s = xn(n, e, i), o = ht(s);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: n, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (s) {
      this.customConfigError = s instanceof Error ? s.message : String(s);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = yn(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = sn(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = ln(t, e);
    this.selectedFlowId = null, this.pushPatch(t, i, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const i = t.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return null;
    const n = S((e.clientX - i.left) / i.width * 100), s = S((e.clientY - i.top) / i.height * 100);
    return { x: n, y: s };
  }
  pushPatch(e, t, i) {
    try {
      const n = ht(t);
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
v.KNOWN_WEATHER_STATES = [
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
v.styles = bt`
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
A([
  P({ attribute: !1 })
], v.prototype, "hass", 2);
A([
  x()
], v.prototype, "config", 2);
A([
  x()
], v.prototype, "pending", 2);
A([
  x()
], v.prototype, "previewMode", 2);
A([
  x()
], v.prototype, "selectedNodeId", 2);
A([
  x()
], v.prototype, "selectedFlowId", 2);
A([
  x()
], v.prototype, "selectedOverlayId", 2);
A([
  x()
], v.prototype, "customConfigDraft", 2);
A([
  x()
], v.prototype, "customConfigError", 2);
A([
  x()
], v.prototype, "statusMessage", 2);
A([
  x()
], v.prototype, "errorMessage", 2);
A([
  x()
], v.prototype, "canUndo", 2);
A([
  x()
], v.prototype, "canRedo", 2);
A([
  x()
], v.prototype, "undoLabel", 2);
A([
  x()
], v.prototype, "redoLabel", 2);
A([
  x()
], v.prototype, "suggestPreview", 2);
A([
  x()
], v.prototype, "suggestBusy", 2);
v = A([
  vt("flowme-card-editor")
], v);
var Xn = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, H = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Yn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Xn(t, i, s), s;
};
const Zn = "0.5.0", ue = 2e3;
console.info(
  `%c flowme %c v${Zn} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
let O = class extends I {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = we(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "";
  }
  setConfig(e) {
    try {
      const t = ht(e);
      this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof Ut ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), super.disconnectedCallback();
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config && (this.teardownRenderer(), this.renderer = Ni(), this.rendererReadyFor = this.config, this.renderer.init(t, this.config)), e.has("hass") && this.renderer && this.hass)
      for (const i of this.config.flows) {
        const n = this.hass.states[i.entity], s = Ct(n?.state);
        this.renderer.updateFlow(i.id, s);
      }
    (e.has("config") || e.has("hass")) && this.syncWeatherBackground();
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
      return g`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e)
      return g`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    const i = `${1 / (Ae(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = e.background.transition_duration ?? ue;
    return g`
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
          <div class="renderer-mount" ${ve(this.rendererMount)}></div>
          ${e.nodes.map((s) => this.renderNodeHandle(s))}
          ${(e.overlays ?? []).map((s) => Di(s, this.hass))}
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
    const t = this.config.background.transition_duration ?? ue;
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, n = e.show_label !== !1 && !!e.label, s = zt(this.config?.domain), o = e.color ?? s.default_color_positive, r = e.size ?? 12, c = t ? `${s.describe(Ct(t.state))}${s.unit_label ? ` ${s.unit_label}` : ""}` : "";
    return g`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%;`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${n ? g`<span class="node-label">${e.label}</span>` : null}
        ${i ? g`<span class="node-value">${c}</span>` : null}
      </div>
    `;
  }
  teardownRenderer() {
    this.renderer && (this.renderer.destroy(), this.renderer = null), this.rendererReadyFor = void 0;
  }
};
O.styles = bt`
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
H([
  P({ attribute: !1 })
], O.prototype, "hass", 2);
H([
  x()
], O.prototype, "config", 2);
H([
  x()
], O.prototype, "errorMessage", 2);
H([
  x()
], O.prototype, "bgLayerA", 2);
H([
  x()
], O.prototype, "bgLayerB", 2);
H([
  x()
], O.prototype, "activeLayer", 2);
O = H([
  vt("flowme-card")
], O);
const Et = window;
Et.customCards = Et.customCards ?? [];
Et.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  O as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
