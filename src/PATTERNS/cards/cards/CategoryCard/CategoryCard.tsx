"use client";

import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { resolveComponentAnimations } from "@/COMPOSITION/motion/animation/utils";
import { cn } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseImageWrapper,
} from "@/PATTERNS/cards/cards/CardBase";
import { Heading } from "@/PRIMITIVES/Heading";
import { Icon } from "@/PRIMITIVES/Icon";
import { Link } from "@/PRIMITIVES/Link";
import { Text } from "@/PRIMITIVES/Text";

import type { CategoryCardProps, CategoryCardVariant } from "./CategoryCard.types";
import {
  categoryCardBadgeSurfaceVariants,
  categoryCardBadgeVariants,
} from "./CategoryCard.variants";

/**
 * CategoryCard Component
 *
 * Domain-specific card component for displaying category information.
 * Uses CardBase for layout and DOMAIN_TOKENS for all styling.
 *
 * @example
 * ```tsx
 * <CategoryCard
 *   title="Jazz"
 *   description="Explore jazz events"
 *   href="/categories/jazz"
 * />
 * ```
 */
export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      title,
      description,
      imageUrl,
      href,
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
    const cardVariant: CategoryCardVariant = variant || (featured ? "elevated" : "default");

    // Map CategoryCardSize to CardBaseSize: "sm" -> "sm", "md" -> "md" (direct mapping)
    const cardBaseSize: "sm" | "md" = size || "md";

    // Map CategoryCardVariant to CardBaseVariant: "default" -> "default", "elevated" -> "elevated" (direct mapping)
    const cardBaseVariant: "default" | "elevated" = cardVariant;

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
          {featured && featuredBadgeText && (
            <div className={categoryCardBadgeVariants({ size })}>
              <span className={categoryCardBadgeSurfaceVariants({ variant: "elevated" })}>
                {featuredBadgeText}
              </span>
            </div>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={cardBaseSize}>
              <div
                className={cn(
                  "relative h-full w-full overflow-hidden",
                  DOMAIN_TOKENS.image.placeholder.gradient,
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
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon
                      name="info"
                      className={cn(ICON_TOKENS.sizes["4xl"], ICON_TOKENS.colors.muted)}
                      aria-hidden="true"
                    />
                  </div>
                )}
                {/* Image Overlay on Hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100",
                    MOTION_TOKENS.transition.opacity,
                    MOTION_TOKENS.duration.normal,
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
        </CardBase>
      </Box>
    );
  },
);

CategoryCard.displayName = "CategoryCard";
