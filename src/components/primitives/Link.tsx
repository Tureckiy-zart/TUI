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
        default: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        destructive:
          "text-destructive hover:text-destructive/80 underline-offset-4 hover:underline",
        ghost:
          "text-foreground hover:text-accent-foreground hover:bg-accent rounded-md px-sm py-sm",
        secondary: "text-secondary-foreground underline-offset-4 hover:underline",
        button: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
        "button-outline":
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
        "button-secondary":
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
      },
      size: {
        default: "h-10 px-md py-sm",
        sm: "h-9 px-sm",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        none: "h-auto px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "none",
    },
  },
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return <Comp className={cn(linkVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
