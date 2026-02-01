/**
 * HeroMedia internal constants
 *
 * Aspect ratios map to existing numeric ratios (no new token domains).
 * Overlay positioning is delegated to OverlaySlot (single source of truth).
 *
 * @see docs/architecture/extension/HEROMEDIA_CANON.md
 */

export const HEROMEDIA_ASPECT_VALUES = ["auto", "16:9", "21:9"] as const;
export type HeroMediaAspect = (typeof HEROMEDIA_ASPECT_VALUES)[number];

export const HEROMEDIA_SIZE_VALUES = ["sm", "md", "lg"] as const;
export type HeroMediaSize = (typeof HEROMEDIA_SIZE_VALUES)[number];

export const HEROMEDIA_OVERLAY_POSITIONS = ["top", "center", "bottom"] as const;
export type HeroMediaOverlayPosition = (typeof HEROMEDIA_OVERLAY_POSITIONS)[number];

export const HEROMEDIA_OVERLAY_ALIGN_VALUES = ["start", "center", "end"] as const;
export type HeroMediaOverlayAlign = (typeof HEROMEDIA_OVERLAY_ALIGN_VALUES)[number];

export const HEROMEDIA_MEDIA_TYPES = ["image", "video", "carousel"] as const;
export type HeroMediaType = (typeof HEROMEDIA_MEDIA_TYPES)[number];

/** Aspect ratio numbers for AspectRatio component (width/height) */
export const HEROMEDIA_ASPECT_RATIOS = {
  "16:9": 16 / 9,
  "21:9": 21 / 9,
} as const;
