"use client";

/**
 * SegmentedControl Component
 *
 * Token-driven segmented control component with radio group pattern.
 * Supports keyboard navigation and full accessibility.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { NAVIGATION_TOKENS } from "@/tokens/components/navigation";

// ============================================================================
// Variants
// ============================================================================

const segmentedControlRootVariants = cva(
  `inline-flex items-center ${NAVIGATION_TOKENS.spacing.listGap.xs} ${NAVIGATION_TOKENS.radius.default} ${NAVIGATION_TOKENS.shadow.sm} ${NAVIGATION_TOKENS.container.padding.xs} ${NAVIGATION_TOKENS.container.background.muted}`,
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: `${NAVIGATION_TOKENS.sizes.sm.fontSize}`,
        md: `${NAVIGATION_TOKENS.sizes.md.fontSize}`,
        lg: `${NAVIGATION_TOKENS.sizes.lg.fontSize}`,
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  },
);

const segmentedControlItemVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap ${NAVIGATION_TOKENS.typography.fontWeight.medium} ${NAVIGATION_TOKENS.focus.ring} ${MOTION_TOKENS.transition.all} disabled:pointer-events-none disabled:opacity-50 relative`,
  {
    variants: {
      size: {
        sm: `${NAVIGATION_TOKENS.sizes.sm.height} ${NAVIGATION_TOKENS.sizes.sm.padding.horizontal} ${NAVIGATION_TOKENS.sizes.sm.padding.vertical} ${NAVIGATION_TOKENS.sizes.sm.fontSize} ${NAVIGATION_TOKENS.radius.default}`,
        md: `${NAVIGATION_TOKENS.sizes.md.height} ${NAVIGATION_TOKENS.sizes.md.padding.horizontal} ${NAVIGATION_TOKENS.sizes.md.padding.vertical} ${NAVIGATION_TOKENS.sizes.md.fontSize} ${NAVIGATION_TOKENS.radius.default}`,
        lg: `${NAVIGATION_TOKENS.sizes.lg.height} ${NAVIGATION_TOKENS.sizes.lg.padding.horizontal} ${NAVIGATION_TOKENS.sizes.lg.padding.vertical} ${NAVIGATION_TOKENS.sizes.lg.fontSize} ${NAVIGATION_TOKENS.radius.default}`,
      },
      state: {
        default: `${NAVIGATION_TOKENS.states.default.background} ${NAVIGATION_TOKENS.states.default.text} ${NAVIGATION_TOKENS.states.hover.background} ${NAVIGATION_TOKENS.states.hover.text}`,
        selected: `${NAVIGATION_TOKENS.states.selected.background} ${NAVIGATION_TOKENS.states.selected.text} ${NAVIGATION_TOKENS.shadow.sm}`,
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

// ============================================================================
// Types
// ============================================================================

export interface SegmentedControlRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof segmentedControlRootVariants> {
  /**
   * Controlled value
   */
  value?: string;

  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: string;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Name for the radio group
   */
  name?: string;
}

export interface SegmentedControlItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "role">,
    VariantProps<typeof segmentedControlItemVariants> {
  /**
   * Value of this item
   */
  value: string;

  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
}

// ============================================================================
// Context
// ============================================================================

interface SegmentedControlContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue | undefined>(
  undefined,
);

function useSegmentedControlContext() {
  const context = React.useContext(SegmentedControlContext);
  if (!context) {
    throw new Error("SegmentedControl components must be used within SegmentedControl.Root");
  }
  return context;
}

// ============================================================================
// Components
// ============================================================================

/**
 * SegmentedControl.Root - Container component that manages state
 */
const SegmentedControlRoot = React.forwardRef<HTMLDivElement, SegmentedControlRootProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      name: propName,
      orientation = "horizontal",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const name = React.useMemo(() => {
      if (propName) return propName;
      if (typeof document !== "undefined") {
        return `segmented-control-${Math.random().toString(36).substr(2, 9)}`;
      }
      return "segmented-control";
    }, [propName]);

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    const contextValue = React.useMemo<SegmentedControlContextValue>(
      () => ({
        value,
        onValueChange: handleValueChange,
        name,
        orientation: orientation ?? "horizontal",
        size: size ?? "md",
      }),
      [value, handleValueChange, name, orientation, size],
    );

    return (
      <SegmentedControlContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation ?? "horizontal"}
          className={cn(segmentedControlRootVariants({ orientation, size }), className)}
          {...props}
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    );
  },
);
SegmentedControlRoot.displayName = "SegmentedControl.Root";

/**
 * SegmentedControl.Item - Individual segment button
 */
const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ className, value, disabled, size, children, ...props }, ref) => {
    const context = useSegmentedControlContext();
    const isSelected = context.value === value;
    const effectiveSize = size || context.size || "md";

    const itemRef = React.useRef<HTMLButtonElement>(null);
    React.useImperativeHandle(ref, () => itemRef.current!);

    // Roving tabindex: only selected item is focusable
    const tabIndex = isSelected ? 0 : -1;

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const items = Array.from(
          itemRef.current?.parentElement?.querySelectorAll<HTMLButtonElement>(
            '[role="radio"]:not([disabled])',
          ) || [],
        );
        const currentIndex = items.findIndex((item) => item === itemRef.current);

        let nextIndex = currentIndex;

        if (context.orientation === "horizontal") {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        }

        // Also support opposite direction for better UX
        if (context.orientation === "horizontal") {
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            // Allow vertical navigation even in horizontal mode
            if (event.key === "ArrowUp") {
              nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            } else {
              nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            }
          }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          // Allow horizontal navigation even in vertical mode
          if (event.key === "ArrowLeft") {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          } else {
            nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          }
        }

        const nextItem = items[nextIndex];
        if (nextIndex !== currentIndex && nextItem) {
          nextItem.focus();
          const nextValue = nextItem.getAttribute("data-value");
          if (nextValue) {
            context.onValueChange(nextValue);
          }
        }
      },
      [disabled, context],
    );

    return (
      <button
        ref={itemRef}
        type="button"
        role="radio"
        aria-checked={isSelected}
        tabIndex={tabIndex}
        disabled={disabled}
        data-value={value}
        name={context.name}
        className={cn(
          segmentedControlItemVariants({
            size: effectiveSize,
            state: isSelected ? "selected" : "default",
          }),
          className,
        )}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && context.onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
SegmentedControlItem.displayName = "SegmentedControl.Item";

// ============================================================================
// Exports
// ============================================================================

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Root: SegmentedControlRoot,
  Item: SegmentedControlItem,
});

export { segmentedControlItemVariants, segmentedControlRootVariants };
