"use client";

import type {
  SelectSizeToken,
  SelectStateToken,
  SelectVariantToken,
  SelectWidthToken,
} from "@/tokens/types";

// Re-export types from Select.tsx for convenience
export type {
  SelectContentProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectRootProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectViewportProps,
} from "./Select";

/**
 * Select size token type
 */
export type SelectSize = SelectSizeToken;

/**
 * Select variant token type
 */
export type SelectVariant = SelectVariantToken;

/**
 * Select width token type
 */
export type SelectWidth = SelectWidthToken;

/**
 * Select state token type
 */
export type SelectState = SelectStateToken;
