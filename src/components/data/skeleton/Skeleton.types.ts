/**
 * Skeleton Component Types
 *
 * TypeScript interfaces and types for Skeleton component.
 */

import type { VariantProps } from "class-variance-authority";

import type { skeletonVariants } from "./Skeleton";

/**
 * Skeleton component props
 */
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Whether to hide from screen readers
   * @default true
   */
  "aria-hidden"?: boolean;
}
