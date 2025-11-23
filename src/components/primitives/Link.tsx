"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        secondary: "text-secondary-foreground underline-offset-4 hover:underline",
        accent:
          "text-accent-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-md py-sm",
        ghost:
          "text-foreground hover:text-accent-foreground hover:bg-accent rounded-md px-sm py-sm",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "text-destructive hover:text-destructive/80 underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 text-xs px-xs py-xs",
        sm: "h-8 text-xs px-sm py-xs",
        md: "h-9 text-sm px-md py-sm",
        lg: "h-10 text-sm px-lg py-sm",
        xl: "h-11 text-base px-xl py-md",
      },
    },
    defaultVariants: {
      variant: "link",
      size: "md",
    },
  },
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp className={cn(linkVariants({ variant, size, className }))} ref={ref} {...props}>
        {leftIcon && <span className="inline-flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex items-center">{rightIcon}</span>}
      </Comp>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
