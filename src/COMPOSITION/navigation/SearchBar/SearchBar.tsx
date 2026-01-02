"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { SearchInput } from "@/PATTERNS/filters/filters/SearchInput";
import { Button } from "@/PRIMITIVES/Button";

export interface SearchBarProps {
  placeholder: string;
  className?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

// Blur delay constant for allowing click on suggestion before blur fires
const BLUR_DELAY_MS = 200;

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
      if (typeof document !== "undefined" && !searchRef.current?.contains(document.activeElement)) {
        closeSuggestions();
      }
    }, BLUR_DELAY_MS);
  };

  const closeSuggestions = () => {
    setIsFocused(false);
    setSelectedIndex(-1);
  };

  const selectSuggestion = (suggestion: string) => {
    handleChange(suggestion);
    onSuggestionSelect?.(suggestion);
    setIsFocused(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    selectSuggestion(suggestion);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase()),
    );
  }, [suggestions, value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const nextIndex = prev < filteredSuggestions.length - 1 ? prev + 1 : prev;
          // If starting from -1, go to 0 (first suggestion)
          return prev === -1 ? 0 : nextIndex;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        // If no suggestion is selected, select the first one
        const indexToUse = selectedIndex >= 0 ? selectedIndex : 0;
        if (indexToUse >= 0 && indexToUse < filteredSuggestions.length) {
          const selected = filteredSuggestions[indexToUse];
          if (selected) {
            selectSuggestion(selected);
          }
        }
        break;

      case "Escape":
        e.preventDefault();
        closeSuggestions();
        break;

      default:
        break;
    }
  };

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
          "transition-[border-color,box-shadow] duration-fast",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "hover:border-primary/50",
          isFocused && "border-primary shadow-sm",
        )}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <div
          className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-lg"
          // z-30: z-index uses overlay layer (30) per ELEVATION_AUTHORITY.
          // SearchBar suggestions dropdown must use zIndex.overlay (30) to ensure
          // proper stacking above other page elements (sticky navigation, content, etc.)
        >
          {filteredSuggestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="ghost"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
