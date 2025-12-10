import type { Metadata } from "next";

import { LiveExample } from "@/components/docs/LiveExample";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Motion Guide - Tenerife UI",
  description: "Learn about motion tokens, animations, and transitions in Tenerife UI",
};

export default function MotionPage() {
  return (
    <PageShell>
      <h1 className="mb-4 font-display text-4xl font-bold">Motion Guide</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Learn about motion tokens, animations, and transitions in Tenerife UI.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-3xl font-semibold">Motion Tokens V2</h2>
          <p className="mb-6 text-muted-foreground">
            Tenerife UI uses a token-driven motion system with durations, easings, and transition
            presets.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Durations</h2>
          <p className="mb-4 text-muted-foreground">
            Motion durations: fast (150ms), normal (250ms), slow (350ms), and reduced (0ms).
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Easings</h2>
          <p className="mb-4 text-muted-foreground">
            Three easing functions: soft, standard, and emphasized.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Animations</h2>
          <p className="mb-6 text-muted-foreground">
            Pre-configured animations for fade, scale, and slide transitions.
          </p>

          <LiveExample>
            {`import { Button } from '@tenerife.music/ui';

export default function App() {
  return (
    <div className="space-y-4">
      <Button className="transition-all duration-normal">
        Hover me
      </Button>
    </div>
  );
}`}
          </LiveExample>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Reduced Motion</h2>
          <p className="mb-4 text-muted-foreground">
            All animations respect the{" "}
            <code className="rounded bg-muted px-1">prefers-reduced-motion</code> media query and
            automatically disable or reduce motion when enabled.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
