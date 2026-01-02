"use client";

/**
 * Dialog Component
 *
 * Semantic modal wrapper built on Modal component.
 * Provides Dialog.Header, Dialog.Title, Dialog.Description, Dialog.Body, Dialog.Footer subcomponents.
 * Full A11y compliance with aria-labelledby and aria-describedby.
 */

import * as React from "react";

import { VisuallyHidden } from "@/COMPOSITION/a11y/VisuallyHidden/VisuallyHidden";
import { Row } from "@/COMPOSITION/layout/Row";
import { Modal } from "@/COMPOSITION/overlays/Modal";
import { cn } from "@/FOUNDATION/lib/utils";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { OVERLAY_TOKENS } from "@/FOUNDATION/tokens/components/overlay";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";
import { Heading } from "@/PRIMITIVES/Heading";

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

  // Collect titleId and descriptionId from children to pass to Modal.Content
  let actualTitleId: string | undefined;
  let actualDescriptionId: string | undefined;
  let hasDialogTitle = false;

  // First pass: check for DialogTitle in children (before processing)
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childDisplayName = (child.type as any)?.displayName;
      if (childDisplayName === "DialogTitle") {
        hasDialogTitle = true;
        actualTitleId = finalTitleId;
      }
      if (childDisplayName === "DialogHeader") {
        React.Children.forEach((child as any).props.children, (grandchild: any) => {
          if (React.isValidElement(grandchild)) {
            const grandchildDisplayName = (grandchild.type as any)?.displayName;
            if (grandchildDisplayName === "DialogTitle") {
              hasDialogTitle = true;
              actualTitleId = finalTitleId;
            }
            if (grandchildDisplayName === "DialogDescription") {
              actualDescriptionId = finalDescriptionId;
            }
          }
        });
      }
    }
  });

  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Check by displayName since forwardRef components don't work with ===
      const childDisplayName = (child.type as any)?.displayName;
      // Pass titleId/descriptionId to DialogHeader
      if (childDisplayName === "DialogHeader") {
        return React.cloneElement(child as React.ReactElement<any>, {
          titleId: finalTitleId,
          descriptionId: finalDescriptionId,
        });
      }
      // For standalone DialogTitle or DialogDescription
      if (childDisplayName === "DialogTitle") {
        actualTitleId = finalTitleId;
        return React.cloneElement(child as React.ReactElement<any>, {
          titleId: finalTitleId,
        });
      }
      if (childDisplayName === "DialogDescription") {
        actualDescriptionId = finalDescriptionId;
        return React.cloneElement(child as React.ReactElement<any>, {
          descriptionId: finalDescriptionId,
        });
      }
    }
    return child;
  });

  return (
    <Modal.Root {...props}>
      <Modal.Content aria-labelledby={actualTitleId} aria-describedby={actualDescriptionId}>
        {/* Add hidden Modal.Title for Radix UI validation when DialogTitle is present */}
        {/* This must be rendered first so Radix UI can detect it synchronously */}
        {hasDialogTitle && actualTitleId && (
          <VisuallyHidden>
            <Modal.Title id={actualTitleId}>Dialog</Modal.Title>
          </VisuallyHidden>
        )}
        {processedChildren}
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
  ({ className, titleId, descriptionId, children, ...props }, ref) => {
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
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Check by displayName since forwardRef components don't work with ===
            const childDisplayName = (child.type as any)?.displayName;
            // Pass titleId to DialogTitle if present
            if (childDisplayName === "DialogTitle" && titleId) {
              return React.cloneElement(child as React.ReactElement<any>, {
                titleId: titleId,
              });
            }
            // Pass descriptionId to DialogDescription if present
            if (childDisplayName === "DialogDescription" && descriptionId) {
              return React.cloneElement(child as React.ReactElement<any>, {
                descriptionId: descriptionId,
              });
            }
          }
          return child;
        })}
      </div>
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
  ({ titleId, children, ...props }, ref) => {
    // className is forbidden on Foundation components - DialogTitle uses only token-driven props
    return (
      <Heading ref={ref} as="h2" level={4} weight="semibold" id={titleId} {...props}>
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
        spacing="sm"
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
