import React from "react";

import { cn } from "@/lib/utils";

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

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  className,
}: TableProps<T>) => {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="p-3 text-left font-medium text-muted-foreground"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={String(item[rowKey])} className="border-b hover:bg-muted/50">
              {columns.map((column) => (
                <td key={String(column.key)} className="p-3">
                  {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
