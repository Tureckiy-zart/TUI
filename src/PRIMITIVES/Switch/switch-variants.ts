"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { SWITCH_TOKENS } from "@/FOUNDATION/tokens/components/switch";

import type { SwitchSize, SwitchVariant } from "./Switch.types";

/**
 * Internal state type for switch track styling
 * Derived from checked, disabled, and invalid props
 */
type SwitchTrackState = "base" | "checked" | "disabled" | "disabledChecked" | "invalid";

/**
 * Switch Track CVA Variants
 *
 * @enforcement Token-driven CVA system using tokenCVA
 * @enforcement TUNG_SWITCH_CVA_ENFORCEMENT
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
 * - ALL color logic MUST be centralized in SWITCH_TOKENS
 * - Switch is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Switch MUST react to token changes - changing tokens/colors.ts MUST change Switch appearance
 *
 * State Matrix Authority Rules:
 * - ALL state classes (disabled, invalid) MUST use State Matrix CSS variables
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
 * - Motion Authority: Switch uses MOTION_TOKENS.transition for transitions
 * - Radius Authority: Switch references SWITCH_TOKENS.track[].radius for border radius
 * - State Authority: Switch uses State Matrix CSS variables for all states
 * - Color Authority: Switch uses `--tm-*` variables and `--semantic-*` for validation states
 *
 * Token-only contract:
 * - All colors are defined in SWITCH_TOKENS (src/FOUNDATION/tokens/components/switch.ts)
 * - SWITCH_TOKENS reference foundation tokens from tokens/colors.ts
 * - No raw Tailwind color classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size/state values at compile time
 *
 * Switch consists of a track (container) and handle (thumb) that slides within the track.
 */
export const switchTrackVariants = tokenCVA({
  base: `relative inline-flex items-center cursor-pointer focus-visible:outline-none disabled:cursor-not-allowed ${SWITCH_TOKENS.transition.track} ${SWITCH_TOKENS.shadow}`,
  variants: {
    variant: {
      primary: `${SWITCH_TOKENS.variant.primary.focus}`,
      secondary: `${SWITCH_TOKENS.variant.secondary.focus}`,
      outline: `${SWITCH_TOKENS.variant.outline.focus}`,
      ghost: `${SWITCH_TOKENS.variant.ghost.focus}`,
      destructive: `${SWITCH_TOKENS.variant.destructive.focus}`,
    } satisfies Record<SwitchVariant, string>,
    size: {
      xs: `${SWITCH_TOKENS.track.xs.width} ${SWITCH_TOKENS.track.xs.height} ${SWITCH_TOKENS.track.xs.radius}`,
      sm: `${SWITCH_TOKENS.track.sm.width} ${SWITCH_TOKENS.track.sm.height} ${SWITCH_TOKENS.track.sm.radius}`,
      md: `${SWITCH_TOKENS.track.md.width} ${SWITCH_TOKENS.track.md.height} ${SWITCH_TOKENS.track.md.radius}`,
      lg: `${SWITCH_TOKENS.track.lg.width} ${SWITCH_TOKENS.track.lg.height} ${SWITCH_TOKENS.track.lg.radius}`,
      xl: `${SWITCH_TOKENS.track.xl.width} ${SWITCH_TOKENS.track.xl.height} ${SWITCH_TOKENS.track.xl.radius}`,
    } satisfies Record<SwitchSize, string>,
    state: {
      base: `${SWITCH_TOKENS.state.track.default}`,
      checked: `${SWITCH_TOKENS.state.track.checked}`,
      disabled: `${SWITCH_TOKENS.state.track.disabled}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
      disabledChecked: `${SWITCH_TOKENS.state.track.disabledChecked}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
      invalid: `${SWITCH_TOKENS.state.track.error}`,
    } satisfies Record<SwitchTrackState, string>,
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    state: "base",
  },
});

/**
 * Switch Handle CVA Variants
 *
 * @enforcement Token-driven CVA system using tokenCVA
 * @enforcement TUNG_SWITCH_CVA_ENFORCEMENT
 *
 * Handle positioning and sizing variants.
 * The handle is positioned absolutely within the track and slides on toggle.
 * All positioning and sizing uses token-based values.
 */
export const switchHandleVariants = tokenCVA({
  base: `absolute ${SWITCH_TOKENS.handle.position.left} ${SWITCH_TOKENS.handle.position.top} ${SWITCH_TOKENS.handle.position.center} ${SWITCH_TOKENS.transition.handle}`,
  variants: {
    size: {
      xs: `${SWITCH_TOKENS.handle.xs.width} ${SWITCH_TOKENS.handle.xs.height} ${SWITCH_TOKENS.handle.xs.radius}`,
      sm: `${SWITCH_TOKENS.handle.sm.width} ${SWITCH_TOKENS.handle.sm.height} ${SWITCH_TOKENS.handle.sm.radius}`,
      md: `${SWITCH_TOKENS.handle.md.width} ${SWITCH_TOKENS.handle.md.height} ${SWITCH_TOKENS.handle.md.radius}`,
      lg: `${SWITCH_TOKENS.handle.lg.width} ${SWITCH_TOKENS.handle.lg.height} ${SWITCH_TOKENS.handle.lg.radius}`,
      xl: `${SWITCH_TOKENS.handle.xl.width} ${SWITCH_TOKENS.handle.xl.height} ${SWITCH_TOKENS.handle.xl.radius}`,
    } satisfies Record<SwitchSize, string>,
    checked: {
      true: "",
      false: "",
    } satisfies Record<"true" | "false", string>,
  },
  compoundVariants: [
    {
      size: "xs",
      checked: "true",
      class: `${SWITCH_TOKENS.handle.xs.translate}`,
    },
    {
      size: "sm",
      checked: "true",
      class: `${SWITCH_TOKENS.handle.sm.translate}`,
    },
    {
      size: "md",
      checked: "true",
      class: `${SWITCH_TOKENS.handle.md.translate}`,
    },
    {
      size: "lg",
      checked: "true",
      class: `${SWITCH_TOKENS.handle.lg.translate}`,
    },
    {
      size: "xl",
      checked: "true",
      class: `${SWITCH_TOKENS.handle.xl.translate}`,
    },
  ],
  defaultVariants: {
    size: "md",
    checked: "false",
  },
});

