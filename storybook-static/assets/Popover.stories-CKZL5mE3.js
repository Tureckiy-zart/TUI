"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as d } from "./index--tQcscZa.js";
import { b as Ae, c as De, u as Ie, P as fe, a as _, e as We } from "./index-jG1cqCvV.js";
import { u as he } from "./index-CJkT59yQ.js";
import { D as Fe } from "./index-D8ovs0-6.js";
import { P as Ee, h as ke, R as ze, u as Me, F as Ve } from "./Combination-DplBdLRn.js";
import { c as xe, R as Le, A as ge, C as qe, a as He } from "./index-CrPJtfnE.js";
import { P as Ne } from "./index-yb7JCnm7.js";
import { c as $e } from "./index-Dp35_cgR.js";
import { c as h } from "./utils-CyawMXzk.js";
import { B as l } from "./Button-DSOQhk0m.js";
import { L as H, I as $ } from "./Label--LJZ7EMM.js";
import { B as N } from "./Badge-CmkUbG2V.js";
import { c as L } from "./createLucideIcon-CD2Sj3SA.js";
import "./index-pvjnvxJ7.js";
import "./index-DDxmA3Og.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ue = [
    ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
    [
      "path",
      {
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
        key: "11g9vi",
      },
    ],
  ],
  P = L("Bell", Ue);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ye = [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        key: "1qme2f",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  U = L("Settings", Ye);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ge = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  Je = L("User", Ge);
var F = "Popover",
  [ye] = De(F, [xe]),
  j = xe(),
  [Ke, f] = ye(F),
  _e = (a) => {
    const {
        __scopePopover: r,
        children: t,
        open: n,
        defaultOpen: s,
        onOpenChange: o,
        modal: i = !1,
      } = a,
      c = j(r),
      m = d.useRef(null),
      [u, x] = d.useState(!1),
      [g, v] = Ae({ prop: n, defaultProp: s ?? !1, onChange: o, caller: F });
    return e.jsx(Le, {
      ...c,
      children: e.jsx(Ke, {
        scope: r,
        contentId: Ie(),
        triggerRef: m,
        open: g,
        onOpenChange: v,
        onOpenToggle: d.useCallback(() => v((E) => !E), [v]),
        hasCustomAnchor: u,
        onCustomAnchorAdd: d.useCallback(() => x(!0), []),
        onCustomAnchorRemove: d.useCallback(() => x(!1), []),
        modal: i,
        children: t,
      }),
    });
  };
_e.displayName = F;
var je = "PopoverAnchor",
  Pe = d.forwardRef((a, r) => {
    const { __scopePopover: t, ...n } = a,
      s = f(je, t),
      o = j(t),
      { onCustomAnchorAdd: i, onCustomAnchorRemove: c } = s;
    return (d.useEffect(() => (i(), () => c()), [i, c]), e.jsx(ge, { ...o, ...n, ref: r }));
  });
Pe.displayName = je;
var Ce = "PopoverTrigger",
  be = d.forwardRef((a, r) => {
    const { __scopePopover: t, ...n } = a,
      s = f(Ce, t),
      o = j(t),
      i = he(r, s.triggerRef),
      c = e.jsx(fe.button, {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": s.open,
        "aria-controls": s.contentId,
        "data-state": Se(s.open),
        ...n,
        ref: i,
        onClick: _(a.onClick, s.onOpenToggle),
      });
    return s.hasCustomAnchor ? c : e.jsx(ge, { asChild: !0, ...o, children: c });
  });
be.displayName = Ce;
var q = "PopoverPortal",
  [Qe, Ze] = ye(q, { forceMount: void 0 }),
  we = (a) => {
    const { __scopePopover: r, forceMount: t, children: n, container: s } = a,
      o = f(q, r);
    return e.jsx(Qe, {
      scope: r,
      forceMount: t,
      children: e.jsx(Ne, {
        present: t || o.open,
        children: e.jsx(Ee, { asChild: !0, container: s, children: n }),
      }),
    });
  };
we.displayName = q;
var y = "PopoverContent",
  Be = d.forwardRef((a, r) => {
    const t = Ze(y, a.__scopePopover),
      { forceMount: n = t.forceMount, ...s } = a,
      o = f(y, a.__scopePopover);
    return e.jsx(Ne, {
      present: n || o.open,
      children: o.modal ? e.jsx(ea, { ...s, ref: r }) : e.jsx(aa, { ...s, ref: r }),
    });
  });
Be.displayName = y;
var Xe = We("PopoverContent.RemoveScroll"),
  ea = d.forwardRef((a, r) => {
    const t = f(y, a.__scopePopover),
      n = d.useRef(null),
      s = he(r, n),
      o = d.useRef(!1);
    return (
      d.useEffect(() => {
        const i = n.current;
        if (i) return ke(i);
      }, []),
      e.jsx(ze, {
        as: Xe,
        allowPinchZoom: !0,
        children: e.jsx(Re, {
          ...a,
          ref: s,
          trapFocus: t.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: _(a.onCloseAutoFocus, (i) => {
            var c;
            (i.preventDefault(), o.current || (c = t.triggerRef.current) == null || c.focus());
          }),
          onPointerDownOutside: _(
            a.onPointerDownOutside,
            (i) => {
              const c = i.detail.originalEvent,
                m = c.button === 0 && c.ctrlKey === !0,
                u = c.button === 2 || m;
              o.current = u;
            },
            { checkForDefaultPrevented: !1 },
          ),
          onFocusOutside: _(a.onFocusOutside, (i) => i.preventDefault(), {
            checkForDefaultPrevented: !1,
          }),
        }),
      })
    );
  }),
  aa = d.forwardRef((a, r) => {
    const t = f(y, a.__scopePopover),
      n = d.useRef(!1),
      s = d.useRef(!1);
    return e.jsx(Re, {
      ...a,
      ref: r,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (o) => {
        var i, c;
        ((i = a.onCloseAutoFocus) == null || i.call(a, o),
          o.defaultPrevented ||
            (n.current || (c = t.triggerRef.current) == null || c.focus(), o.preventDefault()),
          (n.current = !1),
          (s.current = !1));
      },
      onInteractOutside: (o) => {
        var m, u;
        ((m = a.onInteractOutside) == null || m.call(a, o),
          o.defaultPrevented ||
            ((n.current = !0), o.detail.originalEvent.type === "pointerdown" && (s.current = !0)));
        const i = o.target;
        (((u = t.triggerRef.current) == null ? void 0 : u.contains(i)) && o.preventDefault(),
          o.detail.originalEvent.type === "focusin" && s.current && o.preventDefault());
      },
    });
  }),
  Re = d.forwardRef((a, r) => {
    const {
        __scopePopover: t,
        trapFocus: n,
        onOpenAutoFocus: s,
        onCloseAutoFocus: o,
        disableOutsidePointerEvents: i,
        onEscapeKeyDown: c,
        onPointerDownOutside: m,
        onFocusOutside: u,
        onInteractOutside: x,
        ...g
      } = a,
      v = f(y, t),
      E = j(t);
    return (
      Me(),
      e.jsx(Ve, {
        asChild: !0,
        loop: !0,
        trapped: n,
        onMountAutoFocus: s,
        onUnmountAutoFocus: o,
        children: e.jsx(Fe, {
          asChild: !0,
          disableOutsidePointerEvents: i,
          onInteractOutside: x,
          onEscapeKeyDown: c,
          onPointerDownOutside: m,
          onFocusOutside: u,
          onDismiss: () => v.onOpenChange(!1),
          children: e.jsx(qe, {
            "data-state": Se(v.open),
            role: "dialog",
            id: v.contentId,
            ...E,
            ...g,
            ref: r,
            style: {
              ...g.style,
              "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
              "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
              "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)",
            },
          }),
        }),
      })
    );
  }),
  Oe = "PopoverClose",
  ta = d.forwardRef((a, r) => {
    const { __scopePopover: t, ...n } = a,
      s = f(Oe, t);
    return e.jsx(fe.button, {
      type: "button",
      ...n,
      ref: r,
      onClick: _(a.onClick, () => s.onOpenChange(!1)),
    });
  });
ta.displayName = Oe;
var ra = "PopoverArrow",
  sa = d.forwardRef((a, r) => {
    const { __scopePopover: t, ...n } = a,
      s = j(t);
    return e.jsx(He, { ...s, ...n, ref: r });
  });
sa.displayName = ra;
function Se(a) {
  return a ? "open" : "closed";
}
var oa = _e,
  na = Pe,
  ia = be,
  da = we,
  Te = Be;
const k = oa,
  z = ia,
  Y = na,
  ca = $e(
    "z-50 w-72 rounded-md border bg-popover p-md text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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
        size: {
          xs: "w-40 p-xs",
          sm: "w-48 p-sm",
          md: "w-72 p-md",
          lg: "w-96 p-lg",
          xl: "w-[32rem] p-xl",
        },
      },
      defaultVariants: { variant: "primary", size: "md" },
    },
  ),
  T = d.forwardRef(
    ({ className: a, variant: r, size: t, align: n = "center", sideOffset: s = 4, ...o }, i) =>
      e.jsx(da, {
        children: e.jsx(Te, {
          ref: i,
          align: n,
          sideOffset: s,
          className: h(ca({ variant: r, size: t, className: a })),
          ...o,
        }),
      }),
  );
