import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography Tokens - Tenerife UI",
  description: "Font families, sizes, weights, line heights, and letter spacing",
};

export default function TypographyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
