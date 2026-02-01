"use client";

/**
 * -----------------------------------------------------------------------------
 * CAROUSEL INDICATORS — SECONDARY NAVIGATION SURFACE
 * -----------------------------------------------------------------------------
 *
 * Role:
 * - Secondary navigation (tablist); rendered outside Track, never overlays content.
 *
 * Status:
 * - LOCKED together with Carousel.
 * -----------------------------------------------------------------------------
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { useCarouselContext } from "./Carousel.context";
import { CAROUSEL_TOKENS } from "./carousel.tokens";
import type { CarouselIndicatorsProps } from "./Carousel.types";

/** Dot indicators; each dot is a button with aria-label "Slide N" */
export const CarouselIndicators = React.forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  ({ placement = "bottom", ...props }, ref) => {
    const { index, setIndex, totalSlides, showIndicators } = useCarouselContext();

    if (!showIndicators || totalSlides <= 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          CAROUSEL_TOKENS.indicators.gap,
          "flex items-center justify-center",
          CAROUSEL_TOKENS.indicators.placement[placement],
        )}
        data-carousel-indicators
        role="tablist"
        aria-label="Slide navigation"
        {...props}
      >
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`Slide ${i + 1}`}
            aria-selected={index === i}
            tabIndex={index === i ? 0 : -1}
            className={cn(
              CAROUSEL_TOKENS.indicator.base,
              CAROUSEL_TOKENS.indicator.size,
              index === i ? CAROUSEL_TOKENS.indicator.active : CAROUSEL_TOKENS.indicator.inactive,
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    );
  },
);
CarouselIndicators.displayName = "CarouselIndicators";
