# ♿ Tenerife UI Accessibility Guidelines

**Last updated:** 2025-11-26  
**Maintainer:** Upgrade Layer – Task U6

These guidelines describe the patterns every Tenerife UI component **must** follow to meet WCAG 2.1 AA accessibility standards. Refer to this document before building or reviewing components, stories, and docs.

---

## 1. Semantic Roles & Naming

| Component type         | Required element/role                                                                 | Notes                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Buttons & icon buttons | Native `<button>` or role="button" with `tabIndex={0}`                                | Icon-only buttons **must** set `aria-label` or render `sr-only` text.                                                               |
| Links                  | `<a>` with valid `href`                                                               | Use `rel="noopener noreferrer"` for external targets.                                                                               |
| Pagination             | `<nav aria-label="Pagination">` + buttons with `aria-label` and `aria-current="page"` | Ellipses should be `aria-hidden`.                                                                                                   |
| Breadcrumbs            | `<nav aria-label="Breadcrumb">` → ordered list `<ol>` and `<li>`                      | Last crumb must expose `aria-current="page"`.                                                                                       |
| Dialogs/Modals         | `<div role="dialog" aria-modal="true">` or Radix Dialog                               | Link `aria-labelledby` + `aria-describedby`; trap focus and close on Escape.                                                        |
| Tooltips/Popovers      | Radix primitives with `role="tooltip"`                                                | Do **not** trap focus; tooltips are hover/focus only, popovers follow menu-button patterns.                                         |
| Menus                  | Radix primitives (`@radix-ui/react-dropdown-menu`, `@radix-ui/react-navigation-menu`) | If building custom navigation, follow [WAI-ARIA menu button design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/). |

---

## 2. Keyboard Interaction Patterns

| Pattern                          | Keys                                                   | Implementation notes                                                           |
| -------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Activation                       | `Enter` or `Space`                                     | Buttons, pagination controls, icon toggles.                                    |
| Escape                           | `Escape`                                               | Close dialogs, popovers, tooltips with close affordance.                       |
| Roving focus lists (Tabs, Menus) | `ArrowLeft/Right` or `ArrowUp/Down`, `Home/End`        | Already handled by Radix; expose `aria-controls` when building custom widgets. |
| Pagination tab order             | `Tab` to previous → page numbers → next                | Focus order must match visual order; use the shared focus ring utility.        |
| Modal focus trap                 | First focusable element → cycle with `Shift+Tab`/`Tab` | Radix Dialog inside `SimpleModal` enforces this automatically.                 |

**Testing:** Simulate the patterns above with `@testing-library/user-event` (see `Pagination.a11y.test.tsx` and `SimpleModal.a11y.test.tsx` for examples).

---

## 3. Focus Styles

- Use the shared utility class from `src/lib/a11y.ts`:

  ```ts
  import { focusRing } from "@/lib/a11y";
  <button className={cn(baseClasses, focusRing)} />
  ```

- The utility expands to `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` which maps to the tokenized ring color (`--ring`) and respects `--focus-ring-*` variables declared in `src/tokens/shadows.ts`.
- Never remove outlines without providing an equal or better visible indicator.

---

## 4. Color & Contrast

- Color tokens live in `src/tokens/colors.ts`. Primary semantics:
  - Surfaces: `surfaceColors`
  - Text: `textColors`
  - Semantic states: `semanticColors`
- Use token pairs only; never hardcode `#hex` colors in components or stories.
- Run `pnpm a11y:contrast` (script: `scripts/a11y-contrast-check.js`) whenever tokens change. The script imports the token module, computes luminance, and fails if any curated pair drops below **4.5:1**.
- When adding a new semantic combination, append it to `contrastPairs` and update the guidelines.

---

## 5. ARIA Conventions

- **Icon-only controls**: provide `aria-label` or `aria-labelledby`. Decorative SVGs must set `aria-hidden="true"` (see `EventCard.tsx` / `VenueCard.tsx` examples).
- **Dynamic status messaging**: use `aria-live="polite"` for inline toasts/banners when necessary.
- **Form inputs**: prefer `<label htmlFor>` patterns; when label text is hidden, keep it accessible via `sr-only`.
- **ARIA attributes must reflect reality**: avoid redundant roles on native elements (e.g., no `role="button"` on `<button>`).

---

## 6. Testing & Tooling

- `pnpm test:a11y` – runs Jest suites ending with `.a11y.test.tsx` to enforce keyboard and axe checks.
- `pnpm a11y:contrast` – verifies WCAG AA contrast for curated token pairs.
- `pnpm ci:a11y` – convenience alias that runs both commands; wired into CI (see §7).
- Unit tests must:
  - Render component with realistic props.
  - Run `axe` from `jest-axe` against the rendered output or `document.body`.
  - Simulate keyboard usage with `userEvent`.

---

## 7. CI Requirements

- Every PR must execute `pnpm ci:a11y`. The GitHub workflow blocks merges on failures.
- Storybook reviewers should enable the `@storybook/addon-a11y` panel (configured globally) to catch live issues.

---

## 8. Compliance Checklist

Before shipping a component, ensure:

1. [ ] Semantic element/role is correct for its purpose.
2. [ ] All interactive elements are reachable via `Tab` and activatable via `Enter`/`Space`.
3. [ ] Focus-visible styling uses the shared `focusRing` utility or equivalent tokenized outline.
4. [ ] Icon-only controls expose accessible names; decorative icons are `aria-hidden`.
5. [ ] Color pairs use tokens and pass `pnpm a11y:contrast`.
6. [ ] Axe tests exist (or component is covered by an existing suite) and pass.
7. [ ] Storybook stories include accessibility notes/controls (see `docs/reports/accessibility_audit_report.md`).
8. [ ] Documentation references this guideline or explains deviations.

---

Following these guidelines keeps Tenerife UI compliant with WCAG 2.1 AA while giving engineers a repeatable workflow for future components. Direct questions or requested updates to the Upgrade Layer maintainers.
