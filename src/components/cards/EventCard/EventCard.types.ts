import type { ComponentAnimationConfig } from "@/animation/types";

/**
 * EventCard Size Variant
 */
export type EventCardSize = "default" | "compact";

/**
 * EventCard Style Variant
 */
export type EventCardVariant = "default" | "featured";

/**
 * Props for EventCard component.
 * All props are flat and domain-agnostic. Consumer should provide pre-localized strings.
 */
export interface EventCardProps {
  /** Event title (pre-localized string) */
  title: string;
  /** Event description (pre-localized string, optional) */
  description?: string;
  /** Event date/time display string (pre-formatted, optional) */
  date?: string;
  /** Venue name (pre-localized string, optional) */
  venueName?: string;
  /** Price display string with currency (e.g., "€20 - €50", optional) */
  price?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for event details page (optional) */
  href?: string;
  /** External ticket purchase URL (optional) */
  ticketUrl?: string;
  /** Whether this is a featured event */
  featured?: boolean;
  /** Show image section */
  showImage?: boolean;
  /** Label for "Get Tickets" button (required) */
  getTicketsLabel: string;
  /** Badge text for featured events (optional) */
  featuredBadgeText?: string;
  /** Size variant - controls padding and spacing */
  size?: EventCardSize;
  /** Style variant - controls visual appearance */
  variant?: EventCardVariant;
  /** Additional CSS classes */
  className?: string;
  /** Animation configuration for entrance and hover animations */
  animation?: ComponentAnimationConfig;
}
