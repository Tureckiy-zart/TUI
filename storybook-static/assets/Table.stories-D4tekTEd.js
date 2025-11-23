"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import "./index--tQcscZa.js";
import { c as b } from "./utils-CyawMXzk.js";
const s = ({ data: r, columns: l, rowKey: x, className: g }) =>
  e.jsx("div", {
    className: b("overflow-x-auto", g),
    children: e.jsxs("table", {
      className: "w-full border-collapse",
      children: [
        e.jsx("thead", {
          children: e.jsx("tr", {
            className: "border-b",
            children: l.map((a) =>
              e.jsx(
                "th",
                {
                  className: "p-sm text-left font-medium text-muted-foreground",
                  children: a.title,
                },
                String(a.key),
              ),
            ),
          }),
        }),
        e.jsx("tbody", {
          children: r.map((a) =>
            e.jsx(
              "tr",
              {
                className: "border-b hover:bg-muted/50",
                children: l.map((t) =>
                  e.jsx(
                    "td",
                    {
                      className: "p-sm",
                      children: t.render ? t.render(a[t.key], a) : String(a[t.key]),
                    },
                    String(t.key),
                  ),
                ),
              },
              String(a[x]),
            ),
          ),
        }),
      ],
    }),
  });
try {
  ((s.displayName = "Table"),
    (s.__docgenInfo = {
      description: "",
      displayName: "Table",
      props: {
        data: {
          defaultValue: null,
          description: "",
          name: "data",
          required: !0,
          type: { name: "T[]" },
        },
        columns: {
          defaultValue: null,
          description: "",
          name: "columns",
          required: !0,
          type: { name: "TableColumn<T>[]" },
        },
        rowKey: {
          defaultValue: null,
          description: "",
          name: "rowKey",
          required: !0,
          type: { name: "string | number | symbol" },
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
const N = {
    title: "Components/Table",
    component: s,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
  },
  y = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator" },
  ],
  n = {
    args: {
      data: y,
      columns: [
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "role", title: "Role" },
      ],
      rowKey: "id",
    },
  },
  o = {
    args: {
      data: y,
      columns: [
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        {
          key: "role",
          title: "Role",
          render: (r) =>
            e.jsx("span", {
              className: `rounded px-sm py-xs text-xs ${r === "Admin" ? "bg-destructive/20 text-destructive-foreground" : r === "Moderator" ? "bg-secondary/20 text-secondary-foreground" : "bg-accent/20 text-accent-foreground"}`,
              children: r,
            }),
        },
      ],
      rowKey: "id",
    },
  };
var d, m, i;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((d = n.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    data: sampleData,
    columns: [{
      key: "name",
      title: "Name"
    }, {
      key: "email",
      title: "Email"
    }, {
      key: "role",
      title: "Role"
    }],
    rowKey: "id"
  }
}`,
      ...((i = (m = n.parameters) == null ? void 0 : m.docs) == null ? void 0 : i.source),
    },
  },
};
var c, u, p;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((c = o.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  args: {
    data: sampleData,
    columns: [{
      key: "name",
      title: "Name"
    }, {
      key: "email",
      title: "Email"
    }, {
      key: "role",
      title: "Role",
      render: value => <span className={\`rounded px-sm py-xs text-xs \${value === "Admin" ? "bg-destructive/20 text-destructive-foreground" : value === "Moderator" ? "bg-secondary/20 text-secondary-foreground" : "bg-accent/20 text-accent-foreground"}\`}>
            {value}
          </span>
    }],
    rowKey: "id"
  }
}`,
      ...((p = (u = o.parameters) == null ? void 0 : u.docs) == null ? void 0 : p.source),
    },
  },
};
const j = ["Default", "WithCustomRender"];
export { n as Default, o as WithCustomRender, j as __namedExportsOrder, N as default };
