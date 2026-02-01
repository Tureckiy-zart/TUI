/**
 * InverseTypography — public prop types.
 * Minimal API per CANON: Root with children only.
 */

import type { ReactNode } from "react";

/** Root wrapper; declares inverse text context for descendants. */
export interface InverseTypographyRootProps {
  children?: ReactNode;
}
