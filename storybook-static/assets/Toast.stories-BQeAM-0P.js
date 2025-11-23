"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as p } from "./index--tQcscZa.js";
import { c as X } from "./index-Dp35_cgR.js";
import { B as s } from "./Button-DSOQhk0m.js";
import { c as j } from "./utils-CyawMXzk.js";
import { X as K } from "./x-CU17JbhH.js";
import { I as C, C as Q } from "./info-C_6EWaJU.js";
import { c as F } from "./createLucideIcon-CD2Sj3SA.js";
import "./index-DDxmA3Og.js";
import "./index-CJkT59yQ.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Z = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  ee = F("CircleCheckBig", Z);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const te = [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq",
      },
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  oe = F("TriangleAlert", te);
function se() {
  const [t, o] = p.useState([]),
    r = p.useCallback((a) => {
      o((d) => d.filter((i) => i.id !== a));
    }, []),
    c = p.useCallback(
      (a) => {
        const d = Math.random().toString(36).substr(2, 9),
          i = { id: d, duration: 5e3, ...a };
        return (
          o((u) => [...u, i]),
          i.duration &&
            i.duration > 0 &&
            setTimeout(() => {
              r(d);
            }, i.duration),
          d
        );
      },
      [r],
    ),
    n = p.useCallback(() => {
      o([]);
    }, []),
    f = p.useCallback((a, d) => {
      o((i) => i.map((u) => (u.id === a ? { ...u, ...d } : u)));
    }, []);
  return { toasts: t, toast: c, dismiss: r, dismissAll: n, updateToast: f };
}
const ne = X(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-sm overflow-hidden rounded-md border p-md pr-lg shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        type: {
          default: "border bg-background text-foreground",
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
          primary: "border-primary/20 bg-primary/10 text-primary-foreground",
          accent: "border-accent/20 bg-accent/10 text-accent-foreground",
          destructive: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          secondary: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
        },
      },
      defaultVariants: { type: "default" },
    },
  ),
  re = X("h-4 w-4 flex-shrink-0", {
    variants: {
      type: {
        default: "text-foreground",
        success: "text-accent",
        error: "text-destructive",
        warning: "text-secondary",
        info: "text-primary",
        primary: "text-primary",
        accent: "text-accent",
        destructive: "text-destructive",
        secondary: "text-secondary",
      },
    },
    defaultVariants: { type: "default" },
  }),
  ae = (t) => {
    switch (t) {
      case "success":
        return ee;
      case "error":
        return Q;
      case "warning":
        return oe;
      case "info":
        return C;
      default:
        return C;
    }
  },
  h = p.forwardRef(({ className: t, toast: o, onDismiss: r, type: c = o.type, ...n }, f) => {
    const a = ae(o.type);
    return e.jsxs("div", {
      ref: f,
      className: j(ne({ type: c, className: t })),
      ...n,
      children: [
        e.jsxs("div", {
          className: "flex flex-1 items-start space-x-sm",
          children: [
            e.jsx(a, { className: j(re({ type: o.type })) }),
            e.jsxs("div", {
              className: "flex-1 space-y-xs",
              children: [
                o.title && e.jsx("div", { className: "text-sm font-semibold", children: o.title }),
                o.description &&
                  e.jsx("div", { className: "text-sm opacity-90", children: o.description }),
                o.action &&
                  e.jsx("div", {
                    className: "mt-sm",
                    children: e.jsx(s, {
                      variant: "outline",
                      size: "sm",
                      onClick: o.action.onClick,
                      className: "h-8 px-xs text-xs",
                      children: o.action.label,
                    }),
                  }),
              ],
            }),
          ],
        }),
        e.jsx(s, {
          variant: "ghost",
          size: "icon",
          className:
            "absolute right-xs top-xs h-6 w-6 rounded-md p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
          onClick: () => r(o.id),
          children: e.jsx(K, { className: "h-4 w-4" }),
        }),
      ],
    });
  });
