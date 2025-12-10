import * as React from "react";

import type { ComponentAnimationConfig } from "@/animation/types";

/**
 * CategoryCard Size Variant
 */
export type CategoryCardSize = "default" | "compact";

/**
 * CategoryCard Style Variant
 */
export type CategoryCardVariant = "default" | "featured";

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
