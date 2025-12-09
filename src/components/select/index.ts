"use client";

export { Select, SelectListbox, SelectOption, SelectRoot, SelectTrigger } from "./Select";
export type {
  SelectListboxProps,
  SelectOptionProps,
  SelectOption as SelectOptionType,
  SelectRootProps,
  SelectSize,
  SelectTriggerProps,
  SelectVariant,
} from "./Select.types";
export {
  selectListboxVariants,
  selectOptionVariants,
  selectTriggerVariants,
} from "./select-variants";

// Legacy exports for backward compatibility
export type { SelectProps as LegacySelectProps } from "./legacy/select";
export { Select as LegacySelect, selectVariants } from "./legacy/select";
