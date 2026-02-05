"use client";

/**
 * IconButton Component
 *
 * @semantic_role FOUNDATION_PRIMITIVE_ACTION_TRIGGER
 * @semantic_definition IconButton is a Foundation primitive component that serves exclusively as an icon-only action trigger.
 *                     IconButton represents user-initiated actions (submit, confirm, execute, activate) with icon-only visual representation.
 *                     IconButton is a thin semantic wrapper over Button with iconOnly={true}, enforcing aria-label at type level
 *                     and providing simpler DX than Button(iconOnly) pattern.
 *
 * @status NEW COMPONENT
 * @rule IconButton MUST render Button internally with iconOnly={true}
 * @rule IconButton MUST NOT duplicate Button's CVA logic or styling
 * @rule aria-label is REQUIRED at type level for accessibility
 */

import * as React from "react";

import { Button, type ButtonProps } from "@/PRIMITIVES/Button";

/**
 * IconButton Component Props
 *
 * IconButton is a thin wrapper over Button that enforces icon-only usage pattern.
 * All Button props are inherited except forbidden ones (iconOnly, children, leftIcon, rightIcon, className, style).
 *
 * @rule icon prop is REQUIRED - IconButton only supports icon content
 * @rule aria-label prop is REQUIRED - Icon-only buttons must have accessible names
 * @rule Foundation Enforcement: className and style excluded from public API
 */
export interface IconButtonProps extends Omit<
  ButtonProps,
  "iconOnly" | "children" | "leftIcon" | "rightIcon" | "asChild"
> {
  /**
   * Icon content (React node)
   * IconButton only supports icon content, not text or mixed content.
   * Icon size is automatically derived from Button size prop via BUTTON_TOKENS.iconSize.*
   */
  icon: React.ReactNode;

  /**
   * ARIA label for the icon button (required for accessibility)
   * Icon-only buttons must have accessible names since they have no visible text.
   * TypeScript will error if aria-label is missing.
   */
  "aria-label": string;
}

/**
 * IconButton Component Implementation
 *
 * IconButton is a thin semantic wrapper over Button that:
 * - Enforces icon-only usage pattern (no text content)
 * - Requires aria-label at type level for accessibility
 * - Delegates all styling and behavior to Button component
 * - Provides simpler DX than Button(iconOnly) pattern
 *
 * IconButton renders Button with:
 * - iconOnly={true} (enforced internally)
 * - icon prop passed as children (Button's iconOnly rendering uses children-first resolution)
 * - All other props forwarded to Button
 *
 * Token usage:
 * - All tokens come from Button's BUTTON_TOKENS
 * - Icon size automatically derived from size prop via BUTTON_TOKENS.iconSize.*
 * - Square dimensions handled by Button's iconOnly logic
 *
 * @example
 * ```tsx
 * <IconButton icon={<SearchIcon />} aria-label="Search" />
 * ```
 *
 * @example
 * ```tsx
 * <IconButton
 *   icon={<CloseIcon />}
 *   aria-label="Close dialog"
 *   variant="ghost"
 *   size="sm"
 * />
 * ```
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, "aria-label": ariaLabel, ...buttonProps }, ref) => {
    return (
      <Button ref={ref} iconOnly={true} aria-label={ariaLabel} {...buttonProps}>
        {icon}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";

export { IconButton };
