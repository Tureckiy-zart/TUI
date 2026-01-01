"use client";

import * as React from "react";

import { Box, LinkWithCustomVariant } from "@/COMPOSITION/layout";
import { resolveComponentAnimations } from "@/COMPOSITION/motion/animation/utils";
import { cn } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { GRADIENT_TOKENS } from "@/FOUNDATION/tokens/gradients";
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

import type { PromoCardProps, PromoCardSize, PromoCardVariant } from "./PromoCard.types";
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
      size = "md",
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
    // Map featured boolean to elevated variant for backward compatibility
    const cardVariant: PromoCardVariant = variant || (featured ? "elevated" : "default");

    // Use PromoCard sizes directly (now aligned with CardBase sizes: sm | md)
    const cardBaseSize: PromoCardSize = (size || "md") as PromoCardSize;

    // Use PromoCard variants directly (now aligned with CardBase variants: default | elevated)
    const cardBaseVariant: PromoCardVariant = cardVariant;

    return (
      <Box {...animationProps}>
        <CardBase
          ref={ref}
          size={cardBaseSize}
          variant={cardBaseVariant}
          className={cn("group relative", className)}
          {...props}
        >
          {/* Featured Badge */}
          {(featured || cardVariant === "elevated") && featuredBadgeText && (
            <div className={promoCardBadgeVariants({ size: cardBaseSize })}>
              <span className={promoCardBadgeSurfaceVariants({ variant: "elevated" })}>
                {featuredBadgeText}
              </span>
            </div>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={cardBaseSize}>
              <div
                className={cn("relative w-full overflow-hidden", GRADIENT_TOKENS.surface.elevated)}
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
              <Text size="sm" tone="muted">
                {description}
              </Text>
            )}
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={cardBaseSize}>
            <div className="w-full">
              {ctaUrl && (
                <LinkWithCustomVariant
                  href={ctaUrl}
                  customClassName={promoCardCtaButtonVariants({ size: cardBaseSize })}
                >
                  {ctaLabel}
                  <IconArrowRight
                    className={promoCardCtaButtonIconVariants({ size: cardBaseSize })}
                  />
                </LinkWithCustomVariant>
              )}
              {!ctaUrl && (
                <div className={cn("w-full", promoCardCtaButtonVariants({ size: cardBaseSize }))}>
                  {ctaLabel}
                  <IconArrowRight
                    className={promoCardCtaButtonIconVariants({ size: cardBaseSize })}
                  />
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
