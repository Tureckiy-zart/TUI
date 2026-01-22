#!/usr/bin/env node

/**
 * Typography Contrast Check Script
 *
 * Verifies WCAG 2.1 Level AA contrast compliance for all semantic text roles
 * defined in textStyles (display, h1-h6, body, label, caption).
 *
 * Usage: node scripts/typography-contrast-check.js
 */

import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const MIN_CONTRAST = 4.5; // WCAG AA for normal text
const MIN_CONTRAST_LARGE = 3.0; // WCAG AA for large text (18pt+ or 14pt+ bold)

const colorsModuleUrl = pathToFileURL(
  path.resolve(process.cwd(), "src/FOUNDATION/tokens/colors.ts"),
).href;

const typographyModuleUrl = pathToFileURL(
  path.resolve(process.cwd(), "src/FOUNDATION/tokens/typography.ts"),
).href;

const { textColors, surfaceColors, baseColors, disabledColors } = await import(colorsModuleUrl);
const { textStyles, typographyRolePolicy } = await import(typographyModuleUrl);

// Helper functions for contrast calculation
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
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return color;
  };
  return [f(0), f(8), f(4)];
}

function getRelativeLuminance([r, g, b]) {
  const convert = (value) =>
    value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  const [sr, sg, sb] = [convert(r), convert(g), convert(b)];
  return 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
}

function getContrastRatio(foreground, background) {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);
  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if surface is light (for inverse text restriction)
function isLightSurface(surfaceHsl) {
  const parts = surfaceHsl.trim().split(/\s+/);
  if (parts.length < 3) return false;
  const lRaw = parts[2];
  const lightness = parseFloat(lRaw.replace("%", ""));
  return lightness > 50;
}

// Build text role definitions from typographyRolePolicy
const textRoleDefinitions = [];

// Process all roles from typographyRolePolicy (except disabled, handled separately)
for (const [roleName, policy] of Object.entries(typographyRolePolicy)) {
  // Skip disabled role - handled separately
  if (roleName === "disabled") continue;

  // Get style from textStyles (if exists)
  const style = textStyles[roleName];
  if (!style) continue;

  // Get allowed text colors from policy
  const allowedTextColors = Array.from(policy.allowedText);
  const minContrast = policy.minContrast === "inherits" ? MIN_CONTRAST : policy.minContrast;

  textRoleDefinitions.push({
    name: roleName,
    style,
    allowedTextColors,
    minContrast,
    category: policy.category,
  });
}

// Test all combinations (only allowed by policy)
const contrastPairs = [];

for (const role of textRoleDefinitions) {
  const { style, allowedTextColors, minContrast } = role;

  // Test against all surface colors for both day and night modes
  const surfaces = [
    { name: "base", day: surfaceColors.day.base, night: surfaceColors.night.base },
    {
      name: "elevated1",
      day: surfaceColors.day.elevated1,
      night: surfaceColors.night.elevated1,
    },
    {
      name: "elevated2",
      day: surfaceColors.day.elevated2,
      night: surfaceColors.night.elevated2,
    },
    {
      name: "elevated3",
      day: surfaceColors.day.elevated3,
      night: surfaceColors.night.elevated3,
    },
    { name: "background", day: baseColors.day.background, night: baseColors.night.background },
    { name: "card", day: baseColors.day.card, night: baseColors.night.card },
  ];

  for (const surface of surfaces) {
    for (const textColorName of allowedTextColors) {
      // Skip architecturally forbidden combinations
      // 1. inverse on light surfaces (day mode base/elevated surfaces)
      if (textColorName === "inverse" && isLightSurface(surface.day)) {
        continue; // Skip - architecturally forbidden
      }

      // Get text color value
      let dayTextColor = null;
      let nightTextColor = null;

      if (textColorName === "disabled") {
        // Use disabledForeground for disabled text
        dayTextColor = disabledColors.day.disabledForeground;
        nightTextColor = disabledColors.night.disabledForeground;
      } else {
        // Use textColors for other tokens
        dayTextColor = textColors.day[textColorName];
        nightTextColor = textColors.night[textColorName];
      }

      // Day mode
      if (dayTextColor) {
        contrastPairs.push({
          role: role.name,
          mode: "day",
          textColor: textColorName,
          background: surface.name,
          foreground: dayTextColor,
          backgroundValue: surface.day,
          minContrast,
        });
      }

      // Night mode
      if (nightTextColor) {
        contrastPairs.push({
          role: role.name,
          mode: "night",
          textColor: textColorName,
          background: surface.name,
          foreground: nightTextColor,
          backgroundValue: surface.night,
          minContrast,
        });
      }
    }
  }
}

// Handle disabled role separately (uses disabled background)
if (typographyRolePolicy.disabled) {
  const disabledPolicy = typographyRolePolicy.disabled;
  const disabledSurfaces = [
    { name: "disabled", day: disabledColors.day.disabled, night: disabledColors.night.disabled },
  ];

  for (const surface of disabledSurfaces) {
    for (const textColorName of disabledPolicy.allowedText) {
      if (textColorName === "disabled") {
        const dayTextColor = disabledColors.day.disabledForeground;
        const nightTextColor = disabledColors.night.disabledForeground;

        contrastPairs.push({
          role: "disabled",
          mode: "day",
          textColor: textColorName,
          background: surface.name,
          foreground: dayTextColor,
          backgroundValue: surface.day,
          minContrast: MIN_CONTRAST, // Disabled follows A11Y policy (4.5:1)
        });

        contrastPairs.push({
          role: "disabled",
          mode: "night",
          textColor: textColorName,
          background: surface.name,
          foreground: nightTextColor,
          backgroundValue: surface.night,
          minContrast: MIN_CONTRAST, // Disabled follows A11Y policy (4.5:1)
        });
      }
    }
  }
}

