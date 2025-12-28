/**
 * Gradient Tokens
 *
 * Foundation gradient tokens for Tenerife UI design system.
 * Provides reusable gradient patterns that use token-based colors.
 *
 * All gradients reference foundation color tokens (primary, accent, secondary,
 * surface-*, muted) to ensure consistency and theme compatibility.
 *
 * @see src/FOUNDATION/tokens/colors.ts - Color token definitions
 */

/**
 * Foundation Gradient Tokens
 *
 * Defines all reusable gradient patterns used across the design system.
 * Gradients are organized by semantic purpose:
 * - brand: Brand identity gradients (primary/accent combinations)
 * - surface: Surface elevation gradients
 * - overlay: Overlay gradients for images and overlays
 * - text: Text gradient effects with bg-clip-text
 * - semantic: Status indicator gradients (success, warning, error, info)
 * - skeleton: Loading state gradients (shimmer, pulse effects)
 * - glass: Glassmorphism gradients (frosted glass effects)
 * - interactive: Interactive state gradients (hover, active, focus)
 * - mesh: Modern multi-point gradients (aurora, sunset, neon effects)
 * - ring: Ring/spinner gradients for loading indicators
 */
export const GRADIENT_TOKENS = {
  /**
   * Brand gradient tokens
   * Used for brand identity elements, hero sections, and featured content
   */
  brand: {
    /**
     * Primary brand gradient: primary → accent (horizontal)
     * Used for hero sections and primary brand elements
     */
    primary: "bg-gradient-to-r from-primary to-accent",
    /**
     * Primary brand gradient vertical: primary → accent (vertical)
     * Used for vertical hero sections and tall brand elements
     */
    primaryVertical: "bg-gradient-to-b from-primary to-accent",
    /**
     * Primary brand gradient diagonal: primary → accent (diagonal)
     * Used for diagonal brand elements and modern layouts
     */
    primaryDiagonal: "bg-gradient-to-br from-primary to-accent",
    /**
     * Reversed brand gradient: accent → primary
     * Used for reversed brand elements
     */
    reversed: "bg-gradient-to-r from-accent to-primary",
    /**
     * Featured brand gradient: accent-500 → primary-600
     * Used for featured badges and premium content indicators
     */
    featured: "bg-gradient-to-r from-accent-500 to-primary-600",
  } as const,

  /**
   * Surface gradient tokens
   * Used for surface elevation effects and placeholders
   */
  surface: {
    /**
     * Elevated surface gradient: surface-elevated1 → surface-elevated2
     * Used for elevated surface backgrounds
     */
    elevated: "bg-gradient-to-br from-surface-elevated1 to-surface-elevated2",
    /**
     * Muted surface gradient: muted → muted/50
     * Used for placeholder backgrounds and subtle surface effects
     */
    muted: "bg-gradient-to-br from-muted to-muted/50",
  } as const,

  /**
   * Overlay gradient tokens
   * Used for image overlays and hover effects
   */
  overlay: {
    /**
     * Dark overlay gradient: black/60 → transparent (top)
     * Used for image hover states and text readability overlays
     */
    dark: "bg-gradient-to-t from-black/60 via-transparent to-transparent",
    /**
     * Light overlay gradient: white/60 → transparent (top)
     * Used for light overlays in day mode and bright image overlays
     */
    light: "bg-gradient-to-t from-white/60 via-transparent to-transparent",
    /**
     * Dark overlay gradient bottom: transparent → black/60 (bottom)
     * Used for bottom overlays on images and cards
     */
    darkBottom: "bg-gradient-to-b from-transparent via-transparent to-black/60",
    /**
     * Vignette overlay: radial gradient from transparent to black/40
     * Used for vignette effects on images and focused content
     * Uses arbitrary value for radial gradient (Tailwind doesn't have built-in radial gradient utility)
     */
    vignette: "bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]",
  } as const,

  /**
   * Text gradient tokens
   * Used for decorative text effects with bg-clip-text
   */
  text: {
    /**
     * Brand text gradient: accent-500 → primary-600
     * Used for featured text and premium content text
     */
    brand: "bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent",
    /**
     * Primary text gradient: primary → accent
     * Used for primary brand text effects
     */
    primary: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
    /**
     * Aurora text gradient: primary → accent → secondary
     * Used for modern multi-color text effects
     */
    aurora: "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
    /**
     * Muted text gradient: muted-foreground → muted-foreground/70
     * Used for subtle text gradient effects
     */
    muted:
      "bg-gradient-to-r from-muted-foreground to-muted-foreground/70 bg-clip-text text-transparent",
  } as const,

  /**
   * Semantic gradient tokens
   * Used for status indicators, badges, alerts, and semantic feedback
   */
  semantic: {
    /**
     * Success gradient: success → success/80
     * Used for success states, positive feedback, and completion indicators
     */
    success: "bg-gradient-to-r from-success to-success/80",
    /**
     * Warning gradient: warning → warning/80
     * Used for warning states and caution indicators
     */
    warning: "bg-gradient-to-r from-warning to-warning/80",
    /**
     * Error gradient: error → error/80
     * Used for error states, destructive actions, and critical feedback
     */
    error: "bg-gradient-to-r from-error to-error/80",
    /**
     * Info gradient: info → info/80
     * Used for informational states and neutral feedback
     */
    info: "bg-gradient-to-r from-info to-info/80",
  } as const,

  /**
   * Skeleton gradient tokens
   * Used for loading states, skeleton screens, and shimmer effects
   */
  skeleton: {
    /**
     * Shimmer gradient: muted → muted/50 → muted
     * Used for shimmer loading effects on skeleton elements
     */
    shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted",
    /**
     * Pulse gradient: surface-elevated1 → surface-elevated2 → surface-elevated1
     * Used for pulsing loading effects on skeleton surfaces
     */
    pulse: "bg-gradient-to-r from-surface-elevated1 via-surface-elevated2 to-surface-elevated1",
  } as const,

  /**
   * Glass gradient tokens (Glassmorphism)
   * Used for frosted glass effects and modern UI patterns
   */
  glass: {
    /**
     * Light glass gradient: white/10 → white/5
     * Used for light glassmorphism effects in day mode
     */
    light: "bg-gradient-to-br from-white/10 to-white/5",
    /**
     * Dark glass gradient: black/10 → black/5
     * Used for dark glassmorphism effects in night mode
     */
    dark: "bg-gradient-to-br from-black/10 to-black/5",
    /**
     * Frost glass gradient: surface-glass with varying opacity
     * Used for frosted glass effects using surface-glass token
     * Uses arbitrary values with CSS variables
     * Note: Since --surface-glass already contains opacity, we use it directly
     * For gradient effect, we create a subtle transition using the same color
     */
    frost: "bg-gradient-to-br from-[hsl(var(--surface-glass))] to-[hsl(var(--surface-glass))]",
  } as const,

  /**
   * Interactive gradient tokens
   * Used for hover, active, and focus states on interactive elements
   */
  interactive: {
    /**
     * Hover gradient: primary/10 → accent/10
     * Used for hover state backgrounds on interactive elements
     */
    hover: "bg-gradient-to-r from-primary/10 to-accent/10",
    /**
     * Active gradient: primary/20 → accent/20
     * Used for active/pressed state backgrounds
     */
    active: "bg-gradient-to-r from-primary/20 to-accent/20",
    /**
     * Focus gradient: ring/20 → ring/10
     * Used for focus state backgrounds and focus rings
     */
    focus: "bg-gradient-to-r from-ring/20 to-ring/10",
  } as const,

  /**
   * Mesh gradient tokens
   * Used for modern multi-point gradients and aurora effects
   */
  mesh: {
    /**
     * Aurora mesh gradient: primary → accent → secondary
     * Used for aurora-like effects and modern hero sections
     */
    aurora: "bg-gradient-to-br from-primary via-accent to-secondary",
    /**
     * Sunset mesh gradient: primary-600 → accent-500 → secondary-400
     * Used for warm sunset-like effects and featured sections
     */
    sunset: "bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-400",
    /**
     * Neon mesh gradient: accent-400 → primary-500 → accent-600
     * Used for neon-like effects and nightlife-themed content
     */
    neon: "bg-gradient-to-r from-accent-400 via-primary-500 to-accent-600",
  } as const,

  /**
   * Ring gradient tokens
   * Used for ring/spinner loading indicators and circular gradients
   */
  ring: {
    /**
     * Primary ring gradient: primary → primary → transparent
     * Used for primary ring spinners and loading indicators
     * Uses --tm-primary CSS variable (correct variable name in theme system)
     */
    primary:
      "bg-gradient-to-r from-[hsl(var(--tm-primary))] via-[hsl(var(--tm-primary))] to-transparent",
    /**
     * Muted ring gradient: muted-foreground → muted-foreground → transparent
     * Used for muted ring spinners and subtle loading indicators
     */
    muted:
      "bg-gradient-to-r from-[hsl(var(--muted-foreground))] via-[hsl(var(--muted-foreground))] to-transparent",
    /**
     * Subtle ring gradient: muted-foreground → muted-foreground → transparent
     * Used for subtle ring spinners and minimal loading indicators
     */
    subtle:
      "bg-gradient-to-r from-[hsl(var(--muted-foreground))] via-[hsl(var(--muted-foreground))] to-transparent",
  } as const,
} as const;

/**
 * Type exports for gradient tokens
 */
export type GradientBrand = typeof GRADIENT_TOKENS.brand;
export type GradientSurface = typeof GRADIENT_TOKENS.surface;
export type GradientOverlay = typeof GRADIENT_TOKENS.overlay;
export type GradientText = typeof GRADIENT_TOKENS.text;
export type GradientSemantic = typeof GRADIENT_TOKENS.semantic;
export type GradientSkeleton = typeof GRADIENT_TOKENS.skeleton;
export type GradientGlass = typeof GRADIENT_TOKENS.glass;
export type GradientInteractive = typeof GRADIENT_TOKENS.interactive;
export type GradientMesh = typeof GRADIENT_TOKENS.mesh;
export type GradientRing = typeof GRADIENT_TOKENS.ring;
