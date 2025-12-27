"use client";

/**
 * NavSeparator - Visual navigation separator
 *
 * Purely visual separator for navigation structures. This is a decorative element
 * with no semantics or logic. The component renders a `<span>` element (or Slot
 * if asChild) with `aria-hidden="true"` to hide it from screen readers.
 *
 * **What NavSeparator IS:**
 * - Purely visual separator
 * - Navigation decoration element
 * - Stateless render-only component
 *
 * **What NavSeparator IS NOT:**
 * - Structural element
 * - Interactive element
 * - Layout controller
 * - Logic container
 * - Navigation item
 *
 * @example
 * ```tsx
 * // Default usage with default separator "/"
 * <NavSeparator />
 *
 * // Custom separator content
 * <NavSeparator>→</NavSeparator>
 *
 * // With asChild pattern
 * <NavSeparator asChild>
 *   <CustomElement />
 * </NavSeparator>
 * ```
 */

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { NAVIGATION_TOKENS } from "@/FOUNDATION/tokens/components/navigation";

export interface NavSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Separator content
   * @default '/'
   */
  children?: React.ReactNode;

  /**
   * Render as child element (composition pattern via Radix Slot)
   * When true, renders children through Slot component instead of <span>
   */
  asChild?: boolean;
}

/**
 * NavSeparator component
 *
 * Renders a visual separator between navigation items.
 * This is a purely decorative element with `aria-hidden="true"`.
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (NAVIGATION_TOKENS)
 * - ✅ Purely visual component (no logic, no state)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses descriptive, intent-based naming
 * - ✅ Does NOT duplicate Foundation functionality
 * - ✅ aria-hidden="true" always set
 */
export const NavSeparator = React.forwardRef<HTMLSpanElement, NavSeparatorProps>(
  ({ className, children = "/", asChild = false, ...props }, ref) => {
    const commonProps = {
      ref,
      className: cn(NAVIGATION_TOKENS.states.default.text, className),
      "aria-hidden": "true" as const,
      ...props,
    };

    if (asChild) {
      return <Slot {...commonProps}>{children}</Slot>;
    }

    return <span {...commonProps}>{children}</span>;
  },
);

NavSeparator.displayName = "NavSeparator";
