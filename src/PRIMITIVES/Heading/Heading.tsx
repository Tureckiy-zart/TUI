"use client";

/**
 * Heading Component
 *
 * Heading is a Foundation primitive component for semantic typography headings (h1-h6).
 * It provides token-based typography styling with semantic level mapping, weight variants,
 * and color role support. Heading uses the display font family (Clash Display) for
 * visual distinction from body text.
 *
 * Heading does NOT provide layout composition, spacing, or color customization beyond
 * semantic tokens. For layout composition, use Stack or Box components. For custom
 * typography styling, use Text component.
 *
 * All typography uses token-based values only (no raw Tailwind typography classes).
 *
 * @component Heading
 * @see {@link ./Heading.stories.tsx} - Storybook examples
 *
 * @example
 * // Basic heading with default level (h1)
 * <Heading>Main Title</Heading>
 *
 * @example
 * // Specific heading level
 * <Heading level={2}>Section Title</Heading>
 * <Heading level={3}>Subsection Title</Heading>
 *
 * @example
 * // With custom weight override
 * <Heading level={1} weight="normal">Light Heading</Heading>
 * <Heading level={2} weight="semibold">Semibold Heading</Heading>
 *
 * @example
 * // Muted heading variant
 * <Heading level={3} color="secondary">Secondary Heading</Heading>
 *
 * @example
 * // Render as different HTML element while keeping level styling
 * <Heading level={1} as="h2">Styled as h1, rendered as h2</Heading>
 *
 * @example
 * // Complete heading hierarchy
 * <Stack direction="vertical" spacing="md">
 *   <Heading level={1}>Main Title</Heading>
 *   <Heading level={2}>Section Title</Heading>
 *   <Heading level={3}>Subsection Title</Heading>
 * </Stack>
 */

import * as React from "react";

import { InverseTypographyContext } from "@/COMPOSITION/inverse-typography/InverseTypography/InverseTypography";
import { tokenCVA, type VariantProps } from "@/FOUNDATION/lib/token-cva";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

/**
 * Heading level configuration
 *
 * Defines typography settings for each heading level (h1-h6).
 * Format: [fontSize, defaultWeight, lineHeight, letterSpacing]
 *
 * Default weights are semantic: bold for h1-h2 (primary headings),
 * semibold for h3-h4 (section headings), medium for h5-h6 (subsection headings).
 * These defaults can be overridden via the weight prop using compound variants.
 */
const levelConfig = {
  1: [
    TEXT_TOKENS.fontSize["5xl"],
    TEXT_TOKENS.fontWeight.bold,
    TEXT_TOKENS.lineHeight.tight,
    TEXT_TOKENS.letterSpacing.tight,
  ],
  2: [
    TEXT_TOKENS.fontSize["4xl"],
    TEXT_TOKENS.fontWeight.bold,
    TEXT_TOKENS.lineHeight.tight,
    TEXT_TOKENS.letterSpacing.tight,
  ],
  3: [
    TEXT_TOKENS.fontSize["3xl"],
    TEXT_TOKENS.fontWeight.semibold,
    TEXT_TOKENS.lineHeight.snug,
    TEXT_TOKENS.letterSpacing.normal,
  ],
  4: [
    TEXT_TOKENS.fontSize["2xl"],
    TEXT_TOKENS.fontWeight.semibold,
    TEXT_TOKENS.lineHeight.snug,
    TEXT_TOKENS.letterSpacing.normal,
  ],
  5: [
    TEXT_TOKENS.fontSize.xl,
    TEXT_TOKENS.fontWeight.medium,
    TEXT_TOKENS.lineHeight.normal,
    TEXT_TOKENS.letterSpacing.normal,
  ],
  6: [
    TEXT_TOKENS.fontSize.lg,
    TEXT_TOKENS.fontWeight.medium,
    TEXT_TOKENS.lineHeight.normal,
    TEXT_TOKENS.letterSpacing.normal,
  ],
} as const;

/**
 * Generate level variants from configuration
 *
 * Creates base variants for each heading level with default weight, line height,
 * and letter spacing. The weight can be overridden via compound variants when
 * the weight prop is explicitly provided.
 */
const levelVariants = Object.entries(levelConfig).reduce(
  (acc, [level, [fontSize, defaultWeight, lineHeight, letterSpacing]]) => {
    acc[Number(level) as keyof typeof levelConfig] =
      `${fontSize} ${defaultWeight} ${lineHeight} ${letterSpacing}`;
    return acc;
  },
  {} as Record<1 | 2 | 3 | 4 | 5 | 6, string>,
);

/**
 * Generate compound variants for weight override
 *
 * Creates compound variants for all combinations of level (1-6) and weight (normal, medium, semibold, bold).
 * These variants override the default weight from levelConfig when a weight prop is provided.
 *
 * This approach simplifies maintenance: instead of 24 explicit compound variants, we generate
 * them programmatically, making it easier to add new levels or weights in the future.
 *
 * @returns Array of compound variant configurations
 */
