/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = globalThis, bt = Oe.ShadowRoot && (Oe.ShadyCSS === void 0 || Oe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), Ft = /* @__PURE__ */ new WeakMap();
let Ii = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (bt && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = Ft.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Ft.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Yi = (t) => new Ii(typeof t == "string" ? t : t + "", void 0, yt), vt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, n, s) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new Ii(i, t, yt);
}, Zi = (t, e) => {
  if (bt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), n = Oe.litNonce;
    n !== void 0 && o.setAttribute("nonce", n), o.textContent = i.cssText, t.appendChild(o);
  }
}, Mt = bt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return Yi(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xi, defineProperty: qi, getOwnPropertyDescriptor: Ji, getOwnPropertyNames: Qi, getOwnPropertySymbols: eo, getPrototypeOf: to } = Object, J = globalThis, Pt = J.trustedTypes, io = Pt ? Pt.emptyScript : "", oo = J.reactiveElementPolyfillSupport, $e = (t, e) => t, Ge = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? io : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, wt = (t, e) => !Xi(t, e), Nt = { attribute: !0, type: String, converter: Ge, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), J.litPropertyMetadata ?? (J.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let de = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Nt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), n = this.getPropertyDescriptor(e, o, i);
      n !== void 0 && qi(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: n, set: s } = Ji(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const l = n?.call(this);
      s?.call(this, r), this.requestUpdate(e, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty($e("elementProperties"))) return;
    const e = to(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($e("properties"))) {
      const i = this.properties, o = [...Qi(i), ...eo(i)];
      for (const n of o) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [o, n] of i) this.elementProperties.set(o, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const n = this._$Eu(i, o);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const n of o) i.unshift(Mt(n));
    } else e !== void 0 && i.push(Mt(e));
    return i;
  }
  static _$Eu(e, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, o) {
    this._$AK(e, o);
  }
  _$ET(e, i) {
    const o = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, o);
    if (n !== void 0 && o.reflect === !0) {
      const s = (o.converter?.toAttribute !== void 0 ? o.converter : Ge).toAttribute(i, o.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const o = this.constructor, n = o._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = o.getPropertyOptions(n), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ge;
      this._$Em = n;
      const l = r.fromAttribute(i, s.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, n = !1, s) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (s = this[e]), o ?? (o = r.getPropertyOptions(e)), !((o.hasChanged ?? wt)(s, i) || o.useDefault && o.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: n, wrapped: s }, r) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? i ?? this[e]), s !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, s] of o) {
        const { wrapped: r } = s, l = this[n];
        r !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, s, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[$e("elementProperties")] = /* @__PURE__ */ new Map(), de[$e("finalized")] = /* @__PURE__ */ new Map(), oo?.({ ReactiveElement: de }), (J.reactiveElementVersions ?? (J.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis, Bt = (t) => t, We = _e.trustedTypes, Et = We ? We.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Si = "$lit$", q = `lit$${Math.random().toFixed(9).slice(2)}$`, ki = "?" + q, no = `<${ki}>`, ne = document, Ie = () => ne.createComment(""), Se = (t) => t === null || typeof t != "object" && typeof t != "function", xt = Array.isArray, so = (t) => xt(t) || typeof t?.[Symbol.iterator] == "function", Xe = `[ 	
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Rt = /-->/g, Dt = />/g, ee = RegExp(`>|${Xe}(?:([^\\s"'>=/]+)(${Xe}*=${Xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, zt = /"/g, Fi = /^(?:script|style|textarea|title)$/i, Mi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), b = Mi(1), Ot = Mi(2), pe = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), ie = ne.createTreeWalker(ne, 129);
function Pi(t, e) {
  if (!xt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Et !== void 0 ? Et.createHTML(e) : e;
}
const ro = (t, e) => {
  const i = t.length - 1, o = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = be;
  for (let l = 0; l < i; l++) {
    const a = t[l];
    let d, p, h = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, p = r.exec(a), p !== null); ) u = r.lastIndex, r === be ? p[1] === "!--" ? r = Rt : p[1] !== void 0 ? r = Dt : p[2] !== void 0 ? (Fi.test(p[2]) && (n = RegExp("</" + p[2], "g")), r = ee) : p[3] !== void 0 && (r = ee) : r === ee ? p[0] === ">" ? (r = n ?? be, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? ee : p[3] === '"' ? zt : Lt) : r === zt || r === Lt ? r = ee : r === Rt || r === Dt ? r = be : (r = ee, n = void 0);
    const f = r === ee && t[l + 1].startsWith("/>") ? " " : "";
    s += r === be ? a + no : h >= 0 ? (o.push(d), a.slice(0, h) + Si + a.slice(h) + q + f) : a + q + (h === -2 ? l : f);
  }
  return [Pi(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class ke {
  constructor({ strings: e, _$litType$: i }, o) {
    let n;
    this.parts = [];
    let s = 0, r = 0;
    const l = e.length - 1, a = this.parts, [d, p] = ro(e, i);
    if (this.el = ke.createElement(d, o), ie.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = ie.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Si)) {
          const u = p[r++], f = n.getAttribute(h).split(q), g = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: s, name: g[2], strings: f, ctor: g[1] === "." ? lo : g[1] === "?" ? co : g[1] === "@" ? po : Ve }), n.removeAttribute(h);
        } else h.startsWith(q) && (a.push({ type: 6, index: s }), n.removeAttribute(h));
        if (Fi.test(n.tagName)) {
          const h = n.textContent.split(q), u = h.length - 1;
          if (u > 0) {
            n.textContent = We ? We.emptyScript : "";
            for (let f = 0; f < u; f++) n.append(h[f], Ie()), ie.nextNode(), a.push({ type: 2, index: ++s });
            n.append(h[u], Ie());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ki) a.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(q, h + 1)) !== -1; ) a.push({ type: 7, index: s }), h += q.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const o = ne.createElement("template");
    return o.innerHTML = e, o;
  }
}
function ue(t, e, i = t, o) {
  if (e === pe) return e;
  let n = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const s = Se(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(t), n._$AT(t, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = n : i._$Cl = n), n !== void 0 && (e = ue(t, n._$AS(t, e.values), n, o)), e;
}
class ao {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: o } = this._$AD, n = (e?.creationScope ?? ne).importNode(i, !0);
    ie.currentNode = n;
    let s = ie.nextNode(), r = 0, l = 0, a = o[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new Pe(s, s.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (d = new uo(s, this, e)), this._$AV.push(d), a = o[++l];
      }
      r !== a?.index && (s = ie.nextNode(), r++);
    }
    return ie.currentNode = ne, n;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class Pe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, o, n) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = ue(this, e, i), Se(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== pe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : so(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $ && Se(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ne.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: o } = e, n = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = ke.createElement(Pi(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const s = new ao(n, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Ht.get(e.strings);
    return i === void 0 && Ht.set(e.strings, i = new ke(e)), i;
  }
  k(e) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, n = 0;
    for (const s of e) n === i.length ? i.push(o = new Pe(this.O(Ie()), this.O(Ie()), this, this.options)) : o = i[n], o._$AI(s), n++;
    n < i.length && (this._$AR(o && o._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const o = Bt(e).nextSibling;
      Bt(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ve {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, n, s) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = s, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = $;
  }
  _$AI(e, i = this, o, n) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) e = ue(this, e, i, 0), r = !Se(e) || e !== this._$AH && e !== pe, r && (this._$AH = e);
    else {
      const l = e;
      let a, d;
      for (e = s[0], a = 0; a < s.length - 1; a++) d = ue(this, l[o + a], i, a), d === pe && (d = this._$AH[a]), r || (r = !Se(d) || d !== this._$AH[a]), d === $ ? e = $ : e !== $ && (e += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class lo extends Ve {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}
class co extends Ve {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $);
  }
}
class po extends Ve {
  constructor(e, i, o, n, s) {
    super(e, i, o, n, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = ue(this, e, i, 0) ?? $) === pe) return;
    const o = this._$AH, n = e === $ && o !== $ || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, s = e !== $ && (o === $ || n);
    n && this.element.removeEventListener(this.name, this, o), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class uo {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ue(this, e);
  }
}
const ho = _e.litHtmlPolyfillSupport;
ho?.(ke, Pe), (_e.litHtmlVersions ?? (_e.litHtmlVersions = [])).push("3.3.2");
const fo = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let n = o._$litPart$;
  if (n === void 0) {
    const s = i?.renderBefore ?? null;
    o._$litPart$ = n = new Pe(e.insertBefore(Ie(), s), s, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis;
let oe = class extends de {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = fo(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return pe;
  }
};
oe._$litElement$ = !0, oe.finalized = !0, Ae.litElementHydrateSupport?.({ LitElement: oe });
const go = Ae.litElementPolyfillSupport;
go?.({ LitElement: oe });
(Ae.litElementVersions ?? (Ae.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mo = { attribute: !0, type: String, converter: Ge, reflect: !1, hasChanged: wt }, bo = (t = mo, e, i) => {
  const { kind: o, metadata: n } = i;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), o === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, t, l), l;
    } };
  }
  if (o === "setter") {
    const { name: r } = i;
    return function(l) {
      const a = this[r];
      e.call(this, l), this.requestUpdate(r, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function Ne(t) {
  return (e, i) => typeof i == "object" ? bo(t, e, i) : ((o, n, s) => {
    const r = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, o), r ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(t) {
  return Ne({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yo = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vo = { CHILD: 2 }, wo = (t) => (...e) => ({ _$litDirective$: t, values: e });
class xo {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, o) {
    this._$Ct = e, this._$AM = i, this._$Ci = o;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = (t, e) => {
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const o of i) o._$AO?.(e, !1), Ce(o, e);
  return !0;
}, Ue = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while (i?.size === 0);
}, Ni = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), Ao(e);
  }
};
function $o(t) {
  this._$AN !== void 0 ? (Ue(this), this._$AM = t, Ni(this)) : this._$AM = t;
}
function _o(t, e = !1, i = 0) {
  const o = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(o)) for (let s = i; s < o.length; s++) Ce(o[s], !1), Ue(o[s]);
  else o != null && (Ce(o, !1), Ue(o));
  else Ce(this, t);
}
const Ao = (t) => {
  t.type == vo.CHILD && (t._$AP ?? (t._$AP = _o), t._$AQ ?? (t._$AQ = $o));
};
class Co extends xo {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, o) {
    super._$AT(e, i, o), Ni(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), i && (Ce(this, e), Ue(this));
  }
  setValue(e) {
    if (yo(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = e, this._$Ct._$AI(i, this, 0);
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
const Z = () => new Io();
class Io {
}
const qe = /* @__PURE__ */ new WeakMap(), X = wo(class extends Co {
  render(t) {
    return $;
  }
  update(t, [e]) {
    const i = e !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = e, this.ht = t.options?.host, this.rt(this.ct = t.element)), $;
  }
  rt(t) {
    if (this.isConnected || (t = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let i = qe.get(e);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), qe.set(e, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    return typeof this.G == "function" ? qe.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Fe = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], lt = ["corner", "diagonal", "curve", "smooth"], ct = ["dots", "dash", "arrow", "trail", "fluid", "none"], dt = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], pt = ["auto", "forward", "reverse", "both"], ut = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], So = {
  card: {
    connectionLost: "Connection lost",
    reconnected: "Reconnected",
    actionFailed: "Action failed — please retry",
    loading: "Loading...",
    invalidConfigurationTitle: "flowme: invalid configuration",
    noConnection: "no connection",
    entityNotFound: "entity not found",
    error: "Error",
    hacsDescription: "Animated flow visualisation over a custom background image"
  },
  security: {
    unsafeUrlInCard: (t, e) => `Unsafe URL scheme '${t}' in ${e}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  },
  overlays: {
    haHelpersUnavailable: "HA card helpers unavailable",
    migrationPrefix: "⚠"
  },
  editor: {
    hintNoConfig: 'No configuration loaded yet. Use "Show code editor" to paste YAML.',
    canvas: {
      ariaLabel: "FlowMe visual editor canvas",
      addNodeAria: "Add node — then click canvas to place",
      addFlowAria: "Add flow between two nodes",
      addOverlayAria: "Add overlay card",
      saveAria: "Save configuration to Home Assistant",
      saveTitle: "Apply current configuration to the card",
      cancelAria: "Discard editor changes",
      cancelTitle: "Discard all changes since the editor opened",
      selectTypeAria: "Select element type",
      selectElementAria: "Select element",
      undoTitleWithDesc: (t) => `Undo: ${t} (Ctrl+Z)`,
      undoTitlePlain: "Undo (Ctrl+Z)",
      redoTitleWithDesc: (t) => `Redo: ${t} (Ctrl+Shift+Z)`,
      redoTitlePlain: "Redo (Ctrl+Shift+Z)",
      overlayOption: (t, e) => `Overlay ${t + 1}${e}`,
      overlayOptionIdPart: (t) => ` (${t})`
    },
    toolbar: {
      undo: "Undo",
      redo: "Redo",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      fitCanvas: "Fit to canvas",
      addNode: "+ Node",
      addFlow: "+ Flow",
      addOverlay: "+ Overlay",
      save: "Save",
      cancel: "Cancel",
      suggestPath: "Suggest path",
      suggestPathFinding: "Finding path…",
      hide: "Hide",
      acceptPath: "Accept suggested path",
      cancelPath: "Cancel suggested path",
      alignHorizontal: "Align horizontal",
      alignVertical: "Align vertical",
      alignHorizontalShort: "Align H",
      alignVerticalShort: "Align V",
      showSelected: "Show",
      hideSelected: "Hide",
      deleteSelected: "Delete",
      hideSelectedNodesAria: "Hide selected nodes",
      showSelectedNodesAria: "Show selected nodes",
      alignSelectedHorizontalAria: "Align selected nodes horizontally",
      alignSelectedVerticalAria: "Align selected nodes vertically",
      deleteSelectedNodesAria: "Delete selected nodes",
      clearMultiSelectionAria: "Clear multi-selection",
      deselect: "✕ Deselect",
      selectType: "Select type…",
      selectElement: "Select element…",
      selectElementDash: "—",
      nodes: "Nodes",
      flows: "Flows",
      overlays: "Overlays"
    },
    nodeEffect: {
      section: "Node effect",
      active: "This node has a visual effect",
      type: "Effect type",
      none: "None",
      glow: "Glow",
      badge: "Badge",
      ripple: "Ripple",
      alert: "Alert",
      glowColor: "Glow colour",
      glowMaxRadius: "Glow max radius (px)",
      glowMinIntensity: "Minimum glow intensity",
      peakValue: "Peak sensor value",
      badgeColorOn: "Badge on colour",
      badgeColorOff: "Badge off colour",
      threshold: "Numeric threshold",
      rippleColor: "Ripple colour",
      rippleDuration: "Ripple cycle (ms)",
      rippleThreshold: "Ripple min value",
      alertThreshold: "Alert threshold",
      alertCondition: "Condition",
      alertColor: "Alert colour",
      alertFrequency: "Flash frequency (Hz)",
      alertHysteresis: "Hysteresis (fraction)",
      above: "Above",
      below: "Below",
      needsEntity: "Choose an entity — node effects use live sensor state."
    },
    standaloneToolbar: {
      addNodeTitle: "Add node",
      addFlowTitle: "Add flow",
      addOverlayTitle: "Add overlay",
      suggestDisabled: "Shift+click exactly two nodes to suggest a path between them",
      suggestEnabled: "Create a new flow with auto-routed waypoints between the two selected nodes",
      undoTitleWithDesc: (t) => `Undo: ${t}`,
      undoTitlePlain: "Undo (⌘Z)",
      redoTitleWithDesc: (t) => `Redo: ${t}`,
      redoTitlePlain: "Redo (⌘⇧Z)",
      togglePreviewTitle: "Toggle preview animations",
      editing: "Editing",
      preview: "Preview",
      keyboardHint: "Shift+click node = select for path · Shift+drag = snap · right-click to delete",
      saveTitle: "Apply to card config"
    },
    inspector: {
      node: "Node",
      flow: "Flow",
      overlay: "Overlay",
      label: "Label",
      flowIdField: "Flow id",
      overlayIdField: "Overlay id",
      entity: "Entity",
      colour: "Colour",
      visible: "Visible",
      opacity: "Opacity",
      positionX: "X %",
      positionY: "Y %",
      size: "Size",
      sizePx: "Size px",
      showValue: "Show value",
      showLabel: "Show label",
      deleteNode: "Delete node",
      deleteFlow: "Delete flow",
      deleteOverlay: "Delete overlay",
      lineStyle: "Line style",
      animation: "Animation",
      waypoints: "Waypoints",
      waypointCount: (t) => String(t),
      addWaypoint: "+ Add waypoint",
      deleteWaypoint: "Delete waypoint",
      deleteWaypointAria: (t) => `Delete waypoint ${t + 1}`,
      addWaypointOnFlowAria: "Add waypoint on flow",
      speedCurve: "Speed curve",
      speedCurveOverrideSummary: "Speed curve override",
      resetToDefaults: "Reset to defaults",
      resetToDomainDefaults: "Reset to domain defaults",
      valueGradient: "Value gradient",
      enableGradient: "Enable value gradient",
      removeGradient: "Remove gradient",
      fluidIgnoresParticleShape: "Fluid style uses a flowing gradient along the line — particle shape is ignored.",
      particleSpacing: "Particle spacing",
      cardConfig: "Card configuration (any HA card YAML)",
      invalidYaml: "Invalid YAML",
      invalidCardJson: (t) => `Invalid JSON: ${t}`,
      width: "Width %",
      height: "Height %",
      nodeHeading: (t) => `Node: ${t}`,
      flowHeading: (t) => `Flow: ${t}`,
      overlayHeading: (t) => `Overlay: ${t}`,
      routeAndSensor: "Route and sensor",
      fromNode: "From node",
      toNode: "To node",
      fromToSameError: "From and To must be different nodes",
      colourOverride: "Colour override",
      colourOverrideActive: "override",
      colourDomainDefault: "domain default",
      clearColour: "Clear",
      flowOpacity: "Flow opacity",
      shown: "shown",
      hidden: "hidden",
      flowVisible: "Visible",
      speedCurveHint: (t, e) => `Leave blank to use domain profile defaults. Domain: ${t} (${e})`,
      previewAtPoints: "Preview (at threshold / p50 / peak):",
      threshold: "Threshold",
      medianP50: "Median (p50)",
      peak: "Peak",
      maxDuration: "Max duration",
      minDuration: "Min duration",
      steepness: "Steepness",
      ms: "ms",
      k: "k",
      style: "Style",
      particleShape: "Particle shape",
      svgPathLabel: "SVG path (d= attribute)",
      svgPathPlaceholder: "M 0 -8 L 5 8 L -5 8 Z",
      direction: "Direction",
      particleSize: "Particle size",
      particleCount: "Particle count",
      profileDefaultPlaceholder: "profile default",
      glowIntensity: "Glow intensity",
      shimmerThreshold: "Shimmer at threshold",
      flicker: "Flicker (random opacity variation)",
      trailLength: "Trail length",
      dashGapRatio: "Dash gap ratio",
      clusterSize: "Cluster size",
      clusterGap: "Cluster gap (×)",
      pulseFrequencyHz: "Pulse frequency (Hz)",
      pulseRatio: "Pulse ratio",
      waveFrequency: "Wave frequency",
      waveAmplitudePx: "Wave amplitude (px)",
      waveAmplitude01: "Wave amplitude (0–1)",
      gradientEntity: "Gradient entity",
      gradientEntityPlaceholder: "sensor.my_temperature",
      lowValue: "Low value",
      highValue: "High value",
      lowColour: "Low colour",
      highColour: "High colour",
      applyGradientTo: "Apply gradient to",
      gradientModeFlow: "Particles only",
      gradientModeLine: "Line only",
      gradientModeBoth: "Particles and line",
      waypointEmpty: "No waypoints — click on the flow line to add one.",
      waypointSectionHash: "#",
      waypointCoordX: "x%",
      waypointCoordY: "y%",
      animationGlobalSummary: "Animation (global)",
      fpsCap: "FPS cap",
      fpsSuffix: "fps",
      smoothSpeedHint: "Smooth speed: interpolates duration changes over 500ms instead of restarting abruptly.",
      on: "on",
      off: "off",
      applyCardConfig: "Apply card config",
      cardConfigPlaceholder: `type: entity
entity: sensor.my_sensor`,
      cardConfigHintExamples: "Any installed HA card type is supported. Examples: entity, tile, gauge, picture-entity, custom:mini-graph-card, …",
      cardConfigHintUrls: "URLs must not use javascript:, vbscript:, data: or file: schemes.",
      opacitySummary: "Opacity",
      opacityHint: 'Adjust opacity for each visual layer. 1.0 = fully opaque, 0.0 = invisible. "Darken" is 0 by default (no darkening overlay).',
      opacityBackground: "Background image",
      opacityDarken: "Background darkening (0=none, 1=black)",
      opacityNodes: "Nodes",
      opacityFlows: "Flow lines",
      opacityDots: "Animated dots",
      opacityGlow: "Glow effect",
      opacityLabels: "Labels",
      opacityValues: "Values",
      opacityOverlays: "Overlays (all)",
      domainColoursSummary: "Domain colours",
      domainColoursHint: "Override default colours for each role in the selected domain. Changes apply to all flows unless a per-flow colour is set.",
      colourDefaultSuffix: (t) => `${t} (default)`,
      reset: "Reset",
      visibilitySummary: "Visibility",
      visibilityHint: "Binary show/hide for each rendering layer. Independent of opacity.",
      visibilityFlowLines: "Flow lines",
      visibilityAnimatedDots: "Animated dots",
      visibilityVisible: "visible",
      visibilityHidden: "hidden",
      defaultsSummary: "Defaults",
      defaultsHint: "Card-level rendering defaults. All fields are optional — omitting them keeps the built-in values shown in parentheses.",
      burstTriggerRatio: "Burst trigger ratio (0–1)",
      burstSustainMs: "Burst sustain (ms)",
      burstMaxParticles: "Burst max particles",
      multiselectCount: (t) => `${t} nodes selected`,
      suggestPathBetweenAria: "Suggest path between two selected nodes",
      suggestPathBetweenTitle: "Suggest path between selected nodes",
      suggestPathPickTwoTitle: "Select exactly 2 nodes to suggest a path",
      deleteNodesConfirm: (t) => `Delete ${t} nodes (and their flows)?`,
      deleteOverlayConfirm: (t) => `Delete overlay ${t}?`,
      deleteNodeContextConfirm: (t) => `Delete node ${t}? This also removes any flows using it.`,
      weatherPanelSummary: "Backgrounds & weather",
      defaultImageUrl: "Default image URL",
      defaultBgPlaceholder: "/local/flowme/house.jpg",
      defaultBgAlt: "default background",
      weatherEntityOptional: "Weather entity (optional)",
      weatherPlaceholder: "weather.forecast_home",
      currentState: "Current state:",
      weatherMatched: "matched",
      weatherNoMapping: "no mapping (using default)",
      sunEntityOptional: "Sun entity (optional) — enables automatic night background variants",
      sunPlaceholder: "sun.sun",
      sunAbove: "☀️ above horizon",
      sunBelow: "🌙 below horizon",
      sunStateLabel: "Sun:",
      fadeTransitionSeconds: "Fade transition (seconds)",
      weatherStateColumn: "State",
      weatherImageUrlColumn: "Image URL",
      weatherRowPlaceholder: "/local/flowme/rainy.jpg",
      remove: "Remove",
      addWeatherState: "+ Add weather state",
      metNoReferenceSummary: "Standard Met.no state list (for reference)",
      metNoHint: "Any state string is accepted — custom integrations can use any key. State strings are matched exactly as Home Assistant provides them (lowercase, hyphenated).",
      suggestCorsError: "Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.",
      suggestAutoRouteFailed: (t) => `Auto-route failed: ${t}`,
      flowEntityPrompt: "Entity for this flow (e.g. sensor.grid_power):",
      flowEntityDefault: "sensor.placeholder_entity",
      suggestPreviewWaypoints: (t) => `Preview — ${t} waypoint(s)`,
      accept: "Accept",
      newNodeDefaultLabel: "New node",
      entityPickerFallbackPlaceholder: "entity.id",
      showNode: "Show node",
      hideNode: "Hide node"
    },
    stateA: {
      domainSummary: "Diagram domain",
      domain: "Domain",
      domainOption: {
        energy: "Energy",
        water: "Water",
        network: "Network",
        hvac: "HVAC",
        gas: "Gas",
        generic: "Generic"
      },
      background: "Background",
      appearance: "Appearance",
      defaults: "Defaults",
      backgroundImage: "Background image URL",
      weatherEntity: "Weather entity",
      sunEntity: "Sun entity (optional)",
      transitionDuration: "Transition duration (seconds)",
      addWeatherMapping: "Add mapping",
      weatherState: "Weather state",
      imageUrl: "Image URL",
      domainColours: "Domain colours",
      solar: "Solar",
      grid: "Grid",
      battery: "Battery",
      load: "Load",
      nodeRadius: "Node radius (px)",
      dotRadius: "Dot radius (px)",
      lineWidth: "Line width (px)",
      fps: "FPS cap",
      smoothSpeed: "Smooth speed transitions"
    },
    suggestBar: {
      message: "Suggested path ready — accept or cancel"
    },
    domainRoles: {
      energy: {
        solar: "Solar",
        grid: "Grid",
        battery: "Battery",
        load: "Load"
      },
      water: {
        supply: "Supply",
        drain: "Drain",
        storage: "Storage",
        transfer: "Transfer"
      },
      network: {
        upload: "Upload",
        download: "Download",
        local: "Local",
        external: "External"
      },
      hvac: {
        supply: "Supply air",
        return: "Return air",
        fresh: "Fresh air",
        exhaust: "Exhaust"
      },
      gas: {
        inlet: "Inlet",
        outlet: "Outlet",
        bypass: "Bypass",
        vent: "Vent"
      },
      generic: {
        flow1: "Flow 1",
        flow2: "Flow 2",
        flow3: "Flow 3",
        flow4: "Flow 4"
      }
    },
    errors: {
      invalidCardConfig: "Invalid card config",
      noFlowSelected: "Select a flow to edit",
      noNodeSelected: "Select a node to edit",
      renameIdConflict: "That id is already in use — choose a unique id."
    }
  },
  aria: {
    card: "FlowMe energy flow visualisation",
    nodeHandle: (t, e, i) => `Node ${t} at ${e.toFixed(1)}%, ${i.toFixed(1)}%`,
    waypointHandle: (t, e) => `Waypoint ${t + 1} of flow ${e}`,
    flowGroup: (t, e) => `${t}: ${e}`,
    overlayHandle: (t) => `Overlay ${t}`,
    readingWithTitle: (t, e) => `${t}: ${e}`
  },
  validation: {
    configMustBeObject: "config must be an object",
    mustBeObjectWithXY: "must be an object with x and y",
    mustBeFiniteNumber: "must be a finite number",
    percentRange: (t) => `must be in range 0-100, got ${t}`,
    mustBeNonEmptyString: "must be a non-empty string",
    urlMustStartWith: (t, e) => `must start with one of ${t} (got "${e}")`,
    mustBeObject: "must be an object",
    mustBeNonEmptyId: "must be a non-empty string",
    duplicateNodeId: (t) => `duplicate node id "${t}"`,
    duplicateFlowId: (t) => `duplicate flow id "${t}"`,
    unknownNodeRef: (t) => `references unknown node "${t}"`,
    mustBeNonEmptyEntityId: "must be a non-empty entity id",
    waypointsMustBeArray: "must be an array (may be empty or omitted)",
    mustBeOneOf: (t) => `must be one of ${t}`,
    speedMultiplierRange: "must be between 0.1 and 5.0",
    mustBeBoolean: "must be a boolean",
    mustBeString: "must be a string",
    invalidNodeEffectType: "node_effect.type must be glow, badge, ripple, or alert",
    positiveFinite: "must be a positive finite number",
    durationMin50: "must be a finite number ≥ 50 (milliseconds)",
    minLtMaxDuration: "min_duration must be < max_duration",
    unknownKey: (t) => `unknown key (allowed: ${t})`,
    defaultsMustBeObject: "must be an object",
    burstTriggerMax1: "must be ≤ 1 (it is a fraction of peak)",
    opacity01: "must be a number between 0 and 1",
    opacityRootMustBeObject: "must be an object",
    mustBeSvgPathString: "must be a string (SVG path d= attribute)",
    mustBeAtMost: (t) => `must be ≤ ${t}`,
    particleCountInt: "must be a positive integer ≥ 1",
    glowNonNegative: "must be a non-negative finite number",
    dashGapRange: "must be a number between 0 and 10",
    pulseRatioRange: "must be a number between 0 (exclusive) and 1 (exclusive)",
    mustBeHexColor: 'must be a CSS hex colour string, e.g. "#FF4500" or "#f00"',
    mustBeStringEntityId: "must be a string entity id",
    finiteNumber: "must be a finite number",
    gradientMode: "must be one of: flow, line, both",
    animationRootMustBeObject: "must be an object",
    fpsRange: "must be a number between 1 and 120",
    visibilityRootMustBeObject: "must be an object",
    domainColorsRootMustBeObject: "must be an object",
    stringColourValue: "must be a string colour value",
    typeMustBeFlowme: (t) => `must equal "custom:flowme-card" (got "${t}")`,
    backgroundWhenProvided: "must be an object when provided",
    weatherStatesMapping: "must be an object mapping state strings to image URLs",
    sunEntityExample: "must be a string entity id (e.g. sun.sun)",
    transitionMustBeNumberMs: "must be a number (milliseconds)",
    nodesMustBeArray: "must be an array",
    atLeastOneNode: "at least one node is required",
    flowsMustBeArray: "must be an array",
    aspectRatioRegex: 'must match regex \\d+:\\d+ (e.g. "16:10")',
    editPasswordMustBeString: "must be a string",
    overlaysMustBeArray: "must be an array",
    overlayTypeMustBeCustom: 'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.',
    duplicateOverlayId: (t) => `duplicate overlay id "${t}"`,
    overlayCardMustBeObject: 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })',
    unsafeSchemeInCard: (t) => `unsafe URL scheme "${t}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`,
    overlaySizeMustBeObject: "must be an object with width and height",
    overlayWidthPercent: "must be a positive number ≤ 100 (percent of card)",
    overlayHeightPercent: "must be a positive number ≤ 100 (percent of card)",
    overlayOpacity01: "must be a number between 0 and 1",
    migrationOverlayWarning: (t) => `type: ${t} was removed in v1.0.9. Replace with type: custom and a card: block. See documentation.`
  }
};
let Bi = {};
function Je(t) {
  Bi = t;
}
function Ei(t) {
  const i = (t ?? "en").split("-")[0].toLowerCase();
  if (i === "en") {
    Je({});
    return;
  }
  const o = `/local/flowme/translations/${i}.json`;
  fetch(o).then((n) => n.ok ? n.json() : null).then((n) => {
    n && typeof n == "object" && Je(n);
  }).catch(() => {
    Je({});
  });
}
function c(t, ...e) {
  const i = t.split(".");
  let o = Bi;
  for (const n of i)
    if (o && typeof o == "object")
      o = o[n];
    else {
      o = void 0;
      break;
    }
  if (o === void 0) {
    o = So;
    for (const n of i)
      if (o && typeof o == "object")
        o = o[n];
      else {
        o = void 0;
        break;
      }
  }
  return String(typeof o == "function" ? o(...e) : o ?? t);
}
const ko = ["javascript:", "vbscript:", "data:", "file:"];
function Ri(t, e = "card_config") {
  const i = [], o = /* @__PURE__ */ new WeakSet(), n = (s, r) => {
    if (s != null) {
      if (typeof s == "string") {
        const l = s.trim().toLowerCase();
        for (const a of ko)
          if (l.startsWith(a)) {
            i.push({ path: r, value: s, scheme: a });
            return;
          }
        return;
      }
      if (typeof s == "object" && !o.has(s)) {
        if (o.add(s), Array.isArray(s)) {
          for (let l = 0; l < s.length; l++) n(s[l], `${r}[${l}]`);
          return;
        }
        for (const [l, a] of Object.entries(s))
          n(a, `${r}.${l}`);
      }
    }
  };
  return n(t, e), i;
}
function Fo(t, e = "card_config") {
  const i = Ri(t, e);
  if (i.length === 0) return;
  const o = i[0];
  throw new Error(c("security.unsafeUrlInCard", o.scheme, o.path));
}
class _t extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Tt = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function w(t, e) {
  throw new _t(`${t}: ${e}`);
}
function At(t, e) {
  (!t || typeof t != "object") && w(e, c("validation.mustBeObjectWithXY"));
  const i = t, o = i.x, n = i.y;
  (typeof o != "number" || !Number.isFinite(o)) && w(`${e}.x`, c("validation.mustBeFiniteNumber")), (typeof n != "number" || !Number.isFinite(n)) && w(`${e}.y`, c("validation.mustBeFiniteNumber"));
  const s = o, r = n;
  return (s < 0 || s > 100) && w(`${e}.x`, c("validation.percentRange", s)), (r < 0 || r > 100) && w(`${e}.y`, c("validation.percentRange", r)), { x: s, y: r };
}
function Gt(t, e) {
  (typeof t != "string" || !t.length) && w(e, c("validation.mustBeNonEmptyString"));
  const i = t;
  return Tt.some((n) => i.startsWith(n)) || w(e, c("validation.urlMustStartWith", Tt.join(", "), i.slice(0, 40))), i;
}
function Mo(t, e, i) {
  const o = `nodes[${e}]`;
  (!t || typeof t != "object") && w(o, c("validation.mustBeObject"));
  const n = t, s = n.id;
  (typeof s != "string" || !s.length) && w(`${o}.id`, c("validation.mustBeNonEmptyId"));
  const r = s;
  i.has(r) && w(`${o}.id`, c("validation.duplicateNodeId", r)), i.add(r);
  const l = At(n.position, `${o}.position`), a = { id: r, position: l };
  if (typeof n.entity == "string" && (a.entity = n.entity), typeof n.label == "string" && (a.label = n.label), typeof n.color == "string" && (a.color = n.color), typeof n.size == "number" && (a.size = n.size), typeof n.show_label == "boolean" && (a.show_label = n.show_label), typeof n.show_value == "boolean" && (a.show_value = n.show_value), n.opacity !== void 0 && (a.opacity = Ct(n.opacity, `${o}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && w(`${o}.visible`, c("validation.mustBeBoolean")), a.visible = n.visible), n.node_effect !== void 0) {
    const d = n.node_effect;
    d && typeof d == "object" && d.type === "pulse" ? console.warn(
      "[FlowMe]",
      `${o}.node_effect:`,
      'type "pulse" is no longer supported; removing node_effect'
    ) : a.node_effect = Po(d, `${o}.node_effect`);
  }
  return a;
}
function Po(t, e) {
  (!t || typeof t != "object") && w(e, c("validation.mustBeObject"));
  const i = t, o = i.type;
  if (o === "glow")
    return {
      type: "glow",
      ...typeof i.glow_color == "string" ? { glow_color: i.glow_color } : {},
      ...typeof i.glow_max_radius == "number" ? { glow_max_radius: i.glow_max_radius } : {},
      ...typeof i.glow_min_intensity == "number" ? { glow_min_intensity: i.glow_min_intensity } : {},
      ...typeof i.peak_value == "number" ? { peak_value: i.peak_value } : {}
    };
  if (o === "badge")
    return {
      type: "badge",
      ...typeof i.badge_color_on == "string" ? { badge_color_on: i.badge_color_on } : {},
      ...typeof i.badge_color_off == "string" ? { badge_color_off: i.badge_color_off } : {},
      ...i.threshold === null ? { threshold: null } : typeof i.threshold == "number" ? { threshold: i.threshold } : {}
    };
  if (o === "ripple")
    return {
      type: "ripple",
      ...typeof i.ripple_color == "string" ? { ripple_color: i.ripple_color } : {},
      ...typeof i.ripple_duration == "number" ? { ripple_duration: i.ripple_duration } : {},
      ...typeof i.ripple_threshold == "number" ? { ripple_threshold: i.ripple_threshold } : {}
    };
  if (o === "alert") {
    const n = i.alert_condition;
    return n !== void 0 && n !== "above" && n !== "below" && w(`${e}.alert_condition`, c("validation.mustBeString")), {
      type: "alert",
      ...typeof i.alert_threshold == "number" ? { alert_threshold: i.alert_threshold } : {},
      ...n === "above" || n === "below" ? { alert_condition: n } : {},
      ...typeof i.alert_color == "string" ? { alert_color: i.alert_color } : {},
      ...typeof i.alert_frequency == "number" ? { alert_frequency: i.alert_frequency } : {},
      ...typeof i.alert_hysteresis == "number" ? { alert_hysteresis: i.alert_hysteresis } : {}
    };
  }
  w(`${e}.type`, c("validation.invalidNodeEffectType"));
}
function No(t, e, i, o) {
  const n = `flows[${e}]`;
  (!t || typeof t != "object") && w(n, c("validation.mustBeObject"));
  const s = t, r = s.id;
  (typeof r != "string" || !r.length) && w(`${n}.id`, c("validation.mustBeNonEmptyId"));
  const l = r;
  i.has(l) && w(`${n}.id`, c("validation.duplicateFlowId", l)), i.add(l);
  const a = s.from_node;
  (typeof a != "string" || !o.has(a)) && w(`${n}.from_node`, c("validation.unknownNodeRef", String(a)));
  const d = s.to_node;
  (typeof d != "string" || !o.has(d)) && w(`${n}.to_node`, c("validation.unknownNodeRef", String(d)));
  const p = s.entity;
  (typeof p != "string" || !p.length) && w(`${n}.entity`, c("validation.mustBeNonEmptyEntityId"));
  const h = s.waypoints;
  let u = [];
  h !== void 0 && (Array.isArray(h) || w(`${n}.waypoints`, c("validation.waypointsMustBeArray")), u = h.map(
    (g, m) => At(g, `${n}.waypoints[${m}]`)
  ));
  const f = {
    id: l,
    from_node: a,
    to_node: d,
    entity: p,
    waypoints: u
  };
  if (typeof s.domain == "string" && (Fe.includes(s.domain) || w(`${n}.domain`, c("validation.mustBeOneOf", Fe.join(", "))), f.domain = s.domain), typeof s.color == "string" && (f.color = s.color), typeof s.color_positive == "string" && (f.color_positive = s.color_positive), typeof s.color_negative == "string" && (f.color_negative = s.color_negative), typeof s.threshold == "number" && (f.threshold = s.threshold), typeof s.reverse == "boolean" && (f.reverse = s.reverse), typeof s.speed_multiplier == "number") {
    const g = s.speed_multiplier;
    (g < 0.1 || g > 5) && w(`${n}.speed_multiplier`, c("validation.speedMultiplierRange")), f.speed_multiplier = g;
  }
  return s.opacity !== void 0 && (f.opacity = Ct(s.opacity, `${n}.opacity`)), s.visible !== void 0 && (typeof s.visible != "boolean" && w(`${n}.visible`, c("validation.mustBeBoolean")), f.visible = s.visible), s.line_style !== void 0 && (lt.includes(s.line_style) || w(`${n}.line_style`, c("validation.mustBeOneOf", lt.join(", "))), f.line_style = s.line_style), s.speed_curve_override !== void 0 && (f.speed_curve_override = Bo(
    s.speed_curve_override,
    `${n}.speed_curve_override`
  )), s.animation !== void 0 && (f.animation = Do(s.animation, `${n}.animation`)), s.value_gradient !== void 0 && (f.value_gradient = Lo(s.value_gradient, `${n}.value_gradient`)), f;
}
function Bo(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t, o = {};
  function n(u) {
    const f = i[u];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${e}.${u}`, c("validation.positiveFinite")), f;
  }
  function s(u) {
    const f = i[u];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f < 50) && w(`${e}.${u}`, c("validation.durationMin50")), f;
  }
  const r = n("threshold");
  r !== void 0 && (o.threshold = r);
  const l = n("p50");
  l !== void 0 && (o.p50 = l);
  const a = n("peak");
  a !== void 0 && (o.peak = a);
  const d = s("max_duration");
  d !== void 0 && (o.max_duration = d);
  const p = s("min_duration");
  if (p !== void 0 && (o.min_duration = p), i.steepness !== void 0) {
    const u = i.steepness;
    (typeof u != "number" || !Number.isFinite(u) || u <= 0) && w(`${e}.steepness`, c("validation.positiveFinite")), o.steepness = u;
  }
  o.max_duration !== void 0 && o.min_duration !== void 0 && o.min_duration >= o.max_duration && w(e, c("validation.minLtMaxDuration"));
  const h = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const u of Object.keys(i))
    h.has(u) || w(`${e}.${u}`, c("validation.unknownKey", [...h].join(", ")));
  return o;
}
function le(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t <= 0) && w(e, c("validation.positiveFinite")), t;
}
function Eo(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("defaults", c("validation.defaultsMustBeObject"));
  const e = t, i = {};
  if (e.node_radius !== void 0 && (i.node_radius = le(e.node_radius, "defaults.node_radius")), e.burst_trigger_ratio !== void 0) {
    const o = le(e.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    o > 1 && w("defaults.burst_trigger_ratio", c("validation.burstTriggerMax1")), i.burst_trigger_ratio = o;
  }
  return e.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = le(e.burst_sustain_ms, "defaults.burst_sustain_ms")), e.burst_max_particles !== void 0 && (i.burst_max_particles = le(e.burst_max_particles, "defaults.burst_max_particles")), e.dot_radius !== void 0 && (i.dot_radius = le(e.dot_radius, "defaults.dot_radius")), e.line_width !== void 0 && (i.line_width = le(e.line_width, "defaults.line_width")), i;
}
function Ct(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t < 0 || t > 1) && w(e, c("validation.opacity01")), t;
}
function Ro(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("opacity", c("validation.mustBeObject"));
  const e = t, i = {};
  for (const o of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    e[o] !== void 0 && (i[o] = Ct(e[o], `opacity.${o}`));
  return i;
}
function Do(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t, o = {};
  if (i.animation_style !== void 0) {
    let m = i.animation_style;
    (m === "pulse" || m === "spark") && (console.warn(
      `[flowme] ${e}.animation_style '${String(m)}' was removed in v1.23.6 — using 'dots'`
    ), m = "dots"), ct.includes(m) || w(`${e}.animation_style`, c("validation.mustBeOneOf", ct.join(", "))), o.animation_style = m;
  }
  i.particle_shape !== void 0 && (dt.includes(i.particle_shape) || w(`${e}.particle_shape`, c("validation.mustBeOneOf", dt.join(", "))), o.particle_shape = i.particle_shape), i.direction !== void 0 && (pt.includes(i.direction) || w(`${e}.direction`, c("validation.mustBeOneOf", pt.join(", "))), o.direction = i.direction), i.particle_spacing !== void 0 && (ut.includes(i.particle_spacing) || w(`${e}.particle_spacing`, c("validation.mustBeOneOf", ut.join(", "))), o.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && w(`${e}.custom_svg_path`, c("validation.mustBeSvgPathString")), i.custom_svg_path.length === 0 && console.warn(`[flowme] ${e}.custom_svg_path is empty — will fall back to circle`), o.custom_svg_path = i.custom_svg_path);
  const n = (m, v) => {
    const y = i[m];
    if (y !== void 0)
      return (typeof y != "number" || !Number.isFinite(y) || y <= 0) && w(`${e}.${m}`, c("validation.positiveFinite")), v !== void 0 && y > v && w(`${e}.${m}`, c("validation.mustBeAtMost", v)), y;
  }, s = (m) => {
    const v = i[m];
    if (v !== void 0)
      return typeof v != "boolean" && w(`${e}.${m}`, c("validation.mustBeBoolean")), v;
  }, r = n("particle_size");
  if (r !== void 0 && (o.particle_size = r), i.particle_count !== void 0) {
    const m = i.particle_count;
    (typeof m != "number" || !Number.isFinite(m) || m < 1 || !Number.isInteger(m)) && w(`${e}.particle_count`, c("validation.particleCountInt")), o.particle_count = m;
  }
  if (i.glow_intensity !== void 0) {
    const m = i.glow_intensity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0) && w(`${e}.glow_intensity`, c("validation.glowNonNegative")), o.glow_intensity = m;
  }
  const l = s("shimmer");
  l !== void 0 && (o.shimmer = l);
  const a = s("flicker");
  a !== void 0 && (o.flicker = a);
  const d = n("trail_length");
  if (d !== void 0 && (o.trail_length = d), i.dash_gap !== void 0) {
    const m = i.dash_gap;
    (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 10) && w(`${e}.dash_gap`, c("validation.dashGapRange")), o.dash_gap = m;
  }
  const p = n("cluster_size");
  p !== void 0 && (o.cluster_size = Math.max(1, Math.round(p)));
  const h = n("cluster_gap");
  h !== void 0 && (o.cluster_gap = h);
  const u = n("pulse_frequency", 20);
  if (u !== void 0 && (o.pulse_frequency = u), i.pulse_ratio !== void 0) {
    const m = i.pulse_ratio;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m >= 1) && w(`${e}.pulse_ratio`, c("validation.pulseRatioRange")), o.pulse_ratio = m;
  }
  const f = n("wave_frequency", 20);
  f !== void 0 && (o.wave_frequency = f);
  const g = n("wave_amplitude");
  return g !== void 0 && (o.wave_amplitude = g), o;
}
function Wt(t, e) {
  return (typeof t != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) && w(e, c("validation.mustBeHexColor")), t;
}
function Lo(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t;
  typeof i.entity != "string" && w(`${e}.entity`, c("validation.mustBeStringEntityId")), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && w(`${e}.low_value`, c("validation.finiteNumber")), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && w(`${e}.high_value`, c("validation.finiteNumber")), i.low_value >= i.high_value && console.warn(`[flowme] ${e}: low_value should be less than high_value`);
  const o = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: Wt(i.low_color, `${e}.low_color`),
    high_color: Wt(i.high_color, `${e}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || w(`${e}.mode`, c("validation.gradientMode")), o.mode = i.mode), o;
}
function zo(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("animation", c("validation.animationRootMustBeObject"));
  const e = t, i = {};
  if (e.fps !== void 0) {
    const o = e.fps;
    (typeof o != "number" || !Number.isFinite(o) || o < 1 || o > 120) && w("animation.fps", c("validation.fpsRange")), i.fps = o;
  }
  return e.smooth_speed !== void 0 && (typeof e.smooth_speed != "boolean" && w("animation.smooth_speed", c("validation.mustBeBoolean")), i.smooth_speed = e.smooth_speed), i;
}
function Oo(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("visibility", c("validation.visibilityRootMustBeObject"));
  const e = t, i = {};
  for (const o of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    e[o] !== void 0 && (typeof e[o] != "boolean" && w(`visibility.${o}`, c("validation.mustBeBoolean")), i[o] = e[o]);
  return i;
}
function Ho(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("domain_colors", c("validation.domainColorsRootMustBeObject"));
  const e = t, i = {};
  for (const o of ["solar", "grid", "battery", "load"])
    e[o] !== void 0 && (typeof e[o] != "string" && w(`domain_colors.${o}`, c("validation.stringColourValue")), i[o] = e[o]);
  return i;
}
function ve(t) {
  if (!t || typeof t != "object") throw new _t(c("validation.configMustBeObject"));
  const e = t;
  e.type !== "custom:flowme-card" && w("type", c("validation.typeMustBeFlowme", String(e.type))), Fe.includes(e.domain) || w("domain", c("validation.mustBeOneOf", Fe.join(", ")));
  const i = e.background;
  i !== void 0 && (i === null || typeof i != "object") && w("background", c("validation.backgroundWhenProvided"));
  const o = i ?? {}, s = { default: o.default === void 0 || o.default === "" ? "" : Gt(o.default, "background.default") };
  if (o.weather_entity !== void 0 && (typeof o.weather_entity != "string" && w("background.weather_entity", c("validation.mustBeStringEntityId")), s.weather_entity = o.weather_entity), o.weather_states !== void 0) {
    (!o.weather_states || typeof o.weather_states != "object") && w("background.weather_states", c("validation.weatherStatesMapping"));
    const f = Object.entries(o.weather_states), g = {};
    for (const [m, v] of f)
      g[m] = Gt(v, `background.weather_states.${m}`);
    s.weather_states = g;
  }
  o.sun_entity !== void 0 && (typeof o.sun_entity != "string" && w("background.sun_entity", c("validation.sunEntityExample")), s.sun_entity = o.sun_entity), o.transition_duration !== void 0 && (typeof o.transition_duration != "number" && w("background.transition_duration", c("validation.transitionMustBeNumberMs")), s.transition_duration = o.transition_duration);
  const r = e.nodes;
  Array.isArray(r) || w("nodes", c("validation.nodesMustBeArray"));
  const l = /* @__PURE__ */ new Set(), a = r.map((f, g) => Mo(f, g, l));
  a.length === 0 && w("nodes", c("validation.atLeastOneNode"));
  const d = e.flows;
  Array.isArray(d) || w("flows", c("validation.flowsMustBeArray"));
  const p = /* @__PURE__ */ new Set(), h = d.map(
    (f, g) => No(f, g, p, l)
  ), u = {
    type: "custom:flowme-card",
    domain: e.domain,
    background: s,
    nodes: a,
    flows: h
  };
  if (e.aspect_ratio !== void 0 && ((typeof e.aspect_ratio != "string" || !/^\d+:\d+$/.test(e.aspect_ratio)) && w("aspect_ratio", c("validation.aspectRatioRegex")), u.aspect_ratio = e.aspect_ratio), e.fullscreen !== void 0 && (typeof e.fullscreen != "boolean" && w("fullscreen", c("validation.mustBeBoolean")), u.fullscreen = e.fullscreen), e.edit_mode_password !== void 0 && (typeof e.edit_mode_password != "string" && w("edit_mode_password", c("validation.editPasswordMustBeString")), u.edit_mode_password = e.edit_mode_password), e.overlays !== void 0) {
    Array.isArray(e.overlays) || w("overlays", c("validation.overlaysMustBeArray"));
    const f = /* @__PURE__ */ new Set();
    u.overlays = e.overlays.map(
      (g, m) => To(g, m, f)
    );
  }
  return e.defaults !== void 0 && (u.defaults = Eo(e.defaults)), e.domain_colors !== void 0 && (u.domain_colors = Ho(e.domain_colors)), e.debug !== void 0 && (typeof e.debug != "boolean" && w("debug", c("validation.mustBeBoolean")), u.debug = e.debug), e.opacity !== void 0 && (u.opacity = Ro(e.opacity)), e.visibility !== void 0 && (u.visibility = Oo(e.visibility)), e.animation !== void 0 && (u.animation = zo(e.animation)), u;
}
function To(t, e, i) {
  const o = `overlays[${e}]`;
  (!t || typeof t != "object") && w(o, c("validation.mustBeObject"));
  const n = t, s = n.type, l = typeof s == "string" && ["camera", "switch", "sensor", "button"].includes(s);
  !l && s !== "custom" && w(`${o}.type`, c("validation.overlayTypeMustBeCustom"));
  const a = n.id;
  (typeof a != "string" || !a.length) && w(`${o}.id`, c("validation.mustBeNonEmptyId")), i.has(a) && w(`${o}.id`, c("validation.duplicateOverlayId", a)), i.add(a);
  const d = At(n.position, `${o}.position`);
  if (l) {
    const g = c("validation.migrationOverlayWarning", s);
    console.warn(`[flowme] ${o}: ${g}`);
    const m = {
      id: a,
      type: "custom",
      position: d,
      card: { type: "markdown", content: "" },
      _migration_warning: g
    };
    if (n.size !== void 0) {
      const v = n.size;
      if (v && typeof v == "object") {
        const y = v, x = y.width, _ = y.height;
        typeof x == "number" && typeof _ == "number" && (m.size = { width: x, height: _ });
      }
    }
    return m;
  }
  const p = n.card;
  (!p || typeof p != "object" || Array.isArray(p)) && w(`${o}.card`, c("validation.overlayCardMustBeObject"));
  const h = Ri(p, `${o}.card`);
  if (h.length) {
    const g = h[0];
    w(g.path, c("validation.unsafeSchemeInCard", g.scheme));
  }
  const f = {
    id: a,
    type: "custom",
    position: d,
    card: p
  };
  if (n.size !== void 0) {
    const g = n.size;
    (!g || typeof g != "object") && w(`${o}.size`, c("validation.overlaySizeMustBeObject"));
    const m = g, v = m.width, y = m.height;
    (typeof v != "number" || !Number.isFinite(v) || v <= 0 || v > 100) && w(`${o}.size.width`, c("validation.overlayWidthPercent")), (typeof y != "number" || !Number.isFinite(y) || y <= 0 || y > 100) && w(`${o}.size.height`, c("validation.overlayHeightPercent")), f.size = { width: v, height: y };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && w(`${o}.visible`, c("validation.mustBeBoolean")), f.visible = n.visible), n.opacity !== void 0) {
    const g = n.opacity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 1) && w(`${o}.opacity`, c("validation.overlayOpacity01")), f.opacity = g;
  }
  return f;
}
const Go = "[FlowMe]";
let It = !1;
function ht(t) {
  It = t;
}
function E(...t) {
  It && console.warn(Go, ...t);
}
function O() {
  return It;
}
const Ke = {
  energy: {
    roles: [
      { key: "solar", label: "Solar", patterns: ["solar", "pv"], default: "#FFD700" },
      { key: "grid", label: "Grid", patterns: ["grid"], default: "#1EB4FF" },
      { key: "battery", label: "Battery", patterns: ["battery", "bat"], default: "#32DC50" },
      { key: "load", label: "Load", patterns: ["load"], default: "#FF8C1E" }
    ]
  },
  water: {
    roles: [
      {
        key: "supply",
        label: "Supply",
        patterns: ["supply", "inlet", "cold", "mains"],
        default: "#60CFFF"
      },
      { key: "drain", label: "Drain", patterns: ["drain", "out", "outlet", "waste"], default: "#0077AA" },
      { key: "storage", label: "Storage", patterns: ["tank", "storage", "hot"], default: "#004488" },
      { key: "transfer", label: "Transfer", patterns: ["pipe", "transfer", "circulation"], default: "#88DDFF" }
    ]
  },
  network: {
    roles: [
      { key: "upload", label: "Upload", patterns: ["up", "upload", "tx", "send"], default: "#32DC50" },
      { key: "download", label: "Download", patterns: ["down", "download", "rx", "receive"], default: "#1EB4FF" },
      { key: "local", label: "Local", patterns: ["local", "lan", "internal"], default: "#FFD700" },
      { key: "external", label: "External", patterns: ["ext", "external", "wan", "internet"], default: "#FF8C1E" }
    ]
  },
  hvac: {
    roles: [
      {
        key: "supply",
        label: "Supply air",
        patterns: ["supply", "hot", "heat", "warm"],
        default: "#FF4500"
      },
      {
        key: "return",
        label: "Return air",
        patterns: ["return", "cold", "cool", "extract"],
        default: "#1EB4FF"
      },
      { key: "fresh", label: "Fresh air", patterns: ["fresh", "intake", "outside"], default: "#32DC50" },
      { key: "exhaust", label: "Exhaust", patterns: ["exhaust", "vent", "outlet"], default: "#AAAAAA" }
    ]
  },
  gas: {
    roles: [
      { key: "inlet", label: "Inlet", patterns: ["in", "inlet", "supply", "import"], default: "#FFD700" },
      { key: "outlet", label: "Outlet", patterns: ["out", "outlet", "exhaust"], default: "#FF8C1E" },
      { key: "bypass", label: "Bypass", patterns: ["bypass", "divert"], default: "#AAAAAA" },
      { key: "vent", label: "Vent", patterns: ["vent", "release"], default: "#888888" }
    ]
  },
  generic: {
    roles: [
      { key: "flow1", label: "Flow 1", patterns: [], default: "#FFD700" },
      { key: "flow2", label: "Flow 2", patterns: [], default: "#1EB4FF" },
      { key: "flow3", label: "Flow 3", patterns: [], default: "#32DC50" },
      { key: "flow4", label: "Flow 4", patterns: [], default: "#FF8C1E" }
    ]
  }
};
function Wo(t) {
  const e = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(e)) return "solar";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(e)) return "grid";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(e)) return "battery";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(e)) return "load";
}
function Ut(t, e) {
  const i = t.toLowerCase();
  for (const o of e.roles)
    for (const n of o.patterns)
      if (n && i.includes(n)) return o.key;
}
function Uo(t, e, i, o) {
  if (t === void 0) {
    E("colour resolution:", e, "domain:", "undefined", "matched role:", "none", "resolved:", void 0);
    return;
  }
  const n = t, s = Ke[n] ?? Ke.generic;
  let r;
  if (n === "energy") {
    if (r = Wo(e), !r) {
      E("colour resolution:", e, "domain:", n, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (n === "generic") {
    if (r = Ut(e, s), !r) {
      const d = Math.abs(o ?? 0) % s.roles.length, p = s.roles[d], h = i?.[p.key] ?? p.default;
      return E("colour resolution:", e, "domain:", n, "matched role:", "none", "resolved:", h), h;
    }
  } else if (r = Ut(e, s), !r) {
    E("colour resolution:", e, "domain:", n, "matched role:", "none", "resolved:", void 0);
    return;
  }
  const l = s.roles.find((d) => d.key === r);
  if (!l) return;
  const a = i?.[l.key] ?? l.default;
  return E("colour resolution:", e, "domain:", n, "matched role:", r, "resolved:", a), a;
}
function Di(t, e = 2e3) {
  return new Promise((i) => {
    let o = 0, n = 0, s = 0;
    const r = 2;
    let l = !1;
    const a = { handle: void 0 }, d = (h) => {
      l || (l = !0, a.handle !== void 0 && window.clearTimeout(a.handle), p.disconnect(), i(h));
    }, p = new ResizeObserver((h) => {
      const u = h[0];
      if (!u) return;
      const { width: f, height: g } = u.contentRect;
      f === o && g === n && f > 0 && g > 0 ? (s++, s >= r && d(u.contentRect)) : (s = 0, o = f, n = g);
    });
    p.observe(t), a.handle = window.setTimeout(() => {
      d(t.getBoundingClientRect());
    }, e);
  });
}
function Li(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
function Kt(t, e, i) {
  return t + (e - t) * i;
}
function Me(t, e) {
  return { x: t.x / 100 * e.width, y: t.y / 100 * e.height };
}
function we(t, e, i) {
  if (t.length === 0) return "";
  if (t.length === 1) {
    const l = Me(t[0], e);
    return `M ${l.x.toFixed(2)} ${l.y.toFixed(2)}`;
  }
  const o = t.map((l) => Me(l, e));
  if (i === "diagonal") {
    const l = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let a = 1; a < o.length; a++)
      l.push(`L ${o[a].x.toFixed(2)} ${o[a].y.toFixed(2)}`);
    return l.join(" ");
  }
  if (i === "corner") {
    const l = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let a = 1; a < o.length; a++) {
      const d = o[a - 1], p = o[a];
      l.push(`L ${p.x.toFixed(2)} ${d.y.toFixed(2)}`), l.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    }
    return l.join(" ");
  }
  if (i === "curve") {
    const l = o.length, a = [
      { x: 2 * o[0].x - o[1].x, y: 2 * o[0].y - o[1].y },
      ...o,
      { x: 2 * o[l - 1].x - o[l - 2].x, y: 2 * o[l - 1].y - o[l - 2].y }
    ], d = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let p = 1; p < l; p++) {
      const h = a[p - 1], u = a[p], f = a[p + 1], g = a[p + 2], m = u.x + (f.x - h.x) / 6, v = u.y + (f.y - h.y) / 6, y = f.x - (g.x - u.x) / 6, x = f.y - (g.y - u.y) / 6;
      d.push(`C ${m.toFixed(2)} ${v.toFixed(2)} ${y.toFixed(2)} ${x.toFixed(2)} ${f.x.toFixed(2)} ${f.y.toFixed(2)}`);
    }
    return d.join(" ");
  }
  const n = 0.3, s = 20, r = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
  for (let l = 1; l < o.length; l++) {
    const a = o[l - 1], d = o[l], p = o[l + 1];
    if (!p) {
      r.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
      continue;
    }
    const h = Math.sqrt((d.x - a.x) ** 2 + (d.y - a.y) ** 2), u = Math.sqrt((p.x - d.x) ** 2 + (p.y - d.y) ** 2), f = Math.min(Math.min(h, u) * n, s), g = f / (h || 1), m = d.x - (d.x - a.x) * g, v = d.y - (d.y - a.y) * g, y = f / (u || 1), x = d.x + (p.x - d.x) * y, _ = d.y + (p.y - d.y) * y;
    r.push(`L ${m.toFixed(2)} ${v.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${x.toFixed(2)} ${_.toFixed(2)}`);
  }
  return r.join(" ");
}
function xe(t) {
  if (t == null) return 0;
  if (typeof t == "number") return Number.isFinite(t) ? t : 0;
  const e = t.trim();
  if (!e || e === "unavailable" || e === "unknown") return 0;
  const i = Number.parseFloat(e);
  return Number.isFinite(i) ? i : 0;
}
const se = 9e3, re = 700, ae = 1.5;
function j(t, e) {
  const { threshold: i, p50: o, max_duration: n, min_duration: s, steepness: r } = e, l = Math.abs(t);
  if (!(o > 0) || !(i > 0)) return n;
  const a = Math.max(l, i), d = Math.log10(a / o), p = 1 / (1 + Math.exp(-r * d));
  return n - p * (n - s);
}
function je(t, e) {
  const i = t.speed_curve_override ?? {}, o = i.threshold ?? t.threshold ?? e.threshold, n = i.p50 ?? e.p50, s = i.peak ?? e.peak, r = i.max_duration ?? se, l = i.min_duration ?? re, a = i.steepness ?? ae;
  return { threshold: o, p50: n, peak: s, max_duration: r, min_duration: l, steepness: a };
}
function jt(t, e, i) {
  if (!i || !e) return { value: t, factor: 1 };
  const o = e.trim();
  if (!o) return { value: t, factor: 1 };
  if (Object.prototype.hasOwnProperty.call(i, o)) {
    const r = i[o] ?? 1;
    return { value: t * r, factor: r, matchedUnit: o };
  }
  const n = o.toLowerCase(), s = Object.entries(i).filter(
    ([r]) => r.toLowerCase() === n
  );
  if (s.length === 1) {
    const [r, l] = s[0];
    return { value: t * l, factor: l, matchedUnit: r };
  }
  return { value: t, factor: 1 };
}
function zi(t, e) {
  let i = null, o = null;
  const n = (...s) => {
    o = s, i !== null && clearTimeout(i), i = setTimeout(() => {
      i = null, o && t(...o), o = null;
    }, e);
  };
  return n.cancel = () => {
    i !== null && (clearTimeout(i), i = null), o = null;
  }, n;
}
function Ko(t, e, i, o) {
  if (!i) return o;
  const n = e === "below_horizon";
  let s = t;
  n && !t.endsWith("-night") && (s = `${t}-night`);
  const r = i[s];
  if (r) return r;
  if (n && s !== "clear-night") {
    const l = i["clear-night"];
    if (l) return l;
  }
  if (s !== t) {
    const l = i[t];
    if (l) return l;
  }
  return o;
}
function Qe(t) {
  if (!t) return;
  const e = /^(\d+):(\d+)$/.exec(t);
  if (!e) return;
  const i = Number.parseInt(e[1], 10), o = Number.parseInt(e[2], 10);
  if (!(!i || !o))
    return i / o;
}
function Vt(t) {
  const e = t.replace("#", ""), i = e.length === 3 ? e.split("").map((n) => n + n).join("") : e, o = parseInt(i, 16);
  return [o >> 16 & 255, o >> 8 & 255, o & 255];
}
function Yt(t, e, i) {
  const o = t / 255, n = e / 255, s = i / 255, r = Math.max(o, n, s), l = Math.min(o, n, s), a = (r + l) / 2;
  if (r === l) return [0, 0, a];
  const d = r - l, p = a > 0.5 ? d / (2 - r - l) : d / (r + l);
  let h;
  return r === o ? h = (n - s) / d + (n < s ? 6 : 0) : r === n ? h = (s - o) / d + 2 : h = (o - n) / d + 4, [h * 60, p, a];
}
function et(t, e, i) {
  let o = i;
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? t + (e - t) * 6 * o : o < 1 / 2 ? e : o < 2 / 3 ? t + (e - t) * (2 / 3 - o) * 6 : t;
}
function jo(t, e, i) {
  const o = t / 360;
  let n, s, r;
  if (e === 0)
    n = s = r = i;
  else {
    const a = i < 0.5 ? i * (1 + e) : i + e - i * e, d = 2 * i - a;
    n = et(d, a, o + 1 / 3), s = et(d, a, o), r = et(d, a, o - 1 / 3);
  }
  const l = (a) => Math.round(a * 255).toString(16).padStart(2, "0");
  return `#${l(n)}${l(s)}${l(r)}`;
}
function Oi(t, e) {
  const i = e.high_value - e.low_value, o = i === 0 ? 0 : Math.max(0, Math.min(1, (t - e.low_value) / i)), [n, s, r] = Vt(e.low_color), [l, a, d] = Vt(e.high_color), [p, h, u] = Yt(n, s, r), [f, g, m] = Yt(l, a, d);
  let v = f - p;
  v > 180 && (v -= 360), v < -180 && (v += 360);
  const y = (p + v * o + 360) % 360, x = Kt(h, g, o), _ = Kt(u, m, o);
  return jo(y, x, _);
}
function Hi() {
  try {
    return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
const Vo = {
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
  speed_curve(t) {
    return j(t, {
      threshold: 30,
      p50: 800,
      max_duration: se,
      min_duration: re,
      steepness: ae
    });
  },
  describe(t) {
    return Math.abs(t) >= 1e3 ? `${(t / 1e3).toFixed(2)} kW` : `${Math.round(t)} W`;
  }
}, Yo = {
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
  speed_curve(t) {
    return j(t, {
      threshold: 0.3,
      p50: 6,
      max_duration: se,
      min_duration: re,
      steepness: ae
    });
  },
  wave_amplitude_curve(t) {
    return 4;
  },
  describe(t) {
    return Math.abs(t) >= 100 ? `${t.toFixed(0)} L/min` : Math.abs(t) >= 10 ? `${t.toFixed(1)} L/min` : `${t.toFixed(2)} L/min`;
  }
}, Zo = {
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
  speed_curve(t) {
    return j(t, {
      threshold: 0.05,
      p50: 50,
      max_duration: se,
      min_duration: re,
      steepness: ae
    });
  },
  particle_count_curve(t) {
    const e = Math.abs(t);
    return Math.round(Li(1 + Math.log10(e + 1) * 4, 1, 20));
  },
  describe(t) {
    const e = Math.abs(t);
    return e >= 1e3 ? `${(t / 1e3).toFixed(2)} Gbps` : e >= 10 ? `${t.toFixed(1)} Mbps` : `${t.toFixed(2)} Mbps`;
  }
}, Xo = {
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
  speed_curve(t) {
    return j(t, {
      threshold: 5,
      p50: 200,
      max_duration: se,
      min_duration: re,
      steepness: ae
    });
  },
  wave_amplitude_curve(t) {
    const e = Math.abs(t);
    return Li(2 + e / 100, 2, 10);
  },
  describe(t) {
    return `${Math.round(t)} CFM`;
  }
}, qo = {
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
  speed_curve(t) {
    return j(t, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: se,
      min_duration: re,
      steepness: ae
    });
  },
  describe(t) {
    return Math.abs(t) >= 10 ? `${t.toFixed(1)} m³/h` : `${t.toFixed(2)} m³/h`;
  }
}, Ti = {
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
  speed_curve(t) {
    return j(t, {
      threshold: 1,
      p50: 100,
      max_duration: se,
      min_duration: re,
      steepness: ae
    });
  },
  describe(t) {
    return Math.abs(t) >= 100 ? t.toFixed(0) : Math.abs(t) >= 10 ? t.toFixed(1) : t.toFixed(2);
  }
}, Zt = {
  energy: Vo,
  water: Yo,
  network: Zo,
  hvac: Xo,
  gas: qo,
  generic: Ti
};
function W(t) {
  return t && t in Zt ? Zt[t] : Ti;
}
const Gi = "#CCCCCC";
function he(t, e, i, o, n, s) {
  const r = t.color ?? Uo(i, t.id, n, s);
  return o >= 0 ? t.color_positive ?? r ?? e.default_color_positive : t.color_negative ?? r ?? e.default_color_negative;
}
function Jo(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}
function Xt() {
  return {
    currentDurMs: /* @__PURE__ */ new Map(),
    interpFromMs: /* @__PURE__ */ new Map(),
    interpTargetMs: /* @__PURE__ */ new Map(),
    interpStartMs: /* @__PURE__ */ new Map()
  };
}
function tt(t, e) {
  e.interpFromMs.delete(t), e.interpTargetMs.delete(t), e.interpStartMs.delete(t);
}
const Qo = 50, en = 500;
function tn(t, e, i, o, n) {
  if (!i)
    return n.currentDurMs.set(t, e), tt(t, n), e;
  const s = n.currentDurMs.get(t) ?? e;
  if (Math.abs(e - s) < Qo)
    return n.currentDurMs.set(t, e), tt(t, n), e;
  n.interpTargetMs.get(t) !== e && (n.interpFromMs.set(t, s), n.interpTargetMs.set(t, e), n.interpStartMs.set(t, o));
  const l = n.interpFromMs.get(t) ?? e, a = n.interpTargetMs.get(t) ?? e, d = n.interpStartMs.get(t) ?? o, p = o - d, h = Math.min(p / en, 1), u = Jo(h), f = l + (a - l) * u;
  return n.currentDurMs.set(t, f), h >= 1 ? (n.currentDurMs.set(t, a), tt(t, n), a) : f;
}
const on = "[FlowMe Renderer]";
function it(...t) {
  E(on, ...t);
}
const F = "http://www.w3.org/2000/svg", K = "http://www.w3.org/1999/xlink";
function nn() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const ot = nn(), sn = 2e3, Ee = 3, qt = 5, nt = 2, rn = 0.9, an = 5e3, Re = 20, ln = 0.2, De = 0.3;
function cn(t) {
  const e = (i) => i.toFixed(4);
  return [
    `M ${e(15 * t)} 0`,
    `L ${e(10 * t)} ${e(-10 * t)}`,
    `L ${e(0)} ${e(-10 * t)}`,
    `L ${e(5 * t)} 0`,
    `L ${e(0)} ${e(10 * t)}`,
    `L ${e(10 * t)} ${e(10 * t)}`,
    "Z"
  ].join(" ");
}
function dn(t) {
  return [
    `M 0,${-t * 2.2}`,
    `C ${t * 1.1},${-t * 1.2} ${t * 1.3},${-t * 0.2} ${t * 1.3},${t * 0.5}`,
    `C ${t * 1.3},${t * 1.4} ${t * 0.7},${t * 2} 0,${t * 2}`,
    `C ${-t * 0.7},${t * 2} ${-t * 1.3},${t * 1.4} ${-t * 1.3},${t * 0.5}`,
    `C ${-t * 1.3},${-t * 0.2} ${-t * 1.1},${-t * 1.2} 0,${-t * 2.2}`,
    "Z"
  ].join(" ");
}
const pn = [8, 16, 24, 32], un = [0.9, 0.75, 0.6, 0.4], hn = [0.8, 0.55, 0.35, 0.15];
class He {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = zi(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.durInterp = Xt(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptivePassAt = 0, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0, this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1, this.flowPathSyncedDirection = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.svg && this.destroy(), it("init:", e.getBoundingClientRect(), "flows:", i.flows.length), O() && console.log(
      "[FlowMe Renderer] init start dims:",
      e.offsetWidth,
      e.offsetHeight
    ), this.container = e, this.config = i, this.prefersReducedMotionFlag = Hi(), this.flowsById = new Map(i.flows.map((n) => [n.id, n]));
    const o = document.createElementNS(F, "svg");
    o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("preserveAspectRatio", "none"), o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.overflow = "visible", this.svg = o, e.appendChild(o), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(e), this.startFpsLoop(), await Di(e), O() && console.log("[FlowMe Renderer] stable dims:", e.offsetWidth, e.offsetHeight), this.onResize(), O() && console.log("[FlowMe Renderer] post-resize dims:", e.offsetWidth, e.offsetHeight);
  }
  /** Same flow ids as at init — refresh paths and particle layout without destroy/init. */
  applyConfig(e) {
    if (this.svg) {
      this.config = e, this.flowsById = new Map(e.flows.map((i) => [i.id, i])), this.onResize();
      for (const i of e.flows) {
        const o = this.latestValues.get(i.id) ?? 0;
        this.applyFlow(i.id, o);
      }
    }
  }
  updateFlow(e, i) {
    this.flowsById.has(e) && (this.latestValues.set(e, i), this.applyUpdate());
  }
  /**
   * GRADIENT-1: Set the resolved gradient colour for a flow.
   * Called by FlowmeCard whenever the gradient entity's state changes.
   * The colour replaces the normal flow colour in the next render frame.
   * Pass undefined/null to clear and fall back to the flow's own color.
   */
  setGradientColor(e, i) {
    i ? this.gradientColors.set(e, i) : this.gradientColors.delete(e), this.applyUpdate();
  }
  /**
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  startFpsLoop() {
    const i = 1e3 / (this.config?.animation?.fps ?? 60), o = (n) => {
      if (!this.svg) return;
      const s = n - this.lastFrameTime;
      if (this.sampleFrameTime(), this.runAdaptivePassIfDue(n), s >= i) {
        this.lastFrameTime = n - s % i;
        const r = this.config?.animation?.smooth_speed !== !1, l = this.durInterp.interpStartMs.size > 0;
        r && (l || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(n), this.updateTimeBasedSpacing(n);
      }
      this.rafHandle = requestAnimationFrame(o);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(o);
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.durInterp = Xt(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.frameTimeSamples.length = 0, this.lastAdaptivePassAt = 0, this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear(), this.flowPathSyncedDirection.clear();
  }
  // ── internal ──────────────────────────────────────────────────────────────
  containerSize() {
    if (!this.container) return { width: 0, height: 0 };
    const e = this.container.getBoundingClientRect();
    return { width: Math.max(1, e.width), height: Math.max(1, e.height) };
  }
  /**
   * Travel sense along the rendered path: +1 = from_node → to_node, −1 = to_node → from_node.
   * Only `direction: auto` uses the sensor sign; `both` uses +1 for geometry sync (dual paths handle streams).
   */
  computeIntendedTravelSign(e, i) {
    const o = e.animation?.direction ?? "auto";
    return o === "both" || o === "forward" ? 1 : o === "reverse" ? -1 : i >= 0 ? 1 : -1;
  }
  /** Second path in defs for `direction: both` — opposite waypoint order. */
  ensurePathRev(e) {
    if (e.pathRev || !this.svg) return;
    const i = this.svg.querySelector("defs");
    if (!i) return;
    const o = document.createElementNS(F, "path");
    o.setAttribute("id", `${e.pathId}-rev`), o.setAttribute("fill", "none"), i.appendChild(o), e.pathRev = o, e.pathRevId = `${e.pathId}-rev`;
  }
  /**
   * Keep motion path geometry aligned with travel direction so `rotate="auto"` matches flow.
   * Reverse waypoint order when direction &lt; 0 (single-stream); `both` uses forward + reversed paths.
   */
  syncFlowPathGeometry(e, i, o) {
    if (!this.config) return;
    const n = this.containerSize(), s = new Map(this.config.nodes.map((u) => [u.id, u])), r = s.get(e.from_node), l = s.get(e.to_node);
    if (!r || !l) return;
    const a = [r.position, ...e.waypoints, l.position], d = [l.position, ...e.waypoints.slice().reverse(), r.position], p = e.line_style ?? "corner";
    if ((e.animation?.direction ?? "auto") === "both") {
      this.ensurePathRev(i);
      const u = we(a, n, p), f = we(d, n, p);
      i.path.setAttribute("d", u), i.pathRev && i.pathRev.setAttribute("d", f);
    } else {
      i.pathRev && (i.pathRev.remove(), i.pathRev = void 0, i.pathRevId = void 0);
      const u = o >= 0 ? a : d;
      i.path.setAttribute("d", we(u, n, p));
    }
    this.flowPathSyncedDirection.set(e.id, o);
  }
  motionPathRef(e, i, o) {
    return (i.animation?.direction ?? "auto") === "both" ? o >= 0 ? e.pathId : e.pathRevId ?? e.pathId : e.pathId;
  }
  animStyle(e) {
    return this.prefersReducedMotionFlag ? "none" : e.animation?.animation_style ?? "dots";
  }
  setFlowAriaLabel(e, i) {
    const o = this.flowNodes.get(e);
    o?.group && (o.group.setAttribute("role", "img"), o.group.setAttribute("aria-label", i));
  }
  buildSkeleton() {
    if (!this.svg || !this.config) return;
    const e = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${e.width} ${e.height}`);
    const i = document.createElementNS(F, "defs");
    this.svg.appendChild(i);
    const o = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const s = o.get(n.from_node), r = o.get(n.to_node);
      if (!s || !r) continue;
      const l = [s.position, ...n.waypoints, r.position], a = `flowme-path-${n.id}`, d = document.createElementNS(F, "path");
      d.setAttribute("id", a), d.setAttribute("d", we(l, e, n.line_style ?? "corner")), d.setAttribute("fill", "none"), i.appendChild(d);
      const p = document.createElementNS(F, "g");
      p.classList.add("flowme-flow-group"), p.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && p.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (p.style.display = "none");
      const h = this.config?.defaults?.line_width ?? nt, u = document.createElementNS(F, "use");
      u.classList.add("flow-line"), u.setAttributeNS(K, "href", `#${a}`), u.setAttribute("href", `#${a}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(h)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), p.appendChild(u);
      const f = {
        group: p,
        path: d,
        pathId: a,
        outline: u,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(p), this.flowNodes.set(n.id, f), it("skeleton:", n.id, "| style=", f.style, "| line_style=", n.line_style ?? "corner (default)");
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const e = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${e.width} ${e.height}`);
    const i = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const n = this.flowNodes.get(o.id);
      if (!n) continue;
      const s = i.get(o.from_node), r = i.get(o.to_node);
      if (!s || !r) continue;
      const l = this.latestValues.get(o.id) ?? 0, a = this.flowPathSyncedDirection.get(o.id) ?? this.computeIntendedTravelSign(o, l);
      this.syncFlowPathGeometry(o, n, a);
    }
  }
  flushUpdates() {
    for (const [e, i] of this.latestValues)
      this.applyFlow(e, i);
  }
  applyFlow(e, i) {
    const o = this.flowsById.get(e), n = this.flowNodes.get(e);
    if (!o || !n) return;
    const s = o.animation ?? {}, r = this.animStyle(o);
    n.style !== r && (this.teardownStyle(n), n.style = r);
    const l = this.profileFor(o), a = je(o, l), d = ot ? 0 : a.threshold, p = Math.abs(i), h = s.shimmer === !0, u = h && p < d && p > 0;
    if (!(ot || p >= d || u)) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const g = ot ? sn : j(p, a), m = o.speed_multiplier ?? 1;
    let v = Math.max(50, g * m);
    u && (v = v / ln);
    const y = this.config?.animation?.smooth_speed !== !1;
    v = tn(e, v, y, performance.now(), this.durInterp);
    const x = s.direction ?? "auto", _ = this.computeIntendedTravelSign(o, i);
    let C = _, k = u ? De : 1;
    const M = 600, B = 300;
    if (y && x === "auto") {
      const me = this.lastDirection.get(e), Vi = this.dirChanging.get(e);
      me !== void 0 && me !== _ && !Vi && this.dirChanging.set(e, { startMs: performance.now(), oldDir: me, newDir: _ });
      const Be = this.dirChanging.get(e);
      if (Be) {
        const Y = performance.now() - Be.startMs;
        Y < M ? (Y < B ? (k = (u ? De : 1) * (1 - Y / B), C = Be.oldDir) : (k = (u ? De : 1) * ((Y - B) / B), C = Be.newDir), !h && Y >= 280 && Y <= 320 && (v = Math.max(v, 45e3)), h && Y >= 270 && Y <= 330 && (k = Math.max(k, De))) : (this.dirChanging.delete(e), C = _);
      }
    }
    this.lastDirection.set(e, _);
    const A = o.domain ?? this.config?.domain, R = this.config?.flows.findIndex((me) => me.id === e) ?? -1, H = he(
      o,
      l,
      A,
      C,
      this.config?.domain_colors,
      R >= 0 ? R : 0
    ), S = this.gradientColors.get(e), L = o.value_gradient?.mode ?? "flow", T = S && L !== "line" ? S : H, Ze = S && L !== "flow" ? S : H, Q = T;
    n.outline && n.outline.setAttribute("stroke", Ze), this.setGroupOpacity(n, k), this.syncFlowPathGeometry(o, n, C);
    const ge = this.updateBurstState(e, p, a, l);
    switch (it("applyFlow:", e, "style=", r, "dur=", v, "dir=", C, "color=", Q), r) {
      case "dots":
        this.applyDots(n, o, l, i, v, Q, C, ge);
        break;
      case "dash":
        this.applyDash(n, o, v, Q, C, ge);
        break;
      case "arrow":
        this.applyArrows(n, o, v, Q, C, ge);
        break;
      case "trail":
        this.applyTrail(n, o, v, Q, C, ge);
        break;
      case "fluid":
        this.applyFluid(n, o, v, Q);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, o, l, i, v, Q, C, ge);
    }
    O() && x === "both" && (r === "dots" || r === "arrow" || r === "trail") && console.log(
      "[FlowMe] direction both:",
      e,
      "forward particles:",
      n.particles.length,
      "reverse particles:",
      n.particlesBack?.length ?? 0,
      "forward path:",
      n.path.id,
      "reverse path:",
      n.pathRev?.id ?? "(none)"
    );
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(e, i, o, n) {
    const s = o.peak, r = this.config?.defaults?.burst_trigger_ratio ?? rn, l = this.config?.defaults?.burst_sustain_ms ?? an, a = s * r;
    if (i < a)
      return this.burstActive.delete(e), this.burstEnteredAt.delete(e), 1;
    let d = this.burstEnteredAt.get(e);
    if (d === void 0 && (d = performance.now(), this.burstEnteredAt.set(e, d)), performance.now() - d < l) return 1;
    const p = n.burst_density_multiplier ?? 1.5;
    return this.burstActive.add(e), p;
  }
  // ── helpers ───────────────────────────────────────────────────────────────
  setGroupOpacity(e, i) {
    const o = String(i);
    for (const n of e.particles) n.shape.setAttribute("opacity", o);
    if (e.particlesBack) for (const n of e.particlesBack) n.shape.setAttribute("opacity", o);
    e.fluidGradient ? (e.group.setAttribute("opacity", i <= 0 ? "0" : o), i <= 0 && e.lineStroke?.setAttribute("opacity", "0")) : (e.group.removeAttribute("opacity"), e.lineStroke && e.lineStroke.setAttribute("opacity", i > 0 ? "0.9" : "0"));
  }
  /** Remove all style-specific DOM elements, ready to switch style */
  teardownStyle(e) {
    e.group.removeAttribute("opacity");
    for (const i of e.particles) i.shape.remove();
    if (e.particles = [], e.particlesBack) {
      for (const i of e.particlesBack) i.shape.remove();
      e.particlesBack = void 0;
    }
    e.lineStroke?.remove(), e.lineStroke = void 0, e.fluidInitialised = void 0, e.fluidGradient?.parentElement?.remove(), e.fluidGradient = void 0;
  }
  sampleFrameTime() {
    const e = performance.now();
    if (this.lastFrameForAdaptive > 0) {
      const i = e - this.lastFrameForAdaptive;
      this.frameTimeSamples.push(i), this.frameTimeSamples.length > 60 && this.frameTimeSamples.shift();
    }
    this.lastFrameForAdaptive = e;
  }
  avgFrameMs() {
    return this.frameTimeSamples.length === 0 ? 16.67 : this.frameTimeSamples.reduce((e, i) => e + i, 0) / this.frameTimeSamples.length;
  }
  /** ANIM-2: at most once per second, tune adaptive particle counts for all eligible flows */
  runAdaptivePassIfDue(e) {
    if (!this.config || e - this.lastAdaptivePassAt < 1e3 || this.frameTimeSamples.length < 30) return;
    this.lastAdaptivePassAt = e;
    const o = 1e3 / (this.config.animation?.fps ?? 60), n = this.avgFrameMs(), s = O(), r = n > o * 1.2, l = n < o * 0.8;
    for (const a of this.config.flows) {
      if (a.animation?.particle_count !== void 0) continue;
      const d = this.animStyle(a);
      if (d !== "dots" && d !== "trail") continue;
      const p = this.profileFor(a), h = Math.abs(this.latestValues.get(a.id) ?? 0), u = je(a, p), f = this.updateBurstState(a.id, h, u, p), g = Math.max(
        1,
        Math.round(p.particle_count_curve ? p.particle_count_curve(h) : Ee)
      ), m = this.config.defaults?.burst_max_particles ?? Re, v = Math.min(m, Math.max(1, Math.round(g * f)));
      let y = this.adaptiveCount.get(a.id) ?? v;
      r && y > 1 ? (y -= 1, s && console.log("[FlowMe] adaptive count:", a.id, y, "avg frame:", n)) : l && y < v && (y += 1, s && console.log("[FlowMe] adaptive count:", a.id, y, "avg frame:", n)), this.adaptiveCount.set(a.id, Math.min(y, v));
    }
  }
  /** Resolve effective particle count, respecting explicit override and burst */
  resolveParticleCount(e, i, o, n) {
    const s = e.animation ?? {};
    if (s.particle_count !== void 0) return s.particle_count;
    const r = this.animStyle(e), l = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(o) : Ee)
    ), a = Math.max(1, l), d = this.config?.defaults?.burst_max_particles ?? Re, p = Math.min(d, Math.max(1, Math.round(a * n)));
    return r === "dots" || r === "trail" ? Math.min(this.adaptiveCount.get(e.id) ?? p, p) : p;
  }
  resolveParticleRadius(e) {
    return (this.config?.defaults?.dot_radius ?? qt) * (e.animation?.particle_size ?? 1);
  }
  resolveGlow(e, i) {
    return e.animation?.glow_intensity === 0 ? !1 : i.glow;
  }
  glowFilter(e, i, o) {
    return this.resolveGlow(e, i) ? `drop-shadow(0 0 ${(6 * (e.animation?.glow_intensity ?? 1)).toFixed(1)}px ${o})` : "";
  }
  /** `animateMotion` rotate: teardrop/diamond stay screen-aligned (point up / 45°). */
  particleMotionRotateAttr(e) {
    return e === "teardrop" || e === "diamond" ? "0" : "auto";
  }
  /** Tangent rotation (degrees) for JS-driven `transform`; teardrop/diamond → 0. */
  particleTangentRotationDegrees(e, i) {
    return e === "teardrop" || e === "diamond" ? 0 : i;
  }
  // ── SPACING-1: particle begin-offset computation ─────────────────────────
  /**
   * Compute `begin` offsets (in seconds, negative = pre-delay before cycle
   * start) for all particles given the configured spacing mode.
   *
   * Returns an array of `count` numbers, each representing the `begin`
   * attribute value for `animateMotion`.
   */
  resolveParticleBegins(e, i, o, n) {
    const s = n.particle_spacing ?? "even", r = o / 1e3, l = r / i;
    switch (s) {
      case "even":
      default:
        return Array.from({ length: i }, (a, d) => -(l * d));
      case "random": {
        const a = performance.now(), d = this.randomOffsetsLastUpdate.get(e) ?? 0, p = 3e3;
        let h = this.randomOffsets.get(e);
        if (!h || h.length !== i || a - d > p) {
          const u = l * 0.1, f = [];
          for (let g = 0; g < i; g++) {
            let m, v = 0;
            do
              m = -(Math.random() * r), v++;
            while (v < 20 && f.some((y) => {
              const x = Math.abs((m - y) % r + r) % r;
              return x < u && x > r - u;
            }));
            f.push(m);
          }
          this.randomOffsets.set(e, f), this.randomOffsetsLastUpdate.set(e, a), h = f;
        }
        return h;
      }
      case "clustered": {
        const a = Math.max(1, Math.round(n.cluster_size ?? 3)), d = n.cluster_gap ?? 3, p = l * 0.3, h = [];
        let u = 0;
        for (let f = 0; f < i; f++) {
          const g = f % a;
          f > 0 && g === 0 && (u += p * a * d), h.push(-(u % r)), u += p;
        }
        return h;
      }
      case "pulse": {
        const a = 1 / Math.max(0.01, n.pulse_frequency ?? 1.5), d = n.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % a < a * d ? Array.from({ length: i }, (u, f) => -(l * 0.1 * f)) : Array.from({ length: i }, (u, f) => -(l * f));
      }
      case "wave_spacing": {
        const a = n.wave_frequency ?? 2, d = n.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (p, h) => {
          const u = h / i * Math.PI * 2 * a, f = Math.sin(u) * d * (r / 2);
          return -(l * h + f);
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
  updateLateralWaves(e) {
    if (this.config)
      for (const i of this.config.flows) {
        if ((i.animation?.particle_spacing ?? "even") !== "wave_lateral") continue;
        const o = this.flowNodes.get(i.id);
        if (!o || o.particles.length === 0) continue;
        const n = i.animation?.wave_frequency ?? 2, s = i.animation?.wave_amplitude ?? 20, r = o.particles.length, l = Math.PI * 2 / r, a = e * n * 2e-3 % (Math.PI * 2);
        for (let d = 0; d < r; d++) {
          const p = o.particles[d];
          if (!p) continue;
          const h = a + d * l, u = Math.sin(h) * s;
          if (p.shape.getAttribute("data-kind") === "custom_svg") {
            p.shape.hasAttribute("data-base-transform") || p.shape.setAttribute("data-base-transform", p.shape.getAttribute("transform") ?? "");
            const g = p.shape.getAttribute("data-base-transform") ?? "";
            p.shape.setAttribute("transform", `${g} translate(0,${u.toFixed(2)})`);
          } else
            p.shape.setAttribute("transform", `translate(0,${u.toFixed(2)})`);
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
  updateTimeBasedSpacing(e) {
    if (this.config)
      for (const i of this.config.flows) {
        const o = i.animation?.particle_spacing ?? "even";
        if (o !== "wave_spacing" && o !== "pulse") continue;
        const n = this.flowNodes.get(i.id);
        if (!n || n.particles.length === 0) continue;
        const s = n.particles.length, l = (this.durInterp.currentDurMs.get(i.id) ?? 2e3) / 1e3, a = i.animation ?? {}, d = [];
        if (o === "wave_spacing") {
          const u = a.wave_frequency ?? 2, f = Math.min(a.wave_amplitude ?? 0.85, 0.95), g = e * 1e-3 / l, m = [];
          for (let v = 0; v < s; v++) {
            const y = (v / s + g) % 1, x = Math.sin(y * Math.PI * 2 * u) * f * (1 / s);
            m.push(((y + x) % 1 + 1) % 1);
          }
          m.sort((v, y) => v - y), d.push(...m);
        } else {
          const u = a.pulse_frequency ?? 1.5, f = a.pulse_ratio ?? 0.25, g = e * u * 1e-3 % 1, m = e * 1e-3 / l % 1, v = 1 / s;
          let y;
          g < f ? y = 1 - (1 - g / f) * 0.9 : y = (g - f) / (1 - f);
          for (let x = 0; x < s; x++)
            d.push(((m + x * v * y) % 1 + 1) % 1);
        }
        const p = n.path;
        let h = 0;
        try {
          h = p ? p.getTotalLength() : 0;
        } catch {
          h = 0;
        }
        for (let u = 0; u < s; u++) {
          const f = n.particles[u];
          if (!f) continue;
          if (!f.animateMotion.hasAttribute("data-js-driven")) {
            const m = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            m.setAttribute("data-js-driven", "1"), m.setAttribute("begin", "indefinite"), m.setAttribute("dur", "1s"), f.animateMotion.replaceWith(m), f.animateMotion = m, f.shape.appendChild(m);
          }
          const g = d[u] ?? 0;
          if (h > 0 && p)
            try {
              const m = p.getPointAtLength(g * h), v = this.particleKind(f), y = Math.max(0.5, h * 0.01), x = p.getPointAtLength(Math.max(0, g * h - y)), _ = p.getPointAtLength(Math.min(h, g * h + y)), C = Math.atan2(_.y - x.y, _.x - x.x) * (180 / Math.PI), k = this.particleTangentRotationDegrees(v, C);
              f.shape.setAttribute(
                "transform",
                k === 0 ? `translate(${m.x.toFixed(2)},${m.y.toFixed(2)})` : `translate(${m.x.toFixed(2)},${m.y.toFixed(2)}) rotate(${k.toFixed(1)})`
              );
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
  applyDots(e, i, o, n, s, r, l, a) {
    const d = i.animation?.direction ?? "auto", p = this.resolveParticleCount(i, o, n, a), h = i.animation?.particle_shape ?? "circle", u = i.animation?.flicker === !0;
    if (e.particles.length !== p || e.particles[0] && this.particleKind(e.particles[0]) !== h) {
      for (const _ of e.particles) _.shape.remove();
      e.particles = [];
      for (let _ = 0; _ < p; _++)
        e.particles.push(this.makeParticle(e, h, r, i, o));
    }
    if (d === "both") {
      if (!e.particlesBack || e.particlesBack.length !== p) {
        if (e.particlesBack) for (const _ of e.particlesBack) _.shape.remove();
        e.particlesBack = [];
        for (let _ = 0; _ < p; _++)
          e.particlesBack.push(this.makeParticle(e, h, r, i, o));
      }
    } else if (e.particlesBack) {
      for (const _ of e.particlesBack) _.shape.remove();
      e.particlesBack = void 0;
    }
    const f = `${(s / 1e3).toFixed(3)}s`, g = s / 1e3, m = d === "both" ? g / 2 : 0, v = i.animation ?? {}, y = this.resolveParticleBegins(i.id, p, s, v), x = (_, C, k) => {
      for (let M = 0; M < _.length; M++) {
        const B = _[M];
        this.updateParticleColor(B, r, i, o, u);
        const A = document.createElementNS(F, "animateMotion");
        A.setAttribute("repeatCount", "indefinite"), A.setAttribute("dur", f), A.setAttribute("rotate", this.particleMotionRotateAttr(h)), A.setAttribute("begin", `${((y[M] ?? 0) + k).toFixed(3)}s`);
        const R = document.createElementNS(F, "mpath"), H = this.motionPathRef(e, i, C);
        R.setAttributeNS(K, "href", `#${H}`), R.setAttribute("href", `#${H}`), A.appendChild(R), B.animateMotion.replaceWith(A), B.animateMotion = A, B.shape.appendChild(A);
      }
    };
    x(e.particles, l, 0), e.particlesBack && x(e.particlesBack, -l, m);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(e, i, o, n, s, r) {
    for (const y of e.particles) y.shape.remove();
    if (e.particles = [], !e.lineStroke) {
      const y = document.createElementNS(F, "use");
      y.setAttributeNS(K, "href", `#${e.pathId}`), y.setAttribute("href", `#${e.pathId}`), y.setAttribute("fill", "none"), y.setAttribute("stroke-linecap", "round"), y.setAttribute("stroke-linejoin", "round"), e.group.appendChild(y), e.lineStroke = y;
    }
    const l = this.config?.defaults?.line_width ?? nt, d = (i.animation ?? {}).dash_gap ?? 0.5, p = Math.max(0.1, d / r), h = 14, u = h * p, f = this.glowFilter(i, this.profileFor(i), n);
    e.lineStroke.setAttribute("stroke", n), e.lineStroke.setAttribute("stroke-width", String(l * 2)), e.lineStroke.setAttribute("stroke-dasharray", `${h} ${u}`), f && e.lineStroke.setAttribute("filter", f);
    const g = h + u, m = e.lineStroke.querySelector("animate");
    m && m.remove();
    const v = document.createElementNS(F, "animate");
    v.setAttribute("attributeName", "stroke-dashoffset"), v.setAttribute("from", s > 0 ? "0" : `-${g}`), v.setAttribute("to", s > 0 ? `-${g}` : "0"), v.setAttribute("dur", `${(o / 1e3).toFixed(3)}s`), v.setAttribute("repeatCount", "indefinite"), e.lineStroke.appendChild(v);
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(e, i, o, n, s, r) {
    const l = this.profileFor(i), a = i.animation?.particle_count ?? Ee, d = this.config?.defaults?.burst_max_particles ?? Re, p = Math.min(d, Math.max(1, Math.round(a * r))), h = i.animation?.flicker === !0, u = i.animation?.direction ?? "auto";
    if (e.particles.length !== p) {
      for (const x of e.particles) x.shape.remove();
      e.particles = [];
      for (let x = 0; x < p; x++)
        e.particles.push(this.makeParticle(e, "arrow", n, i, l));
    }
    if (u === "both") {
      if (!e.particlesBack || e.particlesBack.length !== p) {
        if (e.particlesBack) for (const x of e.particlesBack) x.shape.remove();
        e.particlesBack = [];
        for (let x = 0; x < p; x++)
          e.particlesBack.push(this.makeParticle(e, "arrow", n, i, l));
      }
    } else if (e.particlesBack) {
      for (const x of e.particlesBack) x.shape.remove();
      e.particlesBack = void 0;
    }
    const f = `${(o / 1e3).toFixed(3)}s`, g = o / 1e3, m = u === "both" ? g / 2 : 0, v = this.resolveParticleBegins(i.id, p, o, i.animation ?? {}), y = (x, _, C) => {
      for (let k = 0; k < x.length; k++) {
        const M = x[k];
        this.updateParticleColor(M, n, i, l, h);
        const B = document.createElementNS(F, "animateMotion");
        B.setAttribute("repeatCount", "indefinite"), B.setAttribute("dur", f), B.setAttribute("rotate", this.particleMotionRotateAttr("arrow")), B.setAttribute("begin", `${((v[k] ?? 0) + C).toFixed(3)}s`);
        const A = document.createElementNS(F, "mpath"), R = this.motionPathRef(e, i, _);
        A.setAttributeNS(K, "href", `#${R}`), A.setAttribute("href", `#${R}`), B.appendChild(A), M.animateMotion.replaceWith(B), M.animateMotion = B, M.shape.appendChild(B);
      }
    };
    y(e.particles, s, 0), e.particlesBack && y(e.particlesBack, -s, m);
  }
  /**
   * trail — head uses particle_shape; four tail segments follow along path with staggered begins.
   */
  applyTrail(e, i, o, n, s, r) {
    const l = this.profileFor(i), a = i.animation?.particle_count ?? Ee, d = this.config?.defaults?.burst_max_particles ?? Re, p = Math.min(d, Math.max(1, Math.round(a * r))), h = i.animation?.flicker === !0, u = i.animation?.particle_shape ?? "circle", f = this.particleMotionRotateAttr(u), m = (i.animation?.direction ?? "auto") === "both";
    if (e.particles.length === p && e.particles[0]?.shape.hasAttribute("data-trail-pack") && e.particles[0]?.shape.getAttribute("data-head-kind") === u && (!m || e.particlesBack?.length === p && e.particlesBack[0]?.shape.hasAttribute("data-trail-pack") && e.particlesBack[0]?.shape.getAttribute("data-head-kind") === u)) {
      if (!m && e.particlesBack) {
        for (const A of e.particlesBack) A.shape.remove();
        e.particlesBack = void 0;
      }
    } else {
      for (const A of e.particles) A.shape.remove();
      if (e.particles = [], e.particlesBack) {
        for (const A of e.particlesBack) A.shape.remove();
        e.particlesBack = void 0;
      }
      for (let A = 0; A < p; A++)
        e.particles.push(this.makeTrailParticle(e, i, l, n, u));
      if (m) {
        e.particlesBack = [];
        for (let A = 0; A < p; A++)
          e.particlesBack.push(this.makeTrailParticle(e, i, l, n, u));
      }
    }
    const y = `${(o / 1e3).toFixed(3)}s`, x = o / 1e3, _ = m ? x / 2 : 0, C = this.resolveParticleBegins(i.id, p, o, i.animation ?? {});
    let k = 100;
    try {
      k = Math.max(1, e.path.getTotalLength());
    } catch {
      k = 100;
    }
    const M = (A, R, H) => {
      const S = document.createElementNS(F, "animateMotion");
      S.setAttribute("repeatCount", "indefinite"), S.setAttribute("dur", y), S.setAttribute("rotate", f), S.setAttribute("begin", `${R.toFixed(4)}s`);
      const L = document.createElementNS(F, "mpath"), T = this.motionPathRef(e, i, H);
      return L.setAttributeNS(K, "href", `#${T}`), L.setAttribute("href", `#${T}`), S.appendChild(L), A.replaceWith(S), S;
    }, B = (A, R, H) => {
      this.updateParticleColor(A, n, i, l, h);
      const S = A.trailMotions;
      if (S && S.length === 4)
        for (let L = 0; L < 4; L++) {
          const T = pn[L], Ze = R + T / k * x;
          S[L] = M(S[L], Ze, H);
        }
      A.animateMotion = M(A.animateMotion, R, H);
    };
    for (let A = 0; A < e.particles.length; A++) {
      const R = e.particles[A];
      B(R, C[A] ?? 0, s);
    }
    if (e.particlesBack)
      for (let A = 0; A < e.particlesBack.length; A++) {
        const R = e.particlesBack[A];
        B(R, (C[A] ?? 0) + _, -s);
      }
  }
  /**
   * fluid — animated linear gradient along full path (v1.23.1).
   */
  applyFluid(e, i, o, n) {
    for (const S of e.particles) S.shape.remove();
    if (e.particles = [], !this.svg) return;
    const s = this.svg.querySelector("defs");
    if (!s) return;
    const r = new Map(this.config.nodes.map((S) => [S.id, S])), l = r.get(i.from_node), a = r.get(i.to_node);
    if (!l || !a) return;
    if (!e.lineStroke) {
      const S = document.createElementNS(F, "use");
      S.setAttributeNS(K, "href", `#${e.pathId}`), S.setAttribute("href", `#${e.pathId}`), S.setAttribute("fill", "none"), S.setAttribute("stroke-linecap", "round"), S.setAttribute("stroke-linejoin", "round"), e.group.appendChild(S), e.lineStroke = S;
    }
    const p = `fluid-grad-${i.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    let h = this.svg.getElementById(p);
    h || (h = document.createElementNS(F, "linearGradient"), h.setAttribute("id", p), s.appendChild(h)), e.fluidGradient = h;
    const u = e.path;
    let f = 100;
    try {
      f = Math.max(1, u.getTotalLength());
    } catch {
      f = 100;
    }
    let g = { x: 0, y: 0 }, m = { x: 0, y: 0 };
    try {
      const S = u.getPointAtLength(0), L = u.getPointAtLength(f);
      g = { x: S.x, y: S.y }, m = { x: L.x, y: L.y };
    } catch {
      const S = this.containerSize();
      g = Me(l.position, S), m = Me(a.position, S);
    }
    const v = m.x - g.x, y = m.y - g.y, x = Math.hypot(v, y) || 1, _ = v / x, C = y / x;
    for (h.setAttribute("gradientUnits", "userSpaceOnUse"), h.setAttribute("x1", String(g.x)), h.setAttribute("y1", String(g.y)), h.setAttribute("x2", String(g.x + _ * 2 * f)), h.setAttribute("y2", String(g.y + C * 2 * f)); h.firstChild; ) h.firstChild.remove();
    const k = [
      ["0%", "0"],
      ["12%", "0.3"],
      ["25%", "1"],
      ["37%", "0.3"],
      ["50%", "0"],
      ["62%", "0.3"],
      ["75%", "1"],
      ["87%", "0.3"],
      ["100%", "0"]
    ];
    for (const [S, L] of k) {
      const T = document.createElementNS(F, "stop");
      T.setAttribute("offset", S), T.setAttribute("stop-color", n), T.setAttribute("stop-opacity", L), h.appendChild(T);
    }
    const M = document.createElementNS(F, "animateTransform");
    M.setAttribute("attributeName", "gradientTransform"), M.setAttribute("type", "translate"), M.setAttribute("additive", "replace"), M.setAttribute("calcMode", "linear"), M.setAttribute("dur", `${Math.max(1, Math.round(o))}ms`), M.setAttribute("repeatCount", "indefinite");
    const B = _ * f, A = C * f;
    M.setAttribute("from", `${-B} ${-A}`), M.setAttribute("to", "0 0"), h.appendChild(M);
    const R = (this.config?.defaults?.line_width ?? nt) * 3, H = this.glowFilter(i, this.profileFor(i), n);
    if (e.lineStroke.setAttribute("stroke", `url(#${p})`), e.lineStroke.setAttribute("stroke-width", String(R)), e.lineStroke.removeAttribute("stroke-dasharray"), H && e.lineStroke.setAttribute("filter", H), !e.fluidInitialised) {
      e.fluidInitialised = !0, e.lineStroke.setAttribute("opacity", "0");
      const S = document.createElementNS(F, "animate");
      S.setAttribute("attributeName", "opacity"), S.setAttribute("values", "0;1"), S.setAttribute("dur", "600ms"), S.setAttribute("fill", "freeze"), e.lineStroke.appendChild(S);
    }
  }
  makeTrailParticle(e, i, o, n, s) {
    const r = this.resolveParticleRadius(i), l = this.resolveGlow(i, o), a = s === "custom_svg" ? "circle" : s, d = document.createElementNS(F, "g");
    d.setAttribute("data-trail-pack", "1"), d.setAttribute("data-head-kind", s);
    const p = [], h = [], u = this.particleMotionRotateAttr(s);
    for (let y = 0; y < 4; y++) {
      const x = document.createElementNS(F, "g"), { shape: _ } = this.buildParticleShapeOnly(e, a, r * un[y], n, i);
      l && _.setAttribute("filter", this.glowFilter(i, o, n)), _.setAttribute("opacity", String(hn[y])), x.appendChild(_);
      const C = document.createElementNS(F, "animateMotion");
      C.setAttribute("repeatCount", "indefinite"), C.setAttribute("dur", "2s"), C.setAttribute("rotate", u);
      const k = document.createElementNS(F, "mpath");
      k.setAttributeNS(K, "href", `#${e.pathId}`), k.setAttribute("href", `#${e.pathId}`), C.appendChild(k), x.appendChild(C), h.push(x), p.push(C);
    }
    for (let y = 3; y >= 0; y--) d.appendChild(h[y]);
    const f = document.createElementNS(F, "g");
    let g;
    s === "custom_svg" ? g = this.buildParticleShapeOnly(e, s, r, n, i, f).shape : (g = this.buildParticleShapeOnly(e, s, r, n, i).shape, f.appendChild(g)), l && g.setAttribute("filter", this.glowFilter(i, o, n));
    const m = document.createElementNS(F, "animateMotion");
    m.setAttribute("repeatCount", "indefinite"), m.setAttribute("dur", "2s"), m.setAttribute("rotate", u);
    const v = document.createElementNS(F, "mpath");
    return v.setAttributeNS(K, "href", `#${e.pathId}`), v.setAttribute("href", `#${e.pathId}`), m.appendChild(v), f.appendChild(m), d.appendChild(f), e.group.appendChild(d), { shape: d, animateMotion: m, trailMotions: p };
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(e) {
    const i = e.shape.tagName.toLowerCase();
    return i === "g" && e.shape.hasAttribute("data-trail-pack") ? e.shape.getAttribute("data-head-kind") ?? "circle" : i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? e.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : i === "path" ? e.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  /**
   * Geometry only — used by dots/arrow and trail head/tail segments.
   */
  buildParticleShapeOnly(e, i, o, n, s, r) {
    let l, a = !1;
    switch (i) {
      case "square": {
        const d = o * 2, p = document.createElementNS(F, "rect");
        p.setAttribute("width", String(d)), p.setAttribute("height", String(d)), p.setAttribute("x", String(-d / 2)), p.setAttribute("y", String(-d / 2)), p.setAttribute("rx", "1.5"), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), l = p;
        break;
      }
      case "arrow": {
        const d = this.config?.defaults?.dot_radius ?? qt, p = s.animation?.particle_size ?? 1, h = d * p / 10, u = document.createElementNS(F, "path");
        u.setAttribute("d", cn(h)), u.setAttribute("fill", n), u.setAttribute("opacity", "0"), u.setAttribute("data-kind", "arrow"), l = u;
        break;
      }
      case "teardrop": {
        const d = document.createElementNS(F, "path");
        d.setAttribute("d", dn(o)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), d.setAttribute("data-kind", "teardrop"), l = d;
        break;
      }
      case "diamond": {
        const d = o * 1.4, p = document.createElementNS(F, "polygon");
        p.setAttribute("points", `0,${-d} ${d},0 0,${d} ${-d},0`), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "diamond"), l = p;
        break;
      }
      case "custom_svg": {
        const d = s.animation?.custom_svg_path ?? "";
        if (!d) {
          console.warn(`[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${s.id}`);
          const u = document.createElementNS(F, "circle");
          u.setAttribute("r", String(o)), u.setAttribute("fill", n), u.setAttribute("opacity", "0"), l = u;
          break;
        }
        const p = document.createElementNS(F, "path");
        p.setAttribute("d", d), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "custom_svg"), (r ?? e.group).appendChild(p), a = !0;
        try {
          const u = p.getBBox(), f = Math.max(u.width, u.height, 1), m = o * 2 / f, v = -(u.x + u.width / 2), y = -(u.y + u.height / 2);
          p.setAttribute("transform", `scale(${m.toFixed(4)}) translate(${v.toFixed(4)},${y.toFixed(4)})`);
        } catch {
        }
        l = p;
        break;
      }
      default: {
        const d = document.createElementNS(F, "circle");
        d.setAttribute("r", String(o)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), l = d;
      }
    }
    return { shape: l, alreadyAppended: a };
  }
  makeParticle(e, i, o, n, s) {
    const r = this.resolveParticleRadius(n), l = this.resolveGlow(n, s), { shape: a, alreadyAppended: d } = this.buildParticleShapeOnly(e, i, r, o, n);
    l && (a.setAttribute("filter", this.glowFilter(n, s, o)), a.style.color = o);
    const p = document.createElementNS(F, "animateMotion");
    p.setAttribute("repeatCount", "indefinite"), p.setAttribute("dur", "2s"), p.setAttribute("rotate", this.particleMotionRotateAttr(i));
    const h = document.createElementNS(F, "mpath");
    return h.setAttributeNS(K, "href", `#${e.pathId}`), h.setAttribute("href", `#${e.pathId}`), p.appendChild(h), a.appendChild(p), d || e.group.appendChild(a), { shape: a, animateMotion: p };
  }
  updateParticleColor(e, i, o, n, s) {
    if (e.shape.hasAttribute("data-trail-pack") ? e.shape.querySelectorAll("path, circle, rect, ellipse, polygon").forEach((a) => {
      a.setAttribute("fill", i);
    }) : e.shape.setAttribute("fill", i), e.shape.style.color = i, this.resolveGlow(o, n) && e.shape.setAttribute("filter", this.glowFilter(o, n, i)), e.shape.hasAttribute("data-trail-pack") || e.shape.setAttribute("opacity", "1"), s && !e.shape.hasAttribute("data-trail-pack")) {
      if (!e.flickerAnim) {
        const u = document.createElementNS(F, "animate");
        u.setAttribute("attributeName", "opacity"), u.setAttribute("repeatCount", "indefinite"), e.shape.appendChild(u), e.flickerAnim = u;
      }
      const d = (1 / (2 + Math.random() * 6)).toFixed(3), p = (0.85 + Math.random() * 0.1).toFixed(2), h = (0.95 + Math.random() * 0.05).toFixed(2);
      e.flickerAnim.setAttribute("values", `${h};${p};${h}`), e.flickerAnim.setAttribute("dur", `${d}s`);
    } else e.flickerAnim && (e.flickerAnim.remove(), e.flickerAnim = void 0);
  }
  profileFor(e) {
    return W(e.domain ?? this.config?.domain);
  }
  primaryColor(e) {
    const i = this.profileFor(e), o = e.domain ?? this.config?.domain, n = this.config?.flows.findIndex((s) => s.id === e.id) ?? -1;
    return he(e, i, o, 1, this.config?.domain_colors, n >= 0 ? n : 0);
  }
}
const fn = `/* eslint-disable no-undef */
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
`, Jt = "flowme-keyframes", ft = "flowme-cycle", gn = 5, mn = 2;
let te = null, Qt = !1;
function bn() {
  if (document.getElementById(Jt)) return;
  const t = document.createElement("style");
  t.id = Jt, t.textContent = `@keyframes ${ft} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(t);
}
function yn() {
  if (Qt) return;
  const e = CSS.registerProperty?.bind(CSS);
  if (!e) return;
  const i = [
    ["--flowme-progress", "<number>", "0"],
    ["--flowme-count", "<number>", "3"],
    ["--flowme-radius", "<number>", "5"],
    ["--flowme-line", "<number>", "2"],
    ["--flowme-amp", "<number>", "4"],
    ["--flowme-direction", "<number>", "1"],
    /** Cycle duration in milliseconds (ANIM-1 — transition for smooth speed changes) */
    ["--flowme-dur", "<number>", "2000"]
  ];
  for (const [o, n, s] of i)
    try {
      e({ name: o, syntax: n, inherits: !1, initialValue: s });
    } catch {
    }
  Qt = !0;
}
async function vn() {
  if (te) return te;
  const t = CSS.paintWorklet;
  if (!t)
    return te = Promise.reject(new Error("paintWorklet not available")), te;
  const e = new Blob([fn], { type: "application/javascript" }), i = URL.createObjectURL(e);
  return te = t.addModule(i).catch((o) => {
    throw te = null, o;
  }).finally(() => {
  }), te;
}
class wn {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = zi(() => this.flushUpdates(), 120), this.lastDurMsByFlow = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.container = e, O() && console.log("[FlowMe Renderer] init start dims:", e.offsetWidth, e.offsetHeight), this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n])), bn(), yn(), await vn();
    const o = document.createElement("div");
    o.className = "flow-houdini flow-houdini-root", o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", e.appendChild(o), this.wrapper = o;
    for (const n of i.flows) {
      const s = document.createElement("div");
      s.className = "flow-houdini", s.dataset.flowId = n.id, s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.background = "paint(flowme-painter)", s.style.setProperty("--flowme-dur", "2000"), s.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)", s.style.animation = `${ft} calc(var(--flowme-dur) * 1ms) linear infinite`, s.style.opacity = "0", o.appendChild(s), this.flowDivs.set(n.id, { el: s });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(e), await Di(e), O() && console.log("[FlowMe Renderer] stable dims:", e.offsetWidth, e.offsetHeight), this.rebuildPaths(), O() && console.log("[FlowMe Renderer] post-resize dims:", e.offsetWidth, e.offsetHeight);
  }
  applyConfig(e) {
    this.config = e, this.flowsById = new Map(e.flows.map((i) => [i.id, i])), this.rebuildPaths();
  }
  updateFlow(e, i) {
    this.flowsById.has(e) && (this.latestValues.set(e, i), this.applyUpdate());
  }
  setFlowAriaLabel(e, i) {
    const o = this.flowDivs.get(e);
    o && (o.el.setAttribute("role", "img"), o.el.setAttribute("aria-label", i));
  }
  destroy() {
    this.applyUpdate.cancel(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.wrapper?.remove(), this.wrapper = null, this.flowDivs.clear(), this.flowsById.clear(), this.latestValues.clear(), this.lastDurMsByFlow.clear(), this.container = null, this.config = null;
  }
  // -- internal --
  containerSize() {
    if (!this.container) return { width: 1, height: 1 };
    const e = this.container.getBoundingClientRect();
    return { width: Math.max(1, e.width), height: Math.max(1, e.height) };
  }
  rebuildPaths() {
    if (!this.config) return;
    const e = this.containerSize(), i = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const n = this.flowDivs.get(o.id);
      if (!n) continue;
      const s = i.get(o.from_node), r = i.get(o.to_node);
      if (!s || !r) continue;
      const d = [s.position, ...o.waypoints, r.position].map((p) => Me(p, e)).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
      n.el.style.setProperty("--flowme-path", `"${d}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [e, i] of this.latestValues) this.applyFlow(e, i);
  }
  applyFlow(e, i) {
    const o = this.flowsById.get(e), n = this.flowDivs.get(e);
    if (!o || !n) return;
    const s = this.profileFor(o), r = je(o, s), l = Math.abs(i);
    if (!(l >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = o.speed_multiplier ?? 1, p = Math.max(50, j(l, r) * d), h = o.animation?.direction ?? "auto";
    let u;
    h === "forward" ? u = 1 : h === "reverse" ? u = -1 : h === "both" ? u = 1 : u = i >= 0 ? 1 : -1;
    const f = o.domain ?? this.config?.domain, g = this.config?.flows.findIndex((k) => k.id === o.id) ?? -1, m = he(
      o,
      s,
      f,
      u,
      this.config?.domain_colors,
      g >= 0 ? g : 0
    ), v = Math.max(
      1,
      Math.round(s.particle_count_curve ? s.particle_count_curve(i) : 3)
    ), y = s.wave_amplitude_curve ? s.wave_amplitude_curve(i) : 4, x = n.el.style;
    x.setProperty("--flowme-shape", s.shape), x.setProperty("--flowme-color", m), x.setProperty("--flowme-glow", s.glow ? "1" : "0"), x.setProperty("--flowme-count", String(v)), x.setProperty("--flowme-radius", String(gn)), x.setProperty("--flowme-line", String(mn)), x.setProperty("--flowme-amp", String(y)), x.setProperty("--flowme-direction", String(u));
    const _ = this.lastDurMsByFlow.get(e) ?? p, C = Math.round(p);
    if (Math.abs(p - _) < 50) {
      x.transition = "none", x.setProperty("--flowme-dur", String(C));
      const k = n.el;
      requestAnimationFrame(() => {
        k.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)";
      });
    } else
      x.setProperty("--flowme-dur", String(C));
    this.lastDurMsByFlow.set(e, p), x.animation = `${ft} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }
  profileFor(e) {
    return W(e.domain ?? this.config?.domain);
  }
}
function xn() {
  const t = _n(), e = t ?? "svg", i = $n(), o = Hi();
  return E(
    "renderer selected:",
    o || e !== "houdini" ? "SvgRenderer" : "HoudiniRenderer",
    "| override=",
    t ?? "(none)",
    "| Houdini available:",
    i,
    "| reduced motion:",
    o,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), o ? new He() : e === "houdini" ? i ? new wn() : (E("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new He()) : new He();
}
function $n() {
  try {
    const t = CSS;
    return "paintWorklet" in t && "registerProperty" in t;
  } catch {
    return !1;
  }
}
function _n() {
  try {
    const e = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (e === "svg" || e === "houdini") return e;
  } catch {
  }
  return null;
}
function ei(t) {
  const e = t.size?.width ?? 20, i = t.size?.height ?? 15;
  return `left: ${t.position.x}%; top: ${t.position.y}%; width: ${e}%; height: ${i}%;`;
}
function An(t, e, i) {
  E(
    "renderOverlayHost →",
    "id=",
    t.id,
    "position=",
    t.position,
    "size=",
    t.size,
    "visible=",
    t.visible ?? !0,
    "opacity=",
    t.opacity ?? 1
  );
  const o = t.visible !== !1, n = t.opacity ?? 1, s = [
    o ? "" : "display:none;",
    n !== 1 ? `opacity:${n};` : ""
  ].join("");
  return t._migration_warning ? b`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${t.id}
        style=${ei(t) + s}
        tabindex="-1"
        title=${t._migration_warning}
      >
        <div class="migration-warning-inner">
          ${c("overlays.migrationPrefix")} ${t._migration_warning}
        </div>
      </div>
    ` : b`
    <div
      class="overlay overlay-custom overlay-interactive overlay-wrapper"
      data-overlay-id=${t.id}
      style=${ei(t) + s}
      tabindex=${o ? "0" : "-1"}
      role="button"
      @keydown=${(r) => i?.onOverlayKeydown?.(r, t)}
    >
      <flowme-custom-overlay
        class="overlay-interactive"
        .hass=${e}
        .card=${t.card}
      ></flowme-custom-overlay>
    </div>
    ${$}
  `;
}
let st = null, ce = null;
async function Cn() {
  if (st) return st;
  if (ce) return ce;
  const e = window.loadCardHelpers;
  return typeof e != "function" ? null : (ce = e().then((i) => (st = i, ce = null, i)).catch((i) => {
    throw ce = null, i;
  }), ce);
}
async function In(t) {
  const e = await Cn();
  return e ? e.createCardElement(t) : null;
}
var Sn = Object.defineProperty, kn = Object.getOwnPropertyDescriptor, Ye = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? kn(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && Sn(e, i, n), n;
};
let fe = class extends oe {
  updated(t) {
    super.updated(t), t.has("card") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  /**
   * Simulate a primary click on the mounted HA card so keyboard activation
   * (Enter / Space on the overlay wrapper) matches a tap on the tile/card.
   */
  activatePrimaryAction() {
    const t = this.childCard ?? this.renderRoot.querySelector(".mount")?.firstElementChild;
    t instanceof HTMLElement && t.click();
  }
  render() {
    return this.errorMessage ? b`<div class="err" title=${this.errorMessage}>!</div>` : b`<div class="mount"></div>`;
  }
  rebuildChild() {
    const t = this.card, e = t ? JSON.stringify(t) : void 0;
    if (e !== this.lastMountedConfigJson && (this.lastMountedConfigJson = e, this.disposeChild(), !!t)) {
      try {
        Fo(t);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, In(t).then((i) => {
        if (!i) {
          this.errorMessage = c("overlays.haHelpersUnavailable"), this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== e) return;
        this.childCard = i, this.hass && (this.childCard.hass = this.hass);
        const o = this.renderRoot.querySelector(".mount");
        o && (o.innerHTML = "", o.appendChild(this.childCard));
      }).catch((i) => {
        this.errorMessage = i instanceof Error ? i.message : String(i), this.requestUpdate();
      });
    }
  }
  disposeChild() {
    this.childCard && this.childCard.parentElement && this.childCard.parentElement.removeChild(this.childCard), this.childCard = void 0;
  }
};
fe.styles = vt`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    /* Ripple when the embedded card is pressed (:active applies to host). */
    :host(.overlay-interactive) {
      position: relative;
      overflow: hidden;
    }
    :host(.overlay-interactive)::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.4) 0%,
        transparent 70%
      );
      transform: scale(0);
      opacity: 0;
      transition: none;
      pointer-events: none;
      z-index: 12;
    }
    :host(.overlay-interactive:active)::after {
      transform: scale(2.5);
      opacity: 1;
      transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
    }
    @media (prefers-reduced-motion: reduce) {
      :host(.overlay-interactive)::after {
        display: none !important;
      }
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
Ye([
  Ne({ attribute: !1 })
], fe.prototype, "hass", 2);
Ye([
  Ne({ attribute: !1 })
], fe.prototype, "card", 2);
Ye([
  N()
], fe.prototype, "errorMessage", 2);
fe = Ye([
  $t("flowme-custom-overlay")
], fe);
const G = "http://www.w3.org/2000/svg";
function Le(t, e) {
  if (!t || !e) return null;
  const i = t.states[e];
  return !i || i.state === "unavailable" || i.state === "unknown" ? null : xe(i.state);
}
function Fn(t, e) {
  const i = e.domain, o = W(i);
  if (t.color) return t.color;
  const n = e.flows.filter((r) => r.from_node === t.id || r.to_node === t.id);
  if (n.length === 0) return o.default_color_positive;
  const s = /* @__PURE__ */ new Set();
  for (const r of n) {
    const l = W(r.domain ?? i), a = he(r, l, r.domain ?? i, 1, e.domain_colors, 0);
    s.add(a);
  }
  return s.size === 1 ? [...s][0] : Gi;
}
function Mn(t) {
  const e = t.getBoundingClientRect();
  return { widthPx: Math.max(1, e.width), heightPx: Math.max(1, e.height) };
}
function St(t) {
  return {
    vbW: t.viewBoxUserWidth ?? 100,
    vbH: t.viewBoxUserHeight ?? 100
  };
}
function ye(t, e) {
  const { vbW: i, vbH: o } = St(e), n = i / e.widthPx, s = o / e.heightPx;
  return Math.min(t * n, t * s);
}
function ti(t, e) {
  const { vbW: i, vbH: o } = St(e);
  return Math.max(0.04, t * Math.min(i / e.widthPx, o / e.heightPx));
}
function ii(t, e) {
  const { vbW: i, vbH: o } = St(e);
  return {
    cx: t.x / 100 * i,
    cy: t.y / 100 * o
  };
}
function Pn(t) {
  return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
class Wi {
  constructor() {
    this.lastDiagnosticLogMs = 0, this.rippleLastRaw = /* @__PURE__ */ new Map(), this.ripplePendingTimeouts = /* @__PURE__ */ new Map(), this.rippleBurstGen = /* @__PURE__ */ new Map();
  }
  reset() {
    for (const e of this.ripplePendingTimeouts.values())
      for (const i of e) window.clearTimeout(i);
    this.ripplePendingTimeouts.clear(), this.rippleLastRaw.clear(), this.rippleBurstGen.clear();
  }
  sync(e, i, o, n, s) {
    if (!e || !i) return;
    s?.resetDomEffects?.();
    let r = e.querySelector(":scope > g.node-effects-layer");
    r || (r = document.createElementNS(G, "g"), r.classList.add("node-effects-layer"), e.appendChild(r));
    let l = r.querySelector(":scope > g.node-effects-ripples");
    l || (l = document.createElementNS(G, "g"), l.classList.add("node-effects-ripples"), r.insertBefore(l, r.firstChild));
    let a = r.querySelector(":scope > g.node-effects-sync");
    for (a || (a = document.createElementNS(G, "g"), a.classList.add("node-effects-sync"), r.appendChild(a)); a.firstChild; ) a.firstChild.remove();
    const d = new Set(i.nodes.map((u) => u.id));
    for (const u of [...this.rippleLastRaw.keys()])
      d.has(u) || (this.cancelRippleBurst(u, l), this.rippleLastRaw.delete(u));
    for (const u of [...this.rippleBurstGen.keys()])
      d.has(u) || this.cancelRippleBurst(u, l);
    const p = s?.getLayoutMetrics?.(e) ?? Mn(e), h = i.defaults?.node_radius ?? 12;
    if (n - this.lastDiagnosticLogMs > 4e3) {
      this.lastDiagnosticLogMs = n;
      for (const u of i.nodes) {
        if (!u.node_effect?.type || !u.entity) continue;
        const f = o?.states[u.entity];
        console.log(
          "[FlowMe] node effect update:",
          u.id,
          u.node_effect.type,
          "entity state:",
          f?.state ?? "(none)",
          "controller exists: true"
        );
      }
    }
    for (const u of i.nodes) {
      const f = u.node_effect;
      if (!f || u.visible === !1 || !u.entity) continue;
      const g = u.size ?? h, m = ye(g, p), { cx: v, cy: y } = ii(u.position, p), x = Fn(u, i), _ = document.createElementNS(G, "g");
      switch (_.classList.add("node-effect"), _.setAttribute("data-node", u.id), f.type) {
        case "glow":
          this.appendGlow(_, u, f, o, u.entity, x, g, s, p);
          break;
        case "badge":
          this.appendBadge(_, f, o, u.entity, x, u.id, v, y, g, p, s);
          break;
        case "ripple":
          this.updateRipple(l, u, f, o, x, g, v, y, p);
          continue;
        case "alert":
          this.appendAlert(_, f, o, u.entity, x, u.id, v, y, m, n, s);
          break;
      }
      _.childNodes.length > 0 && a.appendChild(_);
    }
  }
  appendGlow(e, i, o, n, s, r, l, a, d) {
    const p = Le(n, s), h = o.peak_value ?? 1e4, u = o.glow_max_radius ?? 20, f = Math.max(0, Math.min(1, o.glow_min_intensity ?? 0.1)), g = o.glow_color || r, m = p === null ? 0 : Math.abs(p) / h, v = Math.max(f, Math.min(1, m)), y = 4 + v * u, x = 0.2 + v * 0.6;
    if (a?.setNodeDotFilter) {
      a.setNodeDotFilter(i.id, `drop-shadow(0 0 ${y.toFixed(1)}px ${g})`);
      return;
    }
    const { cx: _, cy: C } = ii(i.position, d), k = document.createElementNS(G, "circle");
    k.setAttribute("cx", String(_)), k.setAttribute("cy", String(C)), k.setAttribute("r", String(ye(l, d))), k.setAttribute("fill", "none"), k.setAttribute("stroke", g), k.setAttribute("stroke-width", String(ti(2, d))), k.setAttribute("opacity", String(x)), k.setAttribute(
      "style",
      `filter: drop-shadow(0 0 ${y.toFixed(1)}px ${g}); transition: filter 500ms ease, opacity 500ms ease`
    ), e.appendChild(k);
  }
  cancelRippleBurst(e, i) {
    const o = this.ripplePendingTimeouts.get(e);
    if (o) {
      for (const n of o) window.clearTimeout(n);
      this.ripplePendingTimeouts.delete(e);
    }
    if (i) {
      const n = `[data-ripple-owner="${Pn(e)}"]`;
      i.querySelectorAll(n).forEach((s) => s.remove());
    }
    this.rippleBurstGen.set(e, (this.rippleBurstGen.get(e) ?? 0) + 1);
  }
  scheduleRippleBurst(e, i, o, n, s, r, l, a) {
    this.cancelRippleBurst(e, i);
    const d = this.rippleBurstGen.get(e), p = 300, h = [];
    for (let u = 0; u < 3; u++)
      h.push(
        window.setTimeout(() => {
          this.rippleBurstGen.get(e) === d && this.spawnRippleRing(i, e, o, n, s, r, l, a);
        }, u * p)
      );
    this.ripplePendingTimeouts.set(e, h);
  }
  spawnRippleRing(e, i, o, n, s, r, l, a) {
    const d = ye(s + 2, a), p = ye(s * 4, a), h = ti(2, a), u = document.createElementNS(G, "g");
    u.setAttribute("data-ripple-owner", i);
    const f = document.createElementNS(G, "circle");
    f.setAttribute("cx", String(o)), f.setAttribute("cy", String(n)), f.setAttribute("r", String(d)), f.setAttribute("fill", "none"), f.setAttribute("stroke", l), f.setAttribute("stroke-width", String(h)), f.setAttribute("opacity", "0.7");
    const g = document.createElementNS(G, "animate");
    g.setAttribute("attributeName", "r"), g.setAttribute("from", String(d)), g.setAttribute("to", String(p)), g.setAttribute("dur", `${r}ms`), g.setAttribute("fill", "freeze"), g.setAttribute("begin", "indefinite");
    const m = document.createElementNS(G, "animate");
    m.setAttribute("attributeName", "opacity"), m.setAttribute("from", "0.7"), m.setAttribute("to", "0"), m.setAttribute("dur", `${r}ms`), m.setAttribute("fill", "freeze"), m.setAttribute("begin", "indefinite"), f.appendChild(g), f.appendChild(m), u.appendChild(f), e.appendChild(u), requestAnimationFrame(() => {
      try {
        g.beginElement(), m.beginElement();
      } catch {
      }
    }), window.setTimeout(() => u.remove(), r + 80);
  }
  updateRipple(e, i, o, n, s, r, l, a, d) {
    const p = Le(n, i.entity), h = o.ripple_threshold ?? 0;
    if (p === null || Math.abs(p) <= h) {
      this.cancelRippleBurst(i.id, e), this.rippleLastRaw.delete(i.id);
      return;
    }
    if (this.rippleLastRaw.get(i.id) === p) return;
    this.rippleLastRaw.set(i.id, p);
    const f = o.ripple_duration ?? 2e3, g = o.ripple_color || s;
    this.scheduleRippleBurst(i.id, e, l, a, r, f, g, d);
  }
  appendBadge(e, i, o, n, s, r, l, a, d, p, h) {
    const u = i.badge_color_on ?? "#32DC50", f = i.badge_color_off ?? "#CC3333", g = o?.states[n];
    let m = "#888888";
    if (g)
      if (g.state === "unavailable" || g.state === "unknown") m = "#888888";
      else if (i.threshold !== void 0 && i.threshold !== null) {
        const C = Le(o, n);
        m = C !== null && C >= i.threshold ? u : f;
      } else {
        const C = String(g.state).toLowerCase();
        m = C === "on" || C === "open" || C === "true" ? u : f;
      }
    if (h?.setNodeDotBackground) {
      h.setNodeDotBackground(r, m, { transitionMs: 300 });
      return;
    }
    const v = ye(d * 0.6, p), y = l + Math.min(v * 1.1, 3), x = a - Math.min(v * 1.1, 3), _ = document.createElementNS(G, "circle");
    _.setAttribute("cx", String(y)), _.setAttribute("cy", String(x)), _.setAttribute("r", String(v)), _.setAttribute("fill", m), _.setAttribute("stroke", "#ffffff"), _.setAttribute("stroke-width", String(0.03)), e.appendChild(_);
  }
  appendAlert(e, i, o, n, s, r, l, a, d, p, h) {
    const u = Le(o, n);
    if (u === null) return;
    const f = i.alert_threshold ?? 0, g = i.alert_condition ?? "above", m = i.alert_hysteresis ?? 0.05, v = Math.abs(f) * m + 1e-6;
    let y = g === "above" ? u > f : u < f;
    !y && g === "above" && u > f - v && (y = !0), !y && g === "below" && u < f + v && (y = !0);
    const x = i.alert_frequency ?? 2, _ = i.alert_color ?? "#FF0000";
    if (!y) {
      h?.setNodeDotBackground && h.setNodeDotBackground(r, s, { transitionMs: 200 });
      return;
    }
    if (h?.setNodeDotBackground) {
      const B = 1e3 / Math.max(0.25, x), A = Math.floor(p / (B / 2)) % 2 === 0;
      h.setNodeDotBackground(r, A ? _ : s, { transitionMs: 80 });
      return;
    }
    const C = document.createElementNS(G, "circle");
    C.setAttribute("cx", String(l)), C.setAttribute("cy", String(a)), C.setAttribute("r", String(d)), C.setAttribute("fill", s), C.setAttribute("opacity", "0.85");
    const k = Math.max(100, Math.round(1e3 / Math.max(0.25, x))), M = document.createElementNS(G, "animate");
    M.setAttribute("attributeName", "fill"), M.setAttribute("values", `${s};${_};${s}`), M.setAttribute("dur", `${k}ms`), M.setAttribute("repeatCount", "indefinite"), C.appendChild(M), e.appendChild(C);
  }
}
const Nn = 100;
class Bn {
  constructor(e) {
    this.apply = e, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(e) {
    if (e.prev !== e.next) {
      for (this.apply(e.next), this.undoStack.push(e); this.undoStack.length > Nn; ) this.undoStack.shift();
      this.redoStack = [], this.notify();
    }
  }
  undo() {
    const e = this.undoStack.pop();
    e && (this.apply(e.prev), this.redoStack.push(e), this.notify());
  }
  redo() {
    const e = this.redoStack.pop();
    e && (this.apply(e.next), this.undoStack.push(e), this.notify());
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
  subscribe(e) {
    return this.listeners.add(e), () => this.listeners.delete(e);
  }
  notify() {
    for (const e of this.listeners) e();
  }
}
function I(t) {
  return JSON.parse(JSON.stringify(t));
}
function z(t) {
  return t < 0 ? 0 : t > 100 ? 100 : t;
}
function ze(t, e = 8) {
  return Math.round(t / e) * e;
}
function En(t) {
  const e = new Set(t.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `node_${i}`;
    if (!e.has(o)) return o;
  }
  return `node_${Date.now()}`;
}
function Rn(t) {
  const e = new Set(t.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `flow_${i}`;
    if (!e.has(o)) return o;
  }
  return `flow_${Date.now()}`;
}
function rt(t, e, i) {
  const o = I(t);
  for (const n of o.nodes)
    n.id === e && (n.position = { x: z(i.x), y: z(i.y) });
  return o;
}
function Dn(t, e, i) {
  const o = I(t), n = {
    id: En(t),
    position: { x: z(e.x), y: z(e.y) },
    ...i ? { label: i } : {}
  };
  return o.nodes.push(n), { config: o, node: n };
}
function Ln(t, e) {
  const i = I(t);
  return i.nodes = i.nodes.filter((o) => o.id !== e), i.flows = i.flows.filter((o) => o.from_node !== e && o.to_node !== e), i;
}
function zn(t, e) {
  const i = I(t);
  for (const o of i.nodes) {
    const n = e.get(o.id);
    n && (o.position = { x: z(n.x), y: z(n.y) });
  }
  return i;
}
function On(t, e) {
  const i = I(t);
  return i.nodes = i.nodes.filter((o) => !e.has(o.id)), i.flows = i.flows.filter((o) => !e.has(o.from_node) && !e.has(o.to_node)), i;
}
function oi(t, e, i) {
  const o = I(t);
  for (const n of o.nodes)
    e.has(n.id) && (n.visible = i);
  return o;
}
function Hn(t, e, i) {
  const o = t.nodes.find((s) => s.id === i);
  if (!o) return t;
  const n = I(t);
  for (const s of n.nodes)
    e.has(s.id) && (s.position = { ...s.position, y: o.position.y });
  return n;
}
function Tn(t, e, i) {
  const o = t.nodes.find((s) => s.id === i);
  if (!o) return t;
  const n = I(t);
  for (const s of n.nodes)
    e.has(s.id) && (s.position = { ...s.position, x: o.position.x });
  return n;
}
function ni(t, e, i) {
  const o = I(t);
  for (const n of o.nodes)
    n.id === e && (i && i.length ? n.label = i : delete n.label);
  return o;
}
function at(t, e, i, o) {
  const n = I(t);
  for (const s of n.flows)
    if (s.id === e) {
      if (i < 0 || i >= s.waypoints.length) return t;
      s.waypoints[i] = {
        x: z(o.x),
        y: z(o.y)
      };
    }
  return n;
}
function si(t, e, i, o) {
  const n = I(t);
  for (const s of n.flows) {
    if (s.id !== e) continue;
    const r = Math.max(0, Math.min(s.waypoints.length, i));
    s.waypoints.splice(r, 0, {
      x: z(o.x),
      y: z(o.y)
    });
  }
  return n;
}
function ri(t, e, i) {
  const o = I(t);
  for (const n of o.flows)
    if (n.id === e) {
      if (i < 0 || i >= n.waypoints.length) return t;
      n.waypoints.splice(i, 1);
    }
  return o;
}
function ai(t, e, i, o) {
  const n = I(t), s = {
    id: Rn(t),
    from_node: e,
    to_node: i,
    entity: o,
    waypoints: []
  };
  return n.flows.push(s), { config: n, flow: s };
}
function Gn(t, e) {
  const i = I(t);
  return i.flows = i.flows.filter((o) => o.id !== e), i;
}
function Wn(t, e) {
  const i = I(t);
  return i.background.default = e, i;
}
function Un(t, e) {
  const i = I(t);
  return e && e.length ? i.background.weather_entity = e : delete i.background.weather_entity, i;
}
function Kn(t, e) {
  const i = I(t);
  return e && e.length ? i.background.sun_entity = e : delete i.background.sun_entity, i;
}
function jn(t, e) {
  const i = I(t);
  return e === void 0 || !Number.isFinite(e) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(e)), i;
}
function li(t, e, i) {
  var n;
  const o = I(t);
  return (n = o.background).weather_states ?? (n.weather_states = {}), o.background.weather_states[e] = i, o;
}
function Vn(t, e) {
  const i = I(t);
  return i.background.weather_states && (delete i.background.weather_states[e], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function Yn(t) {
  const e = new Set((t.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `overlay_${i}`;
    if (!e.has(o)) return o;
  }
  return `overlay_${Date.now()}`;
}
function Zn(t, e) {
  const i = I(t), o = e.id ?? Yn(t), n = {
    ...e,
    id: o,
    position: {
      x: z(e.position.x),
      y: z(e.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function Xn(t, e) {
  const i = I(t);
  return i.overlays = (i.overlays ?? []).filter((o) => o.id !== e), i.overlays.length === 0 && delete i.overlays, i;
}
function qn(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && (n.position = { x: z(i.x), y: z(i.y) });
  return o;
}
function ci(t, e, i) {
  const o = I(t), n = Math.max(2, Math.min(100, i.width)), s = Math.max(2, Math.min(100, i.height));
  for (const r of o.overlays ?? [])
    r.id === e && (r.size = { width: n, height: s });
  return o;
}
function Jn(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && i && (n.card = i);
  return o;
}
function Qn(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && (i ? delete n.visible : n.visible = !1);
  return o;
}
function es(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    if (n.id === e) {
      const s = Math.max(0, Math.min(1, i));
      s === 1 ? delete n.opacity : n.opacity = s;
    }
  return o;
}
function di(t, e, i) {
  const o = I(t);
  return o.opacity = { ...o.opacity, [e]: i }, o;
}
function ts(t, e, i) {
  const o = I(t);
  return o.nodes = o.nodes.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), o;
}
function is(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), o;
}
function os(t, e, i) {
  const o = I(t);
  return o.defaults = { ...o.defaults, [e]: i }, o;
}
function ns(t, e, i) {
  if (e === i) return t;
  const o = I(t), n = o.background.weather_states;
  if (!n || !(e in n)) return t;
  const s = n[e];
  return s === void 0 ? t : (delete n[e], n[i] = s, o);
}
function ss(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 || i === "corner" ? delete s.line_style : s.line_style = i, s;
  }), o;
}
function pi(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.color : s.color = i, s;
  }), o;
}
function ui(t, e, i) {
  const o = I(t);
  return o.nodes = o.nodes.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i ? delete s.visible : s.visible = !1, s;
  }), o;
}
function rs(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i ? delete s.visible : s.visible = !1, s;
  }), o;
}
function as(t, e, i) {
  const o = I(t);
  return o.visibility = { ...o.visibility, [e]: i }, o;
}
function hi(t, e, i) {
  const o = I(t);
  return i === void 0 ? o.domain_colors && (delete o.domain_colors[e], Object.keys(o.domain_colors).length === 0 && delete o.domain_colors) : o.domain_colors = { ...o.domain_colors, [e]: i }, o;
}
function ls(t, e) {
  const i = I(t);
  return i.domain = e, i;
}
function cs(t, e, i) {
  const o = i.trim();
  if (!o || o === e) return t;
  const n = t.flows.findIndex((r) => r.id === e);
  if (n < 0 || t.flows.some((r, l) => l !== n && r.id === o)) return t;
  const s = I(t);
  return s.flows = s.flows.map((r) => r.id === e ? { ...r, id: o } : r), s;
}
function fi(t, e, i) {
  const o = i.trim();
  if (!o || o === e) return t;
  const n = t.overlays ?? [], s = n.findIndex((l) => l.id === e);
  if (s < 0 || n.some((l, a) => a !== s && l.id === o)) return t;
  const r = I(t);
  return r.overlays = n.map((l) => l.id === e ? { ...l, id: o } : l), r;
}
function gi(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => n.id !== e ? n : { ...n, speed_curve_override: { ...n.speed_curve_override, ...i } }), o;
}
function ds(t, e) {
  const i = I(t);
  return i.flows = i.flows.map((o) => {
    if (o.id !== e) return o;
    const n = { ...o };
    return delete n.speed_curve_override, n;
  }), i;
}
function ps(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n.animation, ...i };
    for (const r of Object.keys(s))
      s[r] === void 0 && delete s[r];
    if (Object.keys(s).length === 0) {
      const r = { ...n };
      return delete r.animation, r;
    }
    return { ...n, animation: s };
  }), o;
}
function us(t, e) {
  const i = I(t);
  return i.flows = i.flows.map((o) => {
    if (o.id !== e) return o;
    const n = { ...o };
    return delete n.animation, n;
  }), i;
}
function mi(t, e) {
  const i = I(t);
  return i.animation = { ...i.animation, ...e }, i;
}
function hs(t, e, i) {
  const o = I(t), n = o.flows.find((s) => s.id === e);
  return n && (n.value_gradient = i), o;
}
function fs(t, e, i) {
  const o = I(t), n = o.flows.find((s) => s.id === e);
  return n && (n.value_gradient = { ...n.value_gradient, ...i }), o;
}
function bi(t, e) {
  const i = I(t), o = i.flows.find((n) => n.id === e);
  return o && delete o.value_gradient, i;
}
const kt = 8, yi = 1, gt = 255;
function gs(t, e = kt) {
  const i = Math.max(1, Math.floor(e)), o = Math.max(1, Math.ceil(t.width / i)), n = Math.max(1, Math.ceil(t.height / i)), s = new Uint16Array(o * n);
  for (let r = 0; r < n; r++) {
    const l = r * i, a = Math.min(t.height, l + i);
    for (let d = 0; d < o; d++) {
      const p = d * i, h = Math.min(t.width, p + i);
      let u = 0;
      for (let g = l; g < a; g++) {
        const m = g * t.width;
        for (let v = p; v < h; v++) {
          const y = t.data[m + v] ?? 0;
          y > u && (u = y);
        }
      }
      const f = gt - u;
      s[r * o + d] = f < yi ? yi : f;
    }
  }
  return { cols: o, rows: n, cellSize: i, data: s };
}
function ms(t, e, i) {
  return i * t.cols + e;
}
function bs(t, e, i) {
  return e < 0 || i < 0 || e >= t.cols || i >= t.rows ? gt : t.data[ms(t, e, i)] ?? gt;
}
const ys = 480, vs = 270, ws = 30;
function xs(t, e, i = ys, o = vs) {
  if (t <= 0 || e <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / t, o / e, 1);
  return {
    width: Math.max(1, Math.floor(t * n)),
    height: Math.max(1, Math.floor(e * n))
  };
}
function $s(t, e, i) {
  const o = new Uint8ClampedArray(e * i);
  for (let n = 0, s = 0; n < t.length; n += 4, s++) {
    const r = t[n] ?? 0, l = t[n + 1] ?? 0, a = t[n + 2] ?? 0;
    o[s] = 0.2126 * r + 0.7152 * l + 0.0722 * a;
  }
  return o;
}
function _s(t, e, i) {
  const o = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e;
    for (let l = 0; l < e; l++) {
      const a = t[r + Math.max(0, l - 1)] ?? 0, d = t[r + l] ?? 0, p = t[r + Math.min(e - 1, l + 1)] ?? 0;
      o[r + l] = a + 2 * d + p >> 2;
    }
  }
  const n = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e, l = Math.max(0, s - 1) * e, a = Math.min(i - 1, s + 1) * e;
    for (let d = 0; d < e; d++) {
      const p = o[l + d] ?? 0, h = o[r + d] ?? 0, u = o[a + d] ?? 0;
      n[r + d] = p + 2 * h + u >> 2;
    }
  }
  return n;
}
function As(t, e, i) {
  const o = new Uint8ClampedArray(e * i);
  for (let n = 1; n < i - 1; n++) {
    const s = (n - 1) * e, r = n * e, l = (n + 1) * e;
    for (let a = 1; a < e - 1; a++) {
      const d = t[s + (a - 1)] ?? 0, p = t[s + a] ?? 0, h = t[s + (a + 1)] ?? 0, u = t[r + (a - 1)] ?? 0, f = t[r + (a + 1)] ?? 0, g = t[l + (a - 1)] ?? 0, m = t[l + a] ?? 0, v = t[l + (a + 1)] ?? 0, y = -d - 2 * u - g + h + 2 * f + v, x = -d - 2 * p - h + g + 2 * m + v;
      let _ = Math.sqrt(y * y + x * x);
      _ < ws && (_ = 0), _ > 255 && (_ = 255), o[r + a] = _;
    }
  }
  return { width: e, height: i, data: o };
}
function Ui(t, e, i) {
  const o = xs(e, i), n = document.createElement("canvas");
  n.width = o.width, n.height = o.height;
  const s = n.getContext("2d", { willReadFrequently: !0 });
  if (!s) throw new Error("2D canvas unavailable");
  s.drawImage(t, 0, 0, o.width, o.height);
  try {
    const r = s.getImageData(0, 0, o.width, o.height);
    return { width: o.width, height: o.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function Cs(t, e, i) {
  const { width: o, height: n, rgba: s } = Ui(t, e, i), r = $s(s, o, n), l = _s(r, o, n);
  return As(l, o, n);
}
const Is = 50;
class Ss {
  constructor() {
    this.arr = [];
  }
  push(e) {
    this.arr.push(e), this.bubbleUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return;
    const e = this.arr[0], i = this.arr.pop();
    return this.arr.length > 0 && (this.arr[0] = i, this.sinkDown(0)), e;
  }
  get size() {
    return this.arr.length;
  }
  bubbleUp(e) {
    for (; e > 0; ) {
      const i = e - 1 >> 1;
      if ((this.arr[i]?.f ?? 0) <= (this.arr[e]?.f ?? 0)) return;
      [this.arr[i], this.arr[e]] = [this.arr[e], this.arr[i]], e = i;
    }
  }
  sinkDown(e) {
    const i = this.arr.length;
    for (; ; ) {
      const o = 2 * e + 1, n = 2 * e + 2;
      let s = e;
      if (o < i && (this.arr[o]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = o), n < i && (this.arr[n]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = n), s === e) return;
      [this.arr[s], this.arr[e]] = [this.arr[e], this.arr[s]], e = s;
    }
  }
}
function ks(t, e, i) {
  const [o, n] = e, [s, r] = i;
  if (o < 0 || n < 0 || o >= t.cols || n >= t.rows || s < 0 || r < 0 || s >= t.cols || r >= t.rows) return null;
  if (o === s && n === r) return [[o, n]];
  const l = t.cols * t.rows, a = new Float32Array(l);
  a.fill(1 / 0);
  const d = new Int16Array(l), p = new Int16Array(l);
  d.fill(-1), p.fill(-1);
  const h = new Uint8Array(l), u = new Uint8Array(l), f = n * t.cols + o;
  a[f] = 0;
  const g = new Ss();
  g.push({ col: o, row: n, f: vi(o, n, s, r) });
  const m = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const v = g.pop(), { col: y, row: x } = v, _ = x * t.cols + y;
    if (!u[_]) {
      if (u[_] = 1, y === s && x === r)
        return Fs(t, d, p, i);
      for (const [C, k, M] of m) {
        const B = y + C, A = x + k;
        if (B < 0 || A < 0 || B >= t.cols || A >= t.rows) continue;
        const R = A * t.cols + B;
        if (u[R]) continue;
        const H = bs(t, B, A), S = h[_] && h[_] !== M ? Is : 0, L = (a[_] ?? 1 / 0) + H + S;
        if (L < (a[R] ?? 1 / 0)) {
          a[R] = L, d[R] = y, p[R] = x, h[R] = M;
          const T = L + vi(B, A, s, r);
          g.push({ col: B, row: A, f: T });
        }
      }
    }
  }
  return null;
}
function vi(t, e, i, o) {
  return Math.abs(t - i) + Math.abs(e - o);
}
function Fs(t, e, i, o) {
  const n = [];
  let s = o[0], r = o[1];
  for (; s !== -1 && r !== -1; ) {
    n.push([s, r]);
    const l = r * t.cols + s, a = e[l] ?? -1, d = i[l] ?? -1;
    if (a === s && d === r || (s = a, r = d, s < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
function Ms(t) {
  if (t.length <= 2) return [...t];
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i++) {
    const o = t[i - 1], n = t[i], s = t[i + 1], r = n[0] - o[0], l = n[1] - o[1], a = s[0] - n[0], d = s[1] - n[1];
    r * d - l * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(l) === Math.sign(d) || e.push(n);
  }
  return e.push(t[t.length - 1]), e;
}
function Ps(t, e, i) {
  const o = wi(e, t), n = wi(i, t), s = ks(t, o, n);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: Ms(s).slice(1, -1).map((d) => Ns(d, t)), edgesUsable: !0 };
}
function wi(t, e) {
  const i = xi(Math.floor(t.x / 100 * e.cols), 0, e.cols - 1), o = xi(Math.floor(t.y / 100 * e.rows), 0, e.rows - 1);
  return [i, o];
}
function Ns(t, e) {
  return {
    x: (t[0] + 0.5) / e.cols * 100,
    y: (t[1] + 0.5) / e.rows * 100
  };
}
function xi(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
const Te = /* @__PURE__ */ new Map();
async function $i(t, e = {}) {
  const i = performance.now(), o = e.cellSize ?? kt, n = `${t.imageUrl}|${o}`, s = Te.has(n);
  let r = null;
  try {
    r = await Es(n, t.imageUrl, o);
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
  const { waypoints: l, edgesUsable: a } = Ps(r, t.from, t.to);
  return {
    waypoints: l,
    cached: s,
    edgesUsable: a,
    elapsedMs: performance.now() - i
  };
}
async function Bs(t) {
  if (!t) return null;
  try {
    const e = await Ki(t);
    return Ui(e, e.naturalWidth, e.naturalHeight);
  } catch {
    return null;
  }
}
function Es(t, e, i) {
  const o = Te.get(t);
  if (o) return o;
  const n = Rs(e, i).catch((s) => {
    throw Te.delete(t), s;
  });
  return Te.set(t, n), n;
}
async function Rs(t, e) {
  const i = await Ki(t);
  await _i();
  const o = Cs(i, i.naturalWidth, i.naturalHeight);
  return await _i(), gs(o, e);
}
function Ki(t) {
  return new Promise((e, i) => {
    const o = new Image();
    o.crossOrigin = "anonymous", o.decoding = "async", o.onload = () => e(o), o.onerror = () => i(new Error(`Failed to load background image: ${t}`)), o.src = t;
  });
}
function _i() {
  return new Promise((t) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(t, 0)) : setTimeout(t, 0);
  });
}
const ji = "ZnVuY3Rpb24gZCh0LCBuID0gOCkgewogIGNvbnN0IG8gPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG4pKSwgYyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0LndpZHRoIC8gbykpLCByID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHQuaGVpZ2h0IC8gbykpLCBzID0gbmV3IFVpbnQxNkFycmF5KGMgKiByKTsKICBmb3IgKGxldCBlID0gMDsgZSA8IHI7IGUrKykgewogICAgY29uc3QgbCA9IGUgKiBvLCBhID0gTWF0aC5taW4odC5oZWlnaHQsIGwgKyBvKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBpICogbywgdSA9IE1hdGgubWluKHQud2lkdGgsIGYgKyBvKTsKICAgICAgbGV0IGggPSAwOwogICAgICBmb3IgKGxldCBwID0gbDsgcCA8IGE7IHArKykgewogICAgICAgIGNvbnN0IEUgPSBwICogdC53aWR0aDsKICAgICAgICBmb3IgKGxldCB5ID0gZjsgeSA8IHU7IHkrKykgewogICAgICAgICAgY29uc3QgbSA9IHQuZGF0YVtFICsgeV0gPz8gMDsKICAgICAgICAgIG0gPiBoICYmIChoID0gbSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGNvbnN0IHggPSAyNTUgLSBoOwogICAgICBzW2UgKiBjICsgaV0gPSB4IDwgMSA/IDEgOiB4OwogICAgfQogIH0KICByZXR1cm4geyBjb2xzOiBjLCByb3dzOiByLCBjZWxsU2l6ZTogbywgZGF0YTogcyB9Owp9CmZ1bmN0aW9uIFAodCwgbiwgbykgewogIHJldHVybiBvICogdC5jb2xzICsgbjsKfQpmdW5jdGlvbiBSKHQsIG4sIG8pIHsKICByZXR1cm4gbiA8IDAgfHwgbyA8IDAgfHwgbiA+PSB0LmNvbHMgfHwgbyA+PSB0LnJvd3MgPyAyNTUgOiB0LmRhdGFbUCh0LCBuLCBvKV0gPz8gMjU1Owp9CmNvbnN0IE4gPSA1MDsKY2xhc3MgayB7CiAgY29uc3RydWN0b3IoKSB7CiAgICB0aGlzLmFyciA9IFtdOwogIH0KICBwdXNoKG4pIHsKICAgIHRoaXMuYXJyLnB1c2gobiksIHRoaXMuYnViYmxlVXAodGhpcy5hcnIubGVuZ3RoIC0gMSk7CiAgfQogIHBvcCgpIHsKICAgIGlmICh0aGlzLmFyci5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IG4gPSB0aGlzLmFyclswXSwgbyA9IHRoaXMuYXJyLnBvcCgpOwogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aCA+IDAgJiYgKHRoaXMuYXJyWzBdID0gbywgdGhpcy5zaW5rRG93bigwKSksIG47CiAgfQogIGdldCBzaXplKCkgewogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDsKICB9CiAgYnViYmxlVXAobikgewogICAgZm9yICg7IG4gPiAwOyApIHsKICAgICAgY29uc3QgbyA9IG4gLSAxID4+IDE7CiAgICAgIGlmICgodGhpcy5hcnJbb10/LmYgPz8gMCkgPD0gKHRoaXMuYXJyW25dPy5mID8/IDApKSByZXR1cm47CiAgICAgIFt0aGlzLmFycltvXSwgdGhpcy5hcnJbbl1dID0gW3RoaXMuYXJyW25dLCB0aGlzLmFycltvXV0sIG4gPSBvOwogICAgfQogIH0KICBzaW5rRG93bihuKSB7CiAgICBjb25zdCBvID0gdGhpcy5hcnIubGVuZ3RoOwogICAgZm9yICg7IDsgKSB7CiAgICAgIGNvbnN0IGMgPSAyICogbiArIDEsIHIgPSAyICogbiArIDI7CiAgICAgIGxldCBzID0gbjsKICAgICAgaWYgKGMgPCBvICYmICh0aGlzLmFycltjXT8uZiA/PyAwKSA8ICh0aGlzLmFycltzXT8uZiA/PyAwKSAmJiAocyA9IGMpLCByIDwgbyAmJiAodGhpcy5hcnJbcl0/LmYgPz8gMCkgPCAodGhpcy5hcnJbc10/LmYgPz8gMCkgJiYgKHMgPSByKSwgcyA9PT0gbikgcmV0dXJuOwogICAgICBbdGhpcy5hcnJbc10sIHRoaXMuYXJyW25dXSA9IFt0aGlzLmFycltuXSwgdGhpcy5hcnJbc11dLCBuID0gczsKICAgIH0KICB9Cn0KZnVuY3Rpb24geih0LCBuLCBvKSB7CiAgY29uc3QgW2MsIHJdID0gbiwgW3MsIGVdID0gbzsKICBpZiAoYyA8IDAgfHwgciA8IDAgfHwgYyA+PSB0LmNvbHMgfHwgciA+PSB0LnJvd3MgfHwgcyA8IDAgfHwgZSA8IDAgfHwgcyA+PSB0LmNvbHMgfHwgZSA+PSB0LnJvd3MpIHJldHVybiBudWxsOwogIGlmIChjID09PSBzICYmIHIgPT09IGUpIHJldHVybiBbW2MsIHJdXTsKICBjb25zdCBsID0gdC5jb2xzICogdC5yb3dzLCBhID0gbmV3IEZsb2F0MzJBcnJheShsKTsKICBhLmZpbGwoMSAvIDApOwogIGNvbnN0IGkgPSBuZXcgSW50MTZBcnJheShsKSwgZiA9IG5ldyBJbnQxNkFycmF5KGwpOwogIGkuZmlsbCgtMSksIGYuZmlsbCgtMSk7CiAgY29uc3QgdSA9IG5ldyBVaW50OEFycmF5KGwpLCBoID0gbmV3IFVpbnQ4QXJyYXkobCksIHggPSByICogdC5jb2xzICsgYzsKICBhW3hdID0gMDsKICBjb25zdCBwID0gbmV3IGsoKTsKICBwLnB1c2goeyBjb2w6IGMsIHJvdzogciwgZjogSShjLCByLCBzLCBlKSB9KTsKICBjb25zdCBFID0gWwogICAgWzEsIDAsIDFdLAogICAgWy0xLCAwLCAyXSwKICAgIFswLCAxLCAzXSwKICAgIFswLCAtMSwgNF0KICBdOwogIGZvciAoOyBwLnNpemUgPiAwOyApIHsKICAgIGNvbnN0IHkgPSBwLnBvcCgpLCB7IGNvbDogbSwgcm93OiBNIH0gPSB5LCB3ID0gTSAqIHQuY29scyArIG07CiAgICBpZiAoIWhbd10pIHsKICAgICAgaWYgKGhbd10gPSAxLCBtID09PSBzICYmIE0gPT09IGUpCiAgICAgICAgcmV0dXJuIFgodCwgaSwgZiwgbyk7CiAgICAgIGZvciAoY29uc3QgW0wsIGcsIF9dIG9mIEUpIHsKICAgICAgICBjb25zdCBDID0gbSArIEwsIGIgPSBNICsgZzsKICAgICAgICBpZiAoQyA8IDAgfHwgYiA8IDAgfHwgQyA+PSB0LmNvbHMgfHwgYiA+PSB0LnJvd3MpIGNvbnRpbnVlOwogICAgICAgIGNvbnN0IEEgPSBiICogdC5jb2xzICsgQzsKICAgICAgICBpZiAoaFtBXSkgY29udGludWU7CiAgICAgICAgY29uc3QgRCA9IFIodCwgQywgYiksIEYgPSB1W3ddICYmIHVbd10gIT09IF8gPyBOIDogMCwgVSA9IChhW3ddID8/IDEgLyAwKSArIEQgKyBGOwogICAgICAgIGlmIChVIDwgKGFbQV0gPz8gMSAvIDApKSB7CiAgICAgICAgICBhW0FdID0gVSwgaVtBXSA9IG0sIGZbQV0gPSBNLCB1W0FdID0gXzsKICAgICAgICAgIGNvbnN0IE8gPSBVICsgSShDLCBiLCBzLCBlKTsKICAgICAgICAgIHAucHVzaCh7IGNvbDogQywgcm93OiBiLCBmOiBPIH0pOwogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICByZXR1cm4gbnVsbDsKfQpmdW5jdGlvbiBJKHQsIG4sIG8sIGMpIHsKICByZXR1cm4gTWF0aC5hYnModCAtIG8pICsgTWF0aC5hYnMobiAtIGMpOwp9CmZ1bmN0aW9uIFgodCwgbiwgbywgYykgewogIGNvbnN0IHIgPSBbXTsKICBsZXQgcyA9IGNbMF0sIGUgPSBjWzFdOwogIGZvciAoOyBzICE9PSAtMSAmJiBlICE9PSAtMTsgKSB7CiAgICByLnB1c2goW3MsIGVdKTsKICAgIGNvbnN0IGwgPSBlICogdC5jb2xzICsgcywgYSA9IG5bbF0gPz8gLTEsIGkgPSBvW2xdID8/IC0xOwogICAgaWYgKGEgPT09IHMgJiYgaSA9PT0gZSB8fCAocyA9IGEsIGUgPSBpLCBzIDwgMCB8fCBlIDwgMCkpIGJyZWFrOwogIH0KICByZXR1cm4gci5yZXZlcnNlKCksIHJbMF0/LlswXSA9PT0gLTEgJiYgci5zaGlmdCgpLCByOwp9CmNvbnN0IFogPSAzMDsKZnVuY3Rpb24gdih0LCBuLCBvKSB7CiAgY29uc3QgYyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuICogbyk7CiAgZm9yIChsZXQgciA9IDAsIHMgPSAwOyByIDwgdC5sZW5ndGg7IHIgKz0gNCwgcysrKSB7CiAgICBjb25zdCBlID0gdFtyXSA/PyAwLCBsID0gdFtyICsgMV0gPz8gMCwgYSA9IHRbciArIDJdID8/IDA7CiAgICBjW3NdID0gMC4yMTI2ICogZSArIDAuNzE1MiAqIGwgKyAwLjA3MjIgKiBhOwogIH0KICByZXR1cm4gYzsKfQpmdW5jdGlvbiBHKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHQubGVuZ3RoKTsKICBmb3IgKGxldCBzID0gMDsgcyA8IG87IHMrKykgewogICAgY29uc3QgZSA9IHMgKiBuOwogICAgZm9yIChsZXQgbCA9IDA7IGwgPCBuOyBsKyspIHsKICAgICAgY29uc3QgYSA9IHRbZSArIE1hdGgubWF4KDAsIGwgLSAxKV0gPz8gMCwgaSA9IHRbZSArIGxdID8/IDAsIGYgPSB0W2UgKyBNYXRoLm1pbihuIC0gMSwgbCArIDEpXSA/PyAwOwogICAgICBjW2UgKyBsXSA9IGEgKyAyICogaSArIGYgPj4gMjsKICAgIH0KICB9CiAgY29uc3QgciA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0Lmxlbmd0aCk7CiAgZm9yIChsZXQgcyA9IDA7IHMgPCBvOyBzKyspIHsKICAgIGNvbnN0IGUgPSBzICogbiwgbCA9IE1hdGgubWF4KDAsIHMgLSAxKSAqIG4sIGEgPSBNYXRoLm1pbihvIC0gMSwgcyArIDEpICogbjsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBjW2wgKyBpXSA/PyAwLCB1ID0gY1tlICsgaV0gPz8gMCwgaCA9IGNbYSArIGldID8/IDA7CiAgICAgIHJbZSArIGldID0gZiArIDIgKiB1ICsgaCA+PiAyOwogICAgfQogIH0KICByZXR1cm4gcjsKfQpmdW5jdGlvbiBIKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4gKiBvKTsKICBmb3IgKGxldCByID0gMTsgciA8IG8gLSAxOyByKyspIHsKICAgIGNvbnN0IHMgPSAociAtIDEpICogbiwgZSA9IHIgKiBuLCBsID0gKHIgKyAxKSAqIG47CiAgICBmb3IgKGxldCBhID0gMTsgYSA8IG4gLSAxOyBhKyspIHsKICAgICAgY29uc3QgaSA9IHRbcyArIChhIC0gMSldID8/IDAsIGYgPSB0W3MgKyBhXSA/PyAwLCB1ID0gdFtzICsgKGEgKyAxKV0gPz8gMCwgaCA9IHRbZSArIChhIC0gMSldID8/IDAsIHggPSB0W2UgKyAoYSArIDEpXSA/PyAwLCBwID0gdFtsICsgKGEgLSAxKV0gPz8gMCwgRSA9IHRbbCArIGFdID8/IDAsIHkgPSB0W2wgKyAoYSArIDEpXSA/PyAwLCBtID0gLWkgLSAyICogaCAtIHAgKyB1ICsgMiAqIHggKyB5LCBNID0gLWkgLSAyICogZiAtIHUgKyBwICsgMiAqIEUgKyB5OwogICAgICBsZXQgdyA9IE1hdGguc3FydChtICogbSArIE0gKiBNKTsKICAgICAgdyA8IFogJiYgKHcgPSAwKSwgdyA+IDI1NSAmJiAodyA9IDI1NSksIGNbZSArIGFdID0gdzsKICAgIH0KICB9CiAgcmV0dXJuIHsgd2lkdGg6IG4sIGhlaWdodDogbywgZGF0YTogYyB9Owp9CmZ1bmN0aW9uIFcodCkgewogIGlmICh0Lmxlbmd0aCA8PSAyKSByZXR1cm4gWy4uLnRdOwogIGNvbnN0IG4gPSBbdFswXV07CiAgZm9yIChsZXQgbyA9IDE7IG8gPCB0Lmxlbmd0aCAtIDE7IG8rKykgewogICAgY29uc3QgYyA9IHRbbyAtIDFdLCByID0gdFtvXSwgcyA9IHRbbyArIDFdLCBlID0gclswXSAtIGNbMF0sIGwgPSByWzFdIC0gY1sxXSwgYSA9IHNbMF0gLSByWzBdLCBpID0gc1sxXSAtIHJbMV07CiAgICBlICogaSAtIGwgKiBhID09PSAwICYmIE1hdGguc2lnbihlKSA9PT0gTWF0aC5zaWduKGEpICYmIE1hdGguc2lnbihsKSA9PT0gTWF0aC5zaWduKGkpIHx8IG4ucHVzaChyKTsKICB9CiAgcmV0dXJuIG4ucHVzaCh0W3QubGVuZ3RoIC0gMV0pLCBuOwp9CmZ1bmN0aW9uIGoodCwgbiwgbywgYywgciwgcyA9IDgpIHsKICBjb25zdCBlID0gdih0LCBuLCBvKSwgbCA9IEcoZSwgbiwgbyksIGEgPSBIKGwsIG4sIG8pLCBpID0gZChhLCBzKTsKICByZXR1cm4gcShpLCBjLCByKTsKfQpmdW5jdGlvbiBxKHQsIG4sIG8pIHsKICBjb25zdCBjID0gUyhuLCB0KSwgciA9IFMobywgdCksIHMgPSB6KHQsIGMsIHIpOwogIHJldHVybiAhcyB8fCBzLmxlbmd0aCA8IDIgPyB7IHdheXBvaW50czogW10sIGVkZ2VzVXNhYmxlOiAhMCB9IDogeyB3YXlwb2ludHM6IFcocykuc2xpY2UoMSwgLTEpLm1hcCgoaSkgPT4gQihpLCB0KSksIGVkZ2VzVXNhYmxlOiAhMCB9Owp9CmZ1bmN0aW9uIFModCwgbikgewogIGNvbnN0IG8gPSBUKE1hdGguZmxvb3IodC54IC8gMTAwICogbi5jb2xzKSwgMCwgbi5jb2xzIC0gMSksIGMgPSBUKE1hdGguZmxvb3IodC55IC8gMTAwICogbi5yb3dzKSwgMCwgbi5yb3dzIC0gMSk7CiAgcmV0dXJuIFtvLCBjXTsKfQpmdW5jdGlvbiBCKHQsIG4pIHsKICByZXR1cm4gewogICAgeDogKHRbMF0gKyAwLjUpIC8gbi5jb2xzICogMTAwLAogICAgeTogKHRbMV0gKyAwLjUpIC8gbi5yb3dzICogMTAwCiAgfTsKfQpmdW5jdGlvbiBUKHQsIG4sIG8pIHsKICByZXR1cm4gdCA8IG4gPyBuIDogdCA+IG8gPyBvIDogdDsKfQpzZWxmLm9ubWVzc2FnZSA9ICh0KSA9PiB7CiAgY29uc3QgeyByZ2JhOiBuLCB3aWR0aDogbywgaGVpZ2h0OiBjLCBmcm9tUG9zOiByLCB0b1BvczogcywgY2VsbFNpemU6IGUgfSA9IHQuZGF0YSwgbCA9IHBlcmZvcm1hbmNlLm5vdygpOwogIHRyeSB7CiAgICBjb25zdCBhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4pLCBpID0gZSA/PyA4LCB7IHdheXBvaW50czogZiwgZWRnZXNVc2FibGU6IHUgfSA9IGooYSwgbywgYywgciwgcywgaSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgd2F5cG9pbnRzOiBmLAogICAgICBlZGdlc1VzYWJsZTogdSwKICAgICAgZWxhcHNlZE1zOiBwZXJmb3JtYW5jZS5ub3coKSAtIGwKICAgIH0pOwogIH0gY2F0Y2ggKGEpIHsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB3YXlwb2ludHM6IFtdLAogICAgICBlZGdlc1VzYWJsZTogITEsCiAgICAgIGVsYXBzZWRNczogcGVyZm9ybWFuY2Uubm93KCkgLSBsLAogICAgICBlcnJvcjogYSBpbnN0YW5jZW9mIEVycm9yID8gYS5tZXNzYWdlIDogU3RyaW5nKGEpCiAgICB9KTsKICB9Cn07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhmaW5kaW5nLndvcmtlci1CUHhaVndVTS5qcy5tYXAK", Ds = (t) => Uint8Array.from(atob(t), (e) => e.charCodeAt(0)), Ai = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Ds(ji)], { type: "text/javascript;charset=utf-8" });
function Ls(t) {
  let e;
  try {
    if (e = Ai && (self.URL || self.webkitURL).createObjectURL(Ai), !e) throw "";
    const i = new Worker(e, {
      type: "module",
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + ji,
      {
        type: "module",
        name: t?.name
      }
    );
  }
}
var zs = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, D = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Os(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && zs(e, i, n), n;
};
let P = class extends oe {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.inlineRename = null, this.canUndo = !1, this.nodeLabelInputRef = Z(), this.flowIdInputRef = Z(), this.overlayIdInputRef = Z(), this._pendingInspectorLabelFocus = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.flowEndpointPathfindingFlowId = null, this.flowEndpointError = null, this._pathWorkerPending = !1, this._pathPendingSelection = null, this.selectorType = "", this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1, this._editorFirstRenderLogged = !1, this._loadedImageUrl = "", this.spaceHeld = !1, this.panPointerId = null, this.stageRef = Z(), this.canvasRef = Z(), this.editorFxSvgRef = Z(), this.editorNodeFx = new Wi(), this._editorFxRaf = null, this.undoStack = new Bn((t) => this.applyConfig(
      t,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (t) => {
      if (!this.config) return;
      const e = t.target.value, i = this.config, o = Wn(i, e);
      this.pushPatch(i, o, "edit default background");
    }, this.onWeatherStateRemove = (t) => {
      if (!this.config) return;
      const e = this.config, i = Vn(e, t);
      this.pushPatch(e, i, `remove weather state ${t}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const t = new Set(Object.keys(this.config.background.weather_states ?? {})), e = P.KNOWN_WEATHER_STATES.find((n) => !t.has(n)) ?? "custom", i = this.config, o = li(i, e, "");
      this.pushPatch(i, o, `add weather state ${e}`);
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: t, toNodeId: e, waypoints: i } = this.suggestPreview, o = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), n = this.config, s = n.flows.find(
        (a) => a.from_node === t && a.to_node === e
      );
      let r, l;
      if (s)
        l = s.id, r = {
          ...n,
          flows: n.flows.map(
            (a) => a.id === s.id ? { ...a, waypoints: i.map((d) => ({ x: d.x, y: d.y })) } : a
          )
        };
      else {
        const { config: a, flow: d } = ai(n, t, e, o);
        l = d.id, r = {
          ...a,
          flows: a.flows.map(
            (p) => p.id === d.id ? { ...p, waypoints: i.map((h) => ({ x: h.x, y: h.y })) } : p
          )
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(n, r, `suggest-path ${l}`), this.selectedFlowId = l;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (t) => {
      if (!(!this.config || t.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(t);
          if (!i) return;
          const o = this.config, { config: n, node: s } = Dn(o, i, c("editor.inspector.newNodeDefaultLabel"));
          this.pushPatch(o, n, `add node ${s.id}`), this.pending = null;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const i = this.pointerToPercent(t);
          if (!i) return;
          const o = {
            type: "custom",
            position: i,
            size: { width: 20, height: 15 },
            card: { type: "entity", entity: "sensor.example_sensor" }
          }, n = this.config, { config: s, overlay: r } = Zn(n, o);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(n, s, `add overlay ${r.id}`), this.pending = null;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step;
          return;
        }
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "";
      }
    }, this.onStageContextMenu = (t) => {
      this.pending && (t.preventDefault(), this.pending = null);
    }, this.onSegmentClick = (t) => {
      if (t.stopPropagation(), !this.config) return;
      const e = t.currentTarget, i = e.dataset.flowId;
      if (!i) return;
      const o = e.dataset.segmentIndex, n = o !== void 0 ? Number(o) : NaN;
      if (t.shiftKey && Number.isFinite(n)) {
        const s = this.pointerToPercent(t);
        if (!s) return;
        const r = this.config, l = si(r, i, n, s);
        this.pushPatch(r, l, `add waypoint to ${i}`);
        return;
      }
      this.selectedFlowId = i, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null;
    }, this.onFlowPathDblClick = (t) => {
      if (t.stopPropagation(), t.preventDefault(), !this.config) return;
      const i = t.currentTarget.dataset.flowId;
      i && (this.selectorType = "flows", this.selectedFlowId = i, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null, this._pendingInspectorLabelFocus = !0);
    }, this.onNodeClick = (t) => {
      if (t.stopPropagation(), !this.config) return;
      const i = t.currentTarget.dataset.nodeId;
      if (i && this.pending?.kind === "add-flow") {
        if (this.pending.step === "pick-from") {
          this.pending = { kind: "add-flow", step: "pick-to", fromId: i };
          return;
        }
        if (this.pending.step === "pick-to" && this.pending.fromId !== i) {
          const o = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), n = this.config, { config: s, flow: r } = ai(n, this.pending.fromId, i, o);
          this.pushPatch(n, s, `add flow ${r.id}`), this.pending = null;
          return;
        }
      }
    }, this.onOverlayClick = (t) => {
      t.stopPropagation();
      const i = t.currentTarget.dataset.overlayId;
      i && (this.selectedOverlayId = i, this.selectedNodeId = null, this.selectedFlowId = null, this.customConfigDraft = "", this.customConfigError = "");
    }, this.onOverlayContextMenu = (t) => {
      t.preventDefault(), t.stopPropagation();
      const i = t.currentTarget.dataset.overlayId;
      i && window.confirm(c("editor.inspector.deleteOverlayConfirm", i)) && this.removeOverlay(i);
    }, this.onOverlayResizePointerDown = (t) => {
      if (this.previewMode || !this.config) return;
      t.stopPropagation(), t.preventDefault();
      const e = t.currentTarget, i = e.dataset.overlayId;
      if (!i) return;
      const o = (this.config.overlays ?? []).find((s) => s.id === i);
      if (!o) return;
      const n = { ...o.size ?? { width: 20, height: 15 } };
      e.setPointerCapture(t.pointerId), this.dragPointerId = t.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: i,
        startSize: n,
        startPx: { x: t.clientX, y: t.clientY }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (t) => {
      t.preventDefault(), t.stopPropagation();
      const i = t.currentTarget.dataset.nodeId;
      i && window.confirm(c("editor.inspector.deleteNodeContextConfirm", i)) && this.removeNode(i);
    }, this.onWaypointContextMenu = (t) => {
      if (t.preventDefault(), t.stopPropagation(), !this.config) return;
      const e = t.currentTarget, i = e.dataset.flowId, o = Number(e.dataset.waypointIndex);
      if (!i || !Number.isFinite(o)) return;
      const n = this.config, s = ri(n, i, o);
      this.pushPatch(n, s, `delete waypoint ${o} of ${i}`);
    }, this.stopClick = (t) => {
      t.stopPropagation();
    }, this.onHandlePointerDown = (t) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const e = t.currentTarget, i = e.dataset.waypointIndex, o = e.dataset.flowId, n = e.dataset.nodeId, s = e.dataset.overlayId;
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
            startPx: { x: t.clientX, y: t.clientY }
          };
        } else
          r = { kind: "node", id: n };
      else s && !e.classList.contains("overlay-resize") ? r = { kind: "overlay", id: s } : o && i !== void 0 && (r = { kind: "waypoint", flowId: o, index: Number(i) });
      r && (e.setPointerCapture(t.pointerId), this.dragPointerId = t.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragStartPx = { x: t.clientX, y: t.clientY }, this.dragMoved = !1, this.dragShiftHeld = t.shiftKey);
    }, this.onHandlePointerMove = (t) => {
      if (this.dragPointerId !== t.pointerId || !this.dragTarget || !this.config) return;
      const e = this.dragTarget;
      if (this.dragShiftHeld = t.shiftKey, e.kind === "overlay-resize") {
        const n = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (t.clientX - e.startPx.x) / this.scale, l = (t.clientY - e.startPx.y) / this.scale, a = r / n * 100, d = l / s * 100;
        let p = e.startSize.width + a, h = e.startSize.height + d;
        this.dragShiftHeld && (p = Math.round(p), h = Math.round(h)), this.dragMoved = !0, this.config = ci(this.config, e.id, { width: p, height: h });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const n = t.clientX - this.dragStartPx.x, s = t.clientY - this.dragStartPx.y;
        (Math.abs(n) > 4 || Math.abs(s) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const i = this.pointerToPercent(t);
      if (!i) return;
      const o = this.dragShiftHeld ? { x: z(ze(i.x)), y: z(ze(i.y)) } : i;
      if (e.kind === "node")
        this.config = rt(this.config, e.id, o);
      else if (e.kind === "node-bulk") {
        const n = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (t.clientX - e.startPx.x) / this.scale, l = (t.clientY - e.startPx.y) / this.scale, a = r / n * 100, d = l / s * 100, p = /* @__PURE__ */ new Map();
        for (const [h, u] of e.startPositions) {
          const f = this.dragShiftHeld ? ze(u.x + a) : u.x + a, g = this.dragShiftHeld ? ze(u.y + d) : u.y + d;
          p.set(h, { x: f, y: g });
        }
        this.config = zn(this.config, p);
      } else e.kind === "overlay" ? this.config = qn(this.config, e.id, o) : e.kind === "waypoint" && (this.config = at(this.config, e.flowId, e.index, o));
    }, this.onHandlePointerUp = (t) => {
      if (this.dragPointerId !== t.pointerId) return;
      const e = t.currentTarget;
      e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
      const i = this.dragStartConfig, o = this.config, n = this.dragTarget, s = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !n) return;
      if (!s && n.kind === "node") {
        const l = n.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (t.shiftKey) {
          const a = new Set(this.selectedNodeIds);
          a.has(l) ? a.delete(l) : a.add(l), this.selectedNodeIds = a, this.selectedNodeId = a.size === 1 ? Array.from(a)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([l]), this.selectedNodeId = l, this.selectedFlowId = null, this.selectedOverlayId = null;
        return;
      }
      if (!s || !i || !o || i === o) return;
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
      this.pushPatch(i, o, r);
    }, this.onKeyDown = (t) => {
      if (t.key === "Escape") {
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null;
        return;
      }
      if (!(t.metaKey || t.ctrlKey)) return;
      const i = t.key.toLowerCase();
      i === "z" && !t.shiftKey ? (t.preventDefault(), t.stopImmediatePropagation(), this.undoStack.undo()) : (i === "z" && t.shiftKey || i === "y") && (t.preventDefault(), t.stopImmediatePropagation(), this.undoStack.redo());
    }, this.onSpaceDown = (t) => {
      t.code === "Space" && !t.repeat && !this.spaceHeld && (this.spaceHeld = !0, t.preventDefault());
    }, this.onSpaceUp = (t) => {
      t.code === "Space" && (this.spaceHeld = !1, this.panPointerId !== null && (this.canvasRef.value?.releasePointerCapture(this.panPointerId), this.panPointerId = null));
    }, this.onCanvasWheel = (t) => {
      t.preventDefault();
      const e = this.canvasRef.value;
      if (!e) return;
      const i = e.getBoundingClientRect(), o = t.clientX - i.left, n = t.clientY - i.top, s = t.deltaY < 0 ? 1.25 : 0.8;
      this.adjustZoom(s, o, n);
    }, this.onCanvasPointerDown = (t) => {
      if (t.button === 1) {
        t.preventDefault(), this.canvasRef.value?.setPointerCapture(t.pointerId), this.panPointerId = t.pointerId;
        return;
      }
      t.button === 0 && this.spaceHeld && (t.preventDefault(), t.stopPropagation(), this.canvasRef.value?.setPointerCapture(t.pointerId), this.panPointerId = t.pointerId);
    }, this.onCanvasPointerMove = (t) => {
      this.panPointerId === t.pointerId && (this.panX += t.movementX, this.panY += t.movementY, this.clampPan());
    }, this.onCanvasPointerUp = (t) => {
      if (this.panPointerId !== t.pointerId) return;
      this.canvasRef.value?.releasePointerCapture(t.pointerId), this.panPointerId = null;
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState()), window.addEventListener("keydown", this.onKeyDown), document.addEventListener("keydown", this.onKeyDown, !0), document.addEventListener("keydown", this.onSpaceDown, !0), document.addEventListener("keyup", this.onSpaceUp, !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._pathWorker?.terminate(), this._pathWorker = void 0, this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown), document.removeEventListener("keydown", this.onKeyDown, !0), document.removeEventListener("keydown", this.onSpaceDown, !0), document.removeEventListener("keyup", this.onSpaceUp, !0), this._canvasResizeObserver?.disconnect(), this._canvasResizeObserver = void 0, this.scale = this.fitScale, this.panX = this.fitPanX, this.panY = this.fitPanY, this.spaceHeld = !1, this.panPointerId = null, this._editorFxRaf !== null && (cancelAnimationFrame(this._editorFxRaf), this._editorFxRaf = null), this.editorNodeFx.reset(), this.imageLayoutReady = !1;
  }
  willUpdate(t) {
    if (super.willUpdate(t), t.has("hass")) {
      const e = this.hass?.language;
      e !== this._lastLanguage && (this._lastLanguage = e, Ei(e));
    }
  }
  updated(t) {
    super.updated(t), t.has("selectedFlowId") && (this.flowEndpointError = null);
    const e = this._pendingInspectorLabelFocus;
    e && (this._pendingInspectorLabelFocus = !1), t.has("inlineRename") && this.inlineRename && this.updateComplete.then(() => {
      const i = this.shadowRoot?.querySelector(".inline-rename");
      i?.focus(), i?.select();
    }), e && this.updateComplete.then(() => {
      const i = this.nodeLabelInputRef.value ?? this.flowIdInputRef.value ?? this.overlayIdInputRef.value;
      i?.focus(), i?.select();
    }), this.updateComplete.then(() => {
      const i = this.editorFxSvgRef.value;
      i && this.config && this.hass && this.editorNodeFx.sync(i, this.config, this.hass, performance.now(), this.editorNodeFxHooks()), this.ensureEditorNodeFxRaf();
    });
  }
  ensureEditorNodeFxRaf() {
    if (!!!this.config?.nodes.some((i) => i.node_effect && i.visible !== !1)) {
      this._editorFxRaf !== null && (cancelAnimationFrame(this._editorFxRaf), this._editorFxRaf = null);
      return;
    }
    if (this._editorFxRaf !== null) return;
    const e = () => {
      this._editorFxRaf = requestAnimationFrame(e);
      const i = this.editorFxSvgRef.value;
      i && this.config && this.hass && this.editorNodeFx.sync(i, this.config, this.hass, performance.now(), this.editorNodeFxHooks());
    };
    this._editorFxRaf = requestAnimationFrame(e);
  }
  firstUpdated() {
    console.log(
      "[FlowMe Editor] firstUpdated, imageNaturalW:",
      this.imageNaturalW,
      "imageNaturalH:",
      this.imageNaturalH,
      "scale:",
      this.scale,
      "fitScale:",
      this.fitScale
    );
    const t = this.canvasRef.value;
    t && (this._canvasResizeObserver = new ResizeObserver((e) => {
      e[0] && this.recalcFit();
    }), this._canvasResizeObserver.observe(t));
  }
  /**
   * Load the background image to read its natural dimensions, then recalculate
   * the fit scale/pan so the image fills the stage width correctly.
   * Called whenever the background URL changes.
   */
  loadBackgroundImage(t) {
    if (!t || t === this._loadedImageUrl) return;
    this._loadedImageUrl = t, this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1;
    const e = new Image();
    e.onload = () => {
      this.imageNaturalW = e.naturalWidth || 1600, this.imageNaturalH = e.naturalHeight || 1e3, this.recalcFit();
    }, e.onerror = () => {
      this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1, this.recalcFit();
    }, e.src = t;
  }
  /**
   * Recalculate fitScale / fitPanX / fitPanY based on current stage size and
   * image natural dimensions. Resets live pan/zoom to fit if the user has not
   * interacted (still at the previous fit level).
   */
  recalcFit() {
    const t = this.canvasRef.value;
    if (!t) return;
    const e = t.offsetWidth - 16, i = t.offsetHeight - 8;
    if (e <= 0 || i <= 0 || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return;
    const o = e / this.imageNaturalW, n = this.imageNaturalH * o, s = 0, r = -(n - i) / 2, l = this.fitScale;
    this.fitScale = o, this.fitPanX = s, this.fitPanY = r, this.imageLayoutReady ? (this.scale === 1 || this.scale === l) && (this.scale = o, this.panX = s, this.panY = r) : (this.scale = o, this.panX = s, this.panY = r, this.imageLayoutReady = !0);
  }
  /**
   * Percent (0–100) → pixel offsets in the canvas-content scene (the box sized
   * imageNaturalW × imageNaturalH). Parent `.canvas-content` applies pan/scale;
   * do not multiply scale here.
   */
  pct2px(t) {
    return {
      x: t.x / 100 * this.imageNaturalW,
      y: t.y / 100 * this.imageNaturalH
    };
  }
  editorNodeFxHooks() {
    return {
      getLayoutMetrics: (t) => {
        const e = t.getBoundingClientRect();
        return {
          widthPx: Math.max(1, e.width),
          heightPx: Math.max(1, e.height),
          viewBoxUserWidth: this.imageNaturalW,
          viewBoxUserHeight: this.imageNaturalH
        };
      }
    };
  }
  setConfig(t) {
    try {
      this.config = ve(t), ht(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
      const e = this.config?.background?.default;
      e && this.loadBackgroundImage(e), this.updateComplete.then(() => this.recalcFit());
    } catch (e) {
      this.errorMessage = e instanceof Error ? e.message : String(e);
    }
  }
  render() {
    if (!this.config)
      return b`
        <div class="wrap">
          <p class="hint">${c("editor.hintNoConfig")}</p>
          ${this.errorMessage ? b`<pre class="error">${this.errorMessage}</pre>` : $}
        </div>
      `;
    const t = this.config.background.default, e = this.selectedNodeIds.size >= 2, i = this.selectedNodeId ? "nodes" : this.selectedFlowId ? "flows" : this.selectedOverlayId ? "overlays" : this.selectorType, o = this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? "";
    this._editorFirstRenderLogged || (this._editorFirstRenderLogged = !0, console.log(
      "[FlowMe Editor] first render, imageNaturalW:",
      this.imageNaturalW,
      "imageNaturalH:",
      this.imageNaturalH,
      "scale:",
      this.scale,
      "fitScale:",
      this.fitScale
    ));
    const n = this.imageLayoutReady && this.imageNaturalW > 0 && this.imageNaturalH > 0;
    return b`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class="z-canvas"
          role="application"
          aria-label=${c("editor.canvas.ariaLabel")}
          ${X(this.canvasRef)}
          @wheel=${this.onCanvasWheel}
          @pointerdown=${this.onCanvasPointerDown}
          @pointermove=${this.onCanvasPointerMove}
          @pointerup=${this.onCanvasPointerUp}
          @pointercancel=${this.onCanvasPointerUp}
        >
          <div
            class=${`stage ${this.spaceHeld ? "mode-pan" : this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
            @click=${this.onStageClick}
            @contextmenu=${this.onStageContextMenu}
            ${X(this.stageRef)}
          >
            <!-- canvas-content: unified scene layer for background + all content.
                 Sized to image natural dimensions so percentages map to image pixels.
                 Transform pans/zooms the whole scene as one unit. -->
            <div
              class=${`canvas-content${n ? "" : " canvas-content--pending"}`}
              style=${n ? `width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;` : "left:0;top:0;width:100%;height:100%;"}
            >
              ${t ? b`<div
                    class=${`background${n ? "" : " background--pending"}`}
                    style="background-image: url('${t}');"
                  ></div>` : $}
              ${n ? b`
                    <svg
                      class="connectors"
                      viewBox=${`0 0 ${this.imageNaturalW} ${this.imageNaturalH}`}
                      preserveAspectRatio="none"
                    >
                      ${this.config.flows.map((s) => this.renderFlowConnector(s))}
                    </svg>
                    <svg
                      class="node-effects-editor"
                      viewBox=${`0 0 ${this.imageNaturalW} ${this.imageNaturalH}`}
                      preserveAspectRatio="none"
                      ${X(this.editorFxSvgRef)}
                    ></svg>
                    ${this.config.flows.filter((s) => s.id === this.selectedFlowId).map((s) => this.renderWaypointHandles(s))}
                    ${(this.config.overlays ?? []).map((s) => this.renderOverlayHandle(s))}
                    ${this.config.nodes.map((s) => this.renderHandle(s))}
                    ${this.renderSuggestPreview()}
                  ` : $}
            </div>
          </div>
        </div>

        <!-- Suggest Path accept/cancel bar — shown between canvas and toolbar -->
        ${this.renderSuggestBar()}

        <!-- ZONE 2 — Toolbar (3-column grid) -->
        <div class="z-toolbar">

          <!-- Left (15%): Row 1 = Undo/Redo, Row 2 = Zoom−/+/Fit -->
          <div class="tb-col-undo">
            <div class="tb-icon-row">
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${c("editor.toolbar.undo")}
                ?disabled=${!this.canUndo}
                title=${this.undoLabel ? c("editor.canvas.undoTitleWithDesc", this.undoLabel) : c("editor.canvas.undoTitlePlain")}
                @click=${() => this.undoStack.undo()}
              >↩</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${c("editor.toolbar.redo")}
                ?disabled=${!this.canRedo}
                title=${this.redoLabel ? c("editor.canvas.redoTitleWithDesc", this.redoLabel) : c("editor.canvas.redoTitlePlain")}
                @click=${() => this.undoStack.redo()}
              >↪</button>
            </div>
            <div class="tb-icon-row">
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${c("editor.toolbar.zoomOut")}
                ?disabled=${this.scale <= this.fitScale}
                title=${c("editor.toolbar.zoomOut")}
                @click=${() => this.adjustZoom(0.8)}
              >−</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${c("editor.toolbar.zoomIn")}
                ?disabled=${this.scale >= 5}
                title=${c("editor.toolbar.zoomIn")}
                @click=${() => this.adjustZoom(1.25)}
              >+</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${c("editor.toolbar.fitCanvas")}
                title=${c("editor.toolbar.fitCanvas")}
                @click=${() => this.resetZoom()}
              >⊡</button>
            </div>
          </div>

          <!-- Centre (50%): Row 1 = add/multiselect, Row 2 = Save/Cancel -->
          <div class="tb-col-actions">
            <div class="tb-row tb-row-actions">
              ${e ? this.renderMultiSelectToolbar() : b`
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${c("editor.canvas.addNodeAria")}
                    title=${c("editor.canvas.addNodeAria")}
                    @click=${() => {
      this.pending = { kind: "add-node" };
    }}
                  >${c("editor.toolbar.addNode")}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${c("editor.canvas.addFlowAria")}
                    title=${c("editor.canvas.addFlowAria")}
                    @click=${() => {
      this.pending = { kind: "add-flow", step: "pick-from" };
    }}
                  >${c("editor.toolbar.addFlow")}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${c("editor.canvas.addOverlayAria")}
                    title=${c("editor.canvas.addOverlayAria")}
                    @click=${() => {
      this.pending = { kind: "add-overlay", overlayType: "custom" };
    }}
                  >${c("editor.toolbar.addOverlay")}</button>
                `}
            </div>
            <div class="tb-row tb-row-save">
              <button
                type="button"
                class="tb-btn tb-btn-save"
                aria-label=${c("editor.canvas.saveAria")}
                title=${c("editor.canvas.saveTitle")}
                @click=${() => {
      this.config && this.commitToHa(this.config);
    }}
              >💾 ${c("editor.toolbar.save")}</button>
              <button
                type="button"
                class="tb-btn tb-btn-cancel"
                aria-label=${c("editor.canvas.cancelAria")}
                title=${c("editor.canvas.cancelTitle")}
                ?disabled=${!this.savedConfig}
                @click=${() => {
      if (!this.savedConfig || !this.config) return;
      const s = this.config;
      this.pushPatch(s, this.savedConfig, "cancel all changes");
    }}
              >✕ ${c("editor.toolbar.cancel")}</button>
            </div>
          </div>

          <!-- Right (35%): Type + Element dropdowns stacked -->
          <div class="tb-col-selector">
            <select
              class="tb-select"
              aria-label=${c("editor.canvas.selectTypeAria")}
              .value=${i}
              @change=${(s) => {
      this.selectorType = s.target.value, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null;
    }}
            >
              <option value="">${c("editor.toolbar.selectType")}</option>
              <option value="nodes">${c("editor.toolbar.nodes")}</option>
              <option value="flows">${c("editor.toolbar.flows")}</option>
              <option value="overlays">${c("editor.toolbar.overlays")}</option>
            </select>
            <select
              class="tb-select"
              aria-label=${c("editor.canvas.selectElementAria")}
              ?disabled=${!i}
              .value=${o}
              @change=${(s) => {
      const r = s.target.value;
      r && (i === "nodes" ? (this.selectedNodeId = r, this.selectedNodeIds = /* @__PURE__ */ new Set([r]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = r, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = r, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null), this._pendingInspectorLabelFocus = !0);
    }}
            >
              <option value="">${c(i ? "editor.toolbar.selectElement" : "editor.toolbar.selectElementDash")}</option>
              ${i === "nodes" ? this.config.nodes.map((s) => b`
                <option value=${s.id}>${s.label ?? s.id}</option>
              `) : $}
              ${i === "flows" ? this.config.flows.map((s) => b`
                <option value=${s.id}>${s.id}</option>
              `) : $}
              ${i === "overlays" ? (this.config.overlays ?? []).map((s, r) => b`
                <option value=${s.id ?? String(r)}>${c("editor.canvas.overlayOption", r, s.id ? c("editor.canvas.overlayOptionIdPart", s.id) : "")}</option>
              `) : $}
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
  renderFlowConnector(t) {
    if (!this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return $;
    const e = new Map(this.config.nodes.map((p) => [p.id, p])), i = e.get(t.from_node), o = e.get(t.to_node);
    if (!i || !o) return $;
    const n = [i.position, ...t.waypoints, o.position], s = t.id === this.selectedFlowId, r = { width: this.imageNaturalW, height: this.imageNaturalH }, l = we(n, r, t.line_style ?? "corner");
    if (!l) return $;
    const a = t.color ?? "rgba(255,255,255,0.8)", d = [];
    for (let p = 0; p < n.length - 1; p++) {
      const h = n[p], u = n[p + 1];
      if (!h || !u) continue;
      const f = this.pct2px(h), g = this.pct2px(u);
      d.push(Ot`
        <line
          class="segment-hit"
          x1=${f.x}
          y1=${f.y}
          x2=${g.x}
          y2=${g.y}
          data-flow-id=${t.id}
          data-segment-index=${p}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
        />
      `);
    }
    return Ot`
      <g>
        ${d}
        <path
          class=${`flow-path ${s ? "selected" : ""}`}
          d=${l}
          data-flow-id=${t.id}
          style=${`stroke: ${a};`}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
        />
      </g>
    `;
  }
  renderWaypointHandles(t) {
    return t.waypoints.map(
      (e, i) => {
        const o = this.pct2px(e);
        return b`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${c("aria.waypointHandle", i, t.id)}
          data-flow-id=${t.id}
          data-waypoint-index=${i}
          style=${`left: ${o.x}px; top: ${o.y}px;`}
          @pointerdown=${this.onHandlePointerDown}
          @pointermove=${this.onHandlePointerMove}
          @pointerup=${this.onHandlePointerUp}
          @pointercancel=${this.onHandlePointerUp}
          @contextmenu=${this.onWaypointContextMenu}
          @click=${this.stopClick}
        ></div>
      `;
      }
    );
  }
  renderOverlayHandle(t) {
    const e = t.id === this.selectedOverlayId, i = t.size?.width ?? 14, o = t.size?.height ?? 8, n = this.pct2px(t.position), s = i / 100 * this.imageNaturalW, r = o / 100 * this.imageNaturalH, l = this.inlineRename?.kind === "overlay" && this.inlineRename.id === t.id;
    return b`
      <div
        class=${`overlay-handle overlay-wrapper ${e ? "selected" : ""} overlay-${t.type}`}
        role="button"
        tabindex="0"
        aria-label=${c("aria.overlayHandle", t.id)}
        aria-selected=${e ? "true" : "false"}
        data-overlay-id=${t.id}
        style=${`left: ${n.x}px; top: ${n.y}px; width: ${s}px; height: ${r}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip" @dblclick=${(a) => this.onOverlayChipDblClick(a, t)}>
          ${l ? b`<input
                class="inline-rename overlay-inline-rename"
                type="text"
                spellcheck="false"
                .value=${this.inlineRename.draft}
                @input=${(a) => {
      const d = this.inlineRename;
      !d || d.kind !== "overlay" || d.id !== t.id || (this.inlineRename = { ...d, draft: a.target.value });
    }}
                @keydown=${(a) => {
      a.key === "Escape" ? (a.preventDefault(), this.inlineRename = null) : a.key === "Enter" && (a.preventDefault(), this.commitOverlayInlineRename(!0));
    }}
                @blur=${() => {
      this.inlineRename?.kind === "overlay" && this.inlineRename.id === t.id && this.commitOverlayInlineRename(!0);
    }}
              />` : b`<span>${t.id}<span class="overlay-type-badge">${t.type}</span></span>`}
        </div>
        ${e ? b`<div
              class="overlay-resize"
              data-overlay-id=${t.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : $}
      </div>
    `;
  }
  renderHandle(t) {
    const e = this.selectedNodeIds.has(t.id), i = e && this.selectedNodeIds.size === 1, o = e && this.selectedNodeIds.size > 1, n = e ? Array.from(this.selectedNodeIds).indexOf(t.id) : -1, s = t.visible === !1, r = this.inlineRename?.kind === "node" && this.inlineRename.id === t.id, l = this.pct2px(t.position);
    return b`
      <div
        class=${`handle ${i ? "selected" : ""} ${o ? "multi-selected" : ""} ${e ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
        role="button"
        tabindex="0"
        aria-label=${c("aria.nodeHandle", t.label ?? t.id, t.position.x, t.position.y)}
        aria-selected=${e ? "true" : "false"}
        data-node-id=${t.id}
        style=${`left: ${l.x}px; top: ${l.y}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span
          class="handle-dot"
          @dblclick=${(a) => this.onNodeDotDblClick(a, t)}
        ></span>
        ${r ? b`<input
              class="inline-rename"
              type="text"
              spellcheck="false"
              .value=${this.inlineRename.draft}
              @input=${(a) => {
      const d = this.inlineRename;
      !d || d.kind !== "node" || d.id !== t.id || (this.inlineRename = { ...d, draft: a.target.value });
    }}
              @keydown=${(a) => {
      a.key === "Escape" ? (a.preventDefault(), this.inlineRename = null) : a.key === "Enter" && (a.preventDefault(), this.commitNodeInlineRename(!0));
    }}
              @blur=${() => {
      this.inlineRename?.kind === "node" && this.inlineRename.id === t.id && this.commitNodeInlineRename(!0);
    }}
            />` : t.label ? b`<span class="handle-label" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, t)}
                >${t.label}</span
              >` : b`<span class="handle-id" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, t)}
                >${t.id}</span
              >`}
        ${e && this.selectedNodeIds.size >= 2 ? b`<span class="suggest-badge">${n + 1}</span>` : $}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(a) => {
      if (a.stopPropagation(), !this.config) return;
      const d = this.config, p = ui(d, t.id, s);
      this.pushPatch(d, p, `${s ? "show" : "hide"} node ${t.id}`);
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
  renderEntityPicker(t, e, i) {
    const o = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), n = i?.includeDomains ?? [], s = i?.placeholder ?? c("editor.inspector.entityPickerFallbackPlaceholder");
    if (o) {
      const p = (h) => {
        h.stopPropagation(), e((h.detail?.value ?? "").trim());
      };
      return b`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${t}
          .includeDomains=${n}
          @value-changed=${p}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, l = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, a = Object.keys(r).filter((p) => {
      if (n.length === 0) return !0;
      const h = p.split(".")[0];
      return !!h && n.includes(h);
    }).sort();
    return b`
      <input
        type="text"
        list=${l}
        placeholder=${s}
        .value=${t}
        @change=${(p) => {
      e(p.target.value.trim());
    }}
      />
      <datalist id=${l}>
        ${a.map((p) => b`<option value=${p}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return $;
    if (this.selectedNodeId) {
      const t = this.config.nodes.find((i) => i.id === this.selectedNodeId);
      if (!t) return $;
      const e = (i, o) => {
        if (!this.config) return;
        const n = this.config, s = {
          ...n,
          nodes: n.nodes.map((r) => r.id === t.id ? { ...r, ...i } : r)
        };
        this.pushPatch(n, s, o);
      };
      return b`
        <div class="inspector">
          <h3>${c("editor.inspector.nodeHeading", t.id)}</h3>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.label")}</span>
              <input
                type="text"
                ${X(this.nodeLabelInputRef)}
                .value=${t.label ?? ""}
                @change=${(i) => this.onNodeLabelChange(t.id, i)}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.entity")}</span>
              ${this.renderEntityPicker(
        t.entity ?? "",
        (i) => this.setNodeEntity(t.id, i),
        { includeDomains: ["sensor", "binary_sensor", "input_number", "number"] }
      )}
            </label>
          </div>

          <!-- Row 2: Colour | Visible | Show value | Show label -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.colour")}</span>
              <input
                type="color"
                .value=${t.color ?? "#ffffff"}
                @change=${(i) => {
        const o = i.target.value;
        e({ color: o }, `set color of ${t.id}`);
      }}
              />
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${t.visible !== !1}
                @change=${(i) => {
        if (!this.config) return;
        const o = i.target.checked, n = this.config, s = ui(n, t.id, o);
        this.pushPatch(n, s, `set visible of ${t.id}`);
      }}
              />
              <span class="node-cell-label">${c("editor.inspector.visible")}</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${t.show_value !== !1}
                @change=${(i) => {
        const o = i.target.checked;
        e({ show_value: o || void 0 }, `set show_value of ${t.id}`);
      }}
              />
              <span class="node-cell-label">${c("editor.inspector.showValue")}</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${t.show_label !== !1}
                @change=${(i) => {
        const o = i.target.checked;
        e({ show_label: o || void 0 }, `set show_label of ${t.id}`);
      }}
              />
              <span class="node-cell-label">${c("editor.inspector.showLabel")}</span>
            </label>
          </div>

          <!-- Row 3: X% | Y% | Size | Opacity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.positionX")}</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(t.position.x))}
                @change=${(i) => {
        if (!this.config) return;
        const o = parseFloat(i.target.value);
        if (!Number.isFinite(o)) return;
        const n = this.config, s = rt(n, t.id, { x: o, y: t.position.y });
        this.pushPatch(n, s, `move ${t.id} x`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.positionY")}</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(t.position.y))}
                @change=${(i) => {
        if (!this.config) return;
        const o = parseFloat(i.target.value);
        if (!Number.isFinite(o)) return;
        const n = this.config, s = rt(n, t.id, { x: t.position.x, y: o });
        this.pushPatch(n, s, `move ${t.id} y`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.sizePx")}</span>
              <input
                type="number"
                min="4" max="60" step="1"
                .value=${String(t.size ?? 12)}
                @change=${(i) => {
        const o = parseInt(i.target.value, 10);
        Number.isFinite(o) && e({ size: o }, `set size of ${t.id}`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.opacity")}</span>
              <input
                type="number"
                min="0" max="1" step="0.05"
                .value=${String(t.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const o = parseFloat(i.target.value);
        if (!Number.isFinite(o)) return;
        const n = this.config, s = ts(n, t.id, o >= 1 ? void 0 : o);
        this.pushPatch(n, s, `set opacity of ${t.id}`);
      }}
              />
            </label>
          </div>

          ${this.renderNodeEffectInspector(t, e)}

          <!-- Delete -->
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(t.id)}>${c("editor.inspector.deleteNode")}</button>
          </div>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const t = this.config.flows.find((i) => i.id === this.selectedFlowId);
      if (!t) return $;
      const e = this.config.flows.findIndex((i) => i.id === t.id);
      return b`
        <div class="inspector">
          <label class="inspector-id-row">
            <span class="node-cell-label">${c("editor.inspector.flowIdField")}</span>
            <input
              type="text"
              spellcheck="false"
              ${X(this.flowIdInputRef)}
              .value=${t.id}
              @change=${(i) => this.onInspectorFlowIdChange(t.id, i)}
            />
          </label>
          <h3>${c("editor.inspector.flowHeading", t.id)}</h3>
          <fieldset class="inspector-fieldset">
            <legend class="inspector-legend">${c("editor.inspector.routeAndSensor")}</legend>
            <div class="field-row flow-endpoint-row">
              <label for=${`flow-from-${t.id}`}>${c("editor.inspector.fromNode")}</label>
              <select
                id=${`flow-from-${t.id}`}
                class="flow-endpoint-select"
                ?disabled=${this.flowEndpointPathfindingFlowId === t.id}
                .value=${t.from_node}
                @change=${(i) => {
        const o = i.target.value;
        this.onFlowFromNodeChange(t.id, o);
      }}
              >
                ${this.config.nodes.map(
        (i) => b`<option value=${i.id} ?selected=${i.id === t.from_node}>${i.label ?? i.id}</option>`
      )}
              </select>
            </div>
            <div class="field-row flow-endpoint-row">
              <label for=${`flow-to-${t.id}`}>${c("editor.inspector.toNode")}</label>
              <select
                id=${`flow-to-${t.id}`}
                class="flow-endpoint-select"
                ?disabled=${this.flowEndpointPathfindingFlowId === t.id}
                .value=${t.to_node}
                @change=${(i) => {
        const o = i.target.value;
        this.onFlowToNodeChange(t.id, o);
      }}
              >
                ${this.config.nodes.map(
        (i) => b`<option value=${i.id} ?selected=${i.id === t.to_node}>${i.label ?? i.id}</option>`
      )}
              </select>
            </div>
            ${this.flowEndpointPathfindingFlowId === t.id ? b`<p class="hint-sub flow-endpoint-busy">
                  ${c("editor.toolbar.suggestPathFinding")}
                  <span class="suggest-path-spinner" aria-hidden="true"></span>
                </p>` : $}
            ${this.flowEndpointError && this.selectedFlowId === t.id ? b`<p class="flow-endpoint-error">${this.flowEndpointError}</p>` : $}
            <label>
              ${c("editor.inspector.entity")}
              ${this.renderEntityPicker(
        t.entity,
        (i) => this.setFlowEntity(t.id, i),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
            </label>
          </fieldset>
          ${this.renderWaypointList(t)}
          <label>
            ${c("editor.inspector.lineStyle")}
            <select
              .value=${t.line_style ?? "corner"}
              @change=${(i) => {
        if (!this.config) return;
        const o = i.target.value, n = this.config, s = ss(n, t.id, o);
        this.pushPatch(n, s, `set line style of ${t.id}`);
      }}
            >
              ${lt.map(
        (i) => b`<option value=${i} ?selected=${(t.line_style ?? "corner") === i}>${i}</option>`
      )}
            </select>
          </label>
          <label>
            ${c("editor.inspector.colourOverride")}
            <div class="color-row">
              ${(() => {
        const i = W(t.domain ?? this.config.domain), o = he(
          t,
          i,
          t.domain ?? this.config.domain,
          1,
          this.config.domain_colors,
          e >= 0 ? e : 0
        );
        return b`
                  <input
                    type="color"
                    .value=${t.color ?? o}
                    @change=${(n) => {
          if (!this.config) return;
          const s = n.target.value, r = this.config, l = pi(r, t.id, s);
          this.pushPatch(r, l, `set colour of ${t.id}`);
        }}
                  />
                  <span class="color-effective">${t.color ? c("editor.inspector.colourOverrideActive") : c("editor.inspector.colourDomainDefault")}</span>
                  ${t.color ? b`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const n = this.config, s = pi(n, t.id, void 0);
          this.pushPatch(n, s, `clear colour of ${t.id}`);
        }}>${c("editor.inspector.clearColour")}</button>` : $}
                `;
      })()}
            </div>
          </label>
          <label>
            ${c("editor.inspector.flowOpacity")}
            <div class="inspector-slider-row">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                .value=${String(t.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const o = parseFloat(i.target.value);
        if (!Number.isFinite(o)) return;
        const n = this.config, s = is(n, t.id, o);
        this.pushPatch(n, s, `set opacity of ${t.id}`);
      }}
              />
              <span>${(t.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            ${c("editor.inspector.flowVisible")}
            <div class="row">
              <input
                type="checkbox"
                .checked=${t.visible !== !1}
                @change=${(i) => {
        if (!this.config) return;
        const o = i.target.checked, n = this.config, s = rs(n, t.id, o);
        this.pushPatch(n, s, `${o ? "show" : "hide"} flow ${t.id}`);
      }}
              />
              <span>${t.visible !== !1 ? c("editor.inspector.shown") : c("editor.inspector.hidden")}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(t)}
          ${this.renderAnimationSection(t)}
          ${this.renderValueGradientSection(t)}
          <button class="danger" @click=${() => this.removeFlow(t.id)}>${c("editor.inspector.deleteFlow")}</button>
        </div>
      `;
    }
    if (this.selectedOverlayId) {
      const t = (this.config.overlays ?? []).find((e) => e.id === this.selectedOverlayId);
      return t ? this.renderOverlayInspector(t) : $;
    }
    return $;
  }
  renderSpeedCurveSection(t) {
    if (!this.config) return b``;
    const e = W(t.domain ?? this.config.domain), i = je(t, e), o = t.speed_curve_override ?? {}, n = (l, a, d) => b`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${a}${d ? b` <small>(${d})</small>` : $}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof i[l] == "number" ? i[l].toFixed(0) : ""}
          .value=${o[l] !== void 0 ? String(o[l]) : ""}
          @change=${(p) => {
      if (!this.config) return;
      const h = p.target.value.trim();
      if (h === "") {
        const u = {};
        for (const m of Object.keys(o))
          m !== l && (u[m] = o[m]);
        const f = this.config, g = gi(f, t.id, u);
        this.pushPatch(f, g, `update speed curve ${l} for ${t.id}`);
      } else {
        const u = parseFloat(h);
        if (!Number.isFinite(u)) return;
        const f = this.config, g = gi(f, t.id, { ...o, [l]: u });
        this.pushPatch(f, g, `update speed curve ${l} for ${t.id}`);
      }
    }}
        />
      </div>
    `, r = [i.threshold, i.p50, i.peak].map((l) => `${(j(l, i) / 1e3).toFixed(1)}s`);
    return b`
      <details class="speed-curve-details">
        <summary>${c("editor.inspector.speedCurveOverrideSummary")}</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            ${c("editor.inspector.speedCurveHint", e.unit_label, t.domain ?? this.config.domain)}
          </p>
          ${n("threshold", c("editor.inspector.threshold"), e.unit_label)}
          ${n("p50", c("editor.inspector.medianP50"), e.unit_label)}
          ${n("peak", c("editor.inspector.peak"), e.unit_label)}
          ${n("max_duration", c("editor.inspector.maxDuration"), c("editor.inspector.ms"))}
          ${n("min_duration", c("editor.inspector.minDuration"), c("editor.inspector.ms"))}
          ${n("steepness", c("editor.inspector.steepness"), c("editor.inspector.k"))}
          <div class="speed-curve-preview">
            <span>${c("editor.inspector.previewAtPoints")}</span>
            <strong>${r[0]}</strong>
            /
            <strong>${r[1]}</strong>
            /
            <strong>${r[2]}</strong>
          </div>
          ${Object.keys(o).length > 0 ? b`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const l = this.config, a = ds(l, t.id);
      this.pushPatch(l, a, `reset speed curve for ${t.id}`);
    }}>${c("editor.inspector.resetToDomainDefaults")}</button>` : $}
        </div>
      </details>
    `;
  }
  defaultNodeEffect(t) {
    switch (t) {
      case "glow":
        return {
          type: "glow",
          glow_max_radius: 20,
          glow_min_intensity: 0.1,
          peak_value: 1e4
        };
      case "badge":
        return { type: "badge", badge_color_on: "#32DC50", badge_color_off: "#CC3333", threshold: null };
      case "ripple":
        return { type: "ripple", ripple_duration: 2e3, ripple_threshold: 0 };
      case "alert":
        return {
          type: "alert",
          alert_threshold: 0,
          alert_condition: "above",
          alert_color: "#FF0000",
          alert_frequency: 2,
          alert_hysteresis: 0.05
        };
      default:
        return {
          type: "glow",
          glow_max_radius: 20,
          glow_min_intensity: 0.1,
          peak_value: 1e4
        };
    }
  }
  /** Self-contained animated SVG (no hass) for the inspector preview box (v1.23.2). */
  renderNodeEffectPreviewAnim(t) {
    const e = t.color ?? "#4ADE80", i = t.node_effect;
    if (!i)
      return b`
        <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        </svg>`;
    const o = i.type === "glow" && i.glow_color || e, n = i.type === "ripple" && i.ripple_color || e, s = i.type === "alert" ? i.alert_color ?? "#FF0000" : "#FF0000";
    switch (i.type) {
      case "glow": {
        const r = `fm-ed-glow-${t.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
        return b`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id=${r} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="50" cy="50" r="14" fill="${o}" filter=${`url(#${r})`} opacity="0.95">
              <animate attributeName="opacity" values="0.55;1;0.55" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      }
      case "badge":
        return b`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${e}"/>
            <circle cx="62" cy="38" r="7" fill="${i.badge_color_on ?? "#32DC50"}">
              <animate attributeName="fill" values="${i.badge_color_on ?? "#32DC50"};${i.badge_color_off ?? "#CC3333"};${i.badge_color_on ?? "#32DC50"}" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      case "ripple":
        return b`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${[0, 0.3, 0.6].map(
          (r) => b`
                <circle cx="50" cy="50" r="14" fill="none" stroke="${n}" stroke-width="2" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0" keyTimes="0;0.05;1" dur="${i.ripple_duration ?? 2e3}ms" begin="${r}s" fill="freeze"/>
                  <animate attributeName="r" values="14;56" dur="${i.ripple_duration ?? 2e3}ms" begin="${r}s" fill="freeze"/>
                </circle>`
        )}
          </svg>`;
      case "alert":
        return b`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${e}">
              <animate attributeName="fill" values="${e};${s};${e}" dur="250ms" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      default:
        return b`<svg class="node-effect-preview" viewBox="0 0 100 100"></svg>`;
    }
  }
  renderNodeEffectInspector(t, e) {
    const i = t.node_effect, o = i?.type ?? "";
    return b`
      <details class="inspector-details node-effect-details">
        <summary>${c("editor.nodeEffect.section")}</summary>
        <div class="node-effect-body">
          ${!t.entity && i ? b`<p class="hint-sub">${c("editor.nodeEffect.needsEntity")}</p>` : $}
          <div class="node-effect-type-row">
            ${this.renderNodeEffectPreviewAnim(t)}
            <label class="node-effect-type-label">
              ${c("editor.nodeEffect.type")}
              <select
                .value=${o}
                @change=${(n) => {
      const s = n.target.value;
      if (!s) {
        e({ node_effect: void 0 }, `clear node effect on ${t.id}`);
        return;
      }
      e(
        { node_effect: this.defaultNodeEffect(s) },
        `set node effect on ${t.id}`
      );
    }}
              >
                <option value="" ?selected=${!i}>${c("editor.nodeEffect.none")}</option>
                <option value="glow" ?selected=${o === "glow"}>${c("editor.nodeEffect.glow")}</option>
                <option value="badge" ?selected=${o === "badge"}>${c("editor.nodeEffect.badge")}</option>
                <option value="ripple" ?selected=${o === "ripple"}>${c("editor.nodeEffect.ripple")}</option>
                <option value="alert" ?selected=${o === "alert"}>${c("editor.nodeEffect.alert")}</option>
              </select>
            </label>
          </div>

          ${i?.type === "glow" ? b`
                <label>${c("editor.nodeEffect.glowColor")}
                  <input type="text" placeholder=${c("editor.inspector.colourDomainDefault")}
                    .value=${i.glow_color ?? ""}
                    @change=${(n) => {
      const s = n.target.value.trim();
      e(
        { node_effect: { ...i, glow_color: s || void 0 } },
        `glow color ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.glowMaxRadius")}
                  <input type="number" min="4" max="80" step="1"
                    .value=${String(i.glow_max_radius ?? 20)}
                    @change=${(n) => {
      const s = parseFloat(n.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, glow_max_radius: s } },
        `glow radius ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.glowMinIntensity")}
                  <input type="range" min="0" max="1" step="0.05"
                    .value=${String(i.glow_min_intensity ?? 0.1)}
                    @input=${(n) => {
      const s = parseFloat(n.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, glow_min_intensity: Math.max(0, Math.min(1, s)) } },
        `glow min intensity ${t.id}`
      );
    }}
                  />
                  <span>${(i.glow_min_intensity ?? 0.1).toFixed(2)}</span>
                </label>
                <label>${c("editor.nodeEffect.peakValue")}
                  <input type="number" min="0" step="any"
                    .value=${String(i.peak_value ?? 1e4)}
                    @change=${(n) => {
      const s = parseFloat(n.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, peak_value: s } },
        `glow peak ${t.id}`
      );
    }}
                  />
                </label>
              ` : $}
          ${i?.type === "badge" ? b`
                <label>${c("editor.nodeEffect.badgeColorOn")}
                  <input type="color"
                    .value=${i.badge_color_on ?? "#32DC50"}
                    @change=${(n) => {
      const s = n.target.value;
      e(
        { node_effect: { ...i, badge_color_on: s } },
        `badge on ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.badgeColorOff")}
                  <input type="color"
                    .value=${i.badge_color_off ?? "#CC3333"}
                    @change=${(n) => {
      const s = n.target.value;
      e(
        { node_effect: { ...i, badge_color_off: s } },
        `badge off ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.threshold")}
                  <input type="number" step="any" placeholder="binary"
                    .value=${i.threshold === null || i.threshold === void 0 ? "" : String(i.threshold)}
                    @change=${(n) => {
      const s = n.target.value.trim(), r = s === "" ? null : parseFloat(s);
      e(
        {
          node_effect: {
            ...i,
            threshold: r === null || Number.isNaN(r) ? null : r
          }
        },
        `badge threshold ${t.id}`
      );
    }}
                  />
                </label>
              ` : $}
          ${i?.type === "ripple" ? b`
                <label>${c("editor.nodeEffect.rippleColor")}
                  <input type="text" placeholder=${c("editor.inspector.colourDomainDefault")}
                    .value=${i.ripple_color ?? ""}
                    @change=${(n) => {
      const s = n.target.value.trim();
      e(
        { node_effect: { ...i, ripple_color: s || void 0 } },
        `ripple color ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.rippleDuration")}
                  <input type="number" min="500" max="20000" step="100"
                    .value=${String(i.ripple_duration ?? 2e3)}
                    @change=${(n) => {
      const s = parseInt(n.target.value, 10);
      Number.isFinite(s) && e(
        { node_effect: { ...i, ripple_duration: s } },
        `ripple duration ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.rippleThreshold")}
                  <input type="number" step="any"
                    .value=${String(i.ripple_threshold ?? 0)}
                    @change=${(n) => {
      const s = parseFloat(n.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, ripple_threshold: s } },
        `ripple threshold ${t.id}`
      );
    }}
                  />
                </label>
              ` : $}
          ${i?.type === "alert" ? b`
                <label>${c("editor.nodeEffect.alertThreshold")}
                  <input type="number" step="any"
                    .value=${String(i.alert_threshold ?? 0)}
                    @change=${(n) => {
      const s = parseFloat(n.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, alert_threshold: s } },
        `alert threshold ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.alertCondition")}
                  <select
                    .value=${i.alert_condition ?? "above"}
                    @change=${(n) => {
      const s = n.target.value;
      e(
        { node_effect: { ...i, alert_condition: s } },
        `alert condition ${t.id}`
      );
    }}
                  >
                    <option value="above">${c("editor.nodeEffect.above")}</option>
                    <option value="below">${c("editor.nodeEffect.below")}</option>
                  </select>
                </label>
                <label>${c("editor.nodeEffect.alertColor")}
                  <input type="color"
                    .value=${i.alert_color ?? "#FF0000"}
                    @change=${(n) => {
      const s = n.target.value;
      e(
        { node_effect: { ...i, alert_color: s } },
        `alert color ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.alertFrequency")}
                  <input type="number" min="0.25" max="10" step="0.25"
                    .value=${String(i.alert_frequency ?? 2)}
                    @change=${(n) => {
      const s = parseFloat(n.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, alert_frequency: s } },
        `alert frequency ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.alertHysteresis")}
                  <input type="number" min="0" max="1" step="0.01"
                    .value=${String(i.alert_hysteresis ?? 0.05)}
                    @change=${(n) => {
      const s = parseFloat(n.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, alert_hysteresis: s } },
        `alert hysteresis ${t.id}`
      );
    }}
                  />
                </label>
              ` : $}
        </div>
      </details>
    `;
  }
  renderAnimationSection(t) {
    if (!this.config) return b``;
    const e = t.animation ?? {}, i = e.animation_style ?? "dots", o = (d) => {
      if (!this.config) return;
      const p = this.config, h = ps(p, t.id, d);
      this.pushPatch(p, h, `update animation for ${t.id}`);
    }, s = !(/* @__PURE__ */ new Set(["dash", "fluid", "none"])).has(i), r = i === "trail", l = i === "dash", a = t.color ?? "#4ADE80";
    return b`
      <details class="anim-details" open>
        <summary>${c("editor.inspector.animation")}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(i, e, a)}
            </svg>
          </div>

          <label>${c("editor.inspector.style")}
            <select
              .value=${i}
              @change=${(d) => {
      o({ animation_style: d.target.value });
    }}
            >
              ${ct.map(
      (d) => b`<option value=${d} ?selected=${i === d}>${d}</option>`
    )}
            </select>
          </label>

          ${i === "fluid" ? b`<p class="hint-sub">${c("editor.inspector.fluidIgnoresParticleShape")}</p>` : $}

          ${s ? b`
            <label>${c("editor.inspector.particleShape")}
              <select
                .value=${e.particle_shape ?? "circle"}
                @change=${(d) => {
      o({ particle_shape: d.target.value });
    }}
              >
                ${dt.map(
      (d) => b`<option value=${d} ?selected=${(e.particle_shape ?? "circle") === d}>${d}</option>`
    )}
              </select>
            </label>
            ${(e.particle_shape ?? "circle") === "custom_svg" ? b`
              <label>${c("editor.inspector.svgPathLabel")}
                <input type="text"
                  placeholder=${c("editor.inspector.svgPathPlaceholder")}
                  .value=${e.custom_svg_path ?? ""}
                  @change=${(d) => {
      o({ custom_svg_path: d.target.value.trim() });
    }}
                />
                <svg class="custom-svg-preview" viewBox="-20 -20 40 40" width="40" height="40"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d=${e.custom_svg_path || "M 0 -8 L 5 8 L -5 8 Z"}
                        fill=${a} />
                </svg>
              </label>
            ` : $}
          ` : $}

          <label>${c("editor.inspector.direction")}
            <select
              .value=${e.direction ?? "auto"}
              @change=${(d) => {
      o({ direction: d.target.value });
    }}
            >
              ${pt.map(
      (d) => b`<option value=${d} ?selected=${(e.direction ?? "auto") === d}>${d}</option>`
    )}
            </select>
          </label>

          <label>${c("editor.inspector.particleSize")}
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(e.particle_size ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && o({ particle_size: p });
    }}
              />
              <span>${(e.particle_size ?? 1).toFixed(1)}×</span>
            </div>
          </label>

          <label>${c("editor.inspector.particleCount")}
            <input type="number" min="1" max="20" step="1"
              placeholder=${c("editor.inspector.profileDefaultPlaceholder")}
              .value=${e.particle_count !== void 0 ? String(e.particle_count) : ""}
              @change=${(d) => {
      const p = d.target.value.trim();
      if (p === "") {
        o({ particle_count: void 0 });
        return;
      }
      const h = parseInt(p, 10);
      Number.isFinite(h) && h >= 1 && o({ particle_count: h });
    }}
            />
          </label>

          <label>${c("editor.inspector.particleSpacing")}
            <select
              .value=${e.particle_spacing ?? "even"}
              @change=${(d) => {
      o({ particle_spacing: d.target.value });
    }}
            >
              ${ut.map(
      (d) => b`<option value=${d} ?selected=${(e.particle_spacing ?? "even") === d}>${d}</option>`
    )}
            </select>
          </label>

          ${e.particle_spacing === "clustered" ? b`
            <label>${c("editor.inspector.clusterSize")}
              <input type="number" min="1" max="10" step="1"
                .value=${String(e.cluster_size ?? 3)}
                @change=${(d) => {
      const p = parseInt(d.target.value, 10);
      Number.isFinite(p) && p >= 1 && o({ cluster_size: p });
    }}
              />
            </label>
            <label>${c("editor.inspector.clusterGap")}
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(e.cluster_gap ?? 2)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && o({ cluster_gap: p });
    }}
              />
            </label>
          ` : $}

          ${e.particle_spacing === "pulse" ? b`
            <label>${c("editor.inspector.pulseFrequencyHz")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.pulse_frequency ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && o({ pulse_frequency: p });
    }}
              />
            </label>
            <label>${c("editor.inspector.pulseRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(e.pulse_ratio ?? 0.3)}
                  @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && o({ pulse_ratio: p });
    }}
                />
                <span>${(e.pulse_ratio ?? 0.3).toFixed(2)}</span>
              </div>
            </label>
          ` : $}

          ${e.particle_spacing === "wave_spacing" || e.particle_spacing === "wave_lateral" ? b`
            <label>${c("editor.inspector.waveFrequency")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.wave_frequency ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && o({ wave_frequency: p });
    }}
              />
            </label>
            <label>${e.particle_spacing === "wave_lateral" ? c("editor.inspector.waveAmplitudePx") : c("editor.inspector.waveAmplitude01")}
              <input type="number"
                min=${e.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                max=${e.particle_spacing === "wave_lateral" ? "40" : "1"}
                step=${e.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                .value=${String(e.wave_amplitude ?? (e.particle_spacing === "wave_lateral" ? 8 : 0.7))}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && o({ wave_amplitude: p });
    }}
              />
            </label>
          ` : $}

          <label>${c("editor.inspector.glowIntensity")}
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(e.glow_intensity ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && o({ glow_intensity: p });
    }}
              />
              <span>${(e.glow_intensity ?? 1).toFixed(1)}</span>
            </div>
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${e.shimmer === !0}
              @change=${(d) => o({ shimmer: d.target.checked })}
            />
            ${c("editor.inspector.shimmerThreshold")}
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${e.flicker === !0}
              @change=${(d) => o({ flicker: d.target.checked })}
            />
            ${c("editor.inspector.flicker")}
          </label>

          ${r ? b`
            <label>${c("editor.inspector.trailLength")}
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(e.trail_length ?? 2)}
                  @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && o({ trail_length: p });
    }}
                />
                <span>${(e.trail_length ?? 2).toFixed(2)}×</span>
              </div>
            </label>
          ` : $}

          ${l ? b`
            <label>${c("editor.inspector.dashGapRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(e.dash_gap ?? 0.5)}
                  @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && o({ dash_gap: p });
    }}
                />
                <span>${(e.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : $}

          ${t.animation && Object.keys(t.animation).length > 0 ? b`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const d = this.config, p = us(d, t.id);
      this.pushPatch(d, p, `reset animation for ${t.id}`);
    }}>${c("editor.inspector.resetToDefaults")}</button>` : $}
        </div>
      </details>
    `;
  }
  /**
   * Render a small inline SVG preview strip showing the current animation style.
   * Uses CSS animations (not SVG animateMotion) so it works even with no live data.
   */
  renderAnimPreview(t, e, i) {
    const o = 4 * (e.particle_size ?? 1), n = Math.min(e.particle_count ?? 3, 8);
    if (t === "none")
      return b`<line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="2" stroke-opacity="0.3"/>`;
    if (t === "dash") {
      const r = e.dash_gap ?? 0.5, l = 14, a = l * r;
      return b`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="3"
          stroke-dasharray="${l} ${a}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${l + a}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (t === "fluid")
      return b`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (e.particle_spacing === "wave_lateral") {
      const r = Array.from({ length: n }, (l, a) => (a + 0.5) / n * 180 + 10);
      return b`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (l, a) => b`
            <circle cx=${l} cy="20" r=${o} fill=${i} opacity="0">
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
    const s = Array.from({ length: n }, (r, l) => (l + 0.5) / n * 180 + 10);
    return b`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${s.map(
      (r, l) => b`
          <circle cx=${r} cy="20" r=${o} fill=${i} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(l / n * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(l / n * -1.4).toFixed(2)}s"/>
          </circle>
        `
    )}
    `;
  }
  renderWaypointList(t) {
    if (!this.config) return b``;
    const e = new Map(this.config.nodes.map((s) => [s.id, s])), i = e.get(t.from_node), o = e.get(t.to_node), n = () => {
      if (!this.config) return;
      const s = [
        ...i ? [i.position] : [],
        ...t.waypoints,
        ...o ? [o.position] : []
      ];
      let r = 0, l = 0;
      for (let g = 0; g < s.length - 1; g++) {
        const m = s[g], v = s[g + 1], y = Math.hypot(v.x - m.x, v.y - m.y);
        y > l && (l = y, r = g);
      }
      const a = s[r], d = s[r + 1], p = { x: (a.x + d.x) / 2, y: (a.y + d.y) / 2 }, h = r > 0 ? r - 1 + 1 : 0, u = this.config, f = si(u, t.id, h, p);
      this.pushPatch(u, f, `add waypoint to ${t.id}`);
    };
    return b`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${c("editor.inspector.waypoints")}
          <span class="waypoint-count">${t.waypoints.length}</span>
        </h4>

        ${t.waypoints.length === 0 ? b`<div class="waypoint-empty">${c("editor.inspector.waypointEmpty")}</div>` : b`
            <ul class="waypoint-list">
              ${t.waypoints.map((s, r) => b`
                <li class="waypoint-row">
                  <span class="waypoint-index">${c("editor.inspector.waypointSectionHash")}${r + 1}</span>
                  <label class="waypoint-coord">
                    ${c("editor.inspector.waypointCoordX")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.x.toFixed(1)}
                      @change=${(l) => {
      if (!this.config) return;
      const a = parseFloat(l.target.value);
      if (!Number.isFinite(a)) return;
      const d = this.config, p = at(d, t.id, r, { x: a, y: s.y });
      this.pushPatch(d, p, `move waypoint ${r} of ${t.id}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    ${c("editor.inspector.waypointCoordY")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.y.toFixed(1)}
                      @change=${(l) => {
      if (!this.config) return;
      const a = parseFloat(l.target.value);
      if (!Number.isFinite(a)) return;
      const d = this.config, p = at(d, t.id, r, { x: s.x, y: a });
      this.pushPatch(d, p, `move waypoint ${r} of ${t.id}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${c("editor.inspector.deleteWaypointAria", r)} title=${c("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const l = this.config, a = ri(l, t.id, r);
      this.pushPatch(l, a, `delete waypoint ${r} of ${t.id}`);
    }}
                  >×</button>
                </li>
              `)}
            </ul>
          `}

        <button type="button" class="ghost full-width" aria-label=${c("editor.inspector.addWaypointOnFlowAria")} @click=${n}>
          ${c("editor.inspector.addWaypoint")}
        </button>
      </div>
    `;
  }
  renderValueGradientSection(t) {
    if (!this.config) return b``;
    const e = t.value_gradient, i = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, o = (s) => {
      if (!this.config) return;
      const r = this.config, l = fs(r, t.id, s);
      this.pushPatch(r, l, `update gradient for ${t.id}`);
    };
    let n = $;
    if (e && e.low_color && e.high_color)
      try {
        const s = Oi(
          (e.low_value + e.high_value) / 2,
          e
        ), r = `background: linear-gradient(to right, ${e.low_color}, ${s}, ${e.high_color});`;
        n = b`
          <div class="gradient-preview-bar" style=${r}></div>
          <div class="gradient-preview-labels">
            <span>${e.low_color}</span><span>${e.high_color}</span>
          </div>
        `;
      } catch {
      }
    return b`
      <div class="gradient-section">
        <h4 class="gradient-section-header">${c("editor.inspector.valueGradient")}</h4>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!e}
            @change=${(s) => {
      if (!this.config) return;
      const r = s.target.checked, l = this.config, a = r ? hs(l, t.id, i) : bi(l, t.id);
      this.pushPatch(l, a, `${r ? "enable" : "disable"} gradient for ${t.id}`);
    }}
          />
          ${c("editor.inspector.enableGradient")}
        </label>

        ${e ? b`
          <label>${c("editor.inspector.gradientEntity")}
            <input type="text" placeholder=${c("editor.inspector.gradientEntityPlaceholder")}
              .value=${e.entity}
              @change=${(s) => o({ entity: s.target.value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>${c("editor.inspector.lowValue")}
              <input type="number" step="any"
                .value=${String(e.low_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && o({ low_value: r });
    }}
              />
            </label>
            <label>${c("editor.inspector.lowColour")}
              <div class="color-row">
                <input type="color"
                  .value=${e.low_color}
                  @input=${(s) => o({ low_color: s.target.value })}
                />
                <span>${e.low_color}</span>
              </div>
            </label>
          </div>

          <div class="gradient-row">
            <label>${c("editor.inspector.highValue")}
              <input type="number" step="any"
                .value=${String(e.high_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && o({ high_value: r });
    }}
              />
            </label>
            <label>${c("editor.inspector.highColour")}
              <div class="color-row">
                <input type="color"
                  .value=${e.high_color}
                  @input=${(s) => o({ high_color: s.target.value })}
                />
                <span>${e.high_color}</span>
              </div>
            </label>
          </div>

          <label>${c("editor.inspector.applyGradientTo")}
            <select
              .value=${e.mode ?? "both"}
              @change=${(s) => {
      o({ mode: s.target.value });
    }}
            >
              <option value="flow" ?selected=${e.mode === "flow"}>${c("editor.inspector.gradientModeFlow")}</option>
              <option value="line" ?selected=${e.mode === "line"}>${c("editor.inspector.gradientModeLine")}</option>
              <option value="both" ?selected=${(e.mode ?? "both") === "both"}>${c("editor.inspector.gradientModeBoth")}</option>
            </select>
          </label>

          ${n}

          <button class="ghost" @click=${() => {
      if (!this.config) return;
      const s = this.config, r = bi(s, t.id);
      this.pushPatch(s, r, `disable gradient for ${t.id}`);
    }}>${c("editor.inspector.removeGradient")}</button>
        ` : $}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return $;
    const t = this.config.animation ?? {};
    return b`
      <details class="panel anim-global-panel" open>
        <summary>${c("editor.inspector.animationGlobalSummary")}</summary>
        <div class="panel-body">
          <label>
            ${c("editor.inspector.fpsCap")}
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(t.fps ?? 60)}
                @change=${(e) => {
      if (!this.config) return;
      const i = parseInt(e.target.value, 10), o = this.config, n = mi(o, { fps: i });
      this.pushPatch(o, n, "set animation fps");
    }}
              />
              <span>${t.fps ?? 60} ${c("editor.inspector.fpsSuffix")}</span>
            </div>
          </label>
          <label class="visibility-row">
            <input type="checkbox"
              .checked=${t.smooth_speed !== !1}
              @change=${(e) => {
      if (!this.config) return;
      const i = e.target.checked, o = this.config, n = mi(o, { smooth_speed: i });
      this.pushPatch(o, n, "set smooth_speed");
    }}
            />
            <span class="visibility-label">${c("editor.stateA.smoothSpeed")}</span>
            <span class="visibility-val">${t.smooth_speed !== !1 ? c("editor.inspector.on") : c("editor.inspector.off")}</span>
          </label>
          <p class="hint-sub">${c("editor.inspector.smoothSpeedHint")}</p>
        </div>
      </details>
    `;
  }
  renderOverlayInspector(t) {
    const e = t.size ?? { width: 20, height: 15 }, i = t.visible !== !1, o = t.opacity ?? 1;
    return b`
      <div class="inspector overlay-inspector">
        <label class="inspector-id-row">
          <span class="node-cell-label">${c("editor.inspector.overlayIdField")}</span>
          <input
            type="text"
            spellcheck="false"
            ${X(this.overlayIdInputRef)}
            .value=${t.id}
            @change=${(n) => this.onInspectorOverlayIdChange(t.id, n)}
          />
        </label>
        <h3>${c("editor.inspector.overlayHeading", t.id)}</h3>
        <div class="row size-row">
          <label>
            ${c("editor.inspector.width")}
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(e.width)}
              @change=${(n) => this.onOverlaySizeChange(t.id, "width", n)}
            />
          </label>
          <label>
            ${c("editor.inspector.height")}
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(e.height)}
              @change=${(n) => this.onOverlaySizeChange(t.id, "height", n)}
            />
          </label>
        </div>
        <label class="toggle-label">
          ${c("editor.inspector.visible")}
          <input
            type="checkbox"
            .checked=${i}
            @change=${(n) => {
      if (!this.config) return;
      const s = n.target.checked, r = this.config, l = Qn(r, t.id, s);
      this.pushPatch(r, l, `toggle overlay ${t.id} visible`);
    }}
          />
        </label>
        <label>
          ${c("editor.inspector.opacity")}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            .value=${String(o)}
            @change=${(n) => {
      if (!this.config) return;
      const s = parseFloat(n.target.value);
      if (!Number.isFinite(s)) return;
      const r = this.config, l = es(r, t.id, s);
      this.pushPatch(r, l, `edit overlay ${t.id} opacity`);
    }}
          />
          <span>${Math.round(o * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(t)}
        <button class="danger" @click=${() => this.removeOverlay(t.id)}>${c("editor.inspector.deleteOverlay")}</button>
      </div>
    `;
  }
  renderCardConfigEditor(t) {
    const e = this.customConfigDraft || JSON.stringify(t.card ?? { type: "entity", entity: "sensor.example_sensor" }, null, 2);
    return b`
      <label>
        ${c("editor.inspector.cardConfig")}
        <textarea
          rows="8"
          spellcheck="false"
          placeholder=${c("editor.inspector.cardConfigPlaceholder")}
          .value=${e}
          @input=${(i) => {
      this.customConfigDraft = i.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? b`<div class="custom-config-error">${this.customConfigError}</div>` : $}
      <p class="hint-sub">
        ${c("editor.inspector.cardConfigHintExamples")}
      </p>
      <p class="hint-sub">
        ${c("editor.inspector.cardConfigHintUrls")}
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(t.id)}>${c("editor.inspector.applyCardConfig")}</button>
      </div>
    `;
  }
  renderOpacityPanel() {
    if (!this.config) return $;
    const t = this.config.opacity ?? {}, e = (i, o, n = 1) => {
      const s = t[i] ?? n;
      return b`
        <label class="opacity-row">
          <span class="opacity-label">${o}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            .value=${String(s)}
            @input=${(r) => {
        if (!this.config) return;
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const a = this.config, d = di(a, i, l);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const a = this.config, d = di(a, i, l);
        this.pushPatch(a, d, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${s.toFixed(2)}</span>
        </label>
      `;
    };
    return b`
      <details class="panel opacity-panel" open>
        <summary>${c("editor.inspector.opacitySummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.opacityHint")}
          </p>
          ${e("background", c("editor.inspector.opacityBackground"))}
          ${e("darken", c("editor.inspector.opacityDarken"), 0)}
          ${e("nodes", c("editor.inspector.opacityNodes"))}
          ${e("flows", c("editor.inspector.opacityFlows"))}
          ${e("dots", c("editor.inspector.opacityDots"))}
          ${e("glow", c("editor.inspector.opacityGlow"))}
          ${e("labels", c("editor.inspector.opacityLabels"))}
          ${e("values", c("editor.inspector.opacityValues"))}
          ${e("overlays", c("editor.inspector.opacityOverlays"))}
        </div>
      </details>
    `;
  }
  renderDomainColorsPanel() {
    if (!this.config) return $;
    const t = this.config.domain_colors ?? {}, e = this.config.domain ?? "energy", i = Ke[e] ?? Ke.generic, o = (n, s) => {
      const r = `editor.domainRoles.${e}.${n}`, l = c(r);
      return l !== r ? l : s;
    };
    return b`
      <details class="panel domain-colors-panel">
        <summary>${c("editor.inspector.domainColoursSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.domainColoursHint")}
          </p>
          ${i.roles.map((n) => {
      const s = t[n.key], r = n.default, l = o(n.key, n.label);
      return b`
              <div class="color-picker-row">
                <span class="color-picker-label">${l}</span>
                <input
                  type="color"
                  .value=${s ?? r}
                  @change=${(a) => {
        if (!this.config) return;
        const d = a.target.value, p = this.config, h = hi(p, n.key, d);
        this.pushPatch(p, h, `set domain_colors.${n.key}`);
      }}
                />
                <span class="color-picker-value">${s || c("editor.inspector.colourDefaultSuffix", r)}</span>
                ${s ? b`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, d = hi(a, n.key, void 0);
        this.pushPatch(a, d, `reset domain_colors.${n.key}`);
      }}>${c("editor.inspector.reset")}</button>` : $}
              </div>
            `;
    })}
        </div>
      </details>
    `;
  }
  renderVisibilityPanel() {
    if (!this.config) return $;
    const t = this.config.visibility ?? {}, e = (i, o) => {
      const n = t[i] !== !1;
      return b`
        <label class="visibility-row">
          <span class="visibility-label">${o}</span>
          <input
            type="checkbox"
            .checked=${n}
            @change=${(s) => {
        if (!this.config) return;
        const r = s.target.checked, l = this.config, a = as(l, i, r);
        this.pushPatch(l, a, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${c(n ? "editor.inspector.visibilityVisible" : "editor.inspector.visibilityHidden")}</span>
        </label>
      `;
    };
    return b`
      <details class="panel visibility-panel">
        <summary>${c("editor.inspector.visibilitySummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.visibilityHint")}
          </p>
          ${e("nodes", c("editor.inspector.opacityNodes"))}
          ${e("lines", c("editor.inspector.visibilityFlowLines"))}
          ${e("dots", c("editor.inspector.visibilityAnimatedDots"))}
          ${e("labels", c("editor.inspector.opacityLabels"))}
          ${e("values", c("editor.inspector.opacityValues"))}
          ${e("overlays", c("editor.toolbar.overlays"))}
        </div>
      </details>
    `;
  }
  renderDefaultsPanel() {
    if (!this.config) return $;
    const t = this.config.defaults ?? {}, e = (i, o, n) => {
      const s = t[i] ?? n.defaultVal;
      return b`
        <label class="defaults-row">
          <span class="defaults-label">${o}</span>
          <input
            type="number"
            min=${n.min}
            max=${n.max}
            step=${n.step}
            .value=${String(s)}
            @change=${(r) => {
        if (!this.config) return;
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const a = Math.max(n.min, Math.min(n.max, l)), d = this.config, p = os(d, i, a);
        this.pushPatch(d, p, `set defaults.${i}`);
      }}
          />
          <span class="defaults-unit">${s}</span>
        </label>
      `;
    };
    return b`
      <details class="panel defaults-panel" open>
        <summary>${c("editor.inspector.defaultsSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.defaultsHint")}
          </p>
          ${e("node_radius", c("editor.stateA.nodeRadius"), { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${e("dot_radius", c("editor.stateA.dotRadius"), { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${e("line_width", c("editor.stateA.lineWidth"), { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${e("burst_trigger_ratio", c("editor.inspector.burstTriggerRatio"), { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${e("burst_sustain_ms", c("editor.inspector.burstSustainMs"), { min: 1e3, max: 3e4, step: 500, defaultVal: 5e3 })}
          ${e("burst_max_particles", c("editor.inspector.burstMaxParticles"), { min: 3, max: 50, step: 1, defaultVal: 20 })}
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
        ${this.renderDomainSelectorPanel()}
        ${this.renderWeatherPanel()}
        ${this.renderGlobalAnimationPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
      </div>
    `;
  }
  renderDomainSelectorPanel() {
    return this.config ? b`
      <details class="panel domain-settings-panel" open>
        <summary>${c("editor.stateA.domainSummary")}</summary>
        <div class="panel-body">
          <label class="field-row domain-field">
            <span class="field-label">${c("editor.stateA.domain")}</span>
            <select
              id="flowme-domain-select"
              .value=${this.config.domain}
              @change=${(t) => {
      if (!this.config) return;
      const e = t.target.value, i = this.config, o = ls(i, e);
      this.pushPatch(i, o, `set domain ${e}`);
    }}
            >
              ${Fe.map((t) => b`<option value=${t}>${this.domainOptionLabel(t)}</option>`)}
            </select>
          </label>
        </div>
      </details>
    ` : $;
  }
  domainOptionLabel(t) {
    return c(`editor.stateA.domainOption.${t}`);
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderMultiSelectToolbar() {
    const t = this.selectedNodeIds.size;
    if (t < 2) return $;
    const e = this.selectedNodeIds, i = Array.from(e)[0];
    return b`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${c("editor.inspector.multiselectCount", t)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? "suggest-path-busy" : ""}"
          aria-label=${c("editor.inspector.suggestPathBetweenAria")}
          title=${c(t === 2 ? "editor.inspector.suggestPathBetweenTitle" : "editor.inspector.suggestPathPickTwoTitle")}
          ?disabled=${t !== 2 || this.suggestBusy}
          @click=${() => void this.runSuggestPath()}
        >${this.suggestBusy ? b`${c("editor.toolbar.suggestPathFinding")}<span class="suggest-path-spinner" aria-hidden="true"></span>` : c("editor.toolbar.suggestPath")}</button>
        <button type="button" class="ms-btn" aria-label=${c("editor.toolbar.hideSelectedNodesAria")} @click=${() => this.bulkHide(e)}>${c("editor.toolbar.hideSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${c("editor.toolbar.showSelectedNodesAria")} @click=${() => this.bulkShow(e)}>${c("editor.toolbar.showSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${c("editor.toolbar.alignSelectedHorizontalAria")} @click=${() => this.bulkAlignH(e, i)}>${c("editor.toolbar.alignHorizontalShort")}</button>
        <button type="button" class="ms-btn" aria-label=${c("editor.toolbar.alignSelectedVerticalAria")} @click=${() => this.bulkAlignV(e, i)}>${c("editor.toolbar.alignVerticalShort")}</button>
        <button type="button" class="ms-btn danger" aria-label=${c("editor.toolbar.deleteSelectedNodesAria")} @click=${() => this.bulkDelete(e)}>${c("editor.toolbar.deleteSelected")}</button>
        <button type="button" class="ms-btn ghost" aria-label=${c("editor.toolbar.clearMultiSelectionAria")} @click=${() => {
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
    }}>${c("editor.toolbar.deselect")}</button>
      </div>
    `;
  }
  bulkHide(t) {
    if (!this.config) return;
    const e = this.config, i = oi(e, t, !1);
    this.pushPatch(e, i, `hide ${t.size} nodes`);
  }
  bulkShow(t) {
    if (!this.config) return;
    const e = this.config, i = oi(e, t, !0);
    this.pushPatch(e, i, `show ${t.size} nodes`);
  }
  bulkAlignH(t, e) {
    if (!this.config) return;
    const i = this.config, o = Hn(i, t, e);
    this.pushPatch(i, o, `align ${t.size} nodes horizontally`);
  }
  bulkAlignV(t, e) {
    if (!this.config) return;
    const i = this.config, o = Tn(i, t, e);
    this.pushPatch(i, o, `align ${t.size} nodes vertically`);
  }
  bulkDelete(t) {
    if (!this.config || !window.confirm(c("editor.inspector.deleteNodesConfirm", t.size))) return;
    const e = this.config, i = On(e, t);
    this.pushPatch(e, i, `delete ${t.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderWeatherPanel() {
    if (!this.config) return $;
    const t = this.config.background, e = Object.entries(t.weather_states ?? {}), i = t.weather_entity && this.hass ? this.hass.states[t.weather_entity]?.state : void 0;
    return b`
      <details class="weather-panel" ?open=${e.length > 0 || !!t.weather_entity}>
        <summary>${c("editor.inspector.weatherPanelSummary")}</summary>
        <div class="weather-body">
          <label>
            ${c("editor.inspector.defaultImageUrl")}
            <input
              type="text"
              .value=${t.default}
              @change=${this.onDefaultBgChange}
              placeholder=${c("editor.inspector.defaultBgPlaceholder")}
            />
            ${t.default ? b`<img class="weather-thumb" src=${t.default} alt=${c("editor.inspector.defaultBgAlt")} />` : $}
          </label>
          <label>
            ${c("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(
      t.weather_entity ?? "",
      (o) => this.setWeatherEntityValue(o),
      { includeDomains: ["weather"], placeholder: c("editor.inspector.weatherPlaceholder") }
    )}
          </label>
          ${i !== void 0 ? b`<div class="weather-live-state">
                ${c("editor.inspector.currentState")} <strong>${i}</strong>
                ${t.weather_states?.[i] ? b` → <span class="weather-match-ok">${c("editor.inspector.weatherMatched")}</span>` : b` → <span class="weather-match-miss">${c("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : $}
          <label>
            ${c("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(
      t.sun_entity ?? "",
      (o) => {
        if (!this.config) return;
        const n = this.config, s = Kn(n, o || void 0);
        this.pushPatch(n, s, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: c("editor.inspector.sunPlaceholder") }
    )}
          </label>
          ${t.sun_entity && this.hass?.states[t.sun_entity] ? b`<div class="weather-live-state">
                ${c("editor.inspector.sunStateLabel")} <strong>${this.hass.states[t.sun_entity]?.state === "above_horizon" ? c("editor.inspector.sunAbove") : c("editor.inspector.sunBelow")}</strong>
              </div>` : $}
          <label>
            ${c("editor.inspector.fadeTransitionSeconds")}
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              .value=${String(Math.round((t.transition_duration ?? 5e3) / 1e3))}
              @change=${(o) => {
      if (!this.config) return;
      const n = parseFloat(o.target.value);
      if (!Number.isFinite(n) || n < 0) return;
      const s = this.config, r = jn(s, n * 1e3);
      this.pushPatch(s, r, "set background transition duration");
    }}
            />
          </label>
          <div class="weather-states">
            <div class="weather-states-header">
              <span>${c("editor.inspector.weatherStateColumn")}</span>
              <span>${c("editor.inspector.weatherImageUrlColumn")}</span>
              <span></span>
            </div>
            ${e.map(
      ([o, n]) => b`
                <div class="weather-row" data-key=${o}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${o}
                    @change=${(s) => this.onWeatherStateKeyChange(o, s)}
                  />
                  <input
                    type="text"
                    .value=${n}
                    @change=${(s) => this.onWeatherStateUrlChange(o, s)}
                    placeholder=${c("editor.inspector.weatherRowPlaceholder")}
                  />
                  <div class="weather-row-end">
                    ${n ? b`<img class="weather-thumb" src=${n} alt=${o} />` : $}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(o)}>
                      ${c("editor.inspector.remove")}
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${P.KNOWN_WEATHER_STATES.map(
      (o) => b`<option value=${o}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${c("editor.inspector.addWeatherState")}</button>
          </div>
          <details class="hint-details">
            <summary>${c("editor.inspector.metNoReferenceSummary")}</summary>
            <div class="hint-states">
              ${P.KNOWN_WEATHER_STATES.map(
      (o) => b`<code>${o}</code>`
    )}
              <p class="hint-sub">
                ${c("editor.inspector.metNoHint")}
              </p>
            </div>
          </details>
        </div>
      </details>
    `;
  }
  setWeatherEntityValue(t) {
    if (!this.config) return;
    const e = t.trim(), i = this.config, o = Un(i, e || void 0);
    this.pushPatch(i, o, "edit weather entity");
  }
  onWeatherStateKeyChange(t, e) {
    if (!this.config) return;
    const i = e.target.value.trim();
    if (!i || i === t) return;
    const o = this.config, n = ns(o, t, i);
    n !== o && this.pushPatch(o, n, `rename weather state ${t}→${i}`);
  }
  onWeatherStateUrlChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, o = this.config, n = li(o, t, i);
    this.pushPatch(o, n, `edit weather image ${t}`);
  }
  // -- toolbar --
  // -- suggest path --
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new Ls();
      } catch (t) {
        console.error("[FlowMe] worker init failed:", t), this._pathWorker = void 0;
        return;
      }
      this._pathWorker.onmessage = (t) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const e = this._pathPendingSelection;
        if (this._pathPendingSelection = null, !e || !this.config) return;
        const i = t.data;
        if (i.error) {
          console.error("[FlowMe] pathfinding worker error:", i.error), this.runPathfindingMainThread(e.fromId, e.toId, { logFallback: !0 });
          return;
        }
        this.applySuggestPathWorkerResult(
          {
            waypoints: i.waypoints ?? [],
            edgesUsable: i.edgesUsable ?? !1,
            elapsedMs: i.elapsedMs ?? 0
          },
          e.fromId,
          e.toId
        );
      }, this._pathWorker.onerror = (t) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const e = this._pathPendingSelection;
        this._pathPendingSelection = null, console.error("[FlowMe] pathfinding worker error:", t), e && this.runPathfindingMainThread(e.fromId, e.toId, { logFallback: !0 });
      };
    }
  }
  applySuggestPathWorkerResult(t, e, i) {
    if (!t.edgesUsable) {
      this.errorMessage = c("editor.inspector.suggestCorsError"), this.suggestPreview = null;
      return;
    }
    this.suggestPreview = {
      fromNodeId: e,
      toNodeId: i,
      waypoints: t.waypoints,
      edgesUsable: t.edgesUsable,
      elapsedMs: t.elapsedMs
    };
  }
  async runPathfindingMainThread(t, e, i) {
    if (!this.config) return;
    i?.logFallback && console.log("[FlowMe] falling back to main thread pathfinding");
    const o = this.config.nodes.find((s) => s.id === t), n = this.config.nodes.find((s) => s.id === e);
    if (!(!o || !n)) {
      this.suggestBusy = !0;
      try {
        const s = await $i({
          imageUrl: this.config.background.default,
          from: o.position,
          to: n.position
        });
        if (!s.edgesUsable) {
          this.errorMessage = c("editor.inspector.suggestCorsError"), this.suggestPreview = null;
          return;
        }
        this.applySuggestPathWorkerResult(s, t, e);
      } catch (s) {
        this.errorMessage = c(
          "editor.inspector.suggestAutoRouteFailed",
          s instanceof Error ? s.message : String(s)
        ), this.suggestPreview = null;
      } finally {
        this.suggestBusy = !1;
      }
    }
  }
  async runSuggestPath() {
    if (!this.config || this.selectedNodeIds.size !== 2 || this._pathWorkerPending) return;
    const [t, e] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((l) => l.id === t), o = this.config.nodes.find((l) => l.id === e);
    if (!i || !o)
      return;
    const n = this.config.background?.default ?? "";
    if (typeof Worker > "u") {
      await this.runPathfindingMainThread(t, e, { logFallback: !0 });
      return;
    }
    if (this.initPathWorker(), !this._pathWorker) {
      await this.runPathfindingMainThread(t, e, { logFallback: !0 });
      return;
    }
    this.suggestBusy = !0;
    const s = await Bs(n);
    if (!s) {
      this.suggestBusy = !1, this.errorMessage = c("editor.inspector.suggestCorsError"), this.suggestPreview = null;
      return;
    }
    this._pathWorkerPending = !0, this._pathPendingSelection = { fromId: t, toId: e };
    const r = new Uint8ClampedArray(s.rgba);
    this._pathWorker.postMessage(
      {
        rgba: r.buffer,
        width: s.width,
        height: s.height,
        fromPos: i.position,
        toPos: o.position,
        cellSize: kt
      },
      [r.buffer]
    );
  }
  onFlowFromNodeChange(t, e) {
    if (!this.config) return;
    const i = this.config.flows.find((o) => o.id === t);
    i && this.applyFlowEndpointChange(t, e, i.to_node);
  }
  onFlowToNodeChange(t, e) {
    if (!this.config) return;
    const i = this.config.flows.find((o) => o.id === t);
    i && this.applyFlowEndpointChange(t, i.from_node, e);
  }
  /** Main-thread pathfinding (same as toolbar fallback) — single undo with endpoints + waypoints. */
  async resolveWaypointsForEndpoints(t, e) {
    if (!this.config) return [];
    const i = this.config.nodes.find((s) => s.id === t), o = this.config.nodes.find((s) => s.id === e);
    if (!i || !o) return [];
    const n = this.config.background?.default ?? "";
    if (!n) return [];
    try {
      const s = await $i({
        imageUrl: n,
        from: i.position,
        to: o.position
      });
      return s.edgesUsable ? (s.waypoints ?? []).map((r) => ({ x: r.x, y: r.y })) : [];
    } catch {
      return [];
    }
  }
  async applyFlowEndpointChange(t, e, i) {
    if (!this.config) return;
    if (e === i) {
      this.flowEndpointError = c("editor.inspector.fromToSameError");
      return;
    }
    const o = this.config;
    if (!o.flows.find((l) => l.id === t)) return;
    this.flowEndpointError = null, this.flowEndpointPathfindingFlowId = t;
    let s = [];
    try {
      s = await this.resolveWaypointsForEndpoints(e, i);
    } finally {
      this.flowEndpointPathfindingFlowId = null;
    }
    const r = {
      ...o,
      flows: o.flows.map(
        (l) => l.id === t ? { ...l, from_node: e, to_node: i, waypoints: s } : l
      )
    };
    this.pushPatch(o, r, "Change flow endpoints"), this.selectedFlowId = t;
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return $;
    const t = this.config.nodes.find((r) => r.id === this.suggestPreview.fromNodeId), e = this.config.nodes.find((r) => r.id === this.suggestPreview.toNodeId);
    if (!t || !e) return $;
    const i = this.imageNaturalW, o = this.imageNaturalH, s = [
      t.position,
      ...this.suggestPreview.waypoints,
      e.position
    ].map((r) => {
      const l = this.pct2px(r);
      return `${l.x.toFixed(2)},${l.y.toFixed(2)}`;
    }).join(" ");
    return b`
      <svg class="suggest-overlay" viewBox=${`0 0 ${i} ${o}`} preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map((r) => {
      const l = this.pct2px(r);
      return b`
          <div class="suggest-marker" style=${`left: ${l.x}px; top: ${l.y}px;`}></div>
        `;
    })}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? b`
      <div class="suggest-bar">
        <span>${c("editor.suggestBar.message")}</span>
        <span>${c("editor.inspector.suggestPreviewWaypoints", this.suggestPreview.waypoints.length)}</span>
        <button type="button" aria-label=${c("editor.toolbar.acceptPath")} @click=${this.acceptSuggestion}>${c("editor.inspector.accept")}</button>
        <button type="button" class="ghost" aria-label=${c("editor.toolbar.cancelPath")} @click=${this.cancelSuggestion}>${c("editor.toolbar.cancel")}</button>
      </div>
    ` : $;
  }
  onNodeDotDblClick(t, e) {
    t.preventDefault(), t.stopPropagation(), this.selectorType = "nodes", this.selectedNodeId = e.id, this.selectedNodeIds = /* @__PURE__ */ new Set([e.id]), this.selectedFlowId = null, this.selectedOverlayId = null, this._pendingInspectorLabelFocus = !0;
  }
  onNodeLabelTextDblClick(t, e) {
    if (t.preventDefault(), t.stopPropagation(), t.target.closest(".eye-toggle")) return;
    const i = e.label ?? e.id;
    this.inlineRename = { kind: "node", id: e.id, draft: i };
  }
  commitNodeInlineRename(t) {
    const e = this.inlineRename;
    if (!e || e.kind !== "node" || !this.config) return;
    if (!t) {
      this.inlineRename = null;
      return;
    }
    const i = this.config.nodes.find((l) => l.id === e.id);
    if (!i) {
      this.inlineRename = null;
      return;
    }
    const o = i.label ?? i.id, n = e.draft.trim() ? e.draft.trim() : void 0;
    if ((i.label ?? void 0) === n) {
      this.inlineRename = null;
      return;
    }
    const s = this.config, r = ni(s, e.id, n);
    this.inlineRename = null, this.pushPatch(
      s,
      r,
      `Rename node ${o} to ${n ?? "(cleared)"}`
    );
  }
  onOverlayChipDblClick(t, e) {
    t.preventDefault(), t.stopPropagation(), this.inlineRename = { kind: "overlay", id: e.id, draft: e.id };
  }
  commitOverlayInlineRename(t) {
    const e = this.inlineRename;
    if (!e || e.kind !== "overlay" || !this.config) return;
    if (!t) {
      this.inlineRename = null;
      return;
    }
    const i = e.draft.trim();
    if (!i || i === e.id) {
      this.inlineRename = null;
      return;
    }
    const o = this.config, n = fi(o, e.id, i);
    if (n === o) {
      this.errorMessage = c("editor.errors.renameIdConflict"), this.inlineRename = null;
      return;
    }
    this.inlineRename = null, this.errorMessage = "", this.pushPatch(o, n, `Rename overlay ${e.id} to ${i}`), this.selectedOverlayId = i;
  }
  onInspectorFlowIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, o = i.value.trim(), n = this.config, s = cs(n, t, o);
    if (s === n) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(n, s, `Rename flow ${t} to ${o}`), this.selectedFlowId = o;
  }
  onInspectorOverlayIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, o = i.value.trim(), n = this.config, s = fi(n, t, o);
    if (s === n) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(n, s, `Rename overlay ${t} to ${o}`), this.selectedOverlayId = o;
  }
  // -- inspector edits --
  onNodeLabelChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, o = this.config, s = o.nodes.find((a) => a.id === t)?.label ?? t, r = ni(o, t, i.trim() ? i.trim() : void 0), l = i.trim() ? i.trim() : void 0;
    this.pushPatch(o, r, `Rename node ${s} to ${l ?? t}`);
  }
  setNodeEntity(t, e) {
    if (!this.config) return;
    const i = this.config, o = e.trim(), n = {
      ...i,
      nodes: i.nodes.map(
        (s) => s.id === t ? { ...s, entity: o || void 0 } : s
      )
    };
    this.pushPatch(i, n, `edit entity of ${t}`);
  }
  setFlowEntity(t, e) {
    if (!this.config) return;
    const i = this.config, o = e.trim();
    if (!o) return;
    const n = {
      ...i,
      flows: i.flows.map(
        (s) => s.id === t ? { ...s, entity: o } : s
      )
    };
    this.pushPatch(i, n, `edit entity of ${t}`);
  }
  onOverlaySizeChange(t, e, i) {
    if (!this.config) return;
    const o = (this.config.overlays ?? []).find((a) => a.id === t);
    if (!o) return;
    const n = o.size ?? { width: 20, height: 15 }, s = Number(i.target.value);
    if (!Number.isFinite(s) || s <= 0) return;
    const r = this.config, l = ci(r, t, { ...n, [e]: s });
    this.pushPatch(r, l, `resize overlay ${t}`);
  }
  applyCustomConfig(t) {
    if (!this.config) return;
    const e = this.customConfigDraft.trim();
    if (!e) {
      this.customConfigError = "Config is empty.";
      return;
    }
    let i;
    try {
      i = JSON.parse(e);
    } catch (n) {
      this.customConfigError = c("editor.inspector.invalidCardJson", n instanceof Error ? n.message : String(n));
      return;
    }
    if (!i || typeof i != "object" || Array.isArray(i)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const o = this.config;
    try {
      const n = Jn(o, t, i), s = ve(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: o, next: s, description: `edit overlay ${t} card config` }), this.commitToHa(s);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(t) {
    if (!this.config) return;
    const e = this.config, i = Xn(e, t);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(e, i, `delete overlay ${t}`);
  }
  removeNode(t) {
    if (!this.config) return;
    const e = this.config, i = Ln(e, t);
    this.selectedNodeId = null, this.pushPatch(e, i, `delete node ${t}`);
  }
  removeFlow(t) {
    if (!this.config) return;
    const e = this.config, i = Gn(e, t);
    this.selectedFlowId = null, this.pushPatch(e, i, `delete flow ${t}`);
  }
  // -- zoom / pan --
  /**
   * Clamp panX/panY so the background image always covers the full stage — no
   * black borders in any direction. Must be called after every pan or zoom change.
   */
  clampPan() {
    const t = this.canvasRef.value;
    if (!t) return;
    const e = t.offsetWidth - 16, i = t.offsetHeight - 8, o = this.imageNaturalW * this.scale, n = this.imageNaturalH * this.scale;
    this.panX = Math.min(0, Math.max(e - o, this.panX)), this.panY = Math.min(0, Math.max(i - n, this.panY));
  }
  adjustZoom(t, e, i) {
    const o = this.canvasRef.value, n = e ?? (o ? o.offsetWidth / 2 : 0), s = i ?? (o ? o.offsetHeight / 2 : 0), r = Math.min(5, Math.max(this.fitScale, this.scale * t));
    r !== this.scale && (this.panX = n - (n - this.panX) * (r / this.scale), this.panY = s - (s - this.panY) * (r / this.scale), this.scale = r, this.clampPan());
  }
  resetZoom() {
    this.scale = this.fitScale, this.panX = this.fitPanX, this.panY = this.fitPanY;
  }
  // -- utilities --
  /**
   * Convert client coordinates to card-space percentage, correctly accounting
   * for zoom (scale) and pan. The canvas-content layer has a CSS transform
   * applied, so stage.getBoundingClientRect() returns visually-scaled dimensions.
   * We reverse the transform to get true card-space coordinates.
   *
   * Transform applied to canvas-content:
   *   screenPos = panOffset + cardPos * scale
   * Inverse:
   *   cardPos = (screenPos - panOffset) / scale
   *
   * The stage's CSS (unscaled) size equals the canvas size because it uses
   * position:absolute;inset:4px 8px. At scale=1 the stage bounding rect
   * equals the canvas rect. At scale>1 the stage bounding rect is larger.
   * Dividing by scale restores the original CSS size.
   */
  /**
   * Convert a screen-space pointer coordinate to a card-space percentage [0..100].
   *
   * Layout chain:
   *   canvas (.z-canvas)
   *     └─ stage (position:absolute; inset:4px 8px)
   *          └─ canvas-content (position:absolute; inset:0)
   *               transform: translate(panX, panY) scale(scale); transform-origin:0 0
   *
   * canvas-content origin is at stage top-left (CSS coords). A card point at
   * (cx%, cy%) sits at CSS position (stageW*cx/100, stageH*cy/100) within
   * canvas-content. After the transform it appears at screen offset:
   *   screenX = stageLeft + panX + stageW*(cx/100)*scale
   *   screenY = stageTop  + panY + stageH*(cy/100)*scale
   *
   * Inverting:
   *   cx% = (screenX - stageLeft - panX) / (stageW * scale) * 100
   *   cy% = (screenY - stageTop  - panY) / (stageH * scale) * 100
   *
   * stageLeft = canvasLeft + 8;  stageTop = canvasTop + 4
   */
  pointerToPercent(t) {
    const e = this.canvasRef.value;
    if (!e) return null;
    const i = e.getBoundingClientRect();
    if (i.width <= 0 || i.height <= 0) return null;
    const o = t.clientX - (i.left + 8), n = t.clientY - (i.top + 4), s = (o - this.panX) / this.scale, r = (n - this.panY) / this.scale, l = z(s / this.imageNaturalW * 100), a = z(r / this.imageNaturalH * 100);
    return { x: l, y: a };
  }
  pushPatch(t, e, i) {
    try {
      const o = ve(t), n = ve(e);
      this.errorMessage = "", this.undoStack.push({ prev: o, next: n, description: i }), this.commitToHa(n), this.config = n, ht(n.debug ?? !1);
    } catch (o) {
      this.errorMessage = o instanceof Error ? o.message : String(o), this.config = t;
    }
  }
  applyConfig(t, e) {
    this.config = t, e ? this.commitToHa(t) : this.commitToHa(t);
  }
  commitToHa(t) {
    this._ownCommit = !0;
    const e = new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  refreshUndoState() {
    this.canUndo = this.undoStack.canUndo(), this.canRedo = this.undoStack.canRedo(), this.undoLabel = this.undoStack.topUndoDescription() ?? "", this.redoLabel = this.undoStack.topRedoDescription() ?? "";
  }
};
P.KNOWN_WEATHER_STATES = [
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
P.styles = vt`
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
      grid-template-columns: 15% 50% 35%;
      background: var(--card-background-color, #1a1a1a);
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      overflow: hidden;
    }
    /* ── Toolbar: left column — Undo/Redo (row 1) + Zoom (row 2) ── */
    .tb-col-undo {
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .tb-icon-row {
      flex: 1 1 0;
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.06));
    }
    .tb-icon-row:last-child {
      border-bottom: none;
    }
    .tb-icon-btn {
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font: inherit;
      background: transparent;
      border: none;
      border-right: 1px solid var(--divider-color, rgba(255,255,255,0.06));
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: background 120ms;
    }
    .tb-icon-btn:last-child {
      border-right: none;
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
    .stage.mode-pan {
      cursor: grab;
    }
    /* canvas-content: unified scene layer sized to image natural dimensions.
       Width/height are set via inline style (imageNaturalW × imageNaturalH px).
       Transform pans/zooms the whole scene as one unit. */
    .canvas-content {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      will-change: transform;
    }
    .canvas-content--pending {
      transform: none;
    }
    /* Background image fills canvas-content exactly — no distortion since
       canvas-content is sized to match the image's natural dimensions. */
    .background {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .background--pending {
      background-size: contain;
      background-position: center center;
    }
    .connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .node-effects-editor {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      pointer-events: none;
    }
    .inspector-details.node-effect-details {
      margin-top: 6px;
      border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      padding-top: 4px;
    }
    .inspector-details.node-effect-details summary {
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      padding: 4px 0;
    }
    .inspector-details.node-effect-details summary::before {
      content: '▸ ';
    }
    .inspector-details.node-effect-details[open] summary::before {
      content: '▾ ';
    }
    .inspector-details.node-effect-details summary::-webkit-details-marker {
      display: none;
    }
    .node-effect-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 6px 0 8px;
    }
    .node-effect-body label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .node-effect-type-row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 10px;
    }
    .node-effect-preview {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    }
    .node-effect-type-label {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
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
    .ms-btn.suggest-path-busy {
      white-space: nowrap;
    }
    .suggest-path-spinner {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-left: 6px;
      vertical-align: -2px;
      border: 2px solid rgba(255, 255, 255, 0.35);
      border-top-color: rgba(255, 255, 255, 0.92);
      border-radius: 50%;
      animation: flowme-suggest-spin 0.65s linear infinite;
    }
    @keyframes flowme-suggest-spin {
      to {
        transform: rotate(360deg);
      }
    }
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
    .handle-id {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.8);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      white-space: nowrap;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input.inline-rename {
      font-size: 11px;
      color: #fff;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      outline: none;
      min-width: 60px;
      max-width: 200px;
      padding: 0 2px 1px;
      border-radius: 0;
      box-sizing: border-box;
      font-family: inherit;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    input.overlay-inline-rename {
      font-size: 10px;
      max-width: 140px;
      pointer-events: auto;
    }
    .inspector-id-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .inspector-id-row input {
      flex: 1;
      min-width: 120px;
    }
    .field-row.domain-field,
    .domain-field {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .flow-endpoint-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }
    .flow-endpoint-row label {
      font-size: 12px;
      opacity: 0.9;
    }
    .flow-endpoint-select {
      width: 100%;
      max-width: 100%;
    }
    .flow-endpoint-busy {
      margin: 4px 0 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .flow-endpoint-error {
      color: var(--error-color, #f44336);
      font-size: 12px;
      margin: 0 0 8px;
    }
    .field-label {
      min-width: 5rem;
    }
    .waypoint {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border-radius: 2px;
      background: #ffffff;
      border: 2px solid var(--primary-color, #03a9f4);
      cursor: move;
      touch-action: none;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
    }
    .waypoint:hover {
      background: #fff;
      transform: translate(-50%, -50%) scale(1.25);
    }
    .waypoint:active {
      cursor: move;
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
      pointer-events: auto;
      cursor: text;
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
      right: -8px;
      bottom: -8px;
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
      border-radius: 3px;
      background: var(--primary-color, #03a9f4);
      border: 2px solid rgba(255, 255, 255, 0.9);
      cursor: nwse-resize;
      pointer-events: all;
      touch-action: none;
      box-sizing: border-box;
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
    .inspector h3,
    .inspector h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }
    .inspector-fieldset {
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      border-radius: 6px;
      padding: 8px 10px;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .inspector-legend {
      font-size: 11px;
      font-weight: 600;
      padding: 0 4px;
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
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .node-cell input[type='color'] {
      width: 100%;
      height: 26px;
      padding: 1px 2px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--card-background-color, #1a1a1a);
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
      margin: 0;
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
      list-style: none;
      margin: 0;
      padding: 0;
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
      margin: 0 0 2px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.7;
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

    /* Keyboard focus rings (keyboard only) */
    .tb-icon-btn:focus-visible,
    .tb-btn:focus-visible,
    .tb-select:focus-visible,
    .ms-btn:focus-visible,
    .handle:focus-visible,
    .waypoint:focus-visible,
    .overlay-handle:focus-visible,
    .overlay-resize:focus-visible,
    .inspector button:focus-visible,
    .inspector input:focus-visible,
    .inspector select:focus-visible,
    .inspector textarea:focus-visible,
    .eye-toggle:focus-visible,
    .icon-btn:focus-visible,
    .suggest-bar button:focus-visible,
    .anim-details summary:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (prefers-contrast: more) {
      .overlay-handle.overlay-wrapper {
        outline: 2px solid var(--primary-text-color);
        outline-offset: 1px;
      }
    }
  `;
D([
  Ne({ attribute: !1 })
], P.prototype, "hass", 2);
D([
  N()
], P.prototype, "config", 2);
D([
  N()
], P.prototype, "pending", 2);
D([
  N()
], P.prototype, "previewMode", 2);
D([
  N()
], P.prototype, "selectedNodeId", 2);
D([
  N()
], P.prototype, "selectedNodeIds", 2);
D([
  N()
], P.prototype, "selectedFlowId", 2);
D([
  N()
], P.prototype, "selectedOverlayId", 2);
D([
  N()
], P.prototype, "customConfigDraft", 2);
D([
  N()
], P.prototype, "customConfigError", 2);
D([
  N()
], P.prototype, "errorMessage", 2);
D([
  N()
], P.prototype, "inlineRename", 2);
D([
  N()
], P.prototype, "canUndo", 2);
D([
  N()
], P.prototype, "canRedo", 2);
D([
  N()
], P.prototype, "undoLabel", 2);
D([
  N()
], P.prototype, "redoLabel", 2);
D([
  N()
], P.prototype, "suggestPreview", 2);
D([
  N()
], P.prototype, "suggestBusy", 2);
D([
  N()
], P.prototype, "flowEndpointPathfindingFlowId", 2);
D([
  N()
], P.prototype, "flowEndpointError", 2);
D([
  N()
], P.prototype, "selectorType", 2);
D([
  N()
], P.prototype, "savedConfig", 2);
D([
  N()
], P.prototype, "scale", 2);
D([
  N()
], P.prototype, "panX", 2);
D([
  N()
], P.prototype, "panY", 2);
D([
  N()
], P.prototype, "imageLayoutReady", 2);
P = D([
  $t("flowme-card-editor")
], P);
var Hs = Object.defineProperty, Ts = Object.getOwnPropertyDescriptor, V = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Ts(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && Hs(e, i, n), n;
};
const Gs = "1.23.16", Ci = 5e3;
console.info(
  `%c flowme %c v${Gs} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function Ws(t) {
  if (!t) return "";
  const e = [], i = (o, n) => {
    const s = t[o];
    s !== void 0 && e.push(`${n}:${s};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), e.join("");
}
function Us(t) {
  if (!t) return "";
  const e = [], i = (o, n) => {
    t[o] === !1 && e.push(`${n}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), e.join("");
}
let U = class extends oe {
  constructor() {
    super(...arguments), this._connectionAwaitingReconnect = !1, this._boundHaConnection = null, this.onHaConnectionReady = () => {
      this.onReconnect();
    }, this.onHaConnectionDisconnected = () => {
      this._connectionAwaitingReconnect = !0;
    }, this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = Z(), this.nodeFxSvgRef = Z(), this.nodeFx = new Wi(), this._nodeFxRaf = null, this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this.onOverlayKeydown = (t, e) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleOverlayTap(e));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(t) {
    const e = this._hass;
    if (this._hass = t, t && t.language !== this._lastLanguage && (this._lastLanguage = t.language, Ei(t.language)), t) {
      const i = this.config, o = [
        ...i?.flows.map((a) => a.entity) ?? [],
        ...i?.flows.map((a) => a.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((a) => a.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((a) => typeof a == "string" && a.length > 0), n = {};
      for (const a of o)
        n[a] = t.states[a]?.state;
      E("hass setter called. config entity states:", n);
      const s = i?.background.weather_entity;
      if (s) {
        const a = e?.states[s]?.state, d = t.states[s]?.state;
        E("[weather] state:", d, "(was:", a, ")"), a !== d && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const a = e?.states[r]?.state, d = t.states[r]?.state;
        a !== d && (E("[sun] state changed:", a, "→", d), this.syncWeatherBackground());
      }
      const l = t.connection;
      this.bindHaConnection(l);
    } else
      E("hass setter called with undefined"), this.bindHaConnection(void 0), e && this.showToast(c("card.connectionLost"));
    this.requestUpdate("hass", e);
  }
  /** ANIM-3: subscribe once per hass.connection instance */
  bindHaConnection(t) {
    this._boundHaConnection !== t && (this._boundHaConnection && (this._boundHaConnection.removeEventListener("ready", this.onHaConnectionReady), this._boundHaConnection.removeEventListener("disconnected", this.onHaConnectionDisconnected), this._boundHaConnection = null), t && (t.addEventListener("ready", this.onHaConnectionReady), t.addEventListener("disconnected", this.onHaConnectionDisconnected), this._boundHaConnection = t));
  }
  /**
   * ANIM-3: after websocket reconnect — refresh renderer values without tearing
   * down SVG/Houdini; optional brief toast.
   */
  onReconnect() {
    this.hass && this.config && this.renderer && this.pushAllValuesToRenderer(), this._connectionAwaitingReconnect && (this._connectionAwaitingReconnect = !1, this.showToast(c("card.reconnected"), 1500));
  }
  /**
   * Full SVG/Houdini rebuild is only needed when the set of flow ids changes.
   * Other edits use {@link FlowRenderer.applyConfig} so the HA editor preview
   * stays responsive (otherwise every keystroke costs a full renderer init).
   */
  needsRendererReinit(t, e) {
    const i = new Set(t.flows.map((n) => n.id)), o = new Set(e.flows.map((n) => n.id));
    if (i.size !== o.size) return !0;
    for (const n of i)
      if (!o.has(n)) return !0;
    return !1;
  }
  /** Avoid resetting background layers when `background.default` is unchanged (editor spam). */
  updateBackgroundLayersAfterConfig(t, e) {
    const i = e.background?.default ?? "";
    if (!t) {
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
      return;
    }
    t.background?.default !== e.background?.default && (this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i);
  }
  logFirstPaint() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        O() && console.log("[FlowMe] first paint:", performance.now());
      });
    });
  }
  setConfig(t) {
    const e = performance.now();
    O() && console.log("[FlowMe] setConfig start:", e);
    try {
      const i = ve(t);
      ht(i.debug ?? !1), E("setConfig called:", JSON.parse(JSON.stringify(t ?? null))), E(
        "setConfig validated → flows=",
        i.flows.length,
        "nodes=",
        i.nodes.length,
        "overlays=",
        i.overlays?.length ?? 0
      );
      const o = this.config, n = !!o && !!this.renderer && this.needsRendererReinit(o, i);
      if (!!this.renderer && !!o && !n && typeof this.renderer.applyConfig == "function") {
        if (this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(o, i), this.renderer.applyConfig(i), this.rendererReadyFor = i, this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), O()) {
          const r = performance.now();
          console.log("[FlowMe] teardown complete:", r, "(skipped — applyConfig)"), console.log("[FlowMe] renderer init start:", r, "(skipped — applyConfig)"), console.log("[FlowMe] renderer init complete:", r, "(skipped — applyConfig)");
        }
        this.logFirstPaint();
        return;
      }
      this.renderer && n ? (this.teardownRenderer(), O() && console.log("[FlowMe] teardown complete:", performance.now())) : O() && console.log("[FlowMe] teardown complete:", performance.now(), "(skipped)"), this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(o, i), this.logFirstPaint();
    } catch (i) {
      const o = i instanceof _t ? i.message : String(i);
      this.config = void 0, this.errorMessage = o, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), E("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    E("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), E("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null), this.bindHaConnection(void 0), this.nodeFx.reset(), this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), super.disconnectedCallback();
  }
  /**
   * Start (or restart) the flow renderer when `config` is set and the mount
   * node exists. Runs from {@link willUpdate} when the mount ref already
   * points at a live element from a prior render, and from {@link updated}
   * after the first paint so `ref()` is populated — avoiding a dependency on
   * the next `hass` update (HA preview can delay hass by several seconds).
   */
  beginRendererInitIfNeeded() {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (!t || this.rendererReadyFor === this.config) return;
    O() && console.log("[FlowMe] renderer init start:", performance.now()), this.teardownRenderer(), this.renderer = xn(), this.rendererReadyFor = this.config;
    const e = this.config;
    this.renderer.init(t, e).then(() => {
      O() && console.log("[FlowMe] renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
    }).catch((i) => {
      E("renderer init failed — falling back to SVG renderer", i), this.teardownRenderer(), this.renderer = new He(), this.rendererReadyFor = e, this.renderer.init(t, e).then(() => {
        O() && console.log("[FlowMe] renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
      }).catch((o) => {
        console.error("[flowme] SVG renderer init also failed", o);
      });
    });
  }
  willUpdate(t) {
    this.config && (this.beginRendererInitIfNeeded(), t.has("hass") && this.renderer && (this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels()), (t.has("config") || t.has("hass")) && this.syncWeatherBackground());
  }
  updated(t) {
    super.updated(t), this.beginRendererInitIfNeeded();
    const e = this.nodeFxSvgRef.value;
    e && this.config && this.nodeFx.sync(e, this.config, this.hass, performance.now(), this.nodeEffectHooks()), this.ensureNodeEffectsRaf();
  }
  queryNodeDot(t) {
    const e = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(t) : t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return this.shadowRoot?.querySelector(`[data-node-id="${e}"] .node-dot`) ?? null;
  }
  clearNodeEffectDomStyles() {
    this.shadowRoot?.querySelectorAll(".node-dot[data-flowme-fx]").forEach((t) => {
      const e = t, i = e.getAttribute("data-flowme-base-fill");
      i && (e.style.background = i), e.style.filter = "", e.style.transition = "", e.removeAttribute("data-flowme-fx");
    });
  }
  nodeEffectHooks() {
    return {
      resetDomEffects: () => this.clearNodeEffectDomStyles(),
      getLayoutMetrics: (t) => {
        const e = t.getBoundingClientRect();
        return { widthPx: Math.max(1, e.width), heightPx: Math.max(1, e.height) };
      },
      setNodeDotBackground: (t, e, i) => {
        const o = this.queryNodeDot(t);
        o && (o.setAttribute("data-flowme-fx", "1"), o.style.transition = i?.transitionMs ? `background-color ${i.transitionMs}ms ease` : "", o.style.background = e);
      },
      setNodeDotFilter: (t, e) => {
        const i = this.queryNodeDot(t);
        i && (i.setAttribute("data-flowme-fx", "1"), i.style.filter = e ?? "");
      }
    };
  }
  ensureNodeEffectsRaf() {
    if (!!!this.config?.nodes.some((i) => i.node_effect && i.visible !== !1)) {
      this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null);
      return;
    }
    if (this._nodeFxRaf !== null) return;
    const e = () => {
      this._nodeFxRaf = requestAnimationFrame(e);
      const i = this.nodeFxSvgRef.value;
      i && this.config && this.nodeFx.sync(i, this.config, this.hass, performance.now(), this.nodeEffectHooks());
    };
    this._nodeFxRaf = requestAnimationFrame(e);
  }
  /**
   * Push the current hass state values for every flow to the renderer,
   * including gradient colours. Called both on hass changes and after
   * a fresh renderer is initialised so colours never need a hass event
   * to become visible.
   */
  pushAllValuesToRenderer() {
    if (!(!this.config || !this.renderer)) {
      if (!this.hass) {
        this.syncRendererAriaLabels();
        return;
      }
      E("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (const t of this.config.flows) {
        const e = this.hass.states[t.entity], i = xe(e?.state), o = W(t.domain ?? this.config.domain), n = e?.attributes?.unit_of_measurement, s = jt(i, n, o.unit_scale);
        if (E(
          "updateFlow →",
          t.id,
          "entity=",
          t.entity,
          "raw=",
          e?.state,
          "parsed=",
          i,
          "sensorUnit=",
          n ?? "(none)",
          "matchedUnit=",
          s.matchedUnit ?? "(none → passthrough)",
          "factor=",
          s.factor,
          "scaledToBase(" + o.unit_label + ")=",
          s.value
        ), e) {
          if (e.state === "unavailable" || e.state === "unknown") {
            const r = `${t.id}:${t.entity}:unavailable`;
            this.warnedMissing.has(r) || (this.warnedMissing.add(r), E(`flow "${t.id}" entity "${t.entity}" is currently ${e.state} — no flow will render until it reports a number`));
          }
        } else {
          const r = `${t.id}:${t.entity}`;
          this.warnedMissing.has(r) || (this.warnedMissing.add(r), E(`flow "${t.id}" references entity "${t.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(t.id, s.value), t.value_gradient && this.renderer.setGradientColor) {
          const r = t.value_gradient.entity, l = this.hass.states[r];
          if (l && l.state !== "unavailable" && l.state !== "unknown") {
            const a = parseFloat(l.state);
            if (Number.isFinite(a)) {
              const d = t.value_gradient, p = Math.max(d.low_value, Math.min(d.high_value, a)), h = Oi(a, d);
              E(
                "[gradient]",
                t.id,
                "entity value:",
                a,
                "clamped:",
                p,
                "range:",
                `${d.low_value}–${d.high_value}`,
                "colour:",
                h
              ), this.renderer.setGradientColor(t.id, h);
            } else
              E(`flow "${t.id}" gradient entity "${r}" state "${l.state}" is not a number`), this.renderer.setGradientColor(t.id, null);
          } else
            E(`flow "${t.id}" gradient entity "${r}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(t.id, null);
        }
      }
      this.syncRendererAriaLabels();
    }
  }
  /** Push screen-reader labels onto flow renderer groups (SVG or Houdini). */
  syncRendererAriaLabels() {
    if (!(!this.config || !this.renderer?.setFlowAriaLabel))
      for (const t of this.config.flows)
        this.renderer.setFlowAriaLabel(t.id, this.formatFlowAriaLabel(t));
  }
  describeFlowReading(t) {
    if (!this.hass || !this.config) return c("card.noConnection");
    const e = this.hass.states[t.entity], i = W(t.domain ?? this.config.domain);
    if (!e) return c("card.entityNotFound");
    if (e.state === "unavailable" || e.state === "unknown") return e.state;
    const o = xe(e.state), n = e.attributes?.unit_of_measurement ?? "", s = jt(o, n, i.unit_scale);
    return n ? `${this.formatSensorNumber(s.value)} ${n}` : i.describe(s.value);
  }
  formatFlowAriaLabel(t) {
    return c("aria.flowGroup", t.id, this.describeFlowReading(t));
  }
  formatNodeAriaLabel(t) {
    const e = t.label ?? t.id;
    if (!this.hass || !t.entity || !this.config) return e;
    const i = this.hass.states[t.entity], o = W(this.config.domain);
    if (!i) return c("aria.readingWithTitle", e, c("card.entityNotFound"));
    if (i.state === "unavailable" || i.state === "unknown")
      return c("aria.readingWithTitle", e, i.state);
    const n = xe(i.state), s = i.attributes?.unit_of_measurement ?? "";
    return s ? c("aria.readingWithTitle", e, `${this.formatSensorNumber(n)} ${s}`) : c("aria.readingWithTitle", e, o.describe(n));
  }
  getCardSize() {
    const t = Qe(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / t) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const t = Qe(this.config?.aspect_ratio) ?? 1.6;
    return {
      grid_columns: 4,
      grid_rows: Math.max(2, Math.round(4 / t) + 1),
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
        <ha-card role="region" aria-label=${c("aria.card")}>
          <div class="error">
            <strong>${c("card.invalidConfigurationTitle")}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const t = this.config;
    if (!t)
      return b`<ha-card role="region" aria-label=${c("aria.card")}><div class="placeholder">${c("card.loading")}</div></ha-card>`;
    const i = `${1 / (Qe(t.aspect_ratio) ?? 16 / 10) * 100}%`, o = t.background.transition_duration ?? Ci, n = Ws(t.opacity), s = Us(t.visibility);
    return b`
      <ha-card role="region" aria-label=${c("aria.card")}>
        <div
          class="stage"
          style=${`padding-top: ${i};${n}${s}`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, o)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, o)}
          ></div>
          <div class="renderer-mount" ${X(this.rendererMount)}></div>
          <svg
            class="node-effects-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            ${X(this.nodeFxSvgRef)}
          ></svg>
          ${t.nodes.map((r) => this.renderNodeHandle(r))}
          ${(t.overlays ?? []).map((r) => (E("rendering overlay →", r.type, "position=", r.position, "size=", r.size), An(r, this.hass, {
      onOverlayKeydown: this.onOverlayKeydown
    })))}
        </div>
        <div
          class=${`fm-toast ${this.toastVisible ? "fm-toast--visible" : ""}`}
        >
          ${this.toastMessage}
        </div>
      </ha-card>
    `;
  }
  showToast(t, e = 3e3) {
    this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), this.toastMessage = t, this.toastVisible = !0, this.toastHideTimer = window.setTimeout(() => {
      this.toastVisible = !1, this.toastHideTimer = null;
    }, e);
  }
  /** Activate the embedded HA card (same intent as a tap). Best-effort error toast. */
  handleOverlayTap(t) {
    try {
      const e = this.shadowRoot?.querySelectorAll(".overlay-custom") ?? [];
      let i;
      for (const o of e)
        if (o.getAttribute("data-overlay-id") === t.id) {
          i = o.querySelector("flowme-custom-overlay");
          break;
        }
      i?.activatePrimaryAction();
    } catch {
      this.showToast(c("card.actionFailed"));
    }
  }
  buildLayerStyle(t, e) {
    return `${t ? `background-image: url('${t}');` : ""} transition-duration: ${e}ms;`;
  }
  resolveTargetBackground() {
    const t = this.config?.background;
    if (!t) return "";
    if (t.weather_entity && t.weather_states && this.hass) {
      const e = this.hass.states[t.weather_entity];
      if (e) {
        const i = e.state, o = t.sun_entity ? this.hass.states[t.sun_entity]?.state : void 0, n = Ko(i, o, t.weather_states, t.default);
        let s = i;
        return o === "below_horizon" && !i.endsWith("-night") && (s = `${i}-night`), E("[FlowMe] sun:", o, "weather:", i, "→ lookup key:", s, "→ image:", n !== t.default ? n : "default"), n;
      }
    }
    return t.default;
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
    const t = this.resolveTargetBackground();
    if (!t || t === this.lastAppliedBgUrl) return;
    const e = this.config.background.transition_duration ?? Ci;
    this.preload(t).then(() => {
      if (!this.config || this.resolveTargetBackground() !== t) return;
      this.transitionTimer !== null && window.clearTimeout(this.transitionTimer);
      const i = this.activeLayer === "A" ? "B" : "A";
      i === "A" ? this.bgLayerA = t : this.bgLayerB = t, requestAnimationFrame(() => {
        this.activeLayer = i, this.lastAppliedBgUrl = t, this.transitionTimer = window.setTimeout(() => {
          this.activeLayer === "A" ? this.bgLayerB = "" : this.bgLayerA = "", this.transitionTimer = null;
        }, e + 50);
      });
    });
  }
  preload(t) {
    if (!t) return Promise.resolve();
    const e = this.preloadCache.get(t);
    return e?.complete && e.naturalWidth > 0 ? Promise.resolve() : new Promise((i) => {
      const o = new Image();
      o.decoding = "async", o.onload = () => {
        this.preloadCache.set(t, o), i();
      }, o.onerror = () => i(), o.src = t, this.preloadCache.set(t, o);
    });
  }
  renderNodeHandle(t) {
    const e = this.hass && t.entity ? this.hass.states[t.entity] : void 0, i = t.show_value !== !1 && !!e, o = t.show_label !== !1 && !!t.label, n = W(this.config?.domain), s = t.color ?? this.nodeFlowColor(t.id) ?? n.default_color_positive, r = t.size ?? this.config?.defaults?.node_radius ?? 12;
    let l = "";
    if (e) {
      const d = xe(e.state), p = e.attributes?.unit_of_measurement ?? "";
      p ? l = `${this.formatSensorNumber(d)} ${p}` : l = n.describe(d);
    }
    const a = t.visible === !1;
    return b`
      <div
        class="node"
        data-node-id=${t.id}
        role="img"
        aria-label=${this.formatNodeAriaLabel(t)}
        style=${`left: ${t.position.x}%; top: ${t.position.y}%; --flowme-dot-size: ${r}px;${t.opacity !== void 0 ? ` opacity: ${t.opacity};` : ""}${a ? " display: none;" : ""}`}
      >
        <span class="node-dot-wrap">
          <span
            class="node-dot node-circle"
            data-flowme-base-fill=${s}
            style=${`background: ${s}; width: ${r}px; height: ${r}px;`}
          ></span>
        </span>
        ${o ? b`<span class="node-label">${t.label}</span>` : null}
        ${i ? b`<span class="node-value">${l}</span>` : null}
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
  nodeFlowColor(t) {
    if (!this.config) return;
    const e = this.config.domain, i = this.config.domain_colors;
    let o;
    const n = /* @__PURE__ */ new Set();
    for (let s = 0; s < this.config.flows.length; s++) {
      const r = this.config.flows[s];
      if (r.from_node !== t && r.to_node !== t) continue;
      const l = W(r.domain ?? e), a = he(r, l, r.domain ?? e, 1, i, s), d = a.toLowerCase();
      n.has(d) || (n.add(d), o || (o = a));
    }
    if (n.size !== 0)
      return n.size === 1 ? o : Gi;
  }
  /**
   * Format a numeric sensor reading for node display. Mirrors the compact
   * thresholds the overlay renderer uses so values stay consistent across
   * the card.
   */
  formatSensorNumber(t) {
    if (!Number.isFinite(t)) return "—";
    const e = Math.abs(t);
    return e >= 1e3 || e >= 100 ? t.toFixed(0) : e >= 10 ? t.toFixed(1) : t.toFixed(2);
  }
  teardownRenderer() {
    this.renderer && (this.renderer.destroy(), this.renderer = null), this.rendererReadyFor = void 0;
  }
};
U.styles = vt`
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
    .node-effects-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      overflow: visible;
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
    .node-dot-wrap {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
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
    /* Material-style tap ripple on interactive overlay wrappers + embedded card host. */
    .overlay.overlay-interactive {
      position: relative;
      overflow: hidden;
    }
    .overlay.overlay-interactive::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.4) 0%,
        transparent 70%
      );
      transform: scale(0);
      opacity: 0;
      transition: none;
      pointer-events: none;
      z-index: 11;
    }
    .overlay.overlay-interactive:active::after {
      transform: scale(2.5);
      opacity: 1;
      transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
    }
    .overlay-wrapper:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .fm-toast {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      opacity: 0;
      transition:
        opacity 0.2s,
        transform 0.2s;
      pointer-events: none;
      z-index: 1000;
      white-space: nowrap;
    }
    .fm-toast--visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
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

    ha-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (prefers-contrast: more) {
      .renderer-mount svg use.flow-line {
        stroke-width: 3px !important;
      }
      .renderer-mount svg g[data-flow-id] * {
        filter: none !important;
      }
      .overlay.overlay-wrapper {
        outline: 2px solid var(--primary-text-color);
        outline-offset: 1px;
      }
      .node-label,
      .node-value {
        text-shadow: none;
        color: var(--primary-text-color);
      }
      .node-dot.node-circle {
        box-shadow: none;
        outline: 2px solid var(--primary-text-color);
        outline-offset: 1px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .renderer-mount svg animateMotion,
      .renderer-mount svg animate {
        animation-play-state: paused !important;
      }
      .flow-houdini {
        animation: none !important;
      }
      .background {
        transition: none !important;
      }
      .overlay.overlay-interactive::after {
        display: none !important;
      }
      .fm-toast {
        transition: none !important;
      }
    }
  `;
V([
  Ne({ attribute: !1 })
], U.prototype, "hass", 1);
V([
  N()
], U.prototype, "config", 2);
V([
  N()
], U.prototype, "errorMessage", 2);
V([
  N()
], U.prototype, "toastVisible", 2);
V([
  N()
], U.prototype, "toastMessage", 2);
V([
  N()
], U.prototype, "bgLayerA", 2);
V([
  N()
], U.prototype, "bgLayerB", 2);
V([
  N()
], U.prototype, "activeLayer", 2);
U = V([
  $t("flowme-card")
], U);
const mt = window;
mt.customCards = mt.customCards ?? [];
mt.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: c("card.hacsDescription"),
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  U as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
