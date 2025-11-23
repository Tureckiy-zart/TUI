"use client";
import { _ as F } from "./iframe-BlBaxeUy.js";
const I = {
  default: () =>
    F(() => import("./default-CgikHFjS.js"), [], import.meta.url).then((t) => t.defaultTheme),
  dark: () => F(() => import("./dark-7Vhq3hYP.js"), [], import.meta.url).then((t) => t.darkTheme),
  brand: () =>
    F(() => import("./brand-D0YagRNU.js"), [], import.meta.url).then((t) => t.brandTheme),
};
async function $(t) {
  const e = I[t];
  if (!e) throw new Error(`Theme "${t}" not found`);
  return await e();
}
const y = {
    50: "210 40% 98%",
    100: "210 40% 96%",
    200: "217 32.6% 17.5%",
    300: "216 28% 26%",
    400: "215 25% 27%",
    500: "215 20% 35%",
    600: "215 16% 47%",
    700: "216 12% 54%",
    800: "217 10% 62%",
    900: "222 47.4% 11.2%",
    950: "222 84% 4.9%",
  },
  c = {
    50: "280 100% 98%",
    100: "280 65% 96%",
    200: "280 60% 85%",
    300: "280 55% 75%",
    400: "280 50% 65%",
    500: "280 70% 67%",
    600: "259 65% 58%",
    700: "259 60% 50%",
    800: "259 55% 45%",
    900: "259 50% 40%",
    950: "259 45% 30%",
  },
  d = {
    50: "173 100% 98%",
    100: "173 100% 95%",
    200: "173 100% 85%",
    300: "173 100% 70%",
    400: "173 100% 55%",
    500: "173 100% 37%",
    600: "173 100% 32%",
    700: "173 95% 27%",
    800: "173 90% 22%",
    900: "173 85% 17%",
    950: "173 80% 12%",
  },
  m = {
    day: {
      base: "0 0% 100%",
      elevated1: "0 0% 98%",
      elevated2: "0 0% 96%",
      elevated3: "0 0% 94%",
      overlay: "0 0% 0% / 0.5",
      glass: "0 0% 100% / 0.8",
    },
    night: {
      base: "240 10% 3.9%",
      elevated1: "240 10% 5.1%",
      elevated2: "240 10% 6.3%",
      elevated3: "240 10% 7.5%",
      overlay: "0 0% 0% / 0.7",
      glass: "240 10% 10% / 0.9",
    },
  },
  a = {
    day: {
      success: "142 76% 36%",
      successForeground: "0 0% 100%",
      error: "0 84.2% 60.2%",
      errorForeground: "0 0% 98%",
      warning: "38 92% 50%",
      warningForeground: "0 0% 9%",
      info: "199 89% 48%",
      infoForeground: "0 0% 100%",
    },
    night: {
      success: "142 70% 45%",
      successForeground: "0 0% 100%",
      error: "0 62.8% 30.6%",
      errorForeground: "0 0% 98%",
      warning: "38 92% 60%",
      warningForeground: "0 0% 9%",
      info: "199 89% 55%",
      infoForeground: "0 0% 100%",
    },
  },
  g = {
    day: {
      primary: "0 0% 9%",
      secondary: "0 0% 45%",
      tertiary: "0 0% 65%",
      muted: "0 0% 45.1%",
      inverse: "0 0% 100%",
    },
    night: {
      primary: "0 0% 89.8%",
      secondary: "240 5% 64.9%",
      tertiary: "240 5% 50%",
      muted: "240 5% 64.9%",
      inverse: "0 0% 9%",
    },
  },
  b = {
    day: {
      background: "0 0% 100%",
      foreground: "0 0% 9%",
      card: "0 0% 100%",
      cardForeground: "0 0% 9%",
      popover: "0 0% 100%",
      popoverForeground: "0 0% 9%",
      border: "0 0% 89.8%",
      input: "0 0% 89.8%",
      ring: "0 0% 3.9%",
    },
    night: {
      background: "240 10% 3.9%",
      foreground: "0 0% 89.8%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 89.8%",
      popover: "240 10% 5.1%",
      popoverForeground: "0 0% 89.8%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
    },
  };
(({ ...b.day, destructive: `${a.day.error}`, destructiveForeground: a.day.errorForeground }),
  { ...b.night, destructive: `${a.night.error}`, destructiveForeground: a.night.errorForeground });
