"use client";

/**
 * SectionState Component
 *
 * Canonical section-level empty/error state wrapper.
 * Provides semantic centering and spacing without inline height, magic numbers, or raw layout utilities.
 *
 * @example
 * ```tsx
 * <SectionState variant="empty">
 *   Nothing here yet
 * </SectionState>
 * ```
 *
 * @example
 * ```tsx
 * <SectionState variant="error">
 *   Something went wrong
 * </SectionState>
 * ```
 */

import * as React from "react";

import { Text } from "@/PRIMITIVES/Text";

import { Flex } from "../Flex";

const _SECTION_STATE_VARIANTS = ["empty", "error"] as const;

export type SectionStateVariant = (typeof _SECTION_STATE_VARIANTS)[number];

export interface SectionStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Semantic variant for section-level state
   */
  variant?: SectionStateVariant;

  /**
   * Component content
   */
  children?: React.ReactNode;
}

/**
 * SectionState component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Composes Foundation components (Text)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses descriptive, intent-based naming
 * - ✅ Does NOT duplicate Foundation functionality
 * - ✅ No inline height/minHeight and no Tailwind height utilities
 * - ✅ No layout props in public API
 * - ✅ No motion by design (static state container)
 */
const SectionState = React.forwardRef<HTMLDivElement, SectionStateProps>(
  ({ variant = "empty", children, ...props }, ref) => {
    const isPrimitive = (value: unknown): value is string | number =>
      typeof value === "string" || typeof value === "number";
    const shouldWrapText =
      isPrimitive(children) ||
      (Array.isArray(children) && children.every((child) => isPrimitive(child)));
    const textProps =
      variant === "error"
        ? { typographyRole: "status" as const, color: "error" as const }
        : { typographyRole: "meta" as const, color: "muted" as const };

    return (
      <Flex
        ref={ref}
        direction="column"
        align="center"
        justify="center"
        gap="sm"
        px="lg"
        py="xl"
        data-variant={variant}
        role={variant === "error" ? "alert" : "status"}
        aria-live={variant === "error" ? "assertive" : "polite"}
        {...props}
      >
        {shouldWrapText ? (
          <Text as="p" size="md" weight="medium" {...textProps}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Flex>
    );
  },
);

SectionState.displayName = "SectionState";

export { SectionState };
