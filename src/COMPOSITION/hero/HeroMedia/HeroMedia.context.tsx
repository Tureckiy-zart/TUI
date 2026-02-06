"use client";

import * as React from "react";

import { safeFallback } from "@/COMPOSITION/utils/runtime-guards";

import type { HeroMediaAspect, HeroMediaSize, HeroMediaType } from "./HeroMedia.constants";

export interface HeroMediaContextValue {
  aspect: HeroMediaAspect;
  size: HeroMediaSize;
  /** Safe-zone padding token for overlay (sm/md/lg map to spacing tokens) */
  safeZoneSize: HeroMediaSize;
  /** Register Media; returns false if a Media was already registered (enforce single Media) */
  registerMedia: (type: HeroMediaType) => boolean;
  /** Unregister Media on unmount */
  unregisterMedia: () => void;
}

const HeroMediaContext = React.createContext<HeroMediaContextValue | null>(null);
const HERO_MEDIA_FALLBACK: HeroMediaContextValue = {
  aspect: "auto",
  size: "md",
  safeZoneSize: "md",
  registerMedia: () => false,
  unregisterMedia: () => {},
};

export function useHeroMediaContext(): HeroMediaContextValue {
  const ctx = React.useContext(HeroMediaContext);
  if (!ctx) {
    return safeFallback(
      HERO_MEDIA_FALLBACK,
      "HeroMedia compound components must be used within HeroMedia.Root",
    );
  }
  return ctx;
}

export function HeroMediaProvider({
  value,
  children,
}: {
  value: HeroMediaContextValue;
  children: React.ReactNode;
}): React.ReactElement {
  return <HeroMediaContext.Provider value={value}>{children}</HeroMediaContext.Provider>;
}
