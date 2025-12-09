"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { BUTTON_TOKENS } from "@/tokens/components/button";

const buttonVariants = cva(
  `inline-flex items-center justify-center ${BUTTON_TOKENS.gap} whitespace-nowrap ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.fontSize.md} font-medium ${BUTTON_TOKENS.transition.colors} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:${BUTTON_TOKENS.iconSize} [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        primary: `${BUTTON_TOKENS.variant.primary.background} ${BUTTON_TOKENS.variant.primary.text} ${BUTTON_TOKENS.shadow.primary} ${BUTTON_TOKENS.variant.primary.hover}`,
        secondary: `${BUTTON_TOKENS.variant.secondary.background} ${BUTTON_TOKENS.variant.secondary.text} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.secondary.hover}`,
        accent: `${BUTTON_TOKENS.variant.accent.background} ${BUTTON_TOKENS.variant.accent.text} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.accent.hover}`,
        outline: `${BUTTON_TOKENS.variant.outline.border} ${BUTTON_TOKENS.variant.outline.background} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.outline.hover.background} ${BUTTON_TOKENS.variant.outline.hover.text}`,
        ghost: `${BUTTON_TOKENS.variant.ghost.hover.background} ${BUTTON_TOKENS.variant.ghost.hover.text}`,
        destructive: `${BUTTON_TOKENS.variant.destructive.background} ${BUTTON_TOKENS.variant.destructive.text} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.destructive.hover}`,
      },
      size: {
        sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.sm} ${BUTTON_TOKENS.padding.vertical.sm} ${BUTTON_TOKENS.fontSize.sm}`,
        md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.md} ${BUTTON_TOKENS.padding.vertical.md} ${BUTTON_TOKENS.fontSize.md}`,
        lg: `${BUTTON_TOKENS.height.lg} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.lg} ${BUTTON_TOKENS.padding.vertical.md} ${BUTTON_TOKENS.fontSize.lg}`,
        icon: `${BUTTON_TOKENS.height.icon} ${BUTTON_TOKENS.width.icon}`,
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
