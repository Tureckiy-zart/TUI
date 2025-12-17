/**
 * Alert Component Tokens
 *
 * Component-level design tokens for Alert component.
 * Maps foundation tokens (spacing, radius) to alert-specific usage.
 *
 * Includes variant-based token structure for future extensibility.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Alert Component Tokens
 *
 * Defines spacing, sizing, and visual tokens for Alert component.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const ALERT_TOKENS = {
  /**
   * Padding for alert content
   */
  padding: "p-md", // 16px (1rem) - maps to semanticSpacing.md

  /**
   * Border radius for alerts
   */
  radius: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg

  /**
   * Icon size within alerts
   */
  iconSize: "size-4", // 16px (1rem) - standard icon size

  /**
   * Variant-based token structure
   * Organized by variant for future extensibility
   */
  variant: {
    default: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    primary: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    secondary: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    accent: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    destructive: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    // Legacy semantic variants (mapped to canonical)
    success: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    warning: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    danger: {
      padding: "p-md",
      radius: "rounded-lg",
    },
    info: {
      padding: "p-md",
      radius: "rounded-lg",
    },
  } as const,
} as const;

/**
 * Type exports for Alert tokens
 */
export type AlertVariant = keyof typeof ALERT_TOKENS.variant;
