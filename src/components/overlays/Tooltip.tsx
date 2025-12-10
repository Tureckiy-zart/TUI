"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TOOLTIP_TOKENS } from "@/tokens/components/tooltip";

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
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipContentVariants>
>(({ className, variant, sideOffset = 4, ...props }, ref) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
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
  sideOffset?: number;
  alignOffset?: number;
  delayDuration?: number;
  skipDelayDuration?: number;
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
  delayDuration = 400,
  skipDelayDuration = 300,
  disableHoverableContent: _disableHoverableContent = false,
  open,
  onOpenChange,
}: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
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
