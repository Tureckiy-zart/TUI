import * as React from "react";

import type { StackProps } from "@/index";

/**
 * CardBase Size Variant
 * Maps to GlobalSize scale subset: sm | md
 * - "sm" maps from legacy "compact"
 * - "md" maps from legacy "default"
 */
export type CardBaseSize = "sm" | "md";

/**
 * CardBase Style Variant
 * Maps to SurfaceVariant dictionary: default | elevated
 * - "default" maps from legacy "default"
 * - "elevated" maps from legacy "featured"
 */
export type CardBaseVariant = "default" | "elevated";

/**
 * CardBase Root Component Props
 */
export interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant - controls padding and gap
   * @default "md"
   */
  size?: CardBaseSize;

  /**
   * Style variant - controls visual appearance
   * @default "default"
   */
  variant?: CardBaseVariant;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CardBase ImageWrapper Props
 */
export interface CardBaseImageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant - inherited from parent CardBase
   * @default "md"
   */
  size?: CardBaseSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CardBase ContentWrapper Props
 */
export interface CardBaseContentWrapperProps extends Omit<
  StackProps,
  "direction" | "display" | "flexDirection"
> {
  /**
   * Size variant - inherited from parent CardBase
   * @default "md"
   */
  size?: CardBaseSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CardBase FooterWrapper Props
 */
export interface CardBaseFooterWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant - inherited from parent CardBase
   * @default "md"
   */
  size?: CardBaseSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}
