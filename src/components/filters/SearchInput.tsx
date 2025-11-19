"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder: string;
  showClearButton?: boolean;
  debounceMs?: number;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder,
  showClearButton = true,
  debounceMs = 300,
  className,
  id,
  name,
  ...props
}: SearchInputProps) {
  if (!placeholder || placeholder.trim() === '') {
    throw new Error('SearchInput: "placeholder" prop is required and cannot be empty');
  }
  // Generate unique ID if not provided
  const inputId = id || React.useId();
  const inputName = name || `search-input-${inputId}`;
  
  const [localValue, setLocalValue] = React.useState(value);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Debounce the onChange call
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
    onClear?.();
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        {...props}
        id={inputId}
        name={inputName}
        value={localValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="pl-10 pr-10"
      />
      {showClearButton && localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

// Hook for search functionality
export function useSearch(initialValue: string = '') {
  const [search, setSearch] = React.useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = React.useState(initialValue);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const clearSearch = React.useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
  }, []);

  return {
    search,
    debouncedSearch,
    setSearch,
    clearSearch,
  };
}
