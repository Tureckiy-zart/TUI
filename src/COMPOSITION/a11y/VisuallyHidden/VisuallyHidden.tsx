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
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses structural CSS properties only (no visual tokens - component intentionally non-visual)
 * - ✅ NO MOTION BY DESIGN (component is static, no state/spatial changes)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Supports Radix Slot pattern via asChild prop
 * - ✅ Does NOT duplicate Foundation functionality
 * - ✅ Does NOT use Tailwind visual utilities (uses inline styles)
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
