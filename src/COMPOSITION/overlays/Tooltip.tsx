"use client";

/**
 * Tooltip Component
 *
 * @enforcement TUNG_TOOLTIP_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use TOOLTIP_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - ALL typography values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling
 * - Tooltip has no size variants (inappropriate for small informational content)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from TOOLTIP_TOKENS.content for content styling
 * - Variant colors use semantic Tailwind classes (border-secondary/50, text-[hsl(var(--tm-accent-foreground))], etc.)
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses TOOLTIP_TOKENS.content.padding (horizontal and vertical)
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Font size uses TOOLTIP_TOKENS.content.fontSize.sm
 * - NO raw Tailwind typography classes allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses TOOLTIP_TOKENS.content.radius.md
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Tooltip uses color token system exclusively via TOOLTIP_TOKENS
 * - Spacing Authority: Tooltip uses spacing token system exclusively via TOOLTIP_TOKENS
 * - Typography Authority: Tooltip uses typography token system exclusively via TOOLTIP_TOKENS
 * - Radius Authority: Tooltip uses radius token system exclusively via TOOLTIP_TOKENS
 * - Elevation Authority: Tooltip uses shadow tokens via TOOLTIP_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in TOOLTIP_TOKENS (src/FOUNDATION/tokens/components/tooltip.ts)
 * - TOOLTIP_TOKENS reference foundation tokens from spacing, radius, color, typography, and shadow systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/typography/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant values at compile time
 */

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { getBaseValue, getDurationMs } from "@/FOUNDATION/lib/responsive-props";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { TOOLTIP_TOKENS } from "@/FOUNDATION/tokens/components/tooltip";
import type {
  ResponsiveAlignOffset,
  ResponsiveDelay,
  ResponsiveSideOffset,
} from "@/FOUNDATION/tokens/types";

import { resolveAlignOffset, resolveSideOffset } from "./utils/offset-resolution";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Tooltip variant type - Explicit union (not derived from CVA)
 */
type TooltipVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";

/**
 * Tooltip Content Variants
 *
 * NOTE: This implementation is intentionally similar to Popover but not unified.
 * Rationale (from STEP 3 & STEP 8):
 * - Tooltip and Popover serve different semantic roles (hover vs click, small vs large)
 * - Variant definitions reference different token objects (TOOLTIP_TOKENS vs POPOVER_TOKENS)
 * - Tooltip has no size variants (inappropriate for small informational content)
 * - Structural similarity is acceptable but abstraction would reduce clarity
 * - Each component's variants are tightly coupled to its specific token definitions
 */
const tooltipContentVariants = tokenCVA({
  base: `z-60 overflow-hidden ${TOOLTIP_TOKENS.content.border.default} ${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.radius.md} ${TOOLTIP_TOKENS.content.padding.horizontal} ${TOOLTIP_TOKENS.content.padding.vertical} ${TOOLTIP_TOKENS.content.fontSize.sm} ${TOOLTIP_TOKENS.content.shadow.md}`,
  variants: {
    variant: {
      primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
      secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
      accent:
        "border-[hsl(var(--tm-accent))]/50 text-[hsl(var(--tm-accent-foreground))] bg-[hsl(var(--tm-accent))]/10",
      outline:
        "bg-[hsl(var(--tm-surface-base))] text-[hsl(var(--tm-text-primary))] border-[hsl(var(--tm-border-default))]",
      ghost: "bg-transparent text-[hsl(var(--tm-text-primary))] border-transparent",
      link: "bg-transparent text-[hsl(var(--tm-primary))] border-transparent",
      destructive:
        "border-[hsl(var(--tm-destructive))]/50 text-[hsl(var(--tm-destructive))] bg-[hsl(var(--tm-destructive))]/10",
    } satisfies Record<TooltipVariant, string>,
  },
  defaultVariants: {
    variant: "primary",
  },
});

/**
 * TooltipContent - Styled tooltip content component
 *
 * Use this component directly when composing custom tooltip implementations.
 * For simpler use cases, prefer TooltipWrapper.
 */
