import { FilterOption } from "./types";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<
  SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>
>;
declare const SelectValue: React.ForwardRefExoticComponent<
  SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>
>;
declare const SelectTrigger: React.ForwardRefExoticComponent<
  Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> &
    React.RefAttributes<HTMLButtonElement>
>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<
  Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<
  Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
declare const SelectContent: React.ForwardRefExoticComponent<
  Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
declare const SelectLabel: React.ForwardRefExoticComponent<
  Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
declare const SelectItem: React.ForwardRefExoticComponent<
  Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
declare const SelectSeparator: React.ForwardRefExoticComponent<
  Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
export interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
  label?: string;
  className?: string;
}
export declare function FilterSelect({
  value,
  onValueChange,
  options,
  placeholder,
  label,
  className,
}: FilterSelectProps): import("react/jsx-runtime").JSX.Element;
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
//# sourceMappingURL=FilterSelect.d.ts.map
