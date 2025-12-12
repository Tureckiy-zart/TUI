"use client";

import React from "react";

import { getBaseValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";

import type { ResponsiveSpacing, SpacingValue } from "./layout.types";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  /**
   * Padding (all sides) - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl) or "none"
   * @default "md"
   */
  padding?: ResponsiveSpacing | "none";
  background?: "default" | "muted" | "card";
  as?: keyof React.JSX.IntrinsicElements;
}

export const Section: React.FC<SectionProps> = ({
  className,
  children,
  padding = "md",
  background = "default",
  as: Component = "section",
}) => {
  // Get base value from ResponsiveSpacing (handles both simple values and responsive objects)
  const paddingValue = padding === "none" ? "none" : (getBaseValue<SpacingValue>(padding) ?? "md");

  const paddingClasses: Record<string, string> = {
    none: "",
    sm: "py-md",
    md: "py-xl",
    lg: "py-3xl",
    xl: "py-4xl",
  };

  const backgroundClasses = {
    default: "",
    muted: "bg-muted",
    card: "bg-card",
  };

  // Convert spacing token to string for lookup
  const paddingKey = typeof paddingValue === "string" ? paddingValue : String(paddingValue);
  const paddingClass = paddingClasses[paddingKey] || paddingClasses.md;

  return (
    <Component className={cn("w-full", paddingClass, backgroundClasses[background], className)}>
      {children}
    </Component>
  );
};
