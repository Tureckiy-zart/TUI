"use client";
import { j as a } from "./jsx-runtime-0-JxQnzY.js";
import { R as q } from "./index--tQcscZa.js";
import { c as u } from "./utils-CyawMXzk.js";
import { c as M } from "./createLucideIcon-CD2Sj3SA.js";
import { C as R } from "./chevron-right-FuoWzis5.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const D = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  E = M("ChevronLeft", D),
  m = ({ currentPage: e, totalPages: n, onPageChange: i, className: S }) => {
    const V = () => {
      const s = [],
        r = [];
      for (let p = Math.max(2, e - 2); p <= Math.min(n - 1, e + 2); p++) s.push(p);
      return (
        e - 2 > 2 ? r.push(1, "...") : r.push(1),
        r.push(...s),
        e + 2 < n - 1 ? r.push("...", n) : r.push(n),
        r
      );
    };
    return a.jsxs("nav", {
      className: u("flex items-center space-x-xs", S),
      children: [
        a.jsx("button", {
          onClick: () => i(e - 1),
          disabled: e === 1,
          className:
            "rounded-md border border-input bg-background p-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
          children: a.jsx(E, { className: "h-4 w-4" }),
        }),
        V().map((o, s) =>
          a.jsx(
            q.Fragment,
            {
              children:
                o === "..."
                  ? a.jsx("span", {
                      className: "px-sm py-sm text-muted-foreground",
                      children: "...",
                    })
                  : a.jsx("button", {
                      onClick: () => i(o),
                      className: u(
                        "rounded-md border px-sm py-sm transition-colors",
                        o === e
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:bg-accent",
                      ),
                      children: o,
                    }),
            },
            s,
          ),
        ),
        a.jsx("button", {
          onClick: () => i(e + 1),
          disabled: e === n,
          className:
            "rounded-md border border-input bg-background p-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
          children: a.jsx(R, { className: "h-4 w-4" }),
        }),
      ],
    });
  };
try {
  ((m.displayName = "Pagination"),
    (m.__docgenInfo = {
      description: "",
      displayName: "Pagination",
      props: {
        currentPage: {
          defaultValue: null,
          description: "",
          name: "currentPage",
          required: !0,
          type: { name: "number" },
        },
        totalPages: {
          defaultValue: null,
          description: "",
          name: "totalPages",
          required: !0,
          type: { name: "number" },
        },
        onPageChange: {
          defaultValue: null,
          description: "",
          name: "onPageChange",
          required: !0,
          type: { name: "(page: number) => void" },
        },
        className: {
          defaultValue: null,
          description: "",
          name: "className",
          required: !1,
          type: { name: "string | undefined" },
        },
      },
    }));
} catch {}
const B = {
    title: "Components/Pagination",
    component: m,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
  },
  t = {
    args: { currentPage: 2, totalPages: 10, onPageChange: (e) => console.log("Page changed:", e) },
  },
  c = {
    args: { currentPage: 1, totalPages: 10, onPageChange: (e) => console.log("Page changed:", e) },
  },
  g = {
    args: { currentPage: 10, totalPages: 10, onPageChange: (e) => console.log("Page changed:", e) },
  },
  d = {
    args: { currentPage: 2, totalPages: 3, onPageChange: (e) => console.log("Page changed:", e) },
  },
  l = {
    args: {
      currentPage: 50,
      totalPages: 100,
      onPageChange: (e) => console.log("Page changed:", e),
    },
  };
var h, P, b;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((h = t.parameters) == null ? void 0 : h.docs),
    source: {
      originalSource: `{
  args: {
    currentPage: 2,
    totalPages: 10,
    onPageChange: page => console.log("Page changed:", page)
  }
}`,
      ...((b = (P = t.parameters) == null ? void 0 : P.docs) == null ? void 0 : b.source),
    },
  },
};
var f, x, y;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((f = c.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: page => console.log("Page changed:", page)
  }
}`,
      ...((y = (x = c.parameters) == null ? void 0 : x.docs) == null ? void 0 : y.source),
    },
  },
};
var C, N, _;
g.parameters = {
  ...g.parameters,
  docs: {
    ...((C = g.parameters) == null ? void 0 : C.docs),
    source: {
      originalSource: `{
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: page => console.log("Page changed:", page)
  }
}`,
      ...((_ = (N = g.parameters) == null ? void 0 : N.docs) == null ? void 0 : _.source),
    },
  },
};
var j, v, k;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((j = d.parameters) == null ? void 0 : j.docs),
    source: {
      originalSource: `{
  args: {
    currentPage: 2,
    totalPages: 3,
    onPageChange: page => console.log("Page changed:", page)
  }
}`,
      ...((k = (v = d.parameters) == null ? void 0 : v.docs) == null ? void 0 : k.source),
    },
  },
};
var w, F, L;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((w = l.parameters) == null ? void 0 : w.docs),
    source: {
      originalSource: `{
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: page => console.log("Page changed:", page)
  }
}`,
      ...((L = (F = l.parameters) == null ? void 0 : F.docs) == null ? void 0 : L.source),
    },
  },
};
const G = ["Default", "FirstPage", "LastPage", "FewPages", "ManyPages"];
export {
  t as Default,
  d as FewPages,
  c as FirstPage,
  g as LastPage,
  l as ManyPages,
  G as __namedExportsOrder,
  B as default,
};
