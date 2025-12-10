"use client";

/**
 * Stepper Component
 *
 * Token-driven stepper component for multi-step processes.
 * Supports horizontal and vertical orientations with full accessibility.
 */

import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { NAVIGATION_TOKENS } from "@/tokens/components/navigation";

// ============================================================================
// Types
// ============================================================================

export interface StepperStep {
  /**
   * Unique identifier for the step
   */
  id: string;

  /**
   * Label text for the step
   */
  label: string;

  /**
   * Optional description for the step
   */
  description?: string;

  /**
   * Optional icon for the step indicator
   */
  icon?: React.ReactNode;

  /**
   * Whether this step is disabled
   */
  disabled?: boolean;
}

export interface StepperRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of steps
   */
  steps: StepperStep[];

  /**
   * Current active step index (0-indexed)
   */
  activeStep: number;

  /**
   * Orientation of the stepper
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Whether to show step numbers
   * @default true
   */
  showNumbers?: boolean;
}

export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Step data
   */
  step: StepperStep;

  /**
   * Step index (0-indexed)
   */
  index: number;

  /**
   * Whether this is the active step
   */
  isActive: boolean;

  /**
   * Whether this step is completed
   */
  isCompleted: boolean;

  /**
   * Whether to show step number
   */
  showNumber?: boolean;
}

export interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Step index
   */
  index: number;

  /**
   * Whether this is the active step
   */
  isActive: boolean;

  /**
   * Whether this step is completed
   */
  isCompleted: boolean;

  /**
   * Whether this step is disabled
   */
  disabled?: boolean;

  /**
   * Custom icon
   */
  icon?: React.ReactNode;

  /**
   * Whether to show step number
   */
  showNumber?: boolean;
}

export interface StepperLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Step label text
   */
  label: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Whether this is the active step
   */
  isActive: boolean;
}

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Step index this content belongs to
   */
  stepIndex: number;

  /**
   * Whether this content should be visible
   */
  isActive: boolean;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Stepper.Root - Main stepper container
 */
const StepperRoot = React.forwardRef<HTMLDivElement, StepperRootProps>(
  (
    {
      steps,
      activeStep,
      orientation = "horizontal",
      showNumbers = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const safeActiveStep = Math.min(Math.max(0, activeStep), steps.length - 1);

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row items-start" : "flex-col",
          NAVIGATION_TOKENS.spacing.listGap.md,
          className,
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isActive = index === safeActiveStep;
          const isCompleted = index < safeActiveStep;

          return (
            <StepperItem
              key={step.id}
              step={step}
              index={index}
              isActive={isActive}
              isCompleted={isCompleted}
              showNumber={showNumbers}
              orientation={orientation}
            />
          );
        })}
        {children}
      </div>
    );
  },
);
StepperRoot.displayName = "Stepper.Root";

/**
 * Stepper.Item - Individual step container
 */
interface StepperItemPropsInternal extends StepperItemProps {
  orientation?: "horizontal" | "vertical";
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemPropsInternal>(
  (
    {
      className,
      step,
      index,
      isActive,
      isCompleted,
      showNumber = true,
      orientation = "horizontal",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start",
          orientation === "horizontal" ? "flex-col" : "flex-row",
          NAVIGATION_TOKENS.spacing.listGap.sm,
          className,
        )}
        {...props}
      >
        <StepperIndicator
          index={index}
          isActive={isActive}
          isCompleted={isCompleted}
          disabled={step.disabled}
          icon={step.icon}
          showNumber={showNumber}
        />
        <StepperLabel label={step.label} description={step.description} isActive={isActive} />
      </div>
    );
  },
);
StepperItem.displayName = "Stepper.Item";

/**
 * Stepper.Indicator - Step indicator (circle/icon/number)
 */
const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  (
    { className, index, isActive, isCompleted, disabled, icon, showNumber = true, ...props },
    ref,
  ) => {
    const baseClasses = cn(
      NAVIGATION_TOKENS.sizes.sm.height,
      NAVIGATION_TOKENS.sizes.sm.width,
      "flex items-center justify-center",
      NAVIGATION_TOKENS.radius.full,
      NAVIGATION_TOKENS.typography.fontWeight.medium,
      NAVIGATION_TOKENS.sizes.sm.fontSize,
      "border-2",
      MOTION_TOKENS.transition.colors,
    );

    if (isCompleted) {
      return (
        <div
          ref={ref}
          className={cn(
            baseClasses,
            `${NAVIGATION_TOKENS.states.selected.background} ${NAVIGATION_TOKENS.states.selected.text} ${NAVIGATION_TOKENS.states.selected.border}`,
            className,
          )}
          aria-current={isActive ? "step" : undefined}
          {...props}
        >
          <Check className="h-4 w-4" aria-hidden="true" />
        </div>
      );
    }

    if (isActive) {
      return (
        <div
          ref={ref}
          className={cn(
            baseClasses,
            `${NAVIGATION_TOKENS.states.selected.background} ${NAVIGATION_TOKENS.states.selected.text} ${NAVIGATION_TOKENS.states.selected.border}`,
            className,
          )}
          aria-current="step"
          {...props}
        >
          {icon || (showNumber && <span>{index + 1}</span>)}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          `${NAVIGATION_TOKENS.states.default.border} ${NAVIGATION_TOKENS.border.muted} ${NAVIGATION_TOKENS.states.default.background} ${NAVIGATION_TOKENS.states.default.text}`,
          disabled && NAVIGATION_TOKENS.states.disabled.text,
          className,
        )}
        {...props}
      >
        {icon || (showNumber && <span>{index + 1}</span>)}
      </div>
    );
  },
);
StepperIndicator.displayName = "Stepper.Indicator";

/**
 * Stepper.Label - Step label and description
 */
const StepperLabel = React.forwardRef<HTMLDivElement, StepperLabelProps>(
  ({ className, label, description, isActive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", NAVIGATION_TOKENS.spacing.listGap.xs, className)}
        {...props}
      >
        <span
          className={cn(
            NAVIGATION_TOKENS.typography.default,
            isActive
              ? NAVIGATION_TOKENS.typography.fontWeight.semibold
              : NAVIGATION_TOKENS.typography.fontWeight.normal,
            isActive
              ? NAVIGATION_TOKENS.states.selected.text
              : NAVIGATION_TOKENS.states.default.text,
          )}
        >
          {label}
        </span>
        {description && (
          <span
            className={cn(
              NAVIGATION_TOKENS.typography.sm,
              NAVIGATION_TOKENS.states.default.text,
              ICON_TOKENS.colors.muted,
            )}
          >
            {description}
          </span>
        )}
      </div>
    );
  },
);
StepperLabel.displayName = "Stepper.Label";

/**
 * Stepper.Content - Content area for step
 */
const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ className, isActive, children, ...props }, ref) => {
    if (!isActive) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(NAVIGATION_TOKENS.spacing.content.marginTop, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
StepperContent.displayName = "Stepper.Content";

// ============================================================================
// Exports
// ============================================================================

export const Stepper = Object.assign(StepperRoot, {
  Root: StepperRoot,
  Item: StepperItem,
  Indicator: StepperIndicator,
  Label: StepperLabel,
  Content: StepperContent,
});
