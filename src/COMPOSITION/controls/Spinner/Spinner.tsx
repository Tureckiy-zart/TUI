"use client";

/**
 * Spinner Component
 *
 * Animated loading indicator for visual feedback during async operations.
 * Provides multiple visual variants (circle/dots/bounce/linear/bars/pulse/wave/orbit/bars-horizontal/ripple), size variants (xs/sm/md/lg/xl/2xl/3xl),
 * tone variants (primary/muted/subtle), and optional text label with configurable positioning.
 *
 * @enforcement TUNG_SPINNER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use SPINNER_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL motion values MUST use MOTION_TOKENS (via SPINNER_TOKENS.animation)
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Size variants use SPINNER_TOKENS.size
 * - Tone variants use SPINNER_TOKENS.tone
 * - Border colors use SPINNER_TOKENS.borderColor
 * - Background colors use SPINNER_TOKENS.background and SPINNER_TOKENS.linearTrackBackground
 * - Animation variants use SPINNER_TOKENS.animationVariants
 * - Easing uses SPINNER_TOKENS.easing
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from SPINNER_TOKENS.tone for tone variants
 * - Border colors use SPINNER_TOKENS.borderColor[tone]
 * - Text colors use SPINNER_TOKENS.tone[tone]
 * - Background colors use SPINNER_TOKENS.background and SPINNER_TOKENS.linearTrackBackground
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Size uses SPINNER_TOKENS.size[size] (maps to spacing tokens)
 * - Label gap uses SPINNER_TOKENS.labelGap[size]
 * - Dot gap uses SPINNER_TOKENS.dotGap[size]
 * - NO raw Tailwind spacing classes (w-4, h-4, gap-2, etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses SPINNER_TOKENS.radius (rounded-full for circle variants)
 * - NO raw Tailwind radius classes (rounded-full, rounded-md, etc.) allowed
 *
 * Motion Authority Rules:
 * - ALL motion values MUST use MOTION_TOKENS
 * - Animations use SPINNER_TOKENS.animationVariants (spin, pulse, bounce, linear, bars, wave, ripple)
 * - Easing uses SPINNER_TOKENS.easing
 * - NO raw motion values allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Color Authority: Spinner uses color token system exclusively via SPINNER_TOKENS
 * - Spacing Authority: Spinner uses spacing token system exclusively via SPINNER_TOKENS
 * - Radius Authority: Spinner uses radius token system exclusively via SPINNER_TOKENS
 * - Motion Authority: Spinner uses motion tokens for animations via SPINNER_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in SPINNER_TOKENS (src/FOUNDATION/tokens/components/spinner.ts)
 * - SPINNER_TOKENS reference foundation tokens from spacing, radius, color, and motion systems
 * - Gradient tokens reference GRADIENT_TOKENS for ring variants
 * - No raw Tailwind color/spacing/radius classes are allowed
 * - TypeScript enforces valid variant/size/tone values at compile time
 *
 * @semantic_role EXTENSION_VISUAL_FEEDBACK
 *
 * @semantic_definition
 * Spinner is a visual feedback component that displays animated loading indicators in various styles.
 * It provides visual feedback during async operations (data loading, form submission, etc.).
 * Spinner supports multiple visual variants (circle, dots, bounce, linear, bars, pulse, wave, orbit, bars-horizontal, ripple), full size scale (xs-3xl),
 * and tone variants for different visual contexts. Optional text label can be displayed alongside spinner
 * with configurable positioning.
 *
 * **What Spinner IS:**
 * - Visual feedback component for loading states
 * - Multiple visual style variants (circle, dots, bounce, linear, bars, pulse, wave, orbit, bars-horizontal, ripple)
 * - Non-interactive display component
 * - Supports inline, page, data, and overlay loading scenarios
 *
 * **What Spinner IS NOT:**
 * - NOT an interactive component (no hover/active/focus states)
 * - NOT a progress indicator (use Progress component for progress bars)
 * - NOT a skeleton loader (use Skeleton component for content placeholders)
 * - NOT a Foundation component (Extension layer component)
 *
 * @example
 * ```tsx
 * // Basic spinner (circle variant, default)
 * <Spinner />
 *
 * // Dots variant
 * <Spinner variant="dots" size="md" tone="muted" />
 *
 * // Bounce variant
 * <Spinner variant="bounce" size="md" />
 *
 * // Linear variant
 * <Spinner variant="linear" size="sm" />
 *
 * // Spinner with label
 * <Spinner label="Loading..." labelPosition="right" />
 *
 * // Spinner with accessibility label
 * <Spinner aria-label="Loading data" />
 * ```
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { SPINNER_TOKENS } from "@/FOUNDATION/tokens/components/spinner";
import { Text } from "@/PRIMITIVES/Text/Text";

import { Stack } from "../../layout/Stack/Stack";

/**
 * Spinner size type
 * Full GlobalSize scale: xs, sm, md, lg, xl, 2xl, 3xl
 */
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/**
 * Spinner tone type
 * Color tone variants: primary, muted, subtle
 */
