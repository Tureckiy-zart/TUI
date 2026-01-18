"use client";

/**
 * NavSeparator - Visual navigation separator
 *
 * Purely visual separator for navigation structures. This is a decorative element
 * with no semantics or logic. The component renders a `<span>` element (or Slot
 * if asChild) with `aria-hidden="true"` to hide it from screen readers.
 *
 * @enforcement TUNG_NAVSEPARATOR_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use NAVIGATION_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL typography values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Text color uses NAVIGATION_TOKENS.states.default.text
 * - Component is purely visual (no spacing, no layout)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from NAVIGATION_TOKENS.states.default.text
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
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
 * - Color Authority: NavSeparator uses color token system exclusively via NAVIGATION_TOKENS
 * - Typography Authority: NavSeparator uses typography token system exclusively via NAVIGATION_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in NAVIGATION_TOKENS (src/FOUNDATION/tokens/components/navigation.ts)
 * - NAVIGATION_TOKENS reference foundation tokens from color and typography systems
 * - No raw Tailwind color/typography classes are allowed
 * - TypeScript enforces valid token usage at compile time
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
