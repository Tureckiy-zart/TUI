"use client";

/**
 * AvatarGroup Component
 *
 * Displays multiple avatars with overlap effect.
 * Shows a maximum number of avatars and indicates remaining count.
 *
 * @example
 * ```tsx
 * <AvatarGroup
 *   avatars={users.map(u => ({
 *     key: u.id,  // Optional but recommended for dynamic lists
 *     src: u.image,
 *     alt: u.name
 *   }))}
 *   max={3}
 *   size="md"
 * />
 * ```
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { Avatar } from "./Avatar";
import type { AvatarShape, AvatarSize } from "./avatar-variants";

export type AvatarGroupSpacing = "tight" | "normal" | "loose";

export interface AvatarGroupProps {
  /**
   * Array of avatar data
   * @required Minimum 1 avatar
   *
   * @remarks
   * For dynamic lists (items can be added/removed/reordered), provide a unique `key`
   * for each avatar to ensure proper React reconciliation. If no key is provided,
   * the component falls back to using `alt` or array index.
   */
  avatars: Array<{
    /**
     * Optional unique identifier for React key
     * @recommended For dynamic lists to ensure proper reconciliation
     */
    key?: string | number;
    src?: string;
    alt: string;
    fallback?: React.ReactNode;
  }>;

  /**
   * Maximum avatars to show (remaining count shown as "+N")
   * @default Show all avatars
   * @optional
   */
  max?: number;

  /**
   * Size for all avatars in group
   * @default "md"
   */
  size?: AvatarSize;

  /**
   * Shape for all avatars in group
   * @default "circle"
   */
  shape?: AvatarShape;

  /**
   * Spacing between avatars (negative margin for overlap)
   * @default "normal"
   */
  spacing?: AvatarGroupSpacing;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Spacing variants using negative margin (token-based)
 */
const spacingVariants: Record<AvatarGroupSpacing, string> = {
  tight: "-space-x-2", // -0.5rem (tight overlap)
  normal: "-space-x-3", // -0.75rem (normal overlap)
  loose: "-space-x-4", // -1rem (loose overlap)
};

/**
 * AvatarGroup component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Composes Avatar component internally
 * - ✅ Token-based spacing (negative margin via -space-x-*)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Smart key management with fallback chain
 * - ✅ Development-mode warnings for edge cases
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max, size = "md", shape = "circle", spacing = "normal", className }, ref) => {
    // Development-mode warning for empty avatars array
    if (process.env.NODE_ENV === "development" && avatars.length === 0) {
      console.warn("[AvatarGroup] Received empty avatars array. Component will render nothing.");
    }

    const visibleAvatars = max ? avatars.slice(0, max) : avatars;
    const remainingCount = max && avatars.length > max ? avatars.length - max : 0;

    return (
      <div ref={ref} className={cn("flex items-center", spacingVariants[spacing], className)}>
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={avatar.key ?? avatar.alt ?? index}
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            size={size}
            shape={shape}
            className="border-2 border-background"
          />
        ))}

        {remainingCount > 0 && (
          <Avatar
            alt={`+${remainingCount} more`}
            fallback={`+${remainingCount}`}
            size={size}
            shape={shape}
            className="border-2 border-background"
          />
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export type { AvatarShape, AvatarSize };
