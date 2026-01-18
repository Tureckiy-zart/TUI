"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { TEXTAREA_TOKENS } from "@/FOUNDATION/tokens/components/textarea";

/**
 * Textarea size type
 * Limited to sm, md, lg sizes for strict primitive model
 *
 * @enforcement VARIANTS_SIZE_CANON - Must use only GlobalSize values
 * Type-level enforcement: Only these size values are allowed.
 * TypeScript will error if any other string is passed.
 */
export type TextareaSize = "sm" | "md" | "lg";

/**
 * Default size value for Textarea component
 * Used for type safety and readability in CVA defaultVariants
 */
const DEFAULT_SIZE = "md" as const;

/**
 * Textarea CVA Variants
 *
 * @enforcement Token-driven CVA system using tokenCVA
 * @enforcement TUNG_TEXTAREA_CVA_ENFORCEMENT
 *
 * CVA Enforcement Rules:
 * - CVA may ONLY reference token-derived classes
 * - NO raw Tailwind color utilities (bg-red-*, text-blue-*, etc.)
 * - NO direct hover/active utilities outside State Matrix
 * - NO inline conditional class concatenation
 * - NO per-variant Tailwind overrides
 * - Structural utilities (flex, w-full, resize-y, etc.) are ALLOWED
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in TEXTAREA_TOKENS
 * - Textarea is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Textarea MUST react to token changes - changing tokens/colors.ts MUST change Textarea appearance
 *
 * State Matrix Authority Rules:
 * - ALL state classes (disabled, invalid) MUST use State Matrix CSS variables
 * - NO raw Tailwind state utilities (disabled:bg-gray-500, aria-invalid:border-red-500)
 * - States react to Color Authority changes automatically through State Matrix
 * - Invalid state styling via aria-invalid attribute selector: [aria-invalid="true"]
 *
 * State Authority Contract:
 * - State styling (invalid, disabled) is handled via aria-invalid and disabled attributes,
 *   not as CVA variant axis (per STATE_AUTHORITY)
 * - Invalid state: Use invalid={true} or aria-invalid={true} (native HTML attribute)
 * - Disabled state: Use disabled={true} (native HTML attribute)
 * - No separate "state" prop (states are derived from HTML attributes)
 *
 * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/STATE_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Motion Authority: Textarea uses MOTION_TOKENS.transition.colors for transitions
 * - Radius Authority: Textarea references TEXTAREA_TOKENS.radius for border radius
 * - Typography Authority: Textarea references TEXTAREA_TOKENS.fontSize for text sizing
 * - Spacing Authority: Textarea references TEXTAREA_TOKENS.padding for padding values
 * - State Authority: Textarea uses State Matrix CSS variables for all states
 * - Color Authority: Textarea uses `--tm-*` variables and `--semantic-*` for validation states
 *
 * Color tokens used (all from TEXTAREA_TOKENS, which reference tokens/colors.ts):
 * - border-[hsl(var(--tm-surface-base))] - Default border color
 * - bg-transparent - Transparent background
 * - text-[hsl(var(--tm-text-primary))] - Default text color
 * - placeholder:text-[hsl(var(--tm-text-muted))] - Placeholder text color
 * - border-[hsl(var(--tm-destructive))] - Error state border color
 * - focus-visible:shadow-[var(--focus-ring-default)] - Focus ring
 * - All state styling uses CSS variable references for theme support
 *
 * Type-level enforcement:
 * - Size values are restricted to: "sm" | "md" | "lg" (GlobalSize compliant)
 * - TypeScript will error if invalid size values are passed
 * - tokenCVA validates token usage in development mode (warns on forbidden patterns)
 * - No arbitrary color classes can be passed via className prop (enforced by tokenCVA validation)
 *
 * Reference Implementation:
 * - Textarea follows Input canonical model for form control primitives
 * - Textarea CVA is immutable - changes require explicit unlock task
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
    TEXTAREA_TOKENS.state.border.ariaInvalid,
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
