# Carousel Component — Creation Report

**Pipeline:** Component Creation Pipeline (C0-C10)  
**Task ID:** TUI_EXT_CAROUSEL_001  
**Date Created:** 2026-01-29  
**Last Updated:** 2026-01-29  
**Component Name:** Carousel  
**Exported Name:** `Carousel`  
**Layer:** Extension  
**Category:** carousel (compound, batteries-included)

## Pipeline Progress Tracker

| Step | Name | Status | Estimated Time |
|------|------|--------|----------------|
| C0 | Authority & Lock Check | ✅ Complete | 15 min |
| C1 | Component Classification | ✅ Complete | 15 min |
| C2 | Token Mapping Design | ✅ Complete | 30 min |
| C3 | API Design & Contract | ✅ Complete | 30 min |
| C4 | Component Scaffold | ✅ Complete | 5 min |
| C5 | Token-Based Implementation | ✅ Complete | 1-2 hours |
| C6 | Implementation Refinement | ✅ Complete | 30 min |
| C7 | Storybook Stories | ✅ Complete | 1 hour |
| C8 | Tests | ✅ Complete | 1 hour |
| C9 | Token Compliance Validation | ✅ Complete | 15 min |
| C10 | Export Registration | ✅ Complete | 15 min |

**Total Estimated Time:** 6 hours

---

## C0 — Authority & Lock Check

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Component does not exist in codebase (grep: no Carousel in src)
- Extension layer appropriate (Extension Capability per EXTENSION_CAPABILITY_MAP — Hero carousel capability)
- No Foundation conflicts; Carousel not in FOUNDATION_LOCK.md
- Authority verified against EXTENSION_STATE.md, FOUNDATION_LOCK.md, EXTENSION_AUTHORITY
- Design-only completed per task (design_only_completed: true)

**Changes:** None  
**Artifacts:** Report created at `docs/reports/creation/Carousel_CREATION_REPORT.md`

---

## C1 — Component Classification & Justification

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Classified as: **Composite** (compound component, batteries-included controls and indicators)
- Role: Extension-level carousel/slider with compound-only API; no visual props; theme-aware via internal tokens
- Category: **carousel** (dedicated directory `src/COMPOSITION/carousel/Carousel/`)
- Justification: Identified gap — no Carousel/Slider capability; Phase L.3→L.4; compound-only, batteries-included per task

**Classification Details:**
- **Type:** Composite (Extension Capability)
- **Layer:** Extension (COMPOSITION)
- **Category:** carousel (compound-only, no variant/size in public API)
- **Role:** Production-grade carousel/slider with Root, Track, Slide, Controls, Prev, Next, Indicators
- **Use Cases:** Hero sections, content sliders, image galleries (composed by HeroMedia and product-level components)

**Design decisions (from task):**
- compound_only: true
- batteries_included: true
- no_variants: true
- no_size: true
- no_token_props: true
- no_items_api: true

**Changes:** None  
**Artifacts:** Classification documented in report

---

## C2 — Token Mapping Design

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- **Internal tokens only** — no token props in public API (task: no_token_props)
- All visual styling via `carousel.tokens.ts` (extension-only); theme support automatic via semantic tokens
- Motion GAP: NO MOTION BY DESIGN for slide change (task non-goals: swipe animations); optional transition via existing motion tokens for opacity/transform if needed
- A11Y and focus behavior defined per task

**Token Mapping Table (internal only):**

| Element / usage | Token Domain | Token Type | Responsive? | Notes |
|----------------|-------------|------------|-------------|-------|
| Track container | LAYOUT / spacing | gap, overflow | No | Existing spacing tokens; overflow-hidden |
| Slide wrapper | layout | — | No | Flex/grid alignment via existing layout tokens |
| Controls container | spacing | gap | No | gap-sm between Prev/Next |
| Prev/Next buttons | Foundation Button | — | No | Compose Foundation Button; no visual props |
| Indicators container | spacing | gap | No | gap-xs between dots |
| Indicator dot | STATE / surface | background, radius | No | Semantic tokens for active/inactive |
| Focus ring (controls) | INTERACTION | focus ring | No | Foundation Button handles focus |

**Token requirements:**
- **Foundation tokens:** spacing (gap-xs, gap-sm), layout (overflow, flex)
- **Component tokens:** carousel.tokens.ts — track, controls, indicators (reference SPACING_AUTHORITY, STATE_AUTHORITY)
- **No new token domains** — Extension-only ownership; theme-aware via semantic tokens

**Motion GAP Evaluation:**
- Component has state/spatial changes: slide index change
- **Resolution:** NO MOTION BY DESIGN (task non-goals: swipe animations, gesture physics)
- If minimal transition desired later: use existing MOTION_TOKENS transition preset (opacity/transform) internally only
- Reduced motion: N/A for no-motion design; if motion added later, must respect prefers-reduced-motion

**A11Y Requirements (from task):**
- Roles: region, button (controls)
- ARIA: aria-roledescription="carousel", aria-live="polite"
- Keyboard: ArrowLeft/ArrowRight, ArrowUp/ArrowDown, Tab/Shift+Tab
- Focus: No focus traps; controls keyboard-accessible; slide change does not break tab order

**Focus Behavior:**
- NOT modal (no focus trap)
- Tab order: DOM order = navigation order
- Controls (Prev/Next): keyboard-accessible (Enter/Space, Arrows)
- Indicators: optional keyboard (arrow keys or Tab to indicator then Enter)

**Loading State:** Not applicable

