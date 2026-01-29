"use client";

/**
 * Row Primitive Component
 *
 * Row is a semantic alias for Stack with horizontal direction.
 * It provides a more explicit API for horizontal layouts.
 * Uses Stack internally with direction="horizontal".
 *
 * @enforcement TUNG_ROW_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Row is a composition component that delegates ALL styling to Stack component
 * - ALL styling is delegated to Stack component (layout)
 * - Row does NOT use tokens directly
 * - Stack component handles layout styling via STACK_TOKENS
 * - Spacing prop uses token-based spacing values (xs | sm | md | lg | xl)
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - Row composes Stack component for layout
 * - Styling is delegated to Stack component
 * - Row provides semantic alias for horizontal Stack direction
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: Row uses Stack component which handles layout via STACK_TOKENS
 * - Spacing Authority: Row uses token-based spacing values via Stack component
 * - Color Authority: Row does not apply colors (delegated to Stack)
 * - Typography Authority: Row does not apply typography (delegated to Stack)
 *
 * Token-only contract:
 * - Row has no direct token usage (composition component)
 * - All styling occurs through Stack component (STACK_TOKENS)
 * - Stack component handles token enforcement for layout
 * - Spacing prop uses token-based values (semanticSpacing tokens)
 *
 * All spacing uses token-based values only.
 *
 * @example
 * ```tsx
 * // Basic row
 * <Row spacing="md" align="center">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Row>
 *
 * // Row with wrap
 * <Row spacing="md" wrap>
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 *   <Box>Item 3</Box>
 * </Row>
 * ```
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { Stack, type StackProps } from "../Stack";

export interface RowProps extends Omit<StackProps, "direction"> {
  /**
   * Whether items should wrap to next line
   * @default false
   */
  wrap?: boolean;
}

/**
 * Row component - semantic alias for Stack with horizontal direction
 */
const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ wrap = false, className, ...props }, ref) => {
    const wrapClass = wrap ? "flex-wrap" : "flex-nowrap";
    return (
      <Stack ref={ref} direction="horizontal" className={cn(wrapClass, className)} {...props} />
    );
  },
);

Row.displayName = "Row";

export { Row };
