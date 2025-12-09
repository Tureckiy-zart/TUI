"use client";

import { Search, X } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/input";
import { Button } from "@/components/primitives/Button";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size"> {
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
  // Generate unique ID if not provided (must be called before any early returns)
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const inputName = name || `search-input-${inputId}`;

  if (!placeholder || placeholder.trim() === "") {
    throw new Error('SearchInput: "placeholder" prop is required and cannot be empty');
  }

  const [localValue, setLocalValue] = React.useState(value);
  const debouncedValue = useDebounce(localValue, debounceMs);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    onClear?.();
  };

  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id={inputId}
        name={inputName}
        value={localValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="pl-10 pr-10"
        // Filter out props that don't exist in InputProps
        {...(Object.fromEntries(
          Object.entries(props).filter(([key]) => !["height", "width", "size"].includes(key)),
        ) as Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">)}
      />
      {showClearButton && localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}

// Hook for search functionality
export function useSearch(initialValue: string = "") {
  const [search, setSearch] = React.useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = React.useState(initialValue);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const clearSearch = React.useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
  }, []);

  return {
    search,
    debouncedSearch,
    setSearch,
    clearSearch,
  };
}
