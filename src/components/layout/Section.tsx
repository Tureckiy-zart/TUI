"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
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
  const paddingClasses = {
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

  return (
    <Component
      className={cn("w-full", paddingClasses[padding], backgroundClasses[background], className)}
    >
      {children}
    </Component>
  );
};
