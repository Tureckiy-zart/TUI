import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Accessibility Guide - Tenerife UI",
  description: "Learn about accessibility features and patterns in Tenerife UI",
};

export default function AccessibilityPage() {
  return (
    <PageShell>
      <h1 className="mb-4 font-display text-4xl font-bold">Accessibility Guide</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Learn about accessibility features and patterns in Tenerife UI.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-3xl font-semibold">Focus Management</h2>
          <p className="mb-4 text-muted-foreground">
            All interactive components support keyboard navigation and visible focus indicators.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Keyboard Navigation</h2>
          <p className="mb-4 text-muted-foreground">
            Components follow standard keyboard navigation patterns:
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Tab to navigate between interactive elements</li>
            <li>Enter/Space to activate buttons and links</li>
            <li>Arrow keys for menus and navigation components</li>
            <li>Escape to close modals and overlays</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">ARIA Attributes</h2>
          <p className="mb-4 text-muted-foreground">
            All components include appropriate ARIA attributes for screen readers.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Reduced Motion</h2>
          <p className="mb-4 text-muted-foreground">
            Tenerife UI respects user preferences for reduced motion. All animations automatically
            adapt when <code className="rounded bg-muted px-1">prefers-reduced-motion</code> is
            enabled.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
