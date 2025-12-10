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

import { cn } from "@/lib/utils";
import { SECTION_TOKENS } from "@/tokens/components/section";

import type { ResponsiveSpacing } from "../layout/layout.types";
import { Stack, type StackProps } from "../layout/Stack";

export interface SectionProps extends Omit<StackProps, "py" | "gap"> {
  /**
   * Vertical padding - token-based (sm, md, lg, xl)
   * Maps to SECTION_TOKENS.padding
   */
  padding?: "sm" | "md" | "lg" | "xl";

  /**
   * Gap spacing for content blocks - token-based (sm, md, lg, xl)
   * Maps to SECTION_TOKENS.spacing
   */
  gap?: "sm" | "md" | "lg" | "xl";

  /**
   * Render as different HTML element
   */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Section component - page/landing layout container
 */
const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ padding = "md", gap, className, as, ...props }, ref) => {
    // Get padding token and convert to py prop
    const paddingToken = SECTION_TOKENS.padding[padding];
    const pyValue = paddingToken.replace("py-", "") as ResponsiveSpacing;

    // Get gap token if provided
    const gapValue = gap
      ? (SECTION_TOKENS.spacing[gap].replace("gap-", "") as ResponsiveSpacing)
      : undefined;

    return (
      <Stack
        ref={ref}
        as={as ?? "section"}
        py={pyValue}
        gap={gapValue}
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);

Section.displayName = "Section";

export { Section };
