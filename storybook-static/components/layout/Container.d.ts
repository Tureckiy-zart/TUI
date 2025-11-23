import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const containerVariants: (
  props?:
    | ({
        size?:
          | "2xl"
          | "3xl"
          | "sm"
          | "md"
          | "lg"
          | "xl"
          | "full"
          | "4xl"
          | "5xl"
          | "6xl"
          | "7xl"
          | null
          | undefined;
        padding?: "none" | "sm" | "md" | "lg" | "xl" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}
declare const Container: React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<HTMLDivElement>
>;
export { Container, containerVariants };
//# sourceMappingURL=Container.d.ts.map
