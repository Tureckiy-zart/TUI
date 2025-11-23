"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as s } from "./index--tQcscZa.js";
import { c as Ee, u as De, b as Re, P as Be, a as w, i as We } from "./index-jG1cqCvV.js";
import { u as xe } from "./index-CJkT59yQ.js";
import { D as Le } from "./index-D8ovs0-6.js";
import { c as ge, R as Oe, A as ke, C as Ie, a as Ae } from "./index-CrPJtfnE.js";
import { P as Se } from "./index-yb7JCnm7.js";
import { R as He } from "./index-oCsW6GAK.js";
import { c as Ve } from "./index-Dp35_cgR.js";
import { c as Me } from "./utils-CyawMXzk.js";
import { B as y } from "./Button-DSOQhk0m.js";
import { B as M } from "./Badge-CmkUbG2V.js";
import { L as F, I as q } from "./Label--LJZ7EMM.js";
import { I as Fe, C as qe } from "./info-C_6EWaJU.js";
import { c as Ge } from "./createLucideIcon-CD2Sj3SA.js";
import "./index-pvjnvxJ7.js";
import "./index-DDxmA3Og.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $e = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  ze = Ge("CircleHelp", $e);
var [S] = Ee("Tooltip", [ge]),
  H = ge(),
  Te = "TooltipProvider",
  Ue = 700,
  G = "tooltip.open",
  [Ye, Y] = S(Te),
  be = (t) => {
    const {
        __scopeTooltip: o,
        delayDuration: r = Ue,
        skipDelayDuration: n = 300,
        disableHoverableContent: a = !1,
        children: c,
      } = t,
      l = s.useRef(!0),
      v = s.useRef(!1),
      i = s.useRef(0);
    return (
      s.useEffect(() => {
        const f = i.current;
        return () => window.clearTimeout(f);
      }, []),
      e.jsx(Ye, {
        scope: o,
        isOpenDelayedRef: l,
        delayDuration: r,
        onOpen: s.useCallback(() => {
          (window.clearTimeout(i.current), (l.current = !1));
        }, []),
        onClose: s.useCallback(() => {
          (window.clearTimeout(i.current),
            (i.current = window.setTimeout(() => (l.current = !0), n)));
        }, [n]),
        isPointerInTransitRef: v,
        onPointerInTransitChange: s.useCallback((f) => {
          v.current = f;
        }, []),
        disableHoverableContent: a,
        children: c,
      })
    );
  };
be.displayName = Te;
var E = "Tooltip",
  [Xe, V] = S(E),
  Ce = (t) => {
    const {
        __scopeTooltip: o,
        children: r,
        open: n,
        defaultOpen: a,
        onOpenChange: c,
        disableHoverableContent: l,
        delayDuration: v,
      } = t,
      i = Y(E, t.__scopeTooltip),
      f = H(o),
      [d, m] = s.useState(null),
      h = De(),
      p = s.useRef(0),
      x = l ?? i.disableHoverableContent,
      T = v ?? i.delayDuration,
      g = s.useRef(!1),
      [C, b] = Re({
        prop: n,
        defaultProp: a ?? !1,
        onChange: (K) => {
          (K ? (i.onOpen(), document.dispatchEvent(new CustomEvent(G))) : i.onClose(),
            c == null || c(K));
        },
        caller: E,
      }),
      _ = s.useMemo(() => (C ? (g.current ? "delayed-open" : "instant-open") : "closed"), [C]),
      P = s.useCallback(() => {
        (window.clearTimeout(p.current), (p.current = 0), (g.current = !1), b(!0));
      }, [b]),
      N = s.useCallback(() => {
        (window.clearTimeout(p.current), (p.current = 0), b(!1));
      }, [b]),
      X = s.useCallback(() => {
        (window.clearTimeout(p.current),
          (p.current = window.setTimeout(() => {
            ((g.current = !0), b(!0), (p.current = 0));
          }, T)));
      }, [T, b]);
    return (
      s.useEffect(
        () => () => {
          p.current && (window.clearTimeout(p.current), (p.current = 0));
        },
        [],
      ),
      e.jsx(Oe, {
        ...f,
        children: e.jsx(Xe, {
          scope: o,
          contentId: h,
          open: C,
          stateAttribute: _,
          trigger: d,
          onTriggerChange: m,
          onTriggerEnter: s.useCallback(() => {
            i.isOpenDelayedRef.current ? X() : P();
          }, [i.isOpenDelayedRef, X, P]),
          onTriggerLeave: s.useCallback(() => {
            x ? N() : (window.clearTimeout(p.current), (p.current = 0));
          }, [N, x]),
          onOpen: P,
          onClose: N,
          disableHoverableContent: x,
          children: r,
        }),
      })
    );
  };
