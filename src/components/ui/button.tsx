"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { BUTTON_TOKENS } from "@/tokens/components/button";

const buttonVariants = cva(
  `inline-flex items-center justify-center ${BUTTON_TOKENS.gap} whitespace-nowrap ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.fontSize.md} font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:${BUTTON_TOKENS.iconSize} [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        primary: `bg-primary text-primary-foreground ${BUTTON_TOKENS.shadow.primary} hover:bg-primary/90`,
        secondary: `bg-secondary text-secondary-foreground ${BUTTON_TOKENS.shadow.default} hover:bg-secondary/80`,
        accent: `bg-accent text-accent-foreground ${BUTTON_TOKENS.shadow.default} hover:bg-accent/90`,
        outline: `border border-input bg-background ${BUTTON_TOKENS.shadow.default} hover:bg-accent hover:text-accent-foreground`,
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: `bg-destructive text-destructive-foreground ${BUTTON_TOKENS.shadow.default} hover:bg-destructive/90`,
      },
      size: {
        sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.sm} ${BUTTON_TOKENS.padding.vertical.sm} ${BUTTON_TOKENS.fontSize.sm}`,
        md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.md} ${BUTTON_TOKENS.padding.vertical.md} ${BUTTON_TOKENS.fontSize.md}`,
        lg: `${BUTTON_TOKENS.height.lg} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.lg} ${BUTTON_TOKENS.padding.vertical.md} ${BUTTON_TOKENS.fontSize.lg}`,
        icon: `${BUTTON_TOKENS.height.icon} w-9`,
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {leftIcon && <span className="inline-flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex items-center">{rightIcon}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
