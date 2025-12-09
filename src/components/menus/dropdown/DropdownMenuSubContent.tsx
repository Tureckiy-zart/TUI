/**
 * DropdownMenu SubContent Component
 *
 * Content container for submenu.
 */

"use client";

import * as React from "react";

import { DropdownMenuContent, type DropdownMenuContentProps } from "./DropdownMenuContent";

export interface DropdownMenuSubContentProps extends DropdownMenuContentProps {}

/**
 * DropdownMenu SubContent component
 */
export const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  (props, ref) => {
    return <DropdownMenuContent ref={ref} {...props} />;
  },
);

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
