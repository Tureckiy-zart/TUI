"use client";

/**
 * HeroMedia.Media — renders exactly one media type: image, video, or carousel.
 *
 * @see docs/architecture/extension/HEROMEDIA_CANON.md
 */

import * as React from "react";

import { useHeroMediaContext } from "./HeroMedia.context";
import type { HeroMediaMediaProps } from "./HeroMedia.types";

const MEDIA_FILL_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/** Media container: fills Root (fill-viewport). No flex centering. Used for all media types. */
const MEDIA_CONTAINER_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

/** MediaViewport: 100%×100% wrapper so image/video/carousel get a real viewport. */
const MEDIA_VIEWPORT_STYLE: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const CAROUSEL_ROOT_DISPLAY_NAME = "CarouselRoot";

function isCarouselRootChild(child: React.ReactElement): boolean {
  const type = child.type as React.ComponentType<unknown> | undefined;
  return type?.displayName === CAROUSEL_ROOT_DISPLAY_NAME;
}

const HeroMediaMedia = React.forwardRef<HTMLDivElement, HeroMediaMediaProps>(
  ({ type, src, poster, alt, children, ...rest }, ref) => {
    const { registerMedia, unregisterMedia } = useHeroMediaContext();
    const allowed = React.useRef<boolean | null>(null);

    if (allowed.current === null) {
      allowed.current = registerMedia(type);
      if (!allowed.current && process.env.NODE_ENV !== "production") {
        console.warn(
          "[HeroMedia] Exactly one HeroMedia.Media per HeroMedia.Root is allowed. Extra Media is not rendered.",
        );
      }
    }

    React.useEffect(() => {
      return () => {
        unregisterMedia();
      };
    }, [unregisterMedia]);

    if (!allowed.current) {
      return null;
    }

    if (type === "image") {
      if (process.env.NODE_ENV !== "production") {
        const altTrimmed = typeof alt === "string" ? alt.trim() : "";
        if (!altTrimmed) {
          console.warn("[HeroMedia] Image media requires non-empty alt text for accessibility.");
        }
      }
      return (
        <div ref={ref} {...rest} style={MEDIA_CONTAINER_STYLE} data-heromedia-media="image">
          <div style={MEDIA_VIEWPORT_STYLE}>
            {src ? (
              <img src={src} alt={alt ?? ""} style={MEDIA_FILL_STYLE} data-heromedia-image />
            ) : null}
          </div>
        </div>
      );
    }

    if (type === "video") {
      if (process.env.NODE_ENV !== "production") {
        const posterTrimmed = typeof poster === "string" ? poster.trim() : "";
        if (!posterTrimmed) {
          console.warn(
            "[HeroMedia] Video media requires a poster URL per HEROMEDIA_CANON (accessibility).",
          );
        }
      }
      return (
        <div ref={ref} {...rest} style={MEDIA_CONTAINER_STYLE} data-heromedia-media="video">
          <div style={MEDIA_VIEWPORT_STYLE}>
            {src ? (
              <video
                src={src}
                poster={poster}
                controls
                style={MEDIA_FILL_STYLE}
                data-heromedia-video
              />
            ) : null}
          </div>
        </div>
      );
    }

    if (type === "carousel") {
      // Render any single valid element so Storybook/builds work when displayName is unavailable; dev warning still enforces Carousel.Root contract.
      let child: React.ReactElement | null = null;
      try {
        const only = React.Children.only(children);
        if (React.isValidElement(only)) {
          child = only;
          if (process.env.NODE_ENV !== "production" && !isCarouselRootChild(only)) {
            console.warn(
              "[HeroMedia] When type is carousel, children must be a single Carousel.Root instance.",
            );
          }
        }
      } catch {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[HeroMedia] When type is carousel, children must be a single Carousel.Root instance.",
          );
        }
      }
      return (
        <div ref={ref} {...rest} style={MEDIA_CONTAINER_STYLE} data-heromedia-media="carousel">
          <div style={MEDIA_VIEWPORT_STYLE}>{child ?? null}</div>
        </div>
      );
    }

    return null;
  },
);

HeroMediaMedia.displayName = "HeroMediaMedia";

export { HeroMediaMedia };
