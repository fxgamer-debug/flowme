/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, ut = tt.ShadowRoot && (tt.ShadyCSS === void 0 || tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ft = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(t, s, n) {
    if (this._$cssResult$ = !0, n !== ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (ut && t === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (t = At.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && At.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ie = (e) => new Vt(typeof e == "string" ? e : e + "", void 0, ft), gt = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((n, i, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new Vt(s, e, ft);
}, oe = (e, t) => {
  if (ut) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), i = tt.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = s.cssText, e.appendChild(n);
  }
}, St = ut ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return ie(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: re, defineProperty: ae, getOwnPropertyDescriptor: le, getOwnPropertyNames: ce, getOwnPropertySymbols: de, getPrototypeOf: he } = Object, M = globalThis, kt = M.trustedTypes, pe = kt ? kt.emptyScript : "", ue = M.reactiveElementPolyfillSupport, W = (e, t) => e, et = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? pe : null;
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
} }, mt = (e, t) => !re(e, t), Ct = { attribute: !0, type: String, converter: et, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Ct) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, s);
      i !== void 0 && ae(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: i, set: o } = le(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: i, set(r) {
      const l = i?.call(this);
      o?.call(this, r), this.requestUpdate(t, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = he(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const s = this.properties, n = [...ce(s), ...de(s)];
      for (const i of n) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [n, i] of s) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, n] of this.elementProperties) {
      const i = this._$Eu(s, n);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) s.unshift(St(i));
    } else t !== void 0 && s.push(St(t));
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
    return oe(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : et).toAttribute(s, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : et;
      this._$Em = i;
      const l = r.fromAttribute(s, o.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, s, n, i = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (i === !1 && (o = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? mt)(o, s) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, s, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: n, reflect: i, wrapped: o }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, o] of n) {
        const { wrapped: r } = o, l = this[i];
        r !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, o, l);
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[W("elementProperties")] = /* @__PURE__ */ new Map(), L[W("finalized")] = /* @__PURE__ */ new Map(), ue?.({ ReactiveElement: L }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, Mt = (e) => e, st = V.trustedTypes, Pt = st ? st.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, qt = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Gt = "?" + C, fe = `<${Gt}>`, T = document, K = () => T.createComment(""), J = (e) => e === null || typeof e != "object" && typeof e != "function", bt = Array.isArray, ge = (e) => bt(e) || typeof e?.[Symbol.iterator] == "function", lt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Et = /-->/g, Nt = />/g, F = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ft = /'/g, Rt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, me = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), w = me(1), H = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Ut = /* @__PURE__ */ new WeakMap(), U = T.createTreeWalker(T, 129);
function Jt(e, t) {
  if (!bt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const be = (e, t) => {
  const s = e.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = j;
  for (let l = 0; l < s; l++) {
    const a = e[l];
    let h, d, c = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, d = r.exec(a), d !== null); ) f = r.lastIndex, r === j ? d[1] === "!--" ? r = Et : d[1] !== void 0 ? r = Nt : d[2] !== void 0 ? (Kt.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = F) : d[3] !== void 0 && (r = F) : r === F ? d[0] === ">" ? (r = i ?? j, c = -1) : d[1] === void 0 ? c = -2 : (c = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? F : d[3] === '"' ? Rt : Ft) : r === Rt || r === Ft ? r = F : r === Et || r === Nt ? r = j : (r = F, i = void 0);
    const p = r === F && e[l + 1].startsWith("/>") ? " " : "";
    o += r === j ? a + fe : c >= 0 ? (n.push(h), a.slice(0, c) + qt + a.slice(c) + C + p) : a + C + (c === -2 ? l : p);
  }
  return [Jt(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Z {
  constructor({ strings: t, _$litType$: s }, n) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, d] = be(t, s);
    if (this.el = Z.createElement(h, n), U.currentNode = this.el.content, s === 2 || s === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = U.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(qt)) {
          const f = d[r++], p = i.getAttribute(c).split(C), b = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: b[2], strings: p, ctor: b[1] === "." ? we : b[1] === "?" ? $e : b[1] === "@" ? ve : rt }), i.removeAttribute(c);
        } else c.startsWith(C) && (a.push({ type: 6, index: o }), i.removeAttribute(c));
        if (Kt.test(i.tagName)) {
          const c = i.textContent.split(C), f = c.length - 1;
          if (f > 0) {
            i.textContent = st ? st.emptyScript : "";
            for (let p = 0; p < f; p++) i.append(c[p], K()), U.nextNode(), a.push({ type: 2, index: ++o });
            i.append(c[f], K());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Gt) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(C, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += C.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const n = T.createElement("template");
    return n.innerHTML = t, n;
  }
}
function z(e, t, s = e, n) {
  if (t === H) return t;
  let i = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const o = J(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, s, n)), n !== void 0 ? (s._$Co ?? (s._$Co = []))[n] = i : s._$Cl = i), i !== void 0 && (t = z(e, i._$AS(e, t.values), i, n)), t;
}
class ye {
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
    const { el: { content: s }, parts: n } = this._$AD, i = (t?.creationScope ?? T).importNode(s, !0);
    U.currentNode = i;
    let o = U.nextNode(), r = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new X(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new _e(o, this, t)), this._$AV.push(h), a = n[++l];
      }
      r !== a?.index && (o = U.nextNode(), r++);
    }
    return U.currentNode = T, i;
  }
  p(t) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, s), s += n.strings.length - 2) : n._$AI(t[s])), s++;
  }
}
class X {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, n, i) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = z(this, t, s), J(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ge(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(T.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Z.createElement(Jt(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(s);
    else {
      const o = new ye(i, this), r = o.u(this.options);
      o.p(s), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = Ut.get(t.strings);
    return s === void 0 && Ut.set(t.strings, s = new Z(t)), s;
  }
  k(t) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, i = 0;
    for (const o of t) i === s.length ? s.push(n = new X(this.O(K()), this.O(K()), this, this.options)) : n = s[i], n._$AI(o), i++;
    i < s.length && (this._$AR(n && n._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const n = Mt(t).nextSibling;
      Mt(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, n, i, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, s = this, n, i) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = z(this, t, s, 0), r = !J(t) || t !== this._$AH && t !== H, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = z(this, l[n + a], s, a), h === H && (h = this._$AH[a]), r || (r = !J(h) || h !== this._$AH[a]), h === m ? t = m : t !== m && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class we extends rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class $e extends rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class ve extends rt {
  constructor(t, s, n, i, o) {
    super(t, s, n, i, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = z(this, t, s, 0) ?? m) === H) return;
    const n = this._$AH, i = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== m && (n === m || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _e {
  constructor(t, s, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const xe = V.litHtmlPolyfillSupport;
xe?.(Z, X), (V.litHtmlVersions ?? (V.litHtmlVersions = [])).push("3.3.2");
const Ae = (e, t, s) => {
  const n = s?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = s?.renderBefore ?? null;
    n._$litPart$ = i = new X(t.insertBefore(K(), o), o, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis;
let I = class extends L {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ae(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return H;
  }
};
I._$litElement$ = !0, I.finalized = !0, q.litElementHydrateSupport?.({ LitElement: I });
const Se = q.litElementPolyfillSupport;
Se?.({ LitElement: I });
(q.litElementVersions ?? (q.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = { attribute: !0, type: String, converter: et, reflect: !1, hasChanged: mt }, Ce = (e = ke, t, s) => {
  const { kind: n, metadata: i } = s;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(s.name, e), n === "accessor") {
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
function k(e) {
  return (t, s) => typeof s == "object" ? Ce(e, t, s) : ((n, i, o) => {
    const r = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(e) {
  return k({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pe = { CHILD: 2 }, Ee = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Ne {
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
const G = (e, t) => {
  const s = e._$AN;
  if (s === void 0) return !1;
  for (const n of s) n._$AO?.(t, !1), G(n, t);
  return !0;
}, nt = (e) => {
  let t, s;
  do {
    if ((t = e._$AM) === void 0) break;
    s = t._$AN, s.delete(e), e = t;
  } while (s?.size === 0);
}, Zt = (e) => {
  for (let t; t = e._$AM; e = t) {
    let s = t._$AN;
    if (s === void 0) t._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(e)) break;
    s.add(e), Ue(t);
  }
};
function Fe(e) {
  this._$AN !== void 0 ? (nt(this), this._$AM = e, Zt(this)) : this._$AM = e;
}
function Re(e, t = !1, s = 0) {
  const n = this._$AH, i = this._$AN;
  if (i !== void 0 && i.size !== 0) if (t) if (Array.isArray(n)) for (let o = s; o < n.length; o++) G(n[o], !1), nt(n[o]);
  else n != null && (G(n, !1), nt(n));
  else G(this, e);
}
const Ue = (e) => {
  e.type == Pe.CHILD && (e._$AP ?? (e._$AP = Re), e._$AQ ?? (e._$AQ = Fe));
};
class Ie extends Ne {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, s, n) {
    super._$AT(t, s, n), Zt(this), this.isConnected = t._$AU;
  }
  _$AO(t, s = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), s && (G(this, t), nt(this));
  }
  setValue(t) {
    if (Me(this._$Ct)) this._$Ct._$AI(t, this);
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
const Xt = () => new Te();
class Te {
}
const ct = /* @__PURE__ */ new WeakMap(), Yt = Ee(class extends Ie {
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
      let s = ct.get(t);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), ct.set(t, s)), s.get(this.G) !== void 0 && this.G.call(this.ht, void 0), s.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? ct.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), it = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
];
class wt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const It = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function g(e, t) {
  throw new wt(`${e}: ${t}`);
}
function Qt(e, t) {
  (!e || typeof e != "object") && g(t, "must be an object with x and y");
  const s = e, n = s.x, i = s.y;
  (typeof n != "number" || !Number.isFinite(n)) && g(`${t}.x`, "must be a finite number"), (typeof i != "number" || !Number.isFinite(i)) && g(`${t}.y`, "must be a finite number");
  const o = n, r = i;
  return (o < 0 || o > 100) && g(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && g(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function Tt(e, t) {
  (typeof e != "string" || !e.length) && g(t, "must be a non-empty string");
  const s = e;
  return It.some((i) => s.startsWith(i)) || g(
    t,
    `must start with one of ${It.join(", ")} (got "${s.slice(0, 40)}")`
  ), s;
}
function Oe(e, t, s) {
  const n = `nodes[${t}]`;
  (!e || typeof e != "object") && g(n, "must be an object");
  const i = e, o = i.id;
  (typeof o != "string" || !o.length) && g(`${n}.id`, "must be a non-empty string");
  const r = o;
  s.has(r) && g(`${n}.id`, `duplicate node id "${r}"`), s.add(r);
  const l = Qt(i.position, `${n}.position`), a = { id: r, position: l };
  return typeof i.entity == "string" && (a.entity = i.entity), typeof i.label == "string" && (a.label = i.label), typeof i.color == "string" && (a.color = i.color), typeof i.size == "number" && (a.size = i.size), typeof i.show_label == "boolean" && (a.show_label = i.show_label), typeof i.show_value == "boolean" && (a.show_value = i.show_value), a;
}
function De(e, t, s, n) {
  const i = `flows[${t}]`;
  (!e || typeof e != "object") && g(i, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && g(`${i}.id`, "must be a non-empty string");
  const l = r;
  s.has(l) && g(`${i}.id`, `duplicate flow id "${l}"`), s.add(l);
  const a = o.from_node;
  (typeof a != "string" || !n.has(a)) && g(`${i}.from_node`, `references unknown node "${String(a)}"`);
  const h = o.to_node;
  (typeof h != "string" || !n.has(h)) && g(`${i}.to_node`, `references unknown node "${String(h)}"`);
  const d = o.entity;
  (typeof d != "string" || !d.length) && g(`${i}.entity`, "must be a non-empty entity id");
  const c = o.waypoints;
  Array.isArray(c) || g(`${i}.waypoints`, "must be an array (may be empty)");
  const f = c.map(
    (b, u) => Qt(b, `${i}.waypoints[${u}]`)
  ), p = {
    id: l,
    from_node: a,
    to_node: h,
    entity: d,
    waypoints: f
  };
  if (typeof o.domain == "string" && (it.includes(o.domain) || g(`${i}.domain`, `must be one of ${it.join(", ")}`), p.domain = o.domain), typeof o.color_positive == "string" && (p.color_positive = o.color_positive), typeof o.color_negative == "string" && (p.color_negative = o.color_negative), typeof o.threshold == "number" && (p.threshold = o.threshold), typeof o.reverse == "boolean" && (p.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const b = o.speed_multiplier;
    (b < 0.1 || b > 5) && g(`${i}.speed_multiplier`, "must be between 0.1 and 5.0"), p.speed_multiplier = b;
  }
  return p;
}
function dt(e) {
  if (!e || typeof e != "object") throw new wt("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && g("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), it.includes(t.domain) || g("domain", `must be one of ${it.join(", ")}`);
  const s = t.background;
  (!s || typeof s != "object") && g("background", "must be an object");
  const n = s, o = { default: Tt(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && g("background.weather_entity", "must be a string entity id"), o.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && g("background.weather_states", "must be an object mapping state strings to image URLs");
    const p = Object.entries(n.weather_states), b = {};
    for (const [u, y] of p)
      b[u] = Tt(y, `background.weather_states.${u}`);
    o.weather_states = b;
  }
  n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && g("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = n.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || g("nodes", "must be an array");
  const l = /* @__PURE__ */ new Set(), a = r.map((p, b) => Oe(p, b, l));
  a.length === 0 && g("nodes", "at least one node is required");
  const h = t.flows;
  Array.isArray(h) || g("flows", "must be an array");
  const d = /* @__PURE__ */ new Set(), c = h.map(
    (p, b) => De(p, b, d, l)
  ), f = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: a,
    flows: c
  };
  return t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && g("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), f.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && g("fullscreen", "must be a boolean"), f.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && g("edit_mode_password", "must be a string"), f.edit_mode_password = t.edit_mode_password), t.overlays !== void 0 && (Array.isArray(t.overlays) || g("overlays", "must be an array"), f.overlays = t.overlays), f;
}
function O(e, t, s) {
  return e < t ? t : e > s ? s : e;
}
function ot(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function te(e) {
  let t = 0;
  for (let s = 1; s < e.length; s++) {
    const n = e[s - 1], i = e[s];
    if (!n || !i) continue;
    const o = i.x - n.x, r = i.y - n.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function Le(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const s = te(e), n = O(t, 0, 1) * s;
  let i = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], l = e[o], a = l.x - r.x, h = l.y - r.y, d = Math.sqrt(a * a + h * h);
    if (i + d >= n) {
      const c = d === 0 ? 0 : (n - i) / d;
      return { x: r.x + a * c, y: r.y + h * c };
    }
    i += d;
  }
  return { ...e[e.length - 1] };
}
function Ot(e, t) {
  if (e.length === 0) return "";
  const [s, ...n] = e;
  if (!s) return "";
  const i = ot(s, t), o = [`M ${i.x.toFixed(2)} ${i.y.toFixed(2)}`];
  for (const r of n) {
    const l = ot(r, t);
    o.push(`L ${l.x.toFixed(2)} ${l.y.toFixed(2)}`);
  }
  return o.join(" ");
}
function Dt(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const s = Number.parseFloat(t);
  return Number.isFinite(s) ? s : 0;
}
function ee(e, t) {
  let s = null, n = null;
  const i = (...o) => {
    n = o, s !== null && clearTimeout(s), s = setTimeout(() => {
      s = null, n && e(...n), n = null;
    }, t);
  };
  return i.cancel = () => {
    s !== null && (clearTimeout(s), s = null), n = null;
  }, i;
}
function se(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const s = Number.parseInt(t[1], 10), n = Number.parseInt(t[2], 10);
  if (!(!s || !n))
    return s / n;
}
const He = {
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
    return O(s, 400, 8e3);
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, ze = {
  domain: "water",
  default_color_positive: "#3B82F6",
  default_color_negative: "#3B82F6",
  shape: "wave",
  glow: !1,
  unit_label: "L/min",
  visibility_threshold: 0.5,
  speed_curve(e) {
    const t = Math.abs(e);
    return O(6e3 - t * 200, 800, 6e3);
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, Be = {
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
    return Math.round(O(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, je = {
  domain: "hvac",
  default_color_positive: "#A78BFA",
  default_color_negative: "#60A5FA",
  shape: "wave",
  glow: !1,
  unit_label: "CFM",
  visibility_threshold: 10,
  speed_curve(e) {
    const t = Math.abs(e);
    return O(5e3 - t * 10, 600, 5e3);
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return O(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, We = {
  domain: "gas",
  default_color_positive: "#FB923C",
  default_color_negative: "#FB923C",
  shape: "pulse",
  glow: !0,
  unit_label: "m³/h",
  visibility_threshold: 0.01,
  speed_curve(e) {
    const t = Math.abs(e);
    return O(1e4 - t * 5e4, 2e3, 1e4);
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, ne = {
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
}, Lt = {
  energy: He,
  water: ze,
  network: Be,
  hvac: je,
  gas: We,
  generic: ne
};
function $t(e) {
  return e && e in Lt ? Lt[e] : ne;
}
const $ = "http://www.w3.org/2000/svg", Y = "http://www.w3.org/1999/xlink", Ve = 3, qe = 5, Q = 9, Ge = 2, Ke = 8, Je = 14;
class Ht {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ee(() => this.flushUpdates(), 200);
  }
  async init(t, s) {
    this.container = t, this.config = s, this.flowsById = new Map(s.flows.map((i) => [i.id, i]));
    const n = document.createElementNS($, "svg");
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
    const s = document.createElementNS($, "defs");
    this.svg.appendChild(s);
    const n = new Map(this.config.nodes.map((i) => [i.id, i]));
    for (const i of this.config.flows) {
      const o = n.get(i.from_node), r = n.get(i.to_node);
      if (!o || !r) continue;
      const a = this.profileFor(i).shape, h = [o.position, ...i.waypoints, r.position], d = `flowme-path-${i.id}`, c = document.createElementNS($, "path");
      c.setAttribute("id", d), c.setAttribute("d", Ot(h, t)), c.setAttribute("fill", "none"), s.appendChild(c);
      const f = document.createElementNS($, "g");
      f.setAttribute("data-flow-id", i.id);
      const p = document.createElementNS($, "use");
      p.setAttributeNS(Y, "href", `#${d}`), p.setAttribute("href", `#${d}`), p.setAttribute("stroke", this.primaryColor(i)), p.setAttribute("stroke-opacity", "0.2"), p.setAttribute("stroke-width", String(Ge)), p.setAttribute("stroke-linecap", "round"), p.setAttribute("stroke-linejoin", "round"), p.setAttribute("fill", "none"), f.appendChild(p);
      const b = {
        group: f,
        path: c,
        pathId: d,
        shape: a,
        particles: []
      };
      if (a === "wave") {
        const u = document.createElementNS($, "use");
        u.setAttributeNS(Y, "href", `#${d}`), u.setAttribute("href", `#${d}`), u.setAttribute("stroke", this.primaryColor(i)), u.setAttribute("stroke-width", String(Ke)), u.setAttribute("stroke-opacity", "0.9"), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), u.setAttribute("stroke-dasharray", "14 10"), u.setAttribute("stroke-dashoffset", "0"), u.setAttribute("opacity", "0"), f.appendChild(u), b.waveStroke = u;
      } else a === "pulse" && (b.pulseCircles = []);
      this.svg.appendChild(f), this.flowNodes.set(i.id, b);
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const i = this.flowNodes.get(n.id);
      if (!i) continue;
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const l = [o.position, ...n.waypoints, r.position];
      i.path.setAttribute("d", Ot(l, t)), i.shape === "pulse" && this.applyFlow(n.id, this.latestValues.get(n.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, s] of this.latestValues)
      this.applyFlow(t, s);
  }
  applyFlow(t, s) {
    const n = this.flowsById.get(t), i = this.flowNodes.get(t);
    if (!n || !i) return;
    const o = this.profileFor(n), r = n.threshold ?? o.visibility_threshold, l = Math.abs(s);
    if (!(l >= r)) {
      this.setGroupVisible(i, !1);
      return;
    }
    this.setGroupVisible(i, !0);
    const h = n.speed_multiplier ?? 1, d = Math.max(50, o.speed_curve(l) * h), c = s < 0 != (n.reverse === !0) ? -1 : 1, f = c > 0 ? n.color_positive ?? o.default_color_positive : n.color_negative ?? o.default_color_negative;
    switch (i.shape) {
      case "wave":
        this.applyWave(i, o, d, f, c);
        break;
      case "pulse":
        this.applyPulse(i, n, o, s, d, f);
        break;
      case "square":
        this.applyParticles(i, n, o, s, d, f, c, "square");
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(i, n, o, s, d, f, c, "dot");
        break;
    }
  }
  setGroupVisible(t, s) {
    const n = s ? "1" : "0";
    for (const i of t.particles) i.shape.setAttribute("opacity", n);
    if (t.waveStroke && t.waveStroke.setAttribute("opacity", s ? "0.9" : "0"), t.pulseCircles)
      for (const i of t.pulseCircles) i.circle.setAttribute("opacity", n);
  }
  applyParticles(t, s, n, i, o, r, l, a) {
    const h = Math.max(
      1,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(i) : Ve
      )
    );
    if (t.particles.length !== h) {
      for (const c of t.particles) c.shape.remove();
      t.particles = [];
      for (let c = 0; c < h; c++)
        t.particles.push(this.makeParticle(t, a, r, n.glow));
    }
    const d = `${(o / 1e3).toFixed(3)}s`;
    for (let c = 0; c < t.particles.length; c++) {
      const f = t.particles[c];
      if (!f) continue;
      f.shape.setAttribute("fill", r), n.glow && (f.shape.style.color = r);
      const p = document.createElementNS($, "animateMotion");
      p.setAttribute("repeatCount", "indefinite"), p.setAttribute("dur", d), p.setAttribute("rotate", "auto"), p.setAttribute(
        "begin",
        `${(-o * c / (t.particles.length * 1e3)).toFixed(3)}s`
      ), l < 0 && (p.setAttribute("keyPoints", "1;0"), p.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS($, "mpath");
      b.setAttributeNS(Y, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), p.appendChild(b), f.animateMotion.replaceWith(p), f.animateMotion = p, f.shape.appendChild(p);
    }
  }
  applyWave(t, s, n, i, o) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", i);
    const l = r.querySelector("animate");
    l && l.remove();
    const a = document.createElementNS($, "animate");
    a.setAttribute("attributeName", "stroke-dashoffset"), a.setAttribute("from", o > 0 ? "0" : "-24"), a.setAttribute("to", o > 0 ? "-24" : "0"), a.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), a.setAttribute("repeatCount", "indefinite"), r.appendChild(a);
  }
  applyPulse(t, s, n, i, o, r) {
    if (!this.svg) return;
    const l = t.group, a = new Map(this.config?.nodes.map((u) => [u.id, u]) ?? []), h = a.get(s.from_node), d = a.get(s.to_node);
    if (!h || !d) return;
    const c = [h.position, ...s.waypoints, d.position], f = te(c), p = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(i) : Math.max(3, Math.floor(f / 15))
      )
    ), b = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== p) {
      if (t.pulseCircles) for (const u of t.pulseCircles) u.circle.remove();
      t.pulseCircles = [];
      for (let u = 0; u < p; u++) {
        const y = document.createElementNS($, "circle");
        y.setAttribute("r", "0"), y.setAttribute("fill", r), y.setAttribute("opacity", "0"), n.glow && y.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), y.style.color = r;
        const E = document.createElementNS($, "animate");
        E.setAttribute("attributeName", "r"), E.setAttribute("values", `0;${Je};0`), E.setAttribute("repeatCount", "indefinite"), y.appendChild(E);
        const N = document.createElementNS($, "animate");
        N.setAttribute("attributeName", "opacity"), N.setAttribute("values", "0;1;0"), N.setAttribute("repeatCount", "indefinite"), y.appendChild(N), l.appendChild(y), t.pulseCircles.push({ circle: y, animateRadius: E, animateOpacity: N });
      }
    }
    for (let u = 0; u < t.pulseCircles.length; u++) {
      const y = t.pulseCircles[u];
      if (!y) continue;
      const E = (u + 0.5) / t.pulseCircles.length, N = Le(c, E), vt = ot(N, b);
      y.circle.setAttribute("cx", vt.x.toFixed(2)), y.circle.setAttribute("cy", vt.y.toFixed(2)), y.circle.setAttribute("fill", r), y.circle.style.color = r;
      const _t = `${(o / 1e3).toFixed(3)}s`, xt = `${(-o * u / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      y.animateRadius.setAttribute("dur", _t), y.animateRadius.setAttribute("begin", xt), y.animateOpacity.setAttribute("dur", _t), y.animateOpacity.setAttribute("begin", xt);
    }
  }
  makeParticle(t, s, n, i) {
    let o;
    if (s === "square") {
      const a = document.createElementNS($, "rect");
      a.setAttribute("width", String(Q)), a.setAttribute("height", String(Q)), a.setAttribute("x", String(-Q / 2)), a.setAttribute("y", String(-Q / 2)), a.setAttribute("rx", "1.5"), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), o = a;
    } else {
      const a = document.createElementNS($, "circle");
      a.setAttribute("r", String(qe)), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), o = a;
    }
    i && (o.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), o.style.color = n);
    const r = document.createElementNS($, "animateMotion");
    r.setAttribute("repeatCount", "indefinite"), r.setAttribute("dur", "2s");
    const l = document.createElementNS($, "mpath");
    return l.setAttributeNS(Y, "href", `#${t.pathId}`), l.setAttribute("href", `#${t.pathId}`), r.appendChild(l), o.appendChild(r), t.group.appendChild(o), { shape: o, animateMotion: r };
  }
  profileFor(t) {
    return $t(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const s = this.profileFor(t);
    return t.color_positive ?? s.default_color_positive;
  }
}
const Ze = `/* eslint-disable no-undef */
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
`, zt = "flowme-keyframes", ht = "flowme-cycle", Xe = 5, Ye = 2;
let R = null, Bt = !1;
function Qe() {
  if (document.getElementById(zt)) return;
  const e = document.createElement("style");
  e.id = zt, e.textContent = `@keyframes ${ht} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function ts() {
  if (Bt) return;
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
  for (const [n, i, o] of s)
    try {
      t({ name: n, syntax: i, inherits: !1, initialValue: o });
    } catch {
    }
  Bt = !0;
}
async function es() {
  if (R) return R;
  const e = CSS.paintWorklet;
  if (!e)
    return R = Promise.reject(new Error("paintWorklet not available")), R;
  const t = new Blob([Ze], { type: "application/javascript" }), s = URL.createObjectURL(t);
  return R = e.addModule(s).catch((n) => {
    throw R = null, n;
  }).finally(() => {
  }), R;
}
class jt {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ee(() => this.flushUpdates(), 120);
  }
  async init(t, s) {
    this.container = t, this.config = s, this.flowsById = new Map(s.flows.map((i) => [i.id, i])), Qe(), ts(), await es();
    const n = document.createElement("div");
    n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", t.appendChild(n), this.wrapper = n;
    for (const i of s.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = i.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${ht} 2s linear infinite`, o.style.opacity = "0", n.appendChild(o), this.flowDivs.set(i.id, { el: o });
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
      const i = this.flowDivs.get(n.id);
      if (!i) continue;
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const h = [o.position, ...n.waypoints, r.position].map((d) => ot(d, t)).map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ");
      i.el.style.setProperty("--flowme-path", `"${h}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, s] of this.latestValues) this.applyFlow(t, s);
  }
  applyFlow(t, s) {
    const n = this.flowsById.get(t), i = this.flowDivs.get(t);
    if (!n || !i) return;
    const o = this.profileFor(n), r = n.threshold ?? o.visibility_threshold, l = Math.abs(s);
    if (!(l >= r)) {
      i.el.style.opacity = "0";
      return;
    }
    i.el.style.opacity = "1";
    const h = n.speed_multiplier ?? 1, d = Math.max(50, o.speed_curve(l) * h), c = s < 0 != (n.reverse === !0) ? -1 : 1, f = c > 0 ? n.color_positive ?? o.default_color_positive : n.color_negative ?? o.default_color_negative, p = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(s) : 3)
    ), b = o.wave_amplitude_curve ? o.wave_amplitude_curve(s) : 4, u = i.el.style;
    u.setProperty("--flowme-shape", o.shape), u.setProperty("--flowme-color", f), u.setProperty("--flowme-glow", o.glow ? "1" : "0"), u.setProperty("--flowme-count", String(p)), u.setProperty("--flowme-radius", String(Xe)), u.setProperty("--flowme-line", String(Ye)), u.setProperty("--flowme-amp", String(b)), u.setProperty("--flowme-direction", String(c)), u.animation = `${ht} ${(d / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return $t(t.domain ?? this.config?.domain);
  }
}
function ss() {
  const e = is();
  return e === "svg" ? new Ht() : e === "houdini" ? new jt() : ns() ? new jt() : new Ht();
}
function ns() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function is() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
const os = 100;
class rs {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > os; ) this.undoStack.shift();
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
function P(e) {
  return JSON.parse(JSON.stringify(e));
}
function A(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function Wt(e, t = 8) {
  return Math.round(e / t) * t;
}
function as(e) {
  const t = new Set(e.nodes.map((s) => s.id));
  for (let s = 1; s < 1e4; s++) {
    const n = `node_${s}`;
    if (!t.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function ls(e) {
  const t = new Set(e.flows.map((s) => s.id));
  for (let s = 1; s < 1e4; s++) {
    const n = `flow_${s}`;
    if (!t.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function cs(e, t, s) {
  const n = P(e);
  for (const i of n.nodes)
    i.id === t && (i.position = { x: A(s.x), y: A(s.y) });
  return n;
}
function ds(e, t, s) {
  const n = P(e), i = {
    id: as(e),
    position: { x: A(t.x), y: A(t.y) },
    label: s
  };
  return n.nodes.push(i), { config: n, node: i };
}
function hs(e, t) {
  const s = P(e);
  return s.nodes = s.nodes.filter((n) => n.id !== t), s.flows = s.flows.filter((n) => n.from_node !== t && n.to_node !== t), s;
}
function ps(e, t, s, n) {
  const i = P(e);
  for (const o of i.flows)
    if (o.id === t) {
      if (s < 0 || s >= o.waypoints.length) return e;
      o.waypoints[s] = {
        x: A(n.x),
        y: A(n.y)
      };
    }
  return i;
}
function us(e, t, s, n) {
  const i = P(e);
  for (const o of i.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, s));
    o.waypoints.splice(r, 0, {
      x: A(n.x),
      y: A(n.y)
    });
  }
  return i;
}
function fs(e, t, s) {
  const n = P(e);
  for (const i of n.flows)
    if (i.id === t) {
      if (s < 0 || s >= i.waypoints.length) return e;
      i.waypoints.splice(s, 1);
    }
  return n;
}
function gs(e, t, s, n) {
  const i = P(e), o = {
    id: ls(e),
    from_node: t,
    to_node: s,
    entity: n,
    waypoints: []
  };
  return i.flows.push(o), { config: i, flow: o };
}
function ms(e, t) {
  const s = P(e);
  return s.flows = s.flows.filter((n) => n.id !== t), s;
}
var bs = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, D = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? ys(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (i = (n ? r(t, s, i) : r(i)) || i);
  return n && i && bs(t, s, i), i;
};
let S = class extends I {
  constructor() {
    super(...arguments), this.canUndo = !1, this.canRedo = !1, this.previewMode = !1, this.suggestPathDisabled = !0, this.undoLabel = "", this.redoLabel = "";
  }
  render() {
    return w`
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
S.styles = gt`
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
  k({ type: Boolean })
], S.prototype, "canUndo", 2);
D([
  k({ type: Boolean })
], S.prototype, "canRedo", 2);
D([
  k({ type: Boolean })
], S.prototype, "previewMode", 2);
D([
  k({ type: Boolean })
], S.prototype, "suggestPathDisabled", 2);
D([
  k({ type: String })
], S.prototype, "undoLabel", 2);
D([
  k({ type: String })
], S.prototype, "redoLabel", 2);
S = D([
  yt("flowme-editor-toolbar")
], S);
var ws = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, x = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? $s(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (i = (n ? r(t, s, i) : r(i)) || i);
  return n && i && ws(t, s, i), i;
};
let v = class extends I {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.stageRef = Xt(), this.undoStack = new rs((e) => this.applyConfig(
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
          this.statusMessage = "Auto-routing arrives in v0.3.";
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
          const n = this.config, { config: i, node: o } = ds(n, s, "New node");
          this.pushPatch(n, i, `add node ${o.id}`), this.pending = null, this.statusMessage = `Added node ${o.id}.`;
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
          const i = this.pointerToPercent(e);
          if (!i) return;
          const o = this.config, r = us(o, s, n, i);
          this.pushPatch(o, r, `add waypoint to ${s}`);
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
            ) ?? "sensor.placeholder_entity", i = this.config, { config: o, flow: r } = gs(i, this.pending.fromId, s, n);
            this.pushPatch(i, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
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
      const i = this.config, o = fs(i, s, n);
      this.pushPatch(i, o, `delete waypoint ${n} of ${s}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = e.currentTarget, s = t.dataset.waypointIndex, n = t.dataset.flowId, i = t.dataset.nodeId;
      let o = null;
      i ? o = { kind: "node", id: i } : n && s !== void 0 && (o = { kind: "waypoint", flowId: n, index: Number(s) }), o && (e.preventDefault(), t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = o, this.dragStartConfig = this.config, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.pointerToPercent(e);
      if (!t) return;
      this.dragShiftHeld = e.shiftKey;
      const s = this.dragShiftHeld ? { x: A(Wt(t.x)), y: A(Wt(t.y)) } : t, n = this.dragTarget;
      n.kind === "node" ? this.config = cs(this.config, n.id, s) : this.config = ps(this.config, n.flowId, n.index, s);
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const s = this.dragStartConfig, n = this.config, i = this.dragTarget;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, !s || !n || !i || s === n) return;
      const o = i.kind === "node" ? `move node ${i.id}` : `move waypoint ${i.index} of ${i.flowId}`;
      this.pushPatch(s, n, o);
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
      this.config = dt(e), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return w`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? w`<pre class="error">${this.errorMessage}</pre>` : m}
        </div>
      `;
    const t = `${1 / (se(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, s = this.config.background.default;
    return w`
      <div class="wrap">
        <flowme-editor-toolbar
          .canUndo=${this.canUndo}
          .canRedo=${this.canRedo}
          .previewMode=${this.previewMode}
          .undoLabel=${this.undoLabel}
          .redoLabel=${this.redoLabel}
          .suggestPathDisabled=${!0}
          @toolbar-action=${this.onToolbarAction}
        ></flowme-editor-toolbar>
        ${this.statusMessage ? w`<div class="status">${this.statusMessage}</div>` : m}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${Yt(this.stageRef)}
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
        </div>
        ${this.renderInspector()}
        ${this.errorMessage ? w`<pre class="error">${this.errorMessage}</pre>` : m}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return m;
    const t = new Map(this.config.nodes.map((l) => [l.id, l])), s = t.get(e.from_node), n = t.get(e.to_node);
    if (!s || !n) return m;
    const i = [s.position, ...e.waypoints, n.position], o = e.id === this.selectedFlowId, r = [];
    for (let l = 0; l < i.length - 1; l++) {
      const a = i[l], h = i[l + 1];
      !a || !h || r.push(w`
        <line
          class=${`segment ${o ? "selected" : ""}`}
          x1=${a.x}
          y1=${a.y}
          x2=${h.x}
          y2=${h.y}
          data-flow-id=${e.id}
          data-segment-index=${l}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return w`<g>${r}</g>`;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, s) => w`
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
    return w`
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
        ${e.label ? w`<span class="handle-label">${e.label}</span>` : m}
      </div>
    `;
  }
  renderInspector() {
    if (!this.config) return m;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((t) => t.id === this.selectedNodeId);
      return e ? w`
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
      return e ? w`
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
  // -- inspector edits --
  onNodeLabelChange(e, t) {
    if (!this.config) return;
    const s = t.target.value, n = this.config, i = {
      ...n,
      nodes: n.nodes.map((o) => o.id === e ? { ...o, label: s || void 0 } : o)
    };
    this.pushPatch(n, i, `rename ${e}`);
  }
  onNodeEntityChange(e, t) {
    if (!this.config) return;
    const s = t.target.value, n = this.config, i = {
      ...n,
      nodes: n.nodes.map(
        (o) => o.id === e ? { ...o, entity: s || void 0 } : o
      )
    };
    this.pushPatch(n, i, `edit entity of ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, s = hs(t, e);
    this.selectedNodeId = null, this.pushPatch(t, s, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, s = ms(t, e);
    this.selectedFlowId = null, this.pushPatch(t, s, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const s = t.getBoundingClientRect();
    if (s.width === 0 || s.height === 0) return null;
    const n = A((e.clientX - s.left) / s.width * 100), i = A((e.clientY - s.top) / s.height * 100);
    return { x: n, y: i };
  }
  pushPatch(e, t, s) {
    try {
      const n = dt(t);
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
v.styles = gt`
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
  `;
x([
  k({ attribute: !1 })
], v.prototype, "hass", 2);
x([
  _()
], v.prototype, "config", 2);
x([
  _()
], v.prototype, "pending", 2);
x([
  _()
], v.prototype, "previewMode", 2);
x([
  _()
], v.prototype, "selectedNodeId", 2);
x([
  _()
], v.prototype, "selectedFlowId", 2);
x([
  _()
], v.prototype, "statusMessage", 2);
x([
  _()
], v.prototype, "errorMessage", 2);
x([
  _()
], v.prototype, "canUndo", 2);
x([
  _()
], v.prototype, "canRedo", 2);
x([
  _()
], v.prototype, "undoLabel", 2);
x([
  _()
], v.prototype, "redoLabel", 2);
v = x([
  yt("flowme-card-editor")
], v);
var vs = Object.defineProperty, _s = Object.getOwnPropertyDescriptor, at = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? _s(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (i = (n ? r(t, s, i) : r(i)) || i);
  return n && i && vs(t, s, i), i;
};
const xs = "0.1.0";
console.info(
  `%c flowme %c v${xs} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
let B = class extends I {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = Xt();
  }
  setConfig(e) {
    try {
      const t = dt(e);
      this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
    } catch (t) {
      const s = t instanceof wt ? t.message : String(t);
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
    if (t && this.rendererReadyFor !== this.config && (this.teardownRenderer(), this.renderer = ss(), this.rendererReadyFor = this.config, this.renderer.init(t, this.config)), e.has("hass") && this.renderer && this.hass)
      for (const s of this.config.flows) {
        const n = this.hass.states[s.entity], i = Dt(n?.state);
        this.renderer.updateFlow(s.id, i);
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
      return w`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e)
      return w`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    const s = `${1 / (se(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = this.currentBackgroundUrl();
    return w`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${s};`}
        >
          <div
            class="background"
            style=${n ? `background-image: url('${n}');` : ""}
          ></div>
          <div class="renderer-mount" ${Yt(this.rendererMount)}></div>
          ${e.nodes.map((i) => this.renderNodeHandle(i))}
          ${(e.overlays ?? []).map((i) => this.renderOverlayPlaceholder(i))}
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, s = e.show_value !== !1 && !!t, n = e.show_label !== !1 && !!e.label, i = $t(this.config?.domain), o = e.color ?? i.default_color_positive, r = e.size ?? 12, l = t ? `${i.describe(Dt(t.state))}${i.unit_label ? ` ${i.unit_label}` : ""}` : "";
    return w`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%;`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${n ? w`<span class="node-label">${e.label}</span>` : null}
        ${s ? w`<span class="node-value">${l}</span>` : null}
      </div>
    `;
  }
  // v0.5 replaces this with real overlay rendering; for now we render a
  // subtle marker so users see something at the configured position.
  renderOverlayPlaceholder(e) {
    return w`
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
B.styles = gt`
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
at([
  k({ attribute: !1 })
], B.prototype, "hass", 2);
at([
  _()
], B.prototype, "config", 2);
at([
  _()
], B.prototype, "errorMessage", 2);
B = at([
  yt("flowme-card")
], B);
const pt = window;
pt.customCards = pt.customCards ?? [];
pt.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  B as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
