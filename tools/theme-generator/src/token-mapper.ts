/**
 * Token Mapper
 *
 * Maps input colors to --tm-* semantic tokens.
 * Contains color scale generation and contrast calculation algorithms.
 *
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see tools/theme-contract - Canonical source for contract data
 */

import type {
  ColorGenerationConfig,
  ColorScale,
  ContrastLevel,
  HSLColor,
  HSLComponents,
  ThemeTokens,
} from "./types";

// Import contract version from canonical source
import { CONTRACT_VERSION } from "../../theme-contract/src/index.js";

/**
 * Parse HSL color string to components
 * @param hsl - HSL string in format "H S% L%" (e.g., "210 40% 50%")
 */
export function parseHSL(hsl: string): HSLComponents {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3) {
    throw new Error(`Invalid HSL format: "${hsl}". Expected "H S% L%"`);
  }

  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1].replace("%", ""));
  const l = parseFloat(parts[2].replace("%", ""));

  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    throw new Error(`Invalid HSL values: "${hsl}"`);
  }

  return { h, s, l };
}

/**
 * Format HSL components to string
 * @param components - HSL components
 */
export function formatHSL(components: HSLComponents): HSLColor {
  const h = Math.round(components.h);
  const s = Math.round(components.s * 10) / 10;
  const l = Math.round(components.l * 10) / 10;
  return `${h} ${s}% ${l}%`;
}

/**
 * Adjust lightness of an HSL color
 * @param hsl - HSL components
 * @param delta - Lightness adjustment (-100 to 100)
 */
export function adjustLightness(hsl: HSLComponents, delta: number): HSLComponents {
  return {
    ...hsl,
    l: Math.max(0, Math.min(100, hsl.l + delta)),
  };
}

/**
 * Adjust saturation of an HSL color
 * @param hsl - HSL components
 * @param delta - Saturation adjustment (-100 to 100)
 */
export function adjustSaturation(hsl: HSLComponents, delta: number): HSLComponents {
  return {
    ...hsl,
    s: Math.max(0, Math.min(100, hsl.s + delta)),
  };
}

/**
 * Calculate relative luminance for WCAG contrast calculation
 * Converts HSL to RGB, then calculates luminance
 */
