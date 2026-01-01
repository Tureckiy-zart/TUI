"use client";

/**
 * StickyBar Component
 *
 * StickyBar provides minimal sticky layout container for persistent actions or contextual controls
 * without managing page layout or routing.
 *
 * StickyBar IS: A thin layout wrapper for CSS sticky positioning
 * StickyBar IS NOT: A Header/Footer/Navigation replacement, a scroll listener component,
 * or a component that manages page layout or routing
 *
 * All styling uses tokens exclusively (no raw CSS values).
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
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses CSS sticky positioning (no JS-driven behavior)
 * - ✅ Composes Inset for internal spacing
 * - ✅ Composes Divider for visual separation
 * - ✅ Motion: NO MOTION BY DESIGN (pure layout wrapper, no state/spatial changes)
 * - ✅ Explicit union types (StickyBarPosition, StickyBarTone)
 * - ✅ Type constraints (satisfies Record<Type, string>)
 * - ✅ Does NOT duplicate Header/Footer/Navigation functionality
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
