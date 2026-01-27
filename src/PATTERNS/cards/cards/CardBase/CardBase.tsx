"use client";

/**
 * CardBase Component
 *
 * Reusable card layout component with CVA architecture.
 * Provides pure layout wrappers (ImageWrapper, ContentWrapper, FooterWrapper)
 * with no domain logic. All styling uses token-based values.
 *
 * Architecture:
 * <CardBase>
 *   <ImageWrapper />
 *   <ContentWrapper />
 *   <FooterWrapper />
 * </CardBase>
 */

import * as React from "react";

import { cn, Stack } from "@/index";

import type {
  CardBaseContentWrapperProps,
  CardBaseFooterWrapperProps,
  CardBaseImageWrapperProps,
  CardBaseProps,
} from "./CardBase.types";
import {
  cardBaseContentVariants,
  cardBaseFooterVariants,
  cardBaseImageVariants,
  cardBaseVariants,
} from "./CardBase.variants";

/**
 * CardBase Root Component
 *
 * Main container for card layout. Uses CVA variants for size and style.
 * All styling comes from DOMAIN_TOKENS, MOTION_TOKENS.
 */
const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(
  ({ size = "md", variant = "default", className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardBaseVariants({ size, variant }), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardBase.displayName = "CardBase";

/**
 * CardBase ImageWrapper Component
 *
 * Layout wrapper for card images. Uses DOMAIN_TOKENS.image for styling.
 * Provides aspect ratio, border radius, and overflow handling.
 */
const CardBaseImageWrapper = React.forwardRef<HTMLDivElement, CardBaseImageWrapperProps>(
  ({ size = "md", className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardBaseImageVariants({ size }), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardBaseImageWrapper.displayName = "CardBaseImageWrapper";

/**
 * CardBase ContentWrapper Component
 *
 * Layout wrapper for card content. Uses flex column layout.
 * Spacing is controlled by parent CardBase size variant.
 */
const CardBaseContentWrapper = React.forwardRef<HTMLDivElement, CardBaseContentWrapperProps>(
  ({ size = "md", spacing, className, children, ...props }, ref) => {
    const resolvedSpacing = spacing ?? (size === "sm" ? "xs" : "sm");

    return (
      <Stack
        ref={ref}
        direction="vertical"
        spacing={resolvedSpacing}
        className={cn(cardBaseContentVariants({ size }), className)}
        {...props}
      >
        {children}
      </Stack>
    );
  },
);

CardBaseContentWrapper.displayName = "CardBaseContentWrapper";

/**
 * CardBase FooterWrapper Component
 *
 * Layout wrapper for card footer. Uses flex layout.
 * Spacing is controlled by parent CardBase size variant.
 */
const CardBaseFooterWrapper = React.forwardRef<HTMLDivElement, CardBaseFooterWrapperProps>(
  ({ size = "md", className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardBaseFooterVariants({ size }), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardBaseFooterWrapper.displayName = "CardBaseFooterWrapper";

export { CardBase, CardBaseContentWrapper, CardBaseFooterWrapper, CardBaseImageWrapper };
