"use client";

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

// Note: SelectSize, SelectVariant, SelectWidth, SelectState types removed
// Select now uses Input tokens and defaults (md size, outline variant, full width)
// Invalid state is handled via aria-invalid prop