(y[50],
  y[100],
  y[200],
  y[300],
  y[400],
  y[500],
  y[600],
  y[700],
  y[800],
  y[900],
  y[950],
  c[50],
  c[100],
  c[200],
  c[300],
  c[400],
  c[500],
  c[600],
  c[700],
  c[800],
  c[900],
  c[950],
  d[50],
  d[100],
  d[200],
  d[300],
  d[400],
  d[500],
  d[600],
  d[700],
  d[800],
  d[900],
  d[950],
  m.day.base,
  m.day.elevated1,
  m.day.elevated2,
  m.day.elevated3,
  m.day.overlay,
  m.day.glass,
  a.day.success,
  a.day.successForeground,
  a.day.error,
  a.day.errorForeground,
  a.day.warning,
  a.day.warningForeground,
  a.day.info,
  a.day.infoForeground,
  g.day.primary,
  g.day.secondary,
  g.day.tertiary,
  g.day.muted,
  g.day.inverse);
const k = "data-mode",
  _ = "data-theme-name",
  x = "data-theme",
  T = "dark";
function L(t = "day", e = "tm_mode", n = !0) {
  if (typeof window > "u") return t;
  const r = document.documentElement,
    o = r.getAttribute(k);
  if (o === "day" || o === "night") return o;
  const s = r.getAttribute(x);
  if (s === "day" || s === "night") return s;
  try {
    const i = localStorage.getItem(e);
    if (i === "day" || i === "night") return i;
    const f = localStorage.getItem("theme");
    if (f === "dark") return "night";
    if (f === "light") return "day";
  } catch {}
  return n && typeof window < "u"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "night"
      : "day"
    : t;
}
let C = null;
async function S(t) {
  if (t === "default") return ((C = null), null);
  try {
    const e = await $(t);
    return ((C = e), e);
  } catch (e) {
    return (console.warn(`Failed to load theme "${t}":`, e), (C = null), null);
  }
}
function v(t, e) {
  return e ? { ...t, ...e } : t;
}
function p(t, e) {
  return e ? { ...t, ...e } : t;
}
function A(t) {
  const e = C,
    n = v(y, e == null ? void 0 : e.primaryColors),
    r = v(c, e == null ? void 0 : e.accentColors),
    o = v(d, e == null ? void 0 : e.secondaryColors),
    s = {
      day: p(b.day, e == null ? void 0 : e.baseColorsDay),
      night: p(b.night, e == null ? void 0 : e.baseColorsNight),
    },
    i = {
      day: p(m.day, e == null ? void 0 : e.surfaceColorsDay),
      night: p(m.night, e == null ? void 0 : e.surfaceColorsNight),
    },
    f = {
      day: p(a.day, e == null ? void 0 : e.semanticColorsDay),
      night: p(a.night, e == null ? void 0 : e.semanticColorsNight),
    },
    w = {
      day: p(g.day, e == null ? void 0 : e.textColorsDay),
      night: p(g.night, e == null ? void 0 : e.textColorsNight),
    };
  return {
    primaryColors: n,
    accentColors: r,
    secondaryColors: o,
    baseColors: s,
    surfaceColors: i,
    semanticColors: f,
    textColors: w,
  };
}
function M(t) {
  if (typeof document > "u") return;
  const e = document.documentElement,
    n = A(),
    {
      primaryColors: r,
      accentColors: o,
      secondaryColors: s,
      baseColors: i,
      surfaceColors: f,
      semanticColors: w,
      textColors: D,
    } = n,
    l = i[t];
  (e.style.setProperty("--background", l.background),
    e.style.setProperty("--foreground", l.foreground),
    e.style.setProperty("--card", l.card),
    e.style.setProperty("--card-foreground", l.cardForeground),
    e.style.setProperty("--popover", l.popover),
    e.style.setProperty("--popover-foreground", l.popoverForeground),
    e.style.setProperty("--border", l.border),
    e.style.setProperty("--input", l.input),
    e.style.setProperty("--ring", l.ring));
  const P = f[t];
  (e.style.setProperty("--surface-base", P.base),
    e.style.setProperty("--surface-elevated1", P.elevated1),
    e.style.setProperty("--surface-elevated2", P.elevated2),
    e.style.setProperty("--surface-elevated3", P.elevated3),
    e.style.setProperty("--surface-overlay", P.overlay),
    e.style.setProperty("--surface-glass", P.glass));
  const u = w[t];
  (e.style.setProperty("--semantic-success", u.success),
    e.style.setProperty("--semantic-success-foreground", u.successForeground),
    e.style.setProperty("--semantic-error", u.error),
    e.style.setProperty("--semantic-error-foreground", u.errorForeground),
    e.style.setProperty("--semantic-warning", u.warning),
    e.style.setProperty("--semantic-warning-foreground", u.warningForeground),
    e.style.setProperty("--semantic-info", u.info),
    e.style.setProperty("--semantic-info-foreground", u.infoForeground));
  const h = D[t];
  (e.style.setProperty("--text-primary", h.primary),
    e.style.setProperty("--text-secondary", h.secondary),
    e.style.setProperty("--text-tertiary", h.tertiary),
    e.style.setProperty("--text-muted", h.muted),
    e.style.setProperty("--text-inverse", h.inverse),
    e.style.setProperty("--primary-50", r[50]),
    e.style.setProperty("--primary-100", r[100]),
    e.style.setProperty("--primary-200", r[200]),
    e.style.setProperty("--primary-300", r[300]),
    e.style.setProperty("--primary-400", r[400]),
    e.style.setProperty("--primary-500", r[500]),
    e.style.setProperty("--primary-600", r[600]),
    e.style.setProperty("--primary-700", r[700]),
    e.style.setProperty("--primary-800", r[800]),
    e.style.setProperty("--primary-900", r[900]),
    e.style.setProperty("--primary-950", r[950]),
    e.style.setProperty("--accent-50", o[50]),
    e.style.setProperty("--accent-100", o[100]),
    e.style.setProperty("--accent-200", o[200]),
    e.style.setProperty("--accent-300", o[300]),
    e.style.setProperty("--accent-400", o[400]),
    e.style.setProperty("--accent-500", o[500]),
    e.style.setProperty("--accent-600", o[600]),
    e.style.setProperty("--accent-700", o[700]),
    e.style.setProperty("--accent-800", o[800]),
    e.style.setProperty("--accent-900", o[900]),
    e.style.setProperty("--accent-950", o[950]),
    e.style.setProperty("--secondary-50", s[50]),
    e.style.setProperty("--secondary-100", s[100]),
    e.style.setProperty("--secondary-200", s[200]),
    e.style.setProperty("--secondary-300", s[300]),
    e.style.setProperty("--secondary-400", s[400]),
    e.style.setProperty("--secondary-500", s[500]),
    e.style.setProperty("--secondary-600", s[600]),
    e.style.setProperty("--secondary-700", s[700]),
    e.style.setProperty("--secondary-800", s[800]),
    e.style.setProperty("--secondary-900", s[900]),
    e.style.setProperty("--secondary-950", s[950]),
    t === "day"
      ? (e.style.setProperty("--tm-primary", s[500]),
        e.style.setProperty("--tm-primary-foreground", "0 0% 100%"),
        e.style.setProperty("--tm-secondary", "0 0% 95.7%"),
        e.style.setProperty("--tm-secondary-foreground", "0 0% 6.7%"),
        e.style.setProperty("--tm-accent", "0 0% 89.8%"),
        e.style.setProperty("--tm-accent-foreground", "0 0% 6.7%"))
      : (e.style.setProperty("--tm-primary", o[500]),
        e.style.setProperty("--tm-primary-foreground", "0 0% 100%"),
        e.style.setProperty("--tm-secondary", "240 10% 7%"),
        e.style.setProperty("--tm-secondary-foreground", "0 0% 89.8%"),
        e.style.setProperty("--tm-accent", "240 10% 10%"),
        e.style.setProperty("--tm-accent-foreground", "0 0% 89.8%")),
    e.style.setProperty("--muted", l.card),
    e.style.setProperty("--muted-foreground", l.cardForeground),
    e.style.setProperty("--destructive", u.error),
    e.style.setProperty("--destructive-foreground", u.errorForeground));
}
async function E(t, e = "default") {
  if (typeof document > "u") return;
  await S(e);
  const { documentElement: n, body: r } = document;
  (n.setAttribute(k, t),
    n.setAttribute(x, t),
    n.setAttribute(_, e),
    t === "night" ? n.classList.add(T) : n.classList.remove(T),
    M(t));
  const o = A(),
    { background: s, foreground: i } = o.baseColors[t];
  r &&
    ((r.dataset.mode = t),
    (r.dataset.theme = e),
    (r.style.backgroundColor = `hsl(${s})`),
    (r.style.color = `hsl(${i})`));
}
function R(t) {
  if (typeof document < "u") {
    const n = document.documentElement.getAttribute(_) || "default";
    E(t, n);
  } else E(t, "default");
}
function V(t = "default", e = "tm_theme") {
  if (typeof window > "u") return t;
  const r = document.documentElement.getAttribute(_);
  if (r === "default" || r === "dark" || r === "brand") return r;
  try {
    const o = localStorage.getItem(e);
    if (o === "default" || o === "dark" || o === "brand") return o;
  } catch {}
  return t;
}
function B(t, e = "tm_mode") {
  if (!(typeof window > "u"))
    try {
      (localStorage.setItem(e, t), localStorage.setItem("theme", t === "night" ? "dark" : "light"));
    } catch {}
}
function U(t, e = "tm_theme") {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(e, t);
    } catch {}
}
export { E as a, U as b, L as c, R as d, V as g, B as p };
