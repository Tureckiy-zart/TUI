/**
 * Select Component Tokens
 *
 * Component-level design tokens for Select component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to select-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const SELECT_TOKENS = {
  /**
   * Select trigger heights by size
   * Supports xs, sm, md, lg, xl sizes
   */
  trigger: {
    height: {
      xs: "h-7", // 28px (1.75rem)
      sm: "h-8", // 32px (2rem)
      md: "h-9", // 36px (2.25rem) - default
      lg: "h-10", // 40px (2.5rem)
      xl: "h-11", // 44px (2.75rem)
    } as const,
    padding: {
      horizontal: {
        xs: "px-xs", // 4px (0.25rem)
        sm: "px-sm", // 8px (0.5rem)
        md: "px-sm", // 8px (0.5rem) - default
        lg: "px-md", // 16px (1rem)
        xl: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        xs: "py-xs", // 4px (0.25rem)
        sm: "py-xs", // 4px (0.25rem)
        md: "py-xs", // 4px (0.25rem) - default
        lg: "py-sm", // 8px (0.5rem)
        xl: "py-md", // 16px (1rem)
      },
    },
    radius: {
      xs: "rounded-sm", // 4px (0.25rem)
      sm: "rounded-md", // 6px (0.375rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
      xl: "rounded-lg", // 8px (0.5rem)
    },
    fontSize: {
      xs: "text-xs", // Maps to fontSize.xs[0]
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0] - default
      lg: "text-lg", // Maps to fontSize.lg[0]
      xl: "text-xl", // Maps to fontSize.xl[0]
    },
    icon: {
      size: "size-4", // 16px (1rem)
      gap: "gap-sm", // 8px (0.5rem)
      color: "text-[hsl(var(--tm-text-muted))]", // Icon color using CSS variable
    },
  } as const,

  /**
   * Select content (dropdown) tokens
   */
  content: {
    padding: {
      xs: "p-xs", // 4px (0.25rem)
      sm: "p-sm", // 8px (0.5rem)
      md: "p-sm", // 8px (0.5rem) - default
      lg: "p-md", // 16px (1rem)
      xl: "p-lg", // 24px (1.5rem)
    },
    radius: {
      xs: "rounded-sm", // 4px (0.25rem)
      sm: "rounded-md", // 6px (0.375rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
      xl: "rounded-lg", // 8px (0.5rem)
    },
    shadow: "shadow-md", // Maps to elevationShadows.md
    background: "bg-[hsl(var(--tm-surface-overlay))]", // Background using CSS var
    text: "text-[hsl(var(--tm-text-primary))]", // Text color using CSS var
    border: "border border-[hsl(var(--tm-border-default))]", // Border color using CSS var
    maxHeight: "max-h-96", // Maximum height for scrollable content (24rem = 384px) - maps to spacing[96]
    minWidth: "min-w-32", // Minimum width (8rem = 128px) - maps to spacing[32]
  } as const,

  /**
   * Select item tokens
   */
  item: {
    padding: {
      horizontal: {
        xs: "px-xs", // 4px (0.25rem)
        sm: "px-sm", // 8px (0.5rem)
        md: "px-sm", // 8px (0.5rem) - default
        lg: "px-md", // 16px (1rem)
        xl: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        xs: "py-xs", // 4px (0.25rem)
        sm: "py-xs", // 4px (0.25rem)
        md: "py-xs", // 4px (0.25rem) - default
        lg: "py-sm", // 8px (0.5rem)
        xl: "py-sm", // 8px (0.5rem)
      },
    },
    radius: {
      xs: "rounded-[4px]", // 4px (0.25rem) - using explicit value to avoid numeric class
      sm: "rounded-[4px]", // 4px (0.25rem)
      md: "rounded-[4px]", // 4px (0.25rem) - default
      lg: "rounded-[4px]", // 4px (0.25rem)
      xl: "rounded-md", // 6px (0.375rem)
    },
    fontSize: {
      xs: "text-xs", // Maps to fontSize.xs[0]
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0] - default
      lg: "text-lg", // Maps to fontSize.lg[0]
      xl: "text-xl", // Maps to fontSize.xl[0]
    },
    indicator: {
      size: "size-4", // 16px (1rem)
      position: "left-sm", // 8px (0.5rem) from left
    },
    focus: {
      background: "focus-visible:bg-[hsl(var(--tm-accent))]", // Focus background using CSS var
      text: "focus-visible:text-[hsl(var(--tm-accent-foreground))]", // Focus text using CSS var
    },
    hover: {
      background: "hover:bg-[hsl(var(--tm-accent))]", // Hover background using CSS var
      text: "hover:text-[hsl(var(--tm-accent-foreground))]", // Hover text using CSS var
    },
    selected: {
      background: "bg-[hsl(var(--tm-accent))]", // Selected background using CSS var
      text: "text-[hsl(var(--tm-accent-foreground))]", // Selected text using CSS var
    },
    disabled: {
      opacity: "opacity-50", // Disabled opacity
      pointerEvents: "pointer-events-none", // Disable pointer events
    },
  } as const,

  /**
   * Select label tokens
   */
  label: {
    padding: {
      horizontal: {
        xs: "px-xs", // 4px (0.25rem)
        sm: "px-sm", // 8px (0.5rem)
        md: "px-sm", // 8px (0.5rem) - default
        lg: "px-md", // 16px (1rem)
        xl: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        xs: "py-xs", // 4px (0.25rem)
        sm: "py-xs", // 4px (0.25rem)
        md: "py-xs", // 4px (0.25rem) - default
        lg: "py-sm", // 8px (0.5rem)
        xl: "py-sm", // 8px (0.5rem)
      },
    },
    fontSize: {
      xs: "text-xs", // Maps to fontSize.xs[0]
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0] - default
      lg: "text-lg", // Maps to fontSize.lg[0]
      xl: "text-xl", // Maps to fontSize.xl[0]
    },
    fontWeight: "font-semibold", // Semibold weight for labels
  } as const,

  /**
   * Select separator tokens
   */
  separator: {
    margin: {
      horizontal: {
        xs: "-mx-xs", // -4px
        sm: "-mx-xs", // -4px
        md: "-mx-xs", // -4px - default
        lg: "-mx-sm", // -8px
        xl: "-mx-sm", // -8px
      },
      vertical: {
        xs: "my-xs", // 4px (0.25rem)
        sm: "my-xs", // 4px (0.25rem)
        md: "my-xs", // 4px (0.25rem) - default
        lg: "my-sm", // 8px (0.5rem)
        xl: "my-sm", // 8px (0.5rem)
      },
    },
    height: "h-px", // 1px height
    background: "bg-[hsl(var(--tm-muted))]", // Background using CSS var
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      border: "border-[hsl(var(--tm-primary))]", // Primary border color
      background: "bg-[hsl(var(--tm-primary))]", // Primary background
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      border: "border-[hsl(var(--tm-surface-base))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      border: "border-[hsl(var(--tm-destructive))]", // Destructive border color
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    default: {
      border: "border-[hsl(var(--tm-surface-base))]", // Default border color using CSS var
      background: "bg-transparent", // Default background
      text: "text-[hsl(var(--tm-text-primary))]", // Default text color using CSS var
    },
    disabled: {
      border: "border-[hsl(var(--tm-surface-base))]", // Disabled state border (same as default)
      background: "bg-transparent", // Disabled background (same as default)
      text: "text-[hsl(var(--tm-text-primary))] disabled:opacity-50", // Disabled text opacity
      cursor: "cursor-not-allowed", // Disabled cursor
    },
    open: {
      border: "border-[hsl(var(--tm-focus-ring))]", // Open state border
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
    },
    closed: {
      border: "border-[hsl(var(--tm-surface-base))]", // Closed state border
    },
  } as const,

  /**
   * Width tokens
   */
  width: {
    auto: "w-auto", // Auto width
    full: "w-full", // Full width (100%)
    sm: "w-48", // 192px (12rem)
    md: "w-64", // 256px (16rem)
    lg: "w-80", // 320px (20rem)
    xl: "w-96", // 384px (24rem)
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    xs: {
      trigger: {
        height: "h-7",
        padding: {
          horizontal: "px-xs",
          vertical: "py-xs",
        },
        radius: "rounded-sm",
        fontSize: "text-xs",
      },
      item: {
        padding: {
          horizontal: "px-xs",
          vertical: "py-xs",
        },
        fontSize: "text-xs",
      },
      content: {
        padding: "p-xs",
        radius: "rounded-sm",
      },
    },
    sm: {
      trigger: {
        height: "h-8",
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        radius: "rounded-md",
        fontSize: "text-sm",
      },
      item: {
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        fontSize: "text-sm",
      },
      content: {
        padding: "p-sm",
        radius: "rounded-md",
      },
    },
    md: {
      trigger: {
        height: "h-9",
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        radius: "rounded-md",
        fontSize: "text-base",
      },
      item: {
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        fontSize: "text-base",
      },
      content: {
        padding: "p-sm",
        radius: "rounded-md",
      },
    },
    lg: {
      trigger: {
        height: "h-10",
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        radius: "rounded-md",
        fontSize: "text-lg",
      },
      item: {
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        fontSize: "text-lg",
      },
      content: {
        padding: "p-md",
        radius: "rounded-md",
      },
    },
    xl: {
      trigger: {
        height: "h-11",
        padding: {
          horizontal: "px-lg",
          vertical: "py-md",
        },
        radius: "rounded-lg",
        fontSize: "text-xl",
      },
      item: {
        padding: {
          horizontal: "px-lg",
          vertical: "py-sm",
        },
        fontSize: "text-xl",
      },
      content: {
        padding: "p-lg",
        radius: "rounded-lg",
      },
    },
  } as const,
} as const;

