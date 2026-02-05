/**
 * Carousel public types — compound-only API, no visual props by default
 */

/** Orientation of the carousel */
export type CarouselOrientation = "horizontal" | "vertical";

/** CarouselRoot props (behavioral only; no variant, size, theme, gap, padding, background, items) */
export interface CarouselRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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
  /** Whether to automatically advance slides */
  autoplay?: boolean;
  /** Delay between autoplay advances in milliseconds */
  autoplayDelay?: number;
  children?: React.ReactNode;
  /** Accessibility: region label */
  "aria-label"?: string;
}

/** CarouselTrack: scrollable container; no visual props in public API */
export interface CarouselTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** CarouselSlide: single slide; no visual props */
export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** CarouselPrev: previous slide button (batteries-included) */
export interface CarouselPrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

/** CarouselNext: next slide button (batteries-included) */
export interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

/** CarouselIndicators: dot indicators (batteries-included) */
export interface CarouselIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Placement of indicators relative to carousel content */
  placement?: "bottom" | "overlay";
  children?: never;
}

/** Simple API props for Carousel component */
export interface CarouselProps {
  /** Slides content */
  items: React.ReactNode[];
  /** Layout */
  orientation?: CarouselOrientation;
  /** Controls visibility & placement */
  controls?: "none" | "inside" | "outside";
  /** Indicators visibility & placement */
  indicators?: "none" | "bottom" | "overlay";
  /** Behavior */
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  /** Accessibility */
  ariaLabel?: string;
  /** Advanced escape hatch */
  renderSlide?: (item: React.ReactNode, index: number) => React.ReactNode;
}