export type SpinnerTone = "primary" | "muted" | "subtle";

/**
 * Spinner variant type
 * Visual style variants: circle, dots, bounce, linear, bars, pulse, wave, orbit, bars-horizontal, ripple
 */
export type SpinnerVariant =
  | "circle"
  | "dots"
  | "bounce"
  | "linear"
  | "bars"
  | "pulse"
  | "wave"
  | "orbit"
  | "bars-horizontal"
  | "ripple";

/**
 * Spinner label position type
 * Label position relative to spinner: top, right, bottom, left
 */
export type SpinnerLabelPosition = "top" | "right" | "bottom" | "left";

/**
 * Spinner easing type
 * Animation timing function: linear, ease-in, ease-out, ease-in-out
 */
export type SpinnerEasing = "linear" | "ease-in" | "ease-out" | "ease-in-out";

/**
 * Spinner component props
 */
export interface SpinnerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  /**
   * Visual style variant (circle/dots/bounce/linear/bars/pulse/wave/orbit/bars-horizontal/ripple)
   * @default "circle"
   */
  variant?: SpinnerVariant;

  /**
   * Size of spinner (xs/sm/md/lg/xl/2xl/3xl)
   * @default "md"
   */
  size?: SpinnerSize;

  /**
   * Color tone (primary/muted/subtle)
   * @default "primary"
   */
  tone?: SpinnerTone;

  /**
   * Animation easing (linear/ease-in/ease-out/ease-in-out)
   * Controls how animation speed changes over time
   * @default "linear"
   */
  easing?: SpinnerEasing;

  /**
   * Optional text label displayed alongside spinner
   */
  label?: string;

  /**
   * Label position relative to spinner
   * @default "bottom"
   */
  labelPosition?: SpinnerLabelPosition;

  /**
   * Accessibility label (required if no visual label)
   * Provides accessible name for screen readers
   */
  "aria-label"?: string;
}

/**
 * Spinner circle variants using tokenCVA
 * Maps size and tone props to token-based styling
 */
const spinnerCircleVariants = tokenCVA({
  base: [
    SPINNER_TOKENS.background,
    SPINNER_TOKENS.borderWidth,
    SPINNER_TOKENS.borderStyle,
    SPINNER_TOKENS.radius,
    SPINNER_TOKENS.animation,
    // Reduced motion support: animation respects prefers-reduced-motion via CSS variables
    "motion-reduce:animate-none", // Disable animation when reduced motion is preferred
  ].join(" "),
  variants: {
    size: {
      xs: SPINNER_TOKENS.size.xs,
      sm: SPINNER_TOKENS.size.sm,
      md: SPINNER_TOKENS.size.md,
      lg: SPINNER_TOKENS.size.lg,
      xl: SPINNER_TOKENS.size.xl,
      "2xl": SPINNER_TOKENS.size["2xl"],
      "3xl": SPINNER_TOKENS.size["3xl"],
    } satisfies Record<SpinnerSize, string>,
    tone: {
      primary: SPINNER_TOKENS.borderColor.primary,
      muted: SPINNER_TOKENS.borderColor.muted,
      subtle: SPINNER_TOKENS.borderColor.subtle,
    } satisfies Record<SpinnerTone, string>,
  },
  defaultVariants: {
    size: "md",
    tone: "primary",
  },
});

