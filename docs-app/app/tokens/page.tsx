import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export default function TokensPage() {
  return (
    <PageShell>
      <h1 className="mb-4 font-display text-4xl font-bold">Design Tokens</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Explore all design tokens used in Tenerife UI, including colors, typography, spacing,
        shadows, radius, and motion.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/tokens/colors"
          className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
            <h2 className="mb-2 text-2xl font-semibold">Colors</h2>
            <p className="text-muted-foreground">
              Primary, accent, secondary, semantic, and surface colors with full color scales.
            </p>
          </div>
        </Link>

        <Link
          href="/tokens/typography"
          className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
            <h2 className="mb-2 text-2xl font-semibold">Typography</h2>
            <p className="text-muted-foreground">
              Font families, sizes, weights, line heights, and letter spacing.
            </p>
          </div>
        </Link>

        <Link
          href="/tokens/spacing"
          className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
            <h2 className="mb-2 text-2xl font-semibold">Spacing</h2>
            <p className="text-muted-foreground">
              8px grid system with semantic and layout spacing tokens.
            </p>
          </div>
        </Link>

        <Link
          href="/tokens/radius"
          className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
            <h2 className="mb-2 text-2xl font-semibold">Border Radius</h2>
            <p className="text-muted-foreground">
              Border radius scale and component-specific radius standards.
            </p>
          </div>
        </Link>

        <Link
          href="/tokens/shadows"
          className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
            <h2 className="mb-2 text-2xl font-semibold">Shadows</h2>
            <p className="text-muted-foreground">
              Elevation shadows, colored shadows, glow effects, and focus rings.
            </p>
          </div>
        </Link>

        <Link
          href="/tokens/motion"
          className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
            <h2 className="mb-2 text-2xl font-semibold">Motion</h2>
            <p className="text-muted-foreground">
              Durations, easings, transitions, and animation presets.
            </p>
          </div>
        </Link>
      </div>
    </PageShell>
  );
}
