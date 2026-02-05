/**
 * HeroMedia public types — compound-only API
 *
 * @see docs/architecture/extension/HEROMEDIA_CANON.md
 */

import type {
  HeroMediaAspect,
  HeroMediaOverlayAlign,
  HeroMediaOverlayPosition,
  HeroMediaSize,
  HeroMediaType,
} from "./HeroMedia.constants";

/** HeroMedia.Root props */
export interface HeroMediaRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio of the hero container; affects internal geometry only */
  aspect?: HeroMediaAspect;
  /** Safe-zone size for overlay padding (internal only); does not expose height/width */
  size?: HeroMediaSize;
  /** Accessibility: region label (required when hero contains CTA or interactive content) */
  ariaLabel?: string;
  children?: React.ReactNode;
}

/** HeroMedia.Media props */
export interface HeroMediaMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Media type: image, video, or carousel */
  type: HeroMediaType;
  /** Source URL for image or video */
  src?: string;
  /** Poster image URL for video (required when type is video) */
  poster?: string;
  /** Alt text for image (required when type is image) */
  alt?: string;
  /** Carousel.Root instance when type is carousel */
  children?: React.ReactNode;
}

/** HeroMedia.Overlay props */
export interface HeroMediaOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vertical position of overlay */
  position: HeroMediaOverlayPosition;
  /** Horizontal alignment within overlay slot */
  align?: HeroMediaOverlayAlign;
  children?: React.ReactNode;
}

export type {
  HeroMediaAspect,
  HeroMediaOverlayAlign,
  HeroMediaOverlayPosition,
  HeroMediaSize,
  HeroMediaType,
};
