"use client";

/**
 * AppHeader — Canonical Header Composition
 *
 * Unified header pattern composing StickyBar (layout/position), Navbar (content/structure),
 * and SurfaceElevation (depth) into a single rigorous API.
 *
 * @enforcement APPHEADER_COMPOSITION_CANON
 */

import * as React from "react";

import { Box } from "@/COMPOSITION/layout/Box/Box";
import { Divider } from "@/COMPOSITION/layout/Divider/Divider";
import { Navbar } from "@/COMPOSITION/layout/Navbar/Navbar";
import { StickyBar, type StickyBarTone } from "@/COMPOSITION/layout/StickyBar/StickyBar";
import { SurfaceElevation } from "@/COMPOSITION/surface-elevation/SurfaceElevation/SurfaceElevation";
import { devWarnOnce, isDev } from "@/COMPOSITION/utils/runtime-guards";

// ----------------------------------------------------------------------------
// Slot Sub-components
// ----------------------------------------------------------------------------

export interface AppHeaderBrandProps {
  children: React.ReactNode;
}
const AppHeaderBrand = ({ children }: AppHeaderBrandProps) => <>{children}</>;
AppHeaderBrand.displayName = "AppHeader.Brand";

export interface AppHeaderNavProps {
  children: React.ReactNode;
}
const AppHeaderNav = ({ children }: AppHeaderNavProps) => <>{children}</>;
AppHeaderNav.displayName = "AppHeader.Nav";

export interface AppHeaderActionsProps {
  children: React.ReactNode;
}
const AppHeaderActions = ({ children }: AppHeaderActionsProps) => <>{children}</>;
AppHeaderActions.displayName = "AppHeader.Actions";

// ----------------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------------

export type AppHeaderPosition = "static" | "sticky";
export type AppHeaderElevation = "none" | "auto";
export type AppHeaderDivider = "none" | "auto" | "always";
export type AppHeaderAppearance = "solid" | "solid-to-glass";

export interface AppHeaderProps {
  /**
   * Positioning behavior.
   * - `static`: Normal flow.
   * - `sticky`: Sticks to top of viewport.
   * @default "static"
   */
  position?: AppHeaderPosition;

  /**
   * Elevation shadow behavior.
   * - `none`: No shadow.
   * - `auto`: Shadow appears when scrolled.
   * @default "none"
   */
  elevation?: AppHeaderElevation;

  /**
   * Divider (border-bottom) behavior.
   * - `none`: No divider.
   * - `auto`: Divider appears when scrolled.
   * - `always`: Always visible.
   * @default "none"
   */
  divider?: AppHeaderDivider;

  /**
   * Appearance behavior.
   * - `solid`: Opaque surface in all states.
   * - `solid-to-glass`: Solid at rest, glass-like surface on scroll.
   * @default "solid"
   */
  appearance?: AppHeaderAppearance;

  /**
   * Slot Children: Must be strictly `AppHeader.Brand`, `AppHeader.Nav`, or `AppHeader.Actions`.
   */
  children: React.ReactNode;
}

/**
 * AppHeader Composition
 */
type AppHeaderComponent = ((props: AppHeaderProps) => React.ReactElement) & {
  Brand: (props: AppHeaderBrandProps) => React.ReactElement;
  Nav: (props: AppHeaderNavProps) => React.ReactElement;
  Actions: (props: AppHeaderActionsProps) => React.ReactElement;
  displayName?: string;
};

