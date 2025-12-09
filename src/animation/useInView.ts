/**
 * useInView Hook
 *
 * Native Intersection Observer hook for scroll-triggered animations.
 * SSR-safe implementation that works without framer-motion.
 */

"use client";

import { useEffect, useRef, useState } from "react";

export interface UseInViewOptions {
  /**
   * Trigger animation only once
   */
  once?: boolean;

  /**
   * Root margin for Intersection Observer
   * e.g., "-100px" or "0px 0px -100px 0px"
   */
  margin?: string;

  /**
   * Threshold for intersection (0-1)
   */
  threshold?: number;
}

export interface UseInViewReturn {
  /**
   * Ref to attach to the element to observe
   */
  ref: React.RefObject<HTMLElement | null>;

  /**
   * Whether the element is currently in view
   */
  isInView: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * Uses native Intersection Observer API
 */
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const { once = false, margin = "0px", threshold = 0.1 } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // SSR safety check
    if (typeof window === "undefined" || !ref.current) {
      return;
    }

    // If already triggered and once is true, don't observe again
    if (once && hasTriggered.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        const { isIntersecting } = entry;
        setIsInView(isIntersecting);

        if (isIntersecting && once) {
          hasTriggered.current = true;
        }

        // If once is true and we've triggered, disconnect
        if (once && hasTriggered.current) {
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: margin,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [once, margin, threshold]);

  return { ref, isInView };
}
