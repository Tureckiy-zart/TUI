"use client";

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { IconArrowRight, IconCalendar, IconLocation } from "@/icons";
import {
  Box,
  Heading,
  Icon,
  Link,
  LinkWithCustomVariant,
  resolveComponentAnimations,
  Stack,
  Text,
} from "@/index";
import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "@/PATTERNS/cards/cards/CardBase";

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
  eventCardVariants,
} from "./EventCard.variants";

/**
 * EventCard Component
 *
 * Domain-specific card component for displaying event information.
 * Uses CardBase for layout and CARD_TOKENS + DOMAIN_TOKENS for all styling.
 * All visual values come from tokens - no hardcoded Tailwind visual classes.
 *
 * Architecture:
 * - Uses CVA variants for size and layout variants
 * - All spacing, colors, radius from tokens
 * - Semantic HTML elements (heading, time, address)
 * - Full accessibility support
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
      layout = "vertical",
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

    // Map EventCardSize to CardBaseSize: "default" -> "md", "compact" -> "sm"
    const cardBaseSize = size === "compact" ? ("sm" as const) : ("md" as const);

    // Map EventCardVariant to CardBaseVariant: "default" -> "default", "featured" -> "elevated"
    const cardBaseVariant =
      cardVariant === "featured" ? ("elevated" as const) : ("default" as const);

    return (
      <Box {...animationProps}>
        <CardBase
          ref={ref}
          size={cardBaseSize}
          variant={cardBaseVariant}
          className={cn(
            eventCardVariants({ size, layout, variant: cardVariant }),
            "group relative",
            className,
          )}
          {...props}
        >
          {/* Featured Badge */}
          {featured && featuredBadgeText && (
            <Box className={eventCardBadgeVariants({ size })}>
              <Box className={eventCardBadgeSurfaceVariants({ variant: "featured" })}>
                {featuredBadgeText}
              </Box>
            </Box>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={cardBaseSize}>
              <Box
                className={cn(
                  "relative h-full w-full overflow-hidden",
                  DOMAIN_TOKENS.surface.bg.default,
                )}
              >
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
                  <Stack
                    direction="horizontal"
                    align="center"
                    justify="center"
                    className="h-full w-full"
                  >
                    <Box className={ICON_TOKENS.sizes["4xl"]}>
                      <Icon name="info" size="xl" color="muted" aria-hidden="true" />
                    </Box>
                  </Stack>
                )}
                {/* Image Overlay on Hover */}
                <Box
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100",
                    DOMAIN_TOKENS.motion.hover.transition,
                    DOMAIN_TOKENS.image.overlay.gradient,
                  )}
                />
              </Box>
            </CardBaseImageWrapper>
          )}

          {/* Content Section */}
          <CardBaseContentWrapper size={cardBaseSize}>
            {/* Title */}
            <Heading level={3}>
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
              <Text size="sm" typographyRole="meta" color="muted">
                {description}
              </Text>
            )}

            {/* Metadata Rows */}
            <Box className={eventCardMetadataVariants({ size })}>
              {date && (
                <Box className={eventCardMetadataItemVariants({ size })}>
                  <IconCalendar
                    className={eventCardMetadataIconVariants({ size })}
                    aria-hidden={true}
                  />
                  <Text size="xs" typographyRole="meta" color="muted">
                    <time dateTime={date}>{date}</time>
                  </Text>
                </Box>
              )}
              {venueName && (
                <Box className={eventCardMetadataItemVariants({ size })}>
                  <IconLocation
                    className={eventCardMetadataIconVariants({ size })}
                    aria-hidden={true}
                  />
                  <Text size="xs" typographyRole="meta" color="muted">
                    <address>{venueName}</address>
                  </Text>
                </Box>
              )}
            </Box>
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={cardBaseSize}>
            <Box className={cn("w-full", eventCardFooterVariants({ size }))}>
              {ticketUrl && (
                <LinkWithCustomVariant
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  customClassName={eventCardTicketButtonVariants({ size })}
                >
                  {getTicketsLabel}
                  <IconArrowRight
                    className={eventCardTicketButtonIconVariants({ size })}
                    aria-hidden={true}
                  />
                </LinkWithCustomVariant>
              )}
              {!ticketUrl && price && (
                <Box className="text-right">
                  <Text size={size === "compact" ? "md" : "lg"} weight="bold">
                    <Box as="span" className={eventCardPriceVariants({ size })}>
                      {price}
                    </Box>
                  </Text>
                </Box>
              )}
            </Box>
          </CardBaseFooterWrapper>
        </CardBase>
      </Box>
    );
  },
);

EventCard.displayName = "EventCard";
