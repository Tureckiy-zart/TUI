"use client";

/**
 * HeroCompositionReference — Etalon composition for InverseTypography at hero overlay level.
 *
 * Uses HeroMedia.Root / Media / Overlay as-is. Wraps only the overlay subtree with
 * InverseTypography.Root. Structure-only; no new tokens or styles.
 *
 * Reference: docs/architecture/extension/INVERSE_TYPOGRAPHY_CANON.md
 */

import * as React from "react";

import { InverseTypography } from "@/COMPOSITION/inverse-typography";

import { HeroMedia } from "../HeroMedia/HeroMedia.index";

export interface HeroCompositionReferenceProps {
  /** Optional aria-label for the hero region. */
  ariaLabel?: string;
  /** Aspect ratio of the hero container. */
  aspect?: "16:9" | "21:9" | "auto";
  /** Content rendered inside HeroMedia.Overlay (inverse typography context). */
  children?: React.ReactNode;
  /** Image source for HeroMedia.Media when type is image. */
  mediaSrc?: string;
  /** Alt text for the hero image. */
  mediaAlt?: string;
}

const DEFAULT_MEDIA_SRC = "https://placehold.co/1920x1080/1a1a2e/eee?text=Hero+Image";
const DEFAULT_MEDIA_ALT = "Hero";

/**
 * Etalon composition: HeroMedia + InverseTypography.Root around overlay subtree only.
 */
export const HeroCompositionReference: React.FC<HeroCompositionReferenceProps> = ({
  ariaLabel = "Hero with inverse typography",
  aspect = "16:9",
  children,
  mediaSrc = DEFAULT_MEDIA_SRC,
  mediaAlt = DEFAULT_MEDIA_ALT,
}) => {
  return (
    <HeroMedia.Root aspect={aspect} ariaLabel={ariaLabel}>
      <HeroMedia.Media type="image" src={mediaSrc} alt={mediaAlt} />
      <InverseTypography.Root>
        <HeroMedia.Overlay position="center" align="center">
          {children}
        </HeroMedia.Overlay>
      </InverseTypography.Root>
    </HeroMedia.Root>
  );
};

HeroCompositionReference.displayName = "HeroCompositionReference";
