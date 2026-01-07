"use client";

/**
 * ContentShell Component
 *
 * ContentShell is a body-level layout wrapper, NOT document-level.
 * Provides structure for main page content with optional navigation.
 * Uses Container for width constraint and padding.
 * Uses Stack for vertical composition of nav + content.
 *
 * @enforcement TUNG_CONTENTSHELL_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ContentShell is a composition component that delegates ALL styling to Container and Stack components
 * - ALL styling is delegated to Container component (width constraint, padding) and Stack component (layout)
 * - ContentShell does NOT use tokens directly
 * - Container component handles width constraint and padding via token-based values
 * - Stack component handles layout styling via STACK_TOKENS
 * - contentPadding prop uses token-based spacing values (ResponsiveSpacing)
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - ContentShell composes Container component for width constraint and padding
 * - ContentShell composes Stack component for vertical layout
 * - Styling is delegated to Container and Stack components
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 *
 * Authority Compliance:
 * - Layout Authority: ContentShell uses Container and Stack components which handle layout via their tokens
 * - Spacing Authority: ContentShell uses token-based spacing values via Container component
 * - Color Authority: ContentShell does not apply colors (delegated to Container)
 * - Typography Authority: ContentShell does not apply typography (delegated to Container)
 *
 * Token-only contract:
 * - ContentShell has no direct token usage (composition component)
 * - All styling occurs through Container component (token-based) and Stack component (STACK_TOKENS)
 * - Container and Stack components handle token enforcement
 * - contentPadding prop uses token-based values (semanticSpacing tokens)
 *
 * ContentShell IS: A body-level layout wrapper for structuring page content
 * ContentShell IS NOT: A document-level wrapper (html/body), a global provider manager, or a routing component
 *
 * @example
 * ```tsx
 * <ContentShell contentPadding="md">
 *   <Section spaceY="lg">
 *     <PageHeader title="Page Title" />
 *     <Container>Content</Container>
 *   </Section>
 * </ContentShell>
 * ```
 *
 * @example
 * ```tsx
 * <ContentShell
 *   nav={<Navbar left={<Logo />} right={<UserMenu />} />}
 *   contentPadding="md"
 * >
 *   <Section spaceY="lg">
 *     <PageHeader title="Page Title" />
 *     <Container>Content</Container>
 *   </Section>
 * </ContentShell>
 * ```
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { Container } from "../Container";
import type { ResponsiveSpacing } from "../layout.types";
import { Stack } from "../Stack";

export interface ContentShellProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /**
   * Optional navigation component (Navbar)
   */
  nav?: React.ReactNode;

  /**
   * Main page content
   */
  children: React.ReactNode;

  /**
   * Padding for main content area
   * Token-based spacing values only
   * @example contentPadding="md"
   * @example contentPadding={{ base: "sm", lg: "xl" }}
   */
  contentPadding?: ResponsiveSpacing;
}

/**
 * ContentShell component - body-level layout wrapper
 */
const ContentShell = React.forwardRef<HTMLElement, ContentShellProps>(
  ({ nav, children, contentPadding, className, ...props }, ref) => {
    // Determine if navigation is provided
    const hasNav = nav !== undefined && nav !== null;

    // If nav is provided, use Stack for vertical composition of nav + content
    if (hasNav) {
      return (
        <main ref={ref as any} className={cn("w-full", className)} {...props}>
          <Stack direction="vertical" spacing="none">
            <nav>{nav}</nav>
            <Container padding={contentPadding}>{children}</Container>
          </Stack>
        </main>
      );
    }

    // If no nav, render only children in Container
    return (
      <main ref={ref as any} className={cn("w-full", className)} {...props}>
        <Container padding={contentPadding}>{children}</Container>
      </main>
    );
  },
);

ContentShell.displayName = "ContentShell";

export { ContentShell };
