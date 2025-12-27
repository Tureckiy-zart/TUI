"use client";

/**
 * NavText - Non-interactive navigation text
 *
 * Renders a `<span>` element (or Slot if asChild) for non-clickable text in navigation structures.
 * Supports `aria-current` attribute for indicating current page/location.
 * This is a pure render-only primitive with no logic, state, or routing behavior.
 *
 * **What NavText IS:**
 * - Non-interactive navigation text
 * - Semantic text representation for navigation
 * - Pure render-only primitive
 *
 * **What NavText IS NOT:**
 * - Link
 * - Clickable element
 * - Layout component
 * - Stateful component
 * - Logic container
 * - Routing-aware component
 *
 * @example
 * ```tsx
 * // Default usage
 * <NavText>Home</NavText>
 *
 * // With aria-current
 * <NavText aria-current="page">Current Page</NavText>
 *
 * // With asChild pattern
 * <NavText asChild>
 *   <CustomElement />
 * </NavText>
 * ```
 */

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { NAVIGATION_TOKENS } from "@/FOUNDATION/tokens/components/navigation";

export interface NavTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Child content (text content for navigation)
   */
  children: React.ReactNode;

  /**
   * ARIA current attribute for indicating current page/location
   * NavText MAY accept aria-current='page' for accessibility
   * NavText does NOT determine this state; it only passes through externally provided value
   */
  "aria-current"?: "page";

  /**
   * Render as child element (composition pattern via Radix Slot)
   * When true, renders children through Slot component instead of <span>
   */
  asChild?: boolean;
}

/**
 * NavText component
 *
 * Non-interactive navigation text primitive that renders semantic text
 * for navigation structures. This component is fully stateless and does
 * not perform routing, route matching, or state detection.
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (NAVIGATION_TOKENS)
 * - ✅ Purely semantic component (no logic, no state, no routing)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses descriptive, intent-based naming
 * - ✅ Does NOT duplicate Foundation functionality
 * - ✅ Non-interactive (not focusable, no role overrides)
 * - ✅ Supports asChild pattern for composition
 */
export const NavText = React.forwardRef<HTMLSpanElement, NavTextProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    // Explicitly exclude href and onClick from props (NavText is non-interactive)
    const {
      href: _href,
      onClick: _onClick,
      ...restProps
    } = props as NavTextProps & { href?: string; onClick?: () => void };

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(NAVIGATION_TOKENS.states.default.text, className)}
          {...restProps}
        >
          {children}
        </Slot>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(NAVIGATION_TOKENS.states.default.text, className)}
        {...restProps}
      >
        {children}
      </span>
    );
  },
);

NavText.displayName = "NavText";
