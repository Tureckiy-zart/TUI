"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const codeVariants = cva("font-mono text-foreground", {
  variants: {
    variant: {
      inline: "rounded bg-muted px-xs py-0.5 text-sm font-semibold",
      block: "block rounded-md bg-muted p-md text-sm font-semibold",
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
