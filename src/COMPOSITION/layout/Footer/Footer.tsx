"use client";

/**
 * Footer Component
 *
 * Token-driven footer component for page-level layout.
 * Provides semantic <footer> element with flexible content slots (left, center, right).
 * Uses Stack internally for layout composition.
 * All styling uses tokens exclusively (no raw CSS values).
 *
 * @enforcement TUNG_FOOTER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Footer is a composition component that delegates layout styling to Stack component
 * - ALL spacing values MUST be token-based (px, py props use ResponsiveSpacing)
 * - ALL color values MUST be token-based (bg prop uses ColorValue)
 * - Footer uses token-based spacing values for padding (xs | sm | md | lg | xl | 2xl)
 * - Footer uses token-based color values for background (ColorValue)
 * - NO raw Tailwind classes allowed (component uses token-based Tailwind classes)
 *
 * Composition Authority Rules:
 * - Footer composes Stack component for layout
 * - Footer composes Link component (Foundation) for social links
 * - Styling is delegated to Stack and Link components
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Background color uses ColorValue (token-based)
 * - Border color uses token-based border classes
 * - NO raw Tailwind color classes (bg-red-500, text-primary, etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses ResponsiveSpacing (token-based)
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 *
 * Authority Compliance:
 * - Layout Authority: Footer uses Stack component which handles layout via STACK_TOKENS
 * - Spacing Authority: Footer uses spacing token system exclusively
 * - Color Authority: Footer uses color token system exclusively
 * - Typography Authority: Footer does not apply typography (delegated to Link component)
 *
 * Token-only contract:
 * - Footer uses token-based spacing values for padding (ResponsiveSpacing)
 * - Footer uses token-based color values for background (ColorValue)
 * - All spacing and color values are converted to CSS variables or token-based Tailwind classes
 * - Stack component handles token enforcement for layout
 * - Link component handles token enforcement for social links
 *
 * Footer uses slot-based layout API (left/center/right, px/py, border, bg).
 * This pattern is distinct from semantic components like PageHeader.
 */

import * as React from "react";

import { getBaseValue, getColorCSSVar, isResponsiveValue } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";
import { Link } from "@/PRIMITIVES/Link";

import type { ColorValue, ResponsiveSpacing } from "../layout.types";
import { Stack } from "../Stack";

export interface SocialLink {
  /**
   * Icon component (optional)
   * If not provided, label will be displayed as text
   */
  icon?: React.ReactNode;

  /**
   * Link label (required for accessibility)
   */
  label: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Optional aria-label override
   */
  ariaLabel?: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Left content slot
   * @example left={<div>Copyright © 2025</div>}
   */
  left?: React.ReactNode;

  /**
   * Center content slot
   * @example center={<nav>Links</nav>}
   */
  center?: React.ReactNode;

  /**
   * Right content slot
   * @example right={<div>Social links</div>}
   */
  right?: React.ReactNode;

  /**
   * Horizontal padding - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, etc.) or responsive object
   * @default "md"
   * @example px="md"
   * @example px={{ base: "sm", lg: "xl" }}
   */
  px?: ResponsiveSpacing;

  /**
   * Vertical padding - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, etc.) or responsive object
   * @default "lg"
   * @example py="lg"
   * @example py={{ base: "md", lg: "xl" }}
   */
  py?: ResponsiveSpacing;

  /**
   * Show top border
   * @default true
   * @example border={true}
   */
  border?: boolean;

  /**
   * Background color token
   * @default "background"
   * @example bg="muted"
   */
  bg?: ColorValue;

  /**
   * Accessible label for footer region
   * @default undefined
   * @example ariaLabel="Site footer"
   */
  ariaLabel?: string;

  /**
   * Content (alternative to slots)
   * If provided, left/center/right slots are ignored
   * @example children={<div>Footer content</div>}
   */
  children?: React.ReactNode;

  /**
   * Social media links
   * If provided, will be rendered in the right slot with proper styling
   * @example socialLinks={[
   *   { icon: <Twitter />, label: "Twitter", href: "https://twitter.com" },
   *   { icon: <Facebook />, label: "Facebook", href: "https://facebook.com" }
   * ]}
   */
  socialLinks?: SocialLink[];
}

/**
 * Generate Tailwind responsive padding classes for px/py props
 */
function getResponsivePaddingClasses(
  prop: "px" | "py",
  value: ResponsiveSpacing | undefined,
): string[] {
  if (!value) return [];

  const classes: string[] = [];

  if (isResponsiveValue(value)) {
    // Responsive object - generate responsive classes
    if (value.base !== undefined) {
      classes.push(`${prop}-${String(value.base)}`);
    }
    if (value.sm !== undefined) {
      classes.push(`sm:${prop}-${String(value.sm)}`);
    }
    if (value.md !== undefined) {
      classes.push(`md:${prop}-${String(value.md)}`);
    }
    if (value.lg !== undefined) {
      classes.push(`lg:${prop}-${String(value.lg)}`);
    }
    if (value.xl !== undefined) {
      classes.push(`xl:${prop}-${String(value.xl)}`);
    }
    if (value["2xl"] !== undefined) {
      classes.push(`2xl:${prop}-${String(value["2xl"])}`);
    }
  } else {
    // Simple value - single class
    classes.push(`${prop}-${String(value)}`);
  }

  return classes;
}

/**
 * Footer component - page-level footer container
 */
const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      left,
      center,
      right,
      socialLinks,
      px = "md",
      py = "lg",
      border = true,
      bg = "background",
      ariaLabel,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Generate responsive padding classes
    const pxClasses = getResponsivePaddingClasses("px", px);
    const pyClasses = getResponsivePaddingClasses("py", py);

    // Get base value for background (padding handled via Tailwind classes)
    const bgBaseValue = getBaseValue<ColorValue>(bg);

    // Build inline styles only for background (padding handled via Tailwind classes)
    const computedStyle: React.CSSProperties = {
      ...(bgBaseValue !== undefined && {
        backgroundColor: getColorCSSVar(bgBaseValue),
      }),
      ...style,
    };

    // Render social links if provided, otherwise use right prop
    const rightSlot = socialLinks ? (
      <div className="flex items-center gap-md">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            size="sm"
            variant="ghost"
            aria-label={link.ariaLabel || link.label}
          >
            {link.icon || link.label}
          </Link>
        ))}
      </div>
    ) : (
      right
    );

    return (
      <footer
        ref={ref}
        className={cn(
          "w-full",
          border && "border-t border-border",
          ...pxClasses,
          ...pyClasses,
          className,
        )}
        style={Object.keys(computedStyle).length > 0 ? computedStyle : undefined}
        aria-label={ariaLabel}
        {...props}
      >
        {children ? (
          children
        ) : (
          <Stack direction="horizontal" justify="between" align="center" className="w-full">
            {left && <div className="flex items-center">{left}</div>}
            {center && <div className="flex items-center">{center}</div>}
            {rightSlot && <div className="flex items-center">{rightSlot}</div>}
          </Stack>
        )}
      </footer>
    );
  },
);

Footer.displayName = "Footer";

export { Footer };
