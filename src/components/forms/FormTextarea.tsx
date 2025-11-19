"use client";

import React from 'react';
import { Label } from '@/components/primitives/Label';
import { Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

interface FormTextareaProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  rows?: number;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  className
}) => {
  // value is optional - if undefined/null, use empty string (uncontrolled textarea)
  // If provided (even empty string), use it (controlled textarea)
  const textareaValue = value ?? '';

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className="block">{label}</Label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={textareaValue}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
        rows={rows}
      />
      {error && (
        <Text size="sm" color="destructive">{error}</Text>
      )}
    </div>
  );
};
