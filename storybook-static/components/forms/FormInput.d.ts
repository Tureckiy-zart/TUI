import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className"> {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
export declare const FormInput: React.FC<FormInputProps>;
export {};
//# sourceMappingURL=FormInput.d.ts.map
