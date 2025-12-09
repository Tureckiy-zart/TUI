"use client";

/**
 * Portal Component
 *
 * SSR-safe portal component for rendering children outside the DOM hierarchy.
 * Mounts to document.body by default, with optional custom container support.
 */

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export interface PortalProps {
  /**
   * Children to portal
   */
  children: React.ReactNode;

  /**
   * Container element to portal into (defaults to document.body)
   */
  container?: Element | null;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Portal component - SSR-safe portal rendering
 */
export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ children, container, className, style }, ref) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted || typeof window === "undefined") {
      return null;
    }

    const targetContainer = container || document.body;

    if (!targetContainer) {
      return null;
    }

    return createPortal(
      <div ref={ref} className={cn(className)} style={style}>
        {children}
      </div>,
      targetContainer,
    );
  },
);

Portal.displayName = "Portal";