/**
 * Switch Handle State CVA Variants
 *
 * @enforcement Token-driven CVA system using tokenCVA
 * @enforcement TUNG_SWITCH_CVA_ENFORCEMENT
 *
 * Color variants for the handle based on state and variant.
 * All colors MUST come from SWITCH_TOKENS - NO raw Tailwind color classes allowed.
 */
export const switchHandleStateVariants = tokenCVA({
  base: "",
  variants: {
    variant: {
      primary: "",
      secondary: "",
      outline: "",
      ghost: "",
      destructive: "",
    } satisfies Record<SwitchVariant, string>,
    state: {
      base: "",
      checked: "",
      disabled: "",
      disabledChecked: "",
      invalid: "",
    } satisfies Record<SwitchTrackState, string>,
  },
  compoundVariants: [
    // Primary variant
    {
      variant: "primary",
      state: "base",
      class: `${SWITCH_TOKENS.variant.primary.handle.unchecked}`,
    },
    {
      variant: "primary",
      state: "checked",
      class: `${SWITCH_TOKENS.variant.primary.handle.checked}`,
    },
    {
      variant: "primary",
      state: "disabled",
      class: `${SWITCH_TOKENS.state.handle.disabled}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "primary",
      state: "disabledChecked",
      class: `${SWITCH_TOKENS.state.handle.disabledChecked}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "primary",
      state: "invalid",
      class: `${SWITCH_TOKENS.state.handle.error}`,
    },
    // Secondary variant
    {
      variant: "secondary",
      state: "base",
      class: `${SWITCH_TOKENS.variant.secondary.handle.unchecked}`,
    },
    {
      variant: "secondary",
      state: "checked",
      class: `${SWITCH_TOKENS.variant.secondary.handle.checked}`,
    },
    {
      variant: "secondary",
      state: "disabled",
      class: `${SWITCH_TOKENS.state.handle.disabled}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "secondary",
      state: "disabledChecked",
      class: `${SWITCH_TOKENS.state.handle.disabledChecked}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "secondary",
      state: "invalid",
      class: `${SWITCH_TOKENS.state.handle.error}`,
    },
    // Outline variant
    {
      variant: "outline",
      state: "base",
      class: `${SWITCH_TOKENS.variant.outline.handle.unchecked}`,
    },
    {
      variant: "outline",
      state: "checked",
      class: `${SWITCH_TOKENS.variant.outline.handle.checked}`,
    },
    {
      variant: "outline",
      state: "disabled",
      class: `${SWITCH_TOKENS.state.handle.disabled}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "outline",
      state: "disabledChecked",
      class: `${SWITCH_TOKENS.state.handle.disabledChecked}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "outline",
      state: "invalid",
      class: `${SWITCH_TOKENS.state.handle.error}`,
    },
    // Ghost variant
    {
      variant: "ghost",
      state: "base",
      class: `${SWITCH_TOKENS.variant.ghost.handle.unchecked}`,
    },
    {
      variant: "ghost",
      state: "checked",
      class: `${SWITCH_TOKENS.variant.ghost.handle.checked}`,
    },
    {
      variant: "ghost",
      state: "disabled",
      class: `${SWITCH_TOKENS.state.handle.disabled}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "ghost",
      state: "disabledChecked",
      class: `${SWITCH_TOKENS.state.handle.disabledChecked}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "ghost",
      state: "invalid",
      class: `${SWITCH_TOKENS.state.handle.error}`,
    },
    // Destructive variant
    {
      variant: "destructive",
      state: "base",
      class: `${SWITCH_TOKENS.variant.destructive.handle.unchecked}`,
    },
    {
      variant: "destructive",
      state: "checked",
      class: `${SWITCH_TOKENS.variant.destructive.handle.checked}`,
    },
    {
      variant: "destructive",
      state: "disabled",
      class: `${SWITCH_TOKENS.state.handle.disabled}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "destructive",
      state: "disabledChecked",
      class: `${SWITCH_TOKENS.state.handle.disabledChecked}`, // Uses explicit disabled semantic token (opacity removed for better a11y)
    },
    {
      variant: "destructive",
      state: "invalid",
      class: `${SWITCH_TOKENS.state.handle.error}`,
    },
  ],
  defaultVariants: {
    variant: "primary",
    state: "base",
  },
});
