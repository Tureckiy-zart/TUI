"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import "./index--tQcscZa.js";
import { H as v, T as d } from "./Typography-BJly0R5V.js";
import { c as N } from "./utils-CyawMXzk.js";
const r = ({ items: n, className: x }) =>
  e.jsx("div", {
    className: N("space-y-lg", x),
    children: n.map((t, j) =>
      e.jsxs(
        "div",
        {
          className: "relative flex",
          children: [
            e.jsxs("div", {
              className: "flex flex-col items-center",
              children: [
                e.jsx("div", {
                  className: "h-3 w-3 rounded-full border-2 border-background bg-primary",
                }),
                j < n.length - 1 && e.jsx("div", { className: "mt-sm h-12 w-px bg-border" }),
              ],
            }),
            e.jsxs("div", {
              className: "ml-md flex-1",
              children: [
                e.jsx(v, { level: 3, className: "font-medium", children: t.title }),
                e.jsx(d, { size: "sm", variant: "muted", children: t.date }),
                t.description &&
                  e.jsx(d, {
                    size: "sm",
                    variant: "muted",
                    className: "mt-xs",
                    children: t.description,
                  }),
              ],
            }),
          ],
        },
        t.id,
      ),
    ),
  });
try {
  ((r.displayName = "Timeline"),
    (r.__docgenInfo = {
      description: "",
      displayName: "Timeline",
      props: {
        items: {
          defaultValue: null,
          description: "",
          name: "items",
          required: !0,
          type: { name: "TimelineItem[]" },
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
const I = {
    title: "Components/Timeline",
    component: r,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
  },
  y = [
    { id: "1", title: "Project Started", date: "2024-01-01", description: "Initial project setup" },
    {
      id: "2",
      title: "First Milestone",
      date: "2024-02-01",
      description: "Core features completed",
    },
    { id: "3", title: "Beta Release", date: "2024-03-01", description: "Beta version released" },
  ],
  s = { args: { items: y } },
  i = {
    args: {
      items: [
        { id: "1", title: "Project Started", date: "2024-01-01" },
        { id: "2", title: "First Milestone", date: "2024-02-01" },
        { id: "3", title: "Beta Release", date: "2024-03-01" },
      ],
    },
  },
  a = {
    args: {
      items: [
        {
          id: "1",
          title: "Project Started",
          date: "2024-01-01",
          description: "Initial project setup with comprehensive planning and architecture design",
        },
        {
          id: "2",
          title: "First Milestone",
          date: "2024-02-01",
          description:
            "Core features completed including authentication, user management, and basic functionality",
        },
        {
          id: "3",
          title: "Beta Release",
          date: "2024-03-01",
          description:
            "Beta version released to selected users for testing and feedback collection",
        },
      ],
    },
  };
var o, c, l;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((o = s.parameters) == null ? void 0 : o.docs),
    source: {
      originalSource: `{
  args: {
    items: sampleItems
  }
}`,
      ...((l = (c = s.parameters) == null ? void 0 : c.docs) == null ? void 0 : l.source),
    },
  },
};
var m, p, u;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((m = i.parameters) == null ? void 0 : m.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      id: "1",
      title: "Project Started",
      date: "2024-01-01"
    }, {
      id: "2",
      title: "First Milestone",
      date: "2024-02-01"
    }, {
      id: "3",
      title: "Beta Release",
      date: "2024-03-01"
    }]
  }
}`,
      ...((u = (p = i.parameters) == null ? void 0 : p.docs) == null ? void 0 : u.source),
    },
  },
};
var g, f, h;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((g = a.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      id: "1",
      title: "Project Started",
      date: "2024-01-01",
      description: "Initial project setup with comprehensive planning and architecture design"
    }, {
      id: "2",
      title: "First Milestone",
      date: "2024-02-01",
      description: "Core features completed including authentication, user management, and basic functionality"
    }, {
      id: "3",
      title: "Beta Release",
      date: "2024-03-01",
      description: "Beta version released to selected users for testing and feedback collection"
    }]
  }
}`,
      ...((h = (f = a.parameters) == null ? void 0 : f.docs) == null ? void 0 : h.source),
    },
  },
};
const T = ["Default", "WithoutDescription", "LongDescriptions"];
export {
  s as Default,
  a as LongDescriptions,
  i as WithoutDescription,
  T as __namedExportsOrder,
  I as default,
};
