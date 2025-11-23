"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as m } from "./index--tQcscZa.js";
import { b as H, c as J, u as Q, P as T, a as j } from "./index-jG1cqCvV.js";
import { c as P, R as U, I as W } from "./index-BUCLlBN1.js";
import { P as X } from "./index-yb7JCnm7.js";
import { u as Y } from "./index-ghU8WpXh.js";
import { c as w } from "./utils-CyawMXzk.js";
import "./index-pvjnvxJ7.js";
import "./index-CJkT59yQ.js";
var y = "Tabs",
  [Z] = J(y, [P]),
  S = P(),
  [ee, _] = Z(y),
  E = m.forwardRef((a, s) => {
    const {
        __scopeTabs: t,
        value: n,
        onValueChange: i,
        defaultValue: l,
        orientation: r = "horizontal",
        dir: p,
        activationMode: g = "automatic",
        ...v
      } = a,
      c = Y(p),
      [o, f] = H({ prop: n, onChange: i, defaultProp: l ?? "", caller: y });
    return e.jsx(ee, {
      scope: t,
      baseId: Q(),
      value: o,
      onValueChange: f,
      orientation: r,
      dir: c,
      activationMode: g,
      children: e.jsx(T.div, { dir: c, "data-orientation": r, ...v, ref: s }),
    });
  });
E.displayName = y;
var L = "TabsList",
  k = m.forwardRef((a, s) => {
    const { __scopeTabs: t, loop: n = !0, ...i } = a,
      l = _(L, t),
      r = S(t);
    return e.jsx(U, {
      asChild: !0,
      ...r,
      orientation: l.orientation,
      dir: l.dir,
      loop: n,
      children: e.jsx(T.div, { role: "tablist", "aria-orientation": l.orientation, ...i, ref: s }),
    });
  });
k.displayName = L;
var G = "TabsTrigger",
  D = m.forwardRef((a, s) => {
    const { __scopeTabs: t, value: n, disabled: i = !1, ...l } = a,
      r = _(G, t),
      p = S(t),
      g = O(r.baseId, n),
      v = q(r.baseId, n),
      c = n === r.value;
    return e.jsx(W, {
      asChild: !0,
      ...p,
      focusable: !i,
      active: c,
      children: e.jsx(T.button, {
        type: "button",
        role: "tab",
        "aria-selected": c,
        "aria-controls": v,
        "data-state": c ? "active" : "inactive",
        "data-disabled": i ? "" : void 0,
        disabled: i,
        id: g,
        ...l,
        ref: s,
        onMouseDown: j(a.onMouseDown, (o) => {
          !i && o.button === 0 && o.ctrlKey === !1 ? r.onValueChange(n) : o.preventDefault();
        }),
        onKeyDown: j(a.onKeyDown, (o) => {
          [" ", "Enter"].includes(o.key) && r.onValueChange(n);
        }),
        onFocus: j(a.onFocus, () => {
          const o = r.activationMode !== "manual";
          !c && !i && o && r.onValueChange(n);
        }),
      }),
    });
  });
D.displayName = G;
var F = "TabsContent",
  $ = m.forwardRef((a, s) => {
    const { __scopeTabs: t, value: n, forceMount: i, children: l, ...r } = a,
      p = _(F, t),
      g = O(p.baseId, n),
      v = q(p.baseId, n),
      c = n === p.value,
      o = m.useRef(c);
    return (
      m.useEffect(() => {
        const f = requestAnimationFrame(() => (o.current = !1));
        return () => cancelAnimationFrame(f);
      }, []),
      e.jsx(X, {
        present: i || c,
        children: ({ present: f }) =>
          e.jsx(T.div, {
            "data-state": c ? "active" : "inactive",
            "data-orientation": p.orientation,
            role: "tabpanel",
            "aria-labelledby": g,
            hidden: !f,
            id: v,
            tabIndex: 0,
            ...r,
            ref: s,
            style: { ...a.style, animationDuration: o.current ? "0s" : void 0 },
            children: f && l,
          }),
      })
    );
  });
$.displayName = F;
function O(a, s) {
  return `${a}-trigger-${s}`;
}
function q(a, s) {
  return `${a}-content-${s}`;
}
var ae = E,
  K = k,
  B = D,
  z = $;
const b = ae,
  x = m.forwardRef(({ className: a, ...s }, t) =>
    e.jsx(K, {
      ref: t,
      className: w(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        a,
      ),
      ...s,
    }),
  );
