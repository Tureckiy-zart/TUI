"use client";

/**
 * Stepper Component
 *
 * Token-driven stepper component for multi-step processes.
 * Supports horizontal and vertical orientations with full accessibility.
 */

import { Check } from "lucide-react";
import * as React from "react";

import { ListItem } from "@/COMPOSITION/layout";
import { cn } from "@/FOUNDATION/lib/utils";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { NAVIGATION_TOKENS } from "@/FOUNDATION/tokens/components/navigation";

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

export interface StepperRootProps extends React.HTMLAttributes<HTMLOListElement> {
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

export interface StepperItemProps extends React.HTMLAttributes<HTMLLIElement> {
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
// Internal Helpers
// ============================================================================

/**
 * Gets state-based className for indicator based on step state
 */
function getIndicatorStateClasses(
  isCompleted: boolean,
  isActive: boolean,
  disabled?: boolean,
): string {
  if (isCompleted || isActive) {
    return `${NAVIGATION_TOKENS.states.selected.background} ${NAVIGATION_TOKENS.states.selected.text} ${NAVIGATION_TOKENS.states.selected.border}`;
  }

  return `${NAVIGATION_TOKENS.states.default.border} ${NAVIGATION_TOKENS.border.muted} ${NAVIGATION_TOKENS.states.default.background} ${NAVIGATION_TOKENS.states.default.text} ${disabled ? NAVIGATION_TOKENS.states.disabled.text : ""}`;
}

/**
 * Renders indicator content (icon or step number)
 */
function renderIndicatorContent(
  icon: React.ReactNode | undefined,
  showNumber: boolean,
  index: number,
): React.ReactNode {
  if (icon) {
    return icon;
  }

  if (showNumber) {
    return <span>{index + 1}</span>;
  }

  return null;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Stepper.Root - Main stepper container
 */
const StepperRoot = React.forwardRef<HTMLOListElement, StepperRootProps>(
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
      <ol
        ref={ref as React.Ref<HTMLOListElement>}
        role="group"
        aria-label="Progress steps"
        aria-orientation={orientation}
        className={cn(
          "flex list-none",
          orientation === "horizontal" ? "flex-row items-start" : "flex-col",
          NAVIGATION_TOKENS.spacing.listGap.md,
          className,
        )}
        {...(props as React.HTMLAttributes<HTMLOListElement>)}
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
      </ol>
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

const StepperItem = React.forwardRef<HTMLLIElement, StepperItemPropsInternal>(
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
      <ListItem
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
      </ListItem>
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

    const stateClasses = getIndicatorStateClasses(isCompleted, isActive, disabled);
    const content = isCompleted ? (
      <Check className={ICON_TOKENS.sizes.md} aria-hidden="true" />
    ) : (
      renderIndicatorContent(icon, showNumber, index)
    );

    // Only active step should have aria-current="step"
    // Completed steps should not have aria-current (they are past steps)
    const ariaCurrent = isActive ? "step" : undefined;

    return (
      <div
        ref={ref}
        className={cn(baseClasses, stateClasses, className)}
        aria-current={ariaCurrent}
        aria-disabled={disabled ? "true" : undefined}
        {...props}
      >
        {content}
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
            aria-label={`${label}: ${description}`}
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
  ({ className, isActive, stepIndex: _stepIndex, children, ...props }, ref) => {
    if (!isActive) {
      return null;
    }

    // Filter out non-DOM props (stepIndex is not a DOM attribute)
    const { stepIndex: __stepIndex, ...domProps } = props as any;

    return (
      <div
        ref={ref}
        className={cn(NAVIGATION_TOKENS.spacing.content.marginTop, className)}
        {...domProps}
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
