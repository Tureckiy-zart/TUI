"use client";

import { Input } from "@tenerife.music/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 2) {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results || []);
          setIsOpen(true);
          setFocusedIndex(-1);
        });
    } else {
      setResults([]);
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < results.length) {
          router.push(results[focusedIndex].url);
          setIsOpen(false);
          setQuery("");
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative w-64">
      <Input
        type="search"
        placeholder="Search docs... (Cmd/Ctrl+K)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length > 2 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onKeyDown={handleKeyDown}
        className="w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Search documentation"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="search-results"
        aria-activedescendant={focusedIndex >= 0 ? `search-result-${focusedIndex}` : undefined}
      />
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border bg-background shadow-lg"
          aria-label="Search results"
        >
          {results.map((result, index) => (
            <button
              key={index}
              id={`search-result-${index}`}
              onClick={() => {
                router.push(result.url);
                setIsOpen(false);
                setQuery("");
              }}
              className={cn(
                "w-full px-4 py-2 text-left transition-colors hover:bg-accent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                focusedIndex === index && "bg-accent",
              )}
              role="option"
              aria-label={`${result.title} - ${result.category}`}
              aria-selected={focusedIndex === index}
            >
              <div className="font-medium">{result.title}</div>
              <div className="text-sm text-muted-foreground">{result.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
