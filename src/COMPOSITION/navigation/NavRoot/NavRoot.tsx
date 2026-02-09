"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { warnOnForbiddenSemanticElement } from "@/COMPOSITION/utils/runtime-guards";
import { trackClassStyleUsage } from "@/DEV/classname-telemetry";

/**
 * NavRoot Component Props
 *
 * Pure semantic navigation boundary component.
 * Renders a <nav> element with required aria-label for accessibility.
 */
export interface NavRootProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * ARIA label for the navigation element (required for accessibility)
   */
  "aria-label": string;

  /**
   * Render as child element (composition pattern via Radix Slot)
   * When true, renders children through Slot component instead of <nav>
   */
  asChild?: boolean;

  /**
   * Child content (navigation primitives like NavLink, navigation lists, etc.)
   */
  children: React.ReactNode;
}

/**
 * NavRoot Component
 *
 * Pure semantic navigation boundary component with zero logic.
 * Provides a semantic <nav> wrapper that enforces accessibility (required aria-label)
 * while remaining a pure composition wrapper with no assumptions about navigation
 * structure or styling.
 *
 * @enforcement TUNG_NAVROOT_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - NavRoot is a pure structural component with no direct styling
 * - ALL styling is delegated to child components (NavLink, NavList, NavItem, etc.)
 * - NavRoot does NOT use tokens directly (no visual representation)
 * - Child components handle all token-based styling via NAVIGATION_TOKENS
 * - NO raw Tailwind classes allowed (component has no styling)
 *
 * Composition Authority Rules:
 * - NavRoot composes semantic HTML element (`<nav>`) only
 * - Styling is delegated to child navigation components
 * - NavRoot provides semantic boundary and accessibility, children provide styling
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: NavRoot provides semantic structure only, styling delegated to children
 * - Color Authority: NavRoot does not apply colors (delegated to children)
 * - Typography Authority: NavRoot does not apply typography (delegated to children)
 * - Spacing Authority: NavRoot does not apply spacing (delegated to children)
 * - Accessibility Authority: NavRoot enforces required aria-label for accessibility
 *
 * Token-only contract:
 * - NavRoot has no token usage (pure structural component)
 * - All styling occurs through child components which use NAVIGATION_TOKENS
 * - Child components (NavLink, NavList, NavItem, NavText, NavSeparator) handle token enforcement
 *
 * **What NavRoot IS:**
 * - Semantic navigation root
 * - Accessibility boundary (enforces aria-label)
 * - Composition wrapper for navigation primitives
 *
 * **What NavRoot IS NOT:**
 * - Layout component
 * - List renderer
 * - Navigation pattern
 * - Stateful component
 * - Logic container
 *
 * @example
 * ```tsx
 * <NavRoot aria-label="Main navigation">
 *   <NavLink href="/">Home</NavLink>
 *   <NavLink href="/about">About</NavLink>
 * </NavRoot>
 * ```
 *
 * @example
 * ```tsx
 * <NavRoot aria-label="Footer navigation" asChild>
 *   <footer>
 *     <NavLink href="/">Home</NavLink>
 *   </footer>
 * </NavRoot>
 * ```
 */
const NavRoot = React.forwardRef<HTMLElement, NavRootProps>(
  ({ "aria-label": ariaLabel, asChild = false, children, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production") {
      trackClassStyleUsage({
        component: "NavRoot",
        zone: "Composition",
        className: props.className,
        style: props.style,
      });
    }
    const childTag =
      React.isValidElement(children) && typeof children.type === "string"
        ? children.type
        : undefined;

    if (asChild) {
      warnOnForbiddenSemanticElement(
        "NavRoot",
        childTag,
        ["nav"],
        "NavRoot already renders <nav>. Do not nest raw <nav>.",
      );
    }

    if (asChild) {
      return (
        <Slot aria-label={ariaLabel} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <nav ref={ref} aria-label={ariaLabel} {...props}>
        {children}
      </nav>
    );
  },
);

NavRoot.displayName = "NavRoot";

export { NavRoot };
