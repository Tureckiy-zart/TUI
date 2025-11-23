"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as x } from "./index--tQcscZa.js";
import { c as b } from "./utils-CyawMXzk.js";
const t = ({ isOpen: s, onClose: r, title: l, children: f, className: y, ...h }) =>
  s
    ? e.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        ...h,
        children: [
          e.jsx("div", {
            className: "fixed inset-0 bg-black/50",
            onClick: r,
            "aria-label": "Close modal",
            role: "button",
            tabIndex: 0,
            onKeyDown: (a) => {
              (a.key === "Escape" || a.key === "Enter" || a.key === " ") &&
                (a.preventDefault(), r());
            },
          }),
          e.jsxs("div", {
            className: b("relative mx-4 w-full max-w-md rounded-lg border bg-card shadow-lg", y),
            children: [
              l &&
                e.jsx("div", {
                  className: "border-b p-6",
                  children: e.jsx("h2", { className: "text-lg font-semibold", children: l }),
                }),
              e.jsx("div", { className: "p-6", children: f }),
            ],
          }),
        ],
      })
    : null;
try {
  ((t.displayName = "SimpleModal"),
    (t.__docgenInfo = {
      description: "",
      displayName: "SimpleModal",
      props: {
        isOpen: {
          defaultValue: null,
          description: "",
          name: "isOpen",
          required: !0,
          type: { name: "boolean" },
        },
        onClose: {
          defaultValue: null,
          description: "",
          name: "onClose",
          required: !0,
          type: { name: "() => void" },
        },
        title: {
          defaultValue: null,
          description: "",
          name: "title",
          required: !1,
          type: { name: "string | undefined" },
        },
      },
    }));
} catch {}
const N = {
    title: "Components/SimpleModal",
    component: t,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    argTypes: { isOpen: { control: { type: "boolean" } } },
  },
  g = () => {
    const [s, r] = x.useState(!1);
    return e.jsxs("div", {
      children: [
        e.jsx("button", {
          onClick: () => r(!0),
          className:
            "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
          children: "Open Modal",
        }),
        e.jsxs(t, {
          isOpen: s,
          onClose: () => r(!1),
          title: "Demo Modal",
          children: [
            e.jsx("p", { children: "This is a demo modal content." }),
            e.jsx("div", {
              className: "mt-md flex justify-end",
              children: e.jsx("button", {
                onClick: () => r(!1),
                className:
                  "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
                children: "Close",
              }),
            }),
          ],
        }),
      ],
    });
  },
  o = { render: () => e.jsx(g, {}) },
  n = {
    render: () => {
      const [s, r] = x.useState(!1);
      return e.jsxs("div", {
        children: [
          e.jsx("button", {
            onClick: () => r(!0),
            className:
              "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
            children: "Open Modal Without Title",
          }),
          e.jsxs(t, {
            isOpen: s,
            onClose: () => r(!1),
            children: [
              e.jsx("p", { children: "This modal doesn't have a title." }),
              e.jsx("div", {
                className: "mt-md flex justify-end",
                children: e.jsx("button", {
                  onClick: () => r(!1),
                  className:
                    "rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90",
                  children: "Close",
                }),
              }),
            ],
          }),
        ],
      });
    },
  };
var d, i, m;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((d = o.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  render: () => <ModalWithState />
}`,
      ...((m = (i = o.parameters) == null ? void 0 : i.docs) == null ? void 0 : m.source),
    },
  },
};
var p, c, u;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((p = n.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <div>
        <button onClick={() => setIsOpen(true)} className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90">
          Open Modal Without Title
        </button>
        <SimpleModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This modal doesn't have a title.</p>
          <div className="mt-md flex justify-end">
            <button onClick={() => setIsOpen(false)} className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90">
              Close
            </button>
          </div>
        </SimpleModal>
      </div>;
  }
}`,
      ...((u = (c = n.parameters) == null ? void 0 : c.docs) == null ? void 0 : u.source),
    },
  },
};
const C = ["Default", "WithoutTitle"];
export { o as Default, n as WithoutTitle, C as __namedExportsOrder, N as default };
