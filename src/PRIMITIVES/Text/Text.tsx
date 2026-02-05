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

import { InverseTypographyContext } from "@/COMPOSITION/inverse-typography/InverseTypography/InverseTypography";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";
import {
  type AllowedTextForRole,
  isAllowedTextToken,
  type TextToken,
  type TypographyRole,
} from "@/FOUNDATION/tokens/typography";

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
 * @deprecated Use role + color props instead. This is kept for backward compatibility.
 */
const _TEXT_TONES = ["default", "muted"] as const;

/**
 * Text tone type
 * Color tone variant for Text component
 *
 * @public
 * @deprecated Use role + color props instead. This is kept for backward compatibility.
 */
export type TextTone = (typeof _TEXT_TONES)[number];

/**
 * Text color token mapping to CSS classes
 * Maps Typography Color Policy v1 text tokens to CSS utility classes
 */
const TEXT_COLOR_CLASSES: Record<TextToken, string> = {
  primary: "text-[hsl(var(--tm-text-primary))]",
  secondary: "text-[hsl(var(--tm-text-secondary))]",
  tertiary: "text-[hsl(var(--tm-text-muted))]",
  muted: "text-[hsl(var(--tm-text-muted))]",
  inverse: "text-[hsl(var(--tm-text-inverse))]",
  disabled: "text-[hsl(var(--tm-disabled-foreground))]",
  success: "text-[hsl(var(--tm-status-success))]",
  warning: "text-[hsl(var(--tm-status-warning))]",
  error: "text-[hsl(var(--tm-status-error))]",
  info: "text-[hsl(var(--tm-status-info))]",
} as const;

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
    // Role-based color variant (enforced via TypeScript generic)
    color: {
      primary: TEXT_COLOR_CLASSES.primary,
      secondary: TEXT_COLOR_CLASSES.secondary,
      tertiary: TEXT_COLOR_CLASSES.tertiary,
      muted: TEXT_COLOR_CLASSES.muted,
      inverse: TEXT_COLOR_CLASSES.inverse,
      disabled: TEXT_COLOR_CLASSES.disabled,
      success: TEXT_COLOR_CLASSES.success,
      warning: TEXT_COLOR_CLASSES.warning,
      error: TEXT_COLOR_CLASSES.error,
      info: TEXT_COLOR_CLASSES.info,
    } satisfies Record<TextToken, string>,
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
    weight: DEFAULT_WEIGHT,
  },
});

/**
 * Text component props with role-based color enforcement
 *
 * @public
 * @template R - Typography role (extends TypographyRole)
 */
export interface TextProps<
  R extends TypographyRole = TypographyRole,
> extends React.HTMLAttributes<HTMLSpanElement> {
  /** HTML element to render (span, p, label, strong, em) */
  as?: TextAsElement;
  /** Typography size scale (xs, sm, md, lg, xl) */
  size?: TextSize;
  /** Font weight (normal, medium, semibold, bold) */
  weight?: TextWeight;
  /**
   * Typography role for semantic text styling
   * Determines which text color tokens are allowed via Typography Color Policy v1
   * Note: This is separate from HTML role attribute (ARIA)
   */
  typographyRole?: R;
  /**
   * Text color token (enforced by typographyRole via Typography Color Policy v1)
   * Only tokens allowed for the specified typographyRole are valid
   */
  color?: AllowedTextForRole<R>;
  // tone prop removed - use typographyRole + color instead
  // Migration: tone="default" → typographyRole="body" + color="primary" (or omit color for default)
  // Migration: tone="muted" → typographyRole="meta" + color="muted"
}

const TextComponent = React.forwardRef<HTMLElement, TextProps<any>>(
  ({ as = "span", size, weight, typographyRole: _typographyRole, color, ...props }, ref) => {
    const Component = as as TextAsElement;
    const isInverse = React.useContext(InverseTypographyContext);
    // Inside InverseTypography.Root, switch to inverse token; no new props
    const effectiveColor = isInverse ? "inverse" : color;
    if (
      process.env.NODE_ENV === "development" &&
      _typographyRole &&
      effectiveColor &&
      !isAllowedTextToken(_typographyRole, effectiveColor)
    ) {
      console.warn(
        `[Text] typographyRole="${_typographyRole}" does not allow color="${effectiveColor}".`,
      );
    }
    const colorVariant = effectiveColor ? { color: effectiveColor } : undefined;
    const className = textVariants({ size, weight, ...colorVariant });

    return <Component ref={ref as any} className={className} {...props} />;
  },
);

TextComponent.displayName = "Text";

// Type-safe export with generic support
const Text = TextComponent as typeof TextComponent & {
  <R extends TypographyRole = TypographyRole>(
    props: TextProps<R> & { ref?: React.Ref<HTMLElement> },
  ): React.ReactElement;
};

export { Text, textVariants };
