#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const MIN_CONTRAST = 4.5;
const MIN_CONTRAST_LARGE = 3.0; // For large text (18pt+ or 14pt+ bold)

const colorsModuleUrl = pathToFileURL(
  path.resolve(process.cwd(), "src/FOUNDATION/tokens/colors.ts"),
).href;

const statesModuleUrl = pathToFileURL(
  path.resolve(process.cwd(), "src/FOUNDATION/tokens/states.ts"),
).href;

const {
  textColors,
  surfaceColors,
  semanticColors,
  primaryColors,
  accentColors,
  secondaryColors,
  baseColors,
} = await import(colorsModuleUrl);

const { getButtonStateMatrix } = await import(statesModuleUrl);

// Runtime token resolution helpers (matching states.ts logic)
function getLightness(hsl) {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3 || !parts[2]) {
    return 0;
  }
  const lRaw = parts[2];
  return parseFloat(lRaw.replace("%", ""));
}

function isLightBackground(hsl) {
  return getLightness(hsl) > 50;
}

function selectTextColorByBackground(background, foreground, inverse, mode) {
  if (isLightBackground(background)) {
    // Light background needs dark text
    return mode === "day" ? foreground : inverse;
  } else {
    // Dark background needs light text
    return mode === "day" ? inverse : foreground;
  }
}

const contrastPairs = [];

// Helper to add contrast pair
function addPair(name, foreground, background, isLargeText = false) {
  contrastPairs.push({
    name,
    foreground,
    background,
    minContrast: isLargeText ? MIN_CONTRAST_LARGE : MIN_CONTRAST,
  });
}

// Day mode text vs surfaces
addPair("day:text.primary on surface.base", textColors.day.primary, surfaceColors.day.base);
addPair(
  "day:text.secondary on surface.elevated1",
  textColors.day.secondary,
  surfaceColors.day.elevated1,
);
addPair("day:text.muted on surface.elevated2", textColors.day.muted, surfaceColors.day.elevated2);

// Night mode text vs surfaces
addPair("night:text.primary on surface.base", textColors.night.primary, surfaceColors.night.base);
addPair(
  "night:text.secondary on surface.elevated1",
  textColors.night.secondary,
  surfaceColors.night.elevated1,
);
addPair(
  "night:text.muted on surface.elevated2",
  textColors.night.muted,
  surfaceColors.night.elevated2,
);

// Button states - Day mode
// Use getButtonStateMatrix to get actual colors from states.ts
const dayButtonStates = getButtonStateMatrix("day", baseColors.day, surfaceColors.day);

// Primary button - Day
addPair(
  "day:button.primary.base text",
  textColors.day.inverse,
  dayButtonStates.button.primary.base.background,
  true,
);
addPair(
  "day:button.primary.hover text",
  dayButtonStates.button.primary.hover.text || textColors.day.inverse,
  dayButtonStates.button.primary.hover.background,
  true,
);
addPair(
  "day:button.primary.active text",
  dayButtonStates.button.primary.active.text || textColors.day.inverse,
  dayButtonStates.button.primary.active.background,
  true,
);
addPair(
  "day:button.primary.disabled text",
  dayButtonStates.button.primary.disabled.text,
  dayButtonStates.button.primary.disabled.background,
);

// Secondary button - Day
addPair(
  "day:button.secondary.base text",
  baseColors.day.foreground,
  dayButtonStates.button.secondary.base.background,
  true,
);
addPair(
  "day:button.secondary.hover text",
  baseColors.day.foreground,
  dayButtonStates.button.secondary.hover.background,
  true,
);
addPair(
  "day:button.secondary.active text",
  dayButtonStates.button.secondary.active.text || baseColors.day.foreground,
  dayButtonStates.button.secondary.active.background,
  true,
);
addPair(
  "day:button.secondary.disabled text",
  dayButtonStates.button.secondary.disabled.text,
  dayButtonStates.button.secondary.disabled.background,
);

