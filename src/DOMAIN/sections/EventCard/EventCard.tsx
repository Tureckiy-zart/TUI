"use client";

import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { resolveComponentAnimations } from "@/COMPOSITION/motion/animation/utils";
import { cn } from "@/FOUNDATION/lib/utils";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { IconArrowRight, IconCalendar, IconLocation } from "@/icons";
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

import type { EventCardProps } from "./EventCard.types";
import {
  eventCardBadgeSurfaceVariants,
  eventCardBadgeVariants,
  eventCardFooterVariants,
  eventCardMetadataIconVariants,
  eventCardMetadataItemVariants,
  eventCardMetadataVariants,
  eventCardPriceVariants,
  eventCardTicketButtonIconVariants,
  eventCardTicketButtonVariants,
  eventCardVariants,
} from "./EventCard.variants";

/**
 * Helper component to apply custom variant classes to Link
 * Since Foundation Link doesn't accept className, we use a ref callback to apply custom classes
 */
const LinkWithCustomVariant = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & { customClassName: string }
>(({ customClassName, ...linkProps }, ref) => {
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  const mergedRef = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      anchorRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && "current" in ref) {
        (ref as { current: HTMLAnchorElement | null }).current = node;
      }
      if (node && customClassName) {
        // Merge custom classes with Link's internal classes
        const existingClasses = node.className.split(" ").filter(Boolean);
        const customClasses = customClassName.split(" ").filter(Boolean);
        node.className = [...new Set([...existingClasses, ...customClasses])].join(" ");
      }
    },
    [ref, customClassName],
  );

  return <Link {...linkProps} ref={mergedRef} />;
});
LinkWithCustomVariant.displayName = "LinkWithCustomVariant";

/**
 * EventCard Component
 *
 * Domain-specific card component for displaying event information.
 * Uses CardBase for layout and CARD_TOKENS + DOMAIN_TOKENS for all styling.
 * All visual values come from tokens - no hardcoded Tailwind visual classes.
 *
 * Architecture:
 * - Uses CVA variants for size and layout variants
 * - All spacing, colors, radius from tokens
 * - Semantic HTML elements (heading, time, address)
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <EventCard
 *   title="Concert"
 *   date="2024-01-01"
 *   venueName="Venue"
 *   getTicketsLabel="Get Tickets"
 * />
 * ```
 */
export const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      title,
      description,
      date,
      venueName,
      price,
      imageUrl,
      href,
      ticketUrl,
      featured = false,
      showImage = true,
      getTicketsLabel,
      featuredBadgeText,
      size = "default",
      layout = "vertical",
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
          className={cn(
            eventCardVariants({ size, layout, variant: cardVariant }),
            "group relative",
            className,
          )}
          {...props}
        >
          {/* Featured Badge */}
          {featured && featuredBadgeText && (
            <div className={eventCardBadgeVariants({ size })}>
              <span className={eventCardBadgeSurfaceVariants({ variant: "featured" })}>
                {featuredBadgeText}
              </span>
            </div>
          )}

          {/* Image Section */}
          {showImage && (
            <CardBaseImageWrapper size={size}>
              <div
                className={cn("relative w-full overflow-hidden", DOMAIN_TOKENS.surface.bg.default)}
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
                    "absolute inset-0 opacity-0 group-hover:opacity-100",
                    DOMAIN_TOKENS.motion.hover.transition,
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
              <Text size="sm" muted>
                {description}
              </Text>
            )}

            {/* Metadata Rows */}
            <div className={eventCardMetadataVariants({ size })}>
              {date && (
                <div className={eventCardMetadataItemVariants({ size })} role="text">
                  <IconCalendar
                    className={eventCardMetadataIconVariants({ size })}
                    aria-hidden={true}
                  />
                  <Text size="xs" muted>
                    <time dateTime={date}>{date}</time>
                  </Text>
                </div>
              )}
              {venueName && (
                <div className={eventCardMetadataItemVariants({ size })} role="text">
                  <IconLocation
                    className={eventCardMetadataIconVariants({ size })}
                    aria-hidden={true}
                  />
                  <Text size="xs" muted>
                    <address>{venueName}</address>
                  </Text>
                </div>
              )}
            </div>
          </CardBaseContentWrapper>

          {/* Footer Section */}
          <CardBaseFooterWrapper size={size}>
            <div className={cn("w-full", eventCardFooterVariants({ size }))}>
              {ticketUrl && (
                <LinkWithCustomVariant
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  customClassName={eventCardTicketButtonVariants({ size })}
                >
                  {getTicketsLabel}
                  <IconArrowRight
                    className={eventCardTicketButtonIconVariants({ size })}
                    aria-hidden={true}
                  />
                </LinkWithCustomVariant>
              )}
              {!ticketUrl && price && (
                <div className="text-right">
                  <Text size={size === "compact" ? "md" : "lg"} weight="bold">
                    <span className={eventCardPriceVariants({ size })}>{price}</span>
                  </Text>
                </div>
              )}
            </div>
          </CardBaseFooterWrapper>
        </CardBase>
      </Box>
    );
  },
);

EventCard.displayName = "EventCard";
