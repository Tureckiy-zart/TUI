"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";
import type { ResponsiveAlignOffset, ResponsiveSideOffset } from "@/FOUNDATION/tokens/types";

import { resolveAlignOffset, resolveSideOffset } from "./utils/offset-resolution";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * Popover Content Variants
 *
 * NOTE: This implementation is intentionally similar to Tooltip but not unified.
 * Rationale (from STEP 3 & STEP 8):
 * - Popover and Tooltip serve different semantic roles (click vs hover, large vs small)
 * - Variant definitions reference different token objects (POPOVER_TOKENS vs TOOLTIP_TOKENS)
 * - Popover has size variants (xs, sm, md, lg, xl) which Tooltip doesn't need
 * - Structural similarity is acceptable but abstraction would reduce clarity
 * - Each component's variants are tightly coupled to its specific token definitions
 */
const popoverContentVariants = cva(
  `z-50 ${POPOVER_TOKENS.content.border.default} ${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} outline-none ${POPOVER_TOKENS.content.radius.md} ${POPOVER_TOKENS.content.shadow.md}`,
  {
    variants: {
      variant: {
        primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
        secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
        accent: "border-accent/50 text-accent-foreground bg-accent/10",
        outline: "bg-background text-foreground border-border",
        ghost: "bg-transparent text-foreground border-transparent",
        link: "bg-transparent text-primary border-transparent",
        destructive: "border-destructive/50 text-destructive bg-destructive/10",
      },
      size: {
        xs: `${POPOVER_TOKENS.content.width.xs} ${POPOVER_TOKENS.content.padding.sm}`,
        sm: `${POPOVER_TOKENS.content.width.sm} ${POPOVER_TOKENS.content.padding.sm}`,
        md: `${POPOVER_TOKENS.content.width.md} ${POPOVER_TOKENS.content.padding.md}`,
        lg: `${POPOVER_TOKENS.content.width.lg} ${POPOVER_TOKENS.content.padding.lg}`,
        xl: `${POPOVER_TOKENS.content.width.xl} ${POPOVER_TOKENS.content.padding.lg}`,
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/**
 * Popover variant type
 */
type PopoverVariant = VariantProps<typeof popoverContentVariants>["variant"];

/**
 * Popover size type
 */
type PopoverSize = VariantProps<typeof popoverContentVariants>["size"];

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
  > &
    VariantProps<typeof popoverContentVariants> & {
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
