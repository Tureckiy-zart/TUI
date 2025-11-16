"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  name?: string;
  email?: string;
  avatar?: string;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name = "John Doe",
  email = "john@example.com",
  avatar,
  className
}) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4",
      className
    )}>
      {avatar && (
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{email}</p>
    </div>
  );
};
