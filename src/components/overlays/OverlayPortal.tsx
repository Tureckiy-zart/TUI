"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

interface OverlayPortalProps {
  children: React.ReactNode;
  container?: Element | null;
  className?: string;
  style?: React.CSSProperties;
}

export function OverlayPortal({ children, container, className, style }: OverlayPortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const targetContainer = container || document.body;

  return createPortal(
    <div className={cn("fixed inset-0 z-50", className)} style={style}>
      {children}
    </div>,
    targetContainer,
  );
}

interface OverlayBackdropProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function OverlayBackdrop({ onClick, className, style }: OverlayBackdropProps) {
  return (
    <div
      className={cn("absolute inset-0 bg-black/50 backdrop-blur-sm", className)}
      style={style}
      onClick={onClick}
    />
  );
}

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

export function OverlayContainer({
  children,
  className,
  style,
  position = "center",
}: OverlayContainerProps) {
  const positionClasses = {
    center: "flex items-center justify-center",
    top: "flex justify-center pt-8",
    bottom: "flex justify-center pb-8",
    left: "flex items-center pl-8",
    right: "flex items-center pr-8",
    "top-left": "flex justify-start items-start pt-8 pl-8",
    "top-right": "flex justify-end items-start pt-8 pr-8",
    "bottom-left": "flex justify-start items-end pb-8 pl-8",
    "bottom-right": "flex justify-end items-end pb-8 pr-8",
  };

  return (
    <div
      className={cn("relative h-full min-h-screen w-full", positionClasses[position], className)}
      style={style}
    >
      {children}
    </div>
  );
}
