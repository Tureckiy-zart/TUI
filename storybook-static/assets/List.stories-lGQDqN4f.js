"use client";
import { j as t } from "./jsx-runtime-0-JxQnzY.js";
import "./index--tQcscZa.js";
import { c as E } from "./utils-CyawMXzk.js";
const r = ({ items: o, className: v }) =>
  t.jsx("div", {
    className: E("space-y-sm", v),
    children: o.map((e) =>
      t.jsxs(
        "div",
        {
          className: "rounded-lg border p-md transition-colors hover:bg-muted/50",
          children: [
            t.jsx("h3", { className: "font-medium text-foreground", children: e.title }),
            e.description &&
              t.jsx("p", {
                className: "mt-xs text-sm text-muted-foreground",
                children: e.description,
              }),
          ],
        },
        e.id,
      ),
    ),
  });
try {
  ((r.displayName = "List"),
    (r.__docgenInfo = {
      description: "",
      displayName: "List",
      props: {
        items: {
          defaultValue: null,
          description: "",
          name: "items",
          required: !0,
          type: { name: "ListItem[]" },
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
const D = {
    title: "Components/List",
    component: r,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
  },
  f = [
    { id: "1", title: "Event 1", description: "Description for event 1" },
    { id: "2", title: "Event 2", description: "Description for event 2" },
    { id: "3", title: "Event 3", description: "Description for event 3" },
  ],
  n = { args: { items: f } },
  s = {
    args: {
      items: [
        { id: "1", title: "Event 1" },
        { id: "2", title: "Event 2" },
        { id: "3", title: "Event 3" },
      ],
    },
  },
  i = {
    args: {
      items: [
        {
          id: "1",
          title: "Event 1",
          description:
            "This is a very long description that should wrap properly and show how the component handles longer text content.",
        },
        {
          id: "2",
          title: "Event 2",
          description:
            "Another long description to demonstrate text wrapping and proper spacing in the list component.",
        },
        { id: "3", title: "Event 3", description: "Short description." },
      ],
    },
  };
var a, d, p;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((a = n.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  args: {
    items: sampleItems
  }
}`,
      ...((p = (d = n.parameters) == null ? void 0 : d.docs) == null ? void 0 : p.source),
    },
  },
};
var c, l, m;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((c = s.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      id: "1",
      title: "Event 1"
    }, {
      id: "2",
      title: "Event 2"
    }, {
      id: "3",
      title: "Event 3"
    }]
  }
}`,
      ...((m = (l = s.parameters) == null ? void 0 : l.docs) == null ? void 0 : m.source),
    },
  },
};
var u, g, h;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((u = i.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      id: "1",
      title: "Event 1",
      description: "This is a very long description that should wrap properly and show how the component handles longer text content."
    }, {
      id: "2",
      title: "Event 2",
      description: "Another long description to demonstrate text wrapping and proper spacing in the list component."
    }, {
      id: "3",
      title: "Event 3",
      description: "Short description."
    }]
  }
}`,
      ...((h = (g = i.parameters) == null ? void 0 : g.docs) == null ? void 0 : h.source),
    },
  },
};
const w = ["Default", "WithoutDescription", "LongDescriptions"];
export {
  n as Default,
  i as LongDescriptions,
  s as WithoutDescription,
  w as __namedExportsOrder,
  D as default,
};
