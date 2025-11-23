"use client";
import { j as l } from "./jsx-runtime-0-JxQnzY.js";
import "./index--tQcscZa.js";
import { c as n } from "./utils-CyawMXzk.js";
const i = ({ className: e, children: a, as: t, level: u = 1 }) => {
    const r = t || `h${u}`,
      s = {
        1: "text-4xl font-bold tracking-tight",
        2: "text-3xl font-bold tracking-tight",
        3: "text-2xl font-bold tracking-tight",
        4: "text-xl font-semibold tracking-tight",
        5: "text-lg font-semibold tracking-tight",
        6: "text-md font-semibold tracking-tight",
      };
    return l.jsx(r, { className: n(s[u], e), children: a });
  },
  d = ({ className: e, children: a, size: t = "md", weight: u = "normal", variant: r }) => {
    const s = { xs: "text-xs", sm: "text-sm", md: "text-base", lg: "text-lg", xl: "text-xl" },
      p = {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      v = {
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        accent: "text-accent-foreground",
        outline: "text-foreground",
        ghost: "text-foreground",
        link: "text-primary hover:underline",
        destructive: "text-destructive",
        muted: "text-muted-foreground",
      };
    return l.jsx("span", { className: n(s[t], p[u], r && v[r], e), children: a });
  },
  o = ({ className: e, children: a, ...t }) =>
    l.jsx("p", {
      className: n("leading-7 [&:not(:first-child)]:mt-lg", e),
      children: l.jsx(d, { ...t, children: a }),
    }),
  m = ({ className: e, children: a }) =>
    l.jsx("code", {
      className: n(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        e,
      ),
      children: a,
    }),
  c = ({ className: e, children: a }) =>
    l.jsx("blockquote", { className: n("mt-lg border-l-2 pl-lg italic", e), children: a });
try {
  ((i.displayName = "Heading"),
    (i.__docgenInfo = {
      description: "",
      displayName: "Heading",
      props: {
        as: {
          defaultValue: null,
          description: "",
          name: "as",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"h2"' },
              { value: '"h3"' },
              { value: '"h1"' },
              { value: '"h4"' },
              { value: '"h5"' },
              { value: '"h6"' },
            ],
          },
        },
        level: {
          defaultValue: { value: "1" },
          description: "",
          name: "level",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: "1" },
              { value: "4" },
              { value: "3" },
              { value: "2" },
              { value: "5" },
              { value: "6" },
            ],
          },
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
try {
  ((d.displayName = "Text"),
    (d.__docgenInfo = {
      description: "",
      displayName: "Text",
      props: {
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
        weight: {
          defaultValue: { value: "normal" },
          description: "",
          name: "weight",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"normal"' },
              { value: '"medium"' },
              { value: '"semibold"' },
              { value: '"bold"' },
            ],
          },
        },
        variant: {
          defaultValue: null,
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
              { value: '"muted"' },
            ],
          },
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
try {
  ((o.displayName = "Paragraph"),
    (o.__docgenInfo = {
      description: "",
      displayName: "Paragraph",
      props: {
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
        weight: {
          defaultValue: { value: "normal" },
          description: "",
          name: "weight",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"normal"' },
              { value: '"medium"' },
              { value: '"semibold"' },
              { value: '"bold"' },
            ],
          },
        },
        variant: {
          defaultValue: null,
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
              { value: '"muted"' },
            ],
          },
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
try {
  ((m.displayName = "Code"),
    (m.__docgenInfo = {
      description: "",
      displayName: "Code",
      props: {
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
try {
  ((c.displayName = "Blockquote"),
    (c.__docgenInfo = {
      description: "",
      displayName: "Blockquote",
      props: {
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
export { c as B, m as C, i as H, d as T };
