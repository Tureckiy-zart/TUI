import * as React from "react";

import type { ComponentAnimationConfig } from "@/COMPOSITION/motion/animation/types";

/**
 * ArtistCard Size Variant
 * Canonical vocabulary aligned with VARIANTS_SIZE_CANON.md
 */
export type ArtistCardSize = "sm" | "md";

/**
 * ArtistCard Style Variant
 * Canonical vocabulary aligned with VARIANTS_SIZE_CANON.md
 */
export type ArtistCardVariant = "default" | "elevated";

/**
 * Props for ArtistCard component.
 * All props are flat and domain-agnostic. Consumer should provide pre-localized strings.
 */
export interface ArtistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Artist name (pre-localized string, required) */
  name: string;
  /** Artist description (pre-localized string, optional) */
  description?: string;
  /** Genres as comma-separated string (e.g., "Jazz, Blues, Rock", optional) */
  genres?: string;
  /** Follower count for popularity metric (optional) */
  followers?: number;
  /** Plays/listens count for popularity metric (optional) */
  plays?: number;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for artist details page (optional) */
  href?: string;
  /** Whether this is a featured artist */
  featured?: boolean;
  /** Show image section */
  showImage?: boolean;
  /** Badge text for featured artists (optional) */
  popularBadgeText?: string;
  /** Label for followers count (required) */
  followersLabel: string;
  /** Label for plays count (required) */
  playsLabel: string;
  /** Size variant - controls padding and gap (canonical: sm, md) */
  size?: ArtistCardSize;
  /** Style variant - controls visual appearance (canonical: default, elevated) */
  variant?: ArtistCardVariant;
  /** Animation configuration for entrance and hover animations */
  animation?: ComponentAnimationConfig;
}
