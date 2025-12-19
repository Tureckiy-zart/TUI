"use client";

/**
 * Section Container Component
 *
 * Token-driven section component for page/landing layout composition.
 * Uses SECTION_TOKENS for padding and spacing.
 * Uses Stack internally for content block composition.
 * All styling uses tokens exclusively (no raw CSS values).
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import type { ResponsiveSpacing } from "../layout.types";
import { Stack, type StackProps } from "../Stack";

export interface SectionProps extends Omit<StackProps, "py" | "spacing"> {
  /**
   * Vertical padding - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, etc.) or responsive object
   * @example padding="md"
   * @example padding={{ base: "sm", lg: "xl" }}
   */
  padding?: ResponsiveSpacing;

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
  ({ padding = "md", spacing, className, as, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        as={as ?? "section"}
        py={padding}
        spacing={spacing}
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);

Section.displayName = "Section";

export { Section };
