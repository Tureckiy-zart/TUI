/**
 * ContextMenu Component Tokens
 *
 * Component-level design tokens for ContextMenu component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to context-menu-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * ContextMenu Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for ContextMenu component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const CONTEXT_MENU_TOKENS = {
  /**
   * ContextMenu size tokens
   * Supports sm, md, lg sizes
   */
  size: {
    sm: {
      content: {
        padding: "p-sm", // 8px (0.5rem)
        radius: "rounded-md", // 6px (0.375rem)
        minWidth: "min-w-32", // 128px (8rem)
      },
      item: {
        padding: {
          horizontal: "px-sm", // 8px (0.5rem)
          vertical: "py-xs", // 4px (0.25rem)
        },
        gap: "gap-xs", // 4px (0.25rem)
        fontSize: "text-xs", // Maps to fontSize.xs[0]
        height: "h-8", // 32px (2rem)
      },
    } as const,
    md: {
      content: {
        padding: "p-md", // 16px (1rem) - default
        radius: "rounded-lg", // 8px (0.5rem)
        minWidth: "min-w-48", // 192px (12rem)
      },
      item: {
        padding: {
          horizontal: "px-md", // 16px (1rem)
          vertical: "py-sm", // 8px (0.5rem)
        },
        gap: "gap-sm", // 8px (0.5rem)
        fontSize: "text-sm", // Maps to fontSize.sm[0] - default
        height: "h-10", // 40px (2.5rem)
      },
    } as const,
    lg: {
      content: {
        padding: "p-lg", // 24px (1.5rem)
        radius: "rounded-lg", // 8px (0.5rem)
        minWidth: "min-w-56", // 224px (14rem)
      },
      item: {
        padding: {
          horizontal: "px-lg", // 24px (1.5rem)
          vertical: "py-sm", // 8px (0.5rem)
        },
        gap: "gap-md", // 16px (1rem)
        fontSize: "text-base", // Maps to fontSize.base[0]
        height: "h-12", // 48px (3rem)
      },
    } as const,
  } as const,

  /**
   * ContextMenu width tokens
   * Independent width control for content
   */
  width: {
    auto: "w-auto",
    sm: "w-32", // 128px (8rem)
    md: "w-48", // 192px (12rem)
    lg: "w-56", // 224px (14rem)
    xl: "w-64", // 256px (16rem)
  } as const,

  /**
   * ContextMenu content tokens
   */
  content: {
    background: "bg-[hsl(var(--popover))]", // Background using CSS var
    text: "text-[hsl(var(--popover-foreground))]", // Text color using CSS var
    border: "border border-[hsl(var(--border))]", // Border color using CSS var
    shadow: "shadow-lg", // Maps to elevationShadows.lg
    surface: {
      flat: "bg-[hsl(var(--popover))]",
      raised: "bg-[hsl(var(--popover))] shadow-lg",
      sunken: "bg-[hsl(var(--muted))]",
      outline: "bg-[hsl(var(--popover))] border-2 border-[hsl(var(--border))]",
      subtle: "bg-[hsl(var(--muted))]",
    },
  } as const,

  /**
   * ContextMenu item tokens
   */
  item: {
    radius: "rounded-sm", // 4px (0.25rem)
    focus: {
      background: "focus:bg-[hsl(var(--accent))]", // Focus background using CSS var
      text: "focus:text-[hsl(var(--accent-foreground))]", // Focus text using CSS var
    },
    disabled: {
      opacity: "opacity-50", // Disabled opacity
      pointerEvents: "pointer-events-none", // Disable pointer events
    },
    tone: {
      neutral: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--foreground))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--accent))]",
          text: "hover:text-[hsl(var(--accent-foreground))]",
        },
      },
      primary: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--primary))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--primary))]",
          text: "hover:text-[hsl(var(--primary-foreground))]",
        },
      },
      destructive: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--destructive))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--destructive))]",
          text: "hover:text-[hsl(var(--destructive-foreground))]",
        },
      },
    },
  } as const,

  /**
   * ContextMenu separator tokens
   */
  separator: {
    margin: "my-xs", // 4px vertical margin
    height: "h-px", // 1px height
    color: "bg-[hsl(var(--border))]", // Border color using CSS var
  } as const,

  /**
   * ContextMenu label tokens
   */
  label: {
    padding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical
      md: "px-md py-sm", // 16px horizontal, 8px vertical - default
    },
    textStyle: "text-sm font-semibold", // Maps to fontSize.sm and fontWeight.semibold
    color: "text-[hsl(var(--muted-foreground))]", // Muted text color
  } as const,

  /**
   * ContextMenu indicator tokens (for checkboxes, radio buttons)
   */
  indicator: {
    size: "size-4", // 16px (1rem)
    position: "left-sm", // 8px (0.5rem) from left
  } as const,
} as const;

/**
 * Type exports for ContextMenu tokens
 */
export type ContextMenuSizeToken = keyof typeof CONTEXT_MENU_TOKENS.size;
export type ContextMenuWidthToken = keyof typeof CONTEXT_MENU_TOKENS.width;
export type ContextMenuItemToneToken = keyof typeof CONTEXT_MENU_TOKENS.item.tone;
export type ContextMenuSurfaceToken = keyof typeof CONTEXT_MENU_TOKENS.content.surface;
export type ContextMenuLabelPaddingToken = keyof typeof CONTEXT_MENU_TOKENS.label.padding;
