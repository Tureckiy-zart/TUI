/**
 * Icon Registry
 *
 * Central registry for all icon components.
 * Supports tree-shaking through individual named exports.
 */

import * as React from "react";

import type { IconProps } from "./icon.types";

// Individual icon exports (tree-shakeable)
export { IconCheck } from "./IconCheck";
export { IconChevronDown } from "./IconChevronDown";
export { IconChevronRight } from "./IconChevronRight";
export { IconClose } from "./IconClose";
export { IconError } from "./IconError";
export { IconInfo } from "./IconInfo";
export { IconMenu } from "./IconMenu";
export { IconSearch } from "./IconSearch";
export { IconSuccess } from "./IconSuccess";
export { IconWarning } from "./IconWarning";

// Icon registry map for Icon component lookup
// Note: This creates a static map but individual imports above are tree-shakeable
import { IconCheck } from "./IconCheck";
import { IconChevronDown } from "./IconChevronDown";
import { IconChevronRight } from "./IconChevronRight";
import { IconClose } from "./IconClose";
import { IconError } from "./IconError";
import { IconInfo } from "./IconInfo";
import { IconMenu } from "./IconMenu";
import { IconSearch } from "./IconSearch";
import { IconSuccess } from "./IconSuccess";
import { IconWarning } from "./IconWarning";

/**
 * Icons map for registry lookup
 * Used by Icon component to resolve icon by name
 */
export const ICONS_MAP: Record<string, React.FC<IconProps>> = {
  check: IconCheck,
  chevronDown: IconChevronDown,
  chevronRight: IconChevronRight,
  close: IconClose,
  error: IconError,
  info: IconInfo,
  menu: IconMenu,
  search: IconSearch,
  success: IconSuccess,
  warning: IconWarning,
} as const;

/**
 * Icon name type - union of all available icon names
 */
export type IconName = keyof typeof ICONS_MAP;

/**
 * Re-export IconProps for convenience
 */
export type { IconProps } from "./icon.types";
