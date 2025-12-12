"use client";

/**
 * Dialog Component
 *
 * Semantic modal wrapper built on Modal component.
 * Provides Dialog.Header, Dialog.Title, Dialog.Description, Dialog.Body, Dialog.Footer subcomponents.
 * Full A11y compliance with aria-labelledby and aria-describedby.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { OVERLAY_TOKENS } from "@/tokens/components/overlay";
import { TEXT_TOKENS } from "@/tokens/components/text";

import { Row } from "../layout/Row";
import { Modal } from "../modal";
import { Heading } from "../ui/heading";

export interface DialogProps extends React.ComponentPropsWithoutRef<typeof Modal.Root> {
  /**
   * ID for the dialog title (for aria-labelledby)
   */
  titleId?: string;

  /**
   * ID for the dialog description (for aria-describedby)
   */
  descriptionId?: string;
}

/**
 * Dialog Root - Main dialog wrapper
 *
 * **Note:** This component is a semantic wrapper over Modal.Root and Modal.Content.
 * It provides Dialog-specific subcomponents but uses the new Radix-based Modal internally.
 */
const DialogRoot: React.FC<DialogProps> = ({ titleId, descriptionId, children, ...props }) => {
  const titleIdRef = React.useId();
  const descriptionIdRef = React.useId();

  const finalTitleId = titleId || titleIdRef;
  const finalDescriptionId = descriptionId || descriptionIdRef;

  return (
    <Modal.Root {...props}>
      <Modal.Content>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              titleId: finalTitleId,
              descriptionId: finalDescriptionId,
            });
          }
          return child;
        })}
        <Modal.Close />
      </Modal.Content>
    </Modal.Root>
  );
};

DialogRoot.displayName = "DialogRoot";

/**
 * Dialog Header - Header section with spacing
 */
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  titleId?: string;
  descriptionId?: string;
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          OVERLAY_TOKENS.modal.spacing.header.marginBottom,
          OVERLAY_TOKENS.modal.spacing.header.gap,
          className,
        )}
        {...props}
      />
    );
  },
);

DialogHeader.displayName = "DialogHeader";

/**
 * Dialog Title - h2 with aria-labelledby
 */
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  titleId?: string;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ titleId, className, children, ...props }, ref) => {
    return (
      <Heading
        ref={ref}
        as="h2"
        level={4}
        weight="semibold"
        id={titleId}
        className={cn(className)}
        {...props}
      >
        {children}
      </Heading>
    );
  },
);

DialogTitle.displayName = "DialogTitle";

/**
 * Dialog Description - p with aria-describedby
 */
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  descriptionId?: string;
}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ descriptionId, className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn(TEXT_TOKENS.fontSize.sm, ICON_TOKENS.colors.muted, className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

DialogDescription.displayName = "DialogDescription";

/**
 * Dialog Body - Main content area
 */
export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(OVERLAY_TOKENS.modal.spacing.body.layout, className)}
        {...props}
      />
    );
  },
);

DialogBody.displayName = "DialogBody";

/**
 * Dialog Footer - Footer section with Row layout
 */
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <Row
        ref={ref}
        justify="end"
        gap="sm"
        className={cn(OVERLAY_TOKENS.modal.spacing.footer.marginTop, className)}
        {...props}
      />
    );
  },
);

DialogFooter.displayName = "DialogFooter";

// Attach subcomponents
const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
});

export {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
};
