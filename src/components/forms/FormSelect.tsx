"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface FormSelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  placeholder,
  options = [],
  value = "",
  onChange,
  error,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium">{label}</label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
      >
        {placeholder && (
          <option value="" disabled>{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
