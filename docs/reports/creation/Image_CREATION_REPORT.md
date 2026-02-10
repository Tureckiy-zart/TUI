# Image Component — Creation Report

**Pipeline:** Component Creation Pipeline (C0-C10)  
**Date Created:** 2026-02-09  
**Last Updated:** 2026-02-09  
**Component Name:** Image  
**Exported Name:** `Image`  
**Layer:** Extension  
**Category:** controls (primitive)

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
**Actual Time:** TBD

---

## C0 — Authority & Lock Check

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Component does NOT exist in codebase (verified via file scan and search in src/COMPOSITION and src/PRIMITIVES)
- Extension layer appropriate for this component (token-driven media primitive for consistent image handling)
- No Foundation conflicts detected (no Foundation Image component)
- Existing restriction note found in EXTENSION_STATE for a legacy `src/PRIMITIVES/Image/Image.tsx` (file not present). This task creates a NEW Extension component, not a Foundation primitive. Restriction was for API export decision on a non-existent legacy primitive and is not a lock.

**Changes:** Report created  
**Artifacts:** `docs/reports/creation/Image_CREATION_REPORT.md`

**Authority Check Results:**
- ✅ Image component does NOT exist in `src/COMPOSITION`
- ✅ Image component does NOT exist in `src/PRIMITIVES`
- ✅ Image is NOT listed in `FOUNDATION_LOCK.md`
- ✅ Image is NOT listed as a locked Extension capability
- ✅ Restriction note exists for legacy primitive path (no file on disk) — documented for reconciliation in C10

**Verification:**
- No existing `Image.tsx` files found in `src/`
- No `Image` export in `src/index.ts`
- Foundation layer remains locked; Extension creation permitted

---

## C1 — Component Classification & Justification

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Classified as: Primitive (Extension)
- Category: controls (primitive category maps to `src/COMPOSITION/controls/` via scaffold generator)

**Changes:** None (design only)  
**Artifacts:** Classification documented in report

**Classification Decision:**
- **Type:** Primitive (simple media primitive with minimal behavior)
- **Layer:** Extension (Foundation is locked; image handling is an app-level policy but needs a DX-safe Extension contract)
- **Category:** primitive (generator category; directory `controls/`)

**Role Definition:**
Image is a token-driven media primitive that renders a native `<img>` with a predictable layout contract, safe defaults, and explicit composition guidance for AspectRatio and fallback handling.

**Justification:**
- Prevents ad-hoc `<img>` usage that causes layout/overlay bugs
- Establishes a predictable contract for aspect ratio composition and object-fit behavior
- Provides a single DX-safe primitive to reduce custom wrappers and inconsistent fallbacks

---

## C2 — Token Mapping Design

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Token mapping table created
- Tokens verified to exist (radius, surface, border, motion if used)
- Motion GAP evaluated: NO MOTION BY DESIGN (image loading handled without animation)
- Composition contract aligned with AspectRatio and Surface guidance

**Changes:** None (design only)  
**Artifacts:** Token mapping table, motion GAP evaluation, composition constraints

### Token Mapping Table

| Prop/Concern | Token Domain | Token Type | Notes |
| --- | --- | --- | --- |
| radius | Radius | `borderRadius` (via tokenized `rounded-*`) | `none | sm | md | lg | xl | full` |
| border (optional) | Border/Color | `--tm-border-subtle` / `--tm-border-strong` (if exposed) | Only if border prop added; otherwise none |
| fallback surface | Surface | `surface.muted` | For fallback/background block when needed |
| object-fit | N/A | union prop | `cover | contain | fill | none | scale-down` (no raw values) |
| loading | HTML attribute | `loading` attr | `eager | lazy` |

### Token Existence Verification

- ✅ `borderRadius` tokens exist (see `src/FOUNDATION/tokens/radius.ts`)
- ✅ Surface tokens exist for muted/neutral backgrounds
- ✅ Border tokens exist (if border prop added)

### Motion GAP Evaluation

**Decision:** NO MOTION BY DESIGN  
**Rationale:** Image loading/fallback should be stable and predictable; no fade-in to avoid motion and token complexity. If motion is required later, it must use `MOTION_TOKENS` + reduced-motion support.

### Composition Constraints

- AspectRatio is media-only. Image must be safe as a child of AspectRatio with `fill` behavior documented.
- Text/content must be outside AspectRatio; use Surface or layout primitives adjacent to media.

---

## C3 — API Design & Contract

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Public props defined with explicit unions
- A11Y contract defined (decorative vs informative images)
- Composition rules explicitly documented

**Changes:** None (design only)  
**Artifacts:** API contract and usage examples

