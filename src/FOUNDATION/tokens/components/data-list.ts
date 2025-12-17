/**
 * DataList Component Tokens
 *
 * Component-level design tokens for DataList component.
 * Maps foundation tokens (spacing, typography) to data-list-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to DataList component only.
 * No other components should import or use DATA_LIST_TOKENS.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * DataList Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for DataList component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const DATA_LIST_TOKENS = {
  /**
   * Spacing tokens for DataList
   * Maps to semantic spacing tokens
   */
  spacing: {
    gap: "gap-md", // 16px (1rem) - gap between items - maps to semanticSpacing.md
    padding: "p-md", // 16px (1rem) - container padding - maps to semanticSpacing.md
  } as const,

  /**
   * Label width tokens (for desktop horizontal layout)
   * Maps to Tailwind width utilities
   */
  labelWidth: {
    sm: "w-24", // 96px (6rem) - small label width
    md: "w-32", // 128px (8rem) - default label width
    lg: "w-40", // 160px (10rem) - large label width
  } as const,

  /**
   * Row padding tokens
   * Maps to semantic spacing tokens
   */
  rowPadding: {
    sm: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    md: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    lg: "py-md", // 16px (1rem) - maps to semanticSpacing.md
  } as const,

  /**
   * Item tokens
   * For individual DataList item styling
   */
  item: {
    /**
     * Border tokens for items
     */
    border: "border-b border-border last:border-0", // Item borders
    /**
     * Responsive layout tokens
     */
    layout: {
      mobile: "flex flex-col", // Mobile layout - vertical
      desktop: "md:flex-row md:items-center", // Desktop layout - horizontal
    },
  } as const,

  /**
   * Label tokens
   * For DataList label styling
   */
  label: {
    mobile: "mb-1 font-semibold text-foreground", // Mobile label styles
    desktop: "md:mb-0", // Desktop label margin override
  } as const,

  /**
   * Value tokens
   * For DataList value styling
   */
  value: {
    color: "text-muted-foreground", // Value text color
    flex: "flex-1", // Value flex grow
  } as const,
} as const;

/**
 * Type exports for DataList tokens
 */
export type DataListLabelWidth = keyof typeof DATA_LIST_TOKENS.labelWidth;
export type DataListRowPadding = keyof typeof DATA_LIST_TOKENS.rowPadding;
