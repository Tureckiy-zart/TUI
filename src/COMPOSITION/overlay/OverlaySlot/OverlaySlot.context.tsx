"use client";

import * as React from "react";

export interface OverlaySlotContextValue {
  /** Register Anchor; returns false if an Anchor was already registered (enforce single Anchor) */
  registerAnchor: () => boolean;
  /** Unregister Anchor on unmount */
  unregisterAnchor: () => void;
}

const OverlaySlotContext = React.createContext<OverlaySlotContextValue | null>(null);

export function useOverlaySlotContext(): OverlaySlotContextValue {
  const ctx = React.useContext(OverlaySlotContext);
  if (!ctx) {
    throw new Error("OverlaySlot compound components must be used within OverlaySlot.Root");
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
