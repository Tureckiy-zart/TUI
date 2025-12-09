"use client";

import * as React from "react";

import type { IconProps } from "./icon.types";

/**
 * Close icon component (X)
 */
export const IconClose: React.FC<IconProps> = ({
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
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

IconClose.displayName = "IconClose";
