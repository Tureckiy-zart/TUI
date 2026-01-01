"use client";

/**
 * Section Container Component
 *
 * Section is a page-level block container for vertical page rhythm.
 * Provides vertical padding between page sections and spacing between content blocks.
 * Uses Stack internally for content block composition.
 * All styling uses tokens exclusively (no raw CSS values).
 *
 * Section IS: A page-level block container for vertical rhythm
 * Section IS NOT: A grid layout component, a variant-driven component, or a layout composition primitive
 *
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import type { ResponsiveSpacing } from "../layout.types";
import { Stack, type StackProps } from "../Stack";

export interface SectionProps extends Omit<StackProps, "py" | "spacing"> {
  /**
   * Vertical padding - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, etc.) or responsive object
   * @example spaceY="md"
   * @example spaceY={{ base: "sm", lg: "xl" }}
   */
  spaceY?: ResponsiveSpacing;

  /**
   * Spacing for content blocks - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, etc.) or responsive object
   * @example spacing="md"
   * @example spacing={{ base: "sm", lg: "xl" }}
   */
  spacing?: ResponsiveSpacing;

  /**
   * Render as different HTML element
   */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Section component - page/landing layout container
 */
const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ spaceY = "md", spacing, className, as, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        as={as ?? "section"}
        py={spaceY}
        spacing={spacing}
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);

Section.displayName = "Section";

export { Section };
