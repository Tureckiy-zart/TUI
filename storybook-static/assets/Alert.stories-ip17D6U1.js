"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import "./index--tQcscZa.js";
import { H as B, T as F } from "./Typography-BJly0R5V.js";
import { c as J } from "./utils-CyawMXzk.js";
const r = ({ variant: p = "primary", title: u, description: m, className: z }) => {
  const R = {
    primary: "bg-primary/10 border-primary/20 text-primary-foreground",
    secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
    accent: "bg-accent/10 border-accent/20 text-accent-foreground",
    outline: "bg-background border-border text-foreground",
    ghost: "bg-transparent border-transparent text-foreground",
    link: "bg-transparent border-transparent text-primary",
    destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
  };
  return e.jsxs("div", {
    className: J("rounded-lg border p-md", R[p], z),
    children: [
      u && e.jsx(B, { level: 4, className: "mb-sm font-semibold", children: u }),
      m && e.jsx(F, { size: "sm", children: m }),
    ],
  });
};
try {
  ((r.displayName = "Alert"),
    (r.__docgenInfo = {
      description: "",
      displayName: "Alert",
      props: {
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
const X = {
    title: "Components/Alert",
    component: r,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
        description: "Alert variant style",
      },
    },
  },
  t = {
    args: {
      variant: "primary",
      title: "Information",
      description: "Here's some useful information for you.",
    },
  },
  a = {
    args: { variant: "secondary", title: "Secondary", description: "This is a secondary alert." },
  },
  i = {
    args: {
      variant: "accent",
      title: "Success!",
      description: "Operation completed successfully!",
    },
  },
  n = {
    args: {
      variant: "destructive",
      title: "Error",
      description: "Something went wrong. Please try again.",
    },
  },
  s = {
    args: {
      variant: "outline",
      title: "Warning",
      description: "Please review your input before proceeding.",
    },
  },
  o = {
    args: { variant: "ghost", title: "Ghost Alert", description: "This is a ghost variant alert." },
  },
  c = {
    args: { variant: "link", title: "Link Alert", description: "This is a link variant alert." },
  },
  l = { args: { variant: "primary", description: "This alert doesn't have a title." } },
  d = {
    render: () =>
      e.jsxs("div", {
        className: "space-y-md",
        children: [
          e.jsx(r, { variant: "primary", title: "Primary", description: "Primary alert variant." }),
          e.jsx(r, {
            variant: "secondary",
            title: "Secondary",
            description: "Secondary alert variant.",
          }),
          e.jsx(r, {
            variant: "accent",
            title: "Accent",
            description: "Accent alert variant (success).",
          }),
          e.jsx(r, { variant: "outline", title: "Outline", description: "Outline alert variant." }),
          e.jsx(r, { variant: "ghost", title: "Ghost", description: "Ghost alert variant." }),
          e.jsx(r, { variant: "link", title: "Link", description: "Link alert variant." }),
          e.jsx(r, {
            variant: "destructive",
            title: "Destructive",
            description: "Destructive alert variant (error).",
          }),
        ],
      }),
  };
var v, g, y;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((v = t.parameters) == null ? void 0 : v.docs),
    source: {
      originalSource: `{
  args: {
    variant: "primary",
    title: "Information",
    description: "Here's some useful information for you."
  }
}`,
      ...((y = (g = t.parameters) == null ? void 0 : g.docs) == null ? void 0 : y.source),
    },
  },
};
var f, h, A;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((f = a.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  args: {
    variant: "secondary",
    title: "Secondary",
    description: "This is a secondary alert."
  }
}`,
      ...((A = (h = a.parameters) == null ? void 0 : h.docs) == null ? void 0 : A.source),
    },
  },
};
var x, b, S;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((x = i.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `{
  args: {
    variant: "accent",
    title: "Success!",
    description: "Operation completed successfully!"
  }
}`,
      ...((S = (b = i.parameters) == null ? void 0 : b.docs) == null ? void 0 : S.source),
    },
  },
};
var k, j, T;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((k = n.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {
    variant: "destructive",
    title: "Error",
    description: "Something went wrong. Please try again."
  }
}`,
      ...((T = (j = n.parameters) == null ? void 0 : j.docs) == null ? void 0 : T.source),
    },
  },
};
var P, _, O;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((P = s.parameters) == null ? void 0 : P.docs),
    source: {
      originalSource: `{
  args: {
    variant: "outline",
    title: "Warning",
    description: "Please review your input before proceeding."
  }
}`,
      ...((O = (_ = s.parameters) == null ? void 0 : _.docs) == null ? void 0 : O.source),
    },
  },
};
var G, L, N;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((G = o.parameters) == null ? void 0 : G.docs),
    source: {
      originalSource: `{
  args: {
    variant: "ghost",
    title: "Ghost Alert",
    description: "This is a ghost variant alert."
  }
}`,
      ...((N = (L = o.parameters) == null ? void 0 : L.docs) == null ? void 0 : N.source),
    },
  },
};
var w, D, V;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((w = c.parameters) == null ? void 0 : w.docs),
    source: {
      originalSource: `{
  args: {
    variant: "link",
    title: "Link Alert",
    description: "This is a link variant alert."
  }
}`,
      ...((V = (D = c.parameters) == null ? void 0 : D.docs) == null ? void 0 : V.source),
    },
  },
};
var q, E, H;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((q = l.parameters) == null ? void 0 : q.docs),
    source: {
      originalSource: `{
  args: {
    variant: "primary",
    description: "This alert doesn't have a title."
  }
}`,
      ...((H = (E = l.parameters) == null ? void 0 : E.docs) == null ? void 0 : H.source),
    },
  },
};
var W, I, C;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((W = d.parameters) == null ? void 0 : W.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-md">
      <Alert variant="primary" title="Primary" description="Primary alert variant." />
      <Alert variant="secondary" title="Secondary" description="Secondary alert variant." />
      <Alert variant="accent" title="Accent" description="Accent alert variant (success)." />
      <Alert variant="outline" title="Outline" description="Outline alert variant." />
      <Alert variant="ghost" title="Ghost" description="Ghost alert variant." />
      <Alert variant="link" title="Link" description="Link alert variant." />
      <Alert variant="destructive" title="Destructive" description="Destructive alert variant (error)." />
    </div>
}`,
      ...((C = (I = d.parameters) == null ? void 0 : I.docs) == null ? void 0 : C.source),
    },
  },
};
const Y = [
  "Primary",
  "Secondary",
  "Accent",
  "Destructive",
  "Outline",
  "Ghost",
  "Link",
  "WithoutTitle",
  "AllVariants",
];
export {
  i as Accent,
  d as AllVariants,
  n as Destructive,
  o as Ghost,
  c as Link,
  s as Outline,
  t as Primary,
  a as Secondary,
  l as WithoutTitle,
  Y as __namedExportsOrder,
  X as default,
};
