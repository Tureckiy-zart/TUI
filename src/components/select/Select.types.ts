"use client";

import type { VariantProps } from "class-variance-authority";

import { selectTriggerVariants } from "./select-variants";

/**
 * Select Variant Props
 */
export type SelectVariant = VariantProps<typeof selectTriggerVariants>["variant"];
export type SelectSize = VariantProps<typeof selectTriggerVariants>["size"];

/**
 * Select Option Data
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Select Root Props
 */
export interface SelectRootProps {
  /**
   * Current value (controlled mode)
   */
  value?: string;

  /**
   * Default value (uncontrolled mode)
   */
  defaultValue?: string;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Whether the select is disabled
   */
  disabled?: boolean;

  /**
   * Whether the select is open (controlled mode)
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Default open state (uncontrolled mode)
   */
  defaultOpen?: boolean;

  /**
   * Variant style (applies to trigger)
   */
  variant?: SelectVariant;

  /**
   * Size (applies to trigger, listbox, and options)
   */
  size?: SelectSize;

  /**
   * Children
   */
  children: React.ReactNode;
}

/**
 * Select Trigger Props
 */
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variant style
   */
  variant?: SelectVariant;

  /**
   * Size
   */
  size?: SelectSize;

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
}

/**
 * Select Listbox Props
 */
export interface SelectListboxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size (should match trigger size)
   */
  size?: SelectSize;
}

/**
 * Select Option Props
 */
export interface SelectOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Option value
   */
  value: string;

  /**
   * Option label
   */
  label?: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;

  /**
   * Size (should match trigger size)
   */
  size?: SelectSize;
}
