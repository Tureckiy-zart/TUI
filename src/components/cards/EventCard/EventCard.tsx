"use client";

import * as React from "react";

import { resolveComponentAnimations } from "@/animation/utils";
import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "@/components/cards/CardBase";
import { Icon } from "@/components/icon/Icon";
import { Box } from "@/components/layout/Box";
import { Link } from "@/components/primitives/Link";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { IconArrowRight, IconCalendar, IconLocation } from "@/icons";
import { cn } from "@/lib/utils";
import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { TEXT_TOKENS } from "@/tokens/components/text";

import type { EventCardProps } from "./EventCard.types";
import {
  eventCardBadgeSurfaceVariants,
  eventCardBadgeVariants,
  eventCardFooterVariants,
  eventCardMetadataIconVariants,
  eventCardMetadataItemVariants,
  eventCardMetadataVariants,
  eventCardPriceVariants,
  eventCardTicketButtonIconVariants,
  eventCardTicketButtonVariants,
} from "./EventCard.variants";

/**
 * EventCard Component
 *
 * Domain-specific card component for displaying event information.
 * Uses CardBase for layout and DOMAIN_TOKENS for all styling.
 *
 * @example
 * ```tsx
 * <EventCard
 *   title="Concert"
 *   date="2024-01-01"
 *   venueName="Venue"
 *   getTicketsLabel="Get Tickets"
 * />
 * ```
 */
export const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
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
      size = "default",
      variant,
      className,
      animation,
      ...props
    },
    ref,
  ) => {
    // Resolve animation props with defaults
    const animationProps = resolveComponentAnimations({
      animation: animation?.animation || "fadeInUp",
      hoverAnimation: animation?.hoverAnimation || "hoverLift",
      animationProps: animation?.animationProps,
    });

    // Determine variant: use explicit variant prop or derive from featured
    const cardVariant = variant || (featured ? "featured" : "default");

    return (
      <Box {...animationProps}>
        <CardBase
          ref={ref}
          size={size}
          variant={cardVariant}
          className={cn("group relative", className)}
          {...props}
        >
          {/* Featured Badge */}
          {featured && featuredBadgeText && (
            <div className={eventCardBadgeVariants({ size })}>
              <span className={eventCardBadgeSurfaceVariants({ variant: "featured" })}>
                {featuredBadgeText}
              </span>
            </div>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={size}>
              <div className="relative w-full overflow-hidden bg-gradient-to-br from-surface-elevated1 to-surface-elevated2">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title}
                    className={cn(
                      "h-full w-full object-cover",
                      DOMAIN_TOKENS.motion.hover.transition,
                      DOMAIN_TOKENS.motion.hover.scale,
                    )}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon
                      name="info"
                      size="xl"
                      color="muted"
                      className={ICON_TOKENS.sizes["4xl"]}
                      aria-hidden="true"
                    />
                  </div>
                )}
                {/* Image Overlay on Hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-normal group-hover:opacity-100",
                    DOMAIN_TOKENS.image.overlay.gradient,
                  )}
                />
              </div>
            </CardBaseImageWrapper>
          )}

          {/* Content Section */}
          <CardBaseContentWrapper size={size}>
            {/* Title */}
            <Heading
              level={3}
              className={cn(
                "line-clamp-2 transition-colors group-hover:text-primary",
                TEXT_TOKENS.fontSize.lg,
                TEXT_TOKENS.fontWeight.bold,
                DOMAIN_TOKENS.spacing.section.titleToSubtitle,
              )}
            >
              {href ? (
                <Link href={href} variant="ghost">
                  {title}
                </Link>
              ) : (
                title
              )}
            </Heading>

            {/* Description */}
            {description && (
              <Text
                size="sm"
                muted
                className={cn(
                  "line-clamp-2",
                  size === "compact"
                    ? DOMAIN_TOKENS.spacing.section.titleToSubtitle
                    : DOMAIN_TOKENS.spacing.section.subtitleToMetadata,
                )}
              >
                {description}
              </Text>
            )}

            {/* Metadata Rows */}
            <div className={eventCardMetadataVariants({ size })}>
              {date && (
                <div className={eventCardMetadataItemVariants({ size })}>
                  <IconCalendar className={eventCardMetadataIconVariants({ size })} />
                  <Text size="xs" muted>
                    {date}
                  </Text>
                </div>
              )}
              {venueName && (
                <div className={eventCardMetadataItemVariants({ size })}>
                  <IconLocation className={eventCardMetadataIconVariants({ size })} />
                  <Text size="xs" muted className="line-clamp-1">
                    {venueName}
                  </Text>
                </div>
              )}
            </div>
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={size}>
            <div className={cn("w-full", eventCardFooterVariants({ size }))}>
              {ticketUrl && (
                <Link
                  href={ticketUrl}
                  className={cn("w-full", eventCardTicketButtonVariants({ size }))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getTicketsLabel}
                  <IconArrowRight className={eventCardTicketButtonIconVariants({ size })} />
                </Link>
              )}
              {!ticketUrl && price && (
                <div className="text-right">
                  <Text size={size === "compact" ? "md" : "lg"} weight="bold">
                    <span className={eventCardPriceVariants({ size })}>{price}</span>
                  </Text>
                </div>
              )}
            </div>
          </CardBaseFooterWrapper>
        </CardBase>
      </Box>
    );
  },
);

EventCard.displayName = "EventCard";
