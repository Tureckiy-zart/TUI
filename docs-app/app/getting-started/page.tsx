import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Getting Started - Tenerife UI",
  description: "Get up and running with Tenerife UI in minutes",
};

export default function GettingStartedPage() {
  return (
    <PageShell>
      <h1 className="mb-4 font-display text-4xl font-bold">Getting Started</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Get up and running with Tenerife UI in minutes.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
          <p className="mb-4 text-muted-foreground">
            Install Tenerife UI using your preferred package manager:
          </p>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm">
            <div>npm install @tenerife.music/ui</div>
            <div className="mt-2"># or</div>
            <div>pnpm add @tenerife.music/ui</div>
            <div className="mt-2"># or</div>
            <div>yarn add @tenerife.music/ui</div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
          <p className="mb-4 text-muted-foreground">
            Wrap your app with ThemeProvider and start using components:
          </p>
          <div className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
            <pre>{`import { ThemeProvider, Button } from '@tenerife.music/ui';
import '@tenerife.music/ui/styles';

function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button>Hello Tenerife UI</Button>
    </ThemeProvider>
  );
}`}</pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Next Steps</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link href="/installation">
              <div className="rounded-lg border p-4 transition-colors hover:bg-accent">
                <h3 className="mb-2 font-semibold">Installation Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed installation instructions for all frameworks
                </p>
              </div>
            </Link>
            <Link href="/components">
              <div className="rounded-lg border p-4 transition-colors hover:bg-accent">
                <h3 className="mb-2 font-semibold">Components</h3>
                <p className="text-sm text-muted-foreground">Browse all available components</p>
              </div>
            </Link>
            <Link href="/tokens">
              <div className="rounded-lg border p-4 transition-colors hover:bg-accent">
                <h3 className="mb-2 font-semibold">Design Tokens</h3>
                <p className="text-sm text-muted-foreground">
                  Explore colors, typography, spacing, and more
                </p>
              </div>
            </Link>
            <Link href="/theming">
              <div className="rounded-lg border p-4 transition-colors hover:bg-accent">
                <h3 className="mb-2 font-semibold">Theming</h3>
                <p className="text-sm text-muted-foreground">Learn how to customize themes</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
