/**
 * ContextMenu Trigger Component
 *
 * Trigger element that opens context menu on right-click.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { usePopoverContext } from "../popover/PopoverRoot";
import { useContextMenuContext } from "./ContextMenuRoot";

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render as child element (composition pattern)
   */
  asChild?: boolean;
}

/**
 * ContextMenu Trigger component
 */
export const ContextMenuTrigger = React.forwardRef<HTMLElement, ContextMenuTriggerProps>(
  ({ asChild = false, className, children, onContextMenu, ...props }, ref) => {
    const { onOpenChange } = usePopoverContext();
    const { setPosition } = useContextMenuContext();
    const triggerRef = React.useRef<HTMLElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLElement, []);

    const handleContextMenu = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();

        // Set position to cursor coordinates
        setPosition({ x: event.clientX, y: event.clientY });

        // Open menu
        onOpenChange(true);

        onContextMenu?.(event);
      },
      [onOpenChange, setPosition, onContextMenu],
    );

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as React.HTMLAttributes<HTMLElement> & {
        className?: string;
      };
      return React.cloneElement(children, {
        ...props,
        ...childProps,
        ref: triggerRef,
        onContextMenu: handleContextMenu,
        className: cn(className, childProps.className),
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <div
        ref={triggerRef as React.Ref<HTMLDivElement>}
        onContextMenu={handleContextMenu}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";
