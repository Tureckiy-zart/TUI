"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { DIVIDER_TOKENS } from "@/tokens/components/divider";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", variant = "solid", ...props }, ref) => {
    const borderStyle = {
      solid: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border-border",
          orientation === "horizontal"
            ? `${DIVIDER_TOKENS.width.full} border-t ${borderStyle[variant]}`
            : `${DIVIDER_TOKENS.height.full} border-l ${borderStyle[variant]}`,
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";

export { Divider };
