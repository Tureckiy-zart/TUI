"use client";

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { PROGRESS_TOKENS } from "@/FOUNDATION/tokens/components/progress";

/**
 * Progress size variants
 * Subset of GlobalSize scale (sm, md, lg)
 */
export type ProgressSize = "sm" | "md" | "lg";

/**
 * Progress component props
 */
export interface ProgressProps {
  /**
   * Progress value (0-max)
   */
  value: number;

  /**
   * Maximum progress value
   * @default 100
   */
  max?: number;

  /**
   * Progress bar size
   * @default "md"
   */
  size?: ProgressSize;
  // className removed - Foundation Enforcement compliance
}

/**
 * Progress variants using tokenCVA
 * Maps size prop to height and radius tokens
 */
export const progressVariants = tokenCVA({
  base: [PROGRESS_TOKENS.width.full, PROGRESS_TOKENS.radius].join(" "),
  variants: {
    size: {
      sm: PROGRESS_TOKENS.height.sm,
      md: PROGRESS_TOKENS.height.md,
      lg: PROGRESS_TOKENS.height.lg,
    } satisfies Record<ProgressSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Progress Component
 *
 * Displays visual feedback for operation progress from 0% to 100%.
 * Shows a filled bar proportional to the completion percentage.
 *
 * @example
 * ```tsx
 * // Default progress bar (md size)
 * <Progress value={45} />
 *
 * // Small progress bar
 * <Progress value={75} size="sm" />
 *
 * // Large progress bar
 * <Progress value={30} size="lg" />
 *
 * // With max value
 * <Progress value={3} max={10} /> // 30%
 * ```
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, size = "md" }, ref) => {
    // className and style are forbidden from public API - only token-based className is used
    // Calculate percentage and clamp to 0-100 range
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const effectiveSize = size || "md";

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(progressVariants({ size }), PROGRESS_TOKENS.track.bg)}
      >
        <div
          className={cn(
            PROGRESS_TOKENS.height[effectiveSize],
            PROGRESS_TOKENS.radius,
            PROGRESS_TOKENS.fill.bg,
            PROGRESS_TOKENS.transition,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";
