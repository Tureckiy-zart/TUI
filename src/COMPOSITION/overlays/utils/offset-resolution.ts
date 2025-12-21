/**
 * Offset Resolution Utilities
 *
 * Shared helpers for resolving responsive offset tokens to pixel values.
 * Used by Tooltip and Popover components for consistent offset handling.
 *
 * Scope:
 * - Resolves ResponsiveSideOffset and ResponsiveAlignOffset tokens to pixel values
 * - Handles token-to-pixel conversion using Foundation token utilities
 * - Provides consistent default values for side offsets
 *
 * Non-Goals (Do not expand scope):
 * - Does not handle positioning logic (delegated to Radix UI primitives)
 * - Does not handle collision detection (handled by Radix UI primitives)
 * - Does not handle responsive breakpoints (uses base value only via getBaseValue)
 * - Does not provide positioning strategies or placement calculations
 *
 * If new positioning utilities are needed, create separate modules rather than
 * expanding this one. This module should remain focused on token-to-pixel offset resolution.
 */

import { getBaseValue, getSpacingPx } from "@/FOUNDATION/lib/responsive-props";
import type { ResponsiveAlignOffset, ResponsiveSideOffset } from "@/FOUNDATION/tokens/types";

/**
 * Resolves a side offset token to pixels
 * @param offset - Responsive side offset token
 * @param defaultPx - Default pixel value if offset is not provided (default: 4)
 * @returns Pixel value for side offset
 */
export function resolveSideOffset(
  offset: ResponsiveSideOffset | undefined,
  defaultPx: number = 4,
): number {
  const baseOffset = getBaseValue(offset);
  return baseOffset ? getSpacingPx(baseOffset) : defaultPx;
}

/**
 * Resolves an alignment offset token to pixels
 * @param offset - Responsive alignment offset token
 * @returns Pixel value for alignment offset, or undefined if not provided
 */
export function resolveAlignOffset(offset: ResponsiveAlignOffset | undefined): number | undefined {
  const baseOffset = getBaseValue(offset);
  return baseOffset ? getSpacingPx(baseOffset) : undefined;
}
