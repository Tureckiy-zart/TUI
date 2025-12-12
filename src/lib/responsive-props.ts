/**
 * Responsive Props Utilities
 *
 * Utilities for handling responsive values in layout primitives.
 * Supports CSS custom properties with media queries for efficient responsive styling.
 */

import { durations } from "@/tokens/motion";
import type {
  DelayToken,
  MotionDurationToken,
  ResponsiveDelay,
  SpacingToken,
} from "@/tokens/types";
import type { Responsive } from "@/types/responsive";

/**
 * Breakpoint values matching Tailwind defaults
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Re-export types for convenience
export type { Breakpoint, Responsive } from "@/types/responsive";

/**
 * Check if a value is a responsive object
 */
export function isResponsiveValue<T>(value: Responsive<T>): value is Exclude<Responsive<T>, T> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Get base value from responsive value
 */
export function getBaseValue<T>(value: Responsive<T> | undefined): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (isResponsiveValue(value)) {
    return value.base;
  }

  // At this point, value is T (not Responsive<T>)
  return value as T;
}

/**
 * Convert spacing token key to CSS variable name
 * Only accepts string keys (numeric keys like "0", "1", "2" are valid as strings)
 */
export function getSpacingCSSVar(key: string): string {
  // Handle semantic keys (xs, sm, md, etc.)
  if (key === "none") {
    return `var(--spacing-none)`;
  }

  // Handle layout spacing (section, container, grid, stack, component)
  if (key.includes("-") && !key.startsWith("--")) {
    // Check if it's a layout token format (e.g., "grid-md", "stack-lg")
    const parts = key.split("-");
    if (parts.length >= 2) {
      const type = parts[0];
      const size = parts.slice(1).join("-");
      // Check if it's a known layout type
      if (type && ["section", "container", "grid", "stack", "component"].includes(type)) {
        return `var(--layout-${type}-${size})`;
      }
    }
  }

  // Handle numeric string keys (0, 1, 2, 0.5, etc.) - map directly to --spacing-N
  // Special case: handle decimal numbers (e.g., "0.5" -> "0-5")
  if (key.includes(".")) {
    const normalizedKey = key.replace(".", "-");
    return `var(--spacing-${normalizedKey})`;
  }

  // Default: assume it's a base spacing token or semantic spacing token
  return `var(--spacing-${key})`;
}

/**
 * Convert radius token key to CSS variable name
 */
export function getRadiusCSSVar(key: string): string {
  return `var(--radius-${key})`;
}

/**
 * Convert color token key to CSS variable name
 */
export function getColorCSSVar(key: string): string {
  // Handle HSL format colors
  if (key.startsWith("hsl(")) {
    return key;
  }

  // Handle CSS variable format
  if (key.startsWith("var(")) {
    return key;
  }

  // Handle semantic color tokens
  return `var(--${key})`;
}

/**
 * Generate CSS custom properties for responsive values
 * Returns an object with CSS variables that can be used in inline styles
 */
export function getResponsiveCSSVars<T>(
  propName: string,
  value: Responsive<T>,
  tokenMapper: (val: T) => string,
): Record<string, string> {
  const vars: Record<string, string> = {};

  if (!isResponsiveValue(value)) {
    // Simple value - set base CSS variable
    // At this point, value is T (not ResponsiveValue<T>)
    vars[`--${propName}-base`] = tokenMapper(value as T);
    return vars;
  }

  // Responsive object - set base and breakpoint-specific variables
  if (value.base !== undefined) {
    vars[`--${propName}-base`] = tokenMapper(value.base);
  }

  if (value.sm !== undefined) {
    vars[`--${propName}-sm`] = tokenMapper(value.sm);
  }

  if (value.md !== undefined) {
    vars[`--${propName}-md`] = tokenMapper(value.md);
  }

  if (value.lg !== undefined) {
    vars[`--${propName}-lg`] = tokenMapper(value.lg);
  }

  if (value.xl !== undefined) {
    vars[`--${propName}-xl`] = tokenMapper(value.xl);
  }

  if (value["2xl"] !== undefined) {
    vars[`--${propName}-2xl`] = tokenMapper(value["2xl"]);
  }

  return vars;
}

/**
 * Generate inline styles for responsive CSS properties
 * Uses CSS custom properties with media queries approach
 */
