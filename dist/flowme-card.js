/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = globalThis, ft = De.ShadowRoot && (De.ShadyCSS === void 0 || De.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), St = /* @__PURE__ */ new WeakMap();
let $i = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ft && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = St.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && St.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ui = (t) => new $i(typeof t == "string" ? t : t + "", void 0, gt), mt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[s + 1], t[0]);
  return new $i(i, t, gt);
}, Ki = (t, e) => {
  if (ft) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), o = De.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, t.appendChild(n);
  }
}, It = ft ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return Ui(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ji, defineProperty: Vi, getOwnPropertyDescriptor: Yi, getOwnPropertyNames: Zi, getOwnPropertySymbols: Xi, getPrototypeOf: qi } = Object, q = globalThis, kt = q.trustedTypes, Ji = kt ? kt.emptyScript : "", Qi = q.reactiveElementPolyfillSupport, $e = (t, e) => t, ze = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ji : null;
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
} }, bt = (t, e) => !ji(t, e), Mt = { attribute: !0, type: String, converter: ze, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), q.litPropertyMetadata ?? (q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let de = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Mt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(e, n, i);
      o !== void 0 && Vi(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: o, set: s } = Yi(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      s?.call(this, r), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty($e("elementProperties"))) return;
    const e = qi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($e("properties"))) {
      const i = this.properties, n = [...Zi(i), ...Xi(i)];
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
      for (const o of n) i.unshift(It(o));
    } else e !== void 0 && i.push(It(e));
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
    return Ki(e, this.constructor.elementStyles), e;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : ze).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, o = n._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ze;
      this._$Em = o;
      const a = r.fromAttribute(i, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, o = !1, s) {
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[e]), n ?? (n = r.getPropertyOptions(e)), !((n.hasChanged ?? bt)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, n)))) return;
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
        const { wrapped: r } = s, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, s, a);
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
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[$e("elementProperties")] = /* @__PURE__ */ new Map(), de[$e("finalized")] = /* @__PURE__ */ new Map(), Qi?.({ ReactiveElement: de }), (q.reactiveElementVersions ?? (q.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis, Ft = (t) => t, Te = _e.trustedTypes, Pt = Te ? Te.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, _i = "$lit$", X = `lit$${Math.random().toFixed(9).slice(2)}$`, Ai = "?" + X, en = `<${Ai}>`, ne = document, Se = () => ne.createComment(""), Ie = (t) => t === null || typeof t != "object" && typeof t != "function", yt = Array.isArray, tn = (t) => yt(t) || typeof t?.[Symbol.iterator] == "function", Ve = `[ 	
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, Bt = />/g, Q = RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Et = /'/g, Rt = /"/g, Ci = /^(?:script|style|textarea|title)$/i, Si = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), v = Si(1), Dt = Si(2), ue = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), Ot = /* @__PURE__ */ new WeakMap(), te = ne.createTreeWalker(ne, 129);
function Ii(t, e) {
  if (!yt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(e) : e;
}
const nn = (t, e) => {
  const i = t.length - 1, n = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = be;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let p, d, u = -1, h = 0;
    for (; h < l.length && (r.lastIndex = h, d = r.exec(l), d !== null); ) h = r.lastIndex, r === be ? d[1] === "!--" ? r = Nt : d[1] !== void 0 ? r = Bt : d[2] !== void 0 ? (Ci.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = Q) : d[3] !== void 0 && (r = Q) : r === Q ? d[0] === ">" ? (r = o ?? be, u = -1) : d[1] === void 0 ? u = -2 : (u = r.lastIndex - d[2].length, p = d[1], r = d[3] === void 0 ? Q : d[3] === '"' ? Rt : Et) : r === Rt || r === Et ? r = Q : r === Nt || r === Bt ? r = be : (r = Q, o = void 0);
    const f = r === Q && t[a + 1].startsWith("/>") ? " " : "";
    s += r === be ? l + en : u >= 0 ? (n.push(p), l.slice(0, u) + _i + l.slice(u) + X + f) : l + X + (u === -2 ? a : f);
  }
  return [Ii(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class ke {
  constructor({ strings: e, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = e.length - 1, l = this.parts, [p, d] = nn(e, i);
    if (this.el = ke.createElement(p, n), te.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = te.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(_i)) {
          const h = d[r++], f = o.getAttribute(u).split(X), m = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: m[2], strings: f, ctor: m[1] === "." ? sn : m[1] === "?" ? rn : m[1] === "@" ? an : Ue }), o.removeAttribute(u);
        } else u.startsWith(X) && (l.push({ type: 6, index: s }), o.removeAttribute(u));
        if (Ci.test(o.tagName)) {
          const u = o.textContent.split(X), h = u.length - 1;
          if (h > 0) {
            o.textContent = Te ? Te.emptyScript : "";
            for (let f = 0; f < h; f++) o.append(u[f], Se()), te.nextNode(), l.push({ type: 2, index: ++s });
            o.append(u[h], Se());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ai) l.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(X, u + 1)) !== -1; ) l.push({ type: 7, index: s }), u += X.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const n = ne.createElement("template");
    return n.innerHTML = e, n;
  }
}
function he(t, e, i = t, n) {
  if (e === ue) return e;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Ie(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(t), o._$AT(t, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (e = he(t, o._$AS(t, e.values), o, n)), e;
}
class on {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (e?.creationScope ?? ne).importNode(i, !0);
    te.currentNode = o;
    let s = te.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let p;
        l.type === 2 ? p = new Fe(s, s.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (p = new ln(s, this, e)), this._$AV.push(p), l = n[++a];
      }
      r !== l?.index && (s = te.nextNode(), r++);
    }
    return te.currentNode = ne, o;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Fe {
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
    e = he(this, e, i), Ie(e) ? e === _ || e == null || e === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : e !== this._$AH && e !== ue && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== _ && Ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ne.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ke.createElement(Ii(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new on(o, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Ot.get(e.strings);
    return i === void 0 && Ot.set(e.strings, i = new ke(e)), i;
  }
  k(e) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of e) o === i.length ? i.push(n = new Fe(this.O(Se()), this.O(Se()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = Ft(e).nextSibling;
      Ft(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ue {
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
    if (s === void 0) e = he(this, e, i, 0), r = !Ie(e) || e !== this._$AH && e !== ue, r && (this._$AH = e);
    else {
      const a = e;
      let l, p;
      for (e = s[0], l = 0; l < s.length - 1; l++) p = he(this, a[n + l], i, l), p === ue && (p = this._$AH[l]), r || (r = !Ie(p) || p !== this._$AH[l]), p === _ ? e = _ : e !== _ && (e += (p ?? "") + s[l + 1]), this._$AH[l] = p;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class sn extends Ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === _ ? void 0 : e;
  }
}
class rn extends Ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== _);
  }
}
class an extends Ue {
  constructor(e, i, n, o, s) {
    super(e, i, n, o, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = he(this, e, i, 0) ?? _) === ue) return;
    const n = this._$AH, o = e === _ && n !== _ || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== _ && (n === _ || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ln {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    he(this, e);
  }
}
const cn = _e.litHtmlPolyfillSupport;
cn?.(ke, Fe), (_e.litHtmlVersions ?? (_e.litHtmlVersions = [])).push("3.3.2");
const dn = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new Fe(e.insertBefore(Se(), s), s, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis;
let ie = class extends de {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = dn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ue;
  }
};
ie._$litElement$ = !0, ie.finalized = !0, Ae.litElementHydrateSupport?.({ LitElement: ie });
const pn = Ae.litElementPolyfillSupport;
pn?.({ LitElement: ie });
(Ae.litElementVersions ?? (Ae.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const un = { attribute: !0, type: String, converter: ze, reflect: !1, hasChanged: bt }, hn = (t = un, e, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      e.call(this, a), this.requestUpdate(r, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Pe(t) {
  return (e, i) => typeof i == "object" ? hn(t, e, i) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function E(t) {
  return Pe({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fn = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gn = { CHILD: 2 }, mn = (t) => (...e) => ({ _$litDirective$: t, values: e });
class bn {
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
const Ce = (t, e) => {
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const n of i) n._$AO?.(e, !1), Ce(n, e);
  return !0;
}, He = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while (i?.size === 0);
}, ki = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), wn(e);
  }
};
function yn(t) {
  this._$AN !== void 0 ? (He(this), this._$AM = t, ki(this)) : this._$AM = t;
}
function vn(t, e = !1, i = 0) {
  const n = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (e) if (Array.isArray(n)) for (let s = i; s < n.length; s++) Ce(n[s], !1), He(n[s]);
  else n != null && (Ce(n, !1), He(n));
  else Ce(this, t);
}
const wn = (t) => {
  t.type == gn.CHILD && (t._$AP ?? (t._$AP = vn), t._$AQ ?? (t._$AQ = yn));
};
class xn extends bn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, n) {
    super._$AT(e, i, n), ki(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), i && (Ce(this, e), He(this));
  }
  setValue(e) {
    if (fn(this._$Ct)) this._$Ct._$AI(e, this);
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
const Y = () => new $n();
class $n {
}
const Ye = /* @__PURE__ */ new WeakMap(), Z = mn(class extends xn {
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
      let i = Ye.get(e);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Ye.set(e, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    return typeof this.G == "function" ? Ye.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Me = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], st = ["corner", "diagonal", "curve", "smooth"], rt = [
  "dots",
  "dash",
  "pulse",
  "arrow",
  "trail",
  "fluid",
  "spark",
  "none"
], at = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], lt = ["auto", "forward", "reverse", "both"], ct = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], _n = {
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
      pulse: "Pulse",
      glow: "Glow",
      badge: "Badge",
      ripple: "Ripple",
      alert: "Alert",
      pulseCount: "Pulse ring count",
      pulseDuration: "Pulse duration (ms)",
      pulseThreshold: "Pulse change threshold (0–1)",
      pulseColor: "Pulse colour",
      glowColor: "Glow colour",
      glowMaxRadius: "Glow max radius (px)",
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
      pulseWidthPx: "Pulse width (px)",
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
    invalidNodeEffectType: "node_effect.type must be pulse, glow, badge, ripple, or alert",
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
let Mi = {};
function Ze(t) {
  Mi = t;
}
function Fi(t) {
  const i = (t ?? "en").split("-")[0].toLowerCase();
  if (i === "en") {
    Ze({});
    return;
  }
  const n = `/local/flowme/translations/${i}.json`;
  fetch(n).then((o) => o.ok ? o.json() : null).then((o) => {
    o && typeof o == "object" && Ze(o);
  }).catch(() => {
    Ze({});
  });
}
function c(t, ...e) {
  const i = t.split(".");
  let n = Mi;
  for (const o of i)
    if (n && typeof n == "object")
      n = n[o];
    else {
      n = void 0;
      break;
    }
  if (n === void 0) {
    n = _n;
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
const An = ["javascript:", "vbscript:", "data:", "file:"];
function Pi(t, e = "card_config") {
  const i = [], n = /* @__PURE__ */ new WeakSet(), o = (s, r) => {
    if (s != null) {
      if (typeof s == "string") {
        const a = s.trim().toLowerCase();
        for (const l of An)
          if (a.startsWith(l)) {
            i.push({ path: r, value: s, scheme: l });
            return;
          }
        return;
      }
      if (typeof s == "object" && !n.has(s)) {
        if (n.add(s), Array.isArray(s)) {
          for (let a = 0; a < s.length; a++) o(s[a], `${r}[${a}]`);
          return;
        }
        for (const [a, l] of Object.entries(s))
          o(l, `${r}.${a}`);
      }
    }
  };
  return o(t, e), i;
}
function Cn(t, e = "card_config") {
  const i = Pi(t, e);
  if (i.length === 0) return;
  const n = i[0];
  throw new Error(c("security.unsafeUrlInCard", n.scheme, n.path));
}
class wt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Lt = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function w(t, e) {
  throw new wt(`${t}: ${e}`);
}
function xt(t, e) {
  (!t || typeof t != "object") && w(e, c("validation.mustBeObjectWithXY"));
  const i = t, n = i.x, o = i.y;
  (typeof n != "number" || !Number.isFinite(n)) && w(`${e}.x`, c("validation.mustBeFiniteNumber")), (typeof o != "number" || !Number.isFinite(o)) && w(`${e}.y`, c("validation.mustBeFiniteNumber"));
  const s = n, r = o;
  return (s < 0 || s > 100) && w(`${e}.x`, c("validation.percentRange", s)), (r < 0 || r > 100) && w(`${e}.y`, c("validation.percentRange", r)), { x: s, y: r };
}
function zt(t, e) {
  (typeof t != "string" || !t.length) && w(e, c("validation.mustBeNonEmptyString"));
  const i = t;
  return Lt.some((o) => i.startsWith(o)) || w(e, c("validation.urlMustStartWith", Lt.join(", "), i.slice(0, 40))), i;
}
function Sn(t, e, i) {
  const n = `nodes[${e}]`;
  (!t || typeof t != "object") && w(n, c("validation.mustBeObject"));
  const o = t, s = o.id;
  (typeof s != "string" || !s.length) && w(`${n}.id`, c("validation.mustBeNonEmptyId"));
  const r = s;
  i.has(r) && w(`${n}.id`, c("validation.duplicateNodeId", r)), i.add(r);
  const a = xt(o.position, `${n}.position`), l = { id: r, position: a };
  return typeof o.entity == "string" && (l.entity = o.entity), typeof o.label == "string" && (l.label = o.label), typeof o.color == "string" && (l.color = o.color), typeof o.size == "number" && (l.size = o.size), typeof o.show_label == "boolean" && (l.show_label = o.show_label), typeof o.show_value == "boolean" && (l.show_value = o.show_value), o.opacity !== void 0 && (l.opacity = $t(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, c("validation.mustBeBoolean")), l.visible = o.visible), o.node_effect !== void 0 && (l.node_effect = In(o.node_effect, `${n}.node_effect`)), l;
}
function In(t, e) {
  (!t || typeof t != "object") && w(e, c("validation.mustBeObject"));
  const i = t, n = i.type;
  if (n === "pulse")
    return {
      type: "pulse",
      ...typeof i.pulse_count == "number" ? { pulse_count: i.pulse_count } : {},
      ...typeof i.pulse_duration == "number" ? { pulse_duration: i.pulse_duration } : {},
      ...typeof i.pulse_threshold == "number" ? { pulse_threshold: i.pulse_threshold } : {},
      ...typeof i.pulse_color == "string" ? { pulse_color: i.pulse_color } : {}
    };
  if (n === "glow")
    return {
      type: "glow",
      ...typeof i.glow_color == "string" ? { glow_color: i.glow_color } : {},
      ...typeof i.glow_max_radius == "number" ? { glow_max_radius: i.glow_max_radius } : {},
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
function kn(t, e, i, n) {
  const o = `flows[${e}]`;
  (!t || typeof t != "object") && w(o, c("validation.mustBeObject"));
  const s = t, r = s.id;
  (typeof r != "string" || !r.length) && w(`${o}.id`, c("validation.mustBeNonEmptyId"));
  const a = r;
  i.has(a) && w(`${o}.id`, c("validation.duplicateFlowId", a)), i.add(a);
  const l = s.from_node;
  (typeof l != "string" || !n.has(l)) && w(`${o}.from_node`, c("validation.unknownNodeRef", String(l)));
  const p = s.to_node;
  (typeof p != "string" || !n.has(p)) && w(`${o}.to_node`, c("validation.unknownNodeRef", String(p)));
  const d = s.entity;
  (typeof d != "string" || !d.length) && w(`${o}.entity`, c("validation.mustBeNonEmptyEntityId"));
  const u = s.waypoints;
  let h = [];
  u !== void 0 && (Array.isArray(u) || w(`${o}.waypoints`, c("validation.waypointsMustBeArray")), h = u.map(
    (m, y) => xt(m, `${o}.waypoints[${y}]`)
  ));
  const f = {
    id: a,
    from_node: l,
    to_node: p,
    entity: d,
    waypoints: h
  };
  if (typeof s.domain == "string" && (Me.includes(s.domain) || w(`${o}.domain`, c("validation.mustBeOneOf", Me.join(", "))), f.domain = s.domain), typeof s.color == "string" && (f.color = s.color), typeof s.color_positive == "string" && (f.color_positive = s.color_positive), typeof s.color_negative == "string" && (f.color_negative = s.color_negative), typeof s.threshold == "number" && (f.threshold = s.threshold), typeof s.reverse == "boolean" && (f.reverse = s.reverse), typeof s.speed_multiplier == "number") {
    const m = s.speed_multiplier;
    (m < 0.1 || m > 5) && w(`${o}.speed_multiplier`, c("validation.speedMultiplierRange")), f.speed_multiplier = m;
  }
  return s.opacity !== void 0 && (f.opacity = $t(s.opacity, `${o}.opacity`)), s.visible !== void 0 && (typeof s.visible != "boolean" && w(`${o}.visible`, c("validation.mustBeBoolean")), f.visible = s.visible), s.line_style !== void 0 && (st.includes(s.line_style) || w(`${o}.line_style`, c("validation.mustBeOneOf", st.join(", "))), f.line_style = s.line_style), s.speed_curve_override !== void 0 && (f.speed_curve_override = Mn(
    s.speed_curve_override,
    `${o}.speed_curve_override`
  )), s.animation !== void 0 && (f.animation = Nn(s.animation, `${o}.animation`)), s.value_gradient !== void 0 && (f.value_gradient = Bn(s.value_gradient, `${o}.value_gradient`)), f;
}
function Mn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t, n = {};
  function o(h) {
    const f = i[h];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${e}.${h}`, c("validation.positiveFinite")), f;
  }
  function s(h) {
    const f = i[h];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f < 50) && w(`${e}.${h}`, c("validation.durationMin50")), f;
  }
  const r = o("threshold");
  r !== void 0 && (n.threshold = r);
  const a = o("p50");
  a !== void 0 && (n.p50 = a);
  const l = o("peak");
  l !== void 0 && (n.peak = l);
  const p = s("max_duration");
  p !== void 0 && (n.max_duration = p);
  const d = s("min_duration");
  if (d !== void 0 && (n.min_duration = d), i.steepness !== void 0) {
    const h = i.steepness;
    (typeof h != "number" || !Number.isFinite(h) || h <= 0) && w(`${e}.steepness`, c("validation.positiveFinite")), n.steepness = h;
  }
  n.max_duration !== void 0 && n.min_duration !== void 0 && n.min_duration >= n.max_duration && w(e, c("validation.minLtMaxDuration"));
  const u = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const h of Object.keys(i))
    u.has(h) || w(`${e}.${h}`, c("validation.unknownKey", [...u].join(", ")));
  return n;
}
function ae(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t <= 0) && w(e, c("validation.positiveFinite")), t;
}
function Fn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("defaults", c("validation.defaultsMustBeObject"));
  const e = t, i = {};
  if (e.node_radius !== void 0 && (i.node_radius = ae(e.node_radius, "defaults.node_radius")), e.burst_trigger_ratio !== void 0) {
    const n = ae(e.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    n > 1 && w("defaults.burst_trigger_ratio", c("validation.burstTriggerMax1")), i.burst_trigger_ratio = n;
  }
  return e.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = ae(e.burst_sustain_ms, "defaults.burst_sustain_ms")), e.burst_max_particles !== void 0 && (i.burst_max_particles = ae(e.burst_max_particles, "defaults.burst_max_particles")), e.dot_radius !== void 0 && (i.dot_radius = ae(e.dot_radius, "defaults.dot_radius")), e.line_width !== void 0 && (i.line_width = ae(e.line_width, "defaults.line_width")), i;
}
function $t(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t < 0 || t > 1) && w(e, c("validation.opacity01")), t;
}
function Pn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("opacity", c("validation.mustBeObject"));
  const e = t, i = {};
  for (const n of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    e[n] !== void 0 && (i[n] = $t(e[n], `opacity.${n}`));
  return i;
}
function Nn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t, n = {};
  i.animation_style !== void 0 && (rt.includes(i.animation_style) || w(`${e}.animation_style`, c("validation.mustBeOneOf", rt.join(", "))), n.animation_style = i.animation_style), i.particle_shape !== void 0 && (at.includes(i.particle_shape) || w(`${e}.particle_shape`, c("validation.mustBeOneOf", at.join(", "))), n.particle_shape = i.particle_shape), i.direction !== void 0 && (lt.includes(i.direction) || w(`${e}.direction`, c("validation.mustBeOneOf", lt.join(", "))), n.direction = i.direction), i.particle_spacing !== void 0 && (ct.includes(i.particle_spacing) || w(`${e}.particle_spacing`, c("validation.mustBeOneOf", ct.join(", "))), n.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && w(`${e}.custom_svg_path`, c("validation.mustBeSvgPathString")), i.custom_svg_path.length === 0 && console.warn(`[flowme] ${e}.custom_svg_path is empty — will fall back to circle`), n.custom_svg_path = i.custom_svg_path);
  const o = (g, b) => {
    const x = i[g];
    if (x !== void 0)
      return (typeof x != "number" || !Number.isFinite(x) || x <= 0) && w(`${e}.${g}`, c("validation.positiveFinite")), b !== void 0 && x > b && w(`${e}.${g}`, c("validation.mustBeAtMost", b)), x;
  }, s = (g) => {
    const b = i[g];
    if (b !== void 0)
      return typeof b != "boolean" && w(`${e}.${g}`, c("validation.mustBeBoolean")), b;
  }, r = o("particle_size");
  if (r !== void 0 && (n.particle_size = r), i.particle_count !== void 0) {
    const g = i.particle_count;
    (typeof g != "number" || !Number.isFinite(g) || g < 1 || !Number.isInteger(g)) && w(`${e}.particle_count`, c("validation.particleCountInt")), n.particle_count = g;
  }
  if (i.glow_intensity !== void 0) {
    const g = i.glow_intensity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0) && w(`${e}.glow_intensity`, c("validation.glowNonNegative")), n.glow_intensity = g;
  }
  const a = s("shimmer");
  a !== void 0 && (n.shimmer = a);
  const l = s("flicker");
  l !== void 0 && (n.flicker = l);
  const p = o("pulse_width");
  p !== void 0 && (n.pulse_width = p);
  const d = o("trail_length");
  if (d !== void 0 && (n.trail_length = d), i.dash_gap !== void 0) {
    const g = i.dash_gap;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 10) && w(`${e}.dash_gap`, c("validation.dashGapRange")), n.dash_gap = g;
  }
  const u = o("cluster_size");
  u !== void 0 && (n.cluster_size = Math.max(1, Math.round(u)));
  const h = o("cluster_gap");
  h !== void 0 && (n.cluster_gap = h);
  const f = o("pulse_frequency", 20);
  if (f !== void 0 && (n.pulse_frequency = f), i.pulse_ratio !== void 0) {
    const g = i.pulse_ratio;
    (typeof g != "number" || !Number.isFinite(g) || g <= 0 || g >= 1) && w(`${e}.pulse_ratio`, c("validation.pulseRatioRange")), n.pulse_ratio = g;
  }
  const m = o("wave_frequency", 20);
  m !== void 0 && (n.wave_frequency = m);
  const y = o("wave_amplitude");
  return y !== void 0 && (n.wave_amplitude = y), n;
}
function Tt(t, e) {
  return (typeof t != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) && w(e, c("validation.mustBeHexColor")), t;
}
function Bn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t;
  typeof i.entity != "string" && w(`${e}.entity`, c("validation.mustBeStringEntityId")), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && w(`${e}.low_value`, c("validation.finiteNumber")), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && w(`${e}.high_value`, c("validation.finiteNumber")), i.low_value >= i.high_value && console.warn(`[flowme] ${e}: low_value should be less than high_value`);
  const n = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: Tt(i.low_color, `${e}.low_color`),
    high_color: Tt(i.high_color, `${e}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || w(`${e}.mode`, c("validation.gradientMode")), n.mode = i.mode), n;
}
function En(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("animation", c("validation.animationRootMustBeObject"));
  const e = t, i = {};
  if (e.fps !== void 0) {
    const n = e.fps;
    (typeof n != "number" || !Number.isFinite(n) || n < 1 || n > 120) && w("animation.fps", c("validation.fpsRange")), i.fps = n;
  }
  return e.smooth_speed !== void 0 && (typeof e.smooth_speed != "boolean" && w("animation.smooth_speed", c("validation.mustBeBoolean")), i.smooth_speed = e.smooth_speed), i;
}
function Rn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("visibility", c("validation.visibilityRootMustBeObject"));
  const e = t, i = {};
  for (const n of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    e[n] !== void 0 && (typeof e[n] != "boolean" && w(`visibility.${n}`, c("validation.mustBeBoolean")), i[n] = e[n]);
  return i;
}
function Dn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("domain_colors", c("validation.domainColorsRootMustBeObject"));
  const e = t, i = {};
  for (const n of ["solar", "grid", "battery", "load"])
    e[n] !== void 0 && (typeof e[n] != "string" && w(`domain_colors.${n}`, c("validation.stringColourValue")), i[n] = e[n]);
  return i;
}
function ve(t) {
  if (!t || typeof t != "object") throw new wt(c("validation.configMustBeObject"));
  const e = t;
  e.type !== "custom:flowme-card" && w("type", c("validation.typeMustBeFlowme", String(e.type))), Me.includes(e.domain) || w("domain", c("validation.mustBeOneOf", Me.join(", ")));
  const i = e.background;
  i !== void 0 && (i === null || typeof i != "object") && w("background", c("validation.backgroundWhenProvided"));
  const n = i ?? {}, s = { default: n.default === void 0 || n.default === "" ? "" : zt(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && w("background.weather_entity", c("validation.mustBeStringEntityId")), s.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && w("background.weather_states", c("validation.weatherStatesMapping"));
    const f = Object.entries(n.weather_states), m = {};
    for (const [y, g] of f)
      m[y] = zt(g, `background.weather_states.${y}`);
    s.weather_states = m;
  }
  n.sun_entity !== void 0 && (typeof n.sun_entity != "string" && w("background.sun_entity", c("validation.sunEntityExample")), s.sun_entity = n.sun_entity), n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && w("background.transition_duration", c("validation.transitionMustBeNumberMs")), s.transition_duration = n.transition_duration);
  const r = e.nodes;
  Array.isArray(r) || w("nodes", c("validation.nodesMustBeArray"));
  const a = /* @__PURE__ */ new Set(), l = r.map((f, m) => Sn(f, m, a));
  l.length === 0 && w("nodes", c("validation.atLeastOneNode"));
  const p = e.flows;
  Array.isArray(p) || w("flows", c("validation.flowsMustBeArray"));
  const d = /* @__PURE__ */ new Set(), u = p.map(
    (f, m) => kn(f, m, d, a)
  ), h = {
    type: "custom:flowme-card",
    domain: e.domain,
    background: s,
    nodes: l,
    flows: u
  };
  if (e.aspect_ratio !== void 0 && ((typeof e.aspect_ratio != "string" || !/^\d+:\d+$/.test(e.aspect_ratio)) && w("aspect_ratio", c("validation.aspectRatioRegex")), h.aspect_ratio = e.aspect_ratio), e.fullscreen !== void 0 && (typeof e.fullscreen != "boolean" && w("fullscreen", c("validation.mustBeBoolean")), h.fullscreen = e.fullscreen), e.edit_mode_password !== void 0 && (typeof e.edit_mode_password != "string" && w("edit_mode_password", c("validation.editPasswordMustBeString")), h.edit_mode_password = e.edit_mode_password), e.overlays !== void 0) {
    Array.isArray(e.overlays) || w("overlays", c("validation.overlaysMustBeArray"));
    const f = /* @__PURE__ */ new Set();
    h.overlays = e.overlays.map(
      (m, y) => On(m, y, f)
    );
  }
  return e.defaults !== void 0 && (h.defaults = Fn(e.defaults)), e.domain_colors !== void 0 && (h.domain_colors = Dn(e.domain_colors)), e.debug !== void 0 && (typeof e.debug != "boolean" && w("debug", c("validation.mustBeBoolean")), h.debug = e.debug), e.opacity !== void 0 && (h.opacity = Pn(e.opacity)), e.visibility !== void 0 && (h.visibility = Rn(e.visibility)), e.animation !== void 0 && (h.animation = En(e.animation)), h;
}
function On(t, e, i) {
  const n = `overlays[${e}]`;
  (!t || typeof t != "object") && w(n, c("validation.mustBeObject"));
  const o = t, s = o.type, a = typeof s == "string" && ["camera", "switch", "sensor", "button"].includes(s);
  !a && s !== "custom" && w(`${n}.type`, c("validation.overlayTypeMustBeCustom"));
  const l = o.id;
  (typeof l != "string" || !l.length) && w(`${n}.id`, c("validation.mustBeNonEmptyId")), i.has(l) && w(`${n}.id`, c("validation.duplicateOverlayId", l)), i.add(l);
  const p = xt(o.position, `${n}.position`);
  if (a) {
    const m = c("validation.migrationOverlayWarning", s);
    console.warn(`[flowme] ${n}: ${m}`);
    const y = {
      id: l,
      type: "custom",
      position: p,
      card: { type: "markdown", content: "" },
      _migration_warning: m
    };
    if (o.size !== void 0) {
      const g = o.size;
      if (g && typeof g == "object") {
        const b = g, x = b.width, $ = b.height;
        typeof x == "number" && typeof $ == "number" && (y.size = { width: x, height: $ });
      }
    }
    return y;
  }
  const d = o.card;
  (!d || typeof d != "object" || Array.isArray(d)) && w(`${n}.card`, c("validation.overlayCardMustBeObject"));
  const u = Pi(d, `${n}.card`);
  if (u.length) {
    const m = u[0];
    w(m.path, c("validation.unsafeSchemeInCard", m.scheme));
  }
  const f = {
    id: l,
    type: "custom",
    position: p,
    card: d
  };
  if (o.size !== void 0) {
    const m = o.size;
    (!m || typeof m != "object") && w(`${n}.size`, c("validation.overlaySizeMustBeObject"));
    const y = m, g = y.width, b = y.height;
    (typeof g != "number" || !Number.isFinite(g) || g <= 0 || g > 100) && w(`${n}.size.width`, c("validation.overlayWidthPercent")), (typeof b != "number" || !Number.isFinite(b) || b <= 0 || b > 100) && w(`${n}.size.height`, c("validation.overlayHeightPercent")), f.size = { width: g, height: b };
  }
  if (o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, c("validation.mustBeBoolean")), f.visible = o.visible), o.opacity !== void 0) {
    const m = o.opacity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 1) && w(`${n}.opacity`, c("validation.overlayOpacity01")), f.opacity = m;
  }
  return f;
}
const Ln = "[FlowMe]";
let _t = !1;
function dt(t) {
  _t = t;
}
function R(...t) {
  _t && console.warn(Ln, ...t);
}
function zn() {
  return _t;
}
const Ge = {
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
function Tn(t) {
  const e = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(e)) return "solar";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(e)) return "grid";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(e)) return "battery";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(e)) return "load";
}
function Ht(t, e) {
  const i = t.toLowerCase();
  for (const n of e.roles)
    for (const o of n.patterns)
      if (o && i.includes(o)) return n.key;
}
function Hn(t, e, i, n) {
  if (t === void 0) {
    R("colour resolution:", e, "domain:", "undefined", "matched role:", "none", "resolved:", void 0);
    return;
  }
  const o = t, s = Ge[o] ?? Ge.generic;
  let r;
  if (o === "energy") {
    if (r = Tn(e), !r) {
      R("colour resolution:", e, "domain:", o, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (o === "generic") {
    if (r = Ht(e, s), !r) {
      const p = Math.abs(n ?? 0) % s.roles.length, d = s.roles[p], u = i?.[d.key] ?? d.default;
      return R("colour resolution:", e, "domain:", o, "matched role:", "none", "resolved:", u), u;
    }
  } else if (r = Ht(e, s), !r) {
    R("colour resolution:", e, "domain:", o, "matched role:", "none", "resolved:", void 0);
    return;
  }
  const a = s.roles.find((p) => p.key === r);
  if (!a) return;
  const l = i?.[a.key] ?? a.default;
  return R("colour resolution:", e, "domain:", o, "matched role:", r, "resolved:", l), l;
}
function At(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
function Gt(t, e, i) {
  return t + (e - t) * i;
}
function pe(t, e) {
  return { x: t.x / 100 * e.width, y: t.y / 100 * e.height };
}
function Ni(t) {
  let e = 0;
  for (let i = 1; i < t.length; i++) {
    const n = t[i - 1], o = t[i];
    if (!n || !o) continue;
    const s = o.x - n.x, r = o.y - n.y;
    e += Math.sqrt(s * s + r * r);
  }
  return e;
}
function Gn(t, e) {
  if (t.length === 0) return { x: 0, y: 0 };
  if (t.length === 1) return { ...t[0] };
  const i = Ni(t), n = At(e, 0, 1) * i;
  let o = 0;
  for (let s = 1; s < t.length; s++) {
    const r = t[s - 1], a = t[s], l = a.x - r.x, p = a.y - r.y, d = Math.sqrt(l * l + p * p);
    if (o + d >= n) {
      const u = d === 0 ? 0 : (n - o) / d;
      return { x: r.x + l * u, y: r.y + p * u };
    }
    o += d;
  }
  return { ...t[t.length - 1] };
}
function we(t, e, i) {
  if (t.length === 0) return "";
  if (t.length === 1) {
    const a = pe(t[0], e);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const n = t.map((a) => pe(a, e));
  if (i === "diagonal") {
    const a = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let l = 1; l < n.length; l++)
      a.push(`L ${n[l].x.toFixed(2)} ${n[l].y.toFixed(2)}`);
    return a.join(" ");
  }
  if (i === "corner") {
    const a = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let l = 1; l < n.length; l++) {
      const p = n[l - 1], d = n[l];
      a.push(`L ${d.x.toFixed(2)} ${p.y.toFixed(2)}`), a.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  if (i === "curve") {
    const a = n.length, l = [
      { x: 2 * n[0].x - n[1].x, y: 2 * n[0].y - n[1].y },
      ...n,
      { x: 2 * n[a - 1].x - n[a - 2].x, y: 2 * n[a - 1].y - n[a - 2].y }
    ], p = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let d = 1; d < a; d++) {
      const u = l[d - 1], h = l[d], f = l[d + 1], m = l[d + 2], y = h.x + (f.x - u.x) / 6, g = h.y + (f.y - u.y) / 6, b = f.x - (m.x - h.x) / 6, x = f.y - (m.y - h.y) / 6;
      p.push(`C ${y.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} ${x.toFixed(2)} ${f.x.toFixed(2)} ${f.y.toFixed(2)}`);
    }
    return p.join(" ");
  }
  const o = 0.3, s = 20, r = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
  for (let a = 1; a < n.length; a++) {
    const l = n[a - 1], p = n[a], d = n[a + 1];
    if (!d) {
      r.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
      continue;
    }
    const u = Math.sqrt((p.x - l.x) ** 2 + (p.y - l.y) ** 2), h = Math.sqrt((d.x - p.x) ** 2 + (d.y - p.y) ** 2), f = Math.min(Math.min(u, h) * o, s), m = f / (u || 1), y = p.x - (p.x - l.x) * m, g = p.y - (p.y - l.y) * m, b = f / (h || 1), x = p.x + (d.x - p.x) * b, $ = p.y + (d.y - p.y) * b;
    r.push(`L ${y.toFixed(2)} ${g.toFixed(2)}`), r.push(`Q ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${x.toFixed(2)} ${$.toFixed(2)}`);
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
const oe = 9e3, se = 700, re = 1.5;
function K(t, e) {
  const { threshold: i, p50: n, max_duration: o, min_duration: s, steepness: r } = e, a = Math.abs(t);
  if (!(n > 0) || !(i > 0)) return o;
  const l = Math.max(a, i), p = Math.log10(l / n), d = 1 / (1 + Math.exp(-r * p));
  return o - d * (o - s);
}
function We(t, e) {
  const i = t.speed_curve_override ?? {}, n = i.threshold ?? t.threshold ?? e.threshold, o = i.p50 ?? e.p50, s = i.peak ?? e.peak, r = i.max_duration ?? oe, a = i.min_duration ?? se, l = i.steepness ?? re;
  return { threshold: n, p50: o, peak: s, max_duration: r, min_duration: a, steepness: l };
}
function Wt(t, e, i) {
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
    const [r, a] = s[0];
    return { value: t * a, factor: a, matchedUnit: r };
  }
  return { value: t, factor: 1 };
}
function Bi(t, e) {
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
function Wn(t, e, i, n) {
  if (!i) return n;
  const o = e === "below_horizon";
  let s = t;
  o && !t.endsWith("-night") && (s = `${t}-night`);
  const r = i[s];
  if (r) return r;
  if (o && s !== "clear-night") {
    const a = i["clear-night"];
    if (a) return a;
  }
  if (s !== t) {
    const a = i[t];
    if (a) return a;
  }
  return n;
}
function Xe(t) {
  if (!t) return;
  const e = /^(\d+):(\d+)$/.exec(t);
  if (!e) return;
  const i = Number.parseInt(e[1], 10), n = Number.parseInt(e[2], 10);
  if (!(!i || !n))
    return i / n;
}
function Ut(t) {
  const e = t.replace("#", ""), i = e.length === 3 ? e.split("").map((o) => o + o).join("") : e, n = parseInt(i, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function Kt(t, e, i) {
  const n = t / 255, o = e / 255, s = i / 255, r = Math.max(n, o, s), a = Math.min(n, o, s), l = (r + a) / 2;
  if (r === a) return [0, 0, l];
  const p = r - a, d = l > 0.5 ? p / (2 - r - a) : p / (r + a);
  let u;
  return r === n ? u = (o - s) / p + (o < s ? 6 : 0) : r === o ? u = (s - n) / p + 2 : u = (n - o) / p + 4, [u * 60, d, l];
}
function qe(t, e, i) {
  let n = i;
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Un(t, e, i) {
  const n = t / 360;
  let o, s, r;
  if (e === 0)
    o = s = r = i;
  else {
    const l = i < 0.5 ? i * (1 + e) : i + e - i * e, p = 2 * i - l;
    o = qe(p, l, n + 1 / 3), s = qe(p, l, n), r = qe(p, l, n - 1 / 3);
  }
  const a = (l) => Math.round(l * 255).toString(16).padStart(2, "0");
  return `#${a(o)}${a(s)}${a(r)}`;
}
function Ei(t, e) {
  const i = e.high_value - e.low_value, n = i === 0 ? 0 : Math.max(0, Math.min(1, (t - e.low_value) / i)), [o, s, r] = Ut(e.low_color), [a, l, p] = Ut(e.high_color), [d, u, h] = Kt(o, s, r), [f, m, y] = Kt(a, l, p);
  let g = f - d;
  g > 180 && (g -= 360), g < -180 && (g += 360);
  const b = (d + g * n + 360) % 360, x = Gt(u, m, n), $ = Gt(h, y, n);
  return Un(b, x, $);
}
function Ri() {
  try {
    return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
const Kn = {
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
    return K(t, {
      threshold: 30,
      p50: 800,
      max_duration: oe,
      min_duration: se,
      steepness: re
    });
  },
  describe(t) {
    return Math.abs(t) >= 1e3 ? `${(t / 1e3).toFixed(2)} kW` : `${Math.round(t)} W`;
  }
}, jn = {
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
    return K(t, {
      threshold: 0.3,
      p50: 6,
      max_duration: oe,
      min_duration: se,
      steepness: re
    });
  },
  wave_amplitude_curve(t) {
    return 4;
  },
  describe(t) {
    return Math.abs(t) >= 100 ? `${t.toFixed(0)} L/min` : Math.abs(t) >= 10 ? `${t.toFixed(1)} L/min` : `${t.toFixed(2)} L/min`;
  }
}, Vn = {
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
    return K(t, {
      threshold: 0.05,
      p50: 50,
      max_duration: oe,
      min_duration: se,
      steepness: re
    });
  },
  particle_count_curve(t) {
    const e = Math.abs(t);
    return Math.round(At(1 + Math.log10(e + 1) * 4, 1, 20));
  },
  describe(t) {
    const e = Math.abs(t);
    return e >= 1e3 ? `${(t / 1e3).toFixed(2)} Gbps` : e >= 10 ? `${t.toFixed(1)} Mbps` : `${t.toFixed(2)} Mbps`;
  }
}, Yn = {
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
    return K(t, {
      threshold: 5,
      p50: 200,
      max_duration: oe,
      min_duration: se,
      steepness: re
    });
  },
  wave_amplitude_curve(t) {
    const e = Math.abs(t);
    return At(2 + e / 100, 2, 10);
  },
  describe(t) {
    return `${Math.round(t)} CFM`;
  }
}, Zn = {
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
    return K(t, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: oe,
      min_duration: se,
      steepness: re
    });
  },
  describe(t) {
    return Math.abs(t) >= 10 ? `${t.toFixed(1)} m³/h` : `${t.toFixed(2)} m³/h`;
  }
}, Di = {
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
    return K(t, {
      threshold: 1,
      p50: 100,
      max_duration: oe,
      min_duration: se,
      steepness: re
    });
  },
  describe(t) {
    return Math.abs(t) >= 100 ? t.toFixed(0) : Math.abs(t) >= 10 ? t.toFixed(1) : t.toFixed(2);
  }
}, jt = {
  energy: Kn,
  water: jn,
  network: Vn,
  hvac: Yn,
  gas: Zn,
  generic: Di
};
function T(t) {
  return t && t in jt ? jt[t] : Di;
}
const Oi = "#CCCCCC";
function fe(t, e, i, n, o, s) {
  const r = t.color ?? Hn(i, t.id, o, s);
  return n >= 0 ? t.color_positive ?? r ?? e.default_color_positive : t.color_negative ?? r ?? e.default_color_negative;
}
function Xn(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}
function Vt() {
  return {
    currentDurMs: /* @__PURE__ */ new Map(),
    interpFromMs: /* @__PURE__ */ new Map(),
    interpTargetMs: /* @__PURE__ */ new Map(),
    interpStartMs: /* @__PURE__ */ new Map()
  };
}
function Je(t, e) {
  e.interpFromMs.delete(t), e.interpTargetMs.delete(t), e.interpStartMs.delete(t);
}
const qn = 50, Jn = 500;
function Qn(t, e, i, n, o) {
  if (!i)
    return o.currentDurMs.set(t, e), Je(t, o), e;
  const s = o.currentDurMs.get(t) ?? e;
  if (Math.abs(e - s) < qn)
    return o.currentDurMs.set(t, e), Je(t, o), e;
  o.interpTargetMs.get(t) !== e && (o.interpFromMs.set(t, s), o.interpTargetMs.set(t, e), o.interpStartMs.set(t, n));
  const a = o.interpFromMs.get(t) ?? e, l = o.interpTargetMs.get(t) ?? e, p = o.interpStartMs.get(t) ?? n, d = n - p, u = Math.min(d / Jn, 1), h = Xn(u), f = a + (l - a) * h;
  return o.currentDurMs.set(t, f), u >= 1 ? (o.currentDurMs.set(t, l), Je(t, o), l) : f;
}
const eo = "[FlowMe Renderer]";
function Qe(...t) {
  R(eo, ...t);
}
const M = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xlink";
function to() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const et = to(), io = 2e3, Be = 3, no = 5, tt = 2, oo = 14, so = 0.9, ro = 5e3, le = 20, ao = 0.2, Ee = 0.3;
function lo(t) {
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
function co(t) {
  return [
    `M 0,${-t * 2.2}`,
    `C ${t * 1.1},${-t * 1.2} ${t * 1.3},${-t * 0.2} ${t * 1.3},${t * 0.5}`,
    `C ${t * 1.3},${t * 1.4} ${t * 0.7},${t * 2} 0,${t * 2}`,
    `C ${-t * 0.7},${t * 2} ${-t * 1.3},${t * 1.4} ${-t * 1.3},${t * 0.5}`,
    `C ${-t * 1.3},${-t * 0.2} ${-t * 1.1},${-t * 1.2} 0,${-t * 2.2}`,
    "Z"
  ].join(" ");
}
function Yt(t, e, i) {
  const n = (l) => {
    const p = l.replace("#", "").padEnd(6, "0").slice(0, 6);
    return [parseInt(p.slice(0, 2), 16), parseInt(p.slice(2, 4), 16), parseInt(p.slice(4, 6), 16)];
  }, o = n(t), s = n(e), r = (l) => Math.round(o[l] + (s[l] - o[l]) * i), a = (l) => l.toString(16).padStart(2, "0");
  return `#${a(r(0))}${a(r(1))}${a(r(2))}`;
}
const po = [8, 16, 24, 32], uo = [0.9, 0.75, 0.6, 0.4], ho = [0.8, 0.55, 0.35, 0.15];
class Oe {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Bi(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.durInterp = Vt(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptivePassAt = 0, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0, this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1, this.sparkMainsByFlow = /* @__PURE__ */ new Map(), this.sparkFlowPhysics = /* @__PURE__ */ new Map(), this.sparkBranchPool = [], this.flowPathSyncedDirection = /* @__PURE__ */ new Map(), this.sparkBranchActive = [], this.lastSparkFrameMs = 0;
  }
  async init(e, i) {
    Qe("init:", e.getBoundingClientRect(), "flows:", i.flows.length), this.container = e, this.config = i, this.prefersReducedMotionFlag = Ri(), this.flowsById = new Map(i.flows.map((o) => [o.id, o]));
    const n = document.createElementNS(M, "svg");
    n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("preserveAspectRatio", "none"), n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", n.style.overflow = "visible", this.svg = n, e.appendChild(n), this.initSparkBranchLayer(), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(e), this.startFpsLoop();
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
    const i = 1e3 / (this.config?.animation?.fps ?? 60), n = (o) => {
      if (!this.svg) return;
      const s = o - this.lastFrameTime;
      if (this.sampleFrameTime(), this.runAdaptivePassIfDue(o), s >= i) {
        this.lastFrameTime = o - s % i;
        const a = this.config?.animation?.smooth_speed !== !1, l = this.durInterp.interpStartMs.size > 0;
        a && (l || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(o), this.updateTimeBasedSpacing(o);
      }
      const r = this.lastSparkFrameMs ? o - this.lastSparkFrameMs : 1e3 / 60;
      this.lastSparkFrameMs = o, this.updateSparkMains(r), this.updateSparkBranches(r), this.rafHandle = requestAnimationFrame(n);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(n);
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.durInterp = Vt(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.frameTimeSamples.length = 0, this.lastAdaptivePassAt = 0, this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear(), this.sparkMainsByFlow.clear(), this.sparkFlowPhysics.clear(), this.sparkBranchActive = [], this.lastSparkFrameMs = 0, this.flowPathSyncedDirection.clear();
  }
  // ── internal ──────────────────────────────────────────────────────────────
  containerSize() {
    if (!this.container) return { width: 0, height: 0 };
    const e = this.container.getBoundingClientRect();
    return { width: Math.max(1, e.width), height: Math.max(1, e.height) };
  }
  computeIntendedDirection(e, i) {
    const n = e.animation?.direction ?? "auto";
    return n === "forward" ? 1 : n === "reverse" || i < 0 != (e.reverse === !0) ? -1 : 1;
  }
  /** Second path in defs for `direction: both` — opposite waypoint order. */
  ensurePathRev(e) {
    if (e.pathRev || !this.svg) return;
    const i = this.svg.querySelector("defs");
    if (!i) return;
    const n = document.createElementNS(M, "path");
    n.setAttribute("id", `${e.pathId}-rev`), n.setAttribute("fill", "none"), i.appendChild(n), e.pathRev = n, e.pathRevId = `${e.pathId}-rev`;
  }
  /**
   * Keep motion path geometry aligned with travel direction so `rotate="auto"` matches flow.
   * Reverse waypoint order when direction &lt; 0 (single-stream); `both` uses forward + reversed paths.
   */
  syncFlowPathGeometry(e, i, n) {
    if (!this.config) return;
    const o = this.containerSize(), s = new Map(this.config.nodes.map((u) => [u.id, u])), r = s.get(e.from_node), a = s.get(e.to_node);
    if (!r || !a) return;
    const l = [r.position, ...e.waypoints, a.position], p = e.line_style ?? "corner";
    if ((e.animation?.direction ?? "auto") === "both") {
      this.ensurePathRev(i);
      const u = we(l, o, p), h = [...l].reverse(), f = we(h, o, p);
      i.path.setAttribute("d", u), i.pathRev && i.pathRev.setAttribute("d", f);
    } else {
      i.pathRev && (i.pathRev.remove(), i.pathRev = void 0, i.pathRevId = void 0);
      const u = n >= 0 ? l : [...l].reverse();
      i.path.setAttribute("d", we(u, o, p));
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
    const i = document.createElementNS(M, "defs");
    this.svg.appendChild(i);
    const n = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const s = n.get(o.from_node), r = n.get(o.to_node);
      if (!s || !r) continue;
      const a = [s.position, ...o.waypoints, r.position], l = `flowme-path-${o.id}`, p = document.createElementNS(M, "path");
      p.setAttribute("id", l), p.setAttribute("d", we(a, e, o.line_style ?? "corner")), p.setAttribute("fill", "none"), i.appendChild(p);
      const d = document.createElementNS(M, "g");
      d.classList.add("flowme-flow-group"), d.setAttribute("data-flow-id", o.id), o.opacity !== void 0 && d.setAttribute("opacity", String(o.opacity)), o.visible === !1 && (d.style.display = "none");
      const u = this.config?.defaults?.line_width ?? tt, h = document.createElementNS(M, "use");
      h.classList.add("flow-line"), h.setAttributeNS(U, "href", `#${l}`), h.setAttribute("href", `#${l}`), h.setAttribute("stroke", this.primaryColor(o)), h.setAttribute("stroke-opacity", "0.2"), h.setAttribute("stroke-width", String(u)), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("fill", "none"), d.appendChild(h);
      const f = {
        group: d,
        path: p,
        pathId: l,
        outline: h,
        style: this.animStyle(o),
        particles: []
      };
      this.svg.appendChild(d), this.flowNodes.set(o.id, f), Qe("skeleton:", o.id, "| style=", f.style, "| line_style=", o.line_style ?? "corner (default)");
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
      const a = this.latestValues.get(n.id) ?? 0, l = this.flowPathSyncedDirection.get(n.id) ?? this.computeIntendedDirection(n, a);
      this.syncFlowPathGeometry(n, o, l), o.style === "pulse" && this.applyFlow(n.id, a);
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
    const a = this.profileFor(n), l = We(n, a), p = et ? 0 : l.threshold, d = Math.abs(i), u = s.shimmer === !0, h = u && d < p && d > 0;
    if (!(et || d >= p || h)) {
      this.setGroupOpacity(o, 0);
      return;
    }
    const m = et ? io : K(d, l), y = n.speed_multiplier ?? 1;
    let g = Math.max(50, m * y);
    h && (g = g / ao);
    const b = this.config?.animation?.smooth_speed !== !1;
    g = Qn(e, g, b, performance.now(), this.durInterp);
    const x = s.direction ?? "auto";
    let $;
    x === "forward" ? $ = 1 : x === "reverse" ? $ = -1 : $ = i < 0 != (n.reverse === !0) ? -1 : 1;
    let A = $, S = h ? Ee : 1;
    const I = 600, C = 300;
    if (b && x === "auto") {
      const me = this.lastDirection.get(e), Wi = this.dirChanging.get(e);
      me !== void 0 && me !== $ && !Wi && this.dirChanging.set(e, { startMs: performance.now(), oldDir: me, newDir: $ });
      const Ne = this.dirChanging.get(e);
      if (Ne) {
        const V = performance.now() - Ne.startMs;
        V < I ? (V < C ? (S = (h ? Ee : 1) * (1 - V / C), A = Ne.oldDir) : (S = (h ? Ee : 1) * ((V - C) / C), A = Ne.newDir), !u && V >= 280 && V <= 320 && (g = Math.max(g, 45e3)), u && V >= 270 && V <= 330 && (S = Math.max(S, Ee))) : (this.dirChanging.delete(e), A = $);
      }
    }
    this.lastDirection.set(e, $);
    const N = n.domain ?? this.config?.domain, F = this.config?.flows.findIndex((me) => me.id === e) ?? -1, P = fe(
      n,
      a,
      N,
      A,
      this.config?.domain_colors,
      F >= 0 ? F : 0
    ), O = this.gradientColors.get(e), z = n.value_gradient?.mode ?? "flow", je = O && z !== "line" ? O : P, Gi = O && z !== "flow" ? O : P, W = je;
    o.outline && o.outline.setAttribute("stroke", Gi), this.setGroupOpacity(o, S), this.syncFlowPathGeometry(n, o, A);
    const J = this.updateBurstState(e, d, l, a);
    switch (Qe("applyFlow:", e, "style=", r, "dur=", g, "dir=", A, "color=", W), r) {
      case "dots":
        this.applyDots(o, n, a, i, g, W, A, J);
        break;
      case "dash":
        this.applyDash(o, n, g, W, A, J);
        break;
      case "pulse":
        this.applyPulse(o, n, a, i, g, W, J);
        break;
      case "arrow":
        this.applyArrows(o, n, g, W, A, J);
        break;
      case "trail":
        this.applyTrail(o, n, g, W, A, J);
        break;
      case "fluid":
        this.applyFluid(o, n, g, W, A);
        break;
      case "spark":
        this.applySpark(o, n, a, i, g, W, A, J);
        break;
      case "none":
        this.setGroupOpacity(o, 1);
        break;
      default:
        this.applyDots(o, n, a, i, g, W, A, J);
    }
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(e, i, n, o) {
    const s = n.peak, r = this.config?.defaults?.burst_trigger_ratio ?? so, a = this.config?.defaults?.burst_sustain_ms ?? ro, l = s * r;
    if (i < l)
      return this.burstActive.delete(e), this.burstEnteredAt.delete(e), 1;
    let p = this.burstEnteredAt.get(e);
    if (p === void 0 && (p = performance.now(), this.burstEnteredAt.set(e, p)), performance.now() - p < a) return 1;
    const d = o.burst_density_multiplier ?? 1.5;
    return this.burstActive.add(e), d;
  }
  // ── helpers ───────────────────────────────────────────────────────────────
  setGroupOpacity(e, i) {
    const n = String(i);
    for (const o of e.particles) o.shape.setAttribute("opacity", n);
    if (e.particlesBack) for (const o of e.particlesBack) o.shape.setAttribute("opacity", n);
    if (e.fluidGradient ? (e.group.setAttribute("opacity", i <= 0 ? "0" : n), i <= 0 && e.lineStroke?.setAttribute("opacity", "0")) : (e.group.removeAttribute("opacity"), e.lineStroke && e.lineStroke.setAttribute("opacity", i > 0 ? "0.9" : "0")), e.pulseCircles) for (const o of e.pulseCircles) o.circle.setAttribute("opacity", n);
  }
  /** Remove all style-specific DOM elements, ready to switch style */
  teardownStyle(e) {
    const i = e.group.getAttribute("data-flow-id");
    i && (this.sparkMainsByFlow.delete(i), this.sparkFlowPhysics.delete(i)), e.group.removeAttribute("opacity");
    for (const n of e.particles) n.shape.remove();
    if (e.particles = [], e.particlesBack) {
      for (const n of e.particlesBack) n.shape.remove();
      e.particlesBack = void 0;
    }
    if (e.lineStroke?.remove(), e.lineStroke = void 0, e.fluidInitialised = void 0, e.pulseCircles) {
      for (const n of e.pulseCircles) n.circle.remove();
      e.pulseCircles = void 0;
    }
    e.fluidGradient?.parentElement?.remove(), e.fluidGradient = void 0;
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
    const n = 1e3 / (this.config.animation?.fps ?? 60), o = this.avgFrameMs(), s = zn(), r = o > n * 1.2, a = o < n * 0.8;
    for (const l of this.config.flows) {
      if (l.animation?.particle_count !== void 0) continue;
      const p = this.animStyle(l);
      if (p !== "dots" && p !== "trail") continue;
      const d = this.profileFor(l), u = Math.abs(this.latestValues.get(l.id) ?? 0), h = We(l, d), f = this.updateBurstState(l.id, u, h, d), m = Math.max(
        1,
        Math.round(d.particle_count_curve ? d.particle_count_curve(u) : Be)
      ), y = this.config.defaults?.burst_max_particles ?? le, g = Math.min(y, Math.max(1, Math.round(m * f)));
      let b = this.adaptiveCount.get(l.id) ?? g;
      r && b > 1 ? (b -= 1, s && console.log("[FlowMe] adaptive count:", l.id, b, "avg frame:", o)) : a && b < g && (b += 1, s && console.log("[FlowMe] adaptive count:", l.id, b, "avg frame:", o)), this.adaptiveCount.set(l.id, Math.min(b, g));
    }
  }
  /** Resolve effective particle count, respecting explicit override and burst */
  resolveParticleCount(e, i, n, o) {
    const s = e.animation ?? {};
    if (s.particle_count !== void 0) return s.particle_count;
    const r = this.animStyle(e), a = r === "spark" ? 8 : Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(n) : Be)
    ), l = Math.max(1, a), p = this.config?.defaults?.burst_max_particles ?? le, d = Math.min(p, Math.max(1, Math.round(l * o)));
    return r === "dots" || r === "trail" ? Math.min(this.adaptiveCount.get(e.id) ?? d, d) : d;
  }
  resolveParticleRadius(e) {
    return (this.config?.defaults?.dot_radius ?? no) * (e.animation?.particle_size ?? 1);
  }
  resolveGlow(e, i) {
    return e.animation?.glow_intensity === 0 ? !1 : i.glow;
  }
  glowFilter(e, i, n) {
    return this.resolveGlow(e, i) ? `drop-shadow(0 0 ${(6 * (e.animation?.glow_intensity ?? 1)).toFixed(1)}px ${n})` : "";
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
    const s = o.particle_spacing ?? "even", r = n / 1e3, a = r / i;
    switch (s) {
      case "even":
      default:
        return Array.from({ length: i }, (l, p) => -(a * p));
      case "random": {
        const l = performance.now(), p = this.randomOffsetsLastUpdate.get(e) ?? 0, d = 3e3;
        let u = this.randomOffsets.get(e);
        if (!u || u.length !== i || l - p > d) {
          const h = a * 0.1, f = [];
          for (let m = 0; m < i; m++) {
            let y, g = 0;
            do
              y = -(Math.random() * r), g++;
            while (g < 20 && f.some((b) => {
              const x = Math.abs((y - b) % r + r) % r;
              return x < h && x > r - h;
            }));
            f.push(y);
          }
          this.randomOffsets.set(e, f), this.randomOffsetsLastUpdate.set(e, l), u = f;
        }
        return u;
      }
      case "clustered": {
        const l = Math.max(1, Math.round(o.cluster_size ?? 3)), p = o.cluster_gap ?? 3, d = a * 0.3, u = [];
        let h = 0;
        for (let f = 0; f < i; f++) {
          const m = f % l;
          f > 0 && m === 0 && (h += d * l * p), u.push(-(h % r)), h += d;
        }
        return u;
      }
      case "pulse": {
        const l = 1 / Math.max(0.01, o.pulse_frequency ?? 1.5), p = o.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % l < l * p ? Array.from({ length: i }, (h, f) => -(a * 0.1 * f)) : Array.from({ length: i }, (h, f) => -(a * f));
      }
      case "wave_spacing": {
        const l = o.wave_frequency ?? 2, p = o.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (d, u) => {
          const h = u / i * Math.PI * 2 * l, f = Math.sin(h) * p * (r / 2);
          return -(a * u + f);
        });
      }
      case "wave_lateral":
        return Array.from({ length: i }, (l, p) => -(a * p));
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
        const o = i.animation?.wave_frequency ?? 2, s = i.animation?.wave_amplitude ?? 20, r = n.particles.length, a = Math.PI * 2 / r, l = e * o * 2e-3 % (Math.PI * 2);
        for (let p = 0; p < r; p++) {
          const d = n.particles[p];
          if (!d) continue;
          const u = l + p * a, h = Math.sin(u) * s;
          if (d.shape.getAttribute("data-kind") === "custom_svg") {
            d.shape.hasAttribute("data-base-transform") || d.shape.setAttribute("data-base-transform", d.shape.getAttribute("transform") ?? "");
            const m = d.shape.getAttribute("data-base-transform") ?? "";
            d.shape.setAttribute("transform", `${m} translate(0,${h.toFixed(2)})`);
          } else
            d.shape.setAttribute("transform", `translate(0,${h.toFixed(2)})`);
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
        const s = o.particles.length, a = (this.durInterp.currentDurMs.get(i.id) ?? 2e3) / 1e3, l = i.animation ?? {}, p = [];
        if (n === "wave_spacing") {
          const h = l.wave_frequency ?? 2, f = Math.min(l.wave_amplitude ?? 0.85, 0.95), m = e * 1e-3 / a, y = [];
          for (let g = 0; g < s; g++) {
            const b = (g / s + m) % 1, x = Math.sin(b * Math.PI * 2 * h) * f * (1 / s);
            y.push(((b + x) % 1 + 1) % 1);
          }
          y.sort((g, b) => g - b), p.push(...y);
        } else {
          const h = l.pulse_frequency ?? 1.5, f = l.pulse_ratio ?? 0.25, m = e * h * 1e-3 % 1, y = e * 1e-3 / a % 1, g = 1 / s;
          let b;
          m < f ? b = 1 - (1 - m / f) * 0.9 : b = (m - f) / (1 - f);
          for (let x = 0; x < s; x++)
            p.push(((y + x * g * b) % 1 + 1) % 1);
        }
        const d = o.path;
        let u = 0;
        try {
          u = d ? d.getTotalLength() : 0;
        } catch {
          u = 0;
        }
        for (let h = 0; h < s; h++) {
          const f = o.particles[h];
          if (!f) continue;
          if (!f.animateMotion.hasAttribute("data-js-driven")) {
            const y = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            y.setAttribute("data-js-driven", "1"), y.setAttribute("begin", "indefinite"), y.setAttribute("dur", "1s"), f.animateMotion.replaceWith(y), f.animateMotion = y, f.shape.appendChild(y);
          }
          const m = p[h] ?? 0;
          if (u > 0 && d)
            try {
              const y = d.getPointAtLength(m * u), g = this.particleKind(f);
              if (g === "teardrop" || g === "diamond")
                f.shape.setAttribute("transform", `translate(${y.x.toFixed(2)},${y.y.toFixed(2)})`);
              else {
                const b = Math.max(0.5, u * 0.01), x = d.getPointAtLength(Math.max(0, m * u - b)), $ = d.getPointAtLength(Math.min(u, m * u + b)), A = Math.atan2($.y - x.y, $.x - x.x) * (180 / Math.PI);
                f.shape.setAttribute("transform", `translate(${y.x.toFixed(2)},${y.y.toFixed(2)}) rotate(${A.toFixed(1)})`);
              }
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
  applyDots(e, i, n, o, s, r, a, l) {
    const p = i.animation?.direction ?? "auto", d = this.resolveParticleCount(i, n, o, l), u = i.animation?.particle_shape ?? "circle", h = i.animation?.flicker === !0;
    if (e.particles.length !== d || e.particles[0] && this.particleKind(e.particles[0]) !== u) {
      for (const b of e.particles) b.shape.remove();
      e.particles = [];
      for (let b = 0; b < d; b++)
        e.particles.push(this.makeParticle(e, u, r, i, n));
    }
    if (p === "both") {
      if (!e.particlesBack || e.particlesBack.length !== d) {
        if (e.particlesBack) for (const b of e.particlesBack) b.shape.remove();
        e.particlesBack = [];
        for (let b = 0; b < d; b++)
          e.particlesBack.push(this.makeParticle(e, u, r, i, n));
      }
    } else if (e.particlesBack) {
      for (const b of e.particlesBack) b.shape.remove();
      e.particlesBack = void 0;
    }
    const f = `${(s / 1e3).toFixed(3)}s`, m = i.animation ?? {}, y = this.resolveParticleBegins(i.id, d, s, m), g = (b, x) => {
      for (let $ = 0; $ < b.length; $++) {
        const A = b[$];
        this.updateParticleColor(A, r, i, n, h);
        const S = document.createElementNS(M, "animateMotion");
        S.setAttribute("repeatCount", "indefinite"), S.setAttribute("dur", f), S.setAttribute("rotate", "auto"), S.setAttribute("begin", `${(y[$] ?? 0).toFixed(3)}s`);
        const I = document.createElementNS(M, "mpath"), C = this.motionPathRef(e, i, x);
        I.setAttributeNS(U, "href", `#${C}`), I.setAttribute("href", `#${C}`), S.appendChild(I), A.animateMotion.replaceWith(S), A.animateMotion = S, A.shape.appendChild(S);
      }
    };
    g(e.particles, a), e.particlesBack && g(e.particlesBack, -a);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(e, i, n, o, s, r) {
    for (const b of e.particles) b.shape.remove();
    if (e.particles = [], !e.lineStroke) {
      const b = document.createElementNS(M, "use");
      b.setAttributeNS(U, "href", `#${e.pathId}`), b.setAttribute("href", `#${e.pathId}`), b.setAttribute("fill", "none"), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-linejoin", "round"), e.group.appendChild(b), e.lineStroke = b;
    }
    const a = this.config?.defaults?.line_width ?? tt, p = (i.animation ?? {}).dash_gap ?? 0.5, d = Math.max(0.1, p / r), u = 14, h = u * d, f = this.glowFilter(i, this.profileFor(i), o);
    e.lineStroke.setAttribute("stroke", o), e.lineStroke.setAttribute("stroke-width", String(a * 2)), e.lineStroke.setAttribute("stroke-dasharray", `${u} ${h}`), f && e.lineStroke.setAttribute("filter", f);
    const m = u + h, y = e.lineStroke.querySelector("animate");
    y && y.remove();
    const g = document.createElementNS(M, "animate");
    g.setAttribute("attributeName", "stroke-dashoffset"), g.setAttribute("from", s > 0 ? "0" : `-${m}`), g.setAttribute("to", s > 0 ? `-${m}` : "0"), g.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), g.setAttribute("repeatCount", "indefinite"), e.lineStroke.appendChild(g);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(e, i, n, o, s, r, a) {
    for (const I of e.particles) I.shape.remove();
    e.particles = [], e.lineStroke?.remove(), e.lineStroke = void 0;
    const l = new Map(this.config?.nodes.map((I) => [I.id, I]) ?? []), p = l.get(i.from_node), d = l.get(i.to_node);
    if (!p || !d) return;
    const u = [p.position, ...i.waypoints, d.position], h = Ni(u), f = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(o) : Math.max(3, Math.floor(h / 15))
      )
    ), m = this.config?.defaults?.burst_max_particles ?? le, y = Math.min(m, Math.max(2, Math.round(f * a))), g = this.containerSize(), b = i.animation?.pulse_width ?? 2, x = oo * (i.animation?.particle_size ?? 1), $ = this.resolveGlow(i, n);
    if (!e.pulseCircles || e.pulseCircles.length !== y) {
      if (e.pulseCircles) for (const I of e.pulseCircles) I.circle.remove();
      e.pulseCircles = [];
      for (let I = 0; I < y; I++) {
        const C = document.createElementNS(M, "circle");
        C.setAttribute("r", "0"), C.setAttribute("fill", "none"), C.setAttribute("stroke", r), C.setAttribute("stroke-width", String(b)), C.setAttribute("opacity", "0"), $ && C.setAttribute("filter", this.glowFilter(i, n, r));
        const N = document.createElementNS(M, "animate");
        N.setAttribute("attributeName", "r"), N.setAttribute("values", `0;${x};0`), N.setAttribute("repeatCount", "indefinite"), C.appendChild(N);
        const F = document.createElementNS(M, "animate");
        F.setAttribute("attributeName", "opacity"), F.setAttribute("values", "0;0.9;0"), F.setAttribute("repeatCount", "indefinite"), C.appendChild(F), e.group.appendChild(C), e.pulseCircles.push({ circle: C, animateRadius: N, animateOpacity: F });
      }
    }
    const A = e.path;
    let S = 0;
    try {
      S = A.getTotalLength();
    } catch {
      S = 0;
    }
    for (let I = 0; I < e.pulseCircles.length; I++) {
      const C = e.pulseCircles[I], N = (I + 0.5) / e.pulseCircles.length;
      let F;
      if (S > 0) {
        const z = A.getPointAtLength(N * S);
        F = { x: z.x, y: z.y };
      } else {
        const z = Gn(u, N);
        F = pe(z, g);
      }
      C.circle.setAttribute("cx", F.x.toFixed(2)), C.circle.setAttribute("cy", F.y.toFixed(2)), C.circle.setAttribute("stroke", r);
      const P = `${(s / 1e3).toFixed(3)}s`, O = `${(-s * I / (e.pulseCircles.length * 1e3)).toFixed(3)}s`;
      C.animateRadius.setAttribute("values", `0;${x};0`), C.animateRadius.setAttribute("dur", P), C.animateRadius.setAttribute("begin", O), C.animateOpacity.setAttribute("dur", P), C.animateOpacity.setAttribute("begin", O);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(e, i, n, o, s, r) {
    const a = this.profileFor(i), l = i.animation?.particle_count ?? Be, p = this.config?.defaults?.burst_max_particles ?? le, d = Math.min(p, Math.max(1, Math.round(l * r))), u = i.animation?.flicker === !0;
    if (e.particles.length !== d) {
      for (const m of e.particles) m.shape.remove();
      e.particles = [];
      for (let m = 0; m < d; m++)
        e.particles.push(this.makeParticle(e, "arrow", o, i, a));
    }
    const h = `${(n / 1e3).toFixed(3)}s`, f = this.resolveParticleBegins(i.id, d, n, i.animation ?? {});
    for (let m = 0; m < e.particles.length; m++) {
      const y = e.particles[m];
      this.updateParticleColor(y, o, i, a, u);
      const g = document.createElementNS(M, "animateMotion");
      g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", h), g.setAttribute("rotate", "auto"), g.setAttribute("begin", `${(f[m] ?? 0).toFixed(3)}s`);
      const b = document.createElementNS(M, "mpath"), x = this.motionPathRef(e, i, s);
      b.setAttributeNS(U, "href", `#${x}`), b.setAttribute("href", `#${x}`), g.appendChild(b), y.animateMotion.replaceWith(g), y.animateMotion = g, y.shape.appendChild(g);
    }
  }
  /**
   * trail — head uses particle_shape; four tail segments follow along path with staggered begins.
   */
  applyTrail(e, i, n, o, s, r) {
    const a = this.profileFor(i), l = i.animation?.particle_count ?? Be, p = this.config?.defaults?.burst_max_particles ?? le, d = Math.min(p, Math.max(1, Math.round(l * r))), u = i.animation?.flicker === !0, h = i.animation?.particle_shape ?? "circle", f = h === "teardrop" || h === "diamond" ? "0" : "auto";
    if (!(e.particles.length === d && e.particles[0]?.shape.hasAttribute("data-trail-pack") && e.particles[0]?.shape.getAttribute("data-head-kind") === h)) {
      for (const A of e.particles) A.shape.remove();
      e.particles = [];
      for (let A = 0; A < d; A++)
        e.particles.push(this.makeTrailParticle(e, i, a, o, h));
    }
    const y = `${(n / 1e3).toFixed(3)}s`, g = n / 1e3, b = this.resolveParticleBegins(i.id, d, n, i.animation ?? {});
    let x = 100;
    try {
      x = Math.max(1, e.path.getTotalLength());
    } catch {
      x = 100;
    }
    const $ = (A, S) => {
      const I = document.createElementNS(M, "animateMotion");
      I.setAttribute("repeatCount", "indefinite"), I.setAttribute("dur", y), I.setAttribute("rotate", f), I.setAttribute("begin", `${S.toFixed(4)}s`);
      const C = document.createElementNS(M, "mpath"), N = this.motionPathRef(e, i, s);
      return C.setAttributeNS(U, "href", `#${N}`), C.setAttribute("href", `#${N}`), I.appendChild(C), A.replaceWith(I), I;
    };
    for (let A = 0; A < e.particles.length; A++) {
      const S = e.particles[A];
      this.updateParticleColor(S, o, i, a, u);
      const I = b[A] ?? 0, C = S.trailMotions;
      if (C && C.length === 4) {
        const N = s >= 0 ? 1 : -1;
        for (let F = 0; F < 4; F++) {
          const P = po[F], O = I + N * (P / x) * g;
          C[F] = $(C[F], O);
        }
      }
      S.animateMotion = $(S.animateMotion, I);
    }
  }
  /**
   * fluid — animated linear gradient along full path (v1.23.1).
   */
  applyFluid(e, i, n, o, s) {
    for (const P of e.particles) P.shape.remove();
    if (e.particles = [], !this.svg) return;
    const r = this.svg.querySelector("defs");
    if (!r) return;
    const a = new Map(this.config.nodes.map((P) => [P.id, P])), l = a.get(i.from_node), p = a.get(i.to_node), d = this.containerSize();
    if (!l || !p) return;
    if (!e.lineStroke) {
      const P = document.createElementNS(M, "use");
      P.setAttributeNS(U, "href", `#${e.pathId}`), P.setAttribute("href", `#${e.pathId}`), P.setAttribute("fill", "none"), P.setAttribute("stroke-linecap", "round"), P.setAttribute("stroke-linejoin", "round"), e.group.appendChild(P), e.lineStroke = P;
    }
    const h = `fluid-grad-${i.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    let f = this.svg.getElementById(h);
    f || (f = document.createElementNS(M, "linearGradient"), f.setAttribute("id", h), r.appendChild(f)), e.fluidGradient = f;
    const m = e.path;
    let y = 100;
    try {
      y = Math.max(1, m.getTotalLength());
    } catch {
      y = 100;
    }
    let g = pe(l.position, d), b = pe(p.position, d);
    try {
      const P = m.getPointAtLength(0), O = m.getPointAtLength(y);
      g = { x: P.x, y: P.y }, b = { x: O.x, y: O.y };
    } catch {
    }
    const x = (b.x - g.x) / y, $ = (b.y - g.y) / y;
    for (f.setAttribute("gradientUnits", "userSpaceOnUse"), f.setAttribute("x1", String(g.x)), f.setAttribute("y1", String(g.y)), f.setAttribute("x2", String(g.x + x * 2 * y)), f.setAttribute("y2", String(g.y + $ * 2 * y)); f.firstChild; ) f.firstChild.remove();
    const A = [
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
    for (const [P, O] of A) {
      const z = document.createElementNS(M, "stop");
      z.setAttribute("offset", P), z.setAttribute("stop-color", o), z.setAttribute("stop-opacity", O), f.appendChild(z);
    }
    const S = document.createElementNS(M, "animateTransform");
    S.setAttribute("attributeName", "gradientTransform"), S.setAttribute("type", "translate"), S.setAttribute("additive", "replace"), S.setAttribute("calcMode", "linear"), S.setAttribute("dur", `${Math.max(1, Math.round(n))}ms`), S.setAttribute("repeatCount", "indefinite");
    const I = x * y, C = $ * y;
    s >= 0 ? (S.setAttribute("from", "0 0"), S.setAttribute("to", `${I} ${C}`)) : (S.setAttribute("from", "0 0"), S.setAttribute("to", `${-I} ${-C}`)), f.appendChild(S);
    const N = (this.config?.defaults?.line_width ?? tt) * 3, F = this.glowFilter(i, this.profileFor(i), o);
    if (e.lineStroke.setAttribute("stroke", `url(#${h})`), e.lineStroke.setAttribute("stroke-width", String(N)), e.lineStroke.removeAttribute("stroke-dasharray"), F && e.lineStroke.setAttribute("filter", F), !e.fluidInitialised) {
      e.fluidInitialised = !0, e.lineStroke.setAttribute("opacity", "0");
      const P = document.createElementNS(M, "animate");
      P.setAttribute("attributeName", "opacity"), P.setAttribute("values", "0;1"), P.setAttribute("dur", "600ms"), P.setAttribute("fill", "freeze"), e.lineStroke.appendChild(P);
    }
  }
  /**
   * spark — rAF-driven motion, white-hot core, branches via pool (v1.23.2).
   */
  applySpark(e, i, n, o, s, r, a, l) {
    const p = this.resolveParticleCount(i, n, o, l), d = Math.min(
      this.config?.defaults?.burst_max_particles ?? le,
      Math.round(p * l)
    ), u = i.animation?.particle_shape ?? "circle";
    if (e.particles.length !== d || e.particles.some((f) => !f.shape.hasAttribute("data-spark-pack"))) {
      for (const y of e.particles) y.shape.remove();
      e.particles = [];
      const f = [], m = i.animation?.particle_spacing === "random";
      for (let y = 0; y < d; y++) {
        const g = (0.5 + Math.random()) * this.resolveParticleRadius(i), b = Yt(r, "#ffffff", 0.3), x = document.createElementNS(M, "g");
        x.setAttribute("data-spark-pack", "1");
        const { shape: $ } = this.buildParticleShapeOnly(e, u, g, b, i);
        $.setAttribute("data-spark-core", "1");
        const A = (2.2 + y % 7 * 0.45).toFixed(2);
        $.setAttribute(
          "filter",
          `drop-shadow(0 0 2px #FFFFFF) drop-shadow(0 0 ${A}px ${r})`
        );
        const S = 0.4 + Math.random() * 0.6;
        $.setAttribute("opacity", String(S.toFixed(3))), x.appendChild($);
        const I = document.createElementNS(M, "animateMotion");
        I.setAttribute("dur", "99999s"), x.appendChild(I), e.group.appendChild(x);
        let C = y / Math.max(1, d);
        m && (C += (Math.random() - 0.5) * 0.12), C = (C % 1 + 1) % 1, f.push({
          group: x,
          shape: $,
          progress: C,
          baseR: g,
          baseOpacity: S,
          color: b,
          flowId: i.id
        }), e.particles.push({ shape: x, animateMotion: I });
      }
      this.sparkMainsByFlow.set(i.id, f);
    } else {
      const f = this.sparkMainsByFlow.get(i.id);
      if (f)
        for (let m = 0; m < f.length; m++) {
          const y = f[m], g = Yt(r, "#ffffff", 0.3);
          y.color = g, y.shape.setAttribute("fill", g);
          const b = (2.2 + m % 7 * 0.45).toFixed(2);
          y.shape.setAttribute(
            "filter",
            `drop-shadow(0 0 2px #FFFFFF) drop-shadow(0 0 ${b}px ${r})`
          );
        }
    }
    this.sparkFlowPhysics.set(i.id, { durMs: s, direction: a });
  }
  initSparkBranchLayer() {
    if (!this.svg) return;
    const e = document.createElementNS(M, "g");
    e.setAttribute("class", "flowme-spark-branches"), e.setAttribute("pointer-events", "none"), this.svg.appendChild(e);
    for (let i = 0; i < 15; i++) {
      const n = document.createElementNS(M, "g");
      n.setAttribute("opacity", "0"), e.appendChild(n), this.sparkBranchPool.push(n);
    }
  }
  updateSparkMains(e) {
    if (!(!this.svg || !this.config))
      for (const i of this.config.flows) {
        if (this.animStyle(i) !== "spark") continue;
        const n = this.flowNodes.get(i.id), o = this.sparkFlowPhysics.get(i.id), s = this.sparkMainsByFlow.get(i.id);
        if (!n || !o || !s?.length) continue;
        let r = 100;
        try {
          r = Math.max(1e-6, n.path.getTotalLength());
        } catch {
          continue;
        }
        const a = 1 / Math.max(50, o.durMs);
        for (const l of s) {
          for (l.progress += o.direction * a * e; l.progress > 1; ) l.progress -= 1;
          for (; l.progress < 0; ) l.progress += 1;
          let p;
          try {
            p = n.path.getPointAtLength(l.progress * r);
          } catch {
            continue;
          }
          l.group.setAttribute("transform", `translate(${p.x.toFixed(2)},${p.y.toFixed(2)})`);
          const d = 1 + Math.sin(performance.now() / 45 + l.progress * 12) * 0.15, u = Math.max(0.25, Math.min(1, l.baseOpacity * d));
          l.shape.setAttribute("opacity", String(u.toFixed(3))), Math.random() < 8e-3 && this.spawnSparkBranch(n, r, l.progress, p.x, p.y, o.direction, o.durMs, l.baseR, i);
        }
      }
  }
  spawnSparkBranch(e, i, n, o, s, r, a, l, p) {
    const d = n * i, u = Math.max(2, i * 0.02);
    let h, f;
    try {
      h = e.path.getPointAtLength(Math.max(0, d - u * r)), f = e.path.getPointAtLength(Math.min(i, d + u * r));
    } catch {
      return;
    }
    const m = Math.atan2(f.y - h.y, f.x - h.x), y = 20 + Math.random() * 20, g = m + (Math.random() < 0.5 ? -1 : 1) * (y * Math.PI) / 180, b = i / Math.max(50, a), x = (0.4 + Math.random() * 0.4) * b, $ = 15 + Math.random() * 35, A = Math.random() < 0.5 ? "return" : "fadeout", S = this.sparkBranchPool.find((O) => parseFloat(O.getAttribute("opacity") ?? "1") < 0.05);
    if (!S) return;
    for (; S.firstChild; ) S.firstChild.remove();
    const I = p.animation?.particle_shape ?? "circle", C = Math.max(1.2, l * 0.7), N = document.createElementNS(M, "g"), { shape: F, alreadyAppended: P } = this.buildParticleShapeOnly(
      e,
      I,
      C,
      "#FFFFFF",
      p,
      I === "custom_svg" ? N : void 0
    );
    P || N.appendChild(F), S.appendChild(N), S.setAttribute("transform", `translate(${o},${s})`), S.setAttribute("opacity", "1"), this.sparkBranchActive.push({
      el: S,
      flowId: e.group.getAttribute("data-flow-id") ?? "",
      x: o,
      y: s,
      vx: Math.cos(g),
      vy: Math.sin(g),
      speed: x,
      dist: 0,
      maxDist: $,
      angle: g,
      fadeType: A,
      path: e.path,
      plen: i
    });
  }
  updateSparkBranches(e) {
    const i = [];
    for (const n of this.sparkBranchActive) {
      n.dist += n.speed * e;
      const o = n.dist / Math.max(1e-6, n.maxDist);
      if (o >= 1) {
        n.el.setAttribute("opacity", "0");
        continue;
      }
      if (n.fadeType === "return" && o > 0.5) {
        let s = n.x, r = n.y, a = 1 / 0;
        const l = 20;
        for (let d = 0; d <= l; d++) {
          const u = d / l * n.plen;
          let h;
          try {
            h = n.path.getPointAtLength(u);
          } catch {
            continue;
          }
          const f = (h.x - n.x) ** 2 + (h.y - n.y) ** 2;
          f < a && (a = f, s = h.x, r = h.y);
        }
        const p = Math.atan2(r - n.y, s - n.x);
        n.angle += (p - n.angle) * 0.14;
      }
      n.x += Math.cos(n.angle) * n.speed * e, n.y += Math.sin(n.angle) * n.speed * e, n.el.setAttribute("transform", `translate(${n.x.toFixed(2)},${n.y.toFixed(2)})`), n.el.setAttribute("opacity", String(Math.max(0, (1 - o) * 0.95).toFixed(3))), i.push(n);
    }
    this.sparkBranchActive = i;
  }
  makeTrailParticle(e, i, n, o, s) {
    const r = this.resolveParticleRadius(i), a = this.resolveGlow(i, n), l = s === "custom_svg" ? "circle" : s, p = document.createElementNS(M, "g");
    p.setAttribute("data-trail-pack", "1"), p.setAttribute("data-head-kind", s);
    const d = [], u = [], h = s === "teardrop" || s === "diamond" ? "0" : "auto";
    for (let b = 0; b < 4; b++) {
      const x = document.createElementNS(M, "g"), { shape: $ } = this.buildParticleShapeOnly(e, l, r * uo[b], o, i);
      a && $.setAttribute("filter", this.glowFilter(i, n, o)), $.setAttribute("opacity", String(ho[b])), x.appendChild($);
      const A = document.createElementNS(M, "animateMotion");
      A.setAttribute("repeatCount", "indefinite"), A.setAttribute("dur", "2s"), A.setAttribute("rotate", h);
      const S = document.createElementNS(M, "mpath");
      S.setAttributeNS(U, "href", `#${e.pathId}`), S.setAttribute("href", `#${e.pathId}`), A.appendChild(S), x.appendChild(A), u.push(x), d.push(A);
    }
    for (let b = 3; b >= 0; b--) p.appendChild(u[b]);
    const f = document.createElementNS(M, "g");
    let m;
    s === "custom_svg" ? m = this.buildParticleShapeOnly(e, s, r, o, i, f).shape : (m = this.buildParticleShapeOnly(e, s, r, o, i).shape, f.appendChild(m)), a && m.setAttribute("filter", this.glowFilter(i, n, o));
    const y = document.createElementNS(M, "animateMotion");
    y.setAttribute("repeatCount", "indefinite"), y.setAttribute("dur", "2s"), y.setAttribute("rotate", h);
    const g = document.createElementNS(M, "mpath");
    return g.setAttributeNS(U, "href", `#${e.pathId}`), g.setAttribute("href", `#${e.pathId}`), y.appendChild(g), f.appendChild(y), p.appendChild(f), e.group.appendChild(p), { shape: p, animateMotion: y, trailMotions: d };
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(e) {
    const i = e.shape.tagName.toLowerCase();
    return i === "g" && e.shape.hasAttribute("data-trail-pack") ? e.shape.getAttribute("data-head-kind") ?? "circle" : i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? e.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : i === "path" ? e.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  /**
   * Geometry only — used by dots/arrow/spark and trail head/tail segments.
   */
  buildParticleShapeOnly(e, i, n, o, s, r) {
    let a, l = !1;
    switch (i) {
      case "square": {
        const p = n * 2, d = document.createElementNS(M, "rect");
        d.setAttribute("width", String(p)), d.setAttribute("height", String(p)), d.setAttribute("x", String(-p / 2)), d.setAttribute("y", String(-p / 2)), d.setAttribute("rx", "1.5"), d.setAttribute("fill", o), d.setAttribute("opacity", "0"), a = d;
        break;
      }
      case "arrow": {
        const p = document.createElementNS(M, "path");
        p.setAttribute("d", lo(n)), p.setAttribute("fill", o), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "arrow"), a = p;
        break;
      }
      case "teardrop": {
        const p = document.createElementNS(M, "path");
        p.setAttribute("d", co(n)), p.setAttribute("fill", o), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "teardrop"), a = p;
        break;
      }
      case "diamond": {
        const p = n * 1.4, d = document.createElementNS(M, "polygon");
        d.setAttribute("points", `0,${-p} ${p},0 0,${p} ${-p},0`), d.setAttribute("fill", o), d.setAttribute("opacity", "0"), d.setAttribute("data-kind", "diamond"), a = d;
        break;
      }
      case "custom_svg": {
        const p = s.animation?.custom_svg_path ?? "";
        if (!p) {
          console.warn(`[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${s.id}`);
          const h = document.createElementNS(M, "circle");
          h.setAttribute("r", String(n)), h.setAttribute("fill", o), h.setAttribute("opacity", "0"), a = h;
          break;
        }
        const d = document.createElementNS(M, "path");
        d.setAttribute("d", p), d.setAttribute("fill", o), d.setAttribute("opacity", "0"), d.setAttribute("data-kind", "custom_svg"), (r ?? e.group).appendChild(d), l = !0;
        try {
          const h = d.getBBox(), f = Math.max(h.width, h.height, 1), y = n * 2 / f, g = -(h.x + h.width / 2), b = -(h.y + h.height / 2);
          d.setAttribute("transform", `scale(${y.toFixed(4)}) translate(${g.toFixed(4)},${b.toFixed(4)})`);
        } catch {
        }
        a = d;
        break;
      }
      default: {
        const p = document.createElementNS(M, "circle");
        p.setAttribute("r", String(n)), p.setAttribute("fill", o), p.setAttribute("opacity", "0"), a = p;
      }
    }
    return { shape: a, alreadyAppended: l };
  }
  makeParticle(e, i, n, o, s) {
    const r = this.resolveParticleRadius(o), a = this.resolveGlow(o, s), { shape: l, alreadyAppended: p } = this.buildParticleShapeOnly(e, i, r, n, o);
    a && (l.setAttribute("filter", this.glowFilter(o, s, n)), l.style.color = n);
    const d = document.createElementNS(M, "animateMotion");
    d.setAttribute("repeatCount", "indefinite"), d.setAttribute("dur", "2s"), d.setAttribute(
      "rotate",
      i === "teardrop" || i === "diamond" ? "0" : "auto"
    );
    const u = document.createElementNS(M, "mpath");
    return u.setAttributeNS(U, "href", `#${e.pathId}`), u.setAttribute("href", `#${e.pathId}`), d.appendChild(u), l.appendChild(d), p || e.group.appendChild(l), { shape: l, animateMotion: d };
  }
  updateParticleColor(e, i, n, o, s) {
    if (e.shape.hasAttribute("data-trail-pack") ? e.shape.querySelectorAll("path, circle, rect, ellipse, polygon").forEach((l) => {
      l.setAttribute("fill", i);
    }) : e.shape.hasAttribute("data-spark-core") || e.shape.setAttribute("fill", i), e.shape.style.color = i, this.resolveGlow(n, o) && !e.shape.hasAttribute("data-spark-core") && e.shape.setAttribute("filter", this.glowFilter(n, o, i)), !e.shape.hasAttribute("data-trail-pack") && !e.shape.hasAttribute("data-spark-core") && e.shape.setAttribute("opacity", "1"), s && !e.shape.hasAttribute("data-trail-pack") && !e.shape.hasAttribute("data-spark-core")) {
      if (!e.flickerAnim) {
        const h = document.createElementNS(M, "animate");
        h.setAttribute("attributeName", "opacity"), h.setAttribute("repeatCount", "indefinite"), e.shape.appendChild(h), e.flickerAnim = h;
      }
      const p = (1 / (2 + Math.random() * 6)).toFixed(3), d = (0.85 + Math.random() * 0.1).toFixed(2), u = (0.95 + Math.random() * 0.05).toFixed(2);
      e.flickerAnim.setAttribute("values", `${u};${d};${u}`), e.flickerAnim.setAttribute("dur", `${p}s`);
    } else e.flickerAnim && (e.flickerAnim.remove(), e.flickerAnim = void 0);
  }
  profileFor(e) {
    return T(e.domain ?? this.config?.domain);
  }
  primaryColor(e) {
    const i = this.profileFor(e), n = e.domain ?? this.config?.domain, o = this.config?.flows.findIndex((s) => s.id === e.id) ?? -1;
    return fe(e, i, n, 1, this.config?.domain_colors, o >= 0 ? o : 0);
  }
}
const fo = `/* eslint-disable no-undef */
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
`, Zt = "flowme-keyframes", pt = "flowme-cycle", go = 5, mo = 2;
let ee = null, Xt = !1;
function bo() {
  if (document.getElementById(Zt)) return;
  const t = document.createElement("style");
  t.id = Zt, t.textContent = `@keyframes ${pt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(t);
}
function yo() {
  if (Xt) return;
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
  Xt = !0;
}
async function vo() {
  if (ee) return ee;
  const t = CSS.paintWorklet;
  if (!t)
    return ee = Promise.reject(new Error("paintWorklet not available")), ee;
  const e = new Blob([fo], { type: "application/javascript" }), i = URL.createObjectURL(e);
  return ee = t.addModule(i).catch((n) => {
    throw ee = null, n;
  }).finally(() => {
  }), ee;
}
class wo {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Bi(() => this.flushUpdates(), 120), this.lastDurMsByFlow = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.container = e, this.config = i, this.flowsById = new Map(i.flows.map((o) => [o.id, o])), bo(), yo(), await vo();
    const n = document.createElement("div");
    n.className = "flow-houdini flow-houdini-root", n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", e.appendChild(n), this.wrapper = n;
    for (const o of i.flows) {
      const s = document.createElement("div");
      s.className = "flow-houdini", s.dataset.flowId = o.id, s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.background = "paint(flowme-painter)", s.style.setProperty("--flowme-dur", "2000"), s.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)", s.style.animation = `${pt} calc(var(--flowme-dur) * 1ms) linear infinite`, s.style.opacity = "0", n.appendChild(s), this.flowDivs.set(o.id, { el: s });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(e);
  }
  updateFlow(e, i) {
    this.flowsById.has(e) && (this.latestValues.set(e, i), this.applyUpdate());
  }
  setFlowAriaLabel(e, i) {
    const n = this.flowDivs.get(e);
    n && (n.el.setAttribute("role", "img"), n.el.setAttribute("aria-label", i));
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
      const p = [s.position, ...n.waypoints, r.position].map((d) => pe(d, e)).map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ");
      o.el.style.setProperty("--flowme-path", `"${p}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [e, i] of this.latestValues) this.applyFlow(e, i);
  }
  applyFlow(e, i) {
    const n = this.flowsById.get(e), o = this.flowDivs.get(e);
    if (!n || !o) return;
    const s = this.profileFor(n), r = We(n, s), a = Math.abs(i);
    if (!(a >= r.threshold)) {
      o.el.style.opacity = "0";
      return;
    }
    o.el.style.opacity = "1";
    const p = n.speed_multiplier ?? 1, d = Math.max(50, K(a, r) * p), u = i < 0 != (n.reverse === !0) ? -1 : 1, h = n.domain ?? this.config?.domain, f = this.config?.flows.findIndex((A) => A.id === n.id) ?? -1, m = fe(
      n,
      s,
      h,
      u,
      this.config?.domain_colors,
      f >= 0 ? f : 0
    ), y = Math.max(
      1,
      Math.round(s.particle_count_curve ? s.particle_count_curve(i) : 3)
    ), g = s.wave_amplitude_curve ? s.wave_amplitude_curve(i) : 4, b = o.el.style;
    b.setProperty("--flowme-shape", s.shape), b.setProperty("--flowme-color", m), b.setProperty("--flowme-glow", s.glow ? "1" : "0"), b.setProperty("--flowme-count", String(y)), b.setProperty("--flowme-radius", String(go)), b.setProperty("--flowme-line", String(mo)), b.setProperty("--flowme-amp", String(g)), b.setProperty("--flowme-direction", String(u));
    const x = this.lastDurMsByFlow.get(e) ?? d, $ = Math.round(d);
    if (Math.abs(d - x) < 50) {
      b.transition = "none", b.setProperty("--flowme-dur", String($));
      const A = o.el;
      requestAnimationFrame(() => {
        A.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)";
      });
    } else
      b.setProperty("--flowme-dur", String($));
    this.lastDurMsByFlow.set(e, d), b.animation = `${pt} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }
  profileFor(e) {
    return T(e.domain ?? this.config?.domain);
  }
}
function xo() {
  const t = _o(), e = t ?? "svg", i = $o(), n = Ri();
  return R(
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
  ), n ? new Oe() : e === "houdini" ? i ? new wo() : (R("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Oe()) : new Oe();
}
function $o() {
  try {
    const t = CSS;
    return "paintWorklet" in t && "registerProperty" in t;
  } catch {
    return !1;
  }
}
function _o() {
  try {
    const e = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (e === "svg" || e === "houdini") return e;
  } catch {
  }
  return null;
}
function qt(t) {
  const e = t.size?.width ?? 20, i = t.size?.height ?? 15;
  return `left: ${t.position.x}%; top: ${t.position.y}%; width: ${e}%; height: ${i}%;`;
}
function Ao(t, e, i) {
  R(
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
  return t._migration_warning ? v`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${t.id}
        style=${qt(t) + s}
        tabindex="-1"
        title=${t._migration_warning}
      >
        <div class="migration-warning-inner">
          ${c("overlays.migrationPrefix")} ${t._migration_warning}
        </div>
      </div>
    ` : v`
    <div
      class="overlay overlay-custom overlay-interactive overlay-wrapper"
      data-overlay-id=${t.id}
      style=${qt(t) + s}
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
let it = null, ce = null;
async function Co() {
  if (it) return it;
  if (ce) return ce;
  const e = window.loadCardHelpers;
  return typeof e != "function" ? null : (ce = e().then((i) => (it = i, ce = null, i)).catch((i) => {
    throw ce = null, i;
  }), ce);
}
async function So(t) {
  const e = await Co();
  return e ? e.createCardElement(t) : null;
}
var Io = Object.defineProperty, ko = Object.getOwnPropertyDescriptor, Ke = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ko(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (o = (n ? r(e, i, o) : r(o)) || o);
  return n && o && Io(e, i, o), o;
};
let ge = class extends ie {
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
    return this.errorMessage ? v`<div class="err" title=${this.errorMessage}>!</div>` : v`<div class="mount"></div>`;
  }
  rebuildChild() {
    const t = this.card, e = t ? JSON.stringify(t) : void 0;
    if (e !== this.lastMountedConfigJson && (this.lastMountedConfigJson = e, this.disposeChild(), !!t)) {
      try {
        Cn(t);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, So(t).then((i) => {
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
ge.styles = mt`
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
Ke([
  Pe({ attribute: !1 })
], ge.prototype, "hass", 2);
Ke([
  Pe({ attribute: !1 })
], ge.prototype, "card", 2);
Ke([
  E()
], ge.prototype, "errorMessage", 2);
ge = Ke([
  vt("flowme-custom-overlay")
], ge);
const G = "http://www.w3.org/2000/svg";
function ye(t, e) {
  if (!t || !e) return null;
  const i = t.states[e];
  return !i || i.state === "unavailable" || i.state === "unknown" ? null : xe(i.state);
}
function Mo(t, e) {
  const i = e.domain, n = T(i);
  if (t.color) return t.color;
  const o = e.flows.filter((r) => r.from_node === t.id || r.to_node === t.id);
  if (o.length === 0) return n.default_color_positive;
  const s = /* @__PURE__ */ new Set();
  for (const r of o) {
    const a = T(r.domain ?? i), l = fe(r, a, r.domain ?? i, 1, e.domain_colors, 0);
    s.add(l);
  }
  return s.size === 1 ? [...s][0] : Oi;
}
function Fo(t) {
  const e = t.getBoundingClientRect();
  return { widthPx: Math.max(1, e.width), heightPx: Math.max(1, e.height) };
}
function Jt(t, e) {
  const i = 100 / e.widthPx, n = 100 / e.heightPx;
  return Math.min(t * i, t * n);
}
function Qt(t) {
  const e = 100 / t.widthPx, i = 100 / t.heightPx;
  return Math.min(2 * e, 2 * i);
}
class Li {
  constructor() {
    this.pulseState = /* @__PURE__ */ new Map(), this.lastDiagnosticLogMs = 0;
  }
  reset() {
    this.pulseState.clear();
  }
  prunePulseState(e) {
    for (const i of this.pulseState.keys())
      e.has(i) || this.pulseState.delete(i);
  }
  sync(e, i, n, o, s) {
    if (!e || !i) return;
    s?.resetDomEffects?.();
    let r = e.querySelector(":scope > g.node-effects-layer");
    for (r || (r = document.createElementNS(G, "g"), r.classList.add("node-effects-layer"), e.appendChild(r)); r.firstChild; ) r.firstChild.remove();
    const a = s?.getLayoutMetrics?.(e) ?? Fo(e), l = i.defaults?.node_radius ?? 12;
    if (o - this.lastDiagnosticLogMs > 4e3) {
      this.lastDiagnosticLogMs = o;
      for (const p of i.nodes) {
        if (!p.node_effect?.type || !p.entity) continue;
        const d = n?.states[p.entity];
        console.log(
          "[FlowMe] node effect update:",
          p.id,
          p.node_effect.type,
          "entity state:",
          d?.state ?? "(none)",
          "controller exists: true"
        );
      }
    }
    for (const p of i.nodes) {
      const d = p.node_effect;
      if (!d || p.visible === !1 || !p.entity) continue;
      const u = p.size ?? l, h = Jt(u, a), f = p.position.x, m = p.position.y, y = Mo(p, i), g = document.createElementNS(G, "g");
      switch (g.classList.add("node-effect"), g.setAttribute("data-node", p.id), d.type) {
        case "pulse":
          this.appendPulse(g, p, d, n, y, h, f, m, o, a);
          break;
        case "glow":
          this.appendGlow(g, p, d, n, p.entity, y, u, s);
          break;
        case "badge":
          this.appendBadge(g, d, n, p.entity, y, p.id, f, m, u, a, s);
          break;
        case "ripple":
          this.appendRipple(g, d, n, p.entity, y, h, f, m, a);
          break;
        case "alert":
          this.appendAlert(g, d, n, p.entity, y, p.id, f, m, h, o, s);
          break;
      }
      g.childNodes.length > 0 && r.appendChild(g);
    }
  }
  appendPulse(e, i, n, o, s, r, a, l, p, d) {
    const u = ye(o, i.entity), h = n.pulse_threshold ?? 0.1, f = Math.max(1, n.pulse_count ?? 3), m = n.pulse_duration ?? 800, y = n.pulse_color || s;
    let g = this.pulseState.get(i.id);
    if (g || (g = { lastVal: u ?? 0, hasSample: !1, burstStartMs: -1e12 }, this.pulseState.set(i.id, g)), u !== null) {
      if (g.hasSample) {
        const I = Math.max(Math.abs(g.lastVal), Math.abs(u), 1e-6);
        Math.abs(u - g.lastVal) / I >= h && (g.burstStartMs = p);
      } else
        g.hasSample = !0;
      g.lastVal = u;
    }
    const b = p - g.burstStartMs, x = m / f;
    if (b < 0 || b > m + x * f) return;
    const $ = Qt(d), A = r + $, S = r * 4;
    for (let I = 0; I < f; I++) {
      const C = b - I * x;
      if (C < 0 || C > m) continue;
      const N = C / m, F = document.createElementNS(G, "circle");
      F.setAttribute("cx", String(a)), F.setAttribute("cy", String(l)), F.setAttribute("r", String(A + N * (S - A))), F.setAttribute("fill", "none"), F.setAttribute("stroke", y), F.setAttribute("stroke-width", String(0.12)), F.setAttribute("opacity", String(0.8 * (1 - N))), e.appendChild(F);
    }
  }
  appendGlow(e, i, n, o, s, r, a, l) {
    const p = ye(o, s), d = n.peak_value ?? 1e4, u = n.glow_max_radius ?? 20, h = n.glow_color || r, f = p === null ? 0 : Math.max(0, Math.min(1, Math.abs(p) / d)), m = 4 + f * u;
    if (l?.setNodeDotFilter) {
      l.setNodeDotFilter(i.id, `drop-shadow(0 0 ${m.toFixed(1)}px ${h})`);
      return;
    }
    const y = document.createElementNS(G, "circle");
    y.setAttribute("cx", String(i.position.x)), y.setAttribute("cy", String(i.position.y)), y.setAttribute("r", String(a / 100)), y.setAttribute("fill", "none"), y.setAttribute("stroke", h), y.setAttribute("stroke-width", String(0.08)), y.setAttribute("opacity", String(0.2 + f * 0.6)), y.setAttribute(
      "style",
      `filter: drop-shadow(0 0 ${m.toFixed(1)}px ${h}); transition: filter 500ms ease, opacity 500ms ease`
    ), e.appendChild(y);
  }
  appendBadge(e, i, n, o, s, r, a, l, p, d, u) {
    const h = i.badge_color_on ?? "#32DC50", f = i.badge_color_off ?? "#CC3333", m = n?.states[o];
    let y = "#888888";
    if (m)
      if (m.state === "unavailable" || m.state === "unknown") y = "#888888";
      else if (i.threshold !== void 0 && i.threshold !== null) {
        const A = ye(n, o);
        y = A !== null && A >= i.threshold ? h : f;
      } else {
        const A = String(m.state).toLowerCase();
        y = A === "on" || A === "open" || A === "true" ? h : f;
      }
    if (u?.setNodeDotBackground) {
      u.setNodeDotBackground(r, y, { transitionMs: 300 });
      return;
    }
    const g = Jt(p * 0.6, d), b = a + Math.min(g * 1.1, 3), x = l - Math.min(g * 1.1, 3), $ = document.createElementNS(G, "circle");
    $.setAttribute("cx", String(b)), $.setAttribute("cy", String(x)), $.setAttribute("r", String(g)), $.setAttribute("fill", y), $.setAttribute("stroke", "#ffffff"), $.setAttribute("stroke-width", String(0.03)), e.appendChild($);
  }
  appendRipple(e, i, n, o, s, r, a, l, p) {
    const d = ye(n, o), u = i.ripple_threshold ?? 0;
    if (d === null || Math.abs(d) <= u) return;
    const h = i.ripple_duration ?? 2e3, f = i.ripple_color || s, m = Qt(p), y = r + m, g = r * 3, b = document.createElementNS(G, "circle");
    b.setAttribute("cx", String(a)), b.setAttribute("cy", String(l)), b.setAttribute("r", String(y)), b.setAttribute("fill", "none"), b.setAttribute("stroke", f), b.setAttribute("stroke-width", String(0.1));
    const x = document.createElementNS(G, "animate");
    x.setAttribute("attributeName", "r"), x.setAttribute("values", `${y};${g};${y}`), x.setAttribute("dur", `${h}ms`), x.setAttribute("repeatCount", "indefinite"), b.appendChild(x);
    const $ = document.createElementNS(G, "animate");
    $.setAttribute("attributeName", "opacity"), $.setAttribute("values", "0.6;0;0.6"), $.setAttribute("dur", `${h}ms`), $.setAttribute("repeatCount", "indefinite"), b.appendChild($), e.appendChild(b);
  }
  appendAlert(e, i, n, o, s, r, a, l, p, d, u) {
    const h = ye(n, o);
    if (h === null) return;
    const f = i.alert_threshold ?? 0, m = i.alert_condition ?? "above", y = i.alert_hysteresis ?? 0.05, g = Math.abs(f) * y + 1e-6;
    let b = m === "above" ? h > f : h < f;
    !b && m === "above" && h > f - g && (b = !0), !b && m === "below" && h < f + g && (b = !0);
    const x = i.alert_frequency ?? 2, $ = i.alert_color ?? "#FF0000";
    if (!b) {
      u?.setNodeDotBackground && u.setNodeDotBackground(r, s, { transitionMs: 200 });
      return;
    }
    if (u?.setNodeDotBackground) {
      const C = 1e3 / Math.max(0.25, x), N = Math.floor(d / (C / 2)) % 2 === 0;
      u.setNodeDotBackground(r, N ? $ : s, { transitionMs: 80 });
      return;
    }
    const A = document.createElementNS(G, "circle");
    A.setAttribute("cx", String(a)), A.setAttribute("cy", String(l)), A.setAttribute("r", String(p)), A.setAttribute("fill", s), A.setAttribute("opacity", "0.85");
    const S = Math.max(100, Math.round(1e3 / Math.max(0.25, x))), I = document.createElementNS(G, "animate");
    I.setAttribute("attributeName", "fill"), I.setAttribute("values", `${s};${$};${s}`), I.setAttribute("dur", `${S}ms`), I.setAttribute("repeatCount", "indefinite"), A.appendChild(I), e.appendChild(A);
  }
}
const Po = 100;
class No {
  constructor(e) {
    this.apply = e, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(e) {
    if (e.prev !== e.next) {
      for (this.apply(e.next), this.undoStack.push(e); this.undoStack.length > Po; ) this.undoStack.shift();
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
function k(t) {
  return JSON.parse(JSON.stringify(t));
}
function L(t) {
  return t < 0 ? 0 : t > 100 ? 100 : t;
}
function Re(t, e = 8) {
  return Math.round(t / e) * e;
}
function Bo(t) {
  const e = new Set(t.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `node_${i}`;
    if (!e.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function Eo(t) {
  const e = new Set(t.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `flow_${i}`;
    if (!e.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function nt(t, e, i) {
  const n = k(t);
  for (const o of n.nodes)
    o.id === e && (o.position = { x: L(i.x), y: L(i.y) });
  return n;
}
function Ro(t, e, i) {
  const n = k(t), o = {
    id: Bo(t),
    position: { x: L(e.x), y: L(e.y) },
    ...i ? { label: i } : {}
  };
  return n.nodes.push(o), { config: n, node: o };
}
function Do(t, e) {
  const i = k(t);
  return i.nodes = i.nodes.filter((n) => n.id !== e), i.flows = i.flows.filter((n) => n.from_node !== e && n.to_node !== e), i;
}
function Oo(t, e) {
  const i = k(t);
  for (const n of i.nodes) {
    const o = e.get(n.id);
    o && (n.position = { x: L(o.x), y: L(o.y) });
  }
  return i;
}
function Lo(t, e) {
  const i = k(t);
  return i.nodes = i.nodes.filter((n) => !e.has(n.id)), i.flows = i.flows.filter((n) => !e.has(n.from_node) && !e.has(n.to_node)), i;
}
function ei(t, e, i) {
  const n = k(t);
  for (const o of n.nodes)
    e.has(o.id) && (o.visible = i);
  return n;
}
function zo(t, e, i) {
  const n = t.nodes.find((s) => s.id === i);
  if (!n) return t;
  const o = k(t);
  for (const s of o.nodes)
    e.has(s.id) && (s.position = { ...s.position, y: n.position.y });
  return o;
}
function To(t, e, i) {
  const n = t.nodes.find((s) => s.id === i);
  if (!n) return t;
  const o = k(t);
  for (const s of o.nodes)
    e.has(s.id) && (s.position = { ...s.position, x: n.position.x });
  return o;
}
function ti(t, e, i) {
  const n = k(t);
  for (const o of n.nodes)
    o.id === e && (i && i.length ? o.label = i : delete o.label);
  return n;
}
function ot(t, e, i, n) {
  const o = k(t);
  for (const s of o.flows)
    if (s.id === e) {
      if (i < 0 || i >= s.waypoints.length) return t;
      s.waypoints[i] = {
        x: L(n.x),
        y: L(n.y)
      };
    }
  return o;
}
function ii(t, e, i, n) {
  const o = k(t);
  for (const s of o.flows) {
    if (s.id !== e) continue;
    const r = Math.max(0, Math.min(s.waypoints.length, i));
    s.waypoints.splice(r, 0, {
      x: L(n.x),
      y: L(n.y)
    });
  }
  return o;
}
function ni(t, e, i) {
  const n = k(t);
  for (const o of n.flows)
    if (o.id === e) {
      if (i < 0 || i >= o.waypoints.length) return t;
      o.waypoints.splice(i, 1);
    }
  return n;
}
function oi(t, e, i, n) {
  const o = k(t), s = {
    id: Eo(t),
    from_node: e,
    to_node: i,
    entity: n,
    waypoints: []
  };
  return o.flows.push(s), { config: o, flow: s };
}
function Ho(t, e) {
  const i = k(t);
  return i.flows = i.flows.filter((n) => n.id !== e), i;
}
function Go(t, e) {
  const i = k(t);
  return i.background.default = e, i;
}
function Wo(t, e) {
  const i = k(t);
  return e && e.length ? i.background.weather_entity = e : delete i.background.weather_entity, i;
}
function Uo(t, e) {
  const i = k(t);
  return e && e.length ? i.background.sun_entity = e : delete i.background.sun_entity, i;
}
function Ko(t, e) {
  const i = k(t);
  return e === void 0 || !Number.isFinite(e) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(e)), i;
}
function si(t, e, i) {
  var o;
  const n = k(t);
  return (o = n.background).weather_states ?? (o.weather_states = {}), n.background.weather_states[e] = i, n;
}
function jo(t, e) {
  const i = k(t);
  return i.background.weather_states && (delete i.background.weather_states[e], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function Vo(t) {
  const e = new Set((t.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `overlay_${i}`;
    if (!e.has(n)) return n;
  }
  return `overlay_${Date.now()}`;
}
function Yo(t, e) {
  const i = k(t), n = e.id ?? Vo(t), o = {
    ...e,
    id: n,
    position: {
      x: L(e.position.x),
      y: L(e.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], o], { config: i, overlay: o };
}
function Zo(t, e) {
  const i = k(t);
  return i.overlays = (i.overlays ?? []).filter((n) => n.id !== e), i.overlays.length === 0 && delete i.overlays, i;
}
function Xo(t, e, i) {
  const n = k(t);
  for (const o of n.overlays ?? [])
    o.id === e && (o.position = { x: L(i.x), y: L(i.y) });
  return n;
}
function ri(t, e, i) {
  const n = k(t), o = Math.max(2, Math.min(100, i.width)), s = Math.max(2, Math.min(100, i.height));
  for (const r of n.overlays ?? [])
    r.id === e && (r.size = { width: o, height: s });
  return n;
}
function qo(t, e, i) {
  const n = k(t);
  for (const o of n.overlays ?? [])
    o.id === e && i && (o.card = i);
  return n;
}
function Jo(t, e, i) {
  const n = k(t);
  for (const o of n.overlays ?? [])
    o.id === e && (i ? delete o.visible : o.visible = !1);
  return n;
}
function Qo(t, e, i) {
  const n = k(t);
  for (const o of n.overlays ?? [])
    if (o.id === e) {
      const s = Math.max(0, Math.min(1, i));
      s === 1 ? delete o.opacity : o.opacity = s;
    }
  return n;
}
function ai(t, e, i) {
  const n = k(t);
  return n.opacity = { ...n.opacity, [e]: i }, n;
}
function es(t, e, i) {
  const n = k(t);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function ts(t, e, i) {
  const n = k(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function is(t, e, i) {
  const n = k(t);
  return n.defaults = { ...n.defaults, [e]: i }, n;
}
function ns(t, e, i) {
  if (e === i) return t;
  const n = k(t), o = n.background.weather_states;
  if (!o || !(e in o)) return t;
  const s = o[e];
  return s === void 0 ? t : (delete o[e], o[i] = s, n);
}
function os(t, e, i) {
  const n = k(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 || i === "corner" ? delete s.line_style : s.line_style = i, s;
  }), n;
}
function li(t, e, i) {
  const n = k(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i === void 0 ? delete s.color : s.color = i, s;
  }), n;
}
function ci(t, e, i) {
  const n = k(t);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function ss(t, e, i) {
  const n = k(t);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function rs(t, e, i) {
  const n = k(t);
  return n.visibility = { ...n.visibility, [e]: i }, n;
}
function di(t, e, i) {
  const n = k(t);
  return i === void 0 ? n.domain_colors && (delete n.domain_colors[e], Object.keys(n.domain_colors).length === 0 && delete n.domain_colors) : n.domain_colors = { ...n.domain_colors, [e]: i }, n;
}
function as(t, e) {
  const i = k(t);
  return i.domain = e, i;
}
function ls(t, e, i) {
  const n = i.trim();
  if (!n || n === e) return t;
  const o = t.flows.findIndex((r) => r.id === e);
  if (o < 0 || t.flows.some((r, a) => a !== o && r.id === n)) return t;
  const s = k(t);
  return s.flows = s.flows.map((r) => r.id === e ? { ...r, id: n } : r), s;
}
function pi(t, e, i) {
  const n = i.trim();
  if (!n || n === e) return t;
  const o = t.overlays ?? [], s = o.findIndex((a) => a.id === e);
  if (s < 0 || o.some((a, l) => l !== s && a.id === n)) return t;
  const r = k(t);
  return r.overlays = o.map((a) => a.id === e ? { ...a, id: n } : a), r;
}
function ui(t, e, i) {
  const n = k(t);
  return n.flows = n.flows.map((o) => o.id !== e ? o : { ...o, speed_curve_override: { ...o.speed_curve_override, ...i } }), n;
}
function cs(t, e) {
  const i = k(t);
  return i.flows = i.flows.map((n) => {
    if (n.id !== e) return n;
    const o = { ...n };
    return delete o.speed_curve_override, o;
  }), i;
}
function ds(t, e, i) {
  const n = k(t);
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
function ps(t, e) {
  const i = k(t);
  return i.flows = i.flows.map((n) => {
    if (n.id !== e) return n;
    const o = { ...n };
    return delete o.animation, o;
  }), i;
}
function hi(t, e) {
  const i = k(t);
  return i.animation = { ...i.animation, ...e }, i;
}
function us(t, e, i) {
  const n = k(t), o = n.flows.find((s) => s.id === e);
  return o && (o.value_gradient = i), n;
}
function hs(t, e, i) {
  const n = k(t), o = n.flows.find((s) => s.id === e);
  return o && (o.value_gradient = { ...o.value_gradient, ...i }), n;
}
function fi(t, e) {
  const i = k(t), n = i.flows.find((o) => o.id === e);
  return n && delete n.value_gradient, i;
}
const Ct = 8, gi = 1, ut = 255;
function fs(t, e = Ct) {
  const i = Math.max(1, Math.floor(e)), n = Math.max(1, Math.ceil(t.width / i)), o = Math.max(1, Math.ceil(t.height / i)), s = new Uint16Array(n * o);
  for (let r = 0; r < o; r++) {
    const a = r * i, l = Math.min(t.height, a + i);
    for (let p = 0; p < n; p++) {
      const d = p * i, u = Math.min(t.width, d + i);
      let h = 0;
      for (let m = a; m < l; m++) {
        const y = m * t.width;
        for (let g = d; g < u; g++) {
          const b = t.data[y + g] ?? 0;
          b > h && (h = b);
        }
      }
      const f = ut - h;
      s[r * n + p] = f < gi ? gi : f;
    }
  }
  return { cols: n, rows: o, cellSize: i, data: s };
}
function gs(t, e, i) {
  return i * t.cols + e;
}
function ms(t, e, i) {
  return e < 0 || i < 0 || e >= t.cols || i >= t.rows ? ut : t.data[gs(t, e, i)] ?? ut;
}
const bs = 480, ys = 270, vs = 30;
function ws(t, e, i = bs, n = ys) {
  if (t <= 0 || e <= 0) return { width: 1, height: 1 };
  const o = Math.min(i / t, n / e, 1);
  return {
    width: Math.max(1, Math.floor(t * o)),
    height: Math.max(1, Math.floor(e * o))
  };
}
function xs(t, e, i) {
  const n = new Uint8ClampedArray(e * i);
  for (let o = 0, s = 0; o < t.length; o += 4, s++) {
    const r = t[o] ?? 0, a = t[o + 1] ?? 0, l = t[o + 2] ?? 0;
    n[s] = 0.2126 * r + 0.7152 * a + 0.0722 * l;
  }
  return n;
}
function $s(t, e, i) {
  const n = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e;
    for (let a = 0; a < e; a++) {
      const l = t[r + Math.max(0, a - 1)] ?? 0, p = t[r + a] ?? 0, d = t[r + Math.min(e - 1, a + 1)] ?? 0;
      n[r + a] = l + 2 * p + d >> 2;
    }
  }
  const o = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e, a = Math.max(0, s - 1) * e, l = Math.min(i - 1, s + 1) * e;
    for (let p = 0; p < e; p++) {
      const d = n[a + p] ?? 0, u = n[r + p] ?? 0, h = n[l + p] ?? 0;
      o[r + p] = d + 2 * u + h >> 2;
    }
  }
  return o;
}
function _s(t, e, i) {
  const n = new Uint8ClampedArray(e * i);
  for (let o = 1; o < i - 1; o++) {
    const s = (o - 1) * e, r = o * e, a = (o + 1) * e;
    for (let l = 1; l < e - 1; l++) {
      const p = t[s + (l - 1)] ?? 0, d = t[s + l] ?? 0, u = t[s + (l + 1)] ?? 0, h = t[r + (l - 1)] ?? 0, f = t[r + (l + 1)] ?? 0, m = t[a + (l - 1)] ?? 0, y = t[a + l] ?? 0, g = t[a + (l + 1)] ?? 0, b = -p - 2 * h - m + u + 2 * f + g, x = -p - 2 * d - u + m + 2 * y + g;
      let $ = Math.sqrt(b * b + x * x);
      $ < vs && ($ = 0), $ > 255 && ($ = 255), n[r + l] = $;
    }
  }
  return { width: e, height: i, data: n };
}
function zi(t, e, i) {
  const n = ws(e, i), o = document.createElement("canvas");
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
function As(t, e, i) {
  const { width: n, height: o, rgba: s } = zi(t, e, i), r = xs(s, n, o), a = $s(r, n, o);
  return _s(a, n, o);
}
const Cs = 50;
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
      const n = 2 * e + 1, o = 2 * e + 2;
      let s = e;
      if (n < i && (this.arr[n]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = n), o < i && (this.arr[o]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = o), s === e) return;
      [this.arr[s], this.arr[e]] = [this.arr[e], this.arr[s]], e = s;
    }
  }
}
function Is(t, e, i) {
  const [n, o] = e, [s, r] = i;
  if (n < 0 || o < 0 || n >= t.cols || o >= t.rows || s < 0 || r < 0 || s >= t.cols || r >= t.rows) return null;
  if (n === s && o === r) return [[n, o]];
  const a = t.cols * t.rows, l = new Float32Array(a);
  l.fill(1 / 0);
  const p = new Int16Array(a), d = new Int16Array(a);
  p.fill(-1), d.fill(-1);
  const u = new Uint8Array(a), h = new Uint8Array(a), f = o * t.cols + n;
  l[f] = 0;
  const m = new Ss();
  m.push({ col: n, row: o, f: mi(n, o, s, r) });
  const y = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; m.size > 0; ) {
    const g = m.pop(), { col: b, row: x } = g, $ = x * t.cols + b;
    if (!h[$]) {
      if (h[$] = 1, b === s && x === r)
        return ks(t, p, d, i);
      for (const [A, S, I] of y) {
        const C = b + A, N = x + S;
        if (C < 0 || N < 0 || C >= t.cols || N >= t.rows) continue;
        const F = N * t.cols + C;
        if (h[F]) continue;
        const P = ms(t, C, N), O = u[$] && u[$] !== I ? Cs : 0, z = (l[$] ?? 1 / 0) + P + O;
        if (z < (l[F] ?? 1 / 0)) {
          l[F] = z, p[F] = b, d[F] = x, u[F] = I;
          const je = z + mi(C, N, s, r);
          m.push({ col: C, row: N, f: je });
        }
      }
    }
  }
  return null;
}
function mi(t, e, i, n) {
  return Math.abs(t - i) + Math.abs(e - n);
}
function ks(t, e, i, n) {
  const o = [];
  let s = n[0], r = n[1];
  for (; s !== -1 && r !== -1; ) {
    o.push([s, r]);
    const a = r * t.cols + s, l = e[a] ?? -1, p = i[a] ?? -1;
    if (l === s && p === r || (s = l, r = p, s < 0 || r < 0)) break;
  }
  return o.reverse(), o[0]?.[0] === -1 && o.shift(), o;
}
function Ms(t) {
  if (t.length <= 2) return [...t];
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i++) {
    const n = t[i - 1], o = t[i], s = t[i + 1], r = o[0] - n[0], a = o[1] - n[1], l = s[0] - o[0], p = s[1] - o[1];
    r * p - a * l === 0 && Math.sign(r) === Math.sign(l) && Math.sign(a) === Math.sign(p) || e.push(o);
  }
  return e.push(t[t.length - 1]), e;
}
function Fs(t, e, i) {
  const n = bi(e, t), o = bi(i, t), s = Is(t, n, o);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: Ms(s).slice(1, -1).map((p) => Ps(p, t)), edgesUsable: !0 };
}
function bi(t, e) {
  const i = yi(Math.floor(t.x / 100 * e.cols), 0, e.cols - 1), n = yi(Math.floor(t.y / 100 * e.rows), 0, e.rows - 1);
  return [i, n];
}
function Ps(t, e) {
  return {
    x: (t[0] + 0.5) / e.cols * 100,
    y: (t[1] + 0.5) / e.rows * 100
  };
}
function yi(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
const Le = /* @__PURE__ */ new Map();
async function Ns(t, e = {}) {
  const i = performance.now(), n = e.cellSize ?? Ct, o = `${t.imageUrl}|${n}`, s = Le.has(o);
  let r = null;
  try {
    r = await Es(o, t.imageUrl, n);
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
  const { waypoints: a, edgesUsable: l } = Fs(r, t.from, t.to);
  return {
    waypoints: a,
    cached: s,
    edgesUsable: l,
    elapsedMs: performance.now() - i
  };
}
async function Bs(t) {
  if (!t) return null;
  try {
    const e = await Ti(t);
    return zi(e, e.naturalWidth, e.naturalHeight);
  } catch {
    return null;
  }
}
function Es(t, e, i) {
  const n = Le.get(t);
  if (n) return n;
  const o = Rs(e, i).catch((s) => {
    throw Le.delete(t), s;
  });
  return Le.set(t, o), o;
}
async function Rs(t, e) {
  const i = await Ti(t);
  await vi();
  const n = As(i, i.naturalWidth, i.naturalHeight);
  return await vi(), fs(n, e);
}
function Ti(t) {
  return new Promise((e, i) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => e(n), n.onerror = () => i(new Error(`Failed to load background image: ${t}`)), n.src = t;
  });
}
function vi() {
  return new Promise((t) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(t, 0)) : setTimeout(t, 0);
  });
}
const Hi = "ZnVuY3Rpb24gZCh0LCBuID0gOCkgewogIGNvbnN0IG8gPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG4pKSwgYyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0LndpZHRoIC8gbykpLCByID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHQuaGVpZ2h0IC8gbykpLCBzID0gbmV3IFVpbnQxNkFycmF5KGMgKiByKTsKICBmb3IgKGxldCBlID0gMDsgZSA8IHI7IGUrKykgewogICAgY29uc3QgbCA9IGUgKiBvLCBhID0gTWF0aC5taW4odC5oZWlnaHQsIGwgKyBvKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBpICogbywgdSA9IE1hdGgubWluKHQud2lkdGgsIGYgKyBvKTsKICAgICAgbGV0IGggPSAwOwogICAgICBmb3IgKGxldCBwID0gbDsgcCA8IGE7IHArKykgewogICAgICAgIGNvbnN0IEUgPSBwICogdC53aWR0aDsKICAgICAgICBmb3IgKGxldCB5ID0gZjsgeSA8IHU7IHkrKykgewogICAgICAgICAgY29uc3QgbSA9IHQuZGF0YVtFICsgeV0gPz8gMDsKICAgICAgICAgIG0gPiBoICYmIChoID0gbSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGNvbnN0IHggPSAyNTUgLSBoOwogICAgICBzW2UgKiBjICsgaV0gPSB4IDwgMSA/IDEgOiB4OwogICAgfQogIH0KICByZXR1cm4geyBjb2xzOiBjLCByb3dzOiByLCBjZWxsU2l6ZTogbywgZGF0YTogcyB9Owp9CmZ1bmN0aW9uIFAodCwgbiwgbykgewogIHJldHVybiBvICogdC5jb2xzICsgbjsKfQpmdW5jdGlvbiBSKHQsIG4sIG8pIHsKICByZXR1cm4gbiA8IDAgfHwgbyA8IDAgfHwgbiA+PSB0LmNvbHMgfHwgbyA+PSB0LnJvd3MgPyAyNTUgOiB0LmRhdGFbUCh0LCBuLCBvKV0gPz8gMjU1Owp9CmNvbnN0IE4gPSA1MDsKY2xhc3MgayB7CiAgY29uc3RydWN0b3IoKSB7CiAgICB0aGlzLmFyciA9IFtdOwogIH0KICBwdXNoKG4pIHsKICAgIHRoaXMuYXJyLnB1c2gobiksIHRoaXMuYnViYmxlVXAodGhpcy5hcnIubGVuZ3RoIC0gMSk7CiAgfQogIHBvcCgpIHsKICAgIGlmICh0aGlzLmFyci5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IG4gPSB0aGlzLmFyclswXSwgbyA9IHRoaXMuYXJyLnBvcCgpOwogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aCA+IDAgJiYgKHRoaXMuYXJyWzBdID0gbywgdGhpcy5zaW5rRG93bigwKSksIG47CiAgfQogIGdldCBzaXplKCkgewogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDsKICB9CiAgYnViYmxlVXAobikgewogICAgZm9yICg7IG4gPiAwOyApIHsKICAgICAgY29uc3QgbyA9IG4gLSAxID4+IDE7CiAgICAgIGlmICgodGhpcy5hcnJbb10/LmYgPz8gMCkgPD0gKHRoaXMuYXJyW25dPy5mID8/IDApKSByZXR1cm47CiAgICAgIFt0aGlzLmFycltvXSwgdGhpcy5hcnJbbl1dID0gW3RoaXMuYXJyW25dLCB0aGlzLmFycltvXV0sIG4gPSBvOwogICAgfQogIH0KICBzaW5rRG93bihuKSB7CiAgICBjb25zdCBvID0gdGhpcy5hcnIubGVuZ3RoOwogICAgZm9yICg7IDsgKSB7CiAgICAgIGNvbnN0IGMgPSAyICogbiArIDEsIHIgPSAyICogbiArIDI7CiAgICAgIGxldCBzID0gbjsKICAgICAgaWYgKGMgPCBvICYmICh0aGlzLmFycltjXT8uZiA/PyAwKSA8ICh0aGlzLmFycltzXT8uZiA/PyAwKSAmJiAocyA9IGMpLCByIDwgbyAmJiAodGhpcy5hcnJbcl0/LmYgPz8gMCkgPCAodGhpcy5hcnJbc10/LmYgPz8gMCkgJiYgKHMgPSByKSwgcyA9PT0gbikgcmV0dXJuOwogICAgICBbdGhpcy5hcnJbc10sIHRoaXMuYXJyW25dXSA9IFt0aGlzLmFycltuXSwgdGhpcy5hcnJbc11dLCBuID0gczsKICAgIH0KICB9Cn0KZnVuY3Rpb24geih0LCBuLCBvKSB7CiAgY29uc3QgW2MsIHJdID0gbiwgW3MsIGVdID0gbzsKICBpZiAoYyA8IDAgfHwgciA8IDAgfHwgYyA+PSB0LmNvbHMgfHwgciA+PSB0LnJvd3MgfHwgcyA8IDAgfHwgZSA8IDAgfHwgcyA+PSB0LmNvbHMgfHwgZSA+PSB0LnJvd3MpIHJldHVybiBudWxsOwogIGlmIChjID09PSBzICYmIHIgPT09IGUpIHJldHVybiBbW2MsIHJdXTsKICBjb25zdCBsID0gdC5jb2xzICogdC5yb3dzLCBhID0gbmV3IEZsb2F0MzJBcnJheShsKTsKICBhLmZpbGwoMSAvIDApOwogIGNvbnN0IGkgPSBuZXcgSW50MTZBcnJheShsKSwgZiA9IG5ldyBJbnQxNkFycmF5KGwpOwogIGkuZmlsbCgtMSksIGYuZmlsbCgtMSk7CiAgY29uc3QgdSA9IG5ldyBVaW50OEFycmF5KGwpLCBoID0gbmV3IFVpbnQ4QXJyYXkobCksIHggPSByICogdC5jb2xzICsgYzsKICBhW3hdID0gMDsKICBjb25zdCBwID0gbmV3IGsoKTsKICBwLnB1c2goeyBjb2w6IGMsIHJvdzogciwgZjogSShjLCByLCBzLCBlKSB9KTsKICBjb25zdCBFID0gWwogICAgWzEsIDAsIDFdLAogICAgWy0xLCAwLCAyXSwKICAgIFswLCAxLCAzXSwKICAgIFswLCAtMSwgNF0KICBdOwogIGZvciAoOyBwLnNpemUgPiAwOyApIHsKICAgIGNvbnN0IHkgPSBwLnBvcCgpLCB7IGNvbDogbSwgcm93OiBNIH0gPSB5LCB3ID0gTSAqIHQuY29scyArIG07CiAgICBpZiAoIWhbd10pIHsKICAgICAgaWYgKGhbd10gPSAxLCBtID09PSBzICYmIE0gPT09IGUpCiAgICAgICAgcmV0dXJuIFgodCwgaSwgZiwgbyk7CiAgICAgIGZvciAoY29uc3QgW0wsIGcsIF9dIG9mIEUpIHsKICAgICAgICBjb25zdCBDID0gbSArIEwsIGIgPSBNICsgZzsKICAgICAgICBpZiAoQyA8IDAgfHwgYiA8IDAgfHwgQyA+PSB0LmNvbHMgfHwgYiA+PSB0LnJvd3MpIGNvbnRpbnVlOwogICAgICAgIGNvbnN0IEEgPSBiICogdC5jb2xzICsgQzsKICAgICAgICBpZiAoaFtBXSkgY29udGludWU7CiAgICAgICAgY29uc3QgRCA9IFIodCwgQywgYiksIEYgPSB1W3ddICYmIHVbd10gIT09IF8gPyBOIDogMCwgVSA9IChhW3ddID8/IDEgLyAwKSArIEQgKyBGOwogICAgICAgIGlmIChVIDwgKGFbQV0gPz8gMSAvIDApKSB7CiAgICAgICAgICBhW0FdID0gVSwgaVtBXSA9IG0sIGZbQV0gPSBNLCB1W0FdID0gXzsKICAgICAgICAgIGNvbnN0IE8gPSBVICsgSShDLCBiLCBzLCBlKTsKICAgICAgICAgIHAucHVzaCh7IGNvbDogQywgcm93OiBiLCBmOiBPIH0pOwogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICByZXR1cm4gbnVsbDsKfQpmdW5jdGlvbiBJKHQsIG4sIG8sIGMpIHsKICByZXR1cm4gTWF0aC5hYnModCAtIG8pICsgTWF0aC5hYnMobiAtIGMpOwp9CmZ1bmN0aW9uIFgodCwgbiwgbywgYykgewogIGNvbnN0IHIgPSBbXTsKICBsZXQgcyA9IGNbMF0sIGUgPSBjWzFdOwogIGZvciAoOyBzICE9PSAtMSAmJiBlICE9PSAtMTsgKSB7CiAgICByLnB1c2goW3MsIGVdKTsKICAgIGNvbnN0IGwgPSBlICogdC5jb2xzICsgcywgYSA9IG5bbF0gPz8gLTEsIGkgPSBvW2xdID8/IC0xOwogICAgaWYgKGEgPT09IHMgJiYgaSA9PT0gZSB8fCAocyA9IGEsIGUgPSBpLCBzIDwgMCB8fCBlIDwgMCkpIGJyZWFrOwogIH0KICByZXR1cm4gci5yZXZlcnNlKCksIHJbMF0/LlswXSA9PT0gLTEgJiYgci5zaGlmdCgpLCByOwp9CmNvbnN0IFogPSAzMDsKZnVuY3Rpb24gdih0LCBuLCBvKSB7CiAgY29uc3QgYyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuICogbyk7CiAgZm9yIChsZXQgciA9IDAsIHMgPSAwOyByIDwgdC5sZW5ndGg7IHIgKz0gNCwgcysrKSB7CiAgICBjb25zdCBlID0gdFtyXSA/PyAwLCBsID0gdFtyICsgMV0gPz8gMCwgYSA9IHRbciArIDJdID8/IDA7CiAgICBjW3NdID0gMC4yMTI2ICogZSArIDAuNzE1MiAqIGwgKyAwLjA3MjIgKiBhOwogIH0KICByZXR1cm4gYzsKfQpmdW5jdGlvbiBHKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHQubGVuZ3RoKTsKICBmb3IgKGxldCBzID0gMDsgcyA8IG87IHMrKykgewogICAgY29uc3QgZSA9IHMgKiBuOwogICAgZm9yIChsZXQgbCA9IDA7IGwgPCBuOyBsKyspIHsKICAgICAgY29uc3QgYSA9IHRbZSArIE1hdGgubWF4KDAsIGwgLSAxKV0gPz8gMCwgaSA9IHRbZSArIGxdID8/IDAsIGYgPSB0W2UgKyBNYXRoLm1pbihuIC0gMSwgbCArIDEpXSA/PyAwOwogICAgICBjW2UgKyBsXSA9IGEgKyAyICogaSArIGYgPj4gMjsKICAgIH0KICB9CiAgY29uc3QgciA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0Lmxlbmd0aCk7CiAgZm9yIChsZXQgcyA9IDA7IHMgPCBvOyBzKyspIHsKICAgIGNvbnN0IGUgPSBzICogbiwgbCA9IE1hdGgubWF4KDAsIHMgLSAxKSAqIG4sIGEgPSBNYXRoLm1pbihvIC0gMSwgcyArIDEpICogbjsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBjW2wgKyBpXSA/PyAwLCB1ID0gY1tlICsgaV0gPz8gMCwgaCA9IGNbYSArIGldID8/IDA7CiAgICAgIHJbZSArIGldID0gZiArIDIgKiB1ICsgaCA+PiAyOwogICAgfQogIH0KICByZXR1cm4gcjsKfQpmdW5jdGlvbiBIKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4gKiBvKTsKICBmb3IgKGxldCByID0gMTsgciA8IG8gLSAxOyByKyspIHsKICAgIGNvbnN0IHMgPSAociAtIDEpICogbiwgZSA9IHIgKiBuLCBsID0gKHIgKyAxKSAqIG47CiAgICBmb3IgKGxldCBhID0gMTsgYSA8IG4gLSAxOyBhKyspIHsKICAgICAgY29uc3QgaSA9IHRbcyArIChhIC0gMSldID8/IDAsIGYgPSB0W3MgKyBhXSA/PyAwLCB1ID0gdFtzICsgKGEgKyAxKV0gPz8gMCwgaCA9IHRbZSArIChhIC0gMSldID8/IDAsIHggPSB0W2UgKyAoYSArIDEpXSA/PyAwLCBwID0gdFtsICsgKGEgLSAxKV0gPz8gMCwgRSA9IHRbbCArIGFdID8/IDAsIHkgPSB0W2wgKyAoYSArIDEpXSA/PyAwLCBtID0gLWkgLSAyICogaCAtIHAgKyB1ICsgMiAqIHggKyB5LCBNID0gLWkgLSAyICogZiAtIHUgKyBwICsgMiAqIEUgKyB5OwogICAgICBsZXQgdyA9IE1hdGguc3FydChtICogbSArIE0gKiBNKTsKICAgICAgdyA8IFogJiYgKHcgPSAwKSwgdyA+IDI1NSAmJiAodyA9IDI1NSksIGNbZSArIGFdID0gdzsKICAgIH0KICB9CiAgcmV0dXJuIHsgd2lkdGg6IG4sIGhlaWdodDogbywgZGF0YTogYyB9Owp9CmZ1bmN0aW9uIFcodCkgewogIGlmICh0Lmxlbmd0aCA8PSAyKSByZXR1cm4gWy4uLnRdOwogIGNvbnN0IG4gPSBbdFswXV07CiAgZm9yIChsZXQgbyA9IDE7IG8gPCB0Lmxlbmd0aCAtIDE7IG8rKykgewogICAgY29uc3QgYyA9IHRbbyAtIDFdLCByID0gdFtvXSwgcyA9IHRbbyArIDFdLCBlID0gclswXSAtIGNbMF0sIGwgPSByWzFdIC0gY1sxXSwgYSA9IHNbMF0gLSByWzBdLCBpID0gc1sxXSAtIHJbMV07CiAgICBlICogaSAtIGwgKiBhID09PSAwICYmIE1hdGguc2lnbihlKSA9PT0gTWF0aC5zaWduKGEpICYmIE1hdGguc2lnbihsKSA9PT0gTWF0aC5zaWduKGkpIHx8IG4ucHVzaChyKTsKICB9CiAgcmV0dXJuIG4ucHVzaCh0W3QubGVuZ3RoIC0gMV0pLCBuOwp9CmZ1bmN0aW9uIGoodCwgbiwgbywgYywgciwgcyA9IDgpIHsKICBjb25zdCBlID0gdih0LCBuLCBvKSwgbCA9IEcoZSwgbiwgbyksIGEgPSBIKGwsIG4sIG8pLCBpID0gZChhLCBzKTsKICByZXR1cm4gcShpLCBjLCByKTsKfQpmdW5jdGlvbiBxKHQsIG4sIG8pIHsKICBjb25zdCBjID0gUyhuLCB0KSwgciA9IFMobywgdCksIHMgPSB6KHQsIGMsIHIpOwogIHJldHVybiAhcyB8fCBzLmxlbmd0aCA8IDIgPyB7IHdheXBvaW50czogW10sIGVkZ2VzVXNhYmxlOiAhMCB9IDogeyB3YXlwb2ludHM6IFcocykuc2xpY2UoMSwgLTEpLm1hcCgoaSkgPT4gQihpLCB0KSksIGVkZ2VzVXNhYmxlOiAhMCB9Owp9CmZ1bmN0aW9uIFModCwgbikgewogIGNvbnN0IG8gPSBUKE1hdGguZmxvb3IodC54IC8gMTAwICogbi5jb2xzKSwgMCwgbi5jb2xzIC0gMSksIGMgPSBUKE1hdGguZmxvb3IodC55IC8gMTAwICogbi5yb3dzKSwgMCwgbi5yb3dzIC0gMSk7CiAgcmV0dXJuIFtvLCBjXTsKfQpmdW5jdGlvbiBCKHQsIG4pIHsKICByZXR1cm4gewogICAgeDogKHRbMF0gKyAwLjUpIC8gbi5jb2xzICogMTAwLAogICAgeTogKHRbMV0gKyAwLjUpIC8gbi5yb3dzICogMTAwCiAgfTsKfQpmdW5jdGlvbiBUKHQsIG4sIG8pIHsKICByZXR1cm4gdCA8IG4gPyBuIDogdCA+IG8gPyBvIDogdDsKfQpzZWxmLm9ubWVzc2FnZSA9ICh0KSA9PiB7CiAgY29uc3QgeyByZ2JhOiBuLCB3aWR0aDogbywgaGVpZ2h0OiBjLCBmcm9tUG9zOiByLCB0b1BvczogcywgY2VsbFNpemU6IGUgfSA9IHQuZGF0YSwgbCA9IHBlcmZvcm1hbmNlLm5vdygpOwogIHRyeSB7CiAgICBjb25zdCBhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4pLCBpID0gZSA/PyA4LCB7IHdheXBvaW50czogZiwgZWRnZXNVc2FibGU6IHUgfSA9IGooYSwgbywgYywgciwgcywgaSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgd2F5cG9pbnRzOiBmLAogICAgICBlZGdlc1VzYWJsZTogdSwKICAgICAgZWxhcHNlZE1zOiBwZXJmb3JtYW5jZS5ub3coKSAtIGwKICAgIH0pOwogIH0gY2F0Y2ggKGEpIHsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB3YXlwb2ludHM6IFtdLAogICAgICBlZGdlc1VzYWJsZTogITEsCiAgICAgIGVsYXBzZWRNczogcGVyZm9ybWFuY2Uubm93KCkgLSBsLAogICAgICBlcnJvcjogYSBpbnN0YW5jZW9mIEVycm9yID8gYS5tZXNzYWdlIDogU3RyaW5nKGEpCiAgICB9KTsKICB9Cn07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhmaW5kaW5nLndvcmtlci1CUHhaVndVTS5qcy5tYXAK", Ds = (t) => Uint8Array.from(atob(t), (e) => e.charCodeAt(0)), wi = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Ds(Hi)], { type: "text/javascript;charset=utf-8" });
function Os(t) {
  let e;
  try {
    if (e = wi && (self.URL || self.webkitURL).createObjectURL(wi), !e) throw "";
    const i = new Worker(e, {
      type: "module",
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Hi,
      {
        type: "module",
        name: t?.name
      }
    );
  }
}
var Ls = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, D = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? zs(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (o = (n ? r(e, i, o) : r(o)) || o);
  return n && o && Ls(e, i, o), o;
};
let B = class extends ie {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.inlineRename = null, this.canUndo = !1, this.nodeLabelInputRef = Y(), this.flowIdInputRef = Y(), this.overlayIdInputRef = Y(), this._pendingInspectorLabelFocus = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this._pathWorkerPending = !1, this._pathPendingSelection = null, this.selectorType = "", this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.imageNaturalW = 1600, this.imageNaturalH = 1e3, this._loadedImageUrl = "", this.spaceHeld = !1, this.panPointerId = null, this.stageRef = Y(), this.canvasRef = Y(), this.editorFxSvgRef = Y(), this.editorNodeFx = new Li(), this._editorFxRaf = null, this.undoStack = new No((t) => this.applyConfig(
      t,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (t) => {
      if (!this.config) return;
      const e = t.target.value, i = this.config, n = Go(i, e);
      this.pushPatch(i, n, "edit default background");
    }, this.onWeatherStateRemove = (t) => {
      if (!this.config) return;
      const e = this.config, i = jo(e, t);
      this.pushPatch(e, i, `remove weather state ${t}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const t = new Set(Object.keys(this.config.background.weather_states ?? {})), e = B.KNOWN_WEATHER_STATES.find((o) => !t.has(o)) ?? "custom", i = this.config, n = si(i, e, "");
      this.pushPatch(i, n, `add weather state ${e}`);
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: t, toNodeId: e, waypoints: i } = this.suggestPreview, n = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), o = this.config, s = o.flows.find(
        (l) => l.from_node === t && l.to_node === e
      );
      let r, a;
      if (s)
        a = s.id, r = {
          ...o,
          flows: o.flows.map(
            (l) => l.id === s.id ? { ...l, waypoints: i.map((p) => ({ x: p.x, y: p.y })) } : l
          )
        };
      else {
        const { config: l, flow: p } = oi(o, t, e, n);
        a = p.id, r = {
          ...l,
          flows: l.flows.map(
            (d) => d.id === p.id ? { ...d, waypoints: i.map((u) => ({ x: u.x, y: u.y })) } : d
          )
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(o, r, `suggest-path ${a}`), this.selectedFlowId = a;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (t) => {
      if (!(!this.config || t.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(t);
          if (!i) return;
          const n = this.config, { config: o, node: s } = Ro(n, i, c("editor.inspector.newNodeDefaultLabel"));
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
          }, o = this.config, { config: s, overlay: r } = Yo(o, n);
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
        const r = this.config, a = ii(r, i, o, s);
        this.pushPatch(r, a, `add waypoint to ${i}`);
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
          const n = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), o = this.config, { config: s, flow: r } = oi(o, this.pending.fromId, i, n);
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
      const o = this.config, s = ni(o, i, n);
      this.pushPatch(o, s, `delete waypoint ${n} of ${i}`);
    }, this.stopClick = (t) => {
      t.stopPropagation();
    }, this.onHandlePointerDown = (t) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const e = t.currentTarget, i = e.dataset.waypointIndex, n = e.dataset.flowId, o = e.dataset.nodeId, s = e.dataset.overlayId;
      let r = null;
      if (o)
        if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(o)) {
          const a = /* @__PURE__ */ new Map();
          for (const l of this.config.nodes)
            this.selectedNodeIds.has(l.id) && a.set(l.id, { ...l.position });
          r = {
            kind: "node-bulk",
            ids: Array.from(this.selectedNodeIds),
            startPositions: a,
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
        const o = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (t.clientX - e.startPx.x) / this.scale, a = (t.clientY - e.startPx.y) / this.scale, l = r / o * 100, p = a / s * 100;
        let d = e.startSize.width + l, u = e.startSize.height + p;
        this.dragShiftHeld && (d = Math.round(d), u = Math.round(u)), this.dragMoved = !0, this.config = ri(this.config, e.id, { width: d, height: u });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const o = t.clientX - this.dragStartPx.x, s = t.clientY - this.dragStartPx.y;
        (Math.abs(o) > 4 || Math.abs(s) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const i = this.pointerToPercent(t);
      if (!i) return;
      const n = this.dragShiftHeld ? { x: L(Re(i.x)), y: L(Re(i.y)) } : i;
      if (e.kind === "node")
        this.config = nt(this.config, e.id, n);
      else if (e.kind === "node-bulk") {
        const o = this.canvasRef.value;
        if (!o) return;
        const s = o.getBoundingClientRect();
        if (s.width === 0 || s.height === 0) return;
        const r = s.width - 16, a = s.height - 8, l = (t.clientX - e.startPx.x) / this.scale / r * 100, p = (t.clientY - e.startPx.y) / this.scale / a * 100, d = /* @__PURE__ */ new Map();
        for (const [u, h] of e.startPositions) {
          const f = this.dragShiftHeld ? Re(h.x + l) : h.x + l, m = this.dragShiftHeld ? Re(h.y + p) : h.y + p;
          d.set(u, { x: f, y: m });
        }
        this.config = Oo(this.config, d);
      } else e.kind === "overlay" ? this.config = Xo(this.config, e.id, n) : e.kind === "waypoint" && (this.config = ot(this.config, e.flowId, e.index, n));
    }, this.onHandlePointerUp = (t) => {
      if (this.dragPointerId !== t.pointerId) return;
      const e = t.currentTarget;
      e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
      const i = this.dragStartConfig, n = this.config, o = this.dragTarget, s = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !o) return;
      if (!s && o.kind === "node") {
        const a = o.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (t.shiftKey) {
          const l = new Set(this.selectedNodeIds);
          l.has(a) ? l.delete(a) : l.add(a), this.selectedNodeIds = l, this.selectedNodeId = l.size === 1 ? Array.from(l)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([a]), this.selectedNodeId = a, this.selectedFlowId = null, this.selectedOverlayId = null;
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
    super.disconnectedCallback(), this._pathWorker?.terminate(), this._pathWorker = void 0, this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown), document.removeEventListener("keydown", this.onKeyDown, !0), document.removeEventListener("keydown", this.onSpaceDown, !0), document.removeEventListener("keyup", this.onSpaceUp, !0), this._canvasResizeObserver?.disconnect(), this._canvasResizeObserver = void 0, this.scale = this.fitScale, this.panX = this.fitPanX, this.panY = this.fitPanY, this.spaceHeld = !1, this.panPointerId = null, this._editorFxRaf !== null && (cancelAnimationFrame(this._editorFxRaf), this._editorFxRaf = null), this.editorNodeFx.reset();
  }
  willUpdate(t) {
    if (super.willUpdate(t), t.has("hass")) {
      const e = this.hass?.language;
      e !== this._lastLanguage && (this._lastLanguage = e, Fi(e));
    }
  }
  updated(t) {
    super.updated(t);
    const e = this._pendingInspectorLabelFocus;
    e && (this._pendingInspectorLabelFocus = !1), t.has("inlineRename") && this.inlineRename && this.updateComplete.then(() => {
      const i = this.shadowRoot?.querySelector(".inline-rename");
      i?.focus(), i?.select();
    }), e && this.updateComplete.then(() => {
      const i = this.nodeLabelInputRef.value ?? this.flowIdInputRef.value ?? this.overlayIdInputRef.value;
      i?.focus(), i?.select();
    }), this.updateComplete.then(() => {
      const i = this.editorFxSvgRef.value;
      i && this.config && this.hass && (this.editorNodeFx.sync(i, this.config, this.hass, performance.now()), this.editorNodeFx.prunePulseState(new Set(this.config.nodes.map((n) => n.id)))), this.ensureEditorNodeFxRaf();
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
      i && this.config && this.hass && this.editorNodeFx.sync(i, this.config, this.hass, performance.now());
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
    this._loadedImageUrl = t;
    const e = new Image();
    e.onload = () => {
      this.imageNaturalW = e.naturalWidth || 1600, this.imageNaturalH = e.naturalHeight || 1e3, this.recalcFit();
    }, e.onerror = () => {
      this.recalcFit();
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
    if (e <= 0 || i <= 0) return;
    const n = e / this.imageNaturalW, o = this.imageNaturalH * n, s = 0, r = -(o - i) / 2, a = this.fitScale;
    this.fitScale = n, this.fitPanX = s, this.fitPanY = r, (this.scale === 1 || this.scale === a) && (this.scale = n, this.panX = s, this.panY = r);
  }
  setConfig(t) {
    try {
      this.config = ve(t), dt(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
      const e = this.config?.background?.default;
      e && this.loadBackgroundImage(e);
    } catch (e) {
      this.errorMessage = e instanceof Error ? e.message : String(e);
    }
  }
  render() {
    if (!this.config)
      return v`
        <div class="wrap">
          <p class="hint">${c("editor.hintNoConfig")}</p>
          ${this.errorMessage ? v`<pre class="error">${this.errorMessage}</pre>` : _}
        </div>
      `;
    const t = this.config.background.default, e = this.selectedNodeIds.size >= 2, i = this.selectedNodeId ? "nodes" : this.selectedFlowId ? "flows" : this.selectedOverlayId ? "overlays" : this.selectorType, n = this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? "";
    return v`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class="z-canvas"
          role="application"
          aria-label=${c("editor.canvas.ariaLabel")}
          ${Z(this.canvasRef)}
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
            ${Z(this.stageRef)}
          >
            <!-- canvas-content: unified scene layer for background + all content.
                 Sized to image natural dimensions so percentages map to image pixels.
                 Transform pans/zooms the whole scene as one unit. -->
            <div
              class="canvas-content"
              style=${`width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;`}
            >
              ${t ? v`<div class="background" style="background-image: url('${t}');"></div>` : _}
              <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
                ${this.config.flows.map((o) => this.renderFlowConnector(o))}
              </svg>
              <svg
                class="node-effects-editor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                ${Z(this.editorFxSvgRef)}
              ></svg>
              ${this.config.flows.filter((o) => o.id === this.selectedFlowId).map((o) => this.renderWaypointHandles(o))}
              ${(this.config.overlays ?? []).map((o) => this.renderOverlayHandle(o))}
              ${this.config.nodes.map((o) => this.renderHandle(o))}
              ${this.renderSuggestPreview()}
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
              ${e ? this.renderMultiSelectToolbar() : v`
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
      const o = this.config;
      this.pushPatch(o, this.savedConfig, "cancel all changes");
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
              @change=${(o) => {
      this.selectorType = o.target.value, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null;
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
              @change=${(o) => {
      const s = o.target.value;
      s && (i === "nodes" ? (this.selectedNodeId = s, this.selectedNodeIds = /* @__PURE__ */ new Set([s]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = s, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = s, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null), this._pendingInspectorLabelFocus = !0);
    }}
            >
              <option value="">${c(i ? "editor.toolbar.selectElement" : "editor.toolbar.selectElementDash")}</option>
              ${i === "nodes" ? this.config.nodes.map((o) => v`
                <option value=${o.id}>${o.label ?? o.id}</option>
              `) : _}
              ${i === "flows" ? this.config.flows.map((o) => v`
                <option value=${o.id}>${o.id}</option>
              `) : _}
              ${i === "overlays" ? (this.config.overlays ?? []).map((o, s) => v`
                <option value=${o.id ?? String(s)}>${c("editor.canvas.overlayOption", s, o.id ? c("editor.canvas.overlayOptionIdPart", o.id) : "")}</option>
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
    if (!this.config) return _;
    const e = new Map(this.config.nodes.map((d) => [d.id, d])), i = e.get(t.from_node), n = e.get(t.to_node);
    if (!i || !n) return _;
    const o = [i.position, ...t.waypoints, n.position], s = t.id === this.selectedFlowId, a = we(o, { width: 100, height: 100 }, t.line_style ?? "corner");
    if (!a) return _;
    const l = t.color ?? "rgba(255,255,255,0.8)", p = [];
    for (let d = 0; d < o.length - 1; d++) {
      const u = o[d], h = o[d + 1];
      !u || !h || p.push(Dt`
        <line
          class="segment-hit"
          x1=${u.x}
          y1=${u.y}
          x2=${h.x}
          y2=${h.y}
          data-flow-id=${t.id}
          data-segment-index=${d}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
        />
      `);
    }
    return Dt`
      <g>
        ${p}
        <path
          class=${`flow-path ${s ? "selected" : ""}`}
          d=${a}
          data-flow-id=${t.id}
          style=${`stroke: ${l};`}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
        />
      </g>
    `;
  }
  renderWaypointHandles(t) {
    return t.waypoints.map(
      (e, i) => v`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${c("aria.waypointHandle", i, t.id)}
          data-flow-id=${t.id}
          data-waypoint-index=${i}
          style=${`left: ${e.x}%; top: ${e.y}%;`}
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
  renderOverlayHandle(t) {
    const e = t.id === this.selectedOverlayId, i = t.size?.width ?? 14, n = t.size?.height ?? 8, o = this.inlineRename?.kind === "overlay" && this.inlineRename.id === t.id;
    return v`
      <div
        class=${`overlay-handle overlay-wrapper ${e ? "selected" : ""} overlay-${t.type}`}
        role="button"
        tabindex="0"
        aria-label=${c("aria.overlayHandle", t.id)}
        aria-selected=${e ? "true" : "false"}
        data-overlay-id=${t.id}
        style=${`left: ${t.position.x}%; top: ${t.position.y}%; width: ${i}%; height: ${n}%;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip" @dblclick=${(s) => this.onOverlayChipDblClick(s, t)}>
          ${o ? v`<input
                class="inline-rename overlay-inline-rename"
                type="text"
                spellcheck="false"
                .value=${this.inlineRename.draft}
                @input=${(s) => {
      const r = this.inlineRename;
      !r || r.kind !== "overlay" || r.id !== t.id || (this.inlineRename = { ...r, draft: s.target.value });
    }}
                @keydown=${(s) => {
      s.key === "Escape" ? (s.preventDefault(), this.inlineRename = null) : s.key === "Enter" && (s.preventDefault(), this.commitOverlayInlineRename(!0));
    }}
                @blur=${() => {
      this.inlineRename?.kind === "overlay" && this.inlineRename.id === t.id && this.commitOverlayInlineRename(!0);
    }}
              />` : v`<span>${t.id}<span class="overlay-type-badge">${t.type}</span></span>`}
        </div>
        ${e ? v`<div
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
    const e = this.selectedNodeIds.has(t.id), i = e && this.selectedNodeIds.size === 1, n = e && this.selectedNodeIds.size > 1, o = e ? Array.from(this.selectedNodeIds).indexOf(t.id) : -1, s = t.visible === !1, r = this.inlineRename?.kind === "node" && this.inlineRename.id === t.id;
    return v`
      <div
        class=${`handle ${i ? "selected" : ""} ${n ? "multi-selected" : ""} ${e ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
        role="button"
        tabindex="0"
        aria-label=${c("aria.nodeHandle", t.label ?? t.id, t.position.x, t.position.y)}
        aria-selected=${e ? "true" : "false"}
        data-node-id=${t.id}
        style=${`left: ${t.position.x}%; top: ${t.position.y}%;`}
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
        ${r ? v`<input
              class="inline-rename"
              type="text"
              spellcheck="false"
              .value=${this.inlineRename.draft}
              @input=${(a) => {
      const l = this.inlineRename;
      !l || l.kind !== "node" || l.id !== t.id || (this.inlineRename = { ...l, draft: a.target.value });
    }}
              @keydown=${(a) => {
      a.key === "Escape" ? (a.preventDefault(), this.inlineRename = null) : a.key === "Enter" && (a.preventDefault(), this.commitNodeInlineRename(!0));
    }}
              @blur=${() => {
      this.inlineRename?.kind === "node" && this.inlineRename.id === t.id && this.commitNodeInlineRename(!0);
    }}
            />` : t.label ? v`<span class="handle-label" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, t)}
                >${t.label}</span
              >` : v`<span class="handle-id" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, t)}
                >${t.id}</span
              >`}
        ${e && this.selectedNodeIds.size >= 2 ? v`<span class="suggest-badge">${o + 1}</span>` : _}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(a) => {
      if (a.stopPropagation(), !this.config) return;
      const l = this.config, p = ci(l, t.id, s);
      this.pushPatch(l, p, `${s ? "show" : "hide"} node ${t.id}`);
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
      const d = (u) => {
        u.stopPropagation(), e((u.detail?.value ?? "").trim());
      };
      return v`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${t}
          .includeDomains=${o}
          @value-changed=${d}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, a = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, l = Object.keys(r).filter((d) => {
      if (o.length === 0) return !0;
      const u = d.split(".")[0];
      return !!u && o.includes(u);
    }).sort();
    return v`
      <input
        type="text"
        list=${a}
        placeholder=${s}
        .value=${t}
        @change=${(d) => {
      e(d.target.value.trim());
    }}
      />
      <datalist id=${a}>
        ${l.map((d) => v`<option value=${d}></option>`)}
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
      return v`
        <div class="inspector">
          <h3>${c("editor.inspector.nodeHeading", t.id)}</h3>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${c("editor.inspector.label")}</span>
              <input
                type="text"
                ${Z(this.nodeLabelInputRef)}
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
        const n = i.target.checked, o = this.config, s = ci(o, t.id, n);
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
        const o = this.config, s = nt(o, t.id, { x: n, y: t.position.y });
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
        const o = this.config, s = nt(o, t.id, { x: t.position.x, y: n });
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
        const o = this.config, s = es(o, t.id, n >= 1 ? void 0 : n);
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
      return v`
        <div class="inspector">
          <label class="inspector-id-row">
            <span class="node-cell-label">${c("editor.inspector.flowIdField")}</span>
            <input
              type="text"
              spellcheck="false"
              ${Z(this.flowIdInputRef)}
              .value=${t.id}
              @change=${(i) => this.onInspectorFlowIdChange(t.id, i)}
            />
          </label>
          <h3>${c("editor.inspector.flowHeading", t.id)}</h3>
          <fieldset class="inspector-fieldset">
            <legend class="inspector-legend">${c("editor.inspector.routeAndSensor")}</legend>
            <div class="row">
              <span>${t.from_node} → ${t.to_node}</span>
            </div>
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
        const n = i.target.value, o = this.config, s = os(o, t.id, n);
        this.pushPatch(o, s, `set line style of ${t.id}`);
      }}
            >
              ${st.map(
        (i) => v`<option value=${i} ?selected=${(t.line_style ?? "corner") === i}>${i}</option>`
      )}
            </select>
          </label>
          <label>
            ${c("editor.inspector.colourOverride")}
            <div class="color-row">
              ${(() => {
        const i = T(t.domain ?? this.config.domain), n = fe(
          t,
          i,
          t.domain ?? this.config.domain,
          1,
          this.config.domain_colors,
          e >= 0 ? e : 0
        );
        return v`
                  <input
                    type="color"
                    .value=${t.color ?? n}
                    @change=${(o) => {
          if (!this.config) return;
          const s = o.target.value, r = this.config, a = li(r, t.id, s);
          this.pushPatch(r, a, `set colour of ${t.id}`);
        }}
                  />
                  <span class="color-effective">${t.color ? c("editor.inspector.colourOverrideActive") : c("editor.inspector.colourDomainDefault")}</span>
                  ${t.color ? v`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const o = this.config, s = li(o, t.id, void 0);
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
        const o = this.config, s = ts(o, t.id, n);
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
        const n = i.target.checked, o = this.config, s = ss(o, t.id, n);
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
    if (!this.config) return v``;
    const e = T(t.domain ?? this.config.domain), i = We(t, e), n = t.speed_curve_override ?? {}, o = (a, l, p) => v`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${l}${p ? v` <small>(${p})</small>` : _}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof i[a] == "number" ? i[a].toFixed(0) : ""}
          .value=${n[a] !== void 0 ? String(n[a]) : ""}
          @change=${(d) => {
      if (!this.config) return;
      const u = d.target.value.trim();
      if (u === "") {
        const h = {};
        for (const y of Object.keys(n))
          y !== a && (h[y] = n[y]);
        const f = this.config, m = ui(f, t.id, h);
        this.pushPatch(f, m, `update speed curve ${a} for ${t.id}`);
      } else {
        const h = parseFloat(u);
        if (!Number.isFinite(h)) return;
        const f = this.config, m = ui(f, t.id, { ...n, [a]: h });
        this.pushPatch(f, m, `update speed curve ${a} for ${t.id}`);
      }
    }}
        />
      </div>
    `, r = [i.threshold, i.p50, i.peak].map((a) => `${(K(a, i) / 1e3).toFixed(1)}s`);
    return v`
      <details class="speed-curve-details">
        <summary>${c("editor.inspector.speedCurveOverrideSummary")}</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            ${c("editor.inspector.speedCurveHint", e.unit_label, t.domain ?? this.config.domain)}
          </p>
          ${o("threshold", c("editor.inspector.threshold"), e.unit_label)}
          ${o("p50", c("editor.inspector.medianP50"), e.unit_label)}
          ${o("peak", c("editor.inspector.peak"), e.unit_label)}
          ${o("max_duration", c("editor.inspector.maxDuration"), c("editor.inspector.ms"))}
          ${o("min_duration", c("editor.inspector.minDuration"), c("editor.inspector.ms"))}
          ${o("steepness", c("editor.inspector.steepness"), c("editor.inspector.k"))}
          <div class="speed-curve-preview">
            <span>${c("editor.inspector.previewAtPoints")}</span>
            <strong>${r[0]}</strong>
            /
            <strong>${r[1]}</strong>
            /
            <strong>${r[2]}</strong>
          </div>
          ${Object.keys(n).length > 0 ? v`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const a = this.config, l = cs(a, t.id);
      this.pushPatch(a, l, `reset speed curve for ${t.id}`);
    }}>${c("editor.inspector.resetToDomainDefaults")}</button>` : _}
        </div>
      </details>
    `;
  }
  defaultNodeEffect(t) {
    switch (t) {
      case "pulse":
        return { type: "pulse", pulse_count: 3, pulse_duration: 800, pulse_threshold: 0.1 };
      case "glow":
        return { type: "glow", glow_max_radius: 20, peak_value: 1e4 };
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
        return { type: "pulse", pulse_count: 3, pulse_duration: 800, pulse_threshold: 0.1 };
    }
  }
  /** Self-contained animated SVG (no hass) for the inspector preview box (v1.23.2). */
  renderNodeEffectPreviewAnim(t) {
    const e = t.color ?? "#4ADE80", i = t.node_effect;
    if (!i)
      return v`
        <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        </svg>`;
    const n = i.type === "pulse" && i.pulse_color || e, o = i.type === "glow" && i.glow_color || e, s = i.type === "ripple" && i.ripple_color || e, r = i.type === "alert" ? i.alert_color ?? "#FF0000" : "#FF0000";
    switch (i.type) {
      case "pulse":
        return v`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="12" fill="${e}" opacity="0.9"/>
            ${[0, 1, 2].map(
          (a) => v`
              <circle
                class="fm-pulse-ring-prv"
                cx="50"
                cy="50"
                r="12"
                fill="none"
                stroke="${n}"
                stroke-width="2"
                style=${`animation-delay: ${a * 0.45}s`}
              />`
        )}
          </svg>`;
      case "glow": {
        const a = `fm-ed-glow-${t.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
        return v`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id=${a} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="50" cy="50" r="14" fill="${o}" filter=${`url(#${a})`} opacity="0.95">
              <animate attributeName="opacity" values="0.55;1;0.55" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      }
      case "badge":
        return v`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${e}"/>
            <circle cx="62" cy="38" r="7" fill="${i.badge_color_on ?? "#32DC50"}">
              <animate attributeName="fill" values="${i.badge_color_on ?? "#32DC50"};${i.badge_color_off ?? "#CC3333"};${i.badge_color_on ?? "#32DC50"}" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      case "ripple":
        return v`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="none" stroke="${s}" stroke-width="2">
              <animate attributeName="r" values="14;38;14" dur="${i.ripple_duration ?? 2e3}ms" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="${i.ripple_duration ?? 2e3}ms" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      case "alert":
        return v`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${e}">
              <animate attributeName="fill" values="${e};${r};${e}" dur="250ms" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      default:
        return v`<svg class="node-effect-preview" viewBox="0 0 100 100"></svg>`;
    }
  }
  renderNodeEffectInspector(t, e) {
    const i = t.node_effect, n = i?.type ?? "";
    return v`
      <details class="inspector-details node-effect-details">
        <summary>${c("editor.nodeEffect.section")}</summary>
        <div class="node-effect-body">
          ${!t.entity && i ? v`<p class="hint-sub">${c("editor.nodeEffect.needsEntity")}</p>` : _}
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
                <option value="pulse" ?selected=${n === "pulse"}>${c("editor.nodeEffect.pulse")}</option>
                <option value="glow" ?selected=${n === "glow"}>${c("editor.nodeEffect.glow")}</option>
                <option value="badge" ?selected=${n === "badge"}>${c("editor.nodeEffect.badge")}</option>
                <option value="ripple" ?selected=${n === "ripple"}>${c("editor.nodeEffect.ripple")}</option>
                <option value="alert" ?selected=${n === "alert"}>${c("editor.nodeEffect.alert")}</option>
              </select>
            </label>
          </div>

          ${i?.type === "pulse" ? v`
                <label>${c("editor.nodeEffect.pulseCount")}
                  <input type="number" min="1" max="12" step="1"
                    .value=${String(i.pulse_count ?? 3)}
                    @change=${(o) => {
      const s = parseInt(o.target.value, 10);
      Number.isFinite(s) && e(
        { node_effect: { ...i, pulse_count: s } },
        `pulse count ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.pulseDuration")}
                  <input type="number" min="200" max="5000" step="50"
                    .value=${String(i.pulse_duration ?? 800)}
                    @change=${(o) => {
      const s = parseInt(o.target.value, 10);
      Number.isFinite(s) && e(
        { node_effect: { ...i, pulse_duration: s } },
        `pulse duration ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.pulseThreshold")}
                  <input type="number" min="0" max="1" step="0.01"
                    .value=${String(i.pulse_threshold ?? 0.1)}
                    @change=${(o) => {
      const s = parseFloat(o.target.value);
      Number.isFinite(s) && e(
        { node_effect: { ...i, pulse_threshold: s } },
        `pulse threshold ${t.id}`
      );
    }}
                  />
                </label>
                <label>${c("editor.nodeEffect.pulseColor")}
                  <input type="text" placeholder=${c("editor.inspector.colourDomainDefault")}
                    .value=${i.pulse_color ?? ""}
                    @change=${(o) => {
      const s = o.target.value.trim();
      e(
        { node_effect: { ...i, pulse_color: s || void 0 } },
        `pulse color ${t.id}`
      );
    }}
                  />
                </label>
              ` : _}
          ${i?.type === "glow" ? v`
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
          ${i?.type === "badge" ? v`
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
          ${i?.type === "ripple" ? v`
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
          ${i?.type === "alert" ? v`
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
    if (!this.config) return v``;
    const e = t.animation ?? {}, i = e.animation_style ?? "dots", n = (d) => {
      if (!this.config) return;
      const u = this.config, h = ds(u, t.id, d);
      this.pushPatch(u, h, `update animation for ${t.id}`);
    }, s = !(/* @__PURE__ */ new Set(["dash", "pulse", "fluid", "none"])).has(i), r = i === "pulse", a = i === "trail", l = i === "dash", p = t.color ?? "#4ADE80";
    return v`
      <details class="anim-details" open>
        <summary>${c("editor.inspector.animation")}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(i, e, p)}
            </svg>
          </div>

          <label>${c("editor.inspector.style")}
            <select
              .value=${i}
              @change=${(d) => {
      n({ animation_style: d.target.value });
    }}
            >
              ${rt.map(
      (d) => v`<option value=${d} ?selected=${i === d}>${d}</option>`
    )}
            </select>
          </label>

          ${i === "fluid" ? v`<p class="hint-sub">${c("editor.inspector.fluidIgnoresParticleShape")}</p>` : _}

          ${s ? v`
            <label>${c("editor.inspector.particleShape")}
              <select
                .value=${e.particle_shape ?? "circle"}
                @change=${(d) => {
      n({ particle_shape: d.target.value });
    }}
              >
                ${at.map(
      (d) => v`<option value=${d} ?selected=${(e.particle_shape ?? "circle") === d}>${d}</option>`
    )}
              </select>
            </label>
            ${(e.particle_shape ?? "circle") === "custom_svg" ? v`
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
                        fill=${p} />
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
              ${lt.map(
      (d) => v`<option value=${d} ?selected=${(e.direction ?? "auto") === d}>${d}</option>`
    )}
            </select>
          </label>

          <label>${c("editor.inspector.particleSize")}
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(e.particle_size ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ particle_size: u });
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
      const u = d.target.value.trim();
      if (u === "") {
        n({ particle_count: void 0 });
        return;
      }
      const h = parseInt(u, 10);
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
              ${ct.map(
      (d) => v`<option value=${d} ?selected=${(e.particle_spacing ?? "even") === d}>${d}</option>`
    )}
            </select>
          </label>

          ${e.particle_spacing === "clustered" ? v`
            <label>${c("editor.inspector.clusterSize")}
              <input type="number" min="1" max="10" step="1"
                .value=${String(e.cluster_size ?? 3)}
                @change=${(d) => {
      const u = parseInt(d.target.value, 10);
      Number.isFinite(u) && u >= 1 && n({ cluster_size: u });
    }}
              />
            </label>
            <label>${c("editor.inspector.clusterGap")}
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(e.cluster_gap ?? 2)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ cluster_gap: u });
    }}
              />
            </label>
          ` : _}

          ${e.particle_spacing === "pulse" ? v`
            <label>${c("editor.inspector.pulseFrequencyHz")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.pulse_frequency ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ pulse_frequency: u });
    }}
              />
            </label>
            <label>${c("editor.inspector.pulseRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(e.pulse_ratio ?? 0.3)}
                  @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ pulse_ratio: u });
    }}
                />
                <span>${(e.pulse_ratio ?? 0.3).toFixed(2)}</span>
              </div>
            </label>
          ` : _}

          ${e.particle_spacing === "wave_spacing" || e.particle_spacing === "wave_lateral" ? v`
            <label>${c("editor.inspector.waveFrequency")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.wave_frequency ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ wave_frequency: u });
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
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ wave_amplitude: u });
    }}
              />
            </label>
          ` : _}

          <label>${c("editor.inspector.glowIntensity")}
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(e.glow_intensity ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ glow_intensity: u });
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

          ${r ? v`
            <label>${c("editor.inspector.pulseWidthPx")}
              <input type="number" min="1" max="20" step="0.5"
                .value=${String(e.pulse_width ?? 2)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ pulse_width: u });
    }}
              />
            </label>
          ` : _}

          ${a ? v`
            <label>${c("editor.inspector.trailLength")}
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(e.trail_length ?? 2)}
                  @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ trail_length: u });
    }}
                />
                <span>${(e.trail_length ?? 2).toFixed(2)}×</span>
              </div>
            </label>
          ` : _}

          ${l ? v`
            <label>${c("editor.inspector.dashGapRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(e.dash_gap ?? 0.5)}
                  @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ dash_gap: u });
    }}
                />
                <span>${(e.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : _}

          ${t.animation && Object.keys(t.animation).length > 0 ? v`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const d = this.config, u = ps(d, t.id);
      this.pushPatch(d, u, `reset animation for ${t.id}`);
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
      return v`<line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="2" stroke-opacity="0.3"/>`;
    if (t === "dash") {
      const r = e.dash_gap ?? 0.5, a = 14, l = a * r;
      return v`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="3"
          stroke-dasharray="${a} ${l}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${a + l}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (t === "fluid")
      return v`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (t === "pulse")
      return v`
        ${[40, 90, 140].map(
        (a, l) => v`
            <circle cx=${a} cy="20" r="0" fill="none"
              stroke=${i} stroke-width=${e.pulse_width ?? 2}>
              <animate attributeName="r" values="0;12;0" dur="1.2s" repeatCount="indefinite"
                begin="${(l * 0.4).toFixed(1)}s"/>
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite"
                begin="${(l * 0.4).toFixed(1)}s"/>
            </circle>
          `
      )}
      `;
    if (e.particle_spacing === "wave_lateral") {
      const r = Array.from({ length: o }, (a, l) => (l + 0.5) / o * 180 + 10);
      return v`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (a, l) => v`
            <circle cx=${a} cy="20" r=${n} fill=${i} opacity="0">
              <animate attributeName="cx" values="${a};190;10;${a}" dur="1.4s"
                repeatCount="indefinite" begin="${(l / o * -1.4).toFixed(2)}s"/>
              <animate attributeName="cy" values="20;${10 + (l % 2 === 0 ? 6 : -6)};20;${10 + (l % 2 === 0 ? -6 : 6)};20"
                dur="1.4s" repeatCount="indefinite" begin="${(l / o * -1.4).toFixed(2)}s"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
                repeatCount="indefinite" begin="${(l / o * -1.4).toFixed(2)}s"/>
            </circle>
          `
      )}
      `;
    }
    const s = Array.from({ length: o }, (r, a) => (a + 0.5) / o * 180 + 10);
    return v`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${s.map(
      (r, a) => v`
          <circle cx=${r} cy="20" r=${n} fill=${i} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(a / o * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(a / o * -1.4).toFixed(2)}s"/>
          </circle>
        `
    )}
    `;
  }
  renderWaypointList(t) {
    if (!this.config) return v``;
    const e = new Map(this.config.nodes.map((s) => [s.id, s])), i = e.get(t.from_node), n = e.get(t.to_node), o = () => {
      if (!this.config) return;
      const s = [
        ...i ? [i.position] : [],
        ...t.waypoints,
        ...n ? [n.position] : []
      ];
      let r = 0, a = 0;
      for (let m = 0; m < s.length - 1; m++) {
        const y = s[m], g = s[m + 1], b = Math.hypot(g.x - y.x, g.y - y.y);
        b > a && (a = b, r = m);
      }
      const l = s[r], p = s[r + 1], d = { x: (l.x + p.x) / 2, y: (l.y + p.y) / 2 }, u = r > 0 ? r - 1 + 1 : 0, h = this.config, f = ii(h, t.id, u, d);
      this.pushPatch(h, f, `add waypoint to ${t.id}`);
    };
    return v`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${c("editor.inspector.waypoints")}
          <span class="waypoint-count">${t.waypoints.length}</span>
        </h4>

        ${t.waypoints.length === 0 ? v`<div class="waypoint-empty">${c("editor.inspector.waypointEmpty")}</div>` : v`
            <ul class="waypoint-list">
              ${t.waypoints.map((s, r) => v`
                <li class="waypoint-row">
                  <span class="waypoint-index">${c("editor.inspector.waypointSectionHash")}${r + 1}</span>
                  <label class="waypoint-coord">
                    ${c("editor.inspector.waypointCoordX")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.x.toFixed(1)}
                      @change=${(a) => {
      if (!this.config) return;
      const l = parseFloat(a.target.value);
      if (!Number.isFinite(l)) return;
      const p = this.config, d = ot(p, t.id, r, { x: l, y: s.y });
      this.pushPatch(p, d, `move waypoint ${r} of ${t.id}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    ${c("editor.inspector.waypointCoordY")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.y.toFixed(1)}
                      @change=${(a) => {
      if (!this.config) return;
      const l = parseFloat(a.target.value);
      if (!Number.isFinite(l)) return;
      const p = this.config, d = ot(p, t.id, r, { x: s.x, y: l });
      this.pushPatch(p, d, `move waypoint ${r} of ${t.id}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${c("editor.inspector.deleteWaypointAria", r)} title=${c("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const a = this.config, l = ni(a, t.id, r);
      this.pushPatch(a, l, `delete waypoint ${r} of ${t.id}`);
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
    if (!this.config) return v``;
    const e = t.value_gradient, i = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, n = (s) => {
      if (!this.config) return;
      const r = this.config, a = hs(r, t.id, s);
      this.pushPatch(r, a, `update gradient for ${t.id}`);
    };
    let o = _;
    if (e && e.low_color && e.high_color)
      try {
        const s = Ei(
          (e.low_value + e.high_value) / 2,
          e
        ), r = `background: linear-gradient(to right, ${e.low_color}, ${s}, ${e.high_color});`;
        o = v`
          <div class="gradient-preview-bar" style=${r}></div>
          <div class="gradient-preview-labels">
            <span>${e.low_color}</span><span>${e.high_color}</span>
          </div>
        `;
      } catch {
      }
    return v`
      <div class="gradient-section">
        <h4 class="gradient-section-header">${c("editor.inspector.valueGradient")}</h4>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!e}
            @change=${(s) => {
      if (!this.config) return;
      const r = s.target.checked, a = this.config, l = r ? us(a, t.id, i) : fi(a, t.id);
      this.pushPatch(a, l, `${r ? "enable" : "disable"} gradient for ${t.id}`);
    }}
          />
          ${c("editor.inspector.enableGradient")}
        </label>

        ${e ? v`
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
      const s = this.config, r = fi(s, t.id);
      this.pushPatch(s, r, `disable gradient for ${t.id}`);
    }}>${c("editor.inspector.removeGradient")}</button>
        ` : _}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return _;
    const t = this.config.animation ?? {};
    return v`
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
      const i = parseInt(e.target.value, 10), n = this.config, o = hi(n, { fps: i });
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
      const i = e.target.checked, n = this.config, o = hi(n, { smooth_speed: i });
      this.pushPatch(n, o, "set smooth_speed");
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
    const e = t.size ?? { width: 20, height: 15 }, i = t.visible !== !1, n = t.opacity ?? 1;
    return v`
      <div class="inspector overlay-inspector">
        <label class="inspector-id-row">
          <span class="node-cell-label">${c("editor.inspector.overlayIdField")}</span>
          <input
            type="text"
            spellcheck="false"
            ${Z(this.overlayIdInputRef)}
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
      const s = o.target.checked, r = this.config, a = Jo(r, t.id, s);
      this.pushPatch(r, a, `toggle overlay ${t.id} visible`);
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
      const r = this.config, a = Qo(r, t.id, s);
      this.pushPatch(r, a, `edit overlay ${t.id} opacity`);
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
    return v`
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
      ${this.customConfigError ? v`<div class="custom-config-error">${this.customConfigError}</div>` : _}
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
      return v`
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
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, p = ai(l, i, a);
        this.config = p, this.commitToHa(p);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, p = ai(l, i, a);
        this.pushPatch(l, p, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${s.toFixed(2)}</span>
        </label>
      `;
    };
    return v`
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
    const t = this.config.domain_colors ?? {}, e = this.config.domain ?? "energy", i = Ge[e] ?? Ge.generic, n = (o, s) => {
      const r = `editor.domainRoles.${e}.${o}`, a = c(r);
      return a !== r ? a : s;
    };
    return v`
      <details class="panel domain-colors-panel">
        <summary>${c("editor.inspector.domainColoursSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.domainColoursHint")}
          </p>
          ${i.roles.map((o) => {
      const s = t[o.key], r = o.default, a = n(o.key, o.label);
      return v`
              <div class="color-picker-row">
                <span class="color-picker-label">${a}</span>
                <input
                  type="color"
                  .value=${s ?? r}
                  @change=${(l) => {
        if (!this.config) return;
        const p = l.target.value, d = this.config, u = di(d, o.key, p);
        this.pushPatch(d, u, `set domain_colors.${o.key}`);
      }}
                />
                <span class="color-picker-value">${s || c("editor.inspector.colourDefaultSuffix", r)}</span>
                ${s ? v`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const l = this.config, p = di(l, o.key, void 0);
        this.pushPatch(l, p, `reset domain_colors.${o.key}`);
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
      return v`
        <label class="visibility-row">
          <span class="visibility-label">${n}</span>
          <input
            type="checkbox"
            .checked=${o}
            @change=${(s) => {
        if (!this.config) return;
        const r = s.target.checked, a = this.config, l = rs(a, i, r);
        this.pushPatch(a, l, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${c(o ? "editor.inspector.visibilityVisible" : "editor.inspector.visibilityHidden")}</span>
        </label>
      `;
    };
    return v`
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
    const t = this.config.defaults ?? {}, e = (i, n, o) => {
      const s = t[i] ?? o.defaultVal;
      return v`
        <label class="defaults-row">
          <span class="defaults-label">${n}</span>
          <input
            type="number"
            min=${o.min}
            max=${o.max}
            step=${o.step}
            .value=${String(s)}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = Math.max(o.min, Math.min(o.max, a)), p = this.config, d = is(p, i, l);
        this.pushPatch(p, d, `set defaults.${i}`);
      }}
          />
          <span class="defaults-unit">${s}</span>
        </label>
      `;
    };
    return v`
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
    return this.config ? this.selectedNodeId || this.selectedFlowId || this.selectedOverlayId ? v`<div class="z-context-body">${this.renderInspector()}</div>` : this.renderStateA() : v``;
  }
  /** State A — nothing selected: background, appearance, defaults panels. */
  renderStateA() {
    return v`
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
    return this.config ? v`
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
      const e = t.target.value, i = this.config, n = as(i, e);
      this.pushPatch(i, n, `set domain ${e}`);
    }}
            >
              ${Me.map((t) => v`<option value=${t}>${this.domainOptionLabel(t)}</option>`)}
            </select>
          </label>
        </div>
      </details>
    ` : _;
  }
  domainOptionLabel(t) {
    return c(`editor.stateA.domainOption.${t}`);
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderMultiSelectToolbar() {
    const t = this.selectedNodeIds.size;
    if (t < 2) return _;
    const e = this.selectedNodeIds, i = Array.from(e)[0];
    return v`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${c("editor.inspector.multiselectCount", t)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? "suggest-path-busy" : ""}"
          aria-label=${c("editor.inspector.suggestPathBetweenAria")}
          title=${c(t === 2 ? "editor.inspector.suggestPathBetweenTitle" : "editor.inspector.suggestPathPickTwoTitle")}
          ?disabled=${t !== 2 || this.suggestBusy}
          @click=${() => void this.runSuggestPath()}
        >${this.suggestBusy ? v`${c("editor.toolbar.suggestPathFinding")}<span class="suggest-path-spinner" aria-hidden="true"></span>` : c("editor.toolbar.suggestPath")}</button>
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
    const e = this.config, i = ei(e, t, !1);
    this.pushPatch(e, i, `hide ${t.size} nodes`);
  }
  bulkShow(t) {
    if (!this.config) return;
    const e = this.config, i = ei(e, t, !0);
    this.pushPatch(e, i, `show ${t.size} nodes`);
  }
  bulkAlignH(t, e) {
    if (!this.config) return;
    const i = this.config, n = zo(i, t, e);
    this.pushPatch(i, n, `align ${t.size} nodes horizontally`);
  }
  bulkAlignV(t, e) {
    if (!this.config) return;
    const i = this.config, n = To(i, t, e);
    this.pushPatch(i, n, `align ${t.size} nodes vertically`);
  }
  bulkDelete(t) {
    if (!this.config || !window.confirm(c("editor.inspector.deleteNodesConfirm", t.size))) return;
    const e = this.config, i = Lo(e, t);
    this.pushPatch(e, i, `delete ${t.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderWeatherPanel() {
    if (!this.config) return _;
    const t = this.config.background, e = Object.entries(t.weather_states ?? {}), i = t.weather_entity && this.hass ? this.hass.states[t.weather_entity]?.state : void 0;
    return v`
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
            ${t.default ? v`<img class="weather-thumb" src=${t.default} alt=${c("editor.inspector.defaultBgAlt")} />` : _}
          </label>
          <label>
            ${c("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(
      t.weather_entity ?? "",
      (n) => this.setWeatherEntityValue(n),
      { includeDomains: ["weather"], placeholder: c("editor.inspector.weatherPlaceholder") }
    )}
          </label>
          ${i !== void 0 ? v`<div class="weather-live-state">
                ${c("editor.inspector.currentState")} <strong>${i}</strong>
                ${t.weather_states?.[i] ? v` → <span class="weather-match-ok">${c("editor.inspector.weatherMatched")}</span>` : v` → <span class="weather-match-miss">${c("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : _}
          <label>
            ${c("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(
      t.sun_entity ?? "",
      (n) => {
        if (!this.config) return;
        const o = this.config, s = Uo(o, n || void 0);
        this.pushPatch(o, s, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: c("editor.inspector.sunPlaceholder") }
    )}
          </label>
          ${t.sun_entity && this.hass?.states[t.sun_entity] ? v`<div class="weather-live-state">
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
      const s = this.config, r = Ko(s, o * 1e3);
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
      ([n, o]) => v`
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
                    ${o ? v`<img class="weather-thumb" src=${o} alt=${n} />` : _}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(n)}>
                      ${c("editor.inspector.remove")}
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${B.KNOWN_WEATHER_STATES.map(
      (n) => v`<option value=${n}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${c("editor.inspector.addWeatherState")}</button>
          </div>
          <details class="hint-details">
            <summary>${c("editor.inspector.metNoReferenceSummary")}</summary>
            <div class="hint-states">
              ${B.KNOWN_WEATHER_STATES.map(
      (n) => v`<code>${n}</code>`
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
    const e = t.trim(), i = this.config, n = Wo(i, e || void 0);
    this.pushPatch(i, n, "edit weather entity");
  }
  onWeatherStateKeyChange(t, e) {
    if (!this.config) return;
    const i = e.target.value.trim();
    if (!i || i === t) return;
    const n = this.config, o = ns(n, t, i);
    o !== n && this.pushPatch(n, o, `rename weather state ${t}→${i}`);
  }
  onWeatherStateUrlChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, n = this.config, o = si(n, t, i);
    this.pushPatch(n, o, `edit weather image ${t}`);
  }
  // -- toolbar --
  // -- suggest path --
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new Os();
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
    const n = this.config.nodes.find((s) => s.id === t), o = this.config.nodes.find((s) => s.id === e);
    if (!(!n || !o)) {
      this.suggestBusy = !0;
      try {
        const s = await Ns({
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
    const [t, e] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((a) => a.id === t), n = this.config.nodes.find((a) => a.id === e);
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
    const s = await Bs(o);
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
        cellSize: Ct
      },
      [r.buffer]
    );
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return _;
    const t = this.config.nodes.find((o) => o.id === this.suggestPreview.fromNodeId), e = this.config.nodes.find((o) => o.id === this.suggestPreview.toNodeId);
    if (!t || !e) return _;
    const n = [
      t.position,
      ...this.suggestPreview.waypoints,
      e.position
    ].map((o) => `${o.x.toFixed(2)},${o.y.toFixed(2)}`).join(" ");
    return v`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${n} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (o) => v`
          <div class="suggest-marker" style=${`left: ${o.x}%; top: ${o.y}%;`}></div>
        `
    )}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? v`
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
    const i = this.config.nodes.find((a) => a.id === e.id);
    if (!i) {
      this.inlineRename = null;
      return;
    }
    const n = i.label ?? i.id, o = e.draft.trim() ? e.draft.trim() : void 0;
    if ((i.label ?? void 0) === o) {
      this.inlineRename = null;
      return;
    }
    const s = this.config, r = ti(s, e.id, o);
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
    const n = this.config, o = pi(n, e.id, i);
    if (o === n) {
      this.errorMessage = c("editor.errors.renameIdConflict"), this.inlineRename = null;
      return;
    }
    this.inlineRename = null, this.errorMessage = "", this.pushPatch(n, o, `Rename overlay ${e.id} to ${i}`), this.selectedOverlayId = i;
  }
  onInspectorFlowIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, n = i.value.trim(), o = this.config, s = ls(o, t, n);
    if (s === o) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(o, s, `Rename flow ${t} to ${n}`), this.selectedFlowId = n;
  }
  onInspectorOverlayIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, n = i.value.trim(), o = this.config, s = pi(o, t, n);
    if (s === o) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(o, s, `Rename overlay ${t} to ${n}`), this.selectedOverlayId = n;
  }
  // -- inspector edits --
  onNodeLabelChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, n = this.config, s = n.nodes.find((l) => l.id === t)?.label ?? t, r = ti(n, t, i.trim() ? i.trim() : void 0), a = i.trim() ? i.trim() : void 0;
    this.pushPatch(n, r, `Rename node ${s} to ${a ?? t}`);
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
    const n = (this.config.overlays ?? []).find((l) => l.id === t);
    if (!n) return;
    const o = n.size ?? { width: 20, height: 15 }, s = Number(i.target.value);
    if (!Number.isFinite(s) || s <= 0) return;
    const r = this.config, a = ri(r, t, { ...o, [e]: s });
    this.pushPatch(r, a, `resize overlay ${t}`);
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
      const o = qo(n, t, i), s = ve(o);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: n, next: s, description: `edit overlay ${t} card config` }), this.commitToHa(s);
    } catch (o) {
      this.customConfigError = o instanceof Error ? o.message : String(o);
    }
  }
  removeOverlay(t) {
    if (!this.config) return;
    const e = this.config, i = Zo(e, t);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(e, i, `delete overlay ${t}`);
  }
  removeNode(t) {
    if (!this.config) return;
    const e = this.config, i = Do(e, t);
    this.selectedNodeId = null, this.pushPatch(e, i, `delete node ${t}`);
  }
  removeFlow(t) {
    if (!this.config) return;
    const e = this.config, i = Ho(e, t);
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
    const n = t.clientX - (i.left + 8), o = t.clientY - (i.top + 4), s = (n - this.panX) / this.scale, r = (o - this.panY) / this.scale, a = L(s / this.imageNaturalW * 100), l = L(r / this.imageNaturalH * 100);
    return { x: a, y: l };
  }
  pushPatch(t, e, i) {
    try {
      const n = ve(t), o = ve(e);
      this.errorMessage = "", this.undoStack.push({ prev: n, next: o, description: i }), this.commitToHa(o), this.config = o, dt(o.debug ?? !1);
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
B.KNOWN_WEATHER_STATES = [
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
B.styles = mt`
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
    @keyframes fmPulsePreviewRing {
      0% {
        transform: scale(1);
        opacity: 0.85;
      }
      100% {
        transform: scale(3.6);
        opacity: 0;
      }
    }
    .fm-pulse-ring-prv {
      transform-origin: 50px 50px;
      transform-box: fill-box;
      animation: fmPulsePreviewRing 1.6s ease-out infinite;
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
  Pe({ attribute: !1 })
], B.prototype, "hass", 2);
D([
  E()
], B.prototype, "config", 2);
D([
  E()
], B.prototype, "pending", 2);
D([
  E()
], B.prototype, "previewMode", 2);
D([
  E()
], B.prototype, "selectedNodeId", 2);
D([
  E()
], B.prototype, "selectedNodeIds", 2);
D([
  E()
], B.prototype, "selectedFlowId", 2);
D([
  E()
], B.prototype, "selectedOverlayId", 2);
D([
  E()
], B.prototype, "customConfigDraft", 2);
D([
  E()
], B.prototype, "customConfigError", 2);
D([
  E()
], B.prototype, "errorMessage", 2);
D([
  E()
], B.prototype, "inlineRename", 2);
D([
  E()
], B.prototype, "canUndo", 2);
D([
  E()
], B.prototype, "canRedo", 2);
D([
  E()
], B.prototype, "undoLabel", 2);
D([
  E()
], B.prototype, "redoLabel", 2);
D([
  E()
], B.prototype, "suggestPreview", 2);
D([
  E()
], B.prototype, "suggestBusy", 2);
D([
  E()
], B.prototype, "selectorType", 2);
D([
  E()
], B.prototype, "savedConfig", 2);
D([
  E()
], B.prototype, "scale", 2);
D([
  E()
], B.prototype, "panX", 2);
D([
  E()
], B.prototype, "panY", 2);
B = D([
  vt("flowme-card-editor")
], B);
var Ts = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, j = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Hs(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (o = (n ? r(e, i, o) : r(o)) || o);
  return n && o && Ts(e, i, o), o;
};
const Gs = "1.23.5", xi = 5e3;
console.info(
  `%c flowme %c v${Gs} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function Ws(t) {
  if (!t) return "";
  const e = [], i = (n, o) => {
    const s = t[n];
    s !== void 0 && e.push(`${o}:${s};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), e.join("");
}
function Us(t) {
  if (!t) return "";
  const e = [], i = (n, o) => {
    t[n] === !1 && e.push(`${o}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), e.join("");
}
let H = class extends ie {
  constructor() {
    super(...arguments), this._connectionAwaitingReconnect = !1, this._boundHaConnection = null, this.onHaConnectionReady = () => {
      this.onReconnect();
    }, this.onHaConnectionDisconnected = () => {
      this._connectionAwaitingReconnect = !0;
    }, this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = Y(), this.nodeFxSvgRef = Y(), this.nodeFx = new Li(), this._nodeFxRaf = null, this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this.onOverlayKeydown = (t, e) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleOverlayTap(e));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(t) {
    const e = this._hass;
    if (this._hass = t, t && t.language !== this._lastLanguage && (this._lastLanguage = t.language, Fi(t.language)), t) {
      const i = this.config, n = [
        ...i?.flows.map((l) => l.entity) ?? [],
        ...i?.flows.map((l) => l.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((l) => l.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((l) => typeof l == "string" && l.length > 0), o = {};
      for (const l of n)
        o[l] = t.states[l]?.state;
      R("hass setter called. config entity states:", o);
      const s = i?.background.weather_entity;
      if (s) {
        const l = e?.states[s]?.state, p = t.states[s]?.state;
        R("[weather] state:", p, "(was:", l, ")"), l !== p && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const l = e?.states[r]?.state, p = t.states[r]?.state;
        l !== p && (R("[sun] state changed:", l, "→", p), this.syncWeatherBackground());
      }
      const a = t.connection;
      this.bindHaConnection(a);
    } else
      R("hass setter called with undefined"), this.bindHaConnection(void 0), e && this.showToast(c("card.connectionLost"));
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
  setConfig(t) {
    try {
      const e = ve(t);
      dt(e.debug ?? !1), R("setConfig called:", JSON.parse(JSON.stringify(t ?? null))), R("setConfig validated → flows=", e.flows.length, "nodes=", e.nodes.length, "overlays=", e.overlays?.length ?? 0), this.config = e, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== e && this.teardownRenderer();
      const i = e.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (e) {
      const i = e instanceof wt ? e.message : String(e);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), R("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    R("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), R("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null), this.bindHaConnection(void 0), this.nodeFx.reset(), this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), super.disconnectedCallback();
  }
  willUpdate(t) {
    if (!this.config) return;
    const e = this.rendererMount.value;
    if (e && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = xo(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(e, i).then(() => {
        this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
      }).catch((n) => {
        R("renderer init failed — falling back to SVG renderer", n), this.teardownRenderer(), this.renderer = new Oe(), this.rendererReadyFor = i, this.renderer.init(e, i).then(() => {
          this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
        }).catch((o) => {
          console.error("[flowme] SVG renderer init also failed", o);
        });
      });
    }
    t.has("hass") && this.renderer && (this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels()), (t.has("config") || t.has("hass")) && this.syncWeatherBackground();
  }
  updated(t) {
    super.updated(t), this.config && this.nodeFx.prunePulseState(new Set(this.config.nodes.map((i) => i.id)));
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
      R("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (const t of this.config.flows) {
        const e = this.hass.states[t.entity], i = xe(e?.state), n = T(t.domain ?? this.config.domain), o = e?.attributes?.unit_of_measurement, s = Wt(i, o, n.unit_scale);
        if (R(
          "updateFlow →",
          t.id,
          "entity=",
          t.entity,
          "raw=",
          e?.state,
          "parsed=",
          i,
          "sensorUnit=",
          o ?? "(none)",
          "matchedUnit=",
          s.matchedUnit ?? "(none → passthrough)",
          "factor=",
          s.factor,
          "scaledToBase(" + n.unit_label + ")=",
          s.value
        ), e) {
          if (e.state === "unavailable" || e.state === "unknown") {
            const r = `${t.id}:${t.entity}:unavailable`;
            this.warnedMissing.has(r) || (this.warnedMissing.add(r), R(`flow "${t.id}" entity "${t.entity}" is currently ${e.state} — no flow will render until it reports a number`));
          }
        } else {
          const r = `${t.id}:${t.entity}`;
          this.warnedMissing.has(r) || (this.warnedMissing.add(r), R(`flow "${t.id}" references entity "${t.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(t.id, s.value), t.value_gradient && this.renderer.setGradientColor) {
          const r = t.value_gradient.entity, a = this.hass.states[r];
          if (a && a.state !== "unavailable" && a.state !== "unknown") {
            const l = parseFloat(a.state);
            if (Number.isFinite(l)) {
              const p = t.value_gradient, d = Math.max(p.low_value, Math.min(p.high_value, l)), u = Ei(l, p);
              R(
                "[gradient]",
                t.id,
                "entity value:",
                l,
                "clamped:",
                d,
                "range:",
                `${p.low_value}–${p.high_value}`,
                "colour:",
                u
              ), this.renderer.setGradientColor(t.id, u);
            } else
              R(`flow "${t.id}" gradient entity "${r}" state "${a.state}" is not a number`), this.renderer.setGradientColor(t.id, null);
          } else
            R(`flow "${t.id}" gradient entity "${r}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(t.id, null);
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
    const n = xe(e.state), o = e.attributes?.unit_of_measurement ?? "", s = Wt(n, o, i.unit_scale);
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
    const o = xe(i.state), s = i.attributes?.unit_of_measurement ?? "";
    return s ? c("aria.readingWithTitle", e, `${this.formatSensorNumber(o)} ${s}`) : c("aria.readingWithTitle", e, n.describe(o));
  }
  getCardSize() {
    const t = Xe(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / t) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const t = Xe(this.config?.aspect_ratio) ?? 1.6;
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
      return v`
        <ha-card role="region" aria-label=${c("aria.card")}>
          <div class="error">
            <strong>${c("card.invalidConfigurationTitle")}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const t = this.config;
    if (!t)
      return v`<ha-card role="region" aria-label=${c("aria.card")}><div class="placeholder">${c("card.loading")}</div></ha-card>`;
    const i = `${1 / (Xe(t.aspect_ratio) ?? 16 / 10) * 100}%`, n = t.background.transition_duration ?? xi, o = Ws(t.opacity), s = Us(t.visibility);
    return v`
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
          <div class="renderer-mount" ${Z(this.rendererMount)}></div>
          <svg
            class="node-effects-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            ${Z(this.nodeFxSvgRef)}
          ></svg>
          ${t.nodes.map((r) => this.renderNodeHandle(r))}
          ${(t.overlays ?? []).map((r) => (R("rendering overlay →", r.type, "position=", r.position, "size=", r.size), Ao(r, this.hass, {
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
        const i = e.state, n = t.sun_entity ? this.hass.states[t.sun_entity]?.state : void 0, o = Wn(i, n, t.weather_states, t.default);
        let s = i;
        return n === "below_horizon" && !i.endsWith("-night") && (s = `${i}-night`), R("[FlowMe] sun:", n, "weather:", i, "→ lookup key:", s, "→ image:", o !== t.default ? o : "default"), o;
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
    const e = this.config.background.transition_duration ?? xi;
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
    let a = "";
    if (e) {
      const p = xe(e.state), d = e.attributes?.unit_of_measurement ?? "";
      d ? a = `${this.formatSensorNumber(p)} ${d}` : a = o.describe(p);
    }
    const l = t.visible === !1;
    return v`
      <div
        class="node"
        data-node-id=${t.id}
        role="img"
        aria-label=${this.formatNodeAriaLabel(t)}
        style=${`left: ${t.position.x}%; top: ${t.position.y}%; --flowme-dot-size: ${r}px;${t.opacity !== void 0 ? ` opacity: ${t.opacity};` : ""}${l ? " display: none;" : ""}`}
      >
        <span class="node-dot-wrap">
          <span
            class="node-dot node-circle"
            data-flowme-base-fill=${s}
            style=${`background: ${s}; width: ${r}px; height: ${r}px;`}
          ></span>
        </span>
        ${n ? v`<span class="node-label">${t.label}</span>` : null}
        ${i ? v`<span class="node-value">${a}</span>` : null}
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
      const a = T(r.domain ?? e), l = fe(r, a, r.domain ?? e, 1, i, s), p = l.toLowerCase();
      o.has(p) || (o.add(p), n || (n = l));
    }
    if (o.size !== 0)
      return o.size === 1 ? n : Oi;
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
H.styles = mt`
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
  Pe({ attribute: !1 })
], H.prototype, "hass", 1);
j([
  E()
], H.prototype, "config", 2);
j([
  E()
], H.prototype, "errorMessage", 2);
j([
  E()
], H.prototype, "toastVisible", 2);
j([
  E()
], H.prototype, "toastMessage", 2);
j([
  E()
], H.prototype, "bgLayerA", 2);
j([
  E()
], H.prototype, "bgLayerB", 2);
j([
  E()
], H.prototype, "activeLayer", 2);
H = j([
  vt("flowme-card")
], H);
const ht = window;
ht.customCards = ht.customCards ?? [];
ht.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: c("card.hacsDescription"),
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  H as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
