import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const popoverContentVariants = cva(
  "z-50 w-72 rounded-md border bg-popover p-md text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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
      size: {
        xs: "w-40 p-xs",
        sm: "w-48 p-sm",
        md: "w-72 p-md",
        lg: "w-96 p-lg",
        xl: "w-[32rem] p-xl",
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
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    VariantProps<typeof popoverContentVariants>
>(({ className, variant, size, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverContentVariants({ variant, size, className }))}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: VariantProps<typeof popoverContentVariants>["variant"];
  size?: VariantProps<typeof popoverContentVariants>["size"];
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
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
