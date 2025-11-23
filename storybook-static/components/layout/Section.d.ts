import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface SectionProps {
  className?: string;
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "card";
  as?: keyof React.JSX.IntrinsicElements;
}
export declare const Section: React.FC<SectionProps>;
export {};
//# sourceMappingURL=Section.d.ts.map
