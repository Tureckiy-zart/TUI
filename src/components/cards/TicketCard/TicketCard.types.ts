import type { ComponentAnimationConfig } from "@/animation/types";

/**
 * TicketCard Size Variant
 */
export type TicketCardSize = "default" | "compact";

/**
 * TicketCard Style Variant
 */
export type TicketCardVariant = "default" | "featured";

/**
 * Ticket Availability Status
 */
export type TicketAvailability = "available" | "sold_out" | "available_soon";

/**
 * Props for TicketCard component.
 * All props are flat and domain-agnostic. Consumer should provide pre-localized strings.
 */
export interface TicketCardProps {
  /** Ticket type/name (pre-localized string) */
  title: string;
  /** Ticket description (pre-localized string, optional) */
  description?: string;
  /** Price display string with currency (e.g., "€20", optional) */
  price?: string;
  /** Capacity display string (e.g., "50 tickets", optional) */
  capacity?: string;
  /** Availability status */
  availability?: TicketAvailability;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for ticket details (optional) */
  href?: string;
  /** Purchase action URL (optional) */
  purchaseUrl?: string;
  /** Label for purchase button (required) */
  purchaseLabel: string;
  /** VIP badge text (optional) */
  vipBadgeText?: string;
  /** Discount badge text (optional) */
  discountBadgeText?: string;
  /** Whether this is a featured ticket */
  featured?: boolean;
  /** Badge text for featured tickets (optional) */
  featuredBadgeText?: string;
  /** Show image section */
  showImage?: boolean;
  /** Size variant - controls padding and spacing */
  size?: TicketCardSize;
  /** Style variant - controls visual appearance */
  variant?: TicketCardVariant;
  /** Additional CSS classes */
  className?: string;
  /** Animation configuration for entrance and hover animations */
  animation?: ComponentAnimationConfig;
}
