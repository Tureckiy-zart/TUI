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
import { IconArrowRight } from "@/icons";
import { cn } from "@/lib/utils";
import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { TEXT_TOKENS } from "@/tokens/components/text";

import type { TicketCardProps } from "./TicketCard.types";
import {
  ticketCardAvailabilityVariants,
  ticketCardBadgeSurfaceVariants,
  ticketCardBadgeVariants,
  ticketCardCapacityVariants,
  ticketCardFooterVariants,
  ticketCardPriceCapacityContainerVariants,
  ticketCardPriceVariants,
  ticketCardPurchaseButtonIconVariants,
  ticketCardPurchaseButtonVariants,
} from "./TicketCard.variants";

/**
 * TicketCard Component
 *
 * Domain-specific card component for displaying ticket information.
 * Uses CardBase for layout and DOMAIN_TOKENS for all styling.
 *
 * @example
 * ```tsx
 * <TicketCard
 *   title="VIP Ticket"
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

            {/* Price + Capacity Layout */}
            {(price || capacity) && (
              <div className={ticketCardPriceCapacityContainerVariants({ size })}>
                {price && (
                  <Text size={size === "compact" ? "md" : "lg"} weight="bold">
                    <span className={ticketCardPriceVariants({ size })}>{price}</span>
                  </Text>
                )}
                {capacity && (
                  <Text size={size === "compact" ? "xs" : "sm"}>
                    <span className={ticketCardCapacityVariants({ size })}>{capacity}</span>
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
