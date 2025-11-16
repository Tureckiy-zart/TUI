"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TrendingIconProps {
  className?: string;
}

export const TrendingIcon: React.FC<TrendingIconProps> = ({ className }) => {
  return (
    <div className={cn(
      "w-6 h-6 bg-primary rounded-full flex items-center justify-center",
      className
    )}>
      <span className="text-white text-sm">↑</span>
    </div>
  );
};
