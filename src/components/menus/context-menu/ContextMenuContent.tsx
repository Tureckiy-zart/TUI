/**
 * ContextMenu Content Component
 *
 * Content container for context menu.
 * Uses cursor position for initial placement.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MENU_TOKENS } from "@/tokens/components/menu";

import { Portal } from "../../overlays/Portal";
import { type Placement, usePositioning } from "../../overlays/utils/positioning";
import { usePopoverContext } from "../popover/PopoverRoot";
import { useContextMenuContext } from "./ContextMenuRoot";

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Placement preference (if position is not set)
   */
  placement?: Placement;

  /**
   * Offset between trigger and content (in pixels)
   */
  offset?: number;
}

/**
 * ContextMenu Content component
 */
export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, placement = "bottom-start", offset = 4, children, ...props }, ref) => {
    const { open, onOpenChange, triggerId, contentId } = usePopoverContext();
    const { position: cursorPosition } = useContextMenuContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const virtualAnchorRef = React.useRef<HTMLElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement, []);

    // Create virtual anchor element at cursor position
    React.useEffect(() => {
      if (!cursorPosition || typeof document === "undefined") {
        return;
      }

      // Create a temporary element at cursor position for positioning
      const virtualAnchor = document.createElement("div");
      virtualAnchor.style.position = "fixed";
      virtualAnchor.style.left = `${cursorPosition.x}px`;
      virtualAnchor.style.top = `${cursorPosition.y}px`;
      virtualAnchor.style.width = "1px";
      virtualAnchor.style.height = "1px";
      virtualAnchor.style.pointerEvents = "none";
      virtualAnchor.style.visibility = "hidden";
      document.body.appendChild(virtualAnchor);
      virtualAnchorRef.current = virtualAnchor;

      return () => {
        if (virtualAnchor.parentNode) {
          virtualAnchor.parentNode.removeChild(virtualAnchor);
        }
      };
    }, [cursorPosition]);

    // Positioning
    const { position, isPositioned } = usePositioning({
      anchorRef: virtualAnchorRef,
      contentRef,
      placement,
      offset,
      enabled: open && !!cursorPosition,
    });

    // Close on outside click
    React.useEffect(() => {
      if (!open) {
        return;
      }

      function handleClickOutside(event: MouseEvent) {
        const target = event.target as Node;
        if (contentRef.current && !contentRef.current.contains(target)) {
          onOpenChange(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside, true);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside, true);
      };
    }, [open, onOpenChange]);

    // Close on Escape key
    React.useEffect(() => {
      if (!open) {
        return;
      }

      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          onOpenChange(false);
        }
      }

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, onOpenChange]);

    if (!open) {
      return null;
    }

    return (
      <Portal>
        <div
          ref={contentRef}
          id={contentId}
          role="menu"
          aria-labelledby={triggerId}
          className={cn(
            "z-50 border border-border bg-popover text-popover-foreground outline-none",
            `${MENU_TOKENS.content.padding.md} ${MENU_TOKENS.content.radius.md} ${MENU_TOKENS.content.shadow.md} ${MENU_TOKENS.content.minWidth.md}`,
            "overflow-hidden",
            !isPositioned && "invisible",
            className,
          )}
          style={position}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

ContextMenuContent.displayName = "ContextMenuContent";
