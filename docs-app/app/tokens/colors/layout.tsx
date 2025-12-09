import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Tokens - Tenerife UI",
  description:
    "Complete color palette system including primary, accent, secondary, semantic, and surface colors",
};

export default function ColorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