const generateWeightVariants = (): Array<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  weight: "normal" | "medium" | "semibold" | "bold";
  class: string;
}> => {
  const weights: Array<"normal" | "medium" | "semibold" | "bold"> = [
    "normal",
    "medium",
    "semibold",
    "bold",
  ];
  const levels: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4, 5, 6];
  const variants: Array<{
    level: 1 | 2 | 3 | 4 | 5 | 6;
    weight: "normal" | "medium" | "semibold" | "bold";
    class: string;
  }> = [];

  // Generate variants for all level + weight combinations
  // Each variant includes fontSize, lineHeight, and letterSpacing from levelConfig,
  // but uses the specified weight instead of the default
  for (const level of levels) {
    const [fontSize, , lineHeight, letterSpacing] = levelConfig[level];
    for (const weight of weights) {
      variants.push({
        level,
        weight,
        class: `${fontSize} ${TEXT_TOKENS.fontWeight[weight]} ${lineHeight} ${letterSpacing}`,
      });
    }
  }

  return variants;
};

/**
 * Heading CVA Variants
 *
 * @enforcement TUNG_HEADING_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL typography-related classes MUST be token-based utilities only
 * - NO raw Tailwind typography classes (text-*, font-*, leading-*, tracking-*) allowed outside TEXT_TOKENS
 * - ALL typography logic MUST be centralized in TEXT_TOKENS
 * - Heading is NOT a source of typography - all typography comes from Typography Authority (TEXT_TOKENS)
 * - Heading MUST react to token changes - changing TEXT_TOKENS MUST change Heading appearance
 *
 * Typography Authority Rules:
 * - ALL typography classes MUST reference TEXT_TOKENS (fontSize, fontWeight, lineHeight, letterSpacing)
 * - NO raw Tailwind typography utilities allowed
 * - All typography values come from Typography Authority via TEXT_TOKENS
 *
 * Color Authority Rules:
 * - Text colors use semantic tokens: text-[hsl(var(--tm-text-primary))], text-[hsl(var(--tm-text-secondary))]
 * - NO raw Tailwind color classes (text-red-*, text-blue-*, etc.) allowed
 * - All colors come from Color Authority via semantic tokens
 *
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY.md
 * @see docs/architecture/TOKEN_AUTHORITY.md
 *
 * Authority Compliance:
 * - Typography Authority: Heading uses TEXT_TOKENS for all typography values
 * - Color Authority: Heading uses semantic color tokens (text-[hsl(var(--tm-text-primary))], text-[hsl(var(--tm-text-secondary))])
 *
 * Token-only contract:
 * - All typography values are defined in TEXT_TOKENS (src/FOUNDATION/tokens/components/text.ts)
 * - TEXT_TOKENS reference foundation tokens from Typography Authority
 * - No raw Tailwind typography classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid level/weight values at compile time
 *
 * className and style props:
 * - className and style are forbidden from public API - only CVA output is used
 * - Foundation Enforcement is FINAL/APPLIED and LOCKED
 */
const headingVariants = tokenCVA({
  base: "font-display text-[hsl(var(--tm-text-primary))]",
  variants: {
    level: levelVariants,
    weight: {
      normal: TEXT_TOKENS.fontWeight.normal,
      medium: TEXT_TOKENS.fontWeight.medium,
      semibold: TEXT_TOKENS.fontWeight.semibold,
      bold: TEXT_TOKENS.fontWeight.bold,
    },
    color: {
      primary: "",
      secondary: "text-[hsl(var(--tm-text-secondary))]",
      inverse: "text-[hsl(var(--tm-text-inverse))]",
    },
  },
  compoundVariants: generateWeightVariants(),
  defaultVariants: {
    level: 1,
    color: "primary",
  },
});

/**
 * Heading Component Props
 *
 * @enforcement TUNG_HEADING_TOKEN_ENFORCEMENT
 * @rule level prop is restricted to 1 | 2 | 3 | 4 | 5 | 6
 * @rule weight prop is restricted to "normal" | "medium" | "semibold" | "bold" (Typography Authority values)
 * @rule className prop cannot override typography classes (tokenCVA validation in dev mode)
 * @rule Heading is fully token-based - no raw Tailwind typography/colors allowed
 */
export interface HeadingProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    Omit<VariantProps<typeof headingVariants>, "color"> {
  /** Text color (inverse applied automatically inside InverseTypography.Root) */
  color?: "primary" | "secondary";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, weight, color, as, children, ...props }, ref) => {
    const Component = (as || `h${level}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    const isInverse = React.useContext(InverseTypographyContext);
    const effectiveColor = isInverse ? "inverse" : (color ?? "primary");

    return (
      <Component
        ref={ref}
        className={headingVariants({ level, weight, color: effectiveColor })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
