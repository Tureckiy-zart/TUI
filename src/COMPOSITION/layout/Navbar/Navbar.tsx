"use client";

/**
 * Navbar Component
 *
 * Navigation container component providing semantic `<nav>` wrapper with left/right/children slots
 * for navigation content. Uses layout primitives internally (Stack, Box) for token-based styling.
 *
 * Navbar IS: A navigation container component (semantic wrapper for navigation content)
 * Navbar IS NOT: A layout primitive (does not control page padding, vertical rhythm, or grid layout)
 *
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 */

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { Box } from "../Box";
import { Stack } from "../Stack";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Left content slot
   * @example left={<Logo />}
   */
  left?: React.ReactNode;

  /**
   * Right content slot
   * @example right={<UserMenu />}
   */
  right?: React.ReactNode;

  /**
   * Center/alternative content
   * If provided, left/right slots are still rendered
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
  right,
  children,
  ariaLabel = "Primary navigation",
  ...rest
}) => {
  return (
    <Box
      as="nav"
      px="md"
      py="sm"
      className={cn("w-full", className)}
      aria-label={ariaLabel}
      {...rest}
    >
      <Stack direction="horizontal" justify="between" align="center" className="w-full">
        {left && <Box className="flex items-center">{left}</Box>}

        {children && <Box className="flex items-center">{children}</Box>}

        {right && <Box className="flex items-center">{right}</Box>}
      </Stack>
    </Box>
  );
};
