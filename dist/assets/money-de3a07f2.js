import {
  Z as Pe,
  ao as $e,
  ap as ke,
  d as J,
  y as le,
  aq as fe,
  f as L,
  a as ne,
  t as oe,
  g as W,
  r as p,
  B as M,
  D as re,
  C as me,
  k as q,
  s as ce,
  p as pe,
  u as I,
  q as Be,
  e as _e,
  U as X,
  ar as Ve,
  as as Re,
  c as K,
  H as ye,
  I as Oe,
  x as t,
  R as H,
  at as ze,
  au as Ie,
  P as Ae,
  a5 as G,
  Y as Me,
  E as Fe,
  J as ae,
  av as Le,
  a3 as ue,
  a6 as Ue,
  z as De,
  aw as qe,
  ax as de,
  G as he,
  ay as Ke,
  m as He,
  v as Ge,
  L as se,
  N as Je,
  ak as We,
  l as be,
  w as v,
  n as V,
  al as R,
  X as D,
  am as Xe,
  an as Ye,
  _ as je,
} from "./index-21a22da7.js";
import {
  J as A,
  z as ge,
  K as Ze,
  L as Qe,
  E as et,
  G as tt,
  H as at,
  B as st,
  I as lt,
  D as nt,
} from "./formula-930c67ab.js";
const ot = (e, c, n) =>
    $e(e.subTree)
      .filter((a) => {
        var r;
        return (
          ke(a) &&
          ((r = a.type) == null ? void 0 : r.name) === c &&
          !!a.component
        );
      })
      .map((a) => a.component.uid)
      .map((a) => n[a])
      .filter((a) => !!a),
  rt = (e, c) => {
    const n = {},
      h = Pe([]);
    return {
      children: h,
      addChild: (r) => {
        (n[r.uid] = r), (h.value = ot(e, c, n));
      },
      removeChild: (r) => {
        delete n[r], (h.value = h.value.filter((S) => S.uid !== r));
      },
    };
  },
  Y = Symbol("tabsRootContextKey"),
  ct = J({ tabs: { type: le(Array), default: () => fe([]) } }),
  Ne = "ElTabBar",
  it = L({ name: Ne }),
  ut = L({
    ...it,
    props: ct,
    setup(e, { expose: c }) {
      const n = e,
        h = X(),
        i = ne(Y);
      i || oe(Ne, "<el-tabs><el-tab-bar /></el-tabs>");
      const a = W("tabs"),
        r = p(),
        S = p(),
        f = () => {
          let _ = 0,
            b = 0;
          const s = ["top", "bottom"].includes(i.props.tabPosition)
              ? "width"
              : "height",
            o = s === "width" ? "x" : "y",
            N = o === "x" ? "left" : "top";
          return (
            n.tabs.every((T) => {
              var l, y;
              const C =
                (y = (l = h.parent) == null ? void 0 : l.refs) == null
                  ? void 0
                  : y[`tab-${T.uid}`];
              if (!C) return !1;
              if (!T.active) return !0;
              (_ = C[`offset${A(N)}`]), (b = C[`client${A(s)}`]);
              const w = window.getComputedStyle(C);
              return (
                s === "width" &&
                  (n.tabs.length > 1 &&
                    (b -=
                      Number.parseFloat(w.paddingLeft) +
                      Number.parseFloat(w.paddingRight)),
                  (_ += Number.parseFloat(w.paddingLeft))),
                !1
              );
            }),
            { [s]: `${b}px`, transform: `translate${A(o)}(${_}px)` }
          );
        },
        g = () => (S.value = f());
      return (
        M(
          () => n.tabs,
          async () => {
            await re(), g();
          },
          { immediate: !0 },
        ),
        me(r, () => g()),
        c({ ref: r, update: g }),
        (_, b) => (
          q(),
          ce(
            "div",
            {
              ref_key: "barRef",
              ref: r,
              class: pe([
                I(a).e("active-bar"),
                I(a).is(I(i).props.tabPosition),
              ]),
              style: Be(S.value),
            },
            null,
            6,
          )
        )
      );
    },
  });
