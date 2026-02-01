"use client";

/**
 * ResponsiveVisibility — Extension capability for show/hide by breakpoint.
 *
 * Compound: Root, From, Below, Only. Non-matching slots do not render.
 * SSR: render nothing until mount; after hydration render matching slot only.
 *
 * @see docs/architecture/extension/RESPONSIVE_VISIBILITY_CANON.md
 */

import * as React from "react";

import type { Breakpoint } from "@/types/responsive";

import {
  getMinWidthPx,
  getNextBreakpoint,
  isBreakpointGte,
  isBreakpointLt,
  minWidthQuery,
} from "./ResponsiveVisibility.constants";
import { guardNesting, guardSlotBp } from "./ResponsiveVisibility.guard";
import type {
  ResponsiveVisibilityBelowProps,
  ResponsiveVisibilityFromProps,
  ResponsiveVisibilityOnlyProps,
  ResponsiveVisibilityRootProps,
} from "./ResponsiveVisibility.types";

/** Context: true when a ResponsiveVisibility.Root is an ancestor (nesting guard). */
const ResponsiveVisibilityRootContext = React.createContext<boolean>(false);

/** Returns current viewport breakpoint (largest min-width that matches). Base when none match. */
function useViewportBreakpoint(): Breakpoint {
  const [current, setCurrent] = React.useState<Breakpoint>("base");

  React.useEffect(() => {
    const order: Breakpoint[] = ["2xl", "xl", "lg", "md", "sm"];
    const check = () => {
      for (const bp of order) {
        const minPx = getMinWidthPx(bp);
        if (typeof window !== "undefined" && window.matchMedia(minWidthQuery(minPx)).matches) {
          setCurrent(bp);
          return;
        }
      }
      setCurrent("base");
    };

    check();
    const mqlList = order.map((bp) => {
      const minPx = getMinWidthPx(bp);
      const mql = window.matchMedia(minWidthQuery(minPx));
      mql.addEventListener("change", check);
      return mql;
    });
    return () => {
      mqlList.forEach((mql) => mql.removeEventListener("change", check));
    };
  }, []);

  return current;
}

function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

/** Slot marker: visible when viewport >= bp. Renders nothing; Root renders matching slot's children. */
const ResponsiveVisibilityFrom = (_props: ResponsiveVisibilityFromProps): null => null;
ResponsiveVisibilityFrom.displayName = "ResponsiveVisibility.From";

/** Slot marker: visible when viewport < bp. Renders nothing; Root renders matching slot's children. */
const ResponsiveVisibilityBelow = (_props: ResponsiveVisibilityBelowProps): null => null;
ResponsiveVisibilityBelow.displayName = "ResponsiveVisibility.Below";

/** Slot marker: visible when viewport in [bp, nextBp); Only(2xl) = From(2xl). Renders nothing; Root renders matching slot's children. */
const ResponsiveVisibilityOnly = (_props: ResponsiveVisibilityOnlyProps): null => null;
ResponsiveVisibilityOnly.displayName = "ResponsiveVisibility.Only";

const ResponsiveVisibilityRoot = (props: ResponsiveVisibilityRootProps): React.ReactNode => {
  const { children } = props;
  const hasAncestorRoot = React.useContext(ResponsiveVisibilityRootContext);
  guardNesting(hasAncestorRoot);

  const mounted = useMounted();
  const currentBp = useViewportBreakpoint();

  if (!mounted) return null;

  const childArray = React.Children.toArray(children);
  for (const child of childArray) {
    if (!React.isValidElement(child)) continue;

    if (child.type === ResponsiveVisibilityFrom) {
      const { bp, children: slotChildren } = child.props as ResponsiveVisibilityFromProps;
      const bpRaw = (child.props as { bp?: string }).bp;
      if (bpRaw === "base") {
        guardSlotBp("base");
        continue;
      }
      if (isBreakpointGte(currentBp, bp)) {
        return (
          <ResponsiveVisibilityRootContext.Provider value={true}>
            {slotChildren}
          </ResponsiveVisibilityRootContext.Provider>
        );
      }
    }
    if (child.type === ResponsiveVisibilityBelow) {
      const { bp, children: slotChildren } = child.props as ResponsiveVisibilityBelowProps;
      const bpRaw = (child.props as { bp?: string }).bp;
      if (bpRaw === "base") {
        guardSlotBp("base");
        continue;
      }
      if (isBreakpointLt(currentBp, bp)) {
        return (
          <ResponsiveVisibilityRootContext.Provider value={true}>
            {slotChildren}
          </ResponsiveVisibilityRootContext.Provider>
        );
      }
    }
    if (child.type === ResponsiveVisibilityOnly) {
      const { bp, children: slotChildren } = child.props as ResponsiveVisibilityOnlyProps;
      const bpRaw = (child.props as { bp?: string }).bp;
      if (bpRaw === "base") {
        guardSlotBp("base");
        continue;
      }
      const nextBp = getNextBreakpoint(bp);
      const inRange =
        isBreakpointGte(currentBp, bp) && (nextBp === null || isBreakpointLt(currentBp, nextBp));
      if (inRange) {
        return (
          <ResponsiveVisibilityRootContext.Provider value={true}>
            {slotChildren}
          </ResponsiveVisibilityRootContext.Provider>
        );
      }
    }
  }

  return null;
};
ResponsiveVisibilityRoot.displayName = "ResponsiveVisibility.Root";

export const ResponsiveVisibility = {
  Root: ResponsiveVisibilityRoot,
  From: ResponsiveVisibilityFrom,
  Below: ResponsiveVisibilityBelow,
  Only: ResponsiveVisibilityOnly,
};
