// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const TableAPI = {
  name: "Table",
  props: [],
  variants: [],
  examples: [
    '* <Table.Root\n *   data={users}\n *   columns={columns}\n *   rowKey="id"\n *   sortable\n * >\n *   <Table.Header>\n *     <Table.Row>\n *       <Table.Head>Name</Table.Head>\n *     </Table.Row>\n *   </Table.Header>\n *   <Table.Body>\n *     {users.map((user) => (\n *       <Table.Row key={user.id}>\n *         <Table.Cell>{user.name}</Table.Cell>\n *       </Table.Row>\n *     ))}\n *   </Table.Body>\n * </Table.Root>\n *',
    "* ```tsx",
  ],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { DATA_TOKENS } from "@/tokens/components/data";',
    'import type { SortState, TableContextValue, TableRootProps } from "./Table.types";',
    'import { TableBody } from "./TableBody";',
    'import { TableCell } from "./TableCell";',
    'import { TableEmpty } from "./TableEmpty";',
    'import { TableExpandableContent } from "./TableExpandableContent";',
    'import { TableHead } from "./TableHead";',
    'import { TableHeader } from "./TableHeader";',
    'import { TableLoadingState } from "./TableLoadingState";',
    'import { TableRow } from "./TableRow";',
    'import { TableSortIcon } from "./TableSortIcon";',
  ],
} as const satisfies ComponentAPI;
