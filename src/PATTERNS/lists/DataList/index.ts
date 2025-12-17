/**
 * DataList Component
 *
 * Mobile-first data list component for displaying key-value pairs.
 */

export { DataListRoot, type DataListRootProps } from "./DataList";
export { DataListItem, type DataListItemProps } from "./DataListItem";
export { DataListLabel, type DataListLabelProps } from "./DataListLabel";
export { DataListValue, type DataListValueProps } from "./DataListValue";

// Re-export as DataList for compound component usage
export { DataListRoot as DataList } from "./DataList";
