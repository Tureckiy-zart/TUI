"use client";

/**
 * Button Component
 *
 * @status LOCKED (2025-12-15)
 * @rule DO NOT modify, extend, or create alternatives
 * @audits
 *   - Inventory: docs/reports/TUI_BUTTON_INVENTORY_REPORT.md
 *   - Token Domain: docs/reports/TUI_BUTTON_TOKEN_AUDIT.md
 *   - Storybook/Tests: docs/reports/TUI_BUTTON_STORYBOOK_TESTS_REPORT.md
 */

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { tokenCVA, type VariantProps } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { BUTTON_TOKENS } from "@/FOUNDATION/tokens/components/button";

/**
 * Button CVA Variants
 *
 * @enforcement C0_BUTTON_CVA_ENFORCEMENT
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @enforcement TUNG: tokenCVA introduction
 * @enforcement TUNG_BUTTON_INTERACTION_FIX
 *
 * CVA Enforcement Rules (C0_BUTTON_CVA_ENFORCEMENT):
 * - CVA may ONLY reference token-derived classes
 * - NO raw Tailwind color utilities (bg-red-*, text-blue-*, etc.)
 * - NO direct hover/active utilities outside State Matrix
 * - NO inline conditional class concatenation
 * - NO per-variant Tailwind overrides
 * - Structural utilities (inline-flex, items-center, etc.) are ALLOWED
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in BUTTON_TOKENS
 * - Button is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Button MUST react to token changes - changing tokens/colors.ts MUST change Button appearance
 *
 * State Matrix Authority Rules:
 * - ALL state classes (hover, active, disabled) MUST use State Matrix CSS variables
 * - NO raw Tailwind state utilities (hover:bg-primary/80, active:opacity-50)
 * - States react to Color Authority changes automatically through State Matrix
 *
 * Interaction Authority Contract (TUNG_INTERACTION_AUTHORITY_FOUNDATION):
 * - State Priority: disabled > loading > active > hover > focus-visible > base
 * - CSS variables (--button-*-hover-bg, etc.) are ONLY for visual appearance
 * - pointer-events is NOT a visual token - it controls interaction behavior
 * - Base state MUST have pointer-events: auto (default) - NO pointer-events-none in base
 * - pointer-events-none is ONLY allowed in disabled state (via disabled: prefix)
 * - DevTools Force :hover is NOT proof of functionality - real mouse hover must work
 * - Interaction state (pointer-events, cursor) is SEPARATE from visual state (colors, opacity)
 * - Base state CANNOT block pointer events - only disabled/loading states can
 * - Hover is FORBIDDEN when disabled={true} or loading={true}
 * - Active is FORBIDDEN when disabled={true} or loading={true}
 * - Focus is FORBIDDEN when disabled={true} (for interactions)
 * - All states MUST be browser-native (CSS pseudo-classes), NOT JavaScript-managed
 *
 * @see docs/architecture/BUTTON_CVA_ENFORCEMENT.md
 * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/STATE_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Motion Authority: Button uses MOTION_TOKENS.transitionPreset.colors for transitions
 * - Radius Authority: Button references componentRadius.button.md for border radius
 * - Typography Authority: Button references fontSize tokens for text sizing
 * - Spacing Authority: Button references semanticSpacing tokens for padding/gap
 * - State Authority: Button uses State Matrix CSS variables for all states
 * - Interaction Authority: Button follows Interaction Authority Contract for state priority
 *
 * Color tokens used (all from BUTTON_TOKENS, which reference tokens/colors.ts):
 * - bg-primary, bg-secondary, bg-accent, bg-destructive, bg-background, bg-muted
 * - text-primary-foreground, text-secondary-foreground, text-accent-foreground, text-destructive-foreground, text-foreground
 * - border-input, border-accent
 * - ring-ring (token-based focus ring)
 * - All hover/active/disabled states use State Matrix CSS variables (--button-*-hover-bg, etc.)
 *
 * Type-level enforcement:
 * - Variant values are restricted to: "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive"
 * - Size values are restricted to: "sm" | "md" | "lg" | "icon"
 * - TypeScript will error if invalid variant/size values are passed
 * - tokenCVA validates token usage in development mode (warns on forbidden patterns)
 * - No arbitrary color classes can be passed via className prop (enforced by tokenCVA validation)
 *
 * Reference Implementation:
 * - Button is the canonical reference for token-driven CVA patterns
 * - Future components should follow Button's CVA enforcement patterns
 * - Button CVA is immutable - changes require explicit unlock task
 */
