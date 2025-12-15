"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { CODE_TOKENS } from "@/tokens/components/code";
import { TEXT_TOKENS } from "@/tokens/components/text";

const codeVariants = cva("font-mono text-foreground", {
  variants: {
    variant: {
      inline: `${CODE_TOKENS.radius.inline} ${CODE_TOKENS.background.muted} ${CODE_TOKENS.padding.inline} ${TEXT_TOKENS.fontSize.sm} ${TEXT_TOKENS.fontWeight.semibold}`,
      block: `block ${CODE_TOKENS.radius.block} ${CODE_TOKENS.background.muted} ${CODE_TOKENS.padding.block} ${TEXT_TOKENS.fontSize.sm} ${TEXT_TOKENS.fontWeight.semibold}`,
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    variant: "inline",
    muted: false,
  },
});

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  as?: "code" | "pre";
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, muted, as, children, ...props }, ref) => {
    const Component = as || (variant === "block" ? "pre" : "code");

    return (
      <Component
        ref={ref as any}
        className={cn(codeVariants({ variant, muted }), className)}
        {...props}
      >
        {variant === "block" ? <code>{children}</code> : children}
      </Component>
    );
  },
);
Code.displayName = "Code";

export { Code, codeVariants };