export function getRelativeLuminance(hsl: HSLComponents): number {
  // Convert HSL to RGB
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Calculate relative luminance
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculate WCAG contrast ratio between two colors
 */
export function getContrastRatio(color1: HSLComponents, color2: HSLComponents): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG requirements
 */
export function meetsContrastRequirement(ratio: number, level: ContrastLevel): boolean {
  // AA requires 4.5:1 for normal text, 3:1 for large text
  // AAA requires 7:1 for normal text, 4.5:1 for large text
  // We use the stricter normal text requirements
  return level === "AAA" ? ratio >= 7 : ratio >= 4.5;
}

/**
 * Determine if a color is "light" (should have dark text on it)
 */
export function isLightColor(hsl: HSLComponents): boolean {
  return getRelativeLuminance(hsl) > 0.179;
}

/**
 * Get a contrasting foreground color (black or white)
 */
export function getContrastingForeground(
  background: HSLComponents,
  contrastLevel: ContrastLevel = "AA",
): HSLComponents {
  const white: HSLComponents = { h: 0, s: 0, l: 100 };
  const black: HSLComponents = { h: 0, s: 0, l: 9 };

  const whiteContrast = getContrastRatio(background, white);
  const blackContrast = getContrastRatio(background, black);

  // Minimum contrast required
  const minContrast = contrastLevel === "AAA" ? 7 : 4.5;

  // Choose the one with better contrast, preferring white if both meet requirement
  if (whiteContrast >= minContrast) {
    return white;
  }
  if (blackContrast >= minContrast) {
    return black;
  }
  // Fallback to higher contrast option if neither meets requirement
  return whiteContrast > blackContrast ? white : black;
}

/**
 * Generate a color scale from a base color
 * Creates 11 shades from 50 (lightest) to 950 (darkest)
 */
export function generateColorScale(baseColor: HSLComponents): ColorScale {
  // Lightness values for each scale step
  // These are tuned to create a harmonious scale
  const lightnessScale = {
    50: 98,
    100: 96,
    200: 90,
    300: 80,
    400: 65,
    500: 50,
    600: 44,
    700: 35,
    800: 26,
    900: 18,
    950: 10,
  } as const;

  type ScaleKey = keyof typeof lightnessScale;
  const scaleKeys: ScaleKey[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const scale = {} as ColorScale;

  for (const step of scaleKeys) {
    const targetL = lightnessScale[step];

    // Preserve hue, adjust saturation slightly for lighter/darker shades
    let adjustedS = baseColor.s;

    // Lighter colors need less saturation, darker need more
    if (step < 300) {
      adjustedS = baseColor.s * (0.6 + step / 750); // 60-100% saturation
    } else if (step > 700) {
      adjustedS = baseColor.s * (0.8 + (step - 700) / 1000); // 80-105% saturation
    }

    adjustedS = Math.min(100, Math.max(0, adjustedS));

    scale[step] = formatHSL({
      h: baseColor.h,
      s: adjustedS,
      l: targetL,
    });
  }

  return scale;
}

/**
 * Generate all theme tokens from input configuration
 */
export function generateThemeTokens(config: ColorGenerationConfig): ThemeTokens {
  const { baseColor, accentColor, mode, contrastLevel } = config;

  // Generate primary color scale from base color
  const primaryScale = generateColorScale(baseColor);

  // Generate accent color scale (use adjusted base if not provided)
  const accentBase = accentColor || {
    h: (baseColor.h + 60) % 360, // Complementary hue shift
    s: baseColor.s,
    l: baseColor.l,
  };
  const accentScale = generateColorScale(accentBase);

  // Generate secondary color scale (shifted hue)
  const secondaryBase: HSLComponents = {
    h: (baseColor.h + 180) % 360, // Complementary
    s: baseColor.s * 0.8,
    l: baseColor.l,
  };
  const secondaryScale = generateColorScale(secondaryBase);

  // Mode-specific values
  const isLight = mode === "light";

  // Background colors
  const bgBase = isLight
    ? { h: baseColor.h, s: baseColor.s * 0.1, l: 100 }
    : { h: baseColor.h, s: 10, l: 3.9 };

  const bgElev1 = isLight
    ? { h: baseColor.h, s: baseColor.s * 0.1, l: 98 }
    : { h: baseColor.h, s: 10, l: 5.1 };

  const bgElev2 = isLight
    ? { h: baseColor.h, s: baseColor.s * 0.1, l: 96 }
    : { h: baseColor.h, s: 10, l: 6.3 };

  // Foreground colors
  const fgBase = isLight ? { h: 0, s: 0, l: 9 } : { h: 0, s: 0, l: 89.8 };

  const fgMuted = isLight ? { h: 0, s: 0, l: 42 } : { h: 240, s: 5, l: 64.9 };

  const fgSubtle = isLight ? { h: 0, s: 0, l: 65 } : { h: 240, s: 5, l: 50 };

  // Border colors
  const borderBase = isLight ? { h: 0, s: 0, l: 89.8 } : { h: 240, s: 3.7, l: 15.9 };

  const borderStrong = isLight ? { h: 0, s: 0, l: 70 } : { h: 240, s: 5, l: 30 };

  // Primary colors - use different scale positions based on mode
  const primaryMain = parseHSL(isLight ? primaryScale[800] : primaryScale[600]);
  const primaryFg = getContrastingForeground(primaryMain, contrastLevel);
  const primaryHover = adjustLightness(primaryMain, isLight ? 5 : -5);

  // Secondary colors
  const secondaryMain = parseHSL(isLight ? secondaryScale[600] : secondaryScale[700]);
  const secondaryFg = getContrastingForeground(secondaryMain, contrastLevel);
  const secondaryHover = adjustLightness(secondaryMain, isLight ? 5 : -5);

  // Accent colors
  const accentMain = parseHSL(isLight ? accentScale[600] : accentScale[500]);
  const accentFg = getContrastingForeground(accentMain, contrastLevel);
  const accentHover = adjustLightness(accentMain, isLight ? 5 : -5);

  // Semantic colors
  const destructiveBase = isLight ? { h: 0, s: 80, l: 40 } : { h: 0, s: 62.8, l: 30.6 };

  const successBase = isLight ? { h: 142, s: 70, l: 28 } : { h: 142, s: 70, l: 45 };

  const warningBase = isLight ? { h: 38, s: 92, l: 50 } : { h: 38, s: 92, l: 33 };

  const infoBase = isLight ? { h: 199, s: 89, l: 48 } : { h: 199, s: 89, l: 35 };

  // Muted colors
  const mutedBg = isLight
    ? { h: baseColor.h, s: baseColor.s * 0.1, l: 96 }
    : { h: 240, s: 10, l: 7 };

  const mutedFg = isLight ? { h: 0, s: 0, l: 45 } : { h: 0, s: 0, l: 65 };

  // Disabled colors
  const disabledBg = isLight ? { h: 0, s: 0, l: 96 } : { h: 240, s: 5, l: 12 };

  const disabledFg = isLight ? { h: 0, s: 0, l: 60 } : { h: 240, s: 5, l: 50 };

  // Link colors
  const linkColor = isLight ? parseHSL(primaryScale[600]) : parseHSL(primaryScale[400]);

  // Selection colors
  const selectionBg = isLight ? parseHSL(primaryScale[200]) : parseHSL(primaryScale[800]);

  // Overlay and scrim
  const overlay = isLight ? "0 0% 0% / 0.5" : "0 0% 0% / 0.7";

  const scrim = isLight ? "0 0% 0% / 0.3" : "0 0% 0% / 0.5";

  // Ring and shadow colors
  const ring = isLight ? { h: 0, s: 0, l: 3.9 } : { h: 240, s: 4.9, l: 83.9 };

  const ringOffset = isLight ? { h: 0, s: 0, l: 100 } : { h: 240, s: 10, l: 3.9 };

  const shadowColor = isLight ? "0 0% 0% / 0.1" : "0 0% 0% / 0.25";

  return {
    "--tm-contract-version": CONTRACT_VERSION,

    // Background tokens
    "--tm-bg": formatHSL(bgBase),
    "--tm-bg-elev-1": formatHSL(bgElev1),
    "--tm-bg-elev-2": formatHSL(bgElev2),
    "--tm-overlay": overlay,
    "--tm-scrim": scrim,

    // Foreground/text tokens
    "--tm-fg": formatHSL(fgBase),
    "--tm-fg-muted": formatHSL(fgMuted),
    "--tm-fg-subtle": formatHSL(fgSubtle),

    // Border tokens
    "--tm-border": formatHSL(borderBase),
    "--tm-border-strong": formatHSL(borderStrong),
    "--tm-separator": formatHSL({ ...borderBase, l: borderBase.l - 5 }),

    // Focus and shadow tokens
    "--tm-ring": formatHSL(ring),
    "--tm-shadow-color": shadowColor,
    "--tm-ring-offset": formatHSL(ringOffset),
    "--tm-shadow-1": "0 1px 2px 0 hsl(var(--tm-shadow-color))",
    "--tm-shadow-2": "0 4px 6px -1px hsl(var(--tm-shadow-color))",

    // Primary brand color tokens
    "--tm-primary": formatHSL(primaryMain),
    "--tm-primary-foreground": formatHSL(primaryFg),
    "--tm-primary-hover": formatHSL(primaryHover),

    // Secondary brand color tokens
    "--tm-secondary": formatHSL(secondaryMain),
    "--tm-secondary-foreground": formatHSL(secondaryFg),
    "--tm-secondary-hover": formatHSL(secondaryHover),

    // Accent color tokens
    "--tm-accent": formatHSL(accentMain),
    "--tm-accent-foreground": formatHSL(accentFg),
    "--tm-accent-hover": formatHSL(accentHover),

    // Destructive/error color tokens
    "--tm-destructive": formatHSL(destructiveBase),
    "--tm-destructive-foreground": formatHSL(
      getContrastingForeground(destructiveBase, contrastLevel),
    ),
    "--tm-destructive-hover": formatHSL(adjustLightness(destructiveBase, isLight ? -5 : 5)),

    // Success color tokens
    "--tm-success": formatHSL(successBase),
    "--tm-success-foreground": formatHSL(getContrastingForeground(successBase, contrastLevel)),
    "--tm-success-hover": formatHSL(adjustLightness(successBase, isLight ? -5 : 5)),

    // Warning color tokens
    "--tm-warning": formatHSL(warningBase),
    "--tm-warning-foreground": formatHSL(getContrastingForeground(warningBase, contrastLevel)),
    "--tm-warning-hover": formatHSL(adjustLightness(warningBase, isLight ? -5 : 5)),

    // Info color tokens
    "--tm-info": formatHSL(infoBase),
    "--tm-info-foreground": formatHSL(getContrastingForeground(infoBase, contrastLevel)),
    "--tm-info-hover": formatHSL(adjustLightness(infoBase, isLight ? -5 : 5)),

    // Muted color tokens
    "--tm-muted": formatHSL(mutedBg),
    "--tm-muted-foreground": formatHSL(mutedFg),

    // Disabled state tokens
    "--tm-disabled": formatHSL(disabledBg),
    "--tm-disabled-foreground": formatHSL(disabledFg),

    // Link tokens
    "--tm-link": formatHSL(linkColor),
    "--tm-link-hover": formatHSL(adjustLightness(linkColor, isLight ? -10 : 10)),

    // Selection tokens
    "--tm-selection-bg": formatHSL(selectionBg),
    "--tm-selection-foreground": formatHSL(fgBase),
  };
}
