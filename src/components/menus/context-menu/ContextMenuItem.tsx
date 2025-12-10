/**
 * ContextMenu Item Component
 *
 * Menu item for context menu.
 * Reuses DropdownMenuItem logic.
 */

"use client";

import * as React from "react";

import { DropdownMenuItem, type DropdownMenuItemProps } from "../dropdown/DropdownMenuItem";

export interface ContextMenuItemProps extends DropdownMenuItemProps {}

/**
 * ContextMenu Item component
 */
export const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (props, ref) => {
    return <DropdownMenuItem ref={ref} {...props} />;
  },
);

ContextMenuItem.displayName = "ContextMenuItem";
