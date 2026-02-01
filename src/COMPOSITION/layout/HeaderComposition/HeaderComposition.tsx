"use client";

/**
 * HeaderComposition — Etalon composition for ResponsiveVisibility at app header level.
 *
 * Wraps mobile and desktop header variants in ResponsiveVisibility.Root.
 * Mobile (viewport < md): Navbar with Menu (hamburger) and condensed layout.
 * Desktop (viewport >= md): Navbar with NavRoot, NavList, and full navigation.
 *
 * No Tailwind visibility utilities, no media queries, no breakpoint hooks.
 * Reference: docs/reports/HEADER_COMPOSITION_INTENT.md, RESPONSIVE_VISIBILITY_CANON.md
 */

import * as React from "react";

import { Menu, NavItem, NavList, NavRoot } from "@/COMPOSITION/navigation";
import { ResponsiveVisibility } from "@/COMPOSITION/responsive";

import { Navbar } from "../Navbar";

export interface HeaderCompositionProps {
  /** Optional aria-label for the nav region. */
  ariaLabel?: string;
  /** Desktop slot: content for center (NavRoot + NavList). Defaults to placeholder links. */
  desktopCenter?: React.ReactNode;
  /** Desktop slot: content for right zone. */
  desktopRight?: React.ReactNode;
  /** Mobile slot: content for right zone (e.g. search icon). */
  mobileRight?: React.ReactNode;
  /** Logo or brand node shown in both slots. */
  logo?: React.ReactNode;
}

const defaultLogo = <span style={{ fontWeight: 600 }}>Logo</span>;

/**
 * Header composition using ResponsiveVisibility for mobile/desktop branching.
 * Breakpoint md: mobile below 768px, desktop from 768px.
 */
export const HeaderComposition: React.FC<HeaderCompositionProps> = ({
  ariaLabel = "Primary navigation",
  desktopCenter,
  desktopRight,
  mobileRight,
  logo = defaultLogo,
}) => {
  const defaultDesktopCenter = (
    <NavRoot aria-label="Main navigation">
      <NavList as="ul">
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Contact</NavItem>
      </NavList>
    </NavRoot>
  );

  return (
    <ResponsiveVisibility.Root>
      <ResponsiveVisibility.Below bp="md">
        <Navbar
          ariaLabel={ariaLabel}
          left={
            <Menu>
              <Menu.Trigger className="rounded border border-[hsl(var(--tm-border-default))] px-3 py-2 text-sm font-medium">
                Menu
              </Menu.Trigger>
              <Menu.Content>
                <Menu.Item>Home</Menu.Item>
                <Menu.Item>About</Menu.Item>
                <Menu.Item>Contact</Menu.Item>
              </Menu.Content>
            </Menu>
          }
          center={logo}
          right={mobileRight}
        />
      </ResponsiveVisibility.Below>
      <ResponsiveVisibility.From bp="md">
        <Navbar
          ariaLabel={ariaLabel}
          left={logo}
          center={desktopCenter ?? defaultDesktopCenter}
          right={desktopRight}
        />
      </ResponsiveVisibility.From>
    </ResponsiveVisibility.Root>
  );
};

HeaderComposition.displayName = "HeaderComposition";
