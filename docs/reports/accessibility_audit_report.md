# ♿ U6 Accessibility Audit Report

**Date:** 2025-11-26  
**Auditor:** Tenerife UI Upgrade Layer (Task U6)  
**Scope:** `src/components/**/*`, Storybook usage patterns, existing Jest suites, CI workflows, token system

---

## 1. Methodology

- Reviewed structural documentation in [`docs/PROJECT_PROGRESS.md`](../PROJECT_PROGRESS.md) plus historical findings from [`docs/reports/CRV_A11Y_REPORT.md`](CRV_A11Y_REPORT.md).
- Manually inspected every interactive component under `src/components/` with emphasis on buttons, inputs, navigational primitives, overlays/modals, cards, and section-level CTAs.
- Verified ARIA roles, keyboard flows, focus-visible styling, and reliance on tokenized colors (`src/tokens/*`) for contrast.
- Audited automation surface: Jest configuration, Storybook testing, and GitHub Actions workflows to confirm whether accessibility checks currently run.

---

## 2. Summary of Findings

| ID   | Category                         | Severity | Components / Areas                                                                       | Status  |
| ---- | -------------------------------- | -------- | ---------------------------------------------------------------------------------------- | ------- |
| F-01 | Dialog semantics & focus         | High     | `src/components/modals/SimpleModal.tsx`                                                  | ❌ Open |
| F-02 | Pagination roles & announcements | High     | `src/components/navigation/Pagination.tsx`                                               | ❌ Open |
| F-03 | Breadcrumb semantics             | Medium   | `src/components/navigation/Breadcrumbs.tsx`                                              | ❌ Open |
| F-04 | Icon-only affordances            | Medium   | `src/components/cards/EventCard.tsx`, `src/components/cards/VenueCard.tsx`, section CTAs | ❌ Open |
| F-05 | Landmark labeling                | Medium   | `src/components/layout/Navbar.tsx`, `sections/*` wrappers                                | ❌ Open |
| F-06 | Focus-visible consistency        | Medium   | Custom overlays, icon buttons, pagination items                                          | ❌ Open |
| F-07 | Automated testing gaps           | High     | Jest suite + CI                                                                          | ❌ Open |
| F-08 | Contrast validation tooling      | High     | Token palette usage                                                                      | ❌ Open |
| F-09 | Accessibility guidelines         | Medium   | Documentation gap                                                                        | ❌ Open |

---

## 3. Detailed Findings & Recommendations

### F-01 SimpleModal lacks dialog semantics & focus trap (High)

```
src/components/modals/SimpleModal.tsx
25:    <div className="fixed inset-0 z-50 flex items-center justify-center" {...rest}>
27:      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-label="Close modal" role="button" tabIndex={0}>
39:      <div className={cn("relative mx-4 w/full max-w-md rounded-lg border bg-card shadow-lg", className)}>
```

- Overlay is treated as a button and steals focus, but container never receives `role="dialog"`/`aria-modal="true"` nor focus on open.
- No `aria-labelledby`/`aria-describedby` wiring, focus trap, or Escape handling on the dialog itself.
- Recommendation: wrap content in dialog semantics, move keyboard handlers to the dialog, trap focus (portal or `focus-trap-react`), and ensure initial focus is set to the modal container. Overlay should be `aria-hidden="true"` and not tabbable.

### F-02 Pagination buttons missing roles & announcements (High)

```
src/components/navigation/Pagination.tsx
51:      <button onClick={() => onPageChange(currentPage - 1)} ...>
59:      {getVisiblePages().map(... (
64:            <button onClick={() => onPageChange(page as number)} className={cn(...)}>{page}</button>
79:      <button onClick={() => onPageChange(currentPage + 1)} ...>
```

