"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={cn("animate-pulse rounded bg-muted", className)} />;
};
