/**
 * Accordion Component Tokens
 *
 * Component-level design tokens for Accordion component.
 * Maps foundation tokens (spacing, typography, radius, colors, motion) to accordion-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Accordion Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Accordion component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const ACCORDION_TOKENS = {
  /**
   * Accordion item tokens
   * Gap between accordion items
   */
  item: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    radius: {
      sm: "rounded-sm", // 4px (0.25rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
    },
    border: {
      default: "border border-[hsl(var(--tm-border-default))]",
    },
  } as const,

  /**
   * Accordion trigger tokens by size
   * Supports sm, md, lg sizes
   */
  trigger: {
    width: "w-full", // Full width for trigger
    padding: {
      horizontal: {
        sm: "px-sm", // 8px (0.5rem)
        md: "px-md", // 16px (1rem) - default
        lg: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        sm: "py-xs", // 4px (0.25rem)
        md: "py-sm", // 8px (0.5rem) - default
        lg: "py-md", // 16px (1rem)
      },
    },
    fontSize: {
      sm: "text-xs", // Maps to fontSize.xs[0]
      md: "text-sm", // Maps to fontSize.sm[0] - default
      lg: "text-base", // Maps to fontSize.base[0]
    },
    fontWeight: "font-medium", // Medium weight for triggers
    icon: {
      size: {
        sm: "size-4", // 16px (1rem)
        md: "size-4", // 16px (1rem) - default
        lg: "size-5", // 20px (1.25rem)
      },
      gap: "gap-sm", // 8px (0.5rem)
      color: "text-[hsl(var(--tm-text-muted))]", // Icon color using CSS variable
    },
  } as const,

  /**
   * Accordion content tokens
   */
  content: {
    padding: {
      sm: "p-sm", // 8px (0.5rem)
      md: "p-md", // 16px (1rem) - default
      lg: "p-lg", // 24px (1.5rem)
    },
    fontSize: {
      sm: "text-xs", // Maps to fontSize.xs[0]
      md: "text-sm", // Maps to fontSize.sm[0] - default
      lg: "text-base", // Maps to fontSize.base[0]
    },
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-muted))]",
          text: "data-[state=open]:text-[hsl(var(--tm-text-primary))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-surface-base))]",
        text: "text-[hsl(var(--tm-text-primary))]",
      },
    },
    secondary: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-muted))]",
          text: "data-[state=open]:text-[hsl(var(--tm-text-primary))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-surface-base))]",
        text: "text-[hsl(var(--tm-text-primary))]",
      },
    },
    accent: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-accent-foreground))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-accent))]",
          text: "hover:text-[hsl(var(--tm-accent-foreground))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-accent))]",
          text: "data-[state=open]:text-[hsl(var(--tm-accent-foreground))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-accent))]",
        text: "text-[hsl(var(--tm-accent-foreground))]",
      },
    },
    neutral: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-muted))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-muted))]",
          text: "data-[state=open]:text-[hsl(var(--tm-text-primary))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-muted))]",
        text: "text-[hsl(var(--tm-text-primary))]",
      },
    },
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    sm: {
      trigger: {
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        fontSize: "text-xs",
      },
      content: {
        padding: "p-sm",
        fontSize: "text-xs",
      },
      item: {
        gap: "gap-xs",
        radius: "rounded-sm",
      },
    },
    md: {
      trigger: {
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        fontSize: "text-sm",
      },
      content: {
        padding: "p-md",
        fontSize: "text-sm",
      },
      item: {
        gap: "gap-sm",
        radius: "rounded-md",
      },
    },
    lg: {
      trigger: {
        padding: {
          horizontal: "px-lg",
          vertical: "py-md",
        },
        fontSize: "text-base",
      },
      content: {
        padding: "p-lg",
        fontSize: "text-base",
      },
      item: {
        gap: "gap-md",
        radius: "rounded-md",
      },
    },
  } as const,

  /**
   * Focus ring tokens for accessibility
   */
  focus: {
    ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--tm-focus-ring))] focus-visible:ring-offset-2",
  } as const,

  /**
   * Transition tokens
   */
  transition: {
    colors: MOTION_TOKENS.transition.colors,
    transform: MOTION_TOKENS.transition.transform,
  } as const,

  /**
   * Disabled state tokens
   * Applied via disabled: prefix (only when element is disabled)
   * @enforcement TUNG_INTERACTION_AUTHORITY_FOUNDATION
   * @rule Interaction Authority: pointer-events is NOT a visual token
   * @rule pointer-events-none MUST use disabled: prefix (never in base state)
   * @rule Base state MUST have pointer-events: auto (default) for hover to work
   */
  disabled: {
    opacity: "disabled:opacity-50",
    pointerEvents: "disabled:pointer-events-none",
    cursor: "disabled:cursor-not-allowed",
  } as const,
} as const;

/**
 * Type exports for Accordion tokens
 */
export type AccordionSizeToken = keyof typeof ACCORDION_TOKENS.size;
export type AccordionVariantToken = keyof typeof ACCORDION_TOKENS.variant;
