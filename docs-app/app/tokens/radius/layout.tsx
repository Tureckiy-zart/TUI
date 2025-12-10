import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radius Tokens - Tenerife UI",
  description: "Border radius scale and component-specific radius standards",
};

export default function RadiusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