export const AppHeader: AppHeaderComponent = ({
  position = "static",
  elevation = "none",
  divider = "none",
  appearance = "solid",
  children,
}: AppHeaderProps) => {
  if (
    isDev() &&
    position === "static" &&
    (elevation === "auto" || divider === "auto" || appearance === "solid-to-glass")
  ) {
    devWarnOnce(
      "AppHeader:sticky-required",
      "[AppHeader] 'auto' elevation/divider and 'solid-to-glass' appearance require position='sticky' to react to scroll.",
    );
  }
  // --------------------------------------------------------------------------
  // Scroll Logic (for auto elevation/divider)
  // --------------------------------------------------------------------------
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const shouldTrackScroll =
      position === "sticky" &&
      (elevation === "auto" || divider === "auto" || appearance === "solid-to-glass");
    if (!shouldTrackScroll) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check initial
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [appearance, divider, elevation, position]);

  // --------------------------------------------------------------------------
  // Derived State
  // --------------------------------------------------------------------------
  const showElevation = elevation === "auto" && isScrolled;
  const showDivider = divider === "always" || (divider === "auto" && isScrolled);
  const showGlass = appearance === "solid-to-glass" && isScrolled;

  // --------------------------------------------------------------------------
  // Slot Extraction
  // --------------------------------------------------------------------------
  let brandNode: React.ReactNode = null;
  let navNode: React.ReactNode = null;
  let actionsNode: React.ReactNode = null;
  let brandCount = 0;
  let navCount = 0;
  let actionsCount = 0;

  const consumeChild = (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return;
    if (child.type === React.Fragment) {
      React.Children.forEach(
        (child.props as { children?: React.ReactNode }).children,
        consumeChild,
      );
      return;
    }
    const { type } = child;
    // We check via displayName or reference ideally.
    // Since these are local exported components:
    if (type === AppHeaderBrand) {
      brandNode = child;
      brandCount += 1;
      return;
    }
    if (type === AppHeaderNav) {
      navNode = child;
      navCount += 1;
      return;
    }
    if (type === AppHeaderActions) {
      actionsNode = child;
      actionsCount += 1;
      return;
    }
    if (isDev()) {
      devWarnOnce(
        `AppHeader:invalid-child:${typeof type === "string" ? type : (type as any).displayName || "Unknown"}`,
        `[AppHeader] Invalid child detected: <${
          typeof type === "string" ? type : (type as any).displayName || "Unknown"
        } />. Only AppHeader.Brand, AppHeader.Nav, and AppHeader.Actions are allowed.`,
      );
    }
  };

  React.Children.forEach(children, consumeChild);

  if (isDev()) {
    if (brandCount > 1) {
      devWarnOnce(
        "AppHeader:multiple-brand",
        "[AppHeader] Multiple AppHeader.Brand slots detected.",
      );
    }
    if (navCount > 1) {
      devWarnOnce("AppHeader:multiple-nav", "[AppHeader] Multiple AppHeader.Nav slots detected.");
    }
    if (actionsCount > 1) {
      devWarnOnce(
        "AppHeader:multiple-actions",
        "[AppHeader] Multiple AppHeader.Actions slots detected.",
      );
    }
  }

  const navbarContent = <Navbar left={brandNode} center={navNode} right={actionsNode} />;

  let stickyTone: StickyBarTone = "default";
  if (showGlass) {
    stickyTone = "muted";
  } else if (showElevation) {
    stickyTone = "elevated";
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  if (position === "sticky") {
    return (
      <SurfaceElevation.Root elevation={showElevation ? "sm" : "none"}>
        <StickyBar
          position="top"
          tone={stickyTone}
          divider={showDivider}
          // We can set zIndex via StickyBar if needed, it uses token.
        >
          {navbarContent}
        </StickyBar>
      </SurfaceElevation.Root>
    );
  }

  return (
    <SurfaceElevation.Root elevation="none">
      <Box as="header" bg="background" data-semantic-guard="allow">
        {navbarContent}
        {showDivider && <Divider tone="border" />}
      </Box>
    </SurfaceElevation.Root>
  );
};

// Attach subcomponents
AppHeader.Brand = AppHeaderBrand;
AppHeader.Nav = AppHeaderNav;
AppHeader.Actions = AppHeaderActions;

AppHeader.displayName = "AppHeader";
