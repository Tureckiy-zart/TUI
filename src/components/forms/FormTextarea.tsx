"use client";

import React from "react";

import { Label } from "@/components/primitives/Label";
import { Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

interface FormTextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "className"
  > {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
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
  className,
  ...rest
}) => {
  // value is optional - if undefined/null, use empty string (uncontrolled textarea)
  // If provided (even empty string), use it (controlled textarea)
  const textareaValue = value ?? "";

  return (
    <div className={cn("space-y-sm", className)}>
      {label && (
        <Label htmlFor={id} className="block">
          {label}
        </Label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={textareaValue}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-sm py-sm"
        rows={rows}
        {...rest}
      />
      {error && (
        <Text size="sm" variant="destructive">
          {error}
        </Text>
      )}
    </div>
  );
};
