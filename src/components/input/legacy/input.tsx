"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { INPUT_TOKENS } from "@/tokens/components/input";

const inputVariants = cva(
  `flex w-full ${INPUT_TOKENS.shadow} transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed focus-visible:outline-none`,
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, state, fullWidth, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, state, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
