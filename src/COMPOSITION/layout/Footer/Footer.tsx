"use client";

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

interface FooterProps {
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ className, left, right, children }) => {
  return (
    <footer className={cn("w-full border-t bg-background px-md py-lg", className)}>
      <div className="flex w-full items-center justify-between">
        {left && <div className="flex items-center">{left}</div>}

        {children && <div className="flex items-center">{children}</div>}

        {right && <div className="flex items-center">{right}</div>}
      </div>
    </footer>
  );
};
