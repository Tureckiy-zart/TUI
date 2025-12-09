"use client";

import {
  accentColors,
  primaryColors,
  secondaryColors,
  semanticColors,
  surfaceColors,
} from "@tenerife.music/ui";
import { useTheme } from "@tenerife.music/ui/theme";

import { TokenCard, TokenExplorer } from "@/components/docs/TokenExplorer";
import { PageShell } from "@/components/layout/PageShell";

// Note: This function is currently unused but kept for potential future use
// It uses semanticColors token as fallback instead of hardcoded color
function _hslToRgb(hsl: string, mode: "day" | "night" = "day"): string {
  let match = hsl.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);

  // Use semantic foreground color as fallback if match fails
  if (!match) {
    const fallbackHsl = semanticColors[mode].errorForeground;
    match = fallbackHsl.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
    if (!match) return "rgb(0, 0, 0)"; // Ultimate fallback
  }

  const h = parseFloat(match[1]) / 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function ColorScale({ name, scale }: { name: string; scale: Record<string, string> }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-11">
        {Object.entries(scale).map(([key, hsl]) => (
          <TokenCard
            key={key}
            name={`${name}-${key}`}
            value={`hsl(${hsl})`}
            preview={
              <div className="h-full w-full rounded" style={{ backgroundColor: `hsl(${hsl})` }} />
            }
          />
        ))}
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const { mode } = useTheme();

  return (
    <PageShell>
      <TokenExplorer
        title="Color Tokens"
        description="Complete color palette system including primary, accent, secondary, semantic, and surface colors."
      >
        <ColorScale name="Primary" scale={primaryColors} />
        <ColorScale name="Accent" scale={accentColors} />
        <ColorScale name="Secondary" scale={secondaryColors} />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Semantic Colors</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(semanticColors[mode]).map(([key, hsl]) => (
              <TokenCard
                key={key}
                name={key}
                value={`hsl(${hsl})`}
                preview={
                  <div
                    className="h-full w-full rounded"
                    style={{ backgroundColor: `hsl(${hsl})` }}
                  />
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Surface Colors</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(surfaceColors[mode]).map(([key, hsl]) => (
              <TokenCard
                key={key}
                name={key}
                value={`hsl(${hsl})`}
                preview={
                  <div
                    className="h-full w-full rounded"
                    style={{ backgroundColor: `hsl(${hsl})` }}
                  />
                }
              />
            ))}
          </div>
        </div>
      </TokenExplorer>
    </PageShell>
  );
}
