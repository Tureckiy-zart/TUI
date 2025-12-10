"use client";

import React from "react";

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
import { cn } from "@/lib/utils";
import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TEXT_TOKENS } from "@/tokens/components/text";

import type { VenueCardProps } from "./VenueCard.types";
import {
  venueCardBadgeVariants,
  venueCardFooterBorderVariants,
  venueCardImageOverlayVariants,
  venueCardImageTransformVariants,
  venueCardMetadataRowVariants,
  venueCardVariants,
} from "./VenueCard.variants";

/**
 * VenueCard Component
 *
 * Token-driven venue card component using CardBase layout foundation.
 * All visual styling uses DOMAIN_TOKENS, TEXT_TOKENS, ICON_TOKENS, and MOTION_TOKENS.
 *
 * @example
 * ```tsx
 * <VenueCard
 *   name="Venue Name"
 *   location="123 Main St"
 *   eventsLabel="events"
 *   capacityLabel="Capacity"
 *   eventsCount={5}
 *   capacity="500"
 * />
 * ```
 */
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
  size = "default",
  variant = "default",
  className,
  animation,
  ...props
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

  // Resolve animation props with defaults
  const animationProps = resolveComponentAnimations({
    animation: animation?.animation || "fadeInUp",
    hoverAnimation: animation?.hoverAnimation || "hoverLift",
    animationProps: animation?.animationProps,
  });

  // Determine CardBase variant based on featured prop
  const cardBaseVariant = featured ? "featured" : "default";
  const cardBaseSize = size;

  return (
    <Box {...animationProps}>
      <CardBase
        size={cardBaseSize}
        variant={cardBaseVariant}
        className={cn(venueCardVariants({ size, variant }), className)}
        {...props}
      >
        {/* Featured Badge */}
        {featured && popularBadgeText && (
          <div
            className={cn(
              "absolute z-10",
              size === "compact"
                ? DOMAIN_TOKENS.badges.position.compact
                : DOMAIN_TOKENS.badges.position.default,
            )}
          >
            <span className={venueCardBadgeVariants({ size, variant: "featured" })}>
              {popularBadgeText}
            </span>
          </div>
        )}

        {/* Image Section */}
        {showImage && (
          <CardBaseImageWrapper size={cardBaseSize}>
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className={cn("h-full w-full", venueCardImageTransformVariants({ size }))}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  {/* Placeholder icon - using info as fallback since building icon doesn't exist */}
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
              <div className={venueCardImageOverlayVariants({ size })} />
            </div>
          </CardBaseImageWrapper>
        )}

        {/* Content Section */}
        <CardBaseContentWrapper size={cardBaseSize}>
          {/* Title */}
          <Heading
            level={3}
            className={cn(
              "line-clamp-2",
              TEXT_TOKENS.fontSize.lg,
              TEXT_TOKENS.fontWeight.bold,
              MOTION_TOKENS.transition.colors,
              "group-hover:text-primary",
              size === "compact"
                ? DOMAIN_TOKENS.spacing.section.titleToSubtitle
                : DOMAIN_TOKENS.spacing.section.subtitleToMetadata,
            )}
          >
            {href ? (
              <Link href={href} variant="ghost">
                {name}
              </Link>
            ) : (
              name
            )}
          </Heading>

          {/* Description */}
          {description && (
            <Text
              size="sm"
              variant="muted"
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

          {/* Location Metadata */}
          {location && (
            <div className={cn("flex flex-col", DOMAIN_TOKENS.metadata.spacing.vertical)}>
              <div className={venueCardMetadataRowVariants({ size })}>
                <Icon
                  name="location"
                  size="sm"
                  color="muted"
                  className={ICON_TOKENS.sizes.sm}
                  aria-hidden="true"
                />
                <Text size="xs" variant="muted" className="line-clamp-1">
                  {location}
                </Text>
              </div>
            </div>
          )}
        </CardBaseContentWrapper>

        {/* Footer Section */}
        {(eventsCount > 0 || capacity) && (
          <CardBaseFooterWrapper size={cardBaseSize}>
            <div className={venueCardFooterBorderVariants({ size })}>
              <div className={cn("flex items-center justify-between", TEXT_TOKENS.fontSize.xs)}>
                {/* Events Count */}
                {eventsCount > 0 && (
                  <div
                    className={cn(
                      "flex items-center",
                      DOMAIN_TOKENS.metadata.spacing.horizontal,
                      DOMAIN_TOKENS.metadata.text.primary,
                      TEXT_TOKENS.fontWeight.medium,
                    )}
                  >
                    <Icon
                      name="calendar"
                      size="sm"
                      color="default"
                      className={ICON_TOKENS.sizes.sm}
                      aria-hidden="true"
                    />
                    <Text size="xs" variant="primary" weight="medium">
                      {eventsCount} {eventsLabel}
                    </Text>
                  </div>
                )}

                {/* Capacity */}
                {capacity && (
                  <div
                    className={cn(
                      "flex items-center",
                      DOMAIN_TOKENS.metadata.spacing.horizontal,
                      DOMAIN_TOKENS.priceCapacity.text.secondary,
                    )}
                  >
                    {/* Using info icon as placeholder since users icon doesn't exist in registry */}
                    <Icon
                      name="info"
                      size="sm"
                      color="muted"
                      className={ICON_TOKENS.sizes.sm}
                      aria-hidden="true"
                    />
                    <Text size="xs" variant="muted">
                      {capacityLabel} {capacity}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </CardBaseFooterWrapper>
        )}
      </CardBase>
    </Box>
  );
};

VenueCard.displayName = "VenueCard";
