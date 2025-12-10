"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { INPUT_TOKENS } from "@/tokens/components/input";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
}

// Full height token (equivalent to h-full)
const FULL_HEIGHT = "h-full";

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
            ? `${INPUT_TOKENS.width.full} border-t ${borderStyle[variant]}`
            : `${FULL_HEIGHT} border-l ${borderStyle[variant]}`,
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";

export { Divider };
