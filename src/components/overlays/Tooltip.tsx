"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { getBaseValue, getDurationMs, getSpacingPx } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { TOOLTIP_TOKENS } from "@/tokens/components/tooltip";
import type { ResponsiveAlignOffset, ResponsiveDelay, ResponsiveSideOffset } from "@/tokens/types";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipContentVariants = cva(
  `z-50 overflow-hidden ${TOOLTIP_TOKENS.content.border.default} ${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.radius.md} ${TOOLTIP_TOKENS.content.padding.horizontal} ${TOOLTIP_TOKENS.content.padding.vertical} ${TOOLTIP_TOKENS.content.fontSize.sm} ${TOOLTIP_TOKENS.content.shadow.md}`,
  {
    variants: {
      variant: {
        primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
        secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
        accent: "border-accent/50 text-accent-foreground bg-accent/10",
        outline: "bg-background text-foreground border-border",
        ghost: "bg-transparent text-foreground border-transparent",
        link: "bg-transparent text-primary border-transparent",
        destructive: "border-destructive/50 text-destructive bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    "sideOffset" | "alignOffset"
  > &
    VariantProps<typeof tooltipContentVariants> & {
      sideOffset?: ResponsiveSideOffset;
      alignOffset?: ResponsiveAlignOffset;
    }
>(({ className, variant, sideOffset, alignOffset, ...props }, ref) => {
  // Resolve offset tokens to pixels
  const sideOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(sideOffset);
    return baseOffset ? getSpacingPx(baseOffset) : 4; // Default 4px
  }, [sideOffset]);

  const alignOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(alignOffset);
    return baseOffset ? getSpacingPx(baseOffset) : undefined;
  }, [alignOffset]);

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
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: VariantProps<typeof tooltipContentVariants>["variant"];
  side?: "top" | "right" | "bottom" | "left";
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
   * Delay duration - token-based
   * Uses motion duration tokens
   */
  delayDuration?: ResponsiveDelay;
  /**
   * Skip delay duration - token-based
   * Uses motion duration tokens
   */
  skipDelayDuration?: ResponsiveDelay;
  disableHoverableContent?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

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