const TooltipContent = React.forwardRef<
  HTMLDivElement,
  Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    "sideOffset" | "alignOffset"
  > & {
    variant?: TooltipVariant;
    sideOffset?: ResponsiveSideOffset;
    alignOffset?: ResponsiveAlignOffset;
  }
>(({ className, variant, sideOffset, alignOffset, ...props }, ref) => {
  // Resolve offset tokens to pixels
  // NOTE: Offset resolution pattern is intentionally duplicated in PopoverContent.
  // See STEP 3 & STEP 8 rationale - shared utility exists but component-level pattern
  // duplication is acceptable for clarity and component-specific behavior.
  const sideOffsetPx = React.useMemo(() => resolveSideOffset(sideOffset), [sideOffset]);
  const alignOffsetPx = React.useMemo(() => resolveAlignOffset(alignOffset), [alignOffset]);

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffsetPx}
      alignOffset={alignOffsetPx}
      className={cn(tooltipContentVariants({ variant }), "tm-motion-fade-scale", className)}
      {...props}
    >
      {props.children}
    </TooltipPrimitive.Content>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export interface TooltipProps {
  /**
   * Trigger element that the tooltip is attached to
   */
  children: React.ReactNode;
  /**
   * Tooltip content to display
   */
  content: React.ReactNode;
  /**
   * Visual variant of the tooltip
   * @default "primary"
   */
  variant?: TooltipVariant;
  /**
   * Side of the trigger where the tooltip appears
   * @default "top"
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Alignment of the tooltip relative to the trigger
   * @default "center"
   */
  align?: "start" | "center" | "end";
  /**
   * Side offset - token-based
   * Uses spacing tokens for positioning offsets
   */
  sideOffset?: ResponsiveSideOffset;
  /**
   * Alignment offset - token-based
   * Uses spacing tokens for positioning offsets
   */
  alignOffset?: ResponsiveAlignOffset;
  /**
   * Delay duration before tooltip appears - token-based
   * Uses motion duration tokens
   * @default 400 (milliseconds)
   */
  delayDuration?: ResponsiveDelay;
  /**
   * Skip delay duration when moving between triggers - token-based
   * Uses motion duration tokens
   * @default 300 (milliseconds)
   */
  skipDelayDuration?: ResponsiveDelay;
  /**
   * Whether the tooltip is open (controlled mode)
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether hovering over tooltip content keeps it open
   * @default false
   */
  disableHoverableContent?: boolean;
}

/**
 * TooltipWrapper - High-level tooltip component
 *
 * Provides a simple API for creating tooltips with hover behavior.
 * Handles Provider, Root, Trigger, and Content composition automatically.
 *
 * @example
 * ```tsx
 * <TooltipWrapper content="Tooltip text">
 *   <Button>Hover me</Button>
 * </TooltipWrapper>
 * ```
 */
export function TooltipWrapper({
  children,
  content,
  variant,
  side = "top",
  align = "center",
  sideOffset,
  alignOffset,
  delayDuration,
  skipDelayDuration,
  disableHoverableContent: _disableHoverableContent = false,
  open,
  onOpenChange,
}: TooltipProps) {
  // Resolve delay tokens to milliseconds
  const delayDurationMs = React.useMemo(() => {
    const baseDelay = getBaseValue(delayDuration);
    return baseDelay ? getDurationMs(baseDelay) : 400; // Default 400ms
  }, [delayDuration]);

  const skipDelayDurationMs = React.useMemo(() => {
    const baseDelay = getBaseValue(skipDelayDuration);
    return baseDelay ? getDurationMs(baseDelay) : 300; // Default 300ms
  }, [skipDelayDuration]);

  return (
    <TooltipProvider delayDuration={delayDurationMs} skipDelayDuration={skipDelayDurationMs}>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          variant={variant}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { Tooltip, TooltipContent, tooltipContentVariants, TooltipProvider, TooltipTrigger };
export type { TooltipVariant };
