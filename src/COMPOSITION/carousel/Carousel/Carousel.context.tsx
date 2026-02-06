"use client";

import * as React from "react";

import { safeFallback } from "@/COMPOSITION/utils/runtime-guards";

import type { CarouselOrientation } from "./Carousel.types";

export interface CarouselContextValue {
  index: number;
  setIndex: (index: number) => void;
  totalSlides: number;
  setTotalSlides: (n: number) => void;
  orientation: CarouselOrientation;
  loop: boolean;
  showControls: boolean;
  showIndicators: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);
const CAROUSEL_FALLBACK: CarouselContextValue = {
  index: 0,
  setIndex: () => {},
  totalSlides: 0,
  setTotalSlides: () => {},
  orientation: "horizontal",
  loop: false,
  showControls: false,
  showIndicators: false,
};

export function useCarouselContext(): CarouselContextValue {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    return safeFallback(
      CAROUSEL_FALLBACK,
      "Carousel compound components must be used within Carousel.Root",
    );
  }
  return ctx;
}

export function CarouselProvider({
  value,
  children,
}: {
  value: CarouselContextValue;
  children: React.ReactNode;
}): React.ReactElement {
  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>;
}
