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
import { cn } from "@/lib/utils";
import { DOMAIN_TOKENS } from "@/tokens";
import { ARTIST_TOKENS } from "@/tokens/components/artist";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TEXT_TOKENS } from "@/tokens/components/text";

import type { ArtistCardProps } from "./ArtistCard.types";
import {
  artistCardBadgeSurfaceVariants,
  artistCardBadgeVariants,
  artistCardFooterBorderVariants,
  artistCardGenresVariants,
  artistCardImageOverlayVariants,
  artistCardImageTransformVariants,
  artistCardMetadataIconVariants,
  artistCardMetadataItemVariants,
  artistCardMetadataVariants,
  artistCardVariants,
} from "./ArtistCard.variants";

/**
 * ArtistCard Component
 *
 * Domain-specific card component for displaying artist information.
 * Uses CardBase for layout and DOMAIN_TOKENS for all styling.
 * Supports size variants (default, compact) and style variants (default, featured).
 *
 * @example
 * ```tsx
 * <ArtistCard
 *   name="Artist Name"
 *   genres="Jazz, Blues"
 *   followers={1200}
 *   plays={50000}
 *   followersLabel="followers"
 *   playsLabel="plays"
 * />
 * ```
 */
export const ArtistCard = React.forwardRef<HTMLDivElement, ArtistCardProps>(
  (
    {
      name,
      description,
      genres,
      followers,
      plays,
      imageUrl,
      href,
      featured = false,
      showImage = true,
      popularBadgeText,
      followersLabel,
      playsLabel,
      size = "default",
      variant,
      className,
      animation,
      ...props
    },
    ref,
  ) => {
    if (!name || name.trim() === "") {
      throw new Error('ArtistCard: "name" prop is required and cannot be empty');
    }
    if (!followersLabel || followersLabel.trim() === "") {
      throw new Error('ArtistCard: "followersLabel" prop is required and cannot be empty');
    }
    if (!playsLabel || playsLabel.trim() === "") {
      throw new Error('ArtistCard: "playsLabel" prop is required and cannot be empty');
    }

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
          className={cn(artistCardVariants({ size, variant }), className)}
          {...props}
        >
          {/* Featured Badge */}
          {featured && popularBadgeText && (
            <div className={artistCardBadgeVariants({ size })}>
              <span className={artistCardBadgeSurfaceVariants({ size, variant: "featured" })}>
                {popularBadgeText}
              </span>
            </div>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={size}>
              <div
                className={cn(
                  ARTIST_TOKENS.image.container.layout,
                  DOMAIN_TOKENS.image.placeholder.gradient,
                )}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name}
                    className={cn(
                      ARTIST_TOKENS.image.sizing.full,
                      artistCardImageTransformVariants({ size }),
                    )}
                  />
                ) : (
                  <div className={ARTIST_TOKENS.image.placeholder.container}>
                    {/* Placeholder icon - using info as fallback since music/artist icon doesn't exist in registry */}
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
                <div className={artistCardImageOverlayVariants({ size })} />
              </div>
            </CardBaseImageWrapper>
          )}

          {/* Content Section */}
          <CardBaseContentWrapper size={size}>
            {/* Title */}
            <Heading
              level={3}
              className={cn(
                DOMAIN_TOKENS.text.lineClamp.two,
                TEXT_TOKENS.fontSize.lg,
                TEXT_TOKENS.fontWeight.bold,
                MOTION_TOKENS.transition.colors,
                DOMAIN_TOKENS.text.hover.primary,
                size === "compact"
                  ? DOMAIN_TOKENS.spacing.section.titleToSubtitle
                  : DOMAIN_TOKENS.spacing.section.subtitleToMetadata,
              )}
            >
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
              <Text
                size="sm"
                variant="muted"
                className={cn(
                  DOMAIN_TOKENS.text.lineClamp.two,
                  size === "compact"
                    ? DOMAIN_TOKENS.spacing.section.titleToSubtitle
                    : DOMAIN_TOKENS.spacing.section.subtitleToMetadata,
                )}
              >
                {description}
              </Text>
            )}

            {/* Genres */}
            {genres && (
              <Text
                size="xs"
                variant="muted"
                className={cn(
                  artistCardGenresVariants({ size }),
                  size === "compact"
                    ? DOMAIN_TOKENS.spacing.section.titleToSubtitle
                    : DOMAIN_TOKENS.spacing.section.subtitleToMetadata,
                )}
              >
                {genres}
              </Text>
            )}

            {/* Metadata Rows (Followers, Plays) */}
            {(followers !== undefined || plays !== undefined) && (
              <div className={artistCardMetadataVariants({ size })}>
                {followers !== undefined && (
                  <div className={artistCardMetadataItemVariants({ size })}>
                    <Icon
                      name="info"
                      size="sm"
                      color="muted"
                      className={artistCardMetadataIconVariants({ size })}
                      aria-hidden="true"
                    />
                    <Text size="xs" variant="muted">
                      {followers.toLocaleString()} {followersLabel}
                    </Text>
                  </div>
                )}
                {plays !== undefined && (
                  <div className={artistCardMetadataItemVariants({ size })}>
                    <Icon
                      name="info"
                      size="sm"
                      color="muted"
                      className={artistCardMetadataIconVariants({ size })}
                      aria-hidden="true"
                    />
                    <Text size="xs" variant="muted">
                      {plays.toLocaleString()} {playsLabel}
                    </Text>
                  </div>
                )}
              </div>
            )}
          </CardBaseContentWrapper>

          {/* Footer Section - Currently empty but structure in place for future extensions */}
          {(followers !== undefined || plays !== undefined) && (
            <CardBaseFooterWrapper size={size}>
              <div className={artistCardFooterBorderVariants({ size })}>
                {/* Footer content can be added here if needed in the future */}
              </div>
            </CardBaseFooterWrapper>
          )}
        </CardBase>
      </Box>
    );
  },
);

ArtistCard.displayName = "ArtistCard";
