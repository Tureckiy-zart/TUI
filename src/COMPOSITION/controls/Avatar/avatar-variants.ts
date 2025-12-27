/**
 * Avatar Component Variants
 *
 * Token-driven CVA (Class Variance Authority) variants for Avatar component.
 * All values use token-based Tailwind classes via AVATAR_TOKENS.
 *
 * COMPLIANCE:
 * - ✅ Uses tokenCVA (enforces token-driven styling)
 * - ✅ Token-based sizing (h-* w-* map to spacing tokens)
 * - ✅ Token-based radius (rounded-full = 9999px, rounded-md = 6px)
 * - ✅ Token-based colors (semantic color tokens)
 * - ✅ Type constraints with satisfies Record<Type, string>
 *
 * @see {@link Avatar} - Main Avatar component
 * @see {@link AvatarGroup} - Avatar group component
 */

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { AVATAR_TOKENS } from "@/FOUNDATION/tokens/components/avatar";

/**
 * Type exports for Avatar variants
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy";

/**
 * Avatar root container variants
 * Handles size and shape variations
 */
export const avatarVariants = tokenCVA({
  // Base classes (always applied)
  base: "relative inline-flex shrink-0 overflow-hidden",
  variants: {
    /**
     * Size variants
     * Maps to spacing tokens (h-* w-*)
     */
    size: {
      xs: AVATAR_TOKENS.size.xs,
      sm: AVATAR_TOKENS.size.sm,
      md: AVATAR_TOKENS.size.md,
      lg: AVATAR_TOKENS.size.lg,
      xl: AVATAR_TOKENS.size.xl,
      "2xl": AVATAR_TOKENS.size["2xl"],
    } satisfies Record<AvatarSize, string>,
    /**
     * Shape variants
     * Uses radius tokens (rounded-*)
     */
    shape: {
      circle: AVATAR_TOKENS.shape.circle,
      square: AVATAR_TOKENS.shape.square,
    } satisfies Record<AvatarShape, string>,
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

/**
 * Avatar image variants
 * Ensures image fills container
 */
export const avatarImageVariants = tokenCVA({
  base: `aspect-square ${AVATAR_TOKENS.fill.container} object-cover`,
});

/**
 * Avatar fallback variants
 * Handles fallback container styling (initials or icon)
 */
export const avatarFallbackVariants = tokenCVA({
  // Base classes for fallback
  base: `flex ${AVATAR_TOKENS.fill.container} items-center justify-center ${AVATAR_TOKENS.fallbackColors.bg} ${AVATAR_TOKENS.fallbackColors.text} font-medium`,
  variants: {
    /**
     * Font size for initials based on avatar size
     */
    size: {
      xs: AVATAR_TOKENS.fallbackTextSize.xs,
      sm: AVATAR_TOKENS.fallbackTextSize.sm,
      md: AVATAR_TOKENS.fallbackTextSize.md,
      lg: AVATAR_TOKENS.fallbackTextSize.lg,
      xl: AVATAR_TOKENS.fallbackTextSize.xl,
      "2xl": AVATAR_TOKENS.fallbackTextSize["2xl"],
    } satisfies Record<AvatarSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Status indicator variants
 * Colored dot at bottom-right corner
 */
export const avatarStatusVariants = tokenCVA({
  // Base classes for status dot
  base: `absolute ${AVATAR_TOKENS.statusPosition.alignment} block ${AVATAR_TOKENS.shape.circle} ${AVATAR_TOKENS.statusBorder.width} ${AVATAR_TOKENS.statusBorder.color}`,
  variants: {
    /**
     * Status indicator size (scales with avatar size)
     */
    size: {
      xs: AVATAR_TOKENS.statusSize.xs,
      sm: AVATAR_TOKENS.statusSize.sm,
      md: AVATAR_TOKENS.statusSize.md,
      lg: AVATAR_TOKENS.statusSize.lg,
      xl: AVATAR_TOKENS.statusSize.xl,
      "2xl": AVATAR_TOKENS.statusSize["2xl"],
    } satisfies Record<AvatarSize, string>,
    /**
     * Status indicator color
     */
    status: {
      online: AVATAR_TOKENS.statusColor.online,
      offline: AVATAR_TOKENS.statusColor.offline,
      busy: AVATAR_TOKENS.statusColor.busy,
    } satisfies Record<AvatarStatus, string>,
  },
  defaultVariants: {
    size: "md",
    status: "online",
  },
});
