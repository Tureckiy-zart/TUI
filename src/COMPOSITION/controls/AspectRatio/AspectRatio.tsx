"use client";

/**
 * AspectRatio Component
 *
 * Container that maintains a fixed aspect ratio for its content.
 * Useful for responsive images, videos, and cards.
 *
 * @enforcement TUNG_ASPECTRATIO_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - AspectRatio is a pure layout utility component with no direct styling
 * - ALL styling is delegated to Radix AspectRatio primitive
 * - AspectRatio does NOT use tokens directly (no visual representation)
 * - Radix AspectRatio handles aspect ratio calculation via CSS
 * - NO raw Tailwind classes allowed (component has no styling)
 *
 * Composition Authority Rules:
 * - AspectRatio composes Radix AspectRatio primitive
 * - Styling is delegated to Radix component
 * - AspectRatio provides aspect ratio calculation only
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: AspectRatio provides layout structure only, styling delegated to Radix
 * - Color Authority: AspectRatio does not apply colors (delegated to Radix)
 * - Typography Authority: AspectRatio does not apply typography (delegated to Radix)
 * - Spacing Authority: AspectRatio does not apply spacing (delegated to Radix)
 *
 * Token-only contract:
 * - AspectRatio has no token usage (pure layout utility component)
 * - All styling occurs through Radix AspectRatio primitive
 * - AspectRatio provides aspect ratio calculation via CSS aspect-ratio property
 * - This is a layout utility component, not a visual component
 *
 * @example
 * ```tsx
 * // 16:9 aspect ratio (video)
 * <AspectRatio ratio={16 / 9}>
 *   <img src="..." alt="..." />
 * </AspectRatio>
 *
 * // Square aspect ratio (1:1)
 * <AspectRatio ratio={1}>
 *   <img src="..." alt="..." />
 * </AspectRatio>
 *
 * // Using preset
 * <AspectRatio preset="video">
 *   <iframe src="..." />
 * </AspectRatio>
 * ```
 */

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import * as React from "react";

/**
 * Common aspect ratio presets
 */
const ASPECT_RATIO_PRESETS = {
  square: 1 / 1, // 1:1
  video: 16 / 9, // 16:9
  cinema: 21 / 9, // 21:9 (ultra-wide)
  portrait: 9 / 16, // 9:16 (vertical video)
  photo: 4 / 3, // 4:3 (traditional photo)
  golden: 1.618 / 1, // Golden ratio
} as const;

export type AspectRatioPreset = keyof typeof ASPECT_RATIO_PRESETS;

export interface AspectRatioProps extends React.ComponentPropsWithoutRef<
  typeof AspectRatioPrimitive.Root
> {
  /**
   * Aspect ratio as a number (width / height)
   * @example 16 / 9 for 16:9 ratio
   * @example 1 for square (1:1)
   */
  ratio?: number;

  /**
   * Preset aspect ratio
   * Overrides `ratio` prop if provided
   */
  preset?: AspectRatioPreset;
}

/**
 * AspectRatio component
 */
const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ ratio, preset, ...props }, ref) => {
  // Preset overrides ratio prop
  const finalRatio = preset ? ASPECT_RATIO_PRESETS[preset] : ratio;

  return <AspectRatioPrimitive.Root ref={ref} ratio={finalRatio} {...props} />;
});

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;

export { ASPECT_RATIO_PRESETS, AspectRatio };
