"use client";

/**
 * List Component
 *
 * Structural list container that composes Stack with optional Divider injection.
 * Provides semantic ul/ol/div list structures without domain semantics.
 *
 * @enforcement TUNG_LIST_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (SpacingToken)
 * - Gap prop accepts SpacingToken (semantic spacing tokens: xs, sm, md, lg, xl, etc.)
 * - NO raw CSS spacing values allowed
 * - NO raw numeric values allowed
 * - Spacing is delegated to Stack component (uses spacing token system)
 * - Divider styling is delegated to Divider component (uses divider token system)
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Gap prop accepts SpacingToken (semantic spacing tokens: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
 * - Spacing is applied via Stack component using CSS variables (--spacing-*)
 * - NO raw Tailwind spacing classes (gap-4, gap-md, etc.) allowed
 *
 * Layout Authority Rules:
 * - List composes Stack component for layout composition
 * - List composes Divider component for visual separation
 * - List provides semantic HTML structure (ul/ol/div)
 * - No direct layout styling (delegated to Stack)
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: List uses spacing token system exclusively via Stack component
 * - Layout Authority: List follows layout composition patterns (composes Stack and Divider)
 *
 * Token-only contract:
 * - All spacing values are defined in spacing token system (src/FOUNDATION/tokens/spacing.ts)
 * - Spacing tokens reference foundation spacing scale (8px grid system)
 * - Spacing is applied via Stack component using CSS variables (--spacing-*)
 * - No raw CSS spacing values are allowed
 * - TypeScript enforces valid spacing token values at compile time
 *
 * **What List IS:**
 * - Vertical list container composing Stack + Divider
 * - Semantic HTML wrapper (ul/ol/div) with proper accessibility
 * - Token-driven spacing via Stack composition
 * - Optional divider injection between items
 *
 * **What List IS NOT:**
 * - NOT domain-specific (no title/description/content styling)
 * - NOT interactive control (interactivity delegated to child components)
 * - NOT reimplementation of Stack (composes Stack directly)
 * - NOT duplication of Divider (reuses Divider component)
 *
 * @example
 * ```tsx
 * <List as="ul" gap="md">
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * <List as="ul" divided dividerInset>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </List>
 * ```
 */

import * as React from "react";

import type { SpacingToken } from "@/FOUNDATION/tokens/types";

import { Divider, type DividerTone } from "../Divider";
import { Stack } from "../Stack";

/**
 * List polymorphic element type
 * Explicit union type for List component `as` prop
 */
export type ListAs = "ul" | "ol" | "div";

/**
 * List component props
 *
 * Structural list container that composes Stack with optional Divider injection.
 * Provides semantic ul/ol/div list structures without domain semantics.
 */
export interface ListProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Polymorphic element type (ul/ol/div)
   * @default "div"
   */
  as?: ListAs;

  /**
   * Spacing between list items (passed to Stack)
   * Token-based spacing value
   * @default undefined (Stack default)
   */
  gap?: SpacingToken;

  /**
   * Inject Divider between list items
   * When true, Divider is injected between items (not after last item)
   * @default false
   */
  divided?: boolean;

  /**
   * Add inset padding to dividers (passed to Divider inset prop)
   * @default false
   */
  dividerInset?: boolean;

  /**
   * Color tone for dividers (passed to Divider tone prop)
   * @default "border"
   */
  dividerTone?: DividerTone;

  /**
   * List items (typically ListItem components)
   */
  children: React.ReactNode;
}

/**
 * List component
 *
 * COMPLIANCE NOTES:
 * - ✅ Composes Stack (no duplication)
 * - ✅ Reuses Divider (no duplication)
 * - ✅ Token-based spacing via Stack composition
 * - ✅ Semantic ul/ol/div with proper accessibility
 * - ✅ Polymorphic `as` prop for semantic HTML
 * - ✅ NO raw values (all styling via tokens)
 * - ✅ NO domain semantics (structural only)
 * - ✅ Motion GAP: NO MOTION BY DESIGN (static container)
 */
const List = React.forwardRef<HTMLElement, ListProps>(
  (
    {
      as = "div",
      gap,
      divided = false,
      dividerInset = false,
      dividerTone = "border",
      children,
      ...props
    },
    ref,
  ) => {
    // Convert children to array for processing
    const childrenArray = React.Children.toArray(children);

    // If divided, inject Divider between items (not after last item)
    const content = divided
      ? childrenArray.reduce<React.ReactNode[]>((acc, child, index) => {
          acc.push(child);
          // Add divider after each item except the last
          if (index < childrenArray.length - 1) {
            acc.push(
              <Divider
                key={`divider-${index}`}
                orientation="horizontal"
                tone={dividerTone}
                inset={dividerInset}
              />,
            );
          }
          return acc;
        }, [])
      : children;

    return (
      <Stack
        ref={ref as React.Ref<HTMLElement>}
        as={as}
        direction="vertical"
        spacing={gap}
        role={as === "div" ? "list" : undefined}
        {...props}
      >
        {content}
      </Stack>
    );
  },
);

List.displayName = "List";

export { List };
