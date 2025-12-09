"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-sm py-xs text-sm text-popover-foreground shadow-md",
  {
    variants: {
      variant: {
        primary: "bg-popover text-popover-foreground border-border",
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