// Calculate contrast ratios
const results = [];

for (const pair of contrastPairs) {
  const fg = parseHsl(pair.foreground);
  const bg = parseHsl(pair.backgroundValue);

  if (!fg || !bg) {
    console.warn(
      `[typography:contrast] Skipping ${pair.mode}:${pair.role} (${pair.textColor} on ${pair.background}) - unsupported color format.`,
    );
    continue;
  }

  const ratio = getContrastRatio(fg, bg);
  const passed = ratio >= pair.minContrast;

  results.push({
    ...pair,
    ratio,
    passed,
  });
}

// Report results
const passed = results.filter((r) => r.passed);
const failed = results.filter((r) => !r.passed);

console.log(`\n📊 Typography Contrast Verification Results\n`);
console.log(`Total combinations tested: ${results.length}`);
console.log(
  `✅ Passed: ${passed.length} (${((passed.length / results.length) * 100).toFixed(1)}%)`,
);
console.log(
  `❌ Failed: ${failed.length} (${((failed.length / results.length) * 100).toFixed(1)}%)\n`,
);

if (failed.length > 0) {
  console.error("❌ Typography contrast violations detected:\n");
  for (const failure of failed) {
    console.error(
      `  ${failure.mode}:${failure.role} (${failure.textColor} on ${failure.background}): ${failure.ratio.toFixed(2)}:1 (expected ≥${failure.minContrast.toFixed(1)}:1)`,
    );
  }
  process.exitCode = 1;
} else {
  console.log(
    `✅ All ${results.length} typography role combinations meet WCAG AA contrast requirements.`,
  );
  console.log(`   - Normal text: ≥${MIN_CONTRAST}:1`);
  console.log(`   - Large text: ≥${MIN_CONTRAST_LARGE}:1\n`);
}

// Export results for report generation
if (process.env.EXPORT_RESULTS === "true") {
  const fs = await import("node:fs");
  const reportPath = path.resolve(process.cwd(), "docs/reports/typography-contrast-audit.md");
  const reportContent = generateReport(results, passed, failed);
  fs.writeFileSync(reportPath, reportContent, "utf-8");
  console.log(`📄 Report generated: ${reportPath}`);
}

function generateReport(results, passed, failed) {
  const date = new Date().toISOString().split("T")[0];
  return `# Typography Contrast Audit Report

**Status:** ${failed.length === 0 ? "✅ PASS" : "❌ FAIL"}  
**Date Created:** ${date}  
**Task:** TUI_TYPOGRAPHY_COLOR_POLICY_CANON_008  
**Scope:** All semantic text roles (display, h1-h6, body, label, caption, meta, disabled) for both themes (day/night)  
**Policy:** Typography Color Policy v1 - Only allowed role × text-token combinations tested

---

## Executive Summary

This report documents the comprehensive contrast ratio validation for all semantic text roles across both day and night themes.

**WCAG 2.1 Level AA Requirements:**
- Normal text: ≥4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): ≥3:1 contrast ratio

---

## Results

**Total Combinations Tested:** ${results.length}  
**Passed:** ${passed.length} (${((passed.length / results.length) * 100).toFixed(1)}%)  
**Failed:** ${failed.length} (${((failed.length / results.length) * 100).toFixed(1)}%)

---

## Violations

${failed.length === 0 ? "✅ No violations detected." : failed.map((f) => `- \`${f.mode}:${f.role}\` (${f.textColor} on ${f.background}): ${f.ratio.toFixed(2)}:1 (expected ≥${f.minContrast.toFixed(1)}:1)`).join("\n")}

---

## Role Summary

${[...textRoleDefinitions, { name: "disabled", minContrast: MIN_CONTRAST }]
  .map((role) => {
    const roleResults = results.filter((r) => r.role === role.name);
    const rolePassed = roleResults.filter((r) => r.passed).length;
    const roleFailed = roleResults.filter((r) => !r.passed).length;
    const policy = typographyRolePolicy[role.name];
    const allowedText = policy ? Array.from(policy.allowedText).join(", ") : "N/A";
    return `### ${role.name}
- **Total:** ${roleResults.length}
- **Passed:** ${rolePassed}
- **Failed:** ${roleFailed}
- **Min Contrast:** ≥${role.minContrast}:1
- **Allowed Text Tokens:** ${allowedText}`;
  })
  .join("\n\n")}

---

## Methodology

The audit uses \`scripts/typography-contrast-check.js\` that:

1. Imports typography tokens and \`typographyRolePolicy\` from \`src/FOUNDATION/tokens/typography.ts\`
2. Imports color tokens from \`src/FOUNDATION/tokens/colors.ts\` (textColors, disabledColors)
3. Validates only allowed role × text-token combinations per Typography Color Policy v1
4. Excludes architecturally forbidden combinations (inverse on light surfaces, etc.)
5. Calculates contrast ratios using WCAG 2.1 formula
6. Validates against WCAG AA requirements (4.5:1 for normal text, 3:1 for large text)

**Policy Compliance:**
- Only combinations defined in \`typographyRolePolicy\` are tested
- Forbidden combinations are excluded (not false-positives)
- Report shows only real A11Y violations

---

**Report Generated:** ${date}  
**Script Version:** 1.0
`;
}
