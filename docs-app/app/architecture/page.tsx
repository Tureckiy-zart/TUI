import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Architecture Guide - Tenerife UI",
  description: "Learn about the architecture and design decisions behind Tenerife UI",
};

export default function ArchitecturePage() {
  return (
    <PageShell>
      <h1 className="mb-4 font-display text-4xl font-bold">Architecture Guide</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Learn about the architecture and design decisions behind Tenerife UI.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-3xl font-semibold">Token Architecture</h2>
          <p className="mb-4 text-muted-foreground">
            Tenerife UI uses a token-driven design system. All design values (colors, spacing,
            typography, etc.) are defined as tokens and exposed through CSS variables.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Motion Architecture</h2>
          <p className="mb-4 text-muted-foreground">
            The motion system (TAS - Tenerife Animation System) provides consistent motion
            primitives with built-in reduced motion support.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Overlay System</h2>
          <p className="mb-4 text-muted-foreground">
            Overlays (Modal, Dialog, Toast, Portal) use a unified portal system for consistent
            behavior and accessibility.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Menu Architecture</h2>
          <p className="mb-4 text-muted-foreground">
            Menu components (DropdownMenu, ContextMenu, HoverCard) share a common foundation with
            consistent keyboard navigation and focus management.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Field System</h2>
          <p className="mb-4 text-muted-foreground">
            Form fields use a composable Field component with built-in validation, error handling,
            and accessibility features.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Layout Primitives</h2>
          <p className="mb-4 text-muted-foreground">
            Layout components (Box, Flex, Grid, Stack, Surface) provide flexible, token-based layout
            utilities.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
