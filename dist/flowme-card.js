/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = globalThis, ue = Bt.ShadowRoot && (Bt.ShadyCSS === void 0 || Bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, he = Symbol(), Ce = /* @__PURE__ */ new WeakMap();
let bi = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== he) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (ue && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Ce.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ce.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ri = (e) => new bi(typeof e == "string" ? e : e + "", void 0, he), ge = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new bi(i, e, he);
}, zi = (e, t) => {
  if (ue) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = Bt.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Ie = ue ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Ri(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Li, defineProperty: Hi, getOwnPropertyDescriptor: Ti, getOwnPropertyNames: Gi, getOwnPropertySymbols: Wi, getPrototypeOf: Ui } = Object, V = globalThis, _e = V.trustedTypes, Ki = _e ? _e.emptyScript : "", ji = V.reactiveElementPolyfillSupport, mt = (e, t) => e, Et = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ki : null;
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
} }, fe = (e, t) => !Li(e, t), Se = { attribute: !0, type: String, converter: Et, reflect: !1, useDefault: !1, hasChanged: fe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), V.litPropertyMetadata ?? (V.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let at = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Se) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Hi(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = Ti(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(mt("elementProperties"))) return;
    const t = Ui(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(mt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(mt("properties"))) {
      const i = this.properties, n = [...Gi(i), ...Wi(i)];
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
      for (const o of n) i.unshift(Ie(o));
    } else t !== void 0 && i.push(Ie(t));
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
    return zi(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Et).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Et;
      this._$Em = o;
      const a = r.fromAttribute(i, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? fe)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
        const { wrapped: r } = s, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, s, a);
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
at.elementStyles = [], at.shadowRootOptions = { mode: "open" }, at[mt("elementProperties")] = /* @__PURE__ */ new Map(), at[mt("finalized")] = /* @__PURE__ */ new Map(), ji?.({ ReactiveElement: at }), (V.reactiveElementVersions ?? (V.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, ke = (e) => e, Ot = bt.trustedTypes, Pe = Ot ? Ot.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, yi = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, vi = "?" + j, Vi = `<${vi}>`, tt = document, wt = () => tt.createComment(""), xt = (e) => e === null || typeof e != "object" && typeof e != "function", me = Array.isArray, Yi = (e) => me(e) || typeof e?.[Symbol.iterator] == "function", Ut = `[ 	
\f\r]`, gt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, Fe = />/g, X = RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Be = /'/g, Ne = /"/g, wi = /^(?:script|style|textarea|title)$/i, xi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), y = xi(1), De = xi(2), dt = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Ee = /* @__PURE__ */ new WeakMap(), q = tt.createTreeWalker(tt, 129);
function $i(e, t) {
  if (!me(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pe !== void 0 ? Pe.createHTML(t) : t;
}
const Zi = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = gt;
  for (let a = 0; a < i; a++) {
    const c = e[a];
    let p, d, u = -1, h = 0;
    for (; h < c.length && (r.lastIndex = h, d = r.exec(c), d !== null); ) h = r.lastIndex, r === gt ? d[1] === "!--" ? r = Me : d[1] !== void 0 ? r = Fe : d[2] !== void 0 ? (wi.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = X) : d[3] !== void 0 && (r = X) : r === X ? d[0] === ">" ? (r = o ?? gt, u = -1) : d[1] === void 0 ? u = -2 : (u = r.lastIndex - d[2].length, p = d[1], r = d[3] === void 0 ? X : d[3] === '"' ? Ne : Be) : r === Ne || r === Be ? r = X : r === Me || r === Fe ? r = gt : (r = X, o = void 0);
    const g = r === X && e[a + 1].startsWith("/>") ? " " : "";
    s += r === gt ? c + Vi : u >= 0 ? (n.push(p), c.slice(0, u) + yi + c.slice(u) + j + g) : c + j + (u === -2 ? a : g);
  }
  return [$i(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class $t {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, c = this.parts, [p, d] = Zi(t, i);
    if (this.el = $t.createElement(p, n), q.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = q.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(yi)) {
          const h = d[r++], g = o.getAttribute(u).split(j), f = /([.?@])?(.*)/.exec(h);
          c.push({ type: 1, index: s, name: f[2], strings: g, ctor: f[1] === "." ? Ji : f[1] === "?" ? qi : f[1] === "@" ? Qi : Tt }), o.removeAttribute(u);
        } else u.startsWith(j) && (c.push({ type: 6, index: s }), o.removeAttribute(u));
        if (wi.test(o.tagName)) {
          const u = o.textContent.split(j), h = u.length - 1;
          if (h > 0) {
            o.textContent = Ot ? Ot.emptyScript : "";
            for (let g = 0; g < h; g++) o.append(u[g], wt()), q.nextNode(), c.push({ type: 2, index: ++s });
            o.append(u[h], wt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === vi) c.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(j, u + 1)) !== -1; ) c.push({ type: 7, index: s }), u += j.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = tt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function pt(e, t, i = e, n) {
  if (t === dt) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = xt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (t = pt(e, o._$AS(e, t.values), o, n)), t;
}
class Xi {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? tt).importNode(i, !0);
    q.currentNode = o;
    let s = q.nextNode(), r = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let p;
        c.type === 2 ? p = new It(s, s.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (p = new tn(s, this, t)), this._$AV.push(p), c = n[++a];
      }
      r !== c?.index && (s = q.nextNode(), r++);
    }
    return q.currentNode = tt, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class It {
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
    t = pt(this, t, i), xt(t) ? t === x || t == null || t === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== dt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Yi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== x && xt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(tt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = $t.createElement($i(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new Xi(o, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Ee.get(t.strings);
    return i === void 0 && Ee.set(t.strings, i = new $t(t)), i;
  }
  k(t) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new It(this.O(wt()), this.O(wt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = ke(t).nextSibling;
      ke(t).remove(), t = n;
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
    if (s === void 0) t = pt(this, t, i, 0), r = !xt(t) || t !== this._$AH && t !== dt, r && (this._$AH = t);
    else {
      const a = t;
      let c, p;
      for (t = s[0], c = 0; c < s.length - 1; c++) p = pt(this, a[n + c], i, c), p === dt && (p = this._$AH[c]), r || (r = !xt(p) || p !== this._$AH[c]), p === x ? t = x : t !== x && (t += (p ?? "") + s[c + 1]), this._$AH[c] = p;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ji extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === x ? void 0 : t;
  }
}
class qi extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== x);
  }
}
class Qi extends Tt {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = pt(this, t, i, 0) ?? x) === dt) return;
    const n = this._$AH, o = t === x && n !== x || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== x && (n === x || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class tn {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    pt(this, t);
  }
}
const en = bt.litHtmlPolyfillSupport;
en?.($t, It), (bt.litHtmlVersions ?? (bt.litHtmlVersions = [])).push("3.3.2");
const nn = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new It(t.insertBefore(wt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis;
let Q = class extends at {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = nn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return dt;
  }
};
Q._$litElement$ = !0, Q.finalized = !0, yt.litElementHydrateSupport?.({ LitElement: Q });
const on = yt.litElementPolyfillSupport;
on?.({ LitElement: Q });
(yt.litElementVersions ?? (yt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sn = { attribute: !0, type: String, converter: Et, reflect: !1, hasChanged: fe }, rn = (e = sn, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, c, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const c = this[r];
      t.call(this, a), this.requestUpdate(r, c, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function _t(e) {
  return (t, i) => typeof i == "object" ? rn(e, t, i) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function k(e) {
  return _t({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const an = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ln = { CHILD: 2 }, cn = (e) => (...t) => ({ _$litDirective$: e, values: t });
class dn {
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
const vt = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const n of i) n._$AO?.(t, !1), vt(n, t);
  return !0;
}, Rt = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, Ai = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), hn(t);
  }
};
function pn(e) {
  this._$AN !== void 0 ? (Rt(this), this._$AM = e, Ai(this)) : this._$AM = e;
}
function un(e, t = !1, i = 0) {
  const n = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (t) if (Array.isArray(n)) for (let s = i; s < n.length; s++) vt(n[s], !1), Rt(n[s]);
  else n != null && (vt(n, !1), Rt(n));
  else vt(this, e);
}
const hn = (e) => {
  e.type == ln.CHILD && (e._$AP ?? (e._$AP = un), e._$AQ ?? (e._$AQ = pn));
};
class gn extends dn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, n) {
    super._$AT(t, i, n), Ai(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (vt(this, t), Rt(this));
  }
  setValue(t) {
    if (an(this._$Ct)) this._$Ct._$AI(t, this);
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
const lt = () => new fn();
class fn {
}
const Kt = /* @__PURE__ */ new WeakMap(), ct = cn(class extends gn {
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
      let i = Kt.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), Kt.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? Kt.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
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
], ie = ["corner", "diagonal", "curve", "smooth"], ne = [
  "dots",
  "dash",
  "pulse",
  "arrow",
  "trail",
  "fluid",
  "spark",
  "none"
], oe = ["circle", "square", "arrow", "teardrop", "diamond", "custom_svg"], se = ["auto", "forward", "reverse", "both"], re = ["even", "random", "clustered", "pulse", "wave_spacing", "wave_lateral"], mn = {
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
let Ci = {};
function jt(e) {
  Ci = e;
}
function Ii(e) {
  const i = (e ?? "en").split("-")[0].toLowerCase();
  if (i === "en") {
    jt({});
    return;
  }
  const n = `/local/flowme/translations/${i}.json`;
  fetch(n).then((o) => o.ok ? o.json() : null).then((o) => {
    o && typeof o == "object" && jt(o);
  }).catch(() => {
    jt({});
  });
}
function l(e, ...t) {
  const i = e.split(".");
  let n = Ci;
  for (const o of i)
    if (n && typeof n == "object")
      n = n[o];
    else {
      n = void 0;
      break;
    }
  if (n === void 0) {
    n = mn;
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
const bn = ["javascript:", "vbscript:", "data:", "file:"];
function _i(e, t = "card_config") {
  const i = [], n = /* @__PURE__ */ new WeakSet(), o = (s, r) => {
    if (s != null) {
      if (typeof s == "string") {
        const a = s.trim().toLowerCase();
        for (const c of bn)
          if (a.startsWith(c)) {
            i.push({ path: r, value: s, scheme: c });
            return;
          }
        return;
      }
      if (typeof s == "object" && !n.has(s)) {
        if (n.add(s), Array.isArray(s)) {
          for (let a = 0; a < s.length; a++) o(s[a], `${r}[${a}]`);
          return;
        }
        for (const [a, c] of Object.entries(s))
          o(c, `${r}.${a}`);
      }
    }
  };
  return o(e, t), i;
}
function yn(e, t = "card_config") {
  const i = _i(e, t);
  if (i.length === 0) return;
  const n = i[0];
  throw new Error(l("security.unsafeUrlInCard", n.scheme, n.path));
}
class ye extends Error {
  constructor() {
    super(...arguments), this.name = "FlowmeConfigError";
  }
}
const Oe = ["/local/", "/api/", "/hacsfiles/", "https://", "http://", "data:"];
function w(e, t) {
  throw new ye(`${e}: ${t}`);
}
function ve(e, t) {
  (!e || typeof e != "object") && w(t, l("validation.mustBeObjectWithXY"));
  const i = e, n = i.x, o = i.y;
  (typeof n != "number" || !Number.isFinite(n)) && w(`${t}.x`, l("validation.mustBeFiniteNumber")), (typeof o != "number" || !Number.isFinite(o)) && w(`${t}.y`, l("validation.mustBeFiniteNumber"));
  const s = n, r = o;
  return (s < 0 || s > 100) && w(`${t}.x`, l("validation.percentRange", s)), (r < 0 || r > 100) && w(`${t}.y`, l("validation.percentRange", r)), { x: s, y: r };
}
function Re(e, t) {
  (typeof e != "string" || !e.length) && w(t, l("validation.mustBeNonEmptyString"));
  const i = e;
  return Oe.some((o) => i.startsWith(o)) || w(t, l("validation.urlMustStartWith", Oe.join(", "), i.slice(0, 40))), i;
}
function vn(e, t, i) {
  const n = `nodes[${t}]`;
  (!e || typeof e != "object") && w(n, l("validation.mustBeObject"));
  const o = e, s = o.id;
  (typeof s != "string" || !s.length) && w(`${n}.id`, l("validation.mustBeNonEmptyId"));
  const r = s;
  i.has(r) && w(`${n}.id`, l("validation.duplicateNodeId", r)), i.add(r);
  const a = ve(o.position, `${n}.position`), c = { id: r, position: a };
  return typeof o.entity == "string" && (c.entity = o.entity), typeof o.label == "string" && (c.label = o.label), typeof o.color == "string" && (c.color = o.color), typeof o.size == "number" && (c.size = o.size), typeof o.show_label == "boolean" && (c.show_label = o.show_label), typeof o.show_value == "boolean" && (c.show_value = o.show_value), o.opacity !== void 0 && (c.opacity = we(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, l("validation.mustBeBoolean")), c.visible = o.visible), c;
}
function wn(e, t, i, n) {
  const o = `flows[${t}]`;
  (!e || typeof e != "object") && w(o, l("validation.mustBeObject"));
  const s = e, r = s.id;
  (typeof r != "string" || !r.length) && w(`${o}.id`, l("validation.mustBeNonEmptyId"));
  const a = r;
  i.has(a) && w(`${o}.id`, l("validation.duplicateFlowId", a)), i.add(a);
  const c = s.from_node;
  (typeof c != "string" || !n.has(c)) && w(`${o}.from_node`, l("validation.unknownNodeRef", String(c)));
  const p = s.to_node;
  (typeof p != "string" || !n.has(p)) && w(`${o}.to_node`, l("validation.unknownNodeRef", String(p)));
  const d = s.entity;
  (typeof d != "string" || !d.length) && w(`${o}.entity`, l("validation.mustBeNonEmptyEntityId"));
  const u = s.waypoints;
  let h = [];
  u !== void 0 && (Array.isArray(u) || w(`${o}.waypoints`, l("validation.waypointsMustBeArray")), h = u.map(
    (f, v) => ve(f, `${o}.waypoints[${v}]`)
  ));
  const g = {
    id: a,
    from_node: c,
    to_node: p,
    entity: d,
    waypoints: h
  };
  if (typeof s.domain == "string" && (At.includes(s.domain) || w(`${o}.domain`, l("validation.mustBeOneOf", At.join(", "))), g.domain = s.domain), typeof s.color == "string" && (g.color = s.color), typeof s.color_positive == "string" && (g.color_positive = s.color_positive), typeof s.color_negative == "string" && (g.color_negative = s.color_negative), typeof s.threshold == "number" && (g.threshold = s.threshold), typeof s.reverse == "boolean" && (g.reverse = s.reverse), typeof s.speed_multiplier == "number") {
    const f = s.speed_multiplier;
    (f < 0.1 || f > 5) && w(`${o}.speed_multiplier`, l("validation.speedMultiplierRange")), g.speed_multiplier = f;
  }
  return s.opacity !== void 0 && (g.opacity = we(s.opacity, `${o}.opacity`)), s.visible !== void 0 && (typeof s.visible != "boolean" && w(`${o}.visible`, l("validation.mustBeBoolean")), g.visible = s.visible), s.line_style !== void 0 && (ie.includes(s.line_style) || w(`${o}.line_style`, l("validation.mustBeOneOf", ie.join(", "))), g.line_style = s.line_style), s.speed_curve_override !== void 0 && (g.speed_curve_override = xn(
    s.speed_curve_override,
    `${o}.speed_curve_override`
  )), s.animation !== void 0 && (g.animation = Cn(s.animation, `${o}.animation`)), s.value_gradient !== void 0 && (g.value_gradient = In(s.value_gradient, `${o}.value_gradient`)), g;
}
function xn(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && w(t, l("validation.mustBeObject"));
  const i = e, n = {};
  function o(h) {
    const g = i[h];
    if (g !== void 0)
      return (typeof g != "number" || !Number.isFinite(g) || g <= 0) && w(`${t}.${h}`, l("validation.positiveFinite")), g;
  }
  function s(h) {
    const g = i[h];
    if (g !== void 0)
      return (typeof g != "number" || !Number.isFinite(g) || g < 50) && w(`${t}.${h}`, l("validation.durationMin50")), g;
  }
  const r = o("threshold");
  r !== void 0 && (n.threshold = r);
  const a = o("p50");
  a !== void 0 && (n.p50 = a);
  const c = o("peak");
  c !== void 0 && (n.peak = c);
  const p = s("max_duration");
  p !== void 0 && (n.max_duration = p);
  const d = s("min_duration");
  if (d !== void 0 && (n.min_duration = d), i.steepness !== void 0) {
    const h = i.steepness;
    (typeof h != "number" || !Number.isFinite(h) || h <= 0) && w(`${t}.steepness`, l("validation.positiveFinite")), n.steepness = h;
  }
  n.max_duration !== void 0 && n.min_duration !== void 0 && n.min_duration >= n.max_duration && w(t, l("validation.minLtMaxDuration"));
  const u = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const h of Object.keys(i))
    u.has(h) || w(`${t}.${h}`, l("validation.unknownKey", [...u].join(", ")));
  return n;
}
function ot(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e <= 0) && w(t, l("validation.positiveFinite")), e;
}
function $n(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("defaults", l("validation.defaultsMustBeObject"));
  const t = e, i = {};
  if (t.node_radius !== void 0 && (i.node_radius = ot(t.node_radius, "defaults.node_radius")), t.burst_trigger_ratio !== void 0) {
    const n = ot(t.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    n > 1 && w("defaults.burst_trigger_ratio", l("validation.burstTriggerMax1")), i.burst_trigger_ratio = n;
  }
  return t.burst_sustain_ms !== void 0 && (i.burst_sustain_ms = ot(t.burst_sustain_ms, "defaults.burst_sustain_ms")), t.burst_max_particles !== void 0 && (i.burst_max_particles = ot(t.burst_max_particles, "defaults.burst_max_particles")), t.dot_radius !== void 0 && (i.dot_radius = ot(t.dot_radius, "defaults.dot_radius")), t.line_width !== void 0 && (i.line_width = ot(t.line_width, "defaults.line_width")), i;
}
function we(e, t) {
  return (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 1) && w(t, l("validation.opacity01")), e;
}
function An(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("opacity", l("validation.mustBeObject"));
  const t = e, i = {};
  for (const n of ["background", "darken", "nodes", "flows", "dots", "glow", "labels", "values", "overlays"])
    t[n] !== void 0 && (i[n] = we(t[n], `opacity.${n}`));
  return i;
}
function Cn(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && w(t, l("validation.mustBeObject"));
  const i = e, n = {};
  i.animation_style !== void 0 && (ne.includes(i.animation_style) || w(`${t}.animation_style`, l("validation.mustBeOneOf", ne.join(", "))), n.animation_style = i.animation_style), i.particle_shape !== void 0 && (oe.includes(i.particle_shape) || w(`${t}.particle_shape`, l("validation.mustBeOneOf", oe.join(", "))), n.particle_shape = i.particle_shape), i.direction !== void 0 && (se.includes(i.direction) || w(`${t}.direction`, l("validation.mustBeOneOf", se.join(", "))), n.direction = i.direction), i.particle_spacing !== void 0 && (re.includes(i.particle_spacing) || w(`${t}.particle_spacing`, l("validation.mustBeOneOf", re.join(", "))), n.particle_spacing = i.particle_spacing), i.custom_svg_path !== void 0 && (typeof i.custom_svg_path != "string" && w(`${t}.custom_svg_path`, l("validation.mustBeSvgPathString")), i.custom_svg_path.length === 0 && console.warn(`[flowme] ${t}.custom_svg_path is empty — will fall back to circle`), n.custom_svg_path = i.custom_svg_path);
  const o = (m, b) => {
    const $ = i[m];
    if ($ !== void 0)
      return (typeof $ != "number" || !Number.isFinite($) || $ <= 0) && w(`${t}.${m}`, l("validation.positiveFinite")), b !== void 0 && $ > b && w(`${t}.${m}`, l("validation.mustBeAtMost", b)), $;
  }, s = (m) => {
    const b = i[m];
    if (b !== void 0)
      return typeof b != "boolean" && w(`${t}.${m}`, l("validation.mustBeBoolean")), b;
  }, r = o("particle_size");
  if (r !== void 0 && (n.particle_size = r), i.particle_count !== void 0) {
    const m = i.particle_count;
    (typeof m != "number" || !Number.isFinite(m) || m < 1 || !Number.isInteger(m)) && w(`${t}.particle_count`, l("validation.particleCountInt")), n.particle_count = m;
  }
  if (i.glow_intensity !== void 0) {
    const m = i.glow_intensity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0) && w(`${t}.glow_intensity`, l("validation.glowNonNegative")), n.glow_intensity = m;
  }
  const a = s("shimmer");
  a !== void 0 && (n.shimmer = a);
  const c = s("flicker");
  c !== void 0 && (n.flicker = c);
  const p = o("pulse_width");
  p !== void 0 && (n.pulse_width = p);
  const d = o("trail_length");
  if (d !== void 0 && (n.trail_length = d), i.dash_gap !== void 0) {
    const m = i.dash_gap;
    (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 10) && w(`${t}.dash_gap`, l("validation.dashGapRange")), n.dash_gap = m;
  }
  const u = o("cluster_size");
  u !== void 0 && (n.cluster_size = Math.max(1, Math.round(u)));
  const h = o("cluster_gap");
  h !== void 0 && (n.cluster_gap = h);
  const g = o("pulse_frequency", 20);
  if (g !== void 0 && (n.pulse_frequency = g), i.pulse_ratio !== void 0) {
    const m = i.pulse_ratio;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m >= 1) && w(`${t}.pulse_ratio`, l("validation.pulseRatioRange")), n.pulse_ratio = m;
  }
  const f = o("wave_frequency", 20);
  f !== void 0 && (n.wave_frequency = f);
  const v = o("wave_amplitude");
  return v !== void 0 && (n.wave_amplitude = v), n;
}
function ze(e, t) {
  return (typeof e != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e)) && w(t, l("validation.mustBeHexColor")), e;
}
function In(e, t) {
  (!e || typeof e != "object" || Array.isArray(e)) && w(t, l("validation.mustBeObject"));
  const i = e;
  typeof i.entity != "string" && w(`${t}.entity`, l("validation.mustBeStringEntityId")), (typeof i.low_value != "number" || !Number.isFinite(i.low_value)) && w(`${t}.low_value`, l("validation.finiteNumber")), (typeof i.high_value != "number" || !Number.isFinite(i.high_value)) && w(`${t}.high_value`, l("validation.finiteNumber")), i.low_value >= i.high_value && console.warn(`[flowme] ${t}: low_value should be less than high_value`);
  const n = {
    entity: i.entity,
    low_value: i.low_value,
    high_value: i.high_value,
    low_color: ze(i.low_color, `${t}.low_color`),
    high_color: ze(i.high_color, `${t}.high_color`)
  };
  return i.mode !== void 0 && (["flow", "line", "both"].includes(i.mode) || w(`${t}.mode`, l("validation.gradientMode")), n.mode = i.mode), n;
}
function _n(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("animation", l("validation.animationRootMustBeObject"));
  const t = e, i = {};
  if (t.fps !== void 0) {
    const n = t.fps;
    (typeof n != "number" || !Number.isFinite(n) || n < 1 || n > 120) && w("animation.fps", l("validation.fpsRange")), i.fps = n;
  }
  return t.smooth_speed !== void 0 && (typeof t.smooth_speed != "boolean" && w("animation.smooth_speed", l("validation.mustBeBoolean")), i.smooth_speed = t.smooth_speed), i;
}
function Sn(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("visibility", l("validation.visibilityRootMustBeObject"));
  const t = e, i = {};
  for (const n of ["nodes", "lines", "dots", "labels", "values", "overlays"])
    t[n] !== void 0 && (typeof t[n] != "boolean" && w(`visibility.${n}`, l("validation.mustBeBoolean")), i[n] = t[n]);
  return i;
}
function kn(e) {
  (!e || typeof e != "object" || Array.isArray(e)) && w("domain_colors", l("validation.domainColorsRootMustBeObject"));
  const t = e, i = {};
  for (const n of ["solar", "grid", "battery", "load"])
    t[n] !== void 0 && (typeof t[n] != "string" && w(`domain_colors.${n}`, l("validation.stringColourValue")), i[n] = t[n]);
  return i;
}
function ft(e) {
  if (!e || typeof e != "object") throw new ye(l("validation.configMustBeObject"));
  const t = e;
  t.type !== "custom:flowme-card" && w("type", l("validation.typeMustBeFlowme", String(t.type))), At.includes(t.domain) || w("domain", l("validation.mustBeOneOf", At.join(", ")));
  const i = t.background;
  i !== void 0 && (i === null || typeof i != "object") && w("background", l("validation.backgroundWhenProvided"));
  const n = i ?? {}, s = { default: n.default === void 0 || n.default === "" ? "" : Re(n.default, "background.default") };
  if (n.weather_entity !== void 0 && (typeof n.weather_entity != "string" && w("background.weather_entity", l("validation.mustBeStringEntityId")), s.weather_entity = n.weather_entity), n.weather_states !== void 0) {
    (!n.weather_states || typeof n.weather_states != "object") && w("background.weather_states", l("validation.weatherStatesMapping"));
    const g = Object.entries(n.weather_states), f = {};
    for (const [v, m] of g)
      f[v] = Re(m, `background.weather_states.${v}`);
    s.weather_states = f;
  }
  n.sun_entity !== void 0 && (typeof n.sun_entity != "string" && w("background.sun_entity", l("validation.sunEntityExample")), s.sun_entity = n.sun_entity), n.transition_duration !== void 0 && (typeof n.transition_duration != "number" && w("background.transition_duration", l("validation.transitionMustBeNumberMs")), s.transition_duration = n.transition_duration);
  const r = t.nodes;
  Array.isArray(r) || w("nodes", l("validation.nodesMustBeArray"));
  const a = /* @__PURE__ */ new Set(), c = r.map((g, f) => vn(g, f, a));
  c.length === 0 && w("nodes", l("validation.atLeastOneNode"));
  const p = t.flows;
  Array.isArray(p) || w("flows", l("validation.flowsMustBeArray"));
  const d = /* @__PURE__ */ new Set(), u = p.map(
    (g, f) => wn(g, f, d, a)
  ), h = {
    type: "custom:flowme-card",
    domain: t.domain,
    background: s,
    nodes: c,
    flows: u
  };
  if (t.aspect_ratio !== void 0 && ((typeof t.aspect_ratio != "string" || !/^\d+:\d+$/.test(t.aspect_ratio)) && w("aspect_ratio", l("validation.aspectRatioRegex")), h.aspect_ratio = t.aspect_ratio), t.fullscreen !== void 0 && (typeof t.fullscreen != "boolean" && w("fullscreen", l("validation.mustBeBoolean")), h.fullscreen = t.fullscreen), t.edit_mode_password !== void 0 && (typeof t.edit_mode_password != "string" && w("edit_mode_password", l("validation.editPasswordMustBeString")), h.edit_mode_password = t.edit_mode_password), t.overlays !== void 0) {
    Array.isArray(t.overlays) || w("overlays", l("validation.overlaysMustBeArray"));
    const g = /* @__PURE__ */ new Set();
    h.overlays = t.overlays.map(
      (f, v) => Pn(f, v, g)
    );
  }
  return t.defaults !== void 0 && (h.defaults = $n(t.defaults)), t.domain_colors !== void 0 && (h.domain_colors = kn(t.domain_colors)), t.debug !== void 0 && (typeof t.debug != "boolean" && w("debug", l("validation.mustBeBoolean")), h.debug = t.debug), t.opacity !== void 0 && (h.opacity = An(t.opacity)), t.visibility !== void 0 && (h.visibility = Sn(t.visibility)), t.animation !== void 0 && (h.animation = _n(t.animation)), h;
}
function Pn(e, t, i) {
  const n = `overlays[${t}]`;
  (!e || typeof e != "object") && w(n, l("validation.mustBeObject"));
  const o = e, s = o.type, a = typeof s == "string" && ["camera", "switch", "sensor", "button"].includes(s);
  !a && s !== "custom" && w(`${n}.type`, l("validation.overlayTypeMustBeCustom"));
  const c = o.id;
  (typeof c != "string" || !c.length) && w(`${n}.id`, l("validation.mustBeNonEmptyId")), i.has(c) && w(`${n}.id`, l("validation.duplicateOverlayId", c)), i.add(c);
  const p = ve(o.position, `${n}.position`);
  if (a) {
    const f = l("validation.migrationOverlayWarning", s);
    console.warn(`[flowme] ${n}: ${f}`);
    const v = {
      id: c,
      type: "custom",
      position: p,
      card: { type: "markdown", content: "" },
      _migration_warning: f
    };
    if (o.size !== void 0) {
      const m = o.size;
      if (m && typeof m == "object") {
        const b = m, $ = b.width, C = b.height;
        typeof $ == "number" && typeof C == "number" && (v.size = { width: $, height: C });
      }
    }
    return v;
  }
  const d = o.card;
  (!d || typeof d != "object" || Array.isArray(d)) && w(`${n}.card`, l("validation.overlayCardMustBeObject"));
  const u = _i(d, `${n}.card`);
  if (u.length) {
    const f = u[0];
    w(f.path, l("validation.unsafeSchemeInCard", f.scheme));
  }
  const g = {
    id: c,
    type: "custom",
    position: p,
    card: d
  };
  if (o.size !== void 0) {
    const f = o.size;
    (!f || typeof f != "object") && w(`${n}.size`, l("validation.overlaySizeMustBeObject"));
    const v = f, m = v.width, b = v.height;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m > 100) && w(`${n}.size.width`, l("validation.overlayWidthPercent")), (typeof b != "number" || !Number.isFinite(b) || b <= 0 || b > 100) && w(`${n}.size.height`, l("validation.overlayHeightPercent")), g.size = { width: m, height: b };
  }
  if (o.visible !== void 0 && (typeof o.visible != "boolean" && w(`${n}.visible`, l("validation.mustBeBoolean")), g.visible = o.visible), o.opacity !== void 0) {
    const f = o.opacity;
    (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 1) && w(`${n}.opacity`, l("validation.overlayOpacity01")), g.opacity = f;
  }
  return g;
}
const Mn = "[FlowMe]";
let xe = !1;
function ae(e) {
  xe = e;
}
function P(...e) {
  xe && console.warn(Mn, ...e);
}
function Fn() {
  return xe;
}
const zt = {
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
function Bn(e) {
  const t = e.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(t)) return "solar";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(t)) return "grid";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(t)) return "battery";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(t)) return "load";
}
function Le(e, t) {
  const i = e.toLowerCase();
  for (const n of t.roles)
    for (const o of n.patterns)
      if (o && i.includes(o)) return n.key;
}
function Nn(e, t, i, n) {
  if (e === void 0) {
    P("colour resolution:", t, "domain:", "undefined", "matched role:", "none", "resolved:", void 0);
    return;
  }
  const o = e, s = zt[o] ?? zt.generic;
  let r;
  if (o === "energy") {
    if (r = Bn(t), !r) {
      P("colour resolution:", t, "domain:", o, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (o === "generic") {
    if (r = Le(t, s), !r) {
      const p = Math.abs(n ?? 0) % s.roles.length, d = s.roles[p], u = i?.[d.key] ?? d.default;
      return P("colour resolution:", t, "domain:", o, "matched role:", "none", "resolved:", u), u;
    }
  } else if (r = Le(t, s), !r) {
    P("colour resolution:", t, "domain:", o, "matched role:", "none", "resolved:", void 0);
    return;
  }
  const a = s.roles.find((p) => p.key === r);
  if (!a) return;
  const c = i?.[a.key] ?? a.default;
  return P("colour resolution:", t, "domain:", o, "matched role:", r, "resolved:", c), c;
}
function $e(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function He(e, t, i) {
  return e + (t - e) * i;
}
function Lt(e, t) {
  return { x: e.x / 100 * t.width, y: e.y / 100 * t.height };
}
function Si(e) {
  let t = 0;
  for (let i = 1; i < e.length; i++) {
    const n = e[i - 1], o = e[i];
    if (!n || !o) continue;
    const s = o.x - n.x, r = o.y - n.y;
    t += Math.sqrt(s * s + r * r);
  }
  return t;
}
function Dn(e, t) {
  if (e.length === 0) return { x: 0, y: 0 };
  if (e.length === 1) return { ...e[0] };
  const i = Si(e), n = $e(t, 0, 1) * i;
  let o = 0;
  for (let s = 1; s < e.length; s++) {
    const r = e[s - 1], a = e[s], c = a.x - r.x, p = a.y - r.y, d = Math.sqrt(c * c + p * p);
    if (o + d >= n) {
      const u = d === 0 ? 0 : (n - o) / d;
      return { x: r.x + c * u, y: r.y + p * u };
    }
    o += d;
  }
  return { ...e[e.length - 1] };
}
function le(e, t, i) {
  if (e.length === 0) return "";
  if (e.length === 1) {
    const a = Lt(e[0], t);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const n = e.map((a) => Lt(a, t));
  if (i === "diagonal") {
    const a = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let c = 1; c < n.length; c++)
      a.push(`L ${n[c].x.toFixed(2)} ${n[c].y.toFixed(2)}`);
    return a.join(" ");
  }
  if (i === "corner") {
    const a = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let c = 1; c < n.length; c++) {
      const p = n[c - 1], d = n[c];
      a.push(`L ${d.x.toFixed(2)} ${p.y.toFixed(2)}`), a.push(`L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  if (i === "curve") {
    const a = n.length, c = [
      { x: 2 * n[0].x - n[1].x, y: 2 * n[0].y - n[1].y },
      ...n,
      { x: 2 * n[a - 1].x - n[a - 2].x, y: 2 * n[a - 1].y - n[a - 2].y }
    ], p = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let d = 1; d < a; d++) {
      const u = c[d - 1], h = c[d], g = c[d + 1], f = c[d + 2], v = h.x + (g.x - u.x) / 6, m = h.y + (g.y - u.y) / 6, b = g.x - (f.x - h.x) / 6, $ = g.y - (f.y - h.y) / 6;
      p.push(`C ${v.toFixed(2)} ${m.toFixed(2)} ${b.toFixed(2)} ${$.toFixed(2)} ${g.x.toFixed(2)} ${g.y.toFixed(2)}`);
    }
    return p.join(" ");
  }
  const o = 0.3, s = 20, r = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
  for (let a = 1; a < n.length; a++) {
    const c = n[a - 1], p = n[a], d = n[a + 1];
    if (!d) {
      r.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
      continue;
    }
    const u = Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2), h = Math.sqrt((d.x - p.x) ** 2 + (d.y - p.y) ** 2), g = Math.min(Math.min(u, h) * o, s), f = g / (u || 1), v = p.x - (p.x - c.x) * f, m = p.y - (p.y - c.y) * f, b = g / (h || 1), $ = p.x + (d.x - p.x) * b, C = p.y + (d.y - p.y) * b;
    r.push(`L ${v.toFixed(2)} ${m.toFixed(2)}`), r.push(`Q ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${$.toFixed(2)} ${C.toFixed(2)}`);
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
const et = 9e3, it = 700, nt = 1.5;
function G(e, t) {
  const { threshold: i, p50: n, max_duration: o, min_duration: s, steepness: r } = t, a = Math.abs(e);
  if (!(n > 0) || !(i > 0)) return o;
  const c = Math.max(a, i), p = Math.log10(c / n), d = 1 / (1 + Math.exp(-r * p));
  return o - d * (o - s);
}
function Ht(e, t) {
  const i = e.speed_curve_override ?? {}, n = i.threshold ?? e.threshold ?? t.threshold, o = i.p50 ?? t.p50, s = i.peak ?? t.peak, r = i.max_duration ?? et, a = i.min_duration ?? it, c = i.steepness ?? nt;
  return { threshold: n, p50: o, peak: s, max_duration: r, min_duration: a, steepness: c };
}
function Te(e, t, i) {
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
    const [r, a] = s[0];
    return { value: e * a, factor: a, matchedUnit: r };
  }
  return { value: e, factor: 1 };
}
function ki(e, t) {
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
function En(e, t, i, n) {
  if (!i) return n;
  const o = t === "below_horizon";
  let s = e;
  o && !e.endsWith("-night") && (s = `${e}-night`);
  const r = i[s];
  if (r) return r;
  if (o && s !== "clear-night") {
    const a = i["clear-night"];
    if (a) return a;
  }
  if (s !== e) {
    const a = i[e];
    if (a) return a;
  }
  return n;
}
function Vt(e) {
  if (!e) return;
  const t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const i = Number.parseInt(t[1], 10), n = Number.parseInt(t[2], 10);
  if (!(!i || !n))
    return i / n;
}
function Ge(e) {
  const t = e.replace("#", ""), i = t.length === 3 ? t.split("").map((o) => o + o).join("") : t, n = parseInt(i, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function We(e, t, i) {
  const n = e / 255, o = t / 255, s = i / 255, r = Math.max(n, o, s), a = Math.min(n, o, s), c = (r + a) / 2;
  if (r === a) return [0, 0, c];
  const p = r - a, d = c > 0.5 ? p / (2 - r - a) : p / (r + a);
  let u;
  return r === n ? u = (o - s) / p + (o < s ? 6 : 0) : r === o ? u = (s - n) / p + 2 : u = (n - o) / p + 4, [u * 60, d, c];
}
function Yt(e, t, i) {
  let n = i;
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function On(e, t, i) {
  const n = e / 360;
  let o, s, r;
  if (t === 0)
    o = s = r = i;
  else {
    const c = i < 0.5 ? i * (1 + t) : i + t - i * t, p = 2 * i - c;
    o = Yt(p, c, n + 1 / 3), s = Yt(p, c, n), r = Yt(p, c, n - 1 / 3);
  }
  const a = (c) => Math.round(c * 255).toString(16).padStart(2, "0");
  return `#${a(o)}${a(s)}${a(r)}`;
}
function Pi(e, t) {
  const i = t.high_value - t.low_value, n = i === 0 ? 0 : Math.max(0, Math.min(1, (e - t.low_value) / i)), [o, s, r] = Ge(t.low_color), [a, c, p] = Ge(t.high_color), [d, u, h] = We(o, s, r), [g, f, v] = We(a, c, p);
  let m = g - d;
  m > 180 && (m -= 360), m < -180 && (m += 360);
  const b = (d + m * n + 360) % 360, $ = He(u, f, n), C = He(h, v, n);
  return On(b, $, C);
}
function Mi() {
  try {
    return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
const Rn = {
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
    return G(e, {
      threshold: 30,
      p50: 800,
      max_duration: et,
      min_duration: it,
      steepness: nt
    });
  },
  describe(e) {
    return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(2)} kW` : `${Math.round(e)} W`;
  }
}, zn = {
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
    return G(e, {
      threshold: 0.3,
      p50: 6,
      max_duration: et,
      min_duration: it,
      steepness: nt
    });
  },
  wave_amplitude_curve(e) {
    return 4;
  },
  describe(e) {
    return Math.abs(e) >= 100 ? `${e.toFixed(0)} L/min` : Math.abs(e) >= 10 ? `${e.toFixed(1)} L/min` : `${e.toFixed(2)} L/min`;
  }
}, Ln = {
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
    return G(e, {
      threshold: 0.05,
      p50: 50,
      max_duration: et,
      min_duration: it,
      steepness: nt
    });
  },
  particle_count_curve(e) {
    const t = Math.abs(e);
    return Math.round($e(1 + Math.log10(t + 1) * 4, 1, 20));
  },
  describe(e) {
    const t = Math.abs(e);
    return t >= 1e3 ? `${(e / 1e3).toFixed(2)} Gbps` : t >= 10 ? `${e.toFixed(1)} Mbps` : `${e.toFixed(2)} Mbps`;
  }
}, Hn = {
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
    return G(e, {
      threshold: 5,
      p50: 200,
      max_duration: et,
      min_duration: it,
      steepness: nt
    });
  },
  wave_amplitude_curve(e) {
    const t = Math.abs(e);
    return $e(2 + t / 100, 2, 10);
  },
  describe(e) {
    return `${Math.round(e)} CFM`;
  }
}, Tn = {
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
    return G(e, {
      threshold: 5e-3,
      p50: 0.5,
      max_duration: et,
      min_duration: it,
      steepness: nt
    });
  },
  describe(e) {
    return Math.abs(e) >= 10 ? `${e.toFixed(1)} m³/h` : `${e.toFixed(2)} m³/h`;
  }
}, Fi = {
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
    return G(e, {
      threshold: 1,
      p50: 100,
      max_duration: et,
      min_duration: it,
      steepness: nt
    });
  },
  describe(e) {
    return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
}, Ue = {
  energy: Rn,
  water: zn,
  network: Ln,
  hvac: Hn,
  gas: Tn,
  generic: Fi
};
function T(e) {
  return e && e in Ue ? Ue[e] : Fi;
}
const Gn = "#CCCCCC";
function Ct(e, t, i, n, o, s) {
  const r = e.color ?? Nn(i, e.id, o, s);
  return n >= 0 ? e.color_positive ?? r ?? t.default_color_positive : e.color_negative ?? r ?? t.default_color_negative;
}
function Wn(e) {
  return e < 0.5 ? 2 * e * e : 1 - (-2 * e + 2) ** 2 / 2;
}
function Ke() {
  return {
    currentDurMs: /* @__PURE__ */ new Map(),
    interpFromMs: /* @__PURE__ */ new Map(),
    interpTargetMs: /* @__PURE__ */ new Map(),
    interpStartMs: /* @__PURE__ */ new Map()
  };
}
function Zt(e, t) {
  t.interpFromMs.delete(e), t.interpTargetMs.delete(e), t.interpStartMs.delete(e);
}
const Un = 50, Kn = 500;
function jn(e, t, i, n, o) {
  if (!i)
    return o.currentDurMs.set(e, t), Zt(e, o), t;
  const s = o.currentDurMs.get(e) ?? t;
  if (Math.abs(t - s) < Un)
    return o.currentDurMs.set(e, t), Zt(e, o), t;
  o.interpTargetMs.get(e) !== t && (o.interpFromMs.set(e, s), o.interpTargetMs.set(e, t), o.interpStartMs.set(e, n));
  const a = o.interpFromMs.get(e) ?? t, c = o.interpTargetMs.get(e) ?? t, p = o.interpStartMs.get(e) ?? n, d = n - p, u = Math.min(d / Kn, 1), h = Wn(u), g = a + (c - a) * h;
  return o.currentDurMs.set(e, g), u >= 1 ? (o.currentDurMs.set(e, c), Zt(e, o), c) : g;
}
const Vn = "[FlowMe Renderer]";
function Xt(...e) {
  P(Vn, ...e);
}
const _ = "http://www.w3.org/2000/svg", K = "http://www.w3.org/1999/xlink";
function Yn() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
const Jt = Yn(), Zn = 2e3, Pt = 3, Xn = 5, qt = 2, Jn = 14, qn = 0.9, Qn = 5e3, st = 20, to = 0.2, Mt = 0.3;
class Nt {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ki(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.durInterp = Ke(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptivePassAt = 0, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0, this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1;
  }
  async init(t, i) {
    Xt("init:", t.getBoundingClientRect(), "flows:", i.flows.length), this.container = t, this.config = i, this.prefersReducedMotionFlag = Mi(), this.flowsById = new Map(i.flows.map((o) => [o.id, o]));
    const n = document.createElementNS(_, "svg");
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
      if (this.sampleFrameTime(), this.runAdaptivePassIfDue(o), s >= i) {
        this.lastFrameTime = o - s % i;
        const r = this.config?.animation?.smooth_speed !== !1, a = this.durInterp.interpStartMs.size > 0;
        r && (a || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(o), this.updateTimeBasedSpacing(o);
      }
      this.rafHandle = requestAnimationFrame(n);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(n);
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.durInterp = Ke(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.frameTimeSamples.length = 0, this.lastAdaptivePassAt = 0, this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear();
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
    const i = document.createElementNS(_, "defs");
    this.svg.appendChild(i);
    const n = new Map(this.config.nodes.map((o) => [o.id, o]));
    for (const o of this.config.flows) {
      const s = n.get(o.from_node), r = n.get(o.to_node);
      if (!s || !r) continue;
      const a = [s.position, ...o.waypoints, r.position], c = `flowme-path-${o.id}`, p = document.createElementNS(_, "path");
      p.setAttribute("id", c), p.setAttribute("d", le(a, t, o.line_style ?? "corner")), p.setAttribute("fill", "none"), i.appendChild(p);
      const d = document.createElementNS(_, "g");
      d.classList.add("flowme-flow-group"), d.setAttribute("data-flow-id", o.id), o.opacity !== void 0 && d.setAttribute("opacity", String(o.opacity)), o.visible === !1 && (d.style.display = "none");
      const u = this.config?.defaults?.line_width ?? qt, h = document.createElementNS(_, "use");
      h.classList.add("flow-line"), h.setAttributeNS(K, "href", `#${c}`), h.setAttribute("href", `#${c}`), h.setAttribute("stroke", this.primaryColor(o)), h.setAttribute("stroke-opacity", "0.2"), h.setAttribute("stroke-width", String(u)), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("fill", "none"), d.appendChild(h);
      const g = {
        group: d,
        path: p,
        pathId: c,
        outline: h,
        style: this.animStyle(o),
        particles: []
      };
      this.svg.appendChild(d), this.flowNodes.set(o.id, g), Xt("skeleton:", o.id, "| style=", g.style, "| line_style=", o.line_style ?? "corner (default)");
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
      const a = [s.position, ...n.waypoints, r.position];
      o.path.setAttribute("d", le(a, t, n.line_style ?? "corner")), o.style === "pulse" && this.applyFlow(n.id, this.latestValues.get(n.id) ?? 0);
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
    const a = this.profileFor(n), c = Ht(n, a), p = Jt ? 0 : c.threshold, d = Math.abs(i), u = s.shimmer === !0, h = u && d < p && d > 0;
    if (!(Jt || d >= p || h)) {
      this.setGroupOpacity(o, 0);
      return;
    }
    const f = Jt ? Zn : G(d, c), v = n.speed_multiplier ?? 1;
    let m = Math.max(50, f * v);
    h && (m = m / to);
    const b = this.config?.animation?.smooth_speed !== !1;
    m = jn(t, m, b, performance.now(), this.durInterp);
    const $ = s.direction ?? "auto";
    let C;
    $ === "forward" ? C = 1 : $ === "reverse" ? C = -1 : C = i < 0 != (n.reverse === !0) ? -1 : 1;
    let M = C, N = h ? Mt : 1;
    const F = 600, I = 300;
    if (b && $ === "auto") {
      const ht = this.lastDirection.get(t), Oi = this.dirChanging.get(t);
      ht !== void 0 && ht !== C && !Oi && this.dirChanging.set(t, { startMs: performance.now(), oldDir: ht, newDir: C });
      const St = this.dirChanging.get(t);
      if (St) {
        const U = performance.now() - St.startMs;
        U < F ? (U < I ? (N = (h ? Mt : 1) * (1 - U / I), M = St.oldDir) : (N = (h ? Mt : 1) * ((U - I) / I), M = St.newDir), !u && U >= 280 && U <= 320 && (m = Math.max(m, 45e3)), u && U >= 270 && U <= 330 && (N = Math.max(N, Mt))) : (this.dirChanging.delete(t), M = C);
      }
    }
    this.lastDirection.set(t, C);
    const O = n.domain ?? this.config?.domain, D = this.config?.flows.findIndex((ht) => ht.id === t) ?? -1, Y = Ct(
      n,
      a,
      O,
      M,
      this.config?.domain_colors,
      D >= 0 ? D : 0
    ), L = this.gradientColors.get(t), R = n.value_gradient?.mode ?? "flow", Wt = L && R !== "line" ? L : Y, Ei = L && R !== "flow" ? L : Y, H = Wt;
    o.outline && o.outline.setAttribute("stroke", Ei), this.setGroupOpacity(o, N);
    const Z = this.updateBurstState(t, d, c, a);
    switch (Xt("applyFlow:", t, "style=", r, "dur=", m, "dir=", M, "color=", H), r) {
      case "dots":
        this.applyDots(o, n, a, i, m, H, M, Z);
        break;
      case "dash":
        this.applyDash(o, n, m, H, M, Z);
        break;
      case "pulse":
        this.applyPulse(o, n, a, i, m, H, Z);
        break;
      case "arrow":
        this.applyArrows(o, n, m, H, M, Z);
        break;
      case "trail":
        this.applyTrail(o, n, m, H, M, Z);
        break;
      case "fluid":
        this.applyFluid(o, n, m, H, M);
        break;
      case "spark":
        this.applySpark(o, n, a, i, m, H, M, Z);
        break;
      case "none":
        this.setGroupOpacity(o, 1);
        break;
      default:
        this.applyDots(o, n, a, i, m, H, M, Z);
    }
  }
  // ── burst state ───────────────────────────────────────────────────────────
  updateBurstState(t, i, n, o) {
    const s = n.peak, r = this.config?.defaults?.burst_trigger_ratio ?? qn, a = this.config?.defaults?.burst_sustain_ms ?? Qn, c = s * r;
    if (i < c)
      return this.burstActive.delete(t), this.burstEnteredAt.delete(t), 1;
    let p = this.burstEnteredAt.get(t);
    if (p === void 0 && (p = performance.now(), this.burstEnteredAt.set(t, p)), performance.now() - p < a) return 1;
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
      this.frameTimeSamples.push(i), this.frameTimeSamples.length > 60 && this.frameTimeSamples.shift();
    }
    this.lastFrameForAdaptive = t;
  }
  avgFrameMs() {
    return this.frameTimeSamples.length === 0 ? 16.67 : this.frameTimeSamples.reduce((t, i) => t + i, 0) / this.frameTimeSamples.length;
  }
  /** ANIM-2: at most once per second, tune adaptive particle counts for all eligible flows */
  runAdaptivePassIfDue(t) {
    if (!this.config || t - this.lastAdaptivePassAt < 1e3 || this.frameTimeSamples.length < 30) return;
    this.lastAdaptivePassAt = t;
    const n = 1e3 / (this.config.animation?.fps ?? 60), o = this.avgFrameMs(), s = Fn(), r = o > n * 1.2, a = o < n * 0.8;
    for (const c of this.config.flows) {
      if (c.animation?.particle_count !== void 0) continue;
      const p = this.animStyle(c);
      if (p !== "dots" && p !== "trail") continue;
      const d = this.profileFor(c), u = Math.abs(this.latestValues.get(c.id) ?? 0), h = Ht(c, d), g = this.updateBurstState(c.id, u, h, d), f = Math.max(
        1,
        Math.round(d.particle_count_curve ? d.particle_count_curve(u) : Pt)
      ), v = this.config.defaults?.burst_max_particles ?? st, m = Math.min(v, Math.max(1, Math.round(f * g)));
      let b = this.adaptiveCount.get(c.id) ?? m;
      r && b > 1 ? (b -= 1, s && console.log("[FlowMe] adaptive count:", c.id, b, "avg frame:", o)) : a && b < m && (b += 1, s && console.log("[FlowMe] adaptive count:", c.id, b, "avg frame:", o)), this.adaptiveCount.set(c.id, Math.min(b, m));
    }
  }
  /** Resolve effective particle count, respecting explicit override and burst */
  resolveParticleCount(t, i, n, o) {
    const s = t.animation ?? {};
    if (s.particle_count !== void 0) return s.particle_count;
    const r = Math.max(
      1,
      Math.round(i.particle_count_curve ? i.particle_count_curve(n) : Pt)
    ), a = this.config?.defaults?.burst_max_particles ?? st, c = Math.min(a, Math.max(1, Math.round(r * o))), p = this.animStyle(t);
    return p === "dots" || p === "trail" ? Math.min(this.adaptiveCount.get(t.id) ?? c, c) : c;
  }
  resolveParticleRadius(t) {
    return (this.config?.defaults?.dot_radius ?? Xn) * (t.animation?.particle_size ?? 1);
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
    const s = o.particle_spacing ?? "even", r = n / 1e3, a = r / i;
    switch (s) {
      case "even":
      default:
        return Array.from({ length: i }, (c, p) => -(a * p));
      case "random": {
        const c = performance.now(), p = this.randomOffsetsLastUpdate.get(t) ?? 0, d = 3e3;
        let u = this.randomOffsets.get(t);
        if (!u || u.length !== i || c - p > d) {
          const h = a * 0.1, g = [];
          for (let f = 0; f < i; f++) {
            let v, m = 0;
            do
              v = -(Math.random() * r), m++;
            while (m < 20 && g.some((b) => {
              const $ = Math.abs((v - b) % r + r) % r;
              return $ < h && $ > r - h;
            }));
            g.push(v);
          }
          this.randomOffsets.set(t, g), this.randomOffsetsLastUpdate.set(t, c), u = g;
        }
        return u;
      }
      case "clustered": {
        const c = Math.max(1, Math.round(o.cluster_size ?? 3)), p = o.cluster_gap ?? 3, d = a * 0.3, u = [];
        let h = 0;
        for (let g = 0; g < i; g++) {
          const f = g % c;
          g > 0 && f === 0 && (h += d * c * p), u.push(-(h % r)), h += d;
        }
        return u;
      }
      case "pulse": {
        const c = 1 / Math.max(0.01, o.pulse_frequency ?? 1.5), p = o.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % c < c * p ? Array.from({ length: i }, (h, g) => -(a * 0.1 * g)) : Array.from({ length: i }, (h, g) => -(a * g));
      }
      case "wave_spacing": {
        const c = o.wave_frequency ?? 2, p = o.wave_amplitude ?? 0.85;
        return Array.from({ length: i }, (d, u) => {
          const h = u / i * Math.PI * 2 * c, g = Math.sin(h) * p * (r / 2);
          return -(a * u + g);
        });
      }
      case "wave_lateral":
        return Array.from({ length: i }, (c, p) => -(a * p));
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
        const o = i.animation?.wave_frequency ?? 2, s = i.animation?.wave_amplitude ?? 20, r = n.particles.length, a = Math.PI * 2 / r, c = t * o * 2e-3 % (Math.PI * 2);
        for (let p = 0; p < r; p++) {
          const d = n.particles[p];
          if (!d) continue;
          const u = c + p * a, h = Math.sin(u) * s;
          if (d.shape.getAttribute("data-kind") === "custom_svg") {
            d.shape.hasAttribute("data-base-transform") || d.shape.setAttribute("data-base-transform", d.shape.getAttribute("transform") ?? "");
            const f = d.shape.getAttribute("data-base-transform") ?? "";
            d.shape.setAttribute("transform", `${f} translate(0,${h.toFixed(2)})`);
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
        const s = o.particles.length, a = (this.durInterp.currentDurMs.get(i.id) ?? 2e3) / 1e3, c = i.animation ?? {}, p = [];
        if (n === "wave_spacing") {
          const h = c.wave_frequency ?? 2, g = Math.min(c.wave_amplitude ?? 0.85, 0.95), f = t * 1e-3 / a, v = [];
          for (let m = 0; m < s; m++) {
            const b = (m / s + f) % 1, $ = Math.sin(b * Math.PI * 2 * h) * g * (1 / s);
            v.push(((b + $) % 1 + 1) % 1);
          }
          v.sort((m, b) => m - b), p.push(...v);
        } else {
          const h = c.pulse_frequency ?? 1.5, g = c.pulse_ratio ?? 0.25, f = t * h * 1e-3 % 1, v = t * 1e-3 / a % 1, m = 1 / s;
          let b;
          f < g ? b = 1 - (1 - f / g) * 0.9 : b = (f - g) / (1 - g);
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
          const g = o.particles[h];
          if (!g) continue;
          if (!g.animateMotion.hasAttribute("data-js-driven")) {
            const v = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            v.setAttribute("data-js-driven", "1"), v.setAttribute("begin", "indefinite"), v.setAttribute("dur", "1s"), g.animateMotion.replaceWith(v), g.animateMotion = v, g.shape.appendChild(v);
          }
          const f = p[h] ?? 0;
          if (u > 0 && d)
            try {
              const v = d.getPointAtLength(f * u), m = Math.max(0.5, u * 0.01), b = d.getPointAtLength(Math.max(0, f * u - m)), $ = d.getPointAtLength(Math.min(u, f * u + m)), C = Math.atan2($.y - b.y, $.x - b.x) * (180 / Math.PI);
              g.shape.setAttribute("transform", `translate(${v.x.toFixed(2)},${v.y.toFixed(2)}) rotate(${C.toFixed(1)})`);
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
  applyDots(t, i, n, o, s, r, a, c) {
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
    const g = `${(s / 1e3).toFixed(3)}s`, f = i.animation ?? {}, v = this.resolveParticleBegins(i.id, d, s, f), m = (b, $) => {
      for (let C = 0; C < b.length; C++) {
        const M = b[C];
        this.updateParticleColor(M, r, i, n, h);
        const N = document.createElementNS(_, "animateMotion");
        N.setAttribute("repeatCount", "indefinite"), N.setAttribute("dur", g), N.setAttribute("rotate", "auto"), N.setAttribute("begin", `${(v[C] ?? 0).toFixed(3)}s`), $ < 0 && (N.setAttribute("keyPoints", "1;0"), N.setAttribute("keyTimes", "0;1"));
        const F = document.createElementNS(_, "mpath");
        F.setAttributeNS(K, "href", `#${t.pathId}`), F.setAttribute("href", `#${t.pathId}`), N.appendChild(F), M.animateMotion.replaceWith(N), M.animateMotion = N, M.shape.appendChild(N);
      }
    };
    m(t.particles, a), t.particlesBack && m(t.particlesBack, -a);
  }
  /**
   * dash — animated dashed stroke moving along path.
   * No discrete particles. dash_gap controls gap/dash ratio.
   * Burst: decreases gap ratio.
   */
  applyDash(t, i, n, o, s, r) {
    for (const b of t.particles) b.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const b = document.createElementNS(_, "use");
      b.setAttributeNS(K, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), b.setAttribute("fill", "none"), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-linejoin", "round"), t.group.appendChild(b), t.lineStroke = b;
    }
    const a = this.config?.defaults?.line_width ?? qt, p = (i.animation ?? {}).dash_gap ?? 0.5, d = Math.max(0.1, p / r), u = 14, h = u * d, g = this.glowFilter(i, this.profileFor(i), o);
    t.lineStroke.setAttribute("stroke", o), t.lineStroke.setAttribute("stroke-width", String(a * 2)), t.lineStroke.setAttribute("stroke-dasharray", `${u} ${h}`), g && t.lineStroke.setAttribute("filter", g);
    const f = u + h, v = t.lineStroke.querySelector("animate");
    v && v.remove();
    const m = document.createElementNS(_, "animate");
    m.setAttribute("attributeName", "stroke-dashoffset"), m.setAttribute("from", s > 0 ? "0" : `-${f}`), m.setAttribute("to", s > 0 ? `-${f}` : "0"), m.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), m.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(m);
  }
  /**
   * pulse — expanding rings that travel along path from source to destination,
   * fading out. Ring emission interval = speed curve duration.
   */
  applyPulse(t, i, n, o, s, r, a) {
    for (const F of t.particles) F.shape.remove();
    t.particles = [], t.lineStroke?.remove(), t.lineStroke = void 0;
    const c = new Map(this.config?.nodes.map((F) => [F.id, F]) ?? []), p = c.get(i.from_node), d = c.get(i.to_node);
    if (!p || !d) return;
    const u = [p.position, ...i.waypoints, d.position], h = Si(u), g = Math.max(
      2,
      Math.round(
        n.particle_count_curve ? n.particle_count_curve(o) : Math.max(3, Math.floor(h / 15))
      )
    ), f = this.config?.defaults?.burst_max_particles ?? st, v = Math.min(f, Math.max(2, Math.round(g * a))), m = this.containerSize(), b = i.animation?.pulse_width ?? 2, $ = Jn * (i.animation?.particle_size ?? 1), C = this.resolveGlow(i, n);
    if (!t.pulseCircles || t.pulseCircles.length !== v) {
      if (t.pulseCircles) for (const F of t.pulseCircles) F.circle.remove();
      t.pulseCircles = [];
      for (let F = 0; F < v; F++) {
        const I = document.createElementNS(_, "circle");
        I.setAttribute("r", "0"), I.setAttribute("fill", "none"), I.setAttribute("stroke", r), I.setAttribute("stroke-width", String(b)), I.setAttribute("opacity", "0"), C && I.setAttribute("filter", this.glowFilter(i, n, r));
        const O = document.createElementNS(_, "animate");
        O.setAttribute("attributeName", "r"), O.setAttribute("values", `0;${$};0`), O.setAttribute("repeatCount", "indefinite"), I.appendChild(O);
        const D = document.createElementNS(_, "animate");
        D.setAttribute("attributeName", "opacity"), D.setAttribute("values", "0;0.9;0"), D.setAttribute("repeatCount", "indefinite"), I.appendChild(D), t.group.appendChild(I), t.pulseCircles.push({ circle: I, animateRadius: O, animateOpacity: D });
      }
    }
    const M = t.path;
    let N = 0;
    try {
      N = M.getTotalLength();
    } catch {
      N = 0;
    }
    for (let F = 0; F < t.pulseCircles.length; F++) {
      const I = t.pulseCircles[F], O = (F + 0.5) / t.pulseCircles.length;
      let D;
      if (N > 0) {
        const R = M.getPointAtLength(O * N);
        D = { x: R.x, y: R.y };
      } else {
        const R = Dn(u, O);
        D = Lt(R, m);
      }
      I.circle.setAttribute("cx", D.x.toFixed(2)), I.circle.setAttribute("cy", D.y.toFixed(2)), I.circle.setAttribute("stroke", r);
      const Y = `${(s / 1e3).toFixed(3)}s`, L = `${(-s * F / (t.pulseCircles.length * 1e3)).toFixed(3)}s`;
      I.animateRadius.setAttribute("values", `0;${$};0`), I.animateRadius.setAttribute("dur", Y), I.animateRadius.setAttribute("begin", L), I.animateOpacity.setAttribute("dur", Y), I.animateOpacity.setAttribute("begin", L);
    }
  }
  /**
   * arrow — chevron-shaped particles that always orient to direction of travel.
   */
  applyArrows(t, i, n, o, s, r) {
    const a = this.profileFor(i), c = i.animation?.particle_count ?? Pt, p = this.config?.defaults?.burst_max_particles ?? st, d = Math.min(p, Math.max(1, Math.round(c * r))), u = i.animation?.flicker === !0;
    if (t.particles.length !== d) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < d; f++)
        t.particles.push(this.makeParticle(t, "arrow", o, i, a));
    }
    const h = `${(n / 1e3).toFixed(3)}s`, g = this.resolveParticleBegins(i.id, d, n, i.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const v = t.particles[f];
      this.updateParticleColor(v, o, i, a, u);
      const m = document.createElementNS(_, "animateMotion");
      m.setAttribute("repeatCount", "indefinite"), m.setAttribute("dur", h), m.setAttribute("rotate", "auto"), m.setAttribute("begin", `${(g[f] ?? 0).toFixed(3)}s`), s < 0 && (m.setAttribute("keyPoints", "1;0"), m.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(_, "mpath");
      b.setAttributeNS(K, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), m.appendChild(b), v.animateMotion.replaceWith(m), v.animateMotion = m, v.shape.appendChild(m);
    }
  }
  /**
   * trail — particles with a fading tail (gradient-filled elongated shape).
   * trail_length controls how long the tail is relative to particle_size.
   */
  applyTrail(t, i, n, o, s, r) {
    const a = this.profileFor(i), c = i.animation?.particle_count ?? Pt, p = this.config?.defaults?.burst_max_particles ?? st, d = Math.min(p, Math.max(1, Math.round(c * r))), u = i.animation?.flicker === !0;
    if (t.particles.length !== d) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < d; f++)
        t.particles.push(this.makeParticle(t, "teardrop", o, i, a));
    }
    const h = `${(n / 1e3).toFixed(3)}s`, g = this.resolveParticleBegins(i.id, d, n, i.animation ?? {});
    for (let f = 0; f < t.particles.length; f++) {
      const v = t.particles[f];
      this.updateParticleColor(v, o, i, a, u);
      const m = document.createElementNS(_, "animateMotion");
      m.setAttribute("repeatCount", "indefinite"), m.setAttribute("dur", h), m.setAttribute("rotate", "auto"), m.setAttribute("begin", `${(g[f] ?? 0).toFixed(3)}s`), s < 0 && (m.setAttribute("keyPoints", "1;0"), m.setAttribute("keyTimes", "0;1"));
      const b = document.createElementNS(_, "mpath");
      b.setAttributeNS(K, "href", `#${t.pathId}`), b.setAttribute("href", `#${t.pathId}`), m.appendChild(b), v.animateMotion.replaceWith(m), v.animateMotion = m, v.shape.appendChild(m);
    }
  }
  /**
   * fluid — continuous gradient flowing along the line.
   * Implemented as an animated stroke-dashoffset on a wide stroke.
   */
  applyFluid(t, i, n, o, s) {
    for (const d of t.particles) d.shape.remove();
    if (t.particles = [], !t.lineStroke) {
      const d = document.createElementNS(_, "use");
      d.setAttributeNS(K, "href", `#${t.pathId}`), d.setAttribute("href", `#${t.pathId}`), d.setAttribute("fill", "none"), d.setAttribute("stroke-linecap", "round"), t.group.appendChild(d), t.lineStroke = d;
    }
    const r = (this.config?.defaults?.line_width ?? qt) * 3, a = this.glowFilter(i, this.profileFor(i), o);
    t.lineStroke.setAttribute("stroke", o), t.lineStroke.setAttribute("stroke-width", String(r)), t.lineStroke.setAttribute("stroke-dasharray", "50 200"), a && t.lineStroke.setAttribute("filter", a);
    const c = t.lineStroke.querySelector("animate");
    c && c.remove();
    const p = document.createElementNS(_, "animate");
    p.setAttribute("attributeName", "stroke-dashoffset"), p.setAttribute("from", s > 0 ? "0" : "-250"), p.setAttribute("to", s > 0 ? "-250" : "0"), p.setAttribute("dur", `${(n / 1e3).toFixed(3)}s`), p.setAttribute("repeatCount", "indefinite"), t.lineStroke.appendChild(p);
  }
  /**
   * spark — particles with randomised size/opacity, slight scatter.
   * Scatter is achieved via SVG transform on each particle's <g> wrapper.
   */
  applySpark(t, i, n, o, s, r, a, c) {
    const p = this.resolveParticleCount(i, n, o, c), d = Math.min(
      this.config?.defaults?.burst_max_particles ?? st,
      Math.round(p * c)
    ), u = i.animation?.particle_shape ?? "circle", h = i.animation?.flicker === !0;
    if (t.particles.length !== d) {
      for (const f of t.particles) f.shape.remove();
      t.particles = [];
      for (let f = 0; f < d; f++) {
        const v = this.makeParticle(t, u, r, i, n), m = 0.7 + Math.random() * 0.6;
        v.shape.setAttribute("transform", `scale(${m.toFixed(2)})`), t.particles.push(v);
      }
    }
    const g = `${(s / 1e3).toFixed(3)}s`;
    for (let f = 0; f < t.particles.length; f++) {
      const v = t.particles[f], m = 0.5 + Math.random() * 0.5;
      v.shape.setAttribute("opacity", String(m.toFixed(2))), this.updateParticleColor(v, r, i, n, h);
      const b = document.createElementNS(_, "animateMotion");
      b.setAttribute("repeatCount", "indefinite"), b.setAttribute("dur", g), b.setAttribute("rotate", "auto"), b.setAttribute("begin", `${(-s * f / (t.particles.length * 1e3)).toFixed(3)}s`), a < 0 && (b.setAttribute("keyPoints", "1;0"), b.setAttribute("keyTimes", "0;1"));
      const $ = document.createElementNS(_, "mpath");
      $.setAttributeNS(K, "href", `#${t.pathId}`), $.setAttribute("href", `#${t.pathId}`), b.appendChild($), v.animateMotion.replaceWith(b), v.animateMotion = b, v.shape.appendChild(b);
    }
  }
  // ── particle shape factories ──────────────────────────────────────────────
  particleKind(t) {
    const i = t.shape.tagName.toLowerCase();
    return i === "circle" ? "circle" : i === "rect" ? "square" : i === "polygon" ? t.shape.getAttribute("data-kind") ?? "arrow" : i === "ellipse" ? "teardrop" : i === "path" ? t.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  makeParticle(t, i, n, o, s) {
    const r = this.resolveParticleRadius(o), a = this.resolveGlow(o, s);
    let c, p = !1;
    switch (i) {
      case "square": {
        const h = r * 2, g = document.createElementNS(_, "rect");
        g.setAttribute("width", String(h)), g.setAttribute("height", String(h)), g.setAttribute("x", String(-h / 2)), g.setAttribute("y", String(-h / 2)), g.setAttribute("rx", "1.5"), g.setAttribute("fill", n), g.setAttribute("opacity", "0"), c = g;
        break;
      }
      case "arrow": {
        const h = r * 2.2, g = r * 1.5, f = document.createElementNS(_, "polygon");
        f.setAttribute("points", `${h},0 ${-h * 0.4},${g} 0,0 ${-h * 0.4},${-g}`), f.setAttribute("fill", n), f.setAttribute("opacity", "0"), f.setAttribute("data-kind", "arrow"), c = f;
        break;
      }
      case "teardrop": {
        const h = o.animation?.trail_length ?? 2, g = r, f = r * h, v = document.createElementNS(_, "ellipse");
        v.setAttribute("rx", String(g)), v.setAttribute("ry", String(f)), v.setAttribute("cy", String(-f * 0.3)), v.setAttribute("fill", n), v.setAttribute("opacity", "0"), c = v;
        break;
      }
      case "diamond": {
        const h = r * 1.4, g = document.createElementNS(_, "polygon");
        g.setAttribute("points", `0,${-h} ${h},0 0,${h} ${-h},0`), g.setAttribute("fill", n), g.setAttribute("opacity", "0"), g.setAttribute("data-kind", "diamond"), c = g;
        break;
      }
      case "custom_svg": {
        const h = o.animation?.custom_svg_path ?? "";
        if (!h) {
          console.warn(`[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${o.id}`);
          const f = document.createElementNS(_, "circle");
          f.setAttribute("r", String(r)), f.setAttribute("fill", n), f.setAttribute("opacity", "0"), c = f;
          break;
        }
        const g = document.createElementNS(_, "path");
        g.setAttribute("d", h), g.setAttribute("fill", n), g.setAttribute("opacity", "0"), g.setAttribute("data-kind", "custom_svg"), t.group.appendChild(g), p = !0;
        try {
          const f = g.getBBox(), v = Math.max(f.width, f.height, 1), b = r * 2 / v, $ = -(f.x + f.width / 2), C = -(f.y + f.height / 2);
          g.setAttribute("transform", `scale(${b.toFixed(4)}) translate(${$.toFixed(4)},${C.toFixed(4)})`);
        } catch {
        }
        c = g;
        break;
      }
      default: {
        const h = document.createElementNS(_, "circle");
        h.setAttribute("r", String(r)), h.setAttribute("fill", n), h.setAttribute("opacity", "0"), c = h;
      }
    }
    a && (c.setAttribute("filter", this.glowFilter(o, s, n)), c.style.color = n);
    const d = document.createElementNS(_, "animateMotion");
    d.setAttribute("repeatCount", "indefinite"), d.setAttribute("dur", "2s");
    const u = document.createElementNS(_, "mpath");
    return u.setAttributeNS(K, "href", `#${t.pathId}`), u.setAttribute("href", `#${t.pathId}`), d.appendChild(u), c.appendChild(d), p || t.group.appendChild(c), { shape: c, animateMotion: d };
  }
  updateParticleColor(t, i, n, o, s) {
    if (t.shape.setAttribute("fill", i), t.shape.style.color = i, this.resolveGlow(n, o) && t.shape.setAttribute("filter", this.glowFilter(n, o, i)), t.shape.setAttribute("opacity", "1"), s) {
      if (!t.flickerAnim) {
        const h = document.createElementNS(_, "animate");
        h.setAttribute("attributeName", "opacity"), h.setAttribute("repeatCount", "indefinite"), t.shape.appendChild(h), t.flickerAnim = h;
      }
      const p = (1 / (2 + Math.random() * 6)).toFixed(3), d = (0.85 + Math.random() * 0.1).toFixed(2), u = (0.95 + Math.random() * 0.05).toFixed(2);
      t.flickerAnim.setAttribute("values", `${u};${d};${u}`), t.flickerAnim.setAttribute("dur", `${p}s`);
    } else t.flickerAnim && (t.flickerAnim.remove(), t.flickerAnim = void 0);
  }
  profileFor(t) {
    return T(t.domain ?? this.config?.domain);
  }
  primaryColor(t) {
    const i = this.profileFor(t), n = t.domain ?? this.config?.domain, o = this.config?.flows.findIndex((s) => s.id === t.id) ?? -1;
    return Ct(t, i, n, 1, this.config?.domain_colors, o >= 0 ? o : 0);
  }
}
const eo = `/* eslint-disable no-undef */
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
`, je = "flowme-keyframes", ce = "flowme-cycle", io = 5, no = 2;
let J = null, Ve = !1;
function oo() {
  if (document.getElementById(je)) return;
  const e = document.createElement("style");
  e.id = je, e.textContent = `@keyframes ${ce} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(e);
}
function so() {
  if (Ve) return;
  const t = CSS.registerProperty?.bind(CSS);
  if (!t) return;
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
      t({ name: n, syntax: o, inherits: !1, initialValue: s });
    } catch {
    }
  Ve = !0;
}
async function ro() {
  if (J) return J;
  const e = CSS.paintWorklet;
  if (!e)
    return J = Promise.reject(new Error("paintWorklet not available")), J;
  const t = new Blob([eo], { type: "application/javascript" }), i = URL.createObjectURL(t);
  return J = e.addModule(i).catch((n) => {
    throw J = null, n;
  }).finally(() => {
  }), J;
}
class ao {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = ki(() => this.flushUpdates(), 120), this.lastDurMsByFlow = /* @__PURE__ */ new Map();
  }
  async init(t, i) {
    this.container = t, this.config = i, this.flowsById = new Map(i.flows.map((o) => [o.id, o])), oo(), so(), await ro();
    const n = document.createElement("div");
    n.className = "flow-houdini flow-houdini-root", n.style.position = "absolute", n.style.inset = "0", n.style.pointerEvents = "none", t.appendChild(n), this.wrapper = n;
    for (const o of i.flows) {
      const s = document.createElement("div");
      s.className = "flow-houdini", s.dataset.flowId = o.id, s.style.position = "absolute", s.style.inset = "0", s.style.pointerEvents = "none", s.style.background = "paint(flowme-painter)", s.style.setProperty("--flowme-dur", "2000"), s.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)", s.style.animation = `${ce} calc(var(--flowme-dur) * 1ms) linear infinite`, s.style.opacity = "0", n.appendChild(s), this.flowDivs.set(o.id, { el: s });
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
    this.applyUpdate.cancel(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.wrapper?.remove(), this.wrapper = null, this.flowDivs.clear(), this.flowsById.clear(), this.latestValues.clear(), this.lastDurMsByFlow.clear(), this.container = null, this.config = null;
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
      const p = [s.position, ...n.waypoints, r.position].map((d) => Lt(d, t)).map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ");
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
    const s = this.profileFor(n), r = Ht(n, s), a = Math.abs(i);
    if (!(a >= r.threshold)) {
      o.el.style.opacity = "0";
      return;
    }
    o.el.style.opacity = "1";
    const p = n.speed_multiplier ?? 1, d = Math.max(50, G(a, r) * p), u = i < 0 != (n.reverse === !0) ? -1 : 1, h = n.domain ?? this.config?.domain, g = this.config?.flows.findIndex((M) => M.id === n.id) ?? -1, f = Ct(
      n,
      s,
      h,
      u,
      this.config?.domain_colors,
      g >= 0 ? g : 0
    ), v = Math.max(
      1,
      Math.round(s.particle_count_curve ? s.particle_count_curve(i) : 3)
    ), m = s.wave_amplitude_curve ? s.wave_amplitude_curve(i) : 4, b = o.el.style;
    b.setProperty("--flowme-shape", s.shape), b.setProperty("--flowme-color", f), b.setProperty("--flowme-glow", s.glow ? "1" : "0"), b.setProperty("--flowme-count", String(v)), b.setProperty("--flowme-radius", String(io)), b.setProperty("--flowme-line", String(no)), b.setProperty("--flowme-amp", String(m)), b.setProperty("--flowme-direction", String(u));
    const $ = this.lastDurMsByFlow.get(t) ?? d, C = Math.round(d);
    if (Math.abs(d - $) < 50) {
      b.transition = "none", b.setProperty("--flowme-dur", String(C));
      const M = o.el;
      requestAnimationFrame(() => {
        M.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)";
      });
    } else
      b.setProperty("--flowme-dur", String(C));
    this.lastDurMsByFlow.set(t, d), b.animation = `${ce} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }
  profileFor(t) {
    return T(t.domain ?? this.config?.domain);
  }
}
function lo() {
  const e = po(), t = e ?? "svg", i = co(), n = Mi();
  return P(
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
  ), n ? new Nt() : t === "houdini" ? i ? new ao() : (P("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new Nt()) : new Nt();
}
function co() {
  try {
    const e = CSS;
    return "paintWorklet" in e && "registerProperty" in e;
  } catch {
    return !1;
  }
}
function po() {
  try {
    const t = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (t === "svg" || t === "houdini") return t;
  } catch {
  }
  return null;
}
function Ye(e) {
  const t = e.size?.width ?? 20, i = e.size?.height ?? 15;
  return `left: ${e.position.x}%; top: ${e.position.y}%; width: ${t}%; height: ${i}%;`;
}
function uo(e, t, i) {
  P(
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
        style=${Ye(e) + s}
        tabindex="-1"
        title=${e._migration_warning}
      >
        <div class="migration-warning-inner">
          ${l("overlays.migrationPrefix")} ${e._migration_warning}
        </div>
      </div>
    ` : y`
    <div
      class="overlay overlay-custom overlay-interactive overlay-wrapper"
      data-overlay-id=${e.id}
      style=${Ye(e) + s}
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
let Qt = null, rt = null;
async function ho() {
  if (Qt) return Qt;
  if (rt) return rt;
  const t = window.loadCardHelpers;
  return typeof t != "function" ? null : (rt = t().then((i) => (Qt = i, rt = null, i)).catch((i) => {
    throw rt = null, i;
  }), rt);
}
async function go(e) {
  const t = await ho();
  return t ? t.createCardElement(e) : null;
}
var fo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, Gt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? mo(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && fo(t, i, o), o;
};
let ut = class extends Q {
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
        yn(e);
      } catch (i) {
        this.errorMessage = i instanceof Error ? i.message : String(i);
        return;
      }
      this.errorMessage = void 0, go(e).then((i) => {
        if (!i) {
          this.errorMessage = l("overlays.haHelpersUnavailable"), this.requestUpdate();
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
ut.styles = ge`
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
Gt([
  _t({ attribute: !1 })
], ut.prototype, "hass", 2);
Gt([
  _t({ attribute: !1 })
], ut.prototype, "card", 2);
Gt([
  k()
], ut.prototype, "errorMessage", 2);
ut = Gt([
  be("flowme-custom-overlay")
], ut);
const bo = 100;
class yo {
  constructor(t) {
    this.apply = t, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(t) {
    if (t.prev !== t.next) {
      for (this.apply(t.next), this.undoStack.push(t); this.undoStack.length > bo; ) this.undoStack.shift();
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
function A(e) {
  return JSON.parse(JSON.stringify(e));
}
function E(e) {
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function Ft(e, t = 8) {
  return Math.round(e / t) * t;
}
function vo(e) {
  const t = new Set(e.nodes.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `node_${i}`;
    if (!t.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function wo(e) {
  const t = new Set(e.flows.map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `flow_${i}`;
    if (!t.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function te(e, t, i) {
  const n = A(e);
  for (const o of n.nodes)
    o.id === t && (o.position = { x: E(i.x), y: E(i.y) });
  return n;
}
function xo(e, t, i) {
  const n = A(e), o = {
    id: vo(e),
    position: { x: E(t.x), y: E(t.y) },
    ...i ? { label: i } : {}
  };
  return n.nodes.push(o), { config: n, node: o };
}
function $o(e, t) {
  const i = A(e);
  return i.nodes = i.nodes.filter((n) => n.id !== t), i.flows = i.flows.filter((n) => n.from_node !== t && n.to_node !== t), i;
}
function Ao(e, t) {
  const i = A(e);
  for (const n of i.nodes) {
    const o = t.get(n.id);
    o && (n.position = { x: E(o.x), y: E(o.y) });
  }
  return i;
}
function Co(e, t) {
  const i = A(e);
  return i.nodes = i.nodes.filter((n) => !t.has(n.id)), i.flows = i.flows.filter((n) => !t.has(n.from_node) && !t.has(n.to_node)), i;
}
function Ze(e, t, i) {
  const n = A(e);
  for (const o of n.nodes)
    t.has(o.id) && (o.visible = i);
  return n;
}
function Io(e, t, i) {
  const n = e.nodes.find((s) => s.id === i);
  if (!n) return e;
  const o = A(e);
  for (const s of o.nodes)
    t.has(s.id) && (s.position = { ...s.position, y: n.position.y });
  return o;
}
function _o(e, t, i) {
  const n = e.nodes.find((s) => s.id === i);
  if (!n) return e;
  const o = A(e);
  for (const s of o.nodes)
    t.has(s.id) && (s.position = { ...s.position, x: n.position.x });
  return o;
}
function Xe(e, t, i) {
  const n = A(e);
  for (const o of n.nodes)
    o.id === t && (i && i.length ? o.label = i : delete o.label);
  return n;
}
function ee(e, t, i, n) {
  const o = A(e);
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
function Je(e, t, i, n) {
  const o = A(e);
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
function qe(e, t, i) {
  const n = A(e);
  for (const o of n.flows)
    if (o.id === t) {
      if (i < 0 || i >= o.waypoints.length) return e;
      o.waypoints.splice(i, 1);
    }
  return n;
}
function Qe(e, t, i, n) {
  const o = A(e), s = {
    id: wo(e),
    from_node: t,
    to_node: i,
    entity: n,
    waypoints: []
  };
  return o.flows.push(s), { config: o, flow: s };
}
function So(e, t) {
  const i = A(e);
  return i.flows = i.flows.filter((n) => n.id !== t), i;
}
function ko(e, t) {
  const i = A(e);
  return i.background.default = t, i;
}
function Po(e, t) {
  const i = A(e);
  return t && t.length ? i.background.weather_entity = t : delete i.background.weather_entity, i;
}
function Mo(e, t) {
  const i = A(e);
  return t && t.length ? i.background.sun_entity = t : delete i.background.sun_entity, i;
}
function Fo(e, t) {
  const i = A(e);
  return t === void 0 || !Number.isFinite(t) ? delete i.background.transition_duration : i.background.transition_duration = Math.max(0, Math.floor(t)), i;
}
function ti(e, t, i) {
  var o;
  const n = A(e);
  return (o = n.background).weather_states ?? (o.weather_states = {}), n.background.weather_states[t] = i, n;
}
function Bo(e, t) {
  const i = A(e);
  return i.background.weather_states && (delete i.background.weather_states[t], Object.keys(i.background.weather_states).length === 0 && delete i.background.weather_states), i;
}
function No(e) {
  const t = new Set((e.overlays ?? []).map((i) => i.id));
  for (let i = 1; i < 1e4; i++) {
    const n = `overlay_${i}`;
    if (!t.has(n)) return n;
  }
  return `overlay_${Date.now()}`;
}
function Do(e, t) {
  const i = A(e), n = t.id ?? No(e), o = {
    ...t,
    id: n,
    position: {
      x: E(t.position.x),
      y: E(t.position.y)
    }
  };
  return i.overlays = [...i.overlays ?? [], o], { config: i, overlay: o };
}
function Eo(e, t) {
  const i = A(e);
  return i.overlays = (i.overlays ?? []).filter((n) => n.id !== t), i.overlays.length === 0 && delete i.overlays, i;
}
function Oo(e, t, i) {
  const n = A(e);
  for (const o of n.overlays ?? [])
    o.id === t && (o.position = { x: E(i.x), y: E(i.y) });
  return n;
}
function ei(e, t, i) {
  const n = A(e), o = Math.max(2, Math.min(100, i.width)), s = Math.max(2, Math.min(100, i.height));
  for (const r of n.overlays ?? [])
    r.id === t && (r.size = { width: o, height: s });
  return n;
}
function Ro(e, t, i) {
  const n = A(e);
  for (const o of n.overlays ?? [])
    o.id === t && i && (o.card = i);
  return n;
}
function zo(e, t, i) {
  const n = A(e);
  for (const o of n.overlays ?? [])
    o.id === t && (i ? delete o.visible : o.visible = !1);
  return n;
}
function Lo(e, t, i) {
  const n = A(e);
  for (const o of n.overlays ?? [])
    if (o.id === t) {
      const s = Math.max(0, Math.min(1, i));
      s === 1 ? delete o.opacity : o.opacity = s;
    }
  return n;
}
function ii(e, t, i) {
  const n = A(e);
  return n.opacity = { ...n.opacity, [t]: i }, n;
}
function Ho(e, t, i) {
  const n = A(e);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function To(e, t, i) {
  const n = A(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 ? delete s.opacity : s.opacity = i, s;
  }), n;
}
function Go(e, t, i) {
  const n = A(e);
  return n.defaults = { ...n.defaults, [t]: i }, n;
}
function Wo(e, t, i) {
  if (t === i) return e;
  const n = A(e), o = n.background.weather_states;
  if (!o || !(t in o)) return e;
  const s = o[t];
  return s === void 0 ? e : (delete o[t], o[i] = s, n);
}
function Uo(e, t, i) {
  const n = A(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 || i === "corner" ? delete s.line_style : s.line_style = i, s;
  }), n;
}
function ni(e, t, i) {
  const n = A(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i === void 0 ? delete s.color : s.color = i, s;
  }), n;
}
function oi(e, t, i) {
  const n = A(e);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function Ko(e, t, i) {
  const n = A(e);
  return n.flows = n.flows.map((o) => {
    if (o.id !== t) return o;
    const s = { ...o };
    return i ? delete s.visible : s.visible = !1, s;
  }), n;
}
function jo(e, t, i) {
  const n = A(e);
  return n.visibility = { ...n.visibility, [t]: i }, n;
}
function si(e, t, i) {
  const n = A(e);
  return i === void 0 ? n.domain_colors && (delete n.domain_colors[t], Object.keys(n.domain_colors).length === 0 && delete n.domain_colors) : n.domain_colors = { ...n.domain_colors, [t]: i }, n;
}
function Vo(e, t) {
  const i = A(e);
  return i.domain = t, i;
}
function Yo(e, t, i) {
  const n = i.trim();
  if (!n || n === t) return e;
  const o = e.flows.findIndex((r) => r.id === t);
  if (o < 0 || e.flows.some((r, a) => a !== o && r.id === n)) return e;
  const s = A(e);
  return s.flows = s.flows.map((r) => r.id === t ? { ...r, id: n } : r), s;
}
function ri(e, t, i) {
  const n = i.trim();
  if (!n || n === t) return e;
  const o = e.overlays ?? [], s = o.findIndex((a) => a.id === t);
  if (s < 0 || o.some((a, c) => c !== s && a.id === n)) return e;
  const r = A(e);
  return r.overlays = o.map((a) => a.id === t ? { ...a, id: n } : a), r;
}
function ai(e, t, i) {
  const n = A(e);
  return n.flows = n.flows.map((o) => o.id !== t ? o : { ...o, speed_curve_override: { ...o.speed_curve_override, ...i } }), n;
}
function Zo(e, t) {
  const i = A(e);
  return i.flows = i.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return delete o.speed_curve_override, o;
  }), i;
}
function Xo(e, t, i) {
  const n = A(e);
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
function Jo(e, t) {
  const i = A(e);
  return i.flows = i.flows.map((n) => {
    if (n.id !== t) return n;
    const o = { ...n };
    return delete o.animation, o;
  }), i;
}
function li(e, t) {
  const i = A(e);
  return i.animation = { ...i.animation, ...t }, i;
}
function qo(e, t, i) {
  const n = A(e), o = n.flows.find((s) => s.id === t);
  return o && (o.value_gradient = i), n;
}
function Qo(e, t, i) {
  const n = A(e), o = n.flows.find((s) => s.id === t);
  return o && (o.value_gradient = { ...o.value_gradient, ...i }), n;
}
function ci(e, t) {
  const i = A(e), n = i.flows.find((o) => o.id === t);
  return n && delete n.value_gradient, i;
}
const Ae = 8, di = 1, de = 255;
function ts(e, t = Ae) {
  const i = Math.max(1, Math.floor(t)), n = Math.max(1, Math.ceil(e.width / i)), o = Math.max(1, Math.ceil(e.height / i)), s = new Uint16Array(n * o);
  for (let r = 0; r < o; r++) {
    const a = r * i, c = Math.min(e.height, a + i);
    for (let p = 0; p < n; p++) {
      const d = p * i, u = Math.min(e.width, d + i);
      let h = 0;
      for (let f = a; f < c; f++) {
        const v = f * e.width;
        for (let m = d; m < u; m++) {
          const b = e.data[v + m] ?? 0;
          b > h && (h = b);
        }
      }
      const g = de - h;
      s[r * n + p] = g < di ? di : g;
    }
  }
  return { cols: n, rows: o, cellSize: i, data: s };
}
function es(e, t, i) {
  return i * e.cols + t;
}
function is(e, t, i) {
  return t < 0 || i < 0 || t >= e.cols || i >= e.rows ? de : e.data[es(e, t, i)] ?? de;
}
const ns = 480, os = 270, ss = 30;
function rs(e, t, i = ns, n = os) {
  if (e <= 0 || t <= 0) return { width: 1, height: 1 };
  const o = Math.min(i / e, n / t, 1);
  return {
    width: Math.max(1, Math.floor(e * o)),
    height: Math.max(1, Math.floor(t * o))
  };
}
function as(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let o = 0, s = 0; o < e.length; o += 4, s++) {
    const r = e[o] ?? 0, a = e[o + 1] ?? 0, c = e[o + 2] ?? 0;
    n[s] = 0.2126 * r + 0.7152 * a + 0.0722 * c;
  }
  return n;
}
function ls(e, t, i) {
  const n = new Uint8ClampedArray(e.length);
  for (let s = 0; s < i; s++) {
    const r = s * t;
    for (let a = 0; a < t; a++) {
      const c = e[r + Math.max(0, a - 1)] ?? 0, p = e[r + a] ?? 0, d = e[r + Math.min(t - 1, a + 1)] ?? 0;
      n[r + a] = c + 2 * p + d >> 2;
    }
  }
  const o = new Uint8ClampedArray(e.length);
  for (let s = 0; s < i; s++) {
    const r = s * t, a = Math.max(0, s - 1) * t, c = Math.min(i - 1, s + 1) * t;
    for (let p = 0; p < t; p++) {
      const d = n[a + p] ?? 0, u = n[r + p] ?? 0, h = n[c + p] ?? 0;
      o[r + p] = d + 2 * u + h >> 2;
    }
  }
  return o;
}
function cs(e, t, i) {
  const n = new Uint8ClampedArray(t * i);
  for (let o = 1; o < i - 1; o++) {
    const s = (o - 1) * t, r = o * t, a = (o + 1) * t;
    for (let c = 1; c < t - 1; c++) {
      const p = e[s + (c - 1)] ?? 0, d = e[s + c] ?? 0, u = e[s + (c + 1)] ?? 0, h = e[r + (c - 1)] ?? 0, g = e[r + (c + 1)] ?? 0, f = e[a + (c - 1)] ?? 0, v = e[a + c] ?? 0, m = e[a + (c + 1)] ?? 0, b = -p - 2 * h - f + u + 2 * g + m, $ = -p - 2 * d - u + f + 2 * v + m;
      let C = Math.sqrt(b * b + $ * $);
      C < ss && (C = 0), C > 255 && (C = 255), n[r + c] = C;
    }
  }
  return { width: t, height: i, data: n };
}
function Bi(e, t, i) {
  const n = rs(t, i), o = document.createElement("canvas");
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
function ds(e, t, i) {
  const { width: n, height: o, rgba: s } = Bi(e, t, i), r = as(s, n, o), a = ls(r, n, o);
  return cs(a, n, o);
}
const ps = 50;
class us {
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
function hs(e, t, i) {
  const [n, o] = t, [s, r] = i;
  if (n < 0 || o < 0 || n >= e.cols || o >= e.rows || s < 0 || r < 0 || s >= e.cols || r >= e.rows) return null;
  if (n === s && o === r) return [[n, o]];
  const a = e.cols * e.rows, c = new Float32Array(a);
  c.fill(1 / 0);
  const p = new Int16Array(a), d = new Int16Array(a);
  p.fill(-1), d.fill(-1);
  const u = new Uint8Array(a), h = new Uint8Array(a), g = o * e.cols + n;
  c[g] = 0;
  const f = new us();
  f.push({ col: n, row: o, f: pi(n, o, s, r) });
  const v = [
    [1, 0, 1],
    [-1, 0, 2],
    [0, 1, 3],
    [0, -1, 4]
  ];
  for (; f.size > 0; ) {
    const m = f.pop(), { col: b, row: $ } = m, C = $ * e.cols + b;
    if (!h[C]) {
      if (h[C] = 1, b === s && $ === r)
        return gs(e, p, d, i);
      for (const [M, N, F] of v) {
        const I = b + M, O = $ + N;
        if (I < 0 || O < 0 || I >= e.cols || O >= e.rows) continue;
        const D = O * e.cols + I;
        if (h[D]) continue;
        const Y = is(e, I, O), L = u[C] && u[C] !== F ? ps : 0, R = (c[C] ?? 1 / 0) + Y + L;
        if (R < (c[D] ?? 1 / 0)) {
          c[D] = R, p[D] = b, d[D] = $, u[D] = F;
          const Wt = R + pi(I, O, s, r);
          f.push({ col: I, row: O, f: Wt });
        }
      }
    }
  }
  return null;
}
function pi(e, t, i, n) {
  return Math.abs(e - i) + Math.abs(t - n);
}
function gs(e, t, i, n) {
  const o = [];
  let s = n[0], r = n[1];
  for (; s !== -1 && r !== -1; ) {
    o.push([s, r]);
    const a = r * e.cols + s, c = t[a] ?? -1, p = i[a] ?? -1;
    if (c === s && p === r || (s = c, r = p, s < 0 || r < 0)) break;
  }
  return o.reverse(), o[0]?.[0] === -1 && o.shift(), o;
}
function fs(e) {
  if (e.length <= 2) return [...e];
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i++) {
    const n = e[i - 1], o = e[i], s = e[i + 1], r = o[0] - n[0], a = o[1] - n[1], c = s[0] - o[0], p = s[1] - o[1];
    r * p - a * c === 0 && Math.sign(r) === Math.sign(c) && Math.sign(a) === Math.sign(p) || t.push(o);
  }
  return t.push(e[e.length - 1]), t;
}
function ms(e, t, i) {
  const n = ui(t, e), o = ui(i, e), s = hs(e, n, o);
  return !s || s.length < 2 ? { waypoints: [], edgesUsable: !0 } : { waypoints: fs(s).slice(1, -1).map((p) => bs(p, e)), edgesUsable: !0 };
}
function ui(e, t) {
  const i = hi(Math.floor(e.x / 100 * t.cols), 0, t.cols - 1), n = hi(Math.floor(e.y / 100 * t.rows), 0, t.rows - 1);
  return [i, n];
}
function bs(e, t) {
  return {
    x: (e[0] + 0.5) / t.cols * 100,
    y: (e[1] + 0.5) / t.rows * 100
  };
}
function hi(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
const Dt = /* @__PURE__ */ new Map();
async function ys(e, t = {}) {
  const i = performance.now(), n = t.cellSize ?? Ae, o = `${e.imageUrl}|${n}`, s = Dt.has(o);
  let r = null;
  try {
    r = await ws(o, e.imageUrl, n);
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
  const { waypoints: a, edgesUsable: c } = ms(r, e.from, e.to);
  return {
    waypoints: a,
    cached: s,
    edgesUsable: c,
    elapsedMs: performance.now() - i
  };
}
async function vs(e) {
  if (!e) return null;
  try {
    const t = await Ni(e);
    return Bi(t, t.naturalWidth, t.naturalHeight);
  } catch {
    return null;
  }
}
function ws(e, t, i) {
  const n = Dt.get(e);
  if (n) return n;
  const o = xs(t, i).catch((s) => {
    throw Dt.delete(e), s;
  });
  return Dt.set(e, o), o;
}
async function xs(e, t) {
  const i = await Ni(e);
  await gi();
  const n = ds(i, i.naturalWidth, i.naturalHeight);
  return await gi(), ts(n, t);
}
function Ni(e) {
  return new Promise((t, i) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => t(n), n.onerror = () => i(new Error(`Failed to load background image: ${e}`)), n.src = e;
  });
}
function gi() {
  return new Promise((e) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(e, 0)) : setTimeout(e, 0);
  });
}
const Di = "ZnVuY3Rpb24gZCh0LCBuID0gOCkgewogIGNvbnN0IG8gPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG4pKSwgYyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0LndpZHRoIC8gbykpLCByID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHQuaGVpZ2h0IC8gbykpLCBzID0gbmV3IFVpbnQxNkFycmF5KGMgKiByKTsKICBmb3IgKGxldCBlID0gMDsgZSA8IHI7IGUrKykgewogICAgY29uc3QgbCA9IGUgKiBvLCBhID0gTWF0aC5taW4odC5oZWlnaHQsIGwgKyBvKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBpICogbywgdSA9IE1hdGgubWluKHQud2lkdGgsIGYgKyBvKTsKICAgICAgbGV0IGggPSAwOwogICAgICBmb3IgKGxldCBwID0gbDsgcCA8IGE7IHArKykgewogICAgICAgIGNvbnN0IEUgPSBwICogdC53aWR0aDsKICAgICAgICBmb3IgKGxldCB5ID0gZjsgeSA8IHU7IHkrKykgewogICAgICAgICAgY29uc3QgbSA9IHQuZGF0YVtFICsgeV0gPz8gMDsKICAgICAgICAgIG0gPiBoICYmIChoID0gbSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGNvbnN0IHggPSAyNTUgLSBoOwogICAgICBzW2UgKiBjICsgaV0gPSB4IDwgMSA/IDEgOiB4OwogICAgfQogIH0KICByZXR1cm4geyBjb2xzOiBjLCByb3dzOiByLCBjZWxsU2l6ZTogbywgZGF0YTogcyB9Owp9CmZ1bmN0aW9uIFAodCwgbiwgbykgewogIHJldHVybiBvICogdC5jb2xzICsgbjsKfQpmdW5jdGlvbiBSKHQsIG4sIG8pIHsKICByZXR1cm4gbiA8IDAgfHwgbyA8IDAgfHwgbiA+PSB0LmNvbHMgfHwgbyA+PSB0LnJvd3MgPyAyNTUgOiB0LmRhdGFbUCh0LCBuLCBvKV0gPz8gMjU1Owp9CmNvbnN0IE4gPSA1MDsKY2xhc3MgayB7CiAgY29uc3RydWN0b3IoKSB7CiAgICB0aGlzLmFyciA9IFtdOwogIH0KICBwdXNoKG4pIHsKICAgIHRoaXMuYXJyLnB1c2gobiksIHRoaXMuYnViYmxlVXAodGhpcy5hcnIubGVuZ3RoIC0gMSk7CiAgfQogIHBvcCgpIHsKICAgIGlmICh0aGlzLmFyci5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IG4gPSB0aGlzLmFyclswXSwgbyA9IHRoaXMuYXJyLnBvcCgpOwogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aCA+IDAgJiYgKHRoaXMuYXJyWzBdID0gbywgdGhpcy5zaW5rRG93bigwKSksIG47CiAgfQogIGdldCBzaXplKCkgewogICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDsKICB9CiAgYnViYmxlVXAobikgewogICAgZm9yICg7IG4gPiAwOyApIHsKICAgICAgY29uc3QgbyA9IG4gLSAxID4+IDE7CiAgICAgIGlmICgodGhpcy5hcnJbb10/LmYgPz8gMCkgPD0gKHRoaXMuYXJyW25dPy5mID8/IDApKSByZXR1cm47CiAgICAgIFt0aGlzLmFycltvXSwgdGhpcy5hcnJbbl1dID0gW3RoaXMuYXJyW25dLCB0aGlzLmFycltvXV0sIG4gPSBvOwogICAgfQogIH0KICBzaW5rRG93bihuKSB7CiAgICBjb25zdCBvID0gdGhpcy5hcnIubGVuZ3RoOwogICAgZm9yICg7IDsgKSB7CiAgICAgIGNvbnN0IGMgPSAyICogbiArIDEsIHIgPSAyICogbiArIDI7CiAgICAgIGxldCBzID0gbjsKICAgICAgaWYgKGMgPCBvICYmICh0aGlzLmFycltjXT8uZiA/PyAwKSA8ICh0aGlzLmFycltzXT8uZiA/PyAwKSAmJiAocyA9IGMpLCByIDwgbyAmJiAodGhpcy5hcnJbcl0/LmYgPz8gMCkgPCAodGhpcy5hcnJbc10/LmYgPz8gMCkgJiYgKHMgPSByKSwgcyA9PT0gbikgcmV0dXJuOwogICAgICBbdGhpcy5hcnJbc10sIHRoaXMuYXJyW25dXSA9IFt0aGlzLmFycltuXSwgdGhpcy5hcnJbc11dLCBuID0gczsKICAgIH0KICB9Cn0KZnVuY3Rpb24geih0LCBuLCBvKSB7CiAgY29uc3QgW2MsIHJdID0gbiwgW3MsIGVdID0gbzsKICBpZiAoYyA8IDAgfHwgciA8IDAgfHwgYyA+PSB0LmNvbHMgfHwgciA+PSB0LnJvd3MgfHwgcyA8IDAgfHwgZSA8IDAgfHwgcyA+PSB0LmNvbHMgfHwgZSA+PSB0LnJvd3MpIHJldHVybiBudWxsOwogIGlmIChjID09PSBzICYmIHIgPT09IGUpIHJldHVybiBbW2MsIHJdXTsKICBjb25zdCBsID0gdC5jb2xzICogdC5yb3dzLCBhID0gbmV3IEZsb2F0MzJBcnJheShsKTsKICBhLmZpbGwoMSAvIDApOwogIGNvbnN0IGkgPSBuZXcgSW50MTZBcnJheShsKSwgZiA9IG5ldyBJbnQxNkFycmF5KGwpOwogIGkuZmlsbCgtMSksIGYuZmlsbCgtMSk7CiAgY29uc3QgdSA9IG5ldyBVaW50OEFycmF5KGwpLCBoID0gbmV3IFVpbnQ4QXJyYXkobCksIHggPSByICogdC5jb2xzICsgYzsKICBhW3hdID0gMDsKICBjb25zdCBwID0gbmV3IGsoKTsKICBwLnB1c2goeyBjb2w6IGMsIHJvdzogciwgZjogSShjLCByLCBzLCBlKSB9KTsKICBjb25zdCBFID0gWwogICAgWzEsIDAsIDFdLAogICAgWy0xLCAwLCAyXSwKICAgIFswLCAxLCAzXSwKICAgIFswLCAtMSwgNF0KICBdOwogIGZvciAoOyBwLnNpemUgPiAwOyApIHsKICAgIGNvbnN0IHkgPSBwLnBvcCgpLCB7IGNvbDogbSwgcm93OiBNIH0gPSB5LCB3ID0gTSAqIHQuY29scyArIG07CiAgICBpZiAoIWhbd10pIHsKICAgICAgaWYgKGhbd10gPSAxLCBtID09PSBzICYmIE0gPT09IGUpCiAgICAgICAgcmV0dXJuIFgodCwgaSwgZiwgbyk7CiAgICAgIGZvciAoY29uc3QgW0wsIGcsIF9dIG9mIEUpIHsKICAgICAgICBjb25zdCBDID0gbSArIEwsIGIgPSBNICsgZzsKICAgICAgICBpZiAoQyA8IDAgfHwgYiA8IDAgfHwgQyA+PSB0LmNvbHMgfHwgYiA+PSB0LnJvd3MpIGNvbnRpbnVlOwogICAgICAgIGNvbnN0IEEgPSBiICogdC5jb2xzICsgQzsKICAgICAgICBpZiAoaFtBXSkgY29udGludWU7CiAgICAgICAgY29uc3QgRCA9IFIodCwgQywgYiksIEYgPSB1W3ddICYmIHVbd10gIT09IF8gPyBOIDogMCwgVSA9IChhW3ddID8/IDEgLyAwKSArIEQgKyBGOwogICAgICAgIGlmIChVIDwgKGFbQV0gPz8gMSAvIDApKSB7CiAgICAgICAgICBhW0FdID0gVSwgaVtBXSA9IG0sIGZbQV0gPSBNLCB1W0FdID0gXzsKICAgICAgICAgIGNvbnN0IE8gPSBVICsgSShDLCBiLCBzLCBlKTsKICAgICAgICAgIHAucHVzaCh7IGNvbDogQywgcm93OiBiLCBmOiBPIH0pOwogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICByZXR1cm4gbnVsbDsKfQpmdW5jdGlvbiBJKHQsIG4sIG8sIGMpIHsKICByZXR1cm4gTWF0aC5hYnModCAtIG8pICsgTWF0aC5hYnMobiAtIGMpOwp9CmZ1bmN0aW9uIFgodCwgbiwgbywgYykgewogIGNvbnN0IHIgPSBbXTsKICBsZXQgcyA9IGNbMF0sIGUgPSBjWzFdOwogIGZvciAoOyBzICE9PSAtMSAmJiBlICE9PSAtMTsgKSB7CiAgICByLnB1c2goW3MsIGVdKTsKICAgIGNvbnN0IGwgPSBlICogdC5jb2xzICsgcywgYSA9IG5bbF0gPz8gLTEsIGkgPSBvW2xdID8/IC0xOwogICAgaWYgKGEgPT09IHMgJiYgaSA9PT0gZSB8fCAocyA9IGEsIGUgPSBpLCBzIDwgMCB8fCBlIDwgMCkpIGJyZWFrOwogIH0KICByZXR1cm4gci5yZXZlcnNlKCksIHJbMF0/LlswXSA9PT0gLTEgJiYgci5zaGlmdCgpLCByOwp9CmNvbnN0IFogPSAzMDsKZnVuY3Rpb24gdih0LCBuLCBvKSB7CiAgY29uc3QgYyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuICogbyk7CiAgZm9yIChsZXQgciA9IDAsIHMgPSAwOyByIDwgdC5sZW5ndGg7IHIgKz0gNCwgcysrKSB7CiAgICBjb25zdCBlID0gdFtyXSA/PyAwLCBsID0gdFtyICsgMV0gPz8gMCwgYSA9IHRbciArIDJdID8/IDA7CiAgICBjW3NdID0gMC4yMTI2ICogZSArIDAuNzE1MiAqIGwgKyAwLjA3MjIgKiBhOwogIH0KICByZXR1cm4gYzsKfQpmdW5jdGlvbiBHKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHQubGVuZ3RoKTsKICBmb3IgKGxldCBzID0gMDsgcyA8IG87IHMrKykgewogICAgY29uc3QgZSA9IHMgKiBuOwogICAgZm9yIChsZXQgbCA9IDA7IGwgPCBuOyBsKyspIHsKICAgICAgY29uc3QgYSA9IHRbZSArIE1hdGgubWF4KDAsIGwgLSAxKV0gPz8gMCwgaSA9IHRbZSArIGxdID8/IDAsIGYgPSB0W2UgKyBNYXRoLm1pbihuIC0gMSwgbCArIDEpXSA/PyAwOwogICAgICBjW2UgKyBsXSA9IGEgKyAyICogaSArIGYgPj4gMjsKICAgIH0KICB9CiAgY29uc3QgciA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0Lmxlbmd0aCk7CiAgZm9yIChsZXQgcyA9IDA7IHMgPCBvOyBzKyspIHsKICAgIGNvbnN0IGUgPSBzICogbiwgbCA9IE1hdGgubWF4KDAsIHMgLSAxKSAqIG4sIGEgPSBNYXRoLm1pbihvIC0gMSwgcyArIDEpICogbjsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7CiAgICAgIGNvbnN0IGYgPSBjW2wgKyBpXSA/PyAwLCB1ID0gY1tlICsgaV0gPz8gMCwgaCA9IGNbYSArIGldID8/IDA7CiAgICAgIHJbZSArIGldID0gZiArIDIgKiB1ICsgaCA+PiAyOwogICAgfQogIH0KICByZXR1cm4gcjsKfQpmdW5jdGlvbiBIKHQsIG4sIG8pIHsKICBjb25zdCBjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4gKiBvKTsKICBmb3IgKGxldCByID0gMTsgciA8IG8gLSAxOyByKyspIHsKICAgIGNvbnN0IHMgPSAociAtIDEpICogbiwgZSA9IHIgKiBuLCBsID0gKHIgKyAxKSAqIG47CiAgICBmb3IgKGxldCBhID0gMTsgYSA8IG4gLSAxOyBhKyspIHsKICAgICAgY29uc3QgaSA9IHRbcyArIChhIC0gMSldID8/IDAsIGYgPSB0W3MgKyBhXSA/PyAwLCB1ID0gdFtzICsgKGEgKyAxKV0gPz8gMCwgaCA9IHRbZSArIChhIC0gMSldID8/IDAsIHggPSB0W2UgKyAoYSArIDEpXSA/PyAwLCBwID0gdFtsICsgKGEgLSAxKV0gPz8gMCwgRSA9IHRbbCArIGFdID8/IDAsIHkgPSB0W2wgKyAoYSArIDEpXSA/PyAwLCBtID0gLWkgLSAyICogaCAtIHAgKyB1ICsgMiAqIHggKyB5LCBNID0gLWkgLSAyICogZiAtIHUgKyBwICsgMiAqIEUgKyB5OwogICAgICBsZXQgdyA9IE1hdGguc3FydChtICogbSArIE0gKiBNKTsKICAgICAgdyA8IFogJiYgKHcgPSAwKSwgdyA+IDI1NSAmJiAodyA9IDI1NSksIGNbZSArIGFdID0gdzsKICAgIH0KICB9CiAgcmV0dXJuIHsgd2lkdGg6IG4sIGhlaWdodDogbywgZGF0YTogYyB9Owp9CmZ1bmN0aW9uIFcodCkgewogIGlmICh0Lmxlbmd0aCA8PSAyKSByZXR1cm4gWy4uLnRdOwogIGNvbnN0IG4gPSBbdFswXV07CiAgZm9yIChsZXQgbyA9IDE7IG8gPCB0Lmxlbmd0aCAtIDE7IG8rKykgewogICAgY29uc3QgYyA9IHRbbyAtIDFdLCByID0gdFtvXSwgcyA9IHRbbyArIDFdLCBlID0gclswXSAtIGNbMF0sIGwgPSByWzFdIC0gY1sxXSwgYSA9IHNbMF0gLSByWzBdLCBpID0gc1sxXSAtIHJbMV07CiAgICBlICogaSAtIGwgKiBhID09PSAwICYmIE1hdGguc2lnbihlKSA9PT0gTWF0aC5zaWduKGEpICYmIE1hdGguc2lnbihsKSA9PT0gTWF0aC5zaWduKGkpIHx8IG4ucHVzaChyKTsKICB9CiAgcmV0dXJuIG4ucHVzaCh0W3QubGVuZ3RoIC0gMV0pLCBuOwp9CmZ1bmN0aW9uIGoodCwgbiwgbywgYywgciwgcyA9IDgpIHsKICBjb25zdCBlID0gdih0LCBuLCBvKSwgbCA9IEcoZSwgbiwgbyksIGEgPSBIKGwsIG4sIG8pLCBpID0gZChhLCBzKTsKICByZXR1cm4gcShpLCBjLCByKTsKfQpmdW5jdGlvbiBxKHQsIG4sIG8pIHsKICBjb25zdCBjID0gUyhuLCB0KSwgciA9IFMobywgdCksIHMgPSB6KHQsIGMsIHIpOwogIHJldHVybiAhcyB8fCBzLmxlbmd0aCA8IDIgPyB7IHdheXBvaW50czogW10sIGVkZ2VzVXNhYmxlOiAhMCB9IDogeyB3YXlwb2ludHM6IFcocykuc2xpY2UoMSwgLTEpLm1hcCgoaSkgPT4gQihpLCB0KSksIGVkZ2VzVXNhYmxlOiAhMCB9Owp9CmZ1bmN0aW9uIFModCwgbikgewogIGNvbnN0IG8gPSBUKE1hdGguZmxvb3IodC54IC8gMTAwICogbi5jb2xzKSwgMCwgbi5jb2xzIC0gMSksIGMgPSBUKE1hdGguZmxvb3IodC55IC8gMTAwICogbi5yb3dzKSwgMCwgbi5yb3dzIC0gMSk7CiAgcmV0dXJuIFtvLCBjXTsKfQpmdW5jdGlvbiBCKHQsIG4pIHsKICByZXR1cm4gewogICAgeDogKHRbMF0gKyAwLjUpIC8gbi5jb2xzICogMTAwLAogICAgeTogKHRbMV0gKyAwLjUpIC8gbi5yb3dzICogMTAwCiAgfTsKfQpmdW5jdGlvbiBUKHQsIG4sIG8pIHsKICByZXR1cm4gdCA8IG4gPyBuIDogdCA+IG8gPyBvIDogdDsKfQpzZWxmLm9ubWVzc2FnZSA9ICh0KSA9PiB7CiAgY29uc3QgeyByZ2JhOiBuLCB3aWR0aDogbywgaGVpZ2h0OiBjLCBmcm9tUG9zOiByLCB0b1BvczogcywgY2VsbFNpemU6IGUgfSA9IHQuZGF0YSwgbCA9IHBlcmZvcm1hbmNlLm5vdygpOwogIHRyeSB7CiAgICBjb25zdCBhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4pLCBpID0gZSA/PyA4LCB7IHdheXBvaW50czogZiwgZWRnZXNVc2FibGU6IHUgfSA9IGooYSwgbywgYywgciwgcywgaSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgd2F5cG9pbnRzOiBmLAogICAgICBlZGdlc1VzYWJsZTogdSwKICAgICAgZWxhcHNlZE1zOiBwZXJmb3JtYW5jZS5ub3coKSAtIGwKICAgIH0pOwogIH0gY2F0Y2ggKGEpIHsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB3YXlwb2ludHM6IFtdLAogICAgICBlZGdlc1VzYWJsZTogITEsCiAgICAgIGVsYXBzZWRNczogcGVyZm9ybWFuY2Uubm93KCkgLSBsLAogICAgICBlcnJvcjogYSBpbnN0YW5jZW9mIEVycm9yID8gYS5tZXNzYWdlIDogU3RyaW5nKGEpCiAgICB9KTsKICB9Cn07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhmaW5kaW5nLndvcmtlci1CUHhaVndVTS5qcy5tYXAK", $s = (e) => Uint8Array.from(atob(e), (t) => t.charCodeAt(0)), fi = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", $s(Di)], { type: "text/javascript;charset=utf-8" });
function As(e) {
  let t;
  try {
    if (t = fi && (self.URL || self.webkitURL).createObjectURL(fi), !t) throw "";
    const i = new Worker(t, {
      type: "module",
      name: e?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Di,
      {
        type: "module",
        name: e?.name
      }
    );
  }
}
var Cs = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, B = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Is(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Cs(t, i, o), o;
};
let S = class extends Q {
  constructor() {
    super(...arguments), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.inlineRename = null, this.canUndo = !1, this.nodeLabelInputRef = lt(), this.flowIdInputRef = lt(), this.overlayIdInputRef = lt(), this._pendingInspectorLabelFocus = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this._pathWorkerPending = !1, this._pathPendingSelection = null, this.selectorType = "", this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.imageNaturalW = 1600, this.imageNaturalH = 1e3, this._loadedImageUrl = "", this.spaceHeld = !1, this.panPointerId = null, this.stageRef = lt(), this.canvasRef = lt(), this.undoStack = new yo((e) => this.applyConfig(
      e,
      /*commitToHa*/
      !1
    )), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, n = ko(i, t);
      this.pushPatch(i, n, "edit default background");
    }, this.onWeatherStateRemove = (e) => {
      if (!this.config) return;
      const t = this.config, i = Bo(t, e);
      this.pushPatch(t, i, `remove weather state ${e}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const e = new Set(Object.keys(this.config.background.weather_states ?? {})), t = S.KNOWN_WEATHER_STATES.find((o) => !e.has(o)) ?? "custom", i = this.config, n = ti(i, t, "");
      this.pushPatch(i, n, `add weather state ${t}`);
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: e, toNodeId: t, waypoints: i } = this.suggestPreview, n = window.prompt(l("editor.inspector.flowEntityPrompt"), l("editor.inspector.flowEntityDefault")) ?? l("editor.inspector.flowEntityDefault"), o = this.config, s = o.flows.find(
        (c) => c.from_node === e && c.to_node === t
      );
      let r, a;
      if (s)
        a = s.id, r = {
          ...o,
          flows: o.flows.map(
            (c) => c.id === s.id ? { ...c, waypoints: i.map((p) => ({ x: p.x, y: p.y })) } : c
          )
        };
      else {
        const { config: c, flow: p } = Qe(o, e, t, n);
        a = p.id, r = {
          ...c,
          flows: c.flows.map(
            (d) => d.id === p.id ? { ...d, waypoints: i.map((u) => ({ x: u.x, y: u.y })) } : d
          )
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(o, r, `suggest-path ${a}`), this.selectedFlowId = a;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (e) => {
      if (!(!this.config || e.target?.closest(".handle, .waypoint"))) {
        if (this.pending?.kind === "add-node") {
          const i = this.pointerToPercent(e);
          if (!i) return;
          const n = this.config, { config: o, node: s } = xo(n, i, l("editor.inspector.newNodeDefaultLabel"));
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
          }, o = this.config, { config: s, overlay: r } = Do(o, n);
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
        const r = this.config, a = Je(r, i, o, s);
        this.pushPatch(r, a, `add waypoint to ${i}`);
        return;
      }
      this.selectedFlowId = i, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null;
    }, this.onFlowPathDblClick = (e) => {
      if (e.stopPropagation(), e.preventDefault(), !this.config) return;
      const i = e.currentTarget.dataset.flowId;
      i && (this.selectorType = "flows", this.selectedFlowId = i, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null, this._pendingInspectorLabelFocus = !0);
    }, this.onNodeClick = (e) => {
      if (e.stopPropagation(), !this.config) return;
      const i = e.currentTarget.dataset.nodeId;
      if (i && this.pending?.kind === "add-flow") {
        if (this.pending.step === "pick-from") {
          this.pending = { kind: "add-flow", step: "pick-to", fromId: i };
          return;
        }
        if (this.pending.step === "pick-to" && this.pending.fromId !== i) {
          const n = window.prompt(l("editor.inspector.flowEntityPrompt"), l("editor.inspector.flowEntityDefault")) ?? l("editor.inspector.flowEntityDefault"), o = this.config, { config: s, flow: r } = Qe(o, this.pending.fromId, i, n);
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
      i && window.confirm(l("editor.inspector.deleteOverlayConfirm", i)) && this.removeOverlay(i);
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
      i && window.confirm(l("editor.inspector.deleteNodeContextConfirm", i)) && this.removeNode(i);
    }, this.onWaypointContextMenu = (e) => {
      if (e.preventDefault(), e.stopPropagation(), !this.config) return;
      const t = e.currentTarget, i = t.dataset.flowId, n = Number(t.dataset.waypointIndex);
      if (!i || !Number.isFinite(n)) return;
      const o = this.config, s = qe(o, i, n);
      this.pushPatch(o, s, `delete waypoint ${n} of ${i}`);
    }, this.stopClick = (e) => {
      e.stopPropagation();
    }, this.onHandlePointerDown = (e) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const t = e.currentTarget, i = t.dataset.waypointIndex, n = t.dataset.flowId, o = t.dataset.nodeId, s = t.dataset.overlayId;
      let r = null;
      if (o)
        if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(o)) {
          const a = /* @__PURE__ */ new Map();
          for (const c of this.config.nodes)
            this.selectedNodeIds.has(c.id) && a.set(c.id, { ...c.position });
          r = {
            kind: "node-bulk",
            ids: Array.from(this.selectedNodeIds),
            startPositions: a,
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
        const o = this.imageNaturalW > 0 ? this.imageNaturalW : 1, s = this.imageNaturalH > 0 ? this.imageNaturalH : 1, r = (e.clientX - t.startPx.x) / this.scale, a = (e.clientY - t.startPx.y) / this.scale, c = r / o * 100, p = a / s * 100;
        let d = t.startSize.width + c, u = t.startSize.height + p;
        this.dragShiftHeld && (d = Math.round(d), u = Math.round(u)), this.dragMoved = !0, this.config = ei(this.config, t.id, { width: d, height: u });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const o = e.clientX - this.dragStartPx.x, s = e.clientY - this.dragStartPx.y;
        (Math.abs(o) > 4 || Math.abs(s) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const i = this.pointerToPercent(e);
      if (!i) return;
      const n = this.dragShiftHeld ? { x: E(Ft(i.x)), y: E(Ft(i.y)) } : i;
      if (t.kind === "node")
        this.config = te(this.config, t.id, n);
      else if (t.kind === "node-bulk") {
        const o = this.canvasRef.value;
        if (!o) return;
        const s = o.getBoundingClientRect();
        if (s.width === 0 || s.height === 0) return;
        const r = s.width - 16, a = s.height - 8, c = (e.clientX - t.startPx.x) / this.scale / r * 100, p = (e.clientY - t.startPx.y) / this.scale / a * 100, d = /* @__PURE__ */ new Map();
        for (const [u, h] of t.startPositions) {
          const g = this.dragShiftHeld ? Ft(h.x + c) : h.x + c, f = this.dragShiftHeld ? Ft(h.y + p) : h.y + p;
          d.set(u, { x: g, y: f });
        }
        this.config = Ao(this.config, d);
      } else t.kind === "overlay" ? this.config = Oo(this.config, t.id, n) : t.kind === "waypoint" && (this.config = ee(this.config, t.flowId, t.index, n));
    }, this.onHandlePointerUp = (e) => {
      if (this.dragPointerId !== e.pointerId) return;
      const t = e.currentTarget;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
      const i = this.dragStartConfig, n = this.config, o = this.dragTarget, s = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !o) return;
      if (!s && o.kind === "node") {
        const a = o.id;
        if (this.pending?.kind === "add-flow")
          return;
        if (e.shiftKey) {
          const c = new Set(this.selectedNodeIds);
          c.has(a) ? c.delete(a) : c.add(a), this.selectedNodeIds = c, this.selectedNodeId = c.size === 1 ? Array.from(c)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
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
      t !== this._lastLanguage && (this._lastLanguage = t, Ii(t));
    }
  }
  updated(e) {
    super.updated(e);
    const t = this._pendingInspectorLabelFocus;
    t && (this._pendingInspectorLabelFocus = !1), e.has("inlineRename") && this.inlineRename && this.updateComplete.then(() => {
      const i = this.shadowRoot?.querySelector(".inline-rename");
      i?.focus(), i?.select();
    }), t && this.updateComplete.then(() => {
      const i = this.nodeLabelInputRef.value ?? this.flowIdInputRef.value ?? this.overlayIdInputRef.value;
      i?.focus(), i?.select();
    });
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
    const n = t / this.imageNaturalW, o = this.imageNaturalH * n, s = 0, r = -(o - i) / 2, a = this.fitScale;
    this.fitScale = n, this.fitPanX = s, this.fitPanY = r, (this.scale === 1 || this.scale === a) && (this.scale = n, this.panX = s, this.panY = r);
  }
  setConfig(e) {
    try {
      this.config = ft(e), ae(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
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
          <p class="hint">${l("editor.hintNoConfig")}</p>
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
          aria-label=${l("editor.canvas.ariaLabel")}
          ${ct(this.canvasRef)}
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
            ${ct(this.stageRef)}
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
              ${t ? this.renderMultiSelectToolbar() : y`
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
      const o = this.config;
      this.pushPatch(o, this.savedConfig, "cancel all changes");
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
              @change=${(o) => {
      this.selectorType = o.target.value, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null;
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
              .value=${n}
              @change=${(o) => {
      const s = o.target.value;
      s && (i === "nodes" ? (this.selectedNodeId = s, this.selectedNodeIds = /* @__PURE__ */ new Set([s]), this.selectedFlowId = null, this.selectedOverlayId = null) : i === "flows" ? (this.selectedFlowId = s, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null) : i === "overlays" && (this.selectedOverlayId = s, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null), this._pendingInspectorLabelFocus = !0);
    }}
            >
              <option value="">${l(i ? "editor.toolbar.selectElement" : "editor.toolbar.selectElementDash")}</option>
              ${i === "nodes" ? this.config.nodes.map((o) => y`
                <option value=${o.id}>${o.label ?? o.id}</option>
              `) : x}
              ${i === "flows" ? this.config.flows.map((o) => y`
                <option value=${o.id}>${o.id}</option>
              `) : x}
              ${i === "overlays" ? (this.config.overlays ?? []).map((o, s) => y`
                <option value=${o.id ?? String(s)}>${l("editor.canvas.overlayOption", s, o.id ? l("editor.canvas.overlayOptionIdPart", o.id) : "")}</option>
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
    const o = [i.position, ...e.waypoints, n.position], s = e.id === this.selectedFlowId, a = le(o, { width: 100, height: 100 }, e.line_style ?? "corner");
    if (!a) return x;
    const c = e.color ?? "rgba(255,255,255,0.8)", p = [];
    for (let d = 0; d < o.length - 1; d++) {
      const u = o[d], h = o[d + 1];
      !u || !h || p.push(De`
        <line
          class="segment-hit"
          x1=${u.x}
          y1=${u.y}
          x2=${h.x}
          y2=${h.y}
          data-flow-id=${e.id}
          data-segment-index=${d}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
        />
      `);
    }
    return De`
      <g>
        ${p}
        <path
          class=${`flow-path ${s ? "selected" : ""}`}
          d=${a}
          data-flow-id=${e.id}
          style=${`stroke: ${c};`}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
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
          aria-label=${l("aria.waypointHandle", i, e.id)}
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
    const t = e.id === this.selectedOverlayId, i = e.size?.width ?? 14, n = e.size?.height ?? 8, o = this.inlineRename?.kind === "overlay" && this.inlineRename.id === e.id;
    return y`
      <div
        class=${`overlay-handle overlay-wrapper ${t ? "selected" : ""} overlay-${e.type}`}
        role="button"
        tabindex="0"
        aria-label=${l("aria.overlayHandle", e.id)}
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
        <div class="overlay-label-chip" @dblclick=${(s) => this.onOverlayChipDblClick(s, e)}>
          ${o ? y`<input
                class="inline-rename overlay-inline-rename"
                type="text"
                spellcheck="false"
                .value=${this.inlineRename.draft}
                @input=${(s) => {
      const r = this.inlineRename;
      !r || r.kind !== "overlay" || r.id !== e.id || (this.inlineRename = { ...r, draft: s.target.value });
    }}
                @keydown=${(s) => {
      s.key === "Escape" ? (s.preventDefault(), this.inlineRename = null) : s.key === "Enter" && (s.preventDefault(), this.commitOverlayInlineRename(!0));
    }}
                @blur=${() => {
      this.inlineRename?.kind === "overlay" && this.inlineRename.id === e.id && this.commitOverlayInlineRename(!0);
    }}
              />` : y`<span>${e.id}<span class="overlay-type-badge">${e.type}</span></span>`}
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
    const t = this.selectedNodeIds.has(e.id), i = t && this.selectedNodeIds.size === 1, n = t && this.selectedNodeIds.size > 1, o = t ? Array.from(this.selectedNodeIds).indexOf(e.id) : -1, s = e.visible === !1, r = this.inlineRename?.kind === "node" && this.inlineRename.id === e.id;
    return y`
      <div
        class=${`handle ${i ? "selected" : ""} ${n ? "multi-selected" : ""} ${t ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
        role="button"
        tabindex="0"
        aria-label=${l("aria.nodeHandle", e.label ?? e.id, e.position.x, e.position.y)}
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
        <span
          class="handle-dot"
          @dblclick=${(a) => this.onNodeDotDblClick(a, e)}
        ></span>
        ${r ? y`<input
              class="inline-rename"
              type="text"
              spellcheck="false"
              .value=${this.inlineRename.draft}
              @input=${(a) => {
      const c = this.inlineRename;
      !c || c.kind !== "node" || c.id !== e.id || (this.inlineRename = { ...c, draft: a.target.value });
    }}
              @keydown=${(a) => {
      a.key === "Escape" ? (a.preventDefault(), this.inlineRename = null) : a.key === "Enter" && (a.preventDefault(), this.commitNodeInlineRename(!0));
    }}
              @blur=${() => {
      this.inlineRename?.kind === "node" && this.inlineRename.id === e.id && this.commitNodeInlineRename(!0);
    }}
            />` : e.label ? y`<span class="handle-label" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, e)}
                >${e.label}</span
              >` : y`<span class="handle-id" @dblclick=${(a) => this.onNodeLabelTextDblClick(a, e)}
                >${e.id}</span
              >`}
        ${t && this.selectedNodeIds.size >= 2 ? y`<span class="suggest-badge">${o + 1}</span>` : x}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${l(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${l(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(a) => {
      if (a.stopPropagation(), !this.config) return;
      const c = this.config, p = oi(c, e.id, s);
      this.pushPatch(c, p, `${s ? "show" : "hide"} node ${e.id}`);
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
    const n = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), o = i?.includeDomains ?? [], s = i?.placeholder ?? l("editor.inspector.entityPickerFallbackPlaceholder");
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
    const r = this.hass?.states ?? {}, a = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, c = Object.keys(r).filter((d) => {
      if (o.length === 0) return !0;
      const u = d.split(".")[0];
      return !!u && o.includes(u);
    }).sort();
    return y`
      <input
        type="text"
        list=${a}
        placeholder=${s}
        .value=${e}
        @change=${(d) => {
      t(d.target.value.trim());
    }}
      />
      <datalist id=${a}>
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
          <h3>${l("editor.inspector.nodeHeading", e.id)}</h3>

          <!-- Row 1: Label | Entity -->
          <div class="node-row">
            <label class="node-cell">
              <span class="node-cell-label">${l("editor.inspector.label")}</span>
              <input
                type="text"
                ${ct(this.nodeLabelInputRef)}
                .value=${e.label ?? ""}
                @change=${(i) => this.onNodeLabelChange(e.id, i)}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${l("editor.inspector.entity")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.colour")}</span>
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
        const n = i.target.checked, o = this.config, s = oi(o, e.id, n);
        this.pushPatch(o, s, `set visible of ${e.id}`);
      }}
              />
              <span class="node-cell-label">${l("editor.inspector.visible")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.showValue")}</span>
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
                .value=${String(Math.round(e.position.x))}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = te(o, e.id, { x: n, y: e.position.y });
        this.pushPatch(o, s, `move ${e.id} x`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${l("editor.inspector.positionY")}</span>
              <input
                type="number"
                min="0" max="100" step="1"
                .value=${String(Math.round(e.position.y))}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = te(o, e.id, { x: e.position.x, y: n });
        this.pushPatch(o, s, `move ${e.id} y`);
      }}
              />
            </label>
            <label class="node-cell">
              <span class="node-cell-label">${l("editor.inspector.sizePx")}</span>
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
              <span class="node-cell-label">${l("editor.inspector.opacity")}</span>
              <input
                type="number"
                min="0" max="1" step="0.05"
                .value=${String(e.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = Ho(o, e.id, n >= 1 ? void 0 : n);
        this.pushPatch(o, s, `set opacity of ${e.id}`);
      }}
              />
            </label>
          </div>

          <!-- Delete -->
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(e.id)}>${l("editor.inspector.deleteNode")}</button>
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
          <label class="inspector-id-row">
            <span class="node-cell-label">${l("editor.inspector.flowIdField")}</span>
            <input
              type="text"
              spellcheck="false"
              ${ct(this.flowIdInputRef)}
              .value=${e.id}
              @change=${(i) => this.onInspectorFlowIdChange(e.id, i)}
            />
          </label>
          <h3>${l("editor.inspector.flowHeading", e.id)}</h3>
          <fieldset class="inspector-fieldset">
            <legend class="inspector-legend">${l("editor.inspector.routeAndSensor")}</legend>
            <div class="row">
              <span>${e.from_node} → ${e.to_node}</span>
            </div>
            <label>
              ${l("editor.inspector.entity")}
              ${this.renderEntityPicker(
        e.entity,
        (i) => this.setFlowEntity(e.id, i),
        { includeDomains: ["sensor", "input_number", "number"] }
      )}
            </label>
          </fieldset>
          ${this.renderWaypointList(e)}
          <label>
            ${l("editor.inspector.lineStyle")}
            <select
              .value=${e.line_style ?? "corner"}
              @change=${(i) => {
        if (!this.config) return;
        const n = i.target.value, o = this.config, s = Uo(o, e.id, n);
        this.pushPatch(o, s, `set line style of ${e.id}`);
      }}
            >
              ${ie.map(
        (i) => y`<option value=${i} ?selected=${(e.line_style ?? "corner") === i}>${i}</option>`
      )}
            </select>
          </label>
          <label>
            ${l("editor.inspector.colourOverride")}
            <div class="color-row">
              ${(() => {
        const i = T(e.domain ?? this.config.domain), n = Ct(
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
          const s = o.target.value, r = this.config, a = ni(r, e.id, s);
          this.pushPatch(r, a, `set colour of ${e.id}`);
        }}
                  />
                  <span class="color-effective">${e.color ? l("editor.inspector.colourOverrideActive") : l("editor.inspector.colourDomainDefault")}</span>
                  ${e.color ? y`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const o = this.config, s = ni(o, e.id, void 0);
          this.pushPatch(o, s, `clear colour of ${e.id}`);
        }}>${l("editor.inspector.clearColour")}</button>` : x}
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
                .value=${String(e.opacity ?? 1)}
                @change=${(i) => {
        if (!this.config) return;
        const n = parseFloat(i.target.value);
        if (!Number.isFinite(n)) return;
        const o = this.config, s = To(o, e.id, n);
        this.pushPatch(o, s, `set opacity of ${e.id}`);
      }}
              />
              <span>${(e.opacity ?? 1).toFixed(2)}</span>
            </div>
          </label>
          <label>
            ${l("editor.inspector.flowVisible")}
            <div class="row">
              <input
                type="checkbox"
                .checked=${e.visible !== !1}
                @change=${(i) => {
        if (!this.config) return;
        const n = i.target.checked, o = this.config, s = Ko(o, e.id, n);
        this.pushPatch(o, s, `${n ? "show" : "hide"} flow ${e.id}`);
      }}
              />
              <span>${e.visible !== !1 ? l("editor.inspector.shown") : l("editor.inspector.hidden")}</span>
            </div>
          </label>
          ${this.renderSpeedCurveSection(e)}
          ${this.renderAnimationSection(e)}
          ${this.renderValueGradientSection(e)}
          <button class="danger" @click=${() => this.removeFlow(e.id)}>${l("editor.inspector.deleteFlow")}</button>
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
    const t = T(e.domain ?? this.config.domain), i = Ht(e, t), n = e.speed_curve_override ?? {}, o = (a, c, p) => y`
      <div class="speed-curve-row">
        <label class="speed-curve-label">${c}${p ? y` <small>(${p})</small>` : x}</label>
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
        for (const v of Object.keys(n))
          v !== a && (h[v] = n[v]);
        const g = this.config, f = ai(g, e.id, h);
        this.pushPatch(g, f, `update speed curve ${a} for ${e.id}`);
      } else {
        const h = parseFloat(u);
        if (!Number.isFinite(h)) return;
        const g = this.config, f = ai(g, e.id, { ...n, [a]: h });
        this.pushPatch(g, f, `update speed curve ${a} for ${e.id}`);
      }
    }}
        />
      </div>
    `, r = [i.threshold, i.p50, i.peak].map((a) => `${(G(a, i) / 1e3).toFixed(1)}s`);
    return y`
      <details class="speed-curve-details">
        <summary>${l("editor.inspector.speedCurveOverrideSummary")}</summary>
        <div class="speed-curve-body">
          <p class="hint-sub">
            ${l("editor.inspector.speedCurveHint", t.unit_label, e.domain ?? this.config.domain)}
          </p>
          ${o("threshold", l("editor.inspector.threshold"), t.unit_label)}
          ${o("p50", l("editor.inspector.medianP50"), t.unit_label)}
          ${o("peak", l("editor.inspector.peak"), t.unit_label)}
          ${o("max_duration", l("editor.inspector.maxDuration"), l("editor.inspector.ms"))}
          ${o("min_duration", l("editor.inspector.minDuration"), l("editor.inspector.ms"))}
          ${o("steepness", l("editor.inspector.steepness"), l("editor.inspector.k"))}
          <div class="speed-curve-preview">
            <span>${l("editor.inspector.previewAtPoints")}</span>
            <strong>${r[0]}</strong>
            /
            <strong>${r[1]}</strong>
            /
            <strong>${r[2]}</strong>
          </div>
          ${Object.keys(n).length > 0 ? y`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const a = this.config, c = Zo(a, e.id);
      this.pushPatch(a, c, `reset speed curve for ${e.id}`);
    }}>${l("editor.inspector.resetToDomainDefaults")}</button>` : x}
        </div>
      </details>
    `;
  }
  renderAnimationSection(e) {
    if (!this.config) return y``;
    const t = e.animation ?? {}, i = t.animation_style ?? "dots", n = (d) => {
      if (!this.config) return;
      const u = this.config, h = Xo(u, e.id, d);
      this.pushPatch(u, h, `update animation for ${e.id}`);
    }, s = !(/* @__PURE__ */ new Set(["dash", "pulse", "fluid", "none"])).has(i), r = i === "pulse", a = i === "trail", c = i === "dash", p = e.color ?? "#4ADE80";
    return y`
      <details class="anim-details" open>
        <summary>${l("editor.inspector.animation")}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(i, t, p)}
            </svg>
          </div>

          <label>${l("editor.inspector.style")}
            <select
              .value=${i}
              @change=${(d) => {
      n({ animation_style: d.target.value });
    }}
            >
              ${ne.map(
      (d) => y`<option value=${d} ?selected=${i === d}>${d}</option>`
    )}
            </select>
          </label>

          ${s ? y`
            <label>${l("editor.inspector.particleShape")}
              <select
                .value=${t.particle_shape ?? "circle"}
                @change=${(d) => {
      n({ particle_shape: d.target.value });
    }}
              >
                ${oe.map(
      (d) => y`<option value=${d} ?selected=${(t.particle_shape ?? "circle") === d}>${d}</option>`
    )}
              </select>
            </label>
            ${(t.particle_shape ?? "circle") === "custom_svg" ? y`
              <label>${l("editor.inspector.svgPathLabel")}
                <input type="text"
                  placeholder=${l("editor.inspector.svgPathPlaceholder")}
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

          <label>${l("editor.inspector.direction")}
            <select
              .value=${t.direction ?? "auto"}
              @change=${(d) => {
      n({ direction: d.target.value });
    }}
            >
              ${se.map(
      (d) => y`<option value=${d} ?selected=${(t.direction ?? "auto") === d}>${d}</option>`
    )}
            </select>
          </label>

          <label>${l("editor.inspector.particleSize")}
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

          <label>${l("editor.inspector.particleCount")}
            <input type="number" min="1" max="20" step="1"
              placeholder=${l("editor.inspector.profileDefaultPlaceholder")}
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

          <label>${l("editor.inspector.particleSpacing")}
            <select
              .value=${t.particle_spacing ?? "even"}
              @change=${(d) => {
      n({ particle_spacing: d.target.value });
    }}
            >
              ${re.map(
      (d) => y`<option value=${d} ?selected=${(t.particle_spacing ?? "even") === d}>${d}</option>`
    )}
            </select>
          </label>

          ${t.particle_spacing === "clustered" ? y`
            <label>${l("editor.inspector.clusterSize")}
              <input type="number" min="1" max="10" step="1"
                .value=${String(t.cluster_size ?? 3)}
                @change=${(d) => {
      const u = parseInt(d.target.value, 10);
      Number.isFinite(u) && u >= 1 && n({ cluster_size: u });
    }}
              />
            </label>
            <label>${l("editor.inspector.clusterGap")}
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
            <label>${l("editor.inspector.pulseFrequencyHz")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.pulse_frequency ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ pulse_frequency: u });
    }}
              />
            </label>
            <label>${l("editor.inspector.pulseRatio")}
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
            <label>${l("editor.inspector.waveFrequency")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.wave_frequency ?? 1)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && u > 0 && n({ wave_frequency: u });
    }}
              />
            </label>
            <label>${t.particle_spacing === "wave_lateral" ? l("editor.inspector.waveAmplitudePx") : l("editor.inspector.waveAmplitude01")}
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

          <label>${l("editor.inspector.glowIntensity")}
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
            ${l("editor.inspector.shimmerThreshold")}
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${t.flicker === !0}
              @change=${(d) => n({ flicker: d.target.checked })}
            />
            ${l("editor.inspector.flicker")}
          </label>

          ${r ? y`
            <label>${l("editor.inspector.pulseWidthPx")}
              <input type="number" min="1" max="20" step="0.5"
                .value=${String(t.pulse_width ?? 2)}
                @change=${(d) => {
      const u = parseFloat(d.target.value);
      Number.isFinite(u) && n({ pulse_width: u });
    }}
              />
            </label>
          ` : x}

          ${a ? y`
            <label>${l("editor.inspector.trailLength")}
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
            <label>${l("editor.inspector.dashGapRatio")}
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
      const d = this.config, u = Jo(d, e.id);
      this.pushPatch(d, u, `reset animation for ${e.id}`);
    }}>${l("editor.inspector.resetToDefaults")}</button>` : x}
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
      const r = t.dash_gap ?? 0.5, a = 14, c = a * r;
      return y`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${i} stroke-width="3"
          stroke-dasharray="${a} ${c}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${a + c}"
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
        (a, c) => y`
            <circle cx=${a} cy="20" r="0" fill="none"
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
      const r = Array.from({ length: o }, (a, c) => (c + 0.5) / o * 180 + 10);
      return y`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
        ${r.map(
        (a, c) => y`
            <circle cx=${a} cy="20" r=${n} fill=${i} opacity="0">
              <animate attributeName="cx" values="${a};190;10;${a}" dur="1.4s"
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
    const s = Array.from({ length: o }, (r, a) => (a + 0.5) / o * 180 + 10);
    return y`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${i} stroke-width="1.5" stroke-opacity="0.25"/>
      ${s.map(
      (r, a) => y`
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
  renderWaypointList(e) {
    if (!this.config) return y``;
    const t = new Map(this.config.nodes.map((s) => [s.id, s])), i = t.get(e.from_node), n = t.get(e.to_node), o = () => {
      if (!this.config) return;
      const s = [
        ...i ? [i.position] : [],
        ...e.waypoints,
        ...n ? [n.position] : []
      ];
      let r = 0, a = 0;
      for (let f = 0; f < s.length - 1; f++) {
        const v = s[f], m = s[f + 1], b = Math.hypot(m.x - v.x, m.y - v.y);
        b > a && (a = b, r = f);
      }
      const c = s[r], p = s[r + 1], d = { x: (c.x + p.x) / 2, y: (c.y + p.y) / 2 }, u = r > 0 ? r - 1 + 1 : 0, h = this.config, g = Je(h, e.id, u, d);
      this.pushPatch(h, g, `add waypoint to ${e.id}`);
    };
    return y`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${l("editor.inspector.waypoints")}
          <span class="waypoint-count">${e.waypoints.length}</span>
        </h4>

        ${e.waypoints.length === 0 ? y`<div class="waypoint-empty">${l("editor.inspector.waypointEmpty")}</div>` : y`
            <ul class="waypoint-list">
              ${e.waypoints.map((s, r) => y`
                <li class="waypoint-row">
                  <span class="waypoint-index">${l("editor.inspector.waypointSectionHash")}${r + 1}</span>
                  <label class="waypoint-coord">
                    ${l("editor.inspector.waypointCoordX")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.x.toFixed(1)}
                      @change=${(a) => {
      if (!this.config) return;
      const c = parseFloat(a.target.value);
      if (!Number.isFinite(c)) return;
      const p = this.config, d = ee(p, e.id, r, { x: c, y: s.y });
      this.pushPatch(p, d, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    ${l("editor.inspector.waypointCoordY")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.y.toFixed(1)}
                      @change=${(a) => {
      if (!this.config) return;
      const c = parseFloat(a.target.value);
      if (!Number.isFinite(c)) return;
      const p = this.config, d = ee(p, e.id, r, { x: s.x, y: c });
      this.pushPatch(p, d, `move waypoint ${r} of ${e.id}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${l("editor.inspector.deleteWaypointAria", r)} title=${l("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const a = this.config, c = qe(a, e.id, r);
      this.pushPatch(a, c, `delete waypoint ${r} of ${e.id}`);
    }}
                  >×</button>
                </li>
              `)}
            </ul>
          `}

        <button type="button" class="ghost full-width" aria-label=${l("editor.inspector.addWaypointOnFlowAria")} @click=${o}>
          ${l("editor.inspector.addWaypoint")}
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
      const r = this.config, a = Qo(r, e.id, s);
      this.pushPatch(r, a, `update gradient for ${e.id}`);
    };
    let o = x;
    if (t && t.low_color && t.high_color)
      try {
        const s = Pi(
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
        <h4 class="gradient-section-header">${l("editor.inspector.valueGradient")}</h4>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!t}
            @change=${(s) => {
      if (!this.config) return;
      const r = s.target.checked, a = this.config, c = r ? qo(a, e.id, i) : ci(a, e.id);
      this.pushPatch(a, c, `${r ? "enable" : "disable"} gradient for ${e.id}`);
    }}
          />
          ${l("editor.inspector.enableGradient")}
        </label>

        ${t ? y`
          <label>${l("editor.inspector.gradientEntity")}
            <input type="text" placeholder=${l("editor.inspector.gradientEntityPlaceholder")}
              .value=${t.entity}
              @change=${(s) => n({ entity: s.target.value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>${l("editor.inspector.lowValue")}
              <input type="number" step="any"
                .value=${String(t.low_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && n({ low_value: r });
    }}
              />
            </label>
            <label>${l("editor.inspector.lowColour")}
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
            <label>${l("editor.inspector.highValue")}
              <input type="number" step="any"
                .value=${String(t.high_value)}
                @change=${(s) => {
      const r = parseFloat(s.target.value);
      Number.isFinite(r) && n({ high_value: r });
    }}
              />
            </label>
            <label>${l("editor.inspector.highColour")}
              <div class="color-row">
                <input type="color"
                  .value=${t.high_color}
                  @input=${(s) => n({ high_color: s.target.value })}
                />
                <span>${t.high_color}</span>
              </div>
            </label>
          </div>

          <label>${l("editor.inspector.applyGradientTo")}
            <select
              .value=${t.mode ?? "both"}
              @change=${(s) => {
      n({ mode: s.target.value });
    }}
            >
              <option value="flow" ?selected=${t.mode === "flow"}>${l("editor.inspector.gradientModeFlow")}</option>
              <option value="line" ?selected=${t.mode === "line"}>${l("editor.inspector.gradientModeLine")}</option>
              <option value="both" ?selected=${(t.mode ?? "both") === "both"}>${l("editor.inspector.gradientModeBoth")}</option>
            </select>
          </label>

          ${o}

          <button class="ghost" @click=${() => {
      if (!this.config) return;
      const s = this.config, r = ci(s, e.id);
      this.pushPatch(s, r, `disable gradient for ${e.id}`);
    }}>${l("editor.inspector.removeGradient")}</button>
        ` : x}
      </div>
    `;
  }
  renderGlobalAnimationPanel() {
    if (!this.config) return x;
    const e = this.config.animation ?? {};
    return y`
      <details class="panel anim-global-panel" open>
        <summary>${l("editor.inspector.animationGlobalSummary")}</summary>
        <div class="panel-body">
          <label>
            ${l("editor.inspector.fpsCap")}
            <div class="inspector-slider-row">
              <input type="range" min="10" max="60" step="5"
                .value=${String(e.fps ?? 60)}
                @change=${(t) => {
      if (!this.config) return;
      const i = parseInt(t.target.value, 10), n = this.config, o = li(n, { fps: i });
      this.pushPatch(n, o, "set animation fps");
    }}
              />
              <span>${e.fps ?? 60} ${l("editor.inspector.fpsSuffix")}</span>
            </div>
          </label>
          <label class="visibility-row">
            <input type="checkbox"
              .checked=${e.smooth_speed !== !1}
              @change=${(t) => {
      if (!this.config) return;
      const i = t.target.checked, n = this.config, o = li(n, { smooth_speed: i });
      this.pushPatch(n, o, "set smooth_speed");
    }}
            />
            <span class="visibility-label">${l("editor.stateA.smoothSpeed")}</span>
            <span class="visibility-val">${e.smooth_speed !== !1 ? l("editor.inspector.on") : l("editor.inspector.off")}</span>
          </label>
          <p class="hint-sub">${l("editor.inspector.smoothSpeedHint")}</p>
        </div>
      </details>
    `;
  }
  renderOverlayInspector(e) {
    const t = e.size ?? { width: 20, height: 15 }, i = e.visible !== !1, n = e.opacity ?? 1;
    return y`
      <div class="inspector overlay-inspector">
        <label class="inspector-id-row">
          <span class="node-cell-label">${l("editor.inspector.overlayIdField")}</span>
          <input
            type="text"
            spellcheck="false"
            ${ct(this.overlayIdInputRef)}
            .value=${e.id}
            @change=${(o) => this.onInspectorOverlayIdChange(e.id, o)}
          />
        </label>
        <h3>${l("editor.inspector.overlayHeading", e.id)}</h3>
        <div class="row size-row">
          <label>
            ${l("editor.inspector.width")}
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
            ${l("editor.inspector.height")}
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
          ${l("editor.inspector.visible")}
          <input
            type="checkbox"
            .checked=${i}
            @change=${(o) => {
      if (!this.config) return;
      const s = o.target.checked, r = this.config, a = zo(r, e.id, s);
      this.pushPatch(r, a, `toggle overlay ${e.id} visible`);
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
            .value=${String(n)}
            @change=${(o) => {
      if (!this.config) return;
      const s = parseFloat(o.target.value);
      if (!Number.isFinite(s)) return;
      const r = this.config, a = Lo(r, e.id, s);
      this.pushPatch(r, a, `edit overlay ${e.id} opacity`);
    }}
          />
          <span>${Math.round(n * 100)}%</span>
        </label>
        ${this.renderCardConfigEditor(e)}
        <button class="danger" @click=${() => this.removeOverlay(e.id)}>${l("editor.inspector.deleteOverlay")}</button>
      </div>
    `;
  }
  renderCardConfigEditor(e) {
    const t = this.customConfigDraft || JSON.stringify(e.card ?? { type: "entity", entity: "sensor.example_sensor" }, null, 2);
    return y`
      <label>
        ${l("editor.inspector.cardConfig")}
        <textarea
          rows="8"
          spellcheck="false"
          placeholder=${l("editor.inspector.cardConfigPlaceholder")}
          .value=${t}
          @input=${(i) => {
      this.customConfigDraft = i.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? y`<div class="custom-config-error">${this.customConfigError}</div>` : x}
      <p class="hint-sub">
        ${l("editor.inspector.cardConfigHintExamples")}
      </p>
      <p class="hint-sub">
        ${l("editor.inspector.cardConfigHintUrls")}
      </p>
      <div class="row">
        <button @click=${() => this.applyCustomConfig(e.id)}>${l("editor.inspector.applyCardConfig")}</button>
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
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const c = this.config, p = ii(c, i, a);
        this.config = p, this.commitToHa(p);
      }}
            @change=${(r) => {
        if (!this.config) return;
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const c = this.config, p = ii(c, i, a);
        this.pushPatch(c, p, `set opacity.${i}`);
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
          ${t("background", l("editor.inspector.opacityBackground"))}
          ${t("darken", l("editor.inspector.opacityDarken"), 0)}
          ${t("nodes", l("editor.inspector.opacityNodes"))}
          ${t("flows", l("editor.inspector.opacityFlows"))}
          ${t("dots", l("editor.inspector.opacityDots"))}
          ${t("glow", l("editor.inspector.opacityGlow"))}
          ${t("labels", l("editor.inspector.opacityLabels"))}
          ${t("values", l("editor.inspector.opacityValues"))}
          ${t("overlays", l("editor.inspector.opacityOverlays"))}
        </div>
      </details>
    `;
  }
  renderDomainColorsPanel() {
    if (!this.config) return x;
    const e = this.config.domain_colors ?? {}, t = this.config.domain ?? "energy", i = zt[t] ?? zt.generic, n = (o, s) => {
      const r = `editor.domainRoles.${t}.${o}`, a = l(r);
      return a !== r ? a : s;
    };
    return y`
      <details class="panel domain-colors-panel">
        <summary>${l("editor.inspector.domainColoursSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${l("editor.inspector.domainColoursHint")}
          </p>
          ${i.roles.map((o) => {
      const s = e[o.key], r = o.default, a = n(o.key, o.label);
      return y`
              <div class="color-picker-row">
                <span class="color-picker-label">${a}</span>
                <input
                  type="color"
                  .value=${s ?? r}
                  @change=${(c) => {
        if (!this.config) return;
        const p = c.target.value, d = this.config, u = si(d, o.key, p);
        this.pushPatch(d, u, `set domain_colors.${o.key}`);
      }}
                />
                <span class="color-picker-value">${s || l("editor.inspector.colourDefaultSuffix", r)}</span>
                ${s ? y`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const c = this.config, p = si(c, o.key, void 0);
        this.pushPatch(c, p, `reset domain_colors.${o.key}`);
      }}>${l("editor.inspector.reset")}</button>` : x}
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
        const r = s.target.checked, a = this.config, c = jo(a, i, r);
        this.pushPatch(a, c, `set visibility.${i}`);
      }}
          />
          <span class="visibility-val">${l(o ? "editor.inspector.visibilityVisible" : "editor.inspector.visibilityHidden")}</span>
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
          ${t("nodes", l("editor.inspector.opacityNodes"))}
          ${t("lines", l("editor.inspector.visibilityFlowLines"))}
          ${t("dots", l("editor.inspector.visibilityAnimatedDots"))}
          ${t("labels", l("editor.inspector.opacityLabels"))}
          ${t("values", l("editor.inspector.opacityValues"))}
          ${t("overlays", l("editor.toolbar.overlays"))}
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
        const a = parseFloat(r.target.value);
        if (!Number.isFinite(a)) return;
        const c = Math.max(o.min, Math.min(o.max, a)), p = this.config, d = Go(p, i, c);
        this.pushPatch(p, d, `set defaults.${i}`);
      }}
          />
          <span class="defaults-unit">${s}</span>
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
          ${t("node_radius", l("editor.stateA.nodeRadius"), { min: 4, max: 40, step: 1, defaultVal: 12 })}
          ${t("dot_radius", l("editor.stateA.dotRadius"), { min: 2, max: 20, step: 1, defaultVal: 5 })}
          ${t("line_width", l("editor.stateA.lineWidth"), { min: 1, max: 10, step: 1, defaultVal: 2 })}
          ${t("burst_trigger_ratio", l("editor.inspector.burstTriggerRatio"), { min: 0.1, max: 1, step: 0.05, defaultVal: 0.9 })}
          ${t("burst_sustain_ms", l("editor.inspector.burstSustainMs"), { min: 1e3, max: 3e4, step: 500, defaultVal: 5e3 })}
          ${t("burst_max_particles", l("editor.inspector.burstMaxParticles"), { min: 3, max: 50, step: 1, defaultVal: 20 })}
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
    return this.config ? y`
      <details class="panel domain-settings-panel" open>
        <summary>${l("editor.stateA.domainSummary")}</summary>
        <div class="panel-body">
          <label class="field-row domain-field">
            <span class="field-label">${l("editor.stateA.domain")}</span>
            <select
              id="flowme-domain-select"
              .value=${this.config.domain}
              @change=${(e) => {
      if (!this.config) return;
      const t = e.target.value, i = this.config, n = Vo(i, t);
      this.pushPatch(i, n, `set domain ${t}`);
    }}
            >
              ${At.map((e) => y`<option value=${e}>${this.domainOptionLabel(e)}</option>`)}
            </select>
          </label>
        </div>
      </details>
    ` : x;
  }
  domainOptionLabel(e) {
    return l(`editor.stateA.domainOption.${e}`);
  }
  // ──────────────────────────────────────────────────────────────────────────
  renderMultiSelectToolbar() {
    const e = this.selectedNodeIds.size;
    if (e < 2) return x;
    const t = this.selectedNodeIds, i = Array.from(t)[0];
    return y`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${l("editor.inspector.multiselectCount", e)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? "suggest-path-busy" : ""}"
          aria-label=${l("editor.inspector.suggestPathBetweenAria")}
          title=${l(e === 2 ? "editor.inspector.suggestPathBetweenTitle" : "editor.inspector.suggestPathPickTwoTitle")}
          ?disabled=${e !== 2 || this.suggestBusy}
          @click=${() => void this.runSuggestPath()}
        >${this.suggestBusy ? y`${l("editor.toolbar.suggestPathFinding")}<span class="suggest-path-spinner" aria-hidden="true"></span>` : l("editor.toolbar.suggestPath")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.hideSelectedNodesAria")} @click=${() => this.bulkHide(t)}>${l("editor.toolbar.hideSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.showSelectedNodesAria")} @click=${() => this.bulkShow(t)}>${l("editor.toolbar.showSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.alignSelectedHorizontalAria")} @click=${() => this.bulkAlignH(t, i)}>${l("editor.toolbar.alignHorizontalShort")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.alignSelectedVerticalAria")} @click=${() => this.bulkAlignV(t, i)}>${l("editor.toolbar.alignVerticalShort")}</button>
        <button type="button" class="ms-btn danger" aria-label=${l("editor.toolbar.deleteSelectedNodesAria")} @click=${() => this.bulkDelete(t)}>${l("editor.toolbar.deleteSelected")}</button>
        <button type="button" class="ms-btn ghost" aria-label=${l("editor.toolbar.clearMultiSelectionAria")} @click=${() => {
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
    }}>${l("editor.toolbar.deselect")}</button>
      </div>
    `;
  }
  bulkHide(e) {
    if (!this.config) return;
    const t = this.config, i = Ze(t, e, !1);
    this.pushPatch(t, i, `hide ${e.size} nodes`);
  }
  bulkShow(e) {
    if (!this.config) return;
    const t = this.config, i = Ze(t, e, !0);
    this.pushPatch(t, i, `show ${e.size} nodes`);
  }
  bulkAlignH(e, t) {
    if (!this.config) return;
    const i = this.config, n = Io(i, e, t);
    this.pushPatch(i, n, `align ${e.size} nodes horizontally`);
  }
  bulkAlignV(e, t) {
    if (!this.config) return;
    const i = this.config, n = _o(i, e, t);
    this.pushPatch(i, n, `align ${e.size} nodes vertically`);
  }
  bulkDelete(e) {
    if (!this.config || !window.confirm(l("editor.inspector.deleteNodesConfirm", e.size))) return;
    const t = this.config, i = Co(t, e);
    this.pushPatch(t, i, `delete ${e.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderWeatherPanel() {
    if (!this.config) return x;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {}), i = e.weather_entity && this.hass ? this.hass.states[e.weather_entity]?.state : void 0;
    return y`
      <details class="weather-panel" ?open=${t.length > 0 || !!e.weather_entity}>
        <summary>${l("editor.inspector.weatherPanelSummary")}</summary>
        <div class="weather-body">
          <label>
            ${l("editor.inspector.defaultImageUrl")}
            <input
              type="text"
              .value=${e.default}
              @change=${this.onDefaultBgChange}
              placeholder=${l("editor.inspector.defaultBgPlaceholder")}
            />
            ${e.default ? y`<img class="weather-thumb" src=${e.default} alt=${l("editor.inspector.defaultBgAlt")} />` : x}
          </label>
          <label>
            ${l("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(
      e.weather_entity ?? "",
      (n) => this.setWeatherEntityValue(n),
      { includeDomains: ["weather"], placeholder: l("editor.inspector.weatherPlaceholder") }
    )}
          </label>
          ${i !== void 0 ? y`<div class="weather-live-state">
                ${l("editor.inspector.currentState")} <strong>${i}</strong>
                ${e.weather_states?.[i] ? y` → <span class="weather-match-ok">${l("editor.inspector.weatherMatched")}</span>` : y` → <span class="weather-match-miss">${l("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : x}
          <label>
            ${l("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(
      e.sun_entity ?? "",
      (n) => {
        if (!this.config) return;
        const o = this.config, s = Mo(o, n || void 0);
        this.pushPatch(o, s, "set sun entity");
      },
      { includeDomains: ["sun"], placeholder: l("editor.inspector.sunPlaceholder") }
    )}
          </label>
          ${e.sun_entity && this.hass?.states[e.sun_entity] ? y`<div class="weather-live-state">
                ${l("editor.inspector.sunStateLabel")} <strong>${this.hass.states[e.sun_entity]?.state === "above_horizon" ? l("editor.inspector.sunAbove") : l("editor.inspector.sunBelow")}</strong>
              </div>` : x}
          <label>
            ${l("editor.inspector.fadeTransitionSeconds")}
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
      const s = this.config, r = Fo(s, o * 1e3);
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
                    placeholder=${l("editor.inspector.weatherRowPlaceholder")}
                  />
                  <div class="weather-row-end">
                    ${o ? y`<img class="weather-thumb" src=${o} alt=${n} />` : x}
                    <button class="ghost" @click=${() => this.onWeatherStateRemove(n)}>
                      ${l("editor.inspector.remove")}
                    </button>
                  </div>
                </div>
              `
    )}
            <datalist id="flowme-weather-states">
              ${S.KNOWN_WEATHER_STATES.map(
      (n) => y`<option value=${n}></option>`
    )}
            </datalist>
            <button class="add-state" @click=${this.onWeatherStateAdd}>${l("editor.inspector.addWeatherState")}</button>
          </div>
          <details class="hint-details">
            <summary>${l("editor.inspector.metNoReferenceSummary")}</summary>
            <div class="hint-states">
              ${S.KNOWN_WEATHER_STATES.map(
      (n) => y`<code>${n}</code>`
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
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), i = this.config, n = Po(i, t || void 0);
    this.pushPatch(i, n, "edit weather entity");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const i = t.target.value.trim();
    if (!i || i === e) return;
    const n = this.config, o = Wo(n, e, i);
    o !== n && this.pushPatch(n, o, `rename weather state ${e}→${i}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, o = ti(n, e, i);
    this.pushPatch(n, o, `edit weather image ${e}`);
  }
  // -- toolbar --
  // -- suggest path --
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new As();
      } catch (e) {
        console.error("[FlowMe] worker init failed:", e), this._pathWorker = void 0;
        return;
      }
      this._pathWorker.onmessage = (e) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const t = this._pathPendingSelection;
        if (this._pathPendingSelection = null, !t || !this.config) return;
        const i = e.data;
        if (i.error) {
          console.error("[FlowMe] pathfinding worker error:", i.error), this.runPathfindingMainThread(t.fromId, t.toId, { logFallback: !0 });
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
        this._pathPendingSelection = null, console.error("[FlowMe] pathfinding worker error:", e), t && this.runPathfindingMainThread(t.fromId, t.toId, { logFallback: !0 });
      };
    }
  }
  applySuggestPathWorkerResult(e, t, i) {
    if (!e.edgesUsable) {
      this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
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
  async runPathfindingMainThread(e, t, i) {
    if (!this.config) return;
    i?.logFallback && console.log("[FlowMe] falling back to main thread pathfinding");
    const n = this.config.nodes.find((s) => s.id === e), o = this.config.nodes.find((s) => s.id === t);
    if (!(!n || !o)) {
      this.suggestBusy = !0;
      try {
        const s = await ys({
          imageUrl: this.config.background.default,
          from: n.position,
          to: o.position
        });
        if (!s.edgesUsable) {
          this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
          return;
        }
        this.applySuggestPathWorkerResult(s, e, t);
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
    const [e, t] = Array.from(this.selectedNodeIds), i = this.config.nodes.find((a) => a.id === e), n = this.config.nodes.find((a) => a.id === t);
    if (!i || !n)
      return;
    const o = this.config.background?.default ?? "";
    if (typeof Worker > "u") {
      await this.runPathfindingMainThread(e, t, { logFallback: !0 });
      return;
    }
    if (this.initPathWorker(), !this._pathWorker) {
      await this.runPathfindingMainThread(e, t, { logFallback: !0 });
      return;
    }
    this.suggestBusy = !0;
    const s = await vs(o);
    if (!s) {
      this.suggestBusy = !1, this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
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
        cellSize: Ae
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
        <span>${l("editor.suggestBar.message")}</span>
        <span>${l("editor.inspector.suggestPreviewWaypoints", this.suggestPreview.waypoints.length)}</span>
        <button type="button" aria-label=${l("editor.toolbar.acceptPath")} @click=${this.acceptSuggestion}>${l("editor.inspector.accept")}</button>
        <button type="button" class="ghost" aria-label=${l("editor.toolbar.cancelPath")} @click=${this.cancelSuggestion}>${l("editor.toolbar.cancel")}</button>
      </div>
    ` : x;
  }
  onNodeDotDblClick(e, t) {
    e.preventDefault(), e.stopPropagation(), this.selectorType = "nodes", this.selectedNodeId = t.id, this.selectedNodeIds = /* @__PURE__ */ new Set([t.id]), this.selectedFlowId = null, this.selectedOverlayId = null, this._pendingInspectorLabelFocus = !0;
  }
  onNodeLabelTextDblClick(e, t) {
    if (e.preventDefault(), e.stopPropagation(), e.target.closest(".eye-toggle")) return;
    const i = t.label ?? t.id;
    this.inlineRename = { kind: "node", id: t.id, draft: i };
  }
  commitNodeInlineRename(e) {
    const t = this.inlineRename;
    if (!t || t.kind !== "node" || !this.config) return;
    if (!e) {
      this.inlineRename = null;
      return;
    }
    const i = this.config.nodes.find((a) => a.id === t.id);
    if (!i) {
      this.inlineRename = null;
      return;
    }
    const n = i.label ?? i.id, o = t.draft.trim() ? t.draft.trim() : void 0;
    if ((i.label ?? void 0) === o) {
      this.inlineRename = null;
      return;
    }
    const s = this.config, r = Xe(s, t.id, o);
    this.inlineRename = null, this.pushPatch(
      s,
      r,
      `Rename node ${n} to ${o ?? "(cleared)"}`
    );
  }
  onOverlayChipDblClick(e, t) {
    e.preventDefault(), e.stopPropagation(), this.inlineRename = { kind: "overlay", id: t.id, draft: t.id };
  }
  commitOverlayInlineRename(e) {
    const t = this.inlineRename;
    if (!t || t.kind !== "overlay" || !this.config) return;
    if (!e) {
      this.inlineRename = null;
      return;
    }
    const i = t.draft.trim();
    if (!i || i === t.id) {
      this.inlineRename = null;
      return;
    }
    const n = this.config, o = ri(n, t.id, i);
    if (o === n) {
      this.errorMessage = l("editor.errors.renameIdConflict"), this.inlineRename = null;
      return;
    }
    this.inlineRename = null, this.errorMessage = "", this.pushPatch(n, o, `Rename overlay ${t.id} to ${i}`), this.selectedOverlayId = i;
  }
  onInspectorFlowIdChange(e, t) {
    if (!this.config) return;
    const i = t.target, n = i.value.trim(), o = this.config, s = Yo(o, e, n);
    if (s === o) {
      this.errorMessage = l("editor.errors.renameIdConflict"), i.value = e;
      return;
    }
    this.errorMessage = "", this.pushPatch(o, s, `Rename flow ${e} to ${n}`), this.selectedFlowId = n;
  }
  onInspectorOverlayIdChange(e, t) {
    if (!this.config) return;
    const i = t.target, n = i.value.trim(), o = this.config, s = ri(o, e, n);
    if (s === o) {
      this.errorMessage = l("editor.errors.renameIdConflict"), i.value = e;
      return;
    }
    this.errorMessage = "", this.pushPatch(o, s, `Rename overlay ${e} to ${n}`), this.selectedOverlayId = n;
  }
  // -- inspector edits --
  onNodeLabelChange(e, t) {
    if (!this.config) return;
    const i = t.target.value, n = this.config, s = n.nodes.find((c) => c.id === e)?.label ?? e, r = Xe(n, e, i.trim() ? i.trim() : void 0), a = i.trim() ? i.trim() : void 0;
    this.pushPatch(n, r, `Rename node ${s} to ${a ?? e}`);
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
    const r = this.config, a = ei(r, e, { ...o, [t]: s });
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
    } catch (o) {
      this.customConfigError = l("editor.inspector.invalidCardJson", o instanceof Error ? o.message : String(o));
      return;
    }
    if (!i || typeof i != "object" || Array.isArray(i)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const n = this.config;
    try {
      const o = Ro(n, e, i), s = ft(o);
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({ prev: n, next: s, description: `edit overlay ${e} card config` }), this.commitToHa(s);
    } catch (o) {
      this.customConfigError = o instanceof Error ? o.message : String(o);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, i = Eo(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, i, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, i = $o(t, e);
    this.selectedNodeId = null, this.pushPatch(t, i, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config, i = So(t, e);
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
    const n = e.clientX - (i.left + 8), o = e.clientY - (i.top + 4), s = (n - this.panX) / this.scale, r = (o - this.panY) / this.scale, a = E(s / this.imageNaturalW * 100), c = E(r / this.imageNaturalH * 100);
    return { x: a, y: c };
  }
  pushPatch(e, t, i) {
    try {
      const n = ft(e), o = ft(t);
      this.errorMessage = "", this.undoStack.push({ prev: n, next: o, description: i }), this.commitToHa(o), this.config = o, ae(o.debug ?? !1);
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
S.KNOWN_WEATHER_STATES = [
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
S.styles = ge`
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
B([
  _t({ attribute: !1 })
], S.prototype, "hass", 2);
B([
  k()
], S.prototype, "config", 2);
B([
  k()
], S.prototype, "pending", 2);
B([
  k()
], S.prototype, "previewMode", 2);
B([
  k()
], S.prototype, "selectedNodeId", 2);
B([
  k()
], S.prototype, "selectedNodeIds", 2);
B([
  k()
], S.prototype, "selectedFlowId", 2);
B([
  k()
], S.prototype, "selectedOverlayId", 2);
B([
  k()
], S.prototype, "customConfigDraft", 2);
B([
  k()
], S.prototype, "customConfigError", 2);
B([
  k()
], S.prototype, "errorMessage", 2);
B([
  k()
], S.prototype, "inlineRename", 2);
B([
  k()
], S.prototype, "canUndo", 2);
B([
  k()
], S.prototype, "canRedo", 2);
B([
  k()
], S.prototype, "undoLabel", 2);
B([
  k()
], S.prototype, "redoLabel", 2);
B([
  k()
], S.prototype, "suggestPreview", 2);
B([
  k()
], S.prototype, "suggestBusy", 2);
B([
  k()
], S.prototype, "selectorType", 2);
B([
  k()
], S.prototype, "savedConfig", 2);
B([
  k()
], S.prototype, "scale", 2);
B([
  k()
], S.prototype, "panX", 2);
B([
  k()
], S.prototype, "panY", 2);
S = B([
  be("flowme-card-editor")
], S);
var _s = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, W = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ss(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && _s(t, i, o), o;
};
const ks = "1.23.0", mi = 5e3;
console.info(
  `%c flowme %c v${ks} `,
  "color: white; background: #4ADE80; font-weight: 700;",
  "color: #4ADE80; background: #111; font-weight: 700;"
);
function Ps(e) {
  if (!e) return "";
  const t = [], i = (n, o) => {
    const s = e[n];
    s !== void 0 && t.push(`${o}:${s};`);
  };
  return i("background", "--flowme-opacity-bg"), i("darken", "--flowme-opacity-darken"), i("nodes", "--flowme-opacity-nodes"), i("flows", "--flowme-opacity-flows"), i("dots", "--flowme-opacity-dots"), i("glow", "--flowme-opacity-glow"), i("labels", "--flowme-opacity-labels"), i("values", "--flowme-opacity-values"), i("overlays", "--flowme-opacity-overlays"), t.join("");
}
function Ms(e) {
  if (!e) return "";
  const t = [], i = (n, o) => {
    e[n] === !1 && t.push(`${o}:none;`);
  };
  return i("nodes", "--flowme-vis-nodes"), i("lines", "--flowme-vis-lines"), i("dots", "--flowme-vis-dots"), i("labels", "--flowme-vis-labels"), i("values", "--flowme-vis-values"), i("overlays", "--flowme-vis-overlays"), t.join("");
}
let z = class extends Q {
  constructor() {
    super(...arguments), this._connectionAwaitingReconnect = !1, this._boundHaConnection = null, this.onHaConnectionReady = () => {
      this.onReconnect();
    }, this.onHaConnectionDisconnected = () => {
      this._connectionAwaitingReconnect = !0;
    }, this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = lt(), this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this.onOverlayKeydown = (e, t) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.handleOverlayTap(t));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e && e.language !== this._lastLanguage && (this._lastLanguage = e.language, Ii(e.language)), e) {
      const i = this.config, n = [
        ...i?.flows.map((c) => c.entity) ?? [],
        ...i?.flows.map((c) => c.value_gradient?.entity).filter(Boolean) ?? [],
        ...i?.nodes.map((c) => c.entity).filter(Boolean) ?? [],
        i?.background.weather_entity,
        i?.background.sun_entity
      ].filter((c) => typeof c == "string" && c.length > 0), o = {};
      for (const c of n)
        o[c] = e.states[c]?.state;
      P("hass setter called. config entity states:", o);
      const s = i?.background.weather_entity;
      if (s) {
        const c = t?.states[s]?.state, p = e.states[s]?.state;
        P("[weather] state:", p, "(was:", c, ")"), c !== p && this.syncWeatherBackground();
      }
      const r = i?.background.sun_entity;
      if (r) {
        const c = t?.states[r]?.state, p = e.states[r]?.state;
        c !== p && (P("[sun] state changed:", c, "→", p), this.syncWeatherBackground());
      }
      const a = e.connection;
      this.bindHaConnection(a);
    } else
      P("hass setter called with undefined"), this.bindHaConnection(void 0), t && this.showToast(l("card.connectionLost"));
    this.requestUpdate("hass", t);
  }
  /** ANIM-3: subscribe once per hass.connection instance */
  bindHaConnection(e) {
    this._boundHaConnection !== e && (this._boundHaConnection && (this._boundHaConnection.removeEventListener("ready", this.onHaConnectionReady), this._boundHaConnection.removeEventListener("disconnected", this.onHaConnectionDisconnected), this._boundHaConnection = null), e && (e.addEventListener("ready", this.onHaConnectionReady), e.addEventListener("disconnected", this.onHaConnectionDisconnected), this._boundHaConnection = e));
  }
  /**
   * ANIM-3: after websocket reconnect — refresh renderer values without tearing
   * down SVG/Houdini; optional brief toast.
   */
  onReconnect() {
    this.hass && this.config && this.renderer && this.pushAllValuesToRenderer(), this._connectionAwaitingReconnect && (this._connectionAwaitingReconnect = !1, this.showToast(l("card.reconnected"), 1500));
  }
  setConfig(e) {
    try {
      const t = ft(e);
      ae(t.debug ?? !1), P("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), P("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0), this.config = t, this.errorMessage = void 0, this.rendererReadyFor && this.rendererReadyFor !== t && this.teardownRenderer();
      const i = t.background.default;
      this.bgLayerA = i, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = i;
    } catch (t) {
      const i = t instanceof ye ? t.message : String(t);
      this.config = void 0, this.errorMessage = i, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), P("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    P("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), P("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this.bindHaConnection(void 0), this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), super.disconnectedCallback();
  }
  willUpdate(e) {
    if (!this.config) return;
    const t = this.rendererMount.value;
    if (t && this.rendererReadyFor !== this.config) {
      this.teardownRenderer(), this.renderer = lo(), this.rendererReadyFor = this.config;
      const i = this.config;
      this.renderer.init(t, i).then(() => {
        this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
      }).catch((n) => {
        P("renderer init failed — falling back to SVG renderer", n), this.teardownRenderer(), this.renderer = new Nt(), this.rendererReadyFor = i, this.renderer.init(t, i).then(() => {
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
      P("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
      for (const e of this.config.flows) {
        const t = this.hass.states[e.entity], i = kt(t?.state), n = T(e.domain ?? this.config.domain), o = t?.attributes?.unit_of_measurement, s = Te(i, o, n.unit_scale);
        if (P(
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
            this.warnedMissing.has(r) || (this.warnedMissing.add(r), P(`flow "${e.id}" entity "${e.entity}" is currently ${t.state} — no flow will render until it reports a number`));
          }
        } else {
          const r = `${e.id}:${e.entity}`;
          this.warnedMissing.has(r) || (this.warnedMissing.add(r), P(`flow "${e.id}" references entity "${e.entity}" but it is not present in hass.states — check spelling / domain permissions`));
        }
        if (this.renderer.updateFlow(e.id, s.value), e.value_gradient && this.renderer.setGradientColor) {
          const r = e.value_gradient.entity, a = this.hass.states[r];
          if (a && a.state !== "unavailable" && a.state !== "unknown") {
            const c = parseFloat(a.state);
            if (Number.isFinite(c)) {
              const p = e.value_gradient, d = Math.max(p.low_value, Math.min(p.high_value, c)), u = Pi(c, p);
              P(
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
              P(`flow "${e.id}" gradient entity "${r}" state "${a.state}" is not a number`), this.renderer.setGradientColor(e.id, null);
          } else
            P(`flow "${e.id}" gradient entity "${r}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(e.id, null);
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
    if (!this.hass || !this.config) return l("card.noConnection");
    const t = this.hass.states[e.entity], i = T(e.domain ?? this.config.domain);
    if (!t) return l("card.entityNotFound");
    if (t.state === "unavailable" || t.state === "unknown") return t.state;
    const n = kt(t.state), o = t.attributes?.unit_of_measurement ?? "", s = Te(n, o, i.unit_scale);
    return o ? `${this.formatSensorNumber(s.value)} ${o}` : i.describe(s.value);
  }
  formatFlowAriaLabel(e) {
    return l("aria.flowGroup", e.id, this.describeFlowReading(e));
  }
  formatNodeAriaLabel(e) {
    const t = e.label ?? e.id;
    if (!this.hass || !e.entity || !this.config) return t;
    const i = this.hass.states[e.entity], n = T(this.config.domain);
    if (!i) return l("aria.readingWithTitle", t, l("card.entityNotFound"));
    if (i.state === "unavailable" || i.state === "unknown")
      return l("aria.readingWithTitle", t, i.state);
    const o = kt(i.state), s = i.attributes?.unit_of_measurement ?? "";
    return s ? l("aria.readingWithTitle", t, `${this.formatSensorNumber(o)} ${s}`) : l("aria.readingWithTitle", t, n.describe(o));
  }
  getCardSize() {
    const e = Vt(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  /**
   * Modern HA Sections/Grid view layout. Without this, HA shows the
   * "This card does not fully support resizing yet" banner. We advertise a
   * full-width default and allow resizing within reasonable bounds.
   */
  getLayoutOptions() {
    const e = Vt(this.config?.aspect_ratio) ?? 1.6;
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
        <ha-card role="region" aria-label=${l("aria.card")}>
          <div class="error">
            <strong>${l("card.invalidConfigurationTitle")}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e)
      return y`<ha-card role="region" aria-label=${l("aria.card")}><div class="placeholder">${l("card.loading")}</div></ha-card>`;
    const i = `${1 / (Vt(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = e.background.transition_duration ?? mi, o = Ps(e.opacity), s = Ms(e.visibility);
    return y`
      <ha-card role="region" aria-label=${l("aria.card")}>
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
          <div class="renderer-mount" ${ct(this.rendererMount)}></div>
          ${e.nodes.map((r) => this.renderNodeHandle(r))}
          ${(e.overlays ?? []).map((r) => (P("rendering overlay →", r.type, "position=", r.position, "size=", r.size), uo(r, this.hass, {
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
      this.showToast(l("card.actionFailed"));
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
        const i = t.state, n = e.sun_entity ? this.hass.states[e.sun_entity]?.state : void 0, o = En(i, n, e.weather_states, e.default);
        let s = i;
        return n === "below_horizon" && !i.endsWith("-night") && (s = `${i}-night`), P("[FlowMe] sun:", n, "weather:", i, "→ lookup key:", s, "→ image:", o !== e.default ? o : "default"), o;
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
    const t = this.config.background.transition_duration ?? mi;
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
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, i = e.show_value !== !1 && !!t, n = e.show_label !== !1 && !!e.label, o = T(this.config?.domain), s = e.color ?? this.nodeFlowColor(e.id) ?? o.default_color_positive, r = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let a = "";
    if (t) {
      const p = kt(t.state), d = t.attributes?.unit_of_measurement ?? "";
      d ? a = `${this.formatSensorNumber(p)} ${d}` : a = o.describe(p);
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
  nodeFlowColor(e) {
    if (!this.config) return;
    const t = this.config.domain, i = this.config.domain_colors;
    let n;
    const o = /* @__PURE__ */ new Set();
    for (let s = 0; s < this.config.flows.length; s++) {
      const r = this.config.flows[s];
      if (r.from_node !== e && r.to_node !== e) continue;
      const a = T(r.domain ?? t), c = Ct(r, a, r.domain ?? t, 1, i, s), p = c.toLowerCase();
      o.has(p) || (o.add(p), n || (n = c));
    }
    if (o.size !== 0)
      return o.size === 1 ? n : Gn;
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
z.styles = ge`
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
W([
  _t({ attribute: !1 })
], z.prototype, "hass", 1);
W([
  k()
], z.prototype, "config", 2);
W([
  k()
], z.prototype, "errorMessage", 2);
W([
  k()
], z.prototype, "toastVisible", 2);
W([
  k()
], z.prototype, "toastMessage", 2);
W([
  k()
], z.prototype, "bgLayerA", 2);
W([
  k()
], z.prototype, "bgLayerB", 2);
W([
  k()
], z.prototype, "activeLayer", 2);
z = W([
  be("flowme-card")
], z);
const pe = window;
pe.customCards = pe.customCards ?? [];
pe.customCards.push({
  type: "flowme-card",
  name: "flowme",
  description: l("card.hacsDescription"),
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  z as FlowmeCard
};
//# sourceMappingURL=flowme-card.js.map
