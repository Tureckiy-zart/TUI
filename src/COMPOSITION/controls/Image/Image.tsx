"use client";

/**
 * Image Component
 *
 * Token-driven image primitive that renders a native <img> with an explicit
 * layout contract (inline by default, optional fill mode) and safe fallback handling.
 *
 * @example
 * ```tsx
 * <Image src="/cover.jpg" alt="Album cover" />
 *
 * <AspectRatio ratio={16 / 9}>
 *   <Image src="/hero.jpg" alt="Hero" fill fit="cover" />
 * </AspectRatio>
 * ```
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

const imageVariants = tokenCVA({
  base: "inline-block align-middle",
  variants: {
    fit: {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    } satisfies Record<ImageFit, string>,
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    } satisfies Record<ImageRadius, string>,
  },
  defaultVariants: {
    fit: "cover",
    radius: "none",
  },
});

export interface ImageProps extends Omit<
  React.ComponentPropsWithoutRef<"img">,
  "src" | "alt" | "width" | "height" | "style" | "loading" | "decoding" | "onError"
> {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alt text for the image.
   * Use empty string for decorative images.
   */
  alt: string;

  /**
   * Object-fit behavior.
   * @default "cover"
   */
  fit?: ImageFit;

  /**
   * Border radius (token-driven).
   * @default "none"
   */
  radius?: ImageRadius;

  /**
   * Fill parent container (absolute inset).
   * Parent MUST establish size and position (e.g., AspectRatio).
   * @default false
   */
  fill?: boolean;

  /**
   * Native loading behavior.
   * @default "lazy"
   */
  loading?: "eager" | "lazy";

  /**
   * Native decoding behavior.
   */
  decoding?: "auto" | "sync" | "async";

  /**
   * Fallback content rendered when the image fails to load.
   * If provided, the component swaps to fallback on error.
   */
  fallback?: React.ReactNode;

  /**
   * Error handler (invoked after internal fallback handling).
   */
  onError?: React.ReactEventHandler<HTMLImageElement>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Image component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Composes Foundation components (if applicable)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses descriptive, intent-based naming
 * - ✅ Does NOT duplicate Foundation functionality
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fit = "cover",
      radius = "none",
      fill = false,
      loading = "lazy",
      decoding,
      fallback,
      onError,
      className,
      ...props
    },
    ref,
  ) => {
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
      setHasError(false);
    }, [src]);

    const handleError = React.useCallback<React.ReactEventHandler<HTMLImageElement>>(
      (event) => {
        setHasError(true);
        onError?.(event);
      },
      [onError],
    );

    const classes = cn(
      imageVariants({ fit, radius }),
      fill ? "absolute inset-0 h-full w-full block" : "",
      className,
    );

    if ((hasError || !src) && fallback) {
      type FallbackElementProps = React.AriaAttributes & {
        className?: string;
        role?: string;
      };
      const fallbackProps: FallbackElementProps =
        alt === "" ? { "aria-hidden": true } : { role: "img", "aria-label": alt };

      if (React.isValidElement(fallback) && fallback.type !== React.Fragment) {
        const typedFallback = fallback as React.ReactElement<FallbackElementProps>;
        const fallbackClassName = cn(classes, typedFallback.props.className);
        return React.cloneElement<FallbackElementProps>(typedFallback, {
          ...fallbackProps,
          className: fallbackClassName,
        });
      }

      return (
        <span className={classes} {...fallbackProps}>
          {fallback}
        </span>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={classes}
        onError={fallback ? handleError : onError}
        {...props}
      />
    );
  },
);

Image.displayName = "Image";

export { Image };
