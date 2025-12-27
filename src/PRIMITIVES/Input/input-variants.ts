"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { INPUT_TOKENS } from "@/FOUNDATION/tokens/components/input";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

/**
 * Default size value for Input component
 */
const DEFAULT_SIZE = "md" as const;

/**
 * Input Variants
 *
 * Token-driven CVA system for Input component (size-only variant system).
 * All styling uses token-based values with CSS variable references.
 *
 * Invalid state styling is handled via CSS [aria-invalid="true"] selector (see base classes).
 */
export const inputVariants = tokenCVA({
  base: `flex ${TEXT_TOKENS.fontSize.sm} file:font-medium ${INPUT_TOKENS.file.text} disabled:cursor-not-allowed focus-visible:outline-none ${MOTION_TOKENS.transition.colors} ${INPUT_TOKENS.shadow} file:border-0 file:bg-transparent ${INPUT_TOKENS.state.border.default} ${INPUT_TOKENS.state.background.default} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.border.focus} [aria-invalid="true"]:${INPUT_TOKENS.state.border.error.replace("border-", "")}`,
  variants: {
    size: {
      sm: `${INPUT_TOKENS.size.sm.height} ${INPUT_TOKENS.size.sm.padding.horizontal} ${INPUT_TOKENS.size.sm.padding.vertical} ${INPUT_TOKENS.size.sm.radius} ${INPUT_TOKENS.size.sm.fontSize}`,
      md: `${INPUT_TOKENS.size.md.height} ${INPUT_TOKENS.size.md.padding.horizontal} ${INPUT_TOKENS.size.md.padding.vertical} ${INPUT_TOKENS.size.md.radius} ${INPUT_TOKENS.size.md.fontSize} ${INPUT_TOKENS.size.md.fontSizeResponsive}`,
      lg: `${INPUT_TOKENS.size.lg.height} ${INPUT_TOKENS.size.lg.padding.horizontal} ${INPUT_TOKENS.size.lg.padding.vertical} ${INPUT_TOKENS.size.lg.radius} ${INPUT_TOKENS.size.lg.fontSize}`,
    },
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
  },
});
