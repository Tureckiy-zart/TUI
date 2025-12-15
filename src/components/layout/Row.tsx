"use client";

/**
 * Row Primitive Component
 *
 * Row is a semantic alias for Stack with horizontal direction.
 * It provides a more explicit API for horizontal layouts.
 * Uses Stack internally with direction="horizontal".
 *
 * All spacing uses token-based values only.
 *
 * @example
 * ```tsx
 * <Row spacing="md" align="center">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Row>
 * ```
 */

import * as React from "react";

import { Stack, type StackProps } from "./Stack";

export interface RowProps extends Omit<StackProps, "direction"> {
  // Row inherits all Stack props except direction (always horizontal)
}

/**
 * Row component - semantic alias for Stack with horizontal direction
 */
const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  return <Stack ref={ref} direction="horizontal" {...props} />;
});

Row.displayName = "Row";

export { Row };
