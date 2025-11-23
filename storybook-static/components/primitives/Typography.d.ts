import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}
interface HeadingProps extends TypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
interface TextProps extends TypographyProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "muted";
}
export declare const Heading: React.FC<HeadingProps>;
export declare const Text: React.FC<TextProps>;
export declare const Paragraph: React.FC<TextProps>;
export declare const Code: React.FC<TypographyProps>;
export declare const Blockquote: React.FC<TypographyProps>;
export {};
//# sourceMappingURL=Typography.d.ts.map
