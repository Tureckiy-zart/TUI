/**
 * Table Component Tokens
 *
 * Component-level design tokens for Table component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to table-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to Table component only.
 * No other components should import or use TABLE_TOKENS.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Table Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Table component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const TABLE_TOKENS = {
  /**
   * Table row heights by size
   * Maps to Tailwind height utilities
   */
  rowHeight: {
    sm: "h-8", // 32px (2rem) - compact rows
    md: "h-10", // 40px (2.5rem) - default rows
    lg: "h-12", // 48px (3rem) - spacious rows
  } as const,

  /**
   * Table cell and header padding by size
   * Maps to semantic spacing tokens
   */
  padding: {
    cell: {
      sm: "p-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      md: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      lg: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    },
    header: {
      sm: "px-xs py-sm", // 4px horizontal, 8px vertical
      md: "px-sm py-md", // 8px horizontal, 16px vertical
      lg: "px-md py-lg", // 16px horizontal, 24px vertical
    },
  } as const,

  /**
   * Gap between table cells (horizontal spacing)
   */
  gap: {
    sm: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    md: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
  } as const,

  /**
   * Border radius for table
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
  } as const,

  /**
   * Shadow tokens for table
   * Maps to foundation elevation shadow tokens
   */
  shadow: {
    none: "shadow-none", // No shadow
    subtle: "shadow-sm", // Maps to elevationShadows.sm
  } as const,

  /**
   * Typography tokens for table headers and cells
   * Maps to foundation typography fontSize tokens
   */
  typography: {
    header: {
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      fontWeight: "font-semibold", // Maps to fontWeight.semibold
    },
    cell: {
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      fontWeight: "font-normal", // Maps to fontWeight.normal
    },
  } as const,

  /**
   * Color tokens for table states
   * Uses semantic color tokens
   */
  colors: {
    border: "border-border", // Border color
    rowHover: "hover:bg-muted/50", // Row hover background
    rowSelected: "bg-muted", // Selected row background
  } as const,

  /**
   * Border tokens for table
   */
  border: {
    bottom: "border-b", // Border bottom for rows and headers
  } as const,

  /**
   * Layout tokens for table container and base styles
   */
  layout: {
    overflow: "overflow-x-auto", // Table container overflow
    table: "w-full border-collapse", // Table base styles
  } as const,

  /**
   * Sticky header tokens
   * For sticky header positioning and styling
   */
  sticky: {
    header: "sticky top-0 z-10 bg-background", // Sticky header styles
  } as const,

  /**
   * Expandable row tokens
   * For expandable content styling
   */
  expandable: {
    padding: "p-md", // Expandable content padding - maps to semanticSpacing.md
    container: "p-0", // Expandable container padding
    transition: "overflow-hidden transition-all duration-normal ease-in-out", // Transition styles
    expanded: "max-h-[100vh] opacity-100", // Expanded state
    collapsed: "max-h-0 opacity-0", // Collapsed state
    cursor: "cursor-pointer", // Cursor for expandable rows
    content: {
      expanded: "block", // Expanded content display
      collapsed: "hidden", // Collapsed content display
    },
  } as const,

  /**
   * Loading state tokens
   * For loading state cell styling
   */
  loading: {
    cellPadding: "p-sm", // Loading state cell padding - maps to semanticSpacing.sm
    skeletonWidth: "w-full", // Skeleton width
  } as const,

  /**
   * Empty state tokens
   * For empty state cell styling
   */
  empty: {
    padding: "p-8", // Empty state padding - maps to semanticSpacing.2xl
  } as const,

  /**
   * Sortable header tokens
   * For sortable header styling and interactions
   */
  sortable: {
    hover: "hover:bg-muted/50", // Sortable header hover
    gap: "gap-2", // Sort icon gap - maps to semanticSpacing.sm
    cursor: "cursor-pointer select-none", // Sortable cursor
    container: "flex items-center", // Sortable header container
    icon: {
      base: "inline-flex size-4 items-center text-muted-foreground transition-transform", // Sort icon base styles
      rotated: "rotate-180", // Rotated state (descending)
      inactive: "opacity-30", // Inactive state (no sort)
    },
  } as const,
} as const;

/**
 * Type exports for Table tokens
 */
export type TableRowHeight = keyof typeof TABLE_TOKENS.rowHeight;
export type TableCellPadding = keyof typeof TABLE_TOKENS.padding.cell;
export type TableHeaderPadding = keyof typeof TABLE_TOKENS.padding.header;
export type TableGap = keyof typeof TABLE_TOKENS.gap;
export type TableShadow = keyof typeof TABLE_TOKENS.shadow;
