/**
 * SimpleTable Component Tokens
 *
 * Component-level design tokens for SimpleTable component.
 * Maps foundation tokens (spacing, typography, radius) to simple-table-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * SimpleTable Component Tokens
 *
 * Defines tokens for simple table spacing, typography, and layout by size.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const SIMPLETABLE_TOKENS = {
  /**
   * Cell padding by size
   * Maps to semanticSpacing tokens
   */
  padding: {
    cell: {
      sm: "p-xs", // 4px - maps to semanticSpacing.xs
      md: "p-sm", // 8px - maps to semanticSpacing.sm
      lg: "p-md", // 16px - maps to semanticSpacing.md
    },
    header: {
      sm: "px-xs py-xs", // 4px horizontal, 4px vertical
      md: "px-sm py-sm", // 8px horizontal, 8px vertical
      lg: "px-md py-md", // 16px horizontal, 16px vertical
    },
  } as const,

  /**
   * Typography tokens for table headers and cells by size
   * Maps to fontSize and fontWeight tokens
   */
  typography: {
    header: {
      sm: "text-xs font-medium text-[hsl(var(--tm-text-muted))]", // Maps to fontSize.xs, fontWeight.medium
      md: "text-sm font-medium text-[hsl(var(--tm-text-muted))]", // Maps to fontSize.sm, fontWeight.medium
      lg: "text-base font-medium text-[hsl(var(--tm-text-muted))]", // Maps to fontSize.base, fontWeight.medium
    },
    cell: {
      sm: "text-xs", // Maps to fontSize.xs
      md: "text-sm", // Maps to fontSize.sm
      lg: "text-base", // Maps to fontSize.base
    },
  } as const,

  /**
   * Layout tokens for table container and base styles
   */
  layout: {
    overflow: "overflow-x-auto", // Table container overflow
    table: "w-full border-collapse", // Table base styles
  } as const,

  /**
   * Border tokens for table
   */
  border: {
    bottom: "border-b", // Border bottom for rows and headers
    color: "border-[hsl(var(--tm-border-default))]", // Border color
  } as const,

  /**
   * State tokens for table rows
   */
  state: {
    rowHover: "hover:bg-muted/50", // Row hover background
  } as const,

  /**
   * Text alignment tokens
   */
  alignment: {
    left: "text-left", // Left alignment
  } as const,
} as const;

/**
 * Type exports for SimpleTable tokens
 */
export type SimpleTableSize = keyof typeof SIMPLETABLE_TOKENS.padding.cell;
