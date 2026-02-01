/**
 * Layout Primitives Exports
 *
 * Token-driven layout primitives: Box, Stack, Row, Column, Flex, Grid, Surface, Container
 */

export * from "./Box";
export * from "./Column";
export * from "./Container";
export * from "./Flex";
export * from "./Grid";
export * from "./Inline";
export * from "./Inset/Inset";
export * from "./List/List.index";
export * from "./ListItem/ListItem.index";
export * from "./Panel/Panel.index";
export * from "./Row";
export * from "./Stack";
export * from "./Surface";

// Card
export {
  Card,
  CardBody,
  type CardBodyProps,
  CardFooter,
  type CardFooterProps,
  CardHeader,
  type CardHeaderProps,
  type CardProps,
} from "./Card";

// Section
export { Section, type SectionProps } from "./Section/Section";

// Footer
export { Footer, type FooterProps } from "./Footer";

// PageHeader
export { PageHeader, type PageHeaderProps } from "./PageHeader";

// ContentShell
export { ContentShell, type ContentShellProps } from "./ContentShell/ContentShell";

// SidebarLayout
export {
  type CollapseBreakpoint,
  SidebarLayout,
  type SidebarLayoutProps,
  type SidebarPosition,
  type SidebarWidth,
} from "./SidebarLayout";

// Divider
export {
  Divider,
  type DividerOrientation,
  type DividerProps,
  type DividerTone,
  dividerVariants,
} from "./Divider/Divider";

// StickyBar
export {
  StickyBar,
  type StickyBarPosition,
  type StickyBarProps,
  type StickyBarTone,
  stickyBarVariants,
} from "./StickyBar/StickyBar";

// Spacer
export { Spacer, type SpacerOrientation, type SpacerProps } from "./Spacer";

// Navbar
export { Navbar, type NavbarProps } from "./Navbar";

// HeaderComposition (ResponsiveVisibility etalon: mobile/desktop header branching)
export {
  HeaderComposition,
  type HeaderCompositionProps,
} from "./HeaderComposition/HeaderComposition.index";

// LinkWithCustomVariant
export { LinkWithCustomVariant } from "./LinkWithCustomVariant";

// Re-export shared types
export type * from "./layout.types";
