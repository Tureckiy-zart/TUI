"use client";

/**
 * Column Primitive Component
 *
 * Alias for Stack (semantic name for vertical layout).
 * Token-driven vertical layout component using Box internally.
 *
 * @enforcement TUNG_COLUMN_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Column is a composition component that delegates ALL styling to Stack component
 * - ALL styling is delegated to Stack component (layout)
 * - Column does NOT use tokens directly (it IS Stack)
 * - Stack component handles layout styling via STACK_TOKENS
 * - Spacing prop uses token-based spacing values (xs | sm | md | lg | xl)
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - Column IS Stack component (semantic alias)
 * - Styling is delegated to Stack component
 * - Column provides semantic name for vertical Stack direction
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: Column uses Stack component which handles layout via STACK_TOKENS
 * - Spacing Authority: Column uses token-based spacing values via Stack component
 * - Color Authority: Column does not apply colors (delegated to Stack)
 * - Typography Authority: Column does not apply typography (delegated to Stack)
 *
 * Token-only contract:
 * - Column has no direct token usage (it IS Stack)
 * - All styling occurs through Stack component (STACK_TOKENS)
 * - Stack component handles token enforcement for layout
 * - Spacing prop uses token-based values (semanticSpacing tokens)
 */

import { Stack, type StackProps } from "../Stack";

/**
 * Column component - alias for Stack (semantic name)
 */
export const Column = Stack;

export type { StackProps as ColumnProps };
