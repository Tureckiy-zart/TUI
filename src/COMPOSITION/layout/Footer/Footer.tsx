"use client";

/**
 * Footer Component
 *
 * Token-driven footer component for page-level layout.
 * Provides semantic <footer> element with flexible content slots (left, center, right).
 * Uses Stack internally for layout composition.
 * All styling uses tokens exclusively (no raw CSS values).
 */

import * as React from "react";

import { getBaseValue, getColorCSSVar, getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";

import type { ColorValue, ResponsiveSpacing } from "../layout.types";
import { Stack } from "../Stack";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Left content slot
   * @example left={<div>Copyright © 2025</div>}
   */
  left?: React.ReactNode;

  /**
   * Center content slot
   * @example center={<nav>Links</nav>}
   */
  center?: React.ReactNode;

  /**
   * Right content slot
   * @example right={<div>Social links</div>}
   */
  right?: React.ReactNode;

  /**
   * Horizontal padding - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, etc.) or responsive object
   * @default "md"
   * @example px="md"
   * @example px={{ base: "sm", lg: "xl" }}
   */
  px?: ResponsiveSpacing;

  /**
   * Vertical padding - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, etc.) or responsive object
   * @default "lg"
   * @example py="lg"
   * @example py={{ base: "md", lg: "xl" }}
   */
  py?: ResponsiveSpacing;

  /**
   * Show top border
   * @default true
   * @example border={true}
   */
  border?: boolean;

  /**
   * Background color token
   * @default "background"
   * @example bg="muted"
   */
  bg?: ColorValue;

  /**
   * Accessible label for footer region
   * @default undefined
   * @example ariaLabel="Site footer"
   */
  ariaLabel?: string;

  /**
   * Content (alternative to slots)
   * If provided, left/center/right slots are ignored
   * @example children={<div>Footer content</div>}
   */
  children?: React.ReactNode;
}

/**
 * Footer component - page-level footer container
 */
const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      left,
      center,
      right,
      px = "md",
      py = "lg",
      border = true,
      bg = "background",
      ariaLabel,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const pxBaseValue = getBaseValue<typeof px>(px);
    const pyBaseValue = getBaseValue<typeof py>(py);
    const bgBaseValue = getBaseValue<ColorValue>(bg);

    const computedStyle: React.CSSProperties = {
      ...(pxBaseValue !== undefined && {
        paddingLeft: getSpacingCSSVar(String(pxBaseValue)),
        paddingRight: getSpacingCSSVar(String(pxBaseValue)),
      }),
      ...(pyBaseValue !== undefined && {
        paddingTop: getSpacingCSSVar(String(pyBaseValue)),
        paddingBottom: getSpacingCSSVar(String(pyBaseValue)),
      }),
      ...(bgBaseValue !== undefined && {
        backgroundColor: getColorCSSVar(bgBaseValue),
      }),
      ...style,
    };

    return (
      <footer
        ref={ref}
        className={cn("w-full", border && "border-t border-border", className)}
        style={Object.keys(computedStyle).length > 0 ? computedStyle : undefined}
        aria-label={ariaLabel}
        {...props}
      >
        {children ? (
          children
        ) : (
          <Stack direction="horizontal" justify="between" align="center" className="w-full">
            {left && <div className="flex items-center">{left}</div>}
            {center && <div className="flex items-center">{center}</div>}
            {right && <div className="flex items-center">{right}</div>}
          </Stack>
        )}
      </footer>
    );
  },
);

Footer.displayName = "Footer";

export { Footer };
