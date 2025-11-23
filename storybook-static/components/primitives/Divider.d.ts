import * as React from "react";
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
}
declare const Divider: React.ForwardRefExoticComponent<
  DividerProps & React.RefAttributes<HTMLDivElement>
>;
export { Divider };
//# sourceMappingURL=Divider.d.ts.map
