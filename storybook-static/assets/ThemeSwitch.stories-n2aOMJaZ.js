"use client";
import { j as i } from "./jsx-runtime-0-JxQnzY.js";
import { R as y } from "./index--tQcscZa.js";
import { B as U } from "./Button-DSOQhk0m.js";
import { c as F } from "./utils-CyawMXzk.js";
import { d as P } from "./applyMode-COjYIPpz.js";
import { c as R } from "./createLucideIcon-CD2Sj3SA.js";
import "./index-DDxmA3Og.js";
import "./index-CJkT59yQ.js";
import "./index-Dp35_cgR.js";
import "./iframe-BlBaxeUy.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const H = [["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]],
  Z = R("Moon", H);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const J = [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
    ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
    ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
  ],
  Q = R("Sun", J),
  L = "tm_mode",
  G = "tm_mode",
  Y = "theme",
  q = "data-mode",
  B = "data-theme",
  W = "dark";
function K(e) {
  var n, o;
  if (
    ((o = (n = globalThis.process) == null ? void 0 : n.env) == null ? void 0 : o.NODE_ENV) ===
      "production" ||
    typeof document > "u"
  )
    return;
  const a = document.documentElement,
    r = {
      "data-mode": a.getAttribute(q),
      "data-theme": a.getAttribute(B),
      darkClass: a.classList.contains(W),
      "--background": getComputedStyle(a).getPropertyValue("--background"),
      "--tm-primary": getComputedStyle(a).getPropertyValue("--tm-primary"),
    };
  console.log("[theme-switch]", e, r);
}
function X(e) {
  var r;
  if (typeof document > "u") return;
  const a = `; ${document.cookie}`.split(`; ${e}=`);
  if (a.length === 2) return (r = a.pop()) == null ? void 0 : r.split(";")[0];
}
function v() {
  var r, n;
  if (typeof document > "u") return "day";
  const e = document.documentElement.getAttribute(q);
  if (e === "day" || e === "night") return e;
  const t = document.documentElement.getAttribute(B);
  if (t === "day" || t === "night") return t;
  try {
    const o = window.localStorage.getItem(G);
    if (o === "day" || o === "night") return o;
    const s = window.localStorage.getItem(Y);
    if (s === "dark") return "night";
    if (s === "light") return "day";
  } catch {}
  const a = X(L);
  return a === "day" || a === "night"
    ? a
    : typeof window < "u" &&
        ((n =
          (r = window.matchMedia) == null
            ? void 0
            : r.call(window, "(prefers-color-scheme: dark)")) == null
          ? void 0
          : n.matches)
      ? "night"
      : "day";
}
function S(e) {
  P(e);
  try {
    (window.localStorage.setItem(G, e),
      window.localStorage.setItem(Y, e === "night" ? "dark" : "light"));
  } catch {}
  const t = new Date();
  (t.setFullYear(t.getFullYear() + 1),
    (document.cookie = `${L}=${e};expires=${t.toUTCString()};path=/;SameSite=Lax`),
    K(`persist:${e}`));
}
const c = ({ className: e, size: t = "md", variant: a = "primary" }) => {
  const [r, n] = y.useState(() => v());
  y.useEffect(() => {
    const d = v();
    (n(d), S(d), K(`initial:${d}`));
  }, []);
  const o = () => {
    n((d) => {
      const f = d === "night" ? "day" : "night";
      return (S(f), f);
    });
  };
  let s = "md";
  return (
    t === "xs"
      ? (s = "xs")
      : t === "sm"
        ? (s = "sm")
        : t === "lg"
          ? (s = "lg")
          : t === "xl" && (s = "xl"),
    i.jsx(U, {
      onClick: o,
      variant: a,
      size: s,
      className: F(e),
      "aria-label": `Switch to ${r === "night" ? "day" : "night"} theme`,
      type: "button",
      children:
        r === "night" ? i.jsx(Q, { className: "h-4 w-4" }) : i.jsx(Z, { className: "h-4 w-4" }),
    })
  );
};
try {
  ((c.displayName = "ThemeSwitch"),
    (c.__docgenInfo = {
      description: "",
      displayName: "ThemeSwitch",
      props: {
        className: {
          defaultValue: null,
          description: "",
          name: "className",
          required: !1,
          type: { name: "string | undefined" },
        },
        size: {
          defaultValue: { value: "md" },
          description: "",
          name: "size",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"xs"' },
              { value: '"sm"' },
              { value: '"md"' },
              { value: '"lg"' },
              { value: '"xl"' },
            ],
          },
        },
        variant: {
          defaultValue: { value: "primary" },
          description: "",
          name: "variant",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"primary"' },
              { value: '"secondary"' },
              { value: '"accent"' },
              { value: '"outline"' },
              { value: '"ghost"' },
              { value: '"link"' },
              { value: '"destructive"' },
            ],
          },
        },
      },
    }));
} catch {}
const me = {
    title: "Components/ThemeSwitch",
    component: c,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    argTypes: {
      size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
      variant: { control: { type: "select" }, options: ["default", "outline", "ghost"] },
    },
  },
  m = { args: {} },
  l = { args: { size: "sm" } },
  u = { args: { size: "lg" } },
  p = { args: { variant: "outline" } },
  g = { args: { variant: "ghost" } },
  h = {
    render: () =>
      i.jsxs("div", {
        className: "flex items-center gap-md",
        children: [
          i.jsx(c, { variant: "primary" }),
          i.jsx(c, { variant: "outline" }),
          i.jsx(c, { variant: "ghost" }),
        ],
      }),
  };
