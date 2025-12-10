/**
 * Notification Component Tokens
 *
 * Component-level design tokens for Notification Center components.
 * Maps foundation tokens (spacing, radius, shadows, motion) to notification-specific usage.
 * Extends toast tokens with additional tokens for panel, grouping, and timeline features.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Notification Component Tokens
 *
 * Defines tokens for notification spacing, radius, shadow, surface variants, animations,
 * panel configuration, item styling, and timeline features.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const NOTIFICATION_TOKENS = {
  /**
   * Spacing tokens for notification layout
   * Maps to semanticSpacing tokens
   */
  spacing: {
    gap: "gap-sm", // 8px - maps to semanticSpacing.sm
    padding: "p-md", // 16px - maps to semanticSpacing.md
    paddingHorizontal: "px-md", // 16px horizontal padding
    paddingVertical: "py-md", // 16px vertical padding
    itemPadding: "p-sm", // 8px - maps to semanticSpacing.sm
    panelPadding: "p-lg", // 24px - maps to semanticSpacing.lg
  } as const,

  /**
   * Border radius for notifications
   * Maps to componentRadius.notification
   */
  radius: {
    item: "rounded-md", // 6px - maps to borderRadius.md / componentRadius.notification.item
    panel: "rounded-lg", // 8px - maps to borderRadius.lg / componentRadius.notification.panel
    default: "rounded-lg", // 8px - maps to borderRadius.lg
  } as const,

  /**
   * Shadow for notifications
   * Maps to elevationShadows
   */
  shadow: {
    item: "shadow-sm", // Maps to elevationShadows.sm
    panel: "shadow-xl", // Maps to elevationShadows.xl
    default: "shadow-lg", // Maps to elevationShadows.lg
  } as const,

  /**
   * Width tokens for notifications
   * Maps to spacing tokens for width constraints
   */
  width: {
    item: "w-full", // Full width within container
    itemMax: "max-w-md", // 448px - max width for item
    panel: "w-full", // Full width on mobile
    panelSm: "w-sm", // 384px - small panel width
    panelMd: "w-md", // 448px - medium panel width (default)
    panelLg: "w-lg", // 512px - large panel width
    panelMaxHeight: "max-h-[calc(100vh-2rem)]", // Max height with spacing
  } as const,

  /**
   * Item-specific tokens
   * For individual notification items in lists
   */
  item: {
    padding: "p-sm", // 8px - maps to semanticSpacing.sm
    gap: "gap-sm", // 8px - maps to semanticSpacing.sm
    iconSize: "h-5 w-5", // 20px - icon size
    radius: "rounded-md", // 6px - maps to borderRadius.md
    minHeight: "min-h-[3rem]", // 48px - minimum item height
  } as const,

  /**
   * Surface tokens for notification variants
   * Extends toast variants with system and log
   * Maps to SURFACE_TOKENS for background colors
   */
  surface: {
    success: "bg-success/10 border-success/20 text-success-foreground",
    info: "bg-info/10 border-info/20 text-info-foreground",
    warning: "bg-warning/10 border-warning/20 text-warning-foreground",
    danger: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
    system: "bg-muted border-border text-foreground",
    log: "bg-background border-border/50 text-muted-foreground",
    default: "bg-background border border-border text-foreground",
  } as const,

  /**
   * Timeline tokens for grouped notifications
   * Visual timeline indicators for grouped items
   */
  timeline: {
    dotSize: "h-2 w-2", // 8px - timeline dot size
    lineWidth: "w-0.5", // 2px - timeline line width
    gap: "gap-xs", // 4px - gap between timeline elements
  } as const,

  /**
   * Animation tokens for notification enter/exit animations
   * Maps to Motion V2 utility classes
   * Uses CSS-only animations from motion/v2.ts
   */
  animation: {
    enter: {
      slideInRight: "tm-motion-fade-slide-right", // Motion V2 fade + slide right
      fadeIn: "tm-motion-fade-in", // Motion V2 fade in
      combined: "tm-motion-fade-slide-right", // Motion V2 fade + slide right
    } as const,
    exit: {
      slideOutRight: "tm-motion-fade-slide-right-out", // Motion V2 fade + slide right out
      fadeOut: "tm-motion-fade-out", // Motion V2 fade out
      combined: "tm-motion-fade-slide-right-out", // Motion V2 fade + slide right out
    } as const,
    panel: {
      enter: {
        slideInRight: "tm-motion-fade-slide-right", // Motion V2 panel slide in from right
        fadeIn: "tm-motion-fade-in", // Motion V2 panel fade in
        combined: "tm-motion-fade-slide-right", // Motion V2 panel fade + slide right
      } as const,
      exit: {
        slideOutRight: "tm-motion-fade-slide-right-out", // Motion V2 panel slide out to right
        fadeOut: "tm-motion-fade-out", // Motion V2 panel fade out
        combined: "tm-motion-fade-slide-right-out", // Motion V2 panel fade + slide right out
      } as const,
    } as const,
  } as const,

  /**
   * Panel-specific tokens
   * For the side drawer notification panel
   */
  panel: {
    width: {
      default: "w-md", // 448px - default panel width
      sm: "w-sm", // 384px - small panel
      md: "w-md", // 448px - medium panel
      lg: "w-lg", // 512px - large panel
    } as const,
    maxHeight: "max-h-[calc(100vh-2rem)]", // Max height with spacing
    spacing: {
      gap: "gap-md", // 16px - gap between panel sections
      padding: "p-lg", // 24px - panel padding
      headerPadding: "px-lg py-md", // Header padding
    } as const,
    radius: {
      default: "rounded-lg", // 8px - panel border radius
      topLeft: "rounded-tl-lg", // Top-left radius
      topRight: "rounded-tr-lg", // Top-right radius
    } as const,
    shadow: {
      default: "shadow-xl", // Large shadow for panel elevation
    } as const,
    backdrop: {
      bg: "bg-black/50", // Backdrop background
      blur: "backdrop-blur-sm", // Backdrop blur
    } as const,
  } as const,
} as const;

/**
 * Type exports for Notification tokens
 */
export type NotificationVariant = keyof typeof NOTIFICATION_TOKENS.surface;
export type NotificationPanelWidth = keyof typeof NOTIFICATION_TOKENS.panel.width;
