import * as React from "react";
export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder: string;
  showClearButton?: boolean;
  debounceMs?: number;
}
export declare function SearchInput({
  value,
  onChange,
  onClear,
  placeholder,
  showClearButton,
  debounceMs,
  className,
  id,
  name,
  ...props
}: SearchInputProps): import("react/jsx-runtime").JSX.Element;
export declare function useSearch(initialValue?: string): {
  search: string;
  debouncedSearch: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  clearSearch: () => void;
};
//# sourceMappingURL=SearchInput.d.ts.map
