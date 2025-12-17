import * as React from "react";

/**
 * CardBase Size Variant
 */
export type CardBaseSize = "default" | "compact";

/**
 * CardBase Style Variant
 */
export type CardBaseVariant = "default" | "featured";

/**
 * CardBase Root Component Props
 */
export interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant - controls padding and gap
   * @default "default"
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
   * @default "default"
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
export interface CardBaseContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant - inherited from parent CardBase
   * @default "default"
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
   * @default "default"
   */
  size?: CardBaseSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}
