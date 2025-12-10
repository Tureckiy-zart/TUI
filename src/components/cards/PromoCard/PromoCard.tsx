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

import type { PromoCardProps } from "./PromoCard.types";
import {
  promoCardBadgeSurfaceVariants,
  promoCardBadgeVariants,
  promoCardCtaButtonIconVariants,
  promoCardCtaButtonVariants,
} from "./PromoCard.variants";

/**
 * PromoCard Component
 *
 * Domain-specific card component for displaying promotional content.
 * Uses CardBase for layout and DOMAIN_TOKENS for all styling.
 * CTA button uses BUTTON_TOKENS for styling.
 *
 * @example
 * ```tsx
 * <PromoCard
 *   title="Special Offer"
 *   description="Get 20% off on all tickets"
 *   ctaLabel="Learn More"
 *   ctaUrl="/promo"
 * />
 * ```
 */
export const PromoCard = React.forwardRef<HTMLDivElement, PromoCardProps>(
  (
    {
      title,
      description,
      imageUrl,
      href,
      ctaUrl,
      ctaLabel,
      featured = false,
      showImage = true,
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
            <div className={promoCardBadgeVariants({ size })}>
              <span className={promoCardBadgeSurfaceVariants({ variant: "featured" })}>
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
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={size}>
            <div className="w-full">
              {ctaUrl && (
                <Link href={ctaUrl} className={cn("w-full", promoCardCtaButtonVariants({ size }))}>
                  {ctaLabel}
                  <IconArrowRight className={promoCardCtaButtonIconVariants({ size })} />
                </Link>
              )}
              {!ctaUrl && (
                <div className={cn("w-full", promoCardCtaButtonVariants({ size }))}>
                  {ctaLabel}
                  <IconArrowRight className={promoCardCtaButtonIconVariants({ size })} />
                </div>
              )}
            </div>
          </CardBaseFooterWrapper>
        </CardBase>
      </Box>
    );
  },
);

PromoCard.displayName = "PromoCard";
