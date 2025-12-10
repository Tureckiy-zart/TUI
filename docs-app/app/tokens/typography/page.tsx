"use client";

import { fontFamily, fontSize, fontWeight, lineHeight } from "@tenerife.music/ui";

import { TokenCard, TokenExplorer } from "@/components/docs/TokenExplorer";
import { PageShell } from "@/components/layout/PageShell";

export default function TypographyPage() {
  return (
    <PageShell>
      <TokenExplorer
        title="Typography Tokens"
        description="Font families, sizes, weights, line heights, and letter spacing."
      >
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Font Families</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(fontFamily).map(([key, value]) => {
                const fontFamilyValue = Array.isArray(value) ? value.join(", ") : String(value);
                const fontFamilyStyle = Array.isArray(value) ? String(value[0]) : String(value);
                return (
                  <TokenCard
                    key={key}
                    name={key}
                    value={fontFamilyValue}
                    preview={
                      <div className="text-sm" style={{ fontFamily: fontFamilyStyle }}>
                        The quick brown fox jumps over the lazy dog
                      </div>
                    }
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Font Sizes</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(fontSize).map(([key, value]) => {
                const size = Array.isArray(value) ? value[0] : value;
                const lineHeightValue =
                  Array.isArray(value) && value[1]?.lineHeight ? value[1].lineHeight : "normal";
                const fontSizeValue = Array.isArray(size) ? size[0] : size;
                const fontSizeString = String(fontSizeValue);
                return (
                  <TokenCard
                    key={key}
                    name={`text-${key}`}
                    value={fontSizeString}
                    preview={
                      <div style={{ fontSize: fontSizeString, lineHeight: lineHeightValue }}>
                        Aa
                      </div>
                    }
                    description={`Line height: ${lineHeightValue}`}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Font Weights</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {Object.entries(fontWeight).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`font-${key}`}
                  value={value}
                  preview={
                    <div style={{ fontWeight: value }} className="text-sm">
                      Weight {key}
                    </div>
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Line Heights</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {Object.entries(lineHeight).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`leading-${key}`}
                  value={value}
                  preview={
                    <div style={{ lineHeight: value }} className="text-sm">
                      Line height {key}
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
