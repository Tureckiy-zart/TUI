"use client";

import React from 'react';
import { Skeleton } from '@/components/feedback/Skeleton';
import { cn } from '@/lib/utils';

interface EventCardSkeletonProps {
  className?: string;
}

export const EventCardSkeleton: React.FC<EventCardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4",
      className
    )}>
      <Skeleton className="w-full h-48 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};
