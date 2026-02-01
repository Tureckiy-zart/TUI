"use client";

/**
 * SurfaceElevation — Extension capability for elevated surface context at composition level.
 *
 * Semantic context only: declares elevation level for descendants. No CSS, box-shadow,
 * or styles rendered by this component; consumers use existing elevation tokens
 * (e.g. pass level as shadow prop to Card/Box) per ELEVATION_AUTHORITY.
 *
 * @see docs/architecture/extension/SURFACE_ELEVATION_CANON.md
 */

import * as React from "react";

import { guardNesting } from "./SurfaceElevation.guard";
import type { SurfaceElevationLevel, SurfaceElevationRootProps } from "./SurfaceElevation.types";

/** Context value: elevation level when inside Root, null outside. Not exported from index. */
export const SurfaceElevationContext = React.createContext<SurfaceElevationLevel | null>(null);

const SurfaceElevationRoot = (props: SurfaceElevationRootProps): React.ReactNode => {
  const { elevation, children } = props;
  const ancestorLevel = React.useContext(SurfaceElevationContext);
  guardNesting(ancestorLevel !== null);

  const value = React.useMemo(() => elevation, [elevation]);

  return (
    <SurfaceElevationContext.Provider value={value}>{children}</SurfaceElevationContext.Provider>
  );
};
SurfaceElevationRoot.displayName = "SurfaceElevation.Root";

/** Returns current elevation level when inside SurfaceElevation.Root, null otherwise. */
export function useSurfaceElevation(): SurfaceElevationLevel | null {
  return React.useContext(SurfaceElevationContext);
}

export const SurfaceElevation = {
  Root: SurfaceElevationRoot,
};
