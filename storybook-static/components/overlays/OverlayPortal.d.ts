import * as React from "react";
interface OverlayPortalProps {
  children: React.ReactNode;
  container?: Element | null;
  className?: string;
  style?: React.CSSProperties;
}
export declare function OverlayPortal({
  children,
  container,
  className,
  style,
}: OverlayPortalProps): React.ReactPortal | null;
interface OverlayBackdropProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
export declare function OverlayBackdrop({
  onClick,
  className,
  style,
}: OverlayBackdropProps): import("react/jsx-runtime").JSX.Element;
interface OverlayContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  position?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}
export declare function OverlayContainer({
  children,
  className,
  style,
  position,
}: OverlayContainerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=OverlayPortal.d.ts.map
