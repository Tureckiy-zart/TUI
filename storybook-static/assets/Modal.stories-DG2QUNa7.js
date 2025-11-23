"use client";
import { j as e } from "./jsx-runtime-0-JxQnzY.js";
import { r as d } from "./index--tQcscZa.js";
import { B as o } from "./Button-DSOQhk0m.js";
import { M as l, a as v, b as i, c, d as p, e as m, f as h } from "./Modal-OkEkQvKA.js";
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
const q = {
    title: "Modals/Modal",
    component: l,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
  },
  t = {
    render: () => {
      const [a, n] = d.useState(!1);
      return e.jsxs(l, {
        open: a,
        onOpenChange: n,
        children: [
          e.jsx(v, { asChild: !0, children: e.jsx(o, { children: "Open Modal" }) }),
          e.jsxs(i, {
            children: [
              e.jsxs(c, {
                children: [
                  e.jsx(p, { children: "Modal Title" }),
                  e.jsx(m, { children: "This is a description of what the modal does." }),
                ],
              }),
              e.jsx("div", {
                className: "py-md",
                children: e.jsx("p", { children: "Modal content goes here..." }),
              }),
              e.jsxs(h, {
                children: [
                  e.jsx(o, { variant: "outline", onClick: () => n(!1), children: "Cancel" }),
                  e.jsx(o, { onClick: () => n(!1), children: "Confirm" }),
                ],
              }),
            ],
          }),
        ],
      });
    },
  },
  s = {
    render: () => {
      const [a, n] = d.useState(!1);
      return e.jsxs(e.Fragment, {
        children: [
          e.jsx(o, { onClick: () => n(!0), children: "Open Modal" }),
          e.jsx(l, {
            open: a,
            onOpenChange: n,
            children: e.jsxs(i, {
              children: [
                e.jsxs(c, {
                  children: [
                    e.jsx(p, { children: "Controlled Modal" }),
                    e.jsx(m, { children: "This modal is controlled programmatically." }),
                  ],
                }),
                e.jsx("div", {
                  className: "py-md",
                  children: e.jsx("p", { children: "You can control this modal from outside." }),
                }),
                e.jsx(h, {
                  children: e.jsx(o, {
                    variant: "outline",
                    onClick: () => n(!1),
                    children: "Close",
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    },
  },
  r = {
    render: () => {
      const [a, n] = d.useState(!1);
      return e.jsxs(l, {
        open: a,
        onOpenChange: n,
        children: [
          e.jsx(v, { asChild: !0, children: e.jsx(o, { children: "Open Large Modal" }) }),
          e.jsxs(i, {
            className: "max-w-2xl",
            children: [
              e.jsxs(c, {
                children: [
                  e.jsx(p, { children: "Large Modal" }),
                  e.jsx(m, { children: "This is a larger modal with more content." }),
                ],
              }),
              e.jsxs("div", {
                className: "space-y-md py-md",
                children: [
                  e.jsx("p", { children: "This modal has more space for content." }),
                  e.jsx("p", {
                    children: "You can put forms, tables, or other complex content here.",
                  }),
                  e.jsxs("div", {
                    className: "rounded-md bg-muted p-md",
                    children: [
                      e.jsx("h4", {
                        className: "mb-sm font-semibold",
                        children: "Example Content",
                      }),
                      e.jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "This is an example of how you might structure content in a larger modal.",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs(h, {
                children: [
                  e.jsx(o, { variant: "outline", onClick: () => n(!1), children: "Cancel" }),
                  e.jsx(o, { onClick: () => n(!1), children: "Save Changes" }),
                ],
              }),
            ],
          }),
        ],
      });
    },
  };
var u, M, x;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((u = t.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  render: () => {
    const [open, setOpen] = useState(false);
    return <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>This is a description of what the modal does.</ModalDescription>
          </ModalHeader>
          <div className="py-md">
            <p>Modal content goes here...</p>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>;
  }
}`,
      ...((x = (M = t.parameters) == null ? void 0 : M.docs) == null ? void 0 : x.source),
    },
  },
};
var g, C, j;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((g = s.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Controlled Modal</ModalTitle>
              <ModalDescription>This modal is controlled programmatically.</ModalDescription>
            </ModalHeader>
            <div className="py-md">
              <p>You can control this modal from outside.</p>
            </div>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>;
  }
}`,
      ...((j = (C = s.parameters) == null ? void 0 : C.docs) == null ? void 0 : j.source),
    },
  },
};
var f, O, T;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((f = r.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  render: () => {
    const [open, setOpen] = useState(false);
    return <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Large Modal</Button>
        </ModalTrigger>
        <ModalContent className="max-w-2xl">
          <ModalHeader>
            <ModalTitle>Large Modal</ModalTitle>
            <ModalDescription>This is a larger modal with more content.</ModalDescription>
          </ModalHeader>
          <div className="space-y-md py-md">
            <p>This modal has more space for content.</p>
            <p>You can put forms, tables, or other complex content here.</p>
            <div className="rounded-md bg-muted p-md">
              <h4 className="mb-sm font-semibold">Example Content</h4>
              <p className="text-sm text-muted-foreground">
                This is an example of how you might structure content in a larger modal.
              </p>
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>;
  }
}`,
      ...((T = (O = r.parameters) == null ? void 0 : O.docs) == null ? void 0 : T.source),
    },
  },
};
const z = ["Default", "WithoutTrigger", "LargeModal"];
export {
  t as Default,
  r as LargeModal,
  s as WithoutTrigger,
  z as __namedExportsOrder,
  q as default,
};
