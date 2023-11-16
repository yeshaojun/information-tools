(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
function os(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const Ee = {},
  yn = [],
  De = () => {},
  Zc = () => !1,
  Qc = /^on[^a-z]/,
  no = (e) => Qc.test(e),
  ss = (e) => e.startsWith("onUpdate:"),
  Me = Object.assign,
  is = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Gc = Object.prototype.hasOwnProperty,
  le = (e, t) => Gc.call(e, t),
  Y = Array.isArray,
  wn = (e) => ro(e) === "[object Map]",
  Ka = (e) => ro(e) === "[object Set]",
  re = (e) => typeof e == "function",
  pe = (e) => typeof e == "string",
  as = (e) => typeof e == "symbol",
  me = (e) => e !== null && typeof e == "object",
  Ua = (e) => me(e) && re(e.then) && re(e.catch),
  Wa = Object.prototype.toString,
  ro = (e) => Wa.call(e),
  Jc = (e) => ro(e).slice(8, -1),
  Va = (e) => ro(e) === "[object Object]",
  ls = (e) =>
    pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Lr = os(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  oo = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Yc = /-(\w)/g,
  Tt = oo((e) => e.replace(Yc, (t, n) => (n ? n.toUpperCase() : ""))),
  Xc = /\B([A-Z])/g,
  ln = oo((e) => e.replace(Xc, "-$1").toLowerCase()),
  so = oo((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Br = oo((e) => (e ? `on${so(e)}` : "")),
  er = (e, t) => !Object.is(e, t),
  Hr = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Wr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Ho = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  eu = (e) => {
    const t = pe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let ni;
const jo = () =>
  ni ||
  (ni =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function cn(e) {
  if (Y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = pe(r) ? ou(r) : cn(r);
      if (o) for (const s in o) t[s] = o[s];
    }
    return t;
  } else {
    if (pe(e)) return e;
    if (me(e)) return e;
  }
}
const tu = /;(?![^(]*\))/g,
  nu = /:([^]+)/,
  ru = /\/\*[^]*?\*\//g;
function ou(e) {
  const t = {};
  return (
    e
      .replace(ru, "")
      .split(tu)
      .forEach((n) => {
        if (n) {
          const r = n.split(nu);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Qe(e) {
  let t = "";
  if (pe(e)) t = e;
  else if (Y(e))
    for (let n = 0; n < e.length; n++) {
      const r = Qe(e[n]);
      r && (t += r + " ");
    }
  else if (me(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const su =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  iu = os(su);
function qa(e) {
  return !!e || e === "";
}
const Za = (e) =>
    pe(e)
      ? e
      : e == null
      ? ""
      : Y(e) || (me(e) && (e.toString === Wa || !re(e.toString)))
      ? JSON.stringify(e, Qa, 2)
      : String(e),
  Qa = (e, t) =>
    t && t.__v_isRef
      ? Qa(e, t.value)
      : wn(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {},
          ),
        }
      : Ka(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : me(t) && !Y(t) && !Va(t)
      ? String(t)
      : t;
let Xe;
class Ga {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Xe),
      !t && Xe && (this.index = (Xe.scopes || (Xe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Xe;
      try {
        return (Xe = this), t();
      } finally {
        Xe = n;
      }
    }
  }
  on() {
    Xe = this;
  }
  off() {
    Xe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function au(e) {
  return new Ga(e);
}
function lu(e, t = Xe) {
  t && t.active && t.effects.push(e);
}
function Ja() {
  return Xe;
}
function cu(e) {
  Xe && Xe.cleanups.push(e);
}
const cs = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Ya = (e) => (e.w & qt) > 0,
  Xa = (e) => (e.n & qt) > 0,
  uu = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= qt;
  },
  fu = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        Ya(o) && !Xa(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~qt),
          (o.n &= ~qt);
      }
      t.length = n;
    }
  },
  Vr = new WeakMap();
let Kn = 0,
  qt = 1;
const Do = 30;
let ht;
const on = Symbol(""),
  zo = Symbol("");
class us {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      lu(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ht,
      n = Wt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ht),
        (ht = this),
        (Wt = !0),
        (qt = 1 << ++Kn),
        Kn <= Do ? uu(this) : ri(this),
        this.fn()
      );
    } finally {
      Kn <= Do && fu(this),
        (qt = 1 << --Kn),
        (ht = this.parent),
        (Wt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ht === this
      ? (this.deferStop = !0)
      : this.active &&
        (ri(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ri(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Wt = !0;
const el = [];
function Nn() {
  el.push(Wt), (Wt = !1);
}
function Ln() {
  const e = el.pop();
  Wt = e === void 0 ? !0 : e;
}
function Ge(e, t, n) {
  if (Wt && ht) {
    let r = Vr.get(e);
    r || Vr.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = cs())), tl(o);
  }
}
function tl(e, t) {
  let n = !1;
  Kn <= Do ? Xa(e) || ((e.n |= qt), (n = !Ya(e))) : (n = !e.has(ht)),
    n && (e.add(ht), ht.deps.push(e));
}
function It(e, t, n, r, o, s) {
  const i = Vr.get(e);
  if (!i) return;
  let a = [];
  if (t === "clear") a = [...i.values()];
  else if (n === "length" && Y(e)) {
    const l = Number(r);
    i.forEach((c, u) => {
      (u === "length" || u >= l) && a.push(c);
    });
  } else
    switch ((n !== void 0 && a.push(i.get(n)), t)) {
      case "add":
        Y(e)
          ? ls(n) && a.push(i.get("length"))
          : (a.push(i.get(on)), wn(e) && a.push(i.get(zo)));
        break;
      case "delete":
        Y(e) || (a.push(i.get(on)), wn(e) && a.push(i.get(zo)));
        break;
      case "set":
        wn(e) && a.push(i.get(on));
        break;
    }
  if (a.length === 1) a[0] && Ko(a[0]);
  else {
    const l = [];
    for (const c of a) c && l.push(...c);
    Ko(cs(l));
  }
}
function Ko(e, t) {
  const n = Y(e) ? e : [...e];
  for (const r of n) r.computed && oi(r);
  for (const r of n) r.computed || oi(r);
}
function oi(e, t) {
  (e !== ht || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function du(e, t) {
  var n;
  return (n = Vr.get(e)) == null ? void 0 : n.get(t);
}
const pu = os("__proto__,__v_isRef,__isVue"),
  nl = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(as),
  ),
  hu = fs(),
  mu = fs(!1, !0),
  gu = fs(!0),
  si = vu();
function vu() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = fe(this);
        for (let s = 0, i = this.length; s < i; s++) Ge(r, "get", s + "");
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(fe)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Nn();
        const r = fe(this)[t].apply(this, n);
        return Ln(), r;
      };
    }),
    e
  );
}
function _u(e) {
  const t = fe(this);
  return Ge(t, "has", e), t.hasOwnProperty(e);
}
function fs(e = !1, t = !1) {
  return function (r, o, s) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && s === (e ? (t ? ku : al) : t ? il : sl).get(r))
      return r;
    const i = Y(r);
    if (!e) {
      if (i && le(si, o)) return Reflect.get(si, o, s);
      if (o === "hasOwnProperty") return _u;
    }
    const a = Reflect.get(r, o, s);
    return (as(o) ? nl.has(o) : pu(o)) || (e || Ge(r, "get", o), t)
      ? a
      : $e(a)
      ? i && ls(o)
        ? a
        : a.value
      : me(a)
      ? e
        ? mr(a)
        : un(a)
      : a;
  };
}
const bu = rl(),
  yu = rl(!0);
function rl(e = !1) {
  return function (n, r, o, s) {
    let i = n[r];
    if (Tn(i) && $e(i) && !$e(o)) return !1;
    if (
      !e &&
      (!qr(o) && !Tn(o) && ((i = fe(i)), (o = fe(o))), !Y(n) && $e(i) && !$e(o))
    )
      return (i.value = o), !0;
    const a = Y(n) && ls(r) ? Number(r) < n.length : le(n, r),
      l = Reflect.set(n, r, o, s);
    return (
      n === fe(s) && (a ? er(o, i) && It(n, "set", r, o) : It(n, "add", r, o)),
      l
    );
  };
}
function wu(e, t) {
  const n = le(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && It(e, "delete", t, void 0), r;
}
function Eu(e, t) {
  const n = Reflect.has(e, t);
  return (!as(t) || !nl.has(t)) && Ge(e, "has", t), n;
}
function xu(e) {
  return Ge(e, "iterate", Y(e) ? "length" : on), Reflect.ownKeys(e);
}
const ol = { get: hu, set: bu, deleteProperty: wu, has: Eu, ownKeys: xu },
  Cu = {
    get: gu,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Tu = Me({}, ol, { get: mu, set: yu }),
  ds = (e) => e,
  io = (e) => Reflect.getPrototypeOf(e);
function wr(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = fe(e),
    s = fe(t);
  n || (t !== s && Ge(o, "get", t), Ge(o, "get", s));
  const { has: i } = io(o),
    a = r ? ds : n ? gs : tr;
  if (i.call(o, t)) return a(e.get(t));
  if (i.call(o, s)) return a(e.get(s));
  e !== o && e.get(t);
}
function Er(e, t = !1) {
  const n = this.__v_raw,
    r = fe(n),
    o = fe(e);
  return (
    t || (e !== o && Ge(r, "has", e), Ge(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function xr(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ge(fe(e), "iterate", on), Reflect.get(e, "size", e)
  );
}
function ii(e) {
  e = fe(e);
  const t = fe(this);
  return io(t).has.call(t, e) || (t.add(e), It(t, "add", e, e)), this;
}
function ai(e, t) {
  t = fe(t);
  const n = fe(this),
    { has: r, get: o } = io(n);
  let s = r.call(n, e);
  s || ((e = fe(e)), (s = r.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), s ? er(t, i) && It(n, "set", e, t) : It(n, "add", e, t), this
  );
}
function li(e) {
  const t = fe(this),
    { has: n, get: r } = io(t);
  let o = n.call(t, e);
  o || ((e = fe(e)), (o = n.call(t, e))), r && r.call(t, e);
  const s = t.delete(e);
  return o && It(t, "delete", e, void 0), s;
}
function ci() {
  const e = fe(this),
    t = e.size !== 0,
    n = e.clear();
  return t && It(e, "clear", void 0, void 0), n;
}
function Cr(e, t) {
  return function (r, o) {
    const s = this,
      i = s.__v_raw,
      a = fe(i),
      l = t ? ds : e ? gs : tr;
    return (
      !e && Ge(a, "iterate", on), i.forEach((c, u) => r.call(o, l(c), l(u), s))
    );
  };
}
function Tr(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = fe(o),
      i = wn(s),
      a = e === "entries" || (e === Symbol.iterator && i),
      l = e === "keys" && i,
      c = o[e](...r),
      u = n ? ds : t ? gs : tr;
    return (
      !t && Ge(s, "iterate", l ? zo : on),
      {
        next() {
          const { value: f, done: d } = c.next();
          return d
            ? { value: f, done: d }
            : { value: a ? [u(f[0]), u(f[1])] : u(f), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Nt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Ou() {
  const e = {
      get(s) {
        return wr(this, s);
      },
      get size() {
        return xr(this);
      },
      has: Er,
      add: ii,
      set: ai,
      delete: li,
      clear: ci,
      forEach: Cr(!1, !1),
    },
    t = {
      get(s) {
        return wr(this, s, !1, !0);
      },
      get size() {
        return xr(this);
      },
      has: Er,
      add: ii,
      set: ai,
      delete: li,
      clear: ci,
      forEach: Cr(!1, !0),
    },
    n = {
      get(s) {
        return wr(this, s, !0);
      },
      get size() {
        return xr(this, !0);
      },
      has(s) {
        return Er.call(this, s, !0);
      },
      add: Nt("add"),
      set: Nt("set"),
      delete: Nt("delete"),
      clear: Nt("clear"),
      forEach: Cr(!0, !1),
    },
    r = {
      get(s) {
        return wr(this, s, !0, !0);
      },
      get size() {
        return xr(this, !0);
      },
      has(s) {
        return Er.call(this, s, !0);
      },
      add: Nt("add"),
      set: Nt("set"),
      delete: Nt("delete"),
      clear: Nt("clear"),
      forEach: Cr(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (e[s] = Tr(s, !1, !1)),
        (n[s] = Tr(s, !0, !1)),
        (t[s] = Tr(s, !1, !0)),
        (r[s] = Tr(s, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Mu, Pu, Su, Au] = Ou();
function ps(e, t) {
  const n = t ? (e ? Au : Su) : e ? Pu : Mu;
  return (r, o, s) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? r
      : Reflect.get(le(n, o) && o in r ? n : r, o, s);
}
const Ru = { get: ps(!1, !1) },
  Iu = { get: ps(!1, !0) },
  $u = { get: ps(!0, !1) },
  sl = new WeakMap(),
  il = new WeakMap(),
  al = new WeakMap(),
  ku = new WeakMap();
function Fu(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Nu(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Fu(Jc(e));
}
function un(e) {
  return Tn(e) ? e : hs(e, !1, ol, Ru, sl);
}
function ll(e) {
  return hs(e, !1, Tu, Iu, il);
}
function mr(e) {
  return hs(e, !0, Cu, $u, al);
}
function hs(e, t, n, r, o) {
  if (!me(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = o.get(e);
  if (s) return s;
  const i = Nu(e);
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? r : n);
  return o.set(e, a), a;
}
function En(e) {
  return Tn(e) ? En(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Tn(e) {
  return !!(e && e.__v_isReadonly);
}
function qr(e) {
  return !!(e && e.__v_isShallow);
}
function cl(e) {
  return En(e) || Tn(e);
}
function fe(e) {
  const t = e && e.__v_raw;
  return t ? fe(t) : e;
}
function ms(e) {
  return Wr(e, "__v_skip", !0), e;
}
const tr = (e) => (me(e) ? un(e) : e),
  gs = (e) => (me(e) ? mr(e) : e);
function ul(e) {
  Wt && ht && ((e = fe(e)), tl(e.dep || (e.dep = cs())));
}
function vs(e, t) {
  e = fe(e);
  const n = e.dep;
  n && Ko(n);
}
function $e(e) {
  return !!(e && e.__v_isRef === !0);
}
function te(e) {
  return fl(e, !1);
}
function _s(e) {
  return fl(e, !0);
}
function fl(e, t) {
  return $e(e) ? e : new Lu(e, t);
}
class Lu {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : fe(t)),
      (this._value = n ? t : tr(t));
  }
  get value() {
    return ul(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || qr(t) || Tn(t);
    (t = n ? t : fe(t)),
      er(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : tr(t)), vs(this));
  }
}
function N1(e) {
  vs(e);
}
function O(e) {
  return $e(e) ? e.value : e;
}
const Bu = {
  get: (e, t, n) => O(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return $e(o) && !$e(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function dl(e) {
  return En(e) ? e : new Proxy(e, Bu);
}
function L1(e) {
  const t = Y(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = pl(e, n);
  return t;
}
class Hu {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return du(fe(this._object), this._key);
  }
}
class ju {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function bn(e, t, n) {
  return $e(e)
    ? e
    : re(e)
    ? new ju(e)
    : me(e) && arguments.length > 1
    ? pl(e, t, n)
    : te(e);
}
function pl(e, t, n) {
  const r = e[t];
  return $e(r) ? r : new Hu(e, t, n);
}
class Du {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new us(t, () => {
        this._dirty || ((this._dirty = !0), vs(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = fe(this);
    return (
      ul(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function zu(e, t, n = !1) {
  let r, o;
  const s = re(e);
  return (
    s ? ((r = e), (o = De)) : ((r = e.get), (o = e.set)),
    new Du(r, o, s || !o, n)
  );
}
function Ku(e, ...t) {}
function Vt(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    ao(s, t, n);
  }
  return o;
}
function it(e, t, n, r) {
  if (re(e)) {
    const s = Vt(e, t, n, r);
    return (
      s &&
        Ua(s) &&
        s.catch((i) => {
          ao(i, t, n);
        }),
      s
    );
  }
  const o = [];
  for (let s = 0; s < e.length; s++) o.push(it(e[s], t, n, r));
  return o;
}
function ao(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy,
      a = n;
    for (; s; ) {
      const c = s.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, i, a) === !1) return;
      }
      s = s.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Vt(l, null, 10, [e, i, a]);
      return;
    }
  }
  Uu(e, n, o, r);
}
function Uu(e, t, n, r = !0) {
  console.error(e);
}
let nr = !1,
  Uo = !1;
const He = [];
let xt = 0;
const xn = [];
let At = null,
  Xt = 0;
const hl = Promise.resolve();
let bs = null;
function On(e) {
  const t = bs || hl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Wu(e) {
  let t = xt + 1,
    n = He.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    rr(He[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function ys(e) {
  (!He.length || !He.includes(e, nr && e.allowRecurse ? xt + 1 : xt)) &&
    (e.id == null ? He.push(e) : He.splice(Wu(e.id), 0, e), ml());
}
function ml() {
  !nr && !Uo && ((Uo = !0), (bs = hl.then(vl)));
}
function Vu(e) {
  const t = He.indexOf(e);
  t > xt && He.splice(t, 1);
}
function qu(e) {
  Y(e)
    ? xn.push(...e)
    : (!At || !At.includes(e, e.allowRecurse ? Xt + 1 : Xt)) && xn.push(e),
    ml();
}
function ui(e, t = nr ? xt + 1 : 0) {
  for (; t < He.length; t++) {
    const n = He[t];
    n && n.pre && (He.splice(t, 1), t--, n());
  }
}
function gl(e) {
  if (xn.length) {
    const t = [...new Set(xn)];
    if (((xn.length = 0), At)) {
      At.push(...t);
      return;
    }
    for (At = t, At.sort((n, r) => rr(n) - rr(r)), Xt = 0; Xt < At.length; Xt++)
      At[Xt]();
    (At = null), (Xt = 0);
  }
}
const rr = (e) => (e.id == null ? 1 / 0 : e.id),
  Zu = (e, t) => {
    const n = rr(e) - rr(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function vl(e) {
  (Uo = !1), (nr = !0), He.sort(Zu);
  const t = De;
  try {
    for (xt = 0; xt < He.length; xt++) {
      const n = He[xt];
      n && n.active !== !1 && Vt(n, null, 14);
    }
  } finally {
    (xt = 0),
      (He.length = 0),
      gl(),
      (nr = !1),
      (bs = null),
      (He.length || xn.length) && vl();
  }
}
function Qu(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Ee;
  let o = n;
  const s = t.startsWith("update:"),
    i = s && t.slice(7);
  if (i && i in r) {
    const u = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: f, trim: d } = r[u] || Ee;
    d && (o = n.map((m) => (pe(m) ? m.trim() : m))), f && (o = n.map(Ho));
  }
  let a,
    l = r[(a = Br(t))] || r[(a = Br(Tt(t)))];
  !l && s && (l = r[(a = Br(ln(t)))]), l && it(l, e, 6, o);
  const c = r[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), it(c, e, 6, o);
  }
}
function _l(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const s = e.emits;
  let i = {},
    a = !1;
  if (!re(e)) {
    const l = (c) => {
      const u = _l(c, t, !0);
      u && ((a = !0), Me(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !s && !a
    ? (me(e) && r.set(e, null), null)
    : (Y(s) ? s.forEach((l) => (i[l] = null)) : Me(i, s),
      me(e) && r.set(e, i),
      i);
}
function lo(e, t) {
  return !e || !no(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      le(e, t[0].toLowerCase() + t.slice(1)) || le(e, ln(t)) || le(e, t));
}
let Ne = null,
  co = null;
function Zr(e) {
  const t = Ne;
  return (Ne = e), (co = (e && e.type.__scopeId) || null), t;
}
function Gu(e) {
  co = e;
}
function Ju() {
  co = null;
}
function we(e, t = Ne, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && xi(-1);
    const s = Zr(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Zr(s), r._d && xi(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function yo(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [i],
    slots: a,
    attrs: l,
    emit: c,
    render: u,
    renderCache: f,
    data: d,
    setupState: m,
    ctx: v,
    inheritAttrs: g,
  } = e;
  let y, _;
  const E = Zr(e);
  try {
    if (n.shapeFlag & 4) {
      const w = o || r;
      (y = Et(u.call(w, w, f, s, m, d, v))), (_ = l);
    } else {
      const w = t;
      (y = Et(
        w.length > 1 ? w(s, { attrs: l, slots: a, emit: c }) : w(s, null),
      )),
        (_ = t.props ? l : Yu(l));
    }
  } catch (w) {
    (Zn.length = 0), ao(w, e, 1), (y = ae(tt));
  }
  let $ = y;
  if (_ && g !== !1) {
    const w = Object.keys(_),
      { shapeFlag: H } = $;
    w.length && H & 7 && (i && w.some(ss) && (_ = Xu(_, i)), ($ = $t($, _)));
  }
  return (
    n.dirs && (($ = $t($)), ($.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs)),
    n.transition && ($.transition = n.transition),
    (y = $),
    Zr(E),
    y
  );
}
const Yu = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || no(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Xu = (e, t) => {
    const n = {};
    for (const r in e) (!ss(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function ef(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: i, children: a, patchFlag: l } = t,
    c = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? fi(r, i, c) : !!i;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const d = u[f];
        if (i[d] !== r[d] && !lo(c, d)) return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? fi(r, i, c)
        : !0
      : !!i;
  return !1;
}
function fi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !lo(n, s)) return !0;
  }
  return !1;
}
function tf({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const nf = (e) => e.__isSuspense;
function rf(e, t) {
  t && t.pendingBranch
    ? Y(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : qu(e);
}
function bl(e, t) {
  return ws(e, null, t);
}
const Or = {};
function he(e, t, n) {
  return ws(e, t, n);
}
function ws(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = Ee,
) {
  var a;
  const l = Ja() === ((a = Ie) == null ? void 0 : a.scope) ? Ie : null;
  let c,
    u = !1,
    f = !1;
  if (
    ($e(e)
      ? ((c = () => e.value), (u = qr(e)))
      : En(e)
      ? ((c = () => e), (r = !0))
      : Y(e)
      ? ((f = !0),
        (u = e.some((w) => En(w) || qr(w))),
        (c = () =>
          e.map((w) => {
            if ($e(w)) return w.value;
            if (En(w)) return nn(w);
            if (re(w)) return Vt(w, l, 2);
          })))
      : re(e)
      ? t
        ? (c = () => Vt(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return d && d(), it(e, l, 3, [m]);
          })
      : (c = De),
    t && r)
  ) {
    const w = c;
    c = () => nn(w());
  }
  let d,
    m = (w) => {
      d = E.onStop = () => {
        Vt(w, l, 4);
      };
    },
    v;
  if (lr)
    if (
      ((m = De),
      t ? n && it(t, l, 3, [c(), f ? [] : void 0, m]) : c(),
      o === "sync")
    ) {
      const w = Gf();
      v = w.__watcherHandles || (w.__watcherHandles = []);
    } else return De;
  let g = f ? new Array(e.length).fill(Or) : Or;
  const y = () => {
    if (E.active)
      if (t) {
        const w = E.run();
        (r || u || (f ? w.some((H, D) => er(H, g[D])) : er(w, g))) &&
          (d && d(),
          it(t, l, 3, [w, g === Or ? void 0 : f && g[0] === Or ? [] : g, m]),
          (g = w));
      } else E.run();
  };
  y.allowRecurse = !!t;
  let _;
  o === "sync"
    ? (_ = y)
    : o === "post"
    ? (_ = () => We(y, l && l.suspense))
    : ((y.pre = !0), l && (y.id = l.uid), (_ = () => ys(y)));
  const E = new us(c, _);
  t
    ? n
      ? y()
      : (g = E.run())
    : o === "post"
    ? We(E.run.bind(E), l && l.suspense)
    : E.run();
  const $ = () => {
    E.stop(), l && l.scope && is(l.scope.effects, E);
  };
  return v && v.push($), $;
}
function of(e, t, n) {
  const r = this.proxy,
    o = pe(e) ? (e.includes(".") ? yl(r, e) : () => r[e]) : e.bind(r, r);
  let s;
  re(t) ? (s = t) : ((s = t.handler), (n = t));
  const i = Ie;
  Pn(this);
  const a = ws(o, s.bind(r), n);
  return i ? Pn(i) : sn(), a;
}
function yl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function nn(e, t) {
  if (!me(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), $e(e))) nn(e.value, t);
  else if (Y(e)) for (let n = 0; n < e.length; n++) nn(e[n], t);
  else if (Ka(e) || wn(e))
    e.forEach((n) => {
      nn(n, t);
    });
  else if (Va(e)) for (const n in e) nn(e[n], t);
  return e;
}
function Es(e, t) {
  const n = Ne;
  if (n === null) return e;
  const r = ho(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, a, l, c = Ee] = t[s];
    i &&
      (re(i) && (i = { mounted: i, updated: i }),
      i.deep && nn(a),
      o.push({
        dir: i,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }));
  }
  return e;
}
function Qt(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let l = a.dir[r];
    l && (Nn(), it(l, n, 8, [e.el, a, e, t]), Ln());
  }
}
function wl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    rt(() => {
      e.isMounted = !0;
    }),
    ut(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const st = [Function, Array],
  El = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: st,
    onEnter: st,
    onAfterEnter: st,
    onEnterCancelled: st,
    onBeforeLeave: st,
    onLeave: st,
    onAfterLeave: st,
    onLeaveCancelled: st,
    onBeforeAppear: st,
    onAppear: st,
    onAfterAppear: st,
    onAppearCancelled: st,
  },
  sf = {
    name: "BaseTransition",
    props: El,
    setup(e, { slots: t }) {
      const n = _t(),
        r = wl();
      let o;
      return () => {
        const s = t.default && xs(t.default(), !0);
        if (!s || !s.length) return;
        let i = s[0];
        if (s.length > 1) {
          for (const g of s)
            if (g.type !== tt) {
              i = g;
              break;
            }
        }
        const a = fe(e),
          { mode: l } = a;
        if (r.isLeaving) return wo(i);
        const c = di(i);
        if (!c) return wo(i);
        const u = or(c, a, r, n);
        sr(c, u);
        const f = n.subTree,
          d = f && di(f);
        let m = !1;
        const { getTransitionKey: v } = c.type;
        if (v) {
          const g = v();
          o === void 0 ? (o = g) : g !== o && ((o = g), (m = !0));
        }
        if (d && d.type !== tt && (!en(c, d) || m)) {
          const g = or(d, a, r, n);
          if ((sr(d, g), l === "out-in"))
            return (
              (r.isLeaving = !0),
              (g.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              wo(i)
            );
          l === "in-out" &&
            c.type !== tt &&
            (g.delayLeave = (y, _, E) => {
              const $ = xl(r, d);
              ($[String(d.key)] = d),
                (y._leaveCb = () => {
                  _(), (y._leaveCb = void 0), delete u.delayedLeave;
                }),
                (u.delayedLeave = E);
            });
        }
        return i;
      };
    },
  },
  af = sf;
function xl(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function or(e, t, n, r) {
  const {
      appear: o,
      mode: s,
      persisted: i = !1,
      onBeforeEnter: a,
      onEnter: l,
      onAfterEnter: c,
      onEnterCancelled: u,
      onBeforeLeave: f,
      onLeave: d,
      onAfterLeave: m,
      onLeaveCancelled: v,
      onBeforeAppear: g,
      onAppear: y,
      onAfterAppear: _,
      onAppearCancelled: E,
    } = t,
    $ = String(e.key),
    w = xl(n, e),
    H = (R, q) => {
      R && it(R, r, 9, q);
    },
    D = (R, q) => {
      const W = q[1];
      H(R, q),
        Y(R) ? R.every((I) => I.length <= 1) && W() : R.length <= 1 && W();
    },
    L = {
      mode: s,
      persisted: i,
      beforeEnter(R) {
        let q = a;
        if (!n.isMounted)
          if (o) q = g || a;
          else return;
        R._leaveCb && R._leaveCb(!0);
        const W = w[$];
        W && en(e, W) && W.el._leaveCb && W.el._leaveCb(), H(q, [R]);
      },
      enter(R) {
        let q = l,
          W = c,
          I = u;
        if (!n.isMounted)
          if (o) (q = y || l), (W = _ || c), (I = E || u);
          else return;
        let x = !1;
        const k = (R._enterCb = (X) => {
          x ||
            ((x = !0),
            X ? H(I, [R]) : H(W, [R]),
            L.delayedLeave && L.delayedLeave(),
            (R._enterCb = void 0));
        });
        q ? D(q, [R, k]) : k();
      },
      leave(R, q) {
        const W = String(e.key);
        if ((R._enterCb && R._enterCb(!0), n.isUnmounting)) return q();
        H(f, [R]);
        let I = !1;
        const x = (R._leaveCb = (k) => {
          I ||
            ((I = !0),
            q(),
            k ? H(v, [R]) : H(m, [R]),
            (R._leaveCb = void 0),
            w[W] === e && delete w[W]);
        });
        (w[W] = e), d ? D(d, [R, x]) : x();
      },
      clone(R) {
        return or(R, t, n, r);
      },
    };
  return L;
}
function wo(e) {
  if (uo(e)) return (e = $t(e)), (e.children = null), e;
}
function di(e) {
  return uo(e) ? (e.children ? e.children[0] : void 0) : e;
}
function sr(e, t) {
  e.shapeFlag & 6 && e.component
    ? sr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function xs(e, t = !1, n) {
  let r = [],
    o = 0;
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === Fe
      ? (i.patchFlag & 128 && o++, (r = r.concat(xs(i.children, t, a))))
      : (t || i.type !== tt) && r.push(a != null ? $t(i, { key: a }) : i);
  }
  if (o > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
function ie(e, t) {
  return re(e) ? (() => Me({ name: e.name }, t, { setup: e }))() : e;
}
const Wn = (e) => !!e.type.__asyncLoader,
  uo = (e) => e.type.__isKeepAlive;
function lf(e, t) {
  Tl(e, "a", t);
}
function Cl(e, t) {
  Tl(e, "da", t);
}
function Tl(e, t, n = Ie) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((fo(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      uo(o.parent.vnode) && cf(r, t, n, o), (o = o.parent);
  }
}
function cf(e, t, n, r) {
  const o = fo(t, e, r, !0);
  Pl(() => {
    is(r[t], o);
  }, n);
}
function fo(e, t, n = Ie, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Nn(), Pn(n);
          const a = it(t, n, e, i);
          return sn(), Ln(), a;
        });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Ft =
    (e) =>
    (t, n = Ie) =>
      (!lr || e === "sp") && fo(e, (...r) => t(...r), n),
  Ol = Ft("bm"),
  rt = Ft("m"),
  uf = Ft("bu"),
  Ml = Ft("u"),
  ut = Ft("bum"),
  Pl = Ft("um"),
  ff = Ft("sp"),
  df = Ft("rtg"),
  pf = Ft("rtc");
function hf(e, t = Ie) {
  fo("ec", e, t);
}
const Cs = "components",
  mf = "directives";
function Sl(e, t) {
  return Ts(Cs, e, !0, t) || e;
}
const Al = Symbol.for("v-ndc");
function B1(e) {
  return pe(e) ? Ts(Cs, e, !1) || e : e || Al;
}
function H1(e) {
  return Ts(mf, e);
}
function Ts(e, t, n = !0, r = !1) {
  const o = Ne || Ie;
  if (o) {
    const s = o.type;
    if (e === Cs) {
      const a = qf(s, !1);
      if (a && (a === t || a === Tt(t) || a === so(Tt(t)))) return s;
    }
    const i = pi(o[e] || s[e], t) || pi(o.appContext[e], t);
    return !i && r ? s : i;
  }
}
function pi(e, t) {
  return e && (e[t] || e[Tt(t)] || e[so(Tt(t))]);
}
function j1(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (Y(e) || pe(e)) {
    o = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      o[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (me(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, a) => t(i, a, void 0, s && s[a]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let a = 0, l = i.length; a < l; a++) {
        const c = i[a];
        o[a] = t(e[c], c, a, s && s[a]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
function D1(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (Y(r)) for (let o = 0; o < r.length; o++) e[r[o].name] = r[o].fn;
    else
      r &&
        (e[r.name] = r.key
          ? (...o) => {
              const s = r.fn(...o);
              return s && (s.key = r.key), s;
            }
          : r.fn);
  }
  return e;
}
function Te(e, t, n = {}, r, o) {
  if (Ne.isCE || (Ne.parent && Wn(Ne.parent) && Ne.parent.isCE))
    return t !== "default" && (n.name = t), ae("slot", n, r && r());
  let s = e[t];
  s && s._c && (s._d = !1), oe();
  const i = s && Rl(s(n)),
    a = nt(
      Fe,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2,
    );
  return (
    !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    s && s._c && (s._d = !0),
    a
  );
}
function Rl(e) {
  return e.some((t) =>
    Mn(t) ? !(t.type === tt || (t.type === Fe && !Rl(t.children))) : !0,
  )
    ? e
    : null;
}
function gf(e, t) {
  const n = {};
  for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : Br(r)] = e[r];
  return n;
}
const Wo = (e) => (e ? (Kl(e) ? ho(e) || e.proxy : Wo(e.parent)) : null),
  Vn = Me(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Wo(e.parent),
    $root: (e) => Wo(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Os(e),
    $forceUpdate: (e) => e.f || (e.f = () => ys(e.update)),
    $nextTick: (e) => e.n || (e.n = On.bind(e.proxy)),
    $watch: (e) => of.bind(e),
  }),
  Eo = (e, t) => e !== Ee && !e.__isScriptSetup && le(e, t),
  vf = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: s,
        accessCache: i,
        type: a,
        appContext: l,
      } = e;
      let c;
      if (t[0] !== "$") {
        const m = i[t];
        if (m !== void 0)
          switch (m) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (Eo(r, t)) return (i[t] = 1), r[t];
          if (o !== Ee && le(o, t)) return (i[t] = 2), o[t];
          if ((c = e.propsOptions[0]) && le(c, t)) return (i[t] = 3), s[t];
          if (n !== Ee && le(n, t)) return (i[t] = 4), n[t];
          Vo && (i[t] = 0);
        }
      }
      const u = Vn[t];
      let f, d;
      if (u) return t === "$attrs" && Ge(e, "get", t), u(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== Ee && le(n, t)) return (i[t] = 4), n[t];
      if (((d = l.config.globalProperties), le(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e;
      return Eo(o, t)
        ? ((o[t] = n), !0)
        : r !== Ee && le(r, t)
        ? ((r[t] = n), !0)
        : le(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: s,
        },
      },
      i,
    ) {
      let a;
      return (
        !!n[i] ||
        (e !== Ee && le(e, i)) ||
        Eo(t, i) ||
        ((a = s[0]) && le(a, i)) ||
        le(r, i) ||
        le(Vn, i) ||
        le(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : le(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function _f() {
  return Il().slots;
}
function z1() {
  return Il().attrs;
}
function Il() {
  const e = _t();
  return e.setupContext || (e.setupContext = Wl(e));
}
function hi(e) {
  return Y(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Vo = !0;
function bf(e) {
  const t = Os(e),
    n = e.proxy,
    r = e.ctx;
  (Vo = !1), t.beforeCreate && mi(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: s,
    methods: i,
    watch: a,
    provide: l,
    inject: c,
    created: u,
    beforeMount: f,
    mounted: d,
    beforeUpdate: m,
    updated: v,
    activated: g,
    deactivated: y,
    beforeDestroy: _,
    beforeUnmount: E,
    destroyed: $,
    unmounted: w,
    render: H,
    renderTracked: D,
    renderTriggered: L,
    errorCaptured: R,
    serverPrefetch: q,
    expose: W,
    inheritAttrs: I,
    components: x,
    directives: k,
    filters: X,
  } = t;
  if ((c && yf(c, r, null), i))
    for (const P in i) {
      const V = i[P];
      re(V) && (r[P] = V.bind(n));
    }
  if (o) {
    const P = o.call(n, n);
    me(P) && (e.data = un(P));
  }
  if (((Vo = !0), s))
    for (const P in s) {
      const V = s[P],
        ce = re(V) ? V.bind(n, n) : re(V.get) ? V.get.bind(n, n) : De,
        xe = !re(V) && re(V.set) ? V.set.bind(n) : De,
        Be = U({ get: ce, set: xe });
      Object.defineProperty(r, P, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (Se) => (Be.value = Se),
      });
    }
  if (a) for (const P in a) $l(a[P], r, n, P);
  if (l) {
    const P = re(l) ? l.call(n) : l;
    Reflect.ownKeys(P).forEach((V) => {
      et(V, P[V]);
    });
  }
  u && mi(u, e, "c");
  function j(P, V) {
    Y(V) ? V.forEach((ce) => P(ce.bind(n))) : V && P(V.bind(n));
  }
  if (
    (j(Ol, f),
    j(rt, d),
    j(uf, m),
    j(Ml, v),
    j(lf, g),
    j(Cl, y),
    j(hf, R),
    j(pf, D),
    j(df, L),
    j(ut, E),
    j(Pl, w),
    j(ff, q),
    Y(W))
  )
    if (W.length) {
      const P = e.exposed || (e.exposed = {});
      W.forEach((V) => {
        Object.defineProperty(P, V, {
          get: () => n[V],
          set: (ce) => (n[V] = ce),
        });
      });
    } else e.exposed || (e.exposed = {});
  H && e.render === De && (e.render = H),
    I != null && (e.inheritAttrs = I),
    x && (e.components = x),
    k && (e.directives = k);
}
function yf(e, t, n = De) {
  Y(e) && (e = qo(e));
  for (const r in e) {
    const o = e[r];
    let s;
    me(o)
      ? "default" in o
        ? (s = Ce(o.from || r, o.default, !0))
        : (s = Ce(o.from || r))
      : (s = Ce(o)),
      $e(s)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (i) => (s.value = i),
          })
        : (t[r] = s);
  }
}
function mi(e, t, n) {
  it(Y(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function $l(e, t, n, r) {
  const o = r.includes(".") ? yl(n, r) : () => n[r];
  if (pe(e)) {
    const s = t[e];
    re(s) && he(o, s);
  } else if (re(e)) he(o, e.bind(n));
  else if (me(e))
    if (Y(e)) e.forEach((s) => $l(s, t, n, r));
    else {
      const s = re(e.handler) ? e.handler.bind(n) : t[e.handler];
      re(s) && he(o, s, e);
    }
}
function Os(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    a = s.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !o.length && !n && !r
      ? (l = t)
      : ((l = {}), o.length && o.forEach((c) => Qr(l, c, i, !0)), Qr(l, t, i)),
    me(t) && s.set(t, l),
    l
  );
}
function Qr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Qr(e, s, n, !0), o && o.forEach((i) => Qr(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = wf[i] || (n && n[i]);
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const wf = {
  data: gi,
  props: vi,
  emits: vi,
  methods: Un,
  computed: Un,
  beforeCreate: je,
  created: je,
  beforeMount: je,
  mounted: je,
  beforeUpdate: je,
  updated: je,
  beforeDestroy: je,
  beforeUnmount: je,
  destroyed: je,
  unmounted: je,
  activated: je,
  deactivated: je,
  errorCaptured: je,
  serverPrefetch: je,
  components: Un,
  directives: Un,
  watch: xf,
  provide: gi,
  inject: Ef,
};
function gi(e, t) {
  return t
    ? e
      ? function () {
          return Me(
            re(e) ? e.call(this, this) : e,
            re(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function Ef(e, t) {
  return Un(qo(e), qo(t));
}
function qo(e) {
  if (Y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Un(e, t) {
  return e ? Me(Object.create(null), e, t) : t;
}
function vi(e, t) {
  return e
    ? Y(e) && Y(t)
      ? [...new Set([...e, ...t])]
      : Me(Object.create(null), hi(e), hi(t ?? {}))
    : t;
}
function xf(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Me(Object.create(null), e);
  for (const r in t) n[r] = je(e[r], t[r]);
  return n;
}
function kl() {
  return {
    app: null,
    config: {
      isNativeTag: Zc,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Cf = 0;
function Tf(e, t) {
  return function (r, o = null) {
    re(r) || (r = Me({}, r)), o != null && !me(o) && (o = null);
    const s = kl(),
      i = new Set();
    let a = !1;
    const l = (s.app = {
      _uid: Cf++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Jf,
      get config() {
        return s.config;
      },
      set config(c) {},
      use(c, ...u) {
        return (
          i.has(c) ||
            (c && re(c.install)
              ? (i.add(c), c.install(l, ...u))
              : re(c) && (i.add(c), c(l, ...u))),
          l
        );
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), l;
      },
      component(c, u) {
        return u ? ((s.components[c] = u), l) : s.components[c];
      },
      directive(c, u) {
        return u ? ((s.directives[c] = u), l) : s.directives[c];
      },
      mount(c, u, f) {
        if (!a) {
          const d = ae(r, o);
          return (
            (d.appContext = s),
            u && t ? t(d, c) : e(d, c, f),
            (a = !0),
            (l._container = c),
            (c.__vue_app__ = l),
            ho(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(c, u) {
        return (s.provides[c] = u), l;
      },
      runWithContext(c) {
        Gr = l;
        try {
          return c();
        } finally {
          Gr = null;
        }
      },
    });
    return l;
  };
}
let Gr = null;
function et(e, t) {
  if (Ie) {
    let n = Ie.provides;
    const r = Ie.parent && Ie.parent.provides;
    r === n && (n = Ie.provides = Object.create(r)), (n[e] = t);
  }
}
function Ce(e, t, n = !1) {
  const r = Ie || Ne;
  if (r || Gr) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Gr._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && re(t) ? t.call(r && r.proxy) : t;
  }
}
function Of(e, t, n, r = !1) {
  const o = {},
    s = {};
  Wr(s, po, 1), (e.propsDefaults = Object.create(null)), Fl(e, t, o, s);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = r ? o : ll(o)) : e.type.props ? (e.props = o) : (e.props = s),
    (e.attrs = s);
}
function Mf(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: i },
    } = e,
    a = fe(o),
    [l] = e.propsOptions;
  let c = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let d = u[f];
        if (lo(e.emitsOptions, d)) continue;
        const m = t[d];
        if (l)
          if (le(s, d)) m !== s[d] && ((s[d] = m), (c = !0));
          else {
            const v = Tt(d);
            o[v] = Zo(l, a, v, m, e, !1);
          }
        else m !== s[d] && ((s[d] = m), (c = !0));
      }
    }
  } else {
    Fl(e, t, o, s) && (c = !0);
    let u;
    for (const f in a)
      (!t || (!le(t, f) && ((u = ln(f)) === f || !le(t, u)))) &&
        (l
          ? n &&
            (n[f] !== void 0 || n[u] !== void 0) &&
            (o[f] = Zo(l, a, f, void 0, e, !0))
          : delete o[f]);
    if (s !== a)
      for (const f in s) (!t || !le(t, f)) && (delete s[f], (c = !0));
  }
  c && It(e, "set", "$attrs");
}
function Fl(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1,
    a;
  if (t)
    for (let l in t) {
      if (Lr(l)) continue;
      const c = t[l];
      let u;
      o && le(o, (u = Tt(l)))
        ? !s || !s.includes(u)
          ? (n[u] = c)
          : ((a || (a = {}))[u] = c)
        : lo(e.emitsOptions, l) ||
          ((!(l in r) || c !== r[l]) && ((r[l] = c), (i = !0)));
    }
  if (s) {
    const l = fe(n),
      c = a || Ee;
    for (let u = 0; u < s.length; u++) {
      const f = s[u];
      n[f] = Zo(o, l, f, c[f], e, !le(c, f));
    }
  }
  return i;
}
function Zo(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = le(i, "default");
    if (a && r === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && re(l)) {
        const { propsDefaults: c } = o;
        n in c ? (r = c[n]) : (Pn(o), (r = c[n] = l.call(null, t)), sn());
      } else r = l;
    }
    i[0] &&
      (s && !a ? (r = !1) : i[1] && (r === "" || r === ln(n)) && (r = !0));
  }
  return r;
}
function Nl(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const s = e.props,
    i = {},
    a = [];
  let l = !1;
  if (!re(e)) {
    const u = (f) => {
      l = !0;
      const [d, m] = Nl(f, t, !0);
      Me(i, d), m && a.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!s && !l) return me(e) && r.set(e, yn), yn;
  if (Y(s))
    for (let u = 0; u < s.length; u++) {
      const f = Tt(s[u]);
      _i(f) && (i[f] = Ee);
    }
  else if (s)
    for (const u in s) {
      const f = Tt(u);
      if (_i(f)) {
        const d = s[u],
          m = (i[f] = Y(d) || re(d) ? { type: d } : Me({}, d));
        if (m) {
          const v = wi(Boolean, m.type),
            g = wi(String, m.type);
          (m[0] = v > -1),
            (m[1] = g < 0 || v < g),
            (v > -1 || le(m, "default")) && a.push(f);
        }
      }
    }
  const c = [i, a];
  return me(e) && r.set(e, c), c;
}
function _i(e) {
  return e[0] !== "$";
}
function bi(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function yi(e, t) {
  return bi(e) === bi(t);
}
function wi(e, t) {
  return Y(t) ? t.findIndex((n) => yi(n, e)) : re(t) && yi(t, e) ? 0 : -1;
}
const Ll = (e) => e[0] === "_" || e === "$stable",
  Ms = (e) => (Y(e) ? e.map(Et) : [Et(e)]),
  Pf = (e, t, n) => {
    if (t._n) return t;
    const r = we((...o) => Ms(t(...o)), n);
    return (r._c = !1), r;
  },
  Bl = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (Ll(o)) continue;
      const s = e[o];
      if (re(s)) t[o] = Pf(o, s, r);
      else if (s != null) {
        const i = Ms(s);
        t[o] = () => i;
      }
    }
  },
  Hl = (e, t) => {
    const n = Ms(t);
    e.slots.default = () => n;
  },
  Sf = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = fe(t)), Wr(t, "_", n)) : Bl(t, (e.slots = {}));
    } else (e.slots = {}), t && Hl(e, t);
    Wr(e.slots, po, 1);
  },
  Af = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let s = !0,
      i = Ee;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (s = !1)
          : (Me(o, t), !n && a === 1 && delete o._)
        : ((s = !t.$stable), Bl(t, o)),
        (i = t);
    } else t && (Hl(e, t), (i = { default: 1 }));
    if (s) for (const a in o) !Ll(a) && !(a in i) && delete o[a];
  };
function Qo(e, t, n, r, o = !1) {
  if (Y(e)) {
    e.forEach((d, m) => Qo(d, t && (Y(t) ? t[m] : t), n, r, o));
    return;
  }
  if (Wn(r) && !o) return;
  const s = r.shapeFlag & 4 ? ho(r.component) || r.component.proxy : r.el,
    i = o ? null : s,
    { i: a, r: l } = e,
    c = t && t.r,
    u = a.refs === Ee ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (c != null &&
      c !== l &&
      (pe(c)
        ? ((u[c] = null), le(f, c) && (f[c] = null))
        : $e(c) && (c.value = null)),
    re(l))
  )
    Vt(l, a, 12, [i, u]);
  else {
    const d = pe(l),
      m = $e(l);
    if (d || m) {
      const v = () => {
        if (e.f) {
          const g = d ? (le(f, l) ? f[l] : u[l]) : l.value;
          o
            ? Y(g) && is(g, s)
            : Y(g)
            ? g.includes(s) || g.push(s)
            : d
            ? ((u[l] = [s]), le(f, l) && (f[l] = u[l]))
            : ((l.value = [s]), e.k && (u[e.k] = l.value));
        } else
          d
            ? ((u[l] = i), le(f, l) && (f[l] = i))
            : m && ((l.value = i), e.k && (u[e.k] = i));
      };
      i ? ((v.id = -1), We(v, n)) : v();
    }
  }
}
const We = rf;
function Rf(e) {
  return If(e);
}
function If(e, t) {
  const n = jo();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: i,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: u,
      parentNode: f,
      nextSibling: d,
      setScopeId: m = De,
      insertStaticContent: v,
    } = e,
    g = (
      p,
      h,
      b,
      C = null,
      M = null,
      S = null,
      K = !1,
      F = null,
      N = !!h.dynamicChildren,
    ) => {
      if (p === h) return;
      p && !en(p, h) && ((C = T(p)), Se(p, M, S, !0), (p = null)),
        h.patchFlag === -2 && ((N = !1), (h.dynamicChildren = null));
      const { type: A, ref: J, shapeFlag: Z } = h;
      switch (A) {
        case gr:
          y(p, h, b, C);
          break;
        case tt:
          _(p, h, b, C);
          break;
        case xo:
          p == null && E(h, b, C, K);
          break;
        case Fe:
          x(p, h, b, C, M, S, K, F, N);
          break;
        default:
          Z & 1
            ? H(p, h, b, C, M, S, K, F, N)
            : Z & 6
            ? k(p, h, b, C, M, S, K, F, N)
            : (Z & 64 || Z & 128) && A.process(p, h, b, C, M, S, K, F, N, B);
      }
      J != null && M && Qo(J, p && p.ref, S, h || p, !h);
    },
    y = (p, h, b, C) => {
      if (p == null) r((h.el = a(h.children)), b, C);
      else {
        const M = (h.el = p.el);
        h.children !== p.children && c(M, h.children);
      }
    },
    _ = (p, h, b, C) => {
      p == null ? r((h.el = l(h.children || "")), b, C) : (h.el = p.el);
    },
    E = (p, h, b, C) => {
      [p.el, p.anchor] = v(p.children, h, b, C, p.el, p.anchor);
    },
    $ = ({ el: p, anchor: h }, b, C) => {
      let M;
      for (; p && p !== h; ) (M = d(p)), r(p, b, C), (p = M);
      r(h, b, C);
    },
    w = ({ el: p, anchor: h }) => {
      let b;
      for (; p && p !== h; ) (b = d(p)), o(p), (p = b);
      o(h);
    },
    H = (p, h, b, C, M, S, K, F, N) => {
      (K = K || h.type === "svg"),
        p == null ? D(h, b, C, M, S, K, F, N) : q(p, h, M, S, K, F, N);
    },
    D = (p, h, b, C, M, S, K, F) => {
      let N, A;
      const { type: J, props: Z, shapeFlag: G, transition: ee, dirs: se } = p;
      if (
        ((N = p.el = i(p.type, S, Z && Z.is, Z)),
        G & 8
          ? u(N, p.children)
          : G & 16 &&
            R(p.children, N, null, C, M, S && J !== "foreignObject", K, F),
        se && Qt(p, null, C, "created"),
        L(N, p, p.scopeId, K, C),
        Z)
      ) {
        for (const de in Z)
          de !== "value" &&
            !Lr(de) &&
            s(N, de, null, Z[de], S, p.children, C, M, Oe);
        "value" in Z && s(N, "value", null, Z.value),
          (A = Z.onVnodeBeforeMount) && wt(A, C, p);
      }
      se && Qt(p, null, C, "beforeMount");
      const ge = (!M || (M && !M.pendingBranch)) && ee && !ee.persisted;
      ge && ee.beforeEnter(N),
        r(N, h, b),
        ((A = Z && Z.onVnodeMounted) || ge || se) &&
          We(() => {
            A && wt(A, C, p),
              ge && ee.enter(N),
              se && Qt(p, null, C, "mounted");
          }, M);
    },
    L = (p, h, b, C, M) => {
      if ((b && m(p, b), C)) for (let S = 0; S < C.length; S++) m(p, C[S]);
      if (M) {
        let S = M.subTree;
        if (h === S) {
          const K = M.vnode;
          L(p, K, K.scopeId, K.slotScopeIds, M.parent);
        }
      }
    },
    R = (p, h, b, C, M, S, K, F, N = 0) => {
      for (let A = N; A < p.length; A++) {
        const J = (p[A] = F ? Dt(p[A]) : Et(p[A]));
        g(null, J, h, b, C, M, S, K, F);
      }
    },
    q = (p, h, b, C, M, S, K) => {
      const F = (h.el = p.el);
      let { patchFlag: N, dynamicChildren: A, dirs: J } = h;
      N |= p.patchFlag & 16;
      const Z = p.props || Ee,
        G = h.props || Ee;
      let ee;
      b && Gt(b, !1),
        (ee = G.onVnodeBeforeUpdate) && wt(ee, b, h, p),
        J && Qt(h, p, b, "beforeUpdate"),
        b && Gt(b, !0);
      const se = M && h.type !== "foreignObject";
      if (
        (A
          ? W(p.dynamicChildren, A, F, b, C, se, S)
          : K || V(p, h, F, null, b, C, se, S, !1),
        N > 0)
      ) {
        if (N & 16) I(F, h, Z, G, b, C, M);
        else if (
          (N & 2 && Z.class !== G.class && s(F, "class", null, G.class, M),
          N & 4 && s(F, "style", Z.style, G.style, M),
          N & 8)
        ) {
          const ge = h.dynamicProps;
          for (let de = 0; de < ge.length; de++) {
            const Ae = ge[de],
              dt = Z[Ae],
              pn = G[Ae];
            (pn !== dt || Ae === "value") &&
              s(F, Ae, dt, pn, M, p.children, b, C, Oe);
          }
        }
        N & 1 && p.children !== h.children && u(F, h.children);
      } else !K && A == null && I(F, h, Z, G, b, C, M);
      ((ee = G.onVnodeUpdated) || J) &&
        We(() => {
          ee && wt(ee, b, h, p), J && Qt(h, p, b, "updated");
        }, C);
    },
    W = (p, h, b, C, M, S, K) => {
      for (let F = 0; F < h.length; F++) {
        const N = p[F],
          A = h[F],
          J =
            N.el && (N.type === Fe || !en(N, A) || N.shapeFlag & 70)
              ? f(N.el)
              : b;
        g(N, A, J, null, C, M, S, K, !0);
      }
    },
    I = (p, h, b, C, M, S, K) => {
      if (b !== C) {
        if (b !== Ee)
          for (const F in b)
            !Lr(F) && !(F in C) && s(p, F, b[F], null, K, h.children, M, S, Oe);
        for (const F in C) {
          if (Lr(F)) continue;
          const N = C[F],
            A = b[F];
          N !== A && F !== "value" && s(p, F, A, N, K, h.children, M, S, Oe);
        }
        "value" in C && s(p, "value", b.value, C.value);
      }
    },
    x = (p, h, b, C, M, S, K, F, N) => {
      const A = (h.el = p ? p.el : a("")),
        J = (h.anchor = p ? p.anchor : a(""));
      let { patchFlag: Z, dynamicChildren: G, slotScopeIds: ee } = h;
      ee && (F = F ? F.concat(ee) : ee),
        p == null
          ? (r(A, b, C), r(J, b, C), R(h.children, b, J, M, S, K, F, N))
          : Z > 0 && Z & 64 && G && p.dynamicChildren
          ? (W(p.dynamicChildren, G, b, M, S, K, F),
            (h.key != null || (M && h === M.subTree)) && Ps(p, h, !0))
          : V(p, h, b, J, M, S, K, F, N);
    },
    k = (p, h, b, C, M, S, K, F, N) => {
      (h.slotScopeIds = F),
        p == null
          ? h.shapeFlag & 512
            ? M.ctx.activate(h, b, C, K, N)
            : X(h, b, C, M, S, K, N)
          : ne(p, h, N);
    },
    X = (p, h, b, C, M, S, K) => {
      const F = (p.component = Kf(p, C, M));
      if ((uo(p) && (F.ctx.renderer = B), Uf(F), F.asyncDep)) {
        if ((M && M.registerDep(F, j), !p.el)) {
          const N = (F.subTree = ae(tt));
          _(null, N, h, b);
        }
        return;
      }
      j(F, p, h, b, M, S, K);
    },
    ne = (p, h, b) => {
      const C = (h.component = p.component);
      if (ef(p, h, b))
        if (C.asyncDep && !C.asyncResolved) {
          P(C, h, b);
          return;
        } else (C.next = h), Vu(C.update), C.update();
      else (h.el = p.el), (C.vnode = h);
    },
    j = (p, h, b, C, M, S, K) => {
      const F = () => {
          if (p.isMounted) {
            let { next: J, bu: Z, u: G, parent: ee, vnode: se } = p,
              ge = J,
              de;
            Gt(p, !1),
              J ? ((J.el = se.el), P(p, J, K)) : (J = se),
              Z && Hr(Z),
              (de = J.props && J.props.onVnodeBeforeUpdate) &&
                wt(de, ee, J, se),
              Gt(p, !0);
            const Ae = yo(p),
              dt = p.subTree;
            (p.subTree = Ae),
              g(dt, Ae, f(dt.el), T(dt), p, M, S),
              (J.el = Ae.el),
              ge === null && tf(p, Ae.el),
              G && We(G, M),
              (de = J.props && J.props.onVnodeUpdated) &&
                We(() => wt(de, ee, J, se), M);
          } else {
            let J;
            const { el: Z, props: G } = h,
              { bm: ee, m: se, parent: ge } = p,
              de = Wn(h);
            if (
              (Gt(p, !1),
              ee && Hr(ee),
              !de && (J = G && G.onVnodeBeforeMount) && wt(J, ge, h),
              Gt(p, !0),
              Z && ue)
            ) {
              const Ae = () => {
                (p.subTree = yo(p)), ue(Z, p.subTree, p, M, null);
              };
              de
                ? h.type.__asyncLoader().then(() => !p.isUnmounted && Ae())
                : Ae();
            } else {
              const Ae = (p.subTree = yo(p));
              g(null, Ae, b, C, p, M, S), (h.el = Ae.el);
            }
            if ((se && We(se, M), !de && (J = G && G.onVnodeMounted))) {
              const Ae = h;
              We(() => wt(J, ge, Ae), M);
            }
            (h.shapeFlag & 256 ||
              (ge && Wn(ge.vnode) && ge.vnode.shapeFlag & 256)) &&
              p.a &&
              We(p.a, M),
              (p.isMounted = !0),
              (h = b = C = null);
          }
        },
        N = (p.effect = new us(F, () => ys(A), p.scope)),
        A = (p.update = () => N.run());
      (A.id = p.uid), Gt(p, !0), A();
    },
    P = (p, h, b) => {
      h.component = p;
      const C = p.vnode.props;
      (p.vnode = h),
        (p.next = null),
        Mf(p, h.props, C, b),
        Af(p, h.children, b),
        Nn(),
        ui(),
        Ln();
    },
    V = (p, h, b, C, M, S, K, F, N = !1) => {
      const A = p && p.children,
        J = p ? p.shapeFlag : 0,
        Z = h.children,
        { patchFlag: G, shapeFlag: ee } = h;
      if (G > 0) {
        if (G & 128) {
          xe(A, Z, b, C, M, S, K, F, N);
          return;
        } else if (G & 256) {
          ce(A, Z, b, C, M, S, K, F, N);
          return;
        }
      }
      ee & 8
        ? (J & 16 && Oe(A, M, S), Z !== A && u(b, Z))
        : J & 16
        ? ee & 16
          ? xe(A, Z, b, C, M, S, K, F, N)
          : Oe(A, M, S, !0)
        : (J & 8 && u(b, ""), ee & 16 && R(Z, b, C, M, S, K, F, N));
    },
    ce = (p, h, b, C, M, S, K, F, N) => {
      (p = p || yn), (h = h || yn);
      const A = p.length,
        J = h.length,
        Z = Math.min(A, J);
      let G;
      for (G = 0; G < Z; G++) {
        const ee = (h[G] = N ? Dt(h[G]) : Et(h[G]));
        g(p[G], ee, b, null, M, S, K, F, N);
      }
      A > J ? Oe(p, M, S, !0, !1, Z) : R(h, b, C, M, S, K, F, N, Z);
    },
    xe = (p, h, b, C, M, S, K, F, N) => {
      let A = 0;
      const J = h.length;
      let Z = p.length - 1,
        G = J - 1;
      for (; A <= Z && A <= G; ) {
        const ee = p[A],
          se = (h[A] = N ? Dt(h[A]) : Et(h[A]));
        if (en(ee, se)) g(ee, se, b, null, M, S, K, F, N);
        else break;
        A++;
      }
      for (; A <= Z && A <= G; ) {
        const ee = p[Z],
          se = (h[G] = N ? Dt(h[G]) : Et(h[G]));
        if (en(ee, se)) g(ee, se, b, null, M, S, K, F, N);
        else break;
        Z--, G--;
      }
      if (A > Z) {
        if (A <= G) {
          const ee = G + 1,
            se = ee < J ? h[ee].el : C;
          for (; A <= G; )
            g(null, (h[A] = N ? Dt(h[A]) : Et(h[A])), b, se, M, S, K, F, N),
              A++;
        }
      } else if (A > G) for (; A <= Z; ) Se(p[A], M, S, !0), A++;
      else {
        const ee = A,
          se = A,
          ge = new Map();
        for (A = se; A <= G; A++) {
          const Je = (h[A] = N ? Dt(h[A]) : Et(h[A]));
          Je.key != null && ge.set(Je.key, A);
        }
        let de,
          Ae = 0;
        const dt = G - se + 1;
        let pn = !1,
          Xs = 0;
        const Bn = new Array(dt);
        for (A = 0; A < dt; A++) Bn[A] = 0;
        for (A = ee; A <= Z; A++) {
          const Je = p[A];
          if (Ae >= dt) {
            Se(Je, M, S, !0);
            continue;
          }
          let yt;
          if (Je.key != null) yt = ge.get(Je.key);
          else
            for (de = se; de <= G; de++)
              if (Bn[de - se] === 0 && en(Je, h[de])) {
                yt = de;
                break;
              }
          yt === void 0
            ? Se(Je, M, S, !0)
            : ((Bn[yt - se] = A + 1),
              yt >= Xs ? (Xs = yt) : (pn = !0),
              g(Je, h[yt], b, null, M, S, K, F, N),
              Ae++);
        }
        const ei = pn ? $f(Bn) : yn;
        for (de = ei.length - 1, A = dt - 1; A >= 0; A--) {
          const Je = se + A,
            yt = h[Je],
            ti = Je + 1 < J ? h[Je + 1].el : C;
          Bn[A] === 0
            ? g(null, yt, b, ti, M, S, K, F, N)
            : pn && (de < 0 || A !== ei[de] ? Be(yt, b, ti, 2) : de--);
        }
      }
    },
    Be = (p, h, b, C, M = null) => {
      const { el: S, type: K, transition: F, children: N, shapeFlag: A } = p;
      if (A & 6) {
        Be(p.component.subTree, h, b, C);
        return;
      }
      if (A & 128) {
        p.suspense.move(h, b, C);
        return;
      }
      if (A & 64) {
        K.move(p, h, b, B);
        return;
      }
      if (K === Fe) {
        r(S, h, b);
        for (let Z = 0; Z < N.length; Z++) Be(N[Z], h, b, C);
        r(p.anchor, h, b);
        return;
      }
      if (K === xo) {
        $(p, h, b);
        return;
      }
      if (C !== 2 && A & 1 && F)
        if (C === 0) F.beforeEnter(S), r(S, h, b), We(() => F.enter(S), M);
        else {
          const { leave: Z, delayLeave: G, afterLeave: ee } = F,
            se = () => r(S, h, b),
            ge = () => {
              Z(S, () => {
                se(), ee && ee();
              });
            };
          G ? G(S, se, ge) : ge();
        }
      else r(S, h, b);
    },
    Se = (p, h, b, C = !1, M = !1) => {
      const {
        type: S,
        props: K,
        ref: F,
        children: N,
        dynamicChildren: A,
        shapeFlag: J,
        patchFlag: Z,
        dirs: G,
      } = p;
      if ((F != null && Qo(F, null, b, p, !0), J & 256)) {
        h.ctx.deactivate(p);
        return;
      }
      const ee = J & 1 && G,
        se = !Wn(p);
      let ge;
      if ((se && (ge = K && K.onVnodeBeforeUnmount) && wt(ge, h, p), J & 6))
        Ue(p.component, b, C);
      else {
        if (J & 128) {
          p.suspense.unmount(b, C);
          return;
        }
        ee && Qt(p, null, h, "beforeUnmount"),
          J & 64
            ? p.type.remove(p, h, b, M, B, C)
            : A && (S !== Fe || (Z > 0 && Z & 64))
            ? Oe(A, h, b, !1, !0)
            : ((S === Fe && Z & 384) || (!M && J & 16)) && Oe(N, h, b),
          C && ft(p);
      }
      ((se && (ge = K && K.onVnodeUnmounted)) || ee) &&
        We(() => {
          ge && wt(ge, h, p), ee && Qt(p, null, h, "unmounted");
        }, b);
    },
    ft = (p) => {
      const { type: h, el: b, anchor: C, transition: M } = p;
      if (h === Fe) {
        Ke(b, C);
        return;
      }
      if (h === xo) {
        w(p);
        return;
      }
      const S = () => {
        o(b), M && !M.persisted && M.afterLeave && M.afterLeave();
      };
      if (p.shapeFlag & 1 && M && !M.persisted) {
        const { leave: K, delayLeave: F } = M,
          N = () => K(b, S);
        F ? F(p.el, S, N) : N();
      } else S();
    },
    Ke = (p, h) => {
      let b;
      for (; p !== h; ) (b = d(p)), o(p), (p = b);
      o(h);
    },
    Ue = (p, h, b) => {
      const { bum: C, scope: M, update: S, subTree: K, um: F } = p;
      C && Hr(C),
        M.stop(),
        S && ((S.active = !1), Se(K, p, h, b)),
        F && We(F, h),
        We(() => {
          p.isUnmounted = !0;
        }, h),
        h &&
          h.pendingBranch &&
          !h.isUnmounted &&
          p.asyncDep &&
          !p.asyncResolved &&
          p.suspenseId === h.pendingId &&
          (h.deps--, h.deps === 0 && h.resolve());
    },
    Oe = (p, h, b, C = !1, M = !1, S = 0) => {
      for (let K = S; K < p.length; K++) Se(p[K], h, b, C, M);
    },
    T = (p) =>
      p.shapeFlag & 6
        ? T(p.component.subTree)
        : p.shapeFlag & 128
        ? p.suspense.next()
        : d(p.anchor || p.el),
    z = (p, h, b) => {
      p == null
        ? h._vnode && Se(h._vnode, null, null, !0)
        : g(h._vnode || null, p, h, null, null, null, b),
        ui(),
        gl(),
        (h._vnode = p);
    },
    B = { p: g, um: Se, m: Be, r: ft, mt: X, mc: R, pc: V, pbc: W, n: T, o: e };
  let Q, ue;
  return t && ([Q, ue] = t(B)), { render: z, hydrate: Q, createApp: Tf(z, Q) };
}
function Gt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ps(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (Y(r) && Y(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = o[s] = Dt(o[s])), (a.el = i.el)),
        n || Ps(i, a)),
        a.type === gr && (a.el = i.el);
    }
}
function $f(e) {
  const t = e.slice(),
    n = [0];
  let r, o, s, i, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const c = e[r];
    if (c !== 0) {
      if (((o = n[n.length - 1]), e[o] < c)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        (a = (s + i) >> 1), e[n[a]] < c ? (s = a + 1) : (i = a);
      c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i]);
  return n;
}
const kf = (e) => e.__isTeleport,
  qn = (e) => e && (e.disabled || e.disabled === ""),
  Ei = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  Go = (e, t) => {
    const n = e && e.to;
    return pe(n) ? (t ? t(n) : null) : n;
  },
  Ff = {
    __isTeleport: !0,
    process(e, t, n, r, o, s, i, a, l, c) {
      const {
          mc: u,
          pc: f,
          pbc: d,
          o: { insert: m, querySelector: v, createText: g, createComment: y },
        } = c,
        _ = qn(t.props);
      let { shapeFlag: E, children: $, dynamicChildren: w } = t;
      if (e == null) {
        const H = (t.el = g("")),
          D = (t.anchor = g(""));
        m(H, n, r), m(D, n, r);
        const L = (t.target = Go(t.props, v)),
          R = (t.targetAnchor = g(""));
        L && (m(R, L), (i = i || Ei(L)));
        const q = (W, I) => {
          E & 16 && u($, W, I, o, s, i, a, l);
        };
        _ ? q(n, D) : L && q(L, R);
      } else {
        t.el = e.el;
        const H = (t.anchor = e.anchor),
          D = (t.target = e.target),
          L = (t.targetAnchor = e.targetAnchor),
          R = qn(e.props),
          q = R ? n : D,
          W = R ? H : L;
        if (
          ((i = i || Ei(D)),
          w
            ? (d(e.dynamicChildren, w, q, o, s, i, a), Ps(e, t, !0))
            : l || f(e, t, q, W, o, s, i, a, !1),
          _)
        )
          R || Mr(t, n, H, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const I = (t.target = Go(t.props, v));
          I && Mr(t, I, null, c, 0);
        } else R && Mr(t, D, L, c, 1);
      }
      jl(t);
    },
    remove(e, t, n, r, { um: o, o: { remove: s } }, i) {
      const {
        shapeFlag: a,
        children: l,
        anchor: c,
        targetAnchor: u,
        target: f,
        props: d,
      } = e;
      if ((f && s(u), (i || !qn(d)) && (s(c), a & 16)))
        for (let m = 0; m < l.length; m++) {
          const v = l[m];
          o(v, t, n, !0, !!v.dynamicChildren);
        }
    },
    move: Mr,
    hydrate: Nf,
  };
function Mr(e, t, n, { o: { insert: r }, m: o }, s = 2) {
  s === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: a, shapeFlag: l, children: c, props: u } = e,
    f = s === 2;
  if ((f && r(i, t, n), (!f || qn(u)) && l & 16))
    for (let d = 0; d < c.length; d++) o(c[d], t, n, 2);
  f && r(a, t, n);
}
function Nf(
  e,
  t,
  n,
  r,
  o,
  s,
  { o: { nextSibling: i, parentNode: a, querySelector: l } },
  c,
) {
  const u = (t.target = Go(t.props, l));
  if (u) {
    const f = u._lpa || u.firstChild;
    if (t.shapeFlag & 16)
      if (qn(t.props))
        (t.anchor = c(i(e), t, a(e), n, r, o, s)), (t.targetAnchor = f);
      else {
        t.anchor = i(e);
        let d = f;
        for (; d; )
          if (
            ((d = i(d)), d && d.nodeType === 8 && d.data === "teleport anchor")
          ) {
            (t.targetAnchor = d),
              (u._lpa = t.targetAnchor && i(t.targetAnchor));
            break;
          }
        c(f, t, u, n, r, o, s);
      }
    jl(t);
  }
  return t.anchor && i(t.anchor);
}
const Lf = Ff;
function jl(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const Fe = Symbol.for("v-fgt"),
  gr = Symbol.for("v-txt"),
  tt = Symbol.for("v-cmt"),
  xo = Symbol.for("v-stc"),
  Zn = [];
let mt = null;
function oe(e = !1) {
  Zn.push((mt = e ? null : []));
}
function Bf() {
  Zn.pop(), (mt = Zn[Zn.length - 1] || null);
}
let ir = 1;
function xi(e) {
  ir += e;
}
function Dl(e) {
  return (
    (e.dynamicChildren = ir > 0 ? mt || yn : null),
    Bf(),
    ir > 0 && mt && mt.push(e),
    e
  );
}
function _e(e, t, n, r, o, s) {
  return Dl(ye(e, t, n, r, o, s, !0));
}
function nt(e, t, n, r, o) {
  return Dl(ae(e, t, n, r, o, !0));
}
function Mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function en(e, t) {
  return e.type === t.type && e.key === t.key;
}
const po = "__vInternal",
  zl = ({ key: e }) => e ?? null,
  jr = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? pe(e) || $e(e) || re(e)
        ? { i: Ne, r: e, k: t, f: !!n }
        : e
      : null
  );
function ye(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  s = e === Fe ? 0 : 1,
  i = !1,
  a = !1,
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && zl(t),
    ref: t && jr(t),
    scopeId: co,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne,
  };
  return (
    a
      ? (Ss(l, n), s & 128 && e.normalize(l))
      : n && (l.shapeFlag |= pe(n) ? 8 : 16),
    ir > 0 &&
      !i &&
      mt &&
      (l.patchFlag > 0 || s & 6) &&
      l.patchFlag !== 32 &&
      mt.push(l),
    l
  );
}
const ae = Hf;
function Hf(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === Al) && (e = tt), Mn(e))) {
    const a = $t(e, t, !0);
    return (
      n && Ss(a, n),
      ir > 0 &&
        !s &&
        mt &&
        (a.shapeFlag & 6 ? (mt[mt.indexOf(e)] = a) : mt.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((Zf(e) && (e = e.__vccOpts), t)) {
    t = jf(t);
    let { class: a, style: l } = t;
    a && !pe(a) && (t.class = Qe(a)),
      me(l) && (cl(l) && !Y(l) && (l = Me({}, l)), (t.style = cn(l)));
  }
  const i = pe(e) ? 1 : nf(e) ? 128 : kf(e) ? 64 : me(e) ? 4 : re(e) ? 2 : 0;
  return ye(e, t, n, r, o, i, s, !0);
}
function jf(e) {
  return e ? (cl(e) || po in e ? Me({}, e) : e) : null;
}
function $t(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: i } = e,
    a = t ? fn(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && zl(a),
    ref:
      t && t.ref ? (n && o ? (Y(o) ? o.concat(jr(t)) : [o, jr(t)]) : jr(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Fe ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && $t(e.ssContent),
    ssFallback: e.ssFallback && $t(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Qn(e = " ", t = 0) {
  return ae(gr, null, e, t);
}
function ar(e = "", t = !1) {
  return t ? (oe(), nt(tt, null, e)) : ae(tt, null, e);
}
function Et(e) {
  return e == null || typeof e == "boolean"
    ? ae(tt)
    : Y(e)
    ? ae(Fe, null, e.slice())
    : typeof e == "object"
    ? Dt(e)
    : ae(gr, null, String(e));
}
function Dt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : $t(e);
}
function Ss(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (Y(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ss(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(po in t)
        ? (t._ctx = Ne)
        : o === 3 &&
          Ne &&
          (Ne.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    re(t)
      ? ((t = { default: t, _ctx: Ne }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Qn(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function fn(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Qe([t.class, r.class]));
      else if (o === "style") t.style = cn([t.style, r.style]);
      else if (no(o)) {
        const s = t[o],
          i = r[o];
        i &&
          s !== i &&
          !(Y(s) && s.includes(i)) &&
          (t[o] = s ? [].concat(s, i) : i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function wt(e, t, n, r = null) {
  it(e, t, 7, [n, r]);
}
const Df = kl();
let zf = 0;
function Kf(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Df,
    s = {
      uid: zf++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ga(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Nl(r, o),
      emitsOptions: _l(r, o),
      emit: null,
      emitted: null,
      propsDefaults: Ee,
      inheritAttrs: r.inheritAttrs,
      ctx: Ee,
      data: Ee,
      props: Ee,
      attrs: Ee,
      slots: Ee,
      refs: Ee,
      setupState: Ee,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = Qu.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let Ie = null;
const _t = () => Ie || Ne;
let As,
  hn,
  Ci = "__VUE_INSTANCE_SETTERS__";
(hn = jo()[Ci]) || (hn = jo()[Ci] = []),
  hn.push((e) => (Ie = e)),
  (As = (e) => {
    hn.length > 1 ? hn.forEach((t) => t(e)) : hn[0](e);
  });
const Pn = (e) => {
    As(e), e.scope.on();
  },
  sn = () => {
    Ie && Ie.scope.off(), As(null);
  };
function Kl(e) {
  return e.vnode.shapeFlag & 4;
}
let lr = !1;
function Uf(e, t = !1) {
  lr = t;
  const { props: n, children: r } = e.vnode,
    o = Kl(e);
  Of(e, n, o, t), Sf(e, r);
  const s = o ? Wf(e, t) : void 0;
  return (lr = !1), s;
}
function Wf(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = ms(new Proxy(e.ctx, vf)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? Wl(e) : null);
    Pn(e), Nn();
    const s = Vt(r, e, 0, [e.props, o]);
    if ((Ln(), sn(), Ua(s))) {
      if ((s.then(sn, sn), t))
        return s
          .then((i) => {
            Ti(e, i, t);
          })
          .catch((i) => {
            ao(i, e, 0);
          });
      e.asyncDep = s;
    } else Ti(e, s, t);
  } else Ul(e, t);
}
function Ti(e, t, n) {
  re(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : me(t) && (e.setupState = dl(t)),
    Ul(e, n);
}
let Oi;
function Ul(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Oi && !r.render) {
      const o = r.template || Os(e).template;
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = r,
          c = Me(Me({ isCustomElement: s, delimiters: a }, i), l);
        r.render = Oi(o, c);
      }
    }
    e.render = r.render || De;
  }
  Pn(e), Nn(), bf(e), Ln(), sn();
}
function Vf(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ge(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Wl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Vf(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ho(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(dl(ms(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Vn) return Vn[n](e);
        },
        has(t, n) {
          return n in t || n in Vn;
        },
      }))
    );
}
function qf(e, t = !0) {
  return re(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Zf(e) {
  return re(e) && "__vccOpts" in e;
}
const U = (e, t) => zu(e, t, lr);
function Re(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? me(t) && !Y(t)
      ? Mn(t)
        ? ae(e, null, [t])
        : ae(e, t)
      : ae(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Mn(n) && (n = [n]),
      ae(e, t, n));
}
const Qf = Symbol.for("v-scx"),
  Gf = () => Ce(Qf),
  Jf = "3.3.4",
  Yf = "http://www.w3.org/2000/svg",
  tn = typeof document < "u" ? document : null,
  Mi = tn && tn.createElement("template"),
  Xf = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? tn.createElementNS(Yf, e)
        : tn.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => tn.createTextNode(e),
    createComment: (e) => tn.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => tn.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, s) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === s || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling));

        );
      else {
        Mi.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = Mi.content;
        if (r) {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function ed(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function td(e, t, n) {
  const r = e.style,
    o = pe(n);
  if (n && !o) {
    if (t && !pe(t)) for (const s in t) n[s] == null && Jo(r, s, "");
    for (const s in n) Jo(r, s, n[s]);
  } else {
    const s = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = s);
  }
}
const Pi = /\s*!important$/;
function Jo(e, t, n) {
  if (Y(n)) n.forEach((r) => Jo(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = nd(e, t);
    Pi.test(n)
      ? e.setProperty(ln(r), n.replace(Pi, ""), "important")
      : (e[r] = n);
  }
}
const Si = ["Webkit", "Moz", "ms"],
  Co = {};
function nd(e, t) {
  const n = Co[t];
  if (n) return n;
  let r = Tt(t);
  if (r !== "filter" && r in e) return (Co[t] = r);
  r = so(r);
  for (let o = 0; o < Si.length; o++) {
    const s = Si[o] + r;
    if (s in e) return (Co[t] = s);
  }
  return t;
}
const Ai = "http://www.w3.org/1999/xlink";
function rd(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ai, t.slice(6, t.length))
      : e.setAttributeNS(Ai, t, n);
  else {
    const s = iu(t);
    n == null || (s && !qa(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n);
  }
}
function od(e, t, n, r, o, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, o, s), (e[t] = n ?? "");
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e._value = n;
    const c = a === "OPTION" ? e.getAttribute("value") : e.value,
      u = n ?? "";
    c !== u && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = qa(n))
      : n == null && c === "string"
      ? ((n = ""), (l = !0))
      : c === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function gn(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function sd(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function id(e, t, n, r, o = null) {
  const s = e._vei || (e._vei = {}),
    i = s[t];
  if (r && i) i.value = r;
  else {
    const [a, l] = ad(t);
    if (r) {
      const c = (s[t] = ud(r, o));
      gn(e, a, c, l);
    } else i && (sd(e, a, i, l), (s[t] = void 0));
  }
}
const Ri = /(?:Once|Passive|Capture)$/;
function ad(e) {
  let t;
  if (Ri.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Ri)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : ln(e.slice(2)), t];
}
let To = 0;
const ld = Promise.resolve(),
  cd = () => To || (ld.then(() => (To = 0)), (To = Date.now()));
function ud(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    it(fd(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = cd()), n;
}
function fd(e, t) {
  if (Y(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const Ii = /^on[a-z]/,
  dd = (e, t, n, r, o = !1, s, i, a, l) => {
    t === "class"
      ? ed(e, r, o)
      : t === "style"
      ? td(e, n, r)
      : no(t)
      ? ss(t) || id(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : pd(e, t, r, o)
        )
      ? od(e, t, r, s, i, a, l)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        rd(e, t, r, o));
  };
function pd(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Ii.test(t) && re(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Ii.test(t) && pe(n))
    ? !1
    : t in e;
}
const Lt = "transition",
  Hn = "animation",
  vr = (e, { slots: t }) => Re(af, ql(e), t);
vr.displayName = "Transition";
const Vl = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  hd = (vr.props = Me({}, El, Vl)),
  Jt = (e, t = []) => {
    Y(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  $i = (e) => (e ? (Y(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function ql(e) {
  const t = {};
  for (const x in e) x in Vl || (t[x] = e[x]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: o,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: l = s,
      appearActiveClass: c = i,
      appearToClass: u = a,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: m = `${n}-leave-to`,
    } = e,
    v = md(o),
    g = v && v[0],
    y = v && v[1],
    {
      onBeforeEnter: _,
      onEnter: E,
      onEnterCancelled: $,
      onLeave: w,
      onLeaveCancelled: H,
      onBeforeAppear: D = _,
      onAppear: L = E,
      onAppearCancelled: R = $,
    } = t,
    q = (x, k, X) => {
      Ht(x, k ? u : a), Ht(x, k ? c : i), X && X();
    },
    W = (x, k) => {
      (x._isLeaving = !1), Ht(x, f), Ht(x, m), Ht(x, d), k && k();
    },
    I = (x) => (k, X) => {
      const ne = x ? L : E,
        j = () => q(k, x, X);
      Jt(ne, [k, j]),
        ki(() => {
          Ht(k, x ? l : s), St(k, x ? u : a), $i(ne) || Fi(k, r, g, j);
        });
    };
  return Me(t, {
    onBeforeEnter(x) {
      Jt(_, [x]), St(x, s), St(x, i);
    },
    onBeforeAppear(x) {
      Jt(D, [x]), St(x, l), St(x, c);
    },
    onEnter: I(!1),
    onAppear: I(!0),
    onLeave(x, k) {
      x._isLeaving = !0;
      const X = () => W(x, k);
      St(x, f),
        Ql(),
        St(x, d),
        ki(() => {
          x._isLeaving && (Ht(x, f), St(x, m), $i(w) || Fi(x, r, y, X));
        }),
        Jt(w, [x, X]);
    },
    onEnterCancelled(x) {
      q(x, !1), Jt($, [x]);
    },
    onAppearCancelled(x) {
      q(x, !0), Jt(R, [x]);
    },
    onLeaveCancelled(x) {
      W(x), Jt(H, [x]);
    },
  });
}
function md(e) {
  if (e == null) return null;
  if (me(e)) return [Oo(e.enter), Oo(e.leave)];
  {
    const t = Oo(e);
    return [t, t];
  }
}
function Oo(e) {
  return eu(e);
}
function St(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function Ht(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function ki(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let gd = 0;
function Fi(e, t, n, r) {
  const o = (e._endId = ++gd),
    s = () => {
      o === e._endId && r();
    };
  if (n) return setTimeout(s, n);
  const { type: i, timeout: a, propCount: l } = Zl(e, t);
  if (!i) return r();
  const c = i + "end";
  let u = 0;
  const f = () => {
      e.removeEventListener(c, d), s();
    },
    d = (m) => {
      m.target === e && ++u >= l && f();
    };
  setTimeout(() => {
    u < l && f();
  }, a + 1),
    e.addEventListener(c, d);
}
function Zl(e, t) {
  const n = window.getComputedStyle(e),
    r = (v) => (n[v] || "").split(", "),
    o = r(`${Lt}Delay`),
    s = r(`${Lt}Duration`),
    i = Ni(o, s),
    a = r(`${Hn}Delay`),
    l = r(`${Hn}Duration`),
    c = Ni(a, l);
  let u = null,
    f = 0,
    d = 0;
  t === Lt
    ? i > 0 && ((u = Lt), (f = i), (d = s.length))
    : t === Hn
    ? c > 0 && ((u = Hn), (f = c), (d = l.length))
    : ((f = Math.max(i, c)),
      (u = f > 0 ? (i > c ? Lt : Hn) : null),
      (d = u ? (u === Lt ? s.length : l.length) : 0));
  const m =
    u === Lt && /\b(transform|all)(,|$)/.test(r(`${Lt}Property`).toString());
  return { type: u, timeout: f, propCount: d, hasTransform: m };
}
function Ni(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Li(n) + Li(e[r])));
}
function Li(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ql() {
  return document.body.offsetHeight;
}
const Gl = new WeakMap(),
  Jl = new WeakMap(),
  Yl = {
    name: "TransitionGroup",
    props: Me({}, hd, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = _t(),
        r = wl();
      let o, s;
      return (
        Ml(() => {
          if (!o.length) return;
          const i = e.moveClass || `${e.name || "v"}-move`;
          if (!wd(o[0].el, n.vnode.el, i)) return;
          o.forEach(_d), o.forEach(bd);
          const a = o.filter(yd);
          Ql(),
            a.forEach((l) => {
              const c = l.el,
                u = c.style;
              St(c, i),
                (u.transform = u.webkitTransform = u.transitionDuration = "");
              const f = (c._moveCb = (d) => {
                (d && d.target !== c) ||
                  ((!d || /transform$/.test(d.propertyName)) &&
                    (c.removeEventListener("transitionend", f),
                    (c._moveCb = null),
                    Ht(c, i)));
              });
              c.addEventListener("transitionend", f);
            });
        }),
        () => {
          const i = fe(e),
            a = ql(i);
          let l = i.tag || Fe;
          (o = s), (s = t.default ? xs(t.default()) : []);
          for (let c = 0; c < s.length; c++) {
            const u = s[c];
            u.key != null && sr(u, or(u, a, r, n));
          }
          if (o)
            for (let c = 0; c < o.length; c++) {
              const u = o[c];
              sr(u, or(u, a, r, n)), Gl.set(u, u.el.getBoundingClientRect());
            }
          return ae(l, null, s);
        }
      );
    },
  },
  vd = (e) => delete e.mode;
Yl.props;
const K1 = Yl;
function _d(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function bd(e) {
  Jl.set(e, e.el.getBoundingClientRect());
}
function yd(e) {
  const t = Gl.get(e),
    n = Jl.get(e),
    r = t.left - n.left,
    o = t.top - n.top;
  if (r || o) {
    const s = e.el.style;
    return (
      (s.transform = s.webkitTransform = `translate(${r}px,${o}px)`),
      (s.transitionDuration = "0s"),
      e
    );
  }
}
function wd(e, t, n) {
  const r = e.cloneNode();
  e._vtc &&
    e._vtc.forEach((i) => {
      i.split(/\s+/).forEach((a) => a && r.classList.remove(a));
    }),
    n.split(/\s+/).forEach((i) => i && r.classList.add(i)),
    (r.style.display = "none");
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: s } = Zl(r);
  return o.removeChild(r), s;
}
const Bi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Y(t) ? (n) => Hr(t, n) : t;
};
function Ed(e) {
  e.target.composing = !0;
}
function Hi(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const U1 = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e._assign = Bi(o);
      const s = r || (o.props && o.props.type === "number");
      gn(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let a = e.value;
        n && (a = a.trim()), s && (a = Ho(a)), e._assign(a);
      }),
        n &&
          gn(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (gn(e, "compositionstart", Ed),
          gn(e, "compositionend", Hi),
          gn(e, "change", Hi));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: o } },
      s,
    ) {
      if (
        ((e._assign = Bi(s)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((o || e.type === "number") && Ho(e.value) === t))))
      )
        return;
      const i = t ?? "";
      e.value !== i && (e.value = i);
    },
  },
  xd = ["ctrl", "shift", "alt", "meta"],
  Cd = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => xd.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  W1 =
    (e, t) =>
    (n, ...r) => {
      for (let o = 0; o < t.length; o++) {
        const s = Cd[t[o]];
        if (s && s(n, t)) return;
      }
      return e(n, ...r);
    },
  Td = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  V1 = (e, t) => (n) => {
    if (!("key" in n)) return;
    const r = ln(n.key);
    if (t.some((o) => o === r || Td[o] === r)) return e(n);
  },
  Xl = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : jn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), jn(e, !0), r.enter(e))
            : r.leave(e, () => {
                jn(e, !1);
              })
          : jn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      jn(e, t);
    },
  };
function jn(e, t) {
  e.style.display = t ? e._vod : "none";
}
const Od = Me({ patchProp: dd }, Xf);
let ji;
function Md() {
  return ji || (ji = Rf(Od));
}
const Pd = (...e) => {
  const t = Md().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = Sd(r);
      if (!o) return;
      const s = t._component;
      !re(s) && !s.render && !s.template && (s.template = o.innerHTML),
        (o.innerHTML = "");
      const i = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function Sd(e) {
  return pe(e) ? document.querySelector(e) : e;
}
const Dr = function (e, t, ...n) {
    let r;
    t.includes("mouse") || t.includes("click")
      ? (r = "MouseEvents")
      : t.includes("key")
      ? (r = "KeyboardEvent")
      : (r = "HTMLEvents");
    const o = document.createEvent(r);
    return o.initEvent(t, ...n), e.dispatchEvent(o), e;
  },
  Rt =
    (e, t, { checkForDefaultPrevented: n = !0 } = {}) =>
    (o) => {
      const s = e == null ? void 0 : e(o);
      if (n === !1 || !s) return t == null ? void 0 : t(o);
    };
var Ad = !1,
  Rd = Object.defineProperty,
  Id = Object.defineProperties,
  $d = Object.getOwnPropertyDescriptors,
  Di = Object.getOwnPropertySymbols,
  kd = Object.prototype.hasOwnProperty,
  Fd = Object.prototype.propertyIsEnumerable,
  zi = (e, t, n) =>
    t in e
      ? Rd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Nd = (e, t) => {
    for (var n in t || (t = {})) kd.call(t, n) && zi(e, n, t[n]);
    if (Di) for (var n of Di(t)) Fd.call(t, n) && zi(e, n, t[n]);
    return e;
  },
  Ld = (e, t) => Id(e, $d(t));
function q1(e, t) {
  var n;
  const r = _s();
  return (
    bl(
      () => {
        r.value = e();
      },
      Ld(Nd({}, t), {
        flush: (n = t == null ? void 0 : t.flush) != null ? n : "sync",
      }),
    ),
    mr(r)
  );
}
var Ki;
const gt = typeof window < "u",
  Bd = (e) => typeof e == "string",
  Jr = () => {},
  Hd =
    gt &&
    ((Ki = window == null ? void 0 : window.navigator) == null
      ? void 0
      : Ki.userAgent) &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent);
function cr(e) {
  return typeof e == "function" ? e() : O(e);
}
function jd(e, t) {
  function n(...r) {
    return new Promise((o, s) => {
      Promise.resolve(
        e(() => t.apply(this, r), { fn: t, thisArg: this, args: r }),
      )
        .then(o)
        .catch(s);
    });
  }
  return n;
}
function Dd(e, t = {}) {
  let n,
    r,
    o = Jr;
  const s = (a) => {
    clearTimeout(a), o(), (o = Jr);
  };
  return (a) => {
    const l = cr(e),
      c = cr(t.maxWait);
    return (
      n && s(n),
      l <= 0 || (c !== void 0 && c <= 0)
        ? (r && (s(r), (r = null)), Promise.resolve(a()))
        : new Promise((u, f) => {
            (o = t.rejectOnCancel ? f : u),
              c &&
                !r &&
                (r = setTimeout(() => {
                  n && s(n), (r = null), u(a());
                }, c)),
              (n = setTimeout(() => {
                r && s(r), (r = null), u(a());
              }, l));
          })
    );
  };
}
function zd(e) {
  return e;
}
function mo(e) {
  return Ja() ? (cu(e), !0) : !1;
}
function Kd(e, t = 200, n = {}) {
  return jd(Dd(t, n), e);
}
function Z1(e, t = 200, n = {}) {
  const r = te(e.value),
    o = Kd(
      () => {
        r.value = e.value;
      },
      t,
      n,
    );
  return he(e, () => o()), r;
}
function Ud(e, t = !0) {
  _t() ? rt(e) : t ? e() : On(e);
}
function Ui(e, t, n = {}) {
  const { immediate: r = !0 } = n,
    o = te(!1);
  let s = null;
  function i() {
    s && (clearTimeout(s), (s = null));
  }
  function a() {
    (o.value = !1), i();
  }
  function l(...c) {
    i(),
      (o.value = !0),
      (s = setTimeout(() => {
        (o.value = !1), (s = null), e(...c);
      }, cr(t)));
  }
  return (
    r && ((o.value = !0), gt && l()),
    mo(a),
    { isPending: mr(o), start: l, stop: a }
  );
}
function Kt(e) {
  var t;
  const n = cr(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const go = gt ? window : void 0,
  Wd = gt ? window.document : void 0;
function Cn(...e) {
  let t, n, r, o;
  if (
    (Bd(e[0]) || Array.isArray(e[0])
      ? (([n, r, o] = e), (t = go))
      : ([t, n, r, o] = e),
    !t)
  )
    return Jr;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [],
    i = () => {
      s.forEach((u) => u()), (s.length = 0);
    },
    a = (u, f, d, m) => (
      u.addEventListener(f, d, m), () => u.removeEventListener(f, d, m)
    ),
    l = he(
      () => [Kt(t), cr(o)],
      ([u, f]) => {
        i(), u && s.push(...n.flatMap((d) => r.map((m) => a(u, d, m, f))));
      },
      { immediate: !0, flush: "post" },
    ),
    c = () => {
      l(), i();
    };
  return mo(c), c;
}
let Wi = !1;
function Vd(e, t, n = {}) {
  const {
    window: r = go,
    ignore: o = [],
    capture: s = !0,
    detectIframe: i = !1,
  } = n;
  if (!r) return;
  Hd &&
    !Wi &&
    ((Wi = !0),
    Array.from(r.document.body.children).forEach((d) =>
      d.addEventListener("click", Jr),
    ));
  let a = !0;
  const l = (d) =>
      o.some((m) => {
        if (typeof m == "string")
          return Array.from(r.document.querySelectorAll(m)).some(
            (v) => v === d.target || d.composedPath().includes(v),
          );
        {
          const v = Kt(m);
          return v && (d.target === v || d.composedPath().includes(v));
        }
      }),
    u = [
      Cn(
        r,
        "click",
        (d) => {
          const m = Kt(e);
          if (!(!m || m === d.target || d.composedPath().includes(m))) {
            if ((d.detail === 0 && (a = !l(d)), !a)) {
              a = !0;
              return;
            }
            t(d);
          }
        },
        { passive: !0, capture: s },
      ),
      Cn(
        r,
        "pointerdown",
        (d) => {
          const m = Kt(e);
          m && (a = !d.composedPath().includes(m) && !l(d));
        },
        { passive: !0 },
      ),
      i &&
        Cn(r, "blur", (d) => {
          var m;
          const v = Kt(e);
          ((m = r.document.activeElement) == null ? void 0 : m.tagName) ===
            "IFRAME" &&
            !(v != null && v.contains(r.document.activeElement)) &&
            t(d);
        }),
    ].filter(Boolean);
  return () => u.forEach((d) => d());
}
function qd(e, t = !1) {
  const n = te(),
    r = () => (n.value = !!e());
  return r(), Ud(r, t), n;
}
const Vi =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  qi = "__vueuse_ssr_handlers__";
Vi[qi] = Vi[qi] || {};
function Q1({ document: e = Wd } = {}) {
  if (!e) return te("visible");
  const t = te(e.visibilityState);
  return (
    Cn(e, "visibilitychange", () => {
      t.value = e.visibilityState;
    }),
    t
  );
}
var Zi = Object.getOwnPropertySymbols,
  Zd = Object.prototype.hasOwnProperty,
  Qd = Object.prototype.propertyIsEnumerable,
  Gd = (e, t) => {
    var n = {};
    for (var r in e) Zd.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && Zi)
      for (var r of Zi(e)) t.indexOf(r) < 0 && Qd.call(e, r) && (n[r] = e[r]);
    return n;
  };
function Jd(e, t, n = {}) {
  const r = n,
    { window: o = go } = r,
    s = Gd(r, ["window"]);
  let i;
  const a = qd(() => o && "ResizeObserver" in o),
    l = () => {
      i && (i.disconnect(), (i = void 0));
    },
    c = he(
      () => Kt(e),
      (f) => {
        l(),
          a.value && o && f && ((i = new ResizeObserver(t)), i.observe(f, s));
      },
      { immediate: !0, flush: "post" },
    ),
    u = () => {
      l(), c();
    };
  return mo(u), { isSupported: a, stop: u };
}
var Qi;
(function (e) {
  (e.UP = "UP"),
    (e.RIGHT = "RIGHT"),
    (e.DOWN = "DOWN"),
    (e.LEFT = "LEFT"),
    (e.NONE = "NONE");
})(Qi || (Qi = {}));
var Yd = Object.defineProperty,
  Gi = Object.getOwnPropertySymbols,
  Xd = Object.prototype.hasOwnProperty,
  ep = Object.prototype.propertyIsEnumerable,
  Ji = (e, t, n) =>
    t in e
      ? Yd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  tp = (e, t) => {
    for (var n in t || (t = {})) Xd.call(t, n) && Ji(e, n, t[n]);
    if (Gi) for (var n of Gi(t)) ep.call(t, n) && Ji(e, n, t[n]);
    return e;
  };
const np = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
tp({ linear: zd }, np);
function G1({ window: e = go } = {}) {
  if (!e) return te(!1);
  const t = te(e.document.hasFocus());
  return (
    Cn(e, "blur", () => {
      t.value = !1;
    }),
    Cn(e, "focus", () => {
      t.value = !0;
    }),
    t
  );
}
function Yo(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var o = e[t];
    r[o[0]] = o[1];
  }
  return r;
}
function ur(e) {
  return e == null;
}
function rp(e) {
  return e === void 0;
}
const op = (e) => e === void 0,
  ec = (e) => typeof e == "boolean",
  fr = (e) => typeof e == "number",
  Yr = (e) => (typeof Element > "u" ? !1 : e instanceof Element),
  sp = (e) => (pe(e) ? !Number.isNaN(Number(e)) : !1);
class ip extends Error {
  constructor(t) {
    super(t), (this.name = "ElementPlusError");
  }
}
function Xr(e, t) {
  throw new ip(`[${e}] ${t}`);
}
function J1(e, t) {}
const tc = (e = "") => e.split(" ").filter((t) => !!t.trim()),
  ap = (e, t) => {
    if (!e || !t) return !1;
    if (t.includes(" ")) throw new Error("className should not contain space.");
    return e.classList.contains(t);
  },
  Pr = (e, t) => {
    !e || !t.trim() || e.classList.add(...tc(t));
  },
  Mo = (e, t) => {
    !e || !t.trim() || e.classList.remove(...tc(t));
  };
function lp(e, t = "px") {
  if (!e) return "";
  if (fr(e) || sp(e)) return `${e}${t}`;
  if (pe(e)) return e;
}
/*! Element Plus Icons Vue v2.1.0 */ var ze = (e, t) => {
    let n = e.__vccOpts || e;
    for (let [r, o] of t) n[r] = o;
    return n;
  },
  cp = { name: "Aim" },
  up = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  fp = ye(
    "path",
    {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
    },
    null,
    -1,
  ),
  dp = ye(
    "path",
    {
      fill: "currentColor",
      d: "M512 96a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V128a32 32 0 0 1 32-32zm0 576a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V704a32 32 0 0 1 32-32zM96 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H128a32 32 0 0 1-32-32zm576 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H704a32 32 0 0 1-32-32z",
    },
    null,
    -1,
  ),
  pp = [fp, dp];
function hp(e, t, n, r, o, s) {
  return oe(), _e("svg", up, pp);
}
var mp = ze(cp, [
    ["render", hp],
    ["__file", "aim.vue"],
  ]),
  gp = { name: "ArrowDown" },
  vp = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  _p = ye(
    "path",
    {
      fill: "currentColor",
      d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z",
    },
    null,
    -1,
  ),
  bp = [_p];
function yp(e, t, n, r, o, s) {
  return oe(), _e("svg", vp, bp);
}
var wp = ze(gp, [
    ["render", yp],
    ["__file", "arrow-down.vue"],
  ]),
  Ep = { name: "ArrowLeft" },
  xp = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Cp = ye(
    "path",
    {
      fill: "currentColor",
      d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z",
    },
    null,
    -1,
  ),
  Tp = [Cp];
function Op(e, t, n, r, o, s) {
  return oe(), _e("svg", xp, Tp);
}
var Y1 = ze(Ep, [
    ["render", Op],
    ["__file", "arrow-left.vue"],
  ]),
  Mp = { name: "ArrowRight" },
  Pp = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Sp = ye(
    "path",
    {
      fill: "currentColor",
      d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z",
    },
    null,
    -1,
  ),
  Ap = [Sp];
function Rp(e, t, n, r, o, s) {
  return oe(), _e("svg", Pp, Ap);
}
var Ip = ze(Mp, [
    ["render", Rp],
    ["__file", "arrow-right.vue"],
  ]),
  $p = { name: "CircleCheck" },
  kp = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Fp = ye(
    "path",
    {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
    },
    null,
    -1,
  ),
  Np = ye(
    "path",
    {
      fill: "currentColor",
      d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z",
    },
    null,
    -1,
  ),
  Lp = [Fp, Np];
function Bp(e, t, n, r, o, s) {
  return oe(), _e("svg", kp, Lp);
}
var Hp = ze($p, [
    ["render", Bp],
    ["__file", "circle-check.vue"],
  ]),
  jp = { name: "CircleClose" },
  Dp = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  zp = ye(
    "path",
    {
      fill: "currentColor",
      d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z",
    },
    null,
    -1,
  ),
  Kp = ye(
    "path",
    {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
    },
    null,
    -1,
  ),
  Up = [zp, Kp];
function Wp(e, t, n, r, o, s) {
  return oe(), _e("svg", Dp, Up);
}
var Vp = ze(jp, [
    ["render", Wp],
    ["__file", "circle-close.vue"],
  ]),
  qp = { name: "Close" },
  Zp = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Qp = ye(
    "path",
    {
      fill: "currentColor",
      d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z",
    },
    null,
    -1,
  ),
  Gp = [Qp];
function Jp(e, t, n, r, o, s) {
  return oe(), _e("svg", Zp, Gp);
}
var X1 = ze(qp, [
    ["render", Jp],
    ["__file", "close.vue"],
  ]),
  Yp = { name: "Hide" },
  Xp = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  eh = ye(
    "path",
    {
      fill: "currentColor",
      d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
    },
    null,
    -1,
  ),
  th = ye(
    "path",
    {
      fill: "currentColor",
      d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
    },
    null,
    -1,
  ),
  nh = [eh, th];
function rh(e, t, n, r, o, s) {
  return oe(), _e("svg", Xp, nh);
}
var e_ = ze(Yp, [
    ["render", rh],
    ["__file", "hide.vue"],
  ]),
  oh = { name: "HomeFilled" },
  sh = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  ih = ye(
    "path",
    {
      fill: "currentColor",
      d: "M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z",
    },
    null,
    -1,
  ),
  ah = [ih];
function lh(e, t, n, r, o, s) {
  return oe(), _e("svg", sh, ah);
}
var ch = ze(oh, [
    ["render", lh],
    ["__file", "home-filled.vue"],
  ]),
  uh = { name: "Loading" },
  fh = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  dh = ye(
    "path",
    {
      fill: "currentColor",
      d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z",
    },
    null,
    -1,
  ),
  ph = [dh];
function hh(e, t, n, r, o, s) {
  return oe(), _e("svg", fh, ph);
}
var mh = ze(uh, [
    ["render", hh],
    ["__file", "loading.vue"],
  ]),
  gh = { name: "Money" },
  vh = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  _h = ye(
    "path",
    {
      fill: "currentColor",
      d: "M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640h64z",
    },
    null,
    -1,
  ),
  bh = ye(
    "path",
    {
      fill: "currentColor",
      d: "M768 192H128v448h640V192zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.056 29.056 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z",
    },
    null,
    -1,
  ),
  yh = ye(
    "path",
    {
      fill: "currentColor",
      d: "M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320zm0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192z",
    },
    null,
    -1,
  ),
  wh = [_h, bh, yh];
function Eh(e, t, n, r, o, s) {
  return oe(), _e("svg", vh, wh);
}
var xh = ze(gh, [
    ["render", Eh],
    ["__file", "money.vue"],
  ]),
  Ch = { name: "More" },
  Th = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Oh = ye(
    "path",
    {
      fill: "currentColor",
      d: "M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96z",
    },
    null,
    -1,
  ),
  Mh = [Oh];
function Ph(e, t, n, r, o, s) {
  return oe(), _e("svg", Th, Mh);
}
var Sh = ze(Ch, [
    ["render", Ph],
    ["__file", "more.vue"],
  ]),
  Ah = { name: "Plus" },
  Rh = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Ih = ye(
    "path",
    {
      fill: "currentColor",
      d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z",
    },
    null,
    -1,
  ),
  $h = [Ih];
function kh(e, t, n, r, o, s) {
  return oe(), _e("svg", Rh, $h);
}
var t_ = ze(Ah, [
    ["render", kh],
    ["__file", "plus.vue"],
  ]),
  Fh = { name: "Tools" },
  Nh = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Lh = ye(
    "path",
    {
      fill: "currentColor",
      d: "M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z",
    },
    null,
    -1,
  ),
  Bh = [Lh];
function Hh(e, t, n, r, o, s) {
  return oe(), _e("svg", Nh, Bh);
}
var jh = ze(Fh, [
    ["render", Hh],
    ["__file", "tools.vue"],
  ]),
  Dh = { name: "View" },
  zh = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" },
  Kh = ye(
    "path",
    {
      fill: "currentColor",
      d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z",
    },
    null,
    -1,
  ),
  Uh = [Kh];
function Wh(e, t, n, r, o, s) {
  return oe(), _e("svg", zh, Uh);
}
var n_ = ze(Dh, [
  ["render", Wh],
  ["__file", "view.vue"],
]);
const nc = "__epPropKey",
  be = (e) => e,
  Vh = (e) => me(e) && !!e[nc],
  Rs = (e, t) => {
    if (!me(e) || Vh(e)) return e;
    const { values: n, required: r, default: o, type: s, validator: i } = e,
      l = {
        type: s,
        required: !!r,
        validator:
          n || i
            ? (c) => {
                let u = !1,
                  f = [];
                if (
                  (n &&
                    ((f = Array.from(n)),
                    le(e, "default") && f.push(o),
                    u || (u = f.includes(c))),
                  i && (u || (u = i(c))),
                  !u && f.length > 0)
                ) {
                  const d = [...new Set(f)]
                    .map((m) => JSON.stringify(m))
                    .join(", ");
                  Ku(
                    `Invalid prop: validation failed${
                      t ? ` for prop "${t}"` : ""
                    }. Expected one of [${d}], got value ${JSON.stringify(c)}.`,
                  );
                }
                return u;
              }
            : void 0,
        [nc]: !0,
      };
    return le(e, "default") && (l.default = o), l;
  },
  ot = (e) => Yo(Object.entries(e).map(([t, n]) => [t, Rs(n, t)])),
  Sr = be([String, Object, Function]),
  r_ = { validating: mh, success: Hp, error: Vp },
  _r = (e, t) => {
    if (
      ((e.install = (n) => {
        for (const r of [e, ...Object.values(t ?? {})]) n.component(r.name, r);
      }),
      t)
    )
      for (const [n, r] of Object.entries(t)) e[n] = r;
    return e;
  },
  dn = (e) => ((e.install = De), e),
  Ve = {
    tab: "Tab",
    enter: "Enter",
    space: "Space",
    left: "ArrowLeft",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    esc: "Escape",
    delete: "Delete",
    backspace: "Backspace",
    numpadEnter: "NumpadEnter",
    pageUp: "PageUp",
    pageDown: "PageDown",
    home: "Home",
    end: "End",
  },
  zr = (e) => {
    const t = Y(e) ? e : [e],
      n = [];
    return (
      t.forEach((r) => {
        var o;
        Y(r)
          ? n.push(...zr(r))
          : Mn(r) && Y(r.children)
          ? n.push(...zr(r.children))
          : (n.push(r),
            Mn(r) &&
              (o = r.component) != null &&
              o.subTree &&
              n.push(...zr(r.component.subTree)));
      }),
      n
    );
  },
  qh = (e) => e,
  Zh = (
    { from: e, replacement: t, scope: n, version: r, ref: o, type: s = "API" },
    i,
  ) => {
    he(
      () => O(i),
      (a) => {},
      { immediate: !0 },
    );
  },
  Po = "el",
  Qh = "is-",
  Yt = (e, t, n, r, o) => {
    let s = `${e}-${t}`;
    return n && (s += `-${n}`), r && (s += `__${r}`), o && (s += `--${o}`), s;
  },
  Gh = Symbol("namespaceContextKey"),
  Is = (e) => {
    const t = e || (_t() ? Ce(Gh, te(Po)) : te(Po));
    return U(() => O(t) || Po);
  },
  Pe = (e, t) => {
    const n = Is(t);
    return {
      namespace: n,
      b: (g = "") => Yt(n.value, e, g, "", ""),
      e: (g) => (g ? Yt(n.value, e, "", g, "") : ""),
      m: (g) => (g ? Yt(n.value, e, "", "", g) : ""),
      be: (g, y) => (g && y ? Yt(n.value, e, g, y, "") : ""),
      em: (g, y) => (g && y ? Yt(n.value, e, "", g, y) : ""),
      bm: (g, y) => (g && y ? Yt(n.value, e, g, "", y) : ""),
      bem: (g, y, _) => (g && y && _ ? Yt(n.value, e, g, y, _) : ""),
      is: (g, ...y) => {
        const _ = y.length >= 1 ? y[0] : !0;
        return g && _ ? `${Qh}${g}` : "";
      },
      cssVar: (g) => {
        const y = {};
        for (const _ in g) g[_] && (y[`--${n.value}-${_}`] = g[_]);
        return y;
      },
      cssVarName: (g) => `--${n.value}-${g}`,
      cssVarBlock: (g) => {
        const y = {};
        for (const _ in g) g[_] && (y[`--${n.value}-${e}-${_}`] = g[_]);
        return y;
      },
      cssVarBlockName: (g) => `--${n.value}-${e}-${g}`,
    };
  },
  Jh = Rs({ type: be(Boolean), default: null }),
  Yh = Rs({ type: be(Function) }),
  rc = (e) => {
    const t = `update:${e}`,
      n = `onUpdate:${e}`,
      r = [t],
      o = { [e]: Jh, [n]: Yh };
    return {
      useModelToggle: ({
        indicator: i,
        toggleReason: a,
        shouldHideWhenRouteChanges: l,
        shouldProceed: c,
        onShow: u,
        onHide: f,
      }) => {
        const d = _t(),
          { emit: m } = d,
          v = d.props,
          g = U(() => re(v[n])),
          y = U(() => v[e] === null),
          _ = (L) => {
            i.value !== !0 &&
              ((i.value = !0), a && (a.value = L), re(u) && u(L));
          },
          E = (L) => {
            i.value !== !1 &&
              ((i.value = !1), a && (a.value = L), re(f) && f(L));
          },
          $ = (L) => {
            if (v.disabled === !0 || (re(c) && !c())) return;
            const R = g.value && gt;
            R && m(t, !0), (y.value || !R) && _(L);
          },
          w = (L) => {
            if (v.disabled === !0 || !gt) return;
            const R = g.value && gt;
            R && m(t, !1), (y.value || !R) && E(L);
          },
          H = (L) => {
            ec(L) &&
              (v.disabled && L
                ? g.value && m(t, !1)
                : i.value !== L && (L ? _() : E()));
          },
          D = () => {
            i.value ? w() : $();
          };
        return (
          he(() => v[e], H),
          l &&
            d.appContext.config.globalProperties.$route !== void 0 &&
            he(
              () => ({ ...d.proxy.$route }),
              () => {
                l.value && i.value && w();
              },
            ),
          rt(() => {
            H(v[e]);
          }),
          { hide: w, show: $, toggle: D, hasUpdateHandler: g }
        );
      },
      useModelToggleProps: o,
      useModelToggleEmits: r,
    };
  };
rc("modelValue");
var qe = "top",
  lt = "bottom",
  ct = "right",
  Ze = "left",
  $s = "auto",
  br = [qe, lt, ct, Ze],
  Sn = "start",
  dr = "end",
  Xh = "clippingParents",
  oc = "viewport",
  Dn = "popper",
  e0 = "reference",
  Yi = br.reduce(function (e, t) {
    return e.concat([t + "-" + Sn, t + "-" + dr]);
  }, []),
  ks = [].concat(br, [$s]).reduce(function (e, t) {
    return e.concat([t, t + "-" + Sn, t + "-" + dr]);
  }, []),
  t0 = "beforeRead",
  n0 = "read",
  r0 = "afterRead",
  o0 = "beforeMain",
  s0 = "main",
  i0 = "afterMain",
  a0 = "beforeWrite",
  l0 = "write",
  c0 = "afterWrite",
  u0 = [t0, n0, r0, o0, s0, i0, a0, l0, c0];
function Ot(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function bt(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function An(e) {
  var t = bt(e).Element;
  return e instanceof t || e instanceof Element;
}
function at(e) {
  var t = bt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Fs(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = bt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function f0(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (n) {
    var r = t.styles[n] || {},
      o = t.attributes[n] || {},
      s = t.elements[n];
    !at(s) ||
      !Ot(s) ||
      (Object.assign(s.style, r),
      Object.keys(o).forEach(function (i) {
        var a = o[i];
        a === !1 ? s.removeAttribute(i) : s.setAttribute(i, a === !0 ? "" : a);
      }));
  });
}
function d0(e) {
  var t = e.state,
    n = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, n.popper),
    (t.styles = n),
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var o = t.elements[r],
          s = t.attributes[r] || {},
          i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
          a = i.reduce(function (l, c) {
            return (l[c] = ""), l;
          }, {});
        !at(o) ||
          !Ot(o) ||
          (Object.assign(o.style, a),
          Object.keys(s).forEach(function (l) {
            o.removeAttribute(l);
          }));
      });
    }
  );
}
var sc = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: f0,
  effect: d0,
  requires: ["computeStyles"],
};
function Ct(e) {
  return e.split("-")[0];
}
var an = Math.max,
  eo = Math.min,
  Rn = Math.round;
function In(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(),
    r = 1,
    o = 1;
  if (at(e) && t) {
    var s = e.offsetHeight,
      i = e.offsetWidth;
    i > 0 && (r = Rn(n.width) / i || 1), s > 0 && (o = Rn(n.height) / s || 1);
  }
  return {
    width: n.width / r,
    height: n.height / o,
    top: n.top / o,
    right: n.right / r,
    bottom: n.bottom / o,
    left: n.left / r,
    x: n.left / r,
    y: n.top / o,
  };
}
function Ns(e) {
  var t = In(e),
    n = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
  );
}
function ic(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && Fs(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function kt(e) {
  return bt(e).getComputedStyle(e);
}
function p0(e) {
  return ["table", "td", "th"].indexOf(Ot(e)) >= 0;
}
function Zt(e) {
  return ((An(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function vo(e) {
  return Ot(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (Fs(e) ? e.host : null) || Zt(e);
}
function Xi(e) {
  return !at(e) || kt(e).position === "fixed" ? null : e.offsetParent;
}
function h0(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
    n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && at(e)) {
    var r = kt(e);
    if (r.position === "fixed") return null;
  }
  var o = vo(e);
  for (Fs(o) && (o = o.host); at(o) && ["html", "body"].indexOf(Ot(o)) < 0; ) {
    var s = kt(o);
    if (
      s.transform !== "none" ||
      s.perspective !== "none" ||
      s.contain === "paint" ||
      ["transform", "perspective"].indexOf(s.willChange) !== -1 ||
      (t && s.willChange === "filter") ||
      (t && s.filter && s.filter !== "none")
    )
      return o;
    o = o.parentNode;
  }
  return null;
}
function yr(e) {
  for (var t = bt(e), n = Xi(e); n && p0(n) && kt(n).position === "static"; )
    n = Xi(n);
  return n &&
    (Ot(n) === "html" || (Ot(n) === "body" && kt(n).position === "static"))
    ? t
    : n || h0(e) || t;
}
function Ls(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Gn(e, t, n) {
  return an(e, eo(t, n));
}
function m0(e, t, n) {
  var r = Gn(e, t, n);
  return r > n ? n : r;
}
function ac() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function lc(e) {
  return Object.assign({}, ac(), e);
}
function cc(e, t) {
  return t.reduce(function (n, r) {
    return (n[r] = e), n;
  }, {});
}
var g0 = function (e, t) {
  return (
    (e =
      typeof e == "function"
        ? e(Object.assign({}, t.rects, { placement: t.placement }))
        : e),
    lc(typeof e != "number" ? e : cc(e, br))
  );
};
function v0(e) {
  var t,
    n = e.state,
    r = e.name,
    o = e.options,
    s = n.elements.arrow,
    i = n.modifiersData.popperOffsets,
    a = Ct(n.placement),
    l = Ls(a),
    c = [Ze, ct].indexOf(a) >= 0,
    u = c ? "height" : "width";
  if (!(!s || !i)) {
    var f = g0(o.padding, n),
      d = Ns(s),
      m = l === "y" ? qe : Ze,
      v = l === "y" ? lt : ct,
      g =
        n.rects.reference[u] + n.rects.reference[l] - i[l] - n.rects.popper[u],
      y = i[l] - n.rects.reference[l],
      _ = yr(s),
      E = _ ? (l === "y" ? _.clientHeight || 0 : _.clientWidth || 0) : 0,
      $ = g / 2 - y / 2,
      w = f[m],
      H = E - d[u] - f[v],
      D = E / 2 - d[u] / 2 + $,
      L = Gn(w, D, H),
      R = l;
    n.modifiersData[r] = ((t = {}), (t[R] = L), (t.centerOffset = L - D), t);
  }
}
function _0(e) {
  var t = e.state,
    n = e.options,
    r = n.element,
    o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null &&
    ((typeof o == "string" && ((o = t.elements.popper.querySelector(o)), !o)) ||
      !ic(t.elements.popper, o) ||
      (t.elements.arrow = o));
}
var b0 = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: v0,
  effect: _0,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function $n(e) {
  return e.split("-")[1];
}
var y0 = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function w0(e) {
  var t = e.x,
    n = e.y,
    r = window,
    o = r.devicePixelRatio || 1;
  return { x: Rn(t * o) / o || 0, y: Rn(n * o) / o || 0 };
}
function ea(e) {
  var t,
    n = e.popper,
    r = e.popperRect,
    o = e.placement,
    s = e.variation,
    i = e.offsets,
    a = e.position,
    l = e.gpuAcceleration,
    c = e.adaptive,
    u = e.roundOffsets,
    f = e.isFixed,
    d = i.x,
    m = d === void 0 ? 0 : d,
    v = i.y,
    g = v === void 0 ? 0 : v,
    y = typeof u == "function" ? u({ x: m, y: g }) : { x: m, y: g };
  (m = y.x), (g = y.y);
  var _ = i.hasOwnProperty("x"),
    E = i.hasOwnProperty("y"),
    $ = Ze,
    w = qe,
    H = window;
  if (c) {
    var D = yr(n),
      L = "clientHeight",
      R = "clientWidth";
    if (
      (D === bt(n) &&
        ((D = Zt(n)),
        kt(D).position !== "static" &&
          a === "absolute" &&
          ((L = "scrollHeight"), (R = "scrollWidth"))),
      (D = D),
      o === qe || ((o === Ze || o === ct) && s === dr))
    ) {
      w = lt;
      var q = f && D === H && H.visualViewport ? H.visualViewport.height : D[L];
      (g -= q - r.height), (g *= l ? 1 : -1);
    }
    if (o === Ze || ((o === qe || o === lt) && s === dr)) {
      $ = ct;
      var W = f && D === H && H.visualViewport ? H.visualViewport.width : D[R];
      (m -= W - r.width), (m *= l ? 1 : -1);
    }
  }
  var I = Object.assign({ position: a }, c && y0),
    x = u === !0 ? w0({ x: m, y: g }) : { x: m, y: g };
  if (((m = x.x), (g = x.y), l)) {
    var k;
    return Object.assign(
      {},
      I,
      ((k = {}),
      (k[w] = E ? "0" : ""),
      (k[$] = _ ? "0" : ""),
      (k.transform =
        (H.devicePixelRatio || 1) <= 1
          ? "translate(" + m + "px, " + g + "px)"
          : "translate3d(" + m + "px, " + g + "px, 0)"),
      k),
    );
  }
  return Object.assign(
    {},
    I,
    ((t = {}),
    (t[w] = E ? g + "px" : ""),
    (t[$] = _ ? m + "px" : ""),
    (t.transform = ""),
    t),
  );
}
function E0(e) {
  var t = e.state,
    n = e.options,
    r = n.gpuAcceleration,
    o = r === void 0 ? !0 : r,
    s = n.adaptive,
    i = s === void 0 ? !0 : s,
    a = n.roundOffsets,
    l = a === void 0 ? !0 : a,
    c = {
      placement: Ct(t.placement),
      variation: $n(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: o,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      ea(
        Object.assign({}, c, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: i,
          roundOffsets: l,
        }),
      ),
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        ea(
          Object.assign({}, c, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l,
          }),
        ),
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
var uc = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: E0,
    data: {},
  },
  Ar = { passive: !0 };
function x0(e) {
  var t = e.state,
    n = e.instance,
    r = e.options,
    o = r.scroll,
    s = o === void 0 ? !0 : o,
    i = r.resize,
    a = i === void 0 ? !0 : i,
    l = bt(t.elements.popper),
    c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    s &&
      c.forEach(function (u) {
        u.addEventListener("scroll", n.update, Ar);
      }),
    a && l.addEventListener("resize", n.update, Ar),
    function () {
      s &&
        c.forEach(function (u) {
          u.removeEventListener("scroll", n.update, Ar);
        }),
        a && l.removeEventListener("resize", n.update, Ar);
    }
  );
}
var fc = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: x0,
    data: {},
  },
  C0 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Kr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return C0[t];
  });
}
var T0 = { start: "end", end: "start" };
function ta(e) {
  return e.replace(/start|end/g, function (t) {
    return T0[t];
  });
}
function Bs(e) {
  var t = bt(e),
    n = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function Hs(e) {
  return In(Zt(e)).left + Bs(e).scrollLeft;
}
function O0(e) {
  var t = bt(e),
    n = Zt(e),
    r = t.visualViewport,
    o = n.clientWidth,
    s = n.clientHeight,
    i = 0,
    a = 0;
  return (
    r &&
      ((o = r.width),
      (s = r.height),
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
        ((i = r.offsetLeft), (a = r.offsetTop))),
    { width: o, height: s, x: i + Hs(e), y: a }
  );
}
function M0(e) {
  var t,
    n = Zt(e),
    r = Bs(e),
    o = (t = e.ownerDocument) == null ? void 0 : t.body,
    s = an(
      n.scrollWidth,
      n.clientWidth,
      o ? o.scrollWidth : 0,
      o ? o.clientWidth : 0,
    ),
    i = an(
      n.scrollHeight,
      n.clientHeight,
      o ? o.scrollHeight : 0,
      o ? o.clientHeight : 0,
    ),
    a = -r.scrollLeft + Hs(e),
    l = -r.scrollTop;
  return (
    kt(o || n).direction === "rtl" &&
      (a += an(n.clientWidth, o ? o.clientWidth : 0) - s),
    { width: s, height: i, x: a, y: l }
  );
}
function js(e) {
  var t = kt(e),
    n = t.overflow,
    r = t.overflowX,
    o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function dc(e) {
  return ["html", "body", "#document"].indexOf(Ot(e)) >= 0
    ? e.ownerDocument.body
    : at(e) && js(e)
    ? e
    : dc(vo(e));
}
function Jn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = dc(e),
    o = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
    s = bt(r),
    i = o ? [s].concat(s.visualViewport || [], js(r) ? r : []) : r,
    a = t.concat(i);
  return o ? a : a.concat(Jn(vo(i)));
}
function Xo(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function P0(e) {
  var t = In(e);
  return (
    (t.top = t.top + e.clientTop),
    (t.left = t.left + e.clientLeft),
    (t.bottom = t.top + e.clientHeight),
    (t.right = t.left + e.clientWidth),
    (t.width = e.clientWidth),
    (t.height = e.clientHeight),
    (t.x = t.left),
    (t.y = t.top),
    t
  );
}
function na(e, t) {
  return t === oc ? Xo(O0(e)) : An(t) ? P0(t) : Xo(M0(Zt(e)));
}
function S0(e) {
  var t = Jn(vo(e)),
    n = ["absolute", "fixed"].indexOf(kt(e).position) >= 0,
    r = n && at(e) ? yr(e) : e;
  return An(r)
    ? t.filter(function (o) {
        return An(o) && ic(o, r) && Ot(o) !== "body";
      })
    : [];
}
function A0(e, t, n) {
  var r = t === "clippingParents" ? S0(e) : [].concat(t),
    o = [].concat(r, [n]),
    s = o[0],
    i = o.reduce(
      function (a, l) {
        var c = na(e, l);
        return (
          (a.top = an(c.top, a.top)),
          (a.right = eo(c.right, a.right)),
          (a.bottom = eo(c.bottom, a.bottom)),
          (a.left = an(c.left, a.left)),
          a
        );
      },
      na(e, s),
    );
  return (
    (i.width = i.right - i.left),
    (i.height = i.bottom - i.top),
    (i.x = i.left),
    (i.y = i.top),
    i
  );
}
function pc(e) {
  var t = e.reference,
    n = e.element,
    r = e.placement,
    o = r ? Ct(r) : null,
    s = r ? $n(r) : null,
    i = t.x + t.width / 2 - n.width / 2,
    a = t.y + t.height / 2 - n.height / 2,
    l;
  switch (o) {
    case qe:
      l = { x: i, y: t.y - n.height };
      break;
    case lt:
      l = { x: i, y: t.y + t.height };
      break;
    case ct:
      l = { x: t.x + t.width, y: a };
      break;
    case Ze:
      l = { x: t.x - n.width, y: a };
      break;
    default:
      l = { x: t.x, y: t.y };
  }
  var c = o ? Ls(o) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (s) {
      case Sn:
        l[c] = l[c] - (t[u] / 2 - n[u] / 2);
        break;
      case dr:
        l[c] = l[c] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return l;
}
function pr(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    o = r === void 0 ? e.placement : r,
    s = n.boundary,
    i = s === void 0 ? Xh : s,
    a = n.rootBoundary,
    l = a === void 0 ? oc : a,
    c = n.elementContext,
    u = c === void 0 ? Dn : c,
    f = n.altBoundary,
    d = f === void 0 ? !1 : f,
    m = n.padding,
    v = m === void 0 ? 0 : m,
    g = lc(typeof v != "number" ? v : cc(v, br)),
    y = u === Dn ? e0 : Dn,
    _ = e.rects.popper,
    E = e.elements[d ? y : u],
    $ = A0(An(E) ? E : E.contextElement || Zt(e.elements.popper), i, l),
    w = In(e.elements.reference),
    H = pc({ reference: w, element: _, strategy: "absolute", placement: o }),
    D = Xo(Object.assign({}, _, H)),
    L = u === Dn ? D : w,
    R = {
      top: $.top - L.top + g.top,
      bottom: L.bottom - $.bottom + g.bottom,
      left: $.left - L.left + g.left,
      right: L.right - $.right + g.right,
    },
    q = e.modifiersData.offset;
  if (u === Dn && q) {
    var W = q[o];
    Object.keys(R).forEach(function (I) {
      var x = [ct, lt].indexOf(I) >= 0 ? 1 : -1,
        k = [qe, lt].indexOf(I) >= 0 ? "y" : "x";
      R[I] += W[k] * x;
    });
  }
  return R;
}
function R0(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    o = n.boundary,
    s = n.rootBoundary,
    i = n.padding,
    a = n.flipVariations,
    l = n.allowedAutoPlacements,
    c = l === void 0 ? ks : l,
    u = $n(r),
    f = u
      ? a
        ? Yi
        : Yi.filter(function (v) {
            return $n(v) === u;
          })
      : br,
    d = f.filter(function (v) {
      return c.indexOf(v) >= 0;
    });
  d.length === 0 && (d = f);
  var m = d.reduce(function (v, g) {
    return (
      (v[g] = pr(e, { placement: g, boundary: o, rootBoundary: s, padding: i })[
        Ct(g)
      ]),
      v
    );
  }, {});
  return Object.keys(m).sort(function (v, g) {
    return m[v] - m[g];
  });
}
function I0(e) {
  if (Ct(e) === $s) return [];
  var t = Kr(e);
  return [ta(e), t, ta(t)];
}
function $0(e) {
  var t = e.state,
    n = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var o = n.mainAxis,
        s = o === void 0 ? !0 : o,
        i = n.altAxis,
        a = i === void 0 ? !0 : i,
        l = n.fallbackPlacements,
        c = n.padding,
        u = n.boundary,
        f = n.rootBoundary,
        d = n.altBoundary,
        m = n.flipVariations,
        v = m === void 0 ? !0 : m,
        g = n.allowedAutoPlacements,
        y = t.options.placement,
        _ = Ct(y),
        E = _ === y,
        $ = l || (E || !v ? [Kr(y)] : I0(y)),
        w = [y].concat($).reduce(function (Ke, Ue) {
          return Ke.concat(
            Ct(Ue) === $s
              ? R0(t, {
                  placement: Ue,
                  boundary: u,
                  rootBoundary: f,
                  padding: c,
                  flipVariations: v,
                  allowedAutoPlacements: g,
                })
              : Ue,
          );
        }, []),
        H = t.rects.reference,
        D = t.rects.popper,
        L = new Map(),
        R = !0,
        q = w[0],
        W = 0;
      W < w.length;
      W++
    ) {
      var I = w[W],
        x = Ct(I),
        k = $n(I) === Sn,
        X = [qe, lt].indexOf(x) >= 0,
        ne = X ? "width" : "height",
        j = pr(t, {
          placement: I,
          boundary: u,
          rootBoundary: f,
          altBoundary: d,
          padding: c,
        }),
        P = X ? (k ? ct : Ze) : k ? lt : qe;
      H[ne] > D[ne] && (P = Kr(P));
      var V = Kr(P),
        ce = [];
      if (
        (s && ce.push(j[x] <= 0),
        a && ce.push(j[P] <= 0, j[V] <= 0),
        ce.every(function (Ke) {
          return Ke;
        }))
      ) {
        (q = I), (R = !1);
        break;
      }
      L.set(I, ce);
    }
    if (R)
      for (
        var xe = v ? 3 : 1,
          Be = function (Ke) {
            var Ue = w.find(function (Oe) {
              var T = L.get(Oe);
              if (T)
                return T.slice(0, Ke).every(function (z) {
                  return z;
                });
            });
            if (Ue) return (q = Ue), "break";
          },
          Se = xe;
        Se > 0;
        Se--
      ) {
        var ft = Be(Se);
        if (ft === "break") break;
      }
    t.placement !== q &&
      ((t.modifiersData[r]._skip = !0), (t.placement = q), (t.reset = !0));
  }
}
var k0 = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: $0,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function ra(e, t, n) {
  return (
    n === void 0 && (n = { x: 0, y: 0 }),
    {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x,
    }
  );
}
function oa(e) {
  return [qe, ct, lt, Ze].some(function (t) {
    return e[t] >= 0;
  });
}
function F0(e) {
  var t = e.state,
    n = e.name,
    r = t.rects.reference,
    o = t.rects.popper,
    s = t.modifiersData.preventOverflow,
    i = pr(t, { elementContext: "reference" }),
    a = pr(t, { altBoundary: !0 }),
    l = ra(i, r),
    c = ra(a, o, s),
    u = oa(l),
    f = oa(c);
  (t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: f,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": u,
      "data-popper-escaped": f,
    }));
}
var N0 = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: F0,
};
function L0(e, t, n) {
  var r = Ct(e),
    o = [Ze, qe].indexOf(r) >= 0 ? -1 : 1,
    s = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
    i = s[0],
    a = s[1];
  return (
    (i = i || 0),
    (a = (a || 0) * o),
    [Ze, ct].indexOf(r) >= 0 ? { x: a, y: i } : { x: i, y: a }
  );
}
function B0(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    o = n.offset,
    s = o === void 0 ? [0, 0] : o,
    i = ks.reduce(function (u, f) {
      return (u[f] = L0(f, t.rects, s)), u;
    }, {}),
    a = i[t.placement],
    l = a.x,
    c = a.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += l),
    (t.modifiersData.popperOffsets.y += c)),
    (t.modifiersData[r] = i);
}
var H0 = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: B0,
};
function j0(e) {
  var t = e.state,
    n = e.name;
  t.modifiersData[n] = pc({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
var hc = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: j0,
  data: {},
};
function D0(e) {
  return e === "x" ? "y" : "x";
}
function z0(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    o = n.mainAxis,
    s = o === void 0 ? !0 : o,
    i = n.altAxis,
    a = i === void 0 ? !1 : i,
    l = n.boundary,
    c = n.rootBoundary,
    u = n.altBoundary,
    f = n.padding,
    d = n.tether,
    m = d === void 0 ? !0 : d,
    v = n.tetherOffset,
    g = v === void 0 ? 0 : v,
    y = pr(t, { boundary: l, rootBoundary: c, padding: f, altBoundary: u }),
    _ = Ct(t.placement),
    E = $n(t.placement),
    $ = !E,
    w = Ls(_),
    H = D0(w),
    D = t.modifiersData.popperOffsets,
    L = t.rects.reference,
    R = t.rects.popper,
    q =
      typeof g == "function"
        ? g(Object.assign({}, t.rects, { placement: t.placement }))
        : g,
    W =
      typeof q == "number"
        ? { mainAxis: q, altAxis: q }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, q),
    I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    x = { x: 0, y: 0 };
  if (D) {
    if (s) {
      var k,
        X = w === "y" ? qe : Ze,
        ne = w === "y" ? lt : ct,
        j = w === "y" ? "height" : "width",
        P = D[w],
        V = P + y[X],
        ce = P - y[ne],
        xe = m ? -R[j] / 2 : 0,
        Be = E === Sn ? L[j] : R[j],
        Se = E === Sn ? -R[j] : -L[j],
        ft = t.elements.arrow,
        Ke = m && ft ? Ns(ft) : { width: 0, height: 0 },
        Ue = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : ac(),
        Oe = Ue[X],
        T = Ue[ne],
        z = Gn(0, L[j], Ke[j]),
        B = $ ? L[j] / 2 - xe - z - Oe - W.mainAxis : Be - z - Oe - W.mainAxis,
        Q = $ ? -L[j] / 2 + xe + z + T + W.mainAxis : Se + z + T + W.mainAxis,
        ue = t.elements.arrow && yr(t.elements.arrow),
        p = ue ? (w === "y" ? ue.clientTop || 0 : ue.clientLeft || 0) : 0,
        h = (k = I == null ? void 0 : I[w]) != null ? k : 0,
        b = P + B - h - p,
        C = P + Q - h,
        M = Gn(m ? eo(V, b) : V, P, m ? an(ce, C) : ce);
      (D[w] = M), (x[w] = M - P);
    }
    if (a) {
      var S,
        K = w === "x" ? qe : Ze,
        F = w === "x" ? lt : ct,
        N = D[H],
        A = H === "y" ? "height" : "width",
        J = N + y[K],
        Z = N - y[F],
        G = [qe, Ze].indexOf(_) !== -1,
        ee = (S = I == null ? void 0 : I[H]) != null ? S : 0,
        se = G ? J : N - L[A] - R[A] - ee + W.altAxis,
        ge = G ? N + L[A] + R[A] - ee - W.altAxis : Z,
        de = m && G ? m0(se, N, ge) : Gn(m ? se : J, N, m ? ge : Z);
      (D[H] = de), (x[H] = de - N);
    }
    t.modifiersData[r] = x;
  }
}
var K0 = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: z0,
  requiresIfExists: ["offset"],
};
function U0(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function W0(e) {
  return e === bt(e) || !at(e) ? Bs(e) : U0(e);
}
function V0(e) {
  var t = e.getBoundingClientRect(),
    n = Rn(t.width) / e.offsetWidth || 1,
    r = Rn(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function q0(e, t, n) {
  n === void 0 && (n = !1);
  var r = at(t),
    o = at(t) && V0(t),
    s = Zt(t),
    i = In(e, o),
    a = { scrollLeft: 0, scrollTop: 0 },
    l = { x: 0, y: 0 };
  return (
    (r || (!r && !n)) &&
      ((Ot(t) !== "body" || js(s)) && (a = W0(t)),
      at(t)
        ? ((l = In(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
        : s && (l.x = Hs(s))),
    {
      x: i.left + a.scrollLeft - l.x,
      y: i.top + a.scrollTop - l.y,
      width: i.width,
      height: i.height,
    }
  );
}
function Z0(e) {
  var t = new Map(),
    n = new Set(),
    r = [];
  e.forEach(function (s) {
    t.set(s.name, s);
  });
  function o(s) {
    n.add(s.name);
    var i = [].concat(s.requires || [], s.requiresIfExists || []);
    i.forEach(function (a) {
      if (!n.has(a)) {
        var l = t.get(a);
        l && o(l);
      }
    }),
      r.push(s);
  }
  return (
    e.forEach(function (s) {
      n.has(s.name) || o(s);
    }),
    r
  );
}
function Q0(e) {
  var t = Z0(e);
  return u0.reduce(function (n, r) {
    return n.concat(
      t.filter(function (o) {
        return o.phase === r;
      }),
    );
  }, []);
}
function G0(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (n) {
          Promise.resolve().then(function () {
            (t = void 0), n(e());
          });
        })),
      t
    );
  };
}
function J0(e) {
  var t = e.reduce(function (n, r) {
    var o = n[r.name];
    return (
      (n[r.name] = o
        ? Object.assign({}, o, r, {
            options: Object.assign({}, o.options, r.options),
            data: Object.assign({}, o.data, r.data),
          })
        : r),
      n
    );
  }, {});
  return Object.keys(t).map(function (n) {
    return t[n];
  });
}
var sa = { placement: "bottom", modifiers: [], strategy: "absolute" };
function ia() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Ds(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.defaultModifiers,
    r = n === void 0 ? [] : n,
    o = t.defaultOptions,
    s = o === void 0 ? sa : o;
  return function (i, a, l) {
    l === void 0 && (l = s);
    var c = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, sa, s),
        modifiersData: {},
        elements: { reference: i, popper: a },
        attributes: {},
        styles: {},
      },
      u = [],
      f = !1,
      d = {
        state: c,
        setOptions: function (g) {
          var y = typeof g == "function" ? g(c.options) : g;
          v(),
            (c.options = Object.assign({}, s, c.options, y)),
            (c.scrollParents = {
              reference: An(i)
                ? Jn(i)
                : i.contextElement
                ? Jn(i.contextElement)
                : [],
              popper: Jn(a),
            });
          var _ = Q0(J0([].concat(r, c.options.modifiers)));
          return (
            (c.orderedModifiers = _.filter(function (E) {
              return E.enabled;
            })),
            m(),
            d.update()
          );
        },
        forceUpdate: function () {
          if (!f) {
            var g = c.elements,
              y = g.reference,
              _ = g.popper;
            if (ia(y, _)) {
              (c.rects = {
                reference: q0(y, yr(_), c.options.strategy === "fixed"),
                popper: Ns(_),
              }),
                (c.reset = !1),
                (c.placement = c.options.placement),
                c.orderedModifiers.forEach(function (R) {
                  return (c.modifiersData[R.name] = Object.assign({}, R.data));
                });
              for (var E = 0; E < c.orderedModifiers.length; E++) {
                if (c.reset === !0) {
                  (c.reset = !1), (E = -1);
                  continue;
                }
                var $ = c.orderedModifiers[E],
                  w = $.fn,
                  H = $.options,
                  D = H === void 0 ? {} : H,
                  L = $.name;
                typeof w == "function" &&
                  (c = w({ state: c, options: D, name: L, instance: d }) || c);
              }
            }
          }
        },
        update: G0(function () {
          return new Promise(function (g) {
            d.forceUpdate(), g(c);
          });
        }),
        destroy: function () {
          v(), (f = !0);
        },
      };
    if (!ia(i, a)) return d;
    d.setOptions(l).then(function (g) {
      !f && l.onFirstUpdate && l.onFirstUpdate(g);
    });
    function m() {
      c.orderedModifiers.forEach(function (g) {
        var y = g.name,
          _ = g.options,
          E = _ === void 0 ? {} : _,
          $ = g.effect;
        if (typeof $ == "function") {
          var w = $({ state: c, name: y, instance: d, options: E }),
            H = function () {};
          u.push(w || H);
        }
      });
    }
    function v() {
      u.forEach(function (g) {
        return g();
      }),
        (u = []);
    }
    return d;
  };
}
Ds();
var Y0 = [fc, hc, uc, sc];
Ds({ defaultModifiers: Y0 });
var X0 = [fc, hc, uc, sc, H0, k0, K0, b0, N0],
  em = Ds({ defaultModifiers: X0 });
const tm = (e, t, n = {}) => {
  const r = {
      name: "updateState",
      enabled: !0,
      phase: "write",
      fn: ({ state: l }) => {
        const c = nm(l);
        Object.assign(i.value, c);
      },
      requires: ["computeStyles"],
    },
    o = U(() => {
      const {
        onFirstUpdate: l,
        placement: c,
        strategy: u,
        modifiers: f,
      } = O(n);
      return {
        onFirstUpdate: l,
        placement: c || "bottom",
        strategy: u || "absolute",
        modifiers: [...(f || []), r, { name: "applyStyles", enabled: !1 }],
      };
    }),
    s = _s(),
    i = te({
      styles: {
        popper: { position: O(o).strategy, left: "0", top: "0" },
        arrow: { position: "absolute" },
      },
      attributes: {},
    }),
    a = () => {
      s.value && (s.value.destroy(), (s.value = void 0));
    };
  return (
    he(
      o,
      (l) => {
        const c = O(s);
        c && c.setOptions(l);
      },
      { deep: !0 },
    ),
    he([e, t], ([l, c]) => {
      a(), !(!l || !c) && (s.value = em(l, c, O(o)));
    }),
    ut(() => {
      a();
    }),
    {
      state: U(() => {
        var l;
        return { ...(((l = O(s)) == null ? void 0 : l.state) || {}) };
      }),
      styles: U(() => O(i).styles),
      attributes: U(() => O(i).attributes),
      update: () => {
        var l;
        return (l = O(s)) == null ? void 0 : l.update();
      },
      forceUpdate: () => {
        var l;
        return (l = O(s)) == null ? void 0 : l.forceUpdate();
      },
      instanceRef: U(() => O(s)),
    }
  );
};
function nm(e) {
  const t = Object.keys(e.elements),
    n = Yo(t.map((o) => [o, e.styles[o] || {}])),
    r = Yo(t.map((o) => [o, e.attributes[o]]));
  return { styles: n, attributes: r };
}
function aa() {
  let e;
  const t = (r, o) => {
      n(), (e = window.setTimeout(r, o));
    },
    n = () => window.clearTimeout(e);
  return mo(() => n()), { registerTimeout: t, cancelTimeout: n };
}
const la = { prefix: Math.floor(Math.random() * 1e4), current: 0 },
  rm = Symbol("elIdInjection"),
  mc = () => (_t() ? Ce(rm, la) : la),
  om = (e) => {
    const t = mc(),
      n = Is();
    return U(() => O(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
  };
let vn = [];
const ca = (e) => {
    const t = e;
    t.key === Ve.esc && vn.forEach((n) => n(t));
  },
  sm = (e) => {
    rt(() => {
      vn.length === 0 && document.addEventListener("keydown", ca),
        gt && vn.push(e);
    }),
      ut(() => {
        (vn = vn.filter((t) => t !== e)),
          vn.length === 0 && gt && document.removeEventListener("keydown", ca);
      });
  };
let ua;
const gc = () => {
    const e = Is(),
      t = mc(),
      n = U(() => `${e.value}-popper-container-${t.prefix}`),
      r = U(() => `#${n.value}`);
    return { id: n, selector: r };
  },
  im = (e) => {
    const t = document.createElement("div");
    return (t.id = e), document.body.appendChild(t), t;
  },
  am = () => {
    const { id: e, selector: t } = gc();
    return (
      Ol(() => {
        gt &&
          !ua &&
          !document.body.querySelector(t.value) &&
          (ua = im(e.value));
      }),
      { id: e, selector: t }
    );
  },
  lm = ot({
    showAfter: { type: Number, default: 0 },
    hideAfter: { type: Number, default: 200 },
    autoClose: { type: Number, default: 0 },
  }),
  cm = ({ showAfter: e, hideAfter: t, autoClose: n, open: r, close: o }) => {
    const { registerTimeout: s } = aa(),
      { registerTimeout: i, cancelTimeout: a } = aa();
    return {
      onOpen: (u) => {
        s(() => {
          r(u);
          const f = O(n);
          fr(f) &&
            f > 0 &&
            i(() => {
              o(u);
            }, f);
        }, O(e));
      },
      onClose: (u) => {
        a(),
          s(() => {
            o(u);
          }, O(t));
      },
    };
  },
  vc = Symbol("elForwardRef"),
  um = (e) => {
    et(vc, {
      setForwardRef: (n) => {
        e.value = n;
      },
    });
  },
  fm = (e) => ({
    mounted(t) {
      e(t);
    },
    updated(t) {
      e(t);
    },
    unmounted() {
      e(null);
    },
  }),
  fa = te(0),
  dm = 2e3,
  pm = Symbol("zIndexContextKey"),
  hm = (e) => {
    const t = e || (_t() ? Ce(pm, void 0) : void 0),
      n = U(() => {
        const s = O(t);
        return fr(s) ? s : dm;
      }),
      r = U(() => n.value + fa.value);
    return {
      initialZIndex: n,
      currentZIndex: r,
      nextZIndex: () => (fa.value++, r.value),
    };
  };
var ke = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t) n[r] = o;
  return n;
};
const mm = ot({
    size: { type: be([Number, String]) },
    color: { type: String },
  }),
  gm = ie({ name: "ElIcon", inheritAttrs: !1 }),
  vm = ie({
    ...gm,
    props: mm,
    setup(e) {
      const t = e,
        n = Pe("icon"),
        r = U(() => {
          const { size: o, color: s } = t;
          return !o && !s
            ? {}
            : { fontSize: op(o) ? void 0 : lp(o), "--color": s };
        });
      return (o, s) => (
        oe(),
        _e(
          "i",
          fn({ class: O(n).b(), style: O(r) }, o.$attrs),
          [Te(o.$slots, "default")],
          16,
        )
      );
    },
  });
var _m = ke(vm, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue",
  ],
]);
const zs = _r(_m),
  o_ = Symbol("formContextKey"),
  da = Symbol("formItemContextKey"),
  Ks = Symbol("popper"),
  _c = Symbol("popperContent"),
  bm = [
    "dialog",
    "grid",
    "group",
    "listbox",
    "menu",
    "navigation",
    "tooltip",
    "tree",
  ],
  bc = ot({ role: { type: String, values: bm, default: "tooltip" } }),
  ym = ie({ name: "ElPopper", inheritAttrs: !1 }),
  wm = ie({
    ...ym,
    props: bc,
    setup(e, { expose: t }) {
      const n = e,
        r = te(),
        o = te(),
        s = te(),
        i = te(),
        a = U(() => n.role),
        l = {
          triggerRef: r,
          popperInstanceRef: o,
          contentRef: s,
          referenceRef: i,
          role: a,
        };
      return t(l), et(Ks, l), (c, u) => Te(c.$slots, "default");
    },
  });
var Em = ke(wm, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue",
  ],
]);
const yc = ot({ arrowOffset: { type: Number, default: 5 } }),
  xm = ie({ name: "ElPopperArrow", inheritAttrs: !1 }),
  Cm = ie({
    ...xm,
    props: yc,
    setup(e, { expose: t }) {
      const n = e,
        r = Pe("popper"),
        { arrowOffset: o, arrowRef: s, arrowStyle: i } = Ce(_c, void 0);
      return (
        he(
          () => n.arrowOffset,
          (a) => {
            o.value = a;
          },
        ),
        ut(() => {
          s.value = void 0;
        }),
        t({ arrowRef: s }),
        (a, l) => (
          oe(),
          _e(
            "span",
            {
              ref_key: "arrowRef",
              ref: s,
              class: Qe(O(r).e("arrow")),
              style: cn(O(i)),
              "data-popper-arrow": "",
            },
            null,
            6,
          )
        )
      );
    },
  });
var Tm = ke(Cm, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue",
  ],
]);
const Om = "ElOnlyChild",
  Mm = ie({
    name: Om,
    setup(e, { slots: t, attrs: n }) {
      var r;
      const o = Ce(vc),
        s = fm((r = o == null ? void 0 : o.setForwardRef) != null ? r : De);
      return () => {
        var i;
        const a = (i = t.default) == null ? void 0 : i.call(t, n);
        if (!a || a.length > 1) return null;
        const l = wc(a);
        return l ? Es($t(l, n), [[s]]) : null;
      };
    },
  });
function wc(e) {
  if (!e) return null;
  const t = e;
  for (const n of t) {
    if (me(n))
      switch (n.type) {
        case tt:
          continue;
        case gr:
        case "svg":
          return pa(n);
        case Fe:
          return wc(n.children);
        default:
          return n;
      }
    return pa(n);
  }
  return null;
}
function pa(e) {
  const t = Pe("only-child");
  return ae("span", { class: t.e("content") }, [e]);
}
const Ec = ot({
    virtualRef: { type: be(Object) },
    virtualTriggering: Boolean,
    onMouseenter: { type: be(Function) },
    onMouseleave: { type: be(Function) },
    onClick: { type: be(Function) },
    onKeydown: { type: be(Function) },
    onFocus: { type: be(Function) },
    onBlur: { type: be(Function) },
    onContextmenu: { type: be(Function) },
    id: String,
    open: Boolean,
  }),
  Pm = ie({ name: "ElPopperTrigger", inheritAttrs: !1 }),
  Sm = ie({
    ...Pm,
    props: Ec,
    setup(e, { expose: t }) {
      const n = e,
        { role: r, triggerRef: o } = Ce(Ks, void 0);
      um(o);
      const s = U(() => (a.value ? n.id : void 0)),
        i = U(() => {
          if (r && r.value === "tooltip") return n.open && n.id ? n.id : void 0;
        }),
        a = U(() => {
          if (r && r.value !== "tooltip") return r.value;
        }),
        l = U(() => (a.value ? `${n.open}` : void 0));
      let c;
      return (
        rt(() => {
          he(
            () => n.virtualRef,
            (u) => {
              u && (o.value = Kt(u));
            },
            { immediate: !0 },
          ),
            he(
              o,
              (u, f) => {
                c == null || c(),
                  (c = void 0),
                  Yr(u) &&
                    ([
                      "onMouseenter",
                      "onMouseleave",
                      "onClick",
                      "onKeydown",
                      "onFocus",
                      "onBlur",
                      "onContextmenu",
                    ].forEach((d) => {
                      var m;
                      const v = n[d];
                      v &&
                        (u.addEventListener(d.slice(2).toLowerCase(), v),
                        (m = f == null ? void 0 : f.removeEventListener) ==
                          null || m.call(f, d.slice(2).toLowerCase(), v));
                    }),
                    (c = he(
                      [s, i, a, l],
                      (d) => {
                        [
                          "aria-controls",
                          "aria-describedby",
                          "aria-haspopup",
                          "aria-expanded",
                        ].forEach((m, v) => {
                          ur(d[v])
                            ? u.removeAttribute(m)
                            : u.setAttribute(m, d[v]);
                        });
                      },
                      { immediate: !0 },
                    ))),
                  Yr(f) &&
                    [
                      "aria-controls",
                      "aria-describedby",
                      "aria-haspopup",
                      "aria-expanded",
                    ].forEach((d) => f.removeAttribute(d));
              },
              { immediate: !0 },
            );
        }),
        ut(() => {
          c == null || c(), (c = void 0);
        }),
        t({ triggerRef: o }),
        (u, f) =>
          u.virtualTriggering
            ? ar("v-if", !0)
            : (oe(),
              nt(
                O(Mm),
                fn({ key: 0 }, u.$attrs, {
                  "aria-controls": O(s),
                  "aria-describedby": O(i),
                  "aria-expanded": O(l),
                  "aria-haspopup": O(a),
                }),
                { default: we(() => [Te(u.$slots, "default")]), _: 3 },
                16,
                [
                  "aria-controls",
                  "aria-describedby",
                  "aria-expanded",
                  "aria-haspopup",
                ],
              ))
      );
    },
  });
var Am = ke(Sm, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue",
  ],
]);
const So = "focus-trap.focus-after-trapped",
  Ao = "focus-trap.focus-after-released",
  Rm = "focus-trap.focusout-prevented",
  ha = { cancelable: !0, bubbles: !1 },
  Im = { cancelable: !0, bubbles: !1 },
  ma = "focusAfterTrapped",
  ga = "focusAfterReleased",
  $m = Symbol("elFocusTrap"),
  Us = te(),
  _o = te(0),
  Ws = te(0);
let Rr = 0;
const xc = (e) => {
    const t = [],
      n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (r) => {
          const o = r.tagName === "INPUT" && r.type === "hidden";
          return r.disabled || r.hidden || o
            ? NodeFilter.FILTER_SKIP
            : r.tabIndex >= 0 || r === document.activeElement
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      });
    for (; n.nextNode(); ) t.push(n.currentNode);
    return t;
  },
  va = (e, t) => {
    for (const n of e) if (!km(n, t)) return n;
  },
  km = (e, t) => {
    if (getComputedStyle(e).visibility === "hidden") return !0;
    for (; e; ) {
      if (t && e === t) return !1;
      if (getComputedStyle(e).display === "none") return !0;
      e = e.parentElement;
    }
    return !1;
  },
  Fm = (e) => {
    const t = xc(e),
      n = va(t, e),
      r = va(t.reverse(), e);
    return [n, r];
  },
  Nm = (e) => e instanceof HTMLInputElement && "select" in e,
  jt = (e, t) => {
    if (e && e.focus) {
      const n = document.activeElement;
      e.focus({ preventScroll: !0 }),
        (Ws.value = window.performance.now()),
        e !== n && Nm(e) && t && e.select();
    }
  };
function _a(e, t) {
  const n = [...e],
    r = e.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
const Lm = () => {
    let e = [];
    return {
      push: (r) => {
        const o = e[0];
        o && r !== o && o.pause(), (e = _a(e, r)), e.unshift(r);
      },
      remove: (r) => {
        var o, s;
        (e = _a(e, r)),
          (s = (o = e[0]) == null ? void 0 : o.resume) == null || s.call(o);
      },
    };
  },
  Bm = (e, t = !1) => {
    const n = document.activeElement;
    for (const r of e) if ((jt(r, t), document.activeElement !== n)) return;
  },
  ba = Lm(),
  Hm = () => _o.value > Ws.value,
  Ir = () => {
    (Us.value = "pointer"), (_o.value = window.performance.now());
  },
  ya = () => {
    (Us.value = "keyboard"), (_o.value = window.performance.now());
  },
  jm = () => (
    rt(() => {
      Rr === 0 &&
        (document.addEventListener("mousedown", Ir),
        document.addEventListener("touchstart", Ir),
        document.addEventListener("keydown", ya)),
        Rr++;
    }),
    ut(() => {
      Rr--,
        Rr <= 0 &&
          (document.removeEventListener("mousedown", Ir),
          document.removeEventListener("touchstart", Ir),
          document.removeEventListener("keydown", ya));
    }),
    {
      focusReason: Us,
      lastUserFocusTimestamp: _o,
      lastAutomatedFocusTimestamp: Ws,
    }
  ),
  $r = (e) => new CustomEvent(Rm, { ...Im, detail: e }),
  Dm = ie({
    name: "ElFocusTrap",
    inheritAttrs: !1,
    props: {
      loop: Boolean,
      trapped: Boolean,
      focusTrapEl: Object,
      focusStartEl: { type: [Object, String], default: "first" },
    },
    emits: [
      ma,
      ga,
      "focusin",
      "focusout",
      "focusout-prevented",
      "release-requested",
    ],
    setup(e, { emit: t }) {
      const n = te();
      let r, o;
      const { focusReason: s } = jm();
      sm((v) => {
        e.trapped && !i.paused && t("release-requested", v);
      });
      const i = {
          paused: !1,
          pause() {
            this.paused = !0;
          },
          resume() {
            this.paused = !1;
          },
        },
        a = (v) => {
          if ((!e.loop && !e.trapped) || i.paused) return;
          const {
              key: g,
              altKey: y,
              ctrlKey: _,
              metaKey: E,
              currentTarget: $,
              shiftKey: w,
            } = v,
            { loop: H } = e,
            D = g === Ve.tab && !y && !_ && !E,
            L = document.activeElement;
          if (D && L) {
            const R = $,
              [q, W] = Fm(R);
            if (q && W) {
              if (!w && L === W) {
                const x = $r({ focusReason: s.value });
                t("focusout-prevented", x),
                  x.defaultPrevented || (v.preventDefault(), H && jt(q, !0));
              } else if (w && [q, R].includes(L)) {
                const x = $r({ focusReason: s.value });
                t("focusout-prevented", x),
                  x.defaultPrevented || (v.preventDefault(), H && jt(W, !0));
              }
            } else if (L === R) {
              const x = $r({ focusReason: s.value });
              t("focusout-prevented", x),
                x.defaultPrevented || v.preventDefault();
            }
          }
        };
      et($m, { focusTrapRef: n, onKeydown: a }),
        he(
          () => e.focusTrapEl,
          (v) => {
            v && (n.value = v);
          },
          { immediate: !0 },
        ),
        he([n], ([v], [g]) => {
          v &&
            (v.addEventListener("keydown", a),
            v.addEventListener("focusin", u),
            v.addEventListener("focusout", f)),
            g &&
              (g.removeEventListener("keydown", a),
              g.removeEventListener("focusin", u),
              g.removeEventListener("focusout", f));
        });
      const l = (v) => {
          t(ma, v);
        },
        c = (v) => t(ga, v),
        u = (v) => {
          const g = O(n);
          if (!g) return;
          const y = v.target,
            _ = v.relatedTarget,
            E = y && g.contains(y);
          e.trapped || (_ && g.contains(_)) || (r = _),
            E && t("focusin", v),
            !i.paused && e.trapped && (E ? (o = y) : jt(o, !0));
        },
        f = (v) => {
          const g = O(n);
          if (!(i.paused || !g))
            if (e.trapped) {
              const y = v.relatedTarget;
              !ur(y) &&
                !g.contains(y) &&
                setTimeout(() => {
                  if (!i.paused && e.trapped) {
                    const _ = $r({ focusReason: s.value });
                    t("focusout-prevented", _), _.defaultPrevented || jt(o, !0);
                  }
                }, 0);
            } else {
              const y = v.target;
              (y && g.contains(y)) || t("focusout", v);
            }
        };
      async function d() {
        await On();
        const v = O(n);
        if (v) {
          ba.push(i);
          const g = v.contains(document.activeElement)
            ? r
            : document.activeElement;
          if (((r = g), !v.contains(g))) {
            const _ = new Event(So, ha);
            v.addEventListener(So, l),
              v.dispatchEvent(_),
              _.defaultPrevented ||
                On(() => {
                  let E = e.focusStartEl;
                  pe(E) ||
                    (jt(E), document.activeElement !== E && (E = "first")),
                    E === "first" && Bm(xc(v), !0),
                    (document.activeElement === g || E === "container") &&
                      jt(v);
                });
          }
        }
      }
      function m() {
        const v = O(n);
        if (v) {
          v.removeEventListener(So, l);
          const g = new CustomEvent(Ao, {
            ...ha,
            detail: { focusReason: s.value },
          });
          v.addEventListener(Ao, c),
            v.dispatchEvent(g),
            !g.defaultPrevented &&
              (s.value == "keyboard" ||
                !Hm() ||
                v.contains(document.activeElement)) &&
              jt(r ?? document.body),
            v.removeEventListener(Ao, c),
            ba.remove(i);
        }
      }
      return (
        rt(() => {
          e.trapped && d(),
            he(
              () => e.trapped,
              (v) => {
                v ? d() : m();
              },
            );
        }),
        ut(() => {
          e.trapped && m();
        }),
        { onKeydown: a }
      );
    },
  });
function zm(e, t, n, r, o, s) {
  return Te(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var Km = ke(Dm, [
  ["render", zm],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue",
  ],
]);
const Um = ["fixed", "absolute"],
  Wm = ot({
    boundariesPadding: { type: Number, default: 0 },
    fallbackPlacements: { type: be(Array), default: void 0 },
    gpuAcceleration: { type: Boolean, default: !0 },
    offset: { type: Number, default: 12 },
    placement: { type: String, values: ks, default: "bottom" },
    popperOptions: { type: be(Object), default: () => ({}) },
    strategy: { type: String, values: Um, default: "absolute" },
  }),
  Cc = ot({
    ...Wm,
    id: String,
    style: { type: be([String, Array, Object]) },
    className: { type: be([String, Array, Object]) },
    effect: { type: String, default: "dark" },
    visible: Boolean,
    enterable: { type: Boolean, default: !0 },
    pure: Boolean,
    focusOnShow: { type: Boolean, default: !1 },
    trapping: { type: Boolean, default: !1 },
    popperClass: { type: be([String, Array, Object]) },
    popperStyle: { type: be([String, Array, Object]) },
    referenceEl: { type: be(Object) },
    triggerTargetEl: { type: be(Object) },
    stopPopperMouseEvent: { type: Boolean, default: !0 },
    ariaLabel: { type: String, default: void 0 },
    virtualTriggering: Boolean,
    zIndex: Number,
  }),
  Vm = {
    mouseenter: (e) => e instanceof MouseEvent,
    mouseleave: (e) => e instanceof MouseEvent,
    focus: () => !0,
    blur: () => !0,
    close: () => !0,
  },
  qm = (e, t = []) => {
    const { placement: n, strategy: r, popperOptions: o } = e,
      s = { placement: n, strategy: r, ...o, modifiers: [...Qm(e), ...t] };
    return Gm(s, o == null ? void 0 : o.modifiers), s;
  },
  Zm = (e) => {
    if (gt) return Kt(e);
  };
function Qm(e) {
  const { offset: t, gpuAcceleration: n, fallbackPlacements: r } = e;
  return [
    { name: "offset", options: { offset: [0, t ?? 12] } },
    {
      name: "preventOverflow",
      options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
    },
    { name: "flip", options: { padding: 5, fallbackPlacements: r } },
    { name: "computeStyles", options: { gpuAcceleration: n } },
  ];
}
function Gm(e, t) {
  t && (e.modifiers = [...e.modifiers, ...(t ?? [])]);
}
const Jm = 0,
  Ym = (e) => {
    const {
        popperInstanceRef: t,
        contentRef: n,
        triggerRef: r,
        role: o,
      } = Ce(Ks, void 0),
      s = te(),
      i = te(),
      a = U(() => ({ name: "eventListeners", enabled: !!e.visible })),
      l = U(() => {
        var _;
        const E = O(s),
          $ = (_ = O(i)) != null ? _ : Jm;
        return {
          name: "arrow",
          enabled: !rp(E),
          options: { element: E, padding: $ },
        };
      }),
      c = U(() => ({
        onFirstUpdate: () => {
          v();
        },
        ...qm(e, [O(l), O(a)]),
      })),
      u = U(() => Zm(e.referenceEl) || O(r)),
      {
        attributes: f,
        state: d,
        styles: m,
        update: v,
        forceUpdate: g,
        instanceRef: y,
      } = tm(u, n, c);
    return (
      he(y, (_) => (t.value = _)),
      rt(() => {
        he(
          () => {
            var _;
            return (_ = O(u)) == null ? void 0 : _.getBoundingClientRect();
          },
          () => {
            v();
          },
        );
      }),
      {
        attributes: f,
        arrowRef: s,
        contentRef: n,
        instanceRef: y,
        state: d,
        styles: m,
        role: o,
        forceUpdate: g,
        update: v,
      }
    );
  },
  Xm = (e, { attributes: t, styles: n, role: r }) => {
    const { nextZIndex: o } = hm(),
      s = Pe("popper"),
      i = U(() => O(t).popper),
      a = te(fr(e.zIndex) ? e.zIndex : o()),
      l = U(() => [s.b(), s.is("pure", e.pure), s.is(e.effect), e.popperClass]),
      c = U(() => [{ zIndex: O(a) }, O(n).popper, e.popperStyle || {}]),
      u = U(() => (r.value === "dialog" ? "false" : void 0)),
      f = U(() => O(n).arrow || {});
    return {
      ariaModal: u,
      arrowStyle: f,
      contentAttrs: i,
      contentClass: l,
      contentStyle: c,
      contentZIndex: a,
      updateZIndex: () => {
        a.value = fr(e.zIndex) ? e.zIndex : o();
      },
    };
  },
  eg = (e, t) => {
    const n = te(!1),
      r = te();
    return {
      focusStartRef: r,
      trapped: n,
      onFocusAfterReleased: (c) => {
        var u;
        ((u = c.detail) == null ? void 0 : u.focusReason) !== "pointer" &&
          ((r.value = "first"), t("blur"));
      },
      onFocusAfterTrapped: () => {
        t("focus");
      },
      onFocusInTrap: (c) => {
        e.visible &&
          !n.value &&
          (c.target && (r.value = c.target), (n.value = !0));
      },
      onFocusoutPrevented: (c) => {
        e.trapping ||
          (c.detail.focusReason === "pointer" && c.preventDefault(),
          (n.value = !1));
      },
      onReleaseRequested: () => {
        (n.value = !1), t("close");
      },
    };
  },
  tg = ie({ name: "ElPopperContent" }),
  ng = ie({
    ...tg,
    props: Cc,
    emits: Vm,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        {
          focusStartRef: o,
          trapped: s,
          onFocusAfterReleased: i,
          onFocusAfterTrapped: a,
          onFocusInTrap: l,
          onFocusoutPrevented: c,
          onReleaseRequested: u,
        } = eg(r, n),
        {
          attributes: f,
          arrowRef: d,
          contentRef: m,
          styles: v,
          instanceRef: g,
          role: y,
          update: _,
        } = Ym(r),
        {
          ariaModal: E,
          arrowStyle: $,
          contentAttrs: w,
          contentClass: H,
          contentStyle: D,
          updateZIndex: L,
        } = Xm(r, { styles: v, attributes: f, role: y }),
        R = Ce(da, void 0),
        q = te();
      et(_c, { arrowStyle: $, arrowRef: d, arrowOffset: q }),
        R &&
          (R.addInputId || R.removeInputId) &&
          et(da, { ...R, addInputId: De, removeInputId: De });
      let W;
      const I = (k = !0) => {
          _(), k && L();
        },
        x = () => {
          I(!1),
            r.visible && r.focusOnShow
              ? (s.value = !0)
              : r.visible === !1 && (s.value = !1);
        };
      return (
        rt(() => {
          he(
            () => r.triggerTargetEl,
            (k, X) => {
              W == null || W(), (W = void 0);
              const ne = O(k || m.value),
                j = O(X || m.value);
              Yr(ne) &&
                (W = he(
                  [y, () => r.ariaLabel, E, () => r.id],
                  (P) => {
                    ["role", "aria-label", "aria-modal", "id"].forEach(
                      (V, ce) => {
                        ur(P[ce])
                          ? ne.removeAttribute(V)
                          : ne.setAttribute(V, P[ce]);
                      },
                    );
                  },
                  { immediate: !0 },
                )),
                j !== ne &&
                  Yr(j) &&
                  ["role", "aria-label", "aria-modal", "id"].forEach((P) => {
                    j.removeAttribute(P);
                  });
            },
            { immediate: !0 },
          ),
            he(() => r.visible, x, { immediate: !0 });
        }),
        ut(() => {
          W == null || W(), (W = void 0);
        }),
        t({
          popperContentRef: m,
          popperInstanceRef: g,
          updatePopper: I,
          contentStyle: D,
        }),
        (k, X) => (
          oe(),
          _e(
            "div",
            fn({ ref_key: "contentRef", ref: m }, O(w), {
              style: O(D),
              class: O(H),
              tabindex: "-1",
              onMouseenter: X[0] || (X[0] = (ne) => k.$emit("mouseenter", ne)),
              onMouseleave: X[1] || (X[1] = (ne) => k.$emit("mouseleave", ne)),
            }),
            [
              ae(
                O(Km),
                {
                  trapped: O(s),
                  "trap-on-focus-in": !0,
                  "focus-trap-el": O(m),
                  "focus-start-el": O(o),
                  onFocusAfterTrapped: O(a),
                  onFocusAfterReleased: O(i),
                  onFocusin: O(l),
                  onFocusoutPrevented: O(c),
                  onReleaseRequested: O(u),
                },
                { default: we(() => [Te(k.$slots, "default")]), _: 3 },
                8,
                [
                  "trapped",
                  "focus-trap-el",
                  "focus-start-el",
                  "onFocusAfterTrapped",
                  "onFocusAfterReleased",
                  "onFocusin",
                  "onFocusoutPrevented",
                  "onReleaseRequested",
                ],
              ),
            ],
            16,
          )
        )
      );
    },
  });
var rg = ke(ng, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue",
  ],
]);
const og = _r(Em),
  Vs = Symbol("elTooltip"),
  Tc = ot({
    ...lm,
    ...Cc,
    appendTo: { type: be([String, Object]) },
    content: { type: String, default: "" },
    rawContent: { type: Boolean, default: !1 },
    persistent: Boolean,
    ariaLabel: String,
    visible: { type: be(Boolean), default: null },
    transition: String,
    teleported: { type: Boolean, default: !0 },
    disabled: Boolean,
  }),
  Oc = ot({
    ...Ec,
    disabled: Boolean,
    trigger: { type: be([String, Array]), default: "hover" },
    triggerKeys: { type: be(Array), default: () => [Ve.enter, Ve.space] },
  }),
  {
    useModelToggleProps: sg,
    useModelToggleEmits: ig,
    useModelToggle: ag,
  } = rc("visible"),
  lg = ot({
    ...bc,
    ...sg,
    ...Tc,
    ...Oc,
    ...yc,
    showArrow: { type: Boolean, default: !0 },
  }),
  cg = [...ig, "before-show", "before-hide", "show", "hide", "open", "close"],
  ug = (e, t) => (Y(e) ? e.includes(t) : e === t),
  mn = (e, t, n) => (r) => {
    ug(O(e), t) && n(r);
  },
  fg = ie({ name: "ElTooltipTrigger" }),
  dg = ie({
    ...fg,
    props: Oc,
    setup(e, { expose: t }) {
      const n = e,
        r = Pe("tooltip"),
        {
          controlled: o,
          id: s,
          open: i,
          onOpen: a,
          onClose: l,
          onToggle: c,
        } = Ce(Vs, void 0),
        u = te(null),
        f = () => {
          if (O(o) || n.disabled) return !0;
        },
        d = bn(n, "trigger"),
        m = Rt(f, mn(d, "hover", a)),
        v = Rt(f, mn(d, "hover", l)),
        g = Rt(
          f,
          mn(d, "click", (w) => {
            w.button === 0 && c(w);
          }),
        ),
        y = Rt(f, mn(d, "focus", a)),
        _ = Rt(f, mn(d, "focus", l)),
        E = Rt(
          f,
          mn(d, "contextmenu", (w) => {
            w.preventDefault(), c(w);
          }),
        ),
        $ = Rt(f, (w) => {
          const { code: H } = w;
          n.triggerKeys.includes(H) && (w.preventDefault(), c(w));
        });
      return (
        t({ triggerRef: u }),
        (w, H) => (
          oe(),
          nt(
            O(Am),
            {
              id: O(s),
              "virtual-ref": w.virtualRef,
              open: O(i),
              "virtual-triggering": w.virtualTriggering,
              class: Qe(O(r).e("trigger")),
              onBlur: O(_),
              onClick: O(g),
              onContextmenu: O(E),
              onFocus: O(y),
              onMouseenter: O(m),
              onMouseleave: O(v),
              onKeydown: O($),
            },
            { default: we(() => [Te(w.$slots, "default")]), _: 3 },
            8,
            [
              "id",
              "virtual-ref",
              "open",
              "virtual-triggering",
              "class",
              "onBlur",
              "onClick",
              "onContextmenu",
              "onFocus",
              "onMouseenter",
              "onMouseleave",
              "onKeydown",
            ],
          )
        )
      );
    },
  });
var pg = ke(dg, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue",
  ],
]);
const hg = ie({ name: "ElTooltipContent", inheritAttrs: !1 }),
  mg = ie({
    ...hg,
    props: Tc,
    setup(e, { expose: t }) {
      const n = e,
        { selector: r } = gc(),
        o = Pe("tooltip"),
        s = te(null),
        i = te(!1),
        {
          controlled: a,
          id: l,
          open: c,
          trigger: u,
          onClose: f,
          onOpen: d,
          onShow: m,
          onHide: v,
          onBeforeShow: g,
          onBeforeHide: y,
        } = Ce(Vs, void 0),
        _ = U(() => n.transition || `${o.namespace.value}-fade-in-linear`),
        E = U(() => n.persistent);
      ut(() => {
        i.value = !0;
      });
      const $ = U(() => (O(E) ? !0 : O(c))),
        w = U(() => (n.disabled ? !1 : O(c))),
        H = U(() => n.appendTo || r.value),
        D = U(() => {
          var P;
          return (P = n.style) != null ? P : {};
        }),
        L = U(() => !O(c)),
        R = () => {
          v();
        },
        q = () => {
          if (O(a)) return !0;
        },
        W = Rt(q, () => {
          n.enterable && O(u) === "hover" && d();
        }),
        I = Rt(q, () => {
          O(u) === "hover" && f();
        }),
        x = () => {
          var P, V;
          (V = (P = s.value) == null ? void 0 : P.updatePopper) == null ||
            V.call(P),
            g == null || g();
        },
        k = () => {
          y == null || y();
        },
        X = () => {
          m(),
            (j = Vd(
              U(() => {
                var P;
                return (P = s.value) == null ? void 0 : P.popperContentRef;
              }),
              () => {
                if (O(a)) return;
                O(u) !== "hover" && f();
              },
            ));
        },
        ne = () => {
          n.virtualTriggering || f();
        };
      let j;
      return (
        he(
          () => O(c),
          (P) => {
            P || j == null || j();
          },
          { flush: "post" },
        ),
        he(
          () => n.content,
          () => {
            var P, V;
            (V = (P = s.value) == null ? void 0 : P.updatePopper) == null ||
              V.call(P);
          },
        ),
        t({ contentRef: s }),
        (P, V) => (
          oe(),
          nt(
            Lf,
            { disabled: !P.teleported, to: O(H) },
            [
              ae(
                vr,
                {
                  name: O(_),
                  onAfterLeave: R,
                  onBeforeEnter: x,
                  onAfterEnter: X,
                  onBeforeLeave: k,
                },
                {
                  default: we(() => [
                    O($)
                      ? Es(
                          (oe(),
                          nt(
                            O(rg),
                            fn(
                              {
                                key: 0,
                                id: O(l),
                                ref_key: "contentRef",
                                ref: s,
                              },
                              P.$attrs,
                              {
                                "aria-label": P.ariaLabel,
                                "aria-hidden": O(L),
                                "boundaries-padding": P.boundariesPadding,
                                "fallback-placements": P.fallbackPlacements,
                                "gpu-acceleration": P.gpuAcceleration,
                                offset: P.offset,
                                placement: P.placement,
                                "popper-options": P.popperOptions,
                                strategy: P.strategy,
                                effect: P.effect,
                                enterable: P.enterable,
                                pure: P.pure,
                                "popper-class": P.popperClass,
                                "popper-style": [P.popperStyle, O(D)],
                                "reference-el": P.referenceEl,
                                "trigger-target-el": P.triggerTargetEl,
                                visible: O(w),
                                "z-index": P.zIndex,
                                onMouseenter: O(W),
                                onMouseleave: O(I),
                                onBlur: ne,
                                onClose: O(f),
                              },
                            ),
                            {
                              default: we(() => [
                                i.value
                                  ? ar("v-if", !0)
                                  : Te(P.$slots, "default", { key: 0 }),
                              ]),
                              _: 3,
                            },
                            16,
                            [
                              "id",
                              "aria-label",
                              "aria-hidden",
                              "boundaries-padding",
                              "fallback-placements",
                              "gpu-acceleration",
                              "offset",
                              "placement",
                              "popper-options",
                              "strategy",
                              "effect",
                              "enterable",
                              "pure",
                              "popper-class",
                              "popper-style",
                              "reference-el",
                              "trigger-target-el",
                              "visible",
                              "z-index",
                              "onMouseenter",
                              "onMouseleave",
                              "onClose",
                            ],
                          )),
                          [[Xl, O(w)]],
                        )
                      : ar("v-if", !0),
                  ]),
                  _: 3,
                },
                8,
                ["name"],
              ),
            ],
            8,
            ["disabled", "to"],
          )
        )
      );
    },
  });
var gg = ke(mg, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue",
  ],
]);
const vg = ["innerHTML"],
  _g = { key: 1 },
  bg = ie({ name: "ElTooltip" }),
  yg = ie({
    ...bg,
    props: lg,
    emits: cg,
    setup(e, { expose: t, emit: n }) {
      const r = e;
      am();
      const o = om(),
        s = te(),
        i = te(),
        a = () => {
          var _;
          const E = O(s);
          E && ((_ = E.popperInstanceRef) == null || _.update());
        },
        l = te(!1),
        c = te(),
        {
          show: u,
          hide: f,
          hasUpdateHandler: d,
        } = ag({ indicator: l, toggleReason: c }),
        { onOpen: m, onClose: v } = cm({
          showAfter: bn(r, "showAfter"),
          hideAfter: bn(r, "hideAfter"),
          autoClose: bn(r, "autoClose"),
          open: u,
          close: f,
        }),
        g = U(() => ec(r.visible) && !d.value);
      et(Vs, {
        controlled: g,
        id: o,
        open: mr(l),
        trigger: bn(r, "trigger"),
        onOpen: (_) => {
          m(_);
        },
        onClose: (_) => {
          v(_);
        },
        onToggle: (_) => {
          O(l) ? v(_) : m(_);
        },
        onShow: () => {
          n("show", c.value);
        },
        onHide: () => {
          n("hide", c.value);
        },
        onBeforeShow: () => {
          n("before-show", c.value);
        },
        onBeforeHide: () => {
          n("before-hide", c.value);
        },
        updatePopper: a,
      }),
        he(
          () => r.disabled,
          (_) => {
            _ && l.value && (l.value = !1);
          },
        );
      const y = (_) => {
        var E, $;
        const w =
            ($ = (E = i.value) == null ? void 0 : E.contentRef) == null
              ? void 0
              : $.popperContentRef,
          H = (_ == null ? void 0 : _.relatedTarget) || document.activeElement;
        return w && w.contains(H);
      };
      return (
        Cl(() => l.value && f()),
        t({
          popperRef: s,
          contentRef: i,
          isFocusInsideContent: y,
          updatePopper: a,
          onOpen: m,
          onClose: v,
          hide: f,
        }),
        (_, E) => (
          oe(),
          nt(
            O(og),
            { ref_key: "popperRef", ref: s, role: _.role },
            {
              default: we(() => [
                ae(
                  pg,
                  {
                    disabled: _.disabled,
                    trigger: _.trigger,
                    "trigger-keys": _.triggerKeys,
                    "virtual-ref": _.virtualRef,
                    "virtual-triggering": _.virtualTriggering,
                  },
                  {
                    default: we(() => [
                      _.$slots.default
                        ? Te(_.$slots, "default", { key: 0 })
                        : ar("v-if", !0),
                    ]),
                    _: 3,
                  },
                  8,
                  [
                    "disabled",
                    "trigger",
                    "trigger-keys",
                    "virtual-ref",
                    "virtual-triggering",
                  ],
                ),
                ae(
                  gg,
                  {
                    ref_key: "contentRef",
                    ref: i,
                    "aria-label": _.ariaLabel,
                    "boundaries-padding": _.boundariesPadding,
                    content: _.content,
                    disabled: _.disabled,
                    effect: _.effect,
                    enterable: _.enterable,
                    "fallback-placements": _.fallbackPlacements,
                    "hide-after": _.hideAfter,
                    "gpu-acceleration": _.gpuAcceleration,
                    offset: _.offset,
                    persistent: _.persistent,
                    "popper-class": _.popperClass,
                    "popper-style": _.popperStyle,
                    placement: _.placement,
                    "popper-options": _.popperOptions,
                    pure: _.pure,
                    "raw-content": _.rawContent,
                    "reference-el": _.referenceEl,
                    "trigger-target-el": _.triggerTargetEl,
                    "show-after": _.showAfter,
                    strategy: _.strategy,
                    teleported: _.teleported,
                    transition: _.transition,
                    "virtual-triggering": _.virtualTriggering,
                    "z-index": _.zIndex,
                    "append-to": _.appendTo,
                  },
                  {
                    default: we(() => [
                      Te(_.$slots, "content", {}, () => [
                        _.rawContent
                          ? (oe(),
                            _e(
                              "span",
                              { key: 0, innerHTML: _.content },
                              null,
                              8,
                              vg,
                            ))
                          : (oe(), _e("span", _g, Za(_.content), 1)),
                      ]),
                      _.showArrow
                        ? (oe(),
                          nt(
                            O(Tm),
                            { key: 0, "arrow-offset": _.arrowOffset },
                            null,
                            8,
                            ["arrow-offset"],
                          ))
                        : ar("v-if", !0),
                    ]),
                    _: 3,
                  },
                  8,
                  [
                    "aria-label",
                    "boundaries-padding",
                    "content",
                    "disabled",
                    "effect",
                    "enterable",
                    "fallback-placements",
                    "hide-after",
                    "gpu-acceleration",
                    "offset",
                    "persistent",
                    "popper-class",
                    "popper-style",
                    "placement",
                    "popper-options",
                    "pure",
                    "raw-content",
                    "reference-el",
                    "trigger-target-el",
                    "show-after",
                    "strategy",
                    "teleported",
                    "transition",
                    "virtual-triggering",
                    "z-index",
                    "append-to",
                  ],
                ),
              ]),
              _: 3,
            },
            8,
            ["role"],
          )
        )
      );
    },
  });
var wg = ke(yg, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue",
  ],
]);
const Mc = _r(wg);
function Le(e, t) {
  Eg(e) && (e = "100%");
  var n = xg(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function kr(e) {
  return Math.min(1, Math.max(0, e));
}
function Eg(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function xg(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function Pc(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function Fr(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function rn(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function Cg(e, t, n) {
  return { r: Le(e, 255) * 255, g: Le(t, 255) * 255, b: Le(n, 255) * 255 };
}
function wa(e, t, n) {
  (e = Le(e, 255)), (t = Le(t, 255)), (n = Le(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    s = 0,
    i = 0,
    a = (r + o) / 2;
  if (r === o) (i = 0), (s = 0);
  else {
    var l = r - o;
    switch (((i = a > 0.5 ? l / (2 - r - o) : l / (r + o)), r)) {
      case e:
        s = (t - n) / l + (t < n ? 6 : 0);
        break;
      case t:
        s = (n - e) / l + 2;
        break;
      case n:
        s = (e - t) / l + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: i, l: a };
}
function Ro(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * (6 * n)
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function Tg(e, t, n) {
  var r, o, s;
  if (((e = Le(e, 360)), (t = Le(t, 100)), (n = Le(n, 100)), t === 0))
    (o = n), (s = n), (r = n);
  else {
    var i = n < 0.5 ? n * (1 + t) : n + t - n * t,
      a = 2 * n - i;
    (r = Ro(a, i, e + 1 / 3)), (o = Ro(a, i, e)), (s = Ro(a, i, e - 1 / 3));
  }
  return { r: r * 255, g: o * 255, b: s * 255 };
}
function Ea(e, t, n) {
  (e = Le(e, 255)), (t = Le(t, 255)), (n = Le(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    s = 0,
    i = r,
    a = r - o,
    l = r === 0 ? 0 : a / r;
  if (r === o) s = 0;
  else {
    switch (r) {
      case e:
        s = (t - n) / a + (t < n ? 6 : 0);
        break;
      case t:
        s = (n - e) / a + 2;
        break;
      case n:
        s = (e - t) / a + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: l, v: i };
}
function Og(e, t, n) {
  (e = Le(e, 360) * 6), (t = Le(t, 100)), (n = Le(n, 100));
  var r = Math.floor(e),
    o = e - r,
    s = n * (1 - t),
    i = n * (1 - o * t),
    a = n * (1 - (1 - o) * t),
    l = r % 6,
    c = [n, i, s, s, a, n][l],
    u = [a, n, n, i, s, s][l],
    f = [s, s, a, n, n, i][l];
  return { r: c * 255, g: u * 255, b: f * 255 };
}
function xa(e, t, n, r) {
  var o = [
    rn(Math.round(e).toString(16)),
    rn(Math.round(t).toString(16)),
    rn(Math.round(n).toString(16)),
  ];
  return r &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0)
    : o.join("");
}
function Mg(e, t, n, r, o) {
  var s = [
    rn(Math.round(e).toString(16)),
    rn(Math.round(t).toString(16)),
    rn(Math.round(n).toString(16)),
    rn(Pg(r)),
  ];
  return o &&
    s[0].startsWith(s[0].charAt(1)) &&
    s[1].startsWith(s[1].charAt(1)) &&
    s[2].startsWith(s[2].charAt(1)) &&
    s[3].startsWith(s[3].charAt(1))
    ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0)
    : s.join("");
}
function Pg(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Ca(e) {
  return Ye(e) / 255;
}
function Ye(e) {
  return parseInt(e, 16);
}
function Sg(e) {
  return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
}
var es = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};
function Ag(e) {
  var t = { r: 0, g: 0, b: 0 },
    n = 1,
    r = null,
    o = null,
    s = null,
    i = !1,
    a = !1;
  return (
    typeof e == "string" && (e = $g(e)),
    typeof e == "object" &&
      (Mt(e.r) && Mt(e.g) && Mt(e.b)
        ? ((t = Cg(e.r, e.g, e.b)),
          (i = !0),
          (a = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
        : Mt(e.h) && Mt(e.s) && Mt(e.v)
        ? ((r = Fr(e.s)),
          (o = Fr(e.v)),
          (t = Og(e.h, r, o)),
          (i = !0),
          (a = "hsv"))
        : Mt(e.h) &&
          Mt(e.s) &&
          Mt(e.l) &&
          ((r = Fr(e.s)),
          (s = Fr(e.l)),
          (t = Tg(e.h, r, s)),
          (i = !0),
          (a = "hsl")),
      Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)),
    (n = Pc(n)),
    {
      ok: i,
      format: e.format || a,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: n,
    }
  );
}
var Rg = "[-\\+]?\\d+%?",
  Ig = "[-\\+]?\\d*\\.\\d+%?",
  Ut = "(?:".concat(Ig, ")|(?:").concat(Rg, ")"),
  Io = "[\\s|\\(]+("
    .concat(Ut, ")[,|\\s]+(")
    .concat(Ut, ")[,|\\s]+(")
    .concat(Ut, ")\\s*\\)?"),
  $o = "[\\s|\\(]+("
    .concat(Ut, ")[,|\\s]+(")
    .concat(Ut, ")[,|\\s]+(")
    .concat(Ut, ")[,|\\s]+(")
    .concat(Ut, ")\\s*\\)?"),
  pt = {
    CSS_UNIT: new RegExp(Ut),
    rgb: new RegExp("rgb" + Io),
    rgba: new RegExp("rgba" + $o),
    hsl: new RegExp("hsl" + Io),
    hsla: new RegExp("hsla" + $o),
    hsv: new RegExp("hsv" + Io),
    hsva: new RegExp("hsva" + $o),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function $g(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  var t = !1;
  if (es[e]) (e = es[e]), (t = !0);
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = pt.rgb.exec(e);
  return n
    ? { r: n[1], g: n[2], b: n[3] }
    : ((n = pt.rgba.exec(e)),
      n
        ? { r: n[1], g: n[2], b: n[3], a: n[4] }
        : ((n = pt.hsl.exec(e)),
          n
            ? { h: n[1], s: n[2], l: n[3] }
            : ((n = pt.hsla.exec(e)),
              n
                ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                : ((n = pt.hsv.exec(e)),
                  n
                    ? { h: n[1], s: n[2], v: n[3] }
                    : ((n = pt.hsva.exec(e)),
                      n
                        ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                        : ((n = pt.hex8.exec(e)),
                          n
                            ? {
                                r: Ye(n[1]),
                                g: Ye(n[2]),
                                b: Ye(n[3]),
                                a: Ca(n[4]),
                                format: t ? "name" : "hex8",
                              }
                            : ((n = pt.hex6.exec(e)),
                              n
                                ? {
                                    r: Ye(n[1]),
                                    g: Ye(n[2]),
                                    b: Ye(n[3]),
                                    format: t ? "name" : "hex",
                                  }
                                : ((n = pt.hex4.exec(e)),
                                  n
                                    ? {
                                        r: Ye(n[1] + n[1]),
                                        g: Ye(n[2] + n[2]),
                                        b: Ye(n[3] + n[3]),
                                        a: Ca(n[4] + n[4]),
                                        format: t ? "name" : "hex8",
                                      }
                                    : ((n = pt.hex3.exec(e)),
                                      n
                                        ? {
                                            r: Ye(n[1] + n[1]),
                                            g: Ye(n[2] + n[2]),
                                            b: Ye(n[3] + n[3]),
                                            format: t ? "name" : "hex",
                                          }
                                        : !1)))))))));
}
function Mt(e) {
  return !!pt.CSS_UNIT.exec(String(e));
}
var kg = (function () {
  function e(t, n) {
    t === void 0 && (t = ""), n === void 0 && (n = {});
    var r;
    if (t instanceof e) return t;
    typeof t == "number" && (t = Sg(t)), (this.originalInput = t);
    var o = Ag(t);
    (this.originalInput = t),
      (this.r = o.r),
      (this.g = o.g),
      (this.b = o.b),
      (this.a = o.a),
      (this.roundA = Math.round(100 * this.a) / 100),
      (this.format = (r = n.format) !== null && r !== void 0 ? r : o.format),
      (this.gradientType = n.gradientType),
      this.r < 1 && (this.r = Math.round(this.r)),
      this.g < 1 && (this.g = Math.round(this.g)),
      this.b < 1 && (this.b = Math.round(this.b)),
      (this.isValid = o.ok);
  }
  return (
    (e.prototype.isDark = function () {
      return this.getBrightness() < 128;
    }),
    (e.prototype.isLight = function () {
      return !this.isDark();
    }),
    (e.prototype.getBrightness = function () {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }),
    (e.prototype.getLuminance = function () {
      var t = this.toRgb(),
        n,
        r,
        o,
        s = t.r / 255,
        i = t.g / 255,
        a = t.b / 255;
      return (
        s <= 0.03928
          ? (n = s / 12.92)
          : (n = Math.pow((s + 0.055) / 1.055, 2.4)),
        i <= 0.03928
          ? (r = i / 12.92)
          : (r = Math.pow((i + 0.055) / 1.055, 2.4)),
        a <= 0.03928
          ? (o = a / 12.92)
          : (o = Math.pow((a + 0.055) / 1.055, 2.4)),
        0.2126 * n + 0.7152 * r + 0.0722 * o
      );
    }),
    (e.prototype.getAlpha = function () {
      return this.a;
    }),
    (e.prototype.setAlpha = function (t) {
      return (
        (this.a = Pc(t)), (this.roundA = Math.round(100 * this.a) / 100), this
      );
    }),
    (e.prototype.isMonochrome = function () {
      var t = this.toHsl().s;
      return t === 0;
    }),
    (e.prototype.toHsv = function () {
      var t = Ea(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }),
    (e.prototype.toHsvString = function () {
      var t = Ea(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.v * 100);
      return this.a === 1
        ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
        : "hsva("
            .concat(n, ", ")
            .concat(r, "%, ")
            .concat(o, "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toHsl = function () {
      var t = wa(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }),
    (e.prototype.toHslString = function () {
      var t = wa(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.l * 100);
      return this.a === 1
        ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
        : "hsla("
            .concat(n, ", ")
            .concat(r, "%, ")
            .concat(o, "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toHex = function (t) {
      return t === void 0 && (t = !1), xa(this.r, this.g, this.b, t);
    }),
    (e.prototype.toHexString = function (t) {
      return t === void 0 && (t = !1), "#" + this.toHex(t);
    }),
    (e.prototype.toHex8 = function (t) {
      return t === void 0 && (t = !1), Mg(this.r, this.g, this.b, this.a, t);
    }),
    (e.prototype.toHex8String = function (t) {
      return t === void 0 && (t = !1), "#" + this.toHex8(t);
    }),
    (e.prototype.toHexShortString = function (t) {
      return (
        t === void 0 && (t = !1),
        this.a === 1 ? this.toHexString(t) : this.toHex8String(t)
      );
    }),
    (e.prototype.toRgb = function () {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a,
      };
    }),
    (e.prototype.toRgbString = function () {
      var t = Math.round(this.r),
        n = Math.round(this.g),
        r = Math.round(this.b);
      return this.a === 1
        ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")")
        : "rgba("
            .concat(t, ", ")
            .concat(n, ", ")
            .concat(r, ", ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toPercentageRgb = function () {
      var t = function (n) {
        return "".concat(Math.round(Le(n, 255) * 100), "%");
      };
      return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
    }),
    (e.prototype.toPercentageRgbString = function () {
      var t = function (n) {
        return Math.round(Le(n, 255) * 100);
      };
      return this.a === 1
        ? "rgb("
            .concat(t(this.r), "%, ")
            .concat(t(this.g), "%, ")
            .concat(t(this.b), "%)")
        : "rgba("
            .concat(t(this.r), "%, ")
            .concat(t(this.g), "%, ")
            .concat(t(this.b), "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toName = function () {
      if (this.a === 0) return "transparent";
      if (this.a < 1) return !1;
      for (
        var t = "#" + xa(this.r, this.g, this.b, !1),
          n = 0,
          r = Object.entries(es);
        n < r.length;
        n++
      ) {
        var o = r[n],
          s = o[0],
          i = o[1];
        if (t === i) return s;
      }
      return !1;
    }),
    (e.prototype.toString = function (t) {
      var n = !!t;
      t = t ?? this.format;
      var r = !1,
        o = this.a < 1 && this.a >= 0,
        s = !n && o && (t.startsWith("hex") || t === "name");
      return s
        ? t === "name" && this.a === 0
          ? this.toName()
          : this.toRgbString()
        : (t === "rgb" && (r = this.toRgbString()),
          t === "prgb" && (r = this.toPercentageRgbString()),
          (t === "hex" || t === "hex6") && (r = this.toHexString()),
          t === "hex3" && (r = this.toHexString(!0)),
          t === "hex4" && (r = this.toHex8String(!0)),
          t === "hex8" && (r = this.toHex8String()),
          t === "name" && (r = this.toName()),
          t === "hsl" && (r = this.toHslString()),
          t === "hsv" && (r = this.toHsvString()),
          r || this.toHexString());
    }),
    (e.prototype.toNumber = function () {
      return (
        (Math.round(this.r) << 16) +
        (Math.round(this.g) << 8) +
        Math.round(this.b)
      );
    }),
    (e.prototype.clone = function () {
      return new e(this.toString());
    }),
    (e.prototype.lighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l += t / 100), (n.l = kr(n.l)), new e(n);
    }),
    (e.prototype.brighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return (
        (n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100))))),
        (n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100))))),
        (n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100))))),
        new e(n)
      );
    }),
    (e.prototype.darken = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l -= t / 100), (n.l = kr(n.l)), new e(n);
    }),
    (e.prototype.tint = function (t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }),
    (e.prototype.shade = function (t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }),
    (e.prototype.desaturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s -= t / 100), (n.s = kr(n.s)), new e(n);
    }),
    (e.prototype.saturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s += t / 100), (n.s = kr(n.s)), new e(n);
    }),
    (e.prototype.greyscale = function () {
      return this.desaturate(100);
    }),
    (e.prototype.spin = function (t) {
      var n = this.toHsl(),
        r = (n.h + t) % 360;
      return (n.h = r < 0 ? 360 + r : r), new e(n);
    }),
    (e.prototype.mix = function (t, n) {
      n === void 0 && (n = 50);
      var r = this.toRgb(),
        o = new e(t).toRgb(),
        s = n / 100,
        i = {
          r: (o.r - r.r) * s + r.r,
          g: (o.g - r.g) * s + r.g,
          b: (o.b - r.b) * s + r.b,
          a: (o.a - r.a) * s + r.a,
        };
      return new e(i);
    }),
    (e.prototype.analogous = function (t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var r = this.toHsl(),
        o = 360 / n,
        s = [this];
      for (r.h = (r.h - ((o * t) >> 1) + 720) % 360; --t; )
        (r.h = (r.h + o) % 360), s.push(new e(r));
      return s;
    }),
    (e.prototype.complement = function () {
      var t = this.toHsl();
      return (t.h = (t.h + 180) % 360), new e(t);
    }),
    (e.prototype.monochromatic = function (t) {
      t === void 0 && (t = 6);
      for (
        var n = this.toHsv(), r = n.h, o = n.s, s = n.v, i = [], a = 1 / t;
        t--;

      )
        i.push(new e({ h: r, s: o, v: s })), (s = (s + a) % 1);
      return i;
    }),
    (e.prototype.splitcomplement = function () {
      var t = this.toHsl(),
        n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l }),
      ];
    }),
    (e.prototype.onBackground = function (t) {
      var n = this.toRgb(),
        r = new e(t).toRgb(),
        o = n.a + r.a * (1 - n.a);
      return new e({
        r: (n.r * n.a + r.r * r.a * (1 - n.a)) / o,
        g: (n.g * n.a + r.g * r.a * (1 - n.a)) / o,
        b: (n.b * n.a + r.b * r.a * (1 - n.a)) / o,
        a: o,
      });
    }),
    (e.prototype.triad = function () {
      return this.polyad(3);
    }),
    (e.prototype.tetrad = function () {
      return this.polyad(4);
    }),
    (e.prototype.polyad = function (t) {
      for (
        var n = this.toHsl(), r = n.h, o = [this], s = 360 / t, i = 1;
        i < t;
        i++
      )
        o.push(new e({ h: (r + i * s) % 360, s: n.s, l: n.l }));
      return o;
    }),
    (e.prototype.equals = function (t) {
      return this.toRgbString() === new e(t).toRgbString();
    }),
    e
  );
})();
const Fg = ie({ name: "ElCollapseTransition" }),
  Ng = ie({
    ...Fg,
    setup(e) {
      const t = Pe("collapse-transition"),
        n = (o) => {
          (o.style.maxHeight = ""),
            (o.style.overflow = o.dataset.oldOverflow),
            (o.style.paddingTop = o.dataset.oldPaddingTop),
            (o.style.paddingBottom = o.dataset.oldPaddingBottom);
        },
        r = {
          beforeEnter(o) {
            o.dataset || (o.dataset = {}),
              (o.dataset.oldPaddingTop = o.style.paddingTop),
              (o.dataset.oldPaddingBottom = o.style.paddingBottom),
              (o.style.maxHeight = 0),
              (o.style.paddingTop = 0),
              (o.style.paddingBottom = 0);
          },
          enter(o) {
            (o.dataset.oldOverflow = o.style.overflow),
              o.scrollHeight !== 0
                ? (o.style.maxHeight = `${o.scrollHeight}px`)
                : (o.style.maxHeight = 0),
              (o.style.paddingTop = o.dataset.oldPaddingTop),
              (o.style.paddingBottom = o.dataset.oldPaddingBottom),
              (o.style.overflow = "hidden");
          },
          afterEnter(o) {
            (o.style.maxHeight = ""),
              (o.style.overflow = o.dataset.oldOverflow);
          },
          enterCancelled(o) {
            n(o);
          },
          beforeLeave(o) {
            o.dataset || (o.dataset = {}),
              (o.dataset.oldPaddingTop = o.style.paddingTop),
              (o.dataset.oldPaddingBottom = o.style.paddingBottom),
              (o.dataset.oldOverflow = o.style.overflow),
              (o.style.maxHeight = `${o.scrollHeight}px`),
              (o.style.overflow = "hidden");
          },
          leave(o) {
            o.scrollHeight !== 0 &&
              ((o.style.maxHeight = 0),
              (o.style.paddingTop = 0),
              (o.style.paddingBottom = 0));
          },
          afterLeave(o) {
            n(o);
          },
          leaveCancelled(o) {
            n(o);
          },
        };
      return (o, s) => (
        oe(),
        nt(
          vr,
          fn({ name: O(t).b() }, gf(r)),
          { default: we(() => [Te(o.$slots, "default")]), _: 3 },
          16,
          ["name"],
        )
      );
    },
  });
var Ur = ke(Ng, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue",
  ],
]);
Ur.install = (e) => {
  e.component(Ur.name, Ur);
};
const Lg = Ur,
  Bg = ie({ name: "ElContainer" }),
  Hg = ie({
    ...Bg,
    props: { direction: { type: String } },
    setup(e) {
      const t = e,
        n = _f(),
        r = Pe("container"),
        o = U(() =>
          t.direction === "vertical"
            ? !0
            : t.direction === "horizontal"
            ? !1
            : n && n.default
            ? n.default().some((i) => {
                const a = i.type.name;
                return a === "ElHeader" || a === "ElFooter";
              })
            : !1,
        );
      return (s, i) => (
        oe(),
        _e(
          "section",
          { class: Qe([O(r).b(), O(r).is("vertical", O(o))]) },
          [Te(s.$slots, "default")],
          2,
        )
      );
    },
  });
var jg = ke(Hg, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue",
  ],
]);
const Dg = ie({ name: "ElAside" }),
  zg = ie({
    ...Dg,
    props: { width: { type: String, default: null } },
    setup(e) {
      const t = e,
        n = Pe("aside"),
        r = U(() => (t.width ? n.cssVarBlock({ width: t.width }) : {}));
      return (o, s) => (
        oe(),
        _e(
          "aside",
          { class: Qe(O(n).b()), style: cn(O(r)) },
          [Te(o.$slots, "default")],
          6,
        )
      );
    },
  });
var Sc = ke(zg, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue",
  ],
]);
const Kg = ie({ name: "ElFooter" }),
  Ug = ie({
    ...Kg,
    props: { height: { type: String, default: null } },
    setup(e) {
      const t = e,
        n = Pe("footer"),
        r = U(() => (t.height ? n.cssVarBlock({ height: t.height }) : {}));
      return (o, s) => (
        oe(),
        _e(
          "footer",
          { class: Qe(O(n).b()), style: cn(O(r)) },
          [Te(o.$slots, "default")],
          6,
        )
      );
    },
  });
var Ac = ke(Ug, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue",
  ],
]);
const Wg = ie({ name: "ElHeader" }),
  Vg = ie({
    ...Wg,
    props: { height: { type: String, default: null } },
    setup(e) {
      const t = e,
        n = Pe("header"),
        r = U(() => (t.height ? n.cssVarBlock({ height: t.height }) : {}));
      return (o, s) => (
        oe(),
        _e(
          "header",
          { class: Qe(O(n).b()), style: cn(O(r)) },
          [Te(o.$slots, "default")],
          6,
        )
      );
    },
  });
var Rc = ke(Vg, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue",
  ],
]);
const qg = ie({ name: "ElMain" }),
  Zg = ie({
    ...qg,
    setup(e) {
      const t = Pe("main");
      return (n, r) => (
        oe(), _e("main", { class: Qe(O(t).b()) }, [Te(n.$slots, "default")], 2)
      );
    },
  });
var Ic = ke(Zg, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue",
  ],
]);
const Qg = _r(jg, { Aside: Sc, Footer: Ac, Header: Rc, Main: Ic }),
  Gg = dn(Sc);
dn(Ac);
dn(Rc);
const Jg = dn(Ic);
let Yg = class {
    constructor(t, n) {
      (this.parent = t),
        (this.domNode = n),
        (this.subIndex = 0),
        (this.subIndex = 0),
        this.init();
    }
    init() {
      (this.subMenuItems = this.domNode.querySelectorAll("li")),
        this.addListeners();
    }
    gotoSubIndex(t) {
      t === this.subMenuItems.length
        ? (t = 0)
        : t < 0 && (t = this.subMenuItems.length - 1),
        this.subMenuItems[t].focus(),
        (this.subIndex = t);
    }
    addListeners() {
      const t = this.parent.domNode;
      Array.prototype.forEach.call(this.subMenuItems, (n) => {
        n.addEventListener("keydown", (r) => {
          let o = !1;
          switch (r.code) {
            case Ve.down: {
              this.gotoSubIndex(this.subIndex + 1), (o = !0);
              break;
            }
            case Ve.up: {
              this.gotoSubIndex(this.subIndex - 1), (o = !0);
              break;
            }
            case Ve.tab: {
              Dr(t, "mouseleave");
              break;
            }
            case Ve.enter:
            case Ve.space: {
              (o = !0), r.currentTarget.click();
              break;
            }
          }
          return o && (r.preventDefault(), r.stopPropagation()), !1;
        });
      });
    }
  },
  Xg = class {
    constructor(t, n) {
      (this.domNode = t),
        (this.submenu = null),
        (this.submenu = null),
        this.init(n);
    }
    init(t) {
      this.domNode.setAttribute("tabindex", "0");
      const n = this.domNode.querySelector(`.${t}-menu`);
      n && (this.submenu = new Yg(this, n)), this.addListeners();
    }
    addListeners() {
      this.domNode.addEventListener("keydown", (t) => {
        let n = !1;
        switch (t.code) {
          case Ve.down: {
            Dr(t.currentTarget, "mouseenter"),
              this.submenu && this.submenu.gotoSubIndex(0),
              (n = !0);
            break;
          }
          case Ve.up: {
            Dr(t.currentTarget, "mouseenter"),
              this.submenu &&
                this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1),
              (n = !0);
            break;
          }
          case Ve.tab: {
            Dr(t.currentTarget, "mouseleave");
            break;
          }
          case Ve.enter:
          case Ve.space: {
            (n = !0), t.currentTarget.click();
            break;
          }
        }
        n && t.preventDefault();
      });
    }
  },
  ev = class {
    constructor(t, n) {
      (this.domNode = t), this.init(n);
    }
    init(t) {
      const n = this.domNode.childNodes;
      Array.from(n).forEach((r) => {
        r.nodeType === 1 && new Xg(r, t);
      });
    }
  };
const tv = ie({
  name: "ElMenuCollapseTransition",
  setup() {
    const e = Pe("menu");
    return {
      listeners: {
        onBeforeEnter: (n) => (n.style.opacity = "0.2"),
        onEnter(n, r) {
          Pr(n, `${e.namespace.value}-opacity-transition`),
            (n.style.opacity = "1"),
            r();
        },
        onAfterEnter(n) {
          Mo(n, `${e.namespace.value}-opacity-transition`),
            (n.style.opacity = "");
        },
        onBeforeLeave(n) {
          n.dataset || (n.dataset = {}),
            ap(n, e.m("collapse"))
              ? (Mo(n, e.m("collapse")),
                (n.dataset.oldOverflow = n.style.overflow),
                (n.dataset.scrollWidth = n.clientWidth.toString()),
                Pr(n, e.m("collapse")))
              : (Pr(n, e.m("collapse")),
                (n.dataset.oldOverflow = n.style.overflow),
                (n.dataset.scrollWidth = n.clientWidth.toString()),
                Mo(n, e.m("collapse"))),
            (n.style.width = `${n.scrollWidth}px`),
            (n.style.overflow = "hidden");
        },
        onLeave(n) {
          Pr(n, "horizontal-collapse-transition"),
            (n.style.width = `${n.dataset.scrollWidth}px`);
        },
      },
    };
  },
});
function nv(e, t, n, r, o, s) {
  return (
    oe(),
    nt(
      vr,
      fn({ mode: "out-in" }, e.listeners),
      { default: we(() => [Te(e.$slots, "default")]), _: 3 },
      16,
    )
  );
}
var rv = ke(tv, [
  ["render", nv],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue",
  ],
]);
function $c(e, t) {
  const n = U(() => {
    let o = e.parent;
    const s = [t.value];
    for (; o.type.name !== "ElMenu"; )
      o.props.index && s.unshift(o.props.index), (o = o.parent);
    return s;
  });
  return {
    parentMenu: U(() => {
      let o = e.parent;
      for (; o && !["ElMenu", "ElSubMenu"].includes(o.type.name); )
        o = o.parent;
      return o;
    }),
    indexPath: n,
  };
}
function ov(e) {
  return U(() => {
    const n = e.backgroundColor;
    return n ? new kg(n).shade(20).toString() : "";
  });
}
const kc = (e, t) => {
    const n = Pe("menu");
    return U(() =>
      n.cssVarBlock({
        "text-color": e.textColor || "",
        "hover-text-color": e.textColor || "",
        "bg-color": e.backgroundColor || "",
        "hover-bg-color": ov(e).value || "",
        "active-color": e.activeTextColor || "",
        level: `${t}`,
      }),
    );
  },
  sv = ot({
    index: { type: String, required: !0 },
    showTimeout: { type: Number, default: 300 },
    hideTimeout: { type: Number, default: 300 },
    popperClass: String,
    disabled: Boolean,
    popperAppendToBody: { type: Boolean, default: void 0 },
    teleported: { type: Boolean, default: void 0 },
    popperOffset: { type: Number, default: 6 },
    expandCloseIcon: { type: Sr },
    expandOpenIcon: { type: Sr },
    collapseCloseIcon: { type: Sr },
    collapseOpenIcon: { type: Sr },
  }),
  Nr = "ElSubMenu";
var qs = ie({
  name: Nr,
  props: sv,
  setup(e, { slots: t, expose: n }) {
    Zh(
      {
        from: "popper-append-to-body",
        replacement: "teleported",
        scope: Nr,
        version: "2.3.0",
        ref: "https://element-plus.org/en-US/component/menu.html#submenu-attributes",
      },
      U(() => e.popperAppendToBody !== void 0),
    );
    const r = _t(),
      { indexPath: o, parentMenu: s } = $c(
        r,
        U(() => e.index),
      ),
      i = Pe("menu"),
      a = Pe("sub-menu"),
      l = Ce("rootMenu");
    l || Xr(Nr, "can not inject root menu");
    const c = Ce(`subMenu:${s.value.uid}`);
    c || Xr(Nr, "can not inject sub menu");
    const u = te({}),
      f = te({});
    let d;
    const m = te(!1),
      v = te(),
      g = te(null),
      y = U(() =>
        R.value === "horizontal" && E.value ? "bottom-start" : "right-start",
      ),
      _ = U(() =>
        (R.value === "horizontal" && E.value) ||
        (R.value === "vertical" && !l.props.collapse)
          ? e.expandCloseIcon && e.expandOpenIcon
            ? D.value
              ? e.expandOpenIcon
              : e.expandCloseIcon
            : wp
          : e.collapseCloseIcon && e.collapseOpenIcon
          ? D.value
            ? e.collapseOpenIcon
            : e.collapseCloseIcon
          : Ip,
      ),
      E = U(() => c.level === 0),
      $ = U(() => {
        var j;
        const P = (j = e.teleported) != null ? j : e.popperAppendToBody;
        return P === void 0 ? E.value : P;
      }),
      w = U(() =>
        l.props.collapse
          ? `${i.namespace.value}-zoom-in-left`
          : `${i.namespace.value}-zoom-in-top`,
      ),
      H = U(() =>
        R.value === "horizontal" && E.value
          ? [
              "bottom-start",
              "bottom-end",
              "top-start",
              "top-end",
              "right-start",
              "left-start",
            ]
          : [
              "right-start",
              "right",
              "right-end",
              "left-start",
              "bottom-start",
              "bottom-end",
              "top-start",
              "top-end",
            ],
      ),
      D = U(() => l.openedMenus.includes(e.index)),
      L = U(() => {
        let j = !1;
        return (
          Object.values(u.value).forEach((P) => {
            P.active && (j = !0);
          }),
          Object.values(f.value).forEach((P) => {
            P.active && (j = !0);
          }),
          j
        );
      }),
      R = U(() => l.props.mode),
      q = un({ index: e.index, indexPath: o, active: L }),
      W = kc(l.props, c.level + 1),
      I = () => {
        var j, P, V;
        return (V =
          (P = (j = g.value) == null ? void 0 : j.popperRef) == null
            ? void 0
            : P.popperInstanceRef) == null
          ? void 0
          : V.destroy();
      },
      x = (j) => {
        j || I();
      },
      k = () => {
        (l.props.menuTrigger === "hover" && l.props.mode === "horizontal") ||
          (l.props.collapse && l.props.mode === "vertical") ||
          e.disabled ||
          l.handleSubMenuClick({
            index: e.index,
            indexPath: o.value,
            active: L.value,
          });
      },
      X = (j, P = e.showTimeout) => {
        var V;
        j.type !== "focus" &&
          ((l.props.menuTrigger === "click" && l.props.mode === "horizontal") ||
            (!l.props.collapse && l.props.mode === "vertical") ||
            e.disabled ||
            ((c.mouseInChild.value = !0),
            d == null || d(),
            ({ stop: d } = Ui(() => {
              l.openMenu(e.index, o.value);
            }, P)),
            $.value &&
              ((V = s.value.vnode.el) == null ||
                V.dispatchEvent(new MouseEvent("mouseenter")))));
      },
      ne = (j = !1) => {
        var P, V;
        (l.props.menuTrigger === "click" && l.props.mode === "horizontal") ||
          (!l.props.collapse && l.props.mode === "vertical") ||
          (d == null || d(),
          (c.mouseInChild.value = !1),
          ({ stop: d } = Ui(
            () => !m.value && l.closeMenu(e.index, o.value),
            e.hideTimeout,
          )),
          $.value &&
            j &&
            ((P = r.parent) == null ? void 0 : P.type.name) === "ElSubMenu" &&
            ((V = c.handleMouseleave) == null || V.call(c, !0)));
      };
    he(
      () => l.props.collapse,
      (j) => x(!!j),
    );
    {
      const j = (V) => {
          f.value[V.index] = V;
        },
        P = (V) => {
          delete f.value[V.index];
        };
      et(`subMenu:${r.uid}`, {
        addSubMenu: j,
        removeSubMenu: P,
        handleMouseleave: ne,
        mouseInChild: m,
        level: c.level + 1,
      });
    }
    return (
      n({ opened: D }),
      rt(() => {
        l.addSubMenu(q), c.addSubMenu(q);
      }),
      ut(() => {
        c.removeSubMenu(q), l.removeSubMenu(q);
      }),
      () => {
        var j;
        const P = [
            (j = t.title) == null ? void 0 : j.call(t),
            Re(
              zs,
              {
                class: a.e("icon-arrow"),
                style: {
                  transform: D.value
                    ? (e.expandCloseIcon && e.expandOpenIcon) ||
                      (e.collapseCloseIcon &&
                        e.collapseOpenIcon &&
                        l.props.collapse)
                      ? "none"
                      : "rotateZ(180deg)"
                    : "none",
                },
              },
              {
                default: () =>
                  pe(_.value)
                    ? Re(r.appContext.components[_.value])
                    : Re(_.value),
              },
            ),
          ],
          V = l.isMenuPopup
            ? Re(
                Mc,
                {
                  ref: g,
                  visible: D.value,
                  effect: "light",
                  pure: !0,
                  offset: e.popperOffset,
                  showArrow: !1,
                  persistent: !0,
                  popperClass: e.popperClass,
                  placement: y.value,
                  teleported: $.value,
                  fallbackPlacements: H.value,
                  transition: w.value,
                  gpuAcceleration: !1,
                },
                {
                  content: () => {
                    var ce;
                    return Re(
                      "div",
                      {
                        class: [
                          i.m(R.value),
                          i.m("popup-container"),
                          e.popperClass,
                        ],
                        onMouseenter: (xe) => X(xe, 100),
                        onMouseleave: () => ne(!0),
                        onFocus: (xe) => X(xe, 100),
                      },
                      [
                        Re(
                          "ul",
                          {
                            class: [
                              i.b(),
                              i.m("popup"),
                              i.m(`popup-${y.value}`),
                            ],
                            style: W.value,
                          },
                          [(ce = t.default) == null ? void 0 : ce.call(t)],
                        ),
                      ],
                    );
                  },
                  default: () =>
                    Re("div", { class: a.e("title"), onClick: k }, P),
                },
              )
            : Re(Fe, {}, [
                Re("div", { class: a.e("title"), ref: v, onClick: k }, P),
                Re(
                  Lg,
                  {},
                  {
                    default: () => {
                      var ce;
                      return Es(
                        Re(
                          "ul",
                          {
                            role: "menu",
                            class: [i.b(), i.m("inline")],
                            style: W.value,
                          },
                          [(ce = t.default) == null ? void 0 : ce.call(t)],
                        ),
                        [[Xl, D.value]],
                      );
                    },
                  },
                ),
              ]);
        return Re(
          "li",
          {
            class: [
              a.b(),
              a.is("active", L.value),
              a.is("opened", D.value),
              a.is("disabled", e.disabled),
            ],
            role: "menuitem",
            ariaHaspopup: !0,
            ariaExpanded: D.value,
            onMouseenter: X,
            onMouseleave: () => ne(!0),
            onFocus: X,
          },
          [V],
        );
      }
    );
  },
});
const iv = ot({
    mode: {
      type: String,
      values: ["horizontal", "vertical"],
      default: "vertical",
    },
    defaultActive: { type: String, default: "" },
    defaultOpeneds: { type: be(Array), default: () => qh([]) },
    uniqueOpened: Boolean,
    router: Boolean,
    menuTrigger: { type: String, values: ["hover", "click"], default: "hover" },
    collapse: Boolean,
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    collapseTransition: { type: Boolean, default: !0 },
    ellipsis: { type: Boolean, default: !0 },
    popperEffect: { type: String, values: ["dark", "light"], default: "dark" },
  }),
  ko = (e) => Array.isArray(e) && e.every((t) => pe(t)),
  av = {
    close: (e, t) => pe(e) && ko(t),
    open: (e, t) => pe(e) && ko(t),
    select: (e, t, n, r) =>
      pe(e) && ko(t) && me(n) && (r === void 0 || r instanceof Promise),
  };
var lv = ie({
  name: "ElMenu",
  props: iv,
  emits: av,
  setup(e, { emit: t, slots: n, expose: r }) {
    const o = _t(),
      s = o.appContext.config.globalProperties.$router,
      i = te(),
      a = Pe("menu"),
      l = Pe("sub-menu"),
      c = te(-1),
      u = te(e.defaultOpeneds && !e.collapse ? e.defaultOpeneds.slice(0) : []),
      f = te(e.defaultActive),
      d = te({}),
      m = te({}),
      v = U(
        () => e.mode === "horizontal" || (e.mode === "vertical" && e.collapse),
      ),
      g = () => {
        const I = f.value && d.value[f.value];
        if (!I || e.mode === "horizontal" || e.collapse) return;
        I.indexPath.forEach((k) => {
          const X = m.value[k];
          X && y(k, X.indexPath);
        });
      },
      y = (I, x) => {
        u.value.includes(I) ||
          (e.uniqueOpened && (u.value = u.value.filter((k) => x.includes(k))),
          u.value.push(I),
          t("open", I, x));
      },
      _ = (I) => {
        const x = u.value.indexOf(I);
        x !== -1 && u.value.splice(x, 1);
      },
      E = (I, x) => {
        _(I), t("close", I, x);
      },
      $ = ({ index: I, indexPath: x }) => {
        u.value.includes(I) ? E(I, x) : y(I, x);
      },
      w = (I) => {
        (e.mode === "horizontal" || e.collapse) && (u.value = []);
        const { index: x, indexPath: k } = I;
        if (!(ur(x) || ur(k)))
          if (e.router && s) {
            const X = I.route || x,
              ne = s.push(X).then((j) => (j || (f.value = x), j));
            t("select", x, k, { index: x, indexPath: k, route: X }, ne);
          } else (f.value = x), t("select", x, k, { index: x, indexPath: k });
      },
      H = (I) => {
        const x = d.value,
          k = x[I] || (f.value && x[f.value]) || x[e.defaultActive];
        k ? (f.value = k.index) : (f.value = I);
      },
      D = () => {
        var I, x;
        if (!i.value) return -1;
        const k = Array.from(
            (x = (I = i.value) == null ? void 0 : I.childNodes) != null
              ? x
              : [],
          ).filter(
            (xe) =>
              xe.nodeName !== "#comment" &&
              (xe.nodeName !== "#text" || xe.nodeValue),
          ),
          X = 64,
          ne = Number.parseInt(getComputedStyle(i.value).paddingLeft, 10),
          j = Number.parseInt(getComputedStyle(i.value).paddingRight, 10),
          P = i.value.clientWidth - ne - j;
        let V = 0,
          ce = 0;
        return (
          k.forEach((xe, Be) => {
            (V += xe.offsetWidth || 0), V <= P - X && (ce = Be + 1);
          }),
          ce === k.length ? -1 : ce
        );
      },
      L = (I, x = 33.34) => {
        let k;
        return () => {
          k && clearTimeout(k),
            (k = setTimeout(() => {
              I();
            }, x));
        };
      };
    let R = !0;
    const q = () => {
      const I = () => {
        (c.value = -1),
          On(() => {
            c.value = D();
          });
      };
      R ? I() : L(I)(), (R = !1);
    };
    he(
      () => e.defaultActive,
      (I) => {
        d.value[I] || (f.value = ""), H(I);
      },
    ),
      he(
        () => e.collapse,
        (I) => {
          I && (u.value = []);
        },
      ),
      he(d.value, g);
    let W;
    bl(() => {
      e.mode === "horizontal" && e.ellipsis
        ? (W = Jd(i, q).stop)
        : W == null || W();
    });
    {
      const I = (ne) => {
          m.value[ne.index] = ne;
        },
        x = (ne) => {
          delete m.value[ne.index];
        };
      et(
        "rootMenu",
        un({
          props: e,
          openedMenus: u,
          items: d,
          subMenus: m,
          activeIndex: f,
          isMenuPopup: v,
          addMenuItem: (ne) => {
            d.value[ne.index] = ne;
          },
          removeMenuItem: (ne) => {
            delete d.value[ne.index];
          },
          addSubMenu: I,
          removeSubMenu: x,
          openMenu: y,
          closeMenu: E,
          handleMenuItemClick: w,
          handleSubMenuClick: $,
        }),
      ),
        et(`subMenu:${o.uid}`, {
          addSubMenu: I,
          removeSubMenu: x,
          mouseInChild: te(!1),
          level: 0,
        });
    }
    return (
      rt(() => {
        e.mode === "horizontal" && new ev(o.vnode.el, a.namespace.value);
      }),
      r({
        open: (x) => {
          const { indexPath: k } = m.value[x];
          k.forEach((X) => y(X, k));
        },
        close: _,
        handleResize: q,
      }),
      () => {
        var I, x;
        let k =
          (x = (I = n.default) == null ? void 0 : I.call(n)) != null ? x : [];
        const X = [];
        if (e.mode === "horizontal" && i.value) {
          const P = zr(k),
            V = c.value === -1 ? P : P.slice(0, c.value),
            ce = c.value === -1 ? [] : P.slice(c.value);
          ce != null &&
            ce.length &&
            e.ellipsis &&
            ((k = V),
            X.push(
              Re(
                qs,
                { index: "sub-menu-more", class: l.e("hide-arrow") },
                {
                  title: () =>
                    Re(
                      zs,
                      { class: l.e("icon-more") },
                      { default: () => Re(Sh) },
                    ),
                  default: () => ce,
                },
              ),
            ));
        }
        const ne = kc(e, 0),
          j = Re(
            "ul",
            {
              key: String(e.collapse),
              role: "menubar",
              ref: i,
              style: ne.value,
              class: {
                [a.b()]: !0,
                [a.m(e.mode)]: !0,
                [a.m("collapse")]: e.collapse,
              },
            },
            [...k, ...X],
          );
        return e.collapseTransition && e.mode === "vertical"
          ? Re(rv, () => j)
          : j;
      }
    );
  },
});
const cv = ot({
    index: { type: be([String, null]), default: null },
    route: { type: be([String, Object]) },
    disabled: Boolean,
  }),
  uv = { click: (e) => pe(e.index) && Array.isArray(e.indexPath) },
  Fo = "ElMenuItem",
  fv = ie({
    name: Fo,
    components: { ElTooltip: Mc },
    props: cv,
    emits: uv,
    setup(e, { emit: t }) {
      const n = _t(),
        r = Ce("rootMenu"),
        o = Pe("menu"),
        s = Pe("menu-item");
      r || Xr(Fo, "can not inject root menu");
      const { parentMenu: i, indexPath: a } = $c(n, bn(e, "index")),
        l = Ce(`subMenu:${i.value.uid}`);
      l || Xr(Fo, "can not inject sub menu");
      const c = U(() => e.index === r.activeIndex),
        u = un({ index: e.index, indexPath: a, active: c }),
        f = () => {
          e.disabled ||
            (r.handleMenuItemClick({
              index: e.index,
              indexPath: a.value,
              route: e.route,
            }),
            t("click", u));
        };
      return (
        rt(() => {
          l.addSubMenu(u), r.addMenuItem(u);
        }),
        ut(() => {
          l.removeSubMenu(u), r.removeMenuItem(u);
        }),
        {
          parentMenu: i,
          rootMenu: r,
          active: c,
          nsMenu: o,
          nsMenuItem: s,
          handleClick: f,
        }
      );
    },
  });
function dv(e, t, n, r, o, s) {
  const i = Sl("el-tooltip");
  return (
    oe(),
    _e(
      "li",
      {
        class: Qe([
          e.nsMenuItem.b(),
          e.nsMenuItem.is("active", e.active),
          e.nsMenuItem.is("disabled", e.disabled),
        ]),
        role: "menuitem",
        tabindex: "-1",
        onClick:
          t[0] || (t[0] = (...a) => e.handleClick && e.handleClick(...a)),
      },
      [
        e.parentMenu.type.name === "ElMenu" &&
        e.rootMenu.props.collapse &&
        e.$slots.title
          ? (oe(),
            nt(
              i,
              {
                key: 0,
                effect: e.rootMenu.props.popperEffect,
                placement: "right",
                "fallback-placements": ["left"],
                persistent: "",
              },
              {
                content: we(() => [Te(e.$slots, "title")]),
                default: we(() => [
                  ye(
                    "div",
                    { class: Qe(e.nsMenu.be("tooltip", "trigger")) },
                    [Te(e.$slots, "default")],
                    2,
                  ),
                ]),
                _: 3,
              },
              8,
              ["effect"],
            ))
          : (oe(),
            _e(
              Fe,
              { key: 1 },
              [Te(e.$slots, "default"), Te(e.$slots, "title")],
              64,
            )),
      ],
      2,
    )
  );
}
var Fc = ke(fv, [
  ["render", dv],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue",
  ],
]);
const pv = { title: String },
  hv = "ElMenuItemGroup",
  mv = ie({
    name: hv,
    props: pv,
    setup() {
      return { ns: Pe("menu-item-group") };
    },
  });
function gv(e, t, n, r, o, s) {
  return (
    oe(),
    _e(
      "li",
      { class: Qe(e.ns.b()) },
      [
        ye(
          "div",
          { class: Qe(e.ns.e("title")) },
          [
            e.$slots.title
              ? Te(e.$slots, "title", { key: 1 })
              : (oe(), _e(Fe, { key: 0 }, [Qn(Za(e.title), 1)], 64)),
          ],
          2,
        ),
        ye("ul", null, [Te(e.$slots, "default")]),
      ],
      2,
    )
  );
}
var Nc = ke(mv, [
  ["render", gv],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue",
  ],
]);
const vv = _r(lv, { MenuItem: Fc, MenuItemGroup: Nc, SubMenu: qs }),
  _v = dn(Fc);
dn(Nc);
const bv = dn(qs);
const yv = (e) => (Gu("data-v-e81fa4e7"), (e = e()), Ju(), e),
  wv = yv(() => ye("span", null, "工具", -1)),
  Ev = ie({
    __name: "index",
    setup(e) {
      return (t, n) => {
        const r = zs,
          o = _v,
          s = bv,
          i = vv;
        return (
          oe(),
          nt(
            i,
            {
              class: "el-menu-vertical-demo",
              "active-text-color": "#fae361",
              "text-color": "#fff",
              "background-color": "#4d698e",
              "default-active": "/",
              router: "",
            },
            {
              default: we(() => [
                ae(
                  o,
                  { index: "/" },
                  {
                    title: we(() => [
                      ae(r, null, { default: we(() => [ae(O(mp))]), _: 1 }),
                      Qn(" 资讯 "),
                    ]),
                    _: 1,
                  },
                ),
                ae(
                  s,
                  { index: "2" },
                  {
                    title: we(() => [
                      ae(r, null, { default: we(() => [ae(O(jh))]), _: 1 }),
                      wv,
                    ]),
                    default: we(() => [
                      ae(
                        o,
                        { index: "house" },
                        {
                          title: we(() => [
                            ae(r, null, {
                              default: we(() => [ae(O(ch))]),
                              _: 1,
                            }),
                            Qn(" 房贷计算 "),
                          ]),
                          _: 1,
                        },
                      ),
                      ae(
                        o,
                        { index: "money" },
                        {
                          title: we(() => [
                            ae(r, null, {
                              default: we(() => [ae(O(xh))]),
                              _: 1,
                            }),
                            Qn(" 理财计算 "),
                          ]),
                          _: 1,
                        },
                      ),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            },
          )
        );
      };
    },
  });
const xv = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  },
  Cv = xv(Ev, [["__scopeId", "data-v-e81fa4e7"]]),
  Tv = ie({
    __name: "App",
    setup(e) {
      return (t, n) => {
        const r = Gg,
          o = Sl("RouterView"),
          s = Jg,
          i = Qg;
        return (
          oe(),
          nt(i, null, {
            default: we(() => [
              ae(
                r,
                { style: { height: "100vh" } },
                { default: we(() => [ae(Cv)]), _: 1 },
              ),
              ae(s, null, { default: we(() => [ae(o)]), _: 1 }),
            ]),
            _: 1,
          })
        );
      };
    },
  }),
  Ov = "modulepreload",
  Mv = function (e) {
    return "/" + e;
  },
  Ta = {},
  Zs = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(
      n.map((s) => {
        if (((s = Mv(s)), s in Ta)) return;
        Ta[s] = !0;
        const i = s.endsWith(".css"),
          a = i ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let u = o.length - 1; u >= 0; u--) {
            const f = o[u];
            if (f.href === s && (!i || f.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${s}"]${a}`)) return;
        const c = document.createElement("link");
        if (
          ((c.rel = i ? "stylesheet" : Ov),
          i || ((c.as = "script"), (c.crossOrigin = "")),
          (c.href = s),
          document.head.appendChild(c),
          i)
        )
          return new Promise((u, f) => {
            c.addEventListener("load", u),
              c.addEventListener("error", () =>
                f(new Error(`Unable to preload CSS for ${s}`)),
              );
          });
      }),
    )
      .then(() => t())
      .catch((s) => {
        const i = new Event("vite:preloadError", { cancelable: !0 });
        if (((i.payload = s), window.dispatchEvent(i), !i.defaultPrevented))
          throw s;
      });
  };
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const _n = typeof window < "u";
function Pv(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ve = Object.assign;
function No(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = vt(o) ? o.map(e) : e(o);
  }
  return n;
}
const Yn = () => {},
  vt = Array.isArray,
  Sv = /\/$/,
  Av = (e) => e.replace(Sv, "");
function Lo(e, t, n = "/") {
  let r,
    o = {},
    s = "",
    i = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 &&
      ((r = t.slice(0, l)),
      (s = t.slice(l + 1, a > -1 ? a : t.length)),
      (o = e(s))),
    a > -1 && ((r = r || t.slice(0, a)), (i = t.slice(a, t.length))),
    (r = kv(r ?? t, n)),
    { fullPath: r + (s && "?") + s + i, path: r, query: o, hash: i }
  );
}
function Rv(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Oa(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Iv(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return (
    r > -1 &&
    r === o &&
    kn(t.matched[r], n.matched[o]) &&
    Lc(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function kn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Lc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!$v(e[n], t[n])) return !1;
  return !0;
}
function $v(e, t) {
  return vt(e) ? Ma(e, t) : vt(t) ? Ma(t, e) : e === t;
}
function Ma(e, t) {
  return vt(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function kv(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    o = r[r.length - 1];
  (o === ".." || o === ".") && r.push("");
  let s = n.length - 1,
    i,
    a;
  for (i = 0; i < r.length; i++)
    if (((a = r[i]), a !== "."))
      if (a === "..") s > 1 && s--;
      else break;
  return (
    n.slice(0, s).join("/") +
    "/" +
    r.slice(i - (i === r.length ? 1 : 0)).join("/")
  );
}
var hr;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(hr || (hr = {}));
var Xn;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Xn || (Xn = {}));
function Fv(e) {
  if (!e)
    if (_n) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Av(e);
}
const Nv = /^[^#]+#/;
function Lv(e, t) {
  return e.replace(Nv, "#") + t;
}
function Bv(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const bo = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Hv(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      o =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!o) return;
    t = Bv(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset,
      );
}
function Pa(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ts = new Map();
function jv(e, t) {
  ts.set(e, t);
}
function Dv(e) {
  const t = ts.get(e);
  return ts.delete(e), t;
}
let zv = () => location.protocol + "//" + location.host;
function Bc(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf("#");
  if (s > -1) {
    let a = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      l = o.slice(a);
    return l[0] !== "/" && (l = "/" + l), Oa(l, "");
  }
  return Oa(n, e) + r + o;
}
function Kv(e, t, n, r) {
  let o = [],
    s = [],
    i = null;
  const a = ({ state: d }) => {
    const m = Bc(e, location),
      v = n.value,
      g = t.value;
    let y = 0;
    if (d) {
      if (((n.value = m), (t.value = d), i && i === v)) {
        i = null;
        return;
      }
      y = g ? d.position - g.position : 0;
    } else r(m);
    o.forEach((_) => {
      _(n.value, v, {
        delta: y,
        type: hr.pop,
        direction: y ? (y > 0 ? Xn.forward : Xn.back) : Xn.unknown,
      });
    });
  };
  function l() {
    i = n.value;
  }
  function c(d) {
    o.push(d);
    const m = () => {
      const v = o.indexOf(d);
      v > -1 && o.splice(v, 1);
    };
    return s.push(m), m;
  }
  function u() {
    const { history: d } = window;
    d.state && d.replaceState(ve({}, d.state, { scroll: bo() }), "");
  }
  function f() {
    for (const d of s) d();
    (s = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", u);
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", u, { passive: !0 }),
    { pauseListeners: l, listen: c, destroy: f }
  );
}
function Sa(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? bo() : null,
  };
}
function Uv(e) {
  const { history: t, location: n } = window,
    r = { value: Bc(e, n) },
    o = { value: t.state };
  o.value ||
    s(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function s(l, c, u) {
    const f = e.indexOf("#"),
      d =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l
          : zv() + e + l;
    try {
      t[u ? "replaceState" : "pushState"](c, "", d), (o.value = c);
    } catch (m) {
      console.error(m), n[u ? "replace" : "assign"](d);
    }
  }
  function i(l, c) {
    const u = ve({}, t.state, Sa(o.value.back, l, o.value.forward, !0), c, {
      position: o.value.position,
    });
    s(l, u, !0), (r.value = l);
  }
  function a(l, c) {
    const u = ve({}, o.value, t.state, { forward: l, scroll: bo() });
    s(u.current, u, !0);
    const f = ve({}, Sa(r.value, l, null), { position: u.position + 1 }, c);
    s(l, f, !1), (r.value = l);
  }
  return { location: r, state: o, push: a, replace: i };
}
function Wv(e) {
  e = Fv(e);
  const t = Uv(e),
    n = Kv(e, t.state, t.location, t.replace);
  function r(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const o = ve(
    { location: "", base: e, go: r, createHref: Lv.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(o, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  );
}
function Vv(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Hc(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Bt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  jc = Symbol("");
var Aa;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Aa || (Aa = {}));
function Fn(e, t) {
  return ve(new Error(), { type: e, [jc]: !0 }, t);
}
function Pt(e, t) {
  return e instanceof Error && jc in e && (t == null || !!(e.type & t));
}
const Ra = "[^/]+?",
  qv = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Zv = /[.+*?^${}()[\]/\\]/g;
function Qv(e, t) {
  const n = ve({}, qv, t),
    r = [];
  let o = n.start ? "^" : "";
  const s = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (o += "/");
    for (let f = 0; f < c.length; f++) {
      const d = c[f];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        f || (o += "/"), (o += d.value.replace(Zv, "\\$&")), (m += 40);
      else if (d.type === 1) {
        const { value: v, repeatable: g, optional: y, regexp: _ } = d;
        s.push({ name: v, repeatable: g, optional: y });
        const E = _ || Ra;
        if (E !== Ra) {
          m += 10;
          try {
            new RegExp(`(${E})`);
          } catch (w) {
            throw new Error(
              `Invalid custom RegExp for param "${v}" (${E}): ` + w.message,
            );
          }
        }
        let $ = g ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        f || ($ = y && c.length < 2 ? `(?:/${$})` : "/" + $),
          y && ($ += "?"),
          (o += $),
          (m += 20),
          y && (m += -8),
          g && (m += -20),
          E === ".*" && (m += -50);
      }
      u.push(m);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const c = r.length - 1;
    r[c][r[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function a(c) {
    const u = c.match(i),
      f = {};
    if (!u) return null;
    for (let d = 1; d < u.length; d++) {
      const m = u[d] || "",
        v = s[d - 1];
      f[v.name] = m && v.repeatable ? m.split("/") : m;
    }
    return f;
  }
  function l(c) {
    let u = "",
      f = !1;
    for (const d of e) {
      (!f || !u.endsWith("/")) && (u += "/"), (f = !1);
      for (const m of d)
        if (m.type === 0) u += m.value;
        else if (m.type === 1) {
          const { value: v, repeatable: g, optional: y } = m,
            _ = v in c ? c[v] : "";
          if (vt(_) && !g)
            throw new Error(
              `Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const E = vt(_) ? _.join("/") : _;
          if (!E)
            if (y)
              d.length < 2 &&
                (u.endsWith("/") ? (u = u.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${v}"`);
          u += E;
        }
    }
    return u || "/";
  }
  return { re: i, score: r, keys: s, parse: a, stringify: l };
}
function Gv(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Jv(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const s = Gv(r[n], o[n]);
    if (s) return s;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (Ia(r)) return 1;
    if (Ia(o)) return -1;
  }
  return o.length - r.length;
}
function Ia(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Yv = { type: 0, value: "" },
  Xv = /[a-zA-Z0-9_]/;
function e1(e) {
  if (!e) return [[]];
  if (e === "/") return [[Yv]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${c}": ${m}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let s;
  function i() {
    s && o.push(s), (s = []);
  }
  let a = 0,
    l,
    c = "",
    u = "";
  function f() {
    c &&
      (n === 0
        ? s.push({ type: 0, value: c })
        : n === 1 || n === 2 || n === 3
        ? (s.length > 1 &&
            (l === "*" || l === "+") &&
            t(
              `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`,
            ),
          s.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?",
          }))
        : t("Invalid state to consume buffer"),
      (c = ""));
  }
  function d() {
    c += l;
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (c && f(), i()) : l === ":" ? (f(), (n = 1)) : d();
        break;
      case 4:
        d(), (n = r);
        break;
      case 1:
        l === "("
          ? (n = 2)
          : Xv.test(l)
          ? d()
          : (f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")"
          ? u[u.length - 1] == "\\"
            ? (u = u.slice(0, -1) + l)
            : (n = 3)
          : (u += l);
        break;
      case 3:
        f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--, (u = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), i(), o;
}
function t1(e, t, n) {
  const r = Qv(e1(e.path), n),
    o = ve(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function n1(e, t) {
  const n = [],
    r = new Map();
  t = Fa({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(u) {
    return r.get(u);
  }
  function s(u, f, d) {
    const m = !d,
      v = r1(u);
    v.aliasOf = d && d.record;
    const g = Fa(t, u),
      y = [v];
    if ("alias" in u) {
      const $ = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const w of $)
        y.push(
          ve({}, v, {
            components: d ? d.record.components : v.components,
            path: w,
            aliasOf: d ? d.record : v,
          }),
        );
    }
    let _, E;
    for (const $ of y) {
      const { path: w } = $;
      if (f && w[0] !== "/") {
        const H = f.record.path,
          D = H[H.length - 1] === "/" ? "" : "/";
        $.path = f.record.path + (w && D + w);
      }
      if (
        ((_ = t1($, f, g)),
        d
          ? d.alias.push(_)
          : ((E = E || _),
            E !== _ && E.alias.push(_),
            m && u.name && !ka(_) && i(u.name)),
        v.children)
      ) {
        const H = v.children;
        for (let D = 0; D < H.length; D++) s(H[D], _, d && d.children[D]);
      }
      (d = d || _),
        ((_.record.components && Object.keys(_.record.components).length) ||
          _.record.name ||
          _.record.redirect) &&
          l(_);
    }
    return E
      ? () => {
          i(E);
        }
      : Yn;
  }
  function i(u) {
    if (Hc(u)) {
      const f = r.get(u);
      f &&
        (r.delete(u),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(i),
        f.alias.forEach(i));
    } else {
      const f = n.indexOf(u);
      f > -1 &&
        (n.splice(f, 1),
        u.record.name && r.delete(u.record.name),
        u.children.forEach(i),
        u.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(u) {
    let f = 0;
    for (
      ;
      f < n.length &&
      Jv(u, n[f]) >= 0 &&
      (u.record.path !== n[f].record.path || !Dc(u, n[f]));

    )
      f++;
    n.splice(f, 0, u), u.record.name && !ka(u) && r.set(u.record.name, u);
  }
  function c(u, f) {
    let d,
      m = {},
      v,
      g;
    if ("name" in u && u.name) {
      if (((d = r.get(u.name)), !d)) throw Fn(1, { location: u });
      (g = d.record.name),
        (m = ve(
          $a(
            f.params,
            d.keys.filter((E) => !E.optional).map((E) => E.name),
          ),
          u.params &&
            $a(
              u.params,
              d.keys.map((E) => E.name),
            ),
        )),
        (v = d.stringify(m));
    } else if ("path" in u)
      (v = u.path),
        (d = n.find((E) => E.re.test(v))),
        d && ((m = d.parse(v)), (g = d.record.name));
    else {
      if (((d = f.name ? r.get(f.name) : n.find((E) => E.re.test(f.path))), !d))
        throw Fn(1, { location: u, currentLocation: f });
      (g = d.record.name),
        (m = ve({}, f.params, u.params)),
        (v = d.stringify(m));
    }
    const y = [];
    let _ = d;
    for (; _; ) y.unshift(_.record), (_ = _.parent);
    return { name: g, path: v, params: m, matched: y, meta: s1(y) };
  }
  return (
    e.forEach((u) => s(u)),
    {
      addRoute: s,
      resolve: c,
      removeRoute: i,
      getRoutes: a,
      getRecordMatcher: o,
    }
  );
}
function $a(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function r1(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: o1(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function o1(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function ka(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function s1(e) {
  return e.reduce((t, n) => ve(t, n.meta), {});
}
function Fa(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Dc(e, t) {
  return t.children.some((n) => n === e || Dc(e, n));
}
const zc = /#/g,
  i1 = /&/g,
  a1 = /\//g,
  l1 = /=/g,
  c1 = /\?/g,
  Kc = /\+/g,
  u1 = /%5B/g,
  f1 = /%5D/g,
  Uc = /%5E/g,
  d1 = /%60/g,
  Wc = /%7B/g,
  p1 = /%7C/g,
  Vc = /%7D/g,
  h1 = /%20/g;
function Qs(e) {
  return encodeURI("" + e)
    .replace(p1, "|")
    .replace(u1, "[")
    .replace(f1, "]");
}
function m1(e) {
  return Qs(e).replace(Wc, "{").replace(Vc, "}").replace(Uc, "^");
}
function ns(e) {
  return Qs(e)
    .replace(Kc, "%2B")
    .replace(h1, "+")
    .replace(zc, "%23")
    .replace(i1, "%26")
    .replace(d1, "`")
    .replace(Wc, "{")
    .replace(Vc, "}")
    .replace(Uc, "^");
}
function g1(e) {
  return ns(e).replace(l1, "%3D");
}
function v1(e) {
  return Qs(e).replace(zc, "%23").replace(c1, "%3F");
}
function _1(e) {
  return e == null ? "" : v1(e).replace(a1, "%2F");
}
function to(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function b1(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(Kc, " "),
      i = s.indexOf("="),
      a = to(i < 0 ? s : s.slice(0, i)),
      l = i < 0 ? null : to(s.slice(i + 1));
    if (a in t) {
      let c = t[a];
      vt(c) || (c = t[a] = [c]), c.push(l);
    } else t[a] = l;
  }
  return t;
}
function Na(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = g1(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (vt(r) ? r.map((s) => s && ns(s)) : [r && ns(r)]).forEach((s) => {
      s !== void 0 &&
        ((t += (t.length ? "&" : "") + n), s != null && (t += "=" + s));
    });
  }
  return t;
}
function y1(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = vt(r)
        ? r.map((o) => (o == null ? null : "" + o))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const w1 = Symbol(""),
  La = Symbol(""),
  Gs = Symbol(""),
  qc = Symbol(""),
  rs = Symbol("");
function zn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function zt(e, t, n, r, o) {
  const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((i, a) => {
      const l = (f) => {
          f === !1
            ? a(Fn(4, { from: n, to: t }))
            : f instanceof Error
            ? a(f)
            : Vv(f)
            ? a(Fn(2, { from: t, to: f }))
            : (s &&
                r.enterCallbacks[o] === s &&
                typeof f == "function" &&
                s.push(f),
              i());
        },
        c = e.call(r && r.instances[o], t, n, l);
      let u = Promise.resolve(c);
      e.length < 3 && (u = u.then(l)), u.catch((f) => a(f));
    });
}
function Bo(e, t, n, r) {
  const o = [];
  for (const s of e)
    for (const i in s.components) {
      let a = s.components[i];
      if (!(t !== "beforeRouteEnter" && !s.instances[i]))
        if (E1(a)) {
          const c = (a.__vccOpts || a)[t];
          c && o.push(zt(c, n, r, s, i));
        } else {
          let l = a();
          o.push(() =>
            l.then((c) => {
              if (!c)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${s.path}"`),
                );
              const u = Pv(c) ? c.default : c;
              s.components[i] = u;
              const d = (u.__vccOpts || u)[t];
              return d && zt(d, n, r, s, i)();
            }),
          );
        }
    }
  return o;
}
function E1(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Ba(e) {
  const t = Ce(Gs),
    n = Ce(qc),
    r = U(() => t.resolve(O(e.to))),
    o = U(() => {
      const { matched: l } = r.value,
        { length: c } = l,
        u = l[c - 1],
        f = n.matched;
      if (!u || !f.length) return -1;
      const d = f.findIndex(kn.bind(null, u));
      if (d > -1) return d;
      const m = Ha(l[c - 2]);
      return c > 1 && Ha(u) === m && f[f.length - 1].path !== m
        ? f.findIndex(kn.bind(null, l[c - 2]))
        : d;
    }),
    s = U(() => o.value > -1 && O1(n.params, r.value.params)),
    i = U(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        Lc(n.params, r.value.params),
    );
  function a(l = {}) {
    return T1(l)
      ? t[O(e.replace) ? "replace" : "push"](O(e.to)).catch(Yn)
      : Promise.resolve();
  }
  return {
    route: r,
    href: U(() => r.value.href),
    isActive: s,
    isExactActive: i,
    navigate: a,
  };
}
const x1 = ie({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Ba,
    setup(e, { slots: t }) {
      const n = un(Ba(e)),
        { options: r } = Ce(Gs),
        o = U(() => ({
          [ja(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [ja(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const s = t.default && t.default(n);
        return e.custom
          ? s
          : Re(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              s,
            );
      };
    },
  }),
  C1 = x1;
function T1(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function O1(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (!vt(o) || o.length !== r.length || r.some((s, i) => s !== o[i]))
      return !1;
  }
  return !0;
}
function Ha(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const ja = (e, t, n) => e ?? t ?? n,
  M1 = ie({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Ce(rs),
        o = U(() => e.route || r.value),
        s = Ce(La, 0),
        i = U(() => {
          let c = O(s);
          const { matched: u } = o.value;
          let f;
          for (; (f = u[c]) && !f.components; ) c++;
          return c;
        }),
        a = U(() => o.value.matched[i.value]);
      et(
        La,
        U(() => i.value + 1),
      ),
        et(w1, a),
        et(rs, o);
      const l = te();
      return (
        he(
          () => [l.value, a.value, e.name],
          ([c, u, f], [d, m, v]) => {
            u &&
              ((u.instances[f] = c),
              m &&
                m !== u &&
                c &&
                c === d &&
                (u.leaveGuards.size || (u.leaveGuards = m.leaveGuards),
                u.updateGuards.size || (u.updateGuards = m.updateGuards))),
              c &&
                u &&
                (!m || !kn(u, m) || !d) &&
                (u.enterCallbacks[f] || []).forEach((g) => g(c));
          },
          { flush: "post" },
        ),
        () => {
          const c = o.value,
            u = e.name,
            f = a.value,
            d = f && f.components[u];
          if (!d) return Da(n.default, { Component: d, route: c });
          const m = f.props[u],
            v = m
              ? m === !0
                ? c.params
                : typeof m == "function"
                ? m(c)
                : m
              : null,
            y = Re(
              d,
              ve({}, v, t, {
                onVnodeUnmounted: (_) => {
                  _.component.isUnmounted && (f.instances[u] = null);
                },
                ref: l,
              }),
            );
          return Da(n.default, { Component: y, route: c }) || y;
        }
      );
    },
  });
function Da(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const P1 = M1;
function S1(e) {
  const t = n1(e.routes, e),
    n = e.parseQuery || b1,
    r = e.stringifyQuery || Na,
    o = e.history,
    s = zn(),
    i = zn(),
    a = zn(),
    l = _s(Bt);
  let c = Bt;
  _n &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const u = No.bind(null, (T) => "" + T),
    f = No.bind(null, _1),
    d = No.bind(null, to);
  function m(T, z) {
    let B, Q;
    return (
      Hc(T) ? ((B = t.getRecordMatcher(T)), (Q = z)) : (Q = T), t.addRoute(Q, B)
    );
  }
  function v(T) {
    const z = t.getRecordMatcher(T);
    z && t.removeRoute(z);
  }
  function g() {
    return t.getRoutes().map((T) => T.record);
  }
  function y(T) {
    return !!t.getRecordMatcher(T);
  }
  function _(T, z) {
    if (((z = ve({}, z || l.value)), typeof T == "string")) {
      const b = Lo(n, T, z.path),
        C = t.resolve({ path: b.path }, z),
        M = o.createHref(b.fullPath);
      return ve(b, C, {
        params: d(C.params),
        hash: to(b.hash),
        redirectedFrom: void 0,
        href: M,
      });
    }
    let B;
    if ("path" in T) B = ve({}, T, { path: Lo(n, T.path, z.path).path });
    else {
      const b = ve({}, T.params);
      for (const C in b) b[C] == null && delete b[C];
      (B = ve({}, T, { params: f(b) })), (z.params = f(z.params));
    }
    const Q = t.resolve(B, z),
      ue = T.hash || "";
    Q.params = u(d(Q.params));
    const p = Rv(r, ve({}, T, { hash: m1(ue), path: Q.path })),
      h = o.createHref(p);
    return ve(
      { fullPath: p, hash: ue, query: r === Na ? y1(T.query) : T.query || {} },
      Q,
      { redirectedFrom: void 0, href: h },
    );
  }
  function E(T) {
    return typeof T == "string" ? Lo(n, T, l.value.path) : ve({}, T);
  }
  function $(T, z) {
    if (c !== T) return Fn(8, { from: z, to: T });
  }
  function w(T) {
    return L(T);
  }
  function H(T) {
    return w(ve(E(T), { replace: !0 }));
  }
  function D(T) {
    const z = T.matched[T.matched.length - 1];
    if (z && z.redirect) {
      const { redirect: B } = z;
      let Q = typeof B == "function" ? B(T) : B;
      return (
        typeof Q == "string" &&
          ((Q = Q.includes("?") || Q.includes("#") ? (Q = E(Q)) : { path: Q }),
          (Q.params = {})),
        ve(
          { query: T.query, hash: T.hash, params: "path" in Q ? {} : T.params },
          Q,
        )
      );
    }
  }
  function L(T, z) {
    const B = (c = _(T)),
      Q = l.value,
      ue = T.state,
      p = T.force,
      h = T.replace === !0,
      b = D(B);
    if (b)
      return L(
        ve(E(b), {
          state: typeof b == "object" ? ve({}, ue, b.state) : ue,
          force: p,
          replace: h,
        }),
        z || B,
      );
    const C = B;
    C.redirectedFrom = z;
    let M;
    return (
      !p && Iv(r, Q, B) && ((M = Fn(16, { to: C, from: Q })), Be(Q, Q, !0, !1)),
      (M ? Promise.resolve(M) : W(C, Q))
        .catch((S) => (Pt(S) ? (Pt(S, 2) ? S : xe(S)) : V(S, C, Q)))
        .then((S) => {
          if (S) {
            if (Pt(S, 2))
              return L(
                ve({ replace: h }, E(S.to), {
                  state: typeof S.to == "object" ? ve({}, ue, S.to.state) : ue,
                  force: p,
                }),
                z || C,
              );
          } else S = x(C, Q, !0, h, ue);
          return I(C, Q, S), S;
        })
    );
  }
  function R(T, z) {
    const B = $(T, z);
    return B ? Promise.reject(B) : Promise.resolve();
  }
  function q(T) {
    const z = Ke.values().next().value;
    return z && typeof z.runWithContext == "function"
      ? z.runWithContext(T)
      : T();
  }
  function W(T, z) {
    let B;
    const [Q, ue, p] = A1(T, z);
    B = Bo(Q.reverse(), "beforeRouteLeave", T, z);
    for (const b of Q)
      b.leaveGuards.forEach((C) => {
        B.push(zt(C, T, z));
      });
    const h = R.bind(null, T, z);
    return (
      B.push(h),
      Oe(B)
        .then(() => {
          B = [];
          for (const b of s.list()) B.push(zt(b, T, z));
          return B.push(h), Oe(B);
        })
        .then(() => {
          B = Bo(ue, "beforeRouteUpdate", T, z);
          for (const b of ue)
            b.updateGuards.forEach((C) => {
              B.push(zt(C, T, z));
            });
          return B.push(h), Oe(B);
        })
        .then(() => {
          B = [];
          for (const b of p)
            if (b.beforeEnter)
              if (vt(b.beforeEnter))
                for (const C of b.beforeEnter) B.push(zt(C, T, z));
              else B.push(zt(b.beforeEnter, T, z));
          return B.push(h), Oe(B);
        })
        .then(
          () => (
            T.matched.forEach((b) => (b.enterCallbacks = {})),
            (B = Bo(p, "beforeRouteEnter", T, z)),
            B.push(h),
            Oe(B)
          ),
        )
        .then(() => {
          B = [];
          for (const b of i.list()) B.push(zt(b, T, z));
          return B.push(h), Oe(B);
        })
        .catch((b) => (Pt(b, 8) ? b : Promise.reject(b)))
    );
  }
  function I(T, z, B) {
    a.list().forEach((Q) => q(() => Q(T, z, B)));
  }
  function x(T, z, B, Q, ue) {
    const p = $(T, z);
    if (p) return p;
    const h = z === Bt,
      b = _n ? history.state : {};
    B &&
      (Q || h
        ? o.replace(T.fullPath, ve({ scroll: h && b && b.scroll }, ue))
        : o.push(T.fullPath, ue)),
      (l.value = T),
      Be(T, z, B, h),
      xe();
  }
  let k;
  function X() {
    k ||
      (k = o.listen((T, z, B) => {
        if (!Ue.listening) return;
        const Q = _(T),
          ue = D(Q);
        if (ue) {
          L(ve(ue, { replace: !0 }), Q).catch(Yn);
          return;
        }
        c = Q;
        const p = l.value;
        _n && jv(Pa(p.fullPath, B.delta), bo()),
          W(Q, p)
            .catch((h) =>
              Pt(h, 12)
                ? h
                : Pt(h, 2)
                ? (L(h.to, Q)
                    .then((b) => {
                      Pt(b, 20) &&
                        !B.delta &&
                        B.type === hr.pop &&
                        o.go(-1, !1);
                    })
                    .catch(Yn),
                  Promise.reject())
                : (B.delta && o.go(-B.delta, !1), V(h, Q, p)),
            )
            .then((h) => {
              (h = h || x(Q, p, !1)),
                h &&
                  (B.delta && !Pt(h, 8)
                    ? o.go(-B.delta, !1)
                    : B.type === hr.pop && Pt(h, 20) && o.go(-1, !1)),
                I(Q, p, h);
            })
            .catch(Yn);
      }));
  }
  let ne = zn(),
    j = zn(),
    P;
  function V(T, z, B) {
    xe(T);
    const Q = j.list();
    return (
      Q.length ? Q.forEach((ue) => ue(T, z, B)) : console.error(T),
      Promise.reject(T)
    );
  }
  function ce() {
    return P && l.value !== Bt
      ? Promise.resolve()
      : new Promise((T, z) => {
          ne.add([T, z]);
        });
  }
  function xe(T) {
    return (
      P ||
        ((P = !T),
        X(),
        ne.list().forEach(([z, B]) => (T ? B(T) : z())),
        ne.reset()),
      T
    );
  }
  function Be(T, z, B, Q) {
    const { scrollBehavior: ue } = e;
    if (!_n || !ue) return Promise.resolve();
    const p =
      (!B && Dv(Pa(T.fullPath, 0))) ||
      ((Q || !B) && history.state && history.state.scroll) ||
      null;
    return On()
      .then(() => ue(T, z, p))
      .then((h) => h && Hv(h))
      .catch((h) => V(h, T, z));
  }
  const Se = (T) => o.go(T);
  let ft;
  const Ke = new Set(),
    Ue = {
      currentRoute: l,
      listening: !0,
      addRoute: m,
      removeRoute: v,
      hasRoute: y,
      getRoutes: g,
      resolve: _,
      options: e,
      push: w,
      replace: H,
      go: Se,
      back: () => Se(-1),
      forward: () => Se(1),
      beforeEach: s.add,
      beforeResolve: i.add,
      afterEach: a.add,
      onError: j.add,
      isReady: ce,
      install(T) {
        const z = this;
        T.component("RouterLink", C1),
          T.component("RouterView", P1),
          (T.config.globalProperties.$router = z),
          Object.defineProperty(T.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => O(l),
          }),
          _n &&
            !ft &&
            l.value === Bt &&
            ((ft = !0), w(o.location).catch((ue) => {}));
        const B = {};
        for (const ue in Bt)
          Object.defineProperty(B, ue, {
            get: () => l.value[ue],
            enumerable: !0,
          });
        T.provide(Gs, z), T.provide(qc, ll(B)), T.provide(rs, l);
        const Q = T.unmount;
        Ke.add(T),
          (T.unmount = function () {
            Ke.delete(T),
              Ke.size < 1 &&
                ((c = Bt),
                k && k(),
                (k = null),
                (l.value = Bt),
                (ft = !1),
                (P = !1)),
              Q();
          });
      },
    };
  function Oe(T) {
    return T.reduce((z, B) => z.then(() => q(B)), Promise.resolve());
  }
  return Ue;
}
function A1(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const a = t.matched[i];
    a && (e.matched.find((c) => kn(c, a)) ? r.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((c) => kn(c, l)) || o.push(l));
  }
  return [n, r, o];
}
const R1 = () => Zs(() => import("./home-36656773.js"), []),
  I1 = () =>
    Zs(
      () => import("./house-bc43e82b.js"),
      [
        "assets/house-bc43e82b.js",
        "assets/formula-930c67ab.js",
        "assets/formula-07fef71c.css",
        "assets/house-b9c4a858.css",
      ],
    ),
  $1 = () =>
    Zs(
      () => import("./money-de3a07f2.js"),
      [
        "assets/money-de3a07f2.js",
        "assets/formula-930c67ab.js",
        "assets/formula-07fef71c.css",
        "assets/money-3e6e520f.css",
      ],
    ),
  Js = S1({
    history: Wv("/"),
    routes: [
      { path: "/", redirect: "/info" },
      { path: "/info", name: "info", component: R1 },
      { path: "/house", name: "house", component: I1 },
      { path: "/money", name: "money", component: $1 },
    ],
  });
Js.beforeEach((e, t, n) => {
  n();
});
Js.onError((e, t, n) => {
  console.log("router.onError", e, t, n);
  const r = /Loading chunk (\d)+ failed/g;
  e.match(r) || e.message.match(r) ? window.location.reload() : console.log(e);
});
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const k1 = Symbol();
var za;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(za || (za = {}));
function F1() {
  const e = au(!0),
    t = e.run(() => te({}));
  let n = [],
    r = [];
  const o = ms({
    install(s) {
      (o._a = s),
        s.provide(k1, o),
        (s.config.globalProperties.$pinia = o),
        r.forEach((i) => n.push(i)),
        (r = []);
    },
    use(s) {
      return !this._a && !Ad ? r.push(s) : n.push(s), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return o;
}
const Ys = Pd(Tv);
Ys.use(Js);
Ys.use(F1());
Ys.mount("#app");
export {
  r_ as $,
  lp as A,
  he as B,
  Jd as C,
  On as D,
  et as E,
  Fe as F,
  un as G,
  rt as H,
  Ml as I,
  Te as J,
  B1 as K,
  ar as L,
  me as M,
  _r as N,
  Yr as O,
  X1 as P,
  W1 as Q,
  zs as R,
  fe as S,
  vr as T,
  _t as U,
  om as V,
  L1 as W,
  Za as X,
  Zh as Y,
  _s as Z,
  xv as _,
  Ce as a,
  J1 as a0,
  re as a1,
  N1 as a2,
  op as a3,
  Jc as a4,
  Ve as a5,
  pe as a6,
  Mc as a7,
  Tc as a8,
  Sr as a9,
  Yo as aA,
  Rs as aB,
  o_ as aC,
  da as aD,
  Y as aE,
  ec as aF,
  Z1 as aG,
  K1 as aH,
  z1 as aI,
  n_ as aJ,
  e_ as aK,
  ur as aL,
  fn as aM,
  De as aN,
  gr as aO,
  mh as aP,
  kg as aQ,
  Vp as aa,
  wp as ab,
  ks as ac,
  Hd as ad,
  Sl as ae,
  H1 as af,
  j1 as ag,
  V1 as ah,
  U1 as ai,
  D1 as aj,
  dn as ak,
  Qn as al,
  Gu as am,
  Ju as an,
  zr as ao,
  Mn as ap,
  qh as aq,
  Q1 as ar,
  G1 as as,
  Y1 as at,
  Ip as au,
  t_ as av,
  _f as aw,
  q1 as ax,
  Pl as ay,
  so as az,
  $e as b,
  U as c,
  ot as d,
  ke as e,
  ie as f,
  Pe as g,
  Cn as h,
  gt as i,
  bn as j,
  oe as k,
  nt as l,
  Es as m,
  ye as n,
  ut as o,
  Qe as p,
  cn as q,
  te as r,
  _e as s,
  Xr as t,
  O as u,
  Xl as v,
  we as w,
  ae as x,
  be as y,
  fr as z,
};
