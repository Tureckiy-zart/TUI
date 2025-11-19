"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TrendingSectionProps {
  events?: any[];
  limit?: number;
  loading?: boolean;
  className?: string;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ 
  events = [], 
  limit = 5, 
  loading = false, 
  className 
}) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
      className
    )}>
      <h2 className="text-2xl font-bold mb-4">Trending Events</h2>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading trending events...</p>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          Showing {events.length} trending events (limit: {limit})
        </p>
      )}
    </div>
  );
};
