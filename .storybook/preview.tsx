import "../src/styles/globals.css";
import "../src/theme/global.css";
import "./storybook-overrides.css";

import type { Preview } from "@storybook/react-vite";
import React from "react";

import { initThemeSync } from "../src/theme/applyMode";
import { __checkStateMatrix, updateStateMatrixFromTokens } from "../src/theme/applyStateMatrix";
import { ThemeProvider } from "../src/theme/ThemeProvider";

// Synchronous theme initialization - sets CSS variables BEFORE first React render
// This ensures Button and other components have token-driven colors on initial render
// Called at module top-level (NOT in decorators, hooks, or effects) for immediate execution
// Uses initThemeSync which properly sets DOM attributes, classes, and CSS variables
if (typeof window !== "undefined") {
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "preview.tsx:16",
      message: "initThemeSync call start",
      data: {
        hasWindow: typeof window !== "undefined",
        hasDocument: typeof document !== "undefined",
        hasDocumentElement: typeof document !== "undefined" && !!document.documentElement,
      },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "A",
    }),
  }).catch(() => {});
  // #endregion
  initThemeSync("day", "tm_mode");

  // Synchronous state matrix initialization - sets CSS variables BEFORE first React render
  // This ensures all components have token-driven states on initial render
  // Called at module top-level (NOT in decorators, hooks, or effects) for immediate execution
  // State variables are injected synchronously after color variables using Universal State Matrix
  updateStateMatrixFromTokens("day");

  // #region agent log
  // Check CSS rules and computed styles after initialization
  if (typeof document !== "undefined" && typeof getComputedStyle !== "undefined") {
    setTimeout(() => {
      const root = document.documentElement;
      const primaryHoverVar = root.style.getPropertyValue("--button-primary-hover-bg");
      const primaryHoverComputed = getComputedStyle(root).getPropertyValue(
        "--button-primary-hover-bg",
      );

      // Check if CSS rule exists in stylesheets
      let hoverRuleExists = false;
      let hoverRuleHasImportant = false;
      try {
        for (let i = 0; i < document.styleSheets.length; i++) {
          try {
            const sheet = document.styleSheets[i];
            if (sheet.cssRules) {
              for (let j = 0; j < sheet.cssRules.length; j++) {
                const rule = sheet.cssRules[j];
                if (rule instanceof CSSStyleRule) {
                  // Check for escaped colon syntax: .hover\:bg-button-primary-hover:hover
                  const selector = rule.selectorText || "";
                  // Check for plugin-generated rules: .hover\:bg-button-primary-hover:hover
                  if (
                    selector.includes("hover\\:bg-button-primary-hover") ||
                    selector.includes("hover:bg-button-primary-hover")
                  ) {
                    hoverRuleExists = true;
                    hoverRuleHasImportant =
                      rule.style.getPropertyPriority("background-color") === "important";
                    break;
                  }
                }
              }
            }
          } catch (e) {
            // Cross-origin stylesheet, skip
          }
        }
      } catch (e) {
        // Cannot access stylesheets
      }

      fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "preview.tsx:42",
          message: "CSS rules and variables check (post-fix)",
          data: {
            primaryHoverVar,
            primaryHoverComputed,
            hoverRuleExists,
            hoverRuleHasImportant,
            hasDocumentElement: !!root,
            isIframe: window.self !== window.top,
          },
          timestamp: Date.now(),
          sessionId: "debug-session",
          runId: "post-fix",
          hypothesisId: "C",
        }),
      }).catch(() => {});
    }, 100);
  }
  // #endregion

  // #region agent log
  if (typeof document !== "undefined" && document.documentElement) {
    const afterVar = document.documentElement.style.getPropertyValue("--tm-primary");
    const computedVar = getComputedStyle(document.documentElement).getPropertyValue("--tm-primary");
    const isIframe = window.self !== window.top;
    const allStyles = Array.from(document.documentElement.style).filter((key) =>
      key.startsWith("--tm-"),
    );
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "preview.tsx:20",
        message: "initThemeSync call end",
        data: {
          tmPrimaryInline: afterVar,
          hasInlineValue: !!afterVar,
          tmPrimaryComputed: computedVar,
          hasComputedValue: !!computedVar,
          isIframe,
          allTmVariables: allStyles,
          documentLocation: window.location.href,
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "D",
      }),
    }).catch(() => {});
    // Expose global function for manual testing in iframe context ONLY
    // This helper verifies that all critical color variables are set correctly
    (window as any).__checkThemeVars = () => {
      // Verify we're in iframe context, not manager
      const isIframe = window.self !== window.top;
      if (!isIframe) {
        console.warn(
          "[Theme] __checkThemeVars() should only be called in Storybook iframe context, not manager",
        );
      }

      const root = document.documentElement;

      // Critical color variables that MUST be set
      const criticalVars = [
        "--tm-primary",
        "--tm-primary-foreground",
        "--tm-secondary",
        "--tm-secondary-foreground",
        "--tm-accent",
        "--tm-accent-foreground",
        "--background",
        "--foreground",
        "--muted",
        "--muted-foreground",
        "--destructive",
        "--destructive-foreground",
      ];

      // Check all critical variables
      const varStatus: Record<string, { inline: string; computed: string; hasValue: boolean }> = {};
      let allPresent = true;

      for (const varName of criticalVars) {
        const inline = root.style.getPropertyValue(varName);
        const computed = getComputedStyle(root).getPropertyValue(varName);
        const hasValue = !!computed && computed.trim() !== "";

        varStatus[varName] = { inline, computed, hasValue };

        if (!hasValue) {
          allPresent = false;
          console.error(`[Theme] Missing critical variable: ${varName}`);
        }
      }

      const inline = root.style.getPropertyValue("--tm-primary");
      const computed = getComputedStyle(root).getPropertyValue("--tm-primary");
      const allTmVars = Array.from(root.style).filter((k) => k.startsWith("--tm-"));

      // Check if Button components are using the variables
      // Filter buttons to only check those in the story content area (not Storybook UI)
      const storyContent =
        document.querySelector('[data-testid="story"]') ||
        document.querySelector(".sb-story") ||
        document.querySelector("main") ||
        document.body;
      const allButtons = document.querySelectorAll("button");
      const storyButtons = Array.from(allButtons)
        .filter((btn) => {
          // Exclude Storybook UI buttons (toolbar, sidebar, etc.)
          const isStorybookUI =
            btn.closest('[data-testid="storybook-panel"]') ||
            btn.closest(".sb-bar") ||
            btn.closest('[class*="sidebar"]') ||
            btn.closest('[class*="toolbar"]');
          return !isStorybookUI && storyContent.contains(btn);
        })
        .sort((a, b) => {
          // Sort by visual position: top to bottom, left to right
          const rectA = a.getBoundingClientRect();
          const rectB = b.getBoundingClientRect();
          // First by top position (Y)
          if (Math.abs(rectA.top - rectB.top) > 5) {
            return rectA.top - rectB.top;
          }
          // Then by left position (X)
          return rectA.left - rectB.left;
        });

      // Check what Tailwind generates for bg-primary
      const testElement = document.createElement("div");
      testElement.className = "bg-primary";
      testElement.style.display = "none";
      document.body.appendChild(testElement);
      const testComputedStyle = getComputedStyle(testElement);
      const bgPrimaryValue = testComputedStyle.backgroundColor;
      document.body.removeChild(testElement);

      const buttonStyles = storyButtons.slice(0, 5).map((btn, idx) => {
        const computedStyle = getComputedStyle(btn);
        const classes = btn.className || "";
        const classList = classes.split(" ").filter(Boolean);
        return {
          index: idx,
          classes,
          classList: classList.slice(0, 10), // First 10 classes for debugging
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          hasBgPrimary: classes.includes("bg-primary"),
          hasTextPrimary: classes.includes("text-primary"),
          innerHTML: btn.innerHTML.substring(0, 50), // First 50 chars for debugging
          parentElement: btn.parentElement?.tagName || "unknown",
          // Check if CSS variable is accessible
          tmPrimaryVar: getComputedStyle(document.documentElement).getPropertyValue("--tm-primary"),
        };
      });

      const result = {
        // Critical variables status
        criticalVars: varStatus,
        allCriticalPresent: allPresent,
        // Legacy fields for backward compatibility
        inline,
        computed,
        allTmVars,
        isIframe: window.self !== window.top,
        documentLocation: window.location.href,
        hasValue: !!computed,
        buttonCount: allButtons.length,
        storyButtonCount: storyButtons.length,
        buttonStyles,
        // Test what Tailwind generates for bg-primary - CRITICAL VERIFICATION
        bgPrimaryTest: {
          className: "bg-primary",
          computedBackgroundColor: bgPrimaryValue,
          isTransparent: bgPrimaryValue === "rgba(0, 0, 0, 0)" || bgPrimaryValue === "transparent",
          tmPrimaryVar: getComputedStyle(root).getPropertyValue("--tm-primary"),
          // Verify safelist is working
          safelistWorking:
            bgPrimaryValue !== "rgba(0, 0, 0, 0)" && bgPrimaryValue !== "transparent",
        },
      };

      // Log detailed results
      console.log("Theme Variables Check:", result);

      // Log summary
      if (allPresent && result.bgPrimaryTest.safelistWorking) {
        console.log("✅ [Theme] All critical variables present and Tailwind safelist working");
      } else {
        console.error("❌ [Theme] Issues detected:");
        if (!allPresent) {
          console.error("  - Missing critical variables");
        }
        if (!result.bgPrimaryTest.safelistWorking) {
          console.error(
            "  - Tailwind safelist not working: bg-primary produces transparent background",
          );
        }
      }
      // #region agent log
      fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "preview.tsx:66",
          message: "__checkThemeVars called",
          data: result,
          timestamp: Date.now(),
          sessionId: "debug-session",
          runId: "run1",
          hypothesisId: "F",
        }),
      }).catch(() => {});
      // #endregion
      return result;
    };

    // Expose universal state matrix verification helper for manual testing in iframe context ONLY
    // This helper verifies that all state variables from State Matrix are set correctly
    (window as any).__checkStateMatrix = () => {
      // Verify we're in iframe context, not manager
      const isIframe = window.self !== window.top;
      if (!isIframe) {
        console.warn(
          "[State Matrix] __checkStateMatrix() should only be called in Storybook iframe context, not manager",
        );
      }

      const result = __checkStateMatrix("day");

      // Log detailed results
      console.log("State Matrix Check:", result);

      // Log summary
      if (result.allSet) {
        console.log("✅ [State Matrix] All state variables present");

        // Log component breakdown
        for (const [component, breakdown] of Object.entries(result.componentBreakdown)) {
          if (breakdown.missing.length === 0) {
            console.log(
              `✅ [State Matrix] ${component}: ${breakdown.set}/${breakdown.total} variables set`,
            );
          } else {
            console.warn(
              `⚠️ [State Matrix] ${component}: ${breakdown.set}/${breakdown.total} variables set, ${breakdown.missing.length} missing`,
            );
          }
        }

        // Verify states are distinct (base, hover, active, focus, disabled, loading)
        const primaryBase = result.values["--button-primary-base-bg"];
        const primaryHover = result.values["--button-primary-hover-bg"];
        const primaryActive = result.values["--button-primary-active-bg"];
        const primaryFocus = result.values["--button-primary-focus-bg"];
        const primaryDisabled = result.values["--button-primary-disabled-bg"];
        const primaryLoading = result.values["--button-primary-loading-bg"];

        // Check that all required states are present
        const allStatesPresent =
          primaryBase &&
          primaryHover &&
          primaryActive &&
          primaryFocus &&
          primaryDisabled &&
          primaryLoading;

        if (allStatesPresent) {
          // Verify interactive states are distinct (hover should be darker than base, active darker than hover)
          const baseLighterThanHover = primaryBase !== primaryHover;
          const hoverLighterThanActive = primaryHover !== primaryActive;

          if (baseLighterThanHover && hoverLighterThanActive) {
            console.log(
              "✅ [State Matrix] Button.primary states are present and visually distinct",
            );
            console.log(
              `   Base: ${primaryBase}, Hover: ${primaryHover}, Active: ${primaryActive}, Focus: ${primaryFocus}, Disabled: ${primaryDisabled}, Loading: ${primaryLoading}`,
            );
          } else {
            console.warn("⚠️ [State Matrix] Some Button.primary states have identical values");
          }
        } else {
          console.warn("⚠️ [State Matrix] Some Button.primary states are missing");
        }
      } else {
        console.error("❌ [State Matrix] Missing state variables:", result.missing);
        console.error("❌ [State Matrix] Component breakdown:", result.componentBreakdown);
      }

      return result;
    };

    // Legacy helper for backward compatibility
    (window as any).__checkStateVars = () => {
      console.warn(
        "[State Matrix] __checkStateVars() is deprecated. Use __checkStateMatrix() instead.",
      );
      return (window as any).__checkStateMatrix();
    };

    console.log(
      "[Storybook Theme Init] Theme variables initialized. Use __checkThemeVars() in console to verify.",
    );
    console.log(
      "[Storybook State Matrix Init] Universal State Matrix initialized. Use __checkStateMatrix() in console to verify.",
    );
    // Check again after a delay to see if variables persist
    setTimeout(() => {
      const delayedInline = document.documentElement.style.getPropertyValue("--tm-primary");
      const delayedComputed = getComputedStyle(document.documentElement).getPropertyValue(
        "--tm-primary",
      );
      fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "preview.tsx:25",
          message: "initThemeSync delayed check",
          data: {
            tmPrimaryInline: delayedInline,
            hasInlineValue: !!delayedInline,
            tmPrimaryComputed: delayedComputed,
            hasComputedValue: !!delayedComputed,
          },
          timestamp: Date.now(),
          sessionId: "debug-session",
          runId: "run1",
          hypothesisId: "D",
        }),
      }).catch(() => {});
    }, 1000);
  }
  // #endregion
}

const preview: Preview = {
  parameters: {
    // Note: argTypesRegex is removed for Storybook 10+ compatibility
    // All actions must be explicit spies using fn() from 'storybook/test'
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: "#ffffff",
        },

        dark: {
          name: "dark",
          value: "#0a0a0a",
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
      options: {
        checks: { "color-contrast": { options: { noScroll: true } } },
      },
    },
  },

  decorators: [
    (Story) => {
      // #region agent log
      if (typeof document !== "undefined" && document.documentElement) {
        const varsAtRender = document.documentElement.style.getPropertyValue("--tm-primary");
        const computedAtRender = getComputedStyle(document.documentElement).getPropertyValue(
          "--tm-primary",
        );
        fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "preview.tsx:142",
            message: "Story decorator render",
            data: {
              tmPrimaryInline: varsAtRender,
              hasInlineValue: !!varsAtRender,
              tmPrimaryComputed: computedAtRender,
              hasComputedValue: !!computedAtRender,
            },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "run1",
            hypothesisId: "E",
          }),
        }).catch(() => {});
      }
      // #endregion
      return (
        <ThemeProvider defaultMode="day">
          <div style={{ padding: "2rem" }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
