"use client";

/**
 * Navigation Primitives
 *
 * Stateless semantic navigation primitives that provide the building blocks
 * for navigation patterns. These components are pure HTML wrappers with no
 * routing, state, or business logic.
 *
 * @enforcement TUNG_NAVIGATION_PRIMITIVES_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Navigation primitives are composition components that delegate styling to composed components
 * - NavList is a pure structural component with no direct styling
 * - NavItem composes ListItem component (delegates styling to LISTITEM_TOKENS)
 * - NavText and NavSeparator are standalone components with their own token enforcement
 * - ALL styling is delegated to composed components (ListItem, NavText, NavSeparator)
 * - NO raw Tailwind classes allowed (components delegate styling)
 *
 * Composition Authority Rules:
 * - NavList composes native HTML elements (<ol>, <ul>) with no styling
 * - NavItem composes ListItem component for styling
 * - NavText and NavSeparator are standalone components with NAVIGATION_TOKENS
 * - Styling is delegated to all composed components
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: Navigation primitives use ListItem component which handles layout via LISTITEM_TOKENS
 * - Spacing Authority: Navigation primitives use token-based spacing values via composed components
 * - Color Authority: Navigation primitives do not apply colors directly (delegated to composed components)
 * - Typography Authority: Navigation primitives use typography token system via NavText component
 *
 * Token-only contract:
 * - Navigation primitives have minimal direct token usage (composition components)
 * - All styling occurs through composed components:
 *   - NavItem uses ListItem component (LISTITEM_TOKENS)
 *   - NavText uses NAVIGATION_TOKENS (standalone component)
 *   - NavSeparator uses NAVIGATION_TOKENS (standalone component)
 * - All composed components handle token enforcement
 *
 * @semantic_role EXTENSION_PRIMITIVE_NAVIGATION
 *
 * @semantic_definition
 * Navigation primitives are stateless semantic components that provide the
 * building blocks for navigation patterns. They do not perform routing,
 * state detection, or navigation logic.
 *
 * **What Navigation Primitives ARE:**
 * - Stateless semantic HTML wrappers
 * - Composition-friendly building blocks
 * - Framework-agnostic (no routing dependencies)
 * - Built on native HTML elements (nav, ol, ul, li, span)
 *
 * **What Navigation Primitives ARE NOT:**
 * - Navigation patterns (use Breadcrumbs, Pagination, etc.)
 * - Breadcrumb generators
 * - Routing-aware components
 * - State managers
 * - Business logic containers
 */

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { ListItem } from "@/COMPOSITION/layout";

// Import NavSeparator from standalone component
import { NavSeparator, type NavSeparatorProps } from "../NavSeparator";
// Import NavText from standalone component
import { NavText, type NavTextProps } from "../NavText";

// ============================================================================
// Types
// ============================================================================

// NavRoot and NavRootProps are now exported from standalone component
// See: src/COMPOSITION/navigation/NavRoot/NavRoot.tsx

export interface NavListProps extends React.HTMLAttributes<HTMLOListElement | HTMLUListElement> {
  /**
   * HTML element to render (ordered or unordered list)
   * @default 'ol'
   */
  as?: "ol" | "ul";
  /**
   * Child elements
   */
  children: React.ReactNode;
}

export interface NavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Render as child element (composition pattern via Radix Slot)
   * When true, renders children through Slot component instead of <li>
   */
  asChild?: boolean;
  /**
   * Child elements
   */
  children: React.ReactNode;
}

// NavTextProps exported from standalone NavText component
export type { NavTextProps };
// NavSeparatorProps exported from standalone NavSeparator component
export type { NavSeparatorProps };

// ============================================================================
// Components
// ============================================================================

// NavRoot is now exported from standalone component
// See: src/COMPOSITION/navigation/NavRoot/NavRoot.tsx

/**
 * NavList - Structural list container for navigation
 *
 * Renders an ordered (`<ol>`) or unordered (`<ul>`) list.
 * Default element is `<ol>` for semantic navigation lists.
 *
 * @example
 * <NavList as="ol">
 *   <NavItem>Item 1</NavItem>
 *   <NavItem>Item 2</NavItem>
 * </NavList>
 */
export const NavList = React.forwardRef<HTMLOListElement | HTMLUListElement, NavListProps>(
  ({ as = "ol", className, children, ...props }, ref) => {
    const Component = as;
    // TypeScript cannot narrow the ref type based on Component, so we use type assertion
    // This is safe because ref is compatible with both ol and ul elements
    return (
      <Component ref={ref as any} className={className} {...props}>
        {children}
      </Component>
    );
  },
);
NavList.displayName = "NavList";

/**
 * NavItem - Structural navigation item wrapper
 *
 * Renders a list item (`<li>`) for use inside NavList.
 * This is a pure structural wrapper with no styling or logic.
 *
 * **What NavItem IS:**
 * - Structural navigation list item
 * - List item wrapper for navigation primitives
 * - Pure composition container
 *
 * **What NavItem IS NOT:**
 * - Link
 * - Text renderer
 * - Separator
 * - Layout component
 * - Stateful component
 * - Logic container
 *
 * @example
 * <NavList>
 *   <NavItem>Home</NavItem>
 *   <NavItem>About</NavItem>
 * </NavList>
 *
 * @example
 * <NavList>
 *   <NavItem asChild>
 *     <div>Custom item</div>
 *   </NavItem>
 * </NavList>
 */
export const NavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot className={className} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <ListItem ref={ref} className={className} {...props}>
        {children}
      </ListItem>
    );
  },
);
NavItem.displayName = "NavItem";

// NavText exported from standalone component
export { NavText };
// NavSeparator exported from standalone component
export { NavSeparator };
