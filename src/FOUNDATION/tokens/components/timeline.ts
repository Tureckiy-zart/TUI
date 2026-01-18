/**
 * Timeline Component Tokens
 *
 * Component-level design tokens for Timeline component.
 * Maps foundation tokens (spacing, typography, radius, colors) to timeline-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to Timeline component only.
 * No other components should import or use TIMELINE_TOKENS.
 */

/**
 * Timeline Component Tokens
 *
 * Defines all spacing, sizing, radius, border, and color tokens for Timeline component.
 * Values are mapped to Tailwind utility classes for direct use in component.
 */
export const TIMELINE_TOKENS = {
  /**
   * Spacing tokens for Timeline container
   * Maps to semantic spacing tokens
   */
  spacing: {
    /**
     * Gap between timeline items
     * Maps to semanticSpacing.lg (24px / 1.5rem)
     */
    gap: "space-y-lg",
  } as const,

  /**
   * Timeline dot (indicator) tokens
   * For the circular indicator at each timeline event
   */
  dot: {
    /**
     * Dot size (width and height)
     * Maps to spacing[3] (12px / 0.75rem)
     */
    size: "h-3 w-3",

    /**
     * Dot border radius
     * Maps to borderRadius.full (fully rounded)
     */
    radius: "rounded-full",

    /**
     * Dot border
     * 2px border width
     */
    border: "border-2",

    /**
     * Dot border color
     * Maps to background color token
     */
    borderColor: "border-[hsl(var(--tm-surface-base))]",

    /**
     * Dot background color
     * Maps to primary color token
     */
    background: "bg-primary",
  } as const,

  /**
   * Timeline connector line tokens
   * For the vertical line connecting timeline events
   */
  connector: {
    /**
     * Connector line margin top
     * Maps to semanticSpacing.sm (8px / 0.5rem)
     */
    marginTop: "mt-sm",

    /**
     * Connector line height
     * Maps to spacing[12] (48px / 3rem)
     */
    height: "h-12",

    /**
     * Connector line width
     * 1px width
     */
    width: "w-px",

    /**
     * Connector line background color
     * Maps to border color token
     */
    background: "bg-border",
  } as const,

  /**
   * Timeline content tokens
   * For the content area (title, date, description)
   */
  content: {
    /**
     * Content margin left
     * Maps to semanticSpacing.md (16px / 1rem)
     */
    marginLeft: "ml-md",
  } as const,
} as const;
