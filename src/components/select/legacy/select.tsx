"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { SELECT_TOKENS } from "@/tokens/components/select";

const selectVariants = cva(
  `flex w-full appearance-none transition-colors disabled:cursor-not-allowed focus-visible:outline-none [&>option]:bg-background [&>option]:text-foreground`,
  {
    variants: {
      size: {
        sm: `${SELECT_TOKENS.trigger.height.sm} ${SELECT_TOKENS.trigger.padding.horizontal.sm} ${SELECT_TOKENS.trigger.padding.vertical.sm} ${SELECT_TOKENS.trigger.radius.sm} ${SELECT_TOKENS.trigger.fontSize.sm}`,
        md: `${SELECT_TOKENS.trigger.height.md} ${SELECT_TOKENS.trigger.padding.horizontal.md} ${SELECT_TOKENS.trigger.padding.vertical.md} ${SELECT_TOKENS.trigger.radius.md} ${SELECT_TOKENS.trigger.fontSize.md}`,
        lg: `${SELECT_TOKENS.trigger.height.lg} ${SELECT_TOKENS.trigger.padding.horizontal.lg} ${SELECT_TOKENS.trigger.padding.vertical.lg} ${SELECT_TOKENS.trigger.radius.lg} ${SELECT_TOKENS.trigger.fontSize.lg}`,
      },
      state: {
        default: `${SELECT_TOKENS.state.default.border} ${SELECT_TOKENS.state.default.background} ${SELECT_TOKENS.state.default.text}`,
        error: `${SELECT_TOKENS.state.default.border} ${SELECT_TOKENS.state.default.background} ${SELECT_TOKENS.state.default.text}`,
        disabled: `${SELECT_TOKENS.state.disabled.border} ${SELECT_TOKENS.state.disabled.background} ${SELECT_TOKENS.state.disabled.text}`,
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      fullWidth: true,
    },
  },
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, state, fullWidth, children, ...props }, ref) => {
    return (
      <select
        className={cn(selectVariants({ size, state, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = "Select";

export { Select, selectVariants };
