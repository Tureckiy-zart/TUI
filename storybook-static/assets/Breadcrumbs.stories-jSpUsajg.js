"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as S, R as V } from "./index--tQcscZa.js";
import { S as q } from "./index-DDxmA3Og.js";
import { c as I } from "./index-Dp35_cgR.js";
import { c as _ } from "./utils-CyawMXzk.js";
import { C as R } from "./chevron-right-FuoWzis5.js";
import "./index-CJkT59yQ.js";
import "./createLucideIcon-CD2Sj3SA.js";
const H = I(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          primary: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
          secondary: "text-secondary-foreground underline-offset-4 hover:underline",
          accent:
            "text-accent-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-md py-sm",
          ghost:
            "text-foreground hover:text-accent-foreground hover:bg-accent rounded-md px-sm py-sm",
          link: "text-primary underline-offset-4 hover:underline",
          destructive:
            "text-destructive hover:text-destructive/80 underline-offset-4 hover:underline",
        },
        size: {
          xs: "h-7 text-xs px-xs py-xs",
          sm: "h-8 text-xs px-sm py-xs",
          md: "h-9 text-sm px-md py-sm",
          lg: "h-10 text-sm px-lg py-sm",
          xl: "h-11 text-base px-xl py-md",
        },
      },
      defaultVariants: { variant: "link", size: "md" },
    },
  ),
  l = S.forwardRef(
    (
      {
        className: a,
        variant: i,
        size: r,
        asChild: t = !1,
        leftIcon: d,
        rightIcon: m,
        children: C,
        ...N
      },
      j,
    ) => {
      const k = t ? q : "a";
      return e.jsxs(k, {
        className: _(H({ variant: i, size: r, className: a })),
        ref: j,
        ...N,
        children: [
          d && e.jsx("span", { className: "inline-flex items-center", children: d }),
          C,
          m && e.jsx("span", { className: "inline-flex items-center", children: m }),
        ],
      });
    },
  );
l.displayName = "Link";
try {
  ((l.displayName = "Link"),
    (l.__docgenInfo = {
      description: "",
      displayName: "Link",
      props: {
        asChild: {
          defaultValue: { value: "false" },
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        leftIcon: {
          defaultValue: null,
          description: "",
          name: "leftIcon",
          required: !1,
          type: { name: "ReactNode" },
        },
        rightIcon: {
          defaultValue: null,
          description: "",
          name: "rightIcon",
          required: !1,
          type: { name: "ReactNode" },
        },
        variant: {
          defaultValue: null,
          description: "",
          name: "variant",
          required: !1,
          type: {
            name: '"primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive" | null | undefined',
          },
        },
        size: {
          defaultValue: null,
          description: "",
          name: "size",
          required: !1,
          type: { name: '"xs" | "sm" | "md" | "lg" | "xl" | null | undefined' },
        },
      },
    }));
} catch {}
const c = ({ items: a, className: i }) =>
  e.jsx("nav", {
    className: _("flex items-center space-x-sm text-sm", i),
    children: a.map((r, t) =>
      e.jsxs(
        V.Fragment,
        {
          children: [
            t > 0 && e.jsx(R, { className: "h-4 w-4 text-muted-foreground" }),
            r.href
              ? e.jsx(l, {
                  href: r.href,
                  className: "text-muted-foreground transition-colors hover:text-foreground",
                  children: r.label,
                })
              : e.jsx("span", { className: "font-medium text-foreground", children: r.label }),
          ],
        },
        t,
      ),
    ),
  });
try {
  ((c.displayName = "Breadcrumbs"),
    (c.__docgenInfo = {
      description: "",
      displayName: "Breadcrumbs",
      props: {
        items: {
          defaultValue: null,
          description: "",
          name: "items",
          required: !0,
          type: { name: "BreadcrumbItem[]" },
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
const O = {
    title: "Components/Breadcrumbs",
    component: c,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
  },
  n = {
    args: {
      items: [
        { label: "Home", href: "/" },
        { label: "Events", href: "/events" },
        { label: "Classical", href: "/events/classical" },
        { label: "Current Page" },
      ],
    },
  },
  s = { args: { items: [{ label: "Home", href: "/" }, { label: "Current Page" }] } },
  o = {
    args: {
      items: [
        { label: "Home", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Subcategory", href: "/category/subcategory" },
        { label: "Item", href: "/category/subcategory/item" },
        { label: "Details", href: "/category/subcategory/item/details" },
        { label: "Current Page" },
      ],
    },
  };
var u, f, p;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((u = n.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      label: "Home",
      href: "/"
    }, {
      label: "Events",
      href: "/events"
    }, {
      label: "Classical",
      href: "/events/classical"
    }, {
      label: "Current Page"
    }]
  }
}`,
      ...((p = (f = n.parameters) == null ? void 0 : f.docs) == null ? void 0 : p.source),
    },
  },
};
var g, h, x;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((g = s.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      label: "Home",
      href: "/"
    }, {
      label: "Current Page"
    }]
  }
}`,
      ...((x = (h = s.parameters) == null ? void 0 : h.docs) == null ? void 0 : x.source),
    },
  },
};
var b, y, v;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((b = o.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      label: "Home",
      href: "/"
    }, {
      label: "Category",
      href: "/category"
    }, {
      label: "Subcategory",
      href: "/category/subcategory"
    }, {
      label: "Item",
      href: "/category/subcategory/item"
    }, {
      label: "Details",
      href: "/category/subcategory/item/details"
    }, {
      label: "Current Page"
    }]
  }
}`,
      ...((v = (y = o.parameters) == null ? void 0 : y.docs) == null ? void 0 : v.source),
    },
  },
};
const A = ["Default", "Short", "Long"];
export { n as Default, o as Long, s as Short, A as __namedExportsOrder, O as default };
