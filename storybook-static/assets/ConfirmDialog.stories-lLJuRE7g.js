"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as d } from "./index--tQcscZa.js";
import { B as s } from "./Button-DSOQhk0m.js";
import { M as q, b, c as A, d as V, e as _, f as k } from "./Modal-OkEkQvKA.js";
import "./index-DDxmA3Og.js";
import "./index-CJkT59yQ.js";
import "./index-Dp35_cgR.js";
import "./utils-CyawMXzk.js";
import "./index-m_zWotLa.js";
import "./index-jG1cqCvV.js";
import "./index-pvjnvxJ7.js";
import "./index-D8ovs0-6.js";
import "./Combination-DplBdLRn.js";
import "./index-yb7JCnm7.js";
import "./x-CU17JbhH.js";
import "./createLucideIcon-CD2Sj3SA.js";
function a({
  isOpen: t,
  onClose: n,
  onConfirm: p,
  title: o,
  description: i,
  confirmText: r,
  cancelText: m,
  loadingText: j,
  variant: w = "primary",
  isLoading: f = !1,
}) {
  if (!o || o.trim() === "")
    throw new Error('ConfirmDialog: "title" prop is required and cannot be empty');
  if (!i || i.trim() === "")
    throw new Error('ConfirmDialog: "description" prop is required and cannot be empty');
  if (!r || r.trim() === "")
    throw new Error('ConfirmDialog: "confirmText" prop is required and cannot be empty');
  if (!m || m.trim() === "")
    throw new Error('ConfirmDialog: "cancelText" prop is required and cannot be empty');
  const S = () => {
    (p(), n());
  };
  return e.jsx(q, {
    open: t,
    onOpenChange: n,
    children: e.jsxs(b, {
      children: [
        e.jsxs(A, { children: [e.jsx(V, { children: o }), e.jsx(_, { children: i })] }),
        e.jsxs(k, {
          children: [
            e.jsx(s, { variant: "outline", onClick: n, disabled: f, children: m }),
            e.jsx(s, { variant: w, onClick: S, disabled: f, children: (f && j) || r }),
          ],
        }),
      ],
    }),
  });
}
try {
  ((a.displayName = "ConfirmDialog"),
    (a.__docgenInfo = {
      description: "",
      displayName: "ConfirmDialog",
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
        onConfirm: {
          defaultValue: null,
          description: "",
          name: "onConfirm",
          required: !0,
          type: { name: "() => void" },
        },
        title: {
          defaultValue: null,
          description: "",
          name: "title",
          required: !0,
          type: { name: "string" },
        },
        description: {
          defaultValue: null,
          description: "",
          name: "description",
          required: !0,
          type: { name: "string" },
        },
        confirmText: {
          defaultValue: null,
          description: "",
          name: "confirmText",
          required: !0,
          type: { name: "string" },
        },
        cancelText: {
          defaultValue: null,
          description: "",
          name: "cancelText",
          required: !0,
          type: { name: "string" },
        },
        loadingText: {
          defaultValue: null,
          description: "",
          name: "loadingText",
          required: !1,
          type: { name: "string | undefined" },
        },
        variant: {
          defaultValue: { value: "primary" },
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
            ],
          },
        },
        isLoading: {
          defaultValue: { value: "false" },
          description: "",
          name: "isLoading",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
const W = {
    title: "Modals/ConfirmDialog",
    component: a,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
  },
  l = {
    render: () => {
      const [t, n] = d.useState(!1);
      return e.jsxs(e.Fragment, {
        children: [
          e.jsx(s, { onClick: () => n(!0), children: "Delete Item" }),
          e.jsx(a, {
            isOpen: t,
            onClose: () => n(!1),
            onConfirm: () => {
              (console.log("Confirmed!"), n(!1));
            },
            title: "Delete Item",
            description: "Are you sure you want to delete this item? This action cannot be undone.",
            confirmText: "Delete",
            cancelText: "Cancel",
          }),
        ],
      });
    },
  },
  c = {
    render: () => {
      const [t, n] = d.useState(!1);
      return e.jsxs(e.Fragment, {
        children: [
          e.jsx(s, { variant: "destructive", onClick: () => n(!0), children: "Delete Account" }),
          e.jsx(a, {
            isOpen: t,
            onClose: () => n(!1),
            onConfirm: () => {
              (console.log("Account deleted!"), n(!1));
            },
            title: "Delete Account",
            description:
              "This will permanently delete your account and all associated data. This action cannot be undone.",
            confirmText: "Delete Account",
            cancelText: "Cancel",
            variant: "destructive",
          }),
        ],
      });
    },
  },
  u = {
    render: () => {
      const [t, n] = d.useState(!1),
        [p, o] = d.useState(!1),
        i = async () => {
          (o(!0), await new Promise((r) => setTimeout(r, 2e3)), o(!1), n(!1));
        };
      return e.jsxs(e.Fragment, {
        children: [
          e.jsx(s, { onClick: () => n(!0), children: "Save Changes" }),
          e.jsx(a, {
            isOpen: t,
            onClose: () => n(!1),
            onConfirm: i,
            title: "Save Changes",
            description: "Are you sure you want to save these changes?",
            confirmText: "Save",
            cancelText: "Cancel",
            isLoading: p,
          }),
        ],
      });
    },
  };
var C, g, h;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((C = l.parameters) == null ? void 0 : C.docs),
    source: {
      originalSource: `{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Delete Item</Button>
        <ConfirmDialog isOpen={open} onClose={() => setOpen(false)} onConfirm={() => {
        console.log("Confirmed!");
        setOpen(false);
      }} title="Delete Item" description="Are you sure you want to delete this item? This action cannot be undone." confirmText="Delete" cancelText="Cancel" />
      </>;
  }
}`,
      ...((h = (g = l.parameters) == null ? void 0 : g.docs) == null ? void 0 : h.source),
    },
  },
};
var v, x, y;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((v = c.parameters) == null ? void 0 : v.docs),
    source: {
      originalSource: `{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <ConfirmDialog isOpen={open} onClose={() => setOpen(false)} onConfirm={() => {
        console.log("Account deleted!");
        setOpen(false);
      }} title="Delete Account" description="This will permanently delete your account and all associated data. This action cannot be undone." confirmText="Delete Account" cancelText="Cancel" variant="destructive" />
      </>;
  }
}`,
      ...((y = (x = c.parameters) == null ? void 0 : x.docs) == null ? void 0 : y.source),
    },
  },
};
var D, O, T;
u.parameters = {
  ...u.parameters,
  docs: {
    ...((D = u.parameters) == null ? void 0 : D.docs),
    source: {
      originalSource: `{
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleConfirm = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      setOpen(false);
    };
    return <>
        <Button onClick={() => setOpen(true)}>Save Changes</Button>
        <ConfirmDialog isOpen={open} onClose={() => setOpen(false)} onConfirm={handleConfirm} title="Save Changes" description="Are you sure you want to save these changes?" confirmText="Save" cancelText="Cancel" isLoading={loading} />
      </>;
  }
}`,
      ...((T = (O = u.parameters) == null ? void 0 : O.docs) == null ? void 0 : T.source),
    },
  },
};
const X = ["Default", "Destructive", "Loading"];
export { l as Default, c as Destructive, u as Loading, X as __namedExportsOrder, W as default };