Ce.displayName = E;
var $ = "TooltipTrigger",
  we = s.forwardRef((t, o) => {
    const { __scopeTooltip: r, ...n } = t,
      a = V($, r),
      c = Y($, r),
      l = H(r),
      v = s.useRef(null),
      i = xe(o, v, a.onTriggerChange),
      f = s.useRef(!1),
      d = s.useRef(!1),
      m = s.useCallback(() => (f.current = !1), []);
    return (
      s.useEffect(() => () => document.removeEventListener("pointerup", m), [m]),
      e.jsx(ke, {
        asChild: !0,
        ...l,
        children: e.jsx(Be.button, {
          "aria-describedby": a.open ? a.contentId : void 0,
          "data-state": a.stateAttribute,
          ...n,
          ref: i,
          onPointerMove: w(t.onPointerMove, (h) => {
            h.pointerType !== "touch" &&
              !d.current &&
              !c.isPointerInTransitRef.current &&
              (a.onTriggerEnter(), (d.current = !0));
          }),
          onPointerLeave: w(t.onPointerLeave, () => {
            (a.onTriggerLeave(), (d.current = !1));
          }),
          onPointerDown: w(t.onPointerDown, () => {
            (a.open && a.onClose(),
              (f.current = !0),
              document.addEventListener("pointerup", m, { once: !0 }));
          }),
          onFocus: w(t.onFocus, () => {
            f.current || a.onOpen();
          }),
          onBlur: w(t.onBlur, a.onClose),
          onClick: w(t.onClick, a.onClose),
        }),
      })
    );
  });
