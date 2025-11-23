"use client";
import { j as r } from "./jsx-runtime-0-JxQnzY.js";
import { r as s } from "./index--tQcscZa.js";
import { B as Ve } from "./Button-DSOQhk0m.js";
import {
  c as Ue,
  d as we,
  P as O,
  a as h,
  h as no,
  e as oo,
  u as ne,
  b as qe,
} from "./index-jG1cqCvV.js";
import { u as U, c as Xe } from "./index-CJkT59yQ.js";
import { c as ro, u as to } from "./index-ghU8WpXh.js";
import { D as ao } from "./index-D8ovs0-6.js";
import { P as so, h as co, u as io, R as uo, F as lo } from "./Combination-DplBdLRn.js";
import { c as Ye, R as ze, A as po, C as fo, a as mo } from "./index-CrPJtfnE.js";
import { P as ae } from "./index-yb7JCnm7.js";
import { c as We, I as Mo, R as ho } from "./index-BUCLlBN1.js";
import { c as b } from "./utils-CyawMXzk.js";
import { C as wo } from "./chevron-right-FuoWzis5.js";
import { C as _o } from "./check-C5Q_mpzF.js";
import { c as go } from "./createLucideIcon-CD2Sj3SA.js";
import "./index-DDxmA3Og.js";
import "./index-Dp35_cgR.js";
import "./index-pvjnvxJ7.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xo = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]],
  vo = go("Circle", xo);
var pe = ["Enter", " "],
  yo = ["ArrowDown", "PageUp", "Home"],
  He = ["ArrowUp", "PageDown", "End"],
  Do = [...yo, ...He],
  Co = { ltr: [...pe, "ArrowRight"], rtl: [...pe, "ArrowLeft"] },
  bo = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  q = "Menu",
  [F, Io, No] = ro(q),
  [j, Qe] = Ue(q, [No, Ye, We]),
  X = Ye(),
  Ze = We(),
  [Je, S] = j(q),
  [So, Y] = j(q),
  en = (e) => {
    const { __scopeMenu: o, open: n = !1, children: t, dir: a, onOpenChange: c, modal: i = !0 } = e,
      u = X(o),
      [m, M] = s.useState(null),
      p = s.useRef(!1),
      d = we(c),
      f = to(a);
    return (
      s.useEffect(() => {
        const _ = () => {
            ((p.current = !0),
              document.addEventListener("pointerdown", w, { capture: !0, once: !0 }),
              document.addEventListener("pointermove", w, { capture: !0, once: !0 }));
          },
          w = () => (p.current = !1);
        return (
          document.addEventListener("keydown", _, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", _, { capture: !0 }),
              document.removeEventListener("pointerdown", w, { capture: !0 }),
              document.removeEventListener("pointermove", w, { capture: !0 }));
          }
        );
      }, []),
      r.jsx(ze, {
        ...u,
        children: r.jsx(Je, {
          scope: o,
          open: n,
          onOpenChange: d,
          content: m,
          onContentChange: M,
          children: r.jsx(So, {
            scope: o,
            onClose: s.useCallback(() => d(!1), [d]),
            isUsingKeyboardRef: p,
            dir: f,
            modal: i,
            children: t,
          }),
        }),
      })
    );
  };
en.displayName = q;
var Ro = "MenuAnchor",
  _e = s.forwardRef((e, o) => {
    const { __scopeMenu: n, ...t } = e,
      a = X(n);
    return r.jsx(po, { ...a, ...t, ref: o });
  });
_e.displayName = Ro;
var ge = "MenuPortal",
  [Po, nn] = j(ge, { forceMount: void 0 }),
  on = (e) => {
    const { __scopeMenu: o, forceMount: n, children: t, container: a } = e,
      c = S(ge, o);
    return r.jsx(Po, {
      scope: o,
      forceMount: n,
      children: r.jsx(ae, {
        present: n || c.open,
        children: r.jsx(so, { asChild: !0, container: a, children: t }),
      }),
    });
  };
