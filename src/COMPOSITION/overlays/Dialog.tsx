"use client";

/**
 * Dialog Component
 *
 * Semantic modal wrapper built on Modal component.
 * Provides Dialog.Header, Dialog.Title, Dialog.Description, Dialog.Body, Dialog.Footer subcomponents.
 * Full A11y compliance with aria-labelledby and aria-describedby.
 *
 * @enforcement TUNG_DIALOG_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use OVERLAY_TOKENS, ICON_TOKENS, and TEXT_TOKENS
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL typography classes MUST use TEXT_TOKENS
 * - ALL icon styling MUST use ICON_TOKENS
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - NO raw typography values allowed
 * - Dialog composes Modal component (delegates overlay styling to Modal)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from OVERLAY_TOKENS for overlay styling
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography classes MUST use TEXT_TOKENS
 * - Typography is applied via Heading and Text components
 * - NO raw Tailwind typography classes allowed
 *
 * Icon Authority Rules:
 * - ALL icon styling MUST use ICON_TOKENS
 * - Icon sizes and colors come from ICON_TOKENS
 * - NO raw Tailwind icon classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Dialog uses color token system exclusively via OVERLAY_TOKENS
 * - Typography Authority: Dialog uses typography token system exclusively via TEXT_TOKENS
 * - Icon Authority: Dialog uses icon token system exclusively via ICON_TOKENS
 * - Layout Authority: Dialog composes Modal, Row, and other layout components
 *
 * Token-only contract:
 * - All styling is defined in OVERLAY_TOKENS (src/FOUNDATION/tokens/components/overlay.ts)
 * - Typography uses TEXT_TOKENS (src/FOUNDATION/tokens/components/text.ts)
 * - Icons use ICON_TOKENS (src/FOUNDATION/tokens/components/icon.ts)
 * - Dialog composes Modal component which handles overlay styling
 * - No raw Tailwind color/typography classes are allowed
 * - TypeScript enforces valid token values at compile time
 */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { VisuallyHidden } from "@/COMPOSITION/a11y/VisuallyHidden";
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
        hasDialogTitle = true;
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
  if (!hasDialogTitle) {
    actualTitleId = finalTitleId;
  }

  return (
    <Modal.Root {...props}>
      <Modal.Content aria-labelledby={actualTitleId} aria-describedby={actualDescriptionId}>
        {!hasDialogTitle && (
          <VisuallyHidden>
            <DialogPrimitive.Title id={finalTitleId}>Dialog</DialogPrimitive.Title>
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
export interface DialogTitleProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "className" | "style" | "color"
> {
  titleId?: string;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (
    {
      titleId,
      children,
      role,
      tabIndex,
      title,
      dir,
      lang,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
      "aria-busy": ariaBusy,
    },
    ref,
  ) => {
    return (
      <DialogPrimitive.Title asChild>
        <Heading
          ref={ref}
          as="h2"
          level={4}
          weight="semibold"
          id={titleId}
          role={role}
          tabIndex={tabIndex}
          title={title}
          dir={dir}
          lang={lang}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-live={ariaLive}
          aria-atomic={ariaAtomic}
          aria-busy={ariaBusy}
        >
          {children}
        </Heading>
      </DialogPrimitive.Title>
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
      <DialogPrimitive.Description asChild>
        <p
          ref={ref}
          id={descriptionId}
          className={cn(TEXT_TOKENS.fontSize.sm, ICON_TOKENS.colors.muted, className)}
          {...props}
        >
          {children}
        </p>
      </DialogPrimitive.Description>
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
