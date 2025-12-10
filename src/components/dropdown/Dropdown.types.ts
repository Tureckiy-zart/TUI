import type { VariantProps } from "class-variance-authority";

import type {
  dropdownItemVariants,
  dropdownMenuVariants,
  dropdownTriggerVariants,
} from "./dropdown-variants";

/**
 * Dropdown Root Props
 * Props for the DropdownRoot component that manages dropdown state
 */
export interface DropdownRootProps {
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Default open state (uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * Disable the dropdown
   */
  disabled?: boolean;
  /**
   * Dropdown children
   */
  children: React.ReactNode;
  /**
   * Dropdown variant
   */
  variant?: "neutral" | "tinted";
  /**
   * Dropdown size
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Dropdown Trigger Props
 * Props for the DropdownTrigger component
 */
export interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownTriggerVariants> {
  /**
   * Render as child element
   */
  asChild?: boolean;
  /**
   * Dropdown trigger children
   */
  children: React.ReactNode;
}

/**
 * Dropdown Menu Props
 * Props for the DropdownMenu component
 */
export interface DropdownMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownMenuVariants> {
  /**
   * Dropdown menu children
   */
  children: React.ReactNode;
}

/**
 * Dropdown Item Props
 * Props for the DropdownItem component
 */
export interface DropdownItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof dropdownItemVariants> {
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  /**
   * Callback when item is selected
   */
  onSelect?: (event: Event) => void;
  /**
   * Dropdown item children
   */
  children: React.ReactNode;
}
