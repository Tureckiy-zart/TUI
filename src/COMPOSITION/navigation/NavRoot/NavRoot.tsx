"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

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
