import { VariantProps } from "class-variance-authority";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<
  TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
declare const tooltipContentVariants: (
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
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const TooltipContent: React.ForwardRefExoticComponent<
  Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> &
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
            } & import("class-variance-authority/types").ClassProp)
          | undefined,
      ) => string
    > &
    React.RefAttributes<HTMLDivElement>
>;
export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: VariantProps<typeof tooltipContentVariants>["variant"];
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export declare function TooltipWrapper({
  children,
  content,
  variant,
  side,
  align,
  sideOffset,
  alignOffset,
  delayDuration,
  skipDelayDuration,
  disableHoverableContent: _disableHoverableContent,
  open,
  onOpenChange,
}: TooltipProps): import("react/jsx-runtime").JSX.Element;
export { Tooltip, TooltipContent, tooltipContentVariants, TooltipProvider, TooltipTrigger };
//# sourceMappingURL=Tooltip.d.ts.map
