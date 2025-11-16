"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className={cn(
        'relative bg-card border rounded-lg shadow-lg max-w-md w-full mx-4',
        className
      )}>
        {title && (
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