on.displayName = ge;
var y = "MenuContent",
  [jo, xe] = j(y),
  rn = s.forwardRef((e, o) => {
    const n = nn(y, e.__scopeMenu),
      { forceMount: t = n.forceMount, ...a } = e,
      c = S(y, e.__scopeMenu),
      i = Y(y, e.__scopeMenu);
    return r.jsx(F.Provider, {
      scope: e.__scopeMenu,
      children: r.jsx(ae, {
        present: t || c.open,
        children: r.jsx(F.Slot, {
          scope: e.__scopeMenu,
          children: i.modal ? r.jsx(Eo, { ...a, ref: o }) : r.jsx(To, { ...a, ref: o }),
        }),
      }),
    });
  }),
  Eo = s.forwardRef((e, o) => {
    const n = S(y, e.__scopeMenu),
      t = s.useRef(null),
      a = U(o, t);
    return (
      s.useEffect(() => {
        const c = t.current;
        if (c) return co(c);
      }, []),
      r.jsx(ve, {
        ...e,
        ref: a,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: h(e.onFocusOutside, (c) => c.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  To = s.forwardRef((e, o) => {
    const n = S(y, e.__scopeMenu);
    return r.jsx(ve, {
      ...e,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  Ao = oo("MenuContent.ScrollLock"),
  ve = s.forwardRef((e, o) => {
    const {
        __scopeMenu: n,
        loop: t = !1,
        trapFocus: a,
        onOpenAutoFocus: c,
        onCloseAutoFocus: i,
        disableOutsidePointerEvents: u,
        onEntryFocus: m,
        onEscapeKeyDown: M,
        onPointerDownOutside: p,
        onFocusOutside: d,
        onInteractOutside: f,
        onDismiss: _,
        disableOutsideScroll: w,
        ...R
      } = e,
      E = S(y, n),
      k = Y(y, n),
      z = X(n),
      W = Ze(n),
      Ie = Io(n),
      [Wn, Ne] = s.useState(null),
      H = s.useRef(null),
      Hn = U(o, H, E.onContentChange),
      Q = s.useRef(0),
      Z = s.useRef(""),
      Qn = s.useRef(0),
      de = s.useRef(null),
      Se = s.useRef("right"),
      ie = s.useRef(0),
      Zn = w ? uo : s.Fragment,
      Jn = w ? { as: Ao, allowPinchZoom: !0 } : void 0,
      eo = (l) => {
        var A, Pe;
        const x = Z.current + l,
          D = Ie().filter((C) => !C.disabled),
          I = document.activeElement,
          ue = (A = D.find((C) => C.ref.current === I)) == null ? void 0 : A.textValue,
          le = D.map((C) => C.textValue),
          Re = Xo(le, x, ue),
          L = (Pe = D.find((C) => C.textValue === Re)) == null ? void 0 : Pe.ref.current;
        ((function C(je) {
          ((Z.current = je),
            window.clearTimeout(Q.current),
            je !== "" && (Q.current = window.setTimeout(() => C(""), 1e3)));
        })(x),
          L && setTimeout(() => L.focus()));
      };
    (s.useEffect(() => () => window.clearTimeout(Q.current), []), io());
    const T = s.useCallback((l) => {
      var D, I;
      return (
        Se.current === ((D = de.current) == null ? void 0 : D.side) &&
        zo(l, (I = de.current) == null ? void 0 : I.area)
      );
    }, []);
    return r.jsx(jo, {
      scope: n,
      searchRef: Z,
      onItemEnter: s.useCallback(
        (l) => {
          T(l) && l.preventDefault();
        },
        [T],
      ),
      onItemLeave: s.useCallback(
        (l) => {
          var x;
          T(l) || ((x = H.current) == null || x.focus(), Ne(null));
        },
        [T],
      ),
      onTriggerLeave: s.useCallback(
        (l) => {
          T(l) && l.preventDefault();
        },
        [T],
      ),
      pointerGraceTimerRef: Qn,
      onPointerGraceIntentChange: s.useCallback((l) => {
        de.current = l;
      }, []),
      children: r.jsx(Zn, {
        ...Jn,
        children: r.jsx(lo, {
          asChild: !0,
          trapped: a,
          onMountAutoFocus: h(c, (l) => {
            var x;
            (l.preventDefault(), (x = H.current) == null || x.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: i,
          children: r.jsx(ao, {
            asChild: !0,
            disableOutsidePointerEvents: u,
            onEscapeKeyDown: M,
            onPointerDownOutside: p,
            onFocusOutside: d,
            onInteractOutside: f,
            onDismiss: _,
            children: r.jsx(ho, {
              asChild: !0,
              ...W,
              dir: k.dir,
              orientation: "vertical",
              loop: t,
              currentTabStopId: Wn,
              onCurrentTabStopIdChange: Ne,
              onEntryFocus: h(m, (l) => {
                k.isUsingKeyboardRef.current || l.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: r.jsx(fo, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": vn(E.open),
                "data-radix-menu-content": "",
                dir: k.dir,
                ...z,
                ...R,
                ref: Hn,
                style: { outline: "none", ...R.style },
                onKeyDown: h(R.onKeyDown, (l) => {
                  const D = l.target.closest("[data-radix-menu-content]") === l.currentTarget,
                    I = l.ctrlKey || l.altKey || l.metaKey,
                    ue = l.key.length === 1;
                  D && (l.key === "Tab" && l.preventDefault(), !I && ue && eo(l.key));
                  const le = H.current;
                  if (l.target !== le || !Do.includes(l.key)) return;
                  l.preventDefault();
                  const L = Ie()
                    .filter((A) => !A.disabled)
                    .map((A) => A.ref.current);
                  (He.includes(l.key) && L.reverse(), Uo(L));
                }),
                onBlur: h(e.onBlur, (l) => {
                  l.currentTarget.contains(l.target) ||
                    (window.clearTimeout(Q.current), (Z.current = ""));
                }),
                onPointerMove: h(
                  e.onPointerMove,
                  K((l) => {
                    const x = l.target,
                      D = ie.current !== l.clientX;
                    if (l.currentTarget.contains(x) && D) {
                      const I = l.clientX > ie.current ? "right" : "left";
                      ((Se.current = I), (ie.current = l.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
rn.displayName = y;
var Oo = "MenuGroup",
  ye = s.forwardRef((e, o) => {
    const { __scopeMenu: n, ...t } = e;
    return r.jsx(O.div, { role: "group", ...t, ref: o });
  });
ye.displayName = Oo;
var ko = "MenuLabel",
  tn = s.forwardRef((e, o) => {
    const { __scopeMenu: n, ...t } = e;
    return r.jsx(O.div, { ...t, ref: o });
  });
tn.displayName = ko;
var oe = "MenuItem",
  Ee = "menu.itemSelect",
  se = s.forwardRef((e, o) => {
    const { disabled: n = !1, onSelect: t, ...a } = e,
      c = s.useRef(null),
      i = Y(oe, e.__scopeMenu),
      u = xe(oe, e.__scopeMenu),
      m = U(o, c),
      M = s.useRef(!1),
      p = () => {
        const d = c.current;
        if (!n && d) {
          const f = new CustomEvent(Ee, { bubbles: !0, cancelable: !0 });
          (d.addEventListener(Ee, (_) => (t == null ? void 0 : t(_)), { once: !0 }),
            no(d, f),
            f.defaultPrevented ? (M.current = !1) : i.onClose());
        }
      };
    return r.jsx(an, {
      ...a,
      ref: m,
      disabled: n,
      onClick: h(e.onClick, p),
      onPointerDown: (d) => {
        var f;
        ((f = e.onPointerDown) == null || f.call(e, d), (M.current = !0));
      },
      onPointerUp: h(e.onPointerUp, (d) => {
        var f;
        M.current || (f = d.currentTarget) == null || f.click();
      }),
      onKeyDown: h(e.onKeyDown, (d) => {
        const f = u.searchRef.current !== "";
        n ||
          (f && d.key === " ") ||
          (pe.includes(d.key) && (d.currentTarget.click(), d.preventDefault()));
      }),
    });
  });
se.displayName = oe;
var an = s.forwardRef((e, o) => {
    const { __scopeMenu: n, disabled: t = !1, textValue: a, ...c } = e,
      i = xe(oe, n),
      u = Ze(n),
      m = s.useRef(null),
      M = U(o, m),
      [p, d] = s.useState(!1),
      [f, _] = s.useState("");
    return (
      s.useEffect(() => {
        const w = m.current;
        w && _((w.textContent ?? "").trim());
      }, [c.children]),
      r.jsx(F.ItemSlot, {
        scope: n,
        disabled: t,
        textValue: a ?? f,
        children: r.jsx(Mo, {
          asChild: !0,
          ...u,
          focusable: !t,
          children: r.jsx(O.div, {
            role: "menuitem",
            "data-highlighted": p ? "" : void 0,
            "aria-disabled": t || void 0,
            "data-disabled": t ? "" : void 0,
            ...c,
            ref: M,
            onPointerMove: h(
              e.onPointerMove,
              K((w) => {
                t
                  ? i.onItemLeave(w)
                  : (i.onItemEnter(w),
                    w.defaultPrevented || w.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: h(
              e.onPointerLeave,
              K((w) => i.onItemLeave(w)),
            ),
            onFocus: h(e.onFocus, () => d(!0)),
            onBlur: h(e.onBlur, () => d(!1)),
          }),
        }),
      })
    );
  }),
  Lo = "MenuCheckboxItem",
  sn = s.forwardRef((e, o) => {
    const { checked: n = !1, onCheckedChange: t, ...a } = e;
    return r.jsx(pn, {
      scope: e.__scopeMenu,
      checked: n,
      children: r.jsx(se, {
        role: "menuitemcheckbox",
        "aria-checked": re(n) ? "mixed" : n,
        ...a,
        ref: o,
        "data-state": be(n),
        onSelect: h(a.onSelect, () => (t == null ? void 0 : t(re(n) ? !0 : !n)), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
sn.displayName = Lo;
var cn = "MenuRadioGroup",
  [Go, Fo] = j(cn, { value: void 0, onValueChange: () => {} }),
  dn = s.forwardRef((e, o) => {
    const { value: n, onValueChange: t, ...a } = e,
      c = we(t);
    return r.jsx(Go, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: c,
      children: r.jsx(ye, { ...a, ref: o }),
    });
  });
dn.displayName = cn;
var un = "MenuRadioItem",
  ln = s.forwardRef((e, o) => {
    const { value: n, ...t } = e,
      a = Fo(un, e.__scopeMenu),
      c = n === a.value;
    return r.jsx(pn, {
      scope: e.__scopeMenu,
      checked: c,
      children: r.jsx(se, {
        role: "menuitemradio",
        "aria-checked": c,
        ...t,
        ref: o,
        "data-state": be(c),
        onSelect: h(
          t.onSelect,
          () => {
            var i;
            return (i = a.onValueChange) == null ? void 0 : i.call(a, n);
          },
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
ln.displayName = un;
var De = "MenuItemIndicator",
  [pn, Ko] = j(De, { checked: !1 }),
  fn = s.forwardRef((e, o) => {
    const { __scopeMenu: n, forceMount: t, ...a } = e,
      c = Ko(De, n);
    return r.jsx(ae, {
      present: t || re(c.checked) || c.checked === !0,
      children: r.jsx(O.span, { ...a, ref: o, "data-state": be(c.checked) }),
    });
  });
fn.displayName = De;
var $o = "MenuSeparator",
  mn = s.forwardRef((e, o) => {
    const { __scopeMenu: n, ...t } = e;
    return r.jsx(O.div, { role: "separator", "aria-orientation": "horizontal", ...t, ref: o });
  });
mn.displayName = $o;
var Bo = "MenuArrow",
  Mn = s.forwardRef((e, o) => {
    const { __scopeMenu: n, ...t } = e,
      a = X(n);
    return r.jsx(mo, { ...a, ...t, ref: o });
  });
Mn.displayName = Bo;
var Ce = "MenuSub",
  [Vo, hn] = j(Ce),
  wn = (e) => {
    const { __scopeMenu: o, children: n, open: t = !1, onOpenChange: a } = e,
      c = S(Ce, o),
      i = X(o),
      [u, m] = s.useState(null),
      [M, p] = s.useState(null),
      d = we(a);
    return (
      s.useEffect(() => (c.open === !1 && d(!1), () => d(!1)), [c.open, d]),
      r.jsx(ze, {
        ...i,
        children: r.jsx(Je, {
          scope: o,
          open: t,
          onOpenChange: d,
          content: M,
          onContentChange: p,
          children: r.jsx(Vo, {
            scope: o,
            contentId: ne(),
            triggerId: ne(),
            trigger: u,
            onTriggerChange: m,
            children: n,
          }),
        }),
      })
    );
  };
wn.displayName = Ce;
var G = "MenuSubTrigger",
  _n = s.forwardRef((e, o) => {
    const n = S(G, e.__scopeMenu),
      t = Y(G, e.__scopeMenu),
      a = hn(G, e.__scopeMenu),
      c = xe(G, e.__scopeMenu),
      i = s.useRef(null),
      { pointerGraceTimerRef: u, onPointerGraceIntentChange: m } = c,
      M = { __scopeMenu: e.__scopeMenu },
      p = s.useCallback(() => {
        (i.current && window.clearTimeout(i.current), (i.current = null));
      }, []);
    return (
      s.useEffect(() => p, [p]),
      s.useEffect(() => {
        const d = u.current;
        return () => {
          (window.clearTimeout(d), m(null));
        };
      }, [u, m]),
      r.jsx(_e, {
        asChild: !0,
        ...M,
        children: r.jsx(an, {
          id: a.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": a.contentId,
          "data-state": vn(n.open),
          ...e,
          ref: Xe(o, a.onTriggerChange),
          onClick: (d) => {
            var f;
            ((f = e.onClick) == null || f.call(e, d),
              !(e.disabled || d.defaultPrevented) &&
                (d.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: h(
            e.onPointerMove,
            K((d) => {
              (c.onItemEnter(d),
                !d.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !i.current &&
                  (c.onPointerGraceIntentChange(null),
                  (i.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), p());
                  }, 100))));
            }),
          ),
          onPointerLeave: h(
            e.onPointerLeave,
            K((d) => {
              var _, w;
              p();
              const f = (_ = n.content) == null ? void 0 : _.getBoundingClientRect();
              if (f) {
                const R = (w = n.content) == null ? void 0 : w.dataset.side,
                  E = R === "right",
                  k = E ? -5 : 5,
                  z = f[E ? "left" : "right"],
                  W = f[E ? "right" : "left"];
                (c.onPointerGraceIntentChange({
                  area: [
                    { x: d.clientX + k, y: d.clientY },
                    { x: z, y: f.top },
                    { x: W, y: f.top },
                    { x: W, y: f.bottom },
                    { x: z, y: f.bottom },
                  ],
                  side: R,
                }),
                  window.clearTimeout(u.current),
                  (u.current = window.setTimeout(() => c.onPointerGraceIntentChange(null), 300)));
              } else {
                if ((c.onTriggerLeave(d), d.defaultPrevented)) return;
                c.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: h(e.onKeyDown, (d) => {
            var _;
            const f = c.searchRef.current !== "";
            e.disabled ||
              (f && d.key === " ") ||
              (Co[t.dir].includes(d.key) &&
                (n.onOpenChange(!0), (_ = n.content) == null || _.focus(), d.preventDefault()));
          }),
        }),
      })
    );
  });
_n.displayName = G;
var gn = "MenuSubContent",
  xn = s.forwardRef((e, o) => {
    const n = nn(y, e.__scopeMenu),
      { forceMount: t = n.forceMount, ...a } = e,
      c = S(y, e.__scopeMenu),
      i = Y(y, e.__scopeMenu),
      u = hn(gn, e.__scopeMenu),
      m = s.useRef(null),
      M = U(o, m);
    return r.jsx(F.Provider, {
      scope: e.__scopeMenu,
      children: r.jsx(ae, {
        present: t || c.open,
        children: r.jsx(F.Slot, {
          scope: e.__scopeMenu,
          children: r.jsx(ve, {
            id: u.contentId,
            "aria-labelledby": u.triggerId,
            ...a,
            ref: M,
            align: "start",
            side: i.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (p) => {
              var d;
              (i.isUsingKeyboardRef.current && ((d = m.current) == null || d.focus()),
                p.preventDefault());
            },
            onCloseAutoFocus: (p) => p.preventDefault(),
            onFocusOutside: h(e.onFocusOutside, (p) => {
              p.target !== u.trigger && c.onOpenChange(!1);
            }),
            onEscapeKeyDown: h(e.onEscapeKeyDown, (p) => {
              (i.onClose(), p.preventDefault());
            }),
            onKeyDown: h(e.onKeyDown, (p) => {
              var _;
              const d = p.currentTarget.contains(p.target),
                f = bo[i.dir].includes(p.key);
              d &&
                f &&
                (c.onOpenChange(!1), (_ = u.trigger) == null || _.focus(), p.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
xn.displayName = gn;
function vn(e) {
  return e ? "open" : "closed";
}
function re(e) {
  return e === "indeterminate";
}
function be(e) {
  return re(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Uo(e) {
  const o = document.activeElement;
  for (const n of e) if (n === o || (n.focus(), document.activeElement !== o)) return;
}
function qo(e, o) {
  return e.map((n, t) => e[(o + t) % e.length]);
}
function Xo(e, o, n) {
  const a = o.length > 1 && Array.from(o).every((M) => M === o[0]) ? o[0] : o,
    c = n ? e.indexOf(n) : -1;
  let i = qo(e, Math.max(c, 0));
  a.length === 1 && (i = i.filter((M) => M !== n));
  const m = i.find((M) => M.toLowerCase().startsWith(a.toLowerCase()));
  return m !== n ? m : void 0;
}
function Yo(e, o) {
  const { x: n, y: t } = e;
  let a = !1;
  for (let c = 0, i = o.length - 1; c < o.length; i = c++) {
    const u = o[c],
      m = o[i],
      M = u.x,
      p = u.y,
      d = m.x,
      f = m.y;
    p > t != f > t && n < ((d - M) * (t - p)) / (f - p) + M && (a = !a);
  }
  return a;
}
function zo(e, o) {
  if (!o) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Yo(n, o);
}
function K(e) {
  return (o) => (o.pointerType === "mouse" ? e(o) : void 0);
}
var Wo = en,
  Ho = _e,
  Qo = on,
  Zo = rn,
  Jo = ye,
  er = tn,
  nr = se,
  or = sn,
  rr = dn,
  tr = ln,
  ar = fn,
  sr = mn,
  cr = Mn,
  dr = wn,
  ir = _n,
  ur = xn,
  ce = "DropdownMenu",
  [lr] = Ue(ce, [Qe]),
  g = Qe(),
  [pr, yn] = lr(ce),
  Dn = (e) => {
    const {
        __scopeDropdownMenu: o,
        children: n,
        dir: t,
        open: a,
        defaultOpen: c,
        onOpenChange: i,
        modal: u = !0,
      } = e,
      m = g(o),
      M = s.useRef(null),
      [p, d] = qe({ prop: a, defaultProp: c ?? !1, onChange: i, caller: ce });
    return r.jsx(pr, {
      scope: o,
      triggerId: ne(),
      triggerRef: M,
      contentId: ne(),
      open: p,
      onOpenChange: d,
      onOpenToggle: s.useCallback(() => d((f) => !f), [d]),
      modal: u,
      children: r.jsx(Wo, { ...m, open: p, onOpenChange: d, dir: t, modal: u, children: n }),
    });
  };
Dn.displayName = ce;
var Cn = "DropdownMenuTrigger",
  bn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, disabled: t = !1, ...a } = e,
      c = yn(Cn, n),
      i = g(n);
    return r.jsx(Ho, {
      asChild: !0,
      ...i,
      children: r.jsx(O.button, {
        type: "button",
        id: c.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": c.open,
        "aria-controls": c.open ? c.contentId : void 0,
        "data-state": c.open ? "open" : "closed",
        "data-disabled": t ? "" : void 0,
        disabled: t,
        ...a,
        ref: Xe(o, c.triggerRef),
        onPointerDown: h(e.onPointerDown, (u) => {
          !t &&
            u.button === 0 &&
            u.ctrlKey === !1 &&
            (c.onOpenToggle(), c.open || u.preventDefault());
        }),
        onKeyDown: h(e.onKeyDown, (u) => {
          t ||
            (["Enter", " "].includes(u.key) && c.onOpenToggle(),
            u.key === "ArrowDown" && c.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(u.key) && u.preventDefault());
        }),
      }),
    });
  });
bn.displayName = Cn;
var fr = "DropdownMenuPortal",
  In = (e) => {
    const { __scopeDropdownMenu: o, ...n } = e,
      t = g(o);
    return r.jsx(Qo, { ...t, ...n });
  };
In.displayName = fr;
var Nn = "DropdownMenuContent",
  Sn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = yn(Nn, n),
      c = g(n),
      i = s.useRef(!1);
    return r.jsx(Zo, {
      id: a.contentId,
      "aria-labelledby": a.triggerId,
      ...c,
      ...t,
      ref: o,
      onCloseAutoFocus: h(e.onCloseAutoFocus, (u) => {
        var m;
        (i.current || (m = a.triggerRef.current) == null || m.focus(),
          (i.current = !1),
          u.preventDefault());
      }),
      onInteractOutside: h(e.onInteractOutside, (u) => {
        const m = u.detail.originalEvent,
          M = m.button === 0 && m.ctrlKey === !0,
          p = m.button === 2 || M;
        (!a.modal || p) && (i.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
Sn.displayName = Nn;
var mr = "DropdownMenuGroup",
  Rn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(Jo, { ...a, ...t, ref: o });
  });
Rn.displayName = mr;
var Mr = "DropdownMenuLabel",
  Pn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(er, { ...a, ...t, ref: o });
  });
Pn.displayName = Mr;
var hr = "DropdownMenuItem",
  jn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(nr, { ...a, ...t, ref: o });
  });
jn.displayName = hr;
var wr = "DropdownMenuCheckboxItem",
  En = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(or, { ...a, ...t, ref: o });
  });
En.displayName = wr;
var _r = "DropdownMenuRadioGroup",
  Tn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(rr, { ...a, ...t, ref: o });
  });
Tn.displayName = _r;
var gr = "DropdownMenuRadioItem",
  An = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(tr, { ...a, ...t, ref: o });
  });
An.displayName = gr;
var xr = "DropdownMenuItemIndicator",
  On = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(ar, { ...a, ...t, ref: o });
  });
On.displayName = xr;
var vr = "DropdownMenuSeparator",
  kn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(sr, { ...a, ...t, ref: o });
  });
kn.displayName = vr;
var yr = "DropdownMenuArrow",
  Dr = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(cr, { ...a, ...t, ref: o });
  });
Dr.displayName = yr;
var Cr = (e) => {
    const { __scopeDropdownMenu: o, children: n, open: t, onOpenChange: a, defaultOpen: c } = e,
      i = g(o),
      [u, m] = qe({ prop: t, defaultProp: c ?? !1, onChange: a, caller: "DropdownMenuSub" });
    return r.jsx(dr, { ...i, open: u, onOpenChange: m, children: n });
  },
  br = "DropdownMenuSubTrigger",
  Ln = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(ir, { ...a, ...t, ref: o });
  });
Ln.displayName = br;
var Ir = "DropdownMenuSubContent",
  Gn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      a = g(n);
    return r.jsx(ur, {
      ...a,
      ...t,
      ref: o,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
Gn.displayName = Ir;
var Nr = Dn,
  Sr = bn,
  Fn = In,
  Kn = Sn,
  Rr = Rn,
  $n = Pn,
  Bn = jn,
  Vn = En,
  Pr = Tn,
  Un = An,
  qn = On,
  Xn = kn,
  jr = Cr,
  Yn = Ln,
  zn = Gn;
const $ = Nr,
  te = Sr,
  Te = Rr,
  Ae = Fn,
  Oe = jr,
  ke = Pr,
  fe = s.forwardRef(({ className: e, inset: o, children: n, ...t }, a) =>
    r.jsxs(Yn, {
      ref: a,
      className: b(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        o && "pl-8",
        e,
      ),
      ...t,
      children: [n, r.jsx(wo, { className: "ml-auto h-4 w-4" })],
    }),
  );
fe.displayName = Yn.displayName;
const me = s.forwardRef(({ className: e, ...o }, n) =>
  r.jsx(zn, {
    ref: n,
    className: b(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      e,
    ),
    ...o,
  }),
);
me.displayName = zn.displayName;
const B = s.forwardRef(({ className: e, sideOffset: o = 4, ...n }, t) =>
  r.jsx(Fn, {
    children: r.jsx(Kn, {
      ref: t,
      sideOffset: o,
      className: b(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        e,
      ),
      ...n,
    }),
  }),
);
B.displayName = Kn.displayName;
const v = s.forwardRef(({ className: e, inset: o, ...n }, t) =>
  r.jsx(Bn, {
    ref: t,
    className: b(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      o && "pl-8",
      e,
    ),
    ...n,
  }),
);
v.displayName = Bn.displayName;
const Me = s.forwardRef(({ className: e, children: o, checked: n, ...t }, a) =>
  r.jsxs(Vn, {
    ref: a,
    className: b(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    checked: n,
    ...t,
    children: [
      r.jsx("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: r.jsx(qn, { children: r.jsx(_o, { className: "h-4 w-4" }) }),
      }),
      o,
    ],
  }),
);
Me.displayName = Vn.displayName;
const he = s.forwardRef(({ className: e, children: o, ...n }, t) =>
  r.jsxs(Un, {
    ref: t,
    className: b(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    ...n,
    children: [
      r.jsx("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: r.jsx(qn, { children: r.jsx(vo, { className: "h-2 w-2 fill-current" }) }),
      }),
      o,
    ],
  }),
);
he.displayName = Un.displayName;
const V = s.forwardRef(({ className: e, inset: o, ...n }, t) =>
  r.jsx($n, { ref: t, className: b("px-2 py-1.5 text-sm font-semibold", o && "pl-8", e), ...n }),
);
V.displayName = $n.displayName;
const P = s.forwardRef(({ className: e, ...o }, n) =>
  r.jsx(Xn, { ref: n, className: b("-mx-1 my-1 h-px bg-muted", e), ...o }),
);
P.displayName = Xn.displayName;
const N = ({ className: e, ...o }) =>
  r.jsx("span", { className: b("ml-auto text-xs tracking-widest opacity-60", e), ...o });
N.displayName = "DropdownMenuShortcut";
try {
  (($.displayName = "DropdownMenu"),
    ($.__docgenInfo = { description: "", displayName: "DropdownMenu", props: {} }));
} catch {}
try {
  ((Me.displayName = "DropdownMenuCheckboxItem"),
    (Me.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuCheckboxItem",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((B.displayName = "DropdownMenuContent"),
    (B.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuContent",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((Te.displayName = "DropdownMenuGroup"),
    (Te.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuGroup",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((v.displayName = "DropdownMenuItem"),
    (v.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuItem",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        inset: {
          defaultValue: null,
          description: "",
          name: "inset",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((V.displayName = "DropdownMenuLabel"),
    (V.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuLabel",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        inset: {
          defaultValue: null,
          description: "",
          name: "inset",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((Ae.displayName = "DropdownMenuPortal"),
    (Ae.__docgenInfo = { description: "", displayName: "DropdownMenuPortal", props: {} }));
} catch {}
try {
  ((ke.displayName = "DropdownMenuRadioGroup"),
    (ke.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuRadioGroup",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((he.displayName = "DropdownMenuRadioItem"),
    (he.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuRadioItem",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((P.displayName = "DropdownMenuSeparator"),
    (P.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuSeparator",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((N.displayName = "DropdownMenuShortcut"),
    (N.__docgenInfo = { description: "", displayName: "DropdownMenuShortcut", props: {} }));
} catch {}
try {
  ((Oe.displayName = "DropdownMenuSub"),
    (Oe.__docgenInfo = { description: "", displayName: "DropdownMenuSub", props: {} }));
} catch {}
try {
  ((me.displayName = "DropdownMenuSubContent"),
    (me.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuSubContent",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((fe.displayName = "DropdownMenuSubTrigger"),
    (fe.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuSubTrigger",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        inset: {
          defaultValue: null,
          description: "",
          name: "inset",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((te.displayName = "DropdownMenuTrigger"),
    (te.__docgenInfo = {
      description: "",
      displayName: "DropdownMenuTrigger",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
const Hr = {
    title: "Menus/DropdownMenu",
    component: $,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
  },
  J = {
    render: () =>
      r.jsxs($, {
        children: [
          r.jsx(te, {
            asChild: !0,
            children: r.jsx(Ve, { variant: "outline", children: "Open Menu" }),
          }),
          r.jsxs(B, {
            className: "w-56",
            children: [
              r.jsx(V, { children: "My Account" }),
              r.jsx(P, {}),
              r.jsxs(v, { children: ["Profile", r.jsx(N, { children: "⇧⌘P" })] }),
              r.jsxs(v, { children: ["Billing", r.jsx(N, { children: "⌘B" })] }),
              r.jsxs(v, { children: ["Settings", r.jsx(N, { children: "⌘S" })] }),
              r.jsxs(v, { children: ["Keyboard shortcuts", r.jsx(N, { children: "⌘K" })] }),
              r.jsx(P, {}),
              r.jsxs(v, { children: ["Log out", r.jsx(N, { children: "⇧⌘Q" })] }),
            ],
          }),
        ],
      }),
  },
  ee = {
    render: () =>
      r.jsxs($, {
        children: [
          r.jsx(te, {
            asChild: !0,
            children: r.jsx(Ve, { variant: "outline", children: "Actions" }),
          }),
          r.jsxs(B, {
            className: "w-56",
            children: [
              r.jsx(V, { children: "Actions" }),
              r.jsx(P, {}),
              r.jsxs(v, {
                children: [r.jsx("span", { className: "mr-sm", children: "📝" }), "Edit"],
              }),
              r.jsxs(v, {
                children: [r.jsx("span", { className: "mr-sm", children: "📋" }), "Copy"],
              }),
              r.jsxs(v, {
                children: [r.jsx("span", { className: "mr-sm", children: "🔗" }), "Share"],
              }),
              r.jsx(P, {}),
              r.jsxs(v, {
                className: "text-destructive",
                children: [r.jsx("span", { className: "mr-sm", children: "🗑️" }), "Delete"],
              }),
            ],
          }),
        ],
      }),
  };
var Le, Ge, Fe;
J.parameters = {
  ...J.parameters,
  docs: {
    ...((Le = J.parameters) == null ? void 0 : Le.docs),
    source: {
      originalSource: `{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Keyboard shortcuts
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,
      ...((Fe = (Ge = J.parameters) == null ? void 0 : Ge.docs) == null ? void 0 : Fe.source),
    },
  },
};
var Ke, $e, Be;
ee.parameters = {
  ...ee.parameters,
  docs: {
    ...((Ke = ee.parameters) == null ? void 0 : Ke.docs),
    source: {
      originalSource: `{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span className="mr-sm">📝</span>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="mr-sm">📋</span>
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="mr-sm">🔗</span>
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <span className="mr-sm">🗑️</span>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,
      ...((Be = ($e = ee.parameters) == null ? void 0 : $e.docs) == null ? void 0 : Be.source),
    },
  },
};
const Qr = ["Default", "WithIcons"];
export { J as Default, ee as WithIcons, Qr as __namedExportsOrder, Hr as default };
