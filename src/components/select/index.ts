"use client";

// Export new Select component (Radix-based)
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "./Select";

// Export types
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
  SelectSize,
  SelectState,
  SelectTriggerProps,
  SelectValueProps,
  SelectVariant,
  SelectViewportProps,
  SelectWidth,
} from "./Select.types";

// Legacy exports for backward compatibility (if needed)
// Note: Old Select implementation is in ./legacy/select.tsx
// These exports are kept for backward compatibility but should be migrated to new Select
export type { SelectProps as LegacySelectProps } from "./legacy/select";
export { Select as LegacySelect, selectVariants } from "./legacy/select";
