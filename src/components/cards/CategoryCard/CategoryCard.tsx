"use client";

import * as React from "react";

import { resolveComponentAnimations } from "@/animation/utils";
import {
  CardBase,
  CardBaseContentWrapper,
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
import { TEXT_TOKENS } from "@/tokens/components/text";

import type { CategoryCardProps } from "./CategoryCard.types";
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
            <div className={categoryCardBadgeVariants({ size })}>
              <span className={categoryCardBadgeSurfaceVariants({ variant: "featured" })}>
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
        </CardBase>
      </Box>
    );
  },
);

CategoryCard.displayName = "CategoryCard";
