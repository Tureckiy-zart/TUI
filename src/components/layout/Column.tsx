"use client";

/**
 * Column Primitive Component
 *
 * Alias for Stack (semantic name for vertical layout).
 * Token-driven vertical layout component using Box internally.
 */

import { Stack, type StackProps } from "./Stack";

/**
 * Column component - alias for Stack (semantic name)
 */
export const Column = Stack;

export type { StackProps as ColumnProps };
