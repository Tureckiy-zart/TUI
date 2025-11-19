import React, { useCallback, useRef, useState } from "react";

import { Skeleton } from "@/components/feedback/Skeleton";
import { cn } from "@/lib/utils";

export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
export type ImageShadow = "none" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "inner";
export type ImageAspectRatio = "square" | "video" | "photo" | "wide" | string;

// Map radius to Tailwind classes
const radiusClasses: Record<ImageRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

// Map shadow to Tailwind classes
const shadowClasses: Record<ImageShadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  base: "shadow",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
  inner: "shadow-inner",
};

// Map common aspect ratios to Tailwind classes
const aspectRatioClasses: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  photo: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

// Standard img element props
type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface ImageProps extends Omit<ImgProps, "className"> {
  /**
   * Custom className for the image element itself
   */
  className?: string;
  /**
   * Custom className for the wrapper div container
   */
  wrapperClassName?: string;
  /**
   * Border radius for the image container
   */
  radius?: ImageRadius;
  /**
   * Shadow for the image container
   */
  shadow?: ImageShadow;
  /**
   * Aspect ratio for the image container (e.g., 'square', 'video', 'photo', 'wide', or custom like '16/9', '4/3')
   */
  aspectRatio?: ImageAspectRatio;
  /**
   * Fallback image source if the main image fails to load
   */
  fallbackSrc?: string;
  /**
   * Whether to show a skeleton loader while the image is loading
   */
  showSkeleton?: boolean;
  /**
   * Whether the image should fill its container (uses absolute positioning)
   */
  fill?: boolean;
  /**
   * Callback fired when the image has finished loading
   */
  onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
}

const ImageComponent = React.forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      className,
      wrapperClassName,
      radius = "none",
      shadow = "none",
      aspectRatio,
      fallbackSrc,
      showSkeleton = false,
      src,
      onLoadingComplete,
      onError,
      onLoad,
      fill,
      alt = "",
      ...imgProps
    },
    ref,
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const fallbackAttemptedRef = useRef(false);
    // Track loading ID to prevent race conditions when src changes rapidly
    const loadingIdRef = useRef(0);
    // Track if component is mounted to prevent state updates after unmount
    const isMountedRef = useRef(true);
    // Ref to track the image element
    const imgRef = useRef<HTMLImageElement | null>(null);

    // Normalize src: treat empty string as undefined
    const normalizedSrc = src && src.trim() !== "" ? src : undefined;
    const normalizedFallbackSrc =
      fallbackSrc && fallbackSrc.trim() !== "" ? fallbackSrc : undefined;

    // Prevent fallback loop: if fallback is same as src, ignore it
    const effectiveFallbackSrc =
      normalizedFallbackSrc && normalizedFallbackSrc !== normalizedSrc
        ? normalizedFallbackSrc
        : undefined;

    const handleLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = event.currentTarget;
        const currentLoadingId = loadingIdRef.current;

        // Only process if component is still mounted and this is still the current image
        if (!isMountedRef.current || !imgRef.current || img !== imgRef.current) {
          return;
        }

        setIsLoaded(true);

        if (onLoadingComplete) {
          try {
            // Validate dimensions - 0x0 might indicate a problem
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Double-check loading ID hasn't changed (race condition protection)
            if (loadingIdRef.current !== currentLoadingId) {
              return;
            }

            if (width === 0 || height === 0) {
              // Image loaded but has invalid dimensions - treat as error
              setHasError(true);
              setIsLoaded(false);
              if (!onError) {
                return;
              }
              try {
                onError(event as any);
              } catch (callbackError) {
                console.error("Error in onError callback:", callbackError);
              }
              return;
            }

            onLoadingComplete({
              naturalWidth: width,
              naturalHeight: height,
            });
          } catch (callbackError) {
            console.error("Error in onLoadingComplete callback:", callbackError);
          }
        }
      },
      [onLoadingComplete, onError],
    );

    const handleError = useCallback(
      (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = error.currentTarget;
        const currentLoadingId = loadingIdRef.current;

        // Only process if component is still mounted and this is still the current image
        if (!isMountedRef.current || !imgRef.current || img !== imgRef.current) {
          return;
        }

        // Double-check loading ID hasn't changed (race condition protection)
        if (loadingIdRef.current !== currentLoadingId) {
          return;
        }

        // If we have a fallback and haven't tried it yet, switch to fallback
        if (
          effectiveFallbackSrc &&
          !fallbackAttemptedRef.current &&
          currentSrc !== effectiveFallbackSrc
        ) {
          fallbackAttemptedRef.current = true;
          setCurrentSrc(effectiveFallbackSrc);
          setHasError(false);
          setIsLoaded(false); // Reset loaded state when switching to fallback
          loadingIdRef.current += 1; // Increment loading ID for fallback
          // Don't call onError yet, let it try the fallback first
          return;
        }

        // If we've already tried fallback or don't have one, mark as error
        setHasError(true);
        setIsLoaded(false); // Ensure loaded state is false on error

        if (onError) {
          try {
            onError(error);
          } catch (callbackError) {
            console.error("Error in onError callback:", callbackError);
          }
        }
      },
      [effectiveFallbackSrc, currentSrc, onError],
    );

    // Reset states when src changes
    React.useEffect(() => {
      if (normalizedSrc !== currentSrc) {
        setCurrentSrc(normalizedSrc);
        setIsLoaded(false);
        setHasError(false);
        fallbackAttemptedRef.current = false;
        loadingIdRef.current += 1; // Increment loading ID to invalidate pending callbacks
      }
    }, [normalizedSrc, currentSrc]);

    // Cleanup on unmount
    React.useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);

    // Build wrapper classes
    const wrapperClasses = cn(
      "relative",
      // Apply radius
      radius !== "none" && radiusClasses[radius],
      // Apply shadow
      shadow !== "none" && shadowClasses[shadow],
      // Apply overflow-hidden when radius is not none to prevent image overflow
      radius !== "none" && "overflow-hidden",
      // Apply aspect ratio
      aspectRatio &&
        (aspectRatioClasses[aspectRatio] ||
          (typeof aspectRatio === "string" && /^\d+\/\d+$/.test(aspectRatio.trim())
            ? `aspect-[${aspectRatio.trim()}]`
            : aspectRatio)),
      // If fill is used, ensure container is relative (already added above)
      fill && "w-full h-full",
      wrapperClassName,
    );

    // Build image classes
    const imageClasses = cn(
      // Ensure image respects container bounds when fill is used or radius is applied
      (fill || radius !== "none") && "object-cover",
      fill && "absolute inset-0 w-full h-full",
      className,
    );

    const shouldShowSkeleton = showSkeleton && !isLoaded && !hasError && currentSrc;

    const handleImageLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        handleLoad(event);
        if (onLoad) {
          try {
            onLoad(event);
          } catch (callbackError) {
            console.error("Error in onLoad callback:", callbackError);
          }
        }
      },
      [handleLoad, onLoad],
    );

    // Don't render image if no src is provided (unless fallback exists)
    const hasValidSrc = currentSrc || effectiveFallbackSrc;

    return (
      <div ref={ref} className={wrapperClasses}>
        {shouldShowSkeleton && <Skeleton className="absolute inset-0 z-10 h-full w-full" />}
        {hasValidSrc ? (
          <img
            {...imgProps}
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            className={imageClasses}
            onLoad={handleImageLoad}
            onError={handleError}
          />
        ) : null}
      </div>
    );
  },
);

ImageComponent.displayName = "Image";

export { ImageComponent as Image };
