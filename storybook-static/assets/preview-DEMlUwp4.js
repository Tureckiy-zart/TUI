"use client";
import { j as h } from "./jsx-runtime-0-JxQnzY.js";
import { R as t } from "./index--tQcscZa.js";
import { g as x, a as f, p as T, b as k, c as P } from "./applyMode-COjYIPpz.js";
import "./iframe-BlBaxeUy.js";
const w = t.createContext(void 0);
function p({
  children: n,
  defaultMode: l = "day",
  defaultTheme: m = "default",
  storageKey: r = "tm_mode",
  themeStorageKey: o = "tm_theme",
  attribute: E = "data-mode",
  enableSystem: c = !0,
}) {
  const [d, v] = t.useState(() => {
      if (typeof window > "u") return l;
      const a = document.documentElement.getAttribute(E);
      if (a === "day" || a === "night") return a;
      try {
        const u = localStorage.getItem(r);
        if (u === "day" || u === "night") return u;
      } catch {}
      return c && typeof window < "u"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "night"
          : "day"
        : l;
    }),
    [i, g] = t.useState(() => (typeof window > "u" ? m : x(m, o))),
    s = t.useCallback(
      (e) => {
        (v(e), f(e, i), T(e, r));
      },
      [i, r],
    ),
    y = t.useCallback(
      async (e) => {
        (g(e), await f(d, e), k(e, o));
      },
      [d, o],
    ),
    _ = t.useCallback(() => {
      s(d === "night" ? "day" : "night");
    }, [d, s]);
  (t.useEffect(() => {
    const e = P(l, r, c),
      a = x(m, o);
    (v(e), g(a), f(e, a), T(e, r), k(a, o));
  }, [l, m, r, o, c]),
    t.useEffect(() => {
      if (!c) return;
      const e = window.matchMedia("(prefers-color-scheme: dark)"),
        a = (u) => {
          try {
            localStorage.getItem(r) || s(u.matches ? "night" : "day");
          } catch {}
        };
      return (e.addEventListener("change", a), () => e.removeEventListener("change", a));
    }, [c, r, s]),
    t.useEffect(() => {
      f(d, i);
    }, [d, i]));
  const M = t.useMemo(
    () => ({ mode: d, theme: i, setMode: s, setTheme: y, toggleMode: _ }),
    [d, i, s, y, _],
  );
  return h.jsx(w.Provider, { value: M, children: n });
}
function b() {
  const n = t.useContext(w);
  if (n === void 0) throw new Error("useTheme must be used within a ThemeProvider");
  return n;
}
try {
  ((p.displayName = "ThemeProvider"),
    (p.__docgenInfo = {
      description: `Theme Provider

Provides theme context and manages theme mode (day/night) and theme overrides (default/dark/brand).
Uses tokens for all theme values and persists mode and theme in localStorage.`,
      displayName: "ThemeProvider",
      props: {
        defaultMode: {
          defaultValue: { value: "day" },
          description: "",
          name: "defaultMode",
          required: !1,
          type: {
            name: "enum",
            value: [{ value: "undefined" }, { value: '"day"' }, { value: '"night"' }],
          },
        },
        defaultTheme: {
          defaultValue: { value: "default" },
          description: "",
          name: "defaultTheme",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"default"' },
              { value: '"dark"' },
              { value: '"brand"' },
            ],
          },
        },
        storageKey: {
          defaultValue: { value: "tm_mode" },
          description: "",
          name: "storageKey",
          required: !1,
          type: { name: "string | undefined" },
        },
        themeStorageKey: {
          defaultValue: { value: "tm_theme" },
          description: "",
          name: "themeStorageKey",
          required: !1,
          type: { name: "string | undefined" },
        },
        attribute: {
          defaultValue: { value: "data-mode" },
          description: "",
          name: "attribute",
          required: !1,
          type: { name: "string | undefined" },
        },
        enableSystem: {
          defaultValue: { value: "true" },
          description: "",
          name: "enableSystem",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((b.displayName = "useTheme"),
    (b.__docgenInfo = {
      description: `useTheme Hook

Provides access to theme context and theme control functions.`,
      displayName: "useTheme",
      props: {},
    }));
} catch {}
const D = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0a0a0a" },
      ],
    },
  },
  decorators: [
    (n) =>
      h.jsx(p, {
        defaultMode: "day",
        children: h.jsx("div", { style: { padding: "2rem" }, children: h.jsx(n, {}) }),
      }),
  ],
};
export { D as default };
