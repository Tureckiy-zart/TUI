"use client";

/**
 * ListItem Component
 *
 * Semantic list item wrapper component that enforces consistent list item usage
 * across the codebase. This component wraps the native <li> element and provides
 * a standardized API for list items.
 *
 * All styling uses token-based values only (no raw numeric values).
 *
 * @example
 * ```tsx
 * <ol>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </ol>
 * ```
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Child elements
   */
  children?: React.ReactNode;
}

/**
 * ListItem component - semantic list item wrapper
 */
const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(className)} {...props}>
        {children}
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export { ListItem };