var dt = _e(ut, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue",
  ],
]);
const bt = J({
    panes: { type: le(Array), default: () => fe([]) },
    currentName: { type: [String, Number], default: "" },
    editable: Boolean,
    type: { type: String, values: ["card", "border-card", ""], default: "" },
    stretch: Boolean,
  }),
  vt = {
    tabClick: (e, c, n) => n instanceof Event,
    tabRemove: (e, c) => c instanceof Event,
  },
  ve = "ElTabNav",
  ft = L({
    name: ve,
    props: bt,
    emits: vt,
    setup(e, { expose: c, emit: n }) {
      const h = X(),
        i = ne(Y);
      i || oe(ve, "<el-tabs><tab-nav /></el-tabs>");
      const a = W("tabs"),
        r = Ve(),
        S = Re(),
        f = p(),
        g = p(),
        _ = p(),
        b = p(),
        s = p(!1),
        o = p(0),
        N = p(!1),
        T = p(!0),
        l = K(() =>
          ["top", "bottom"].includes(i.props.tabPosition) ? "width" : "height",
        ),
        y = K(() => ({
          transform: `translate${l.value === "width" ? "X" : "Y"}(-${
            o.value
          }px)`,
        })),
        C = () => {
          if (!f.value) return;
          const d = f.value[`offset${A(l.value)}`],
            m = o.value;
          if (!m) return;
          const u = m > d ? m - d : 0;
          o.value = u;
        },
        w = () => {
          if (!f.value || !g.value) return;
          const d = g.value[`offset${A(l.value)}`],
            m = f.value[`offset${A(l.value)}`],
            u = o.value;
          if (d - u <= m) return;
          const $ = d - u > m * 2 ? u + m : d - m;
          o.value = $;
        },
        z = async () => {
          const d = g.value;
          if (!s.value || !_.value || !f.value || !d) return;
          await re();
          const m = _.value.querySelector(".is-active");
          if (!m) return;
          const u = f.value,
            $ = ["top", "bottom"].includes(i.props.tabPosition),
            k = m.getBoundingClientRect(),
            E = u.getBoundingClientRect(),
            O = $ ? d.offsetWidth - E.width : d.offsetHeight - E.height,
            B = o.value;
          let x = B;
          $
            ? (k.left < E.left && (x = B - (E.left - k.left)),
              k.right > E.right && (x = B + k.right - E.right))
            : (k.top < E.top && (x = B - (E.top - k.top)),
              k.bottom > E.bottom && (x = B + (k.bottom - E.bottom))),
            (x = Math.max(x, 0)),
            (o.value = Math.min(x, O));
        },
        P = () => {
          var d;
          if (!g.value || !f.value) return;
          e.stretch && ((d = b.value) == null || d.update());
          const m = g.value[`offset${A(l.value)}`],
            u = f.value[`offset${A(l.value)}`],
            $ = o.value;
          u < m
            ? ((s.value = s.value || {}),
              (s.value.prev = $),
              (s.value.next = $ + u < m),
              m - $ < u && (o.value = m - u))
            : ((s.value = !1), $ > 0 && (o.value = 0));
        },
        Te = (d) => {
          const m = d.code,
            { up: u, down: $, left: k, right: E } = G;
          if (![u, $, k, E].includes(m)) return;
          const O = Array.from(
              d.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)"),
            ),
            B = O.indexOf(d.target);
          let x;
          m === k || m === u
            ? B === 0
              ? (x = O.length - 1)
              : (x = B - 1)
            : B < O.length - 1
            ? (x = B + 1)
            : (x = 0),
            O[x].focus({ preventScroll: !0 }),
            O[x].click(),
            ie();
        },
        ie = () => {
          T.value && (N.value = !0);
        },
        j = () => (N.value = !1);
      return (
        M(r, (d) => {
          d === "hidden"
            ? (T.value = !1)
            : d === "visible" && setTimeout(() => (T.value = !0), 50);
        }),
        M(S, (d) => {
          d ? setTimeout(() => (T.value = !0), 50) : (T.value = !1);
        }),
        me(_, P),
        ye(() => setTimeout(() => z(), 0)),
        Oe(() => P()),
        c({ scrollToActiveTab: z, removeFocus: j }),
        M(
          () => e.panes,
          () => h.update(),
          { flush: "post", deep: !0 },
        ),
        () => {
          const d = s.value
              ? [
                  t(
                    "span",
                    {
                      class: [a.e("nav-prev"), a.is("disabled", !s.value.prev)],
                      onClick: C,
                    },
                    [t(H, null, { default: () => [t(ze, null, null)] })],
                  ),
                  t(
                    "span",
                    {
                      class: [a.e("nav-next"), a.is("disabled", !s.value.next)],
                      onClick: w,
                    },
                    [t(H, null, { default: () => [t(Ie, null, null)] })],
                  ),
                ]
              : null,
            m = e.panes.map((u, $) => {
              var k, E, O, B;
              const x = u.uid,
                Z = u.props.disabled,
                Q =
                  (E = (k = u.props.name) != null ? k : u.index) != null
                    ? E
                    : `${$}`,
                ee = !Z && (u.isClosable || e.editable);
              u.index = `${$}`;
              const we = ee
                  ? t(
                      H,
                      {
                        class: "is-icon-close",
                        onClick: (F) => n("tabRemove", u, F),
                      },
                      { default: () => [t(Ae, null, null)] },
                    )
                  : null,
                Ee =
                  ((B = (O = u.slots).label) == null ? void 0 : B.call(O)) ||
                  u.props.label,
                Se = !Z && u.active ? 0 : -1;
              return t(
                "div",
                {
                  ref: `tab-${x}`,
                  class: [
                    a.e("item"),
                    a.is(i.props.tabPosition),
                    a.is("active", u.active),
                    a.is("disabled", Z),
                    a.is("closable", ee),
                    a.is("focus", N.value),
                  ],
                  id: `tab-${Q}`,
                  key: `tab-${x}`,
                  "aria-controls": `pane-${Q}`,
                  role: "tab",
                  "aria-selected": u.active,
                  tabindex: Se,
                  onFocus: () => ie(),
                  onBlur: () => j(),
                  onClick: (F) => {
                    j(), n("tabClick", u, Q, F);
                  },
                  onKeydown: (F) => {
                    ee &&
                      (F.code === G.delete || F.code === G.backspace) &&
                      n("tabRemove", u, F);
                  },
                },
                [Ee, we],
              );
            });
          return t(
            "div",
            {
              ref: _,
              class: [
                a.e("nav-wrap"),
                a.is("scrollable", !!s.value),
                a.is(i.props.tabPosition),
              ],
            },
            [
              d,
              t("div", { class: a.e("nav-scroll"), ref: f }, [
                t(
                  "div",
                  {
                    class: [
                      a.e("nav"),
                      a.is(i.props.tabPosition),
                      a.is(
                        "stretch",
                        e.stretch &&
                          ["top", "bottom"].includes(i.props.tabPosition),
                      ),
                    ],
                    ref: g,
                    style: y.value,
                    role: "tablist",
                    onKeydown: Te,
                  },
                  [
                    e.type ? null : t(dt, { ref: b, tabs: [...e.panes] }, null),
                    m,
                  ],
                ),
              ]),
            ],
          );
        }
      );
    },
  }),
  mt = J({
    type: { type: String, values: ["card", "border-card", ""], default: "" },
    activeName: { type: [String, Number] },
    closable: Boolean,
    addable: Boolean,
    modelValue: { type: [String, Number] },
    editable: Boolean,
    tabPosition: {
      type: String,
      values: ["top", "right", "bottom", "left"],
      default: "top",
    },
    beforeLeave: { type: le(Function), default: () => !0 },
    stretch: Boolean,
  }),
  te = (e) => Ue(e) || De(e),
  pt = {
    [ge]: (e) => te(e),
    tabClick: (e, c) => c instanceof Event,
    tabChange: (e) => te(e),
    edit: (e, c) => ["remove", "add"].includes(c),
    tabRemove: (e) => te(e),
    tabAdd: () => !0,
  },
  _t = L({
    name: "ElTabs",
    props: mt,
    emits: pt,
    setup(e, { emit: c, slots: n, expose: h }) {
      var i, a;
      const r = W("tabs"),
        { children: S, addChild: f, removeChild: g } = rt(X(), "ElTabPane"),
        _ = p(),
        b = p(
          (a = (i = e.modelValue) != null ? i : e.activeName) != null ? a : "0",
        ),
        s = async (l, y = !1) => {
          var C, w, z;
          if (!(b.value === l || ue(l)))
            try {
              (await ((C = e.beforeLeave) == null
                ? void 0
                : C.call(e, l, b.value))) !== !1 &&
                ((b.value = l),
                y && (c(ge, l), c("tabChange", l)),
                (z = (w = _.value) == null ? void 0 : w.removeFocus) == null ||
                  z.call(w));
            } catch {}
        },
        o = (l, y, C) => {
          l.props.disabled || (s(y, !0), c("tabClick", l, C));
        },
        N = (l, y) => {
          l.props.disabled ||
            ue(l.props.name) ||
            (y.stopPropagation(),
            c("edit", l.props.name, "remove"),
            c("tabRemove", l.props.name));
        },
        T = () => {
          c("edit", void 0, "add"), c("tabAdd");
        };
      return (
        Me(
          {
            from: '"activeName"',
            replacement: '"model-value" or "v-model"',
            scope: "ElTabs",
            version: "2.3.0",
            ref: "https://element-plus.org/en-US/component/tabs.html#attributes",
            type: "Attribute",
          },
          K(() => !!e.activeName),
        ),
        M(
          () => e.activeName,
          (l) => s(l),
        ),
        M(
          () => e.modelValue,
          (l) => s(l),
        ),
        M(b, async () => {
          var l;
          await re(), (l = _.value) == null || l.scrollToActiveTab();
        }),
        Fe(Y, { props: e, currentName: b, registerPane: f, unregisterPane: g }),
        h({ currentName: b }),
        () => {
          const l = n.addIcon,
            y =
              e.editable || e.addable
                ? t(
                    "span",
                    {
                      class: r.e("new-tab"),
                      tabindex: "0",
                      onClick: T,
                      onKeydown: (z) => {
                        z.code === G.enter && T();
                      },
                    },
                    [
                      l
                        ? ae(n, "addIcon")
                        : t(
                            H,
                            { class: r.is("icon-plus") },
                            { default: () => [t(Le, null, null)] },
                          ),
                    ],
                  )
                : null,
            C = t("div", { class: [r.e("header"), r.is(e.tabPosition)] }, [
              y,
              t(
                ft,
                {
                  ref: _,
                  currentName: b.value,
                  editable: e.editable,
                  type: e.type,
                  panes: S.value,
                  stretch: e.stretch,
                  onTabClick: o,
                  onTabRemove: N,
                },
                null,
              ),
            ]),
            w = t("div", { class: r.e("content") }, [ae(n, "default")]);
          return t(
            "div",
            {
              class: [
                r.b(),
                r.m(e.tabPosition),
                {
                  [r.m("card")]: e.type === "card",
                  [r.m("border-card")]: e.type === "border-card",
                },
              ],
            },
            [...(e.tabPosition !== "bottom" ? [C, w] : [w, C])],
          );
        }
      );
    },
  }),
  yt = J({
    label: { type: String, default: "" },
    name: { type: [String, Number] },
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean,
  }),
  ht = ["id", "aria-hidden", "aria-labelledby"],
  xe = "ElTabPane",
  gt = L({ name: xe }),
  Nt = L({
    ...gt,
    props: yt,
    setup(e) {
      const c = e,
        n = X(),
        h = qe(),
        i = ne(Y);
      i || oe(xe, "usage: <el-tabs><el-tab-pane /></el-tabs/>");
      const a = W("tab-pane"),
        r = p(),
        S = K(() => c.closable || i.props.closable),
        f = de(() => {
          var o;
          return i.currentName.value === ((o = c.name) != null ? o : r.value);
        }),
        g = p(f.value),
        _ = K(() => {
          var o;
          return (o = c.name) != null ? o : r.value;
        }),
        b = de(() => !c.lazy || g.value || f.value);
      M(f, (o) => {
        o && (g.value = !0);
      });
      const s = he({
        uid: n.uid,
        slots: h,
        props: c,
        paneName: _,
        active: f,
        index: r,
        isClosable: S,
      });
      return (
        ye(() => {
          i.registerPane(s);
        }),
        Ke(() => {
          i.unregisterPane(s.uid);
        }),
        (o, N) =>
          I(b)
            ? He(
                (q(),
                ce(
                  "div",
                  {
                    key: 0,
                    id: `pane-${I(_)}`,
                    class: pe(I(a).b()),
                    role: "tabpanel",
                    "aria-hidden": !I(f),
                    "aria-labelledby": `tab-${I(_)}`,
                  },
                  [ae(o.$slots, "default")],
                  10,
                  ht,
                )),
                [[Ge, I(f)]],
              )
            : se("v-if", !0)
      );
    },
  });
