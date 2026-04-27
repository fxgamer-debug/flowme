/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = globalThis, Zt = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qt = Symbol(), ae = /* @__PURE__ */ new WeakMap();
let je = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Qt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Zt && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = ae.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ae.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const si = (e) => new je(typeof e == "string" ? e : e + "", void 0, Qt), Et = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new je(i, e, Qt);
}, ni = (e, t) => {
  if (Zt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = _t.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, le = Zt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return si(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oi, defineProperty: ri, getOwnPropertyDescriptor: ai, getOwnPropertyNames: li, getOwnPropertySymbols: ci, getPrototypeOf: di } = Object, H = globalThis, ce = H.trustedTypes, pi = ce ? ce.emptyScript : "", ui = H.reactiveElementPolyfillSupport, ut = (e, t) => e, Ct = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? pi : null;
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
} }, te = (e, t) => !oi(e, t), de = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: te };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let nt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = de) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && ri(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = ai(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties"))) return;
    const t = di(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const i = this.properties, s = [...li(i), ...ci(i)];
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
      for (const n of s) i.unshift(le(n));
    } else t !== void 0 && i.push(le(t));
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
    return ni(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Ct).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Ct;
      this._$Em = n;
      const a = r.fromAttribute(i, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? te)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
nt.elementStyles = [], nt.shadowRootOptions = { mode: "open" }, nt[ut("elementProperties")] = /* @__PURE__ */ new Map(), nt[ut("finalized")] = /* @__PURE__ */ new Map(), ui?.({ ReactiveElement: nt }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis, pe = (e) => e, Mt = ht.trustedTypes, ue = Mt ? Mt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, We = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, Ve = "?" + B, hi = `<${Ve}>`, K = document, mt = () => K.createComment(""), bt = (e) => e === null || typeof e != "object" && typeof e != "function", ee = Array.isArray, fi = (e) => ee(e) || typeof e?.[Symbol.iterator] == "function", Dt = `[ 	
\f\r]`, ct = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, fe = />/g, V = RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, me = /"/g, Ge = /^(?:script|style|textarea|title)$/i, gi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), m = gi(1), ot = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), q = K.createTreeWalker(K, 129);
function qe(e, t) {
  if (!ee(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(t) : t;
}
const mi = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ct;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, c, p = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, c = r.exec(l), c !== null); ) u = r.lastIndex, r === ct ? c[1] === "!--" ? r = he : c[1] !== void 0 ? r = fe : c[2] !== void 0 ? (Ge.test(c[2]) && (n = RegExp("</" + c[2], "g")), r = V) : c[3] !== void 0 && (r = V) : r === V ? c[0] === ">" ? (r = n ?? ct, p = -1) : c[1] === void 0 ? p = -2 : (p = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? V : c[3] === '"' ? me : ge) : r === me || r === ge ? r = V : r === he || r === fe ? r = ct : (r = V, n = void 0);
    const h = r === V && e[a + 1].startsWith("/>") ? " " : "";
    o += r === ct ? l + hi : p >= 0 ? (s.push(d), l.slice(0, p) + We + l.slice(p) + B + h) : l + B + (p === -2 ? a : h);
  }
  return [qe(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class yt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, c] = mi(t, i);
    if (this.el = yt.createElement(d, s), q.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = q.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(We)) {
          const u = c[r++], h = n.getAttribute(p).split(B), f = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: f[2], strings: h, ctor: f[1] === "." ? yi : f[1] === "?" ? vi : f[1] === "@" ? wi : It }), n.removeAttribute(p);
        } else p.startsWith(B) && (l.push({ type: 6, index: o }), n.removeAttribute(p));
        if (Ge.test(n.tagName)) {
          const p = n.textContent.split(B), u = p.length - 1;
          if (u > 0) {
            n.textContent = Mt ? Mt.emptyScript : "";
            for (let h = 0; h < u; h++) n.append(p[h], mt()), q.nextNode(), l.push({ type: 2, index: ++o });
            n.append(p[u], mt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ve) l.push({ type: 2, index: o });
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
function rt(e, t, i = e, s) {
  if (t === ot) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = bt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = rt(e, n._$AS(e, t.values), n, s)), t;
}
class bi {
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
    q.currentNode = n;
    let o = q.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new vt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new xi(o, this, t)), this._$AV.push(d), l = s[++a];
      }
      r !== l?.index && (o = q.nextNode(), r++);
    }
    return q.currentNode = K, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class vt {
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
    t = rt(this, t, i), bt(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : fi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(K.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = yt.createElement(qe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new bi(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = be.get(t.strings);
    return i === void 0 && be.set(t.strings, i = new yt(t)), i;
  }
  k(t) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new vt(this.O(mt()), this.O(mt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = pe(t).nextSibling;
      pe(t).remove(), t = s;
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
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = rt(this, t, i, 0), r = !bt(t) || t !== this._$AH && t !== ot, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = rt(this, a[s + l], i, l), d === ot && (d = this._$AH[l]), r || (r = !bt(d) || d !== this._$AH[l]), d === w ? t = w : t !== w && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class yi extends It {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class vi extends It {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class wi extends It {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = rt(this, t, i, 0) ?? w) === ot) return;
    const s = this._$AH, n = t === w && s !== w || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== w && (s === w || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xi {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    rt(this, t);
  }
}
const $i = ht.litHtmlPolyfillSupport;
$i?.(yt, vt), (ht.litHtmlVersions ?? (ht.litHtmlVersions = [])).push("3.3.2");
const _i = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new vt(t.insertBefore(mt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis;
let j = class extends nt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _i(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ot;
  }
};
j._$litElement$ = !0, j.finalized = !0, ft.litElementHydrateSupport?.({ LitElement: j });
const ki = ft.litElementPolyfillSupport;
ki?.({ LitElement: j });
(ft.litElementVersions ?? (ft.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Si = { attribute: !0, type: String, converter: Ct, reflect: !1, hasChanged: te }, Ai = (e = Si, t, i) => {
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
function T(e) {
  return (t, i) => typeof i == "object" ? Ai(e, t, i) : ((s, n, o) => {
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
  return T({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ci = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mi = { CHILD: 2 }, Pi = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Fi {
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
const gt = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const s of i) s._$AO?.(t, !1), gt(s, t);
  return !0;
}, Pt = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, Ke = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), Ii(t);
  }
};
function Ni(e) {
  this._$AN !== void 0 ? (Pt(this), this._$AM = e, Ke(this)) : this._$AM = e;
}
function Ei(e, t = !1, i = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(s)) for (let o = i; o < s.length; o++) gt(s[o], !1), Pt(s[o]);
  else s != null && (gt(s, !1), Pt(s));
  else gt(this, e);
}
const Ii = (e) => {
  e.type == Mi.CHILD && (e._$AP ?? (e._$AP = Ei), e._$AQ ?? (e._$AQ = Ni));
};
class Oi extends Fi {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, s) {
    super._$AT(t, i, s), Ke(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (gt(this, t), Pt(this));
  }
  setValue(t) {
    if (Ci(this._$Ct)) this._$Ct._$AI(t, this);
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
const Ye = () => new zi();
class zi {
}
const Rt = /* @__PURE__ */ new WeakMap(), Xe = Pi(class extends Oi {
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
      let i = Rt.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Rt.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
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
}), Ft = [
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
], Gt = ["circle", "square", "arrow", "teardrop", "diamond"], qt = ["auto", "forward", "reverse", "both"], ye = ["even", "random", "clustered"], Ti = ["javascript:", "vbscript:", "data:", "file:"];
function Je(e, t = "card_config") {
  const i = [], s = /* @__PURE__ */ new WeakSet(), n = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const a = o.trim().toLowerCase();
        for (const l of Ti)
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
function Di(e, t = "card_config") {
  const i = Je(e, t);
  if (i.length === 0) return;
  const s = i[0];
  throw new Error(
    `Unsafe URL scheme '${s.scheme}' in ${s.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class ie extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const ve = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function b(e, t) {
  throw new ie(`${e}: ${t}`);
}
function se(e, t) {
  (!e || typeof e != "object") && b(t, "must be an object with x and y");
  const i = e, s = i.x, n = i.y;
  (typeof s != "number" || !Number.isFinite(s)) && b(`${t}.x`, "must be a finite number"), (typeof n != "number" || !Number.isFinite(n)) && b(`${t}.y`, "must be a finite number");
  const o = s, r = n;
  return (o < 0 || o > 100) && b(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && b(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function we(e, t) {
  (typeof e != "string" || !e.length) && b(t, "must be a non-empty string");
  const i = e;
  return ve.some((n) => i.startsWith(n)) || b(
    t,
    `must start with one of ${ve.join(", ")} (got "${i.slice(0, 40)}")`
  ), i;
}
function Ri(e, t, i) {
  const s = `nodes[${t}]`;
  (!e || typeof e != "object") && b(s, "must be an object");
  const n = e, o = n.id;
  (typeof o != "string" || !o.length) && b(`${s}.id`, "must be a non-empty string");
  const r = o;
  i.has(r) && b(`${s}.id`, `duplicate node id "${r}"`), i.add(r);
  const a = se(n.position, `${s}.position`), l = { id: r, position: a };
  return typeof n.entity == "string" && (l.entity = n.entity), typeof n.label == "string" && (l.label = n.label), typeof n.color == "string" && (l.color = n.color), typeof n.size == "number" && (l.size = n.size), typeof n.show_label == "boolean" && (l.show_label = n.show_label), typeof n.show_value == "boolean" && (l.show_value = n.show_value), n.opacity !== void 0 && (l.opacity = ne(n.opacity, `${s}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && b(`${s}.visible`, "must be a boolean"), l.visible = n.visible), l;
}
function Ui(e, t, i, s) {
  const n = `flows[${t}]`;
  (!e || typeof e != "object") && b(n, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && b(`${n}.id`, "must be a non-empty string");
  const a = r;
  i.has(a) && b(`${n}.id`, `duplicate flow id "${a}"`), i.add(a);
  const l = o.from_node;
  (typeof l != "string" || !s.has(l)) && b(`${n}.from_node`, `references unknown node "${String(l)}"`);
  const d = o.to_node;
  (typeof d != "string" || !s.has(d)) && b(`${n}.to_node`, `references unknown node "${String(d)}"`);
  const c = o.entity;
  (typeof c != "string" || !c.length) && b(`${n}.entity`, "must be a non-empty entity id");
  const p = o.waypoints;
  let u = [];
  p !== void 0 && (Array.isArray(p) || b(`${n}.waypoints`, "must be an array (may be empty or omitted)"), u = p.map(
    (f, g) => se(f, `${n}.waypoints[${g}]`)
  ));
  const h = {
    id: a,
    from_node: l,
    to_node: d,
    entity: c,
    waypoints: u
  };
  if (typeof o.domain == "string" && (Ft.includes(o.domain) || b(`${n}.domain`, `must be one of ${Ft.join(", ")}`), h.domain = o.domain), typeof o.color == "string" && (h.color = o.color), typeof o.color_positive == "string" && (h.color_positive = o.color_positive), typeof o.color_negative == "string" && (h.color_negative = o.color_negative), typeof o.threshold == "number" && (h.threshold = o.threshold), typeof o.reverse == "boolean" && (h.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const f = o.speed_multiplier;
    (f < 0.1 || f > 5) && b(`${n}.speed_multiplier`, "must be between 0.1 and 5.0"), h.speed_multiplier = f;
  }
  return o.opacity !== void 0 && (h.opacity = ne(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && b(`${n}.visible`, "must be a boolean"), h.visible = o.visible), o.line_style !== void 0 && (Wt.includes(o.line_style) || b(`${n}.line_style`, `must be one of ${Wt.join(", ")}`), h.line_style = o.line_style), o.speed_curve_override !== void 0 && (h.speed_curve_override = Li(
    o.speed_curve_override,
    `${n}.speed_curve_override`
  )), o.animation !== void 0 && (h.animation = ji(o.animation, `${n}.animation`)), h;
}
function Li(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && b(t, "must be an object");
  const i = e, s = {};
  function n(u) {
    const h = i[u];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && b(`${t}.${u}`, "must be a positive finite number"), h;
  }
  function o(u) {
    const h = i[u];
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
  if (c !== void 0 && (s.min_duration = c), i.steepness !== void 0) {
    const u = i.steepness;
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
  for (const u of Object.keys(i))
    p.has(u) || b(`${t}.${u}`, `unknown key (allowed: ${[...p].join(", ")})`);
  return s;
}
function it(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e <= 0) && b(t, "must be a positive finite number"), e;
}
function Bi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && b("defaults", "must be an object");
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = it(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const s = it(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    s > 1 && b("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), i.burst_trigger_ratio = s;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = it(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = it(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = it(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = it(t.line_width, "defaults.line_width")), i;
}
function ne(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 1) && b(t, "must be a number between 0 and 1"), e;
}
function Hi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && b("opacity", "must be an object");
  const t = e, i = {};
  for (const s of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[s] !== void 0 && (i[s] = ne(t[s], `opacity.${s}`));
  return i;
}
function ji(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && b(t, "must be an object");
  const i = e, s = {};
  i.animation_style !== void 0 && (Vt.includes(i.animation_style) || b(`${t}.animation_style`, `must be one of ${Vt.join(", ")}`), s.animation_style = i.animation_style), i.particle_shape !== void 0 && (Gt.includes(i.particle_shape) || b(`${t}.particle_shape`, `must be one of ${Gt.join(", ")}`), s.particle_shape = i.particle_shape), i.direction !== void 0 && (qt.includes(i.direction) || b(`${t}.direction`, `must be one of ${qt.join(", ")}`), s.direction = i.direction), i.particle_spacing !== void 0 && (ye.includes(i.particle_spacing) || b(`${t}.particle_spacing`, `must be one of ${ye.join(", ")}`), s.particle_spacing = i.particle_spacing);
  const n = (p, u) => {
    const h = i[p];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && b(`${t}.${p}`, "must be a positive finite number"), h;
  }, o = (p) => {
    const u = i[p];
    if (u !== void 0)
      return typeof u != "boolean" && b(`${t}.${p}`, "must be a boolean"), u;
  }, r = n("particle_size");
  if (r !== void 0 && (s.particle_size = r), i.particle_count !== void 0) {
    const p = i.particle_count;
    (typeof p != "number" || !Number.isFinite(p) || p < 1 || !Number.isInteger(p)) && b(`${t}.particle_count`, "must be a positive integer ≥ 1"), s.particle_count = p;
  }
  if (i.glow_intensity !== void 0) {
    const p = i.glow_intensity;
    (typeof p != "number" || !Number.isFinite(p) || p < 0) && b(`${t}.glow_intensity`, "must be a non-negative finite number"), s.glow_intensity = p;
  }
  const a = o("shimmer");
  a !== void 0 && (s.shimmer = a);
  const l = o("flicker");
  l !== void 0 && (s.flicker = l);
  const d = n("pulse_width");
  d !== void 0 && (s.pulse_width = d);
  const c = n("trail_length");
  if (c !== void 0 && (s.trail_length = c), i.dash_gap !== void 0) {
    const p = i.dash_gap;
    (typeof p != "number" || !Number.isFinite(p) || p < 0 || p > 10) && b(`${t}.dash_gap`, "must be a number between 0 and 10"), s.dash_gap = p;
  }
  return s;
}
function Wi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && b("animation", "must be an object");
  const t = e, i = {};
  if (t.fps !== void 0) {
    const s = t.fps;
    (typeof s != "number" || !Number.isFinite(s) || s < 1 || s > 120) && b("animation.fps", "must be a number between 1 and 120"), i.fps = s;
  }
  return t.smooth_speed !== void 0 && (typeof t.smooth_speed != "boolean" && b("animation.smooth_speed", "must be a boolean"), i.smooth_speed = t.smooth_speed), i;
}
function Vi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && b("visibility", "must be an object");
  const t = e, i = {};
  for (const s of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[s] !== void 0 && (typeof t[s] != "boolean" && b(`visibility.${s}`, "must be a boolean"), i[s] = t[s]);
  return i;
}
function Gi(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && b("domain_colors", "must be an object");
  const t = e, i = {};
  for (const s of ["solar", "grid", "battery", "load"])
    t[s] !== void 0 && (typeof t[s] != "string" && b(`domain_colors.${s}`, "must be a string colour value"), i[s] = t[s]);
  return i;
}
function kt(e) {
  if (!e || typeof e != "object") throw new ie("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && b("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), Ft.includes(t.domain) || b("domain", `must be one of ${Ft.join(", ")}`);
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && b("background", "must be an object when provided");
  const s = i ?? {}, o = { default: s.default === void 0 || s.default === "" ? "" : we(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && b("background.weather_entity", "must be a string entity id"), o.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && b("background.weather_states", "must be an object mapping state strings to image URLs");
    const h = Object.entries(s.weather_states), f = {};
    for (const [g, y] of h)
      f[g] = we(y, `background.weather_states.${g}`);
    o.weather_states = f;
  }
  s.sun_entity !== void 0 && (typeof s.sun_entity != "string" && b("background.sun_entity", "must be a string entity id (e.g. sun.sun)"), o.sun_entity = s.sun_entity), s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && b("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = s.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || b("nodes", "must be an array");
  const a = /* @__PURE__ */ new Set(), l = r.map((h, f) => Ri(h, f, a));
  l.length === 0 && b("nodes", "at least one node is required");
  const d = t.flows;
  Array.isArray(d) || b("flows", "must be an array");
  const c = /* @__PURE__ */ new Set(), p = d.map(
    (h, f) => Ui(h, f, c, a)
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
      (f, g) => qi(f, g, h)
    );
  }
  return t.defaults !== void 0 && (u.defaults = Bi(t.defaults)), t.domain_colors !== void 0 && (u.domain_colors = Gi(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && b("debug", "must be a boolean"), u.debug = t.debug), t.opacity !== void 0 && (u.opacity = Hi(t.opacity)), t.visibility !== void 0 && (u.visibility = Vi(t.visibility)), t.animation !== void 0 && (u.animation = Wi(t.animation)), u;
}
function qi(e, t, i) {
  const s = `overlays[${t}]`;
  (!e || typeof e != "object") && b(s, "must be an object");
  const n = e, o = n.type, a = typeof o == "string" && ["camera", "switch", "sensor", "button"].includes(o);
  !a && o !== "custom" && b(
    `${s}.type`,
    'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.'
  );
  const l = n.id;
  (typeof l != "string" || !l.length) && b(`${s}.id`, "must be a non-empty string"), i.has(l) && b(`${s}.id`, `duplicate overlay id "${l}"`), i.add(l);
  const d = se(n.position, `${s}.position`);
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
        const v = y, k = v.width, $ = v.height;
        typeof k == "number" && typeof $ == "number" && (g.size = { width: k, height: $ });
      }
    }
    return g;
  }
  const c = n.card;
  (!c || typeof c != "object" || Array.isArray(c)) && b(`${s}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  const p = Je(c, `${s}.card`);
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
    const g = f, y = g.width, v = g.height;
    (typeof y != "number" || !Number.isFinite(y) || y <= 0 || y > 100) && b(`${s}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof v != "number" || !Number.isFinite(v) || v <= 0 || v > 100) && b(`${s}.size.height`, "must be a positive number ≤ 100 (percent of card)"), h.size = { width: y, height: v };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && b(`${s}.visible`, "must be a boolean"), h.visible = n.visible), n.opacity !== void 0) {
    const f = n.opacity;
    (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 1) && b(`${s}.opacity`, "must be a number between 0 and 1"), h.opacity = f;
  }
  return h;
}
function oe(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function Nt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function Ze(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const s = e[i - 1], n = e[i];
    if (!s || !n) continue;
    const o = n.x - s.x, r = n.y - s.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function Ki(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = Ze(e), s = oe(t, 0, 1) * i;
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
function xe(e, t, i) {
  if (e.length === 0) return "";
  if (e.length === 1) {
    const a = Nt(e[0], t);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const s = e.map((a) => Nt(a, t));
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
    const p = Math.sqrt((d.x - l.x) ** 2 + (d.y - l.y) ** 2), u = Math.sqrt((c.x - d.x) ** 2 + (c.y - d.y) ** 2), h = Math.min(Math.min(p, u) * n, o), f = h / (p || 1), g = d.x - (d.x - l.x) * f, y = d.y - (d.y - l.y) * f, v = h / (u || 1), k = d.x + (c.x - d.x) * v, $ = d.y + (c.y - d.y) * v;
    r.push(`L ${g.toFixed(2)} ${y.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${k.toFixed(2)} ${$.toFixed(2)}`);
  }
  return r.join(" ");
}
function $e(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
const Y = 9e3, X = 700, J = 1.5;
function U(e, t) {
  const { threshold: i, p50: s, max_duration: n, min_duration: o, steepness: r } = t, a = Math.abs(e);
  if (!(s > 0) || !(i > 0)) return n;
  const l = Math.max(a, i), d = Math.log10(l / s), c = 1 / (1 + Math.exp(-r * d));
  return n - c * (n - o);
}
function re(e, t) {
  const i = e.speed_curve_override ?? {}, s = i.threshold ?? e.threshold ?? t.threshold, n = i.p50 ?? t.p50, o = i.peak ?? t.peak, r = i.max_duration ?? Y, a = i.min_duration ?? X, l = i.steepness ?? J;
  return { threshold: s, p50: n, peak: o, max_duration: r, min_duration: a, steepness: l };
}
function Yi(e, t, i) {
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
function Qe(e, t) {
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
function Xi(e, t, i, s) {
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
function St(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), s = Number.parseInt(t[2], 10);
  if (!(!i || !s))
    return i / s;
}
const Ji = {
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
      max_duration: Y,
      min_duration: X,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, Zi = {
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
}, Qi = {
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
      max_duration: Y,
      min_duration: X,
      steepness: J
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(oe(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, ts = {
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
      max_duration: Y,
      min_duration: X,
      steepness: J
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return oe(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, es = {
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
      max_duration: Y,
      min_duration: X,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, ti = {
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
      max_duration: Y,
      min_duration: X,
      steepness: J
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, _e = {
  energy: Ji,
  water: Zi,
  network: Qi,
  hvac: ts,
  gas: es,
  generic: ti
};
function W(e) {
  return e && e in _e ? _e[e] : ti;
}
const is = "#CCCCCC";
function ss(e, t, i) {
  if (e !== "energy") return;
  const s = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(s)) return i?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(s)) return i?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(s)) return i?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(s))
    return i?.load ?? "#FF8C1E";
}
function at(e, t, i, s, n) {
  const o = e.color ?? ss(i, e.id, n);
  return s >= 0 ? e.color_positive ?? o ?? t.default_color_positive : e.color_negative ?? o ?? t.default_color_negative;
}
const ns = "[FlowMe]";
let ei = !1;
function os(e) {
  ei = e;
}
function N(...e) {
  ei && console.warn(ns, ...e);
}
const rs = "[FlowMe Renderer]";
function dt(...e) {
  N(rs, ...e);
}
const S = "http://www.w3.org/2000/svg", L = "http://www.w3.org/1999/xlink";
function as() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const Ut = as(), ls = 2e3, Lt = 3, cs = 5, Bt = 2, ds = 14, ps = 0.9, us = 5e3, pt = 20, hs = 0.2, Ht = 0.3;
class Kt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Qe(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.currentDurMs = /* @__PURE__ */ new Map(), this.targetDurMs = /* @__PURE__ */ new Map(), this.speedTransitionStart = /* @__PURE__ */ new Map(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptiveChange = /* @__PURE__ */ new Map(), this.particleOffsets = /* @__PURE__ */ new Map(), this.frameTimeSamples = [], this.lastFrameForAdaptive = 0;
  }
  async init(t, i) {
    dt("init:", t.getBoundingClientRect(), "flows:", i.flows.length), this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n]));
    const s = document.createElementNS(S, "svg");
    s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("preserveAspectRatio", "none"), s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.overflow = "visible", this.svg = s, t.appendChild(s), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t), this.startFpsLoop();
  }
  updateFlow(t, i) {
    this.flowsById.has(t) && (this.latestValues.set(t, i), this.applyUpdate());
  }
  /**
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  startFpsLoop() {
    const i = 1e3 / (this.config?.animation?.fps ?? 60), s = (n) => {
      if (!this.svg) return;
      const o = n - this.lastFrameTime;
      this.sampleFrameTime(), o >= i && (this.lastFrameTime = n - o % i, this.config?.animation?.smooth_speed !== !1 && (this.speedTransitionStart.size > 0 || this.dirChanging.size > 0) && this.flushUpdates()), this.rafHandle = requestAnimationFrame(s);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(s);
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.currentDurMs.clear(), this.targetDurMs.clear(), this.speedTransitionStart.clear(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.lastAdaptiveChange.clear(), this.particleOffsets.clear();
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
    const i = document.createElementNS(S, "defs");
    this.svg.appendChild(i);
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const a = [o.position, ...n.waypoints, r.position], l = `flowme-path-${n.id}`, d = document.createElementNS(S, "path");
      d.setAttribute("id", l), d.setAttribute("d", xe(a, t, n.line_style ?? "corner")), d.setAttribute("fill", "none"), i.appendChild(d);
      const c = document.createElementNS(S, "g");
      c.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && c.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (c.style.display = "none");
      const p = this.config?.defaults?.line_width ?? Bt, u = document.createElementNS(S, "use");
      u.setAttributeNS(L, "href", `#${l}`), u.setAttribute("href", `#${l}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(p)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), c.appendChild(u);
      const h = {
        group: c,
        path: d,
        pathId: l,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(c), this.flowNodes.set(n.id, h), dt("skeleton:", n.id, "| style=", h.style);
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
      n.path.setAttribute("d", xe(a, t, s.line_style ?? "corner")), n.style === "pulse" && this.applyFlow(s.id, this.latestValues.get(s.id) ?? 0);
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
    const a = this.profileFor(s), l = re(s, a), d = Ut ? 0 : l.threshold, c = Math.abs(i), u = o.shimmer === !0 && c < d && c > 0;
    if (!(Ut || c >= d || u)) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const f = Ut ? ls : U(c, l), g = s.speed_multiplier ?? 1;
    let y = Math.max(50, f * g);
    u && (y = y / hs);
    const v = this.config?.animation?.smooth_speed !== !1;
    y = this.resolveSmoothedDur(t, y, v);
    const k = o.direction ?? "auto";
    let $;
    k === "forward" ? $ = 1 : k === "reverse" ? $ = -1 : $ = i < 0 != (s.reverse === !0) ? -1 : 1;
    let _ = $, C = u ? Ht : 1;
    if (v && k === "auto") {
      const O = this.lastDirection.get(t), tt = this.dirChanging.get(t);
      O !== void 0 && O !== $ && !tt && this.dirChanging.set(t, { startMs: performance.now(), oldDir: O, newDir: $ });
      const et = this.dirChanging.get(t);
      if (et) {
        const xt = performance.now() - et.startMs;
        if (xt < 300) {
          const Tt = xt / 300;
          Tt < 0.5 ? (C = (u ? Ht : 1) * (1 - Tt * 2), _ = et.oldDir) : (C = (u ? Ht : 1) * ((Tt - 0.5) * 2), _ = et.newDir);
        } else
          this.dirChanging.delete(t), _ = $;
      }
    }
    this.lastDirection.set(t, $);
    const z = s.domain ?? this.config?.domain, P = at(s, a, z, _, this.config?.domain_colors);
    this.setGroupOpacity(n, C);
    const I = this.updateBurstState(t, c, l, a);
    switch (dt("applyFlow:", t, "style=", r, "dur=", y, "dir=", _, "color=", P), r) {
      case "dots":
        this.applyDots(n, s, a, i, y, P, _, I);
        break;
      case "dash":
        this.applyDash(n, s, y, P, _, I);
        break;
      case "pulse":
        this.applyPulse(n, s, a, i, y, P, I);
        break;
      case "arrow":
        this.applyArrows(n, s, y, P, _, I);
        break;
      case "trail":
        this.applyTrail(n, s, y, P, _, I);
        break;
      case "fluid":
        this.applyFluid(n, s, y, P, _);
        break;
      case "spark":
        this.applySpark(n, s, a, i, y, P, _, I);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, s, a, i, y, P, _, I);
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
    const o = s.peak, r = this.config?.defaults?.burst_trigger_ratio ?? ps, a = this.config?.defaults?.burst_sustain_ms ?? us, l = o * r;
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
    ), d = this.config?.defaults?.burst_max_particles ?? pt, c = Math.min(d, Math.max(1, Math.round(l * n))), p = o.animation_style ?? "dots";
    if (p === "dots" || p === "trail") {
      const u = this.adaptiveCount.get(t.id) ?? c, h = this.avgFrameMs(), f = performance.now(), g = this.lastAdaptiveChange.get(t.id) ?? 0;
      if (f - g > 1e3) {
        let v = u;
        h > a * 1.2 && u > 1 ? (v = u - 1, dt("adaptive:", t.id, "reducing particles", u, "→", v, "(avg frame", h.toFixed(1), "ms)")) : h < a * 0.8 && u < c && (v = u + 1, dt("adaptive:", t.id, "restoring particles", u, "→", v)), v !== u && (this.adaptiveCount.set(t.id, v), this.lastAdaptiveChange.set(t.id, f));
      }
      return this.adaptiveCount.get(t.id) ?? c;
    }
    return c;
  }
  resolveParticleRadius(t) {
    return (this.config?.defaults?.dot_radius ?? cs) * (t.animation?.particle_size ?? 1);
  }
  resolveGlow(t, i) {
    return t.animation?.glow_intensity === 0 ? !1 : i.glow;
  }
  glowFilter(t, i, s) {
    return this.resolveGlow(t, i) ? `drop-shadow(0 0 ${(6 * (t.animation?.glow_intensity ?? 1)).toFixed(1)}px ${s})` : "";
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
      for (const g of t.particles) g.shape.remove();
      t.particles = [];
      for (let g = 0; g < c; g++)
        t.particles.push(this.makeParticle(t, p, r, i, s));
    }
    if (d === "both") {
      if (!t.particlesBack || t.particlesBack.length !== c) {
        if (t.particlesBack) for (const g of t.particlesBack) g.shape.remove();
        t.particlesBack = [];
        for (let g = 0; g < c; g++)
          t.particlesBack.push(this.makeParticle(t, p, r, i, s));
      }
    } else if (t.particlesBack) {
      for (const g of t.particlesBack) g.shape.remove();
      t.particlesBack = void 0;
    }
    const h = `${(o / 1e3).toFixed(3)}s`, f = (g, y) => {
      for (let v = 0; v < g.length; v++) {
        const k = g[v];
        this.updateParticleColor(k, r, i, s, u);
        const $ = document.createElementNS(S, "animateMotion");
        $.setAttribute("repeatCount", "indefinite"), $.setAttribute("dur", h), $.setAttribute("rotate", "auto"), $.setAttribute("begin", `${(-o * v / (g.length * 1e3)).toFixed(3)}s`), y < 0 && ($.setAttribute("keyPoints", "1;0"), $.setAttribute("keyTimes", "0;1"));
        const _ = document.createElementNS(S, "mpath");
        _.setAttributeNS(L, "href", `#${t.pathId}`), _.setAttribute("href", `#${t.pathId}`), $.appendChild(_), k.animateMotion.replaceWith($), k.animateMotion = $, k.shape.appendChild($);
      }
    };
    f(t.particles, a), t.particlesBack && f(t.particlesBack, -a);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(t, i, s, n, o, r) {
    for (const v of t.particles) v.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const v = document.createElementNS(S, "use");
      v.setAttributeNS(L, "href", `#${t.pathId}`), v.setAttribute("href", `#${t.pathId}`), v.setAttribute("fill", "none"), v.setAttribute("stroke-linecap", "round"), v.setAttribute("stroke-linejoin", "round"), t.group.appendChild(v), t.lineStroke = v;
    }
    const a = this.config?.defaults?.line_width ?? Bt, d = (i.animation ?? {}).dash_gap ?? 0.5, c = Math.max(0.1, d / r), p = 14, u = p * c, h = this.glowFilter(i, this.profileFor(i), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(a * 2)), t.lineStroke.setAttribute("stroke-dasharray", `${p} ${u}`), h && t.lineStroke.setAttribute("filter", h);
    const f = p + u, g = t.lineStroke.querySelector("animate");
    g && g.remove();
    const y = document.createElementNS(S, "animate");
    y.setAttribute("attributeName", "stroke-dashoffset"), y.setAttribute("from", o > 0 ? "0" : `-${f}`), y.setAttribute("to", o > 0 ? `-${f}` : "0"), y.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), y.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(y);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(t, i, s, n, o, r, a) {
    for (const _ of t.particles) _.shape.remove();
    t.particles = [], t.lineStroke?.remove(), t.lineStroke = void 0;
    const l = new Map(this.config?.nodes.map((_) => [_.id, _]) ?? []), d = l.get(i.from_node), c = l.get(i.to_node);
    if (!d || !c) return;
    const p = [d.position, ...i.waypoints, c.position], u = Ze(p), h = Math.max(
      2,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Math.max(3, Math.floor(u / 15))
      )
    ), f = this.config?.defaults?.burst_max_particles ?? pt, g = Math.min(f, Math.max(2, Math.round(h * a))), y = this.containerSize(), v = i.animation?.pulse_width ?? 2, k = ds * (i.animation?.particle_size ?? 1), $ = this.resolveGlow(i, s);
    if (!t.pulseCircles || t.pulseCircles.length !== g) {
      if (t.pulseCircles) for (const _ of t.pulseCircles) _.circle.remove();
      t.pulseCircles = [];
      for (let _ = 0; _ < g; _++) {
        const C = document.createElementNS(S, "circle");
        C.setAttribute("r", "0"), C.setAttribute("fill", "none"), C.setAttribute("stroke", r), C.setAttribute("stroke-width", String(v)), C.setAttribute("opacity", "0"), $ && C.setAttribute("filter", this.glowFilter(i, s, r));
        const z = document.createElementNS(S, "animate");
        z.setAttribute("attributeName", "r"), z.setAttribute("values", `0;${k};0`), z.setAttribute("repeatCount", "indefinite"), C.appendChild(z);
        const P = document.createElementNS(S, "animate");
        P.setAttribute("attributeName", "opacity"), P.setAttribute("values", "0;0.9;0"), P.setAttribute("repeatCount", "indefinite"), C.appendChild(P), t.group.appendChild(C), t.pulseCircles.push({ circle: C, animateRadius: z, animateOpacity: P });
      }
    }
    for (let _ = 0; _ < t.pulseCircles.length; _++) {
      const C = t.pulseCircles[_], z = (_ + 0.5) / t.pulseCircles.length, P = Ki(p, z), I = Nt(P, y);
      C.circle.setAttribute("cx", I.x.toFixed(2)), C.circle.setAttribute("cy", I.y.toFixed(2)), C.circle.setAttribute("stroke", r);
      const O = `${(o / 1e3).toFixed(3)}s`, tt = `${(-o * _ / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      C.animateRadius.setAttribute("values", `0;${k};0`), C.animateRadius.setAttribute("dur", O), C.animateRadius.setAttribute("begin", tt), C.animateOpacity.setAttribute("dur", O), C.animateOpacity.setAttribute("begin", tt);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(t, i, s, n, o, r) {
    const a = this.profileFor(i), l = i.animation?.particle_count ?? Lt, d = this.config?.defaults?.burst_max_particles ?? pt, c = Math.min(d, Math.max(1, Math.round(l * r))), p = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const h of t.particles) h.shape.remove();
      t.particles = [];
      for (let h = 0; h < c; h++)
        t.particles.push(this.makeParticle(t, "arrow", n, i, a));
    }
    const u = `${(s / 1e3).toFixed(3)}s`;
    for (let h = 0; h < t.particles.length; h++) {
      const f = t.particles[h];
      this.updateParticleColor(f, n, i, a, p);
      const g = document.createElementNS(S, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(-s * h / (t.particles.length * 1e3)).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const y = document.createElementNS(S, "mpath");
      y.setAttributeNS(L, "href", `#${t.pathId}`), y.setAttribute("href", `#${t.pathId}`), g.appendChild(y), f.animateMotion.replaceWith(g), f.animateMotion = g, f.shape.appendChild(g);
    }
  }
  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
   */
  applyTrail(t, i, s, n, o, r) {
    const a = this.profileFor(i), l = i.animation?.particle_count ?? Lt, d = this.config?.defaults?.burst_max_particles ?? pt, c = Math.min(d, Math.max(1, Math.round(l * r))), p = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const h of t.particles) h.shape.remove();
      t.particles = [];
      for (let h = 0; h < c; h++)
        t.particles.push(this.makeParticle(t, "teardrop", n, i, a));
    }
    const u = `${(s / 1e3).toFixed(3)}s`;
    for (let h = 0; h < t.particles.length; h++) {
      const f = t.particles[h];
      this.updateParticleColor(f, n, i, a, p);
      const g = document.createElementNS(S, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", u), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(-s * h / (t.particles.length * 1e3)).toFixed(3)}s`), o < 0 && (g.setAttribute("keyPoints", "1;0"), g.setAttribute("keyTimes", "0;1"));
      const y = document.createElementNS(S, "mpath");
      y.setAttributeNS(L, "href", `#${t.pathId}`), y.setAttribute("href", `#${t.pathId}`), g.appendChild(y), f.animateMotion.replaceWith(g), f.animateMotion = g, f.shape.appendChild(g);
    }
  }
  /**
   * fluid — continuous gradient flowing along the line.
   * Implemented as an animated stroke-dashoffset on a wide stroke.
   */
  applyFluid(t, i, s, n, o) {
    for (const c of t.particles) c.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const c = document.createElementNS(S, "use");
      c.setAttributeNS(L, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), c.setAttribute("fill", "none"), c.setAttribute("stroke-linecap", "round"), t.group.appendChild(c), t.lineStroke = c;
    }
    const r = (this.config?.defaults?.line_width ?? Bt) * 3, a = this.glowFilter(i, this.profileFor(i), n);
    t.lineStroke.setAttribute("stroke", n), t.lineStroke.setAttribute("stroke-width", String(r)), t.lineStroke.setAttribute("stroke-dasharray", "50 200"), a && t.lineStroke.setAttribute("filter", a);
    const l = t.lineStroke.querySelector("animate");
    l && l.remove();
    const d = document.createElementNS(S, "animate");
    d.setAttribute("attributeName", "stroke-dashoffset"), d.setAttribute("from", o > 0 ? "0" : "-250"), d.setAttribute("to", o > 0 ? "-250" : "0"), d.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), d.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(d);
  }
  /**
   * spark — particles with randomised size/opacity, slight scatter.
   * Scatter is achieved via SVG transform on each particle's <g> wrapper.
   */
  applySpark(t, i, s, n, o, r, a, l) {
    const d = this.resolveParticleCount(i, s, n, l), c = Math.min(
      this.config?.defaults?.burst_max_particles ?? pt,
      Math.round(d * l)
    ), p = i.animation?.particle_shape ?? "circle", u = i.animation?.flicker === !0;
    if (t.particles.length !== c) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < c; f++) {
        const g = this.makeParticle(t, p, r, i, s), y = 0.7 + Math.random() * 0.6;
        g.shape.setAttribute("transform", `scale(${y.toFixed(2)})`), t.particles.push(g);
      }
    }
    const h = `${(o / 1e3).toFixed(3)}s`;
    for (let f = 0; f < t.particles.length; f++) {
      const g = t.particles[f], y = 0.5 + Math.random() * 0.5;
      g.shape.setAttribute("opacity", String(y.toFixed(2))), this.updateParticleColor(g, r, i, s, u);
      const v = document.createElementNS(S, "animateMotion");
      v.setAttribute("repeatCount", "indefinite"), v.setAttribute("dur", h), v.setAttribute("rotate", "auto"), v.setAttribute("begin", `${(-o * f / (t.particles.length * 1e3)).toFixed(3)}s`), a < 0 && (v.setAttribute("keyPoints", "1;0"), v.setAttribute("keyTimes", "0;1"));
      const k = document.createElementNS(S, "mpath");
      k.setAttributeNS(L, "href", `#${t.pathId}`), k.setAttribute("href", `#${t.pathId}`), v.appendChild(k), g.animateMotion.replaceWith(v), g.animateMotion = v, g.shape.appendChild(v);
    }
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(t) {
    const i = t.shape.tagName.toLowerCase();
    return i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? t.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : "circle";
  }
  makeParticle(t, i, s, n, o) {
    const r = this.resolveParticleRadius(n), a = this.resolveGlow(n, o);
    let l;
    switch (i) {
      case "square": {
        const p = r * 2, u = document.createElementNS(S, "rect");
        u.setAttribute("width", String(p)), u.setAttribute("height", String(p)), u.setAttribute("x", String(-p / 2)), u.setAttribute("y", String(-p / 2)), u.setAttribute("rx", "1.5"), u.setAttribute("fill", s), u.setAttribute("opacity", "0"), l = u;
        break;
      }
      case "arrow": {
        const p = r * 2.2, u = r * 1.5, h = document.createElementNS(S, "polygon");
        h.setAttribute("points", `${p},0 ${-p * 0.4},${u} 0,0 ${-p * 0.4},${-u}`), h.setAttribute("fill", s), h.setAttribute("opacity", "0"), h.setAttribute("data-kind", "arrow"), l = h;
        break;
      }
      case "teardrop": {
        const p = n.animation?.trail_length ?? 2, u = r, h = r * p, f = document.createElementNS(S, "ellipse");
        f.setAttribute("rx", String(u)), f.setAttribute("ry", String(h)), f.setAttribute("cy", String(-h * 0.3)), f.setAttribute("fill", s), f.setAttribute("opacity", "0"), l = f;
        break;
      }
      case "diamond": {
        const p = r * 1.4, u = document.createElementNS(S, "polygon");
        u.setAttribute("points", `0,${-p} ${p},0 0,${p} ${-p},0`), u.setAttribute("fill", s), u.setAttribute("opacity", "0"), u.setAttribute("data-kind", "diamond"), l = u;
        break;
      }
      default: {
        const p = document.createElementNS(S, "circle");
        p.setAttribute("r", String(r)), p.setAttribute("fill", s), p.setAttribute("opacity", "0"), l = p;
      }
    }
    a && (l.setAttribute("filter", this.glowFilter(n, o, s)), l.style.color = s);
    const d = document.createElementNS(S, "animateMotion");
    d.setAttribute("repeatCount", "indefinite"), d.setAttribute("dur", "2s");
    const c = document.createElementNS(S, "mpath");
    return c.setAttributeNS(L, "href", `#${t.pathId}`), c.setAttribute("href", `#${t.pathId}`), d.appendChild(c), l.appendChild(d), t.group.appendChild(l), { shape: l, animateMotion: d };
  }
  updateParticleColor(t, i, s, n, o) {
    if (t.shape.setAttribute("fill", i), t.shape.style.color = i, this.resolveGlow(s, n) && t.shape.setAttribute("filter", this.glowFilter(s, n, i)), t.shape.setAttribute("opacity", "1"), o) {
      if (!t.flickerAnim) {
        const u = document.createElementNS(S, "animate");
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
    const i = this.profileFor(t), s = t.domain ?? this.config?.domain;
    return at(t, i, s, 1, this.config?.domain_colors);
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
`, ke = "flowme-keyframes", Yt = "flowme-cycle", gs = 5, ms = 2;
let G = null, Se = !1;
function bs() {
  if (document.getElementById(ke)) return;
  const e = document.createElement("style");
  e.id = ke, e.textContent = `@keyframes ${Yt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function ys() {
  if (Se) return;
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
  Se = !0;
}
async function vs() {
  if (G) return G;
  const e = CSS.paintWorklet;
  if (!e)
    return G = Promise.reject(new Error("paintWorklet not available")), G;
  const t = new Blob([fs], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return G = e.addModule(i).catch((s) => {
    throw G = null, s;
  }).finally(() => {
  }), G;
}
class ws {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Qe(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n])), bs(), ys(), await vs();
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", t.appendChild(s), this.wrapper = s;
    for (const n of i.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = n.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Yt} 2s linear infinite`, o.style.opacity = "0", s.appendChild(o), this.flowDivs.set(n.id, { el: o });
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
      const d = [o.position, ...s.waypoints, r.position].map((c) => Nt(c, t)).map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
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
    const o = this.profileFor(s), r = re(s, o), a = Math.abs(i);
    if (!(a >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = s.speed_multiplier ?? 1, c = Math.max(50, U(a, r) * d), p = i < 0 != (s.reverse === !0) ? -1 : 1, u = s.domain ?? this.config?.domain, h = at(s, o, u, p, this.config?.domain_colors), f = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(i) : 3)
    ), g = o.wave_amplitude_curve ? o.wave_amplitude_curve(i) : 4, y = n.el.style;
    y.setProperty("--flowme-shape", o.shape), y.setProperty("--flowme-color", h), y.setProperty("--flowme-glow", o.glow ? "1" : "0"), y.setProperty("--flowme-count", String(f)), y.setProperty("--flowme-radius", String(gs)), y.setProperty("--flowme-line", String(ms)), y.setProperty("--flowme-amp", String(g)), y.setProperty("--flowme-direction", String(p)), y.animation = `${Yt} ${(c / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return W(t.domain ?? this.config?.domain);
  }
}
function xs() {
  const e = _s(), t = e ?? "svg", i = $s();
  return N(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    i,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? i ? new ws() : (N("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Kt()) : new Kt();
}
function $s() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function _s() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function Ae(e) {
  const t = e.size?.width ?? 20, i = e.size?.height ?? 15;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function ks(e, t) {
  N(
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
        style=${Ae(e) + n}
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
      style=${Ae(e) + n}
    >
      <flowme-custom-overlay
        .hass=${t}
        .card=${e.card}
      ></flowme-custom-overlay>
    </div>
    ${w}
  `;
}
let jt = null, st = null;
async function Ss() {
  if (jt) return jt;
  if (st) return st;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (st = t().then((i) => (jt = i, st = null, i)).catch((i) => {
    throw st = null, i;
  }), st);
}
async function As(e) {
  const t = await Ss();
  return t ? t.createCardElement(e) : null;
}
var Cs = Object.defineProperty, Ms = Object.getOwnPropertyDescriptor, zt = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ms(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Cs(t, i, n), n;
};
let lt = class extends j {
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
        Di(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, As(e).then((i) => {
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
lt.styles = Et`
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
zt([
  T({ attribute: !1 })
], lt.prototype, "hass", 2);
zt([
  T({ attribute: !1 })
], lt.prototype, "card", 2);
zt([
  M()
], lt.prototype, "errorMessage", 2);
lt = zt([
  Ot("flowme-custom-overlay")
], lt);
const Ps = 100;
class Fs {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > Ps; ) this.undoStack.shift();
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
function x(e) {
  return JSON.parse(JSON.stringify(e));
}
function E(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function $t(e, t = 8) {
  return Math.round(e / t) * t;
}
function Ns(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `node_${i}`;
    if (!t.has(s)) return s;
  }
  return `node_${Date.now()}`;
}
function Es(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `flow_${i}`;
    if (!t.has(s)) return s;
  }
  return `flow_${Date.now()}`;
}
function Is(e, t, i) {
  const s = x(e);
  for (const n of s.nodes)
    n.id === t && (n.position = { x: E(i.x), y: E(i.y) });
  return s;
}
function Os(e, t, i) {
  const s = x(e), n = {
    id: Ns(e),
    position: { x: E(t.x), y: E(t.y) },
    label: i
  };
  return s.nodes.push(n), { config: s, node: n };
}
function zs(e, t) {
  const i = x(e);
  return i.nodes = i.nodes.filter((s) => s.id !== t), i.flows = i.flows.filter((s) => s.from_node !== t && s.to_node !== t), i;
}
function Ts(e, t) {
  const i = x(e);
  for (const s of i.nodes) {
    const n = t.get(s.id);
    n && (s.position = { x: E(n.x), y: E(n.y) });
  }
  return i;
}
function Ds(e, t) {
  const i = x(e);
  return i.nodes = i.nodes.filter((s) => !t.has(s.id)), i.flows = i.flows.filter((s) => !t.has(s.from_node) && !t.has(s.to_node)), i;
}
function Ce(e, t, i) {
  const s = x(e);
  for (const n of s.nodes)
    t.has(n.id) && (n.visible = i);
  return s;
}
function Rs(e, t, i) {
  const s = e.nodes.find((o) => o.id === i);
  if (!s) return e;
  const n = x(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, y: s.position.y });
  return n;
}
function Us(e, t, i) {
  const s = e.nodes.find((o) => o.id === i);
  if (!s) return e;
  const n = x(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.position = { ...o.position, x: s.position.x });
  return n;
}
function Ls(e, t, i, s) {
  const n = x(e);
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
function Bs(e, t, i, s) {
  const n = x(e);
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
function Hs(e, t, i) {
  const s = x(e);
  for (const n of s.flows)
    if (n.id === t) {
      if (i < 0 || i >= n.waypoints.length) return e;
      n.waypoints.splice(i, 1);
    }
  return s;
}
function Me(e, t, i, s) {
  const n = x(e), o = {
    id: Es(e),
    from_node: t,
    to_node: i,
    entity: s,
    waypoints: []
  };
  return n.flows.push(o), { config: n, flow: o };
}
function js(e, t) {
  const i = x(e);
  return i.flows = i.flows.filter((s) => s.id !== t), i;
}
function Ws(e, t) {
  const i = x(e);
  return i.background.default = t, i;
}
function Vs(e, t) {
  const i = x(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function Gs(e, t) {
  const i = x(e);
  return t && t.length ? i.background.sun_entity = t : delete i.background.sun_entity, i;
}
function qs(e, t) {
  const i = x(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function Pe(e, t, i) {
  var n;
  const s = x(e);
  return (n = s.background).weather_states ?? (n.weather_states = {}), s.background.weather_states[t] = i, s;
}
function Ks(e, t) {
  const i = x(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function Ys(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `overlay_${i}`;
    if (!t.has(s)) return s;
  }
  return `overlay_${Date.now()}`;
}
function Xs(e, t) {
  const i = x(e), s = t.id ?? Ys(e), n = {
    ...t,
    id: s,
    position: {
      x: E(t.position.x),
      y: E(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function Js(e, t) {
  const i = x(e);
  return i.overlays = (i.overlays ?? []).filter((s) => s.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function Zs(e, t, i) {
  const s = x(e);
  for (const n of s.overlays ?? [])
    n.id === t && (n.position = { x: E(i.x), y: E(i.y) });
  return s;
}
function Fe(e, t, i) {
  const s = x(e), n = Math.max(2, Math.min(100, i.width)), o = Math.max(2, Math.min(100, i.height));
  for (const r of s.overlays ?? [])
    r.id === t && (r.size = { width: n, height: o });
  return s;
}
function Qs(e, t, i) {
  const s = x(e);
  for (const n of s.overlays ?? [])
    n.id === t && i && (n.card = i);
  return s;
}
function tn(e, t, i) {
  const s = x(e);
  for (const n of s.overlays ?? [])
    n.id === t && (i ? delete n.visible : n.visible = !1);
  return s;
}
function en(e, t, i) {
  const s = x(e);
  for (const n of s.overlays ?? [])
    if (n.id === t) {
      const o = Math.max(0, Math.min(1, i));
      o === 1 ? delete n.opacity : n.opacity = o;
    }
  return s;
}
function Ne(e, t, i) {
  const s = x(e);
  return s.opacity = { ...s.opacity, [t]: i }, s;
}
function sn(e, t, i) {
  const s = x(e);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function nn(e, t, i) {
  const s = x(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.opacity : o.opacity = i, o;
  }), s;
}
function on(e, t, i) {
  const s = x(e);
  return s.defaults = { ...s.defaults, [t]: i }, s;
}
function rn(e, t, i) {
  if (t === i) return e;
  const s = x(e), n = s.background.weather_states;
  if (!n || !(t in n)) return e;
  const o = n[t];
  return o === void 0 ? e : (delete n[t], n[i] = o, s);
}
function an(e, t, i) {
  const s = x(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 || i === "corner" ? delete o.line_style : o.line_style = i, o;
  }), s;
}
function Ee(e, t, i) {
  const s = x(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i === void 0 ? delete o.color : o.color = i, o;
  }), s;
}
function ln(e, t, i) {
  const s = x(e);
  return s.nodes = s.nodes.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i ? delete o.visible : o.visible = !1, o;
  }), s;
}
function Ie(e, t, i) {
  const s = x(e);
  return s.flows = s.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return i ? delete o.visible : o.visible = !1, o;
  }), s;
}
function cn(e, t, i) {
  const s = x(e);
  return s.visibility = { ...s.visibility, [t]: i }, s;
}
function Oe(e, t, i) {
  const s = x(e);
  return i === void 0 ? s.domain_colors && (delete s.domain_colors[t], Object.keys(s.domain_colors).length === 0 && delete s.domain_colors) : s.domain_colors = { ...s.domain_colors, [t]: i }, s;
}
function ze(e, t, i) {
  const s = x(e);
  return s.flows = s.flows.map((n) => n.id !== t ? n : { ...n, speed_curve_override: { ...n.speed_curve_override, ...i } }), s;
}
function dn(e, t) {
  const i = x(e);
  return i.flows = i.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.speed_curve_override, n;
  }), i;
}
function pn(e, t, i) {
  const s = x(e);
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
function un(e, t) {
  const i = x(e);
  return i.flows = i.flows.map((s) => {
    if (s.id !== t) return s;
    const n = { ...s };
    return delete n.animation, n;
  }), i;
}
function Te(e, t) {
  const i = x(e);
  return i.animation = { ...i.animation, ...t }, i;
}
var hn = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, Z = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? fn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && hn(t, i, n), n;
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
  fire(e) {
    this.dispatchEvent(
      new CustomEvent("toolbar-action", { detail: { action: e }, bubbles: !0, composed: !0 })
    );
  }
};
D.styles = Et`
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
  T({ type: Boolean })
], D.prototype, "canUndo", 2);
Z([
  T({ type: Boolean })
], D.prototype, "canRedo", 2);
Z([
  T({ type: Boolean })
], D.prototype, "previewMode", 2);
Z([
  T({ type: Boolean })
], D.prototype, "suggestPathDisabled", 2);
Z([
  T({ type: String })
], D.prototype, "undoLabel", 2);
Z([
  T({ type: String })
], D.prototype, "redoLabel", 2);
D = Z([
  Ot("flowme-editor-toolbar")
], D);
const ii = 8, De = 1, Xt = 255;
function gn(e, t = ii) {
  const i = Math.max(1, Math.floor(t)), s = Math.max(1, Math.ceil(e.width / i)), n = Math.max(1, Math.ceil(e.height / i)), o = new Uint16Array(s * n);
  for (let r = 0; r < n; r++) {
    const a = r * i, l = Math.min(e.height, a + i);
    for (let d = 0; d < s; d++) {
      const c = d * i, p = Math.min(e.width, c + i);
      let u = 0;
      for (let f = a; f < l; f++) {
        const g = f * e.width;
        for (let y = c; y < p; y++) {
          const v = e.data[g + y] ?? 0;
          v > u && (u = v);
        }
      }
      const h = Xt - u;
      o[r * s + d] = h < De ? De : h;
    }
  }
  return { cols: s, rows: n, cellSize: i, data: o };
}
function mn(e, t, i) {
  return i * e.cols + t;
}
function bn(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? Xt : e.data[mn(e, t, i)] ?? Xt;
}
const yn = 50;
class vn {
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
function wn(e, t, i) {
  const [s, n] = t, [o, r] = i;
  if (s < 0 || n < 0 || s >= e.cols || n >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (s === o && n === r) return [[s, n]];
  const a = e.cols * e.rows, l = new Float32Array(a);
  l.fill(1 / 0);
  const d = new Int16Array(a), c = new Int16Array(a);
  d.fill(-1), c.fill(-1);
  const p = new Uint8Array(a), u = new Uint8Array(a), h = n * e.cols + s;
  l[h] = 0;
  const f = new vn();
  f.push({ col: s, row: n, f: Re(s, n, o, r) });
  const g = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const y = f.pop(), { col: v, row: k } = y, $ = k * e.cols + v;
    if (!u[$]) {
      if (u[$] = 1, v === o && k === r)
        return xn(e, d, c, i);
      for (const [_, C, z] of g) {
        const P = v + _, I = k + C;
        if (P < 0 || I < 0 || P >= e.cols || I >= e.rows) continue;
        const O = I * e.cols + P;
        if (u[O]) continue;
        const tt = bn(e, P, I), et = p[$] && p[$] !== z ? yn : 0, wt = (l[$] ?? 1 / 0) + tt + et;
        if (wt < (l[O] ?? 1 / 0)) {
          l[O] = wt, d[O] = v, c[O] = k, p[O] = z;
          const xt = wt + Re(P, I, o, r);
          f.push({ col: P, row: I, f: xt });
        }
      }
    }
  }
  return null;
}
function Re(e, t, i, s) {
  return Math.abs(e - i) + Math.abs(t - s);
}
function xn(e, t, i, s) {
  const n = [];
  let o = s[0], r = s[1];
  for (; o !== -1 && r !== -1; ) {
    n.push([o, r]);
    const a = r * e.cols + o, l = t[a] ?? -1, d = i[a] ?? -1;
    if (l === o && d === r || (o = l, r = d, o < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
const $n = 480, _n = 270, kn = 30;
function Sn(e, t, i = $n, s = _n) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / e, s / t, 1);
  return {
    width: Math.max(1, Math.floor(e * n)),
    height: Math.max(1, Math.floor(t * n))
  };
}
function An(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 0, o = 0; n < e.length; n += 4, o++) {
    const r = e[n] ?? 0, a = e[n + 1] ?? 0, l = e[n + 2] ?? 0;
    s[o] = 0.2126 * r + 0.7152 * a + 0.0722 * l;
  }
  return s;
}
function Cn(e, t, i) {
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
function Mn(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 1; n < i - 1; n++) {
    const o = (n - 1) * t, r = n * t, a = (n + 1) * t;
    for (let l = 1; l < t - 1; l++) {
      const d = e[o + (l - 1)] ?? 0, c = e[o + l] ?? 0, p = e[o + (l + 1)] ?? 0, u = e[r + (l - 1)] ?? 0, h = e[r + (l + 1)] ?? 0, f = e[a + (l - 1)] ?? 0, g = e[a + l] ?? 0, y = e[a + (l + 1)] ?? 0, v = -d - 2 * u - f + p + 2 * h + y, k = -d - 2 * c - p + f + 2 * g + y;
      let $ = Math.sqrt(v * v + k * k);
      $ < kn && ($ = 0), $ > 255 && ($ = 255), s[r + l] = $;
    }
  }
  return { width: t, height: i, data: s };
}
function Pn(e, t, i) {
  const s = Sn(t, i), n = document.createElement("canvas");
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
function Fn(e, t, i) {
  const { width: s, height: n, rgba: o } = Pn(e, t, i), r = An(o, s, n), a = Cn(r, s, n);
  return Mn(a, s, n);
}
function Nn(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const s = e[i - 1], n = e[i], o = e[i + 1], r = n[0] - s[0], a = n[1] - s[1], l = o[0] - n[0], d = o[1] - n[1];
    r * d - a * l === 0 && Math.sign(r) === Math.sign(l) && Math.sign(a) === Math.sign(d) || t.push(n);
  }
  return t.push(e[e.length - 1]), t;
}
const At = /* @__PURE__ */ new Map();
async function En(e, t = {}) {
  const i = performance.now(), s = t.cellSize ?? ii, n = `${e.imageUrl}|${s}`, o = At.has(n);
  let r = null;
  try {
    r = await In(n, e.imageUrl, s);
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
  const a = Le(e.from, r), l = Le(e.to, r), d = wn(r, a, l);
  return !d || d.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  } : {
    waypoints: Nn(d).slice(1, -1).map((h) => Tn(h, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  };
}
function In(e, t, i) {
  const s = At.get(e);
  if (s) return s;
  const n = On(t, i).catch((o) => {
    throw At.delete(e), o;
  });
  return At.set(e, n), n;
}
async function On(e, t) {
  const i = await zn(e);
  await Ue();
  const s = Fn(i, i.naturalWidth, i.naturalHeight);
  return await Ue(), gn(s, t);
}
function zn(e) {
  return new Promise((t, i) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.decoding = "async", s.onload = () => t(s), s.onerror = () => i(new Error(`Failed to load background image: ${e}`)), s.src = e;
  });
}
function Ue() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function Le(e, t) {
  const i = Be(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), s = Be(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, s];
}
function Tn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function Be(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
var Dn = Object.defineProperty, Rn = Object.getOwnPropertyDescriptor, F = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Rn(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Dn(t, i, n), n;
};
let A = class extends j {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [], this.rubberBand = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = Ye(), this.undoStack = new Fs((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, s = Ws(i, t);
      this.pushPatch(i, s, "edit default background");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = Ks(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = A.KNOWN_WEATHER_STATES.find((n) => !e.has(n)) ?? "custom", i = this.config, s = Pe(i, t, "");
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
          const s = this.config, { config: n, node: o } = Os(s, i, "New node");
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
          }, n = this.config, { config: o, overlay: r } = Xs(n, s);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(n, o, `add overlay ${r.id}`), this.pending = null, this.statusMessage = `Added overlay ${r.id}. Drag to reposition, corner to resize.`;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step === "pick-from" && (this.statusMessage = "Click the source node handle.");
          return;
        }
        this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [], this.customConfigDraft = "", this.customConfigError = "";
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
      r.size > 0 && (this.selectedNodeIds = r, this.selectedNodeId = r.size === 1 ? Array.from(r)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = Array.from(r).slice(0, 2), this.statusMessage = `${r.size} node(s) selected via rubber-band.`);
    }, this.onSegmentClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId, s = Number(t.dataset.segmentIndex);
      if (!(!i || !Number.isFinite(s))) {
        if (e.shiftKey) {
          const n = this.pointerToPercent(e);
          if (!n) return;
          const o = this.config, r = Bs(o, i, s, n);
          this.pushPatch(o, r, `add waypoint to ${i}`);
          return;
        }
        this.selectedFlowId = i, this.selectedNodeId = null, this.selectedOverlayId = null;
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
            ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Me(n, this.pending.fromId, i, s);
            this.pushPatch(n, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
            return;
          }
          this.statusMessage = "Destination must differ from source.";
          return;
        }
        if (e.shiftKey) {
          const s = new Set(this.selectedNodeIds);
          s.has(i) ? s.delete(i) : (this.selectedNodeId && !s.has(this.selectedNodeId) && s.add(this.selectedNodeId), s.add(i)), this.selectedNodeIds = s;
          const n = Array.from(s).slice(0, 2);
          this.suggestNodeIds = n, s.size === 2 ? this.statusMessage = 'Two nodes selected — click "Suggest path" to auto-route, or use bulk actions above.' : s.size > 0 && (this.statusMessage = `${s.size} node(s) selected. Shift+click to add more.`), this.selectedNodeId = s.size === 1 ? i : null, this.selectedFlowId = null, this.selectedOverlayId = null;
          return;
        }
        this.selectedNodeId = i, this.selectedNodeIds = /* @__PURE__ */ new Set([i]), this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [];
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
      const n = this.config, o = Hs(n, i, s);
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
          r = { kind: "node", id: n }, this.selectedNodeIds.has(n) || (this.selectedNodeIds = /* @__PURE__ */ new Set([n]), this.selectedNodeId = n);
      else o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : s && i !== void 0 && (r = { kind: "waypoint", flowId: s, index: Number(i) });
      r && (e.preventDefault(), t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = e.shiftKey, t.kind === "overlay-resize") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, a = (e.clientY - t.startPx.y) / o.height * 100;
        let l = t.startSize.width + r, d = t.startSize.height + a;
        this.dragShiftHeld && (l = Math.round(l), d = Math.round(d)), this.config = Fe(this.config, t.id, { width: l, height: d });
        return;
      }
      const i = this.pointerToPercent(e);
      if (!i) return;
      const s = this.dragShiftHeld ? { x: E($t(i.x)), y: E($t(i.y)) } : i;
      if (t.kind === "node")
        this.config = Is(this.config, t.id, s);
      else if (t.kind === "node-bulk") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, a = (e.clientY - t.startPx.y) / o.height * 100, l = /* @__PURE__ */ new Map();
        for (const [d, c] of t.startPositions) {
          const p = this.dragShiftHeld ? $t(c.x + r) : c.x + r, u = this.dragShiftHeld ? $t(c.y + a) : c.y + a;
          l.set(d, { x: p, y: u });
        }
        this.config = Ts(this.config, l);
      } else t.kind === "overlay" ? this.config = Zs(this.config, t.id, s) : t.kind === "waypoint" && (this.config = Ls(this.config, t.flowId, t.index, s));
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
        case "node-bulk":
          o = `move ${n.ids.length} nodes`;
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
      if (e.key === "Escape") {
        this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.suggestNodeIds = [], this.rubberBand = null;
        return;
      }
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
      this.config = kt(e), this.undoStack.clear(), this.errorMessage = "";
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
    const t = `${1 / (St(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, i = this.config.background.default;
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
          ${Xe(this.stageRef)}
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
  renderFlowConnector(e) {
    if (!this.config) return w;
    const t = new Map(this.config.nodes.map((a) => [a.id, a])), i = t.get(e.from_node), s = t.get(e.to_node);
    if (!i || !s) return w;
    const n = [i.position, ...e.waypoints, s.position], o = e.id === this.selectedFlowId, r = [];
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
          data-flow-id=${e.id}
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
            ></div>` : w}
      </div>
    `;
  }
  renderHandle(e) {
    const t = e.id === this.selectedNodeId, i = this.selectedNodeIds.has(e.id), s = this.suggestNodeIds.includes(e.id), n = e.visible === !1;
    return m`
      <div
        class=${`handle ${t ? "selected" : ""} ${i ? "multi-selected" : ""} ${s ? "suggest-selected" : ""} ${n ? "handle-hidden" : ""}`}
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
        ${s ? m`<span class="suggest-badge">${this.suggestNodeIds.indexOf(e.id) + 1}</span>` : w}
        <button
          class="eye-toggle"
          title=${n ? "Show node" : "Hide node"}
          @click=${(o) => {
      if (o.stopPropagation(), !this.config) return;
      const r = this.config, a = ln(r, e.id, n);
      this.pushPatch(r, a, `${n ? "show" : "hide"} node ${e.id}`);
    }}
        >${n ? "◉" : "◎"}</button>
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
        .value=${e}
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
        const s = this.config, n = sn(s, e.id, i < 1 || i > 0 ? i : void 0);
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
          <div class="row">
            <span>${e.waypoints.length} waypoint(s)</span>
          </div>
          <label>
            Line style
            <select
              .value=${e.line_style ?? "corner"}
              @change=${(t) => {
        if (!this.config) return;
        const i = t.target.value, s = this.config, n = an(s, e.id, i);
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
        const t = W(e.domain ?? this.config.domain), i = at(e, t, e.domain ?? this.config.domain, 1, this.config.domain_colors);
        return m`
                  <input
                    type="color"
                    .value=${e.color ?? i}
                    @change=${(s) => {
          if (!this.config) return;
          const n = s.target.value, o = this.config, r = Ee(o, e.id, n);
          this.pushPatch(o, r, `set colour of ${e.id}`);
        }}
                  />
                  <span class="color-effective">${e.color ? "override" : "domain default"}</span>
                  ${e.color ? m`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, n = Ee(s, e.id, void 0);
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
        const s = this.config, n = nn(s, e.id, i);
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
        const i = t.target.checked, s = this.config, n = Ie(s, e.id, i);
        this.pushPatch(s, n, `${i ? "show" : "hide"} flow ${e.id}`);
      }}
              />
              <span>${e.visible !== !1 ? "shown" : "hidden"}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(e)}
          ${this.renderAnimationSection(e)}
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
    const t = W(e.domain ?? this.config.domain), i = re(e, t), s = e.speed_curve_override ?? {}, n = (a, l, d) => m`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${l}${d ? m` <small>(${d})</small>` : w}</label>
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
        for (const g of Object.keys(s))
          g !== a && (u[g] = s[g]);
        const h = this.config, f = ze(h, e.id, u);
        this.pushPatch(h, f, `update speed curve ${a} for ${e.id}`);
      } else {
        const u = parseFloat(p);
        if (!Number.isFinite(u)) return;
        const h = this.config, f = ze(h, e.id, { ...s, [a]: u });
        this.pushPatch(h, f, `update speed curve ${a} for ${e.id}`);
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
      const a = this.config, l = dn(a, e.id);
      this.pushPatch(a, l, `reset speed curve for ${e.id}`);
    }}>Reset to domain defaults</button>` : w}
        </div>
      </details>
    `;
  }
  renderAnimationSection(e) {
    if (!this.config) return m``;
    const t = e.animation ?? {}, i = t.animation_style ?? "dots", s = (c) => {
      if (!this.config) return;
      const p = this.config, u = pn(p, e.id, c);
      this.pushPatch(p, u, `update animation for ${e.id}`);
    }, o = !(/* @__PURE__ */ new Set(["dash", "pulse", "fluid", "none"])).has(i), r = i === "pulse", a = i === "trail", l = i === "dash", d = e.color ?? "#4ADE80";
    return m`
      <details class="anim-details">
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
          ` : w}

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
          ` : w}

          ${e.animation && Object.keys(e.animation).length > 0 ? m`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const c = this.config, p = un(c, e.id);
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
      const r = t.dash_gap ?? 0.5, a = 14, l = a * r;
      return m`
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
      return m`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (e === "pulse")
      return m`
        ${[40, 90, 140].map(
        (a, l) => m`
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
    const o = Array.from({ length: n }, (r, a) => (a + 0.5) / n * 180 + 10);
    return m`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${o.map(
      (r, a) => m`
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
  renderGlobalAnimationPanel() {
    if (!this.config) return w;
    const e = this.config.animation ?? {};
    return m`
      <details class="panel anim-global-panel">
        <summary>Animation (global)</summary>
        <div class="panel-body">
          <label>
            FPS cap
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(e.fps ?? 60)}
                @change=${(t) => {
      if (!this.config) return;
      const i = parseInt(t.target.value, 10), s = this.config, n = Te(s, { fps: i });
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
      const i = t.target.checked, s = this.config, n = Te(s, { smooth_speed: i });
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
      const o = n.target.checked, r = this.config, a = tn(r, e.id, o);
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
      const r = this.config, a = en(r, e.id, o);
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
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, d = Ne(l, i, a);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, d = Ne(l, i, a);
        this.pushPatch(l, d, `set opacity.${i}`);
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
        const l = a.target.value, d = this.config, c = Oe(d, s, l);
        this.pushPatch(d, c, `set domain_colors.${s}`);
      }}
          />
          <span class="color-picker-value">${o || `${r} (default)`}</span>
          ${o ? m`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, l = Oe(a, s, void 0);
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
        const r = o.target.checked, a = this.config, l = cn(a, i, r);
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
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = Math.max(n.min, Math.min(n.max, a)), d = this.config, c = on(d, i, l);
        this.pushPatch(d, c, `set defaults.${i}`);
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
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.suggestNodeIds = [];
    }}>✕ Deselect</button>
      </div>
    `;
  }
  bulkHide(e) {
    if (!this.config) return;
    const t = this.config, i = Ce(t, e, !1);
    this.pushPatch(t, i, `hide ${e.size} nodes`);
  }
  bulkShow(e) {
    if (!this.config) return;
    const t = this.config, i = Ce(t, e, !0);
    this.pushPatch(t, i, `show ${e.size} nodes`);
  }
  bulkAlignH(e, t) {
    if (!this.config) return;
    const i = this.config, s = Rs(i, e, t);
    this.pushPatch(i, s, `align ${e.size} nodes horizontally`);
  }
  bulkAlignV(e, t) {
    if (!this.config) return;
    const i = this.config, s = Us(i, e, t);
    this.pushPatch(i, s, `align ${e.size} nodes vertically`);
  }
  bulkDelete(e) {
    if (!this.config || !window.confirm(`Delete ${e.size} nodes (and their flows)?`)) return;
    const t = this.config, i = Ds(t, e);
    this.pushPatch(t, i, `delete ${e.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.suggestNodeIds = [];
  }
  renderFlowsListPanel() {
    if (!this.config) return w;
    const e = this.config.flows;
    return m`
      <details class="panel flows-list-panel" ?open=${!0}>
        <summary>Flows (${e.length})</summary>
        <div class="panel-body flows-list-body">
          ${e.length === 0 ? m`<p class="hint-sub">No flows yet. Add nodes first, then add a flow between them.</p>` : e.map((t) => {
      const i = W(t.domain ?? this.config.domain), s = at(t, i, t.domain ?? this.config.domain, 1, this.config.domain_colors), n = t.id === this.selectedFlowId, o = t.visible === !1;
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
        const a = this.config, l = Ie(a, t.id, o);
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
        const n = this.config, o = Gs(n, s || void 0);
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
      const o = this.config, r = qs(o, n * 1e3);
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
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), i = this.config, s = Vs(i, t || void 0);
    this.pushPatch(i, s, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const s = this.config, n = rn(s, e, i);
    n !== s && this.pushPatch(s, n, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, s = this.config, n = Pe(s, e, i);
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
      const n = await En({
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
    ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = Me(n, e, t, s), a = {
      ...o,
      flows: o.flows.map(
        (l) => l.id === r.id ? { ...l, waypoints: i.map((d) => ({ x: d.x, y: d.y })) } : l
      )
    };
    this.suggestPreview = null, this.suggestNodeIds = [], this.selectedFlowId = r.id, this.selectedNodeId = null, this.statusMessage = `Created flow ${r.id} with ${i.length} waypoint(s).`, this.pushPatch(n, a, `suggest-path ${r.id}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.suggestNodeIds = [], this.statusMessage = "Suggestion dismissed.";
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
    const s = (this.config.overlays ?? []).find((l) => l.id === e);
    if (!s) return;
    const n = s.size ?? { width: 20, height: 15 }, o = Number(i.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, a = Fe(r, e, { ...n, [t]: o });
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
      const n = Qs(s, e, i), o = kt(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: s, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = Js(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = zs(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = js(t, e);
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
      const s = kt(t);
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
A.styles = Et`
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
    .handle.multi-selected .handle-dot {
      box-shadow: 0 0 0 2px rgba(0,0,0,0.4), 0 0 0 5px #fff, 0 0 0 7px rgba(3,169,244,0.7);
    }
    .handle.suggest-selected .handle-dot {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 6px #f59e0b;
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
  `;
F([
  T({ attribute: !1 })
], A.prototype, "hass", 2);
F([
  M()
], A.prototype, "config", 2);
F([
  M()
], A.prototype, "pending", 2);
F([
  M()
], A.prototype, "previewMode", 2);
F([
  M()
], A.prototype, "selectedNodeId", 2);
F([
  M()
], A.prototype, "selectedNodeIds", 2);
F([
  M()
], A.prototype, "selectedFlowId", 2);
F([
  M()
], A.prototype, "selectedOverlayId", 2);
F([
  M()
], A.prototype, "suggestNodeIds", 2);
F([
  M()
], A.prototype, "rubberBand", 2);
F([
  M()
], A.prototype, "customConfigDraft", 2);
F([
  M()
], A.prototype, "customConfigError", 2);
F([
  M()
], A.prototype, "statusMessage", 2);
F([
  M()
], A.prototype, "errorMessage", 2);
F([
  M()
], A.prototype, "canUndo", 2);
F([
  M()
], A.prototype, "canRedo", 2);
F([
  M()
], A.prototype, "undoLabel", 2);
F([
  M()
], A.prototype, "redoLabel", 2);
F([
  M()
], A.prototype, "suggestPreview", 2);
F([
  M()
], A.prototype, "suggestBusy", 2);
A = F([
  Ot("flowme-card-editor")
], A);
var Un = Object.defineProperty, Ln = Object.getOwnPropertyDescriptor, Q = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ln(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Un(t, i, n), n;
};
const Bn = "1.0.13", He = 5e3;
console.info(
  `%c flowme %c v${Bn} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function Hn(e) {
  if (!e) return "";
  const t = [], i = (s, n) => {
    const o = e[s];
    o !== void 0 && t.push(`${n}:${o};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), t.join("");
}
function jn(e) {
  if (!e) return "";
  const t = [], i = (s, n) => {
    e[s] === !1 && t.push(`${n}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), t.join("");
}
let R = class extends j {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = Ye(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e) {
      const i = this.config, s = [
        ...i?.flows.map((a) => a.entity) ?? [],
        ...i?.nodes.map((a) => a.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((a) => typeof a == "string" && a.length > 0), n = {};
      for (const a of s)
        n[a] = e.states[a]?.state;
      N("hass setter called. config entity states:", n);
      const o = i?.background.weather_entity;
      if (o) {
        const a = t?.states[o]?.state, l = e.states[o]?.state;
        N("[weather] state:", l, "(was:", a, ")"), a !== l && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const a = t?.states[r]?.state, l = e.states[r]?.state;
        a !== l && (N("[sun] state changed:", a, "→", l), this.syncWeatherBackground());
      }
    } else
      N("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    try {
      const t = kt(e);
      os(t.debug ?? !1), N("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), N("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof ie ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), N("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    N("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), N("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), super.disconnectedCallback();
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = xs(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(t, i).catch((s) => {
        N("renderer init failed — falling back to SVG renderer", s), this.teardownRenderer(), this.renderer = new Kt(), this.rendererReadyFor = i, this.renderer.init(t, i).catch((n) => {
          console.error("[flowme] SVG renderer init also failed", n);
        });
      });
    }
    if (e.has("hass") && this.renderer && this.hass) {
      N("willUpdate hass-changed → pushing values for", this.config.flows.length, "flow(s) to renderer", this.renderer.constructor.name);
      for (const i of this.config.flows) {
        const s = this.hass.states[i.entity], n = $e(s?.state), o = W(i.domain ?? this.config.domain), r = s?.attributes?.unit_of_measurement, a = Yi(n, r, o.unit_scale);
        if (N(
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
            this.warnedMissing.has(l) || (this.warnedMissing.add(l), N(`flow "${i.id}" entity "${i.entity}" is currently ${s.state} — no flow will render until it reports a number`));
          }
        } else {
          const l = `${i.id}:${i.entity}`;
          this.warnedMissing.has(l) || (this.warnedMissing.add(l), N(`flow "${i.id}" references entity "${i.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        this.renderer.updateFlow(i.id, a.value);
      }
    }
    (e.has("config") || e.has("hass")) && this.syncWeatherBackground();
  }
  getCardSize() {
    const e = St(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = St(this.config?.aspect_ratio) ?? 1.6;
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
    const i = `${1 / (St(e.aspect_ratio) ?? 16 / 10) * 100}%`, s = e.background.transition_duration ?? He, n = Hn(e.opacity), o = jn(e.visibility);
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
          <div class="renderer-mount" ${Xe(this.rendererMount)}></div>
          ${e.nodes.map((r) => this.renderNodeHandle(r))}
          ${(e.overlays ?? []).map((r) => (N("rendering overlay →", r.type, "position=", r.position, "size=", r.size), ks(r, this.hass)))}
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
        const i = t.state, s = e.sun_entity ? this.hass.states[e.sun_entity]?.state : void 0, n = Xi(i, s, e.weather_states, e.default);
        let o = i;
        return s === "below_horizon" && !i.endsWith("-night") && (o = `${i}-night`), N("[FlowMe] sun:", s, "weather:", i, "→ lookup key:", o, "→ image:", n !== e.default ? n : "default"), n;
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
    const t = this.config.background.transition_duration ?? He;
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, s = e.show_label !== !1 && !!e.label, n = W(this.config?.domain), o = e.color ?? this.nodeFlowColor(e.id) ?? n.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let a = "";
    if (t) {
      const d = $e(t.state), c = t.attributes?.unit_of_measurement ?? "";
      c ? a = `${this.formatSensorNumber(d)} ${c}` : a = n.describe(d);
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
      const r = W(o.domain ?? t), a = at(o, r, o.domain ?? t, 1, i), l = a.toLowerCase();
      n.has(l) || (n.add(l), s || (s = a));
    }
    if (n.size !== 0)
      return n.size === 1 ? s : is;
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
R.styles = Et`
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
  T({ attribute: !1 })
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
  Ot("flowme-card")
], R);
const Jt = window;
Jt.customCards = Jt.customCards ?? [];
Jt.customCards.push({
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