// Accent button - Day
addPair("day:button.accent.base text", textColors.day.inverse, accentColors[600], true);
addPair(
  "day:button.accent.hover text",
  textColors.day.inverse,
  dayButtonStates.button.accent.hover.background,
  true,
);
addPair(
  "day:button.accent.active text",
  textColors.day.inverse,
  dayButtonStates.button.accent.active.background,
  true,
);
addPair(
  "day:button.accent.disabled text",
  dayButtonStates.button.accent.disabled.text,
  dayButtonStates.button.accent.disabled.background,
);

// Outline button - Day (text on background)
addPair("day:button.outline.base text", baseColors.day.foreground, baseColors.day.background);
addPair(
  "day:button.outline.hover text",
  dayButtonStates.button.outline.hover.text,
  dayButtonStates.button.outline.hover.background,
  true,
);
addPair(
  "day:button.outline.active text",
  dayButtonStates.button.outline.active.text,
  dayButtonStates.button.outline.active.background,
  true,
);
addPair("day:button.outline.disabled text", baseColors.day.foreground, baseColors.day.background);

// Ghost button - Day (transparent background uses surface.base)
addPair("day:button.ghost.base text", baseColors.day.foreground, surfaceColors.day.base);
addPair("day:button.ghost.hover text", baseColors.day.foreground, surfaceColors.day.elevated1);
addPair("day:button.ghost.active text", baseColors.day.foreground, surfaceColors.day.elevated2);
addPair("day:button.ghost.disabled text", baseColors.day.foreground, surfaceColors.day.base);

// Destructive button - Day
const dayDestructiveBg = semanticColors.day.error;
const dayDestructiveText = semanticColors.day.errorForeground;
addPair("day:button.destructive.base text", dayDestructiveText, dayDestructiveBg, true);
addPair("day:button.destructive.hover text", dayDestructiveText, dayDestructiveBg, true);
addPair("day:button.destructive.active text", dayDestructiveText, dayDestructiveBg, true);
addPair("day:button.destructive.disabled text", dayDestructiveText, dayDestructiveBg);

// Button states - Night mode
// Use getButtonStateMatrix to get actual colors from states.ts
const nightButtonStates = getButtonStateMatrix("night", baseColors.night, surfaceColors.night);

// Primary button - Night
addPair(
  "night:button.primary.base text",
  textColors.night.inverse,
  nightButtonStates.button.primary.base.background,
  true,
);
addPair(
  "night:button.primary.hover text",
  nightButtonStates.button.primary.hover.text || textColors.night.inverse,
  nightButtonStates.button.primary.hover.background,
  true,
);
addPair(
  "night:button.primary.active text",
  nightButtonStates.button.primary.active.text || textColors.night.inverse,
  nightButtonStates.button.primary.active.background,
  true,
);
addPair(
  "night:button.primary.disabled text",
  nightButtonStates.button.primary.disabled.text,
  nightButtonStates.button.primary.disabled.background,
);

// Secondary button - Night
// Use runtime text from state matrix (already uses selectTextColorByBackground)
addPair(
  "night:button.secondary.base text",
  nightButtonStates.button.secondary.base.text,
  nightButtonStates.button.secondary.base.background,
  true,
);
addPair(
  "night:button.secondary.hover text",
  nightButtonStates.button.secondary.hover.text,
  nightButtonStates.button.secondary.hover.background,
  true,
);
addPair(
  "night:button.secondary.active text",
  nightButtonStates.button.secondary.active.text,
  nightButtonStates.button.secondary.active.background,
  true,
);
addPair(
  "night:button.secondary.disabled text",
  nightButtonStates.button.secondary.disabled.text,
  nightButtonStates.button.secondary.disabled.background,
);

// Accent button - Night
// Use runtime text selection logic (selectTextColorByBackground) for proper contrast
addPair("night:button.accent.base text", textColors.night.inverse, accentColors[500], true);

const nightAccentHoverText =
  nightButtonStates.button.accent.hover.text ||
  selectTextColorByBackground(
    nightButtonStates.button.accent.hover.background,
    baseColors.night.foreground,
    textColors.night.inverse,
    "night",
  );
