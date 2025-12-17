"use client";

import * as React from "react";

/**
 * RadioGroup Context Value
 *
 * Internal context value passed to Radio children
 */
export interface RadioGroupContextValue {
  /**
   * Current selected value
   */
  value: string;

  /**
   * Callback when value changes
   */
  onValueChange: (value: string) => void;

  /**
   * Name attribute for the radio group
   */
  name: string;

  /**
   * Orientation of the radio group
   */
  orientation: "horizontal" | "vertical";

  /**
   * Size for all radios in the group
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * RadioGroup Component Props
 *
 * Container component for Radio buttons with keyboard navigation and state management.
 */
export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controlled value
   */
  value?: string;

  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: string;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Name attribute for the radio group
   */
  name?: string;

  /**
   * Orientation of the radio group
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Size for all radios in the group
   * Can be overridden by individual Radio components
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