we.displayName = $;
var Ke = "TooltipPortal",
  [Rt, Je] = S(Ke, { forceMount: void 0 }),
  j = "TooltipContent",
  je = s.forwardRef((t, o) => {
    const r = Je(j, t.__scopeTooltip),
      { forceMount: n = r.forceMount, side: a = "top", ...c } = t,
      l = V(j, t.__scopeTooltip);
    return e.jsx(Se, {
      present: n || l.open,
      children: l.disableHoverableContent
        ? e.jsx(_e, { side: a, ...c, ref: o })
        : e.jsx(Qe, { side: a, ...c, ref: o }),
    });
  }),
  Qe = s.forwardRef((t, o) => {
    const r = V(j, t.__scopeTooltip),
      n = Y(j, t.__scopeTooltip),
      a = s.useRef(null),
      c = xe(o, a),
      [l, v] = s.useState(null),
      { trigger: i, onClose: f } = r,
      d = a.current,
      { onPointerInTransitChange: m } = n,
      h = s.useCallback(() => {
        (v(null), m(!1));
      }, [m]),
      p = s.useCallback(
        (x, T) => {
          const g = x.currentTarget,
            C = { x: x.clientX, y: x.clientY },
            b = ot(C, g.getBoundingClientRect()),
            _ = nt(C, b),
            P = at(T.getBoundingClientRect()),
            N = it([..._, ...P]);
          (v(N), m(!0));
        },
        [m],
      );
    return (
      s.useEffect(() => () => h(), [h]),
      s.useEffect(() => {
        if (i && d) {
          const x = (g) => p(g, d),
            T = (g) => p(g, i);
          return (
            i.addEventListener("pointerleave", x),
            d.addEventListener("pointerleave", T),
            () => {
              (i.removeEventListener("pointerleave", x), d.removeEventListener("pointerleave", T));
            }
          );
        }
      }, [i, d, p, h]),
      s.useEffect(() => {
        if (l) {
          const x = (T) => {
            const g = T.target,
              C = { x: T.clientX, y: T.clientY },
              b = (i == null ? void 0 : i.contains(g)) || (d == null ? void 0 : d.contains(g)),
              _ = !st(C, l);
            b ? h() : _ && (h(), f());
          };
          return (
            document.addEventListener("pointermove", x),
            () => document.removeEventListener("pointermove", x)
          );
        }
      }, [i, d, l, f, h]),
      e.jsx(_e, { ...t, ref: c })
    );
  }),
  [Ze, et] = S(E, { isInside: !1 }),
  tt = We("TooltipContent"),
  _e = s.forwardRef((t, o) => {
    const {
        __scopeTooltip: r,
        children: n,
        "aria-label": a,
        onEscapeKeyDown: c,
        onPointerDownOutside: l,
        ...v
      } = t,
      i = V(j, r),
      f = H(r),
      { onClose: d } = i;
    return (
      s.useEffect(
        () => (document.addEventListener(G, d), () => document.removeEventListener(G, d)),
        [d],
      ),
      s.useEffect(() => {
        if (i.trigger) {
          const m = (h) => {
            const p = h.target;
            p != null && p.contains(i.trigger) && d();
          };
          return (
            window.addEventListener("scroll", m, { capture: !0 }),
            () => window.removeEventListener("scroll", m, { capture: !0 })
          );
        }
      }, [i.trigger, d]),
      e.jsx(Le, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: c,
        onPointerDownOutside: l,
        onFocusOutside: (m) => m.preventDefault(),
        onDismiss: d,
        children: e.jsxs(Ie, {
          "data-state": i.stateAttribute,
          ...f,
          ...v,
          ref: o,
          style: {
            ...v.style,
            "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)",
          },
          children: [
            e.jsx(tt, { children: n }),
            e.jsx(Ze, {
              scope: r,
              isInside: !0,
              children: e.jsx(He, { id: i.contentId, role: "tooltip", children: a || n }),
            }),
          ],
        }),
      })
    );
  });
je.displayName = j;
var Pe = "TooltipArrow",
  rt = s.forwardRef((t, o) => {
    const { __scopeTooltip: r, ...n } = t,
      a = H(r);
    return et(Pe, r).isInside ? null : e.jsx(Ae, { ...a, ...n, ref: o });
  });
