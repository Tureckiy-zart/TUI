"use client";

/**
 * InverseTypography — Extension capability for inverse text context at composition level.
 *
 * Semantic context only: declares "inverse text context" for descendants.
 * No color overrides or token application in this capability; consumers use
 * Text/Heading with color="inverse" per TYPOGRAPHY_COLOR_POLICY_v1.
 *
 * @see docs/architecture/extension/INVERSE_TYPOGRAPHY_CANON.md
 */

import * as React from "react";

import { guardNesting } from "./InverseTypography.guard";
import type { InverseTypographyRootProps } from "./InverseTypography.types";

/** Context: true when an InverseTypography.Root is an ancestor (nesting guard + consumer hint). Not exported from index. */
export const InverseTypographyContext = React.createContext<boolean>(false);

const InverseTypographyRoot = (props: InverseTypographyRootProps): React.ReactNode => {
  const { children } = props;
  const hasAncestorRoot = React.useContext(InverseTypographyContext);
  guardNesting(hasAncestorRoot);

  return (
    <InverseTypographyContext.Provider value={true}>{children}</InverseTypographyContext.Provider>
  );
};
InverseTypographyRoot.displayName = "InverseTypography.Root";

export const InverseTypography = {
  Root: InverseTypographyRoot,
};
