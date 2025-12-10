"use client";

import * as React from "react";

import type { IconProps } from "./icon.types";

/**
 * Location icon component
 */
export const IconLocation: React.FC<IconProps> = ({
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
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
};

IconLocation.displayName = "IconLocation";
