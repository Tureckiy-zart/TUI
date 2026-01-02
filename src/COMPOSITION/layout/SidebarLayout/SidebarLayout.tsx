"use client";

/**
 * SidebarLayout Component
 *
 * SidebarLayout is a page-level compositional layout for pages with a sidebar and main content.
 * Uses Grid internally for two-column layout and Stack for vertical collapse.
 *
 * SidebarLayout IS: A page-level compositional layout component
 * SidebarLayout IS NOT: A low-level layout control (px/py, grid columns directly), a padding/spacing wrapper, or a section rhythm manager
 *
 * All spacing values use tokens only.
 *
 * @example
 * ```tsx
 * // Basic usage with left sidebar
 * <SidebarLayout sidebar={<Navigation />}>
 *   <Content />
 * </SidebarLayout>
 *
 * // Right sidebar with custom width
 * <SidebarLayout
 *   sidebar={<Sidebar />}
 *   sidebarPosition="right"
 *   sidebarWidth="lg"
 *   gap="xl"
 * >
 *   <Content />
 * </SidebarLayout>
 *
 * // Collapsible layout
 * <SidebarLayout
 *   sidebar={<Navigation />}
 *   collapseAt="md"
 * >
 *   <Content />
 * </SidebarLayout>
 * ```
 */

import * as React from "react";

import { getBaseValue, getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";

import { Box } from "../Box";
import type { ResponsiveSpacing, SpacingValue } from "../layout.types";
import { Stack } from "../Stack";

/**
 * Sidebar position type
 */
export type SidebarPosition = "left" | "right";

/**
 * Sidebar width type
 */
export type SidebarWidth = "sm" | "md" | "lg";

/**
 * Collapse breakpoint type
 */
export type CollapseBreakpoint = "sm" | "md" | "lg" | "xl";

/**
 * Sidebar width mapping to CSS variables
 * Maps sidebar width tokens to spacing CSS variables for grid column widths
 */
const sidebarWidthMap: Record<SidebarWidth, string> = {
  sm: "var(--spacing-64)", // 256px (16rem)
  md: "var(--spacing-80)", // 320px (20rem)
  lg: "var(--spacing-96)", // 384px (24rem)
} as const satisfies Record<SidebarWidth, string>;

export interface SidebarLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Sidebar content (rendered as <aside>)
   *
   * @example
   * ```tsx
   * <SidebarLayout sidebar={<Navigation />}>
   *   <Content />
   * </SidebarLayout>
   * ```
   */
  sidebar: React.ReactNode;

  /**
   * Main content (rendered as <main>)
   *
   * @example
   * ```tsx
   * <SidebarLayout sidebar={<Navigation />}>
   *   <Content />
   * </SidebarLayout>
   * ```
   */
  children: React.ReactNode;

  /**
   * Sidebar position - left or right
   *
   * @default "left"
   *
   * @example
   * ```tsx
   * // Left sidebar (default)
   * <SidebarLayout sidebar={<Nav />} sidebarPosition="left">
   *   <Content />
   * </SidebarLayout>
   *
   * // Right sidebar
   * <SidebarLayout sidebar={<Nav />} sidebarPosition="right">
   *   <Content />
   * </SidebarLayout>
   * ```
   */
  sidebarPosition?: SidebarPosition;

  /**
   * Sidebar width - token-based (sm, md, lg)
   * Maps to spacing tokens: sm=256px, md=320px, lg=384px
   *
   * @default "md"
   *
   * @example
   * ```tsx
   * // Small sidebar (256px)
   * <SidebarLayout sidebar={<Nav />} sidebarWidth="sm">
   *   <Content />
   * </SidebarLayout>
   *
   * // Large sidebar (384px)
   * <SidebarLayout sidebar={<Nav />} sidebarWidth="lg">
   *   <Content />
   * </SidebarLayout>
   * ```
   */
  sidebarWidth?: SidebarWidth;

  /**
   * Gap between sidebar and content - token-based spacing
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl) or responsive object
   *
   * @default "md"
   *
   * @example
   * ```tsx
   * // Default gap
   * <SidebarLayout sidebar={<Nav />} gap="md">
   *   <Content />
   * </SidebarLayout>
   *
   * // Responsive gap
   * <SidebarLayout sidebar={<Nav />} gap={{ base: "sm", lg: "xl" }}>
   *   <Content />
   * </SidebarLayout>
   * ```
   */
  gap?: ResponsiveSpacing;

  /**
   * Breakpoint at which layout collapses to vertical stack
   * When viewport width < breakpoint, layout switches from Grid to Stack
   *
   * @default undefined (no collapse)
   *
   * @example
   * ```tsx
   * // Collapse at md breakpoint (768px)
   * <SidebarLayout sidebar={<Nav />} collapseAt="md">
   *   <Content />
   * </SidebarLayout>
   *
   * // Collapse at lg breakpoint (1024px)
   * <SidebarLayout sidebar={<Nav />} collapseAt="lg">
   *   <Content />
   * </SidebarLayout>
   * ```
   */
  collapseAt?: CollapseBreakpoint;
}

