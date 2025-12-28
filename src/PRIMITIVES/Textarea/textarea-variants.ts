"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { TEXTAREA_TOKENS } from "@/FOUNDATION/tokens/components/textarea";

/**
 * Textarea size type
 * Limited to sm, md, lg sizes for strict primitive model
 */
export type TextareaSize = "sm" | "md" | "lg";

/**
 * Default size value for Textarea component
 * Used for type safety and readability in CVA defaultVariants
 */
const DEFAULT_SIZE = "md" as const;

/**
 * Textarea Variants
 *
 * @enforcement Token-driven CVA system using tokenCVA
 * @rule ALL visual properties MUST use token-based utilities
 * @rule NO raw Tailwind color/spacing classes allowed
 *
 * Strict low-level primitive variant system for Textarea component.
 * Supports only size variants (sm, md, lg) and default styling.
 * All styling uses token-based values with CSS variable references.
 *
 * State styling (invalid, disabled) is handled via aria-invalid and disabled attributes,
 * not as CVA variant axis (per STATE_AUTHORITY).
 */
export const textareaVariants = tokenCVA({
  base: [
    "flex",
    TEXTAREA_TOKENS.minHeight,
    "w-full",
    TEXTAREA_TOKENS.shadow,
    MOTION_TOKENS.transition.colors,
    "disabled:cursor-not-allowed",
    "focus-visible:outline-none",
    "resize-y",
    TEXTAREA_TOKENS.state.border.default,
    TEXTAREA_TOKENS.state.background.default,
    TEXTAREA_TOKENS.state.text.default,
    TEXTAREA_TOKENS.state.text.placeholder,
    TEXTAREA_TOKENS.state.border.focus,
    // Default variant styling (outlined)
    TEXTAREA_TOKENS.variant.outlined.border,
    TEXTAREA_TOKENS.variant.outlined.background,
    TEXTAREA_TOKENS.variant.outlined.text,
    TEXTAREA_TOKENS.variant.outlined.focus,
    // Invalid state styling via aria-invalid attribute
    '[aria-invalid="true"]:border-[hsl(var(--destructive))]',
  ],
  variants: {
    size: {
      sm: `${TEXTAREA_TOKENS.size.sm.padding.horizontal} ${TEXTAREA_TOKENS.size.sm.padding.vertical} ${TEXTAREA_TOKENS.size.sm.radius} ${TEXTAREA_TOKENS.size.sm.fontSize}`,
      md: `${TEXTAREA_TOKENS.size.md.padding.horizontal} ${TEXTAREA_TOKENS.size.md.padding.vertical} ${TEXTAREA_TOKENS.size.md.radius} ${TEXTAREA_TOKENS.size.md.fontSize} ${TEXTAREA_TOKENS.size.md.fontSizeResponsive}`,
      lg: `${TEXTAREA_TOKENS.size.lg.padding.horizontal} ${TEXTAREA_TOKENS.size.lg.padding.vertical} ${TEXTAREA_TOKENS.size.lg.radius} ${TEXTAREA_TOKENS.size.lg.fontSize}`,
    } satisfies Record<TextareaSize, string>,
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
  },
});
