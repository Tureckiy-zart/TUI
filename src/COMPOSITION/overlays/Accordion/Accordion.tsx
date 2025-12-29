"use client";

/**
 * Accordion Component
 *
 * Vertically stacked set of interactive headings that reveal/hide associated content panels.
 * Provides accessible disclosure pattern with keyboard navigation and ARIA support.
 *
 * @semantic_role EXTENSION_COMPOSITE_DISCLOSURE
 *
 * @semantic_definition
 * Accordion is a composite disclosure component that allows users to toggle the visibility
 * of content sections. It supports single (only one item open) and multiple (multiple items
 * can be open) modes, semantic variants (primary/secondary/accent/neutral), and size variants
 * (sm/md/lg). All behavior (keyboard navigation, focus management, ARIA attributes) is delegated
 * to Radix Accordion primitives.
 *
 * **What Accordion IS:**
 * - Disclosure component for collapsible content sections
 * - Supports single and multiple open modes
 * - Provides keyboard navigation (Arrow Up/Down, Enter/Space)
 * - Accessible via ARIA attributes (role="region", aria-expanded, aria-labelledby)
 *
 * **What Accordion IS NOT:**
 * - NOT a Foundation component (Extension layer component)
 * - NOT a navigation component (use Tabs for navigation)
 * - NOT a menu component (use ContextMenu or DropdownMenu for menus)
 *
 * @example
 * ```tsx
 * // Single mode (default)
 * <Accordion.Root type="single" collapsible>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger variant="primary" size="md">
 *       Section 1
 *     </Accordion.Trigger>
 *     <Accordion.Content>
 *       Content for section 1
 *     </Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 *
 * // Multiple mode
 * <Accordion.Root type="multiple" defaultValue={["item-1", "item-2"]}>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger variant="secondary" size="lg">
 *       Section 1
 *     </Accordion.Trigger>
 *     <Accordion.Content>
 *       Content for section 1
 *     </Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 * ```
 */

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { ACCORDION_TOKENS } from "@/FOUNDATION/tokens/components/accordion";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { IconChevronDown } from "@/icons/IconChevronDown";

// ============================================================================
// TYPE DEFINITIONS (Explicit Union Types per TYPING_STANDARD)
// ============================================================================

/**
 * Accordion variant type
 * Semantic variants: primary, secondary, accent, neutral
 */
export type AccordionVariant = "primary" | "secondary" | "accent" | "neutral";

/**
 * Accordion size type
 * Standard interactive component sizes: sm, md, lg
 */
export type AccordionSize = "sm" | "md" | "lg";

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Resolves responsive size prop to base size token
 */
const resolveSize = (size: AccordionSize | undefined): AccordionSize => {
  return size ?? "md";
};

/**
 * Resolves variant prop to variant token with default
 */
const resolveVariant = (variant: AccordionVariant | undefined): AccordionVariant => {
  return variant ?? "primary";
};

// ============================================================================
// CVA VARIANTS
// ============================================================================

