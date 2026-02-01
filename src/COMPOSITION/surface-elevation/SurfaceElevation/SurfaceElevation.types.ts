/**
 * SurfaceElevation — public prop types.
 * Elevation level restricted to existing ELEVATION_AUTHORITY shadow scale.
 */

import type { ReactNode } from "react";

/** Elevation level: scale matches ELEVATION_AUTHORITY (no new tokens). Extension does not import Foundation. */
export type SurfaceElevationLevel = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Root props: required elevation level, children. Root does not render styles. */
export interface SurfaceElevationRootProps {
  /** Elevation level from existing token scale (ELEVATION_AUTHORITY). */
  elevation: SurfaceElevationLevel;
  children?: ReactNode;
}
