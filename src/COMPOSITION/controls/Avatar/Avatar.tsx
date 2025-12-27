"use client";

/**
 * Avatar Component
 *
 * Displays user profile images with automatic fallback to initials or icon.
 * Supports multiple sizes, shapes, and status indicators.
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" size="md" />
 *
 * // With fallback initials
 * <Avatar alt="Jane Smith" size="lg" />
 *
 * // With status indicator
 * <Avatar src="/user.jpg" alt="Bob Wilson" status="online" />
 *
 * // With custom fallback
 * <Avatar alt="Alice" fallback={<UserIcon />} />
 * ```
 */

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import {
  avatarFallbackVariants,
  avatarImageVariants,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
  avatarStatusVariants,
  avatarVariants,
} from "./avatar-variants";

/**
 * Extract initials from a name string.
 * Takes first letter of first word and first letter of last word.
 *
 * @param name - Full name string
 * @returns Initials (uppercase, 1-2 characters)
 *
 * @example
 * ```ts
 * getInitials("John Doe")      // => "JD"
 * getInitials("Alice")          // => "A"
 * getInitials("Bob Smith Jr")   // => "BJ"
 * getInitials("")               // => ""
 * ```
 *
 * @internal
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export interface AvatarProps {
  /**
   * Image source URL
   * @optional If not provided or fails to load, fallback is shown
   */
  src?: string;

  /**
   * Alt text for image (required for accessibility)
   * Used to extract initials if no fallback provided
   * @required
   * @example "John Doe" → initials "JD"
   */
  alt: string;

  /**
   * Avatar size
   * @default "md"
   */
  size?: AvatarSize;

  /**
   * Avatar shape
   * @default "circle"
   */
  shape?: AvatarShape;

  /**
   * Custom fallback content (overrides initials extraction)
   * @optional Can be initials string or React element (e.g., icon)
   */
  fallback?: React.ReactNode;

  /**
   * Status indicator
   * @optional Shows colored dot at bottom-right
   */
  status?: AvatarStatus | null;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Avatar component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Delegates behavior to Radix UI (@radix-ui/react-avatar)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Token-based sizing (h-*, w-*)
 * - ✅ Token-based radius (rounded-full, rounded-md)
 * - ✅ Token-based colors (bg-muted, text-muted-foreground, bg-semantic-*)
 * - ✅ Enhanced accessibility with computed aria-label
 */
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ src, alt, size = "md", shape = "circle", fallback, status, className }, ref) => {
    const initials = React.useMemo(() => getInitials(alt), [alt]);

    // Compute aria-label for screen readers (includes status if present)
    const ariaLabel = React.useMemo(() => {
      return status ? `${alt} (${status})` : alt;
    }, [alt, status]);

    return (
      <AvatarPrimitive.Root
        ref={ref}
        aria-label={ariaLabel}
        className={cn(avatarVariants({ size, shape }), className)}
      >
        {src && <AvatarPrimitive.Image src={src} alt={alt} className={avatarImageVariants()} />}

        <AvatarPrimitive.Fallback className={avatarFallbackVariants({ size })} delayMs={0}>
          {fallback ?? initials}
        </AvatarPrimitive.Fallback>

        {status && (
          <span
            className={avatarStatusVariants({ size, status })}
            aria-label={`Status: ${status}`}
          />
        )}
      </AvatarPrimitive.Root>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
export type { AvatarShape, AvatarSize, AvatarStatus };