export function getResponsiveStyles<T>(
  propName: string,
  value: Responsive<T>,
  tokenMapper: (val: T) => string,
  cssProperty: string,
): React.CSSProperties {
  const styles: React.CSSProperties = {};
  const cssVars = getResponsiveCSSVars(propName, value, tokenMapper);

  // Set base value
  const baseVar = cssVars[`--${propName}-base`];
  const smVar = cssVars[`--${propName}-sm`];

  if (baseVar) {
    (styles as Record<string, string>)[cssProperty] = baseVar;
  } else if (smVar) {
    // If no base, use sm as base
    (styles as Record<string, string>)[cssProperty] = smVar;
  } else if (!isResponsiveValue(value)) {
    // Simple value - At this point, value is T (not ResponsiveValue<T>)
    (styles as Record<string, string>)[cssProperty] = tokenMapper(value as T);
  }

  // For responsive values, we'll use CSS custom properties
  // The media queries will be handled via a style tag or CSS module
  // For now, we set the CSS variables directly
  Object.assign(styles, cssVars);

  return styles;
}

/**
 * Generate className for responsive spacing
 * Uses Tailwind's responsive classes when possible, falls back to CSS variables
 */
export function getResponsiveSpacingClass(
  prop: string,
  value: Responsive<string | number>,
): string {
  if (!isResponsiveValue(value)) {
    // Simple value - return Tailwind class if applicable
    if (typeof value === "number") {
      return `${prop}-${value}`;
    }
    return `${prop}-${value}`;
  }

  // Responsive object - generate responsive classes
  const classes: string[] = [];

  if (value.base !== undefined) {
    classes.push(`${prop}-${value.base}`);
  }

  if (value.sm !== undefined) {
    classes.push(`sm:${prop}-${value.sm}`);
  }

  if (value.md !== undefined) {
    classes.push(`md:${prop}-${value.md}`);
  }

  if (value.lg !== undefined) {
    classes.push(`lg:${prop}-${value.lg}`);
  }

  if (value.xl !== undefined) {
    classes.push(`xl:${prop}-${value.xl}`);
  }

  if (value["2xl"] !== undefined) {
    classes.push(`2xl:${prop}-${value["2xl"]}`);
  }

  return classes.join(" ");
}

/**
 * Convert motion duration token to milliseconds (number)
 * Used for setTimeout, delayDuration, etc.
 */
export function getDurationMs(token: MotionDurationToken): number {
  const duration = durations[token];
  if (!duration) {
    return 0;
  }
  // Parse "150ms" -> 150
  const match = duration.match(/^(\d+(?:\.\d+)?)ms$/);
  if (match && match[1]) {
    return Number.parseFloat(match[1]);
  }
  // Fallback: try to parse as number
  return Number.parseFloat(duration) || 0;
}

/**
 * Convert ResponsiveDelay to milliseconds (number)
 * Used for setTimeout, delayDuration, etc.
 * For responsive objects, uses base value or first available breakpoint value.
 */
export function getDelayMs(
  delay: ResponsiveDelay | undefined,
  defaultValue: number = 5000,
): number {
  if (delay === undefined || delay === null) {
    return defaultValue;
  }

  // If it's a string token, convert directly
  if (typeof delay === "string") {
    return getDurationMs(delay as DelayToken);
  }

  // If it's a responsive object, get base value or first available
  if (isResponsiveValue(delay)) {
    const baseValue = delay.base;
    if (baseValue !== undefined) {
      return getDurationMs(baseValue);
    }
    // Try to get first available breakpoint value
    const firstValue = delay.sm || delay.md || delay.lg || delay.xl || delay["2xl"];
    if (firstValue !== undefined) {
      return getDurationMs(firstValue);
    }
  }

  return defaultValue;
}

/**
 * Convert spacing token to pixels (number)
 * Note: This is a simplified conversion. For complex spacing tokens,
 * you may need to resolve CSS variables at runtime.
 * For offset values, prefer using simple numeric spacing tokens.
 */
export function getSpacingPx(token: SpacingToken): number {
  // Convert token to string for pattern matching
  const tokenStr = String(token);

  // Handle numeric string keys (0, 1, 2, etc.)
  const numericMatch = tokenStr.match(/^(\d+(?:\.\d+)?)$/);
  if (numericMatch && numericMatch[1]) {
    // Assume 1 unit = 4px (Tailwind default)
    return Number.parseFloat(numericMatch[1]) * 4;
  }

  // Handle semantic spacing tokens (xs, sm, md, etc.)
  // These map to specific pixel values
  const semanticMap: Partial<Record<string, number>> = {
    none: 0,
    xs: 4, // 0.25rem = 4px
    sm: 8, // 0.5rem = 8px
    md: 16, // 1rem = 16px
    lg: 24, // 1.5rem = 24px
    xl: 32, // 2rem = 32px
    "2xl": 48, // 3rem = 48px
    "3xl": 64, // 4rem = 64px
  };

  const semanticValue = semanticMap[tokenStr];
  if (semanticValue !== undefined) {
    return semanticValue;
  }

  // Fallback: try to extract number from token name
  const numberMatch = tokenStr.match(/(\d+(?:\.\d+)?)/);
  if (numberMatch && numberMatch[1]) {
    return Number.parseFloat(numberMatch[1]) * 4;
  }

  // Default fallback
  return 4;
}
