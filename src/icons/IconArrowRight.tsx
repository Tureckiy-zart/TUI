"use client";

import * as React from "react";

import type { IconProps } from "./icon.types";

/**
 * Arrow right icon component
 */
export const IconArrowRight: React.FC<IconProps> = ({
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
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
};

IconArrowRight.displayName = "IconArrowRight";
