"use client";

import React from "react";

import {
  Box,
  cn,
  DOMAIN_TOKENS,
  Heading,
  Icon,
  ICON_TOKENS,
  Link,
  resolveComponentAnimations,
  Text,
  TEXT_TOKENS,
} from "@/index";
import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "@/PATTERNS/cards/cards/CardBase";

import type { VenueCardProps, VenueCardSize, VenueCardVariant } from "./VenueCard.types";
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
 * Validates that a required string prop is non-empty.
 * Throws an error with component name prefix if validation fails.
 */
function validateRequiredString(
  value: string | undefined,
  propName: string,
  componentName: string,
): void {
  if (!value || value.trim() === "") {
    throw new Error(`${componentName}: "${propName}" prop is required and cannot be empty`);
  }
}

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
export const VenueCard = React.forwardRef<HTMLDivElement, VenueCardProps>(
  (
    {
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
      size = "md",
      variant = "default",
      className,
      animation,
      ...props
    },
    ref,
  ) => {
    validateRequiredString(name, "name", "VenueCard");
    validateRequiredString(eventsLabel, "eventsLabel", "VenueCard");
    validateRequiredString(capacityLabel, "capacityLabel", "VenueCard");

    // Resolve animation props with defaults
    const animationProps = resolveComponentAnimations({
      animation: animation?.animation || "fadeInUp",
      hoverAnimation: animation?.hoverAnimation || "hoverLift",
      animationProps: animation?.animationProps,
    });

    // Determine variant: use explicit variant prop or derive from featured
    // Map featured boolean to elevated variant for backward compatibility
    const cardVariant: VenueCardVariant = variant || (featured ? "elevated" : "default");

    // Use VenueCard sizes directly (now aligned with CardBase sizes: sm | md)
    const cardBaseSize: VenueCardSize = (size || "md") as VenueCardSize;

    // Use VenueCard variants directly (now aligned with CardBase variants: default | elevated)
    const cardBaseVariant: VenueCardVariant = cardVariant;

    return (
      <Box ref={ref} {...animationProps} className={className} {...props}>
        <CardBase
          size={cardBaseSize}
          variant={cardBaseVariant}
          className={venueCardVariants({ size: cardBaseSize, variant: cardVariant })}
        >
          {/* Featured Badge */}
          {(featured || cardVariant === "elevated") && popularBadgeText && (
            <Box
              className={cn(
                "absolute z-10",
                cardBaseSize === "sm"
                  ? DOMAIN_TOKENS.badges.position.compact
                  : DOMAIN_TOKENS.badges.position.default,
              )}
            >
              <Box
                className={venueCardBadgeVariants({ size: cardBaseSize, variant: "elevated" })}
                aria-label={`Featured venue: ${popularBadgeText}`}
              >
                {popularBadgeText}
              </Box>
            </Box>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={cardBaseSize}>
              <Box
                className={cn(
                  "h-full w-full",
                  venueCardImagePlaceholderVariants({ size: cardBaseSize }),
                )}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name}
                    className={cn(
                      "h-full w-full",
                      venueCardImageTransformVariants({ size: cardBaseSize }),
                    )}
                  />
                ) : (
                  <Box className="flex h-full w-full items-center justify-center">
                    {/* Placeholder icon - using info as fallback since building icon doesn't exist */}
                    <Box className={ICON_TOKENS.sizes["4xl"]}>
                      <Icon name="info" size="xl" color="muted" aria-hidden="true" />
                    </Box>
                  </Box>
                )}
                {/* Image Overlay on Hover */}
                <Box
                  className={venueCardImageOverlayVariants({ size: cardBaseSize })}
                  aria-hidden="true"
                />
              </Box>
            </CardBaseImageWrapper>
          )}

          {/* Content Section */}
          <CardBaseContentWrapper size={cardBaseSize} spacing={cardBaseSize === "sm" ? "sm" : "md"}>
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
              <Text size="sm" typographyRole="meta" color="muted">
                {description}
              </Text>
            )}

            {/* Location Metadata */}
            {location && (
              <Box className={cn("flex flex-col", DOMAIN_TOKENS.metadata.spacing.vertical)}>
                <Box className={venueCardMetadataRowVariants({ size: cardBaseSize })}>
                  <Icon name="location" size="sm" color="muted" aria-hidden="true" />
                  <Text size="xs" typographyRole="meta" color="muted">
                    {location}
                  </Text>
                </Box>
              </Box>
            )}
          </CardBaseContentWrapper>

          {/* Footer Section */}
          {(eventsCount > 0 || capacity) && (
            <CardBaseFooterWrapper size={cardBaseSize}>
              <Box className={venueCardFooterBorderVariants({ size: cardBaseSize })}>
                <Box className={cn("flex items-center justify-between", TEXT_TOKENS.fontSize.xs)}>
                  {/* Events Count */}
                  {eventsCount > 0 && (
                    <Box
                      className={cn(
                        "flex items-center",
                        DOMAIN_TOKENS.metadata.spacing.horizontal,
                        DOMAIN_TOKENS.metadata.text.primary,
                        TEXT_TOKENS.fontWeight.medium,
                      )}
                    >
                      <Icon name="calendar" size="sm" color="default" aria-hidden="true" />
                      <Text size="xs" weight="medium">
                        {eventsCount} {eventsLabel}
                      </Text>
                    </Box>
                  )}

                  {/* Capacity */}
                  {capacity && (
                    <Box
                      className={cn(
                        "flex items-center",
                        DOMAIN_TOKENS.metadata.spacing.horizontal,
                        DOMAIN_TOKENS.priceCapacity.text.secondary,
                      )}
                    >
                      {/* Using info icon as placeholder since users icon doesn't exist in registry */}
                      <Icon name="info" size="sm" color="muted" aria-hidden="true" />
                      <Text size="xs" typographyRole="meta" color="muted">
                        {capacityLabel} {capacity}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardBaseFooterWrapper>
          )}
        </CardBase>
      </Box>
    );
  },
);

VenueCard.displayName = "VenueCard";
