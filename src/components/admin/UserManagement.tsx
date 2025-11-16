"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface UserManagementProps {
  className?: string;
}

export const UserManagement: React.FC<UserManagementProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
      className
    )}>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <p className="text-gray-600 dark:text-gray-300">User management content</p>
    </div>
  );
};
