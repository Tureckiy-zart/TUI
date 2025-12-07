"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";

import { fadePresets, scalePresets } from "@/animation/presets";
import { cn } from "@/lib/utils";

const Modal = DialogPrimitive.Root;

const ModalTrigger = DialogPrimitive.Trigger;

const ModalPortal = DialogPrimitive.Portal;

const ModalClose = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const fadeIn = fadePresets.fadeIn({ duration: "normal" });
  const fadeOut = fadePresets.fadeOut({ duration: "fast" });

  return (
    <DialogPrimitive.Overlay ref={ref} {...props} asChild>
      <motion.div
        className={cn("fixed inset-0 z-50 bg-black/80", className)}
        initial={fadeIn.initial as any}
        animate={fadeIn.animate as any}
        exit={fadeOut.exit as any}
        transition={fadeIn.transition as any}
      />
    </DialogPrimitive.Overlay>
  );
});
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  // Combine fade and scale presets for modal animation
  const fadeScaleIn = {
    ...fadePresets.fadeIn({ duration: "normal" }),
    ...scalePresets.scaleIn({ scale: 0.95, duration: "normal" }),
  };

  const fadeScaleOut = {
    ...fadePresets.fadeOut({ duration: "fast" }),
    ...scalePresets.scaleOut({ scale: 0.95, duration: "fast" }),
  };

  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content ref={ref} {...props} asChild>
        <motion.div
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg sm:rounded-lg",
            className,
          )}
          initial={fadeScaleIn.initial as any}
          animate={fadeScaleIn.animate as any}
          exit={fadeScaleOut.exit as any}
          transition={fadeScaleIn.transition as any}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </motion.div>
      </DialogPrimitive.Content>
    </ModalPortal>
  );
});
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-xs text-center sm:text-left", className)} {...props} />
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-sm", className)}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
};
