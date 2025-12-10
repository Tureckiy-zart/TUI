"use client";

import { borderRadius } from "@tenerife.music/ui";

import { TokenCard, TokenExplorer } from "@/components/docs/TokenExplorer";
import { PageShell } from "@/components/layout/PageShell";

export default function RadiusPage() {
  return (
    <PageShell>
      <TokenExplorer
        title="Border Radius Tokens"
        description="Border radius scale and component-specific radius standards."
      >
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Radius Scale</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {Object.entries(borderRadius).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`rounded-${key}`}
                  value={value}
                  preview={
                    <div className="h-full w-full bg-primary" style={{ borderRadius: value }} />
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
