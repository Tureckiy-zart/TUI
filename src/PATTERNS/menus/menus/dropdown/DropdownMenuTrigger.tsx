/**
 * DropdownMenu Trigger Component
 *
 * Trigger element for dropdown menu.
 * Wraps PopoverTrigger with menu-specific ARIA attributes.
 */

"use client";

import * as React from "react";

import { PopoverTrigger, type PopoverTriggerProps } from "../popover/PopoverTrigger";

export interface DropdownMenuTriggerProps extends PopoverTriggerProps {}

/**
 * DropdownMenu Trigger component
 */
export const DropdownMenuTrigger = React.forwardRef<HTMLElement, DropdownMenuTriggerProps>(
  (props, ref) => {
    return <PopoverTrigger ref={ref} {...props} aria-haspopup="menu" />;
  },
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
