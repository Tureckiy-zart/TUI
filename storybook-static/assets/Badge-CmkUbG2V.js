"use client";
import { j as a } from "./jsx-runtime-0-JxQnzY.js";
import { c as o } from "./index-Dp35_cgR.js";
import "./index--tQcscZa.js";
import { c as i } from "./utils-CyawMXzk.js";
const s = o(
  "inline-flex items-center rounded-full border px-xs py-xs text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        outline: "text-foreground border-border",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-accent/10",
        link: "border-transparent bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);
function e({ className: r, variant: t, ...n }) {
  return a.jsx("div", { className: i(s({ variant: t }), r), ...n });
}
try {
  ((e.displayName = "Badge"),
    (e.__docgenInfo = {
      description: "",
      displayName: "Badge",
      props: {
        variant: {
          defaultValue: null,
          description: "",
          name: "variant",
          required: !1,
          type: {
            name: '"primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive" | null | undefined',
          },
        },
      },
    }));
} catch {}
export { e as B };