x.displayName = K.displayName;
const d = m.forwardRef(({ className: a, ...s }, t) =>
  e.jsx(B, {
    ref: t,
    className: w(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      a,
    ),
    ...s,
  }),
);
d.displayName = B.displayName;
const u = m.forwardRef(({ className: a, ...s }, t) =>
  e.jsx(z, {
    ref: t,
    className: w(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      a,
    ),
    ...s,
  }),
);
u.displayName = z.displayName;
try {
  ((b.displayName = "Tabs"),
    (b.__docgenInfo = {
      description: "",
      displayName: "Tabs",
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
  ((u.displayName = "TabsContent"),
    (u.__docgenInfo = {
      description: "",
      displayName: "TabsContent",
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
  ((x.displayName = "TabsList"),
    (x.__docgenInfo = {
      description: "",
      displayName: "TabsList",
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
  ((d.displayName = "TabsTrigger"),
    (d.__docgenInfo = {
      description: "",
      displayName: "TabsTrigger",
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
const ue = {
    title: "Menus/Tabs",
    component: b,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
  },
  h = {
    render: () =>
      e.jsxs(b, {
        defaultValue: "account",
        className: "w-[400px]",
        children: [
          e.jsxs(x, {
            className: "grid w-full grid-cols-2",
            children: [
              e.jsx(d, { value: "account", children: "Account" }),
              e.jsx(d, { value: "password", children: "Password" }),
            ],
          }),
          e.jsx(u, {
            value: "account",
            className: "mt-md",
            children: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h3", { className: "text-lg font-medium", children: "Account Settings" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Make changes to your account here. Click save when you're done.",
                }),
              ],
            }),
          }),
          e.jsx(u, {
            value: "password",
            className: "mt-md",
            children: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h3", { className: "text-lg font-medium", children: "Password Settings" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Change your password here. After saving, you'll be logged out.",
                }),
              ],
            }),
          }),
        ],
      }),
  },
  N = {
    render: () =>
      e.jsxs(b, {
        defaultValue: "overview",
        className: "w-[600px]",
        children: [
          e.jsxs(x, {
            className: "grid w-full grid-cols-4",
            children: [
              e.jsx(d, { value: "overview", children: "Overview" }),
              e.jsx(d, { value: "analytics", children: "Analytics" }),
              e.jsx(d, { value: "reports", children: "Reports" }),
              e.jsx(d, { value: "notifications", children: "Notifications" }),
            ],
          }),
          e.jsx(u, {
            value: "overview",
            className: "mt-md",
            children: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h3", { className: "text-lg font-medium", children: "Overview" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Get a summary of your account activity and performance.",
                }),
              ],
            }),
          }),
          e.jsx(u, {
            value: "analytics",
            className: "mt-md",
            children: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h3", { className: "text-lg font-medium", children: "Analytics" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "View detailed analytics and insights about your data.",
                }),
              ],
            }),
          }),
          e.jsx(u, {
            value: "reports",
            className: "mt-md",
            children: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h3", { className: "text-lg font-medium", children: "Reports" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Generate and download reports for your account.",
                }),
              ],
            }),
          }),
          e.jsx(u, {
            value: "notifications",
            className: "mt-md",
            children: e.jsxs("div", {
              className: "space-y-sm",
              children: [
                e.jsx("h3", { className: "text-lg font-medium", children: "Notifications" }),
                e.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Manage your notification preferences and settings.",
                }),
              ],
            }),
          }),
        ],
      }),
  };
var C, A, I;
h.parameters = {
  ...h.parameters,
  docs: {
    ...((C = h.parameters) == null ? void 0 : C.docs),
    source: {
      originalSource: `{
  render: () => <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-md">
        <div className="space-y-sm">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password" className="mt-md">
        <div className="space-y-sm">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
}`,
      ...((I = (A = h.parameters) == null ? void 0 : A.docs) == null ? void 0 : I.source),
    },
  },
};
var R, M, V;
N.parameters = {
  ...N.parameters,
  docs: {
    ...((R = N.parameters) == null ? void 0 : R.docs),
    source: {
      originalSource: `{
  render: () => <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-md">
        <div className="space-y-sm">
          <h3 className="text-lg font-medium">Overview</h3>
          <p className="text-sm text-muted-foreground">
            Get a summary of your account activity and performance.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-md">
        <div className="space-y-sm">
          <h3 className="text-lg font-medium">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            View detailed analytics and insights about your data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="mt-md">
        <div className="space-y-sm">
          <h3 className="text-lg font-medium">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and download reports for your account.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications" className="mt-md">
        <div className="space-y-sm">
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences and settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
}`,
      ...((V = (M = N.parameters) == null ? void 0 : M.docs) == null ? void 0 : V.source),
    },
  },
};
const me = ["Default", "MultipleTabs"];
export { h as Default, N as MultipleTabs, me as __namedExportsOrder, ue as default };