/**
 * SidebarLayout component - page-level compositional layout
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Composes Foundation components (Box, Stack)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses semantic HTML (<aside>, <main>)
 * - ✅ Motion: NO MOTION BY DESIGN (layout collapse is structural change, not interactive transition)
 */
const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(
  (
    {
      sidebar,
      children,
      sidebarPosition = "left",
      sidebarWidth = "md",
      gap = "md",
      collapseAt,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Get sidebar width CSS variable
    const sidebarWidthValue = sidebarWidthMap[sidebarWidth];

    // Get gap base value for spacing
    const gapBaseValue = getBaseValue<SpacingValue>(gap);
    const gapCSSVar = gapBaseValue ? getSpacingCSSVar(String(gapBaseValue)) : undefined;

    // Build grid column template based on sidebar position
    const gridColsTemplate =
      sidebarPosition === "left" ? `${sidebarWidthValue} 1fr` : `1fr ${sidebarWidthValue}`;

    // Build inline styles for grid layout
    const gridStyles: React.CSSProperties = {
      display: "grid",
      gridTemplateColumns: gridColsTemplate,
      ...(gapCSSVar && { gap: gapCSSVar }),
      ...style,
    };

    // If collapseAt is provided, use responsive approach with two layouts
    if (collapseAt) {
      return (
        <Box ref={ref} className={className} style={style} {...props}>
          {/* Above breakpoint: Grid layout (shown at breakpoint and above) */}
          {/* Use div directly to avoid twMerge removing base grid class when Box processes className */}
          {/* Note: 'grid' and 'hidden' are intentionally used together for responsive behavior:
              - 'hidden' hides the element by default
              - 'md:grid' shows it as grid layout at md breakpoint and above */}
          <div className={`grid hidden ${collapseAt}:grid`} style={gridStyles}>
            {sidebarPosition === "left" ? (
              <>
                <aside>{sidebar}</aside>
                <main>{children}</main>
              </>
            ) : (
              <>
                <main>{children}</main>
                <aside>{sidebar}</aside>
              </>
            )}
          </div>

          {/* Below breakpoint: Stack layout (shown below breakpoint) */}
          <Stack
            direction="vertical"
            spacing={gap}
            className={cn("flex", "flex-col", `${collapseAt}:hidden`)}
          >
            <aside>{sidebar}</aside>
            <main>{children}</main>
          </Stack>
        </Box>
      );
    }

    // No collapse: Always use Grid layout
    return (
      <Box ref={ref} className={cn("grid", className)} style={gridStyles} {...props}>
        {sidebarPosition === "left" ? (
          <>
            <aside>{sidebar}</aside>
            <main>{children}</main>
          </>
        ) : (
          <>
            <main>{children}</main>
            <aside>{sidebar}</aside>
          </>
        )}
      </Box>
    );
  },
);

SidebarLayout.displayName = "SidebarLayout";

export { SidebarLayout };
