"use client";

import {
  accentColoredShadows,
  elevationShadows,
  glowEffects,
  primaryColoredShadows,
} from "@tenerife.music/ui";

import { TokenCard, TokenExplorer } from "@/components/docs/TokenExplorer";
import { PageShell } from "@/components/layout/PageShell";

export default function ShadowsPage() {
  return (
    <PageShell>
      <TokenExplorer
        title="Shadow Tokens"
        description="Elevation shadows, colored shadows, glow effects, and focus rings."
      >
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Elevation Shadows</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(elevationShadows).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`shadow-${key}`}
                  value={value}
                  preview={
                    <div
                      className="h-full w-full rounded border bg-background"
                      style={{ boxShadow: value }}
                    />
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Primary Colored Shadows</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(primaryColoredShadows).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`shadow-primary-${key}`}
                  value={value}
                  preview={
                    <div
                      className="h-full w-full rounded border bg-background"
                      style={{ boxShadow: value }}
                    />
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Accent Colored Shadows</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(accentColoredShadows).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`shadow-accent-${key}`}
                  value={value}
                  preview={
                    <div
                      className="h-full w-full rounded border bg-background"
                      style={{ boxShadow: value }}
                    />
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Glow Effects</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(glowEffects).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={key}
                  value={value}
                  preview={
                    <div
                      className="h-full w-full rounded border bg-background"
                      style={{ boxShadow: value }}
                    />
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </TokenExplorer>
    </PageShell>
  );
}