T.displayName = Te.displayName;
function p({
  children: a,
  content: r,
  variant: t,
  size: n,
  side: s = "bottom",
  align: o = "center",
  sideOffset: i,
  alignOffset: c,
  open: m,
  onOpenChange: u,
  modal: x = !0,
  closeOnInteractOutside: g = !0,
}) {
  return e.jsxs(k, {
    open: m,
    onOpenChange: u,
    modal: x,
    children: [
      e.jsx(z, { asChild: !0, children: a }),
      e.jsx(T, {
        variant: t,
        size: n,
        side: s,
        align: o,
        sideOffset: i,
        alignOffset: c,
        onInteractOutside: g ? void 0 : (v) => v.preventDefault(),
        children: r,
      }),
    ],
  });
}
try {
  ((p.displayName = "PopoverWrapper"),
    (p.__docgenInfo = {
      description: "",
      displayName: "PopoverWrapper",
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
        size: {
          defaultValue: null,
          description: "",
          name: "size",
          required: !1,
          type: { name: '"xs" | "sm" | "md" | "lg" | "xl" | null | undefined' },
        },
        side: {
          defaultValue: { value: "bottom" },
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
        modal: {
          defaultValue: { value: "true" },
          description: "",
          name: "modal",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        closeOnInteractOutside: {
          defaultValue: { value: "true" },
          description: "",
          name: "closeOnInteractOutside",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((k.displayName = "Popover"),
    (k.__docgenInfo = { description: "", displayName: "Popover", props: {} }));
} catch {}
try {
  ((Y.displayName = "PopoverAnchor"),
    (Y.__docgenInfo = {
      description: "",
      displayName: "PopoverAnchor",
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
  ((T.displayName = "PopoverContent"),
    (T.__docgenInfo = {
      description: "",
      displayName: "PopoverContent",
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
        size: {
          defaultValue: null,
          description: "",
          name: "size",
          required: !1,
          type: { name: '"xs" | "sm" | "md" | "lg" | "xl" | null | undefined' },
        },
      },
    }));
} catch {}
try {
  ((z.displayName = "PopoverTrigger"),
    (z.__docgenInfo = {
      description: "",
      displayName: "PopoverTrigger",
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
const A = d.forwardRef(({ className: a, ...r }, t) =>
  e.jsx("div", {
    ref: t,
    className: h("rounded-xl border bg-card text-card-foreground shadow", a),
    ...r,
  }),
);
A.displayName = "Card";
const D = d.forwardRef(({ className: a, ...r }, t) =>
  e.jsx("div", { ref: t, className: h("flex flex-col space-y-xs p-lg", a), ...r }),
);
D.displayName = "CardHeader";
const I = d.forwardRef(({ className: a, ...r }, t) =>
  e.jsx("div", { ref: t, className: h("font-semibold leading-none tracking-tight", a), ...r }),
);
I.displayName = "CardTitle";
const M = d.forwardRef(({ className: a, ...r }, t) =>
  e.jsx("div", { ref: t, className: h("text-sm text-muted-foreground", a), ...r }),
);
M.displayName = "CardDescription";
const W = d.forwardRef(({ className: a, ...r }, t) =>
  e.jsx("div", { ref: t, className: h("p-lg pt-0", a), ...r }),
);
W.displayName = "CardContent";
const V = d.forwardRef(({ className: a, ...r }, t) =>
  e.jsx("div", { ref: t, className: h("flex items-center p-lg pt-0", a), ...r }),
);
V.displayName = "CardFooter";
try {
  ((A.displayName = "Card"),
    (A.__docgenInfo = { description: "", displayName: "Card", props: {} }));
} catch {}
try {
  ((W.displayName = "CardContent"),
    (W.__docgenInfo = { description: "", displayName: "CardContent", props: {} }));
} catch {}
try {
  ((M.displayName = "CardDescription"),
    (M.__docgenInfo = { description: "", displayName: "CardDescription", props: {} }));
} catch {}
try {
  ((V.displayName = "CardFooter"),
    (V.__docgenInfo = { description: "", displayName: "CardFooter", props: {} }));
} catch {}
try {
  ((D.displayName = "CardHeader"),
    (D.__docgenInfo = { description: "", displayName: "CardHeader", props: {} }));
} catch {}
try {
  ((I.displayName = "CardTitle"),
    (I.__docgenInfo = { description: "", displayName: "CardTitle", props: {} }));
} catch {}
try {
  ((Card.displayName = "Card"),
    (Card.__docgenInfo = { description: "", displayName: "Card", props: {} }));
} catch {}
try {
  ((CardContent.displayName = "CardContent"),
    (CardContent.__docgenInfo = { description: "", displayName: "CardContent", props: {} }));
} catch {}
try {
  ((CardDescription.displayName = "CardDescription"),
    (CardDescription.__docgenInfo = {
      description: "",
      displayName: "CardDescription",
      props: {},
    }));
} catch {}
try {
  ((CardFooter.displayName = "CardFooter"),
    (CardFooter.__docgenInfo = { description: "", displayName: "CardFooter", props: {} }));
} catch {}
try {
  ((CardHeader.displayName = "CardHeader"),
    (CardHeader.__docgenInfo = { description: "", displayName: "CardHeader", props: {} }));
} catch {}
try {
  ((CardTitle.displayName = "CardTitle"),
    (CardTitle.__docgenInfo = { description: "", displayName: "CardTitle", props: {} }));
} catch {}
const wa = {
    title: "Components/Overlays/Popover",
    component: p,
    parameters: { layout: "centered" },
  },
  C = {
    args: {
      content: e.jsxs("div", {
        className: "space-y-sm",
        children: [
          e.jsx("h4", { className: "font-medium leading-none", children: "Settings" }),
          e.jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "Configure your application settings here.",
          }),
        ],
      }),
      children: e.jsx(l, { children: "Open Popover" }),
    },
  },
  b = {
    render: () =>
      e.jsx(p, {
        content: e.jsxs("div", {
          className: "w-80 space-y-md",
          children: [
            e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium leading-none", children: "User Profile" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Update your profile information.",
                }),
              ],
            }),
            e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx(H, { htmlFor: "name", children: "Name" }),
                e.jsx($, { id: "name", placeholder: "Enter your name" }),
              ],
            }),
            e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx(H, { htmlFor: "email", children: "Email" }),
                e.jsx($, { id: "email", type: "email", placeholder: "Enter your email" }),
              ],
            }),
            e.jsxs("div", {
              className: "flex justify-end space-x-sm",
              children: [
                e.jsx(l, { variant: "outline", size: "sm", children: "Cancel" }),
                e.jsx(l, { size: "sm", children: "Save" }),
              ],
            }),
          ],
        }),
        children: e.jsxs(l, {
          variant: "outline",
          children: [e.jsx(Je, { className: "mr-sm h-4 w-4" }), "Edit Profile"],
        }),
      }),
  },
  w = {
    render: () =>
      e.jsxs("div", {
        className: "flex gap-md",
        children: [
          e.jsx(p, {
            variant: "primary",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Primary Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This is a primary popover.",
                }),
              ],
            }),
            children: e.jsx(l, { variant: "primary", children: "Primary" }),
          }),
          e.jsx(p, {
            variant: "accent",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Accent Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This is an accent popover.",
                }),
              ],
            }),
            children: e.jsx(l, { variant: "outline", children: "Accent" }),
          }),
          e.jsx(p, {
            variant: "secondary",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Secondary Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This is a secondary popover.",
                }),
              ],
            }),
            children: e.jsx(l, { variant: "outline", children: "Secondary" }),
          }),
          e.jsx(p, {
            variant: "destructive",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Destructive Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This is a destructive popover.",
                }),
              ],
            }),
            children: e.jsx(l, { variant: "outline", children: "Destructive" }),
          }),
        ],
      }),
  },
  B = {
    render: () =>
      e.jsxs("div", {
        className: "flex gap-md",
        children: [
          e.jsx(p, {
            size: "sm",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Small Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Compact content.",
                }),
              ],
            }),
            children: e.jsx(l, { size: "sm", children: "Small" }),
          }),
          e.jsx(p, {
            size: "md",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Medium Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Standard sized content with more space.",
                }),
              ],
            }),
            children: e.jsx(l, { children: "Medium" }),
          }),
          e.jsx(p, {
            size: "lg",
            content: e.jsxs("div", {
              className: "space-y-md",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Large Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Large popover with plenty of space for complex content.",
                }),
                e.jsxs("div", {
                  className: "space-y-sm",
                  children: [
                    e.jsx(N, { children: "Feature" }),
                    e.jsx(N, { variant: "secondary", children: "New" }),
                  ],
                }),
              ],
            }),
            children: e.jsx(l, { size: "lg", children: "Large" }),
          }),
        ],
      }),
  },
  R = {
    render: () =>
      e.jsxs("div", {
        className: "grid grid-cols-2 gap-xl p-xl",
        children: [
          e.jsx(p, {
            side: "top",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Top Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This appears above the trigger.",
                }),
              ],
            }),
            children: e.jsx(l, { children: "Top" }),
          }),
          e.jsx(p, {
            side: "right",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Right Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This appears to the right.",
                }),
              ],
            }),
            children: e.jsx(l, { children: "Right" }),
          }),
          e.jsx(p, {
            side: "bottom",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Bottom Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This appears below the trigger.",
                }),
              ],
            }),
            children: e.jsx(l, { children: "Bottom" }),
          }),
          e.jsx(p, {
            side: "left",
            content: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Left Popover" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "This appears to the left.",
                }),
              ],
            }),
            children: e.jsx(l, { children: "Left" }),
          }),
        ],
      }),
  },
  O = {
    render: () =>
      e.jsx(p, {
        content: e.jsxs(A, {
          className: "w-80",
          children: [
            e.jsx(D, {
              className: "pb-sm",
              children: e.jsxs(I, {
                className: "flex items-center gap-sm",
                children: [e.jsx(U, { className: "h-4 w-4" }), "Quick Settings"],
              }),
            }),
            e.jsxs(W, {
              className: "space-y-sm",
              children: [
                e.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    e.jsx("span", { className: "text-sm", children: "Notifications" }),
                    e.jsx(N, { variant: "secondary", children: "On" }),
                  ],
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    e.jsx("span", { className: "text-sm", children: "Dark Mode" }),
                    e.jsx(N, { variant: "outline", children: "Off" }),
                  ],
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    e.jsx("span", { className: "text-sm", children: "Auto-save" }),
                    e.jsx(N, { variant: "secondary", children: "On" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        children: e.jsxs(l, {
          variant: "outline",
          children: [e.jsx(U, { className: "mr-sm h-4 w-4" }), "Settings"],
        }),
      }),
  },
  S = {
    render: () =>
      e.jsx(p, {
        content: e.jsxs("div", {
          className: "w-80 space-y-sm",
          children: [
            e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h4", { className: "font-medium", children: "Notifications" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "You have 3 new notifications.",
                }),
              ],
            }),
            e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsxs("div", {
                  className: "flex items-start gap-sm rounded-md bg-muted/50 p-sm",
                  children: [
                    e.jsx(P, { className: "mt-0.5 h-4 w-4 text-primary" }),
                    e.jsxs("div", {
                      className: "space-y-xs",
                      children: [
                        e.jsx("p", { className: "text-sm font-medium", children: "New message" }),
                        e.jsx("p", {
                          className: "text-xs text-muted-foreground",
                          children: "You received a new message from John.",
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "flex items-start gap-sm rounded-md bg-muted/50 p-sm",
                  children: [
                    e.jsx(P, { className: "mt-0.5 h-4 w-4 text-accent" }),
                    e.jsxs("div", {
                      className: "space-y-xs",
                      children: [
                        e.jsx("p", {
                          className: "text-sm font-medium",
                          children: "Task completed",
                        }),
                        e.jsx("p", {
                          className: "text-xs text-muted-foreground",
                          children: 'Your task "Update documentation" is done.',
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "flex items-start gap-sm rounded-md bg-muted/50 p-sm",
                  children: [
                    e.jsx(P, { className: "mt-0.5 h-4 w-4 text-secondary" }),
                    e.jsxs("div", {
                      className: "space-y-xs",
                      children: [
                        e.jsx("p", { className: "text-sm font-medium", children: "Reminder" }),
                        e.jsx("p", {
                          className: "text-xs text-muted-foreground",
                          children: "Don't forget about the team meeting at 3 PM.",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        children: e.jsxs(l, {
          variant: "outline",
          size: "icon",
          className: "relative",
          children: [
            e.jsx(P, { className: "h-4 w-4" }),
            e.jsx(N, { className: "absolute -right-1 -top-1 h-5 w-5 text-xs", children: "3" }),
          ],
        }),
      }),
  };
var G, J, K;
C.parameters = {
  ...C.parameters,
  docs: {
    ...((G = C.parameters) == null ? void 0 : G.docs),
    source: {
      originalSource: `{
  args: {
    content: <div className="space-y-sm">
        <h4 className="font-medium leading-none">Settings</h4>
        <p className="text-sm text-muted-foreground">Configure your application settings here.</p>
      </div>,
    children: <Button>Open Popover</Button>
  }
}`,
      ...((K = (J = C.parameters) == null ? void 0 : J.docs) == null ? void 0 : K.source),
    },
  },
};
var Q, Z, X;
b.parameters = {
  ...b.parameters,
  docs: {
    ...((Q = b.parameters) == null ? void 0 : Q.docs),
    source: {
      originalSource: `{
  render: () => <PopoverWrapper content={<div className="w-80 space-y-md">
          <div className="space-y-sm">
            <h4 className="font-medium leading-none">User Profile</h4>
            <p className="text-sm text-muted-foreground">Update your profile information.</p>
          </div>
          <div className="space-y-sm">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-sm">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="flex justify-end space-x-sm">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>}>
      <Button variant="outline">
        <User className="mr-sm h-4 w-4" />
        Edit Profile
      </Button>
    </PopoverWrapper>
}`,
      ...((X = (Z = b.parameters) == null ? void 0 : Z.docs) == null ? void 0 : X.source),
    },
  },
};
var ee, ae, te;
w.parameters = {
  ...w.parameters,
  docs: {
    ...((ee = w.parameters) == null ? void 0 : ee.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex gap-md">
      <PopoverWrapper variant="primary" content={<div className="space-y-sm">
            <h4 className="font-medium">Primary Popover</h4>
            <p className="text-sm text-muted-foreground">This is a primary popover.</p>
          </div>}>
        <Button variant="primary">Primary</Button>
      </PopoverWrapper>

      <PopoverWrapper variant="accent" content={<div className="space-y-sm">
            <h4 className="font-medium">Accent Popover</h4>
            <p className="text-sm text-muted-foreground">This is an accent popover.</p>
          </div>}>
        <Button variant="outline">Accent</Button>
      </PopoverWrapper>

      <PopoverWrapper variant="secondary" content={<div className="space-y-sm">
            <h4 className="font-medium">Secondary Popover</h4>
            <p className="text-sm text-muted-foreground">This is a secondary popover.</p>
          </div>}>
        <Button variant="outline">Secondary</Button>
      </PopoverWrapper>

      <PopoverWrapper variant="destructive" content={<div className="space-y-sm">
            <h4 className="font-medium">Destructive Popover</h4>
            <p className="text-sm text-muted-foreground">This is a destructive popover.</p>
          </div>}>
        <Button variant="outline">Destructive</Button>
      </PopoverWrapper>
    </div>
}`,
      ...((te = (ae = w.parameters) == null ? void 0 : ae.docs) == null ? void 0 : te.source),
    },
  },
};
var re, se, oe;
B.parameters = {
  ...B.parameters,
  docs: {
    ...((re = B.parameters) == null ? void 0 : re.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex gap-md">
      <PopoverWrapper size="sm" content={<div className="space-y-sm">
            <h4 className="font-medium">Small Popover</h4>
            <p className="text-sm text-muted-foreground">Compact content.</p>
          </div>}>
        <Button size="sm">Small</Button>
      </PopoverWrapper>

      <PopoverWrapper size="md" content={<div className="space-y-sm">
            <h4 className="font-medium">Medium Popover</h4>
            <p className="text-sm text-muted-foreground">Standard sized content with more space.</p>
          </div>}>
        <Button>Medium</Button>
      </PopoverWrapper>

      <PopoverWrapper size="lg" content={<div className="space-y-md">
            <h4 className="font-medium">Large Popover</h4>
            <p className="text-sm text-muted-foreground">
              Large popover with plenty of space for complex content.
            </p>
            <div className="space-y-sm">
              <Badge>Feature</Badge>
              <Badge variant="secondary">New</Badge>
            </div>
          </div>}>
        <Button size="lg">Large</Button>
      </PopoverWrapper>
    </div>
}`,
      ...((oe = (se = B.parameters) == null ? void 0 : se.docs) == null ? void 0 : oe.source),
    },
  },
};
var ne, ie, de;
R.parameters = {
  ...R.parameters,
  docs: {
    ...((ne = R.parameters) == null ? void 0 : ne.docs),
    source: {
      originalSource: `{
  render: () => <div className="grid grid-cols-2 gap-xl p-xl">
      <PopoverWrapper side="top" content={<div className="space-y-sm">
            <h4 className="font-medium">Top Popover</h4>
            <p className="text-sm text-muted-foreground">This appears above the trigger.</p>
          </div>}>
        <Button>Top</Button>
      </PopoverWrapper>

      <PopoverWrapper side="right" content={<div className="space-y-sm">
            <h4 className="font-medium">Right Popover</h4>
            <p className="text-sm text-muted-foreground">This appears to the right.</p>
          </div>}>
        <Button>Right</Button>
      </PopoverWrapper>

      <PopoverWrapper side="bottom" content={<div className="space-y-sm">
            <h4 className="font-medium">Bottom Popover</h4>
            <p className="text-sm text-muted-foreground">This appears below the trigger.</p>
          </div>}>
        <Button>Bottom</Button>
      </PopoverWrapper>

      <PopoverWrapper side="left" content={<div className="space-y-sm">
            <h4 className="font-medium">Left Popover</h4>
            <p className="text-sm text-muted-foreground">This appears to the left.</p>
          </div>}>
        <Button>Left</Button>
      </PopoverWrapper>
    </div>
}`,
      ...((de = (ie = R.parameters) == null ? void 0 : ie.docs) == null ? void 0 : de.source),
    },
  },
};
var ce, le, pe;
O.parameters = {
  ...O.parameters,
  docs: {
    ...((ce = O.parameters) == null ? void 0 : ce.docs),
    source: {
      originalSource: `{
  render: () => <PopoverWrapper content={<Card className="w-80">
          <CardHeader className="pb-sm">
            <CardTitle className="flex items-center gap-sm">
              <Settings className="h-4 w-4" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <Badge variant="secondary">On</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <Badge variant="outline">Off</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-save</span>
              <Badge variant="secondary">On</Badge>
            </div>
          </CardContent>
        </Card>}>
      <Button variant="outline">
        <Settings className="mr-sm h-4 w-4" />
        Settings
      </Button>
    </PopoverWrapper>
}`,
      ...((pe = (le = O.parameters) == null ? void 0 : le.docs) == null ? void 0 : pe.source),
    },
  },
};
var me, ue, ve;
S.parameters = {
  ...S.parameters,
  docs: {
    ...((me = S.parameters) == null ? void 0 : me.docs),
    source: {
      originalSource: `{
  render: () => <PopoverWrapper content={<div className="w-80 space-y-sm">
          <div className="space-y-sm">
            <h4 className="font-medium">Notifications</h4>
            <p className="text-sm text-muted-foreground">You have 3 new notifications.</p>
          </div>
          <div className="space-y-sm">
            <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-primary" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">New message</p>
                <p className="text-xs text-muted-foreground">
                  You received a new message from John.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-accent" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">Task completed</p>
                <p className="text-xs text-muted-foreground">
                  Your task "Update documentation" is done.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-secondary" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">Reminder</p>
                <p className="text-xs text-muted-foreground">
                  Don't forget about the team meeting at 3 PM.
                </p>
              </div>
            </div>
          </div>
        </div>}>
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <Badge className="absolute -right-1 -top-1 h-5 w-5 text-xs">3</Badge>
      </Button>
    </PopoverWrapper>
}`,
      ...((ve = (ue = S.parameters) == null ? void 0 : ue.docs) == null ? void 0 : ve.source),
    },
  },
};
const Ba = [
  "Default",
  "WithForm",
  "DifferentVariants",
  "DifferentSizes",
  "DifferentPositions",
  "WithCardContent",
  "NotificationsMenu",
];
export {
  C as Default,
  R as DifferentPositions,
  B as DifferentSizes,
  w as DifferentVariants,
  S as NotificationsMenu,
  O as WithCardContent,
  b as WithForm,
  Ba as __namedExportsOrder,
  wa as default,
};
