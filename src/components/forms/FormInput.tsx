"use client";

import React from 'react';
import { Input } from '@/components/primitives/Input';
import { cn } from '@/lib/utils';

interface FormInputProps {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value = "",
  onChange,
  error,
  helperText,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium">{label}</label>
      )}
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
