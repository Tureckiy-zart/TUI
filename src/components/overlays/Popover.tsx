"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { getBaseValue, getSpacingPx } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { POPOVER_TOKENS } from "@/tokens/components/popover";
import type { ResponsiveAlignOffset, ResponsiveSideOffset } from "@/tokens/types";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

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
  const sideOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(sideOffset);
    return baseOffset ? getSpacingPx(baseOffset) : 4; // Default 4px
  }, [sideOffset]);

  const alignOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(alignOffset);
    return baseOffset ? getSpacingPx(baseOffset) : undefined;
  }, [alignOffset]);

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
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: VariantProps<typeof popoverContentVariants>["variant"];
  size?: VariantProps<typeof popoverContentVariants>["size"];
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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  closeOnInteractOutside?: boolean;
}

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
