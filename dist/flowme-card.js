var Ie = globalThis, yt = Ie.ShadowRoot && (Ie.ShadyCSS === void 0 || Ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = /* @__PURE__ */ Symbol(), Bt = /* @__PURE__ */ new WeakMap(), Oi = class {
  constructor(i, e, t) {
    if (this._$cssResult$ = !0, t !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = i, this.t = e;
  }
  get styleSheet() {
    let i = this.o;
    const e = this.t;
    if (yt && i === void 0) {
      const t = e !== void 0 && e.length === 1;
      t && (i = Bt.get(e)), i === void 0 && ((this.o = i = new CSSStyleSheet()).replaceSync(this.cssText), t && Bt.set(e, i));
    }
    return i;
  }
  toString() {
    return this.cssText;
  }
}, _n = (i) => new Oi(typeof i == "string" ? i : i + "", void 0, wt), xt = (i, ...e) => new Oi(i.length === 1 ? i[0] : e.reduce((t, n, o) => t + ((r) => {
  if (r._$cssResult$ === !0) return r.cssText;
  if (typeof r == "number") return r;
  throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + i[o + 1], i[0]), i, wt), kn = (i, e) => {
  if (yt) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), o = Ie.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = t.cssText, i.appendChild(n);
  }
}, Dt = yt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return _n(t);
})(i) : i, zt, { is: An, defineProperty: Sn, getOwnPropertyDescriptor: Cn, getOwnPropertyNames: Fn, getOwnPropertySymbols: Mn, getPrototypeOf: Pn } = Object, ce = globalThis, Ot = ce.trustedTypes, Nn = Ot ? Ot.emptyScript : "", Rn = ce.reactiveElementPolyfillSupport, ye = (i, e) => i, Le = {
  toAttribute(i, e) {
    switch (e) {
      case Boolean:
        i = i ? Nn : null;
        break;
      case Object:
      case Array:
        i = i == null ? i : JSON.stringify(i);
    }
    return i;
  },
  fromAttribute(i, e) {
    let t = i;
    switch (e) {
      case Boolean:
        t = i !== null;
        break;
      case Number:
        t = i === null ? null : Number(i);
        break;
      case Object:
      case Array:
        try {
          t = JSON.parse(i);
        } catch {
          t = null;
        }
    }
    return t;
  }
}, $t = (i, e) => !An(i, e), Lt = {
  attribute: !0,
  type: String,
  converter: Le,
  reflect: !1,
  useDefault: !1,
  hasChanged: $t
};
(zt = Symbol).metadata ?? (zt.metadata = /* @__PURE__ */ Symbol("metadata")), ce.litPropertyMetadata ?? (ce.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var le = class extends HTMLElement {
  static addInitializer(i) {
    this._$Ei(), (this.l ?? (this.l = [])).push(i);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(i, e = Lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(i) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(i, e), !e.noAccessor) {
      const t = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(i, t, e);
      n !== void 0 && Sn(this.prototype, i, n);
    }
  }
  static getPropertyDescriptor(i, e, t) {
    const { get: n, set: o } = Cn(this.prototype, i) ?? {
      get() {
        return this[e];
      },
      set(r) {
        this[e] = r;
      }
    };
    return {
      get: n,
      set(r) {
        const s = n?.call(this);
        o?.call(this, r), this.requestUpdate(i, s, t);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(i) {
    return this.elementProperties.get(i) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ye("elementProperties"))) return;
    const i = Pn(this);
    i.finalize(), i.l !== void 0 && (this.l = [...i.l]), this.elementProperties = new Map(i.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ye("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ye("properties"))) {
      const e = this.properties, t = [...Fn(e), ...Mn(e)];
      for (const n of t) this.createProperty(n, e[n]);
    }
    const i = this[Symbol.metadata];
    if (i !== null) {
      const e = litPropertyMetadata.get(i);
      if (e !== void 0) for (const [t, n] of e) this.elementProperties.set(t, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, t] of this.elementProperties) {
      const n = this._$Eu(e, t);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(i) {
    const e = [];
    if (Array.isArray(i)) {
      const t = new Set(i.flat(1 / 0).reverse());
      for (const n of t) e.unshift(Dt(n));
    } else i !== void 0 && e.push(Dt(i));
    return e;
  }
  static _$Eu(i, e) {
    const t = e.attribute;
    return t === !1 ? void 0 : typeof t == "string" ? t : typeof i == "string" ? i.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((i) => i(this));
  }
  addController(i) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(i), this.renderRoot !== void 0 && this.isConnected && i.hostConnected?.();
  }
  removeController(i) {
    this._$EO?.delete(i);
  }
  _$E_() {
    const i = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const t of e.keys()) this.hasOwnProperty(t) && (i.set(t, this[t]), delete this[t]);
    i.size > 0 && (this._$Ep = i);
  }
  createRenderRoot() {
    const i = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return kn(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((i) => i.hostConnected?.());
  }
  enableUpdating(i) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((i) => i.hostDisconnected?.());
  }
  attributeChangedCallback(i, e, t) {
    this._$AK(i, t);
  }
  _$ET(i, e) {
    const t = this.constructor.elementProperties.get(i), n = this.constructor._$Eu(i, t);
    if (n !== void 0 && t.reflect === !0) {
      const o = (t.converter?.toAttribute !== void 0 ? t.converter : Le).toAttribute(e, t.type);
      this._$Em = i, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(i, e) {
    const t = this.constructor, n = t._$Eh.get(i);
    if (n !== void 0 && this._$Em !== n) {
      const o = t.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Le;
      this._$Em = n;
      const s = r.fromAttribute(e, o.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(i, e, t, n = !1, o) {
    if (i !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[i]), t ?? (t = r.getPropertyOptions(i)), !((t.hasChanged ?? $t)(o, e) || t.useDefault && t.reflect && o === this._$Ej?.get(i) && !this.hasAttribute(r._$Eu(i, t)))) return;
      this.C(i, e, t);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(i, e, { useDefault: t, reflect: n, wrapped: o }, r) {
    t && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(i) && (this._$Ej.set(i, r ?? e ?? this[i]), o !== !0 || r !== void 0) || (this._$AL.has(i) || (this.hasUpdated || t || (e = void 0), this._$AL.set(i, e)), n === !0 && this._$Em !== i && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(i));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const i = this.scheduleUpdate();
    return i != null && await i, !this.isUpdatePending;
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
      const t = this.constructor.elementProperties;
      if (t.size > 0) for (const [n, o] of t) {
        const { wrapped: r } = o, s = this[n];
        r !== !0 || this._$AL.has(n) || s === void 0 || this.C(n, void 0, o, s);
      }
    }
    let i = !1;
    const e = this._$AL;
    try {
      i = this.shouldUpdate(e), i ? (this.willUpdate(e), this._$EO?.forEach((t) => t.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (t) {
      throw i = !1, this._$EM(), t;
    }
    i && this._$AE(e);
  }
  willUpdate(i) {
  }
  _$AE(i) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(i)), this.updated(i);
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
  shouldUpdate(i) {
    return !0;
  }
  update(i) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(i) {
  }
  firstUpdated(i) {
  }
};
le.elementStyles = [], le.shadowRootOptions = { mode: "open" }, le[ye("elementProperties")] = /* @__PURE__ */ new Map(), le[ye("finalized")] = /* @__PURE__ */ new Map(), Rn?.({ ReactiveElement: le }), (ce.reactiveElementVersions ?? (ce.reactiveElementVersions = [])).push("2.1.2");
var He = globalThis, Ht = (i) => i, Ue = He.trustedTypes, Ut = Ue ? Ue.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, _t = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, kt = "?" + j, En = `<${kt}>`, ne = document, xe = () => ne.createComment(""), $e = (i) => i === null || typeof i != "object" && typeof i != "function", At = Array.isArray, Li = (i) => At(i) || typeof i?.[Symbol.iterator] == "function", Xe = `[ 	
\f\r]`, he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, jt = />/g, J = RegExp(`>|${Xe}(?:([^\\s"'>=/]+)(${Xe}*=${Xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Gt = /"/g, Hi = /^(?:script|style|textarea|title)$/i, St = (i) => (e, ...t) => ({
  _$litType$: i,
  strings: e,
  values: t
}), b = St(1), qt = St(2), ns = St(3), de = /* @__PURE__ */ Symbol.for("lit-noChange"), _ = /* @__PURE__ */ Symbol.for("lit-nothing"), Xt = /* @__PURE__ */ new WeakMap(), ee = ne.createTreeWalker(ne, 129);
function Ui(i, e) {
  if (!At(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ut !== void 0 ? Ut.createHTML(e) : e;
}
var Wi = (i, e) => {
  const t = i.length - 1, n = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = he;
  for (let a = 0; a < t; a++) {
    const d = i[a];
    let c, p, u = -1, f = 0;
    for (; f < d.length && (s.lastIndex = f, p = s.exec(d), p !== null); ) f = s.lastIndex, s === he ? p[1] === "!--" ? s = Wt : p[1] !== void 0 ? s = jt : p[2] !== void 0 ? (Hi.test(p[2]) && (o = RegExp("</" + p[2], "g")), s = J) : p[3] !== void 0 && (s = J) : s === J ? p[0] === ">" ? (s = o ?? he, u = -1) : p[1] === void 0 ? u = -2 : (u = s.lastIndex - p[2].length, c = p[1], s = p[3] === void 0 ? J : p[3] === '"' ? Gt : Vt) : s === Gt || s === Vt ? s = J : s === Wt || s === jt ? s = he : (s = J, o = void 0);
    const h = s === J && i[a + 1].startsWith("/>") ? " " : "";
    r += s === he ? d + En : u >= 0 ? (n.push(c), d.slice(0, u) + _t + d.slice(u) + j + h) : d + j + (u === -2 ? a : h);
  }
  return [Ui(i, r + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
}, ct = class ji {
  constructor({ strings: e, _$litType$: t }, n) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = e.length - 1, d = this.parts, [c, p] = Wi(e, t);
    if (this.el = ji.createElement(c, n), ee.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = ee.nextNode()) !== null && d.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(_t)) {
          const f = p[s++], h = o.getAttribute(u).split(j), g = /([.?@])?(.*)/.exec(f);
          d.push({
            type: 1,
            index: r,
            name: g[2],
            strings: h,
            ctor: g[1] === "." ? qi : g[1] === "?" ? Xi : g[1] === "@" ? Yi : Ce
          }), o.removeAttribute(u);
        } else u.startsWith(j) && (d.push({
          type: 6,
          index: r
        }), o.removeAttribute(u));
        if (Hi.test(o.tagName)) {
          const u = o.textContent.split(j), f = u.length - 1;
          if (f > 0) {
            o.textContent = Ue ? Ue.emptyScript : "";
            for (let h = 0; h < f; h++) o.append(u[h], xe()), ee.nextNode(), d.push({
              type: 2,
              index: ++r
            });
            o.append(u[f], xe());
          }
        }
      } else if (o.nodeType === 8) if (o.data === kt) d.push({
        type: 2,
        index: r
      });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(j, u + 1)) !== -1; ) d.push({
          type: 7,
          index: r
        }), u += j.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const n = ne.createElement("template");
    return n.innerHTML = e, n;
  }
};
function oe(i, e, t = i, n) {
  if (e === de) return e;
  let o = n !== void 0 ? t._$Co?.[n] : t._$Cl;
  const r = $e(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(i), o._$AT(i, t, n)), n !== void 0 ? (t._$Co ?? (t._$Co = []))[n] = o : t._$Cl = o), o !== void 0 && (e = oe(i, o._$AS(i, e.values), o, n)), e;
}
var Vi = class {
  constructor(i, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = i, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(i) {
    const { el: { content: e }, parts: t } = this._$AD, n = (i?.creationScope ?? ne).importNode(e, !0);
    ee.currentNode = n;
    let o = ee.nextNode(), r = 0, s = 0, a = t[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new qe(o, o.nextSibling, this, i) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, i) : a.type === 6 && (d = new Zi(o, this, i)), this._$AV.push(d), a = t[++s];
      }
      r !== a?.index && (o = ee.nextNode(), r++);
    }
    return ee.currentNode = ne, n;
  }
  p(i) {
    let e = 0;
    for (const t of this._$AV) t !== void 0 && (t.strings !== void 0 ? (t._$AI(i, t, e), e += t.strings.length - 2) : t._$AI(i[e])), e++;
  }
}, qe = class Gi {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, n, o) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = oe(this, e, t), $e(e) ? e === _ || e == null || e === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : e !== this._$AH && e !== de && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Li(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== _ && $e(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ne.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ct.createElement(Ui(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(t);
    else {
      const r = new Vi(o, this), s = r.u(this.options);
      r.p(t), this.T(s), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Xt.get(e.strings);
    return t === void 0 && Xt.set(e.strings, t = new ct(e)), t;
  }
  k(e) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, o = 0;
    for (const r of e) o === t.length ? t.push(n = new Gi(this.O(xe()), this.O(xe()), this, this.options)) : n = t[o], n._$AI(r), o++;
    o < t.length && (this._$AR(n && n._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const n = Ht(e).nextSibling;
      Ht(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, Ce = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(i, e, t, n, o) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = i, this.name = e, this._$AM = n, this.options = o, t.length > 2 || t[0] !== "" || t[1] !== "" ? (this._$AH = Array(t.length - 1).fill(/* @__PURE__ */ new String()), this.strings = t) : this._$AH = _;
  }
  _$AI(i, e = this, t, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) i = oe(this, i, e, 0), r = !$e(i) || i !== this._$AH && i !== de, r && (this._$AH = i);
    else {
      const s = i;
      let a, d;
      for (i = o[0], a = 0; a < o.length - 1; a++) d = oe(this, s[t + a], e, a), d === de && (d = this._$AH[a]), r || (r = !$e(d) || d !== this._$AH[a]), d === _ ? i = _ : i !== _ && (i += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    r && !n && this.j(i);
  }
  j(i) {
    i === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, i ?? "");
  }
}, qi = class extends Ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(i) {
    this.element[this.name] = i === _ ? void 0 : i;
  }
}, Xi = class extends Ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(i) {
    this.element.toggleAttribute(this.name, !!i && i !== _);
  }
}, Yi = class extends Ce {
  constructor(i, e, t, n, o) {
    super(i, e, t, n, o), this.type = 5;
  }
  _$AI(i, e = this) {
    if ((i = oe(this, i, e, 0) ?? _) === de) return;
    const t = this._$AH, n = i === _ && t !== _ || i.capture !== t.capture || i.once !== t.once || i.passive !== t.passive, o = i !== _ && (t === _ || n);
    n && this.element.removeEventListener(this.name, this, t), o && this.element.addEventListener(this.name, this, i), this._$AH = i;
  }
  handleEvent(i) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, i) : this._$AH.handleEvent(i);
  }
}, Zi = class {
  constructor(i, e, t) {
    this.element = i, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = t;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(i) {
    oe(this, i);
  }
}, Tn = {
  M: _t,
  P: j,
  A: kt,
  C: 1,
  L: Wi,
  R: Vi,
  D: Li,
  V: oe,
  I: qe,
  H: Ce,
  N: Xi,
  U: Yi,
  B: qi,
  F: Zi
}, In = He.litHtmlPolyfillSupport;
In?.(ct, qe), (He.litHtmlVersions ?? (He.litHtmlVersions = [])).push("3.3.2");
var Bn = (i, e, t) => {
  const n = t?.renderBefore ?? e;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = t?.renderBefore ?? null;
    n._$litPart$ = o = new qe(e.insertBefore(xe(), r), r, void 0, t ?? {});
  }
  return o._$AI(i), o;
}, We = globalThis, ie = class extends le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(i) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(i), this._$Do = Bn(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return de;
  }
};
ie._$litElement$ = !0, ie.finalized = !0, We.litElementHydrateSupport?.({ LitElement: ie });
var Dn = We.litElementPolyfillSupport;
Dn?.({ LitElement: ie });
(We.litElementVersions ?? (We.litElementVersions = [])).push("4.2.2");
var Ct = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
}, zn = {
  attribute: !0,
  type: String,
  converter: Le,
  reflect: !1,
  hasChanged: $t
}, On = (i = zn, e, t) => {
  const { kind: n, metadata: o } = t;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(t.name, i), n === "accessor") {
    const { name: s } = t;
    return {
      set(a) {
        const d = e.get.call(this);
        e.set.call(this, a), this.requestUpdate(s, d, i, !0, a);
      },
      init(a) {
        return a !== void 0 && this.C(s, void 0, i, a), a;
      }
    };
  }
  if (n === "setter") {
    const { name: s } = t;
    return function(a) {
      const d = this[s];
      e.call(this, a), this.requestUpdate(s, d, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Fe(i) {
  return (e, t) => typeof t == "object" ? On(i, e, t) : ((n, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(i, e, t);
}
function P(i) {
  return Fe({
    ...i,
    state: !0,
    attribute: !1
  });
}
var { I: os } = Tn;
var Ln = (i) => i.strings === void 0;
var Hn = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
}, Un = (i) => (...e) => ({
  _$litDirective$: i,
  values: e
}), Wn = class {
  constructor(i) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(i, e, t) {
    this._$Ct = i, this._$AM = e, this._$Ci = t;
  }
  _$AS(i, e) {
    return this.update(i, e);
  }
  update(i, e) {
    return this.render(...e);
  }
}, we = (i, e) => {
  const t = i._$AN;
  if (t === void 0) return !1;
  for (const n of t) n._$AO?.(e, !1), we(n, e);
  return !0;
}, je = (i) => {
  let e, t;
  do {
    if ((e = i._$AM) === void 0) break;
    t = e._$AN, t.delete(i), i = e;
  } while (t?.size === 0);
}, Ki = (i) => {
  for (let e; e = i._$AM; i = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(i)) break;
    t.add(i), Gn(e);
  }
};
function jn(i) {
  this._$AN !== void 0 ? (je(this), this._$AM = i, Ki(this)) : this._$AM = i;
}
function Vn(i, e = !1, t = 0) {
  const n = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0) if (e) if (Array.isArray(n)) for (let r = t; r < n.length; r++) we(n[r], !1), je(n[r]);
  else n != null && (we(n, !1), je(n));
  else we(this, i);
}
var Gn = (i) => {
  i.type == Hn.CHILD && (i._$AP ?? (i._$AP = Vn), i._$AQ ?? (i._$AQ = jn));
}, qn = class extends Wn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i, e, t) {
    super._$AT(i, e, t), Ki(this), this.isConnected = i._$AU;
  }
  _$AO(i, e = !0) {
    i !== this.isConnected && (this.isConnected = i, i ? this.reconnected?.() : this.disconnected?.()), e && (we(this, i), je(this));
  }
  setValue(i) {
    if (Ln(this._$Ct)) this._$Ct._$AI(i, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = i, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}, Y = () => new Xn(), Xn = class {
}, Ye = /* @__PURE__ */ new WeakMap(), Z = Un(class extends qn {
  render(i) {
    return _;
  }
  update(i, [e]) {
    const t = e !== this.G;
    return t && this.G !== void 0 && this.rt(void 0), (t || this.lt !== this.ct) && (this.G = e, this.ht = i.options?.host, this.rt(this.ct = i.element)), _;
  }
  rt(i) {
    if (this.isConnected || (i = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let t = Ye.get(e);
      t === void 0 && (t = /* @__PURE__ */ new WeakMap(), Ye.set(e, t)), t.get(this.G) !== void 0 && this.G.call(this.ht, void 0), t.set(this.G, i), i !== void 0 && this.G.call(this.ht, i);
    } else this.G.value = i;
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
}), _e = [
  "energy",
  "water",
  "network",
  "hvac",
  "gas",
  "generic"
];
function Ji(i) {
  if (i == null || typeof i != "string") return "energy";
  const e = i.trim().toLowerCase();
  return _e.includes(e) ? e : "energy";
}
var dt = [
  "corner",
  "diagonal",
  "curve",
  "smooth"
], pt = [
  "dots",
  "dash",
  "arrow",
  "trail",
  "fluid",
  "none"
], ut = [
  "circle",
  "square",
  "arrow",
  "teardrop",
  "diamond",
  "custom_svg"
], ht = [
  "auto",
  "forward",
  "reverse",
  "both"
], ft = [
  "even",
  "random",
  "clustered",
  "pulse",
  "wave_spacing",
  "wave_lateral"
], Yn = {
  card: {
    connectionLost: "Connection lost",
    reconnected: "Reconnected",
    actionFailed: "Action failed — please retry",
    loading: "Loading...",
    invalidConfigurationTitle: "flowme: invalid configuration",
    noConnection: "no connection",
    entityNotFound: "entity not found"
  },
  security: { unsafeUrlInCard: (i, e) => `Unsafe URL scheme '${i}' in ${e}. flowme rejects javascript:, vbscript:, data: and file: URLs inside custom overlay configs.` },
  overlays: { haHelpersUnavailable: "HA card helpers unavailable" },
  editor: {
    hintNoConfig: 'No configuration loaded yet. Use "Show code editor" to paste YAML.',
    canvas: {
      ariaLabel: "FlowMe visual editor canvas",
      hideCanvas: "▲ Hide canvas",
      showCanvas: "▼ Show canvas",
      addNodeAria: "Add node — then click canvas to place",
      addFlowAria: "Add flow between two nodes",
      addOverlayAria: "Add overlay card",
      saveAria: "Save configuration to Home Assistant",
      saveTitle: "Apply current configuration to the card",
      cancelAria: "Discard editor changes",
      cancelTitle: "Discard all changes since the editor opened",
      selectTypeAria: "Select element type",
      selectElementAria: "Select element",
      undoTitleWithDesc: (i) => `Undo: ${i} (Ctrl+Z)`,
      undoTitlePlain: "Undo (Ctrl+Z)",
      redoTitleWithDesc: (i) => `Redo: ${i} (Ctrl+Shift+Z)`,
      redoTitlePlain: "Redo (Ctrl+Shift+Z)",
      overlayOption: (i, e) => `Overlay ${i + 1}${e}`,
      overlayOptionIdPart: (i) => ` (${i})`
    },
    tabs: {
      barAria: "FlowMe editor sections",
      card: "Card",
      nodes: "Nodes",
      flows: "Flows",
      overlays: "Overlays",
      settings: "Settings",
      emptySelection: "Select an element on the canvas or choose a chip.",
      overlayChip: (i, e) => `${i} · ${e + 1}`
    },
    section: {
      domainLayout: "Domain & layout",
      background: "Background",
      appearance: "Appearance",
      layerOpacity: "Layer opacity",
      flowDefaults: "Flow defaults",
      animationDefaults: "Animation defaults",
      developer: "Developer",
      debugMode: "Debug mode",
      nodeBasic: "Basic",
      nodeEffect: "Effect",
      flowConnection: "Connection",
      flowAnimation: "Animation",
      overlayPosition: "Position & size",
      overlayCard: "Card config"
    },
    background: { showWeatherMappings: "Show weather state mappings" },
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
      undoTitleWithDesc: (i) => `Undo: ${i}`,
      undoTitlePlain: "Undo (⌘Z)",
      redoTitleWithDesc: (i) => `Redo: ${i}`,
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
      waypointCount: (i) => String(i),
      addWaypoint: "+ Add waypoint",
      deleteWaypoint: "Delete waypoint",
      deleteWaypointAria: (i) => `Delete waypoint ${i + 1}`,
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
      invalidCardJson: (i) => `Invalid JSON: ${i}`,
      width: "Width %",
      height: "Height %",
      nodeHeading: (i) => `Node: ${i}`,
      flowHeading: (i) => `Flow: ${i}`,
      overlayHeading: (i) => `Overlay: ${i}`,
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
      speedCurveHint: (i, e) => `Leave blank to use domain profile defaults. Domain: ${i} (${e})`,
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
      colourDefaultSuffix: (i) => `${i} (default)`,
      reset: "Reset",
      defaultsSummary: "Defaults",
      defaultsHint: "Card-level rendering defaults. All fields are optional — omitting them keeps the built-in values shown in parentheses.",
      burstTriggerRatio: "Burst trigger ratio (0–1)",
      burstSustainMs: "Burst sustain (ms)",
      burstMaxParticles: "Burst max particles",
      multiselectCount: (i) => `${i} nodes selected`,
      suggestPathBetweenAria: "Suggest path between two selected nodes",
      suggestPathBetweenTitle: "Suggest path between selected nodes",
      suggestPathPickTwoTitle: "Select exactly 2 nodes to suggest a path",
      deleteNodesConfirm: (i) => `Delete ${i} nodes (and their flows)?`,
      deleteOverlayConfirm: (i) => `Delete overlay ${i}?`,
      deleteNodeContextConfirm: (i) => `Delete node ${i}? This also removes any flows using it.`,
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
      suggestAutoRouteFailed: (i) => `Auto-route failed: ${i}`,
      flowEntityPrompt: "Entity for this flow (e.g. sensor.grid_power):",
      flowEntityDefault: "sensor.placeholder_entity",
      suggestPreviewWaypoints: (i) => `Preview — ${i} waypoint(s)`,
      accept: "Accept",
      newNodeDefaultLabel: "New node",
      entityPickerFallbackPlaceholder: "entity.id",
      showNode: "Show node",
      hideNode: "Hide node"
    },
    stateA: {
      domainSummary: "Diagram domain",
      domain: "Domain",
      aspectRatio: "Aspect ratio",
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
      transparentMode: "Transparent background",
      transparentModeHelper: "Show transparent background instead of image"
    },
    suggestBar: { message: "Suggested path ready — accept or cancel" },
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
    nodeHandle: (i, e, t) => `Node ${i} at ${e.toFixed(1)}%, ${t.toFixed(1)}%`,
    waypointHandle: (i, e) => `Waypoint ${i + 1} of flow ${e}`,
    flowGroup: (i, e) => `${i}: ${e}`,
    overlayHandle: (i) => `Overlay ${i}`,
    readingWithTitle: (i, e) => `${i}: ${e}`
  },
  validation: {
    configMustBeObject: "config must be an object",
    mustBeObjectWithXY: "must be an object with x and y",
    mustBeFiniteNumber: "must be a finite number",
    percentRange: (i) => `must be in range 0-100, got ${i}`,
    mustBeNonEmptyString: "must be a non-empty string",
    urlMustStartWith: (i, e) => `must start with one of ${i} (got "${e}")`,
    mustBeObject: "must be an object",
    mustBeNonEmptyId: "must be a non-empty string",
    flowLabelMaxLen: "flow label must be at most 64 characters",
    duplicateNodeId: (i) => `duplicate node id "${i}"`,
    duplicateFlowId: (i) => `duplicate flow id "${i}"`,
    unknownNodeRef: (i) => `references unknown node "${i}"`,
    mustBeNonEmptyEntityId: "must be a non-empty entity id",
    waypointsMustBeArray: "must be an array (may be empty or omitted)",
    mustBeOneOf: (i) => `must be one of ${i}`,
    speedMultiplierRange: "must be between 0.1 and 5.0",
    mustBeBoolean: "must be a boolean",
    mustBeString: "must be a string",
    invalidNodeEffectType: "node_effect.type must be glow, badge, ripple, or alert",
    positiveFinite: "must be a positive finite number",
    durationMin50: "must be a finite number ≥ 50 (milliseconds)",
    durationPositive: "must be a finite number > 0 (milliseconds)",
    minLtMaxDuration: "min_duration must be < max_duration",
    unknownKey: (i) => `unknown key (allowed: ${i})`,
    defaultsMustBeObject: "must be an object",
    burstTriggerMax1: "must be ≤ 1 (it is a fraction of peak)",
    opacity01: "must be a number between 0 and 1",
    opacityRootMustBeObject: "must be an object",
    mustBeSvgPathString: "must be a string (SVG path d= attribute)",
    mustBeAtMost: (i) => `must be ≤ ${i}`,
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
    domainColorsRootMustBeObject: "must be an object",
    stringColourValue: "must be a string colour value",
    typeMustBeFlowme: (i) => `must equal "custom:flowme-card" (got "${i}")`,
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
    duplicateOverlayId: (i) => `duplicate overlay id "${i}"`,
    overlayCardMustBeObject: 'must be a HA card config object (e.g. { type: "entity", entity: "sensor.my_sensor" })',
    unsafeSchemeInCard: (i) => `unsafe URL scheme "${i}" — flowme rejects javascript:, vbscript:, data: and file: URLs in overlay card configs`,
    overlaySizeMustBeObject: "must be an object with width and height",
    overlayWidthPercent: "must be a positive number ≤ 100 (percent of card)",
    overlayHeightPercent: "must be a positive number ≤ 100 (percent of card)",
    overlayOpacity01: "must be a number between 0 and 1"
  }
}, Qi = {};
function Ze(i) {
  Qi = i;
}
function en(i) {
  const e = (i ?? "en").split("-")[0].toLowerCase();
  if (e === "en") {
    Ze({});
    return;
  }
  const t = `/local/flowme/translations/${e}.json`;
  fetch(t).then((n) => n.ok ? n.json() : null).then((n) => {
    n && typeof n == "object" && Ze(n);
  }).catch(() => {
    Ze({});
  });
}
function l(i, ...e) {
  const t = i.split(".");
  let n = Qi;
  for (const o of t) if (n && typeof n == "object") n = n[o];
  else {
    n = void 0;
    break;
  }
  if (n === void 0) {
    n = Yn;
    for (const o of t) if (n && typeof n == "object") n = n[o];
    else {
      n = void 0;
      break;
    }
  }
  return String(typeof n == "function" ? n(...e) : n ?? i);
}
var Zn = [
  "javascript:",
  "vbscript:",
  "data:",
  "file:"
];
function tn(i, e = "card_config") {
  const t = [], n = /* @__PURE__ */ new WeakSet(), o = (r, s) => {
    if (r != null) {
      if (typeof r == "string") {
        const a = r.trim().toLowerCase();
        for (const d of Zn) if (a.startsWith(d)) {
          t.push({
            path: s,
            value: r,
            scheme: d
          });
          return;
        }
        return;
      }
      if (typeof r == "object" && !n.has(r)) {
        if (n.add(r), Array.isArray(r)) {
          for (let a = 0; a < r.length; a++) o(r[a], `${s}[${a}]`);
          return;
        }
        for (const [a, d] of Object.entries(r)) o(d, `${s}.${a}`);
      }
    }
  };
  return o(i, e), t;
}
function Kn(i, e = "card_config") {
  const t = tn(i, e);
  if (t.length === 0) return;
  const n = t[0];
  throw new Error(l("security.unsafeUrlInCard", n.scheme, n.path));
}
var Jn = "[FlowMe]", Ft = !1;
function te(i) {
  Ft = i;
}
function nn(i) {
  return !!(i && typeof i == "object" && i.debug === !0);
}
function A(...i) {
  Ft && console.warn(Jn, ...i);
}
function on() {
  return Ft;
}
function B(i) {
  const e = i.label?.trim();
  return e && e.length > 0 ? e : i.id;
}
function rn(i, e = 2e3) {
  return new Promise((t) => {
    let n = 0, o = 0, r = 0;
    const s = 2;
    let a = !1;
    const d = { id: void 0 }, c = (u) => {
      a || (a = !0, d.id !== void 0 && window.clearTimeout(d.id), p.disconnect(), t(u));
    }, p = new ResizeObserver((u) => {
      const f = u[0];
      if (!f) return;
      const { width: h, height: g } = f.contentRect;
      h === n && g === o && h > 0 && g > 0 ? (r++, r >= s && c(f.contentRect)) : (r = 0, n = h, o = g);
    });
    p.observe(i), d.id = window.setTimeout(() => {
      c(i.getBoundingClientRect());
    }, e);
  });
}
function sn(i) {
  return new Promise((e) => {
    const t = new ResizeObserver((o) => {
      const r = o[0];
      if (!r) return;
      const { width: s, height: a } = r.contentRect;
      s > 0 && a > 0 && (t.disconnect(), e());
    });
    t.observe(i);
    const n = i.getBoundingClientRect();
    n.width > 0 && n.height > 0 && (t.disconnect(), e());
  });
}
function Qn(i, e, t) {
  return i < e ? e : i > t ? t : i;
}
function Yt(i, e, t) {
  return i + (e - i) * t;
}
function ke(i, e) {
  return {
    x: i.x / 100 * e.width,
    y: i.y / 100 * e.height
  };
}
function me(i, e, t) {
  if (i.length === 0) return "";
  if (i.length === 1) {
    const a = ke(i[0], e);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`;
  }
  const n = i.map((a) => ke(a, e));
  if (t === "diagonal") {
    const a = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let d = 1; d < n.length; d++) a.push(`L ${n[d].x.toFixed(2)} ${n[d].y.toFixed(2)}`);
    return a.join(" ");
  }
  if (t === "corner") {
    const a = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let d = 1; d < n.length; d++) {
      const c = n[d - 1], p = n[d];
      a.push(`L ${p.x.toFixed(2)} ${c.y.toFixed(2)}`), a.push(`L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    }
    return a.join(" ");
  }
  if (t === "curve") {
    const a = n.length, d = [
      {
        x: 2 * n[0].x - n[1].x,
        y: 2 * n[0].y - n[1].y
      },
      ...n,
      {
        x: 2 * n[a - 1].x - n[a - 2].x,
        y: 2 * n[a - 1].y - n[a - 2].y
      }
    ], c = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
    for (let p = 1; p < a; p++) {
      const u = d[p - 1], f = d[p], h = d[p + 1], g = d[p + 2], v = f.x + (h.x - u.x) / 6, y = f.y + (h.y - u.y) / 6, m = h.x - (g.x - f.x) / 6, w = h.y - (g.y - f.y) / 6;
      c.push(`C ${v.toFixed(2)} ${y.toFixed(2)} ${m.toFixed(2)} ${w.toFixed(2)} ${h.x.toFixed(2)} ${h.y.toFixed(2)}`);
    }
    return c.join(" ");
  }
  const o = 0.3, r = 20, s = [`M ${n[0].x.toFixed(2)} ${n[0].y.toFixed(2)}`];
  for (let a = 1; a < n.length; a++) {
    const d = n[a - 1], c = n[a], p = n[a + 1];
    if (!p) {
      s.push(`L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`);
      continue;
    }
    const u = Math.sqrt((c.x - d.x) ** 2 + (c.y - d.y) ** 2), f = Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2), h = Math.min(Math.min(u, f) * o, r), g = h / (u || 1), v = c.x - (c.x - d.x) * g, y = c.y - (c.y - d.y) * g, m = h / (f || 1), w = c.x + (p.x - c.x) * m, $ = c.y + (p.y - c.y) * m;
    s.push(`L ${v.toFixed(2)} ${y.toFixed(2)}`), s.push(`Q ${c.x.toFixed(2)} ${c.y.toFixed(2)} ${w.toFixed(2)} ${$.toFixed(2)}`);
  }
  return s.join(" ");
}
function be(i) {
  if (i == null) return 0;
  if (typeof i == "number") return Number.isFinite(i) ? i : 0;
  const e = i.trim();
  if (!e || e === "unavailable" || e === "unknown") return 0;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : 0;
}
function Ae(i) {
  if (i == null) return 0;
  if (typeof i == "number")
    return Number.isFinite(i) ? i === 0 ? 0 : i : 0;
  const e = Number.parseFloat(String(i).trim());
  return Number.isFinite(e) ? e === 0 ? 0 : e : 0;
}
var Zt = 1e4;
var Be = 1e-3, Mt = 2e-3;
function Pt(i, e) {
  const t = Ae(i), n = Math.min(e.minDur, e.maxDur), o = Math.max(e.minDur, e.maxDur);
  if (!(Number.isFinite(n) && Number.isFinite(o)) || o <= 0 || n <= 0) return Math.max(50, 100);
  const r = e.peak;
  if (!(r > 0) || !Number.isFinite(r)) return o;
  if (e.zeroThresholdEnabled && e.zeroThreshold !== void 0) {
    const a = Number.isFinite(e.zeroThreshold) && e.zeroThreshold > 0 && e.zeroThreshold <= 1 ? e.zeroThreshold : Mt;
    if (Math.min(1, Math.abs(t) / r) < a) return o;
  } else if (Math.abs(t) < 1e-3) return o;
  const s = o - Math.min(1, Math.abs(t) / r) * (o - n);
  return !Number.isFinite(s) || s <= 0 ? n : Math.min(Math.max(s, n), o);
}
var eo = 0.2;
function an(i, e) {
  if (!(i > 0) || !Number.isFinite(i)) return e;
  if (!Number.isFinite(e)) return Math.max(50, i);
  const t = e - i;
  if (Math.abs(t) <= 500) return e;
  const n = i * eo;
  return Math.abs(t) <= n ? e : i + Math.sign(t) * n;
}
function ln(i, e, t) {
  let n;
  if (e.zeroThresholdEnabled && e.zeroThreshold !== void 0 ? !(e.peak > 0) || !Number.isFinite(e.peak) ? n = Math.abs(i) < Be : n = Math.min(1, Math.abs(i) / e.peak) < (Number.isFinite(e.zeroThreshold) && e.zeroThreshold > 0 && e.zeroThreshold <= 1 ? e.zeroThreshold : Mt) : n = Math.abs(i) < Be, t?.flowId) {
    const o = e.peak > 0 && Number.isFinite(e.peak) ? Math.min(1, Math.abs(i) / e.peak).toFixed(6) : "(n/a)";
    A("threshold check:", t.flowId, "mode:", e.zeroThresholdEnabled ? "pct" : "epsilon", "scaledValue:", i, "peak:", e.peak, "pct:", o, "epsilon:", Be, "zeroThreshold:", e.zeroThresholdEnabled ? e.zeroThreshold : "(off)", "thresholdSource:", e.zeroThresholdSource, "stopping:", n);
  }
  return n;
}
function Ve(i, e, t) {
  const n = i.speed_curve_override ?? {}, o = t?.defaults, r = typeof i.peak_value == "number" && i.peak_value > 0 ? i.peak_value : void 0, s = typeof n.peak == "number" && n.peak > 0 ? n.peak : void 0, a = typeof o?.peak_value == "number" && o.peak_value > 0 ? o.peak_value : void 0, d = e.peak > 0 ? e.peak : 1, c = r ?? s ?? a ?? d;
  let p = i.animation?.min_duration ?? n.min_duration ?? 100, u = i.animation?.max_duration ?? n.max_duration ?? 1e4;
  (!(p > 0) || !(u > p) || u > 6e4) && (p = 100, u = Zt), u = Math.min(u, 6e4), p >= u && (p = 100, u = Zt);
  const f = i.animation?.zero_threshold, h = typeof f == "number" && Number.isFinite(f) && f > 0 && f <= 1;
  return {
    peak: c,
    minDur: p,
    maxDur: u,
    zeroThreshold: h ? f : void 0,
    zeroThresholdEnabled: h,
    zeroThresholdSource: h ? "per-flow" : "default"
  };
}
function Kt(i, e, t) {
  if (!t || !e) return {
    value: i,
    factor: 1
  };
  const n = e.trim();
  if (!n) return {
    value: i,
    factor: 1
  };
  if (Object.prototype.hasOwnProperty.call(t, n)) {
    const s = t[n] ?? 1;
    return {
      value: i * s,
      factor: s,
      matchedUnit: n
    };
  }
  const o = n.toLowerCase(), r = Object.entries(t).filter(([s]) => s.toLowerCase() === o);
  if (r.length === 1) {
    const [s, a] = r[0];
    return {
      value: i * a,
      factor: a,
      matchedUnit: s
    };
  }
  return {
    value: i,
    factor: 1
  };
}
function cn(i, e) {
  let t = null, n = null;
  const o = ((...r) => {
    n = r, t !== null && clearTimeout(t), t = setTimeout(() => {
      t = null, n && i(...n), n = null;
    }, e);
  });
  return o.cancel = () => {
    t !== null && (clearTimeout(t), t = null), n = null;
  }, o;
}
function to(i, e, t, n) {
  if (!t) return n;
  const o = e === "below_horizon";
  let r = i;
  o && !i.endsWith("-night") && (r = `${i}-night`);
  const s = t[r];
  if (s) return s;
  if (o && r !== "clear-night") {
    const a = t["clear-night"];
    if (a) return a;
  }
  if (r !== i) {
    const a = t[i];
    if (a) return a;
  }
  return n;
}
function Ke(i) {
  if (!i) return;
  const e = /^(\d+):(\d+)$/.exec(i);
  if (!e) return;
  const t = Number.parseInt(e[1], 10), n = Number.parseInt(e[2], 10);
  if (!(!t || !n))
    return t / n;
}
function Jt(i) {
  const e = i.replace("#", ""), t = e.length === 3 ? e.split("").map((o) => o + o).join("") : e, n = parseInt(t, 16);
  return [
    n >> 16 & 255,
    n >> 8 & 255,
    n & 255
  ];
}
function Qt(i, e, t) {
  const n = i / 255, o = e / 255, r = t / 255, s = Math.max(n, o, r), a = Math.min(n, o, r), d = (s + a) / 2;
  if (s === a) return [
    0,
    0,
    d
  ];
  const c = s - a, p = d > 0.5 ? c / (2 - s - a) : c / (s + a);
  let u;
  return s === n ? u = (o - r) / c + (o < r ? 6 : 0) : s === o ? u = (r - n) / c + 2 : u = (n - o) / c + 4, [
    u * 60,
    p,
    d
  ];
}
function Je(i, e, t) {
  let n = t;
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? i + (e - i) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? i + (e - i) * (2 / 3 - n) * 6 : i;
}
function io(i, e, t) {
  const n = i / 360;
  let o, r, s;
  if (e === 0) o = r = s = t;
  else {
    const d = t < 0.5 ? t * (1 + e) : t + e - t * e, c = 2 * t - d;
    o = Je(c, d, n + 1 / 3), r = Je(c, d, n), s = Je(c, d, n - 1 / 3);
  }
  const a = (d) => Math.round(d * 255).toString(16).padStart(2, "0");
  return `#${a(o)}${a(r)}${a(s)}`;
}
function dn(i, e) {
  const t = e.high_value - e.low_value, n = t === 0 ? 0 : Math.max(0, Math.min(1, (i - e.low_value) / t)), [o, r, s] = Jt(e.low_color), [a, d, c] = Jt(e.high_color), [p, u, f] = Qt(o, r, s), [h, g, v] = Qt(a, d, c);
  let y = h - p;
  return y > 180 && (y -= 360), y < -180 && (y += 360), io((p + y * n + 360) % 360, Yt(u, g, n), Yt(f, v, n));
}
function pn() {
  try {
    return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
var Nt = class extends Error {
  constructor(...i) {
    super(...i), this.name = "FlowmeConfigError";
  }
}, ei = [
  "/local/",
  "/media/",
  "/api/",
  "/hacsfiles/",
  "https://",
  "http://",
  "data:"
];
function x(i, e) {
  throw new Nt(`${i}: ${e}`);
}
function Rt(i, e) {
  (!i || typeof i != "object") && x(e, l("validation.mustBeObjectWithXY"));
  const t = i, n = t.x, o = t.y;
  (typeof n != "number" || !Number.isFinite(n)) && x(`${e}.x`, l("validation.mustBeFiniteNumber")), (typeof o != "number" || !Number.isFinite(o)) && x(`${e}.y`, l("validation.mustBeFiniteNumber"));
  const r = n, s = o;
  return (r < 0 || r > 100) && x(`${e}.x`, l("validation.percentRange", r)), (s < 0 || s > 100) && x(`${e}.y`, l("validation.percentRange", s)), {
    x: r,
    y: s
  };
}
function ti(i, e) {
  (typeof i != "string" || !i.length) && x(e, l("validation.mustBeNonEmptyString"));
  const t = i;
  return ei.some((n) => t.startsWith(n)) || x(e, l("validation.urlMustStartWith", ei.join(", "), t.slice(0, 40))), t;
}
function no(i, e, t) {
  const n = `nodes[${e}]`;
  (!i || typeof i != "object") && x(n, l("validation.mustBeObject"));
  const o = i, r = o.id;
  (typeof r != "string" || !r.length) && x(`${n}.id`, l("validation.mustBeNonEmptyId"));
  const s = r;
  t.has(s) && x(`${n}.id`, l("validation.duplicateNodeId", s)), t.add(s);
  const a = {
    id: s,
    position: Rt(o.position, `${n}.position`)
  };
  return typeof o.entity == "string" && (a.entity = o.entity), typeof o.label == "string" && (a.label = o.label), typeof o.color == "string" && (a.color = o.color), typeof o.size == "number" && (a.size = o.size), typeof o.show_label == "boolean" && o.show_label === !1 && (a.show_label = !1), typeof o.show_value == "boolean" && o.show_value === !1 && (a.show_value = !1), o.opacity !== void 0 && (a.opacity = Et(o.opacity, `${n}.opacity`)), o.visible !== void 0 && (typeof o.visible != "boolean" && x(`${n}.visible`, l("validation.mustBeBoolean")), a.visible = o.visible), o.node_effect !== void 0 && (a.node_effect = oo(o.node_effect, `${n}.node_effect`)), a;
}
function oo(i, e) {
  (!i || typeof i != "object") && x(e, l("validation.mustBeObject"));
  const t = i, n = t.type;
  if (n === "glow") return {
    type: "glow",
    ...typeof t.glow_color == "string" ? { glow_color: t.glow_color } : {},
    ...typeof t.glow_max_radius == "number" ? { glow_max_radius: t.glow_max_radius } : {},
    ...typeof t.glow_min_intensity == "number" ? { glow_min_intensity: t.glow_min_intensity } : {},
    ...typeof t.peak_value == "number" ? { peak_value: t.peak_value } : {}
  };
  if (n === "badge") return {
    type: "badge",
    ...typeof t.badge_color_on == "string" ? { badge_color_on: t.badge_color_on } : {},
    ...typeof t.badge_color_off == "string" ? { badge_color_off: t.badge_color_off } : {},
    ...t.threshold === null ? { threshold: null } : typeof t.threshold == "number" ? { threshold: t.threshold } : {}
  };
  if (n === "ripple") return {
    type: "ripple",
    ...typeof t.ripple_color == "string" ? { ripple_color: t.ripple_color } : {},
    ...typeof t.ripple_duration == "number" ? { ripple_duration: t.ripple_duration } : {},
    ...typeof t.ripple_threshold == "number" ? { ripple_threshold: t.ripple_threshold } : {}
  };
  if (n === "alert") {
    const o = t.alert_condition;
    return o !== void 0 && o !== "above" && o !== "below" && x(`${e}.alert_condition`, l("validation.mustBeString")), {
      type: "alert",
      ...typeof t.alert_threshold == "number" ? { alert_threshold: t.alert_threshold } : {},
      ...o === "above" || o === "below" ? { alert_condition: o } : {},
      ...typeof t.alert_color == "string" ? { alert_color: t.alert_color } : {},
      ...typeof t.alert_frequency == "number" ? { alert_frequency: t.alert_frequency } : {},
      ...typeof t.alert_hysteresis == "number" ? { alert_hysteresis: t.alert_hysteresis } : {}
    };
  }
  x(`${e}.type`, l("validation.invalidNodeEffectType"));
}
function ro(i, e, t, n) {
  const o = `flows[${e}]`;
  (!i || typeof i != "object") && x(o, l("validation.mustBeObject"));
  const r = i, s = r.id;
  (typeof s != "string" || !s.length) && x(`${o}.id`, l("validation.mustBeNonEmptyId"));
  const a = s;
  t.has(a) && x(`${o}.id`, l("validation.duplicateFlowId", a)), t.add(a);
  const d = r.from_node;
  (typeof d != "string" || !n.has(d)) && x(`${o}.from_node`, l("validation.unknownNodeRef", String(d)));
  const c = r.to_node;
  (typeof c != "string" || !n.has(c)) && x(`${o}.to_node`, l("validation.unknownNodeRef", String(c)));
  const p = r.entity;
  (typeof p != "string" || !p.length) && x(`${o}.entity`, l("validation.mustBeNonEmptyEntityId"));
  const u = r.waypoints;
  let f = [];
  u !== void 0 && (Array.isArray(u) || x(`${o}.waypoints`, l("validation.waypointsMustBeArray")), f = u.map((g, v) => Rt(g, `${o}.waypoints[${v}]`)));
  const h = {
    id: a,
    from_node: d,
    to_node: c,
    entity: p,
    waypoints: f
  };
  if (r.label !== void 0) {
    const g = r.label;
    typeof g != "string" && x(`${o}.label`, l("validation.mustBeString"));
    const v = g.trim();
    v.length > 64 && x(`${o}.label`, l("validation.flowLabelMaxLen")), v.length > 0 && v !== a && (h.label = v);
  }
  if (typeof r.domain == "string" && (_e.includes(r.domain) || x(`${o}.domain`, l("validation.mustBeOneOf", _e.join(", "))), h.domain = r.domain), typeof r.color == "string" && (h.color = r.color), typeof r.color_positive == "string" && (h.color_positive = r.color_positive), typeof r.color_negative == "string" && (h.color_negative = r.color_negative), typeof r.threshold == "number" && (h.threshold = r.threshold), r.peak_value !== void 0 && (h.peak_value = X(r.peak_value, `${o}.peak_value`)), typeof r.reverse == "boolean" && (h.reverse = r.reverse), typeof r.speed_multiplier == "number") {
    const g = r.speed_multiplier;
    (g < 0.1 || g > 5) && x(`${o}.speed_multiplier`, l("validation.speedMultiplierRange")), h.speed_multiplier = g;
  }
  return r.opacity !== void 0 && (h.opacity = Et(r.opacity, `${o}.opacity`)), r.visible !== void 0 && (typeof r.visible != "boolean" && x(`${o}.visible`, l("validation.mustBeBoolean")), h.visible = r.visible), r.line_style !== void 0 && (dt.includes(r.line_style) || x(`${o}.line_style`, l("validation.mustBeOneOf", dt.join(", "))), h.line_style = r.line_style), r.speed_curve_override !== void 0 && (h.speed_curve_override = so(r.speed_curve_override, `${o}.speed_curve_override`)), r.animation !== void 0 && (h.animation = co(r.animation, `${o}.animation`)), r.value_gradient !== void 0 && (h.value_gradient = po(r.value_gradient, `${o}.value_gradient`)), h;
}
function so(i, e) {
  (!i || typeof i != "object" || Array.isArray(i)) && x(e, l("validation.mustBeObject"));
  const t = i, n = {};
  function o(f) {
    const h = t[f];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && x(`${e}.${f}`, l("validation.positiveFinite")), h;
  }
  function r(f) {
    const h = t[f];
    if (h !== void 0)
      return (typeof h != "number" || !Number.isFinite(h) || h <= 0) && x(`${e}.${f}`, l("validation.durationPositive")), h;
  }
  const s = o("threshold");
  s !== void 0 && (n.threshold = s);
  const a = o("p50");
  a !== void 0 && (n.p50 = a);
  const d = o("peak");
  d !== void 0 && (n.peak = d);
  const c = r("max_duration");
  c !== void 0 && (n.max_duration = c);
  const p = r("min_duration");
  if (p !== void 0 && (n.min_duration = p), t.steepness !== void 0) {
    const f = t.steepness;
    (typeof f != "number" || !Number.isFinite(f) || f <= 0) && x(`${e}.steepness`, l("validation.positiveFinite")), n.steepness = f;
  }
  n.max_duration !== void 0 && n.min_duration !== void 0 && n.min_duration >= n.max_duration && x(e, l("validation.minLtMaxDuration"));
  const u = /* @__PURE__ */ new Set([
    "threshold",
    "p50",
    "peak",
    "max_duration",
    "min_duration",
    "steepness"
  ]);
  for (const f of Object.keys(t)) u.has(f) || x(`${e}.${f}`, l("validation.unknownKey", [...u].join(", ")));
  return n;
}
function X(i, e) {
  return (typeof i != "number" || !Number.isFinite(i) || i <= 0) && x(e, l("validation.positiveFinite")), i;
}
function ao(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && x("defaults", l("validation.defaultsMustBeObject"));
  const e = i, t = {};
  if (e.node_radius !== void 0 && (t.node_radius = X(e.node_radius, "defaults.node_radius")), e.burst_trigger_ratio !== void 0) {
    const n = X(e.burst_trigger_ratio, "defaults.burst_trigger_ratio");
    n > 1 && x("defaults.burst_trigger_ratio", l("validation.burstTriggerMax1")), t.burst_trigger_ratio = n;
  }
  return e.burst_sustain_ms !== void 0 && (t.burst_sustain_ms = X(e.burst_sustain_ms, "defaults.burst_sustain_ms")), e.burst_max_particles !== void 0 && (t.burst_max_particles = X(e.burst_max_particles, "defaults.burst_max_particles")), e.dot_radius !== void 0 && (t.dot_radius = X(e.dot_radius, "defaults.dot_radius")), e.line_width !== void 0 && (t.line_width = X(e.line_width, "defaults.line_width")), e.peak_value !== void 0 && (t.peak_value = X(e.peak_value, "defaults.peak_value")), t;
}
function Et(i, e) {
  return (typeof i != "number" || !Number.isFinite(i) || i < 0 || i > 1) && x(e, l("validation.opacity01")), i;
}
function lo(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && x("opacity", l("validation.mustBeObject"));
  const e = i, t = {};
  for (const n of [
    "background",
    "darken",
    "nodes",
    "flows",
    "dots",
    "glow",
    "labels",
    "values",
    "overlays"
  ]) e[n] !== void 0 && (t[n] = Et(e[n], `opacity.${n}`));
  return t;
}
function co(i, e) {
  (!i || typeof i != "object" || Array.isArray(i)) && x(e, l("validation.mustBeObject"));
  const t = i, n = {};
  if (t.animation_style !== void 0) {
    const m = t.animation_style;
    pt.includes(m) || x(`${e}.animation_style`, l("validation.mustBeOneOf", pt.join(", "))), n.animation_style = m;
  }
  t.particle_shape !== void 0 && (ut.includes(t.particle_shape) || x(`${e}.particle_shape`, l("validation.mustBeOneOf", ut.join(", "))), n.particle_shape = t.particle_shape), t.direction !== void 0 && (ht.includes(t.direction) || x(`${e}.direction`, l("validation.mustBeOneOf", ht.join(", "))), n.direction = t.direction), t.particle_spacing !== void 0 && (ft.includes(t.particle_spacing) || x(`${e}.particle_spacing`, l("validation.mustBeOneOf", ft.join(", "))), n.particle_spacing = t.particle_spacing), t.custom_svg_path !== void 0 && (typeof t.custom_svg_path != "string" && x(`${e}.custom_svg_path`, l("validation.mustBeSvgPathString")), t.custom_svg_path.length === 0 && A(`${e}.custom_svg_path is empty — will fall back to circle`), n.custom_svg_path = t.custom_svg_path);
  const o = (m, w) => {
    const $ = t[m];
    if ($ !== void 0)
      return (typeof $ != "number" || !Number.isFinite($) || $ <= 0) && x(`${e}.${m}`, l("validation.positiveFinite")), w !== void 0 && $ > w && x(`${e}.${m}`, l("validation.mustBeAtMost", w)), $;
  }, r = (m) => {
    const w = t[m];
    if (w !== void 0)
      return typeof w != "boolean" && x(`${e}.${m}`, l("validation.mustBeBoolean")), w;
  }, s = o("particle_size");
  if (s !== void 0 && (n.particle_size = s), t.particle_count !== void 0) {
    const m = t.particle_count;
    (typeof m != "number" || !Number.isFinite(m) || m < 1 || !Number.isInteger(m)) && x(`${e}.particle_count`, l("validation.particleCountInt")), n.particle_count = m;
  }
  if (t.glow_intensity !== void 0) {
    const m = t.glow_intensity;
    (typeof m != "number" || !Number.isFinite(m) || m < 0) && x(`${e}.glow_intensity`, l("validation.glowNonNegative")), n.glow_intensity = m;
  }
  const a = r("shimmer");
  a !== void 0 && (n.shimmer = a);
  const d = r("flicker");
  d !== void 0 && (n.flicker = d);
  const c = o("trail_length");
  if (c !== void 0 && (n.trail_length = c), t.dash_gap !== void 0) {
    const m = t.dash_gap;
    (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 10) && x(`${e}.dash_gap`, l("validation.dashGapRange")), n.dash_gap = m;
  }
  const p = o("cluster_size");
  p !== void 0 && (n.cluster_size = Math.max(1, Math.round(p)));
  const u = o("cluster_gap");
  u !== void 0 && (n.cluster_gap = u);
  const f = o("pulse_frequency", 20);
  if (f !== void 0 && (n.pulse_frequency = f), t.pulse_ratio !== void 0) {
    const m = t.pulse_ratio;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0 || m >= 1) && x(`${e}.pulse_ratio`, l("validation.pulseRatioRange")), n.pulse_ratio = m;
  }
  const h = o("wave_frequency", 20);
  h !== void 0 && (n.wave_frequency = h);
  const g = o("wave_amplitude");
  g !== void 0 && (n.wave_amplitude = g);
  let v, y;
  if (t.min_duration !== void 0) {
    const m = t.min_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && x(`${e}.min_duration`, l("validation.durationPositive")), m > 6e4 && x(`${e}.min_duration`, l("validation.mustBeAtMost", 6e4)), v = m, n.min_duration = v;
  }
  if (t.max_duration !== void 0) {
    const m = t.max_duration;
    (typeof m != "number" || !Number.isFinite(m) || m <= 0) && x(`${e}.max_duration`, l("validation.durationPositive")), m > 6e4 && x(`${e}.max_duration`, l("validation.mustBeAtMost", 6e4)), y = m, n.max_duration = y;
  }
  if (v !== void 0 && y !== void 0 && v >= y && (A(`${e}: min_duration >= max_duration — dropping both`), delete n.min_duration, delete n.max_duration), t.zero_threshold !== void 0) {
    const m = t.zero_threshold;
    typeof m == "number" && Number.isFinite(m) && m > 0 && m <= 1 ? n.zero_threshold = m : A(`${e}.zero_threshold invalid — using default`, Mt);
  }
  return n;
}
function ii(i, e) {
  return (typeof i != "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(i)) && x(e, l("validation.mustBeHexColor")), i;
}
function po(i, e) {
  (!i || typeof i != "object" || Array.isArray(i)) && x(e, l("validation.mustBeObject"));
  const t = i;
  typeof t.entity != "string" && x(`${e}.entity`, l("validation.mustBeStringEntityId")), (typeof t.low_value != "number" || !Number.isFinite(t.low_value)) && x(`${e}.low_value`, l("validation.finiteNumber")), (typeof t.high_value != "number" || !Number.isFinite(t.high_value)) && x(`${e}.high_value`, l("validation.finiteNumber")), t.low_value >= t.high_value && A(`${e}: low_value should be less than high_value`);
  const n = {
    entity: t.entity,
    low_value: t.low_value,
    high_value: t.high_value,
    low_color: ii(t.low_color, `${e}.low_color`),
    high_color: ii(t.high_color, `${e}.high_color`)
  };
  return t.mode !== void 0 && ([
    "flow",
    "line",
    "both"
  ].includes(t.mode) || x(`${e}.mode`, l("validation.gradientMode")), n.mode = t.mode), n;
}
function uo(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && x("animation", l("validation.animationRootMustBeObject"));
  const e = i, t = {};
  if (e.fps !== void 0) {
    const n = e.fps;
    (typeof n != "number" || !Number.isFinite(n) || n < 1 || n > 120) && x("animation.fps", l("validation.fpsRange")), t.fps = n;
  }
  return e.smooth_speed !== void 0 && (typeof e.smooth_speed != "boolean" && x("animation.smooth_speed", l("validation.mustBeBoolean")), t.smooth_speed = e.smooth_speed), t;
}
function ho(i) {
  (!i || typeof i != "object" || Array.isArray(i)) && x("domain_colors", l("validation.domainColorsRootMustBeObject"));
  const e = i, t = {};
  for (const n of [
    "solar",
    "grid",
    "battery",
    "load"
  ]) e[n] !== void 0 && (typeof e[n] != "string" && x(`domain_colors.${n}`, l("validation.stringColourValue")), t[n] = e[n]);
  return t;
}
function ve(i) {
  if (!i || typeof i != "object") throw new Nt(l("validation.configMustBeObject"));
  const e = i;
  e.type !== "custom:flowme-card" && x("type", l("validation.typeMustBeFlowme", String(e.type)));
  const t = e.domain, n = typeof t == "string" ? Ji(t) : "energy", o = e.background;
  o !== void 0 && (o === null || typeof o != "object") && x("background", l("validation.backgroundWhenProvided"));
  const r = o ?? {}, s = { default: r.default === void 0 || r.default === "" ? "" : ti(r.default, "background.default") };
  if (r.weather_entity !== void 0 && (typeof r.weather_entity != "string" && x("background.weather_entity", l("validation.mustBeStringEntityId")), s.weather_entity = r.weather_entity), r.weather_states !== void 0) {
    (!r.weather_states || typeof r.weather_states != "object") && x("background.weather_states", l("validation.weatherStatesMapping"));
    const h = Object.entries(r.weather_states), g = {};
    for (const [v, y] of h) {
      if (y === "" || y === void 0) {
        g[v] = "";
        continue;
      }
      typeof y != "string" && x(`background.weather_states.${v}`, l("validation.mustBeString")), g[v] = ti(y, `background.weather_states.${v}`);
    }
    s.weather_states = g;
  }
  r.sun_entity !== void 0 && (typeof r.sun_entity != "string" && x("background.sun_entity", l("validation.sunEntityExample")), s.sun_entity = r.sun_entity), r.transition_duration !== void 0 && (typeof r.transition_duration != "number" && x("background.transition_duration", l("validation.transitionMustBeNumberMs")), s.transition_duration = r.transition_duration), r.transparent !== void 0 && (typeof r.transparent != "boolean" && x("background.transparent", l("validation.mustBeBoolean")), r.transparent && (s.transparent = !0));
  const a = e.nodes;
  Array.isArray(a) || x("nodes", l("validation.nodesMustBeArray"));
  const d = /* @__PURE__ */ new Set(), c = a.map((h, g) => no(h, g, d));
  c.length === 0 && x("nodes", l("validation.atLeastOneNode"));
  const p = e.flows;
  Array.isArray(p) || x("flows", l("validation.flowsMustBeArray"));
  const u = /* @__PURE__ */ new Set(), f = {
    type: "custom:flowme-card",
    domain: n,
    background: s,
    nodes: c,
    flows: p.map((h, g) => ro(h, g, u, d))
  };
  if (e.aspect_ratio !== void 0 && ((typeof e.aspect_ratio != "string" || !/^\d+:\d+$/.test(e.aspect_ratio)) && x("aspect_ratio", l("validation.aspectRatioRegex")), f.aspect_ratio = e.aspect_ratio), e.fullscreen !== void 0 && (typeof e.fullscreen != "boolean" && x("fullscreen", l("validation.mustBeBoolean")), f.fullscreen = e.fullscreen), e.edit_mode_password !== void 0 && (typeof e.edit_mode_password != "string" && x("edit_mode_password", l("validation.editPasswordMustBeString")), f.edit_mode_password = e.edit_mode_password), e.pause_when_hidden !== void 0 && (typeof e.pause_when_hidden != "boolean" && x("pause_when_hidden", l("validation.mustBeBoolean")), f.pause_when_hidden = e.pause_when_hidden), e.overlays !== void 0) {
    Array.isArray(e.overlays) || x("overlays", l("validation.overlaysMustBeArray"));
    const h = /* @__PURE__ */ new Set();
    f.overlays = e.overlays.map((g, v) => fo(g, v, h));
  }
  return e.defaults !== void 0 && (f.defaults = ao(e.defaults)), e.domain_colors !== void 0 && (f.domain_colors = ho(e.domain_colors)), e.debug !== void 0 && (typeof e.debug != "boolean" && x("debug", l("validation.mustBeBoolean")), f.debug = e.debug), e.opacity !== void 0 && (f.opacity = lo(e.opacity)), e.animation !== void 0 && (f.animation = uo(e.animation)), f;
}
function fo(i, e, t) {
  const n = `overlays[${e}]`;
  (!i || typeof i != "object") && x(n, l("validation.mustBeObject"));
  const o = i;
  o.type !== "custom" && x(`${n}.type`, l("validation.overlayTypeMustBeCustom"));
  const r = o.id;
  (typeof r != "string" || !r.length) && x(`${n}.id`, l("validation.mustBeNonEmptyId")), t.has(r) && x(`${n}.id`, l("validation.duplicateOverlayId", r)), t.add(r);
  const s = Rt(o.position, `${n}.position`), a = o.card;
  (!a || typeof a != "object" || Array.isArray(a)) && x(`${n}.card`, l("validation.overlayCardMustBeObject"));
  const d = tn(a, `${n}.card`);
  if (d.length) {
    const p = d[0];
    x(p.path, l("validation.unsafeSchemeInCard", p.scheme));
  }
  const c = {
    id: r,
    type: "custom",
    position: s,
    card: a
  };
  if (o.size !== void 0) {
    const p = o.size;
    (!p || typeof p != "object") && x(`${n}.size`, l("validation.overlaySizeMustBeObject"));
    const u = p, f = u.width, h = u.height;
    (typeof f != "number" || !Number.isFinite(f) || f <= 0 || f > 100) && x(`${n}.size.width`, l("validation.overlayWidthPercent")), (typeof h != "number" || !Number.isFinite(h) || h <= 0 || h > 100) && x(`${n}.size.height`, l("validation.overlayHeightPercent")), c.size = {
      width: f,
      height: h
    };
  }
  if (o.visible !== void 0 && (typeof o.visible != "boolean" && x(`${n}.visible`, l("validation.mustBeBoolean")), c.visible = o.visible), o.opacity !== void 0) {
    const p = o.opacity;
    (typeof p != "number" || !Number.isFinite(p) || p < 0 || p > 1) && x(`${n}.opacity`, l("validation.overlayOpacity01")), c.opacity = p;
  }
  return c;
}
var Ge = {
  energy: { roles: [
    {
      key: "solar",
      label: "Solar",
      patterns: ["solar", "pv"],
      default: "#FFD700"
    },
    {
      key: "grid",
      label: "Grid",
      patterns: ["grid"],
      default: "#1EB4FF"
    },
    {
      key: "battery",
      label: "Battery",
      patterns: ["battery", "bat"],
      default: "#32DC50"
    },
    {
      key: "load",
      label: "Load",
      patterns: ["load"],
      default: "#FF8C1E"
    }
  ] },
  water: { roles: [
    {
      key: "supply",
      label: "Supply",
      patterns: [
        "supply",
        "inlet",
        "cold",
        "mains"
      ],
      default: "#60CFFF"
    },
    {
      key: "drain",
      label: "Drain",
      patterns: [
        "drain",
        "out",
        "outlet",
        "waste"
      ],
      default: "#0077AA"
    },
    {
      key: "storage",
      label: "Storage",
      patterns: [
        "tank",
        "storage",
        "hot"
      ],
      default: "#004488"
    },
    {
      key: "transfer",
      label: "Transfer",
      patterns: [
        "pipe",
        "transfer",
        "circulation"
      ],
      default: "#88DDFF"
    }
  ] },
  network: { roles: [
    {
      key: "upload",
      label: "Upload",
      patterns: [
        "up",
        "upload",
        "tx",
        "send"
      ],
      default: "#32DC50"
    },
    {
      key: "download",
      label: "Download",
      patterns: [
        "down",
        "download",
        "rx",
        "receive"
      ],
      default: "#1EB4FF"
    },
    {
      key: "local",
      label: "Local",
      patterns: [
        "local",
        "lan",
        "internal"
      ],
      default: "#FFD700"
    },
    {
      key: "external",
      label: "External",
      patterns: [
        "ext",
        "external",
        "wan",
        "internet"
      ],
      default: "#FF8C1E"
    }
  ] },
  hvac: { roles: [
    {
      key: "supply",
      label: "Supply air",
      patterns: [
        "supply",
        "hot",
        "heat",
        "warm"
      ],
      default: "#FF4500"
    },
    {
      key: "return",
      label: "Return air",
      patterns: [
        "return",
        "cold",
        "cool",
        "extract"
      ],
      default: "#1EB4FF"
    },
    {
      key: "fresh",
      label: "Fresh air",
      patterns: [
        "fresh",
        "intake",
        "outside"
      ],
      default: "#32DC50"
    },
    {
      key: "exhaust",
      label: "Exhaust",
      patterns: [
        "exhaust",
        "vent",
        "outlet"
      ],
      default: "#AAAAAA"
    }
  ] },
  gas: { roles: [
    {
      key: "inlet",
      label: "Inlet",
      patterns: [
        "in",
        "inlet",
        "supply",
        "import"
      ],
      default: "#FFD700"
    },
    {
      key: "outlet",
      label: "Outlet",
      patterns: [
        "out",
        "outlet",
        "exhaust"
      ],
      default: "#FF8C1E"
    },
    {
      key: "bypass",
      label: "Bypass",
      patterns: ["bypass", "divert"],
      default: "#AAAAAA"
    },
    {
      key: "vent",
      label: "Vent",
      patterns: ["vent", "release"],
      default: "#888888"
    }
  ] },
  generic: { roles: [
    {
      key: "flow1",
      label: "Flow 1",
      patterns: [],
      default: "#FFD700"
    },
    {
      key: "flow2",
      label: "Flow 2",
      patterns: [],
      default: "#1EB4FF"
    },
    {
      key: "flow3",
      label: "Flow 3",
      patterns: [],
      default: "#32DC50"
    },
    {
      key: "flow4",
      label: "Flow 4",
      patterns: [],
      default: "#FF8C1E"
    }
  ] }
};
function go(i) {
  const e = i.toLowerCase();
  if (/(?:^|[^a-z])(solar|pv)(?:[^a-z]|$)/.test(e)) return "solar";
  if (/(?:^|[^a-z])grid(?:[^a-z]|$)/.test(e)) return "grid";
  if (/(?:^|[^a-z])(battery|batt)(?:[^a-z]|$)/.test(e)) return "battery";
  if (/(?:^|[^a-z])(load|consumption|consume|house)(?:[^a-z]|$)/.test(e)) return "load";
}
function ni(i, e) {
  const t = i.toLowerCase();
  for (const n of e.roles) for (const o of n.patterns) if (o && t.includes(o)) return n.key;
}
function oi(i, e) {
  const t = i.roles[0];
  if (!t) return "#FFFFFF";
  const n = e?.[t.key];
  return ((typeof n == "string" && n.trim() !== "" ? n.trim() : void 0) ?? t.default) || "#FFFFFF";
}
function ri(i, e) {
  const t = e?.[i.key];
  return ((typeof t == "string" && t.trim() !== "" ? t.trim() : void 0) ?? i.default) || "#FFFFFF";
}
function mo(i, e, t, n) {
  if (i === void 0) {
    A("colour resolution:", e, "domain:", "undefined", "matched role:", "none", "resolved:", void 0);
    return;
  }
  const o = i, r = Ge[o] ?? Ge.generic;
  let s;
  if (o === "energy") {
    if (s = go(e), !s) {
      A("colour resolution:", e, "domain:", o, "matched role:", "none", "resolved:", void 0);
      return;
    }
  } else if (o === "generic") {
    if (s = ni(e, r), !s) {
      const c = Math.abs(n ?? 0) % r.roles.length, p = r.roles[c], u = ri(p, t);
      return A("colour resolution:", e, "domain:", o, "matched role:", "none (by index)", "resolved:", u), u;
    }
  } else if (s = ni(e, r), !s) {
    const c = oi(r, t);
    return A("colour resolution:", e, "domain:", o, "matched role:", "first", "resolved:", c), c;
  }
  const a = r.roles.find((c) => c.key === s);
  if (!a) return oi(r, t);
  const d = ri(a, t);
  return A("colour resolution:", e, "domain:", o, "matched role:", s, "resolved:", d), d;
}
var bo = {
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
  describe(i) {
    return Math.abs(i) >= 1e3 ? `${(i / 1e3).toFixed(2)} kW` : `${Math.round(i)} W`;
  }
}, vo = {
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
  describe(i) {
    return `${i.toFixed(1)} L/min`;
  }
}, yo = {
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
  particle_count_curve: (i) => {
    const e = Math.abs(i);
    return e < 0.1 ? 1 : e < 1 ? 2 : e < 5 ? 3 : e < 20 ? 4 : e < 100 ? 5 : 6;
  },
  describe(i) {
    const e = Math.abs(i);
    return e >= 1e3 ? `${(i / 1e3).toFixed(2)} Gbps` : e >= 1 ? `${i.toFixed(1)} Mbps` : `${(i * 1e3).toFixed(0)} Kbps`;
  }
}, wo = {
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
  wave_amplitude_curve(i) {
    return Qn(2 + Math.abs(i) / 60, 2, 10);
  },
  describe(i) {
    return `${Math.round(i)} m³/h`;
  }
}, xo = {
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
  describe(i) {
    return `${i.toFixed(2)} m³/h`;
  }
}, un = {
  domain: "generic",
  default_color_positive: "#A78BFA",
  default_color_negative: "#34D399",
  shape: "dot",
  glow: !1,
  unit_label: "",
  peak: 100,
  burst_density_multiplier: 1.5,
  describe(i) {
    return Math.abs(i) >= 100 ? i.toFixed(0) : Math.abs(i) >= 10 ? i.toFixed(1) : i.toFixed(2);
  }
}, si = {
  energy: bo,
  water: vo,
  network: yo,
  hvac: wo,
  gas: xo,
  generic: un
};
function H(i) {
  return i && i in si ? si[i] : un;
}
var hn = "#CCCCCC", $o = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
function gt(i) {
  return typeof i == "string" && $o.test(i.trim()) ? i.trim() : "#FFFFFF";
}
function Qe(i) {
  return typeof i == "string" && i.trim() !== "" ? i.trim() : void 0;
}
function pe(i, e, t, n, o, r) {
  const s = Qe(i.color), a = mo(t, i.id, o, r), d = s ?? a;
  let c;
  return n >= 0 ? c = Qe(i.color_positive) ?? d ?? e.default_color_positive : c = Qe(i.color_negative) ?? d ?? e.default_color_negative, gt(c);
}
function ai() {
  return {
    currentDurMs: /* @__PURE__ */ new Map(),
    interpFromMs: /* @__PURE__ */ new Map(),
    interpTargetMs: /* @__PURE__ */ new Map(),
    interpStartMs: /* @__PURE__ */ new Map()
  };
}
function li(i, e) {
  e.interpFromMs.delete(i), e.interpTargetMs.delete(i), e.interpStartMs.delete(i);
}
var _o = "[FlowMe Renderer]";
function se(...i) {
  A(_o, ...i);
}
var N = "http://www.w3.org/2000/svg", O = "http://www.w3.org/1999/xlink";
function ko() {
  try {
    return new URLSearchParams(window.location.search).get("flowme_debug") === "1";
  } catch {
    return !1;
  }
}
var Ao = ko(), So = 2e3, Pe = 3, ci = 5, et = 2, Co = 0.9, Fo = 5e3, Ne = 20, Mo = 0.2, Re = 0.3;
function Po(i) {
  const e = (t) => t.toFixed(4);
  return [
    `M ${e(15 * i)} 0`,
    `L ${e(10 * i)} ${e(-10 * i)}`,
    `L ${e(0)} ${e(-10 * i)}`,
    `L ${e(5 * i)} 0`,
    `L ${e(0)} ${e(10 * i)}`,
    `L ${e(10 * i)} ${e(10 * i)}`,
    "Z"
  ].join(" ");
}
function No(i) {
  return [
    `M 0,${-i * 2.2}`,
    `C ${i * 1.1},${-i * 1.2} ${i * 1.3},${-i * 0.2} ${i * 1.3},${i * 0.5}`,
    `C ${i * 1.3},${i * 1.4} ${i * 0.7},${i * 2} 0,${i * 2}`,
    `C ${-i * 0.7},${i * 2} ${-i * 1.3},${i * 1.4} ${-i * 1.3},${i * 0.5}`,
    `C ${-i * 1.3},${-i * 0.2} ${-i * 1.1},${-i * 1.2} 0,${-i * 2.2}`,
    "Z"
  ].join(" ");
}
var Ro = [
  8,
  16,
  24,
  32
], Eo = [
  0.9,
  0.75,
  0.6,
  0.4
], To = [
  0.8,
  0.55,
  0.35,
  0.15
], De = class {
  constructor() {
    this.container = null, this.svg = null, this.config = null, this.resizeObserver = null, this.flowNodes = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = cn(() => this.flushUpdates(), 200), this.burstEnteredAt = /* @__PURE__ */ new Map(), this.burstActive = /* @__PURE__ */ new Set(), this.durInterp = ai(), this.lastDirection = /* @__PURE__ */ new Map(), this.dirChanging = /* @__PURE__ */ new Map(), this.rafHandle = null, this.lastFrameTime = 0, this.adaptiveCount = /* @__PURE__ */ new Map(), this.lastAdaptivePassAt = 0, this.frameTimeSamples = [], this.lastFrameForAdaptive = 0, this.particleOffsets = /* @__PURE__ */ new Map(), this.gradientColors = /* @__PURE__ */ new Map(), this.randomOffsets = /* @__PURE__ */ new Map(), this.randomOffsetsLastUpdate = /* @__PURE__ */ new Map(), this.lateralPhase = /* @__PURE__ */ new Map(), this.prefersReducedMotionFlag = !1, this._currentDuration = /* @__PURE__ */ new Map(), this.flowPathSyncedDirection = /* @__PURE__ */ new Map();
  }
  async init(i, e) {
    this.svg && this.destroy(), se("init:", i.getBoundingClientRect(), "flows:", e.flows.length), se("init start dims:", i.offsetWidth, i.offsetHeight), this.container = i, this.config = e, this.prefersReducedMotionFlag = pn(), this.flowsById = new Map(e.flows.map((o) => [o.id, o]));
    const t = document.createElementNS(N, "svg");
    t.setAttribute("width", "100%"), t.setAttribute("height", "100%"), t.setAttribute("preserveAspectRatio", "none"), t.style.position = "absolute", t.style.inset = "0", t.style.pointerEvents = "none", t.style.overflow = "visible", this.svg = t, i.appendChild(t), this.buildSkeleton(), this.resizeObserver = new ResizeObserver(() => this.onResize()), this.resizeObserver.observe(i), this.startFpsLoop();
    const n = await rn(i);
    (n.width === 0 || n.height === 0) && await sn(i), se("stable dims:", i.offsetWidth, i.offsetHeight), this.onResize(), se("post-resize dims:", i.offsetWidth, i.offsetHeight);
  }
  applyConfig(i) {
    if (this.svg) {
      this.config = i, this.flowsById = new Map(i.flows.map((e) => [e.id, e])), this.onResize();
      for (const e of i.flows) {
        const t = this.latestValues.get(e.id) ?? 0;
        this.applyFlow(e.id, t);
      }
    }
  }
  updateFlow(i, e) {
    this.flowsById.has(i) && (this.latestValues.set(i, Ae(e)), this.applyUpdate());
  }
  setGradientColor(i, e) {
    e ? this.gradientColors.set(i, e) : this.gradientColors.delete(i), this.applyUpdate();
  }
  startFpsLoop() {
    this.rafHandle !== null && (cancelAnimationFrame(this.rafHandle), this.rafHandle = null);
    const i = 1e3 / (this.config?.animation?.fps ?? 60), e = (t) => {
      if (!this.svg) return;
      const n = t - this.lastFrameTime;
      if (this.sampleFrameTime(), this.runAdaptivePassIfDue(t), n >= i) {
        this.lastFrameTime = t - n % i;
        const o = this.config?.animation?.smooth_speed !== !1, r = this.durInterp.interpStartMs.size > 0;
        o && (r || this.dirChanging.size > 0) && this.flushUpdates(), this.updateLateralWaves(t), this.updateTimeBasedSpacing(t);
      }
      this.rafHandle = requestAnimationFrame(e);
    };
    this.lastFrameTime = performance.now(), this.rafHandle = requestAnimationFrame(e);
  }
  pause() {
    if (!this.svg) return;
    const i = this.svg;
    if (typeof i.pauseAnimations == "function") i.pauseAnimations();
    else for (const e of this.svg.querySelectorAll("animateMotion, animate, animateTransform")) {
      const t = e;
      typeof t.pauseAnimations == "function" && t.pauseAnimations();
    }
    this.rafHandle !== null && (cancelAnimationFrame(this.rafHandle), this.rafHandle = null);
  }
  resume() {
    if (!this.svg) return;
    const i = this.svg;
    if (typeof i.unpauseAnimations == "function") i.unpauseAnimations();
    else for (const e of this.svg.querySelectorAll("animateMotion, animate, animateTransform")) {
      const t = e;
      typeof t.unpauseAnimations == "function" && t.unpauseAnimations();
    }
    this.rafHandle === null && this.startFpsLoop();
  }
  destroy() {
    this.applyUpdate.cancel(), this.rafHandle !== null && cancelAnimationFrame(this.rafHandle), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.svg?.remove(), this.svg = null, this.container = null, this.config = null, this.flowNodes.clear(), this.flowsById.clear(), this.latestValues.clear(), this.burstEnteredAt.clear(), this.burstActive.clear(), this.durInterp = ai(), this.lastDirection.clear(), this.dirChanging.clear(), this.adaptiveCount.clear(), this.frameTimeSamples.length = 0, this.lastAdaptivePassAt = 0, this.particleOffsets.clear(), this.gradientColors.clear(), this.randomOffsets.clear(), this.randomOffsetsLastUpdate.clear(), this.lateralPhase.clear(), this.flowPathSyncedDirection.clear(), this._currentDuration.clear();
  }
  containerSize() {
    if (!this.container) return {
      width: 0,
      height: 0
    };
    const i = this.container.getBoundingClientRect();
    return {
      width: Math.max(1, i.width),
      height: Math.max(1, i.height)
    };
  }
  computeIntendedTravelSign(i, e) {
    const t = i.animation?.direction ?? "auto";
    return t === "both" || t === "forward" ? 1 : t === "reverse" ? -1 : e >= 0 ? 1 : -1;
  }
  ensurePathRev(i) {
    if (i.pathRev || !this.svg) return;
    const e = this.svg.querySelector("defs");
    if (!e) return;
    const t = document.createElementNS(N, "path");
    t.setAttribute("id", `${i.pathId}-rev`), t.setAttribute("fill", "none"), e.appendChild(t), i.pathRev = t, i.pathRevId = `${i.pathId}-rev`;
  }
  syncFlowPathGeometry(i, e, t) {
    if (!this.config) return;
    const n = this.containerSize(), o = new Map(this.config.nodes.map((p) => [p.id, p])), r = o.get(i.from_node), s = o.get(i.to_node);
    if (!r || !s) return;
    const a = [
      r.position,
      ...i.waypoints,
      s.position
    ], d = [
      s.position,
      ...i.waypoints.slice().reverse(),
      r.position
    ], c = i.line_style ?? "corner";
    if ((i.animation?.direction ?? "auto") === "both") {
      this.ensurePathRev(e);
      const p = me(a, n, c), u = me(d, n, c);
      e.path.setAttribute("d", p), e.pathRev && e.pathRev.setAttribute("d", u);
    } else {
      e.pathRev && (e.pathRev.remove(), e.pathRev = void 0, e.pathRevId = void 0);
      const p = t >= 0 ? a : d;
      e.path.setAttribute("d", me(p, n, c));
    }
    this.flowPathSyncedDirection.set(i.id, t);
  }
  motionPathRef(i, e, t) {
    return (e.animation?.direction ?? "auto") === "both" ? t >= 0 ? i.pathId : i.pathRevId ?? i.pathId : i.pathId;
  }
  animStyle(i) {
    return this.prefersReducedMotionFlag ? "none" : i.animation?.animation_style ?? "dots";
  }
  setFlowAriaLabel(i, e) {
    const t = this.flowNodes.get(i);
    t?.group && (t.group.setAttribute("role", "img"), t.group.setAttribute("aria-label", e));
  }
  buildSkeleton() {
    if (!this.svg || !this.config) return;
    const i = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${i.width} ${i.height}`);
    const e = document.createElementNS(N, "defs");
    this.svg.appendChild(e);
    const t = new Map(this.config.nodes.map((n) => [n.id, n]));
    for (const n of this.config.flows) {
      const o = t.get(n.from_node), r = t.get(n.to_node);
      if (!o || !r) continue;
      const s = [
        o.position,
        ...n.waypoints,
        r.position
      ], a = `flowme-path-${n.id}`, d = document.createElementNS(N, "path");
      d.setAttribute("id", a), d.setAttribute("d", me(s, i, n.line_style ?? "corner")), d.setAttribute("fill", "none"), e.appendChild(d);
      const c = document.createElementNS(N, "g");
      c.classList.add("flowme-flow-group"), c.setAttribute("data-flow-id", n.id), n.opacity !== void 0 && c.setAttribute("opacity", String(n.opacity)), n.visible === !1 && (c.style.display = "none");
      const p = this.config?.defaults?.line_width ?? et, u = document.createElementNS(N, "use");
      u.classList.add("flow-line"), u.setAttributeNS(O, "href", `#${a}`), u.setAttribute("href", `#${a}`), u.setAttribute("stroke", this.primaryColor(n)), u.setAttribute("stroke-opacity", "0.2"), u.setAttribute("stroke-width", String(p)), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("fill", "none"), c.appendChild(u);
      const f = {
        group: c,
        path: d,
        pathId: a,
        outline: u,
        style: this.animStyle(n),
        particles: []
      };
      this.svg.appendChild(c), this.flowNodes.set(n.id, f), se("skeleton:", n.id, "| style=", f.style, "| line_style=", n.line_style ?? "corner (default)");
    }
  }
  onResize() {
    if (!this.svg || !this.config) return;
    const i = this.containerSize();
    this.svg.setAttribute("viewBox", `0 0 ${i.width} ${i.height}`);
    const e = new Map(this.config.nodes.map((t) => [t.id, t]));
    for (const t of this.config.flows) {
      const n = this.flowNodes.get(t.id);
      if (!n) continue;
      const o = e.get(t.from_node), r = e.get(t.to_node);
      if (!o || !r) continue;
      const s = this.latestValues.get(t.id) ?? 0, a = this.flowPathSyncedDirection.get(t.id) ?? this.computeIntendedTravelSign(t, s);
      this.syncFlowPathGeometry(t, n, a);
    }
  }
  flushUpdates() {
    for (const [i, e] of this.latestValues) this.applyFlow(i, e);
  }
  applyFlow(i, e) {
    const t = this.flowsById.get(i), n = this.flowNodes.get(i);
    if (!t || !n) return;
    const o = Ae(e), r = t.animation ?? {}, s = this.animStyle(t);
    n.style !== s && (this._currentDuration.delete(i), this.teardownStyle(n), n.style = s);
    const a = this.profileFor(t), d = Ve(t, a, this.config), c = Math.abs(o), p = ln(o, d, { flowId: i }), u = r.shimmer === !0, f = d.zeroThresholdEnabled && d.zeroThreshold !== void 0 ? d.peak * d.zeroThreshold : Be, h = u && c <= f && c > 0;
    if (t.visible === !1) {
      n.group.style.display = "none";
      return;
    }
    n.group.style.display = "";
    const g = Ao ? So : Pt(o, d), v = t.speed_multiplier ?? 1;
    let y = Math.max(50, g * v);
    h && (y = y / Mo);
    let m;
    if (p)
      this._currentDuration.delete(i), li(i, this.durInterp), m = y;
    else {
      const V = an(this._currentDuration.get(i) ?? y, y);
      this._currentDuration.set(i, V), m = V, this.durInterp.currentDurMs.set(i, m), li(i, this.durInterp);
    }
    const w = this.config?.animation?.smooth_speed !== !1, $ = r.direction ?? "auto", M = this.computeIntendedTravelSign(t, o);
    let E = M, k = h ? Re : 1;
    const S = 600, T = 300;
    if (w && $ === "auto") {
      const V = this.lastDirection.get(i), $n = this.dirChanging.get(i);
      V !== void 0 && V !== M && !$n && this.dirChanging.set(i, {
        startMs: performance.now(),
        oldDir: V,
        newDir: M
      });
      const Me = this.dirChanging.get(i);
      if (Me) {
        const G = performance.now() - Me.startMs;
        G < S ? (G < T ? (k = (h ? Re : 1) * (1 - G / T), E = Me.oldDir) : (k = (h ? Re : 1) * ((G - T) / T), E = Me.newDir), !u && G >= 280 && G <= 320 && (m = Math.max(m, 45e3)), u && G >= 270 && G <= 330 && (k = Math.max(k, Re))) : (this.dirChanging.delete(i), E = M);
      }
    }
    this.lastDirection.set(i, M);
    const I = t.domain ?? this.config?.domain, z = this.config?.flows.findIndex((V) => V.id === i) ?? -1, U = pe(t, a, I, E, this.config?.domain_colors, z >= 0 ? z : 0), re = this.gradientColors.get(i), It = t.value_gradient?.mode ?? "flow", wn = gt(re && It !== "line" ? re : U), xn = gt(re && It !== "flow" ? re : U), K = wn;
    n.outline && n.outline.setAttribute("stroke", xn), this.setGroupOpacity(n, k), this.syncFlowPathGeometry(t, n, E);
    const ue = this.updateBurstState(i, c, d, a);
    switch (se("applyFlow:", i, "style=", s, "dur=", m, "dir=", E, "color=", K), s) {
      case "dots":
        this.applyDots(n, t, a, o, m, K, E, ue, p);
        break;
      case "dash":
        this.applyDash(n, t, m, K, E, ue, p);
        break;
      case "arrow":
        this.applyArrows(n, t, m, K, E, ue, p);
        break;
      case "trail":
        this.applyTrail(n, t, m, K, E, ue, p);
        break;
      case "fluid":
        this.applyFluid(n, t, m, K, p);
        break;
      case "none":
        this.setGroupOpacity(n, 1);
        break;
      default:
        this.applyDots(n, t, a, o, m, K, E, ue, p);
    }
    $ === "both" && (s === "dots" || s === "dash" || s === "arrow" || s === "trail" || s === "fluid") && A("direction both:", i, "style:", s, "forward particles:", n.particles.length, "reverse particles:", n.particlesBack?.length ?? 0, "fluid rev grad:", n.fluidGradientRev?.id ?? "(none)", "forward path:", n.path.id, "reverse path:", n.pathRev?.id ?? "(none)");
  }
  updateBurstState(i, e, t, n) {
    const o = t.peak, r = this.config?.defaults?.burst_trigger_ratio ?? Co, s = this.config?.defaults?.burst_sustain_ms ?? Fo;
    if (e < o * r)
      return this.burstActive.delete(i), this.burstEnteredAt.delete(i), 1;
    let a = this.burstEnteredAt.get(i);
    if (a === void 0 && (a = performance.now(), this.burstEnteredAt.set(i, a)), performance.now() - a < s) return 1;
    const d = n.burst_density_multiplier ?? 1.5;
    return this.burstActive.add(i), d;
  }
  setGroupOpacity(i, e) {
    const t = String(e);
    for (const n of i.particles) n.shape.setAttribute("opacity", t);
    if (i.particlesBack) for (const n of i.particlesBack) n.shape.setAttribute("opacity", t);
    i.fluidGradient ? (i.group.setAttribute("opacity", e <= 0 ? "0" : t), e <= 0 && (i.lineStroke?.setAttribute("opacity", "0"), i.lineStrokeRev?.setAttribute("opacity", "0"))) : (i.group.removeAttribute("opacity"), i.lineStroke && i.lineStroke.setAttribute("opacity", e > 0 ? "0.9" : "0"), i.lineStrokeRev && i.lineStrokeRev.setAttribute("opacity", e > 0 ? "0.9" : "0"));
  }
  teardownStyle(i) {
    i.group.removeAttribute("opacity");
    for (const e of i.particles) e.shape.remove();
    if (i.particles = [], i.particlesBack) {
      for (const e of i.particlesBack) e.shape.remove();
      i.particlesBack = void 0;
    }
    i.lineStrokeRev?.remove(), i.lineStrokeRev = void 0, i.lineStroke?.remove(), i.lineStroke = void 0, i.fluidInitialised = void 0, i.fluidGradientRev?.remove(), i.fluidGradientRev = void 0, i.fluidGradient?.remove(), i.fluidGradient = void 0;
  }
  sampleFrameTime() {
    const i = performance.now();
    if (this.lastFrameForAdaptive > 0) {
      const e = i - this.lastFrameForAdaptive;
      this.frameTimeSamples.push(e), this.frameTimeSamples.length > 60 && this.frameTimeSamples.shift();
    }
    this.lastFrameForAdaptive = i;
  }
  avgFrameMs() {
    return this.frameTimeSamples.length === 0 ? 16.67 : this.frameTimeSamples.reduce((i, e) => i + e, 0) / this.frameTimeSamples.length;
  }
  runAdaptivePassIfDue(i) {
    if (!this.config || i - this.lastAdaptivePassAt < 1e3 || this.frameTimeSamples.length < 30) return;
    this.lastAdaptivePassAt = i;
    const e = 1e3 / (this.config.animation?.fps ?? 60), t = this.avgFrameMs(), n = t > e * 1.2, o = t < e * 0.8;
    for (const r of this.config.flows) {
      if (r.animation?.particle_count !== void 0) continue;
      const s = this.animStyle(r);
      if (s !== "dots" && s !== "trail") continue;
      const a = this.profileFor(r), d = Math.abs(this.latestValues.get(r.id) ?? 0), c = Ve(r, a, this.config), p = this.updateBurstState(r.id, d, c, a), u = Math.max(1, Math.round(a.particle_count_curve ? a.particle_count_curve(d) : Pe)), f = this.config.defaults?.burst_max_particles ?? Ne, h = Math.min(f, Math.max(1, Math.round(u * p)));
      let g = this.adaptiveCount.get(r.id) ?? h;
      n && g > 1 ? (g -= 1, A("adaptive count:", r.id, g, "avg frame:", t)) : o && g < h && (g += 1, A("adaptive count:", r.id, g, "avg frame:", t)), this.adaptiveCount.set(r.id, Math.min(g, h));
    }
  }
  resolveParticleCount(i, e, t, n) {
    const o = i.animation ?? {};
    if (o.particle_count !== void 0) return o.particle_count;
    const r = this.animStyle(i), s = Math.max(1, Math.round(e.particle_count_curve ? e.particle_count_curve(t) : Pe)), a = Math.max(1, s), d = this.config?.defaults?.burst_max_particles ?? Ne, c = Math.min(d, Math.max(1, Math.round(a * n)));
    return r === "dots" || r === "trail" ? Math.min(this.adaptiveCount.get(i.id) ?? c, c) : c;
  }
  resolveParticleRadius(i) {
    return (this.config?.defaults?.dot_radius ?? ci) * (i.animation?.particle_size ?? 1);
  }
  resolveGlow(i, e) {
    return i.animation?.glow_intensity === 0 ? !1 : e.glow;
  }
  glowFilter(i, e, t) {
    return this.resolveGlow(i, e) ? `drop-shadow(0 0 ${(6 * (i.animation?.glow_intensity ?? 1)).toFixed(1)}px ${t})` : "";
  }
  particleMotionRotateAttr(i) {
    return i === "teardrop" || i === "diamond" ? "0" : "auto";
  }
  particleTangentRotationDegrees(i, e) {
    return i === "teardrop" || i === "diamond" ? 0 : e;
  }
  resolveParticleBegins(i, e, t, n) {
    const o = n.particle_spacing ?? "even", r = t / 1e3, s = r / e;
    switch (o) {
      case "even":
      default:
        return Array.from({ length: e }, (a, d) => -(s * d));
      case "random": {
        const a = performance.now(), d = this.randomOffsetsLastUpdate.get(i) ?? 0, c = 3e3;
        let p = this.randomOffsets.get(i);
        if (!p || p.length !== e || a - d > c) {
          const u = s * 0.1, f = [];
          for (let h = 0; h < e; h++) {
            let g, v = 0;
            do
              g = -(Math.random() * r), v++;
            while (v < 20 && f.some((y) => {
              const m = Math.abs((g - y) % r + r) % r;
              return m < u && m > r - u;
            }));
            f.push(g);
          }
          this.randomOffsets.set(i, f), this.randomOffsetsLastUpdate.set(i, a), p = f;
        }
        return p;
      }
      case "clustered": {
        const a = Math.max(1, Math.round(n.cluster_size ?? 3)), d = n.cluster_gap ?? 3, c = s * 0.3, p = [];
        let u = 0;
        for (let f = 0; f < e; f++) {
          const h = f % a;
          f > 0 && h === 0 && (u += c * a * d), p.push(-(u % r)), u += c;
        }
        return p;
      }
      case "pulse": {
        const a = 1 / Math.max(0.01, n.pulse_frequency ?? 1.5), d = n.pulse_ratio ?? 0.25;
        return performance.now() / 1e3 % a < a * d ? Array.from({ length: e }, (c, p) => -(s * 0.1 * p)) : Array.from({ length: e }, (c, p) => -(s * p));
      }
      case "wave_spacing": {
        const a = n.wave_frequency ?? 2, d = n.wave_amplitude ?? 0.85;
        return Array.from({ length: e }, (c, p) => {
          const u = p / e * Math.PI * 2 * a, f = Math.sin(u) * d * (r / 2);
          return -(s * p + f);
        });
      }
      case "wave_lateral":
        return Array.from({ length: e }, (a, d) => -(s * d));
    }
  }
  updateLateralWaves(i) {
    if (this.config)
      for (const e of this.config.flows) {
        if ((e.animation?.particle_spacing ?? "even") !== "wave_lateral") continue;
        const t = this.flowNodes.get(e.id);
        if (!t || t.particles.length === 0) continue;
        const n = e.animation?.wave_frequency ?? 2, o = e.animation?.wave_amplitude ?? 20, r = t.particles.length, s = Math.PI * 2 / r, a = i * n * 2e-3 % (Math.PI * 2);
        for (let d = 0; d < r; d++) {
          const c = t.particles[d];
          if (!c) continue;
          const p = a + d * s, u = Math.sin(p) * o;
          if (c.shape.getAttribute("data-kind") === "custom_svg") {
            c.shape.hasAttribute("data-base-transform") || c.shape.setAttribute("data-base-transform", c.shape.getAttribute("transform") ?? "");
            const f = c.shape.getAttribute("data-base-transform") ?? "";
            c.shape.setAttribute("transform", `${f} translate(0,${u.toFixed(2)})`);
          } else c.shape.setAttribute("transform", `translate(0,${u.toFixed(2)})`);
        }
      }
  }
  updateTimeBasedSpacing(i) {
    if (this.config)
      for (const e of this.config.flows) {
        const t = e.animation?.particle_spacing ?? "even";
        if (t !== "wave_spacing" && t !== "pulse") continue;
        const n = this.flowNodes.get(e.id);
        if (!n || n.particles.length === 0) continue;
        const o = n.particles.length, r = (this.durInterp.currentDurMs.get(e.id) ?? 2e3) / 1e3, s = e.animation ?? {}, a = [];
        if (t === "wave_spacing") {
          const p = s.wave_frequency ?? 2, u = Math.min(s.wave_amplitude ?? 0.85, 0.95), f = i * 1e-3 / r, h = [];
          for (let g = 0; g < o; g++) {
            const v = (g / o + f) % 1, y = Math.sin(v * Math.PI * 2 * p) * u * (1 / o);
            h.push(((v + y) % 1 + 1) % 1);
          }
          h.sort((g, v) => g - v), a.push(...h);
        } else {
          const p = s.pulse_frequency ?? 1.5, u = s.pulse_ratio ?? 0.25, f = i * p * 1e-3 % 1, h = i * 1e-3 / r % 1, g = 1 / o;
          let v;
          f < u ? v = 1 - (1 - f / u) * 0.9 : v = (f - u) / (1 - u);
          for (let y = 0; y < o; y++) a.push(((h + y * g * v) % 1 + 1) % 1);
        }
        const d = n.path;
        let c;
        try {
          c = d ? d.getTotalLength() : 0;
        } catch {
          c = 0;
        }
        for (let p = 0; p < o; p++) {
          const u = n.particles[p];
          if (!u) continue;
          if (!u.animateMotion.hasAttribute("data-js-driven")) {
            const h = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            h.setAttribute("data-js-driven", "1"), h.setAttribute("begin", "indefinite"), h.setAttribute("dur", "1s"), u.animateMotion.replaceWith(h), u.animateMotion = h, u.shape.appendChild(h);
          }
          const f = a[p] ?? 0;
          if (c > 0 && d) try {
            const h = d.getPointAtLength(f * c), g = this.particleKind(u), v = Math.max(0.5, c * 0.01), y = d.getPointAtLength(Math.max(0, f * c - v)), m = d.getPointAtLength(Math.min(c, f * c + v)), w = Math.atan2(m.y - y.y, m.x - y.x) * (180 / Math.PI), $ = this.particleTangentRotationDegrees(g, w);
            u.shape.setAttribute("transform", $ === 0 ? `translate(${h.x.toFixed(2)},${h.y.toFixed(2)})` : `translate(${h.x.toFixed(2)},${h.y.toFixed(2)}) rotate(${$.toFixed(1)})`);
          } catch {
          }
        }
      }
  }
  applyDots(i, e, t, n, o, r, s, a, d = !1) {
    const c = e.animation?.direction ?? "auto", p = d ? 0 : this.resolveParticleCount(e, t, n, a), u = e.animation?.particle_shape ?? "circle", f = e.animation?.flicker === !0;
    if (i.particles.length !== p || i.particles[0] && this.particleKind(i.particles[0]) !== u) {
      for (const $ of i.particles) $.shape.remove();
      i.particles = [];
      for (let $ = 0; $ < p; $++) i.particles.push(this.makeParticle(i, u, r, e, t));
    }
    if (c === "both") {
      if (!i.particlesBack || i.particlesBack.length !== p) {
        if (i.particlesBack) for (const $ of i.particlesBack) $.shape.remove();
        i.particlesBack = [];
        for (let $ = 0; $ < p; $++) i.particlesBack.push(this.makeParticle(i, u, r, e, t));
      }
    } else if (i.particlesBack) {
      for (const $ of i.particlesBack) $.shape.remove();
      i.particlesBack = void 0;
    }
    const h = `${(o / 1e3).toFixed(3)}s`, g = o / 1e3, v = c === "both" ? g / 2 : 0, y = e.animation ?? {}, m = this.resolveParticleBegins(e.id, p, o, y), w = ($, M, E) => {
      for (let k = 0; k < $.length; k++) {
        const S = $[k];
        this.updateParticleColor(S, r, e, t, f);
        const T = document.createElementNS(N, "animateMotion");
        T.setAttribute("repeatCount", "indefinite"), T.setAttribute("dur", h), T.setAttribute("rotate", this.particleMotionRotateAttr(u)), T.setAttribute("begin", `${((m[k] ?? 0) + E).toFixed(3)}s`);
        const I = document.createElementNS(N, "mpath"), z = this.motionPathRef(i, e, M);
        I.setAttributeNS(O, "href", `#${z}`), I.setAttribute("href", `#${z}`), T.appendChild(I), S.animateMotion.replaceWith(T), S.animateMotion = T, S.shape.appendChild(T);
      }
    };
    w(i.particles, s, 0), i.particlesBack && w(i.particlesBack, -s, v);
  }
  applyDash(i, e, t, n, o, r, s = !1) {
    for (const m of i.particles) m.shape.remove();
    i.particles = [];
    const a = e.animation?.direction ?? "auto", d = this.config?.defaults?.line_width ?? et, c = (e.animation ?? {}).dash_gap ?? 0.5, p = Math.max(0.1, c / r), u = 14, f = u * p, h = u + f, g = this.glowFilter(e, this.profileFor(e), n), v = `${(t / 1e3).toFixed(3)}s`, y = (m) => {
      m.setAttribute("stroke", n), m.setAttribute("stroke-width", String(d * 2)), m.setAttribute("stroke-dasharray", `${u} ${f}`), g ? m.setAttribute("filter", g) : m.removeAttribute("filter");
      const w = m.querySelector("animate");
      if (w && w.remove(), !s) {
        const $ = document.createElementNS(N, "animate");
        $.setAttribute("attributeName", "stroke-dashoffset"), $.setAttribute("from", "0"), $.setAttribute("to", `-${h}`), $.setAttribute("dur", v), $.setAttribute("repeatCount", "indefinite"), m.appendChild($);
      }
    };
    if (a === "both") {
      this.ensurePathRev(i);
      const m = i.pathRevId ?? i.pathId;
      if (!i.lineStroke) {
        const w = document.createElementNS(N, "use");
        w.setAttribute("fill", "none"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("stroke-linejoin", "round"), i.group.appendChild(w), i.lineStroke = w;
      }
      if (!i.lineStrokeRev) {
        const w = document.createElementNS(N, "use");
        w.setAttribute("fill", "none"), w.setAttribute("stroke-linecap", "round"), w.setAttribute("stroke-linejoin", "round"), i.group.appendChild(w), i.lineStrokeRev = w;
      }
      i.lineStroke.setAttributeNS(O, "href", `#${i.pathId}`), i.lineStroke.setAttribute("href", `#${i.pathId}`), i.lineStrokeRev.setAttributeNS(O, "href", `#${m}`), i.lineStrokeRev.setAttribute("href", `#${m}`), y(i.lineStroke), y(i.lineStrokeRev);
      return;
    }
    if (i.lineStrokeRev?.remove(), i.lineStrokeRev = void 0, !i.lineStroke) {
      const m = document.createElementNS(N, "use");
      m.setAttribute("fill", "none"), m.setAttribute("stroke-linecap", "round"), m.setAttribute("stroke-linejoin", "round"), i.group.appendChild(m), i.lineStroke = m;
    }
    i.lineStroke.setAttributeNS(O, "href", `#${i.pathId}`), i.lineStroke.setAttribute("href", `#${i.pathId}`), y(i.lineStroke);
  }
  applyArrows(i, e, t, n, o, r, s = !1) {
    const a = this.profileFor(e), d = e.animation?.particle_count ?? Pe, c = this.config?.defaults?.burst_max_particles ?? Ne, p = s ? 0 : Math.min(c, Math.max(1, Math.round(d * r))), u = e.animation?.flicker === !0, f = e.animation?.direction ?? "auto";
    if (i.particles.length !== p) {
      for (const w of i.particles) w.shape.remove();
      i.particles = [];
      for (let w = 0; w < p; w++) i.particles.push(this.makeParticle(i, "arrow", n, e, a));
    }
    if (f === "both") {
      if (!i.particlesBack || i.particlesBack.length !== p) {
        if (i.particlesBack) for (const w of i.particlesBack) w.shape.remove();
        i.particlesBack = [];
        for (let w = 0; w < p; w++) i.particlesBack.push(this.makeParticle(i, "arrow", n, e, a));
      }
    } else if (i.particlesBack) {
      for (const w of i.particlesBack) w.shape.remove();
      i.particlesBack = void 0;
    }
    const h = `${(t / 1e3).toFixed(3)}s`, g = t / 1e3, v = f === "both" ? g / 2 : 0, y = this.resolveParticleBegins(e.id, p, t, e.animation ?? {}), m = (w, $, M) => {
      for (let E = 0; E < w.length; E++) {
        const k = w[E];
        this.updateParticleColor(k, n, e, a, u);
        const S = document.createElementNS(N, "animateMotion");
        S.setAttribute("repeatCount", "indefinite"), S.setAttribute("dur", h), S.setAttribute("rotate", this.particleMotionRotateAttr("arrow")), S.setAttribute("begin", `${((y[E] ?? 0) + M).toFixed(3)}s`);
        const T = document.createElementNS(N, "mpath"), I = this.motionPathRef(i, e, $);
        T.setAttributeNS(O, "href", `#${I}`), T.setAttribute("href", `#${I}`), S.appendChild(T), k.animateMotion.replaceWith(S), k.animateMotion = S, k.shape.appendChild(S);
      }
    };
    m(i.particles, o, 0), i.particlesBack && m(i.particlesBack, -o, v);
  }
  applyTrail(i, e, t, n, o, r, s = !1) {
    const a = this.profileFor(e), d = e.animation?.particle_count ?? Pe, c = this.config?.defaults?.burst_max_particles ?? Ne, p = s ? 0 : Math.min(c, Math.max(1, Math.round(d * r)));
    if (s) {
      for (const k of i.particles) k.shape.remove();
      if (i.particles = [], i.particlesBack) {
        for (const k of i.particlesBack) k.shape.remove();
        i.particlesBack = void 0;
      }
      return;
    }
    const u = e.animation?.flicker === !0, f = e.animation?.particle_shape ?? "circle", h = this.particleMotionRotateAttr(f), g = (e.animation?.direction ?? "auto") === "both";
    if (i.particles.length === p && i.particles[0]?.shape.hasAttribute("data-trail-pack") && i.particles[0]?.shape.getAttribute("data-head-kind") === f && (!g || i.particlesBack?.length === p && i.particlesBack[0]?.shape.hasAttribute("data-trail-pack") && i.particlesBack[0]?.shape.getAttribute("data-head-kind") === f)) {
      if (!g && i.particlesBack) {
        for (const k of i.particlesBack) k.shape.remove();
        i.particlesBack = void 0;
      }
    } else {
      for (const k of i.particles) k.shape.remove();
      if (i.particles = [], i.particlesBack) {
        for (const k of i.particlesBack) k.shape.remove();
        i.particlesBack = void 0;
      }
      for (let k = 0; k < p; k++) i.particles.push(this.makeTrailParticle(i, e, a, n, f));
      if (g) {
        i.particlesBack = [];
        for (let k = 0; k < p; k++) i.particlesBack.push(this.makeTrailParticle(i, e, a, n, f));
      }
    }
    const v = `${(t / 1e3).toFixed(3)}s`, y = t / 1e3, m = g ? y / 2 : 0, w = this.resolveParticleBegins(e.id, p, t, e.animation ?? {});
    let $ = 100;
    try {
      $ = Math.max(1, i.path.getTotalLength());
    } catch {
      $ = 100;
    }
    const M = (k, S, T) => {
      const I = document.createElementNS(N, "animateMotion");
      I.setAttribute("repeatCount", "indefinite"), I.setAttribute("dur", v), I.setAttribute("rotate", h), I.setAttribute("begin", `${S.toFixed(4)}s`);
      const z = document.createElementNS(N, "mpath"), U = this.motionPathRef(i, e, T);
      return z.setAttributeNS(O, "href", `#${U}`), z.setAttribute("href", `#${U}`), I.appendChild(z), k.replaceWith(I), I;
    }, E = (k, S, T) => {
      this.updateParticleColor(k, n, e, a, u);
      const I = k.trailMotions;
      if (I && I.length === 4) for (let z = 0; z < 4; z++) {
        const U = S + Ro[z] / $ * y;
        I[z] = M(I[z], U, T);
      }
      k.animateMotion = M(k.animateMotion, S, T);
    };
    for (let k = 0; k < i.particles.length; k++) {
      const S = i.particles[k];
      E(S, w[k] ?? 0, o);
    }
    if (i.particlesBack) for (let k = 0; k < i.particlesBack.length; k++) {
      const S = i.particlesBack[k];
      E(S, (w[k] ?? 0) + m, -o);
    }
  }
  paintFluidStrokeWithGradient(i, e, t, n, o, r, s, a, d, c, p) {
    t.setAttributeNS(O, "href", `#${o}`), t.setAttribute("href", `#${o}`);
    let u = this.svg.getElementById(r);
    u || (u = document.createElementNS(N, "linearGradient"), u.setAttribute("id", r), e.appendChild(u));
    const f = new Map(this.config.nodes.map((S) => [S.id, S])), h = f.get(i.from_node), g = f.get(i.to_node);
    if (!h || !g) return u;
    let v;
    try {
      v = Math.max(1, n.getTotalLength());
    } catch {
      v = 100;
    }
    let y, m;
    try {
      const S = n.getPointAtLength(0), T = n.getPointAtLength(v);
      y = {
        x: S.x,
        y: S.y
      }, m = {
        x: T.x,
        y: T.y
      };
    } catch {
      const S = this.containerSize();
      y = ke(h.position, S), m = ke(g.position, S);
    }
    const w = m.x - y.x, $ = m.y - y.y, M = Math.hypot(w, $) || 1, E = w / M, k = $ / M;
    for (u.setAttribute("gradientUnits", "userSpaceOnUse"), u.setAttribute("x1", String(y.x)), u.setAttribute("y1", String(y.y)), u.setAttribute("x2", String(y.x + E * 2 * v)), u.setAttribute("y2", String(y.y + k * 2 * v)); u.firstChild; ) u.firstChild.remove();
    for (const [S, T] of [
      ["0%", "0"],
      ["12%", "0.3"],
      ["25%", "1"],
      ["37%", "0.3"],
      ["50%", "0"],
      ["62%", "0.3"],
      ["75%", "1"],
      ["87%", "0.3"],
      ["100%", "0"]
    ]) {
      const I = document.createElementNS(N, "stop");
      I.setAttribute("offset", S), I.setAttribute("stop-color", s), I.setAttribute("stop-opacity", T), u.appendChild(I);
    }
    if (!d) {
      const S = document.createElementNS(N, "animateTransform");
      S.setAttribute("attributeName", "gradientTransform"), S.setAttribute("type", "translate"), S.setAttribute("additive", "replace"), S.setAttribute("calcMode", "linear"), S.setAttribute("dur", `${Math.max(1, Math.round(a))}ms`), S.setAttribute("repeatCount", "indefinite");
      const T = E * v, I = k * v;
      S.setAttribute("from", `${-T} ${-I}`), S.setAttribute("to", "0 0"), u.appendChild(S);
    }
    return t.setAttribute("stroke", `url(#${r})`), t.setAttribute("stroke-width", String(c)), t.removeAttribute("stroke-dasharray"), p ? t.setAttribute("filter", p) : t.removeAttribute("filter"), u;
  }
  applyFluid(i, e, t, n, o = !1) {
    for (const h of i.particles) h.shape.remove();
    if (i.particles = [], !this.svg) return;
    const r = this.svg.querySelector("defs");
    if (!r) return;
    const s = new Map(this.config.nodes.map((h) => [h.id, h])), a = s.get(e.from_node), d = s.get(e.to_node);
    if (!a || !d) return;
    const c = e.animation?.direction ?? "auto", p = e.id.replace(/[^a-zA-Z0-9_-]/g, "_"), u = (this.config?.defaults?.line_width ?? et) * 3, f = this.glowFilter(e, this.profileFor(e), n);
    if (c === "both") {
      this.ensurePathRev(i);
      const h = i.pathRev, g = i.pathRevId;
      if (!h || !g) return;
      if (!i.lineStroke) {
        const v = document.createElementNS(N, "use");
        v.setAttribute("fill", "none"), v.setAttribute("stroke-linecap", "round"), v.setAttribute("stroke-linejoin", "round"), i.group.appendChild(v), i.lineStroke = v;
      }
      if (!i.lineStrokeRev) {
        const v = document.createElementNS(N, "use");
        v.setAttribute("fill", "none"), v.setAttribute("stroke-linecap", "round"), v.setAttribute("stroke-linejoin", "round"), i.group.appendChild(v), i.lineStrokeRev = v;
      }
      if (i.fluidGradient = this.paintFluidStrokeWithGradient(e, r, i.lineStroke, i.path, i.pathId, `fluid-grad-${p}`, n, t, o, u, f), i.fluidGradientRev = this.paintFluidStrokeWithGradient(e, r, i.lineStrokeRev, h, g, `fluid-grad-${p}-rev`, n, t, o, u, f), !i.fluidInitialised) {
        i.fluidInitialised = !0;
        for (const v of [i.lineStroke, i.lineStrokeRev]) {
          v.setAttribute("opacity", "0");
          const y = document.createElementNS(N, "animate");
          y.setAttribute("attributeName", "opacity"), y.setAttribute("values", "0;1"), y.setAttribute("dur", "600ms"), y.setAttribute("fill", "freeze"), v.appendChild(y);
        }
      }
      return;
    }
    if (i.lineStrokeRev?.remove(), i.lineStrokeRev = void 0, i.fluidGradientRev?.remove(), i.fluidGradientRev = void 0, !i.lineStroke) {
      const h = document.createElementNS(N, "use");
      h.setAttributeNS(O, "href", `#${i.pathId}`), h.setAttribute("href", `#${i.pathId}`), h.setAttribute("fill", "none"), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round"), i.group.appendChild(h), i.lineStroke = h;
    }
    if (i.fluidGradient = this.paintFluidStrokeWithGradient(e, r, i.lineStroke, i.path, i.pathId, `fluid-grad-${p}`, n, t, o, u, f), !i.fluidInitialised) {
      i.fluidInitialised = !0, i.lineStroke.setAttribute("opacity", "0");
      const h = document.createElementNS(N, "animate");
      h.setAttribute("attributeName", "opacity"), h.setAttribute("values", "0;1"), h.setAttribute("dur", "600ms"), h.setAttribute("fill", "freeze"), i.lineStroke.appendChild(h);
    }
  }
  makeTrailParticle(i, e, t, n, o) {
    const r = this.resolveParticleRadius(e), s = this.resolveGlow(e, t), a = o === "custom_svg" ? "circle" : o, d = document.createElementNS(N, "g");
    d.setAttribute("data-trail-pack", "1"), d.setAttribute("data-head-kind", o);
    const c = [], p = [], u = this.particleMotionRotateAttr(o);
    for (let y = 0; y < 4; y++) {
      const m = document.createElementNS(N, "g"), { shape: w } = this.buildParticleShapeOnly(i, a, r * Eo[y], n, e);
      s && w.setAttribute("filter", this.glowFilter(e, t, n)), w.setAttribute("opacity", String(To[y])), m.appendChild(w);
      const $ = document.createElementNS(N, "animateMotion");
      $.setAttribute("repeatCount", "indefinite"), $.setAttribute("dur", "2s"), $.setAttribute("rotate", u);
      const M = document.createElementNS(N, "mpath");
      M.setAttributeNS(O, "href", `#${i.pathId}`), M.setAttribute("href", `#${i.pathId}`), $.appendChild(M), m.appendChild($), p.push(m), c.push($);
    }
    for (let y = 3; y >= 0; y--) d.appendChild(p[y]);
    const f = document.createElementNS(N, "g");
    let h;
    o === "custom_svg" ? h = this.buildParticleShapeOnly(i, o, r, n, e, f).shape : (h = this.buildParticleShapeOnly(i, o, r, n, e).shape, f.appendChild(h)), s && h.setAttribute("filter", this.glowFilter(e, t, n));
    const g = document.createElementNS(N, "animateMotion");
    g.setAttribute("repeatCount", "indefinite"), g.setAttribute("dur", "2s"), g.setAttribute("rotate", u);
    const v = document.createElementNS(N, "mpath");
    return v.setAttributeNS(O, "href", `#${i.pathId}`), v.setAttribute("href", `#${i.pathId}`), g.appendChild(v), f.appendChild(g), d.appendChild(f), i.group.appendChild(d), {
      shape: d,
      animateMotion: g,
      trailMotions: c
    };
  }
  particleKind(i) {
    const e = i.shape.tagName.toLowerCase();
    return e === "g" && i.shape.hasAttribute("data-trail-pack") ? i.shape.getAttribute("data-head-kind") ?? "circle" : e === "circle" ? "circle" : e === "rect" ? "square" : e === "polygon" ? i.shape.getAttribute("data-kind") ?? "arrow" : e === "ellipse" ? "teardrop" : e === "path" ? i.shape.getAttribute("data-kind") ?? "custom_svg" : "circle";
  }
  buildParticleShapeOnly(i, e, t, n, o, r) {
    let s, a = !1;
    switch (e) {
      case "square": {
        const d = t * 2, c = document.createElementNS(N, "rect");
        c.setAttribute("width", String(d)), c.setAttribute("height", String(d)), c.setAttribute("x", String(-d / 2)), c.setAttribute("y", String(-d / 2)), c.setAttribute("rx", "1.5"), c.setAttribute("fill", n), c.setAttribute("opacity", "0"), s = c;
        break;
      }
      case "arrow": {
        const d = (this.config?.defaults?.dot_radius ?? ci) * (o.animation?.particle_size ?? 1) / 10, c = document.createElementNS(N, "path");
        c.setAttribute("d", Po(d)), c.setAttribute("fill", n), c.setAttribute("opacity", "0"), c.setAttribute("data-kind", "arrow"), s = c;
        break;
      }
      case "teardrop": {
        const d = document.createElementNS(N, "path");
        d.setAttribute("d", No(t)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), d.setAttribute("data-kind", "teardrop"), s = d;
        break;
      }
      case "diamond": {
        const d = t * 1.4, c = document.createElementNS(N, "polygon");
        c.setAttribute("points", `0,${-d} ${d},0 0,${d} ${-d},0`), c.setAttribute("fill", n), c.setAttribute("opacity", "0"), c.setAttribute("data-kind", "diamond"), s = c;
        break;
      }
      case "custom_svg": {
        const d = o.animation?.custom_svg_path ?? "";
        if (!d) {
          A(`particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: ${o.id}`);
          const p = document.createElementNS(N, "circle");
          p.setAttribute("r", String(t)), p.setAttribute("fill", n), p.setAttribute("opacity", "0"), s = p;
          break;
        }
        const c = document.createElementNS(N, "path");
        c.setAttribute("d", d), c.setAttribute("fill", n), c.setAttribute("opacity", "0"), c.setAttribute("data-kind", "custom_svg"), (r ?? i.group).appendChild(c), a = !0;
        try {
          const p = c.getBBox(), u = Math.max(p.width, p.height, 1), f = t * 2 / u, h = -(p.x + p.width / 2), g = -(p.y + p.height / 2);
          c.setAttribute("transform", `scale(${f.toFixed(4)}) translate(${h.toFixed(4)},${g.toFixed(4)})`);
        } catch {
        }
        s = c;
        break;
      }
      default: {
        const d = document.createElementNS(N, "circle");
        d.setAttribute("r", String(t)), d.setAttribute("fill", n), d.setAttribute("opacity", "0"), s = d;
      }
    }
    return {
      shape: s,
      alreadyAppended: a
    };
  }
  makeParticle(i, e, t, n, o) {
    const r = this.resolveParticleRadius(n), s = this.resolveGlow(n, o), { shape: a, alreadyAppended: d } = this.buildParticleShapeOnly(i, e, r, t, n);
    s && (a.setAttribute("filter", this.glowFilter(n, o, t)), a.style.color = t);
    const c = document.createElementNS(N, "animateMotion");
    c.setAttribute("repeatCount", "indefinite"), c.setAttribute("dur", "2s"), c.setAttribute("rotate", this.particleMotionRotateAttr(e));
    const p = document.createElementNS(N, "mpath");
    return p.setAttributeNS(O, "href", `#${i.pathId}`), p.setAttribute("href", `#${i.pathId}`), c.appendChild(p), a.appendChild(c), d || i.group.appendChild(a), {
      shape: a,
      animateMotion: c
    };
  }
  updateParticleColor(i, e, t, n, o) {
    if (i.shape.hasAttribute("data-trail-pack") ? i.shape.querySelectorAll("path, circle, rect, ellipse, polygon").forEach((s) => {
      s.setAttribute("fill", e);
    }) : i.shape.setAttribute("fill", e), i.shape.style.color = e, this.resolveGlow(t, n) && i.shape.setAttribute("filter", this.glowFilter(t, n, e)), i.shape.hasAttribute("data-trail-pack") || i.shape.setAttribute("opacity", "1"), o && !i.shape.hasAttribute("data-trail-pack")) {
      if (!i.flickerAnim) {
        const c = document.createElementNS(N, "animate");
        c.setAttribute("attributeName", "opacity"), c.setAttribute("repeatCount", "indefinite"), i.shape.appendChild(c), i.flickerAnim = c;
      }
      const s = (1 / (2 + Math.random() * 6)).toFixed(3), a = (0.85 + Math.random() * 0.1).toFixed(2), d = (0.95 + Math.random() * 0.05).toFixed(2);
      i.flickerAnim.setAttribute("values", `${d};${a};${d}`), i.flickerAnim.setAttribute("dur", `${s}s`);
    } else i.flickerAnim && (i.flickerAnim.remove(), i.flickerAnim = void 0);
  }
  profileFor(i) {
    return H(i.domain ?? this.config?.domain);
  }
  primaryColor(i) {
    const e = this.profileFor(i), t = i.domain ?? this.config?.domain, n = this.config?.flows.findIndex((o) => o.id === i.id) ?? -1;
    return pe(i, e, t, 1, this.config?.domain_colors, n >= 0 ? n : 0);
  }
}, Io = `/* eslint-disable no-undef */
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
`, di = "flowme-keyframes", mt = "flowme-cycle", Bo = 5, Do = 2, Q = null, pi = !1;
function zo() {
  if (document.getElementById(di)) return;
  const i = document.createElement("style");
  i.id = di, i.textContent = `@keyframes ${mt} { from { --flowme-progress: 0; } to { --flowme-progress: 1; } }`, document.head.appendChild(i);
}
function Oo() {
  if (pi) return;
  const i = CSS.registerProperty?.bind(CSS);
  if (i) {
    for (const [e, t, n] of [
      [
        "--flowme-progress",
        "<number>",
        "0"
      ],
      [
        "--flowme-count",
        "<number>",
        "3"
      ],
      [
        "--flowme-radius",
        "<number>",
        "5"
      ],
      [
        "--flowme-line",
        "<number>",
        "2"
      ],
      [
        "--flowme-amp",
        "<number>",
        "4"
      ],
      [
        "--flowme-direction",
        "<number>",
        "1"
      ],
      [
        "--flowme-dur",
        "<number>",
        "2000"
      ]
    ]) try {
      i({
        name: e,
        syntax: t,
        inherits: !1,
        initialValue: n
      });
    } catch {
    }
    pi = !0;
  }
}
async function Lo() {
  if (Q) return Q;
  const i = CSS.paintWorklet;
  if (!i)
    return Q = Promise.reject(/* @__PURE__ */ new Error("paintWorklet not available")), Q;
  const e = new Blob([Io], { type: "application/javascript" }), t = URL.createObjectURL(e);
  return Q = i.addModule(t).catch((n) => {
    throw Q = null, n;
  }).finally(() => {
  }), Q;
}
var Ho = class {
  constructor() {
    this.container = null, this.config = null, this.resizeObserver = null, this.wrapper = null, this.flowDivs = /* @__PURE__ */ new Map(), this.flowsById = /* @__PURE__ */ new Map(), this.latestValues = /* @__PURE__ */ new Map(), this.applyUpdate = cn(() => this.flushUpdates(), 120), this.lastDurMsByFlow = /* @__PURE__ */ new Map(), this._currentDuration = /* @__PURE__ */ new Map();
  }
  async init(i, e) {
    this.container = i, A("Houdini init start dims:", i.offsetWidth, i.offsetHeight), this.config = e, this.flowsById = new Map(e.flows.map((o) => [o.id, o])), zo(), Oo(), await Lo();
    const t = document.createElement("div");
    t.className = "flow-houdini flow-houdini-root", t.style.position = "absolute", t.style.inset = "0", t.style.pointerEvents = "none", i.appendChild(t), this.wrapper = t;
    for (const o of e.flows) {
      const r = document.createElement("div");
      r.className = "flow-houdini", r.dataset.flowId = o.id, r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.background = "paint(flowme-painter)", r.style.setProperty("--flowme-dur", "2000"), r.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)", r.style.animation = `${mt} calc(var(--flowme-dur) * 1ms) linear infinite`, r.style.opacity = "0", t.appendChild(r), this.flowDivs.set(o.id, { el: r });
    }
    this.rebuildPaths(), this.resizeObserver = new ResizeObserver(() => this.rebuildPaths()), this.resizeObserver.observe(i);
    const n = await rn(i);
    (n.width === 0 || n.height === 0) && await sn(i), A("Houdini stable dims:", i.offsetWidth, i.offsetHeight), this.rebuildPaths(), A("Houdini post-resize dims:", i.offsetWidth, i.offsetHeight);
  }
  applyConfig(i) {
    this.config = i, this.flowsById = new Map(i.flows.map((e) => [e.id, e])), this.rebuildPaths();
  }
  updateFlow(i, e) {
    this.flowsById.has(i) && (this.latestValues.set(i, Ae(e)), this.applyUpdate());
  }
  setFlowAriaLabel(i, e) {
    const t = this.flowDivs.get(i);
    t && (t.el.setAttribute("role", "img"), t.el.setAttribute("aria-label", e));
  }
  pause() {
    this.wrapper && this.wrapper.querySelectorAll(".flow-houdini").forEach((i) => {
      i.style.animationPlayState = "paused";
    });
  }
  resume() {
    this.wrapper && this.wrapper.querySelectorAll(".flow-houdini").forEach((i) => {
      i.style.animationPlayState = "running";
    });
  }
  destroy() {
    this.applyUpdate.cancel(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.wrapper?.remove(), this.wrapper = null, this.flowDivs.clear(), this.flowsById.clear(), this.latestValues.clear(), this.lastDurMsByFlow.clear(), this._currentDuration.clear(), this.container = null, this.config = null;
  }
  containerSize() {
    if (!this.container) return {
      width: 1,
      height: 1
    };
    const i = this.container.getBoundingClientRect();
    return {
      width: Math.max(1, i.width),
      height: Math.max(1, i.height)
    };
  }
  rebuildPaths() {
    if (!this.config) return;
    const i = this.containerSize(), e = new Map(this.config.nodes.map((t) => [t.id, t]));
    for (const t of this.config.flows) {
      const n = this.flowDivs.get(t.id);
      if (!n) continue;
      const o = e.get(t.from_node), r = e.get(t.to_node);
      if (!o || !r) continue;
      const s = [
        o.position,
        ...t.waypoints,
        r.position
      ].map((a) => ke(a, i)).map((a) => `${a.x.toFixed(1)},${a.y.toFixed(1)}`).join(" ");
      n.el.style.setProperty("--flowme-path", `"${s}"`);
    }
    this.flushUpdates();
  }
  flushUpdates() {
    for (const [i, e] of this.latestValues) this.applyFlow(i, e);
  }
  applyFlow(i, e) {
    const t = this.flowsById.get(i), n = this.flowDivs.get(i);
    if (!t || !n) return;
    const o = Ae(e), r = this.profileFor(t), s = Ve(t, r, this.config), a = ln(o, s, { flowId: i });
    if (t.visible === !1) {
      n.el.style.display = "none";
      return;
    }
    n.el.style.display = "", n.el.style.opacity = "1";
    const d = t.speed_multiplier ?? 1;
    let c;
    if (a)
      this._currentDuration.delete(i), c = 1e9;
    else {
      const M = Math.max(50, Pt(o, s) * d), E = an(this._currentDuration.get(i) ?? M, M);
      this._currentDuration.set(i, E), c = E;
    }
    const p = t.animation?.direction ?? "auto";
    let u;
    p === "forward" ? u = 1 : p === "reverse" ? u = -1 : p === "both" ? u = 1 : u = o >= 0 ? 1 : -1;
    const f = t.domain ?? this.config?.domain, h = this.config?.flows.findIndex((M) => M.id === t.id) ?? -1, g = pe(t, r, f, u, this.config?.domain_colors, h >= 0 ? h : 0), v = a ? 0 : Math.max(1, Math.round(r.particle_count_curve ? r.particle_count_curve(o) : 3)), y = r.wave_amplitude_curve ? r.wave_amplitude_curve(o) : 4, m = n.el.style;
    m.setProperty("--flowme-shape", r.shape), m.setProperty("--flowme-color", g), m.setProperty("--flowme-glow", r.glow ? "1" : "0"), m.setProperty("--flowme-count", String(v)), m.setProperty("--flowme-radius", String(Bo)), m.setProperty("--flowme-line", String(Do)), m.setProperty("--flowme-amp", String(y)), m.setProperty("--flowme-direction", String(u));
    const w = this.lastDurMsByFlow.get(i) ?? c, $ = Math.round(c);
    if (Math.abs(c - w) < 50) {
      m.transition = "none", m.setProperty("--flowme-dur", String($));
      const M = n.el;
      requestAnimationFrame(() => {
        M.style.transition = "--flowme-dur 500ms cubic-bezier(0.42, 0, 0.58, 1)";
      });
    } else m.setProperty("--flowme-dur", String($));
    this.lastDurMsByFlow.set(i, c), m.animation = a ? "none" : `${mt} calc(var(--flowme-dur) * 1ms) linear infinite`;
  }
  profileFor(i) {
    return H(i.domain ?? this.config?.domain);
  }
};
function Uo() {
  const i = jo(), e = i ?? "svg", t = Wo(), n = pn();
  return A("renderer selected:", n || e !== "houdini" ? "SvgRenderer" : "HoudiniRenderer", "| override=", i ?? "(none)", "| Houdini available:", t, "| reduced motion:", n, "| paintWorklet in CSS?", typeof CSS < "u" && "paintWorklet" in CSS), n ? new De() : e === "houdini" ? t ? new Ho() : (A("?flowme_renderer=houdini requested but unsupported — falling back to SVG"), new De()) : new De();
}
function Wo() {
  try {
    const i = CSS;
    return "paintWorklet" in i && "registerProperty" in i;
  } catch {
    return !1;
  }
}
function jo() {
  try {
    const i = new URLSearchParams(window.location.search).get("flowme_renderer");
    if (i === "svg" || i === "houdini") return i;
  } catch {
  }
  return null;
}
function Vo(i) {
  const e = i.size?.width ?? 20, t = i.size?.height ?? 15;
  return `left: ${i.position.x}%; top: ${i.position.y}%; width: ${e}%; height: ${t}%;`;
}
function Go(i, e, t) {
  A("renderOverlayHost →", "id=", i.id, "position=", i.position, "size=", i.size, "visible=", i.visible ?? !0, "opacity=", i.opacity ?? 1);
  const n = i.visible !== !1, o = i.opacity ?? 1, r = [n ? "" : "display:none;", o !== 1 ? `opacity:${o};` : ""].join("");
  return b`
    <div
      class="overlay overlay-custom overlay-interactive overlay-wrapper"
      data-overlay-id=${i.id}
      style=${Vo(i) + r}
      tabindex=${n ? "0" : "-1"}
      role="button"
      @keydown=${(s) => t?.onOverlayKeydown?.(s, i)}
    >
      <flowme-custom-overlay
        class="overlay-interactive"
        .hass=${e}
        .card=${i.card}
      ></flowme-custom-overlay>
    </div>
    ${_}
  `;
}
var tt = null, ae = null;
async function qo() {
  if (tt) return tt;
  if (ae) return ae;
  const i = window.loadCardHelpers;
  return typeof i != "function" ? null : (ae = i().then((e) => (tt = e, ae = null, e)).catch((e) => {
    throw ae = null, e;
  }), ae);
}
async function Xo(i) {
  const e = await qo();
  return e ? e.createCardElement(i) : null;
}
function F(i, e, t, n) {
  var o = arguments.length, r = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, n);
  else for (var a = i.length - 1; a >= 0; a--) (s = i[a]) && (r = (o < 3 ? s(r) : o > 3 ? s(e, t, r) : s(e, t)) || r);
  return o > 3 && r && Object.defineProperty(e, t, r), r;
}
var it, Se = (it = class extends ie {
  updated(e) {
    super.updated(e), e.has("card") && this.rebuildChild(), this.childCard && this.hass && this.childCard.hass !== this.hass && (this.childCard.hass = this.hass);
  }
  disconnectedCallback() {
    this.disposeChild(), super.disconnectedCallback();
  }
  activatePrimaryAction() {
    const e = this.childCard ?? this.renderRoot.querySelector(".mount")?.firstElementChild;
    e instanceof HTMLElement && e.click();
  }
  render() {
    return this.errorMessage ? b`<div class="err" title=${this.errorMessage}>!</div>` : b`<div class="mount"></div>`;
  }
  rebuildChild() {
    const e = this.card, t = e ? JSON.stringify(e) : void 0;
    if (t !== this.lastMountedConfigJson && (this.lastMountedConfigJson = t, this.disposeChild(), !!e)) {
      try {
        Kn(e);
      } catch (n) {
        this.errorMessage = n instanceof Error ? n.message : String(n);
        return;
      }
      this.errorMessage = void 0, Xo(e).then((n) => {
        if (!n) {
          this.errorMessage = l("overlays.haHelpersUnavailable"), this.requestUpdate();
          return;
        }
        if (this.lastMountedConfigJson !== t) return;
        this.childCard = n, this.hass && (this.childCard.hass = this.hass);
        const o = this.renderRoot.querySelector(".mount");
        o && (o.innerHTML = "", o.appendChild(this.childCard));
      }).catch((n) => {
        this.errorMessage = n instanceof Error ? n.message : String(n), this.requestUpdate();
      });
    }
  }
  disposeChild() {
    this.childCard && this.childCard.parentElement && this.childCard.parentElement.removeChild(this.childCard), this.childCard = void 0;
  }
}, it.styles = xt`
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
  `, it);
F([Fe({ attribute: !1 })], Se.prototype, "hass", void 0);
F([Fe({ attribute: !1 })], Se.prototype, "card", void 0);
F([P()], Se.prototype, "errorMessage", void 0);
Se = F([Ct("flowme-custom-overlay")], Se);
var L = "http://www.w3.org/2000/svg";
function Ee(i, e) {
  if (!i || !e) return null;
  const t = i.states[e];
  return !t || t.state === "unavailable" || t.state === "unknown" ? null : be(t.state);
}
function Yo(i, e) {
  const t = e.domain, n = H(t);
  if (i.color) return i.color;
  const o = e.flows.filter((s) => s.from_node === i.id || s.to_node === i.id);
  if (o.length === 0) return n.default_color_positive;
  const r = /* @__PURE__ */ new Set();
  for (const s of o) {
    const a = e.flows.findIndex((c) => c.id === s.id), d = pe(s, H(s.domain ?? t), s.domain ?? t, 1, e.domain_colors, a >= 0 ? a : 0);
    r.add(d);
  }
  return r.size === 1 ? [...r][0] : hn;
}
function Zo(i) {
  const e = i.getBoundingClientRect();
  return {
    widthPx: Math.max(1, e.width),
    heightPx: Math.max(1, e.height)
  };
}
function Tt(i) {
  return {
    vbW: i.viewBoxUserWidth ?? 100,
    vbH: i.viewBoxUserHeight ?? 100
  };
}
function fe(i, e) {
  const { vbW: t, vbH: n } = Tt(e), o = t / e.widthPx, r = n / e.heightPx;
  return Math.min(i * o, i * r);
}
function ui(i, e) {
  const { vbW: t, vbH: n } = Tt(e);
  return Math.max(0.04, i * Math.min(t / e.widthPx, n / e.heightPx));
}
function hi(i, e) {
  const { vbW: t, vbH: n } = Tt(e);
  return {
    cx: i.x / 100 * t,
    cy: i.y / 100 * n
  };
}
function Ko(i) {
  return i.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
var fn = class {
  constructor() {
    this.lastDiagnosticLogMs = 0, this.rippleLastRaw = /* @__PURE__ */ new Map(), this.ripplePendingTimeouts = /* @__PURE__ */ new Map(), this.rippleBurstGen = /* @__PURE__ */ new Map();
  }
  reset() {
    for (const i of this.ripplePendingTimeouts.values()) for (const e of i) window.clearTimeout(e);
    this.ripplePendingTimeouts.clear(), this.rippleLastRaw.clear(), this.rippleBurstGen.clear();
  }
  sync(i, e, t, n, o) {
    if (!i || !e) return;
    o?.resetDomEffects?.();
    let r = i.querySelector(":scope > g.node-effects-layer");
    r || (r = document.createElementNS(L, "g"), r.classList.add("node-effects-layer"), i.appendChild(r));
    let s = r.querySelector(":scope > g.node-effects-ripples");
    s || (s = document.createElementNS(L, "g"), s.classList.add("node-effects-ripples"), r.insertBefore(s, r.firstChild));
    let a = r.querySelector(":scope > g.node-effects-sync");
    for (a || (a = document.createElementNS(L, "g"), a.classList.add("node-effects-sync"), r.appendChild(a)); a.firstChild; ) a.firstChild.remove();
    const d = new Set(e.nodes.map((u) => u.id));
    for (const u of [...this.rippleLastRaw.keys()]) d.has(u) || (this.cancelRippleBurst(u, s), this.rippleLastRaw.delete(u));
    for (const u of [...this.rippleBurstGen.keys()]) d.has(u) || this.cancelRippleBurst(u, s);
    const c = o?.getLayoutMetrics?.(i) ?? Zo(i), p = e.defaults?.node_radius ?? 12;
    if (on() && n - this.lastDiagnosticLogMs > 4e3) {
      this.lastDiagnosticLogMs = n;
      for (const u of e.nodes) {
        if (!u.node_effect?.type || !u.entity) continue;
        const f = t?.states[u.entity];
        A("node effect update:", u.id, u.node_effect.type, "entity state:", f?.state ?? "(none)");
      }
    }
    for (const u of e.nodes) {
      const f = u.node_effect;
      if (!f || u.visible === !1 || !u.entity) continue;
      const h = u.size ?? p, g = fe(h, c), { cx: v, cy: y } = hi(u.position, c), m = Yo(u, e), w = document.createElementNS(L, "g");
      switch (w.classList.add("node-effect"), w.setAttribute("data-node", u.id), f.type) {
        case "glow":
          this.appendGlow(w, u, f, t, u.entity, m, h, o, c);
          break;
        case "badge":
          this.appendBadge(w, f, t, u.entity, m, u.id, v, y, h, c, o);
          break;
        case "ripple":
          this.updateRipple(s, u, f, t, m, h, v, y, c);
          continue;
        case "alert":
          this.appendAlert(w, f, t, u.entity, m, u.id, v, y, g, n, o);
          break;
        default:
          break;
      }
      w.childNodes.length > 0 && a.appendChild(w);
    }
  }
  appendGlow(i, e, t, n, o, r, s, a, d) {
    const c = Ee(n, o), p = t.peak_value ?? 1e4, u = t.glow_max_radius ?? 20, f = Math.max(0, Math.min(1, t.glow_min_intensity ?? 0.1)), h = t.glow_color || r, g = c === null ? 0 : Math.abs(c) / p, v = Math.max(f, Math.min(1, g)), y = 4 + v * u, m = 0.2 + v * 0.6;
    if (a?.setNodeDotFilter) {
      a.setNodeDotFilter(e.id, `drop-shadow(0 0 ${y.toFixed(1)}px ${h})`);
      return;
    }
    const { cx: w, cy: $ } = hi(e.position, d), M = document.createElementNS(L, "circle");
    M.setAttribute("cx", String(w)), M.setAttribute("cy", String($)), M.setAttribute("r", String(fe(s, d))), M.setAttribute("fill", "none"), M.setAttribute("stroke", h), M.setAttribute("stroke-width", String(ui(2, d))), M.setAttribute("opacity", String(m)), M.setAttribute("style", `filter: drop-shadow(0 0 ${y.toFixed(1)}px ${h}); transition: filter 500ms ease, opacity 500ms ease`), i.appendChild(M);
  }
  cancelRippleBurst(i, e) {
    const t = this.ripplePendingTimeouts.get(i);
    if (t) {
      for (const n of t) window.clearTimeout(n);
      this.ripplePendingTimeouts.delete(i);
    }
    if (e) {
      const n = `[data-ripple-owner="${Ko(i)}"]`;
      e.querySelectorAll(n).forEach((o) => o.remove());
    }
    this.rippleBurstGen.set(i, (this.rippleBurstGen.get(i) ?? 0) + 1);
  }
  scheduleRippleBurst(i, e, t, n, o, r, s, a) {
    this.cancelRippleBurst(i, e);
    const d = this.rippleBurstGen.get(i), c = 300, p = [];
    for (let u = 0; u < 3; u++) p.push(window.setTimeout(() => {
      this.rippleBurstGen.get(i) === d && this.spawnRippleRing(e, i, t, n, o, r, s, a);
    }, u * c));
    this.ripplePendingTimeouts.set(i, p);
  }
  spawnRippleRing(i, e, t, n, o, r, s, a) {
    const d = fe(o + 2, a), c = fe(o * 4, a), p = ui(2, a), u = document.createElementNS(L, "g");
    u.setAttribute("data-ripple-owner", e);
    const f = document.createElementNS(L, "circle");
    f.setAttribute("cx", String(t)), f.setAttribute("cy", String(n)), f.setAttribute("r", String(d)), f.setAttribute("fill", "none"), f.setAttribute("stroke", s), f.setAttribute("stroke-width", String(p)), f.setAttribute("opacity", "0.7");
    const h = document.createElementNS(L, "animate");
    h.setAttribute("attributeName", "r"), h.setAttribute("from", String(d)), h.setAttribute("to", String(c)), h.setAttribute("dur", `${r}ms`), h.setAttribute("fill", "freeze"), h.setAttribute("begin", "indefinite");
    const g = document.createElementNS(L, "animate");
    g.setAttribute("attributeName", "opacity"), g.setAttribute("from", "0.7"), g.setAttribute("to", "0"), g.setAttribute("dur", `${r}ms`), g.setAttribute("fill", "freeze"), g.setAttribute("begin", "indefinite"), f.appendChild(h), f.appendChild(g), u.appendChild(f), i.appendChild(u), requestAnimationFrame(() => {
      try {
        h.beginElement(), g.beginElement();
      } catch {
      }
    }), window.setTimeout(() => u.remove(), r + 80);
  }
  updateRipple(i, e, t, n, o, r, s, a, d) {
    const c = Ee(n, e.entity), p = t.ripple_threshold ?? 0;
    if (c === null || Math.abs(c) <= p) {
      this.cancelRippleBurst(e.id, i), this.rippleLastRaw.delete(e.id);
      return;
    }
    if (this.rippleLastRaw.get(e.id) === c) return;
    this.rippleLastRaw.set(e.id, c);
    const u = t.ripple_duration ?? 2e3, f = t.ripple_color || o;
    this.scheduleRippleBurst(e.id, i, s, a, r, u, f, d);
  }
  appendBadge(i, e, t, n, o, r, s, a, d, c, p) {
    const u = e.badge_color_on ?? "#32DC50", f = e.badge_color_off ?? "#CC3333", h = t?.states[n];
    let g = "#888888";
    if (h) if (h.state === "unavailable" || h.state === "unknown") g = "#888888";
    else if (e.threshold !== void 0 && e.threshold !== null) {
      const $ = Ee(t, n);
      g = $ !== null && $ >= e.threshold ? u : f;
    } else {
      const $ = String(h.state).toLowerCase();
      g = $ === "on" || $ === "open" || $ === "true" ? u : f;
    }
    if (p?.setNodeDotBackground) {
      p.setNodeDotBackground(r, g, { transitionMs: 300 });
      return;
    }
    const v = fe(d * 0.6, c), y = s + Math.min(v * 1.1, 3), m = a - Math.min(v * 1.1, 3), w = document.createElementNS(L, "circle");
    w.setAttribute("cx", String(y)), w.setAttribute("cy", String(m)), w.setAttribute("r", String(v)), w.setAttribute("fill", g), w.setAttribute("stroke", "#ffffff"), w.setAttribute("stroke-width", String(0.03)), i.appendChild(w);
  }
  appendAlert(i, e, t, n, o, r, s, a, d, c, p) {
    const u = Ee(t, n);
    if (u === null) return;
    const f = e.alert_threshold ?? 0, h = e.alert_condition ?? "above", g = e.alert_hysteresis ?? 0.05, v = Math.abs(f) * g + 1e-6;
    let y = h === "above" ? u > f : u < f;
    !y && h === "above" && u > f - v && (y = !0), !y && h === "below" && u < f + v && (y = !0);
    const m = e.alert_frequency ?? 2, w = e.alert_color ?? "#FF0000";
    if (!y) {
      p?.setNodeDotBackground && p.setNodeDotBackground(r, o, { transitionMs: 200 });
      return;
    }
    if (p?.setNodeDotBackground) {
      const k = 1e3 / Math.max(0.25, m), S = Math.floor(c / (k / 2)) % 2 === 0;
      p.setNodeDotBackground(r, S ? w : o, { transitionMs: 80 });
      return;
    }
    const $ = document.createElementNS(L, "circle");
    $.setAttribute("cx", String(s)), $.setAttribute("cy", String(a)), $.setAttribute("r", String(d)), $.setAttribute("fill", o), $.setAttribute("opacity", "0.85");
    const M = Math.max(100, Math.round(1e3 / Math.max(0.25, m))), E = document.createElementNS(L, "animate");
    E.setAttribute("attributeName", "fill"), E.setAttribute("values", `${o};${w};${o}`), E.setAttribute("dur", `${M}ms`), E.setAttribute("repeatCount", "indefinite"), $.appendChild(E), i.appendChild($);
  }
}, Jo = 100, Qo = class {
  constructor(i) {
    this.apply = i, this.undoStack = [], this.redoStack = [], this.listeners = /* @__PURE__ */ new Set();
  }
  push(i) {
    if (i.prev !== i.next) {
      for (this.apply(i.next), this.undoStack.push(i); this.undoStack.length > Jo; ) this.undoStack.shift();
      this.redoStack = [], this.notify();
    }
  }
  undo() {
    const i = this.undoStack.pop();
    i && (this.apply(i.prev), this.redoStack.push(i), this.notify());
  }
  redo() {
    const i = this.redoStack.pop();
    i && (this.apply(i.next), this.undoStack.push(i), this.notify());
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
  subscribe(i) {
    return this.listeners.add(i), () => this.listeners.delete(i);
  }
  notify() {
    for (const i of this.listeners) i();
  }
};
function C(i) {
  return JSON.parse(JSON.stringify(i));
}
function D(i) {
  return i < 0 ? 0 : i > 100 ? 100 : i;
}
function Te(i, e = 8) {
  return Math.round(i / e) * e;
}
function er(i) {
  const e = new Set(i.nodes.map((t) => t.id));
  for (let t = 1; t < 1e4; t++) {
    const n = `node_${t}`;
    if (!e.has(n)) return n;
  }
  return `node_${Date.now()}`;
}
function tr(i) {
  const e = new Set(i.flows.map((t) => t.id));
  for (let t = 1; t < 1e4; t++) {
    const n = `flow_${t}`;
    if (!e.has(n)) return n;
  }
  return `flow_${Date.now()}`;
}
function nt(i, e, t) {
  const n = C(i);
  for (const o of n.nodes) o.id === e && (o.position = {
    x: D(t.x),
    y: D(t.y)
  });
  return n;
}
function ir(i, e, t) {
  const n = C(i), o = {
    id: er(i),
    position: {
      x: D(e.x),
      y: D(e.y)
    },
    ...t ? { label: t } : {}
  };
  return n.nodes.push(o), {
    config: n,
    node: o
  };
}
function nr(i, e) {
  const t = C(i);
  return t.nodes = t.nodes.filter((n) => n.id !== e), t.flows = t.flows.filter((n) => n.from_node !== e && n.to_node !== e), t;
}
function or(i, e) {
  const t = C(i);
  for (const n of t.nodes) {
    const o = e.get(n.id);
    o && (n.position = {
      x: D(o.x),
      y: D(o.y)
    });
  }
  return t;
}
function rr(i, e) {
  const t = C(i);
  return t.nodes = t.nodes.filter((n) => !e.has(n.id)), t.flows = t.flows.filter((n) => !e.has(n.from_node) && !e.has(n.to_node)), t;
}
function fi(i, e, t) {
  const n = C(i);
  for (const o of n.nodes) e.has(o.id) && (o.visible = t);
  return n;
}
function sr(i, e, t) {
  const n = i.nodes.find((r) => r.id === t);
  if (!n) return i;
  const o = C(i);
  for (const r of o.nodes) e.has(r.id) && (r.position = {
    ...r.position,
    y: n.position.y
  });
  return o;
}
function ar(i, e, t) {
  const n = i.nodes.find((r) => r.id === t);
  if (!n) return i;
  const o = C(i);
  for (const r of o.nodes) e.has(r.id) && (r.position = {
    ...r.position,
    x: n.position.x
  });
  return o;
}
function gi(i, e, t) {
  const n = C(i);
  for (const o of n.nodes) o.id === e && (t && t.length ? o.label = t : delete o.label);
  return n;
}
function ot(i, e, t, n) {
  const o = C(i);
  for (const r of o.flows)
    if (r.id === e) {
      if (t < 0 || t >= r.waypoints.length) return i;
      r.waypoints[t] = {
        x: D(n.x),
        y: D(n.y)
      };
    }
  return o;
}
function mi(i, e, t, n) {
  const o = C(i);
  for (const r of o.flows) {
    if (r.id !== e) continue;
    const s = Math.max(0, Math.min(r.waypoints.length, t));
    r.waypoints.splice(s, 0, {
      x: D(n.x),
      y: D(n.y)
    });
  }
  return o;
}
function bi(i, e, t) {
  const n = C(i);
  for (const o of n.flows)
    if (o.id === e) {
      if (t < 0 || t >= o.waypoints.length) return i;
      o.waypoints.splice(t, 1);
    }
  return n;
}
function vi(i, e, t, n) {
  const o = C(i), r = {
    id: tr(i),
    from_node: e,
    to_node: t,
    entity: n,
    waypoints: []
  };
  return o.flows.push(r), {
    config: o,
    flow: r
  };
}
function lr(i, e) {
  const t = C(i);
  return t.flows = t.flows.filter((n) => n.id !== e), t;
}
function yi(i, e) {
  const t = C(i);
  return t.background.default = e, t;
}
function cr(i, e) {
  const t = C(i);
  return e && e.length ? t.background.weather_entity = e : delete t.background.weather_entity, t;
}
function dr(i, e) {
  const t = C(i);
  return e && e.length ? t.background.sun_entity = e : delete t.background.sun_entity, t;
}
function pr(i, e) {
  const t = C(i);
  return e ? t.background.transparent = !0 : delete t.background.transparent, t;
}
function ur(i, e) {
  const t = C(i);
  return e === void 0 || !Number.isFinite(e) ? delete t.background.transition_duration : t.background.transition_duration = Math.max(0, Math.floor(e)), t;
}
function wi(i, e, t) {
  const n = C(i), o = n.background.weather_states ?? {};
  return n.background.weather_states = {
    ...o,
    [e]: t
  }, n;
}
function hr(i) {
  const e = C(i), t = e.background.weather_states ?? {};
  let n = 1;
  for (; Object.prototype.hasOwnProperty.call(t, `state_${n}`); ) n += 1;
  const o = `state_${n}`;
  return e.background.weather_states = {
    ...t,
    [o]: ""
  }, e;
}
function fr(i, e) {
  const t = C(i);
  return t.background.weather_states && (delete t.background.weather_states[e], Object.keys(t.background.weather_states).length === 0 && delete t.background.weather_states), t;
}
function gr(i) {
  const e = new Set((i.overlays ?? []).map((t) => t.id));
  for (let t = 1; t < 1e4; t++) {
    const n = `overlay_${t}`;
    if (!e.has(n)) return n;
  }
  return `overlay_${Date.now()}`;
}
function mr(i, e) {
  const t = C(i), n = e.id ?? gr(i), o = {
    ...e,
    id: n,
    position: {
      x: D(e.position.x),
      y: D(e.position.y)
    }
  };
  return t.overlays = [...t.overlays ?? [], o], {
    config: t,
    overlay: o
  };
}
function br(i, e) {
  const t = C(i);
  return t.overlays = (t.overlays ?? []).filter((n) => n.id !== e), t.overlays.length === 0 && delete t.overlays, t;
}
function rt(i, e, t) {
  const n = C(i);
  for (const o of n.overlays ?? []) o.id === e && (o.position = {
    x: D(t.x),
    y: D(t.y)
  });
  return n;
}
function xi(i, e, t) {
  const n = C(i), o = Math.max(2, Math.min(100, t.width)), r = Math.max(2, Math.min(100, t.height));
  for (const s of n.overlays ?? []) s.id === e && (s.size = {
    width: o,
    height: r
  });
  return n;
}
function vr(i, e, t) {
  const n = C(i);
  for (const o of n.overlays ?? []) o.id === e && t && (o.card = t);
  return n;
}
function yr(i, e, t) {
  const n = C(i);
  for (const o of n.overlays ?? []) o.id === e && (t ? delete o.visible : o.visible = !1);
  return n;
}
function wr(i, e, t) {
  const n = C(i);
  for (const o of n.overlays ?? []) if (o.id === e) {
    const r = Math.max(0, Math.min(1, t));
    r === 1 ? delete o.opacity : o.opacity = r;
  }
  return n;
}
function $i(i, e, t) {
  const n = C(i);
  return n.opacity = {
    ...n.opacity,
    [e]: t
  }, n;
}
function xr(i, e, t) {
  const n = C(i);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t === void 0 ? delete r.opacity : r.opacity = t, r;
  }), n;
}
function $r(i, e, t) {
  const n = C(i);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t === void 0 ? delete r.opacity : r.opacity = t, r;
  }), n;
}
function st(i, e, t) {
  const n = C(i);
  return n.defaults = {
    ...n.defaults,
    [e]: t
  }, n;
}
function _r(i, e, t) {
  if (e === t) return i;
  const n = C(i), o = n.background.weather_states;
  if (!o || !(e in o)) return i;
  const r = o[e];
  return r === void 0 ? i : (delete o[e], o[t] = r, n);
}
function kr(i, e, t) {
  const n = C(i);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t === void 0 || t === "corner" ? delete r.line_style : r.line_style = t, r;
  }), n;
}
function _i(i, e, t) {
  const n = C(i);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t === void 0 ? delete r.color : r.color = t, r;
  }), n;
}
function ki(i, e, t) {
  const n = C(i);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t ? delete r.visible : r.visible = !1, r;
  }), n;
}
function Ar(i, e, t) {
  const n = C(i);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t ? delete r.visible : r.visible = !1, r;
  }), n;
}
function Sr(i, e, t) {
  const n = C(i);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t ? delete r.show_label : r.show_label = !1, r;
  }), n;
}
function Cr(i, e, t) {
  const n = C(i);
  return n.nodes = n.nodes.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t ? delete r.show_value : r.show_value = !1, r;
  }), n;
}
function Ai(i, e, t) {
  const n = C(i);
  return t === void 0 ? n.domain_colors && (delete n.domain_colors[e], Object.keys(n.domain_colors).length === 0 && delete n.domain_colors) : n.domain_colors = {
    ...n.domain_colors,
    [e]: t
  }, n;
}
function Fr(i, e, t) {
  const n = t.trim();
  if (!n || n === e) return i;
  const o = i.flows.findIndex((s) => s.id === e);
  if (o < 0 || i.flows.some((s, a) => a !== o && s.id === n)) return i;
  const r = C(i);
  return r.flows = r.flows.map((s) => s.id === e ? {
    ...s,
    id: n
  } : s), r;
}
function Si(i, e, t) {
  const n = t.trim();
  if (!n || n === e) return i;
  const o = i.overlays ?? [], r = o.findIndex((a) => a.id === e);
  if (r < 0 || o.some((a, d) => d !== r && a.id === n)) return i;
  const s = C(i);
  return s.overlays = o.map((a) => a.id === e ? {
    ...a,
    id: n
  } : a), s;
}
function q(i, e, t) {
  const n = C(i);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const r = {
      ...o.animation,
      ...t
    };
    for (const s of Object.keys(r)) r[s] === void 0 && delete r[s];
    if (Object.keys(r).length === 0) {
      const s = { ...o };
      return delete s.animation, s;
    }
    return {
      ...o,
      animation: r
    };
  }), n;
}
function Mr(i, e) {
  const t = C(i);
  return t.flows = t.flows.map((n) => {
    if (n.id !== e) return n;
    const o = { ...n };
    return delete o.animation, o;
  }), t;
}
function Ci(i, e) {
  const t = C(i), n = { ...t.animation };
  for (const o of Object.keys(e)) {
    const r = e[o];
    r === void 0 ? delete n[o] : Object.assign(n, { [o]: r });
  }
  return Object.keys(n).length === 0 ? delete t.animation : t.animation = n, t;
}
function Fi(i, e, t) {
  const n = C(i);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t === void 0 || !Number.isFinite(t) ? delete r.peak_value : r.peak_value = t, r;
  }), n;
}
function Pr(i, e, t) {
  const n = C(i);
  return n.flows = n.flows.map((o) => {
    if (o.id !== e) return o;
    const r = { ...o };
    return t === void 0 || t === "" || t === e ? delete r.label : r.label = t, r;
  }), n;
}
function Nr(i, e) {
  const t = C(i);
  return e ? delete t.pause_when_hidden : t.pause_when_hidden = !1, t;
}
function Rr(i, e, t) {
  const n = C(i), o = n.flows.find((r) => r.id === e);
  return o && (o.value_gradient = t), n;
}
function Er(i, e, t) {
  const n = C(i), o = n.flows.find((r) => r.id === e);
  return o && (o.value_gradient = {
    ...o.value_gradient,
    ...t
  }), n;
}
function Mi(i, e) {
  const t = C(i), n = t.flows.find((o) => o.id === e);
  return n && delete n.value_gradient, t;
}
var Pi = 1, bt = 255;
function Tr(i, e = 8) {
  const t = Math.max(1, Math.floor(e)), n = Math.max(1, Math.ceil(i.width / t)), o = Math.max(1, Math.ceil(i.height / t)), r = new Uint16Array(n * o);
  for (let s = 0; s < o; s++) {
    const a = s * t, d = Math.min(i.height, a + t);
    for (let c = 0; c < n; c++) {
      const p = c * t, u = Math.min(i.width, p + t);
      let f = 0;
      for (let g = a; g < d; g++) {
        const v = g * i.width;
        for (let y = p; y < u; y++) {
          const m = i.data[v + y] ?? 0;
          m > f && (f = m);
        }
      }
      const h = bt - f;
      r[s * n + c] = h < Pi ? Pi : h;
    }
  }
  return {
    cols: n,
    rows: o,
    cellSize: t,
    data: r
  };
}
function Ir(i, e, t) {
  return t * i.cols + e;
}
function Br(i, e, t) {
  return e < 0 || t < 0 || e >= i.cols || t >= i.rows ? bt : i.data[Ir(i, e, t)] ?? bt;
}
function Dr(i, e, t = 480, n = 270) {
  if (i <= 0 || e <= 0) return {
    width: 1,
    height: 1
  };
  const o = Math.min(t / i, n / e, 1);
  return {
    width: Math.max(1, Math.floor(i * o)),
    height: Math.max(1, Math.floor(e * o))
  };
}
function zr(i, e, t) {
  const n = new Uint8ClampedArray(e * t);
  for (let o = 0, r = 0; o < i.length; o += 4, r++) {
    const s = i[o] ?? 0, a = i[o + 1] ?? 0, d = i[o + 2] ?? 0;
    n[r] = 0.2126 * s + 0.7152 * a + 0.0722 * d;
  }
  return n;
}
function Or(i, e, t) {
  const n = new Uint8ClampedArray(i.length);
  for (let r = 0; r < t; r++) {
    const s = r * e;
    for (let a = 0; a < e; a++) {
      const d = i[s + Math.max(0, a - 1)] ?? 0, c = i[s + a] ?? 0, p = i[s + Math.min(e - 1, a + 1)] ?? 0;
      n[s + a] = d + 2 * c + p >> 2;
    }
  }
  const o = new Uint8ClampedArray(i.length);
  for (let r = 0; r < t; r++) {
    const s = r * e, a = Math.max(0, r - 1) * e, d = Math.min(t - 1, r + 1) * e;
    for (let c = 0; c < e; c++) {
      const p = n[a + c] ?? 0, u = n[s + c] ?? 0, f = n[d + c] ?? 0;
      o[s + c] = p + 2 * u + f >> 2;
    }
  }
  return o;
}
function Lr(i, e, t) {
  const n = new Uint8ClampedArray(e * t);
  for (let o = 1; o < t - 1; o++) {
    const r = (o - 1) * e, s = o * e, a = (o + 1) * e;
    for (let d = 1; d < e - 1; d++) {
      const c = i[r + (d - 1)] ?? 0, p = i[r + d] ?? 0, u = i[r + (d + 1)] ?? 0, f = i[s + (d - 1)] ?? 0, h = i[s + (d + 1)] ?? 0, g = i[a + (d - 1)] ?? 0, v = i[a + d] ?? 0, y = i[a + (d + 1)] ?? 0, m = -c - 2 * f - g + u + 2 * h + y, w = -c - 2 * p - u + g + 2 * v + y;
      let $ = Math.sqrt(m * m + w * w);
      $ < 30 && ($ = 0), $ > 255 && ($ = 255), n[s + d] = $;
    }
  }
  return {
    width: e,
    height: t,
    data: n
  };
}
function gn(i, e, t) {
  const n = Dr(e, t), o = document.createElement("canvas");
  o.width = n.width, o.height = n.height;
  const r = o.getContext("2d", { willReadFrequently: !0 });
  if (!r) throw new Error("2D canvas unavailable");
  r.drawImage(i, 0, 0, n.width, n.height);
  try {
    const s = r.getImageData(0, 0, n.width, n.height);
    return {
      width: n.width,
      height: n.height,
      rgba: s.data
    };
  } catch (s) {
    const a = s instanceof Error ? s.message : String(s), d = /* @__PURE__ */ new Error(`Canvas was tainted by cross-origin image (${a}). Serve the background from the same origin or enable CORS.`);
    throw d.cause = s, d;
  }
}
function Hr(i, e, t) {
  const { width: n, height: o, rgba: r } = gn(i, e, t);
  return Lr(Or(zr(r, n, o), n, o), n, o);
}
var Ur = class {
  constructor() {
    this.arr = [];
  }
  push(i) {
    this.arr.push(i), this.bubbleUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return;
    const i = this.arr[0], e = this.arr.pop();
    return this.arr.length > 0 && (this.arr[0] = e, this.sinkDown(0)), i;
  }
  get size() {
    return this.arr.length;
  }
  bubbleUp(i) {
    for (; i > 0; ) {
      const e = i - 1 >> 1;
      if ((this.arr[e]?.f ?? 0) <= (this.arr[i]?.f ?? 0)) return;
      [this.arr[e], this.arr[i]] = [this.arr[i], this.arr[e]], i = e;
    }
  }
  sinkDown(i) {
    const e = this.arr.length;
    for (; ; ) {
      const t = 2 * i + 1, n = 2 * i + 2;
      let o = i;
      if (t < e && (this.arr[t]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = t), n < e && (this.arr[n]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = n), o === i) return;
      [this.arr[o], this.arr[i]] = [this.arr[i], this.arr[o]], i = o;
    }
  }
};
function Wr(i, e, t) {
  const [n, o] = e, [r, s] = t;
  if (n < 0 || o < 0 || n >= i.cols || o >= i.rows || r < 0 || s < 0 || r >= i.cols || s >= i.rows) return null;
  if (n === r && o === s) return [[n, o]];
  const a = i.cols * i.rows, d = new Float32Array(a);
  d.fill(1 / 0);
  const c = new Int16Array(a), p = new Int16Array(a);
  c.fill(-1), p.fill(-1);
  const u = new Uint8Array(a), f = new Uint8Array(a), h = o * i.cols + n;
  d[h] = 0;
  const g = new Ur();
  g.push({
    col: n,
    row: o,
    f: Ni(n, o, r, s)
  });
  const v = [
    [
      1,
      0,
      1
    ],
    [
      -1,
      0,
      2
    ],
    [
      0,
      1,
      3
    ],
    [
      0,
      -1,
      4
    ]
  ];
  for (; g.size > 0; ) {
    const { col: y, row: m } = g.pop(), w = m * i.cols + y;
    if (!f[w]) {
      if (f[w] = 1, y === r && m === s) return jr(i, c, p, t);
      for (const [$, M, E] of v) {
        const k = y + $, S = m + M;
        if (k < 0 || S < 0 || k >= i.cols || S >= i.rows) continue;
        const T = S * i.cols + k;
        if (f[T]) continue;
        const I = Br(i, k, S), z = u[w] && u[w] !== E ? 50 : 0, U = (d[w] ?? 1 / 0) + I + z;
        if (U < (d[T] ?? 1 / 0)) {
          d[T] = U, c[T] = y, p[T] = m, u[T] = E;
          const re = U + Ni(k, S, r, s);
          g.push({
            col: k,
            row: S,
            f: re
          });
        }
      }
    }
  }
  return null;
}
function Ni(i, e, t, n) {
  return Math.abs(i - t) + Math.abs(e - n);
}
function jr(i, e, t, n) {
  const o = [];
  let r = n[0], s = n[1];
  for (; r !== -1 && s !== -1; ) {
    o.push([r, s]);
    const a = s * i.cols + r, d = e[a] ?? -1, c = t[a] ?? -1;
    if (d === r && c === s || (r = d, s = c, r < 0 || s < 0)) break;
  }
  return o.reverse(), o[0]?.[0] === -1 && o.shift(), o;
}
function Vr(i) {
  if (i.length <= 2) return [...i];
  const e = [i[0]];
  for (let t = 1; t < i.length - 1; t++) {
    const n = i[t - 1], o = i[t], r = i[t + 1], s = o[0] - n[0], a = o[1] - n[1], d = r[0] - o[0], c = r[1] - o[1];
    s * c - a * d === 0 && Math.sign(s) === Math.sign(d) && Math.sign(a) === Math.sign(c) || e.push(o);
  }
  return e.push(i[i.length - 1]), e;
}
function Gr(i, e, t) {
  const n = Wr(i, Ri(e, i), Ri(t, i));
  return !n || n.length < 2 ? {
    waypoints: [],
    edgesUsable: !0
  } : {
    waypoints: Vr(n).slice(1, -1).map((o) => qr(o, i)),
    edgesUsable: !0
  };
}
function Ri(i, e) {
  return [Ei(Math.floor(i.x / 100 * e.cols), 0, e.cols - 1), Ei(Math.floor(i.y / 100 * e.rows), 0, e.rows - 1)];
}
function qr(i, e) {
  return {
    x: (i[0] + 0.5) / e.cols * 100,
    y: (i[1] + 0.5) / e.rows * 100
  };
}
function Ei(i, e, t) {
  return i < e ? e : i > t ? t : i;
}
var ze = /* @__PURE__ */ new Map();
async function Ti(i, e = {}) {
  const t = performance.now(), n = e.cellSize ?? 8, o = `${i.imageUrl}|${n}`, r = ze.has(o);
  let s;
  try {
    s = await Yr(o, i.imageUrl, n);
  } catch {
    s = null;
  }
  if (!s) return {
    waypoints: [],
    cached: !1,
    edgesUsable: !1,
    elapsedMs: performance.now() - t
  };
  const { waypoints: a, edgesUsable: d } = Gr(s, i.from, i.to);
  return {
    waypoints: a,
    cached: r,
    edgesUsable: d,
    elapsedMs: performance.now() - t
  };
}
async function Xr(i) {
  if (!i) return null;
  try {
    const e = await mn(i);
    return gn(e, e.naturalWidth, e.naturalHeight);
  } catch {
    return null;
  }
}
function Yr(i, e, t) {
  const n = ze.get(i);
  if (n) return n;
  const o = Zr(e, t).catch((r) => {
    throw ze.delete(i), r;
  });
  return ze.set(i, o), o;
}
async function Zr(i, e) {
  const t = await mn(i);
  await Ii();
  const n = Hr(t, t.naturalWidth, t.naturalHeight);
  return await Ii(), Tr(n, e);
}
function mn(i) {
  return new Promise((e, t) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.decoding = "async", n.onload = () => e(n), n.onerror = () => t(/* @__PURE__ */ new Error(`Failed to load background image: ${i}`)), n.src = i;
  });
}
function Ii() {
  return new Promise((i) => {
    typeof queueMicrotask == "function" ? queueMicrotask(() => setTimeout(i, 0)) : setTimeout(i, 0);
  });
}
var bn = "flowme", Bi = "/local/community/flowme/backgrounds/";
function Kr() {
  return `media-source://media_source/${bn}/.`;
}
function Jr(i) {
  const e = typeof i.media_content_id == "string" ? i.media_content_id : "", t = `media-source://media_source/${bn}/`;
  if (e.startsWith(t)) {
    let o = e.slice(t.length);
    return o.startsWith("./") && (o = o.slice(2)), Bi + o;
  }
  const n = (typeof i.title == "string" ? i.title : "").replace(/^\/+/, "");
  if (n.length > 0) return Bi + n;
}
var vn = `function P(t, n = 8) {
	const s = Math.max(1, Math.floor(n)), r = Math.max(1, Math.ceil(t.width / s)), o = Math.max(1, Math.ceil(t.height / s)), e = new Uint16Array(r * o);
	for (let c = 0; c < o; c++) {
		const l = c * s, a = Math.min(t.height, l + s);
		for (let i = 0; i < r; i++) {
			const f = i * s, w = Math.min(t.width, f + s);
			let u = 0;
			for (let h = l; h < a; h++) {
				const U = h * t.width;
				for (let p = f; p < w; p++) {
					const m = t.data[U + p] ?? 0;
					m > u && (u = m);
				}
			}
			const x = 255 - u;
			e[c * r + i] = x < 1 ? 1 : x;
		}
	}
	return {
		cols: r,
		rows: o,
		cellSize: s,
		data: e
	};
}
function R(t, n, s) {
	return s * t.cols + n;
}
function L(t, n, s) {
	return n < 0 || s < 0 || n >= t.cols || s >= t.rows ? 255 : t.data[R(t, n, s)] ?? 255;
}
var N = class {
	constructor() {
		this.arr = [];
	}
	push(t) {
		this.arr.push(t), this.bubbleUp(this.arr.length - 1);
	}
	pop() {
		if (this.arr.length === 0) return;
		const t = this.arr[0], n = this.arr.pop();
		return this.arr.length > 0 && (this.arr[0] = n, this.sinkDown(0)), t;
	}
	get size() {
		return this.arr.length;
	}
	bubbleUp(t) {
		for (; t > 0;) {
			const n = t - 1 >> 1;
			if ((this.arr[n]?.f ?? 0) <= (this.arr[t]?.f ?? 0)) return;
			[this.arr[n], this.arr[t]] = [this.arr[t], this.arr[n]], t = n;
		}
	}
	sinkDown(t) {
		const n = this.arr.length;
		for (;;) {
			const s = 2 * t + 1, r = 2 * t + 2;
			let o = t;
			if (s < n && (this.arr[s]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = s), r < n && (this.arr[r]?.f ?? 0) < (this.arr[o]?.f ?? 0) && (o = r), o === t) return;
			[this.arr[o], this.arr[t]] = [this.arr[t], this.arr[o]], t = o;
		}
	}
};
function k(t, n, s) {
	const [r, o] = n, [e, c] = s;
	if (r < 0 || o < 0 || r >= t.cols || o >= t.rows || e < 0 || c < 0 || e >= t.cols || c >= t.rows) return null;
	if (r === e && o === c) return [[r, o]];
	const l = t.cols * t.rows, a = new Float32Array(l);
	a.fill(Infinity);
	const i = new Int16Array(l), f = new Int16Array(l);
	i.fill(-1), f.fill(-1);
	const w = new Uint8Array(l), u = new Uint8Array(l), x = o * t.cols + r;
	a[x] = 0;
	const h = new N();
	h.push({
		col: r,
		row: o,
		f: T(r, o, e, c)
	});
	const U = [
		[
			1,
			0,
			1
		],
		[
			-1,
			0,
			2
		],
		[
			0,
			1,
			3
		],
		[
			0,
			-1,
			4
		]
	];
	for (; h.size > 0;) {
		const { col: p, row: m } = h.pop(), y = m * t.cols + p;
		if (!u[y]) {
			if (u[y] = 1, p === e && m === c) return v(t, i, f, s);
			for (const [M, O, S] of U) {
				const b = p + M, C = m + O;
				if (b < 0 || C < 0 || b >= t.cols || C >= t.rows) continue;
				const A = C * t.cols + b;
				if (u[A]) continue;
				const g = L(t, b, C), D = w[y] && w[y] !== S ? 50 : 0, I = (a[y] ?? Infinity) + g + D;
				if (I < (a[A] ?? Infinity)) {
					a[A] = I, i[A] = p, f[A] = m, w[A] = S;
					const F = I + T(b, C, e, c);
					h.push({
						col: b,
						row: C,
						f: F
					});
				}
			}
		}
	}
	return null;
}
function T(t, n, s, r) {
	return Math.abs(t - s) + Math.abs(n - r);
}
function v(t, n, s, r) {
	const o = [];
	let e = r[0], c = r[1];
	for (; e !== -1 && c !== -1;) {
		o.push([e, c]);
		const l = c * t.cols + e, a = n[l] ?? -1, i = s[l] ?? -1;
		if (a === e && i === c || (e = a, c = i, e < 0 || c < 0)) break;
	}
	return o.reverse(), o[0]?.[0] === -1 && o.shift(), o;
}
function z(t, n, s) {
	const r = new Uint8ClampedArray(n * s);
	for (let o = 0, e = 0; o < t.length; o += 4, e++) {
		const c = t[o] ?? 0, l = t[o + 1] ?? 0, a = t[o + 2] ?? 0;
		r[e] = .2126 * c + .7152 * l + .0722 * a;
	}
	return r;
}
function X(t, n, s) {
	const r = new Uint8ClampedArray(t.length);
	for (let e = 0; e < s; e++) {
		const c = e * n;
		for (let l = 0; l < n; l++) {
			const a = t[c + Math.max(0, l - 1)] ?? 0, i = t[c + l] ?? 0, f = t[c + Math.min(n - 1, l + 1)] ?? 0;
			r[c + l] = a + 2 * i + f >> 2;
		}
	}
	const o = new Uint8ClampedArray(t.length);
	for (let e = 0; e < s; e++) {
		const c = e * n, l = Math.max(0, e - 1) * n, a = Math.min(s - 1, e + 1) * n;
		for (let i = 0; i < n; i++) {
			const f = r[l + i] ?? 0, w = r[c + i] ?? 0, u = r[a + i] ?? 0;
			o[c + i] = f + 2 * w + u >> 2;
		}
	}
	return o;
}
function G(t, n, s) {
	const r = new Uint8ClampedArray(n * s);
	for (let o = 1; o < s - 1; o++) {
		const e = (o - 1) * n, c = o * n, l = (o + 1) * n;
		for (let a = 1; a < n - 1; a++) {
			const i = t[e + (a - 1)] ?? 0, f = t[e + a] ?? 0, w = t[e + (a + 1)] ?? 0, u = t[c + (a - 1)] ?? 0, x = t[c + (a + 1)] ?? 0, h = t[l + (a - 1)] ?? 0, U = t[l + a] ?? 0, p = t[l + (a + 1)] ?? 0, m = -i - 2 * u - h + w + 2 * x + p, y = -i - 2 * f - w + h + 2 * U + p;
			let M = Math.sqrt(m * m + y * y);
			M < 30 && (M = 0), M > 255 && (M = 255), r[c + a] = M;
		}
	}
	return {
		width: n,
		height: s,
		data: r
	};
}
function H(t) {
	if (t.length <= 2) return [...t];
	const n = [t[0]];
	for (let s = 1; s < t.length - 1; s++) {
		const r = t[s - 1], o = t[s], e = t[s + 1], c = o[0] - r[0], l = o[1] - r[1], a = e[0] - o[0], i = e[1] - o[1];
		c * i - l * a === 0 && Math.sign(c) === Math.sign(a) && Math.sign(l) === Math.sign(i) || n.push(o);
	}
	return n.push(t[t.length - 1]), n;
}
function d(t, n, s, r, o, e = 8) {
	return W(P(G(X(z(t, n, s), n, s), n, s), e), r, o);
}
function W(t, n, s) {
	const r = k(t, _(n, t), _(s, t));
	return !r || r.length < 2 ? {
		waypoints: [],
		edgesUsable: !0
	} : {
		waypoints: H(r).slice(1, -1).map((o) => j(o, t)),
		edgesUsable: !0
	};
}
function _(t, n) {
	return [E(Math.floor(t.x / 100 * n.cols), 0, n.cols - 1), E(Math.floor(t.y / 100 * n.rows), 0, n.rows - 1)];
}
function j(t, n) {
	return {
		x: (t[0] + .5) / n.cols * 100,
		y: (t[1] + .5) / n.rows * 100
	};
}
function E(t, n, s) {
	return t < n ? n : t > s ? s : t;
}
self.onmessage = (t) => {
	const { rgba: n, width: s, height: r, fromPos: o, toPos: e, cellSize: c } = t.data, l = performance.now();
	try {
		const { waypoints: a, edgesUsable: i } = d(new Uint8ClampedArray(n), s, r, o, e, c ?? 8);
		self.postMessage({
			waypoints: a,
			edgesUsable: i,
			elapsedMs: performance.now() - l
		});
	} catch (a) {
		self.postMessage({
			waypoints: [],
			edgesUsable: !1,
			elapsedMs: performance.now() - l,
			error: a instanceof Error ? a.message : String(a)
		});
	}
};

//# sourceMappingURL=pathfinding.worker-DNFn7c0I.js.map`, Di = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", vn], { type: "text/javascript;charset=utf-8" });
function Qr(i) {
  let e;
  try {
    if (e = Di && (self.URL || self.webkitURL).createObjectURL(Di), !e) throw "";
    const t = new Worker(e, {
      type: "module",
      name: i?.name
    });
    return t.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), t;
  } catch {
    return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(vn), {
      type: "module",
      name: i?.name
    });
  }
}
var ge, Oe, at = "not_configured", es = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".avif"
];
function ts(i) {
  const e = i ?? "16:10", t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return {
    w: 16,
    h: 10
  };
  const n = Number.parseInt(t[1], 10), o = Number.parseInt(t[2], 10);
  return !n || !o ? {
    w: 16,
    h: 10
  } : {
    w: n,
    h: o
  };
}
var R = (ge = class extends ie {
  constructor(...e) {
    super(...e), this.pending = null, this.previewMode = !1, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.errorMessage = "", this.inlineRename = null, this.canUndo = !1, this.nodeLabelInputRef = Y(), this.flowIdInputRef = Y(), this.overlayIdInputRef = Y(), this._pendingInspectorLabelFocus = !1, this.canRedo = !1, this.undoLabel = "", this.redoLabel = "", this.suggestPreview = null, this.suggestBusy = !1, this.flowEndpointPathfindingFlowId = null, this.flowEndpointError = null, this.flowZeroThresholdDraft = {}, this.imageBrowserOpen = !1, this.imageBrowserLoading = !1, this.imageBrowserError = "", this.imageBrowserField = "default", this.imageBrowserFiles = [], this._pathWorkerPending = !1, this._pathPendingSelection = null, this.activeTab = "card", this.canvasCollapsed = !1, this.showAdvanced = {}, this.scale = 1, this.panX = 0, this.panY = 0, this.fitScale = 1, this.fitPanX = 0, this.fitPanY = 0, this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1, this._loadedImageUrl = "", this.spaceHeld = !1, this.panPointerId = null, this.stageRef = Y(), this.canvasRef = Y(), this.editorFxSvgRef = Y(), this.editorNodeFx = new fn(), this._editorFxRaf = null, this.undoStack = new Qo((t) => this.applyConfig(t, !1)), this.unsubscribe = null, this._ownCommit = !1, this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragShiftHeld = !1, this.dragStartPx = null, this.dragMoved = !1, this.onDefaultBgChange = (t) => {
      if (!this.config) return;
      const n = t.target.value, o = this.config, r = yi(o, n);
      this.pushPatch(o, r, "edit default background");
    }, this.onWeatherStateRemove = (t) => {
      if (!this.config) return;
      const n = this.config, o = fr(n, t);
      this.pushPatch(n, o, `remove weather state ${t}`);
    }, this.onWeatherStateAdd = () => {
      if (!this.config) return;
      const t = this.config, n = hr(t), o = t.background.weather_states ?? {}, r = Object.keys(n.background.weather_states ?? {}).find((s) => !(s in o));
      this.pushPatch(t, n, r ? `Add weather state ${r}` : "Add weather state");
    }, this.acceptSuggestion = () => {
      if (!this.config || !this.suggestPreview) return;
      const { fromNodeId: t, toNodeId: n, waypoints: o } = this.suggestPreview, r = window.prompt(l("editor.inspector.flowEntityPrompt"), l("editor.inspector.flowEntityDefault")) ?? l("editor.inspector.flowEntityDefault"), s = this.config, a = s.flows.find((p) => p.from_node === t && p.to_node === n);
      let d, c;
      if (a)
        c = a.id, d = {
          ...s,
          flows: s.flows.map((p) => p.id === a.id ? {
            ...p,
            waypoints: o.map((u) => ({
              x: u.x,
              y: u.y
            }))
          } : p)
        };
      else {
        const { config: p, flow: u } = vi(s, t, n, r);
        c = u.id, d = {
          ...p,
          flows: p.flows.map((f) => f.id === u.id ? {
            ...f,
            waypoints: o.map((h) => ({
              x: h.x,
              y: h.y
            }))
          } : f)
        };
      }
      this.suggestPreview = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedOverlayId = null, this.pushPatch(s, d, `suggest-path ${c}`), this.selectedFlowId = c;
    }, this.cancelSuggestion = () => {
      this.suggestPreview = null;
    }, this.onStageClick = (t) => {
      if (this.config && !t.target?.closest(".handle, .waypoint")) {
        if (this.pending?.kind === "add-node") {
          const n = this.pointerToPercent(t);
          if (!n) return;
          const o = this.config, { config: r, node: s } = ir(o, n, l("editor.inspector.newNodeDefaultLabel"));
          this.pushPatch(o, r, `add node ${s.id}`), this.pending = null;
          return;
        }
        if (this.pending?.kind === "add-overlay") {
          const n = this.pointerToPercent(t);
          if (!n) return;
          const o = {
            type: "custom",
            position: n,
            size: {
              width: 20,
              height: 15
            },
            card: {
              type: "entity",
              entity: "sensor.example_sensor"
            }
          }, r = this.config, { config: s, overlay: a } = mr(r, o);
          this.selectedOverlayId = a.id, this.selectedNodeId = null, this.selectedFlowId = null, this.pushPatch(r, s, `add overlay ${a.id}`), this.pending = null;
          return;
        }
        if (this.pending?.kind === "add-flow") {
          this.pending.step;
          return;
        }
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.activeTab = "card";
      }
    }, this.onStageContextMenu = (t) => {
      this.pending && (t.preventDefault(), this.pending = null);
    }, this.onSegmentClick = (t) => {
      if (t.stopPropagation(), !this.config) return;
      const n = t.currentTarget, o = n.dataset.flowId;
      if (!o) return;
      const r = n.dataset.segmentIndex, s = r !== void 0 ? Number(r) : NaN;
      if (t.shiftKey && Number.isFinite(s)) {
        const a = this.pointerToPercent(t);
        if (!a) return;
        const d = this.config, c = mi(d, o, s, a);
        this.pushPatch(d, c, `add waypoint to ${o}`);
        return;
      }
      this.selectedFlowId = o, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null;
    }, this.onFlowPathDblClick = (t) => {
      if (t.stopPropagation(), t.preventDefault(), !this.config) return;
      const n = t.currentTarget.dataset.flowId;
      n && (this.activeTab = "flows", this.selectedFlowId = n, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null, this._pendingInspectorLabelFocus = !0);
    }, this.onNodeClick = (t) => {
      if (t.stopPropagation(), !this.config) return;
      const n = t.currentTarget.dataset.nodeId;
      if (n && this.pending?.kind === "add-flow") {
        if (this.pending.step === "pick-from") {
          this.pending = {
            kind: "add-flow",
            step: "pick-to",
            fromId: n
          };
          return;
        }
        if (this.pending.step === "pick-to" && this.pending.fromId !== n) {
          const o = window.prompt(l("editor.inspector.flowEntityPrompt"), l("editor.inspector.flowEntityDefault")) ?? l("editor.inspector.flowEntityDefault"), r = this.config, { config: s, flow: a } = vi(r, this.pending.fromId, n, o);
          this.pushPatch(r, s, `add flow ${B(a)}`), this.pending = null;
          return;
        }
      }
    }, this.onOverlayClick = (t) => {
      t.stopPropagation();
      const n = t.currentTarget.dataset.overlayId;
      n && (this.selectedOverlayId = n, this.selectedNodeId = null, this.selectedFlowId = null, this.customConfigDraft = "", this.customConfigError = "");
    }, this.onOverlayContextMenu = (t) => {
      t.preventDefault(), t.stopPropagation();
      const n = t.currentTarget.dataset.overlayId;
      n && window.confirm(l("editor.inspector.deleteOverlayConfirm", n)) && this.removeOverlay(n);
    }, this.onOverlayResizePointerDown = (t) => {
      if (this.previewMode || !this.config) return;
      t.stopPropagation(), t.preventDefault();
      const n = t.currentTarget, o = n.dataset.overlayId;
      if (!o) return;
      const r = (this.config.overlays ?? []).find((a) => a.id === o);
      if (!r) return;
      const s = { ...r.size ?? {
        width: 20,
        height: 15
      } };
      n.setPointerCapture(t.pointerId), this.dragPointerId = t.pointerId, this.dragTarget = {
        kind: "overlay-resize",
        id: o,
        startSize: s,
        startPx: {
          x: t.clientX,
          y: t.clientY
        }
      }, this.dragStartConfig = this.config;
    }, this.onNodeContextMenu = (t) => {
      t.preventDefault(), t.stopPropagation();
      const n = t.currentTarget.dataset.nodeId;
      n && window.confirm(l("editor.inspector.deleteNodeContextConfirm", n)) && this.removeNode(n);
    }, this.onWaypointContextMenu = (t) => {
      if (t.preventDefault(), t.stopPropagation(), !this.config) return;
      const n = t.currentTarget, o = n.dataset.flowId, r = Number(n.dataset.waypointIndex);
      if (!o || !Number.isFinite(r)) return;
      const s = this.config, a = bi(s, o, r);
      this.pushPatch(s, a, `delete waypoint ${r} of ${o}`);
    }, this.stopClick = (t) => {
      t.stopPropagation();
    }, this.onHandlePointerDown = (t) => {
      if (this.previewMode || this.pending || !this.config || this.spaceHeld) return;
      const n = t.currentTarget, o = n.dataset.waypointIndex, r = n.dataset.flowId, s = n.dataset.nodeId, a = n.dataset.overlayId;
      let d = null;
      if (s) if (this.selectedNodeIds.size > 1 && this.selectedNodeIds.has(s)) {
        const c = /* @__PURE__ */ new Map();
        for (const p of this.config.nodes) this.selectedNodeIds.has(p.id) && c.set(p.id, { ...p.position });
        d = {
          kind: "node-bulk",
          ids: Array.from(this.selectedNodeIds),
          startPositions: c,
          startPx: {
            x: t.clientX,
            y: t.clientY
          }
        };
      } else d = {
        kind: "node",
        id: s
      };
      else a && !n.classList.contains("overlay-resize") ? d = {
        kind: "overlay",
        id: a
      } : r && o !== void 0 && (d = {
        kind: "waypoint",
        flowId: r,
        index: Number(o)
      });
      d && (n.setPointerCapture(t.pointerId), this.dragPointerId = t.pointerId, this.dragTarget = d, this.dragStartConfig = this.config, this.dragStartPx = {
        x: t.clientX,
        y: t.clientY
      }, this.dragMoved = !1, this.dragShiftHeld = t.shiftKey);
    }, this.onHandlePointerMove = (t) => {
      if (this.dragPointerId !== t.pointerId || !this.dragTarget || !this.config) return;
      const n = this.dragTarget;
      if (this.dragShiftHeld = t.shiftKey, n.kind === "overlay-resize") {
        const s = this.imageNaturalW > 0 ? this.imageNaturalW : 1, a = this.imageNaturalH > 0 ? this.imageNaturalH : 1, d = (t.clientX - n.startPx.x) / this.scale, c = (t.clientY - n.startPx.y) / this.scale, p = d / s * 100, u = c / a * 100;
        let f = n.startSize.width + p, h = n.startSize.height + u;
        this.dragShiftHeld && (f = Math.round(f), h = Math.round(h)), this.dragMoved = !0, this.config = xi(this.config, n.id, {
          width: f,
          height: h
        });
        return;
      }
      if (!this.dragMoved && this.dragStartPx) {
        const s = t.clientX - this.dragStartPx.x, a = t.clientY - this.dragStartPx.y;
        (Math.abs(s) > 4 || Math.abs(a) > 4) && (this.dragMoved = !0);
      }
      if (!this.dragMoved) return;
      const o = this.pointerToPercent(t);
      if (!o) return;
      const r = this.dragShiftHeld ? {
        x: D(Te(o.x)),
        y: D(Te(o.y))
      } : o;
      if (n.kind === "node") this.config = nt(this.config, n.id, r);
      else if (n.kind === "node-bulk") {
        const s = this.imageNaturalW > 0 ? this.imageNaturalW : 1, a = this.imageNaturalH > 0 ? this.imageNaturalH : 1, d = (t.clientX - n.startPx.x) / this.scale, c = (t.clientY - n.startPx.y) / this.scale, p = d / s * 100, u = c / a * 100, f = /* @__PURE__ */ new Map();
        for (const [h, g] of n.startPositions) {
          const v = this.dragShiftHeld ? Te(g.x + p) : g.x + p, y = this.dragShiftHeld ? Te(g.y + u) : g.y + u;
          f.set(h, {
            x: v,
            y
          });
        }
        this.config = or(this.config, f);
      } else n.kind === "overlay" ? this.config = rt(this.config, n.id, r) : n.kind === "waypoint" && (this.config = ot(this.config, n.flowId, n.index, r));
    }, this.onHandlePointerUp = (t) => {
      if (this.dragPointerId !== t.pointerId) return;
      const n = t.currentTarget;
      n.hasPointerCapture(t.pointerId) && n.releasePointerCapture(t.pointerId);
      const o = this.dragStartConfig, r = this.config, s = this.dragTarget, a = this.dragMoved;
      if (this.dragPointerId = null, this.dragTarget = null, this.dragStartConfig = null, this.dragStartPx = null, this.dragMoved = !1, !s) return;
      if (!a && s.kind === "node") {
        const c = s.id;
        if (this.pending?.kind === "add-flow") return;
        if (t.shiftKey) {
          const p = new Set(this.selectedNodeIds);
          p.has(c) ? p.delete(c) : p.add(c), this.selectedNodeIds = p, this.selectedNodeId = p.size === 1 ? Array.from(p)[0] : null, this.selectedFlowId = null, this.selectedOverlayId = null;
        } else
          this.selectedNodeIds = /* @__PURE__ */ new Set([c]), this.selectedNodeId = c, this.selectedFlowId = null, this.selectedOverlayId = null;
        return;
      }
      if (!a || !o || !r || o === r) return;
      let d;
      switch (s.kind) {
        case "node":
          d = `move node ${s.id}`;
          break;
        case "node-bulk":
          d = `move ${s.ids.length} nodes`;
          break;
        case "overlay":
          d = `move overlay ${s.id}`;
          break;
        case "overlay-resize":
          d = `resize overlay ${s.id}`;
          break;
        default:
          d = s.kind === "waypoint" ? `move waypoint ${s.index} of ${s.flowId}` : "canvas drag";
      }
      this.pushPatch(o, r, d);
    }, this.onKeyDown = (t) => {
      if (t.key === "Escape") {
        this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null, this.selectedFlowId = null, this.selectedOverlayId = null;
        return;
      }
      if (!(t.metaKey || t.ctrlKey)) return;
      const n = t.key.toLowerCase();
      n === "z" && !t.shiftKey ? (t.preventDefault(), t.stopImmediatePropagation(), this.undoStack.undo()) : (n === "z" && t.shiftKey || n === "y") && (t.preventDefault(), t.stopImmediatePropagation(), this.undoStack.redo());
    }, this.onSpaceDown = (t) => {
      t.code === "Space" && !t.repeat && !this.spaceHeld && (this.spaceHeld = !0, t.preventDefault());
    }, this.onSpaceUp = (t) => {
      t.code === "Space" && (this.spaceHeld = !1, this.panPointerId !== null && (this.canvasRef.value?.releasePointerCapture(this.panPointerId), this.panPointerId = null));
    }, this.onCanvasWheel = (t) => {
      t.preventDefault();
      const n = this.canvasRef.value;
      if (!n) return;
      const o = n.getBoundingClientRect(), r = t.clientX - o.left, s = t.clientY - o.top, a = t.deltaY < 0 ? 1.25 : 0.8;
      this.adjustZoom(a, r, s);
    }, this.onCanvasPointerDown = (t) => {
      if (t.button === 1) {
        t.preventDefault(), this.canvasRef.value?.setPointerCapture(t.pointerId), this.panPointerId = t.pointerId;
        return;
      }
      t.button === 0 && this.spaceHeld && (t.preventDefault(), t.stopPropagation(), this.canvasRef.value?.setPointerCapture(t.pointerId), this.panPointerId = t.pointerId);
    }, this.onCanvasPointerMove = (t) => {
      this.panPointerId === t.pointerId && (this.panX += t.movementX, this.panY += t.movementY, this.clampPan());
    }, this.onCanvasPointerUp = (t) => {
      this.panPointerId === t.pointerId && (this.canvasRef.value?.releasePointerCapture(t.pointerId), this.panPointerId = null);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribe = this.undoStack.subscribe(() => this.refreshUndoState()), window.addEventListener("keydown", this.onKeyDown), document.addEventListener("keydown", this.onKeyDown, !0), document.addEventListener("keydown", this.onSpaceDown, !0), document.addEventListener("keyup", this.onSpaceUp, !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._pathWorker?.terminate(), this._pathWorker = void 0, this.unsubscribe?.(), window.removeEventListener("keydown", this.onKeyDown), document.removeEventListener("keydown", this.onKeyDown, !0), document.removeEventListener("keydown", this.onSpaceDown, !0), document.removeEventListener("keyup", this.onSpaceUp, !0), this._canvasResizeObserver?.disconnect(), this._canvasResizeObserver = void 0, this.scale = this.fitScale, this.panX = this.fitPanX, this.panY = this.fitPanY, this.spaceHeld = !1, this.panPointerId = null, this._editorFxRaf !== null && (cancelAnimationFrame(this._editorFxRaf), this._editorFxRaf = null), this.editorNodeFx.reset(), this.imageLayoutReady = !1;
  }
  willUpdate(e) {
    if (super.willUpdate(e), e.has("hass")) {
      const t = this.hass?.language;
      t !== this._lastLanguage && (this._lastLanguage = t, en(t));
    }
  }
  updated(e) {
    super.updated(e), (e.has("selectedNodeId") || e.has("selectedFlowId") || e.has("selectedOverlayId")) && (this.selectedOverlayId ? this.activeTab = "overlays" : this.selectedFlowId ? this.activeTab = "flows" : this.selectedNodeId && (this.activeTab = "nodes")), e.has("selectedFlowId") && (this.flowEndpointError = null);
    const t = this._pendingInspectorLabelFocus;
    t && (this._pendingInspectorLabelFocus = !1), e.has("inlineRename") && this.inlineRename && this.updateComplete.then(() => {
      const n = this.shadowRoot?.querySelector(".inline-rename");
      n?.focus(), n?.select();
    }), t && this.updateComplete.then(() => {
      const n = this.nodeLabelInputRef.value ?? this.flowIdInputRef.value ?? this.overlayIdInputRef.value;
      n?.focus(), n?.select();
    }), this.updateComplete.then(() => {
      const n = this.editorFxSvgRef.value;
      n && this.config && this.hass && this.editorNodeFx.sync(n, this.config, this.hass, performance.now(), this.editorNodeFxHooks()), this.ensureEditorNodeFxRaf();
    });
  }
  toggleAdvanced(e, t) {
    if (this.showAdvanced = {
      ...this.showAdvanced,
      [e]: t
    }, e === "flows" && !t && this.config && this.selectedFlowId) {
      const n = this.selectedFlowId, o = this.config.flows.find((a) => a.id === n), { [n]: r, ...s } = this.flowZeroThresholdDraft;
      if (this.flowZeroThresholdDraft = s, o?.animation?.zero_threshold !== void 0) {
        const a = this.config, d = q(a, n, { zero_threshold: void 0 });
        this.pushPatch(a, d, `advanced closed: clear zero_threshold ${B(o)}`);
      }
    }
  }
  ensureEditorNodeFxRaf() {
    if (!this.config?.nodes.some((t) => t.node_effect && t.visible !== !1)) {
      this._editorFxRaf !== null && (cancelAnimationFrame(this._editorFxRaf), this._editorFxRaf = null);
      return;
    }
    if (this._editorFxRaf !== null) return;
    const e = () => {
      this._editorFxRaf = requestAnimationFrame(e);
      const t = this.editorFxSvgRef.value;
      t && this.config && this.hass && this.editorNodeFx.sync(t, this.config, this.hass, performance.now(), this.editorNodeFxHooks());
    };
    this._editorFxRaf = requestAnimationFrame(e);
  }
  firstUpdated() {
    const e = this.canvasRef.value;
    e && (this._canvasResizeObserver = new ResizeObserver((t) => {
      t[0] && this.recalcFit();
    }), this._canvasResizeObserver.observe(e));
  }
  loadBackgroundImage(e) {
    if (!e) {
      const n = ts(this.config?.aspect_ratio ?? "16:10");
      this.imageNaturalW = n.w * 120, this.imageNaturalH = n.h * 120, this._loadedImageUrl = "", this.recalcFit();
      return;
    }
    if (e === this._loadedImageUrl) return;
    this._loadedImageUrl = e, this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1;
    const t = new Image();
    t.onload = () => {
      this.imageNaturalW = t.naturalWidth || 1600, this.imageNaturalH = t.naturalHeight || 1e3, this.recalcFit();
    }, t.onerror = () => {
      this.imageNaturalW = 0, this.imageNaturalH = 0, this.imageLayoutReady = !1, this.recalcFit();
    }, t.src = e;
  }
  recalcFit() {
    const e = this.canvasRef.value;
    if (!e) return;
    const t = e.offsetWidth - 16, n = e.offsetHeight - 8;
    if (t <= 0 || n <= 0 || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return;
    const o = t / this.imageNaturalW, r = this.imageNaturalH * o, s = 0, a = -(r - n) / 2, d = this.fitScale;
    this.fitScale = o, this.fitPanX = s, this.fitPanY = a, this.imageLayoutReady ? (this.scale === 1 || this.scale === d) && (this.scale = o, this.panX = s, this.panY = a) : (this.scale = o, this.panX = s, this.panY = a, this.imageLayoutReady = !0);
  }
  pct2px(e) {
    return {
      x: e.x / 100 * this.imageNaturalW,
      y: e.y / 100 * this.imageNaturalH
    };
  }
  editorNodeFxHooks() {
    return { getLayoutMetrics: (e) => {
      const t = e.getBoundingClientRect();
      return {
        widthPx: Math.max(1, t.width),
        heightPx: Math.max(1, t.height),
        viewBoxUserWidth: this.imageNaturalW,
        viewBoxUserHeight: this.imageNaturalH
      };
    } };
  }
  setConfig(e) {
    try {
      te(nn(e)), this.config = ve(e), te(this.config.debug ?? !1), this._ownCommit ? this._ownCommit = !1 : (this.savedConfig = this.config, this.undoStack.clear()), this.errorMessage = "";
      const t = this.config?.background?.default ?? "";
      this.loadBackgroundImage(t), this.updateComplete.then(() => this.recalcFit());
    } catch (t) {
      te(!1), this.errorMessage = t instanceof Error ? t.message : String(t);
    }
  }
  render() {
    if (!this.config) return b`
        <div class="wrap">
          <p class="hint">${l("editor.hintNoConfig")}</p>
          ${this.errorMessage ? b`<pre class="error">${this.errorMessage}</pre>` : _}
        </div>
      `;
    const e = this.config.background.default, t = this.selectedNodeIds.size >= 2, n = this.imageLayoutReady && this.imageNaturalW > 0 && this.imageNaturalH > 0;
    return b`
      <div class="wrap">

        <!-- ZONE 1 — Canvas -->
        <div
          class=${`z-canvas${this.canvasCollapsed ? " z-canvas--collapsed" : ""}`}
          role="application"
          aria-label=${l("editor.canvas.ariaLabel")}
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
              class=${`canvas-content${n ? "" : " canvas-content--pending"}`}
              style=${n ? `width: ${this.imageNaturalW}px; height: ${this.imageNaturalH}px; transform: translate(${this.panX}px,${this.panY}px) scale(${this.scale}); transform-origin: 0 0;` : "left:0;top:0;width:100%;height:100%;"}
            >
              ${e ? b`<div
                    class=${`background${n ? "" : " background--pending"}`}
                    style="background-image: url('${e}');"
                  ></div>` : _}
              ${n ? b`
                    <svg
                      class="connectors"
                      viewBox=${`0 0 ${this.imageNaturalW} ${this.imageNaturalH}`}
                      preserveAspectRatio="none"
                    >
                      ${this.config.flows.map((o) => this.renderFlowConnector(o))}
                    </svg>
                    <svg
                      class="node-effects-editor"
                      viewBox=${`0 0 ${this.imageNaturalW} ${this.imageNaturalH}`}
                      preserveAspectRatio="none"
                      ${Z(this.editorFxSvgRef)}
                    ></svg>
                    ${this.config.flows.filter((o) => o.id === this.selectedFlowId).map((o) => this.renderWaypointHandles(o))}
                    ${(this.config.overlays ?? []).map((o) => this.renderOverlayHandle(o))}
                    ${this.config.nodes.map((o) => this.renderHandle(o))}
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
              ${t ? this.renderMultiSelectToolbar() : b`
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
      this.pending = {
        kind: "add-flow",
        step: "pick-from"
      };
    }}
                  >${l("editor.toolbar.addFlow")}</button>
                  <button
                    type="button"
                    class="tb-btn"
                    aria-label=${l("editor.canvas.addOverlayAria")}
                    title=${l("editor.canvas.addOverlayAria")}
                    @click=${() => {
      this.pending = {
        kind: "add-overlay",
        overlayType: "custom"
      };
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

          <!-- Right (35%): Canvas collapse -->
          <div class="tb-col-canvas-toggle">
            <button
              type="button"
              class="tb-btn tb-btn-canvas-toggle"
              aria-expanded=${this.canvasCollapsed ? "false" : "true"}
              @click=${() => {
      this.canvasCollapsed = !this.canvasCollapsed;
    }}
            >
              ${this.canvasCollapsed ? l("editor.canvas.showCanvas") : l("editor.canvas.hideCanvas")}
            </button>
          </div>

        </div>

        <!-- Tab bar -->
        <div class="editor-tab-bar" role="tablist" aria-label=${l("editor.tabs.barAria")}>
          ${[
      ["card", l("editor.tabs.card")],
      ["nodes", l("editor.tabs.nodes")],
      ["flows", l("editor.tabs.flows")],
      ["overlays", l("editor.tabs.overlays")],
      ["settings", l("editor.tabs.settings")]
    ].map(([o, r]) => b`
              <button
                type="button"
                role="tab"
                class=${`editor-tab ${this.activeTab === o ? "editor-tab--active" : ""}`}
                aria-selected=${this.activeTab === o ? "true" : "false"}
                @click=${() => {
      this.activeTab = o;
    }}
              >
                ${r}
              </button>
            `)}
        </div>

        <!-- ZONE 3 — Context panel -->
        <div class="z-context">
          ${this.renderContextPanel()}
        </div>

      </div>
    `;
  }
  renderFlowConnector(e) {
    if (!this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return _;
    const t = new Map(this.config.nodes.map((p) => [p.id, p])), n = t.get(e.from_node), o = t.get(e.to_node);
    if (!n || !o) return _;
    const r = [
      n.position,
      ...e.waypoints,
      o.position
    ], s = e.id === this.selectedFlowId, a = me(r, {
      width: this.imageNaturalW,
      height: this.imageNaturalH
    }, e.line_style ?? "corner");
    if (!a) return _;
    const d = e.color ?? "rgba(255,255,255,0.8)", c = [];
    for (let p = 0; p < r.length - 1; p++) {
      const u = r[p], f = r[p + 1];
      if (!u || !f) continue;
      const h = this.pct2px(u), g = this.pct2px(f);
      c.push(qt`
        <line
          class="segment-hit"
          x1=${h.x}
          y1=${h.y}
          x2=${g.x}
          y2=${g.y}
          data-flow-id=${e.id}
          data-segment-index=${p}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
        />
      `);
    }
    return qt`
      <g>
        ${c}
        <path
          class=${`flow-path ${s ? "selected" : ""}`}
          d=${a}
          data-flow-id=${e.id}
          style=${`stroke: ${d};`}
          @click=${this.onSegmentClick}
          @dblclick=${this.onFlowPathDblClick}
        />
      </g>
    `;
  }
  renderWaypointHandles(e) {
    return e.waypoints.map((t, n) => {
      const o = this.pct2px(t);
      return b`
        <div
          class="waypoint"
          role="button"
          tabindex="0"
          aria-label=${l("aria.waypointHandle", n, B(e))}
          data-flow-id=${e.id}
          data-waypoint-index=${n}
          style=${`left: ${o.x}px; top: ${o.y}px;`}
          @pointerdown=${this.onHandlePointerDown}
          @pointermove=${this.onHandlePointerMove}
          @pointerup=${this.onHandlePointerUp}
          @pointercancel=${this.onHandlePointerUp}
          @contextmenu=${this.onWaypointContextMenu}
          @click=${this.stopClick}
        ></div>
      `;
    });
  }
  renderOverlayHandle(e) {
    const t = e.id === this.selectedOverlayId, n = e.size?.width ?? 14, o = e.size?.height ?? 8, r = this.pct2px(e.position), s = n / 100 * this.imageNaturalW, a = o / 100 * this.imageNaturalH, d = this.inlineRename?.kind === "overlay" && this.inlineRename.id === e.id;
    return b`
      <div
        class=${`overlay-handle overlay-wrapper ${t ? "selected" : ""} overlay-${e.type}`}
        role="button"
        tabindex="0"
        aria-label=${l("aria.overlayHandle", e.id)}
        aria-selected=${t ? "true" : "false"}
        data-overlay-id=${e.id}
        style=${`left: ${r.x}px; top: ${r.y}px; width: ${s}px; height: ${a}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @click=${this.onOverlayClick}
        @contextmenu=${this.onOverlayContextMenu}
      >
        <div class="overlay-label-chip" @dblclick=${(c) => this.onOverlayChipDblClick(c, e)}>
          ${d ? b`<input
                class="inline-rename overlay-inline-rename"
                type="text"
                spellcheck="false"
                .value=${this.inlineRename.draft}
                @input=${(c) => {
      const p = this.inlineRename;
      !p || p.kind !== "overlay" || p.id !== e.id || (this.inlineRename = {
        ...p,
        draft: c.target.value
      });
    }}
                @keydown=${(c) => {
      c.key === "Escape" ? (c.preventDefault(), this.inlineRename = null) : c.key === "Enter" && (c.preventDefault(), this.commitOverlayInlineRename(!0));
    }}
                @blur=${() => {
      this.inlineRename?.kind === "overlay" && this.inlineRename.id === e.id && this.commitOverlayInlineRename(!0);
    }}
              />` : b`<span>${e.id}<span class="overlay-type-badge">${e.type}</span></span>`}
        </div>
        ${t ? b`<div
              class="overlay-resize"
              data-overlay-id=${e.id}
              @pointerdown=${this.onOverlayResizePointerDown}
              @pointermove=${this.onHandlePointerMove}
              @pointerup=${this.onHandlePointerUp}
              @pointercancel=${this.onHandlePointerUp}
            ></div>` : _}
      </div>
    `;
  }
  renderHandle(e) {
    const t = this.selectedNodeIds.has(e.id), n = t && this.selectedNodeIds.size === 1, o = t && this.selectedNodeIds.size > 1, r = t ? Array.from(this.selectedNodeIds).indexOf(e.id) : -1, s = e.visible === !1, a = this.inlineRename?.kind === "node" && this.inlineRename.id === e.id, d = this.pct2px(e.position);
    return b`
      <div
        class=${`handle ${n ? "selected" : ""} ${o ? "multi-selected" : ""} ${t ? "in-selection" : ""} ${s ? "handle-hidden" : ""}`}
        role="button"
        tabindex="0"
        aria-label=${l("aria.nodeHandle", e.label ?? e.id, e.position.x, e.position.y)}
        aria-selected=${t ? "true" : "false"}
        data-node-id=${e.id}
        style=${`left: ${d.x}px; top: ${d.y}px;`}
        @pointerdown=${this.onHandlePointerDown}
        @pointermove=${this.onHandlePointerMove}
        @pointerup=${this.onHandlePointerUp}
        @pointercancel=${this.onHandlePointerUp}
        @contextmenu=${this.onNodeContextMenu}
        @click=${this.onNodeClick}
      >
        <span
          class="handle-dot"
          @dblclick=${(c) => this.onNodeDotDblClick(c, e)}
        ></span>
        ${a ? b`<input
              class="inline-rename"
              type="text"
              spellcheck="false"
              .value=${this.inlineRename.draft}
              @input=${(c) => {
      const p = this.inlineRename;
      !p || p.kind !== "node" || p.id !== e.id || (this.inlineRename = {
        ...p,
        draft: c.target.value
      });
    }}
              @keydown=${(c) => {
      c.key === "Escape" ? (c.preventDefault(), this.inlineRename = null) : c.key === "Enter" && (c.preventDefault(), this.commitNodeInlineRename(!0));
    }}
              @blur=${() => {
      this.inlineRename?.kind === "node" && this.inlineRename.id === e.id && this.commitNodeInlineRename(!0);
    }}
            />` : e.label ? b`<span class="handle-label" @dblclick=${(c) => this.onNodeLabelTextDblClick(c, e)}
                >${e.label}</span
              >` : b`<span class="handle-id" @dblclick=${(c) => this.onNodeLabelTextDblClick(c, e)}
                >${e.id}</span
              >`}
        ${t && this.selectedNodeIds.size >= 2 ? b`<span class="suggest-badge">${r + 1}</span>` : _}
        <button
          type="button"
          class="eye-toggle"
          aria-label=${l(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          title=${l(s ? "editor.inspector.showNode" : "editor.inspector.hideNode")}
          @click=${(c) => {
      if (c.stopPropagation(), !this.config) return;
      const p = this.config, u = ki(p, e.id, s);
      this.pushPatch(p, u, `${s ? "show" : "hide"} node ${e.id}`);
    }}
        >${s ? "◉" : "◎"}</button>
      </div>
    `;
  }
  renderEntityPicker(e, t, n) {
    const o = typeof window < "u" && !!window.customElements && !!window.customElements.get("ha-entity-picker"), r = n?.includeDomains ?? [], s = n?.placeholder ?? l("editor.inspector.entityPickerFallbackPlaceholder");
    if (o) {
      const u = (f) => {
        f.stopPropagation(), t((f.detail?.value ?? "").trim());
      };
      return b`
        <ha-entity-picker
          allow-custom-entity
          .hass=${this.hass}
          .value=${e}
          .includeDomains=${r}
          @value-changed=${u}
        ></ha-entity-picker>
      `;
    }
    const a = this.hass?.states ?? {}, d = `flowme-entities-${Math.random().toString(36).slice(2, 8)}`, c = Object.keys(a).filter((u) => {
      if (r.length === 0) return !0;
      const f = u.split(".")[0];
      return !!f && r.includes(f);
    }).sort();
    return b`
      <input
        type="text"
        list=${d}
        placeholder=${s}
        .value=${e}
        @change=${(u) => {
      t(u.target.value.trim());
    }}
      />
      <datalist id=${d}>
        ${c.map((u) => b`<option value=${u}></option>`)}
      </datalist>
    `;
  }
  renderInspector() {
    if (!this.config) return _;
    if (this.selectedNodeId) {
      const e = this.config.nodes.find((o) => o.id === this.selectedNodeId);
      if (!e) return _;
      const t = (o, r) => {
        if (!this.config) return;
        const s = this.config, a = {
          ...s,
          nodes: s.nodes.map((d) => d.id === e.id ? {
            ...d,
            ...o
          } : d)
        };
        this.pushPatch(s, a, r);
      }, n = this.showAdvanced.nodes === !0;
      return b`
        <div class="inspector">
          <h3>${l("editor.inspector.nodeHeading", e.id)}</h3>
          ${this.renderSectionCard(l("editor.section.nodeBasic"), b`
              <div class="node-row">
                <label class="node-cell">
                  <span class="node-cell-label">${l("editor.inspector.label")}</span>
                  <input
                    type="text"
                    ${Z(this.nodeLabelInputRef)}
                    .value=${e.label ?? ""}
                    @change=${(o) => this.onNodeLabelChange(e.id, o)}
                  />
                </label>
                <label class="node-cell">
                  <span class="node-cell-label">${l("editor.inspector.entity")}</span>
                  ${this.renderEntityPicker(e.entity ?? "", (o) => this.setNodeEntity(e.id, o), { includeDomains: [
        "sensor",
        "binary_sensor",
        "input_number",
        "number"
      ] })}
                </label>
              </div>
              <div class="node-row">
                <label class="node-cell node-cell-toggle">
                  <input
                    type="checkbox"
                    .checked=${e.show_label !== !1}
                    @change=${(o) => {
        if (!this.config) return;
        const r = o.target.checked;
        A("[FlowMe] show_label change:", e.id, "value:", r);
        const s = this.config, a = Sr(s, e.id, r);
        this.pushPatch(s, a, `set show_label of ${e.id}`);
      }}
                  />
                  <span class="node-cell-label">${l("editor.inspector.showLabel")}</span>
                </label>
                <label class="node-cell node-cell-toggle">
                  <input
                    type="checkbox"
                    .checked=${e.show_value !== !1}
                    @change=${(o) => {
        if (!this.config) return;
        const r = o.target.checked;
        A("[FlowMe] show_value change:", e.id, "value:", r);
        const s = this.config, a = Cr(s, e.id, r);
        this.pushPatch(s, a, `set show_value of ${e.id}`);
      }}
                  />
                  <span class="node-cell-label">${l("editor.inspector.showValue")}</span>
                </label>
                <label class="node-cell node-cell-toggle">
                  <input
                    type="checkbox"
                    .checked=${e.visible !== !1}
                    @change=${(o) => {
        if (!this.config) return;
        const r = o.target.checked, s = this.config, a = ki(s, e.id, r);
        this.pushPatch(s, a, `set visible of ${e.id}`);
      }}
                  />
                  <span class="node-cell-label">${l("editor.inspector.visible")}</span>
                </label>
              </div>
            `)}
          ${this.renderSectionCard(l("editor.section.nodeEffect"), this.renderNodeEffectInspector(e, t))}
          <label class="advanced-toggle">
            <input
              type="checkbox"
              .checked=${n}
              @change=${(o) => this.toggleAdvanced("nodes", o.target.checked)}
            />
            ${l("editor.inspector.advancedOptions")}
          </label>
          ${n ? b`
                <div class="advanced-block advanced-block--nested">
                  <label class="node-cell">
                    <span class="node-cell-label">${l("editor.inspector.colour")}</span>
                    <input
                      type="color"
                      .value=${e.color ?? "#ffffff"}
                      @change=${(o) => {
        const r = o.target.value;
        t({ color: r }, `set color of ${e.id}`);
      }}
                    />
                  </label>
                  <div class="node-row">
                    <label class="node-cell">
                      <span class="node-cell-label">${l("editor.inspector.positionX")}</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        .value=${String(Math.round(e.position.x))}
                        @change=${(o) => {
        if (!this.config) return;
        const r = parseFloat(o.target.value);
        if (!Number.isFinite(r)) return;
        const s = this.config, a = nt(s, e.id, {
          x: r,
          y: e.position.y
        });
        this.pushPatch(s, a, `move ${e.id} x`);
      }}
                      />
                    </label>
                    <label class="node-cell">
                      <span class="node-cell-label">${l("editor.inspector.positionY")}</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        .value=${String(Math.round(e.position.y))}
                        @change=${(o) => {
        if (!this.config) return;
        const r = parseFloat(o.target.value);
        if (!Number.isFinite(r)) return;
        const s = this.config, a = nt(s, e.id, {
          x: e.position.x,
          y: r
        });
        this.pushPatch(s, a, `move ${e.id} y`);
      }}
                      />
                    </label>
                    <label class="node-cell">
                      <span class="node-cell-label">${l("editor.inspector.sizePx")}</span>
                      <input
                        type="number"
                        min="4"
                        max="60"
                        step="1"
                        .value=${String(e.size ?? 12)}
                        @change=${(o) => {
        const r = parseInt(o.target.value, 10);
        Number.isFinite(r) && t({ size: r }, `set size of ${e.id}`);
      }}
                      />
                    </label>
                  </div>
                  <label>
                    ${l("editor.inspector.opacity")}
                    <div class="inspector-slider-row">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        .value=${String(e.opacity ?? 1)}
                        @change=${(o) => {
        if (!this.config) return;
        const r = parseFloat(o.target.value);
        if (!Number.isFinite(r)) return;
        const s = this.config, a = xr(s, e.id, r >= 1 ? void 0 : r);
        this.pushPatch(s, a, `set opacity of ${e.id}`);
      }}
                      />
                      <span>${(e.opacity ?? 1).toFixed(2)}</span>
                    </div>
                  </label>
                </div>
              ` : _}
          <div class="node-row">
            <button class="danger" @click=${() => this.removeNode(e.id)}>${l("editor.inspector.deleteNode")}</button>
          </div>
        </div>
      `;
    }
    if (this.selectedFlowId) {
      const e = this.config.flows.find((h) => h.id === this.selectedFlowId);
      if (!e) return _;
      const t = this.config.flows.findIndex((h) => h.id === e.id), n = B(e), o = this.showAdvanced.flows === !0, r = H(e.domain ?? this.config.domain), s = Ve(e, r, this.config), a = r.peak, d = [
        0,
        s.peak * 0.5,
        s.peak
      ].map((h) => `${(Pt(h, s) / 1e3).toFixed(1)}s`), c = this.flowZeroThresholdDraft[e.id];
      let p;
      if (c !== void 0 && c.trim() !== "") {
        const h = parseFloat(c);
        p = Number.isFinite(h) && h > 0 && h <= 100 ? h / 100 : e.animation?.zero_threshold ?? 2e-3;
      } else p = e.animation?.zero_threshold ?? 2e-3;
      const u = e.peak_value ?? r.peak, f = `${l("editor.inspector.zeroThresholdCutoff")} ${(p * u).toFixed(1)}${r.unit_label ? ` ${r.unit_label}` : ""}`;
      return b`
        <div class="inspector">
          <label class="inspector-id-row">
            <span class="node-cell-label">${l("editor.inspector.flowIdField")}</span>
            <input
              type="text"
              spellcheck="false"
              ${Z(this.flowIdInputRef)}
              .value=${e.id}
              @change=${(h) => this.onInspectorFlowIdChange(e.id, h)}
            />
          </label>
          <h3>${l("editor.inspector.flowHeading", B(e))}</h3>
          ${this.renderSectionCard(l("editor.section.flowConnection"), b`
              <div class="field-row">
                <label for="flow-label-${e.id}">${l("editor.inspector.flowLabel")}</label>
                <input
                  id="flow-label-${e.id}"
                  type="text"
                  maxlength="64"
                  placeholder=${e.id}
                  title=${l("editor.inspector.flowLabelPlaceholder")}
                  .value=${e.label ?? ""}
                  @change=${(h) => this.onFlowLabelChange(e.id, h.target.value)}
                />
              </div>
              <div class="field-row flow-endpoint-row">
                <label for=${`flow-from-${e.id}`}>${l("editor.inspector.fromNode")}</label>
                <select
                  id=${`flow-from-${e.id}`}
                  class="flow-endpoint-select"
                  ?disabled=${this.flowEndpointPathfindingFlowId === e.id}
                  .value=${e.from_node}
                  @change=${(h) => {
        const g = h.target.value;
        this.onFlowFromNodeChange(e.id, g);
      }}
                >
                  ${this.config.nodes.map((h) => b`<option value=${h.id} ?selected=${h.id === e.from_node}>${h.label ?? h.id}</option>`)}
                </select>
              </div>
              <div class="field-row flow-endpoint-row">
                <label for=${`flow-to-${e.id}`}>${l("editor.inspector.toNode")}</label>
                <select
                  id=${`flow-to-${e.id}`}
                  class="flow-endpoint-select"
                  ?disabled=${this.flowEndpointPathfindingFlowId === e.id}
                  .value=${e.to_node}
                  @change=${(h) => {
        const g = h.target.value;
        this.onFlowToNodeChange(e.id, g);
      }}
                >
                  ${this.config.nodes.map((h) => b`<option value=${h.id} ?selected=${h.id === e.to_node}>${h.label ?? h.id}</option>`)}
                </select>
              </div>
              ${this.flowEndpointPathfindingFlowId === e.id ? b`<p class="hint-sub flow-endpoint-busy">
                    ${l("editor.toolbar.suggestPathFinding")}
                    <span class="suggest-path-spinner" aria-hidden="true"></span>
                  </p>` : _}
              ${this.flowEndpointError && this.selectedFlowId === e.id ? b`<p class="flow-endpoint-error">${this.flowEndpointError}</p>` : _}
              <label>
                ${l("editor.inspector.entity")}
                ${this.renderEntityPicker(e.entity, (h) => this.setFlowEntity(e.id, h), { includeDomains: [
        "sensor",
        "input_number",
        "number"
      ] })}
              </label>
              <label>
                ${l("editor.inspector.flowVisible")}
                <div class="row">
                  <input
                    type="checkbox"
                    .checked=${e.visible !== !1}
                    @change=${(h) => {
        if (!this.config) return;
        const g = h.target.checked, v = this.config, y = Ar(v, e.id, g);
        this.pushPatch(v, y, `${g ? "show" : "hide"} flow ${n}`);
      }}
                  />
                  <span>${e.visible !== !1 ? l("editor.inspector.shown") : l("editor.inspector.hidden")}</span>
                </div>
              </label>
            `)}
          ${this.renderSectionCard(l("editor.section.flowAnimation"), b`
              <label>
                ${l("editor.inspector.lineStyle")}
                <select
                  .value=${e.line_style ?? "corner"}
                  @change=${(h) => {
        if (!this.config) return;
        const g = h.target.value, v = this.config, y = kr(v, e.id, g);
        this.pushPatch(v, y, `set line style of ${n}`);
      }}
                >
                  ${dt.map((h) => b`<option value=${h} ?selected=${(e.line_style ?? "corner") === h}>${h}</option>`)}
                </select>
              </label>
              ${this.renderAnimationSection(e)}
            `)}
          <label class="advanced-toggle">
            <input
              type="checkbox"
              .checked=${o}
              @change=${(h) => this.toggleAdvanced("flows", h.target.checked)}
            />
            ${l("editor.inspector.advancedOptions")}
          </label>
          ${o ? b`
                <div class="advanced-block advanced-block--nested">
                  <label>
                    ${l("editor.inspector.peakValue")}
                    <input
                      type="number"
                      step="any"
                      min="0"
                      placeholder="${a}"
                      .value=${e.peak_value !== void 0 ? String(e.peak_value) : ""}
                      @change=${(h) => {
        if (!this.config) return;
        const g = h.target.value.trim(), v = this.config;
        if (g === "") {
          const w = Fi(v, e.id, void 0);
          this.pushPatch(v, w, `clear peak_value ${n}`);
          return;
        }
        const y = parseFloat(g);
        if (!Number.isFinite(y) || y <= 0) return;
        const m = Fi(v, e.id, y);
        this.pushPatch(v, m, `set peak_value ${n}`);
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
                      .value=${e.animation?.min_duration !== void 0 ? String(e.animation.min_duration) : ""}
                      @change=${(h) => {
        if (!this.config) return;
        const g = h.target.value.trim(), v = this.config;
        if (g === "") {
          const w = q(v, e.id, { min_duration: void 0 });
          this.pushPatch(v, w, `clear flow min_duration ${n}`);
          return;
        }
        const y = parseInt(g, 10);
        if (!Number.isFinite(y) || y <= 0) return;
        const m = q(v, e.id, { min_duration: y });
        this.pushPatch(v, m, `set flow min_duration ${n}`);
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
                      .value=${e.animation?.max_duration !== void 0 ? String(e.animation.max_duration) : ""}
                      @change=${(h) => {
        if (!this.config) return;
        const g = h.target.value.trim(), v = this.config;
        if (g === "") {
          const w = q(v, e.id, { max_duration: void 0 });
          this.pushPatch(v, w, `clear flow max_duration ${n}`);
          return;
        }
        const y = parseInt(g, 10);
        if (!Number.isFinite(y) || y <= 0) return;
        const m = q(v, e.id, { max_duration: y });
        this.pushPatch(v, m, `set flow max_duration ${n}`);
      }}
                    />
                  </label>
                  <div class="speed-curve-preview inspector-timing-preview">
                    <span>${l("editor.inspector.previewLinearSpeed")}</span>
                    <strong>${d[0]}</strong>
                    /
                    <strong>${d[1]}</strong>
                    /
                    <strong>${d[2]}</strong>
                  </div>
                  <label>
                    ${l("editor.inspector.colourOverride")}
                    <div class="color-row">
                      ${(() => {
        const h = pe(e, H(e.domain ?? this.config.domain), e.domain ?? this.config.domain, 1, this.config.domain_colors, t >= 0 ? t : 0);
        return b`
                          <input
                            type="color"
                            .value=${e.color ?? h}
                            @change=${(g) => {
          if (!this.config) return;
          const v = g.target.value, y = this.config, m = _i(y, e.id, v);
          this.pushPatch(y, m, `set colour of ${n}`);
        }}
                          />
                          <span class="color-effective">${e.color ? l("editor.inspector.colourOverrideActive") : l("editor.inspector.colourDomainDefault")}</span>
                          ${e.color ? b`<button class="ghost" @click=${() => {
          if (!this.config) return;
          const g = this.config, v = _i(g, e.id, void 0);
          this.pushPatch(g, v, `clear colour of ${n}`);
        }}>${l("editor.inspector.clearColour")}</button>` : _}
                        `;
      })()}
                    </div>
                  </label>
                  <div class="field-row advanced-zero-row">
                    <label>
                      ${l("editor.inspector.zeroThreshold")}
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder=${l("editor.inspector.zeroThresholdAuto")}
                        .value=${this.flowZeroThresholdDraft[e.id] !== void 0 ? this.flowZeroThresholdDraft[e.id] : e.animation?.zero_threshold !== void 0 ? (e.animation.zero_threshold * 100).toFixed(1) : ""}
                        @input=${(h) => {
        const g = h.target.value;
        this.flowZeroThresholdDraft = {
          ...this.flowZeroThresholdDraft,
          [e.id]: g
        };
      }}
                        @change=${(h) => {
        if (!this.config) return;
        const g = h.target.value.trim(), v = this.config, y = () => {
          const { [e.id]: $, ...M } = this.flowZeroThresholdDraft;
          this.flowZeroThresholdDraft = M;
        };
        if (g === "") {
          y();
          const $ = q(v, e.id, { zero_threshold: void 0 });
          this.pushPatch(v, $, `clear flow zero_threshold ${n}`);
          return;
        }
        const m = parseFloat(g);
        if (!Number.isFinite(m) || m <= 0 || m > 100) return;
        y();
        const w = q(v, e.id, { zero_threshold: m / 100 });
        this.pushPatch(v, w, `set flow zero_threshold ${n}`);
      }}
                      />
                      <span class="field-hint hint-sub">${f}</span>
                    </label>
                  </div>
                  <label>
                    ${l("editor.inspector.flowOpacity")}
                    <div class="inspector-slider-row">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        .value=${String(e.opacity ?? 1)}
                        @change=${(h) => {
        if (!this.config) return;
        const g = parseFloat(h.target.value);
        if (!Number.isFinite(g)) return;
        const v = this.config, y = $r(v, e.id, g);
        this.pushPatch(v, y, `set opacity of ${n}`);
      }}
                      />
                      <span>${(e.opacity ?? 1).toFixed(2)}</span>
                    </div>
                  </label>
                  ${this.renderWaypointList(e)}
                  ${this.renderValueGradientSection(e)}
                </div>
              ` : _}
          <button class="danger" @click=${() => this.removeFlow(e.id)}>${l("editor.inspector.deleteFlow")}</button>
        </div>
      `;
    }
    if (this.selectedOverlayId) {
      const e = (this.config.overlays ?? []).find((t) => t.id === this.selectedOverlayId);
      return e ? this.renderOverlayInspector(e) : _;
    }
    return _;
  }
  defaultNodeEffect(e) {
    switch (e) {
      case "glow":
        return {
          type: "glow",
          glow_max_radius: 20,
          glow_min_intensity: 0.1,
          peak_value: 1e4
        };
      case "badge":
        return {
          type: "badge",
          badge_color_on: "#32DC50",
          badge_color_off: "#CC3333",
          threshold: null
        };
      case "ripple":
        return {
          type: "ripple",
          ripple_duration: 2e3,
          ripple_threshold: 0
        };
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
  renderNodeEffectPreviewAnim(e) {
    const t = e.color ?? "#4ADE80", n = e.node_effect;
    if (!n) return b`
        <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        </svg>`;
    const o = n.type === "glow" && n.glow_color || t, r = n.type === "ripple" && n.ripple_color || t, s = n.type === "alert" ? n.alert_color ?? "#FF0000" : "#FF0000";
    switch (n.type) {
      case "glow": {
        const a = `fm-ed-glow-${e.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
        return b`
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
        return b`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${t}"/>
            <circle cx="62" cy="38" r="7" fill="${n.badge_color_on ?? "#32DC50"}">
              <animate attributeName="fill" values="${n.badge_color_on ?? "#32DC50"};${n.badge_color_off ?? "#CC3333"};${n.badge_color_on ?? "#32DC50"}" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      case "ripple":
        return b`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${[
          0,
          0.3,
          0.6
        ].map((a) => b`
                <circle cx="50" cy="50" r="14" fill="none" stroke="${r}" stroke-width="2" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0" keyTimes="0;0.05;1" dur="${n.ripple_duration ?? 2e3}ms" begin="${a}s" fill="freeze"/>
                  <animate attributeName="r" values="14;56" dur="${n.ripple_duration ?? 2e3}ms" begin="${a}s" fill="freeze"/>
                </circle>`)}
          </svg>`;
      case "alert":
        return b`
          <svg class="node-effect-preview" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="14" fill="${t}">
              <animate attributeName="fill" values="${t};${s};${t}" dur="250ms" repeatCount="indefinite"/>
            </circle>
          </svg>`;
      default:
        return b`<svg class="node-effect-preview" viewBox="0 0 100 100"></svg>`;
    }
  }
  renderNodeEffectInspector(e, t) {
    const n = e.node_effect, o = n?.type ?? "";
    return b`
      <div class="node-effect-body">
          ${!e.entity && n ? b`<p class="hint-sub">${l("editor.nodeEffect.needsEntity")}</p>` : _}
          <div class="node-effect-type-row">
            ${this.renderNodeEffectPreviewAnim(e)}
            <label class="node-effect-type-label">
              ${l("editor.nodeEffect.type")}
              <select
                .value=${o}
                @change=${(r) => {
      const s = r.target.value;
      if (!s) {
        t({ node_effect: void 0 }, `clear node effect on ${e.id}`);
        return;
      }
      t({ node_effect: this.defaultNodeEffect(s) }, `set node effect on ${e.id}`);
    }}
              >
                <option value="" ?selected=${!n}>${l("editor.nodeEffect.none")}</option>
                <option value="glow" ?selected=${o === "glow"}>${l("editor.nodeEffect.glow")}</option>
                <option value="badge" ?selected=${o === "badge"}>${l("editor.nodeEffect.badge")}</option>
                <option value="ripple" ?selected=${o === "ripple"}>${l("editor.nodeEffect.ripple")}</option>
                <option value="alert" ?selected=${o === "alert"}>${l("editor.nodeEffect.alert")}</option>
              </select>
            </label>
          </div>

          ${n?.type === "glow" ? b`
                <label>${l("editor.nodeEffect.glowColor")}
                  <input type="text" placeholder=${l("editor.inspector.colourDomainDefault")}
                    .value=${n.glow_color ?? ""}
                    @change=${(r) => {
      const s = r.target.value.trim();
      t({ node_effect: {
        ...n,
        glow_color: s || void 0
      } }, `glow color ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.glowMaxRadius")}
                  <input type="number" min="4" max="80" step="1"
                    .value=${String(n.glow_max_radius ?? 20)}
                    @change=${(r) => {
      const s = parseFloat(r.target.value);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        glow_max_radius: s
      } }, `glow radius ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.glowMinIntensity")}
                  <input type="range" min="0" max="1" step="0.05"
                    .value=${String(n.glow_min_intensity ?? 0.1)}
                    @input=${(r) => {
      const s = parseFloat(r.target.value);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        glow_min_intensity: Math.max(0, Math.min(1, s))
      } }, `glow min intensity ${e.id}`);
    }}
                  />
                  <span>${(n.glow_min_intensity ?? 0.1).toFixed(2)}</span>
                </label>
                <label>${l("editor.nodeEffect.peakValue")}
                  <input type="number" min="0" step="any"
                    .value=${String(n.peak_value ?? 1e4)}
                    @change=${(r) => {
      const s = parseFloat(r.target.value);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        peak_value: s
      } }, `glow peak ${e.id}`);
    }}
                  />
                </label>
              ` : _}
          ${n?.type === "badge" ? b`
                <label>${l("editor.nodeEffect.badgeColorOn")}
                  <input type="color"
                    .value=${n.badge_color_on ?? "#32DC50"}
                    @change=${(r) => {
      const s = r.target.value;
      t({ node_effect: {
        ...n,
        badge_color_on: s
      } }, `badge on ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.badgeColorOff")}
                  <input type="color"
                    .value=${n.badge_color_off ?? "#CC3333"}
                    @change=${(r) => {
      const s = r.target.value;
      t({ node_effect: {
        ...n,
        badge_color_off: s
      } }, `badge off ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.threshold")}
                  <input type="number" step="any" placeholder="binary"
                    .value=${n.threshold === null || n.threshold === void 0 ? "" : String(n.threshold)}
                    @change=${(r) => {
      const s = r.target.value.trim(), a = s === "" ? null : parseFloat(s);
      t({ node_effect: {
        ...n,
        threshold: a === null || Number.isNaN(a) ? null : a
      } }, `badge threshold ${e.id}`);
    }}
                  />
                </label>
              ` : _}
          ${n?.type === "ripple" ? b`
                <label>${l("editor.nodeEffect.rippleColor")}
                  <input type="text" placeholder=${l("editor.inspector.colourDomainDefault")}
                    .value=${n.ripple_color ?? ""}
                    @change=${(r) => {
      const s = r.target.value.trim();
      t({ node_effect: {
        ...n,
        ripple_color: s || void 0
      } }, `ripple color ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.rippleDuration")}
                  <input type="number" min="500" max="20000" step="100"
                    .value=${String(n.ripple_duration ?? 2e3)}
                    @change=${(r) => {
      const s = parseInt(r.target.value, 10);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        ripple_duration: s
      } }, `ripple duration ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.rippleThreshold")}
                  <input type="number" step="any"
                    .value=${String(n.ripple_threshold ?? 0)}
                    @change=${(r) => {
      const s = parseFloat(r.target.value);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        ripple_threshold: s
      } }, `ripple threshold ${e.id}`);
    }}
                  />
                </label>
              ` : _}
          ${n?.type === "alert" ? b`
                <label>${l("editor.nodeEffect.alertThreshold")}
                  <input type="number" step="any"
                    .value=${String(n.alert_threshold ?? 0)}
                    @change=${(r) => {
      const s = parseFloat(r.target.value);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        alert_threshold: s
      } }, `alert threshold ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.alertCondition")}
                  <select
                    .value=${n.alert_condition ?? "above"}
                    @change=${(r) => {
      const s = r.target.value;
      t({ node_effect: {
        ...n,
        alert_condition: s
      } }, `alert condition ${e.id}`);
    }}
                  >
                    <option value="above">${l("editor.nodeEffect.above")}</option>
                    <option value="below">${l("editor.nodeEffect.below")}</option>
                  </select>
                </label>
                <label>${l("editor.nodeEffect.alertColor")}
                  <input type="color"
                    .value=${n.alert_color ?? "#FF0000"}
                    @change=${(r) => {
      const s = r.target.value;
      t({ node_effect: {
        ...n,
        alert_color: s
      } }, `alert color ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.alertFrequency")}
                  <input type="number" min="0.25" max="10" step="0.25"
                    .value=${String(n.alert_frequency ?? 2)}
                    @change=${(r) => {
      const s = parseFloat(r.target.value);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        alert_frequency: s
      } }, `alert frequency ${e.id}`);
    }}
                  />
                </label>
                <label>${l("editor.nodeEffect.alertHysteresis")}
                  <input type="number" min="0" max="1" step="0.01"
                    .value=${String(n.alert_hysteresis ?? 0.05)}
                    @change=${(r) => {
      const s = parseFloat(r.target.value);
      Number.isFinite(s) && t({ node_effect: {
        ...n,
        alert_hysteresis: s
      } }, `alert hysteresis ${e.id}`);
    }}
                  />
                </label>
              ` : _}
      </div>
    `;
  }
  renderAnimationSection(e) {
    if (!this.config) return b``;
    const t = e.animation ?? {}, n = t.animation_style ?? "dots", o = (c) => {
      if (!this.config) return;
      const p = this.config, u = q(p, e.id, c);
      this.pushPatch(p, u, `update animation for ${B(e)}`);
    }, r = !(/* @__PURE__ */ new Set([
      "dash",
      "fluid",
      "none"
    ])).has(n), s = n === "trail", a = n === "dash", d = e.color ?? "#4ADE80";
    return b`
      <details class="anim-details" open>
        <summary>${l("editor.inspector.animation")}</summary>
        <div class="anim-body">

          <!-- Live preview strip -->
          <div class="anim-preview-wrap">
            <svg class="anim-preview" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              ${this.renderAnimPreview(n, t, d)}
            </svg>
          </div>

          <label>${l("editor.inspector.style")}
            <select
              .value=${n}
              @change=${(c) => {
      o({ animation_style: c.target.value });
    }}
            >
              ${pt.map((c) => b`<option value=${c} ?selected=${n === c}>${c}</option>`)}
            </select>
          </label>

          ${n === "fluid" ? b`<p class="hint-sub">${l("editor.inspector.fluidIgnoresParticleShape")}</p>` : _}

          ${r ? b`
            <label>${l("editor.inspector.particleShape")}
              <select
                .value=${t.particle_shape ?? "circle"}
                @change=${(c) => {
      o({ particle_shape: c.target.value });
    }}
              >
                ${ut.map((c) => b`<option value=${c} ?selected=${(t.particle_shape ?? "circle") === c}>${c}</option>`)}
              </select>
            </label>
            ${(t.particle_shape ?? "circle") === "custom_svg" ? b`
              <label>${l("editor.inspector.svgPathLabel")}
                <input type="text"
                  placeholder=${l("editor.inspector.svgPathPlaceholder")}
                  .value=${t.custom_svg_path ?? ""}
                  @change=${(c) => {
      o({ custom_svg_path: c.target.value.trim() });
    }}
                />
                <svg class="custom-svg-preview" viewBox="-20 -20 40 40" width="40" height="40"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d=${t.custom_svg_path || "M 0 -8 L 5 8 L -5 8 Z"}
                        fill=${d} />
                </svg>
              </label>
            ` : _}
          ` : _}

          <label>${l("editor.inspector.direction")}
            <select
              .value=${t.direction ?? "auto"}
              @change=${(c) => {
      o({ direction: c.target.value });
    }}
            >
              ${ht.map((c) => b`<option value=${c} ?selected=${(t.direction ?? "auto") === c}>${c}</option>`)}
            </select>
          </label>

          <label>${l("editor.inspector.particleSize")}
            <div class="inspector-slider-row">
              <input type="range" min="0.5" max="3" step="0.1"
                .value=${String(t.particle_size ?? 1)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && o({ particle_size: p });
    }}
              />
              <span>${(t.particle_size ?? 1).toFixed(1)}×</span>
            </div>
          </label>

          <label>${l("editor.inspector.particleCount")}
            <input type="number" min="1" max="20" step="1"
              placeholder=${l("editor.inspector.profileDefaultPlaceholder")}
              .value=${t.particle_count !== void 0 ? String(t.particle_count) : ""}
              @change=${(c) => {
      const p = c.target.value.trim();
      if (p === "") {
        o({ particle_count: void 0 });
        return;
      }
      const u = parseInt(p, 10);
      Number.isFinite(u) && u >= 1 && o({ particle_count: u });
    }}
            />
          </label>

          <label>${l("editor.inspector.particleSpacing")}
            <select
              .value=${t.particle_spacing ?? "even"}
              @change=${(c) => {
      o({ particle_spacing: c.target.value });
    }}
            >
              ${ft.map((c) => b`<option value=${c} ?selected=${(t.particle_spacing ?? "even") === c}>${c}</option>`)}
            </select>
          </label>

          ${t.particle_spacing === "clustered" ? b`
            <label>${l("editor.inspector.clusterSize")}
              <input type="number" min="1" max="10" step="1"
                .value=${String(t.cluster_size ?? 3)}
                @change=${(c) => {
      const p = parseInt(c.target.value, 10);
      Number.isFinite(p) && p >= 1 && o({ cluster_size: p });
    }}
              />
            </label>
            <label>${l("editor.inspector.clusterGap")}
              <input type="number" min="0.5" max="10" step="0.5"
                .value=${String(t.cluster_gap ?? 2)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && o({ cluster_gap: p });
    }}
              />
            </label>
          ` : _}

          ${t.particle_spacing === "pulse" ? b`
            <label>${l("editor.inspector.pulseFrequencyHz")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.pulse_frequency ?? 1)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && o({ pulse_frequency: p });
    }}
              />
            </label>
            <label>${l("editor.inspector.pulseRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="0.9" step="0.05"
                  .value=${String(t.pulse_ratio ?? 0.3)}
                  @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && o({ pulse_ratio: p });
    }}
                />
                <span>${(t.pulse_ratio ?? 0.3).toFixed(2)}</span>
              </div>
            </label>
          ` : _}

          ${t.particle_spacing === "wave_spacing" || t.particle_spacing === "wave_lateral" ? b`
            <label>${l("editor.inspector.waveFrequency")}
              <input type="number" min="0.1" max="10" step="0.1"
                .value=${String(t.wave_frequency ?? 1)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && o({ wave_frequency: p });
    }}
              />
            </label>
            <label>${t.particle_spacing === "wave_lateral" ? l("editor.inspector.waveAmplitudePx") : l("editor.inspector.waveAmplitude01")}
              <input type="number"
                min=${t.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                max=${t.particle_spacing === "wave_lateral" ? "40" : "1"}
                step=${t.particle_spacing === "wave_lateral" ? "1" : "0.05"}
                .value=${String(t.wave_amplitude ?? (t.particle_spacing === "wave_lateral" ? 8 : 0.7))}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && p > 0 && o({ wave_amplitude: p });
    }}
              />
            </label>
          ` : _}

          <label>${l("editor.inspector.glowIntensity")}
            <div class="inspector-slider-row">
              <input type="range" min="0" max="2" step="0.1"
                .value=${String(t.glow_intensity ?? 1)}
                @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && o({ glow_intensity: p });
    }}
              />
              <span>${(t.glow_intensity ?? 1).toFixed(1)}</span>
            </div>
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${t.shimmer === !0}
              @change=${(c) => o({ shimmer: c.target.checked })}
            />
            ${l("editor.inspector.shimmerThreshold")}
          </label>

          <label class="anim-toggle">
            <input type="checkbox"
              .checked=${t.flicker === !0}
              @change=${(c) => o({ flicker: c.target.checked })}
            />
            ${l("editor.inspector.flicker")}
          </label>

          ${s ? b`
            <label>${l("editor.inspector.trailLength")}
              <div class="inspector-slider-row">
                <input type="range" min="0.5" max="6" step="0.25"
                  .value=${String(t.trail_length ?? 2)}
                  @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && o({ trail_length: p });
    }}
                />
                <span>${(t.trail_length ?? 2).toFixed(2)}×</span>
              </div>
            </label>
          ` : _}

          ${a ? b`
            <label>${l("editor.inspector.dashGapRatio")}
              <div class="inspector-slider-row">
                <input type="range" min="0.1" max="3" step="0.1"
                  .value=${String(t.dash_gap ?? 0.5)}
                  @change=${(c) => {
      const p = parseFloat(c.target.value);
      Number.isFinite(p) && o({ dash_gap: p });
    }}
                />
                <span>${(t.dash_gap ?? 0.5).toFixed(1)}</span>
              </div>
            </label>
          ` : _}

          ${e.animation && Object.keys(e.animation).length > 0 ? b`<button class="ghost" @click=${() => {
      if (!this.config) return;
      const c = this.config, p = Mr(c, e.id);
      this.pushPatch(c, p, `reset animation for ${B(e)}`);
    }}>${l("editor.inspector.resetToDefaults")}</button>` : _}
        </div>
      </details>
    `;
  }
  renderAnimPreview(e, t, n) {
    const o = 4 * (t.particle_size ?? 1), r = Math.min(t.particle_count ?? 3, 8);
    if (e === "none") return b`<line x1="10" y1="20" x2="190" y2="20" stroke=${n} stroke-width="2" stroke-opacity="0.3"/>`;
    if (e === "dash") {
      const s = t.dash_gap ?? 0.5, a = 14, d = a * s;
      return b`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${n} stroke-width="3"
          stroke-dasharray="${a} ${d}" stroke-linecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-${a + d}"
            dur="0.8s" repeatCount="indefinite"/>
        </line>
      `;
    }
    return e === "fluid" ? b`
        <line x1="10" y1="20" x2="190" y2="20"
          stroke=${n} stroke-width="6" stroke-dasharray="60 200" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-260" dur="1.2s" repeatCount="indefinite"/>
        </line>
      ` : t.particle_spacing === "wave_lateral" ? b`
        <line x1="10" y1="20" x2="190" y2="20" stroke=${n} stroke-width="1.5" stroke-opacity="0.25"/>
        ${Array.from({ length: r }, (s, a) => (a + 0.5) / r * 180 + 10).map((s, a) => b`
            <circle cx=${s} cy="20" r=${o} fill=${n} opacity="0">
              <animate attributeName="cx" values="${s};190;10;${s}" dur="1.4s"
                repeatCount="indefinite" begin="${(a / r * -1.4).toFixed(2)}s"/>
              <animate attributeName="cy" values="20;${10 + (a % 2 === 0 ? 6 : -6)};20;${10 + (a % 2 === 0 ? -6 : 6)};20"
                dur="1.4s" repeatCount="indefinite" begin="${(a / r * -1.4).toFixed(2)}s"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
                repeatCount="indefinite" begin="${(a / r * -1.4).toFixed(2)}s"/>
            </circle>
          `)}
      ` : b`
      <line x1="10" y1="20" x2="190" y2="20" stroke=${n} stroke-width="1.5" stroke-opacity="0.25"/>
      ${Array.from({ length: r }, (s, a) => (a + 0.5) / r * 180 + 10).map((s, a) => b`
          <circle cx=${s} cy="20" r=${o} fill=${n} opacity="0">
            <animate attributeName="cx" values="${s};190;10;${s}" dur="1.4s"
              repeatCount="indefinite" begin="${(a / r * -1.4).toFixed(2)}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s"
              repeatCount="indefinite" begin="${(a / r * -1.4).toFixed(2)}s"/>
          </circle>
        `)}
    `;
  }
  renderWaypointList(e) {
    if (!this.config) return b``;
    const t = new Map(this.config.nodes.map((s) => [s.id, s])), n = t.get(e.from_node), o = t.get(e.to_node), r = () => {
      if (!this.config) return;
      const s = [
        ...n ? [n.position] : [],
        ...e.waypoints,
        ...o ? [o.position] : []
      ];
      let a = 0, d = 0;
      for (let v = 0; v < s.length - 1; v++) {
        const y = s[v], m = s[v + 1], w = Math.hypot(m.x - y.x, m.y - y.y);
        w > d && (d = w, a = v);
      }
      const c = s[a], p = s[a + 1], u = {
        x: (c.x + p.x) / 2,
        y: (c.y + p.y) / 2
      }, f = a > 0 ? a - 1 + 1 : 0, h = this.config, g = mi(h, e.id, f, u);
      this.pushPatch(h, g, `add waypoint to ${B(e)}`);
    };
    return b`
      <div class="waypoint-section">
        <h4 class="waypoint-section-header">
          ${l("editor.inspector.waypoints")}
          <span class="waypoint-count">${e.waypoints.length}</span>
        </h4>

        ${e.waypoints.length === 0 ? b`<div class="waypoint-empty">${l("editor.inspector.waypointEmpty")}</div>` : b`
            <ul class="waypoint-list">
              ${e.waypoints.map((s, a) => b`
                <li class="waypoint-row">
                  <span class="waypoint-index">${l("editor.inspector.waypointSectionHash")}${a + 1}</span>
                  <label class="waypoint-coord">
                    ${l("editor.inspector.waypointCoordX")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.x.toFixed(1)}
                      @change=${(d) => {
      if (!this.config) return;
      const c = parseFloat(d.target.value);
      if (!Number.isFinite(c)) return;
      const p = this.config, u = ot(p, e.id, a, {
        x: c,
        y: s.y
      });
      this.pushPatch(p, u, `move waypoint ${a} of ${B(e)}`);
    }}
                    />
                  </label>
                  <label class="waypoint-coord">
                    ${l("editor.inspector.waypointCoordY")}
                    <input type="number" min="0" max="100" step="0.5"
                      .value=${s.y.toFixed(1)}
                      @change=${(d) => {
      if (!this.config) return;
      const c = parseFloat(d.target.value);
      if (!Number.isFinite(c)) return;
      const p = this.config, u = ot(p, e.id, a, {
        x: s.x,
        y: c
      });
      this.pushPatch(p, u, `move waypoint ${a} of ${B(e)}`);
    }}
                    />
                  </label>
                  <button type="button" class="icon-btn" aria-label=${l("editor.inspector.deleteWaypointAria", a)} title=${l("editor.inspector.deleteWaypoint")}
                    @click=${() => {
      if (!this.config) return;
      const d = this.config, c = bi(d, e.id, a);
      this.pushPatch(d, c, `delete waypoint ${a} of ${B(e)}`);
    }}
                  >×</button>
                </li>
              `)}
            </ul>
          `}

        <button type="button" class="ghost full-width" aria-label=${l("editor.inspector.addWaypointOnFlowAria")} @click=${r}>
          ${l("editor.inspector.addWaypoint")}
        </button>
      </div>
    `;
  }
  renderValueGradientSection(e) {
    if (!this.config) return b``;
    const t = e.value_gradient, n = {
      entity: "",
      low_value: 0,
      high_value: 100,
      low_color: "#1EB4FF",
      high_color: "#FF4500",
      mode: "both"
    }, o = (s) => {
      if (!this.config) return;
      const a = this.config, d = Er(a, e.id, s);
      this.pushPatch(a, d, `update gradient for ${B(e)}`);
    };
    let r = _;
    if (t && t.low_color && t.high_color) try {
      const s = dn((t.low_value + t.high_value) / 2, t);
      r = b`
          <div class="gradient-preview-bar" style=${`background: linear-gradient(to right, ${t.low_color}, ${s}, ${t.high_color});`}></div>
          <div class="gradient-preview-labels">
            <span>${t.low_color}</span><span>${t.high_color}</span>
          </div>
        `;
    } catch {
    }
    return b`
      <div class="gradient-section">
        <h4 class="gradient-section-header">${l("editor.inspector.valueGradient")}</h4>

        <label class="anim-toggle">
          <input type="checkbox"
            .checked=${!!t}
            @change=${(s) => {
      if (!this.config) return;
      const a = s.target.checked, d = this.config, c = a ? Rr(d, e.id, n) : Mi(d, e.id);
      this.pushPatch(d, c, `${a ? "enable" : "disable"} gradient for ${B(e)}`);
    }}
          />
          ${l("editor.inspector.enableGradient")}
        </label>

        ${t ? b`
          <label>${l("editor.inspector.gradientEntity")}
            <input type="text" placeholder=${l("editor.inspector.gradientEntityPlaceholder")}
              .value=${t.entity}
              @change=${(s) => o({ entity: s.target.value.trim() })}
            />
          </label>

          <div class="gradient-row">
            <label>${l("editor.inspector.lowValue")}
              <input type="number" step="any"
                .value=${String(t.low_value)}
                @change=${(s) => {
      const a = parseFloat(s.target.value);
      Number.isFinite(a) && o({ low_value: a });
    }}
              />
            </label>
            <label>${l("editor.inspector.lowColour")}
              <div class="color-row">
                <input type="color"
                  .value=${t.low_color}
                  @input=${(s) => o({ low_color: s.target.value })}
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
      const a = parseFloat(s.target.value);
      Number.isFinite(a) && o({ high_value: a });
    }}
              />
            </label>
            <label>${l("editor.inspector.highColour")}
              <div class="color-row">
                <input type="color"
                  .value=${t.high_color}
                  @input=${(s) => o({ high_color: s.target.value })}
                />
                <span>${t.high_color}</span>
              </div>
            </label>
          </div>

          <label>${l("editor.inspector.applyGradientTo")}
            <select
              .value=${t.mode ?? "both"}
              @change=${(s) => {
      o({ mode: s.target.value });
    }}
            >
              <option value="flow" ?selected=${t.mode === "flow"}>${l("editor.inspector.gradientModeFlow")}</option>
              <option value="line" ?selected=${t.mode === "line"}>${l("editor.inspector.gradientModeLine")}</option>
              <option value="both" ?selected=${(t.mode ?? "both") === "both"}>${l("editor.inspector.gradientModeBoth")}</option>
            </select>
          </label>

          ${r}

          <button class="ghost" @click=${() => {
      if (!this.config) return;
      const s = this.config, a = Mi(s, e.id);
      this.pushPatch(s, a, `disable gradient for ${B(e)}`);
    }}>${l("editor.inspector.removeGradient")}</button>
        ` : _}
      </div>
    `;
  }
  renderGlobalAnimationPanelInner() {
    if (!this.config) return _;
    const e = this.config.animation ?? {};
    return b`
      <label>
        ${l("editor.inspector.fpsCap")}
        <div class="inspector-slider-row">
          <input type="range" min="10" max="60" step="5"
            .value=${String(e.fps ?? 60)}
            @change=${(t) => {
      if (!this.config) return;
      const n = parseInt(t.target.value, 10), o = this.config, r = Ci(o, { fps: n });
      this.pushPatch(o, r, "set animation fps");
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
      const n = t.target.checked, o = this.config, r = Ci(o, { smooth_speed: n });
      this.pushPatch(o, r, "set smooth_speed");
    }}
        />
        <span class="visibility-label">${l("editor.stateA.smoothSpeed")}</span>
        <span class="visibility-val">${e.smooth_speed !== !1 ? l("editor.inspector.on") : l("editor.inspector.off")}</span>
      </label>
      <p class="hint-sub">${l("editor.inspector.smoothSpeedHint")}</p>
      <label class="visibility-row">
        <input
          type="checkbox"
          .checked=${this.config.pause_when_hidden !== !1}
          @change=${(t) => {
      if (!this.config) return;
      const n = t.target.checked, o = this.config, r = Nr(o, n);
      this.pushPatch(o, r, "set pause_when_hidden");
    }}
        />
        <span class="visibility-label">${l("editor.stateA.pauseWhenHidden")}</span>
        <span class="visibility-val">${this.config.pause_when_hidden !== !1 ? l("editor.inspector.on") : l("editor.inspector.off")}</span>
      </label>
    `;
  }
  renderDebugToggle() {
    return this.config ? b`
      <label class="visibility-row">
        <input
          type="checkbox"
          .checked=${this.config.debug === !0}
          @change=${(e) => {
      if (!this.config) return;
      const t = e.target.checked, n = this.config, o = this.deepCloneConfig(n);
      t ? o.debug = !0 : delete o.debug, this.pushPatch(n, o, "set debug mode");
    }}
        />
        <span class="visibility-label">${l("editor.section.debugMode")}</span>
      </label>
    ` : _;
  }
  renderOverlayInspector(e) {
    const t = e.size ?? {
      width: 20,
      height: 15
    }, n = e.visible !== !1, o = e.opacity ?? 1, r = this.showAdvanced.overlays === !0, s = e.position;
    return b`
      <div class="inspector overlay-inspector">
        <label class="inspector-id-row">
          <span class="node-cell-label">${l("editor.inspector.overlayIdField")}</span>
          <input
            type="text"
            spellcheck="false"
            ${Z(this.overlayIdInputRef)}
            .value=${e.id}
            @change=${(a) => this.onInspectorOverlayIdChange(e.id, a)}
          />
        </label>
        <h3>${l("editor.inspector.overlayHeading", e.id)}</h3>
        ${this.renderSectionCard(l("editor.section.overlayPosition"), b`
            <div class="row size-row">
              <label>
                ${l("editor.inspector.positionX")}
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  .value=${String(Math.round(s.x))}
                  @change=${(a) => {
      if (!this.config) return;
      const d = parseFloat(a.target.value);
      if (!Number.isFinite(d)) return;
      const c = this.config, p = rt(c, e.id, {
        x: d,
        y: s.y
      });
      this.pushPatch(c, p, `move overlay ${e.id} x`);
    }}
                />
              </label>
              <label>
                ${l("editor.inspector.positionY")}
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  .value=${String(Math.round(s.y))}
                  @change=${(a) => {
      if (!this.config) return;
      const d = parseFloat(a.target.value);
      if (!Number.isFinite(d)) return;
      const c = this.config, p = rt(c, e.id, {
        x: s.x,
        y: d
      });
      this.pushPatch(c, p, `move overlay ${e.id} y`);
    }}
                />
              </label>
            </div>
            <div class="row size-row">
              <label>
                ${l("editor.inspector.width")}
                <input
                  type="number"
                  min="2"
                  max="100"
                  step="0.5"
                  .value=${String(t.width)}
                  @change=${(a) => this.onOverlaySizeChange(e.id, "width", a)}
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
                  @change=${(a) => this.onOverlaySizeChange(e.id, "height", a)}
                />
              </label>
            </div>
            <label class="toggle-label">
              ${l("editor.inspector.visible")}
              <input
                type="checkbox"
                .checked=${n}
                @change=${(a) => {
      if (!this.config) return;
      const d = a.target.checked, c = this.config, p = yr(c, e.id, d);
      this.pushPatch(c, p, `toggle overlay ${e.id} visible`);
    }}
              />
            </label>
          `)}
        ${this.renderSectionCard(l("editor.section.overlayCard"), this.renderCardConfigEditor(e))}
        <label class="advanced-toggle">
          <input
            type="checkbox"
            .checked=${r}
            @change=${(a) => this.toggleAdvanced("overlays", a.target.checked)}
          />
          ${l("editor.inspector.advancedOptions")}
        </label>
        ${r ? b`
              <div class="advanced-block advanced-block--nested">
                <label>
                  ${l("editor.inspector.opacity")}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    .value=${String(o)}
                    @change=${(a) => {
      if (!this.config) return;
      const d = parseFloat(a.target.value);
      if (!Number.isFinite(d)) return;
      const c = this.config, p = wr(c, e.id, d);
      this.pushPatch(c, p, `edit overlay ${e.id} opacity`);
    }}
                  />
                  <span>${Math.round(o * 100)}%</span>
                </label>
              </div>
            ` : _}
        <button class="danger" @click=${() => this.removeOverlay(e.id)}>${l("editor.inspector.deleteOverlay")}</button>
      </div>
    `;
  }
  renderCardConfigEditor(e) {
    const t = this.customConfigDraft || JSON.stringify(e.card ?? {
      type: "entity",
      entity: "sensor.example_sensor"
    }, null, 2);
    return b`
      <label>
        ${l("editor.inspector.cardConfig")}
        <textarea
          rows="8"
          spellcheck="false"
          placeholder=${l("editor.inspector.cardConfigPlaceholder")}
          .value=${t}
          @input=${(n) => {
      this.customConfigDraft = n.target.value, this.customConfigError = "";
    }}
        ></textarea>
      </label>
      ${this.customConfigError ? b`<div class="custom-config-error">${this.customConfigError}</div>` : _}
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
  renderOpacityPanelInner() {
    if (!this.config) return _;
    const e = this.config.opacity ?? {}, t = (n, o, r = 1) => {
      const s = e[n] ?? r;
      return b`
        <label class="opacity-row">
          <span class="opacity-label">${o}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            .value=${String(s)}
            @input=${(a) => {
        if (!this.config) return;
        const d = parseFloat(a.target.value);
        if (!Number.isFinite(d)) return;
        const c = this.config, p = $i(c, n, d);
        this.config = p, this.commitToHa(p);
      }}
            @change=${(a) => {
        if (!this.config) return;
        const d = parseFloat(a.target.value);
        if (!Number.isFinite(d)) return;
        const c = this.config, p = $i(c, n, d);
        this.pushPatch(c, p, `set opacity.${n}`);
      }}
          />
          <span class="opacity-val">${s.toFixed(2)}</span>
        </label>
      `;
    };
    return b`
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
    `;
  }
  renderDomainColorsPanelInner() {
    if (!this.config) return _;
    const e = this.config.domain_colors ?? {}, t = this.config.domain ?? "energy", n = Ge[t] ?? Ge.generic, o = (r, s) => {
      const a = `editor.domainRoles.${t}.${r}`, d = l(a);
      return d !== a ? d : s;
    };
    return b`
      <p class="hint-sub">
        ${l("editor.inspector.domainColoursHint")}
      </p>
      ${n.roles.map((r) => {
      const s = e[r.key], a = r.default;
      return b`
          <div class="color-picker-row">
            <span class="color-picker-label">${o(r.key, r.label)}</span>
            <input
              type="color"
              .value=${s ?? a}
              @change=${(d) => {
        if (!this.config) return;
        const c = d.target.value, p = this.config, u = Ai(p, r.key, c);
        this.pushPatch(p, u, `set domain_colors.${r.key}`);
      }}
            />
            <span class="color-picker-value">${s || l("editor.inspector.colourDefaultSuffix", a)}</span>
            ${s ? b`<button class="ghost small" @click=${() => {
        if (!this.config) return;
        const d = this.config, c = Ai(d, r.key, void 0);
        this.pushPatch(d, c, `reset domain_colors.${r.key}`);
      }}>${l("editor.inspector.reset")}</button>` : _}
          </div>
        `;
    })}
    `;
  }
  renderDefaultsPanel(e = "full") {
    if (!this.config) return _;
    const t = this.config.defaults ?? {}, n = Ji(this.config.domain), o = H(n), r = t.peak_value ?? o.peak, s = Math.round(r * 0.5886 * 10) / 10, a = (p, u, f) => {
      const h = t[p] ?? f.defaultVal;
      return b`
        <label class="defaults-row">
          <span class="defaults-label">${u}</span>
          <input
            type="number"
            min=${f.min}
            max=${f.max}
            step=${f.step}
            .value=${String(h)}
            @change=${(g) => {
        if (!this.config) return;
        const v = parseFloat(g.target.value);
        if (!Number.isFinite(v)) return;
        const y = Math.max(f.min, Math.min(f.max, v)), m = this.config, w = st(m, p, y);
        this.pushPatch(m, w, `set defaults.${p}`);
      }}
          />
          <span class="defaults-unit">${h}</span>
        </label>
      `;
    }, d = b`
      ${a("node_radius", l("editor.stateA.nodeRadius"), {
      min: 4,
      max: 40,
      step: 1,
      defaultVal: 12
    })}
      ${a("dot_radius", l("editor.stateA.dotRadius"), {
      min: 2,
      max: 20,
      step: 1,
      defaultVal: 5
    })}
      ${a("line_width", l("editor.stateA.lineWidth"), {
      min: 1,
      max: 10,
      step: 1,
      defaultVal: 2
    })}
    `, c = b`
      ${a("burst_trigger_ratio", l("editor.inspector.burstTriggerRatio"), {
      min: 0.1,
      max: 1,
      step: 0.05,
      defaultVal: 0.9
    })}
      ${a("burst_sustain_ms", l("editor.inspector.burstSustainMs"), {
      min: 1e3,
      max: 3e4,
      step: 500,
      defaultVal: 5e3
    })}
      ${a("burst_max_particles", l("editor.inspector.burstMaxParticles"), {
      min: 3,
      max: 50,
      step: 1,
      defaultVal: 20
    })}
      ${n === "hvac" ? b`
            <div class="dual-unit-row">
              <span class="defaults-label">${l("editor.stateA.peakAirflow")}</span>
              <div class="field-col">
                <label>${l("editor.stateA.peakM3h")}</label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  .value=${String(r)}
                  @input=${(p) => {
      if (!this.config) return;
      const u = parseFloat(p.target.value);
      if (!Number.isFinite(u) || u <= 0) return;
      const f = this.config, h = st(f, "peak_value", u);
      this.pushPatch(f, h, "set defaults.peak_value m³/h");
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
                  .value=${String(s)}
                  @input=${(p) => {
      if (!this.config) return;
      const u = parseFloat(p.target.value);
      if (!Number.isFinite(u) || u <= 0) return;
      const f = Math.round(u * 1.699 * 10) / 10, h = this.config, g = st(h, "peak_value", f);
      this.pushPatch(h, g, "set defaults.peak_value via CFM");
    }}
                />
              </div>
            </div>
          ` : a("peak_value", l("editor.stateA.domainPeakDefault"), {
      min: 1e-4,
      max: 1e9,
      step: 1,
      defaultVal: o.peak
    })}
    `;
    return e === "radii" ? d : e === "burst" ? b`
        <p class="hint-sub">${l("editor.inspector.defaultsHint")}</p>
        ${c}
      ` : b`
      <details class="panel defaults-panel" open>
        <summary>${l("editor.inspector.defaultsSummary")}</summary>
        <div class="panel-body">
          <p class="hint-sub">
            ${l("editor.inspector.defaultsHint")}
          </p>
          ${d}
          ${c}
        </div>
      </details>
    `;
  }
  renderSectionCard(e, t) {
    return b`
      <div class="section-card">
        <div class="section-title">${e}</div>
        ${t}
      </div>
    `;
  }
  renderDomainLayoutCard() {
    if (!this.config) return _;
    const e = this.config.domain ?? "energy", t = this.config.background;
    return b`
      <label class="field-row domain-field">
        <span class="field-label">${l("editor.stateA.domain")}</span>
        <select
          id="flowme-domain-select"
          @change=${(n) => {
      const o = n.target.value;
      this.onDomainChange(o);
    }}
        >
          ${_e.map((n) => b`
              <option value=${n} ?selected=${e === n}>${this.domainOptionLabel(n)}</option>
            `)}
        </select>
      </label>
      <label>
        ${l("editor.stateA.aspectRatio")}
        <input
          type="text"
          spellcheck="false"
          placeholder="16:10"
          .value=${this.config.aspect_ratio ?? ""}
          @change=${(n) => {
      if (!this.config) return;
      const o = n.target.value.trim(), r = this.deepCloneConfig(this.config), s = this.deepCloneConfig(this.config);
      o === "" ? delete s.aspect_ratio : s.aspect_ratio = o, this.pushPatch(r, s, "set aspect_ratio"), this.updateComplete.then(() => this.recalcFit());
    }}
        />
      </label>
      <div class="field-row">
        <label class="field-label">${l("editor.stateA.transparentMode")}</label>
        <div>
          <input
            type="checkbox"
            .checked=${t.transparent ?? !1}
            @change=${(n) => this.onTransparentModeChange(n.target.checked)}
          />
          <p class="field-hint">${l("editor.stateA.transparentModeHelper")}</p>
        </div>
      </div>
    `;
  }
  renderCardTab() {
    return this.config ? b`
      ${this.renderSectionCard(l("editor.section.domainLayout"), this.renderDomainLayoutCard())}
      ${this.renderSectionCard(l("editor.section.background"), this.renderWeatherPanel())}
      ${this.renderSectionCard(l("editor.section.appearance"), b`${this.renderDomainColorsPanelInner()} ${this.renderDefaultsPanel("radii")}`)}
      ${this.renderSectionCard(l("editor.section.layerOpacity"), this.renderOpacityPanelInner())}
      ${this.renderSectionCard(l("editor.section.flowDefaults"), this.renderDefaultsPanel("burst"))}
    ` : b``;
  }
  renderNodeChipPicker() {
    return this.config ? b`
      <div class="chip-picker">
        ${this.config.nodes.map((e) => b`
            <button
              type="button"
              class=${`chip ${this.selectedNodeId === e.id ? "chip--active" : ""}`}
              @click=${() => {
      this.selectedNodeId = e.id, this.selectedNodeIds = /* @__PURE__ */ new Set([e.id]), this.selectedFlowId = null, this.selectedOverlayId = null;
    }}
            >
              <span class="chip-dot" style=${`background:${e.color ?? "#94a3b8"}`}></span>
              ${e.label ?? e.id}
            </button>
          `)}
        <button
          type="button"
          class="chip chip--add"
          @click=${() => {
      this.pending = { kind: "add-node" };
    }}
        >
          + ${l("editor.toolbar.addNode")}
        </button>
      </div>
    ` : b``;
  }
  renderFlowChipPicker() {
    return this.config ? b`
      <div class="chip-picker">
        ${this.config.flows.map((e) => b`
            <button
              type="button"
              class=${`chip ${this.selectedFlowId === e.id ? "chip--active" : ""}`}
              @click=${() => {
      this.selectedFlowId = e.id, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedOverlayId = null;
    }}
            >
              ${B(e)}
            </button>
          `)}
        <button
          type="button"
          class="chip chip--add"
          @click=${() => {
      this.pending = {
        kind: "add-flow",
        step: "pick-from"
      };
    }}
        >
          + ${l("editor.toolbar.addFlow")}
        </button>
      </div>
    ` : b``;
  }
  renderOverlayChipPicker() {
    return this.config ? b`
      <div class="chip-picker">
        ${(this.config.overlays ?? []).map((e, t) => b`
            <button
              type="button"
              class=${`chip ${this.selectedOverlayId === e.id ? "chip--active" : ""}`}
              @click=${() => {
      this.selectedOverlayId = e.id, this.selectedNodeId = null, this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedFlowId = null;
    }}
            >
              ${l("editor.tabs.overlayChip", e.type, t)}
            </button>
          `)}
        <button
          type="button"
          class="chip chip--add"
          @click=${() => {
      this.pending = {
        kind: "add-overlay",
        overlayType: "custom"
      };
    }}
        >
          + ${l("editor.toolbar.addOverlay")}
        </button>
      </div>
    ` : b``;
  }
  renderNodesTab() {
    return this.config ? b`
      ${this.renderNodeChipPicker()}
      ${this.selectedNodeId ? this.renderInspector() : b`<p class="tab-empty-hint">${l("editor.tabs.emptySelection")}</p>`}
    ` : b``;
  }
  renderFlowsTab() {
    return this.config ? b`
      ${this.renderFlowChipPicker()}
      ${this.selectedFlowId ? this.renderInspector() : b`<p class="tab-empty-hint">${l("editor.tabs.emptySelection")}</p>`}
    ` : b``;
  }
  renderOverlaysTab() {
    return this.config ? b`
      ${this.renderOverlayChipPicker()}
      ${this.selectedOverlayId ? this.renderInspector() : b`<p class="tab-empty-hint">${l("editor.tabs.emptySelection")}</p>`}
    ` : b``;
  }
  renderSettingsTab() {
    return b`
      ${this.renderSectionCard(l("editor.section.animationDefaults"), this.renderGlobalAnimationPanelInner())}
      ${this.renderSectionCard(l("editor.section.developer"), this.renderDebugToggle())}
    `;
  }
  renderContextPanel() {
    if (!this.config) return b``;
    switch (this.activeTab) {
      case "card":
        return b`<div class="z-context-body card-tab">${this.renderCardTab()}</div>`;
      case "nodes":
        return b`<div class="z-context-body">${this.renderNodesTab()}</div>`;
      case "flows":
        return b`<div class="z-context-body">${this.renderFlowsTab()}</div>`;
      case "overlays":
        return b`<div class="z-context-body">${this.renderOverlaysTab()}</div>`;
      case "settings":
        return b`<div class="z-context-body">${this.renderSettingsTab()}</div>`;
      default:
        return b``;
    }
  }
  deepCloneConfig(e) {
    return JSON.parse(JSON.stringify(e));
  }
  onDomainChange(e) {
    if (!this.config) return;
    const t = e;
    if (!_e.includes(t)) return;
    const n = this.deepCloneConfig(this.config), o = this.deepCloneConfig(this.config);
    o.domain = t, this.pushPatch(n, o, "Change domain");
  }
  domainOptionLabel(e) {
    return l(`editor.stateA.domainOption.${e}`);
  }
  renderMultiSelectToolbar() {
    const e = this.selectedNodeIds.size;
    if (e < 2) return _;
    const t = this.selectedNodeIds, n = Array.from(t)[0];
    return b`
      <div class="multiselect-toolbar">
        <span class="multiselect-count">${l("editor.inspector.multiselectCount", e)}</span>
        <button
          type="button"
          class="ms-btn ${this.suggestBusy ? "suggest-path-busy" : ""}"
          aria-label=${l("editor.inspector.suggestPathBetweenAria")}
          title=${l(e === 2 ? "editor.inspector.suggestPathBetweenTitle" : "editor.inspector.suggestPathPickTwoTitle")}
          ?disabled=${e !== 2 || this.suggestBusy}
          @click=${() => {
      this.runSuggestPath();
    }}
        >${this.suggestBusy ? b`${l("editor.toolbar.suggestPathFinding")}<span class="suggest-path-spinner" aria-hidden="true"></span>` : l("editor.toolbar.suggestPath")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.hideSelectedNodesAria")} @click=${() => this.bulkHide(t)}>${l("editor.toolbar.hideSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.showSelectedNodesAria")} @click=${() => this.bulkShow(t)}>${l("editor.toolbar.showSelected")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.alignSelectedHorizontalAria")} @click=${() => this.bulkAlignH(t, n)}>${l("editor.toolbar.alignHorizontalShort")}</button>
        <button type="button" class="ms-btn" aria-label=${l("editor.toolbar.alignSelectedVerticalAria")} @click=${() => this.bulkAlignV(t, n)}>${l("editor.toolbar.alignVerticalShort")}</button>
        <button type="button" class="ms-btn danger" aria-label=${l("editor.toolbar.deleteSelectedNodesAria")} @click=${() => this.bulkDelete(t)}>${l("editor.toolbar.deleteSelected")}</button>
        <button type="button" class="ms-btn ghost" aria-label=${l("editor.toolbar.clearMultiSelectionAria")} @click=${() => {
      this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
    }}>${l("editor.toolbar.deselect")}</button>
      </div>
    `;
  }
  bulkHide(e) {
    if (!this.config) return;
    const t = this.config, n = fi(t, e, !1);
    this.pushPatch(t, n, `hide ${e.size} nodes`);
  }
  bulkShow(e) {
    if (!this.config) return;
    const t = this.config, n = fi(t, e, !0);
    this.pushPatch(t, n, `show ${e.size} nodes`);
  }
  bulkAlignH(e, t) {
    if (!this.config) return;
    const n = this.config, o = sr(n, e, t);
    this.pushPatch(n, o, `align ${e.size} nodes horizontally`);
  }
  bulkAlignV(e, t) {
    if (!this.config) return;
    const n = this.config, o = ar(n, e, t);
    this.pushPatch(n, o, `align ${e.size} nodes vertically`);
  }
  bulkDelete(e) {
    if (!this.config || !window.confirm(l("editor.inspector.deleteNodesConfirm", e.size))) return;
    const t = this.config, n = rr(t, e);
    this.pushPatch(t, n, `delete ${e.size} nodes`), this.selectedNodeIds = /* @__PURE__ */ new Set(), this.selectedNodeId = null;
  }
  renderBrowserPanel(e) {
    return b`
      <div class="image-browser">
        ${this.imageBrowserLoading ? b`<div class="browser-loading">${l("editor.stateA.loading")}</div>` : this.imageBrowserError === at ? b`
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
              ` : this.imageBrowserError ? b`<div class="browser-error">${this.imageBrowserError}</div>` : b`
                  <div class="browser-grid">
                    ${this.imageBrowserFiles.map((t) => b`
                        <div
                          class="browser-item ${this.currentImageBrowserTargetUrl(e) === t.url ? "browser-item--selected" : ""}"
                          role="button"
                          tabindex="0"
                          @click=${() => this.selectBgImage(t.url)}
                          @keydown=${(n) => {
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this.selectBgImage(t.url));
    }}
                        >
                          <img
                            src=${t.thumbnail}
                            loading="lazy"
                            alt=${t.name}
                            @error=${(n) => this.onBrowserThumbError(n, t)}
                          />
                          <span class="browser-name">${t.name}</span>
                        </div>
                      `)}
                  </div>
                `}
      </div>
    `;
  }
  onBrowserThumbError(e, t) {
    const n = e.target;
    n.dataset.flowmeThumbFallback !== "1" && (n.dataset.flowmeThumbFallback = "1", n.src = t.url);
  }
  renderWeatherPanel() {
    if (!this.config) return _;
    const e = this.config.background, t = Object.entries(e.weather_states ?? {}), n = e.weather_entity && this.hass ? this.hass.states[e.weather_entity]?.state : void 0, o = this.showAdvanced.weatherMaps === !0;
    return b`
      <div class="weather-body">
          <label>
            ${l("editor.inspector.defaultImageUrl")}
            <div class="bg-url-row">
              <input
                type="text"
                class="bg-url-input"
                .value=${e.default}
                @change=${this.onDefaultBgChange}
                placeholder=${l("editor.inspector.defaultBgPlaceholder")}
              />
              <button
                type="button"
                class="tb-icon-btn"
                title=${l("editor.stateA.browseImages")}
                aria-label=${l("editor.stateA.browseImages")}
                @click=${(r) => {
      r.stopPropagation(), this.openImageBrowser("default");
    }}
              >
                📁
              </button>
            </div>
            ${this.imageBrowserOpen && this.imageBrowserField === "default" ? this.renderBrowserPanel(e) : _}
            ${e.default ? b`<img class="weather-thumb" src=${e.default} alt=${l("editor.inspector.defaultBgAlt")} />` : _}
          </label>
          <label>
            ${l("editor.inspector.weatherEntityOptional")}
            ${this.renderEntityPicker(e.weather_entity ?? "", (r) => this.setWeatherEntityValue(r), {
      includeDomains: ["weather"],
      placeholder: l("editor.inspector.weatherPlaceholder")
    })}
          </label>
          ${n !== void 0 ? b`<div class="weather-live-state">
                ${l("editor.inspector.currentState")} <strong>${n}</strong>
                ${e.weather_states?.[n] ? b` → <span class="weather-match-ok">${l("editor.inspector.weatherMatched")}</span>` : b` → <span class="weather-match-miss">${l("editor.inspector.weatherNoMapping")}</span>`}
              </div>` : _}
          <label>
            ${l("editor.inspector.sunEntityOptional")}
            ${this.renderEntityPicker(e.sun_entity ?? "", (r) => {
      if (!this.config) return;
      const s = this.config, a = dr(s, r || void 0);
      this.pushPatch(s, a, "set sun entity");
    }, {
      includeDomains: ["sun"],
      placeholder: l("editor.inspector.sunPlaceholder")
    })}
          </label>
          ${e.sun_entity && this.hass?.states[e.sun_entity] ? b`<div class="weather-live-state">
                ${l("editor.inspector.sunStateLabel")} <strong>${this.hass.states[e.sun_entity]?.state === "above_horizon" ? l("editor.inspector.sunAbove") : l("editor.inspector.sunBelow")}</strong>
              </div>` : _}
          <label>
            ${l("editor.inspector.fadeTransitionSeconds")}
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              .value=${String(Math.round((e.transition_duration ?? 5e3) / 1e3))}
              @change=${(r) => {
      if (!this.config) return;
      const s = parseFloat(r.target.value);
      if (!Number.isFinite(s) || s < 0) return;
      const a = this.config, d = ur(a, s * 1e3);
      this.pushPatch(a, d, "set background transition duration");
    }}
            />
          </label>
          <label class="advanced-toggle weather-mappings-toggle">
            <input
              type="checkbox"
              .checked=${o}
              @change=${(r) => this.toggleAdvanced("weatherMaps", r.target.checked)}
            />
            ${l("editor.background.showWeatherMappings")}
          </label>
          ${o ? b`
                <div class="weather-states">
                  ${t.map(([r, s]) => b`
                      <div class="weather-state-block" data-key=${r}>
                        <div class="weather-state-row">
                          <input
                            type="text"
                            list="flowme-weather-states"
                            class="weather-state-label-input"
                            .value=${r}
                            @change=${(a) => this.onWeatherStateKeyChange(r, a)}
                          />
                          <input
                            type="text"
                            class="bg-url-input weather-state-url"
                            .value=${s}
                            @change=${(a) => this.onWeatherStateUrlChange(r, a)}
                            placeholder=${l("editor.inspector.weatherRowPlaceholder")}
                          />
                          <button
                            type="button"
                            class="tb-icon-btn weather-state-icon-btn"
                            title=${l("editor.stateA.browseImages")}
                            aria-label=${l("editor.stateA.browseImages")}
                            @click=${(a) => {
      a.stopPropagation(), this.openImageBrowser("weather", r);
    }}
                          >
                            📁
                          </button>
                          <button
                            type="button"
                            class="ghost weather-state-delete"
                            @click=${() => this.onWeatherStateRemove(r)}
                          >
                            ${l("editor.inspector.remove")}
                          </button>
                        </div>
                        ${this.imageBrowserOpen && this.imageBrowserField === "weather" && this.imageBrowserWeatherState === r ? this.renderBrowserPanel(e) : _}
                      </div>
                    `)}
                  <datalist id="flowme-weather-states">
                    ${Oe.KNOWN_WEATHER_STATES.map((r) => b`<option value=${r}></option>`)}
                  </datalist>
                  <button class="add-state" @click=${this.onWeatherStateAdd}>${l("editor.inspector.addWeatherState")}</button>
                </div>
                <details class="hint-details">
                  <summary>${l("editor.inspector.metNoReferenceSummary")}</summary>
                  <div class="hint-states">
                    ${Oe.KNOWN_WEATHER_STATES.map((r) => b`<code>${r}</code>`)}
                    <p class="hint-sub">
                      ${l("editor.inspector.metNoHint")}
                    </p>
                  </div>
                </details>
              ` : _}
        </div>
    `;
  }
  currentImageBrowserTargetUrl(e) {
    return this.imageBrowserField === "weather" && this.imageBrowserWeatherState ? e.weather_states?.[this.imageBrowserWeatherState] ?? "" : e.default ?? "";
  }
  async openImageBrowser(e, t) {
    if (this.imageBrowserOpen && this.imageBrowserField === e && (e === "default" || this.imageBrowserWeatherState === t)) {
      this.imageBrowserOpen = !1, this.requestUpdate();
      return;
    }
    this.imageBrowserOpen = !0, this.imageBrowserField = e, this.imageBrowserWeatherState = t, this.imageBrowserError = "", this.imageBrowserFiles = [], this.imageBrowserLoading = !0, this.requestUpdate();
    const n = this.hass;
    if (!n || typeof n.callWS != "function") {
      this.imageBrowserLoading = !1, this.imageBrowserError = l("editor.stateA.browserUnavailable"), this.requestUpdate();
      return;
    }
    try {
      const o = (await n.callWS({
        type: "media_source/browse_media",
        media_content_id: Kr()
      }))?.children ?? [], r = [];
      for (const s of o) {
        const a = s && typeof s == "object" ? s : {};
        on() && A("[FlowMe] media item:", JSON.stringify(a, null, 2));
        const d = String(a.media_content_id ?? "").toLowerCase();
        if (!es.some((u) => d.endsWith(u))) continue;
        const c = Jr(a);
        if (!c) continue;
        const p = (typeof a.title == "string" && a.title.length > 0 ? a.title : void 0) ?? (typeof a.media_content_id == "string" ? a.media_content_id : void 0) ?? c;
        r.push({
          name: p,
          url: c,
          thumbnail: c
        });
      }
      r.length === 0 && !o.length ? (this.imageBrowserError = at, this.imageBrowserFiles = []) : this.imageBrowserFiles = r;
    } catch {
      this.imageBrowserError = at, this.imageBrowserFiles = [];
    } finally {
      this.imageBrowserLoading = !1, this.requestUpdate();
    }
  }
  selectBgImage(e) {
    if (!this.config) return;
    const t = this.config;
    let n, o;
    this.imageBrowserField === "weather" && this.imageBrowserWeatherState ? (n = wi(t, this.imageBrowserWeatherState, e), o = "Set weather state image") : (n = yi(t, e), o = "Set background image"), this.pushPatch(t, n, o), this.imageBrowserOpen = !1, this.imageBrowserField = "default", this.imageBrowserWeatherState = void 0;
  }
  setWeatherEntityValue(e) {
    if (!this.config) return;
    const t = e.trim(), n = this.config, o = cr(n, t || void 0);
    this.pushPatch(n, o, "edit weather entity");
  }
  onTransparentModeChange(e) {
    if (!this.config) return;
    const t = this.deepCloneConfig(this.config), n = pr(t, e);
    this.pushPatch(t, n, e ? "Enable transparent mode" : "Disable transparent mode");
  }
  onWeatherStateKeyChange(e, t) {
    if (!this.config) return;
    const n = t.target.value.trim();
    if (!n || n === e) return;
    const o = this.config, r = _r(o, e, n);
    r !== o && this.pushPatch(o, r, `rename weather state ${e}→${n}`);
  }
  onWeatherStateUrlChange(e, t) {
    if (!this.config) return;
    const n = t.target.value, o = this.config, r = wi(o, e, n);
    this.pushPatch(o, r, `edit weather image ${e}`);
  }
  initPathWorker() {
    if (!(this._pathWorker || typeof Worker > "u")) {
      try {
        this._pathWorker = new Qr();
      } catch (e) {
        console.error("[FlowMe] worker init failed:", e), this._pathWorker = void 0;
        return;
      }
      this._pathWorker.onmessage = (e) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const t = this._pathPendingSelection;
        if (this._pathPendingSelection = null, !t || !this.config) return;
        const n = e.data;
        if (n.error) {
          console.error("[FlowMe] pathfinding worker error:", n.error), this.runPathfindingMainThread(t.fromId, t.toId, { logFallback: !0 });
          return;
        }
        this.applySuggestPathWorkerResult({
          waypoints: n.waypoints ?? [],
          edgesUsable: n.edgesUsable ?? !1,
          elapsedMs: n.elapsedMs ?? 0
        }, t.fromId, t.toId);
      }, this._pathWorker.onerror = (e) => {
        this._pathWorkerPending = !1, this.suggestBusy = !1;
        const t = this._pathPendingSelection;
        this._pathPendingSelection = null, console.error("[FlowMe] pathfinding worker error:", e), t && this.runPathfindingMainThread(t.fromId, t.toId, { logFallback: !0 });
      };
    }
  }
  applySuggestPathWorkerResult(e, t, n) {
    if (!e.edgesUsable) {
      this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
      return;
    }
    this.suggestPreview = {
      fromNodeId: t,
      toNodeId: n,
      waypoints: e.waypoints,
      edgesUsable: e.edgesUsable,
      elapsedMs: e.elapsedMs
    };
  }
  async runPathfindingMainThread(e, t, n) {
    if (!this.config) return;
    n?.logFallback && A("falling back to main thread pathfinding");
    const o = this.config.nodes.find((s) => s.id === e), r = this.config.nodes.find((s) => s.id === t);
    if (!(!o || !r)) {
      this.suggestBusy = !0;
      try {
        const s = await Ti({
          imageUrl: this.config.background.default,
          from: o.position,
          to: r.position
        });
        if (!s.edgesUsable) {
          this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
          return;
        }
        this.applySuggestPathWorkerResult(s, e, t);
      } catch (s) {
        this.errorMessage = l("editor.inspector.suggestAutoRouteFailed", s instanceof Error ? s.message : String(s)), this.suggestPreview = null;
      } finally {
        this.suggestBusy = !1;
      }
    }
  }
  async runSuggestPath() {
    if (!this.config || this.selectedNodeIds.size !== 2 || this._pathWorkerPending) return;
    const [e, t] = Array.from(this.selectedNodeIds), n = this.config.nodes.find((d) => d.id === e), o = this.config.nodes.find((d) => d.id === t);
    if (!n || !o) return;
    const r = this.config.background?.default ?? "";
    if (typeof Worker > "u") {
      await this.runPathfindingMainThread(e, t, { logFallback: !0 });
      return;
    }
    if (this.initPathWorker(), !this._pathWorker) {
      await this.runPathfindingMainThread(e, t, { logFallback: !0 });
      return;
    }
    this.suggestBusy = !0;
    const s = await Xr(r);
    if (!s) {
      this.suggestBusy = !1, this.errorMessage = l("editor.inspector.suggestCorsError"), this.suggestPreview = null;
      return;
    }
    this._pathWorkerPending = !0, this._pathPendingSelection = {
      fromId: e,
      toId: t
    };
    const a = new Uint8ClampedArray(s.rgba);
    this._pathWorker.postMessage({
      rgba: a.buffer,
      width: s.width,
      height: s.height,
      fromPos: n.position,
      toPos: o.position,
      cellSize: 8
    }, [a.buffer]);
  }
  onFlowFromNodeChange(e, t) {
    if (!this.config) return;
    const n = this.config.flows.find((o) => o.id === e);
    n && this.applyFlowEndpointChange(e, t, n.to_node);
  }
  onFlowToNodeChange(e, t) {
    if (!this.config) return;
    const n = this.config.flows.find((o) => o.id === e);
    n && this.applyFlowEndpointChange(e, n.from_node, t);
  }
  async resolveWaypointsForEndpoints(e, t) {
    if (!this.config) return [];
    const n = this.config.nodes.find((s) => s.id === e), o = this.config.nodes.find((s) => s.id === t);
    if (!n || !o) return [];
    const r = this.config.background?.default ?? "";
    if (!r) return [];
    try {
      const s = await Ti({
        imageUrl: r,
        from: n.position,
        to: o.position
      });
      return s.edgesUsable ? (s.waypoints ?? []).map((a) => ({
        x: a.x,
        y: a.y
      })) : [];
    } catch {
      return [];
    }
  }
  async applyFlowEndpointChange(e, t, n) {
    if (!this.config) return;
    if (t === n) {
      this.flowEndpointError = l("editor.inspector.fromToSameError");
      return;
    }
    const o = this.config;
    if (!o.flows.find((a) => a.id === e)) return;
    this.flowEndpointError = null, this.flowEndpointPathfindingFlowId = e;
    let r = [];
    try {
      r = await this.resolveWaypointsForEndpoints(t, n);
    } finally {
      this.flowEndpointPathfindingFlowId = null;
    }
    const s = {
      ...o,
      flows: o.flows.map((a) => a.id === e ? {
        ...a,
        from_node: t,
        to_node: n,
        waypoints: r
      } : a)
    };
    this.pushPatch(o, s, "Change flow endpoints"), this.selectedFlowId = e;
  }
  renderSuggestPreview() {
    if (!this.suggestPreview || !this.config || !this.imageLayoutReady || this.imageNaturalW <= 0 || this.imageNaturalH <= 0) return _;
    const e = this.config.nodes.find((s) => s.id === this.suggestPreview.fromNodeId), t = this.config.nodes.find((s) => s.id === this.suggestPreview.toNodeId);
    if (!e || !t) return _;
    const n = this.imageNaturalW, o = this.imageNaturalH, r = [
      e.position,
      ...this.suggestPreview.waypoints,
      t.position
    ].map((s) => {
      const a = this.pct2px(s);
      return `${a.x.toFixed(2)},${a.y.toFixed(2)}`;
    }).join(" ");
    return b`
      <svg class="suggest-overlay" viewBox=${`0 0 ${n} ${o}`} preserveAspectRatio="none">
        <polyline points=${r} />
      </svg>
      ${this.suggestPreview.waypoints.map((s) => {
      const a = this.pct2px(s);
      return b`
          <div class="suggest-marker" style=${`left: ${a.x}px; top: ${a.y}px;`}></div>
        `;
    })}
    `;
  }
  renderSuggestBar() {
    return this.suggestPreview ? b`
      <div class="suggest-bar">
        <span>${l("editor.suggestBar.message")}</span>
        <span>${l("editor.inspector.suggestPreviewWaypoints", this.suggestPreview.waypoints.length)}</span>
        <button type="button" aria-label=${l("editor.toolbar.acceptPath")} @click=${this.acceptSuggestion}>${l("editor.inspector.accept")}</button>
        <button type="button" class="ghost" aria-label=${l("editor.toolbar.cancelPath")} @click=${this.cancelSuggestion}>${l("editor.toolbar.cancel")}</button>
      </div>
    ` : _;
  }
  onNodeDotDblClick(e, t) {
    e.preventDefault(), e.stopPropagation(), this.activeTab = "nodes", this.selectedNodeId = t.id, this.selectedNodeIds = /* @__PURE__ */ new Set([t.id]), this.selectedFlowId = null, this.selectedOverlayId = null, this._pendingInspectorLabelFocus = !0;
  }
  onNodeLabelTextDblClick(e, t) {
    if (e.preventDefault(), e.stopPropagation(), e.target.closest(".eye-toggle")) return;
    const n = t.label ?? t.id;
    this.inlineRename = {
      kind: "node",
      id: t.id,
      draft: n
    };
  }
  commitNodeInlineRename(e) {
    const t = this.inlineRename;
    if (!t || t.kind !== "node" || !this.config) return;
    if (!e) {
      this.inlineRename = null;
      return;
    }
    const n = this.config.nodes.find((d) => d.id === t.id);
    if (!n) {
      this.inlineRename = null;
      return;
    }
    const o = n.label ?? n.id, r = t.draft.trim() ? t.draft.trim() : void 0;
    if ((n.label ?? void 0) === r) {
      this.inlineRename = null;
      return;
    }
    const s = this.config, a = gi(s, t.id, r);
    this.inlineRename = null, this.pushPatch(s, a, `Rename node ${o} to ${r ?? "(cleared)"}`);
  }
  onOverlayChipDblClick(e, t) {
    e.preventDefault(), e.stopPropagation(), this.inlineRename = {
      kind: "overlay",
      id: t.id,
      draft: t.id
    };
  }
  commitOverlayInlineRename(e) {
    const t = this.inlineRename;
    if (!t || t.kind !== "overlay" || !this.config) return;
    if (!e) {
      this.inlineRename = null;
      return;
    }
    const n = t.draft.trim();
    if (!n || n === t.id) {
      this.inlineRename = null;
      return;
    }
    const o = this.config, r = Si(o, t.id, n);
    if (r === o) {
      this.errorMessage = l("editor.errors.renameIdConflict"), this.inlineRename = null;
      return;
    }
    this.inlineRename = null, this.errorMessage = "", this.pushPatch(o, r, `Rename overlay ${t.id} to ${n}`), this.selectedOverlayId = n;
  }
  onInspectorFlowIdChange(e, t) {
    if (!this.config) return;
    const n = t.target, o = n.value.trim(), r = this.config, s = Fr(r, e, o);
    if (s === r) {
      this.errorMessage = l("editor.errors.renameIdConflict"), n.value = e;
      return;
    }
    this.errorMessage = "", this.pushPatch(r, s, `Rename flow ${e} to ${o}`), this.selectedFlowId = o;
  }
  onInspectorOverlayIdChange(e, t) {
    if (!this.config) return;
    const n = t.target, o = n.value.trim(), r = this.config, s = Si(r, e, o);
    if (s === r) {
      this.errorMessage = l("editor.errors.renameIdConflict"), n.value = e;
      return;
    }
    this.errorMessage = "", this.pushPatch(r, s, `Rename overlay ${e} to ${o}`), this.selectedOverlayId = o;
  }
  onNodeLabelChange(e, t) {
    if (!this.config) return;
    const n = t.target.value, o = this.config, r = o.nodes.find((d) => d.id === e)?.label ?? e, s = gi(o, e, n.trim() ? n.trim() : void 0), a = n.trim() ? n.trim() : void 0;
    this.pushPatch(o, s, `Rename node ${r} to ${a ?? e}`);
  }
  setNodeEntity(e, t) {
    if (!this.config) return;
    const n = this.config, o = t.trim(), r = {
      ...n,
      nodes: n.nodes.map((s) => s.id === e ? {
        ...s,
        entity: o || void 0
      } : s)
    };
    this.pushPatch(n, r, `edit entity of ${e}`);
  }
  setFlowEntity(e, t) {
    if (!this.config) return;
    const n = this.config.flows.find((a) => a.id === e), o = this.config, r = t.trim();
    if (!r) return;
    const s = {
      ...o,
      flows: o.flows.map((a) => a.id === e ? {
        ...a,
        entity: r
      } : a)
    };
    this.pushPatch(o, s, `edit entity of ${n ? B(n) : e}`);
  }
  onOverlaySizeChange(e, t, n) {
    if (!this.config) return;
    const o = (this.config.overlays ?? []).find((c) => c.id === e);
    if (!o) return;
    const r = o.size ?? {
      width: 20,
      height: 15
    }, s = Number(n.target.value);
    if (!Number.isFinite(s) || s <= 0) return;
    const a = this.config, d = xi(a, e, {
      ...r,
      [t]: s
    });
    this.pushPatch(a, d, `resize overlay ${e}`);
  }
  applyCustomConfig(e) {
    if (!this.config) return;
    const t = this.customConfigDraft.trim();
    if (!t) {
      this.customConfigError = "Config is empty.";
      return;
    }
    let n;
    try {
      n = JSON.parse(t);
    } catch (r) {
      this.customConfigError = l("editor.inspector.invalidCardJson", r instanceof Error ? r.message : String(r));
      return;
    }
    if (!n || typeof n != "object" || Array.isArray(n)) {
      this.customConfigError = "Top-level value must be a JSON object.";
      return;
    }
    const o = this.config;
    try {
      const r = ve(vr(o, e, n));
      this.errorMessage = "", this.customConfigError = "", this.customConfigDraft = "", this.undoStack.push({
        prev: o,
        next: r,
        description: `edit overlay ${e} card config`
      }), this.commitToHa(r);
    } catch (r) {
      this.customConfigError = r instanceof Error ? r.message : String(r);
    }
  }
  removeOverlay(e) {
    if (!this.config) return;
    const t = this.config, n = br(t, e);
    this.selectedOverlayId = null, this.customConfigDraft = "", this.customConfigError = "", this.pushPatch(t, n, `delete overlay ${e}`);
  }
  removeNode(e) {
    if (!this.config) return;
    const t = this.config, n = nr(t, e);
    this.selectedNodeId = null, this.pushPatch(t, n, `delete node ${e}`);
  }
  removeFlow(e) {
    if (!this.config) return;
    const t = this.config.flows.find((r) => r.id === e), n = this.config, o = lr(n, e);
    this.selectedFlowId = null, this.pushPatch(n, o, `delete flow ${t ? B(t) : e}`);
  }
  onFlowLabelChange(e, t) {
    if (!this.config) return;
    const n = this.config.flows.find((a) => a.id === e);
    if (!n) return;
    const o = t.trim(), r = this.config, s = Pr(r, e, o === "" || o === n.id ? void 0 : o);
    this.pushPatch(r, s, `Set flow label ${n.id}`);
  }
  clampPan() {
    const e = this.canvasRef.value;
    if (!e) return;
    const t = e.offsetWidth - 16, n = e.offsetHeight - 8, o = this.imageNaturalW * this.scale, r = this.imageNaturalH * this.scale;
    this.panX = Math.min(0, Math.max(t - o, this.panX)), this.panY = Math.min(0, Math.max(n - r, this.panY));
  }
  adjustZoom(e, t, n) {
    const o = this.canvasRef.value, r = t ?? (o ? o.offsetWidth / 2 : 0), s = n ?? (o ? o.offsetHeight / 2 : 0), a = Math.min(5, Math.max(this.fitScale, this.scale * e));
    a !== this.scale && (this.panX = r - (r - this.panX) * (a / this.scale), this.panY = s - (s - this.panY) * (a / this.scale), this.scale = a, this.clampPan());
  }
  resetZoom() {
    this.scale = this.fitScale, this.panX = this.fitPanX, this.panY = this.fitPanY;
  }
  pointerToPercent(e) {
    const t = this.canvasRef.value;
    if (!t) return null;
    const n = t.getBoundingClientRect();
    if (n.width <= 0 || n.height <= 0) return null;
    const o = e.clientX - (n.left + 8), r = e.clientY - (n.top + 4), s = (o - this.panX) / this.scale, a = (r - this.panY) / this.scale;
    return {
      x: D(s / this.imageNaturalW * 100),
      y: D(a / this.imageNaturalH * 100)
    };
  }
  pushPatch(e, t, n) {
    try {
      const o = ve(e), r = ve(t);
      this.errorMessage = "", this.undoStack.push({
        prev: o,
        next: r,
        description: n
      }), this.commitToHa(r), this.config = r, te(r.debug ?? !1);
    } catch (o) {
      this.errorMessage = o instanceof Error ? o.message : String(o), this.config = e;
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
}, Oe = ge, ge.KNOWN_WEATHER_STATES = [
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
], ge.styles = xt`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
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
    .z-canvas--collapsed {
      display: none;
    }
    /* ZONE 2 — Toolbar (fixed 72px — two rows of 36px each) */
    .z-toolbar {
      flex: 0 0 72px;
      display: grid;
      grid-template-columns: 15% 50% 35%;
      background: var(--secondary-background-color);
      border-top: 1px solid var(--divider-color);
      border-bottom: 1px solid var(--divider-color);
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
      background: #ff6b00;
      color: #fff;
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
    /* ── Toolbar: right column — Canvas collapse ── */
    .tb-col-canvas-toggle {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      padding: 2px 4px;
      gap: 2px;
      overflow: hidden;
    }
    .tb-btn-canvas-toggle {
      flex: 1 1 0;
      min-height: 0;
      font-size: 10px;
      padding: 2px 4px;
      border: 1px solid var(--outline-color, var(--divider-color));
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .tb-btn-canvas-toggle:hover {
      background: var(--secondary-background-color);
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
    /* Tab bar */
    .editor-tab-bar {
      display: flex;
      flex-shrink: 0;
      flex-wrap: nowrap;
      border-bottom: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
    }
    .editor-tab {
      flex: 1;
      margin: 0;
      padding: 8px 4px;
      font: inherit;
      font-size: 11px;
      border: none;
      border-bottom: 2px solid transparent;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      transition: border-color 0.15s;
    }
    .editor-tab:hover {
      background: var(--secondary-background-color);
    }
    .editor-tab--active {
      border-bottom-color: #ff6b00;
    }
    /* ZONE 3 — Context / Options panel (flex-grows to fill remaining height) */
    .z-context {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
      background: var(--secondary-background-color);
    }
    .z-context-body {
      padding: 8px 12px;
    }
    .card-tab .z-context-body {
      padding-bottom: 12px;
    }
    .section-card {
      background: var(--card-background-color, var(--ha-card-background, var(--color-background-primary)));
      border: 1px solid var(--divider-color, var(--color-border-tertiary));
      border-radius: var(--ha-card-border-radius, var(--border-radius-md, 8px));
      padding: 10px 12px;
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, var(--color-text-secondary));
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .advanced-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0 6px;
      font-size: 12px;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .advanced-toggle input {
      cursor: pointer;
    }
    .advanced-block--nested {
      border-left: 2px solid var(--divider-color);
      padding-left: 10px;
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .chip-picker {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 0;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
      transition: border-color 0.15s;
      font: inherit;
    }
    .chip:hover {
      border-color: var(--primary-color);
    }
    .chip--active {
      border-color: #ff6b00;
      background: rgba(255, 107, 0, 0.08);
    }
    .chip--add {
      border-style: dashed;
      color: var(--secondary-text-color);
    }
    .chip-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tab-empty-hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 8px 0 0;
    }
    .weather-state-row {
      display: grid;
      grid-template-columns: 120px 1fr auto auto;
      gap: 6px;
      align-items: center;
    }
    .weather-state-label-input {
      max-width: 120px;
    }
    .weather-state-url {
      min-width: 0;
    }
    .weather-state-icon-btn {
      flex-shrink: 0;
      width: 36px;
    }
    .weather-state-delete {
      flex-shrink: 0;
    }
    .weather-mappings-toggle {
      margin-top: 10px;
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
    .weather-body .field-hint {
      margin: 4px 0 0;
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
  `, ge);
F([Fe({ attribute: !1 })], R.prototype, "hass", void 0);
F([P()], R.prototype, "config", void 0);
F([P()], R.prototype, "pending", void 0);
F([P()], R.prototype, "previewMode", void 0);
F([P()], R.prototype, "selectedNodeId", void 0);
F([P()], R.prototype, "selectedNodeIds", void 0);
F([P()], R.prototype, "selectedFlowId", void 0);
F([P()], R.prototype, "selectedOverlayId", void 0);
F([P()], R.prototype, "customConfigDraft", void 0);
F([P()], R.prototype, "customConfigError", void 0);
F([P()], R.prototype, "errorMessage", void 0);
F([P()], R.prototype, "inlineRename", void 0);
F([P()], R.prototype, "canUndo", void 0);
F([P()], R.prototype, "canRedo", void 0);
F([P()], R.prototype, "undoLabel", void 0);
F([P()], R.prototype, "redoLabel", void 0);
F([P()], R.prototype, "suggestPreview", void 0);
F([P()], R.prototype, "suggestBusy", void 0);
F([P()], R.prototype, "flowEndpointPathfindingFlowId", void 0);
F([P()], R.prototype, "flowEndpointError", void 0);
F([P()], R.prototype, "flowZeroThresholdDraft", void 0);
F([P()], R.prototype, "imageBrowserOpen", void 0);
F([P()], R.prototype, "imageBrowserLoading", void 0);
F([P()], R.prototype, "imageBrowserError", void 0);
F([P()], R.prototype, "imageBrowserField", void 0);
F([P()], R.prototype, "imageBrowserWeatherState", void 0);
F([P()], R.prototype, "imageBrowserFiles", void 0);
F([P()], R.prototype, "activeTab", void 0);
F([P()], R.prototype, "canvasCollapsed", void 0);
F([P()], R.prototype, "showAdvanced", void 0);
F([P()], R.prototype, "savedConfig", void 0);
F([P()], R.prototype, "scale", void 0);
F([P()], R.prototype, "panX", void 0);
F([P()], R.prototype, "panY", void 0);
F([P()], R.prototype, "imageLayoutReady", void 0);
R = Oe = F([Ct("flowme-card-editor")], R);
var lt, yn = "2.8.1";
console.info("%cFlowMe v" + yn + " loaded", "color: #FF6B00; font-weight: bold");
var zi = 5e3;
function is(i) {
  if (!i) return "";
  const e = [], t = (n, o) => {
    const r = i[n];
    r !== void 0 && e.push(`${o}:${r};`);
  };
  return t("background", "--flowme-opacity-bg"), t("darken", "--flowme-opacity-darken"), t("nodes", "--flowme-opacity-nodes"), t("flows", "--flowme-opacity-flows"), t("dots", "--flowme-opacity-dots"), t("glow", "--flowme-opacity-glow"), t("labels", "--flowme-opacity-labels"), t("values", "--flowme-opacity-values"), t("overlays", "--flowme-opacity-overlays"), e.join("");
}
var W = (lt = class extends ie {
  constructor(...e) {
    super(...e), this._connectionAwaitingReconnect = !1, this._boundHaConnection = null, this.onHaConnectionReady = () => {
      this.onReconnect();
    }, this.onHaConnectionDisconnected = () => {
      this._connectionAwaitingReconnect = !0;
    }, this._visibilityListenerAttached = !1, this._documentVisibilityPauseActive = !1, this._visibilityHandler = () => {
      this.syncAnimationsToDocumentVisibility();
    }, this.toastVisible = !1, this.toastMessage = "", this.toastHideTimer = null, this.renderer = null, this.rendererMount = Y(), this.nodeFxSvgRef = Y(), this.nodeFx = new fn(), this._nodeFxRaf = null, this.bgLayerA = "", this.bgLayerB = "", this.activeLayer = "A", this.transitionTimer = null, this.preloadCache = /* @__PURE__ */ new Map(), this.lastAppliedBgUrl = "", this.warnedMissing = /* @__PURE__ */ new Set(), this._lastScaledValue = /* @__PURE__ */ new Map(), this.onOverlayKeydown = (t, n) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleOverlayTap(n));
    };
  }
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass;
    if (this._hass = e, e && e.language !== this._lastLanguage && (this._lastLanguage = e.language, en(e.language)), e) {
      const n = this.config, o = [
        ...n?.flows.map((c) => c.entity) ?? [],
        ...n?.flows.map((c) => c.value_gradient?.entity).filter(Boolean) ?? [],
        ...n?.nodes.map((c) => c.entity).filter(Boolean) ?? [],
        n?.background.weather_entity,
        n?.background.sun_entity
      ].filter((c) => typeof c == "string" && c.length > 0), r = {};
      for (const c of o) r[c] = e.states[c]?.state;
      A("hass: config entity states:", r);
      const s = n?.background.weather_entity;
      if (s) {
        const c = t?.states[s]?.state, p = e.states[s]?.state;
        A("[weather] state:", p, "(was:", c, ")"), c !== p && this.syncWeatherBackground();
      }
      const a = n?.background.sun_entity;
      if (a) {
        const c = t?.states[a]?.state, p = e.states[a]?.state;
        c !== p && (A("[sun] state changed:", c, "→", p), this.syncWeatherBackground());
      }
      const d = e.connection;
      this.bindHaConnection(d);
    } else
      A("hass: cleared"), this.bindHaConnection(void 0), t && this.showToast(l("card.connectionLost"));
    this.requestUpdate("hass", t);
  }
  bindHaConnection(e) {
    this._boundHaConnection !== e && (this._boundHaConnection && (this._boundHaConnection.removeEventListener("ready", this.onHaConnectionReady), this._boundHaConnection.removeEventListener("disconnected", this.onHaConnectionDisconnected), this._boundHaConnection = null), e && (e.addEventListener("ready", this.onHaConnectionReady), e.addEventListener("disconnected", this.onHaConnectionDisconnected), this._boundHaConnection = e));
  }
  onReconnect() {
    this.hass && this.config && this.renderer && this.pushAllValuesToRenderer(), this._connectionAwaitingReconnect && (this._connectionAwaitingReconnect = !1, this.showToast(l("card.reconnected"), 1500));
  }
  needsRendererReinit(e, t) {
    const { background: n, ...o } = e, { background: r, ...s } = t;
    if (o.domain !== s.domain) return !0;
    const a = new Set(o.flows.map((c) => c.id)), d = new Set(s.flows.map((c) => c.id));
    if (a.size !== d.size) return !0;
    for (const c of a) if (!d.has(c)) return !0;
    return !1;
  }
  updateBackgroundLayersAfterConfig(e, t) {
    const n = t.background?.default ?? "";
    if (!e) {
      this.bgLayerA = n, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = n;
      return;
    }
    e.background?.default !== t.background?.default && (this.bgLayerA = n, this.bgLayerB = "", this.activeLayer = "A", this.lastAppliedBgUrl = n);
  }
  logFirstPaint() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        A("first paint:", performance.now());
      });
    });
  }
  setConfig(e) {
    te(nn(e)), A("setConfig start:", performance.now());
    try {
      const t = ve(e);
      te(t.debug ?? !1), A("setConfig called:", JSON.parse(JSON.stringify(e ?? null))), A("setConfig validated → flows=", t.flows.length, "nodes=", t.nodes.length, "overlays=", t.overlays?.length ?? 0, "card", yn);
      const n = this.config, o = !!n && !!this.renderer && this.needsRendererReinit(n, t);
      if (this.renderer && n && !o && typeof this.renderer.applyConfig == "function") {
        this.config = t, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(n, t), this.renderer.applyConfig(t), this.rendererReadyFor = t, this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels();
        {
          const r = performance.now();
          A("teardown complete:", r, "(skipped — applyConfig)"), A("renderer init start:", r, "(skipped — applyConfig)"), A("renderer init complete:", r, "(skipped — applyConfig)");
        }
        this.logFirstPaint();
        return;
      }
      this.renderer && o ? (this.teardownRenderer(), A("teardown complete:", performance.now())) : A("teardown complete:", performance.now(), "(skipped)"), this.config = t, this.errorMessage = void 0, this.updateBackgroundLayersAfterConfig(n, t), this.logFirstPaint();
    } catch (t) {
      te(!1);
      const n = t instanceof Nt ? t.message : String(t);
      this.config = void 0, this.errorMessage = n, this.teardownRenderer();
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.syncPauseWhenHiddenListener(), A("connectedCallback — shadowRoot present?", !!this.shadowRoot, "config present?", !!this.config, "hass present?", !!this._hass);
  }
  firstUpdated() {
    A("firstUpdated — shadowRoot children count=", this.shadowRoot?.children.length ?? 0), A("firstUpdated — SVG element found?", !!this.shadowRoot?.querySelector("svg"));
  }
  disconnectedCallback() {
    this._visibilityListenerAttached && (document.removeEventListener("visibilitychange", this._visibilityHandler), this._visibilityListenerAttached = !1), this._documentVisibilityPauseActive = !1, this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null), this.bindHaConnection(void 0), this.nodeFx.reset(), this.teardownRenderer(), this.transitionTimer !== null && (window.clearTimeout(this.transitionTimer), this.transitionTimer = null), this.toastHideTimer !== null && (window.clearTimeout(this.toastHideTimer), this.toastHideTimer = null), super.disconnectedCallback();
  }
  beginRendererInitIfNeeded() {
    if (!this.config) return;
    const e = this.rendererMount.value;
    if (!e || this.rendererReadyFor === this.config) return;
    if (this.renderer && this.rendererReadyFor && typeof this.renderer.applyConfig == "function" && !this.needsRendererReinit(this.rendererReadyFor, this.config)) {
      A("[FlowMe] renderer applyConfig (skip reinit):", performance.now()), this.renderer.applyConfig(this.config), this.rendererReadyFor = this.config, this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
      return;
    }
    A("renderer init start:", performance.now()), this.teardownRenderer(), this.renderer = Uo(), this.rendererReadyFor = this.config;
    const t = this.config;
    this.renderer.init(e, t).then(() => {
      A("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
    }).catch((n) => {
      A("renderer init failed — falling back to SVG renderer", n), this.teardownRenderer(), this.renderer = new De(), this.rendererReadyFor = t, this.renderer.init(e, t).then(() => {
        A("renderer init complete:", performance.now()), this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels(), this.syncAnimationsToDocumentVisibility();
      }).catch((o) => {
        console.error("[flowme] SVG renderer init also failed", o);
      });
    });
  }
  willUpdate(e) {
    this.config && (this.beginRendererInitIfNeeded(), e.has("hass") && this.renderer && (this.hass ? this.pushAllValuesToRenderer() : this.syncRendererAriaLabels()), (e.has("config") || e.has("hass")) && this.syncWeatherBackground());
  }
  updated(e) {
    super.updated(e);
    const t = this.config?.background;
    this.config && (t?.transparent === !0 || !t?.default?.trim()) ? (this.style.setProperty("background", "transparent"), this.style.setProperty("box-shadow", "none")) : this.config && (this.style.removeProperty("background"), this.style.removeProperty("box-shadow")), this.beginRendererInitIfNeeded(), this.syncPauseWhenHiddenListener(), this.syncAnimationsToDocumentVisibility();
    const n = this.nodeFxSvgRef.value;
    n && this.config && this.nodeFx.sync(n, this.config, this.hass, performance.now(), this.nodeEffectHooks()), this.ensureNodeEffectsRaf();
  }
  syncPauseWhenHiddenListener() {
    const e = this.config != null && this.config.pause_when_hidden !== !1;
    e && !this._visibilityListenerAttached ? (document.addEventListener("visibilitychange", this._visibilityHandler), this._visibilityListenerAttached = !0) : !e && this._visibilityListenerAttached && (document.removeEventListener("visibilitychange", this._visibilityHandler), this._visibilityListenerAttached = !1);
  }
  syncAnimationsToDocumentVisibility() {
    if (!(this.config != null && this.config.pause_when_hidden !== !1)) {
      this._documentVisibilityPauseActive && (this.resumeCardAnimationsAfterHiddenTab(), this._documentVisibilityPauseActive = !1);
      return;
    }
    document.visibilityState === "hidden" ? this._documentVisibilityPauseActive || (this.pauseCardAnimationsForHiddenTab(), this._documentVisibilityPauseActive = !0) : this._documentVisibilityPauseActive && (this.resumeCardAnimationsAfterHiddenTab(), this._documentVisibilityPauseActive = !1);
  }
  pauseCardAnimationsForHiddenTab() {
    this.renderer?.pause?.(), this._nodeFxRaf !== null && (cancelAnimationFrame(this._nodeFxRaf), this._nodeFxRaf = null);
    const e = this.nodeFxSvgRef.value;
    if (e) {
      const t = e;
      if (typeof t.pauseAnimations == "function") t.pauseAnimations();
      else for (const n of e.querySelectorAll("animateMotion, animate, animateTransform")) n.pauseAnimations?.();
    }
  }
  resumeCardAnimationsAfterHiddenTab() {
    this.renderer?.resume?.();
    const e = this.nodeFxSvgRef.value;
    if (e) {
      const t = e;
      if (typeof t.unpauseAnimations == "function") t.unpauseAnimations();
      else for (const n of e.querySelectorAll("animateMotion, animate, animateTransform")) n.unpauseAnimations?.();
    }
    this.ensureNodeEffectsRaf();
  }
  queryNodeDot(e) {
    const t = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return this.shadowRoot?.querySelector(`[data-node-id="${t}"] .node-dot`) ?? null;
  }
  clearNodeEffectDomStyles() {
    this.shadowRoot?.querySelectorAll(".node-dot[data-flowme-fx]").forEach((e) => {
      const t = e, n = t.getAttribute("data-flowme-base-fill");
      n && (t.style.background = n), t.style.filter = "", t.style.transition = "", t.removeAttribute("data-flowme-fx");
    });
  }
  nodeEffectHooks() {
    return {
      resetDomEffects: () => this.clearNodeEffectDomStyles(),
      getLayoutMetrics: (e) => {
        const t = e.getBoundingClientRect();
        return {
          widthPx: Math.max(1, t.width),
          heightPx: Math.max(1, t.height)
        };
      },
      setNodeDotBackground: (e, t, n) => {
        const o = this.queryNodeDot(e);
        o && (o.setAttribute("data-flowme-fx", "1"), o.style.transition = n?.transitionMs ? `background-color ${n.transitionMs}ms ease` : "", o.style.background = t);
      },
      setNodeDotFilter: (e, t) => {
        const n = this.queryNodeDot(e);
        n && (n.setAttribute("data-flowme-fx", "1"), n.style.filter = t ?? "");
      }
    };
  }
  ensureNodeEffectsRaf() {
    if (!this.config?.nodes.some((t) => t.node_effect && t.visible !== !1)) {
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
      const t = this.nodeFxSvgRef.value;
      t && this.config && this.nodeFx.sync(t, this.config, this.hass, performance.now(), this.nodeEffectHooks());
    };
    this._nodeFxRaf = requestAnimationFrame(e);
  }
  pushAllValuesToRenderer() {
    if (!this.config || !this.renderer) return;
    if (!this.hass) {
      this.syncRendererAriaLabels();
      return;
    }
    A("pushAllValuesToRenderer → flows:", this.config.flows.length, "renderer:", this.renderer.constructor.name);
    const e = new Set(this.config.flows.map((t) => t.id));
    for (const t of this._lastScaledValue.keys()) e.has(t) || this._lastScaledValue.delete(t);
    for (let t = 0; t < this.config.flows.length; t++) {
      const n = this.config.flows[t], o = this.hass.states[n.entity], r = be(o?.state), s = H(n.domain ?? this.config.domain), a = o?.attributes?.unit_of_measurement, d = Kt(r, a, s.unit_scale);
      if (A("updateFlow →", n.id, "entity=", n.entity, "raw=", o?.state, "parsed=", r, "sensorUnit=", a ?? "(none)", "matchedUnit=", d.matchedUnit ?? "(none → passthrough)", "factor=", d.factor, "scaledToBase(" + s.unit_label + ")=", d.value), o) {
        if (o.state === "unavailable" || o.state === "unknown") {
          const p = `${n.id}:${n.entity}:unavailable`;
          this.warnedMissing.has(p) || (this.warnedMissing.add(p), A(`flow "${n.id}" entity "${n.entity}" is currently ${o.state} — no flow will render until it reports a number`));
        }
      } else {
        const p = `${n.id}:${n.entity}`;
        this.warnedMissing.has(p) || (this.warnedMissing.add(p), A(`flow "${n.id}" references entity "${n.entity}" but it is not present in hass.states — check spelling / domain permissions`));
      }
      const c = this._lastScaledValue.get(n.id);
      if ((c === void 0 || c !== d.value) && (this._lastScaledValue.set(n.id, d.value), this.renderer.updateFlow(n.id, d.value)), n.value_gradient && this.renderer.setGradientColor) {
        const p = n.value_gradient.entity, u = this.hass.states[p];
        if (u && u.state !== "unavailable" && u.state !== "unknown") {
          const f = parseFloat(u.state);
          if (Number.isFinite(f)) {
            const h = n.value_gradient, g = Math.max(h.low_value, Math.min(h.high_value, f)), v = dn(f, h);
            A("[gradient]", n.id, "entity value:", f, "clamped:", g, "range:", `${h.low_value}–${h.high_value}`, "colour:", v), this.renderer.setGradientColor(n.id, v);
          } else
            A(`flow "${n.id}" gradient entity "${p}" state "${u.state}" is not a number`), this.renderer.setGradientColor(n.id, null);
        } else
          A(`flow "${n.id}" gradient entity "${p}" unavailable/unknown — falling back to flow color`), this.renderer.setGradientColor(n.id, null);
      }
    }
    this.syncRendererAriaLabels();
  }
  syncRendererAriaLabels() {
    if (!(!this.config || !this.renderer?.setFlowAriaLabel))
      for (const e of this.config.flows) this.renderer.setFlowAriaLabel(e.id, this.formatFlowAriaLabel(e));
  }
  describeFlowReading(e) {
    if (!this.hass || !this.config) return l("card.noConnection");
    const t = this.hass.states[e.entity], n = H(e.domain ?? this.config.domain);
    if (!t) return l("card.entityNotFound");
    if (t.state === "unavailable" || t.state === "unknown") return t.state;
    const o = be(t.state), r = t.attributes?.unit_of_measurement ?? "", s = Kt(o, r, n.unit_scale);
    return r ? `${this.formatSensorNumber(s.value)} ${r}` : n.describe(s.value);
  }
  formatFlowAriaLabel(e) {
    return l("aria.flowGroup", B(e), this.describeFlowReading(e));
  }
  formatNodeAriaLabel(e) {
    const t = e.label ?? e.id;
    if (!this.hass || !e.entity || !this.config) return t;
    const n = this.hass.states[e.entity], o = H(this.config.domain);
    if (!n) return l("aria.readingWithTitle", t, l("card.entityNotFound"));
    if (n.state === "unavailable" || n.state === "unknown") return l("aria.readingWithTitle", t, n.state);
    const r = be(n.state), s = n.attributes?.unit_of_measurement ?? "";
    return s ? l("aria.readingWithTitle", t, `${this.formatSensorNumber(r)} ${s}`) : l("aria.readingWithTitle", t, o.describe(r));
  }
  getCardSize() {
    const e = Ke(this.config?.aspect_ratio) ?? 1.6;
    return Math.max(3, Math.round(10 / e) + 1);
  }
  getLayoutOptions() {
    const e = Ke(this.config?.aspect_ratio) ?? 1.6;
    return {
      grid_columns: 4,
      grid_rows: Math.max(2, Math.round(4 / e) + 1),
      grid_min_columns: 2,
      grid_min_rows: 2,
      grid_max_columns: 4
    };
  }
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
      background: { default: "" },
      nodes: [{
        id: "source",
        position: {
          x: 20,
          y: 30
        },
        label: "Source"
      }, {
        id: "sink",
        position: {
          x: 80,
          y: 70
        },
        label: "Sink"
      }],
      flows: [{
        id: "example",
        from_node: "source",
        to_node: "sink",
        entity: "sensor.example_power",
        waypoints: []
      }],
      overlays: [{
        id: "example_overlay",
        type: "custom",
        position: {
          x: 5,
          y: 5
        },
        size: {
          width: 20,
          height: 15
        },
        card: {
          type: "entity",
          entity: "sensor.example_sensor"
        }
      }]
    };
  }
  render() {
    if (this.errorMessage) return b`
        <ha-card role="region" aria-label=${l("aria.card")}>
          <div class="error">
            <strong>${l("card.invalidConfigurationTitle")}</strong>
            <pre>${this.errorMessage}</pre>
          </div>
        </ha-card>
      `;
    const e = this.config;
    if (!e) return b`<ha-card role="region" aria-label=${l("aria.card")}><div class="placeholder">${l("card.loading")}</div></ha-card>`;
    const t = `${1 / (Ke(e.aspect_ratio) ?? 16 / 10) * 100}%`, n = e.background.transition_duration ?? zi, o = is(e.opacity), r = e.background.transparent === !0;
    return b`
      <ha-card role="region" aria-label=${l("aria.card")}>
        <div
          class="stage"
          style=${`padding-top: ${t};${o}`}
        >
          <div
            class=${`background ${this.activeLayer === "A" ? "visible" : ""}`}
            style=${r ? "opacity:0;pointer-events:none;" : this.buildLayerStyle(this.bgLayerA, n)}
          ></div>
          <div
            class=${`background ${this.activeLayer === "B" ? "visible" : ""}`}
            style=${r ? "opacity:0;pointer-events:none;" : this.buildLayerStyle(this.bgLayerB, n)}
          ></div>
          <div class="renderer-mount" ${Z(this.rendererMount)}></div>
          <svg
            class="node-effects-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            ${Z(this.nodeFxSvgRef)}
          ></svg>
          ${e.nodes.map((s) => this.renderNodeHandle(s))}
          ${(e.overlays ?? []).map((s) => (A("rendering overlay →", s.type, "position=", s.position, "size=", s.size), Go(s, this.hass, { onOverlayKeydown: this.onOverlayKeydown })))}
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
  handleOverlayTap(e) {
    try {
      const t = this.shadowRoot?.querySelectorAll(".overlay-custom") ?? [];
      let n;
      for (const o of t) if (o.getAttribute("data-overlay-id") === e.id) {
        n = o.querySelector("flowme-custom-overlay");
        break;
      }
      n?.activatePrimaryAction();
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
        const n = t.state, o = e.sun_entity ? this.hass.states[e.sun_entity]?.state : void 0, r = to(n, o, e.weather_states, e.default);
        let s = n;
        return o === "below_horizon" && !n.endsWith("-night") && (s = `${n}-night`), A("[FlowMe] sun:", o, "weather:", n, "→ lookup key:", s, "→ image:", r !== e.default ? r : "default"), r;
      }
    }
    return e.default;
  }
  syncWeatherBackground() {
    if (!this.config) return;
    const e = this.resolveTargetBackground();
    if (!e || e === this.lastAppliedBgUrl) return;
    const t = this.config.background.transition_duration ?? zi;
    this.preload(e).then(() => {
      if (!this.config || this.resolveTargetBackground() !== e) return;
      this.transitionTimer !== null && window.clearTimeout(this.transitionTimer);
      const n = this.activeLayer === "A" ? "B" : "A";
      n === "A" ? this.bgLayerA = e : this.bgLayerB = e, requestAnimationFrame(() => {
        this.activeLayer = n, this.lastAppliedBgUrl = e, this.transitionTimer = window.setTimeout(() => {
          this.activeLayer === "A" ? this.bgLayerB = "" : this.bgLayerA = "", this.transitionTimer = null;
        }, t + 50);
      });
    });
  }
  preload(e) {
    if (!e) return Promise.resolve();
    const t = this.preloadCache.get(e);
    return t?.complete && t.naturalWidth > 0 ? Promise.resolve() : new Promise((n) => {
      const o = new Image();
      o.decoding = "async", o.onload = () => {
        this.preloadCache.set(e, o), n();
      }, o.onerror = () => n(), o.src = e, this.preloadCache.set(e, o);
    });
  }
  renderNodeHandle(e) {
    const t = this.hass && e.entity ? this.hass.states[e.entity] : void 0, n = e.show_value !== !1 && !!t, o = e.show_label !== !1 && !!e.label, r = H(this.config?.domain), s = e.color ?? this.nodeFlowColor(e.id) ?? r.default_color_positive, a = e.size ?? this.config?.defaults?.node_radius ?? 12;
    let d = "";
    if (t) {
      const p = be(t.state), u = t.attributes?.unit_of_measurement ?? "";
      u ? d = `${this.formatSensorNumber(p)} ${u}` : d = r.describe(p);
    }
    const c = e.visible === !1;
    return b`
      <div
        class="node"
        data-node-id=${e.id}
        role="img"
        aria-label=${this.formatNodeAriaLabel(e)}
        style=${`left: ${e.position.x}%; top: ${e.position.y}%; --flowme-dot-size: ${a}px;${e.opacity !== void 0 ? ` opacity: ${e.opacity};` : ""}${c ? " display: none;" : ""}`}
      >
        <span class="node-dot-wrap">
          <span
            class="node-dot node-circle"
            data-flowme-base-fill=${s}
            style=${`background: ${s}; width: ${a}px; height: ${a}px;`}
          ></span>
        </span>
        ${o ? b`<span class="node-label">${e.label}</span>` : null}
        ${n ? b`<span class="node-value">${d}</span>` : null}
      </div>
    `;
  }
  nodeFlowColor(e) {
    if (!this.config) return;
    const t = this.config.domain, n = this.config.domain_colors;
    let o;
    const r = /* @__PURE__ */ new Set();
    for (let s = 0; s < this.config.flows.length; s++) {
      const a = this.config.flows[s];
      if (a.from_node !== e && a.to_node !== e) continue;
      const d = pe(a, H(a.domain ?? t), a.domain ?? t, 1, n, s), c = d.toLowerCase();
      r.has(c) || (r.add(c), o || (o = d));
    }
    if (r.size !== 0)
      return r.size === 1 ? o : hn;
  }
  formatSensorNumber(e) {
    if (!Number.isFinite(e)) return "—";
    const t = Math.abs(e);
    return t >= 1e3 || t >= 100 ? e.toFixed(0) : t >= 10 ? e.toFixed(1) : e.toFixed(2);
  }
  teardownRenderer() {
    this.renderer && (this.renderer.destroy(), this.renderer = null), this._lastScaledValue.clear(), this.rendererReadyFor = void 0, this._documentVisibilityPauseActive = !1;
  }
}, lt.styles = xt`
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
      display: flex;
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
      display: block;
    }
    .node-value {
      opacity: calc(0.85 * var(--flowme-opacity-values, 1));
      white-space: nowrap;
      display: block;
    }
    .overlay {
      position: absolute;
      display: block;
      min-width: 24px;
      min-height: 24px;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;
      pointer-events: all;
      z-index: 10;
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
  `, lt);
F([Fe({ attribute: !1 })], W.prototype, "hass", null);
F([P()], W.prototype, "config", void 0);
F([P()], W.prototype, "errorMessage", void 0);
F([P()], W.prototype, "toastVisible", void 0);
F([P()], W.prototype, "toastMessage", void 0);
F([P()], W.prototype, "bgLayerA", void 0);
F([P()], W.prototype, "bgLayerB", void 0);
F([P()], W.prototype, "activeLayer", void 0);
W = F([Ct("flowme-card")], W);
var vt = window;
vt.customCards = vt.customCards ?? [];
vt.customCards.push({
  type: "flowme-card",
  name: "FlowMe",
  description: "Animated flow visualisation card for Home Assistant. Connect nodes with animated flows driven by sensor data.",
  preview: !0,
  documentationURL: "https://github.com/fxgamer-debug/flowme"
});
export {
  W as FlowmeCard
};

//# sourceMappingURL=flowme-card.js.map