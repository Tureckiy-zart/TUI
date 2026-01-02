import * as React from "react";

import type { ComponentAnimationConfig } from "@/COMPOSITION/motion/animation/types";

/**
 * CategoryCard Size Variant
 * Maps to GlobalSize scale subset: sm | md
 * - "sm" maps from legacy "compact"
 * - "md" maps from legacy "default"
 */
export type CategoryCardSize = "sm" | "md";

/**
 * CategoryCard Style Variant
 * Maps to SurfaceVariant dictionary: default | elevated
 * - "default" maps from legacy "default"
 * - "elevated" maps from legacy "featured"
 */
export type CategoryCardVariant = "default" | "elevated";

/**
 * Props for CategoryCard component.
 * All props are flat and domain-agnostic. Consumer should provide pre-localized strings.
 */
export interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category title (pre-localized string, required) */
  title: string;
  /** Category description (pre-localized string, optional) */
  description?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for category details page (optional) */
  href?: string;
  /** Whether this is a featured category */
  featured?: boolean;
  /** Badge text for featured categories (optional) */
  featuredBadgeText?: string;
  /** Show image section */
  showImage?: boolean;
  /** Size variant - controls padding and spacing */
  size?: CategoryCardSize;
  /** Style variant - controls visual appearance */
  variant?: CategoryCardVariant;
  /** Additional CSS classes */
  className?: string;
  /** Animation configuration for entrance and hover animations */
  animation?: ComponentAnimationConfig;
}
