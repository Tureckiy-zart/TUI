"use client";

/**
 * Container Layout Primitive Component
 *
 * Token-driven container component for constraining content width and centering.
 * Uses CSS-layer class .tm-container with token-based padding and max-width.
 */

import * as React from "react";

import { getBaseValue, getSpacingCSSVar } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import type {
  ContainerMaxWidthToken,
  ResponsiveContainerMaxWidth,
  SpacingToken,
} from "@/tokens/types";

import type { ResponsiveSpacing, SpacingValue } from "./layout.types";

/**
 * Container max-width size mapping to CSS values
 * Maps container size tokens to CSS values
 */
const containerMaxWidthMap: Record<ContainerMaxWidthToken, string> = {
  sm: "var(--spacing-96)", // 24rem (384px)
  md: "28rem", // 448px - between spacing[96] and spacing[96] + spacing[8]
  lg: "32rem", // 512px
  xl: "36rem", // 576px
  "2xl": "42rem", // 672px
  "3xl": "48rem", // 768px
  "4xl": "56rem", // 896px
  "5xl": "64rem", // 1024px
  "6xl": "72rem", // 1152px
  "7xl": "80rem", // 1280px
  full: "100%",
};

/**
 * Convert max-width token to CSS value
 * Only accepts token unions (ContainerMaxWidthToken or SpacingToken)
 */
function getMaxWidthValue(value: ContainerMaxWidthToken | SpacingToken): string {
  // Convert to string to handle numeric keys
  const stringValue = String(value);

  // If it's a container size token (sm, md, lg, etc.)
  if (stringValue in containerMaxWidthMap) {
    return containerMaxWidthMap[stringValue as ContainerMaxWidthToken];
  }

  // Otherwise, treat as spacing token
  return getSpacingCSSVar(stringValue);
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width of the container
   * Token-based: accepts container size tokens (sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, full) or spacing tokens
   * @example maxWidth="lg" // 32rem (512px)
   * @example maxWidth={{ base: "md", lg: "xl" }} // Responsive
   * @example maxWidth="96" // Uses spacing token
   */
  maxWidth?: ResponsiveContainerMaxWidth;

  /**
   * Padding (horizontal) - token-based
   * Supports: spacing tokens or container spacing tokens (container-xs, container-sm, container-md, etc.)
   * Default: container-md (24px)
   */
  padding?: ResponsiveSpacing;

  /**
   * Center the container horizontally with auto margins
   * Default: true
   */
  center?: boolean;
}

/**
 * Container component - layout primitive for constraining content width
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth, padding, center = true, className, style, ...props }, ref) => {
    // Get base values for CSS variables
    const maxWidthValue = maxWidth
      ? getBaseValue<ContainerMaxWidthToken | SpacingToken>(maxWidth)
      : undefined;
    const paddingValue = getBaseValue<SpacingValue>(
      (padding || "container-md") as ResponsiveSpacing,
    );

    // Build inline styles
    const inlineStyles: React.CSSProperties = {
      ...(maxWidthValue !== undefined && {
        maxWidth: getMaxWidthValue(maxWidthValue),
      }),
      ...(center && {
        marginLeft: "auto",
        marginRight: "auto",
      }),
      ...(!center && {
        marginLeft: undefined,
        marginRight: undefined,
      }),
      // Padding handled via CSS-layer class, but can be overridden with inline style
      ...(paddingValue !== undefined && {
        paddingLeft: getSpacingCSSVar(String(paddingValue)),
        paddingRight: getSpacingCSSVar(String(paddingValue)),
      }),
      ...style,
    };

    // Determine padding data attribute for CSS-layer class (only if padding is a simple value)
    const paddingAttr = (() => {
      if (!padding) return undefined;
      const padValue = getBaseValue<SpacingValue>(padding);
      if (typeof padValue === "string") {
        // Check if it's a container spacing token (e.g., "container-md")
        if (padValue.startsWith("container-")) {
          return padValue.replace("container-", "");
        }
        // Check if it matches container spacing values
        if (["xs", "sm", "md", "lg", "xl", "none"].includes(padValue)) {
          return padValue;
        }
      }
      return undefined;
    })();

    return (
      <div
        ref={ref}
        className={cn("tm-container", className)}
        data-padding={paddingAttr}
        style={inlineStyles}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";

export { Container };