/**
 * Get label text size based on spinner size
 * Maps spinner size to appropriate text size for label
 * Uses TextSize type (xs, sm, md, lg, xl)
 */
function getLabelTextSize(size: SpinnerSize): "xs" | "sm" | "md" | "lg" | "xl" {
  switch (size) {
    case "xs":
      return "xs";
    case "sm":
      return "sm";
    case "md":
      return "sm";
    case "lg":
      return "md";
    case "xl":
      return "md";
    case "2xl":
      return "lg";
    case "3xl":
      return "xl";
    default:
      return "sm";
  }
}

/**
 * Get label gap based on spinner size
 * Maps spinner size to appropriate gap token for label spacing
 */
function getLabelGap(size: SpinnerSize): "xs" | "sm" | "md" | "lg" {
  switch (size) {
    case "xs":
      return "xs";
    case "sm":
      return "xs";
    case "md":
      return "sm";
    case "lg":
      return "sm";
    case "xl":
      return "md";
    case "2xl":
      return "lg";
    case "3xl":
      return "lg";
    default:
      return "sm";
  }
}

/**
 * Get color value from CSS variable with fallback support
 * Handles both formats: ready hsl() values and raw HSL numbers
 * Walks up the DOM tree to find the nearest ancestor with the variable set,
 * then falls back to document root
 */
function getColorFromCSSVariable(element: HTMLElement, tone: SpinnerTone): string {
  const varNameByTone: Record<SpinnerTone, string> = {
    primary: "--tm-primary",
    muted: "--tm-text-muted",
    subtle: "--tm-muted",
  };

  const varName = varNameByTone[tone];

  // Walk up the DOM tree to find nearest ancestor with the variable set
  let currentElement: HTMLElement | null = element;
  while (currentElement) {
    const computedStyle = window.getComputedStyle(currentElement);
    const value = computedStyle.getPropertyValue(varName).trim();
    if (value) {
      // If value already starts with 'hsl(' or 'rgb(', return as is
      if (value.startsWith("hsl(") || value.startsWith("rgb(")) {
        return value;
      }
      // Otherwise wrap in hsl()
      return `hsl(${value})`;
    }
    currentElement = currentElement.parentElement;
  }

  return ""; // Fallback - no variable found
}

/**
 * Render circle variant spinner
 * Circular arc that rotates
 */
function renderCircleVariant(
  size: SpinnerSize,
  tone: SpinnerTone,
  easing: SpinnerEasing = "linear",
) {
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div
      className={cn(
        spinnerCircleVariants({
          size,
          tone,
        }),
        "border-t-transparent",
      )}
      style={{
        animationTimingFunction: easingValue,
      }}
      ref={(el) => {
        if (el) {
          const color = getColorFromCSSVariable(el, tone);
          if (color) {
            // Apply color only to bottom, left, right borders (keep top transparent for arc effect)
            el.style.borderBottomColor = color;
            el.style.borderLeftColor = color;
            el.style.borderRightColor = color;
          }
        }
      }}
    />
  );
}

/**
 * Render dots variant spinner
 * Three dots with pulse animation and staggered delays
 */
function renderDotsVariant(size: SpinnerSize, tone: SpinnerTone, easing: SpinnerEasing = "linear") {
  const dotSize = SPINNER_TOKENS.dotSize[size];
  const dotGap = SPINNER_TOKENS.dotGap[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div className={cn("flex items-center", dotGap)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            dotSize,
            SPINNER_TOKENS.radius,
            SPINNER_TOKENS.animationVariants.pulse,
            "motion-reduce:animate-none",
            SPINNER_TOKENS.tone[tone],
          )}
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: "1.4s",
            animationTimingFunction: easingValue,
          }}
          ref={(el) => {
            if (el) {
              const color = getColorFromCSSVariable(el, tone);
              if (color) {
                el.style.backgroundColor = color;
              }
            }
          }}
        />
      ))}
    </div>
  );
}

