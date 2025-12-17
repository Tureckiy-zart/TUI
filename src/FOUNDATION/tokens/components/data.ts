/**
 * Data Component Tokens
 *
 * Component-level design tokens for Skeleton component only.
 *
 * Note: Other data components (Table, DataList, EmptyState, Pagination) have their own
 * isolated token domains:
 * - TABLE_TOKENS (src/tokens/components/table.ts)
 * - DATA_LIST_TOKENS (src/tokens/components/data-list.ts)
 * - EMPTY_STATE_TOKENS (src/tokens/components/empty-state.ts)
 * - PAGINATION_TOKENS (src/tokens/components/pagination.ts)
 *
 * Maps foundation tokens (spacing, typography, radius, shadows) to skeleton-specific usage.
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Data Component Tokens (Skeleton Only)
 *
 * Defines all spacing, sizing, typography, and visual tokens for Skeleton component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const DATA_TOKENS = {
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
} as const;

/**
 * Type exports for Data tokens (Skeleton only)
 */
export type SkeletonVariant = keyof typeof DATA_TOKENS.skeleton.height;
export type SkeletonAnimation = keyof typeof DATA_TOKENS.skeleton.animation;
export type SkeletonBackground = keyof typeof DATA_TOKENS.skeleton.background;
