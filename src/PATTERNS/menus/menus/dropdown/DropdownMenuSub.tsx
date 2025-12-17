/**
 * DropdownMenu Sub Component
 *
 * Submenu container with nested menu support.
 */

"use client";

import { PopoverRoot, type PopoverRootProps } from "../popover/PopoverRoot";

export interface DropdownMenuSubProps extends PopoverRootProps {}

/**
 * DropdownMenu Sub component
 */
export function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <PopoverRoot {...props} />;
}

DropdownMenuSub.displayName = "DropdownMenuSub";
