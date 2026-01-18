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
 * Input CVA Variants
 *
 * @enforcement Token-driven CVA system using tokenCVA
 * @enforcement TUNG_INPUT_CVA_ENFORCEMENT
 *
 * CVA Enforcement Rules:
 * - CVA may ONLY reference token-derived classes
 * - NO raw Tailwind color utilities (bg-red-*, text-blue-*, etc.)
 * - NO direct hover/active utilities outside State Matrix
 * - NO inline conditional class concatenation
 * - NO per-variant Tailwind overrides
 * - Structural utilities (flex, w-full, etc.) are ALLOWED
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in INPUT_TOKENS
 * - Input is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Input MUST react to token changes - changing tokens/colors.ts MUST change Input appearance
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
 * - Motion Authority: Input uses MOTION_TOKENS.transition.colors for transitions
 * - Radius Authority: Input references INPUT_TOKENS.radius for border radius
 * - Typography Authority: Input references TEXT_TOKENS.fontSize for text sizing
 * - Spacing Authority: Input references INPUT_TOKENS.padding for padding values
 * - State Authority: Input uses State Matrix CSS variables for all states
 * - Color Authority: Input uses `--tm-*` variables and `--semantic-*` for validation states
 *
 * Token-only contract:
 * - All colors are defined in INPUT_TOKENS (src/FOUNDATION/tokens/components/input.ts)
 * - INPUT_TOKENS reference foundation tokens from tokens/colors.ts
 * - No raw Tailwind color classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid size values at compile time
 *
 * Reference Implementation:
 * - Input follows canonical form control primitive model
 * - Input CVA is immutable - changes require explicit unlock task
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
