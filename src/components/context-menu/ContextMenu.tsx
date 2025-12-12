"use client";

/**
 * ============================================================================
 * 🔒 FOUNDATION LOCK - ContextMenu Component
 * ============================================================================
 *
 * This component is LOCKED as part of the UI Foundation Layer.
 *
 * **ARCHITECTURE LOCK DOCUMENTATION:**
 * See: docs/architecture/TUI_ARCHITECTURE_LOCK.md
 *
 * This component must not be modified except for critical bug fixes.
 * All architectural decisions are final. Museum-grade quality achieved.
 *
 * LOCKED STATUS:
 * - Component: ContextMenu (Radix ContextMenu wrapper)
 * - Category: Menus (Foundation Layer)
 * - Lock Date: 2025-12-12
 * - Status: ✅ LOCKED (FOUNDATION_LOCKED)
 *
 * ALLOWED CHANGES (Minimal, approval required):
 * - Critical bug fixes only (with explicit approval)
 * - Typing improvements (TypeScript only, no runtime changes)
 * - Token wiring improvements (connecting existing tokens, no new tokens)
 * - Stories/tests fixes (test updates only, no component changes)
 * - Documentation updates (comments, docs only)
 * - Code comments explaining intentional design decisions
 *
 * FORBIDDEN CHANGES (Strictly prohibited):
 * - ❌ New foundation components or subcomponents
 * - ❌ Duplicate component implementations
 * - ❌ Custom behavior that Radix ContextMenu should handle
 * - ❌ String/number visual props (must use tokens only)
 * - ❌ Re-implementing focus/keyboard/aria/portal logic
 * - ❌ Breaking API changes
 * - ❌ Behavioral rewrites or custom logic additions
 * - ❌ Token system modifications (additions/removals)
 * - ❌ Style modifications beyond token wiring
 * - ❌ New props that change component behavior
 *
 * **If you believe changes are necessary, review TUI_ARCHITECTURE_LOCK.md first.**
 *
 * ============================================================================
 *
 * ContextMenu Component
 *
 * Radix-based context menu component with token-driven styling.
 * All behavior (pointer, keyboard, focus, ARIA, positioning, collision handling)
 * is handled by Radix ContextMenu. Tenerife UI provides visual styling through
 * tokens only. This is a strict wrapper pattern - no custom behavior logic.
 */

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cva } from "class-variance-authority";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { getBaseValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { CONTEXT_MENU_TOKENS } from "@/tokens/components/context-menu";
import type {
  ContextMenuItemToneToken,
  ContextMenuSizeToken,
  ContextMenuWidthToken,
  RadiusToken,
  ResponsiveContextMenuSize,
  ResponsiveContextMenuWidth,
  ResponsiveSpace,
  SpaceToken,
  SurfaceToken,
} from "@/tokens/types";

// ============================================================================
// CONTEXT FOR SIZE INHERITANCE
// ============================================================================

/**
 * Context for passing size from Content to child Items
 * This allows Items to inherit size from Content without explicit prop passing
 */
const ContextMenuSizeContext = React.createContext<ContextMenuSizeToken | undefined>(undefined);

/**
 * Hook to get size from ContextMenuContent context
 * Falls back to "md" if not provided
 */
function useContextMenuSize(providedSize?: ResponsiveContextMenuSize): ContextMenuSizeToken {
  const contextSize = React.useContext(ContextMenuSizeContext);
  const baseSize = providedSize ? getBaseValue(providedSize) : undefined;
  return (baseSize ?? contextSize ?? "md") as ContextMenuSizeToken;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert spacing token to Tailwind padding class
 */
function getSpacingClass(prefix: string, token: SpaceToken | undefined): string | undefined {
  if (!token) return undefined;
  return `${prefix}-${String(token)}`;
}

/**
 * Convert radius token to Tailwind rounded class
 */
function getRadiusClass(token: RadiusToken | undefined): string | undefined {
  if (!token) return undefined;
  return `rounded-${String(token)}`;
}

// ============================================================================
// CVA VARIANTS
// ============================================================================

/**
 * ContextMenu Content Variants
 *
 * @note INTENTIONAL HARDCODED VALUES:
 * - `z-50`: z-index is intentionally hardcoded to ensure ContextMenu appears above
 *   all other UI elements. Radix ContextMenu provides layering guarantees via portal
 *   positioning, but we use z-50 as an explicit safeguard. This should NOT be moved
 *   to tokens as it represents a cross-component layering decision tied to Radix's
 *   portal strategy. Changing this value risks layering conflicts with other overlays.
 *
 * - `[2px]` offset in slide-in animations: This small 2px offset is intentionally
 *   hardcoded as a micro-interaction detail for entrance animations. It provides
 *   subtle visual feedback when menus slide in from different sides. Moving this
 *   to tokens would be over-engineering for such a minimal aesthetic constant.
 *   WARNING: Do not refactor these animation offsets into the token system.
 */
const contextMenuContentVariants = cva(
  `z-50 ${CONTEXT_MENU_TOKENS.content.border} ${CONTEXT_MENU_TOKENS.content.background} ${CONTEXT_MENU_TOKENS.content.text} ${CONTEXT_MENU_TOKENS.content.shadow} outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-[2px] data-[side=left]:slide-in-from-right-[2px] data-[side=right]:slide-in-from-left-[2px] data-[side=top]:slide-in-from-bottom-[2px]`,
  {
    variants: {
      size: {
        sm: `${CONTEXT_MENU_TOKENS.size.sm.content.padding} ${CONTEXT_MENU_TOKENS.size.sm.content.radius} ${CONTEXT_MENU_TOKENS.size.sm.content.minWidth}`,
        md: `${CONTEXT_MENU_TOKENS.size.md.content.padding} ${CONTEXT_MENU_TOKENS.size.md.content.radius} ${CONTEXT_MENU_TOKENS.size.md.content.minWidth}`,
        lg: `${CONTEXT_MENU_TOKENS.size.lg.content.padding} ${CONTEXT_MENU_TOKENS.size.lg.content.radius} ${CONTEXT_MENU_TOKENS.size.lg.content.minWidth}`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const contextMenuItemVariants = cva(
  `relative flex cursor-default select-none items-center outline-none ${CONTEXT_MENU_TOKENS.item.focus.background} ${CONTEXT_MENU_TOKENS.item.focus.text} ${CONTEXT_MENU_TOKENS.item.disabled.pointerEvents} data-[disabled]:opacity-50`,
  {
    variants: {
      size: {
        sm: `${CONTEXT_MENU_TOKENS.size.sm.item.padding.horizontal} ${CONTEXT_MENU_TOKENS.size.sm.item.padding.vertical} ${CONTEXT_MENU_TOKENS.item.radius} ${CONTEXT_MENU_TOKENS.size.sm.item.fontSize} ${CONTEXT_MENU_TOKENS.size.sm.item.height}`,
        md: `${CONTEXT_MENU_TOKENS.size.md.item.padding.horizontal} ${CONTEXT_MENU_TOKENS.size.md.item.padding.vertical} ${CONTEXT_MENU_TOKENS.item.radius} ${CONTEXT_MENU_TOKENS.size.md.item.fontSize} ${CONTEXT_MENU_TOKENS.size.md.item.height}`,
        lg: `${CONTEXT_MENU_TOKENS.size.lg.item.padding.horizontal} ${CONTEXT_MENU_TOKENS.size.lg.item.padding.vertical} ${CONTEXT_MENU_TOKENS.item.radius} ${CONTEXT_MENU_TOKENS.size.lg.item.fontSize} ${CONTEXT_MENU_TOKENS.size.lg.item.height}`,
      },
      tone: {
        neutral: `${CONTEXT_MENU_TOKENS.item.tone.neutral.default.background} ${CONTEXT_MENU_TOKENS.item.tone.neutral.default.text} ${CONTEXT_MENU_TOKENS.item.tone.neutral.hover.background} ${CONTEXT_MENU_TOKENS.item.tone.neutral.hover.text}`,
        primary: `${CONTEXT_MENU_TOKENS.item.tone.primary.default.background} ${CONTEXT_MENU_TOKENS.item.tone.primary.default.text} ${CONTEXT_MENU_TOKENS.item.tone.primary.hover.background} ${CONTEXT_MENU_TOKENS.item.tone.primary.hover.text}`,
        destructive: `${CONTEXT_MENU_TOKENS.item.tone.destructive.default.background} ${CONTEXT_MENU_TOKENS.item.tone.destructive.default.text} ${CONTEXT_MENU_TOKENS.item.tone.destructive.hover.background} ${CONTEXT_MENU_TOKENS.item.tone.destructive.hover.text}`,
      },
    },
    defaultVariants: {
      size: "md",
      tone: "neutral",
    },
  },
);

/**
 * ContextMenu SubContent Variants
 *
 * @note INTENTIONAL HARDCODED VALUES:
 * - `z-50`: Same rationale as ContextMenuContent - ensures submenus appear above
 *   other UI elements. Radix handles submenu layering via portals, but z-50 provides
 *   explicit layering guarantee. Do NOT move to tokens (see Content variants note).
 *
 * - `[2px]` offset in slide-in animations: Same micro-interaction detail as Content.
 *   Consistent animation behavior across all menu levels. Do NOT refactor into tokens.
 */
const contextMenuSubContentVariants = cva(
  `z-50 ${CONTEXT_MENU_TOKENS.content.border} ${CONTEXT_MENU_TOKENS.content.background} ${CONTEXT_MENU_TOKENS.content.text} ${CONTEXT_MENU_TOKENS.content.shadow} outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-[2px] data-[side=left]:slide-in-from-right-[2px] data-[side=right]:slide-in-from-left-[2px] data-[side=top]:slide-in-from-bottom-[2px]`,
  {
    variants: {
      size: {
        sm: `${CONTEXT_MENU_TOKENS.size.sm.content.padding} ${CONTEXT_MENU_TOKENS.size.sm.content.radius} ${CONTEXT_MENU_TOKENS.size.sm.content.minWidth}`,
        md: `${CONTEXT_MENU_TOKENS.size.md.content.padding} ${CONTEXT_MENU_TOKENS.size.md.content.radius} ${CONTEXT_MENU_TOKENS.size.md.content.minWidth}`,
        lg: `${CONTEXT_MENU_TOKENS.size.lg.content.padding} ${CONTEXT_MENU_TOKENS.size.lg.content.radius} ${CONTEXT_MENU_TOKENS.size.lg.content.minWidth}`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ============================================================================
// CONTEXT MENU ROOT
// ============================================================================

export type ContextMenuRootProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>;

/**
 * ContextMenu Root component
 * Radix Root is a context provider, not a DOM element, so it doesn't accept refs
 */
const ContextMenuRoot: React.FC<ContextMenuRootProps> = ({ children, ...props }) => {
  return <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>;
};
ContextMenuRoot.displayName = ContextMenuPrimitive.Root.displayName;

// ============================================================================
// CONTEXT MENU TRIGGER
// ============================================================================

export interface ContextMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>, "children"> {
  children?: React.ReactNode;
}

/**
 * ContextMenu Trigger component
 * Radix handles right-click behavior automatically
 */
const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Trigger>,
  ContextMenuTriggerProps
>(({ className, ...props }, ref) => {
  return <ContextMenuPrimitive.Trigger ref={ref} className={cn(className)} {...props} />;
});
ContextMenuTrigger.displayName = ContextMenuPrimitive.Trigger.displayName;

// ============================================================================
// CONTEXT MENU CONTENT
// ============================================================================

export interface ContextMenuContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>,
    "size" | "width" | "padding" | "radius" | "surface"
  > {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveContextMenuSize;
  /**
   * Width - token-based
   */
  width?: ResponsiveContextMenuWidth;
  /**
   * Padding - token-based
   */
  padding?: ResponsiveSpace;
  /**
   * Radius - token-based
   */
  radius?: RadiusToken;
  /**
   * Surface variant - token-based
   */
  surface?: SurfaceToken;
}

/**
 * ContextMenu Content component
 * Wrapper around Radix ContextMenu Content with token-based styling.
 */
const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ className, size = "md", width, padding, radius, surface, ...props }, ref) => {
  const baseSize = getBaseValue(size) ?? "md";
  const baseWidth = width ? getBaseValue(width) : undefined;
  const basePadding = padding ? getBaseValue(padding) : undefined;
  const baseRadius = radius;
  const baseSurface = surface;

  // Build width classes
  const widthClass = baseWidth
    ? CONTEXT_MENU_TOKENS.width[baseWidth as ContextMenuWidthToken]
    : undefined;

  // Build padding classes (using spacing tokens)
  const paddingClass = getSpacingClass("p", basePadding as SpaceToken | undefined);

  // Build radius classes
  const radiusClass = getRadiusClass(baseRadius);

  // Build surface classes
  const surfaceClass = baseSurface
    ? CONTEXT_MENU_TOKENS.content.surface[
        baseSurface as keyof typeof CONTEXT_MENU_TOKENS.content.surface
      ]
    : undefined;

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuSizeContext.Provider value={baseSize as ContextMenuSizeToken}>
        <ContextMenuPrimitive.Content
          ref={ref}
          className={cn(
            contextMenuContentVariants({
              size: baseSize as ContextMenuSizeToken,
            }),
            widthClass,
            paddingClass,
            radiusClass,
            surfaceClass,
            className,
          )}
          {...props}
        />
      </ContextMenuSizeContext.Provider>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

// ============================================================================
// CONTEXT MENU ITEM
// ============================================================================

export interface ContextMenuItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>, "children"> {
  children?: React.ReactNode;
  /**
   * Size variant - token-based
   *
   * @default Inherited from ContextMenuContent
   * @note If not specified, the size is automatically inherited from the parent
   * ContextMenuContent. You can override this by providing an explicit size prop.
   * This allows you to set size once on Content and have all Items inherit it.
   */
  size?: ResponsiveContextMenuSize;
  /**
   * Tone variant - token-based
   */
  tone?: ContextMenuItemToneToken;
  /**
   * Gap between item content - token-based
   */
  gap?: ResponsiveSpace;
  /**
   * Inset padding for item
   */
  inset?: boolean;
}

/**
 * ContextMenu Item component
 * Wrapper around Radix ContextMenu Item with token-based styling.
 */
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(({ className, size, tone = "neutral", gap, inset, ...props }, ref) => {
  const baseSize = useContextMenuSize(size);
  const baseGap = gap ? getBaseValue(gap) : undefined;

  // Build gap classes
  const gapClass = getSpacingClass("gap", baseGap as SpaceToken | undefined);

  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        contextMenuItemVariants({
          size: baseSize as ContextMenuSizeToken,
          tone,
        }),
        gapClass,
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
});
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

// ============================================================================
// CONTEXT MENU CHECKBOX ITEM
// ============================================================================

export interface ContextMenuCheckboxItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>,
    "children"
  > {
  children?: React.ReactNode;
  /**
   * Size variant - token-based
   */
  size?: ResponsiveContextMenuSize;
  /**
   * Tone variant - token-based
   */
  tone?: ContextMenuItemToneToken;
  /**
   * Gap between item content - token-based
   */
  gap?: ResponsiveSpace;
}

/**
 * ContextMenu CheckboxItem component
 * Wrapper around Radix ContextMenu CheckboxItem with token-based styling.
 */
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ className, size, tone = "neutral", gap, children, ...props }, ref) => {
  const baseSize = useContextMenuSize(size);
  const baseGap = gap ? getBaseValue(gap) : undefined;

  // Build gap classes
  const gapClass = getSpacingClass("gap", baseGap as SpaceToken | undefined);

  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        contextMenuItemVariants({
          size: baseSize as ContextMenuSizeToken,
          tone,
        }),
        gapClass,
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className={cn(CONTEXT_MENU_TOKENS.indicator.size, "h-4 w-4")} />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

// ============================================================================
// CONTEXT MENU RADIO GROUP
// ============================================================================

export interface ContextMenuRadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>, "children"> {
  children?: React.ReactNode;
}

/**
 * ContextMenu RadioGroup component
 * Wrapper around Radix ContextMenu RadioGroup.
 */
const ContextMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioGroup>,
  ContextMenuRadioGroupProps
>(({ className, ...props }, ref) => {
  return <ContextMenuPrimitive.RadioGroup ref={ref} className={cn(className)} {...props} />;
});
ContextMenuRadioGroup.displayName = ContextMenuPrimitive.RadioGroup.displayName;

// ============================================================================
// CONTEXT MENU RADIO ITEM
// ============================================================================

export interface ContextMenuRadioItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>, "children"> {
  children?: React.ReactNode;
  /**
   * Size variant - token-based
   */
  size?: ResponsiveContextMenuSize;
  /**
   * Tone variant - token-based
   */
  tone?: ContextMenuItemToneToken;
  /**
   * Gap between item content - token-based
   */
  gap?: ResponsiveSpace;
}

/**
 * ContextMenu RadioItem component
 * Wrapper around Radix ContextMenu RadioItem with token-based styling.
 */
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(({ className, size, tone = "neutral", gap, children, ...props }, ref) => {
  const baseSize = useContextMenuSize(size);
  const baseGap = gap ? getBaseValue(gap) : undefined;

  // Build gap classes
  const gapClass = getSpacingClass("gap", baseGap as SpaceToken | undefined);

  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        contextMenuItemVariants({
          size: baseSize as ContextMenuSizeToken,
          tone,
        }),
        gapClass,
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className={cn(CONTEXT_MENU_TOKENS.indicator.size, "h-2 w-2 fill-current")} />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

// ============================================================================
// CONTEXT MENU SEPARATOR
// ============================================================================

export interface ContextMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> {
  className?: string;
}

/**
 * ContextMenu Separator component
 * Wrapper around Radix ContextMenu Separator with token-based styling.
 */
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn(
        `${CONTEXT_MENU_TOKENS.separator.margin} ${CONTEXT_MENU_TOKENS.separator.height} ${CONTEXT_MENU_TOKENS.separator.color}`,
        className,
      )}
      {...props}
    />
  );
});
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

// ============================================================================
// CONTEXT MENU LABEL
// ============================================================================

export interface ContextMenuLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>, "children"> {
  children?: React.ReactNode;
  /**
   * Padding - token-based
   */
  padding?: ResponsiveSpace;
}

/**
 * ContextMenu Label component
 * Wrapper around Radix ContextMenu Label with token-based styling.
 */
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  ContextMenuLabelProps
>(({ className, padding, ...props }, ref) => {
  const basePadding = padding ? getBaseValue(padding) : undefined;

  // Build padding classes
  const paddingClass = getSpacingClass("p", basePadding as SpaceToken | undefined);

  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        CONTEXT_MENU_TOKENS.label.textStyle,
        CONTEXT_MENU_TOKENS.label.color,
        paddingClass || CONTEXT_MENU_TOKENS.label.padding.md,
        className,
      )}
      {...props}
    />
  );
});
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

// ============================================================================
// CONTEXT MENU SUB
// ============================================================================

export interface ContextMenuSubProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub> {
  children?: React.ReactNode;
}

/**
 * ContextMenu Sub component
 * Wrapper around Radix ContextMenu Sub.
 */
const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children, ...props }) => {
  return <ContextMenuPrimitive.Sub {...props}>{children}</ContextMenuPrimitive.Sub>;
};
ContextMenuSub.displayName = ContextMenuPrimitive.Sub.displayName;

// ============================================================================
// CONTEXT MENU SUB TRIGGER
// ============================================================================

export interface ContextMenuSubTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>, "children"> {
  children?: React.ReactNode;
  /**
   * Size variant - token-based
   */
  size?: ResponsiveContextMenuSize;
  /**
   * Tone variant - token-based
   */
  tone?: ContextMenuItemToneToken;
  /**
   * Gap between item content - token-based
   */
  gap?: ResponsiveSpace;
}

/**
 * ContextMenu SubTrigger component
 * Wrapper around Radix ContextMenu SubTrigger with token-based styling.
 */
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(({ className, size, tone = "neutral", gap, children, ...props }, ref) => {
  const baseSize = useContextMenuSize(size);
  const baseGap = gap ? getBaseValue(gap) : undefined;

  // Build gap classes
  const gapClass = getSpacingClass("gap", baseGap as SpaceToken | undefined);

  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        contextMenuItemVariants({
          size: baseSize as ContextMenuSizeToken,
          tone,
        }),
        gapClass,
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
});
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

// ============================================================================
// CONTEXT MENU SUB CONTENT
// ============================================================================

export interface ContextMenuSubContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>,
    "size" | "width" | "padding" | "radius" | "surface"
  > {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveContextMenuSize;
  /**
   * Width - token-based
   */
  width?: ResponsiveContextMenuWidth;
  /**
   * Padding - token-based
   */
  padding?: ResponsiveSpace;
  /**
   * Radius - token-based
   */
  radius?: RadiusToken;
  /**
   * Surface variant - token-based
   */
  surface?: SurfaceToken;
}

/**
 * ContextMenu SubContent component
 * Wrapper around Radix ContextMenu SubContent with token-based styling.
 */
const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(({ className, size, width, padding, radius, surface, ...props }, ref) => {
  // SubContent can inherit from parent Content or use its own size
  const contextSize = React.useContext(ContextMenuSizeContext);
  const baseSize = size ? getBaseValue(size) : (contextSize ?? "md");
  const baseWidth = width ? getBaseValue(width) : undefined;
  const basePadding = padding ? getBaseValue(padding) : undefined;
  const baseRadius = radius;
  const baseSurface = surface;

  // Build width classes
  const widthClass = baseWidth
    ? CONTEXT_MENU_TOKENS.width[baseWidth as ContextMenuWidthToken]
    : undefined;

  // Build padding classes (using spacing tokens)
  const paddingClass = getSpacingClass("p", basePadding as SpaceToken | undefined);

  // Build radius classes
  const radiusClass = getRadiusClass(baseRadius);

  // Build surface classes
  const surfaceClass = baseSurface
    ? CONTEXT_MENU_TOKENS.content.surface[
        baseSurface as keyof typeof CONTEXT_MENU_TOKENS.content.surface
      ]
    : undefined;

  return (
    <ContextMenuSizeContext.Provider value={baseSize as ContextMenuSizeToken}>
      <ContextMenuPrimitive.SubContent
        ref={ref}
        className={cn(
          contextMenuSubContentVariants({
            size: baseSize as ContextMenuSizeToken,
          }),
          widthClass,
          paddingClass,
          radiusClass,
          surfaceClass,
          className,
        )}
        {...props}
      />
    </ContextMenuSizeContext.Provider>
  );
});
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

// ============================================================================
// INDIVIDUAL EXPORTS
// ============================================================================

export {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

/**
 * ContextMenu Component
 *
 * Radix ContextMenu-based component with token-driven styling.
 *
 * **Usage:**
 * ```tsx
 * <ContextMenu.Root>
 *   <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
 *   <ContextMenu.Content>
 *     <ContextMenu.Item>Item 1</ContextMenu.Item>
 *     <ContextMenu.Item>Item 2</ContextMenu.Item>
 *     <ContextMenu.Separator />
 *     <ContextMenu.Sub>
 *       <ContextMenu.SubTrigger>Submenu</ContextMenu.SubTrigger>
 *       <ContextMenu.SubContent>
 *         <ContextMenu.Item>Sub Item 1</ContextMenu.Item>
 *       </ContextMenu.SubContent>
 *     </ContextMenu.Sub>
 *   </ContextMenu.Content>
 * </ContextMenu.Root>
 * ```
 */
export const ContextMenu = {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Separator: ContextMenuSeparator,
  Label: ContextMenuLabel,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
};
