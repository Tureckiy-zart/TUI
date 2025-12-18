"use client";

import React from "react";

import { Box } from "@/COMPOSITION/layout";
import { resolveComponentAnimations } from "@/COMPOSITION/motion/animation/utils";
import { cn } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";
import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "@/PATTERNS/cards/cards/CardBase";
import { Heading } from "@/PRIMITIVES/Heading";
import { Icon } from "@/PRIMITIVES/Icon";
import { Link } from "@/PRIMITIVES/Link";
import { Text } from "@/PRIMITIVES/Text";

import type { VenueCardProps } from "./VenueCard.types";
import {
  venueCardBadgeVariants,
  venueCardFooterBorderVariants,
  venueCardImageOverlayVariants,
  venueCardImagePlaceholderVariants,
  venueCardImageTransformVariants,
  venueCardMetadataRowVariants,
  venueCardVariants,
} from "./VenueCard.variants";

/**
 * VenueCard Component
 *
 * Token-driven venue card component using CardBase layout foundation.
 * All visual styling uses DOMAIN_TOKENS, TEXT_TOKENS, and ICON_TOKENS.
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
            <div className={cn("w-full", venueCardImagePlaceholderVariants({ size }))}>
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
          <Heading level={3}>
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
            <Text size="sm" variant="muted">
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
                <Text size="xs" variant="muted">
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