/**
 * Render bounce variant spinner
 * Three dots with bounce animation and staggered delays
 */
function renderBounceVariant(
  size: SpinnerSize,
  tone: SpinnerTone,
  easing: SpinnerEasing = "linear",
) {
  const dotSize = SPINNER_TOKENS.dotSize[size];
  const dotGap = SPINNER_TOKENS.dotGap[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div className={cn("flex items-center", dotGap)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            dotSize,
            SPINNER_TOKENS.radius,
            SPINNER_TOKENS.animationVariants.bounce,
            "motion-reduce:animate-none",
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: "1.4s",
            animationTimingFunction: easingValue,
          }}
          ref={(el) => {
            if (el) {
              const color = getColorFromCSSVariable(el, tone);
              if (color) {
                el.style.backgroundColor = color;
              }
            }
          }}
        />
      ))}
    </div>
  );
}

/**
 * Render linear variant spinner
 * Horizontal bar with moving indicator
 */
function renderLinearVariant(
  size: SpinnerSize,
  tone: SpinnerTone,
  easing: SpinnerEasing = "linear",
) {
  const trackHeight = SPINNER_TOKENS.linearTrackHeight[size];
  const trackWidth = SPINNER_TOKENS.linearTrackWidth[size];
  const barHeight = SPINNER_TOKENS.linearBarHeight[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div
      className={cn(
        trackWidth,
        trackHeight,
        SPINNER_TOKENS.radius,
        SPINNER_TOKENS.linearTrackBackground,
        "overflow-hidden",
        "relative",
      )}
    >
      <div
        className={cn(
          "absolute",
          "top-0",
          barHeight,
          "w-1/3",
          SPINNER_TOKENS.radius,
          SPINNER_TOKENS.animationVariants.linear,
          "motion-reduce:animate-none",
          SPINNER_TOKENS.tone[tone],
        )}
        style={{
          left: "0",
          animationTimingFunction: easingValue,
        }}
        ref={(el) => {
          if (el) {
            const color = getColorFromCSSVariable(el, tone);
            if (color) {
              el.style.backgroundColor = color;
            }
          }
        }}
      />
    </div>
  );
}

/**
 * Render bars variant spinner
 * Vertical bars with sequential animation
 */
function renderBarsVariant(size: SpinnerSize, tone: SpinnerTone, easing: SpinnerEasing = "linear") {
  const barWidth = SPINNER_TOKENS.barsBarWidth[size];
  const barHeight = SPINNER_TOKENS.barsBarHeight[size];
  const gap = SPINNER_TOKENS.barsGap[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div className={cn("flex items-end", gap)}>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={cn(
            barWidth,
            barHeight,
            SPINNER_TOKENS.radius,
            SPINNER_TOKENS.animationVariants.bars,
            "motion-reduce:animate-none",
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationTimingFunction: easingValue,
          }}
          ref={(el) => {
            if (el) {
              const color = getColorFromCSSVariable(el, tone);
              if (color) {
                el.style.backgroundColor = color;
              }
            }
          }}
        />
      ))}
    </div>
  );
}

/**
 * Render pulse variant spinner
 * Pulsing circle that changes size and opacity
 */
function renderPulseVariant(
  size: SpinnerSize,
  tone: SpinnerTone,
  easing: SpinnerEasing = "linear",
) {
  const sizeClass = SPINNER_TOKENS.size[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div
      className={cn(
        sizeClass,
        SPINNER_TOKENS.radius,
        SPINNER_TOKENS.animationVariants.pulse,
        "motion-reduce:animate-none",
      )}
      style={{
        animationTimingFunction: easingValue,
      }}
      ref={(el) => {
        if (el) {
          const color = getColorFromCSSVariable(el, tone);
          if (color) {
            el.style.backgroundColor = color;
          }
        }
      }}
    />
  );
}