### Public Props (Draft)

- `src: string` (required)
- `alt: string` (required; allow `""` for decorative images)
- `fit?: "cover" | "contain" | "fill" | "none" | "scale-down"` (default: `cover`)
- `radius?: "none" | "sm" | "md" | "lg" | "xl" | "full"` (token-driven)
- `fill?: boolean` (default: `false`, uses absolute inset for AspectRatio composition)
- `loading?: "eager" | "lazy"` (default: `lazy`)
- `decoding?: "auto" | "sync" | "async"` (native attr, optional)
- `fallback?: React.ReactNode` (optional slot, rendered on error)
- `onError?: (event) => void` (if fallback supported)

### A11Y Contract

- Informative image: `alt` must be a meaningful string.
- Decorative image: `alt=""` allowed; no extra ARIA roles added.
- Keep native `<img>` semantics; avoid `role="img"` unless required.

### Usage Examples (Draft)

```tsx
<Image src="/cover.jpg" alt="Album cover" />

<AspectRatio ratio={16 / 9}>
  <Image src="/hero.jpg" alt="Hero" fit="cover" fill />
</AspectRatio>
```

### DX Contract Notes

- For aspect ratio: use `<AspectRatio><Image ... fill /></AspectRatio>`.
- Do NOT mix text siblings inside `AspectRatio`. Place text/content outside (use `Surface`, `Section`, `Column`, etc.).
- Do not invent `Stack` for examples; use existing layout primitives only.

---

## C4 — Component Scaffold Generation

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Scaffold generator executed successfully with category "primitive" (maps to `controls/`)
- Generated scaffold structure reviewed and approved

**Changes:** Scaffold files created  
**Artifacts:**
- `src/COMPOSITION/controls/Image/Image.tsx`
- `src/COMPOSITION/controls/Image/Image.stories.tsx`
- `src/COMPOSITION/controls/Image/Image.test.tsx`
- `src/COMPOSITION/controls/Image/Image.index.ts`

**Command:** `pnpm run component:generate -- Image --category primitive`

---

## C5 — Token-Based Implementation

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Implemented native `<img>` rendering with explicit `fit`, `radius`, and `fill` unions
- Added fallback handling on error with A11Y-safe role/labeling
- No raw sizes/colors/motion values; all styling via tokenized classes

**Changes:** Implementation completed  
**Artifacts:**
- `src/COMPOSITION/controls/Image/Image.tsx`

**Implementation Highlights:**
- `tokenCVA` variants for `fit` and `radius`
- `fill` applies absolute inset + full size to support AspectRatio composition
- `fallback` renders on error with `role="img"` + `aria-label` when informative

---

## C6 — Implementation Refinement

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- JSDoc added to all public props
- Composition warnings included for `fill` and AspectRatio usage
- Minimal branching with deterministic error state reset on `src` change

**Changes:** Refinement pass completed  
**Artifacts:**
- `src/COMPOSITION/controls/Image/Image.tsx`

---

## C7 — Storybook Stories

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Required stories added: Default, WithAspectRatio, FitMatrix, FallbackOrError
- Additional RadiusShowcase story added for token radius coverage
- No Stack usage in stories

**Changes:** Stories created/updated  
**Artifacts:**
- `src/COMPOSITION/controls/Image/Image.stories.tsx`

---

## C8 — Tests

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Render test for required `alt`/`src`
- Decorative `alt=""` allowed and non-noisy
- Fallback rendered on error when provided
- Fit and fill class mapping assertions
- A11Y check via axe

**Changes:** Tests created/updated  
**Artifacts:**
- `src/COMPOSITION/controls/Image/Image.test.tsx`

---

## C9 — Token Compliance Validation

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- No raw sizes/colors/motion values in component or stories
- Radius uses tokenized `rounded-*` classes
- Object-fit uses explicit union, not raw values

**Changes:** Validation recorded  
**Artifacts:**
- Validation noted in report

---

## C10 — Export + Registration

**Outcome:** Complete  
**Blocking:** no  
**Notes:**
- Exported `Image` and types in `src/index.ts`
- Exported from `src/COMPOSITION/controls/index.ts`
- Registered in `docs/architecture/EXTENSION_STATE.md`
- Progress updated in `docs/PROJECT_PROGRESS.md`
- API reference updated with Image usage rules

**Changes:** Registration completed  
**Artifacts:**
- `src/index.ts`
- `src/COMPOSITION/controls/index.ts`
- `docs/architecture/EXTENSION_STATE.md`
- `docs/PROJECT_PROGRESS.md`
- `docs/reference/API_REFERENCE.md`
