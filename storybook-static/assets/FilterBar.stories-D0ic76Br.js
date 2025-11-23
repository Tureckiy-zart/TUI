"use client";
import { j as o } from "./jsx-runtime-0-JxQnzY.js";
import { r as c } from "./index--tQcscZa.js";
import "./Badge-CmkUbG2V.js";
import { B as Ne } from "./Button-DSOQhk0m.js";
import { c as F } from "./utils-CyawMXzk.js";
import { c as Ve } from "./createLucideIcon-CD2Sj3SA.js";
import { r as Et } from "./index-pvjnvxJ7.js";
import {
  b as lt,
  c as Sr,
  u as ot,
  g as Z,
  P as $,
  a as O,
  d as _r,
  e as Cr,
} from "./index-jG1cqCvV.js";
import { u as Nr, c as Pr } from "./index-ghU8WpXh.js";
import { u as K } from "./index-CJkT59yQ.js";
import { D as Rr } from "./index-D8ovs0-6.js";
import { P as Mr, h as Dr, u as Lr, R as qr, F as Tr } from "./Combination-DplBdLRn.js";
import { c as Vt, R as Er, A as Vr, C as Ir, a as jr } from "./index-CrPJtfnE.js";
import { V as Or } from "./index-oCsW6GAK.js";
import { C as kr } from "./check-C5Q_mpzF.js";
import { L as Ye, I as Ue } from "./Label--LJZ7EMM.js";
import { X as Fr } from "./x-CU17JbhH.js";
import "./index-Dp35_cgR.js";
import "./index-DDxmA3Og.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ar = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
    ["path", { d: "M3 10h18", key: "8toen8" }],
  ],
  Br = Ve("Calendar", Ar);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wr = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  It = Ve("ChevronDown", Wr);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yr = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]],
  Hr = Ve("ChevronUp", Yr);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $r = [
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
    ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
  ],
  Ur = Ve("Search", $r);
function Q(e) {
  const t = Object.prototype.toString.call(e);
  return e instanceof Date || (typeof e == "object" && t === "[object Date]")
    ? new e.constructor(+e)
    : typeof e == "number" ||
        t === "[object Number]" ||
        typeof e == "string" ||
        t === "[object String]"
      ? new Date(e)
      : new Date(NaN);
}
function le(e, t) {
  return e instanceof Date ? new e.constructor(t) : new Date(t);
}
const jt = 6048e5,
  Gr = 864e5;
let Xr = {};
function Ie() {
  return Xr;
}
function be(e, t) {
  var l, u, m, f;
  const r = Ie(),
    n =
      (t == null ? void 0 : t.weekStartsOn) ??
      ((u = (l = t == null ? void 0 : t.locale) == null ? void 0 : l.options) == null
        ? void 0
        : u.weekStartsOn) ??
      r.weekStartsOn ??
      ((f = (m = r.locale) == null ? void 0 : m.options) == null ? void 0 : f.weekStartsOn) ??
      0,
    a = Q(e),
    i = a.getDay(),
    s = (i < n ? 7 : 0) + i - n;
  return (a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a);
}
function Pe(e) {
  return be(e, { weekStartsOn: 1 });
}
function Ot(e) {
  const t = Q(e),
    r = t.getFullYear(),
    n = le(e, 0);
  (n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0));
  const a = Pe(n),
    i = le(e, 0);
  (i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0));
  const s = Pe(i);
  return t.getTime() >= a.getTime() ? r + 1 : t.getTime() >= s.getTime() ? r : r - 1;
}
function ct(e) {
  const t = Q(e);
  return (t.setHours(0, 0, 0, 0), t);
}
function ut(e) {
  const t = Q(e),
    r = new Date(
      Date.UTC(
        t.getFullYear(),
        t.getMonth(),
        t.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds(),
      ),
    );
  return (r.setUTCFullYear(t.getFullYear()), +e - +r);
}
function Qr(e, t) {
  const r = ct(e),
    n = ct(t),
    a = +r - ut(r),
    i = +n - ut(n);
  return Math.round((a - i) / Gr);
}
function Kr(e) {
  const t = Ot(e),
    r = le(e, 0);
  return (r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), Pe(r));
}
function zr(e) {
  return (
    e instanceof Date ||
    (typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
  );
}
function Jr(e) {
  if (!zr(e) && typeof e != "number") return !1;
  const t = Q(e);
  return !isNaN(Number(t));
}
function Zr(e) {
  const t = Q(e),
    r = le(e, 0);
  return (r.setFullYear(t.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r);
}
const en = {
    lessThanXSeconds: { one: "less than a second", other: "less than {{count}} seconds" },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: { one: "less than a minute", other: "less than {{count}} minutes" },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  },
  tn = (e, t, r) => {
    let n;
    const a = en[e];
    return (
      typeof a == "string"
        ? (n = a)
        : t === 1
          ? (n = a.one)
          : (n = a.other.replace("{{count}}", t.toString())),
      r != null && r.addSuffix ? (r.comparison && r.comparison > 0 ? "in " + n : n + " ago") : n
    );
  };
function He(e) {
  return (t = {}) => {
    const r = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[r] || e.formats[e.defaultWidth];
  };
}
const rn = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy",
  },
  nn = { full: "h:mm:ss a zzzz", long: "h:mm:ss a z", medium: "h:mm:ss a", short: "h:mm a" },
  an = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}",
  },
  on = {
    date: He({ formats: rn, defaultWidth: "full" }),
    time: He({ formats: nn, defaultWidth: "full" }),
    dateTime: He({ formats: an, defaultWidth: "full" }),
  },
  sn = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P",
  },
  ln = (e, t, r, n) => sn[e];
function ge(e) {
  return (t, r) => {
    const n = r != null && r.context ? String(r.context) : "standalone";
    let a;
    if (n === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth,
        l = r != null && r.width ? String(r.width) : s;
      a = e.formattingValues[l] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth,
        l = r != null && r.width ? String(r.width) : e.defaultWidth;
      a = e.values[l] || e.values[s];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[i];
  };
}
const cn = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  un = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
  },
  dn = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  mn = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  pn = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
  },
  fn = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
  },
  hn = (e, t) => {
    const r = Number(e),
      n = r % 100;
    if (n > 20 || n < 10)
      switch (n % 10) {
        case 1:
          return r + "st";
        case 2:
          return r + "nd";
        case 3:
          return r + "rd";
      }
    return r + "th";
  },
  gn = {
    ordinalNumber: hn,
    era: ge({ values: cn, defaultWidth: "wide" }),
    quarter: ge({ values: un, defaultWidth: "wide", argumentCallback: (e) => e - 1 }),
    month: ge({ values: dn, defaultWidth: "wide" }),
    day: ge({ values: mn, defaultWidth: "wide" }),
    dayPeriod: ge({
      values: pn,
      defaultWidth: "wide",
      formattingValues: fn,
      defaultFormattingWidth: "wide",
    }),
  };
