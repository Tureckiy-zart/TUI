"use client";

/**
 * Card Container Component
 *
 * Token-driven card component with Header, Body, and Footer subcomponents.
 * Uses CARD_TOKENS for styling.
 * All styling uses tokens exclusively (no raw CSS values).
 */

import * as React from "react";

import {
  getBaseValue as getBaseValueUtil,
  getSpacingCSSVar,
} from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";
import { CARD_TOKENS } from "@/FOUNDATION/tokens/components/card";

import { Box, type BoxProps } from "../Box";
import type {
  ResponsiveRadius,
  ResponsiveSpacing,
  ShadowValue,
  SpacingValue,
} from "../layout.types";
import { Row } from "../Row";
import { Stack } from "../Stack";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract padding value from token string (e.g., "p-md" -> "md")
 */
function extractPaddingFromToken(token: string): ResponsiveSpacing {
  if (token.startsWith("p-")) {
    return token.replace("p-", "") as ResponsiveSpacing;
  }
  // Fallback: assume token is already a spacing value
  return token as ResponsiveSpacing;
}

/**
 * Extract radius value from token string (e.g., "rounded-xl" -> "xl")
 */
function extractRadiusFromToken(token: string): ResponsiveRadius {
  if (token.startsWith("rounded-")) {
    return token.replace("rounded-", "") as ResponsiveRadius;
  }
  // Fallback: assume token is already a radius value
  return token as ResponsiveRadius;
}

/**
 * Extract shadow value from token string (e.g., "shadow-sm" -> "sm", "shadow" -> "xs")
 */
function extractShadowFromToken(token: string): ShadowValue {
  if (token === "shadow") {
    // "shadow" maps to "xs" (default elevation)
    return "xs";
  }
  if (token.startsWith("shadow-")) {
    return token.replace("shadow-", "") as ShadowValue;
  }
  // Fallback: assume token is already a shadow value
  return token as ShadowValue;
}

/**
 * Extract spacing value from token string (e.g., "space-y-xs" -> "xs")
 */
function extractSpacingFromToken(token: string): ResponsiveSpacing {
  if (token.startsWith("space-y-")) {
    return token.replace("space-y-", "") as ResponsiveSpacing;
  }
  // Fallback: assume token is already a spacing value
  return token as ResponsiveSpacing;
}

/**
 * Card base styling classes (border, background, text color)
 * Uses semantic Tailwind classes that map to CSS variables
 */
const CARD_BASE_CLASSES = "border border-border bg-card text-card-foreground";

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
  ({ size = "md", radius, shadow, p, className, style, ...props }, ref) => {
    // Get tokens from size
    const sizeTokens = CARD_TOKENS.size[size];

    // Use provided props or fall back to size defaults (using helper functions)
    const radiusValue = radius ?? extractRadiusFromToken(sizeTokens.radius);
    const shadowValue = shadow ?? extractShadowFromToken(sizeTokens.shadow);
    const paddingValue = p ?? extractPaddingFromToken(sizeTokens.padding);

    // Apply padding as single property for consistent styling
    // Extract base value for inline style
    const paddingBaseValue = getBaseValueUtil<SpacingValue>(paddingValue);

    return (
      <Box
        ref={ref}
        className={cn(CARD_BASE_CLASSES, className)}
        radius={radiusValue}
        shadow={shadowValue}
        style={{
          ...(paddingBaseValue !== undefined && {
            padding: getSpacingCSSVar(String(paddingBaseValue)),
          }),
          ...style,
        }}
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
    const paddingValue = p ?? extractPaddingFromToken(sizeTokens.padding);
    const spacingValue = extractSpacingFromToken(sizeTokens.spacing.vertical);

    return (
      <Stack
        ref={ref}
        spacing={spacingValue}
        className={cn(className)}
        px={paddingValue}
        py={paddingValue}
        {...props}
      />
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
    const paddingValue = p ?? extractPaddingFromToken(sizeTokens.padding);

    return (
      <Box ref={ref} className={cn(className)} px={paddingValue} py={paddingValue} {...props} />
    );
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
    const paddingValue = p ?? extractPaddingFromToken(sizeTokens.padding);

    return (
      <Row
        ref={ref}
        align="center"
        className={cn(className)}
        px={paddingValue}
        py={paddingValue}
        {...props}
      />
    );
  },
);

CardFooter.displayName = "CardFooter";

// Attach subcomponents to Card using Object.assign for proper TypeScript inference
const CardWithSubcomponents = Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export { CardWithSubcomponents as Card, CardBody, CardFooter, CardHeader };
