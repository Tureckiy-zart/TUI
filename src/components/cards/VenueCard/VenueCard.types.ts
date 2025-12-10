import * as React from "react";

import type { ComponentAnimationConfig } from "@/animation/types";

/**
 * VenueCard Size Variant
 */
export type VenueCardSize = "default" | "compact";

/**
 * VenueCard Style Variant
 */
export type VenueCardVariant = "default" | "featured";

/**
 * Props for VenueCard component.
 * All props are flat and domain-agnostic. Consumer should provide pre-localized strings.
 */
export interface VenueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Venue name (pre-localized string, required) */
  name: string;
  /** Venue description (pre-localized string, optional) */
  description?: string;
  /** Location display string (pre-formatted address, optional) */
  location?: string;
  /** Capacity display string (pre-formatted, optional) */
  capacity?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for venue details page (optional) */
  href?: string;
  /** Number of associated events (optional) */
  eventsCount?: number;
  /** Whether this is a featured venue */
  featured?: boolean;
  /** Show image section */
  showImage?: boolean;
  /** Label for events count (required) */
  eventsLabel: string;
  /** Badge text for popular venues (optional) */
  popularBadgeText?: string;
  /** Label for capacity (required) */
  capacityLabel: string;
  /** Size variant - controls padding and gap */
  size?: VenueCardSize;
  /** Style variant - controls visual appearance */
  variant?: VenueCardVariant;
  /** Animation configuration for entrance and hover animations */
  animation?: ComponentAnimationConfig;
}
