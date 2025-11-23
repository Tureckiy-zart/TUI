"use client";
import { j as n } from "./jsx-runtime-0-JxQnzY.js";
import { S as m } from "./index-DDxmA3Og.js";
import { c as p } from "./index-Dp35_cgR.js";
import { r as f } from "./index--tQcscZa.js";
import { c as x } from "./utils-CyawMXzk.js";
const y = p(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          accent: "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90",
          outline:
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
          destructive:
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        },
        size: {
          xs: "h-7 rounded-md px-xs py-xs text-xs",
          sm: "h-8 rounded-md px-sm py-xs text-xs",
          md: "h-9 rounded-md px-md py-sm text-sm",
          lg: "h-10 rounded-md px-lg py-sm text-sm",
          xl: "h-11 rounded-md px-xl py-md text-base",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: { variant: "primary", size: "md" },
    },
  ),
  t = f.forwardRef(
    (
      {
        className: e,
        variant: s,
        size: i,
        asChild: o = !1,
        leftIcon: r,
        rightIcon: a,
        children: d,
        ...l
      },
      c,
    ) => {
      const u = o ? m : "button";
      return n.jsxs(u, {
        className: x(y({ variant: s, size: i, className: e })),
        ref: c,
        ...l,
        children: [
          r && n.jsx("span", { className: "inline-flex items-center", children: r }),
          d,
          a && n.jsx("span", { className: "inline-flex items-center", children: a }),
        ],
      });
    },
  );
t.displayName = "Button";
try {
  ((t.displayName = "Button"),
    (t.__docgenInfo = {
      description: "",
      displayName: "Button",
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
          type: { name: '"xs" | "sm" | "md" | "lg" | "xl" | "icon" | null | undefined' },
        },
      },
    }));
} catch {}
try {
  ((Button.displayName = "Button"),
    (Button.__docgenInfo = {
      description: "",
      displayName: "Button",
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
          type: { name: '"xs" | "sm" | "md" | "lg" | "xl" | "icon" | null | undefined' },
        },
      },
    }));
} catch {}
export { t as B };
