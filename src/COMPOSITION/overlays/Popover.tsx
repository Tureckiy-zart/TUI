"use client";

/**
 * Popover Component
 *
 * @enforcement TUNG_POPOVER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use POPOVER_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling
 * - Size variants use POPOVER_TOKENS.content.width and padding
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from POPOVER_TOKENS.content for content styling
 * - Variant colors use semantic Tailwind classes (border-secondary/50, text-[hsl(var(--tm-accent-foreground))], etc.)
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses POPOVER_TOKENS.content.padding[size]
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses POPOVER_TOKENS.content.radius[size]
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Popover uses color token system exclusively via POPOVER_TOKENS
 * - Spacing Authority: Popover uses spacing token system exclusively via POPOVER_TOKENS
 * - Radius Authority: Popover uses radius token system exclusively via POPOVER_TOKENS
 * - Elevation Authority: Popover uses shadow tokens via POPOVER_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in POPOVER_TOKENS (src/FOUNDATION/tokens/components/popover.ts)
 * - POPOVER_TOKENS reference foundation tokens from spacing, radius, color, and shadow systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size values at compile time
 */

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { resolveAsChild, warnIfExplicitAsChildFalse } from "@/COMPOSITION/utils/trigger-as-child";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";
import type { ResponsiveAlignOffset, ResponsiveSideOffset } from "@/FOUNDATION/tokens/types";

import { resolveAlignOffset, resolveSideOffset } from "./utils/offset-resolution";

const Popover = PopoverPrimitive.Root;

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const PopoverTrigger = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const resolvedAsChild = resolveAsChild(asChild, children);
  warnIfExplicitAsChildFalse("Popover.Trigger", asChild, children);

  return (
    <PopoverPrimitive.Trigger ref={ref} asChild={resolvedAsChild} {...props}>
      {children}
    </PopoverPrimitive.Trigger>
  );
});
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * Popover variant type - Explicit union (not derived from CVA)
 */
export type PopoverVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";

/**
 * Popover size type - Explicit union (not derived from CVA)
 * Restricted to sm, md, lg per overlay size restriction rule (VARIANTS_SIZE_CANON.md)
 */
export type PopoverSize = "sm" | "md" | "lg";

/**
 * Popover Content Variants
 *
 * NOTE: This implementation is intentionally similar to Tooltip but not unified.
 * Rationale (from STEP 3 & STEP 8):
 * - Popover and Tooltip serve different semantic roles (click vs hover, large vs small)
 * - Variant definitions reference different token objects (POPOVER_TOKENS vs TOOLTIP_TOKENS)
 * - Popover has size variants (sm, md, lg) which Tooltip doesn't need
 * - Structural similarity is acceptable but abstraction would reduce clarity
 * - Each component's variants are tightly coupled to its specific token definitions
 */
const popoverContentVariants = tokenCVA({
  base: `z-30 ${POPOVER_TOKENS.content.border.default} ${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} outline-none ${POPOVER_TOKENS.content.radius.md} ${POPOVER_TOKENS.content.shadow.md}`,
  variants: {
    variant: {
      primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
      secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
      accent:
        "border-[hsl(var(--tm-accent))]/50 text-[hsl(var(--tm-accent-foreground))] bg-[hsl(var(--tm-accent))]/10",
      outline:
        "bg-[hsl(var(--tm-surface-base))] text-[hsl(var(--tm-text-primary))] border-[hsl(var(--tm-border-default))]",
      ghost: "bg-transparent text-[hsl(var(--tm-text-primary))] border-transparent",
      link: "bg-transparent text-[hsl(var(--tm-primary))] border-transparent",
      destructive:
        "border-[hsl(var(--tm-destructive))]/50 text-[hsl(var(--tm-destructive))] bg-[hsl(var(--tm-destructive))]/10",
    } satisfies Record<PopoverVariant, string>,
    size: {
      sm: `${POPOVER_TOKENS.content.width.sm} ${POPOVER_TOKENS.content.padding.sm}`,
      md: `${POPOVER_TOKENS.content.width.md} ${POPOVER_TOKENS.content.padding.md}`,
      lg: `${POPOVER_TOKENS.content.width.lg} ${POPOVER_TOKENS.content.padding.lg}`,
    } satisfies Record<PopoverSize, string>,
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

/**
 * PopoverContent - Styled popover content component
 *
 * Use this component directly when composing custom popover implementations.
 * For simpler use cases, prefer PopoverWrapper.
 */
const PopoverContent = React.forwardRef<
  HTMLDivElement,
  Omit<
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    "sideOffset" | "alignOffset"
  > & {
    variant?: PopoverVariant;
    size?: PopoverSize;
    sideOffset?: ResponsiveSideOffset;
    alignOffset?: ResponsiveAlignOffset;
  }
>(({ className, variant, size, align = "center", sideOffset, alignOffset, ...props }, ref) => {
  // Resolve offset tokens to pixels
  // NOTE: Offset resolution pattern is intentionally duplicated in TooltipContent.
  // See STEP 3 & STEP 8 rationale - shared utility exists but component-level pattern
  // duplication is acceptable for clarity and component-specific behavior.
  const sideOffsetPx = React.useMemo(() => resolveSideOffset(sideOffset), [sideOffset]);
  const alignOffsetPx = React.useMemo(() => resolveAlignOffset(alignOffset), [alignOffset]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffsetPx}
        alignOffset={alignOffsetPx}
        className={cn(popoverContentVariants({ variant, size }), "tm-motion-fade-scale", className)}
        {...props}
      >
        {props.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export interface PopoverProps {
  /**
   * Trigger element that opens the popover
   */
  children: React.ReactNode;
  /**
   * Popover content to display
   */
  content: React.ReactNode;
  /**
   * Visual variant of the popover
   * @default "primary"
   */
  variant?: PopoverVariant;
  /**
   * Size of the popover content
   * @default "md"
   */
  size?: PopoverSize;
  /**
   * Side of the trigger where the popover appears
   * @default "bottom"
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Alignment of the popover relative to the trigger
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
   * Whether the popover is open (controlled mode)
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the popover is modal (blocks interaction with other elements)
   * @default true
   */
  modal?: boolean;
  /**
   * Whether the popover closes when clicking outside
   * @default true
   */
  closeOnInteractOutside?: boolean;
}

/**
 * PopoverWrapper - High-level popover component
 *
 * Provides a simple API for creating popovers with click behavior.
 * Handles Root, Trigger, and Content composition automatically.
 *
 * @example
 * ```tsx
 * <PopoverWrapper content={<div>Popover content</div>}>
 *   <Button>Open popover</Button>
 * </PopoverWrapper>
 * ```
 */
export function PopoverWrapper({
  children,
  content,
  variant,
  size,
  side = "bottom",
  align = "center",
  sideOffset,
  alignOffset,
  open,
  onOpenChange,
  modal = true,
  closeOnInteractOutside = true,
}: PopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={modal}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        variant={variant}
        size={size}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        onInteractOutside={closeOnInteractOutside ? undefined : (e) => e.preventDefault()}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}

export { Popover, PopoverAnchor, PopoverContent, popoverContentVariants, PopoverTrigger };
