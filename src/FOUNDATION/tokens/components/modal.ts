/**
 * Modal Component Tokens
 *
 * Component-level design tokens for Modal component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to modal-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Modal maximum height token
 * Used for all modal sizes to prevent overflow on small screens
 * Extracted as constant to avoid hardcoded arbitrary values in tokenCVA validation
 */
const MODAL_MAX_HEIGHT = "max-h-[90vh]"; // 90% of viewport height - prevents modal overflow

/**
 * Modal Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Modal component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const MODAL_TOKENS = {
  /**
   * Modal maximum height token
   * Used for all modal sizes to prevent overflow on small screens
   */
  maxHeight: MODAL_MAX_HEIGHT,

  /**
   * Modal size tokens
   * Supports sm, md, lg sizes only (overlay restriction per VARIANTS_SIZE_CANON)
   */
  size: {
    sm: {
      width: "w-full max-w-sm", // 384px (24rem)
      height: `h-auto ${MODAL_MAX_HEIGHT}`,
      padding: "p-md", // 16px (1rem)
      radius: "rounded-lg", // 8px (0.5rem)
      shadow: "shadow-lg",
    } as const,
    md: {
      width: "w-full max-w-md", // 448px (28rem) - default
      height: `h-auto ${MODAL_MAX_HEIGHT}`,
      padding: "p-lg", // 24px (1.5rem)
      radius: "rounded-lg", // 8px (0.5rem)
      shadow: "shadow-xl",
    } as const,
    lg: {
      width: "w-full max-w-lg", // 512px (32rem)
      height: `h-auto ${MODAL_MAX_HEIGHT}`,
      padding: "p-xl", // 32px (2rem)
      radius: "rounded-xl", // 12px (0.75rem)
      shadow: "shadow-2xl",
    } as const,
  } as const,

  /**
   * Modal overlay tokens
   */
  overlay: {
    background: "bg-black/80", // 80% opacity black overlay
    backdrop: "backdrop-blur-sm", // Optional backdrop blur
  } as const,

  /**
   * Modal content tokens
   */
  content: {
    shadow: "shadow-xl", // Default shadow
    background: "bg-[hsl(var(--background))]", // Background using CSS var
    text: "text-[hsl(var(--foreground))]", // Text color using CSS var
    border: "border border-[hsl(var(--border))]", // Border color using CSS var
    position: "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]", // Centered positioning
  } as const,

  /**
   * Modal header tokens
   */
  header: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    marginBottom: {
      sm: "mb-sm", // 8px (0.5rem)
      md: "mb-md", // 16px (1rem) - default
      lg: "mb-lg", // 24px (1.5rem)
    },
  } as const,

  /**
   * Modal footer tokens
   */
  footer: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    marginTop: {
      sm: "mt-sm", // 8px (0.5rem)
      md: "mt-md", // 16px (1rem) - default
      lg: "mt-lg", // 24px (1.5rem)
    },
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    },
  } as const,

  /**
   * Modal title tokens
   */
  title: {
    fontSize: {
      sm: "text-base", // 16px (1rem)
      md: "text-lg", // 18px (1.125rem) - default
      lg: "text-xl", // 20px (1.25rem)
    },
    fontWeight: "font-semibold",
    lineHeight: "leading-none",
    tracking: "tracking-tight",
  } as const,

  /**
   * Modal description tokens
   */
  description: {
    fontSize: {
      sm: "text-xs", // 12px (0.75rem)
      md: "text-sm", // 14px (0.875rem) - default
      lg: "text-base", // 16px (1rem)
    },
    color: "text-[hsl(var(--muted-foreground))]", // Muted text color using CSS var
  } as const,

  /**
   * Modal close button tokens
   */
  close: {
    size: "size-8", // 32px (2rem)
    radius: "rounded-sm", // 4px (0.25rem)
    opacity: {
      default: "opacity-70",
      hover: "hover:opacity-100",
    },
    position: "absolute right-md top-md", // Positioned in top-right corner
    icon: {
      size: "size-4", // 16px (1rem)
    },
  } as const,

  /**
   * Modal width tokens (independent of size)
   */
  width: {
    auto: "w-auto",
    sm: "w-full max-w-sm", // 384px (24rem)
    md: "w-full max-w-md", // 448px (28rem)
    lg: "w-full max-w-lg", // 512px (32rem)
    xl: "w-full max-w-xl", // 576px (36rem)
    "2xl": "w-full max-w-2xl", // 672px (42rem)
    full: "w-full",
  } as const,

  /**
   * Modal height tokens (independent of size)
   */
  height: {
    auto: "h-auto",
    sm: "h-64", // 256px (16rem)
    md: "h-96", // 384px (24rem)
    lg: "h-[32rem]", // 512px
    xl: "h-[40rem]", // 640px
    full: "h-full",
  } as const,

  /**
   * Surface variant tokens
   */
  surface: {
    flat: "bg-[hsl(var(--background))]",
    raised: "bg-[hsl(var(--card))] shadow-lg",
    sunken: "bg-[hsl(var(--muted))]",
    outline: "bg-[hsl(var(--background))] border-2 border-[hsl(var(--border))]",
    subtle: "bg-[hsl(var(--muted))]",
  } as const,
} as const;

/**
 * Type exports for Modal tokens
 */
export type ModalSizeToken = keyof typeof MODAL_TOKENS.size;
export type ModalWidthToken = keyof typeof MODAL_TOKENS.width;
export type ModalHeightToken = keyof typeof MODAL_TOKENS.height;
export type ModalFooterAlignToken = keyof typeof MODAL_TOKENS.footer.align;
