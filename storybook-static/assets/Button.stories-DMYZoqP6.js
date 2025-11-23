"use client";
import { j as r } from "./jsx-runtime-0-JxQnzY.js";
import { B as e } from "./Button-DSOQhk0m.js";
import "./index-DDxmA3Og.js";
import "./index--tQcscZa.js";
import "./index-CJkT59yQ.js";
import "./index-Dp35_cgR.js";
import "./utils-CyawMXzk.js";
const wr = {
    title: "Primitives/Button",
    component: e,
    parameters: {
      layout: "centered",
      docs: {
        description: {
          component:
            "Button component for user interactions. Supports 7 variants and 5 sizes with icon slot support.",
        },
      },
    },
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
        description: "Button variant style",
        table: { type: { summary: "string" }, defaultValue: { summary: "primary" } },
      },
      size: {
        control: { type: "select" },
        options: ["xs", "sm", "md", "lg", "xl", "icon"],
        description: "Button size",
        table: { type: { summary: "string" }, defaultValue: { summary: "md" } },
      },
      disabled: { control: { type: "boolean" }, description: "Disable button interaction" },
      leftIcon: { control: !1, description: "Icon displayed before the button content" },
      rightIcon: { control: !1, description: "Icon displayed after the button content" },
    },
  },
  n = { args: { variant: "primary", children: "Primary Button" } },
  a = { args: { variant: "secondary", children: "Secondary Button" } },
  t = { args: { variant: "accent", children: "Accent Button" } },
  s = { args: { variant: "outline", children: "Outline Button" } },
  o = { args: { variant: "ghost", children: "Ghost Button" } },
  i = { args: { variant: "link", children: "Link Button" } },
  c = { args: { variant: "destructive", children: "Delete" } },
  d = {
    render: () =>
      r.jsxs("div", {
        style: { display: "flex", gap: "1rem", flexWrap: "wrap" },
        children: [
          r.jsx(e, { variant: "primary", children: "Primary" }),
          r.jsx(e, { variant: "secondary", children: "Secondary" }),
          r.jsx(e, { variant: "accent", children: "Accent" }),
          r.jsx(e, { variant: "outline", children: "Outline" }),
          r.jsx(e, { variant: "ghost", children: "Ghost" }),
          r.jsx(e, { variant: "link", children: "Link" }),
          r.jsx(e, { variant: "destructive", children: "Destructive" }),
        ],
      }),
  },
  l = { args: { size: "xs", children: "Extra Small" } },
  u = { args: { size: "sm", children: "Small" } },
  m = { args: { size: "md", children: "Medium" } },
  p = { args: { size: "lg", children: "Large" } },
  g = { args: { size: "xl", children: "Extra Large" } },
  h = { args: { size: "icon", children: "🚀" } },
  v = {
    render: () =>
      r.jsxs("div", {
        style: { display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" },
        children: [
          r.jsx(e, { size: "xs", children: "Extra Small" }),
          r.jsx(e, { size: "sm", children: "Small" }),
          r.jsx(e, { size: "md", children: "Medium" }),
          r.jsx(e, { size: "lg", children: "Large" }),
          r.jsx(e, { size: "xl", children: "Extra Large" }),
          r.jsx(e, { size: "icon", children: "🚀" }),
        ],
      }),
  },
  x = { args: { leftIcon: "🚀", children: "Launch" } },
  B = { args: { rightIcon: "→", children: "Continue" } },
  y = { args: { leftIcon: "📧", rightIcon: "→", children: "Send Email" } },
  S = { args: { disabled: !0, children: "Disabled" } },
  b = {
    render: () =>
      r.jsxs("div", {
        style: { display: "flex", gap: "1rem", flexWrap: "wrap" },
        children: [
          r.jsx(e, { variant: "primary", disabled: !0, children: "Primary" }),
          r.jsx(e, { variant: "secondary", disabled: !0, children: "Secondary" }),
          r.jsx(e, { variant: "accent", disabled: !0, children: "Accent" }),
          r.jsx(e, { variant: "outline", disabled: !0, children: "Outline" }),
          r.jsx(e, { variant: "ghost", disabled: !0, children: "Ghost" }),
          r.jsx(e, { variant: "link", disabled: !0, children: "Link" }),
          r.jsx(e, { variant: "destructive", disabled: !0, children: "Destructive" }),
        ],
      }),
  };
var z, f, j;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((z = n.parameters) == null ? void 0 : z.docs),
    source: {
      originalSource: `{
  args: {
    variant: "primary",
    children: "Primary Button"
  }
}`,
      ...((j = (f = n.parameters) == null ? void 0 : f.docs) == null ? void 0 : j.source),
    },
  },
};
var L, I, E;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((L = a.parameters) == null ? void 0 : L.docs),
    source: {
      originalSource: `{
  args: {
    variant: "secondary",
    children: "Secondary Button"
  }
}`,
      ...((E = (I = a.parameters) == null ? void 0 : I.docs) == null ? void 0 : E.source),
    },
  },
};
var k, D, A;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((k = t.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {
    variant: "accent",
    children: "Accent Button"
  }
}`,
      ...((A = (D = t.parameters) == null ? void 0 : D.docs) == null ? void 0 : A.source),
    },
  },
};
var W, O, P;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((W = s.parameters) == null ? void 0 : W.docs),
    source: {
      originalSource: `{
  args: {
    variant: "outline",
    children: "Outline Button"
  }
}`,
      ...((P = (O = s.parameters) == null ? void 0 : O.docs) == null ? void 0 : P.source),
    },
  },
};
var G, w, M;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((G = o.parameters) == null ? void 0 : G.docs),
    source: {
      originalSource: `{
  args: {
    variant: "ghost",
    children: "Ghost Button"
  }
}`,
      ...((M = (w = o.parameters) == null ? void 0 : w.docs) == null ? void 0 : M.source),
    },
  },
};
var V, R, C;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((V = i.parameters) == null ? void 0 : V.docs),
    source: {
      originalSource: `{
  args: {
    variant: "link",
    children: "Link Button"
  }
}`,
      ...((C = (R = i.parameters) == null ? void 0 : R.docs) == null ? void 0 : C.source),
    },
  },
};
var _, T, q;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((_ = c.parameters) == null ? void 0 : _.docs),
    source: {
      originalSource: `{
  args: {
    variant: "destructive",
    children: "Delete"
  }
}`,
      ...((q = (T = c.parameters) == null ? void 0 : T.docs) == null ? void 0 : q.source),
    },
  },
};
var F, H, J;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((F = d.parameters) == null ? void 0 : F.docs),
    source: {
      originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap"
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
}`,
      ...((J = (H = d.parameters) == null ? void 0 : H.docs) == null ? void 0 : J.source),
    },
  },
};
var K, N, Q;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((K = l.parameters) == null ? void 0 : K.docs),
    source: {
      originalSource: `{
  args: {
    size: "xs",
    children: "Extra Small"
  }
}`,
      ...((Q = (N = l.parameters) == null ? void 0 : N.docs) == null ? void 0 : Q.source),
    },
  },
};
var U, X, Y;
u.parameters = {
  ...u.parameters,
  docs: {
    ...((U = u.parameters) == null ? void 0 : U.docs),
    source: {
      originalSource: `{
  args: {
    size: "sm",
    children: "Small"
  }
}`,
      ...((Y = (X = u.parameters) == null ? void 0 : X.docs) == null ? void 0 : Y.source),
    },
  },
};
var Z, $, rr;
m.parameters = {
  ...m.parameters,
  docs: {
    ...((Z = m.parameters) == null ? void 0 : Z.docs),
    source: {
      originalSource: `{
  args: {
    size: "md",
    children: "Medium"
  }
}`,
      ...((rr = ($ = m.parameters) == null ? void 0 : $.docs) == null ? void 0 : rr.source),
    },
  },
};
var er, nr, ar;
p.parameters = {
  ...p.parameters,
  docs: {
    ...((er = p.parameters) == null ? void 0 : er.docs),
    source: {
      originalSource: `{
  args: {
    size: "lg",
    children: "Large"
  }
}`,
      ...((ar = (nr = p.parameters) == null ? void 0 : nr.docs) == null ? void 0 : ar.source),
    },
  },
};
var tr, sr, or;
g.parameters = {
  ...g.parameters,
  docs: {
    ...((tr = g.parameters) == null ? void 0 : tr.docs),
    source: {
      originalSource: `{
  args: {
    size: "xl",
    children: "Extra Large"
  }
}`,
      ...((or = (sr = g.parameters) == null ? void 0 : sr.docs) == null ? void 0 : or.source),
    },
  },
};
var ir, cr, dr;
h.parameters = {
  ...h.parameters,
  docs: {
    ...((ir = h.parameters) == null ? void 0 : ir.docs),
    source: {
      originalSource: `{
  args: {
    size: "icon",
    children: "🚀"
  }
}`,
      ...((dr = (cr = h.parameters) == null ? void 0 : cr.docs) == null ? void 0 : dr.source),
    },
  },
};
var lr, ur, mr;
v.parameters = {
  ...v.parameters,
  docs: {
    ...((lr = v.parameters) == null ? void 0 : lr.docs),
    source: {
      originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap"
  }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">🚀</Button>
    </div>
}`,
      ...((mr = (ur = v.parameters) == null ? void 0 : ur.docs) == null ? void 0 : mr.source),
    },
  },
};
var pr, gr, hr;
x.parameters = {
  ...x.parameters,
  docs: {
    ...((pr = x.parameters) == null ? void 0 : pr.docs),
    source: {
      originalSource: `{
  args: {
    leftIcon: "🚀",
    children: "Launch"
  }
}`,
      ...((hr = (gr = x.parameters) == null ? void 0 : gr.docs) == null ? void 0 : hr.source),
    },
  },
};
var vr, xr, Br;
B.parameters = {
  ...B.parameters,
  docs: {
    ...((vr = B.parameters) == null ? void 0 : vr.docs),
    source: {
      originalSource: `{
  args: {
    rightIcon: "→",
    children: "Continue"
  }
}`,
      ...((Br = (xr = B.parameters) == null ? void 0 : xr.docs) == null ? void 0 : Br.source),
    },
  },
};
var yr, Sr, br;
y.parameters = {
  ...y.parameters,
  docs: {
    ...((yr = y.parameters) == null ? void 0 : yr.docs),
    source: {
      originalSource: `{
  args: {
    leftIcon: "📧",
    rightIcon: "→",
    children: "Send Email"
  }
}`,
      ...((br = (Sr = y.parameters) == null ? void 0 : Sr.docs) == null ? void 0 : br.source),
    },
  },
};
var zr, fr, jr;
S.parameters = {
  ...S.parameters,
  docs: {
    ...((zr = S.parameters) == null ? void 0 : zr.docs),
    source: {
      originalSource: `{
  args: {
    disabled: true,
    children: "Disabled"
  }
}`,
      ...((jr = (fr = S.parameters) == null ? void 0 : fr.docs) == null ? void 0 : jr.source),
    },
  },
};
var Lr, Ir, Er;
b.parameters = {
  ...b.parameters,
  docs: {
    ...((Lr = b.parameters) == null ? void 0 : Lr.docs),
    source: {
      originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap"
  }}>
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="accent" disabled>
        Accent
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="link" disabled>
        Link
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
}`,
      ...((Er = (Ir = b.parameters) == null ? void 0 : Ir.docs) == null ? void 0 : Er.source),
    },
  },
};
const Mr = [
  "Primary",
  "Secondary",
  "Accent",
  "Outline",
  "Ghost",
  "Link",
  "Destructive",
  "AllVariants",
  "ExtraSmall",
  "Small",
  "Medium",
  "Large",
  "ExtraLarge",
  "IconSize",
  "AllSizes",
  "WithLeftIcon",
  "WithRightIcon",
  "WithBothIcons",
  "Disabled",
  "DisabledVariants",
];
export {
  t as Accent,
  v as AllSizes,
  d as AllVariants,
  c as Destructive,
  S as Disabled,
  b as DisabledVariants,
  g as ExtraLarge,
  l as ExtraSmall,
  o as Ghost,
  h as IconSize,
  p as Large,
  i as Link,
  m as Medium,
  s as Outline,
  n as Primary,
  a as Secondary,
  u as Small,
  y as WithBothIcons,
  x as WithLeftIcon,
  B as WithRightIcon,
  Mr as __namedExportsOrder,
  wr as default,
};
