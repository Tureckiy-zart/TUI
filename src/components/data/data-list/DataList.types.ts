/**
 * DataList Component Types
 *
 * TypeScript interfaces and types for DataList component.
 */

/**
 * DataList Root component props
 */
export interface DataListRootProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Label width for desktop layout
   * @default "md"
   */
  labelWidth?: "sm" | "md" | "lg";
}

/**
 * DataList Item component props
 */
export interface DataListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Row padding
   * @default "md"
   */
  padding?: "sm" | "md" | "lg";
}

/**
 * DataList Label component props
 */
export interface DataListLabelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label text
   */
  children: React.ReactNode;
}

/**
 * DataList Value component props
 */
export interface DataListValueProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Value content
   */
  children: React.ReactNode;
}
