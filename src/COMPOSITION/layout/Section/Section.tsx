"use client";

/**
 * Section Container Component
 *
 * Section is a page-level block container for vertical page rhythm and semantic separation.
 * Provides vertical padding between page sections and spacing between content blocks.
 * Uses Stack internally for content block composition.
 * All styling uses tokens exclusively (no raw CSS values).
 *
 * **What Section IS:**
 * - Page-level block container for vertical page rhythm
 * - Semantic separation between major page sections
 * - Container for page-level blocks (landing pages, content pages)
 * - Can contain Panel components (Panel inside Section is allowed)
 *
 * **What Section IS NOT:**
 * - Content grouping inside a page → Use `Panel` for grouping related content
 * - Visual identity responsibility → Section is structural, not visual
 * - Grid layout component → Section uses Stack internally, not Grid
 * - Variant-driven component → Section is structural, not variant-driven
 * - Nested inside Panel → Section is page-level, Panel is page-internal
 *
 * @see docs/reference/COMPONENT_USAGE_MATRIX.md for usage boundaries and nesting rules
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
