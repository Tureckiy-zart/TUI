/**
 * Drawer Component Types
 *
 * TypeScript type definitions for Drawer component and its subcomponents.
 */

import type { VariantProps } from "class-variance-authority";

import type { drawerVariants } from "./drawer-variants";

/**
 * Drawer position variants
 */
export type DrawerPosition = "left" | "right" | "bottom";

/**
 * Drawer size variants
 */
export type DrawerSize = "sm" | "md" | "lg";

/**
 * Backdrop variant for drawer overlay
 */
export type DrawerBackdropVariant = "default" | "blurred" | "transparent";

/**
 * Drawer Props
 * Main props interface for Drawer component
 */
export interface DrawerProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onClick" | "role" | "aria-modal" | "aria-labelledby" | "aria-describedby"
    >,
    VariantProps<typeof drawerVariants> {
  /**
   * Whether drawer is open
   */
  open: boolean;

  /**
   * Callback when drawer should close
   */
  onClose: () => void;

  /**
   * Drawer position variant
   */
  position?: DrawerPosition;

  /**
   * Drawer size variant
   */
  size?: DrawerSize;

  /**
   * Backdrop variant
   */
  backdropVariant?: DrawerBackdropVariant;

  /**
   * Whether to close on backdrop click
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether to close on escape key
   */
  closeOnEscape?: boolean;

  /**
   * Element to return focus to when drawer closes
   */
  returnFocusRef?: React.RefObject<HTMLElement>;

  /**
   * ID for the drawer title (for aria-labelledby)
   */
  titleId?: string;

  /**
   * ID for the drawer description (for aria-describedby)
   */
  descriptionId?: string;
}

/**
 * Drawer Header Props
 */
export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Drawer Body Props
 */
export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Drawer Footer Props
 */
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
