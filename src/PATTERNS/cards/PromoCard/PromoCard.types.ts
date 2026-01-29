import * as React from "react";

import type { ComponentAnimationConfig } from "@/index";

/**
 * PromoCard Size Variant
 * Maps to GlobalSize scale subset: sm | md
 * - "sm" maps from legacy "compact"
 * - "md" maps from legacy "default"
 */
export type PromoCardSize = "sm" | "md";

/**
 * PromoCard Style Variant
 * Maps to SurfaceVariant dictionary: default | elevated
 * - "default" maps from legacy "default"
 * - "elevated" maps from legacy "featured"
 */
export type PromoCardVariant = "default" | "elevated";

/**
 * Props for PromoCard component.
 * All props are flat and domain-agnostic. Consumer should provide pre-localized strings.
 */
export interface PromoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Promo title (pre-localized string, required) */
  title: string;
  /** Promo description (pre-localized string, optional) */
  description?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for promo details page (optional) */
  href?: string;
  /** CTA button URL (optional) */
  ctaUrl?: string;
  /** Label for CTA button (required) */
  ctaLabel: string;
  /** Whether this is a featured promo */
  featured?: boolean;
  /** Badge text for featured promos (optional) */
  featuredBadgeText?: string;
  /** Show image section */
  showImage?: boolean;
  /** Size variant - controls padding and spacing */
  size?: PromoCardSize;
  /** Style variant - controls visual appearance */
  variant?: PromoCardVariant;
  /** Additional CSS classes */
  className?: string;
  /** Animation configuration for entrance and hover animations */
  animation?: ComponentAnimationConfig;
}
