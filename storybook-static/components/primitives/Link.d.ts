import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const linkVariants: (
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
        size?: "sm" | "md" | "lg" | "xl" | "xs" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
declare const Link: React.ForwardRefExoticComponent<
  LinkProps & React.RefAttributes<HTMLAnchorElement>
>;
export { Link, linkVariants };
//# sourceMappingURL=Link.d.ts.map
