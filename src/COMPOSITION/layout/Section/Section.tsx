"use client";

/**
 * Section Container Component
 *
 * Section is a page-level block container for vertical page rhythm and semantic separation.
 * Provides vertical padding between page sections and spacing between content blocks.
 * Uses Stack internally for content block composition.
 * All styling uses tokens exclusively (no raw CSS values).
 *
 * @enforcement TUNG_SECTION_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Section is a composition component that delegates ALL styling to Stack component
 * - ALL styling is delegated to Stack component (layout)
 * - Section does NOT use tokens directly
 * - Stack component handles layout styling via STACK_TOKENS
 * - Spacing props (spaceY, spacing) use token-based spacing values (xs | sm | md | lg | xl | 2xl)
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - Section composes Stack component for layout
 * - Styling is delegated to Stack component
 * - Section provides semantic <section> element wrapper
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/reference/COMPONENT_USAGE_MATRIX.md for usage boundaries and nesting rules
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 *
 * Authority Compliance:
 * - Layout Authority: Section uses Stack component which handles layout via STACK_TOKENS
 * - Spacing Authority: Section uses token-based spacing values via Stack component
 * - Color Authority: Section does not apply colors (delegated to Stack)
 * - Typography Authority: Section does not apply typography (delegated to Stack)
 *
 * Token-only contract:
 * - Section has no direct token usage (composition component)
 * - All styling occurs through Stack component (STACK_TOKENS)
 * - Stack component handles token enforcement for layout
 * - Spacing props use token-based values (semanticSpacing tokens)
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
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import type { BoxElement } from "../Box";
import type { ResponsiveSpacing } from "../layout.types";
import { Stack, type StackProps } from "../Stack";

export type SectionProps<E extends BoxElement = "section"> = Omit<
  StackProps<E>,
  "py" | "spacing"
> & {
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
};

/**
 * Section component - page/landing layout container
 */
const SectionComponent = React.forwardRef<HTMLElement, SectionProps>(
  ({ spaceY = "md", spacing, className, as = "section", ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        as={as}
        py={spaceY}
        spacing={spacing}
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);

SectionComponent.displayName = "Section";

const Section = SectionComponent as typeof SectionComponent & {
  <E extends BoxElement = "section">(
    props: SectionProps<E> & { ref?: React.Ref<HTMLElement> },
  ): React.ReactElement;
};

Section.displayName = "Section";

export { Section };
