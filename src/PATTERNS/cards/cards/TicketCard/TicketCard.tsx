"use client";

import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { resolveComponentAnimations } from "@/COMPOSITION/motion/animation/utils";
import { cn, formatDate } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { IconArrowRight } from "@/icons";
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

import type { TicketCardProps } from "./TicketCard.types";
import {
  ticketCardAvailabilityVariants,
  ticketCardBadgeSurfaceVariants,
  ticketCardBadgeVariants,
  ticketCardCapacityVariants,
  ticketCardDateVariants,
  ticketCardDescriptionVariants,
  ticketCardFooterVariants,
  ticketCardImageOverlayVariants,
  ticketCardImageTransformVariants,
  ticketCardPriceCapacityContainerVariants,
  ticketCardPriceVariants,
  ticketCardPurchaseButtonIconVariants,
  ticketCardPurchaseButtonVariants,
  ticketCardTitleVariants,
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
          return "Sold Out";
        case "available_soon":
          return "Available Soon";
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
          size={size}
          variant={cardVariant}
          className={cn(ticketCardVariants({ size, variant: cardVariant }), className)}
          {...props}
        >
          {/* Featured Badge */}
          {featured && featuredBadgeText && (
            <div className={ticketCardBadgeVariants({ size })}>
              <span className={ticketCardBadgeSurfaceVariants({ variant: "featured" })}>
                {featuredBadgeText}
              </span>
            </div>
          )}

          {/* VIP Badge */}
          {vipBadgeText && (
            <div className={cn(ticketCardBadgeVariants({ size }), getVipBadgePosition())}>
              <span className={ticketCardBadgeSurfaceVariants({ variant: "vip" })}>
                {vipBadgeText}
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {discountBadgeText && (
            <div className={cn(ticketCardBadgeVariants({ size }), getDiscountBadgePosition())}>
              <span className={ticketCardBadgeSurfaceVariants({ variant: "discount" })}>
                {discountBadgeText}
              </span>
            </div>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={size}>
              <div
                className={cn(
                  "relative w-full overflow-hidden",
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
                <div className={ticketCardImageOverlayVariants({ size })} />
              </div>
            </CardBaseImageWrapper>
          )}

          {/* Content Section */}
          <CardBaseContentWrapper size={size}>
            {/* Title */}
            <Heading level={3} className={ticketCardTitleVariants({ size })}>
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
              <Text size="sm" variant="muted" className={ticketCardDescriptionVariants({ size })}>
                {description}
              </Text>
            )}

            {/* Price + Capacity Layout */}
            {(price || capacity) && (
              <div className={ticketCardPriceCapacityContainerVariants({ size })}>
                {price && (
                  <Text
                    size={size === "compact" ? "md" : "lg"}
                    weight="bold"
                    className={ticketCardPriceVariants({ size })}
                  >
                    {price}
                  </Text>
                )}
                {capacity && (
                  <Text
                    size={size === "compact" ? "xs" : "sm"}
                    variant="muted"
                    className={ticketCardCapacityVariants({ size })}
                  >
                    {capacity}
                  </Text>
                )}
              </div>
            )}

            {/* Availability Indicator */}
            {availabilityLabel && (
              <div className={ticketCardAvailabilityVariants({ availability })}>
                <Text size="xs" variant={availability === "sold_out" ? "muted" : "primary"}>
                  {availabilityLabel}
                </Text>
              </div>
            )}
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={size}>
            <div className={cn("w-full", ticketCardFooterVariants({ size }))}>
              {purchaseUrl && !isPurchaseDisabled && (
                <Link
                  href={purchaseUrl}
                  className={cn(
                    "w-full",
                    ticketCardPurchaseButtonVariants({ size, disabled: false }),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {purchaseLabel}
                  <IconArrowRight className={ticketCardPurchaseButtonIconVariants({ size })} />
                </Link>
              )}
              {(!purchaseUrl || isPurchaseDisabled) && (
                <div
                  className={cn(
                    "w-full",
                    ticketCardPurchaseButtonVariants({ size, disabled: isPurchaseDisabled }),
                  )}
                >
                  {purchaseLabel}
                  <IconArrowRight className={ticketCardPurchaseButtonIconVariants({ size })} />
                </div>
              )}
            </div>
          </CardBaseFooterWrapper>
        </CardBase>
      </Box>
    );
  },
);

TicketCard.displayName = "TicketCard";
