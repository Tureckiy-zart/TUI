"use client";

import { Search, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/PRIMITIVES/Button";
import { Input } from "@/PRIMITIVES/Input";

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "size"
> {
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
  const prevValueRef = React.useRef(value);
  const isInternalChangeRef = React.useRef(false);

  // Sync localValue with value prop when it changes externally (programmatically)
  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      // Value prop changed externally - update localValue synchronously
      isInternalChangeRef.current = true;
      setLocalValue(value);
      prevValueRef.current = value;
      // Reset flag after a microtask to allow state update to complete
      Promise.resolve().then(() => {
        isInternalChangeRef.current = false;
      });
    }
  }, [value]);

  // Only call onChange with debounced value when user types (not when value prop changes externally)
  React.useEffect(() => {
    if (!isInternalChangeRef.current) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    isInternalChangeRef.current = false;
    setLocalValue(newValue);
  };

  const handleClear = () => {
    isInternalChangeRef.current = false;
    setLocalValue("");
    onChange("");
    onClear?.();
  };

  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--tm-text-muted))]"
        aria-hidden="true"
      />
      <Input
        id={inputId}
        name={inputName}
        value={localValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        // Filter out props that don't exist in InputProps
        {...(Object.fromEntries(
          Object.entries(props).filter(([key]) => !["height", "width", "size"].includes(key)),
        ) as Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">)}
      />
      {showClearButton && localValue && (
        <Button
          type="button"
          variant="ghost"
          iconOnly
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
