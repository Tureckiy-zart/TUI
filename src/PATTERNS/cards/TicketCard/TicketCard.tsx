"use client";

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { IconArrowRight } from "@/icons";
import {
  Box,
  formatDate,
  Heading,
  Icon,
  Link,
  LinkWithCustomVariant,
  resolveComponentAnimations,
  Text,
} from "@/index";
import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "@/PATTERNS/cards/CardBase";

import type { TicketCardProps } from "./TicketCard.types";
import {
  ticketCardAvailabilityVariants,
  ticketCardBadgeSurfaceVariants,
  ticketCardBadgeVariants,
  ticketCardDateVariants,
  ticketCardFooterVariants,
  ticketCardImageOverlayVariants,
  ticketCardImageTransformVariants,
  ticketCardPriceCapacityContainerVariants,
  ticketCardPurchaseButtonIconVariants,
  ticketCardPurchaseButtonVariants,
  ticketCardVariants,
} from "./TicketCard.variants";

/**
 * TicketCard Component
 *
 * Domain-specific card component for displaying ticket information for Event/Artist/Venue context.
 * Uses CardBase for layout and DOMAIN_TOKENS for all styling.
 * Supports date display, price, capacity, availability status, and badges.
 *
 * @example
 * ```tsx
 * <TicketCard
 *   title="VIP Ticket"
 *   date={new Date("2024-12-25")}
 *   price="€50"
 *   capacity="10 tickets left"
 *   purchaseLabel="Buy Now"
 * />
 * ```
 */