h.displayName = "Toast";
try {
  ((h.displayName = "Toast"),
    (h.__docgenInfo = {
      description: "",
      displayName: "Toast",
      props: {
        toast: {
          defaultValue: null,
          description: "",
          name: "toast",
          required: !0,
          type: { name: "Toast" },
        },
        onDismiss: {
          defaultValue: null,
          description: "",
          name: "onDismiss",
          required: !0,
          type: { name: "(id: string) => void" },
        },
        type: {
          defaultValue: { value: "toast.type" },
          description: "",
          name: "type",
          required: !1,
          type: {
            name: '"default" | "primary" | "secondary" | "accent" | "destructive" | "success" | "error" | "warning" | "info" | null | undefined',
          },
        },
      },
    }));
} catch {}
const G = p.createContext(void 0);
function l({ children: t, position: o = "top-right", maxToasts: r = 5 }) {
  const c = se(),
    { toasts: n, toast: f, dismiss: a, dismissAll: d, updateToast: i } = c,
    u = n.slice(-r),
    J = {
      "top-left": "top-4 left-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-4 right-4",
    };
  return e.jsxs(G.Provider, {
    value: { toast: f, dismiss: a, dismissAll: d, updateToast: i },
    children: [
      t,
      e.jsx(ce, {
        position: o,
        positionClasses: J[o],
        children: u.map((k) => e.jsx(h, { toast: k, onDismiss: a }, k.id)),
      }),
    ],
  });
}
function ie() {
  const t = p.useContext(G);
  if (t === void 0) throw new Error("useToastContext must be used within a ToastProvider");
  return t;
}
function m() {
  const { toast: t, dismiss: o, dismissAll: r, updateToast: c } = ie();
  return {
    toast: t,
    dismiss: o,
    dismissAll: r,
    updateToast: c,
    success: (n) => t({ ...n, type: "success" }),
    error: (n) => t({ ...n, type: "error" }),
    warning: (n) => t({ ...n, type: "warning" }),
    info: (n) => t({ ...n, type: "info" }),
  };
}
function ce({ children: t, positionClasses: o }) {
  return e.jsx("div", {
    className: j("fixed z-[100] flex max-h-screen w-full flex-col-reverse p-0 sm:flex-col", o),
    style: { pointerEvents: "none" },
    children: e.jsx("div", { className: "pointer-events-auto flex flex-col gap-2", children: t }),
  });
}
try {
  ((l.displayName = "ToastProvider"),
    (l.__docgenInfo = {
      description: "",
      displayName: "ToastProvider",
      props: {
        position: {
          defaultValue: { value: "top-right" },
          description: "",
          name: "position",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"top-left"' },
              { value: '"top-center"' },
              { value: '"top-right"' },
              { value: '"bottom-left"' },
              { value: '"bottom-center"' },
              { value: '"bottom-right"' },
            ],
          },
        },
        maxToasts: {
          defaultValue: { value: "5" },
          description: "",
          name: "maxToasts",
          required: !1,
          type: { name: "number | undefined" },
        },
      },
    }));
} catch {}
function de() {
  const { toast: t, success: o, error: r, warning: c, info: n } = m();
  return e.jsxs("div", {
    className: "space-y-md p-md",
    children: [
      e.jsx("h2", { className: "text-lg font-semibold", children: "Toast Examples" }),
      e.jsxs("div", {
        className: "flex flex-wrap gap-sm",
        children: [
          e.jsx(s, {
            onClick: () =>
              t({
                type: "default",
                title: "Default Toast",
                description: "This is a default toast message.",
              }),
            children: "Default Toast",
          }),
          e.jsx(s, {
            onClick: () =>
              o({ title: "Success!", description: "Your action was completed successfully." }),
            children: "Success Toast",
          }),
          e.jsx(s, {
            onClick: () =>
              r({
                title: "Error occurred",
                description: "Something went wrong. Please try again.",
              }),
            children: "Error Toast",
          }),
          e.jsx(s, {
            onClick: () =>
              c({ title: "Warning", description: "Please check your input before proceeding." }),
            children: "Warning Toast",
          }),
          e.jsx(s, {
            onClick: () =>
              n({ title: "Information", description: "Here is some useful information for you." }),
            children: "Info Toast",
          }),
          e.jsx(s, {
            onClick: () =>
              o({
                title: "Toast with Action",
                description: "This toast has an action button.",
                action: { label: "Undo", onClick: () => console.log("Action clicked!") },
              }),
            children: "Toast with Action",
          }),
          e.jsx(s, {
            onClick: () =>
              t({
                type: "success",
                title: "Long Duration Toast",
                description: "This toast will stay visible for 10 seconds.",
                duration: 1e4,
              }),
            children: "Long Duration Toast",
          }),
          e.jsx(s, {
            onClick: () =>
              t({
                type: "info",
                title: "Persistent Toast",
                description: "This toast will not auto-dismiss.",
                duration: 0,
              }),
            children: "Persistent Toast",
          }),
        ],
      }),
    ],
  });
}
const ye = {
    title: "Components/Toast",
    component: h,
    parameters: { layout: "centered" },
    decorators: [(t) => e.jsx(l, { position: "top-right", children: e.jsx(t, {}) })],
  },
  x = { render: () => e.jsx(de, {}) },
  g = {
    render: () =>
      e.jsx(l, {
        position: "top-center",
        children: e.jsx("div", {
          className: "p-md",
          children: e.jsx(s, {
            onClick: () => {
              const { success: t } = m();
              t({ title: "Success!", description: "Your action was completed successfully." });
            },
            children: "Show Success Toast",
          }),
        }),
      }),
  },
  v = {
    render: () =>
      e.jsx(l, {
        position: "top-center",
        children: e.jsx("div", {
          className: "p-md",
          children: e.jsx(s, {
            onClick: () => {
              const { error: t } = m();
              t({
                title: "Error occurred",
                description: "Something went wrong. Please try again.",
              });
            },
            children: "Show Error Toast",
          }),
        }),
      }),
  },
  T = {
    render: () =>
      e.jsx(l, {
        position: "top-center",
        children: e.jsx("div", {
          className: "p-md",
          children: e.jsx(s, {
            onClick: () => {
              const { warning: t } = m();
              t({ title: "Warning", description: "Please check your input before proceeding." });
            },
            children: "Show Warning Toast",
          }),
        }),
      }),
  },
  y = {
    render: () =>
      e.jsx(l, {
        position: "top-center",
        children: e.jsx("div", {
          className: "p-md",
          children: e.jsx(s, {
            onClick: () => {
              const { info: t } = m();
              t({ title: "Information", description: "Here is some useful information for you." });
            },
            children: "Show Info Toast",
          }),
        }),
      }),
  },
  w = {
    render: () =>
      e.jsx(l, {
        position: "top-center",
        children: e.jsx("div", {
          className: "p-md",
          children: e.jsx(s, {
            onClick: () => {
              const { success: t } = m();
              t({
                title: "Toast with Action",
                description: "This toast has an action button.",
                action: { label: "Undo", onClick: () => alert("Action clicked!") },
              });
            },
            children: "Show Toast with Action",
          }),
        }),
      }),
  },
  b = {
    render: () =>
      e.jsxs("div", {
        className: "space-y-md",
        children: [
          e.jsx("h3", {
            className: "text-lg font-semibold",
            children: "Different Toast Positions",
          }),
          [
            "top-left",
            "top-center",
            "top-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ].map((t) =>
            e.jsx(
              l,
              {
                position: t,
                children: e.jsx("div", {
                  className: "p-md",
                  children: e.jsxs(s, {
                    onClick: () => {
                      const { info: o } = m();
                      o({
                        title: `${t} Toast`,
                        description: `This toast appears at ${t.replace("-", " ")}.`,
                      });
                    },
                    children: ["Show ", t.replace("-", " "), " Toast"],
                  }),
                }),
              },
              t,
            ),
          ),
        ],
      }),
  };
