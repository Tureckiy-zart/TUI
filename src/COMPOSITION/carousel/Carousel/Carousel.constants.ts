/**
 * Carousel internal constants
 */

import type { CarouselOrientation } from "./Carousel.types";

export const CAROUSEL_DEFAULT_ORIENTATION: CarouselOrientation = "horizontal";
export const CAROUSEL_DEFAULT_LOOP = false;
export const CAROUSEL_DEFAULT_INDEX = 0;

/** Simple API default constants */
export const CAROUSEL_SIMPLE_DEFAULT_ORIENTATION: CarouselOrientation = "horizontal";
export const CAROUSEL_SIMPLE_DEFAULT_CONTROLS = "inside" as const;
export const CAROUSEL_SIMPLE_DEFAULT_INDICATORS = "bottom" as const;
export const CAROUSEL_SIMPLE_DEFAULT_LOOP = false;
export const CAROUSEL_SIMPLE_DEFAULT_AUTOPLAY = false;
export const CAROUSEL_SIMPLE_DEFAULT_AUTOPLAY_DELAY = 5000;
