"use client";

/**
 * Card Container Component
 *
 * Token-driven card component with Header, Body, and Footer subcomponents.
 * Uses SURFACE_TOKENS + CARD_TOKENS for styling.
 * All styling uses tokens exclusively (no raw CSS values).
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { CARD_TOKENS } from "@/tokens/components/card";

import { Box, type BoxProps } from "../layout/Box";
import type { ResponsiveRadius, ResponsiveSpacing, ShadowValue } from "../layout/layout.types";
import { Row } from "../layout/Row";
import { Stack } from "../layout/Stack";

export interface CardProps extends Omit<BoxProps, "radius" | "shadow" | "p"> {
  /**
   * Card size - maps to CARD_TOKENS.size
   */
  size?: "sm" | "md" | "lg";

  /**
   * Border radius - token-based (overrides size default)
   */
  radius?: ResponsiveRadius;

  /**
   * Shadow - token-based (overrides size default)
   */
  shadow?: ShadowValue;

  /**
   * Padding - token-based (overrides size default)
   */
  p?: ResponsiveSpacing;
}

/**
 * Card component - main container
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ size = "md", radius, shadow, p, className, ...props }, ref) => {
    // Get tokens from size
    const sizeTokens = CARD_TOKENS.size[size];

    // Use provided props or fall back to size defaults
    const radiusValue = radius ?? (sizeTokens.radius.replace("rounded-", "") as ResponsiveRadius);
    // Handle shadow: "shadow" maps to "xs", others extract the value
    const sizeShadow = sizeTokens.shadow;
    const defaultShadow =
      sizeShadow === "shadow" ? "xs" : (sizeShadow.replace("shadow-", "") as ShadowValue);
    const shadowValue = shadow ?? defaultShadow;
    const paddingValue = p ?? (sizeTokens.padding.replace("p-", "") as ResponsiveSpacing);

    return (
      <Box
        ref={ref}
        className={cn("border border-border bg-card text-card-foreground", className)}
        radius={radiusValue}
        shadow={shadowValue}
        p={paddingValue}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

/**
 * CardHeader component - uses Stack for vertical spacing
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card size - determines padding from CARD_TOKENS
   */
  size?: "sm" | "md" | "lg";

  /**
   * Padding - token-based (overrides size default)
   */
  p?: ResponsiveSpacing;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ size = "md", p, className, ...props }, ref) => {
    const sizeTokens = CARD_TOKENS.size[size];
    const paddingValue = p ?? (sizeTokens.padding.replace("p-", "") as ResponsiveSpacing);
    const spacingValue = sizeTokens.spacing.vertical.replace("space-y-", "") as ResponsiveSpacing;

    return (
      <Stack ref={ref} gap={spacingValue} className={cn(className)} p={paddingValue} {...props} />
    );
  },
);

CardHeader.displayName = "CardHeader";

/**
 * CardBody component - main content area
 */
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card size - determines padding from CARD_TOKENS
   */
  size?: "sm" | "md" | "lg";

  /**
   * Padding - token-based (overrides size default)
   */
  p?: ResponsiveSpacing;
}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ size = "md", p, className, ...props }, ref) => {
    const sizeTokens = CARD_TOKENS.size[size];
    const paddingValue = p ?? (sizeTokens.padding.replace("p-", "") as ResponsiveSpacing);

    return <Box ref={ref} className={cn(className)} p={paddingValue} {...props} />;
  },
);

CardBody.displayName = "CardBody";

/**
 * CardFooter component - uses Row for horizontal layout
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card size - determines padding from CARD_TOKENS
   */
  size?: "sm" | "md" | "lg";

  /**
   * Padding - token-based (overrides size default)
   */
  p?: ResponsiveSpacing;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ size = "md", p, className, ...props }, ref) => {
    const sizeTokens = CARD_TOKENS.size[size];
    const paddingValue = p ?? (sizeTokens.padding.replace("p-", "") as ResponsiveSpacing);

    return <Row ref={ref} className={cn("items-center", className)} p={paddingValue} {...props} />;
  },
);

CardFooter.displayName = "CardFooter";

// Attach subcomponents to Card
(
  Card as typeof Card & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
  }
).Header = CardHeader;

(
  Card as typeof Card & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
  }
).Body = CardBody;

(
  Card as typeof Card & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
  }
).Footer = CardFooter;

export { Card, CardBody, CardFooter, CardHeader };
