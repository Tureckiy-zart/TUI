"use client";

/**
 * -----------------------------------------------------------------------------
 * CAROUSEL — EXTENSION CAPABILITY (LOCKED)
 * -----------------------------------------------------------------------------
 *
 * Architectural Role:
 * - Carousel is a base Extension-level capability providing spatial navigation
 *   over a sequence of content slides.
 * - It is NOT a layout system, NOT a styling surface, and NOT a product widget.
 *
 * Responsibility Split:
 * - Carousel.Root:
 *   - Owns public API, state orchestration, accessibility, and orientation.
 *   - Provides context for all subcomponents.
 *
 * - Carousel.Track:
 *   - Sole spatial anchor for slides and controls.
 *   - Owns geometry, overflow masking, and transform space.
 *
 * - Carousel.Slide:
 *   - Represents a single navigable unit.
 *   - Carousel logic assumes Slide boundaries are explicit.
 *
 * - Carousel.Prev / Carousel.Next:
 *   - Navigation controls rendered as overlays relative to Track.
 *   - Placement is derived exclusively from orientation.
 *
 * - Carousel.Indicators:
 *   - Secondary navigation surface.
 *   - Rendered outside Track, never overlays content.
 *
 * Orientation Contract:
 * - orientation="horizontal":
 *   - Navigation axis: X
 *   - Prev / Next placement: left / right (centered)
 *
 * - orientation="vertical":
 *   - Navigation axis: Y
 *   - Prev / Next placement: top / bottom (centered)
 *
 * Architectural Invariants:
 * - Track is mandatory and MUST NOT be removed or inlined into Root.
 * - Controls placement MUST be derived from orientation only.
 * - No manual positioning props are allowed.
 * - No className / style overrides on Root or Track.
 *
 * Status:
 * - LOCKED (Phase L)
 * - Changes allowed ONLY via new Extension phase.
 *
 * @see docs/architecture/extension/EXTENSION_CAPABILITY_MAP.md
 * @see docs/architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md
 * -----------------------------------------------------------------------------
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import {
  CAROUSEL_DEFAULT_INDEX,
  CAROUSEL_DEFAULT_LOOP,
  CAROUSEL_DEFAULT_ORIENTATION,
} from "./Carousel.constants";
import { CarouselProvider, useCarouselContext } from "./Carousel.context";
import { CarouselNext, CarouselPrev } from "./Carousel.controls";
import { CarouselIndicators } from "./Carousel.indicators";
import { CAROUSEL_TOKENS } from "./carousel.tokens";
import type { CarouselRootProps, CarouselSlideProps, CarouselTrackProps } from "./Carousel.types";
import { getNextIndex, getPrevIndex } from "./Carousel.utils";

export { CarouselNext, CarouselPrev } from "./Carousel.controls";
export { CarouselIndicators } from "./Carousel.indicators";

// ---------------------------------------------------------------------------
// CarouselRoot
// ---------------------------------------------------------------------------

const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselRootProps>(
  (
    {
      index: controlledIndex,
      defaultIndex = CAROUSEL_DEFAULT_INDEX,
      onIndexChange,
      orientation = CAROUSEL_DEFAULT_ORIENTATION,
      loop = CAROUSEL_DEFAULT_LOOP,
      controls = true,
      indicators = true,
      children,
      "aria-label": ariaLabel,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledIndex, setUncontrolled] = React.useState(defaultIndex);
    const [totalSlides, setTotalSlides] = React.useState(0);

    const isControlled = controlledIndex !== undefined;
    const index = isControlled ? controlledIndex! : uncontrolledIndex;

    const setIndex = React.useCallback(
      (next: number) => {
        if (!isControlled) setUncontrolled(next);
        onIndexChange?.(next);
      },
      [isControlled, onIndexChange],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        const horizontal = orientation === "horizontal";
        const isPrev =
          (horizontal && e.key === "ArrowLeft") || (!horizontal && e.key === "ArrowUp");
        const isNext =
          (horizontal && e.key === "ArrowRight") || (!horizontal && e.key === "ArrowDown");
        if (isPrev) {
          e.preventDefault();
          setIndex(getPrevIndex(index, totalSlides, loop));
        } else if (isNext) {
          e.preventDefault();
          setIndex(getNextIndex(index, totalSlides, loop));
        }
      },
      [index, totalSlides, loop, orientation, setIndex, onKeyDown],
    );

    const contextValue = React.useMemo(
      () => ({
        index,
        setIndex,
        totalSlides,
        setTotalSlides,
        orientation,
        loop,
        showControls: controls,
        showIndicators: indicators,
      }),
      [index, setIndex, totalSlides, orientation, loop, controls, indicators],
    );

    return (
      <CarouselProvider value={contextValue}>
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          aria-live="polite"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          data-carousel-root
          {...props}
        >
          {children}
        </div>
      </CarouselProvider>
    );
  },
);
CarouselRoot.displayName = "CarouselRoot";

// ---------------------------------------------------------------------------
// CarouselSlide
// ---------------------------------------------------------------------------

const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          CAROUSEL_TOKENS.slide.minWidth,
          CAROUSEL_TOKENS.slide.minHeight,
          CAROUSEL_TOKENS.slide.flexShrink,
        )}
        data-carousel-slide
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselSlide.displayName = "CarouselSlide";

// ---------------------------------------------------------------------------
// CarouselTrack
// ---------------------------------------------------------------------------

const CarouselTrack = React.forwardRef<HTMLDivElement, CarouselTrackProps>(
  ({ children, ...props }, ref) => {
    const { index, orientation, setTotalSlides, showControls } = useCarouselContext();

    const childArray = React.Children.toArray(children);
    const slides: React.ReactNode[] = [];
    let prev: React.ReactNode = null;
    let next: React.ReactNode = null;
    childArray.forEach((child) => {
      if (!React.isValidElement(child)) return;
      const el = child as React.ReactElement;
      if (el.type === CarouselSlide) slides.push(child);
      else if (el.type === CarouselPrev && !prev) prev = child;
      else if (el.type === CarouselNext && !next) next = child;
    });

    React.useEffect(() => {
      setTotalSlides(slides.length);
    }, [slides.length, setTotalSlides]);

    const isHorizontal = orientation === "horizontal";
    const hasControls = showControls && (prev !== null || next !== null);

    return (
      <div
        ref={ref}
        className={cn(
          CAROUSEL_TOKENS.track.position,
          CAROUSEL_TOKENS.track.overflow,
          isHorizontal
            ? CAROUSEL_TOKENS.track.flexDirection.horizontal
            : CAROUSEL_TOKENS.track.flexDirection.vertical,
        )}
        data-carousel-track
        {...props}
      >
        <div
          className={cn(isHorizontal ? "flex w-full" : "flex h-full w-full flex-col")}
          style={
            isHorizontal
              ? { transform: `translateX(-${index * 100}%)` }
              : { transform: `translateY(-${index * 100}%)` }
          }
        >
          {slides}
        </div>
        {hasControls && (
          <div className={CAROUSEL_TOKENS.controls.overlay} data-carousel-controls>
            {prev}
            {next}
          </div>
        )}
      </div>
    );
  },
);
CarouselTrack.displayName = "CarouselTrack";

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export type {
  CarouselIndicatorsProps,
  CarouselNextProps,
  CarouselOrientation,
  CarouselPrevProps,
  CarouselRootProps,
  CarouselSlideProps,
  CarouselTrackProps,
} from "./Carousel.types";

export const Carousel = {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Prev: CarouselPrev,
  Next: CarouselNext,
  Indicators: CarouselIndicators,
};
