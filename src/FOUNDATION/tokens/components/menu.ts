/**
 * Menu Component Tokens
 *
 * Component-level design tokens for Menu components (DropdownMenu, ContextMenu).
 * Maps foundation tokens (spacing, radius, shadows, typography, motion) to menu-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Menu Component Tokens
 *
 * Defines tokens for menu items, content, separators, labels, and indicators.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const MENU_TOKENS = {
  /**
   * Menu item tokens by size
   * Maps to foundation spacing and radius tokens
   */
  item: {
    padding: {
      xs: "px-xs py-xs", // 4px horizontal, 4px vertical - maps to semanticSpacing.xs
      sm: "px-sm py-sm", // 8px horizontal, 8px vertical - maps to semanticSpacing.sm
      md: "px-md py-sm", // 16px horizontal, 8px vertical - maps to semanticSpacing.md/sm
    } as const,
    radius: {
      sm: "rounded-sm", // 4px - maps to borderRadius.sm
      md: "rounded-md", // 6px - maps to borderRadius.md
    } as const,
    gap: {
      xs: "gap-xs", // 4px - maps to semanticSpacing.xs
      sm: "gap-sm", // 8px - maps to semanticSpacing.sm
    } as const,
    height: {
      sm: "h-8", // 32px - maps to spacing[8]
      md: "h-10", // 40px - maps to spacing[10]
      lg: "h-12", // 48px - maps to spacing[12]
    } as const,
  } as const,

  /**
   * Menu content tokens by size
   * Maps to foundation spacing, radius, and shadow tokens
   */
  content: {
    padding: {
      sm: "p-sm", // 8px - maps to semanticSpacing.sm
      md: "p-md", // 16px - maps to semanticSpacing.md
    } as const,
    radius: {
      sm: "rounded-md", // 6px - maps to borderRadius.md
      md: "rounded-lg", // 8px - maps to borderRadius.lg
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
    } as const,
    minWidth: {
      sm: "min-w-32", // 128px - maps to spacing[32]
      md: "min-w-48", // 192px - maps to spacing[48]
    } as const,
  } as const,

  /**
   * Menu separator tokens
   * Maps to foundation spacing and color tokens
   */
  separator: {
    margin: {
      sm: "my-xs", // 4px vertical margin - maps to semanticSpacing.xs
      md: "my-sm", // 8px vertical margin - maps to semanticSpacing.sm
    } as const,
    height: "h-px", // 1px height
    color: "bg-border", // Maps to border color token
  } as const,

  /**
   * Menu label tokens
   * Maps to foundation spacing and typography tokens
   */
  label: {
    padding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical - maps to semanticSpacing.sm/xs
      md: "px-md py-sm", // 16px horizontal, 8px vertical - maps to semanticSpacing.md/sm
    } as const,
    textStyle: "text-sm font-semibold", // Maps to fontSize.sm and fontWeight.semibold
  } as const,

  /**
   * Menu indicator tokens (for checkboxes, radio buttons)
   * Maps to foundation spacing tokens
   */
  indicator: {
    size: {
      sm: "w-4 h-4", // 16px - maps to spacing[4]
      md: "w-5 h-5", // 20px - maps to spacing[5]
    } as const,
    offset: {
      sm: "left-xs", // 4px - maps to semanticSpacing.xs
      md: "left-sm", // 8px - maps to semanticSpacing.sm
    } as const,
  } as const,
} as const;

/**
 * Type exports for Menu tokens
 */
export type MenuItemPadding = keyof typeof MENU_TOKENS.item.padding;
export type MenuItemRadius = keyof typeof MENU_TOKENS.item.radius;
export type MenuItemGap = keyof typeof MENU_TOKENS.item.gap;
export type MenuItemHeight = keyof typeof MENU_TOKENS.item.height;
export type MenuContentPadding = keyof typeof MENU_TOKENS.content.padding;
export type MenuContentRadius = keyof typeof MENU_TOKENS.content.radius;
export type MenuContentShadow = keyof typeof MENU_TOKENS.content.shadow;
export type MenuContentMinWidth = keyof typeof MENU_TOKENS.content.minWidth;
export type MenuSeparatorMargin = keyof typeof MENU_TOKENS.separator.margin;
export type MenuLabelPadding = keyof typeof MENU_TOKENS.label.padding;
export type MenuIndicatorSize = keyof typeof MENU_TOKENS.indicator.size;
export type MenuIndicatorOffset = keyof typeof MENU_TOKENS.indicator.offset;
