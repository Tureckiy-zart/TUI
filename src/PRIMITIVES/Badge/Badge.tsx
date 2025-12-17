"use client";

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { BADGE_TOKENS } from "@/FOUNDATION/tokens/components/badge";

/**
 * Badge variant values
 *
 * @public
 */
export const BADGE_VARIANTS = [
  "primary",
  "secondary",
  "accent",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const;

/**
 * Badge variant type
 *
 * @public
 */
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

const badgeVariants = tokenCVA({
  base: `${BADGE_TOKENS.layout} ${BADGE_TOKENS.radius} ${BADGE_TOKENS.border} ${BADGE_TOKENS.padding.horizontal} ${BADGE_TOKENS.padding.vertical} ${BADGE_TOKENS.fontSize} ${BADGE_TOKENS.fontWeight} ${BADGE_TOKENS.transition.colors} ${BADGE_TOKENS.focus.outline} ${BADGE_TOKENS.focus.ring} ${BADGE_TOKENS.focus.offset}`,
  variants: {
    variant: {
      primary: `${BADGE_TOKENS.variant.primary.border} ${BADGE_TOKENS.variant.primary.background} ${BADGE_TOKENS.variant.primary.text} ${BADGE_TOKENS.variant.primary.hover}`,
      secondary: `${BADGE_TOKENS.variant.secondary.border} ${BADGE_TOKENS.variant.secondary.background} ${BADGE_TOKENS.variant.secondary.text} ${BADGE_TOKENS.variant.secondary.hover}`,
      accent: `${BADGE_TOKENS.variant.accent.border} ${BADGE_TOKENS.variant.accent.background} ${BADGE_TOKENS.variant.accent.text} ${BADGE_TOKENS.variant.accent.hover}`,
      outline: `${BADGE_TOKENS.variant.outline.border} ${BADGE_TOKENS.variant.outline.text}`,
      ghost: `${BADGE_TOKENS.variant.ghost.border} ${BADGE_TOKENS.variant.ghost.background} ${BADGE_TOKENS.variant.ghost.text} ${BADGE_TOKENS.variant.ghost.hover}`,
      link: `${BADGE_TOKENS.variant.link.border} ${BADGE_TOKENS.variant.link.background} ${BADGE_TOKENS.variant.link.text} ${BADGE_TOKENS.variant.link.hover} ${BADGE_TOKENS.underlineOffset} ${BADGE_TOKENS.variant.link.underline}`,
      destructive: `${BADGE_TOKENS.variant.destructive.border} ${BADGE_TOKENS.variant.destructive.background} ${BADGE_TOKENS.variant.destructive.text} ${BADGE_TOKENS.variant.destructive.hover}`,
    } satisfies Record<BadgeVariant, string>,
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Badge variant style
   * @default "primary"
   */
  variant?: BadgeVariant;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
