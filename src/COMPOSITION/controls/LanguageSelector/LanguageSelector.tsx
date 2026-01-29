"use client";

import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/FOUNDATION/lib/utils";

export interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSelectorProps {
  ariaLabel: string;
  dataTestId: string;
  className?: string;
  languages: LanguageOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onLanguageChange?: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  ariaLabel,
  dataTestId,
  className,
  languages,
  value,
  defaultValue,
  disabled,
  onLanguageChange,
}) => {
  if (!ariaLabel || ariaLabel.trim() === "") {
    throw new Error('LanguageSelector: "ariaLabel" prop is required and cannot be empty');
  }
  if (!dataTestId || dataTestId.trim() === "") {
    throw new Error('LanguageSelector: "dataTestId" prop is required and cannot be empty');
  }
  if (!languages || languages.length === 0) {
    throw new Error('LanguageSelector: "languages" prop is required and cannot be empty');
  }

  const options = useMemo(() => languages, [languages]);

  const getInitialValue = (): string => {
    if (value !== undefined) return value;
    if (defaultValue && options.some((option) => option.code === defaultValue)) {
      return defaultValue;
    }
    if (options.length === 0) {
      throw new Error("LanguageSelector: languages array must contain at least one option");
    }
    return options[0]!.code;
  };

  const [internalValue, setInternalValue] = useState<string>(getInitialValue);

  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, internalValue]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    if (value === undefined) {
      setInternalValue(newLanguage);
    }
    onLanguageChange?.(newLanguage);
  };

  return (
    <select
      value={value ?? internalValue}
      onChange={handleChange}
      disabled={disabled}
      className={cn(
        "rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-sm py-sm text-sm",
        disabled && "cursor-not-allowed opacity-70",
        className,
      )}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {options.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
};
