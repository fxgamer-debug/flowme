/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = globalThis, ce = At.ShadowRoot && (At.ShadyCSS === void 0 || At.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), $e = /* @__PURE__ */ new WeakMap();
let pi = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (ce && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = $e.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && $e.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Fi = (e) => new pi(typeof e == "string" ? e : e + "", void 0, de), pe = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new pi(i, e, de);
}, Ni = (e, t) => {
  if (ce) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = At.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, _e = ce ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Fi(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ei, defineProperty: Oi, getOwnPropertyDescriptor: Ii, getOwnPropertyNames: Ti, getOwnPropertySymbols: zi, getPrototypeOf: Ri } = Object, j = globalThis, ke = j.trustedTypes, Di = ke ? ke.emptyScript : "", Bi = j.reactiveElementPolyfillSupport, ht = (e, t) => e, Mt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Di : null;
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
} }, ue = (e, t) => !Ei(e, t), Se = { attribute: !0, type: String, converter: Mt, reflect: !1, useDefault: !1, hasChanged: ue };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), j.litPropertyMetadata ?? (j.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let nt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Se) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Oi(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = Ii(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const l = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ht("elementProperties"))) return;
    const t = Ri(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ht("properties"))) {
      const i = this.properties, n = [...Ti(i), ...zi(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift(_e(o));
    } else t !== void 0 && i.push(_e(t));
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
    return Ni(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Mt).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Mt;
      this._$Em = o;
      const l = r.fromAttribute(i, s.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? ue)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: s }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: r } = s, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
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
nt.elementStyles = [], nt.shadowRootOptions = { mode: "open" }, nt[ht("elementProperties")] = /* @__PURE__ */ new Map(), nt[ht("finalized")] = /* @__PURE__ */ new Map(), Bi?.({ ReactiveElement: nt }), (j.reactiveElementVersions ?? (j.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis, Ae = (e) => e, Ft = ft.trustedTypes, Ce = Ft ? Ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ui = "$lit$", W = `lit$${Math.random().toFixed(9).slice(2)}$`, hi = "?" + W, Li = `<${hi}>`, Z = document, bt = () => Z.createComment(""), yt = (e) => e === null || typeof e != "object" && typeof e != "function", he = Array.isArray, Hi = (e) => he(e) || typeof e?.[Symbol.iterator] == "function", Bt = `[ 	
\f\r]`, ct = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pe = /-->/g, Me = />/g, q = RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Fe = /'/g, Ne = /"/g, fi = /^(?:script|style|textarea|title)$/i, gi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), y = gi(1), Ee = gi(2), ot = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Oe = /* @__PURE__ */ new WeakMap(), X = Z.createTreeWalker(Z, 129);
function mi(e, t) {
  if (!he(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ce !== void 0 ? Ce.createHTML(t) : t;
}
const Ui = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ct;
  for (let l = 0; l < i; l++) {
    const c = e[l];
    let p, d, u = -1, h = 0;
    for (; h < c.length && (r.lastIndex = h, d = r.exec(c), d !== null); ) h = r.lastIndex, r === ct ? d[1] === "!--" ? r = Pe : d[1] !== void 0 ? r = Me : d[2] !== void 0 ? (fi.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = q) : d[3] !== void 0 && (r = q) : r === q ? d[0] === ">" ? (r = o ?? ct, u = -1) : d[1] === void 0 ? u = -2 : (u = r.lastIndex - d[2].length, p = d[1], r = d[3] === void 0 ? q : d[3] === '"' ? Ne : Fe) : r === Ne || r === Fe ? r = q : r === Pe || r === Me ? r = ct : (r = q, o = void 0);
    const f = r === q && e[l + 1].startsWith("/>") ? " " : "";
    s += r === ct ? c + Li : u >= 0 ? (n.push(p), c.slice(0, u) + ui + c.slice(u) + W + f) : c + W + (u === -2 ? l : f);
  }
  return [mi(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class vt {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const l = t.length - 1, c = this.parts, [p, d] = Ui(t, i);
    if (this.el = vt.createElement(p, n), X.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = X.nextNode()) !== null && c.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(ui)) {
          const h = d[r++], f = o.getAttribute(u).split(W), g = /([.?@])?(.*)/.exec(h);
          c.push({ type: 1, index: s, name: g[2], strings: f, ctor: g[1] === "." ? ji : g[1] === "?" ? Vi : g[1] === "@" ? Gi : Tt }), o.removeAttribute(u);
        } else u.startsWith(W) && (c.push({ type: 6, index: s }), o.removeAttribute(u));
        if (fi.test(o.tagName)) {
          const u = o.textContent.split(W), h = u.length - 1;
          if (h > 0) {
            o.textContent = Ft ? Ft.emptyScript : "";
            for (let f = 0; f < h; f++) o.append(u[f], bt()), X.nextNode(), c.push({ type: 2, index: ++s });
            o.append(u[h], bt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === hi) c.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(W, u + 1)) !== -1; ) c.push({ type: 7, index: s }), u += W.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Z.createElement("template");
    return n.innerHTML = t, n;
  }
}
function st(e, t, i = e, n) {
  if (t === ot) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = yt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (t = st(e, o._$AS(e, t.values), o, n)), t;
}
class Wi {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Z).importNode(i, !0);
    X.currentNode = o;
    let s = X.nextNode(), r = 0, l = 0, c = n[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let p;
        c.type === 2 ? p = new xt(s, s.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (p = new qi(s, this, t)), this._$AV.push(p), c = n[++l];
      }
      r !== c?.index && (s = X.nextNode(), r++);
    }
    return X.currentNode = Z, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class xt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = st(this, t, i), yt(t) ? t === x || t == null || t === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Hi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== x && yt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = vt.createElement(mi(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new Wi(o, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Oe.get(t.strings);
    return i === void 0 && Oe.set(t.strings, i = new vt(t)), i;
  }
  k(t) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new xt(this.O(bt()), this.O(bt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ae(t).nextSibling;
      Ae(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = x;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = st(this, t, i, 0), r = !yt(t) || t !== this._$AH && t !== ot, r && (this._$AH = t);
    else {
      const l = t;
      let c, p;
      for (t = s[0], c = 0; c < s.length - 1; c++) p = st(this, l[n + c], i, c), p === ot && (p = this._$AH[c]), r || (r = !yt(p) || p !== this._$AH[c]), p === x ? t = x : t !== x && (t += (p ?? "") + s[c + 1]), this._$AH[c] = p;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ji extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === x ? void 0 : t;
  }
}
class Vi extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== x);
  }
}
class Gi extends Tt {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = st(this, t, i, 0) ?? x) === ot) return;
    const n = this._$AH, o = t === x && n !== x || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== x && (n === x || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qi {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    st(this, t);
  }
}
const Yi = ft.litHtmlPolyfillSupport;
Yi?.(vt, xt), (ft.litHtmlVersions ?? (ft.litHtmlVersions = [])).push("3.3.2");
const Xi = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new xt(t.insertBefore(bt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis;
let K = class extends nt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xi(i, this.renderRoot, this.renderOptions);
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
K._$litElement$ = !0, K.finalized = !0, gt.litElementHydrateSupport?.({ LitElement: K });
const Ki = gt.litElementPolyfillSupport;
Ki?.({ LitElement: K });
(gt.litElementVersions ?? (gt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zi = { attribute: !0, type: String, converter: Mt, reflect: !1, hasChanged: ue }, Ji = (e = Zi, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const c = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, c, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(l) {
      const c = this[r];
      t.call(this, l), this.requestUpdate(r, c, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function $t(e) {
  return (t, i) => typeof i == "object" ? Ji(e, t, i) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(e) {
  return $t({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qi = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tn = { CHILD: 2 }, en = (e) => (...t) => ({ _$litDirective$: e, values: t });
class nn {
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
const mt = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const n of i) n._$AO?.(t, !1), mt(n, t);
  return !0;
}, Nt = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, bi = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), rn(t);
  }
};
function on(e) {
  this._$AN !== void 0 ? (Nt(this), this._$AM = e, bi(this)) : this._$AM = e;
}
function sn(e, t = !1, i = 0) {
  const n = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (t) if (Array.isArray(n)) for (let s = i; s < n.length; s++) mt(n[s], !1), Nt(n[s]);
  else n != null && (mt(n, !1), Nt(n));
  else mt(this, e);
}
const rn = (e) => {
  e.type == tn.CHILD && (e._$AP ?? (e._$AP = sn), e._$AQ ?? (e._$AQ = on));
};
class an extends nn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, n) {
    super._$AT(t, i, n), bi(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (mt(this, t), Nt(this));
  }
  setValue(t) {
    if (Qi(this._$Ct)) this._$Ct._$AI(t, this);
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
const Zt = () => new ln();
class ln {
}
const Lt = /* @__PURE__ */ new WeakMap(), Jt = en(class extends an {
  render(e) {
    return x;
  }
  update(e, [t]) {
    const i = t !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), x;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let i = Lt.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Lt.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? Lt.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Et = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
], Qt = ["corner", "diagonal", "curve", "smooth"], te = [
  "dots",
  "dash",
  "pulse",
  "arrow",
  "trail",
  "fluid",
  "spark",
  "none"
], ee = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], ie = ["auto", "forward", "reverse", "both"], ne = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], cn = {
  card: {
    connectionLost: "Connection lost",
    actionFailed: "Action failed — please retry",
    loading: "Loading...",
    invalidConfigurationTitle: "flowme: invalid configuration",
    noConnection: "no connection",
    entityNotFound: "entity not found",
    error: "Error",
    hacsDescription: "Animated flow visualisation over a custom background image"
  },
  security: {
    unsafeUrlInCard: (e, t) => `Unsafe URL scheme '${e}' in ${t}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.`
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
      undoTitleWithDesc: (e) => `Undo: ${e} (Ctrl+Z)`,
      undoTitlePlain: "Undo (Ctrl+Z)",
      redoTitleWithDesc: (e) => `Redo: ${e} (Ctrl+Shift+Z)`,
      redoTitlePlain: "Redo (Ctrl+Shift+Z)",
      overlayOption: (e, t) => `Overlay ${e + 1}${t}`,
      overlayOptionIdPart: (e) => ` (${e})`
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
    standaloneToolbar: {
      addNodeTitle: "Add node",
      addFlowTitle: "Add flow",
      addOverlayTitle: "Add overlay",
      suggestDisabled: "Shift+click exactly two nodes to suggest a path between them",
      suggestEnabled: "Create a new flow with auto-routed waypoints between the two selected nodes",
      undoTitleWithDesc: (e) => `Undo: ${e}`,
      undoTitlePlain: "Undo (⌘Z)",
      redoTitleWithDesc: (e) => `Redo: ${e}`,
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
      waypointCount: (e) => String(e),
      addWaypoint: "+ Add waypoint",
      deleteWaypoint: "Delete waypoint",
      deleteWaypointAria: (e) => `Delete waypoint ${e + 1}`,
      addWaypointOnFlowAria: "Add waypoint on flow",
      speedCurve: "Speed curve",
      speedCurveOverrideSummary: "Speed curve override",
      resetToDefaults: "Reset to defaults",
      resetToDomainDefaults: "Reset to domain defaults",
      valueGradient: "Value gradient",
      enableGradient: "Enable value gradient",
      removeGradient: "Remove gradient",
      particleSpacing: "Particle spacing",
      cardConfig: "Card configuration (any HA card YAML)",
      invalidYaml: "Invalid YAML",
      invalidCardJson: (e) => `Invalid JSON: ${e}`,
      width: "Width %",
      height: "Height %",
      nodeHeading: (e) => `Node: ${e}`,
      flowHeading: (e) => `Flow: ${e}`,
      overlayHeading: (e) => `Overlay: ${e}`,
      routeAndSensor: "Route and sensor",
      colourOverride: "Colour override",
      colourOverrideActive: "override",
      colourDomainDefault: "domain default",
      clearColour: "Clear",
      flowOpacity: "Flow opacity",
      shown: "shown",
      hidden: "hidden",
      flowVisible: "Visible",
      speedCurveHint: (e, t) => `Leave blank to use domain profile defaults. Domain: ${e} (${t})`,
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
      colourDefaultSuffix: (e) => `${e} (default)`,
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
      multiselectCount: (e) => `${e} nodes selected`,
      suggestPathBetweenAria: "Suggest path between two selected nodes",
      suggestPathBetweenTitle: "Suggest path between selected nodes",
      suggestPathPickTwoTitle: "Select exactly 2 nodes to suggest a path",
      deleteNodesConfirm: (e) => `Delete ${e} nodes (and their flows)?`,
      deleteOverlayConfirm: (e) => `Delete overlay ${e}?`,
      deleteNodeContextConfirm: (e) => `Delete node ${e}? This also removes any flows using it.`,
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
      suggestAutoRouteFailed: (e) => `Auto-route failed: ${e}`,
      flowEntityPrompt: "Entity for this flow (e.g. sensor.grid_power):",
      flowEntityDefault: "sensor.placeholder_entity",
      suggestPreviewWaypoints: (e) => `Preview — ${e} waypoint(s)`,
      accept: "Accept",
      newNodeDefaultLabel: "New node",
      entityPickerFallbackPlaceholder: "entity.id",
      showNode: "Show node",
      hideNode: "Hide node"
    },
    stateA: {
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
      noNodeSelected: "Select a node to edit"
    }
  },
  aria: {
    card: "FlowMe energy flow visualisation",
    nodeHandle: (e, t, i) => `Node ${e} at ${t.toFixed(1)}%, ${i.toFixed(1)}%`,
    waypointHandle: (e, t) => `Waypoint ${e + 1} of flow ${t}`,
    flowGroup: (e, t) => `${e}: ${t}`,
    overlayHandle: (e) => `Overlay ${e}`,
    readingWithTitle: (e, t) => `${e}: ${t}`
  },
  validation: {
    configMustBeObject: "config must be an object",
    mustBeObjectWithXY: "must be an object with x and y",
    mustBeFiniteNumber: "must be a finite number",
    percentRange: (e) => `must be in range 0-100, got ${e}`,
    mustBeNonEmptyString: "must be a non-empty string",
    urlMustStartWith: (e, t) => `must start with one of ${e} (got "${t}")`,
    mustBeObject: "must be an object",
    mustBeNonEmptyId: "must be a non-empty string",
    duplicateNodeId: (e) => `duplicate node id "${e}"`,
    duplicateFlowId: (e) => `duplicate flow id "${e}"`,
    unknownNodeRef: (e) => `references unknown node "${e}"`,
    mustBeNonEmptyEntityId: "must be a non-empty entity id",
    waypointsMustBeArray: "must be an array (may be empty or omitted)",
    mustBeOneOf: (e) => `must be one of ${e}`,
    speedMultiplierRange: "must be between 0.1 and 5.0",
    mustBeBoolean: "must be a boolean",
    positiveFinite: "must be a positive finite number",
    durationMin50: "must be a finite number ≥ 50 (milliseconds)",
    minLtMaxDuration: "min_duration must be < max_duration",
    unknownKey: (e) => `unknown key (allowed: ${e})`,
    defaultsMustBeObject: "must be an object",
    burstTriggerMax1: "must be ≤ 1 (it is a fraction of peak)",
    opacity01: "must be a number between 0 and 1",
    opacityRootMustBeObject: "must be an object",
    mustBeSvgPathString: "must be a string (SVG path d= attribute)",
    mustBeAtMost: (e) => `must be ≤ ${e}`,
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
    typeMustBeFlowme: (e) => `must equal "custom:flowme-card" (got "${e}")`,
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
    duplicateOverlayId: (e) => `duplicate overlay id "${e}"`,
    overlayCardMustBeObject: 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })',
    unsafeSchemeInCard: (e) => `unsafe URL scheme "${e}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`,
    overlaySizeMustBeObject: "must be an object with width and height",
    overlayWidthPercent: "must be a positive number ≤ 100 (percent of card)",
    overlayHeightPercent: "must be a positive number ≤ 100 (percent of card)",
    overlayOpacity01: "must be a number between 0 and 1",
    migrationOverlayWarning: (e) => `type: ${e} was removed in v1.0.9. Replace with type: custom and a card: block. See documentation.`
  }
};
let yi = {};
function Ht(e) {
  yi = e;
}
function vi(e) {
  const i = (e ?? "en").split("-")[0].toLowerCase();
  if (i === "en") {
    Ht({});
    return;
  }
  const n = `/local/flowme/translations/${i}.json`;
  fetch(n).then((o) => o.ok ? o.json() : null).then((o) => {
    o && typeof o == "object" && Ht(o);
  }).catch(() => {
    Ht({});
  });
}
function a(e, ...t) {
  const i = e.split(".");
  let n = yi;
  for (const o of i)
    if (n && typeof n == "object")
      n = n[o];
    else {
      n = void 0;
      break;
    }
  if (n === void 0) {
    n = cn;
    for (const o of i)
      if (n && typeof n == "object")
        n = n[o];
      else {
        n = void 0;
        break;
      }
  }
  return String(typeof n == "function" ? n(...t) : n ?? e);
}
const dn = ["javascript:", "vbscript:", "data:", "file:"];
function wi(e, t = "card_config") {
  const i = [], n = /* @__PURE__ */ new WeakSet(), o = (s, r) => {
    if (s != null) {
      if (typeof s == "string") {
        const l = s.trim().toLowerCase();
        for (const c of dn)
          if (l.startsWith(c)) {
            i.push({ path: r, value: s, scheme: c });
            return;
          }
        return;
      }
      if (typeof s == "object" && !n.has(s)) {
        if (n.add(s), Array.isArray(s)) {
          for (let l = 0; l < s.length; l++) o(s[l], `${r}[${l}]`);
          return;
        }
        for (const [l, c] of Object.entries(s))
          o(c, `${r}.${l}`);
      }
    }
  };
  return o(e, t), i;
}
function pn(e, t = "card_config") {
  const i = wi(e, t);
  if (i.length === 0) return;
  const n = i[0];
  throw new Error(a("security.unsafeUrlInCard", n.scheme, n.path));
}
class ge extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Ie = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function w(e, t) {
  throw new ge(`${e}: ${t}`);
}
function me(e, t) {
  (!e || typeof e != "object") && w(t, a("validation.mustBeObjectWithXY"));
  const i = e, n = i.x, o = i.y;
  (typeof n != "number" || !Number.isFinite(n)) && w(`${t}.x`, a("validation.mustBeFiniteNumber")), (typeof o != "number" || !Number.isFinite(o)) && w(`${t}.y`, a("validation.mustBeFiniteNumber"));
  const s = n, r = o;
  return (s < 0 || s > 100) && w(`${t}.x`, a("validation.percentRange", s)), (r < 0 || r > 100) && w(`${t}.y`, a("validation.percentRange", r)), { x: s, y: r };
}
function Te(e, t) {
  (typeof e != "string" || !e.length) && w(t, a("validation.mustBeNonEmptyString"));
  const i = e;
  return Ie.some((o) => i.startsWith(o)) || w(t, a("validation.urlMustStartWith", Ie.join(", "), i.slice(0, 40))), i;
}
function un(e, t, i) {
  const n = `nodes[${t}]`;
  (!e || typeof e != "object") && w(n, a("validation.mustBeObject"));
  const o = e, s = o.id;
  (typeof s != "string" || !s.length) && w(`${n}.id`, a("validation.mustBeNonEmptyId"));
  const r = s;
  i.has(r) && w(`${n}.id`, a("validation.duplicateNodeId", r)), i.add(r);
  const l = me(o.position, `${n}.position`), c = { id: r, position: l };
  return typeof o.entity == "string" && (c.entity = o.entity), typeof o.label == "string" && (c.label = o.label), typeof o.color == "string" && (c.color = o.color), typeof o.size == "number" && (c.size = o.size), typeof o.show_label == "boolean" && (c.show_label = o.show_label), typeof o.show_value == "boolean" && (c.show_value = o.show_value), o.opacity !== void 0 && (c.opacity = be(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, a("validation.mustBeBoolean")), c.visible = o.visible), c;
}
function hn(e, t, i, n) {
  const o = `flows[${t}]`;
  (!e || typeof e != "object") && w(o, a("validation.mustBeObject"));
  const s = e, r = s.id;
  (typeof r != "string" || !r.length) && w(`${o}.id`, a("validation.mustBeNonEmptyId"));
  const l = r;
  i.has(l) && w(`${o}.id`, a("validation.duplicateFlowId", l)), i.add(l);
  const c = s.from_node;
  (typeof c != "string" || !n.has(c)) && w(`${o}.from_node`, a("validation.unknownNodeRef", String(c)));
  const p = s.to_node;
  (typeof p != "string" || !n.has(p)) && w(`${o}.to_node`, a("validation.unknownNodeRef", String(p)));
  const d = s.entity;
  (typeof d != "string" || !d.length) && w(`${o}.entity`, a("validation.mustBeNonEmptyEntityId"));
  const u = s.waypoints;
  let h = [];
  u !== void 0 && (Array.isArray(u) || w(`${o}.waypoints`, a("validation.waypointsMustBeArray")), h = u.map(
    (g, v) => me(g, `${o}.waypoints[${v}]`)
  ));
  const f = {
    id: l,
    from_node: c,
    to_node: p,
    entity: d,
    waypoints: h
  };
  if (typeof s.domain == "string" && (Et.includes(s.domain) || w(`${o}.domain`, a("validation.mustBeOneOf", Et.join(", "))), f.domain = s.domain), typeof s.color == "string" && (f.color = s.color), typeof s.color_positive == "string" && (f.color_positive = s.color_positive), typeof s.color_negative == "string" && (f.color_negative = s.color_negative), typeof s.threshold == "number" && (f.threshold = s.threshold), typeof s.reverse == "boolean" && (f.reverse = s.reverse), typeof s.speed_multiplier == "number") {
    const g = s.speed_multiplier;
    (g < 0.1 || g > 5) && w(`${o}.speed_multiplier`, a("validation.speedMultiplierRange")), f.speed_multiplier = g;
  }
  return s.opacity !== void 0 && (f.opacity = be(s.opacity, `${o}.opacity`)), s.visible !== void 0 && (typeof s.visible != "boolean" && w(`${o}.visible`, a("validation.mustBeBoolean")), f.visible = s.visible), s.line_style !== void 0 && (Qt.includes(s.line_style) || w(`${o}.line_style`, a("validation.mustBeOneOf", Qt.join(", "))), f.line_style = s.line_style), s.speed_curve_override !== void 0 && (f.speed_curve_override = fn(
    s.speed_curve_override,
    `${o}.speed_curve_override`
  )), s.animation !== void 0 && (f.animation = bn(s.animation, `${o}.animation`)), s.value_gradient !== void 0 && (f.value_gradient = yn(s.value_gradient, `${o}.value_gradient`)), f;
}
function fn(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && w(t, a("validation.mustBeObject"));
  const i = e, n = {};
  function o(h) {
    const f = i[h];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f <= 0) && w(`${t}.${h}`, a("validation.positiveFinite")), f;
  }
  function s(h) {
    const f = i[h];
    if (f !== void 0)
      return (typeof f != "number" || !Number.isFinite(f) || f < 50) && w(`${t}.${h}`, a("validation.durationMin50")), f;
  }
  const r = o("threshold");
  r !== void 0 && (n.threshold = r);
  const l = o("p50");
  l !== void 0 && (n.p50 = l);
  const c = o("peak");
  c !== void 0 && (n.peak = c);
  const p = s("max_duration");
  p !== void 0 && (n.max_duration = p);
  const d = s("min_duration");
  if (d !== void 0 && (n.min_duration = d), i.steepness !== void 0) {
    const h = i.steepness;
    (typeof h != "number" || !Number.isFinite(h) || h <= 0) && w(`${t}.steepness`, a("validation.positiveFinite")), n.steepness = h;
  }
  n.max_duration !== void 0 && n.min_duration !== void 0 && n.min_duration >= n.max_duration && w(t, a("validation.minLtMaxDuration"));
  const u = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const h of Object.keys(i))
    u.has(h) || w(`${t}.${h}`, a("validation.unknownKey", [...u].join(", ")));
  return n;
}
function et(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e <= 0) && w(t, a("validation.positiveFinite")), e;
}
function gn(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("defaults", a("validation.defaultsMustBeObject"));
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = et(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const n = et(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    n > 1 && w("defaults.burst_trigger_ratio", a("validation.burstTriggerMax1")), i.burst_trigger_ratio = n;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = et(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = et(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = et(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = et(t.line_width, "defaults.line_width")), i;
}
function be(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 1) && w(t, a("validation.opacity01")), e;
}
function mn(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("opacity", a("validation.mustBeObject"));
  const t = e, i = {};
  for (const n of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[n] !== void 0 && (i[n] = be(t[n], `opacity.${n}`));
  return i;
}
function bn(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && w(t, a("validation.mustBeObject"));
  const i = e, n = {};
  i.animation_style !== void 0 && (te.includes(i.animation_style) || w(`${t}.animation_style`, a("validation.mustBeOneOf", te.join(", "))), n.animation_style = i.animation_style), i.particle_shape !== void 0 && (ee.includes(i.particle_shape) || w(`${t}.particle_shape`, a("validation.mustBeOneOf", ee.join(", "))), n.particle_shape = i.particle_shape), i.direction !== void 0 && (ie.includes(i.direction) || w(`${t}.direction`, a("validation.mustBeOneOf", ie.join(", "))), n.direction = i.direction), i.particle_spacing !== void 0 && (ne.includes(i.particle_spacing) || w(`${t}.particle_spacing`, a("validation.mustBeOneOf", ne.join(", "))), n.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && w(`${t}.custom_svg_path`, a("validation.mustBeSvgPathString")), i.custom_svg_path.length === 0 && console.warn(`[flowme] ${t}.custom_svg_path is empty — will fall back to circle`), n.custom_svg_path = i.custom_svg_path);
  const o = (m, b) => {
    const $ = i[m];
    if ($ !== void 0)
      return (typeof $ != "number" || !Number.isFinite($) || $ <= 0) && w(`${t}.${m}`, a("validation.positiveFinite")), b !== void 0 && $ > b && w(`${t}.${m}`, a("validation.mustBeAtMost", b)), $;
  }, s = (m) => {
    const b = i[m];
    if (b !== void 0)
      return typeof b != "boolean" && w(`${t}.${m}`, a("validation.mustBeBoolean")), b;
  }, r = o("particle_size");
  if (r !== void 0 && (n.particle_size = r), i.particle_count !== void 0) {
    const m = i.particle_count;
    (typeof m != "number" || !Number.isFinite(m) || m < 1 || !Number.isInteger(m)) && w(`${t}.particle_count`, a("validation.particleCountInt")), n.particle_count = m;
  }
  if (i.glow_intensity !== void 0) {
    const m = i.glow_intensity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0) && w(`${t}.glow_intensity`, a("validation.glowNonNegative")), n.glow_intensity = m;
  }
  const l = s("shimmer");
  l !== void 0 && (n.shimmer = l);
  const c = s("flicker");
  c !== void 0 && (n.flicker = c);
  const p = o("pulse_width");
  p !== void 0 && (n.pulse_width = p);
  const d = o("trail_length");
  if (d !== void 0 && (n.trail_length = d), i.dash_gap !== void 0) {
    const m = i.dash_gap;
    (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 10) && w(`${t}.dash_gap`, a("validation.dashGapRange")), n.dash_gap = m;
  }
  const u = o("cluster_size");
  u !== void 0 && (n.cluster_size = Math.max(1, Math.round(u)));
  const h = o("cluster_gap");
  h !== void 0 && (n.cluster_gap = h);
  const f = o("pulse_frequency", 20);
  if (f !== void 0 && (n.pulse_frequency = f), i.pulse_ratio !== void 0) {
    const m = i.pulse_ratio;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m >= 1) && w(`${t}.pulse_ratio`, a("validation.pulseRatioRange")), n.pulse_ratio = m;
  }
  const g = o("wave_frequency", 20);
  g !== void 0 && (n.wave_frequency = g);
  const v = o("wave_amplitude");
  return v !== void 0 && (n.wave_amplitude = v), n;
}
function ze(e, t) {
  return (typeof e != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e)) && w(t, a("validation.mustBeHexColor")), e;
}
function yn(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && w(t, a("validation.mustBeObject"));
  const i = e;
  typeof i.entity != "string" && w(`${t}.entity`, a("validation.mustBeStringEntityId")), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && w(`${t}.low_value`, a("validation.finiteNumber")), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && w(`${t}.high_value`, a("validation.finiteNumber")), i.low_value >= i.high_value && console.warn(`[flowme] ${t}: low_value should be less than high_value`);
  const n = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: ze(i.low_color, `${t}.low_color`),
    high_color: ze(i.high_color, `${t}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || w(`${t}.mode`, a("validation.gradientMode")), n.mode = i.mode), n;
}
function vn(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("animation", a("validation.animationRootMustBeObject"));
  const t = e, i = {};
  if (t.fps !== void 0) {
    const n = t.fps;
    (typeof n != "number" || !Number.isFinite(n) || n < 1 || n > 120) && w("animation.fps", a("validation.fpsRange")), i.fps = n;
  }
  return t.smooth_speed !== void 0 && (typeof t.smooth_speed != "boolean" && w("animation.smooth_speed", a("validation.mustBeBoolean")), i.smooth_speed = t.smooth_speed), i;
}
function wn(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("visibility", a("validation.visibilityRootMustBeObject"));
  const t = e, i = {};
  for (const n of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[n] !== void 0 && (typeof t[n] != "boolean" && w(`visibility.${n}`, a("validation.mustBeBoolean")), i[n] = t[n]);
  return i;
}
function xn(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("domain_colors", a("validation.domainColorsRootMustBeObject"));
  const t = e, i = {};
  for (const n of ["solar", "grid", "battery", "load"])
    t[n] !== void 0 && (typeof t[n] != "string" && w(`domain_colors.${n}`, a("validation.stringColourValue")), i[n] = t[n]);
  return i;
}
function ut(e) {
  if (!e || typeof e != "object") throw new ge(a("validation.configMustBeObject"));
  const t = e;
  t.type !== "custom:flowme-card" && w("type", a("validation.typeMustBeFlowme", String(t.type))), Et.includes(t.domain) || w("domain", a("validation.mustBeOneOf", Et.join(", ")));
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && w("background", a("validation.backgroundWhenProvided"));
  const n = i ?? {}, s = { default: n.default === void 0 || n.default === "" ? "" : Te(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && w("background.weather_entity", a("validation.mustBeStringEntityId")), s.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && w("background.weather_states", a("validation.weatherStatesMapping"));
    const f = Object.entries(n.weather_states), g = {};
    for (const [v, m] of f)
      g[v] = Te(m, `background.weather_states.${v}`);
    s.weather_states = g;
  }
  n.sun_entity !== void 0 && (typeof n.sun_entity != "string" && w("background.sun_entity", a("validation.sunEntityExample")), s.sun_entity = n.sun_entity), n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && w("background.transition_duration", a("validation.transitionMustBeNumberMs")), s.transition_duration = n.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || w("nodes", a("validation.nodesMustBeArray"));
  const l = /* @__PURE__ */ new Set(), c = r.map((f, g) => un(f, g, l));
  c.length === 0 && w("nodes", a("validation.atLeastOneNode"));
  const p = t.flows;
  Array.isArray(p) || w("flows", a("validation.flowsMustBeArray"));
  const d = /* @__PURE__ */ new Set(), u = p.map(
    (f, g) => hn(f, g, d, l)
  ), h = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: s,
    nodes: c,
    flows: u
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && w("aspect_ratio", a("validation.aspectRatioRegex")), h.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && w("fullscreen", a("validation.mustBeBoolean")), h.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && w("edit_mode_password", a("validation.editPasswordMustBeString")), h.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || w("overlays", a("validation.overlaysMustBeArray"));
    const f = /* @__PURE__ */ new Set();
    h.overlays = t.overlays.map(
      (g, v) => $n(g, v, f)
    );
  }
  return t.defaults !== void 0 && (h.defaults = gn(t.defaults)), t.domain_colors !== void 0 && (h.domain_colors = xn(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && w("debug", a("validation.mustBeBoolean")), h.debug = t.debug), t.opacity !== void 0 && (h.opacity = mn(t.opacity)), t.visibility !== void 0 && (h.visibility = wn(t.visibility)), t.animation !== void 0 && (h.animation = vn(t.animation)), h;
}
function $n(e, t, i) {
  const n = `overlays[${t}]`;
  (!e || typeof e != "object") && w(n, a("validation.mustBeObject"));
  const o = e, s = o.type, l = typeof s == "string" && ["camera", "switch", "sensor", "button"].includes(s);
  !l && s !== "custom" && w(`${n}.type`, a("validation.overlayTypeMustBeCustom"));
  const c = o.id;
  (typeof c != "string" || !c.length) && w(`${n}.id`, a("validation.mustBeNonEmptyId")), i.has(c) && w(`${n}.id`, a("validation.duplicateOverlayId", c)), i.add(c);
  const p = me(o.position, `${n}.position`);
  if (l) {
    const g = a("validation.migrationOverlayWarning", s);
    console.warn(`[flowme] ${n}: ${g}`);
    const v = {
      id: c,
      type: "custom",
      position: p,
      card: { type: "markdown", content: "" },
      _migration_warning: g
    };
    if (o.size !== void 0) {
      const m = o.size;
      if (m && typeof m == "object") {
        const b = m, $ = b.width, k = b.height;
        typeof $ == "number" && typeof k == "number" && (v.size = { width: $, height: k });
      }
    }
    return v;
  }
  const d = o.card;
  (!d || typeof d != "object" || Array.isArray(d)) && w(`${n}.card`, a("validation.overlayCardMustBeObject"));
  const u = wi(d, `${n}.card`);
  if (u.length) {
    const g = u[0];
    w(g.path, a("validation.unsafeSchemeInCard", g.scheme));
  }
  const f = {
    id: c,
    type: "custom",
    position: p,
    card: d
  };
  if (o.size !== void 0) {
    const g = o.size;
    (!g || typeof g != "object") && w(`${n}.size`, a("validation.overlaySizeMustBeObject"));
    const v = g, m = v.width, b = v.height;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m > 100) && w(`${n}.size.width`, a("validation.overlayWidthPercent")), (typeof b != "number" || !Number.isFinite(b) || b <= 0 || b > 100) && w(`${n}.size.height`, a("validation.overlayHeightPercent")), f.size = { width: m, height: b };
  }
  if (o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, a("validation.mustBeBoolean")), f.visible = o.visible), o.opacity !== void 0) {
    const g = o.opacity;
    (typeof g != "number" || !Number.isFinite(g) || g < 0 || g > 1) && w(`${n}.opacity`, a("validation.overlayOpacity01")), f.opacity = g;
  }
  return f;
}
const _n = "[FlowMe]";
let xi = !1;
function oe(e) {
  xi = e;
}
function F(...e) {
  xi && console.warn(_n, ...e);
}
const Ot = {
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
        patterns: ["supply", "in", "inlet", "cold", "mains"],
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
function kn(e) {
  const t = e.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(t)) return "solar";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(t)) return "grid";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(t)) return "battery";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(t)) return "load";
}
function Re(e, t) {
  const i = e.toLowerCase();
  for (const n of t.roles)
    for (const o of n.patterns)
      if (o && i.includes(o)) return n.key;
}
function Sn(e, t, i, n) {
  const o = e ?? "generic", s = Ot[o] ?? Ot.generic;
  let r;
  if (o === "energy") {
    if (r = kn(t), !r) {
      F("colour resolution:", t, "domain:", o, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (o === "generic") {
    if (r = Re(t, s), !r) {
      const p = Math.abs(n ?? 0) % s.roles.length, d = s.roles[p], u = i?.[d.key] ?? d.default;
      return F("colour resolution:", t, "domain:", o, "matched role:", "none", "resolved:", u), u;
    }
  } else if (r = Re(t, s), !r) {
    F("colour resolution:", t, "domain:", o, "matched role:", "none", "resolved:", void 0);
    return;
  }
  const l = s.roles.find((p) => p.key === r);
  if (!l) return;
  const c = i?.[l.key] ?? l.default;
  return F("colour resolution:", t, "domain:", o, "matched role:", r, "resolved:", c), c;
}
function ye(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function De(e, t, i) {
  return e + (t - e) * i;
}
function It(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function $i(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const n = e[i - 1], o = e[i];
    if (!n || !o) continue;
    const s = o.x - n.x, r = o.y - n.y;
    t += Math.sqrt(s * s + r * r);
  }
  return t;
}
function An(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = $i(e), n = ye(t, 0, 1) * i;
  let o = 0;
  for (let s = 1; s < e.length; s++) {
    const r = e[s - 1], l = e[s], c = l.x - r.x, p = l.y - r.y, d = Math.sqrt(c * c + p * p);
    if (o + d >= n) {
      const u = d === 0 ? 0 : (n - o) / d;
      return { x: r.x + c * u, y: r.y + p * u };
    }
    o += d;
  }
  return { ...e[e.length - 1] };
}
function se(e, t, i) {
  if (e.length === 0) return "";
  if (e.length === 1) {
    const l = It(e[0], t);
    return `M ${l.x.toFixed(2)} ${l.y.toFixed(2)}`;
  }
  const n = e.map((l) => It(l, t));
  if (i === "diagonal") {
    const l = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let c = 1; c < n.length; c++)
      l.push(`L ${n[c].x.toFixed(2)} ${n[c].y.toFixed(2)}`);
    return l.join(" ");
  }
  if (i === "corner") {
    const l = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let c = 1; c < n.length; c++) {
      const p = n[c - 1], d = n[c];
      l.push(`L ${d.x.toFixed(2)} ${p.y.toFixed(2)}`), l.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
    }
    return l.join(" ");
  }
  if (i === "curve") {
    const l = n.length, c = [
      { x: 2 * n[0].x - n[1].x, y: 2 * n[0].y - n[1].y },
      ...n,
      { x: 2 * n[l - 1].x - n[l - 2].x, y: 2 * n[l - 1].y - n[l - 2].y }
    ], p = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let d = 1; d < l; d++) {
      const u = c[d - 1], h = c[d], f = c[d + 1], g = c[d + 2], v = h.x + (f.x - u.x) / 6, m = h.y + (f.y - u.y) / 6, b = f.x - (g.x - h.x) / 6, $ = f.y - (g.y - h.y) / 6;
      p.push(`C ${v.toFixed(2)} ${m.toFixed(2)} ${b.toFixed(2)} ${$.toFixed(2)} ${f.x.toFixed(2)} ${f.y.toFixed(2)}`);
    }
    return p.join(" ");
  }
  const o = 0.3, s = 20, r = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
  for (let l = 1; l < n.length; l++) {
    const c = n[l - 1], p = n[l], d = n[l + 1];
    if (!d) {
      r.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
      continue;
    }
    const u = Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2), h = Math.sqrt((d.x - p.x) ** 2 + (d.y - p.y) ** 2), f = Math.min(Math.min(u, h) * o, s), g = f / (u || 1), v = p.x - (p.x - c.x) * g, m = p.y - (p.y - c.y) * g, b = f / (h || 1), $ = p.x + (d.x - p.x) * b, k = p.y + (d.y - p.y) * b;
    r.push(`L ${v.toFixed(2)} ${m.toFixed(2)}`), r.push(`Q ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${$.toFixed(2)} ${k.toFixed(2)}`);
  }
  return r.join(" ");
}
function kt(e) {
  if (e == null) return 0;
  if (typeof e == "number") return Number.isFinite(e) ? e : 0;
  const t = e.trim();
  if (!t || t === "unavailable" || t === "unknown") return 0;
  const i = Number.parseFloat(t);
  return Number.isFinite(i) ? i : 0;
}
const J = 9e3, Q = 700, tt = 1.5;
function L(e, t) {
  const { threshold: i, p50: n, max_duration: o, min_duration: s, steepness: r } = t, l = Math.abs(e);
  if (!(n > 0) || !(i > 0)) return o;
  const c = Math.max(l, i), p = Math.log10(c / n), d = 1 / (1 + Math.exp(-r * p));
  return o - d * (o - s);
}
function ve(e, t) {
  const i = e.speed_curve_override ?? {}, n = i.threshold ?? e.threshold ?? t.threshold, o = i.p50 ?? t.p50, s = i.peak ?? t.peak, r = i.max_duration ?? J, l = i.min_duration ?? Q, c = i.steepness ?? tt;
  return { threshold: n, p50: o, peak: s, max_duration: r, min_duration: l, steepness: c };
}
function Be(e, t, i) {
  if (!i || !t) return { value: e, factor: 1 };
  const n = t.trim();
  if (!n) return { value: e, factor: 1 };
  if (Object.prototype.hasOwnProperty.call(i, n)) {
    const r = i[n] ?? 1;
    return { value: e * r, factor: r, matchedUnit: n };
  }
  const o = n.toLowerCase(), s = Object.entries(i).filter(
    ([r]) => r.toLowerCase() === o
  );
  if (s.length === 1) {
    const [r, l] = s[0];
    return { value: e * l, factor: l, matchedUnit: r };
  }
  return { value: e, factor: 1 };
}
function _i(e, t) {
  let i = null, n = null;
  const o = (...s) => {
    n = s, i !== null && clearTimeout(i), i = setTimeout(() => {
      i = null, n && e(...n), n = null;
    }, t);
  };
  return o.cancel = () => {
    i !== null && (clearTimeout(i), i = null), n = null;
  }, o;
}
function Cn(e, t, i, n) {
  if (!i) return n;
  const o = t === "below_horizon";
  let s = e;
  o && !e.endsWith("-night") && (s = `${e}-night`);
  const r = i[s];
  if (r) return r;
  if (o && s !== "clear-night") {
    const l = i["clear-night"];
    if (l) return l;
  }
  if (s !== e) {
    const l = i[e];
    if (l) return l;
  }
  return n;
}
function Ut(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), n = Number.parseInt(t[2], 10);
  if (!(!i || !n))
    return i / n;
}
function Le(e) {
  const t = e.replace("#", ""), i = t.length === 3 ? t.split("").map((o) => o + o).join("") : t, n = parseInt(i, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function He(e, t, i) {
  const n = e / 255, o = t / 255, s = i / 255, r = Math.max(n, o, s), l = Math.min(n, o, s), c = (r + l) / 2;
  if (r === l) return [0, 0, c];
  const p = r - l, d = c > 0.5 ? p / (2 - r - l) : p / (r + l);
  let u;
  return r === n ? u = (o - s) / p + (o < s ? 6 : 0) : r === o ? u = (s - n) / p + 2 : u = (n - o) / p + 4, [u * 60, d, c];
}
function Wt(e, t, i) {
  let n = i;
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Pn(e, t, i) {
  const n = e / 360;
  let o, s, r;
  if (t === 0)
    o = s = r = i;
  else {
    const c = i < 0.5 ? i * (1 + t) : i + t - i * t, p = 2 * i - c;
    o = Wt(p, c, n + 1 / 3), s = Wt(p, c, n), r = Wt(p, c, n - 1 / 3);
  }
  const l = (c) => Math.round(c * 255).toString(16).padStart(2, "0");
  return `#${l(o)}${l(s)}${l(r)}`;
}
function ki(e, t) {
  const i = t.high_value - t.low_value, n = i === 0 ? 0 : Math.max(0, Math.min(1, (e - t.low_value) / i)), [o, s, r] = Le(t.low_color), [l, c, p] = Le(t.high_color), [d, u, h] = He(o, s, r), [f, g, v] = He(l, c, p);
  let m = f - d;
  m > 180 && (m -= 360), m < -180 && (m += 360);
  const b = (d + m * n + 360) % 360, $ = De(u, g, n), k = De(h, v, n);
  return Pn(b, $, k);
}
function Si() {
  try {
    return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
const Mn = {
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
    return L(e, {
      threshold: 30,
      p50: 800,
      max_duration: J,
      min_duration: Q,
      steepness: tt
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, Fn = {
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
    return L(e, {
      threshold: 0.3,
      p50: 6,
      max_duration: J,
      min_duration: Q,
      steepness: tt
    });
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, Nn = {
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
    return L(e, {
      threshold: 0.05,
      p50: 50,
      max_duration: J,
      min_duration: Q,
      steepness: tt
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round(ye(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, En = {
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
    return L(e, {
      threshold: 5,
      p50: 200,
      max_duration: J,
      min_duration: Q,
      steepness: tt
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return ye(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, On = {
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
    return L(e, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: J,
      min_duration: Q,
      steepness: tt
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, Ai = {
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
    return L(e, {
      threshold: 1,
      p50: 100,
      max_duration: J,
      min_duration: Q,
      steepness: tt
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, Ue = {
  energy: Mn,
  water: Fn,
  network: Nn,
  hvac: En,
  gas: On,
  generic: Ai
};
function B(e) {
  return e && e in Ue ? Ue[e] : Ai;
}
const In = "#CCCCCC";
function wt(e, t, i, n, o, s) {
  const r = e.color ?? Sn(i, e.id, o, s);
  return n >= 0 ? e.color_positive ?? r ?? t.default_color_positive : e.color_negative ?? r ?? t.default_color_negative;
}
const Tn = "[FlowMe Renderer]";
function dt(...e) {
  F(Tn, ...e);
}
const C = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xlink";
function zn() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const jt = zn(), Rn = 2e3, Vt = 3, Dn = 5, Gt = 2, Bn = 14, Ln = 0.9, Hn = 5e3, pt = 20, Un = 0.2, qt = 0.3;
class Ct {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = _i(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.currentDurMs = /* @__PURE__ */ new Map(), this.targetDurMs = /* @__PURE__ */ new Map(), this.speedTransitionStart = /* @__PURE__ */ new Map(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptiveChange = /* @__PURE__ */ new Map(), this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0;
  }
  async init(t, i) {
    dt("init:", t.getBoundingClientRect(), "flows:", i.flows.length), this.container = t, this.config = i, this.prefersReducedMotionFlag = Si(), this.flowsById = new Map(i.flows.map((o) => [o.id, o]));
    const n = document.createElementNS(C, "svg");
    n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("preserveAspectRatio", "none"), n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", n.style.overflow = "visible", this.svg = n, t.appendChild(n), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(t), this.startFpsLoop();
  }
  updateFlow(t, i) {
    this.flowsById.has(t) && (this.latestValues.set(t, i), this.applyUpdate());
  }
  /**
   * GRADIENT-1: Set the resolved gradient colour for a flow.
   * Called by FlowmeCard whenever the gradient entity's state changes.
   * The colour replaces the normal flow colour in the next render frame.
   * Pass undefined/null to clear and fall back to the flow's own color.
   */
  setGradientColor(t, i) {
    i ? this.gradientColors.set(t, i) : this.gradientColors.delete(t), this.applyUpdate();
  }
  /**
   * ANIM-2 fps cap: schedule a rAF loop that enforces the configured fps.
   * Called once after init; no-op when fps is 60 (default — rAF is already ~60Hz).
   */
  startFpsLoop() {
    const i = 1e3 / (this.config?.animation?.fps ?? 60), n = (o) => {
      if (!this.svg) return;
      const s = o - this.lastFrameTime;
      this.sampleFrameTime(), s >= i && (this.lastFrameTime = o - s % i, this.config?.animation?.smooth_speed !== !1 && (this.speedTransitionStart.size > 0 || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(o), this.updateTimeBasedSpacing(o)), this.rafHandle = requestAnimationFrame(n);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(n);
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.currentDurMs.clear(), this.targetDurMs.clear(), this.speedTransitionStart.clear(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.lastAdaptiveChange.clear(), this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear();
  }
  // ── internal ──────────────────────────────────────────────────────────────
  containerSize() {
    if (!this.container) return { width: 0, height: 0 };
    const t = this.container.getBoundingClientRect();
    return { width: Math.max(1, t.width), height: Math.max(1, t.height) };
  }
  animStyle(t) {
    return this.prefersReducedMotionFlag ? "none" : t.animation?.animation_style ?? "dots";
  }
  setFlowAriaLabel(t, i) {
    const n = this.flowNodes.get(t);
    n?.group && (n.group.setAttribute("role", "img"), n.group.setAttribute("aria-label", i));
  }
  buildSkeleton() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const i = document.createElementNS(C, "defs");
    this.svg.appendChild(i);
    const n = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const s = n.get(o.from_node), r = n.get(o.to_node);
      if (!s || !r) continue;
      const l = [s.position, ...o.waypoints, r.position], c = `flowme-path-${o.id}`, p = document.createElementNS(C, "path");
      p.setAttribute("id", c), p.setAttribute("d", se(l, t, o.line_style ?? "corner")), p.setAttribute("fill", "none"), i.appendChild(p);
      const d = document.createElementNS(C, "g");
      d.classList.add("flowme-flow-group"), d.setAttribute("data-flow-id", o.id), o.opacity !== void 0 && d.setAttribute("opacity", String(o.opacity)), o.visible === !1 && (d.style.display = "none");
      const u = this.config?.defaults?.line_width ?? Gt, h = document.createElementNS(C, "use");
      h.classList.add("flow-line"), h.setAttributeNS(U, "href", `#${c}`), h.setAttribute("href", `#${c}`), h.setAttribute("stroke", this.primaryColor(o)), h.setAttribute("stroke-opacity", "0.2"), h.setAttribute("stroke-width", String(u)), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("fill", "none"), d.appendChild(h);
      const f = {
        group: d,
        path: p,
        pathId: c,
        outline: h,
        style: this.animStyle(o),
        particles: []
      };
      this.svg.appendChild(d), this.flowNodes.set(o.id, f), dt("skeleton:", o.id, "| style=", f.style, "| line_style=", o.line_style ?? "corner (default)");
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const t = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
    const i = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = this.flowNodes.get(n.id);
      if (!o) continue;
      const s = i.get(n.from_node), r = i.get(n.to_node);
      if (!s || !r) continue;
      const l = [s.position, ...n.waypoints, r.position];
      o.path.setAttribute("d", se(l, t, n.line_style ?? "corner")), o.style === "pulse" && this.applyFlow(n.id, this.latestValues.get(n.id) ?? 0);
    }
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues)
      this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const n = this.flowsById.get(t), o = this.flowNodes.get(t);
    if (!n || !o) return;
    const s = n.animation ?? {}, r = this.animStyle(n);
    o.style !== r && (this.teardownStyle(o), o.style = r);
    const l = this.profileFor(n), c = ve(n, l), p = jt ? 0 : c.threshold, d = Math.abs(i), h = s.shimmer === !0 && d < p && d > 0;
    if (!(jt || d >= p || h)) {
      this.setGroupOpacity(o, 0);
      return;
    }
    const g = jt ? Rn : L(d, c), v = n.speed_multiplier ?? 1;
    let m = Math.max(50, g * v);
    h && (m = m / Un);
    const b = this.config?.animation?.smooth_speed !== !1;
    m = this.resolveSmoothedDur(t, m, b);
    const $ = s.direction ?? "auto";
    let k;
    $ === "forward" ? k = 1 : $ === "reverse" ? k = -1 : k = i < 0 != (n.reverse === !0) ? -1 : 1;
    let A = k, S = h ? qt : 1;
    if (b && $ === "auto") {
      const lt = this.lastDirection.get(t), Mi = this.dirChanging.get(t);
      lt !== void 0 && lt !== k && !Mi && this.dirChanging.set(t, { startMs: performance.now(), oldDir: lt, newDir: k });
      const _t = this.dirChanging.get(t);
      if (_t) {
        const xe = performance.now() - _t.startMs;
        if (xe < 300) {
          const Dt = xe / 300;
          Dt < 0.5 ? (S = (h ? qt : 1) * (1 - Dt * 2), A = _t.oldDir) : (S = (h ? qt : 1) * ((Dt - 0.5) * 2), A = _t.newDir);
        } else
          this.dirChanging.delete(t), A = k;
      }
    }
    this.lastDirection.set(t, k);
    const I = n.domain ?? this.config?.domain, O = this.config?.flows.findIndex((lt) => lt.id === t) ?? -1, z = wt(
      n,
      l,
      I,
      A,
      this.config?.domain_colors,
      O >= 0 ? O : 0
    ), T = this.gradientColors.get(t), V = n.value_gradient?.mode ?? "flow", Rt = T && V !== "line" ? T : z, at = T && V !== "flow" ? T : z, R = Rt;
    o.outline && o.outline.setAttribute("stroke", at), this.setGroupOpacity(o, S);
    const G = this.updateBurstState(t, d, c, l);
    switch (dt("applyFlow:", t, "style=", r, "dur=", m, "dir=", A, "color=", R), r) {
      case "dots":
        this.applyDots(o, n, l, i, m, R, A, G);
        break;
      case "dash":
        this.applyDash(o, n, m, R, A, G);
        break;
      case "pulse":
        this.applyPulse(o, n, l, i, m, R, G);
        break;
      case "arrow":
        this.applyArrows(o, n, m, R, A, G);
        break;
      case "trail":
        this.applyTrail(o, n, m, R, A, G);
        break;
      case "fluid":
        this.applyFluid(o, n, m, R, A);
        break;
      case "spark":
        this.applySpark(o, n, l, i, m, R, A, G);
        break;
      case "none":
        this.setGroupOpacity(o, 1);
        break;
      default:
        this.applyDots(o, n, l, i, m, R, A, G);
    }
  }
  // ── smooth_speed (ANIM-2) ─────────────────────────────────────────────────
  resolveSmoothedDur(t, i, n) {
    if (!n)
      return this.currentDurMs.set(t, i), this.targetDurMs.set(t, i), i;
    this.targetDurMs.get(t) !== i && (this.speedTransitionStart.set(t, performance.now()), this.targetDurMs.set(t, i));
    const s = this.currentDurMs.get(t) ?? i, r = this.speedTransitionStart.get(t);
    if (r === void 0)
      return this.currentDurMs.set(t, i), i;
    const l = performance.now() - r, c = 500;
    if (l >= c)
      return this.currentDurMs.set(t, i), this.speedTransitionStart.delete(t), i;
    const p = l / c, d = p * p * (3 - 2 * p), u = s + (i - s) * d;
    return this.currentDurMs.set(t, u), u;
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(t, i, n, o) {
    const s = n.peak, r = this.config?.defaults?.burst_trigger_ratio ?? Ln, l = this.config?.defaults?.burst_sustain_ms ?? Hn, c = s * r;
    if (i < c)
      return this.burstActive.delete(t), this.burstEnteredAt.delete(t), 1;
    let p = this.burstEnteredAt.get(t);
    if (p === void 0 && (p = performance.now(), this.burstEnteredAt.set(t, p)), performance.now() - p < l) return 1;
    const d = o.burst_density_multiplier ?? 1.5;
    return this.burstActive.add(t), d;
  }
  // ── helpers ───────────────────────────────────────────────────────────────
  setGroupOpacity(t, i) {
    const n = String(i);
    for (const o of t.particles) o.shape.setAttribute("opacity", n);
    if (t.particlesBack) for (const o of t.particlesBack) o.shape.setAttribute("opacity", n);
    if (t.lineStroke && t.lineStroke.setAttribute("opacity", i > 0 ? "0.9" : "0"), t.pulseCircles) for (const o of t.pulseCircles) o.circle.setAttribute("opacity", n);
    t.fluidGradient && t.fluidGradient.parentElement?.setAttribute("opacity", n);
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
  resolveParticleCount(t, i, n, o) {
    const s = t.animation ?? {}, l = 1e3 / (this.config?.animation?.fps ?? 60);
    if (s.particle_count !== void 0) return s.particle_count;
    const c = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(n) : Vt)
    ), p = this.config?.defaults?.burst_max_particles ?? pt, d = Math.min(p, Math.max(1, Math.round(c * o))), u = this.animStyle(t);
    if (u === "dots" || u === "trail") {
      const h = this.adaptiveCount.get(t.id) ?? d, f = this.avgFrameMs(), g = performance.now(), v = this.lastAdaptiveChange.get(t.id) ?? 0;
      if (g - v > 1e3) {
        let b = h;
        f > l * 1.2 && h > 1 ? (b = h - 1, dt("adaptive:", t.id, "reducing particles", h, "→", b, "(avg frame", f.toFixed(1), "ms)")) : f < l * 0.8 && h < d && (b = h + 1, dt("adaptive:", t.id, "restoring particles", h, "→", b)), b !== h && (this.adaptiveCount.set(t.id, b), this.lastAdaptiveChange.set(t.id, g));
      }
      return this.adaptiveCount.get(t.id) ?? d;
    }
    return d;
  }
  resolveParticleRadius(t) {
    return (this.config?.defaults?.dot_radius ?? Dn) * (t.animation?.particle_size ?? 1);
  }
  resolveGlow(t, i) {
    return t.animation?.glow_intensity === 0 ? !1 : i.glow;
  }
  glowFilter(t, i, n) {
    return this.resolveGlow(t, i) ? `drop-shadow(0 0 ${(6 * (t.animation?.glow_intensity ?? 1)).toFixed(1)}px ${n})` : "";
  }
  // ── SPACING-1: particle begin-offset computation ─────────────────────────
  /**
   * Compute `begin` offsets (in seconds, negative = pre-delay before cycle
   * start) for all particles given the configured spacing mode.
   *
   * Returns an array of `count` numbers, each representing the `begin`
   * attribute value for `animateMotion`.
   */
  resolveParticleBegins(t, i, n, o) {
    const s = o.particle_spacing ?? "even", r = n / 1e3, l = r / i;
    switch (s) {
      case "even":
      default:
        return Array.from({ length: i }, (c, p) => -(l * p));
      case "random": {
        const c = performance.now(), p = this.randomOffsetsLastUpdate.get(t) ?? 0, d = 3e3;
        let u = this.randomOffsets.get(t);
        if (!u || u.length !== i || c - p > d) {
          const h = l * 0.1, f = [];
          for (let g = 0; g < i; g++) {
            let v, m = 0;
            do
              v = -(Math.random() * r), m++;
            while (m < 20 && f.some((b) => {
              const $ = Math.abs((v - b) % r + r) % r;
              return $ < h && $ > r - h;
            }));
            f.push(v);
          }
          this.randomOffsets.set(t, f), this.randomOffsetsLastUpdate.set(t, c), u = f;
        }
        return u;
      }
      case "clustered": {
        const c = Math.max(1, Math.round(o.cluster_size ?? 3)), p = o.cluster_gap ?? 3, d = l * 0.3, u = [];
        let h = 0;
        for (let f = 0; f < i; f++) {
          const g = f % c;
          f > 0 && g === 0 && (h += d * c * p), u.push(-(h % r)), h += d;
        }
        return u;
      }
      case "pulse": {
        const c = 1 / Math.max(0.01, o.pulse_frequency ?? 1.5), p = o.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % c < c * p ? Array.from({ length: i }, (h, f) => -(l * 0.1 * f)) : Array.from({ length: i }, (h, f) => -(l * f));
      }
      case "wave_spacing": {
        const c = o.wave_frequency ?? 2, p = o.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (d, u) => {
          const h = u / i * Math.PI * 2 * c, f = Math.sin(h) * p * (r / 2);
          return -(l * u + f);
        });
      }
      case "wave_lateral":
        return Array.from({ length: i }, (c, p) => -(l * p));
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
  updateLateralWaves(t) {
    if (this.config)
      for (const i of this.config.flows) {
        if ((i.animation?.particle_spacing ?? "even") !== "wave_lateral") continue;
        const n = this.flowNodes.get(i.id);
        if (!n || n.particles.length === 0) continue;
        const o = i.animation?.wave_frequency ?? 2, s = i.animation?.wave_amplitude ?? 20, r = n.particles.length, l = Math.PI * 2 / r, c = t * o * 2e-3 % (Math.PI * 2);
        for (let p = 0; p < r; p++) {
          const d = n.particles[p];
          if (!d) continue;
          const u = c + p * l, h = Math.sin(u) * s;
          if (d.shape.getAttribute("data-kind") === "custom_svg") {
            d.shape.hasAttribute("data-base-transform") || d.shape.setAttribute("data-base-transform", d.shape.getAttribute("transform") ?? "");
            const g = d.shape.getAttribute("data-base-transform") ?? "";
            d.shape.setAttribute("transform", `${g} translate(0,${h.toFixed(2)})`);
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
  updateTimeBasedSpacing(t) {
    if (this.config)
      for (const i of this.config.flows) {
        const n = i.animation?.particle_spacing ?? "even";
        if (n !== "wave_spacing" && n !== "pulse") continue;
        const o = this.flowNodes.get(i.id);
        if (!o || o.particles.length === 0) continue;
        const s = o.particles.length, l = (this.currentDurMs.get(i.id) ?? 2e3) / 1e3, c = i.animation ?? {}, p = [];
        if (n === "wave_spacing") {
          const h = c.wave_frequency ?? 2, f = Math.min(c.wave_amplitude ?? 0.85, 0.95), g = t * 1e-3 / l, v = [];
          for (let m = 0; m < s; m++) {
            const b = (m / s + g) % 1, $ = Math.sin(b * Math.PI * 2 * h) * f * (1 / s);
            v.push(((b + $) % 1 + 1) % 1);
          }
          v.sort((m, b) => m - b), p.push(...v);
        } else {
          const h = c.pulse_frequency ?? 1.5, f = c.pulse_ratio ?? 0.25, g = t * h * 1e-3 % 1, v = t * 1e-3 / l % 1, m = 1 / s;
          let b;
          g < f ? b = 1 - (1 - g / f) * 0.9 : b = (g - f) / (1 - f);
          for (let $ = 0; $ < s; $++)
            p.push(((v + $ * m * b) % 1 + 1) % 1);
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
            const v = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            v.setAttribute("data-js-driven", "1"), v.setAttribute("begin", "indefinite"), v.setAttribute("dur", "1s"), f.animateMotion.replaceWith(v), f.animateMotion = v, f.shape.appendChild(v);
          }
          const g = p[h] ?? 0;
          if (u > 0 && d)
            try {
              const v = d.getPointAtLength(g * u), m = Math.max(0.5, u * 0.01), b = d.getPointAtLength(Math.max(0, g * u - m)), $ = d.getPointAtLength(Math.min(u, g * u + m)), k = Math.atan2($.y - b.y, $.x - b.x) * (180 / Math.PI);
              f.shape.setAttribute("transform", `translate(${v.x.toFixed(2)},${v.y.toFixed(2)}) rotate(${k.toFixed(1)})`);
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
  applyDots(t, i, n, o, s, r, l, c) {
    const p = i.animation?.direction ?? "auto", d = this.resolveParticleCount(i, n, o, c), u = i.animation?.particle_shape ?? "circle", h = i.animation?.flicker === !0;
    if (t.particles.length !== d || t.particles[0] && this.particleKind(t.particles[0]) !== u) {
      for (const b of t.particles) b.shape.remove();
      t.particles = [];
      for (let b = 0; b < d; b++)
        t.particles.push(this.makeParticle(t, u, r, i, n));
    }
    if (p === "both") {
      if (!t.particlesBack || t.particlesBack.length !== d) {
        if (t.particlesBack) for (const b of t.particlesBack) b.shape.remove();
        t.particlesBack = [];
        for (let b = 0; b < d; b++)
          t.particlesBack.push(this.makeParticle(t, u, r, i, n));
      }
    } else if (t.particlesBack) {
      for (const b of t.particlesBack) b.shape.remove();
      t.particlesBack = void 0;
    }
    const f = `${(s / 1e3).toFixed(3)}s`, g = i.animation ?? {}, v = this.resolveParticleBegins(i.id, d, s, g), m = (b, $) => {
      for (let k = 0; k < b.length; k++) {
        const A = b[k];
        this.updateParticleColor(A, r, i, n, h);
        const S = document.createElementNS(C, "animateMotion");
        S.setAttribute("repeatCount", "indefinite"), S.setAttribute("dur", f), S.setAttribute("rotate", "auto"), S.setAttribute("begin", `${(v[k] ?? 0).toFixed(3)}s`), $ < 0 && (S.setAttribute("keyPoints", "1;0"), S.setAttribute("keyTimes", "0;1"));
        const I = document.createElementNS(C, "mpath");
        I.setAttributeNS(U, "href", `#${t.pathId}`), I.setAttribute("href", `#${t.pathId}`), S.appendChild(I), A.animateMotion.replaceWith(S), A.animateMotion = S, A.shape.appendChild(S);
      }
    };
    m(t.particles, l), t.particlesBack && m(t.particlesBack, -l);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(t, i, n, o, s, r) {
    for (const b of t.particles) b.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const b = document.createElementNS(C, "use");
      b.setAttributeNS(U, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), b.setAttribute("fill", "none"), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-linejoin", "round"), t.group.appendChild(b), t.lineStroke = b;
    }
    const l = this.config?.defaults?.line_width ?? Gt, p = (i.animation ?? {}).dash_gap ?? 0.5, d = Math.max(0.1, p / r), u = 14, h = u * d, f = this.glowFilter(i, this.profileFor(i), o);
    t.lineStroke.setAttribute("stroke", o), t.lineStroke.setAttribute("stroke-width", String(l * 2)), t.lineStroke.setAttribute("stroke-dasharray", `${u} ${h}`), f && t.lineStroke.setAttribute("filter", f);
    const g = u + h, v = t.lineStroke.querySelector("animate");
    v && v.remove();
    const m = document.createElementNS(C, "animate");
    m.setAttribute("attributeName", "stroke-dashoffset"), m.setAttribute("from", s > 0 ? "0" : `-${g}`), m.setAttribute("to", s > 0 ? `-${g}` : "0"), m.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), m.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(m);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(t, i, n, o, s, r, l) {
    for (const A of t.particles) A.shape.remove();
    t.particles = [], t.lineStroke?.remove(), t.lineStroke = void 0;
    const c = new Map(this.config?.nodes.map((A) => [A.id, A]) ?? []), p = c.get(i.from_node), d = c.get(i.to_node);
    if (!p || !d) return;
    const u = [p.position, ...i.waypoints, d.position], h = $i(u), f = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(o) : Math.max(3, Math.floor(h / 15))
      )
    ), g = this.config?.defaults?.burst_max_particles ?? pt, v = Math.min(g, Math.max(2, Math.round(f * l))), m = this.containerSize(), b = i.animation?.pulse_width ?? 2, $ = Bn * (i.animation?.particle_size ?? 1), k = this.resolveGlow(i, n);
    if (!t.pulseCircles || t.pulseCircles.length !== v) {
      if (t.pulseCircles) for (const A of t.pulseCircles) A.circle.remove();
      t.pulseCircles = [];
      for (let A = 0; A < v; A++) {
        const S = document.createElementNS(C, "circle");
        S.setAttribute("r", "0"), S.setAttribute("fill", "none"), S.setAttribute("stroke", r), S.setAttribute("stroke-width", String(b)), S.setAttribute("opacity", "0"), k && S.setAttribute("filter", this.glowFilter(i, n, r));
        const I = document.createElementNS(C, "animate");
        I.setAttribute("attributeName", "r"), I.setAttribute("values", `0;${$};0`), I.setAttribute("repeatCount", "indefinite"), S.appendChild(I);
        const O = document.createElementNS(C, "animate");
        O.setAttribute("attributeName", "opacity"), O.setAttribute("values", "0;0.9;0"), O.setAttribute("repeatCount", "indefinite"), S.appendChild(O), t.group.appendChild(S), t.pulseCircles.push({ circle: S, animateRadius: I, animateOpacity: O });
      }
    }
    for (let A = 0; A < t.pulseCircles.length; A++) {
      const S = t.pulseCircles[A], I = (A + 0.5) / t.pulseCircles.length, O = An(u, I), z = It(O, m);
      S.circle.setAttribute("cx", z.x.toFixed(2)), S.circle.setAttribute("cy", z.y.toFixed(2)), S.circle.setAttribute("stroke", r);
      const T = `${(s / 1e3).toFixed(3)}s`, V = `${(-s * A / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      S.animateRadius.setAttribute("values", `0;${$};0`), S.animateRadius.setAttribute("dur", T), S.animateRadius.setAttribute("begin", V), S.animateOpacity.setAttribute("dur", T), S.animateOpacity.setAttribute("begin", V);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(t, i, n, o, s, r) {
    const l = this.profileFor(i), c = i.animation?.particle_count ?? Vt, p = this.config?.defaults?.burst_max_particles ?? pt, d = Math.min(p, Math.max(1, Math.round(c * r))), u = i.animation?.flicker === !0;
    if (t.particles.length !== d) {
      for (const g of t.particles) g.shape.remove();
      t.particles = [];
      for (let g = 0; g < d; g++)
        t.particles.push(this.makeParticle(t, "arrow", o, i, l));
    }
    const h = `${(n / 1e3).toFixed(3)}s`, f = this.resolveParticleBegins(i.id, d, n, i.animation ?? {});
    for (let g = 0; g < t.particles.length; g++) {
      const v = t.particles[g];
      this.updateParticleColor(v, o, i, l, u);
      const m = document.createElementNS(C, "animateMotion");
      m.setAttribute("repeatCount", "indefinite"), m.setAttribute("dur", h), m.setAttribute("rotate", "auto"), m.setAttribute("begin", `${(f[g] ?? 0).toFixed(3)}s`), s < 0 && (m.setAttribute("keyPoints", "1;0"), m.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(C, "mpath");
      b.setAttributeNS(U, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), m.appendChild(b), v.animateMotion.replaceWith(m), v.animateMotion = m, v.shape.appendChild(m);
    }
  }
  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
   */
  applyTrail(t, i, n, o, s, r) {
    const l = this.profileFor(i), c = i.animation?.particle_count ?? Vt, p = this.config?.defaults?.burst_max_particles ?? pt, d = Math.min(p, Math.max(1, Math.round(c * r))), u = i.animation?.flicker === !0;
    if (t.particles.length !== d) {
      for (const g of t.particles) g.shape.remove();
      t.particles = [];
      for (let g = 0; g < d; g++)
        t.particles.push(this.makeParticle(t, "teardrop", o, i, l));
    }
    const h = `${(n / 1e3).toFixed(3)}s`, f = this.resolveParticleBegins(i.id, d, n, i.animation ?? {});
    for (let g = 0; g < t.particles.length; g++) {
      const v = t.particles[g];
      this.updateParticleColor(v, o, i, l, u);
      const m = document.createElementNS(C, "animateMotion");
      m.setAttribute("repeatCount", "indefinite"), m.setAttribute("dur", h), m.setAttribute("rotate", "auto"), m.setAttribute("begin", `${(f[g] ?? 0).toFixed(3)}s`), s < 0 && (m.setAttribute("keyPoints", "1;0"), m.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(C, "mpath");
      b.setAttributeNS(U, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), m.appendChild(b), v.animateMotion.replaceWith(m), v.animateMotion = m, v.shape.appendChild(m);
    }
  }
  /**
   * fluid — continuous gradient flowing along the line.
   * Implemented as an animated stroke-dashoffset on a wide stroke.
   */
  applyFluid(t, i, n, o, s) {
    for (const d of t.particles) d.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const d = document.createElementNS(C, "use");
      d.setAttributeNS(U, "href", `#${t.pathId}`), d.setAttribute("href", `#${t.pathId}`), d.setAttribute("fill", "none"), d.setAttribute("stroke-linecap", "round"), t.group.appendChild(d), t.lineStroke = d;
    }
    const r = (this.config?.defaults?.line_width ?? Gt) * 3, l = this.glowFilter(i, this.profileFor(i), o);
    t.lineStroke.setAttribute("stroke", o), t.lineStroke.setAttribute("stroke-width", String(r)), t.lineStroke.setAttribute("stroke-dasharray", "50 200"), l && t.lineStroke.setAttribute("filter", l);
    const c = t.lineStroke.querySelector("animate");
    c && c.remove();
    const p = document.createElementNS(C, "animate");
    p.setAttribute("attributeName", "stroke-dashoffset"), p.setAttribute("from", s > 0 ? "0" : "-250"), p.setAttribute("to", s > 0 ? "-250" : "0"), p.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), p.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(p);
  }
  /**
   * spark — particles with randomised size/opacity, slight scatter.
   * Scatter is achieved via SVG transform on each particle's <g> wrapper.
   */
  applySpark(t, i, n, o, s, r, l, c) {
    const p = this.resolveParticleCount(i, n, o, c), d = Math.min(
      this.config?.defaults?.burst_max_particles ?? pt,
      Math.round(p * c)
    ), u = i.animation?.particle_shape ?? "circle", h = i.animation?.flicker === !0;
    if (t.particles.length !== d) {
      for (const g of t.particles) g.shape.remove();
      t.particles = [];
      for (let g = 0; g < d; g++) {
        const v = this.makeParticle(t, u, r, i, n), m = 0.7 + Math.random() * 0.6;
        v.shape.setAttribute("transform", `scale(${m.toFixed(2)})`), t.particles.push(v);
      }
    }
    const f = `${(s / 1e3).toFixed(3)}s`;
    for (let g = 0; g < t.particles.length; g++) {
      const v = t.particles[g], m = 0.5 + Math.random() * 0.5;
      v.shape.setAttribute("opacity", String(m.toFixed(2))), this.updateParticleColor(v, r, i, n, h);
      const b = document.createElementNS(C, "animateMotion");
      b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", f), b.setAttribute("rotate", "auto"), b.setAttribute("begin", `${(-s * g / (t.particles.length * 1e3)).toFixed(3)}s`), l < 0 && (b.setAttribute("keyPoints", "1;0"), b.setAttribute("keyTimes", "0;1"));
      const $ = document.createElementNS(C, "mpath");
      $.setAttributeNS(U, "href", `#${t.pathId}`), $.setAttribute("href", `#${t.pathId}`), b.appendChild($), v.animateMotion.replaceWith(b), v.animateMotion = b, v.shape.appendChild(b);
    }
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(t) {
    const i = t.shape.tagName.toLowerCase();
    return i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? t.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : i === "path" ? t.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  makeParticle(t, i, n, o, s) {
    const r = this.resolveParticleRadius(o), l = this.resolveGlow(o, s);
    let c, p = !1;
    switch (i) {
      case "square": {
        const h = r * 2, f = document.createElementNS(C, "rect");
        f.setAttribute("width", String(h)), f.setAttribute("height", String(h)), f.setAttribute("x", String(-h / 2)), f.setAttribute("y", String(-h / 2)), f.setAttribute("rx", "1.5"), f.setAttribute("fill", n), f.setAttribute("opacity", "0"), c = f;
        break;
      }
      case "arrow": {
        const h = r * 2.2, f = r * 1.5, g = document.createElementNS(C, "polygon");
        g.setAttribute("points", `${h},0 ${-h * 0.4},${f} 0,0 ${-h * 0.4},${-f}`), g.setAttribute("fill", n), g.setAttribute("opacity", "0"), g.setAttribute("data-kind", "arrow"), c = g;
        break;
      }
      case "teardrop": {
        const h = o.animation?.trail_length ?? 2, f = r, g = r * h, v = document.createElementNS(C, "ellipse");
        v.setAttribute("rx", String(f)), v.setAttribute("ry", String(g)), v.setAttribute("cy", String(-g * 0.3)), v.setAttribute("fill", n), v.setAttribute("opacity", "0"), c = v;
        break;
      }
      case "diamond": {
        const h = r * 1.4, f = document.createElementNS(C, "polygon");
        f.setAttribute("points", `0,${-h} ${h},0 0,${h} ${-h},0`), f.setAttribute("fill", n), f.setAttribute("opacity", "0"), f.setAttribute("data-kind", "diamond"), c = f;
        break;
      }
      case "custom_svg": {
        const h = o.animation?.custom_svg_path ?? "";
        if (!h) {
          console.warn(`[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${o.id}`);
          const g = document.createElementNS(C, "circle");
          g.setAttribute("r", String(r)), g.setAttribute("fill", n), g.setAttribute("opacity", "0"), c = g;
          break;
        }
        const f = document.createElementNS(C, "path");
        f.setAttribute("d", h), f.setAttribute("fill", n), f.setAttribute("opacity", "0"), f.setAttribute("data-kind", "custom_svg"), t.group.appendChild(f), p = !0;
        try {
          const g = f.getBBox(), v = Math.max(g.width, g.height, 1), b = r * 2 / v, $ = -(g.x + g.width / 2), k = -(g.y + g.height / 2);
          f.setAttribute("transform", `scale(${b.toFixed(4)}) translate(${$.toFixed(4)},${k.toFixed(4)})`);
        } catch {
        }
        c = f;
        break;
      }
      default: {
        const h = document.createElementNS(C, "circle");
        h.setAttribute("r", String(r)), h.setAttribute("fill", n), h.setAttribute("opacity", "0"), c = h;
      }
    }
    l && (c.setAttribute("filter", this.glowFilter(o, s, n)), c.style.color = n);
    const d = document.createElementNS(C, "animateMotion");
    d.setAttribute("repeatCount", "indefinite"), d.setAttribute("dur", "2s");
    const u = document.createElementNS(C, "mpath");
    return u.setAttributeNS(U, "href", `#${t.pathId}`), u.setAttribute("href", `#${t.pathId}`), d.appendChild(u), c.appendChild(d), p || t.group.appendChild(c), { shape: c, animateMotion: d };
  }
  updateParticleColor(t, i, n, o, s) {
    if (t.shape.setAttribute("fill", i), t.shape.style.color = i, this.resolveGlow(n, o) && t.shape.setAttribute("filter", this.glowFilter(n, o, i)), t.shape.setAttribute("opacity", "1"), s) {
      if (!t.flickerAnim) {
        const h = document.createElementNS(C, "animate");
        h.setAttribute("attributeName", "opacity"), h.setAttribute("repeatCount", "indefinite"), t.shape.appendChild(h), t.flickerAnim = h;
      }
      const p = (1 / (2 + Math.random() * 6)).toFixed(3), d = (0.85 + Math.random() * 0.1).toFixed(2), u = (0.95 + Math.random() * 0.05).toFixed(2);
      t.flickerAnim.setAttribute("values", `${u};${d};${u}`), t.flickerAnim.setAttribute("dur", `${p}s`);
    } else t.flickerAnim && (t.flickerAnim.remove(), t.flickerAnim = void 0);
  }
  profileFor(t) {
    return B(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t), n = t.domain ?? this.config?.domain, o = this.config?.flows.findIndex((s) => s.id === t.id) ?? -1;
    return wt(t, i, n, 1, this.config?.domain_colors, o >= 0 ? o : 0);
  }
}
const Wn = `/* eslint-disable no-undef */
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
`, We = "flowme-keyframes", re = "flowme-cycle", jn = 5, Vn = 2;
let Y = null, je = !1;
function Gn() {
  if (document.getElementById(We)) return;
  const e = document.createElement("style");
  e.id = We, e.textContent = `@keyframes ${re} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function qn() {
  if (je) return;
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
  for (const [n, o, s] of i)
    try {
      t({ name: n, syntax: o, inherits: !1, initialValue: s });
    } catch {
    }
  je = !0;
}
async function Yn() {
  if (Y) return Y;
  const e = CSS.paintWorklet;
  if (!e)
    return Y = Promise.reject(new Error("paintWorklet not available")), Y;
  const t = new Blob([Wn], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return Y = e.addModule(i).catch((n) => {
    throw Y = null, n;
  }).finally(() => {
  }), Y;
}
class Xn {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = _i(() => this.flushUpdates(), 120);
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((o) => [o.id, o])), Gn(), qn(), await Yn();
    const n = document.createElement("div");
    n.className = "flow-houdini flow-houdini-root", n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", t.appendChild(n), this.wrapper = n;
    for (const o of i.flows) {
      const s = document.createElement("div");
      s.className = "flow-houdini", s.dataset.flowId = o.id, s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.background = "paint(flowme-painter)", s.style.animation = `${re} 2s linear infinite`, s.style.opacity = "0", n.appendChild(s), this.flowDivs.set(o.id, { el: s });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(t);
  }
  updateFlow(t, i) {
    this.flowsById.has(t) && (this.latestValues.set(t, i), this.applyUpdate());
  }
  setFlowAriaLabel(t, i) {
    const n = this.flowDivs.get(t);
    n && (n.el.setAttribute("role", "img"), n.el.setAttribute("aria-label", i));
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
      const o = this.flowDivs.get(n.id);
      if (!o) continue;
      const s = i.get(n.from_node), r = i.get(n.to_node);
      if (!s || !r) continue;
      const p = [s.position, ...n.waypoints, r.position].map((d) => It(d, t)).map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ");
      o.el.style.setProperty("--flowme-path", `"${p}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [t, i] of this.latestValues) this.applyFlow(t, i);
  }
  applyFlow(t, i) {
    const n = this.flowsById.get(t), o = this.flowDivs.get(t);
    if (!n || !o) return;
    const s = this.profileFor(n), r = ve(n, s), l = Math.abs(i);
    if (!(l >= r.threshold)) {
      o.el.style.opacity = "0";
      return;
    }
    o.el.style.opacity = "1";
    const p = n.speed_multiplier ?? 1, d = Math.max(50, L(l, r) * p), u = i < 0 != (n.reverse === !0) ? -1 : 1, h = n.domain ?? this.config?.domain, f = this.config?.flows.findIndex(($) => $.id === n.id) ?? -1, g = wt(
      n,
      s,
      h,
      u,
      this.config?.domain_colors,
      f >= 0 ? f : 0
    ), v = Math.max(
      1,
      Math.round(s.particle_count_curve ? s.particle_count_curve(i) : 3)
    ), m = s.wave_amplitude_curve ? s.wave_amplitude_curve(i) : 4, b = o.el.style;
    b.setProperty("--flowme-shape", s.shape), b.setProperty("--flowme-color", g), b.setProperty("--flowme-glow", s.glow ? "1" : "0"), b.setProperty("--flowme-count", String(v)), b.setProperty("--flowme-radius", String(jn)), b.setProperty("--flowme-line", String(Vn)), b.setProperty("--flowme-amp", String(m)), b.setProperty("--flowme-direction", String(u)), b.animation = `${re} ${(d / 1e3).toFixed(3)}s linear infinite`;
  }
  profileFor(t) {
    return B(t.domain ?? this.config?.domain);
  }
}
function Kn() {
  const e = Jn(), t = e ?? "svg", i = Zn(), n = Si();
  return F(
    "renderer selected:",
    n || t !== "houdini" ? "SvgRenderer" : "HoudiniRenderer",
    "| override=",
    e ?? "(none)",
    "| Houdini available:",
    i,
    "| reduced motion:",
    n,
    "| paintWorklet in CSS?",
    typeof CSS < "u" && "paintWorklet" in CSS
  ), n ? new Ct() : t === "houdini" ? i ? new Xn() : (F("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Ct()) : new Ct();
}
function Zn() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function Jn() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function Ve(e) {
  const t = e.size?.width ?? 20, i = e.size?.height ?? 15;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function Qn(e, t, i) {
  F(
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
  const n = e.visible !== !1, o = e.opacity ?? 1, s = [
    n ? "" : "display:none;",
    o !== 1 ? `opacity:${o};` : ""
  ].join("");
  return e._migration_warning ? y`
      <div
        class="overlay overlay-migration-warning"
        data-overlay-id=${e.id}
        style=${Ve(e) + s}
        tabindex="-1"
        title=${e._migration_warning}
      >
        <div class="migration-warning-inner">
          ${a("overlays.migrationPrefix")} ${e._migration_warning}
        </div>
      </div>
    ` : y`
    <div
      class="overlay overlay-custom overlay-interactive overlay-wrapper"
      data-overlay-id=${e.id}
      style=${Ve(e) + s}
      tabindex=${n ? "0" : "-1"}
      role="button"
      @keydown=${(r) => i?.onOverlayKeydown?.(r, e)}
    >
      <flowme-custom-overlay
        class="overlay-interactive"
        .hass=${t}
        .card=${e.card}
      ></flowme-custom-overlay>
    </div>
    ${x}
  `;
}
let Yt = null, it = null;
async function to() {
  if (Yt) return Yt;
  if (it) return it;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (it = t().then((i) => (Yt = i, it = null, i)).catch((i) => {
    throw it = null, i;
  }), it);
}
async function eo(e) {
  const t = await to();
  return t ? t.createCardElement(e) : null;
}
var io = Object.defineProperty, no = Object.getOwnPropertyDescriptor, zt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? no(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && io(t, i, o), o;
};
let rt = class extends K {
  updated(e) {
    super.updated(e), e.has("card") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  /**
   * Simulate a primary click on the mounted HA card so keyboard activation
   * (Enter / Space on the overlay wrapper) matches a tap on the tile/card.
   */
  activatePrimaryAction() {
    const e = this.childCard ?? this.renderRoot.querySelector(".mount")?.firstElementChild;
    e instanceof HTMLElement && e.click();
  }
  render() {
    return this.errorMessage ? y`<div class="err" title=${this.errorMessage}>!</div>` : y`<div class="mount"></div>`;
  }
  rebuildChild() {
    const e = this.card, t = e ? JSON.stringify(e) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!e)) {
      try {
        pn(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, eo(e).then((i) => {
        if (!i) {
          this.errorMessage = a("overlays.haHelpersUnavailable"), this.requestUpdate();
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
rt.styles = pe`
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
zt([
  $t({ attribute: !1 })
], rt.prototype, "hass", 2);
zt([
  $t({ attribute: !1 })
], rt.prototype, "card", 2);
zt([
  M()
], rt.prototype, "errorMessage", 2);
rt = zt([
  fe("flowme-custom-overlay")
], rt);
const oo = 100;
class so {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > oo; ) this.undoStack.shift();
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
function _(e) {
  return JSON.parse(JSON.stringify(e));
}
function E(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function St(e, t = 8) {
  return Math.round(e / t) * t;
}
function ro(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `node_${i}`;
    if (!t.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function ao(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `flow_${i}`;
    if (!t.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function Xt(e, t, i) {
  const n = _(e);
  for (const o of n.nodes)
    o.id === t && (o.position = { x: E(i.x), y: E(i.y) });
  return n;
}
function lo(e, t, i) {
  const n = _(e), o = {
    id: ro(e),
    position: { x: E(t.x), y: E(t.y) },
    ...i ? { label: i } : {}
  };
  return n.nodes.push(o), { config: n, node: o };
}
function co(e, t) {
  const i = _(e);
  return i.nodes = i.nodes.filter((n) => n.id !== t), i.flows = i.flows.filter((n) => n.from_node !== t && n.to_node !== t), i;
}
function po(e, t) {
  const i = _(e);
  for (const n of i.nodes) {
    const o = t.get(n.id);
    o && (n.position = { x: E(o.x), y: E(o.y) });
  }
  return i;
}
function uo(e, t) {
  const i = _(e);
  return i.nodes = i.nodes.filter((n) => !t.has(n.id)), i.flows = i.flows.filter((n) => !t.has(n.from_node) && !t.has(n.to_node)), i;
}
function Ge(e, t, i) {
  const n = _(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.visible = i);
  return n;
}
function ho(e, t, i) {
  const n = e.nodes.find((s) => s.id === i);
  if (!n) return e;
  const o = _(e);
  for (const s of o.nodes)
    t.has(s.id) && (s.position = { ...s.position, y: n.position.y });
  return o;
}
function fo(e, t, i) {
  const n = e.nodes.find((s) => s.id === i);
  if (!n) return e;
  const o = _(e);
  for (const s of o.nodes)
    t.has(s.id) && (s.position = { ...s.position, x: n.position.x });
  return o;
}
function Kt(e, t, i, n) {
  const o = _(e);
  for (const s of o.flows)
    if (s.id === t) {
      if (i < 0 || i >= s.waypoints.length) return e;
      s.waypoints[i] = {
        x: E(n.x),
        y: E(n.y)
      };
    }
  return o;
}
function qe(e, t, i, n) {
  const o = _(e);
  for (const s of o.flows) {
    if (s.id !== t) continue;
    const r = Math.max(0, Math.min(s.waypoints.length, i));
    s.waypoints.splice(r, 0, {
      x: E(n.x),
      y: E(n.y)
    });
  }
  return o;
}
function Ye(e, t, i) {
  const n = _(e);
  for (const o of n.flows)
    if (o.id === t) {
      if (i < 0 || i >= o.waypoints.length) return e;
      o.waypoints.splice(i, 1);
    }
  return n;
}
function Xe(e, t, i, n) {
  const o = _(e), s = {
    id: ao(e),
    from_node: t,
    to_node: i,
    entity: n,
    waypoints: []
  };
  return o.flows.push(s), { config: o, flow: s };
}
function go(e, t) {
  const i = _(e);
  return i.flows = i.flows.filter((n) => n.id !== t), i;
}
function mo(e, t) {
  const i = _(e);
  return i.background.default = t, i;
}
function bo(e, t) {
  const i = _(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function yo(e, t) {
  const i = _(e);
  return t && t.length ? i.background.sun_entity = t : delete i.background.sun_entity, i;
}
function vo(e, t) {
  const i = _(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function Ke(e, t, i) {
  var o;
  const n = _(e);
  return (o = n.background).weather_states ?? (o.weather_states = {}), n.background.weather_states[t] = i, n;
}
function wo(e, t) {
  const i = _(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function xo(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `overlay_${i}`;
    if (!t.has(n)) return n;
  }
  return `overlay_${Date.now()}`;
}
function $o(e, t) {
  const i = _(e), n = t.id ?? xo(e), o = {
    ...t,
    id: n,
    position: {
      x: E(t.position.x),
      y: E(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], o], { config: i, overlay: o };
}
function _o(e, t) {
  const i = _(e);
  return i.overlays = (i.overlays ?? []).filter((n) => n.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function ko(e, t, i) {
  const n = _(e);
  for (const o of n.overlays ?? [])
    o.id === t && (o.position = { x: E(i.x), y: E(i.y) });
  return n;
}
function Ze(e, t, i) {
  const n = _(e), o = Math.max(2, Math.min(100, i.width)), s = Math.max(2, Math.min(100, i.height));
  for (const r of n.overlays ?? [])
    r.id === t && (r.size = { width: o, height: s });
  return n;
}
function So(e, t, i) {
  const n = _(e);
  for (const o of n.overlays ?? [])
    o.id === t && i && (o.card = i);
  return n;
}
function Ao(e, t, i) {
  const n = _(e);
  for (const o of n.overlays ?? [])
    o.id === t && (i ? delete o.visible : o.visible = !1);
  return n;
}
function Co(e, t, i) {
  const n = _(e);
  for (const o of n.overlays ?? [])
    if (o.id === t) {
      const s = Math.max(0, Math.min(1, i));
      s === 1 ? delete o.opacity : o.opacity = s;
    }
  return n;
}
function Je(e, t, i) {
  const n = _(e);
  return n.opacity = { ...n.opacity, [t]: i }, n;
}
function Po(e, t, i) {
  const n = _(e);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function Mo(e, t, i) {
  const n = _(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function Fo(e, t, i) {
  const n = _(e);
  return n.defaults = { ...n.defaults, [t]: i }, n;
}
function No(e, t, i) {
  if (t === i) return e;
  const n = _(e), o = n.background.weather_states;
  if (!o || !(t in o)) return e;
  const s = o[t];
  return s === void 0 ? e : (delete o[t], o[i] = s, n);
}
function Eo(e, t, i) {
  const n = _(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 || i === "corner" ? delete s.line_style : s.line_style = i, s;
  }), n;
}
function Qe(e, t, i) {
  const n = _(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 ? delete s.color : s.color = i, s;
  }), n;
}
function ti(e, t, i) {
  const n = _(e);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function Oo(e, t, i) {
  const n = _(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function Io(e, t, i) {
  const n = _(e);
  return n.visibility = { ...n.visibility, [t]: i }, n;
}
function ei(e, t, i) {
  const n = _(e);
  return i === void 0 ? n.domain_colors && (delete n.domain_colors[t], Object.keys(n.domain_colors).length === 0 && delete n.domain_colors) : n.domain_colors = { ...n.domain_colors, [t]: i }, n;
}
function ii(e, t, i) {
  const n = _(e);
  return n.flows = n.flows.map((o) => o.id !== t ? o : { ...o, speed_curve_override: { ...o.speed_curve_override, ...i } }), n;
}
function To(e, t) {
  const i = _(e);
  return i.flows = i.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return delete o.speed_curve_override, o;
  }), i;
}
function zo(e, t, i) {
  const n = _(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
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
function Ro(e, t) {
  const i = _(e);
  return i.flows = i.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return delete o.animation, o;
  }), i;
}
function ni(e, t) {
  const i = _(e);
  return i.animation = { ...i.animation, ...t }, i;
}
function Do(e, t, i) {
  const n = _(e), o = n.flows.find((s) => s.id === t);
  return o && (o.value_gradient = i), n;
}
function Bo(e, t, i) {
  const n = _(e), o = n.flows.find((s) => s.id === t);
  return o && (o.value_gradient = { ...o.value_gradient, ...i }), n;
}
function oi(e, t) {
  const i = _(e), n = i.flows.find((o) => o.id === t);
  return n && delete n.value_gradient, i;
}
const we = 8, si = 1, ae = 255;
function Lo(e, t = we) {
  const i = Math.max(1, Math.floor(t)), n = Math.max(1, Math.ceil(e.width / i)), o = Math.max(1, Math.ceil(e.height / i)), s = new Uint16Array(n * o);
  for (let r = 0; r < o; r++) {
    const l = r * i, c = Math.min(e.height, l + i);
    for (let p = 0; p < n; p++) {
      const d = p * i, u = Math.min(e.width, d + i);
      let h = 0;
      for (let g = l; g < c; g++) {
        const v = g * e.width;
        for (let m = d; m < u; m++) {
          const b = e.data[v + m] ?? 0;
          b > h && (h = b);
        }
      }
      const f = ae - h;
      s[r * n + p] = f < si ? si : f;
    }
  }
  return { cols: n, rows: o, cellSize: i, data: s };
}
function Ho(e, t, i) {
  return i * e.cols + t;
}
function Uo(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? ae : e.data[Ho(e, t, i)] ?? ae;
}
const Wo = 480, jo = 270, Vo = 30;
function Go(e, t, i = Wo, n = jo) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const o = Math.min(i / e, n / t, 1);
  return {
    width: Math.max(1, Math.floor(e * o)),
    height: Math.max(1, Math.floor(t * o))
  };
}
function qo(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let o = 0, s = 0; o < e.length; o += 4, s++) {
    const r = e[o] ?? 0, l = e[o + 1] ?? 0, c = e[o + 2] ?? 0;
    n[s] = 0.2126 * r + 0.7152 * l + 0.0722 * c;
  }
  return n;
}
function Yo(e, t, i) {
  const n = new Uint8ClampedArray(e.length);
  for (let s = 0; s < i; s++) {
    const r = s * t;
    for (let l = 0; l < t; l++) {
      const c = e[r + Math.max(0, l - 1)] ?? 0, p = e[r + l] ?? 0, d = e[r + Math.min(t - 1, l + 1)] ?? 0;
      n[r + l] = c + 2 * p + d >> 2;
    }
  }
  const o = new Uint8ClampedArray(e.length);
  for (let s = 0; s < i; s++) {
    const r = s * t, l = Math.max(0, s - 1) * t, c = Math.min(i - 1, s + 1) * t;
    for (let p = 0; p < t; p++) {
      const d = n[l + p] ?? 0, u = n[r + p] ?? 0, h = n[c + p] ?? 0;
      o[r + p] = d + 2 * u + h >> 2;
    }
  }
  return o;
}
function Xo(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let o = 1; o < i - 1; o++) {
    const s = (o - 1) * t, r = o * t, l = (o + 1) * t;
    for (let c = 1; c < t - 1; c++) {
      const p = e[s + (c - 1)] ?? 0, d = e[s + c] ?? 0, u = e[s + (c + 1)] ?? 0, h = e[r + (c - 1)] ?? 0, f = e[r + (c + 1)] ?? 0, g = e[l + (c - 1)] ?? 0, v = e[l + c] ?? 0, m = e[l + (c + 1)] ?? 0, b = -p - 2 * h - g + u + 2 * f + m, $ = -p - 2 * d - u + g + 2 * v + m;
      let k = Math.sqrt(b * b + $ * $);
      k < Vo && (k = 0), k > 255 && (k = 255), n[r + c] = k;
    }
  }
  return { width: t, height: i, data: n };
}
function Ci(e, t, i) {
  const n = Go(t, i), o = document.createElement("canvas");
  o.width = n.width, o.height = n.height;
  const s = o.getContext("2d", { willReadFrequently: !0 });
  if (!s) throw new Error("2D canvas unavailable");
  s.drawImage(e, 0, 0, n.width, n.height);
  try {
    const r = s.getImageData(0, 0, n.width, n.height);
    return { width: n.width, height: n.height, rgba: r.data };
  } catch (r) {
    throw new Error(
      `Canvas was tainted by cross-origin image (${r.message}). Serve the background from the same origin or enable CORS.`
    );
  }
}
function Ko(e, t, i) {
  const { width: n, height: o, rgba: s } = Ci(e, t, i), r = qo(s, n, o), l = Yo(r, n, o);
  return Xo(l, n, o);
}
const Zo = 50;
class Jo {
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
      const n = 2 * t + 1, o = 2 * t + 2;
      let s = t;
      if (n < i && (this.arr[n]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = n), o < i && (this.arr[o]?.f ?? 0) < (this.arr[s]?.f ?? 0) && (s = o), s === t) return;
      [this.arr[s], this.arr[t]] = [this.arr[t], this.arr[s]], t = s;
    }
  }
}
function Qo(e, t, i) {
  const [n, o] = t, [s, r] = i;
  if (n < 0 || o < 0 || n >= e.cols || o >= e.rows || s < 0 || r < 0 || s >= e.cols || r >= e.rows) return null;
  if (n === s && o === r) return [[n, o]];
  const l = e.cols * e.rows, c = new Float32Array(l);
  c.fill(1 / 0);
  const p = new Int16Array(l), d = new Int16Array(l);
  p.fill(-1), d.fill(-1);
  const u = new Uint8Array(l), h = new Uint8Array(l), f = o * e.cols + n;
  c[f] = 0;
  const g = new Jo();
  g.push({ col: n, row: o, f: ri(n, o, s, r) });
  const v = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; g.size > 0; ) {
    const m = g.pop(), { col: b, row: $ } = m, k = $ * e.cols + b;
    if (!h[k]) {
      if (h[k] = 1, b === s && $ === r)
        return ts(e, p, d, i);
      for (const [A, S, I] of v) {
        const O = b + A, z = $ + S;
        if (O < 0 || z < 0 || O >= e.cols || z >= e.rows) continue;
        const T = z * e.cols + O;
        if (h[T]) continue;
        const V = Uo(e, O, z), Rt = u[k] && u[k] !== I ? Zo : 0, at = (c[k] ?? 1 / 0) + V + Rt;
        if (at < (c[T] ?? 1 / 0)) {
          c[T] = at, p[T] = b, d[T] = $, u[T] = I;
          const R = at + ri(O, z, s, r);
          g.push({ col: O, row: z, f: R });
        }
      }
    }
  }
  return null;
}
function ri(e, t, i, n) {
  return Math.abs(e - i) + Math.abs(t - n);
}
function ts(e, t, i, n) {
  const o = [];
  let s = n[0], r = n[1];
  for (; s !== -1 && r !== -1; ) {
    o.push([s, r]);
    const l = r * e.cols + s, c = t[l] ?? -1, p = i[l] ?? -1;
    if (c === s && p === r || (s = c, r = p, s < 0 || r < 0)) break;
  }
  return o.reverse(), o[0]?.[0] === -1 && o.shift(), o;
}
function es(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const n = e[i - 1], o = e[i], s = e[i + 1], r = o[0] - n[0], l = o[1] - n[1], c = s[0] - o[0], p = s[1] - o[1];
    r * p - l * c === 0 && Math.sign(r) === Math.sign(c) && Math.sign(l) === Math.sign(p) || t.push(o);
  }
  return t.push(e[e.length - 1]), t;
}
function is(e, t, i) {
  const n = ai(t, e), o = ai(i, e), s = Qo(e, n, o);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: es(s).slice(1, -1).map((p) => ns(p, e)), edgesUsable: !0 };
}
function ai(e, t) {
  const i = li(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), n = li(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, n];
}
function ns(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function li(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
const Pt = /* @__PURE__ */ new Map();
async function os(e, t = {}) {
  const i = performance.now(), n = t.cellSize ?? we, o = `${e.imageUrl}|${n}`, s = Pt.has(o);
  let r = null;
  try {
    r = await rs(o, e.imageUrl, n);
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
  const { waypoints: l, edgesUsable: c } = is(r, e.from, e.to);
  return {
    waypoints: l,
    cached: s,
    edgesUsable: c,
    elapsedMs: performance.now() - i
  };
}
async function ss(e) {
  if (!e) return null;
  try {
    const t = await Pi(e);
    return Ci(t, t.naturalWidth, t.naturalHeight);
  } catch {
    return null;
  }
}
function rs(e, t, i) {
  const n = Pt.get(e);
  if (n) return n;
  const o = as(t, i).catch((s) => {
    throw Pt.delete(e), s;
  });
  return Pt.set(e, o), o;
}
async function as(e, t) {
  const i = await Pi(e);
  await ci();
  const n = Ko(i, i.naturalWidth, i.naturalHeight);
  return await ci(), Lo(n, t);
}
function Pi(e) {
  return new Promise((t, i) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => t(n), n.onerror = () => i(new Error(`Failed to load background image: ${e}`)), n.src = e;
  });
}
function ci() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
var ls = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, N = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? cs(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && ls(t, i, o), o;
};
let P = class extends K {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.canUndo = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this._pathWorkerPending = !1, this._pathPendingSelection = null, this.selectorType = "", this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.imageNaturalW = 1600, this.imageNaturalH = 1e3, this._loadedImageUrl = "", this.spaceHeld = !1, this.panPointerId = null, this.stageRef = Zt(), this.canvasRef = Zt(), this.undoStack = new so((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, n = mo(i, t);
      this.pushPatch(i, n, "edit default background");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = wo(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = P.KNOWN_WEATHER_STATES.find((o) => !e.has(o)) ?? "custom", i = this.config, n = Ke(i, t, "");
      this.pushPatch(i, n, `add weather state ${t}`);
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: e, toNodeId: t, waypoints: i } = this.suggestPreview, n = window.prompt(a("editor.inspector.flowEntityPrompt"), a("editor.inspector.flowEntityDefault")) ?? a("editor.inspector.flowEntityDefault"), o = this.config, s = o.flows.find(
        (c) => c.from_node === e && c.to_node === t
      );
      let r, l;
      if (s)
        l = s.id, r = {
          ...o,
          flows: o.flows.map(
            (c) => c.id === s.id ? { ...c, waypoints: i.map((p) => ({ x: p.x, y: p.y })) } : c
          )
        };
      else {
        const { config: c, flow: p } = Xe(o, e, t, n);
        l = p.id, r = {
          ...c,
          flows: c.flows.map(
            (d) => d.id === p.id ? { ...d, waypoints: i.map((u) => ({ x: u.x, y: u.y })) } : d
          )
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(o, r, `suggest-path ${l}`), this.selectedFlowId = l;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (e) => {
      if (!(!this.config || e.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const n = this.config, { config: o, node: s } = lo(n, i, a("editor.inspector.newNodeDefaultLabel"));
          this.pushPatch(n, o, `add node ${s.id}`), this.pending = null;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const n = {
            type: "custom",
            position: i,
            size: { width: 20, height: 15 },
            card: { type: "entity", entity: "sensor.example_sensor" }
          }, o = this.config, { config: s, overlay: r } = $o(o, n);
          this.selectedOverlayId = r.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(o, s, `add overlay ${r.id}`), this.pending = null;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step;
          return;
        }
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "";
      }
    }, this.onStageContextMenu = (e) => {
      this.pending && (e.preventDefault(), this.pending = null);
    }, this.onSegmentClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId;
      if (!i) return;
      const n = t.dataset.segmentIndex, o = n !== void 0 ? Number(n) : NaN;
      if (e.shiftKey && Number.isFinite(o)) {
        const s = this.pointerToPercent(e);
        if (!s) return;
        const r = this.config, l = qe(r, i, o, s);
        this.pushPatch(r, l, `add waypoint to ${i}`);
        return;
      }
      this.selectedFlowId = i, this.selectedNodeId = null, this.selectedOverlayId = null;
    }, this.onNodeClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const i = e.currentTarget.dataset.nodeId;
      if (i && this.pending?.kind === "add-flow") {
        if (this.pending.step === "pick-from") {
          this.pending = { kind: "add-flow", step: "pick-to", fromId: i };
          return;
        }
        if (this.pending.step === "pick-to" && this.pending.fromId !== i) {
          const n = window.prompt(a("editor.inspector.flowEntityPrompt"), a("editor.inspector.flowEntityDefault")) ?? a("editor.inspector.flowEntityDefault"), o = this.config, { config: s, flow: r } = Xe(o, this.pending.fromId, i, n);
          this.pushPatch(o, s, `add flow ${r.id}`), this.pending = null;
          return;
        }
      }
    }, this.onOverlayClick = (e) => {
      e.stopPropagation();
      const i = e.currentTarget.dataset.overlayId;
      i && (this.selectedOverlayId = i, this.selectedNodeId = null, this.selectedFlowId = null, this.customConfigDraft = "", this.customConfigError = "");
    }, this.onOverlayContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget.dataset.overlayId;
      i && window.confirm(a("editor.inspector.deleteOverlayConfirm", i)) && this.removeOverlay(i);
    }, this.onOverlayResizePointerDown = (e) => {
      if (this.previewMode || !this.config) return;
      e.stopPropagation(), e.preventDefault();
      const t = e.currentTarget, i = t.dataset.overlayId;
      if (!i) return;
      const n = (this.config.overlays ?? []).find((s) => s.id === i);
      if (!n) return;
      const o = { ...n.size ?? { width: 20, height: 15 } };
      t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: i,
        startSize: o,
        startPx: { x: e.clientX, y: e.clientY }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (e) => {
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget.dataset.nodeId;
      i && window.confirm(a("editor.inspector.deleteNodeContextConfirm", i)) && this.removeNode(i);
    }, this.onWaypointContextMenu = (e) => {
      if (e.preventDefault(), e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId, n = Number(t.dataset.waypointIndex);
      if (!i || !Number.isFinite(n)) return;
      const o = this.config, s = Ye(o, i, n);
      this.pushPatch(o, s, `delete waypoint ${n} of ${i}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const t = e.currentTarget, i = t.dataset.waypointIndex, n = t.dataset.flowId, o = t.dataset.nodeId, s = t.dataset.overlayId;
      let r = null;
      if (o)
        if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(o)) {
          const l = /* @__PURE__ */ new Map();
          for (const c of this.config.nodes)
            this.selectedNodeIds.has(c.id) && l.set(c.id, { ...c.position });
          r = {
            kind: "node-bulk",
            ids: Array.from(this.selectedNodeIds),
            startPositions: l,
            startPx: { x: e.clientX, y: e.clientY }
          };
        } else
          r = { kind: "node", id: o };
      else s && !t.classList.contains("overlay-resize") ? r = { kind: "overlay", id: s } : n && i !== void 0 && (r = { kind: "waypoint", flowId: n, index: Number(i) });
      r && (t.setPointerCapture(e.pointerId), this.dragPointerId = e.pointerId, this.dragTarget = r, this.dragStartConfig = this.config, this.dragStartPx = { x: e.clientX, y: e.clientY }, this.dragMoved = !1, this.dragShiftHeld = e.shiftKey);
    }, this.onHandlePointerMove = (e) => {
      if (this.dragPointerId !== e.pointerId || !this.dragTarget || !this.config) return;
      const t = this.dragTarget;
      if (this.dragShiftHeld = e.shiftKey, t.kind === "overlay-resize") {
        const o = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (e.clientX - t.startPx.x) / this.scale, l = (e.clientY - t.startPx.y) / this.scale, c = r / o * 100, p = l / s * 100;
        let d = t.startSize.width + c, u = t.startSize.height + p;
        this.dragShiftHeld && (d = Math.round(d), u = Math.round(u)), this.dragMoved = !0, this.config = Ze(this.config, t.id, { width: d, height: u });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const o = e.clientX - this.dragStartPx.x, s = e.clientY - this.dragStartPx.y;
        (Math.abs(o) > 4 || Math.abs(s) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const i = this.pointerToPercent(e);
      if (!i) return;
      const n = this.dragShiftHeld ? { x: E(St(i.x)), y: E(St(i.y)) } : i;
      if (t.kind === "node")
        this.config = Xt(this.config, t.id, n);
      else if (t.kind === "node-bulk") {
        const o = this.canvasRef.value;
        if (!o) return;
        const s = o.getBoundingClientRect();
        if (s.width === 0 || s.height === 0) return;
        const r = s.width - 16, l = s.height - 8, c = (e.clientX - t.startPx.x) / this.scale / r * 100, p = (e.clientY - t.startPx.y) / this.scale / l * 100, d = /* @__PURE__ */ new Map();
        for (const [u, h] of t.startPositions) {
          const f = this.dragShiftHeld ? St(h.x + c) : h.x + c, g = this.dragShiftHeld ? St(h.y + p) : h.y + p;
          d.set(u, { x: f, y: g });
        }
        this.config = po(this.config, d);
      } else t.kind === "overlay" ? this.config = ko(this.config, t.id, n) : t.kind === "waypoint" && (this.config = Kt(this.config, t.flowId, t.index, n));
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const i = this.dragStartConfig, n = this.config, o = this.dragTarget, s = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !o) return;
      if (!s && o.kind === "node") {
        const l = o.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (e.shiftKey) {
          const c = new Set(this.selectedNodeIds);
          c.has(l) ? c.delete(l) : c.add(l), this.selectedNodeIds = c, this.selectedNodeId = c.size === 1 ? Array.from(c)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
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
    }, this.onKeyDown = (e) => {
      if (e.key === "Escape") {
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null;
        return;
      }
      if (!(e.metaKey || e.ctrlKey)) return;
      const i = e.key.toLowerCase();
      i === "z" && !e.shiftKey ? (e.preventDefault(), e.stopImmediatePropagation(), this.undoStack.undo()) : (i === "z" && e.shiftKey || i === "y") && (e.preventDefault(), e.stopImmediatePropagation(), this.undoStack.redo());
    }, this.onSpaceDown = (e) => {
      e.code === "Space" && !e.repeat && !this.spaceHeld && (this.spaceHeld = !0, e.preventDefault());
    }, this.onSpaceUp = (e) => {
      e.code === "Space" && (this.spaceHeld = !1, this.panPointerId !== null && (this.canvasRef.value?.releasePointerCapture(this.panPointerId), this.panPointerId = null));
    }, this.onCanvasWheel = (e) => {
      e.preventDefault();
      const t = this.canvasRef.value;
      if (!t) return;
      const i = t.getBoundingClientRect(), n = e.clientX - i.left, o = e.clientY - i.top, s = e.deltaY < 0 ? 1.25 : 0.8;
      this.adjustZoom(s, n, o);
    }, this.onCanvasPointerDown = (e) => {
      if (e.button === 1) {
        e.preventDefault(), this.canvasRef.value?.setPointerCapture(e.pointerId), this.panPointerId = e.pointerId;
        return;
      }
      e.button === 0 && this.spaceHeld && (e.preventDefault(), e.stopPropagation(), this.canvasRef.value?.setPointerCapture(e.pointerId), this.panPointerId = e.pointerId);
    }, this.onCanvasPointerMove = (e) => {
      this.panPointerId === e.pointerId && (this.panX += e.movementX, this.panY += e.movementY, this.clampPan());
    }, this.onCanvasPointerUp = (e) => {
      if (this.panPointerId !== e.pointerId) return;
      this.canvasRef.value?.releasePointerCapture(e.pointerId), this.panPointerId = null;
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState()), window.addEventListener("keydown", this.onKeyDown), document.addEventListener("keydown", this.onKeyDown, !0), document.addEventListener("keydown", this.onSpaceDown, !0), document.addEventListener("keyup", this.onSpaceUp, !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._pathWorker?.terminate(), this._pathWorker = void 0, this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown), document.removeEventListener("keydown", this.onKeyDown, !0), document.removeEventListener("keydown", this.onSpaceDown, !0), document.removeEventListener("keyup", this.onSpaceUp, !0), this._canvasResizeObserver?.disconnect(), this._canvasResizeObserver = void 0, this.scale = this.fitScale, this.panX = this.fitPanX, this.panY = this.fitPanY, this.spaceHeld = !1, this.panPointerId = null;
  }
  willUpdate(e) {
    if (super.willUpdate(e), e.has("hass")) {
      const t = this.hass?.language;
      t !== this._lastLanguage && (this._lastLanguage = t, vi(t));
    }
  }
  firstUpdated() {
    const e = this.canvasRef.value;
    e && (this._canvasResizeObserver = new ResizeObserver((t) => {
      t[0] && this.recalcFit();
    }), this._canvasResizeObserver.observe(e));
  }
  /**
   * Load the background image to read its natural dimensions, then recalculate
   * the fit scale/pan so the image fills the stage width correctly.
   * Called whenever the background URL changes.
   */
  loadBackgroundImage(e) {
    if (!e || e === this._loadedImageUrl) return;
    this._loadedImageUrl = e;
    const t = new Image();
    t.onload = () => {
      this.imageNaturalW = t.naturalWidth || 1600, this.imageNaturalH = t.naturalHeight || 1e3, this.recalcFit();
    }, t.onerror = () => {
      this.recalcFit();
    }, t.src = e;
  }
  /**
   * Recalculate fitScale / fitPanX / fitPanY based on current stage size and
   * image natural dimensions. Resets live pan/zoom to fit if the user has not
   * interacted (still at the previous fit level).
   */
  recalcFit() {
    const e = this.canvasRef.value;
    if (!e) return;
    const t = e.offsetWidth - 16, i = e.offsetHeight - 8;
    if (t <= 0 || i <= 0) return;
    const n = t / this.imageNaturalW, o = this.imageNaturalH * n, s = 0, r = -(o - i) / 2, l = this.fitScale;
    this.fitScale = n, this.fitPanX = s, this.fitPanY = r, (this.scale === 1 || this.scale === l) && (this.scale = n, this.panX = s, this.panY = r);
  }
  setConfig(e) {
    try {
      this.config = ut(e), oe(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
      const t = this.config?.background?.default;
      t && this.loadBackgroundImage(t);
    } catch (t) {
      this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config)
      return y`
        <div class="wrap">
          <p class="hint">${a("editor.hintNoConfig")}</p>
          ${this.errorMessage ? y`<pre class="error">${this.errorMessage}</pre>` : x}
        </div>
      `;
    const e = this.config.background.default, t = this.selectedNodeIds.size >= 2, i = this.selectedNodeId ? "nodes" : this.selectedFlowId ? "flows" : this.selectedOverlayId ? "overlays" : this.selectorType, n = this.selectedNodeId ?? this.selectedFlowId ?? this.selectedOverlayId ?? "";
    return y`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class="z-canvas"
          role="application"
          aria-label=${a("editor.canvas.ariaLabel")}
          ${Jt(this.canvasRef)}
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
            ${Jt(this.stageRef)}
          >
            <!-- canvas-content: unified scene layer for background + all content.
                 Sized to image natural dimensions so percentages map to image pixels.
                 Transform pans/zooms the whole scene as one unit. -->
            <div
              class="canvas-content"
              style=${`width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;`}
            >
              ${e ? y`<div class="background" style="background-image: url('${e}');"></div>` : x}
              <svg class="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
                ${this.config.flows.map((o) => this.renderFlowConnector(o))}
              </svg>
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
                aria-label=${a("editor.toolbar.undo")}
                ?disabled=${!this.canUndo}
                title=${this.undoLabel ? a("editor.canvas.undoTitleWithDesc", this.undoLabel) : a("editor.canvas.undoTitlePlain")}
                @click=${() => this.undoStack.undo()}
              >↩</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${a("editor.toolbar.redo")}
                ?disabled=${!this.canRedo}
                title=${this.redoLabel ? a("editor.canvas.redoTitleWithDesc", this.redoLabel) : a("editor.canvas.redoTitlePlain")}
                @click=${() => this.undoStack.redo()}
              >↪</button>
            </div>
            <div class="tb-icon-row">
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${a("editor.toolbar.zoomOut")}
                ?disabled=${this.scale <= this.fitScale}
                title=${a("editor.toolbar.zoomOut")}
                @click=${() => this.adjustZoom(0.8)}
              >−</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${a("editor.toolbar.zoomIn")}
                ?disabled=${this.scale >= 5}
                title=${a("editor.toolbar.zoomIn")}
                @click=${() => this.adjustZoom(1.25)}
              >+</button>
              <button
                type="button"
                class="tb-icon-btn"
                aria-label=${a("editor.toolbar.fitCanvas")}
                title=${a("editor.toolbar.fitCanvas")}
                @click=${() => this.resetZoom()}
              >⊡</button>
            </div>
          </div>

          <!-- Centre (50%): Row 1 = add/multiselect, Row 2 = Save/Cancel -->
          <div class="tb-col-actions">
            <div class="tb-row tb-row-actions">
              ${t ? this.renderMultiSelectToolbar() : y`
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${a("editor.canvas.addNodeAria")}
                    title=${a("editor.canvas.addNodeAria")}
                    @click=${() => {
      this.pending = { kind: "add-node" };
    }}
                  >${a("editor.toolbar.addNode")}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${a("editor.canvas.addFlowAria")}
                    title=${a("editor.canvas.addFlowAria")}
                    @click=${() => {
      this.pending = { kind: "add-flow", step: "pick-from" };
    }}
                  >${a("editor.toolbar.addFlow")}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${a("editor.canvas.addOverlayAria")}
                    title=${a("editor.canvas.addOverlayAria")}
                    @click=${() => {
      this.pending = { kind: "add-overlay", overlayType: "custom" };
    }}
                  >${a("editor.toolbar.addOverlay")}</button>
                `}
            </div>
            <div class="tb-row tb-row-save">
              <button
                type="button"
                class="tb-btn tb-btn-save"
                aria-label=${a("editor.canvas.saveAria")}
                title=${a("editor.canvas.saveTitle")}
                @click=${() => {
      this.config && this.commitToHa(this.config);
    }}
              >💾 ${a("editor.toolbar.save")}</button>
              <button
                type="button"
                class="tb-btn tb-btn-cancel"
                aria-label=${a("editor.canvas.cancelAria")}
                title=${a("editor.canvas.cancelTitle")}
                ?disabled=${!this.savedConfig}
                @click=${() => {
      if (!this.savedConfig || !this.config) return;
      const o = this.config;
      this.pushPatch(o, this.savedConfig, "cancel all changes");
    }}
              >✕ ${a("editor.toolbar.cancel")}</button>
            </div>
          </div>

          <!-- Right (35%): Type + Element dropdowns stacked -->
          <div class="tb-col-selector">
            <select
              class="tb-select"
              aria-label=${a("editor.canvas.selectTypeAria")}
              .value=${i}
              @change=${(o) => {
      this.selectorType = o.target.value, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null;
    }}
            >
              <option value="">${a("editor.toolbar.selectType")}</option>
              <option value="nodes">${a("editor.toolbar.nodes")}</option>
              <option value="flows">${a("editor.toolbar.flows")}</option>
              <option value="overlays">${a("editor.toolbar.overlays")}</option>
            </select>
            <select
              class="tb-select"
              aria-label=${a("editor.canvas.selectElementAria")}
              ?disabled=${!i}
              .value=${n}
              @change=${(o) => {
      const s = o.target.value;
      s && (i === "nodes" ? (this.selectedNodeId = s, this.selectedNodeIds = /* @__PURE__ */ new Set([s]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = s, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = s, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null));
    }}
            >
              <option value="">${a(i ? "editor.toolbar.selectElement" : "editor.toolbar.selectElementDash")}</option>
              ${i === "nodes" ? this.config.nodes.map((o) => y`
                <option value=${o.id}>${o.label ?? o.id}</option>
              `) : x}
              ${i === "flows" ? this.config.flows.map((o) => y`
                <option value=${o.id}>${o.id}</option>
              `) : x}
              ${i === "overlays" ? (this.config.overlays ?? []).map((o, s) => y`
                <option value=${o.id ?? String(s)}>${a("editor.canvas.overlayOption", s, o.id ? a("editor.canvas.overlayOptionIdPart", o.id) : "")}</option>
              `) : x}
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
  renderFlowConnector(e) {
    if (!this.config) return x;
    const t = new Map(this.config.nodes.map((d) => [d.id, d])), i = t.get(e.from_node), n = t.get(e.to_node);
    if (!i || !n) return x;
    const o = [i.position, ...e.waypoints, n.position], s = e.id === this.selectedFlowId, l = se(o, { width: 100, height: 100 }, e.line_style ?? "corner");
    if (!l) return x;
    const c = e.color ?? "rgba(255,255,255,0.8)", p = [];
    for (let d = 0; d < o.length - 1; d++) {
      const u = o[d], h = o[d + 1];
      !u || !h || p.push(Ee`
        <line
          class="segment-hit"
          x1=${u.x}
          y1=${u.y}
          x2=${h.x}
          y2=${h.y}
          data-flow-id=${e.id}
          data-segment-index=${d}
          @click=${this.onSegmentClick}
        />
      `);
    }
    return Ee`
      <g>
        ${p}
        <path
          class=${`flow-path ${s ? "selected" : ""}`}
          d=${l}
          data-flow-id=${e.id}
          style=${`stroke: ${c};`}
          @click=${this.onSegmentClick}
        />
      </g>
    `;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map(
      (t, i) => y`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${a("aria.waypointHandle", i, e.id)}
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
    return y`
      <div
        class=${`overlay-handle overlay-wrapper ${t ? "selected" : ""} overlay-${e.type}`}
        role="button"
        tabindex="0"
        aria-label=${a("aria.overlayHandle", e.id)}
        aria-selected=${t ? "true" : "false"}
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
          ${e.id}
          <span class="overlay-type-badge">${e.type}</span>
        </div>
        ${t ? y`<div
              class="overlay-resize"
              data-overlay-id=${e.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : x}
      </div>
    `;
  }
  renderHandle(e) {
    const t = this.selectedNodeIds.has(e.id), i = t && this.selectedNodeIds.size === 1, n = t && this.selectedNodeIds.size > 1, o = t ? Array.from(this.selectedNodeIds).indexOf(e.id) : -1, s = e.visible === !1;
    return y`
      <div
        class=${`handle ${i ? "selected" : ""} ${n ? "multi-selected" : ""} ${t ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
        role="button"
        tabindex="0"
        aria-label=${a("aria.nodeHandle", e.label ?? e.id, e.position.x, e.position.y)}
        aria-selected=${t ? "true" : "false"}
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
        ${e.label ? y`<span class="handle-label">${e.label}</span>` : x}
        ${t && this.selectedNodeIds.size >= 2 ? y`<span class="suggest-badge">${o + 1}</span>` : x}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${a(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${a(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(r) => {
      if (r.stopPropagation(), !this.config) return;
      const l = this.config, c = ti(l, e.id, s);
      this.pushPatch(l, c, `${s ? "show" : "hide"} node ${e.id}`);
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
  renderEntityPicker(e, t, i) {
    const n = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), o = i?.includeDomains ?? [], s = i?.placeholder ?? a("editor.inspector.entityPickerFallbackPlaceholder");
    if (n) {
      const d = (u) => {
        u.stopPropagation(), t((u.detail?.value ?? "").trim());
      };
      return y`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
          .includeDomains=${o}
          @value-changed=${d}
        ></ha-entity-picker>
      `;
    }
    const r = this.hass?.states ?? {}, l = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, c = Object.keys(r).filter((d) => {
      if (o.length === 0) return !0;
      const u = d.split(".")[0];
      return !!u && o.includes(u);
    }).sort();
    return y`
      <input
        type="text"
        list=${l}
        placeholder=${s}
        .value=${e}
        @change=${(d) => {
      t(d.target.value.trim());
    }}
      />
      <datalist id=${l}>
        ${c.map((d) => y`<option value=${d}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return x;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((i) => i.id === this.selectedNodeId);
      if (!e) return x;
      const t = (i, n) => {
        if (!this.config) return;
        const o = this.config, s = {
          ...o,
          nodes: o.nodes.map((r) => r.id === e.id ? { ...r, ...i } : r)
        };
        this.pushPatch(o, s, n);
      };
      return y`
        <div class="inspector">
          <h3>${a("editor.inspector.nodeHeading", e.id)}</h3>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${a("editor.inspector.label")}</span>
              <input
                type="text"
                .value=${e.label ?? ""}
                @change=${(i) => this.onNodeLabelChange(e.id, i)}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${a("editor.inspector.entity")}</span>
              ${this.renderEntityPicker(
        e.entity ?? "",
        (i) => this.setNodeEntity(e.id, i),
        { includeDomains: ["sensor", "binary_sensor", "input_number", "number"] }
      )}
            </label>
          </div>

          <!-- Row 2: Colour | Visible | Show value | Show label -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${a("editor.inspector.colour")}</span>
              <input
                type="color"
                .value=${e.color ?? "#ffffff"}
                @change=${(i) => {
        const n = i.target.value;
        t({ color: n }, `set color of ${e.id}`);
      }}
              />
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${e.visible !== !1}
                @change=${(i) => {
        if (!this.config) return;
        const n = i.target.checked, o = this.config, s = ti(o, e.id, n);
        this.pushPatch(o, s, `set visible of ${e.id}`);
      }}
              />
              <span class="node-cell-label">${a("editor.inspector.visible")}</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${e.show_value !== !1}
                @change=${(i) => {
        const n = i.target.checked;
        t({ show_value: n || void 0 }, `set show_value of ${e.id}`);
      }}
              />
              <span class="node-cell-label">${a("editor.inspector.showValue")}</span>
            </label>
            <label class="node-cell node-cell-toggle">
              <input
                type="checkbox"
                .checked=${e.show_label !== !1}
                @change=${(i) => {
        const n = i.target.checked;
        t({ show_label: n || void 0 }, `set show_label of ${e.id}`);
      }}
              />
              <span class="node-cell-label">${a("editor.inspector.showLabel")}</span>
            </label>
          </div>

          <!-- Row 3: X% | Y% | Size | Opacity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${a("editor.inspector.positionX")}</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(e.position.x))}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = Xt(o, e.id, { x: n, y: e.position.y });
        this.pushPatch(o, s, `move ${e.id} x`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${a("editor.inspector.positionY")}</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(e.position.y))}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = Xt(o, e.id, { x: e.position.x, y: n });
        this.pushPatch(o, s, `move ${e.id} y`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${a("editor.inspector.sizePx")}</span>
              <input
                type="number"
                min="4" max="60" step="1"
                .value=${String(e.size ?? 12)}
                @change=${(i) => {
        const n = parseInt(i.target.value, 10);
        Number.isFinite(n) && t({ size: n }, `set size of ${e.id}`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${a("editor.inspector.opacity")}</span>
              <input
                type="number"
                min="0" max="1" step="0.05"
                .value=${String(e.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = Po(o, e.id, n >= 1 ? void 0 : n);
        this.pushPatch(o, s, `set opacity of ${e.id}`);
      }}
              />
            </label>
          </div>

          <!-- Delete -->
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(e.id)}>${a("editor.inspector.deleteNode")}</button>
          </div>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const e = this.config.flows.find((i) => i.id === this.selectedFlowId);
      if (!e) return x;
      const t = this.config.flows.findIndex((i) => i.id === e.id);
      return y`
        <div class="inspector">
          <h3>${a("editor.inspector.flowHeading", e.id)}</h3>
          <fieldset class="inspector-fieldset">
            <legend class="inspector-legend">${a("editor.inspector.routeAndSensor")}</legend>
            <div class="row">
              <span>${e.from_node} → ${e.to_node}</span>
            </div>
            <label>
              ${a("editor.inspector.entity")}
              ${this.renderEntityPicker(
        e.entity,
        (i) => this.setFlowEntity(e.id, i),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
            </label>
          </fieldset>
          ${this.renderWaypointList(e)}
          <label>
            ${a("editor.inspector.lineStyle")}
            <select
              .value=${e.line_style ?? "corner"}
              @change=${(i) => {
        if (!this.config) return;
        const n = i.target.value, o = this.config, s = Eo(o, e.id, n);
        this.pushPatch(o, s, `set line style of ${e.id}`);
      }}
            >
              ${Qt.map(
        (i) => y`<option value=${i} ?selected=${(e.line_style ?? "corner") === i}>${i}</option>`
      )}
            </select>
          </label>
          <label>
            ${a("editor.inspector.colourOverride")}
            <div class="color-row">
              ${(() => {
        const i = B(e.domain ?? this.config.domain), n = wt(
          e,
          i,
          e.domain ?? this.config.domain,
          1,
          this.config.domain_colors,
          t >= 0 ? t : 0
        );
        return y`
                  <input
                    type="color"
                    .value=${e.color ?? n}
                    @change=${(o) => {
          if (!this.config) return;
          const s = o.target.value, r = this.config, l = Qe(r, e.id, s);
          this.pushPatch(r, l, `set colour of ${e.id}`);
        }}
                  />
                  <span class="color-effective">${e.color ? a("editor.inspector.colourOverrideActive") : a("editor.inspector.colourDomainDefault")}</span>
                  ${e.color ? y`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const o = this.config, s = Qe(o, e.id, void 0);
          this.pushPatch(o, s, `clear colour of ${e.id}`);
        }}>${a("editor.inspector.clearColour")}</button>` : x}
                `;
      })()}
            </div>
          </label>
          <label>
            ${a("editor.inspector.flowOpacity")}
            <div class="inspector-slider-row">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                .value=${String(e.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = Mo(o, e.id, n);
        this.pushPatch(o, s, `set opacity of ${e.id}`);
      }}
              />
              <span>${(e.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            ${a("editor.inspector.flowVisible")}
            <div class="row">
              <input
                type="checkbox"
                .checked=${e.visible !== !1}
                @change=${(i) => {
        if (!this.config) return;
        const n = i.target.checked, o = this.config, s = Oo(o, e.id, n);
        this.pushPatch(o, s, `${n ? "show" : "hide"} flow ${e.id}`);
      }}
              />
              <span>${e.visible !== !1 ? a("editor.inspector.shown") : a("editor.inspector.hidden")}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(e)}
          ${this.renderAnimationSection(e)}
          ${this.renderValueGradientSection(e)}
          <button class="danger" @click=${() => this.removeFlow(e.id)}>${a("editor.inspector.deleteFlow")}</button>
        </div>
      `;
    }
    if (this.selectedOverlayId) {
      const e = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return e ? this.renderOverlayInspector(e) : x;
    }
    return x;
  }
  renderSpeedCurveSection(e) {
    if (!this.config) return y``;
    const t = B(e.domain ?? this.config.domain), i = ve(e, t), n = e.speed_curve_override ?? {}, o = (l, c, p) => y`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${c}${p ? y` <small>(${p})</small>` : x}</label>
        <input
          type="number"
          step="any"
          min="0"
          placeholder=${typeof i[l] == "number" ? i[l].toFixed(0) : ""}
          .value=${n[l] !== void 0 ? String(n[l]) : ""}
          @change=${(d) => {
      if (!this.config) return;
      const u = d.target.value.trim();
      if (u === "") {
        const h = {};
        for (const v of Object.keys(n))
          v !== l && (h[v] = n[v]);
        const f = this.config, g = ii(f, e.id, h);
        this.pushPatch(f, g, `update speed curve ${l} for ${e.id}`);
      } else {
        const h = parseFloat(u);
        if (!Number.isFinite(h)) return;
        const f = this.config, g = ii(f, e.id, { ...n, [l]: h });
        this.pushPatch(f, g, `update speed curve ${l} for ${e.id}`);
      }
    }}
        />
      </div>
    `, r = [i.threshold, i.p50, i.peak].map((l) => `${(L(l, i) / 1e3).toFixed(1)}s`);
    return y`
      <details class="speed-curve-details">
        <summary>${a("editor.inspector.speedCurveOverrideSummary")}</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            ${a("editor.inspector.speedCurveHint", t.unit_label, e.domain ?? this.config.domain)}
          </p>
          ${o("threshold", a("editor.inspector.threshold"), t.unit_label)}
          ${o("p50", a("editor.inspector.medianP50"), t.unit_label)}
          ${o("peak", a("editor.inspector.peak"), t.unit_label)}
          ${o("max_duration", a("editor.inspector.maxDuration"), a("editor.inspector.ms"))}
          ${o("min_duration", a("editor.inspector.minDuration"), a("editor.inspector.ms"))}
          ${o("steepness", a("editor.inspector.steepness"), a("editor.inspector.k"))}
          <div class="speed-curve-preview">
            <span>${a("editor.inspector.previewAtPoints")}</span>
            <strong>${r[0]}</strong>
            /
            <strong>${r[1]}</strong>
            /
            <strong>${r[2]}</strong>
          </div>
          ${Object.keys(n).length > 0 ? y`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const l = this.config, c = To(l, e.id);
      this.pushPatch(l, c, `reset speed curve for ${e.id}`);
    }}>${a("editor.inspector.resetToDomainDefaults")}</button>` : x}
        </div>
      </details>
    `;
  }
  renderAnimationSection(e) {
    if (!this.config) return y``;
    const t = e.animation ?? {}, i = t.animation_style ?? "dots", n = (d) => {
      if (!this.config) return;
      const u = this.config, h = zo(u, e.id, d);
      this.pushPatch(u, h, `update animation for ${e.id}`);
    }, s = !(/* @__PURE__ */ new Set(["dash", "pulse", "fluid", "none"])).has(i), r = i === "pulse", l = i === "trail", c = i === "dash", p = e.color ?? "#4ADE80";
    return y`
      <details class="anim-details" open>
        <summary>${a("editor.inspector.animation")}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(i, t, p)}
            </svg>
          </div>

          <label>${a("editor.inspector.style")}
            <select
              .value=${i}
              @change=${(d) => {
      n({ animation_style: d.target.value });
    }}
            >
              ${te.map(
      (d) => y`<option value=${d} ?selected=${i === d}>${d}</option>`
    )}
            </select>
          </label>

          ${s ? y`
            <label>${a("editor.inspector.particleShape")}
              <select
                .value=${t.particle_shape ?? "circle"}
                @change=${(d) => {
      n({ particle_shape: d.target.value });
    }}
              >
                ${ee.map(
      (d) => y`<option value=${d} ?selected=${(t.particle_shape ?? "circle") === d}>${d}</option>`
    )}
              </select>
            </label>
            ${(t.particle_shape ?? "circle") === "custom_svg" ? y`
              <label>${a("editor.inspector.svgPathLabel")}
                <input type="text"
                  placeholder=${a("editor.inspector.svgPathPlaceholder")}
                  .value=${t.custom_svg_path ?? ""}
                  @change=${(d) => {
      n({ custom_svg_path: d.target.value.trim() });
    }}
                />
                <svg class="custom-svg-preview" viewBox="-20 -20 40 40" width="40" height="40"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d=${t.custom_svg_path || "M 0 -8 L 5 8 L -5 8 Z"}
                        fill=${p} />
                </svg>
              </label>
            ` : x}
          ` : x}

          <label>${a("editor.inspector.direction")}
            <select
              .value=${t.direction ?? "auto"}
              @change=${(d) => {
      n({ direction: d.target.value });
    }}
            >
              ${ie.map(
      (d) => y`<option value=${d} ?selected=${(t.direction ?? "auto") === d}>${d}</option>`
    )}
            </select>
          </label>

          <label>${a("editor.inspector.particleSize")}
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(t.particle_size ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ particle_size: u });
    }}
              />
              <span>${(t.particle_size ?? 1).toFixed(1)}×</span>
            </div>
          </label>

          <label>${a("editor.inspector.particleCount")}
            <input type="number" min="1" max="20" step="1"
              placeholder=${a("editor.inspector.profileDefaultPlaceholder")}
              .value=${t.particle_count !== void 0 ? String(t.particle_count) : ""}
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

          <label>${a("editor.inspector.particleSpacing")}
            <select
              .value=${t.particle_spacing ?? "even"}
              @change=${(d) => {
      n({ particle_spacing: d.target.value });
    }}
            >
              ${ne.map(
      (d) => y`<option value=${d} ?selected=${(t.particle_spacing ?? "even") === d}>${d}</option>`
    )}
            </select>
          </label>

          ${t.particle_spacing === "clustered" ? y`
            <label>${a("editor.inspector.clusterSize")}
              <input type="number" min="1" max="10" step="1"
                .value=${String(t.cluster_size ?? 3)}
                @change=${(d) => {
      const u = parseInt(d.target.value, 10);
      Number.isFinite(u) && u >= 1 && n({ cluster_size: u });
    }}
              />
            </label>
            <label>${a("editor.inspector.clusterGap")}
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(t.cluster_gap ?? 2)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ cluster_gap: u });
    }}
              />
            </label>
          ` : x}

          ${t.particle_spacing === "pulse" ? y`
            <label>${a("editor.inspector.pulseFrequencyHz")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.pulse_frequency ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ pulse_frequency: u });
    }}
              />
            </label>
            <label>${a("editor.inspector.pulseRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(t.pulse_ratio ?? 0.3)}
                  @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ pulse_ratio: u });
    }}
                />
                <span>${(t.pulse_ratio ?? 0.3).toFixed(2)}</span>
              </div>
            </label>
          ` : x}

          ${t.particle_spacing === "wave_spacing" || t.particle_spacing === "wave_lateral" ? y`
            <label>${a("editor.inspector.waveFrequency")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.wave_frequency ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ wave_frequency: u });
    }}
              />
            </label>
            <label>${t.particle_spacing === "wave_lateral" ? a("editor.inspector.waveAmplitudePx") : a("editor.inspector.waveAmplitude01")}
              <input type="number"
                min=${t.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                max=${t.particle_spacing === "wave_lateral" ? "40" : "1"}
                step=${t.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                .value=${String(t.wave_amplitude ?? (t.particle_spacing === "wave_lateral" ? 8 : 0.7))}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ wave_amplitude: u });
    }}
              />
            </label>
          ` : x}

          <label>${a("editor.inspector.glowIntensity")}
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(t.glow_intensity ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ glow_intensity: u });
    }}
              />
              <span>${(t.glow_intensity ?? 1).toFixed(1)}</span>
            </div>
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${t.shimmer === !0}
              @change=${(d) => n({ shimmer: d.target.checked })}
            />
            ${a("editor.inspector.shimmerThreshold")}
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${t.flicker === !0}
              @change=${(d) => n({ flicker: d.target.checked })}
            />
            ${a("editor.inspector.flicker")}
          </label>

          ${r ? y`
            <label>${a("editor.inspector.pulseWidthPx")}
              <input type="number" min="1" max="20" step="0.5"
                .value=${String(t.pulse_width ?? 2)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ pulse_width: u });
    }}
              />
            </label>
          ` : x}

          ${l ? y`
            <label>${a("editor.inspector.trailLength")}
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(t.trail_length ?? 2)}
                  @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ trail_length: u });
    }}
                />
                <span>${(t.trail_length ?? 2).toFixed(2)}×</span>
              </div>
            </label>
          ` : x}

          ${c ? y`
            <label>${a("editor.inspector.dashGapRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(t.dash_gap ?? 0.5)}
                  @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ dash_gap: u });
    }}
                />
                <span>${(t.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : x}

          ${e.animation && Object.keys(e.animation).length > 0 ? y`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const d = this.config, u = Ro(d, e.id);
      this.pushPatch(d, u, `reset animation for ${e.id}`);
    }}>${a("editor.inspector.resetToDefaults")}</button>` : x}
        </div>
      </details>
    `;
  }
  /**
   * Render a small inline SVG preview strip showing the current animation style.
   * Uses CSS animations (not SVG animateMotion) so it works even with no live data.
   */
  renderAnimPreview(e, t, i) {
    const n = 4 * (t.particle_size ?? 1), o = Math.min(t.particle_count ?? 3, 8);
    if (e === "none")
      return y`<line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="2" stroke-opacity="0.3"/>`;
    if (e === "dash") {
      const r = t.dash_gap ?? 0.5, l = 14, c = l * r;
      return y`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="3"
          stroke-dasharray="${l} ${c}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${l + c}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    if (e === "fluid")
      return y`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      `;
    if (e === "pulse")
      return y`
        ${[40, 90, 140].map(
        (l, c) => y`
            <circle cx=${l} cy="20" r="0" fill="none"
              stroke=${i} stroke-width=${t.pulse_width ?? 2}>
              <animate attributeName="r" values="0;12;0" dur="1.2s" repeatCount="indefinite"
                begin="${(c * 0.4).toFixed(1)}s"/>
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite"
                begin="${(c * 0.4).toFixed(1)}s"/>
            </circle>
          `
      )}
      `;
    if (t.particle_spacing === "wave_lateral") {
      const r = Array.from({ length: o }, (l, c) => (c + 0.5) / o * 180 + 10);
      return y`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (l, c) => y`
            <circle cx=${l} cy="20" r=${n} fill=${i} opacity="0">
              <animate attributeName="cx" values="${l};190;10;${l}" dur="1.4s"
                repeatCount="indefinite" begin="${(c / o * -1.4).toFixed(2)}s"/>
              <animate attributeName="cy" values="20;${10 + (c % 2 === 0 ? 6 : -6)};20;${10 + (c % 2 === 0 ? -6 : 6)};20"
                dur="1.4s" repeatCount="indefinite" begin="${(c / o * -1.4).toFixed(2)}s"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
                repeatCount="indefinite" begin="${(c / o * -1.4).toFixed(2)}s"/>
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
  renderWaypointList(e) {
    if (!this.config) return y``;
    const t = new Map(this.config.nodes.map((s) => [s.id, s])), i = t.get(e.from_node), n = t.get(e.to_node), o = () => {
      if (!this.config) return;
      const s = [
        ...i ? [i.position] : [],
        ...e.waypoints,
        ...n ? [n.position] : []
      ];
      let r = 0, l = 0;
      for (let g = 0; g < s.length - 1; g++) {
        const v = s[g], m = s[g + 1], b = Math.hypot(m.x - v.x, m.y - v.y);
        b > l && (l = b, r = g);
      }
      const c = s[r], p = s[r + 1], d = { x: (c.x + p.x) / 2, y: (c.y + p.y) / 2 }, u = r > 0 ? r - 1 + 1 : 0, h = this.config, f = qe(h, e.id, u, d);
      this.pushPatch(h, f, `add waypoint to ${e.id}`);
    };
    return y`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${a("editor.inspector.waypoints")}
          <span class="waypoint-count">${e.waypoints.length}</span>
        </h4>

        ${e.waypoints.length === 0 ? y`<div class="waypoint-empty">${a("editor.inspector.waypointEmpty")}</div>` : y`
            <ul class="waypoint-list">
              ${e.waypoints.map((s, r) => y`
                <li class="waypoint-row">
                  <span class="waypoint-index">${a("editor.inspector.waypointSectionHash")}${r + 1}</span>
                  <label class="waypoint-coord">
                    ${a("editor.inspector.waypointCoordX")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.x.toFixed(1)}
                      @change=${(l) => {
      if (!this.config) return;
      const c = parseFloat(l.target.value);
      if (!Number.isFinite(c)) return;
      const p = this.config, d = Kt(p, e.id, r, { x: c, y: s.y });
      this.pushPatch(p, d, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    ${a("editor.inspector.waypointCoordY")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.y.toFixed(1)}
                      @change=${(l) => {
      if (!this.config) return;
      const c = parseFloat(l.target.value);
      if (!Number.isFinite(c)) return;
      const p = this.config, d = Kt(p, e.id, r, { x: s.x, y: c });
      this.pushPatch(p, d, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${a("editor.inspector.deleteWaypointAria", r)} title=${a("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const l = this.config, c = Ye(l, e.id, r);
      this.pushPatch(l, c, `delete waypoint ${r} of ${e.id}`);
    }}
                  >×</button>
                </li>
              `)}
            </ul>
          `}

        <button type="button" class="ghost full-width" aria-label=${a("editor.inspector.addWaypointOnFlowAria")} @click=${o}>
          ${a("editor.inspector.addWaypoint")}
        </button>
      </div>
    `;
  }
  renderValueGradientSection(e) {
    if (!this.config) return y``;
    const t = e.value_gradient, i = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, n = (s) => {
      if (!this.config) return;
      const r = this.config, l = Bo(r, e.id, s);
      this.pushPatch(r, l, `update gradient for ${e.id}`);
    };
    let o = x;
    if (t && t.low_color && t.high_color)
      try {
        const s = ki(
          (t.low_value + t.high_value) / 2,
          t
        ), r = `background: linear-gradient(to right, ${t.low_color}, ${s}, ${t.high_color});`;
        o = y`
          <div class="gradient-preview-bar" style=${r}></div>
          <div class="gradient-preview-labels">
            <span>${t.low_color}</span><span>${t.high_color}</span>
          </div>
        `;
      } catch {
      }
    return y`
      <div class="gradient-section">
        <h4 class="gradient-section-header">${a("editor.inspector.valueGradient")}</h4>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!t}
            @change=${(s) => {
      if (!this.config) return;
      const r = s.target.checked, l = this.config, c = r ? Do(l, e.id, i) : oi(l, e.id);
      this.pushPatch(l, c, `${r ? "enable" : "disable"} gradient for ${e.id}`);
    }}
          />
          ${a("editor.inspector.enableGradient")}
        </label>

        ${t ? y`
          <label>${a("editor.inspector.gradientEntity")}
            <input type="text" placeholder=${a("editor.inspector.gradientEntityPlaceholder")}
              .value=${t.entity}
              @change=${(s) => n({ entity: s.target.value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>${a("editor.inspector.lowValue")}
              <input type="number" step="any"
                .value=${String(t.low_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && n({ low_value: r });
    }}
              />
            </label>
            <label>${a("editor.inspector.lowColour")}
              <div class="color-row">
                <input type="color"
                  .value=${t.low_color}
                  @input=${(s) => n({ low_color: s.target.value })}
                />
                <span>${t.low_color}</span>
              </div>
            </label>
          </div>

          <div class="gradient-row">
            <label>${a("editor.inspector.highValue")}
              <input type="number" step="any"
                .value=${String(t.high_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && n({ high_value: r });
    }}
              />
            </label>
            <label>${a("editor.inspector.highColour")}
              <div class="color-row">
                <input type="color"
                  .value=${t.high_color}
                  @input=${(s) => n({ high_color: s.target.value })}
                />
                <span>${t.high_color}</span>
              </div>
            </label>
          </div>

          <label>${a("editor.inspector.applyGradientTo")}
            <select
              .value=${t.mode ?? "both"}
              @change=${(s) => {
      n({ mode: s.target.value });
    }}
            >
              <option value="flow" ?selected=${t.mode === "flow"}>${a("editor.inspector.gradientModeFlow")}</option>
              <option value="line" ?selected=${t.mode === "line"}>${a("editor.inspector.gradientModeLine")}</option>
              <option value="both" ?selected=${(t.mode ?? "both") === "both"}>${a("editor.inspector.gradientModeBoth")}</option>
            </select>
          </label>

          ${o}

          <button class="ghost" @click=${() => {
      if (!this.config) return;
      const s = this.config, r = oi(s, e.id);
      this.pushPatch(s, r, `disable gradient for ${e.id}`);
    }}>${a("editor.inspector.removeGradient")}</button>
        ` : x}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return x;
    const e = this.config.animation ?? {};
    return y`
      <details class="panel anim-global-panel" open>
        <summary>${a("editor.inspector.animationGlobalSummary")}</summary>
        <div class="panel-body">
          <label>
            ${a("editor.inspector.fpsCap")}
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(e.fps ?? 60)}
                @change=${(t) => {
      if (!this.config) return;
      const i = parseInt(t.target.value, 10), n = this.config, o = ni(n, { fps: i });
      this.pushPatch(n, o, "set animation fps");
    }}
              />
              <span>${e.fps ?? 60} ${a("editor.inspector.fpsSuffix")}</span>
            </div>
          </label>
          <label class="visibility-row">
            <input type="checkbox"
              .checked=${e.smooth_speed !== !1}
              @change=${(t) => {
      if (!this.config) return;
      const i = t.target.checked, n = this.config, o = ni(n, { smooth_speed: i });
      this.pushPatch(n, o, "set smooth_speed");
    }}
            />
            <span class="visibility-label">${a("editor.stateA.smoothSpeed")}</span>
            <span class="visibility-val">${e.smooth_speed !== !1 ? a("editor.inspector.on") : a("editor.inspector.off")}</span>
          </label>
          <p class="hint-sub">${a("editor.inspector.smoothSpeedHint")}</p>
        </div>
      </details>
    `;
  }
  renderOverlayInspector(e) {
    const t = e.size ?? { width: 20, height: 15 }, i = e.visible !== !1, n = e.opacity ?? 1;
    return y`
      <div class="inspector overlay-inspector">
        <h3>${a("editor.inspector.overlayHeading", e.id)}</h3>
        <div class="row size-row">
          <label>
            ${a("editor.inspector.width")}
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(t.width)}
              @change=${(o) => this.onOverlaySizeChange(e.id, "width", o)}
            />
          </label>
          <label>
            ${a("editor.inspector.height")}
            <input
              type="number"
              min="2"
              max="100"
              step="0.5"
              .value=${String(t.height)}
              @change=${(o) => this.onOverlaySizeChange(e.id, "height", o)}
            />
          </label>
        </div>
        <label class="toggle-label">
          ${a("editor.inspector.visible")}
          <input
            type="checkbox"
            .checked=${i}
            @change=${(o) => {
      if (!this.config) return;
      const s = o.target.checked, r = this.config, l = Ao(r, e.id, s);
      this.pushPatch(r, l, `toggle overlay ${e.id} visible`);
    }}
          />
        </label>
        <label>
          ${a("editor.inspector.opacity")}
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
      const r = this.config, l = Co(r, e.id, s);
      this.pushPatch(r, l, `edit overlay ${e.id} opacity`);
    }}
          />
          <span>${Math.round(n * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(e)}
        <button class="danger" @click=${() => this.removeOverlay(e.id)}>${a("editor.inspector.deleteOverlay")}</button>
      </div>
    `;
  }
  renderCardConfigEditor(e) {
    const t = this.customConfigDraft || JSON.stringify(e.card ?? { type: "entity", entity: "sensor.example_sensor" }, null, 2);
    return y`
      <label>
        ${a("editor.inspector.cardConfig")}
        <textarea
          rows="8"
          spellcheck="false"
          placeholder=${a("editor.inspector.cardConfigPlaceholder")}
          .value=${t}
          @input=${(i) => {
      this.customConfigDraft = i.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? y`<div class="custom-config-error">${this.customConfigError}</div>` : x}
      <p class="hint-sub">
        ${a("editor.inspector.cardConfigHintExamples")}
      </p>
      <p class="hint-sub">
        ${a("editor.inspector.cardConfigHintUrls")}
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(e.id)}>${a("editor.inspector.applyCardConfig")}</button>
      </div>
    `;
  }
  renderOpacityPanel() {
    if (!this.config) return x;
    const e = this.config.opacity ?? {}, t = (i, n, o = 1) => {
      const s = e[i] ?? o;
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
        const c = this.config, p = Je(c, i, l);
        this.config = p, this.commitToHa(p);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const c = this.config, p = Je(c, i, l);
        this.pushPatch(c, p, `set opacity.${i}`);
      }}
          />
          <span class="opacity-val">${s.toFixed(2)}</span>
        </label>
      `;
    };
    return y`
      <details class="panel opacity-panel" open>
        <summary>${a("editor.inspector.opacitySummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${a("editor.inspector.opacityHint")}
          </p>
          ${t("background", a("editor.inspector.opacityBackground"))}
          ${t("darken", a("editor.inspector.opacityDarken"), 0)}
          ${t("nodes", a("editor.inspector.opacityNodes"))}
          ${t("flows", a("editor.inspector.opacityFlows"))}
          ${t("dots", a("editor.inspector.opacityDots"))}
          ${t("glow", a("editor.inspector.opacityGlow"))}
          ${t("labels", a("editor.inspector.opacityLabels"))}
          ${t("values", a("editor.inspector.opacityValues"))}
          ${t("overlays", a("editor.inspector.opacityOverlays"))}
        </div>
      </details>
    `;
  }
  renderDomainColorsPanel() {
    if (!this.config) return x;
    const e = this.config.domain_colors ?? {}, t = this.config.domain ?? "energy", i = Ot[t] ?? Ot.generic, n = (o, s) => {
      const r = `editor.domainRoles.${t}.${o}`, l = a(r);
      return l !== r ? l : s;
    };
    return y`
      <details class="panel domain-colors-panel">
        <summary>${a("editor.inspector.domainColoursSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${a("editor.inspector.domainColoursHint")}
          </p>
          ${i.roles.map((o) => {
      const s = e[o.key], r = o.default, l = n(o.key, o.label);
      return y`
              <div class="color-picker-row">
                <span class="color-picker-label">${l}</span>
                <input
                  type="color"
                  .value=${s ?? r}
                  @change=${(c) => {
        if (!this.config) return;
        const p = c.target.value, d = this.config, u = ei(d, o.key, p);
        this.pushPatch(d, u, `set domain_colors.${o.key}`);
      }}
                />
                <span class="color-picker-value">${s || a("editor.inspector.colourDefaultSuffix", r)}</span>
                ${s ? y`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const c = this.config, p = ei(c, o.key, void 0);
        this.pushPatch(c, p, `reset domain_colors.${o.key}`);
      }}>${a("editor.inspector.reset")}</button>` : x}
              </div>
            `;
    })}
        </div>
      </details>
    `;
  }
  renderVisibilityPanel() {
    if (!this.config) return x;
    const e = this.config.visibility ?? {}, t = (i, n) => {
      const o = e[i] !== !1;
      return y`
        <label class="visibility-row">
          <span class="visibility-label">${n}</span>
          <input
            type="checkbox"
            .checked=${o}
            @change=${(s) => {
        if (!this.config) return;
        const r = s.target.checked, l = this.config, c = Io(l, i, r);
        this.pushPatch(l, c, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${a(o ? "editor.inspector.visibilityVisible" : "editor.inspector.visibilityHidden")}</span>
        </label>
      `;
    };
    return y`
      <details class="panel visibility-panel">
        <summary>${a("editor.inspector.visibilitySummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${a("editor.inspector.visibilityHint")}
          </p>
          ${t("nodes", a("editor.inspector.opacityNodes"))}
          ${t("lines", a("editor.inspector.visibilityFlowLines"))}
          ${t("dots", a("editor.inspector.visibilityAnimatedDots"))}
          ${t("labels", a("editor.inspector.opacityLabels"))}
          ${t("values", a("editor.inspector.opacityValues"))}
          ${t("overlays", a("editor.toolbar.overlays"))}
        </div>
      </details>
    `;
  }
  renderDefaultsPanel() {
    if (!this.config) return x;
    const e = this.config.defaults ?? {}, t = (i, n, o) => {
      const s = e[i] ?? o.defaultVal;
      return y`
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
        const l = parseFloat(r.target.value);
        if (!Number.isFinite(l)) return;
        const c = Math.max(o.min, Math.min(o.max, l)), p = this.config, d = Fo(p, i, c);
        this.pushPatch(p, d, `set defaults.${i}`);
      }}
          />
          <span class="defaults-unit">${s}</span>
        </label>
      `;
    };
    return y`
      <details class="panel defaults-panel" open>
        <summary>${a("editor.inspector.defaultsSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${a("editor.inspector.defaultsHint")}
          </p>
          ${t("node_radius", a("editor.stateA.nodeRadius"), { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${t("dot_radius", a("editor.stateA.dotRadius"), { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${t("line_width", a("editor.stateA.lineWidth"), { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${t("burst_trigger_ratio", a("editor.inspector.burstTriggerRatio"), { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${t("burst_sustain_ms", a("editor.inspector.burstSustainMs"), { min: 1e3, max: 3e4, step: 500, defaultVal: 5e3 })}
          ${t("burst_max_particles", a("editor.inspector.burstMaxParticles"), { min: 3, max: 50, step: 1, defaultVal: 20 })}
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
        ${this.renderWeatherPanel()}
        ${this.renderGlobalAnimationPanel()}
        ${this.renderOpacityPanel()}
        ${this.renderDomainColorsPanel()}
        ${this.renderVisibilityPanel()}
        ${this.renderDefaultsPanel()}
      </div>
    `;
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderMultiSelectToolbar() {
    const e = this.selectedNodeIds.size;
    if (e < 2) return x;
    const t = this.selectedNodeIds, i = Array.from(t)[0];
    return y`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${a("editor.inspector.multiselectCount", e)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? "suggest-path-busy" : ""}"
          aria-label=${a("editor.inspector.suggestPathBetweenAria")}
          title=${a(e === 2 ? "editor.inspector.suggestPathBetweenTitle" : "editor.inspector.suggestPathPickTwoTitle")}
          ?disabled=${e !== 2 || this.suggestBusy}
          @click=${() => void this.runSuggestPath()}
        >${this.suggestBusy ? y`${a("editor.toolbar.suggestPathFinding")}<span class="suggest-path-spinner" aria-hidden="true"></span>` : a("editor.toolbar.suggestPath")}</button>
        <button type="button" class="ms-btn" aria-label=${a("editor.toolbar.hideSelectedNodesAria")} @click=${() => this.bulkHide(t)}>${a("editor.toolbar.hideSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${a("editor.toolbar.showSelectedNodesAria")} @click=${() => this.bulkShow(t)}>${a("editor.toolbar.showSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${a("editor.toolbar.alignSelectedHorizontalAria")} @click=${() => this.bulkAlignH(t, i)}>${a("editor.toolbar.alignHorizontalShort")}</button>
        <button type="button" class="ms-btn" aria-label=${a("editor.toolbar.alignSelectedVerticalAria")} @click=${() => this.bulkAlignV(t, i)}>${a("editor.toolbar.alignVerticalShort")}</button>
        <button type="button" class="ms-btn danger" aria-label=${a("editor.toolbar.deleteSelectedNodesAria")} @click=${() => this.bulkDelete(t)}>${a("editor.toolbar.deleteSelected")}</button>
        <button type="button" class="ms-btn ghost" aria-label=${a("editor.toolbar.clearMultiSelectionAria")} @click=${() => {
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
    }}>${a("editor.toolbar.deselect")}</button>
      </div>
    `;
  }
  bulkHide(e) {
    if (!this.config) return;
    const t = this.config, i = Ge(t, e, !1);
    this.pushPatch(t, i, `hide ${e.size} nodes`);
  }
  bulkShow(e) {
    if (!this.config) return;
    const t = this.config, i = Ge(t, e, !0);
    this.pushPatch(t, i, `show ${e.size} nodes`);
  }
  bulkAlignH(e, t) {
    if (!this.config) return;
    const i = this.config, n = ho(i, e, t);
    this.pushPatch(i, n, `align ${e.size} nodes horizontally`);
  }
  bulkAlignV(e, t) {
    if (!this.config) return;
    const i = this.config, n = fo(i, e, t);
    this.pushPatch(i, n, `align ${e.size} nodes vertically`);
  }
  bulkDelete(e) {
    if (!this.config || !window.confirm(a("editor.inspector.deleteNodesConfirm", e.size))) return;
    const t = this.config, i = uo(t, e);
    this.pushPatch(t, i, `delete ${e.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderWeatherPanel() {
    if (!this.config) return x;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {}), i = e.weather_entity && this.hass ? this.hass.states[e.weather_entity]?.state : void 0;
    return y`
      <details class="weather-panel" ?open=${t.length > 0 || !!e.weather_entity}>
        <summary>${a("editor.inspector.weatherPanelSummary")}</summary>
        <div class="weather-body">
          <label>
            ${a("editor.inspector.defaultImageUrl")}
            <input
              type="text"
              .value=${e.default}
              @change=${this.onDefaultBgChange}
              placeholder=${a("editor.inspector.defaultBgPlaceholder")}
            />
            ${e.default ? y`<img class="weather-thumb" src=${e.default} alt=${a("editor.inspector.defaultBgAlt")} />` : x}
          </label>
          <label>
            ${a("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(
      e.weather_entity ?? "",
      (n) => this.setWeatherEntityValue(n),
      { includeDomains: ["weather"], placeholder: a("editor.inspector.weatherPlaceholder") }
    )}
          </label>
          ${i !== void 0 ? y`<div class="weather-live-state">
                ${a("editor.inspector.currentState")} <strong>${i}</strong>
                ${e.weather_states?.[i] ? y` → <span class="weather-match-ok">${a("editor.inspector.weatherMatched")}</span>` : y` → <span class="weather-match-miss">${a("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : x}
          <label>
            ${a("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(
      e.sun_entity ?? "",
      (n) => {
        if (!this.config) return;
        const o = this.config, s = yo(o, n || void 0);
        this.pushPatch(o, s, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: a("editor.inspector.sunPlaceholder") }
    )}
          </label>
          ${e.sun_entity && this.hass?.states[e.sun_entity] ? y`<div class="weather-live-state">
                ${a("editor.inspector.sunStateLabel")} <strong>${this.hass.states[e.sun_entity]?.state === "above_horizon" ? a("editor.inspector.sunAbove") : a("editor.inspector.sunBelow")}</strong>
              </div>` : x}
          <label>
            ${a("editor.inspector.fadeTransitionSeconds")}
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              .value=${String(Math.round((e.transition_duration ?? 5e3) / 1e3))}
              @change=${(n) => {
      if (!this.config) return;
      const o = parseFloat(n.target.value);
      if (!Number.isFinite(o) || o < 0) return;
      const s = this.config, r = vo(s, o * 1e3);
      this.pushPatch(s, r, "set background transition duration");
    }}
            />
          </label>
          <div class="weather-states">
            <div class="weather-states-header">
              <span>${a("editor.inspector.weatherStateColumn")}</span>
              <span>${a("editor.inspector.weatherImageUrlColumn")}</span>
              <span></span>
            </div>
            ${t.map(
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
                    placeholder=${a("editor.inspector.weatherRowPlaceholder")}
                  />
                  <div class="weather-row-end">
                    ${o ? y`<img class="weather-thumb" src=${o} alt=${n} />` : x}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(n)}>
                      ${a("editor.inspector.remove")}
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${P.KNOWN_WEATHER_STATES.map(
      (n) => y`<option value=${n}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${a("editor.inspector.addWeatherState")}</button>
          </div>
          <details class="hint-details">
            <summary>${a("editor.inspector.metNoReferenceSummary")}</summary>
            <div class="hint-states">
              ${P.KNOWN_WEATHER_STATES.map(
      (n) => y`<code>${n}</code>`
    )}
              <p class="hint-sub">
                ${a("editor.inspector.metNoHint")}
              </p>
            </div>
          </details>
        </div>
      </details>
    `;
  }
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), i = this.config, n = bo(i, t || void 0);
    this.pushPatch(i, n, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const n = this.config, o = No(n, e, i);
    o !== n && this.pushPatch(n, o, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, o = Ke(n, e, i);
    this.pushPatch(n, o, `edit weather image ${e}`);
  }
  // -- toolbar --
  // -- suggest path --
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new Worker(new URL(
          /* @vite-ignore */
          "" + new URL("assets/pathfinding.worker-BPxZVwUM.js", import.meta.url).href,
          import.meta.url
        ), {
          type: "module"
        });
      } catch {
        this._pathWorker = void 0;
        return;
      }
      this._pathWorker.onmessage = (e) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const t = this._pathPendingSelection;
        if (this._pathPendingSelection = null, !t || !this.config) return;
        const i = e.data;
        if (i.error) {
          this.config.debug && console.error("[FlowMe] pathfinding worker error:", i.error), this.runPathfindingMainThread(t.fromId, t.toId);
          return;
        }
        this.applySuggestPathWorkerResult(
          {
            waypoints: i.waypoints ?? [],
            edgesUsable: i.edgesUsable ?? !1,
            elapsedMs: i.elapsedMs ?? 0
          },
          t.fromId,
          t.toId
        );
      }, this._pathWorker.onerror = (e) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const t = this._pathPendingSelection;
        this._pathPendingSelection = null, this.config?.debug && console.error("[FlowMe] pathfinding worker error:", e), t && this.runPathfindingMainThread(t.fromId, t.toId);
      };
    }
  }
  applySuggestPathWorkerResult(e, t, i) {
    if (!e.edgesUsable) {
      this.errorMessage = a("editor.inspector.suggestCorsError"), this.suggestPreview = null;
      return;
    }
    this.suggestPreview = {
      fromNodeId: t,
      toNodeId: i,
      waypoints: e.waypoints,
      edgesUsable: e.edgesUsable,
      elapsedMs: e.elapsedMs
    };
  }
  async runPathfindingMainThread(e, t) {
    if (!this.config) return;
    const i = this.config.nodes.find((o) => o.id === e), n = this.config.nodes.find((o) => o.id === t);
    if (!(!i || !n)) {
      this.suggestBusy = !0;
      try {
        const o = await os({
          imageUrl: this.config.background.default,
          from: i.position,
          to: n.position
        });
        if (!o.edgesUsable) {
          this.errorMessage = a("editor.inspector.suggestCorsError"), this.suggestPreview = null;
          return;
        }
        this.applySuggestPathWorkerResult(o, e, t);
      } catch (o) {
        this.errorMessage = a(
          "editor.inspector.suggestAutoRouteFailed",
          o instanceof Error ? o.message : String(o)
        ), this.suggestPreview = null;
      } finally {
        this.suggestBusy = !1;
      }
    }
  }
  async runSuggestPath() {
    if (!this.config || this.selectedNodeIds.size !== 2 || this._pathWorkerPending) return;
    const [e, t] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((l) => l.id === e), n = this.config.nodes.find((l) => l.id === t);
    if (!i || !n)
      return;
    const o = this.config.background?.default ?? "";
    if (typeof Worker > "u") {
      await this.runPathfindingMainThread(e, t);
      return;
    }
    if (this.initPathWorker(), !this._pathWorker) {
      await this.runPathfindingMainThread(e, t);
      return;
    }
    this.suggestBusy = !0;
    const s = await ss(o);
    if (!s) {
      this.suggestBusy = !1, this.errorMessage = a("editor.inspector.suggestCorsError"), this.suggestPreview = null;
      return;
    }
    this._pathWorkerPending = !0, this._pathPendingSelection = { fromId: e, toId: t };
    const r = new Uint8ClampedArray(s.rgba);
    this._pathWorker.postMessage(
      {
        rgba: r.buffer,
        width: s.width,
        height: s.height,
        fromPos: i.position,
        toPos: n.position,
        cellSize: we
      },
      [r.buffer]
    );
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config) return x;
    const e = this.config.nodes.find((o) => o.id === this.suggestPreview.fromNodeId), t = this.config.nodes.find((o) => o.id === this.suggestPreview.toNodeId);
    if (!e || !t) return x;
    const n = [
      e.position,
      ...this.suggestPreview.waypoints,
      t.position
    ].map((o) => `${o.x.toFixed(2)},${o.y.toFixed(2)}`).join(" ");
    return y`
      <svg class="suggest-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points=${n} />
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
        <span>${a("editor.suggestBar.message")}</span>
        <span>${a("editor.inspector.suggestPreviewWaypoints", this.suggestPreview.waypoints.length)}</span>
        <button type="button" aria-label=${a("editor.toolbar.acceptPath")} @click=${this.acceptSuggestion}>${a("editor.inspector.accept")}</button>
        <button type="button" class="ghost" aria-label=${a("editor.toolbar.cancelPath")} @click=${this.cancelSuggestion}>${a("editor.toolbar.cancel")}</button>
      </div>
    ` : x;
  }
  // -- inspector edits --
  onNodeLabelChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, o = {
      ...n,
      nodes: n.nodes.map((s) => s.id === e ? { ...s, label: i || void 0 } : s)
    };
    this.pushPatch(n, o, `rename ${e}`);
  }
  setNodeEntity(e, t) {
    if (!this.config) return;
    const i = this.config, n = t.trim(), o = {
      ...i,
      nodes: i.nodes.map(
        (s) => s.id === e ? { ...s, entity: n || void 0 } : s
      )
    };
    this.pushPatch(i, o, `edit entity of ${e}`);
  }
  setFlowEntity(e, t) {
    if (!this.config) return;
    const i = this.config, n = t.trim();
    if (!n) return;
    const o = {
      ...i,
      flows: i.flows.map(
        (s) => s.id === e ? { ...s, entity: n } : s
      )
    };
    this.pushPatch(i, o, `edit entity of ${e}`);
  }
  onOverlaySizeChange(e, t, i) {
    if (!this.config) return;
    const n = (this.config.overlays ?? []).find((c) => c.id === e);
    if (!n) return;
    const o = n.size ?? { width: 20, height: 15 }, s = Number(i.target.value);
    if (!Number.isFinite(s) || s <= 0) return;
    const r = this.config, l = Ze(r, e, { ...o, [t]: s });
    this.pushPatch(r, l, `resize overlay ${e}`);
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
    } catch (o) {
      this.customConfigError = a("editor.inspector.invalidCardJson", o instanceof Error ? o.message : String(o));
      return;
    }
    if (!i || typeof i != "object" || Array.isArray(i)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const n = this.config;
    try {
      const o = So(n, e, i), s = ut(o);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: n, next: s, description: `edit overlay ${e} card config` }), this.commitToHa(s);
    } catch (o) {
      this.customConfigError = o instanceof Error ? o.message : String(o);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = _o(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = co(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = go(t, e);
    this.selectedFlowId = null, this.pushPatch(t, i, `delete flow ${e}`);
  }
  // -- zoom / pan --
  /**
   * Clamp panX/panY so the background image always covers the full stage — no
   * black borders in any direction. Must be called after every pan or zoom change.
   */
  clampPan() {
    const e = this.canvasRef.value;
    if (!e) return;
    const t = e.offsetWidth - 16, i = e.offsetHeight - 8, n = this.imageNaturalW * this.scale, o = this.imageNaturalH * this.scale;
    this.panX = Math.min(0, Math.max(t - n, this.panX)), this.panY = Math.min(0, Math.max(i - o, this.panY));
  }
  adjustZoom(e, t, i) {
    const n = this.canvasRef.value, o = t ?? (n ? n.offsetWidth / 2 : 0), s = i ?? (n ? n.offsetHeight / 2 : 0), r = Math.min(5, Math.max(this.fitScale, this.scale * e));
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
  pointerToPercent(e) {
    const t = this.canvasRef.value;
    if (!t) return null;
    const i = t.getBoundingClientRect();
    if (i.width <= 0 || i.height <= 0) return null;
    const n = e.clientX - (i.left + 8), o = e.clientY - (i.top + 4), s = (n - this.panX) / this.scale, r = (o - this.panY) / this.scale, l = E(s / this.imageNaturalW * 100), c = E(r / this.imageNaturalH * 100);
    return { x: l, y: c };
  }
  pushPatch(e, t, i) {
    try {
      const n = ut(e), o = ut(t);
      this.errorMessage = "", this.undoStack.push({ prev: n, next: o, description: i }), this.commitToHa(o), this.config = o, oe(o.debug ?? !1);
    } catch (n) {
      this.errorMessage = n instanceof Error ? n.message : String(n), this.config = e;
    }
  }
  applyConfig(e, t) {
    this.config = e, t ? this.commitToHa(e) : this.commitToHa(e);
  }
  commitToHa(e) {
    this._ownCommit = !0;
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
P.styles = pe`
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
N([
  $t({ attribute: !1 })
], P.prototype, "hass", 2);
N([
  M()
], P.prototype, "config", 2);
N([
  M()
], P.prototype, "pending", 2);
N([
  M()
], P.prototype, "previewMode", 2);
N([
  M()
], P.prototype, "selectedNodeId", 2);
N([
  M()
], P.prototype, "selectedNodeIds", 2);
N([
  M()
], P.prototype, "selectedFlowId", 2);
N([
  M()
], P.prototype, "selectedOverlayId", 2);
N([
  M()
], P.prototype, "customConfigDraft", 2);
N([
  M()
], P.prototype, "customConfigError", 2);
N([
  M()
], P.prototype, "errorMessage", 2);
N([
  M()
], P.prototype, "canUndo", 2);
N([
  M()
], P.prototype, "canRedo", 2);
N([
  M()
], P.prototype, "undoLabel", 2);
N([
  M()
], P.prototype, "redoLabel", 2);
N([
  M()
], P.prototype, "suggestPreview", 2);
N([
  M()
], P.prototype, "suggestBusy", 2);
N([
  M()
], P.prototype, "selectorType", 2);
N([
  M()
], P.prototype, "savedConfig", 2);
N([
  M()
], P.prototype, "scale", 2);
N([
  M()
], P.prototype, "panX", 2);
N([
  M()
], P.prototype, "panY", 2);
P = N([
  fe("flowme-card-editor")
], P);
var ds = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, H = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ps(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && ds(t, i, o), o;
};
const us = "1.22", di = 5e3;
console.info(
  `%c flowme %c v${us} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function hs(e) {
  if (!e) return "";
  const t = [], i = (n, o) => {
    const s = e[n];
    s !== void 0 && t.push(`${o}:${s};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), t.join("");
}
function fs(e) {
  if (!e) return "";
  const t = [], i = (n, o) => {
    e[n] === !1 && t.push(`${o}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), t.join("");
}
let D = class extends K {
  constructor() {
    super(...arguments), this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = Zt(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this.onOverlayKeydown = (e, t) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.handleOverlayTap(t));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e && e.language !== this._lastLanguage && (this._lastLanguage = e.language, vi(e.language)), e) {
      const i = this.config, n = [
        ...i?.flows.map((l) => l.entity) ?? [],
        ...i?.flows.map((l) => l.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((l) => l.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((l) => typeof l == "string" && l.length > 0), o = {};
      for (const l of n)
        o[l] = e.states[l]?.state;
      F("hass setter called. config entity states:", o);
      const s = i?.background.weather_entity;
      if (s) {
        const l = t?.states[s]?.state, c = e.states[s]?.state;
        F("[weather] state:", c, "(was:", l, ")"), l !== c && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const l = t?.states[r]?.state, c = e.states[r]?.state;
        l !== c && (F("[sun] state changed:", l, "→", c), this.syncWeatherBackground());
      }
    } else
      F("hass setter called with undefined"), t && this.showToast(a("card.connectionLost"));
    this.requestUpdate("hass", t);
  }
  setConfig(e) {
    try {
      const t = ut(e);
      oe(t.debug ?? !1), F("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), F("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof ge ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), F("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    F("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), F("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), super.disconnectedCallback();
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = Kn(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(t, i).then(() => {
        this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
      }).catch((n) => {
        F("renderer init failed — falling back to SVG renderer", n), this.teardownRenderer(), this.renderer = new Ct(), this.rendererReadyFor = i, this.renderer.init(t, i).then(() => {
          this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
        }).catch((o) => {
          console.error("[flowme] SVG renderer init also failed", o);
        });
      });
    }
    e.has("hass") && this.renderer && (this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels()), (e.has("config") || e.has("hass")) && this.syncWeatherBackground();
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
      F("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (const e of this.config.flows) {
        const t = this.hass.states[e.entity], i = kt(t?.state), n = B(e.domain ?? this.config.domain), o = t?.attributes?.unit_of_measurement, s = Be(i, o, n.unit_scale);
        if (F(
          "updateFlow →",
          e.id,
          "entity=",
          e.entity,
          "raw=",
          t?.state,
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
        ), t) {
          if (t.state === "unavailable" || t.state === "unknown") {
            const r = `${e.id}:${e.entity}:unavailable`;
            this.warnedMissing.has(r) || (this.warnedMissing.add(r), F(`flow "${e.id}" entity "${e.entity}" is currently ${t.state} — no flow will render until it reports a number`));
          }
        } else {
          const r = `${e.id}:${e.entity}`;
          this.warnedMissing.has(r) || (this.warnedMissing.add(r), F(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(e.id, s.value), e.value_gradient && this.renderer.setGradientColor) {
          const r = e.value_gradient.entity, l = this.hass.states[r];
          if (l && l.state !== "unavailable" && l.state !== "unknown") {
            const c = parseFloat(l.state);
            if (Number.isFinite(c)) {
              const p = e.value_gradient, d = Math.max(p.low_value, Math.min(p.high_value, c)), u = ki(c, p);
              F(
                "[gradient]",
                e.id,
                "entity value:",
                c,
                "clamped:",
                d,
                "range:",
                `${p.low_value}–${p.high_value}`,
                "colour:",
                u
              ), this.renderer.setGradientColor(e.id, u);
            } else
              F(`flow "${e.id}" gradient entity "${r}" state "${l.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            F(`flow "${e.id}" gradient entity "${r}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
        }
      }
      this.syncRendererAriaLabels();
    }
  }
  /** Push screen-reader labels onto flow renderer groups (SVG or Houdini). */
  syncRendererAriaLabels() {
    if (!(!this.config || !this.renderer?.setFlowAriaLabel))
      for (const e of this.config.flows)
        this.renderer.setFlowAriaLabel(e.id, this.formatFlowAriaLabel(e));
  }
  describeFlowReading(e) {
    if (!this.hass || !this.config) return a("card.noConnection");
    const t = this.hass.states[e.entity], i = B(e.domain ?? this.config.domain);
    if (!t) return a("card.entityNotFound");
    if (t.state === "unavailable" || t.state === "unknown") return t.state;
    const n = kt(t.state), o = t.attributes?.unit_of_measurement ?? "", s = Be(n, o, i.unit_scale);
    return o ? `${this.formatSensorNumber(s.value)} ${o}` : i.describe(s.value);
  }
  formatFlowAriaLabel(e) {
    return a("aria.flowGroup", e.id, this.describeFlowReading(e));
  }
  formatNodeAriaLabel(e) {
    const t = e.label ?? e.id;
    if (!this.hass || !e.entity || !this.config) return t;
    const i = this.hass.states[e.entity], n = B(this.config.domain);
    if (!i) return a("aria.readingWithTitle", t, a("card.entityNotFound"));
    if (i.state === "unavailable" || i.state === "unknown")
      return a("aria.readingWithTitle", t, i.state);
    const o = kt(i.state), s = i.attributes?.unit_of_measurement ?? "";
    return s ? a("aria.readingWithTitle", t, `${this.formatSensorNumber(o)} ${s}`) : a("aria.readingWithTitle", t, n.describe(o));
  }
  getCardSize() {
    const e = Ut(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = Ut(this.config?.aspect_ratio) ?? 1.6;
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
      return y`
        <ha-card role="region" aria-label=${a("aria.card")}>
          <div class="error">
            <strong>${a("card.invalidConfigurationTitle")}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e)
      return y`<ha-card role="region" aria-label=${a("aria.card")}><div class="placeholder">${a("card.loading")}</div></ha-card>`;
    const i = `${1 / (Ut(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = e.background.transition_duration ?? di, o = hs(e.opacity), s = fs(e.visibility);
    return y`
      <ha-card role="region" aria-label=${a("aria.card")}>
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
          <div class="renderer-mount" ${Jt(this.rendererMount)}></div>
          ${e.nodes.map((r) => this.renderNodeHandle(r))}
          ${(e.overlays ?? []).map((r) => (F("rendering overlay →", r.type, "position=", r.position, "size=", r.size), Qn(r, this.hass, {
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
  showToast(e, t = 3e3) {
    this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), this.toastMessage = e, this.toastVisible = !0, this.toastHideTimer = window.setTimeout(() => {
      this.toastVisible = !1, this.toastHideTimer = null;
    }, t);
  }
  /** Activate the embedded HA card (same intent as a tap). Best-effort error toast. */
  handleOverlayTap(e) {
    try {
      const t = this.shadowRoot?.querySelectorAll(".overlay-custom") ?? [];
      let i;
      for (const n of t)
        if (n.getAttribute("data-overlay-id") === e.id) {
          i = n.querySelector("flowme-custom-overlay");
          break;
        }
      i?.activatePrimaryAction();
    } catch {
      this.showToast(a("card.actionFailed"));
    }
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
        const i = t.state, n = e.sun_entity ? this.hass.states[e.sun_entity]?.state : void 0, o = Cn(i, n, e.weather_states, e.default);
        let s = i;
        return n === "below_horizon" && !i.endsWith("-night") && (s = `${i}-night`), F("[FlowMe] sun:", n, "weather:", i, "→ lookup key:", s, "→ image:", o !== e.default ? o : "default"), o;
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
    const t = this.config.background.transition_duration ?? di;
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, n = e.show_label !== !1 && !!e.label, o = B(this.config?.domain), s = e.color ?? this.nodeFlowColor(e.id) ?? o.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let l = "";
    if (t) {
      const p = kt(t.state), d = t.attributes?.unit_of_measurement ?? "";
      d ? l = `${this.formatSensorNumber(p)} ${d}` : l = o.describe(p);
    }
    const c = e.visible === !1;
    return y`
      <div
        class="node"
        data-node-id=${e.id}
        role="img"
        aria-label=${this.formatNodeAriaLabel(e)}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; --flowme-dot-size: ${r}px;${e.opacity !== void 0 ? ` opacity: ${e.opacity};` : ""}${c ? " display: none;" : ""}`}
      >
        <span
          class="node-dot node-circle"
          style=${`background: ${s}; width: ${r}px; height: ${r}px;`}
        ></span>
        ${n ? y`<span class="node-label">${e.label}</span>` : null}
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
  nodeFlowColor(e) {
    if (!this.config) return;
    const t = this.config.domain, i = this.config.domain_colors;
    let n;
    const o = /* @__PURE__ */ new Set();
    for (let s = 0; s < this.config.flows.length; s++) {
      const r = this.config.flows[s];
      if (r.from_node !== e && r.to_node !== e) continue;
      const l = B(r.domain ?? t), c = wt(r, l, r.domain ?? t, 1, i, s), p = c.toLowerCase();
      o.has(p) || (o.add(p), n || (n = c));
    }
    if (o.size !== 0)
      return o.size === 1 ? n : In;
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
D.styles = pe`
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
H([
  $t({ attribute: !1 })
], D.prototype, "hass", 1);
H([
  M()
], D.prototype, "config", 2);
H([
  M()
], D.prototype, "errorMessage", 2);
H([
  M()
], D.prototype, "toastVisible", 2);
H([
  M()
], D.prototype, "toastMessage", 2);
H([
  M()
], D.prototype, "bgLayerA", 2);
H([
  M()
], D.prototype, "bgLayerB", 2);
H([
  M()
], D.prototype, "activeLayer", 2);
D = H([
  fe("flowme-card")
], D);
const le = window;
le.customCards = le.customCards ?? [];
le.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: a("card.hacsDescription"),
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  D as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
