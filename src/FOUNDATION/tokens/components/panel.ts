/**
 * Panel Component Tokens
 *
 * Component-level design tokens for Panel component.
 * Maps foundation tokens (spacing, radius, shadows) to panel-specific usage.
 *
 * Panel is a lightweight structural surface container that sits between Box and Card
 * in semantic hierarchy. Panel provides surface styling without interactivity.
 *
 * Panel tokens are designed to be lighter than Card tokens (lower elevation, subtler styling).
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Panel Component Tokens
 *
 * Defines spacing, radius, tone, background, border, and shadow tokens for Panel component.
 * Values are mapped to Tailwind utility classes for direct use.
 * Uses surface tone variants: default, muted, subtle.
 */
export const PANEL_TOKENS = {
  /**
   * Padding values for panels
   * Maps to semantic spacing tokens
   */
  padding: {
    sm: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "p-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
  } as const,

  /**
   * Border radius for panels
   * Maps to borderRadius scale
   */
  radius: {
    sm: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    md: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
    xl: "rounded-xl", // 12px (0.75rem) - maps to borderRadius.xl
  } as const,

  /**
   * Shadow tokens for panels
   * Panel shadows are minimal or none (below Card elevation)
   * Card uses shadow/shadow-sm/shadow-md, Panel uses shadow-none or shadow-xs
   */
  shadow: {
    none: "shadow-none", // No shadow - maps to elevationShadows.none
    xs: "shadow-xs", // Extra small shadow - maps to elevationShadows.xs (minimal elevation)
  } as const,

  /**
   * Tone-based token structure
   * Organized by tone for easy access
   * Uses surface tone variants: default, muted, subtle
   */
  tone: {
    default: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-[hsl(var(--tm-surface-base))]",
      border: "border border-[hsl(var(--tm-border-default))]",
    },
    muted: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-[hsl(var(--tm-muted))]",
      border: "border border-[hsl(var(--tm-border-default))]",
    },
    subtle: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-[hsl(var(--tm-muted))]/50",
      border: "border border-[hsl(var(--tm-border-default))]/50",
    },
  } as const,
} as const;

/**
 * Type exports for Panel tokens
 */
export type PanelPadding = keyof typeof PANEL_TOKENS.padding;
export type PanelRadius = keyof typeof PANEL_TOKENS.radius;
export type PanelShadow = keyof typeof PANEL_TOKENS.shadow;
export type PanelTone = keyof typeof PANEL_TOKENS.tone;
