"use client";
import { j as r } from "./jsx-runtime-0-JxQnzY.js";
import { B as a } from "./Badge-CmkUbG2V.js";
import "./index-Dp35_cgR.js";
import "./utils-CyawMXzk.js";
import "./index--tQcscZa.js";
const F = {
    title: "Primitives/Badge",
    component: a,
    parameters: {
      layout: "centered",
      docs: {
        description: {
          component:
            "Badge component for displaying labels, tags, or status indicators. Supports 7 canonical variants.",
        },
      },
    },
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
        description: "Badge variant style",
        table: { type: { summary: "string" }, defaultValue: { summary: "primary" } },
      },
    },
  },
  e = { args: { variant: "primary", children: "Primary Badge" } },
  n = { args: { variant: "secondary", children: "Secondary Badge" } },
  s = { args: { variant: "accent", children: "Accent Badge" } },
  t = { args: { variant: "outline", children: "Outline Badge" } },
  i = { args: { variant: "ghost", children: "Ghost Badge" } },
  c = { args: { variant: "link", children: "Link Badge" } },
  o = { args: { variant: "destructive", children: "Destructive Badge" } },
  d = {
    render: () =>
      r.jsxs("div", {
        style: { display: "flex", gap: "1rem", flexWrap: "wrap" },
        children: [
          r.jsx(a, { variant: "primary", children: "Primary" }),
          r.jsx(a, { variant: "secondary", children: "Secondary" }),
          r.jsx(a, { variant: "accent", children: "Accent" }),
          r.jsx(a, { variant: "outline", children: "Outline" }),
          r.jsx(a, { variant: "ghost", children: "Ghost" }),
          r.jsx(a, { variant: "link", children: "Link" }),
          r.jsx(a, { variant: "destructive", children: "Destructive" }),
        ],
      }),
  },
  l = {
    render: () =>
      r.jsxs("div", {
        style: { display: "flex", gap: "1rem", flexWrap: "wrap" },
        children: [
          r.jsx(a, { variant: "primary", children: "🚀 New" }),
          r.jsx(a, { variant: "accent", children: "✅ Success" }),
          r.jsx(a, { variant: "destructive", children: "⚠️ Error" }),
          r.jsx(a, { variant: "secondary", children: "ℹ️ Info" }),
        ],
      }),
  };
var p, g, m;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((p = e.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `{
  args: {
    variant: "primary",
    children: "Primary Badge"
  }
}`,
      ...((m = (g = e.parameters) == null ? void 0 : g.docs) == null ? void 0 : m.source),
    },
  },
};
var u, v, y;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((u = n.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  args: {
    variant: "secondary",
    children: "Secondary Badge"
  }
}`,
      ...((y = (v = n.parameters) == null ? void 0 : v.docs) == null ? void 0 : y.source),
    },
  },
};
var B, h, x;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((B = s.parameters) == null ? void 0 : B.docs),
    source: {
      originalSource: `{
  args: {
    variant: "accent",
    children: "Accent Badge"
  }
}`,
      ...((x = (h = s.parameters) == null ? void 0 : h.docs) == null ? void 0 : x.source),
    },
  },
};
var S, f, j;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((S = t.parameters) == null ? void 0 : S.docs),
    source: {
      originalSource: `{
  args: {
    variant: "outline",
    children: "Outline Badge"
  }
}`,
      ...((j = (f = t.parameters) == null ? void 0 : f.docs) == null ? void 0 : j.source),
    },
  },
};
var k, A, O;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((k = i.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {
    variant: "ghost",
    children: "Ghost Badge"
  }
}`,
      ...((O = (A = i.parameters) == null ? void 0 : A.docs) == null ? void 0 : O.source),
    },
  },
};
var P, w, D;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((P = c.parameters) == null ? void 0 : P.docs),
    source: {
      originalSource: `{
  args: {
    variant: "link",
    children: "Link Badge"
  }
}`,
      ...((D = (w = c.parameters) == null ? void 0 : w.docs) == null ? void 0 : D.source),
    },
  },
};
var G, L, W;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((G = o.parameters) == null ? void 0 : G.docs),
    source: {
      originalSource: `{
  args: {
    variant: "destructive",
    children: "Destructive Badge"
  }
}`,
      ...((W = (L = o.parameters) == null ? void 0 : L.docs) == null ? void 0 : W.source),
    },
  },
};
var E, I, V;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((E = d.parameters) == null ? void 0 : E.docs),
    source: {
      originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap"
  }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
}`,
      ...((V = (I = d.parameters) == null ? void 0 : I.docs) == null ? void 0 : V.source),
    },
  },
};
var b, N, _;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((b = l.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap"
  }}>
      <Badge variant="primary">🚀 New</Badge>
      <Badge variant="accent">✅ Success</Badge>
      <Badge variant="destructive">⚠️ Error</Badge>
      <Badge variant="secondary">ℹ️ Info</Badge>
    </div>
}`,
      ...((_ = (N = l.parameters) == null ? void 0 : N.docs) == null ? void 0 : _.source),
    },
  },
};
const H = [
  "Primary",
  "Secondary",
  "Accent",
  "Outline",
  "Ghost",
  "Link",
  "Destructive",
  "AllVariants",
  "WithIcons",
];
export {
  s as Accent,
  d as AllVariants,
  o as Destructive,
  i as Ghost,
  c as Link,
  t as Outline,
  e as Primary,
  n as Secondary,
  l as WithIcons,
  H as __namedExportsOrder,
  F as default,
};