rt.displayName = Pe;
function ot(t, o) {
  const r = Math.abs(o.top - t.y),
    n = Math.abs(o.bottom - t.y),
    a = Math.abs(o.right - t.x),
    c = Math.abs(o.left - t.x);
  switch (Math.min(r, n, a, c)) {
    case c:
      return "left";
    case a:
      return "right";
    case r:
      return "top";
    case n:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function nt(t, o, r = 5) {
  const n = [];
  switch (o) {
    case "top":
      n.push({ x: t.x - r, y: t.y + r }, { x: t.x + r, y: t.y + r });
      break;
    case "bottom":
      n.push({ x: t.x - r, y: t.y - r }, { x: t.x + r, y: t.y - r });
      break;
    case "left":
      n.push({ x: t.x + r, y: t.y - r }, { x: t.x + r, y: t.y + r });
      break;
    case "right":
      n.push({ x: t.x - r, y: t.y - r }, { x: t.x - r, y: t.y + r });
      break;
  }
  return n;
}
function at(t) {
  const { top: o, right: r, bottom: n, left: a } = t;
  return [
    { x: a, y: o },
    { x: r, y: o },
    { x: r, y: n },
    { x: a, y: n },
  ];
}
function st(t, o) {
  const { x: r, y: n } = t;
  let a = !1;
  for (let c = 0, l = o.length - 1; c < o.length; l = c++) {
    const v = o[c],
      i = o[l],
      f = v.x,
      d = v.y,
      m = i.x,
      h = i.y;
    d > n != h > n && r < ((m - f) * (n - d)) / (h - d) + f && (a = !a);
  }
  return a;
}
function it(t) {
  const o = t.slice();
  return (
    o.sort((r, n) => (r.x < n.x ? -1 : r.x > n.x ? 1 : r.y < n.y ? -1 : r.y > n.y ? 1 : 0)),
    lt(o)
  );
}
function lt(t) {
  if (t.length <= 1) return t.slice();
  const o = [];
  for (let n = 0; n < t.length; n++) {
    const a = t[n];
    for (; o.length >= 2; ) {
      const c = o[o.length - 1],
        l = o[o.length - 2];
      if ((c.x - l.x) * (a.y - l.y) >= (c.y - l.y) * (a.x - l.x)) o.pop();
      else break;
    }
    o.push(a);
  }
  o.pop();
  const r = [];
  for (let n = t.length - 1; n >= 0; n--) {
    const a = t[n];
    for (; r.length >= 2; ) {
      const c = r[r.length - 1],
        l = r[r.length - 2];
      if ((c.x - l.x) * (a.y - l.y) >= (c.y - l.y) * (a.x - l.x)) r.pop();
      else break;
    }
    r.push(a);
  }
  return (
    r.pop(),
    o.length === 1 && r.length === 1 && o[0].x === r[0].x && o[0].y === r[0].y ? o : o.concat(r)
  );
}
var ct = be,
  dt = Ce,
  pt = we,
  Ne = je;
const I = ct,
  z = dt,
  U = pt,
  ut = Ve(
    "z-50 overflow-hidden rounded-md border bg-popover px-sm py-xs text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    {
      variants: {
        variant: {
          primary: "bg-popover text-popover-foreground border-border",
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
          destructive: "border-destructive/50 text-destructive bg-destructive/10",
        },
      },
      defaultVariants: { variant: "primary" },
    },
  ),
  A = s.forwardRef(({ className: t, variant: o, sideOffset: r = 4, ...n }, a) =>
    e.jsx(Ne, { ref: a, sideOffset: r, className: Me(ut({ variant: o, className: t })), ...n }),
  );
A.displayName = Ne.displayName;
function u({
  children: t,
  content: o,
  variant: r,
  side: n = "top",
  align: a = "center",
  sideOffset: c,
  alignOffset: l,
  delayDuration: v = 400,
  skipDelayDuration: i = 300,
  disableHoverableContent: f = !1,
  open: d,
  onOpenChange: m,
}) {
  return e.jsx(I, {
    delayDuration: v,
    skipDelayDuration: i,
    children: e.jsxs(z, {
      open: d,
      onOpenChange: m,
      children: [
        e.jsx(U, { asChild: !0, children: t }),
        e.jsx(A, { variant: r, side: n, align: a, sideOffset: c, alignOffset: l, children: o }),
      ],
    }),
  });
}
try {
  ((u.displayName = "TooltipWrapper"),
    (u.__docgenInfo = {
      description: "",
      displayName: "TooltipWrapper",
      props: {
        content: {
          defaultValue: null,
          description: "",
          name: "content",
          required: !0,
          type: { name: "ReactNode" },
        },
        variant: {
          defaultValue: null,
          description: "",
          name: "variant",
          required: !1,
          type: {
            name: '"primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive" | null | undefined',
          },
        },
        side: {
          defaultValue: { value: "top" },
          description: "",
          name: "side",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"top"' },
              { value: '"right"' },
              { value: '"bottom"' },
              { value: '"left"' },
            ],
          },
        },
        align: {
          defaultValue: { value: "center" },
          description: "",
          name: "align",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"center"' },
              { value: '"start"' },
              { value: '"end"' },
            ],
          },
        },
        sideOffset: {
          defaultValue: { value: "4" },
          description: "",
          name: "sideOffset",
          required: !1,
          type: { name: "number | undefined" },
        },
        alignOffset: {
          defaultValue: null,
          description: "",
          name: "alignOffset",
          required: !1,
          type: { name: "number | undefined" },
        },
        delayDuration: {
          defaultValue: { value: "400" },
          description: "",
          name: "delayDuration",
          required: !1,
          type: { name: "number | undefined" },
        },
        skipDelayDuration: {
          defaultValue: { value: "300" },
          description: "",
          name: "skipDelayDuration",
          required: !1,
          type: { name: "number | undefined" },
        },
        disableHoverableContent: {
          defaultValue: { value: "false" },
          description: "",
          name: "disableHoverableContent",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        open: {
          defaultValue: null,
          description: "",
          name: "open",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        onOpenChange: {
          defaultValue: null,
          description: "",
          name: "onOpenChange",
          required: !1,
          type: { name: "((open: boolean) => void) | undefined" },
        },
      },
    }));
} catch {}
try {
  ((z.displayName = "Tooltip"),
    (z.__docgenInfo = { description: "", displayName: "Tooltip", props: {} }));
} catch {}
try {
  ((A.displayName = "TooltipContent"),
    (A.__docgenInfo = {
      description: "",
      displayName: "TooltipContent",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        variant: {
          defaultValue: null,
          description: "",
          name: "variant",
          required: !1,
          type: {
            name: '"primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive" | null | undefined',
          },
        },
      },
    }));
} catch {}
try {
  ((I.displayName = "TooltipProvider"),
    (I.__docgenInfo = { description: "", displayName: "TooltipProvider", props: {} }));
} catch {}
try {
  ((U.displayName = "TooltipTrigger"),
    (U.__docgenInfo = {
      description: "",
      displayName: "TooltipTrigger",
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
const Bt = {
    title: "Components/Overlays/Tooltip",
    component: u,
    parameters: { layout: "centered" },
    decorators: [(t) => e.jsx(I, { children: e.jsx(t, {}) })],
  },
  D = { args: { content: "This is a tooltip", children: e.jsx(y, { children: "Hover me" }) } },
  R = {
    args: {
      content:
        "This is a longer tooltip message that provides more detailed information about the element.",
      children: e.jsx(y, { children: "Hover for details" }),
    },
  },
  B = {
    render: () =>
      e.jsxs("div", {
        className: "flex gap-md",
        children: [
          e.jsx(u, {
            content: "Primary tooltip",
            variant: "primary",
            children: e.jsx(y, { variant: "primary", children: "Primary" }),
          }),
          e.jsx(u, {
            content: "Accent tooltip",
            variant: "accent",
            children: e.jsx(y, { variant: "outline", children: "Accent" }),
          }),
          e.jsx(u, {
            content: "Secondary tooltip",
            variant: "secondary",
            children: e.jsx(y, { variant: "outline", children: "Secondary" }),
          }),
          e.jsx(u, {
            content: "Destructive tooltip",
            variant: "destructive",
            children: e.jsx(y, { variant: "outline", children: "Destructive" }),
          }),
          e.jsx(u, {
            content: "Outline tooltip",
            variant: "outline",
            children: e.jsx(y, { variant: "outline", children: "Outline" }),
          }),
        ],
      }),
  },
  W = {
    render: () =>
      e.jsxs("div", {
        className: "grid grid-cols-2 gap-xl p-xl",
        children: [
          e.jsx(u, {
            content: "Top tooltip",
            side: "top",
            children: e.jsx(y, { children: "Top" }),
          }),
          e.jsx(u, {
            content: "Right tooltip",
            side: "right",
            children: e.jsx(y, { children: "Right" }),
          }),
          e.jsx(u, {
            content: "Bottom tooltip",
            side: "bottom",
            children: e.jsx(y, { children: "Bottom" }),
          }),
          e.jsx(u, {
            content: "Left tooltip",
            side: "left",
            children: e.jsx(y, { children: "Left" }),
          }),
        ],
      }),
  },
  L = {
    render: () =>
      e.jsxs("div", {
        className: "w-80 space-y-md",
        children: [
          e.jsxs("div", {
            className: "space-y-sm",
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-sm",
                children: [
                  e.jsx(F, { htmlFor: "email", children: "Email" }),
                  e.jsx(u, {
                    content: "We'll never share your email with anyone else.",
                    variant: "primary",
                    children: e.jsx(Fe, { className: "h-4 w-4 text-muted-foreground" }),
                  }),
                ],
              }),
              e.jsx(q, { id: "email", type: "email", placeholder: "Enter your email" }),
            ],
          }),
          e.jsxs("div", {
            className: "space-y-sm",
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-sm",
                children: [
                  e.jsx(F, { htmlFor: "password", children: "Password" }),
                  e.jsx(u, {
                    content: "Password must be at least 8 characters long",
                    variant: "secondary",
                    children: e.jsx(ze, { className: "h-4 w-4 text-muted-foreground" }),
                  }),
                ],
              }),
              e.jsx(q, { id: "password", type: "password", placeholder: "Enter your password" }),
            ],
          }),
          e.jsxs("div", {
            className: "space-y-sm",
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-sm",
                children: [
                  e.jsx(F, { htmlFor: "confirm-password", children: "Confirm Password" }),
                  e.jsx(u, {
                    content: "Passwords do not match",
                    variant: "destructive",
                    children: e.jsx(qe, { className: "h-4 w-4 text-destructive" }),
                  }),
                ],
              }),
              e.jsx(q, {
                id: "confirm-password",
                type: "password",
                placeholder: "Confirm your password",
              }),
            ],
          }),
        ],
      }),
  },
  O = {
    render: () =>
      e.jsxs("div", {
        className: "flex gap-md",
        children: [
          e.jsx(u, {
            content: "This feature is currently in development",
            variant: "secondary",
            children: e.jsx(M, { variant: "secondary", children: "Beta" }),
          }),
          e.jsx(u, {
            content: "This feature is available for premium users",
            variant: "primary",
            children: e.jsx(M, { variant: "outline", children: "Premium" }),
          }),
          e.jsx(u, {
            content: "This feature is no longer supported",
            variant: "destructive",
            children: e.jsx(M, { variant: "destructive", children: "Deprecated" }),
          }),
        ],
      }),
  },
  k = {
    render: () =>
      e.jsxs("div", {
        className: "flex gap-md",
        children: [
          e.jsx(u, {
            content: "Fast tooltip (200ms delay)",
            delayDuration: 200,
            children: e.jsx(y, { children: "Fast Tooltip" }),
          }),
          e.jsx(u, {
            content: "Slow tooltip (1000ms delay)",
            delayDuration: 1e3,
            children: e.jsx(y, { children: "Slow Tooltip" }),
          }),
          e.jsx(u, {
            content: "No delay tooltip",
            delayDuration: 0,
            children: e.jsx(y, { children: "No Delay" }),
          }),
        ],
      }),
  };
