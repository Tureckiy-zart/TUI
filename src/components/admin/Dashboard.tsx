"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
      className
    )}>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="text-gray-600 dark:text-gray-300">Admin dashboard content</p>
    </div>
  );
};
