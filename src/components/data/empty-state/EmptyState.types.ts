/**
 * EmptyState Component Types
 *
 * TypeScript interfaces and types for EmptyState component.
 */

import type { ReactNode } from "react";

/**
 * EmptyState root component props
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique ID for accessibility (auto-generated if not provided)
   */
  id?: string;
}

/**
 * EmptyState Icon component props
 */
export interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon content (any ReactNode)
   */
  children: ReactNode;

  /**
   * Icon size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * EmptyState Title component props
 */
export interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title text
   */
  children: ReactNode;
}

/**
 * EmptyState Description component props
 */
export interface EmptyStateDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Description text
   */
  children: ReactNode;
}

/**
 * EmptyState Action component props
 */
export interface EmptyStateActionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Action button or link (typically Button component)
   */
  children: ReactNode;
}
