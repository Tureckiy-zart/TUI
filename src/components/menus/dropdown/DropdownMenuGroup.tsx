/**
 * DropdownMenu Group Component
 *
 * Group container for related menu items.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * DropdownMenu Group component
 */
export const DropdownMenuGroup = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} role="group" className={cn(className)} {...props} />;
  },
);

DropdownMenuGroup.displayName = "DropdownMenuGroup";
