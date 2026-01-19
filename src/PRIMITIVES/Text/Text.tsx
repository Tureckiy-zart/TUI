"use client";

/**
 * Text Component
 *
 * @semantic_role FOUNDATION_PRIMITIVE_TYPOGRAPHY
 *
 * @semantic_definition
 * Text is a strict typographic primitive responsible only for rendering styled text using design tokens.
 * Text provides size, weight, and tone variants for typography control.
 * Text supports polymorphic rendering via `as` prop (span, p, label, strong, em).
 * Text is non-interactive (no hover/active/focus states) and stateless.
 * Text uses typography scale (xs, sm, md, lg, xl) separate from interactive scale.
 *
 * **What Text IS:**
 * - Strict typographic primitive для plain text rendering
 * - Базовый типографский примитив (size, weight, tone variants)
 * - Non-interactive, stateless компонент
 * - Рендерит semantic HTML элементы (span, p, label, strong, em через `as` prop)
 *
 * **What Text IS NOT:**
 * - НЕ структурная типография (use Heading для заголовков h1-h6 с display font)
 * - НЕ rich text formatting (use RichText для будущего - bold, italic, links внутри текста)
 * - НЕ inline composition (use InlineText для будущего - встраивание компонентов)
 * - НЕ interactive элемент
 * - НЕ layout компонент
 *
 * **Boundaries:**
 * - vs Heading: Text для body text, Heading для структурных заголовков
 * - vs RichText (FUTURE): Text для plain text, RichText для rich formatting
 * - vs InlineText (FUTURE): Text для standalone text, InlineText для inline composition
 *
 * **Forbidden Extensions:**
 * Truncation, line-clamp, rich formatting, inline composition, HTML rendering,
 * markdown support, text transformation, text decoration, ellipsis handling.
 * See audit report for complete list.
 *
 * @status LOCKED (2025-12-26)
 * @rule Typography Authority: Token-only typography values (no raw CSS)
 * @rule Foundation Enforcement: className and style props excluded from public API
 * @rule Interactive Size Scale Authority: Text uses typography scale, NOT interactive scale
 * @rule Role Lock: Text is a strict typographic primitive. It does not perform content processing, truncation, or rich formatting.
 * @pipeline Pipeline 18A Refactor Complete (polymorphic as prop, tone union type)
 * @audit docs/reports/audit/TEXT_BASELINE_REPORT.md
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

/**
 * Text size values (internal - used for type derivation only)
 *
 * @internal
 */
const _TEXT_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

/**
 * Text size type
 * Typography scale for Text component (separate from interactive scale)
 *
 * @public
 */
export type TextSize = (typeof _TEXT_SIZES)[number];

/**
 * Text weight values (internal - used for type derivation only)
 *
 * @internal
 */
const _TEXT_WEIGHTS = ["normal", "medium", "semibold", "bold"] as const;

/**
 * Text weight type
 * Font weight scale for Text component
 *
 * @public
 */
export type TextWeight = (typeof _TEXT_WEIGHTS)[number];

/**
 * Text tone values (internal - used for type derivation only)
 *
 * @internal
 */
const _TEXT_TONES = ["default", "muted"] as const;

/**
 * Text tone type
 * Color tone variant for Text component
 *
 * @public
 */
export type TextTone = (typeof _TEXT_TONES)[number];

/**
 * Text as element types
 * Allowed HTML elements for polymorphic rendering
 *
 * @public
 */
export type TextAsElement = "span" | "p" | "label" | "strong" | "em";

/**
 * Default variant values for Text component
 * Used for type safety and readability in CVA defaultVariants
 */
const DEFAULT_SIZE = "md" as const;
const DEFAULT_WEIGHT = "normal" as const;
const DEFAULT_TONE = "default" as const;

const textVariants = tokenCVA({
  base: "text-[hsl(var(--tm-text-primary))]",
  variants: {
    size: {
      xs: TEXT_TOKENS.fontSize.xs,
      sm: TEXT_TOKENS.fontSize.sm,
      md: TEXT_TOKENS.fontSize.md,
      lg: TEXT_TOKENS.fontSize.lg,
      xl: TEXT_TOKENS.fontSize.xl,
    } satisfies Record<TextSize, string>,
    weight: {
      normal: TEXT_TOKENS.fontWeight.normal,
      medium: TEXT_TOKENS.fontWeight.medium,
      semibold: TEXT_TOKENS.fontWeight.semibold,
      bold: TEXT_TOKENS.fontWeight.bold,
    } satisfies Record<TextWeight, string>,
    tone: {
      default: "",
      muted: "text-[hsl(var(--tm-text-muted))]",
    } satisfies Record<TextTone, string>,
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
    weight: DEFAULT_WEIGHT,
    tone: DEFAULT_TONE,
  },
});

/**
 * Text component props
 *
 * @public
 */
export interface TextProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> {
  /** HTML element to render (span, p, label, strong, em) */
  as?: TextAsElement;
  /** Typography size scale (xs, sm, md, lg, xl) */
  size?: TextSize;
  /** Font weight (normal, medium, semibold, bold) */
  weight?: TextWeight;
  /** Text color tone (default, muted) */
  tone?: TextTone;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as = "span", size, weight, tone, ...props }, ref) => {
    const Component = as as TextAsElement;
    // className and style are forbidden from public API - only CVA output is used
    return (
      <Component ref={ref as any} className={textVariants({ size, weight, tone })} {...props} />
    );
  },
);
Text.displayName = "Text";

export { Text, textVariants };
