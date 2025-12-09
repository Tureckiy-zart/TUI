import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spacing Tokens - Tenerife UI",
  description: "8px grid system with base spacing scale and semantic spacing tokens",
};

export default function SpacingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
