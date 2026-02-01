"use client";

import * as React from "react";

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

export function useHeroMediaContext(): HeroMediaContextValue {
  const ctx = React.useContext(HeroMediaContext);
  if (!ctx) {
    throw new Error("HeroMedia compound components must be used within HeroMedia.Root");
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
