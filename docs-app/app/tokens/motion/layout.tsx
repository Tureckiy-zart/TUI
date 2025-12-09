import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motion Tokens - Tenerife UI",
  description: "Durations, easings, transitions, and animation presets for smooth motion",
};

export default function MotionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
