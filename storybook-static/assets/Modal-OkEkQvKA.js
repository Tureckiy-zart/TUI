"use client";
import { j as o } from "./jsx-runtime-0-JxQnzY.js";
import {
  R as C,
  T as b,
  P as j,
  C as u,
  a as g,
  b as N,
  D as M,
  O as x,
} from "./index-m_zWotLa.js";
import { r } from "./index--tQcscZa.js";
import { c as d } from "./utils-CyawMXzk.js";
import { X as I } from "./x-CU17JbhH.js";
const _ = C,
  f = b,
  l = j,
  y = g,
  s = r.forwardRef(({ className: e, ...a }, t) =>
    o.jsx(x, {
      ref: t,
      className: d(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        e,
      ),
      ...a,
    }),
  );
s.displayName = x.displayName;
const n = r.forwardRef(({ className: e, children: a, ...t }, h) =>
  o.jsxs(l, {
    children: [
      o.jsx(s, {}),
      o.jsxs(u, {
        ref: h,
        className: d(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg duration-200 sm:rounded-lg",
          e,
        ),
        ...t,
        children: [
          a,
          o.jsxs(g, {
            className:
              "absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            children: [
              o.jsx(I, { className: "h-4 w-4" }),
              o.jsx("span", { className: "sr-only", children: "Close" }),
            ],
          }),
        ],
      }),
    ],
  }),
);
n.displayName = u.displayName;
const i = ({ className: e, ...a }) =>
  o.jsx("div", { className: d("flex flex-col space-y-xs text-center sm:text-left", e), ...a });
i.displayName = "ModalHeader";
const c = ({ className: e, ...a }) =>
  o.jsx("div", {
    className: d("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-sm", e),
    ...a,
  });
c.displayName = "ModalFooter";
const p = r.forwardRef(({ className: e, ...a }, t) =>
  o.jsx(N, { ref: t, className: d("text-lg font-semibold leading-none tracking-tight", e), ...a }),
);
p.displayName = N.displayName;
const m = r.forwardRef(({ className: e, ...a }, t) =>
  o.jsx(M, { ref: t, className: d("text-sm text-muted-foreground", e), ...a }),
);
m.displayName = M.displayName;
try {
  ((_.displayName = "Modal"),
    (_.__docgenInfo = { description: "", displayName: "Modal", props: {} }));
} catch {}
try {
  ((y.displayName = "ModalClose"),
    (y.__docgenInfo = {
      description: "",
      displayName: "ModalClose",
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
  ((n.displayName = "ModalContent"),
    (n.__docgenInfo = {
      description: "",
      displayName: "ModalContent",
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
  ((m.displayName = "ModalDescription"),
    (m.__docgenInfo = {
      description: "",
      displayName: "ModalDescription",
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
  ((c.displayName = "ModalFooter"),
    (c.__docgenInfo = { description: "", displayName: "ModalFooter", props: {} }));
} catch {}
try {
  ((i.displayName = "ModalHeader"),
    (i.__docgenInfo = { description: "", displayName: "ModalHeader", props: {} }));
} catch {}
try {
  ((s.displayName = "ModalOverlay"),
    (s.__docgenInfo = {
      description: "",
      displayName: "ModalOverlay",
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
  ((l.displayName = "ModalPortal"),
    (l.__docgenInfo = { description: "", displayName: "ModalPortal", props: {} }));
} catch {}
try {
  ((p.displayName = "ModalTitle"),
    (p.__docgenInfo = {
      description: "",
      displayName: "ModalTitle",
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
  ((f.displayName = "ModalTrigger"),
    (f.__docgenInfo = {
      description: "",
      displayName: "ModalTrigger",
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
export { _ as M, f as a, n as b, i as c, p as d, m as e, c as f };
