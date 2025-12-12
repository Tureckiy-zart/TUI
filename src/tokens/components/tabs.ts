/**
 * Tabs Component Tokens
 *
 * Component-level design tokens for Tabs component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to tabs-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Tabs Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Tabs component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const TABS_TOKENS = {
  /**
   * Tabs trigger tokens by size
   * Supports sm, md, lg sizes
   */
  trigger: {
    height: {
      sm: "h-8", // 32px (2rem)
      md: "h-9", // 36px (2.25rem) - default
      lg: "h-10", // 40px (2.5rem)
    } as const,
    padding: {
      horizontal: {
        sm: "px-sm", // 8px (0.5rem)
        md: "px-md", // 16px (1rem) - default
        lg: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        sm: "py-xs", // 4px (0.25rem)
        md: "py-sm", // 8px (0.5rem) - default
        lg: "py-sm", // 8px (0.5rem)
      },
    },
    radius: {
      sm: "rounded-sm", // 4px (0.25rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
    },
    fontSize: {
      sm: "text-xs", // Maps to fontSize.xs[0]
      md: "text-sm", // Maps to fontSize.sm[0] - default
      lg: "text-base", // Maps to fontSize.base[0]
    },
    fontWeight: "font-medium", // Medium weight for triggers
    icon: {
      size: "size-4", // 16px (1rem)
      gap: "gap-sm", // 8px (0.5rem)
      color: "text-[hsl(var(--muted-foreground))]", // Icon color using CSS variable
    },
  } as const,

  /**
   * Tabs list tokens
   */
  list: {
    gap: {
      xs: "gap-xs", // 4px (0.25rem)
      sm: "gap-sm", // 8px (0.5rem)
      md: "gap-md", // 16px (1rem) - default
      lg: "gap-lg", // 24px (1.5rem)
    },
    padding: {
      xs: "p-xs", // 4px (0.25rem)
      sm: "p-sm", // 8px (0.5rem)
      md: "p-sm", // 8px (0.5rem) - default
      lg: "p-md", // 16px (1rem)
    },
    background: {
      transparent: "bg-transparent",
      muted: "bg-[hsl(var(--muted))]",
    },
  } as const,

  /**
   * Tabs content tokens
   */
  content: {
    padding: {
      sm: "p-sm", // 8px (0.5rem)
      md: "p-md", // 16px (1rem) - default
      lg: "p-lg", // 24px (1.5rem)
    },
    marginTop: {
      sm: "mt-sm", // 8px (0.5rem)
      md: "mt-md", // 16px (1rem) - default
      lg: "mt-lg", // 24px (1.5rem)
    },
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    underline: {
      // Underline variant - simple underline indicator
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--foreground))]",
          border: "border-transparent",
        },
        active: {
          background: "bg-transparent",
          text: "text-[hsl(var(--foreground))]",
          border: "border-b-2 border-[hsl(var(--primary))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--muted))]",
          text: "hover:text-[hsl(var(--foreground))]",
        },
      },
      indicator: {
        height: "h-0.5", // 2px underline
        background: "bg-[hsl(var(--primary))]",
        position: "absolute bottom-0 left-0 right-0",
        transition: `${MOTION_TOKENS.transition.all} ${MOTION_TOKENS.duration["200"]} ${MOTION_TOKENS.easing.out}`,
      },
    },
    pill: {
      // Pill variant - rounded background for active tab
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--foreground))]",
          border: "border-transparent",
          radius: "rounded-full",
        },
        active: {
          background: "bg-[hsl(var(--primary))]",
          text: "text-[hsl(var(--primary-foreground))]",
          border: "border-transparent",
          radius: "rounded-full",
        },
        hover: {
          background: "hover:bg-[hsl(var(--muted))]",
          text: "hover:text-[hsl(var(--foreground))]",
        },
      },
    },
    segmented: {
      // Segmented variant - container with borders
      list: {
        background: "bg-[hsl(var(--muted))]",
        padding: "p-xs", // 4px padding
        radius: "rounded-md",
      },
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--foreground))]",
          border: "border-transparent",
        },
        active: {
          background: "bg-[hsl(var(--background))]",
          text: "text-[hsl(var(--foreground))]",
          border: "border-[hsl(var(--border))]",
          shadow: "shadow-sm",
        },
        hover: {
          background: "hover:bg-[hsl(var(--background))]",
          text: "hover:text-[hsl(var(--foreground))]",
        },
      },
    },
  } as const,

  /**
   * Tone-based tokens
   * Colors for different tones (neutral, primary)
   */
  tone: {
    neutral: {
      active: {
        background: "bg-[hsl(var(--muted))]",
        text: "text-[hsl(var(--foreground))]",
        border: "border-[hsl(var(--border))]",
      },
      indicator: {
        background: "bg-[hsl(var(--foreground))]",
      },
    },
    primary: {
      active: {
        background: "bg-[hsl(var(--primary))]",
        text: "text-[hsl(var(--primary-foreground))]",
        border: "border-[hsl(var(--primary))]",
      },
      indicator: {
        background: "bg-[hsl(var(--primary))]",
      },
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
  } as const,

  /**
   * Focus ring tokens for accessibility
   */
  focus: {
    ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
  } as const,

  /**
   * Transition tokens
   */
  transition: {
    colors: MOTION_TOKENS.transition.colors,
  } as const,

  /**
   * Disabled state tokens
   */
  disabled: {
    opacity: "opacity-50",
    pointerEvents: "pointer-events-none",
    cursor: "cursor-not-allowed",
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    sm: {
      trigger: {
        height: "h-8",
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        radius: "rounded-sm",
        fontSize: "text-xs",
      },
      list: {
        gap: "gap-xs",
        padding: "p-xs",
      },
      content: {
        padding: "p-sm",
        marginTop: "mt-sm",
      },
    },
    md: {
      trigger: {
        height: "h-9",
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        radius: "rounded-md",
        fontSize: "text-sm",
      },
      list: {
        gap: "gap-md",
        padding: "p-sm",
      },
      content: {
        padding: "p-md",
        marginTop: "mt-md",
      },
    },
    lg: {
      trigger: {
        height: "h-10",
        padding: {
          horizontal: "px-lg",
          vertical: "py-sm",
        },
        radius: "rounded-md",
        fontSize: "text-base",
      },
      list: {
        gap: "gap-lg",
        padding: "p-md",
      },
      content: {
        padding: "p-lg",
        marginTop: "mt-lg",
      },
    },
  } as const,
} as const;

/**
 * Type exports for Tabs tokens
 */
export type TabsSizeToken = keyof typeof TABS_TOKENS.size;
export type TabsVariantToken = keyof typeof TABS_TOKENS.variant;
export type TabsToneToken = keyof typeof TABS_TOKENS.tone;
export type TabsWidthToken = keyof typeof TABS_TOKENS.width;
