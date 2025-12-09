import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadow Tokens - Tenerife UI",
  description: "Elevation shadows, colored shadows, glow effects, and focus rings",
};

export default function ShadowsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
