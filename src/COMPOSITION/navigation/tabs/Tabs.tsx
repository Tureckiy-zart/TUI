"use client";

/**
 * ============================================================================
 * 🔒 FOUNDATION · LOCKED - Tabs Component
 * ============================================================================
 *
 * **STATUS:** ✅ LOCKED (Pipeline 18A Complete, 2025-12-25)
 * **LOCK DATE:** 2025-12-25
 * **PIPELINE:** Pipeline 18A (Steps 0-12 complete)
 *
 * **LOCK RATIONALE:**
 * Tabs has completed canonical Foundation Step Pipeline (Steps 0-12) and
 * demonstrates full compliance with all Authority Contracts and canonical
 * lifecycle requirements.
 *
 * **REFERENCE:**
 * - docs/architecture/FOUNDATION_LOCK.md
 * - docs/workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md
 * - docs/reports/audit/TABS_BASELINE_REPORT.md
 *
 * ============================================================================
 *
 * ARCHITECTURAL INVARIANTS (MANDATORY)
 * ============================================================================
 *
 * **RADIX OWNERSHIP INVARIANT:**
 * - All runtime behavior (keyboard navigation, focus management, ARIA attributes,
 *   state management, disabled state handling) MUST be delegated to Radix primitives.
 * - Tabs component MUST NOT implement custom state management or interaction logic.
 * - Tabs component MUST NOT override or extend Radix behavior beyond visual styling.
 * - Violation: Adding useState, useEffect, useRef, or custom event handlers for behavior.
 *
 * **STYLING/TOKEN OWNERSHIP INVARIANT:**
 * - All visual styling MUST use TABS_TOKENS as the single source of truth.
 * - All spacing, typography, colors, radius, shadows MUST reference tokens, never raw values.
 * - Tabs component owns visual styling at COMPOSITION level, Foundation tokens own token definitions.
 * - Violation: Using raw CSS values, inline styles, or non-token Tailwind classes for styling.
 *
 * **VARIANT SYSTEM INVARIANT:**
 * - Variant system (underline, pill, segmented) is FINITE and EXPLICIT.
 * - Size system (sm, md, lg) is FINITE and EXPLICIT.
 * - Tone system (neutral, primary) is FINITE and EXPLICIT.
 * - Adding new variants, sizes, or tones REQUIRES Foundation Step Pipeline approval.
 * - Violation: Adding new variant/size/tone values without pipeline approval.
 *
 * **PUBLIC API INVARIANT:**
 * - Public API surface MUST remain minimal and expressive.
 * - Custom props (size, variant, tone, icon props) MUST be token-based unions.
 * - Radix props MUST be passed through without modification.
 * - Violation: Adding non-token props, changing prop types, or modifying Radix prop behavior.
 *
 * ============================================================================
 *
 * Tabs Component
 *
 * Radix-based tabs component with token-driven styling.
 * All behavior (keyboard navigation, focus management, a11y) is handled by Radix.
 * Tenerife UI provides visual styling through tokens only.
 *
 * @enforcement TUNG_TABS_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use TABS_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL typography values MUST be token-based
 * - ALL radius values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (tabsVariants)
 * - Variant styling uses TABS_TOKENS (underline, pill, segmented)
 * - Size styling uses TABS_TOKENS (sm, md, lg)
 * - Tone styling uses TABS_TOKENS (neutral, primary)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from TABS_TOKENS for variant, size, and tone styling
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Spacing uses TABS_TOKENS (padding, gap)
 * - NO raw Tailwind spacing classes (p-4, gap-2, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Typography uses TABS_TOKENS (fontSize, fontWeight)
 * - NO raw Tailwind typography classes allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses TABS_TOKENS (borderRadius)
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Color Authority: Tabs uses color token system exclusively via TABS_TOKENS
 * - Spacing Authority: Tabs uses spacing token system exclusively via TABS_TOKENS
 * - Typography Authority: Tabs uses typography token system exclusively via TABS_TOKENS
 * - Radius Authority: Tabs uses radius token system exclusively via TABS_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in TABS_TOKENS (src/FOUNDATION/tokens/components/tabs.ts)
 * - TABS_TOKENS reference foundation tokens from spacing, color, typography, and radius systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/typography/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size/tone values at compile time
 */

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { getBaseValue } from "@/FOUNDATION/lib/responsive-props";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { TABS_TOKENS } from "@/FOUNDATION/tokens/components/tabs";
import type {
  ResponsiveTabsSize,
  TabsSizeToken,
  TabsToneToken,
  TabsVariantToken,
} from "@/FOUNDATION/tokens/types";

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Resolves responsive size prop to base size token
 */
const resolveSize = (size: ResponsiveTabsSize | undefined): TabsSizeToken => {
  return (getBaseValue(size) ?? "md") as TabsSizeToken;
};

/**
 * Resolves variant prop to variant token with default
 */
const resolveVariant = (variant: TabsVariantToken | undefined): TabsVariantToken => {
  return variant ?? "underline";
};

/**
 * Resolves tone prop to tone token with default
 */
const resolveTone = (tone: TabsToneToken | undefined): TabsToneToken => {
  return tone ?? "primary";
};

/**
 * Renders icon wrapper with consistent styling
 */