addPair(
  "night:button.accent.hover text",
  nightAccentHoverText,
  nightButtonStates.button.accent.hover.background,
  true,
);

const nightAccentActiveText =
  nightButtonStates.button.accent.active.text ||
  selectTextColorByBackground(
    nightButtonStates.button.accent.active.background,
    baseColors.night.foreground,
    textColors.night.inverse,
    "night",
  );
addPair(
  "night:button.accent.active text",
  nightAccentActiveText,
  nightButtonStates.button.accent.active.background,
  true,
);
addPair(
  "night:button.accent.disabled text",
  nightButtonStates.button.accent.disabled.text,
  nightButtonStates.button.accent.disabled.background,
);

// Outline button - Night
addPair("night:button.outline.base text", baseColors.night.foreground, baseColors.night.background);
addPair(
  "night:button.outline.hover text",
  nightButtonStates.button.outline.hover.text,
  nightButtonStates.button.outline.hover.background,
  true,
);
addPair(
  "night:button.outline.active text",
  nightButtonStates.button.outline.active.text,
  nightButtonStates.button.outline.active.background,
  true,
);
addPair(
  "night:button.outline.disabled text",
  baseColors.night.foreground,
  baseColors.night.background,
);

// Ghost button - Night (transparent background uses surface.base)
addPair("night:button.ghost.base text", baseColors.night.foreground, surfaceColors.night.base);
addPair(
  "night:button.ghost.hover text",
  baseColors.night.foreground,
  surfaceColors.night.elevated1,
);
addPair(
  "night:button.ghost.active text",
  baseColors.night.foreground,
  surfaceColors.night.elevated2,
);
addPair("night:button.ghost.disabled text", baseColors.night.foreground, surfaceColors.night.base);

// Destructive button - Night
const nightDestructiveBg = semanticColors.night.error;
const nightDestructiveText = semanticColors.night.errorForeground;
addPair("night:button.destructive.base text", nightDestructiveText, nightDestructiveBg, true);
addPair("night:button.destructive.hover text", nightDestructiveText, nightDestructiveBg, true);
addPair("night:button.destructive.active text", nightDestructiveText, nightDestructiveBg, true);
addPair("night:button.destructive.disabled text", nightDestructiveText, nightDestructiveBg);

// Link states - Day mode
// Links don't change color on hover per canon (hover effect is underline only)
// Base and hover use the same color (runtime behavior)
addPair("day:link.primary.base text", primaryColors[600], baseColors.day.background);
addPair("day:link.primary.hover text", primaryColors[600], baseColors.day.background); // Same as base (no color change on hover)
addPair("day:link.accent.base text", accentColors[600], baseColors.day.background);
addPair("day:link.accent.hover text", accentColors[600], baseColors.day.background); // Same as base (no color change on hover)
addPair("day:link.destructive.base text", semanticColors.day.error, baseColors.day.background);
addPair("day:link.destructive.hover text", semanticColors.day.error, baseColors.day.background); // Same as base (no color change on hover)

// Link states - Night mode
// Links don't change color on hover per canon (hover effect is underline only)
// Base and hover use the same color (runtime behavior)
addPair("night:link.primary.base text", primaryColors[100], baseColors.night.background);
addPair("night:link.primary.hover text", primaryColors[100], baseColors.night.background); // Same as base (no color change on hover)
addPair("night:link.accent.base text", accentColors[500], baseColors.night.background);
addPair("night:link.accent.hover text", accentColors[500], baseColors.night.background); // Same as base (no color change on hover)
addPair(
  "night:link.destructive.base text",
  semanticColors.night.error,
  baseColors.night.background,
);
addPair(
  "night:link.destructive.hover text",
  semanticColors.night.error,
  baseColors.night.background,
); // Same as base (no color change on hover)

