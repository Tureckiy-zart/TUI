/**
 * DropdownMenu SubTrigger Component
 *
 * Trigger for submenu items.
 */

"use client";

import { ChevronRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { DropdownMenuItem, type DropdownMenuItemProps } from "./DropdownMenuItem";

export interface DropdownMenuSubTriggerProps extends DropdownMenuItemProps {}

/**
 * DropdownMenu SubTrigger component
 */
export const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <DropdownMenuItem ref={ref} className={cn(className)} {...props}>
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
      </DropdownMenuItem>
    );
  },
);

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