const accordionTriggerVariants = tokenCVA({
  base: `flex ${ACCORDION_TOKENS.trigger.width} items-center justify-between outline-none ${ACCORDION_TOKENS.transition.colors} ${ACCORDION_TOKENS.focus.ring} ${ACCORDION_TOKENS.disabled.opacity} ${ACCORDION_TOKENS.disabled.pointerEvents} ${ACCORDION_TOKENS.disabled.cursor}`,
  variants: {
    size: {
      sm: `${ACCORDION_TOKENS.size.sm.trigger.padding.horizontal} ${ACCORDION_TOKENS.size.sm.trigger.padding.vertical} ${ACCORDION_TOKENS.size.sm.trigger.fontSize} ${ACCORDION_TOKENS.trigger.fontWeight}`,
      md: `${ACCORDION_TOKENS.size.md.trigger.padding.horizontal} ${ACCORDION_TOKENS.size.md.trigger.padding.vertical} ${ACCORDION_TOKENS.size.md.trigger.fontSize} ${ACCORDION_TOKENS.trigger.fontWeight}`,
      lg: `${ACCORDION_TOKENS.size.lg.trigger.padding.horizontal} ${ACCORDION_TOKENS.size.lg.trigger.padding.vertical} ${ACCORDION_TOKENS.size.lg.trigger.fontSize} ${ACCORDION_TOKENS.trigger.fontWeight}`,
    } satisfies Record<AccordionSize, string>,
    variant: {
      primary: cn(
        ACCORDION_TOKENS.variant.primary.trigger.default.background,
        ACCORDION_TOKENS.variant.primary.trigger.default.text,
        ACCORDION_TOKENS.variant.primary.trigger.default.border,
        ACCORDION_TOKENS.variant.primary.trigger.hover.background,
        ACCORDION_TOKENS.variant.primary.trigger.hover.text,
        ACCORDION_TOKENS.variant.primary.trigger.open.background,
        ACCORDION_TOKENS.variant.primary.trigger.open.text,
      ),
      secondary: cn(
        ACCORDION_TOKENS.variant.secondary.trigger.default.background,
        ACCORDION_TOKENS.variant.secondary.trigger.default.text,
        ACCORDION_TOKENS.variant.secondary.trigger.default.border,
        ACCORDION_TOKENS.variant.secondary.trigger.hover.background,
        ACCORDION_TOKENS.variant.secondary.trigger.hover.text,
        ACCORDION_TOKENS.variant.secondary.trigger.open.background,
        ACCORDION_TOKENS.variant.secondary.trigger.open.text,
      ),
      accent: cn(
        ACCORDION_TOKENS.variant.accent.trigger.default.background,
        ACCORDION_TOKENS.variant.accent.trigger.default.text,
        ACCORDION_TOKENS.variant.accent.trigger.default.border,
        ACCORDION_TOKENS.variant.accent.trigger.hover.background,
        ACCORDION_TOKENS.variant.accent.trigger.hover.text,
        ACCORDION_TOKENS.variant.accent.trigger.open.background,
        ACCORDION_TOKENS.variant.accent.trigger.open.text,
      ),
      neutral: cn(
        ACCORDION_TOKENS.variant.neutral.trigger.default.background,
        ACCORDION_TOKENS.variant.neutral.trigger.default.text,
        ACCORDION_TOKENS.variant.neutral.trigger.default.border,
        ACCORDION_TOKENS.variant.neutral.trigger.hover.background,
        ACCORDION_TOKENS.variant.neutral.trigger.hover.text,
        ACCORDION_TOKENS.variant.neutral.trigger.open.background,
        ACCORDION_TOKENS.variant.neutral.trigger.open.text,
      ),
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const accordionContentVariants = tokenCVA({
  base: `overflow-hidden ${MOTION_TOKENS.transition.all} data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down`,
  variants: {
    size: {
      sm: `${ACCORDION_TOKENS.size.sm.content.padding} ${ACCORDION_TOKENS.size.sm.content.fontSize}`,
      md: `${ACCORDION_TOKENS.size.md.content.padding} ${ACCORDION_TOKENS.size.md.content.fontSize}`,
      lg: `${ACCORDION_TOKENS.size.lg.content.padding} ${ACCORDION_TOKENS.size.lg.content.fontSize}`,
    } satisfies Record<AccordionSize, string>,
    variant: {
      primary: cn(
        ACCORDION_TOKENS.variant.primary.content.background,
        ACCORDION_TOKENS.variant.primary.content.text,
      ),
      secondary: cn(
        ACCORDION_TOKENS.variant.secondary.content.background,
        ACCORDION_TOKENS.variant.secondary.content.text,
      ),
      accent: cn(
        ACCORDION_TOKENS.variant.accent.content.background,
        ACCORDION_TOKENS.variant.accent.content.text,
      ),
      neutral: cn(
        ACCORDION_TOKENS.variant.neutral.content.background,
        ACCORDION_TOKENS.variant.neutral.content.text,
      ),
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

// ============================================================================
// ACCORDION ROOT
// ============================================================================

export type AccordionRootProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Accordion
>;

/**
 * Accordion Root component
 * Radix Root is a context provider, not a DOM element, so it doesn't accept refs
 */
const AccordionRoot: React.FC<AccordionRootProps> = ({ children, ...props }) => {
  return <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>;
};
AccordionRoot.displayName = AccordionPrimitive.Root.displayName;

// ============================================================================
// ACCORDION ITEM
// ============================================================================

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> {
  /**
   * Unique value identifier for this item
   */
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <AccordionPrimitive.Item
        ref={ref}
        className={cn(ACCORDION_TOKENS.item.border.default, className)}
        {...props}
      />
    );
  },
);
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

// ============================================================================
// ACCORDION TRIGGER
// ============================================================================

export interface AccordionTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
  "size" | "variant"
> {
  /**
   * Semantic variant (primary/secondary/accent/neutral)
   * @default "primary"
   */
  variant?: AccordionVariant;
  /**
   * Size (sm/md/lg)
   * @default "md"
   */
  size?: AccordionSize;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const resolvedSize = resolveSize(size);
    const resolvedVariant = resolveVariant(variant);

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            accordionTriggerVariants({
              size: resolvedSize,
              variant: resolvedVariant,
            }),
            className,
          )}
          {...props}
        >
          {children}
          <IconChevronDown
            className={cn(
              ACCORDION_TOKENS.trigger.icon.size[resolvedSize],
              ACCORDION_TOKENS.trigger.icon.color,
              ACCORDION_TOKENS.trigger.icon.gap,
              MOTION_TOKENS.transition.transform,
              MOTION_TOKENS.duration["200"],
              MOTION_TOKENS.easing.out,
              "shrink-0",
              "data-[state=open]:rotate-180",
            )}
            aria-hidden={true}
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// ============================================================================
// ACCORDION CONTENT
// ============================================================================

export interface AccordionContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
  "size" | "variant"
> {
  /**
   * Size (sm/md/lg) - for padding and typography
   * @default "md"
   */
  size?: AccordionSize;
  /**
   * Semantic variant (primary/secondary/accent/neutral) - for background and text colors
   * @default "primary"
   */
  variant?: AccordionVariant;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    const resolvedSize = resolveSize(size);
    const resolvedVariant = resolveVariant(variant);

    return (
      <AccordionPrimitive.Content
        ref={ref}
        className={cn(
          accordionContentVariants({
            size: resolvedSize,
            variant: resolvedVariant,
          }),
          className,
        )}
        {...props}
      >
        <div className={cn("pb-4 pt-0")}>{children}</div>
      </AccordionPrimitive.Content>
    );
  },
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