// Input states - Day mode
addPair("day:input.base text", baseColors.day.foreground, baseColors.day.background);
addPair("day:input.focus text", baseColors.day.foreground, baseColors.day.background);
addPair("day:input.disabled text", baseColors.day.foreground, baseColors.day.background);
// Input error uses error color (dark red) for WCAG AA contrast on white background, not errorForeground (white)
addPair("day:input.error text", semanticColors.day.error, baseColors.day.background);

// Input states - Night mode
addPair("night:input.base text", baseColors.night.foreground, baseColors.night.background);
addPair("night:input.focus text", baseColors.night.foreground, baseColors.night.background);
addPair("night:input.disabled text", baseColors.night.foreground, baseColors.night.background);
addPair(
  "night:input.error text",
  semanticColors.night.errorForeground,
  baseColors.night.background,
);

// Toast variants - Day mode
addPair("day:toast.default text", baseColors.day.foreground, baseColors.day.background);
addPair(
  "day:toast.success text",
  semanticColors.day.successForeground,
  semanticColors.day.success,
  true,
);
addPair(
  "day:toast.warning text",
  semanticColors.day.warningForeground,
  semanticColors.day.warning,
  true,
);
addPair("day:toast.error text", semanticColors.day.errorForeground, semanticColors.day.error, true);

// Toast variants - Night mode
addPair("night:toast.default text", baseColors.night.foreground, baseColors.night.background);
addPair(
  "night:toast.success text",
  semanticColors.night.successForeground,
  semanticColors.night.success,
  true,
);
addPair(
  "night:toast.warning text",
  semanticColors.night.warningForeground,
  semanticColors.night.warning,
  true,
);
addPair(
  "night:toast.error text",
  semanticColors.night.errorForeground,
  semanticColors.night.error,
  true,
);

// Semantic statuses
addPair(
  "day:success badge",
  semanticColors.day.successForeground,
  semanticColors.day.success,
  true,
);
addPair("day:error badge", semanticColors.day.errorForeground, semanticColors.day.error, true);
addPair(
  "day:warning badge",
  semanticColors.day.warningForeground,
  semanticColors.day.warning,
  true,
);
addPair("day:info badge", semanticColors.day.infoForeground, semanticColors.day.info, true);
addPair(
  "night:success badge",
  semanticColors.night.successForeground,
  semanticColors.night.success,
  true,
);
addPair(
  "night:error badge",
  semanticColors.night.errorForeground,
  semanticColors.night.error,
  true,
);
addPair(
  "night:warning badge",
  semanticColors.night.warningForeground,
  semanticColors.night.warning,
  true,
);
addPair("night:info badge", semanticColors.night.infoForeground, semanticColors.night.info, true);

const failedPairs = [];
const passedPairs = [];

for (const pair of contrastPairs) {
  const fg = parseHsl(pair.foreground);
  const bg = parseHsl(pair.background);

  if (!fg || !bg) {
    console.warn(`[a11y:contrast] Skipping ${pair.name} because it uses unsupported color format.`);
    continue;
  }

  const ratio = getContrastRatio(fg, bg);
  const minRequired = pair.minContrast || MIN_CONTRAST;

  if (ratio < minRequired) {
    failedPairs.push({ ...pair, ratio });
  } else {
    passedPairs.push({ ...pair, ratio });
  }
}

if (failedPairs.length > 0) {
  console.error("❌ Accessibility contrast violations detected:");
  for (const failure of failedPairs) {
    const minRequired = failure.minContrast || MIN_CONTRAST;
    console.error(
      ` - ${failure.name}: ${failure.ratio.toFixed(2)} (expected ≥ ${minRequired.toFixed(1)})`,
    );
  }
  process.exitCode = 1;
} else {
  console.log(`✅ All ${contrastPairs.length} token pairs meet WCAG AA contrast requirements.`);
  console.log(`   - Normal text: ≥${MIN_CONTRAST}:1`);
  console.log(`   - Large text: ≥${MIN_CONTRAST_LARGE}:1`);
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

// Results available for report generation
// Note: This script is run via tsx, so results are logged to console