var N, S, P;
x.parameters = {
  ...x.parameters,
  docs: {
    ...((N = x.parameters) == null ? void 0 : N.docs),
    source: {
      originalSource: `{
  render: () => <ToastDemo />
}`,
      ...((P = (S = x.parameters) == null ? void 0 : S.docs) == null ? void 0 : P.source),
    },
  },
};
var _, A, B;
g.parameters = {
  ...g.parameters,
  docs: {
    ...((_ = g.parameters) == null ? void 0 : _.docs),
    source: {
      originalSource: `{
  render: () => <ToastProvider position="top-center">
      <div className="p-md">
        <Button onClick={() => {
        const {
          success
        } = useToast();
        success({
          title: "Success!",
          description: "Your action was completed successfully."
        });
      }}>
          Show Success Toast
        </Button>
      </div>
    </ToastProvider>
}`,
      ...((B = (A = g.parameters) == null ? void 0 : A.docs) == null ? void 0 : B.source),
    },
  },
};
var I, D, E;
v.parameters = {
  ...v.parameters,
  docs: {
    ...((I = v.parameters) == null ? void 0 : I.docs),
    source: {
      originalSource: `{
  render: () => <ToastProvider position="top-center">
      <div className="p-md">
        <Button onClick={() => {
        const {
          error
        } = useToast();
        error({
          title: "Error occurred",
          description: "Something went wrong. Please try again."
        });
      }}>
          Show Error Toast
        </Button>
      </div>
    </ToastProvider>
}`,
      ...((E = (D = v.parameters) == null ? void 0 : D.docs) == null ? void 0 : E.source),
    },
  },
};
var V, W, $;
T.parameters = {
  ...T.parameters,
  docs: {
    ...((V = T.parameters) == null ? void 0 : V.docs),
    source: {
      originalSource: `{
  render: () => <ToastProvider position="top-center">
      <div className="p-md">
        <Button onClick={() => {
        const {
          warning
        } = useToast();
        warning({
          title: "Warning",
          description: "Please check your input before proceeding."
        });
      }}>
          Show Warning Toast
        </Button>
      </div>
    </ToastProvider>
}`,
      ...(($ = (W = T.parameters) == null ? void 0 : W.docs) == null ? void 0 : $.source),
    },
  },
};
var q, M, z;
y.parameters = {
  ...y.parameters,
  docs: {
    ...((q = y.parameters) == null ? void 0 : q.docs),
    source: {
      originalSource: `{
  render: () => <ToastProvider position="top-center">
      <div className="p-md">
        <Button onClick={() => {
        const {
          info
        } = useToast();
        info({
          title: "Information",
          description: "Here is some useful information for you."
        });
      }}>
          Show Info Toast
        </Button>
      </div>
    </ToastProvider>
}`,
      ...((z = (M = y.parameters) == null ? void 0 : M.docs) == null ? void 0 : z.source),
    },
  },
};
var L, H, U;
w.parameters = {
  ...w.parameters,
  docs: {
    ...((L = w.parameters) == null ? void 0 : L.docs),
    source: {
      originalSource: `{
  render: () => <ToastProvider position="top-center">
      <div className="p-md">
        <Button onClick={() => {
        const {
          success
        } = useToast();
        success({
          title: "Toast with Action",
          description: "This toast has an action button.",
          action: {
            label: "Undo",
            onClick: () => alert("Action clicked!")
          }
        });
      }}>
          Show Toast with Action
        </Button>
      </div>
    </ToastProvider>
}`,
      ...((U = (H = w.parameters) == null ? void 0 : H.docs) == null ? void 0 : U.source),
    },
  },
};
var Y, R, O;
b.parameters = {
  ...b.parameters,
  docs: {
    ...((Y = b.parameters) == null ? void 0 : Y.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-md">
      <h3 className="text-lg font-semibold">Different Toast Positions</h3>

      {(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as const).map(position => <ToastProvider key={position} position={position}>
          <div className="p-md">
            <Button onClick={() => {
          const {
            info
          } = useToast();
          info({
            title: \`\${position} Toast\`,
            description: \`This toast appears at \${position.replace("-", " ")}.\`
          });
        }}>
              Show {position.replace("-", " ")} Toast
            </Button>
          </div>
        </ToastProvider>)}
    </div>
}`,
      ...((O = (R = b.parameters) == null ? void 0 : R.docs) == null ? void 0 : O.source),
    },
  },
};
const we = ["Default", "Success", "Error", "Warning", "Info", "WithAction", "DifferentPositions"];
export {
  x as Default,
  b as DifferentPositions,
  v as Error,
  y as Info,
  g as Success,
  T as Warning,
  w as WithAction,
  we as __namedExportsOrder,
  ye as default,
};
