import { Button } from "@tenerife.music/ui";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 font-display text-5xl font-bold">Tenerife UI Documentation</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Complete guide to building beautiful interfaces with Tenerife UI component library.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/getting-started"
              className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
                <h2 className="mb-2 text-2xl font-semibold">Getting Started</h2>
                <p className="text-muted-foreground">
                  Learn how to install and use Tenerife UI in your project.
                </p>
              </div>
            </Link>

            <Link
              href="/components"
              className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
                <h2 className="mb-2 text-2xl font-semibold">Components</h2>
                <p className="text-muted-foreground">
                  Browse all available components with examples and API documentation.
                </p>
              </div>
            </Link>

            <Link
              href="/tokens"
              className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
                <h2 className="mb-2 text-2xl font-semibold">Design Tokens</h2>
                <p className="text-muted-foreground">
                  Explore colors, typography, spacing, and other design tokens.
                </p>
              </div>
            </Link>

            <Link
              href="/theming"
              className="focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
                <h2 className="mb-2 text-2xl font-semibold">Theming</h2>
                <p className="text-muted-foreground">
                  Learn how to customize themes and create your own.
                </p>
              </div>
            </Link>
          </div>

          <div className="flex gap-4">
            <Link href="/getting-started">
              <Button>Get Started</Button>
            </Link>
            <Link href="/components">
              <Button variant="outline">Browse Components</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
