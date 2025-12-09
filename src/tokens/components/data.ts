/**
 * Data Component Tokens
 *
 * Component-level design tokens for data display components (Table, DataList, Skeleton, EmptyState).
 * Maps foundation tokens (spacing, typography, radius, shadows) to data component-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Data Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for data display components.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const DATA_TOKENS = {
  /**
   * Table Component Tokens
   */
  table: {
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
  },

  /**
   * Skeleton Component Tokens
   */
  skeleton: {
    /**
     * Skeleton heights by variant
     * Maps to Tailwind height utilities
     */
    height: {
      text: "h-4", // 16px (1rem) - text line height
      circle: "h-10 w-10", // 40px × 40px (2.5rem) - circular skeleton
      block: "h-20", // 80px (5rem) - block skeleton
      card: "h-32", // 128px (8rem) - card skeleton
      inline: "h-4", // 16px (1rem) - inline text
    } as const,

    /**
     * Border radius by variant
     * Maps to foundation borderRadius tokens
     */
    radius: {
      text: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
      circle: "rounded-full", // Full circle - maps to borderRadius.full
      block: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
      card: "rounded-xl", // 12px (0.75rem) - maps to borderRadius.xl
      inline: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    } as const,

    /**
     * Animation tokens
     * Uses motion tokens for animations
     */
    animation: {
      pulse: "animate-pulse", // Pulse animation from motion tokens
      fade: "animate-pulse", // Fade animation (using pulse as fallback)
    } as const,

    /**
     * Background color tokens
     * Uses semantic color tokens
     */
    background: {
      default: "bg-muted", // Default skeleton background
      subtle: "bg-muted/50", // Subtle skeleton background
    } as const,

    /**
     * Width tokens for skeleton variants
     */
    width: {
      full: "w-full", // Full width (100%)
      inline: "inline-block", // Inline block display
    } as const,
  },

  /**
   * EmptyState Component Tokens
   */
  emptyState: {
    /**
     * Spacing tokens for EmptyState
     * Maps to semantic spacing tokens
     */
    spacing: {
      gap: "gap-md", // 16px (1rem) - gap between elements - maps to semanticSpacing.md
      padding: "p-lg", // 24px (1.5rem) - container padding - maps to semanticSpacing.lg
    } as const,

    /**
     * Border radius for EmptyState container
     */
    radius: {
      default: "rounded-xl", // 12px (0.75rem) - maps to borderRadius.xl
    } as const,

    /**
     * Icon sizes by variant
     * Maps to Tailwind size utilities
     */
    iconSize: {
      sm: "size-8", // 32px (2rem)
      md: "size-12", // 48px (3rem)
      lg: "size-16", // 64px (4rem)
    } as const,

    /**
     * Typography tokens for EmptyState
     * Maps to foundation typography tokens
     */
    typography: {
      title: {
        fontSize: "text-lg", // Maps to fontSize.lg[0]
        fontWeight: "font-semibold", // Maps to fontWeight.semibold
      },
      description: {
        fontSize: "text-sm", // Maps to fontSize.sm[0]
        fontWeight: "font-normal", // Maps to fontWeight.normal
      },
    } as const,
  },

  /**
   * DataList Component Tokens
   */
  dataList: {
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
  },
} as const;

/**
 * Type exports for Data tokens
 */
export type TableRowHeight = keyof typeof DATA_TOKENS.table.rowHeight;
export type TableCellPadding = keyof typeof DATA_TOKENS.table.padding.cell;
export type TableHeaderPadding = keyof typeof DATA_TOKENS.table.padding.header;
export type TableGap = keyof typeof DATA_TOKENS.table.gap;
export type TableShadow = keyof typeof DATA_TOKENS.table.shadow;

export type SkeletonVariant = keyof typeof DATA_TOKENS.skeleton.height;
export type SkeletonAnimation = keyof typeof DATA_TOKENS.skeleton.animation;
export type SkeletonBackground = keyof typeof DATA_TOKENS.skeleton.background;

export type EmptyStateIconSize = keyof typeof DATA_TOKENS.emptyState.iconSize;

export type DataListLabelWidth = keyof typeof DATA_TOKENS.dataList.labelWidth;
export type DataListRowPadding = keyof typeof DATA_TOKENS.dataList.rowPadding;
