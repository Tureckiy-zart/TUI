"use client";

/**
 * HelperText Component
 *
 * @semantic_role FOUNDATION_PRIMITIVE_FORM_DESCRIPTION
 *
 * @semantic_definition
 * HelperText is a presentational DX helper for form descriptions.
 * It provides a thin wrapper around Text component with sensible defaults for helper text use cases.
 * HelperText is standalone (not tied to Field composition) and purely presentational.
 *
 * **What HelperText IS:**
 * - Thin presentational wrapper over Text component
 * - DX helper with sensible defaults (size="sm", typographyRole="meta", color="muted", as="p")
 * - Standalone component (not tied to Field composition)
 * - Accessible via aria-describedby
 * - Token-only styling (via Text component)
 *
 * **What HelperText IS NOT:**
 * - NOT a form controller (no validation logic)
 * - NOT a form state manager (no state ownership)
 * - NOT a validation system (no error handling)
 * - NOT a Field composition component (vs Field.Description)
 * - NOT a business logic component (pure presentational)
 *
 * **Boundaries:**
 * - vs Field.Description: HelperText is standalone, Field.Description is part of Field composition
 * - vs Text: HelperText provides defaults, Text is universal typographic primitive
 *
 * **Forbidden Extensions:**
 * Validation logic, error handling, required/optional semantics, form state awareness,
 * coupling to Field internals, introducing new token domains, hardcoded colors or spacing.
 *
 * @status NEW COMPONENT
 * @rule Foundation Enforcement: className and style props excluded from public API
 * @rule Typography Authority: Token-only typography values (via Text component)
 * @rule Token Compliance: Uses existing TEXT_TOKENS through Text component
 */

import * as React from "react";

import { Text, type TextAsElement, type TextProps, type TextSize } from "@/PRIMITIVES/Text";

/**
 * HelperText component props
 *
 * Extends TextProps but excludes className/style (Foundation Enforcement)
 * and allows optional overrides for size and as props.
 *
 * @public
 */
export interface HelperTextProps extends Omit<TextProps, "className" | "style" | "size" | "as"> {
  /**
   * Typography size scale (default: "sm")
   * Override default small size if needed
   */
  size?: TextSize;

  /**
   * HTML element to render (default: "p")
   * Override default paragraph element if needed
   */
  as?: TextAsElement;
  // tone prop removed - use typographyRole + color from TextProps instead
}

/**
 * HelperText Component Implementation
 *
 * Thin wrapper over Text component with sensible defaults for helper text:
 * - size="sm" (small text for helper descriptions)
 * - typographyRole="meta" + color="muted" (muted color for secondary information)
 * - as="p" (paragraph element for semantic description)
 *
 * All other Text props are forwarded (except className/style per Foundation Enforcement).
 *
 * @example
 * ```tsx
 * <HelperText>We'll never share your email with anyone else.</HelperText>
 * ```
 *
 * @example
 * ```tsx
 * <Input aria-describedby="email-help" />
 * <HelperText id="email-help">Enter your email address</HelperText>
 * ```
 *
 * Token usage:
 * - All tokens via Text component (TEXT_TOKENS)
 * - Color via typographyRole="meta" + color="muted" (role-based color enforcement)
 * - Size via text-sm (size="sm")
 * - No new tokens created (reuse existing)
 */
const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ size = "sm", as = "p", ...props }, ref) => {
    // tone prop removed - use typographyRole + color from TextProps instead
    // Default: typographyRole="meta" + color="muted" for muted helper text
    return <Text ref={ref} size={size} as={as} typographyRole="meta" color="muted" {...props} />;
  },
);
HelperText.displayName = "HelperText";

export { HelperText };