- Pagination container `<nav>` lacks `aria-label`.
- Buttons contain only numbers or chevron icons (no accessible name) and do not expose `aria-current="page"` or `aria-disabled`.
- Keyboard focus indicators rely on default button styles; no `focus-visible` outline.
- Recommendation: add `aria-label` to `<nav>`, set `aria-current`, `aria-label="Go to page X"`, mark ellipsis as `aria-hidden="true"`, and wire arrow buttons with `aria-label="Previous page"`, `aria-disabled`.

### F-03 Breadcrumbs do not use list semantics or labels (Medium)

```
src/components/navigation/Breadcrumbs.tsx
19:    <nav className={cn("flex items-center ...", className)}>
20:      {items.map(... (
22:          {index > 0 && <ChevronRight ... />}
```

- Breadcrumb nav missing `aria-label` and ordered list semantics. Screen readers read inline text without context, and separators are announced as "Chevron right".
- Recommendation: wrap trail in `<ol>` and `<li>`, set `aria-label="Breadcrumb"`, mark separators `aria-hidden`, and apply `aria-current="page"` to final crumb.

### F-04 Decorative icons voiced as text (Medium)

- `EventCard` and `VenueCard` inline SVGs lack `aria-hidden="true"` (e.g., date/location icons in `EventCard` lines 123-168).
- Some CTAs embed arrow icons without `aria-hidden` and without `aria-label` for the button/link.
- Recommendation: mark decorative SVGs with `aria-hidden="true"` and, when icon-only, provide `aria-label`/sr-only text.

### F-05 Landmark labeling gaps (Medium)

- `Navbar` exports a bare `<nav>` with no way to pass `aria-label`, making multiple nav instances indistinguishable.
- Several section components (e.g., `sections/HeroSection.tsx`, `sections/FeatureSection.tsx`) rely purely on heading text without ARIA attributes to describe their role.
- Recommendation: allow `Navbar`/section wrappers to accept `aria-label` and default to descriptive strings; add `role="region"` + `aria-labelledby` when an internal heading exists.

### F-06 Focus-visible styling inconsistent (Medium)

- Custom controls such as pagination numbers, FilterBar chips, Consents, and SearchFilters toggles use Tailwind classes without `focus-visible:ring` or token-driven outlines, so keyboard users may lose track of focus.
- Recommendation: introduce shared focus utilities (e.g., `focus-outline` based on `--focus-ring-primary`) and apply to every `button`, `Link`, or interactive `div`.

### F-07 No automated a11y coverage (High)

- `package.json` exposes only `jest` & `lint` scripts; there are no axe, keyboard, or accessibility-specific tests.
- Storybook isn't configured with `@storybook/addon-a11y`.
- GitHub Actions workflows (`storybook-deploy.yml`, `release.yml`) run build/lint only, so regressions ship silently.
- Recommendation: add `jest-axe` tests per component, script (e.g., `pnpm test:a11y`), and ensure workflows execute them.

### F-08 Contrast validation tooling missing (High)

- Token palette (`src/tokens/colors.ts`) defines numerous semantic pairs, but there is no automation ensuring combinations (e.g., `text-muted` on `surface-elevated2`) meet WCAG 2.1 AA.
- Recommendation: build `scripts/a11y-contrast-check.js` to parse exported tokens, compute contrast via `wcag-contrast`, and fail CI when new tokens/combos drop below thresholds.

### F-09 Accessibility guidelines absent (Medium)

- Repository lacks `docs/a11y_guidelines.md` or similar references, so contributors receive no guidance on expected ARIA roles, keyboard handling, or focus behaviors.
- Recommendation: author a dedicated guideline that references tokenized focus styles, lists required props for icon buttons, and includes a checklist for new components.

---

## 4. Next Steps

1. Implement fixes for F-01 → F-06 directly in the component source (Step 3 of U6).
2. Add automated tests + contrast tooling (Step 4).
3. Document guidelines and enforce through CI (Steps 5–6).
4. Update `docs/PROJECT_PROGRESS.md` & `master_tasks.json` once remediation + automation are complete.

---

**Status:** Audit completed, remediation pending (tracked under U6).  
**Owner:** Upgrade Layer – Accessibility & Testing stream.
