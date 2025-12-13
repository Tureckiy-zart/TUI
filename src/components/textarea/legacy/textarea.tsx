"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TEXTAREA_TOKENS } from "@/tokens/components/textarea";

const textareaVariants = cva(
  `flex w-full min-h-[80px] ${TEXTAREA_TOKENS.shadow} transition-colors disabled:cursor-not-allowed focus-visible:outline-none resize-y`,
  {
    variants: {
      size: {
        sm: `${TEXTAREA_TOKENS.size.sm.padding.horizontal} ${TEXTAREA_TOKENS.size.sm.padding.vertical} ${TEXTAREA_TOKENS.size.sm.radius} ${TEXTAREA_TOKENS.size.sm.fontSize}`,
        md: `${TEXTAREA_TOKENS.size.md.padding.horizontal} ${TEXTAREA_TOKENS.size.md.padding.vertical} ${TEXTAREA_TOKENS.size.md.radius} ${TEXTAREA_TOKENS.size.md.fontSize} ${TEXTAREA_TOKENS.size.md.fontSizeResponsive}`,
        lg: `${TEXTAREA_TOKENS.size.lg.padding.horizontal} ${TEXTAREA_TOKENS.size.lg.padding.vertical} ${TEXTAREA_TOKENS.size.lg.radius} ${TEXTAREA_TOKENS.size.lg.fontSize}`,
      },
      state: {
        default: `${TEXTAREA_TOKENS.state.border.default} ${TEXTAREA_TOKENS.state.background.default} ${TEXTAREA_TOKENS.state.text.default} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.state.border.focus}`,
        error: `${TEXTAREA_TOKENS.state.border.error} ${TEXTAREA_TOKENS.state.background.default} ${TEXTAREA_TOKENS.state.text.default} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.state.border.focus}`,
        disabled: `${TEXTAREA_TOKENS.state.border.disabled} ${TEXTAREA_TOKENS.state.background.disabled} ${TEXTAREA_TOKENS.state.text.default} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.state.text.disabled}`,
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, state, fullWidth, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, state, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
