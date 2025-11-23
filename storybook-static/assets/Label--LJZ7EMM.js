"use client";
import { r as i } from "./index--tQcscZa.js";
import { j as s } from "./jsx-runtime-0-JxQnzY.js";
import { c as d } from "./utils-CyawMXzk.js";
import "./index-pvjnvxJ7.js";
import { c as b } from "./index-DDxmA3Og.js";
import { c as y } from "./index-Dp35_cgR.js";
const l = i.forwardRef(({ className: e, type: a, ...r }, t) =>
  s.jsx("input", {
    type: a,
    className: d(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-sm py-xs text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      e,
    ),
    ref: t,
    ...r,
  }),
);
l.displayName = "Input";
try {
  ((l.displayName = "Input"),
    (l.__docgenInfo = { description: "", displayName: "Input", props: {} }));
} catch {}
try {
  ((Input.displayName = "Input"),
    (Input.__docgenInfo = { description: "", displayName: "Input", props: {} }));
} catch {}
var g = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  x = g.reduce((e, a) => {
    const r = b(`Primitive.${a}`),
      t = i.forwardRef((o, u) => {
        const { asChild: m, ...f } = o,
          _ = m ? r : a;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          s.jsx(_, { ...f, ref: u })
        );
      });
    return ((t.displayName = `Primitive.${a}`), { ...e, [a]: t });
  }, {}),
  N = "Label",
  p = i.forwardRef((e, a) =>
    s.jsx(x.label, {
      ...e,
      ref: a,
      onMouseDown: (r) => {
        var o;
        r.target.closest("button, input, select, textarea") ||
          ((o = e.onMouseDown) == null || o.call(e, r),
          !r.defaultPrevented && r.detail > 1 && r.preventDefault());
      },
    }),
  );
p.displayName = N;
var c = p;
const h = y(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ),
  n = i.forwardRef(({ className: e, ...a }, r) => s.jsx(c, { ref: r, className: d(h(), e), ...a }));
n.displayName = c.displayName;
try {
  ((n.displayName = "Label"),
    (n.__docgenInfo = {
      description: "",
      displayName: "Label",
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
  ((Label.displayName = "Label"),
    (Label.__docgenInfo = {
      description: "",
      displayName: "Label",
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
export { l as I, n as L };
