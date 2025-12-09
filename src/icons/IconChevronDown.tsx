"use client";

import * as React from "react";

import type { IconProps } from "./icon.types";

/**
 * Chevron down icon component
 */
export const IconChevronDown: React.FC<IconProps> = ({
  className,
  "aria-hidden": ariaHidden = true,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

IconChevronDown.displayName = "IconChevronDown";
