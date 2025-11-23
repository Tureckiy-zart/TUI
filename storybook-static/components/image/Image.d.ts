import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
export type ImageShadow = "none" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "inner";
export type ImageAspectRatio = "square" | "video" | "photo" | "wide" | string;
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
declare const ImageComponent: React.ForwardRefExoticComponent<
  ImageProps & React.RefAttributes<HTMLDivElement>
>;
export { ImageComponent as Image };
//# sourceMappingURL=Image.d.ts.map