**Changes:** None  
**Artifacts:** Token mapping (internal only), Motion GAP resolution, A11Y requirements

---

## C3 — API Design & Contract Definition

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Public API: compound-only; no variant, size, theme, gap, padding, background, items (task forbidden_props)
- Root props: index?, defaultIndex?, onIndexChange?, orientation?, loop?, controls?, indicators?
- Compound slots: Carousel.Root, Carousel.Track, Carousel.Slide, Carousel.Controls, Carousel.Prev, Carousel.Next, Carousel.Indicators

**Public API (Root only — behavioral props):**

```typescript
/** Orientation of the carousel */
export type CarouselOrientation = "horizontal" | "vertical";

/** CarouselRoot props — no visual props */
export interface CarouselRootProps {
  /** Controlled current slide index (0-based) */
  index?: number;
  /** Default slide index when uncontrolled */
  defaultIndex?: number;
  /** Callback when slide index changes */
  onIndexChange?: (index: number) => void;
  /** Direction of slide flow */
  orientation?: CarouselOrientation;
  /** Whether to loop from last to first and vice versa */
  loop?: boolean;
  /** Whether to show prev/next controls (default: true when Controls slot used) */
  controls?: boolean;
  /** Whether to show indicator dots (default: true when Indicators slot used) */
  indicators?: boolean;
  /** Accessibility: region label */
  "aria-label"?: string;
}

/** CarouselTrack, CarouselSlide, CarouselControls, CarouselPrev, CarouselNext, CarouselIndicators — no visual props; composition only */
```

**Exported types:**
- `CarouselRootProps`
- `CarouselOrientation`
- (Internal: CarouselTrackProps, CarouselSlideProps, etc. — minimal or none in public API)

**No size mapping** — component has no size prop (task: no_size).  
**No variant mapping** — component has no variant prop (task: no_variants).

**A11Y Contract:**
- Root: aria-label or aria-labelledby for region
- Region: role="region" (or implicit), aria-roledescription="carousel"
- Live: aria-live="polite" for slide change announcement
- Prev/Next: aria-label="Previous slide" / "Next slide"
- Indicators: aria-label per dot "Slide N" or use roledescription

**Input Contract:**
- Keyboard: ArrowLeft/Right (horizontal), ArrowUp/Down (vertical) change slide
- Prev/Next: Enter/Space activate
- No focus trap; tab order preserved

**Error State:** Not applicable

**Changes:** None  
**Artifacts:** API contract (compound-only, Root props, compound slots)

---

## C4 — Component Scaffold Generation

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Scaffold generator executed: `pnpm run component:generate -- Carousel --category composite`
- Component moved from `src/COMPOSITION/overlays/Carousel` to `src/COMPOSITION/carousel/Carousel/` per task file_structure
- Additional files created: Carousel.types.ts, Carousel.context.tsx, Carousel.constants.ts, Carousel.controls.tsx, Carousel.indicators.tsx, Carousel.utils.ts, carousel.tokens.ts

**Changes:** Scaffold created and moved  
**Artifacts:** `src/COMPOSITION/carousel/Carousel/` with all implementation files

---

## C5 — Token-Based Implementation

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Compound component implemented: Root (state, context, keyboard), Track (overflow, transform), Slide, Controls (Prev/Next via Foundation Button), Indicators (dots via CAROUSEL_TOKENS)
- Internal tokens only in carousel.tokens.ts (track, slide, controls gap, indicators gap, indicator active/inactive)
- No raw values; semantic tokens for indicator (--tm-muted, --tm-primary)

**Changes:** Full implementation  
**Artifacts:** Carousel.tsx, Carousel.controls.tsx, Carousel.indicators.tsx, carousel.tokens.ts

---

## C6 — Implementation Refinement

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Foundation composition: Prev/Next use Foundation Button (variant="secondary", size="md"); no className/style on Button
- Code structure: context, utils, constants, types in separate files; compound export Carousel.Root, .Track, .Slide, .Controls, .Prev, .Next, .Indicators

**Changes:** None beyond C5  
**Artifacts:** N/A

---

## C7 — Storybook Stories

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Default (compound usage), Orientation (horizontal/vertical), Loop, Controlled (index/onIndexChange), LongContent (many slides)
- Title: UI / Extension / Carousel
- No Matrix/States/SizesGallery (component has no variant/size per task)

**Changes:** Carousel.stories.tsx updated  
**Artifacts:** 5 stories

---

## C8 — Tests

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Rendering: region role, roledescription, slides, Prev/Next buttons, indicators tablist
- Interactions: Next/Prev click, indicator click
- Keyboard: ArrowRight/ArrowLeft when root focused
- Controlled: defaultIndex
- A11Y: axe check passes

**Changes:** Carousel.test.tsx updated  
**Artifacts:** 11 tests passing

---

## C9 — Token Compliance Validation

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- No raw values in component code; CAROUSEL_TOKENS and semantic tokens (--tm-muted, --tm-primary) only
- Motion: NO MOTION BY DESIGN (task non-goals: swipe animations)

**Changes:** None (validation only)  
**Artifacts:** Compliance verified

---

## C10 — Export Registration & Lock Propagation

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Carousel exported from `src/index.ts`
- Types exported from `src/index.ts`
- `src/COMPOSITION/index.ts` re-exports from carousel
- `docs/architecture/EXTENSION_STATE.md` updated (Carousel 3.2 ALLOWED)
- Creation report updated (C4–C10)

**Changes:** Export and documentation updates  
**Artifacts:** Index exports, EXTENSION_STATE.md, this report
