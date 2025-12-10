/**
 * ContextMenu Separator Component
 *
 * Visual separator for context menu.
 * Reuses DropdownMenuSeparator.
 */

"use client";

import * as React from "react";

import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from "../dropdown/DropdownMenuSeparator";

export interface ContextMenuSeparatorProps extends DropdownMenuSeparatorProps {}

/**
 * ContextMenu Separator component
 */
export const ContextMenuSeparator = React.forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  (props, ref) => {
    return <DropdownMenuSeparator ref={ref} {...props} />;
  },
);

ContextMenuSeparator.displayName = "ContextMenuSeparator";
