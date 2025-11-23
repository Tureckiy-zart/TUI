"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as k } from "./index--tQcscZa.js";
import { c as M } from "./utils-CyawMXzk.js";
const d = ({ value: s, max: r = 100, className: _ }) => {
  const S = Math.min(100, Math.max(0, (s / r) * 100));
  return e.jsx("div", {
    className: M("h-2 w-full rounded-full bg-secondary", _),
    children: e.jsx("div", {
      className: "h-2 rounded-full bg-primary transition-all duration-300",
      style: { width: `${S}%` },
    }),
  });
};
try {
  ((d.displayName = "Progress"),
    (d.__docgenInfo = {
      description: "",
      displayName: "Progress",
      props: {
        value: {
          defaultValue: null,
          description: "",
          name: "value",
          required: !0,
          type: { name: "number" },
        },
        max: {
          defaultValue: { value: "100" },
          description: "",
          name: "max",
          required: !1,
          type: { name: "number | undefined" },
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
    title: "Components/Progress",
    component: d,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
  },
  a = { args: { value: 45 } },
  o = { args: { value: 0 } },
  n = { args: { value: 50 } },
  t = { args: { value: 100 } },
  c = {
    render: () => {
      const [s, r] = k.useState(45);
      return e.jsx("div", {
        className: "space-y-md",
        children: e.jsxs("div", {
          children: [
            e.jsxs("label", {
              className: "mb-sm block text-sm font-medium",
              children: ["Progress: ", s, "%"],
            }),
            e.jsx(d, { value: s }),
            e.jsxs("div", {
              className: "mt-sm flex gap-sm",
              children: [
                e.jsx("button", {
                  onClick: () => r(Math.max(0, s - 10)),
                  className:
                    "rounded bg-secondary px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80",
                  children: "-10%",
                }),
                e.jsx("button", {
                  onClick: () => r(Math.min(100, s + 10)),
                  className:
                    "rounded bg-secondary px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80",
                  children: "+10%",
                }),
              ],
            }),
          ],
        }),
      });
    },
  };
var m, l, u;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((m = a.parameters) == null ? void 0 : m.docs),
    source: {
      originalSource: `{
  args: {
    value: 45
  }
}`,
      ...((u = (l = a.parameters) == null ? void 0 : l.docs) == null ? void 0 : u.source),
    },
  },
};
var p, i, g;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((p = o.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `{
  args: {
    value: 0
  }
}`,
      ...((g = (i = o.parameters) == null ? void 0 : i.docs) == null ? void 0 : g.source),
    },
  },
};
var x, y, v;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((x = n.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `{
  args: {
    value: 50
  }
}`,
      ...((v = (y = n.parameters) == null ? void 0 : y.docs) == null ? void 0 : v.source),
    },
  },
};
var f, b, h;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((f = t.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  args: {
    value: 100
  }
}`,
      ...((h = (b = t.parameters) == null ? void 0 : b.docs) == null ? void 0 : h.source),
    },
  },
};
var N, j, P;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((N = c.parameters) == null ? void 0 : N.docs),
    source: {
      originalSource: `{
  render: () => {
    const [progress, setProgress] = useState(45);
    return <div className="space-y-md">
        <div>
          <label className="mb-sm block text-sm font-medium">Progress: {progress}%</label>
          <Progress value={progress} />
          <div className="mt-sm flex gap-sm">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="rounded bg-secondary px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80">
              -10%
            </button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="rounded bg-secondary px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80">
              +10%
            </button>
          </div>
        </div>
      </div>;
  }
}`,
      ...((P = (j = c.parameters) == null ? void 0 : j.docs) == null ? void 0 : P.source),
    },
  },
};
const V = ["Default", "Empty", "Half", "Full", "Interactive"];
export {
  a as Default,
  o as Empty,
  t as Full,
  n as Half,
  c as Interactive,
  V as __namedExportsOrder,
  I as default,
};
