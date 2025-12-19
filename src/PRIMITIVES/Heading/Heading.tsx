"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

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

const headingVariants = cva("font-display text-foreground", {
  variants: {
    level: levelVariants,
    weight: {
      normal: TEXT_TOKENS.fontWeight.normal,
      medium: TEXT_TOKENS.fontWeight.medium,
      semibold: TEXT_TOKENS.fontWeight.semibold,
      bold: TEXT_TOKENS.fontWeight.bold,
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  compoundVariants: generateWeightVariants(),
  defaultVariants: {
    level: 1,
    muted: false,
  },
});

export interface HeadingProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "className" | "style">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, weight, muted, as, children, ...props }, ref) => {
    const Component = (as || `h${level}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    // className and style are forbidden from public API - only CVA output is used
    return (
      <Component ref={ref} className={headingVariants({ level, weight, muted })} {...props}>
        {children}
      </Component>
    );
  },
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
