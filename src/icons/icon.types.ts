/**
 * Icon Props Interface
 *
 * Shared props interface for all icon components.
 * Ensures consistent API across all icons in the registry.
 */

import * as React from "react";

/**
 * Base props for all icon components
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Hide icon from screen readers
   * @default true
   */
  "aria-hidden"?: boolean;

  /**
   * Accessible label for the icon
   */
  "aria-label"?: string;
}
