"use client";

/**
 * ListItem Component
 *
 * Structural list item wrapper with interactive/disabled states, no content styling.
 * Provides semantic li/div elements with proper accessibility and state handling.
 *
 * @enforcement TUNG_LISTITEM_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use tokenCVA for variants
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL motion-related classes MUST use motion tokens
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - NO raw motion values allowed (must use motion tokens)
 * - Structural utilities (flex, w-full, items-*, etc.) are ALLOWED
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Hover background uses semantic Tailwind class (hover:bg-muted/50)
 * - Focus ring uses semantic Tailwind classes (focus-visible:ring-ring)
 * - NO raw Tailwind color classes (bg-red-500, text-primary, etc.) allowed
 *
 * Motion Authority Rules:
 * - ALL motion-related classes MUST use motion tokens
 * - Interactive variant uses transition-colors (motion token)
 * - NO raw motion values allowed
 *
 * State Authority Rules:
 * - ALL state classes (hover, focus-visible, disabled) MUST use State Matrix CSS variables
 * - Disabled state uses opacity and pointer-events utilities
 * - NO raw Tailwind state utilities outside State Matrix
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/STATE_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: ListItem uses color token system exclusively via semantic Tailwind classes
 * - Motion Authority: ListItem uses motion tokens for transitions
 * - State Authority: ListItem uses State Matrix CSS variables for states
 * - Layout Authority: ListItem follows layout composition patterns
 *
 * Token-only contract:
 * - All styling is defined via tokenCVA variants
 * - Variants use semantic Tailwind classes that map to CSS variables
 * - No raw Tailwind color classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant values at compile time
 *
 * **What ListItem IS:**
 * - Structural list item wrapper (li/div)
 * - Interactive/disabled state handling via tokenCVA
 * - Semantic HTML with proper accessibility
 * - Token-driven motion for interactive variant
 *
 * **What ListItem IS NOT:**
 * - NOT domain-specific content (no title/description styling)
 * - NOT interactive control (interactivity delegated to child elements)
 * - NOT form control (structural wrapper only)
 *
 * @example
 * ```tsx
 * <ListItem>Static item</ListItem>
 * ```
 *
 * @example
 * ```tsx
 * <ListItem interactive>
 *   <button>Interactive item</button>
 * </ListItem>
 * ```
 *
 * @example
 * ```tsx
 * <ListItem disabled>Disabled item</ListItem>
 * ```
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";

/**
 * ListItem polymorphic element type
 * Explicit union type for ListItem component `as` prop
 */
export type ListItemAs = "li" | "div";

/**
 * ListItem alignment type
 * Explicit union type for ListItem component `align` prop
 */
export type ListItemAlign = "start" | "center";

/**
 * ListItem component props
 *
 * Structural list item wrapper with interactive/disabled states, no content styling.
 * Provides semantic li/div elements with proper accessibility and state handling.
 */
export interface ListItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Polymorphic element type (li/div)
   * @default "li"
   */
  as?: ListItemAs;

  /**
   * Interactive state (adds hover/focus styling)
   * When true, applies hover transition and focus-visible ring
   * @default false
   */
  interactive?: boolean;

  /**
   * Disabled state (reduces opacity, disables pointer events)
   * @default false
   */
  disabled?: boolean;

  /**
   * Vertical alignment of content
   * @default "start"
   */
  align?: ListItemAlign;

  /**
   * List item content
   */
  children: React.ReactNode;
}

/**
 * ListItem variants using tokenCVA
 *
 * Token-based styling for:
 * - Interactive state (hover transition via motion tokens)
 * - Disabled state (opacity, pointer-events)
 * - Alignment (flexbox align-items)
 */
const listItemVariants = tokenCVA({
  // Base styles - common to all list items
  base: "flex w-full",
  variants: {
    /**
     * Interactive state variant
     * "false"/undefined → static item (no hover)
     * "true" → interactive item (hover transition)
     */
    interactive: {
      false: "", // Static item (no hover)
      true: "cursor-pointer transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", // Interactive item (hover + focus)
    } satisfies Record<"false" | "true", string>,
    /**
     * Disabled state variant
     * "false"/undefined → enabled (normal opacity)
     * "true" → disabled (reduced opacity, no pointer events)
     */
    disabled: {
      false: "", // Enabled (normal opacity)
      true: "opacity-50 pointer-events-none cursor-not-allowed", // Disabled
    } satisfies Record<"false" | "true", string>,
    /**
     * Alignment variant
     * Controls vertical alignment of content
     */
    align: {
      start: "items-start",
      center: "items-center",
    } satisfies Record<ListItemAlign, string>,
  },
  defaultVariants: {
    interactive: "false" as const,
    disabled: "false" as const,
    align: "start",
  },
});

/**
 * ListItem component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses tokenCVA for variants
 * - ✅ Motion tokens for interactive variant (transition-colors)
 * - ✅ Semantic li/div with proper accessibility
 * - ✅ Polymorphic `as` prop for semantic HTML
 * - ✅ NO raw values (all styling via tokens and Tailwind utilities)
 * - ✅ NO domain semantics (structural only)
 * - ✅ Motion GAP: ADD MOTION (interactive variant uses transition-colors)
 * - ✅ Focus-visible styling for interactive variant
 */
const ListItem = React.forwardRef<HTMLLIElement | HTMLDivElement, ListItemProps>(
  (
    {
      as = "li",
      interactive = false,
      disabled = false,
      align = "start",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    if (as === "li") {
      return (
        <li
          ref={ref as React.Ref<HTMLLIElement>}
          className={cn(listItemVariants({ interactive, disabled, align }), className)}
          {...(props as React.HTMLAttributes<HTMLLIElement>)}
        >
          {children}
        </li>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="listitem"
        className={cn(listItemVariants({ interactive, disabled, align }), className)}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  },
);

ListItem.displayName = "ListItem";

export { ListItem, listItemVariants };
