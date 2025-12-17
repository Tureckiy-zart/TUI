"use client";

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  ariaLabel?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  left,
  right,
  children,
  ariaLabel = "Primary navigation",
  ...rest
}) => {
  return (
    <nav
      className={cn("flex w-full items-center justify-between px-md py-sm", className)}
      aria-label={ariaLabel}
      {...rest}
    >
      {left && <div className="flex items-center">{left}</div>}

      {children && <div className="flex items-center">{children}</div>}

      {right && <div className="flex items-center">{right}</div>}
    </nav>
  );
};