var k, _, w;
m.parameters = {
  ...m.parameters,
  docs: {
    ...((k = m.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {}
}`,
      ...((w = (_ = m.parameters) == null ? void 0 : _.docs) == null ? void 0 : w.source),
    },
  },
};
var E, x, T;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((E = l.parameters) == null ? void 0 : E.docs),
    source: {
      originalSource: `{
  args: {
    size: "sm"
  }
}`,
      ...((T = (x = l.parameters) == null ? void 0 : x.docs) == null ? void 0 : T.source),
    },
  },
};
var M, A, N;
u.parameters = {
  ...u.parameters,
  docs: {
    ...((M = u.parameters) == null ? void 0 : M.docs),
    source: {
      originalSource: `{
  args: {
    size: "lg"
  }
}`,
      ...((N = (A = u.parameters) == null ? void 0 : A.docs) == null ? void 0 : N.source),
    },
  },
};
var b, D, O;
p.parameters = {
  ...p.parameters,
  docs: {
    ...((b = p.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: `{
  args: {
    variant: "outline"
  }
}`,
      ...((O = (D = p.parameters) == null ? void 0 : D.docs) == null ? void 0 : O.source),
    },
  },
};
var j, C, I;
g.parameters = {
  ...g.parameters,
  docs: {
    ...((j = g.parameters) == null ? void 0 : j.docs),
    source: {
      originalSource: `{
  args: {
    variant: "ghost"
  }
}`,
      ...((I = (C = g.parameters) == null ? void 0 : C.docs) == null ? void 0 : I.source),
    },
  },
};
var V, $, z;
h.parameters = {
  ...h.parameters,
  docs: {
    ...((V = h.parameters) == null ? void 0 : V.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex items-center gap-md">
      <ThemeSwitch variant="primary" />
      <ThemeSwitch variant="outline" />
      <ThemeSwitch variant="ghost" />
    </div>
}`,
      ...((z = ($ = h.parameters) == null ? void 0 : $.docs) == null ? void 0 : z.source),
    },
  },
};
const le = ["Default", "Small", "Large", "Outline", "Ghost", "AllVariants"];
export {
  h as AllVariants,
  m as Default,
  g as Ghost,
  u as Large,
  p as Outline,
  l as Small,
  le as __namedExportsOrder,
  me as default,
};
