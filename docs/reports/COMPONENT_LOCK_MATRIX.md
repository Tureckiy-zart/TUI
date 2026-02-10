# Component Lock Matrix — @tenerife.music/ui

**Task ID:** TUI_RELEASE_READINESS_AUDIT_001  
**Date:** 2026-02-05  
**Source of Truth:** `docs/reports/LOCK_PIPELINE_COVERAGE_REPORT.md` (2026-01-01)

---

## Foundation Layer (LOCKED)

| Component | Path | Lock Status | Evidence |
| --- | --- | --- | --- |
| Button | `src/PRIMITIVES/Button/Button.tsx` | FINAL LOCK | Baseline + `BUTTON_FOUNDATION_LOCK_REPORT.md` |
| Link | `src/PRIMITIVES/Link/Link.tsx` | LOCKED | Baseline + `LINK_FOUNDATION_LOCK_REPORT.md` |
| Text | `src/PRIMITIVES/Text/Text.tsx` | LOCKED | Baseline |
| Input | `src/PRIMITIVES/Input/Input.tsx` | LOCKED | Baseline + `INPUT_FOUNDATION_LOCK_REPORT.md` |
| Heading | `src/PRIMITIVES/Heading/Heading.tsx` | LOCKED | Baseline |
| Icon | `src/PRIMITIVES/Icon/Icon.tsx` | LOCKED | Baseline |
| Label | `src/PRIMITIVES/Label/Label.tsx` | LOCKED | Baseline |
| Checkbox | `src/PRIMITIVES/Checkbox/Checkbox.tsx` | PROCESS LOCKED | Baseline |
| Radio | `src/PRIMITIVES/Radio/Radio.tsx` | LOCKED | Baseline |
| Switch | `src/PRIMITIVES/Switch/Switch.tsx` | LOCKED | Baseline |
| Textarea | `src/PRIMITIVES/Textarea/Textarea.tsx` | LOCKED | Baseline |
| Select | `src/COMPOSITION/controls/Select/Select.tsx` | LOCKED | Baseline |
| Tabs | `src/COMPOSITION/navigation/tabs/Tabs.tsx` | LOCKED | Baseline |
| Toast | `src/COMPOSITION/overlays/Toast.tsx` | LOCKED | Baseline |

---

## Extension Layer (PROCESS LOCKED)

Representative subset (full list in lock coverage report):

| Component | Path | Lock Status | Evidence |
| --- | --- | --- | --- |
| Alert | `src/PRIMITIVES/Alert/Alert.tsx` | PROCESS LOCKED | Baseline |
| Badge | `src/PRIMITIVES/Badge/Badge.tsx` | PROCESS LOCKED | Baseline |
| Skeleton | `src/PRIMITIVES/Skeleton/Skeleton.tsx` | PROCESS LOCKED | Baseline |
| Modal | `src/COMPOSITION/overlays/Modal/Modal.tsx` | PROCESS LOCKED | Baseline + `MODAL_FOUNDATION_LOCK_REPORT.md` |
| Tooltip | `src/COMPOSITION/overlays/Tooltip.tsx` | PROCESS LOCKED | Baseline + `TOOLTIP_POPOVER_FOUNDATION_LOCK_REPORT.md` |
| Popover | `src/COMPOSITION/overlays/Popover.tsx` | PROCESS LOCKED | Baseline |
| Avatar | `src/COMPOSITION/controls/Avatar/Avatar.tsx` | PROCESS LOCKED | Baseline |
| Box | `src/COMPOSITION/layout/Box/Box.tsx` | LOCKED | Baseline |
| Stack | `src/COMPOSITION/layout/Stack/Stack.tsx` | LOCKED | Baseline |
| Grid | `src/COMPOSITION/layout/Grid/Grid.tsx` | LOCKED | Baseline |
| Surface | `src/COMPOSITION/layout/Surface/Surface.tsx` | LOCKED | Baseline |
| Breadcrumbs | `src/COMPOSITION/navigation/breadcrumbs/` | PROCESS LOCKED | Baseline |
| Pagination | `src/COMPOSITION/navigation/pagination/` | LOCKED | Baseline |
| Stepper | `src/COMPOSITION/navigation/stepper/` | PROCESS LOCKED | Baseline |
| HoverCard | `src/PATTERNS/menus/hover-card/` | PROCESS LOCKED | Baseline |
| Table | `src/PATTERNS/tables/table/Table.tsx` | PROCESS LOCKED | Baseline |
| EmptyState | `src/PATTERNS/states/EmptyState/` | PROCESS LOCKED | Baseline |

---

## Created via C0–C10 Pipeline (Not 18A Refactor)

| Component | Path | Status | Evidence |
| --- | --- | --- | --- |
| Accordion | `src/COMPOSITION/overlays/Accordion/` | CREATED | `docs/reports/creation/` |
| Chip | `src/COMPOSITION/overlays/Chip/` | CREATED | `docs/reports/creation/` |
| Combobox | `src/COMPOSITION/overlays/Combobox/` | CREATED | `docs/reports/creation/` |
| Drawer | `src/COMPOSITION/overlays/Drawer/` | CREATED | `docs/reports/creation/` |
| FileUpload | `src/COMPOSITION/overlays/FileUpload/` | CREATED | `docs/reports/creation/` |
| Footer | `src/COMPOSITION/layout/Footer/` | CREATED | `docs/reports/creation/` |
| MultiSelect | `src/COMPOSITION/controls/MultiSelect/` | CREATED | `docs/reports/creation/` |
| PageHeader | `src/COMPOSITION/layout/PageHeader/` | CREATED | `docs/reports/creation/` |
| ContentShell | `src/COMPOSITION/layout/ContentShell/` | CREATED | `docs/reports/creation/` |
| Spinner | `src/COMPOSITION/controls/Spinner/` | CREATED | `docs/reports/creation/` |

---

## Notes

- Some utility components (e.g., `ModalProvider`, `ToastProvider`, `ToastViewport`) are not covered by baseline reports and are not declared locked.
- Full coverage details and evidence links are in `docs/reports/LOCK_PIPELINE_COVERAGE_REPORT.md`.