/**
 * Type exports for Select tokens
 */
export type SelectSizeToken = keyof typeof SELECT_TOKENS.size;
export type SelectVariantToken = keyof typeof SELECT_TOKENS.variant;
export type SelectWidthToken = keyof typeof SELECT_TOKENS.width;
export type SelectStateToken = keyof typeof SELECT_TOKENS.state;
export type SelectTriggerHeight = keyof typeof SELECT_TOKENS.trigger.height;
export type SelectTriggerPaddingHorizontal = keyof typeof SELECT_TOKENS.trigger.padding.horizontal;
export type SelectTriggerPaddingVertical = keyof typeof SELECT_TOKENS.trigger.padding.vertical;
export type SelectTriggerRadius = keyof typeof SELECT_TOKENS.trigger.radius;
export type SelectTriggerFontSize = keyof typeof SELECT_TOKENS.trigger.fontSize;
export type SelectContentPadding = keyof typeof SELECT_TOKENS.content.padding;
export type SelectContentRadius = keyof typeof SELECT_TOKENS.content.radius;
export type SelectItemPaddingHorizontal = keyof typeof SELECT_TOKENS.item.padding.horizontal;
export type SelectItemPaddingVertical = keyof typeof SELECT_TOKENS.item.padding.vertical;
export type SelectItemRadius = keyof typeof SELECT_TOKENS.item.radius;
export type SelectItemFontSize = keyof typeof SELECT_TOKENS.item.fontSize;
export type SelectLabelPaddingHorizontal = keyof typeof SELECT_TOKENS.label.padding.horizontal;
export type SelectLabelPaddingVertical = keyof typeof SELECT_TOKENS.label.padding.vertical;
export type SelectLabelFontSize = keyof typeof SELECT_TOKENS.label.fontSize;
export type SelectSeparatorMarginHorizontal =
  keyof typeof SELECT_TOKENS.separator.margin.horizontal;
export type SelectSeparatorMarginVertical = keyof typeof SELECT_TOKENS.separator.margin.vertical;
