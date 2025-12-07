"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto px-md", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
    },
    padding: {
      none: "px-0",
      sm: "px-sm",
      md: "px-md",
      lg: "px-lg",
      xl: "px-xl",
    },
  },
  defaultVariants: {
    size: "7xl",
    padding: "md",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(containerVariants({ size, padding, className }))} {...props} />
    );
  },
);
Container.displayName = "Container";

export { Container, containerVariants };
