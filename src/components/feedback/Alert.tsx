import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  className
}) => {
  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div className={cn(
      'border rounded-lg p-4',
      variantClasses[variant],
      className
    )}>
      {title && (
        <Heading level={4} className="font-semibold mb-2">{title}</Heading>
      )}
      {description && (
        <Text size="sm">{description}</Text>
      )}
    </div>
  );
};
