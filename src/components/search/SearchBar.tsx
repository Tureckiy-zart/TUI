"use client";

import React, { useEffect, useRef, useState } from "react";

import { SearchInput } from "@/components/filters/SearchInput";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder: string;
  className?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  className,
  onSearch,
  suggestions = [],
  onSuggestionSelect,
}) => {
  if (!placeholder || placeholder.trim() === "") {
    throw new Error('SearchBar: "placeholder" prop is required and cannot be empty');
  }
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setSelectedIndex(-1);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (_e: React.FocusEvent) => {
    // Delay to allow click on suggestion
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && selectedIndex < suggestions.length) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      if (selected) {
        setValue(selected);
        handleChange(selected);
        onSuggestionSelect?.(selected);
        setIsFocused(false);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    handleChange(suggestion);
    onSuggestionSelect?.(suggestion);
    setIsFocused(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-sm", className)}>
      <SearchInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "transition-all duration-200",
          "focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "hover:border-primary/50",
          isFocused && "border-primary shadow-sm",
        )}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <Button
              key={suggestion}
              type="button"
              variant="ghost"
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "w-full justify-start px-4 py-2 text-sm",
                index === selectedIndex && "bg-accent text-accent-foreground",
              )}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