function ye(e) {
  return (t, r = {}) => {
    const n = r.width,
      a = (n && e.matchPatterns[n]) || e.matchPatterns[e.defaultMatchWidth],
      i = t.match(a);
    if (!i) return null;
    const s = i[0],
      l = (n && e.parsePatterns[n]) || e.parsePatterns[e.defaultParseWidth],
      u = Array.isArray(l) ? wn(l, (w) => w.test(s)) : yn(l, (w) => w.test(s));
    let m;
    ((m = e.valueCallback ? e.valueCallback(u) : u),
      (m = r.valueCallback ? r.valueCallback(m) : m));
    const f = t.slice(s.length);
    return { value: m, rest: f };
  };
}
function yn(e, t) {
  for (const r in e) if (Object.prototype.hasOwnProperty.call(e, r) && t(e[r])) return r;
}
function wn(e, t) {
  for (let r = 0; r < e.length; r++) if (t(e[r])) return r;
}
function bn(e) {
  return (t, r = {}) => {
    const n = t.match(e.matchPattern);
    if (!n) return null;
    const a = n[0],
      i = t.match(e.parsePattern);
    if (!i) return null;
    let s = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    s = r.valueCallback ? r.valueCallback(s) : s;
    const l = t.slice(a.length);
    return { value: s, rest: l };
  };
}
const xn = /^(\d+)(th|st|nd|rd)?/i,
  vn = /\d+/i,
  Sn = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  _n = { any: [/^b/i, /^(a|c)/i] },
  Cn = { narrow: /^[1234]/i, abbreviated: /^q[1234]/i, wide: /^[1234](th|st|nd|rd)? quarter/i },
  Nn = { any: [/1/i, /2/i, /3/i, /4/i] },
  Pn = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  Rn = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  Mn = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  Dn = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  Ln = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  qn = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  Tn = {
    ordinalNumber: bn({
      matchPattern: xn,
      parsePattern: vn,
      valueCallback: (e) => parseInt(e, 10),
    }),
    era: ye({
      matchPatterns: Sn,
      defaultMatchWidth: "wide",
      parsePatterns: _n,
      defaultParseWidth: "any",
    }),
    quarter: ye({
      matchPatterns: Cn,
      defaultMatchWidth: "wide",
      parsePatterns: Nn,
      defaultParseWidth: "any",
      valueCallback: (e) => e + 1,
    }),
    month: ye({
      matchPatterns: Pn,
      defaultMatchWidth: "wide",
      parsePatterns: Rn,
      defaultParseWidth: "any",
    }),
    day: ye({
      matchPatterns: Mn,
      defaultMatchWidth: "wide",
      parsePatterns: Dn,
      defaultParseWidth: "any",
    }),
    dayPeriod: ye({
      matchPatterns: Ln,
      defaultMatchWidth: "any",
      parsePatterns: qn,
      defaultParseWidth: "any",
    }),
  },
  En = {
    code: "en-US",
    formatDistance: tn,
    formatLong: on,
    formatRelative: ln,
    localize: gn,
    match: Tn,
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
function Vn(e) {
  const t = Q(e);
  return Qr(t, Zr(t)) + 1;
}
function In(e) {
  const t = Q(e),
    r = +Pe(t) - +Kr(t);
  return Math.round(r / jt) + 1;
}
function kt(e, t) {
  var f, w, v, g;
  const r = Q(e),
    n = r.getFullYear(),
    a = Ie(),
    i =
      (t == null ? void 0 : t.firstWeekContainsDate) ??
      ((w = (f = t == null ? void 0 : t.locale) == null ? void 0 : f.options) == null
        ? void 0
        : w.firstWeekContainsDate) ??
      a.firstWeekContainsDate ??
      ((g = (v = a.locale) == null ? void 0 : v.options) == null
        ? void 0
        : g.firstWeekContainsDate) ??
      1,
    s = le(e, 0);
  (s.setFullYear(n + 1, 0, i), s.setHours(0, 0, 0, 0));
  const l = be(s, t),
    u = le(e, 0);
  (u.setFullYear(n, 0, i), u.setHours(0, 0, 0, 0));
  const m = be(u, t);
  return r.getTime() >= l.getTime() ? n + 1 : r.getTime() >= m.getTime() ? n : n - 1;
}
function jn(e, t) {
  var l, u, m, f;
  const r = Ie(),
    n =
      (t == null ? void 0 : t.firstWeekContainsDate) ??
      ((u = (l = t == null ? void 0 : t.locale) == null ? void 0 : l.options) == null
        ? void 0
        : u.firstWeekContainsDate) ??
      r.firstWeekContainsDate ??
      ((f = (m = r.locale) == null ? void 0 : m.options) == null
        ? void 0
        : f.firstWeekContainsDate) ??
      1,
    a = kt(e, t),
    i = le(e, 0);
  return (i.setFullYear(a, 0, n), i.setHours(0, 0, 0, 0), be(i, t));
}
function On(e, t) {
  const r = Q(e),
    n = +be(r, t) - +jn(r, t);
  return Math.round(n / jt) + 1;
}
function N(e, t) {
  const r = e < 0 ? "-" : "",
    n = Math.abs(e).toString().padStart(t, "0");
  return r + n;
}
const J = {
    y(e, t) {
      const r = e.getFullYear(),
        n = r > 0 ? r : 1 - r;
      return N(t === "yy" ? n % 100 : n, t.length);
    },
    M(e, t) {
      const r = e.getMonth();
      return t === "M" ? String(r + 1) : N(r + 1, 2);
    },
    d(e, t) {
      return N(e.getDate(), t.length);
    },
    a(e, t) {
      const r = e.getHours() / 12 >= 1 ? "pm" : "am";
      switch (t) {
        case "a":
        case "aa":
          return r.toUpperCase();
        case "aaa":
          return r;
        case "aaaaa":
          return r[0];
        case "aaaa":
        default:
          return r === "am" ? "a.m." : "p.m.";
      }
    },
    h(e, t) {
      return N(e.getHours() % 12 || 12, t.length);
    },
    H(e, t) {
      return N(e.getHours(), t.length);
    },
    m(e, t) {
      return N(e.getMinutes(), t.length);
    },
    s(e, t) {
      return N(e.getSeconds(), t.length);
    },
    S(e, t) {
      const r = t.length,
        n = e.getMilliseconds(),
        a = Math.trunc(n * Math.pow(10, r - 3));
      return N(a, t.length);
    },
  },
  me = {
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  dt = {
    G: function (e, t, r) {
      const n = e.getFullYear() > 0 ? 1 : 0;
      switch (t) {
        case "G":
        case "GG":
        case "GGG":
          return r.era(n, { width: "abbreviated" });
        case "GGGGG":
          return r.era(n, { width: "narrow" });
        case "GGGG":
        default:
          return r.era(n, { width: "wide" });
      }
    },
    y: function (e, t, r) {
      if (t === "yo") {
        const n = e.getFullYear(),
          a = n > 0 ? n : 1 - n;
        return r.ordinalNumber(a, { unit: "year" });
      }
      return J.y(e, t);
    },
    Y: function (e, t, r, n) {
      const a = kt(e, n),
        i = a > 0 ? a : 1 - a;
      if (t === "YY") {
        const s = i % 100;
        return N(s, 2);
      }
      return t === "Yo" ? r.ordinalNumber(i, { unit: "year" }) : N(i, t.length);
    },
    R: function (e, t) {
      const r = Ot(e);
      return N(r, t.length);
    },
    u: function (e, t) {
      const r = e.getFullYear();
      return N(r, t.length);
    },
    Q: function (e, t, r) {
      const n = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case "Q":
          return String(n);
        case "QQ":
          return N(n, 2);
        case "Qo":
          return r.ordinalNumber(n, { unit: "quarter" });
        case "QQQ":
          return r.quarter(n, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return r.quarter(n, { width: "narrow", context: "formatting" });
        case "QQQQ":
        default:
          return r.quarter(n, { width: "wide", context: "formatting" });
      }
    },
    q: function (e, t, r) {
      const n = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case "q":
          return String(n);
        case "qq":
          return N(n, 2);
        case "qo":
          return r.ordinalNumber(n, { unit: "quarter" });
        case "qqq":
          return r.quarter(n, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return r.quarter(n, { width: "narrow", context: "standalone" });
        case "qqqq":
        default:
          return r.quarter(n, { width: "wide", context: "standalone" });
      }
    },
    M: function (e, t, r) {
      const n = e.getMonth();
      switch (t) {
        case "M":
        case "MM":
          return J.M(e, t);
        case "Mo":
          return r.ordinalNumber(n + 1, { unit: "month" });
        case "MMM":
          return r.month(n, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return r.month(n, { width: "narrow", context: "formatting" });
        case "MMMM":
        default:
          return r.month(n, { width: "wide", context: "formatting" });
      }
    },
    L: function (e, t, r) {
      const n = e.getMonth();
      switch (t) {
        case "L":
          return String(n + 1);
        case "LL":
          return N(n + 1, 2);
        case "Lo":
          return r.ordinalNumber(n + 1, { unit: "month" });
        case "LLL":
          return r.month(n, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return r.month(n, { width: "narrow", context: "standalone" });
        case "LLLL":
        default:
          return r.month(n, { width: "wide", context: "standalone" });
      }
    },
    w: function (e, t, r, n) {
      const a = On(e, n);
      return t === "wo" ? r.ordinalNumber(a, { unit: "week" }) : N(a, t.length);
    },
    I: function (e, t, r) {
      const n = In(e);
      return t === "Io" ? r.ordinalNumber(n, { unit: "week" }) : N(n, t.length);
    },
    d: function (e, t, r) {
      return t === "do" ? r.ordinalNumber(e.getDate(), { unit: "date" }) : J.d(e, t);
    },
    D: function (e, t, r) {
      const n = Vn(e);
      return t === "Do" ? r.ordinalNumber(n, { unit: "dayOfYear" }) : N(n, t.length);
    },
    E: function (e, t, r) {
      const n = e.getDay();
      switch (t) {
        case "E":
        case "EE":
        case "EEE":
          return r.day(n, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return r.day(n, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return r.day(n, { width: "short", context: "formatting" });
        case "EEEE":
        default:
          return r.day(n, { width: "wide", context: "formatting" });
      }
    },
    e: function (e, t, r, n) {
      const a = e.getDay(),
        i = (a - n.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "e":
          return String(i);
        case "ee":
          return N(i, 2);
        case "eo":
          return r.ordinalNumber(i, { unit: "day" });
        case "eee":
          return r.day(a, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return r.day(a, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return r.day(a, { width: "short", context: "formatting" });
        case "eeee":
        default:
          return r.day(a, { width: "wide", context: "formatting" });
      }
    },
    c: function (e, t, r, n) {
      const a = e.getDay(),
        i = (a - n.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "c":
          return String(i);
        case "cc":
          return N(i, t.length);
        case "co":
          return r.ordinalNumber(i, { unit: "day" });
        case "ccc":
          return r.day(a, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return r.day(a, { width: "narrow", context: "standalone" });
        case "cccccc":
          return r.day(a, { width: "short", context: "standalone" });
        case "cccc":
        default:
          return r.day(a, { width: "wide", context: "standalone" });
      }
    },
    i: function (e, t, r) {
      const n = e.getDay(),
        a = n === 0 ? 7 : n;
      switch (t) {
        case "i":
          return String(a);
        case "ii":
          return N(a, t.length);
        case "io":
          return r.ordinalNumber(a, { unit: "day" });
        case "iii":
          return r.day(n, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return r.day(n, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return r.day(n, { width: "short", context: "formatting" });
        case "iiii":
        default:
          return r.day(n, { width: "wide", context: "formatting" });
      }
    },
    a: function (e, t, r) {
      const a = e.getHours() / 12 >= 1 ? "pm" : "am";
      switch (t) {
        case "a":
        case "aa":
          return r.dayPeriod(a, { width: "abbreviated", context: "formatting" });
        case "aaa":
          return r.dayPeriod(a, { width: "abbreviated", context: "formatting" }).toLowerCase();
        case "aaaaa":
          return r.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "aaaa":
        default:
          return r.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    b: function (e, t, r) {
      const n = e.getHours();
      let a;
      switch (
        (n === 12 ? (a = me.noon) : n === 0 ? (a = me.midnight) : (a = n / 12 >= 1 ? "pm" : "am"),
        t)
      ) {
        case "b":
        case "bb":
          return r.dayPeriod(a, { width: "abbreviated", context: "formatting" });
        case "bbb":
          return r.dayPeriod(a, { width: "abbreviated", context: "formatting" }).toLowerCase();
        case "bbbbb":
          return r.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "bbbb":
        default:
          return r.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    B: function (e, t, r) {
      const n = e.getHours();
      let a;
      switch (
        (n >= 17
          ? (a = me.evening)
          : n >= 12
            ? (a = me.afternoon)
            : n >= 4
              ? (a = me.morning)
              : (a = me.night),
        t)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return r.dayPeriod(a, { width: "abbreviated", context: "formatting" });
        case "BBBBB":
          return r.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "BBBB":
        default:
          return r.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    h: function (e, t, r) {
      if (t === "ho") {
        let n = e.getHours() % 12;
        return (n === 0 && (n = 12), r.ordinalNumber(n, { unit: "hour" }));
      }
      return J.h(e, t);
    },
    H: function (e, t, r) {
      return t === "Ho" ? r.ordinalNumber(e.getHours(), { unit: "hour" }) : J.H(e, t);
    },
    K: function (e, t, r) {
      const n = e.getHours() % 12;
      return t === "Ko" ? r.ordinalNumber(n, { unit: "hour" }) : N(n, t.length);
    },
    k: function (e, t, r) {
      let n = e.getHours();
      return (
        n === 0 && (n = 24),
        t === "ko" ? r.ordinalNumber(n, { unit: "hour" }) : N(n, t.length)
      );
    },
    m: function (e, t, r) {
      return t === "mo" ? r.ordinalNumber(e.getMinutes(), { unit: "minute" }) : J.m(e, t);
    },
    s: function (e, t, r) {
      return t === "so" ? r.ordinalNumber(e.getSeconds(), { unit: "second" }) : J.s(e, t);
    },
    S: function (e, t) {
      return J.S(e, t);
    },
    X: function (e, t, r) {
      const n = e.getTimezoneOffset();
      if (n === 0) return "Z";
      switch (t) {
        case "X":
          return pt(n);
        case "XXXX":
        case "XX":
          return se(n);
        case "XXXXX":
        case "XXX":
        default:
          return se(n, ":");
      }
    },
    x: function (e, t, r) {
      const n = e.getTimezoneOffset();
      switch (t) {
        case "x":
          return pt(n);
        case "xxxx":
        case "xx":
          return se(n);
        case "xxxxx":
        case "xxx":
        default:
          return se(n, ":");
      }
    },
    O: function (e, t, r) {
      const n = e.getTimezoneOffset();
      switch (t) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + mt(n, ":");
        case "OOOO":
        default:
          return "GMT" + se(n, ":");
      }
    },
    z: function (e, t, r) {
      const n = e.getTimezoneOffset();
      switch (t) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + mt(n, ":");
        case "zzzz":
        default:
          return "GMT" + se(n, ":");
      }
    },
    t: function (e, t, r) {
      const n = Math.trunc(e.getTime() / 1e3);
      return N(n, t.length);
    },
    T: function (e, t, r) {
      const n = e.getTime();
      return N(n, t.length);
    },
  };
function mt(e, t = "") {
  const r = e > 0 ? "-" : "+",
    n = Math.abs(e),
    a = Math.trunc(n / 60),
    i = n % 60;
  return i === 0 ? r + String(a) : r + String(a) + t + N(i, 2);
}
function pt(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + N(Math.abs(e) / 60, 2) : se(e, t);
}
function se(e, t = "") {
  const r = e > 0 ? "-" : "+",
    n = Math.abs(e),
    a = N(Math.trunc(n / 60), 2),
    i = N(n % 60, 2);
  return r + a + t + i;
}
const ft = (e, t) => {
    switch (e) {
      case "P":
        return t.date({ width: "short" });
      case "PP":
        return t.date({ width: "medium" });
      case "PPP":
        return t.date({ width: "long" });
      case "PPPP":
      default:
        return t.date({ width: "full" });
    }
  },
  Ft = (e, t) => {
    switch (e) {
      case "p":
        return t.time({ width: "short" });
      case "pp":
        return t.time({ width: "medium" });
      case "ppp":
        return t.time({ width: "long" });
      case "pppp":
      default:
        return t.time({ width: "full" });
    }
  },
  kn = (e, t) => {
    const r = e.match(/(P+)(p+)?/) || [],
      n = r[1],
      a = r[2];
    if (!a) return ft(e, t);
    let i;
    switch (n) {
      case "P":
        i = t.dateTime({ width: "short" });
        break;
      case "PP":
        i = t.dateTime({ width: "medium" });
        break;
      case "PPP":
        i = t.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        i = t.dateTime({ width: "full" });
        break;
    }
    return i.replace("{{date}}", ft(n, t)).replace("{{time}}", Ft(a, t));
  },
  Fn = { p: Ft, P: kn },
  An = /^D+$/,
  Bn = /^Y+$/,
  Wn = ["D", "DD", "YY", "YYYY"];
function Yn(e) {
  return An.test(e);
}
function Hn(e) {
  return Bn.test(e);
}
function $n(e, t, r) {
  const n = Un(e, t, r);
  if ((console.warn(n), Wn.includes(e))) throw new RangeError(n);
}
function Un(e, t, r) {
  const n = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${n} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Gn = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  Xn = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  Qn = /^'([^]*?)'?$/,
  Kn = /''/g,
  zn = /[a-zA-Z]/;
function $e(e, t, r) {
  var f, w, v, g;
  const n = Ie(),
    a = n.locale ?? En,
    i =
      n.firstWeekContainsDate ??
      ((w = (f = n.locale) == null ? void 0 : f.options) == null
        ? void 0
        : w.firstWeekContainsDate) ??
      1,
    s =
      n.weekStartsOn ??
      ((g = (v = n.locale) == null ? void 0 : v.options) == null ? void 0 : g.weekStartsOn) ??
      0,
    l = Q(e);
  if (!Jr(l)) throw new RangeError("Invalid time value");
  let u = t
    .match(Xn)
    .map((h) => {
      const d = h[0];
      if (d === "p" || d === "P") {
        const b = Fn[d];
        return b(h, a.formatLong);
      }
      return h;
    })
    .join("")
    .match(Gn)
    .map((h) => {
      if (h === "''") return { isToken: !1, value: "'" };
      const d = h[0];
      if (d === "'") return { isToken: !1, value: Jn(h) };
      if (dt[d]) return { isToken: !0, value: h };
      if (d.match(zn))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + d + "`",
        );
      return { isToken: !1, value: h };
    });
  a.localize.preprocessor && (u = a.localize.preprocessor(l, u));
  const m = { firstWeekContainsDate: i, weekStartsOn: s, locale: a };
  return u
    .map((h) => {
      if (!h.isToken) return h.value;
      const d = h.value;
      (Hn(d) || Yn(d)) && $n(d, t, String(e));
      const b = dt[d[0]];
      return b(l, d, a.localize, m);
    })
    .join("");
}
function Jn(e) {
  const t = e.match(Qn);
  return t ? t[1].replace(Kn, "'") : e;
}
function Ge({
  value: e,
  onChange: t,
  placeholder: r,
  selectDateRangeLabel: n,
  clearLabel: a,
  closeLabel: i,
  className: s,
  disabled: l = !1,
}) {
  if (!r || r.trim() === "")
    throw new Error('DateRangePicker: "placeholder" prop is required and cannot be empty');
  if (!n || n.trim() === "")
    throw new Error('DateRangePicker: "selectDateRangeLabel" prop is required and cannot be empty');
  if (!a || a.trim() === "")
    throw new Error('DateRangePicker: "clearLabel" prop is required and cannot be empty');
  if (!i || i.trim() === "")
    throw new Error('DateRangePicker: "closeLabel" prop is required and cannot be empty');
  const [u, m] = c.useState(!1),
    f = (g) =>
      g.from
        ? g.to
          ? `${$e(g.from, "LLL dd, y")} - ${$e(g.to, "LLL dd, y")}`
          : $e(g.from, "LLL dd, y")
        : r,
    w = (g) => {
      if (!g) {
        t({ from: void 0, to: void 0 });
        return;
      }
      !e.from || (e.from && e.to)
        ? t({ from: g, to: void 0 })
        : e.from &&
          !e.to &&
          (g < e.from ? t({ from: g, to: e.from }) : t({ from: e.from, to: g }), m(!1));
    },
    v = () => {
      t({ from: void 0, to: void 0 });
    };
  return o.jsxs("div", {
    className: F("relative", s),
    children: [
      o.jsxs(Ne, {
        variant: "outline",
        className: F(
          "w-full justify-start text-left font-normal",
          !e.from && "text-muted-foreground",
        ),
        onClick: () => m(!u),
        disabled: l,
        children: [o.jsx(Br, { className: "mr-sm h-4 w-4" }), f(e)],
      }),
      u &&
        o.jsx("div", {
          className:
            "absolute left-0 top-full z-50 mt-xs w-full rounded-md border bg-popover p-sm shadow-lg",
          children: o.jsxs("div", {
            className: "space-y-sm",
            children: [
              o.jsx("div", { className: "text-sm font-medium", children: n }),
              o.jsxs("div", {
                className: "grid grid-cols-7 gap-xs text-xs",
                children: [
                  ["S", "M", "T", "W", "T", "F", "S"].map((g) =>
                    o.jsx(
                      "div",
                      {
                        className: "p-sm text-center font-medium text-muted-foreground",
                        children: g,
                      },
                      g,
                    ),
                  ),
                  Array.from({ length: 35 }, (g, h) => {
                    const d = new Date();
                    d.setDate(d.getDate() - d.getDay() + h);
                    const b =
                        (e.from && d.toDateString() === e.from.toDateString()) ||
                        (e.to && d.toDateString() === e.to.toDateString()),
                      _ = e.from && e.to && d > e.from && d < e.to;
                    return o.jsx(
                      "button",
                      {
                        className: F(
                          "h-8 w-8 rounded text-sm hover:bg-accent",
                          b && "bg-primary text-primary-foreground",
                          _ && "bg-accent/50",
                        ),
                        onClick: () => w(d),
                        children: d.getDate(),
                      },
                      h,
                    );
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "flex justify-between pt-sm",
                children: [
                  o.jsx(Ne, { variant: "outline", size: "sm", onClick: v, children: a }),
                  o.jsx(Ne, { variant: "outline", size: "sm", onClick: () => m(!1), children: i }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
function ht(e = { from: void 0, to: void 0 }) {
  const [t, r] = c.useState(e),
    n = c.useCallback((s) => {
      r(s);
    }, []),
    a = c.useCallback(() => {
      r({ from: void 0, to: void 0 });
    }, []),
    i = t.from && t.to;
  return { range: t, setDateRange: n, clearRange: a, isRangeComplete: i };
}
try {
  ((Ge.displayName = "DateRangePicker"),
    (Ge.__docgenInfo = {
      description: "",
      displayName: "DateRangePicker",
      props: {
        value: {
          defaultValue: null,
          description: "",
          name: "value",
          required: !0,
          type: { name: "DateRange" },
        },
        onChange: {
          defaultValue: null,
          description: "",
          name: "onChange",
          required: !0,
          type: { name: "(range: DateRange) => void" },
        },
        placeholder: {
          defaultValue: null,
          description: "",
          name: "placeholder",
          required: !0,
          type: { name: "string" },
        },
        selectDateRangeLabel: {
          defaultValue: null,
          description: "",
          name: "selectDateRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        clearLabel: {
          defaultValue: null,
          description: "",
          name: "clearLabel",
          required: !0,
          type: { name: "string" },
        },
        closeLabel: {
          defaultValue: null,
          description: "",
          name: "closeLabel",
          required: !0,
          type: { name: "string" },
        },
        className: {
          defaultValue: null,
          description: "",
          name: "className",
          required: !1,
          type: { name: "string | undefined" },
        },
        disabled: {
          defaultValue: { value: "false" },
          description: "",
          name: "disabled",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((ht.displayName = "useDateRange"),
    (ht.__docgenInfo = {
      description: "",
      displayName: "useDateRange",
      props: {
        from: {
          defaultValue: null,
          description: "",
          name: "from",
          required: !0,
          type: { name: "Date | undefined" },
        },
        to: {
          defaultValue: null,
          description: "",
          name: "to",
          required: !0,
          type: { name: "Date | undefined" },
        },
      },
    }));
} catch {}
function gt(e, [t, r]) {
  return Math.min(r, Math.max(t, e));
}
function Zn(e) {
  const t = c.useRef({ value: e, previous: e });
  return c.useMemo(
    () => (
      t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)),
      t.current.previous
    ),
    [e],
  );
}
var ea = [" ", "Enter", "ArrowUp", "ArrowDown"],
  ta = [" ", "Enter"],
  ce = "Select",
  [je, Oe, ra] = Pr(ce),
  [pe] = Sr(ce, [ra, Vt]),
  ke = Vt(),
  [na, ee] = pe(ce),
  [aa, oa] = pe(ce),
  At = (e) => {
    const {
        __scopeSelect: t,
        children: r,
        open: n,
        defaultOpen: a,
        onOpenChange: i,
        value: s,
        defaultValue: l,
        onValueChange: u,
        dir: m,
        name: f,
        autoComplete: w,
        disabled: v,
        required: g,
        form: h,
      } = e,
      d = ke(t),
      [b, _] = c.useState(null),
      [p, y] = c.useState(null),
      [I, j] = c.useState(!1),
      G = Nr(m),
      [T, E] = lt({ prop: n, defaultProp: a ?? !1, onChange: i, caller: ce }),
      [A, W] = lt({ prop: s, defaultProp: l, onChange: u, caller: ce }),
      k = c.useRef(null),
      P = b ? h || !!b.closest("form") : !0,
      [R, C] = c.useState(new Set()),
      M = Array.from(R)
        .map((V) => V.props.value)
        .join(";");
    return o.jsx(Er, {
      ...d,
      children: o.jsxs(na, {
        required: g,
        scope: t,
        trigger: b,
        onTriggerChange: _,
        valueNode: p,
        onValueNodeChange: y,
        valueNodeHasChildren: I,
        onValueNodeHasChildrenChange: j,
        contentId: ot(),
        value: A,
        onValueChange: W,
        open: T,
        onOpenChange: E,
        dir: G,
        triggerPointerDownPosRef: k,
        disabled: v,
        children: [
          o.jsx(je.Provider, {
            scope: t,
            children: o.jsx(aa, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: c.useCallback((V) => {
                C((B) => new Set(B).add(V));
              }, []),
              onNativeOptionRemove: c.useCallback((V) => {
                C((B) => {
                  const H = new Set(B);
                  return (H.delete(V), H);
                });
              }, []),
              children: r,
            }),
          }),
          P
            ? o.jsxs(
                dr,
                {
                  "aria-hidden": !0,
                  required: g,
                  tabIndex: -1,
                  name: f,
                  autoComplete: w,
                  value: A,
                  onChange: (V) => W(V.target.value),
                  disabled: v,
                  form: h,
                  children: [A === void 0 ? o.jsx("option", { value: "" }) : null, Array.from(R)],
                },
                M,
              )
            : null,
        ],
      }),
    });
  };
At.displayName = ce;
var Bt = "SelectTrigger",
  Wt = c.forwardRef((e, t) => {
    const { __scopeSelect: r, disabled: n = !1, ...a } = e,
      i = ke(r),
      s = ee(Bt, r),
      l = s.disabled || n,
      u = K(t, s.onTriggerChange),
      m = Oe(r),
      f = c.useRef("touch"),
      [w, v, g] = pr((d) => {
        const b = m().filter((y) => !y.disabled),
          _ = b.find((y) => y.value === s.value),
          p = fr(b, d, _);
        p !== void 0 && s.onValueChange(p.value);
      }),
      h = (d) => {
        (l || (s.onOpenChange(!0), g()),
          d &&
            (s.triggerPointerDownPosRef.current = {
              x: Math.round(d.pageX),
              y: Math.round(d.pageY),
            }));
      };
    return o.jsx(Vr, {
      asChild: !0,
      ...i,
      children: o.jsx($.button, {
        type: "button",
        role: "combobox",
        "aria-controls": s.contentId,
        "aria-expanded": s.open,
        "aria-required": s.required,
        "aria-autocomplete": "none",
        dir: s.dir,
        "data-state": s.open ? "open" : "closed",
        disabled: l,
        "data-disabled": l ? "" : void 0,
        "data-placeholder": mr(s.value) ? "" : void 0,
        ...a,
        ref: u,
        onClick: O(a.onClick, (d) => {
          (d.currentTarget.focus(), f.current !== "mouse" && h(d));
        }),
        onPointerDown: O(a.onPointerDown, (d) => {
          f.current = d.pointerType;
          const b = d.target;
          (b.hasPointerCapture(d.pointerId) && b.releasePointerCapture(d.pointerId),
            d.button === 0 &&
              d.ctrlKey === !1 &&
              d.pointerType === "mouse" &&
              (h(d), d.preventDefault()));
        }),
        onKeyDown: O(a.onKeyDown, (d) => {
          const b = w.current !== "";
          (!(d.ctrlKey || d.altKey || d.metaKey) && d.key.length === 1 && v(d.key),
            !(b && d.key === " ") && ea.includes(d.key) && (h(), d.preventDefault()));
        }),
      }),
    });
  });
Wt.displayName = Bt;
var Yt = "SelectValue",
  Ht = c.forwardRef((e, t) => {
    const { __scopeSelect: r, className: n, style: a, children: i, placeholder: s = "", ...l } = e,
      u = ee(Yt, r),
      { onValueNodeHasChildrenChange: m } = u,
      f = i !== void 0,
      w = K(t, u.onValueNodeChange);
    return (
      Z(() => {
        m(f);
      }, [m, f]),
      o.jsx($.span, {
        ...l,
        ref: w,
        style: { pointerEvents: "none" },
        children: mr(u.value) ? o.jsx(o.Fragment, { children: s }) : i,
      })
    );
  });
Ht.displayName = Yt;
var ia = "SelectIcon",
  $t = c.forwardRef((e, t) => {
    const { __scopeSelect: r, children: n, ...a } = e;
    return o.jsx($.span, { "aria-hidden": !0, ...a, ref: t, children: n || "▼" });
  });
$t.displayName = ia;
var sa = "SelectPortal",
  Ut = (e) => o.jsx(Mr, { asChild: !0, ...e });
Ut.displayName = sa;
var ue = "SelectContent",
  Gt = c.forwardRef((e, t) => {
    const r = ee(ue, e.__scopeSelect),
      [n, a] = c.useState();
    if (
      (Z(() => {
        a(new DocumentFragment());
      }, []),
      !r.open)
    ) {
      const i = n;
      return i
        ? Et.createPortal(
            o.jsx(Xt, {
              scope: e.__scopeSelect,
              children: o.jsx(je.Slot, {
                scope: e.__scopeSelect,
                children: o.jsx("div", { children: e.children }),
              }),
            }),
            i,
          )
        : null;
    }
    return o.jsx(Qt, { ...e, ref: t });
  });
Gt.displayName = ue;
var X = 10,
  [Xt, te] = pe(ue),
  la = "SelectContentImpl",
  ca = Cr("SelectContent.RemoveScroll"),
  Qt = c.forwardRef((e, t) => {
    const {
        __scopeSelect: r,
        position: n = "item-aligned",
        onCloseAutoFocus: a,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        side: l,
        sideOffset: u,
        align: m,
        alignOffset: f,
        arrowPadding: w,
        collisionBoundary: v,
        collisionPadding: g,
        sticky: h,
        hideWhenDetached: d,
        avoidCollisions: b,
        ..._
      } = e,
      p = ee(ue, r),
      [y, I] = c.useState(null),
      [j, G] = c.useState(null),
      T = K(t, (x) => I(x)),
      [E, A] = c.useState(null),
      [W, k] = c.useState(null),
      P = Oe(r),
      [R, C] = c.useState(!1),
      M = c.useRef(!1);
    (c.useEffect(() => {
      if (y) return Dr(y);
    }, [y]),
      Lr());
    const V = c.useCallback(
        (x) => {
          const [S, ...Y] = P().map((L) => L.ref.current),
            [q] = Y.slice(-1),
            D = document.activeElement;
          for (const L of x)
            if (
              L === D ||
              (L == null || L.scrollIntoView({ block: "nearest" }),
              L === S && j && (j.scrollTop = 0),
              L === q && j && (j.scrollTop = j.scrollHeight),
              L == null || L.focus(),
              document.activeElement !== D)
            )
              return;
        },
        [P, j],
      ),
      B = c.useCallback(() => V([E, y]), [V, E, y]);
    c.useEffect(() => {
      R && B();
    }, [R, B]);
    const { onOpenChange: H, triggerPointerDownPosRef: U } = p;
    (c.useEffect(() => {
      if (y) {
        let x = { x: 0, y: 0 };
        const S = (q) => {
            var D, L;
            x = {
              x: Math.abs(Math.round(q.pageX) - (((D = U.current) == null ? void 0 : D.x) ?? 0)),
              y: Math.abs(Math.round(q.pageY) - (((L = U.current) == null ? void 0 : L.y) ?? 0)),
            };
          },
          Y = (q) => {
            (x.x <= 10 && x.y <= 10 ? q.preventDefault() : y.contains(q.target) || H(!1),
              document.removeEventListener("pointermove", S),
              (U.current = null));
          };
        return (
          U.current !== null &&
            (document.addEventListener("pointermove", S),
            document.addEventListener("pointerup", Y, { capture: !0, once: !0 })),
          () => {
            (document.removeEventListener("pointermove", S),
              document.removeEventListener("pointerup", Y, { capture: !0 }));
          }
        );
      }
    }, [y, H, U]),
      c.useEffect(() => {
        const x = () => H(!1);
        return (
          window.addEventListener("blur", x),
          window.addEventListener("resize", x),
          () => {
            (window.removeEventListener("blur", x), window.removeEventListener("resize", x));
          }
        );
      }, [H]));
    const [re, de] = pr((x) => {
        const S = P().filter((D) => !D.disabled),
          Y = S.find((D) => D.ref.current === document.activeElement),
          q = fr(S, x, Y);
        q && setTimeout(() => q.ref.current.focus());
      }),
      fe = c.useCallback(
        (x, S, Y) => {
          const q = !M.current && !Y;
          ((p.value !== void 0 && p.value === S) || q) && (A(x), q && (M.current = !0));
        },
        [p.value],
      ),
      he = c.useCallback(() => (y == null ? void 0 : y.focus()), [y]),
      z = c.useCallback(
        (x, S, Y) => {
          const q = !M.current && !Y;
          ((p.value !== void 0 && p.value === S) || q) && k(x);
        },
        [p.value],
      ),
      ne = n === "popper" ? Xe : Kt,
      ae =
        ne === Xe
          ? {
              side: l,
              sideOffset: u,
              align: m,
              alignOffset: f,
              arrowPadding: w,
              collisionBoundary: v,
              collisionPadding: g,
              sticky: h,
              hideWhenDetached: d,
              avoidCollisions: b,
            }
          : {};
    return o.jsx(Xt, {
      scope: r,
      content: y,
      viewport: j,
      onViewportChange: G,
      itemRefCallback: fe,
      selectedItem: E,
      onItemLeave: he,
      itemTextRefCallback: z,
      focusSelectedItem: B,
      selectedItemText: W,
      position: n,
      isPositioned: R,
      searchRef: re,
      children: o.jsx(qr, {
        as: ca,
        allowPinchZoom: !0,
        children: o.jsx(Tr, {
          asChild: !0,
          trapped: p.open,
          onMountAutoFocus: (x) => {
            x.preventDefault();
          },
          onUnmountAutoFocus: O(a, (x) => {
            var S;
            ((S = p.trigger) == null || S.focus({ preventScroll: !0 }), x.preventDefault());
          }),
          children: o.jsx(Rr, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: i,
            onPointerDownOutside: s,
            onFocusOutside: (x) => x.preventDefault(),
            onDismiss: () => p.onOpenChange(!1),
            children: o.jsx(ne, {
              role: "listbox",
              id: p.contentId,
              "data-state": p.open ? "open" : "closed",
              dir: p.dir,
              onContextMenu: (x) => x.preventDefault(),
              ..._,
              ...ae,
              onPlaced: () => C(!0),
              ref: T,
              style: { display: "flex", flexDirection: "column", outline: "none", ..._.style },
              onKeyDown: O(_.onKeyDown, (x) => {
                const S = x.ctrlKey || x.altKey || x.metaKey;
                if (
                  (x.key === "Tab" && x.preventDefault(),
                  !S && x.key.length === 1 && de(x.key),
                  ["ArrowUp", "ArrowDown", "Home", "End"].includes(x.key))
                ) {
                  let q = P()
                    .filter((D) => !D.disabled)
                    .map((D) => D.ref.current);
                  if (
                    (["ArrowUp", "End"].includes(x.key) && (q = q.slice().reverse()),
                    ["ArrowUp", "ArrowDown"].includes(x.key))
                  ) {
                    const D = x.target,
                      L = q.indexOf(D);
                    q = q.slice(L + 1);
                  }
                  (setTimeout(() => V(q)), x.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
Qt.displayName = la;
var ua = "SelectItemAlignedPosition",
  Kt = c.forwardRef((e, t) => {
    const { __scopeSelect: r, onPlaced: n, ...a } = e,
      i = ee(ue, r),
      s = te(ue, r),
      [l, u] = c.useState(null),
      [m, f] = c.useState(null),
      w = K(t, (T) => f(T)),
      v = Oe(r),
      g = c.useRef(!1),
      h = c.useRef(!0),
      { viewport: d, selectedItem: b, selectedItemText: _, focusSelectedItem: p } = s,
      y = c.useCallback(() => {
        if (i.trigger && i.valueNode && l && m && d && b && _) {
          const T = i.trigger.getBoundingClientRect(),
            E = m.getBoundingClientRect(),
            A = i.valueNode.getBoundingClientRect(),
            W = _.getBoundingClientRect();
          if (i.dir !== "rtl") {
            const D = W.left - E.left,
              L = A.left - D,
              oe = T.left - L,
              ie = T.width + oe,
              Ae = Math.max(ie, E.width),
              Be = window.innerWidth - X,
              We = gt(L, [X, Math.max(X, Be - Ae)]);
            ((l.style.minWidth = ie + "px"), (l.style.left = We + "px"));
          } else {
            const D = E.right - W.right,
              L = window.innerWidth - A.right - D,
              oe = window.innerWidth - T.right - L,
              ie = T.width + oe,
              Ae = Math.max(ie, E.width),
              Be = window.innerWidth - X,
              We = gt(L, [X, Math.max(X, Be - Ae)]);
            ((l.style.minWidth = ie + "px"), (l.style.right = We + "px"));
          }
          const k = v(),
            P = window.innerHeight - X * 2,
            R = d.scrollHeight,
            C = window.getComputedStyle(m),
            M = parseInt(C.borderTopWidth, 10),
            V = parseInt(C.paddingTop, 10),
            B = parseInt(C.borderBottomWidth, 10),
            H = parseInt(C.paddingBottom, 10),
            U = M + V + R + H + B,
            re = Math.min(b.offsetHeight * 5, U),
            de = window.getComputedStyle(d),
            fe = parseInt(de.paddingTop, 10),
            he = parseInt(de.paddingBottom, 10),
            z = T.top + T.height / 2 - X,
            ne = P - z,
            ae = b.offsetHeight / 2,
            x = b.offsetTop + ae,
            S = M + V + x,
            Y = U - S;
          if (S <= z) {
            const D = k.length > 0 && b === k[k.length - 1].ref.current;
            l.style.bottom = "0px";
            const L = m.clientHeight - d.offsetTop - d.offsetHeight,
              oe = Math.max(ne, ae + (D ? he : 0) + L + B),
              ie = S + oe;
            l.style.height = ie + "px";
          } else {
            const D = k.length > 0 && b === k[0].ref.current;
            l.style.top = "0px";
            const oe = Math.max(z, M + d.offsetTop + (D ? fe : 0) + ae) + Y;
            ((l.style.height = oe + "px"), (d.scrollTop = S - z + d.offsetTop));
          }
          ((l.style.margin = `${X}px 0`),
            (l.style.minHeight = re + "px"),
            (l.style.maxHeight = P + "px"),
            n == null || n(),
            requestAnimationFrame(() => (g.current = !0)));
        }
      }, [v, i.trigger, i.valueNode, l, m, d, b, _, i.dir, n]);
    Z(() => y(), [y]);
    const [I, j] = c.useState();
    Z(() => {
      m && j(window.getComputedStyle(m).zIndex);
    }, [m]);
    const G = c.useCallback(
      (T) => {
        T && h.current === !0 && (y(), p == null || p(), (h.current = !1));
      },
      [y, p],
    );
    return o.jsx(ma, {
      scope: r,
      contentWrapper: l,
      shouldExpandOnScrollRef: g,
      onScrollButtonChange: G,
      children: o.jsx("div", {
        ref: u,
        style: { display: "flex", flexDirection: "column", position: "fixed", zIndex: I },
        children: o.jsx($.div, {
          ...a,
          ref: w,
          style: { boxSizing: "border-box", maxHeight: "100%", ...a.style },
        }),
      }),
    });
  });
Kt.displayName = ua;
var da = "SelectPopperPosition",
  Xe = c.forwardRef((e, t) => {
    const { __scopeSelect: r, align: n = "start", collisionPadding: a = X, ...i } = e,
      s = ke(r);
    return o.jsx(Ir, {
      ...s,
      ...i,
      ref: t,
      align: n,
      collisionPadding: a,
      style: {
        boxSizing: "border-box",
        ...i.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
Xe.displayName = da;
var [ma, it] = pe(ue, {}),
  Qe = "SelectViewport",
  zt = c.forwardRef((e, t) => {
    const { __scopeSelect: r, nonce: n, ...a } = e,
      i = te(Qe, r),
      s = it(Qe, r),
      l = K(t, i.onViewportChange),
      u = c.useRef(0);
    return o.jsxs(o.Fragment, {
      children: [
        o.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: n,
        }),
        o.jsx(je.Slot, {
          scope: r,
          children: o.jsx($.div, {
            "data-radix-select-viewport": "",
            role: "presentation",
            ...a,
            ref: l,
            style: { position: "relative", flex: 1, overflow: "hidden auto", ...a.style },
            onScroll: O(a.onScroll, (m) => {
              const f = m.currentTarget,
                { contentWrapper: w, shouldExpandOnScrollRef: v } = s;
              if (v != null && v.current && w) {
                const g = Math.abs(u.current - f.scrollTop);
                if (g > 0) {
                  const h = window.innerHeight - X * 2,
                    d = parseFloat(w.style.minHeight),
                    b = parseFloat(w.style.height),
                    _ = Math.max(d, b);
                  if (_ < h) {
                    const p = _ + g,
                      y = Math.min(h, p),
                      I = p - y;
                    ((w.style.height = y + "px"),
                      w.style.bottom === "0px" &&
                        ((f.scrollTop = I > 0 ? I : 0), (w.style.justifyContent = "flex-end")));
                  }
                }
              }
              u.current = f.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
zt.displayName = Qe;
var Jt = "SelectGroup",
  [pa, fa] = pe(Jt),
  Zt = c.forwardRef((e, t) => {
    const { __scopeSelect: r, ...n } = e,
      a = ot();
    return o.jsx(pa, {
      scope: r,
      id: a,
      children: o.jsx($.div, { role: "group", "aria-labelledby": a, ...n, ref: t }),
    });
  });
Zt.displayName = Jt;
var er = "SelectLabel",
  tr = c.forwardRef((e, t) => {
    const { __scopeSelect: r, ...n } = e,
      a = fa(er, r);
    return o.jsx($.div, { id: a.id, ...n, ref: t });
  });
tr.displayName = er;
var Re = "SelectItem",
  [ha, rr] = pe(Re),
  nr = c.forwardRef((e, t) => {
    const { __scopeSelect: r, value: n, disabled: a = !1, textValue: i, ...s } = e,
      l = ee(Re, r),
      u = te(Re, r),
      m = l.value === n,
      [f, w] = c.useState(i ?? ""),
      [v, g] = c.useState(!1),
      h = K(t, (p) => {
        var y;
        return (y = u.itemRefCallback) == null ? void 0 : y.call(u, p, n, a);
      }),
      d = ot(),
      b = c.useRef("touch"),
      _ = () => {
        a || (l.onValueChange(n), l.onOpenChange(!1));
      };
    if (n === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
      );
    return o.jsx(ha, {
      scope: r,
      value: n,
      disabled: a,
      textId: d,
      isSelected: m,
      onItemTextChange: c.useCallback((p) => {
        w((y) => y || ((p == null ? void 0 : p.textContent) ?? "").trim());
      }, []),
      children: o.jsx(je.ItemSlot, {
        scope: r,
        value: n,
        disabled: a,
        textValue: f,
        children: o.jsx($.div, {
          role: "option",
          "aria-labelledby": d,
          "data-highlighted": v ? "" : void 0,
          "aria-selected": m && v,
          "data-state": m ? "checked" : "unchecked",
          "aria-disabled": a || void 0,
          "data-disabled": a ? "" : void 0,
          tabIndex: a ? void 0 : -1,
          ...s,
          ref: h,
          onFocus: O(s.onFocus, () => g(!0)),
          onBlur: O(s.onBlur, () => g(!1)),
          onClick: O(s.onClick, () => {
            b.current !== "mouse" && _();
          }),
          onPointerUp: O(s.onPointerUp, () => {
            b.current === "mouse" && _();
          }),
          onPointerDown: O(s.onPointerDown, (p) => {
            b.current = p.pointerType;
          }),
          onPointerMove: O(s.onPointerMove, (p) => {
            var y;
            ((b.current = p.pointerType),
              a
                ? (y = u.onItemLeave) == null || y.call(u)
                : b.current === "mouse" && p.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: O(s.onPointerLeave, (p) => {
            var y;
            p.currentTarget === document.activeElement &&
              ((y = u.onItemLeave) == null || y.call(u));
          }),
          onKeyDown: O(s.onKeyDown, (p) => {
            var I;
            (((I = u.searchRef) == null ? void 0 : I.current) !== "" && p.key === " ") ||
              (ta.includes(p.key) && _(), p.key === " " && p.preventDefault());
          }),
        }),
      }),
    });
  });
nr.displayName = Re;
var we = "SelectItemText",
  ar = c.forwardRef((e, t) => {
    const { __scopeSelect: r, className: n, style: a, ...i } = e,
      s = ee(we, r),
      l = te(we, r),
      u = rr(we, r),
      m = oa(we, r),
      [f, w] = c.useState(null),
      v = K(
        t,
        (_) => w(_),
        u.onItemTextChange,
        (_) => {
          var p;
          return (p = l.itemTextRefCallback) == null ? void 0 : p.call(l, _, u.value, u.disabled);
        },
      ),
      g = f == null ? void 0 : f.textContent,
      h = c.useMemo(
        () => o.jsx("option", { value: u.value, disabled: u.disabled, children: g }, u.value),
        [u.disabled, u.value, g],
      ),
      { onNativeOptionAdd: d, onNativeOptionRemove: b } = m;
    return (
      Z(() => (d(h), () => b(h)), [d, b, h]),
      o.jsxs(o.Fragment, {
        children: [
          o.jsx($.span, { id: u.textId, ...i, ref: v }),
          u.isSelected && s.valueNode && !s.valueNodeHasChildren
            ? Et.createPortal(i.children, s.valueNode)
            : null,
        ],
      })
    );
  });
ar.displayName = we;
var or = "SelectItemIndicator",
  ir = c.forwardRef((e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return rr(or, r).isSelected ? o.jsx($.span, { "aria-hidden": !0, ...n, ref: t }) : null;
  });
ir.displayName = or;
var Ke = "SelectScrollUpButton",
  sr = c.forwardRef((e, t) => {
    const r = te(Ke, e.__scopeSelect),
      n = it(Ke, e.__scopeSelect),
      [a, i] = c.useState(!1),
      s = K(t, n.onScrollButtonChange);
    return (
      Z(() => {
        if (r.viewport && r.isPositioned) {
          let l = function () {
            const m = u.scrollTop > 0;
            i(m);
          };
          const u = r.viewport;
          return (l(), u.addEventListener("scroll", l), () => u.removeEventListener("scroll", l));
        }
      }, [r.viewport, r.isPositioned]),
      a
        ? o.jsx(cr, {
            ...e,
            ref: s,
            onAutoScroll: () => {
              const { viewport: l, selectedItem: u } = r;
              l && u && (l.scrollTop = l.scrollTop - u.offsetHeight);
            },
          })
        : null
    );
  });
sr.displayName = Ke;
var ze = "SelectScrollDownButton",
  lr = c.forwardRef((e, t) => {
    const r = te(ze, e.__scopeSelect),
      n = it(ze, e.__scopeSelect),
      [a, i] = c.useState(!1),
      s = K(t, n.onScrollButtonChange);
    return (
      Z(() => {
        if (r.viewport && r.isPositioned) {
          let l = function () {
            const m = u.scrollHeight - u.clientHeight,
              f = Math.ceil(u.scrollTop) < m;
            i(f);
          };
          const u = r.viewport;
          return (l(), u.addEventListener("scroll", l), () => u.removeEventListener("scroll", l));
        }
      }, [r.viewport, r.isPositioned]),
      a
        ? o.jsx(cr, {
            ...e,
            ref: s,
            onAutoScroll: () => {
              const { viewport: l, selectedItem: u } = r;
              l && u && (l.scrollTop = l.scrollTop + u.offsetHeight);
            },
          })
        : null
    );
  });
lr.displayName = ze;
var cr = c.forwardRef((e, t) => {
    const { __scopeSelect: r, onAutoScroll: n, ...a } = e,
      i = te("SelectScrollButton", r),
      s = c.useRef(null),
      l = Oe(r),
      u = c.useCallback(() => {
        s.current !== null && (window.clearInterval(s.current), (s.current = null));
      }, []);
    return (
      c.useEffect(() => () => u(), [u]),
      Z(() => {
        var f;
        const m = l().find((w) => w.ref.current === document.activeElement);
        (f = m == null ? void 0 : m.ref.current) == null || f.scrollIntoView({ block: "nearest" });
      }, [l]),
      o.jsx($.div, {
        "aria-hidden": !0,
        ...a,
        ref: t,
        style: { flexShrink: 0, ...a.style },
        onPointerDown: O(a.onPointerDown, () => {
          s.current === null && (s.current = window.setInterval(n, 50));
        }),
        onPointerMove: O(a.onPointerMove, () => {
          var m;
          ((m = i.onItemLeave) == null || m.call(i),
            s.current === null && (s.current = window.setInterval(n, 50)));
        }),
        onPointerLeave: O(a.onPointerLeave, () => {
          u();
        }),
      })
    );
  }),
  ga = "SelectSeparator",
  ur = c.forwardRef((e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return o.jsx($.div, { "aria-hidden": !0, ...n, ref: t });
  });
ur.displayName = ga;
var Je = "SelectArrow",
  ya = c.forwardRef((e, t) => {
    const { __scopeSelect: r, ...n } = e,
      a = ke(r),
      i = ee(Je, r),
      s = te(Je, r);
    return i.open && s.position === "popper" ? o.jsx(jr, { ...a, ...n, ref: t }) : null;
  });
ya.displayName = Je;
var wa = "SelectBubbleInput",
  dr = c.forwardRef(({ __scopeSelect: e, value: t, ...r }, n) => {
    const a = c.useRef(null),
      i = K(n, a),
      s = Zn(t);
    return (
      c.useEffect(() => {
        const l = a.current;
        if (!l) return;
        const u = window.HTMLSelectElement.prototype,
          f = Object.getOwnPropertyDescriptor(u, "value").set;
        if (s !== t && f) {
          const w = new Event("change", { bubbles: !0 });
          (f.call(l, t), l.dispatchEvent(w));
        }
      }, [s, t]),
      o.jsx($.select, { ...r, style: { ...Or, ...r.style }, ref: i, defaultValue: t })
    );
  });
dr.displayName = wa;
function mr(e) {
  return e === "" || e === void 0;
}
function pr(e) {
  const t = _r(e),
    r = c.useRef(""),
    n = c.useRef(0),
    a = c.useCallback(
      (s) => {
        const l = r.current + s;
        (t(l),
          (function u(m) {
            ((r.current = m),
              window.clearTimeout(n.current),
              m !== "" && (n.current = window.setTimeout(() => u(""), 1e3)));
          })(l));
      },
      [t],
    ),
    i = c.useCallback(() => {
      ((r.current = ""), window.clearTimeout(n.current));
    }, []);
  return (c.useEffect(() => () => window.clearTimeout(n.current), []), [r, a, i]);
}
function fr(e, t, r) {
  const a = t.length > 1 && Array.from(t).every((m) => m === t[0]) ? t[0] : t,
    i = r ? e.indexOf(r) : -1;
  let s = ba(e, Math.max(i, 0));
  a.length === 1 && (s = s.filter((m) => m !== r));
  const u = s.find((m) => m.textValue.toLowerCase().startsWith(a.toLowerCase()));
  return u !== r ? u : void 0;
}
function ba(e, t) {
  return e.map((r, n) => e[(t + n) % e.length]);
}
var xa = At,
  hr = Wt,
  va = Ht,
  Sa = $t,
  _a = Ut,
  gr = Gt,
  Ca = zt,
  Na = Zt,
  yr = tr,
  wr = nr,
  Pa = ar,
  Ra = ir,
  br = sr,
  xr = lr,
  vr = ur;
const Ze = xa,
  yt = Na,
  et = va,
  Me = c.forwardRef(({ className: e, children: t, ...r }, n) =>
    o.jsxs(hr, {
      ref: n,
      className: F(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-sm py-sm text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        e,
      ),
      ...r,
      children: [
        t,
        o.jsx(Sa, { asChild: !0, children: o.jsx(It, { className: "h-4 w-4 opacity-50" }) }),
      ],
    }),
  );
Me.displayName = hr.displayName;
const De = c.forwardRef(({ className: e, ...t }, r) =>
  o.jsx(br, {
    ref: r,
    className: F("flex cursor-default items-center justify-center py-xs", e),
    ...t,
    children: o.jsx(Hr, { className: "h-4 w-4" }),
  }),
);
De.displayName = br.displayName;
const Le = c.forwardRef(({ className: e, ...t }, r) =>
  o.jsx(xr, {
    ref: r,
    className: F("flex cursor-default items-center justify-center py-xs", e),
    ...t,
    children: o.jsx(It, { className: "h-4 w-4" }),
  }),
);
Le.displayName = xr.displayName;
const qe = c.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, a) =>
  o.jsx(_a, {
    children: o.jsxs(gr, {
      ref: a,
      className: F(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        r === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e,
      ),
      position: r,
      ...n,
      children: [
        o.jsx(De, {}),
        o.jsx(Ca, {
          className: F(
            "p-xs",
            r === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          ),
          children: t,
        }),
        o.jsx(Le, {}),
      ],
    }),
  }),
);
qe.displayName = gr.displayName;
const tt = c.forwardRef(({ className: e, ...t }, r) =>
  o.jsx(yr, { ref: r, className: F("py-xs pl-8 pr-sm text-sm font-semibold", e), ...t }),
);
tt.displayName = yr.displayName;
const Te = c.forwardRef(({ className: e, children: t, ...r }, n) =>
  o.jsxs(wr, {
    ref: n,
    className: F(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-xs pl-8 pr-sm text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    ...r,
    children: [
      o.jsx("span", {
        className: "absolute left-sm flex h-3.5 w-3.5 items-center justify-center",
        children: o.jsx(Ra, { children: o.jsx(kr, { className: "h-4 w-4" }) }),
      }),
      o.jsx(Pa, { children: t }),
    ],
  }),
);
Te.displayName = wr.displayName;
const rt = c.forwardRef(({ className: e, ...t }, r) =>
  o.jsx(vr, { ref: r, className: F("-mx-xs my-xs h-px bg-muted", e), ...t }),
);
rt.displayName = vr.displayName;
function Ee({ value: e, onValueChange: t, options: r, placeholder: n, label: a, className: i }) {
  if (!n || n.trim() === "")
    throw new Error('FilterSelect: "placeholder" prop is required and cannot be empty');
  const s = r.filter((l) => l.value !== "" && l.value !== null);
  return o.jsxs("div", {
    className: F("space-y-sm", i),
    children: [
      a &&
        o.jsx("label", {
          className:
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          children: a,
        }),
      o.jsxs(Ze, {
        value: e || void 0,
        onValueChange: t,
        children: [
          o.jsx(Me, { children: o.jsx(et, { placeholder: n }) }),
          o.jsx(qe, {
            children: s.map((l) =>
              !l.value || l.value === ""
                ? null
                : o.jsx(
                    Te,
                    {
                      value: l.value,
                      children: o.jsxs("div", {
                        className: "flex w-full items-center justify-between",
                        children: [
                          o.jsx("span", { children: l.label }),
                          l.count !== void 0 &&
                            o.jsxs("span", {
                              className: "ml-sm text-xs text-muted-foreground",
                              children: ["(", l.count, ")"],
                            }),
                        ],
                      }),
                    },
                    l.value,
                  ),
            ),
          }),
        ],
      }),
    ],
  });
}
try {
  ((Ee.displayName = "FilterSelect"),
    (Ee.__docgenInfo = {
      description: "",
      displayName: "FilterSelect",
      props: {
        value: {
          defaultValue: null,
          description: "",
          name: "value",
          required: !0,
          type: { name: "string" },
        },
        onValueChange: {
          defaultValue: null,
          description: "",
          name: "onValueChange",
          required: !0,
          type: { name: "(value: string) => void" },
        },
        options: {
          defaultValue: null,
          description: "",
          name: "options",
          required: !0,
          type: { name: "FilterOption[]" },
        },
        placeholder: {
          defaultValue: null,
          description: "",
          name: "placeholder",
          required: !0,
          type: { name: "string" },
        },
        label: {
          defaultValue: null,
          description: "",
          name: "label",
          required: !1,
          type: { name: "string | undefined" },
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
try {
  ((Ze.displayName = "Select"),
    (Ze.__docgenInfo = {
      description: "",
      displayName: "Select",
      props: {
        value: {
          defaultValue: null,
          description: "",
          name: "value",
          required: !1,
          type: { name: "string | undefined" },
        },
        defaultValue: {
          defaultValue: null,
          description: "",
          name: "defaultValue",
          required: !1,
          type: { name: "string | undefined" },
        },
        onValueChange: {
          defaultValue: null,
          description: "",
          name: "onValueChange",
          required: !1,
          type: { name: "((value: string) => void) | undefined" },
        },
      },
    }));
} catch {}
try {
  ((qe.displayName = "SelectContent"),
    (qe.__docgenInfo = {
      description: "",
      displayName: "SelectContent",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((yt.displayName = "SelectGroup"),
    (yt.__docgenInfo = {
      description: "",
      displayName: "SelectGroup",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((Te.displayName = "SelectItem"),
    (Te.__docgenInfo = {
      description: "",
      displayName: "SelectItem",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((tt.displayName = "SelectLabel"),
    (tt.__docgenInfo = {
      description: "",
      displayName: "SelectLabel",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((Le.displayName = "SelectScrollDownButton"),
    (Le.__docgenInfo = {
      description: "",
      displayName: "SelectScrollDownButton",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((De.displayName = "SelectScrollUpButton"),
    (De.__docgenInfo = {
      description: "",
      displayName: "SelectScrollUpButton",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((rt.displayName = "SelectSeparator"),
    (rt.__docgenInfo = {
      description: "",
      displayName: "SelectSeparator",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((Me.displayName = "SelectTrigger"),
    (Me.__docgenInfo = {
      description: "",
      displayName: "SelectTrigger",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
try {
  ((et.displayName = "SelectValue"),
    (et.__docgenInfo = {
      description: "",
      displayName: "SelectValue",
      props: {
        asChild: {
          defaultValue: null,
          description: "",
          name: "asChild",
          required: !1,
          type: { name: "boolean | undefined" },
        },
      },
    }));
} catch {}
function nt({
  value: e,
  onChange: t,
  min: r,
  max: n,
  step: a,
  currency: i,
  priceRangeLabel: s,
  minLabel: l,
  maxLabel: u,
  anyPriceLabel: m,
  clearLabel: f,
  minAriaLabel: w,
  maxAriaLabel: v,
  className: g,
}) {
  var W, k;
  if (typeof r != "number" || isNaN(r))
    throw new Error('PriceRangeSlider: "min" prop is required and must be a number');
  if (typeof n != "number" || isNaN(n))
    throw new Error('PriceRangeSlider: "max" prop is required and must be a number');
  if (typeof a != "number" || isNaN(a) || a <= 0)
    throw new Error('PriceRangeSlider: "step" prop is required and must be a positive number');
  if (!i || i.trim() === "")
    throw new Error('PriceRangeSlider: "currency" prop is required and cannot be empty');
  if (!s || s.trim() === "")
    throw new Error('PriceRangeSlider: "priceRangeLabel" prop is required and cannot be empty');
  if (!l || l.trim() === "")
    throw new Error('PriceRangeSlider: "minLabel" prop is required and cannot be empty');
  if (!u || u.trim() === "")
    throw new Error('PriceRangeSlider: "maxLabel" prop is required and cannot be empty');
  if (!m || m.trim() === "")
    throw new Error('PriceRangeSlider: "anyPriceLabel" prop is required and cannot be empty');
  if (!f || f.trim() === "")
    throw new Error('PriceRangeSlider: "clearLabel" prop is required and cannot be empty');
  if (!w || w.trim() === "")
    throw new Error('PriceRangeSlider: "minAriaLabel" prop is required and cannot be empty');
  if (!v || v.trim() === "")
    throw new Error('PriceRangeSlider: "maxAriaLabel" prop is required and cannot be empty');
  const h = c.useId(),
    d = c.useId(),
    [b, _] = c.useState(((W = e.min) == null ? void 0 : W.toString()) || ""),
    [p, y] = c.useState(((k = e.max) == null ? void 0 : k.toString()) || "");
  c.useEffect(() => {
    var P, R;
    (_(((P = e.min) == null ? void 0 : P.toString()) || ""),
      y(((R = e.max) == null ? void 0 : R.toString()) || ""));
  }, [e.min, e.max]);
  const I = (P) => {
      const R = P.target.value;
      _(R);
      const C = R === "" ? null : Math.max(r, parseInt(R) || r),
        M = e.max ? Math.min(n, e.max) : null;
      C !== null && M !== null && C > M ? t({ min: C, max: C }) : t({ min: C, max: M });
    },
    j = (P) => {
      const R = P.target.value;
      y(R);
      const C = R === "" ? null : Math.min(n, parseInt(R) || n),
        M = e.min ? Math.max(r, e.min) : null;
      M !== null && C !== null && M > C ? t({ min: C, max: C }) : t({ min: M, max: C });
    },
    G = (P, R) => {
      if (P === "min") {
        const C = Math.max(r, Math.min(n, R)),
          M = e.max ? Math.max(C, e.max) : null;
        t({ min: C, max: M });
      } else {
        const C = Math.max(r, Math.min(n, R)),
          M = e.min ? Math.min(C, e.min) : null;
        t({ min: M, max: C });
      }
    },
    T = () => {
      (_(""), y(""), t({ min: null, max: null }));
    },
    E = e.min || r,
    A = e.max || n;
  return o.jsxs("div", {
    className: F("space-y-md", g),
    children: [
      o.jsxs("div", {
        className: "space-y-sm",
        children: [
          o.jsx(Ye, { children: s }),
          o.jsxs("div", {
            className: "flex items-center space-x-sm",
            children: [
              o.jsxs("div", {
                className: "flex-1",
                children: [
                  o.jsx(Ye, {
                    htmlFor: h,
                    className: "text-xs text-muted-foreground",
                    children: l,
                  }),
                  o.jsxs("div", {
                    className: "relative",
                    children: [
                      o.jsx("span", {
                        className:
                          "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
                        children: i,
                      }),
                      o.jsx(Ue, {
                        id: h,
                        name: `min-price-${h}`,
                        type: "number",
                        value: b,
                        onChange: I,
                        placeholder: r.toString(),
                        min: r,
                        max: n,
                        step: a,
                        className: "pl-8",
                      }),
                    ],
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "flex-1",
                children: [
                  o.jsx(Ye, {
                    htmlFor: d,
                    className: "text-xs text-muted-foreground",
                    children: u,
                  }),
                  o.jsxs("div", {
                    className: "relative",
                    children: [
                      o.jsx("span", {
                        className:
                          "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
                        children: i,
                      }),
                      o.jsx(Ue, {
                        id: d,
                        name: `max-price-${d}`,
                        type: "number",
                        value: p,
                        onChange: j,
                        placeholder: n.toString(),
                        min: r,
                        max: n,
                        step: a,
                        className: "pl-8",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      o.jsxs("div", {
        className: "space-y-sm",
        children: [
          o.jsxs("div", {
            className: "relative",
            children: [
              o.jsx("input", {
                type: "range",
                id: `${h}-slider`,
                name: `min-price-slider-${h}`,
                min: r,
                max: n,
                step: a,
                value: E,
                onChange: (P) => G("min", parseInt(P.target.value)),
                className:
                  "slider-thumb absolute h-2 w-full cursor-pointer appearance-none bg-transparent",
                "aria-label": w,
              }),
              o.jsx("input", {
                type: "range",
                id: `${d}-slider`,
                name: `max-price-slider-${d}`,
                min: r,
                max: n,
                step: a,
                value: A,
                onChange: (P) => G("max", parseInt(P.target.value)),
                className:
                  "slider-thumb absolute h-2 w-full cursor-pointer appearance-none bg-transparent",
                "aria-label": v,
              }),
              o.jsx("div", {
                className: "h-2 rounded-full bg-muted",
                children: o.jsx("div", {
                  className: "h-2 rounded-full bg-primary",
                  style: {
                    left: `${((E - r) / (n - r)) * 100}%`,
                    width: `${((A - E) / (n - r)) * 100}%`,
                  },
                }),
              }),
            ],
          }),
          o.jsxs("div", {
            className: "flex justify-between text-xs text-muted-foreground",
            children: [o.jsxs("span", { children: [i, r] }), o.jsxs("span", { children: [i, n] })],
          }),
        ],
      }),
      o.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          o.jsx("span", {
            className: "text-sm text-muted-foreground",
            children:
              e.min !== null || e.max !== null ? `${i}${e.min || r} - ${i}${e.max || n}` : m,
          }),
          o.jsx("button", {
            type: "button",
            onClick: T,
            className: "text-xs text-muted-foreground hover:text-foreground",
            children: f,
          }),
        ],
      }),
    ],
  });
}
function wt(e = { min: null, max: null }) {
  const [t, r] = c.useState(e),
    n = c.useCallback((s) => {
      r(s);
    }, []),
    a = c.useCallback(() => {
      r({ min: null, max: null });
    }, []),
    i = t.min !== null || t.max !== null;
  return { range: t, setPriceRange: n, clearRange: a, isRangeSet: i };
}
try {
  ((nt.displayName = "PriceRangeSlider"),
    (nt.__docgenInfo = {
      description: "",
      displayName: "PriceRangeSlider",
      props: {
        value: {
          defaultValue: null,
          description: "",
          name: "value",
          required: !0,
          type: { name: "PriceRange" },
        },
        onChange: {
          defaultValue: null,
          description: "",
          name: "onChange",
          required: !0,
          type: { name: "(range: PriceRange) => void" },
        },
        min: {
          defaultValue: null,
          description: "",
          name: "min",
          required: !0,
          type: { name: "number" },
        },
        max: {
          defaultValue: null,
          description: "",
          name: "max",
          required: !0,
          type: { name: "number" },
        },
        step: {
          defaultValue: null,
          description: "",
          name: "step",
          required: !0,
          type: { name: "number" },
        },
        currency: {
          defaultValue: null,
          description: "",
          name: "currency",
          required: !0,
          type: { name: "string" },
        },
        priceRangeLabel: {
          defaultValue: null,
          description: "",
          name: "priceRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        minLabel: {
          defaultValue: null,
          description: "",
          name: "minLabel",
          required: !0,
          type: { name: "string" },
        },
        maxLabel: {
          defaultValue: null,
          description: "",
          name: "maxLabel",
          required: !0,
          type: { name: "string" },
        },
        anyPriceLabel: {
          defaultValue: null,
          description: "",
          name: "anyPriceLabel",
          required: !0,
          type: { name: "string" },
        },
        clearLabel: {
          defaultValue: null,
          description: "",
          name: "clearLabel",
          required: !0,
          type: { name: "string" },
        },
        minAriaLabel: {
          defaultValue: null,
          description: "",
          name: "minAriaLabel",
          required: !0,
          type: { name: "string" },
        },
        maxAriaLabel: {
          defaultValue: null,
          description: "",
          name: "maxAriaLabel",
          required: !0,
          type: { name: "string" },
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
try {
  ((wt.displayName = "usePriceRange"),
    (wt.__docgenInfo = {
      description: "",
      displayName: "usePriceRange",
      props: {
        min: {
          defaultValue: null,
          description: "",
          name: "min",
          required: !0,
          type: { name: "number | null" },
        },
        max: {
          defaultValue: null,
          description: "",
          name: "max",
          required: !0,
          type: { name: "number | null" },
        },
      },
    }));
} catch {}
function Ma(e, t) {
  const [r, n] = c.useState(e);
  return (
    c.useEffect(() => {
      const a = setTimeout(() => {
        n(e);
      }, t);
      return () => {
        clearTimeout(a);
      };
    }, [e, t]),
    r
  );
}
function at({
  value: e,
  onChange: t,
  onClear: r,
  placeholder: n,
  showClearButton: a = !0,
  debounceMs: i = 300,
  className: s,
  id: l,
  name: u,
  ...m
}) {
  const f = c.useId(),
    w = l || f,
    v = u || `search-input-${w}`;
  if (!n || n.trim() === "")
    throw new Error('SearchInput: "placeholder" prop is required and cannot be empty');
  const [g, h] = c.useState(e),
    d = Ma(g, i);
  (c.useEffect(() => {
    h(e);
  }, [e]),
    c.useEffect(() => {
      t(d);
    }, [d, t]));
  const b = (p) => {
      const y = p.target.value;
      h(y);
    },
    _ = () => {
      (h(""), t(""), r == null || r());
    };
  return o.jsxs("div", {
    className: F("relative", s),
    children: [
      o.jsx(Ur, {
        className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
        "aria-hidden": "true",
      }),
      o.jsx(Ue, {
        ...m,
        id: w,
        name: v,
        value: g,
        onChange: b,
        placeholder: n,
        className: "pl-10 pr-10",
      }),
      a &&
        g &&
        o.jsx(Ne, {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2",
          onClick: _,
          "aria-label": "Clear search",
          children: o.jsx(Fr, { className: "h-3 w-3", "aria-hidden": "true" }),
        }),
    ],
  });
}
function bt(e = "") {
  const [t, r] = c.useState(e),
    [n, a] = c.useState(e);
  c.useEffect(() => {
    const s = setTimeout(() => {
      a(t);
    }, 300);
    return () => clearTimeout(s);
  }, [t]);
  const i = c.useCallback(() => {
    (r(""), a(""));
  }, []);
  return { search: t, debouncedSearch: n, setSearch: r, clearSearch: i };
}
try {
  ((at.displayName = "SearchInput"),
    (at.__docgenInfo = {
      description: "",
      displayName: "SearchInput",
      props: {
        value: {
          defaultValue: null,
          description: "",
          name: "value",
          required: !0,
          type: { name: "string" },
        },
        onChange: {
          defaultValue: null,
          description: "",
          name: "onChange",
          required: !0,
          type: { name: "(value: string) => void" },
        },
        onClear: {
          defaultValue: null,
          description: "",
          name: "onClear",
          required: !1,
          type: { name: "(() => void) | undefined" },
        },
        placeholder: {
          defaultValue: null,
          description: "",
          name: "placeholder",
          required: !0,
          type: { name: "string" },
        },
        showClearButton: {
          defaultValue: { value: "true" },
          description: "",
          name: "showClearButton",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        debounceMs: {
          defaultValue: { value: "300" },
          description: "",
          name: "debounceMs",
          required: !1,
          type: { name: "number | undefined" },
        },
      },
    }));
} catch {}
try {
  ((bt.displayName = "useSearch"),
    (bt.__docgenInfo = { description: "", displayName: "useSearch", props: {} }));
} catch {}
const Da = () => (
  console.warn(
    "useFilterManager: This is a mock implementation. Use the actual hook from apps/web/src/stores/useFiltersStore",
  ),
  {
    search: "",
    category: "",
    tags: [],
    dateRange: { start: null, end: null },
    priceRange: { min: null, max: null },
    sortBy: "date",
    sortOrder: "desc",
    setSearch: (e) => {},
    setCategory: (e) => {},
    setTags: (e) => {},
    addTag: (e) => {},
    removeTag: (e) => {},
    setDateRange: (e, t) => {},
    setPriceRange: (e, t) => {},
    setSorting: (e, t) => {},
    resetFilters: () => {},
    getActiveFiltersCount: () => 0,
    getFilterSummary: () => [],
    hasActiveFilters: !1,
    clearAllFilters: () => {},
  }
);
function xe({
  className: e,
  showSearch: t = !0,
  showCategory: r = !0,
  showDateRange: n = !0,
  showPriceRange: a = !0,
  showSorting: i = !0,
  categories: s = [],
  sortOptions: l,
  searchPlaceholder: u,
  filtersLabel: m,
  clearAllLabel: f,
  categoryLabel: w,
  allCategoriesLabel: v,
  dateRangeLabel: g,
  anyDateLabel: h,
  dateSelectDateRangeLabel: d,
  dateClearLabel: b,
  dateCloseLabel: _,
  sortByLabel: p,
  sortAscLabel: y,
  sortDescLabel: I,
  sortByPlaceholder: j,
  activeFiltersLabel: G,
  priceRangeLabel: T,
  priceMinLabel: E,
  priceMaxLabel: A,
  priceAnyLabel: W,
  priceClearLabel: k,
  priceMinAriaLabel: P,
  priceMaxAriaLabel: R,
  onFiltersChange: C,
}) {
  if (!l || l.length === 0)
    throw new Error('FilterBar: "sortOptions" prop is required and cannot be empty');
  if (!u || u.trim() === "")
    throw new Error('FilterBar: "searchPlaceholder" prop is required and cannot be empty');
  if (!m || m.trim() === "")
    throw new Error('FilterBar: "filtersLabel" prop is required and cannot be empty');
  if (!f || f.trim() === "")
    throw new Error('FilterBar: "clearAllLabel" prop is required and cannot be empty');
  if (!w || w.trim() === "")
    throw new Error('FilterBar: "categoryLabel" prop is required and cannot be empty');
  if (!v || v.trim() === "")
    throw new Error('FilterBar: "allCategoriesLabel" prop is required and cannot be empty');
  if (!g || g.trim() === "")
    throw new Error('FilterBar: "dateRangeLabel" prop is required and cannot be empty');
  if (!h || h.trim() === "")
    throw new Error('FilterBar: "anyDateLabel" prop is required and cannot be empty');
  if (!d || d.trim() === "")
    throw new Error('FilterBar: "dateSelectDateRangeLabel" prop is required and cannot be empty');
  if (!b || b.trim() === "")
    throw new Error('FilterBar: "dateClearLabel" prop is required and cannot be empty');
  if (!_ || _.trim() === "")
    throw new Error('FilterBar: "dateCloseLabel" prop is required and cannot be empty');
  if (!p || p.trim() === "")
    throw new Error('FilterBar: "sortByLabel" prop is required and cannot be empty');
  if (!y || y.trim() === "")
    throw new Error('FilterBar: "sortAscLabel" prop is required and cannot be empty');
  if (!I || I.trim() === "")
    throw new Error('FilterBar: "sortDescLabel" prop is required and cannot be empty');
  if (!j || j.trim() === "")
    throw new Error('FilterBar: "sortByPlaceholder" prop is required and cannot be empty');
  if (!G || G.trim() === "")
    throw new Error('FilterBar: "activeFiltersLabel" prop is required and cannot be empty');
  if (!T || T.trim() === "")
    throw new Error('FilterBar: "priceRangeLabel" prop is required and cannot be empty');
  if (!E || E.trim() === "")
    throw new Error('FilterBar: "priceMinLabel" prop is required and cannot be empty');
  if (!A || A.trim() === "")
    throw new Error('FilterBar: "priceMaxLabel" prop is required and cannot be empty');
  if (!W || W.trim() === "")
    throw new Error('FilterBar: "priceAnyLabel" prop is required and cannot be empty');
  if (!k || k.trim() === "")
    throw new Error('FilterBar: "priceClearLabel" prop is required and cannot be empty');
  if (!P || P.trim() === "")
    throw new Error('FilterBar: "priceMinAriaLabel" prop is required and cannot be empty');
  if (!R || R.trim() === "")
    throw new Error('FilterBar: "priceMaxAriaLabel" prop is required and cannot be empty');
  const {
    search: M,
    category: V,
    dateRange: B,
    priceRange: H,
    sortBy: U,
    sortOrder: re,
    setSearch: de,
    setCategory: fe,
    setDateRange: he,
    setPriceRange: z,
    hasActiveFilters: ne,
  } = Da();
  c.useEffect(() => {
    C && C({ search: M, category: V, dateRange: B, priceRange: H, sortBy: U, sortOrder: re });
  }, [M, V, B, H, U, re, C]);
  const ae = (S) => {
      he(S.from || null, S.to || null);
    },
    x = (S) => {
      z(S.min, S.max);
    };
  return o.jsxs("div", {
    className: F("space-y-md", e),
    children: [
      o.jsxs("div", {
        className: "flex flex-col gap-md sm:flex-row",
        children: [
          t &&
            o.jsx("div", {
              className: "flex-1",
              children: o.jsx(at, { value: M, onChange: de, placeholder: u }),
            }),
          ne,
        ],
      }),
      o.jsxs("div", {
        className: "grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4",
        children: [
          r &&
            s.length > 0 &&
            o.jsx(Ee, { value: V, onValueChange: fe, options: s, label: w, placeholder: v }),
          n &&
            o.jsxs("div", {
              className: "space-y-sm",
              children: [
                o.jsx("label", {
                  className:
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  children: g,
                }),
                o.jsx(Ge, {
                  value: { from: B.start || void 0, to: B.end || void 0 },
                  onChange: ae,
                  placeholder: h,
                  selectDateRangeLabel: d,
                  clearLabel: b,
                  closeLabel: _,
                }),
              ],
            }),
          a &&
            o.jsx(nt, {
              value: H,
              onChange: x,
              min: 0,
              max: 500,
              step: 10,
              currency: "€",
              priceRangeLabel: T,
              minLabel: E,
              maxLabel: A,
              anyPriceLabel: W,
              clearLabel: k,
              minAriaLabel: P,
              maxAriaLabel: R,
            }),
          i &&
            o.jsxs("div", {
              className: "space-y-sm",
              children: [
                o.jsx("label", {
                  className:
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  children: p,
                }),
                o.jsx(Ee, {
                  value: `${U}-${re}`,
                  onValueChange: (S) => {
                    const [Y, q] = S.split("-");
                  },
                  options: l
                    .map((S) => ({ value: `${S.value}-asc`, label: `${S.label} ${y}` }))
                    .concat(l.map((S) => ({ value: `${S.value}-desc`, label: `${S.label} ${I}` }))),
                  placeholder: j,
                }),
              ],
            }),
        ],
      }),
      ne,
    ],
  });
}
function xt({ className: e, ...t }) {
  return o.jsx(xe, { className: F("space-y-sm", e), ...t });
}
try {
  ((xe.displayName = "FilterBar"),
    (xe.__docgenInfo = {
      description: "",
      displayName: "FilterBar",
      props: {
        className: {
          defaultValue: null,
          description: "",
          name: "className",
          required: !1,
          type: { name: "string | undefined" },
        },
        showSearch: {
          defaultValue: { value: "true" },
          description: "",
          name: "showSearch",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showCategory: {
          defaultValue: { value: "true" },
          description: "",
          name: "showCategory",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showDateRange: {
          defaultValue: { value: "true" },
          description: "",
          name: "showDateRange",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showPriceRange: {
          defaultValue: { value: "true" },
          description: "",
          name: "showPriceRange",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showSorting: {
          defaultValue: { value: "true" },
          description: "",
          name: "showSorting",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        categories: {
          defaultValue: { value: "[]" },
          description: "",
          name: "categories",
          required: !1,
          type: {
            name: "{ value: string; label: string; count?: number | undefined; }[] | undefined",
          },
        },
        sortOptions: {
          defaultValue: null,
          description: "",
          name: "sortOptions",
          required: !0,
          type: { name: "{ value: string; label: string; }[]" },
        },
        searchPlaceholder: {
          defaultValue: null,
          description: "",
          name: "searchPlaceholder",
          required: !0,
          type: { name: "string" },
        },
        filtersLabel: {
          defaultValue: null,
          description: "",
          name: "filtersLabel",
          required: !0,
          type: { name: "string" },
        },
        clearAllLabel: {
          defaultValue: null,
          description: "",
          name: "clearAllLabel",
          required: !0,
          type: { name: "string" },
        },
        categoryLabel: {
          defaultValue: null,
          description: "",
          name: "categoryLabel",
          required: !0,
          type: { name: "string" },
        },
        allCategoriesLabel: {
          defaultValue: null,
          description: "",
          name: "allCategoriesLabel",
          required: !0,
          type: { name: "string" },
        },
        dateRangeLabel: {
          defaultValue: null,
          description: "",
          name: "dateRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        anyDateLabel: {
          defaultValue: null,
          description: "",
          name: "anyDateLabel",
          required: !0,
          type: { name: "string" },
        },
        dateSelectDateRangeLabel: {
          defaultValue: null,
          description: "",
          name: "dateSelectDateRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        dateClearLabel: {
          defaultValue: null,
          description: "",
          name: "dateClearLabel",
          required: !0,
          type: { name: "string" },
        },
        dateCloseLabel: {
          defaultValue: null,
          description: "",
          name: "dateCloseLabel",
          required: !0,
          type: { name: "string" },
        },
        sortByLabel: {
          defaultValue: null,
          description: "",
          name: "sortByLabel",
          required: !0,
          type: { name: "string" },
        },
        sortAscLabel: {
          defaultValue: null,
          description: "",
          name: "sortAscLabel",
          required: !0,
          type: { name: "string" },
        },
        sortDescLabel: {
          defaultValue: null,
          description: "",
          name: "sortDescLabel",
          required: !0,
          type: { name: "string" },
        },
        sortByPlaceholder: {
          defaultValue: null,
          description: "",
          name: "sortByPlaceholder",
          required: !0,
          type: { name: "string" },
        },
        activeFiltersLabel: {
          defaultValue: null,
          description: "",
          name: "activeFiltersLabel",
          required: !0,
          type: { name: "string" },
        },
        priceRangeLabel: {
          defaultValue: null,
          description: "",
          name: "priceRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMinLabel: {
          defaultValue: null,
          description: "",
          name: "priceMinLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMaxLabel: {
          defaultValue: null,
          description: "",
          name: "priceMaxLabel",
          required: !0,
          type: { name: "string" },
        },
        priceAnyLabel: {
          defaultValue: null,
          description: "",
          name: "priceAnyLabel",
          required: !0,
          type: { name: "string" },
        },
        priceClearLabel: {
          defaultValue: null,
          description: "",
          name: "priceClearLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMinAriaLabel: {
          defaultValue: null,
          description: "",
          name: "priceMinAriaLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMaxAriaLabel: {
          defaultValue: null,
          description: "",
          name: "priceMaxAriaLabel",
          required: !0,
          type: { name: "string" },
        },
        onFiltersChange: {
          defaultValue: null,
          description: "",
          name: "onFiltersChange",
          required: !1,
          type: {
            name: '((filters: { search: string; category: string; dateRange: { start: Date | null; end: Date | null; }; priceRange: { min: number | null; max: number | null; }; sortBy: string; sortOrder: "desc" | "asc"; }) => void) | undefined',
          },
        },
      },
    }));
} catch {}
try {
  ((xt.displayName = "FilterBarCompact"),
    (xt.__docgenInfo = {
      description: "",
      displayName: "FilterBarCompact",
      props: {
        className: {
          defaultValue: null,
          description: "",
          name: "className",
          required: !1,
          type: { name: "string | undefined" },
        },
        showSearch: {
          defaultValue: null,
          description: "",
          name: "showSearch",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showCategory: {
          defaultValue: null,
          description: "",
          name: "showCategory",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showDateRange: {
          defaultValue: null,
          description: "",
          name: "showDateRange",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showPriceRange: {
          defaultValue: null,
          description: "",
          name: "showPriceRange",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        showSorting: {
          defaultValue: null,
          description: "",
          name: "showSorting",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        categories: {
          defaultValue: null,
          description: "",
          name: "categories",
          required: !1,
          type: {
            name: "{ value: string; label: string; count?: number | undefined; }[] | undefined",
          },
        },
        sortOptions: {
          defaultValue: null,
          description: "",
          name: "sortOptions",
          required: !0,
          type: { name: "{ value: string; label: string; }[]" },
        },
        searchPlaceholder: {
          defaultValue: null,
          description: "",
          name: "searchPlaceholder",
          required: !0,
          type: { name: "string" },
        },
        filtersLabel: {
          defaultValue: null,
          description: "",
          name: "filtersLabel",
          required: !0,
          type: { name: "string" },
        },
        clearAllLabel: {
          defaultValue: null,
          description: "",
          name: "clearAllLabel",
          required: !0,
          type: { name: "string" },
        },
        categoryLabel: {
          defaultValue: null,
          description: "",
          name: "categoryLabel",
          required: !0,
          type: { name: "string" },
        },
        allCategoriesLabel: {
          defaultValue: null,
          description: "",
          name: "allCategoriesLabel",
          required: !0,
          type: { name: "string" },
        },
        dateRangeLabel: {
          defaultValue: null,
          description: "",
          name: "dateRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        anyDateLabel: {
          defaultValue: null,
          description: "",
          name: "anyDateLabel",
          required: !0,
          type: { name: "string" },
        },
        dateSelectDateRangeLabel: {
          defaultValue: null,
          description: "",
          name: "dateSelectDateRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        dateClearLabel: {
          defaultValue: null,
          description: "",
          name: "dateClearLabel",
          required: !0,
          type: { name: "string" },
        },
        dateCloseLabel: {
          defaultValue: null,
          description: "",
          name: "dateCloseLabel",
          required: !0,
          type: { name: "string" },
        },
        sortByLabel: {
          defaultValue: null,
          description: "",
          name: "sortByLabel",
          required: !0,
          type: { name: "string" },
        },
        sortAscLabel: {
          defaultValue: null,
          description: "",
          name: "sortAscLabel",
          required: !0,
          type: { name: "string" },
        },
        sortDescLabel: {
          defaultValue: null,
          description: "",
          name: "sortDescLabel",
          required: !0,
          type: { name: "string" },
        },
        sortByPlaceholder: {
          defaultValue: null,
          description: "",
          name: "sortByPlaceholder",
          required: !0,
          type: { name: "string" },
        },
        activeFiltersLabel: {
          defaultValue: null,
          description: "",
          name: "activeFiltersLabel",
          required: !0,
          type: { name: "string" },
        },
        priceRangeLabel: {
          defaultValue: null,
          description: "",
          name: "priceRangeLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMinLabel: {
          defaultValue: null,
          description: "",
          name: "priceMinLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMaxLabel: {
          defaultValue: null,
          description: "",
          name: "priceMaxLabel",
          required: !0,
          type: { name: "string" },
        },
        priceAnyLabel: {
          defaultValue: null,
          description: "",
          name: "priceAnyLabel",
          required: !0,
          type: { name: "string" },
        },
        priceClearLabel: {
          defaultValue: null,
          description: "",
          name: "priceClearLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMinAriaLabel: {
          defaultValue: null,
          description: "",
          name: "priceMinAriaLabel",
          required: !0,
          type: { name: "string" },
        },
        priceMaxAriaLabel: {
          defaultValue: null,
          description: "",
          name: "priceMaxAriaLabel",
          required: !0,
          type: { name: "string" },
        },
        onFiltersChange: {
          defaultValue: null,
          description: "",
          name: "onFiltersChange",
          required: !1,
          type: {
            name: '((filters: { search: string; category: string; dateRange: { start: Date | null; end: Date | null; }; priceRange: { min: number | null; max: number | null; }; sortBy: string; sortOrder: "desc" | "asc"; }) => void) | undefined',
          },
        },
      },
    }));
} catch {}
const Ka = {
    title: "Filters/FilterBar",
    component: xe,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
  },
  st = [
    { value: "music", label: "Music", count: 45 },
    { value: "dance", label: "Dance", count: 23 },
    { value: "jazz", label: "Jazz", count: 12 },
    { value: "rock", label: "Rock", count: 18 },
    { value: "electronic", label: "Electronic", count: 31 },
  ],
  La = [
    { value: "date", label: "Date" },
    { value: "price", label: "Price" },
    { value: "name", label: "Name" },
    { value: "popularity", label: "Popularity" },
  ],
  Fe = {
    sortOptions: La,
    searchPlaceholder: "Search...",
    filtersLabel: "active filters",
    clearAllLabel: "Clear all",
    categoryLabel: "Category",
    allCategoriesLabel: "All categories",
    dateRangeLabel: "Date range",
    anyDateLabel: "Any date",
    dateSelectDateRangeLabel: "Select date range",
    dateClearLabel: "Clear",
    dateCloseLabel: "Close",
    sortByLabel: "Sort by",
    sortAscLabel: "(Ascending)",
    sortDescLabel: "(Descending)",
    sortByPlaceholder: "Select sort option",
    activeFiltersLabel: "Active filters",
    priceRangeLabel: "Price range",
    priceMinLabel: "Min price",
    priceMaxLabel: "Max price",
    priceAnyLabel: "Any price",
    priceClearLabel: "Clear",
    priceMinAriaLabel: "Minimum price",
    priceMaxAriaLabel: "Maximum price",
  },
  ve = {
    args: {
      categories: st,
      showSearch: !0,
      showCategory: !0,
      showDateRange: !0,
      showPriceRange: !0,
      showSorting: !0,
      ...Fe,
    },
  },
  Se = {
    args: {
      showSearch: !0,
      showCategory: !1,
      showDateRange: !1,
      showPriceRange: !1,
      showSorting: !1,
      ...Fe,
    },
  },
  _e = {
    args: {
      categories: st,
      showSearch: !0,
      showCategory: !0,
      showDateRange: !0,
      showPriceRange: !1,
      showSorting: !0,
      ...Fe,
    },
  },
  Ce = {
    render: () =>
      o.jsx("div", {
        className: "max-w-md",
        children: o.jsx(xe, {
          categories: st,
          showSearch: !0,
          showCategory: !0,
          showDateRange: !1,
          showPriceRange: !1,
          showSorting: !0,
          ...Fe,
        }),
      }),
  };
var vt, St, _t;
ve.parameters = {
  ...ve.parameters,
  docs: {
    ...((vt = ve.parameters) == null ? void 0 : vt.docs),
    source: {
      originalSource: `{
  args: {
    categories: mockCategories,
    showSearch: true,
    showCategory: true,
    showDateRange: true,
    showPriceRange: true,
    showSorting: true,
    ...defaultLabels
  }
}`,
      ...((_t = (St = ve.parameters) == null ? void 0 : St.docs) == null ? void 0 : _t.source),
    },
  },
};
var Ct, Nt, Pt;
Se.parameters = {
  ...Se.parameters,
  docs: {
    ...((Ct = Se.parameters) == null ? void 0 : Ct.docs),
    source: {
      originalSource: `{
  args: {
    showSearch: true,
    showCategory: false,
    showDateRange: false,
    showPriceRange: false,
    showSorting: false,
    ...defaultLabels
  }
}`,
      ...((Pt = (Nt = Se.parameters) == null ? void 0 : Nt.docs) == null ? void 0 : Pt.source),
    },
  },
};
var Rt, Mt, Dt;
_e.parameters = {
  ..._e.parameters,
  docs: {
    ...((Rt = _e.parameters) == null ? void 0 : Rt.docs),
    source: {
      originalSource: `{
  args: {
    categories: mockCategories,
    showSearch: true,
    showCategory: true,
    showDateRange: true,
    showPriceRange: false,
    showSorting: true,
    ...defaultLabels
  }
}`,
      ...((Dt = (Mt = _e.parameters) == null ? void 0 : Mt.docs) == null ? void 0 : Dt.source),
    },
  },
};
var Lt, qt, Tt;
Ce.parameters = {
  ...Ce.parameters,
  docs: {
    ...((Lt = Ce.parameters) == null ? void 0 : Lt.docs),
    source: {
      originalSource: `{
  render: () => <div className="max-w-md">
      <FilterBar categories={mockCategories} showSearch={true} showCategory={true} showDateRange={false} showPriceRange={false} showSorting={true} {...defaultLabels} />
    </div>
}`,
      ...((Tt = (qt = Ce.parameters) == null ? void 0 : qt.docs) == null ? void 0 : Tt.source),
    },
  },
};
const za = ["Default", "SearchOnly", "WithoutPriceRange", "Compact"];
export {
  Ce as Compact,
  ve as Default,
  Se as SearchOnly,
  _e as WithoutPriceRange,
  za as __namedExportsOrder,
  Ka as default,
};
