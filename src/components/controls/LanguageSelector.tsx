"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

export interface LanguageOption {
  code: string;
  label: string;
}

const defaultLanguages: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ru', label: 'Русский' },
];

interface LanguageSelectorProps {
  className?: string;
  languages?: LanguageOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onLanguageChange?: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  languages = defaultLanguages,
  value,
  defaultValue,
  disabled,
  onLanguageChange,
}) => {
  const options = useMemo(() => (languages.length > 0 ? languages : defaultLanguages), [languages]);

  const getInitialValue = () => {
    if (value !== undefined) return value;
    if (defaultValue && options.some((option) => option.code === defaultValue)) {
      return defaultValue;
    }
    return options[0]?.code ?? 'en';
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
        'px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm',
        disabled && 'opacity-70 cursor-not-allowed',
        className,
      )}
      aria-label="Language selector"
      data-testid="language-selector"
    >
      {options.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
};
