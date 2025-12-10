/**
 * ContextMenu Label Component
 *
 * Label for context menu.
 * Reuses DropdownMenuLabel.
 */

"use client";

import * as React from "react";

import { DropdownMenuLabel, type DropdownMenuLabelProps } from "../dropdown/DropdownMenuLabel";

export interface ContextMenuLabelProps extends DropdownMenuLabelProps {}

/**
 * ContextMenu Label component
 */
export const ContextMenuLabel = React.forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  (props, ref) => {
    return <DropdownMenuLabel ref={ref} {...props} />;
  },
);

ContextMenuLabel.displayName = "ContextMenuLabel";