var Ce = _e(Nt, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue",
  ],
]);
const xt = Je(_t, { TabPane: Ce }),
  Ct = We(Ce);
const U = (e) => (Xe("data-v-db756302"), (e = e()), Ye(), e),
  Tt = { class: "content" },
  wt = U(() => V("div", { class: "card-header" }, "定投收益如下", -1)),
  Et = { class: "mb-2" },
  St = U(() => V("span", { class: "tip-text" }, "总收益：", -1)),
  Pt = { class: "mb-2" },
  $t = U(() => V("span", { class: "tip-text" }, "收益：", -1)),
  kt = U(() => V("span", { class: "tip-text" }, "本金：", -1)),
  Bt = U(() =>
    V(
      "p",
      { class: "font-des" },
      " 例如第一年收益100%，第二年收益-50%：则可以输入100，-50。此时收益为0，算术均值收益为25%，几何均值为0%。 ",
      -1,
    ),
  ),
  Vt = { key: 0 },
  Rt = { class: "mb-2" },
  Ot = U(() => V("span", { class: "tip-text" }, "几何均值：", -1)),
  zt = { class: "mb-2" },
  It = U(() => V("span", { class: "tip-text" }, "算术均值：", -1)),
  At = L({
    __name: "money",
    setup(e) {
      const c = p("investment"),
        n = he({ account: "", year: "", rate: "" }),
        h = p(),
        i = p({ principal: "", returns: "", year: 0 }),
        a = p(""),
        r = p(0),
        S = p(0);
      function f() {
        h.value &&
          h.value.validate((b) => {
            if (b)
              (i.value = Ze(Number(n.year), Number(n.rate), Number(n.account))),
                console.log("111", i.value);
            else return console.log("error submit!"), !1;
          });
      }
      function g() {
        (n.account = ""), (n.year = ""), (n.rate = "");
      }
      function _() {
        const b = a.value.split(",");
        if (
          (console.log("list", b),
          b.every((s) => typeof s == "string" && !isNaN(Number(s))))
        ) {
          const s = b.map((o) => Number(o));
          (S.value = s.reduce((o, N) => o + N, 0) / s.length),
            (r.value = Qe(s) || 0);
        }
      }
      return (b, s) => {
        const o = et,
          N = tt,
          T = at,
          l = st,
          y = lt,
          C = nt,
          w = Ct,
          z = xt;
        return (
          q(),
          be(
            z,
            {
              modelValue: c.value,
              "onUpdate:modelValue": s[4] || (s[4] = (P) => (c.value = P)),
              class: "demo-tabs",
            },
            {
              default: v(() => [
                t(
                  w,
                  { label: "定投计算", name: "investment" },
                  {
                    default: v(() => [
                      V("div", Tt, [
                        t(
                          l,
                          {
                            "label-width": "120px",
                            ref_key: "formRef",
                            ref: h,
                            model: n,
                          },
                          {
                            default: v(() => [
                              t(
                                N,
                                {
                                  label: "每月定投金额",
                                  prop: "account",
                                  rules: [
                                    { required: !0, message: "请先输入金额" },
                                    {
                                      type: "number",
                                      message: "请输入正确的格式",
                                    },
                                  ],
                                },
                                {
                                  default: v(() => [
                                    t(
                                      o,
                                      {
                                        modelValue: n.account,
                                        "onUpdate:modelValue":
                                          s[0] ||
                                          (s[0] = (P) => (n.account = P)),
                                        modelModifiers: { number: !0 },
                                      },
                                      { append: v(() => [R("元")]), _: 1 },
                                      8,
                                      ["modelValue"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              t(
                                N,
                                {
                                  label: "定投年限",
                                  prop: "year",
                                  rules: [
                                    { required: !0, message: "请先输入年限" },
                                    {
                                      type: "number",
                                      message: "请输入正确的格式",
                                    },
                                  ],
                                },
                                {
                                  default: v(() => [
                                    t(
                                      o,
                                      {
                                        modelValue: n.year,
                                        "onUpdate:modelValue":
                                          s[1] || (s[1] = (P) => (n.year = P)),
                                        modelModifiers: { number: !0 },
                                      },
                                      { append: v(() => [R("年")]), _: 1 },
                                      8,
                                      ["modelValue"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              t(
                                N,
                                {
                                  label: "预期年化收益",
                                  prop: "rate",
                                  rules: [
                                    {
                                      required: !0,
                                      message: "请先输入年化收益",
                                    },
                                    {
                                      type: "number",
                                      message: "请输入正确的格式",
                                    },
                                  ],
                                },
                                {
                                  default: v(() => [
                                    t(
                                      o,
                                      {
                                        modelValue: n.rate,
                                        "onUpdate:modelValue":
                                          s[2] || (s[2] = (P) => (n.rate = P)),
                                        modelModifiers: { number: !0 },
                                      },
                                      { append: v(() => [R("%")]), _: 1 },
                                      8,
                                      ["modelValue"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              t(N, null, {
                                default: v(() => [
                                  t(
                                    T,
                                    { type: "primary", onClick: f },
                                    { default: v(() => [R("计算")]), _: 1 },
                                  ),
                                  t(
                                    T,
                                    { onClick: g },
                                    { default: v(() => [R("清空")]), _: 1 },
                                  ),
                                ]),
                                _: 1,
                              }),
                            ]),
                            _: 1,
                          },
                          8,
                          ["model"],
                        ),
                        i.value.principal
                          ? (q(),
                            be(
                              C,
                              { key: 0, class: "box-card" },
                              {
                                header: v(() => [wt]),
                                default: v(() => [
                                  V("div", Et, [
                                    St,
                                    t(
                                      y,
                                      {
                                        class: "mx-1 font-bold",
                                        type: "primary",
                                      },
                                      {
                                        default: v(() => [
                                          R(D(i.value.principal) + "元", 1),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                  V("div", Pt, [
                                    $t,
                                    t(
                                      y,
                                      {
                                        class: "mx-1 font-bold",
                                        type: "primary",
                                      },
                                      {
                                        default: v(() => [
                                          R(D(i.value.returns) + "元", 1),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                  V("div", null, [
                                    kt,
                                    t(
                                      y,
                                      {
                                        class: "mx-1 font-bold",
                                        type: "primary",
                                      },
                                      {
                                        default: v(() => [
                                          R(
                                            D(
                                              i.value.principal -
                                                i.value.returns,
                                            ) + "元",
                                            1,
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                ]),
                                _: 1,
                              },
                            ))
                          : se("", !0),
                      ]),
                    ]),
                    _: 1,
                  },
                ),
                t(
                  w,
                  { label: "收益计算", name: "income" },
                  {
                    default: v(() => [
                      t(l, null, {
                        default: v(() => [
                          t(
                            N,
                            { label: "历年收益" },
                            {
                              default: v(() => [
                                t(
                                  o,
                                  {
                                    modelValue: a.value,
                                    "onUpdate:modelValue":
                                      s[3] || (s[3] = (P) => (a.value = P)),
                                    placeholder: "收益请用英文逗号分隔",
                                  },
                                  null,
                                  8,
                                  ["modelValue"],
                                ),
                                Bt,
                              ]),
                              _: 1,
                            },
                          ),
                          t(N, null, {
                            default: v(() => [
                              t(
                                T,
                                { type: "primary", onClick: _ },
                                { default: v(() => [R("计算")]), _: 1 },
                              ),
                            ]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }),
                      r.value || S.value
                        ? (q(),
                          ce("div", Vt, [
                            V("div", Rt, [
                              Ot,
                              t(
                                y,
                                { class: "mx-1 font-bold", type: "primary" },
                                {
                                  default: v(() => [R(D(r.value) + "%", 1)]),
                                  _: 1,
                                },
                              ),
                            ]),
                            V("div", zt, [
                              It,
                              t(
                                y,
                                { class: "mx-1 font-bold", type: "primary" },
                                {
                                  default: v(() => [R(D(S.value) + "%", 1)]),
                                  _: 1,
                                },
                              ),
                            ]),
                          ]))
                        : se("", !0),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            },
            8,
            ["modelValue"],
          )
        );
      };
    },
  });
const Lt = je(At, [["__scopeId", "data-v-db756302"]]);
export { Lt as default };
