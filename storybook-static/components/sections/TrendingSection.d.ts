import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface Event {
  id: string;
  title: string;
  [key: string]: unknown;
}
interface TrendingSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  events: Event[];
  limit: number;
  loading: boolean;
  title: string;
  loadingText: string;
  contentText: string;
}
export declare const TrendingSection: React.FC<TrendingSectionProps>;
export {};
//# sourceMappingURL=TrendingSection.d.ts.map
