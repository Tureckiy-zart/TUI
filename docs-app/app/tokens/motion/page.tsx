"use client";

// Motion tokens are exported from the library
import {
    motionV2Durations,
    motionV2Easings,
    motionV2Fade,
    motionV2Scale,
    motionV2Slide,
    motionV2Transitions,
} from "@tenerife.music/ui";

import { TokenCard, TokenExplorer } from "@/components/docs/TokenExplorer";
import { PageShell } from "@/components/layout/PageShell";

export default function MotionPage() {
  return (
    <PageShell>
      <TokenExplorer
        title="Motion Tokens"
        description="Durations, easings, transitions, and animation presets for smooth motion."
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Durations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(motionV2Durations).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`duration-${key}`}
                  value={value}
                  preview={
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: "100%",
                          transitionDuration: typeof value === "string" ? value : String(value),
                        }}
                      />
                    </div>
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Easings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(motionV2Easings).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`easing-${key}`}
                  value={value}
                  preview={
                    <div className="w-full h-20 bg-muted rounded flex items-end">
                      <div
                        className="w-4 bg-primary rounded-t"
                        style={{
                          height: "80%",
                          transition: "height 1s",
                          transitionTimingFunction: value,
                        }}
                      />
                    </div>
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Transitions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(motionV2Transitions).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`transition-${key}`}
                  value={value}
                  preview={
                    <div
                      className="w-full h-full bg-primary rounded cursor-pointer hover:scale-105"
                      style={{ transition: value }}
                    />
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Fade Animations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TokenCard
                name="fade-in"
                value={JSON.stringify(motionV2Fade.in, null, 2)}
                preview={
                  <div className="w-full h-full bg-primary rounded opacity-0">
                    Fade In
                  </div>
                }
              />
              <TokenCard
                name="fade-out"
                value={JSON.stringify(motionV2Fade.out, null, 2)}
                preview={
                  <div className="w-full h-full bg-primary rounded opacity-100">
                    Fade Out
                  </div>
                }
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Scale Animations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TokenCard
                name="scale-in"
                value={JSON.stringify(motionV2Scale.in, null, 2)}
                preview={
                  <div className="w-full h-full bg-primary rounded flex items-center justify-center">
                    Scale In
                  </div>
                }
              />
              <TokenCard
                name="scale-out"
                value={JSON.stringify(motionV2Scale.out, null, 2)}
                preview={
                  <div className="w-full h-full bg-primary rounded flex items-center justify-center">
                    Scale Out
                  </div>
                }
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Slide Animations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(motionV2Slide).map(([direction, animations]) => (
                <div key={direction} className="space-y-2">
                  <h4 className="font-medium capitalize">{direction}</h4>
                  <TokenCard
                    name={`slide-${direction}`}
                    value={JSON.stringify(animations, null, 2)}
                    preview={
                      <div className="w-full h-full bg-primary rounded flex items-center justify-center">
                        Slide {direction}
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TokenExplorer>
    </PageShell>
  );
}
