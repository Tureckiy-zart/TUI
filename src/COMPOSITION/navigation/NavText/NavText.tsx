"use client";

/**
 * NavText - Non-interactive navigation text
 *
 * Renders a `<span>` element (or Slot if asChild) for non-clickable text in navigation structures.
 * Supports `aria-current` attribute for indicating current page/location.
 * This is a pure render-only primitive with no logic, state, or routing behavior.
 *
 * @enforcement TUNG_NAVTEXT_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use NAVIGATION_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL typography values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Text color uses NAVIGATION_TOKENS.states.default.text
 * - Component is purely semantic (no spacing, no layout)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from NAVIGATION_TOKENS.states.default.text
 * - NO raw Tailwind color classes (bg-red-500, text-primary, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Typography is inherited from NAVIGATION_TOKENS.states.default.text
 * - NO raw Tailwind typography classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Color Authority: NavText uses color token system exclusively via NAVIGATION_TOKENS
 * - Typography Authority: NavText uses typography token system exclusively via NAVIGATION_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in NAVIGATION_TOKENS (src/FOUNDATION/tokens/components/navigation.ts)
 * - NAVIGATION_TOKENS reference foundation tokens from color and typography systems
 * - No raw Tailwind color/typography classes are allowed
 * - TypeScript enforces valid token usage at compile time
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
