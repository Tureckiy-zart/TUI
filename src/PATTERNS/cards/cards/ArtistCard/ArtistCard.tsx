"use client";

import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { resolveComponentAnimations } from "@/COMPOSITION/motion/animation/utils";
import { cn } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens";
import { ARTIST_TOKENS } from "@/FOUNDATION/tokens/components/artist";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
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

import type { ArtistCardProps } from "./ArtistCard.types";
import {
  artistCardBadgeSurfaceVariants,
  artistCardBadgeVariants,
  artistCardFooterBorderVariants,
  artistCardImageOverlayVariants,
  artistCardImageTransformVariants,
  artistCardMetadataIconVariants,
  artistCardMetadataItemVariants,
  artistCardMetadataVariants,
  artistCardVariants,
} from "./ArtistCard.variants";

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
 * ArtistCard Component
 *
 * Domain-specific card component for displaying artist information.
 * Uses CardBase for layout and DOMAIN_TOKENS for all styling.
 * Supports size variants (sm, md) and style variants (default, elevated).
 * Canonical vocabulary aligned with VARIANTS_SIZE_CANON.md
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
      size = "md",
      variant,
      className,
      animation,
      ...props
    },
    ref,
  ) => {
    validateRequiredString(name, "name", "ArtistCard");
    validateRequiredString(followersLabel, "followersLabel", "ArtistCard");
    validateRequiredString(playsLabel, "playsLabel", "ArtistCard");

    // Resolve animation props with defaults
    const animationProps = resolveComponentAnimations({
      animation: animation?.animation || "fadeInUp",
      hoverAnimation: animation?.hoverAnimation || "hoverLift",
      animationProps: animation?.animationProps,
    });

    // Determine variant: use explicit variant prop or derive from featured
    // Use canonical values directly (no mapping needed)
    const cardBaseVariant: "default" | "elevated" = variant || (featured ? "elevated" : "default");

    // Use canonical size directly (no mapping needed)
    const cardBaseSize: "sm" | "md" = size || "md";

    return (
      <Box {...animationProps}>
        <CardBase
          ref={ref}
          size={cardBaseSize}
          variant={cardBaseVariant}
          className={cn(artistCardVariants({ size, variant: cardBaseVariant }), className)}
          {...props}
        >
          {/* Featured Badge */}
          {featured && popularBadgeText && (
            <div className={artistCardBadgeVariants({ size })}>
              <span
                className={artistCardBadgeSurfaceVariants({ size, variant: "elevated" })}
                aria-label={`Featured artist: ${popularBadgeText}`}
              >
                {popularBadgeText}
              </span>
            </div>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={cardBaseSize}>
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
          <CardBaseContentWrapper size={cardBaseSize}>
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
              <Text size="sm" tone="muted">
                {description}
              </Text>
            )}

            {/* Genres */}
            {genres && (
              <Text size="xs" tone="muted">
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
                    <Text size="xs" tone="muted">
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
                    <Text size="xs" tone="muted">
                      {plays.toLocaleString()} {playsLabel}
                    </Text>
                  </div>
                )}
              </div>
            )}
          </CardBaseContentWrapper>

          {/* Footer Section - Currently empty but structure in place for future extensions */}
          {(followers !== undefined || plays !== undefined) && (
            <CardBaseFooterWrapper size={cardBaseSize}>
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
