"use client";

/**
 * StickyBar Component
 *
 * StickyBar provides minimal sticky layout container for persistent actions or contextual controls
 * without managing page layout or routing.
 *
 * @enforcement TUNG_STICKYBAR_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use STICKYBAR_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (stickyBarVariants)
 * - Position variants use STICKYBAR_TOKENS.position
 * - Tone variants use STICKYBAR_TOKENS.tone
 * - zIndex uses STICKYBAR_TOKENS.zIndex (from ELEVATION_AUTHORITY)
 * - StickyBar composes Divider and Inset components (delegates styling to them)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from STICKYBAR_TOKENS.tone for tone variants
 * - Tone variants use STICKYBAR_TOKENS.tone (default, elevated, muted)
 * - NO raw Tailwind color classes (bg-red-500, text-primary, etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Spacing is delegated to Inset component
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * Elevation Authority Rules:
 * - ALL z-index values MUST come from elevation token system
 * - zIndex uses STICKYBAR_TOKENS.zIndex (zIndex.sticky from ELEVATION_AUTHORITY)
 * - NO raw Tailwind z-index classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: StickyBar uses color token system exclusively via STICKYBAR_TOKENS
 * - Spacing Authority: StickyBar uses spacing token system exclusively via Inset component
 * - Elevation Authority: StickyBar uses z-index tokens via STICKYBAR_TOKENS
 * - Layout Authority: StickyBar composes Divider and Inset components
 *
 * Token-only contract:
 * - All styling is defined in STICKYBAR_TOKENS (src/FOUNDATION/tokens/components/stickybar.ts)
 * - STICKYBAR_TOKENS reference foundation tokens from spacing, color, and elevation systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/z-index classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid position/tone values at compile time
 *
 * StickyBar IS: A thin layout wrapper for CSS sticky positioning
 * StickyBar IS NOT: A Header/Footer/Navigation replacement, a scroll listener component,
 * or a component that manages page layout or routing
 *
 * @example
 * ```tsx
 * // Basic usage (bottom sticky bar)
 * <StickyBar>
 *   <Button>Action</Button>
 * </StickyBar>
 *
 * // Top sticky bar with divider
 * <StickyBar position="top" divider>
 *   <Stack gap="sm">
 *     <Text>Contextual controls</Text>
 *   </Stack>
 * </StickyBar>
 *
 * // Elevated tone sticky bar
 * <StickyBar tone="elevated">
 *   <Button>Save</Button>
 * </StickyBar>
 * ```
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { STICKYBAR_TOKENS } from "@/FOUNDATION/tokens/components/stickybar";

import { Divider } from "../Divider";
import { Inset } from "../Inset";

/**
 * StickyBar Position Types
 *
 * Explicit union types for StickyBar component position.
 */
export type StickyBarPosition = "top" | "bottom";

/**
 * StickyBar Tone Types
 *
 * Explicit union types for StickyBar component tone variants.
 */
export type StickyBarTone = "default" | "elevated" | "muted";

/**
 * StickyBar variants using tokenCVA
 *
 * Token-based styling for:
 * - Position (top/bottom)
 * - Tone variants (default, elevated, muted)
 */
const stickyBarVariants = tokenCVA({
  base: "w-full",
  variants: {
    /**
     * Position of the sticky bar
     */
    position: {
      top: STICKYBAR_TOKENS.position.top,
      bottom: STICKYBAR_TOKENS.position.bottom,
    } satisfies Record<StickyBarPosition, string>,
    /**
     * Tone variant (background and elevation)
     */
    tone: {
      default: STICKYBAR_TOKENS.tone.default,
      elevated: STICKYBAR_TOKENS.tone.elevated,
      muted: STICKYBAR_TOKENS.tone.muted,
    } satisfies Record<StickyBarTone, string>,
  },
  defaultVariants: {
    position: "bottom",
    tone: "default",
  },
});

export interface StickyBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the sticky bar
   * @default "bottom"
   */
  position?: StickyBarPosition;

  /**
   * Tone variant (background and elevation)
   * @default "default"
   */
  tone?: StickyBarTone;

  /**
   * Add divider on the sticking edge
   * When true, renders Divider at the sticking edge (top for position="top", bottom for position="bottom")
   * @default false
   */
  divider?: boolean;

  /**
   * Component children
   */
  children: React.ReactNode;
}

/**
 * StickyBar component - sticky layout container
 */
const StickyBar = React.forwardRef<HTMLDivElement, StickyBarProps>(
  (
    {
      position = "bottom",
      tone = "default",
      divider = false,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const baseClassName = stickyBarVariants({ position, tone });

    // Map StickyBar tone to Divider tone
    // Default tone maps to "border", elevated/muted map to their respective tones
    let dividerTone: "border" | "muted" | "primary" | "secondary" | "accent" = "border";
    if (tone === "muted") {
      dividerTone = "muted";
    }

    // Apply z-index via inline style (zIndex.sticky = 20 from ELEVATION_AUTHORITY)
    const inlineStyles: React.CSSProperties = {
      zIndex: STICKYBAR_TOKENS.zIndex, // zIndex.sticky from ELEVATION_AUTHORITY
      ...style,
    };

    return (
      <div ref={ref} className={cn(baseClassName, className)} style={inlineStyles} {...props}>
        {divider && position === "top" && <Divider tone={dividerTone} />}
        <Inset padding="md">{children}</Inset>
        {divider && position === "bottom" && <Divider tone={dividerTone} />}
      </div>
    );
  },
);

StickyBar.displayName = "StickyBar";

export { StickyBar, stickyBarVariants };
