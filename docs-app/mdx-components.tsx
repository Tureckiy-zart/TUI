import type { MDXComponents } from "mdx/types";

import { APITable } from "@/components/docs/APITable";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InlineCode } from "@/components/docs/InlineCode";
import { LiveExample } from "@/components/docs/LiveExample";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    LiveExample,
    CodeBlock,
    APITable,
    pre: CodeBlock,
    code: InlineCode,
    ...components,
  };
}
