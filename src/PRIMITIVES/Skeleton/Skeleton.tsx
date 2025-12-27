"use client";

/**
 * Skeleton Component v2
 *
 * Token-driven skeleton loading component with multiple variants.
 * Uses DATA_TOKENS for all sizing and styling.
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { DATA_TOKENS } from "@/FOUNDATION/tokens/components/data";

/**
 * Skeleton variant type
 * Explicit union type for variant prop
 */
export type SkeletonVariant = "text" | "inline" | "block" | "card" | "circle";

const skeletonVariants = tokenCVA({
  base: `${DATA_TOKENS.skeleton.background.default} ${DATA_TOKENS.skeleton.animation.pulse}`,
  variants: {
    variant: {
      text: `${DATA_TOKENS.skeleton.height.text} ${DATA_TOKENS.skeleton.radius.text} ${DATA_TOKENS.skeleton.width.full}`,
      inline: `${DATA_TOKENS.skeleton.height.inline} ${DATA_TOKENS.skeleton.radius.inline} ${DATA_TOKENS.skeleton.width.inline}`,
      block: `${DATA_TOKENS.skeleton.height.block} ${DATA_TOKENS.skeleton.radius.block} ${DATA_TOKENS.skeleton.width.full}`,
      card: `${DATA_TOKENS.skeleton.height.card} ${DATA_TOKENS.skeleton.radius.card} ${DATA_TOKENS.skeleton.width.full}`,
      circle: `${DATA_TOKENS.skeleton.height.circle} ${DATA_TOKENS.skeleton.radius.circle}`,
    } satisfies Record<SkeletonVariant, string>,
  },
  defaultVariants: {
    variant: "text",
  },
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Skeleton variant style
   * @default "text"
   */
  variant?: SkeletonVariant;
  /**
   * Whether to hide from screen readers
   * @default true
   */
  "aria-hidden"?: boolean;
}

/**
 * Skeleton component for loading states
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" />
 * <Skeleton variant="circle" />
 * <Skeleton variant="card" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, "aria-hidden": ariaHidden = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        aria-hidden={ariaHidden}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
