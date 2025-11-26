"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

import { focusRing } from "@/lib/a11y";
import { cn } from "@/lib/utils";

interface SimpleModalProps extends React.ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  hideCloseButton = false,
  ...rest
}) => {
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          aria-hidden="true"
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
        <DialogPrimitive.Content
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-elevation-xl fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card focus:outline-none",
            className,
          )}
          {...rest}
        >
          {title && (
            <DialogPrimitive.Title
              id={titleId}
              className="border-b px-6 py-4 text-lg font-semibold text-foreground"
            >
              {title}
            </DialogPrimitive.Title>
          )}
          <div className="p-6">
            {description && (
              <DialogPrimitive.Description
                id={descriptionId}
                className="mb-4 text-sm text-muted-foreground"
              >
                {description}
              </DialogPrimitive.Description>
            )}
            {children}
          </div>
          {!hideCloseButton && (
            <DialogPrimitive.Close
              className={cn(
                "absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground",
                focusRing,
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Close modal</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
