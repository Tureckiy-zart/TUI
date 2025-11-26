"use client";

import React from "react";

import { Card, CardContent } from "@/components/primitives/Card";
import { Link } from "@/components/primitives/Link";
import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

/**
 * Props for VenueCard component.
 * All props are flat and domain-agnostic. Consumer should provide pre-localized strings.
 */
export interface VenueCardProps {
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
  /** Additional CSS classes */
  className?: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  name,
  description,
  location,
  capacity,
  imageUrl,
  href,
  eventsCount = 0,
  featured = false,
  showImage = true,
  eventsLabel,
  popularBadgeText,
  capacityLabel,
  className,
}) => {
  if (!name || name.trim() === "") {
    throw new Error('VenueCard: "name" prop is required and cannot be empty');
  }
  if (!eventsLabel || eventsLabel.trim() === "") {
    throw new Error('VenueCard: "eventsLabel" prop is required and cannot be empty');
  }
  if (!capacityLabel || capacityLabel.trim() === "") {
    throw new Error('VenueCard: "capacityLabel" prop is required and cannot be empty');
  }

  return (
    <Card
      className={cn(
        "animate-fade-in-up group relative overflow-hidden border-transparent shadow-md transition-all duration-300 hover:border-primary/20 hover:shadow-xl",
        featured && "ring-2 ring-primary/50",
        className,
      )}
    >
      {featured && popularBadgeText && (
        <div className="absolute right-sm top-sm z-10">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent to-primary px-xs py-xs text-xs font-semibold text-primary-foreground shadow-lg">
            {popularBadgeText}
          </span>
        </div>
      )}

      {showImage && (
        <div className="relative h-[var(--spacing-3xl)] w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-muted to-muted/50">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-16 w-16 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      <CardContent className="p-md">
        <Heading
          level={3}
          className="mb-sm line-clamp-2 text-lg font-bold transition-colors group-hover:text-primary"
        >
          {href ? (
            <Link href={href} variant="ghost">
              {name}
            </Link>
          ) : (
            name
          )}
        </Heading>
        {description && (
          <Text size="sm" variant="muted" className="mb-sm line-clamp-2">
            {description}
          </Text>
        )}
        {location && (
          <div className="mb-sm flex flex-col gap-sm">
            <div className="flex items-center gap-sm text-xs text-muted-foreground">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
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
                {location}
              </Text>
            </div>
          </div>
        )}
        <div className="border-t border-border pt-sm">
          <div className="flex items-center justify-between text-xs">
            {eventsCount > 0 && (
              <div className="flex items-center gap-xs font-medium text-primary">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <Text size="xs" variant="primary" weight="medium">
                  {eventsCount} {eventsLabel}
                </Text>
              </div>
            )}
            {capacity && (
              <div className="flex items-center gap-xs text-muted-foreground">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <Text size="xs" variant="muted">
                  {capacityLabel} {capacity}
                </Text>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
