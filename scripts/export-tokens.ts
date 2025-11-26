#!/usr/bin/env node
/**
 * Token Export Script
 *
 * Exports design tokens from TypeScript files to design-tool consumable formats:
 * - tokens.json: Hierarchical JSON structure
 * - tokens.fig: Figma Tokens format
 *
 * Usage: pnpm tokens:export
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Import all token modules
import * as colors from "../src/tokens/colors";
import * as spacing from "../src/tokens/spacing";
import * as typography from "../src/tokens/typography";
import * as radius from "../src/tokens/radius";
import * as shadows from "../src/tokens/shadows";
import * as motion from "../src/tokens/motion";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUTPUT_DIR = join(__dirname, "../design-tokens");
const JSON_OUTPUT = join(OUTPUT_DIR, "tokens.json");
const FIGMA_OUTPUT = join(OUTPUT_DIR, "tokens.fig");

/**
 * Convert HSL string to hex color
 * Input format: "210 40% 98%" or "210 40% 98% / 0.5"
 */
function hslToHex(hslString: string): string {
  // Handle opacity if present
  const parts = hslString.split("/");
  const hsl = parts[0].trim();
  const opacity = parts[1] ? parseFloat(parts[1].trim()) : 1;

  const values = hsl.split(/\s+/);
  if (values.length < 3) {
    throw new Error(`Invalid HSL format: ${hslString}`);
  }

  const h = parseFloat(values[0]);
  const s = parseFloat(values[1].replace("%", "")) / 100;
  const l = parseFloat(values[2].replace("%", "")) / 100;

  // Convert HSL to RGB
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert to hex
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  // Add alpha if opacity < 1
  if (opacity < 1) {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${hex}${alpha}`;
  }

  return hex;
}

/**
 * Convert rem/px value to pixels
 * Input: "1rem", "16px", "0.5rem", etc.
 */
function remToPx(value: string, baseFontSize: number = 16): number {
  if (value.endsWith("px")) {
    return parseFloat(value.replace("px", ""));
  }
  if (value.endsWith("rem")) {
    return parseFloat(value.replace("rem", "")) * baseFontSize;
  }
  if (value === "0") {
    return 0;
  }
  // Try to parse as number (assumes px)
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

/**
 * Convert rem/px value to string with px suffix
 */
function toPxString(value: string, baseFontSize: number = 16): string {
  return `${remToPx(value, baseFontSize)}px`;
}

/**
 * Extract numeric value from clamp() or other CSS functions
 */
function extractNumericValue(value: string): string {
  // For clamp(), try to extract the middle value or first value
  const clampMatch = value.match(/clamp\(([^,]+),([^,]+),([^)]+)\)/);
  if (clampMatch) {
    // Return the middle (preferred) value
    return clampMatch[2].trim();
  }
  // For simple values, return as-is
  return value;
}

/**
 * Build color tokens structure
 */
function buildColorTokens() {
  const dayColors: Record<string, any> = {};
  const nightColors: Record<string, any> = {};

  // Primary colors
  const primary: Record<string, string> = {};
  Object.entries(colors.primaryColors).forEach(([key, value]) => {
    primary[key] = hslToHex(`hsl(${value})`);
  });
  dayColors.primary = primary;
  nightColors.primary = primary;

  // Accent colors
  const accent: Record<string, string> = {};
  Object.entries(colors.accentColors).forEach(([key, value]) => {
    accent[key] = hslToHex(`hsl(${value})`);
  });
  dayColors.accent = accent;
  nightColors.accent = accent;

  // Secondary colors
  const secondary: Record<string, string> = {};
  Object.entries(colors.secondaryColors).forEach(([key, value]) => {
    secondary[key] = hslToHex(`hsl(${value})`);
  });
  dayColors.secondary = secondary;
  nightColors.secondary = secondary;

  // Base colors (mode-specific)
  // Convert HSL values to hex, keep CSS variable references as-is
  Object.entries(colors.baseColors.day).forEach(([key, value]) => {
    if (typeof value === "string") {
      // Check if it's a direct HSL value (format: "H S% L%" or "H S% L% / opacity")
      // Match pattern like "0 0% 89.8%" or "240 10% 3.9%"
      const hslMatch = value.match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%(\s*\/\s*[\d.]+)?$/);
      if (hslMatch) {
        dayColors[key] = hslToHex(`hsl(${value})`);
      } else if (value.includes("hsl(var(") || value.includes("var(--")) {
        // CSS variable reference - keep as reference
        dayColors[key] = value;
      } else {
        dayColors[key] = value;
      }
    } else {
      dayColors[key] = value;
    }
  });

  Object.entries(colors.baseColors.night).forEach(([key, value]) => {
    if (typeof value === "string") {
      const hslMatch = value.match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%(\s*\/\s*[\d.]+)?$/);
      if (hslMatch) {
        nightColors[key] = hslToHex(`hsl(${value})`);
      } else if (value.includes("hsl(var(") || value.includes("var(--")) {
        nightColors[key] = value;
      } else {
        nightColors[key] = value;
      }
    } else {
      nightColors[key] = value;
    }
  });

  // Surface colors
  const daySurface: Record<string, string> = {};
  Object.entries(colors.surfaceColors.day).forEach(([key, value]) => {
    if (value.includes("/")) {
      // Has opacity
      daySurface[key] = hslToHex(`hsl(${value})`);
    } else {
      daySurface[key] = hslToHex(`hsl(${value})`);
    }
  });
  dayColors.surface = daySurface;

  const nightSurface: Record<string, string> = {};
  Object.entries(colors.surfaceColors.night).forEach(([key, value]) => {
    if (value.includes("/")) {
      nightSurface[key] = hslToHex(`hsl(${value})`);
    } else {
      nightSurface[key] = hslToHex(`hsl(${value})`);
    }
  });
  nightColors.surface = nightSurface;

  // Semantic colors
  const daySemantic: Record<string, string> = {};
  Object.entries(colors.semanticColors.day).forEach(([key, value]) => {
    daySemantic[key] = hslToHex(`hsl(${value})`);
  });
  dayColors.semantic = daySemantic;

  const nightSemantic: Record<string, string> = {};
  Object.entries(colors.semanticColors.night).forEach(([key, value]) => {
    nightSemantic[key] = hslToHex(`hsl(${value})`);
  });
  nightColors.semantic = nightSemantic;

  // Text colors
  const dayText: Record<string, string> = {};
  Object.entries(colors.textColors.day).forEach(([key, value]) => {
    dayText[key] = hslToHex(`hsl(${value})`);
  });
  dayColors.text = dayText;

  const nightText: Record<string, string> = {};
  Object.entries(colors.textColors.night).forEach(([key, value]) => {
    nightText[key] = hslToHex(`hsl(${value})`);
  });
  nightColors.text = nightText;

  return { day: dayColors, night: nightColors };
}

/**
 * Build spacing tokens structure
 */
function buildSpacingTokens() {
  const spacingTokens: Record<string, any> = {};

  // Base spacing scale
  const base: Record<string, string> = {};
  Object.entries(spacing.spacing).forEach(([key, value]) => {
    base[key] = toPxString(value);
  });
  spacingTokens.base = base;

  // Semantic spacing
  const semantic: Record<string, string> = {};
  Object.entries(spacing.semanticSpacing).forEach(([key, value]) => {
    semantic[key] = toPxString(value);
  });
  spacingTokens.semantic = semantic;

  // Layout spacing
  spacingTokens.layout = {
    section: Object.fromEntries(
      Object.entries(spacing.layoutSpacing.section).map(([k, v]) => [k, toPxString(v)])
    ),
    container: Object.fromEntries(
      Object.entries(spacing.layoutSpacing.container).map(([k, v]) => [k, toPxString(v)])
    ),
    grid: Object.fromEntries(
      Object.entries(spacing.layoutSpacing.grid).map(([k, v]) => [k, toPxString(v)])
    ),
    stack: Object.fromEntries(
      Object.entries(spacing.layoutSpacing.stack).map(([k, v]) => [k, toPxString(v)])
    ),
    component: Object.fromEntries(
      Object.entries(spacing.layoutSpacing.component).map(([k, v]) => [k, toPxString(v)])
    ),
  };

  return spacingTokens;
}

/**
 * Build typography tokens structure
 */
function buildTypographyTokens() {
  const typographyTokens: Record<string, any> = {};

  // Font families
  typographyTokens.fontFamily = {
    sans: typography.fontFamily.sans.join(", "),
    satoshi: typography.fontFamily.satoshi.join(", "),
    display: typography.fontFamily.display.join(", "),
    serif: typography.fontFamily.serif.join(", "),
    mono: typography.fontFamily.mono.join(", "),
  };

  // Font sizes (extract from clamp or use as-is)
  const fontSize: Record<string, any> = {};
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const size = extractNumericValue(value[0]);
      fontSize[key] = {
        size: toPxString(size),
        lineHeight: value[1].lineHeight,
        letterSpacing: value[1].letterSpacing,
      };
    } else {
      fontSize[key] = value;
    }
  });
  typographyTokens.fontSize = fontSize;

  // Font weights
  typographyTokens.fontWeight = { ...typography.fontWeight };

  // Line heights
  typographyTokens.lineHeight = { ...typography.lineHeight };

  // Letter spacing
  typographyTokens.letterSpacing = { ...typography.letterSpacing };

  // Text styles
  const textStyles: Record<string, any> = {};
  Object.entries(typography.textStyles).forEach(([key, value]) => {
    textStyles[key] = {
      fontFamily: value.fontFamily,
      fontSize: toPxString(extractNumericValue(value.fontSize)),
      fontWeight: value.fontWeight,
      lineHeight: value.lineHeight,
      letterSpacing: value.letterSpacing,
    };
  });
  typographyTokens.textStyles = textStyles;

  return typographyTokens;
}

/**
 * Build radius tokens structure
 */
function buildRadiusTokens() {
  const radiusTokens: Record<string, any> = {};

  // Base radius scale
  const base: Record<string, string> = {};
  Object.entries(radius.borderRadius).forEach(([key, value]) => {
    if (value === "9999px") {
      base[key] = value;
    } else {
      base[key] = toPxString(value);
    }
  });
  radiusTokens.base = base;

  // Component-specific radius
  radiusTokens.component = {
    button: Object.fromEntries(
      Object.entries(radius.componentRadius.button).map(([k, v]) => [
        k,
        v === "9999px" ? v : toPxString(v),
      ])
    ),
    card: Object.fromEntries(
      Object.entries(radius.componentRadius.card).map(([k, v]) => [k, toPxString(v)])
    ),
    input: Object.fromEntries(
      Object.entries(radius.componentRadius.input).map(([k, v]) => [k, toPxString(v)])
    ),
    badge: Object.fromEntries(
      Object.entries(radius.componentRadius.badge).map(([k, v]) => [
        k,
        v === "9999px" ? v : toPxString(v),
      ])
    ),
    avatar: Object.fromEntries(
      Object.entries(radius.componentRadius.avatar).map(([k, v]) => [
        k,
        v === "9999px" ? v : toPxString(v),
      ])
    ),
    modal: Object.fromEntries(
      Object.entries(radius.componentRadius.modal).map(([k, v]) => [k, toPxString(v)])
    ),
    tooltip: Object.fromEntries(
      Object.entries(radius.componentRadius.tooltip).map(([k, v]) => [k, toPxString(v)])
    ),
    toast: Object.fromEntries(
      Object.entries(radius.componentRadius.toast).map(([k, v]) => [k, toPxString(v)])
    ),
    chip: Object.fromEntries(
      Object.entries(radius.componentRadius.chip).map(([k, v]) => [
        k,
        v === "9999px" ? v : toPxString(v),
      ])
    ),
    image: Object.fromEntries(
      Object.entries(radius.componentRadius.image).map(([k, v]) => [
        k,
        v === "9999px" ? v : toPxString(v),
      ])
    ),
  };

  return radiusTokens;
}

/**
 * Build shadow tokens structure
 */
function buildShadowTokens() {
  const shadowTokens: Record<string, any> = {};

  // Elevation shadows
  shadowTokens.elevation = { ...shadows.elevationShadows };

  // Primary colored shadows
  shadowTokens.primary = { ...shadows.primaryColoredShadows };

  // Accent colored shadows
  shadowTokens.accent = { ...shadows.accentColoredShadows };

  // Glow effects
  shadowTokens.glow = { ...shadows.glowEffects };

  // Focus rings
  shadowTokens.focus = { ...shadows.focusRings };

  // Component shadow mapping
  shadowTokens.component = { ...shadows.componentShadowMapping };

  return shadowTokens;
}

/**
 * Build motion tokens structure
 */
function buildMotionTokens() {
  const motionTokens: Record<string, any> = {};

  // Durations
  motionTokens.duration = { ...motion.durations };

  // Easings
  motionTokens.easing = { ...motion.easings };

  // Transitions
  motionTokens.transition = { ...motion.transitions };

  // Keyframes (simplified - just names)
  motionTokens.keyframes = Object.keys(motion.keyframes);

  // Animations
  motionTokens.animation = { ...motion.animations };

  return motionTokens;
}

/**
 * Build complete JSON token structure
 */
function buildJsonTokens() {
  const colorTokens = buildColorTokens();

  return {
    colors: {
      day: colorTokens.day,
      night: colorTokens.night,
    },
    spacing: buildSpacingTokens(),
    typography: buildTypographyTokens(),
    radius: buildRadiusTokens(),
    shadows: buildShadowTokens(),
    motion: buildMotionTokens(),
  };
}

/**
 * Build Figma Tokens structure
 */
function buildFigmaTokens() {
  const colorTokens = buildColorTokens();

  // Flatten color tokens for Figma format
  const flattenColors = (colors: Record<string, any>, prefix: string = ""): Record<string, any> => {
    const result: Record<string, any> = {};
    Object.entries(colors).forEach(([key, value]) => {
      const tokenKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenColors(value, tokenKey));
      } else {
        result[tokenKey] = {
          value: value,
          type: "color",
        };
      }
    });
    return result;
  };

  const flattenSpacing = (
    spacing: Record<string, any>,
    prefix: string = ""
  ): Record<string, any> => {
    const result: Record<string, any> = {};
    Object.entries(spacing).forEach(([key, value]) => {
      const tokenKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenSpacing(value, tokenKey));
      } else {
        result[tokenKey] = {
          value: value,
          type: "dimension",
        };
      }
    });
    return result;
  };

  const dayTokens: Record<string, any> = {
    ...flattenColors(colorTokens.day, "color"),
    ...flattenSpacing(buildSpacingTokens(), "spacing"),
  };

  const nightTokens: Record<string, any> = {
    ...flattenColors(colorTokens.night, "color"),
    ...flattenSpacing(buildSpacingTokens(), "spacing"),
  };

  return {
    $themes: [
      {
        id: "day",
        name: "Day",
        selectedTokenSets: {
          day: "enabled",
        },
      },
      {
        id: "night",
        name: "Night",
        selectedTokenSets: {
          night: "enabled",
        },
      },
    ],
    day: dayTokens,
    night: nightTokens,
  };
}

/**
 * Validate token compilation
 */
function validateTokens(): boolean {
  try {
    // Try to access all token exports to ensure they compile
    const _ = {
      colors: Object.keys(colors),
      spacing: Object.keys(spacing),
      typography: Object.keys(typography),
      radius: Object.keys(radius),
      shadows: Object.keys(shadows),
      motion: Object.keys(motion),
    };
    return true;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
}

/**
 * Main export function
 */
function main() {
  console.log("🎨 Exporting design tokens...");

  // Validate tokens
  if (!validateTokens()) {
    console.error("❌ Token validation failed. Please fix errors before exporting.");
    process.exit(1);
  }

  // Ensure output directory exists
  try {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's fine
  }

  try {
    // Build and export JSON tokens
    console.log("📦 Building JSON token structure...");
    const jsonTokens = buildJsonTokens();
    writeFileSync(JSON_OUTPUT, JSON.stringify(jsonTokens, null, 2), "utf-8");
    console.log(`✅ Generated ${JSON_OUTPUT}`);

    // Build and export Figma tokens
    console.log("🎨 Building Figma token structure...");
    const figmaTokens = buildFigmaTokens();
    writeFileSync(FIGMA_OUTPUT, JSON.stringify(figmaTokens, null, 2), "utf-8");
    console.log(`✅ Generated ${FIGMA_OUTPUT}`);

    console.log("\n✨ Token export completed successfully!");
    console.log(`   - JSON: ${JSON_OUTPUT}`);
    console.log(`   - Figma: ${FIGMA_OUTPUT}`);
  } catch (error) {
    console.error("❌ Export failed:", error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run if executed directly
main();

