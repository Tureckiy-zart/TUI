"use client";

import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { resolveComponentAnimations } from "@/COMPOSITION/motion/animation/utils";
import { cn } from "@/FOUNDATION/lib/utils";
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
 * CTA button uses DOMAIN_TOKENS.cta.button tokens for styling.
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
              <Text size="sm" variant="muted">
                {description}
              </Text>
            )}
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={size}>
            <div className="w-full">
              {ctaUrl && (
                <Link href={ctaUrl}>
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
