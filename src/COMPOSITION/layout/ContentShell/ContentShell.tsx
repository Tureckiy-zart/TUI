"use client";

/**
 * ContentShell Component
 *
 * ContentShell is a body-level layout wrapper, NOT document-level.
 * Provides structure for main page content with optional navigation.
 * Uses Container for width constraint and padding.
 * Uses Stack for vertical composition of nav + content.
 *
 * ContentShell IS: A body-level layout wrapper for structuring page content
 * ContentShell IS NOT: A document-level wrapper (html/body), a global provider manager, or a routing component
 *
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
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
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Composes layout primitives (Container, Stack)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses semantic HTML (<main> element)
 * - ✅ Does NOT manage document structure (html, body, head)
 * - ✅ Does NOT manage global providers or settings
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
