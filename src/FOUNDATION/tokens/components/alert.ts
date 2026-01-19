/**
 * Alert Component Tokens
 *
 * Component-level design tokens for Alert component.
 * Maps foundation tokens (spacing, radius) to alert-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
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
   * Border token
   * Base border style
   */
  border: "border", // Base border

  /**
   * Icon size within alerts
   */
  iconSize: "size-4", // 16px (1rem) - standard icon size

  /**
   * Variant-based token structure
   * Organized by variant for token-driven styling
   */
  variant: {
    default: {
      background: "bg-[hsl(var(--tm-muted))]", // Muted background using CSS var
      border: "border-[hsl(var(--tm-border-default))]", // Border using CSS var
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
    } as const,
    primary: {
      background: "bg-[hsl(var(--tm-primary))]/10", // Primary background with opacity
      border: "border-[hsl(var(--tm-primary))]/20", // Primary border with opacity
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text using CSS var
    } as const,
    secondary: {
      background: "bg-[hsl(var(--tm-secondary))]/10", // Secondary background with opacity
      border: "border-[hsl(var(--tm-secondary))]/20", // Secondary border with opacity
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text using CSS var
    } as const,
    accent: {
      background: "bg-[hsl(var(--tm-accent))]/10", // Accent background with opacity
      border: "border-[hsl(var(--tm-accent))]/20", // Accent border with opacity
      text: "text-[hsl(var(--tm-accent-foreground))]", // Accent text using CSS var
    } as const,
    destructive: {
      background: "bg-[hsl(var(--tm-destructive))]/10", // Destructive background with opacity
      border: "border-[hsl(var(--tm-destructive))]/20", // Destructive border with opacity
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text using CSS var
    } as const,
  } as const,
} as const;
