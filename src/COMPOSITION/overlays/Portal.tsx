"use client";

/**
 * Portal Component
 *
 * SSR-safe portal component for rendering children outside the DOM hierarchy.
 * Mounts to document.body by default, with optional custom container support.
 *
 * @enforcement TUNG_PORTAL_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Portal is a logical component with no direct styling
 * - Portal does NOT use tokens directly (no visual representation)
 * - Portal provides DOM rendering functionality only
 * - Styling is delegated to portaled children
 * - NO raw Tailwind classes allowed (component has no styling)
 *
 * Composition Authority Rules:
 * - Portal composes React createPortal for DOM rendering
 * - Styling is delegated to portaled children
 * - Portal provides SSR-safe portal functionality only
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: Portal provides DOM rendering functionality only, styling delegated to children
 * - Color Authority: Portal does not apply colors (delegated to children)
 * - Typography Authority: Portal does not apply typography (delegated to children)
 * - Spacing Authority: Portal does not apply spacing (delegated to children)
 *
 * Token-only contract:
 * - Portal has no token usage (logical component)
 * - All styling occurs through portaled children
 * - Portal provides SSR-safe portal rendering via React createPortal
 * - This is a logical utility component, not a visual component
 */

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/FOUNDATION/lib/utils";

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
