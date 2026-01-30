/**
 * Carousel Component Tokens (Extension-only, internal)
 *
 * Maps foundation spacing/layout tokens to carousel-specific usage.
 * No public token props; theme-aware via semantic tokens.
 *
 * Reference: SPACING_AUTHORITY, STATE_AUTHORITY, LAYOUT_AUTHORITY
 */

export const CAROUSEL_TOKENS = {
  /** Track: overflow hidden, single-slide viewport */
  track: {
    position: "relative",
    overflow: "overflow-hidden",
    /** Horizontal: flex row; vertical: flex col */
    flexDirection: {
      horizontal: "flex flex-row",
      vertical: "flex flex-col",
    },
  },
  /** Slide wrapper: full width/height of viewport */
  slide: {
    minWidth: "min-w-full",
    minHeight: "min-h-full",
    flexShrink: "shrink-0",
  },
  /** Controls container: gap between Prev/Next */
  controls: {
    overlay: "pointer-events-none absolute inset-0 z-10",
    prev: "pointer-events-auto absolute left-sm top-1/2 -translate-y-1/2",
    next: "pointer-events-auto absolute right-sm top-1/2 -translate-y-1/2",
  },
  /** Indicators container: gap between dots */
  indicators: {
    gap: "gap-xs",
  },
  /** Indicator dot: active vs inactive (semantic tokens) */
  indicator: {
    base: "rounded-full",
    inactive: "bg-[hsl(var(--tm-muted))]",
    active: "bg-[hsl(var(--tm-primary))]",
    size: "w-2 h-2",
  },
} as const;
