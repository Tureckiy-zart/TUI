import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface Article {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
}
interface ArticlesSectionProps {
  articles: Article[];
  readMoreLabel: string;
  className?: string;
}
export declare const ArticlesSection: React.FC<ArticlesSectionProps>;
export {};
//# sourceMappingURL=ArticlesSection.d.ts.map
