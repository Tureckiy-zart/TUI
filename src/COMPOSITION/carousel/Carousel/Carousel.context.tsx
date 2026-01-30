"use client";

import * as React from "react";

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

export function useCarouselContext(): CarouselContextValue {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error("Carousel compound components must be used within Carousel.Root");
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
