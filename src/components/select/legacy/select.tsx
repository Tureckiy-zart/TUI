"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { INPUT_TOKENS } from "@/tokens/components/input";

const selectVariants = cva(
  `flex w-full appearance-none ${INPUT_TOKENS.shadow} transition-colors disabled:cursor-not-allowed focus-visible:outline-none [&>option]:bg-background [&>option]:text-foreground`,
  {
    variants: {
      size: {
        sm: `${INPUT_TOKENS.size.sm.height} ${INPUT_TOKENS.size.sm.padding.horizontal} ${INPUT_TOKENS.size.sm.padding.vertical} ${INPUT_TOKENS.size.sm.radius} ${INPUT_TOKENS.size.sm.fontSize}`,
        md: `${INPUT_TOKENS.size.md.height} ${INPUT_TOKENS.size.md.padding.horizontal} ${INPUT_TOKENS.size.md.padding.vertical} ${INPUT_TOKENS.size.md.radius} ${INPUT_TOKENS.size.md.fontSize} ${INPUT_TOKENS.size.md.fontSizeResponsive}`,
        lg: `${INPUT_TOKENS.size.lg.height} ${INPUT_TOKENS.size.lg.padding.horizontal} ${INPUT_TOKENS.size.lg.padding.vertical} ${INPUT_TOKENS.size.lg.radius} ${INPUT_TOKENS.size.lg.fontSize}`,
      },
      state: {
        default: `${INPUT_TOKENS.state.border.default} ${INPUT_TOKENS.state.background.default} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.border.focus}`,
        error: `${INPUT_TOKENS.state.border.error} ${INPUT_TOKENS.state.background.default} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.border.focus}`,
        disabled: `${INPUT_TOKENS.state.border.disabled} ${INPUT_TOKENS.state.background.disabled} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.text.disabled}`,
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
