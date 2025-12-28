/**
 * Token CVA Utility
 *
 * A type-safe wrapper around class-variance-authority (CVA) that enforces
 * token-based styling and provides validation in development mode.
 *
 * @enforcement TUNG: tokenCVA introduction
 * @rule ALL visual properties MUST use token-based utilities
 * @rule NO raw Tailwind color/spacing classes allowed (ERROR level)
 * @rule Dimension utilities are advisory (WARN level) until dimension token system exists
 * @rule CVA variants MUST reference component tokens
 *
 * Enforcement Policy:
 * - ERROR: Spacing utilities (p-*, m-*, gap-*, space-*) MUST use semanticSpacing tokens
 * - WARN: Dimension utilities (w-*, h-*, min-w-*, max-w-*, etc.) are allowed temporarily
 *
 * @example
 * ```typescript
 * import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
 * import { BUTTON_TOKENS } from "@/FOUNDATION/tokens/components/button";
 *
 * const buttonVariants = tokenCVA({
 *   base: `${BUTTON_TOKENS.gap} ${BUTTON_TOKENS.radius}`,
 *   variants: {
 *     variant: {
 *       primary: `${BUTTON_TOKENS.variant.primary.background} ${BUTTON_TOKENS.variant.primary.text}`,
 *       secondary: `${BUTTON_TOKENS.variant.secondary.background} ${BUTTON_TOKENS.variant.secondary.text}`,
 *     },
 *   },
 *   defaultVariants: {
 *     variant: "primary",
 *   },
 * });
 * ```
 */

import { cva, type VariantProps as CVAVariantProps } from "class-variance-authority";
import type { ClassValue } from "clsx";

/**
 * Configuration options for tokenCVA
 * Compatible with CVA's VariantConfig type
 */
export interface TokenCVAConfig<Variants extends Record<string, Record<string, ClassValue>>> {
  /**
   * Base classes applied to all variants
   * Should use token-based utilities (e.g., from component tokens)
   */
  base?: ClassValue;

  /**
   * Variant definitions
   * Each variant should reference component tokens
   */
  variants?: Variants;

  /**
   * Compound variants for complex combinations
   */
  compoundVariants?: Array<
    {
      [K in keyof Variants]?: keyof Variants[K] | Array<keyof Variants[K]>;
    } & {
      class?: ClassValue;
      className?: ClassValue;
    }
  >;

  /**
   * Default variant values
   */
  defaultVariants?: {
    [K in keyof Variants]?: keyof Variants[K];
  };
}

/**
 * Enforcement Policy: tokenCVA Raw Utility Validation
 *
 * tokenCVA enforces token-based styling by validating Tailwind utility usage.
 * Utilities are categorized into two enforcement levels:
 *
 * 1. ERROR (Forbidden): Spacing utilities MUST use semanticSpacing tokens
 *    - p-*, px-*, py-*, pt-*, pb-*, pl-*, pr-*
 *    - m-*, mx-*, my-*, mt-*, mb-*, ml-*, mr-*
 *    - gap-*, space-x-*, space-y-*
 *    Rationale: Spacing tokens exist and MUST be used via semanticSpacing.
 *
 * 2. WARN (Advisory): Dimension utilities are allowed until dimension token system exists
 *    - w-*, h-*, min-w-*, max-w-*, min-h-*, max-h-*
 *    - aspect-*, size-*
 *    - vh/vw-based values, pixel-thin separators (h-[1px], h-[2px])
 *    Rationale: Dimension tokens do not yet exist; raw utilities are allowed temporarily.
 *
 * Note: We allow semantic utilities (rounded-md, shadow-sm, h-8, etc.) as these
 * are legitimate token values that map to design system tokens. The validator
 * focuses on catching raw color utilities and arbitrary numeric values that
 * bypass the token system.
 */

/**
 * ERROR-level patterns: Forbidden spacing utilities
 * These MUST be replaced with semanticSpacing tokens
 */
