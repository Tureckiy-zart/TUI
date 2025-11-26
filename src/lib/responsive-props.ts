/**
 * Responsive Props Utilities
 *
 * Utilities for handling responsive values in layout primitives.
 * Supports CSS custom properties with media queries for efficient responsive styling.
 */

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

export type Breakpoint = keyof typeof breakpoints;

/**
 * Responsive value type - can be a single value or an object with breakpoint keys
 */
export type ResponsiveValue<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };

/**
 * Check if a value is a responsive object
 */
export function isResponsiveValue<T>(
  value: ResponsiveValue<T>,
): value is Exclude<ResponsiveValue<T>, T> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Get base value from responsive value
 */
export function getBaseValue<T>(value: ResponsiveValue<T> | undefined): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (isResponsiveValue(value)) {
    return value.base;
  }

  // At this point, value is T (not ResponsiveValue<T>)
  return value as T;
}

/**
 * Convert spacing token key to CSS variable name
 */
export function getSpacingCSSVar(key: string | number): string {
  // Handle numeric keys (0, 1, 2, etc.) - map directly to --spacing-N
  if (typeof key === "number") {
    // Special case: handle decimal numbers (e.g., 0.5 -> 0-5)
    if (key % 1 !== 0) {
      const str = key.toString().replace(".", "-");
      return `var(--spacing-${str})`;
    }
    return `var(--spacing-${key})`;
  }

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

  // Default: assume it's a semantic spacing token
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
  value: ResponsiveValue<T>,
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
  value: ResponsiveValue<T>,
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
  value: ResponsiveValue<string | number>,
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
