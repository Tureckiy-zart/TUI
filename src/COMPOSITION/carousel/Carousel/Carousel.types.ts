/**
 * Carousel public types — compound-only API, no visual props
 */

/** Orientation of the carousel */
export type CarouselOrientation = "horizontal" | "vertical";

/** CarouselRoot props (behavioral only; no variant, size, theme, gap, padding, background, items) */
export interface CarouselRootProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style"
> {
  /** Controlled current slide index (0-based) */
  index?: number;
  /** Default slide index when uncontrolled */
  defaultIndex?: number;
  /** Callback when slide index changes */
  onIndexChange?: (index: number) => void;
  /** Direction of slide flow */
  orientation?: CarouselOrientation;
  /** Whether to loop from last to first and vice versa */
  loop?: boolean;
  /** Whether to show prev/next controls (default: true when Controls slot used) */
  controls?: boolean;
  /** Whether to show indicator dots (default: true when Indicators slot used) */
  indicators?: boolean;
  children?: React.ReactNode;
  /** Accessibility: region label */
  "aria-label"?: string;
}

/** CarouselTrack: scrollable container; no visual props in public API */
export interface CarouselTrackProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children?: React.ReactNode;
}

/** CarouselSlide: single slide; no visual props */
export interface CarouselSlideProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children?: React.ReactNode;
}

/** CarouselPrev: previous slide button (batteries-included) */
export interface CarouselPrevProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  children?: React.ReactNode;
}

/** CarouselNext: next slide button (batteries-included) */
export interface CarouselNextProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  children?: React.ReactNode;
}

/** CarouselIndicators: dot indicators (batteries-included) */
export interface CarouselIndicatorsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children?: never;
}
