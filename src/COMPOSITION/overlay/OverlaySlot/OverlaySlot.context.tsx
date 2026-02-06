"use client";

import * as React from "react";

import { safeFallback } from "@/COMPOSITION/utils/runtime-guards";
export interface OverlaySlotContextValue {
  /** Register Anchor; returns false if an Anchor was already registered (enforce single Anchor) */
  registerAnchor: () => boolean;
  /** Unregister Anchor on unmount */
  unregisterAnchor: () => void;
}

const OverlaySlotContext = React.createContext<OverlaySlotContextValue | null>(null);
const OVERLAY_SLOT_FALLBACK: OverlaySlotContextValue = {
  registerAnchor: () => false,
  unregisterAnchor: () => {},
};

export function useOverlaySlotContext(): OverlaySlotContextValue {
  const ctx = React.useContext(OverlaySlotContext);
  if (!ctx) {
    return safeFallback(
      OVERLAY_SLOT_FALLBACK,
      "OverlaySlot compound components must be used within OverlaySlot.Root",
    );
  }
  return ctx;
}

export function OverlaySlotProvider({
  value,
  children,
}: {
  value: OverlaySlotContextValue;
  children: React.ReactNode;
}): React.ReactElement {
  return <OverlaySlotContext.Provider value={value}>{children}</OverlaySlotContext.Provider>;
}
