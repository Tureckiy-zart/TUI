# DX T10 Badge/Carousel/A11Y Audit

**Task ID:** TUI_DX_T10_CAROUSEL_BADGE_A11Y_MISMATCH_AUDIT  
**Date:** 2026-02-09  
**Scope:** Pet project (`tui-dx-doc-aware/app/page.tsx`) + library static audit  
**Runtime:** Executed locally via `pnpm dev` (Next.js dev server on `http://localhost:3001`).

## Repro steps
1. Open `/home/tureckiy/Projects/test-lib-with_knowledge/tui-dx-doc-aware/app/page.tsx`.
2. Locate the Extended playground section with `Carousel.Root` and the `Row` that wraps `Carousel.Prev`, `Carousel.Indicators`, `Carousel.Next`.
3. Locate `CardHeader` sections that contain `Badge` (and `Chip`) without an explicit layout wrapper.
4. Review library implementation for Badge, Chip, Carousel indicators, and layout primitives to confirm defaults and alignment behavior.

## Observed vs Expected
1. **Badge/Chip inline default**
   - Observed: `Badge` and `Chip` are rendered inside `CardHeader` and in a `Row` in the hero area. In `CardHeader`, default layout (Stack) stretches children; this makes badges appear full-width in common composition scenarios.
   - Expected: Badge/Chip should be inline by default, sized to content, and should not stretch to full width even when placed in `Stack`/`Row` containers.

2. **Carousel dots alignment**
   - Observed: In the pet page, `Carousel.Indicators` are placed inside a `Row` with `justify="between"` alongside Prev/Next. The dots are centered between buttons, not centered relative to the carousel container, which reads as left-shifted in real layouts.
   - Expected: Indicators should be centered relative to the carousel container by default.

3. **Card-mode viability**
   - Observed: Carousel uses `min-w-full` slides with 100% translate per index. There are no props for slides-per-view, peek, or gap. This implies single-slide viewport only.
   - Expected: If multi-card viewport is desired, it should be a separate pattern (rail/scroller), not the current Carousel.

4. **Visible status/loading strip**
   - Observed: A blue full-width strip appears with the text "Listening" (matches the Tabs trigger label). No corresponding DOM element with `aria-live` or visible status styling was found in the rendered markup.
   - Expected: Any live-region or status element should be visually hidden by default unless explicitly presented.

## Root cause
1. **Badge/Chip stretching**
   - Root cause: Default flex behavior. `CardHeader` is a `Stack` with default `align="stretch"`, which stretches children to full width. Badge/Chip need to opt out of stretch even inside flex containers to meet the inline expectation.

2. **Carousel dots alignment**
   - Root cause: Default layout in compound usage. When indicators are placed inline between Prev/Next (a common pattern), they are centered between buttons rather than centered relative to the carousel container.

3. **Card-mode**
   - Root cause: Current Carousel implementation is a single-viewport slider (100% width per slide). No API exists for multi-card presentation.

4. **Status/loading strip**
   - Root cause: **External to the library.** Runtime inspection did not reveal a library-owned live-region or status element rendering the strip. The strip likely comes from browser/extension/selection overlay rather than TUI components.

## Decision (doc-only vs code-fix)
- **Badge/Chip:** **Code fix**. Update default layout to opt out of stretch and keep intrinsic width inside flex containers.
- **Carousel dots:** **Code fix**. Center indicators relative to the container even when placed inline with Prev/Next.
- **Card-mode:** Doc-only. Not supported by Carousel; recommend separate Rail/Scroller pattern (future task).
- **Status/loading strip:** Doc-only until runtime repro identifies a library-owned source.
- **Code fixes:**
  - Badge/Chip tokens now use `w-fit h-fit` to prevent stretch in flex/stack contexts.
  - Carousel indicators now include `mx-auto` to center within container even when placed inline.

## Result verification
- **Runtime verification:** `pnpm dev` run; page rendered on `http://localhost:3001`. No library-owned `aria-live`/status element found in DOM that matches the strip.
- **Doc updates:** Added short usage notes for Badge/Carousel in `docs/reference/API_REFERENCE.md`.

## Notes
- Badge inline default now enforced via tokens (`BADGE_TOKENS.layout = "inline-flex items-center w-fit h-fit"`).
- Chip inline default now enforced via tokens (`CHIP_TOKENS.layout = "inline-flex items-center gap-xs w-fit h-fit"`).
- Carousel indicators use `justify-center` plus `mx-auto` to center relative to container even when placed inline with controls.
- Carousel card-mode is not supported in current API or implementation.
