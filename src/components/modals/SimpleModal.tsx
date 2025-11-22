"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface SimpleModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  ...rest
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" {...rest}>
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close modal"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
      />
      <div
        className={cn(
          "relative mx-4 w-full max-w-md rounded-lg border bg-card shadow-lg",
          className,
        )}
      >
        {title && (
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
