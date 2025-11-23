import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}
interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: keyof T;
  className?: string;
}
export declare const Table: <T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  className,
}: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Table.d.ts.map