const buttonVariants = tokenCVA({
  base: `inline-flex items-center justify-center whitespace-nowrap ${BUTTON_TOKENS.radius} font-medium ${BUTTON_TOKENS.transition.colors} ${BUTTON_TOKENS.state.focus.outline} ${BUTTON_TOKENS.state.focus.ring} ${BUTTON_TOKENS.state.disabled.cursor} ${BUTTON_TOKENS.state.disabled.pointerEvents} [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.background} ${BUTTON_TOKENS.variant.primary.text} ${BUTTON_TOKENS.shadow.primary} ${BUTTON_TOKENS.variant.primary.hover} ${BUTTON_TOKENS.variant.primary.active} ${BUTTON_TOKENS.variant.primary.focus} ${BUTTON_TOKENS.variant.primary.disabled.background} ${BUTTON_TOKENS.variant.primary.disabled.text}`,
      secondary: `${BUTTON_TOKENS.variant.secondary.background} ${BUTTON_TOKENS.variant.secondary.text} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.secondary.hover} ${BUTTON_TOKENS.variant.secondary.active} ${BUTTON_TOKENS.variant.secondary.disabled.background} ${BUTTON_TOKENS.variant.secondary.disabled.text}`,
      accent: `${BUTTON_TOKENS.variant.accent.background} ${BUTTON_TOKENS.variant.accent.text} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.accent.hover} ${BUTTON_TOKENS.variant.accent.active} ${BUTTON_TOKENS.variant.accent.disabled.background} ${BUTTON_TOKENS.variant.accent.disabled.text}`,
      outline: `${BUTTON_TOKENS.variant.outline.border} ${BUTTON_TOKENS.variant.outline.background} ${BUTTON_TOKENS.variant.outline.text} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.outline.hover.background} ${BUTTON_TOKENS.variant.outline.hover.text} ${BUTTON_TOKENS.variant.outline.hover.border} ${BUTTON_TOKENS.variant.outline.active.background} ${BUTTON_TOKENS.variant.outline.active.text} ${BUTTON_TOKENS.variant.outline.active.border} ${BUTTON_TOKENS.variant.outline.disabled.background} ${BUTTON_TOKENS.variant.outline.disabled.text} ${BUTTON_TOKENS.variant.outline.disabled.border}`,
      ghost: `${BUTTON_TOKENS.variant.ghost.background} ${BUTTON_TOKENS.variant.ghost.text} ${BUTTON_TOKENS.variant.ghost.hover.background} ${BUTTON_TOKENS.variant.ghost.hover.text} ${BUTTON_TOKENS.variant.ghost.active.background} ${BUTTON_TOKENS.variant.ghost.active.text} ${BUTTON_TOKENS.variant.ghost.disabled.background} ${BUTTON_TOKENS.variant.ghost.disabled.text}`,
      destructive: `${BUTTON_TOKENS.variant.destructive.background} ${BUTTON_TOKENS.variant.destructive.text} ${BUTTON_TOKENS.shadow.default} ${BUTTON_TOKENS.variant.destructive.hover} ${BUTTON_TOKENS.variant.destructive.active} ${BUTTON_TOKENS.variant.destructive.disabled.background} ${BUTTON_TOKENS.variant.destructive.disabled.text}`,
    },
    size: {
      sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.sm} ${BUTTON_TOKENS.padding.vertical.sm} ${BUTTON_TOKENS.fontSize.sm} ${BUTTON_TOKENS.gap.sm} [&_svg]:${BUTTON_TOKENS.iconSize.sm}`,
      md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.md} ${BUTTON_TOKENS.padding.vertical.md} ${BUTTON_TOKENS.fontSize.md} ${BUTTON_TOKENS.gap.md} [&_svg]:${BUTTON_TOKENS.iconSize.md}`,
      lg: `${BUTTON_TOKENS.height.lg} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.lg} ${BUTTON_TOKENS.padding.vertical.md} ${BUTTON_TOKENS.fontSize.lg} ${BUTTON_TOKENS.gap.lg} [&_svg]:${BUTTON_TOKENS.iconSize.lg}`,
      icon: `${BUTTON_TOKENS.height.icon} ${BUTTON_TOKENS.width.icon} [&_svg]:${BUTTON_TOKENS.iconSize.icon}`,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

/**
 * Button Variant Type
 *
 * Type-level enforcement: Only these variant values are allowed.
 * TypeScript will error if any other string is passed.
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @rule All variants use token-based colors from BUTTON_TOKENS
 */
export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

/**
 * Button Size Type
 *
 * Type-level enforcement: Only these size values are allowed.
 * TypeScript will error if any other string is passed.
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 */
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

/**
 * Button Component Props
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @rule variant prop is restricted to ButtonVariant union type
 * @rule size prop is restricted to ButtonSize union type
 * @rule className prop cannot override color classes (tokenCVA validation in dev mode)
 * @rule Button is fully token-based - no raw Tailwind colors allowed
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Button Component Implementation
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @rule NO color-related classes outside CVA
 * @rule JSX must only consume CVA output via buttonVariants()
 * @rule NO conditional className logic affecting colors
 * @rule Button is NOT a source of color - all colors come from Color Authority
 * @rule Button MUST react to token changes - changing tokens/colors.ts MUST change Button appearance
 *
 * Token-only contract:
 * - All colors are defined in BUTTON_TOKENS (src/tokens/components/button.ts)
 * - BUTTON_TOKENS reference foundation tokens from tokens/colors.ts
 * - No raw Tailwind color classes (bg-red-500, text-blue-600, etc.) are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size values at compile time
 *
 * Color Authority compliance:
 * - Button does NOT define colors - it consumes them from tokens
 * - Changing tokens/colors.ts will automatically change Button appearance
 * - Button variants are visually distinct and react to theme changes
 * - All hover states use token-based opacity variants
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // Color logic is fully centralized in CVA - no color classes applied here
    // All colors come from BUTTON_TOKENS → tokens/colors.ts (Color Authority)
    const finalClassName = cn(buttonVariants({ variant, size, className }));
    // Get icon size classes based on button size
    // Map size-* utilities to explicit w-* and h-* for SVG elements
    const iconSizeMap: Record<string, string> = {
      "size-3.5": "[&_svg]:w-3.5 [&_svg]:h-3.5",
      "size-4": "[&_svg]:w-4 [&_svg]:h-4",
      "size-5": "[&_svg]:w-5 [&_svg]:h-5",
    };
    const iconSizeToken = size ? BUTTON_TOKENS.iconSize[size] : BUTTON_TOKENS.iconSize.md;
    const iconSizeClass = iconSizeMap[iconSizeToken] || "[&_svg]:w-4 [&_svg]:h-4";
    // #region agent log
    if (typeof window !== "undefined" && variant === "primary") {
      const hasHoverClass = finalClassName.includes(
        "hover:bg-[hsl(var(--button-primary-hover-bg))]",
      );
      const hasActiveClass = finalClassName.includes(
        "active:bg-[hsl(var(--button-primary-active-bg))]",
      );
      fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "button.tsx:137",
          message: "Button className check (State Authority Contract)",
          data: {
            variant,
            size,
            className: finalClassName,
            hasHoverClass,
            hasActiveClass,
            hoverClassInString: finalClassName.includes("hover"),
            allClasses: finalClassName
              .split(" ")
              .filter((c) => c.includes("hover") || c.includes("active") || c.includes("disabled")),
          },
          timestamp: Date.now(),
          sessionId: "debug-session",
          runId: "state-authority-contract",
          hypothesisId: "A",
        }),
      }).catch(() => {});
    }
    // #endregion
    return (
      <Comp className={finalClassName} ref={ref} {...props}>
        {leftIcon && (
          <span
            className={cn(
              "pointer-events-none relative z-10 inline-flex items-center [&_svg]:text-current",
              iconSizeClass,
            )}
          >
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span
            className={cn(
              "pointer-events-none relative z-10 inline-flex items-center [&_svg]:text-current",
              iconSizeClass,
            )}
          >
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
