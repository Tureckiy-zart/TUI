import type { ComponentAnimationConfig } from "@/COMPOSITION/motion/animation/types";

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
  /** Event date (Date object, ISO string, or timestamp) */
  date?: string | Date | number;
  /** Ticket description (pre-localized string, optional) */
  description?: string;
  /** Price display string with currency (e.g., "€20", optional) */
  price?: string;
  /** Capacity display string (e.g., "50 tickets", optional) */
  capacity?: string;
  /** Availability status */
  availability?: TicketAvailability;
  /** Label for "Sold Out" state (optional, defaults to "Sold Out") */
  soldOutLabel?: string;
  /** Label for "Available Soon" state (optional, defaults to "Available Soon") */
  availableSoonLabel?: string;
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
