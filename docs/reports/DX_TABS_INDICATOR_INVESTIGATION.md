# DX Tabs Indicator Visual Leak Investigation

**Task ID:** TUI_TABS_INDICATOR_VISUAL_LEAK_INVESTIGATION  
**Date:** 2026-02-09  
**Scope:** Tabs indicator rendering in consumer UI (screenshot evidence) + library code inspection  
**Runtime:** Not required; analysis based on code and provided screenshots

## 1. Symptom description (what was seen in consumer UI)
- A full-width horizontal strip appears across the page.
- The strip aligns with the active tab label ("Listening") and visually resembles a system loading/progress element.
- The effect occurs in consumer code without custom styles and is visible inside a complex layout.

## 2. Confirmation: indicator identity
- The Tabs underline indicator is implemented as a `::after` pseudo-element on `Tabs.Trigger` (not as a separate DOM node).
- In `src/COMPOSITION/navigation/tabs/Tabs.tsx`, the underline variant adds:
  - `after:absolute after:bottom-0 after:left-0 after:right-0`
  - Indicator height/background/transition from `TABS_TOKENS.variant.underline.indicator.*`

## 3. Current implementation analysis
- Indicator is attached to the trigger element via `tabsTriggerVariants` compound variants.
- Indicator styling source:
  - `TABS_TOKENS.variant.underline.indicator.height` = `h-0.5`
  - `TABS_TOKENS.variant.underline.indicator.background` = `bg-[hsl(var(--tm-primary))]`
  - `TABS_TOKENS.variant.underline.indicator.position` = `absolute bottom-0 left-0 right-0`
- `Tabs.List` does not set `position: relative` or `overflow: hidden` by default.

## 4. Why visual leakage occurs
- The indicator’s absolute positioning is **relative to the trigger** element, not the list.
- If the trigger becomes **full width** (e.g., due to layout context or stretching), the `after:left-0 after:right-0` indicator expands across the full available width.
- Because the list has no containment (no overflow constraint), the underline can appear as a full-width bar across the layout.

## 5. Is this safe-by-default? (yes/no + why)
- **No.** The default indicator is safe only if triggers remain content-sized.
- In realistic layouts where triggers can stretch (flex containers, grid constraints, or inherited width), the indicator can visually leak and be misread as a system UI element.

## 6. Risk assessment for consumers
- Visual confusion: indicator can resemble a loading/progress bar.
- Layout bleed: indicator can appear to cross unrelated sections.
- DX fragility: consumers must understand and guard against container-driven width expansion.

## 7. Possible solution directions (no decision)
1. **Constrain indicator to content width**
   - Avoid `left/right: 0` on the trigger’s `::after` or replace with content-width constraints.
2. **Move indicator to `Tabs.List`**
   - Render the indicator once at the list level and position it based on the active trigger’s bounds.
3. **Add containment boundary**
   - Apply a containment strategy on `Tabs.List` (e.g., `overflow: hidden` or explicit width constraints) to prevent bleed.

---

## References (code)
- `src/COMPOSITION/navigation/tabs/Tabs.tsx`
- `src/FOUNDATION/tokens/components/tabs.ts`
