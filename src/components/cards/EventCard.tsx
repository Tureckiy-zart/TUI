"use client";

import React from "react";

import { Card, CardContent } from "@/components/primitives/Card";
import { Link } from "@/components/primitives/Link";
import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

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
  /** Additional CSS classes */
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  venueName,
  price,
  imageUrl,
  href,
  ticketUrl,
  featured = false,
  showImage = true,
  getTicketsLabel,
  featuredBadgeText,
  className,
}) => {
  return (
    <Card
      className={cn(
        "animate-fade-in-up shadow-elevation-md hover:shadow-elevation-xl group relative overflow-hidden border-transparent transition-all duration-normal hover:border-primary/20",
        featured && "ring-2 ring-primary/50",
        className,
      )}
    >
      {featured && featuredBadgeText && (
        <div className="absolute right-3 top-3 z-10">
          <span className="shadow-elevation-lg inline-flex items-center rounded-full bg-gradient-to-r from-accent-500 to-primary-600 px-xs py-xs text-xs font-semibold text-white">
            {featuredBadgeText}
          </span>
        </div>
      )}

      {showImage && (
        <div className="relative h-[var(--spacing-3xl)] w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-surface-elevated1 to-surface-elevated2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-16 w-16 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-normal group-hover:opacity-100" />
        </div>
      )}

      <CardContent className="p-md">
        <Heading
          level={3}
          className="mb-xs line-clamp-2 text-lg font-bold transition-colors group-hover:text-primary"
        >
          {href ? (
            <Link href={href} variant="ghost">
              {title}
            </Link>
          ) : (
            title
          )}
        </Heading>
        {description && (
          <Text size="sm" variant="muted" className="mb-sm line-clamp-2">
            {description}
          </Text>
        )}
        <div className="mb-sm flex flex-col gap-xs">
          {date && (
            <div className="flex items-center gap-xs text-xs text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <Text size="xs" variant="muted">
                {date}
              </Text>
            </div>
          )}
          {venueName && (
            <div className="flex items-center gap-xs text-xs text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <Text size="xs" variant="muted" className="line-clamp-1">
                {venueName}
              </Text>
            </div>
          )}
        </div>
        <div className="border-t border-border pt-sm">
          {ticketUrl && (
            <Link
              href={ticketUrl}
              className="shadow-elevation-md hover:shadow-elevation-lg inline-flex w-full transform items-center justify-center bg-gradient-to-r from-accent-500 to-primary-600 px-md py-xs font-semibold text-white transition-all duration-normal hover:scale-105 hover:from-accent-600 hover:to-primary-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getTicketsLabel}
              <svg className="ml-xs h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          )}
          {!ticketUrl && price && (
            <div className="text-right">
              <Text
                size="lg"
                weight="bold"
                className="bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent"
              >
                {price}
              </Text>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
