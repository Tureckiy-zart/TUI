"use client";

/**
 * Tabs Component
 *
 * Radix-based tabs component with token-driven styling.
 * All behavior (keyboard navigation, focus management, a11y) is handled by Radix.
 * Tenerife UI provides visual styling through tokens only.
 */

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import * as React from "react";

import { getBaseValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { TABS_TOKENS } from "@/tokens/components/tabs";
import type {
  ResponsiveTabsSize,
  TabsSizeToken,
  TabsToneToken,
  TabsVariantToken,
} from "@/tokens/types";

// ============================================================================
// CVA VARIANTS
// ============================================================================

const tabsListVariants = cva(
  `inline-flex items-center justify-center outline-none data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col`,
  {
    variants: {
      size: {
        sm: `${TABS_TOKENS.size.sm.list.gap} ${TABS_TOKENS.size.sm.list.padding}`,
        md: `${TABS_TOKENS.size.md.list.gap} ${TABS_TOKENS.size.md.list.padding}`,
        lg: `${TABS_TOKENS.size.lg.list.gap} ${TABS_TOKENS.size.lg.list.padding}`,
      },
      variant: {
        underline: "",
        pill: "",
        segmented: `${TABS_TOKENS.variant.segmented.list.background} ${TABS_TOKENS.variant.segmented.list.padding} ${TABS_TOKENS.variant.segmented.list.radius}`,
      },
    },
    defaultVariants: {
      size: "md",
      variant: "underline",
    },
  },
);

const tabsTriggerVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap outline-none ${TABS_TOKENS.transition.colors} ${TABS_TOKENS.focus.ring} ${TABS_TOKENS.disabled.opacity} ${TABS_TOKENS.disabled.pointerEvents} ${TABS_TOKENS.disabled.cursor} relative`,
  {
    variants: {
      size: {
        sm: `${TABS_TOKENS.size.sm.trigger.height} ${TABS_TOKENS.size.sm.trigger.padding.horizontal} ${TABS_TOKENS.size.sm.trigger.padding.vertical} ${TABS_TOKENS.size.sm.trigger.fontSize} ${TABS_TOKENS.trigger.fontWeight}`,
        md: `${TABS_TOKENS.size.md.trigger.height} ${TABS_TOKENS.size.md.trigger.padding.horizontal} ${TABS_TOKENS.size.md.trigger.padding.vertical} ${TABS_TOKENS.size.md.trigger.fontSize} ${TABS_TOKENS.trigger.fontWeight}`,
        lg: `${TABS_TOKENS.size.lg.trigger.height} ${TABS_TOKENS.size.lg.trigger.padding.horizontal} ${TABS_TOKENS.size.lg.trigger.padding.vertical} ${TABS_TOKENS.size.lg.trigger.fontSize} ${TABS_TOKENS.trigger.fontWeight}`,
      },
      variant: {
        underline: cn(
          TABS_TOKENS.variant.underline.trigger.default.background,
          TABS_TOKENS.variant.underline.trigger.default.text,
          TABS_TOKENS.variant.underline.trigger.default.border,
          TABS_TOKENS.variant.underline.trigger.hover.background,
          TABS_TOKENS.variant.underline.trigger.hover.text,
          TABS_TOKENS.variant.underline.trigger.active.border,
        ),
        pill: cn(
          TABS_TOKENS.variant.pill.trigger.default.background,
          TABS_TOKENS.variant.pill.trigger.default.text,
          TABS_TOKENS.variant.pill.trigger.default.border,
          TABS_TOKENS.variant.pill.trigger.default.radius,
          TABS_TOKENS.variant.pill.trigger.hover.background,
          TABS_TOKENS.variant.pill.trigger.hover.text,
          TABS_TOKENS.variant.pill.trigger.active.background,
          TABS_TOKENS.variant.pill.trigger.active.text,
          TABS_TOKENS.variant.pill.trigger.active.radius,
        ),
        segmented: cn(
          TABS_TOKENS.variant.segmented.trigger.default.background,
          TABS_TOKENS.variant.segmented.trigger.default.text,
          TABS_TOKENS.variant.segmented.trigger.default.border,
          TABS_TOKENS.variant.segmented.trigger.hover.background,
          TABS_TOKENS.variant.segmented.trigger.hover.text,
          TABS_TOKENS.variant.segmented.trigger.active.background,
          TABS_TOKENS.variant.segmented.trigger.active.text,
          TABS_TOKENS.variant.segmented.trigger.active.border,
          TABS_TOKENS.variant.segmented.trigger.active.shadow,
        ),
      },
      tone: {
        neutral: "",
        primary: "",
      },
    },
    compoundVariants: [
      // Underline variant with indicator (CSS-based)
      {
        variant: "underline",
        className: cn(
          "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0",
          TABS_TOKENS.variant.underline.indicator.height,
          TABS_TOKENS.variant.underline.indicator.background,
          TABS_TOKENS.variant.underline.indicator.position,
          TABS_TOKENS.variant.underline.indicator.transition,
          "after:scale-x-0 data-[state=active]:after:scale-x-100",
        ),
      },
      // Tone-based active states for underline - override default active states
      {
        variant: "underline",
        tone: "primary",
        className: `data-[state=active]:${TABS_TOKENS.tone.primary.active.border} after:${TABS_TOKENS.tone.primary.indicator.background}`,
      },
      {
        variant: "underline",
        tone: "neutral",
        className: `data-[state=active]:${TABS_TOKENS.tone.neutral.active.border} after:${TABS_TOKENS.tone.neutral.indicator.background}`,
      },
      // Tone-based active states for pill - override default active states
      {
        variant: "pill",
        tone: "primary",
        className: `data-[state=active]:${TABS_TOKENS.tone.primary.active.background} data-[state=active]:${TABS_TOKENS.tone.primary.active.text}`,
      },
      {
        variant: "pill",
        tone: "neutral",
        className: `data-[state=active]:${TABS_TOKENS.tone.neutral.active.background} data-[state=active]:${TABS_TOKENS.tone.neutral.active.text}`,
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "underline",
      tone: "primary",
    },
  },
);

const tabsContentVariants = cva(`outline-none`, {
  variants: {
    size: {
      sm: `${TABS_TOKENS.size.sm.content.padding} ${TABS_TOKENS.size.sm.content.marginTop}`,
      md: `${TABS_TOKENS.size.md.content.padding} ${TABS_TOKENS.size.md.content.marginTop}`,
      lg: `${TABS_TOKENS.size.lg.content.padding} ${TABS_TOKENS.size.lg.content.marginTop}`,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// TABS ROOT
// ============================================================================

export interface TabsRootProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

/**
 * Tabs Root component
 * Radix Root is a context provider, not a DOM element, so it doesn't accept refs
 */
const TabsRoot: React.FC<TabsRootProps> = ({ children, ...props }) => {
  return <TabsPrimitive.Root {...props}>{children}</TabsPrimitive.Root>;
};
TabsRoot.displayName = TabsPrimitive.Root.displayName;

// ============================================================================
// TABS LIST
// ============================================================================

export interface TabsListProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>, "size" | "variant"> {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveTabsSize;
  /**
   * Visual variant - token-based
   */
  variant?: TabsVariantToken;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, size, variant, ...props }, ref) => {
    const baseSize = getBaseValue(size) ?? "md";
    const baseVariant = variant ?? "underline";

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          tabsListVariants({
            size: baseSize as TabsSizeToken,
            variant: baseVariant,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);
TabsList.displayName = TabsPrimitive.List.displayName;

// ============================================================================
// TABS TRIGGER
// ============================================================================

export interface TabsTriggerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    "size" | "variant" | "tone"
  > {
  /**
   * Size variant - token-based (inherited from context if not provided)
   */
  size?: ResponsiveTabsSize;
  /**
   * Visual variant - token-based (inherited from context if not provided)
   */
  variant?: TabsVariantToken;
  /**
   * Tone - token-based (inherited from context if not provided)
   */
  tone?: TabsToneToken;
  /**
   * Leading icon - semantic prop
   */
  leadingIcon?: React.ReactNode;
  /**
   * Trailing icon - semantic prop
   */
  trailingIcon?: React.ReactNode;
  /**
   * Icon - semantic prop (for backward compatibility, maps to leadingIcon)
   */
  icon?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    { className, size, variant, tone, leadingIcon, trailingIcon, icon, children, ...props },
    ref,
  ) => {
    const baseSize = getBaseValue(size) ?? "md";
    const baseVariant = variant ?? "underline";
    const baseTone = tone ?? "primary";

    // Use icon prop if provided, otherwise use leadingIcon
    const effectiveLeadingIcon = icon ?? leadingIcon;

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          tabsTriggerVariants({
            size: baseSize as TabsSizeToken,
            variant: baseVariant,
            tone: baseTone,
          }),
          className,
        )}
        {...props}
      >
        {effectiveLeadingIcon && (
          <span
            className={cn(
              TABS_TOKENS.trigger.icon.size,
              TABS_TOKENS.trigger.icon.color,
              TABS_TOKENS.trigger.icon.gap,
            )}
          >
            {effectiveLeadingIcon}
          </span>
        )}
        {children}
        {trailingIcon && (
          <span
            className={cn(
              TABS_TOKENS.trigger.icon.size,
              TABS_TOKENS.trigger.icon.color,
              TABS_TOKENS.trigger.icon.gap,
            )}
          >
            {trailingIcon}
          </span>
        )}
      </TabsPrimitive.Trigger>
    );
  },
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ============================================================================
// TABS CONTENT
// ============================================================================

export interface TabsContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, "size"> {
  /**
   * Size variant - token-based (for padding)
   */
  size?: ResponsiveTabsSize;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, size, ...props }, ref) => {
    const baseSize = getBaseValue(size) ?? "md";

    return (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          tabsContentVariants({
            size: baseSize as TabsSizeToken,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
