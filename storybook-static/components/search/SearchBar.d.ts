import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface SearchBarProps {
  placeholder: string;
  className?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}
export declare const SearchBar: React.FC<SearchBarProps>;
export {};
//# sourceMappingURL=SearchBar.d.ts.map
