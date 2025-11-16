"use client";

import React from 'react';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/utils';

interface ConsentBannerProps {
  className?: string;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-blue-500 text-white p-4 rounded-lg",
      className
    )}>
      <p className="mb-2">We use cookies to improve your experience.</p>
      <Button>Accept</Button>
    </div>
  );
};