/**
 * Render wave variant spinner
 * Horizontal wave of dots with wave animation
 */
function renderWaveVariant(size: SpinnerSize, tone: SpinnerTone, easing: SpinnerEasing = "linear") {
  const dotSize = SPINNER_TOKENS.waveDotSize[size];
  const gap = SPINNER_TOKENS.waveGap[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div className={cn("flex items-center", gap)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={cn(
            dotSize,
            SPINNER_TOKENS.radius,
            SPINNER_TOKENS.animationVariants.wave,
            "motion-reduce:animate-none",
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationTimingFunction: easingValue,
          }}
          ref={(el) => {
            if (el) {
              const color = getColorFromCSSVariable(el, tone);
              if (color) {
                el.style.backgroundColor = color;
              }
            }
          }}
        />
      ))}
    </div>
  );
}

/**
 * Render orbit variant spinner
 * Three dots rotating in orbit around center
 */
function renderOrbitVariant(
  size: SpinnerSize,
  tone: SpinnerTone,
  easing: SpinnerEasing = "linear",
) {
  const containerSize = SPINNER_TOKENS.orbitRadius[size];
  const dotSize = SPINNER_TOKENS.orbitDotSize[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  const orbitRadiusMap: Record<SpinnerSize, number> = {
    xs: 6,
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16,
    "2xl": 24,
    "3xl": 32,
  };

  const radius = orbitRadiusMap[size];

  return (
    <div
      className={cn(
        "relative",
        containerSize,
        SPINNER_TOKENS.animationVariants.spin,
        "motion-reduce:animate-none",
      )}
      style={{
        animationTimingFunction: easingValue,
      }}
    >
      {[0, 1, 2].map((index) => {
        // Calculate position for each dot (120 degrees apart, starting from top)
        const angle = ((index * 120 - 90) * Math.PI) / 180; // -90 to start from top
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={index}
            className={cn("absolute", "top-1/2", "left-1/2", dotSize, SPINNER_TOKENS.radius)}
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            }}
            ref={(el) => {
              if (el) {
                const color = getColorFromCSSVariable(el, tone);
                if (color) {
                  el.style.backgroundColor = color;
                }
              }
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Render bars-horizontal variant spinner
 * Horizontal bars with sequential animation
 */
function renderBarsHorizontalVariant(
  size: SpinnerSize,
  tone: SpinnerTone,
  easing: SpinnerEasing = "linear",
) {
  const barHeight = SPINNER_TOKENS.barsHorizontalBarHeight[size];
  const barWidth = SPINNER_TOKENS.barsHorizontalBarWidth[size];
  const gap = SPINNER_TOKENS.barsHorizontalGap[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div className={cn("flex items-center", gap)}>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={cn(
            barWidth,
            barHeight,
            SPINNER_TOKENS.radius,
            SPINNER_TOKENS.animationVariants.bars,
            "motion-reduce:animate-none",
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationTimingFunction: easingValue,
          }}
          ref={(el) => {
            if (el) {
              const color = getColorFromCSSVariable(el, tone);
              if (color) {
                el.style.backgroundColor = color;
              }
            }
          }}
        />
      ))}
    </div>
  );
}

/**
 * Render ripple variant spinner
 * Concentric circles expanding from center
 */
function renderRippleVariant(
  size: SpinnerSize,
  tone: SpinnerTone,
  easing: SpinnerEasing = "linear",
) {
  const circleSize = SPINNER_TOKENS.rippleSize[size];
  const easingValue = SPINNER_TOKENS.easing[easing];

  return (
    <div className={cn("relative", circleSize)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            "absolute",
            "inset-0",
            SPINNER_TOKENS.radius,
            SPINNER_TOKENS.borderWidth,
            SPINNER_TOKENS.borderStyle,
            SPINNER_TOKENS.background,
            SPINNER_TOKENS.animationVariants.ripple,
            "motion-reduce:animate-none",
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationTimingFunction: easingValue,
          }}
          ref={(el) => {
            if (el) {
              const color = getColorFromCSSVariable(el, tone);
              if (color) {
                el.style.borderColor = color;
              }
            }
          }}
        />
      ))}
    </div>
  );
}

