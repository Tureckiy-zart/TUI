import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description?: string;
}
interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}
export declare const Timeline: React.FC<TimelineProps>;
export {};
//# sourceMappingURL=Timeline.d.ts.map
