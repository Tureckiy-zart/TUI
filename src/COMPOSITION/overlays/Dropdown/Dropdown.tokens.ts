/**
 * Dropdown Component Tokens
 *
 * Component-level design tokens for Dropdown component.
 * Maps foundation tokens (spacing, radius, shadows) to dropdown-specific usage.
 *
 * Dropdown is a composition over Popover, so it reuses POPOVER_TOKENS for content styling
 * and defines additional tokens for DropdownItem and DropdownSeparator.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Re-export Popover tokens for content styling
export type {
  PopoverContentPadding,
  PopoverContentRadius,
  PopoverContentShadow,
  PopoverContentWidth,
} from "@/FOUNDATION/tokens/components/popover";
export { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";

/**
 * Dropdown Component Tokens
 *
 * Defines tokens for dropdown items and separators.
 * Content styling is handled by POPOVER_TOKENS via PopoverContent.
 */
export const DROPDOWN_TOKENS = {
  /**
   * Dropdown item tokens
   * Maps to foundation spacing, radius, and surface tokens
   */
  item: {
    /**
     * Padding tokens for dropdown items
     * Maps to semantic spacing tokens
     */
    padding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical
      md: "px-md py-sm", // 16px horizontal, 8px vertical - default
      lg: "px-lg py-md", // 24px horizontal, 16px vertical
    } as const,
    /**
     * Border radius for dropdown items
     * Maps to foundation radius tokens
     */
    radius: "rounded-sm", // 4px (0.25rem)
    /**
     * Hover state tokens
     * Maps to surface tokens for hover background
     */
    hover: {
      background: "hover:bg-[hsl(var(--tm-accent))]", // Accent background on hover
      text: "hover:text-[hsl(var(--tm-accent-foreground))]", // Accent text on hover
    } as const,
    /**
     * Focus state tokens
     * Maps to focus ring tokens
     */
    focus: {
      background: "focus-visible:bg-[hsl(var(--tm-accent))]", // Focus background
      text: "focus-visible:text-[hsl(var(--tm-accent-foreground))]", // Focus text
      outline: "focus-visible:outline-none", // Remove default outline
    } as const,
    /**
     * Disabled state tokens
     */
    disabled: {
      opacity: "opacity-50", // Disabled opacity
      pointerEvents: "pointer-events-none", // Disable pointer events
      cursor: "cursor-not-allowed", // Disabled cursor
    } as const,
  } as const,

  /**
   * Dropdown separator tokens
   * Maps to foundation spacing and border tokens
   */
  separator: {
    /**
     * Margin tokens for separator
     * Maps to semantic spacing tokens
     */
    margin: "my-xs", // 4px vertical margin
    /**
     * Height token for separator line
     */
    height: "h-px", // 1px height
    /**
     * Color token for separator line
     * Maps to border color token
     */
    color: "bg-[hsl(var(--tm-border-default))]", // Border color using token
  } as const,
} as const;

/**
 * Type exports for Dropdown tokens
 */
export type DropdownItemPadding = keyof typeof DROPDOWN_TOKENS.item.padding;
