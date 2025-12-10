"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-display text-foreground", {
  variants: {
    level: {
      1: "text-5xl font-bold leading-tight tracking-tight",
      2: "text-4xl font-bold leading-tight tracking-tight",
      3: "text-3xl font-semibold leading-snug tracking-normal",
      4: "text-2xl font-semibold leading-snug tracking-normal",
      5: "text-xl font-medium leading-normal tracking-normal",
      6: "text-lg font-medium leading-normal tracking-normal",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  compoundVariants: [
    {
      level: 1,
      weight: "normal",
      class: "text-5xl font-normal",
    },
    {
      level: 1,
      weight: "medium",
      class: "text-5xl font-medium",
    },
    {
      level: 1,
      weight: "semibold",
      class: "text-5xl font-semibold",
    },
    {
      level: 1,
      weight: "bold",
      class: "text-5xl font-bold",
    },
    {
      level: 2,
      weight: "normal",
      class: "text-4xl font-normal",
    },
    {
      level: 2,
      weight: "medium",
      class: "text-4xl font-medium",
    },
    {
      level: 2,
      weight: "semibold",
      class: "text-4xl font-semibold",
    },
    {
      level: 2,
      weight: "bold",
      class: "text-4xl font-bold",
    },
    {
      level: 3,
      weight: "normal",
      class: "text-3xl font-normal",
    },
    {
      level: 3,
      weight: "medium",
      class: "text-3xl font-medium",
    },
    {
      level: 3,
      weight: "semibold",
      class: "text-3xl font-semibold",
    },
    {
      level: 3,
      weight: "bold",
      class: "text-3xl font-bold",
    },
    {
      level: 4,
      weight: "normal",
      class: "text-2xl font-normal",
    },
    {
      level: 4,
      weight: "medium",
      class: "text-2xl font-medium",
    },
    {
      level: 4,
      weight: "semibold",
      class: "text-2xl font-semibold",
    },
    {
      level: 4,
      weight: "bold",
      class: "text-2xl font-bold",
    },
    {
      level: 5,
      weight: "normal",
      class: "text-xl font-normal",
    },
    {
      level: 5,
      weight: "medium",
      class: "text-xl font-medium",
    },
    {
      level: 5,
      weight: "semibold",
      class: "text-xl font-semibold",
    },
    {
      level: 5,
      weight: "bold",
      class: "text-xl font-bold",
    },
    {
      level: 6,
      weight: "normal",
      class: "text-lg font-normal",
    },
    {
      level: 6,
      weight: "medium",
      class: "text-lg font-medium",
    },
    {
      level: 6,
      weight: "semibold",
      class: "text-lg font-semibold",
    },
    {
      level: 6,
      weight: "bold",
      class: "text-lg font-bold",
    },
  ],
  defaultVariants: {
    level: 1,
    muted: false,
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, weight, muted, as, children, ...props }, ref) => {
    const Component = (as || `h${level}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, weight, muted }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
