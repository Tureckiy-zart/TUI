"use client";

/**
 * NavList Component
 *
 * Pure semantic list container for navigation primitives.
 * Renders either `<ol>` or `<ul>` element with correct HTML semantics.
 *
 * **What NavList IS:**
 * - Semantic list container for navigation
 * - Structural wrapper for NavItem
 * - Composition-only primitive
 *
 * **What NavList IS NOT:**
 * - Layout component
 * - Separator renderer
 * - Navigation pattern
 * - Logic container
 * - Stateful component
 *
 * @example
 * <NavList>
 *   <NavItem>Home</NavItem>
 *   <NavItem>About</NavItem>
 * </NavList>
 *
 * @example
 * <NavList as="ul">
 *   <NavItem>Item 1</NavItem>
 *   <NavItem>Item 2</NavItem>
 * </NavList>
 *
 * @example
 * <NavList asChild>
 *   <CustomListComponent />
 * </NavList>
 */

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

// ============================================================================
// Types
// ============================================================================

export interface NavListProps extends Omit<
  React.OlHTMLAttributes<HTMLOListElement>,
  "className" | "style"
> {
  /**
   * HTML element to render
   * @default 'ol'
   */
  as?: "ol" | "ul";

  /**
   * Render as child component (Radix pattern)
   * When true, renders children through Slot component instead of list element
   */
  asChild?: boolean;

  /**
   * List items (NavItem components)
   */
  children: React.ReactNode;
}

// ============================================================================
// Component
// ============================================================================

/**
 * NavList - Structural list container for navigation
 *
 * Renders an ordered (`<ol>`) or unordered (`<ul>`) list.
 * Default element is `<ol>` for semantic navigation lists.
 *
 * This component is a pure structural wrapper with no styling, layout, or logic.
 * All visual styling should be applied through child components or external wrappers.
 */
export const NavList = React.forwardRef<HTMLOListElement | HTMLUListElement, NavListProps>(
  ({ as = "ol", asChild, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot {...props} ref={ref}>
          {children}
        </Slot>
      );
    }

    if (as === "ul") {
      return (
        <ul ref={ref as React.ForwardedRef<HTMLUListElement>} {...props}>
          {children}
        </ul>
      );
    }

    return (
      <ol ref={ref as React.ForwardedRef<HTMLOListElement>} {...props}>
        {children}
      </ol>
    );
  },
);

NavList.displayName = "NavList";
