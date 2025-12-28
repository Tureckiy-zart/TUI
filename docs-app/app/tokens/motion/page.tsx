"use client";

// Motion tokens are exported from the library
import {
  motionDurations,
  motionEasings,
  motionFade,
  motionScale,
  motionSlide,
  motionTransitions,
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
            <h3 className="mb-md text-xl font-semibold">Durations</h3>
            <div className="grid grid-cols-2 gap-md md:grid-cols-4">
              {Object.entries(motionDurations).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`duration-${key}`}
                  value={value}
                  preview={
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
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
            <h3 className="mb-md text-xl font-semibold">Easings</h3>
            <div className="grid grid-cols-1 gap-md md:grid-cols-3">
              {Object.entries(motionEasings).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`easing-${key}`}
                  value={value}
                  preview={
                    <div className="flex h-20 w-full items-end rounded bg-muted">
                      <div
                        className="w-4 rounded-t bg-primary"
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
            <h3 className="mb-md text-xl font-semibold">Transitions</h3>
            <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(motionTransitions).map(([key, value]) => (
                <TokenCard
                  key={key}
                  name={`transition-${key}`}
                  value={value}
                  preview={
                    <div
                      className="h-full w-full cursor-pointer rounded bg-primary hover:scale-105"
                      style={{ transition: value }}
                    />
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Fade Animations</h3>
            <div className="grid grid-cols-1 gap-md md:grid-cols-2">
              <TokenCard
                name="fade-in"
                value={JSON.stringify(motionFade.in, null, 2)}
                preview={<div className="h-full w-full rounded bg-primary opacity-0">Fade In</div>}
              />
              <TokenCard
                name="fade-out"
                value={JSON.stringify(motionFade.out, null, 2)}
                preview={
                  <div className="h-full w-full rounded bg-primary opacity-100">Fade Out</div>
                }
              />
            </div>
          </div>

          <div>
            <h3 className="mb-md text-xl font-semibold">Scale Animations</h3>
            <div className="grid grid-cols-1 gap-md md:grid-cols-2">
              <TokenCard
                name="scale-in"
                value={JSON.stringify(motionScale.in, null, 2)}
                preview={
                  <div className="flex h-full w-full items-center justify-center rounded bg-primary">
                    Scale In
                  </div>
                }
              />
              <TokenCard
                name="scale-out"
                value={JSON.stringify(motionScale.out, null, 2)}
                preview={
                  <div className="flex h-full w-full items-center justify-center rounded bg-primary">
                    Scale Out
                  </div>
                }
              />
            </div>
          </div>

          <div>
            <h3 className="mb-md text-xl font-semibold">Slide Animations</h3>
            <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(motionSlide).map(([direction, animations]) => (
                <div key={direction} className="space-y-2">
                  <h4 className="font-medium capitalize">{direction}</h4>
                  <TokenCard
                    name={`slide-${direction}`}
                    value={JSON.stringify(animations, null, 2)}
                    preview={
                      <div className="flex h-full w-full items-center justify-center rounded bg-primary">
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
