"use client";

/**
 * VisuallyHidden Component
 *
 * Provides accessible names for interactive elements without visual display.
 * Hides content visually while keeping it accessible to screen readers.
 *
 * This component uses the standard visually-hidden CSS pattern to hide content
 * from visual users while maintaining accessibility for assistive technologies.
 *
 * @enforcement TUNG_VISUALLYHIDDEN_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - VisuallyHidden INTENTIONALLY does NOT use tokens (by design)
 * - Component uses inline CSS styles for accessibility-specific hiding
 * - Inline styles are required for the visually-hidden pattern (position, clip-path, etc.)
 * - NO visual tokens are used (component has no visual representation)
 * - NO Tailwind classes are used (uses inline styles only)
 * - This is an exception to token enforcement for accessibility reasons
 *
 * Accessibility Authority Rules:
 * - Component uses standard visually-hidden CSS pattern
 * - Inline styles are required for cross-browser compatibility
 * - Component is intentionally non-visual (no color, spacing, typography tokens)
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: VisuallyHidden uses inline CSS for structural positioning only
 * - Color Authority: VisuallyHidden does not apply colors (intentionally non-visual)
 * - Typography Authority: VisuallyHidden does not apply typography (intentionally non-visual)
 * - Spacing Authority: VisuallyHidden does not apply spacing (intentionally non-visual)
 * - Accessibility Authority: VisuallyHidden provides screen reader accessibility via inline CSS
 *
 * Token-only contract:
 * - VisuallyHidden intentionally does NOT use tokens (exception for accessibility)
 * - Component uses inline CSS styles for the visually-hidden pattern
 * - This is a deliberate exception to token enforcement for accessibility requirements
 * - Inline styles are required for cross-browser compatibility of the hiding pattern
 *
 * @example
 * ```tsx
 * // Basic usage - screen reader only text
 * <VisuallyHidden>Screen reader text</VisuallyHidden>
 *
 * // Icon-only button with accessible name
 * <button>
 *   <Icon />
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 * </button>
 *
 * // Form input helper text
 * <Input aria-describedby="helper-id" />
 * <VisuallyHidden id="helper-id">Helper text</VisuallyHidden>
 * ```
 */

import * as Slot from "@radix-ui/react-slot";
import * as React from "react";

/**
 * Standard visually-hidden CSS styles
 * Hides content visually while keeping it accessible to screen readers
 */
const visuallyHiddenStyles: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Whether to render as child element (Radix Slot pattern)
   * If true, uses Radix Slot component for composition
   *
   * @example
   * ```tsx
   * <VisuallyHidden asChild>
   *   <span>Screen reader text</span>
   * </VisuallyHidden>
   * ```
   */
  asChild?: boolean;
}

/**
 * VisuallyHidden component
 *
 * Provides accessible names for interactive elements without visual display.
 * Uses standard visually-hidden CSS pattern (position absolute, 1px size, clip-path).
 */
const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ asChild = false, style, ...props }, ref) => {
    // Merge visually-hidden styles with any custom styles
    const mergedStyle: React.CSSProperties = {
      ...visuallyHiddenStyles,
      ...style,
    };

    // If asChild is true, use Radix Slot for composition
    if (asChild) {
      return <Slot.Root ref={ref} style={mergedStyle} {...props} />;
    }

    // Default: render as span element
    return <span ref={ref} style={mergedStyle} {...props} />;
  },
);

VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
