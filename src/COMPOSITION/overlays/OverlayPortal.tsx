"use client";

/**
 * OverlayPortal Component
 *
 * SSR-safe portal component for rendering overlay content outside the DOM hierarchy.
 * Provides portal functionality with optional backdrop and container positioning.
 *
 * @enforcement TUNG_OVERLAYPORTAL_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - OverlayPortal is a utility component with minimal styling
 * - OverlayPortal uses raw Tailwind classes for positioning (fixed, inset-0, z-40)
 * - These are structural layout utilities, not visual styling tokens
 * - OverlayPortal composes React createPortal for DOM rendering
 * - Styling is delegated to portaled children
 * - NO raw Tailwind color classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - OverlayPortal composes React createPortal for DOM rendering
 * - Styling is delegated to portaled children
 * - OverlayPortal provides SSR-safe portal functionality only
 *
 * Layout Authority Rules:
 * - Layout utilities (fixed, inset-0) are ALLOWED for portal positioning
 * - z-index uses token-based value (z-40 from ELEVATION_AUTHORITY)
 * - These are structural utilities, not visual styling
 *
 * Elevation Authority Rules:
 * - z-index uses z-40 (token-based value from ELEVATION_AUTHORITY)
 * - NO raw Tailwind z-index classes allowed (should use token-based value)
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: OverlayPortal provides portal positioning functionality
 * - Elevation Authority: OverlayPortal uses z-index tokens via ELEVATION_AUTHORITY
 * - Color Authority: OverlayPortal does not apply colors (delegated to children)
 * - Typography Authority: OverlayPortal does not apply typography (delegated to children)
 *
 * Token-only contract:
 * - OverlayPortal uses layout utilities for portal positioning (fixed, inset-0)
 * - z-index uses token-based value (z-40 from ELEVATION_AUTHORITY)
 * - All visual styling occurs through portaled children
 * - OverlayPortal provides SSR-safe portal rendering via React createPortal
 * - This is a utility component for portal functionality
 */

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/FOUNDATION/lib/utils";
import { OVERLAY_TOKENS } from "@/FOUNDATION/tokens/components/overlay";

interface OverlayPortalProps {
  children: React.ReactNode;
  container?: Element | null;
  className?: string;
  style?: React.CSSProperties;
}

export function OverlayPortal({ children, container, className, style }: OverlayPortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const targetContainer = container || document.body;

  return createPortal(
    <div className={cn("fixed inset-0 z-40", className)} style={style}>
      {children}
    </div>,
    targetContainer,
  );
}

/**
 * OverlayBackdrop Component
 *
 * Backdrop overlay component for overlays with blur effect.
 * Provides backdrop styling with optional click handler.
 *
 * @enforcement TUNG_OVERLAYBACKDROP_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - OverlayBackdrop uses OVERLAY_TOKENS for backdrop styling
 * - Background color uses OVERLAY_TOKENS.backdrop.blurred.bg (token-based)
 * - Backdrop filter uses OVERLAY_TOKENS.backdrop.blurred.backdropFilter (token-based)
 * - Layout utilities (absolute, inset-0) are ALLOWED
 * - All visual styling uses tokens (no raw Tailwind classes)
 *
 * Color Authority Rules:
 * - Background color uses token-based backdrop color from OVERLAY_TOKENS
 * - All color classes are token-based (OVERLAY_TOKENS.backdrop.blurred.*)
 * - NO raw Tailwind color classes allowed
 *
 * Layout Authority Rules:
 * - Layout utilities (absolute, inset-0) are ALLOWED for positioning
 * - These are structural utilities, not visual styling
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: OverlayBackdrop uses layout utilities for positioning
 * - Color Authority: ✅ OverlayBackdrop uses token-based color classes (OVERLAY_TOKENS)
 *
 * Token-only contract:
 * - OverlayBackdrop uses OVERLAY_TOKENS.backdrop.blurred for backdrop styling
 * - All visual styling is token-based (no raw Tailwind classes)
 * - Layout utilities (absolute, inset-0) are acceptable for positioning
 */

interface OverlayBackdropProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function OverlayBackdrop({ onClick, className, style }: OverlayBackdropProps) {
  return (
    <div
      className={cn(
        "absolute inset-0",
        OVERLAY_TOKENS.backdrop.blurred.bg,
        OVERLAY_TOKENS.backdrop.blurred.backdropFilter,
        className,
      )}
      style={style}
      onClick={onClick}
    />
  );
}

/**
 * OverlayContainer Component
 *
 * Container component for overlay content with positioning options.
 * Provides flexbox-based positioning for overlay content.
 *
 * @enforcement TUNG_OVERLAYCONTAINER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - OverlayContainer uses token-based spacing (pt-xl, pb-xl, pl-xl, pr-xl semantic spacing tokens)
 * - Spacing uses semantic spacing tokens (xl = 32px = spacing[8])
 * - Layout utilities (flex, items-center, justify-center) are ALLOWED
 * - All spacing uses tokens (no raw Tailwind spacing classes)
 *
 * Spacing Authority Rules:
 * - Spacing uses token-based spacing values (pt-xl, pb-xl, pl-xl, pr-xl semantic spacing tokens)
 * - All spacing classes are token-based (directional padding with xl semantic token)
 * - NO raw Tailwind spacing classes allowed
 *
 * Layout Authority Rules:
 * - Layout utilities (flex, items-center, justify-center) are ALLOWED
 * - These are structural utilities, not visual styling
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: OverlayContainer uses layout utilities for positioning
 * - Spacing Authority: ✅ OverlayContainer uses token-based spacing (p-xl semantic spacing token)
 *
 * Token-only contract:
 * - OverlayContainer uses pt-xl, pb-xl, pl-xl, pr-xl semantic spacing tokens (32px = spacing[8] = xl)
 * - All spacing is token-based (directional padding with semantic tokens)
 * - Layout utilities (flex, items-center, justify-center) are acceptable for positioning
 */

interface OverlayContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  position?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

const positionClasses = {
  center: "flex items-center justify-center",
  top: "flex justify-center pt-xl",
  bottom: "flex justify-center pb-xl",
  left: "flex items-center pl-xl",
  right: "flex items-center pr-xl",
  "top-left": "flex justify-start items-start pt-xl pl-xl",
  "top-right": "flex justify-end items-start pt-xl pr-xl",
  "bottom-left": "flex justify-start items-end pb-xl pl-xl",
  "bottom-right": "flex justify-end items-end pb-xl pr-xl",
} as const;

export function OverlayContainer({
  children,
  className,
  style,
  position = "center",
}: OverlayContainerProps) {
  return (
    <div
      className={cn("relative h-full min-h-screen w-full", positionClasses[position], className)}
      style={style}
    >
      {children}
    </div>
  );
}
