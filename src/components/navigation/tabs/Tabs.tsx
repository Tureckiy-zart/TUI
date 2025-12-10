"use client";

/**
 * Tabs Component
 *
 * Token-driven tabs component with full keyboard navigation and accessibility support.
 * Follows ARIA tabs pattern with roving tabindex.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { NAVIGATION_TOKENS } from "@/tokens/components/navigation";

// ============================================================================
// Variants
// ============================================================================

const tabsListVariants = cva(
  `inline-flex items-center justify-center ${NAVIGATION_TOKENS.spacing.listGap.md} ${NAVIGATION_TOKENS.typography.default} ${NAVIGATION_TOKENS.shadow.sm}`,
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

const tabsTriggerVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap ${NAVIGATION_TOKENS.typography.fontWeight.medium} ${NAVIGATION_TOKENS.focus.ring} ${MOTION_TOKENS.transition.colors} disabled:pointer-events-none disabled:opacity-50 relative`,
  {
    variants: {
      size: {
        sm: `${NAVIGATION_TOKENS.sizes.sm.height} ${NAVIGATION_TOKENS.sizes.sm.padding.horizontal} ${NAVIGATION_TOKENS.sizes.sm.padding.vertical} ${NAVIGATION_TOKENS.sizes.sm.fontSize}`,
        md: `${NAVIGATION_TOKENS.sizes.md.height} ${NAVIGATION_TOKENS.sizes.md.padding.horizontal} ${NAVIGATION_TOKENS.sizes.md.padding.vertical} ${NAVIGATION_TOKENS.sizes.md.fontSize}`,
        lg: `${NAVIGATION_TOKENS.sizes.lg.height} ${NAVIGATION_TOKENS.sizes.lg.padding.horizontal} ${NAVIGATION_TOKENS.sizes.lg.padding.vertical} ${NAVIGATION_TOKENS.sizes.lg.fontSize}`,
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

export interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controlled value for the active tab
   */
  value?: string;

  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: string;

  /**
   * Callback when the active tab changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Orientation of the tabs
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
}

export interface TabsListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof tabsListVariants> {
  /**
   * Gap between tab items
   */
  gap?: "xs" | "sm" | "md" | "lg";
}

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "role">,
    VariantProps<typeof tabsTriggerVariants> {
  /**
   * Value of this tab (must be unique)
   */
  value: string;

  /**
   * Whether this tab is disabled
   */
  disabled?: boolean;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the tab this content belongs to
   */
  value: string;

  /**
   * Force mount the content (useful for SSR)
   */
  forceMount?: boolean;
}

// ============================================================================
// Context
// ============================================================================

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs.Root");
  }
  return context;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Tabs.Root - Container component that manages tab state
 */
const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    // Infer size from first TabsList if available
    const [size, setSize] = React.useState<"sm" | "md" | "lg">("md");

    const contextValue = React.useMemo<TabsContextValue>(
      () => ({
        value,
        onValueChange: handleValueChange,
        orientation,
        size,
      }),
      [value, handleValueChange, orientation, size],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === TabsList) {
              const childProps = child.props as TabsListPropsInternal;
              return React.cloneElement(child as React.ReactElement<TabsListPropsInternal>, {
                ...childProps,
                onSizeChange: setSize,
              });
            }
            return child;
          })}
        </div>
      </TabsContext.Provider>
    );
  },
);
TabsRoot.displayName = "Tabs.Root";

/**
 * Tabs.List - Container for tab triggers
 */
