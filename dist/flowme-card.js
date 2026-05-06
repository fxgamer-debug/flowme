/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = globalThis, At = We.ShadowRoot && (We.ShadyCSS === void 0 || We.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let Oi = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== Ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (At && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = zt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && zt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const go = (t) => new Oi(typeof t == "string" ? t : t + "", void 0, Ct), St = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, n, s) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new Oi(i, t, Ct);
}, mo = (t, e) => {
  if (At) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), n = We.litNonce;
    n !== void 0 && o.setAttribute("nonce", n), o.textContent = i.cssText, t.appendChild(o);
  }
}, Tt = At ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return go(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bo, defineProperty: yo, getOwnPropertyDescriptor: vo, getOwnPropertyNames: wo, getOwnPropertySymbols: xo, getPrototypeOf: $o } = Object, ee = globalThis, Lt = ee.trustedTypes, _o = Lt ? Lt.emptyScript : "", Ao = ee.reactiveElementPolyfillSupport, _e = (t, e) => t, Ve = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? _o : null;
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
} }, It = (t, e) => !bo(t, e), Ot = { attribute: !0, type: String, converter: Ve, reflect: !1, useDefault: !1, hasChanged: It };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ee.litPropertyMetadata ?? (ee.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let pe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ot) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), n = this.getPropertyDescriptor(e, o, i);
      n !== void 0 && yo(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: n, set: s } = vo(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      s?.call(this, r), this.requestUpdate(e, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_e("elementProperties"))) return;
    const e = $o(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_e("properties"))) {
      const i = this.properties, o = [...wo(i), ...xo(i)];
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
      for (const n of o) i.unshift(Tt(n));
    } else e !== void 0 && i.push(Tt(e));
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
    return mo(e, this.constructor.elementStyles), e;
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
      const s = (o.converter?.toAttribute !== void 0 ? o.converter : Ve).toAttribute(i, o.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const o = this.constructor, n = o._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = o.getPropertyOptions(n), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ve;
      this._$Em = n;
      const a = r.fromAttribute(i, s.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, n = !1, s) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (s = this[e]), o ?? (o = r.getPropertyOptions(e)), !((o.hasChanged ?? It)(s, i) || o.useDefault && o.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, o)))) return;
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
        const { wrapped: r } = s, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, s, a);
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
pe.elementStyles = [], pe.shadowRootOptions = { mode: "open" }, pe[_e("elementProperties")] = /* @__PURE__ */ new Map(), pe[_e("finalized")] = /* @__PURE__ */ new Map(), Ao?.({ ReactiveElement: pe }), (ee.reactiveElementVersions ?? (ee.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, Ht = (t) => t, Ye = Ae.trustedTypes, Gt = Ye ? Ye.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Hi = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, Gi = "?" + J, Co = `<${Gi}>`, ae = document, ke = () => ae.createComment(""), Fe = (t) => t === null || typeof t != "object" && typeof t != "function", kt = Array.isArray, So = (t) => kt(t) || typeof t?.[Symbol.iterator] == "function", tt = `[ 	
\f\r]`, ye = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, Ut = />/g, ie = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kt = /'/g, jt = /"/g, Wi = /^(?:script|style|textarea|title)$/i, Ui = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), y = Ui(1), Vt = Ui(2), ue = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), ne = ae.createTreeWalker(ae, 129);
function Ki(t, e) {
  if (!kt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Gt !== void 0 ? Gt.createHTML(e) : e;
}
const Io = (t, e) => {
  const i = t.length - 1, o = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = ye;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let d, p, h = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, p = r.exec(l), p !== null); ) u = r.lastIndex, r === ye ? p[1] === "!--" ? r = Wt : p[1] !== void 0 ? r = Ut : p[2] !== void 0 ? (Wi.test(p[2]) && (n = RegExp("</" + p[2], "g")), r = ie) : p[3] !== void 0 && (r = ie) : r === ie ? p[0] === ">" ? (r = n ?? ye, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? ie : p[3] === '"' ? jt : Kt) : r === jt || r === Kt ? r = ie : r === Wt || r === Ut ? r = ye : (r = ie, n = void 0);
    const f = r === ie && t[a + 1].startsWith("/>") ? " " : "";
    s += r === ye ? l + Co : h >= 0 ? (o.push(d), l.slice(0, h) + Hi + l.slice(h) + J + f) : l + J + (h === -2 ? a : f);
  }
  return [Ki(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Pe {
  constructor({ strings: e, _$litType$: i }, o) {
    let n;
    this.parts = [];
    let s = 0, r = 0;
    const a = e.length - 1, l = this.parts, [d, p] = Io(e, i);
    if (this.el = Pe.createElement(d, o), ne.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = ne.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Hi)) {
          const u = p[r++], f = n.getAttribute(h).split(J), g = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: s, name: g[2], strings: f, ctor: g[1] === "." ? Fo : g[1] === "?" ? Po : g[1] === "@" ? Mo : Je }), n.removeAttribute(h);
        } else h.startsWith(J) && (l.push({ type: 6, index: s }), n.removeAttribute(h));
        if (Wi.test(n.tagName)) {
          const h = n.textContent.split(J), u = h.length - 1;
          if (u > 0) {
            n.textContent = Ye ? Ye.emptyScript : "";
            for (let f = 0; f < u; f++) n.append(h[f], ke()), ne.nextNode(), l.push({ type: 2, index: ++s });
            n.append(h[u], ke());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Gi) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(J, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += J.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const o = ae.createElement("template");
    return o.innerHTML = e, o;
  }
}
function he(t, e, i = t, o) {
  if (e === ue) return e;
  let n = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const s = Fe(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(t), n._$AT(t, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = n : i._$Cl = n), n !== void 0 && (e = he(t, n._$AS(t, e.values), n, o)), e;
}
class ko {
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
    const { el: { content: i }, parts: o } = this._$AD, n = (e?.creationScope ?? ae).importNode(i, !0);
    ne.currentNode = n;
    let s = ne.nextNode(), r = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new Re(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new Bo(s, this, e)), this._$AV.push(d), l = o[++a];
      }
      r !== l?.index && (s = ne.nextNode(), r++);
    }
    return ne.currentNode = ae, n;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class Re {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, o, n) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = he(this, e, i), Fe(e) ? e === A || e == null || e === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : e !== this._$AH && e !== ue && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : So(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== A && Fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ae.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: o } = e, n = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Pe.createElement(Ki(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const s = new ko(n, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Yt.get(e.strings);
    return i === void 0 && Yt.set(e.strings, i = new Pe(e)), i;
  }
  k(e) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, n = 0;
    for (const s of e) n === i.length ? i.push(o = new Re(this.O(ke()), this.O(ke()), this, this.options)) : o = i[n], o._$AI(s), n++;
    n < i.length && (this._$AR(o && o._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const o = Ht(e).nextSibling;
      Ht(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Je {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, n, s) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = s, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = A;
  }
  _$AI(e, i = this, o, n) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) e = he(this, e, i, 0), r = !Fe(e) || e !== this._$AH && e !== ue, r && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = he(this, a[o + l], i, l), d === ue && (d = this._$AH[l]), r || (r = !Fe(d) || d !== this._$AH[l]), d === A ? e = A : e !== A && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Fo extends Je {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === A ? void 0 : e;
  }
}
class Po extends Je {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== A);
  }
}
class Mo extends Je {
  constructor(e, i, o, n, s) {
    super(e, i, o, n, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = he(this, e, i, 0) ?? A) === ue) return;
    const o = this._$AH, n = e === A && o !== A || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, s = e !== A && (o === A || n);
    n && this.element.removeEventListener(this.name, this, o), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Bo {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    he(this, e);
  }
}
const No = Ae.litHtmlPolyfillSupport;
No?.(Pe, Re), (Ae.litHtmlVersions ?? (Ae.litHtmlVersions = [])).push("3.3.2");
const Eo = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let n = o._$litPart$;
  if (n === void 0) {
    const s = i?.renderBefore ?? null;
    o._$litPart$ = n = new Re(e.insertBefore(ke(), s), s, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = globalThis;
let re = class extends pe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Eo(i, this.renderRoot, this.renderOptions);
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
re._$litElement$ = !0, re.finalized = !0, Ce.litElementHydrateSupport?.({ LitElement: re });
const Ro = Ce.litElementPolyfillSupport;
Ro?.({ LitElement: re });
(Ce.litElementVersions ?? (Ce.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Do = { attribute: !0, type: String, converter: Ve, reflect: !1, hasChanged: It }, zo = (t = Do, e, i) => {
  const { kind: o, metadata: n } = i;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), o === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (o === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      e.call(this, a), this.requestUpdate(r, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function De(t) {
  return (e, i) => typeof i == "object" ? zo(t, e, i) : ((o, n, s) => {
    const r = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, o), r ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(t) {
  return De({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const To = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lo = { CHILD: 2 }, Oo = (t) => (...e) => ({ _$litDirective$: t, values: e });
class Ho {
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
const Se = (t, e) => {
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const o of i) o._$AO?.(e, !1), Se(o, e);
  return !0;
}, Ze = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while (i?.size === 0);
}, ji = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), Uo(e);
  }
};
function Go(t) {
  this._$AN !== void 0 ? (Ze(this), this._$AM = t, ji(this)) : this._$AM = t;
}
function Wo(t, e = !1, i = 0) {
  const o = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(o)) for (let s = i; s < o.length; s++) Se(o[s], !1), Ze(o[s]);
  else o != null && (Se(o, !1), Ze(o));
  else Se(this, t);
}
const Uo = (t) => {
  t.type == Lo.CHILD && (t._$AP ?? (t._$AP = Wo), t._$AQ ?? (t._$AQ = Go));
};
class Ko extends Ho {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, o) {
    super._$AT(e, i, o), ji(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), i && (Se(this, e), Ze(this));
  }
  setValue(e) {
    if (To(this._$Ct)) this._$Ct._$AI(e, this);
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
const X = () => new jo();
class jo {
}
const it = /* @__PURE__ */ new WeakMap(), q = Oo(class extends Ko {
  render(t) {
    return A;
  }
  update(t, [e]) {
    const i = e !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = e, this.ht = t.options?.host, this.rt(this.ct = t.element)), A;
  }
  rt(t) {
    if (this.isConnected || (t = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let i = it.get(e);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), it.set(e, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    return typeof this.G == "function" ? it.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
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
];
function Vi(t) {
  if (t == null || typeof t != "string") return "energy";
  const e = t.trim().toLowerCase();
  return Me.includes(e) ? e : "energy";
}
const gt = ["corner", "diagonal", "curve", "smooth"], mt = ["dots", "dash", "arrow", "trail", "fluid", "none"], bt = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], yt = ["auto", "forward", "reverse", "both"], vt = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], Vo = {
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
      flowLabel: "Label",
      flowLabelPlaceholder: "Display name (optional)",
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
      zeroThreshold: "Zero threshold (%)",
      zeroThresholdCutoff: "Motion stops below",
      advancedOptions: "Advanced options",
      zeroThresholdAuto: "Leave empty to use auto-stop",
      animMinMsPlaceholder: "Default 100ms",
      animMaxMsPlaceholder: "Default 10000ms",
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
      peakAirflow: "Peak airflow",
      peakM3h: "m³/h",
      peakCfm: "CFM",
      peakOr: "or",
      domainPeakDefault: "Domain default peak",
      browseImages: "Browse images",
      loading: "Loading…",
      browserUnavailable: "Media Source integration not available. Enable it to browse files, or enter a URL manually.",
      browserSetupRequired: "To enable image browsing, follow these steps:",
      browserSetupStep1: "Create folder: /config/www/community/flowme/backgrounds/",
      browserSetupStep2: "Place your background images there (.jpg, .png, .webp, etc.).",
      browserSetupStep3: "Add to configuration.yaml:",
      browserSetupStep4: "Restart Home Assistant.",
      browserSetupNote: "Images placed in this folder will appear in the browser automatically.",
      browserSetupDocs: "View setup guide"
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
    flowLabelMaxLen: "flow label must be at most 64 characters",
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
let Yi = {};
function ot(t) {
  Yi = t;
}
function Zi(t) {
  const i = (t ?? "en").split("-")[0].toLowerCase();
  if (i === "en") {
    ot({});
    return;
  }
  const o = `/local/flowme/translations/${i}.json`;
  fetch(o).then((n) => n.ok ? n.json() : null).then((n) => {
    n && typeof n == "object" && ot(n);
  }).catch(() => {
    ot({});
  });
}
function c(t, ...e) {
  const i = t.split(".");
  let o = Yi;
  for (const n of i)
    if (o && typeof o == "object")
      o = o[n];
    else {
      o = void 0;
      break;
    }
  if (o === void 0) {
    o = Vo;
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
const Yo = ["javascript:", "vbscript:", "data:", "file:"];
function Xi(t, e = "card_config") {
  const i = [], o = /* @__PURE__ */ new WeakSet(), n = (s, r) => {
    if (s != null) {
      if (typeof s == "string") {
        const a = s.trim().toLowerCase();
        for (const l of Yo)
          if (a.startsWith(l)) {
            i.push({ path: r, value: s, scheme: l });
            return;
          }
        return;
      }
      if (typeof s == "object" && !o.has(s)) {
        if (o.add(s), Array.isArray(s)) {
          for (let a = 0; a < s.length; a++) n(s[a], `${r}[${a}]`);
          return;
        }
        for (const [a, l] of Object.entries(s))
          n(l, `${r}.${a}`);
      }
    }
  };
  return n(t, e), i;
}
function Zo(t, e = "card_config") {
  const i = Xi(t, e);
  if (i.length === 0) return;
  const o = i[0];
  throw new Error(c("security.unsafeUrlInCard", o.scheme, o.path));
}
const Xo = "[FlowMe]";
let Pt = !1;
function se(t) {
  Pt = t;
}
function qi(t) {
  return !!(t && typeof t == "object" && t.debug === !0);
}
function S(...t) {
  Pt && console.warn(Xo, ...t);
}
function Ji() {
  return Pt;
}
function O(t) {
  const e = t.label?.trim();
  return e && e.length > 0 ? e : t.id;
}
function Qi(t, e = 2e3) {
  return new Promise((i) => {
    let o = 0, n = 0, s = 0;
    const r = 2;
    let a = !1;
    const l = { id: void 0 }, d = (h) => {
      a || (a = !0, l.id !== void 0 && window.clearTimeout(l.id), p.disconnect(), i(h));
    }, p = new ResizeObserver((h) => {
      const u = h[0];
      if (!u) return;
      const { width: f, height: g } = u.contentRect;
      f === o && g === n && f > 0 && g > 0 ? (s++, s >= r && d(u.contentRect)) : (s = 0, o = f, n = g);
    });
    p.observe(t), l.id = window.setTimeout(() => {
      d(t.getBoundingClientRect());
    }, e);
  });
}
function eo(t) {
  return new Promise((e) => {
    const i = new ResizeObserver((n) => {
      const s = n[0];
      if (!s) return;
      const { width: r, height: a } = s.contentRect;
      r > 0 && a > 0 && (i.disconnect(), e());
    });
    i.observe(t);
    const o = t.getBoundingClientRect();
    o.width > 0 && o.height > 0 && (i.disconnect(), e());
  });
}
function qo(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
function Zt(t, e, i) {
  return t + (e - t) * i;
}
function Be(t, e) {
  return { x: t.x / 100 * e.width, y: t.y / 100 * e.height };
}
function we(t, e, i) {
  if (t.length === 0) return "";
  if (t.length === 1) {
    const a = Be(t[0], e);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const o = t.map((a) => Be(a, e));
  if (i === "diagonal") {
    const a = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let l = 1; l < o.length; l++)
      a.push(`L ${o[l].x.toFixed(2)} ${o[l].y.toFixed(2)}`);
    return a.join(" ");
  }
  if (i === "corner") {
    const a = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let l = 1; l < o.length; l++) {
      const d = o[l - 1], p = o[l];
      a.push(`L ${p.x.toFixed(2)} ${d.y.toFixed(2)}`), a.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  if (i === "curve") {
    const a = o.length, l = [
      { x: 2 * o[0].x - o[1].x, y: 2 * o[0].y - o[1].y },
      ...o,
      { x: 2 * o[a - 1].x - o[a - 2].x, y: 2 * o[a - 1].y - o[a - 2].y }
    ], d = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let p = 1; p < a; p++) {
      const h = l[p - 1], u = l[p], f = l[p + 1], g = l[p + 2], b = u.x + (f.x - h.x) / 6, v = u.y + (f.y - h.y) / 6, m = f.x - (g.x - u.x) / 6, $ = f.y - (g.y - u.y) / 6;
      d.push(`C ${b.toFixed(2)} ${v.toFixed(2)} ${m.toFixed(2)} ${$.toFixed(2)} ${f.x.toFixed(2)} ${f.y.toFixed(2)}`);
    }
    return d.join(" ");
  }
  const n = 0.3, s = 20, r = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
  for (let a = 1; a < o.length; a++) {
    const l = o[a - 1], d = o[a], p = o[a + 1];
    if (!p) {
      r.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
      continue;
    }
    const h = Math.sqrt((d.x - l.x) ** 2 + (d.y - l.y) ** 2), u = Math.sqrt((p.x - d.x) ** 2 + (p.y - d.y) ** 2), f = Math.min(Math.min(h, u) * n, s), g = f / (h || 1), b = d.x - (d.x - l.x) * g, v = d.y - (d.y - l.y) * g, m = f / (u || 1), $ = d.x + (p.x - d.x) * m, _ = d.y + (p.y - d.y) * m;
    r.push(`L ${b.toFixed(2)} ${v.toFixed(2)}`), r.push(`Q ${d.x.toFixed(2)} ${d.y.toFixed(2)} ${$.toFixed(2)} ${_.toFixed(2)}`);
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
function Ne(t) {
  if (t == null) return 0;
  if (typeof t == "number")
    return Number.isFinite(t) ? t === 0 ? 0 : t : 0;
  const e = Number.parseFloat(String(t).trim());
  return Number.isFinite(e) ? e === 0 ? 0 : e : 0;
}
const nt = 1e4, Ue = 100, Ie = 1e-3, Ee = 2e-3;
function Mt(t, e) {
  const i = Ne(t), o = Math.min(e.minDur, e.maxDur), n = Math.max(e.minDur, e.maxDur);
  if (!(Number.isFinite(o) && Number.isFinite(n)) || n <= 0 || o <= 0)
    return Math.max(50, Ue);
  const s = e.peak;
  if (!(s > 0) || !Number.isFinite(s))
    return n;
  if (e.zeroThresholdEnabled && e.zeroThreshold !== void 0) {
    const l = Number.isFinite(e.zeroThreshold) && e.zeroThreshold > 0 && e.zeroThreshold <= 1 ? e.zeroThreshold : Ee;
    if (Math.min(1, Math.abs(i) / s) < l)
      return n;
  } else if (Math.abs(i) < Ie)
    return n;
  const r = Math.min(1, Math.abs(i) / s), a = n - r * (n - o);
  return !Number.isFinite(a) || a <= 0 ? o : Math.min(Math.max(a, o), n);
}
function to(t, e, i) {
  let o;
  if (e.zeroThresholdEnabled && e.zeroThreshold !== void 0)
    if (!(e.peak > 0) || !Number.isFinite(e.peak))
      o = Math.abs(t) < Ie;
    else {
      const n = Math.min(1, Math.abs(t) / e.peak), s = Number.isFinite(e.zeroThreshold) && e.zeroThreshold > 0 && e.zeroThreshold <= 1 ? e.zeroThreshold : Ee;
      o = n < s;
    }
  else
    o = Math.abs(t) < Ie;
  if (i?.flowId) {
    const n = e.peak > 0 && Number.isFinite(e.peak) ? Math.min(1, Math.abs(t) / e.peak).toFixed(6) : "(n/a)";
    S(
      "threshold check:",
      i.flowId,
      "mode:",
      e.zeroThresholdEnabled ? "pct" : "epsilon",
      "scaledValue:",
      t,
      "peak:",
      e.peak,
      "pct:",
      n,
      "epsilon:",
      Ie,
      "zeroThreshold:",
      e.zeroThresholdEnabled ? e.zeroThreshold : "(off)",
      "thresholdSource:",
      e.zeroThresholdSource,
      "stopping:",
      o
    );
  }
  return o;
}
function Xe(t, e, i) {
  const o = t.speed_curve_override ?? {}, n = i?.defaults, s = typeof t.peak_value == "number" && t.peak_value > 0 ? t.peak_value : void 0, r = typeof o.peak == "number" && o.peak > 0 ? o.peak : void 0, a = typeof n?.peak_value == "number" && n.peak_value > 0 ? n.peak_value : void 0, l = e.peak > 0 ? e.peak : 1, d = s ?? r ?? a ?? l;
  let p = t.animation?.min_duration ?? o.min_duration ?? Ue, h = t.animation?.max_duration ?? o.max_duration ?? nt;
  (!(p > 0) || !(h > p) || h > 6e4) && (p = Ue, h = nt), h = Math.min(h, 6e4), p >= h && (p = Ue, h = nt);
  const u = t.animation?.zero_threshold, f = typeof u == "number" && Number.isFinite(u) && u > 0 && u <= 1;
  return { peak: d, minDur: p, maxDur: h, zeroThreshold: f ? u : void 0, zeroThresholdEnabled: f, zeroThresholdSource: f ? "per-flow" : "default" };
}
function Xt(t, e, i) {
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
    const [r, a] = s[0];
    return { value: t * a, factor: a, matchedUnit: r };
  }
  return { value: t, factor: 1 };
}
function io(t, e) {
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
function Jo(t, e, i, o) {
  if (!i) return o;
  const n = e === "below_horizon";
  let s = t;
  n && !t.endsWith("-night") && (s = `${t}-night`);
  const r = i[s];
  if (r) return r;
  if (n && s !== "clear-night") {
    const a = i["clear-night"];
    if (a) return a;
  }
  if (s !== t) {
    const a = i[t];
    if (a) return a;
  }
  return o;
}
function st(t) {
  if (!t) return;
  const e = /^(\d+):(\d+)$/.exec(t);
  if (!e) return;
  const i = Number.parseInt(e[1], 10), o = Number.parseInt(e[2], 10);
  if (!(!i || !o))
    return i / o;
}
function qt(t) {
  const e = t.replace("#", ""), i = e.length === 3 ? e.split("").map((n) => n + n).join("") : e, o = parseInt(i, 16);
  return [o >> 16 & 255, o >> 8 & 255, o & 255];
}
function Jt(t, e, i) {
  const o = t / 255, n = e / 255, s = i / 255, r = Math.max(o, n, s), a = Math.min(o, n, s), l = (r + a) / 2;
  if (r === a) return [0, 0, l];
  const d = r - a, p = l > 0.5 ? d / (2 - r - a) : d / (r + a);
  let h;
  return r === o ? h = (n - s) / d + (n < s ? 6 : 0) : r === n ? h = (s - o) / d + 2 : h = (o - n) / d + 4, [h * 60, p, l];
}
function rt(t, e, i) {
  let o = i;
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? t + (e - t) * 6 * o : o < 1 / 2 ? e : o < 2 / 3 ? t + (e - t) * (2 / 3 - o) * 6 : t;
}
function Qo(t, e, i) {
  const o = t / 360;
  let n, s, r;
  if (e === 0)
    n = s = r = i;
  else {
    const l = i < 0.5 ? i * (1 + e) : i + e - i * e, d = 2 * i - l;
    n = rt(d, l, o + 1 / 3), s = rt(d, l, o), r = rt(d, l, o - 1 / 3);
  }
  const a = (l) => Math.round(l * 255).toString(16).padStart(2, "0");
  return `#${a(n)}${a(s)}${a(r)}`;
}
function oo(t, e) {
  const i = e.high_value - e.low_value, o = i === 0 ? 0 : Math.max(0, Math.min(1, (t - e.low_value) / i)), [n, s, r] = qt(e.low_color), [a, l, d] = qt(e.high_color), [p, h, u] = Jt(n, s, r), [f, g, b] = Jt(a, l, d);
  let v = f - p;
  v > 180 && (v -= 360), v < -180 && (v += 360);
  const m = (p + v * o + 360) % 360, $ = Zt(h, g, o), _ = Zt(u, b, o);
  return Qo(m, $, _);
}
function no() {
  try {
    return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
class Bt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Qt = [
  "/local/",
  "/media/",
  "/api/",
  "/hacsfiles/",
  "https://",
  "http://",
  "data:"
];
function w(t, e) {
  throw new Bt(`${t}: ${e}`);
}
function Nt(t, e) {
  (!t || typeof t != "object") && w(e, c("validation.mustBeObjectWithXY"));
  const i = t, o = i.x, n = i.y;
  (typeof o != "number" || !Number.isFinite(o)) && w(`${e}.x`, c("validation.mustBeFiniteNumber")), (typeof n != "number" || !Number.isFinite(n)) && w(`${e}.y`, c("validation.mustBeFiniteNumber"));
  const s = o, r = n;
  return (s < 0 || s > 100) && w(`${e}.x`, c("validation.percentRange", s)), (r < 0 || r > 100) && w(`${e}.y`, c("validation.percentRange", r)), { x: s, y: r };
}
function ei(t, e) {
  (typeof t != "string" || !t.length) && w(e, c("validation.mustBeNonEmptyString"));
  const i = t;
  return Qt.some((n) => i.startsWith(n)) || w(e, c("validation.urlMustStartWith", Qt.join(", "), i.slice(0, 40))), i;
}
function en(t, e, i) {
  const o = `nodes[${e}]`;
  (!t || typeof t != "object") && w(o, c("validation.mustBeObject"));
  const n = t, s = n.id;
  (typeof s != "string" || !s.length) && w(`${o}.id`, c("validation.mustBeNonEmptyId"));
  const r = s;
  i.has(r) && w(`${o}.id`, c("validation.duplicateNodeId", r)), i.add(r);
  const a = Nt(n.position, `${o}.position`), l = { id: r, position: a };
  if (typeof n.entity == "string" && (l.entity = n.entity), typeof n.label == "string" && (l.label = n.label), typeof n.color == "string" && (l.color = n.color), typeof n.size == "number" && (l.size = n.size), typeof n.show_label == "boolean" && (l.show_label = n.show_label), typeof n.show_value == "boolean" && (l.show_value = n.show_value), n.opacity !== void 0 && (l.opacity = Et(n.opacity, `${o}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && w(`${o}.visible`, c("validation.mustBeBoolean")), l.visible = n.visible), n.node_effect !== void 0) {
    const d = n.node_effect;
    d && typeof d == "object" && d.type === "pulse" ? S(`${o}.node_effect: type "pulse" is no longer supported; removing node_effect`) : l.node_effect = tn(d, `${o}.node_effect`);
  }
  return l;
}
function tn(t, e) {
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
function on(t, e, i, o) {
  const n = `flows[${e}]`;
  (!t || typeof t != "object") && w(n, c("validation.mustBeObject"));
  const s = t, r = s.id;
  (typeof r != "string" || !r.length) && w(`${n}.id`, c("validation.mustBeNonEmptyId"));
  const a = r;
  i.has(a) && w(`${n}.id`, c("validation.duplicateFlowId", a)), i.add(a);
  const l = s.from_node;
  (typeof l != "string" || !o.has(l)) && w(`${n}.from_node`, c("validation.unknownNodeRef", String(l)));
  const d = s.to_node;
  (typeof d != "string" || !o.has(d)) && w(`${n}.to_node`, c("validation.unknownNodeRef", String(d)));
  const p = s.entity;
  (typeof p != "string" || !p.length) && w(`${n}.entity`, c("validation.mustBeNonEmptyEntityId"));
  const h = s.waypoints;
  let u = [];
  h !== void 0 && (Array.isArray(h) || w(`${n}.waypoints`, c("validation.waypointsMustBeArray")), u = h.map(
    (g, b) => Nt(g, `${n}.waypoints[${b}]`)
  ));
  const f = {
    id: a,
    from_node: l,
    to_node: d,
    entity: p,
    waypoints: u
  };
  if (s.label !== void 0) {
    const g = s.label;
    typeof g != "string" && w(`${n}.label`, c("validation.mustBeString"));
    const b = g.trim();
    b.length > 64 && w(`${n}.label`, c("validation.flowLabelMaxLen")), b.length > 0 && b !== a && (f.label = b);
  }
  if (typeof s.domain == "string" && (Me.includes(s.domain) || w(`${n}.domain`, c("validation.mustBeOneOf", Me.join(", "))), f.domain = s.domain), typeof s.color == "string" && (f.color = s.color), typeof s.color_positive == "string" && (f.color_positive = s.color_positive), typeof s.color_negative == "string" && (f.color_negative = s.color_negative), typeof s.threshold == "number" && (f.threshold = s.threshold), s.peak_value !== void 0 && (f.peak_value = Z(s.peak_value, `${n}.peak_value`)), typeof s.reverse == "boolean" && (f.reverse = s.reverse), typeof s.speed_multiplier == "number") {
    const g = s.speed_multiplier;
    (g < 0.1 || g > 5) && w(`${n}.speed_multiplier`, c("validation.speedMultiplierRange")), f.speed_multiplier = g;
  }
  return s.opacity !== void 0 && (f.opacity = Et(s.opacity, `${n}.opacity`)), s.visible !== void 0 && (typeof s.visible != "boolean" && w(`${n}.visible`, c("validation.mustBeBoolean")), f.visible = s.visible), s.line_style !== void 0 && (gt.includes(s.line_style) || w(`${n}.line_style`, c("validation.mustBeOneOf", gt.join(", "))), f.line_style = s.line_style), s.speed_curve_override !== void 0 && (f.speed_curve_override = nn(
    s.speed_curve_override,
    `${n}.speed_curve_override`
  )), s.animation !== void 0 && (f.animation = an(s.animation, `${n}.animation`)), s.value_gradient !== void 0 && (f.value_gradient = ln(s.value_gradient, `${n}.value_gradient`)), f;
}
function nn(t, e) {
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
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${e}.${u}`, c("validation.durationPositive")), f;
  }
  const r = n("threshold");
  r !== void 0 && (o.threshold = r);
  const a = n("p50");
  a !== void 0 && (o.p50 = a);
  const l = n("peak");
  l !== void 0 && (o.peak = l);
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
function Z(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t <= 0) && w(e, c("validation.positiveFinite")), t;
}
function sn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("defaults", c("validation.defaultsMustBeObject"));
  const e = t, i = {};
  if (e.node_radius !== void 0 && (i.node_radius = Z(e.node_radius, "defaults.node_radius")), e.burst_trigger_ratio !== void 0) {
    const o = Z(e.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    o > 1 && w("defaults.burst_trigger_ratio", c("validation.burstTriggerMax1")), i.burst_trigger_ratio = o;
  }
  return e.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = Z(e.burst_sustain_ms, "defaults.burst_sustain_ms")), e.burst_max_particles !== void 0 && (i.burst_max_particles = Z(e.burst_max_particles, "defaults.burst_max_particles")), e.dot_radius !== void 0 && (i.dot_radius = Z(e.dot_radius, "defaults.dot_radius")), e.line_width !== void 0 && (i.line_width = Z(e.line_width, "defaults.line_width")), e.peak_value !== void 0 && (i.peak_value = Z(e.peak_value, "defaults.peak_value")), i;
}
function Et(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t < 0 || t > 1) && w(e, c("validation.opacity01")), t;
}
function rn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("opacity", c("validation.mustBeObject"));
  const e = t, i = {};
  for (const o of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    e[o] !== void 0 && (i[o] = Et(e[o], `opacity.${o}`));
  return i;
}
function an(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t, o = {};
  if (i.animation_style !== void 0) {
    let m = i.animation_style;
    (m === "pulse" || m === "spark") && (S(`${e}.animation_style '${String(m)}' was removed in v1.23.6 — using 'dots'`), m = "dots"), mt.includes(m) || w(`${e}.animation_style`, c("validation.mustBeOneOf", mt.join(", "))), o.animation_style = m;
  }
  i.particle_shape !== void 0 && (bt.includes(i.particle_shape) || w(`${e}.particle_shape`, c("validation.mustBeOneOf", bt.join(", "))), o.particle_shape = i.particle_shape), i.direction !== void 0 && (yt.includes(i.direction) || w(`${e}.direction`, c("validation.mustBeOneOf", yt.join(", "))), o.direction = i.direction), i.particle_spacing !== void 0 && (vt.includes(i.particle_spacing) || w(`${e}.particle_spacing`, c("validation.mustBeOneOf", vt.join(", "))), o.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && w(`${e}.custom_svg_path`, c("validation.mustBeSvgPathString")), i.custom_svg_path.length === 0 && S(`${e}.custom_svg_path is empty — will fall back to circle`), o.custom_svg_path = i.custom_svg_path);
  const n = (m, $) => {
    const _ = i[m];
    if (_ !== void 0)
      return (typeof _ != "number" || !Number.isFinite(_) || _ <= 0) && w(`${e}.${m}`, c("validation.positiveFinite")), $ !== void 0 && _ > $ && w(`${e}.${m}`, c("validation.mustBeAtMost", $)), _;
  }, s = (m) => {
    const $ = i[m];
    if ($ !== void 0)
      return typeof $ != "boolean" && w(`${e}.${m}`, c("validation.mustBeBoolean")), $;
  }, r = n("particle_size");
  if (r !== void 0 && (o.particle_size = r), i.particle_count !== void 0) {
    const m = i.particle_count;
    (typeof m != "number" || !Number.isFinite(m) || m < 1 || !Number.isInteger(m)) && w(`${e}.particle_count`, c("validation.particleCountInt")), o.particle_count = m;
  }
  if (i.glow_intensity !== void 0) {
    const m = i.glow_intensity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0) && w(`${e}.glow_intensity`, c("validation.glowNonNegative")), o.glow_intensity = m;
  }
  const a = s("shimmer");
  a !== void 0 && (o.shimmer = a);
  const l = s("flicker");
  l !== void 0 && (o.flicker = l);
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
  g !== void 0 && (o.wave_amplitude = g);
  let b, v;
  if (i.min_duration !== void 0) {
    const m = i.min_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && w(`${e}.min_duration`, c("validation.durationPositive")), m > 6e4 && w(`${e}.min_duration`, c("validation.mustBeAtMost", 6e4)), b = m, o.min_duration = b;
  }
  if (i.max_duration !== void 0) {
    const m = i.max_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && w(`${e}.max_duration`, c("validation.durationPositive")), m > 6e4 && w(`${e}.max_duration`, c("validation.mustBeAtMost", 6e4)), v = m, o.max_duration = v;
  }
  if (b !== void 0 && v !== void 0 && b >= v && (S(`${e}: min_duration >= max_duration — dropping both`), delete o.min_duration, delete o.max_duration), i.zero_threshold !== void 0) {
    const m = i.zero_threshold;
    typeof m == "number" && Number.isFinite(m) && m > 0 && m <= 1 ? o.zero_threshold = m : S(`${e}.zero_threshold invalid — using default`, Ee);
  }
  return o;
}
function ti(t, e) {
  return (typeof t != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) && w(e, c("validation.mustBeHexColor")), t;
}
function ln(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, c("validation.mustBeObject"));
  const i = t;
  typeof i.entity != "string" && w(`${e}.entity`, c("validation.mustBeStringEntityId")), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && w(`${e}.low_value`, c("validation.finiteNumber")), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && w(`${e}.high_value`, c("validation.finiteNumber")), i.low_value >= i.high_value && S(`${e}: low_value should be less than high_value`);
  const o = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: ti(i.low_color, `${e}.low_color`),
    high_color: ti(i.high_color, `${e}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || w(`${e}.mode`, c("validation.gradientMode")), o.mode = i.mode), o;
}
function cn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("animation", c("validation.animationRootMustBeObject"));
  const e = t, i = {};
  if (e.fps !== void 0) {
    const o = e.fps;
    (typeof o != "number" || !Number.isFinite(o) || o < 1 || o > 120) && w("animation.fps", c("validation.fpsRange")), i.fps = o;
  }
  return e.smooth_speed !== void 0 && (typeof e.smooth_speed != "boolean" && w("animation.smooth_speed", c("validation.mustBeBoolean")), i.smooth_speed = e.smooth_speed), i;
}
function dn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("visibility", c("validation.visibilityRootMustBeObject"));
  const e = t, i = {};
  for (const o of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    e[o] !== void 0 && (typeof e[o] != "boolean" && w(`visibility.${o}`, c("validation.mustBeBoolean")), i[o] = e[o]);
  return i;
}
function pn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("domain_colors", c("validation.domainColorsRootMustBeObject"));
  const e = t, i = {};
  for (const o of ["solar", "grid", "battery", "load"])
    e[o] !== void 0 && (typeof e[o] != "string" && w(`domain_colors.${o}`, c("validation.stringColourValue")), i[o] = e[o]);
  return i;
}
function $e(t) {
  if (!t || typeof t != "object") throw new Bt(c("validation.configMustBeObject"));
  const e = t;
  e.type !== "custom:flowme-card" && w("type", c("validation.typeMustBeFlowme", String(e.type)));
  const i = e.domain, o = typeof i == "string" ? Vi(i) : "energy", n = e.background;
  n !== void 0 && (n === null || typeof n != "object") && w("background", c("validation.backgroundWhenProvided"));
  const s = n ?? {}, a = { default: s.default === void 0 || s.default === "" ? "" : ei(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && w("background.weather_entity", c("validation.mustBeStringEntityId")), a.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && w("background.weather_states", c("validation.weatherStatesMapping"));
    const b = Object.entries(s.weather_states), v = {};
    for (const [m, $] of b) {
      if ($ === "" || $ === void 0) {
        v[m] = "";
        continue;
      }
      typeof $ != "string" && w(`background.weather_states.${m}`, c("validation.mustBeString")), v[m] = ei($, `background.weather_states.${m}`);
    }
    a.weather_states = v;
  }
  s.sun_entity !== void 0 && (typeof s.sun_entity != "string" && w("background.sun_entity", c("validation.sunEntityExample")), a.sun_entity = s.sun_entity), s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && w("background.transition_duration", c("validation.transitionMustBeNumberMs")), a.transition_duration = s.transition_duration);
  const l = e.nodes;
  Array.isArray(l) || w("nodes", c("validation.nodesMustBeArray"));
  const d = /* @__PURE__ */ new Set(), p = l.map((b, v) => en(b, v, d));
  p.length === 0 && w("nodes", c("validation.atLeastOneNode"));
  const h = e.flows;
  Array.isArray(h) || w("flows", c("validation.flowsMustBeArray"));
  const u = /* @__PURE__ */ new Set(), f = h.map(
    (b, v) => on(b, v, u, d)
  ), g = {
    type: "custom:flowme-card",
    domain: o,
    background: a,
    nodes: p,
    flows: f
  };
  if (e.aspect_ratio !== void 0 && ((typeof e.aspect_ratio != "string" || !/^\d+:\d+$/.test(e.aspect_ratio)) && w("aspect_ratio", c("validation.aspectRatioRegex")), g.aspect_ratio = e.aspect_ratio), e.fullscreen !== void 0 && (typeof e.fullscreen != "boolean" && w("fullscreen", c("validation.mustBeBoolean")), g.fullscreen = e.fullscreen), e.edit_mode_password !== void 0 && (typeof e.edit_mode_password != "string" && w("edit_mode_password", c("validation.editPasswordMustBeString")), g.edit_mode_password = e.edit_mode_password), e.pause_when_hidden !== void 0 && (typeof e.pause_when_hidden != "boolean" && w("pause_when_hidden", c("validation.mustBeBoolean")), g.pause_when_hidden = e.pause_when_hidden), e.overlays !== void 0) {
    Array.isArray(e.overlays) || w("overlays", c("validation.overlaysMustBeArray"));
    const b = /* @__PURE__ */ new Set();
    g.overlays = e.overlays.map(
      (v, m) => un(v, m, b)
    );
  }
  return e.defaults !== void 0 && (g.defaults = sn(e.defaults)), e.domain_colors !== void 0 && (g.domain_colors = pn(e.domain_colors)), e.debug !== void 0 && (typeof e.debug != "boolean" && w("debug", c("validation.mustBeBoolean")), g.debug = e.debug), e.opacity !== void 0 && (g.opacity = rn(e.opacity)), e.visibility !== void 0 && (g.visibility = dn(e.visibility)), e.animation !== void 0 && (g.animation = cn(e.animation)), g;
}
function un(t, e, i) {
  const o = `overlays[${e}]`;
  (!t || typeof t != "object") && w(o, c("validation.mustBeObject"));
  const n = t, s = n.type, a = typeof s == "string" && ["camera", "switch", "sensor", "button"].includes(s);
  !a && s !== "custom" && w(`${o}.type`, c("validation.overlayTypeMustBeCustom"));
  const l = n.id;
  (typeof l != "string" || !l.length) && w(`${o}.id`, c("validation.mustBeNonEmptyId")), i.has(l) && w(`${o}.id`, c("validation.duplicateOverlayId", l)), i.add(l);
  const d = Nt(n.position, `${o}.position`);
  if (a) {
    const g = c("validation.migrationOverlayWarning", s);
    S(`${o}: ${g}`);
    const b = {
      id: l,
      type: "custom",
      position: d,
      card: { type: "markdown", content: "" },
      _migration_warning: g
    };
    if (n.size !== void 0) {
      const v = n.size;
      if (v && typeof v == "object") {
        const m = v, $ = m.width, _ = m.height;
        typeof $ == "number" && typeof _ == "number" && (b.size = { width: $, height: _ });
      }
    }
    return b;
  }
  const p = n.card;
  (!p || typeof p != "object" || Array.isArray(p)) && w(`${o}.card`, c("validation.overlayCardMustBeObject"));
  const h = Xi(p, `${o}.card`);
  if (h.length) {
    const g = h[0];
    w(g.path, c("validation.unsafeSchemeInCard", g.scheme));
  }
  const f = {
    id: l,
    type: "custom",
    position: d,
    card: p
  };
  if (n.size !== void 0) {
    const g = n.size;
    (!g || typeof g != "object") && w(`${o}.size`, c("validation.overlaySizeMustBeObject"));
    const b = g, v = b.width, m = b.height;
    (typeof v != "number" || !Number.isFinite(v) || v <= 0 || v > 100) && w(`${o}.size.width`, c("validation.overlayWidthPercent")), (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m > 100) && w(`${o}.size.height`, c("validation.overlayHeightPercent")), f.size = { width: v, height: m };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && w(`${o}.visible`, c("validation.mustBeBoolean")), f.visible = n.visible), n.opacity !== void 0) {
    const g = n.opacity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 1) && w(`${o}.opacity`, c("validation.overlayOpacity01")), f.opacity = g;
  }
  return f;
}
const qe = {
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
function hn(t) {
  const e = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(e)) return "solar";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(e)) return "grid";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(e)) return "battery";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(e)) return "load";
}
function ii(t, e) {
  const i = t.toLowerCase();
  for (const o of e.roles)
    for (const n of o.patterns)
      if (n && i.includes(n)) return o.key;
}
function oi(t, e) {
  const i = t.roles[0];
  if (!i) return "#FFFFFF";
  const o = e?.[i.key];
  return ((typeof o == "string" && o.trim() !== "" ? o.trim() : void 0) ?? i.default) || "#FFFFFF";
}
function ni(t, e) {
  const i = e?.[t.key];
  return ((typeof i == "string" && i.trim() !== "" ? i.trim() : void 0) ?? t.default) || "#FFFFFF";
}
function fn(t, e, i, o) {
  if (t === void 0) {
    S("colour resolution:", e, "domain:", "undefined", "matched role:", "none", "resolved:", void 0);
    return;
  }
  const n = t, s = qe[n] ?? qe.generic;
  let r;
  if (n === "energy") {
    if (r = hn(e), !r) {
      S("colour resolution:", e, "domain:", n, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (n === "generic") {
    if (r = ii(e, s), !r) {
      const d = Math.abs(o ?? 0) % s.roles.length, p = s.roles[d], h = ni(p, i);
      return S("colour resolution:", e, "domain:", n, "matched role:", "none (by index)", "resolved:", h), h;
    }
  } else if (r = ii(e, s), !r) {
    const d = oi(s, i);
    return S("colour resolution:", e, "domain:", n, "matched role:", "first", "resolved:", d), d;
  }
  const a = s.roles.find((d) => d.key === r);
  if (!a)
    return oi(s, i);
  const l = ni(a, i);
  return S("colour resolution:", e, "domain:", n, "matched role:", r, "resolved:", l), l;
}
const gn = {
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
}, mn = {
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
}, bn = {
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
}, yn = {
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
    return qo(2 + e / 60, 2, 10);
  },
  describe(t) {
    return `${Math.round(t)} m³/h`;
  }
}, vn = {
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
}, so = {
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
}, si = {
  energy: gn,
  water: mn,
  network: bn,
  hvac: yn,
  gas: vn,
  generic: so
};
function W(t) {
  return t && t in si ? si[t] : so;
}
const ro = "#CCCCCC", wn = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
function wt(t) {
  return typeof t == "string" && wn.test(t.trim()) ? t.trim() : "#FFFFFF";
}
function at(t) {
  return typeof t == "string" && t.trim() !== "" ? t.trim() : void 0;
}
function fe(t, e, i, o, n, s) {
  const r = at(t.color), a = fn(i, t.id, n, s), l = r ?? a;
  let d;
  return o >= 0 ? d = at(t.color_positive) ?? l ?? e.default_color_positive : d = at(t.color_negative) ?? l ?? e.default_color_negative, wt(d);
}
function xn(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}
function ri() {
  return {
    currentDurMs: /* @__PURE__ */ new Map(),
    interpFromMs: /* @__PURE__ */ new Map(),
    interpTargetMs: /* @__PURE__ */ new Map(),
    interpStartMs: /* @__PURE__ */ new Map()
  };
}
function lt(t, e) {
  e.interpFromMs.delete(t), e.interpTargetMs.delete(t), e.interpStartMs.delete(t);
}
const $n = 50, _n = 500;
function An(t, e, i, o, n) {
  if (!i)
    return n.currentDurMs.set(t, e), lt(t, n), e;
  const s = n.currentDurMs.get(t) ?? e;
  if (Math.abs(e - s) < $n)
    return n.currentDurMs.set(t, e), lt(t, n), e;
  n.interpTargetMs.get(t) !== e && (n.interpFromMs.set(t, s), n.interpTargetMs.set(t, e), n.interpStartMs.set(t, o));
  const a = n.interpFromMs.get(t) ?? e, l = n.interpTargetMs.get(t) ?? e, d = n.interpStartMs.get(t) ?? o, p = o - d, h = Math.min(p / _n, 1), u = xn(h), f = a + (l - a) * u;
  return n.currentDurMs.set(t, f), h >= 1 ? (n.currentDurMs.set(t, l), lt(t, n), l) : f;
}
const Cn = "[FlowMe Renderer]";
function ce(...t) {
  S(Cn, ...t);
}
const B = "http://www.w3.org/2000/svg", K = "http://www.w3.org/1999/xlink";
function Sn() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const In = Sn(), kn = 2e3, Te = 3, ai = 5, ct = 2, Fn = 0.9, Pn = 5e3, Le = 20, Mn = 0.2, Oe = 0.3;
function Bn(t) {
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
function Nn(t) {
  return [
    `M 0,${-t * 2.2}`,
    `C ${t * 1.1},${-t * 1.2} ${t * 1.3},${-t * 0.2} ${t * 1.3},${t * 0.5}`,
    `C ${t * 1.3},${t * 1.4} ${t * 0.7},${t * 2} 0,${t * 2}`,
    `C ${-t * 0.7},${t * 2} ${-t * 1.3},${t * 1.4} ${-t * 1.3},${t * 0.5}`,
    `C ${-t * 1.3},${-t * 0.2} ${-t * 1.1},${-t * 1.2} 0,${-t * 2.2}`,
    "Z"
  ].join(" ");
}
const En = [8, 16, 24, 32], Rn = [0.9, 0.75, 0.6, 0.4], Dn = [0.8, 0.55, 0.35, 0.15];
class Ke {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = io(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.durInterp = ri(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptivePassAt = 0, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0, this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1, this.flowPathSyncedDirection = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.svg && this.destroy(), ce("init:", e.getBoundingClientRect(), "flows:", i.flows.length), ce("init start dims:", e.offsetWidth, e.offsetHeight), this.container = e, this.config = i, this.prefersReducedMotionFlag = no(), this.flowsById = new Map(i.flows.map((s) => [s.id, s]));
    const o = document.createElementNS(B, "svg");
    o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("preserveAspectRatio", "none"), o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.overflow = "visible", this.svg = o, e.appendChild(o), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(e), this.startFpsLoop();
    const n = await Qi(e);
    (n.width === 0 || n.height === 0) && await eo(e), ce("stable dims:", e.offsetWidth, e.offsetHeight), this.onResize(), ce("post-resize dims:", e.offsetWidth, e.offsetHeight);
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
    this.flowsById.has(e) && (this.latestValues.set(e, Ne(i)), this.applyUpdate());
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
    const i = 1e3 / (this.config?.animation?.fps ?? 60), o = (n) => {
      if (!this.svg) return;
      const s = n - this.lastFrameTime;
      if (this.sampleFrameTime(), this.runAdaptivePassIfDue(n), s >= i) {
        this.lastFrameTime = n - s % i;
        const r = this.config?.animation?.smooth_speed !== !1, a = this.durInterp.interpStartMs.size > 0;
        r && (a || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(n), this.updateTimeBasedSpacing(n);
      }
      this.rafHandle = requestAnimationFrame(o);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(o);
  }
  pause() {
    if (!this.svg) return;
    const e = this.svg;
    if (typeof e.pauseAnimations == "function")
      e.pauseAnimations();
    else
      for (const i of this.svg.querySelectorAll("animateMotion, animate, animateTransform")) {
        const o = i;
        typeof o.pauseAnimations == "function" && o.pauseAnimations();
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
        const o = i;
        typeof o.unpauseAnimations == "function" && o.unpauseAnimations();
      }
    this.rafHandle === null && this.startFpsLoop();
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.durInterp = ri(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.frameTimeSamples.length = 0, this.lastAdaptivePassAt = 0, this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear(), this.flowPathSyncedDirection.clear();
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
    const o = document.createElementNS(B, "path");
    o.setAttribute("id", `${e.pathId}-rev`), o.setAttribute("fill", "none"), i.appendChild(o), e.pathRev = o, e.pathRevId = `${e.pathId}-rev`;
  }
  /**
   * Keep motion path geometry aligned with travel direction so `rotate="auto"` matches flow.
   * Reverse waypoint order when direction &lt; 0 (single-stream); `both` uses forward + reversed paths.
   */
  syncFlowPathGeometry(e, i, o) {
    if (!this.config) return;
    const n = this.containerSize(), s = new Map(this.config.nodes.map((u) => [u.id, u])), r = s.get(e.from_node), a = s.get(e.to_node);
    if (!r || !a) return;
    const l = [r.position, ...e.waypoints, a.position], d = [a.position, ...e.waypoints.slice().reverse(), r.position], p = e.line_style ?? "corner";
    if ((e.animation?.direction ?? "auto") === "both") {
      this.ensurePathRev(i);
      const u = we(l, n, p), f = we(d, n, p);
      i.path.setAttribute("d", u), i.pathRev && i.pathRev.setAttribute("d", f);
    } else {
      i.pathRev && (i.pathRev.remove(), i.pathRev = void 0, i.pathRevId = void 0);
      const u = o >= 0 ? l : d;
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
    const i = document.createElementNS(B, "defs");
    this.svg.appendChild(i);
    const o = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const s = o.get(n.from_node), r = o.get(n.to_node);
      if (!s || !r) continue;
      const a = [s.position, ...n.waypoints, r.position], l = `flowme-path-${n.id}`, d = document.createElementNS(B, "path");
      d.setAttribute("id", l), d.setAttribute("d", we(a, e, n.line_style ?? "corner")), d.setAttribute("fill", "none"), i.appendChild(d);
      const p = document.createElementNS(B, "g");
      p.classList.add("flowme-flow-group"), p.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && p.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (p.style.display = "none");
      const h = this.config?.defaults?.line_width ?? ct, u = document.createElementNS(B, "use");
      u.classList.add("flow-line"), u.setAttributeNS(K, "href", `#${l}`), u.setAttribute("href", `#${l}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(h)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), p.appendChild(u);
      const f = {
        group: p,
        path: d,
        pathId: l,
        outline: u,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(p), this.flowNodes.set(n.id, f), ce("skeleton:", n.id, "| style=", f.style, "| line_style=", n.line_style ?? "corner (default)");
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
      const a = this.latestValues.get(o.id) ?? 0, l = this.flowPathSyncedDirection.get(o.id) ?? this.computeIntendedTravelSign(o, a);
      this.syncFlowPathGeometry(o, n, l);
    }
  }
  flushUpdates() {
    for (const [e, i] of this.latestValues)
      this.applyFlow(e, i);
  }
  applyFlow(e, i) {
    const o = this.flowsById.get(e), n = this.flowNodes.get(e);
    if (!o || !n) return;
    const s = Ne(i), r = o.animation ?? {}, a = this.animStyle(o);
    n.style !== a && (this.teardownStyle(n), n.style = a);
    const l = this.profileFor(o), d = Xe(o, l, this.config), p = Math.abs(s), h = to(s, d, { flowId: e }), u = r.shimmer === !0, f = d.zeroThresholdEnabled && d.zeroThreshold !== void 0 ? d.peak * d.zeroThreshold : Ie, g = u && p <= f && p > 0;
    if (o.visible === !1) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const b = In ? kn : Mt(s, d), v = o.speed_multiplier ?? 1;
    let m = Math.max(50, b * v);
    g && (m = m / Mn);
    const $ = this.config?.animation?.smooth_speed !== !1;
    h || (m = An(e, m, $, performance.now(), this.durInterp));
    const _ = r.direction ?? "auto", C = this.computeIntendedTravelSign(o, s);
    let k = C, E = g ? Oe : 1;
    const D = 600, N = 300;
    if ($ && _ === "auto") {
      const be = this.lastDirection.get(e), fo = this.dirChanging.get(e);
      be !== void 0 && be !== C && !fo && this.dirChanging.set(e, { startMs: performance.now(), oldDir: be, newDir: C });
      const ze = this.dirChanging.get(e);
      if (ze) {
        const V = performance.now() - ze.startMs;
        V < D ? (V < N ? (E = (g ? Oe : 1) * (1 - V / N), k = ze.oldDir) : (E = (g ? Oe : 1) * ((V - N) / N), k = ze.newDir), !u && V >= 280 && V <= 320 && (m = Math.max(m, 45e3)), u && V >= 270 && V <= 330 && (E = Math.max(E, Oe))) : (this.dirChanging.delete(e), k = C);
      }
    }
    this.lastDirection.set(e, C);
    const x = o.domain ?? this.config?.domain, R = this.config?.flows.findIndex((be) => be.id === e) ?? -1, T = fe(
      o,
      l,
      x,
      k,
      this.config?.domain_colors,
      R >= 0 ? R : 0
    ), z = this.gradientColors.get(e), H = o.value_gradient?.mode ?? "flow", le = wt(
      z && H !== "line" ? z : T
    ), et = wt(
      z && H !== "flow" ? z : T
    ), te = le;
    n.outline && n.outline.setAttribute("stroke", et), this.setGroupOpacity(n, E), this.syncFlowPathGeometry(o, n, k);
    const me = this.updateBurstState(e, p, d, l);
    switch (ce("applyFlow:", e, "style=", a, "dur=", m, "dir=", k, "color=", te), a) {
      case "dots":
        this.applyDots(n, o, l, s, m, te, k, me, h);
        break;
      case "dash":
        this.applyDash(n, o, m, te, k, me, h);
        break;
      case "arrow":
        this.applyArrows(n, o, m, te, k, me, h);
        break;
      case "trail":
        this.applyTrail(n, o, m, te, k, me, h);
        break;
      case "fluid":
        this.applyFluid(n, o, m, te, h);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, o, l, s, m, te, k, me, h);
    }
    _ === "both" && (a === "dots" || a === "arrow" || a === "trail") && S(
      "direction both:",
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
    const s = o.peak, r = this.config?.defaults?.burst_trigger_ratio ?? Fn, a = this.config?.defaults?.burst_sustain_ms ?? Pn, l = s * r;
    if (i < l)
      return this.burstActive.delete(e), this.burstEnteredAt.delete(e), 1;
    let d = this.burstEnteredAt.get(e);
    if (d === void 0 && (d = performance.now(), this.burstEnteredAt.set(e, d)), performance.now() - d < a) return 1;
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
    const o = 1e3 / (this.config.animation?.fps ?? 60), n = this.avgFrameMs(), s = n > o * 1.2, r = n < o * 0.8;
    for (const a of this.config.flows) {
      if (a.animation?.particle_count !== void 0) continue;
      const l = this.animStyle(a);
      if (l !== "dots" && l !== "trail") continue;
      const d = this.profileFor(a), p = Math.abs(this.latestValues.get(a.id) ?? 0), h = Xe(a, d, this.config), u = this.updateBurstState(a.id, p, h, d), f = Math.max(
        1,
        Math.round(d.particle_count_curve ? d.particle_count_curve(p) : Te)
      ), g = this.config.defaults?.burst_max_particles ?? Le, b = Math.min(g, Math.max(1, Math.round(f * u)));
      let v = this.adaptiveCount.get(a.id) ?? b;
      s && v > 1 ? (v -= 1, S("adaptive count:", a.id, v, "avg frame:", n)) : r && v < b && (v += 1, S("adaptive count:", a.id, v, "avg frame:", n)), this.adaptiveCount.set(a.id, Math.min(v, b));
    }
  }
  /** Resolve effective particle count, respecting explicit override and burst */
  resolveParticleCount(e, i, o, n) {
    const s = e.animation ?? {};
    if (s.particle_count !== void 0) return s.particle_count;
    const r = this.animStyle(e), a = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(o) : Te)
    ), l = Math.max(1, a), d = this.config?.defaults?.burst_max_particles ?? Le, p = Math.min(d, Math.max(1, Math.round(l * n)));
    return r === "dots" || r === "trail" ? Math.min(this.adaptiveCount.get(e.id) ?? p, p) : p;
  }
  resolveParticleRadius(e) {
    return (this.config?.defaults?.dot_radius ?? ai) * (e.animation?.particle_size ?? 1);
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
    const s = n.particle_spacing ?? "even", r = o / 1e3, a = r / i;
    switch (s) {
      case "even":
      default:
        return Array.from({ length: i }, (l, d) => -(a * d));
      case "random": {
        const l = performance.now(), d = this.randomOffsetsLastUpdate.get(e) ?? 0, p = 3e3;
        let h = this.randomOffsets.get(e);
        if (!h || h.length !== i || l - d > p) {
          const u = a * 0.1, f = [];
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
          this.randomOffsets.set(e, f), this.randomOffsetsLastUpdate.set(e, l), h = f;
        }
        return h;
      }
      case "clustered": {
        const l = Math.max(1, Math.round(n.cluster_size ?? 3)), d = n.cluster_gap ?? 3, p = a * 0.3, h = [];
        let u = 0;
        for (let f = 0; f < i; f++) {
          const g = f % l;
          f > 0 && g === 0 && (u += p * l * d), h.push(-(u % r)), u += p;
        }
        return h;
      }
      case "pulse": {
        const l = 1 / Math.max(0.01, n.pulse_frequency ?? 1.5), d = n.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % l < l * d ? Array.from({ length: i }, (u, f) => -(a * 0.1 * f)) : Array.from({ length: i }, (u, f) => -(a * f));
      }
      case "wave_spacing": {
        const l = n.wave_frequency ?? 2, d = n.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (p, h) => {
          const u = h / i * Math.PI * 2 * l, f = Math.sin(u) * d * (r / 2);
          return -(a * h + f);
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
  updateLateralWaves(e) {
    if (this.config)
      for (const i of this.config.flows) {
        if ((i.animation?.particle_spacing ?? "even") !== "wave_lateral") continue;
        const o = this.flowNodes.get(i.id);
        if (!o || o.particles.length === 0) continue;
        const n = i.animation?.wave_frequency ?? 2, s = i.animation?.wave_amplitude ?? 20, r = o.particles.length, a = Math.PI * 2 / r, l = e * n * 2e-3 % (Math.PI * 2);
        for (let d = 0; d < r; d++) {
          const p = o.particles[d];
          if (!p) continue;
          const h = l + d * a, u = Math.sin(h) * s;
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
        const s = n.particles.length, a = (this.durInterp.currentDurMs.get(i.id) ?? 2e3) / 1e3, l = i.animation ?? {}, d = [];
        if (o === "wave_spacing") {
          const u = l.wave_frequency ?? 2, f = Math.min(l.wave_amplitude ?? 0.85, 0.95), g = e * 1e-3 / a, b = [];
          for (let v = 0; v < s; v++) {
            const m = (v / s + g) % 1, $ = Math.sin(m * Math.PI * 2 * u) * f * (1 / s);
            b.push(((m + $) % 1 + 1) % 1);
          }
          b.sort((v, m) => v - m), d.push(...b);
        } else {
          const u = l.pulse_frequency ?? 1.5, f = l.pulse_ratio ?? 0.25, g = e * u * 1e-3 % 1, b = e * 1e-3 / a % 1, v = 1 / s;
          let m;
          g < f ? m = 1 - (1 - g / f) * 0.9 : m = (g - f) / (1 - f);
          for (let $ = 0; $ < s; $++)
            d.push(((b + $ * v * m) % 1 + 1) % 1);
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
            const b = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            b.setAttribute("data-js-driven", "1"), b.setAttribute("begin", "indefinite"), b.setAttribute("dur", "1s"), f.animateMotion.replaceWith(b), f.animateMotion = b, f.shape.appendChild(b);
          }
          const g = d[u] ?? 0;
          if (h > 0 && p)
            try {
              const b = p.getPointAtLength(g * h), v = this.particleKind(f), m = Math.max(0.5, h * 0.01), $ = p.getPointAtLength(Math.max(0, g * h - m)), _ = p.getPointAtLength(Math.min(h, g * h + m)), C = Math.atan2(_.y - $.y, _.x - $.x) * (180 / Math.PI), k = this.particleTangentRotationDegrees(v, C);
              f.shape.setAttribute(
                "transform",
                k === 0 ? `translate(${b.x.toFixed(2)},${b.y.toFixed(2)})` : `translate(${b.x.toFixed(2)},${b.y.toFixed(2)}) rotate(${k.toFixed(1)})`
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
  applyDots(e, i, o, n, s, r, a, l, d = !1) {
    const p = i.animation?.direction ?? "auto", h = d ? 0 : this.resolveParticleCount(i, o, n, l), u = i.animation?.particle_shape ?? "circle", f = i.animation?.flicker === !0;
    if (e.particles.length !== h || e.particles[0] && this.particleKind(e.particles[0]) !== u) {
      for (const C of e.particles) C.shape.remove();
      e.particles = [];
      for (let C = 0; C < h; C++)
        e.particles.push(this.makeParticle(e, u, r, i, o));
    }
    if (p === "both") {
      if (!e.particlesBack || e.particlesBack.length !== h) {
        if (e.particlesBack) for (const C of e.particlesBack) C.shape.remove();
        e.particlesBack = [];
        for (let C = 0; C < h; C++)
          e.particlesBack.push(this.makeParticle(e, u, r, i, o));
      }
    } else if (e.particlesBack) {
      for (const C of e.particlesBack) C.shape.remove();
      e.particlesBack = void 0;
    }
    const g = `${(s / 1e3).toFixed(3)}s`, b = s / 1e3, v = p === "both" ? b / 2 : 0, m = i.animation ?? {}, $ = this.resolveParticleBegins(i.id, h, s, m), _ = (C, k, E) => {
      for (let D = 0; D < C.length; D++) {
        const N = C[D];
        this.updateParticleColor(N, r, i, o, f);
        const x = document.createElementNS(B, "animateMotion");
        x.setAttribute("repeatCount", "indefinite"), x.setAttribute("dur", g), x.setAttribute("rotate", this.particleMotionRotateAttr(u)), x.setAttribute("begin", `${(($[D] ?? 0) + E).toFixed(3)}s`);
        const R = document.createElementNS(B, "mpath"), T = this.motionPathRef(e, i, k);
        R.setAttributeNS(K, "href", `#${T}`), R.setAttribute("href", `#${T}`), x.appendChild(R), N.animateMotion.replaceWith(x), N.animateMotion = x, N.shape.appendChild(x);
      }
    };
    _(e.particles, a, 0), e.particlesBack && _(e.particlesBack, -a, v);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(e, i, o, n, s, r, a = !1) {
    for (const m of e.particles) m.shape.remove();
    if (e.particles = [], !e.lineStroke) {
      const m = document.createElementNS(B, "use");
      m.setAttributeNS(K, "href", `#${e.pathId}`), m.setAttribute("href", `#${e.pathId}`), m.setAttribute("fill", "none"), m.setAttribute("stroke-linecap", "round"), m.setAttribute("stroke-linejoin", "round"), e.group.appendChild(m), e.lineStroke = m;
    }
    const l = this.config?.defaults?.line_width ?? ct, p = (i.animation ?? {}).dash_gap ?? 0.5, h = Math.max(0.1, p / r), u = 14, f = u * h, g = this.glowFilter(i, this.profileFor(i), n);
    e.lineStroke.setAttribute("stroke", n), e.lineStroke.setAttribute("stroke-width", String(l * 2)), e.lineStroke.setAttribute("stroke-dasharray", `${u} ${f}`), g && e.lineStroke.setAttribute("filter", g);
    const b = u + f, v = e.lineStroke.querySelector("animate");
    if (v && v.remove(), !a) {
      const m = document.createElementNS(B, "animate");
      m.setAttribute("attributeName", "stroke-dashoffset"), m.setAttribute("from", s > 0 ? "0" : `-${b}`), m.setAttribute("to", s > 0 ? `-${b}` : "0"), m.setAttribute("dur", `${(o / 1e3).toFixed(3)}s`), m.setAttribute("repeatCount", "indefinite"), e.lineStroke.appendChild(m);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(e, i, o, n, s, r, a = !1) {
    const l = this.profileFor(i), d = i.animation?.particle_count ?? Te, p = this.config?.defaults?.burst_max_particles ?? Le, h = a ? 0 : Math.min(p, Math.max(1, Math.round(d * r))), u = i.animation?.flicker === !0, f = i.animation?.direction ?? "auto";
    if (e.particles.length !== h) {
      for (const _ of e.particles) _.shape.remove();
      e.particles = [];
      for (let _ = 0; _ < h; _++)
        e.particles.push(this.makeParticle(e, "arrow", n, i, l));
    }
    if (f === "both") {
      if (!e.particlesBack || e.particlesBack.length !== h) {
        if (e.particlesBack) for (const _ of e.particlesBack) _.shape.remove();
        e.particlesBack = [];
        for (let _ = 0; _ < h; _++)
          e.particlesBack.push(this.makeParticle(e, "arrow", n, i, l));
      }
    } else if (e.particlesBack) {
      for (const _ of e.particlesBack) _.shape.remove();
      e.particlesBack = void 0;
    }
    const g = `${(o / 1e3).toFixed(3)}s`, b = o / 1e3, v = f === "both" ? b / 2 : 0, m = this.resolveParticleBegins(i.id, h, o, i.animation ?? {}), $ = (_, C, k) => {
      for (let E = 0; E < _.length; E++) {
        const D = _[E];
        this.updateParticleColor(D, n, i, l, u);
        const N = document.createElementNS(B, "animateMotion");
        N.setAttribute("repeatCount", "indefinite"), N.setAttribute("dur", g), N.setAttribute("rotate", this.particleMotionRotateAttr("arrow")), N.setAttribute("begin", `${((m[E] ?? 0) + k).toFixed(3)}s`);
        const x = document.createElementNS(B, "mpath"), R = this.motionPathRef(e, i, C);
        x.setAttributeNS(K, "href", `#${R}`), x.setAttribute("href", `#${R}`), N.appendChild(x), D.animateMotion.replaceWith(N), D.animateMotion = N, D.shape.appendChild(N);
      }
    };
    $(e.particles, s, 0), e.particlesBack && $(e.particlesBack, -s, v);
  }
  /**
   * trail — head uses particle_shape; four tail segments follow along path with staggered begins.
   */
  applyTrail(e, i, o, n, s, r, a = !1) {
    const l = this.profileFor(i), d = i.animation?.particle_count ?? Te, p = this.config?.defaults?.burst_max_particles ?? Le, h = a ? 0 : Math.min(p, Math.max(1, Math.round(d * r)));
    if (a) {
      for (const x of e.particles) x.shape.remove();
      if (e.particles = [], e.particlesBack) {
        for (const x of e.particlesBack) x.shape.remove();
        e.particlesBack = void 0;
      }
      return;
    }
    const u = i.animation?.flicker === !0, f = i.animation?.particle_shape ?? "circle", g = this.particleMotionRotateAttr(f), v = (i.animation?.direction ?? "auto") === "both";
    if (e.particles.length === h && e.particles[0]?.shape.hasAttribute("data-trail-pack") && e.particles[0]?.shape.getAttribute("data-head-kind") === f && (!v || e.particlesBack?.length === h && e.particlesBack[0]?.shape.hasAttribute("data-trail-pack") && e.particlesBack[0]?.shape.getAttribute("data-head-kind") === f)) {
      if (!v && e.particlesBack) {
        for (const x of e.particlesBack) x.shape.remove();
        e.particlesBack = void 0;
      }
    } else {
      for (const x of e.particles) x.shape.remove();
      if (e.particles = [], e.particlesBack) {
        for (const x of e.particlesBack) x.shape.remove();
        e.particlesBack = void 0;
      }
      for (let x = 0; x < h; x++)
        e.particles.push(this.makeTrailParticle(e, i, l, n, f));
      if (v) {
        e.particlesBack = [];
        for (let x = 0; x < h; x++)
          e.particlesBack.push(this.makeTrailParticle(e, i, l, n, f));
      }
    }
    const $ = `${(o / 1e3).toFixed(3)}s`, _ = o / 1e3, C = v ? _ / 2 : 0, k = this.resolveParticleBegins(i.id, h, o, i.animation ?? {});
    let E = 100;
    try {
      E = Math.max(1, e.path.getTotalLength());
    } catch {
      E = 100;
    }
    const D = (x, R, T) => {
      const z = document.createElementNS(B, "animateMotion");
      z.setAttribute("repeatCount", "indefinite"), z.setAttribute("dur", $), z.setAttribute("rotate", g), z.setAttribute("begin", `${R.toFixed(4)}s`);
      const H = document.createElementNS(B, "mpath"), le = this.motionPathRef(e, i, T);
      return H.setAttributeNS(K, "href", `#${le}`), H.setAttribute("href", `#${le}`), z.appendChild(H), x.replaceWith(z), z;
    }, N = (x, R, T) => {
      this.updateParticleColor(x, n, i, l, u);
      const z = x.trailMotions;
      if (z && z.length === 4)
        for (let H = 0; H < 4; H++) {
          const le = En[H], et = R + le / E * _;
          z[H] = D(z[H], et, T);
        }
      x.animateMotion = D(x.animateMotion, R, T);
    };
    for (let x = 0; x < e.particles.length; x++) {
      const R = e.particles[x];
      N(R, k[x] ?? 0, s);
    }
    if (e.particlesBack)
      for (let x = 0; x < e.particlesBack.length; x++) {
        const R = e.particlesBack[x];
        N(R, (k[x] ?? 0) + C, -s);
      }
  }
  /**
   * fluid — animated linear gradient along full path (v1.23.1).
   */
  applyFluid(e, i, o, n, s = !1) {
    for (const x of e.particles) x.shape.remove();
    if (e.particles = [], !this.svg) return;
    const r = this.svg.querySelector("defs");
    if (!r) return;
    const a = new Map(this.config.nodes.map((x) => [x.id, x])), l = a.get(i.from_node), d = a.get(i.to_node);
    if (!l || !d) return;
    if (!e.lineStroke) {
      const x = document.createElementNS(B, "use");
      x.setAttributeNS(K, "href", `#${e.pathId}`), x.setAttribute("href", `#${e.pathId}`), x.setAttribute("fill", "none"), x.setAttribute("stroke-linecap", "round"), x.setAttribute("stroke-linejoin", "round"), e.group.appendChild(x), e.lineStroke = x;
    }
    const h = `fluid-grad-${i.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    let u = this.svg.getElementById(h);
    u || (u = document.createElementNS(B, "linearGradient"), u.setAttribute("id", h), r.appendChild(u)), e.fluidGradient = u;
    const f = e.path;
    let g = 100;
    try {
      g = Math.max(1, f.getTotalLength());
    } catch {
      g = 100;
    }
    let b = { x: 0, y: 0 }, v = { x: 0, y: 0 };
    try {
      const x = f.getPointAtLength(0), R = f.getPointAtLength(g);
      b = { x: x.x, y: x.y }, v = { x: R.x, y: R.y };
    } catch {
      const x = this.containerSize();
      b = Be(l.position, x), v = Be(d.position, x);
    }
    const m = v.x - b.x, $ = v.y - b.y, _ = Math.hypot(m, $) || 1, C = m / _, k = $ / _;
    for (u.setAttribute("gradientUnits", "userSpaceOnUse"), u.setAttribute("x1", String(b.x)), u.setAttribute("y1", String(b.y)), u.setAttribute("x2", String(b.x + C * 2 * g)), u.setAttribute("y2", String(b.y + k * 2 * g)); u.firstChild; ) u.firstChild.remove();
    const E = [
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
    for (const [x, R] of E) {
      const T = document.createElementNS(B, "stop");
      T.setAttribute("offset", x), T.setAttribute("stop-color", n), T.setAttribute("stop-opacity", R), u.appendChild(T);
    }
    if (!s) {
      const x = document.createElementNS(B, "animateTransform");
      x.setAttribute("attributeName", "gradientTransform"), x.setAttribute("type", "translate"), x.setAttribute("additive", "replace"), x.setAttribute("calcMode", "linear"), x.setAttribute("dur", `${Math.max(1, Math.round(o))}ms`), x.setAttribute("repeatCount", "indefinite");
      const R = C * g, T = k * g;
      x.setAttribute("from", `${-R} ${-T}`), x.setAttribute("to", "0 0"), u.appendChild(x);
    }
    const D = (this.config?.defaults?.line_width ?? ct) * 3, N = this.glowFilter(i, this.profileFor(i), n);
    if (e.lineStroke.setAttribute("stroke", `url(#${h})`), e.lineStroke.setAttribute("stroke-width", String(D)), e.lineStroke.removeAttribute("stroke-dasharray"), N && e.lineStroke.setAttribute("filter", N), !e.fluidInitialised) {
      e.fluidInitialised = !0, e.lineStroke.setAttribute("opacity", "0");
      const x = document.createElementNS(B, "animate");
      x.setAttribute("attributeName", "opacity"), x.setAttribute("values", "0;1"), x.setAttribute("dur", "600ms"), x.setAttribute("fill", "freeze"), e.lineStroke.appendChild(x);
    }
  }
  makeTrailParticle(e, i, o, n, s) {
    const r = this.resolveParticleRadius(i), a = this.resolveGlow(i, o), l = s === "custom_svg" ? "circle" : s, d = document.createElementNS(B, "g");
    d.setAttribute("data-trail-pack", "1"), d.setAttribute("data-head-kind", s);
    const p = [], h = [], u = this.particleMotionRotateAttr(s);
    for (let m = 0; m < 4; m++) {
      const $ = document.createElementNS(B, "g"), { shape: _ } = this.buildParticleShapeOnly(e, l, r * Rn[m], n, i);
      a && _.setAttribute("filter", this.glowFilter(i, o, n)), _.setAttribute("opacity", String(Dn[m])), $.appendChild(_);
      const C = document.createElementNS(B, "animateMotion");
      C.setAttribute("repeatCount", "indefinite"), C.setAttribute("dur", "2s"), C.setAttribute("rotate", u);
      const k = document.createElementNS(B, "mpath");
      k.setAttributeNS(K, "href", `#${e.pathId}`), k.setAttribute("href", `#${e.pathId}`), C.appendChild(k), $.appendChild(C), h.push($), p.push(C);
    }
    for (let m = 3; m >= 0; m--) d.appendChild(h[m]);
    const f = document.createElementNS(B, "g");
    let g;
    s === "custom_svg" ? g = this.buildParticleShapeOnly(e, s, r, n, i, f).shape : (g = this.buildParticleShapeOnly(e, s, r, n, i).shape, f.appendChild(g)), a && g.setAttribute("filter", this.glowFilter(i, o, n));
    const b = document.createElementNS(B, "animateMotion");
    b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", "2s"), b.setAttribute("rotate", u);
    const v = document.createElementNS(B, "mpath");
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
  buildParticleShapeOnly(e, i, o, n, s, r) {
    let a, l = !1;
    switch (i) {
      case "square": {
        const d = o * 2, p = document.createElementNS(B, "rect");
        p.setAttribute("width", String(d)), p.setAttribute("height", String(d)), p.setAttribute("x", String(-d / 2)), p.setAttribute("y", String(-d / 2)), p.setAttribute("rx", "1.5"), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), a = p;
        break;
      }
      case "arrow": {
        const d = this.config?.defaults?.dot_radius ?? ai, p = s.animation?.particle_size ?? 1, h = d * p / 10, u = document.createElementNS(B, "path");
        u.setAttribute("d", Bn(h)), u.setAttribute("fill", n), u.setAttribute("opacity", "0"), u.setAttribute("data-kind", "arrow"), a = u;
        break;
      }
      case "teardrop": {
        const d = document.createElementNS(B, "path");
        d.setAttribute("d", Nn(o)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), d.setAttribute("data-kind", "teardrop"), a = d;
        break;
      }
      case "diamond": {
        const d = o * 1.4, p = document.createElementNS(B, "polygon");
        p.setAttribute("points", `0,${-d} ${d},0 0,${d} ${-d},0`), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "diamond"), a = p;
        break;
      }
      case "custom_svg": {
        const d = s.animation?.custom_svg_path ?? "";
        if (!d) {
          S(`particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${s.id}`);
          const u = document.createElementNS(B, "circle");
          u.setAttribute("r", String(o)), u.setAttribute("fill", n), u.setAttribute("opacity", "0"), a = u;
          break;
        }
        const p = document.createElementNS(B, "path");
        p.setAttribute("d", d), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "custom_svg"), (r ?? e.group).appendChild(p), l = !0;
        try {
          const u = p.getBBox(), f = Math.max(u.width, u.height, 1), b = o * 2 / f, v = -(u.x + u.width / 2), m = -(u.y + u.height / 2);
          p.setAttribute("transform", `scale(${b.toFixed(4)}) translate(${v.toFixed(4)},${m.toFixed(4)})`);
        } catch {
        }
        a = p;
        break;
      }
      default: {
        const d = document.createElementNS(B, "circle");
        d.setAttribute("r", String(o)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), a = d;
      }
    }
    return { shape: a, alreadyAppended: l };
  }
  makeParticle(e, i, o, n, s) {
    const r = this.resolveParticleRadius(n), a = this.resolveGlow(n, s), { shape: l, alreadyAppended: d } = this.buildParticleShapeOnly(e, i, r, o, n);
    a && (l.setAttribute("filter", this.glowFilter(n, s, o)), l.style.color = o);
    const p = document.createElementNS(B, "animateMotion");
    p.setAttribute("repeatCount", "indefinite"), p.setAttribute("dur", "2s"), p.setAttribute("rotate", this.particleMotionRotateAttr(i));
    const h = document.createElementNS(B, "mpath");
    return h.setAttributeNS(K, "href", `#${e.pathId}`), h.setAttribute("href", `#${e.pathId}`), p.appendChild(h), l.appendChild(p), d || e.group.appendChild(l), { shape: l, animateMotion: p };
  }
  updateParticleColor(e, i, o, n, s) {
    if (e.shape.hasAttribute("data-trail-pack") ? e.shape.querySelectorAll("path, circle, rect, ellipse, polygon").forEach((l) => {
      l.setAttribute("fill", i);
    }) : e.shape.setAttribute("fill", i), e.shape.style.color = i, this.resolveGlow(o, n) && e.shape.setAttribute("filter", this.glowFilter(o, n, i)), e.shape.hasAttribute("data-trail-pack") || e.shape.setAttribute("opacity", "1"), s && !e.shape.hasAttribute("data-trail-pack")) {
      if (!e.flickerAnim) {
        const u = document.createElementNS(B, "animate");
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
    return fe(e, i, o, 1, this.config?.domain_colors, n >= 0 ? n : 0);
  }
}
const zn = `/* eslint-disable no-undef */
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
`, li = "flowme-keyframes", xt = "flowme-cycle", Tn = 5, Ln = 2;
let oe = null, ci = !1;
function On() {
  if (document.getElementById(li)) return;
  const t = document.createElement("style");
  t.id = li, t.textContent = `@keyframes ${xt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(t);
}
function Hn() {
  if (ci) return;
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
  ci = !0;
}
async function Gn() {
  if (oe) return oe;
  const t = CSS.paintWorklet;
  if (!t)
    return oe = Promise.reject(new Error("paintWorklet not available")), oe;
  const e = new Blob([zn], { type: "application/javascript" }), i = URL.createObjectURL(e);
  return oe = t.addModule(i).catch((o) => {
    throw oe = null, o;
  }).finally(() => {
  }), oe;
}
class Wn {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = io(() => this.flushUpdates(), 120), this.lastDurMsByFlow = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.container = e, S("Houdini init start dims:", e.offsetWidth, e.offsetHeight), this.config = i, this.flowsById = new Map(i.flows.map((s) => [s.id, s])), On(), Hn(), await Gn();
    const o = document.createElement("div");
    o.className = "flow-houdini flow-houdini-root", o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", e.appendChild(o), this.wrapper = o;
    for (const s of i.flows) {
      const r = document.createElement("div");
      r.className = "flow-houdini", r.dataset.flowId = s.id, r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.background = "paint(flowme-painter)", r.style.setProperty("--flowme-dur", "2000"), r.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)", r.style.animation = `${xt} calc(var(--flowme-dur) * 1ms) linear infinite`, r.style.opacity = "0", o.appendChild(r), this.flowDivs.set(s.id, { el: r });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(e);
    const n = await Qi(e);
    (n.width === 0 || n.height === 0) && await eo(e), S("Houdini stable dims:", e.offsetWidth, e.offsetHeight), this.rebuildPaths(), S("Houdini post-resize dims:", e.offsetWidth, e.offsetHeight);
  }
  applyConfig(e) {
    this.config = e, this.flowsById = new Map(e.flows.map((i) => [i.id, i])), this.rebuildPaths();
  }
  updateFlow(e, i) {
    this.flowsById.has(e) && (this.latestValues.set(e, Ne(i)), this.applyUpdate());
  }
  setFlowAriaLabel(e, i) {
    const o = this.flowDivs.get(e);
    o && (o.el.setAttribute("role", "img"), o.el.setAttribute("aria-label", i));
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
    const e = this.containerSize(), i = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const n = this.flowDivs.get(o.id);
      if (!n) continue;
      const s = i.get(o.from_node), r = i.get(o.to_node);
      if (!s || !r) continue;
      const d = [s.position, ...o.waypoints, r.position].map((p) => Be(p, e)).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
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
    const s = Ne(i), r = this.profileFor(o), a = Xe(o, r, this.config), l = to(s, a, { flowId: e });
    if (o.visible === !1) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = o.speed_multiplier ?? 1, p = l ? 1e9 : Math.max(
      50,
      Mt(s, a) * d
    ), h = o.animation?.direction ?? "auto";
    let u;
    h === "forward" ? u = 1 : h === "reverse" ? u = -1 : h === "both" ? u = 1 : u = s >= 0 ? 1 : -1;
    const f = o.domain ?? this.config?.domain, g = this.config?.flows.findIndex((k) => k.id === o.id) ?? -1, b = fe(
      o,
      r,
      f,
      u,
      this.config?.domain_colors,
      g >= 0 ? g : 0
    ), v = l ? 0 : Math.max(
      1,
      Math.round(r.particle_count_curve ? r.particle_count_curve(s) : 3)
    ), m = r.wave_amplitude_curve ? r.wave_amplitude_curve(s) : 4, $ = n.el.style;
    $.setProperty("--flowme-shape", r.shape), $.setProperty("--flowme-color", b), $.setProperty("--flowme-glow", r.glow ? "1" : "0"), $.setProperty("--flowme-count", String(v)), $.setProperty("--flowme-radius", String(Tn)), $.setProperty("--flowme-line", String(Ln)), $.setProperty("--flowme-amp", String(m)), $.setProperty("--flowme-direction", String(u));
    const _ = this.lastDurMsByFlow.get(e) ?? p, C = Math.round(p);
    if (Math.abs(p - _) < 50) {
      $.transition = "none", $.setProperty("--flowme-dur", String(C));
      const k = n.el;
      requestAnimationFrame(() => {
        k.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)";
      });
    } else
      $.setProperty("--flowme-dur", String(C));
    this.lastDurMsByFlow.set(e, p), $.animation = l ? "none" : `${xt} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }
  profileFor(e) {
    return W(e.domain ?? this.config?.domain);
  }
}
function Un() {
  const t = jn(), e = t ?? "svg", i = Kn(), o = no();
  return S(
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
  ), o ? new Ke() : e === "houdini" ? i ? new Wn() : (S("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Ke()) : new Ke();
}
function Kn() {
  try {
    const t = CSS;
    return "paintWorklet" in t && "registerProperty" in t;
  } catch {
    return !1;
  }
}
function jn() {
  try {
    const e = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (e === "svg" || e === "houdini") return e;
  } catch {
  }
  return null;
}
function di(t) {
  const e = t.size?.width ?? 20, i = t.size?.height ?? 15;
  return `left: ${t.position.x}%; top: ${t.position.y}%; width: ${e}%; height: ${i}%;`;
}
function Vn(t, e, i) {
  S(
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
  return t._migration_warning ? y`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${t.id}
        style=${di(t) + s}
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
      style=${di(t) + s}
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
    ${A}
  `;
}
let dt = null, de = null;
async function Yn() {
  if (dt) return dt;
  if (de) return de;
  const e = window.loadCardHelpers;
  return typeof e != "function" ? null : (de = e().then((i) => (dt = i, de = null, i)).catch((i) => {
    throw de = null, i;
  }), de);
}
async function Zn(t) {
  const e = await Yn();
  return e ? e.createCardElement(t) : null;
}
var Xn = Object.defineProperty, qn = Object.getOwnPropertyDescriptor, Qe = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? qn(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && Xn(e, i, n), n;
};
let ge = class extends re {
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
        Zo(t);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, Zn(t).then((i) => {
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
ge.styles = St`
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
Qe([
  De({ attribute: !1 })
], ge.prototype, "hass", 2);
Qe([
  De({ attribute: !1 })
], ge.prototype, "card", 2);
Qe([
  F()
], ge.prototype, "errorMessage", 2);
ge = Qe([
  Ft("flowme-custom-overlay")
], ge);
const G = "http://www.w3.org/2000/svg";
function He(t, e) {
  if (!t || !e) return null;
  const i = t.states[e];
  return !i || i.state === "unavailable" || i.state === "unknown" ? null : xe(i.state);
}
function Jn(t, e) {
  const i = e.domain, o = W(i);
  if (t.color) return t.color;
  const n = e.flows.filter((r) => r.from_node === t.id || r.to_node === t.id);
  if (n.length === 0) return o.default_color_positive;
  const s = /* @__PURE__ */ new Set();
  for (const r of n) {
    const a = e.flows.findIndex((p) => p.id === r.id), l = W(r.domain ?? i), d = fe(r, l, r.domain ?? i, 1, e.domain_colors, a >= 0 ? a : 0);
    s.add(d);
  }
  return s.size === 1 ? [...s][0] : ro;
}
function Qn(t) {
  const e = t.getBoundingClientRect();
  return { widthPx: Math.max(1, e.width), heightPx: Math.max(1, e.height) };
}
function Rt(t) {
  return {
    vbW: t.viewBoxUserWidth ?? 100,
    vbH: t.viewBoxUserHeight ?? 100
  };
}
function ve(t, e) {
  const { vbW: i, vbH: o } = Rt(e), n = i / e.widthPx, s = o / e.heightPx;
  return Math.min(t * n, t * s);
}
function pi(t, e) {
  const { vbW: i, vbH: o } = Rt(e);
  return Math.max(0.04, t * Math.min(i / e.widthPx, o / e.heightPx));
}
function ui(t, e) {
  const { vbW: i, vbH: o } = Rt(e);
  return {
    cx: t.x / 100 * i,
    cy: t.y / 100 * o
  };
}
function es(t) {
  return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
class ao {
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
    let a = r.querySelector(":scope > g.node-effects-ripples");
    a || (a = document.createElementNS(G, "g"), a.classList.add("node-effects-ripples"), r.insertBefore(a, r.firstChild));
    let l = r.querySelector(":scope > g.node-effects-sync");
    for (l || (l = document.createElementNS(G, "g"), l.classList.add("node-effects-sync"), r.appendChild(l)); l.firstChild; ) l.firstChild.remove();
    const d = new Set(i.nodes.map((u) => u.id));
    for (const u of [...this.rippleLastRaw.keys()])
      d.has(u) || (this.cancelRippleBurst(u, a), this.rippleLastRaw.delete(u));
    for (const u of [...this.rippleBurstGen.keys()])
      d.has(u) || this.cancelRippleBurst(u, a);
    const p = s?.getLayoutMetrics?.(e) ?? Qn(e), h = i.defaults?.node_radius ?? 12;
    if (Ji() && n - this.lastDiagnosticLogMs > 4e3) {
      this.lastDiagnosticLogMs = n;
      for (const u of i.nodes) {
        if (!u.node_effect?.type || !u.entity) continue;
        const f = o?.states[u.entity];
        S(
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
      const g = u.size ?? h, b = ve(g, p), { cx: v, cy: m } = ui(u.position, p), $ = Jn(u, i), _ = document.createElementNS(G, "g");
      switch (_.classList.add("node-effect"), _.setAttribute("data-node", u.id), f.type) {
        case "glow":
          this.appendGlow(_, u, f, o, u.entity, $, g, s, p);
          break;
        case "badge":
          this.appendBadge(_, f, o, u.entity, $, u.id, v, m, g, p, s);
          break;
        case "ripple":
          this.updateRipple(a, u, f, o, $, g, v, m, p);
          continue;
        case "alert":
          this.appendAlert(_, f, o, u.entity, $, u.id, v, m, b, n, s);
          break;
      }
      _.childNodes.length > 0 && l.appendChild(_);
    }
  }
  appendGlow(e, i, o, n, s, r, a, l, d) {
    const p = He(n, s), h = o.peak_value ?? 1e4, u = o.glow_max_radius ?? 20, f = Math.max(0, Math.min(1, o.glow_min_intensity ?? 0.1)), g = o.glow_color || r, b = p === null ? 0 : Math.abs(p) / h, v = Math.max(f, Math.min(1, b)), m = 4 + v * u, $ = 0.2 + v * 0.6;
    if (l?.setNodeDotFilter) {
      l.setNodeDotFilter(i.id, `drop-shadow(0 0 ${m.toFixed(1)}px ${g})`);
      return;
    }
    const { cx: _, cy: C } = ui(i.position, d), k = document.createElementNS(G, "circle");
    k.setAttribute("cx", String(_)), k.setAttribute("cy", String(C)), k.setAttribute("r", String(ve(a, d))), k.setAttribute("fill", "none"), k.setAttribute("stroke", g), k.setAttribute("stroke-width", String(pi(2, d))), k.setAttribute("opacity", String($)), k.setAttribute(
      "style",
      `filter: drop-shadow(0 0 ${m.toFixed(1)}px ${g}); transition: filter 500ms ease, opacity 500ms ease`
    ), e.appendChild(k);
  }
  cancelRippleBurst(e, i) {
    const o = this.ripplePendingTimeouts.get(e);
    if (o) {
      for (const n of o) window.clearTimeout(n);
      this.ripplePendingTimeouts.delete(e);
    }
    if (i) {
      const n = `[data-ripple-owner="${es(e)}"]`;
      i.querySelectorAll(n).forEach((s) => s.remove());
    }
    this.rippleBurstGen.set(e, (this.rippleBurstGen.get(e) ?? 0) + 1);
  }
  scheduleRippleBurst(e, i, o, n, s, r, a, l) {
    this.cancelRippleBurst(e, i);
    const d = this.rippleBurstGen.get(e), p = 300, h = [];
    for (let u = 0; u < 3; u++)
      h.push(
        window.setTimeout(() => {
          this.rippleBurstGen.get(e) === d && this.spawnRippleRing(i, e, o, n, s, r, a, l);
        }, u * p)
      );
    this.ripplePendingTimeouts.set(e, h);
  }
  spawnRippleRing(e, i, o, n, s, r, a, l) {
    const d = ve(s + 2, l), p = ve(s * 4, l), h = pi(2, l), u = document.createElementNS(G, "g");
    u.setAttribute("data-ripple-owner", i);
    const f = document.createElementNS(G, "circle");
    f.setAttribute("cx", String(o)), f.setAttribute("cy", String(n)), f.setAttribute("r", String(d)), f.setAttribute("fill", "none"), f.setAttribute("stroke", a), f.setAttribute("stroke-width", String(h)), f.setAttribute("opacity", "0.7");
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
  updateRipple(e, i, o, n, s, r, a, l, d) {
    const p = He(n, i.entity), h = o.ripple_threshold ?? 0;
    if (p === null || Math.abs(p) <= h) {
      this.cancelRippleBurst(i.id, e), this.rippleLastRaw.delete(i.id);
      return;
    }
    if (this.rippleLastRaw.get(i.id) === p) return;
    this.rippleLastRaw.set(i.id, p);
    const f = o.ripple_duration ?? 2e3, g = o.ripple_color || s;
    this.scheduleRippleBurst(i.id, e, a, l, r, f, g, d);
  }
  appendBadge(e, i, o, n, s, r, a, l, d, p, h) {
    const u = i.badge_color_on ?? "#32DC50", f = i.badge_color_off ?? "#CC3333", g = o?.states[n];
    let b = "#888888";
    if (g)
      if (g.state === "unavailable" || g.state === "unknown") b = "#888888";
      else if (i.threshold !== void 0 && i.threshold !== null) {
        const C = He(o, n);
        b = C !== null && C >= i.threshold ? u : f;
      } else {
        const C = String(g.state).toLowerCase();
        b = C === "on" || C === "open" || C === "true" ? u : f;
      }
    if (h?.setNodeDotBackground) {
      h.setNodeDotBackground(r, b, { transitionMs: 300 });
      return;
    }
    const v = ve(d * 0.6, p), m = a + Math.min(v * 1.1, 3), $ = l - Math.min(v * 1.1, 3), _ = document.createElementNS(G, "circle");
    _.setAttribute("cx", String(m)), _.setAttribute("cy", String($)), _.setAttribute("r", String(v)), _.setAttribute("fill", b), _.setAttribute("stroke", "#ffffff"), _.setAttribute("stroke-width", String(0.03)), e.appendChild(_);
  }
  appendAlert(e, i, o, n, s, r, a, l, d, p, h) {
    const u = He(o, n);
    if (u === null) return;
    const f = i.alert_threshold ?? 0, g = i.alert_condition ?? "above", b = i.alert_hysteresis ?? 0.05, v = Math.abs(f) * b + 1e-6;
    let m = g === "above" ? u > f : u < f;
    !m && g === "above" && u > f - v && (m = !0), !m && g === "below" && u < f + v && (m = !0);
    const $ = i.alert_frequency ?? 2, _ = i.alert_color ?? "#FF0000";
    if (!m) {
      h?.setNodeDotBackground && h.setNodeDotBackground(r, s, { transitionMs: 200 });
      return;
    }
    if (h?.setNodeDotBackground) {
      const D = 1e3 / Math.max(0.25, $), N = Math.floor(p / (D / 2)) % 2 === 0;
      h.setNodeDotBackground(r, N ? _ : s, { transitionMs: 80 });
      return;
    }
    const C = document.createElementNS(G, "circle");
    C.setAttribute("cx", String(a)), C.setAttribute("cy", String(l)), C.setAttribute("r", String(d)), C.setAttribute("fill", s), C.setAttribute("opacity", "0.85");
    const k = Math.max(100, Math.round(1e3 / Math.max(0.25, $))), E = document.createElementNS(G, "animate");
    E.setAttribute("attributeName", "fill"), E.setAttribute("values", `${s};${_};${s}`), E.setAttribute("dur", `${k}ms`), E.setAttribute("repeatCount", "indefinite"), C.appendChild(E), e.appendChild(C);
  }
}
const ts = 100;
class is {
  constructor(e) {
    this.apply = e, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(e) {
    if (e.prev !== e.next) {
      for (this.apply(e.next), this.undoStack.push(e); this.undoStack.length > ts; ) this.undoStack.shift();
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
function L(t) {
  return t < 0 ? 0 : t > 100 ? 100 : t;
}
function Ge(t, e = 8) {
  return Math.round(t / e) * e;
}
function os(t) {
  const e = new Set(t.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `node_${i}`;
    if (!e.has(o)) return o;
  }
  return `node_${Date.now()}`;
}
function ns(t) {
  const e = new Set(t.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `flow_${i}`;
    if (!e.has(o)) return o;
  }
  return `flow_${Date.now()}`;
}
function pt(t, e, i) {
  const o = I(t);
  for (const n of o.nodes)
    n.id === e && (n.position = { x: L(i.x), y: L(i.y) });
  return o;
}
function ss(t, e, i) {
  const o = I(t), n = {
    id: os(t),
    position: { x: L(e.x), y: L(e.y) },
    ...i ? { label: i } : {}
  };
  return o.nodes.push(n), { config: o, node: n };
}
function rs(t, e) {
  const i = I(t);
  return i.nodes = i.nodes.filter((o) => o.id !== e), i.flows = i.flows.filter((o) => o.from_node !== e && o.to_node !== e), i;
}
function as(t, e) {
  const i = I(t);
  for (const o of i.nodes) {
    const n = e.get(o.id);
    n && (o.position = { x: L(n.x), y: L(n.y) });
  }
  return i;
}
function ls(t, e) {
  const i = I(t);
  return i.nodes = i.nodes.filter((o) => !e.has(o.id)), i.flows = i.flows.filter((o) => !e.has(o.from_node) && !e.has(o.to_node)), i;
}
function hi(t, e, i) {
  const o = I(t);
  for (const n of o.nodes)
    e.has(n.id) && (n.visible = i);
  return o;
}
function cs(t, e, i) {
  const o = t.nodes.find((s) => s.id === i);
  if (!o) return t;
  const n = I(t);
  for (const s of n.nodes)
    e.has(s.id) && (s.position = { ...s.position, y: o.position.y });
  return n;
}
function ds(t, e, i) {
  const o = t.nodes.find((s) => s.id === i);
  if (!o) return t;
  const n = I(t);
  for (const s of n.nodes)
    e.has(s.id) && (s.position = { ...s.position, x: o.position.x });
  return n;
}
function fi(t, e, i) {
  const o = I(t);
  for (const n of o.nodes)
    n.id === e && (i && i.length ? n.label = i : delete n.label);
  return o;
}
function ut(t, e, i, o) {
  const n = I(t);
  for (const s of n.flows)
    if (s.id === e) {
      if (i < 0 || i >= s.waypoints.length) return t;
      s.waypoints[i] = {
        x: L(o.x),
        y: L(o.y)
      };
    }
  return n;
}
function gi(t, e, i, o) {
  const n = I(t);
  for (const s of n.flows) {
    if (s.id !== e) continue;
    const r = Math.max(0, Math.min(s.waypoints.length, i));
    s.waypoints.splice(r, 0, {
      x: L(o.x),
      y: L(o.y)
    });
  }
  return n;
}
function mi(t, e, i) {
  const o = I(t);
  for (const n of o.flows)
    if (n.id === e) {
      if (i < 0 || i >= n.waypoints.length) return t;
      n.waypoints.splice(i, 1);
    }
  return o;
}
function bi(t, e, i, o) {
  const n = I(t), s = {
    id: ns(t),
    from_node: e,
    to_node: i,
    entity: o,
    waypoints: []
  };
  return n.flows.push(s), { config: n, flow: s };
}
function ps(t, e) {
  const i = I(t);
  return i.flows = i.flows.filter((o) => o.id !== e), i;
}
function yi(t, e) {
  const i = I(t);
  return i.background.default = e, i;
}
function us(t, e) {
  const i = I(t);
  return e && e.length ? i.background.weather_entity = e : delete i.background.weather_entity, i;
}
function hs(t, e) {
  const i = I(t);
  return e && e.length ? i.background.sun_entity = e : delete i.background.sun_entity, i;
}
function fs(t, e) {
  const i = I(t);
  return e === void 0 || !Number.isFinite(e) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(e)), i;
}
function vi(t, e, i) {
  const o = I(t), n = o.background.weather_states ?? {};
  return o.background.weather_states = { ...n, [e]: i }, o;
}
function gs(t) {
  const e = I(t), i = e.background.weather_states ?? {};
  let o = 1;
  for (; Object.prototype.hasOwnProperty.call(i, `state_${o}`); )
    o += 1;
  const n = `state_${o}`;
  return e.background.weather_states = { ...i, [n]: "" }, e;
}
function ms(t, e) {
  const i = I(t);
  return i.background.weather_states && (delete i.background.weather_states[e], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function bs(t) {
  const e = new Set((t.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `overlay_${i}`;
    if (!e.has(o)) return o;
  }
  return `overlay_${Date.now()}`;
}
function ys(t, e) {
  const i = I(t), o = e.id ?? bs(t), n = {
    ...e,
    id: o,
    position: {
      x: L(e.position.x),
      y: L(e.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function vs(t, e) {
  const i = I(t);
  return i.overlays = (i.overlays ?? []).filter((o) => o.id !== e), i.overlays.length === 0 && delete i.overlays, i;
}
function ws(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && (n.position = { x: L(i.x), y: L(i.y) });
  return o;
}
function wi(t, e, i) {
  const o = I(t), n = Math.max(2, Math.min(100, i.width)), s = Math.max(2, Math.min(100, i.height));
  for (const r of o.overlays ?? [])
    r.id === e && (r.size = { width: n, height: s });
  return o;
}
function xs(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && i && (n.card = i);
  return o;
}
function $s(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && (i ? delete n.visible : n.visible = !1);
  return o;
}
function _s(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    if (n.id === e) {
      const s = Math.max(0, Math.min(1, i));
      s === 1 ? delete n.opacity : n.opacity = s;
    }
  return o;
}
function xi(t, e, i) {
  const o = I(t);
  return o.opacity = { ...o.opacity, [e]: i }, o;
}
function As(t, e, i) {
  const o = I(t);
  return o.nodes = o.nodes.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), o;
}
function Cs(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), o;
}
function ht(t, e, i) {
  const o = I(t);
  return o.defaults = { ...o.defaults, [e]: i }, o;
}
function Ss(t, e, i) {
  if (e === i) return t;
  const o = I(t), n = o.background.weather_states;
  if (!n || !(e in n)) return t;
  const s = n[e];
  return s === void 0 ? t : (delete n[e], n[i] = s, o);
}
function Is(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 || i === "corner" ? delete s.line_style : s.line_style = i, s;
  }), o;
}
function $i(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.color : s.color = i, s;
  }), o;
}
function _i(t, e, i) {
  const o = I(t);
  return o.nodes = o.nodes.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i ? delete s.visible : s.visible = !1, s;
  }), o;
}
function ks(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i ? delete s.visible : s.visible = !1, s;
  }), o;
}
function Fs(t, e, i) {
  const o = I(t);
  return o.visibility = { ...o.visibility, [e]: i }, o;
}
function Ai(t, e, i) {
  const o = I(t);
  return i === void 0 ? o.domain_colors && (delete o.domain_colors[e], Object.keys(o.domain_colors).length === 0 && delete o.domain_colors) : o.domain_colors = { ...o.domain_colors, [e]: i }, o;
}
function Ps(t, e, i) {
  const o = i.trim();
  if (!o || o === e) return t;
  const n = t.flows.findIndex((r) => r.id === e);
  if (n < 0 || t.flows.some((r, a) => a !== n && r.id === o)) return t;
  const s = I(t);
  return s.flows = s.flows.map((r) => r.id === e ? { ...r, id: o } : r), s;
}
function Ci(t, e, i) {
  const o = i.trim();
  if (!o || o === e) return t;
  const n = t.overlays ?? [], s = n.findIndex((a) => a.id === e);
  if (s < 0 || n.some((a, l) => l !== s && a.id === o)) return t;
  const r = I(t);
  return r.overlays = n.map((a) => a.id === e ? { ...a, id: o } : a), r;
}
function Y(t, e, i) {
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
function Ms(t, e) {
  const i = I(t);
  return i.flows = i.flows.map((o) => {
    if (o.id !== e) return o;
    const n = { ...o };
    return delete n.animation, n;
  }), i;
}
function Si(t, e) {
  const i = I(t), o = { ...i.animation };
  for (const n of Object.keys(e)) {
    const s = e[n];
    s === void 0 ? delete o[n] : Object.assign(o, { [n]: s });
  }
  return Object.keys(o).length === 0 ? delete i.animation : i.animation = o, i;
}
function Ii(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 || !Number.isFinite(i) ? delete s.peak_value : s.peak_value = i, s;
  }), o;
}
function Bs(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 || i === "" || i === e ? delete s.label : s.label = i, s;
  }), o;
}
function Ns(t, e) {
  const i = I(t);
  return e ? delete i.pause_when_hidden : i.pause_when_hidden = !1, i;
}
function Es(t, e, i) {
  const o = I(t), n = o.flows.find((s) => s.id === e);
  return n && (n.value_gradient = i), o;
}
function Rs(t, e, i) {
  const o = I(t), n = o.flows.find((s) => s.id === e);
  return n && (n.value_gradient = { ...n.value_gradient, ...i }), o;
}
function ki(t, e) {
  const i = I(t), o = i.flows.find((n) => n.id === e);
  return o && delete o.value_gradient, i;
}
const Dt = 8, Fi = 1, $t = 255;
function Ds(t, e = Dt) {
  const i = Math.max(1, Math.floor(e)), o = Math.max(1, Math.ceil(t.width / i)), n = Math.max(1, Math.ceil(t.height / i)), s = new Uint16Array(o * n);
  for (let r = 0; r < n; r++) {
    const a = r * i, l = Math.min(t.height, a + i);
    for (let d = 0; d < o; d++) {
      const p = d * i, h = Math.min(t.width, p + i);
      let u = 0;
      for (let g = a; g < l; g++) {
        const b = g * t.width;
        for (let v = p; v < h; v++) {
          const m = t.data[b + v] ?? 0;
          m > u && (u = m);
        }
      }
      const f = $t - u;
      s[r * o + d] = f < Fi ? Fi : f;
    }
  }
  return { cols: o, rows: n, cellSize: i, data: s };
}
function zs(t, e, i) {
  return i * t.cols + e;
}
function Ts(t, e, i) {
  return e < 0 || i < 0 || e >= t.cols || i >= t.rows ? $t : t.data[zs(t, e, i)] ?? $t;
}
const Ls = 480, Os = 270, Hs = 30;
function Gs(t, e, i = Ls, o = Os) {
  if (t <= 0 || e <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / t, o / e, 1);
  return {
    width: Math.max(1, Math.floor(t * n)),
    height: Math.max(1, Math.floor(e * n))
  };
}
function Ws(t, e, i) {
  const o = new Uint8ClampedArray(e * i);
  for (let n = 0, s = 0; n < t.length; n += 4, s++) {
    const r = t[n] ?? 0, a = t[n + 1] ?? 0, l = t[n + 2] ?? 0;
    o[s] = 0.2126 * r + 0.7152 * a + 0.0722 * l;
  }
  return o;
}
function Us(t, e, i) {
  const o = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e;
    for (let a = 0; a < e; a++) {
      const l = t[r + Math.max(0, a - 1)] ?? 0, d = t[r + a] ?? 0, p = t[r + Math.min(e - 1, a + 1)] ?? 0;
      o[r + a] = l + 2 * d + p >> 2;
    }
  }
  const n = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e, a = Math.max(0, s - 1) * e, l = Math.min(i - 1, s + 1) * e;
    for (let d = 0; d < e; d++) {
      const p = o[a + d] ?? 0, h = o[r + d] ?? 0, u = o[l + d] ?? 0;
      n[r + d] = p + 2 * h + u >> 2;
    }
  }
  return n;
}
function Ks(t, e, i) {
  const o = new Uint8ClampedArray(e * i);
  for (let n = 1; n < i - 1; n++) {
    const s = (n - 1) * e, r = n * e, a = (n + 1) * e;
    for (let l = 1; l < e - 1; l++) {
      const d = t[s + (l - 1)] ?? 0, p = t[s + l] ?? 0, h = t[s + (l + 1)] ?? 0, u = t[r + (l - 1)] ?? 0, f = t[r + (l + 1)] ?? 0, g = t[a + (l - 1)] ?? 0, b = t[a + l] ?? 0, v = t[a + (l + 1)] ?? 0, m = -d - 2 * u - g + h + 2 * f + v, $ = -d - 2 * p - h + g + 2 * b + v;
      let _ = Math.sqrt(m * m + $ * $);
      _ < Hs && (_ = 0), _ > 255 && (_ = 255), o[r + l] = _;
    }
  }
  return { width: e, height: i, data: o };
}
function lo(t, e, i) {
  const o = Gs(e, i), n = document.createElement("canvas");
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
function js(t, e, i) {
  const { width: o, height: n, rgba: s } = lo(t, e, i), r = Ws(s, o, n), a = Us(r, o, n);
  return Ks(a, o, n);
}
const Vs = 50;
class Ys {
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
function Zs(t, e, i) {
  const [o, n] = e, [s, r] = i;
  if (o < 0 || n < 0 || o >= t.cols || n >= t.rows || s < 0 || r < 0 || s >= t.cols || r >= t.rows) return null;
  if (o === s && n === r) return [[o, n]];
  const a = t.cols * t.rows, l = new Float32Array(a);
  l.fill(1 / 0);
  const d = new Int16Array(a), p = new Int16Array(a);
  d.fill(-1), p.fill(-1);
  const h = new Uint8Array(a), u = new Uint8Array(a), f = n * t.cols + o;
  l[f] = 0;
  const g = new Ys();
  g.push({ col: o, row: n, f: Pi(o, n, s, r) });
  const b = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const v = g.pop(), { col: m, row: $ } = v, _ = $ * t.cols + m;
    if (!u[_]) {
      if (u[_] = 1, m === s && $ === r)
        return Xs(t, d, p, i);
      for (const [C, k, E] of b) {
        const D = m + C, N = $ + k;
        if (D < 0 || N < 0 || D >= t.cols || N >= t.rows) continue;
        const x = N * t.cols + D;
        if (u[x]) continue;
        const R = Ts(t, D, N), T = h[_] && h[_] !== E ? Vs : 0, z = (l[_] ?? 1 / 0) + R + T;
        if (z < (l[x] ?? 1 / 0)) {
          l[x] = z, d[x] = m, p[x] = $, h[x] = E;
          const H = z + Pi(D, N, s, r);
          g.push({ col: D, row: N, f: H });
        }
      }
    }
  }
  return null;
}
function Pi(t, e, i, o) {
  return Math.abs(t - i) + Math.abs(e - o);
}
function Xs(t, e, i, o) {
  const n = [];
  let s = o[0], r = o[1];
  for (; s !== -1 && r !== -1; ) {
    n.push([s, r]);
    const a = r * t.cols + s, l = e[a] ?? -1, d = i[a] ?? -1;
    if (l === s && d === r || (s = l, r = d, s < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
function qs(t) {
  if (t.length <= 2) return [...t];
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i++) {
    const o = t[i - 1], n = t[i], s = t[i + 1], r = n[0] - o[0], a = n[1] - o[1], l = s[0] - n[0], d = s[1] - n[1];
    r * d - a * l === 0 && Math.sign(r) === Math.sign(l) && Math.sign(a) === Math.sign(d) || e.push(n);
  }
  return e.push(t[t.length - 1]), e;
}
function Js(t, e, i) {
  const o = Mi(e, t), n = Mi(i, t), s = Zs(t, o, n);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: qs(s).slice(1, -1).map((d) => Qs(d, t)), edgesUsable: !0 };
}
function Mi(t, e) {
  const i = Bi(Math.floor(t.x / 100 * e.cols), 0, e.cols - 1), o = Bi(Math.floor(t.y / 100 * e.rows), 0, e.rows - 1);
  return [i, o];
}
function Qs(t, e) {
  return {
    x: (t[0] + 0.5) / e.cols * 100,
    y: (t[1] + 0.5) / e.rows * 100
  };
}
function Bi(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
const je = /* @__PURE__ */ new Map();
async function Ni(t, e = {}) {
  const i = performance.now(), o = e.cellSize ?? Dt, n = `${t.imageUrl}|${o}`, s = je.has(n);
  let r = null;
  try {
    r = await tr(n, t.imageUrl, o);
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
  const { waypoints: a, edgesUsable: l } = Js(r, t.from, t.to);
  return {
    waypoints: a,
    cached: s,
    edgesUsable: l,
    elapsedMs: performance.now() - i
  };
}
async function er(t) {
  if (!t) return null;
  try {
    const e = await co(t);
    return lo(e, e.naturalWidth, e.naturalHeight);
  } catch {
    return null;
  }
}
function tr(t, e, i) {
  const o = je.get(t);
  if (o) return o;
  const n = ir(e, i).catch((s) => {
    throw je.delete(t), s;
  });
  return je.set(t, n), n;
}
async function ir(t, e) {
  const i = await co(t);
  await Ei();
  const o = js(i, i.naturalWidth, i.naturalHeight);
  return await Ei(), Ds(o, e);
}
function co(t) {
  return new Promise((e, i) => {
    const o = new Image();
    o.crossOrigin = "anonymous", o.decoding = "async", o.onload = () => e(o), o.onerror = () => i(new Error(`Failed to load background image: ${t}`)), o.src = t;
  });
}
function Ei() {
  return new Promise((t) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(t, 0)) : setTimeout(t, 0);
  });
}
function Q(t) {
  return t < 0 ? 0 : t > 100 ? 100 : t;
}
function or(t, e, i, o, n, s) {
  if (i <= 0 || o <= 0 || n <= 0 || s <= 0)
    return { x: Q(t), y: Q(e) };
  const r = i / n, a = o / s, l = Math.max(r, a), d = n * l, p = s * l, h = (d - i) / 2, u = (p - o) / 2, f = t / 100 * i, g = e / 100 * o, b = (f + h) / l, v = (g + u) / l;
  return {
    x: Q(b / n * 100),
    y: Q(v / s * 100)
  };
}
function nr(t, e, i, o, n, s) {
  if (i <= 0 || o <= 0 || n <= 0 || s <= 0)
    return { x: Q(t), y: Q(e) };
  const r = i / n, a = o / s, l = Math.max(r, a), d = n * l, p = s * l, h = (d - i) / 2, u = (p - o) / 2, f = t / 100 * n, g = e / 100 * s, b = f * l - h, v = g * l - u;
  return {
    x: Q(b / i * 100),
    y: Q(v / o * 100)
  };
}
function Ri(t, e, i, o, n) {
  const s = or(t.x, t.y, e, i, o, n);
  return { x: s.x, y: s.y };
}
function sr(t, e, i, o, n) {
  return t.map((s) => {
    const r = nr(s.x, s.y, e, i, o, n);
    return { x: r.x, y: r.y };
  });
}
const po = "flowme", Di = "/local/community/flowme/backgrounds/";
function rr() {
  return `media-source://media_source/${po}/.`;
}
function ar(t) {
  const e = typeof t.media_content_id == "string" ? t.media_content_id : "", i = `media-source://media_source/${po}/`;
  if (e.startsWith(i)) {
    let s = e.slice(i.length);
    return s.startsWith("./") && (s = s.slice(2)), Di + s;
  }
  const n = (typeof t.title == "string" ? t.title : "").replace(/^\/+/, "");
  if (n.length > 0)
    return Di + n;
}
const uo = "ZnVuY3Rpb24gZCh0LCBuID0gOCkgewogIGNvbnN0IG8gPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG4pKSwgYyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0LndpZHRoIC8gbykpLCByID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHQuaGVpZ2h0IC8gbykpLCBzID0gbmV3IFVpbnQxNkFycmF5KGMgKiByKTsKICBmb3IgKGxldCBlID0gMDsgZSA8IHI7IGUrKykgewogICAgY29uc3QgbCA9IGUgKiBvLCBhID0gTWF0aC5taW4odC5oZWlnaHQsIGwgKyBvKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBpICogbywgdSA9IE1hdGgubWluKHQud2lkdGgsIGYgKyBvKTsKICAgICAgbGV0IGggPSAwOwogICAgICBmb3IgKGxldCBwID0gbDsgcCA8IGE7IHArKykgewogICAgICAgIGNvbnN0IEUgPSBwICogdC53aWR0aDsKICAgICAgICBmb3IgKGxldCB5ID0gZjsgeSA8IHU7IHkrKykgewogICAgICAgICAgY29uc3QgbSA9IHQuZGF0YVtFICsgeV0gPz8gMDsKICAgICAgICAgIG0gPiBoICYmIChoID0gbSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGNvbnN0IHggPSAyNTUgLSBoOwogICAgICBzW2UgKiBjICsgaV0gPSB4IDwgMSA/IDEgOiB4OwogICAgfQogIH0KICByZXR1cm4geyBjb2xzOiBjLCByb3dzOiByLCBjZWxsU2l6ZTogbywgZGF0YTogcyB9Owp9CmZ1bmN0aW9uIFAodCwgbiwgbykgewogIHJldHVybiBvICogdC5jb2xzICsgbjsKfQpmdW5jdGlvbiBSKHQsIG4sIG8pIHsKICByZXR1cm4gbiA8IDAgfHwgbyA8IDAgfHwgbiA+PSB0LmNvbHMgfHwgbyA+PSB0LnJvd3MgPyAyNTUgOiB0LmRhdGFbUCh0LCBuLCBvKV0gPz8gMjU1Owp9CmNvbnN0IE4gPSA1MDsKY2xhc3MgayB7CiAgY29uc3RydWN0b3IoKSB7CiAgICB0aGlzLmFyciA9IFtdOwogIH0KICBwdXNoKG4pIHsKICAgIHRoaXMuYXJyLnB1c2gobiksIHRoaXMuYnViYmxlVXAodGhpcy5hcnIubGVuZ3RoIC0gMSk7CiAgfQogIHBvcCgpIHsKICAgIGlmICh0aGlzLmFyci5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IG4gPSB0aGlzLmFyclswXSwgbyA9IHRoaXMuYXJyLnBvcCgpOwogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aCA+IDAgJiYgKHRoaXMuYXJyWzBdID0gbywgdGhpcy5zaW5rRG93bigwKSksIG47CiAgfQogIGdldCBzaXplKCkgewogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDsKICB9CiAgYnViYmxlVXAobikgewogICAgZm9yICg7IG4gPiAwOyApIHsKICAgICAgY29uc3QgbyA9IG4gLSAxID4+IDE7CiAgICAgIGlmICgodGhpcy5hcnJbb10/LmYgPz8gMCkgPD0gKHRoaXMuYXJyW25dPy5mID8/IDApKSByZXR1cm47CiAgICAgIFt0aGlzLmFycltvXSwgdGhpcy5hcnJbbl1dID0gW3RoaXMuYXJyW25dLCB0aGlzLmFycltvXV0sIG4gPSBvOwogICAgfQogIH0KICBzaW5rRG93bihuKSB7CiAgICBjb25zdCBvID0gdGhpcy5hcnIubGVuZ3RoOwogICAgZm9yICg7IDsgKSB7CiAgICAgIGNvbnN0IGMgPSAyICogbiArIDEsIHIgPSAyICogbiArIDI7CiAgICAgIGxldCBzID0gbjsKICAgICAgaWYgKGMgPCBvICYmICh0aGlzLmFycltjXT8uZiA/PyAwKSA8ICh0aGlzLmFycltzXT8uZiA/PyAwKSAmJiAocyA9IGMpLCByIDwgbyAmJiAodGhpcy5hcnJbcl0/LmYgPz8gMCkgPCAodGhpcy5hcnJbc10/LmYgPz8gMCkgJiYgKHMgPSByKSwgcyA9PT0gbikgcmV0dXJuOwogICAgICBbdGhpcy5hcnJbc10sIHRoaXMuYXJyW25dXSA9IFt0aGlzLmFycltuXSwgdGhpcy5hcnJbc11dLCBuID0gczsKICAgIH0KICB9Cn0KZnVuY3Rpb24geih0LCBuLCBvKSB7CiAgY29uc3QgW2MsIHJdID0gbiwgW3MsIGVdID0gbzsKICBpZiAoYyA8IDAgfHwgciA8IDAgfHwgYyA+PSB0LmNvbHMgfHwgciA+PSB0LnJvd3MgfHwgcyA8IDAgfHwgZSA8IDAgfHwgcyA+PSB0LmNvbHMgfHwgZSA+PSB0LnJvd3MpIHJldHVybiBudWxsOwogIGlmIChjID09PSBzICYmIHIgPT09IGUpIHJldHVybiBbW2MsIHJdXTsKICBjb25zdCBsID0gdC5jb2xzICogdC5yb3dzLCBhID0gbmV3IEZsb2F0MzJBcnJheShsKTsKICBhLmZpbGwoMSAvIDApOwogIGNvbnN0IGkgPSBuZXcgSW50MTZBcnJheShsKSwgZiA9IG5ldyBJbnQxNkFycmF5KGwpOwogIGkuZmlsbCgtMSksIGYuZmlsbCgtMSk7CiAgY29uc3QgdSA9IG5ldyBVaW50OEFycmF5KGwpLCBoID0gbmV3IFVpbnQ4QXJyYXkobCksIHggPSByICogdC5jb2xzICsgYzsKICBhW3hdID0gMDsKICBjb25zdCBwID0gbmV3IGsoKTsKICBwLnB1c2goeyBjb2w6IGMsIHJvdzogciwgZjogSShjLCByLCBzLCBlKSB9KTsKICBjb25zdCBFID0gWwogICAgWzEsIDAsIDFdLAogICAgWy0xLCAwLCAyXSwKICAgIFswLCAxLCAzXSwKICAgIFswLCAtMSwgNF0KICBdOwogIGZvciAoOyBwLnNpemUgPiAwOyApIHsKICAgIGNvbnN0IHkgPSBwLnBvcCgpLCB7IGNvbDogbSwgcm93OiBNIH0gPSB5LCB3ID0gTSAqIHQuY29scyArIG07CiAgICBpZiAoIWhbd10pIHsKICAgICAgaWYgKGhbd10gPSAxLCBtID09PSBzICYmIE0gPT09IGUpCiAgICAgICAgcmV0dXJuIFgodCwgaSwgZiwgbyk7CiAgICAgIGZvciAoY29uc3QgW0wsIGcsIF9dIG9mIEUpIHsKICAgICAgICBjb25zdCBDID0gbSArIEwsIGIgPSBNICsgZzsKICAgICAgICBpZiAoQyA8IDAgfHwgYiA8IDAgfHwgQyA+PSB0LmNvbHMgfHwgYiA+PSB0LnJvd3MpIGNvbnRpbnVlOwogICAgICAgIGNvbnN0IEEgPSBiICogdC5jb2xzICsgQzsKICAgICAgICBpZiAoaFtBXSkgY29udGludWU7CiAgICAgICAgY29uc3QgRCA9IFIodCwgQywgYiksIEYgPSB1W3ddICYmIHVbd10gIT09IF8gPyBOIDogMCwgVSA9IChhW3ddID8/IDEgLyAwKSArIEQgKyBGOwogICAgICAgIGlmIChVIDwgKGFbQV0gPz8gMSAvIDApKSB7CiAgICAgICAgICBhW0FdID0gVSwgaVtBXSA9IG0sIGZbQV0gPSBNLCB1W0FdID0gXzsKICAgICAgICAgIGNvbnN0IE8gPSBVICsgSShDLCBiLCBzLCBlKTsKICAgICAgICAgIHAucHVzaCh7IGNvbDogQywgcm93OiBiLCBmOiBPIH0pOwogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICByZXR1cm4gbnVsbDsKfQpmdW5jdGlvbiBJKHQsIG4sIG8sIGMpIHsKICByZXR1cm4gTWF0aC5hYnModCAtIG8pICsgTWF0aC5hYnMobiAtIGMpOwp9CmZ1bmN0aW9uIFgodCwgbiwgbywgYykgewogIGNvbnN0IHIgPSBbXTsKICBsZXQgcyA9IGNbMF0sIGUgPSBjWzFdOwogIGZvciAoOyBzICE9PSAtMSAmJiBlICE9PSAtMTsgKSB7CiAgICByLnB1c2goW3MsIGVdKTsKICAgIGNvbnN0IGwgPSBlICogdC5jb2xzICsgcywgYSA9IG5bbF0gPz8gLTEsIGkgPSBvW2xdID8/IC0xOwogICAgaWYgKGEgPT09IHMgJiYgaSA9PT0gZSB8fCAocyA9IGEsIGUgPSBpLCBzIDwgMCB8fCBlIDwgMCkpIGJyZWFrOwogIH0KICByZXR1cm4gci5yZXZlcnNlKCksIHJbMF0/LlswXSA9PT0gLTEgJiYgci5zaGlmdCgpLCByOwp9CmNvbnN0IFogPSAzMDsKZnVuY3Rpb24gdih0LCBuLCBvKSB7CiAgY29uc3QgYyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuICogbyk7CiAgZm9yIChsZXQgciA9IDAsIHMgPSAwOyByIDwgdC5sZW5ndGg7IHIgKz0gNCwgcysrKSB7CiAgICBjb25zdCBlID0gdFtyXSA/PyAwLCBsID0gdFtyICsgMV0gPz8gMCwgYSA9IHRbciArIDJdID8/IDA7CiAgICBjW3NdID0gMC4yMTI2ICogZSArIDAuNzE1MiAqIGwgKyAwLjA3MjIgKiBhOwogIH0KICByZXR1cm4gYzsKfQpmdW5jdGlvbiBHKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHQubGVuZ3RoKTsKICBmb3IgKGxldCBzID0gMDsgcyA8IG87IHMrKykgewogICAgY29uc3QgZSA9IHMgKiBuOwogICAgZm9yIChsZXQgbCA9IDA7IGwgPCBuOyBsKyspIHsKICAgICAgY29uc3QgYSA9IHRbZSArIE1hdGgubWF4KDAsIGwgLSAxKV0gPz8gMCwgaSA9IHRbZSArIGxdID8/IDAsIGYgPSB0W2UgKyBNYXRoLm1pbihuIC0gMSwgbCArIDEpXSA/PyAwOwogICAgICBjW2UgKyBsXSA9IGEgKyAyICogaSArIGYgPj4gMjsKICAgIH0KICB9CiAgY29uc3QgciA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0Lmxlbmd0aCk7CiAgZm9yIChsZXQgcyA9IDA7IHMgPCBvOyBzKyspIHsKICAgIGNvbnN0IGUgPSBzICogbiwgbCA9IE1hdGgubWF4KDAsIHMgLSAxKSAqIG4sIGEgPSBNYXRoLm1pbihvIC0gMSwgcyArIDEpICogbjsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBjW2wgKyBpXSA/PyAwLCB1ID0gY1tlICsgaV0gPz8gMCwgaCA9IGNbYSArIGldID8/IDA7CiAgICAgIHJbZSArIGldID0gZiArIDIgKiB1ICsgaCA+PiAyOwogICAgfQogIH0KICByZXR1cm4gcjsKfQpmdW5jdGlvbiBIKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4gKiBvKTsKICBmb3IgKGxldCByID0gMTsgciA8IG8gLSAxOyByKyspIHsKICAgIGNvbnN0IHMgPSAociAtIDEpICogbiwgZSA9IHIgKiBuLCBsID0gKHIgKyAxKSAqIG47CiAgICBmb3IgKGxldCBhID0gMTsgYSA8IG4gLSAxOyBhKyspIHsKICAgICAgY29uc3QgaSA9IHRbcyArIChhIC0gMSldID8/IDAsIGYgPSB0W3MgKyBhXSA/PyAwLCB1ID0gdFtzICsgKGEgKyAxKV0gPz8gMCwgaCA9IHRbZSArIChhIC0gMSldID8/IDAsIHggPSB0W2UgKyAoYSArIDEpXSA/PyAwLCBwID0gdFtsICsgKGEgLSAxKV0gPz8gMCwgRSA9IHRbbCArIGFdID8/IDAsIHkgPSB0W2wgKyAoYSArIDEpXSA/PyAwLCBtID0gLWkgLSAyICogaCAtIHAgKyB1ICsgMiAqIHggKyB5LCBNID0gLWkgLSAyICogZiAtIHUgKyBwICsgMiAqIEUgKyB5OwogICAgICBsZXQgdyA9IE1hdGguc3FydChtICogbSArIE0gKiBNKTsKICAgICAgdyA8IFogJiYgKHcgPSAwKSwgdyA+IDI1NSAmJiAodyA9IDI1NSksIGNbZSArIGFdID0gdzsKICAgIH0KICB9CiAgcmV0dXJuIHsgd2lkdGg6IG4sIGhlaWdodDogbywgZGF0YTogYyB9Owp9CmZ1bmN0aW9uIFcodCkgewogIGlmICh0Lmxlbmd0aCA8PSAyKSByZXR1cm4gWy4uLnRdOwogIGNvbnN0IG4gPSBbdFswXV07CiAgZm9yIChsZXQgbyA9IDE7IG8gPCB0Lmxlbmd0aCAtIDE7IG8rKykgewogICAgY29uc3QgYyA9IHRbbyAtIDFdLCByID0gdFtvXSwgcyA9IHRbbyArIDFdLCBlID0gclswXSAtIGNbMF0sIGwgPSByWzFdIC0gY1sxXSwgYSA9IHNbMF0gLSByWzBdLCBpID0gc1sxXSAtIHJbMV07CiAgICBlICogaSAtIGwgKiBhID09PSAwICYmIE1hdGguc2lnbihlKSA9PT0gTWF0aC5zaWduKGEpICYmIE1hdGguc2lnbihsKSA9PT0gTWF0aC5zaWduKGkpIHx8IG4ucHVzaChyKTsKICB9CiAgcmV0dXJuIG4ucHVzaCh0W3QubGVuZ3RoIC0gMV0pLCBuOwp9CmZ1bmN0aW9uIGoodCwgbiwgbywgYywgciwgcyA9IDgpIHsKICBjb25zdCBlID0gdih0LCBuLCBvKSwgbCA9IEcoZSwgbiwgbyksIGEgPSBIKGwsIG4sIG8pLCBpID0gZChhLCBzKTsKICByZXR1cm4gcShpLCBjLCByKTsKfQpmdW5jdGlvbiBxKHQsIG4sIG8pIHsKICBjb25zdCBjID0gUyhuLCB0KSwgciA9IFMobywgdCksIHMgPSB6KHQsIGMsIHIpOwogIHJldHVybiAhcyB8fCBzLmxlbmd0aCA8IDIgPyB7IHdheXBvaW50czogW10sIGVkZ2VzVXNhYmxlOiAhMCB9IDogeyB3YXlwb2ludHM6IFcocykuc2xpY2UoMSwgLTEpLm1hcCgoaSkgPT4gQihpLCB0KSksIGVkZ2VzVXNhYmxlOiAhMCB9Owp9CmZ1bmN0aW9uIFModCwgbikgewogIGNvbnN0IG8gPSBUKE1hdGguZmxvb3IodC54IC8gMTAwICogbi5jb2xzKSwgMCwgbi5jb2xzIC0gMSksIGMgPSBUKE1hdGguZmxvb3IodC55IC8gMTAwICogbi5yb3dzKSwgMCwgbi5yb3dzIC0gMSk7CiAgcmV0dXJuIFtvLCBjXTsKfQpmdW5jdGlvbiBCKHQsIG4pIHsKICByZXR1cm4gewogICAgeDogKHRbMF0gKyAwLjUpIC8gbi5jb2xzICogMTAwLAogICAgeTogKHRbMV0gKyAwLjUpIC8gbi5yb3dzICogMTAwCiAgfTsKfQpmdW5jdGlvbiBUKHQsIG4sIG8pIHsKICByZXR1cm4gdCA8IG4gPyBuIDogdCA+IG8gPyBvIDogdDsKfQpzZWxmLm9ubWVzc2FnZSA9ICh0KSA9PiB7CiAgY29uc3QgeyByZ2JhOiBuLCB3aWR0aDogbywgaGVpZ2h0OiBjLCBmcm9tUG9zOiByLCB0b1BvczogcywgY2VsbFNpemU6IGUgfSA9IHQuZGF0YSwgbCA9IHBlcmZvcm1hbmNlLm5vdygpOwogIHRyeSB7CiAgICBjb25zdCBhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4pLCBpID0gZSA/PyA4LCB7IHdheXBvaW50czogZiwgZWRnZXNVc2FibGU6IHUgfSA9IGooYSwgbywgYywgciwgcywgaSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgd2F5cG9pbnRzOiBmLAogICAgICBlZGdlc1VzYWJsZTogdSwKICAgICAgZWxhcHNlZE1zOiBwZXJmb3JtYW5jZS5ub3coKSAtIGwKICAgIH0pOwogIH0gY2F0Y2ggKGEpIHsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB3YXlwb2ludHM6IFtdLAogICAgICBlZGdlc1VzYWJsZTogITEsCiAgICAgIGVsYXBzZWRNczogcGVyZm9ybWFuY2Uubm93KCkgLSBsLAogICAgICBlcnJvcjogYSBpbnN0YW5jZW9mIEVycm9yID8gYS5tZXNzYWdlIDogU3RyaW5nKGEpCiAgICB9KTsKICB9Cn07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhmaW5kaW5nLndvcmtlci1CUHhaVndVTS5qcy5tYXAK", lr = (t) => Uint8Array.from(atob(t), (e) => e.charCodeAt(0)), zi = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", lr(uo)], { type: "text/javascript;charset=utf-8" });
function cr(t) {
  let e;
  try {
    if (e = zi && (self.URL || self.webkitURL).createObjectURL(zi), !e) throw "";
    const i = new Worker(e, {
      type: "module",
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + uo,
      {
        type: "module",
        name: t?.name
      }
    );
  }
}
var dr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, M = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? pr(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && dr(e, i, n), n;
};
const Ti = 0.5, ft = "not_configured", ur = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"];
let P = class extends re {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.inlineRename = null, this.canUndo = !1, this.nodeLabelInputRef = X(), this.flowIdInputRef = X(), this.overlayIdInputRef = X(), this._pendingInspectorLabelFocus = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.flowEndpointPathfindingFlowId = null, this.flowEndpointError = null, this.flowZeroThresholdDraft = {}, this.flowInspectorAdvancedOpen = {}, this.imageBrowserOpen = !1, this.imageBrowserLoading = !1, this.imageBrowserError = "", this.imageBrowserField = "default", this.imageBrowserFiles = [], this._pathWorkerPending = !1, this._pathPendingSelection = null, this._pathPendingImageDims = null, this.selectorType = "", this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.sceneW = 0, this.sceneH = 0, this.sceneReady = !1, this.spaceHeld = !1, this.panPointerId = null, this.stageRef = X(), this.canvasRef = X(), this.editorFxSvgRef = X(), this.editorNodeFx = new ao(), this._editorFxRaf = null, this.undoStack = new is((t) => this.applyConfig(
      t,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (t) => {
      if (!this.config) return;
      const e = t.target.value, i = this.config, o = yi(i, e);
      this.pushPatch(i, o, "edit default background");
    }, this.onWeatherStateRemove = (t) => {
      if (!this.config) return;
      const e = this.config, i = ms(e, t);
      this.pushPatch(e, i, `remove weather state ${t}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const t = this.config, e = gs(t), i = t.background.weather_states ?? {}, o = Object.keys(e.background.weather_states ?? {}).find((n) => !(n in i));
      this.pushPatch(t, e, o ? `Add weather state ${o}` : "Add weather state");
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: t, toNodeId: e, waypoints: i } = this.suggestPreview, o = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), n = this.config, s = n.flows.find(
        (l) => l.from_node === t && l.to_node === e
      );
      let r, a;
      if (s)
        a = s.id, r = {
          ...n,
          flows: n.flows.map(
            (l) => l.id === s.id ? { ...l, waypoints: i.map((d) => ({ x: d.x, y: d.y })) } : l
          )
        };
      else {
        const { config: l, flow: d } = bi(n, t, e, o);
        a = d.id, r = {
          ...l,
          flows: l.flows.map(
            (p) => p.id === d.id ? { ...p, waypoints: i.map((h) => ({ x: h.x, y: h.y })) } : p
          )
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(n, r, `suggest-path ${a}`), this.selectedFlowId = a;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (t) => {
      if (!(!this.config || t.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(t);
          if (!i) return;
          const o = this.config, { config: n, node: s } = ss(o, i, c("editor.inspector.newNodeDefaultLabel"));
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
          }, n = this.config, { config: s, overlay: r } = ys(n, o);
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
        const r = this.config, a = gi(r, i, n, s);
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
          const o = window.prompt(c("editor.inspector.flowEntityPrompt"), c("editor.inspector.flowEntityDefault")) ?? c("editor.inspector.flowEntityDefault"), n = this.config, { config: s, flow: r } = bi(n, this.pending.fromId, i, o);
          this.pushPatch(n, s, `add flow ${O(r)}`), this.pending = null;
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
      const n = this.config, s = mi(n, i, o);
      this.pushPatch(n, s, `delete waypoint ${o} of ${i}`);
    }, this.stopClick = (t) => {
      t.stopPropagation();
    }, this.onHandlePointerDown = (t) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const e = t.currentTarget, i = e.dataset.waypointIndex, o = e.dataset.flowId, n = e.dataset.nodeId, s = e.dataset.overlayId;
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
        const n = this.sceneW > 0 ? this.sceneW : 1, s = this.sceneH > 0 ? this.sceneH : 1, r = (t.clientX - e.startPx.x) / this.scale, a = (t.clientY - e.startPx.y) / this.scale, l = r / n * 100, d = a / s * 100;
        let p = e.startSize.width + l, h = e.startSize.height + d;
        this.dragShiftHeld && (p = Math.round(p), h = Math.round(h)), this.dragMoved = !0, this.config = wi(this.config, e.id, { width: p, height: h });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const n = t.clientX - this.dragStartPx.x, s = t.clientY - this.dragStartPx.y;
        (Math.abs(n) > 4 || Math.abs(s) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const i = this.pointerToPercent(t);
      if (!i) return;
      const o = this.dragShiftHeld ? { x: L(Ge(i.x)), y: L(Ge(i.y)) } : i;
      if (e.kind === "node")
        this.config = pt(this.config, e.id, o);
      else if (e.kind === "node-bulk") {
        const n = this.sceneW > 0 ? this.sceneW : 1, s = this.sceneH > 0 ? this.sceneH : 1, r = (t.clientX - e.startPx.x) / this.scale, a = (t.clientY - e.startPx.y) / this.scale, l = r / n * 100, d = a / s * 100, p = /* @__PURE__ */ new Map();
        for (const [h, u] of e.startPositions) {
          const f = this.dragShiftHeld ? Ge(u.x + l) : u.x + l, g = this.dragShiftHeld ? Ge(u.y + d) : u.y + d;
          p.set(h, { x: f, y: g });
        }
        this.config = as(this.config, p);
      } else e.kind === "overlay" ? this.config = ws(this.config, e.id, o) : e.kind === "waypoint" && (this.config = ut(this.config, e.flowId, e.index, o));
    }, this.onHandlePointerUp = (t) => {
      if (this.dragPointerId !== t.pointerId) return;
      const e = t.currentTarget;
      e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
      const i = this.dragStartConfig, o = this.config, n = this.dragTarget, s = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !n) return;
      if (!s && n.kind === "node") {
        const a = n.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (t.shiftKey) {
          const l = new Set(this.selectedNodeIds);
          l.has(a) ? l.delete(a) : l.add(a), this.selectedNodeIds = l, this.selectedNodeId = l.size === 1 ? Array.from(l)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([a]), this.selectedNodeId = a, this.selectedFlowId = null, this.selectedOverlayId = null;
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
    super.disconnectedCallback(), this._pathWorker?.terminate(), this._pathWorker = void 0, this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown), document.removeEventListener("keydown", this.onKeyDown, !0), document.removeEventListener("keydown", this.onSpaceDown, !0), document.removeEventListener("keyup", this.onSpaceUp, !0), this._canvasResizeObserver?.disconnect(), this._canvasResizeObserver = void 0, this.scale = this.fitScale, this.panX = this.fitPanX, this.panY = this.fitPanY, this.spaceHeld = !1, this.panPointerId = null, this._editorFxRaf !== null && (cancelAnimationFrame(this._editorFxRaf), this._editorFxRaf = null), this.editorNodeFx.reset(), this.sceneReady = !1;
  }
  willUpdate(t) {
    if (super.willUpdate(t), t.has("hass")) {
      const e = this.hass?.language;
      e !== this._lastLanguage && (this._lastLanguage = e, Zi(e));
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
    this.updateComplete.then(() => {
      const t = this.stageRef.value ?? this.canvasRef.value;
      t && (this._canvasResizeObserver = new ResizeObserver(() => {
        this.recalcFit();
      }), this._canvasResizeObserver.observe(t), this.recalcFit());
    });
  }
  /**
   * Measure the stage box and set {@link sceneW} / {@link sceneH}. Fit scale is
   * always 1 (the logical scene matches the stage); background images are a
   * separate CSS layer and do not affect coordinates.
   */
  recalcFit() {
    const t = this.stageRef.value;
    if (!t) return;
    const e = t.offsetWidth, i = t.offsetHeight;
    if (e <= 0 || i <= 0) return;
    this.sceneW = e, this.sceneH = i, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0;
    const o = this.sceneReady;
    this.sceneReady = !0, o ? this.scale === this.fitScale && (this.panX = this.fitPanX, this.panY = this.fitPanY) : (this.scale = 1, this.panX = 0, this.panY = 0), this.clampPan();
  }
  /** Natural pixel size of the background bitmap — pathfinding only (not layout). */
  loadImageDimsForPathfinding(t) {
    return new Promise((e) => {
      const i = new Image();
      i.onload = () => {
        e({ w: i.naturalWidth || 1, h: i.naturalHeight || 1 });
      }, i.onerror = () => {
        e({ w: Math.max(1, this.sceneW), h: Math.max(1, this.sceneH) });
      }, i.src = t;
    });
  }
  /** Stage % → image % for Sobel grid when the bitmap is shown as CSS cover. */
  projectEndpointsForPathfinding(t, e, i) {
    const o = this.sceneW, n = this.sceneH;
    return o <= 0 || n <= 0 || i.w <= 0 || i.h <= 0 ? { from: { x: t.x, y: t.y }, to: { x: e.x, y: e.y } } : {
      from: Ri({ x: t.x, y: t.y }, o, n, i.w, i.h),
      to: Ri({ x: e.x, y: e.y }, o, n, i.w, i.h)
    };
  }
  /** Pathfinding returns image-normalized waypoints — convert back to stage %. */
  projectWaypointsToStageSpace(t, e) {
    const i = this.sceneW, o = this.sceneH;
    return i <= 0 || o <= 0 || e.w <= 0 || e.h <= 0 || !this.config?.background?.default ? t : sr(t, i, o, e.w, e.h);
  }
  /**
   * Percent (0–100) → pixel offsets in the canvas-content scene (same size as
   * `.stage`). Parent `.canvas-content` applies pan/scale; do not multiply scale here.
   */
  pct2px(t) {
    return {
      x: t.x / 100 * this.sceneW,
      y: t.y / 100 * this.sceneH
    };
  }
  editorNodeFxHooks() {
    return {
      getLayoutMetrics: (t) => {
        const e = t.getBoundingClientRect();
        return {
          widthPx: Math.max(1, e.width),
          heightPx: Math.max(1, e.height),
          viewBoxUserWidth: this.sceneW,
          viewBoxUserHeight: this.sceneH
        };
      }
    };
  }
  setConfig(t) {
    try {
      se(qi(t)), this.config = $e(t), se(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "", this.updateComplete.then(() => this.recalcFit());
    } catch (e) {
      se(!1), this.errorMessage = e instanceof Error ? e.message : String(e);
    }
  }
  render() {
    if (!this.config)
      return y`
        <div class="wrap">
          <p class="hint">${c("editor.hintNoConfig")}</p>
          ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : A}
        </div>
      `;
    const t = this.config.background.default, e = this.selectedNodeIds.size >= 2, i = this.selectedNodeId ? "nodes" : this.selectedFlowId ? "flows" : this.selectedOverlayId ? "overlays" : this.selectorType, o = this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? "", n = this.sceneReady && this.sceneW > 0 && this.sceneH > 0, s = !t && n;
    return y`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class="z-canvas"
          role="application"
          aria-label=${c("editor.canvas.ariaLabel")}
          ${q(this.canvasRef)}
          @wheel=${this.onCanvasWheel}
          @pointerdown=${this.onCanvasPointerDown}
          @pointermove=${this.onCanvasPointerMove}
          @pointerup=${this.onCanvasPointerUp}
          @pointercancel=${this.onCanvasPointerUp}
        >
          <div
            class=${[
      "stage",
      t ? "" : "stage--transparent",
      this.spaceHeld ? "mode-pan" : "",
      this.pending?.kind === "add-node" ? "mode-add-node" : "",
      this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""
    ].filter(Boolean).join(" ")}
            @click=${this.onStageClick}
            @contextmenu=${this.onStageContextMenu}
            ${q(this.stageRef)}
          >
            ${t ? y`<div
                  class="editor-background"
                  style="background-image: url('${t}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
                ></div>` : A}
            <div
              class=${`canvas-content${n ? "" : " canvas-content--pending"}${s ? " canvas-content--transparent" : ""}`}
              style=${n ? `width: ${this.sceneW}px; height: ${this.sceneH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;` : "left:0;top:0;width:100%;height:100%;"}
            >
              ${n ? y`
                    <svg
                      class="connectors"
                      viewBox=${`0 0 ${this.sceneW} ${this.sceneH}`}
                      preserveAspectRatio="none"
                    >
                      ${this.config.flows.map((r) => this.renderFlowConnector(r))}
                    </svg>
                    <svg
                      class="node-effects-editor"
                      viewBox=${`0 0 ${this.sceneW} ${this.sceneH}`}
                      preserveAspectRatio="none"
                      ${q(this.editorFxSvgRef)}
                    ></svg>
                    ${this.config.flows.filter((r) => r.id === this.selectedFlowId).map((r) => this.renderWaypointHandles(r))}
                    ${(this.config.overlays ?? []).map((r) => this.renderOverlayHandle(r))}
                    ${this.config.nodes.map((r) => this.renderHandle(r))}
                    ${this.renderSuggestPreview()}
                  ` : A}
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
                ?disabled=${this.scale <= Ti}
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
      const r = this.config;
      this.pushPatch(r, this.savedConfig, "cancel all changes");
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
              @change=${(r) => {
      this.selectorType = r.target.value, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null;
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
              @change=${(r) => {
      const a = r.target.value;
      a && (i === "nodes" ? (this.selectedNodeId = a, this.selectedNodeIds = /* @__PURE__ */ new Set([a]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = a, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = a, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null), this._pendingInspectorLabelFocus = !0);
    }}
            >
              <option value="">${c(i ? "editor.toolbar.selectElement" : "editor.toolbar.selectElementDash")}</option>
              ${i === "nodes" ? this.config.nodes.map((r) => y`
                <option value=${r.id}>${r.label ?? r.id}</option>
              `) : A}
              ${i === "flows" ? this.config.flows.map((r) => y`
                <option value=${r.id}>${O(r)}</option>
              `) : A}
              ${i === "overlays" ? (this.config.overlays ?? []).map((r, a) => y`
                <option value=${r.id ?? String(a)}>${c("editor.canvas.overlayOption", a, r.id ? c("editor.canvas.overlayOptionIdPart", r.id) : "")}</option>
              `) : A}
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
    if (!this.config || !this.sceneReady || this.sceneW <= 0 || this.sceneH <= 0) return A;
    const e = new Map(this.config.nodes.map((p) => [p.id, p])), i = e.get(t.from_node), o = e.get(t.to_node);
    if (!i || !o) return A;
    const n = [i.position, ...t.waypoints, o.position], s = t.id === this.selectedFlowId, r = { width: this.sceneW, height: this.sceneH }, a = we(n, r, t.line_style ?? "corner");
    if (!a) return A;
    const l = t.color ?? "rgba(255,255,255,0.8)", d = [];
    for (let p = 0; p < n.length - 1; p++) {
      const h = n[p], u = n[p + 1];
      if (!h || !u) continue;
      const f = this.pct2px(h), g = this.pct2px(u);
      d.push(Vt`
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
    return Vt`
      <g>
        ${d}
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
      (e, i) => {
        const o = this.pct2px(e);
        return y`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${c("aria.waypointHandle", i, O(t))}
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
    const e = t.id === this.selectedOverlayId, i = t.size?.width ?? 14, o = t.size?.height ?? 8, n = this.pct2px(t.position), s = i / 100 * this.sceneW, r = o / 100 * this.sceneH, a = this.inlineRename?.kind === "overlay" && this.inlineRename.id === t.id;
    return y`
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
        <div class="overlay-label-chip" @dblclick=${(l) => this.onOverlayChipDblClick(l, t)}>
          ${a ? y`<input
                class="inline-rename overlay-inline-rename"
                type="text"
                spellcheck="false"
                .value=${this.inlineRename.draft}
                @input=${(l) => {
      const d = this.inlineRename;
      !d || d.kind !== "overlay" || d.id !== t.id || (this.inlineRename = { ...d, draft: l.target.value });
    }}
                @keydown=${(l) => {
      l.key === "Escape" ? (l.preventDefault(), this.inlineRename = null) : l.key === "Enter" && (l.preventDefault(), this.commitOverlayInlineRename(!0));
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
            ></div>` : A}
      </div>
    `;
  }
  renderHandle(t) {
    const e = this.selectedNodeIds.has(t.id), i = e && this.selectedNodeIds.size === 1, o = e && this.selectedNodeIds.size > 1, n = e ? Array.from(this.selectedNodeIds).indexOf(t.id) : -1, s = t.visible === !1, r = this.inlineRename?.kind === "node" && this.inlineRename.id === t.id, a = this.pct2px(t.position);
    return y`
      <div
        class=${`handle ${i ? "selected" : ""} ${o ? "multi-selected" : ""} ${e ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
        role="button"
        tabindex="0"
        aria-label=${c("aria.nodeHandle", t.label ?? t.id, t.position.x, t.position.y)}
        aria-selected=${e ? "true" : "false"}
        data-node-id=${t.id}
        style=${`left: ${a.x}px; top: ${a.y}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span
          class="handle-dot"
          @dblclick=${(l) => this.onNodeDotDblClick(l, t)}
        ></span>
        ${r ? y`<input
              class="inline-rename"
              type="text"
              spellcheck="false"
              .value=${this.inlineRename.draft}
              @input=${(l) => {
      const d = this.inlineRename;
      !d || d.kind !== "node" || d.id !== t.id || (this.inlineRename = { ...d, draft: l.target.value });
    }}
              @keydown=${(l) => {
      l.key === "Escape" ? (l.preventDefault(), this.inlineRename = null) : l.key === "Enter" && (l.preventDefault(), this.commitNodeInlineRename(!0));
    }}
              @blur=${() => {
      this.inlineRename?.kind === "node" && this.inlineRename.id === t.id && this.commitNodeInlineRename(!0);
    }}
            />` : t.label ? y`<span class="handle-label" @dblclick=${(l) => this.onNodeLabelTextDblClick(l, t)}
                >${t.label}</span
              >` : y`<span class="handle-id" @dblclick=${(l) => this.onNodeLabelTextDblClick(l, t)}
                >${t.id}</span
              >`}
        ${e && this.selectedNodeIds.size >= 2 ? y`<span class="suggest-badge">${n + 1}</span>` : A}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${c(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(l) => {
      if (l.stopPropagation(), !this.config) return;
      const d = this.config, p = _i(d, t.id, s);
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
      return y`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${t}
          .includeDomains=${n}
          @value-changed=${p}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, a = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, l = Object.keys(r).filter((p) => {
      if (n.length === 0) return !0;
      const h = p.split(".")[0];
      return !!h && n.includes(h);
    }).sort();
    return y`
      <input
        type="text"
        list=${a}
        placeholder=${s}
        .value=${t}
        @change=${(p) => {
      e(p.target.value.trim());
    }}
      />
      <datalist id=${a}>
        ${l.map((p) => y`<option value=${p}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return A;
    if (this.selectedNodeId) {
      const t = this.config.nodes.find((i) => i.id === this.selectedNodeId);
      if (!t) return A;
      const e = (i, o) => {
        if (!this.config) return;
        const n = this.config, s = {
          ...n,
          nodes: n.nodes.map((r) => r.id === t.id ? { ...r, ...i } : r)
        };
        this.pushPatch(n, s, o);
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
                ${q(this.nodeLabelInputRef)}
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
        const o = i.target.checked, n = this.config, s = _i(n, t.id, o);
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
        const n = this.config, s = pt(n, t.id, { x: o, y: t.position.y });
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
        const n = this.config, s = pt(n, t.id, { x: t.position.x, y: o });
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
        const n = this.config, s = As(n, t.id, o >= 1 ? void 0 : o);
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
      const t = this.config.flows.find((o) => o.id === this.selectedFlowId);
      if (!t) return A;
      const e = this.config.flows.findIndex((o) => o.id === t.id), i = O(t);
      return y`
        <div class="inspector">
          <label class="inspector-id-row">
            <span class="node-cell-label">${c("editor.inspector.flowIdField")}</span>
            <input
              type="text"
              spellcheck="false"
              ${q(this.flowIdInputRef)}
              .value=${t.id}
              @change=${(o) => this.onInspectorFlowIdChange(t.id, o)}
            />
          </label>
          <h3>${c("editor.inspector.flowHeading", O(t))}</h3>
          <fieldset class="inspector-fieldset">
            <legend class="inspector-legend">${c("editor.inspector.routeAndSensor")}</legend>
            <div class="field-row">
              <label for="flow-label-${t.id}">${c("editor.inspector.flowLabel")}</label>
              <input
                id="flow-label-${t.id}"
                type="text"
                maxlength="64"
                placeholder=${t.id}
                title=${c("editor.inspector.flowLabelPlaceholder")}
                .value=${t.label ?? ""}
                @change=${(o) => this.onFlowLabelChange(t.id, o.target.value)}
              />
            </div>
            <div class="field-row flow-endpoint-row">
              <label for=${`flow-from-${t.id}`}>${c("editor.inspector.fromNode")}</label>
              <select
                id=${`flow-from-${t.id}`}
                class="flow-endpoint-select"
                ?disabled=${this.flowEndpointPathfindingFlowId === t.id}
                .value=${t.from_node}
                @change=${(o) => {
        const n = o.target.value;
        this.onFlowFromNodeChange(t.id, n);
      }}
              >
                ${this.config.nodes.map(
        (o) => y`<option value=${o.id} ?selected=${o.id === t.from_node}>${o.label ?? o.id}</option>`
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
                @change=${(o) => {
        const n = o.target.value;
        this.onFlowToNodeChange(t.id, n);
      }}
              >
                ${this.config.nodes.map(
        (o) => y`<option value=${o.id} ?selected=${o.id === t.to_node}>${o.label ?? o.id}</option>`
      )}
              </select>
            </div>
            ${this.flowEndpointPathfindingFlowId === t.id ? y`<p class="hint-sub flow-endpoint-busy">
                  ${c("editor.toolbar.suggestPathFinding")}
                  <span class="suggest-path-spinner" aria-hidden="true"></span>
                </p>` : A}
            ${this.flowEndpointError && this.selectedFlowId === t.id ? y`<p class="flow-endpoint-error">${this.flowEndpointError}</p>` : A}
            <label>
              ${c("editor.inspector.entity")}
              ${this.renderEntityPicker(
        t.entity,
        (o) => this.setFlowEntity(t.id, o),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
            </label>
            ${(() => {
        const o = W(t.domain ?? this.config.domain), n = Xe(t, o, this.config), s = o.peak, a = [0, n.peak * 0.5, n.peak].map(
          (p) => `${(Mt(p, n) / 1e3).toFixed(1)}s`
        ), l = t.animation?.zero_threshold !== void 0, d = this.flowInspectorAdvancedOpen[t.id] !== void 0 ? this.flowInspectorAdvancedOpen[t.id] : l;
        return y`
                <label>
                  ${c("editor.inspector.peakValue")}
                  <input
                    type="number"
                    step="any"
                    min="0"
                    placeholder="${s}"
                    .value=${t.peak_value !== void 0 ? String(t.peak_value) : ""}
                    @change=${(p) => {
          if (!this.config) return;
          const h = p.target.value.trim(), u = this.config;
          if (h === "") {
            const b = Ii(u, t.id, void 0);
            this.pushPatch(u, b, `clear peak_value ${i}`);
            return;
          }
          const f = parseFloat(h);
          if (!Number.isFinite(f) || f <= 0) return;
          const g = Ii(u, t.id, f);
          this.pushPatch(u, g, `set peak_value ${i}`);
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
                    placeholder=${c("editor.inspector.animMinMsPlaceholder")}
                    .value=${t.animation?.min_duration !== void 0 ? String(t.animation.min_duration) : ""}
                    @change=${(p) => {
          if (!this.config) return;
          const h = p.target.value.trim(), u = this.config;
          if (h === "") {
            const b = Y(u, t.id, { min_duration: void 0 });
            this.pushPatch(u, b, `clear flow min_duration ${i}`);
            return;
          }
          const f = parseInt(h, 10);
          if (!Number.isFinite(f) || f <= 0) return;
          const g = Y(u, t.id, { min_duration: f });
          this.pushPatch(u, g, `set flow min_duration ${i}`);
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
                    placeholder=${c("editor.inspector.animMaxMsPlaceholder")}
                    .value=${t.animation?.max_duration !== void 0 ? String(t.animation.max_duration) : ""}
                    @change=${(p) => {
          if (!this.config) return;
          const h = p.target.value.trim(), u = this.config;
          if (h === "") {
            const b = Y(u, t.id, { max_duration: void 0 });
            this.pushPatch(u, b, `clear flow max_duration ${i}`);
            return;
          }
          const f = parseInt(h, 10);
          if (!Number.isFinite(f) || f <= 0) return;
          const g = Y(u, t.id, { max_duration: f });
          this.pushPatch(u, g, `set flow max_duration ${i}`);
        }}
                  />
                </label>
                <div class="speed-curve-preview inspector-timing-preview">
                  <span>${c("editor.inspector.previewLinearSpeed")}</span>
                  <strong>${a[0]}</strong>
                  /
                  <strong>${a[1]}</strong>
                  /
                  <strong>${a[2]}</strong>
                </div>
                <details
                  class="advanced-options"
                  .open=${d}
                  @toggle=${(p) => {
          const u = p.currentTarget.open;
          if (this.flowInspectorAdvancedOpen = { ...this.flowInspectorAdvancedOpen, [t.id]: u }, !u) {
            const { [t.id]: f, ...g } = this.flowZeroThresholdDraft;
            if (this.flowZeroThresholdDraft = g, this.config && t.animation?.zero_threshold !== void 0) {
              const b = this.config, v = Y(b, t.id, { zero_threshold: void 0 });
              this.pushPatch(b, v, `advanced closed: clear zero_threshold ${i}`);
            }
          }
        }}
                >
                  <summary>${c("editor.inspector.advancedOptions")}</summary>
                  <div class="advanced-options-content">
                    ${(() => {
          const p = this.flowZeroThresholdDraft[t.id];
          let h;
          if (p !== void 0 && p.trim() !== "") {
            const g = parseFloat(p);
            h = Number.isFinite(g) && g > 0 && g <= 100 ? g / 100 : t.animation?.zero_threshold ?? Ee;
          } else
            h = t.animation?.zero_threshold ?? Ee;
          const u = t.peak_value ?? o.peak, f = `${c("editor.inspector.zeroThresholdCutoff")} ${(h * u).toFixed(1)}${o.unit_label ? ` ${o.unit_label}` : ""}`;
          return y`
                        <div class="field-row advanced-zero-row">
                          <label>
                            ${c("editor.inspector.zeroThreshold")}
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              placeholder=${c("editor.inspector.zeroThresholdAuto")}
                              .value=${this.flowZeroThresholdDraft[t.id] !== void 0 ? this.flowZeroThresholdDraft[t.id] : t.animation?.zero_threshold !== void 0 ? (t.animation.zero_threshold * 100).toFixed(1) : ""}
                              @input=${(g) => {
            const b = g.target.value;
            this.flowZeroThresholdDraft = { ...this.flowZeroThresholdDraft, [t.id]: b };
          }}
                              @change=${(g) => {
            if (!this.config) return;
            const b = g.target.value.trim(), v = this.config, m = () => {
              const { [t.id]: C, ...k } = this.flowZeroThresholdDraft;
              this.flowZeroThresholdDraft = k;
            };
            if (b === "") {
              m();
              const C = Y(v, t.id, { zero_threshold: void 0 });
              this.pushPatch(v, C, `clear flow zero_threshold ${i}`);
              return;
            }
            const $ = parseFloat(b);
            if (!Number.isFinite($) || $ <= 0 || $ > 100) return;
            m();
            const _ = Y(v, t.id, { zero_threshold: $ / 100 });
            this.pushPatch(v, _, `set flow zero_threshold ${i}`);
          }}
                            />
                            <span class="field-hint hint-sub">${f}</span>
                          </label>
                        </div>
                      `;
        })()}
                  </div>
                </details>
              `;
      })()}
          </fieldset>
          ${this.renderWaypointList(t)}
          <label>
            ${c("editor.inspector.lineStyle")}
            <select
              .value=${t.line_style ?? "corner"}
              @change=${(o) => {
        if (!this.config) return;
        const n = o.target.value, s = this.config, r = Is(s, t.id, n);
        this.pushPatch(s, r, `set line style of ${i}`);
      }}
            >
              ${gt.map(
        (o) => y`<option value=${o} ?selected=${(t.line_style ?? "corner") === o}>${o}</option>`
      )}
            </select>
          </label>
          <label>
            ${c("editor.inspector.colourOverride")}
            <div class="color-row">
              ${(() => {
        const o = W(t.domain ?? this.config.domain), n = fe(
          t,
          o,
          t.domain ?? this.config.domain,
          1,
          this.config.domain_colors,
          e >= 0 ? e : 0
        );
        return y`
                  <input
                    type="color"
                    .value=${t.color ?? n}
                    @change=${(s) => {
          if (!this.config) return;
          const r = s.target.value, a = this.config, l = $i(a, t.id, r);
          this.pushPatch(a, l, `set colour of ${i}`);
        }}
                  />
                  <span class="color-effective">${t.color ? c("editor.inspector.colourOverrideActive") : c("editor.inspector.colourDomainDefault")}</span>
                  ${t.color ? y`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, r = $i(s, t.id, void 0);
          this.pushPatch(s, r, `clear colour of ${i}`);
        }}>${c("editor.inspector.clearColour")}</button>` : A}
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
                @change=${(o) => {
        if (!this.config) return;
        const n = parseFloat(o.target.value);
        if (!Number.isFinite(n)) return;
        const s = this.config, r = Cs(s, t.id, n);
        this.pushPatch(s, r, `set opacity of ${i}`);
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
                @change=${(o) => {
        if (!this.config) return;
        const n = o.target.checked, s = this.config, r = ks(s, t.id, n);
        this.pushPatch(s, r, `${n ? "show" : "hide"} flow ${i}`);
      }}
              />
              <span>${t.visible !== !1 ? c("editor.inspector.shown") : c("editor.inspector.hidden")}</span>
            </div>
          </label>
          ${this.renderAnimationSection(t)}
          ${this.renderValueGradientSection(t)}
          <button class="danger" @click=${() => this.removeFlow(t.id)}>${c("editor.inspector.deleteFlow")}</button>
        </div>
      `;
    }
    if (this.selectedOverlayId) {
      const t = (this.config.overlays ?? []).find((e) => e.id === this.selectedOverlayId);
      return t ? this.renderOverlayInspector(t) : A;
    }
    return A;
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
    const o = i.type === "glow" && i.glow_color || e, n = i.type === "ripple" && i.ripple_color || e, s = i.type === "alert" ? i.alert_color ?? "#FF0000" : "#FF0000";
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
            <circle cx="50" cy="50" r="14" fill="${o}" filter=${`url(#${r})`} opacity="0.95">
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
                <circle cx="50" cy="50" r="14" fill="none" stroke="${n}" stroke-width="2" opacity="0">
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
    const i = t.node_effect, o = i?.type ?? "";
    return y`
      <details class="inspector-details node-effect-details">
        <summary>${c("editor.nodeEffect.section")}</summary>
        <div class="node-effect-body">
          ${!t.entity && i ? y`<p class="hint-sub">${c("editor.nodeEffect.needsEntity")}</p>` : A}
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

          ${i?.type === "glow" ? y`
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
              ` : A}
          ${i?.type === "badge" ? y`
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
              ` : A}
          ${i?.type === "ripple" ? y`
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
              ` : A}
          ${i?.type === "alert" ? y`
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
              ` : A}
        </div>
      </details>
    `;
  }
  renderAnimationSection(t) {
    if (!this.config) return y``;
    const e = t.animation ?? {}, i = e.animation_style ?? "dots", o = (d) => {
      if (!this.config) return;
      const p = this.config, h = Y(p, t.id, d);
      this.pushPatch(p, h, `update animation for ${O(t)}`);
    }, s = !(/* @__PURE__ */ new Set(["dash", "fluid", "none"])).has(i), r = i === "trail", a = i === "dash", l = t.color ?? "#4ADE80";
    return y`
      <details class="anim-details" open>
        <summary>${c("editor.inspector.animation")}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(i, e, l)}
            </svg>
          </div>

          <label>${c("editor.inspector.style")}
            <select
              .value=${i}
              @change=${(d) => {
      o({ animation_style: d.target.value });
    }}
            >
              ${mt.map(
      (d) => y`<option value=${d} ?selected=${i === d}>${d}</option>`
    )}
            </select>
          </label>

          ${i === "fluid" ? y`<p class="hint-sub">${c("editor.inspector.fluidIgnoresParticleShape")}</p>` : A}

          ${s ? y`
            <label>${c("editor.inspector.particleShape")}
              <select
                .value=${e.particle_shape ?? "circle"}
                @change=${(d) => {
      o({ particle_shape: d.target.value });
    }}
              >
                ${bt.map(
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
      o({ custom_svg_path: d.target.value.trim() });
    }}
                />
                <svg class="custom-svg-preview" viewBox="-20 -20 40 40" width="40" height="40"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d=${e.custom_svg_path || "M 0 -8 L 5 8 L -5 8 Z"}
                        fill=${l} />
                </svg>
              </label>
            ` : A}
          ` : A}

          <label>${c("editor.inspector.direction")}
            <select
              .value=${e.direction ?? "auto"}
              @change=${(d) => {
      o({ direction: d.target.value });
    }}
            >
              ${yt.map(
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
              ${vt.map(
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
          ` : A}

          ${e.particle_spacing === "pulse" ? y`
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
          ` : A}

          ${e.particle_spacing === "wave_spacing" || e.particle_spacing === "wave_lateral" ? y`
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
          ` : A}

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

          ${r ? y`
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
          ` : A}

          ${a ? y`
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
          ` : A}

          ${t.animation && Object.keys(t.animation).length > 0 ? y`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const d = this.config, p = Ms(d, t.id);
      this.pushPatch(d, p, `reset animation for ${O(t)}`);
    }}>${c("editor.inspector.resetToDefaults")}</button>` : A}
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
      return y`<line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="2" stroke-opacity="0.3"/>`;
    if (t === "dash") {
      const r = e.dash_gap ?? 0.5, a = 14, l = a * r;
      return y`
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
      return y`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (e.particle_spacing === "wave_lateral") {
      const r = Array.from({ length: n }, (a, l) => (l + 0.5) / n * 180 + 10);
      return y`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (a, l) => y`
            <circle cx=${a} cy="20" r=${o} fill=${i} opacity="0">
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
    const s = Array.from({ length: n }, (r, a) => (a + 0.5) / n * 180 + 10);
    return y`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${s.map(
      (r, a) => y`
          <circle cx=${r} cy="20" r=${o} fill=${i} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(a / n * -1.4).toFixed(2)}s"/>
          </circle>
        `
    )}
    `;
  }
  renderWaypointList(t) {
    if (!this.config) return y``;
    const e = new Map(this.config.nodes.map((s) => [s.id, s])), i = e.get(t.from_node), o = e.get(t.to_node), n = () => {
      if (!this.config) return;
      const s = [
        ...i ? [i.position] : [],
        ...t.waypoints,
        ...o ? [o.position] : []
      ];
      let r = 0, a = 0;
      for (let g = 0; g < s.length - 1; g++) {
        const b = s[g], v = s[g + 1], m = Math.hypot(v.x - b.x, v.y - b.y);
        m > a && (a = m, r = g);
      }
      const l = s[r], d = s[r + 1], p = { x: (l.x + d.x) / 2, y: (l.y + d.y) / 2 }, h = r > 0 ? r - 1 + 1 : 0, u = this.config, f = gi(u, t.id, h, p);
      this.pushPatch(u, f, `add waypoint to ${O(t)}`);
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
                      @change=${(a) => {
      if (!this.config) return;
      const l = parseFloat(a.target.value);
      if (!Number.isFinite(l)) return;
      const d = this.config, p = ut(d, t.id, r, { x: l, y: s.y });
      this.pushPatch(d, p, `move waypoint ${r} of ${O(t)}`);
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
      const d = this.config, p = ut(d, t.id, r, { x: s.x, y: l });
      this.pushPatch(d, p, `move waypoint ${r} of ${O(t)}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${c("editor.inspector.deleteWaypointAria", r)} title=${c("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const a = this.config, l = mi(a, t.id, r);
      this.pushPatch(a, l, `delete waypoint ${r} of ${O(t)}`);
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
    if (!this.config) return y``;
    const e = t.value_gradient, i = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, o = (s) => {
      if (!this.config) return;
      const r = this.config, a = Rs(r, t.id, s);
      this.pushPatch(r, a, `update gradient for ${O(t)}`);
    };
    let n = A;
    if (e && e.low_color && e.high_color)
      try {
        const s = oo(
          (e.low_value + e.high_value) / 2,
          e
        ), r = `background: linear-gradient(to right, ${e.low_color}, ${s}, ${e.high_color});`;
        n = y`
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
      const r = s.target.checked, a = this.config, l = r ? Es(a, t.id, i) : ki(a, t.id);
      this.pushPatch(a, l, `${r ? "enable" : "disable"} gradient for ${O(t)}`);
    }}
          />
          ${c("editor.inspector.enableGradient")}
        </label>

        ${e ? y`
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
      const s = this.config, r = ki(s, t.id);
      this.pushPatch(s, r, `disable gradient for ${O(t)}`);
    }}>${c("editor.inspector.removeGradient")}</button>
        ` : A}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return A;
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
      const i = parseInt(e.target.value, 10), o = this.config, n = Si(o, { fps: i });
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
      const i = e.target.checked, o = this.config, n = Si(o, { smooth_speed: i });
      this.pushPatch(o, n, "set smooth_speed");
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
      const i = e.target.checked, o = this.config, n = Ns(o, i);
      this.pushPatch(o, n, "set pause_when_hidden");
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
    const e = t.size ?? { width: 20, height: 15 }, i = t.visible !== !1, o = t.opacity ?? 1;
    return y`
      <div class="inspector overlay-inspector">
        <label class="inspector-id-row">
          <span class="node-cell-label">${c("editor.inspector.overlayIdField")}</span>
          <input
            type="text"
            spellcheck="false"
            ${q(this.overlayIdInputRef)}
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
      const s = n.target.checked, r = this.config, a = $s(r, t.id, s);
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
            .value=${String(o)}
            @change=${(n) => {
      if (!this.config) return;
      const s = parseFloat(n.target.value);
      if (!Number.isFinite(s)) return;
      const r = this.config, a = _s(r, t.id, s);
      this.pushPatch(r, a, `edit overlay ${t.id} opacity`);
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
      ${this.customConfigError ? y`<div class="custom-config-error">${this.customConfigError}</div>` : A}
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
    if (!this.config) return A;
    const t = this.config.opacity ?? {}, e = (i, o, n = 1) => {
      const s = t[i] ?? n;
      return y`
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
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, d = xi(l, i, a);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const l = this.config, d = xi(l, i, a);
        this.pushPatch(l, d, `set opacity.${i}`);
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
    if (!this.config) return A;
    const t = this.config.domain_colors ?? {}, e = this.config.domain ?? "energy", i = qe[e] ?? qe.generic, o = (n, s) => {
      const r = `editor.domainRoles.${e}.${n}`, a = c(r);
      return a !== r ? a : s;
    };
    return y`
      <details class="panel domain-colors-panel">
        <summary>${c("editor.inspector.domainColoursSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${c("editor.inspector.domainColoursHint")}
          </p>
          ${i.roles.map((n) => {
      const s = t[n.key], r = n.default, a = o(n.key, n.label);
      return y`
              <div class="color-picker-row">
                <span class="color-picker-label">${a}</span>
                <input
                  type="color"
                  .value=${s ?? r}
                  @change=${(l) => {
        if (!this.config) return;
        const d = l.target.value, p = this.config, h = Ai(p, n.key, d);
        this.pushPatch(p, h, `set domain_colors.${n.key}`);
      }}
                />
                <span class="color-picker-value">${s || c("editor.inspector.colourDefaultSuffix", r)}</span>
                ${s ? y`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const l = this.config, d = Ai(l, n.key, void 0);
        this.pushPatch(l, d, `reset domain_colors.${n.key}`);
      }}>${c("editor.inspector.reset")}</button>` : A}
              </div>
            `;
    })}
        </div>
      </details>
    `;
  }
  renderVisibilityPanel() {
    if (!this.config) return A;
    const t = this.config.visibility ?? {}, e = (i, o) => {
      const n = t[i] !== !1;
      return y`
        <label class="visibility-row">
          <span class="visibility-label">${o}</span>
          <input
            type="checkbox"
            .checked=${n}
            @change=${(s) => {
        if (!this.config) return;
        const r = s.target.checked, a = this.config, l = Fs(a, i, r);
        this.pushPatch(a, l, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${c(n ? "editor.inspector.visibilityVisible" : "editor.inspector.visibilityHidden")}</span>
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
    if (!this.config) return A;
    const t = this.config.defaults ?? {}, e = Vi(this.config.domain), i = W(e), o = t.peak_value ?? i.peak, n = Math.round(o * 0.5886 * 10) / 10, s = (r, a, l) => {
      const d = t[r] ?? l.defaultVal;
      return y`
        <label class="defaults-row">
          <span class="defaults-label">${a}</span>
          <input
            type="number"
            min=${l.min}
            max=${l.max}
            step=${l.step}
            .value=${String(d)}
            @change=${(p) => {
        if (!this.config) return;
        const h = parseFloat(p.target.value);
        if (!Number.isFinite(h)) return;
        const u = Math.max(l.min, Math.min(l.max, h)), f = this.config, g = ht(f, r, u);
        this.pushPatch(f, g, `set defaults.${r}`);
      }}
          />
          <span class="defaults-unit">${d}</span>
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
          ${s("node_radius", c("editor.stateA.nodeRadius"), { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${s("dot_radius", c("editor.stateA.dotRadius"), { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${s("line_width", c("editor.stateA.lineWidth"), { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${s("burst_trigger_ratio", c("editor.inspector.burstTriggerRatio"), { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${s("burst_sustain_ms", c("editor.inspector.burstSustainMs"), { min: 1e3, max: 3e4, step: 500, defaultVal: 5e3 })}
          ${s("burst_max_particles", c("editor.inspector.burstMaxParticles"), { min: 3, max: 50, step: 1, defaultVal: 20 })}
          ${e === "hvac" ? y`
                <div class="dual-unit-row">
                  <span class="defaults-label">${c("editor.stateA.peakAirflow")}</span>
                  <div class="field-col">
                    <label>${c("editor.stateA.peakM3h")}</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      .value=${String(o)}
                      @input=${(r) => {
      if (!this.config) return;
      const a = parseFloat(r.target.value);
      if (!Number.isFinite(a) || a <= 0) return;
      const l = this.config, d = ht(l, "peak_value", a);
      this.pushPatch(l, d, "set defaults.peak_value m³/h");
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
                      .value=${String(n)}
                      @input=${(r) => {
      if (!this.config) return;
      const a = parseFloat(r.target.value);
      if (!Number.isFinite(a) || a <= 0) return;
      const l = Math.round(a * 1.699 * 10) / 10, d = this.config, p = ht(d, "peak_value", l);
      this.pushPatch(d, p, "set defaults.peak_value via CFM");
    }}
                    />
                  </div>
                </div>
              ` : s("peak_value", c("editor.stateA.domainPeakDefault"), {
      min: 1e-4,
      max: 1e9,
      step: 1,
      defaultVal: i.peak
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
    if (!this.config) return A;
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
              ${Me.map(
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
    if (!Me.includes(e)) return;
    const i = this.deepCloneConfig(this.config), o = this.deepCloneConfig(this.config);
    o.domain = e, this.pushPatch(i, o, "Change domain");
  }
  domainOptionLabel(t) {
    return c(`editor.stateA.domainOption.${t}`);
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderMultiSelectToolbar() {
    const t = this.selectedNodeIds.size;
    if (t < 2) return A;
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
    const e = this.config, i = hi(e, t, !1);
    this.pushPatch(e, i, `hide ${t.size} nodes`);
  }
  bulkShow(t) {
    if (!this.config) return;
    const e = this.config, i = hi(e, t, !0);
    this.pushPatch(e, i, `show ${t.size} nodes`);
  }
  bulkAlignH(t, e) {
    if (!this.config) return;
    const i = this.config, o = cs(i, t, e);
    this.pushPatch(i, o, `align ${t.size} nodes horizontally`);
  }
  bulkAlignV(t, e) {
    if (!this.config) return;
    const i = this.config, o = ds(i, t, e);
    this.pushPatch(i, o, `align ${t.size} nodes vertically`);
  }
  bulkDelete(t) {
    if (!this.config || !window.confirm(c("editor.inspector.deleteNodesConfirm", t.size))) return;
    const e = this.config, i = ls(e, t);
    this.pushPatch(e, i, `delete ${t.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderBrowserPanel(t) {
    return y`
      <div class="image-browser">
        ${this.imageBrowserLoading ? y`<div class="browser-loading">${c("editor.stateA.loading")}</div>` : this.imageBrowserError === ft ? y`
                <div class="browser-setup-guide">
                  <p>${c("editor.stateA.browserSetupRequired")}</p>
                  <ol class="browser-setup-steps">
                    <li>${c("editor.stateA.browserSetupStep1")}</li>
                    <li>${c("editor.stateA.browserSetupStep2")}</li>
                    <li>
                      <span>${c("editor.stateA.browserSetupStep3")}</span>
                      <pre class="browser-code">homeassistant:
  media_dirs:
    flowme: /config/www/community/flowme/backgrounds</pre>
                    </li>
                    <li>${c("editor.stateA.browserSetupStep4")}</li>
                  </ol>
                  <p>${c("editor.stateA.browserSetupNote")}</p>
                  <a
                    href="https://www.home-assistant.io/more-info/local-media/setup-media/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="browser-setup-link"
                  >
                    ${c("editor.stateA.browserSetupDocs")} ↗
                  </a>
                </div>
              ` : this.imageBrowserError ? y`<div class="browser-error">${this.imageBrowserError}</div>` : y`
                  <div class="browser-grid">
                    ${this.imageBrowserFiles.map(
      (e) => y`
                        <div
                          class="browser-item ${this.currentImageBrowserTargetUrl(t) === e.url ? "browser-item--selected" : ""}"
                          role="button"
                          tabindex="0"
                          @click=${() => this.selectBgImage(e.url)}
                          @keydown=${(i) => {
        (i.key === "Enter" || i.key === " ") && (i.preventDefault(), this.selectBgImage(e.url));
      }}
                        >
                          <img
                            src=${e.thumbnail}
                            loading="lazy"
                            alt=${e.name}
                            @error=${(i) => this.onBrowserThumbError(i, e)}
                          />
                          <span class="browser-name">${e.name}</span>
                        </div>
                      `
    )}
                  </div>
                `}
      </div>
    `;
  }
  onBrowserThumbError(t, e) {
    const i = t.target;
    i.dataset.flowmeThumbFallback !== "1" && (i.dataset.flowmeThumbFallback = "1", i.src = e.url);
  }
  renderWeatherPanel() {
    if (!this.config) return A;
    const t = this.config.background, e = Object.entries(t.weather_states ?? {}), i = t.weather_entity && this.hass ? this.hass.states[t.weather_entity]?.state : void 0;
    return y`
      <details class="weather-panel" ?open=${e.length > 0 || !!t.weather_entity}>
        <summary>${c("editor.inspector.weatherPanelSummary")}</summary>
        <div class="weather-body">
          <label>
            ${c("editor.inspector.defaultImageUrl")}
            <div class="bg-url-row">
              <input
                type="text"
                class="bg-url-input"
                .value=${t.default}
                @change=${this.onDefaultBgChange}
                placeholder=${c("editor.inspector.defaultBgPlaceholder")}
              />
              <button
                type="button"
                class="tb-icon-btn"
                title=${c("editor.stateA.browseImages")}
                aria-label=${c("editor.stateA.browseImages")}
                @click=${(o) => {
      o.stopPropagation(), this.openImageBrowser("default");
    }}
              >
                📁
              </button>
            </div>
            ${this.imageBrowserOpen && this.imageBrowserField === "default" ? this.renderBrowserPanel(t) : A}
            ${t.default ? y`<img class="weather-thumb" src=${t.default} alt=${c("editor.inspector.defaultBgAlt")} />` : A}
          </label>
          <label>
            ${c("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(
      t.weather_entity ?? "",
      (o) => this.setWeatherEntityValue(o),
      { includeDomains: ["weather"], placeholder: c("editor.inspector.weatherPlaceholder") }
    )}
          </label>
          ${i !== void 0 ? y`<div class="weather-live-state">
                ${c("editor.inspector.currentState")} <strong>${i}</strong>
                ${t.weather_states?.[i] ? y` → <span class="weather-match-ok">${c("editor.inspector.weatherMatched")}</span>` : y` → <span class="weather-match-miss">${c("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : A}
          <label>
            ${c("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(
      t.sun_entity ?? "",
      (o) => {
        if (!this.config) return;
        const n = this.config, s = hs(n, o || void 0);
        this.pushPatch(n, s, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: c("editor.inspector.sunPlaceholder") }
    )}
          </label>
          ${t.sun_entity && this.hass?.states[t.sun_entity] ? y`<div class="weather-live-state">
                ${c("editor.inspector.sunStateLabel")} <strong>${this.hass.states[t.sun_entity]?.state === "above_horizon" ? c("editor.inspector.sunAbove") : c("editor.inspector.sunBelow")}</strong>
              </div>` : A}
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
      const s = this.config, r = fs(s, n * 1e3);
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
      ([o, n]) => y`
                <div class="weather-state-block" data-key=${o}>
                  <div class="weather-row">
                    <input
                      type="text"
                      list="flowme-weather-states"
                      .value=${o}
                      @change=${(s) => this.onWeatherStateKeyChange(o, s)}
                    />
                    <div class="bg-url-row weather-url-row">
                      <input
                        type="text"
                        class="bg-url-input"
                        .value=${n}
                        @change=${(s) => this.onWeatherStateUrlChange(o, s)}
                        placeholder=${c("editor.inspector.weatherRowPlaceholder")}
                      />
                      <button
                        type="button"
                        class="tb-icon-btn"
                        title=${c("editor.stateA.browseImages")}
                        aria-label=${c("editor.stateA.browseImages")}
                        @click=${(s) => {
        s.stopPropagation(), this.openImageBrowser("weather", o);
      }}
                      >
                        📁
                      </button>
                    </div>
                    <div class="weather-row-end">
                      ${n ? y`<img class="weather-thumb" src=${n} alt=${o} />` : A}
                      <button type="button" class="ghost" @click=${() => this.onWeatherStateRemove(o)}>
                        ${c("editor.inspector.remove")}
                      </button>
                    </div>
                  </div>
                  ${this.imageBrowserOpen && this.imageBrowserField === "weather" && this.imageBrowserWeatherState === o ? this.renderBrowserPanel(t) : A}
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${P.KNOWN_WEATHER_STATES.map(
      (o) => y`<option value=${o}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${c("editor.inspector.addWeatherState")}</button>
          </div>
          <details class="hint-details">
            <summary>${c("editor.inspector.metNoReferenceSummary")}</summary>
            <div class="hint-states">
              ${P.KNOWN_WEATHER_STATES.map(
      (o) => y`<code>${o}</code>`
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
  currentImageBrowserTargetUrl(t) {
    return this.imageBrowserField === "weather" && this.imageBrowserWeatherState ? t.weather_states?.[this.imageBrowserWeatherState] ?? "" : t.default ?? "";
  }
  async openImageBrowser(t, e) {
    if (this.imageBrowserOpen && this.imageBrowserField === t && (t === "default" || this.imageBrowserWeatherState === e)) {
      this.imageBrowserOpen = !1, this.requestUpdate();
      return;
    }
    this.imageBrowserOpen = !0, this.imageBrowserField = t, this.imageBrowserWeatherState = e, this.imageBrowserError = "", this.imageBrowserFiles = [], this.imageBrowserLoading = !0, this.requestUpdate();
    const o = this.hass;
    if (!o || typeof o.callWS != "function") {
      this.imageBrowserLoading = !1, this.imageBrowserError = c("editor.stateA.browserUnavailable"), this.requestUpdate();
      return;
    }
    try {
      const s = (await o.callWS({
        type: "media_source/browse_media",
        media_content_id: rr()
      }))?.children ?? [], r = [];
      for (const a of s) {
        const l = a && typeof a == "object" ? a : {};
        Ji() && S("[FlowMe] media item:", JSON.stringify(l, null, 2));
        const d = String(l.media_content_id ?? "").toLowerCase();
        if (!ur.some((u) => d.endsWith(u))) continue;
        const p = ar(l);
        if (!p) continue;
        const h = (typeof l.title == "string" && l.title.length > 0 ? l.title : void 0) ?? (typeof l.media_content_id == "string" ? l.media_content_id : void 0) ?? p;
        r.push({ name: h, url: p, thumbnail: p });
      }
      r.length === 0 && !s.length ? (this.imageBrowserError = ft, this.imageBrowserFiles = []) : this.imageBrowserFiles = r;
    } catch {
      this.imageBrowserError = ft, this.imageBrowserFiles = [];
    } finally {
      this.imageBrowserLoading = !1, this.requestUpdate();
    }
  }
  selectBgImage(t) {
    if (!this.config) return;
    const e = this.config;
    let i, o;
    this.imageBrowserField === "weather" && this.imageBrowserWeatherState ? (i = vi(e, this.imageBrowserWeatherState, t), o = "Set weather state image") : (i = yi(e, t), o = "Set background image"), this.pushPatch(e, i, o), this.imageBrowserOpen = !1, this.imageBrowserField = "default", this.imageBrowserWeatherState = void 0;
  }
  setWeatherEntityValue(t) {
    if (!this.config) return;
    const e = t.trim(), i = this.config, o = us(i, e || void 0);
    this.pushPatch(i, o, "edit weather entity");
  }
  onWeatherStateKeyChange(t, e) {
    if (!this.config) return;
    const i = e.target.value.trim();
    if (!i || i === t) return;
    const o = this.config, n = Ss(o, t, i);
    n !== o && this.pushPatch(o, n, `rename weather state ${t}→${i}`);
  }
  onWeatherStateUrlChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, o = this.config, n = vi(o, t, i);
    this.pushPatch(o, n, `edit weather image ${t}`);
  }
  // -- toolbar --
  // -- suggest path --
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new cr();
      } catch (t) {
        console.error("[FlowMe] worker init failed:", t), this._pathWorker = void 0;
        return;
      }
      this._pathWorker.onmessage = (t) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const e = this._pathPendingSelection;
        this._pathPendingSelection = null;
        const i = this._pathPendingImageDims;
        if (this._pathPendingImageDims = null, !e || !this.config) return;
        const o = t.data;
        if (o.error) {
          console.error("[FlowMe] pathfinding worker error:", o.error), this.runPathfindingMainThread(e.fromId, e.toId, { logFallback: !0 });
          return;
        }
        let n = o.waypoints ?? [];
        i && (n = this.projectWaypointsToStageSpace(n, i)), this.applySuggestPathWorkerResult(
          {
            waypoints: n,
            edgesUsable: o.edgesUsable ?? !1,
            elapsedMs: o.elapsedMs ?? 0
          },
          e.fromId,
          e.toId
        );
      }, this._pathWorker.onerror = (t) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1, this._pathPendingImageDims = null;
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
    i?.logFallback && S("falling back to main thread pathfinding");
    const o = this.config.nodes.find((s) => s.id === t), n = this.config.nodes.find((s) => s.id === e);
    if (!(!o || !n)) {
      this.suggestBusy = !0;
      try {
        const s = this.config.background.default;
        if (!s) {
          this.errorMessage = c("editor.inspector.suggestCorsError"), this.suggestPreview = null;
          return;
        }
        const r = await this.loadImageDimsForPathfinding(s), { from: a, to: l } = this.projectEndpointsForPathfinding(o.position, n.position, r), d = await Ni({
          imageUrl: s,
          from: a,
          to: l
        });
        if (!d.edgesUsable) {
          this.errorMessage = c("editor.inspector.suggestCorsError"), this.suggestPreview = null;
          return;
        }
        const p = this.projectWaypointsToStageSpace(d.waypoints ?? [], r);
        this.applySuggestPathWorkerResult({ ...d, waypoints: p }, t, e);
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
    const [t, e] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((p) => p.id === t), o = this.config.nodes.find((p) => p.id === e);
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
    const s = await er(n);
    if (!s) {
      this.suggestBusy = !1, this.errorMessage = c("editor.inspector.suggestCorsError"), this.suggestPreview = null;
      return;
    }
    const r = await this.loadImageDimsForPathfinding(n), { from: a, to: l } = this.projectEndpointsForPathfinding(i.position, o.position, r);
    this._pathWorkerPending = !0, this._pathPendingSelection = { fromId: t, toId: e }, this._pathPendingImageDims = r;
    const d = new Uint8ClampedArray(s.rgba);
    this._pathWorker.postMessage(
      {
        rgba: d.buffer,
        width: s.width,
        height: s.height,
        fromPos: a,
        toPos: l,
        cellSize: Dt
      },
      [d.buffer]
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
      const s = await this.loadImageDimsForPathfinding(n), { from: r, to: a } = this.projectEndpointsForPathfinding(i.position, o.position, s), l = await Ni({
        imageUrl: n,
        from: r,
        to: a
      });
      return l.edgesUsable ? this.projectWaypointsToStageSpace(l.waypoints ?? [], s).map((p) => ({ x: p.x, y: p.y })) : [];
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
    if (!o.flows.find((a) => a.id === t)) return;
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
        (a) => a.id === t ? { ...a, from_node: e, to_node: i, waypoints: s } : a
      )
    };
    this.pushPatch(o, r, "Change flow endpoints"), this.selectedFlowId = t;
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config || !this.sceneReady || this.sceneW <= 0 || this.sceneH <= 0) return A;
    const t = this.config.nodes.find((r) => r.id === this.suggestPreview.fromNodeId), e = this.config.nodes.find((r) => r.id === this.suggestPreview.toNodeId);
    if (!t || !e) return A;
    const i = this.sceneW, o = this.sceneH, s = [
      t.position,
      ...this.suggestPreview.waypoints,
      e.position
    ].map((r) => {
      const a = this.pct2px(r);
      return `${a.x.toFixed(2)},${a.y.toFixed(2)}`;
    }).join(" ");
    return y`
      <svg class="suggest-overlay" viewBox=${`0 0 ${i} ${o}`} preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map((r) => {
      const a = this.pct2px(r);
      return y`
          <div class="suggest-marker" style=${`left: ${a.x}px; top: ${a.y}px;`}></div>
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
    ` : A;
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
    const o = i.label ?? i.id, n = e.draft.trim() ? e.draft.trim() : void 0;
    if ((i.label ?? void 0) === n) {
      this.inlineRename = null;
      return;
    }
    const s = this.config, r = fi(s, e.id, n);
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
    const o = this.config, n = Ci(o, e.id, i);
    if (n === o) {
      this.errorMessage = c("editor.errors.renameIdConflict"), this.inlineRename = null;
      return;
    }
    this.inlineRename = null, this.errorMessage = "", this.pushPatch(o, n, `Rename overlay ${e.id} to ${i}`), this.selectedOverlayId = i;
  }
  onInspectorFlowIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, o = i.value.trim(), n = this.config, s = Ps(n, t, o);
    if (s === n) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(n, s, `Rename flow ${t} to ${o}`), this.selectedFlowId = o;
  }
  onInspectorOverlayIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, o = i.value.trim(), n = this.config, s = Ci(n, t, o);
    if (s === n) {
      this.errorMessage = c("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(n, s, `Rename overlay ${t} to ${o}`), this.selectedOverlayId = o;
  }
  // -- inspector edits --
  onNodeLabelChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, o = this.config, s = o.nodes.find((l) => l.id === t)?.label ?? t, r = fi(o, t, i.trim() ? i.trim() : void 0), a = i.trim() ? i.trim() : void 0;
    this.pushPatch(o, r, `Rename node ${s} to ${a ?? t}`);
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
    const i = this.config.flows.find((r) => r.id === t), o = this.config, n = e.trim();
    if (!n) return;
    const s = {
      ...o,
      flows: o.flows.map(
        (r) => r.id === t ? { ...r, entity: n } : r
      )
    };
    this.pushPatch(o, s, `edit entity of ${i ? O(i) : t}`);
  }
  onOverlaySizeChange(t, e, i) {
    if (!this.config) return;
    const o = (this.config.overlays ?? []).find((l) => l.id === t);
    if (!o) return;
    const n = o.size ?? { width: 20, height: 15 }, s = Number(i.target.value);
    if (!Number.isFinite(s) || s <= 0) return;
    const r = this.config, a = wi(r, t, { ...n, [e]: s });
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
      const n = xs(o, t, i), s = $e(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: o, next: s, description: `edit overlay ${t} card config` }), this.commitToHa(s);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(t) {
    if (!this.config) return;
    const e = this.config, i = vs(e, t);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(e, i, `delete overlay ${t}`);
  }
  removeNode(t) {
    if (!this.config) return;
    const e = this.config, i = rs(e, t);
    this.selectedNodeId = null, this.pushPatch(e, i, `delete node ${t}`);
  }
  removeFlow(t) {
    if (!this.config) return;
    const e = this.config.flows.find((n) => n.id === t), i = this.config, o = ps(i, t);
    this.selectedFlowId = null, this.pushPatch(i, o, `delete flow ${e ? O(e) : t}`);
  }
  onFlowLabelChange(t, e) {
    if (!this.config) return;
    const i = this.config.flows.find((r) => r.id === t);
    if (!i) return;
    const o = e.trim(), n = this.config, s = Bs(n, t, o === "" || o === i.id ? void 0 : o);
    this.pushPatch(n, s, `Set flow label ${i.id}`);
  }
  // -- zoom / pan --
  /**
   * Clamp panX/panY so the background image always covers the full stage — no
   * black borders in any direction. Must be called after every pan or zoom change.
   */
  clampPan() {
    const t = this.canvasRef.value;
    if (!t) return;
    const e = t.offsetWidth - 16, i = t.offsetHeight - 8, o = this.sceneW * this.scale, n = this.sceneH * this.scale;
    this.panX = Math.min(0, Math.max(e - o, this.panX)), this.panY = Math.min(0, Math.max(i - n, this.panY));
  }
  adjustZoom(t, e, i) {
    const o = this.canvasRef.value, n = e ?? (o ? o.offsetWidth / 2 : 0), s = i ?? (o ? o.offsetHeight / 2 : 0), r = Math.min(5, Math.max(Ti, this.scale * t));
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
    const o = t.clientX - (i.left + 8), n = t.clientY - (i.top + 4), s = (o - this.panX) / this.scale, r = (n - this.panY) / this.scale, a = this.sceneW > 0 ? this.sceneW : 1, l = this.sceneH > 0 ? this.sceneH : 1, d = L(s / a * 100), p = L(r / l * 100);
    return { x: d, y: p };
  }
  pushPatch(t, e, i) {
    try {
      const o = $e(t), n = $e(e);
      this.errorMessage = "", this.undoStack.push({ prev: o, next: n, description: i }), this.commitToHa(n), this.config = n, se(n.debug ?? !1);
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
P.styles = St`
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
    .stage--transparent {
      background: transparent;
    }
    .stage.mode-add-node,
    .stage.mode-add-overlay {
      cursor: copy;
    }
    .stage.mode-pan {
      cursor: grab;
    }
    /* Decorative bitmap behind the logical scene (coordinates use .stage size only). */
    .editor-background {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    /* canvas-content: same pixel size as .stage; transform pans/zooms the scene. */
    .canvas-content {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      will-change: transform;
    }
    .canvas-content--pending {
      transform: none;
    }
    .canvas-content--transparent {
      background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 50px 50px;
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
    .advanced-options {
      margin-top: 12px;
      border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      padding-top: 8px;
    }
    .advanced-options summary {
      cursor: pointer;
      font-size: 0.85em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      user-select: none;
      list-style: none;
    }
    .advanced-options summary::before {
      content: '▶ ';
      font-size: 0.75em;
    }
    .advanced-options[open] summary::before {
      content: '▼ ';
    }
    .advanced-options-content {
      padding-top: 8px;
    }
    .advanced-zero-row label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .advanced-zero-row input[type='number'] {
      max-width: 120px;
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
    .bg-url-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
    .bg-url-row .bg-url-input {
      flex: 1;
      min-width: 0;
    }
    .image-browser {
      margin-top: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      border-radius: 4px;
      max-height: 200px;
      overflow-y: auto;
    }
    .browser-loading,
    .browser-error {
      padding: 10px;
      font-size: 12px;
      opacity: 0.85;
    }
    .browser-error {
      color: var(--error-color, #f87171);
    }
    .browser-setup-guide {
      padding: 12px;
      font-size: 0.85em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
    }
    .browser-setup-steps {
      margin: 8px 0 8px 1.25em;
      padding-left: 1em;
    }
    .browser-setup-steps li {
      margin: 6px 0;
    }
    .browser-setup-steps pre {
      margin-top: 6px;
    }
    .browser-code {
      background: var(--code-editor-background, #1e1e1e);
      color: var(--token-color-text, #d4d4d4);
      padding: 8px;
      border-radius: 4px;
      font-size: 0.9em;
      margin: 8px 0;
      overflow-x: auto;
      white-space: pre;
    }
    .browser-setup-link {
      color: var(--primary-color, #4ade80);
      text-decoration: none;
    }
    .browser-setup-link:hover {
      text-decoration: underline;
    }
    .weather-url-row {
      min-width: 0;
      width: 100%;
    }
    .browser-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 4px;
      padding: 8px;
    }
    .browser-item {
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
      border: 2px solid transparent;
      text-align: center;
    }
    .browser-item:hover {
      border-color: var(--primary-color, #4ade80);
    }
    .browser-item--selected {
      border-color: var(--primary-color, #4ade80);
      background: var(--primary-color-light, rgba(74, 222, 128, 0.12));
    }
    .browser-item img {
      width: 100%;
      height: 60px;
      object-fit: cover;
      display: block;
    }
    .browser-name {
      font-size: 0.7em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      padding: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
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
    .weather-state-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
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
M([
  De({ attribute: !1 })
], P.prototype, "hass", 2);
M([
  F()
], P.prototype, "config", 2);
M([
  F()
], P.prototype, "pending", 2);
M([
  F()
], P.prototype, "previewMode", 2);
M([
  F()
], P.prototype, "selectedNodeId", 2);
M([
  F()
], P.prototype, "selectedNodeIds", 2);
M([
  F()
], P.prototype, "selectedFlowId", 2);
M([
  F()
], P.prototype, "selectedOverlayId", 2);
M([
  F()
], P.prototype, "customConfigDraft", 2);
M([
  F()
], P.prototype, "customConfigError", 2);
M([
  F()
], P.prototype, "errorMessage", 2);
M([
  F()
], P.prototype, "inlineRename", 2);
M([
  F()
], P.prototype, "canUndo", 2);
M([
  F()
], P.prototype, "canRedo", 2);
M([
  F()
], P.prototype, "undoLabel", 2);
M([
  F()
], P.prototype, "redoLabel", 2);
M([
  F()
], P.prototype, "suggestPreview", 2);
M([
  F()
], P.prototype, "suggestBusy", 2);
M([
  F()
], P.prototype, "flowEndpointPathfindingFlowId", 2);
M([
  F()
], P.prototype, "flowEndpointError", 2);
M([
  F()
], P.prototype, "flowZeroThresholdDraft", 2);
M([
  F()
], P.prototype, "flowInspectorAdvancedOpen", 2);
M([
  F()
], P.prototype, "imageBrowserOpen", 2);
M([
  F()
], P.prototype, "imageBrowserLoading", 2);
M([
  F()
], P.prototype, "imageBrowserError", 2);
M([
  F()
], P.prototype, "imageBrowserField", 2);
M([
  F()
], P.prototype, "imageBrowserWeatherState", 2);
M([
  F()
], P.prototype, "imageBrowserFiles", 2);
M([
  F()
], P.prototype, "selectorType", 2);
M([
  F()
], P.prototype, "savedConfig", 2);
M([
  F()
], P.prototype, "scale", 2);
M([
  F()
], P.prototype, "panX", 2);
M([
  F()
], P.prototype, "panY", 2);
M([
  F()
], P.prototype, "sceneW", 2);
M([
  F()
], P.prototype, "sceneH", 2);
M([
  F()
], P.prototype, "sceneReady", 2);
P = M([
  Ft("flowme-card-editor")
], P);
var hr = Object.defineProperty, fr = Object.getOwnPropertyDescriptor, j = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? fr(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && hr(e, i, n), n;
};
const ho = "2.5";
console.info("%cFlowMe v" + ho + " loaded", "color: #FF6B00; font-weight: bold");
const Li = 5e3;
function gr(t) {
  if (!t) return "";
  const e = [], i = (o, n) => {
    const s = t[o];
    s !== void 0 && e.push(`${n}:${s};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), e.join("");
}
function mr(t) {
  if (!t) return "";
  const e = [], i = (o, n) => {
    t[o] === !1 && e.push(`${n}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), e.join("");
}
let U = class extends re {
  constructor() {
    super(...arguments), this._connectionAwaitingReconnect = !1, this._boundHaConnection = null, this.onHaConnectionReady = () => {
      this.onReconnect();
    }, this.onHaConnectionDisconnected = () => {
      this._connectionAwaitingReconnect = !0;
    }, this._visibilityListenerAttached = !1, this._documentVisibilityPauseActive = !1, this._visibilityHandler = () => {
      this.syncAnimationsToDocumentVisibility();
    }, this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = X(), this.nodeFxSvgRef = X(), this.nodeFx = new ao(), this._nodeFxRaf = null, this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this.onOverlayKeydown = (t, e) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleOverlayTap(e));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(t) {
    const e = this._hass;
    if (this._hass = t, t && t.language !== this._lastLanguage && (this._lastLanguage = t.language, Zi(t.language)), t) {
      const i = this.config, o = [
        ...i?.flows.map((l) => l.entity) ?? [],
        ...i?.flows.map((l) => l.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((l) => l.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((l) => typeof l == "string" && l.length > 0), n = {};
      for (const l of o)
        n[l] = t.states[l]?.state;
      S("hass setter called. config entity states:", n);
      const s = i?.background.weather_entity;
      if (s) {
        const l = e?.states[s]?.state, d = t.states[s]?.state;
        S("[weather] state:", d, "(was:", l, ")"), l !== d && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const l = e?.states[r]?.state, d = t.states[r]?.state;
        l !== d && (S("[sun] state changed:", l, "→", d), this.syncWeatherBackground());
      }
      const a = t.connection;
      this.bindHaConnection(a);
    } else
      S("hass setter called with undefined"), this.bindHaConnection(void 0), e && this.showToast(c("card.connectionLost"));
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
        S("first paint:", performance.now());
      });
    });
  }
  setConfig(t) {
    se(qi(t));
    const e = performance.now();
    S("setConfig start:", e);
    try {
      const i = $e(t);
      se(i.debug ?? !1), S("setConfig called:", JSON.parse(JSON.stringify(t ?? null))), S(
        "setConfig validated → flows=",
        i.flows.length,
        "nodes=",
        i.nodes.length,
        "overlays=",
        i.overlays?.length ?? 0,
        "card",
        ho
      );
      const o = this.config, n = !!o && !!this.renderer && this.needsRendererReinit(o, i);
      if (!!this.renderer && !!o && !n && typeof this.renderer.applyConfig == "function") {
        this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(o, i), this.renderer.applyConfig(i), this.rendererReadyFor = i, this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
        {
          const r = performance.now();
          S("teardown complete:", r, "(skipped — applyConfig)"), S("renderer init start:", r, "(skipped — applyConfig)"), S("renderer init complete:", r, "(skipped — applyConfig)");
        }
        this.logFirstPaint();
        return;
      }
      this.renderer && n ? (this.teardownRenderer(), S("teardown complete:", performance.now())) : S("teardown complete:", performance.now(), "(skipped)"), this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(o, i), this.logFirstPaint();
    } catch (i) {
      se(!1);
      const o = i instanceof Bt ? i.message : String(i);
      this.config = void 0, this.errorMessage = o, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.syncPauseWhenHiddenListener(), S("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    S("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), S("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
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
    S("renderer init start:", performance.now()), this.teardownRenderer(), this.renderer = Un(), this.rendererReadyFor = this.config;
    const e = this.config;
    this.renderer.init(t, e).then(() => {
      S("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
    }).catch((i) => {
      S("renderer init failed — falling back to SVG renderer", i), this.teardownRenderer(), this.renderer = new Ke(), this.rendererReadyFor = e, this.renderer.init(t, e).then(() => {
        S("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
      }).catch((o) => {
        console.error("[flowme] SVG renderer init also failed", o);
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
      S("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (let t = 0; t < this.config.flows.length; t++) {
        const e = this.config.flows[t], i = this.hass.states[e.entity], o = xe(i?.state), n = W(e.domain ?? this.config.domain), s = i?.attributes?.unit_of_measurement, r = Xt(o, s, n.unit_scale);
        if (S(
          "updateFlow →",
          e.id,
          "entity=",
          e.entity,
          "raw=",
          i?.state,
          "parsed=",
          o,
          "sensorUnit=",
          s ?? "(none)",
          "matchedUnit=",
          r.matchedUnit ?? "(none → passthrough)",
          "factor=",
          r.factor,
          "scaledToBase(" + n.unit_label + ")=",
          r.value
        ), i) {
          if (i.state === "unavailable" || i.state === "unknown") {
            const a = `${e.id}:${e.entity}:unavailable`;
            this.warnedMissing.has(a) || (this.warnedMissing.add(a), S(`flow "${e.id}" entity "${e.entity}" is currently ${i.state} — no flow will render until it reports a number`));
          }
        } else {
          const a = `${e.id}:${e.entity}`;
          this.warnedMissing.has(a) || (this.warnedMissing.add(a), S(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(e.id, r.value), e.value_gradient && this.renderer.setGradientColor) {
          const a = e.value_gradient.entity, l = this.hass.states[a];
          if (l && l.state !== "unavailable" && l.state !== "unknown") {
            const d = parseFloat(l.state);
            if (Number.isFinite(d)) {
              const p = e.value_gradient, h = Math.max(p.low_value, Math.min(p.high_value, d)), u = oo(d, p);
              S(
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
              S(`flow "${e.id}" gradient entity "${a}" state "${l.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            S(`flow "${e.id}" gradient entity "${a}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
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
    const o = xe(e.state), n = e.attributes?.unit_of_measurement ?? "", s = Xt(o, n, i.unit_scale);
    return n ? `${this.formatSensorNumber(s.value)} ${n}` : i.describe(s.value);
  }
  formatFlowAriaLabel(t) {
    return c("aria.flowGroup", O(t), this.describeFlowReading(t));
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
    const t = st(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / t) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const t = st(this.config?.aspect_ratio) ?? 1.6;
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
    const i = `${1 / (st(t.aspect_ratio) ?? 16 / 10) * 100}%`, o = t.background.transition_duration ?? Li, n = gr(t.opacity), s = mr(t.visibility), r = !!t.background.default;
    return y`
      <ha-card
        role="region"
        aria-label=${c("aria.card")}
        style=${r ? "" : "background: transparent;"}
      >
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
          <div class="renderer-mount" ${q(this.rendererMount)}></div>
          <svg
            class="node-effects-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            ${q(this.nodeFxSvgRef)}
          ></svg>
          ${t.nodes.map((a) => this.renderNodeHandle(a))}
          ${(t.overlays ?? []).map((a) => (S("rendering overlay →", a.type, "position=", a.position, "size=", a.size), Vn(a, this.hass, {
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
        const i = e.state, o = t.sun_entity ? this.hass.states[t.sun_entity]?.state : void 0, n = Jo(i, o, t.weather_states, t.default);
        let s = i;
        return o === "below_horizon" && !i.endsWith("-night") && (s = `${i}-night`), S("[FlowMe] sun:", o, "weather:", i, "→ lookup key:", s, "→ image:", n !== t.default ? n : "default"), n;
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
    const e = this.config.background.transition_duration ?? Li;
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
    let a = "";
    if (e) {
      const d = xe(e.state), p = e.attributes?.unit_of_measurement ?? "";
      p ? a = `${this.formatSensorNumber(d)} ${p}` : a = n.describe(d);
    }
    const l = t.visible === !1;
    return y`
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
        ${o ? y`<span class="node-label">${t.label}</span>` : null}
        ${i ? y`<span class="node-value">${a}</span>` : null}
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
      const a = W(r.domain ?? e), l = fe(r, a, r.domain ?? e, 1, i, s), d = l.toLowerCase();
      n.has(d) || (n.add(d), o || (o = l));
    }
    if (n.size !== 0)
      return n.size === 1 ? o : ro;
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
U.styles = St`
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
      z-index: 0;
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
      z-index: 2;
    }
    .node-effects-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 3;
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
  De({ attribute: !1 })
], U.prototype, "hass", 1);
j([
  F()
], U.prototype, "config", 2);
j([
  F()
], U.prototype, "errorMessage", 2);
j([
  F()
], U.prototype, "toastVisible", 2);
j([
  F()
], U.prototype, "toastMessage", 2);
j([
  F()
], U.prototype, "bgLayerA", 2);
j([
  F()
], U.prototype, "bgLayerB", 2);
j([
  F()
], U.prototype, "activeLayer", 2);
U = j([
  Ft("flowme-card")
], U);
const _t = window;
_t.customCards = _t.customCards ?? [];
_t.customCards.push({
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
