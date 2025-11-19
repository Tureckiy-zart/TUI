"use client";

import React from 'react';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

interface ConsentBannerProps {
  className?: string;
  message: string;
  acceptLabel: string;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ 
  className,
  message,
  acceptLabel
}) => {
  if (!message || message.trim() === '') {
    throw new Error('ConsentBanner: "message" prop is required and cannot be empty');
  }
  if (!acceptLabel || acceptLabel.trim() === '') {
    throw new Error('ConsentBanner: "acceptLabel" prop is required and cannot be empty');
  }

  return (
    <div className={cn(
      "bg-blue-500 text-white p-4 rounded-lg",
      className
    )}>
      <Text className="mb-2">{message}</Text>
      <Button>{acceptLabel}</Button>
    </div>
  );
};
