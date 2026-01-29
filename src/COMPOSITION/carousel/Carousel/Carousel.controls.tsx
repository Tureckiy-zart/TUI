"use client";

/**
 * -----------------------------------------------------------------------------
 * CAROUSEL CONTROLS — INTERNAL OVERLAY ELEMENTS
 * -----------------------------------------------------------------------------
 *
 * Role:
 * - Carousel.Prev and Carousel.Next are navigation controls bound to Track.
 * - They are NOT layout elements and MUST NOT affect geometry.
 *
 * Placement Rules:
 * - Placement is derived exclusively from Carousel orientation:
 *
 *   Horizontal:
 *   - Prev: left-center
 *   - Next: right-center
 *
 *   Vertical:
 *   - Prev: top-center
 *   - Next: bottom-center
 *
 * Constraints:
 * - Controls MUST be positioned relative to Carousel.Track.
 * - No external wrappers (e.g., Carousel.Controls) are allowed.
 * - No consumer-configurable placement props.
 *
 * Interaction Authority:
 * - Controls must follow Interaction Authority Contract.
 * - Disabled / loading states must block interaction.
 * - Visual state MUST NOT affect pointer-events.
 *
 * Status:
 * - LOCKED together with Carousel.
 * -----------------------------------------------------------------------------
 */

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import * as React from "react";

import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { Button } from "@/PRIMITIVES/Button/Button";

import { useCarouselContext } from "./Carousel.context";
import { CAROUSEL_TOKENS } from "./carousel.tokens";
import type { CarouselNextProps, CarouselPrevProps } from "./Carousel.types";
import { getNextIndex, getPrevIndex } from "./Carousel.utils";

/** Vertical orientation: Prev at top-center, Next at bottom-center */
const VERTICAL_PREV_CLASSES = "pointer-events-auto absolute top-sm left-1/2 -translate-x-1/2";
const VERTICAL_NEXT_CLASSES = "pointer-events-auto absolute bottom-sm left-1/2 -translate-x-1/2";

/** Previous slide button — Foundation Button, aria-label required for a11y */
export const CarouselPrev = React.forwardRef<HTMLButtonElement, CarouselPrevProps>(
  ({ children, ...props }, ref) => {
    const { index, setIndex, totalSlides, loop, orientation } = useCarouselContext();
    const prevIndex = getPrevIndex(index, totalSlides, loop);
    const atStart = prevIndex === index;
    const prevClasses =
      orientation === "vertical" ? VERTICAL_PREV_CLASSES : CAROUSEL_TOKENS.controls.prev;

    return (
      <span className={prevClasses}>
        <Button
          ref={ref}
          type="button"
          variant="secondary"
          size="md"
          aria-label="Previous slide"
          disabled={atStart}
          onClick={() => setIndex(prevIndex)}
          {...props}
        >
          {children ?? (
            <span className={ICON_TOKENS.sizes.md} aria-hidden>
              {orientation === "vertical" ? <ChevronUp /> : <ChevronLeft />}
            </span>
          )}
        </Button>
      </span>
    );
  },
);
CarouselPrev.displayName = "CarouselPrev";

/** Next slide button — Foundation Button */
export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ children, ...props }, ref) => {
    const { index, setIndex, totalSlides, loop, orientation } = useCarouselContext();
    const nextIndex = getNextIndex(index, totalSlides, loop);
    const atEnd = nextIndex === index;
    const nextClasses =
      orientation === "vertical" ? VERTICAL_NEXT_CLASSES : CAROUSEL_TOKENS.controls.next;

    return (
      <span className={nextClasses}>
        <Button
          ref={ref}
          type="button"
          variant="secondary"
          size="md"
          aria-label="Next slide"
          disabled={atEnd}
          onClick={() => setIndex(nextIndex)}
          {...props}
        >
          {children ?? (
            <span className={ICON_TOKENS.sizes.md} aria-hidden>
              {orientation === "vertical" ? <ChevronDown /> : <ChevronRight />}
            </span>
          )}
        </Button>
      </span>
    );
  },
);
CarouselNext.displayName = "CarouselNext";
