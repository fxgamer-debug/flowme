/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, xt = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _t = Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let oe = class {
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
const xe = (e) => new oe(typeof e == "string" ? e : e + "", void 0, _t), At = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((n, i, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new oe(s, e, _t);
}, _e = (e, t) => {
  if (xt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), i = at.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = s.cssText, e.appendChild(n);
  }
}, Tt = xt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return xe(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ae, defineProperty: Se, getOwnPropertyDescriptor: ke, getOwnPropertyNames: Me, getOwnPropertySymbols: Ce, getPrototypeOf: Pe } = Object, I = globalThis, It = I.trustedTypes, Ee = It ? It.emptyScript : "", Ne = I.reactiveElementPolyfillSupport, X = (e, t) => e, ct = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ee : null;
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
} }, St = (e, t) => !Ae(e, t), Ut = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: St };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), I.litPropertyMetadata ?? (I.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let V = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Ut) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, s);
      i !== void 0 && Se(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: i, set: o } = ke(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const t = Pe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const s = this.properties, n = [...Me(s), ...Ce(s)];
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
      for (const i of n) s.unshift(Tt(i));
    } else t !== void 0 && s.push(Tt(t));
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
    return _e(t, this.constructor.elementStyles), t;
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
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : ct).toAttribute(s, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ct;
      this._$Em = i;
      const l = r.fromAttribute(s, o.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, s, n, i = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (i === !1 && (o = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? St)(o, s) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[X("elementProperties")] = /* @__PURE__ */ new Map(), V[X("finalized")] = /* @__PURE__ */ new Map(), Ne?.({ ReactiveElement: V }), (I.reactiveElementVersions ?? (I.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, Ft = (e) => e, dt = Z.trustedTypes, Rt = dt ? dt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, re = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, ae = "?" + T, Te = `<${ae}>`, L = document, Q = () => L.createComment(""), tt = (e) => e === null || typeof e != "object" && typeof e != "function", kt = Array.isArray, Ie = (e) => kt(e) || typeof e?.[Symbol.iterator] == "function", mt = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Lt = />/g, U = RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Dt = /'/g, zt = /"/g, le = /^(?:script|style|textarea|title)$/i, Ue = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), y = Ue(1), q = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), R = L.createTreeWalker(L, 129);
function ce(e, t) {
  if (!kt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rt !== void 0 ? Rt.createHTML(t) : t;
}
const Fe = (e, t) => {
  const s = e.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = K;
  for (let l = 0; l < s; l++) {
    const a = e[l];
    let c, h, d = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, h = r.exec(a), h !== null); ) p = r.lastIndex, r === K ? h[1] === "!--" ? r = Ot : h[1] !== void 0 ? r = Lt : h[2] !== void 0 ? (le.test(h[2]) && (i = RegExp("</" + h[2], "g")), r = U) : h[3] !== void 0 && (r = U) : r === U ? h[0] === ">" ? (r = i ?? K, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? U : h[3] === '"' ? zt : Dt) : r === zt || r === Dt ? r = U : r === Ot || r === Lt ? r = K : (r = U, i = void 0);
    const u = r === U && e[l + 1].startsWith("/>") ? " " : "";
    o += r === K ? a + Te : d >= 0 ? (n.push(c), a.slice(0, d) + re + a.slice(d) + T + u) : a + T + (d === -2 ? l : u);
  }
  return [ce(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class et {
  constructor({ strings: t, _$litType$: s }, n) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, h] = Fe(t, s);
    if (this.el = et.createElement(c, n), R.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = R.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(re)) {
          const p = h[r++], u = i.getAttribute(d).split(T), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: o, name: g[2], strings: u, ctor: g[1] === "." ? Oe : g[1] === "?" ? Le : g[1] === "@" ? De : ft }), i.removeAttribute(d);
        } else d.startsWith(T) && (a.push({ type: 6, index: o }), i.removeAttribute(d));
        if (le.test(i.tagName)) {
          const d = i.textContent.split(T), p = d.length - 1;
          if (p > 0) {
            i.textContent = dt ? dt.emptyScript : "";
            for (let u = 0; u < p; u++) i.append(d[u], Q()), R.nextNode(), a.push({ type: 2, index: ++o });
            i.append(d[p], Q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ae) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(T, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += T.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const n = L.createElement("template");
    return n.innerHTML = t, n;
  }
}
function G(e, t, s = e, n) {
  if (t === q) return t;
  let i = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const o = tt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, s, n)), n !== void 0 ? (s._$Co ?? (s._$Co = []))[n] = i : s._$Cl = i), i !== void 0 && (t = G(e, i._$AS(e, t.values), i, n)), t;
}
class Re {
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
    const { el: { content: s }, parts: n } = this._$AD, i = (t?.creationScope ?? L).importNode(s, !0);
    R.currentNode = i;
    let o = R.nextNode(), r = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new st(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new ze(o, this, t)), this._$AV.push(c), a = n[++l];
      }
      r !== a?.index && (o = R.nextNode(), r++);
    }
    return R.currentNode = L, i;
  }
  p(t) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, s), s += n.strings.length - 2) : n._$AI(t[s])), s++;
  }
}
class st {
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
    t = G(this, t, s), tt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== q && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ie(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(L.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = et.createElement(ce(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(s);
    else {
      const o = new Re(i, this), r = o.u(this.options);
      o.p(s), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = Bt.get(t.strings);
    return s === void 0 && Bt.set(t.strings, s = new et(t)), s;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, i = 0;
    for (const o of t) i === s.length ? s.push(n = new st(this.O(Q()), this.O(Q()), this, this.options)) : n = s[i], n._$AI(o), i++;
    i < s.length && (this._$AR(n && n._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const n = Ft(t).nextSibling;
      Ft(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ft {
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
    if (o === void 0) t = G(this, t, s, 0), r = !tt(t) || t !== this._$AH && t !== q, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = G(this, l[n + a], s, a), c === q && (c = this._$AH[a]), r || (r = !tt(c) || c !== this._$AH[a]), c === m ? t = m : t !== m && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Oe extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Le extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class De extends ft {
  constructor(t, s, n, i, o) {
    super(t, s, n, i, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = G(this, t, s, 0) ?? m) === q) return;
    const n = this._$AH, i = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== m && (n === m || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ze {
  constructor(t, s, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    G(this, t);
  }
}
const Be = Z.litHtmlPolyfillSupport;
Be?.(et, st), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.2");
const He = (e, t, s) => {
  const n = s?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = s?.renderBefore ?? null;
    n._$litPart$ = i = new st(t.insertBefore(Q(), o), o, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis;
let O = class extends V {
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
    return q;
  }
};
O._$litElement$ = !0, O.finalized = !0, J.litElementHydrateSupport?.({ LitElement: O });
const We = J.litElementPolyfillSupport;
We?.({ LitElement: O });
(J.litElementVersions ?? (J.litElementVersions = [])).push("4.2.2");
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
const je = { attribute: !0, type: String, converter: ct, reflect: !1, hasChanged: St }, Ve = (e = je, t, s) => {
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
function N(e) {
  return (t, s) => typeof s == "object" ? Ve(e, t, s) : ((n, i, o) => {
    const r = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(e) {
  return N({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = { CHILD: 2 }, Ke = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Xe {
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
const Y = (e, t) => {
  const s = e._$AN;
  if (s === void 0) return !1;
  for (const n of s) n._$AO?.(t, !1), Y(n, t);
  return !0;
}, ht = (e) => {
  let t, s;
  do {
    if ((t = e._$AM) === void 0) break;
    s = t._$AN, s.delete(e), e = t;
  } while (s?.size === 0);
}, de = (e) => {
  for (let t; t = e._$AM; e = t) {
    let s = t._$AN;
    if (s === void 0) t._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(e)) break;
    s.add(e), Ye(t);
  }
};
function Ze(e) {
  this._$AN !== void 0 ? (ht(this), this._$AM = e, de(this)) : this._$AM = e;
}
function Je(e, t = !1, s = 0) {
  const n = this._$AH, i = this._$AN;
  if (i !== void 0 && i.size !== 0) if (t) if (Array.isArray(n)) for (let o = s; o < n.length; o++) Y(n[o], !1), ht(n[o]);
  else n != null && (Y(n, !1), ht(n));
  else Y(this, e);
}
const Ye = (e) => {
  e.type == Ge.CHILD && (e._$AP ?? (e._$AP = Je), e._$AQ ?? (e._$AQ = Ze));
};
class Qe extends Xe {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, s, n) {
    super._$AT(t, s, n), de(this), this.isConnected = t._$AU;
  }
  _$AO(t, s = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), s && (Y(this, t), ht(this));
  }
  setValue(t) {
    if (qe(this._$Ct)) this._$Ct._$AI(t, this);
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
const he = () => new ts();
class ts {
}
const bt = /* @__PURE__ */ new WeakMap(), ue = Ke(class extends Qe {
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
      let s = bt.get(t);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), bt.set(t, s)), s.get(this.G) !== void 0 && this.G.call(this.ht, void 0), s.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? bt.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), ut = [
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
const Ht = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function b(e, t) {
  throw new Ct(`${e}: ${t}`);
}
function pe(e, t) {
  (!e || typeof e != "object") && b(t, "must be an object with x and y");
  const s = e, n = s.x, i = s.y;
  (typeof n != "number" || !Number.isFinite(n)) && b(`${t}.x`, "must be a finite number"), (typeof i != "number" || !Number.isFinite(i)) && b(`${t}.y`, "must be a finite number");
  const o = n, r = i;
  return (o < 0 || o > 100) && b(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && b(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function Wt(e, t) {
  (typeof e != "string" || !e.length) && b(t, "must be a non-empty string");
  const s = e;
  return Ht.some((i) => s.startsWith(i)) || b(
    t,
    `must start with one of ${Ht.join(", ")} (got "${s.slice(0, 40)}")`
  ), s;
}
function es(e, t, s) {
  const n = `nodes[${t}]`;
  (!e || typeof e != "object") && b(n, "must be an object");
  const i = e, o = i.id;
  (typeof o != "string" || !o.length) && b(`${n}.id`, "must be a non-empty string");
  const r = o;
  s.has(r) && b(`${n}.id`, `duplicate node id "${r}"`), s.add(r);
  const l = pe(i.position, `${n}.position`), a = { id: r, position: l };
  return typeof i.entity == "string" && (a.entity = i.entity), typeof i.label == "string" && (a.label = i.label), typeof i.color == "string" && (a.color = i.color), typeof i.size == "number" && (a.size = i.size), typeof i.show_label == "boolean" && (a.show_label = i.show_label), typeof i.show_value == "boolean" && (a.show_value = i.show_value), a;
}
function ss(e, t, s, n) {
  const i = `flows[${t}]`;
  (!e || typeof e != "object") && b(i, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && b(`${i}.id`, "must be a non-empty string");
  const l = r;
  s.has(l) && b(`${i}.id`, `duplicate flow id "${l}"`), s.add(l);
  const a = o.from_node;
  (typeof a != "string" || !n.has(a)) && b(`${i}.from_node`, `references unknown node "${String(a)}"`);
  const c = o.to_node;
  (typeof c != "string" || !n.has(c)) && b(`${i}.to_node`, `references unknown node "${String(c)}"`);
  const h = o.entity;
  (typeof h != "string" || !h.length) && b(`${i}.entity`, "must be a non-empty entity id");
  const d = o.waypoints;
  Array.isArray(d) || b(`${i}.waypoints`, "must be an array (may be empty)");
  const p = d.map(
    (g, f) => pe(g, `${i}.waypoints[${f}]`)
  ), u = {
    id: l,
    from_node: a,
    to_node: c,
    entity: h,
    waypoints: p
  };
  if (typeof o.domain == "string" && (ut.includes(o.domain) || b(`${i}.domain`, `must be one of ${ut.join(", ")}`), u.domain = o.domain), typeof o.color_positive == "string" && (u.color_positive = o.color_positive), typeof o.color_negative == "string" && (u.color_negative = o.color_negative), typeof o.threshold == "number" && (u.threshold = o.threshold), typeof o.reverse == "boolean" && (u.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const g = o.speed_multiplier;
    (g < 0.1 || g > 5) && b(`${i}.speed_multiplier`, "must be between 0.1 and 5.0"), u.speed_multiplier = g;
  }
  return u;
}
function wt(e) {
  if (!e || typeof e != "object") throw new Ct("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && b("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), ut.includes(t.domain) || b("domain", `must be one of ${ut.join(", ")}`);
  const s = t.background;
  (!s || typeof s != "object") && b("background", "must be an object");
  const n = s, o = { default: Wt(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && b("background.weather_entity", "must be a string entity id"), o.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && b("background.weather_states", "must be an object mapping state strings to image URLs");
    const u = Object.entries(n.weather_states), g = {};
    for (const [f, w] of u)
      g[f] = Wt(w, `background.weather_states.${f}`);
    o.weather_states = g;
  }
  n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && b("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = n.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || b("nodes", "must be an array");
  const l = /* @__PURE__ */ new Set(), a = r.map((u, g) => es(u, g, l));
  a.length === 0 && b("nodes", "at least one node is required");
  const c = t.flows;
  Array.isArray(c) || b("flows", "must be an array");
  const h = /* @__PURE__ */ new Set(), d = c.map(
    (u, g) => ss(u, g, h, l)
  ), p = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: a,
    flows: d
  };
  return t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && b("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), p.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && b("fullscreen", "must be a boolean"), p.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && b("edit_mode_password", "must be a string"), p.edit_mode_password = t.edit_mode_password), t.overlays !== void 0 && (Array.isArray(t.overlays) || b("overlays", "must be an array"), p.overlays = t.overlays), p;
}
function D(e, t, s) {
  return e < t ? t : e > s ? s : e;
}
function pt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function fe(e) {
  let t = 0;
  for (let s = 1; s < e.length; s++) {
    const n = e[s - 1], i = e[s];
    if (!n || !i) continue;
    const o = i.x - n.x, r = i.y - n.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function ns(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const s = fe(e), n = D(t, 0, 1) * s;
  let i = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], l = e[o], a = l.x - r.x, c = l.y - r.y, h = Math.sqrt(a * a + c * c);
    if (i + h >= n) {
      const d = h === 0 ? 0 : (n - i) / h;
      return { x: r.x + a * d, y: r.y + c * d };
    }
    i += h;
  }
  return { ...e[e.length - 1] };
}
function jt(e, t) {
  if (e.length === 0) return "";
  const [s, ...n] = e;
  if (!s) return "";
  const i = pt(s, t), o = [`M ${i.x.toFixed(2)} ${i.y.toFixed(2)}`];
  for (const r of n) {
    const l = pt(r, t);
    o.push(`L ${l.x.toFixed(2)} ${l.y.toFixed(2)}`);
  }
  return o.join(" ");
}
function Vt(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const s = Number.parseFloat(t);
  return Number.isFinite(s) ? s : 0;
}
function ge(e, t) {
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
function me(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const s = Number.parseInt(t[1], 10), n = Number.parseInt(t[2], 10);
  if (!(!s || !n))
    return s / n;
}
const is = {
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
}, os = {
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
}, rs = {
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
}, as = {
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
}, ls = {
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
}, be = {
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
  energy: is,
  water: os,
  network: rs,
  hvac: as,
  gas: ls,
  generic: be
};
function Pt(e) {
  return e && e in qt ? qt[e] : be;
}
const _ = "http://www.w3.org/2000/svg", ot = "http://www.w3.org/1999/xlink", cs = 3, ds = 5, rt = 9, hs = 2, us = 8, ps = 14;
class Gt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ge(() => this.flushUpdates(), 200);
  }
  async init(t, s) {
    this.container = t, this.config = s, this.flowsById = new Map(s.flows.map((i) => [i.id, i]));
    const n = document.createElementNS(_, "svg");
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
    const s = document.createElementNS(_, "defs");
    this.svg.appendChild(s);
    const n = new Map(this.config.nodes.map((i) => [i.id, i]));
    for (const i of this.config.flows) {
      const o = n.get(i.from_node), r = n.get(i.to_node);
      if (!o || !r) continue;
      const a = this.profileFor(i).shape, c = [o.position, ...i.waypoints, r.position], h = `flowme-path-${i.id}`, d = document.createElementNS(_, "path");
      d.setAttribute("id", h), d.setAttribute("d", jt(c, t)), d.setAttribute("fill", "none"), s.appendChild(d);
      const p = document.createElementNS(_, "g");
      p.setAttribute("data-flow-id", i.id);
      const u = document.createElementNS(_, "use");
      u.setAttributeNS(ot, "href", `#${h}`), u.setAttribute("href", `#${h}`), u.setAttribute("stroke", this.primaryColor(i)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(hs)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), p.appendChild(u);
      const g = {
        group: p,
        path: d,
        pathId: h,
        shape: a,
        particles: []
      };
      if (a === "wave") {
        const f = document.createElementNS(_, "use");
        f.setAttributeNS(ot, "href", `#${h}`), f.setAttribute("href", `#${h}`), f.setAttribute("stroke", this.primaryColor(i)), f.setAttribute("stroke-width", String(us)), f.setAttribute("stroke-opacity", "0.9"), f.setAttribute("stroke-linecap", "round"), f.setAttribute("stroke-linejoin", "round"), f.setAttribute("fill", "none"), f.setAttribute("stroke-dasharray", "14 10"), f.setAttribute("stroke-dashoffset", "0"), f.setAttribute("opacity", "0"), p.appendChild(f), g.waveStroke = f;
      } else a === "pulse" && (g.pulseCircles = []);
      this.svg.appendChild(p), this.flowNodes.set(i.id, g);
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
      i.path.setAttribute("d", jt(l, t)), i.shape === "pulse" && this.applyFlow(n.id, this.latestValues.get(n.id) ?? 0);
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
    const c = n.speed_multiplier ?? 1, h = Math.max(50, o.speed_curve(l) * c), d = s < 0 != (n.reverse === !0) ? -1 : 1, p = d > 0 ? n.color_positive ?? o.default_color_positive : n.color_negative ?? o.default_color_negative;
    switch (i.shape) {
      case "wave":
        this.applyWave(i, o, h, p, d);
        break;
      case "pulse":
        this.applyPulse(i, n, o, s, h, p);
        break;
      case "square":
        this.applyParticles(i, n, o, s, h, p, d, "square");
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(i, n, o, s, h, p, d, "dot");
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
    const c = Math.max(
      1,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(i) : cs
      )
    );
    if (t.particles.length !== c) {
      for (const d of t.particles) d.shape.remove();
      t.particles = [];
      for (let d = 0; d < c; d++)
        t.particles.push(this.makeParticle(t, a, r, n.glow));
    }
    const h = `${(o / 1e3).toFixed(3)}s`;
    for (let d = 0; d < t.particles.length; d++) {
      const p = t.particles[d];
      if (!p) continue;
      p.shape.setAttribute("fill", r), n.glow && (p.shape.style.color = r);
      const u = document.createElementNS(_, "animateMotion");
      u.setAttribute("repeatCount", "indefinite"), u.setAttribute("dur", h), u.setAttribute("rotate", "auto"), u.setAttribute(
        "begin",
        `${(-o * d / (t.particles.length * 1e3)).toFixed(3)}s`
      ), l < 0 && (u.setAttribute("keyPoints", "1;0"), u.setAttribute("keyTimes", "0;1"));
      const g = document.createElementNS(_, "mpath");
      g.setAttributeNS(ot, "href", `#${t.pathId}`), g.setAttribute("href", `#${t.pathId}`), u.appendChild(g), p.animateMotion.replaceWith(u), p.animateMotion = u, p.shape.appendChild(u);
    }
  }
  applyWave(t, s, n, i, o) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", i);
    const l = r.querySelector("animate");
    l && l.remove();
    const a = document.createElementNS(_, "animate");
    a.setAttribute("attributeName", "stroke-dashoffset"), a.setAttribute("from", o > 0 ? "0" : "-24"), a.setAttribute("to", o > 0 ? "-24" : "0"), a.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), a.setAttribute("repeatCount", "indefinite"), r.appendChild(a);
  }
  applyPulse(t, s, n, i, o, r) {
    if (!this.svg) return;
    const l = t.group, a = new Map(this.config?.nodes.map((f) => [f.id, f]) ?? []), c = a.get(s.from_node), h = a.get(s.to_node);
    if (!c || !h) return;
    const d = [c.position, ...s.waypoints, h.position], p = fe(d), u = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(i) : Math.max(3, Math.floor(p / 15))
      )
    ), g = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== u) {
      if (t.pulseCircles) for (const f of t.pulseCircles) f.circle.remove();
      t.pulseCircles = [];
      for (let f = 0; f < u; f++) {
        const w = document.createElementNS(_, "circle");
        w.setAttribute("r", "0"), w.setAttribute("fill", r), w.setAttribute("opacity", "0"), n.glow && w.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), w.style.color = r;
        const $ = document.createElementNS(_, "animate");
        $.setAttribute("attributeName", "r"), $.setAttribute("values", `0;${ps};0`), $.setAttribute("repeatCount", "indefinite"), w.appendChild($);
        const A = document.createElementNS(_, "animate");
        A.setAttribute("attributeName", "opacity"), A.setAttribute("values", "0;1;0"), A.setAttribute("repeatCount", "indefinite"), w.appendChild(A), l.appendChild(w), t.pulseCircles.push({ circle: w, animateRadius: $, animateOpacity: A });
      }
    }
    for (let f = 0; f < t.pulseCircles.length; f++) {
      const w = t.pulseCircles[f];
      if (!w) continue;
      const $ = (f + 0.5) / t.pulseCircles.length, A = ns(d, $), k = pt(A, g);
      w.circle.setAttribute("cx", k.x.toFixed(2)), w.circle.setAttribute("cy", k.y.toFixed(2)), w.circle.setAttribute("fill", r), w.circle.style.color = r;
      const nt = `${(o / 1e3).toFixed(3)}s`, it = `${(-o * f / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      w.animateRadius.setAttribute("dur", nt), w.animateRadius.setAttribute("begin", it), w.animateOpacity.setAttribute("dur", nt), w.animateOpacity.setAttribute("begin", it);
    }
  }
  makeParticle(t, s, n, i) {
    let o;
    if (s === "square") {
      const a = document.createElementNS(_, "rect");
      a.setAttribute("width", String(rt)), a.setAttribute("height", String(rt)), a.setAttribute("x", String(-rt / 2)), a.setAttribute("y", String(-rt / 2)), a.setAttribute("rx", "1.5"), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), o = a;
    } else {
      const a = document.createElementNS(_, "circle");
      a.setAttribute("r", String(ds)), a.setAttribute("fill", n), a.setAttribute("opacity", "0"), o = a;
    }
    i && (o.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), o.style.color = n);
    const r = document.createElementNS(_, "animateMotion");
    r.setAttribute("repeatCount", "indefinite"), r.setAttribute("dur", "2s");
    const l = document.createElementNS(_, "mpath");
    return l.setAttributeNS(ot, "href", `#${t.pathId}`), l.setAttribute("href", `#${t.pathId}`), r.appendChild(l), o.appendChild(r), t.group.appendChild(o), { shape: o, animateMotion: r };
  }
  profileFor(t) {
    return Pt(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const s = this.profileFor(t);
    return t.color_positive ?? s.default_color_positive;
  }
}
const fs = `/* eslint-disable no-undef */
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
`, Kt = "flowme-keyframes", yt = "flowme-cycle", gs = 5, ms = 2;
let F = null, Xt = !1;
function bs() {
  if (document.getElementById(Kt)) return;
  const e = document.createElement("style");
  e.id = Kt, e.textContent = `@keyframes ${yt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function ws() {
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
  for (const [n, i, o] of s)
    try {
      t({ name: n, syntax: i, inherits: !1, initialValue: o });
    } catch {
    }
  Xt = !0;
}
async function ys() {
  if (F) return F;
  const e = CSS.paintWorklet;
  if (!e)
    return F = Promise.reject(new Error("paintWorklet not available")), F;
  const t = new Blob([fs], { type: "application/javascript" }), s = URL.createObjectURL(t);
  return F = e.addModule(s).catch((n) => {
    throw F = null, n;
  }).finally(() => {
  }), F;
}
class Zt {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ge(() => this.flushUpdates(), 120);
  }
  async init(t, s) {
    this.container = t, this.config = s, this.flowsById = new Map(s.flows.map((i) => [i.id, i])), bs(), ws(), await ys();
    const n = document.createElement("div");
    n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", t.appendChild(n), this.wrapper = n;
    for (const i of s.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = i.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${yt} 2s linear infinite`, o.style.opacity = "0", n.appendChild(o), this.flowDivs.set(i.id, { el: o });
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
      const c = [o.position, ...n.waypoints, r.position].map((h) => pt(h, t)).map((h) => `${h.x.toFixed(1)},${h.y.toFixed(1)}`).join(" ");
      i.el.style.setProperty("--flowme-path", `"${c}"`);
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
    const c = n.speed_multiplier ?? 1, h = Math.max(50, o.speed_curve(l) * c), d = s < 0 != (n.reverse === !0) ? -1 : 1, p = d > 0 ? n.color_positive ?? o.default_color_positive : n.color_negative ?? o.default_color_negative, u = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(s) : 3)
    ), g = o.wave_amplitude_curve ? o.wave_amplitude_curve(s) : 4, f = i.el.style;
    f.setProperty("--flowme-shape", o.shape), f.setProperty("--flowme-color", p), f.setProperty("--flowme-glow", o.glow ? "1" : "0"), f.setProperty("--flowme-count", String(u)), f.setProperty("--flowme-radius", String(gs)), f.setProperty("--flowme-line", String(ms)), f.setProperty("--flowme-amp", String(g)), f.setProperty("--flowme-direction", String(d)), f.animation = `${yt} ${(h / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return Pt(t.domain ?? this.config?.domain);
  }
}
function vs() {
  const e = xs();
  return e === "svg" ? new Gt() : e === "houdini" ? new Zt() : $s() ? new Zt() : new Gt();
}
function $s() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function xs() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
const _s = 100;
class As {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > _s; ) this.undoStack.shift();
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
function M(e) {
  return JSON.parse(JSON.stringify(e));
}
function C(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function Jt(e, t = 8) {
  return Math.round(e / t) * t;
}
function Ss(e) {
  const t = new Set(e.nodes.map((s) => s.id));
  for (let s = 1; s < 1e4; s++) {
    const n = `node_${s}`;
    if (!t.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function ks(e) {
  const t = new Set(e.flows.map((s) => s.id));
  for (let s = 1; s < 1e4; s++) {
    const n = `flow_${s}`;
    if (!t.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function Ms(e, t, s) {
  const n = M(e);
  for (const i of n.nodes)
    i.id === t && (i.position = { x: C(s.x), y: C(s.y) });
  return n;
}
function Cs(e, t, s) {
  const n = M(e), i = {
    id: Ss(e),
    position: { x: C(t.x), y: C(t.y) },
    label: s
  };
  return n.nodes.push(i), { config: n, node: i };
}
function Ps(e, t) {
  const s = M(e);
  return s.nodes = s.nodes.filter((n) => n.id !== t), s.flows = s.flows.filter((n) => n.from_node !== t && n.to_node !== t), s;
}
function Es(e, t, s, n) {
  const i = M(e);
  for (const o of i.flows)
    if (o.id === t) {
      if (s < 0 || s >= o.waypoints.length) return e;
      o.waypoints[s] = {
        x: C(n.x),
        y: C(n.y)
      };
    }
  return i;
}
function Ns(e, t, s, n) {
  const i = M(e);
  for (const o of i.flows) {
    if (o.id !== t) continue;
    const r = Math.max(0, Math.min(o.waypoints.length, s));
    o.waypoints.splice(r, 0, {
      x: C(n.x),
      y: C(n.y)
    });
  }
  return i;
}
function Ts(e, t, s) {
  const n = M(e);
  for (const i of n.flows)
    if (i.id === t) {
      if (s < 0 || s >= i.waypoints.length) return e;
      i.waypoints.splice(s, 1);
    }
  return n;
}
function Is(e, t, s, n) {
  const i = M(e), o = {
    id: ks(e),
    from_node: t,
    to_node: s,
    entity: n,
    waypoints: []
  };
  return i.flows.push(o), { config: i, flow: o };
}
function Us(e, t) {
  const s = M(e);
  return s.flows = s.flows.filter((n) => n.id !== t), s;
}
function Fs(e, t) {
  const s = M(e);
  return s.background.default = t, s;
}
function Rs(e, t) {
  const s = M(e);
  return t && t.length ? s.background.weather_entity = t : delete s.background.weather_entity, s;
}
function Os(e, t) {
  const s = M(e);
  return t === void 0 || !Number.isFinite(t) ? delete s.background.transition_duration : s.background.transition_duration = Math.max(0, Math.floor(t)), s;
}
function Yt(e, t, s) {
  var i;
  const n = M(e);
  return (i = n.background).weather_states ?? (i.weather_states = {}), n.background.weather_states[t] = s, n;
}
function Ls(e, t) {
  const s = M(e);
  return s.background.weather_states && (delete s.background.weather_states[t], Object.keys(s.background.weather_states).length === 0 && delete s.background.weather_states), s;
}
function Ds(e, t, s) {
  if (t === s) return e;
  const n = M(e), i = n.background.weather_states;
  if (!i || !(t in i)) return e;
  const o = i[t];
  return o === void 0 ? e : (delete i[t], i[s] = o, n);
}
var zs = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, z = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Bs(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (i = (n ? r(t, s, i) : r(i)) || i);
  return n && i && zs(t, s, i), i;
};
let P = class extends O {
  constructor() {
    super(...arguments), this.canUndo = !1, this.canRedo = !1, this.previewMode = !1, this.suggestPathDisabled = !0, this.undoLabel = "", this.redoLabel = "";
  }
  render() {
    return y`
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
P.styles = At`
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
z([
  N({ type: Boolean })
], P.prototype, "canUndo", 2);
z([
  N({ type: Boolean })
], P.prototype, "canRedo", 2);
z([
  N({ type: Boolean })
], P.prototype, "previewMode", 2);
z([
  N({ type: Boolean })
], P.prototype, "suggestPathDisabled", 2);
z([
  N({ type: String })
], P.prototype, "undoLabel", 2);
z([
  N({ type: String })
], P.prototype, "redoLabel", 2);
P = z([
  Mt("flowme-editor-toolbar")
], P);
const we = 8, Qt = 1, vt = 255;
function Hs(e, t = we) {
  const s = Math.max(1, Math.floor(t)), n = Math.max(1, Math.ceil(e.width / s)), i = Math.max(1, Math.ceil(e.height / s)), o = new Uint16Array(n * i);
  for (let r = 0; r < i; r++) {
    const l = r * s, a = Math.min(e.height, l + s);
    for (let c = 0; c < n; c++) {
      const h = c * s, d = Math.min(e.width, h + s);
      let p = 0;
      for (let g = l; g < a; g++) {
        const f = g * e.width;
        for (let w = h; w < d; w++) {
          const $ = e.data[f + w] ?? 0;
          $ > p && (p = $);
        }
      }
      const u = vt - p;
      o[r * n + c] = u < Qt ? Qt : u;
    }
  }
  return { cols: n, rows: i, cellSize: s, data: o };
}
function Ws(e, t, s) {
  return s * e.cols + t;
}
function js(e, t, s) {
  return t < 0 || s < 0 || t >= e.cols || s >= e.rows ? vt : e.data[Ws(e, t, s)] ?? vt;
}
const Vs = 50;
class qs {
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
      const n = 2 * t + 1, i = 2 * t + 2;
      let o = t;
      if (n < s && (this.arr[n]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = n), i < s && (this.arr[i]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = i), o === t) return;
      [this.arr[o], this.arr[t]] = [this.arr[t], this.arr[o]], t = o;
    }
  }
}
function Gs(e, t, s) {
  const [n, i] = t, [o, r] = s;
  if (n < 0 || i < 0 || n >= e.cols || i >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (n === o && i === r) return [[n, i]];
  const l = e.cols * e.rows, a = new Float32Array(l);
  a.fill(1 / 0);
  const c = new Int16Array(l), h = new Int16Array(l);
  c.fill(-1), h.fill(-1);
  const d = new Uint8Array(l), p = new Uint8Array(l), u = i * e.cols + n;
  a[u] = 0;
  const g = new qs();
  g.push({ col: n, row: i, f: te(n, i, o, r) });
  const f = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const w = g.pop(), { col: $, row: A } = w, k = A * e.cols + $;
    if (!p[k]) {
      if (p[k] = 1, $ === o && A === r)
        return Ks(e, c, h, s);
      for (const [nt, it, Et] of f) {
        const H = $ + nt, W = A + it;
        if (H < 0 || W < 0 || H >= e.cols || W >= e.rows) continue;
        const j = W * e.cols + H;
        if (p[j]) continue;
        const ye = js(e, H, W), ve = d[k] && d[k] !== Et ? Vs : 0, gt = (a[k] ?? 1 / 0) + ye + ve;
        if (gt < (a[j] ?? 1 / 0)) {
          a[j] = gt, c[j] = $, h[j] = A, d[j] = Et;
          const $e = gt + te(H, W, o, r);
          g.push({ col: H, row: W, f: $e });
        }
      }
    }
  }
  return null;
}
function te(e, t, s, n) {
  return Math.abs(e - s) + Math.abs(t - n);
}
function Ks(e, t, s, n) {
  const i = [];
  let o = n[0], r = n[1];
  for (; o !== -1 && r !== -1; ) {
    i.push([o, r]);
    const l = r * e.cols + o, a = t[l] ?? -1, c = s[l] ?? -1;
    if (a === o && c === r || (o = a, r = c, o < 0 || r < 0)) break;
  }
  return i.reverse(), i[0]?.[0] === -1 && i.shift(), i;
}
const Xs = 480, Zs = 270, Js = 30;
function Ys(e, t, s = Xs, n = Zs) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const i = Math.min(s / e, n / t, 1);
  return {
    width: Math.max(1, Math.floor(e * i)),
    height: Math.max(1, Math.floor(t * i))
  };
}
function Qs(e, t, s) {
  const n = new Uint8ClampedArray(t * s);
  for (let i = 0, o = 0; i < e.length; i += 4, o++) {
    const r = e[i] ?? 0, l = e[i + 1] ?? 0, a = e[i + 2] ?? 0;
    n[o] = 0.2126 * r + 0.7152 * l + 0.0722 * a;
  }
  return n;
}
function tn(e, t, s) {
  const n = new Uint8ClampedArray(e.length);
  for (let o = 0; o < s; o++) {
    const r = o * t;
    for (let l = 0; l < t; l++) {
      const a = e[r + Math.max(0, l - 1)] ?? 0, c = e[r + l] ?? 0, h = e[r + Math.min(t - 1, l + 1)] ?? 0;
      n[r + l] = a + 2 * c + h >> 2;
    }
  }
  const i = new Uint8ClampedArray(e.length);
  for (let o = 0; o < s; o++) {
    const r = o * t, l = Math.max(0, o - 1) * t, a = Math.min(s - 1, o + 1) * t;
    for (let c = 0; c < t; c++) {
      const h = n[l + c] ?? 0, d = n[r + c] ?? 0, p = n[a + c] ?? 0;
      i[r + c] = h + 2 * d + p >> 2;
    }
  }
  return i;
}
function en(e, t, s) {
  const n = new Uint8ClampedArray(t * s);
  for (let i = 1; i < s - 1; i++) {
    const o = (i - 1) * t, r = i * t, l = (i + 1) * t;
    for (let a = 1; a < t - 1; a++) {
      const c = e[o + (a - 1)] ?? 0, h = e[o + a] ?? 0, d = e[o + (a + 1)] ?? 0, p = e[r + (a - 1)] ?? 0, u = e[r + (a + 1)] ?? 0, g = e[l + (a - 1)] ?? 0, f = e[l + a] ?? 0, w = e[l + (a + 1)] ?? 0, $ = -c - 2 * p - g + d + 2 * u + w, A = -c - 2 * h - d + g + 2 * f + w;
      let k = Math.sqrt($ * $ + A * A);
      k < Js && (k = 0), k > 255 && (k = 255), n[r + a] = k;
    }
  }
  return { width: t, height: s, data: n };
}
function sn(e, t, s) {
  const n = Ys(t, s), i = document.createElement("canvas");
  i.width = n.width, i.height = n.height;
  const o = i.getContext("2d", { willReadFrequently: !0 });
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
function nn(e, t, s) {
  const { width: n, height: i, rgba: o } = sn(e, t, s), r = Qs(o, n, i), l = tn(r, n, i);
  return en(l, n, i);
}
function on(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let s = 1; s < e.length - 1; s++) {
    const n = e[s - 1], i = e[s], o = e[s + 1], r = i[0] - n[0], l = i[1] - n[1], a = o[0] - i[0], c = o[1] - i[1];
    r * c - l * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(l) === Math.sign(c) || t.push(i);
  }
  return t.push(e[e.length - 1]), t;
}
const lt = /* @__PURE__ */ new Map();
async function rn(e, t = {}) {
  const s = performance.now(), n = t.cellSize ?? we, i = `${e.imageUrl}|${n}`, o = lt.has(i);
  let r = null;
  try {
    r = await an(i, e.imageUrl, n);
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
  const l = se(e.from, r), a = se(e.to, r), c = Gs(r, l, a);
  return !c || c.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - s
  } : {
    waypoints: on(c).slice(1, -1).map((u) => dn(u, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - s
  };
}
function an(e, t, s) {
  const n = lt.get(e);
  if (n) return n;
  const i = ln(t, s).catch((o) => {
    throw lt.delete(e), o;
  });
  return lt.set(e, i), i;
}
async function ln(e, t) {
  const s = await cn(e);
  await ee();
  const n = nn(s, s.naturalWidth, s.naturalHeight);
  return await ee(), Hs(n, t);
}
function cn(e) {
  return new Promise((t, s) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => t(n), n.onerror = () => s(new Error(`Failed to load background image: ${e}`)), n.src = e;
  });
}
function ee() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function se(e, t) {
  const s = ne(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), n = ne(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [s, n];
}
function dn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function ne(e, t, s) {
  return e < t ? t : e > s ? s : e;
}
var hn = Object.defineProperty, un = Object.getOwnPropertyDescriptor, S = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? un(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (i = (n ? r(t, s, i) : r(i)) || i);
  return n && i && hn(t, s, i), i;
};
let v = class extends O {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = he(), this.undoStack = new As((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, s = this.config, n = Fs(s, t);
      this.pushPatch(s, n, "edit default background");
    }, this.onWeatherEntityChange = (e) => {
      if (!this.config) return;
      const t = e.target.value.trim(), s = this.config, n = Rs(s, t || void 0);
      this.pushPatch(s, n, "edit weather entity");
    }, this.onTransitionChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, s = Number(t), n = this.config, i = Os(n, Number.isFinite(s) ? s : void 0);
      this.pushPatch(n, i, "edit transition duration");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, s = Ls(t, e);
      this.pushPatch(t, s, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = v.KNOWN_WEATHER_STATES.find((i) => !e.has(i)) ?? "custom", s = this.config, n = Yt(s, t, "");
      this.pushPatch(s, n, `add weather state ${t}`);
    }, this.onToolbarAction = (e) => {
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
          const n = this.config, { config: i, node: o } = Cs(n, s, "New node");
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
          const o = this.config, r = Ns(o, s, n, i);
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
            ) ?? "sensor.placeholder_entity", i = this.config, { config: o, flow: r } = Is(i, this.pending.fromId, s, n);
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
      const i = this.config, o = Ts(i, s, n);
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
      const s = this.dragShiftHeld ? { x: C(Jt(t.x)), y: C(Jt(t.y)) } : t, n = this.dragTarget;
      n.kind === "node" ? this.config = Ms(this.config, n.id, s) : this.config = Es(this.config, n.flowId, n.index, s);
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
      this.config = wt(e), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return y`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : m}
        </div>
      `;
    const t = `${1 / (me(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, s = this.config.background.default;
    return y`
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
        ${this.statusMessage ? y`<div class="status">${this.statusMessage}</div>` : m}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${ue(this.stageRef)}
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
        ${this.renderWeatherPanel()}
        ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : m}
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
      const a = i[l], c = i[l + 1];
      !a || !c || r.push(y`
        <line
          class=${`segment ${o ? "selected" : ""}`}
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
    return y`<g>${r}</g>`;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, s) => y`
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
    return y`
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
        ${e.label ? y`<span class="handle-label">${e.label}</span>` : m}
      </div>
    `;
  }
  renderInspector() {
    if (!this.config) return m;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((t) => t.id === this.selectedNodeId);
      return e ? y`
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
      return e ? y`
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
  renderWeatherPanel() {
    if (!this.config) return m;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {});
    return y`
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
            ${e.default ? y`<img class="weather-thumb" src=${e.default} alt="default background" />` : m}
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
      (s) => y`<option value=${s}></option>`
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
      ([s, n]) => y`
                <div class="weather-row" data-key=${s}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${s}
                    @change=${(i) => this.onWeatherStateKeyChange(s, i)}
                  />
                  <input
                    type="text"
                    .value=${n}
                    @change=${(i) => this.onWeatherStateUrlChange(s, i)}
                    placeholder="/local/flowme/rainy.jpg"
                  />
                  <div class="weather-row-end">
                    ${n ? y`<img class="weather-thumb" src=${n} alt=${s} />` : m}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(s)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${v.KNOWN_WEATHER_STATES.map(
      (s) => y`<option value=${s}></option>`
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
    const s = t.target.value.trim();
    if (!s || s === e) return;
    const n = this.config, i = Ds(n, e, s);
    i !== n && this.pushPatch(n, i, `rename weather state ${e}→${s}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const s = t.target.value, n = this.config, i = Yt(n, e, s);
    this.pushPatch(n, i, `edit weather image ${e}`);
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
      const n = await rn({
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
        (i) => i.id === e ? { ...i, waypoints: t.map((o) => ({ x: o.x, y: o.y })) } : i
      )
    };
    this.suggestPreview = null, this.statusMessage = "Applied suggested waypoints.", this.pushPatch(s, n, `auto-route ${e}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return m;
    const e = this.config.flows.find((o) => o.id === this.suggestPreview.flowId);
    if (!e) return m;
    const t = this.config.nodes.find((o) => o.id === e.from_node), s = this.config.nodes.find((o) => o.id === e.to_node);
    if (!t || !s) return m;
    const i = [
      t.position,
      ...this.suggestPreview.waypoints,
      s.position
    ].map((o) => `${o.x.toFixed(2)},${o.y.toFixed(2)}`).join(" ");
    return y`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${i} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (o) => y`
          <div class="suggest-marker" style=${`left: ${o.x}%; top: ${o.y}%;`}></div>
        `
    )}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? y`
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
    const t = this.config, s = Ps(t, e);
    this.selectedNodeId = null, this.pushPatch(t, s, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, s = Us(t, e);
    this.selectedFlowId = null, this.pushPatch(t, s, `delete flow ${e}`);
  }
  // -- utilities --
  pointerToPercent(e) {
    const t = this.stageRef.value;
    if (!t) return null;
    const s = t.getBoundingClientRect();
    if (s.width === 0 || s.height === 0) return null;
    const n = C((e.clientX - s.left) / s.width * 100), i = C((e.clientY - s.top) / s.height * 100);
    return { x: n, y: i };
  }
  pushPatch(e, t, s) {
    try {
      const n = wt(t);
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
v.styles = At`
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
S([
  N({ attribute: !1 })
], v.prototype, "hass", 2);
S([
  x()
], v.prototype, "config", 2);
S([
  x()
], v.prototype, "pending", 2);
S([
  x()
], v.prototype, "previewMode", 2);
S([
  x()
], v.prototype, "selectedNodeId", 2);
S([
  x()
], v.prototype, "selectedFlowId", 2);
S([
  x()
], v.prototype, "statusMessage", 2);
S([
  x()
], v.prototype, "errorMessage", 2);
S([
  x()
], v.prototype, "canUndo", 2);
S([
  x()
], v.prototype, "canRedo", 2);
S([
  x()
], v.prototype, "undoLabel", 2);
S([
  x()
], v.prototype, "redoLabel", 2);
S([
  x()
], v.prototype, "suggestPreview", 2);
S([
  x()
], v.prototype, "suggestBusy", 2);
v = S([
  Mt("flowme-card-editor")
], v);
var pn = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, B = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? fn(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (i = (n ? r(t, s, i) : r(i)) || i);
  return n && i && pn(t, s, i), i;
};
const gn = "0.4.0", ie = 2e3;
console.info(
  `%c flowme %c v${gn} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
let E = class extends O {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = he(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "";
  }
  setConfig(e) {
    try {
      const t = wt(e);
      this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const s = t.background.default;
      this.bgLayerA = s, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = s;
    } catch (t) {
      const s = t instanceof Ct ? t.message : String(t);
      this.config = void 0, this.errorMessage = s, this.teardownRenderer();
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
    if (t && this.rendererReadyFor !== this.config && (this.teardownRenderer(), this.renderer = vs(), this.rendererReadyFor = this.config, this.renderer.init(t, this.config)), e.has("hass") && this.renderer && this.hass)
      for (const s of this.config.flows) {
        const n = this.hass.states[s.entity], i = Vt(n?.state);
        this.renderer.updateFlow(s.id, i);
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
      return y`
        <ha-card>
          <div class="error">
            <strong>flowme: invalid configuration</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e)
      return y`<ha-card><div class="placeholder">flowme loading…</div></ha-card>`;
    const s = `${1 / (me(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = e.background.transition_duration ?? ie;
    return y`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${s};`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, n)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, n)}
          ></div>
          <div class="renderer-mount" ${ue(this.rendererMount)}></div>
          ${e.nodes.map((i) => this.renderNodeHandle(i))}
          ${(e.overlays ?? []).map((i) => this.renderOverlayPlaceholder(i))}
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
        const s = e.weather_states[t.state];
        if (s) return s;
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
    const t = this.config.background.transition_duration ?? ie;
    this.preload(e).then(() => {
      if (!this.config || this.resolveTargetBackground() !== e) return;
      this.transitionTimer !== null && window.clearTimeout(this.transitionTimer);
      const s = this.activeLayer === "A" ? "B" : "A";
      s === "A" ? this.bgLayerA = e : this.bgLayerB = e, requestAnimationFrame(() => {
        this.activeLayer = s, this.lastAppliedBgUrl = e, this.transitionTimer = window.setTimeout(() => {
          this.activeLayer === "A" ? this.bgLayerB = "" : this.bgLayerA = "", this.transitionTimer = null;
        }, t + 50);
      });
    });
  }
  preload(e) {
    if (!e) return Promise.resolve();
    const t = this.preloadCache.get(e);
    return t?.complete && t.naturalWidth > 0 ? Promise.resolve() : new Promise((s) => {
      const n = new Image();
      n.decoding = "async", n.onload = () => {
        this.preloadCache.set(e, n), s();
      }, n.onerror = () => s(), n.src = e, this.preloadCache.set(e, n);
    });
  }
  renderNodeHandle(e) {
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, s = e.show_value !== !1 && !!t, n = e.show_label !== !1 && !!e.label, i = Pt(this.config?.domain), o = e.color ?? i.default_color_positive, r = e.size ?? 12, l = t ? `${i.describe(Vt(t.state))}${i.unit_label ? ` ${i.unit_label}` : ""}` : "";
    return y`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%;`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${n ? y`<span class="node-label">${e.label}</span>` : null}
        ${s ? y`<span class="node-value">${l}</span>` : null}
      </div>
    `;
  }
  // v0.5 replaces this with real overlay rendering; for now we render a
  // subtle marker so users see something at the configured position.
  renderOverlayPlaceholder(e) {
    return y`
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
E.styles = At`
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
B([
  N({ attribute: !1 })
], E.prototype, "hass", 2);
B([
  x()
], E.prototype, "config", 2);
B([
  x()
], E.prototype, "errorMessage", 2);
B([
  x()
], E.prototype, "bgLayerA", 2);
B([
  x()
], E.prototype, "bgLayerB", 2);
B([
  x()
], E.prototype, "activeLayer", 2);
E = B([
  Mt("flowme-card")
], E);
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
  E as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
