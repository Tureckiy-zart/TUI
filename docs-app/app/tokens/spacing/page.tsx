"use client";

import { semanticSpacing, spacing } from "@tenerife.music/ui";

import { TokenCard, TokenExplorer } from "@/components/docs/TokenExplorer";
import { PageShell } from "@/components/layout/PageShell";

export default function SpacingPage() {
  return (
    <PageShell>
      <TokenExplorer
        title="Spacing Tokens"
        description="8px grid system with base spacing scale and semantic spacing tokens."
      >
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Base Spacing Scale</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {Object.entries(spacing)
                .filter(([key]) => !isNaN(Number(key)) || key === "px")
                .map(([key, value]) => (
                  <TokenCard
                    key={key}
                    name={`spacing-${key}`}
                    value={value}
                    preview={
                      <div className="flex w-full items-center justify-center">
                        <div
                          className="rounded bg-primary"
                          style={{ width: value, height: value }}
                        />
                      </div>
                    }
                  />
                ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Semantic Spacing</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {Object.entries(semanticSpacing).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`spacing-${key}`}
                  value={value}
                  preview={
                    <div className="flex w-full items-center justify-center">
                      <div className="rounded bg-primary" style={{ width: value, height: value }} />
                    </div>
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
