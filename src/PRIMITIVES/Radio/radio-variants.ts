"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { RADIO_TOKENS } from "@/FOUNDATION/tokens/components/radio";

/**
 * Explicit union types for Radio component
 * Required for CVA type constraints (satisfies Record<Type, string>)
 */
export type RadioVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioState = "default" | "checked" | "disabled" | "error";

/**
 * Radio CVA Variants
 *
 * @enforcement Token-driven CVA system using tokenCVA
 * @enforcement TUNG_RADIO_CVA_ENFORCEMENT
 *
 * CVA Enforcement Rules:
 * - CVA may ONLY reference token-derived classes
 * - NO raw Tailwind color utilities (bg-red-*, text-blue-*, etc.)
 * - NO direct hover/active utilities outside State Matrix
 * - NO inline conditional class concatenation
 * - NO per-variant Tailwind overrides
 * - Structural utilities (flex, items-center, etc.) are ALLOWED
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in RADIO_TOKENS
 * - Radio is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Radio MUST react to token changes - changing tokens/colors.ts MUST change Radio appearance
 *
 * State Matrix Authority Rules:
 * - ALL state classes (disabled, error) MUST use State Matrix CSS variables
 * - NO raw Tailwind state utilities (disabled:bg-gray-500, aria-invalid:border-red-500)
 * - States react to Color Authority changes automatically through State Matrix
 *
 * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/STATE_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Motion Authority: Radio uses MOTION_TOKENS.transition for transitions
 * - Radius Authority: Radio references RADIO_TOKENS.size[].radius for border radius
 * - State Authority: Radio uses State Matrix CSS variables for all states
 * - Color Authority: Radio uses `--tm-*` variables and `--tm-status-*` for validation states
 *
 * Token-only contract:
 * - All colors are defined in RADIO_TOKENS (src/FOUNDATION/tokens/components/radio.ts)
 * - RADIO_TOKENS reference foundation tokens from tokens/colors.ts
 * - No raw Tailwind color classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size/state values at compile time
 *
 * Uses tokenCVA (not cva) because component has token-driven axes (variant, size, state).
 * Per CVA Usage Decision Matrix RULE 1: tokenCVA is REQUIRED for token-driven axes.
 */
export const radioVariants = tokenCVA({
  base: `inline-flex items-center justify-center border ${MOTION_TOKENS.transition.all} ${MOTION_TOKENS.duration["200"]} ${MOTION_TOKENS.easing["in-out"]} focus-visible:outline-none disabled:cursor-not-allowed ${RADIO_TOKENS.shadow}`,
  variants: {
    variant: {
      primary: `${RADIO_TOKENS.variant.primary.border} ${RADIO_TOKENS.variant.primary.background} ${RADIO_TOKENS.variant.primary.text} ${RADIO_TOKENS.variant.primary.focus}`,
      secondary: `${RADIO_TOKENS.variant.secondary.border} ${RADIO_TOKENS.variant.secondary.background} ${RADIO_TOKENS.variant.secondary.text} ${RADIO_TOKENS.variant.secondary.focus}`,
      outline: `${RADIO_TOKENS.variant.outline.border} ${RADIO_TOKENS.variant.outline.background} ${RADIO_TOKENS.variant.outline.text} ${RADIO_TOKENS.variant.outline.focus}`,
      ghost: `${RADIO_TOKENS.variant.ghost.border} ${RADIO_TOKENS.variant.ghost.background} ${RADIO_TOKENS.variant.ghost.text} ${RADIO_TOKENS.variant.ghost.focus}`,
      destructive: `${RADIO_TOKENS.variant.destructive.border} ${RADIO_TOKENS.variant.destructive.background} ${RADIO_TOKENS.variant.destructive.text} ${RADIO_TOKENS.variant.destructive.focus}`,
    } satisfies Record<RadioVariant, string>,
    size: {
      xs: `${RADIO_TOKENS.size.xs.width} ${RADIO_TOKENS.size.xs.height} ${RADIO_TOKENS.size.xs.radius}`,
      sm: `${RADIO_TOKENS.size.sm.width} ${RADIO_TOKENS.size.sm.height} ${RADIO_TOKENS.size.sm.radius}`,
      md: `${RADIO_TOKENS.size.md.width} ${RADIO_TOKENS.size.md.height} ${RADIO_TOKENS.size.md.radius}`,
      lg: `${RADIO_TOKENS.size.lg.width} ${RADIO_TOKENS.size.lg.height} ${RADIO_TOKENS.size.lg.radius}`,
      xl: `${RADIO_TOKENS.size.xl.width} ${RADIO_TOKENS.size.xl.height} ${RADIO_TOKENS.size.xl.radius}`,
    } satisfies Record<RadioSize, string>,
    state: {
      default: `${RADIO_TOKENS.state.border.default} ${RADIO_TOKENS.state.background.default} ${RADIO_TOKENS.state.text.default}`,
      checked: `${RADIO_TOKENS.state.border.checked} ${RADIO_TOKENS.state.background.checked} ${RADIO_TOKENS.state.text.checked}`,
      error: `${RADIO_TOKENS.state.border.error} ${RADIO_TOKENS.state.background.default} ${RADIO_TOKENS.state.text.default}`,
      disabled: `${RADIO_TOKENS.state.border.disabled} ${RADIO_TOKENS.state.background.disabled} ${RADIO_TOKENS.state.text.disabled}`,
    } satisfies Record<RadioState, string>,
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    state: "default",
  },
});
