"use client";

/**
 * SegmentedControl Component
 *
 * Token-driven segmented control component with radio group pattern.
 * Supports keyboard navigation and full accessibility.
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { NAVIGATION_TOKENS } from "@/FOUNDATION/tokens/components/navigation";

// ============================================================================
// Types
// ============================================================================

/**
 * Size options for SegmentedControl
 * @public
 */
export type SegmentedControlSize = "sm" | "md" | "lg";

/**
 * Orientation options for SegmentedControl
 * @public
 */
export type SegmentedControlOrientation = "horizontal" | "vertical";

/**
 * State options for SegmentedControl items (internal)
 * @internal
 */
export type SegmentedControlState = "default" | "selected";

// ============================================================================
// Variants
// ============================================================================

/**
 * Size Mapping Table (per SIZE_MAPPING_SPEC.md)
 *
 * | Size | heightToken | paddingXToken | paddingYToken | textToken | radiusToken |
 * |------|-------------|---------------|---------------|-----------|-------------|
 * | sm   | NAVIGATION_TOKENS.sizes.sm.height | NAVIGATION_TOKENS.sizes.sm.padding.horizontal | NAVIGATION_TOKENS.sizes.sm.padding.vertical | NAVIGATION_TOKENS.sizes.sm.fontSize | NAVIGATION_TOKENS.radius.default |
 * | md   | NAVIGATION_TOKENS.sizes.md.height | NAVIGATION_TOKENS.sizes.md.padding.horizontal | NAVIGATION_TOKENS.sizes.md.padding.vertical | NAVIGATION_TOKENS.sizes.md.fontSize | NAVIGATION_TOKENS.radius.default |
 * | lg   | NAVIGATION_TOKENS.sizes.lg.height | NAVIGATION_TOKENS.sizes.lg.padding.horizontal | NAVIGATION_TOKENS.sizes.lg.padding.vertical | NAVIGATION_TOKENS.sizes.lg.fontSize | NAVIGATION_TOKENS.radius.default |
 */

const segmentedControlRootVariants = tokenCVA({
  base: `inline-flex items-center ${NAVIGATION_TOKENS.spacing.listGap.xs} ${NAVIGATION_TOKENS.radius.default} ${NAVIGATION_TOKENS.shadow.sm} ${NAVIGATION_TOKENS.container.padding.xs} ${NAVIGATION_TOKENS.container.background.muted}`,
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    } satisfies Record<SegmentedControlOrientation, string>,
    size: {
      sm: `${NAVIGATION_TOKENS.sizes.sm.fontSize}`,
      md: `${NAVIGATION_TOKENS.sizes.md.fontSize}`,
      lg: `${NAVIGATION_TOKENS.sizes.lg.fontSize}`,
    } satisfies Record<SegmentedControlSize, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

const segmentedControlItemVariants = tokenCVA({
  base: `inline-flex items-center justify-center whitespace-nowrap ${NAVIGATION_TOKENS.typography.fontWeight.medium} ${NAVIGATION_TOKENS.focus.ring} ${MOTION_TOKENS.transition.all} disabled:pointer-events-none disabled:opacity-50 relative`,
  variants: {
    size: {
      sm: `${NAVIGATION_TOKENS.sizes.sm.height} ${NAVIGATION_TOKENS.sizes.sm.padding.horizontal} ${NAVIGATION_TOKENS.sizes.sm.padding.vertical} ${NAVIGATION_TOKENS.sizes.sm.fontSize} ${NAVIGATION_TOKENS.radius.default}`,
      md: `${NAVIGATION_TOKENS.sizes.md.height} ${NAVIGATION_TOKENS.sizes.md.padding.horizontal} ${NAVIGATION_TOKENS.sizes.md.padding.vertical} ${NAVIGATION_TOKENS.sizes.md.fontSize} ${NAVIGATION_TOKENS.radius.default}`,
      lg: `${NAVIGATION_TOKENS.sizes.lg.height} ${NAVIGATION_TOKENS.sizes.lg.padding.horizontal} ${NAVIGATION_TOKENS.sizes.lg.padding.vertical} ${NAVIGATION_TOKENS.sizes.lg.fontSize} ${NAVIGATION_TOKENS.radius.default}`,
    } satisfies Record<SegmentedControlSize, string>,
    state: {
      default: `${NAVIGATION_TOKENS.states.default.background} ${NAVIGATION_TOKENS.states.default.text} ${NAVIGATION_TOKENS.states.hover.background} ${NAVIGATION_TOKENS.states.hover.text}`,
      selected: `${NAVIGATION_TOKENS.states.selected.background} ${NAVIGATION_TOKENS.states.selected.text} ${NAVIGATION_TOKENS.shadow.sm}`,
    } satisfies Record<SegmentedControlState, string>,
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

// ============================================================================
// Props
// ============================================================================

export interface SegmentedControlRootProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role"
> {
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

  /**
   * Orientation of the segmented control
   * @default "horizontal"
   */
  orientation?: SegmentedControlOrientation;

  /**
   * Size of the segmented control
   * @default "md"
   */
  size?: SegmentedControlSize;
}

export interface SegmentedControlItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "role"
> {
  /**
   * Value of this item
   */
  value: string;

  /**
   * Whether this item is disabled
   */
  disabled?: boolean;

  /**
   * Size of this item (overrides Root size if provided)
   */
  size?: SegmentedControlSize;
}

// ============================================================================
// Context
// ============================================================================

interface SegmentedControlContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  orientation: SegmentedControlOrientation;
  size: SegmentedControlSize;
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
// Keyboard Navigation Helper
// ============================================================================

/**
 * Calculates the next item index based on keyboard input and orientation
 * @internal
 */
function getNextIndex(
  currentIndex: number,
  key: string,
  orientation: SegmentedControlOrientation,
  itemCount: number,
): number {
  // Primary direction keys
  if (orientation === "horizontal") {
    if (key === "ArrowLeft") {
      return currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
    }
    if (key === "ArrowRight") {
      return currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
    }
  } else {
    if (key === "ArrowUp") {
      return currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
    }
    if (key === "ArrowDown") {
      return currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
    }
  }

  // Cross-orientation support (allow opposite direction keys for better UX)
  if (orientation === "horizontal") {
    if (key === "ArrowUp") {
      return currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
    }
    if (key === "ArrowDown") {
      return currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
    }
  } else {
    if (key === "ArrowLeft") {
      return currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
    }
    if (key === "ArrowRight") {
      return currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
    }
  }

  return currentIndex;
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

        // Calculate next index using helper function
        const nextIndex = getNextIndex(currentIndex, event.key, context.orientation, items.length);

        // Handle navigation if index changed
        if (nextIndex !== currentIndex) {
          event.preventDefault();
          const nextItem = items[nextIndex];
          if (nextItem) {
            nextItem.focus();
            const nextValue = nextItem.getAttribute("data-value");
            if (nextValue) {
              context.onValueChange(nextValue);
            }
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
