"use client";

import React from "react";

import { Input } from "@/components/primitives/Input";
import { Label } from "@/components/primitives/Label";
import { Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className"> {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  className,
  ...rest
}) => {
  // value is optional - if undefined/null, use empty string (uncontrolled input)
  // If provided (even empty string), use it (controlled input)
  const inputValue = value ?? "";

  return (
    <div className={cn("space-y-sm", className)}>
      {label && (
        <Label htmlFor={id} className="block">
          {label}
        </Label>
      )}
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      {helperText && !error && (
        <Text size="sm" variant="muted">
          {helperText}
        </Text>
      )}
      {error && (
        <Text size="sm" variant="destructive">
          {error}
        </Text>
      )}
    </div>
  );
};
