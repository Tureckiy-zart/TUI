"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import "./index--tQcscZa.js";
import { H as r, T as a, C as m, B } from "./Typography-BJly0R5V.js";
import "./utils-CyawMXzk.js";
const A = {
    title: "Components/Typography",
    component: r,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
  },
  t = {
    render: () =>
      e.jsxs("div", {
        className: "space-y-md",
        children: [
          e.jsx(r, { level: 1, children: "Heading 1" }),
          e.jsx(r, { level: 2, children: "Heading 2" }),
          e.jsx(r, { level: 3, children: "Heading 3" }),
          e.jsx(r, { level: 4, children: "Heading 4" }),
          e.jsx(r, { level: 5, children: "Heading 5" }),
          e.jsx(r, { level: 6, children: "Heading 6" }),
        ],
      }),
  },
  s = {
    render: () =>
      e.jsxs("div", {
        className: "space-y-md",
        children: [
          e.jsx(a, { size: "xs", children: "Extra Small Text" }),
          e.jsx(a, { size: "sm", children: "Small Text" }),
          e.jsx(a, { size: "md", children: "Medium Text" }),
          e.jsx(a, { size: "lg", children: "Large Text" }),
          e.jsx(a, { size: "xl", children: "Extra Large Text" }),
        ],
      }),
  },
  n = {
    render: () =>
      e.jsxs("div", {
        className: "space-y-sm",
        children: [
          e.jsx(a, { weight: "normal", children: "Normal Weight" }),
          e.jsx(a, { weight: "medium", children: "Medium Weight" }),
          e.jsx(a, { weight: "semibold", children: "Semibold Weight" }),
          e.jsx(a, { weight: "bold", children: "Bold Weight" }),
        ],
      }),
  },
  i = {
    render: () =>
      e.jsxs("div", {
        className: "space-y-sm",
        children: [
          e.jsx(a, { variant: "muted", children: "Muted Variant" }),
          e.jsx(a, { variant: "primary", children: "Primary Variant" }),
          e.jsx(a, { variant: "secondary", children: "Secondary Variant" }),
          e.jsx(a, { variant: "accent", children: "Accent Variant" }),
          e.jsx(a, { variant: "destructive", children: "Destructive Variant" }),
          e.jsx(a, { variant: "link", children: "Link Variant" }),
        ],
      }),
  },
  d = {
    render: () => {
      const l = a;
      return e.jsxs("div", {
        className: "space-y-md",
        children: [
          e.jsx(l, {
            children:
              "This is a paragraph with normal text. It demonstrates how the Paragraph component renders text with proper spacing and line height for readability.",
          }),
          e.jsx(l, {
            children: "This is another paragraph to show the spacing between paragraphs.",
          }),
        ],
      });
    },
  },
  o = {
    render: () =>
      e.jsxs("div", {
        className: "space-y-md",
        children: [
          e.jsxs(a, {
            children: [
              "Here's some inline ",
              e.jsx(m, { children: "code" }),
              " within a paragraph.",
            ],
          }),
          e.jsx(m, { children: "console.log('Hello, World!');" }),
        ],
      }),
  },
  c = {
    render: () => e.jsx(B, { children: '"The best way to predict the future is to create it."' }),
  };
var x, p, h;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((x = t.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-md">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
}`,
      ...((h = (p = t.parameters) == null ? void 0 : p.docs) == null ? void 0 : h.source),
    },
  },
};
var g, T, u;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((g = s.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-md">
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="md">Medium Text</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
    </div>
}`,
      ...((u = (T = s.parameters) == null ? void 0 : T.docs) == null ? void 0 : u.source),
    },
  },
};
var v, j, H;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((v = n.parameters) == null ? void 0 : v.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-sm">
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
}`,
      ...((H = (j = n.parameters) == null ? void 0 : j.docs) == null ? void 0 : H.source),
    },
  },
};
var y, w, S;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((y = i.parameters) == null ? void 0 : y.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-sm">
      <Text variant="muted">Muted Variant</Text>
      <Text variant="primary">Primary Variant</Text>
      <Text variant="secondary">Secondary Variant</Text>
      <Text variant="accent">Accent Variant</Text>
      <Text variant="destructive">Destructive Variant</Text>
      <Text variant="link">Link Variant</Text>
    </div>
}`,
      ...((S = (w = i.parameters) == null ? void 0 : w.docs) == null ? void 0 : S.source),
    },
  },
};
var N, V, b;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((N = d.parameters) == null ? void 0 : N.docs),
    source: {
      originalSource: `{
  render: () => {
    const Paragraph = Text; // Use Text component as paragraph
    return <div className="space-y-md">
        <Paragraph>
          This is a paragraph with normal text. It demonstrates how the Paragraph component renders
          text with proper spacing and line height for readability.
        </Paragraph>
        <Paragraph>This is another paragraph to show the spacing between paragraphs.</Paragraph>
      </div>;
  }
}`,
      ...((b = (V = d.parameters) == null ? void 0 : V.docs) == null ? void 0 : b.source),
    },
  },
};
var z, E, P;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((z = o.parameters) == null ? void 0 : z.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-md">
      <Text>
        Here's some inline <Code>code</Code> within a paragraph.
      </Text>
      <Code>console.log('Hello, World!');</Code>
    </div>
}`,
      ...((P = (E = o.parameters) == null ? void 0 : E.docs) == null ? void 0 : P.source),
    },
  },
};
var W, k, C;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((W = c.parameters) == null ? void 0 : W.docs),
    source: {
      originalSource: `{
  render: () => <Blockquote>"The best way to predict the future is to create it."</Blockquote>
}`,
      ...((C = (k = c.parameters) == null ? void 0 : k.docs) == null ? void 0 : C.source),
    },
  },
};
const D = [
  "Headings",
  "TextSizes",
  "TextWeights",
  "TextVariants",
  "ParagraphExample",
  "CodeExample",
  "BlockquoteExample",
];
export {
  c as BlockquoteExample,
  o as CodeExample,
  t as Headings,
  d as ParagraphExample,
  s as TextSizes,
  i as TextVariants,
  n as TextWeights,
  D as __namedExportsOrder,
  A as default,
};