const renderIconWrapper = (icon: React.ReactNode): React.ReactElement => {
  return (
    <span
      className={cn(
        TABS_TOKENS.trigger.icon.size,
        TABS_TOKENS.trigger.icon.color,
        TABS_TOKENS.trigger.icon.gap,
      )}
    >
      {icon}
    </span>
  );
};

// ============================================================================
// CVA VARIANTS
// ============================================================================

const tabsListVariants = tokenCVA({
  base: `inline-flex items-center justify-center outline-none data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col ${TABS_TOKENS.list.container.layout}`,
  variants: {
    size: {
      sm: `${TABS_TOKENS.size.sm.list.gap} ${TABS_TOKENS.size.sm.list.padding}`,
      md: `${TABS_TOKENS.size.md.list.gap} ${TABS_TOKENS.size.md.list.padding}`,
      lg: `${TABS_TOKENS.size.lg.list.gap} ${TABS_TOKENS.size.lg.list.padding}`,
    } satisfies Record<TabsSizeToken, string>,
    variant: {
      underline: "",
      pill: "",
      segmented: `${TABS_TOKENS.variant.segmented.list.background} ${TABS_TOKENS.variant.segmented.list.padding} ${TABS_TOKENS.variant.segmented.list.radius}`,
    } satisfies Record<TabsVariantToken, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "underline",
  },
});

const tabsTriggerVariants = tokenCVA({
  base: `inline-flex items-center justify-center whitespace-nowrap outline-none ${TABS_TOKENS.transition.colors} ${TABS_TOKENS.focus.ring} ${TABS_TOKENS.disabled.opacity} ${TABS_TOKENS.disabled.pointerEvents} ${TABS_TOKENS.disabled.cursor} relative`,
  variants: {
    size: {
      sm: `${TABS_TOKENS.size.sm.trigger.height} ${TABS_TOKENS.size.sm.trigger.padding.horizontal} ${TABS_TOKENS.size.sm.trigger.padding.vertical} ${TABS_TOKENS.size.sm.trigger.fontSize} ${TABS_TOKENS.trigger.fontWeight}`,
      md: `${TABS_TOKENS.size.md.trigger.height} ${TABS_TOKENS.size.md.trigger.padding.horizontal} ${TABS_TOKENS.size.md.trigger.padding.vertical} ${TABS_TOKENS.size.md.trigger.fontSize} ${TABS_TOKENS.trigger.fontWeight}`,
      lg: `${TABS_TOKENS.size.lg.trigger.height} ${TABS_TOKENS.size.lg.trigger.padding.horizontal} ${TABS_TOKENS.size.lg.trigger.padding.vertical} ${TABS_TOKENS.size.lg.trigger.fontSize} ${TABS_TOKENS.trigger.fontWeight}`,
    } satisfies Record<TabsSizeToken, string>,
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
    } satisfies Record<TabsVariantToken, string>,
    tone: {
      neutral: "",
      primary: "",
    } satisfies Record<TabsToneToken, string>,
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
});

const tabsContentVariants = tokenCVA({
  base: `outline-none`,
  variants: {
    size: {
      sm: `${TABS_TOKENS.size.sm.content.padding} ${TABS_TOKENS.size.sm.content.marginTop}`,
      md: `${TABS_TOKENS.size.md.content.padding} ${TABS_TOKENS.size.md.content.marginTop}`,
      lg: `${TABS_TOKENS.size.lg.content.padding} ${TABS_TOKENS.size.lg.content.marginTop}`,
    } satisfies Record<TabsSizeToken, string>,
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

export interface TabsListProps extends Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  "size" | "variant"
> {
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
    const resolvedSize = resolveSize(size);
    const resolvedVariant = resolveVariant(variant);

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          tabsListVariants({
            size: resolvedSize,
            variant: resolvedVariant,
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

export interface TabsTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  "size" | "variant" | "tone"
> {
  /**
   * Size variant - token-based (defaults to "md" if not provided)
   */
  size?: ResponsiveTabsSize;
  /**
   * Visual variant - token-based (defaults to "underline" if not provided)
   */
  variant?: TabsVariantToken;
  /**
   * Tone - token-based (defaults to "primary" if not provided)
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
    const resolvedSize = resolveSize(size);
    const resolvedVariant = resolveVariant(variant);
    const resolvedTone = resolveTone(tone);

    // Use icon prop if provided, otherwise use leadingIcon
    const effectiveLeadingIcon = icon ?? leadingIcon;

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          tabsTriggerVariants({
            size: resolvedSize,
            variant: resolvedVariant,
            tone: resolvedTone,
          }),
          className,
        )}
        {...props}
      >
        {effectiveLeadingIcon && renderIconWrapper(effectiveLeadingIcon)}
        {children}
        {trailingIcon && renderIconWrapper(trailingIcon)}
      </TabsPrimitive.Trigger>
    );
  },
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ============================================================================
// TABS CONTENT
// ============================================================================

export interface TabsContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  "size"
> {
  /**
   * Size variant - token-based (for padding)
   */
  size?: ResponsiveTabsSize;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, size, ...props }, ref) => {
    const resolvedSize = resolveSize(size);

    return (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          tabsContentVariants({
            size: resolvedSize,
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
