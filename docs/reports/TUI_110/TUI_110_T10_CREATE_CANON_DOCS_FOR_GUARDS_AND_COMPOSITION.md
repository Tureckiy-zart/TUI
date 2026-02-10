# TUI_110_T10_CREATE_CANON_DOCS_FOR_GUARDS_AND_COMPOSITION

## Context
Create missing canonical docs for guards/composition, link them in canonical inventory and README, and update master tasks. No runtime/code changes.

## Date/Time
2026-02-06

## Created Files (full paths)
- `docs/canon/RUNTIME_GUARDS_CANON.md`
- `docs/canon/TRIGGER_ASCHILD_SAFE_BY_DEFAULT.md`
- `docs/canon/CANONICAL_COMPOSITION_ENFORCEMENT.md`
- `docs/canon/CLASSNAME_POLICY_PLAN.md`
- `docs/canon/CANONICAL_DOCUMENTATION_INVENTORY.md` (pointer to root inventory)
- `docs/reports/TUI_110/TUI_110_T10_CREATE_CANON_DOCS_FOR_GUARDS_AND_COMPOSITION.md`

## Updated Files (full paths)
- `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`
- `docs/README.md`
- `.cursor/tasks/master/master_tasks_final_update.json`

## What Each New Doc Covers (short)
- `docs/canon/RUNTIME_GUARDS_CANON.md` — TS ≠ source of truth, runtime string extraction, DEV warn/throw, PROD no-op.
- `docs/canon/TRIGGER_ASCHILD_SAFE_BY_DEFAULT.md` — overlay trigger safe-by-default behavior and SSR nesting risk.
- `docs/canon/CANONICAL_COMPOSITION_ENFORCEMENT.md` — DEV warnings for semantic composition, control points, limitations, escape hatch.
- `docs/canon/CLASSNAME_POLICY_PLAN.md` — Zones A/B/C policy and rollout plan (policy only).

## Canon Index / README Linking
- Canon inventory updated in `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`.
- README reference links added in `docs/README.md`.

## Git Evidence
### `git status -sb`
```
## main...origin/main [впереди 4]
AM .cursor/tasks/master/master_tasks_final_update.json
M  .gitignore
M  CHANGELOG.md
 M docs/CANONICAL_DOCUMENTATION_INVENTORY.md
 M docs/README.md
A  docs/reference/CANONICAL_USAGE_PATTERNS.md
A  docs/reports/COMPONENT_LOCK_MATRIX.md
A  docs/reports/PUBLIC_API_AUDIT_REPORT.md
A  docs/reports/RELEASE_CLEARANCE.json
A  docs/reports/RELEASE_READINESS_REPORT.md
A  docs/reports/TOKEN_REALITY_AUDIT_vNEXT.md
A  docs/reports/TUI_110/TUI_110_T01_BASELINE_SNAPSHOT.md
A  docs/reports/TUI_110/TUI_110_T04_TRIGGER_ASCHILD_FIX.md
A  docs/reports/TUI_110/TUI_110_T05_SAFE_BY_DEFAULT_RUNTIME_GUARDS.md
A  docs/reports/TUI_110/TUI_110_T06_CANONICAL_USAGE_PATTERNS.md
A  docs/reports/TUI_110/TUI_110_T07_CANONICAL_COMPOSITION_ENFORCEMENT.md
A  docs/reports/TUI_110/TUI_110_T08_RUNTIME_GUARDS_CANON.md
M  src/COMPOSITION/carousel/Carousel/Carousel.context.tsx
M  src/COMPOSITION/controls/Select/Select.tsx
M  src/COMPOSITION/hero/HeroMedia/HeroMedia.context.tsx
M  src/COMPOSITION/layout/AppHeader/AppHeader.tsx
M  src/COMPOSITION/layout/AppHeader/__snapshots__/AppHeader.test.tsx.snap
M  src/COMPOSITION/layout/Box/Box.tsx
M  src/COMPOSITION/layout/Navbar/Navbar.tsx
M  src/COMPOSITION/navigation/Menu/Menu.tsx
M  src/COMPOSITION/navigation/NavRoot/NavRoot.tsx
M  src/COMPOSITION/navigation/segmented-control/SegmentedControl.tsx
M  src/COMPOSITION/overlay/OverlaySlot/OverlaySlot.context.tsx
M  src/COMPOSITION/overlays/Combobox/Combobox.tsx
M  src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx
M  src/COMPOSITION/overlays/Modal/Modal.tsx
M  src/COMPOSITION/overlays/ModalProvider/ModalProvider.tsx
M  src/COMPOSITION/overlays/Popover.tsx
M  src/COMPOSITION/overlays/Tooltip.tsx
A  src/COMPOSITION/utils/runtime-guards.ts
A  src/COMPOSITION/utils/trigger-as-child.ts
M  src/DOMAIN/notifications/NotificationCenter.Provider.tsx
A  src/__tests__/canonical-composition.guard.test.tsx
A  src/__tests__/canonical-composition.valid.test.tsx
A  src/__tests__/runtime-guards.test.tsx
A  src/__tests__/trigger-aschild.guard.test.tsx
M  src/index.ts
?? docs/canon/
?? docs/reports/TUI_110/TUI_110_T09_DOCS_SYNC_AFTER_GUARDS_AND_COMPOSITION.md
```

### `git diff --name-status`
```
M	.cursor/tasks/master/master_tasks_final_update.json
M	docs/CANONICAL_DOCUMENTATION_INVENTORY.md
M	docs/README.md
```

## What Was NOT Changed (Non-goals)
- No changes to runtime guard logic or component behavior.
- No className refactor in code.
- No new components or API changes.

## Notes
- Canon inventory remains authoritative at `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`.
- `docs/canon/CANONICAL_DOCUMENTATION_INVENTORY.md` is a pointer only.
