"use client";

import React from "react";

import { Skeleton } from "@/components/feedback/Skeleton";
import { cn } from "@/lib/utils";

interface VenueCardSkeletonProps {
  className?: string;
}

export const VenueCardSkeleton: React.FC<VenueCardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn("rounded-lg bg-background p-md shadow-md", className)}>
      <Skeleton className="mb-md h-48 w-full" />
      <Skeleton className="mb-sm h-6 w-3/4" />
      <Skeleton className="mb-sm h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};
