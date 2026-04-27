/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, Dt = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Lt = Symbol(), Gt = /* @__PURE__ */ new WeakMap();
let xe = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Dt && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Gt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Gt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const De = (e) => new xe(typeof e == "string" ? e : e + "", void 0, Lt), Ct = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new xe(i, e, Lt);
}, Le = (e, t) => {
  if (Dt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = bt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, qt = Dt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return De(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: He, defineProperty: je, getOwnPropertyDescriptor: Be, getOwnPropertyNames: We, getOwnPropertySymbols: Ve, getPrototypeOf: Ge } = Object, D = globalThis, Kt = D.trustedTypes, qe = Kt ? Kt.emptyScript : "", Ke = D.reactiveElementPolyfillSupport, rt = (e, t) => e, xt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? qe : null;
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
} }, Ht = (e, t) => !He(e, t), Jt = { attribute: !0, type: String, converter: xt, reflect: !1, useDefault: !1, hasChanged: Ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let tt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Jt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && je(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = Be(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const c = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Jt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(rt("elementProperties"))) return;
    const t = Ge(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(rt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(rt("properties"))) {
      const i = this.properties, s = [...We(i), ...Ve(i)];
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
      for (const n of s) i.unshift(qt(n));
    } else t !== void 0 && i.push(qt(t));
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
    return Le(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : xt).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : xt;
      this._$Em = n;
      const c = r.fromAttribute(i, o.type);
      this[n] = c ?? this._$Ej?.get(n) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? Ht)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
        const { wrapped: r } = o, c = this[n];
        r !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
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
tt.elementStyles = [], tt.shadowRootOptions = { mode: "open" }, tt[rt("elementProperties")] = /* @__PURE__ */ new Map(), tt[rt("finalized")] = /* @__PURE__ */ new Map(), Ke?.({ ReactiveElement: tt }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, Xt = (e) => e, $t = at.trustedTypes, Yt = $t ? $t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $e = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + z, Je = `<${_e}>`, V = document, ht = () => V.createComment(""), ut = (e) => e === null || typeof e != "object" && typeof e != "function", jt = Array.isArray, Xe = (e) => jt(e) || typeof e?.[Symbol.iterator] == "function", Ot = `[ 	
\f\r]`, ot = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Zt = /-->/g, Qt = />/g, j = RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), te = /'/g, ee = /"/g, Ae = /^(?:script|style|textarea|title)$/i, Ye = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), w = Ye(1), et = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), ie = /* @__PURE__ */ new WeakMap(), W = V.createTreeWalker(V, 129);
function ke(e, t) {
  if (!jt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Yt !== void 0 ? Yt.createHTML(t) : t;
}
const Ze = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ot;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let l, d, u = -1, h = 0;
    for (; h < a.length && (r.lastIndex = h, d = r.exec(a), d !== null); ) h = r.lastIndex, r === ot ? d[1] === "!--" ? r = Zt : d[1] !== void 0 ? r = Qt : d[2] !== void 0 ? (Ae.test(d[2]) && (n = RegExp("</" + d[2], "g")), r = j) : d[3] !== void 0 && (r = j) : r === j ? d[0] === ">" ? (r = n ?? ot, u = -1) : d[1] === void 0 ? u = -2 : (u = r.lastIndex - d[2].length, l = d[1], r = d[3] === void 0 ? j : d[3] === '"' ? ee : te) : r === ee || r === te ? r = j : r === Zt || r === Qt ? r = ot : (r = j, n = void 0);
    const p = r === j && e[c + 1].startsWith("/>") ? " " : "";
    o += r === ot ? a + Je : u >= 0 ? (s.push(l), a.slice(0, u) + $e + a.slice(u) + z + p) : a + z + (u === -2 ? c : p);
  }
  return [ke(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class pt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, d] = Ze(t, i);
    if (this.el = pt.createElement(l, s), W.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = W.nextNode()) !== null && a.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith($e)) {
          const h = d[r++], p = n.getAttribute(u).split(z), f = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: o, name: f[2], strings: p, ctor: f[1] === "." ? ti : f[1] === "?" ? ei : f[1] === "@" ? ii : Mt }), n.removeAttribute(u);
        } else u.startsWith(z) && (a.push({ type: 6, index: o }), n.removeAttribute(u));
        if (Ae.test(n.tagName)) {
          const u = n.textContent.split(z), h = u.length - 1;
          if (h > 0) {
            n.textContent = $t ? $t.emptyScript : "";
            for (let p = 0; p < h; p++) n.append(u[p], ht()), W.nextNode(), a.push({ type: 2, index: ++o });
            n.append(u[h], ht());
          }
        }
      } else if (n.nodeType === 8) if (n.data === _e) a.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(z, u + 1)) !== -1; ) a.push({ type: 7, index: o }), u += z.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = V.createElement("template");
    return s.innerHTML = t, s;
  }
}
function it(e, t, i = e, s) {
  if (t === et) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = ut(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = it(e, n._$AS(e, t.values), n, s)), t;
}
class Qe {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? V).importNode(i, !0);
    W.currentNode = n;
    let o = W.nextNode(), r = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new ft(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new si(o, this, t)), this._$AV.push(l), a = s[++c];
      }
      r !== a?.index && (o = W.nextNode(), r++);
    }
    return W.currentNode = V, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class ft {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = it(this, t, i), ut(t) ? t === y || t == null || t === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : t !== this._$AH && t !== et && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Xe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== y && ut(this._$AH) ? this._$AA.nextSibling.data = t : this.T(V.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = pt.createElement(ke(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Qe(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = ie.get(t.strings);
    return i === void 0 && ie.set(t.strings, i = new pt(t)), i;
  }
  k(t) {
    jt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new ft(this.O(ht()), this.O(ht()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = Xt(t).nextSibling;
      Xt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = y;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = it(this, t, i, 0), r = !ut(t) || t !== this._$AH && t !== et, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = it(this, c[s + a], i, a), l === et && (l = this._$AH[a]), r || (r = !ut(l) || l !== this._$AH[a]), l === y ? t = y : t !== y && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ti extends Mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === y ? void 0 : t;
  }
}
class ei extends Mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== y);
  }
}
class ii extends Mt {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = it(this, t, i, 0) ?? y) === et) return;
    const s = this._$AH, n = t === y && s !== y || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== y && (s === y || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class si {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    it(this, t);
  }
}
const ni = at.litHtmlPolyfillSupport;
ni?.(pt, ft), (at.litHtmlVersions ?? (at.litHtmlVersions = [])).push("3.3.2");
const oi = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new ft(t.insertBefore(ht(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis;
let L = class extends tt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oi(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return et;
  }
};
L._$litElement$ = !0, L.finalized = !0, ct.litElementHydrateSupport?.({ LitElement: L });
const ri = ct.litElementPolyfillSupport;
ri?.({ LitElement: L });
(ct.litElementVersions ?? (ct.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ai = { attribute: !0, type: String, converter: xt, reflect: !1, hasChanged: Ht }, ci = (e = ai, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, e, c), c;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function N(e) {
  return (t, i) => typeof i == "object" ? ci(e, t, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(e) {
  return N({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const di = { CHILD: 2 }, hi = (e) => (...t) => ({ _$litDirective$: e, values: t });
class ui {
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
const lt = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const s of i) s._$AO?.(t, !1), lt(s, t);
  return !0;
}, _t = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, Se = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), gi(t);
  }
};
function pi(e) {
  this._$AN !== void 0 ? (_t(this), this._$AM = e, Se(this)) : this._$AM = e;
}
function fi(e, t = !1, i = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(s)) for (let o = i; o < s.length; o++) lt(s[o], !1), _t(s[o]);
  else s != null && (lt(s, !1), _t(s));
  else lt(this, e);
}
const gi = (e) => {
  e.type == di.CHILD && (e._$AP ?? (e._$AP = fi), e._$AQ ?? (e._$AQ = pi));
};
class mi extends ui {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, s) {
    super._$AT(t, i, s), Se(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (lt(this, t), _t(this));
  }
  setValue(t) {
    if (li(this._$Ct)) this._$Ct._$AI(t, this);
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
const Ce = () => new bi();
class bi {
}
const Ft = /* @__PURE__ */ new WeakMap(), Me = hi(class extends mi {
  render(e) {
    return y;
  }
  update(e, [t]) {
    const i = t !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), y;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let i = Ft.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Ft.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? Ft.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), At = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], yi = ["javascript:", "vbscript:", "data:", "file:"];
function Pe(e, t = "card_config") {
  const i = [], s = /* @__PURE__ */ new WeakSet(), n = (o, r) => {
    if (o != null) {
      if (typeof o == "string") {
        const c = o.trim().toLowerCase();
        for (const a of yi)
          if (c.startsWith(a)) {
            i.push({ path: r, value: o, scheme: a });
            return;
          }
        return;
      }
      if (typeof o == "object" && !s.has(o)) {
        if (s.add(o), Array.isArray(o)) {
          for (let c = 0; c < o.length; c++) n(o[c], `${r}[${c}]`);
          return;
        }
        for (const [c, a] of Object.entries(o))
          n(a, `${r}.${c}`);
      }
    }
  };
  return n(e, t), i;
}
function wi(e, t = "card_config") {
  const i = Pe(e, t);
  if (i.length === 0) return;
  const s = i[0];
  throw new Error(
    `Unsafe URL scheme '${s.scheme}' in ${s.path}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
  );
}
class Bt extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const se = ["/local/", "/api/", "/hacsfiles/", "https://", "http://"];
function g(e, t) {
  throw new Bt(`${e}: ${t}`);
}
function Wt(e, t) {
  (!e || typeof e != "object") && g(t, "must be an object with x and y");
  const i = e, s = i.x, n = i.y;
  (typeof s != "number" || !Number.isFinite(s)) && g(`${t}.x`, "must be a finite number"), (typeof n != "number" || !Number.isFinite(n)) && g(`${t}.y`, "must be a finite number");
  const o = s, r = n;
  return (o < 0 || o > 100) && g(`${t}.x`, `must be in range 0-100, got ${o}`), (r < 0 || r > 100) && g(`${t}.y`, `must be in range 0-100, got ${r}`), { x: o, y: r };
}
function ne(e, t) {
  (typeof e != "string" || !e.length) && g(t, "must be a non-empty string");
  const i = e;
  return se.some((n) => i.startsWith(n)) || g(
    t,
    `must start with one of ${se.join(", ")} (got "${i.slice(0, 40)}")`
  ), i;
}
function vi(e, t, i) {
  const s = `nodes[${t}]`;
  (!e || typeof e != "object") && g(s, "must be an object");
  const n = e, o = n.id;
  (typeof o != "string" || !o.length) && g(`${s}.id`, "must be a non-empty string");
  const r = o;
  i.has(r) && g(`${s}.id`, `duplicate node id "${r}"`), i.add(r);
  const c = Wt(n.position, `${s}.position`), a = { id: r, position: c };
  return typeof n.entity == "string" && (a.entity = n.entity), typeof n.label == "string" && (a.label = n.label), typeof n.color == "string" && (a.color = n.color), typeof n.size == "number" && (a.size = n.size), typeof n.show_label == "boolean" && (a.show_label = n.show_label), typeof n.show_value == "boolean" && (a.show_value = n.show_value), a;
}
function xi(e, t, i, s) {
  const n = `flows[${t}]`;
  (!e || typeof e != "object") && g(n, "must be an object");
  const o = e, r = o.id;
  (typeof r != "string" || !r.length) && g(`${n}.id`, "must be a non-empty string");
  const c = r;
  i.has(c) && g(`${n}.id`, `duplicate flow id "${c}"`), i.add(c);
  const a = o.from_node;
  (typeof a != "string" || !s.has(a)) && g(`${n}.from_node`, `references unknown node "${String(a)}"`);
  const l = o.to_node;
  (typeof l != "string" || !s.has(l)) && g(`${n}.to_node`, `references unknown node "${String(l)}"`);
  const d = o.entity;
  (typeof d != "string" || !d.length) && g(`${n}.entity`, "must be a non-empty entity id");
  const u = o.waypoints;
  let h = [];
  u !== void 0 && (Array.isArray(u) || g(`${n}.waypoints`, "must be an array (may be empty or omitted)"), h = u.map(
    (f, b) => Wt(f, `${n}.waypoints[${b}]`)
  ));
  const p = {
    id: c,
    from_node: a,
    to_node: l,
    entity: d,
    waypoints: h
  };
  if (typeof o.domain == "string" && (At.includes(o.domain) || g(`${n}.domain`, `must be one of ${At.join(", ")}`), p.domain = o.domain), typeof o.color == "string" && (p.color = o.color), typeof o.color_positive == "string" && (p.color_positive = o.color_positive), typeof o.color_negative == "string" && (p.color_negative = o.color_negative), typeof o.threshold == "number" && (p.threshold = o.threshold), typeof o.reverse == "boolean" && (p.reverse = o.reverse), typeof o.speed_multiplier == "number") {
    const f = o.speed_multiplier;
    (f < 0.1 || f > 5) && g(`${n}.speed_multiplier`, "must be between 0.1 and 5.0"), p.speed_multiplier = f;
  }
  return o.speed_curve_override !== void 0 && (p.speed_curve_override = $i(
    o.speed_curve_override,
    `${n}.speed_curve_override`
  )), p;
}
function $i(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && g(t, "must be an object");
  const i = e, s = {};
  function n(h) {
    const p = i[h];
    if (p !== void 0)
      return (typeof p != "number" || !Number.isFinite(p) || p <= 0) && g(`${t}.${h}`, "must be a positive finite number"), p;
  }
  function o(h) {
    const p = i[h];
    if (p !== void 0)
      return (typeof p != "number" || !Number.isFinite(p) || p < 50) && g(`${t}.${h}`, "must be a finite number ≥ 50 (milliseconds)"), p;
  }
  const r = n("threshold");
  r !== void 0 && (s.threshold = r);
  const c = n("p50");
  c !== void 0 && (s.p50 = c);
  const a = n("peak");
  a !== void 0 && (s.peak = a);
  const l = o("max_duration");
  l !== void 0 && (s.max_duration = l);
  const d = o("min_duration");
  if (d !== void 0 && (s.min_duration = d), i.steepness !== void 0) {
    const h = i.steepness;
    (typeof h != "number" || !Number.isFinite(h) || h <= 0) && g(`${t}.steepness`, "must be a positive finite number"), s.steepness = h;
  }
  s.max_duration !== void 0 && s.min_duration !== void 0 && s.min_duration >= s.max_duration && g(t, "min_duration must be < max_duration");
  const u = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const h of Object.keys(i))
    u.has(h) || g(`${t}.${h}`, `unknown key (allowed: ${[...u].join(", ")})`);
  return s;
}
function Z(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e <= 0) && g(t, "must be a positive finite number"), e;
}
function _i(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && g("defaults", "must be an object");
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = Z(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const s = Z(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    s > 1 && g("defaults.burst_trigger_ratio", "must be ≤ 1 (it is a fraction of peak)"), i.burst_trigger_ratio = s;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = Z(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = Z(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = Z(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = Z(t.line_width, "defaults.line_width")), i;
}
function Ai(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && g("domain_colors", "must be an object");
  const t = e, i = {};
  for (const s of ["solar", "grid", "battery", "load"])
    t[s] !== void 0 && (typeof t[s] != "string" && g(`domain_colors.${s}`, "must be a string colour value"), i[s] = t[s]);
  return i;
}
function yt(e) {
  if (!e || typeof e != "object") throw new Bt("config must be an object");
  const t = e;
  t.type !== "custom:flowme-card" && g("type", `must equal "custom:flowme-card" (got "${String(t.type)}")`), At.includes(t.domain) || g("domain", `must be one of ${At.join(", ")}`);
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && g("background", "must be an object when provided");
  const s = i ?? {}, o = { default: s.default === void 0 || s.default === "" ? "" : ne(s.default, "background.default") };
  if (s.weather_entity !== void 0 && (typeof s.weather_entity != "string" && g("background.weather_entity", "must be a string entity id"), o.weather_entity = s.weather_entity), s.weather_states !== void 0) {
    (!s.weather_states || typeof s.weather_states != "object") && g("background.weather_states", "must be an object mapping state strings to image URLs");
    const p = Object.entries(s.weather_states), f = {};
    for (const [b, m] of p)
      f[b] = ne(m, `background.weather_states.${b}`);
    o.weather_states = f;
  }
  s.transition_duration !== void 0 && (typeof s.transition_duration != "number" && g("background.transition_duration", "must be a number (milliseconds)"), o.transition_duration = s.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || g("nodes", "must be an array");
  const c = /* @__PURE__ */ new Set(), a = r.map((p, f) => vi(p, f, c));
  a.length === 0 && g("nodes", "at least one node is required");
  const l = t.flows;
  Array.isArray(l) || g("flows", "must be an array");
  const d = /* @__PURE__ */ new Set(), u = l.map(
    (p, f) => xi(p, f, d, c)
  ), h = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: o,
    nodes: a,
    flows: u
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && g("aspect_ratio", 'must match regex \\d+:\\d+ (e.g. "16:10")'), h.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && g("fullscreen", "must be a boolean"), h.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && g("edit_mode_password", "must be a string"), h.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || g("overlays", "must be an array");
    const p = /* @__PURE__ */ new Set();
    h.overlays = t.overlays.map(
      (f, b) => ki(f, b, p)
    );
  }
  return t.defaults !== void 0 && (h.defaults = _i(t.defaults)), t.domain_colors !== void 0 && (h.domain_colors = Ai(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && g("debug", "must be a boolean"), h.debug = t.debug), h;
}
function ki(e, t, i) {
  const s = `overlays[${t}]`;
  (!e || typeof e != "object") && g(s, "must be an object");
  const n = e;
  n.type !== "custom" && g(
    `${s}.type`,
    'must be "custom" — native overlay types (camera, switch, sensor, button) were removed in v1.0.9. Use type: custom with a card: block instead.'
  );
  const r = n.id;
  (typeof r != "string" || !r.length) && g(`${s}.id`, "must be a non-empty string"), i.has(r) && g(`${s}.id`, `duplicate overlay id "${r}"`), i.add(r);
  const c = Wt(n.position, `${s}.position`), a = n.card;
  (!a || typeof a != "object" || Array.isArray(a)) && g(`${s}.card`, 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })');
  const l = Pe(a, `${s}.card`);
  if (l.length) {
    const h = l[0];
    g(
      h.path,
      `unsafe URL scheme "${h.scheme}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`
    );
  }
  const u = {
    id: r,
    type: "custom",
    position: c,
    card: a
  };
  if (n.size !== void 0) {
    const h = n.size;
    (!h || typeof h != "object") && g(`${s}.size`, "must be an object with width and height");
    const p = h, f = p.width, b = p.height;
    (typeof f != "number" || !Number.isFinite(f) || f <= 0 || f > 100) && g(`${s}.size.width`, "must be a positive number ≤ 100 (percent of card)"), (typeof b != "number" || !Number.isFinite(b) || b <= 0 || b > 100) && g(`${s}.size.height`, "must be a positive number ≤ 100 (percent of card)"), u.size = { width: f, height: b };
  }
  if (n.visible !== void 0 && (typeof n.visible != "boolean" && g(`${s}.visible`, "must be a boolean"), u.visible = n.visible), n.opacity !== void 0) {
    const h = n.opacity;
    (typeof h != "number" || !Number.isFinite(h) || h < 0 || h > 1) && g(`${s}.opacity`, "must be a number between 0 and 1"), u.opacity = h;
  }
  return u;
}
function Vt(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function kt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function Ee(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const s = e[i - 1], n = e[i];
    if (!s || !n) continue;
    const o = n.x - s.x, r = n.y - s.y;
    t += Math.sqrt(o * o + r * r);
  }
  return t;
}
function Si(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = Ee(e), s = Vt(t, 0, 1) * i;
  let n = 0;
  for (let o = 1; o < e.length; o++) {
    const r = e[o - 1], c = e[o], a = c.x - r.x, l = c.y - r.y, d = Math.sqrt(a * a + l * l);
    if (n + d >= s) {
      const u = d === 0 ? 0 : (s - n) / d;
      return { x: r.x + a * u, y: r.y + l * u };
    }
    n += d;
  }
  return { ...e[e.length - 1] };
}
function oe(e, t) {
  if (e.length === 0) return "";
  const [i, ...s] = e;
  if (!i) return "";
  const n = kt(i, t), o = [`M ${n.x.toFixed(2)} ${n.y.toFixed(2)}`];
  for (const r of s) {
    const c = kt(r, t);
    o.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
  }
  return o.join(" ");
}
function re(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
const G = 9e3, q = 700, K = 1.5;
function H(e, t) {
  const { threshold: i, p50: s, max_duration: n, min_duration: o, steepness: r } = t, c = Math.abs(e);
  if (!(s > 0) || !(i > 0)) return n;
  const a = Math.max(c, i), l = Math.log10(a / s), d = 1 / (1 + Math.exp(-r * l));
  return n - d * (n - o);
}
function Ne(e, t) {
  const i = e.speed_curve_override ?? {}, s = i.threshold ?? e.threshold ?? t.threshold, n = i.p50 ?? t.p50, o = i.peak ?? t.peak, r = i.max_duration ?? G, c = i.min_duration ?? q, a = i.steepness ?? K;
  return { threshold: s, p50: n, peak: o, max_duration: r, min_duration: c, steepness: a };
}
function Ci(e, t, i) {
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
    const [r, c] = o[0];
    return { value: e * c, factor: c, matchedUnit: r };
  }
  return { value: e, factor: 1 };
}
function Oe(e, t) {
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
function wt(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), s = Number.parseInt(t[2], 10);
  if (!(!i || !s))
    return i / s;
}
const Mi = {
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
    return H(e, {
      threshold: 30,
      p50: 800,
      max_duration: G,
      min_duration: q,
      steepness: K
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, Pi = {
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
    return H(e, {
      threshold: 0.3,
      p50: 6,
      max_duration: G,
      min_duration: q,
      steepness: K
    });
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, Ei = {
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
    return H(e, {
      threshold: 0.05,
      p50: 50,
      max_duration: G,
      min_duration: q,
      steepness: K
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(Vt(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, Ni = {
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
    return H(e, {
      threshold: 5,
      p50: 200,
      max_duration: G,
      min_duration: q,
      steepness: K
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return Vt(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, Oi = {
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
    return H(e, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: G,
      min_duration: q,
      steepness: K
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, Fe = {
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
    return H(e, {
      threshold: 1,
      p50: 100,
      max_duration: G,
      min_duration: q,
      steepness: K
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, ae = {
  energy: Mi,
  water: Pi,
  network: Ei,
  hvac: Ni,
  gas: Oi,
  generic: Fe
};
function dt(e) {
  return e && e in ae ? ae[e] : Fe;
}
const Fi = "#CCCCCC";
function Ui(e, t, i) {
  if (e !== "energy") return;
  const s = t.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(s)) return i?.solar ?? "#FFD700";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(s)) return i?.grid ?? "#1EB4FF";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(s)) return i?.battery ?? "#32DC50";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(s))
    return i?.load ?? "#FF8C1E";
}
function St(e, t, i, s, n) {
  const o = e.color ?? Ui(i, e.id, n);
  return s >= 0 ? e.color_positive ?? o ?? t.default_color_positive : e.color_negative ?? o ?? t.default_color_negative;
}
const Ti = "[FlowMe]";
let Ue = !1;
function Ri(e) {
  Ue = e;
}
function C(...e) {
  Ue && console.warn(Ti, ...e);
}
const Ii = "[FlowMe Renderer]";
function S(...e) {
  C(Ii, ...e);
}
const P = "http://www.w3.org/2000/svg", gt = "http://www.w3.org/1999/xlink";
function zi() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const mt = zi(), Di = 2e3, Li = 3, ce = 5, Hi = 9, ji = 2, Bi = 8, Wi = 14, Vi = 0.9, Gi = 5e3, le = 20;
class Tt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Oe(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set();
  }
  async init(t, i) {
    S("init called — container:", t, "| container size:", t.getBoundingClientRect(), "| flows:", i.flows.length, "| nodes:", i.nodes.length), S("init config flows:", i.flows.map((n) => ({ id: n.id, entity: n.entity, from: n.from_node, to: n.to_node, waypoints: n.waypoints.length, domain: n.domain }))), this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n]));
    const s = document.createElementNS(P, "svg");
    s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("preserveAspectRatio", "none"), s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.overflow = "visible", this.svg = s, t.appendChild(s), S("<svg> element appended to container. Parent shadow-root?", t.getRootNode().constructor.name), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t);
  }
  updateFlow(t, i) {
    if (!this.flowsById.has(t)) {
      S("updateFlow called for UNKNOWN flowId:", t);
      return;
    }
    S("updateFlow:", t, "value=", i, "→ queued, will flush in 200ms"), this.latestValues.set(t, i), this.applyUpdate();
  }
  destroy() {
    this.applyUpdate.cancel(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear();
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
    const i = document.createElementNS(P, "defs");
    this.svg.appendChild(i);
    const s = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = s.get(n.from_node), r = s.get(n.to_node);
      if (!o || !r) continue;
      const a = this.profileFor(n).shape, l = [o.position, ...n.waypoints, r.position], d = `flowme-path-${n.id}`, u = document.createElementNS(P, "path");
      u.setAttribute("id", d), u.setAttribute("d", oe(l, t)), u.setAttribute("fill", "none"), i.appendChild(u);
      const h = document.createElementNS(P, "g");
      h.setAttribute("data-flow-id", n.id);
      const p = document.createElementNS(P, "use");
      p.setAttributeNS(gt, "href", `#${d}`), p.setAttribute("href", `#${d}`);
      const f = this.config?.defaults?.line_width ?? ji;
      p.setAttribute("stroke", this.primaryColor(n)), p.setAttribute("stroke-opacity", "0.2"), p.setAttribute("stroke-width", String(f)), p.setAttribute("stroke-linecap", "round"), p.setAttribute("stroke-linejoin", "round"), p.setAttribute("fill", "none"), h.appendChild(p);
      const b = {
        group: h,
        path: u,
        pathId: d,
        shape: a,
        particles: []
      };
      if (a === "wave") {
        const x = document.createElementNS(P, "use");
        x.setAttributeNS(gt, "href", `#${d}`), x.setAttribute("href", `#${d}`), x.setAttribute("stroke", this.primaryColor(n)), x.setAttribute("stroke-width", String(Bi)), x.setAttribute("stroke-opacity", "0.9"), x.setAttribute("stroke-linecap", "round"), x.setAttribute("stroke-linejoin", "round"), x.setAttribute("fill", "none"), x.setAttribute("stroke-dasharray", "14 10"), x.setAttribute("stroke-dashoffset", "0"), x.setAttribute("opacity", "0"), h.appendChild(x), b.waveStroke = x;
      } else a === "pulse" && (b.pulseCircles = []);
      this.svg.appendChild(h), this.flowNodes.set(n.id, b);
      const m = u.getAttribute("d") ?? "";
      S(
        "flow element appended:",
        n.id,
        "| pathId=",
        d,
        "| d=",
        m,
        "| shape=",
        a,
        "| group outerHTML[0..200]=",
        h.outerHTML.slice(0, 200)
      );
    }
    S("buildSkeleton complete. flowNodes map size=", this.flowNodes.size, "| <svg> children=", this.svg.children.length);
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
      const c = [o.position, ...s.waypoints, r.position];
      n.path.setAttribute("d", oe(c, t)), n.shape === "pulse" && this.applyFlow(s.id, this.latestValues.get(s.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues)
      this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const s = this.flowsById.get(t), n = this.flowNodes.get(t);
    if (!s || !n) {
      S("applyFlow SKIP (unknown flow or no DOM):", t, "hasFlow?", !!s, "hasDom?", !!n);
      return;
    }
    const o = this.profileFor(s), r = Ne(s, o), c = mt ? 0 : r.threshold, a = Math.abs(i), l = mt || a >= c;
    if (S(
      "applyFlow:",
      t,
      "value=",
      i,
      "| magnitude=",
      a,
      "| threshold=",
      c,
      "| visible=",
      l,
      "| DEBUG=",
      mt,
      "| curve params (resolved)=",
      r,
      "| override=",
      s.speed_curve_override ?? "(none)"
    ), !l) {
      this.setGroupVisible(n, !1), S("applyFlow → flow", t, "hidden (below threshold). No animation will run.");
      return;
    }
    this.setGroupVisible(n, !0);
    const d = s.speed_multiplier ?? 1, u = H(a, r), h = mt ? Di : Math.max(50, u * d), p = i < 0 != (s.reverse === !0) ? -1 : 1, f = s.domain ?? this.config?.domain, b = St(s, o, f, p, this.config?.domain_colors), m = this.updateBurstState(t, a, r, o);
    switch (S(
      "applyFlow → computed:",
      t,
      "| domain=",
      f ?? "(default)",
      "| shape=",
      n.shape,
      "| sigmoidSpeedCurve(mag)=",
      u,
      "| speedMult=",
      d,
      "| dur=",
      h,
      "ms",
      "| direction=",
      p,
      "| resolved color=",
      b,
      "| burstMultiplier=",
      m,
      "| flow.color=",
      s.color,
      "| flow.color_positive=",
      s.color_positive,
      "| flow.color_negative=",
      s.color_negative,
      "| profile.default_color_positive=",
      o.default_color_positive
    ), n.shape) {
      case "wave":
        this.applyWave(n, o, h, b, p);
        break;
      case "pulse":
        this.applyPulse(n, s, o, i, h, b, m);
        break;
      case "square":
        this.applyParticles(n, s, o, i, h, b, p, "square", m);
        break;
      case "gradient":
      case "dot":
      default:
        this.applyParticles(n, s, o, i, h, b, p, "dot", m);
        break;
    }
  }
  /**
   * Track whether a flow has sustained ≥ 90 % of its resolved `peak`
   * (override-aware) for at least 5 s. Return the particle-count
   * multiplier to apply right now (1 outside burst, profile's
   * `burst_density_multiplier` inside — default 1.5).
   */
  updateBurstState(t, i, s, n) {
    const o = s.peak, r = this.config?.defaults?.burst_trigger_ratio ?? Vi, c = this.config?.defaults?.burst_sustain_ms ?? Gi, a = o * r, l = i >= a, d = performance.now();
    if (!l)
      return this.burstActive.has(t) && (S("burst EXIT:", t, "magnitude=", i, "droppedBelow=", a.toFixed(2)), this.burstActive.delete(t)), this.burstEnteredAt.delete(t), 1;
    let u = this.burstEnteredAt.get(t);
    u === void 0 && (u = d, this.burstEnteredAt.set(t, u));
    const h = d - u;
    if (h < c)
      return S(
        "burst PENDING:",
        t,
        "magnitude=",
        i,
        "| above",
        a.toFixed(2),
        "for",
        Math.round(h),
        "ms of",
        c
      ), 1;
    const p = n.burst_density_multiplier ?? 1.5;
    return this.burstActive.has(t) || (S(
      "burst ENTER:",
      t,
      "| sustained ≥",
      (r * 100).toFixed(0) + "%",
      "of peak",
      o,
      "for",
      Math.round(h),
      "ms → density ×" + p
    ), this.burstActive.add(t)), p;
  }
  setGroupVisible(t, i) {
    const s = i ? "1" : "0";
    for (const n of t.particles) n.shape.setAttribute("opacity", s);
    if (t.waveStroke && t.waveStroke.setAttribute("opacity", i ? "0.9" : "0"), t.pulseCircles)
      for (const n of t.pulseCircles) n.circle.setAttribute("opacity", s);
  }
  applyParticles(t, i, s, n, o, r, c, a, l) {
    const d = Math.max(
      1,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Li
      )
    ), u = this.config?.defaults?.burst_max_particles ?? le, h = Math.min(
      u,
      Math.max(1, Math.round(d * l))
    );
    if (l !== 1 && S("applyParticles burst → base=", d, "× mult=", l, "→ final=", h), t.particles.length !== h) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < h; f++)
        t.particles.push(this.makeParticle(t, a, r, s.glow));
    }
    const p = `${(o / 1e3).toFixed(3)}s`;
    S("applyParticles:", t.pathId, "| kind=", a, "| count=", t.particles.length, "| dur=", p, "| color=", r, "| direction=", c);
    for (let f = 0; f < t.particles.length; f++) {
      const b = t.particles[f];
      if (!b) continue;
      b.shape.setAttribute("fill", r), s.glow && (b.shape.style.color = r);
      const m = document.createElementNS(P, "animateMotion");
      m.setAttribute("repeatCount", "indefinite"), m.setAttribute("dur", p), m.setAttribute("rotate", "auto"), m.setAttribute(
        "begin",
        `${(-o * f / (t.particles.length * 1e3)).toFixed(3)}s`
      ), c < 0 && (m.setAttribute("keyPoints", "1;0"), m.setAttribute("keyTimes", "0;1"));
      const x = document.createElementNS(P, "mpath");
      x.setAttributeNS(gt, "href", `#${t.pathId}`), x.setAttribute("href", `#${t.pathId}`), m.appendChild(x), b.animateMotion.replaceWith(m), b.animateMotion = m, b.shape.appendChild(m), f === 0 && S(
        "animateMotion[0] installed on",
        t.pathId,
        "| dur=",
        m.getAttribute("dur"),
        "| mpath href=#" + t.pathId,
        "| element outerHTML[0..200]=",
        m.outerHTML.slice(0, 200),
        "| parent shape outerHTML[0..200]=",
        b.shape.outerHTML.slice(0, 200)
      );
    }
    C("SVG flow created:", t.pathId, "pathD=", t.path.getAttribute("d"), "dur=", p, "particles=", t.particles.length);
  }
  applyWave(t, i, s, n, o) {
    const r = t.waveStroke;
    if (!r) return;
    r.setAttribute("stroke", n);
    const c = r.querySelector("animate");
    c && c.remove();
    const a = document.createElementNS(P, "animate");
    a.setAttribute("attributeName", "stroke-dashoffset"), a.setAttribute("from", o > 0 ? "0" : "-24"), a.setAttribute("to", o > 0 ? "-24" : "0"), a.setAttribute("dur", `${(s / 1e3).toFixed(3)}s`), a.setAttribute("repeatCount", "indefinite"), r.appendChild(a);
  }
  applyPulse(t, i, s, n, o, r, c) {
    if (!this.svg) return;
    const a = t.group, l = new Map(this.config?.nodes.map((A) => [A.id, A]) ?? []), d = l.get(i.from_node), u = l.get(i.to_node);
    if (!d || !u) return;
    const h = [d.position, ...i.waypoints, u.position], p = Ee(h), f = Math.max(
      2,
      Math.round(
        s.particle_count_curve ? s.particle_count_curve(n) : Math.max(3, Math.floor(p / 15))
      )
    ), b = this.config?.defaults?.burst_max_particles ?? le, m = Math.min(
      b,
      Math.max(2, Math.round(f * c))
    );
    c !== 1 && S("applyPulse burst → base=", f, "× mult=", c, "→ final=", m);
    const x = this.containerSize();
    if (!t.pulseCircles || t.pulseCircles.length !== m) {
      if (t.pulseCircles) for (const A of t.pulseCircles) A.circle.remove();
      t.pulseCircles = [];
      for (let A = 0; A < m; A++) {
        const v = document.createElementNS(P, "circle");
        v.setAttribute("r", "0"), v.setAttribute("fill", r), v.setAttribute("opacity", "0"), s.glow && v.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), v.style.color = r;
        const O = document.createElementNS(P, "animate");
        O.setAttribute("attributeName", "r"), O.setAttribute("values", `0;${Wi};0`), O.setAttribute("repeatCount", "indefinite"), v.appendChild(O);
        const F = document.createElementNS(P, "animate");
        F.setAttribute("attributeName", "opacity"), F.setAttribute("values", "0;1;0"), F.setAttribute("repeatCount", "indefinite"), v.appendChild(F), a.appendChild(v), t.pulseCircles.push({ circle: v, animateRadius: O, animateOpacity: F });
      }
    }
    for (let A = 0; A < t.pulseCircles.length; A++) {
      const v = t.pulseCircles[A];
      if (!v) continue;
      const O = (A + 0.5) / t.pulseCircles.length, F = Si(h, O), nt = kt(F, x);
      v.circle.setAttribute("cx", nt.x.toFixed(2)), v.circle.setAttribute("cy", nt.y.toFixed(2)), v.circle.setAttribute("fill", r), v.circle.style.color = r;
      const U = `${(o / 1e3).toFixed(3)}s`, T = `${(-o * A / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      v.animateRadius.setAttribute("dur", U), v.animateRadius.setAttribute("begin", T), v.animateOpacity.setAttribute("dur", U), v.animateOpacity.setAttribute("begin", T);
    }
  }
  makeParticle(t, i, s, n) {
    const o = this.config?.defaults?.dot_radius ?? ce;
    let r;
    if (i === "square") {
      const l = o * (Hi / ce), d = document.createElementNS(P, "rect");
      d.setAttribute("width", String(l)), d.setAttribute("height", String(l)), d.setAttribute("x", String(-l / 2)), d.setAttribute("y", String(-l / 2)), d.setAttribute("rx", "1.5"), d.setAttribute("fill", s), d.setAttribute("opacity", "0"), r = d;
    } else {
      const l = document.createElementNS(P, "circle");
      l.setAttribute("r", String(o)), l.setAttribute("fill", s), l.setAttribute("opacity", "0"), r = l;
    }
    n && (r.setAttribute("filter", "drop-shadow(0 0 6px currentColor)"), r.style.color = s);
    const c = document.createElementNS(P, "animateMotion");
    c.setAttribute("repeatCount", "indefinite"), c.setAttribute("dur", "2s");
    const a = document.createElementNS(P, "mpath");
    return a.setAttributeNS(gt, "href", `#${t.pathId}`), a.setAttribute("href", `#${t.pathId}`), c.appendChild(a), r.appendChild(c), t.group.appendChild(r), { shape: r, animateMotion: c };
  }
  profileFor(t) {
    return dt(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t), s = t.domain ?? this.config?.domain;
    return St(t, i, s, 1, this.config?.domain_colors);
  }
}
const qi = `/* eslint-disable no-undef */
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
`, de = "flowme-keyframes", Rt = "flowme-cycle", Ki = 5, Ji = 2;
let B = null, he = !1;
function Xi() {
  if (document.getElementById(de)) return;
  const e = document.createElement("style");
  e.id = de, e.textContent = `@keyframes ${Rt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function Yi() {
  if (he) return;
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
  he = !0;
}
async function Zi() {
  if (B) return B;
  const e = CSS.paintWorklet;
  if (!e)
    return B = Promise.reject(new Error("paintWorklet not available")), B;
  const t = new Blob([qi], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return B = e.addModule(i).catch((s) => {
    throw B = null, s;
  }).finally(() => {
  }), B;
}
class Qi {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = Oe(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((n) => [n.id, n])), Xi(), Yi(), await Zi();
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", t.appendChild(s), this.wrapper = s;
    for (const n of i.flows) {
      const o = document.createElement("div");
      o.dataset.flowId = n.id, o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.background = "paint(flowme-painter)", o.style.animation = `${Rt} 2s linear infinite`, o.style.opacity = "0", s.appendChild(o), this.flowDivs.set(n.id, { el: o });
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
      const l = [o.position, ...s.waypoints, r.position].map((d) => kt(d, t)).map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ");
      n.el.style.setProperty("--flowme-path", `"${l}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues) this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const s = this.flowsById.get(t), n = this.flowDivs.get(t);
    if (!s || !n) return;
    const o = this.profileFor(s), r = Ne(s, o), c = Math.abs(i);
    if (!(c >= r.threshold)) {
      n.el.style.opacity = "0";
      return;
    }
    n.el.style.opacity = "1";
    const l = s.speed_multiplier ?? 1, d = Math.max(50, H(c, r) * l), u = i < 0 != (s.reverse === !0) ? -1 : 1, h = s.domain ?? this.config?.domain, p = St(s, o, h, u, this.config?.domain_colors), f = Math.max(
      1,
      Math.round(o.particle_count_curve ? o.particle_count_curve(i) : 3)
    ), b = o.wave_amplitude_curve ? o.wave_amplitude_curve(i) : 4, m = n.el.style;
    m.setProperty("--flowme-shape", o.shape), m.setProperty("--flowme-color", p), m.setProperty("--flowme-glow", o.glow ? "1" : "0"), m.setProperty("--flowme-count", String(f)), m.setProperty("--flowme-radius", String(Ki)), m.setProperty("--flowme-line", String(Ji)), m.setProperty("--flowme-amp", String(b)), m.setProperty("--flowme-direction", String(u)), m.animation = `${Rt} ${(d / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return dt(t.domain ?? this.config?.domain);
  }
}
function ts() {
  const e = is(), t = e ?? "svg", i = es();
  return C(
    "renderer selected:",
    t === "houdini" ? "HoudiniRenderer" : "SvgRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    i,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), t === "houdini" ? i ? new Qi() : (C("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Tt()) : new Tt();
}
function es() {
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
function ss(e) {
  const t = e.size?.width ?? 20, i = e.size?.height ?? 15;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function ns(e, t) {
  C(
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
  return w`
    <div
      class="overlay overlay-custom"
      data-overlay-id=${e.id}
      style=${ss(e) + n}
    >
      <flowme-custom-overlay
        .hass=${t}
        .card=${e.card}
      ></flowme-custom-overlay>
    </div>
  `;
}
let Ut = null, Q = null;
async function os() {
  if (Ut) return Ut;
  if (Q) return Q;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (Q = t().then((i) => (Ut = i, Q = null, i)).catch((i) => {
    throw Q = null, i;
  }), Q);
}
async function rs(e) {
  const t = await os();
  return t ? t.createCardElement(e) : null;
}
var as = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, Et = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? cs(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && as(t, i, n), n;
};
let st = class extends L {
  updated(e) {
    super.updated(e), e.has("card") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  render() {
    return this.errorMessage ? w`<div class="err" title=${this.errorMessage}>!</div>` : w`<div class="mount"></div>`;
  }
  rebuildChild() {
    const e = this.card, t = e ? JSON.stringify(e) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!e)) {
      try {
        wi(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, rs(e).then((i) => {
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
st.styles = Ct`
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
Et([
  N({ attribute: !1 })
], st.prototype, "hass", 2);
Et([
  N({ attribute: !1 })
], st.prototype, "card", 2);
Et([
  _()
], st.prototype, "errorMessage", 2);
st = Et([
  Pt("flowme-custom-overlay")
], st);
const ls = 100;
class ds {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > ls; ) this.undoStack.shift();
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
function k(e) {
  return JSON.parse(JSON.stringify(e));
}
function E(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function ue(e, t = 8) {
  return Math.round(e / t) * t;
}
function hs(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `node_${i}`;
    if (!t.has(s)) return s;
  }
  return `node_${Date.now()}`;
}
function us(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `flow_${i}`;
    if (!t.has(s)) return s;
  }
  return `flow_${Date.now()}`;
}
function ps(e, t, i) {
  const s = k(e);
  for (const n of s.nodes)
    n.id === t && (n.position = { x: E(i.x), y: E(i.y) });
  return s;
}
function fs(e, t, i) {
  const s = k(e), n = {
    id: hs(e),
    position: { x: E(t.x), y: E(t.y) },
    label: i
  };
  return s.nodes.push(n), { config: s, node: n };
}
function gs(e, t) {
  const i = k(e);
  return i.nodes = i.nodes.filter((s) => s.id !== t), i.flows = i.flows.filter((s) => s.from_node !== t && s.to_node !== t), i;
}
function ms(e, t, i, s) {
  const n = k(e);
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
function bs(e, t, i, s) {
  const n = k(e);
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
function ys(e, t, i) {
  const s = k(e);
  for (const n of s.flows)
    if (n.id === t) {
      if (i < 0 || i >= n.waypoints.length) return e;
      n.waypoints.splice(i, 1);
    }
  return s;
}
function ws(e, t, i, s) {
  const n = k(e), o = {
    id: us(e),
    from_node: t,
    to_node: i,
    entity: s,
    waypoints: []
  };
  return n.flows.push(o), { config: n, flow: o };
}
function vs(e, t) {
  const i = k(e);
  return i.flows = i.flows.filter((s) => s.id !== t), i;
}
function xs(e, t) {
  const i = k(e);
  return i.background.default = t, i;
}
function $s(e, t) {
  const i = k(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function _s(e, t) {
  const i = k(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function pe(e, t, i) {
  var n;
  const s = k(e);
  return (n = s.background).weather_states ?? (n.weather_states = {}), s.background.weather_states[t] = i, s;
}
function As(e, t) {
  const i = k(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function ks(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const s = `overlay_${i}`;
    if (!t.has(s)) return s;
  }
  return `overlay_${Date.now()}`;
}
function Ss(e, t) {
  const i = k(e), s = t.id ?? ks(e), n = {
    ...t,
    id: s,
    position: {
      x: E(t.position.x),
      y: E(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], n], { config: i, overlay: n };
}
function Cs(e, t) {
  const i = k(e);
  return i.overlays = (i.overlays ?? []).filter((s) => s.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function Ms(e, t, i) {
  const s = k(e);
  for (const n of s.overlays ?? [])
    n.id === t && (n.position = { x: E(i.x), y: E(i.y) });
  return s;
}
function fe(e, t, i) {
  const s = k(e), n = Math.max(2, Math.min(100, i.width)), o = Math.max(2, Math.min(100, i.height));
  for (const r of s.overlays ?? [])
    r.id === t && (r.size = { width: n, height: o });
  return s;
}
function Ps(e, t, i) {
  const s = k(e);
  for (const n of s.overlays ?? [])
    n.id === t && i && (n.card = i);
  return s;
}
function Es(e, t, i) {
  const s = k(e);
  for (const n of s.overlays ?? [])
    n.id === t && (i ? delete n.visible : n.visible = !1);
  return s;
}
function Ns(e, t, i) {
  const s = k(e);
  for (const n of s.overlays ?? [])
    if (n.id === t) {
      const o = Math.max(0, Math.min(1, i));
      o === 1 ? delete n.opacity : n.opacity = o;
    }
  return s;
}
function Os(e, t, i) {
  if (t === i) return e;
  const s = k(e), n = s.background.weather_states;
  if (!n || !(t in n)) return e;
  const o = n[t];
  return o === void 0 ? e : (delete n[t], n[i] = o, s);
}
var Fs = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, J = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Us(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Fs(t, i, n), n;
};
let R = class extends L {
  constructor() {
    super(...arguments), this.canUndo = !1, this.canRedo = !1, this.previewMode = !1, this.suggestPathDisabled = !0, this.undoLabel = "", this.redoLabel = "";
  }
  render() {
    return w`
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
R.styles = Ct`
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
J([
  N({ type: Boolean })
], R.prototype, "canUndo", 2);
J([
  N({ type: Boolean })
], R.prototype, "canRedo", 2);
J([
  N({ type: Boolean })
], R.prototype, "previewMode", 2);
J([
  N({ type: Boolean })
], R.prototype, "suggestPathDisabled", 2);
J([
  N({ type: String })
], R.prototype, "undoLabel", 2);
J([
  N({ type: String })
], R.prototype, "redoLabel", 2);
R = J([
  Pt("flowme-editor-toolbar")
], R);
const Te = 8, ge = 1, It = 255;
function Ts(e, t = Te) {
  const i = Math.max(1, Math.floor(t)), s = Math.max(1, Math.ceil(e.width / i)), n = Math.max(1, Math.ceil(e.height / i)), o = new Uint16Array(s * n);
  for (let r = 0; r < n; r++) {
    const c = r * i, a = Math.min(e.height, c + i);
    for (let l = 0; l < s; l++) {
      const d = l * i, u = Math.min(e.width, d + i);
      let h = 0;
      for (let f = c; f < a; f++) {
        const b = f * e.width;
        for (let m = d; m < u; m++) {
          const x = e.data[b + m] ?? 0;
          x > h && (h = x);
        }
      }
      const p = It - h;
      o[r * s + l] = p < ge ? ge : p;
    }
  }
  return { cols: s, rows: n, cellSize: i, data: o };
}
function Rs(e, t, i) {
  return i * e.cols + t;
}
function Is(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? It : e.data[Rs(e, t, i)] ?? It;
}
const zs = 50;
class Ds {
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
function Ls(e, t, i) {
  const [s, n] = t, [o, r] = i;
  if (s < 0 || n < 0 || s >= e.cols || n >= e.rows || o < 0 || r < 0 || o >= e.cols || r >= e.rows) return null;
  if (s === o && n === r) return [[s, n]];
  const c = e.cols * e.rows, a = new Float32Array(c);
  a.fill(1 / 0);
  const l = new Int16Array(c), d = new Int16Array(c);
  l.fill(-1), d.fill(-1);
  const u = new Uint8Array(c), h = new Uint8Array(c), p = n * e.cols + s;
  a[p] = 0;
  const f = new Ds();
  f.push({ col: s, row: n, f: me(s, n, o, r) });
  const b = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const m = f.pop(), { col: x, row: A } = m, v = A * e.cols + x;
    if (!h[v]) {
      if (h[v] = 1, x === o && A === r)
        return Hs(e, l, d, i);
      for (const [O, F, nt] of b) {
        const U = x + O, T = A + F;
        if (U < 0 || T < 0 || U >= e.cols || T >= e.rows) continue;
        const Y = T * e.cols + U;
        if (h[Y]) continue;
        const Re = Is(e, U, T), Ie = u[v] && u[v] !== nt ? zs : 0, Nt = (a[v] ?? 1 / 0) + Re + Ie;
        if (Nt < (a[Y] ?? 1 / 0)) {
          a[Y] = Nt, l[Y] = x, d[Y] = A, u[Y] = nt;
          const ze = Nt + me(U, T, o, r);
          f.push({ col: U, row: T, f: ze });
        }
      }
    }
  }
  return null;
}
function me(e, t, i, s) {
  return Math.abs(e - i) + Math.abs(t - s);
}
function Hs(e, t, i, s) {
  const n = [];
  let o = s[0], r = s[1];
  for (; o !== -1 && r !== -1; ) {
    n.push([o, r]);
    const c = r * e.cols + o, a = t[c] ?? -1, l = i[c] ?? -1;
    if (a === o && l === r || (o = a, r = l, o < 0 || r < 0)) break;
  }
  return n.reverse(), n[0]?.[0] === -1 && n.shift(), n;
}
const js = 480, Bs = 270, Ws = 30;
function Vs(e, t, i = js, s = Bs) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const n = Math.min(i / e, s / t, 1);
  return {
    width: Math.max(1, Math.floor(e * n)),
    height: Math.max(1, Math.floor(t * n))
  };
}
function Gs(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 0, o = 0; n < e.length; n += 4, o++) {
    const r = e[n] ?? 0, c = e[n + 1] ?? 0, a = e[n + 2] ?? 0;
    s[o] = 0.2126 * r + 0.7152 * c + 0.0722 * a;
  }
  return s;
}
function qs(e, t, i) {
  const s = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t;
    for (let c = 0; c < t; c++) {
      const a = e[r + Math.max(0, c - 1)] ?? 0, l = e[r + c] ?? 0, d = e[r + Math.min(t - 1, c + 1)] ?? 0;
      s[r + c] = a + 2 * l + d >> 2;
    }
  }
  const n = new Uint8ClampedArray(e.length);
  for (let o = 0; o < i; o++) {
    const r = o * t, c = Math.max(0, o - 1) * t, a = Math.min(i - 1, o + 1) * t;
    for (let l = 0; l < t; l++) {
      const d = s[c + l] ?? 0, u = s[r + l] ?? 0, h = s[a + l] ?? 0;
      n[r + l] = d + 2 * u + h >> 2;
    }
  }
  return n;
}
function Ks(e, t, i) {
  const s = new Uint8ClampedArray(t * i);
  for (let n = 1; n < i - 1; n++) {
    const o = (n - 1) * t, r = n * t, c = (n + 1) * t;
    for (let a = 1; a < t - 1; a++) {
      const l = e[o + (a - 1)] ?? 0, d = e[o + a] ?? 0, u = e[o + (a + 1)] ?? 0, h = e[r + (a - 1)] ?? 0, p = e[r + (a + 1)] ?? 0, f = e[c + (a - 1)] ?? 0, b = e[c + a] ?? 0, m = e[c + (a + 1)] ?? 0, x = -l - 2 * h - f + u + 2 * p + m, A = -l - 2 * d - u + f + 2 * b + m;
      let v = Math.sqrt(x * x + A * A);
      v < Ws && (v = 0), v > 255 && (v = 255), s[r + a] = v;
    }
  }
  return { width: t, height: i, data: s };
}
function Js(e, t, i) {
  const s = Vs(t, i), n = document.createElement("canvas");
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
function Xs(e, t, i) {
  const { width: s, height: n, rgba: o } = Js(e, t, i), r = Gs(o, s, n), c = qs(r, s, n);
  return Ks(c, s, n);
}
function Ys(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const s = e[i - 1], n = e[i], o = e[i + 1], r = n[0] - s[0], c = n[1] - s[1], a = o[0] - n[0], l = o[1] - n[1];
    r * l - c * a === 0 && Math.sign(r) === Math.sign(a) && Math.sign(c) === Math.sign(l) || t.push(n);
  }
  return t.push(e[e.length - 1]), t;
}
const vt = /* @__PURE__ */ new Map();
async function Zs(e, t = {}) {
  const i = performance.now(), s = t.cellSize ?? Te, n = `${e.imageUrl}|${s}`, o = vt.has(n);
  let r = null;
  try {
    r = await Qs(n, e.imageUrl, s);
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
  const c = ye(e.from, r), a = ye(e.to, r), l = Ls(r, c, a);
  return !l || l.length < 2 ? {
    waypoints: [],
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  } : {
    waypoints: Ys(l).slice(1, -1).map((p) => sn(p, r)),
    cached: o,
    edgesUsable: !0,
    elapsedMs: performance.now() - i
  };
}
function Qs(e, t, i) {
  const s = vt.get(e);
  if (s) return s;
  const n = tn(t, i).catch((o) => {
    throw vt.delete(e), o;
  });
  return vt.set(e, n), n;
}
async function tn(e, t) {
  const i = await en(e);
  await be();
  const s = Xs(i, i.naturalWidth, i.naturalHeight);
  return await be(), Ts(s, t);
}
function en(e) {
  return new Promise((t, i) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.decoding = "async", s.onload = () => t(s), s.onerror = () => i(new Error(`Failed to load background image: ${e}`)), s.src = e;
  });
}
function be() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
function ye(e, t) {
  const i = we(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), s = we(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, s];
}
function sn(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function we(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
var nn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, M = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? on(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && nn(t, i, n), n;
};
let $ = class extends L {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.statusMessage = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.stageRef = Ce(), this.undoStack = new ds((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, s = xs(i, t);
      this.pushPatch(i, s, "edit default background");
    }, this.onTransitionChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = Number(t), s = this.config, n = _s(s, Number.isFinite(i) ? i : void 0);
      this.pushPatch(s, n, "edit transition duration");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = As(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = $.KNOWN_WEATHER_STATES.find((n) => !e.has(n)) ?? "custom", i = this.config, s = pe(i, t, "");
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
          const s = this.config, { config: n, node: o } = fs(s, i, "New node");
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
          }, n = this.config, { config: o, overlay: r } = Ss(n, s);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(n, o, `add overlay ${r.id}`), this.pending = null, this.statusMessage = `Added overlay ${r.id}. Drag to reposition, corner to resize.`;
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
      const t = e.currentTarget, i = t.dataset.flowId, s = Number(t.dataset.segmentIndex);
      if (!(!i || !Number.isFinite(s))) {
        if (e.shiftKey) {
          const n = this.pointerToPercent(e);
          if (!n) return;
          const o = this.config, r = bs(o, i, s, n);
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
            const s = window.prompt(
              "Entity for this flow (e.g. sensor.grid_power):",
              "sensor.placeholder_entity"
            ) ?? "sensor.placeholder_entity", n = this.config, { config: o, flow: r } = ws(n, this.pending.fromId, i, s);
            this.pushPatch(n, o, `add flow ${r.id}`), this.pending = null, this.statusMessage = `Added flow ${r.id}.`;
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
      const n = this.config, o = ys(n, i, s);
      this.pushPatch(n, o, `delete waypoint ${s} of ${i}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config) return;
      const t = e.currentTarget, i = t.dataset.waypointIndex, s = t.dataset.flowId, n = t.dataset.nodeId, o = t.dataset.overlayId;
      let r = null;
      n ? r = { kind: "node", id: n } : o && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: o } : s && i !== void 0 && (r = { kind: "waypoint", flowId: s, index: Number(i) }), r && (e.preventDefault(), t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = e.shiftKey, t.kind === "overlay-resize") {
        const n = this.stageRef.value;
        if (!n) return;
        const o = n.getBoundingClientRect();
        if (o.width === 0 || o.height === 0) return;
        const r = (e.clientX - t.startPx.x) / o.width * 100, c = (e.clientY - t.startPx.y) / o.height * 100;
        let a = t.startSize.width + r, l = t.startSize.height + c;
        this.dragShiftHeld && (a = Math.round(a), l = Math.round(l)), this.config = fe(this.config, t.id, { width: a, height: l });
        return;
      }
      const i = this.pointerToPercent(e);
      if (!i) return;
      const s = this.dragShiftHeld ? { x: E(ue(i.x)), y: E(ue(i.y)) } : i;
      t.kind === "node" ? this.config = ps(this.config, t.id, s) : t.kind === "overlay" ? this.config = Ms(this.config, t.id, s) : t.kind === "waypoint" && (this.config = ms(this.config, t.flowId, t.index, s));
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
      this.config = yt(e), this.undoStack.clear(), this.errorMessage = "";
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return w`
        <div class="wrap">
          <p class="hint">No configuration loaded yet. Use "Show code editor" to paste YAML.</p>
          ${this.errorMessage ? w`<pre class="error">${this.errorMessage}</pre>` : y}
        </div>
      `;
    const t = `${1 / (wt(this.config.aspect_ratio) ?? 16 / 10) * 100}%`, i = this.config.background.default;
    return w`
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
        ${this.statusMessage ? w`<div class="status">${this.statusMessage}</div>` : y}
        <div
          class=${`stage ${this.pending?.kind === "add-node" ? "mode-add-node" : this.pending?.kind === "add-overlay" ? "mode-add-overlay" : ""}`}
          style=${`padding-top: ${t};`}
          @click=${this.onStageClick}
          @contextmenu=${this.onStageContextMenu}
          ${Me(this.stageRef)}
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
        </div>
        ${this.renderSuggestBar()}
        ${this.renderInspector()}
        ${this.renderWeatherPanel()}
        ${this.errorMessage ? w`<pre class="error">${this.errorMessage}</pre>` : y}
      </div>
    `;
  }
  // -- rendering helpers --
  renderFlowConnector(e) {
    if (!this.config) return y;
    const t = new Map(this.config.nodes.map((c) => [c.id, c])), i = t.get(e.from_node), s = t.get(e.to_node);
    if (!i || !s) return y;
    const n = [i.position, ...e.waypoints, s.position], o = e.id === this.selectedFlowId, r = [];
    for (let c = 0; c < n.length - 1; c++) {
      const a = n[c], l = n[c + 1];
      !a || !l || r.push(w`
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
    return w`<g>${r}</g>`;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, i) => w`
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
    return w`
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
        ${t ? w`<div
              class="overlay-resize"
              data-overlay-id=${e.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : y}
      </div>
    `;
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
        ${e.label ? w`<span class="handle-label">${e.label}</span>` : y}
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
      const d = (u) => {
        u.stopPropagation(), t((u.detail?.value ?? "").trim());
      };
      return w`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
          .includeDomains=${n}
          @value-changed=${d}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, c = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, a = Object.keys(r).filter((d) => {
      if (n.length === 0) return !0;
      const u = d.split(".")[0];
      return !!u && n.includes(u);
    }).sort();
    return w`
      <input
        type="text"
        list=${c}
        placeholder=${o}
        .value=${e}
        @change=${(d) => {
      t(d.target.value.trim());
    }}
      />
      <datalist id=${c}>
        ${a.map((d) => w`<option value=${d}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return y;
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
            ${this.renderEntityPicker(
        e.entity ?? "",
        (t) => this.setNodeEntity(e.id, t),
        { includeDomains: ["sensor", "binary_sensor", "input_number", "number"] }
      )}
          </label>
          <button class="danger" @click=${() => this.removeNode(e.id)}>Delete node</button>
        </div>
      ` : y;
    }
    if (this.selectedFlowId) {
      const e = this.config.flows.find((t) => t.id === this.selectedFlowId);
      return e ? w`
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
          <button class="danger" @click=${() => this.removeFlow(e.id)}>Delete flow</button>
        </div>
      ` : y;
    }
    if (this.selectedOverlayId) {
      const e = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return e ? this.renderOverlayInspector(e) : y;
    }
    return y;
  }
  renderOverlayInspector(e) {
    const t = e.size ?? { width: 20, height: 15 }, i = e.visible !== !1, s = e.opacity ?? 1;
    return w`
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
      const o = n.target.checked, r = this.config, c = Es(r, e.id, o);
      this.pushPatch(r, c, `toggle overlay ${e.id} visible`);
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
      const r = this.config, c = Ns(r, e.id, o);
      this.pushPatch(r, c, `edit overlay ${e.id} opacity`);
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
    return w`
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
      ${this.customConfigError ? w`<div class="custom-config-error">${this.customConfigError}</div>` : y}
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
  renderWeatherPanel() {
    if (!this.config) return y;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {});
    return w`
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
            ${e.default ? w`<img class="weather-thumb" src=${e.default} alt="default background" />` : y}
          </label>
          <label>
            Weather entity (optional)
            ${this.renderEntityPicker(
      e.weather_entity ?? "",
      (i) => this.setWeatherEntityValue(i),
      { includeDomains: ["weather"], placeholder: "weather.forecast_home" }
    )}
          </label>
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
      ([i, s]) => w`
                <div class="weather-row" data-key=${i}>
                  <input
                    type="text"
                    list="flowme-weather-states"
                    .value=${i}
                    @change=${(n) => this.onWeatherStateKeyChange(i, n)}
                  />
                  <input
                    type="text"
                    .value=${s}
                    @change=${(n) => this.onWeatherStateUrlChange(i, n)}
                    placeholder="/local/flowme/rainy.jpg"
                  />
                  <div class="weather-row-end">
                    ${s ? w`<img class="weather-thumb" src=${s} alt=${i} />` : y}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(i)}>
                      Remove
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${$.KNOWN_WEATHER_STATES.map(
      (i) => w`<option value=${i}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>+ Add weather state</button>
          </div>
        </div>
      </details>
    `;
  }
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), i = this.config, s = $s(i, t || void 0);
    this.pushPatch(i, s, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const s = this.config, n = Os(s, e, i);
    n !== s && this.pushPatch(s, n, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, s = this.config, n = pe(s, e, i);
    this.pushPatch(s, n, `edit weather image ${e}`);
  }
  // -- suggest path --
  async runSuggestPath() {
    if (!this.config || !this.selectedFlowId) {
      this.statusMessage = "Select a flow first — then use Suggest path.";
      return;
    }
    const e = this.config.flows.find((s) => s.id === this.selectedFlowId);
    if (!e) return;
    const t = this.config.nodes.find((s) => s.id === e.from_node), i = this.config.nodes.find((s) => s.id === e.to_node);
    if (!t || !i) {
      this.statusMessage = "Flow is missing a source or destination node.";
      return;
    }
    this.suggestBusy = !0, this.statusMessage = "Analysing background…";
    try {
      const s = await Zs({
        imageUrl: this.config.background.default,
        from: t.position,
        to: i.position
      });
      if (!s.edgesUsable) {
        this.statusMessage = "Could not analyse the background image (likely a CORS issue). Serve it from the same origin as Home Assistant and try again.", this.suggestPreview = null;
        return;
      }
      if (s.waypoints.length === 0) {
        this.statusMessage = "No waypoints suggested — a straight line already follows the strongest path.", this.suggestPreview = null;
        return;
      }
      this.suggestPreview = {
        flowId: e.id,
        waypoints: s.waypoints,
        edgesUsable: s.edgesUsable,
        elapsedMs: s.elapsedMs
      }, this.statusMessage = `Preview: ${s.waypoints.length} waypoint(s) in ${Math.round(
        s.elapsedMs
      )} ms. Accept to apply.`;
    } catch (s) {
      this.statusMessage = "Auto-route failed: " + (s instanceof Error ? s.message : String(s)), this.suggestPreview = null;
    } finally {
      this.suggestBusy = !1;
    }
  }
  acceptSuggestion() {
    if (!this.config || !this.suggestPreview) return;
    const { flowId: e, waypoints: t } = this.suggestPreview, i = this.config, s = {
      ...i,
      flows: i.flows.map(
        (n) => n.id === e ? { ...n, waypoints: t.map((o) => ({ x: o.x, y: o.y })) } : n
      )
    };
    this.suggestPreview = null, this.statusMessage = "Applied suggested waypoints.", this.pushPatch(i, s, `auto-route ${e}`);
  }
  cancelSuggestion() {
    this.suggestPreview = null, this.statusMessage = "Suggestion dismissed.";
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return y;
    const e = this.config.flows.find((o) => o.id === this.suggestPreview.flowId);
    if (!e) return y;
    const t = this.config.nodes.find((o) => o.id === e.from_node), i = this.config.nodes.find((o) => o.id === e.to_node);
    if (!t || !i) return y;
    const n = [
      t.position,
      ...this.suggestPreview.waypoints,
      i.position
    ].map((o) => `${o.x.toFixed(2)},${o.y.toFixed(2)}`).join(" ");
    return w`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${n} />
      </svg>
      ${this.suggestPreview.waypoints.map(
      (o) => w`
          <div class="suggest-marker" style=${`left: ${o.x}%; top: ${o.y}%;`}></div>
        `
    )}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? w`
      <div class="suggest-bar">
        <span>Preview — ${this.suggestPreview.waypoints.length} waypoint(s)</span>
        <button @click=${this.acceptSuggestion}>Accept</button>
        <button class="ghost" @click=${this.cancelSuggestion}>Cancel</button>
      </div>
    ` : y;
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
    const s = (this.config.overlays ?? []).find((a) => a.id === e);
    if (!s) return;
    const n = s.size ?? { width: 20, height: 15 }, o = Number(i.target.value);
    if (!Number.isFinite(o) || o <= 0) return;
    const r = this.config, c = fe(r, e, { ...n, [t]: o });
    this.pushPatch(r, c, `resize overlay ${e}`);
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
      const n = Ps(s, e, i), o = yt(n);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: s, next: o, description: `edit overlay ${e} card config` }), this.commitToHa(o);
    } catch (n) {
      this.customConfigError = n instanceof Error ? n.message : String(n);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = Cs(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = gs(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = vs(t, e);
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
      const s = yt(t);
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
$.KNOWN_WEATHER_STATES = [
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
$.styles = Ct`
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
M([
  N({ attribute: !1 })
], $.prototype, "hass", 2);
M([
  _()
], $.prototype, "config", 2);
M([
  _()
], $.prototype, "pending", 2);
M([
  _()
], $.prototype, "previewMode", 2);
M([
  _()
], $.prototype, "selectedNodeId", 2);
M([
  _()
], $.prototype, "selectedFlowId", 2);
M([
  _()
], $.prototype, "selectedOverlayId", 2);
M([
  _()
], $.prototype, "customConfigDraft", 2);
M([
  _()
], $.prototype, "customConfigError", 2);
M([
  _()
], $.prototype, "statusMessage", 2);
M([
  _()
], $.prototype, "errorMessage", 2);
M([
  _()
], $.prototype, "canUndo", 2);
M([
  _()
], $.prototype, "canRedo", 2);
M([
  _()
], $.prototype, "undoLabel", 2);
M([
  _()
], $.prototype, "redoLabel", 2);
M([
  _()
], $.prototype, "suggestPreview", 2);
M([
  _()
], $.prototype, "suggestBusy", 2);
$ = M([
  Pt("flowme-card-editor")
], $);
var rn = Object.defineProperty, an = Object.getOwnPropertyDescriptor, X = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? an(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && rn(t, i, n), n;
};
const cn = "1.0.9", ve = 2e3;
console.info(
  `%c flowme %c v${cn} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
let I = class extends L {
  constructor() {
    super(...arguments), this.renderer = null, this.rendererMount = Ce(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set();
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e) {
      const i = this.config, s = [
        ...i?.flows.map((o) => o.entity) ?? [],
        ...i?.nodes.map((o) => o.entity).filter(Boolean) ?? [],
        i?.background.weather_entity
      ].filter((o) => typeof o == "string" && o.length > 0), n = {};
      for (const o of s)
        n[o] = e.states[o]?.state;
      C("hass setter called. config entity states:", n);
    } else
      C("hass setter called with undefined");
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    try {
      const t = yt(e);
      Ri(t.debug ?? !1), C("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), C("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof Bt ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), C("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    C("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), C("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), super.disconnectedCallback();
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = ts(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(t, i).catch((s) => {
        C("renderer init failed — falling back to SVG renderer", s), this.teardownRenderer(), this.renderer = new Tt(), this.rendererReadyFor = i, this.renderer.init(t, i).catch((n) => {
          console.error("[flowme] SVG renderer init also failed", n);
        });
      });
    }
    if (e.has("hass") && this.renderer && this.hass) {
      C("willUpdate hass-changed → pushing values for", this.config.flows.length, "flow(s) to renderer", this.renderer.constructor.name);
      for (const i of this.config.flows) {
        const s = this.hass.states[i.entity], n = re(s?.state), o = dt(i.domain ?? this.config.domain), r = s?.attributes?.unit_of_measurement, c = Ci(n, r, o.unit_scale);
        if (C(
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
          c.matchedUnit ?? "(none → passthrough)",
          "factor=",
          c.factor,
          "scaledToBase(" + o.unit_label + ")=",
          c.value
        ), s) {
          if (s.state === "unavailable" || s.state === "unknown") {
            const a = `${i.id}:${i.entity}:unavailable`;
            this.warnedMissing.has(a) || (this.warnedMissing.add(a), C(`flow "${i.id}" entity "${i.entity}" is currently ${s.state} — no flow will render until it reports a number`));
          }
        } else {
          const a = `${i.id}:${i.entity}`;
          this.warnedMissing.has(a) || (this.warnedMissing.add(a), C(`flow "${i.id}" references entity "${i.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        this.renderer.updateFlow(i.id, c.value);
      }
    }
    (e.has("config") || e.has("hass")) && this.syncWeatherBackground();
  }
  getCardSize() {
    const e = wt(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = wt(this.config?.aspect_ratio) ?? 1.6;
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
    const i = `${1 / (wt(e.aspect_ratio) ?? 16 / 10) * 100}%`, s = e.background.transition_duration ?? ve;
    return w`
      <ha-card>
        <div
          class="stage"
          style=${`padding-top: ${i};`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerA, s)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${this.buildLayerStyle(this.bgLayerB, s)}
          ></div>
          <div class="renderer-mount" ${Me(this.rendererMount)}></div>
          ${e.nodes.map((n) => this.renderNodeHandle(n))}
          ${(e.overlays ?? []).map((n) => (C("rendering overlay →", n.type, "position=", n.position, "size=", n.size), ns(n, this.hass)))}
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
    const t = this.config.background.transition_duration ?? ve;
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, s = e.show_label !== !1 && !!e.label, n = dt(this.config?.domain), o = e.color ?? this.nodeFlowColor(e.id) ?? n.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let c = "";
    if (t) {
      const a = re(t.state), l = t.attributes?.unit_of_measurement ?? "";
      l ? c = `${this.formatSensorNumber(a)} ${l}` : c = n.describe(a);
    }
    return w`
      <div
        class="node"
        data-node-id=${e.id}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; --flowme-dot-size: ${r}px;`}
      >
        <span
          class="node-dot"
          style=${`background: ${o}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${s ? w`<span class="node-label">${e.label}</span>` : null}
        ${i ? w`<span class="node-value">${c}</span>` : null}
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
      const r = dt(o.domain ?? t), c = St(o, r, o.domain ?? t, 1, i), a = c.toLowerCase();
      n.has(a) || (n.add(a), s || (s = c));
    }
    if (n.size !== 0)
      return n.size === 1 ? s : Fi;
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
I.styles = Ct`
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
    .overlay-switch {
      /* 44 px is the iOS HIG / WCAG minimum touch target. Percentage
         sizes still scale the overlay visually, but we never let the
         actual clickable box shrink below 44×44. */
      min-width: 44px;
      min-height: 44px;
    }
    .switch-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      width: 100%;
      height: 100%;
    }
    .switch-body.is-on {
      box-shadow: inset 0 0 0 1px rgba(74, 222, 128, 0.6);
    }
    .switch-body.is-off {
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.5);
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
      color: rgba(255, 255, 255, 0.55);
    }
    .camera-icon {
      width: 40%;
      max-width: 48px;
      max-height: 48px;
      opacity: 0.9;
    }
    .overlay-camera {
      padding: 2px;
      background: rgba(8, 8, 8, 0.75);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
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
X([
  N({ attribute: !1 })
], I.prototype, "hass", 1);
X([
  _()
], I.prototype, "config", 2);
X([
  _()
], I.prototype, "errorMessage", 2);
X([
  _()
], I.prototype, "bgLayerA", 2);
X([
  _()
], I.prototype, "bgLayerB", 2);
X([
  _()
], I.prototype, "activeLayer", 2);
I = X([
  Pt("flowme-card")
], I);
const zt = window;
zt.customCards = zt.customCards ?? [];
zt.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: "Animated flow visualisation over a custom background image",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  I as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
