"use client";

/**
 * Panel Component
 *
 * Lightweight structural surface container for grouping related content inside a page.
 * Panel provides surface styling without interactivity, sitting semantically
 * between Box (generic container) and Card (structured content container).
 *
 * @enforcement TUNG_PANEL_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use PANEL_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (panelVariants)
 * - Tone styling uses PANEL_TOKENS.tone (bg, border, shadow, padding, radius)
 * - Panel composes Box component (delegates additional styling to Box)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from PANEL_TOKENS.tone for tone styling
 * - Background colors use PANEL_TOKENS.tone[tone].bg
 * - Border colors use PANEL_TOKENS.tone[tone].border
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses PANEL_TOKENS.tone[tone].padding
 * - Padding can be overridden via padding prop (token-based)
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses PANEL_TOKENS.tone[tone].radius
 * - Radius can be overridden via radius prop (token-based)
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * Elevation Authority Rules:
 * - ALL shadow values MUST come from shadow token system
 * - Shadows use PANEL_TOKENS.tone[tone].shadow
 * - NO raw Tailwind shadow classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Panel uses color token system exclusively via PANEL_TOKENS
 * - Spacing Authority: Panel uses spacing token system exclusively via PANEL_TOKENS
 * - Radius Authority: Panel uses radius token system exclusively via PANEL_TOKENS
 * - Elevation Authority: Panel uses shadow tokens via PANEL_TOKENS
 * - Layout Authority: Panel composes Box component
 *
 * Token-only contract:
 * - All styling is defined in PANEL_TOKENS (src/FOUNDATION/tokens/components/panel.ts)
 * - PANEL_TOKENS reference foundation tokens from spacing, radius, color, and shadow systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/radius/shadow classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid tone values at compile time
 *
 * **What Panel IS:**
 * - Lightweight structural surface container for grouping related content inside a page
 * - Semantic upgrade over Box (adds surface styling)
 * - Non-interactive container (no onClick, no interactive states)
 * - Can be nested inside Section components
 *
 * **What Panel IS NOT:**
 * - Page-level semantic separation → Use `Section` for page-level separation
 * - Structured content container (Card) → Use `Card` for Header/Body/Footer structure
 * - Interactive component → Panel does not imply interactivity
 * - Layout composition primitive → Use Stack, Flex, or Grid for layout
 *
 * @see docs/reference/COMPONENT_USAGE_MATRIX.md for usage boundaries and nesting rules
 *
 * @example
 * ```tsx
 * // Basic panel usage
 * <Panel>
 *   <Text>Grouped content</Text>
 * </Panel>
 *
 * // Panel with tone and padding
 * <Panel tone="muted" padding="lg">
 *   <Text>Settings section</Text>
 * </Panel>
 *
 * // Panel inside Section (allowed)
 * <Section spaceY="lg">
 *   <Panel tone="subtle">
 *     <Text>Form section</Text>
 *   </Panel>
 * </Section>
 * ```
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { PANEL_TOKENS, type PanelTone } from "@/FOUNDATION/tokens/components/panel";

import { Box, type BoxProps } from "../Box";
import type { ResponsiveRadius, ResponsiveSpacing } from "../layout.types";

/**
 * Extract padding value from token string (e.g., "p-md" -> "md")
 */
function extractPaddingFromToken(token: string): ResponsiveSpacing {
  if (token.startsWith("p-")) {
    return token.replace("p-", "") as ResponsiveSpacing;
  }
  return token as ResponsiveSpacing;
}

/**
 * Extract radius value from token string (e.g., "rounded-md" -> "md")
 */
function extractRadiusFromToken(token: string): ResponsiveRadius {
  if (token.startsWith("rounded-")) {
    return token.replace("rounded-", "") as ResponsiveRadius;
  }
  return token as ResponsiveRadius;
}

/**
 * Panel tone variants using tokenCVA
 * Maps tone values to token-based styling classes
 */
const panelVariants = tokenCVA({
  variants: {
    tone: {
      default: `${PANEL_TOKENS.tone.default.bg} ${PANEL_TOKENS.tone.default.border} ${PANEL_TOKENS.tone.default.shadow}`,
      muted: `${PANEL_TOKENS.tone.muted.bg} ${PANEL_TOKENS.tone.muted.border} ${PANEL_TOKENS.tone.muted.shadow}`,
      subtle: `${PANEL_TOKENS.tone.subtle.bg} ${PANEL_TOKENS.tone.subtle.border} ${PANEL_TOKENS.tone.subtle.shadow}`,
    } satisfies Record<PanelTone, string>,
  },
  defaultVariants: {
    tone: "default",
  },
});

export interface PanelProps extends Omit<BoxProps, "bg" | "shadow" | "radius" | "p" | "px" | "py"> {
  /**
   * Padding - token-based (sm, md, lg)
   * Overrides default tone padding
   */
  padding?: ResponsiveSpacing;

  /**
   * Border radius - token-based (sm, md, lg, xl)
   * Overrides default tone radius
   */
  radius?: ResponsiveRadius;

  /**
   * Surface tone - token-based (default, muted, subtle)
   * Determines background and border styling
   */
  tone?: PanelTone;
}

/**
 * Panel component - lightweight structural surface container
 */
const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ padding, radius, tone = "default", className, ...props }, ref) => {
    // Get tokens from tone for padding/radius defaults
    const toneTokens = PANEL_TOKENS.tone[tone];

    // Use provided props or fall back to tone defaults
    const paddingValue = padding ?? extractPaddingFromToken(toneTokens.padding);
    const radiusValue = radius ?? extractRadiusFromToken(toneTokens.radius);

    return (
      <Box
        ref={ref}
        className={cn(panelVariants({ tone }), className)}
        px={paddingValue}
        py={paddingValue}
        radius={radiusValue}
        {...props}
      />
    );
  },
);

Panel.displayName = "Panel";

export { Panel, panelVariants };
export type { PanelTone } from "@/FOUNDATION/tokens/components/panel";
