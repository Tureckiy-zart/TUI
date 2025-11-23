import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface FormTextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "className"
  > {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
export declare const FormTextarea: React.FC<FormTextareaProps>;
export {};
//# sourceMappingURL=FormTextarea.d.ts.map
