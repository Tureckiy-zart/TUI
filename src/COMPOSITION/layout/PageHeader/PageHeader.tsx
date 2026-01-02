"use client";

/**
 * PageHeader Component
 *
 * PageHeader is a semantic composition component, NOT a layout primitive.
 * Provides structured page header with predefined semantic slots (title, description, breadcrumbs, actions).
 * Uses Foundation components (Heading, Text, Breadcrumbs) for semantic content.
 * Composes layout primitives internally but does not expose layout props.
 *
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="Page Title"
 *   description="Page description text"
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Current" }
 *   ]}
 *   actions={<Button>Action</Button>}
 * />
 * ```
 */

import * as React from "react";

import { type BreadcrumbItem, Breadcrumbs } from "@/COMPOSITION/navigation/breadcrumbs";
import { cn } from "@/FOUNDATION/lib/utils";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

import { Container } from "../Container";
import { Flex } from "../Flex";
import { Stack } from "../Stack";

export interface PageHeaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "title"
> {
  /**
   * Main page title
   */
  title?: string | React.ReactNode;

  /**
   * Page description/subtitle
   */
  description?: string | React.ReactNode;

  /**
   * Breadcrumb items array (uses Breadcrumbs component internally)
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Actions (buttons, links) displayed on the right side of header
   */
  actions?: React.ReactNode;

  /**
   * HTML element to render
   * @default "header"
   */
  as?: "header" | "div" | "section" | "article";

  /**
   * Accessible label for header region
   */
  ariaLabel?: string;
}

/**
 * PageHeader component - semantic page header with structured slots
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Composes Foundation components (Heading, Text, Breadcrumbs)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses layout primitives internally (Container, Stack, Flex)
 * - ✅ Does NOT expose layout props in public API
 * - ✅ Does NOT accept children prop
 */
const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    { title, description, breadcrumbs, actions, as = "header", ariaLabel, className, ...props },
    ref,
  ) => {
    const Component = as;

    // Determine if we have any content to render
    const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
    const hasTitle = title !== undefined && title !== null && title !== "";
    const hasDescription = description !== undefined && description !== null && description !== "";
    const hasActions = actions !== undefined && actions !== null;
    const hasContent = hasBreadcrumbs || hasTitle || hasDescription || hasActions;

    if (!hasContent) {
      return null;
    }

    return (
      <Component
        ref={ref as any}
        className={cn("w-full", className)}
        aria-label={ariaLabel}
        {...props}
      >
        <Container>
          <Flex direction="row" justify="between" align="start" gap="md">
            {/* Left side: Stack with breadcrumbs, title, description */}
            <Stack direction="vertical" spacing="sm" className="flex-1">
              {hasBreadcrumbs && <Breadcrumbs items={breadcrumbs} />}
              {hasTitle && (
                <Heading level={1} weight="bold">
                  {title}
                </Heading>
              )}
              {hasDescription && (
                <Text size="md" tone="muted">
                  {description}
                </Text>
              )}
            </Stack>

            {/* Right side: Actions */}
            {hasActions && <div className="flex items-start">{actions}</div>}
          </Flex>
        </Container>
      </Component>
    );
  },
);

PageHeader.displayName = "PageHeader";

export { PageHeader };
