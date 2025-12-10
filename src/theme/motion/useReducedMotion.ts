/**
 * useReducedMotion Hook
 *
 * SSR-safe hook to detect prefers-reduced-motion media query.
 * Returns boolean indicating if user prefers reduced motion.
 */

"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect prefers-reduced-motion preference
 * @returns boolean - true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // SSR-safe: only run in browser
    if (typeof window === "undefined") {
      return;
    }

    // Check if media query is supported
    if (!window.matchMedia) {
      return;
    }

    // Create media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setIsReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    // Fallback for older browsers
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }

    // No-op cleanup if no listener method available
    return undefined;
  }, []);

  return isReducedMotion;
}
