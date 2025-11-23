import { VariantProps } from "class-variance-authority";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<
  PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<
  PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>
>;
declare const popoverContentVariants: (
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
declare const PopoverContent: React.ForwardRefExoticComponent<
  Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    VariantProps<
      (
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
      ) => string
    > &
    React.RefAttributes<HTMLDivElement>
>;
export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: VariantProps<typeof popoverContentVariants>["variant"];
  size?: VariantProps<typeof popoverContentVariants>["size"];
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  closeOnInteractOutside?: boolean;
}
export declare function PopoverWrapper({
  children,
  content,
  variant,
  size,
  side,
  align,
  sideOffset,
  alignOffset,
  open,
  onOpenChange,
  modal,
  closeOnInteractOutside,
}: PopoverProps): import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverAnchor, PopoverContent, popoverContentVariants, PopoverTrigger };
//# sourceMappingURL=Popover.d.ts.map
