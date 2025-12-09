/**
 * ContextMenu Group Component
 *
 * Group container for context menu.
 * Reuses DropdownMenuGroup.
 */

"use client";

import * as React from "react";

import { DropdownMenuGroup, type DropdownMenuGroupProps } from "../dropdown/DropdownMenuGroup";

export interface ContextMenuGroupProps extends DropdownMenuGroupProps {}

/**
 * ContextMenu Group component
 */
export const ContextMenuGroup = React.forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  (props, ref) => {
    return <DropdownMenuGroup ref={ref} {...props} />;
  },
);

ContextMenuGroup.displayName = "ContextMenuGroup";
