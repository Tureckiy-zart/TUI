import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
export interface LanguageOption {
  code: string;
  label: string;
}
interface LanguageSelectorProps {
  ariaLabel: string;
  dataTestId: string;
  className?: string;
  languages: LanguageOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onLanguageChange?: (language: string) => void;
}
export declare const LanguageSelector: React.FC<LanguageSelectorProps>;
export {};
//# sourceMappingURL=LanguageSelector.d.ts.map
