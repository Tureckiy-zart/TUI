"use client";

/**
 * Avatar Component
 *
 * Displays user profile images with automatic fallback to initials or icon.
 * Supports multiple sizes, shapes, and status indicators.
 *
 * @enforcement TUNG_AVATAR_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use AVATAR_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL typography values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling
 * - Size variants use AVATAR_TOKENS.size
 * - Shape variants use AVATAR_TOKENS.shape
 * - Status variants use AVATAR_TOKENS.statusSize and statusColor
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from AVATAR_TOKENS for fallback and status styling
 * - Fallback colors use AVATAR_TOKENS.fallbackColors (bg and text)
 * - Status colors use AVATAR_TOKENS.statusColor (online, offline, busy)
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Size uses AVATAR_TOKENS.size[size] (maps to h-* w-* spacing tokens)
 * - Status size uses AVATAR_TOKENS.statusSize[size]
 * - NO raw Tailwind spacing classes (h-10, w-10, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Fallback text size uses AVATAR_TOKENS.fallbackTextSize[size]
 * - NO raw Tailwind typography classes allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Shape uses AVATAR_TOKENS.shape (circle or square)
 * - NO raw Tailwind radius classes (rounded-full, rounded-md, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Color Authority: Avatar uses color token system exclusively via AVATAR_TOKENS
 * - Spacing Authority: Avatar uses spacing token system exclusively via AVATAR_TOKENS
 * - Typography Authority: Avatar uses typography token system exclusively via AVATAR_TOKENS
 * - Radius Authority: Avatar uses radius token system exclusively via AVATAR_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in AVATAR_TOKENS (src/FOUNDATION/tokens/components/avatar.ts)
 * - AVATAR_TOKENS reference foundation tokens from spacing, radius, color, and typography systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/typography/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid size/shape/status values at compile time
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
  if (words.length === 1) return words[0]?.charAt(0).toUpperCase() ?? "";
  const first = words[0]?.charAt(0) ?? "";
  const last = words[words.length - 1]?.charAt(0) ?? "";
  return (first + last).toUpperCase();
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
 * - ✅ Token-based colors (bg-[hsl(var(--tm-muted))], text-[hsl(var(--tm-text-muted))], bg-success/bg-warning)
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
