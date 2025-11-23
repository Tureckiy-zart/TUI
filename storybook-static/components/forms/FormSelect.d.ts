import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface FormSelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}
export declare const FormSelect: React.FC<FormSelectProps>;
export {};
//# sourceMappingURL=FormSelect.d.ts.map
