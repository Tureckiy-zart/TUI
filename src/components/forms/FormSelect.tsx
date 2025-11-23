"use client";

import React from "react";

import { Label } from "@/components/primitives/Label";
import { Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

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
  value,
  onChange,
  error,
  className,
}) => {
  // value is optional - if undefined/null, use empty string (uncontrolled select)
  // If provided (even empty string), use it (controlled select)
  const selectValue = value ?? "";

  return (
    <div className={cn("space-y-sm", className)}>
      {label && (
        <Label htmlFor={id} className="block">
          {label}
        </Label>
      )}
      <select
        id={id}
        name={name}
        value={selectValue}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-sm py-sm"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <Text size="sm" variant="destructive">
          {error}
        </Text>
      )}
    </div>
  );
};
