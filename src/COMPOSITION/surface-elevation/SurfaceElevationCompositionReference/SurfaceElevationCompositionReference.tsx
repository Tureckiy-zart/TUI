"use client";

/**
 * SurfaceElevationCompositionReference — Etalon composition for SurfaceElevation at composition level.
 *
 * Wraps content with SurfaceElevation.Root and renders Card with shadow from context,
 * so the visual elevation effect is visible via existing tokens. No new tokens or styles
 * in SurfaceElevation; effect appears only because Card already supports shadow prop.
 *
 * Reference: docs/architecture/extension/SURFACE_ELEVATION_CANON.md
 */

import * as React from "react";

import { Card } from "@/COMPOSITION/layout";

import { SurfaceElevation, useSurfaceElevation } from "../SurfaceElevation";
import type { SurfaceElevationLevel } from "../SurfaceElevation/SurfaceElevation.types";

export interface SurfaceElevationCompositionReferenceProps {
  /** Elevation level for this block (existing token scale). */
  elevation?: SurfaceElevationLevel;
  /** Content rendered inside elevated Card. */
  children?: React.ReactNode;
}

const DEFAULT_ELEVATION: SurfaceElevationLevel = "md";

/**
 * NOTE: Visual elevation effect in this composition comes from <Card />,
 * which consumes elevation tokens from ELEVATION_AUTHORITY via its shadow prop.
 * SurfaceElevation itself does NOT render any styles.
 */
/**
 * Inner card that consumes elevation context and applies shadow via existing Card API.
 */
function ElevatedCard({ children }: { children?: React.ReactNode }) {
  const level = useSurfaceElevation();
  const shadow = level ?? DEFAULT_ELEVATION;
  return <Card shadow={shadow}>{children}</Card>;
}

/**
 * Etalon composition: SurfaceElevation.Root + Card with shadow from useSurfaceElevation().
 */
export const SurfaceElevationCompositionReference: React.FC<
  SurfaceElevationCompositionReferenceProps
> = ({ elevation = DEFAULT_ELEVATION, children }) => {
  return (
    <SurfaceElevation.Root elevation={elevation}>
      <ElevatedCard>{children}</ElevatedCard>
    </SurfaceElevation.Root>
  );
};

SurfaceElevationCompositionReference.displayName = "SurfaceElevationCompositionReference";
