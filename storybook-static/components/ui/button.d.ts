import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const buttonVariants: (
  props?:
    | ({
        variant?:
          | "primary"
          | "secondary"
          | "accent"
          | "destructive"
          | "outline"
          | "ghost"
          | "link"
          | null
          | undefined;
        size?: "sm" | "md" | "lg" | "xl" | "xs" | "icon" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map