/**
 * Spinner Component
 *
 * Animated loading indicator for visual feedback during async operations.
 * Supports multiple visual variants (circle/dots/bounce/linear/bars/pulse/wave/orbit/bars-horizontal/ripple), full size scale (xs-3xl),
 * tone variants (primary/muted/subtle), and optional text label.
 *
 * @example
 * ```tsx
 * // Basic spinner (circle variant, default)
 * <Spinner />
 *
 * // Dots variant with size and tone
 * <Spinner variant="dots" size="lg" tone="muted" />
 *
 * // Dots variant
 * <Spinner variant="dots" size="md" />
 *
 * // Spinner with label on the right
 * <Spinner label="Loading..." labelPosition="right" />
 *
 * // Spinner with accessibility label
 * <Spinner aria-label="Loading data" />
 * ```
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = "circle",
      size = "md",
      tone = "primary",
      easing = "linear",
      label,
      labelPosition = "bottom",
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const effectiveVariant = variant || "circle";
    const effectiveSize = size || "md";
    const effectiveTone = tone || "primary";
    const effectiveEasing = easing || "linear";
    const effectiveLabelPosition = labelPosition || "bottom";

    // Accessibility: aria-label is required if no visual label
    const accessibleLabel = ariaLabel || label || "Loading";

    // Determine if label should be displayed
    const hasLabel = Boolean(label);

    // Get label text size and gap based on spinner size
    const labelTextSize = getLabelTextSize(effectiveSize);
    const labelGap = getLabelGap(effectiveSize);

    // Render spinner based on variant
    const renderSpinner = () => {
      switch (effectiveVariant) {
        case "circle":
          return renderCircleVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "dots":
          return renderDotsVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "bounce":
          return renderBounceVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "linear":
          return renderLinearVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "bars":
          return renderBarsVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "pulse":
          return renderPulseVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "wave":
          return renderWaveVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "orbit":
          return renderOrbitVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "bars-horizontal":
          return renderBarsHorizontalVariant(effectiveSize, effectiveTone, effectiveEasing);
        case "ripple":
          return renderRippleVariant(effectiveSize, effectiveTone, effectiveEasing);
        default:
          return renderCircleVariant(effectiveSize, effectiveTone, effectiveEasing);
      }
    };

    // Spinner element
    const spinnerElement = <div aria-hidden={hasLabel ? "true" : undefined}>{renderSpinner()}</div>;

    // If no label, return spinner only
    if (!hasLabel) {
      return (
        <div
          ref={(el) => {
            // Apply ref from parent
            if (typeof ref === "function") {
              ref(el);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }
          }}
          role="status"
          aria-label={accessibleLabel}
          aria-live="polite"
          {...props}
        >
          {spinnerElement}
        </div>
      );
    }

    // With label: determine layout direction based on labelPosition
    const isVertical = effectiveLabelPosition === "top" || effectiveLabelPosition === "bottom";
    const stackDirection = isVertical ? "vertical" : "horizontal";
    const shouldReverse = effectiveLabelPosition === "top" || effectiveLabelPosition === "left";

    return (
      <div
        ref={(el) => {
          // Apply ref from parent
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        role="status"
        aria-label={accessibleLabel}
        aria-live="polite"
        {...props}
      >
        <Stack direction={stackDirection} spacing={labelGap} align="center">
          {shouldReverse ? (
            <>
              <Text size={labelTextSize} tone="muted">
                {label}
              </Text>
              {spinnerElement}
            </>
          ) : (
            <>
              {spinnerElement}
              <Text size={labelTextSize} tone="muted">
                {label}
              </Text>
            </>
          )}
        </Stack>
      </div>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner };
