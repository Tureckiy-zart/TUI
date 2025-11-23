"use client";
import { j as a } from "./jsx-runtime-0-JxQnzY.js";
import { r as s } from "./index--tQcscZa.js";
import {
  R as S,
  P as W,
  C as w,
  a as T,
  b as k,
  D as q,
  O as R,
  T as P,
} from "./index-m_zWotLa.js";
import { c as l } from "./utils-CyawMXzk.js";
import "./index-jG1cqCvV.js";
import "./index-pvjnvxJ7.js";
import "./index-CJkT59yQ.js";
import "./index-D8ovs0-6.js";
import "./Combination-DplBdLRn.js";
import "./index-yb7JCnm7.js";
function E(e, o) {
  if (e == null) return {};
  var t = {},
    r = Object.keys(e),
    i,
    n;
  for (n = 0; n < r.length; n++) ((i = r[n]), !(o.indexOf(i) >= 0) && (t[i] = e[i]));
  return t;
}
var z = ["color"],
  F = s.forwardRef(function (e, o) {
    var t = e.color,
      r = t === void 0 ? "currentColor" : t,
      i = E(e, z);
    return s.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        i,
        { ref: o },
      ),
      s.createElement("path", {
        d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
        fill: r,
        fillRule: "evenodd",
        clipRule: "evenodd",
      }),
    );
  });
const _ = S,
  C = P,
  h = W,
  D = T,
  m = s.forwardRef(({ className: e, ...o }, t) =>
    a.jsx(R, {
      ref: t,
      className: l(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        e,
      ),
      ...o,
    }),
  );
m.displayName = R.displayName;
const u = s.forwardRef(({ className: e, children: o, ...t }, r) =>
  a.jsxs(h, {
    children: [
      a.jsx(m, {}),
      a.jsxs(w, {
        ref: r,
        className: l(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg duration-200 sm:rounded-lg",
          e,
        ),
        ...t,
        children: [
          o,
          a.jsxs(T, {
            className:
              "absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            "aria-label": "Close dialog",
            children: [
              a.jsx(F, { className: "h-4 w-4", "aria-hidden": "true" }),
              a.jsx("span", { className: "sr-only", children: "Close" }),
            ],
          }),
        ],
      }),
    ],
  }),
);
u.displayName = w.displayName;
const g = ({ className: e, ...o }) =>
  a.jsx("div", { className: l("flex flex-col space-y-xs text-center sm:text-left", e), ...o });
g.displayName = "DialogHeader";
const x = ({ className: e, ...o }) =>
  a.jsx("div", {
    className: l("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...o,
  });
x.displayName = "DialogFooter";
const f = s.forwardRef(({ className: e, ...o }, t) =>
  a.jsx(k, { ref: t, className: l("text-lg font-semibold leading-none tracking-tight", e), ...o }),
);
f.displayName = k.displayName;
const y = s.forwardRef(({ className: e, ...o }, t) =>
  a.jsx(q, { ref: t, className: l("text-sm text-muted-foreground", e), ...o }),
);
y.displayName = q.displayName;
try {
  ((_.displayName = "Dialog"),
    (_.__docgenInfo = { description: "", displayName: "Dialog", props: {} }));
} catch {}
try {
  ((D.displayName = "DialogClose"),
    (D.__docgenInfo = {
      description: "",
      displayName: "DialogClose",
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
  ((u.displayName = "DialogContent"),
    (u.__docgenInfo = {
      description: "",
      displayName: "DialogContent",
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
  ((y.displayName = "DialogDescription"),
    (y.__docgenInfo = {
      description: "",
      displayName: "DialogDescription",
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
  ((x.displayName = "DialogFooter"),
    (x.__docgenInfo = { description: "", displayName: "DialogFooter", props: {} }));
} catch {}
try {
  ((g.displayName = "DialogHeader"),
    (g.__docgenInfo = { description: "", displayName: "DialogHeader", props: {} }));
} catch {}
try {
  ((m.displayName = "DialogOverlay"),
    (m.__docgenInfo = {
      description: "",
      displayName: "DialogOverlay",
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
  ((h.displayName = "DialogPortal"),
    (h.__docgenInfo = { description: "", displayName: "DialogPortal", props: {} }));
} catch {}
try {
  ((f.displayName = "DialogTitle"),
    (f.__docgenInfo = {
      description: "",
      displayName: "DialogTitle",
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
  ((C.displayName = "DialogTrigger"),
    (C.__docgenInfo = {
      description: "",
      displayName: "DialogTrigger",
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
const d = ({ isOpen: e, onClose: o, title: t, description: r, children: i, className: n, ...V }) =>
  a.jsx(_, {
    open: e,
    onOpenChange: (L) => !L && o(),
    children: a.jsxs(u, {
      className: l("max-w-md", n),
      ...V,
      children: [
        (t || r) &&
          a.jsxs(g, { children: [t && a.jsx(f, { children: t }), r && a.jsx(y, { children: r })] }),
        i,
      ],
    }),
  });
try {
  ((d.displayName = "CustomDialog"),
    (d.__docgenInfo = {
      description: "",
      displayName: "CustomDialog",
      props: {
        isOpen: {
          defaultValue: null,
          description: "",
          name: "isOpen",
          required: !0,
          type: { name: "boolean" },
        },
        onClose: {
          defaultValue: null,
          description: "",
          name: "onClose",
          required: !0,
          type: { name: "() => void" },
        },
        title: {
          defaultValue: null,
          description: "",
          name: "title",
          required: !1,
          type: { name: "string | undefined" },
        },
        description: {
          defaultValue: null,
          description: "",
          name: "description",
          required: !1,
          type: { name: "string | undefined" },
        },
      },
    }));
} catch {}
const X = {
    title: "Components/CustomDialog",
    component: d,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    argTypes: { isOpen: { control: { type: "boolean" } } },
  },
  H = () => {
    const [e, o] = s.useState(!1);
    return a.jsxs("div", {
      children: [
        a.jsx("button", {
          onClick: () => o(!0),
          className:
            "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
          children: "Open Dialog",
        }),
        a.jsxs(d, {
          isOpen: e,
          onClose: () => o(!1),
          title: "Demo Dialog",
          children: [
            a.jsx("p", { children: "This is a demo dialog content." }),
            a.jsx("div", {
              className: "mt-md flex justify-end",
              children: a.jsx("button", {
                onClick: () => o(!1),
                className:
                  "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
                children: "Close",
              }),
            }),
          ],
        }),
      ],
    });
  },
  p = { render: () => a.jsx(H, {}) },
  c = {
    render: () => {
      const [e, o] = s.useState(!1);
      return a.jsxs("div", {
        children: [
          a.jsx("button", {
            onClick: () => o(!0),
            className:
              "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
            children: "Open Dialog Without Title",
          }),
          a.jsxs(d, {
            isOpen: e,
            onClose: () => o(!1),
            children: [
              a.jsx("p", { children: "This dialog doesn't have a title." }),
              a.jsx("div", {
                className: "mt-md flex justify-end",
                children: a.jsx("button", {
                  onClick: () => o(!1),
                  className:
                    "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
                  children: "Close",
                }),
              }),
            ],
          }),
        ],
      });
    },
  };
var N, b, j;
p.parameters = {
  ...p.parameters,
  docs: {
    ...((N = p.parameters) == null ? void 0 : N.docs),
    source: {
      originalSource: `{
  render: () => <DialogWithState />
}`,
      ...((j = (b = p.parameters) == null ? void 0 : b.docs) == null ? void 0 : j.source),
    },
  },
};
var v, O, I;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((v = c.parameters) == null ? void 0 : v.docs),
    source: {
      originalSource: `{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <div>
        <button onClick={() => setIsOpen(true)} className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90">
          Open Dialog Without Title
        </button>
        <CustomDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This dialog doesn't have a title.</p>
          <div className="mt-md flex justify-end">
            <button onClick={() => setIsOpen(false)} className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90">
              Close
            </button>
          </div>
        </CustomDialog>
      </div>;
  }
}`,
      ...((I = (O = c.parameters) == null ? void 0 : O.docs) == null ? void 0 : I.source),
    },
  },
};
const Y = ["Default", "WithoutTitle"];
export { p as Default, c as WithoutTitle, Y as __namedExportsOrder, X as default };
