"use client";
import { r as s, a as h } from "./index--tQcscZa.js";
import { j as m } from "./jsx-runtime-0-JxQnzY.js";
import { r as E } from "./index-pvjnvxJ7.js";
import { c as w } from "./index-CJkT59yQ.js";
function B(t, e, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (r) {
    if ((t == null || t(r), n === !1 || !r.defaultPrevented)) return e == null ? void 0 : e(r);
  };
}
function U(t, e) {
  const n = s.createContext(e),
    o = (u) => {
      const { children: c, ...i } = u,
        l = s.useMemo(() => i, Object.values(i));
      return m.jsx(n.Provider, { value: l, children: c });
    };
  o.displayName = t + "Provider";
  function r(u) {
    const c = s.useContext(n);
    if (c) return c;
    if (e !== void 0) return e;
    throw new Error(`\`${u}\` must be used within \`${t}\``);
  }
  return [o, r];
}
function k(t, e = []) {
  let n = [];
  function o(u, c) {
    const i = s.createContext(c),
      l = n.length;
    n = [...n, c];
    const f = (a) => {
      var C;
      const { scope: p, children: x, ...v } = a,
        S = ((C = p == null ? void 0 : p[t]) == null ? void 0 : C[l]) || i,
        P = s.useMemo(() => v, Object.values(v));
      return m.jsx(S.Provider, { value: P, children: x });
    };
    f.displayName = u + "Provider";
    function d(a, p) {
      var S;
      const x = ((S = p == null ? void 0 : p[t]) == null ? void 0 : S[l]) || i,
        v = s.useContext(x);
      if (v) return v;
      if (c !== void 0) return c;
      throw new Error(`\`${a}\` must be used within \`${u}\``);
    }
    return [f, d];
  }
  const r = () => {
    const u = n.map((c) => s.createContext(c));
    return function (i) {
      const l = (i == null ? void 0 : i[t]) || u;
      return s.useMemo(() => ({ [`__scope${t}`]: { ...i, [t]: l } }), [i, l]);
    };
  };
  return ((r.scopeName = t), [o, $(r, ...e)]);
}
function $(...t) {
  const e = t[0];
  if (t.length === 1) return e;
  const n = () => {
    const o = t.map((r) => ({ useScope: r(), scopeName: r.scopeName }));
    return function (u) {
      const c = o.reduce((i, { useScope: l, scopeName: f }) => {
        const a = l(u)[`__scope${f}`];
        return { ...i, ...a };
      }, {});
      return s.useMemo(() => ({ [`__scope${e.scopeName}`]: c }), [c]);
    };
  };
  return ((n.scopeName = e.scopeName), n);
}
function g(t) {
  const e = R(t),
    n = s.forwardRef((o, r) => {
      const { children: u, ...c } = o,
        i = s.Children.toArray(u),
        l = i.find(j);
      if (l) {
        const f = l.props.children,
          d = i.map((a) =>
            a === l
              ? s.Children.count(f) > 1
                ? s.Children.only(null)
                : s.isValidElement(f)
                  ? f.props.children
                  : null
              : a,
          );
        return m.jsx(e, {
          ...c,
          ref: r,
          children: s.isValidElement(f) ? s.cloneElement(f, void 0, d) : null,
        });
      }
      return m.jsx(e, { ...c, ref: r, children: u });
    });
  return ((n.displayName = `${t}.Slot`), n);
}
function R(t) {
  const e = s.forwardRef((n, o) => {
    const { children: r, ...u } = n;
    if (s.isValidElement(r)) {
      const c = I(r),
        i = _(u, r.props);
      return (r.type !== s.Fragment && (i.ref = o ? w(o, c) : c), s.cloneElement(r, i));
    }
    return s.Children.count(r) > 1 ? s.Children.only(null) : null;
  });
  return ((e.displayName = `${t}.SlotClone`), e);
}
var y = Symbol("radix.slottable");
function Z(t) {
  const e = ({ children: n }) => m.jsx(m.Fragment, { children: n });
  return ((e.displayName = `${t}.Slottable`), (e.__radixId = y), e);
}
function j(t) {
  return (
    s.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === y
  );
}
function _(t, e) {
  const n = { ...e };
  for (const o in e) {
    const r = t[o],
      u = e[o];
    /^on[A-Z]/.test(o)
      ? r && u
        ? (n[o] = (...i) => {
            const l = u(...i);
            return (r(...i), l);
          })
        : r && (n[o] = r)
      : o === "style"
        ? (n[o] = { ...r, ...u })
        : o === "className" && (n[o] = [r, u].filter(Boolean).join(" "));
  }
  return { ...t, ...n };
}
function I(t) {
  var o, r;
  let e = (o = Object.getOwnPropertyDescriptor(t.props, "ref")) == null ? void 0 : o.get,
    n = e && "isReactWarning" in e && e.isReactWarning;
  return n
    ? t.ref
    : ((e = (r = Object.getOwnPropertyDescriptor(t, "ref")) == null ? void 0 : r.get),
      (n = e && "isReactWarning" in e && e.isReactWarning),
      n ? t.props.ref : t.props.ref || t.ref);
}
var N = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  q = N.reduce((t, e) => {
    const n = g(`Primitive.${e}`),
      o = s.forwardRef((r, u) => {
        const { asChild: c, ...i } = r,
          l = c ? n : e;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          m.jsx(l, { ...i, ref: u })
        );
      });
    return ((o.displayName = `Primitive.${e}`), { ...t, [e]: o });
  }, {});
function z(t, e) {
  t && E.flushSync(() => t.dispatchEvent(e));
}
function G(t) {
  const e = s.useRef(t);
  return (
    s.useEffect(() => {
      e.current = t;
    }),
    s.useMemo(
      () =>
        (...n) => {
          var o;
          return (o = e.current) == null ? void 0 : o.call(e, ...n);
        },
      [],
    )
  );
}
var b = globalThis != null && globalThis.document ? s.useLayoutEffect : () => {},
  O = h[" useId ".trim().toString()] || (() => {}),
  D = 0;
function J(t) {
  const [e, n] = s.useState(O());
  return (
    b(() => {
      n((o) => o ?? String(D++));
    }, [t]),
    t || (e ? `radix-${e}` : "")
  );
}
var V = h[" useInsertionEffect ".trim().toString()] || b;
function K({ prop: t, defaultProp: e, onChange: n = () => {}, caller: o }) {
  const [r, u, c] = M({ defaultProp: e, onChange: n }),
    i = t !== void 0,
    l = i ? t : r;
  {
    const d = s.useRef(t !== void 0);
    s.useEffect(() => {
      const a = d.current;
      (a !== i &&
        console.warn(
          `${o} is changing from ${a ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (d.current = i));
    }, [i, o]);
  }
  const f = s.useCallback(
    (d) => {
      var a;
      if (i) {
        const p = W(d) ? d(t) : d;
        p !== t && ((a = c.current) == null || a.call(c, p));
      } else u(d);
    },
    [i, t, u, c],
  );
  return [l, f];
}
function M({ defaultProp: t, onChange: e }) {
  const [n, o] = s.useState(t),
    r = s.useRef(n),
    u = s.useRef(e);
  return (
    V(() => {
      u.current = e;
    }, [e]),
    s.useEffect(() => {
      var c;
      r.current !== n && ((c = u.current) == null || c.call(u, n), (r.current = n));
    }, [n, r]),
    [n, o, u]
  );
}
function W(t) {
  return typeof t == "function";
}
export { q as P, B as a, K as b, k as c, G as d, g as e, U as f, b as g, z as h, Z as i, J as u };
