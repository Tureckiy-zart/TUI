#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const MIN_CONTRAST = 4.5;

const moduleUrl = pathToFileURL(path.resolve(process.cwd(), "src/tokens/colors.ts")).href;

const { textColors, surfaceColors, semanticColors, primaryColors, accentColors } = await import(
  moduleUrl
);

const contrastPairs = [
  // Day mode text vs surfaces
  {
    name: "day:text.primary on surface.base",
    foreground: textColors.day.primary,
    background: surfaceColors.day.base,
  },
  {
    name: "day:text.secondary on surface.elevated1",
    foreground: textColors.day.secondary,
    background: surfaceColors.day.elevated1,
  },
  {
    name: "day:text.muted on surface.elevated2",
    foreground: textColors.day.muted,
    background: surfaceColors.day.elevated2,
  },
  // Night mode text vs surfaces
  {
    name: "night:text.primary on surface.base",
    foreground: textColors.night.primary,
    background: surfaceColors.night.base,
  },
  {
    name: "night:text.secondary on surface.elevated1",
    foreground: textColors.night.secondary,
    background: surfaceColors.night.elevated1,
  },
  {
    name: "night:text.muted on surface.elevated2",
    foreground: textColors.night.muted,
    background: surfaceColors.night.elevated2,
  },
  // Brand buttons
  {
    name: "day:primary button text",
    foreground: textColors.day.inverse,
    background: primaryColors[500],
  },
  {
    name: "day:accent button text",
    foreground: textColors.day.inverse,
    background: accentColors[600],
  },
  {
    name: "night:primary button text",
    foreground: textColors.night.inverse,
    background: primaryColors[100],
  },
  {
    name: "night:accent button text",
    foreground: textColors.night.inverse,
    background: accentColors[500],
  },
  // Semantic statuses
  {
    name: "day:success badge",
    foreground: semanticColors.day.successForeground,
    background: semanticColors.day.success,
  },
  {
    name: "day:error badge",
    foreground: semanticColors.day.errorForeground,
    background: semanticColors.day.error,
  },
  {
    name: "night:warning badge",
    foreground: semanticColors.night.warningForeground,
    background: semanticColors.night.warning,
  },
  {
    name: "night:info badge",
    foreground: semanticColors.night.infoForeground,
    background: semanticColors.night.info,
  },
];

const failedPairs = [];

for (const pair of contrastPairs) {
  const fg = parseHsl(pair.foreground);
  const bg = parseHsl(pair.background);

  if (!fg || !bg) {
    console.warn(`[a11y:contrast] Skipping ${pair.name} because it uses unsupported color format.`);
    continue;
  }

  const ratio = getContrastRatio(fg, bg);

  if (ratio < MIN_CONTRAST) {
    failedPairs.push({ ...pair, ratio });
  }
}

if (failedPairs.length > 0) {
  console.error("❌ Accessibility contrast violations detected:");
  for (const failure of failedPairs) {
    console.error(` - ${failure.name}: ${failure.ratio.toFixed(2)} (expected ≥ ${MIN_CONTRAST})`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `✅ All ${contrastPairs.length} token pairs meet WCAG AA (${MIN_CONTRAST}:1) contrast.`,
  );
}

function parseHsl(value) {
  if (!value || value.includes("/")) {
    return null;
  }

  const parts = value.trim().split(/\s+/);
  if (parts.length < 3) {
    return null;
  }

  const [hRaw, sRaw, lRaw] = parts;
  const h = ((parseFloat(hRaw) % 360) + 360) % 360;
  const s = parseFloat(sRaw.replace("%", "")) / 100;
  const l = parseFloat(lRaw.replace("%", "")) / 100;

  return hslToRgb(h, s, l);
}

function hslToRgb(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return color;
  };

  return [f(0), f(8), f(4)];
}

function relativeLuminance([r, g, b]) {
  const convert = (value) =>
    value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

  const [sr, sg, sb] = [convert(r), convert(g), convert(b)];
  return 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
}

function getContrastRatio(foreground, background) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}