interface TabsListPropsInternal extends TabsListProps {
  onSizeChange?: (size: "sm" | "md" | "lg") => void;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListPropsInternal>(
  ({ className, orientation, size = "md", onSizeChange, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const effectiveOrientation = orientation || context?.orientation || "horizontal";
    const effectiveSize = size || context?.size || "md";

    React.useEffect(() => {
      onSizeChange?.(effectiveSize);
    }, [effectiveSize, onSizeChange]);

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={effectiveOrientation}
        className={cn(
          tabsListVariants({ orientation: effectiveOrientation, size: effectiveSize }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = "Tabs.List";

/**
 * Tabs.Trigger - Individual tab button
 */
interface TabsTriggerPropsInternal extends TabsTriggerProps {}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerPropsInternal>(
  ({ className, value, disabled, size, children, ...props }, ref) => {
    const context = useTabsContext();
    const isSelected = context.value === value;
    const effectiveSize = size || context.size || "md";

    const triggerRef = React.useRef<HTMLButtonElement>(null);
    React.useImperativeHandle(ref, () => triggerRef.current!);

    // Roving tabindex: only selected tab is focusable
    const tabIndex = isSelected ? 0 : -1;

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const triggers = Array.from(
          triggerRef.current?.parentElement?.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not([disabled])',
          ) || [],
        );
        const currentIndex = triggers.findIndex((t) => t === triggerRef.current);

        let nextIndex = currentIndex;

        if (context.orientation === "horizontal") {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            nextIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          nextIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
        }

        if (event.key === "Home") {
          event.preventDefault();
          nextIndex = 0;
        } else if (event.key === "End") {
          event.preventDefault();
          nextIndex = triggers.length - 1;
        }

        const nextTrigger = triggers[nextIndex];
        if (nextIndex !== currentIndex && nextTrigger) {
          nextTrigger.focus();
          const nextValue = nextTrigger.getAttribute("data-value");
          if (nextValue) {
            context.onValueChange(nextValue);
          }
        }
      },
      [disabled, context],
    );

    // Generate unique ID for aria-controls
    const triggerId = React.useMemo(() => {
      if (typeof document !== "undefined") {
        return `tabs-trigger-${value}-${Math.random().toString(36).substr(2, 9)}`;
      }
      return `tabs-trigger-${value}`;
    }, [value]);
    const contentId = React.useMemo(() => `tabs-content-${value}`, [value]);

    return (
      <button
        ref={triggerRef}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={contentId}
        tabIndex={tabIndex}
        disabled={disabled}
        data-value={value}
        className={cn(
          tabsTriggerVariants({ size: effectiveSize, state: isSelected ? "selected" : "default" }),
          className,
        )}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && context.onValueChange(value)}
        {...props}
      >
        {children}
        {isSelected && (
          <span
            className={cn(
              NAVIGATION_TOKENS.indicator.height,
              NAVIGATION_TOKENS.indicator.background,
              NAVIGATION_TOKENS.indicator.radius,
              NAVIGATION_TOKENS.indicator.transition,
              NAVIGATION_TOKENS.indicator.position,
            )}
            aria-hidden="true"
          />
        )}
      </button>
    );
  },
);
TabsTrigger.displayName = "Tabs.Trigger";

/**
 * Tabs.Content - Content panel for each tab
 */

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, forceMount, children, ...props }, ref) => {
    const context = useTabsContext();
    const isSelected = context.value === value;

    // Generate IDs before any conditional returns
    const contentId = React.useMemo(() => {
      if (typeof document !== "undefined") {
        return `tabs-content-${value}-${Math.random().toString(36).substr(2, 9)}`;
      }
      return `tabs-content-${value}`;
    }, [value]);
    const triggerId = React.useMemo(() => `tabs-trigger-${value}`, [value]);

    // SSR safety: don't render content on server if not force mounted
    const [mounted, setMounted] = React.useState(forceMount || false);

    React.useEffect(() => {
      if (typeof document !== "undefined") {
        setMounted(true);
      }
    }, []);

    if (!mounted && !forceMount && !isSelected) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={contentId}
        aria-labelledby={triggerId}
        hidden={!isSelected}
        className={cn(
          "mt-2",
          isSelected ? "block" : "hidden",
          NAVIGATION_TOKENS.focus.ring,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = "Tabs.Content";

// ============================================================================
// Exports
// ============================================================================

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { tabsListVariants, tabsTriggerVariants };