const FORBIDDEN_SPACING_PATTERNS = [
  // Raw color utilities (bg-red-500, text-blue-600, etc.)
  // These are always forbidden as they bypass the color token system
  /\b(bg|text|border|ring|outline)-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+/,
  // Raw spacing utilities with arbitrary numbers (p-4, m-2, gap-3, etc.)
  // Allow semantic spacing tokens (px-sm, py-md, etc.) which use token names
  // Allow p-0, m-0, etc. as these are standard Tailwind classes for zero spacing
  // Allow fractional values (0.5, 1.5, 2.5, 3.5) as these are standard Tailwind spacing classes used in tokens
  // Note: Standard numeric values (p-4, m-2, etc.) are still flagged to encourage semantic tokens
  /\b(p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap|space-[xy])-((?!0$|0\.5$|1\.5$|2\.5$|3\.5$)\d+(\.\d+)?|\[)/,
] as const;

/**
 * WARN-level patterns: Allowed dimension utilities (advisory)
 * These are allowed until a dimension token system is introduced
 */
const ADVISORY_DIMENSION_PATTERNS = [
  // Raw size utilities with arbitrary numbers (w-4, h-6, etc.)
  // Allow semantic size tokens (h-8, w-9, etc.) which are standard design system values
  // Only flag arbitrary values like w-[123px] or h-[calc(...)]
  // Allow viewport-relative values (vh, vw, %) and relative units (rem, em) as these are legitimate design system values
  /\b(w|h|min-w|min-h|max-w|max-h)-\[(?!\d+(vh|vw|%|rem|em)\])/,
] as const;

/**
 * Check if a class string contains forbidden or advisory patterns
 * Only runs in development mode for performance
 *
 * Enforcement levels:
 * - ERROR: Forbidden spacing utilities (must use semanticSpacing tokens)
 * - WARN: Advisory dimension utilities (allowed until dimension token system exists)
 */
function validateTokenUsage(classes: string, context: string): void {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  // Check for forbidden spacing utilities (ERROR level)
  for (const pattern of FORBIDDEN_SPACING_PATTERNS) {
    if (pattern.test(classes)) {
      console.error(
        `[tokenCVA] ERROR: Forbidden spacing utility detected in ${context}:\n` +
          `  "${classes}"\n` +
          `  Pattern: ${pattern}\n` +
          `  Spacing utilities MUST use semanticSpacing tokens (e.g., from component tokens).`,
      );
    }
  }

  // Check for advisory dimension utilities (WARN level)
  for (const pattern of ADVISORY_DIMENSION_PATTERNS) {
    if (pattern.test(classes)) {
      console.warn(
        `[tokenCVA] WARN: Dimension utility detected in ${context}:\n` +
          `  "${classes}"\n` +
          `  Pattern: ${pattern}\n` +
          `  Dimension utilities are allowed until a dimension token system is introduced.`,
      );
    }
  }
}

/**
 * Recursively validate all class values in a variant configuration
 */
function validateVariantConfig(
  value: ClassValue | undefined,
  path: string,
  visited = new Set<string>(),
): void {
  if (value === undefined || value === null) {
    return;
  }

  // Prevent infinite recursion
  const key = `${path}-${String(value)}`;
  if (visited.has(key)) {
    return;
  }
  visited.add(key);

  if (typeof value === "string") {
    validateTokenUsage(value, path);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => {
      validateVariantConfig(item, `${path}[${index}]`, visited);
    });
  } else if (typeof value === "object") {
    Object.entries(value).forEach(([key, val]) => {
      validateVariantConfig(val as ClassValue, `${path}.${key}`, visited);
    });
  }
}

/**
 * Token-based CVA wrapper
 *
 * Creates a CVA variant function with token validation in development mode.
 * This ensures all styling uses token-based utilities rather than hardcoded Tailwind classes.
 *
 * @param config - CVA configuration with token-based classes
 * @returns CVA variant function (same as cva())
 *
 * @example
 * ```typescript
 * const buttonVariants = tokenCVA({
 *   base: BUTTON_TOKENS.base,
 *   variants: {
 *     variant: {
 *       primary: BUTTON_TOKENS.variant.primary,
 *     },
 *   },
 * });
 * ```
 */
export function tokenCVA<Variants extends Record<string, Record<string, ClassValue>>>(
  config: TokenCVAConfig<Variants>,
): ReturnType<typeof cva<Variants>> {
  // Validate token usage in development mode
  if (process.env.NODE_ENV !== "production") {
    if (config.base) {
      validateVariantConfig(config.base, "base");
    }

    if (config.variants) {
      Object.entries(config.variants).forEach(([variantKey, variantValues]) => {
        Object.entries(variantValues as Record<string, ClassValue>).forEach(([valueKey, value]) => {
          validateVariantConfig(value, `variants.${variantKey}.${valueKey}`);
        });
      });
    }

    if (config.compoundVariants) {
      config.compoundVariants.forEach((compound: any, index: number) => {
        if (compound.class) {
          validateVariantConfig(compound.class, `compoundVariants[${index}].class`);
        }
        if (compound.className) {
          validateVariantConfig(compound.className, `compoundVariants[${index}].className`);
        }
      });
    }
  }

  // Delegate to CVA - tokenCVA is a transparent wrapper
  // Cast to preserve type inference while allowing runtime flexibility
  return cva(config.base, {
    variants: config.variants,
    compoundVariants: config.compoundVariants,
    defaultVariants: config.defaultVariants,
  } as Parameters<typeof cva<Variants>>[1]) as ReturnType<typeof cva<Variants>>;
}

/**
 * Re-export VariantProps for convenience
 * This allows components to use VariantProps from tokenCVA instead of CVA directly
 */
export type VariantProps<T extends (...args: any) => any> = CVAVariantProps<T>;
