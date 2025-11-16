"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  left,
  right,
  children
}) => {
  return (
    <nav className={cn(
      "flex items-center justify-between w-full px-4 py-3",
      className
    )}>
      {left && (
        <div className="flex items-center">
          {left}
        </div>
      )}
      
      {children && (
        <div className="flex items-center">
          {children}
        </div>
      )}
      
      {right && (
        <div className="flex items-center">
          {right}
        </div>
      )}
    </nav>
  );
};
