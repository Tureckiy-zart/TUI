"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100, className }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("h-2 w-full rounded-full bg-secondary", className)}>
      <div
        className="h-2 rounded-full bg-primary transition-[width] duration-normal"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
