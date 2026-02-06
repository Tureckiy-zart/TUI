"use client";

/**
 * Navbar Component
 *
 * Navigation container component providing semantic `<nav>` wrapper with left/center/right zones
 * for navigation content. Uses layout primitives internally (Stack, Box) for token-based styling.
 *
 * @enforcement TUNG_NAVBAR_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Navbar is a composition component that delegates ALL styling to Box and Stack components
 * - ALL styling is delegated to Box component (padding) and Stack component (layout)
 * - Navbar does NOT use tokens directly
 * - Box component handles padding styling via BOX_TOKENS
 * - Stack component handles layout styling via STACK_TOKENS
 * - Padding props (px, py) use token-based spacing values
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - Navbar composes Box component for container styling
 * - Navbar composes Stack component for layout
 * - Styling is delegated to Box and Stack components
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/reference/NAVIGATION_CANON.md for navigation architecture
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 *
 * Authority Compliance:
 * - Layout Authority: Navbar uses Box and Stack components which handle layout via their tokens
 * - Spacing Authority: Navbar uses token-based spacing values via Box component
 * - Color Authority: Navbar does not apply colors (delegated to Box)
 * - Typography Authority: Navbar does not apply typography (delegated to Box)
 *
 * Token-only contract:
 * - Navbar has no direct token usage (composition component)
 * - All styling occurs through Box component (BOX_TOKENS) and Stack component (STACK_TOKENS)
 * - Box and Stack components handle token enforcement
 * - Padding props use token-based values (semanticSpacing tokens)
 *
 * **Zone Model:**
 * - **Left:** Logo, brand identity, mobile menu trigger
 * - **Center:** Primary navigation links, NavigationMenu, Tabs
 * - **Right:** User menu, auth actions, language selector, theme toggle
 *
 * **Note:** `children` prop is supported for backward compatibility and renders as center content.
 * For new code, use explicit `center` prop.
 *
 * Navbar IS: A navigation container component (semantic wrapper for navigation content)
 * Navbar IS NOT: A layout primitive (does not control page padding, vertical rhythm, or grid layout)
 */

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { Box } from "../Box";
import { Stack } from "../Stack";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Left zone content
   * For logo, brand identity, and mobile menu trigger
   * @example left={<Logo />}
   */
  left?: React.ReactNode;

  /**
   * Center zone content (explicit)
   * For primary navigation links, NavigationMenu, Tabs
   * Takes precedence over children if both are provided
   * @example center={<NavigationLinks />}
   */
  center?: React.ReactNode;

  /**
   * Right zone content
   * For user menu, auth actions, language selector, theme toggle
   * @example right={<UserMenu />}
   */
  right?: React.ReactNode;

  /**
   * Alternative center content (backward compatibility)
   * If center is not provided, children renders as center zone
   * @deprecated Use center prop instead for explicit zone assignment
   * @example children={<NavLinks />}
   */
  children?: React.ReactNode;

  /**
   * Accessible label for navigation region
   * @default "Primary navigation"
   * @example ariaLabel="Main navigation"
   */
  ariaLabel?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  left,
  center,
  right,
  ariaLabel = "Primary navigation",
  ...rest
}) => {
  // Center zone: prefer explicit center prop, fall back to children for backward compatibility
  const centerContent = center ?? (rest as { children?: React.ReactNode }).children;

  return (
    <Box
      as="nav"
      data-semantic-guard="allow"
      px="md"
      py="sm"
      className={cn("w-full", className)}
      aria-label={ariaLabel}
      {...rest}
    >
      <Stack direction="horizontal" justify="between" align="center" className="w-full">
        {left && <Box className="flex items-center">{left}</Box>}

        {centerContent && <Box className="flex items-center">{centerContent}</Box>}

        {right && <Box className="flex items-center">{right}</Box>}
      </Stack>
    </Box>
  );
};