var J, Q, Z;
D.parameters = {
  ...D.parameters,
  docs: {
    ...((J = D.parameters) == null ? void 0 : J.docs),
    source: {
      originalSource: `{
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>
  }
}`,
      ...((Z = (Q = D.parameters) == null ? void 0 : Q.docs) == null ? void 0 : Z.source),
    },
  },
};
var ee, te, re;
R.parameters = {
  ...R.parameters,
  docs: {
    ...((ee = R.parameters) == null ? void 0 : ee.docs),
    source: {
      originalSource: `{
  args: {
    content: "This is a longer tooltip message that provides more detailed information about the element.",
    children: <Button>Hover for details</Button>
  }
}`,
      ...((re = (te = R.parameters) == null ? void 0 : te.docs) == null ? void 0 : re.source),
    },
  },
};
var oe, ne, ae;
B.parameters = {
  ...B.parameters,
  docs: {
    ...((oe = B.parameters) == null ? void 0 : oe.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex gap-md">
      <TooltipWrapper content="Primary tooltip" variant="primary">
        <Button variant="primary">Primary</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Accent tooltip" variant="accent">
        <Button variant="outline">Accent</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Secondary tooltip" variant="secondary">
        <Button variant="outline">Secondary</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Destructive tooltip" variant="destructive">
        <Button variant="outline">Destructive</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Outline tooltip" variant="outline">
        <Button variant="outline">Outline</Button>
      </TooltipWrapper>
    </div>
}`,
      ...((ae = (ne = B.parameters) == null ? void 0 : ne.docs) == null ? void 0 : ae.source),
    },
  },
};
var se, ie, le;
W.parameters = {
  ...W.parameters,
  docs: {
    ...((se = W.parameters) == null ? void 0 : se.docs),
    source: {
      originalSource: `{
  render: () => <div className="grid grid-cols-2 gap-xl p-xl">
      <TooltipWrapper content="Top tooltip" side="top">
        <Button>Top</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Right tooltip" side="right">
        <Button>Right</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Left tooltip" side="left">
        <Button>Left</Button>
      </TooltipWrapper>
    </div>
}`,
      ...((le = (ie = W.parameters) == null ? void 0 : ie.docs) == null ? void 0 : le.source),
    },
  },
};
var ce, de, pe;
L.parameters = {
  ...L.parameters,
  docs: {
    ...((ce = L.parameters) == null ? void 0 : ce.docs),
    source: {
      originalSource: `{
  render: () => <div className="w-80 space-y-md">
      <div className="space-y-sm">
        <div className="flex items-center gap-sm">
          <Label htmlFor="email">Email</Label>
          <TooltipWrapper content="We'll never share your email with anyone else." variant="primary">
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipWrapper>
        </div>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-sm">
        <div className="flex items-center gap-sm">
          <Label htmlFor="password">Password</Label>
          <TooltipWrapper content="Password must be at least 8 characters long" variant="secondary">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </TooltipWrapper>
        </div>
        <Input id="password" type="password" placeholder="Enter your password" />
      </div>

      <div className="space-y-sm">
        <div className="flex items-center gap-sm">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <TooltipWrapper content="Passwords do not match" variant="destructive">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </TooltipWrapper>
        </div>
        <Input id="confirm-password" type="password" placeholder="Confirm your password" />
      </div>
    </div>
}`,
      ...((pe = (de = L.parameters) == null ? void 0 : de.docs) == null ? void 0 : pe.source),
    },
  },
};
var ue, me, fe;
O.parameters = {
  ...O.parameters,
  docs: {
    ...((ue = O.parameters) == null ? void 0 : ue.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex gap-md">
      <TooltipWrapper content="This feature is currently in development" variant="secondary">
        <Badge variant="secondary">Beta</Badge>
      </TooltipWrapper>

      <TooltipWrapper content="This feature is available for premium users" variant="primary">
        <Badge variant="outline">Premium</Badge>
      </TooltipWrapper>

      <TooltipWrapper content="This feature is no longer supported" variant="destructive">
        <Badge variant="destructive">Deprecated</Badge>
      </TooltipWrapper>
    </div>
}`,
      ...((fe = (me = O.parameters) == null ? void 0 : me.docs) == null ? void 0 : fe.source),
    },
  },
};
var ve, he, ye;
k.parameters = {
  ...k.parameters,
  docs: {
    ...((ve = k.parameters) == null ? void 0 : ve.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex gap-md">
      <TooltipWrapper content="Fast tooltip (200ms delay)" delayDuration={200}>
        <Button>Fast Tooltip</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Slow tooltip (1000ms delay)" delayDuration={1000}>
        <Button>Slow Tooltip</Button>
      </TooltipWrapper>

      <TooltipWrapper content="No delay tooltip" delayDuration={0}>
        <Button>No Delay</Button>
      </TooltipWrapper>
    </div>
}`,
      ...((ye = (he = k.parameters) == null ? void 0 : he.docs) == null ? void 0 : ye.source),
    },
  },
};
const Wt = [
  "Default",
  "WithLongContent",
  "DifferentVariants",
  "DifferentPositions",
  "WithFormElements",
  "WithBadges",
  "CustomDelay",
];
export {
  k as CustomDelay,
  D as Default,
  W as DifferentPositions,
  B as DifferentVariants,
  O as WithBadges,
  L as WithFormElements,
  R as WithLongContent,
  Wt as __namedExportsOrder,
  Bt as default,
};
