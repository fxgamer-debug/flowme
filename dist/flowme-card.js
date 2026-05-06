/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = globalThis, At = Ge.ShadowRoot && (Ge.ShadyCSS === void 0 || Ge.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let Wi = class {
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
const bo = (t) => new Wi(typeof t == "string" ? t : t + "", void 0, Ct), St = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, n, s) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new Wi(i, t, Ct);
}, yo = (t, e) => {
  if (At) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), n = Ge.litNonce;
    n !== void 0 && o.setAttribute("nonce", n), o.textContent = i.cssText, t.appendChild(o);
  }
}, Lt = At ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return bo(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vo, defineProperty: wo, getOwnPropertyDescriptor: xo, getOwnPropertyNames: $o, getOwnPropertySymbols: _o, getPrototypeOf: Ao } = Object, ee = globalThis, Tt = ee.trustedTypes, Co = Tt ? Tt.emptyScript : "", So = ee.reactiveElementPolyfillSupport, _e = (t, e) => t, Ve = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Co : null;
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
} }, kt = (t, e) => !vo(t, e), Ot = { attribute: !0, type: String, converter: Ve, reflect: !1, useDefault: !1, hasChanged: kt };
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
      n !== void 0 && wo(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: n, set: s } = xo(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const c = n?.call(this);
      s?.call(this, r), this.requestUpdate(e, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_e("elementProperties"))) return;
    const e = Ao(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_e("properties"))) {
      const i = this.properties, o = [...$o(i), ..._o(i)];
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
      for (const n of o) i.unshift(Lt(n));
    } else e !== void 0 && i.push(Lt(e));
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
    return yo(e, this.constructor.elementStyles), e;
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
      const c = r.fromAttribute(i, s.type);
      this[n] = c ?? this._$Ej?.get(n) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, n = !1, s) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (s = this[e]), o ?? (o = r.getPropertyOptions(e)), !((o.hasChanged ?? kt)(s, i) || o.useDefault && o.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, o)))) return;
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
        const { wrapped: r } = s, c = this[n];
        r !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, s, c);
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
pe.elementStyles = [], pe.shadowRootOptions = { mode: "open" }, pe[_e("elementProperties")] = /* @__PURE__ */ new Map(), pe[_e("finalized")] = /* @__PURE__ */ new Map(), So?.({ ReactiveElement: pe }), (ee.reactiveElementVersions ?? (ee.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, Ht = (t) => t, Ye = Ae.trustedTypes, Wt = Ye ? Ye.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Gi = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, Ui = "?" + Q, ko = `<${Ui}>`, ae = document, Ie = () => ae.createComment(""), Fe = (t) => t === null || typeof t != "object" && typeof t != "function", It = Array.isArray, Io = (t) => It(t) || typeof t?.[Symbol.iterator] == "function", tt = `[ 	
\f\r]`, ye = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gt = /-->/g, Ut = />/g, ie = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kt = /'/g, jt = /"/g, Ki = /^(?:script|style|textarea|title)$/i, ji = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), y = ji(1), Vt = ji(2), ue = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), ne = ae.createTreeWalker(ae, 129);
function Vi(t, e) {
  if (!It(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wt !== void 0 ? Wt.createHTML(e) : e;
}
const Fo = (t, e) => {
  const i = t.length - 1, o = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = ye;
  for (let c = 0; c < i; c++) {
    const a = t[c];
    let d, p, h = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, p = r.exec(a), p !== null); ) u = r.lastIndex, r === ye ? p[1] === "!--" ? r = Gt : p[1] !== void 0 ? r = Ut : p[2] !== void 0 ? (Ki.test(p[2]) && (n = RegExp("</" + p[2], "g")), r = ie) : p[3] !== void 0 && (r = ie) : r === ie ? p[0] === ">" ? (r = n ?? ye, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? ie : p[3] === '"' ? jt : Kt) : r === jt || r === Kt ? r = ie : r === Gt || r === Ut ? r = ye : (r = ie, n = void 0);
    const f = r === ie && t[c + 1].startsWith("/>") ? " " : "";
    s += r === ye ? a + ko : h >= 0 ? (o.push(d), a.slice(0, h) + Gi + a.slice(h) + Q + f) : a + Q + (h === -2 ? c : f);
  }
  return [Vi(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Pe {
  constructor({ strings: e, _$litType$: i }, o) {
    let n;
    this.parts = [];
    let s = 0, r = 0;
    const c = e.length - 1, a = this.parts, [d, p] = Fo(e, i);
    if (this.el = Pe.createElement(d, o), ne.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = ne.nextNode()) !== null && a.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Gi)) {
          const u = p[r++], f = n.getAttribute(h).split(Q), g = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: s, name: g[2], strings: f, ctor: g[1] === "." ? Mo : g[1] === "?" ? Bo : g[1] === "@" ? No : Je }), n.removeAttribute(h);
        } else h.startsWith(Q) && (a.push({ type: 6, index: s }), n.removeAttribute(h));
        if (Ki.test(n.tagName)) {
          const h = n.textContent.split(Q), u = h.length - 1;
          if (u > 0) {
            n.textContent = Ye ? Ye.emptyScript : "";
            for (let f = 0; f < u; f++) n.append(h[f], Ie()), ne.nextNode(), a.push({ type: 2, index: ++s });
            n.append(h[u], Ie());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ui) a.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(Q, h + 1)) !== -1; ) a.push({ type: 7, index: s }), h += Q.length - 1;
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
class Po {
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
    let s = ne.nextNode(), r = 0, c = 0, a = o[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new Re(s, s.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (d = new Eo(s, this, e)), this._$AV.push(d), a = o[++c];
      }
      r !== a?.index && (s = ne.nextNode(), r++);
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
    e = he(this, e, i), Fe(e) ? e === A || e == null || e === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : e !== this._$AH && e !== ue && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Io(e) ? this.k(e) : this._(e);
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
    const { values: i, _$litType$: o } = e, n = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Pe.createElement(Vi(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const s = new Po(n, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Yt.get(e.strings);
    return i === void 0 && Yt.set(e.strings, i = new Pe(e)), i;
  }
  k(e) {
    It(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, n = 0;
    for (const s of e) n === i.length ? i.push(o = new Re(this.O(Ie()), this.O(Ie()), this, this.options)) : o = i[n], o._$AI(s), n++;
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
      const c = e;
      let a, d;
      for (e = s[0], a = 0; a < s.length - 1; a++) d = he(this, c[o + a], i, a), d === ue && (d = this._$AH[a]), r || (r = !Fe(d) || d !== this._$AH[a]), d === A ? e = A : e !== A && (e += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Mo extends Je {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === A ? void 0 : e;
  }
}
class Bo extends Je {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== A);
  }
}
class No extends Je {
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
class Eo {
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
const Ro = Ae.litHtmlPolyfillSupport;
Ro?.(Pe, Re), (Ae.litHtmlVersions ?? (Ae.litHtmlVersions = [])).push("3.3.2");
const Do = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let n = o._$litPart$;
  if (n === void 0) {
    const s = i?.renderBefore ?? null;
    o._$litPart$ = n = new Re(e.insertBefore(Ie(), s), s, void 0, i ?? {});
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Do(i, this.renderRoot, this.renderOptions);
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
const zo = Ce.litElementPolyfillSupport;
zo?.({ LitElement: re });
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
const Lo = { attribute: !0, type: String, converter: Ve, reflect: !1, hasChanged: kt }, To = (t = Lo, e, i) => {
  const { kind: o, metadata: n } = i;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), o === "accessor") {
    const { name: r } = i;
    return { set(c) {
      const a = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(r, a, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, t, c), c;
    } };
  }
  if (o === "setter") {
    const { name: r } = i;
    return function(c) {
      const a = this[r];
      e.call(this, c), this.requestUpdate(r, a, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function De(t) {
  return (e, i) => typeof i == "object" ? To(t, e, i) : ((o, n, s) => {
    const r = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, o), r ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(t) {
  return De({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oo = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ho = { CHILD: 2 }, Wo = (t) => (...e) => ({ _$litDirective$: t, values: e });
class Go {
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
}, Yi = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), jo(e);
  }
};
function Uo(t) {
  this._$AN !== void 0 ? (Ze(this), this._$AM = t, Yi(this)) : this._$AM = t;
}
function Ko(t, e = !1, i = 0) {
  const o = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(o)) for (let s = i; s < o.length; s++) Se(o[s], !1), Ze(o[s]);
  else o != null && (Se(o, !1), Ze(o));
  else Se(this, t);
}
const jo = (t) => {
  t.type == Ho.CHILD && (t._$AP ?? (t._$AP = Ko), t._$AQ ?? (t._$AQ = Uo));
};
class Vo extends Go {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, o) {
    super._$AT(e, i, o), Yi(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), i && (Se(this, e), Ze(this));
  }
  setValue(e) {
    if (Oo(this._$Ct)) this._$Ct._$AI(e, this);
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
const V = () => new Yo();
class Yo {
}
const it = /* @__PURE__ */ new WeakMap(), Y = Wo(class extends Vo {
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
function Zi(t) {
  if (t == null || typeof t != "string") return "energy";
  const e = t.trim().toLowerCase();
  return Me.includes(e) ? e : "energy";
}
const gt = ["corner", "diagonal", "curve", "smooth"], mt = ["dots", "dash", "arrow", "trail", "fluid", "none"], bt = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], yt = ["auto", "forward", "reverse", "both"], vt = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], Zo = {
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
      browserSetupDocs: "View setup guide",
      weatherEffects: "Weather effects",
      weatherEffectsHelper: "Animate weather conditions with CSS overlays. Not recommended with animated backgrounds on low-powered devices."
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
let Xi = {};
function ot(t) {
  Xi = t;
}
function qi(t) {
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
function l(t, ...e) {
  const i = t.split(".");
  let o = Xi;
  for (const n of i)
    if (o && typeof o == "object")
      o = o[n];
    else {
      o = void 0;
      break;
    }
  if (o === void 0) {
    o = Zo;
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
const Xo = ["javascript:", "vbscript:", "data:", "file:"];
function Ji(t, e = "card_config") {
  const i = [], o = /* @__PURE__ */ new WeakSet(), n = (s, r) => {
    if (s != null) {
      if (typeof s == "string") {
        const c = s.trim().toLowerCase();
        for (const a of Xo)
          if (c.startsWith(a)) {
            i.push({ path: r, value: s, scheme: a });
            return;
          }
        return;
      }
      if (typeof s == "object" && !o.has(s)) {
        if (o.add(s), Array.isArray(s)) {
          for (let c = 0; c < s.length; c++) n(s[c], `${r}[${c}]`);
          return;
        }
        for (const [c, a] of Object.entries(s))
          n(a, `${r}.${c}`);
      }
    }
  };
  return n(t, e), i;
}
function qo(t, e = "card_config") {
  const i = Ji(t, e);
  if (i.length === 0) return;
  const o = i[0];
  throw new Error(l("security.unsafeUrlInCard", o.scheme, o.path));
}
const Jo = "[FlowMe]";
let Pt = !1;
function se(t) {
  Pt = t;
}
function Qi(t) {
  return !!(t && typeof t == "object" && t.debug === !0);
}
function k(...t) {
  Pt && console.warn(Jo, ...t);
}
function eo() {
  return Pt;
}
function H(t) {
  const e = t.label?.trim();
  return e && e.length > 0 ? e : t.id;
}
function to(t, e = 2e3) {
  return new Promise((i) => {
    let o = 0, n = 0, s = 0;
    const r = 2;
    let c = !1;
    const a = { id: void 0 }, d = (h) => {
      c || (c = !0, a.id !== void 0 && window.clearTimeout(a.id), p.disconnect(), i(h));
    }, p = new ResizeObserver((h) => {
      const u = h[0];
      if (!u) return;
      const { width: f, height: g } = u.contentRect;
      f === o && g === n && f > 0 && g > 0 ? (s++, s >= r && d(u.contentRect)) : (s = 0, o = f, n = g);
    });
    p.observe(t), a.id = window.setTimeout(() => {
      d(t.getBoundingClientRect());
    }, e);
  });
}
function io(t) {
  return new Promise((e) => {
    const i = new ResizeObserver((n) => {
      const s = n[0];
      if (!s) return;
      const { width: r, height: c } = s.contentRect;
      r > 0 && c > 0 && (i.disconnect(), e());
    });
    i.observe(t);
    const o = t.getBoundingClientRect();
    o.width > 0 && o.height > 0 && (i.disconnect(), e());
  });
}
function Qo(t, e, i) {
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
    const c = Be(t[0], e);
    return `M ${c.x.toFixed(2)} ${c.y.toFixed(2)}`;
  }
  const o = t.map((c) => Be(c, e));
  if (i === "diagonal") {
    const c = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let a = 1; a < o.length; a++)
      c.push(`L ${o[a].x.toFixed(2)} ${o[a].y.toFixed(2)}`);
    return c.join(" ");
  }
  if (i === "corner") {
    const c = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let a = 1; a < o.length; a++) {
      const d = o[a - 1], p = o[a];
      c.push(`L ${p.x.toFixed(2)} ${d.y.toFixed(2)}`), c.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    }
    return c.join(" ");
  }
  if (i === "curve") {
    const c = o.length, a = [
      { x: 2 * o[0].x - o[1].x, y: 2 * o[0].y - o[1].y },
      ...o,
      { x: 2 * o[c - 1].x - o[c - 2].x, y: 2 * o[c - 1].y - o[c - 2].y }
    ], d = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
    for (let p = 1; p < c; p++) {
      const h = a[p - 1], u = a[p], f = a[p + 1], g = a[p + 2], b = u.x + (f.x - h.x) / 6, v = u.y + (f.y - h.y) / 6, m = f.x - (g.x - u.x) / 6, $ = f.y - (g.y - u.y) / 6;
      d.push(`C ${b.toFixed(2)} ${v.toFixed(2)} ${m.toFixed(2)} ${$.toFixed(2)} ${f.x.toFixed(2)} ${f.y.toFixed(2)}`);
    }
    return d.join(" ");
  }
  const n = 0.3, s = 20, r = [`M ${o[0].x.toFixed(2)} ${o[0].y.toFixed(2)}`];
  for (let c = 1; c < o.length; c++) {
    const a = o[c - 1], d = o[c], p = o[c + 1];
    if (!p) {
      r.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
      continue;
    }
    const h = Math.sqrt((d.x - a.x) ** 2 + (d.y - a.y) ** 2), u = Math.sqrt((p.x - d.x) ** 2 + (p.y - d.y) ** 2), f = Math.min(Math.min(h, u) * n, s), g = f / (h || 1), b = d.x - (d.x - a.x) * g, v = d.y - (d.y - a.y) * g, m = f / (u || 1), $ = d.x + (p.x - d.x) * m, _ = d.y + (p.y - d.y) * m;
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
const nt = 1e4, Ue = 100, ke = 1e-3, Ee = 2e-3;
function Mt(t, e) {
  const i = Ne(t), o = Math.min(e.minDur, e.maxDur), n = Math.max(e.minDur, e.maxDur);
  if (!(Number.isFinite(o) && Number.isFinite(n)) || n <= 0 || o <= 0)
    return Math.max(50, Ue);
  const s = e.peak;
  if (!(s > 0) || !Number.isFinite(s))
    return n;
  if (e.zeroThresholdEnabled && e.zeroThreshold !== void 0) {
    const a = Number.isFinite(e.zeroThreshold) && e.zeroThreshold > 0 && e.zeroThreshold <= 1 ? e.zeroThreshold : Ee;
    if (Math.min(1, Math.abs(i) / s) < a)
      return n;
  } else if (Math.abs(i) < ke)
    return n;
  const r = Math.min(1, Math.abs(i) / s), c = n - r * (n - o);
  return !Number.isFinite(c) || c <= 0 ? o : Math.min(Math.max(c, o), n);
}
function oo(t, e, i) {
  let o;
  if (e.zeroThresholdEnabled && e.zeroThreshold !== void 0)
    if (!(e.peak > 0) || !Number.isFinite(e.peak))
      o = Math.abs(t) < ke;
    else {
      const n = Math.min(1, Math.abs(t) / e.peak), s = Number.isFinite(e.zeroThreshold) && e.zeroThreshold > 0 && e.zeroThreshold <= 1 ? e.zeroThreshold : Ee;
      o = n < s;
    }
  else
    o = Math.abs(t) < ke;
  if (i?.flowId) {
    const n = e.peak > 0 && Number.isFinite(e.peak) ? Math.min(1, Math.abs(t) / e.peak).toFixed(6) : "(n/a)";
    k(
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
      ke,
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
  const o = t.speed_curve_override ?? {}, n = i?.defaults, s = typeof t.peak_value == "number" && t.peak_value > 0 ? t.peak_value : void 0, r = typeof o.peak == "number" && o.peak > 0 ? o.peak : void 0, c = typeof n?.peak_value == "number" && n.peak_value > 0 ? n.peak_value : void 0, a = e.peak > 0 ? e.peak : 1, d = s ?? r ?? c ?? a;
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
    const [r, c] = s[0];
    return { value: t * c, factor: c, matchedUnit: r };
  }
  return { value: t, factor: 1 };
}
function no(t, e) {
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
function en(t, e, i, o) {
  if (!i) return o;
  const n = e === "below_horizon";
  let s = t;
  n && !t.endsWith("-night") && (s = `${t}-night`);
  const r = i[s];
  if (r) return r;
  if (n && s !== "clear-night") {
    const c = i["clear-night"];
    if (c) return c;
  }
  if (s !== t) {
    const c = i[t];
    if (c) return c;
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
  const o = t / 255, n = e / 255, s = i / 255, r = Math.max(o, n, s), c = Math.min(o, n, s), a = (r + c) / 2;
  if (r === c) return [0, 0, a];
  const d = r - c, p = a > 0.5 ? d / (2 - r - c) : d / (r + c);
  let h;
  return r === o ? h = (n - s) / d + (n < s ? 6 : 0) : r === n ? h = (s - o) / d + 2 : h = (o - n) / d + 4, [h * 60, p, a];
}
function rt(t, e, i) {
  let o = i;
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? t + (e - t) * 6 * o : o < 1 / 2 ? e : o < 2 / 3 ? t + (e - t) * (2 / 3 - o) * 6 : t;
}
function tn(t, e, i) {
  const o = t / 360;
  let n, s, r;
  if (e === 0)
    n = s = r = i;
  else {
    const a = i < 0.5 ? i * (1 + e) : i + e - i * e, d = 2 * i - a;
    n = rt(d, a, o + 1 / 3), s = rt(d, a, o), r = rt(d, a, o - 1 / 3);
  }
  const c = (a) => Math.round(a * 255).toString(16).padStart(2, "0");
  return `#${c(n)}${c(s)}${c(r)}`;
}
function so(t, e) {
  const i = e.high_value - e.low_value, o = i === 0 ? 0 : Math.max(0, Math.min(1, (t - e.low_value) / i)), [n, s, r] = qt(e.low_color), [c, a, d] = qt(e.high_color), [p, h, u] = Jt(n, s, r), [f, g, b] = Jt(c, a, d);
  let v = f - p;
  v > 180 && (v -= 360), v < -180 && (v += 360);
  const m = (p + v * o + 360) % 360, $ = Zt(h, g, o), _ = Zt(u, b, o);
  return tn(m, $, _);
}
function ro() {
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
  (!t || typeof t != "object") && w(e, l("validation.mustBeObjectWithXY"));
  const i = t, o = i.x, n = i.y;
  (typeof o != "number" || !Number.isFinite(o)) && w(`${e}.x`, l("validation.mustBeFiniteNumber")), (typeof n != "number" || !Number.isFinite(n)) && w(`${e}.y`, l("validation.mustBeFiniteNumber"));
  const s = o, r = n;
  return (s < 0 || s > 100) && w(`${e}.x`, l("validation.percentRange", s)), (r < 0 || r > 100) && w(`${e}.y`, l("validation.percentRange", r)), { x: s, y: r };
}
function ei(t, e) {
  (typeof t != "string" || !t.length) && w(e, l("validation.mustBeNonEmptyString"));
  const i = t;
  return Qt.some((n) => i.startsWith(n)) || w(e, l("validation.urlMustStartWith", Qt.join(", "), i.slice(0, 40))), i;
}
function on(t, e, i) {
  const o = `nodes[${e}]`;
  (!t || typeof t != "object") && w(o, l("validation.mustBeObject"));
  const n = t, s = n.id;
  (typeof s != "string" || !s.length) && w(`${o}.id`, l("validation.mustBeNonEmptyId"));
  const r = s;
  i.has(r) && w(`${o}.id`, l("validation.duplicateNodeId", r)), i.add(r);
  const c = Nt(n.position, `${o}.position`), a = { id: r, position: c };
  if (typeof n.entity == "string" && (a.entity = n.entity), typeof n.label == "string" && (a.label = n.label), typeof n.color == "string" && (a.color = n.color), typeof n.size == "number" && (a.size = n.size), typeof n.show_label == "boolean" && (a.show_label = n.show_label), typeof n.show_value == "boolean" && (a.show_value = n.show_value), n.opacity !== void 0 && (a.opacity = Et(n.opacity, `${o}.opacity`)), n.visible !== void 0 && (typeof n.visible != "boolean" && w(`${o}.visible`, l("validation.mustBeBoolean")), a.visible = n.visible), n.node_effect !== void 0) {
    const d = n.node_effect;
    d && typeof d == "object" && d.type === "pulse" ? k(`${o}.node_effect: type "pulse" is no longer supported; removing node_effect`) : a.node_effect = nn(d, `${o}.node_effect`);
  }
  return a;
}
function nn(t, e) {
  (!t || typeof t != "object") && w(e, l("validation.mustBeObject"));
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
    return n !== void 0 && n !== "above" && n !== "below" && w(`${e}.alert_condition`, l("validation.mustBeString")), {
      type: "alert",
      ...typeof i.alert_threshold == "number" ? { alert_threshold: i.alert_threshold } : {},
      ...n === "above" || n === "below" ? { alert_condition: n } : {},
      ...typeof i.alert_color == "string" ? { alert_color: i.alert_color } : {},
      ...typeof i.alert_frequency == "number" ? { alert_frequency: i.alert_frequency } : {},
      ...typeof i.alert_hysteresis == "number" ? { alert_hysteresis: i.alert_hysteresis } : {}
    };
  }
  w(`${e}.type`, l("validation.invalidNodeEffectType"));
}
function sn(t, e, i, o) {
  const n = `flows[${e}]`;
  (!t || typeof t != "object") && w(n, l("validation.mustBeObject"));
  const s = t, r = s.id;
  (typeof r != "string" || !r.length) && w(`${n}.id`, l("validation.mustBeNonEmptyId"));
  const c = r;
  i.has(c) && w(`${n}.id`, l("validation.duplicateFlowId", c)), i.add(c);
  const a = s.from_node;
  (typeof a != "string" || !o.has(a)) && w(`${n}.from_node`, l("validation.unknownNodeRef", String(a)));
  const d = s.to_node;
  (typeof d != "string" || !o.has(d)) && w(`${n}.to_node`, l("validation.unknownNodeRef", String(d)));
  const p = s.entity;
  (typeof p != "string" || !p.length) && w(`${n}.entity`, l("validation.mustBeNonEmptyEntityId"));
  const h = s.waypoints;
  let u = [];
  h !== void 0 && (Array.isArray(h) || w(`${n}.waypoints`, l("validation.waypointsMustBeArray")), u = h.map(
    (g, b) => Nt(g, `${n}.waypoints[${b}]`)
  ));
  const f = {
    id: c,
    from_node: a,
    to_node: d,
    entity: p,
    waypoints: u
  };
  if (s.label !== void 0) {
    const g = s.label;
    typeof g != "string" && w(`${n}.label`, l("validation.mustBeString"));
    const b = g.trim();
    b.length > 64 && w(`${n}.label`, l("validation.flowLabelMaxLen")), b.length > 0 && b !== c && (f.label = b);
  }
  if (typeof s.domain == "string" && (Me.includes(s.domain) || w(`${n}.domain`, l("validation.mustBeOneOf", Me.join(", "))), f.domain = s.domain), typeof s.color == "string" && (f.color = s.color), typeof s.color_positive == "string" && (f.color_positive = s.color_positive), typeof s.color_negative == "string" && (f.color_negative = s.color_negative), typeof s.threshold == "number" && (f.threshold = s.threshold), s.peak_value !== void 0 && (f.peak_value = J(s.peak_value, `${n}.peak_value`)), typeof s.reverse == "boolean" && (f.reverse = s.reverse), typeof s.speed_multiplier == "number") {
    const g = s.speed_multiplier;
    (g < 0.1 || g > 5) && w(`${n}.speed_multiplier`, l("validation.speedMultiplierRange")), f.speed_multiplier = g;
  }
  return s.opacity !== void 0 && (f.opacity = Et(s.opacity, `${n}.opacity`)), s.visible !== void 0 && (typeof s.visible != "boolean" && w(`${n}.visible`, l("validation.mustBeBoolean")), f.visible = s.visible), s.line_style !== void 0 && (gt.includes(s.line_style) || w(`${n}.line_style`, l("validation.mustBeOneOf", gt.join(", "))), f.line_style = s.line_style), s.speed_curve_override !== void 0 && (f.speed_curve_override = rn(
    s.speed_curve_override,
    `${n}.speed_curve_override`
  )), s.animation !== void 0 && (f.animation = cn(s.animation, `${n}.animation`)), s.value_gradient !== void 0 && (f.value_gradient = dn(s.value_gradient, `${n}.value_gradient`)), f;
}
function rn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, l("validation.mustBeObject"));
  const i = t, o = {};
  function n(u) {
    const f = i[u];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${e}.${u}`, l("validation.positiveFinite")), f;
  }
  function s(u) {
    const f = i[u];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${e}.${u}`, l("validation.durationPositive")), f;
  }
  const r = n("threshold");
  r !== void 0 && (o.threshold = r);
  const c = n("p50");
  c !== void 0 && (o.p50 = c);
  const a = n("peak");
  a !== void 0 && (o.peak = a);
  const d = s("max_duration");
  d !== void 0 && (o.max_duration = d);
  const p = s("min_duration");
  if (p !== void 0 && (o.min_duration = p), i.steepness !== void 0) {
    const u = i.steepness;
    (typeof u != "number" || !Number.isFinite(u) || u <= 0) && w(`${e}.steepness`, l("validation.positiveFinite")), o.steepness = u;
  }
  o.max_duration !== void 0 && o.min_duration !== void 0 && o.min_duration >= o.max_duration && w(e, l("validation.minLtMaxDuration"));
  const h = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const u of Object.keys(i))
    h.has(u) || w(`${e}.${u}`, l("validation.unknownKey", [...h].join(", ")));
  return o;
}
function J(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t <= 0) && w(e, l("validation.positiveFinite")), t;
}
function an(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("defaults", l("validation.defaultsMustBeObject"));
  const e = t, i = {};
  if (e.node_radius !== void 0 && (i.node_radius = J(e.node_radius, "defaults.node_radius")), e.burst_trigger_ratio !== void 0) {
    const o = J(e.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    o > 1 && w("defaults.burst_trigger_ratio", l("validation.burstTriggerMax1")), i.burst_trigger_ratio = o;
  }
  return e.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = J(e.burst_sustain_ms, "defaults.burst_sustain_ms")), e.burst_max_particles !== void 0 && (i.burst_max_particles = J(e.burst_max_particles, "defaults.burst_max_particles")), e.dot_radius !== void 0 && (i.dot_radius = J(e.dot_radius, "defaults.dot_radius")), e.line_width !== void 0 && (i.line_width = J(e.line_width, "defaults.line_width")), e.peak_value !== void 0 && (i.peak_value = J(e.peak_value, "defaults.peak_value")), i;
}
function Et(t, e) {
  return (typeof t != "number" || !Number.isFinite(t) || t < 0 || t > 1) && w(e, l("validation.opacity01")), t;
}
function ln(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("opacity", l("validation.mustBeObject"));
  const e = t, i = {};
  for (const o of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    e[o] !== void 0 && (i[o] = Et(e[o], `opacity.${o}`));
  return i;
}
function cn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, l("validation.mustBeObject"));
  const i = t, o = {};
  if (i.animation_style !== void 0) {
    let m = i.animation_style;
    (m === "pulse" || m === "spark") && (k(`${e}.animation_style '${String(m)}' was removed in v1.23.6 — using 'dots'`), m = "dots"), mt.includes(m) || w(`${e}.animation_style`, l("validation.mustBeOneOf", mt.join(", "))), o.animation_style = m;
  }
  i.particle_shape !== void 0 && (bt.includes(i.particle_shape) || w(`${e}.particle_shape`, l("validation.mustBeOneOf", bt.join(", "))), o.particle_shape = i.particle_shape), i.direction !== void 0 && (yt.includes(i.direction) || w(`${e}.direction`, l("validation.mustBeOneOf", yt.join(", "))), o.direction = i.direction), i.particle_spacing !== void 0 && (vt.includes(i.particle_spacing) || w(`${e}.particle_spacing`, l("validation.mustBeOneOf", vt.join(", "))), o.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && w(`${e}.custom_svg_path`, l("validation.mustBeSvgPathString")), i.custom_svg_path.length === 0 && k(`${e}.custom_svg_path is empty — will fall back to circle`), o.custom_svg_path = i.custom_svg_path);
  const n = (m, $) => {
    const _ = i[m];
    if (_ !== void 0)
      return (typeof _ != "number" || !Number.isFinite(_) || _ <= 0) && w(`${e}.${m}`, l("validation.positiveFinite")), $ !== void 0 && _ > $ && w(`${e}.${m}`, l("validation.mustBeAtMost", $)), _;
  }, s = (m) => {
    const $ = i[m];
    if ($ !== void 0)
      return typeof $ != "boolean" && w(`${e}.${m}`, l("validation.mustBeBoolean")), $;
  }, r = n("particle_size");
  if (r !== void 0 && (o.particle_size = r), i.particle_count !== void 0) {
    const m = i.particle_count;
    (typeof m != "number" || !Number.isFinite(m) || m < 1 || !Number.isInteger(m)) && w(`${e}.particle_count`, l("validation.particleCountInt")), o.particle_count = m;
  }
  if (i.glow_intensity !== void 0) {
    const m = i.glow_intensity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0) && w(`${e}.glow_intensity`, l("validation.glowNonNegative")), o.glow_intensity = m;
  }
  const c = s("shimmer");
  c !== void 0 && (o.shimmer = c);
  const a = s("flicker");
  a !== void 0 && (o.flicker = a);
  const d = n("trail_length");
  if (d !== void 0 && (o.trail_length = d), i.dash_gap !== void 0) {
    const m = i.dash_gap;
    (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 10) && w(`${e}.dash_gap`, l("validation.dashGapRange")), o.dash_gap = m;
  }
  const p = n("cluster_size");
  p !== void 0 && (o.cluster_size = Math.max(1, Math.round(p)));
  const h = n("cluster_gap");
  h !== void 0 && (o.cluster_gap = h);
  const u = n("pulse_frequency", 20);
  if (u !== void 0 && (o.pulse_frequency = u), i.pulse_ratio !== void 0) {
    const m = i.pulse_ratio;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m >= 1) && w(`${e}.pulse_ratio`, l("validation.pulseRatioRange")), o.pulse_ratio = m;
  }
  const f = n("wave_frequency", 20);
  f !== void 0 && (o.wave_frequency = f);
  const g = n("wave_amplitude");
  g !== void 0 && (o.wave_amplitude = g);
  let b, v;
  if (i.min_duration !== void 0) {
    const m = i.min_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && w(`${e}.min_duration`, l("validation.durationPositive")), m > 6e4 && w(`${e}.min_duration`, l("validation.mustBeAtMost", 6e4)), b = m, o.min_duration = b;
  }
  if (i.max_duration !== void 0) {
    const m = i.max_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && w(`${e}.max_duration`, l("validation.durationPositive")), m > 6e4 && w(`${e}.max_duration`, l("validation.mustBeAtMost", 6e4)), v = m, o.max_duration = v;
  }
  if (b !== void 0 && v !== void 0 && b >= v && (k(`${e}: min_duration >= max_duration — dropping both`), delete o.min_duration, delete o.max_duration), i.zero_threshold !== void 0) {
    const m = i.zero_threshold;
    typeof m == "number" && Number.isFinite(m) && m > 0 && m <= 1 ? o.zero_threshold = m : k(`${e}.zero_threshold invalid — using default`, Ee);
  }
  return o;
}
function ti(t, e) {
  return (typeof t != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) && w(e, l("validation.mustBeHexColor")), t;
}
function dn(t, e) {
  (!t || typeof t != "object" || Array.isArray(t)) && w(e, l("validation.mustBeObject"));
  const i = t;
  typeof i.entity != "string" && w(`${e}.entity`, l("validation.mustBeStringEntityId")), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && w(`${e}.low_value`, l("validation.finiteNumber")), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && w(`${e}.high_value`, l("validation.finiteNumber")), i.low_value >= i.high_value && k(`${e}: low_value should be less than high_value`);
  const o = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: ti(i.low_color, `${e}.low_color`),
    high_color: ti(i.high_color, `${e}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || w(`${e}.mode`, l("validation.gradientMode")), o.mode = i.mode), o;
}
function pn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("animation", l("validation.animationRootMustBeObject"));
  const e = t, i = {};
  if (e.fps !== void 0) {
    const o = e.fps;
    (typeof o != "number" || !Number.isFinite(o) || o < 1 || o > 120) && w("animation.fps", l("validation.fpsRange")), i.fps = o;
  }
  return e.smooth_speed !== void 0 && (typeof e.smooth_speed != "boolean" && w("animation.smooth_speed", l("validation.mustBeBoolean")), i.smooth_speed = e.smooth_speed), i;
}
function un(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("visibility", l("validation.visibilityRootMustBeObject"));
  const e = t, i = {};
  for (const o of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    e[o] !== void 0 && (typeof e[o] != "boolean" && w(`visibility.${o}`, l("validation.mustBeBoolean")), i[o] = e[o]);
  return i;
}
function hn(t) {
  (!t || typeof t != "object" || Array.isArray(t)) && w("domain_colors", l("validation.domainColorsRootMustBeObject"));
  const e = t, i = {};
  for (const o of ["solar", "grid", "battery", "load"])
    e[o] !== void 0 && (typeof e[o] != "string" && w(`domain_colors.${o}`, l("validation.stringColourValue")), i[o] = e[o]);
  return i;
}
function $e(t) {
  if (!t || typeof t != "object") throw new Bt(l("validation.configMustBeObject"));
  const e = t;
  e.type !== "custom:flowme-card" && w("type", l("validation.typeMustBeFlowme", String(e.type)));
  const i = e.domain, o = typeof i == "string" ? Zi(i) : "energy", n = e.background;
  n !== void 0 && (n === null || typeof n != "object") && w("background", l("validation.backgroundWhenProvided"));
  const s = n ?? {}, c = { default: s.default === void 0 || s.default === "" ? "" : ei(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && w("background.weather_entity", l("validation.mustBeStringEntityId")), c.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && w("background.weather_states", l("validation.weatherStatesMapping"));
    const b = Object.entries(s.weather_states), v = {};
    for (const [m, $] of b) {
      if ($ === "" || $ === void 0) {
        v[m] = "";
        continue;
      }
      typeof $ != "string" && w(`background.weather_states.${m}`, l("validation.mustBeString")), v[m] = ei($, `background.weather_states.${m}`);
    }
    c.weather_states = v;
  }
  s.sun_entity !== void 0 && (typeof s.sun_entity != "string" && w("background.sun_entity", l("validation.sunEntityExample")), c.sun_entity = s.sun_entity), s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && w("background.transition_duration", l("validation.transitionMustBeNumberMs")), c.transition_duration = s.transition_duration), s.weather_effects !== void 0 && (typeof s.weather_effects != "boolean" && w("background.weather_effects", l("validation.mustBeBoolean")), s.weather_effects && (c.weather_effects = !0));
  const a = e.nodes;
  Array.isArray(a) || w("nodes", l("validation.nodesMustBeArray"));
  const d = /* @__PURE__ */ new Set(), p = a.map((b, v) => on(b, v, d));
  p.length === 0 && w("nodes", l("validation.atLeastOneNode"));
  const h = e.flows;
  Array.isArray(h) || w("flows", l("validation.flowsMustBeArray"));
  const u = /* @__PURE__ */ new Set(), f = h.map(
    (b, v) => sn(b, v, u, d)
  ), g = {
    type: "custom:flowme-card",
    domain: o,
    background: c,
    nodes: p,
    flows: f
  };
  if (e.aspect_ratio !== void 0 && ((typeof e.aspect_ratio != "string" || !/^\d+:\d+$/.test(e.aspect_ratio)) && w("aspect_ratio", l("validation.aspectRatioRegex")), g.aspect_ratio = e.aspect_ratio), e.fullscreen !== void 0 && (typeof e.fullscreen != "boolean" && w("fullscreen", l("validation.mustBeBoolean")), g.fullscreen = e.fullscreen), e.edit_mode_password !== void 0 && (typeof e.edit_mode_password != "string" && w("edit_mode_password", l("validation.editPasswordMustBeString")), g.edit_mode_password = e.edit_mode_password), e.pause_when_hidden !== void 0 && (typeof e.pause_when_hidden != "boolean" && w("pause_when_hidden", l("validation.mustBeBoolean")), g.pause_when_hidden = e.pause_when_hidden), e.overlays !== void 0) {
    Array.isArray(e.overlays) || w("overlays", l("validation.overlaysMustBeArray"));
    const b = /* @__PURE__ */ new Set();
    g.overlays = e.overlays.map(
      (v, m) => fn(v, m, b)
    );
  }
  return e.defaults !== void 0 && (g.defaults = an(e.defaults)), e.domain_colors !== void 0 && (g.domain_colors = hn(e.domain_colors)), e.debug !== void 0 && (typeof e.debug != "boolean" && w("debug", l("validation.mustBeBoolean")), g.debug = e.debug), e.opacity !== void 0 && (g.opacity = ln(e.opacity)), e.visibility !== void 0 && (g.visibility = un(e.visibility)), e.animation !== void 0 && (g.animation = pn(e.animation)), g;
}
function fn(t, e, i) {
  const o = `overlays[${e}]`;
  (!t || typeof t != "object") && w(o, l("validation.mustBeObject"));
  const n = t, s = n.type, c = typeof s == "string" && ["camera", "switch", "sensor", "button"].includes(s);
  !c && s !== "custom" && w(`${o}.type`, l("validation.overlayTypeMustBeCustom"));
  const a = n.id;
  (typeof a != "string" || !a.length) && w(`${o}.id`, l("validation.mustBeNonEmptyId")), i.has(a) && w(`${o}.id`, l("validation.duplicateOverlayId", a)), i.add(a);
  const d = Nt(n.position, `${o}.position`);
  if (c) {
    const g = l("validation.migrationOverlayWarning", s);
    k(`${o}: ${g}`);
    const b = {
      id: a,
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
  (!p || typeof p != "object" || Array.isArray(p)) && w(`${o}.card`, l("validation.overlayCardMustBeObject"));
  const h = Ji(p, `${o}.card`);
  if (h.length) {
    const g = h[0];
    w(g.path, l("validation.unsafeSchemeInCard", g.scheme));
  }
  const f = {
    id: a,
    type: "custom",
    position: d,
    card: p
  };
  if (n.size !== void 0) {
    const g = n.size;
    (!g || typeof g != "object") && w(`${o}.size`, l("validation.overlaySizeMustBeObject"));
    const b = g, v = b.width, m = b.height;
    (typeof v != "number" || !Number.isFinite(v) || v <= 0 || v > 100) && w(`${o}.size.width`, l("validation.overlayWidthPercent")), (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m > 100) && w(`${o}.size.height`, l("validation.overlayHeightPercent")), f.size = { width: v, height: m };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && w(`${o}.visible`, l("validation.mustBeBoolean")), f.visible = n.visible), n.opacity !== void 0) {
    const g = n.opacity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 1) && w(`${o}.opacity`, l("validation.overlayOpacity01")), f.opacity = g;
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
function gn(t) {
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
function mn(t, e, i, o) {
  if (t === void 0) {
    k("colour resolution:", e, "domain:", "undefined", "matched role:", "none", "resolved:", void 0);
    return;
  }
  const n = t, s = qe[n] ?? qe.generic;
  let r;
  if (n === "energy") {
    if (r = gn(e), !r) {
      k("colour resolution:", e, "domain:", n, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (n === "generic") {
    if (r = ii(e, s), !r) {
      const d = Math.abs(o ?? 0) % s.roles.length, p = s.roles[d], h = ni(p, i);
      return k("colour resolution:", e, "domain:", n, "matched role:", "none (by index)", "resolved:", h), h;
    }
  } else if (r = ii(e, s), !r) {
    const d = oi(s, i);
    return k("colour resolution:", e, "domain:", n, "matched role:", "first", "resolved:", d), d;
  }
  const c = s.roles.find((d) => d.key === r);
  if (!c)
    return oi(s, i);
  const a = ni(c, i);
  return k("colour resolution:", e, "domain:", n, "matched role:", r, "resolved:", a), a;
}
const bn = {
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
}, yn = {
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
}, vn = {
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
}, wn = {
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
    return Qo(2 + e / 60, 2, 10);
  },
  describe(t) {
    return `${Math.round(t)} m³/h`;
  }
}, xn = {
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
}, ao = {
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
  energy: bn,
  water: yn,
  network: vn,
  hvac: wn,
  gas: xn,
  generic: ao
};
function U(t) {
  return t && t in si ? si[t] : ao;
}
const lo = "#CCCCCC", $n = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
function wt(t) {
  return typeof t == "string" && $n.test(t.trim()) ? t.trim() : "#FFFFFF";
}
function at(t) {
  return typeof t == "string" && t.trim() !== "" ? t.trim() : void 0;
}
function fe(t, e, i, o, n, s) {
  const r = at(t.color), c = mn(i, t.id, n, s), a = r ?? c;
  let d;
  return o >= 0 ? d = at(t.color_positive) ?? a ?? e.default_color_positive : d = at(t.color_negative) ?? a ?? e.default_color_negative, wt(d);
}
function _n(t) {
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
const An = 50, Cn = 500;
function Sn(t, e, i, o, n) {
  if (!i)
    return n.currentDurMs.set(t, e), lt(t, n), e;
  const s = n.currentDurMs.get(t) ?? e;
  if (Math.abs(e - s) < An)
    return n.currentDurMs.set(t, e), lt(t, n), e;
  n.interpTargetMs.get(t) !== e && (n.interpFromMs.set(t, s), n.interpTargetMs.set(t, e), n.interpStartMs.set(t, o));
  const c = n.interpFromMs.get(t) ?? e, a = n.interpTargetMs.get(t) ?? e, d = n.interpStartMs.get(t) ?? o, p = o - d, h = Math.min(p / Cn, 1), u = _n(h), f = c + (a - c) * u;
  return n.currentDurMs.set(t, f), h >= 1 ? (n.currentDurMs.set(t, a), lt(t, n), a) : f;
}
const kn = "[FlowMe Renderer]";
function ce(...t) {
  k(kn, ...t);
}
const B = "http://www.w3.org/2000/svg", j = "http://www.w3.org/1999/xlink";
function In() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const Fn = In(), Pn = 2e3, Le = 3, ai = 5, ct = 2, Mn = 0.9, Bn = 5e3, Te = 20, Nn = 0.2, Oe = 0.3;
function En(t) {
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
function Rn(t) {
  return [
    `M 0,${-t * 2.2}`,
    `C ${t * 1.1},${-t * 1.2} ${t * 1.3},${-t * 0.2} ${t * 1.3},${t * 0.5}`,
    `C ${t * 1.3},${t * 1.4} ${t * 0.7},${t * 2} 0,${t * 2}`,
    `C ${-t * 0.7},${t * 2} ${-t * 1.3},${t * 1.4} ${-t * 1.3},${t * 0.5}`,
    `C ${-t * 1.3},${-t * 0.2} ${-t * 1.1},${-t * 1.2} 0,${-t * 2.2}`,
    "Z"
  ].join(" ");
}
const Dn = [8, 16, 24, 32], zn = [0.9, 0.75, 0.6, 0.4], Ln = [0.8, 0.55, 0.35, 0.15];
class Ke {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = no(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.durInterp = ri(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptivePassAt = 0, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0, this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1, this.flowPathSyncedDirection = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.svg && this.destroy(), ce("init:", e.getBoundingClientRect(), "flows:", i.flows.length), ce("init start dims:", e.offsetWidth, e.offsetHeight), this.container = e, this.config = i, this.prefersReducedMotionFlag = ro(), this.flowsById = new Map(i.flows.map((s) => [s.id, s]));
    const o = document.createElementNS(B, "svg");
    o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("preserveAspectRatio", "none"), o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.overflow = "visible", this.svg = o, e.appendChild(o), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(e), this.startFpsLoop();
    const n = await to(e);
    (n.width === 0 || n.height === 0) && await io(e), ce("stable dims:", e.offsetWidth, e.offsetHeight), this.onResize(), ce("post-resize dims:", e.offsetWidth, e.offsetHeight);
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
        const r = this.config?.animation?.smooth_speed !== !1, c = this.durInterp.interpStartMs.size > 0;
        r && (c || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(n), this.updateTimeBasedSpacing(n);
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
    const n = this.containerSize(), s = new Map(this.config.nodes.map((u) => [u.id, u])), r = s.get(e.from_node), c = s.get(e.to_node);
    if (!r || !c) return;
    const a = [r.position, ...e.waypoints, c.position], d = [c.position, ...e.waypoints.slice().reverse(), r.position], p = e.line_style ?? "corner";
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
    const i = document.createElementNS(B, "defs");
    this.svg.appendChild(i);
    const o = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const s = o.get(n.from_node), r = o.get(n.to_node);
      if (!s || !r) continue;
      const c = [s.position, ...n.waypoints, r.position], a = `flowme-path-${n.id}`, d = document.createElementNS(B, "path");
      d.setAttribute("id", a), d.setAttribute("d", we(c, e, n.line_style ?? "corner")), d.setAttribute("fill", "none"), i.appendChild(d);
      const p = document.createElementNS(B, "g");
      p.classList.add("flowme-flow-group"), p.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && p.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (p.style.display = "none");
      const h = this.config?.defaults?.line_width ?? ct, u = document.createElementNS(B, "use");
      u.classList.add("flow-line"), u.setAttributeNS(j, "href", `#${a}`), u.setAttribute("href", `#${a}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(h)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), p.appendChild(u);
      const f = {
        group: p,
        path: d,
        pathId: a,
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
      const c = this.latestValues.get(o.id) ?? 0, a = this.flowPathSyncedDirection.get(o.id) ?? this.computeIntendedTravelSign(o, c);
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
    const s = Ne(i), r = o.animation ?? {}, c = this.animStyle(o);
    n.style !== c && (this.teardownStyle(n), n.style = c);
    const a = this.profileFor(o), d = Xe(o, a, this.config), p = Math.abs(s), h = oo(s, d, { flowId: e }), u = r.shimmer === !0, f = d.zeroThresholdEnabled && d.zeroThreshold !== void 0 ? d.peak * d.zeroThreshold : ke, g = u && p <= f && p > 0;
    if (o.visible === !1) {
      this.setGroupOpacity(n, 0);
      return;
    }
    const b = Fn ? Pn : Mt(s, d), v = o.speed_multiplier ?? 1;
    let m = Math.max(50, b * v);
    g && (m = m / Nn);
    const $ = this.config?.animation?.smooth_speed !== !1;
    h || (m = Sn(e, m, $, performance.now(), this.durInterp));
    const _ = r.direction ?? "auto", C = this.computeIntendedTravelSign(o, s);
    let F = C, R = g ? Oe : 1;
    const z = 600, E = 300;
    if ($ && _ === "auto") {
      const be = this.lastDirection.get(e), mo = this.dirChanging.get(e);
      be !== void 0 && be !== C && !mo && this.dirChanging.set(e, { startMs: performance.now(), oldDir: be, newDir: C });
      const ze = this.dirChanging.get(e);
      if (ze) {
        const X = performance.now() - ze.startMs;
        X < z ? (X < E ? (R = (g ? Oe : 1) * (1 - X / E), F = ze.oldDir) : (R = (g ? Oe : 1) * ((X - E) / E), F = ze.newDir), !u && X >= 280 && X <= 320 && (m = Math.max(m, 45e3)), u && X >= 270 && X <= 330 && (R = Math.max(R, Oe))) : (this.dirChanging.delete(e), F = C);
      }
    }
    this.lastDirection.set(e, C);
    const x = o.domain ?? this.config?.domain, D = this.config?.flows.findIndex((be) => be.id === e) ?? -1, T = fe(
      o,
      a,
      x,
      F,
      this.config?.domain_colors,
      D >= 0 ? D : 0
    ), L = this.gradientColors.get(e), W = o.value_gradient?.mode ?? "flow", le = wt(
      L && W !== "line" ? L : T
    ), et = wt(
      L && W !== "flow" ? L : T
    ), te = le;
    n.outline && n.outline.setAttribute("stroke", et), this.setGroupOpacity(n, R), this.syncFlowPathGeometry(o, n, F);
    const me = this.updateBurstState(e, p, d, a);
    switch (ce("applyFlow:", e, "style=", c, "dur=", m, "dir=", F, "color=", te), c) {
      case "dots":
        this.applyDots(n, o, a, s, m, te, F, me, h);
        break;
      case "dash":
        this.applyDash(n, o, m, te, F, me, h);
        break;
      case "arrow":
        this.applyArrows(n, o, m, te, F, me, h);
        break;
      case "trail":
        this.applyTrail(n, o, m, te, F, me, h);
        break;
      case "fluid":
        this.applyFluid(n, o, m, te, h);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, o, a, s, m, te, F, me, h);
    }
    _ === "both" && (c === "dots" || c === "arrow" || c === "trail") && k(
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
    const s = o.peak, r = this.config?.defaults?.burst_trigger_ratio ?? Mn, c = this.config?.defaults?.burst_sustain_ms ?? Bn, a = s * r;
    if (i < a)
      return this.burstActive.delete(e), this.burstEnteredAt.delete(e), 1;
    let d = this.burstEnteredAt.get(e);
    if (d === void 0 && (d = performance.now(), this.burstEnteredAt.set(e, d)), performance.now() - d < c) return 1;
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
    for (const c of this.config.flows) {
      if (c.animation?.particle_count !== void 0) continue;
      const a = this.animStyle(c);
      if (a !== "dots" && a !== "trail") continue;
      const d = this.profileFor(c), p = Math.abs(this.latestValues.get(c.id) ?? 0), h = Xe(c, d, this.config), u = this.updateBurstState(c.id, p, h, d), f = Math.max(
        1,
        Math.round(d.particle_count_curve ? d.particle_count_curve(p) : Le)
      ), g = this.config.defaults?.burst_max_particles ?? Te, b = Math.min(g, Math.max(1, Math.round(f * u)));
      let v = this.adaptiveCount.get(c.id) ?? b;
      s && v > 1 ? (v -= 1, k("adaptive count:", c.id, v, "avg frame:", n)) : r && v < b && (v += 1, k("adaptive count:", c.id, v, "avg frame:", n)), this.adaptiveCount.set(c.id, Math.min(v, b));
    }
  }
  /** Resolve effective particle count, respecting explicit override and burst */
  resolveParticleCount(e, i, o, n) {
    const s = e.animation ?? {};
    if (s.particle_count !== void 0) return s.particle_count;
    const r = this.animStyle(e), c = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(o) : Le)
    ), a = Math.max(1, c), d = this.config?.defaults?.burst_max_particles ?? Te, p = Math.min(d, Math.max(1, Math.round(a * n)));
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
    const s = n.particle_spacing ?? "even", r = o / 1e3, c = r / i;
    switch (s) {
      case "even":
      default:
        return Array.from({ length: i }, (a, d) => -(c * d));
      case "random": {
        const a = performance.now(), d = this.randomOffsetsLastUpdate.get(e) ?? 0, p = 3e3;
        let h = this.randomOffsets.get(e);
        if (!h || h.length !== i || a - d > p) {
          const u = c * 0.1, f = [];
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
        const a = Math.max(1, Math.round(n.cluster_size ?? 3)), d = n.cluster_gap ?? 3, p = c * 0.3, h = [];
        let u = 0;
        for (let f = 0; f < i; f++) {
          const g = f % a;
          f > 0 && g === 0 && (u += p * a * d), h.push(-(u % r)), u += p;
        }
        return h;
      }
      case "pulse": {
        const a = 1 / Math.max(0.01, n.pulse_frequency ?? 1.5), d = n.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % a < a * d ? Array.from({ length: i }, (u, f) => -(c * 0.1 * f)) : Array.from({ length: i }, (u, f) => -(c * f));
      }
      case "wave_spacing": {
        const a = n.wave_frequency ?? 2, d = n.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (p, h) => {
          const u = h / i * Math.PI * 2 * a, f = Math.sin(u) * d * (r / 2);
          return -(c * h + f);
        });
      }
      case "wave_lateral":
        return Array.from({ length: i }, (a, d) => -(c * d));
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
        const n = i.animation?.wave_frequency ?? 2, s = i.animation?.wave_amplitude ?? 20, r = o.particles.length, c = Math.PI * 2 / r, a = e * n * 2e-3 % (Math.PI * 2);
        for (let d = 0; d < r; d++) {
          const p = o.particles[d];
          if (!p) continue;
          const h = a + d * c, u = Math.sin(h) * s;
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
        const s = n.particles.length, c = (this.durInterp.currentDurMs.get(i.id) ?? 2e3) / 1e3, a = i.animation ?? {}, d = [];
        if (o === "wave_spacing") {
          const u = a.wave_frequency ?? 2, f = Math.min(a.wave_amplitude ?? 0.85, 0.95), g = e * 1e-3 / c, b = [];
          for (let v = 0; v < s; v++) {
            const m = (v / s + g) % 1, $ = Math.sin(m * Math.PI * 2 * u) * f * (1 / s);
            b.push(((m + $) % 1 + 1) % 1);
          }
          b.sort((v, m) => v - m), d.push(...b);
        } else {
          const u = a.pulse_frequency ?? 1.5, f = a.pulse_ratio ?? 0.25, g = e * u * 1e-3 % 1, b = e * 1e-3 / c % 1, v = 1 / s;
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
              const b = p.getPointAtLength(g * h), v = this.particleKind(f), m = Math.max(0.5, h * 0.01), $ = p.getPointAtLength(Math.max(0, g * h - m)), _ = p.getPointAtLength(Math.min(h, g * h + m)), C = Math.atan2(_.y - $.y, _.x - $.x) * (180 / Math.PI), F = this.particleTangentRotationDegrees(v, C);
              f.shape.setAttribute(
                "transform",
                F === 0 ? `translate(${b.x.toFixed(2)},${b.y.toFixed(2)})` : `translate(${b.x.toFixed(2)},${b.y.toFixed(2)}) rotate(${F.toFixed(1)})`
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
  applyDots(e, i, o, n, s, r, c, a, d = !1) {
    const p = i.animation?.direction ?? "auto", h = d ? 0 : this.resolveParticleCount(i, o, n, a), u = i.animation?.particle_shape ?? "circle", f = i.animation?.flicker === !0;
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
    const g = `${(s / 1e3).toFixed(3)}s`, b = s / 1e3, v = p === "both" ? b / 2 : 0, m = i.animation ?? {}, $ = this.resolveParticleBegins(i.id, h, s, m), _ = (C, F, R) => {
      for (let z = 0; z < C.length; z++) {
        const E = C[z];
        this.updateParticleColor(E, r, i, o, f);
        const x = document.createElementNS(B, "animateMotion");
        x.setAttribute("repeatCount", "indefinite"), x.setAttribute("dur", g), x.setAttribute("rotate", this.particleMotionRotateAttr(u)), x.setAttribute("begin", `${(($[z] ?? 0) + R).toFixed(3)}s`);
        const D = document.createElementNS(B, "mpath"), T = this.motionPathRef(e, i, F);
        D.setAttributeNS(j, "href", `#${T}`), D.setAttribute("href", `#${T}`), x.appendChild(D), E.animateMotion.replaceWith(x), E.animateMotion = x, E.shape.appendChild(x);
      }
    };
    _(e.particles, c, 0), e.particlesBack && _(e.particlesBack, -c, v);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(e, i, o, n, s, r, c = !1) {
    for (const m of e.particles) m.shape.remove();
    if (e.particles = [], !e.lineStroke) {
      const m = document.createElementNS(B, "use");
      m.setAttributeNS(j, "href", `#${e.pathId}`), m.setAttribute("href", `#${e.pathId}`), m.setAttribute("fill", "none"), m.setAttribute("stroke-linecap", "round"), m.setAttribute("stroke-linejoin", "round"), e.group.appendChild(m), e.lineStroke = m;
    }
    const a = this.config?.defaults?.line_width ?? ct, p = (i.animation ?? {}).dash_gap ?? 0.5, h = Math.max(0.1, p / r), u = 14, f = u * h, g = this.glowFilter(i, this.profileFor(i), n);
    e.lineStroke.setAttribute("stroke", n), e.lineStroke.setAttribute("stroke-width", String(a * 2)), e.lineStroke.setAttribute("stroke-dasharray", `${u} ${f}`), g && e.lineStroke.setAttribute("filter", g);
    const b = u + f, v = e.lineStroke.querySelector("animate");
    if (v && v.remove(), !c) {
      const m = document.createElementNS(B, "animate");
      m.setAttribute("attributeName", "stroke-dashoffset"), m.setAttribute("from", s > 0 ? "0" : `-${b}`), m.setAttribute("to", s > 0 ? `-${b}` : "0"), m.setAttribute("dur", `${(o / 1e3).toFixed(3)}s`), m.setAttribute("repeatCount", "indefinite"), e.lineStroke.appendChild(m);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(e, i, o, n, s, r, c = !1) {
    const a = this.profileFor(i), d = i.animation?.particle_count ?? Le, p = this.config?.defaults?.burst_max_particles ?? Te, h = c ? 0 : Math.min(p, Math.max(1, Math.round(d * r))), u = i.animation?.flicker === !0, f = i.animation?.direction ?? "auto";
    if (e.particles.length !== h) {
      for (const _ of e.particles) _.shape.remove();
      e.particles = [];
      for (let _ = 0; _ < h; _++)
        e.particles.push(this.makeParticle(e, "arrow", n, i, a));
    }
    if (f === "both") {
      if (!e.particlesBack || e.particlesBack.length !== h) {
        if (e.particlesBack) for (const _ of e.particlesBack) _.shape.remove();
        e.particlesBack = [];
        for (let _ = 0; _ < h; _++)
          e.particlesBack.push(this.makeParticle(e, "arrow", n, i, a));
      }
    } else if (e.particlesBack) {
      for (const _ of e.particlesBack) _.shape.remove();
      e.particlesBack = void 0;
    }
    const g = `${(o / 1e3).toFixed(3)}s`, b = o / 1e3, v = f === "both" ? b / 2 : 0, m = this.resolveParticleBegins(i.id, h, o, i.animation ?? {}), $ = (_, C, F) => {
      for (let R = 0; R < _.length; R++) {
        const z = _[R];
        this.updateParticleColor(z, n, i, a, u);
        const E = document.createElementNS(B, "animateMotion");
        E.setAttribute("repeatCount", "indefinite"), E.setAttribute("dur", g), E.setAttribute("rotate", this.particleMotionRotateAttr("arrow")), E.setAttribute("begin", `${((m[R] ?? 0) + F).toFixed(3)}s`);
        const x = document.createElementNS(B, "mpath"), D = this.motionPathRef(e, i, C);
        x.setAttributeNS(j, "href", `#${D}`), x.setAttribute("href", `#${D}`), E.appendChild(x), z.animateMotion.replaceWith(E), z.animateMotion = E, z.shape.appendChild(E);
      }
    };
    $(e.particles, s, 0), e.particlesBack && $(e.particlesBack, -s, v);
  }
  /**
   * trail — head uses particle_shape; four tail segments follow along path with staggered begins.
   */
  applyTrail(e, i, o, n, s, r, c = !1) {
    const a = this.profileFor(i), d = i.animation?.particle_count ?? Le, p = this.config?.defaults?.burst_max_particles ?? Te, h = c ? 0 : Math.min(p, Math.max(1, Math.round(d * r)));
    if (c) {
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
        e.particles.push(this.makeTrailParticle(e, i, a, n, f));
      if (v) {
        e.particlesBack = [];
        for (let x = 0; x < h; x++)
          e.particlesBack.push(this.makeTrailParticle(e, i, a, n, f));
      }
    }
    const $ = `${(o / 1e3).toFixed(3)}s`, _ = o / 1e3, C = v ? _ / 2 : 0, F = this.resolveParticleBegins(i.id, h, o, i.animation ?? {});
    let R = 100;
    try {
      R = Math.max(1, e.path.getTotalLength());
    } catch {
      R = 100;
    }
    const z = (x, D, T) => {
      const L = document.createElementNS(B, "animateMotion");
      L.setAttribute("repeatCount", "indefinite"), L.setAttribute("dur", $), L.setAttribute("rotate", g), L.setAttribute("begin", `${D.toFixed(4)}s`);
      const W = document.createElementNS(B, "mpath"), le = this.motionPathRef(e, i, T);
      return W.setAttributeNS(j, "href", `#${le}`), W.setAttribute("href", `#${le}`), L.appendChild(W), x.replaceWith(L), L;
    }, E = (x, D, T) => {
      this.updateParticleColor(x, n, i, a, u);
      const L = x.trailMotions;
      if (L && L.length === 4)
        for (let W = 0; W < 4; W++) {
          const le = Dn[W], et = D + le / R * _;
          L[W] = z(L[W], et, T);
        }
      x.animateMotion = z(x.animateMotion, D, T);
    };
    for (let x = 0; x < e.particles.length; x++) {
      const D = e.particles[x];
      E(D, F[x] ?? 0, s);
    }
    if (e.particlesBack)
      for (let x = 0; x < e.particlesBack.length; x++) {
        const D = e.particlesBack[x];
        E(D, (F[x] ?? 0) + C, -s);
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
    const c = new Map(this.config.nodes.map((x) => [x.id, x])), a = c.get(i.from_node), d = c.get(i.to_node);
    if (!a || !d) return;
    if (!e.lineStroke) {
      const x = document.createElementNS(B, "use");
      x.setAttributeNS(j, "href", `#${e.pathId}`), x.setAttribute("href", `#${e.pathId}`), x.setAttribute("fill", "none"), x.setAttribute("stroke-linecap", "round"), x.setAttribute("stroke-linejoin", "round"), e.group.appendChild(x), e.lineStroke = x;
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
      const x = f.getPointAtLength(0), D = f.getPointAtLength(g);
      b = { x: x.x, y: x.y }, v = { x: D.x, y: D.y };
    } catch {
      const x = this.containerSize();
      b = Be(a.position, x), v = Be(d.position, x);
    }
    const m = v.x - b.x, $ = v.y - b.y, _ = Math.hypot(m, $) || 1, C = m / _, F = $ / _;
    for (u.setAttribute("gradientUnits", "userSpaceOnUse"), u.setAttribute("x1", String(b.x)), u.setAttribute("y1", String(b.y)), u.setAttribute("x2", String(b.x + C * 2 * g)), u.setAttribute("y2", String(b.y + F * 2 * g)); u.firstChild; ) u.firstChild.remove();
    const R = [
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
    for (const [x, D] of R) {
      const T = document.createElementNS(B, "stop");
      T.setAttribute("offset", x), T.setAttribute("stop-color", n), T.setAttribute("stop-opacity", D), u.appendChild(T);
    }
    if (!s) {
      const x = document.createElementNS(B, "animateTransform");
      x.setAttribute("attributeName", "gradientTransform"), x.setAttribute("type", "translate"), x.setAttribute("additive", "replace"), x.setAttribute("calcMode", "linear"), x.setAttribute("dur", `${Math.max(1, Math.round(o))}ms`), x.setAttribute("repeatCount", "indefinite");
      const D = C * g, T = F * g;
      x.setAttribute("from", `${-D} ${-T}`), x.setAttribute("to", "0 0"), u.appendChild(x);
    }
    const z = (this.config?.defaults?.line_width ?? ct) * 3, E = this.glowFilter(i, this.profileFor(i), n);
    if (e.lineStroke.setAttribute("stroke", `url(#${h})`), e.lineStroke.setAttribute("stroke-width", String(z)), e.lineStroke.removeAttribute("stroke-dasharray"), E && e.lineStroke.setAttribute("filter", E), !e.fluidInitialised) {
      e.fluidInitialised = !0, e.lineStroke.setAttribute("opacity", "0");
      const x = document.createElementNS(B, "animate");
      x.setAttribute("attributeName", "opacity"), x.setAttribute("values", "0;1"), x.setAttribute("dur", "600ms"), x.setAttribute("fill", "freeze"), e.lineStroke.appendChild(x);
    }
  }
  makeTrailParticle(e, i, o, n, s) {
    const r = this.resolveParticleRadius(i), c = this.resolveGlow(i, o), a = s === "custom_svg" ? "circle" : s, d = document.createElementNS(B, "g");
    d.setAttribute("data-trail-pack", "1"), d.setAttribute("data-head-kind", s);
    const p = [], h = [], u = this.particleMotionRotateAttr(s);
    for (let m = 0; m < 4; m++) {
      const $ = document.createElementNS(B, "g"), { shape: _ } = this.buildParticleShapeOnly(e, a, r * zn[m], n, i);
      c && _.setAttribute("filter", this.glowFilter(i, o, n)), _.setAttribute("opacity", String(Ln[m])), $.appendChild(_);
      const C = document.createElementNS(B, "animateMotion");
      C.setAttribute("repeatCount", "indefinite"), C.setAttribute("dur", "2s"), C.setAttribute("rotate", u);
      const F = document.createElementNS(B, "mpath");
      F.setAttributeNS(j, "href", `#${e.pathId}`), F.setAttribute("href", `#${e.pathId}`), C.appendChild(F), $.appendChild(C), h.push($), p.push(C);
    }
    for (let m = 3; m >= 0; m--) d.appendChild(h[m]);
    const f = document.createElementNS(B, "g");
    let g;
    s === "custom_svg" ? g = this.buildParticleShapeOnly(e, s, r, n, i, f).shape : (g = this.buildParticleShapeOnly(e, s, r, n, i).shape, f.appendChild(g)), c && g.setAttribute("filter", this.glowFilter(i, o, n));
    const b = document.createElementNS(B, "animateMotion");
    b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", "2s"), b.setAttribute("rotate", u);
    const v = document.createElementNS(B, "mpath");
    return v.setAttributeNS(j, "href", `#${e.pathId}`), v.setAttribute("href", `#${e.pathId}`), b.appendChild(v), f.appendChild(b), d.appendChild(f), e.group.appendChild(d), { shape: d, animateMotion: b, trailMotions: p };
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
    let c, a = !1;
    switch (i) {
      case "square": {
        const d = o * 2, p = document.createElementNS(B, "rect");
        p.setAttribute("width", String(d)), p.setAttribute("height", String(d)), p.setAttribute("x", String(-d / 2)), p.setAttribute("y", String(-d / 2)), p.setAttribute("rx", "1.5"), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), c = p;
        break;
      }
      case "arrow": {
        const d = this.config?.defaults?.dot_radius ?? ai, p = s.animation?.particle_size ?? 1, h = d * p / 10, u = document.createElementNS(B, "path");
        u.setAttribute("d", En(h)), u.setAttribute("fill", n), u.setAttribute("opacity", "0"), u.setAttribute("data-kind", "arrow"), c = u;
        break;
      }
      case "teardrop": {
        const d = document.createElementNS(B, "path");
        d.setAttribute("d", Rn(o)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), d.setAttribute("data-kind", "teardrop"), c = d;
        break;
      }
      case "diamond": {
        const d = o * 1.4, p = document.createElementNS(B, "polygon");
        p.setAttribute("points", `0,${-d} ${d},0 0,${d} ${-d},0`), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "diamond"), c = p;
        break;
      }
      case "custom_svg": {
        const d = s.animation?.custom_svg_path ?? "";
        if (!d) {
          k(`particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${s.id}`);
          const u = document.createElementNS(B, "circle");
          u.setAttribute("r", String(o)), u.setAttribute("fill", n), u.setAttribute("opacity", "0"), c = u;
          break;
        }
        const p = document.createElementNS(B, "path");
        p.setAttribute("d", d), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), p.setAttribute("data-kind", "custom_svg"), (r ?? e.group).appendChild(p), a = !0;
        try {
          const u = p.getBBox(), f = Math.max(u.width, u.height, 1), b = o * 2 / f, v = -(u.x + u.width / 2), m = -(u.y + u.height / 2);
          p.setAttribute("transform", `scale(${b.toFixed(4)}) translate(${v.toFixed(4)},${m.toFixed(4)})`);
        } catch {
        }
        c = p;
        break;
      }
      default: {
        const d = document.createElementNS(B, "circle");
        d.setAttribute("r", String(o)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), c = d;
      }
    }
    return { shape: c, alreadyAppended: a };
  }
  makeParticle(e, i, o, n, s) {
    const r = this.resolveParticleRadius(n), c = this.resolveGlow(n, s), { shape: a, alreadyAppended: d } = this.buildParticleShapeOnly(e, i, r, o, n);
    c && (a.setAttribute("filter", this.glowFilter(n, s, o)), a.style.color = o);
    const p = document.createElementNS(B, "animateMotion");
    p.setAttribute("repeatCount", "indefinite"), p.setAttribute("dur", "2s"), p.setAttribute("rotate", this.particleMotionRotateAttr(i));
    const h = document.createElementNS(B, "mpath");
    return h.setAttributeNS(j, "href", `#${e.pathId}`), h.setAttribute("href", `#${e.pathId}`), p.appendChild(h), a.appendChild(p), d || e.group.appendChild(a), { shape: a, animateMotion: p };
  }
  updateParticleColor(e, i, o, n, s) {
    if (e.shape.hasAttribute("data-trail-pack") ? e.shape.querySelectorAll("path, circle, rect, ellipse, polygon").forEach((a) => {
      a.setAttribute("fill", i);
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
    return U(e.domain ?? this.config?.domain);
  }
  primaryColor(e) {
    const i = this.profileFor(e), o = e.domain ?? this.config?.domain, n = this.config?.flows.findIndex((s) => s.id === e.id) ?? -1;
    return fe(e, i, o, 1, this.config?.domain_colors, n >= 0 ? n : 0);
  }
}
const Tn = `/* eslint-disable no-undef */
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
`, li = "flowme-keyframes", xt = "flowme-cycle", On = 5, Hn = 2;
let oe = null, ci = !1;
function Wn() {
  if (document.getElementById(li)) return;
  const t = document.createElement("style");
  t.id = li, t.textContent = `@keyframes ${xt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(t);
}
function Gn() {
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
async function Un() {
  if (oe) return oe;
  const t = CSS.paintWorklet;
  if (!t)
    return oe = Promise.reject(new Error("paintWorklet not available")), oe;
  const e = new Blob([Tn], { type: "application/javascript" }), i = URL.createObjectURL(e);
  return oe = t.addModule(i).catch((o) => {
    throw oe = null, o;
  }).finally(() => {
  }), oe;
}
class Kn {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = no(() => this.flushUpdates(), 120), this.lastDurMsByFlow = /* @__PURE__ */ new Map();
  }
  async init(e, i) {
    this.container = e, k("Houdini init start dims:", e.offsetWidth, e.offsetHeight), this.config = i, this.flowsById = new Map(i.flows.map((s) => [s.id, s])), Wn(), Gn(), await Un();
    const o = document.createElement("div");
    o.className = "flow-houdini flow-houdini-root", o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", e.appendChild(o), this.wrapper = o;
    for (const s of i.flows) {
      const r = document.createElement("div");
      r.className = "flow-houdini", r.dataset.flowId = s.id, r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.background = "paint(flowme-painter)", r.style.setProperty("--flowme-dur", "2000"), r.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)", r.style.animation = `${xt} calc(var(--flowme-dur) * 1ms) linear infinite`, r.style.opacity = "0", o.appendChild(r), this.flowDivs.set(s.id, { el: r });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(e);
    const n = await to(e);
    (n.width === 0 || n.height === 0) && await io(e), k("Houdini stable dims:", e.offsetWidth, e.offsetHeight), this.rebuildPaths(), k("Houdini post-resize dims:", e.offsetWidth, e.offsetHeight);
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
    const s = Ne(i), r = this.profileFor(o), c = Xe(o, r, this.config), a = oo(s, c, { flowId: e });
    if (o.visible === !1) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const d = o.speed_multiplier ?? 1, p = a ? 1e9 : Math.max(
      50,
      Mt(s, c) * d
    ), h = o.animation?.direction ?? "auto";
    let u;
    h === "forward" ? u = 1 : h === "reverse" ? u = -1 : h === "both" ? u = 1 : u = s >= 0 ? 1 : -1;
    const f = o.domain ?? this.config?.domain, g = this.config?.flows.findIndex((F) => F.id === o.id) ?? -1, b = fe(
      o,
      r,
      f,
      u,
      this.config?.domain_colors,
      g >= 0 ? g : 0
    ), v = a ? 0 : Math.max(
      1,
      Math.round(r.particle_count_curve ? r.particle_count_curve(s) : 3)
    ), m = r.wave_amplitude_curve ? r.wave_amplitude_curve(s) : 4, $ = n.el.style;
    $.setProperty("--flowme-shape", r.shape), $.setProperty("--flowme-color", b), $.setProperty("--flowme-glow", r.glow ? "1" : "0"), $.setProperty("--flowme-count", String(v)), $.setProperty("--flowme-radius", String(On)), $.setProperty("--flowme-line", String(Hn)), $.setProperty("--flowme-amp", String(m)), $.setProperty("--flowme-direction", String(u));
    const _ = this.lastDurMsByFlow.get(e) ?? p, C = Math.round(p);
    if (Math.abs(p - _) < 50) {
      $.transition = "none", $.setProperty("--flowme-dur", String(C));
      const F = n.el;
      requestAnimationFrame(() => {
        F.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)";
      });
    } else
      $.setProperty("--flowme-dur", String(C));
    this.lastDurMsByFlow.set(e, p), $.animation = a ? "none" : `${xt} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }
  profileFor(e) {
    return U(e.domain ?? this.config?.domain);
  }
}
function jn() {
  const t = Yn(), e = t ?? "svg", i = Vn(), o = ro();
  return k(
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
  ), o ? new Ke() : e === "houdini" ? i ? new Kn() : (k("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Ke()) : new Ke();
}
function Vn() {
  try {
    const t = CSS;
    return "paintWorklet" in t && "registerProperty" in t;
  } catch {
    return !1;
  }
}
function Yn() {
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
function Zn(t, e, i) {
  k(
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
          ${l("overlays.migrationPrefix")} ${t._migration_warning}
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
async function Xn() {
  if (dt) return dt;
  if (de) return de;
  const e = window.loadCardHelpers;
  return typeof e != "function" ? null : (de = e().then((i) => (dt = i, de = null, i)).catch((i) => {
    throw de = null, i;
  }), de);
}
async function qn(t) {
  const e = await Xn();
  return e ? e.createCardElement(t) : null;
}
var Jn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, Qe = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Qn(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && Jn(e, i, n), n;
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
        qo(t);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, qn(t).then((i) => {
        if (!i) {
          this.errorMessage = l("overlays.haHelpersUnavailable"), this.requestUpdate();
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
  P()
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
function es(t, e) {
  const i = e.domain, o = U(i);
  if (t.color) return t.color;
  const n = e.flows.filter((r) => r.from_node === t.id || r.to_node === t.id);
  if (n.length === 0) return o.default_color_positive;
  const s = /* @__PURE__ */ new Set();
  for (const r of n) {
    const c = e.flows.findIndex((p) => p.id === r.id), a = U(r.domain ?? i), d = fe(r, a, r.domain ?? i, 1, e.domain_colors, c >= 0 ? c : 0);
    s.add(d);
  }
  return s.size === 1 ? [...s][0] : lo;
}
function ts(t) {
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
function is(t) {
  return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
class co {
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
    let c = r.querySelector(":scope > g.node-effects-ripples");
    c || (c = document.createElementNS(G, "g"), c.classList.add("node-effects-ripples"), r.insertBefore(c, r.firstChild));
    let a = r.querySelector(":scope > g.node-effects-sync");
    for (a || (a = document.createElementNS(G, "g"), a.classList.add("node-effects-sync"), r.appendChild(a)); a.firstChild; ) a.firstChild.remove();
    const d = new Set(i.nodes.map((u) => u.id));
    for (const u of [...this.rippleLastRaw.keys()])
      d.has(u) || (this.cancelRippleBurst(u, c), this.rippleLastRaw.delete(u));
    for (const u of [...this.rippleBurstGen.keys()])
      d.has(u) || this.cancelRippleBurst(u, c);
    const p = s?.getLayoutMetrics?.(e) ?? ts(e), h = i.defaults?.node_radius ?? 12;
    if (eo() && n - this.lastDiagnosticLogMs > 4e3) {
      this.lastDiagnosticLogMs = n;
      for (const u of i.nodes) {
        if (!u.node_effect?.type || !u.entity) continue;
        const f = o?.states[u.entity];
        k(
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
      const g = u.size ?? h, b = ve(g, p), { cx: v, cy: m } = ui(u.position, p), $ = es(u, i), _ = document.createElementNS(G, "g");
      switch (_.classList.add("node-effect"), _.setAttribute("data-node", u.id), f.type) {
        case "glow":
          this.appendGlow(_, u, f, o, u.entity, $, g, s, p);
          break;
        case "badge":
          this.appendBadge(_, f, o, u.entity, $, u.id, v, m, g, p, s);
          break;
        case "ripple":
          this.updateRipple(c, u, f, o, $, g, v, m, p);
          continue;
        case "alert":
          this.appendAlert(_, f, o, u.entity, $, u.id, v, m, b, n, s);
          break;
      }
      _.childNodes.length > 0 && a.appendChild(_);
    }
  }
  appendGlow(e, i, o, n, s, r, c, a, d) {
    const p = He(n, s), h = o.peak_value ?? 1e4, u = o.glow_max_radius ?? 20, f = Math.max(0, Math.min(1, o.glow_min_intensity ?? 0.1)), g = o.glow_color || r, b = p === null ? 0 : Math.abs(p) / h, v = Math.max(f, Math.min(1, b)), m = 4 + v * u, $ = 0.2 + v * 0.6;
    if (a?.setNodeDotFilter) {
      a.setNodeDotFilter(i.id, `drop-shadow(0 0 ${m.toFixed(1)}px ${g})`);
      return;
    }
    const { cx: _, cy: C } = ui(i.position, d), F = document.createElementNS(G, "circle");
    F.setAttribute("cx", String(_)), F.setAttribute("cy", String(C)), F.setAttribute("r", String(ve(c, d))), F.setAttribute("fill", "none"), F.setAttribute("stroke", g), F.setAttribute("stroke-width", String(pi(2, d))), F.setAttribute("opacity", String($)), F.setAttribute(
      "style",
      `filter: drop-shadow(0 0 ${m.toFixed(1)}px ${g}); transition: filter 500ms ease, opacity 500ms ease`
    ), e.appendChild(F);
  }
  cancelRippleBurst(e, i) {
    const o = this.ripplePendingTimeouts.get(e);
    if (o) {
      for (const n of o) window.clearTimeout(n);
      this.ripplePendingTimeouts.delete(e);
    }
    if (i) {
      const n = `[data-ripple-owner="${is(e)}"]`;
      i.querySelectorAll(n).forEach((s) => s.remove());
    }
    this.rippleBurstGen.set(e, (this.rippleBurstGen.get(e) ?? 0) + 1);
  }
  scheduleRippleBurst(e, i, o, n, s, r, c, a) {
    this.cancelRippleBurst(e, i);
    const d = this.rippleBurstGen.get(e), p = 300, h = [];
    for (let u = 0; u < 3; u++)
      h.push(
        window.setTimeout(() => {
          this.rippleBurstGen.get(e) === d && this.spawnRippleRing(i, e, o, n, s, r, c, a);
        }, u * p)
      );
    this.ripplePendingTimeouts.set(e, h);
  }
  spawnRippleRing(e, i, o, n, s, r, c, a) {
    const d = ve(s + 2, a), p = ve(s * 4, a), h = pi(2, a), u = document.createElementNS(G, "g");
    u.setAttribute("data-ripple-owner", i);
    const f = document.createElementNS(G, "circle");
    f.setAttribute("cx", String(o)), f.setAttribute("cy", String(n)), f.setAttribute("r", String(d)), f.setAttribute("fill", "none"), f.setAttribute("stroke", c), f.setAttribute("stroke-width", String(h)), f.setAttribute("opacity", "0.7");
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
  updateRipple(e, i, o, n, s, r, c, a, d) {
    const p = He(n, i.entity), h = o.ripple_threshold ?? 0;
    if (p === null || Math.abs(p) <= h) {
      this.cancelRippleBurst(i.id, e), this.rippleLastRaw.delete(i.id);
      return;
    }
    if (this.rippleLastRaw.get(i.id) === p) return;
    this.rippleLastRaw.set(i.id, p);
    const f = o.ripple_duration ?? 2e3, g = o.ripple_color || s;
    this.scheduleRippleBurst(i.id, e, c, a, r, f, g, d);
  }
  appendBadge(e, i, o, n, s, r, c, a, d, p, h) {
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
    const v = ve(d * 0.6, p), m = c + Math.min(v * 1.1, 3), $ = a - Math.min(v * 1.1, 3), _ = document.createElementNS(G, "circle");
    _.setAttribute("cx", String(m)), _.setAttribute("cy", String($)), _.setAttribute("r", String(v)), _.setAttribute("fill", b), _.setAttribute("stroke", "#ffffff"), _.setAttribute("stroke-width", String(0.03)), e.appendChild(_);
  }
  appendAlert(e, i, o, n, s, r, c, a, d, p, h) {
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
      const z = 1e3 / Math.max(0.25, $), E = Math.floor(p / (z / 2)) % 2 === 0;
      h.setNodeDotBackground(r, E ? _ : s, { transitionMs: 80 });
      return;
    }
    const C = document.createElementNS(G, "circle");
    C.setAttribute("cx", String(c)), C.setAttribute("cy", String(a)), C.setAttribute("r", String(d)), C.setAttribute("fill", s), C.setAttribute("opacity", "0.85");
    const F = Math.max(100, Math.round(1e3 / Math.max(0.25, $))), R = document.createElementNS(G, "animate");
    R.setAttribute("attributeName", "fill"), R.setAttribute("values", `${s};${_};${s}`), R.setAttribute("dur", `${F}ms`), R.setAttribute("repeatCount", "indefinite"), C.appendChild(R), e.appendChild(C);
  }
}
const os = [
  "sunny",
  "clear-night",
  "cloudy",
  "partlycloudy",
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "windy",
  "windy-variant",
  "fog",
  "hail",
  "lightning",
  "lightning-rainy",
  "exceptional"
], ns = new Set(os);
function ss(t) {
  return ns.has(t);
}
const rs = "flowme-weather-effects-css", as = `
.flowme-weather-effect {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

/* --- sunny --- */
.flowme-wx-sunny {
  position: relative;
}
.flowme-wx-sunny-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 130% 70% at 50% 0%, rgba(255, 220, 140, 0.45), transparent 60%);
  animation: flowme-wx-sunny-glow-pulse 4s ease-in-out infinite;
  pointer-events: none;
}
@keyframes flowme-wx-sunny-glow-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}
.flowme-wx-sun-ray-arm {
  position: absolute;
  left: 50%;
  top: 0;
  transform-origin: top center;
  pointer-events: none;
}
.flowme-wx-sun-ray {
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(180deg, rgba(255, 220, 100, 0.42), rgba(255, 220, 100, 0.03));
  animation:
    flowme-wx-ray-pulse 4s ease-in-out infinite,
    flowme-wx-ray-sway 10s ease-in-out infinite;
}
@keyframes flowme-wx-ray-pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}
@keyframes flowme-wx-ray-sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* --- clear-night stars --- */
.flowme-wx-star {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  animation: flowme-wx-twinkle 2.5s ease-in-out infinite;
}
@keyframes flowme-wx-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.85; }
}

/* --- clouds --- */
.flowme-wx-cloud {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(8px);
}
.flowme-wx-cloudy .flowme-wx-cloud {
  animation: flowme-wx-cloud-drift 38s linear infinite;
}
.flowme-wx-partlycloudy .flowme-wx-cloud {
  animation: flowme-wx-cloud-drift-fast 23s linear infinite;
}
@keyframes flowme-wx-cloud-drift {
  from { transform: translateX(-35%); }
  to { transform: translateX(135%); }
}
@keyframes flowme-wx-cloud-drift-fast {
  from { transform: translateX(-40%); }
  to { transform: translateX(140%); }
}

/* --- rain --- */
.flowme-wx-rain-layer {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  overflow: hidden;
  pointer-events: none;
}
.flowme-wx-rain-streak {
  position: absolute;
  width: 2px;
  height: 18%;
  top: -5%;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.42));
  transform: rotate(15deg);
  transform-origin: center top;
  animation: flowme-wx-rain-fall 0.72s linear infinite;
}
@keyframes flowme-wx-rain-fall {
  from {
    transform: translateY(-15vh) rotate(15deg);
  }
  to {
    transform: translateY(135vh) rotate(15deg);
  }
}

.flowme-wx-pouring .flowme-wx-rain-streak {
  width: 3px;
  animation-duration: 0.36s;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.58));
}

/* --- snow --- */
.flowme-wx-snowflake {
  position: absolute;
  top: -5%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  animation: flowme-wx-snow-fall 4.2s ease-in-out infinite;
}
@keyframes flowme-wx-snow-fall {
  0% { transform: translate(0, 0); }
  25% { transform: translate(8px, 28vh); }
  50% { transform: translate(-6px, 56vh); }
  75% { transform: translate(10px, 84vh); }
  100% { transform: translate(-4px, 110vh); }
}

/* --- windy --- */
.flowme-wx-wind-line {
  position: absolute;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  animation: flowme-wx-wind-sweep 3.2s linear infinite;
}
.flowme-wx-windy-variant .flowme-wx-wind-line {
  background: rgba(255, 255, 255, 0.25);
  animation-duration: 2.1s;
}
@keyframes flowme-wx-wind-sweep {
  from { transform: translateX(-100%); opacity: 0.1; }
  30% { opacity: 0.2; }
  to { transform: translateX(120%); opacity: 0.1; }
}

/* --- fog --- */
.flowme-wx-fog-layer {
  position: absolute;
  inset: -10%;
  background: radial-gradient(ellipse at 30% 40%, rgba(255, 255, 255, 0.12), transparent 55%),
    radial-gradient(ellipse at 70% 60%, rgba(240, 240, 245, 0.14), transparent 50%);
  animation: flowme-wx-fog-drift 60s linear infinite;
}
@supports (backdrop-filter: blur(2px)) {
  .flowme-wx-fog-layer {
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
}
@keyframes flowme-wx-fog-drift {
  from { transform: translateX(-4%); }
  to { transform: translateX(4%); }
}

/* --- hail --- */
.flowme-wx-hail-stone {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.78);
  top: -4%;
  animation: flowme-wx-hail-fall 0.52s linear infinite;
}
@keyframes flowme-wx-hail-fall {
  to { transform: translateY(110vh); }
}

/* --- lightning --- */
.flowme-wx-lightning-flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  animation: flowme-wx-lightning 7s ease-in-out infinite;
}
@keyframes flowme-wx-lightning {
  0%, 84%, 86%, 100% { opacity: 0; background: rgba(255, 255, 255, 0); }
  85% { opacity: 0.38; background: rgba(255, 255, 255, 0.35); }
  85.08% { opacity: 0; }
}

/* --- exceptional --- */
.flowme-wx-exceptional-glow {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 28px rgba(255, 107, 0, 0.45);
  animation: flowme-wx-exc-pulse 2s ease-in-out infinite;
}
@keyframes flowme-wx-exc-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@media (prefers-reduced-motion: reduce) {
  .flowme-weather-effect,
  .flowme-weather-effect * {
    animation: none !important;
    transition: none !important;
  }
}
`, hi = /* @__PURE__ */ new WeakSet();
function ls(t) {
  const e = t.getRootNode();
  if (!(e instanceof ShadowRoot) || hi.has(e)) return;
  hi.add(e);
  const i = document.createElement("style");
  i.id = rs, i.textContent = as, e.appendChild(i);
}
function S(t, e) {
  return t + Math.random() * (e - t);
}
function cs() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-sunny";
  const e = document.createElement("div");
  e.className = "flowme-wx-sunny-glow", t.appendChild(e);
  const i = Math.floor(S(4, 7));
  for (let o = 0; o < i; o++) {
    const n = S(-30, 30), s = S(20, 40), r = S(200, 400), c = S(40, 60), a = document.createElement("div");
    a.className = "flowme-wx-sun-ray-arm", a.style.height = `${c}%`, a.style.width = `${r}px`, a.style.transform = `translateX(-50%) rotate(${n}deg)`;
    const d = document.createElement("div");
    d.className = "flowme-wx-sun-ray", d.style.width = "100%", d.style.height = "100%", d.style.clipPath = `polygon(calc(50% - ${s / 2}px) 0, calc(50% + ${s / 2}px) 0, calc(50% + ${r / 2}px) 100%, calc(50% - ${r / 2}px) 100%)`;
    const p = S(3, 5), h = S(8, 12);
    d.style.animationDuration = `${p}s, ${h}s`, d.style.animationDelay = `${S(0, 1.5)}s, ${S(0, 2)}s`, a.appendChild(d), t.appendChild(a);
  }
  return t;
}
function ds() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-clear-night";
  const e = Math.floor(S(80, 121));
  for (let i = 0; i < e; i++) {
    const o = document.createElement("div");
    o.className = "flowme-wx-star", o.style.left = `${S(2, 98)}%`, o.style.top = `${S(4, 88)}%`, o.style.animationDelay = `${S(0, 4)}s`, o.style.animationDuration = `${S(2, 6)}s`, t.appendChild(o);
  }
  return t;
}
function fi(t) {
  const e = document.createElement("div");
  e.className = `flowme-weather-effect flowme-wx-cloudy${t ? " flowme-wx-partlycloudy" : ""}`;
  const i = t ? 2 : 3, o = t ? 0.85 : 1;
  for (let n = 0; n < i; n++) {
    const s = document.createElement("div");
    s.className = "flowme-wx-cloud";
    const r = S(28, 42) * o, c = S(12, 18) * o;
    s.style.width = `${r}%`, s.style.height = `${c}%`, s.style.top = `${S(8, 35)}%`, s.style.left = `${S(-20, 40)}%`, s.style.animationDelay = `${S(0, 12)}s`, e.appendChild(s);
  }
  return e;
}
function gi(t) {
  const e = document.createElement("div");
  e.className = t ? "flowme-weather-effect flowme-wx-pouring" : "flowme-weather-effect flowme-wx-rainy";
  const i = document.createElement("div");
  i.className = "flowme-wx-rain-layer";
  const o = t ? 88 : 56;
  for (let n = 0; n < o; n++) {
    const s = document.createElement("div");
    s.className = "flowme-wx-rain-streak", s.style.left = `${S(0, 100)}%`, s.style.animationDelay = `${S(0, 1)}s`, t ? s.style.opacity = String(S(0.5, 0.6)) : s.style.opacity = String(S(0.3, 0.4)), i.appendChild(s);
  }
  return e.appendChild(i), e;
}
function ps() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-snowy";
  const e = Math.floor(S(80, 101));
  for (let i = 0; i < e; i++) {
    const o = document.createElement("div");
    o.className = "flowme-wx-snowflake";
    const n = Math.random() < 0.45, s = n ? S(6, 8) : S(2, 4);
    o.style.width = `${s}px`, o.style.height = `${s}px`, o.style.left = `${S(0, 100)}%`, n ? (o.style.opacity = String(S(0.5, 0.7)), o.style.animationDuration = `${S(4, 6)}s`) : (o.style.opacity = String(S(0.7, 0.9)), o.style.animationDuration = `${S(2, 3)}s`), o.style.animationDelay = `${S(0, 4)}s`, t.appendChild(o);
  }
  return t;
}
function us() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-snowy-rainy";
  const e = document.createElement("div");
  e.className = "flowme-wx-rain-layer";
  for (let o = 0; o < 30; o++) {
    const n = document.createElement("div");
    n.className = "flowme-wx-rain-streak", n.style.left = `${S(0, 100)}%`, n.style.animationDelay = `${S(0, 0.8)}s`, n.style.animationDuration = `${S(0.55, 0.75)}s`, n.style.opacity = "0.38", e.appendChild(n);
  }
  t.appendChild(e);
  const i = Math.floor(S(40, 51));
  for (let o = 0; o < i; o++) {
    const n = document.createElement("div");
    n.className = "flowme-wx-snowflake";
    const s = Math.random() < 0.45, r = s ? S(6, 8) : S(2, 4);
    n.style.width = `${r}px`, n.style.height = `${r}px`, n.style.left = `${S(0, 100)}%`, s ? (n.style.opacity = String(S(0.5, 0.7)), n.style.animationDuration = `${S(4, 6)}s`) : (n.style.opacity = String(S(0.7, 0.9)), n.style.animationDuration = `${S(2, 3)}s`), n.style.animationDelay = `${S(0, 2)}s`, t.appendChild(n);
  }
  return t;
}
function mi(t) {
  const e = document.createElement("div");
  e.className = t ? "flowme-weather-effect flowme-wx-windy-variant" : "flowme-weather-effect flowme-wx-windy";
  const i = t ? 23 : 12;
  for (let o = 0; o < i; o++) {
    const n = document.createElement("div");
    n.className = "flowme-wx-wind-line", n.style.top = `${S(10, 90)}%`, n.style.width = `${S(14, 40)}%`, n.style.left = `${S(-30, 10)}%`, n.style.animationDelay = `${S(0, 3)}s`, n.style.animationDuration = `${S(2.4, 3.8)}s`, t || (n.style.opacity = String(S(0.1, 0.2))), e.appendChild(n);
  }
  return e;
}
function hs() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-fog";
  const e = document.createElement("div");
  return e.className = "flowme-wx-fog-layer", e.style.opacity = String(S(0.15, 0.25)), t.appendChild(e), t;
}
function fs() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-hail";
  const e = 46;
  for (let i = 0; i < e; i++) {
    const o = document.createElement("div");
    o.className = "flowme-wx-hail-stone", o.style.left = `${S(0, 100)}%`, o.style.animationDelay = `${S(0, 0.5)}s`, o.style.animationDuration = `${S(0.42, 0.58)}s`, o.style.opacity = String(S(0.7, 0.8)), t.appendChild(o);
  }
  return t;
}
function gs() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-lightning";
  const e = document.createElement("div");
  return e.className = "flowme-wx-lightning-flash", t.appendChild(e), t;
}
function ms() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-lightning-rainy";
  const e = document.createElement("div");
  e.className = "flowme-wx-rain-layer";
  for (let o = 0; o < 56; o++) {
    const n = document.createElement("div");
    n.className = "flowme-wx-rain-streak", n.style.left = `${S(0, 100)}%`, n.style.animationDelay = `${S(0, 1)}s`, n.style.opacity = String(S(0.3, 0.4)), e.appendChild(n);
  }
  const i = document.createElement("div");
  return i.className = "flowme-wx-lightning-flash", i.style.position = "absolute", i.style.inset = "0", t.appendChild(e), t.appendChild(i), t;
}
function bs() {
  const t = document.createElement("div");
  t.className = "flowme-weather-effect flowme-wx-exceptional";
  const e = document.createElement("div");
  return e.className = "flowme-wx-exceptional-glow", t.appendChild(e), t;
}
function ys(t) {
  switch (t) {
    case "sunny":
      return cs();
    case "clear-night":
      return ds();
    case "cloudy":
      return fi(!1);
    case "partlycloudy":
      return fi(!0);
    case "rainy":
      return gi(!1);
    case "pouring":
      return gi(!0);
    case "snowy":
      return ps();
    case "snowy-rainy":
      return us();
    case "windy":
      return mi(!1);
    case "windy-variant":
      return mi(!0);
    case "fog":
      return hs();
    case "hail":
      return fs();
    case "lightning":
      return gs();
    case "lightning-rainy":
      return ms();
    case "exceptional":
      return bs();
    default:
      return t;
  }
}
function vs(t, e) {
  ls(e), e.replaceChildren();
  const i = ys(t);
  return e.appendChild(i), {
    type: t,
    element: i,
    cleanup: () => {
      i.remove();
    }
  };
}
function ws(t) {
  t && t.cleanup();
}
const xs = 100;
class $s {
  constructor(e) {
    this.apply = e, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(e) {
    if (e.prev !== e.next) {
      for (this.apply(e.next), this.undoStack.push(e); this.undoStack.length > xs; ) this.undoStack.shift();
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
function O(t) {
  return t < 0 ? 0 : t > 100 ? 100 : t;
}
function We(t, e = 8) {
  return Math.round(t / e) * e;
}
function _s(t) {
  const e = new Set(t.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `node_${i}`;
    if (!e.has(o)) return o;
  }
  return `node_${Date.now()}`;
}
function As(t) {
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
    n.id === e && (n.position = { x: O(i.x), y: O(i.y) });
  return o;
}
function Cs(t, e, i) {
  const o = I(t), n = {
    id: _s(t),
    position: { x: O(e.x), y: O(e.y) },
    ...i ? { label: i } : {}
  };
  return o.nodes.push(n), { config: o, node: n };
}
function Ss(t, e) {
  const i = I(t);
  return i.nodes = i.nodes.filter((o) => o.id !== e), i.flows = i.flows.filter((o) => o.from_node !== e && o.to_node !== e), i;
}
function ks(t, e) {
  const i = I(t);
  for (const o of i.nodes) {
    const n = e.get(o.id);
    n && (o.position = { x: O(n.x), y: O(n.y) });
  }
  return i;
}
function Is(t, e) {
  const i = I(t);
  return i.nodes = i.nodes.filter((o) => !e.has(o.id)), i.flows = i.flows.filter((o) => !e.has(o.from_node) && !e.has(o.to_node)), i;
}
function bi(t, e, i) {
  const o = I(t);
  for (const n of o.nodes)
    e.has(n.id) && (n.visible = i);
  return o;
}
function Fs(t, e, i) {
  const o = t.nodes.find((s) => s.id === i);
  if (!o) return t;
  const n = I(t);
  for (const s of n.nodes)
    e.has(s.id) && (s.position = { ...s.position, y: o.position.y });
  return n;
}
function Ps(t, e, i) {
  const o = t.nodes.find((s) => s.id === i);
  if (!o) return t;
  const n = I(t);
  for (const s of n.nodes)
    e.has(s.id) && (s.position = { ...s.position, x: o.position.x });
  return n;
}
function yi(t, e, i) {
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
        x: O(o.x),
        y: O(o.y)
      };
    }
  return n;
}
function vi(t, e, i, o) {
  const n = I(t);
  for (const s of n.flows) {
    if (s.id !== e) continue;
    const r = Math.max(0, Math.min(s.waypoints.length, i));
    s.waypoints.splice(r, 0, {
      x: O(o.x),
      y: O(o.y)
    });
  }
  return n;
}
function wi(t, e, i) {
  const o = I(t);
  for (const n of o.flows)
    if (n.id === e) {
      if (i < 0 || i >= n.waypoints.length) return t;
      n.waypoints.splice(i, 1);
    }
  return o;
}
function xi(t, e, i, o) {
  const n = I(t), s = {
    id: As(t),
    from_node: e,
    to_node: i,
    entity: o,
    waypoints: []
  };
  return n.flows.push(s), { config: n, flow: s };
}
function Ms(t, e) {
  const i = I(t);
  return i.flows = i.flows.filter((o) => o.id !== e), i;
}
function $i(t, e) {
  const i = I(t);
  return i.background.default = e, i;
}
function Bs(t, e) {
  const i = I(t);
  return e && e.length ? i.background.weather_entity = e : delete i.background.weather_entity, i;
}
function Ns(t, e) {
  const i = I(t);
  return e && e.length ? i.background.sun_entity = e : delete i.background.sun_entity, i;
}
function Es(t, e) {
  const i = I(t);
  return e ? i.background.weather_effects = !0 : delete i.background.weather_effects, i;
}
function Rs(t, e) {
  const i = I(t);
  return e === void 0 || !Number.isFinite(e) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(e)), i;
}
function _i(t, e, i) {
  const o = I(t), n = o.background.weather_states ?? {};
  return o.background.weather_states = { ...n, [e]: i }, o;
}
function Ds(t) {
  const e = I(t), i = e.background.weather_states ?? {};
  let o = 1;
  for (; Object.prototype.hasOwnProperty.call(i, `state_${o}`); )
    o += 1;
  const n = `state_${o}`;
  return e.background.weather_states = { ...i, [n]: "" }, e;
}
function zs(t, e) {
  const i = I(t);
  return i.background.weather_states && (delete i.background.weather_states[e], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function Ls(t) {
  const e = new Set((t.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const o = `overlay_${i}`;
    if (!e.has(o)) return o;
  }
  return `overlay_${Date.now()}`;
}
function Ts(t, e) {
  const i = I(t), o = e.id ?? Ls(t), n = {
    ...e,
    id: o,
    position: {
      x: O(e.position.x),
      y: O(e.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function Os(t, e) {
  const i = I(t);
  return i.overlays = (i.overlays ?? []).filter((o) => o.id !== e), i.overlays.length === 0 && delete i.overlays, i;
}
function Hs(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && (n.position = { x: O(i.x), y: O(i.y) });
  return o;
}
function Ai(t, e, i) {
  const o = I(t), n = Math.max(2, Math.min(100, i.width)), s = Math.max(2, Math.min(100, i.height));
  for (const r of o.overlays ?? [])
    r.id === e && (r.size = { width: n, height: s });
  return o;
}
function Ws(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && i && (n.card = i);
  return o;
}
function Gs(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    n.id === e && (i ? delete n.visible : n.visible = !1);
  return o;
}
function Us(t, e, i) {
  const o = I(t);
  for (const n of o.overlays ?? [])
    if (n.id === e) {
      const s = Math.max(0, Math.min(1, i));
      s === 1 ? delete n.opacity : n.opacity = s;
    }
  return o;
}
function Ci(t, e, i) {
  const o = I(t);
  return o.opacity = { ...o.opacity, [e]: i }, o;
}
function Ks(t, e, i) {
  const o = I(t);
  return o.nodes = o.nodes.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), o;
}
function js(t, e, i) {
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
function Vs(t, e, i) {
  if (e === i) return t;
  const o = I(t), n = o.background.weather_states;
  if (!n || !(e in n)) return t;
  const s = n[e];
  return s === void 0 ? t : (delete n[e], n[i] = s, o);
}
function Ys(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 || i === "corner" ? delete s.line_style : s.line_style = i, s;
  }), o;
}
function Si(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 ? delete s.color : s.color = i, s;
  }), o;
}
function ki(t, e, i) {
  const o = I(t);
  return o.nodes = o.nodes.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i ? delete s.visible : s.visible = !1, s;
  }), o;
}
function Zs(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i ? delete s.visible : s.visible = !1, s;
  }), o;
}
function Xs(t, e, i) {
  const o = I(t);
  return o.visibility = { ...o.visibility, [e]: i }, o;
}
function Ii(t, e, i) {
  const o = I(t);
  return i === void 0 ? o.domain_colors && (delete o.domain_colors[e], Object.keys(o.domain_colors).length === 0 && delete o.domain_colors) : o.domain_colors = { ...o.domain_colors, [e]: i }, o;
}
function qs(t, e, i) {
  const o = i.trim();
  if (!o || o === e) return t;
  const n = t.flows.findIndex((r) => r.id === e);
  if (n < 0 || t.flows.some((r, c) => c !== n && r.id === o)) return t;
  const s = I(t);
  return s.flows = s.flows.map((r) => r.id === e ? { ...r, id: o } : r), s;
}
function Fi(t, e, i) {
  const o = i.trim();
  if (!o || o === e) return t;
  const n = t.overlays ?? [], s = n.findIndex((c) => c.id === e);
  if (s < 0 || n.some((c, a) => a !== s && c.id === o)) return t;
  const r = I(t);
  return r.overlays = n.map((c) => c.id === e ? { ...c, id: o } : c), r;
}
function q(t, e, i) {
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
function Js(t, e) {
  const i = I(t);
  return i.flows = i.flows.map((o) => {
    if (o.id !== e) return o;
    const n = { ...o };
    return delete n.animation, n;
  }), i;
}
function Pi(t, e) {
  const i = I(t), o = { ...i.animation };
  for (const n of Object.keys(e)) {
    const s = e[n];
    s === void 0 ? delete o[n] : Object.assign(o, { [n]: s });
  }
  return Object.keys(o).length === 0 ? delete i.animation : i.animation = o, i;
}
function Mi(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 || !Number.isFinite(i) ? delete s.peak_value : s.peak_value = i, s;
  }), o;
}
function Qs(t, e, i) {
  const o = I(t);
  return o.flows = o.flows.map((n) => {
    if (n.id !== e) return n;
    const s = { ...n };
    return i === void 0 || i === "" || i === e ? delete s.label : s.label = i, s;
  }), o;
}
function er(t, e) {
  const i = I(t);
  return e ? delete i.pause_when_hidden : i.pause_when_hidden = !1, i;
}
function tr(t, e, i) {
  const o = I(t), n = o.flows.find((s) => s.id === e);
  return n && (n.value_gradient = i), o;
}
function ir(t, e, i) {
  const o = I(t), n = o.flows.find((s) => s.id === e);
  return n && (n.value_gradient = { ...n.value_gradient, ...i }), o;
}
function Bi(t, e) {
  const i = I(t), o = i.flows.find((n) => n.id === e);
  return o && delete o.value_gradient, i;
}
const Dt = 8, Ni = 1, $t = 255;
function or(t, e = Dt) {
  const i = Math.max(1, Math.floor(e)), o = Math.max(1, Math.ceil(t.width / i)), n = Math.max(1, Math.ceil(t.height / i)), s = new Uint16Array(o * n);
  for (let r = 0; r < n; r++) {
    const c = r * i, a = Math.min(t.height, c + i);
    for (let d = 0; d < o; d++) {
      const p = d * i, h = Math.min(t.width, p + i);
      let u = 0;
      for (let g = c; g < a; g++) {
        const b = g * t.width;
        for (let v = p; v < h; v++) {
          const m = t.data[b + v] ?? 0;
          m > u && (u = m);
        }
      }
      const f = $t - u;
      s[r * o + d] = f < Ni ? Ni : f;
    }
  }
  return { cols: o, rows: n, cellSize: i, data: s };
}
function nr(t, e, i) {
  return i * t.cols + e;
}
function sr(t, e, i) {
  return e < 0 || i < 0 || e >= t.cols || i >= t.rows ? $t : t.data[nr(t, e, i)] ?? $t;
}
const rr = 480, ar = 270, lr = 30;
function cr(t, e, i = rr, o = ar) {
  if (t <= 0 || e <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / t, o / e, 1);
  return {
    width: Math.max(1, Math.floor(t * n)),
    height: Math.max(1, Math.floor(e * n))
  };
}
function dr(t, e, i) {
  const o = new Uint8ClampedArray(e * i);
  for (let n = 0, s = 0; n < t.length; n += 4, s++) {
    const r = t[n] ?? 0, c = t[n + 1] ?? 0, a = t[n + 2] ?? 0;
    o[s] = 0.2126 * r + 0.7152 * c + 0.0722 * a;
  }
  return o;
}
function pr(t, e, i) {
  const o = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e;
    for (let c = 0; c < e; c++) {
      const a = t[r + Math.max(0, c - 1)] ?? 0, d = t[r + c] ?? 0, p = t[r + Math.min(e - 1, c + 1)] ?? 0;
      o[r + c] = a + 2 * d + p >> 2;
    }
  }
  const n = new Uint8ClampedArray(t.length);
  for (let s = 0; s < i; s++) {
    const r = s * e, c = Math.max(0, s - 1) * e, a = Math.min(i - 1, s + 1) * e;
    for (let d = 0; d < e; d++) {
      const p = o[c + d] ?? 0, h = o[r + d] ?? 0, u = o[a + d] ?? 0;
      n[r + d] = p + 2 * h + u >> 2;
    }
  }
  return n;
}
function ur(t, e, i) {
  const o = new Uint8ClampedArray(e * i);
  for (let n = 1; n < i - 1; n++) {
    const s = (n - 1) * e, r = n * e, c = (n + 1) * e;
    for (let a = 1; a < e - 1; a++) {
      const d = t[s + (a - 1)] ?? 0, p = t[s + a] ?? 0, h = t[s + (a + 1)] ?? 0, u = t[r + (a - 1)] ?? 0, f = t[r + (a + 1)] ?? 0, g = t[c + (a - 1)] ?? 0, b = t[c + a] ?? 0, v = t[c + (a + 1)] ?? 0, m = -d - 2 * u - g + h + 2 * f + v, $ = -d - 2 * p - h + g + 2 * b + v;
      let _ = Math.sqrt(m * m + $ * $);
      _ < lr && (_ = 0), _ > 255 && (_ = 255), o[r + a] = _;
    }
  }
  return { width: e, height: i, data: o };
}
function po(t, e, i) {
  const o = cr(e, i), n = document.createElement("canvas");
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
function hr(t, e, i) {
  const { width: o, height: n, rgba: s } = po(t, e, i), r = dr(s, o, n), c = pr(r, o, n);
  return ur(c, o, n);
}
const fr = 50;
class gr {
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
function mr(t, e, i) {
  const [o, n] = e, [s, r] = i;
  if (o < 0 || n < 0 || o >= t.cols || n >= t.rows || s < 0 || r < 0 || s >= t.cols || r >= t.rows) return null;
  if (o === s && n === r) return [[o, n]];
  const c = t.cols * t.rows, a = new Float32Array(c);
  a.fill(1 / 0);
  const d = new Int16Array(c), p = new Int16Array(c);
  d.fill(-1), p.fill(-1);
  const h = new Uint8Array(c), u = new Uint8Array(c), f = n * t.cols + o;
  a[f] = 0;
  const g = new gr();
  g.push({ col: o, row: n, f: Ei(o, n, s, r) });
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
        return br(t, d, p, i);
      for (const [C, F, R] of b) {
        const z = m + C, E = $ + F;
        if (z < 0 || E < 0 || z >= t.cols || E >= t.rows) continue;
        const x = E * t.cols + z;
        if (u[x]) continue;
        const D = sr(t, z, E), T = h[_] && h[_] !== R ? fr : 0, L = (a[_] ?? 1 / 0) + D + T;
        if (L < (a[x] ?? 1 / 0)) {
          a[x] = L, d[x] = m, p[x] = $, h[x] = R;
          const W = L + Ei(z, E, s, r);
          g.push({ col: z, row: E, f: W });
        }
      }
    }
  }
  return null;
}
function Ei(t, e, i, o) {
  return Math.abs(t - i) + Math.abs(e - o);
}
function br(t, e, i, o) {
  const n = [];
  let s = o[0], r = o[1];
  for (; s !== -1 && r !== -1; ) {
    n.push([s, r]);
    const c = r * t.cols + s, a = e[c] ?? -1, d = i[c] ?? -1;
    if (a === s && d === r || (s = a, r = d, s < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
function yr(t) {
  if (t.length <= 2) return [...t];
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i++) {
    const o = t[i - 1], n = t[i], s = t[i + 1], r = n[0] - o[0], c = n[1] - o[1], a = s[0] - n[0], d = s[1] - n[1];
    r * d - c * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(c) === Math.sign(d) || e.push(n);
  }
  return e.push(t[t.length - 1]), e;
}
function vr(t, e, i) {
  const o = Ri(e, t), n = Ri(i, t), s = mr(t, o, n);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: yr(s).slice(1, -1).map((d) => wr(d, t)), edgesUsable: !0 };
}
function Ri(t, e) {
  const i = Di(Math.floor(t.x / 100 * e.cols), 0, e.cols - 1), o = Di(Math.floor(t.y / 100 * e.rows), 0, e.rows - 1);
  return [i, o];
}
function wr(t, e) {
  return {
    x: (t[0] + 0.5) / e.cols * 100,
    y: (t[1] + 0.5) / e.rows * 100
  };
}
function Di(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
const je = /* @__PURE__ */ new Map();
async function zi(t, e = {}) {
  const i = performance.now(), o = e.cellSize ?? Dt, n = `${t.imageUrl}|${o}`, s = je.has(n);
  let r = null;
  try {
    r = await $r(n, t.imageUrl, o);
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
  const { waypoints: c, edgesUsable: a } = vr(r, t.from, t.to);
  return {
    waypoints: c,
    cached: s,
    edgesUsable: a,
    elapsedMs: performance.now() - i
  };
}
async function xr(t) {
  if (!t) return null;
  try {
    const e = await uo(t);
    return po(e, e.naturalWidth, e.naturalHeight);
  } catch {
    return null;
  }
}
function $r(t, e, i) {
  const o = je.get(t);
  if (o) return o;
  const n = _r(e, i).catch((s) => {
    throw je.delete(t), s;
  });
  return je.set(t, n), n;
}
async function _r(t, e) {
  const i = await uo(t);
  await Li();
  const o = hr(i, i.naturalWidth, i.naturalHeight);
  return await Li(), or(o, e);
}
function uo(t) {
  return new Promise((e, i) => {
    const o = new Image();
    o.crossOrigin = "anonymous", o.decoding = "async", o.onload = () => e(o), o.onerror = () => i(new Error(`Failed to load background image: ${t}`)), o.src = t;
  });
}
function Li() {
  return new Promise((t) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(t, 0)) : setTimeout(t, 0);
  });
}
const ho = "flowme", Ti = "/local/community/flowme/backgrounds/";
function Ar() {
  return `media-source://media_source/${ho}/.`;
}
function Cr(t) {
  const e = typeof t.media_content_id == "string" ? t.media_content_id : "", i = `media-source://media_source/${ho}/`;
  if (e.startsWith(i)) {
    let s = e.slice(i.length);
    return s.startsWith("./") && (s = s.slice(2)), Ti + s;
  }
  const n = (typeof t.title == "string" ? t.title : "").replace(/^\/+/, "");
  if (n.length > 0)
    return Ti + n;
}
const fo = "ZnVuY3Rpb24gZCh0LCBuID0gOCkgewogIGNvbnN0IG8gPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG4pKSwgYyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0LndpZHRoIC8gbykpLCByID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHQuaGVpZ2h0IC8gbykpLCBzID0gbmV3IFVpbnQxNkFycmF5KGMgKiByKTsKICBmb3IgKGxldCBlID0gMDsgZSA8IHI7IGUrKykgewogICAgY29uc3QgbCA9IGUgKiBvLCBhID0gTWF0aC5taW4odC5oZWlnaHQsIGwgKyBvKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBpICogbywgdSA9IE1hdGgubWluKHQud2lkdGgsIGYgKyBvKTsKICAgICAgbGV0IGggPSAwOwogICAgICBmb3IgKGxldCBwID0gbDsgcCA8IGE7IHArKykgewogICAgICAgIGNvbnN0IEUgPSBwICogdC53aWR0aDsKICAgICAgICBmb3IgKGxldCB5ID0gZjsgeSA8IHU7IHkrKykgewogICAgICAgICAgY29uc3QgbSA9IHQuZGF0YVtFICsgeV0gPz8gMDsKICAgICAgICAgIG0gPiBoICYmIChoID0gbSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGNvbnN0IHggPSAyNTUgLSBoOwogICAgICBzW2UgKiBjICsgaV0gPSB4IDwgMSA/IDEgOiB4OwogICAgfQogIH0KICByZXR1cm4geyBjb2xzOiBjLCByb3dzOiByLCBjZWxsU2l6ZTogbywgZGF0YTogcyB9Owp9CmZ1bmN0aW9uIFAodCwgbiwgbykgewogIHJldHVybiBvICogdC5jb2xzICsgbjsKfQpmdW5jdGlvbiBSKHQsIG4sIG8pIHsKICByZXR1cm4gbiA8IDAgfHwgbyA8IDAgfHwgbiA+PSB0LmNvbHMgfHwgbyA+PSB0LnJvd3MgPyAyNTUgOiB0LmRhdGFbUCh0LCBuLCBvKV0gPz8gMjU1Owp9CmNvbnN0IE4gPSA1MDsKY2xhc3MgayB7CiAgY29uc3RydWN0b3IoKSB7CiAgICB0aGlzLmFyciA9IFtdOwogIH0KICBwdXNoKG4pIHsKICAgIHRoaXMuYXJyLnB1c2gobiksIHRoaXMuYnViYmxlVXAodGhpcy5hcnIubGVuZ3RoIC0gMSk7CiAgfQogIHBvcCgpIHsKICAgIGlmICh0aGlzLmFyci5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IG4gPSB0aGlzLmFyclswXSwgbyA9IHRoaXMuYXJyLnBvcCgpOwogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aCA+IDAgJiYgKHRoaXMuYXJyWzBdID0gbywgdGhpcy5zaW5rRG93bigwKSksIG47CiAgfQogIGdldCBzaXplKCkgewogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDsKICB9CiAgYnViYmxlVXAobikgewogICAgZm9yICg7IG4gPiAwOyApIHsKICAgICAgY29uc3QgbyA9IG4gLSAxID4+IDE7CiAgICAgIGlmICgodGhpcy5hcnJbb10/LmYgPz8gMCkgPD0gKHRoaXMuYXJyW25dPy5mID8/IDApKSByZXR1cm47CiAgICAgIFt0aGlzLmFycltvXSwgdGhpcy5hcnJbbl1dID0gW3RoaXMuYXJyW25dLCB0aGlzLmFycltvXV0sIG4gPSBvOwogICAgfQogIH0KICBzaW5rRG93bihuKSB7CiAgICBjb25zdCBvID0gdGhpcy5hcnIubGVuZ3RoOwogICAgZm9yICg7IDsgKSB7CiAgICAgIGNvbnN0IGMgPSAyICogbiArIDEsIHIgPSAyICogbiArIDI7CiAgICAgIGxldCBzID0gbjsKICAgICAgaWYgKGMgPCBvICYmICh0aGlzLmFycltjXT8uZiA/PyAwKSA8ICh0aGlzLmFycltzXT8uZiA/PyAwKSAmJiAocyA9IGMpLCByIDwgbyAmJiAodGhpcy5hcnJbcl0/LmYgPz8gMCkgPCAodGhpcy5hcnJbc10/LmYgPz8gMCkgJiYgKHMgPSByKSwgcyA9PT0gbikgcmV0dXJuOwogICAgICBbdGhpcy5hcnJbc10sIHRoaXMuYXJyW25dXSA9IFt0aGlzLmFycltuXSwgdGhpcy5hcnJbc11dLCBuID0gczsKICAgIH0KICB9Cn0KZnVuY3Rpb24geih0LCBuLCBvKSB7CiAgY29uc3QgW2MsIHJdID0gbiwgW3MsIGVdID0gbzsKICBpZiAoYyA8IDAgfHwgciA8IDAgfHwgYyA+PSB0LmNvbHMgfHwgciA+PSB0LnJvd3MgfHwgcyA8IDAgfHwgZSA8IDAgfHwgcyA+PSB0LmNvbHMgfHwgZSA+PSB0LnJvd3MpIHJldHVybiBudWxsOwogIGlmIChjID09PSBzICYmIHIgPT09IGUpIHJldHVybiBbW2MsIHJdXTsKICBjb25zdCBsID0gdC5jb2xzICogdC5yb3dzLCBhID0gbmV3IEZsb2F0MzJBcnJheShsKTsKICBhLmZpbGwoMSAvIDApOwogIGNvbnN0IGkgPSBuZXcgSW50MTZBcnJheShsKSwgZiA9IG5ldyBJbnQxNkFycmF5KGwpOwogIGkuZmlsbCgtMSksIGYuZmlsbCgtMSk7CiAgY29uc3QgdSA9IG5ldyBVaW50OEFycmF5KGwpLCBoID0gbmV3IFVpbnQ4QXJyYXkobCksIHggPSByICogdC5jb2xzICsgYzsKICBhW3hdID0gMDsKICBjb25zdCBwID0gbmV3IGsoKTsKICBwLnB1c2goeyBjb2w6IGMsIHJvdzogciwgZjogSShjLCByLCBzLCBlKSB9KTsKICBjb25zdCBFID0gWwogICAgWzEsIDAsIDFdLAogICAgWy0xLCAwLCAyXSwKICAgIFswLCAxLCAzXSwKICAgIFswLCAtMSwgNF0KICBdOwogIGZvciAoOyBwLnNpemUgPiAwOyApIHsKICAgIGNvbnN0IHkgPSBwLnBvcCgpLCB7IGNvbDogbSwgcm93OiBNIH0gPSB5LCB3ID0gTSAqIHQuY29scyArIG07CiAgICBpZiAoIWhbd10pIHsKICAgICAgaWYgKGhbd10gPSAxLCBtID09PSBzICYmIE0gPT09IGUpCiAgICAgICAgcmV0dXJuIFgodCwgaSwgZiwgbyk7CiAgICAgIGZvciAoY29uc3QgW0wsIGcsIF9dIG9mIEUpIHsKICAgICAgICBjb25zdCBDID0gbSArIEwsIGIgPSBNICsgZzsKICAgICAgICBpZiAoQyA8IDAgfHwgYiA8IDAgfHwgQyA+PSB0LmNvbHMgfHwgYiA+PSB0LnJvd3MpIGNvbnRpbnVlOwogICAgICAgIGNvbnN0IEEgPSBiICogdC5jb2xzICsgQzsKICAgICAgICBpZiAoaFtBXSkgY29udGludWU7CiAgICAgICAgY29uc3QgRCA9IFIodCwgQywgYiksIEYgPSB1W3ddICYmIHVbd10gIT09IF8gPyBOIDogMCwgVSA9IChhW3ddID8/IDEgLyAwKSArIEQgKyBGOwogICAgICAgIGlmIChVIDwgKGFbQV0gPz8gMSAvIDApKSB7CiAgICAgICAgICBhW0FdID0gVSwgaVtBXSA9IG0sIGZbQV0gPSBNLCB1W0FdID0gXzsKICAgICAgICAgIGNvbnN0IE8gPSBVICsgSShDLCBiLCBzLCBlKTsKICAgICAgICAgIHAucHVzaCh7IGNvbDogQywgcm93OiBiLCBmOiBPIH0pOwogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICByZXR1cm4gbnVsbDsKfQpmdW5jdGlvbiBJKHQsIG4sIG8sIGMpIHsKICByZXR1cm4gTWF0aC5hYnModCAtIG8pICsgTWF0aC5hYnMobiAtIGMpOwp9CmZ1bmN0aW9uIFgodCwgbiwgbywgYykgewogIGNvbnN0IHIgPSBbXTsKICBsZXQgcyA9IGNbMF0sIGUgPSBjWzFdOwogIGZvciAoOyBzICE9PSAtMSAmJiBlICE9PSAtMTsgKSB7CiAgICByLnB1c2goW3MsIGVdKTsKICAgIGNvbnN0IGwgPSBlICogdC5jb2xzICsgcywgYSA9IG5bbF0gPz8gLTEsIGkgPSBvW2xdID8/IC0xOwogICAgaWYgKGEgPT09IHMgJiYgaSA9PT0gZSB8fCAocyA9IGEsIGUgPSBpLCBzIDwgMCB8fCBlIDwgMCkpIGJyZWFrOwogIH0KICByZXR1cm4gci5yZXZlcnNlKCksIHJbMF0/LlswXSA9PT0gLTEgJiYgci5zaGlmdCgpLCByOwp9CmNvbnN0IFogPSAzMDsKZnVuY3Rpb24gdih0LCBuLCBvKSB7CiAgY29uc3QgYyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuICogbyk7CiAgZm9yIChsZXQgciA9IDAsIHMgPSAwOyByIDwgdC5sZW5ndGg7IHIgKz0gNCwgcysrKSB7CiAgICBjb25zdCBlID0gdFtyXSA/PyAwLCBsID0gdFtyICsgMV0gPz8gMCwgYSA9IHRbciArIDJdID8/IDA7CiAgICBjW3NdID0gMC4yMTI2ICogZSArIDAuNzE1MiAqIGwgKyAwLjA3MjIgKiBhOwogIH0KICByZXR1cm4gYzsKfQpmdW5jdGlvbiBHKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHQubGVuZ3RoKTsKICBmb3IgKGxldCBzID0gMDsgcyA8IG87IHMrKykgewogICAgY29uc3QgZSA9IHMgKiBuOwogICAgZm9yIChsZXQgbCA9IDA7IGwgPCBuOyBsKyspIHsKICAgICAgY29uc3QgYSA9IHRbZSArIE1hdGgubWF4KDAsIGwgLSAxKV0gPz8gMCwgaSA9IHRbZSArIGxdID8/IDAsIGYgPSB0W2UgKyBNYXRoLm1pbihuIC0gMSwgbCArIDEpXSA/PyAwOwogICAgICBjW2UgKyBsXSA9IGEgKyAyICogaSArIGYgPj4gMjsKICAgIH0KICB9CiAgY29uc3QgciA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0Lmxlbmd0aCk7CiAgZm9yIChsZXQgcyA9IDA7IHMgPCBvOyBzKyspIHsKICAgIGNvbnN0IGUgPSBzICogbiwgbCA9IE1hdGgubWF4KDAsIHMgLSAxKSAqIG4sIGEgPSBNYXRoLm1pbihvIC0gMSwgcyArIDEpICogbjsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBjW2wgKyBpXSA/PyAwLCB1ID0gY1tlICsgaV0gPz8gMCwgaCA9IGNbYSArIGldID8/IDA7CiAgICAgIHJbZSArIGldID0gZiArIDIgKiB1ICsgaCA+PiAyOwogICAgfQogIH0KICByZXR1cm4gcjsKfQpmdW5jdGlvbiBIKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4gKiBvKTsKICBmb3IgKGxldCByID0gMTsgciA8IG8gLSAxOyByKyspIHsKICAgIGNvbnN0IHMgPSAociAtIDEpICogbiwgZSA9IHIgKiBuLCBsID0gKHIgKyAxKSAqIG47CiAgICBmb3IgKGxldCBhID0gMTsgYSA8IG4gLSAxOyBhKyspIHsKICAgICAgY29uc3QgaSA9IHRbcyArIChhIC0gMSldID8/IDAsIGYgPSB0W3MgKyBhXSA/PyAwLCB1ID0gdFtzICsgKGEgKyAxKV0gPz8gMCwgaCA9IHRbZSArIChhIC0gMSldID8/IDAsIHggPSB0W2UgKyAoYSArIDEpXSA/PyAwLCBwID0gdFtsICsgKGEgLSAxKV0gPz8gMCwgRSA9IHRbbCArIGFdID8/IDAsIHkgPSB0W2wgKyAoYSArIDEpXSA/PyAwLCBtID0gLWkgLSAyICogaCAtIHAgKyB1ICsgMiAqIHggKyB5LCBNID0gLWkgLSAyICogZiAtIHUgKyBwICsgMiAqIEUgKyB5OwogICAgICBsZXQgdyA9IE1hdGguc3FydChtICogbSArIE0gKiBNKTsKICAgICAgdyA8IFogJiYgKHcgPSAwKSwgdyA+IDI1NSAmJiAodyA9IDI1NSksIGNbZSArIGFdID0gdzsKICAgIH0KICB9CiAgcmV0dXJuIHsgd2lkdGg6IG4sIGhlaWdodDogbywgZGF0YTogYyB9Owp9CmZ1bmN0aW9uIFcodCkgewogIGlmICh0Lmxlbmd0aCA8PSAyKSByZXR1cm4gWy4uLnRdOwogIGNvbnN0IG4gPSBbdFswXV07CiAgZm9yIChsZXQgbyA9IDE7IG8gPCB0Lmxlbmd0aCAtIDE7IG8rKykgewogICAgY29uc3QgYyA9IHRbbyAtIDFdLCByID0gdFtvXSwgcyA9IHRbbyArIDFdLCBlID0gclswXSAtIGNbMF0sIGwgPSByWzFdIC0gY1sxXSwgYSA9IHNbMF0gLSByWzBdLCBpID0gc1sxXSAtIHJbMV07CiAgICBlICogaSAtIGwgKiBhID09PSAwICYmIE1hdGguc2lnbihlKSA9PT0gTWF0aC5zaWduKGEpICYmIE1hdGguc2lnbihsKSA9PT0gTWF0aC5zaWduKGkpIHx8IG4ucHVzaChyKTsKICB9CiAgcmV0dXJuIG4ucHVzaCh0W3QubGVuZ3RoIC0gMV0pLCBuOwp9CmZ1bmN0aW9uIGoodCwgbiwgbywgYywgciwgcyA9IDgpIHsKICBjb25zdCBlID0gdih0LCBuLCBvKSwgbCA9IEcoZSwgbiwgbyksIGEgPSBIKGwsIG4sIG8pLCBpID0gZChhLCBzKTsKICByZXR1cm4gcShpLCBjLCByKTsKfQpmdW5jdGlvbiBxKHQsIG4sIG8pIHsKICBjb25zdCBjID0gUyhuLCB0KSwgciA9IFMobywgdCksIHMgPSB6KHQsIGMsIHIpOwogIHJldHVybiAhcyB8fCBzLmxlbmd0aCA8IDIgPyB7IHdheXBvaW50czogW10sIGVkZ2VzVXNhYmxlOiAhMCB9IDogeyB3YXlwb2ludHM6IFcocykuc2xpY2UoMSwgLTEpLm1hcCgoaSkgPT4gQihpLCB0KSksIGVkZ2VzVXNhYmxlOiAhMCB9Owp9CmZ1bmN0aW9uIFModCwgbikgewogIGNvbnN0IG8gPSBUKE1hdGguZmxvb3IodC54IC8gMTAwICogbi5jb2xzKSwgMCwgbi5jb2xzIC0gMSksIGMgPSBUKE1hdGguZmxvb3IodC55IC8gMTAwICogbi5yb3dzKSwgMCwgbi5yb3dzIC0gMSk7CiAgcmV0dXJuIFtvLCBjXTsKfQpmdW5jdGlvbiBCKHQsIG4pIHsKICByZXR1cm4gewogICAgeDogKHRbMF0gKyAwLjUpIC8gbi5jb2xzICogMTAwLAogICAgeTogKHRbMV0gKyAwLjUpIC8gbi5yb3dzICogMTAwCiAgfTsKfQpmdW5jdGlvbiBUKHQsIG4sIG8pIHsKICByZXR1cm4gdCA8IG4gPyBuIDogdCA+IG8gPyBvIDogdDsKfQpzZWxmLm9ubWVzc2FnZSA9ICh0KSA9PiB7CiAgY29uc3QgeyByZ2JhOiBuLCB3aWR0aDogbywgaGVpZ2h0OiBjLCBmcm9tUG9zOiByLCB0b1BvczogcywgY2VsbFNpemU6IGUgfSA9IHQuZGF0YSwgbCA9IHBlcmZvcm1hbmNlLm5vdygpOwogIHRyeSB7CiAgICBjb25zdCBhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4pLCBpID0gZSA/PyA4LCB7IHdheXBvaW50czogZiwgZWRnZXNVc2FibGU6IHUgfSA9IGooYSwgbywgYywgciwgcywgaSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgd2F5cG9pbnRzOiBmLAogICAgICBlZGdlc1VzYWJsZTogdSwKICAgICAgZWxhcHNlZE1zOiBwZXJmb3JtYW5jZS5ub3coKSAtIGwKICAgIH0pOwogIH0gY2F0Y2ggKGEpIHsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB3YXlwb2ludHM6IFtdLAogICAgICBlZGdlc1VzYWJsZTogITEsCiAgICAgIGVsYXBzZWRNczogcGVyZm9ybWFuY2Uubm93KCkgLSBsLAogICAgICBlcnJvcjogYSBpbnN0YW5jZW9mIEVycm9yID8gYS5tZXNzYWdlIDogU3RyaW5nKGEpCiAgICB9KTsKICB9Cn07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhmaW5kaW5nLndvcmtlci1CUHhaVndVTS5qcy5tYXAK", Sr = (t) => Uint8Array.from(atob(t), (e) => e.charCodeAt(0)), Oi = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Sr(fo)], { type: "text/javascript;charset=utf-8" });
function kr(t) {
  let e;
  try {
    if (e = Oi && (self.URL || self.webkitURL).createObjectURL(Oi), !e) throw "";
    const i = new Worker(e, {
      type: "module",
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + fo,
      {
        type: "module",
        name: t?.name
      }
    );
  }
}
var Ir = Object.defineProperty, Fr = Object.getOwnPropertyDescriptor, N = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Fr(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && Ir(e, i, n), n;
};
const ft = "not_configured", Pr = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"];
function Mr(t) {
  const e = t ?? "16:10", i = /^(\d+):(\d+)$/.exec(e);
  if (!i) return { w: 16, h: 10 };
  const o = Number.parseInt(i[1], 10), n = Number.parseInt(i[2], 10);
  return !o || !n ? { w: 16, h: 10 } : { w: o, h: n };
}
let M = class extends re {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.inlineRename = null, this.canUndo = !1, this.nodeLabelInputRef = V(), this.flowIdInputRef = V(), this.overlayIdInputRef = V(), this._pendingInspectorLabelFocus = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.flowEndpointPathfindingFlowId = null, this.flowEndpointError = null, this.flowZeroThresholdDraft = {}, this.flowInspectorAdvancedOpen = {}, this.imageBrowserOpen = !1, this.imageBrowserLoading = !1, this.imageBrowserError = "", this.imageBrowserField = "default", this.imageBrowserFiles = [], this._pathWorkerPending = !1, this._pathPendingSelection = null, this.selectorType = "", this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1, this._loadedImageUrl = "", this.spaceHeld = !1, this.panPointerId = null, this.stageRef = V(), this.canvasRef = V(), this.editorFxSvgRef = V(), this.editorNodeFx = new co(), this._editorFxRaf = null, this.undoStack = new $s((t) => this.applyConfig(
      t,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (t) => {
      if (!this.config) return;
      const e = t.target.value, i = this.config, o = $i(i, e);
      this.pushPatch(i, o, "edit default background");
    }, this.onWeatherEffectsChange = (t) => {
      if (!this.config) return;
      const e = t.target.checked, i = this.config, o = Es(i, e);
      this.pushPatch(i, o, "toggle weather effects");
    }, this.onWeatherStateRemove = (t) => {
      if (!this.config) return;
      const e = this.config, i = zs(e, t);
      this.pushPatch(e, i, `remove weather state ${t}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const t = this.config, e = Ds(t), i = t.background.weather_states ?? {}, o = Object.keys(e.background.weather_states ?? {}).find((n) => !(n in i));
      this.pushPatch(t, e, o ? `Add weather state ${o}` : "Add weather state");
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: t, toNodeId: e, waypoints: i } = this.suggestPreview, o = window.prompt(l("editor.inspector.flowEntityPrompt"), l("editor.inspector.flowEntityDefault")) ?? l("editor.inspector.flowEntityDefault"), n = this.config, s = n.flows.find(
        (a) => a.from_node === t && a.to_node === e
      );
      let r, c;
      if (s)
        c = s.id, r = {
          ...n,
          flows: n.flows.map(
            (a) => a.id === s.id ? { ...a, waypoints: i.map((d) => ({ x: d.x, y: d.y })) } : a
          )
        };
      else {
        const { config: a, flow: d } = xi(n, t, e, o);
        c = d.id, r = {
          ...a,
          flows: a.flows.map(
            (p) => p.id === d.id ? { ...p, waypoints: i.map((h) => ({ x: h.x, y: h.y })) } : p
          )
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(n, r, `suggest-path ${c}`), this.selectedFlowId = c;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (t) => {
      if (!(!this.config || t.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(t);
          if (!i) return;
          const o = this.config, { config: n, node: s } = Cs(o, i, l("editor.inspector.newNodeDefaultLabel"));
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
          }, n = this.config, { config: s, overlay: r } = Ts(n, o);
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
        const r = this.config, c = vi(r, i, n, s);
        this.pushPatch(r, c, `add waypoint to ${i}`);
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
          const o = window.prompt(l("editor.inspector.flowEntityPrompt"), l("editor.inspector.flowEntityDefault")) ?? l("editor.inspector.flowEntityDefault"), n = this.config, { config: s, flow: r } = xi(n, this.pending.fromId, i, o);
          this.pushPatch(n, s, `add flow ${H(r)}`), this.pending = null;
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
      i && window.confirm(l("editor.inspector.deleteOverlayConfirm", i)) && this.removeOverlay(i);
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
      i && window.confirm(l("editor.inspector.deleteNodeContextConfirm", i)) && this.removeNode(i);
    }, this.onWaypointContextMenu = (t) => {
      if (t.preventDefault(), t.stopPropagation(), !this.config) return;
      const e = t.currentTarget, i = e.dataset.flowId, o = Number(e.dataset.waypointIndex);
      if (!i || !Number.isFinite(o)) return;
      const n = this.config, s = wi(n, i, o);
      this.pushPatch(n, s, `delete waypoint ${o} of ${i}`);
    }, this.stopClick = (t) => {
      t.stopPropagation();
    }, this.onHandlePointerDown = (t) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const e = t.currentTarget, i = e.dataset.waypointIndex, o = e.dataset.flowId, n = e.dataset.nodeId, s = e.dataset.overlayId;
      let r = null;
      if (n)
        if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(n)) {
          const c = /* @__PURE__ */ new Map();
          for (const a of this.config.nodes)
            this.selectedNodeIds.has(a.id) && c.set(a.id, { ...a.position });
          r = {
            kind: "node-bulk",
            ids: Array.from(this.selectedNodeIds),
            startPositions: c,
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
        const n = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (t.clientX - e.startPx.x) / this.scale, c = (t.clientY - e.startPx.y) / this.scale, a = r / n * 100, d = c / s * 100;
        let p = e.startSize.width + a, h = e.startSize.height + d;
        this.dragShiftHeld && (p = Math.round(p), h = Math.round(h)), this.dragMoved = !0, this.config = Ai(this.config, e.id, { width: p, height: h });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const n = t.clientX - this.dragStartPx.x, s = t.clientY - this.dragStartPx.y;
        (Math.abs(n) > 4 || Math.abs(s) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const i = this.pointerToPercent(t);
      if (!i) return;
      const o = this.dragShiftHeld ? { x: O(We(i.x)), y: O(We(i.y)) } : i;
      if (e.kind === "node")
        this.config = pt(this.config, e.id, o);
      else if (e.kind === "node-bulk") {
        const n = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (t.clientX - e.startPx.x) / this.scale, c = (t.clientY - e.startPx.y) / this.scale, a = r / n * 100, d = c / s * 100, p = /* @__PURE__ */ new Map();
        for (const [h, u] of e.startPositions) {
          const f = this.dragShiftHeld ? We(u.x + a) : u.x + a, g = this.dragShiftHeld ? We(u.y + d) : u.y + d;
          p.set(h, { x: f, y: g });
        }
        this.config = ks(this.config, p);
      } else e.kind === "overlay" ? this.config = Hs(this.config, e.id, o) : e.kind === "waypoint" && (this.config = ut(this.config, e.flowId, e.index, o));
    }, this.onHandlePointerUp = (t) => {
      if (this.dragPointerId !== t.pointerId) return;
      const e = t.currentTarget;
      e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
      const i = this.dragStartConfig, o = this.config, n = this.dragTarget, s = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !n) return;
      if (!s && n.kind === "node") {
        const c = n.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (t.shiftKey) {
          const a = new Set(this.selectedNodeIds);
          a.has(c) ? a.delete(c) : a.add(c), this.selectedNodeIds = a, this.selectedNodeId = a.size === 1 ? Array.from(a)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([c]), this.selectedNodeId = c, this.selectedFlowId = null, this.selectedOverlayId = null;
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
      e !== this._lastLanguage && (this._lastLanguage = e, qi(e));
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
    if (!t) {
      const i = Mr(this.config?.aspect_ratio ?? "16:10");
      this.imageNaturalW = i.w * 120, this.imageNaturalH = i.h * 120, this._loadedImageUrl = "", this.recalcFit();
      return;
    }
    if (t === this._loadedImageUrl) return;
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
    const o = e / this.imageNaturalW, n = this.imageNaturalH * o, s = 0, r = -(n - i) / 2, c = this.fitScale;
    this.fitScale = o, this.fitPanX = s, this.fitPanY = r, this.imageLayoutReady ? (this.scale === 1 || this.scale === c) && (this.scale = o, this.panX = s, this.panY = r) : (this.scale = o, this.panX = s, this.panY = r, this.imageLayoutReady = !0);
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
      se(Qi(t)), this.config = $e(t), se(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
      const e = this.config?.background?.default ?? "";
      this.loadBackgroundImage(e), this.updateComplete.then(() => this.recalcFit());
    } catch (e) {
      se(!1), this.errorMessage = e instanceof Error ? e.message : String(e);
    }
  }
  render() {
    if (!this.config)
      return y`
        <div class="wrap">
          <p class="hint">${l("editor.hintNoConfig")}</p>
          ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : A}
        </div>
      `;
    const t = this.config.background.default, e = this.selectedNodeIds.size >= 2, i = this.selectedNodeId ? "nodes" : this.selectedFlowId ? "flows" : this.selectedOverlayId ? "overlays" : this.selectorType, o = this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? "", n = this.imageLayoutReady && this.imageNaturalW > 0 && this.imageNaturalH > 0;
    return y`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class="z-canvas"
          role="application"
          aria-label=${l("editor.canvas.ariaLabel")}
          ${Y(this.canvasRef)}
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
            ${Y(this.stageRef)}
          >
            <!-- canvas-content: unified scene layer for background + all content.
                 Sized to image natural dimensions so percentages map to image pixels.
                 Transform pans/zooms the whole scene as one unit. -->
            <div
              class=${`canvas-content${n ? "" : " canvas-content--pending"}`}
              style=${n ? `width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;` : "left:0;top:0;width:100%;height:100%;"}
            >
              ${t ? y`<div
                    class=${`background${n ? "" : " background--pending"}`}
                    style="background-image: url('${t}');"
                  ></div>` : A}
              ${n ? y`
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
                      ${Y(this.editorFxSvgRef)}
                    ></svg>
                    ${this.config.flows.filter((s) => s.id === this.selectedFlowId).map((s) => this.renderWaypointHandles(s))}
                    ${(this.config.overlays ?? []).map((s) => this.renderOverlayHandle(s))}
                    ${this.config.nodes.map((s) => this.renderHandle(s))}
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
                aria-label=${l("editor.toolbar.undo")}
                ?disabled=${!this.canUndo}
                title=${this.undoLabel ? l("editor.canvas.undoTitleWithDesc", this.undoLabel) : l("editor.canvas.undoTitlePlain")}
                @click=${() => this.undoStack.undo()}
              >↩</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${l("editor.toolbar.redo")}
                ?disabled=${!this.canRedo}
                title=${this.redoLabel ? l("editor.canvas.redoTitleWithDesc", this.redoLabel) : l("editor.canvas.redoTitlePlain")}
                @click=${() => this.undoStack.redo()}
              >↪</button>
            </div>
            <div class="tb-icon-row">
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${l("editor.toolbar.zoomOut")}
                ?disabled=${this.scale <= this.fitScale}
                title=${l("editor.toolbar.zoomOut")}
                @click=${() => this.adjustZoom(0.8)}
              >−</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${l("editor.toolbar.zoomIn")}
                ?disabled=${this.scale >= 5}
                title=${l("editor.toolbar.zoomIn")}
                @click=${() => this.adjustZoom(1.25)}
              >+</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${l("editor.toolbar.fitCanvas")}
                title=${l("editor.toolbar.fitCanvas")}
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
                    aria-label=${l("editor.canvas.addNodeAria")}
                    title=${l("editor.canvas.addNodeAria")}
                    @click=${() => {
      this.pending = { kind: "add-node" };
    }}
                  >${l("editor.toolbar.addNode")}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${l("editor.canvas.addFlowAria")}
                    title=${l("editor.canvas.addFlowAria")}
                    @click=${() => {
      this.pending = { kind: "add-flow", step: "pick-from" };
    }}
                  >${l("editor.toolbar.addFlow")}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${l("editor.canvas.addOverlayAria")}
                    title=${l("editor.canvas.addOverlayAria")}
                    @click=${() => {
      this.pending = { kind: "add-overlay", overlayType: "custom" };
    }}
                  >${l("editor.toolbar.addOverlay")}</button>
                `}
            </div>
            <div class="tb-row tb-row-save">
              <button
                type="button"
                class="tb-btn tb-btn-save"
                aria-label=${l("editor.canvas.saveAria")}
                title=${l("editor.canvas.saveTitle")}
                @click=${() => {
      this.config && this.commitToHa(this.config);
    }}
              >💾 ${l("editor.toolbar.save")}</button>
              <button
                type="button"
                class="tb-btn tb-btn-cancel"
                aria-label=${l("editor.canvas.cancelAria")}
                title=${l("editor.canvas.cancelTitle")}
                ?disabled=${!this.savedConfig}
                @click=${() => {
      if (!this.savedConfig || !this.config) return;
      const s = this.config;
      this.pushPatch(s, this.savedConfig, "cancel all changes");
    }}
              >✕ ${l("editor.toolbar.cancel")}</button>
            </div>
          </div>

          <!-- Right (35%): Type + Element dropdowns stacked -->
          <div class="tb-col-selector">
            <select
              class="tb-select"
              aria-label=${l("editor.canvas.selectTypeAria")}
              .value=${i}
              @change=${(s) => {
      this.selectorType = s.target.value, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null;
    }}
            >
              <option value="">${l("editor.toolbar.selectType")}</option>
              <option value="nodes">${l("editor.toolbar.nodes")}</option>
              <option value="flows">${l("editor.toolbar.flows")}</option>
              <option value="overlays">${l("editor.toolbar.overlays")}</option>
            </select>
            <select
              class="tb-select"
              aria-label=${l("editor.canvas.selectElementAria")}
              ?disabled=${!i}
              .value=${o}
              @change=${(s) => {
      const r = s.target.value;
      r && (i === "nodes" ? (this.selectedNodeId = r, this.selectedNodeIds = /* @__PURE__ */ new Set([r]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = r, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = r, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null), this._pendingInspectorLabelFocus = !0);
    }}
            >
              <option value="">${l(i ? "editor.toolbar.selectElement" : "editor.toolbar.selectElementDash")}</option>
              ${i === "nodes" ? this.config.nodes.map((s) => y`
                <option value=${s.id}>${s.label ?? s.id}</option>
              `) : A}
              ${i === "flows" ? this.config.flows.map((s) => y`
                <option value=${s.id}>${H(s)}</option>
              `) : A}
              ${i === "overlays" ? (this.config.overlays ?? []).map((s, r) => y`
                <option value=${s.id ?? String(r)}>${l("editor.canvas.overlayOption", r, s.id ? l("editor.canvas.overlayOptionIdPart", s.id) : "")}</option>
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
    if (!this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return A;
    const e = new Map(this.config.nodes.map((p) => [p.id, p])), i = e.get(t.from_node), o = e.get(t.to_node);
    if (!i || !o) return A;
    const n = [i.position, ...t.waypoints, o.position], s = t.id === this.selectedFlowId, r = { width: this.imageNaturalW, height: this.imageNaturalH }, c = we(n, r, t.line_style ?? "corner");
    if (!c) return A;
    const a = t.color ?? "rgba(255,255,255,0.8)", d = [];
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
          d=${c}
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
        return y`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${l("aria.waypointHandle", i, H(t))}
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
    const e = t.id === this.selectedOverlayId, i = t.size?.width ?? 14, o = t.size?.height ?? 8, n = this.pct2px(t.position), s = i / 100 * this.imageNaturalW, r = o / 100 * this.imageNaturalH, c = this.inlineRename?.kind === "overlay" && this.inlineRename.id === t.id;
    return y`
      <div
        class=${`overlay-handle overlay-wrapper ${e ? "selected" : ""} overlay-${t.type}`}
        role="button"
        tabindex="0"
        aria-label=${l("aria.overlayHandle", t.id)}
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
          ${c ? y`<input
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
            ></div>` : A}
      </div>
    `;
  }
  renderHandle(t) {
    const e = this.selectedNodeIds.has(t.id), i = e && this.selectedNodeIds.size === 1, o = e && this.selectedNodeIds.size > 1, n = e ? Array.from(this.selectedNodeIds).indexOf(t.id) : -1, s = t.visible === !1, r = this.inlineRename?.kind === "node" && this.inlineRename.id === t.id, c = this.pct2px(t.position);
    return y`
      <div
        class=${`handle ${i ? "selected" : ""} ${o ? "multi-selected" : ""} ${e ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
        role="button"
        tabindex="0"
        aria-label=${l("aria.nodeHandle", t.label ?? t.id, t.position.x, t.position.y)}
        aria-selected=${e ? "true" : "false"}
        data-node-id=${t.id}
        style=${`left: ${c.x}px; top: ${c.y}px;`}
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
        ${e && this.selectedNodeIds.size >= 2 ? y`<span class="suggest-badge">${n + 1}</span>` : A}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${l(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${l(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(a) => {
      if (a.stopPropagation(), !this.config) return;
      const d = this.config, p = ki(d, t.id, s);
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
    const o = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), n = i?.includeDomains ?? [], s = i?.placeholder ?? l("editor.inspector.entityPickerFallbackPlaceholder");
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
    const r = this.hass?.states ?? {}, c = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, a = Object.keys(r).filter((p) => {
      if (n.length === 0) return !0;
      const h = p.split(".")[0];
      return !!h && n.includes(h);
    }).sort();
    return y`
      <input
        type="text"
        list=${c}
        placeholder=${s}
        .value=${t}
        @change=${(p) => {
      e(p.target.value.trim());
    }}
      />
      <datalist id=${c}>
        ${a.map((p) => y`<option value=${p}></option>`)}
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
          <h3>${l("editor.inspector.nodeHeading", t.id)}</h3>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${l("editor.inspector.label")}</span>
              <input
                type="text"
                ${Y(this.nodeLabelInputRef)}
                .value=${t.label ?? ""}
                @change=${(i) => this.onNodeLabelChange(t.id, i)}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${l("editor.inspector.entity")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.colour")}</span>
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
        const o = i.target.checked, n = this.config, s = ki(n, t.id, o);
        this.pushPatch(n, s, `set visible of ${t.id}`);
      }}
              />
              <span class="node-cell-label">${l("editor.inspector.visible")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.showValue")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.showLabel")}</span>
            </label>
          </div>

          <!-- Row 3: X% | Y% | Size | Opacity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${l("editor.inspector.positionX")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.positionY")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.sizePx")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.opacity")}</span>
              <input
                type="number"
                min="0" max="1" step="0.05"
                .value=${String(t.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const o = parseFloat(i.target.value);
        if (!Number.isFinite(o)) return;
        const n = this.config, s = Ks(n, t.id, o >= 1 ? void 0 : o);
        this.pushPatch(n, s, `set opacity of ${t.id}`);
      }}
              />
            </label>
          </div>

          ${this.renderNodeEffectInspector(t, e)}

          <!-- Delete -->
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(t.id)}>${l("editor.inspector.deleteNode")}</button>
          </div>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const t = this.config.flows.find((o) => o.id === this.selectedFlowId);
      if (!t) return A;
      const e = this.config.flows.findIndex((o) => o.id === t.id), i = H(t);
      return y`
        <div class="inspector">
          <label class="inspector-id-row">
            <span class="node-cell-label">${l("editor.inspector.flowIdField")}</span>
            <input
              type="text"
              spellcheck="false"
              ${Y(this.flowIdInputRef)}
              .value=${t.id}
              @change=${(o) => this.onInspectorFlowIdChange(t.id, o)}
            />
          </label>
          <h3>${l("editor.inspector.flowHeading", H(t))}</h3>
          <fieldset class="inspector-fieldset">
            <legend class="inspector-legend">${l("editor.inspector.routeAndSensor")}</legend>
            <div class="field-row">
              <label for="flow-label-${t.id}">${l("editor.inspector.flowLabel")}</label>
              <input
                id="flow-label-${t.id}"
                type="text"
                maxlength="64"
                placeholder=${t.id}
                title=${l("editor.inspector.flowLabelPlaceholder")}
                .value=${t.label ?? ""}
                @change=${(o) => this.onFlowLabelChange(t.id, o.target.value)}
              />
            </div>
            <div class="field-row flow-endpoint-row">
              <label for=${`flow-from-${t.id}`}>${l("editor.inspector.fromNode")}</label>
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
              <label for=${`flow-to-${t.id}`}>${l("editor.inspector.toNode")}</label>
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
                  ${l("editor.toolbar.suggestPathFinding")}
                  <span class="suggest-path-spinner" aria-hidden="true"></span>
                </p>` : A}
            ${this.flowEndpointError && this.selectedFlowId === t.id ? y`<p class="flow-endpoint-error">${this.flowEndpointError}</p>` : A}
            <label>
              ${l("editor.inspector.entity")}
              ${this.renderEntityPicker(
        t.entity,
        (o) => this.setFlowEntity(t.id, o),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
            </label>
            ${(() => {
        const o = U(t.domain ?? this.config.domain), n = Xe(t, o, this.config), s = o.peak, c = [0, n.peak * 0.5, n.peak].map(
          (p) => `${(Mt(p, n) / 1e3).toFixed(1)}s`
        ), a = t.animation?.zero_threshold !== void 0, d = this.flowInspectorAdvancedOpen[t.id] !== void 0 ? this.flowInspectorAdvancedOpen[t.id] : a;
        return y`
                <label>
                  ${l("editor.inspector.peakValue")}
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
            const b = Mi(u, t.id, void 0);
            this.pushPatch(u, b, `clear peak_value ${i}`);
            return;
          }
          const f = parseFloat(h);
          if (!Number.isFinite(f) || f <= 0) return;
          const g = Mi(u, t.id, f);
          this.pushPatch(u, g, `set peak_value ${i}`);
        }}
                  />
                  <span class="hint-sub">${l("editor.inspector.peakValueHelper")}</span>
                </label>
                <label>
                  ${l("editor.inspector.minDuration")}
                  <input
                    type="number"
                    min="1"
                    max="60000"
                    step="100"
                    placeholder=${l("editor.inspector.animMinMsPlaceholder")}
                    .value=${t.animation?.min_duration !== void 0 ? String(t.animation.min_duration) : ""}
                    @change=${(p) => {
          if (!this.config) return;
          const h = p.target.value.trim(), u = this.config;
          if (h === "") {
            const b = q(u, t.id, { min_duration: void 0 });
            this.pushPatch(u, b, `clear flow min_duration ${i}`);
            return;
          }
          const f = parseInt(h, 10);
          if (!Number.isFinite(f) || f <= 0) return;
          const g = q(u, t.id, { min_duration: f });
          this.pushPatch(u, g, `set flow min_duration ${i}`);
        }}
                  />
                </label>
                <label>
                  ${l("editor.inspector.maxDuration")}
                  <input
                    type="number"
                    min="2"
                    max="60000"
                    step="500"
                    placeholder=${l("editor.inspector.animMaxMsPlaceholder")}
                    .value=${t.animation?.max_duration !== void 0 ? String(t.animation.max_duration) : ""}
                    @change=${(p) => {
          if (!this.config) return;
          const h = p.target.value.trim(), u = this.config;
          if (h === "") {
            const b = q(u, t.id, { max_duration: void 0 });
            this.pushPatch(u, b, `clear flow max_duration ${i}`);
            return;
          }
          const f = parseInt(h, 10);
          if (!Number.isFinite(f) || f <= 0) return;
          const g = q(u, t.id, { max_duration: f });
          this.pushPatch(u, g, `set flow max_duration ${i}`);
        }}
                  />
                </label>
                <div class="speed-curve-preview inspector-timing-preview">
                  <span>${l("editor.inspector.previewLinearSpeed")}</span>
                  <strong>${c[0]}</strong>
                  /
                  <strong>${c[1]}</strong>
                  /
                  <strong>${c[2]}</strong>
                </div>
                <details
                  class="advanced-options"
                  .open=${d}
                  @toggle=${(p) => {
          const u = p.currentTarget.open;
          if (this.flowInspectorAdvancedOpen = { ...this.flowInspectorAdvancedOpen, [t.id]: u }, !u) {
            const { [t.id]: f, ...g } = this.flowZeroThresholdDraft;
            if (this.flowZeroThresholdDraft = g, this.config && t.animation?.zero_threshold !== void 0) {
              const b = this.config, v = q(b, t.id, { zero_threshold: void 0 });
              this.pushPatch(b, v, `advanced closed: clear zero_threshold ${i}`);
            }
          }
        }}
                >
                  <summary>${l("editor.inspector.advancedOptions")}</summary>
                  <div class="advanced-options-content">
                    ${(() => {
          const p = this.flowZeroThresholdDraft[t.id];
          let h;
          if (p !== void 0 && p.trim() !== "") {
            const g = parseFloat(p);
            h = Number.isFinite(g) && g > 0 && g <= 100 ? g / 100 : t.animation?.zero_threshold ?? Ee;
          } else
            h = t.animation?.zero_threshold ?? Ee;
          const u = t.peak_value ?? o.peak, f = `${l("editor.inspector.zeroThresholdCutoff")} ${(h * u).toFixed(1)}${o.unit_label ? ` ${o.unit_label}` : ""}`;
          return y`
                        <div class="field-row advanced-zero-row">
                          <label>
                            ${l("editor.inspector.zeroThreshold")}
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              placeholder=${l("editor.inspector.zeroThresholdAuto")}
                              .value=${this.flowZeroThresholdDraft[t.id] !== void 0 ? this.flowZeroThresholdDraft[t.id] : t.animation?.zero_threshold !== void 0 ? (t.animation.zero_threshold * 100).toFixed(1) : ""}
                              @input=${(g) => {
            const b = g.target.value;
            this.flowZeroThresholdDraft = { ...this.flowZeroThresholdDraft, [t.id]: b };
          }}
                              @change=${(g) => {
            if (!this.config) return;
            const b = g.target.value.trim(), v = this.config, m = () => {
              const { [t.id]: C, ...F } = this.flowZeroThresholdDraft;
              this.flowZeroThresholdDraft = F;
            };
            if (b === "") {
              m();
              const C = q(v, t.id, { zero_threshold: void 0 });
              this.pushPatch(v, C, `clear flow zero_threshold ${i}`);
              return;
            }
            const $ = parseFloat(b);
            if (!Number.isFinite($) || $ <= 0 || $ > 100) return;
            m();
            const _ = q(v, t.id, { zero_threshold: $ / 100 });
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
            ${l("editor.inspector.lineStyle")}
            <select
              .value=${t.line_style ?? "corner"}
              @change=${(o) => {
        if (!this.config) return;
        const n = o.target.value, s = this.config, r = Ys(s, t.id, n);
        this.pushPatch(s, r, `set line style of ${i}`);
      }}
            >
              ${gt.map(
        (o) => y`<option value=${o} ?selected=${(t.line_style ?? "corner") === o}>${o}</option>`
      )}
            </select>
          </label>
          <label>
            ${l("editor.inspector.colourOverride")}
            <div class="color-row">
              ${(() => {
        const o = U(t.domain ?? this.config.domain), n = fe(
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
          const r = s.target.value, c = this.config, a = Si(c, t.id, r);
          this.pushPatch(c, a, `set colour of ${i}`);
        }}
                  />
                  <span class="color-effective">${t.color ? l("editor.inspector.colourOverrideActive") : l("editor.inspector.colourDomainDefault")}</span>
                  ${t.color ? y`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const s = this.config, r = Si(s, t.id, void 0);
          this.pushPatch(s, r, `clear colour of ${i}`);
        }}>${l("editor.inspector.clearColour")}</button>` : A}
                `;
      })()}
            </div>
          </label>
          <label>
            ${l("editor.inspector.flowOpacity")}
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
        const s = this.config, r = js(s, t.id, n);
        this.pushPatch(s, r, `set opacity of ${i}`);
      }}
              />
              <span>${(t.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            ${l("editor.inspector.flowVisible")}
            <div class="row">
              <input
                type="checkbox"
                .checked=${t.visible !== !1}
                @change=${(o) => {
        if (!this.config) return;
        const n = o.target.checked, s = this.config, r = Zs(s, t.id, n);
        this.pushPatch(s, r, `${n ? "show" : "hide"} flow ${i}`);
      }}
              />
              <span>${t.visible !== !1 ? l("editor.inspector.shown") : l("editor.inspector.hidden")}</span>
            </div>
          </label>
          ${this.renderAnimationSection(t)}
          ${this.renderValueGradientSection(t)}
          <button class="danger" @click=${() => this.removeFlow(t.id)}>${l("editor.inspector.deleteFlow")}</button>
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
        <summary>${l("editor.nodeEffect.section")}</summary>
        <div class="node-effect-body">
          ${!t.entity && i ? y`<p class="hint-sub">${l("editor.nodeEffect.needsEntity")}</p>` : A}
          <div class="node-effect-type-row">
            ${this.renderNodeEffectPreviewAnim(t)}
            <label class="node-effect-type-label">
              ${l("editor.nodeEffect.type")}
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
                <option value="" ?selected=${!i}>${l("editor.nodeEffect.none")}</option>
                <option value="glow" ?selected=${o === "glow"}>${l("editor.nodeEffect.glow")}</option>
                <option value="badge" ?selected=${o === "badge"}>${l("editor.nodeEffect.badge")}</option>
                <option value="ripple" ?selected=${o === "ripple"}>${l("editor.nodeEffect.ripple")}</option>
                <option value="alert" ?selected=${o === "alert"}>${l("editor.nodeEffect.alert")}</option>
              </select>
            </label>
          </div>

          ${i?.type === "glow" ? y`
                <label>${l("editor.nodeEffect.glowColor")}
                  <input type="text" placeholder=${l("editor.inspector.colourDomainDefault")}
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
                <label>${l("editor.nodeEffect.glowMaxRadius")}
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
                <label>${l("editor.nodeEffect.glowMinIntensity")}
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
                <label>${l("editor.nodeEffect.peakValue")}
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
                <label>${l("editor.nodeEffect.badgeColorOn")}
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
                <label>${l("editor.nodeEffect.badgeColorOff")}
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
                <label>${l("editor.nodeEffect.threshold")}
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
                <label>${l("editor.nodeEffect.rippleColor")}
                  <input type="text" placeholder=${l("editor.inspector.colourDomainDefault")}
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
                <label>${l("editor.nodeEffect.rippleDuration")}
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
                <label>${l("editor.nodeEffect.rippleThreshold")}
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
                <label>${l("editor.nodeEffect.alertThreshold")}
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
                <label>${l("editor.nodeEffect.alertCondition")}
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
                    <option value="above">${l("editor.nodeEffect.above")}</option>
                    <option value="below">${l("editor.nodeEffect.below")}</option>
                  </select>
                </label>
                <label>${l("editor.nodeEffect.alertColor")}
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
                <label>${l("editor.nodeEffect.alertFrequency")}
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
                <label>${l("editor.nodeEffect.alertHysteresis")}
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
      const p = this.config, h = q(p, t.id, d);
      this.pushPatch(p, h, `update animation for ${H(t)}`);
    }, s = !(/* @__PURE__ */ new Set(["dash", "fluid", "none"])).has(i), r = i === "trail", c = i === "dash", a = t.color ?? "#4ADE80";
    return y`
      <details class="anim-details" open>
        <summary>${l("editor.inspector.animation")}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(i, e, a)}
            </svg>
          </div>

          <label>${l("editor.inspector.style")}
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

          ${i === "fluid" ? y`<p class="hint-sub">${l("editor.inspector.fluidIgnoresParticleShape")}</p>` : A}

          ${s ? y`
            <label>${l("editor.inspector.particleShape")}
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
              <label>${l("editor.inspector.svgPathLabel")}
                <input type="text"
                  placeholder=${l("editor.inspector.svgPathPlaceholder")}
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
            ` : A}
          ` : A}

          <label>${l("editor.inspector.direction")}
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

          <label>${l("editor.inspector.particleSize")}
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

          <label>${l("editor.inspector.particleCount")}
            <input type="number" min="1" max="20" step="1"
              placeholder=${l("editor.inspector.profileDefaultPlaceholder")}
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

          <label>${l("editor.inspector.particleSpacing")}
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
            <label>${l("editor.inspector.clusterSize")}
              <input type="number" min="1" max="10" step="1"
                .value=${String(e.cluster_size ?? 3)}
                @change=${(d) => {
      const p = parseInt(d.target.value, 10);
      Number.isFinite(p) && p >= 1 && o({ cluster_size: p });
    }}
              />
            </label>
            <label>${l("editor.inspector.clusterGap")}
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
            <label>${l("editor.inspector.pulseFrequencyHz")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.pulse_frequency ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && o({ pulse_frequency: p });
    }}
              />
            </label>
            <label>${l("editor.inspector.pulseRatio")}
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
            <label>${l("editor.inspector.waveFrequency")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(e.wave_frequency ?? 1)}
                @change=${(d) => {
      const p = parseFloat(d.target.value);
      Number.isFinite(p) && p > 0 && o({ wave_frequency: p });
    }}
              />
            </label>
            <label>${e.particle_spacing === "wave_lateral" ? l("editor.inspector.waveAmplitudePx") : l("editor.inspector.waveAmplitude01")}
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

          <label>${l("editor.inspector.glowIntensity")}
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
            ${l("editor.inspector.shimmerThreshold")}
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${e.flicker === !0}
              @change=${(d) => o({ flicker: d.target.checked })}
            />
            ${l("editor.inspector.flicker")}
          </label>

          ${r ? y`
            <label>${l("editor.inspector.trailLength")}
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

          ${c ? y`
            <label>${l("editor.inspector.dashGapRatio")}
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
      const d = this.config, p = Js(d, t.id);
      this.pushPatch(d, p, `reset animation for ${H(t)}`);
    }}>${l("editor.inspector.resetToDefaults")}</button>` : A}
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
      const r = e.dash_gap ?? 0.5, c = 14, a = c * r;
      return y`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="3"
          stroke-dasharray="${c} ${a}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${c + a}"
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
      const r = Array.from({ length: n }, (c, a) => (a + 0.5) / n * 180 + 10);
      return y`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (c, a) => y`
            <circle cx=${c} cy="20" r=${o} fill=${i} opacity="0">
              <animate attributeName="cx" values="${c};190;10;${c}" dur="1.4s"
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
    const s = Array.from({ length: n }, (r, c) => (c + 0.5) / n * 180 + 10);
    return y`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${s.map(
      (r, c) => y`
          <circle cx=${r} cy="20" r=${o} fill=${i} opacity="0">
            <animate attributeName="cx" values="${r};190;10;${r}" dur="1.4s"
              repeatCount="indefinite" begin="${(c / n * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(c / n * -1.4).toFixed(2)}s"/>
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
      let r = 0, c = 0;
      for (let g = 0; g < s.length - 1; g++) {
        const b = s[g], v = s[g + 1], m = Math.hypot(v.x - b.x, v.y - b.y);
        m > c && (c = m, r = g);
      }
      const a = s[r], d = s[r + 1], p = { x: (a.x + d.x) / 2, y: (a.y + d.y) / 2 }, h = r > 0 ? r - 1 + 1 : 0, u = this.config, f = vi(u, t.id, h, p);
      this.pushPatch(u, f, `add waypoint to ${H(t)}`);
    };
    return y`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${l("editor.inspector.waypoints")}
          <span class="waypoint-count">${t.waypoints.length}</span>
        </h4>

        ${t.waypoints.length === 0 ? y`<div class="waypoint-empty">${l("editor.inspector.waypointEmpty")}</div>` : y`
            <ul class="waypoint-list">
              ${t.waypoints.map((s, r) => y`
                <li class="waypoint-row">
                  <span class="waypoint-index">${l("editor.inspector.waypointSectionHash")}${r + 1}</span>
                  <label class="waypoint-coord">
                    ${l("editor.inspector.waypointCoordX")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.x.toFixed(1)}
                      @change=${(c) => {
      if (!this.config) return;
      const a = parseFloat(c.target.value);
      if (!Number.isFinite(a)) return;
      const d = this.config, p = ut(d, t.id, r, { x: a, y: s.y });
      this.pushPatch(d, p, `move waypoint ${r} of ${H(t)}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    ${l("editor.inspector.waypointCoordY")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.y.toFixed(1)}
                      @change=${(c) => {
      if (!this.config) return;
      const a = parseFloat(c.target.value);
      if (!Number.isFinite(a)) return;
      const d = this.config, p = ut(d, t.id, r, { x: s.x, y: a });
      this.pushPatch(d, p, `move waypoint ${r} of ${H(t)}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${l("editor.inspector.deleteWaypointAria", r)} title=${l("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const c = this.config, a = wi(c, t.id, r);
      this.pushPatch(c, a, `delete waypoint ${r} of ${H(t)}`);
    }}
                  >×</button>
                </li>
              `)}
            </ul>
          `}

        <button type="button" class="ghost full-width" aria-label=${l("editor.inspector.addWaypointOnFlowAria")} @click=${n}>
          ${l("editor.inspector.addWaypoint")}
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
      const r = this.config, c = ir(r, t.id, s);
      this.pushPatch(r, c, `update gradient for ${H(t)}`);
    };
    let n = A;
    if (e && e.low_color && e.high_color)
      try {
        const s = so(
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
        <h4 class="gradient-section-header">${l("editor.inspector.valueGradient")}</h4>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!e}
            @change=${(s) => {
      if (!this.config) return;
      const r = s.target.checked, c = this.config, a = r ? tr(c, t.id, i) : Bi(c, t.id);
      this.pushPatch(c, a, `${r ? "enable" : "disable"} gradient for ${H(t)}`);
    }}
          />
          ${l("editor.inspector.enableGradient")}
        </label>

        ${e ? y`
          <label>${l("editor.inspector.gradientEntity")}
            <input type="text" placeholder=${l("editor.inspector.gradientEntityPlaceholder")}
              .value=${e.entity}
              @change=${(s) => o({ entity: s.target.value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>${l("editor.inspector.lowValue")}
              <input type="number" step="any"
                .value=${String(e.low_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && o({ low_value: r });
    }}
              />
            </label>
            <label>${l("editor.inspector.lowColour")}
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
            <label>${l("editor.inspector.highValue")}
              <input type="number" step="any"
                .value=${String(e.high_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && o({ high_value: r });
    }}
              />
            </label>
            <label>${l("editor.inspector.highColour")}
              <div class="color-row">
                <input type="color"
                  .value=${e.high_color}
                  @input=${(s) => o({ high_color: s.target.value })}
                />
                <span>${e.high_color}</span>
              </div>
            </label>
          </div>

          <label>${l("editor.inspector.applyGradientTo")}
            <select
              .value=${e.mode ?? "both"}
              @change=${(s) => {
      o({ mode: s.target.value });
    }}
            >
              <option value="flow" ?selected=${e.mode === "flow"}>${l("editor.inspector.gradientModeFlow")}</option>
              <option value="line" ?selected=${e.mode === "line"}>${l("editor.inspector.gradientModeLine")}</option>
              <option value="both" ?selected=${(e.mode ?? "both") === "both"}>${l("editor.inspector.gradientModeBoth")}</option>
            </select>
          </label>

          ${n}

          <button class="ghost" @click=${() => {
      if (!this.config) return;
      const s = this.config, r = Bi(s, t.id);
      this.pushPatch(s, r, `disable gradient for ${H(t)}`);
    }}>${l("editor.inspector.removeGradient")}</button>
        ` : A}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return A;
    const t = this.config.animation ?? {};
    return y`
      <details class="panel anim-global-panel" open>
        <summary>${l("editor.inspector.animationGlobalSummary")}</summary>
        <div class="panel-body">
          <label>
            ${l("editor.inspector.fpsCap")}
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(t.fps ?? 60)}
                @change=${(e) => {
      if (!this.config) return;
      const i = parseInt(e.target.value, 10), o = this.config, n = Pi(o, { fps: i });
      this.pushPatch(o, n, "set animation fps");
    }}
              />
              <span>${t.fps ?? 60} ${l("editor.inspector.fpsSuffix")}</span>
            </div>
          </label>
          <label class="visibility-row">
            <input type="checkbox"
              .checked=${t.smooth_speed !== !1}
              @change=${(e) => {
      if (!this.config) return;
      const i = e.target.checked, o = this.config, n = Pi(o, { smooth_speed: i });
      this.pushPatch(o, n, "set smooth_speed");
    }}
            />
            <span class="visibility-label">${l("editor.stateA.smoothSpeed")}</span>
            <span class="visibility-val">${t.smooth_speed !== !1 ? l("editor.inspector.on") : l("editor.inspector.off")}</span>
          </label>
          <p class="hint-sub">${l("editor.inspector.smoothSpeedHint")}</p>
          <label class="visibility-row">
            <input
              type="checkbox"
              .checked=${this.config.pause_when_hidden !== !1}
              @change=${(e) => {
      if (!this.config) return;
      const i = e.target.checked, o = this.config, n = er(o, i);
      this.pushPatch(o, n, "set pause_when_hidden");
    }}
            />
            <span class="visibility-label">${l("editor.stateA.pauseWhenHidden")}</span>
            <span class="visibility-val">${this.config.pause_when_hidden !== !1 ? l("editor.inspector.on") : l("editor.inspector.off")}</span>
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
          <span class="node-cell-label">${l("editor.inspector.overlayIdField")}</span>
          <input
            type="text"
            spellcheck="false"
            ${Y(this.overlayIdInputRef)}
            .value=${t.id}
            @change=${(n) => this.onInspectorOverlayIdChange(t.id, n)}
          />
        </label>
        <h3>${l("editor.inspector.overlayHeading", t.id)}</h3>
        <div class="row size-row">
          <label>
            ${l("editor.inspector.width")}
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
            ${l("editor.inspector.height")}
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
          ${l("editor.inspector.visible")}
          <input
            type="checkbox"
            .checked=${i}
            @change=${(n) => {
      if (!this.config) return;
      const s = n.target.checked, r = this.config, c = Gs(r, t.id, s);
      this.pushPatch(r, c, `toggle overlay ${t.id} visible`);
    }}
          />
        </label>
        <label>
          ${l("editor.inspector.opacity")}
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
      const r = this.config, c = Us(r, t.id, s);
      this.pushPatch(r, c, `edit overlay ${t.id} opacity`);
    }}
          />
          <span>${Math.round(o * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(t)}
        <button class="danger" @click=${() => this.removeOverlay(t.id)}>${l("editor.inspector.deleteOverlay")}</button>
      </div>
    `;
  }
  renderCardConfigEditor(t) {
    const e = this.customConfigDraft || JSON.stringify(t.card ?? { type: "entity", entity: "sensor.example_sensor" }, null, 2);
    return y`
      <label>
        ${l("editor.inspector.cardConfig")}
        <textarea
          rows="8"
          spellcheck="false"
          placeholder=${l("editor.inspector.cardConfigPlaceholder")}
          .value=${e}
          @input=${(i) => {
      this.customConfigDraft = i.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? y`<div class="custom-config-error">${this.customConfigError}</div>` : A}
      <p class="hint-sub">
        ${l("editor.inspector.cardConfigHintExamples")}
      </p>
      <p class="hint-sub">
        ${l("editor.inspector.cardConfigHintUrls")}
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(t.id)}>${l("editor.inspector.applyCardConfig")}</button>
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
        const c = parseFloat(r.target.value);
        if (!Number.isFinite(c)) return;
        const a = this.config, d = Ci(a, i, c);
        this.config = d, this.commitToHa(d);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const c = parseFloat(r.target.value);
        if (!Number.isFinite(c)) return;
        const a = this.config, d = Ci(a, i, c);
        this.pushPatch(a, d, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${s.toFixed(2)}</span>
        </label>
      `;
    };
    return y`
      <details class="panel opacity-panel" open>
        <summary>${l("editor.inspector.opacitySummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${l("editor.inspector.opacityHint")}
          </p>
          ${e("background", l("editor.inspector.opacityBackground"))}
          ${e("darken", l("editor.inspector.opacityDarken"), 0)}
          ${e("nodes", l("editor.inspector.opacityNodes"))}
          ${e("flows", l("editor.inspector.opacityFlows"))}
          ${e("dots", l("editor.inspector.opacityDots"))}
          ${e("glow", l("editor.inspector.opacityGlow"))}
          ${e("labels", l("editor.inspector.opacityLabels"))}
          ${e("values", l("editor.inspector.opacityValues"))}
          ${e("overlays", l("editor.inspector.opacityOverlays"))}
        </div>
      </details>
    `;
  }
  renderDomainColorsPanel() {
    if (!this.config) return A;
    const t = this.config.domain_colors ?? {}, e = this.config.domain ?? "energy", i = qe[e] ?? qe.generic, o = (n, s) => {
      const r = `editor.domainRoles.${e}.${n}`, c = l(r);
      return c !== r ? c : s;
    };
    return y`
      <details class="panel domain-colors-panel">
        <summary>${l("editor.inspector.domainColoursSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${l("editor.inspector.domainColoursHint")}
          </p>
          ${i.roles.map((n) => {
      const s = t[n.key], r = n.default, c = o(n.key, n.label);
      return y`
              <div class="color-picker-row">
                <span class="color-picker-label">${c}</span>
                <input
                  type="color"
                  .value=${s ?? r}
                  @change=${(a) => {
        if (!this.config) return;
        const d = a.target.value, p = this.config, h = Ii(p, n.key, d);
        this.pushPatch(p, h, `set domain_colors.${n.key}`);
      }}
                />
                <span class="color-picker-value">${s || l("editor.inspector.colourDefaultSuffix", r)}</span>
                ${s ? y`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const a = this.config, d = Ii(a, n.key, void 0);
        this.pushPatch(a, d, `reset domain_colors.${n.key}`);
      }}>${l("editor.inspector.reset")}</button>` : A}
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
        const r = s.target.checked, c = this.config, a = Xs(c, i, r);
        this.pushPatch(c, a, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${l(n ? "editor.inspector.visibilityVisible" : "editor.inspector.visibilityHidden")}</span>
        </label>
      `;
    };
    return y`
      <details class="panel visibility-panel">
        <summary>${l("editor.inspector.visibilitySummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${l("editor.inspector.visibilityHint")}
          </p>
          ${e("nodes", l("editor.inspector.opacityNodes"))}
          ${e("lines", l("editor.inspector.visibilityFlowLines"))}
          ${e("dots", l("editor.inspector.visibilityAnimatedDots"))}
          ${e("labels", l("editor.inspector.opacityLabels"))}
          ${e("values", l("editor.inspector.opacityValues"))}
          ${e("overlays", l("editor.toolbar.overlays"))}
        </div>
      </details>
    `;
  }
  renderDefaultsPanel() {
    if (!this.config) return A;
    const t = this.config.defaults ?? {}, e = Zi(this.config.domain), i = U(e), o = t.peak_value ?? i.peak, n = Math.round(o * 0.5886 * 10) / 10, s = (r, c, a) => {
      const d = t[r] ?? a.defaultVal;
      return y`
        <label class="defaults-row">
          <span class="defaults-label">${c}</span>
          <input
            type="number"
            min=${a.min}
            max=${a.max}
            step=${a.step}
            .value=${String(d)}
            @change=${(p) => {
        if (!this.config) return;
        const h = parseFloat(p.target.value);
        if (!Number.isFinite(h)) return;
        const u = Math.max(a.min, Math.min(a.max, h)), f = this.config, g = ht(f, r, u);
        this.pushPatch(f, g, `set defaults.${r}`);
      }}
          />
          <span class="defaults-unit">${d}</span>
        </label>
      `;
    };
    return y`
      <details class="panel defaults-panel" open>
        <summary>${l("editor.inspector.defaultsSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${l("editor.inspector.defaultsHint")}
          </p>
          ${s("node_radius", l("editor.stateA.nodeRadius"), { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${s("dot_radius", l("editor.stateA.dotRadius"), { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${s("line_width", l("editor.stateA.lineWidth"), { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${s("burst_trigger_ratio", l("editor.inspector.burstTriggerRatio"), { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${s("burst_sustain_ms", l("editor.inspector.burstSustainMs"), { min: 1e3, max: 3e4, step: 500, defaultVal: 5e3 })}
          ${s("burst_max_particles", l("editor.inspector.burstMaxParticles"), { min: 3, max: 50, step: 1, defaultVal: 20 })}
          ${e === "hvac" ? y`
                <div class="dual-unit-row">
                  <span class="defaults-label">${l("editor.stateA.peakAirflow")}</span>
                  <div class="field-col">
                    <label>${l("editor.stateA.peakM3h")}</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      .value=${String(o)}
                      @input=${(r) => {
      if (!this.config) return;
      const c = parseFloat(r.target.value);
      if (!Number.isFinite(c) || c <= 0) return;
      const a = this.config, d = ht(a, "peak_value", c);
      this.pushPatch(a, d, "set defaults.peak_value m³/h");
    }}
                    />
                  </div>
                  <div class="unit-divider">${l("editor.stateA.peakOr")}</div>
                  <div class="field-col">
                    <label>${l("editor.stateA.peakCfm")}</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      .value=${String(n)}
                      @input=${(r) => {
      if (!this.config) return;
      const c = parseFloat(r.target.value);
      if (!Number.isFinite(c) || c <= 0) return;
      const a = Math.round(c * 1.699 * 10) / 10, d = this.config, p = ht(d, "peak_value", a);
      this.pushPatch(d, p, "set defaults.peak_value via CFM");
    }}
                    />
                  </div>
                </div>
              ` : s("peak_value", l("editor.stateA.domainPeakDefault"), {
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
        <summary>${l("editor.stateA.domainSummary")}</summary>
        <div class="panel-body">
          <label class="field-row domain-field">
            <span class="field-label">${l("editor.stateA.domain")}</span>
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
    return l(`editor.stateA.domainOption.${t}`);
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderMultiSelectToolbar() {
    const t = this.selectedNodeIds.size;
    if (t < 2) return A;
    const e = this.selectedNodeIds, i = Array.from(e)[0];
    return y`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${l("editor.inspector.multiselectCount", t)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? "suggest-path-busy" : ""}"
          aria-label=${l("editor.inspector.suggestPathBetweenAria")}
          title=${l(t === 2 ? "editor.inspector.suggestPathBetweenTitle" : "editor.inspector.suggestPathPickTwoTitle")}
          ?disabled=${t !== 2 || this.suggestBusy}
          @click=${() => void this.runSuggestPath()}
        >${this.suggestBusy ? y`${l("editor.toolbar.suggestPathFinding")}<span class="suggest-path-spinner" aria-hidden="true"></span>` : l("editor.toolbar.suggestPath")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.hideSelectedNodesAria")} @click=${() => this.bulkHide(e)}>${l("editor.toolbar.hideSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.showSelectedNodesAria")} @click=${() => this.bulkShow(e)}>${l("editor.toolbar.showSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.alignSelectedHorizontalAria")} @click=${() => this.bulkAlignH(e, i)}>${l("editor.toolbar.alignHorizontalShort")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.alignSelectedVerticalAria")} @click=${() => this.bulkAlignV(e, i)}>${l("editor.toolbar.alignVerticalShort")}</button>
        <button type="button" class="ms-btn danger" aria-label=${l("editor.toolbar.deleteSelectedNodesAria")} @click=${() => this.bulkDelete(e)}>${l("editor.toolbar.deleteSelected")}</button>
        <button type="button" class="ms-btn ghost" aria-label=${l("editor.toolbar.clearMultiSelectionAria")} @click=${() => {
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
    }}>${l("editor.toolbar.deselect")}</button>
      </div>
    `;
  }
  bulkHide(t) {
    if (!this.config) return;
    const e = this.config, i = bi(e, t, !1);
    this.pushPatch(e, i, `hide ${t.size} nodes`);
  }
  bulkShow(t) {
    if (!this.config) return;
    const e = this.config, i = bi(e, t, !0);
    this.pushPatch(e, i, `show ${t.size} nodes`);
  }
  bulkAlignH(t, e) {
    if (!this.config) return;
    const i = this.config, o = Fs(i, t, e);
    this.pushPatch(i, o, `align ${t.size} nodes horizontally`);
  }
  bulkAlignV(t, e) {
    if (!this.config) return;
    const i = this.config, o = Ps(i, t, e);
    this.pushPatch(i, o, `align ${t.size} nodes vertically`);
  }
  bulkDelete(t) {
    if (!this.config || !window.confirm(l("editor.inspector.deleteNodesConfirm", t.size))) return;
    const e = this.config, i = Is(e, t);
    this.pushPatch(e, i, `delete ${t.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderBrowserPanel(t) {
    return y`
      <div class="image-browser">
        ${this.imageBrowserLoading ? y`<div class="browser-loading">${l("editor.stateA.loading")}</div>` : this.imageBrowserError === ft ? y`
                <div class="browser-setup-guide">
                  <p>${l("editor.stateA.browserSetupRequired")}</p>
                  <ol class="browser-setup-steps">
                    <li>${l("editor.stateA.browserSetupStep1")}</li>
                    <li>${l("editor.stateA.browserSetupStep2")}</li>
                    <li>
                      <span>${l("editor.stateA.browserSetupStep3")}</span>
                      <pre class="browser-code">homeassistant:
  media_dirs:
    flowme: /config/www/community/flowme/backgrounds</pre>
                    </li>
                    <li>${l("editor.stateA.browserSetupStep4")}</li>
                  </ol>
                  <p>${l("editor.stateA.browserSetupNote")}</p>
                  <a
                    href="https://www.home-assistant.io/more-info/local-media/setup-media/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="browser-setup-link"
                  >
                    ${l("editor.stateA.browserSetupDocs")} ↗
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
        <summary>${l("editor.inspector.weatherPanelSummary")}</summary>
        <div class="weather-body">
          <label>
            ${l("editor.inspector.defaultImageUrl")}
            <div class="bg-url-row">
              <input
                type="text"
                class="bg-url-input"
                .value=${t.default}
                @change=${this.onDefaultBgChange}
                placeholder=${l("editor.inspector.defaultBgPlaceholder")}
              />
              <button
                type="button"
                class="tb-icon-btn"
                title=${l("editor.stateA.browseImages")}
                aria-label=${l("editor.stateA.browseImages")}
                @click=${(o) => {
      o.stopPropagation(), this.openImageBrowser("default");
    }}
              >
                📁
              </button>
            </div>
            ${this.imageBrowserOpen && this.imageBrowserField === "default" ? this.renderBrowserPanel(t) : A}
            ${t.default ? y`<img class="weather-thumb" src=${t.default} alt=${l("editor.inspector.defaultBgAlt")} />` : A}
          </label>
          <label>
            ${l("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(
      t.weather_entity ?? "",
      (o) => this.setWeatherEntityValue(o),
      { includeDomains: ["weather"], placeholder: l("editor.inspector.weatherPlaceholder") }
    )}
          </label>
          ${t.weather_entity?.trim() ? y`
                <div class="weather-effects-row">
                  <label class="weather-effects-toggle">
                    <input
                      type="checkbox"
                      .checked=${t.weather_effects ?? !1}
                      @change=${this.onWeatherEffectsChange}
                    />
                    ${l("editor.stateA.weatherEffects")}
                  </label>
                  <p class="weather-effects-hint">${l("editor.stateA.weatherEffectsHelper")}</p>
                </div>
              ` : A}
          ${i !== void 0 ? y`<div class="weather-live-state">
                ${l("editor.inspector.currentState")} <strong>${i}</strong>
                ${t.weather_states?.[i] ? y` → <span class="weather-match-ok">${l("editor.inspector.weatherMatched")}</span>` : y` → <span class="weather-match-miss">${l("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : A}
          <label>
            ${l("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(
      t.sun_entity ?? "",
      (o) => {
        if (!this.config) return;
        const n = this.config, s = Ns(n, o || void 0);
        this.pushPatch(n, s, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: l("editor.inspector.sunPlaceholder") }
    )}
          </label>
          ${t.sun_entity && this.hass?.states[t.sun_entity] ? y`<div class="weather-live-state">
                ${l("editor.inspector.sunStateLabel")} <strong>${this.hass.states[t.sun_entity]?.state === "above_horizon" ? l("editor.inspector.sunAbove") : l("editor.inspector.sunBelow")}</strong>
              </div>` : A}
          <label>
            ${l("editor.inspector.fadeTransitionSeconds")}
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
      const s = this.config, r = Rs(s, n * 1e3);
      this.pushPatch(s, r, "set background transition duration");
    }}
            />
          </label>
          <div class="weather-states">
            <div class="weather-states-header">
              <span>${l("editor.inspector.weatherStateColumn")}</span>
              <span>${l("editor.inspector.weatherImageUrlColumn")}</span>
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
                        placeholder=${l("editor.inspector.weatherRowPlaceholder")}
                      />
                      <button
                        type="button"
                        class="tb-icon-btn"
                        title=${l("editor.stateA.browseImages")}
                        aria-label=${l("editor.stateA.browseImages")}
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
                        ${l("editor.inspector.remove")}
                      </button>
                    </div>
                  </div>
                  ${this.imageBrowserOpen && this.imageBrowserField === "weather" && this.imageBrowserWeatherState === o ? this.renderBrowserPanel(t) : A}
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${M.KNOWN_WEATHER_STATES.map(
      (o) => y`<option value=${o}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${l("editor.inspector.addWeatherState")}</button>
          </div>
          <details class="hint-details">
            <summary>${l("editor.inspector.metNoReferenceSummary")}</summary>
            <div class="hint-states">
              ${M.KNOWN_WEATHER_STATES.map(
      (o) => y`<code>${o}</code>`
    )}
              <p class="hint-sub">
                ${l("editor.inspector.metNoHint")}
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
      this.imageBrowserLoading = !1, this.imageBrowserError = l("editor.stateA.browserUnavailable"), this.requestUpdate();
      return;
    }
    try {
      const s = (await o.callWS({
        type: "media_source/browse_media",
        media_content_id: Ar()
      }))?.children ?? [], r = [];
      for (const c of s) {
        const a = c && typeof c == "object" ? c : {};
        eo() && k("[FlowMe] media item:", JSON.stringify(a, null, 2));
        const d = String(a.media_content_id ?? "").toLowerCase();
        if (!Pr.some((u) => d.endsWith(u))) continue;
        const p = Cr(a);
        if (!p) continue;
        const h = (typeof a.title == "string" && a.title.length > 0 ? a.title : void 0) ?? (typeof a.media_content_id == "string" ? a.media_content_id : void 0) ?? p;
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
    this.imageBrowserField === "weather" && this.imageBrowserWeatherState ? (i = _i(e, this.imageBrowserWeatherState, t), o = "Set weather state image") : (i = $i(e, t), o = "Set background image"), this.pushPatch(e, i, o), this.imageBrowserOpen = !1, this.imageBrowserField = "default", this.imageBrowserWeatherState = void 0;
  }
  setWeatherEntityValue(t) {
    if (!this.config) return;
    const e = t.trim(), i = this.config, o = Bs(i, e || void 0);
    this.pushPatch(i, o, "edit weather entity");
  }
  onWeatherStateKeyChange(t, e) {
    if (!this.config) return;
    const i = e.target.value.trim();
    if (!i || i === t) return;
    const o = this.config, n = Vs(o, t, i);
    n !== o && this.pushPatch(o, n, `rename weather state ${t}→${i}`);
  }
  onWeatherStateUrlChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, o = this.config, n = _i(o, t, i);
    this.pushPatch(o, n, `edit weather image ${t}`);
  }
  // -- toolbar --
  // -- suggest path --
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new kr();
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
      this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
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
    i?.logFallback && k("falling back to main thread pathfinding");
    const o = this.config.nodes.find((s) => s.id === t), n = this.config.nodes.find((s) => s.id === e);
    if (!(!o || !n)) {
      this.suggestBusy = !0;
      try {
        const s = await zi({
          imageUrl: this.config.background.default,
          from: o.position,
          to: n.position
        });
        if (!s.edgesUsable) {
          this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
          return;
        }
        this.applySuggestPathWorkerResult(s, t, e);
      } catch (s) {
        this.errorMessage = l(
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
    const [t, e] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((c) => c.id === t), o = this.config.nodes.find((c) => c.id === e);
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
    const s = await xr(n);
    if (!s) {
      this.suggestBusy = !1, this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
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
        cellSize: Dt
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
      const s = await zi({
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
      this.flowEndpointError = l("editor.inspector.fromToSameError");
      return;
    }
    const o = this.config;
    if (!o.flows.find((c) => c.id === t)) return;
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
        (c) => c.id === t ? { ...c, from_node: e, to_node: i, waypoints: s } : c
      )
    };
    this.pushPatch(o, r, "Change flow endpoints"), this.selectedFlowId = t;
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return A;
    const t = this.config.nodes.find((r) => r.id === this.suggestPreview.fromNodeId), e = this.config.nodes.find((r) => r.id === this.suggestPreview.toNodeId);
    if (!t || !e) return A;
    const i = this.imageNaturalW, o = this.imageNaturalH, s = [
      t.position,
      ...this.suggestPreview.waypoints,
      e.position
    ].map((r) => {
      const c = this.pct2px(r);
      return `${c.x.toFixed(2)},${c.y.toFixed(2)}`;
    }).join(" ");
    return y`
      <svg class="suggest-overlay" viewBox=${`0 0 ${i} ${o}`} preserveAspectRatio="none">
        <polyline points=${s} />
      </svg>
      ${this.suggestPreview.waypoints.map((r) => {
      const c = this.pct2px(r);
      return y`
          <div class="suggest-marker" style=${`left: ${c.x}px; top: ${c.y}px;`}></div>
        `;
    })}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? y`
      <div class="suggest-bar">
        <span>${l("editor.suggestBar.message")}</span>
        <span>${l("editor.inspector.suggestPreviewWaypoints", this.suggestPreview.waypoints.length)}</span>
        <button type="button" aria-label=${l("editor.toolbar.acceptPath")} @click=${this.acceptSuggestion}>${l("editor.inspector.accept")}</button>
        <button type="button" class="ghost" aria-label=${l("editor.toolbar.cancelPath")} @click=${this.cancelSuggestion}>${l("editor.toolbar.cancel")}</button>
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
    const i = this.config.nodes.find((c) => c.id === e.id);
    if (!i) {
      this.inlineRename = null;
      return;
    }
    const o = i.label ?? i.id, n = e.draft.trim() ? e.draft.trim() : void 0;
    if ((i.label ?? void 0) === n) {
      this.inlineRename = null;
      return;
    }
    const s = this.config, r = yi(s, e.id, n);
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
    const o = this.config, n = Fi(o, e.id, i);
    if (n === o) {
      this.errorMessage = l("editor.errors.renameIdConflict"), this.inlineRename = null;
      return;
    }
    this.inlineRename = null, this.errorMessage = "", this.pushPatch(o, n, `Rename overlay ${e.id} to ${i}`), this.selectedOverlayId = i;
  }
  onInspectorFlowIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, o = i.value.trim(), n = this.config, s = qs(n, t, o);
    if (s === n) {
      this.errorMessage = l("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(n, s, `Rename flow ${t} to ${o}`), this.selectedFlowId = o;
  }
  onInspectorOverlayIdChange(t, e) {
    if (!this.config) return;
    const i = e.target, o = i.value.trim(), n = this.config, s = Fi(n, t, o);
    if (s === n) {
      this.errorMessage = l("editor.errors.renameIdConflict"), i.value = t;
      return;
    }
    this.errorMessage = "", this.pushPatch(n, s, `Rename overlay ${t} to ${o}`), this.selectedOverlayId = o;
  }
  // -- inspector edits --
  onNodeLabelChange(t, e) {
    if (!this.config) return;
    const i = e.target.value, o = this.config, s = o.nodes.find((a) => a.id === t)?.label ?? t, r = yi(o, t, i.trim() ? i.trim() : void 0), c = i.trim() ? i.trim() : void 0;
    this.pushPatch(o, r, `Rename node ${s} to ${c ?? t}`);
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
    this.pushPatch(o, s, `edit entity of ${i ? H(i) : t}`);
  }
  onOverlaySizeChange(t, e, i) {
    if (!this.config) return;
    const o = (this.config.overlays ?? []).find((a) => a.id === t);
    if (!o) return;
    const n = o.size ?? { width: 20, height: 15 }, s = Number(i.target.value);
    if (!Number.isFinite(s) || s <= 0) return;
    const r = this.config, c = Ai(r, t, { ...n, [e]: s });
    this.pushPatch(r, c, `resize overlay ${t}`);
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
      this.customConfigError = l("editor.inspector.invalidCardJson", n instanceof Error ? n.message : String(n));
      return;
    }
    if (!i || typeof i != "object" || Array.isArray(i)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const o = this.config;
    try {
      const n = Ws(o, t, i), s = $e(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: o, next: s, description: `edit overlay ${t} card config` }), this.commitToHa(s);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(t) {
    if (!this.config) return;
    const e = this.config, i = Os(e, t);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(e, i, `delete overlay ${t}`);
  }
  removeNode(t) {
    if (!this.config) return;
    const e = this.config, i = Ss(e, t);
    this.selectedNodeId = null, this.pushPatch(e, i, `delete node ${t}`);
  }
  removeFlow(t) {
    if (!this.config) return;
    const e = this.config.flows.find((n) => n.id === t), i = this.config, o = Ms(i, t);
    this.selectedFlowId = null, this.pushPatch(i, o, `delete flow ${e ? H(e) : t}`);
  }
  onFlowLabelChange(t, e) {
    if (!this.config) return;
    const i = this.config.flows.find((r) => r.id === t);
    if (!i) return;
    const o = e.trim(), n = this.config, s = Qs(n, t, o === "" || o === i.id ? void 0 : o);
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
    const o = t.clientX - (i.left + 8), n = t.clientY - (i.top + 4), s = (o - this.panX) / this.scale, r = (n - this.panY) / this.scale, c = O(s / this.imageNaturalW * 100), a = O(r / this.imageNaturalH * 100);
    return { x: c, y: a };
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
M.KNOWN_WEATHER_STATES = [
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
M.styles = St`
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
    .weather-effects-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
    .weather-effects-toggle {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .weather-effects-hint {
      margin: 0;
      font-size: 11px;
      opacity: 0.75;
      line-height: 1.35;
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
N([
  De({ attribute: !1 })
], M.prototype, "hass", 2);
N([
  P()
], M.prototype, "config", 2);
N([
  P()
], M.prototype, "pending", 2);
N([
  P()
], M.prototype, "previewMode", 2);
N([
  P()
], M.prototype, "selectedNodeId", 2);
N([
  P()
], M.prototype, "selectedNodeIds", 2);
N([
  P()
], M.prototype, "selectedFlowId", 2);
N([
  P()
], M.prototype, "selectedOverlayId", 2);
N([
  P()
], M.prototype, "customConfigDraft", 2);
N([
  P()
], M.prototype, "customConfigError", 2);
N([
  P()
], M.prototype, "errorMessage", 2);
N([
  P()
], M.prototype, "inlineRename", 2);
N([
  P()
], M.prototype, "canUndo", 2);
N([
  P()
], M.prototype, "canRedo", 2);
N([
  P()
], M.prototype, "undoLabel", 2);
N([
  P()
], M.prototype, "redoLabel", 2);
N([
  P()
], M.prototype, "suggestPreview", 2);
N([
  P()
], M.prototype, "suggestBusy", 2);
N([
  P()
], M.prototype, "flowEndpointPathfindingFlowId", 2);
N([
  P()
], M.prototype, "flowEndpointError", 2);
N([
  P()
], M.prototype, "flowZeroThresholdDraft", 2);
N([
  P()
], M.prototype, "flowInspectorAdvancedOpen", 2);
N([
  P()
], M.prototype, "imageBrowserOpen", 2);
N([
  P()
], M.prototype, "imageBrowserLoading", 2);
N([
  P()
], M.prototype, "imageBrowserError", 2);
N([
  P()
], M.prototype, "imageBrowserField", 2);
N([
  P()
], M.prototype, "imageBrowserWeatherState", 2);
N([
  P()
], M.prototype, "imageBrowserFiles", 2);
N([
  P()
], M.prototype, "selectorType", 2);
N([
  P()
], M.prototype, "savedConfig", 2);
N([
  P()
], M.prototype, "scale", 2);
N([
  P()
], M.prototype, "panX", 2);
N([
  P()
], M.prototype, "panY", 2);
N([
  P()
], M.prototype, "imageLayoutReady", 2);
M = N([
  Ft("flowme-card-editor")
], M);
var Br = Object.defineProperty, Nr = Object.getOwnPropertyDescriptor, Z = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Nr(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (n = (o ? r(e, i, n) : r(n)) || n);
  return o && n && Br(e, i, n), n;
};
const go = "2.5.3";
console.info("%cFlowMe v" + go + " loaded", "color: #FF6B00; font-weight: bold");
const Hi = 5e3;
function Er(t) {
  if (!t) return "";
  const e = [], i = (o, n) => {
    const s = t[o];
    s !== void 0 && e.push(`${n}:${s};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), e.join("");
}
function Rr(t) {
  if (!t) return "";
  const e = [], i = (o, n) => {
    t[o] === !1 && e.push(`${n}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), e.join("");
}
let K = class extends re {
  constructor() {
    super(...arguments), this._connectionAwaitingReconnect = !1, this._boundHaConnection = null, this.onHaConnectionReady = () => {
      this.onReconnect();
    }, this.onHaConnectionDisconnected = () => {
      this._connectionAwaitingReconnect = !0;
    }, this._visibilityListenerAttached = !1, this._documentVisibilityPauseActive = !1, this._visibilityHandler = () => {
      this.syncAnimationsToDocumentVisibility();
    }, this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = V(), this.nodeFxSvgRef = V(), this.weatherFxHostRef = V(), this.nodeFx = new co(), this._nodeFxRaf = null, this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this.onOverlayKeydown = (t, e) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleOverlayTap(e));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(t) {
    const e = this._hass;
    if (this._hass = t, t && t.language !== this._lastLanguage && (this._lastLanguage = t.language, qi(t.language)), t) {
      const i = this.config, o = [
        ...i?.flows.map((a) => a.entity) ?? [],
        ...i?.flows.map((a) => a.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((a) => a.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((a) => typeof a == "string" && a.length > 0), n = {};
      for (const a of o)
        n[a] = t.states[a]?.state;
      k("hass setter called. config entity states:", n);
      const s = i?.background.weather_entity;
      if (s) {
        const a = e?.states[s]?.state, d = t.states[s]?.state;
        k("[weather] state:", d, "(was:", a, ")"), a !== d && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const a = e?.states[r]?.state, d = t.states[r]?.state;
        a !== d && (k("[sun] state changed:", a, "→", d), this.syncWeatherBackground());
      }
      const c = t.connection;
      this.bindHaConnection(c);
    } else
      k("hass setter called with undefined"), this.bindHaConnection(void 0), e && this.showToast(l("card.connectionLost"));
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
    this.hass && this.config && this.renderer && this.pushAllValuesToRenderer(), this._connectionAwaitingReconnect && (this._connectionAwaitingReconnect = !1, this.showToast(l("card.reconnected"), 1500));
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
        k("first paint:", performance.now());
      });
    });
  }
  setConfig(t) {
    se(Qi(t));
    const e = performance.now();
    k("setConfig start:", e);
    try {
      const i = $e(t);
      se(i.debug ?? !1), k("setConfig called:", JSON.parse(JSON.stringify(t ?? null))), k(
        "setConfig validated → flows=",
        i.flows.length,
        "nodes=",
        i.nodes.length,
        "overlays=",
        i.overlays?.length ?? 0,
        "card",
        go
      );
      const o = this.config, n = !!o && !!this.renderer && this.needsRendererReinit(o, i);
      if (!!this.renderer && !!o && !n && typeof this.renderer.applyConfig == "function") {
        this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(o, i), this.renderer.applyConfig(i), this.rendererReadyFor = i, this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
        {
          const r = performance.now();
          k("teardown complete:", r, "(skipped — applyConfig)"), k("renderer init start:", r, "(skipped — applyConfig)"), k("renderer init complete:", r, "(skipped — applyConfig)");
        }
        this.logFirstPaint();
        return;
      }
      this.renderer && n ? (this.teardownRenderer(), k("teardown complete:", performance.now())) : k("teardown complete:", performance.now(), "(skipped)"), this.config = i, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(o, i), this.logFirstPaint();
    } catch (i) {
      se(!1);
      const o = i instanceof Bt ? i.message : String(i);
      this.config = void 0, this.errorMessage = o, this.clearWeatherEffect(), this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.syncPauseWhenHiddenListener(), k("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    k("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), k("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this._visibilityListenerAttached && (document.removeEventListener("visibilitychange", this._visibilityHandler), this._visibilityListenerAttached = !1), this._documentVisibilityPauseActive = !1, this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null), this.bindHaConnection(void 0), this.nodeFx.reset(), this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), this.clearWeatherEffect(), super.disconnectedCallback();
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
    k("renderer init start:", performance.now()), this.teardownRenderer(), this.renderer = jn(), this.rendererReadyFor = this.config;
    const e = this.config;
    this.renderer.init(t, e).then(() => {
      k("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
    }).catch((i) => {
      k("renderer init failed — falling back to SVG renderer", i), this.teardownRenderer(), this.renderer = new Ke(), this.rendererReadyFor = e, this.renderer.init(t, e).then(() => {
        k("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
      }).catch((o) => {
        console.error("[flowme] SVG renderer init also failed", o);
      });
    });
  }
  willUpdate(t) {
    this.config && (this.beginRendererInitIfNeeded(), t.has("hass") && this.renderer && (this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels()), (t.has("config") || t.has("hass")) && this.syncWeatherBackground());
  }
  updated(t) {
    super.updated(t), this.config && !this.config.background?.default ? (this.style.setProperty("background", "transparent"), this.style.setProperty("box-shadow", "none")) : this.config && (this.style.removeProperty("background"), this.style.removeProperty("box-shadow")), this.beginRendererInitIfNeeded(), this.syncPauseWhenHiddenListener(), this.syncAnimationsToDocumentVisibility();
    const e = this.nodeFxSvgRef.value;
    e && this.config && this.nodeFx.sync(e, this.config, this.hass, performance.now(), this.nodeEffectHooks()), this.ensureNodeEffectsRaf(), this.syncWeatherEffects();
  }
  /** CSS overlay matching HA weather state when `background.weather_effects` is enabled. */
  syncWeatherEffects() {
    const t = this.config?.background, e = this.weatherFxHostRef.value;
    if (!t?.weather_effects || !t.weather_entity || !this.hass || !e) {
      this.clearWeatherEffect();
      return;
    }
    const i = this.hass.states[t.weather_entity]?.state;
    if (!i || !ss(i)) {
      this.clearWeatherEffect();
      return;
    }
    this._weatherEffect?.type !== i && (this.clearWeatherEffect(), this._weatherEffect = vs(i, e));
  }
  clearWeatherEffect() {
    this._weatherEffect && (ws(this._weatherEffect), this._weatherEffect = void 0);
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
      k("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (let t = 0; t < this.config.flows.length; t++) {
        const e = this.config.flows[t], i = this.hass.states[e.entity], o = xe(i?.state), n = U(e.domain ?? this.config.domain), s = i?.attributes?.unit_of_measurement, r = Xt(o, s, n.unit_scale);
        if (k(
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
            const c = `${e.id}:${e.entity}:unavailable`;
            this.warnedMissing.has(c) || (this.warnedMissing.add(c), k(`flow "${e.id}" entity "${e.entity}" is currently ${i.state} — no flow will render until it reports a number`));
          }
        } else {
          const c = `${e.id}:${e.entity}`;
          this.warnedMissing.has(c) || (this.warnedMissing.add(c), k(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(e.id, r.value), e.value_gradient && this.renderer.setGradientColor) {
          const c = e.value_gradient.entity, a = this.hass.states[c];
          if (a && a.state !== "unavailable" && a.state !== "unknown") {
            const d = parseFloat(a.state);
            if (Number.isFinite(d)) {
              const p = e.value_gradient, h = Math.max(p.low_value, Math.min(p.high_value, d)), u = so(d, p);
              k(
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
              k(`flow "${e.id}" gradient entity "${c}" state "${a.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            k(`flow "${e.id}" gradient entity "${c}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
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
    if (!this.hass || !this.config) return l("card.noConnection");
    const e = this.hass.states[t.entity], i = U(t.domain ?? this.config.domain);
    if (!e) return l("card.entityNotFound");
    if (e.state === "unavailable" || e.state === "unknown") return e.state;
    const o = xe(e.state), n = e.attributes?.unit_of_measurement ?? "", s = Xt(o, n, i.unit_scale);
    return n ? `${this.formatSensorNumber(s.value)} ${n}` : i.describe(s.value);
  }
  formatFlowAriaLabel(t) {
    return l("aria.flowGroup", H(t), this.describeFlowReading(t));
  }
  formatNodeAriaLabel(t) {
    const e = t.label ?? t.id;
    if (!this.hass || !t.entity || !this.config) return e;
    const i = this.hass.states[t.entity], o = U(this.config.domain);
    if (!i) return l("aria.readingWithTitle", e, l("card.entityNotFound"));
    if (i.state === "unavailable" || i.state === "unknown")
      return l("aria.readingWithTitle", e, i.state);
    const n = xe(i.state), s = i.attributes?.unit_of_measurement ?? "";
    return s ? l("aria.readingWithTitle", e, `${this.formatSensorNumber(n)} ${s}`) : l("aria.readingWithTitle", e, o.describe(n));
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
        <ha-card role="region" aria-label=${l("aria.card")}>
          <div class="error">
            <strong>${l("card.invalidConfigurationTitle")}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const t = this.config;
    if (!t)
      return y`<ha-card role="region" aria-label=${l("aria.card")}><div class="placeholder">${l("card.loading")}</div></ha-card>`;
    const i = `${1 / (st(t.aspect_ratio) ?? 16 / 10) * 100}%`, o = t.background.transition_duration ?? Hi, n = Er(t.opacity), s = Rr(t.visibility);
    return y`
      <ha-card role="region" aria-label=${l("aria.card")}>
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
          <div class="flowme-weather-fx-host" ${Y(this.weatherFxHostRef)}></div>
          <div class="renderer-mount" ${Y(this.rendererMount)}></div>
          <svg
            class="node-effects-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            ${Y(this.nodeFxSvgRef)}
          ></svg>
          ${t.nodes.map((r) => this.renderNodeHandle(r))}
          ${(t.overlays ?? []).map((r) => (k("rendering overlay →", r.type, "position=", r.position, "size=", r.size), Zn(r, this.hass, {
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
      this.showToast(l("card.actionFailed"));
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
        const i = e.state, o = t.sun_entity ? this.hass.states[t.sun_entity]?.state : void 0, n = en(i, o, t.weather_states, t.default);
        let s = i;
        return o === "below_horizon" && !i.endsWith("-night") && (s = `${i}-night`), k("[FlowMe] sun:", o, "weather:", i, "→ lookup key:", s, "→ image:", n !== t.default ? n : "default"), n;
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
    const e = this.config.background.transition_duration ?? Hi;
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
    const e = this.hass && t.entity ? this.hass.states[t.entity] : void 0, i = t.show_value !== !1 && !!e, o = t.show_label !== !1 && !!t.label, n = U(this.config?.domain), s = t.color ?? this.nodeFlowColor(t.id) ?? n.default_color_positive, r = t.size ?? this.config?.defaults?.node_radius ?? 12;
    let c = "";
    if (e) {
      const d = xe(e.state), p = e.attributes?.unit_of_measurement ?? "";
      p ? c = `${this.formatSensorNumber(d)} ${p}` : c = n.describe(d);
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
        ${o ? y`<span class="node-label">${t.label}</span>` : null}
        ${i ? y`<span class="node-value">${c}</span>` : null}
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
      const c = U(r.domain ?? e), a = fe(r, c, r.domain ?? e, 1, i, s), d = a.toLowerCase();
      n.has(d) || (n.add(d), o || (o = a));
    }
    if (n.size !== 0)
      return n.size === 1 ? o : lo;
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
K.styles = St`
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
    .flowme-weather-fx-host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }
    .stage::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, var(--flowme-opacity-darken, 0));
      pointer-events: none;
      z-index: 2;
    }
    .renderer-mount {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: var(--flowme-opacity-flows, 1);
      z-index: 3;
    }
    .node-effects-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 4;
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
Z([
  De({ attribute: !1 })
], K.prototype, "hass", 1);
Z([
  P()
], K.prototype, "config", 2);
Z([
  P()
], K.prototype, "errorMessage", 2);
Z([
  P()
], K.prototype, "toastVisible", 2);
Z([
  P()
], K.prototype, "toastMessage", 2);
Z([
  P()
], K.prototype, "bgLayerA", 2);
Z([
  P()
], K.prototype, "bgLayerB", 2);
Z([
  P()
], K.prototype, "activeLayer", 2);
K = Z([
  Ft("flowme-card")
], K);
const _t = window;
_t.customCards = _t.customCards ?? [];
_t.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: l("card.hacsDescription"),
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  K as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
