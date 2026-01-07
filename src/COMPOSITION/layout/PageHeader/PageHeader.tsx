"use client";

/**
 * PageHeader Component
 *
 * PageHeader is a semantic composition component, NOT a layout primitive.
 * Provides structured page header with predefined semantic slots (title, description, breadcrumbs, actions).
 * Uses Foundation components (Heading, Text, Breadcrumbs) for semantic content.
 * Composes layout primitives internally but does not expose layout props.
 *
 * @enforcement TUNG_PAGEHEADER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - PageHeader is a composition component that delegates ALL styling to composed components
 * - ALL styling is delegated to Container, Flex, Stack, Heading, Text, and Breadcrumbs components
 * - PageHeader does NOT use tokens directly
 * - Container component handles width constraint and padding via token-based values
 * - Flex component handles layout via FLEX_TOKENS
 * - Stack component handles layout via STACK_TOKENS
 * - Heading, Text, and Breadcrumbs components handle their own token enforcement
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - PageHeader composes Container component for width constraint
 * - PageHeader composes Flex component for layout
 * - PageHeader composes Stack component for vertical layout
 * - PageHeader composes Heading component (Foundation) for title
 * - PageHeader composes Text component (Foundation) for description
 * - PageHeader composes Breadcrumbs component for navigation
 * - Styling is delegated to all composed components
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_API_RESOLUTION.md for API decisions
 *
 * Authority Compliance:
 * - Layout Authority: PageHeader uses Container, Flex, and Stack components which handle layout via their tokens
 * - Spacing Authority: PageHeader uses token-based spacing values via composed components
 * - Typography Authority: PageHeader uses typography token system via Heading and Text components
 * - Color Authority: PageHeader does not apply colors directly (delegated to composed components)
 *
 * Token-only contract:
 * - PageHeader has no direct token usage (composition component)
 * - All styling occurs through composed components:
 *   - Container component handles width constraint (token-based)
 *   - Flex component handles layout (FLEX_TOKENS)
 *   - Stack component handles layout (STACK_TOKENS)
 *   - Heading component handles typography (HEADING_TOKENS)
 *   - Text component handles typography (TEXT_TOKENS)
 *   - Breadcrumbs component handles navigation styling (BREADCRUMBS_TOKENS)
 * - All composed components handle token enforcement
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
