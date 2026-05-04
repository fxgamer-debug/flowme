/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = globalThis, bt = Te.ShadowRoot && (Te.ShadyCSS === void 0 || Te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let Fi = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (bt && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = Pt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Pt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Qi = (t) => new Fi(typeof t == "string" ? t : t + "", void 0, yt), vt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[s + 1], t[0]);
  return new Fi(i, t, yt);
}, en = (t, e) => {
  if (bt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), o = Te.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, t.appendChild(n);
  }
}, Mt = bt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return Qi(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: tn, defineProperty: nn, getOwnPropertyDescriptor: on, getOwnPropertyNames: sn, getOwnPropertySymbols: rn, getPrototypeOf: an } = Object, J = globalThis, Nt = J.trustedTypes, ln = Nt ? Nt.emptyScript : "", cn = J.reactiveElementPolyfillSupport, xe = (t, e) => t, Ue = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ln : null;
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
} }, wt = (t, e) => !tn(t, e), Bt = { attribute: !0, type: String, converter: Ue, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), J.litPropertyMetadata ?? (J.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ae = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Bt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(e, n, i);
      o !== void 0 && nn(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: o, set: s } = on(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const l = o?.call(this);
      s?.call(this, r), this.requestUpdate(e, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(xe("elementProperties"))) return;
    const e = an(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(xe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(xe("properties"))) {
      const i = this.properties, n = [...sn(i), ...rn(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const o of n) i.unshift(Mt(o));
    } else e !== void 0 && i.push(Mt(e));
    return i;
  }
  static _$Eu(e, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const n of i.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return en(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, n) {
    this._$AK(e, n);
  }
  _$ET(e, i) {
    const n = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Ue).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, o = n._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ue;
      this._$Em = o;
      const l = r.fromAttribute(i, s.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, o = !1, s) {
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[e]), n ?? (n = r.getPropertyOptions(e)), !((n.hasChanged ?? wt)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, n)))) return;
      this.C(e, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: n, reflect: o, wrapped: s }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? i ?? this[e]), s !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: r } = s, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
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
ae.elementStyles = [], ae.shadowRootOptions = { mode: "open" }, ae[xe("elementProperties")] = /* @__PURE__ */ new Map(), ae[xe("finalized")] = /* @__PURE__ */ new Map(), cn?.({ ReactiveElement: ae }), (J.reactiveElementVersions ?? (J.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis, Et = (t) => t, Ke = $e.trustedTypes, Rt = Ke ? Ke.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Pi = "$lit$", q = `lit$${Math.random().toFixed(9).slice(2)}$`, Mi = "?" + q, dn = `<${Mi}>`, oe = document, Se = () => oe.createComment(""), Ie = (t) => t === null || typeof t != "object" && typeof t != "function", xt = Array.isArray, pn = (t) => xt(t) || typeof t?.[Symbol.iterator] == "function", Xe = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Dt = /-->/g, Lt = />/g, Q = RegExp(`>|${Xe}(?:([^\\s"'>=/]+)(${Xe}*=${Xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, Ot = /"/g, Ni = /^(?:script|style|textarea|title)$/i, Bi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), y = Bi(1), zt = Bi(2), ce = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), Tt = /* @__PURE__ */ new WeakMap(), te = oe.createTreeWalker(oe, 129);
function Ei(t, e) {
  if (!xt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rt !== void 0 ? Rt.createHTML(e) : e;
}
const un = (t, e) => {
  const i = t.length - 1, n = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = ge;
  for (let l = 0; l < i; l++) {
    const a = t[l];
    let d, p, h = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, p = r.exec(a), p !== null); ) u = r.lastIndex, r === ge ? p[1] === "!--" ? r = Dt : p[1] !== void 0 ? r = Lt : p[2] !== void 0 ? (Ni.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = Q) : p[3] !== void 0 && (r = Q) : r === Q ? p[0] === ">" ? (r = o ?? ge, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? Q : p[3] === '"' ? Ot : Ht) : r === Ot || r === Ht ? r = Q : r === Dt || r === Lt ? r = ge : (r = Q, o = void 0);
    const f = r === Q && t[l + 1].startsWith("/>") ? " " : "";
    s += r === ge ? a + dn : h >= 0 ? (n.push(d), a.slice(0, h) + Pi + a.slice(h) + q + f) : a + q + (h === -2 ? l : f);
  }
  return [Ei(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class ke {
  constructor({ strings: e, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const l = e.length - 1, a = this.parts, [d, p] = un(e, i);
    if (this.el = ke.createElement(d, n), te.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = te.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Pi)) {
          const u = p[r++], f = o.getAttribute(h).split(q), g = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: s, name: g[2], strings: f, ctor: g[1] === "." ? fn : g[1] === "?" ? gn : g[1] === "@" ? mn : Ye }), o.removeAttribute(h);
        } else h.startsWith(q) && (a.push({ type: 6, index: s }), o.removeAttribute(h));
        if (Ni.test(o.tagName)) {
          const h = o.textContent.split(q), u = h.length - 1;
          if (u > 0) {
            o.textContent = Ke ? Ke.emptyScript : "";
            for (let f = 0; f < u; f++) o.append(h[f], Se()), te.nextNode(), a.push({ type: 2, index: ++s });
            o.append(h[u], Se());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Mi) a.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(q, h + 1)) !== -1; ) a.push({ type: 7, index: s }), h += q.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const n = oe.createElement("template");
    return n.innerHTML = e, n;
  }
}
function de(t, e, i = t, n) {
  if (e === ce) return e;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Ie(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(t), o._$AT(t, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (e = de(t, o._$AS(t, e.values), o, n)), e;
}
class hn {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (e?.creationScope ?? oe).importNode(i, !0);
    te.currentNode = o;
    let s = te.nextNode(), r = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new Ne(s, s.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (d = new bn(s, this, e)), this._$AV.push(d), a = n[++l];
      }
      r !== a?.index && (s = te.nextNode(), r++);
    }
    return te.currentNode = oe, o;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Ne {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, o) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    e = de(this, e, i), Ie(e) ? e === _ || e == null || e === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : e !== this._$AH && e !== ce && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : pn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== _ && Ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(oe.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ke.createElement(Ei(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new hn(o, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Tt.get(e.strings);
    return i === void 0 && Tt.set(e.strings, i = new ke(e)), i;
  }
  k(e) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of e) o === i.length ? i.push(n = new Ne(this.O(Se()), this.O(Se()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = Et(e).nextSibling;
      Et(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ye {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, o, s) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = _;
  }
  _$AI(e, i = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) e = de(this, e, i, 0), r = !Ie(e) || e !== this._$AH && e !== ce, r && (this._$AH = e);
    else {
      const l = e;
      let a, d;
      for (e = s[0], a = 0; a < s.length - 1; a++) d = de(this, l[n + a], i, a), d === ce && (d = this._$AH[a]), r || (r = !Ie(d) || d !== this._$AH[a]), d === _ ? e = _ : e !== _ && (e += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class fn extends Ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === _ ? void 0 : e;
  }
}
class gn extends Ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== _);
  }
}
class mn extends Ye {
  constructor(e, i, n, o, s) {
    super(e, i, n, o, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = de(this, e, i, 0) ?? _) === ce) return;
    const n = this._$AH, o = e === _ && n !== _ || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== _ && (n === _ || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class bn {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    de(this, e);
  }
}
const yn = $e.litHtmlPolyfillSupport;
yn?.(ke, Ne), ($e.litHtmlVersions ?? ($e.litHtmlVersions = [])).push("3.3.2");
const vn = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new Ne(e.insertBefore(Se(), s), s, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis;
let ne = class extends ae {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = vn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ce;
  }
};
ne._$litElement$ = !0, ne.finalized = !0, _e.litElementHydrateSupport?.({ LitElement: ne });
const wn = _e.litElementPolyfillSupport;
wn?.({ LitElement: ne });
(_e.litElementVersions ?? (_e.litElementVersions = [])).push("4.2.2");
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
const xn = { attribute: !0, type: String, converter: Ue, reflect: !1, hasChanged: wt }, $n = (t = xn, e, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), n === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, t, l), l;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(l) {
      const a = this[r];
      e.call(this, l), this.requestUpdate(r, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Be(t) {
  return (e, i) => typeof i == "object" ? $n(t, e, i) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function B(t) {
  return Be({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _n = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const An = { CHILD: 2 }, Cn = (t) => (...e) => ({ _$litDirective$: t, values: e });
class Sn {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, n) {
    this._$Ct = e, this._$AM = i, this._$Ci = n;
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
const Ae = (t, e) => {
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const n of i) n._$AO?.(e, !1), Ae(n, e);
  return !0;
}, je = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while (i?.size === 0);
}, Ri = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), Fn(e);
  }
};
function In(t) {
  this._$AN !== void 0 ? (je(this), this._$AM = t, Ri(this)) : this._$AM = t;
}
function kn(t, e = !1, i = 0) {
  const n = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (e) if (Array.isArray(n)) for (let s = i; s < n.length; s++) Ae(n[s], !1), je(n[s]);
  else n != null && (Ae(n, !1), je(n));
  else Ae(this, t);
}
const Fn = (t) => {
  t.type == An.CHILD && (t._$AP ?? (t._$AP = kn), t._$AQ ?? (t._$AQ = In));
};
class Pn extends Sn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, n) {
    super._$AT(e, i, n), Ri(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), i && (Ae(this, e), je(this));
  }
  setValue(e) {
    if (_n(this._$Ct)) this._$Ct._$AI(e, this);
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
const Z = () => new Mn();
class Mn {
}
const qe = /* @__PURE__ */ new WeakMap(), X = Cn(class extends Pn {
  render(t) {
    return _;
  }
  update(t, [e]) {
    const i = e !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = e, this.ht = t.options?.host, this.rt(this.ct = t.element)), _;
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
], lt = ["corner", "diagonal", "curve", "smooth"], ct = ["dots", "dash", "arrow", "trail", "fluid", "none"], dt = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], pt = ["auto", "forward", "reverse", "both"], ut = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], Nn = {
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
      previewLinearSpeed: "Preview (at 0 / 50% / 100% of peak):",
      threshold: "Threshold",
      medianP50: "Median (p50)",
      peak: "Peak",
      maxDuration: "Max duration (ms)",
      minDuration: "Min duration (ms)",
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
      peakValue: "Peak value",
      peakValueHelper: "Override domain default peak value for speed calculation",
      animMinMsPlaceholder: (t) => `Global default (${t} ms)`,
      animMaxMsPlaceholder: (t) => `Global default (${t} ms)`,
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
      smoothSpeed: "Smooth speed transitions",
      pauseWhenHidden: "Pause when tab hidden",
      animationSpeed: "Animation speed",
      slowestSpeed: "Slowest speed (ms)",
      fastestSpeed: "Fastest speed (ms)",
      slowestSpeedHelper: "Animation speed when sensor value is near zero",
      fastestSpeedHelper: "Animation speed at peak sensor value",
      peakAirflow: "Peak airflow",
      peakM3h: "m³/h",
      peakCfm: "CFM",
      peakOr: "or",
      domainPeakDefault: "Domain default peak"
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
    durationPositive: "must be a finite number > 0 (milliseconds)",
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
let Di = {};
function Je(t) {
  Di = t;
}
function Li(t) {
  const i = (t ?? "en").split("-")[0].toLowerCase();
  if (i === "en") {
    Je({});
    return;
  }
  const n = `/local/flowme/translations/${i}.json`;
  fetch(n).then((o) => o.ok ? o.json() : null).then((o) => {
    o && typeof o == "object" && Je(o);
  }).catch(() => {
    Je({});
  });
}
function c(t, ...e) {
  const i = t.split(".");
  let n = Di;
  for (const o of i)
    if (n && typeof n == "object")
      n = n[o];
    else {
      n = void 0;
      break;
    }
  if (n === void 0) {
    n = Nn;
    for (const o of i)
      if (n && typeof n == "object")
        n = n[o];
      else {
        n = void 0;
        break;
      }
  }
  return String(typeof n == "function" ? n(...e) : n ?? t);
}
const Bn = ["javascript:", "vbscript:", "data:", "file:"];
function Hi(t, e = "card_config") {
  const i = [], n = /* @__PURE__ */ new WeakSet(), o = (s, r) => {
    if (s != null) {
      if (typeof s == "string") {
        const l = s.trim().toLowerCase();
        for (const a of Bn)
          if (l.startsWith(a)) {
            i.push({ path: r, value: s, scheme: a });
            return;
          }
        return;
      }
      if (typeof s == "object" && !n.has(s)) {
        if (n.add(s), Array.isArray(s)) {
          for (let l = 0; l < s.length; l++) o(s[l], `${r}[${l}]`);
          return;
        }
        for (const [l, a] of Object.entries(s))
          o(a, `${r}.${l}`);
      }
    }
  };
  return o(t, e), i;
}
function En(t, e = "card_config") {
  const i = Hi(t, e);
  if (i.length === 0) return;
  const n = i[0];
  throw new Error(c("security.unsafeUrlInCard", n.scheme, n.path));
}
const Rn = "[FlowMe]";
let _t = !1;
function ie(t) {
  _t = t;
}
function Oi(t) {
  return !!(t && typeof t == "object" && t.debug === !0);
}
function C(...t) {
  _t && console.warn(Rn, ...t);
}
function Dn() {
  return _t;
}
class At extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Gt = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function w(t, e) {
  throw new At(`${t}: ${e}`);
}
function Ct(t, e) {
  (!t || typeof t != "object") && w(e, c("validation.mustBeObjectWithXY"));
  const i = t, n = i.x, o = i.y;
  (typeof n != "number" || !Number.isFinite(n)) && w(`${e}.x`, c("validation.mustBeFiniteNumber")), (typeof o != "number" || !Number.isFinite(o)) && w(`${e}.y`, c("validation.mustBeFiniteNumber"));
  const s = n, r = o;
  return (s < 0 || s > 100) && w(`${e}.x`, c("validation.percentRange", s)), (r < 0 || r > 100) && w(`${e}.y`, c("validation.percentRange", r)), { x: s, y: r };
}
function Wt(t, e) {
  (typeof t != "string" || !t.length) && w(e, c("validation.mustBeNonEmptyString"));
  const i = t;
  return Gt.some((o) => i.startsWith(o)) || w(e, c("validation.urlMustStartWith", Gt.join(", "), i.slice(0, 40))), i;
}
function Ln(t, e, i) {
  const n = `nodes[${e}]`;
  (!t || typeof t != "object") && w(n, c("validation.mustBeObject"));
  const o = t, s = o.id;
  (typeof s != "string" || !s.length) && w(`${n}.id`, c("validation.mustBeNonEmptyId"));
  const r = s;
  i.has(r) && w(`${n}.id`, c("validation.duplicateNodeId", r)), i.add(r);
  const l = Ct(o.position, `${n}.position`), a = { id: r, position: l };
  if (typeof o.entity == "string" && (a.entity = o.entity), typeof o.label == "string" && (a.label = o.label), typeof o.color == "string" && (a.color = o.color), typeof o.size == "number" && (a.size = o.size), typeof o.show_label == "boolean" && (a.show_label = o.show_label), typeof o.show_value == "boolean" && (a.show_value = o.show_value), o.opacity !== void 0 && (a.opacity = St(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, c("validation.mustBeBoolean")), a.visible = o.visible), o.node_effect !== void 0) {
    const d = o.node_effect;
    d && typeof d == "object" && d.type === "pulse" ? C(`${n}.node_effect: type "pulse" is no longer supported; removing node_effect`) : a.node_effect = Hn(d, `${n}.node_effect`);
  }
  return a;
}
function Hn(t, e) {
  (!t || typeof t != "object") && w(e, c("validation.mustBeObject"));
  const i = t, n = i.type;
  if (n === "glow")
    return {
      type: "glow",
      ...typeof i.glow_color == "string" ? { glow_color: i.glow_color } : {},
      ...typeof i.glow_max_radius == "number" ? { glow_max_radius: i.glow_max_radius } : {},
      ...typeof i.glow_min_intensity == "number" ? { glow_min_intensity: i.glow_min_intensity } : {},
      ...typeof i.peak_value == "number" ? { peak_value: i.peak_value } : {}
    };
  if (n === "badge")
    return {
      type: "badge",
      ...typeof i.badge_color_on == "string" ? { badge_color_on: i.badge_color_on } : {},
      ...typeof i.badge_color_off == "string" ? { badge_color_off: i.badge_color_off } : {},
      ...i.threshold === null ? { threshold: null } : typeof i.threshold == "number" ? { threshold: i.threshold } : {}
    };
  if (n === "ripple")
    return {
      type: "ripple",
      ...typeof i.ripple_color == "string" ? { ripple_color: i.ripple_color } : {},
      ...typeof i.ripple_duration == "number" ? { ripple_duration: i.ripple_duration } : {},
      ...typeof i.ripple_threshold == "number" ? { ripple_threshold: i.ripple_threshold } : {}
    };
  if (n === "alert") {
    const o = i.alert_condition;
    return o !== void 0 && o !== "above" && o !== "below" && w(`${e}.alert_condition`, c("validation.mustBeString")), {
      type: "alert",
      ...typeof i.alert_threshold == "number" ? { alert_threshold: i.alert_threshold } : {},
      ...o === "above" || o === "below" ? { alert_condition: o } : {},
      ...typeof i.alert_color == "string" ? { alert_color: i.alert_color } : {},
      ...typeof i.alert_frequency == "number" ? { alert_frequency: i.alert_frequency } : {},
      ...typeof i.alert_hysteresis == "number" ? { alert_hysteresis: i.alert_hysteresis } : {}
    };
  }
  w(`${e}.type`, c("validation.invalidNodeEffectType"));
}
function On(t, e, i, n) {
  const o = `flows[${e}]`;
  (!t || typeof t != "object") && w(o, c("validation.mustBeObject"));
  const s = t, r = s.id;
  (typeof r != "string" || !r.length) && w(`${o}.id`, c("validation.mustBeNonEmptyId"));
  const l = r;
  i.has(l) && w(`${o}.id`, c("validation.duplicateFlowId", l)), i.add(l);
  const a = s.from_node;
  (typeof a != "string" || !n.has(a)) && w(`${o}.from_node`, c("validation.unknownNodeRef", String(a)));
  const d = s.to_node;
  (typeof d != "string" || !n.has(d)) && w(`${o}.to_node`, c("validation.unknownNodeRef", String(d)));
  const p = s.entity;
  (typeof p != "string" || !p.length) && w(`${o}.entity`, c("validation.mustBeNonEmptyEntityId"));
  const h = s.waypoints;
  let u = [];
  h !== void 0 && (Array.isArray(h) || w(`${o}.waypoints`, c("validation.waypointsMustBeArray")), u = h.map(
    (g, b) => Ct(g, `${o}.waypoints[${b}]`)
  ));
  const f = {
    id: l,
    from_node: a,
    to_node: d,
    entity: p,
    waypoints: u
  };
  if (typeof s.domain == "string" && (Fe.includes(s.domain) || w(`${o}.domain`, c("validation.mustBeOneOf", Fe.join(", "))), f.domain = s.domain), typeof s.color == "string" && (f.color = s.color), typeof s.color_positive == "string" && (f.color_positive = s.color_positive), typeof s.color_negative == "string" && (f.color_negative = s.color_negative), typeof s.threshold == "number" && (f.threshold = s.threshold), s.peak_value !== void 0 && (f.peak_value = Y(s.peak_value, `${o}.peak_value`)), typeof s.reverse == "boolean" && (f.reverse = s.reverse), typeof s.speed_multiplier == "number") {
    const g = s.speed_multiplier;
    (g < 0.1 || g > 5) && w(`${o}.speed_multiplier`, c("validation.speedMultiplierRange")), f.speed_multiplier = g;
  }
  return s.opacity !== void 0 && (f.opacity = St(s.opacity, `${o}.opacity`)), s.visible !== void 0 && (typeof s.visible != "boolean" && w(`${o}.visible`, c("validation.mustBeBoolean")), f.visible = s.visible), s.line_style !== void 0 && (lt.includes(s.line_style) || w(`${o}.line_style`, c("validation.mustBeOneOf", lt.join(", "))), f.line_style = s.line_style), s.speed_curve_override !== void 0 && (f.speed_curve_override = zn(
    s.speed_curve_override,
    `${o}.speed_curve_override`
  )), s.animation !== void 0 && (f.animation = Wn(s.animation, `${o}.animation`)), s.value_gradient !== void 0 && (f.value_gradient = Un(s.value_gradient, `${o}.value_gradient`)), f;
}
function zn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t, n = {};
  function o(u) {
    const f = i[u];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${e}.${u}`, c("validation.positiveFinite")), f;
  }
  function s(u) {
    const f = i[u];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${e}.${u}`, c("validation.durationPositive")), f;
  }
  const r = o("threshold");
  r !== void 0 && (n.threshold = r);
  const l = o("p50");
  l !== void 0 && (n.p50 = l);
  const a = o("peak");
  a !== void 0 && (n.peak = a);
  const d = s("max_duration");
  d !== void 0 && (n.max_duration = d);
  const p = s("min_duration");
  if (p !== void 0 && (n.min_duration = p), i.steepness !== void 0) {
    const u = i.steepness;
    (typeof u != "number" || !Number.isFinite(u) || u <= 0) && w(`${e}.steepness`, c("validation.positiveFinite")), n.steepness = u;
  }
  n.max_duration !== void 0 && n.min_duration !== void 0 && n.min_duration >= n.max_duration && w(e, c("validation.minLtMaxDuration"));
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
  return n;
}
function Y(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t <= 0) && w(e, c("validation.positiveFinite")), t;
}
function Tn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("defaults", c("validation.defaultsMustBeObject"));
  const e = t, i = {};
  if (e.node_radius !== void 0 && (i.node_radius = Y(e.node_radius, "defaults.node_radius")), e.burst_trigger_ratio !== void 0) {
    const n = Y(e.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    n > 1 && w("defaults.burst_trigger_ratio", c("validation.burstTriggerMax1")), i.burst_trigger_ratio = n;
  }
  return e.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = Y(e.burst_sustain_ms, "defaults.burst_sustain_ms")), e.burst_max_particles !== void 0 && (i.burst_max_particles = Y(e.burst_max_particles, "defaults.burst_max_particles")), e.dot_radius !== void 0 && (i.dot_radius = Y(e.dot_radius, "defaults.dot_radius")), e.line_width !== void 0 && (i.line_width = Y(e.line_width, "defaults.line_width")), e.peak_value !== void 0 && (i.peak_value = Y(e.peak_value, "defaults.peak_value")), i;
}
function St(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t < 0 || t > 1) && w(e, c("validation.opacity01")), t;
}
function Gn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("opacity", c("validation.mustBeObject"));
  const e = t, i = {};
  for (const n of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    e[n] !== void 0 && (i[n] = St(e[n], `opacity.${n}`));
  return i;
}
function Wn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t, n = {};
  if (i.animation_style !== void 0) {
    let m = i.animation_style;
    (m === "pulse" || m === "spark") && (C(`${e}.animation_style '${String(m)}' was removed in v1.23.6 — using 'dots'`), m = "dots"), ct.includes(m) || w(`${e}.animation_style`, c("validation.mustBeOneOf", ct.join(", "))), n.animation_style = m;
  }
  i.particle_shape !== void 0 && (dt.includes(i.particle_shape) || w(`${e}.particle_shape`, c("validation.mustBeOneOf", dt.join(", "))), n.particle_shape = i.particle_shape), i.direction !== void 0 && (pt.includes(i.direction) || w(`${e}.direction`, c("validation.mustBeOneOf", pt.join(", "))), n.direction = i.direction), i.particle_spacing !== void 0 && (ut.includes(i.particle_spacing) || w(`${e}.particle_spacing`, c("validation.mustBeOneOf", ut.join(", "))), n.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && w(`${e}.custom_svg_path`, c("validation.mustBeSvgPathString")), i.custom_svg_path.length === 0 && C(`${e}.custom_svg_path is empty — will fall back to circle`), n.custom_svg_path = i.custom_svg_path);
  const o = (m, $) => {
    const x = i[m];
    if (x !== void 0)
      return (typeof x != "number" || !Number.isFinite(x) || x <= 0) && w(`${e}.${m}`, c("validation.positiveFinite")), $ !== void 0 && x > $ && w(`${e}.${m}`, c("validation.mustBeAtMost", $)), x;
  }, s = (m) => {
    const $ = i[m];
    if ($ !== void 0)
      return typeof $ != "boolean" && w(`${e}.${m}`, c("validation.mustBeBoolean")), $;
  }, r = o("particle_size");
  if (r !== void 0 && (n.particle_size = r), i.particle_count !== void 0) {
    const m = i.particle_count;
    (typeof m != "number" || !Number.isFinite(m) || m < 1 || !Number.isInteger(m)) && w(`${e}.particle_count`, c("validation.particleCountInt")), n.particle_count = m;
  }
  if (i.glow_intensity !== void 0) {
    const m = i.glow_intensity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0) && w(`${e}.glow_intensity`, c("validation.glowNonNegative")), n.glow_intensity = m;
  }
  const l = s("shimmer");
  l !== void 0 && (n.shimmer = l);
  const a = s("flicker");
  a !== void 0 && (n.flicker = a);
  const d = o("trail_length");
  if (d !== void 0 && (n.trail_length = d), i.dash_gap !== void 0) {
    const m = i.dash_gap;
    (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 10) && w(`${e}.dash_gap`, c("validation.dashGapRange")), n.dash_gap = m;
  }
  const p = o("cluster_size");
  p !== void 0 && (n.cluster_size = Math.max(1, Math.round(p)));
  const h = o("cluster_gap");
  h !== void 0 && (n.cluster_gap = h);
  const u = o("pulse_frequency", 20);
  if (u !== void 0 && (n.pulse_frequency = u), i.pulse_ratio !== void 0) {
    const m = i.pulse_ratio;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m >= 1) && w(`${e}.pulse_ratio`, c("validation.pulseRatioRange")), n.pulse_ratio = m;
  }
  const f = o("wave_frequency", 20);
  f !== void 0 && (n.wave_frequency = f);
  const g = o("wave_amplitude");
  g !== void 0 && (n.wave_amplitude = g);
  let b, v;
  if (i.min_duration !== void 0) {
    const m = i.min_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && w(`${e}.min_duration`, c("validation.durationPositive")), m > 6e4 && w(`${e}.min_duration`, c("validation.mustBeAtMost", 6e4)), b = m, n.min_duration = b;
  }
  if (i.max_duration !== void 0) {
    const m = i.max_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && w(`${e}.max_duration`, c("validation.durationPositive")), m > 6e4 && w(`${e}.max_duration`, c("validation.mustBeAtMost", 6e4)), v = m, n.max_duration = v;
  }
  return b !== void 0 && v !== void 0 && b >= v && (C(`${e}: min_duration >= max_duration — dropping both`), delete n.min_duration, delete n.max_duration), n;
}
function Ut(t, e) {
  return (typeof t != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) && w(e, c("validation.mustBeHexColor")), t;
}
function Un(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t;
  typeof i.entity != "string" && w(`${e}.entity`, c("validation.mustBeStringEntityId")), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && w(`${e}.low_value`, c("validation.finiteNumber")), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && w(`${e}.high_value`, c("validation.finiteNumber")), i.low_value >= i.high_value && C(`${e}: low_value should be less than high_value`);
  const n = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: Ut(i.low_color, `${e}.low_color`),
    high_color: Ut(i.high_color, `${e}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || w(`${e}.mode`, c("validation.gradientMode")), n.mode = i.mode), n;
}
function Kn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("animation", c("validation.animationRootMustBeObject"));
  const e = t, i = {};
  if (e.fps !== void 0) {
    const s = e.fps;
    (typeof s != "number" || !Number.isFinite(s) || s < 1 || s > 120) && w("animation.fps", c("validation.fpsRange")), i.fps = s;
  }
  e.smooth_speed !== void 0 && (typeof e.smooth_speed != "boolean" && w("animation.smooth_speed", c("validation.mustBeBoolean")), i.smooth_speed = e.smooth_speed);
  let n, o;
  if (e.min_duration !== void 0) {
    const s = e.min_duration;
    (typeof s != "number" || !Number.isFinite(s) || s <= 0) && w("animation.min_duration", c("validation.durationPositive")), s > 6e4 && w("animation.min_duration", c("validation.mustBeAtMost", 6e4)), n = s, i.min_duration = n;
  }
  if (e.max_duration !== void 0) {
    const s = e.max_duration;
    (typeof s != "number" || !Number.isFinite(s) || s <= 0) && w("animation.max_duration", c("validation.durationPositive")), s > 6e4 && w("animation.max_duration", c("validation.mustBeAtMost", 6e4)), o = s, i.max_duration = o;
  }
  return n !== void 0 && o !== void 0 && n >= o && (C("animation: min_duration >= max_duration — resetting to defaults (500 / 10000 ms)"), delete i.min_duration, delete i.max_duration), i;
}
function jn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("visibility", c("validation.visibilityRootMustBeObject"));
  const e = t, i = {};
  for (const n of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    e[n] !== void 0 && (typeof e[n] != "boolean" && w(`visibility.${n}`, c("validation.mustBeBoolean")), i[n] = e[n]);
  return i;
}
function Vn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("domain_colors", c("validation.domainColorsRootMustBeObject"));
  const e = t, i = {};
  for (const n of ["solar", "grid", "battery", "load"])
    e[n] !== void 0 && (typeof e[n] != "string" && w(`domain_colors.${n}`, c("validation.stringColourValue")), i[n] = e[n]);
  return i;
}
function ye(t) {
  if (!t || typeof t != "object") throw new At(c("validation.configMustBeObject"));
  const e = t;
  e.type !== "custom:flowme-card" && w("type", c("validation.typeMustBeFlowme", String(e.type)));
  const i = e.domain;
  let n = "energy";
  typeof i == "string" && Fe.includes(i) && (n = i);
  const o = e.background;
  o !== void 0 && (o === null || typeof o != "object") && w("background", c("validation.backgroundWhenProvided"));
  const s = o ?? {}, l = { default: s.default === void 0 || s.default === "" ? "" : Wt(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && w("background.weather_entity", c("validation.mustBeStringEntityId")), l.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && w("background.weather_states", c("validation.weatherStatesMapping"));
    const b = Object.entries(s.weather_states), v = {};
    for (const [m, $] of b)
      v[m] = Wt($, `background.weather_states.${m}`);
    l.weather_states = v;
  }
  s.sun_entity !== void 0 && (typeof s.sun_entity != "string" && w("background.sun_entity", c("validation.sunEntityExample")), l.sun_entity = s.sun_entity), s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && w("background.transition_duration", c("validation.transitionMustBeNumberMs")), l.transition_duration = s.transition_duration);
  const a = e.nodes;
  Array.isArray(a) || w("nodes", c("validation.nodesMustBeArray"));
  const d = /* @__PURE__ */ new Set(), p = a.map((b, v) => Ln(b, v, d));
  p.length === 0 && w("nodes", c("validation.atLeastOneNode"));
  const h = e.flows;
  Array.isArray(h) || w("flows", c("validation.flowsMustBeArray"));
  const u = /* @__PURE__ */ new Set(), f = h.map(
    (b, v) => On(b, v, u, d)
  ), g = {
    type: "custom:flowme-card",
    domain: n,
    background: l,
    nodes: p,
    flows: f
  };
  if (e.aspect_ratio !== void 0 && ((typeof e.aspect_ratio != "string" || !/^\d+:\d+$/.test(e.aspect_ratio)) && w("aspect_ratio", c("validation.aspectRatioRegex")), g.aspect_ratio = e.aspect_ratio), e.fullscreen !== void 0 && (typeof e.fullscreen != "boolean" && w("fullscreen", c("validation.mustBeBoolean")), g.fullscreen = e.fullscreen), e.edit_mode_password !== void 0 && (typeof e.edit_mode_password != "string" && w("edit_mode_password", c("validation.editPasswordMustBeString")), g.edit_mode_password = e.edit_mode_password), e.pause_when_hidden !== void 0 && (typeof e.pause_when_hidden != "boolean" && w("pause_when_hidden", c("validation.mustBeBoolean")), g.pause_when_hidden = e.pause_when_hidden), e.overlays !== void 0) {
    Array.isArray(e.overlays) || w("overlays", c("validation.overlaysMustBeArray"));
    const b = /* @__PURE__ */ new Set();
    g.overlays = e.overlays.map(
      (v, m) => Yn(v, m, b)
    );
  }
  return e.defaults !== void 0 && (g.defaults = Tn(e.defaults)), e.domain_colors !== void 0 && (g.domain_colors = Vn(e.domain_colors)), e.debug !== void 0 && (typeof e.debug != "boolean" && w("debug", c("validation.mustBeBoolean")), g.debug = e.debug), e.opacity !== void 0 && (g.opacity = Gn(e.opacity)), e.visibility !== void 0 && (g.visibility = jn(e.visibility)), e.animation !== void 0 && (g.animation = Kn(e.animation)), g;
}
function Yn(t, e, i) {
  const n = `overlays[${e}]`;
  (!t || typeof t != "object") && w(n, c("validation.mustBeObject"));
  const o = t, s = o.type, l = typeof s == "string" && ["camera", "switch", "sensor", "button"].includes(s);
  !l && s !== "custom" && w(`${n}.type`, c("validation.overlayTypeMustBeCustom"));
  const a = o.id;
  (typeof a != "string" || !a.length) && w(`${n}.id`, c("validation.mustBeNonEmptyId")), i.has(a) && w(`${n}.id`, c("validation.duplicateOverlayId", a)), i.add(a);
  const d = Ct(o.position, `${n}.position`);
  if (l) {
    const g = c("validation.migrationOverlayWarning", s);
    C(`${n}: ${g}`);
    const b = {
      id: a,
      type: "custom",
      position: d,
      card: { type: "markdown", content: "" },
      _migration_warning: g
    };
    if (o.size !== void 0) {
      const v = o.size;
      if (v && typeof v == "object") {
        const m = v, $ = m.width, x = m.height;
        typeof $ == "number" && typeof x == "number" && (b.size = { width: $, height: x });
      }
    }
    return b;
  }
  const p = o.card;
  (!p || typeof p != "object" || Array.isArray(p)) && w(`${n}.card`, c("validation.overlayCardMustBeObject"));
  const h = Hi(p, `${n}.card`);
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
  if (o.size !== void 0) {
    const g = o.size;
    (!g || typeof g != "object") && w(`${n}.size`, c("validation.overlaySizeMustBeObject"));
    const b = g, v = b.width, m = b.height;
    (typeof v != "number" || !Number.isFinite(v) || v <= 0 || v > 100) && w(`${n}.size.width`, c("validation.overlayWidthPercent")), (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m > 100) && w(`${n}.size.height`, c("validation.overlayHeightPercent")), f.size = { width: v, height: m };
  }
  if (o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, c("validation.mustBeBoolean")), f.visible = o.visible), o.opacity !== void 0) {
    const g = o.opacity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 1) && w(`${n}.opacity`, c("validation.overlayOpacity01")), f.opacity = g;
  }
  return f;
}
const Ve = {
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
function Zn(t) {
  const e = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(e)) return "solar";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(e)) return "grid";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(e)) return "battery";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(e)) return "load";
}
function Kt(t, e) {
  const i = t.toLowerCase();
  for (const n of e.roles)
    for (const o of n.patterns)
      if (o && i.includes(o)) return n.key;
}
function jt(t, e) {
  const i = t.roles[0];
  if (!i) return "#FFFFFF";
  const n = e?.[i.key];
  return ((typeof n == "string" && n.trim() !== "" ? n.trim() : void 0) ?? i.default) || "#FFFFFF";
}
function Vt(t, e) {
  const i = e?.[t.key];
  return ((typeof i == "string" && i.trim() !== "" ? i.trim() : void 0) ?? t.default) || "#FFFFFF";
}
function Xn(t, e, i, n) {
  if (t === void 0) {
    C("colour resolution:", e, "domain:", "undefined", "matched role:", "none", "resolved:", void 0);
    return;
  }
  const o = t, s = Ve[o] ?? Ve.generic;
  let r;
  if (o === "energy") {
    if (r = Zn(e), !r) {
      C("colour resolution:", e, "domain:", o, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (o === "generic") {
    if (r = Kt(e, s), !r) {
      const d = Math.abs(n ?? 0) % s.roles.length, p = s.roles[d], h = Vt(p, i);
      return C("colour resolution:", e, "domain:", o, "matched role:", "none (by index)", "resolved:", h), h;
    }
  } else if (r = Kt(e, s), !r) {
    const d = jt(s, i);
    return C("colour resolution:", e, "domain:", o, "matched role:", "first", "resolved:", d), d;
  }
  const l = s.roles.find((d) => d.key === r);
  if (!l)
    return jt(s, i);
  const a = Vt(l, i);
  return C("colour resolution:", e, "domain:", o, "matched role:", r, "resolved:", a), a;
}
const qn = {
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
  peak: 5e3,
  burst_density_multiplier: 1.5,
  describe(t) {
    return Math.abs(t) >= 1e3 ? `${(t / 1e3).toFixed(2)} kW` : `${Math.round(t)} W`;
  }
}, Jn = {
  domain: "water",
  default_color_positive: "#3B82F6",
  default_color_negative: "#F472B6",
  shape: "dot",
  glow: !0,
  unit_label: "L/min",
  unit_scale: {
    "L/min": 1,
    "l/min": 1,
    L: 1,
    l: 1,
    "m³/h": 1 / 60,
    "m3/h": 1 / 60
  },
  peak: 25,
  burst_density_multiplier: 1.5,
  describe(t) {
    return `${t.toFixed(1)} L/min`;
  }
}, Qn = {
  domain: "network",
  default_color_positive: "#22C55E",
  default_color_negative: "#F87171",
  shape: "dot",
  glow: !0,
  unit_label: "Mbps",
  unit_scale: {
    Mbps: 1,
    MBps: 8,
    "Mbit/s": 1,
    "Mibit/s": 1,
    Gbps: 1e3,
    "Gbit/s": 1e3,
    Kbps: 1e-3,
    "Kbit/s": 1e-3,
    bps: 1e-6
  },
  peak: 100,
  burst_density_multiplier: 1.5,
  particle_count_curve: (t) => {
    const e = Math.abs(t);
    return e < 0.1 ? 1 : e < 1 ? 2 : e < 5 ? 3 : e < 20 ? 4 : e < 100 ? 5 : 6;
  },
  describe(t) {
    const e = Math.abs(t);
    return e >= 1e3 ? `${(t / 1e3).toFixed(2)} Gbps` : e >= 1 ? `${t.toFixed(1)} Mbps` : `${(t * 1e3).toFixed(0)} Kbps`;
  }
};
function zi(t, e = 2e3) {
  return new Promise((i) => {
    let n = 0, o = 0, s = 0;
    const r = 2;
    let l = !1;
    const a = { id: void 0 }, d = (h) => {
      l || (l = !0, a.id !== void 0 && window.clearTimeout(a.id), p.disconnect(), i(h));
    }, p = new ResizeObserver((h) => {
      const u = h[0];
      if (!u) return;
      const { width: f, height: g } = u.contentRect;
      f === n && g === o && f > 0 && g > 0 ? (s++, s >= r && d(u.contentRect)) : (s = 0, n = f, o = g);
    });
    p.observe(t), a.id = window.setTimeout(() => {
      d(t.getBoundingClientRect());
    }, e);
  });
}
function Ti(t) {
  return new Promise((e) => {
    const i = new ResizeObserver((o) => {
      const s = o[0];
      if (!s) return;
      const { width: r, height: l } = s.contentRect;
      r > 0 && l > 0 && (i.disconnect(), e());
    });
    i.observe(t);
    const n = t.getBoundingClientRect();
    n.width > 0 && n.height > 0 && (i.disconnect(), e());
  });
}
function eo(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
function Yt(t, e, i) {
  return t + (e - t) * i;
}
function Pe(t, e) {
  return { x: t.x / 100 * e.width, y: t.y / 100 * e.height };
}
function ve(t, e, i) {
  if (t.length === 0) return "";
  if (t.length === 1) {
    const l = Pe(t[0], e);
    return `M ${l.x.toFixed(2)} ${l.y.toFixed(2)}`;
  }
  const n = t.map((l) => Pe(l, e));
  if (i === "diagonal") {
    const l = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let a = 1; a < n.length; a++)
      l.push(`L ${n[a].x.toFixed(2)} ${n[a].y.toFixed(2)}`);
    return l.join(" ");
  }
  if (i === "corner") {
    const l = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let a = 1; a < n.length; a++) {
      const d = n[a - 1], p = n[a];
      l.push(`L ${p.x.toFixed(2)} ${d.y.toFixed(2)}`), l.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    }
    return l.join(" ");
  }
  if (i === "curve") {
    const l = n.length, a = [
      { x: 2 * n[0].x - n[1].x, y: 2 * n[0].y - n[1].y },
      ...n,
      { x: 2 * n[l - 1].x - n[l - 2].x, y: 2 * n[l - 1].y - n[l - 2].y }
    ], d = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let p = 1; p < l; p++) {
      const h = a[p - 1], u = a[p], f = a[p + 1], g = a[p + 2], b = u.x + (f.x - h.x) / 6, v = u.y + (f.y - h.y) / 6, m = f.x - (g.x - u.x) / 6, $ = f.y - (g.y - u.y) / 6;
      d.push(`C ${b.toFixed(2)} ${v.toFixed(2)} ${m.toFixed(2)} ${$.toFixed(2)} ${f.x.toFixed(2)} ${f.y.toFixed(2)}`);
    }
    return d.join(" ");
  }
  const o = 0.3, s = 20, r = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
  for (let l = 1; l < n.length; l++) {
    const a = n[l - 1], d = n[l], p = n[l + 1];
    if (!p) {
      r.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
      continue;
    }
    const h = Math.sqrt((d.x - a.x) ** 2 + (d.y - a.y) ** 2), u = Math.sqrt((p.x - d.x) ** 2 + (p.y - d.y) ** 2), f = Math.min(Math.min(h, u) * o, s), g = f / (h || 1), b = d.x - (d.x - a.x) * g, v = d.y - (d.y - a.y) * g, m = f / (u || 1), $ = d.x + (p.x - d.x) * m, x = d.y + (p.y - d.y) * m;
    r.push(`L ${b.toFixed(2)} ${v.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${$.toFixed(2)} ${x.toFixed(2)}`);
  }
  return r.join(" ");
}
function we(t) {
  if (t == null) return 0;
  if (typeof t == "number") return Number.isFinite(t) ? t : 0;
  const e = t.trim();
  if (!e || e === "unavailable" || e === "unknown") return 0;
  const i = Number.parseFloat(e);
  return Number.isFinite(i) ? i : 0;
}
const Ce = 1e4, le = 500;
function It(t, e, i, n) {
  const o = Math.min(i, n), s = Math.max(i, n);
  if (!(Number.isFinite(o) && Number.isFinite(s)) || s <= 0 || o <= 0)
    return Math.max(50, le);
  if (!(e > 0) || !Number.isFinite(e))
    return s;
  const r = Math.min(1, Math.abs(t) / e);
  if (r < 1e-3)
    return s;
  const l = s - r * (s - o);
  return !Number.isFinite(l) || l <= 0 ? o : Math.min(Math.max(l, o), s);
}
function Me(t, e, i) {
  const n = t.speed_curve_override ?? {}, o = i?.animation, s = i?.defaults, r = typeof t.peak_value == "number" && t.peak_value > 0 ? t.peak_value : void 0, l = typeof n.peak == "number" && n.peak > 0 ? n.peak : void 0, a = typeof s?.peak_value == "number" && s.peak_value > 0 ? s.peak_value : void 0, d = e.peak > 0 ? e.peak : 1, p = r ?? l ?? a ?? d;
  let h = t.animation?.min_duration ?? n.min_duration ?? o?.min_duration ?? le, u = t.animation?.max_duration ?? n.max_duration ?? o?.max_duration ?? Ce;
  return (!(h > 0) || !(u > h) || u > 6e4) && (h = le, u = Ce), u = Math.min(u, 6e4), h >= u && (h = le, u = Ce), { peak: p, minDur: h, maxDur: u };
}
function Zt(t, e, i) {
  if (!i || !e) return { value: t, factor: 1 };
  const n = e.trim();
  if (!n) return { value: t, factor: 1 };
  if (Object.prototype.hasOwnProperty.call(i, n)) {
    const r = i[n] ?? 1;
    return { value: t * r, factor: r, matchedUnit: n };
  }
  const o = n.toLowerCase(), s = Object.entries(i).filter(
    ([r]) => r.toLowerCase() === o
  );
  if (s.length === 1) {
    const [r, l] = s[0];
    return { value: t * l, factor: l, matchedUnit: r };
  }
  return { value: t, factor: 1 };
}
function Gi(t, e) {
  let i = null, n = null;
  const o = (...s) => {
    n = s, i !== null && clearTimeout(i), i = setTimeout(() => {
      i = null, n && t(...n), n = null;
    }, e);
  };
  return o.cancel = () => {
    i !== null && (clearTimeout(i), i = null), n = null;
  }, o;
}
function to(t, e, i, n) {
  if (!i) return n;
  const o = e === "below_horizon";
  let s = t;
  o && !t.endsWith("-night") && (s = `${t}-night`);
  const r = i[s];
  if (r) return r;
  if (o && s !== "clear-night") {
    const l = i["clear-night"];
    if (l) return l;
  }
  if (s !== t) {
    const l = i[t];
    if (l) return l;
  }
  return n;
}
function Qe(t) {
  if (!t) return;
  const e = /^(\d+):(\d+)$/.exec(t);
  if (!e) return;
  const i = Number.parseInt(e[1], 10), n = Number.parseInt(e[2], 10);
  if (!(!i || !n))
    return i / n;
}
function Xt(t) {
  const e = t.replace("#", ""), i = e.length === 3 ? e.split("").map((o) => o + o).join("") : e, n = parseInt(i, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function qt(t, e, i) {
  const n = t / 255, o = e / 255, s = i / 255, r = Math.max(n, o, s), l = Math.min(n, o, s), a = (r + l) / 2;
  if (r === l) return [0, 0, a];
  const d = r - l, p = a > 0.5 ? d / (2 - r - l) : d / (r + l);
  let h;
  return r === n ? h = (o - s) / d + (o < s ? 6 : 0) : r === o ? h = (s - n) / d + 2 : h = (n - o) / d + 4, [h * 60, p, a];
}
function et(t, e, i) {
  let n = i;
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function io(t, e, i) {
  const n = t / 360;
  let o, s, r;
  if (e === 0)
    o = s = r = i;
  else {
    const a = i < 0.5 ? i * (1 + e) : i + e - i * e, d = 2 * i - a;
    o = et(d, a, n + 1 / 3), s = et(d, a, n), r = et(d, a, n - 1 / 3);
  }
  const l = (a) => Math.round(a * 255).toString(16).padStart(2, "0");
  return `#${l(o)}${l(s)}${l(r)}`;
}
function Wi(t, e) {
  const i = e.high_value - e.low_value, n = i === 0 ? 0 : Math.max(0, Math.min(1, (t - e.low_value) / i)), [o, s, r] = Xt(e.low_color), [l, a, d] = Xt(e.high_color), [p, h, u] = qt(o, s, r), [f, g, b] = qt(l, a, d);
  let v = f - p;
  v > 180 && (v -= 360), v < -180 && (v += 360);
  const m = (p + v * n + 360) % 360, $ = Yt(h, g, n), x = Yt(u, b, n);
  return io(m, $, x);
}
function Ui() {
  try {
    return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
const no = {
  domain: "hvac",
  default_color_positive: "#A78BFA",
  default_color_negative: "#60A5FA",
  shape: "wave",
  glow: !1,
  unit_label: "m³/h",
  unit_scale: {
    "m³/h": 1,
    "m3/h": 1,
    CFM: 1.699,
    cfm: 1.699
  },
  peak: 600,
  burst_density_multiplier: 1.5,
  wave_amplitude_curve(t) {
    const e = Math.abs(t);
    return eo(2 + e / 60, 2, 10);
  },
  describe(t) {
    return `${Math.round(t)} m³/h`;
  }
}, oo = {
  domain: "gas",
  default_color_positive: "#FBBF24",
  default_color_negative: "#F97316",
  shape: "dot",
  glow: !0,
  unit_label: "m³/h",
  unit_scale: {
    "m³/h": 1,
    "m3/h": 1
  },
  peak: 5,
  burst_density_multiplier: 1.5,
  describe(t) {
    return `${t.toFixed(2)} m³/h`;
  }
}, Ki = {
  domain: "generic",
  default_color_positive: "#A78BFA",
  default_color_negative: "#34D399",
  shape: "dot",
  glow: !1,
  unit_label: "",
  peak: 100,
  burst_density_multiplier: 1.5,
  describe(t) {
    return Math.abs(t) >= 100 ? t.toFixed(0) : Math.abs(t) >= 10 ? t.toFixed(1) : t.toFixed(2);
  }
}, Jt = {
  energy: qn,
  water: Jn,
  network: Qn,
  hvac: no,
  gas: oo,
  generic: Ki
};
function T(t) {
  return t && t in Jt ? Jt[t] : Ki;
}
const ji = "#CCCCCC", so = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
function ht(t) {
  return typeof t == "string" && so.test(t.trim()) ? t.trim() : "#FFFFFF";
}
function tt(t) {
  return typeof t == "string" && t.trim() !== "" ? t.trim() : void 0;
}
function pe(t, e, i, n, o, s) {
  const r = tt(t.color), l = Xn(i, t.id, o, s), a = r ?? l;
  let d;
  return n >= 0 ? d = tt(t.color_positive) ?? a ?? e.default_color_positive : d = tt(t.color_negative) ?? a ?? e.default_color_negative, ht(d);
}
function ro(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}
function Qt() {
  return {
    currentDurMs: /* @__PURE__ */ new Map(),
    interpFromMs: /* @__PURE__ */ new Map(),
    interpTargetMs: /* @__PURE__ */ new Map(),
    interpStartMs: /* @__PURE__ */ new Map()
  };
}
function it(t, e) {
  e.interpFromMs.delete(t), e.interpTargetMs.delete(t), e.interpStartMs.delete(t);
}
const ao = 50, lo = 500;
function co(t, e, i, n, o) {
  if (!i)
    return o.currentDurMs.set(t, e), it(t, o), e;
  const s = o.currentDurMs.get(t) ?? e;
  if (Math.abs(e - s) < ao)
    return o.currentDurMs.set(t, e), it(t, o), e;
  o.interpTargetMs.get(t) !== e && (o.interpFromMs.set(t, s), o.interpTargetMs.set(t, e), o.interpStartMs.set(t, n));
  const l = o.interpFromMs.get(t) ?? e, a = o.interpTargetMs.get(t) ?? e, d = o.interpStartMs.get(t) ?? n, p = n - d, h = Math.min(p / lo, 1), u = ro(h), f = l + (a - l) * u;
  return o.currentDurMs.set(t, f), h >= 1 ? (o.currentDurMs.set(t, a), it(t, o), a) : f;
}
const po = "[FlowMe Renderer]";
function se(...t) {
  C(po, ...t);
}
const P = "http://www.w3.org/2000/svg", K = "http://www.w3.org/1999/xlink";
function uo() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const ho = uo(), fo = 2e3, Re = 3, ei = 5, nt = 2, go = 0.9, mo = 5e3, De = 20, bo = 0.2, Le = 0.3;
function yo(t) {
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
function vo(t) {
  return [
    `M 0,${-t * 2.2}`,
    `C ${t * 1.1},${-t * 1.2} ${t * 1.3},${-t * 0.2} ${t * 1.3},${t * 0.5}`,
    `C ${t * 1.3},${t * 1.4} ${t * 0.7},${t * 2} 0,${t * 2}`,
    `C ${-t * 0.7},${t * 2} ${-t * 1.3},${t * 1.4} ${-t * 1.3},${t * 0.5}`,
    `C ${-t * 1.3},${-t * 0.2} ${-t * 1.1},${-t * 1.2} 0,${-t * 2.2}`,
    "Z"
  ].join(" ");
}
const wo = [8, 16, 24, 32], xo = [0.9, 0.75, 0.6, 0.4], $o = [0.8, 0.55, 0.35, 0.15];
class Ge {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Gi(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.durInterp = Qt(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptivePassAt = 0, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0, this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1, this.flowPathSyncedDirection = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.svg && this.destroy(), se("init:", e.getBoundingClientRect(), "flows:", i.flows.length), se("init start dims:", e.offsetWidth, e.offsetHeight), this.container = e, this.config = i, this.prefersReducedMotionFlag = Ui(), this.flowsById = new Map(i.flows.map((s) => [s.id, s]));
    const n = document.createElementNS(P, "svg");
    n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("preserveAspectRatio", "none"), n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", n.style.overflow = "visible", this.svg = n, e.appendChild(n), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(e), this.startFpsLoop();
    const o = await zi(e);
    (o.width === 0 || o.height === 0) && await Ti(e), se("stable dims:", e.offsetWidth, e.offsetHeight), this.onResize(), se("post-resize dims:", e.offsetWidth, e.offsetHeight);
  }
  /** Same flow ids as at init — refresh paths and particle layout without destroy/init. */
  applyConfig(e) {
    if (this.svg) {
      this.config = e, this.flowsById = new Map(e.flows.map((i) => [i.id, i])), this.onResize();
      for (const i of e.flows) {
        const n = this.latestValues.get(i.id) ?? 0;
        this.applyFlow(i.id, n);
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
    this.rafHandle !== null && (cancelAnimationFrame(this.rafHandle), this.rafHandle = null);
    const i = 1e3 / (this.config?.animation?.fps ?? 60), n = (o) => {
      if (!this.svg) return;
      const s = o - this.lastFrameTime;
      if (this.sampleFrameTime(), this.runAdaptivePassIfDue(o), s >= i) {
        this.lastFrameTime = o - s % i;
        const r = this.config?.animation?.smooth_speed !== !1, l = this.durInterp.interpStartMs.size > 0;
        r && (l || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(o), this.updateTimeBasedSpacing(o);
      }
      this.rafHandle = requestAnimationFrame(n);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(n);
  }
  pause() {
    if (!this.svg) return;
    const e = this.svg;
    if (typeof e.pauseAnimations == "function")
      e.pauseAnimations();
    else
      for (const i of this.svg.querySelectorAll("animateMotion, animate, animateTransform")) {
        const n = i;
        typeof n.pauseAnimations == "function" && n.pauseAnimations();
      }
    this.rafHandle !== null && (cancelAnimationFrame(this.rafHandle), this.rafHandle = null);
  }
  resume() {
    if (!this.svg) return;
    const e = this.svg;
    if (typeof e.unpauseAnimations == "function")
      e.unpauseAnimations();
    else
      for (const i of this.svg.querySelectorAll("animateMotion, animate, animateTransform")) {
        const n = i;
        typeof n.unpauseAnimations == "function" && n.unpauseAnimations();
      }
    this.rafHandle === null && this.startFpsLoop();
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.durInterp = Qt(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.frameTimeSamples.length = 0, this.lastAdaptivePassAt = 0, this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear(), this.flowPathSyncedDirection.clear();
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
    const n = e.animation?.direction ?? "auto";
    return n === "both" || n === "forward" ? 1 : n === "reverse" ? -1 : i >= 0 ? 1 : -1;
  }
  /** Second path in defs for `direction: both` — opposite waypoint order. */
  ensurePathRev(e) {
    if (e.pathRev || !this.svg) return;
    const i = this.svg.querySelector("defs");
    if (!i) return;
    const n = document.createElementNS(P, "path");
    n.setAttribute("id", `${e.pathId}-rev`), n.setAttribute("fill", "none"), i.appendChild(n), e.pathRev = n, e.pathRevId = `${e.pathId}-rev`;
  }
  /**
   * Keep motion path geometry aligned with travel direction so `rotate="auto"` matches flow.
   * Reverse waypoint order when direction &lt; 0 (single-stream); `both` uses forward + reversed paths.
   */
  syncFlowPathGeometry(e, i, n) {
    if (!this.config) return;
    const o = this.containerSize(), s = new Map(this.config.nodes.map((u) => [u.id, u])), r = s.get(e.from_node), l = s.get(e.to_node);
    if (!r || !l) return;
    const a = [r.position, ...e.waypoints, l.position], d = [l.position, ...e.waypoints.slice().reverse(), r.position], p = e.line_style ?? "corner";
    if ((e.animation?.direction ?? "auto") === "both") {
      this.ensurePathRev(i);
      const u = ve(a, o, p), f = ve(d, o, p);
      i.path.setAttribute("d", u), i.pathRev && i.pathRev.setAttribute("d", f);
    } else {
      i.pathRev && (i.pathRev.remove(), i.pathRev = void 0, i.pathRevId = void 0);
      const u = n >= 0 ? a : d;
      i.path.setAttribute("d", ve(u, o, p));
    }
    this.flowPathSyncedDirection.set(e.id, n);
  }
  motionPathRef(e, i, n) {
    return (i.animation?.direction ?? "auto") === "both" ? n >= 0 ? e.pathId : e.pathRevId ?? e.pathId : e.pathId;
  }
  animStyle(e) {
    return this.prefersReducedMotionFlag ? "none" : e.animation?.animation_style ?? "dots";
  }
  setFlowAriaLabel(e, i) {
    const n = this.flowNodes.get(e);
    n?.group && (n.group.setAttribute("role", "img"), n.group.setAttribute("aria-label", i));
  }
  buildSkeleton() {
    if (!this.svg || !this.config) return;
    const e = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${e.width} ${e.height}`);
    const i = document.createElementNS(P, "defs");
    this.svg.appendChild(i);
    const n = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const s = n.get(o.from_node), r = n.get(o.to_node);
      if (!s || !r) continue;
      const l = [s.position, ...o.waypoints, r.position], a = `flowme-path-${o.id}`, d = document.createElementNS(P, "path");
      d.setAttribute("id", a), d.setAttribute("d", ve(l, e, o.line_style ?? "corner")), d.setAttribute("fill", "none"), i.appendChild(d);
      const p = document.createElementNS(P, "g");
      p.classList.add("flowme-flow-group"), p.setAttribute("data-flow-id", o.id), o.opacity !== void 0 && p.setAttribute("opacity", String(o.opacity)), o.visible === !1 && (p.style.display = "none");
      const h = this.config?.defaults?.line_width ?? nt, u = document.createElementNS(P, "use");
      u.classList.add("flow-line"), u.setAttributeNS(K, "href", `#${a}`), u.setAttribute("href", `#${a}`), u.setAttribute("stroke", this.primaryColor(o)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(h)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), p.appendChild(u);
      const f = {
        group: p,
        path: d,
        pathId: a,
        outline: u,
        style: this.animStyle(o),
        particles: []
      };
      this.svg.appendChild(p), this.flowNodes.set(o.id, f), se("skeleton:", o.id, "| style=", f.style, "| line_style=", o.line_style ?? "corner (default)");
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const e = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${e.width} ${e.height}`);
    const i = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = this.flowNodes.get(n.id);
      if (!o) continue;
      const s = i.get(n.from_node), r = i.get(n.to_node);
      if (!s || !r) continue;
      const l = this.latestValues.get(n.id) ?? 0, a = this.flowPathSyncedDirection.get(n.id) ?? this.computeIntendedTravelSign(n, l);
      this.syncFlowPathGeometry(n, o, a);
    }
  }
  flushUpdates() {
    for (const [e, i] of this.latestValues)
      this.applyFlow(e, i);
  }
  applyFlow(e, i) {
    const n = this.flowsById.get(e), o = this.flowNodes.get(e);
    if (!n || !o) return;
    const s = n.animation ?? {}, r = this.animStyle(n);
    o.style !== r && (this.teardownStyle(o), o.style = r);
    const l = this.profileFor(n), a = Me(n, l, this.config), d = Math.abs(i), p = s.shimmer === !0, h = a.peak * 1e-3, u = p && d <= h && d > 0;
    if (n.visible === !1) {
      this.setGroupOpacity(o, 0);
      return;
    }
    const f = ho ? fo : It(i, a.peak, a.minDur, a.maxDur), g = n.speed_multiplier ?? 1;
    let b = Math.max(50, f * g);
    u && (b = b / bo);
    const v = this.config?.animation?.smooth_speed !== !1;
    b = co(e, b, v, performance.now(), this.durInterp);
    const m = s.direction ?? "auto", $ = this.computeIntendedTravelSign(n, i);
    let x = $, k = u ? Le : 1;
    const M = 600, F = 300;
    if (v && m === "auto") {
      const fe = this.lastDirection.get(e), Ji = this.dirChanging.get(e);
      fe !== void 0 && fe !== $ && !Ji && this.dirChanging.set(e, { startMs: performance.now(), oldDir: fe, newDir: $ });
      const Ee = this.dirChanging.get(e);
      if (Ee) {
        const V = performance.now() - Ee.startMs;
        V < M ? (V < F ? (k = (u ? Le : 1) * (1 - V / F), x = Ee.oldDir) : (k = (u ? Le : 1) * ((V - F) / F), x = Ee.newDir), !p && V >= 280 && V <= 320 && (b = Math.max(b, 45e3)), p && V >= 270 && V <= 330 && (k = Math.max(k, Le))) : (this.dirChanging.delete(e), x = $);
      }
    }
    this.lastDirection.set(e, $);
    const E = n.domain ?? this.config?.domain, A = this.config?.flows.findIndex((fe) => fe.id === e) ?? -1, R = pe(
      n,
      l,
      E,
      x,
      this.config?.domain_colors,
      A >= 0 ? A : 0
    ), O = this.gradientColors.get(e), I = n.value_gradient?.mode ?? "flow", L = ht(
      O && I !== "line" ? O : R
    ), z = ht(
      O && I !== "flow" ? O : R
    ), U = L;
    o.outline && o.outline.setAttribute("stroke", z), this.setGroupOpacity(o, k), this.syncFlowPathGeometry(n, o, x);
    const he = this.updateBurstState(e, d, a, l);
    switch (se("applyFlow:", e, "style=", r, "dur=", b, "dir=", x, "color=", U), r) {
      case "dots":
        this.applyDots(o, n, l, i, b, U, x, he);
        break;
      case "dash":
        this.applyDash(o, n, b, U, x, he);
        break;
      case "arrow":
        this.applyArrows(o, n, b, U, x, he);
        break;
      case "trail":
        this.applyTrail(o, n, b, U, x, he);
        break;
      case "fluid":
        this.applyFluid(o, n, b, U);
        break;
      case "none":
        this.setGroupOpacity(o, 1);
        break;
      default:
        this.applyDots(o, n, l, i, b, U, x, he);
    }
    m === "both" && (r === "dots" || r === "arrow" || r === "trail") && C(
      "direction both:",
      e,
      "forward particles:",
      o.particles.length,
      "reverse particles:",
      o.particlesBack?.length ?? 0,
      "forward path:",
      o.path.id,
      "reverse path:",
      o.pathRev?.id ?? "(none)"
    );
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(e, i, n, o) {
    const s = n.peak, r = this.config?.defaults?.burst_trigger_ratio ?? go, l = this.config?.defaults?.burst_sustain_ms ?? mo, a = s * r;
    if (i < a)
      return this.burstActive.delete(e), this.burstEnteredAt.delete(e), 1;
    let d = this.burstEnteredAt.get(e);
    if (d === void 0 && (d = performance.now(), this.burstEnteredAt.set(e, d)), performance.now() - d < l) return 1;
    const p = o.burst_density_multiplier ?? 1.5;
    return this.burstActive.add(e), p;
  }
  // ── helpers ───────────────────────────────────────────────────────────────
  setGroupOpacity(e, i) {
    const n = String(i);
    for (const o of e.particles) o.shape.setAttribute("opacity", n);
    if (e.particlesBack) for (const o of e.particlesBack) o.shape.setAttribute("opacity", n);
    e.fluidGradient ? (e.group.setAttribute("opacity", i <= 0 ? "0" : n), i <= 0 && e.lineStroke?.setAttribute("opacity", "0")) : (e.group.removeAttribute("opacity"), e.lineStroke && e.lineStroke.setAttribute("opacity", i > 0 ? "0.9" : "0"));
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
    const n = 1e3 / (this.config.animation?.fps ?? 60), o = this.avgFrameMs(), s = o > n * 1.2, r = o < n * 0.8;
    for (const l of this.config.flows) {
      if (l.animation?.particle_count !== void 0) continue;
      const a = this.animStyle(l);
      if (a !== "dots" && a !== "trail") continue;
      const d = this.profileFor(l), p = Math.abs(this.latestValues.get(l.id) ?? 0), h = Me(l, d, this.config), u = this.updateBurstState(l.id, p, h, d), f = Math.max(
        1,
        Math.round(d.particle_count_curve ? d.particle_count_curve(p) : Re)
      ), g = this.config.defaults?.burst_max_particles ?? De, b = Math.min(g, Math.max(1, Math.round(f * u)));
      let v = this.adaptiveCount.get(l.id) ?? b;
      s && v > 1 ? (v -= 1, C("adaptive count:", l.id, v, "avg frame:", o)) : r && v < b && (v += 1, C("adaptive count:", l.id, v, "avg frame:", o)), this.adaptiveCount.set(l.id, Math.min(v, b));
    }
  }
  /** Resolve effective particle count, respecting explicit override and burst */
  resolveParticleCount(e, i, n, o) {
    const s = e.animation ?? {};
    if (s.particle_count !== void 0) return s.particle_count;
    const r = this.animStyle(e), l = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(n) : Re)
    ), a = Math.max(1, l), d = this.config?.defaults?.burst_max_particles ?? De, p = Math.min(d, Math.max(1, Math.round(a * o)));
    return r === "dots" || r === "trail" ? Math.min(this.adaptiveCount.get(e.id) ?? p, p) : p;
  }
  resolveParticleRadius(e) {
    return (this.config?.defaults?.dot_radius ?? ei) * (e.animation?.particle_size ?? 1);
  }
  resolveGlow(e, i) {
    return e.animation?.glow_intensity === 0 ? !1 : i.glow;
  }
  glowFilter(e, i, n) {
    return this.resolveGlow(e, i) ? `drop-shadow(0 0 ${(6 * (e.animation?.glow_intensity ?? 1)).toFixed(1)}px ${n})` : "";
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
  resolveParticleBegins(e, i, n, o) {
    const s = o.particle_spacing ?? "even", r = n / 1e3, l = r / i;
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
            let b, v = 0;
            do
              b = -(Math.random() * r), v++;
            while (v < 20 && f.some((m) => {
              const $ = Math.abs((b - m) % r + r) % r;
              return $ < u && $ > r - u;
            }));
            f.push(b);
          }
          this.randomOffsets.set(e, f), this.randomOffsetsLastUpdate.set(e, a), h = f;
        }
        return h;
      }
      case "clustered": {
        const a = Math.max(1, Math.round(o.cluster_size ?? 3)), d = o.cluster_gap ?? 3, p = l * 0.3, h = [];
        let u = 0;
        for (let f = 0; f < i; f++) {
          const g = f % a;
          f > 0 && g === 0 && (u += p * a * d), h.push(-(u % r)), u += p;
        }
        return h;
      }
      case "pulse": {
        const a = 1 / Math.max(0.01, o.pulse_frequency ?? 1.5), d = o.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % a < a * d ? Array.from({ length: i }, (u, f) => -(l * 0.1 * f)) : Array.from({ length: i }, (u, f) => -(l * f));
      }
      case "wave_spacing": {
        const a = o.wave_frequency ?? 2, d = o.wave_amplitude ?? 0.85;
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
        const n = this.flowNodes.get(i.id);
        if (!n || n.particles.length === 0) continue;
        const o = i.animation?.wave_frequency ?? 2, s = i.animation?.wave_amplitude ?? 20, r = n.particles.length, l = Math.PI * 2 / r, a = e * o * 2e-3 % (Math.PI * 2);
        for (let d = 0; d < r; d++) {
          const p = n.particles[d];
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
        const n = i.animation?.particle_spacing ?? "even";
        if (n !== "wave_spacing" && n !== "pulse") continue;
        const o = this.flowNodes.get(i.id);
        if (!o || o.particles.length === 0) continue;
        const s = o.particles.length, l = (this.durInterp.currentDurMs.get(i.id) ?? 2e3) / 1e3, a = i.animation ?? {}, d = [];
        if (n === "wave_spacing") {
          const u = a.wave_frequency ?? 2, f = Math.min(a.wave_amplitude ?? 0.85, 0.95), g = e * 1e-3 / l, b = [];
          for (let v = 0; v < s; v++) {
            const m = (v / s + g) % 1, $ = Math.sin(m * Math.PI * 2 * u) * f * (1 / s);
            b.push(((m + $) % 1 + 1) % 1);
          }
          b.sort((v, m) => v - m), d.push(...b);
        } else {
          const u = a.pulse_frequency ?? 1.5, f = a.pulse_ratio ?? 0.25, g = e * u * 1e-3 % 1, b = e * 1e-3 / l % 1, v = 1 / s;
          let m;
          g < f ? m = 1 - (1 - g / f) * 0.9 : m = (g - f) / (1 - f);
          for (let $ = 0; $ < s; $++)
            d.push(((b + $ * v * m) % 1 + 1) % 1);
        }
        const p = o.path;
        let h = 0;
        try {
          h = p ? p.getTotalLength() : 0;
        } catch {
          h = 0;
        }
        for (let u = 0; u < s; u++) {
          const f = o.particles[u];
          if (!f) continue;
          if (!f.animateMotion.hasAttribute("data-js-driven")) {
            const b = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            b.setAttribute("data-js-driven", "1"), b.setAttribute("begin", "indefinite"), b.setAttribute("dur", "1s"), f.animateMotion.replaceWith(b), f.animateMotion = b, f.shape.appendChild(b);
          }
          const g = d[u] ?? 0;
          if (h > 0 && p)
            try {
              const b = p.getPointAtLength(g * h), v = this.particleKind(f), m = Math.max(0.5, h * 0.01), $ = p.getPointAtLength(Math.max(0, g * h - m)), x = p.getPointAtLength(Math.min(h, g * h + m)), k = Math.atan2(x.y - $.y, x.x - $.x) * (180 / Math.PI), M = this.particleTangentRotationDegrees(v, k);
              f.shape.setAttribute(
                "transform",
                M === 0 ? `translate(${b.x.toFixed(2)},${b.y.toFixed(2)})` : `translate(${b.x.toFixed(2)},${b.y.toFixed(2)}) rotate(${M.toFixed(1)})`
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
  applyDots(e, i, n, o, s, r, l, a) {
    const d = i.animation?.direction ?? "auto", p = this.resolveParticleCount(i, n, o, a), h = i.animation?.particle_shape ?? "circle", u = i.animation?.flicker === !0;
    if (e.particles.length !== p || e.particles[0] && this.particleKind(e.particles[0]) !== h) {
      for (const x of e.particles) x.shape.remove();
      e.particles = [];
      for (let x = 0; x < p; x++)
        e.particles.push(this.makeParticle(e, h, r, i, n));
    }
    if (d === "both") {
      if (!e.particlesBack || e.particlesBack.length !== p) {
        if (e.particlesBack) for (const x of e.particlesBack) x.shape.remove();
        e.particlesBack = [];
        for (let x = 0; x < p; x++)
          e.particlesBack.push(this.makeParticle(e, h, r, i, n));
      }
    } else if (e.particlesBack) {
      for (const x of e.particlesBack) x.shape.remove();
      e.particlesBack = void 0;
    }
    const f = `${(s / 1e3).toFixed(3)}s`, g = s / 1e3, b = d === "both" ? g / 2 : 0, v = i.animation ?? {}, m = this.resolveParticleBegins(i.id, p, s, v), $ = (x, k, M) => {
      for (let F = 0; F < x.length; F++) {
        const E = x[F];
        this.updateParticleColor(E, r, i, n, u);
        const A = document.createElementNS(P, "animateMotion");
        A.setAttribute("repeatCount", "indefinite"), A.setAttribute("dur", f), A.setAttribute("rotate", this.particleMotionRotateAttr(h)), A.setAttribute("begin", `${((m[F] ?? 0) + M).toFixed(3)}s`);
        const R = document.createElementNS(P, "mpath"), O = this.motionPathRef(e, i, k);
        R.setAttributeNS(K, "href", `#${O}`), R.setAttribute("href", `#${O}`), A.appendChild(R), E.animateMotion.replaceWith(A), E.animateMotion = A, E.shape.appendChild(A);
      }
    };
    $(e.particles, l, 0), e.particlesBack && $(e.particlesBack, -l, b);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(e, i, n, o, s, r) {
    for (const m of e.particles) m.shape.remove();
    if (e.particles = [], !e.lineStroke) {
      const m = document.createElementNS(P, "use");
      m.setAttributeNS(K, "href", `#${e.pathId}`), m.setAttribute("href", `#${e.pathId}`), m.setAttribute("fill", "none"), m.setAttribute("stroke-linecap", "round"), m.setAttribute("stroke-linejoin", "round"), e.group.appendChild(m), e.lineStroke = m;
    }
    const l = this.config?.defaults?.line_width ?? nt, d = (i.animation ?? {}).dash_gap ?? 0.5, p = Math.max(0.1, d / r), h = 14, u = h * p, f = this.glowFilter(i, this.profileFor(i), o);
    e.lineStroke.setAttribute("stroke", o), e.lineStroke.setAttribute("stroke-width", String(l * 2)), e.lineStroke.setAttribute("stroke-dasharray", `${h} ${u}`), f && e.lineStroke.setAttribute("filter", f);
    const g = h + u, b = e.lineStroke.querySelector("animate");
    b && b.remove();
    const v = document.createElementNS(P, "animate");
    v.setAttribute("attributeName", "stroke-dashoffset"), v.setAttribute("from", s > 0 ? "0" : `-${g}`), v.setAttribute("to", s > 0 ? `-${g}` : "0"), v.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), v.setAttribute("repeatCount", "indefinite"), e.lineStroke.appendChild(v);
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(e, i, n, o, s, r) {
    const l = this.profileFor(i), a = i.animation?.particle_count ?? Re, d = this.config?.defaults?.burst_max_particles ?? De, p = Math.min(d, Math.max(1, Math.round(a * r))), h = i.animation?.flicker === !0, u = i.animation?.direction ?? "auto";
    if (e.particles.length !== p) {
      for (const $ of e.particles) $.shape.remove();
      e.particles = [];
      for (let $ = 0; $ < p; $++)
        e.particles.push(this.makeParticle(e, "arrow", o, i, l));
    }
    if (u === "both") {
      if (!e.particlesBack || e.particlesBack.length !== p) {
        if (e.particlesBack) for (const $ of e.particlesBack) $.shape.remove();
        e.particlesBack = [];
        for (let $ = 0; $ < p; $++)
          e.particlesBack.push(this.makeParticle(e, "arrow", o, i, l));
      }
    } else if (e.particlesBack) {
      for (const $ of e.particlesBack) $.shape.remove();
      e.particlesBack = void 0;
    }
    const f = `${(n / 1e3).toFixed(3)}s`, g = n / 1e3, b = u === "both" ? g / 2 : 0, v = this.resolveParticleBegins(i.id, p, n, i.animation ?? {}), m = ($, x, k) => {
      for (let M = 0; M < $.length; M++) {
        const F = $[M];
        this.updateParticleColor(F, o, i, l, h);
        const E = document.createElementNS(P, "animateMotion");
        E.setAttribute("repeatCount", "indefinite"), E.setAttribute("dur", f), E.setAttribute("rotate", this.particleMotionRotateAttr("arrow")), E.setAttribute("begin", `${((v[M] ?? 0) + k).toFixed(3)}s`);
        const A = document.createElementNS(P, "mpath"), R = this.motionPathRef(e, i, x);
        A.setAttributeNS(K, "href", `#${R}`), A.setAttribute("href", `#${R}`), E.appendChild(A), F.animateMotion.replaceWith(E), F.animateMotion = E, F.shape.appendChild(E);
      }
    };
    m(e.particles, s, 0), e.particlesBack && m(e.particlesBack, -s, b);
  }
  /**
   * trail — head uses particle_shape; four tail segments follow along path with staggered begins.
   */
  applyTrail(e, i, n, o, s, r) {
    const l = this.profileFor(i), a = i.animation?.particle_count ?? Re, d = this.config?.defaults?.burst_max_particles ?? De, p = Math.min(d, Math.max(1, Math.round(a * r))), h = i.animation?.flicker === !0, u = i.animation?.particle_shape ?? "circle", f = this.particleMotionRotateAttr(u), b = (i.animation?.direction ?? "auto") === "both";
    if (e.particles.length === p && e.particles[0]?.shape.hasAttribute("data-trail-pack") && e.particles[0]?.shape.getAttribute("data-head-kind") === u && (!b || e.particlesBack?.length === p && e.particlesBack[0]?.shape.hasAttribute("data-trail-pack") && e.particlesBack[0]?.shape.getAttribute("data-head-kind") === u)) {
      if (!b && e.particlesBack) {
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
        e.particles.push(this.makeTrailParticle(e, i, l, o, u));
      if (b) {
        e.particlesBack = [];
        for (let A = 0; A < p; A++)
          e.particlesBack.push(this.makeTrailParticle(e, i, l, o, u));
      }
    }
    const m = `${(n / 1e3).toFixed(3)}s`, $ = n / 1e3, x = b ? $ / 2 : 0, k = this.resolveParticleBegins(i.id, p, n, i.animation ?? {});
    let M = 100;
    try {
      M = Math.max(1, e.path.getTotalLength());
    } catch {
      M = 100;
    }
    const F = (A, R, O) => {
      const I = document.createElementNS(P, "animateMotion");
      I.setAttribute("repeatCount", "indefinite"), I.setAttribute("dur", m), I.setAttribute("rotate", f), I.setAttribute("begin", `${R.toFixed(4)}s`);
      const L = document.createElementNS(P, "mpath"), z = this.motionPathRef(e, i, O);
      return L.setAttributeNS(K, "href", `#${z}`), L.setAttribute("href", `#${z}`), I.appendChild(L), A.replaceWith(I), I;
    }, E = (A, R, O) => {
      this.updateParticleColor(A, o, i, l, h);
      const I = A.trailMotions;
      if (I && I.length === 4)
        for (let L = 0; L < 4; L++) {
          const z = wo[L], U = R + z / M * $;
          I[L] = F(I[L], U, O);
        }
      A.animateMotion = F(A.animateMotion, R, O);
    };
    for (let A = 0; A < e.particles.length; A++) {
      const R = e.particles[A];
      E(R, k[A] ?? 0, s);
    }
    if (e.particlesBack)
      for (let A = 0; A < e.particlesBack.length; A++) {
        const R = e.particlesBack[A];
        E(R, (k[A] ?? 0) + x, -s);
      }
  }
  /**
   * fluid — animated linear gradient along full path (v1.23.1).
   */
  applyFluid(e, i, n, o) {
    for (const I of e.particles) I.shape.remove();
    if (e.particles = [], !this.svg) return;
    const s = this.svg.querySelector("defs");
    if (!s) return;
    const r = new Map(this.config.nodes.map((I) => [I.id, I])), l = r.get(i.from_node), a = r.get(i.to_node);
    if (!l || !a) return;
    if (!e.lineStroke) {
      const I = document.createElementNS(P, "use");
      I.setAttributeNS(K, "href", `#${e.pathId}`), I.setAttribute("href", `#${e.pathId}`), I.setAttribute("fill", "none"), I.setAttribute("stroke-linecap", "round"), I.setAttribute("stroke-linejoin", "round"), e.group.appendChild(I), e.lineStroke = I;
    }
    const p = `fluid-grad-${i.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    let h = this.svg.getElementById(p);
    h || (h = document.createElementNS(P, "linearGradient"), h.setAttribute("id", p), s.appendChild(h)), e.fluidGradient = h;
    const u = e.path;
    let f = 100;
    try {
      f = Math.max(1, u.getTotalLength());
    } catch {
      f = 100;
    }
    let g = { x: 0, y: 0 }, b = { x: 0, y: 0 };
    try {
      const I = u.getPointAtLength(0), L = u.getPointAtLength(f);
      g = { x: I.x, y: I.y }, b = { x: L.x, y: L.y };
    } catch {
      const I = this.containerSize();
      g = Pe(l.position, I), b = Pe(a.position, I);
    }
    const v = b.x - g.x, m = b.y - g.y, $ = Math.hypot(v, m) || 1, x = v / $, k = m / $;
    for (h.setAttribute("gradientUnits", "userSpaceOnUse"), h.setAttribute("x1", String(g.x)), h.setAttribute("y1", String(g.y)), h.setAttribute("x2", String(g.x + x * 2 * f)), h.setAttribute("y2", String(g.y + k * 2 * f)); h.firstChild; ) h.firstChild.remove();
    const M = [
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
    for (const [I, L] of M) {
      const z = document.createElementNS(P, "stop");
      z.setAttribute("offset", I), z.setAttribute("stop-color", o), z.setAttribute("stop-opacity", L), h.appendChild(z);
    }
    const F = document.createElementNS(P, "animateTransform");
    F.setAttribute("attributeName", "gradientTransform"), F.setAttribute("type", "translate"), F.setAttribute("additive", "replace"), F.setAttribute("calcMode", "linear"), F.setAttribute("dur", `${Math.max(1, Math.round(n))}ms`), F.setAttribute("repeatCount", "indefinite");
    const E = x * f, A = k * f;
    F.setAttribute("from", `${-E} ${-A}`), F.setAttribute("to", "0 0"), h.appendChild(F);
    const R = (this.config?.defaults?.line_width ?? nt) * 3, O = this.glowFilter(i, this.profileFor(i), o);
    if (e.lineStroke.setAttribute("stroke", `url(#${p})`), e.lineStroke.setAttribute("stroke-width", String(R)), e.lineStroke.removeAttribute("stroke-dasharray"), O && e.lineStroke.setAttribute("filter", O), !e.fluidInitialised) {
      e.fluidInitialised = !0, e.lineStroke.setAttribute("opacity", "0");
      const I = document.createElementNS(P, "animate");
      I.setAttribute("attributeName", "opacity"), I.setAttribute("values", "0;1"), I.setAttribute("dur", "600ms"), I.setAttribute("fill", "freeze"), e.lineStroke.appendChild(I);
    }
  }
  makeTrailParticle(e, i, n, o, s) {
    const r = this.resolveParticleRadius(i), l = this.resolveGlow(i, n), a = s === "custom_svg" ? "circle" : s, d = document.createElementNS(P, "g");
    d.setAttribute("data-trail-pack", "1"), d.setAttribute("data-head-kind", s);
    const p = [], h = [], u = this.particleMotionRotateAttr(s);
    for (let m = 0; m < 4; m++) {
      const $ = document.createElementNS(P, "g"), { shape: x } = this.buildParticleShapeOnly(e, a, r * xo[m], o, i);
      l && x.setAttribute("filter", this.glowFilter(i, n, o)), x.setAttribute("opacity", String($o[m])), $.appendChild(x);
      const k = document.createElementNS(P, "animateMotion");
      k.setAttribute("repeatCount", "indefinite"), k.setAttribute("dur", "2s"), k.setAttribute("rotate", u);
      const M = document.createElementNS(P, "mpath");
      M.setAttributeNS(K, "href", `#${e.pathId}`), M.setAttribute("href", `#${e.pathId}`), k.appendChild(M), $.appendChild(k), h.push($), p.push(k);
    }
    for (let m = 3; m >= 0; m--) d.appendChild(h[m]);
    const f = document.createElementNS(P, "g");
    let g;
    s === "custom_svg" ? g = this.buildParticleShapeOnly(e, s, r, o, i, f).shape : (g = this.buildParticleShapeOnly(e, s, r, o, i).shape, f.appendChild(g)), l && g.setAttribute("filter", this.glowFilter(i, n, o));
    const b = document.createElementNS(P, "animateMotion");
    b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", "2s"), b.setAttribute("rotate", u);
    const v = document.createElementNS(P, "mpath");
    return v.setAttributeNS(K, "href", `#${e.pathId}`), v.setAttribute("href", `#${e.pathId}`), b.appendChild(v), f.appendChild(b), d.appendChild(f), e.group.appendChild(d), { shape: d, animateMotion: b, trailMotions: p };
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(e) {
    const i = e.shape.tagName.toLowerCase();
    return i === "g" && e.shape.hasAttribute("data-trail-pack") ? e.shape.getAttribute("data-head-kind") ?? "circle" : i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? e.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : i === "path" ? e.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  /**
   * Geometry only — used by dots/arrow and trail head/tail segments.
   */
  buildParticleShapeOnly(e, i, n, o, s, r) {
    let l, a = !1;
    switch (i) {
      case "square": {
        const d = n * 2, p = document.createElementNS(P, "rect");
        p.setAttribute("width", String(d)), p.setAttribute("height", String(d)), p.setAttribute("x", String(-d / 2)), p.setAttribute("y", String(-d / 2)), p.setAttribute("rx", "1.5"), p.setAttribute("fill", o), p.setAttribute("opacity", "0"), l = p;
        break;
      }
      case "arrow": {
        const d = this.config?.defaults?.dot_radius ?? ei, p = s.animation?.particle_size ?? 1, h = d * p / 10, u = document.createElementNS(P, "path");
        u.setAttribute("d", yo(h)), u.setAttribute("fill", o), u.setAttribute("opacity", "0"), u.setAttribute("data-kind", "arrow"), l = u;
        break;
      }
      case "teardrop": {
        const d = document.createElementNS(P, "path");
        d.setAttribute("d", vo(n)), d.setAttribute("fill", o), d.setAttribute("opacity", "0"), d.setAttribute("data-kind", "teardrop"), l = d;
        break;
      }
      case "diamond": {
        const d = n * 1.4, p = document.createElementNS(P, "polygon");
        p.setAttribute("points", `0,${-d} ${d},0 0,${d} ${-d},0`), p.setAttribute("fill", o), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "diamond"), l = p;
        break;
      }
      case "custom_svg": {
        const d = s.animation?.custom_svg_path ?? "";
        if (!d) {
          C(`particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${s.id}`);
          const u = document.createElementNS(P, "circle");
          u.setAttribute("r", String(n)), u.setAttribute("fill", o), u.setAttribute("opacity", "0"), l = u;
          break;
        }
        const p = document.createElementNS(P, "path");
        p.setAttribute("d", d), p.setAttribute("fill", o), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "custom_svg"), (r ?? e.group).appendChild(p), a = !0;
        try {
          const u = p.getBBox(), f = Math.max(u.width, u.height, 1), b = n * 2 / f, v = -(u.x + u.width / 2), m = -(u.y + u.height / 2);
          p.setAttribute("transform", `scale(${b.toFixed(4)}) translate(${v.toFixed(4)},${m.toFixed(4)})`);
        } catch {
        }
        l = p;
        break;
      }
      default: {
        const d = document.createElementNS(P, "circle");
        d.setAttribute("r", String(n)), d.setAttribute("fill", o), d.setAttribute("opacity", "0"), l = d;
      }
    }
    return { shape: l, alreadyAppended: a };
  }
  makeParticle(e, i, n, o, s) {
    const r = this.resolveParticleRadius(o), l = this.resolveGlow(o, s), { shape: a, alreadyAppended: d } = this.buildParticleShapeOnly(e, i, r, n, o);
    l && (a.setAttribute("filter", this.glowFilter(o, s, n)), a.style.color = n);
    const p = document.createElementNS(P, "animateMotion");
    p.setAttribute("repeatCount", "indefinite"), p.setAttribute("dur", "2s"), p.setAttribute("rotate", this.particleMotionRotateAttr(i));
    const h = document.createElementNS(P, "mpath");
    return h.setAttributeNS(K, "href", `#${e.pathId}`), h.setAttribute("href", `#${e.pathId}`), p.appendChild(h), a.appendChild(p), d || e.group.appendChild(a), { shape: a, animateMotion: p };
  }
  updateParticleColor(e, i, n, o, s) {
    if (e.shape.hasAttribute("data-trail-pack") ? e.shape.querySelectorAll("path, circle, rect, ellipse, polygon").forEach((a) => {
      a.setAttribute("fill", i);
    }) : e.shape.setAttribute("fill", i), e.shape.style.color = i, this.resolveGlow(n, o) && e.shape.setAttribute("filter", this.glowFilter(n, o, i)), e.shape.hasAttribute("data-trail-pack") || e.shape.setAttribute("opacity", "1"), s && !e.shape.hasAttribute("data-trail-pack")) {
      if (!e.flickerAnim) {
        const u = document.createElementNS(P, "animate");
        u.setAttribute("attributeName", "opacity"), u.setAttribute("repeatCount", "indefinite"), e.shape.appendChild(u), e.flickerAnim = u;
      }
      const d = (1 / (2 + Math.random() * 6)).toFixed(3), p = (0.85 + Math.random() * 0.1).toFixed(2), h = (0.95 + Math.random() * 0.05).toFixed(2);
      e.flickerAnim.setAttribute("values", `${h};${p};${h}`), e.flickerAnim.setAttribute("dur", `${d}s`);
    } else e.flickerAnim && (e.flickerAnim.remove(), e.flickerAnim = void 0);
  }
  profileFor(e) {
    return T(e.domain ?? this.config?.domain);
  }
  primaryColor(e) {
    const i = this.profileFor(e), n = e.domain ?? this.config?.domain, o = this.config?.flows.findIndex((s) => s.id === e.id) ?? -1;
    return pe(e, i, n, 1, this.config?.domain_colors, o >= 0 ? o : 0);
  }
}
const _o = `/* eslint-disable no-undef */
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
`, ti = "flowme-keyframes", ft = "flowme-cycle", Ao = 5, Co = 2;
let ee = null, ii = !1;
function So() {
  if (document.getElementById(ti)) return;
  const t = document.createElement("style");
  t.id = ti, t.textContent = `@keyframes ${ft} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(t);
}
function Io() {
  if (ii) return;
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
  for (const [n, o, s] of i)
    try {
      e({ name: n, syntax: o, inherits: !1, initialValue: s });
    } catch {
    }
  ii = !0;
}
async function ko() {
  if (ee) return ee;
  const t = CSS.paintWorklet;
  if (!t)
    return ee = Promise.reject(new Error("paintWorklet not available")), ee;
  const e = new Blob([_o], { type: "application/javascript" }), i = URL.createObjectURL(e);
  return ee = t.addModule(i).catch((n) => {
    throw ee = null, n;
  }).finally(() => {
  }), ee;
}
class Fo {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Gi(() => this.flushUpdates(), 120), this.lastDurMsByFlow = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.container = e, C("Houdini init start dims:", e.offsetWidth, e.offsetHeight), this.config = i, this.flowsById = new Map(i.flows.map((s) => [s.id, s])), So(), Io(), await ko();
    const n = document.createElement("div");
    n.className = "flow-houdini flow-houdini-root", n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", e.appendChild(n), this.wrapper = n;
    for (const s of i.flows) {
      const r = document.createElement("div");
      r.className = "flow-houdini", r.dataset.flowId = s.id, r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.background = "paint(flowme-painter)", r.style.setProperty("--flowme-dur", "2000"), r.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)", r.style.animation = `${ft} calc(var(--flowme-dur) * 1ms) linear infinite`, r.style.opacity = "0", n.appendChild(r), this.flowDivs.set(s.id, { el: r });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(e);
    const o = await zi(e);
    (o.width === 0 || o.height === 0) && await Ti(e), C("Houdini stable dims:", e.offsetWidth, e.offsetHeight), this.rebuildPaths(), C("Houdini post-resize dims:", e.offsetWidth, e.offsetHeight);
  }
  applyConfig(e) {
    this.config = e, this.flowsById = new Map(e.flows.map((i) => [i.id, i])), this.rebuildPaths();
  }
  updateFlow(e, i) {
    this.flowsById.has(e) && (this.latestValues.set(e, i), this.applyUpdate());
  }
  setFlowAriaLabel(e, i) {
    const n = this.flowDivs.get(e);
    n && (n.el.setAttribute("role", "img"), n.el.setAttribute("aria-label", i));
  }
  pause() {
    this.wrapper && this.wrapper.querySelectorAll(".flow-houdini").forEach((e) => {
      e.style.animationPlayState = "paused";
    });
  }
  resume() {
    this.wrapper && this.wrapper.querySelectorAll(".flow-houdini").forEach((e) => {
      e.style.animationPlayState = "running";
    });
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
    const e = this.containerSize(), i = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = this.flowDivs.get(n.id);
      if (!o) continue;
      const s = i.get(n.from_node), r = i.get(n.to_node);
      if (!s || !r) continue;
      const d = [s.position, ...n.waypoints, r.position].map((p) => Pe(p, e)).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
      o.el.style.setProperty("--flowme-path", `"${d}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [e, i] of this.latestValues) this.applyFlow(e, i);
  }
  applyFlow(e, i) {
    const n = this.flowsById.get(e), o = this.flowDivs.get(e);
    if (!n || !o) return;
    const s = this.profileFor(n), r = Me(n, s, this.config);
    if (n.visible === !1) {
      o.el.style.opacity = "0";
      return;
    }
    o.el.style.opacity = "1";
    const l = n.speed_multiplier ?? 1, a = Math.max(
      50,
      It(i, r.peak, r.minDur, r.maxDur) * l
    ), d = n.animation?.direction ?? "auto";
    let p;
    d === "forward" ? p = 1 : d === "reverse" ? p = -1 : d === "both" ? p = 1 : p = i >= 0 ? 1 : -1;
    const h = n.domain ?? this.config?.domain, u = this.config?.flows.findIndex((x) => x.id === n.id) ?? -1, f = pe(
      n,
      s,
      h,
      p,
      this.config?.domain_colors,
      u >= 0 ? u : 0
    ), g = Math.max(
      1,
      Math.round(s.particle_count_curve ? s.particle_count_curve(i) : 3)
    ), b = s.wave_amplitude_curve ? s.wave_amplitude_curve(i) : 4, v = o.el.style;
    v.setProperty("--flowme-shape", s.shape), v.setProperty("--flowme-color", f), v.setProperty("--flowme-glow", s.glow ? "1" : "0"), v.setProperty("--flowme-count", String(g)), v.setProperty("--flowme-radius", String(Ao)), v.setProperty("--flowme-line", String(Co)), v.setProperty("--flowme-amp", String(b)), v.setProperty("--flowme-direction", String(p));
    const m = this.lastDurMsByFlow.get(e) ?? a, $ = Math.round(a);
    if (Math.abs(a - m) < 50) {
      v.transition = "none", v.setProperty("--flowme-dur", String($));
      const x = o.el;
      requestAnimationFrame(() => {
        x.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)";
      });
    } else
      v.setProperty("--flowme-dur", String($));
    this.lastDurMsByFlow.set(e, a), v.animation = `${ft} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }
  profileFor(e) {
    return T(e.domain ?? this.config?.domain);
  }
}
function Po() {
  const t = No(), e = t ?? "svg", i = Mo(), n = Ui();
  return C(
    "renderer selected:",
    n || e !== "houdini" ? "SvgRenderer" : "HoudiniRenderer",
    "| override=",
    t ?? "(none)",
    "| Houdini available:",
    i,
    "| reduced motion:",
    n,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), n ? new Ge() : e === "houdini" ? i ? new Fo() : (C("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Ge()) : new Ge();
}
function Mo() {
  try {
    const t = CSS;
    return "paintWorklet" in t && "registerProperty" in t;
  } catch {
    return !1;
  }
}
function No() {
  try {
    const e = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (e === "svg" || e === "houdini") return e;
  } catch {
  }
  return null;
}
function ni(t) {
  const e = t.size?.width ?? 20, i = t.size?.height ?? 15;
  return `left: ${t.position.x}%; top: ${t.position.y}%; width: ${e}%; height: ${i}%;`;
}
function Bo(t, e, i) {
  C(
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
  const n = t.visible !== !1, o = t.opacity ?? 1, s = [
    n ? "" : "display:none;",
    o !== 1 ? `opacity:${o};` : ""
  ].join("");
  return t._migration_warning ? y`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${t.id}
        style=${ni(t) + s}
        tabindex="-1"
        title=${t._migration_warning}
      >
        <div class="migration-warning-inner">
          ${c("overlays.migrationPrefix")} ${t._migration_warning}
        </div>
      </div>
    ` : y`
    <div
      class="overlay overlay-custom overlay-interactive overlay-wrapper"
      data-overlay-id=${t.id}
      style=${ni(t) + s}
      tabindex=${n ? "0" : "-1"}
      role="button"
      @keydown=${(r) => i?.onOverlayKeydown?.(r, t)}
    >
      <flowme-custom-overlay
        class="overlay-interactive"
        .hass=${e}
        .card=${t.card}
      ></flowme-custom-overlay>
    </div>
    ${_}
  `;
}
let ot = null, re = null;
async function Eo() {
  if (ot) return ot;
  if (re) return re;
  const e = window.loadCardHelpers;
  return typeof e != "function" ? null : (re = e().then((i) => (ot = i, re = null, i)).catch((i) => {
    throw re = null, i;
  }), re);
}
async function Ro(t) {
  const e = await Eo();
  return e ? e.createCardElement(t) : null;
}
var Do = Object.defineProperty, Lo = Object.getOwnPropertyDescriptor, Ze = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Lo(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (o = (n ? r(e, i, o) : r(o)) || o);
  return n && o && Do(e, i, o), o;
};
let ue = class extends ne {
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
    return this.errorMessage ? y`<div class="err" title=${this.errorMessage}>!</div>` : y`<div class="mount"></div>`;
  }
  rebuildChild() {
    const t = this.card, e = t ? JSON.stringify(t) : void 0;
    if (e !== this.lastMountedConfigJson && (this.lastMountedConfigJson = e, this.disposeChild(), !!t)) {
      try {
        En(t);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, Ro(t).then((i) => {
        if (!i) {
          this.errorMessage = c("overlays.haHelpersUnavailable"), this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== e) return;
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
ue.styles = vt`
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
Ze([
  Be({ attribute: !1 })
], ue.prototype, "hass", 2);
Ze([
  Be({ attribute: !1 })
], ue.prototype, "card", 2);
Ze([
  B()
], ue.prototype, "errorMessage", 2);
ue = Ze([
  $t("flowme-custom-overlay")
], ue);
const G = "http://www.w3.org/2000/svg";
function He(t, e) {
  if (!t || !e) return null;
  const i = t.states[e];
  return !i || i.state === "unavailable" || i.state === "unknown" ? null : we(i.state);
}
function Ho(t, e) {
  const i = e.domain, n = T(i);
  if (t.color) return t.color;
  const o = e.flows.filter((r) => r.from_node === t.id || r.to_node === t.id);
  if (o.length === 0) return n.default_color_positive;
  const s = /* @__PURE__ */ new Set();
  for (const r of o) {
    const l = e.flows.findIndex((p) => p.id === r.id), a = T(r.domain ?? i), d = pe(r, a, r.domain ?? i, 1, e.domain_colors, l >= 0 ? l : 0);
    s.add(d);
  }
  return s.size === 1 ? [...s][0] : ji;
}
function Oo(t) {
  const e = t.getBoundingClientRect();
  return { widthPx: Math.max(1, e.width), heightPx: Math.max(1, e.height) };
}
function kt(t) {
  return {
    vbW: t.viewBoxUserWidth ?? 100,
    vbH: t.viewBoxUserHeight ?? 100
  };
}
function me(t, e) {
  const { vbW: i, vbH: n } = kt(e), o = i / e.widthPx, s = n / e.heightPx;
  return Math.min(t * o, t * s);
}
function oi(t, e) {
  const { vbW: i, vbH: n } = kt(e);
  return Math.max(0.04, t * Math.min(i / e.widthPx, n / e.heightPx));
}
function si(t, e) {
  const { vbW: i, vbH: n } = kt(e);
  return {
    cx: t.x / 100 * i,
    cy: t.y / 100 * n
  };
}
function zo(t) {
  return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
class Vi {
  constructor() {
    this.lastDiagnosticLogMs = 0, this.rippleLastRaw = /* @__PURE__ */ new Map(), this.ripplePendingTimeouts = /* @__PURE__ */ new Map(), this.rippleBurstGen = /* @__PURE__ */ new Map();
  }
  reset() {
    for (const e of this.ripplePendingTimeouts.values())
      for (const i of e) window.clearTimeout(i);
    this.ripplePendingTimeouts.clear(), this.rippleLastRaw.clear(), this.rippleBurstGen.clear();
  }
  sync(e, i, n, o, s) {
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
    const p = s?.getLayoutMetrics?.(e) ?? Oo(e), h = i.defaults?.node_radius ?? 12;
    if (Dn() && o - this.lastDiagnosticLogMs > 4e3) {
      this.lastDiagnosticLogMs = o;
      for (const u of i.nodes) {
        if (!u.node_effect?.type || !u.entity) continue;
        const f = n?.states[u.entity];
        C(
          "node effect update:",
          u.id,
          u.node_effect.type,
          "entity state:",
          f?.state ?? "(none)"
        );
      }
    }
    for (const u of i.nodes) {
      const f = u.node_effect;
      if (!f || u.visible === !1 || !u.entity) continue;
      const g = u.size ?? h, b = me(g, p), { cx: v, cy: m } = si(u.position, p), $ = Ho(u, i), x = document.createElementNS(G, "g");
      switch (x.classList.add("node-effect"), x.setAttribute("data-node", u.id), f.type) {
        case "glow":
          this.appendGlow(x, u, f, n, u.entity, $, g, s, p);
          break;
        case "badge":
          this.appendBadge(x, f, n, u.entity, $, u.id, v, m, g, p, s);
          break;
        case "ripple":
          this.updateRipple(l, u, f, n, $, g, v, m, p);
          continue;
        case "alert":
          this.appendAlert(x, f, n, u.entity, $, u.id, v, m, b, o, s);
          break;
      }
      x.childNodes.length > 0 && a.appendChild(x);
    }
  }
  appendGlow(e, i, n, o, s, r, l, a, d) {
    const p = He(o, s), h = n.peak_value ?? 1e4, u = n.glow_max_radius ?? 20, f = Math.max(0, Math.min(1, n.glow_min_intensity ?? 0.1)), g = n.glow_color || r, b = p === null ? 0 : Math.abs(p) / h, v = Math.max(f, Math.min(1, b)), m = 4 + v * u, $ = 0.2 + v * 0.6;
    if (a?.setNodeDotFilter) {
      a.setNodeDotFilter(i.id, `drop-shadow(0 0 ${m.toFixed(1)}px ${g})`);
      return;
    }
    const { cx: x, cy: k } = si(i.position, d), M = document.createElementNS(G, "circle");
    M.setAttribute("cx", String(x)), M.setAttribute("cy", String(k)), M.setAttribute("r", String(me(l, d))), M.setAttribute("fill", "none"), M.setAttribute("stroke", g), M.setAttribute("stroke-width", String(oi(2, d))), M.setAttribute("opacity", String($)), M.setAttribute(
      "style",
      `filter: drop-shadow(0 0 ${m.toFixed(1)}px ${g}); transition: filter 500ms ease, opacity 500ms ease`
    ), e.appendChild(M);
  }
  cancelRippleBurst(e, i) {
    const n = this.ripplePendingTimeouts.get(e);
    if (n) {
      for (const o of n) window.clearTimeout(o);
      this.ripplePendingTimeouts.delete(e);
    }
    if (i) {
      const o = `[data-ripple-owner="${zo(e)}"]`;
      i.querySelectorAll(o).forEach((s) => s.remove());
    }
    this.rippleBurstGen.set(e, (this.rippleBurstGen.get(e) ?? 0) + 1);
  }
  scheduleRippleBurst(e, i, n, o, s, r, l, a) {
    this.cancelRippleBurst(e, i);
    const d = this.rippleBurstGen.get(e), p = 300, h = [];
    for (let u = 0; u < 3; u++)
      h.push(
        window.setTimeout(() => {
          this.rippleBurstGen.get(e) === d && this.spawnRippleRing(i, e, n, o, s, r, l, a);
        }, u * p)
      );
    this.ripplePendingTimeouts.set(e, h);
  }
  spawnRippleRing(e, i, n, o, s, r, l, a) {
    const d = me(s + 2, a), p = me(s * 4, a), h = oi(2, a), u = document.createElementNS(G, "g");
    u.setAttribute("data-ripple-owner", i);
    const f = document.createElementNS(G, "circle");
    f.setAttribute("cx", String(n)), f.setAttribute("cy", String(o)), f.setAttribute("r", String(d)), f.setAttribute("fill", "none"), f.setAttribute("stroke", l), f.setAttribute("stroke-width", String(h)), f.setAttribute("opacity", "0.7");
    const g = document.createElementNS(G, "animate");
    g.setAttribute("attributeName", "r"), g.setAttribute("from", String(d)), g.setAttribute("to", String(p)), g.setAttribute("dur", `${r}ms`), g.setAttribute("fill", "freeze"), g.setAttribute("begin", "indefinite");
    const b = document.createElementNS(G, "animate");
    b.setAttribute("attributeName", "opacity"), b.setAttribute("from", "0.7"), b.setAttribute("to", "0"), b.setAttribute("dur", `${r}ms`), b.setAttribute("fill", "freeze"), b.setAttribute("begin", "indefinite"), f.appendChild(g), f.appendChild(b), u.appendChild(f), e.appendChild(u), requestAnimationFrame(() => {
      try {
        g.beginElement(), b.beginElement();
      } catch {
      }
    }), window.setTimeout(() => u.remove(), r + 80);
  }
  updateRipple(e, i, n, o, s, r, l, a, d) {
    const p = He(o, i.entity), h = n.ripple_threshold ?? 0;
    if (p === null || Math.abs(p) <= h) {
      this.cancelRippleBurst(i.id, e), this.rippleLastRaw.delete(i.id);
      return;
    }
    if (this.rippleLastRaw.get(i.id) === p) return;
    this.rippleLastRaw.set(i.id, p);
    const f = n.ripple_duration ?? 2e3, g = n.ripple_color || s;
    this.scheduleRippleBurst(i.id, e, l, a, r, f, g, d);
  }
  appendBadge(e, i, n, o, s, r, l, a, d, p, h) {
    const u = i.badge_color_on ?? "#32DC50", f = i.badge_color_off ?? "#CC3333", g = n?.states[o];
    let b = "#888888";
    if (g)
      if (g.state === "unavailable" || g.state === "unknown") b = "#888888";
      else if (i.threshold !== void 0 && i.threshold !== null) {
        const k = He(n, o);
        b = k !== null && k >= i.threshold ? u : f;
      } else {
        const k = String(g.state).toLowerCase();
        b = k === "on" || k === "open" || k === "true" ? u : f;
      }
    if (h?.setNodeDotBackground) {
      h.setNodeDotBackground(r, b, { transitionMs: 300 });
      return;
    }
    const v = me(d * 0.6, p), m = l + Math.min(v * 1.1, 3), $ = a - Math.min(v * 1.1, 3), x = document.createElementNS(G, "circle");
    x.setAttribute("cx", String(m)), x.setAttribute("cy", String($)), x.setAttribute("r", String(v)), x.setAttribute("fill", b), x.setAttribute("stroke", "#ffffff"), x.setAttribute("stroke-width", String(0.03)), e.appendChild(x);
  }
  appendAlert(e, i, n, o, s, r, l, a, d, p, h) {
    const u = He(n, o);
    if (u === null) return;
    const f = i.alert_threshold ?? 0, g = i.alert_condition ?? "above", b = i.alert_hysteresis ?? 0.05, v = Math.abs(f) * b + 1e-6;
    let m = g === "above" ? u > f : u < f;
    !m && g === "above" && u > f - v && (m = !0), !m && g === "below" && u < f + v && (m = !0);
    const $ = i.alert_frequency ?? 2, x = i.alert_color ?? "#FF0000";
    if (!m) {
      h?.setNodeDotBackground && h.setNodeDotBackground(r, s, { transitionMs: 200 });
      return;
    }
    if (h?.setNodeDotBackground) {
      const E = 1e3 / Math.max(0.25, $), A = Math.floor(p / (E / 2)) % 2 === 0;
      h.setNodeDotBackground(r, A ? x : s, { transitionMs: 80 });
      return;
    }
    const k = document.createElementNS(G, "circle");
    k.setAttribute("cx", String(l)), k.setAttribute("cy", String(a)), k.setAttribute("r", String(d)), k.setAttribute("fill", s), k.setAttribute("opacity", "0.85");
    const M = Math.max(100, Math.round(1e3 / Math.max(0.25, $))), F = document.createElementNS(G, "animate");
    F.setAttribute("attributeName", "fill"), F.setAttribute("values", `${s};${x};${s}`), F.setAttribute("dur", `${M}ms`), F.setAttribute("repeatCount", "indefinite"), k.appendChild(F), e.appendChild(k);
  }
}
const To = 100;
class Go {
  constructor(e) {
    this.apply = e, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(e) {
    if (e.prev !== e.next) {
      for (this.apply(e.next), this.undoStack.push(e); this.undoStack.length > To; ) this.undoStack.shift();
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
function S(t) {
  return JSON.parse(JSON.stringify(t));
}
function H(t) {
  return t < 0 ? 0 : t > 100 ? 100 : t;
}
function Oe(t, e = 8) {
  return Math.round(t / e) * e;
}
function Wo(t) {
  const e = new Set(t.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `node_${i}`;
    if (!e.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function Uo(t) {
  const e = new Set(t.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `flow_${i}`;
    if (!e.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function st(t, e, i) {
  const n = S(t);
  for (const o of n.nodes)
    o.id === e && (o.position = { x: H(i.x), y: H(i.y) });
  return n;
}
function Ko(t, e, i) {
  const n = S(t), o = {
    id: Wo(t),
    position: { x: H(e.x), y: H(e.y) },
    ...i ? { label: i } : {}
  };
  return n.nodes.push(o), { config: n, node: o };
}
function jo(t, e) {
  const i = S(t);
  return i.nodes = i.nodes.filter((n) => n.id !== e), i.flows = i.flows.filter((n) => n.from_node !== e && n.to_node !== e), i;
}
function Vo(t, e) {
  const i = S(t);
  for (const n of i.nodes) {
    const o = e.get(n.id);
    o && (n.position = { x: H(o.x), y: H(o.y) });
  }
  return i;
}
function Yo(t, e) {
  const i = S(t);
  return i.nodes = i.nodes.filter((n) => !e.has(n.id)), i.flows = i.flows.filter((n) => !e.has(n.from_node) && !e.has(n.to_node)), i;
}
function ri(t, e, i) {
  const n = S(t);
  for (const o of n.nodes)
    e.has(o.id) && (o.visible = i);
  return n;
}
function Zo(t, e, i) {
  const n = t.nodes.find((s) => s.id === i);
  if (!n) return t;
  const o = S(t);
  for (const s of o.nodes)
    e.has(s.id) && (s.position = { ...s.position, y: n.position.y });
  return o;
}
function Xo(t, e, i) {
  const n = t.nodes.find((s) => s.id === i);
  if (!n) return t;
  const o = S(t);
  for (const s of o.nodes)
    e.has(s.id) && (s.position = { ...s.position, x: n.position.x });
  return o;
}
function ai(t, e, i) {
  const n = S(t);
  for (const o of n.nodes)
    o.id === e && (i && i.length ? o.label = i : delete o.label);
  return n;
}
function rt(t, e, i, n) {
  const o = S(t);
  for (const s of o.flows)
    if (s.id === e) {
      if (i < 0 || i >= s.waypoints.length) return t;
      s.waypoints[i] = {
        x: H(n.x),
        y: H(n.y)
      };
    }
  return o;
}
function li(t, e, i, n) {
  const o = S(t);
  for (const s of o.flows) {
    if (s.id !== e) continue;
    const r = Math.max(0, Math.min(s.waypoints.length, i));
    s.waypoints.splice(r, 0, {
      x: H(n.x),
      y: H(n.y)
    });
  }
  return o;
}
function ci(t, e, i) {
  const n = S(t);
  for (const o of n.flows)
    if (o.id === e) {
      if (i < 0 || i >= o.waypoints.length) return t;
      o.waypoints.splice(i, 1);
    }
  return n;
}
function di(t, e, i, n) {
  const o = S(t), s = {
    id: Uo(t),
    from_node: e,
    to_node: i,
    entity: n,
    waypoints: []
  };
  return o.flows.push(s), { config: o, flow: s };
}
function qo(t, e) {
  const i = S(t);
  return i.flows = i.flows.filter((n) => n.id !== e), i;
}
function Jo(t, e) {
  const i = S(t);
  return i.background.default = e, i;
}
function Qo(t, e) {
  const i = S(t);
  return e && e.length ? i.background.weather_entity = e : delete i.background.weather_entity, i;
}
function es(t, e) {
  const i = S(t);
  return e && e.length ? i.background.sun_entity = e : delete i.background.sun_entity, i;
}
function ts(t, e) {
  const i = S(t);
  return e === void 0 || !Number.isFinite(e) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(e)), i;
}
function pi(t, e, i) {
  var o;
  const n = S(t);
  return (o = n.background).weather_states ?? (o.weather_states = {}), n.background.weather_states[e] = i, n;
}
function is(t, e) {
  const i = S(t);
  return i.background.weather_states && (delete i.background.weather_states[e], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function ns(t) {
  const e = new Set((t.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `overlay_${i}`;
    if (!e.has(n)) return n;
  }
  return `overlay_${Date.now()}`;
}
function os(t, e) {
  const i = S(t), n = e.id ?? ns(t), o = {
    ...e,
    id: n,
    position: {
      x: H(e.position.x),
      y: H(e.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], o], { config: i, overlay: o };
}
function ss(t, e) {
  const i = S(t);
  return i.overlays = (i.overlays ?? []).filter((n) => n.id !== e), i.overlays.length === 0 && delete i.overlays, i;
}
function rs(t, e, i) {
  const n = S(t);
  for (const o of n.overlays ?? [])
    o.id === e && (o.position = { x: H(i.x), y: H(i.y) });
  return n;
}
function ui(t, e, i) {
  const n = S(t), o = Math.max(2, Math.min(100, i.width)), s = Math.max(2, Math.min(100, i.height));
  for (const r of n.overlays ?? [])
    r.id === e && (r.size = { width: o, height: s });
  return n;
}
function as(t, e, i) {
  const n = S(t);
  for (const o of n.overlays ?? [])
    o.id === e && i && (o.card = i);
  return n;
}
function ls(t, e, i) {
  const n = S(t);
  for (const o of n.overlays ?? [])
    o.id === e && (i ? delete o.visible : o.visible = !1);
  return n;
}
function cs(t, e, i) {
  const n = S(t);
  for (const o of n.overlays ?? [])
    if (o.id === e) {
      const s = Math.max(0, Math.min(1, i));
      s === 1 ? delete o.opacity : o.opacity = s;
    }
  return n;
}
function hi(t, e, i) {
  const n = S(t);
  return n.opacity = { ...n.opacity, [e]: i }, n;
}
function ds(t, e, i) {
  const n = S(t);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function ps(t, e, i) {
  const n = S(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function at(t, e, i) {
  const n = S(t);
  return n.defaults = { ...n.defaults, [e]: i }, n;
}
function us(t, e, i) {
  if (e === i) return t;
  const n = S(t), o = n.background.weather_states;
  if (!o || !(e in o)) return t;
  const s = o[e];
  return s === void 0 ? t : (delete o[e], o[i] = s, n);
}
function hs(t, e, i) {
  const n = S(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 || i === "corner" ? delete s.line_style : s.line_style = i, s;
  }), n;
}
function fi(t, e, i) {
  const n = S(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 ? delete s.color : s.color = i, s;
  }), n;
}
function gi(t, e, i) {
  const n = S(t);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function fs(t, e, i) {
  const n = S(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function gs(t, e, i) {
  const n = S(t);
  return n.visibility = { ...n.visibility, [e]: i }, n;
}
function mi(t, e, i) {
  const n = S(t);
  return i === void 0 ? n.domain_colors && (delete n.domain_colors[e], Object.keys(n.domain_colors).length === 0 && delete n.domain_colors) : n.domain_colors = { ...n.domain_colors, [e]: i }, n;
}
function ms(t, e, i) {
  const n = i.trim();
  if (!n || n === e) return t;
  const o = t.flows.findIndex((r) => r.id === e);
  if (o < 0 || t.flows.some((r, l) => l !== o && r.id === n)) return t;
  const s = S(t);
  return s.flows = s.flows.map((r) => r.id === e ? { ...r, id: n } : r), s;
}
function bi(t, e, i) {
  const n = i.trim();
  if (!n || n === e) return t;
  const o = t.overlays ?? [], s = o.findIndex((l) => l.id === e);
  if (s < 0 || o.some((l, a) => a !== s && l.id === n)) return t;
  const r = S(t);
  return r.overlays = o.map((l) => l.id === e ? { ...l, id: n } : l), r;
}
function yi(t, e, i) {
  const n = S(t);
  return n.flows = n.flows.map((o) => o.id !== e ? o : { ...o, speed_curve_override: { ...o.speed_curve_override, ...i } }), n;
}
function bs(t, e) {
  const i = S(t);
  return i.flows = i.flows.map((n) => {
    if (n.id !== e) return n;
    const o = { ...n };
    return delete o.speed_curve_override, o;
  }), i;
}
function be(t, e, i) {
  const n = S(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o.animation, ...i };
    for (const r of Object.keys(s))
      s[r] === void 0 && delete s[r];
    if (Object.keys(s).length === 0) {
      const r = { ...o };
      return delete r.animation, r;
    }
    return { ...o, animation: s };
  }), n;
}
function ys(t, e) {
  const i = S(t);
  return i.flows = i.flows.map((n) => {
    if (n.id !== e) return n;
    const o = { ...n };
    return delete o.animation, o;
  }), i;
}
function ze(t, e) {
  const i = S(t), n = { ...i.animation };
  for (const o of Object.keys(e)) {
    const s = e[o];
    s === void 0 ? delete n[o] : Object.assign(n, { [o]: s });
  }
  return Object.keys(n).length === 0 ? delete i.animation : i.animation = n, i;
}
function vi(t, e, i) {
  const n = S(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 || !Number.isFinite(i) ? delete s.peak_value : s.peak_value = i, s;
  }), n;
}
function vs(t, e) {
  const i = S(t);
  return e ? delete i.pause_when_hidden : i.pause_when_hidden = !1, i;
}
function ws(t, e, i) {
  const n = S(t), o = n.flows.find((s) => s.id === e);
  return o && (o.value_gradient = i), n;
}
function xs(t, e, i) {
  const n = S(t), o = n.flows.find((s) => s.id === e);
  return o && (o.value_gradient = { ...o.value_gradient, ...i }), n;
}
function wi(t, e) {
  const i = S(t), n = i.flows.find((o) => o.id === e);
  return n && delete n.value_gradient, i;
}
const Ft = 8, xi = 1, gt = 255;
function $s(t, e = Ft) {
  const i = Math.max(1, Math.floor(e)), n = Math.max(1, Math.ceil(t.width / i)), o = Math.max(1, Math.ceil(t.height / i)), s = new Uint16Array(n * o);
  for (let r = 0; r < o; r++) {
    const l = r * i, a = Math.min(t.height, l + i);
    for (let d = 0; d < n; d++) {
      const p = d * i, h = Math.min(t.width, p + i);
      let u = 0;
      for (let g = l; g < a; g++) {
        const b = g * t.width;
        for (let v = p; v < h; v++) {
          const m = t.data[b + v] ?? 0;
          m > u && (u = m);
        }
      }
      const f = gt - u;
      s[r * n + d] = f < xi ? xi : f;
    }
  }
  return { cols: n, rows: o, cellSize: i, data: s };
}
function _s(t, e, i) {
  return i * t.cols + e;
}
function As(t, e, i) {
  return e < 0 || i < 0 || e >= t.cols || i >= t.rows ? gt : t.data[_s(t, e, i)] ?? gt;
}
const Cs = 480, Ss = 270, Is = 30;
function ks(t, e, i = Cs, n = Ss) {
  if (t <= 0 || e <= 0) return { width: 1, height: 1 };
  const o = Math.min(i / t, n / e, 1);
  return {
    width: Math.max(1, Math.floor(t * o)),
    height: Math.max(1, Math.floor(e * o))
  };
}
function Fs(t, e, i) {
  const n = new Uint8ClampedArray(e * i);
  for (let o = 0, s = 0; o < t.length; o += 4, s++) {
    const r = t[o] ?? 0, l = t[o + 1] ?? 0, a = t[o + 2] ?? 0;
    n[s] = 0.2126 * r + 0.7152 * l + 0.0722 * a;
  }
  return n;
}
function Ps(t, e, i) {
  const n = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e;
    for (let l = 0; l < e; l++) {
      const a = t[r + Math.max(0, l - 1)] ?? 0, d = t[r + l] ?? 0, p = t[r + Math.min(e - 1, l + 1)] ?? 0;
      n[r + l] = a + 2 * d + p >> 2;
    }
  }
  const o = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e, l = Math.max(0, s - 1) * e, a = Math.min(i - 1, s + 1) * e;
    for (let d = 0; d < e; d++) {
      const p = n[l + d] ?? 0, h = n[r + d] ?? 0, u = n[a + d] ?? 0;
      o[r + d] = p + 2 * h + u >> 2;
    }
  }
  return o;
}
function Ms(t, e, i) {
  const n = new Uint8ClampedArray(e * i);
  for (let o = 1; o < i - 1; o++) {
    const s = (o - 1) * e, r = o * e, l = (o + 1) * e;
    for (let a = 1; a < e - 1; a++) {
      const d = t[s + (a - 1)] ?? 0, p = t[s + a] ?? 0, h = t[s + (a + 1)] ?? 0, u = t[r + (a - 1)] ?? 0, f = t[r + (a + 1)] ?? 0, g = t[l + (a - 1)] ?? 0, b = t[l + a] ?? 0, v = t[l + (a + 1)] ?? 0, m = -d - 2 * u - g + h + 2 * f + v, $ = -d - 2 * p - h + g + 2 * b + v;
      let x = Math.sqrt(m * m + $ * $);
      x < Is && (x = 0), x > 255 && (x = 255), n[r + a] = x;
    }
  }
  return { width: e, height: i, data: n };
}
function Yi(t, e, i) {
  const n = ks(e, i), o = document.createElement("canvas");
  o.width = n.width, o.height = n.height;
  const s = o.getContext("2d", { willReadFrequently: !0 });
  if (!s) throw new Error("2D canvas unavailable");
  s.drawImage(t, 0, 0, n.width, n.height);
  try {
    const r = s.getImageData(0, 0, n.width, n.height);
    return { width: n.width, height: n.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function Ns(t, e, i) {
  const { width: n, height: o, rgba: s } = Yi(t, e, i), r = Fs(s, n, o), l = Ps(r, n, o);
  return Ms(l, n, o);
}
const Bs = 50;
class Es {
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
      const n = 2 * e + 1, o = 2 * e + 2;
      let s = e;
      if (n < i && (this.arr[n]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = n), o < i && (this.arr[o]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = o), s === e) return;
      [this.arr[s], this.arr[e]] = [this.arr[e], this.arr[s]], e = s;
    }
  }
}
function Rs(t, e, i) {
  const [n, o] = e, [s, r] = i;
  if (n < 0 || o < 0 || n >= t.cols || o >= t.rows || s < 0 || r < 0 || s >= t.cols || r >= t.rows) return null;
  if (n === s && o === r) return [[n, o]];
  const l = t.cols * t.rows, a = new Float32Array(l);
  a.fill(1 / 0);
  const d = new Int16Array(l), p = new Int16Array(l);
  d.fill(-1), p.fill(-1);
  const h = new Uint8Array(l), u = new Uint8Array(l), f = o * t.cols + n;
  a[f] = 0;
  const g = new Es();
  g.push({ col: n, row: o, f: $i(n, o, s, r) });
  const b = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const v = g.pop(), { col: m, row: $ } = v, x = $ * t.cols + m;
    if (!u[x]) {
      if (u[x] = 1, m === s && $ === r)
        return Ds(t, d, p, i);
      for (const [k, M, F] of b) {
        const E = m + k, A = $ + M;
        if (E < 0 || A < 0 || E >= t.cols || A >= t.rows) continue;
        const R = A * t.cols + E;
        if (u[R]) continue;
        const O = As(t, E, A), I = h[x] && h[x] !== F ? Bs : 0, L = (a[x] ?? 1 / 0) + O + I;
        if (L < (a[R] ?? 1 / 0)) {
          a[R] = L, d[R] = m, p[R] = $, h[R] = F;
          const z = L + $i(E, A, s, r);
          g.push({ col: E, row: A, f: z });
        }
      }
    }
  }
  return null;
}
function $i(t, e, i, n) {
  return Math.abs(t - i) + Math.abs(e - n);
}
function Ds(t, e, i, n) {
  const o = [];
  let s = n[0], r = n[1];
  for (; s !== -1 && r !== -1; ) {
    o.push([s, r]);
    const l = r * t.cols + s, a = e[l] ?? -1, d = i[l] ?? -1;
    if (a === s && d === r || (s = a, r = d, s < 0 || r < 0)) break;
  }
  return o.reverse(), o[0]?.[0] === -1 && o.shift(), o;
}
function Ls(t) {
  if (t.length <= 2) return [...t];
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i++) {
    const n = t[i - 1], o = t[i], s = t[i + 1], r = o[0] - n[0], l = o[1] - n[1], a = s[0] - o[0], d = s[1] - o[1];
    r * d - l * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(l) === Math.sign(d) || e.push(o);
  }
  return e.push(t[t.length - 1]), e;
}
function Hs(t, e, i) {
  const n = _i(e, t), o = _i(i, t), s = Rs(t, n, o);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: Ls(s).slice(1, -1).map((d) => Os(d, t)), edgesUsable: !0 };
}
function _i(t, e) {
  const i = Ai(Math.floor(t.x / 100 * e.cols), 0, e.cols - 1), n = Ai(Math.floor(t.y / 100 * e.rows), 0, e.rows - 1);
  return [i, n];
}
function Os(t, e) {
  return {
    x: (t[0] + 0.5) / e.cols * 100,
    y: (t[1] + 0.5) / e.rows * 100
  };
}
function Ai(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
const We = /* @__PURE__ */ new Map();
async function Ci(t, e = {}) {
  const i = performance.now(), n = e.cellSize ?? Ft, o = `${t.imageUrl}|${n}`, s = We.has(o);
  let r = null;
  try {
    r = await Ts(o, t.imageUrl, n);
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
  const { waypoints: l, edgesUsable: a } = Hs(r, t.from, t.to);
  return {
    waypoints: l,
    cached: s,
    edgesUsable: a,
    elapsedMs: performance.now() - i
  };
}
async function zs(t) {
  if (!t) return null;
  try {
    const e = await Zi(t);
    return Yi(e, e.naturalWidth, e.naturalHeight);
  } catch {
    return null;
  }
}
function Ts(t, e, i) {
  const n = We.get(t);
  if (n) return n;
  const o = Gs(e, i).catch((s) => {
    throw We.delete(t), s;
  });
  return We.set(t, o), o;
}
async function Gs(t, e) {
  const i = await Zi(t);
  await Si();
  const n = Ns(i, i.naturalWidth, i.naturalHeight);
  return await Si(), $s(n, e);
}
function Zi(t) {
  return new Promise((e, i) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => e(n), n.onerror = () => i(new Error(`Failed to load background image: ${t}`)), n.src = t;
  });
}
function Si() {
  return new Promise((t) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(t, 0)) : setTimeout(t, 0);
  });
}
const Xi = "ZnVuY3Rpb24gZCh0LCBuID0gOCkgewogIGNvbnN0IG8gPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG4pKSwgYyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0LndpZHRoIC8gbykpLCByID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHQuaGVpZ2h0IC8gbykpLCBzID0gbmV3IFVpbnQxNkFycmF5KGMgKiByKTsKICBmb3IgKGxldCBlID0gMDsgZSA8IHI7IGUrKykgewogICAgY29uc3QgbCA9IGUgKiBvLCBhID0gTWF0aC5taW4odC5oZWlnaHQsIGwgKyBvKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBpICogbywgdSA9IE1hdGgubWluKHQud2lkdGgsIGYgKyBvKTsKICAgICAgbGV0IGggPSAwOwogICAgICBmb3IgKGxldCBwID0gbDsgcCA8IGE7IHArKykgewogICAgICAgIGNvbnN0IEUgPSBwICogdC53aWR0aDsKICAgICAgICBmb3IgKGxldCB5ID0gZjsgeSA8IHU7IHkrKykgewogICAgICAgICAgY29uc3QgbSA9IHQuZGF0YVtFICsgeV0gPz8gMDsKICAgICAgICAgIG0gPiBoICYmIChoID0gbSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGNvbnN0IHggPSAyNTUgLSBoOwogICAgICBzW2UgKiBjICsgaV0gPSB4IDwgMSA/IDEgOiB4OwogICAgfQogIH0KICByZXR1cm4geyBjb2xzOiBjLCByb3dzOiByLCBjZWxsU2l6ZTogbywgZGF0YTogcyB9Owp9CmZ1bmN0aW9uIFAodCwgbiwgbykgewogIHJldHVybiBvICogdC5jb2xzICsgbjsKfQpmdW5jdGlvbiBSKHQsIG4sIG8pIHsKICByZXR1cm4gbiA8IDAgfHwgbyA8IDAgfHwgbiA+PSB0LmNvbHMgfHwgbyA+PSB0LnJvd3MgPyAyNTUgOiB0LmRhdGFbUCh0LCBuLCBvKV0gPz8gMjU1Owp9CmNvbnN0IE4gPSA1MDsKY2xhc3MgayB7CiAgY29uc3RydWN0b3IoKSB7CiAgICB0aGlzLmFyciA9IFtdOwogIH0KICBwdXNoKG4pIHsKICAgIHRoaXMuYXJyLnB1c2gobiksIHRoaXMuYnViYmxlVXAodGhpcy5hcnIubGVuZ3RoIC0gMSk7CiAgfQogIHBvcCgpIHsKICAgIGlmICh0aGlzLmFyci5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IG4gPSB0aGlzLmFyclswXSwgbyA9IHRoaXMuYXJyLnBvcCgpOwogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aCA+IDAgJiYgKHRoaXMuYXJyWzBdID0gbywgdGhpcy5zaW5rRG93bigwKSksIG47CiAgfQogIGdldCBzaXplKCkgewogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDsKICB9CiAgYnViYmxlVXAobikgewogICAgZm9yICg7IG4gPiAwOyApIHsKICAgICAgY29uc3QgbyA9IG4gLSAxID4+IDE7CiAgICAgIGlmICgodGhpcy5hcnJbb10/LmYgPz8gMCkgPD0gKHRoaXMuYXJyW25dPy5mID8/IDApKSByZXR1cm47CiAgICAgIFt0aGlzLmFycltvXSwgdGhpcy5hcnJbbl1dID0gW3RoaXMuYXJyW25dLCB0aGlzLmFycltvXV0sIG4gPSBvOwogICAgfQogIH0KICBzaW5rRG93bihuKSB7CiAgICBjb25zdCBvID0gdGhpcy5hcnIubGVuZ3RoOwogICAgZm9yICg7IDsgKSB7CiAgICAgIGNvbnN0IGMgPSAyICogbiArIDEsIHIgPSAyICogbiArIDI7CiAgICAgIGxldCBzID0gbjsKICAgICAgaWYgKGMgPCBvICYmICh0aGlzLmFycltjXT8uZiA/PyAwKSA8ICh0aGlzLmFycltzXT8uZiA/PyAwKSAmJiAocyA9IGMpLCByIDwgbyAmJiAodGhpcy5hcnJbcl0/LmYgPz8gMCkgPCAodGhpcy5hcnJbc10/LmYgPz8gMCkgJiYgKHMgPSByKSwgcyA9PT0gbikgcmV0dXJuOwogICAgICBbdGhpcy5hcnJbc10sIHRoaXMuYXJyW25dXSA9IFt0aGlzLmFycltuXSwgdGhpcy5hcnJbc11dLCBuID0gczsKICAgIH0KICB9Cn0KZnVuY3Rpb24geih0LCBuLCBvKSB7CiAgY29uc3QgW2MsIHJdID0gbiwgW3MsIGVdID0gbzsKICBpZiAoYyA8IDAgfHwgciA8IDAgfHwgYyA+PSB0LmNvbHMgfHwgciA+PSB0LnJvd3MgfHwgcyA8IDAgfHwgZSA8IDAgfHwgcyA+PSB0LmNvbHMgfHwgZSA+PSB0LnJvd3MpIHJldHVybiBudWxsOwogIGlmIChjID09PSBzICYmIHIgPT09IGUpIHJldHVybiBbW2MsIHJdXTsKICBjb25zdCBsID0gdC5jb2xzICogdC5yb3dzLCBhID0gbmV3IEZsb2F0MzJBcnJheShsKTsKICBhLmZpbGwoMSAvIDApOwogIGNvbnN0IGkgPSBuZXcgSW50MTZBcnJheShsKSwgZiA9IG5ldyBJbnQxNkFycmF5KGwpOwogIGkuZmlsbCgtMSksIGYuZmlsbCgtMSk7CiAgY29uc3QgdSA9IG5ldyBVaW50OEFycmF5KGwpLCBoID0gbmV3IFVpbnQ4QXJyYXkobCksIHggPSByICogdC5jb2xzICsgYzsKICBhW3hdID0gMDsKICBjb25zdCBwID0gbmV3IGsoKTsKICBwLnB1c2goeyBjb2w6IGMsIHJvdzogciwgZjogSShjLCByLCBzLCBlKSB9KTsKICBjb25zdCBFID0gWwogICAgWzEsIDAsIDFdLAogICAgWy0xLCAwLCAyXSwKICAgIFswLCAxLCAzXSwKICAgIFswLCAtMSwgNF0KICBdOwogIGZvciAoOyBwLnNpemUgPiAwOyApIHsKICAgIGNvbnN0IHkgPSBwLnBvcCgpLCB7IGNvbDogbSwgcm93OiBNIH0gPSB5LCB3ID0gTSAqIHQuY29scyArIG07CiAgICBpZiAoIWhbd10pIHsKICAgICAgaWYgKGhbd10gPSAxLCBtID09PSBzICYmIE0gPT09IGUpCiAgICAgICAgcmV0dXJuIFgodCwgaSwgZiwgbyk7CiAgICAgIGZvciAoY29uc3QgW0wsIGcsIF9dIG9mIEUpIHsKICAgICAgICBjb25zdCBDID0gbSArIEwsIGIgPSBNICsgZzsKICAgICAgICBpZiAoQyA8IDAgfHwgYiA8IDAgfHwgQyA+PSB0LmNvbHMgfHwgYiA+PSB0LnJvd3MpIGNvbnRpbnVlOwogICAgICAgIGNvbnN0IEEgPSBiICogdC5jb2xzICsgQzsKICAgICAgICBpZiAoaFtBXSkgY29udGludWU7CiAgICAgICAgY29uc3QgRCA9IFIodCwgQywgYiksIEYgPSB1W3ddICYmIHVbd10gIT09IF8gPyBOIDogMCwgVSA9IChhW3ddID8/IDEgLyAwKSArIEQgKyBGOwogICAgICAgIGlmIChVIDwgKGFbQV0gPz8gMSAvIDApKSB7CiAgICAgICAgICBhW0FdID0gVSwgaVtBXSA9IG0sIGZbQV0gPSBNLCB1W0FdID0gXzsKICAgICAgICAgIGNvbnN0IE8gPSBVICsgSShDLCBiLCBzLCBlKTsKICAgICAgICAgIHAucHVzaCh7IGNvbDogQywgcm93OiBiLCBmOiBPIH0pOwogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICByZXR1cm4gbnVsbDsKfQpmdW5jdGlvbiBJKHQsIG4sIG8sIGMpIHsKICByZXR1cm4gTWF0aC5hYnModCAtIG8pICsgTWF0aC5hYnMobiAtIGMpOwp9CmZ1bmN0aW9uIFgodCwgbiwgbywgYykgewogIGNvbnN0IHIgPSBbXTsKICBsZXQgcyA9IGNbMF0sIGUgPSBjWzFdOwogIGZvciAoOyBzICE9PSAtMSAmJiBlICE9PSAtMTsgKSB7CiAgICByLnB1c2goW3MsIGVdKTsKICAgIGNvbnN0IGwgPSBlICogdC5jb2xzICsgcywgYSA9IG5bbF0gPz8gLTEsIGkgPSBvW2xdID8/IC0xOwogICAgaWYgKGEgPT09IHMgJiYgaSA9PT0gZSB8fCAocyA9IGEsIGUgPSBpLCBzIDwgMCB8fCBlIDwgMCkpIGJyZWFrOwogIH0KICByZXR1cm4gci5yZXZlcnNlKCksIHJbMF0/LlswXSA9PT0gLTEgJiYgci5zaGlmdCgpLCByOwp9CmNvbnN0IFogPSAzMDsKZnVuY3Rpb24gdih0LCBuLCBvKSB7CiAgY29uc3QgYyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuICogbyk7CiAgZm9yIChsZXQgciA9IDAsIHMgPSAwOyByIDwgdC5sZW5ndGg7IHIgKz0gNCwgcysrKSB7CiAgICBjb25zdCBlID0gdFtyXSA/PyAwLCBsID0gdFtyICsgMV0gPz8gMCwgYSA9IHRbciArIDJdID8/IDA7CiAgICBjW3NdID0gMC4yMTI2ICogZSArIDAuNzE1MiAqIGwgKyAwLjA3MjIgKiBhOwogIH0KICByZXR1cm4gYzsKfQpmdW5jdGlvbiBHKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHQubGVuZ3RoKTsKICBmb3IgKGxldCBzID0gMDsgcyA8IG87IHMrKykgewogICAgY29uc3QgZSA9IHMgKiBuOwogICAgZm9yIChsZXQgbCA9IDA7IGwgPCBuOyBsKyspIHsKICAgICAgY29uc3QgYSA9IHRbZSArIE1hdGgubWF4KDAsIGwgLSAxKV0gPz8gMCwgaSA9IHRbZSArIGxdID8/IDAsIGYgPSB0W2UgKyBNYXRoLm1pbihuIC0gMSwgbCArIDEpXSA/PyAwOwogICAgICBjW2UgKyBsXSA9IGEgKyAyICogaSArIGYgPj4gMjsKICAgIH0KICB9CiAgY29uc3QgciA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0Lmxlbmd0aCk7CiAgZm9yIChsZXQgcyA9IDA7IHMgPCBvOyBzKyspIHsKICAgIGNvbnN0IGUgPSBzICogbiwgbCA9IE1hdGgubWF4KDAsIHMgLSAxKSAqIG4sIGEgPSBNYXRoLm1pbihvIC0gMSwgcyArIDEpICogbjsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBjW2wgKyBpXSA/PyAwLCB1ID0gY1tlICsgaV0gPz8gMCwgaCA9IGNbYSArIGldID8/IDA7CiAgICAgIHJbZSArIGldID0gZiArIDIgKiB1ICsgaCA+PiAyOwogICAgfQogIH0KICByZXR1cm4gcjsKfQpmdW5jdGlvbiBIKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4gKiBvKTsKICBmb3IgKGxldCByID0gMTsgciA8IG8gLSAxOyByKyspIHsKICAgIGNvbnN0IHMgPSAociAtIDEpICogbiwgZSA9IHIgKiBuLCBsID0gKHIgKyAxKSAqIG47CiAgICBmb3IgKGxldCBhID0gMTsgYSA8IG4gLSAxOyBhKyspIHsKICAgICAgY29uc3QgaSA9IHRbcyArIChhIC0gMSldID8/IDAsIGYgPSB0W3MgKyBhXSA/PyAwLCB1ID0gdFtzICsgKGEgKyAxKV0gPz8gMCwgaCA9IHRbZSArIChhIC0gMSldID8/IDAsIHggPSB0W2UgKyAoYSArIDEpXSA/PyAwLCBwID0gdFtsICsgKGEgLSAxKV0gPz8gMCwgRSA9IHRbbCArIGFdID8/IDAsIHkgPSB0W2wgKyAoYSArIDEpXSA/PyAwLCBtID0gLWkgLSAyICogaCAtIHAgKyB1ICsgMiAqIHggKyB5LCBNID0gLWkgLSAyICogZiAtIHUgKyBwICsgMiAqIEUgKyB5OwogICAgICBsZXQgdyA9IE1hdGguc3FydChtICogbSArIE0gKiBNKTsKICAgICAgdyA8IFogJiYgKHcgPSAwKSwgdyA+IDI1NSAmJiAodyA9IDI1NSksIGNbZSArIGFdID0gdzsKICAgIH0KICB9CiAgcmV0dXJuIHsgd2lkdGg6IG4sIGhlaWdodDogbywgZGF0YTogYyB9Owp9CmZ1bmN0aW9uIFcodCkgewogIGlmICh0Lmxlbmd0aCA8PSAyKSByZXR1cm4gWy4uLnRdOwogIGNvbnN0IG4gPSBbdFswXV07CiAgZm9yIChsZXQgbyA9IDE7IG8gPCB0Lmxlbmd0aCAtIDE7IG8rKykgewogICAgY29uc3QgYyA9IHRbbyAtIDFdLCByID0gdFtvXSwgcyA9IHRbbyArIDFdLCBlID0gclswXSAtIGNbMF0sIGwgPSByWzFdIC0gY1sxXSwgYSA9IHNbMF0gLSByWzBdLCBpID0gc1sxXSAtIHJbMV07CiAgICBlICogaSAtIGwgKiBhID09PSAwICYmIE1hdGguc2lnbihlKSA9PT0gTWF0aC5zaWduKGEpICYmIE1hdGguc2lnbihsKSA9PT0gTWF0aC5zaWduKGkpIHx8IG4ucHVzaChyKTsKICB9CiAgcmV0dXJuIG4ucHVzaCh0W3QubGVuZ3RoIC0gMV0pLCBuOwp9CmZ1bmN0aW9uIGoodCwgbiwgbywgYywgciwgcyA9IDgpIHsKICBjb25zdCBlID0gdih0LCBuLCBvKSwgbCA9IEcoZSwgbiwgbyksIGEgPSBIKGwsIG4sIG8pLCBpID0gZChhLCBzKTsKICByZXR1cm4gcShpLCBjLCByKTsKfQpmdW5jdGlvbiBxKHQsIG4sIG8pIHsKICBjb25zdCBjID0gUyhuLCB0KSwgciA9IFMobywgdCksIHMgPSB6KHQsIGMsIHIpOwogIHJldHVybiAhcyB8fCBzLmxlbmd0aCA8IDIgPyB7IHdheXBvaW50czogW10sIGVkZ2VzVXNhYmxlOiAhMCB9IDogeyB3YXlwb2ludHM6IFcocykuc2xpY2UoMSwgLTEpLm1hcCgoaSkgPT4gQihpLCB0KSksIGVkZ2VzVXNhYmxlOiAhMCB9Owp9CmZ1bmN0aW9uIFModCwgbikgewogIGNvbnN0IG8gPSBUKE1hdGguZmxvb3IodC54IC8gMTAwICogbi5jb2xzKSwgMCwgbi5jb2xzIC0gMSksIGMgPSBUKE1hdGguZmxvb3IodC55IC8gMTAwICogbi5yb3dzKSwgMCwgbi5yb3dzIC0gMSk7CiAgcmV0dXJuIFtvLCBjXTsKfQpmdW5jdGlvbiBCKHQsIG4pIHsKICByZXR1cm4gewogICAgeDogKHRbMF0gKyAwLjUpIC8gbi5jb2xzICogMTAwLAogICAgeTogKHRbMV0gKyAwLjUpIC8gbi5yb3dzICogMTAwCiAgfTsKfQpmdW5jdGlvbiBUKHQsIG4sIG8pIHsKICByZXR1cm4gdCA8IG4gPyBuIDogdCA+IG8gPyBvIDogdDsKfQpzZWxmLm9ubWVzc2FnZSA9ICh0KSA9PiB7CiAgY29uc3QgeyByZ2JhOiBuLCB3aWR0aDogbywgaGVpZ2h0OiBjLCBmcm9tUG9zOiByLCB0b1BvczogcywgY2VsbFNpemU6IGUgfSA9IHQuZGF0YSwgbCA9IHBlcmZvcm1hbmNlLm5vdygpOwogIHRyeSB7CiAgICBjb25zdCBhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4pLCBpID0gZSA/PyA4LCB7IHdheXBvaW50czogZiwgZWRnZXNVc2FibGU6IHUgfSA9IGooYSwgbywgYywgciwgcywgaSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgd2F5cG9pbnRzOiBmLAogICAgICBlZGdlc1VzYWJsZTogdSwKICAgICAgZWxhcHNlZE1zOiBwZXJmb3JtYW5jZS5ub3coKSAtIGwKICAgIH0pOwogIH0gY2F0Y2ggKGEpIHsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB3YXlwb2ludHM6IFtdLAogICAgICBlZGdlc1VzYWJsZTogITEsCiAgICAgIGVsYXBzZWRNczogcGVyZm9ybWFuY2Uubm93KCkgLSBsLAogICAgICBlcnJvcjogYSBpbnN0YW5jZW9mIEVycm9yID8gYS5tZXNzYWdlIDogU3RyaW5nKGEpCiAgICB9KTsKICB9Cn07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhmaW5kaW5nLndvcmtlci1CUHhaVndVTS5qcy5tYXAK", Ws = (t) => Uint8Array.from(atob(t), (e) => e.charCodeAt(0)), Ii = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Ws(Xi)], { type: "text/javascript;charset=utf-8" });
function Us(t) {
  let e;
  try {
    if (e = Ii && (self.URL || self.webkitURL).createObjectURL(Ii), !e) throw "";
    const i = new Worker(e, {
      type: "module",
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Xi,
      {
        type: "module",
        name: t?.name
      }
    );
  }
}
var Ks = Object.defineProperty, js = Object.getOwnPropertyDescriptor, D = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? js(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (o = (n ? r(e, i, o) : r(o)) || o);
  return n && o && Ks(e, i, o), o;
};
let N = class extends ne {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.inlineRename = null, this.canUndo = !1, this.nodeLabelInputRef = Z(), this.flowIdInputRef = Z(), this.overlayIdInputRef = Z(), this._pendingInspectorLabelFocus = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.flowEndpointPathfindingFlowId = null, this.flowEndpointError = null, this._pathWorkerPending = !1, this._pathPendingSelection = null, this.selectorType = "", this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1, this._loadedImageUrl = "", this.spaceHeld = !1, this.panPointerId = null, this.stageRef = Z(), this.canvasRef = Z(), this.editorFxSvgRef = Z(), this.editorNodeFx = new Vi(), this._editorFxRaf = null, this.undoStack = new Go((t) => this.applyConfig(
      t,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (t) => {
      if (!this.config) return;
      const e = t.target.value, i = this.config, n = Jo(i, e);
      this.pushPatch(i, n, "edit default background");
    }, this.onWeatherStateRemove = (t) => {
      if (!this.config) return;
      const e = this.config, i = is(e, t);
      this.pushPatch(e, i, `remove weather state ${t}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const t = new Set(Object.keys(this.config.background.weather_states ?? {})), e = N.KNOWN_WEATHER_STATES.find((o) => !t.has(o)) ?? "custom", i = this.config, n = pi(i, e, "");
      this.pushPatch(i, n, `add weather state ${e}`);
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: t, toNodeId: e, waypoints: i } = this.suggestPreview, n = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), o = this.config, s = o.flows.find(
        (a) => a.from_node === t && a.to_node === e
      );
      let r, l;
      if (s)
        l = s.id, r = {
          ...o,
          flows: o.flows.map(
            (a) => a.id === s.id ? { ...a, waypoints: i.map((d) => ({ x: d.x, y: d.y })) } : a
          )
        };
      else {
        const { config: a, flow: d } = di(o, t, e, n);
        l = d.id, r = {
          ...a,
          flows: a.flows.map(
            (p) => p.id === d.id ? { ...p, waypoints: i.map((h) => ({ x: h.x, y: h.y })) } : p
          )
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(o, r, `suggest-path ${l}`), this.selectedFlowId = l;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (t) => {
      if (!(!this.config || t.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(t);
          if (!i) return;
          const n = this.config, { config: o, node: s } = Ko(n, i, c("editor.inspector.newNodeDefaultLabel"));
          this.pushPatch(n, o, `add node ${s.id}`), this.pending = null;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const i = this.pointerToPercent(t);
          if (!i) return;
          const n = {
            type: "custom",
            position: i,
            size: { width: 20, height: 15 },
            card: { type: "entity", entity: "sensor.example_sensor" }
          }, o = this.config, { config: s, overlay: r } = os(o, n);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(o, s, `add overlay ${r.id}`), this.pending = null;
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
      const n = e.dataset.segmentIndex, o = n !== void 0 ? Number(n) : NaN;
      if (t.shiftKey && Number.isFinite(o)) {
        const s = this.pointerToPercent(t);
        if (!s) return;
        const r = this.config, l = li(r, i, o, s);
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
          const n = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), o = this.config, { config: s, flow: r } = di(o, this.pending.fromId, i, n);
          this.pushPatch(o, s, `add flow ${r.id}`), this.pending = null;
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
      const n = (this.config.overlays ?? []).find((s) => s.id === i);
      if (!n) return;
      const o = { ...n.size ?? { width: 20, height: 15 } };
      e.setPointerCapture(t.pointerId), this.dragPointerId = t.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: i,
        startSize: o,
        startPx: { x: t.clientX, y: t.clientY }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (t) => {
      t.preventDefault(), t.stopPropagation();
      const i = t.currentTarget.dataset.nodeId;
      i && window.confirm(c("editor.inspector.deleteNodeContextConfirm", i)) && this.removeNode(i);
    }, this.onWaypointContextMenu = (t) => {
      if (t.preventDefault(), t.stopPropagation(), !this.config) return;
      const e = t.currentTarget, i = e.dataset.flowId, n = Number(e.dataset.waypointIndex);
      if (!i || !Number.isFinite(n)) return;
      const o = this.config, s = ci(o, i, n);
      this.pushPatch(o, s, `delete waypoint ${n} of ${i}`);
    }, this.stopClick = (t) => {
      t.stopPropagation();
    }, this.onHandlePointerDown = (t) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const e = t.currentTarget, i = e.dataset.waypointIndex, n = e.dataset.flowId, o = e.dataset.nodeId, s = e.dataset.overlayId;
      let r = null;
      if (o)
        if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(o)) {
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
          r = { kind: "node", id: o };
      else s && !e.classList.contains("overlay-resize") ? r = { kind: "overlay", id: s } : n && i !== void 0 && (r = { kind: "waypoint", flowId: n, index: Number(i) });
      r && (e.setPointerCapture(t.pointerId), this.dragPointerId = t.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragStartPx = { x: t.clientX, y: t.clientY }, this.dragMoved = !1, this.dragShiftHeld = t.shiftKey);
    }, this.onHandlePointerMove = (t) => {
      if (this.dragPointerId !== t.pointerId || !this.dragTarget || !this.config) return;
      const e = this.dragTarget;
      if (this.dragShiftHeld = t.shiftKey, e.kind === "overlay-resize") {
        const o = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (t.clientX - e.startPx.x) / this.scale, l = (t.clientY - e.startPx.y) / this.scale, a = r / o * 100, d = l / s * 100;
        let p = e.startSize.width + a, h = e.startSize.height + d;
        this.dragShiftHeld && (p = Math.round(p), h = Math.round(h)), this.dragMoved = !0, this.config = ui(this.config, e.id, { width: p, height: h });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const o = t.clientX - this.dragStartPx.x, s = t.clientY - this.dragStartPx.y;
        (Math.abs(o) > 4 || Math.abs(s) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const i = this.pointerToPercent(t);
      if (!i) return;
      const n = this.dragShiftHeld ? { x: H(Oe(i.x)), y: H(Oe(i.y)) } : i;
      if (e.kind === "node")
        this.config = st(this.config, e.id, n);
      else if (e.kind === "node-bulk") {
        const o = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (t.clientX - e.startPx.x) / this.scale, l = (t.clientY - e.startPx.y) / this.scale, a = r / o * 100, d = l / s * 100, p = /* @__PURE__ */ new Map();
        for (const [h, u] of e.startPositions) {
          const f = this.dragShiftHeld ? Oe(u.x + a) : u.x + a, g = this.dragShiftHeld ? Oe(u.y + d) : u.y + d;
          p.set(h, { x: f, y: g });
        }
        this.config = Vo(this.config, p);
      } else e.kind === "overlay" ? this.config = rs(this.config, e.id, n) : e.kind === "waypoint" && (this.config = rt(this.config, e.flowId, e.index, n));
    }, this.onHandlePointerUp = (t) => {
      if (this.dragPointerId !== t.pointerId) return;
      const e = t.currentTarget;
      e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
      const i = this.dragStartConfig, n = this.config, o = this.dragTarget, s = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !o) return;
      if (!s && o.kind === "node") {
        const l = o.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (t.shiftKey) {
          const a = new Set(this.selectedNodeIds);
          a.has(l) ? a.delete(l) : a.add(l), this.selectedNodeIds = a, this.selectedNodeId = a.size === 1 ? Array.from(a)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([l]), this.selectedNodeId = l, this.selectedFlowId = null, this.selectedOverlayId = null;
        return;
      }
      if (!s || !i || !n || i === n) return;
      let r;
      switch (o.kind) {
        case "node":
          r = `move node ${o.id}`;
          break;
        case "node-bulk":
          r = `move ${o.ids.length} nodes`;
          break;
        case "overlay":
          r = `move overlay ${o.id}`;
          break;
        case "overlay-resize":
          r = `resize overlay ${o.id}`;
          break;
        default:
          r = o.kind === "waypoint" ? `move waypoint ${o.index} of ${o.flowId}` : "canvas drag";
      }
      this.pushPatch(i, n, r);
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
      const i = e.getBoundingClientRect(), n = t.clientX - i.left, o = t.clientY - i.top, s = t.deltaY < 0 ? 1.25 : 0.8;
      this.adjustZoom(s, n, o);
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
      e !== this._lastLanguage && (this._lastLanguage = e, Li(e));
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
    const n = e / this.imageNaturalW, o = this.imageNaturalH * n, s = 0, r = -(o - i) / 2, l = this.fitScale;
    this.fitScale = n, this.fitPanX = s, this.fitPanY = r, this.imageLayoutReady ? (this.scale === 1 || this.scale === l) && (this.scale = n, this.panX = s, this.panY = r) : (this.scale = n, this.panX = s, this.panY = r, this.imageLayoutReady = !0);
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
      ie(Oi(t)), this.config = ye(t), ie(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
      const e = this.config?.background?.default;
      e && this.loadBackgroundImage(e), this.updateComplete.then(() => this.recalcFit());
    } catch (e) {
      ie(!1), this.errorMessage = e instanceof Error ? e.message : String(e);
    }
  }
  render() {
    if (!this.config)
      return y`
        <div class="wrap">
          <p class="hint">${c("editor.hintNoConfig")}</p>
          ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : _}
        </div>
      `;
    const t = this.config.background.default, e = this.selectedNodeIds.size >= 2, i = this.selectedNodeId ? "nodes" : this.selectedFlowId ? "flows" : this.selectedOverlayId ? "overlays" : this.selectorType, n = this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? "", o = this.imageLayoutReady && this.imageNaturalW > 0 && this.imageNaturalH > 0;
    return y`
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
              class=${`canvas-content${o ? "" : " canvas-content--pending"}`}
              style=${o ? `width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;` : "left:0;top:0;width:100%;height:100%;"}
            >
              ${t ? y`<div
                    class=${`background${o ? "" : " background--pending"}`}
                    style="background-image: url('${t}');"
                  ></div>` : _}
              ${o ? y`
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
                  ` : _}
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
              ${e ? this.renderMultiSelectToolbar() : y`
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
              .value=${n}
              @change=${(s) => {
      const r = s.target.value;
      r && (i === "nodes" ? (this.selectedNodeId = r, this.selectedNodeIds = /* @__PURE__ */ new Set([r]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = r, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = r, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null), this._pendingInspectorLabelFocus = !0);
    }}
            >
              <option value="">${c(i ? "editor.toolbar.selectElement" : "editor.toolbar.selectElementDash")}</option>
              ${i === "nodes" ? this.config.nodes.map((s) => y`
                <option value=${s.id}>${s.label ?? s.id}</option>
              `) : _}
              ${i === "flows" ? this.config.flows.map((s) => y`
                <option value=${s.id}>${s.id}</option>
              `) : _}
              ${i === "overlays" ? (this.config.overlays ?? []).map((s, r) => y`
                <option value=${s.id ?? String(r)}>${c("editor.canvas.overlayOption", r, s.id ? c("editor.canvas.overlayOptionIdPart", s.id) : "")}</option>
              `) : _}
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
    if (!this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return _;
    const e = new Map(this.config.nodes.map((p) => [p.id, p])), i = e.get(t.from_node), n = e.get(t.to_node);
    if (!i || !n) return _;
    const o = [i.position, ...t.waypoints, n.position], s = t.id === this.selectedFlowId, r = { width: this.imageNaturalW, height: this.imageNaturalH }, l = ve(o, r, t.line_style ?? "corner");
    if (!l) return _;
    const a = t.color ?? "rgba(255,255,255,0.8)", d = [];
    for (let p = 0; p < o.length - 1; p++) {
      const h = o[p], u = o[p + 1];
      if (!h || !u) continue;
      const f = this.pct2px(h), g = this.pct2px(u);
      d.push(zt`
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
    return zt`
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
        const n = this.pct2px(e);
        return y`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${c("aria.waypointHandle", i, t.id)}
          data-flow-id=${t.id}
          data-waypoint-index=${i}
          style=${`left: ${n.x}px; top: ${n.y}px;`}
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
    const e = t.id === this.selectedOverlayId, i = t.size?.width ?? 14, n = t.size?.height ?? 8, o = this.pct2px(t.position), s = i / 100 * this.imageNaturalW, r = n / 100 * this.imageNaturalH, l = this.inlineRename?.kind === "overlay" && this.inlineRename.id === t.id;
    return y`
      <div
        class=${`overlay-handle overlay-wrapper ${e ? "selected" : ""} overlay-${t.type}`}
        role="button"
        tabindex="0"
        aria-label=${c("aria.overlayHandle", t.id)}
        aria-selected=${e ? "true" : "false"}
        data-overlay-id=${t.id}
        style=${`left: ${o.x}px; top: ${o.y}px; width: ${s}px; height: ${r}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip" @dblclick=${(a) => this.onOverlayChipDblClick(a, t)}>
          ${l ? y`<input
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
              />` : y`<span>${t.id}<span class="overlay-type-badge">${t.type}</span></span>`}
        </div>
        ${e ? y`<div
              class="overlay-resize"
              data-overlay-id=${t.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : _}
      </div>
    `;
  }
  renderHandle(t) {
    const e = this.selectedNodeIds.has(t.id), i = e && this.selectedNodeIds.size === 1, n = e && this.selectedNodeIds.size > 1, o = e ? Array.from(this.selectedNodeIds).indexOf(t.id) : -1, s = t.visible === !1, r = this.inlineRename?.kind === "node" && this.inlineRename.id === t.id, l = this.pct2px(t.position);
    return y`
      <div
        class=${`handle ${i ? "selected" : ""} ${n ? "multi-selected" : ""} ${e ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
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
        ${r ? y`<input
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
            />` : t.label ? y`<span class="handle-label" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, t)}
                >${t.label}</span
              >` : y`<span class="handle-id" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, t)}
                >${t.id}</span
              >`}
        ${e && this.selectedNodeIds.size >= 2 ? y`<span class="suggest-badge">${o + 1}</span>` : _}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(a) => {
      if (a.stopPropagation(), !this.config) return;
      const d = this.config, p = gi(d, t.id, s);
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
    const n = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), o = i?.includeDomains ?? [], s = i?.placeholder ?? c("editor.inspector.entityPickerFallbackPlaceholder");
    if (n) {
      const p = (h) => {
        h.stopPropagation(), e((h.detail?.value ?? "").trim());
      };
      return y`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${t}
          .includeDomains=${o}
          @value-changed=${p}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, l = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, a = Object.keys(r).filter((p) => {
      if (o.length === 0) return !0;
      const h = p.split(".")[0];
      return !!h && o.includes(h);
    }).sort();
    return y`
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
        ${a.map((p) => y`<option value=${p}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return _;
    if (this.selectedNodeId) {
      const t = this.config.nodes.find((i) => i.id === this.selectedNodeId);
      if (!t) return _;
      const e = (i, n) => {
        if (!this.config) return;
        const o = this.config, s = {
          ...o,
          nodes: o.nodes.map((r) => r.id === t.id ? { ...r, ...i } : r)
        };
        this.pushPatch(o, s, n);
      };
      return y`
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
        const n = i.target.value;
        e({ color: n }, `set color of ${t.id}`);
      }}
              />
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${t.visible !== !1}
                @change=${(i) => {
        if (!this.config) return;
        const n = i.target.checked, o = this.config, s = gi(o, t.id, n);
        this.pushPatch(o, s, `set visible of ${t.id}`);
      }}
              />
              <span class="node-cell-label">${c("editor.inspector.visible")}</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${t.show_value !== !1}
                @change=${(i) => {
        const n = i.target.checked;
        e({ show_value: n || void 0 }, `set show_value of ${t.id}`);
      }}
              />
              <span class="node-cell-label">${c("editor.inspector.showValue")}</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${t.show_label !== !1}
                @change=${(i) => {
        const n = i.target.checked;
        e({ show_label: n || void 0 }, `set show_label of ${t.id}`);
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
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = st(o, t.id, { x: n, y: t.position.y });
        this.pushPatch(o, s, `move ${t.id} x`);
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
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = st(o, t.id, { x: t.position.x, y: n });
        this.pushPatch(o, s, `move ${t.id} y`);
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
        const n = parseInt(i.target.value, 10);
        Number.isFinite(n) && e({ size: n }, `set size of ${t.id}`);
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
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = ds(o, t.id, n >= 1 ? void 0 : n);
        this.pushPatch(o, s, `set opacity of ${t.id}`);
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
      if (!t) return _;
      const e = this.config.flows.findIndex((i) => i.id === t.id);
      return y`
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
        const n = i.target.value;
        this.onFlowFromNodeChange(t.id, n);
      }}
              >
                ${this.config.nodes.map(
        (i) => y`<option value=${i.id} ?selected=${i.id === t.from_node}>${i.label ?? i.id}</option>`
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
        const n = i.target.value;
        this.onFlowToNodeChange(t.id, n);
      }}
              >
                ${this.config.nodes.map(
        (i) => y`<option value=${i.id} ?selected=${i.id === t.to_node}>${i.label ?? i.id}</option>`
      )}
              </select>
            </div>
            ${this.flowEndpointPathfindingFlowId === t.id ? y`<p class="hint-sub flow-endpoint-busy">
                  ${c("editor.toolbar.suggestPathFinding")}
                  <span class="suggest-path-spinner" aria-hidden="true"></span>
                </p>` : _}
            ${this.flowEndpointError && this.selectedFlowId === t.id ? y`<p class="flow-endpoint-error">${this.flowEndpointError}</p>` : _}
            <label>
              ${c("editor.inspector.entity")}
              ${this.renderEntityPicker(
        t.entity,
        (i) => this.setFlowEntity(t.id, i),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
            </label>
            ${(() => {
        const i = this.config.animation?.min_duration ?? le, n = this.config.animation?.max_duration ?? Ce, o = T(t.domain ?? this.config.domain).peak;
        return y`
                <label>
                  ${c("editor.inspector.peakValue")}
                  <input
                    type="number"
                    step="any"
                    min="0"
                    placeholder="${o}"
                    .value=${t.peak_value !== void 0 ? String(t.peak_value) : ""}
                    @change=${(s) => {
          if (!this.config) return;
          const r = s.target.value.trim(), l = this.config;
          if (r === "") {
            const p = vi(l, t.id, void 0);
            this.pushPatch(l, p, `clear peak_value ${t.id}`);
            return;
          }
          const a = parseFloat(r);
          if (!Number.isFinite(a) || a <= 0) return;
          const d = vi(l, t.id, a);
          this.pushPatch(l, d, `set peak_value ${t.id}`);
        }}
                  />
                  <span class="hint-sub">${c("editor.inspector.peakValueHelper")}</span>
                </label>
                <label>
                  ${c("editor.inspector.minDuration")}
                  <input
                    type="number"
                    min="1"
                    max="60000"
                    step="100"
                    placeholder=${c("editor.inspector.animMinMsPlaceholder", i)}
                    .value=${t.animation?.min_duration !== void 0 ? String(t.animation.min_duration) : ""}
                    @change=${(s) => {
          if (!this.config) return;
          const r = s.target.value.trim(), l = this.config;
          if (r === "") {
            const p = be(l, t.id, { min_duration: void 0 });
            this.pushPatch(l, p, `clear flow min_duration ${t.id}`);
            return;
          }
          const a = parseInt(r, 10);
          if (!Number.isFinite(a) || a <= 0) return;
          const d = be(l, t.id, { min_duration: a });
          this.pushPatch(l, d, `set flow min_duration ${t.id}`);
        }}
                  />
                </label>
                <label>
                  ${c("editor.inspector.maxDuration")}
                  <input
                    type="number"
                    min="2"
                    max="60000"
                    step="500"
                    placeholder=${c("editor.inspector.animMaxMsPlaceholder", n)}
                    .value=${t.animation?.max_duration !== void 0 ? String(t.animation.max_duration) : ""}
                    @change=${(s) => {
          if (!this.config) return;
          const r = s.target.value.trim(), l = this.config;
          if (r === "") {
            const p = be(l, t.id, { max_duration: void 0 });
            this.pushPatch(l, p, `clear flow max_duration ${t.id}`);
            return;
          }
          const a = parseInt(r, 10);
          if (!Number.isFinite(a) || a <= 0) return;
          const d = be(l, t.id, { max_duration: a });
          this.pushPatch(l, d, `set flow max_duration ${t.id}`);
        }}
                  />
                </label>
              `;
      })()}
          </fieldset>
          ${this.renderWaypointList(t)}
          <label>
            ${c("editor.inspector.lineStyle")}
            <select
              .value=${t.line_style ?? "corner"}
              @change=${(i) => {
        if (!this.config) return;
        const n = i.target.value, o = this.config, s = hs(o, t.id, n);
        this.pushPatch(o, s, `set line style of ${t.id}`);
      }}
            >
              ${lt.map(
        (i) => y`<option value=${i} ?selected=${(t.line_style ?? "corner") === i}>${i}</option>`
      )}
            </select>
          </label>
          <label>
            ${c("editor.inspector.colourOverride")}
            <div class="color-row">
              ${(() => {
        const i = T(t.domain ?? this.config.domain), n = pe(
          t,
          i,
          t.domain ?? this.config.domain,
          1,
          this.config.domain_colors,
          e >= 0 ? e : 0
        );
        return y`
                  <input
                    type="color"
                    .value=${t.color ?? n}
                    @change=${(o) => {
          if (!this.config) return;
          const s = o.target.value, r = this.config, l = fi(r, t.id, s);
          this.pushPatch(r, l, `set colour of ${t.id}`);
        }}
                  />
                  <span class="color-effective">${t.color ? c("editor.inspector.colourOverrideActive") : c("editor.inspector.colourDomainDefault")}</span>
                  ${t.color ? y`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const o = this.config, s = fi(o, t.id, void 0);
          this.pushPatch(o, s, `clear colour of ${t.id}`);
        }}>${c("editor.inspector.clearColour")}</button>` : _}
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
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = ps(o, t.id, n);
        this.pushPatch(o, s, `set opacity of ${t.id}`);
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
        const n = i.target.checked, o = this.config, s = fs(o, t.id, n);
        this.pushPatch(o, s, `${n ? "show" : "hide"} flow ${t.id}`);
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
      return t ? this.renderOverlayInspector(t) : _;
    }
    return _;
  }
  renderSpeedCurveSection(t) {
    if (!this.config) return y``;
    const e = T(t.domain ?? this.config.domain), i = Me(t, e, this.config), n = t.speed_curve_override ?? {}, o = (a, d, p) => y`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${d}${p ? y` <small>(${p})</small>` : _}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${String(a === "peak" ? e.peak : a === "min_duration" ? i.minDur : i.maxDur)}
          .value=${n[a] !== void 0 ? String(n[a]) : ""}
          @change=${(h) => {
      if (!this.config) return;
      const u = h.target.value.trim();
      if (u === "") {
        const f = {};
        for (const v of Object.keys(n))
          v !== a && (f[v] = n[v]);
        const g = this.config, b = yi(g, t.id, f);
        this.pushPatch(g, b, `update speed curve ${a} for ${t.id}`);
      } else {
        const f = parseFloat(u);
        if (!Number.isFinite(f)) return;
        const g = this.config, b = yi(g, t.id, { ...n, [a]: f });
        this.pushPatch(g, b, `update speed curve ${a} for ${t.id}`);
      }
    }}
        />
      </div>
    `, s = Me(t, e, this.config), l = [0, s.peak * 0.5, s.peak].map((a) => `${(It(a, s.peak, s.minDur, s.maxDur) / 1e3).toFixed(1)}s`);
    return y`
      <details class="speed-curve-details">
        <summary>${c("editor.inspector.speedCurveOverrideSummary")}</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            ${c("editor.inspector.speedCurveHint", e.unit_label, t.domain ?? this.config.domain)}
          </p>
          ${o("peak", c("editor.inspector.peak"), e.unit_label)}
          ${o("max_duration", c("editor.inspector.maxDuration"), c("editor.inspector.ms"))}
          ${o("min_duration", c("editor.inspector.minDuration"), c("editor.inspector.ms"))}
          <div class="speed-curve-preview">
            <span>${c("editor.inspector.previewLinearSpeed")}</span>
            <strong>${l[0]}</strong>
            /
            <strong>${l[1]}</strong>
            /
            <strong>${l[2]}</strong>
          </div>
          ${Object.keys(n).length > 0 ? y`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const a = this.config, d = bs(a, t.id);
      this.pushPatch(a, d, `reset speed curve for ${t.id}`);
    }}>${c("editor.inspector.resetToDomainDefaults")}</button>` : _}
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
      return y`
        <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        </svg>`;
    const n = i.type === "glow" && i.glow_color || e, o = i.type === "ripple" && i.ripple_color || e, s = i.type === "alert" ? i.alert_color ?? "#FF0000" : "#FF0000";
    switch (i.type) {
      case "glow": {
        const r = `fm-ed-glow-${t.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
        return y`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id=${r} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="50" cy="50" r="14" fill="${n}" filter=${`url(#${r})`} opacity="0.95">
              <animate attributeName="opacity" values="0.55;1;0.55" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      }
      case "badge":
        return y`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${e}"/>
            <circle cx="62" cy="38" r="7" fill="${i.badge_color_on ?? "#32DC50"}">
              <animate attributeName="fill" values="${i.badge_color_on ?? "#32DC50"};${i.badge_color_off ?? "#CC3333"};${i.badge_color_on ?? "#32DC50"}" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      case "ripple":
        return y`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${[0, 0.3, 0.6].map(
          (r) => y`
                <circle cx="50" cy="50" r="14" fill="none" stroke="${o}" stroke-width="2" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0" keyTimes="0;0.05;1" dur="${i.ripple_duration ?? 2e3}ms" begin="${r}s" fill="freeze"/>
                  <animate attributeName="r" values="14;56" dur="${i.ripple_duration ?? 2e3}ms" begin="${r}s" fill="freeze"/>
                </circle>`
        )}
          </svg>`;
      case "alert":
        return y`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${e}">
              <animate attributeName="fill" values="${e};${s};${e}" dur="250ms" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      default:
        return y`<svg class="node-effect-preview" viewBox="0 0 100 100"></svg>`;
    }
  }
  renderNodeEffectInspector(t, e) {
    const i = t.node_effect, n = i?.type ?? "";
    return y`
      <details class="inspector-details node-effect-details">
        <summary>${c("editor.nodeEffect.section")}</summary>
        <div class="node-effect-body">
          ${!t.entity && i ? y`<p class="hint-sub">${c("editor.nodeEffect.needsEntity")}</p>` : _}
          <div class="node-effect-type-row">
            ${this.renderNodeEffectPreviewAnim(t)}
            <label class="node-effect-type-label">
              ${c("editor.nodeEffect.type")}
              <select
                .value=${n}
                @change=${(o) => {
      const s = o.target.value;
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
                <option value="glow" ?selected=${n === "glow"}>${c("editor.nodeEffect.glow")}</option>
                <option value="badge" ?selected=${n === "badge"}>${c("editor.nodeEffect.badge")}</option>
                <option value="ripple" ?selected=${n === "ripple"}>${c("editor.nodeEffect.ripple")}</option>
                <option value="alert" ?selected=${n === "alert"}>${c("editor.nodeEffect.alert")}</option>
              </select>
            </label>
          </div>

          ${i?.type === "glow" ? y`
                <label>${c("editor.nodeEffect.glowColor")}
                  <input type="text" placeholder=${c("editor.inspector.colourDomainDefault")}
                    .value=${i.glow_color ?? ""}
                    @change=${(o) => {
      const s = o.target.value.trim();
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
                    @change=${(o) => {
      const s = parseFloat(o.target.value);
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
                    @input=${(o) => {
      const s = parseFloat(o.target.value);
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
                    @change=${(o) => {
      const s = parseFloat(o.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, peak_value: s } },
        `glow peak ${t.id}`
      );
    }}
                  />
                </label>
              ` : _}
          ${i?.type === "badge" ? y`
                <label>${c("editor.nodeEffect.badgeColorOn")}
                  <input type="color"
                    .value=${i.badge_color_on ?? "#32DC50"}
                    @change=${(o) => {
      const s = o.target.value;
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
                    @change=${(o) => {
      const s = o.target.value;
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
                    @change=${(o) => {
      const s = o.target.value.trim(), r = s === "" ? null : parseFloat(s);
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
              ` : _}
          ${i?.type === "ripple" ? y`
                <label>${c("editor.nodeEffect.rippleColor")}
                  <input type="text" placeholder=${c("editor.inspector.colourDomainDefault")}
                    .value=${i.ripple_color ?? ""}
                    @change=${(o) => {
      const s = o.target.value.trim();
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
                    @change=${(o) => {
      const s = parseInt(o.target.value, 10);
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
                    @change=${(o) => {
      const s = parseFloat(o.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, ripple_threshold: s } },
        `ripple threshold ${t.id}`
      );
    }}
                  />
                </label>
              ` : _}
          ${i?.type === "alert" ? y`
                <label>${c("editor.nodeEffect.alertThreshold")}
                  <input type="number" step="any"
                    .value=${String(i.alert_threshold ?? 0)}
                    @change=${(o) => {
      const s = parseFloat(o.target.value);
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
                    @change=${(o) => {
      const s = o.target.value;
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
                    @change=${(o) => {
      const s = o.target.value;
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
                    @change=${(o) => {
      const s = parseFloat(o.target.value);
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
                    @change=${(o) => {
      const s = parseFloat(o.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, alert_hysteresis: s } },
        `alert hysteresis ${t.id}`
      );
    }}
                  />
                </label>
              ` : _}
        </div>
      </details>
    `;
  }
  renderAnimationSection(t) {
    if (!this.config) return y``;
    const e = t.animation ?? {}, i = e.animation_style ?? "dots", n = (d) => {
      if (!this.config) return;
      const p = this.config, h = be(p, t.id, d);
      this.pushPatch(p, h, `update animation for ${t.id}`);
    }, s = !(/* @__PURE__ */ new Set(["dash", "fluid", "none"])).has(i), r = i === "trail", l = i === "dash", a = t.color ?? "#4ADE80";
    return y`
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
      n({ animation_style: d.target.value });
    }}
            >
              ${ct.map(
      (d) => y`<option value=${d} ?selected=${i === d}>${d}</option>`
    )}
            </select>
          </label>

          ${i === "fluid" ? y`<p class="hint-sub">${c("editor.inspector.fluidIgnoresParticleShape")}</p>` : _}

          ${s ? y`
            <label>${c("editor.inspector.particleShape")}
              <select
                .value=${e.particle_shape ?? "circle"}
                @change=${(d) => {
      n({ particle_shape: d.target.value });
    }}
              >
                ${dt.map(
      (d) => y`<option value=${d} ?selected=${(e.particle_shape ?? "circle") === d}>${d}</option>`
    )}
              </select>
            </label>
            ${(e.particle_shape ?? "circle") === "custom_svg" ? y`
              <label>${c("editor.inspector.svgPathLabel")}
                <input type="text"
                  placeholder=${c("editor.inspector.svgPathPlaceholder")}
                  .value=${e.custom_svg_path ?? ""}
                  @change=${(d) => {
      n({ custom_svg_path: d.target.value.trim() });
    }}
                />
                <svg class="custom-svg-preview" viewBox="-20 -20 40 40" width="40" height="40"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d=${e.custom_svg_path || "M 0 -8 L 5 8 L -5 8 Z"}
                        fill=${a} />
                </svg>
              </label>
            ` : _}
          ` : _}

          <label>${c("editor.inspector.direction")}
            <select
              .value=${e.direction ?? "auto"}
              @change=${(d) => {
      n({ direction: d.target.value });
    }}
            >
              ${pt.map(
      (d) => y`<option value=${d} ?selected=${(e.direction ?? "auto") === d}>${d}</option>`
    )}
            </select>
          </label>

          <label>${c("editor.inspector.particleSize")}
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(e.particle_size ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && n({ particle_size: p });
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
        n({ particle_count: void 0 });
        return;
      }
      const h = parseInt(p, 10);
      Number.isFinite(h) && h >= 1 && n({ particle_count: h });
    }}
            />
          </label>

          <label>${c("editor.inspector.particleSpacing")}
            <select
              .value=${e.particle_spacing ?? "even"}
              @change=${(d) => {
      n({ particle_spacing: d.target.value });
    }}
            >
              ${ut.map(
      (d) => y`<option value=${d} ?selected=${(e.particle_spacing ?? "even") === d}>${d}</option>`
    )}
            </select>
          </label>

          ${e.particle_spacing === "clustered" ? y`
            <label>${c("editor.inspector.clusterSize")}
              <input type="number" min="1" max="10" step="1"
                .value=${String(e.cluster_size ?? 3)}
                @change=${(d) => {
      const p = parseInt(d.target.value, 10);
      Number.isFinite(p) && p >= 1 && n({ cluster_size: p });
    }}
              />
            </label>
            <label>${c("editor.inspector.clusterGap")}
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(e.cluster_gap ?? 2)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && n({ cluster_gap: p });
    }}
              />
            </label>
          ` : _}

          ${e.particle_spacing === "pulse" ? y`
            <label>${c("editor.inspector.pulseFrequencyHz")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.pulse_frequency ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && n({ pulse_frequency: p });
    }}
              />
            </label>
            <label>${c("editor.inspector.pulseRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(e.pulse_ratio ?? 0.3)}
                  @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && n({ pulse_ratio: p });
    }}
                />
                <span>${(e.pulse_ratio ?? 0.3).toFixed(2)}</span>
              </div>
            </label>
          ` : _}

          ${e.particle_spacing === "wave_spacing" || e.particle_spacing === "wave_lateral" ? y`
            <label>${c("editor.inspector.waveFrequency")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.wave_frequency ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && n({ wave_frequency: p });
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
      Number.isFinite(p) && p > 0 && n({ wave_amplitude: p });
    }}
              />
            </label>
          ` : _}

          <label>${c("editor.inspector.glowIntensity")}
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(e.glow_intensity ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && n({ glow_intensity: p });
    }}
              />
              <span>${(e.glow_intensity ?? 1).toFixed(1)}</span>
            </div>
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${e.shimmer === !0}
              @change=${(d) => n({ shimmer: d.target.checked })}
            />
            ${c("editor.inspector.shimmerThreshold")}
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${e.flicker === !0}
              @change=${(d) => n({ flicker: d.target.checked })}
            />
            ${c("editor.inspector.flicker")}
          </label>

          ${r ? y`
            <label>${c("editor.inspector.trailLength")}
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(e.trail_length ?? 2)}
                  @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && n({ trail_length: p });
    }}
                />
                <span>${(e.trail_length ?? 2).toFixed(2)}×</span>
              </div>
            </label>
          ` : _}

          ${l ? y`
            <label>${c("editor.inspector.dashGapRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(e.dash_gap ?? 0.5)}
                  @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && n({ dash_gap: p });
    }}
                />
                <span>${(e.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : _}

          ${t.animation && Object.keys(t.animation).length > 0 ? y`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const d = this.config, p = ys(d, t.id);
      this.pushPatch(d, p, `reset animation for ${t.id}`);
    }}>${c("editor.inspector.resetToDefaults")}</button>` : _}
        </div>
      </details>
    `;
  }
  /**
   * Render a small inline SVG preview strip showing the current animation style.
   * Uses CSS animations (not SVG animateMotion) so it works even with no live data.
   */
  renderAnimPreview(t, e, i) {
    const n = 4 * (e.particle_size ?? 1), o = Math.min(e.particle_count ?? 3, 8);
    if (t === "none")
      return y`<line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="2" stroke-opacity="0.3"/>`;
    if (t === "dash") {
      const r = e.dash_gap ?? 0.5, l = 14, a = l * r;
      return y`
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
      return y`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (e.particle_spacing === "wave_lateral") {
      const r = Array.from({ length: o }, (l, a) => (a + 0.5) / o * 180 + 10);
      return y`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (l, a) => y`
            <circle cx=${l} cy="20" r=${n} fill=${i} opacity="0">
              <animate attributeName="cx" values="${l};190;10;${l}" dur="1.4s"
                repeatCount="indefinite" begin="${(a / o * -1.4).toFixed(2)}s"/>
              <animate attributeName="cy" values="20;${10 + (a % 2 === 0 ? 6 : -6)};20;${10 + (a % 2 === 0 ? -6 : 6)};20"
                dur="1.4s" repeatCount="indefinite" begin="${(a / o * -1.4).toFixed(2)}s"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
                repeatCount="indefinite" begin="${(a / o * -1.4).toFixed(2)}s"/>
            </circle>
          `
      )}
      `;
    }
    const s = Array.from({ length: o }, (r, l) => (l + 0.5) / o * 180 + 10);
    return y`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${s.map(
      (r, l) => y`
          <circle cx=${r} cy="20" r=${n} fill=${i} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(l / o * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(l / o * -1.4).toFixed(2)}s"/>
          </circle>
        `
    )}
    `;
  }
  renderWaypointList(t) {
    if (!this.config) return y``;
    const e = new Map(this.config.nodes.map((s) => [s.id, s])), i = e.get(t.from_node), n = e.get(t.to_node), o = () => {
      if (!this.config) return;
      const s = [
        ...i ? [i.position] : [],
        ...t.waypoints,
        ...n ? [n.position] : []
      ];
      let r = 0, l = 0;
      for (let g = 0; g < s.length - 1; g++) {
        const b = s[g], v = s[g + 1], m = Math.hypot(v.x - b.x, v.y - b.y);
        m > l && (l = m, r = g);
      }
      const a = s[r], d = s[r + 1], p = { x: (a.x + d.x) / 2, y: (a.y + d.y) / 2 }, h = r > 0 ? r - 1 + 1 : 0, u = this.config, f = li(u, t.id, h, p);
      this.pushPatch(u, f, `add waypoint to ${t.id}`);
    };
    return y`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${c("editor.inspector.waypoints")}
          <span class="waypoint-count">${t.waypoints.length}</span>
        </h4>

        ${t.waypoints.length === 0 ? y`<div class="waypoint-empty">${c("editor.inspector.waypointEmpty")}</div>` : y`
            <ul class="waypoint-list">
              ${t.waypoints.map((s, r) => y`
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
      const d = this.config, p = rt(d, t.id, r, { x: a, y: s.y });
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
      const d = this.config, p = rt(d, t.id, r, { x: s.x, y: a });
      this.pushPatch(d, p, `move waypoint ${r} of ${t.id}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${c("editor.inspector.deleteWaypointAria", r)} title=${c("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const l = this.config, a = ci(l, t.id, r);
      this.pushPatch(l, a, `delete waypoint ${r} of ${t.id}`);
    }}
                  >×</button>
                </li>
              `)}
            </ul>
          `}

        <button type="button" class="ghost full-width" aria-label=${c("editor.inspector.addWaypointOnFlowAria")} @click=${o}>
          ${c("editor.inspector.addWaypoint")}
        </button>
      </div>
    `;
  }
  renderValueGradientSection(t) {
    if (!this.config) return y``;
    const e = t.value_gradient, i = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, n = (s) => {
      if (!this.config) return;
      const r = this.config, l = xs(r, t.id, s);
      this.pushPatch(r, l, `update gradient for ${t.id}`);
    };
    let o = _;
    if (e && e.low_color && e.high_color)
      try {
        const s = Wi(
          (e.low_value + e.high_value) / 2,
          e
        ), r = `background: linear-gradient(to right, ${e.low_color}, ${s}, ${e.high_color});`;
        o = y`
          <div class="gradient-preview-bar" style=${r}></div>
          <div class="gradient-preview-labels">
            <span>${e.low_color}</span><span>${e.high_color}</span>
          </div>
        `;
      } catch {
      }
    return y`
      <div class="gradient-section">
        <h4 class="gradient-section-header">${c("editor.inspector.valueGradient")}</h4>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!e}
            @change=${(s) => {
      if (!this.config) return;
      const r = s.target.checked, l = this.config, a = r ? ws(l, t.id, i) : wi(l, t.id);
      this.pushPatch(l, a, `${r ? "enable" : "disable"} gradient for ${t.id}`);
    }}
          />
          ${c("editor.inspector.enableGradient")}
        </label>

        ${e ? y`
          <label>${c("editor.inspector.gradientEntity")}
            <input type="text" placeholder=${c("editor.inspector.gradientEntityPlaceholder")}
              .value=${e.entity}
              @change=${(s) => n({ entity: s.target.value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>${c("editor.inspector.lowValue")}
              <input type="number" step="any"
                .value=${String(e.low_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && n({ low_value: r });
    }}
              />
            </label>
            <label>${c("editor.inspector.lowColour")}
              <div class="color-row">
                <input type="color"
                  .value=${e.low_color}
                  @input=${(s) => n({ low_color: s.target.value })}
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
      Number.isFinite(r) && n({ high_value: r });
    }}
              />
            </label>
            <label>${c("editor.inspector.highColour")}
              <div class="color-row">
                <input type="color"
                  .value=${e.high_color}
                  @input=${(s) => n({ high_color: s.target.value })}
                />
                <span>${e.high_color}</span>
              </div>
            </label>
          </div>

          <label>${c("editor.inspector.applyGradientTo")}
            <select
              .value=${e.mode ?? "both"}
              @change=${(s) => {
      n({ mode: s.target.value });
    }}
            >
              <option value="flow" ?selected=${e.mode === "flow"}>${c("editor.inspector.gradientModeFlow")}</option>
              <option value="line" ?selected=${e.mode === "line"}>${c("editor.inspector.gradientModeLine")}</option>
              <option value="both" ?selected=${(e.mode ?? "both") === "both"}>${c("editor.inspector.gradientModeBoth")}</option>
            </select>
          </label>

          ${o}

          <button class="ghost" @click=${() => {
      if (!this.config) return;
      const s = this.config, r = wi(s, t.id);
      this.pushPatch(s, r, `disable gradient for ${t.id}`);
    }}>${c("editor.inspector.removeGradient")}</button>
        ` : _}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return _;
    const t = this.config.animation ?? {};
    return y`
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
      const i = parseInt(e.target.value, 10), n = this.config, o = ze(n, { fps: i });
      this.pushPatch(n, o, "set animation fps");
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
      const i = e.target.checked, n = this.config, o = ze(n, { smooth_speed: i });
      this.pushPatch(n, o, "set smooth_speed");
    }}
            />
            <span class="visibility-label">${c("editor.stateA.smoothSpeed")}</span>
            <span class="visibility-val">${t.smooth_speed !== !1 ? c("editor.inspector.on") : c("editor.inspector.off")}</span>
          </label>
          <p class="hint-sub">${c("editor.inspector.smoothSpeedHint")}</p>
          <label class="visibility-row">
            <input
              type="checkbox"
              .checked=${this.config.pause_when_hidden !== !1}
              @change=${(e) => {
      if (!this.config) return;
      const i = e.target.checked, n = this.config, o = vs(n, i);
      this.pushPatch(n, o, "set pause_when_hidden");
    }}
            />
            <span class="visibility-label">${c("editor.stateA.pauseWhenHidden")}</span>
            <span class="visibility-val">${this.config.pause_when_hidden !== !1 ? c("editor.inspector.on") : c("editor.inspector.off")}</span>
          </label>
        </div>
      </details>
    `;
  }
  renderOverlayInspector(t) {
    const e = t.size ?? { width: 20, height: 15 }, i = t.visible !== !1, n = t.opacity ?? 1;
    return y`
      <div class="inspector overlay-inspector">
        <label class="inspector-id-row">
          <span class="node-cell-label">${c("editor.inspector.overlayIdField")}</span>
          <input
            type="text"
            spellcheck="false"
            ${X(this.overlayIdInputRef)}
            .value=${t.id}
            @change=${(o) => this.onInspectorOverlayIdChange(t.id, o)}
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
              @change=${(o) => this.onOverlaySizeChange(t.id, "width", o)}
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
              @change=${(o) => this.onOverlaySizeChange(t.id, "height", o)}
            />
          </label>
        </div>
        <label class="toggle-label">
          ${c("editor.inspector.visible")}
          <input
            type="checkbox"
            .checked=${i}
            @change=${(o) => {
      if (!this.config) return;
      const s = o.target.checked, r = this.config, l = ls(r, t.id, s);
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
            .value=${String(n)}
            @change=${(o) => {
      if (!this.config) return;
      const s = parseFloat(o.target.value);
      if (!Number.isFinite(s)) return;
      const r = this.config, l = cs(r, t.id, s);
      this.pushPatch(r, l, `edit overlay ${t.id} opacity`);
    }}
          />
          <span>${Math.round(n * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(t)}
        <button class="danger" @click=${() => this.removeOverlay(t.id)}>${c("editor.inspector.deleteOverlay")}</button>
      </div>
    `;
  }
  renderCardConfigEditor(t) {
    const e = this.customConfigDraft || JSON.stringify(t.card ?? { type: "entity", entity: "sensor.example_sensor" }, null, 2);
    return y`
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
      ${this.customConfigError ? y`<div class="custom-config-error">${this.customConfigError}</div>` : _}
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
    if (!this.config) return _;
    const t = this.config.opacity ?? {}, e = (i, n, o = 1) => {
      const s = t[i] ?? o;
      return y`
        <label class="opacity-row">
          <span class="opacity-label">${n}</span>
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
        const a = this.config, d = hi(a, i, l);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const a = this.config, d = hi(a, i, l);
        this.pushPatch(a, d, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${s.toFixed(2)}</span>
        </label>
      `;
    };
    return y`
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
    if (!this.config) return _;
    const t = this.config.domain_colors ?? {}, e = this.config.domain ?? "energy", i = Ve[e] ?? Ve.generic, n = (o, s) => {
      const r = `editor.domainRoles.${e}.${o}`, l = c(r);
      return l !== r ? l : s;
    };
    return y`
      <details class="panel domain-colors-panel">
        <summary>${c("editor.inspector.domainColoursSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.domainColoursHint")}
          </p>
          ${i.roles.map((o) => {
      const s = t[o.key], r = o.default, l = n(o.key, o.label);
      return y`
              <div class="color-picker-row">
                <span class="color-picker-label">${l}</span>
                <input
                  type="color"
                  .value=${s ?? r}
                  @change=${(a) => {
        if (!this.config) return;
        const d = a.target.value, p = this.config, h = mi(p, o.key, d);
        this.pushPatch(p, h, `set domain_colors.${o.key}`);
      }}
                />
                <span class="color-picker-value">${s || c("editor.inspector.colourDefaultSuffix", r)}</span>
                ${s ? y`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, d = mi(a, o.key, void 0);
        this.pushPatch(a, d, `reset domain_colors.${o.key}`);
      }}>${c("editor.inspector.reset")}</button>` : _}
              </div>
            `;
    })}
        </div>
      </details>
    `;
  }
  renderVisibilityPanel() {
    if (!this.config) return _;
    const t = this.config.visibility ?? {}, e = (i, n) => {
      const o = t[i] !== !1;
      return y`
        <label class="visibility-row">
          <span class="visibility-label">${n}</span>
          <input
            type="checkbox"
            .checked=${o}
            @change=${(s) => {
        if (!this.config) return;
        const r = s.target.checked, l = this.config, a = gs(l, i, r);
        this.pushPatch(l, a, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${c(o ? "editor.inspector.visibilityVisible" : "editor.inspector.visibilityHidden")}</span>
        </label>
      `;
    };
    return y`
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
    if (!this.config) return _;
    const t = this.config.defaults ?? {}, e = this.config.animation ?? {}, i = this.config.domain ?? "energy", n = T(i), o = t.peak_value ?? n.peak, s = Math.round(o * 0.5886 * 10) / 10, r = (l, a, d) => {
      const p = t[l] ?? d.defaultVal;
      return y`
        <label class="defaults-row">
          <span class="defaults-label">${a}</span>
          <input
            type="number"
            min=${d.min}
            max=${d.max}
            step=${d.step}
            .value=${String(p)}
            @change=${(h) => {
        if (!this.config) return;
        const u = parseFloat(h.target.value);
        if (!Number.isFinite(u)) return;
        const f = Math.max(d.min, Math.min(d.max, u)), g = this.config, b = at(g, l, f);
        this.pushPatch(g, b, `set defaults.${l}`);
      }}
          />
          <span class="defaults-unit">${p}</span>
        </label>
      `;
    };
    return y`
      <details class="panel defaults-panel" open>
        <summary>${c("editor.inspector.defaultsSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.defaultsHint")}
          </p>
          ${r("node_radius", c("editor.stateA.nodeRadius"), { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${r("dot_radius", c("editor.stateA.dotRadius"), { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${r("line_width", c("editor.stateA.lineWidth"), { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${r("burst_trigger_ratio", c("editor.inspector.burstTriggerRatio"), { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${r("burst_sustain_ms", c("editor.inspector.burstSustainMs"), { min: 1e3, max: 3e4, step: 500, defaultVal: 5e3 })}
          ${r("burst_max_particles", c("editor.inspector.burstMaxParticles"), { min: 3, max: 50, step: 1, defaultVal: 20 })}
          <details class="defaults-nested" open>
            <summary>${c("editor.stateA.animationSpeed")}</summary>
            <p class="hint-sub">${c("editor.stateA.slowestSpeedHelper")}</p>
            <label class="defaults-row">
              <span class="defaults-label">${c("editor.stateA.slowestSpeed")}</span>
              <input
                type="number"
                min="1000"
                max="60000"
                step="500"
                .value=${String(e.max_duration ?? Ce)}
                @change=${(l) => {
      if (!this.config) return;
      const a = parseInt(l.target.value, 10);
      if (!Number.isFinite(a) || a <= 0) return;
      const d = this.config, p = ze(d, { max_duration: a });
      this.pushPatch(d, p, "set global max_duration");
    }}
              />
            </label>
            <p class="hint-sub">${c("editor.stateA.fastestSpeedHelper")}</p>
            <label class="defaults-row">
              <span class="defaults-label">${c("editor.stateA.fastestSpeed")}</span>
              <input
                type="number"
                min="100"
                max="5000"
                step="100"
                .value=${String(e.min_duration ?? le)}
                @change=${(l) => {
      if (!this.config) return;
      const a = parseInt(l.target.value, 10);
      if (!Number.isFinite(a) || a <= 0) return;
      const d = this.config, p = ze(d, { min_duration: a });
      this.pushPatch(d, p, "set global min_duration");
    }}
              />
            </label>
          </details>
          ${i === "hvac" ? y`
                <div class="dual-unit-row">
                  <span class="defaults-label">${c("editor.stateA.peakAirflow")}</span>
                  <div class="field-col">
                    <label>${c("editor.stateA.peakM3h")}</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      .value=${String(o)}
                      @input=${(l) => {
      if (!this.config) return;
      const a = parseFloat(l.target.value);
      if (!Number.isFinite(a) || a <= 0) return;
      const d = this.config, p = at(d, "peak_value", a);
      this.pushPatch(d, p, "set defaults.peak_value m³/h");
    }}
                    />
                  </div>
                  <div class="unit-divider">${c("editor.stateA.peakOr")}</div>
                  <div class="field-col">
                    <label>${c("editor.stateA.peakCfm")}</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      .value=${String(s)}
                      @input=${(l) => {
      if (!this.config) return;
      const a = parseFloat(l.target.value);
      if (!Number.isFinite(a) || a <= 0) return;
      const d = Math.round(a * 1.699 * 10) / 10, p = this.config, h = at(p, "peak_value", d);
      this.pushPatch(p, h, "set defaults.peak_value via CFM");
    }}
                    />
                  </div>
                </div>
              ` : r("peak_value", c("editor.stateA.domainPeakDefault"), {
      min: 1e-4,
      max: 1e9,
      step: 1,
      defaultVal: n.peak
    })}
        </div>
      </details>
    `;
  }
  // ── Zone 3: context panel ──────────────────────────────────────────────────
  /** Dispatches to the correct inspector based on current selection. */
  renderContextPanel() {
    return this.config ? this.selectedNodeId || this.selectedFlowId || this.selectedOverlayId ? y`<div class="z-context-body">${this.renderInspector()}</div>` : this.renderStateA() : y``;
  }
  /** State A — nothing selected: background, appearance, defaults panels. */
  renderStateA() {
    return y`
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
    if (!this.config) return _;
    const t = this.config.domain ?? "energy";
    return y`
      <details class="panel domain-settings-panel" open>
        <summary>${c("editor.stateA.domainSummary")}</summary>
        <div class="panel-body">
          <label class="field-row domain-field">
            <span class="field-label">${c("editor.stateA.domain")}</span>
            <select
              id="flowme-domain-select"
              @change=${(e) => {
      const i = e.target.value;
      this.onDomainChange(i);
    }}
            >
              ${Fe.map(
      (e) => y`
                  <option value=${e} ?selected=${t === e}>${this.domainOptionLabel(e)}</option>
                `
    )}
            </select>
          </label>
        </div>
      </details>
    `;
  }
  /** Deep copy so undo / validation never shares references with `this.config`. */
  deepCloneConfig(t) {
    return JSON.parse(JSON.stringify(t));
  }
  onDomainChange(t) {
    if (!this.config) return;
    const e = t;
    if (!Fe.includes(e)) return;
    const i = this.deepCloneConfig(this.config), n = this.deepCloneConfig(this.config);
    n.domain = e, this.pushPatch(i, n, "Change domain");
  }
  domainOptionLabel(t) {
    return c(`editor.stateA.domainOption.${t}`);
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderMultiSelectToolbar() {
    const t = this.selectedNodeIds.size;
    if (t < 2) return _;
    const e = this.selectedNodeIds, i = Array.from(e)[0];
    return y`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${c("editor.inspector.multiselectCount", t)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? "suggest-path-busy" : ""}"
          aria-label=${c("editor.inspector.suggestPathBetweenAria")}
          title=${c(t === 2 ? "editor.inspector.suggestPathBetweenTitle" : "editor.inspector.suggestPathPickTwoTitle")}
          ?disabled=${t !== 2 || this.suggestBusy}
          @click=${() => void this.runSuggestPath()}
        >${this.suggestBusy ? y`${c("editor.toolbar.suggestPathFinding")}<span class="suggest-path-spinner" aria-hidden="true"></span>` : c("editor.toolbar.suggestPath")}</button>
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
    const e = this.config, i = ri(e, t, !1);
    this.pushPatch(e, i, `hide ${t.size} nodes`);
  }
  bulkShow(t) {
    if (!this.config) return;
    const e = this.config, i = ri(e, t, !0);
    this.pushPatch(e, i, `show ${t.size} nodes`);
  }
  bulkAlignH(t, e) {
    if (!this.config) return;
    const i = this.config, n = Zo(i, t, e);
    this.pushPatch(i, n, `align ${t.size} nodes horizontally`);
  }
  bulkAlignV(t, e) {
    if (!this.config) return;
    const i = this.config, n = Xo(i, t, e);
    this.pushPatch(i, n, `align ${t.size} nodes vertically`);
  }
  bulkDelete(t) {
    if (!this.config || !window.confirm(c("editor.inspector.deleteNodesConfirm", t.size))) return;
    const e = this.config, i = Yo(e, t);
    this.pushPatch(e, i, `delete ${t.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderWeatherPanel() {
    if (!this.config) return _;
    const t = this.config.background, e = Object.entries(t.weather_states ?? {}), i = t.weather_entity && this.hass ? this.hass.states[t.weather_entity]?.state : void 0;
    return y`
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
            ${t.default ? y`<img class="weather-thumb" src=${t.default} alt=${c("editor.inspector.defaultBgAlt")} />` : _}
          </label>
          <label>
            ${c("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(
      t.weather_entity ?? "",
      (n) => this.setWeatherEntityValue(n),
      { includeDomains: ["weather"], placeholder: c("editor.inspector.weatherPlaceholder") }
    )}
          </label>
          ${i !== void 0 ? y`<div class="weather-live-state">
                ${c("editor.inspector.currentState")} <strong>${i}</strong>
                ${t.weather_states?.[i] ? y` → <span class="weather-match-ok">${c("editor.inspector.weatherMatched")}</span>` : y` → <span class="weather-match-miss">${c("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : _}
          <label>
            ${c("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(
      t.sun_entity ?? "",
      (n) => {
        if (!this.config) return;
        const o = this.config, s = es(o, n || void 0);
        this.pushPatch(o, s, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: c("editor.inspector.sunPlaceholder") }
    )}
          </label>
          ${t.sun_entity && this.hass?.states[t.sun_entity] ? y`<div class="weather-live-state">
                ${c("editor.inspector.sunStateLabel")} <strong>${this.hass.states[t.sun_entity]?.state === "above_horizon" ? c("editor.inspector.sunAbove") : c("editor.inspector.sunBelow")}</strong>
              </div>` : _}
          <label>
            ${c("editor.inspector.fadeTransitionSeconds")}
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              .value=${String(Math.round((t.transition_duration ?? 5e3) / 1e3))}
              @change=${(n) => {
      if (!this.config) return;
      const o = parseFloat(n.target.value);
      if (!Number.isFinite(o) || o < 0) return;
      const s = this.config, r = ts(s, o * 1e3);
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
      ([n, o]) => y`
                <div class="weather-row" data-key=${n}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${n}
                    @change=${(s) => this.onWeatherStateKeyChange(n, s)}
                  />
                  <input
                    type="text"
                    .value=${o}
                    @change=${(s) => this.onWeatherStateUrlChange(n, s)}
                    placeholder=${c("editor.inspector.weatherRowPlaceholder")}
                  />
                  <div class="weather-row-end">
                    ${o ? y`<img class="weather-thumb" src=${o} alt=${n} />` : _}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(n)}>
                      ${c("editor.inspector.remove")}
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${N.KNOWN_WEATHER_STATES.map(
      (n) => y`<option value=${n}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${c("editor.inspector.addWeatherState")}</button>
          </div>
          <details class="hint-details">
            <summary>${c("editor.inspector.metNoReferenceSummary")}</summary>
            <div class="hint-states">
              ${N.KNOWN_WEATHER_STATES.map(
      (n) => y`<code>${n}</code>`
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
    const e = t.trim(), i = this.config, n = Qo(i, e || void 0);
    this.pushPatch(i, n, "edit weather entity");
  }
  onWeatherStateKeyChange(t, e) {
    if (!this.config) return;
    const i = e.target.value.trim();
    if (!i || i === t) return;
    const n = this.config, o = us(n, t, i);
    o !== n && this.pushPatch(n, o, `rename weather state ${t}→${i}`);
  }
  onWeatherStateUrlChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, n = this.config, o = pi(n, t, i);
    this.pushPatch(n, o, `edit weather image ${t}`);
  }
  // -- toolbar --
  // -- suggest path --
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new Us();
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
    i?.logFallback && C("falling back to main thread pathfinding");
    const n = this.config.nodes.find((s) => s.id === t), o = this.config.nodes.find((s) => s.id === e);
    if (!(!n || !o)) {
      this.suggestBusy = !0;
      try {
        const s = await Ci({
          imageUrl: this.config.background.default,
          from: n.position,
          to: o.position
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
    const [t, e] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((l) => l.id === t), n = this.config.nodes.find((l) => l.id === e);
    if (!i || !n)
      return;
    const o = this.config.background?.default ?? "";
    if (typeof Worker > "u") {
      await this.runPathfindingMainThread(t, e, { logFallback: !0 });
      return;
    }
    if (this.initPathWorker(), !this._pathWorker) {
      await this.runPathfindingMainThread(t, e, { logFallback: !0 });
      return;
    }
    this.suggestBusy = !0;
    const s = await zs(o);
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
        toPos: n.position,
        cellSize: Ft
      },
      [r.buffer]
    );
  }
  onFlowFromNodeChange(t, e) {
    if (!this.config) return;
    const i = this.config.flows.find((n) => n.id === t);
    i && this.applyFlowEndpointChange(t, e, i.to_node);
  }
  onFlowToNodeChange(t, e) {
    if (!this.config) return;
    const i = this.config.flows.find((n) => n.id === t);
    i && this.applyFlowEndpointChange(t, i.from_node, e);
  }
  /** Main-thread pathfinding (same as toolbar fallback) — single undo with endpoints + waypoints. */
  async resolveWaypointsForEndpoints(t, e) {
    if (!this.config) return [];
    const i = this.config.nodes.find((s) => s.id === t), n = this.config.nodes.find((s) => s.id === e);
    if (!i || !n) return [];
    const o = this.config.background?.default ?? "";
    if (!o) return [];
    try {
      const s = await Ci({
        imageUrl: o,
        from: i.position,
        to: n.position
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
    const n = this.config;
    if (!n.flows.find((l) => l.id === t)) return;
    this.flowEndpointError = null, this.flowEndpointPathfindingFlowId = t;
    let s = [];
    try {
      s = await this.resolveWaypointsForEndpoints(e, i);
    } finally {
      this.flowEndpointPathfindingFlowId = null;
    }
    const r = {
      ...n,
      flows: n.flows.map(
        (l) => l.id === t ? { ...l, from_node: e, to_node: i, waypoints: s } : l
      )
    };
    this.pushPatch(n, r, "Change flow endpoints"), this.selectedFlowId = t;
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return _;
    const t = this.config.nodes.find((r) => r.id === this.suggestPreview.fromNodeId), e = this.config.nodes.find((r) => r.id === this.suggestPreview.toNodeId);
    if (!t || !e) return _;
    const i = this.imageNaturalW, n = this.imageNaturalH, s = [
      t.position,
      ...this.suggestPreview.waypoints,
      e.position
    ].map((r) => {
      const l = this.pct2px(r);
      return `${l.x.toFixed(2)},${l.y.toFixed(2)}`;
    }).join(" ");
    return y`
      <svg class="suggest-overlay" viewBox=${`0 0 ${i} ${n}`} preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map((r) => {
      const l = this.pct2px(r);
      return y`
          <div class="suggest-marker" style=${`left: ${l.x}px; top: ${l.y}px;`}></div>
        `;
    })}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? y`
      <div class="suggest-bar">
        <span>${c("editor.suggestBar.message")}</span>
        <span>${c("editor.inspector.suggestPreviewWaypoints", this.suggestPreview.waypoints.length)}</span>
        <button type="button" aria-label=${c("editor.toolbar.acceptPath")} @click=${this.acceptSuggestion}>${c("editor.inspector.accept")}</button>
        <button type="button" class="ghost" aria-label=${c("editor.toolbar.cancelPath")} @click=${this.cancelSuggestion}>${c("editor.toolbar.cancel")}</button>
      </div>
    ` : _;
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
    const n = i.label ?? i.id, o = e.draft.trim() ? e.draft.trim() : void 0;
    if ((i.label ?? void 0) === o) {
      this.inlineRename = null;
      return;
    }
    const s = this.config, r = ai(s, e.id, o);
    this.inlineRename = null, this.pushPatch(
      s,
      r,
      `Rename node ${n} to ${o ?? "(cleared)"}`
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
    const n = this.config, o = bi(n, e.id, i);
    if (o === n) {
      this.errorMessage = c("editor.errors.renameIdConflict"), this.inlineRename = null;
      return;
    }
    this.inlineRename = null, this.errorMessage = "", this.pushPatch(n, o, `Rename overlay ${e.id} to ${i}`), this.selectedOverlayId = i;
  }
  onInspectorFlowIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, n = i.value.trim(), o = this.config, s = ms(o, t, n);
    if (s === o) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(o, s, `Rename flow ${t} to ${n}`), this.selectedFlowId = n;
  }
  onInspectorOverlayIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, n = i.value.trim(), o = this.config, s = bi(o, t, n);
    if (s === o) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(o, s, `Rename overlay ${t} to ${n}`), this.selectedOverlayId = n;
  }
  // -- inspector edits --
  onNodeLabelChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, n = this.config, s = n.nodes.find((a) => a.id === t)?.label ?? t, r = ai(n, t, i.trim() ? i.trim() : void 0), l = i.trim() ? i.trim() : void 0;
    this.pushPatch(n, r, `Rename node ${s} to ${l ?? t}`);
  }
  setNodeEntity(t, e) {
    if (!this.config) return;
    const i = this.config, n = e.trim(), o = {
      ...i,
      nodes: i.nodes.map(
        (s) => s.id === t ? { ...s, entity: n || void 0 } : s
      )
    };
    this.pushPatch(i, o, `edit entity of ${t}`);
  }
  setFlowEntity(t, e) {
    if (!this.config) return;
    const i = this.config, n = e.trim();
    if (!n) return;
    const o = {
      ...i,
      flows: i.flows.map(
        (s) => s.id === t ? { ...s, entity: n } : s
      )
    };
    this.pushPatch(i, o, `edit entity of ${t}`);
  }
  onOverlaySizeChange(t, e, i) {
    if (!this.config) return;
    const n = (this.config.overlays ?? []).find((a) => a.id === t);
    if (!n) return;
    const o = n.size ?? { width: 20, height: 15 }, s = Number(i.target.value);
    if (!Number.isFinite(s) || s <= 0) return;
    const r = this.config, l = ui(r, t, { ...o, [e]: s });
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
    } catch (o) {
      this.customConfigError = c("editor.inspector.invalidCardJson", o instanceof Error ? o.message : String(o));
      return;
    }
    if (!i || typeof i != "object" || Array.isArray(i)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const n = this.config;
    try {
      const o = as(n, t, i), s = ye(o);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: n, next: s, description: `edit overlay ${t} card config` }), this.commitToHa(s);
    } catch (o) {
      this.customConfigError = o instanceof Error ? o.message : String(o);
    }
  }
  removeOverlay(t) {
    if (!this.config) return;
    const e = this.config, i = ss(e, t);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(e, i, `delete overlay ${t}`);
  }
  removeNode(t) {
    if (!this.config) return;
    const e = this.config, i = jo(e, t);
    this.selectedNodeId = null, this.pushPatch(e, i, `delete node ${t}`);
  }
  removeFlow(t) {
    if (!this.config) return;
    const e = this.config, i = qo(e, t);
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
    const e = t.offsetWidth - 16, i = t.offsetHeight - 8, n = this.imageNaturalW * this.scale, o = this.imageNaturalH * this.scale;
    this.panX = Math.min(0, Math.max(e - n, this.panX)), this.panY = Math.min(0, Math.max(i - o, this.panY));
  }
  adjustZoom(t, e, i) {
    const n = this.canvasRef.value, o = e ?? (n ? n.offsetWidth / 2 : 0), s = i ?? (n ? n.offsetHeight / 2 : 0), r = Math.min(5, Math.max(this.fitScale, this.scale * t));
    r !== this.scale && (this.panX = o - (o - this.panX) * (r / this.scale), this.panY = s - (s - this.panY) * (r / this.scale), this.scale = r, this.clampPan());
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
    const n = t.clientX - (i.left + 8), o = t.clientY - (i.top + 4), s = (n - this.panX) / this.scale, r = (o - this.panY) / this.scale, l = H(s / this.imageNaturalW * 100), a = H(r / this.imageNaturalH * 100);
    return { x: l, y: a };
  }
  pushPatch(t, e, i) {
    try {
      const n = ye(t), o = ye(e);
      this.errorMessage = "", this.undoStack.push({ prev: n, next: o, description: i }), this.commitToHa(o), this.config = o, ie(o.debug ?? !1);
    } catch (n) {
      this.errorMessage = n instanceof Error ? n.message : String(n), this.config = t;
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
N.KNOWN_WEATHER_STATES = [
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
N.styles = vt`
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
    .defaults-nested {
      margin-top: 4px;
      padding: 8px 0 0;
      border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
    }
    .defaults-nested > summary {
      list-style: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .dual-unit-row {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: 10px 12px;
      margin-top: 4px;
    }
    .dual-unit-row > .defaults-label {
      flex: 1 0 100%;
    }
    .field-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 11px;
    }
    .field-col input[type='number'] {
      width: 88px;
      font: inherit;
      padding: 3px 5px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1a1a1a);
      color: var(--primary-text-color, #fff);
    }
    .unit-divider {
      align-self: center;
      opacity: 0.65;
      font-size: 11px;
      padding-bottom: 6px;
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
  Be({ attribute: !1 })
], N.prototype, "hass", 2);
D([
  B()
], N.prototype, "config", 2);
D([
  B()
], N.prototype, "pending", 2);
D([
  B()
], N.prototype, "previewMode", 2);
D([
  B()
], N.prototype, "selectedNodeId", 2);
D([
  B()
], N.prototype, "selectedNodeIds", 2);
D([
  B()
], N.prototype, "selectedFlowId", 2);
D([
  B()
], N.prototype, "selectedOverlayId", 2);
D([
  B()
], N.prototype, "customConfigDraft", 2);
D([
  B()
], N.prototype, "customConfigError", 2);
D([
  B()
], N.prototype, "errorMessage", 2);
D([
  B()
], N.prototype, "inlineRename", 2);
D([
  B()
], N.prototype, "canUndo", 2);
D([
  B()
], N.prototype, "canRedo", 2);
D([
  B()
], N.prototype, "undoLabel", 2);
D([
  B()
], N.prototype, "redoLabel", 2);
D([
  B()
], N.prototype, "suggestPreview", 2);
D([
  B()
], N.prototype, "suggestBusy", 2);
D([
  B()
], N.prototype, "flowEndpointPathfindingFlowId", 2);
D([
  B()
], N.prototype, "flowEndpointError", 2);
D([
  B()
], N.prototype, "selectorType", 2);
D([
  B()
], N.prototype, "savedConfig", 2);
D([
  B()
], N.prototype, "scale", 2);
D([
  B()
], N.prototype, "panX", 2);
D([
  B()
], N.prototype, "panY", 2);
D([
  B()
], N.prototype, "imageLayoutReady", 2);
N = D([
  $t("flowme-card-editor")
], N);
var Vs = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, j = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ys(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (o = (n ? r(e, i, o) : r(o)) || o);
  return n && o && Vs(e, i, o), o;
};
const qi = "2.2";
console.info("%cFlowMe v" + qi + " loaded", "color: #FF6B00; font-weight: bold");
const ki = 5e3;
function Zs(t) {
  if (!t) return "";
  const e = [], i = (n, o) => {
    const s = t[n];
    s !== void 0 && e.push(`${o}:${s};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), e.join("");
}
function Xs(t) {
  if (!t) return "";
  const e = [], i = (n, o) => {
    t[n] === !1 && e.push(`${o}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), e.join("");
}
let W = class extends ne {
  constructor() {
    super(...arguments), this._connectionAwaitingReconnect = !1, this._boundHaConnection = null, this.onHaConnectionReady = () => {
      this.onReconnect();
    }, this.onHaConnectionDisconnected = () => {
      this._connectionAwaitingReconnect = !0;
    }, this._visibilityListenerAttached = !1, this._documentVisibilityPauseActive = !1, this._visibilityHandler = () => {
      this.syncAnimationsToDocumentVisibility();
    }, this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = Z(), this.nodeFxSvgRef = Z(), this.nodeFx = new Vi(), this._nodeFxRaf = null, this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this.onOverlayKeydown = (t, e) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleOverlayTap(e));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(t) {
    const e = this._hass;
    if (this._hass = t, t && t.language !== this._lastLanguage && (this._lastLanguage = t.language, Li(t.language)), t) {
      const i = this.config, n = [
        ...i?.flows.map((a) => a.entity) ?? [],
        ...i?.flows.map((a) => a.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((a) => a.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((a) => typeof a == "string" && a.length > 0), o = {};
      for (const a of n)
        o[a] = t.states[a]?.state;
      C("hass setter called. config entity states:", o);
      const s = i?.background.weather_entity;
      if (s) {
        const a = e?.states[s]?.state, d = t.states[s]?.state;
        C("[weather] state:", d, "(was:", a, ")"), a !== d && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const a = e?.states[r]?.state, d = t.states[r]?.state;
        a !== d && (C("[sun] state changed:", a, "→", d), this.syncWeatherBackground());
      }
      const l = t.connection;
      this.bindHaConnection(l);
    } else
      C("hass setter called with undefined"), this.bindHaConnection(void 0), e && this.showToast(c("card.connectionLost"));
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
   * Full SVG/Houdini rebuild when flow membership **or diagram domain** changes.
   * Domain switches must rebuild paths, colours, and speed curves — `applyConfig`
   * alone leaves stale renderer state. Other edits use {@link FlowRenderer.applyConfig}
   * so the HA editor preview stays responsive.
   */
  needsRendererReinit(t, e) {
    if (t.domain !== e.domain) return !0;
    const i = new Set(t.flows.map((o) => o.id)), n = new Set(e.flows.map((o) => o.id));
    if (i.size !== n.size) return !0;
    for (const o of i)
      if (!n.has(o)) return !0;
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
        C("first paint:", performance.now());
      });
    });
  }
  setConfig(t) {
    ie(Oi(t));
    const e = performance.now();
    C("setConfig start:", e);
    try {
      const i = ye(t);
      ie(i.debug ?? !1), C("setConfig called:", JSON.parse(JSON.stringify(t ?? null))), C(
        "setConfig validated → flows=",
        i.flows.length,
        "nodes=",
        i.nodes.length,
        "overlays=",
        i.overlays?.length ?? 0,
        "card",
        qi
      );
      const n = this.config, o = !!n && !!this.renderer && this.needsRendererReinit(n, i);
      if (!!this.renderer && !!n && !o && typeof this.renderer.applyConfig == "function") {
        this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(n, i), this.renderer.applyConfig(i), this.rendererReadyFor = i, this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
        {
          const r = performance.now();
          C("teardown complete:", r, "(skipped — applyConfig)"), C("renderer init start:", r, "(skipped — applyConfig)"), C("renderer init complete:", r, "(skipped — applyConfig)");
        }
        this.logFirstPaint();
        return;
      }
      this.renderer && o ? (this.teardownRenderer(), C("teardown complete:", performance.now())) : C("teardown complete:", performance.now(), "(skipped)"), this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(n, i), this.logFirstPaint();
    } catch (i) {
      ie(!1);
      const n = i instanceof At ? i.message : String(i);
      this.config = void 0, this.errorMessage = n, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.syncPauseWhenHiddenListener(), C("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    C("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), C("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this._visibilityListenerAttached && (document.removeEventListener("visibilitychange", this._visibilityHandler), this._visibilityListenerAttached = !1), this._documentVisibilityPauseActive = !1, this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null), this.bindHaConnection(void 0), this.nodeFx.reset(), this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), super.disconnectedCallback();
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
    C("renderer init start:", performance.now()), this.teardownRenderer(), this.renderer = Po(), this.rendererReadyFor = this.config;
    const e = this.config;
    this.renderer.init(t, e).then(() => {
      C("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
    }).catch((i) => {
      C("renderer init failed — falling back to SVG renderer", i), this.teardownRenderer(), this.renderer = new Ge(), this.rendererReadyFor = e, this.renderer.init(t, e).then(() => {
        C("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
      }).catch((n) => {
        console.error("[flowme] SVG renderer init also failed", n);
      });
    });
  }
  willUpdate(t) {
    this.config && (this.beginRendererInitIfNeeded(), t.has("hass") && this.renderer && (this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels()), (t.has("config") || t.has("hass")) && this.syncWeatherBackground());
  }
  updated(t) {
    super.updated(t), this.beginRendererInitIfNeeded(), this.syncPauseWhenHiddenListener(), this.syncAnimationsToDocumentVisibility();
    const e = this.nodeFxSvgRef.value;
    e && this.config && this.nodeFx.sync(e, this.config, this.hass, performance.now(), this.nodeEffectHooks()), this.ensureNodeEffectsRaf();
  }
  syncPauseWhenHiddenListener() {
    const t = this.config != null && this.config.pause_when_hidden !== !1;
    t && !this._visibilityListenerAttached ? (document.addEventListener("visibilitychange", this._visibilityHandler), this._visibilityListenerAttached = !0) : !t && this._visibilityListenerAttached && (document.removeEventListener("visibilitychange", this._visibilityHandler), this._visibilityListenerAttached = !1);
  }
  /**
   * Pause flow + node-effect animations when the tab is hidden (unless
   * `pause_when_hidden: false`). Idempotent.
   */
  syncAnimationsToDocumentVisibility() {
    if (!(this.config != null && this.config.pause_when_hidden !== !1)) {
      this._documentVisibilityPauseActive && (this.resumeCardAnimationsAfterHiddenTab(), this._documentVisibilityPauseActive = !1);
      return;
    }
    document.visibilityState === "hidden" ? this._documentVisibilityPauseActive || (this.pauseCardAnimationsForHiddenTab(), this._documentVisibilityPauseActive = !0) : this._documentVisibilityPauseActive && (this.resumeCardAnimationsAfterHiddenTab(), this._documentVisibilityPauseActive = !1);
  }
  pauseCardAnimationsForHiddenTab() {
    this.renderer?.pause?.(), this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null);
    const t = this.nodeFxSvgRef.value;
    if (t) {
      const e = t;
      if (typeof e.pauseAnimations == "function")
        e.pauseAnimations();
      else
        for (const i of t.querySelectorAll("animateMotion, animate, animateTransform"))
          i.pauseAnimations?.();
    }
  }
  resumeCardAnimationsAfterHiddenTab() {
    this.renderer?.resume?.();
    const t = this.nodeFxSvgRef.value;
    if (t) {
      const e = t;
      if (typeof e.unpauseAnimations == "function")
        e.unpauseAnimations();
      else
        for (const i of t.querySelectorAll("animateMotion, animate, animateTransform"))
          i.unpauseAnimations?.();
    }
    this.ensureNodeEffectsRaf();
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
        const n = this.queryNodeDot(t);
        n && (n.setAttribute("data-flowme-fx", "1"), n.style.transition = i?.transitionMs ? `background-color ${i.transitionMs}ms ease` : "", n.style.background = e);
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
    if (this.config?.pause_when_hidden !== !1 && document.visibilityState === "hidden") {
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
      C("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (let t = 0; t < this.config.flows.length; t++) {
        const e = this.config.flows[t], i = this.hass.states[e.entity], n = we(i?.state), o = T(e.domain ?? this.config.domain), s = i?.attributes?.unit_of_measurement, r = Zt(n, s, o.unit_scale);
        if (C(
          "updateFlow →",
          e.id,
          "entity=",
          e.entity,
          "raw=",
          i?.state,
          "parsed=",
          n,
          "sensorUnit=",
          s ?? "(none)",
          "matchedUnit=",
          r.matchedUnit ?? "(none → passthrough)",
          "factor=",
          r.factor,
          "scaledToBase(" + o.unit_label + ")=",
          r.value
        ), i) {
          if (i.state === "unavailable" || i.state === "unknown") {
            const l = `${e.id}:${e.entity}:unavailable`;
            this.warnedMissing.has(l) || (this.warnedMissing.add(l), C(`flow "${e.id}" entity "${e.entity}" is currently ${i.state} — no flow will render until it reports a number`));
          }
        } else {
          const l = `${e.id}:${e.entity}`;
          this.warnedMissing.has(l) || (this.warnedMissing.add(l), C(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(e.id, r.value), e.value_gradient && this.renderer.setGradientColor) {
          const l = e.value_gradient.entity, a = this.hass.states[l];
          if (a && a.state !== "unavailable" && a.state !== "unknown") {
            const d = parseFloat(a.state);
            if (Number.isFinite(d)) {
              const p = e.value_gradient, h = Math.max(p.low_value, Math.min(p.high_value, d)), u = Wi(d, p);
              C(
                "[gradient]",
                e.id,
                "entity value:",
                d,
                "clamped:",
                h,
                "range:",
                `${p.low_value}–${p.high_value}`,
                "colour:",
                u
              ), this.renderer.setGradientColor(e.id, u);
            } else
              C(`flow "${e.id}" gradient entity "${l}" state "${a.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            C(`flow "${e.id}" gradient entity "${l}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
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
    const e = this.hass.states[t.entity], i = T(t.domain ?? this.config.domain);
    if (!e) return c("card.entityNotFound");
    if (e.state === "unavailable" || e.state === "unknown") return e.state;
    const n = we(e.state), o = e.attributes?.unit_of_measurement ?? "", s = Zt(n, o, i.unit_scale);
    return o ? `${this.formatSensorNumber(s.value)} ${o}` : i.describe(s.value);
  }
  formatFlowAriaLabel(t) {
    return c("aria.flowGroup", t.id, this.describeFlowReading(t));
  }
  formatNodeAriaLabel(t) {
    const e = t.label ?? t.id;
    if (!this.hass || !t.entity || !this.config) return e;
    const i = this.hass.states[t.entity], n = T(this.config.domain);
    if (!i) return c("aria.readingWithTitle", e, c("card.entityNotFound"));
    if (i.state === "unavailable" || i.state === "unknown")
      return c("aria.readingWithTitle", e, i.state);
    const o = we(i.state), s = i.attributes?.unit_of_measurement ?? "";
    return s ? c("aria.readingWithTitle", e, `${this.formatSensorNumber(o)} ${s}`) : c("aria.readingWithTitle", e, n.describe(o));
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
      return y`
        <ha-card role="region" aria-label=${c("aria.card")}>
          <div class="error">
            <strong>${c("card.invalidConfigurationTitle")}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const t = this.config;
    if (!t)
      return y`<ha-card role="region" aria-label=${c("aria.card")}><div class="placeholder">${c("card.loading")}</div></ha-card>`;
    const i = `${1 / (Qe(t.aspect_ratio) ?? 16 / 10) * 100}%`, n = t.background.transition_duration ?? ki, o = Zs(t.opacity), s = Xs(t.visibility);
    return y`
      <ha-card role="region" aria-label=${c("aria.card")}>
        <div
          class="stage"
          style=${`padding-top: ${i};${o}${s}`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, n)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, n)}
          ></div>
          <div class="renderer-mount" ${X(this.rendererMount)}></div>
          <svg
            class="node-effects-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            ${X(this.nodeFxSvgRef)}
          ></svg>
          ${t.nodes.map((r) => this.renderNodeHandle(r))}
          ${(t.overlays ?? []).map((r) => (C("rendering overlay →", r.type, "position=", r.position, "size=", r.size), Bo(r, this.hass, {
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
      for (const n of e)
        if (n.getAttribute("data-overlay-id") === t.id) {
          i = n.querySelector("flowme-custom-overlay");
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
        const i = e.state, n = t.sun_entity ? this.hass.states[t.sun_entity]?.state : void 0, o = to(i, n, t.weather_states, t.default);
        let s = i;
        return n === "below_horizon" && !i.endsWith("-night") && (s = `${i}-night`), C("[FlowMe] sun:", n, "weather:", i, "→ lookup key:", s, "→ image:", o !== t.default ? o : "default"), o;
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
    const e = this.config.background.transition_duration ?? ki;
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
      const n = new Image();
      n.decoding = "async", n.onload = () => {
        this.preloadCache.set(t, n), i();
      }, n.onerror = () => i(), n.src = t, this.preloadCache.set(t, n);
    });
  }
  renderNodeHandle(t) {
    const e = this.hass && t.entity ? this.hass.states[t.entity] : void 0, i = t.show_value !== !1 && !!e, n = t.show_label !== !1 && !!t.label, o = T(this.config?.domain), s = t.color ?? this.nodeFlowColor(t.id) ?? o.default_color_positive, r = t.size ?? this.config?.defaults?.node_radius ?? 12;
    let l = "";
    if (e) {
      const d = we(e.state), p = e.attributes?.unit_of_measurement ?? "";
      p ? l = `${this.formatSensorNumber(d)} ${p}` : l = o.describe(d);
    }
    const a = t.visible === !1;
    return y`
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
        ${n ? y`<span class="node-label">${t.label}</span>` : null}
        ${i ? y`<span class="node-value">${l}</span>` : null}
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
    let n;
    const o = /* @__PURE__ */ new Set();
    for (let s = 0; s < this.config.flows.length; s++) {
      const r = this.config.flows[s];
      if (r.from_node !== t && r.to_node !== t) continue;
      const l = T(r.domain ?? e), a = pe(r, l, r.domain ?? e, 1, i, s), d = a.toLowerCase();
      o.has(d) || (o.add(d), n || (n = a));
    }
    if (o.size !== 0)
      return o.size === 1 ? n : ji;
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
    this.renderer && (this.renderer.destroy(), this.renderer = null), this.rendererReadyFor = void 0, this._documentVisibilityPauseActive = !1;
  }
};
W.styles = vt`
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
j([
  Be({ attribute: !1 })
], W.prototype, "hass", 1);
j([
  B()
], W.prototype, "config", 2);
j([
  B()
], W.prototype, "errorMessage", 2);
j([
  B()
], W.prototype, "toastVisible", 2);
j([
  B()
], W.prototype, "toastMessage", 2);
j([
  B()
], W.prototype, "bgLayerA", 2);
j([
  B()
], W.prototype, "bgLayerB", 2);
j([
  B()
], W.prototype, "activeLayer", 2);
W = j([
  $t("flowme-card")
], W);
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
  W as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
