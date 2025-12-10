/**
 * Dropdown Component Tokens
 *
 * Component-level design tokens for Dropdown component.
 * Maps foundation tokens (spacing, radius, shadows, typography) to dropdown-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Dropdown Component Tokens
 *
 * Defines tokens for trigger, menu, and item variants.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const DROPDOWN_TOKENS = {
  /**
   * Trigger tokens by size
   * Button element that opens/closes the dropdown
   */
  trigger: {
    height: {
      sm: "h-8", // 32px
      md: "h-9", // 36px
      lg: "h-10", // 40px
    } as const,
    padding: {
      horizontal: {
        sm: "px-sm", // 8px
        md: "px-md", // 16px
        lg: "px-lg", // 24px
      } as const,
      vertical: {
        sm: "py-xs", // 4px
        md: "py-xs", // 4px
        lg: "py-sm", // 8px
      } as const,
    } as const,
    radius: {
      sm: "rounded-md", // 6px
      md: "rounded-md", // 6px
      lg: "rounded-md", // 6px
    } as const,
    fontSize: {
      sm: "text-sm", // Maps to fontSize.sm
      md: "text-base", // Maps to fontSize.base
      lg: "text-base", // Maps to fontSize.base
    } as const,
    shadow: "shadow-sm", // Maps to elevationShadows.sm
    /**
     * Icon spacing for trigger
     */
    icon: {
      spacing: "ml-sm", // 8px - spacing between trigger text and icon
    } as const,
  } as const,

  /**
   * Variant-based tokens
   * Border, background, text, and focus colors for different variants
   */
  variant: {
    neutral: {
      border: "border border-[hsl(var(--border))]", // Border color using CSS var
      background: "bg-[hsl(var(--popover))]", // Background using CSS var
      text: "text-[hsl(var(--popover-foreground))]", // Text color using CSS var
      focus:
        "focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2", // Focus ring
    } as const,
    tinted: {
      border: "border border-[hsl(var(--border))]", // Border color using CSS var
      background: "bg-[hsl(var(--muted))]", // Background using CSS var
      text: "text-[hsl(var(--popover-foreground))]", // Text color using CSS var
      focus:
        "focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2", // Focus ring
    } as const,
  } as const,

  /**
   * Menu tokens by size
   * Container for the dropdown items
   */
  menu: {
    border: {
      default: "border border-[hsl(var(--border))]", // Border color using CSS var
    } as const,
    background: {
      neutral: "bg-[hsl(var(--popover))]", // Background using CSS var
      tinted: "bg-[hsl(var(--muted))]", // Background using CSS var
    } as const,
    text: {
      default: "text-[hsl(var(--popover-foreground))]", // Text color using CSS var
    } as const,
    padding: {
      sm: "p-sm", // 8px
      md: "p-md", // 16px
      lg: "p-lg", // 24px
    } as const,
    radius: {
      sm: "rounded-md", // 6px
      md: "rounded-lg", // 8px
      lg: "rounded-lg", // 8px
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
      lg: "shadow-xl", // Maps to elevationShadows.xl
    } as const,
    minWidth: {
      sm: "min-w-32", // 128px
      md: "min-w-48", // 192px
      lg: "min-w-64", // 256px
    } as const,
  } as const,

  /**
   * Item tokens by size
   * Individual menu item
   */
  item: {
    background: {
      focus: "focus:bg-[hsl(var(--accent))]", // Focus background using CSS var
      selected: "bg-[hsl(var(--accent))]", // Selected background using CSS var
    } as const,
    text: {
      focus: "focus:text-[hsl(var(--accent-foreground))]", // Focus text using CSS var
      selected: "text-[hsl(var(--accent-foreground))]", // Selected text using CSS var
    } as const,
    padding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical
      md: "px-md py-xs", // 16px horizontal, 4px vertical
      lg: "px-lg py-sm", // 24px horizontal, 8px vertical
    } as const,
    radius: {
      sm: "rounded-sm", // 4px
      md: "rounded-md", // 6px
      lg: "rounded-md", // 6px
    } as const,
    fontSize: {
      sm: "text-sm", // Maps to fontSize.sm
      md: "text-sm", // Maps to fontSize.sm
      lg: "text-base", // Maps to fontSize.base
    } as const,
  } as const,
} as const;

/**
 * Type exports for Dropdown tokens
 */
export type DropdownTriggerSize = keyof typeof DROPDOWN_TOKENS.trigger.height;
export type DropdownVariant = keyof typeof DROPDOWN_TOKENS.variant;
export type DropdownMenuSize = keyof typeof DROPDOWN_TOKENS.menu.padding;
export type DropdownItemSize = keyof typeof DROPDOWN_TOKENS.item.padding;