export const TicketCard = React.forwardRef<HTMLDivElement, TicketCardProps>(
  (
    {
      title,
      date,
      description,
      price,
      capacity,
      availability = "available",
      soldOutLabel = "Sold Out",
      availableSoonLabel = "Available Soon",
      imageUrl,
      href,
      purchaseUrl,
      purchaseLabel,
      vipBadgeText,
      discountBadgeText,
      featured = false,
      featuredBadgeText,
      showImage = true,
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

    // Map TicketCardSize to CardBaseSize: "default" -> "md", "compact" -> "sm"
    const cardBaseSize: "sm" | "md" = size === "compact" ? "sm" : "md";

    // Map TicketCardVariant to CardBaseVariant: "default" -> "default", "featured" -> "elevated"
    const cardBaseVariant: "default" | "elevated" =
      cardVariant === "featured" ? "elevated" : "default";

    // Determine if purchase button should be disabled
    const isPurchaseDisabled = availability === "sold_out" || availability === "available_soon";

    // Helper function to get VIP badge positioning
    const getVipBadgePosition = () => {
      if (!featured || !featuredBadgeText) return "";
      return size === "compact"
        ? `${DOMAIN_TOKENS.badges.position.compact} ${DOMAIN_TOKENS.badges.positionY.xl}`
        : `${DOMAIN_TOKENS.badges.position.default} ${DOMAIN_TOKENS.badges.positionY["2xl"]}`;
    };

    // Helper function to get discount badge positioning
    const getDiscountBadgePosition = () => {
      if (!(featured && featuredBadgeText) && !vipBadgeText) return "";
      return size === "compact"
        ? `${DOMAIN_TOKENS.badges.position.compact} ${DOMAIN_TOKENS.badges.positionY["2xl"]}`
        : `${DOMAIN_TOKENS.badges.position.default} ${DOMAIN_TOKENS.badges.positionY["3xl"]}`;
    };

    // Get availability label
    const getAvailabilityLabel = () => {
      switch (availability) {
        case "sold_out":
          return soldOutLabel;
        case "available_soon":
          return availableSoonLabel;
        case "available":
        default:
          return null;
      }
    };

    const availabilityLabel = getAvailabilityLabel();

    // Format date for display and ISO string for datetime attribute
    const formattedDate = date ? formatDate(date) : null;
    const dateTimeValue = (() => {
      if (!date) return null;
      if (typeof date === "string") {
        return new Date(date).toISOString();
      }
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    })();

    return (
      <Box {...animationProps}>
        <CardBase
          ref={ref}
          size={cardBaseSize}
          variant={cardBaseVariant}
          className={cn(ticketCardVariants({ size, variant: cardVariant }), className)}
          {...props}
        >
          {/* Featured Badge */}
          {featured && featuredBadgeText && (
            <Box
              className={ticketCardBadgeVariants({ size })}
              aria-label={`Featured ticket: ${featuredBadgeText}`}
            >
              <Box className={ticketCardBadgeSurfaceVariants({ variant: "featured" })}>
                {featuredBadgeText}
              </Box>
            </Box>
          )}

          {/* VIP Badge */}
          {vipBadgeText && (
            <Box
              className={cn(ticketCardBadgeVariants({ size }), getVipBadgePosition())}
              aria-label={`VIP ticket: ${vipBadgeText}`}
            >
              <Box className={ticketCardBadgeSurfaceVariants({ variant: "vip" })}>
                {vipBadgeText}
              </Box>
            </Box>
          )}

          {/* Discount Badge */}
          {discountBadgeText && (
            <Box
              className={cn(ticketCardBadgeVariants({ size }), getDiscountBadgePosition())}
              aria-label={`Discount: ${discountBadgeText}`}
            >
              <Box className={ticketCardBadgeSurfaceVariants({ variant: "discount" })}>
                {discountBadgeText}
              </Box>
            </Box>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={cardBaseSize}>
              <Box
                className={cn(
                  "relative h-full w-full overflow-hidden",
                  DOMAIN_TOKENS.image.placeholder.gradient,
                )}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title}
                    className={cn("h-full w-full", ticketCardImageTransformVariants({ size }))}
                  />
                ) : (
                  <Box className="flex h-full w-full items-center justify-center">
                    <Box className={ICON_TOKENS.sizes["4xl"]}>
                      <Icon name="info" size="xl" color="muted" aria-hidden={true} />
                    </Box>
                  </Box>
                )}
                {/* Image Overlay on Hover */}
                <Box className={ticketCardImageOverlayVariants({ size })} aria-hidden={true} />
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

            {/* Date - Semantic time element */}
            {formattedDate && dateTimeValue && (
              <time dateTime={dateTimeValue} className={ticketCardDateVariants({ size })}>
                {formattedDate}
              </time>
            )}

            {/* Description */}
            {description && (
              <Text size="sm" typographyRole="meta" color="muted">
                {description}
              </Text>
            )}

            {/* Price + Capacity Layout */}
            {(price || capacity) && (
              <Box className={ticketCardPriceCapacityContainerVariants({ size })}>
                {price && (
                  <Text size={size === "compact" ? "md" : "lg"} weight="bold">
                    {price}
                  </Text>
                )}
                {capacity && (
                  <Text size={size === "compact" ? "xs" : "sm"} typographyRole="meta" color="muted">
                    {capacity}
                  </Text>
                )}
              </Box>
            )}

            {/* Availability Indicator */}
            {availabilityLabel && (
              <Box className={ticketCardAvailabilityVariants({ availability })}>
                <Text
                  size="xs"
                  typographyRole="meta"
                  color={availability === "sold_out" ? "muted" : "primary"}
                >
                  {availabilityLabel}
                </Text>
              </Box>
            )}
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={cardBaseSize}>
            <Box className={cn("w-full", ticketCardFooterVariants({ size }))}>
              {purchaseUrl && !isPurchaseDisabled && (
                <LinkWithCustomVariant
                  href={purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  customClassName={ticketCardPurchaseButtonVariants({ size, disabled: false })}
                >
                  {purchaseLabel}
                  <IconArrowRight
                    className={ticketCardPurchaseButtonIconVariants({ size })}
                    aria-hidden={true}
                  />
                </LinkWithCustomVariant>
              )}
              {(!purchaseUrl || isPurchaseDisabled) && (
                <Box
                  role="button"
                  aria-label={purchaseLabel}
                  aria-disabled={isPurchaseDisabled}
                  tabIndex={isPurchaseDisabled ? -1 : 0}
                  className={cn(
                    "w-full",
                    ticketCardPurchaseButtonVariants({ size, disabled: isPurchaseDisabled }),
                  )}
                >
                  {purchaseLabel}
                  <IconArrowRight
                    className={ticketCardPurchaseButtonIconVariants({ size })}
                    aria-hidden={true}
                  />
                </Box>
              )}
            </Box>
          </CardBaseFooterWrapper>
        </CardBase>
      </Box>
    );
  },
);

TicketCard.displayName = "TicketCard";
