# T06: DEV Telemetry — className / inline style

## 1. What is tracked
- Usage of `className` and `style`.
- Aggregated counters by zone and component.
- Rough classification of `className` by bucket types: spacing / layout / positioning / typography / color / other.

## 2. Where tracking is attached
**Only control points (guard points) where className/style exist:**
- `src/COMPOSITION/layout/Box/Box.tsx` (Box)
- `src/COMPOSITION/navigation/NavRoot/NavRoot.tsx` (NavRoot)
- `src/COMPOSITION/overlays/Modal/Modal.tsx` (Modal.Trigger)
- `src/COMPOSITION/overlays/Popover.tsx` (Popover.Trigger)
- `src/COMPOSITION/overlays/Tooltip.tsx` (Tooltip.Trigger)
- `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx` (ContextMenu.Trigger)
- `src/COMPOSITION/navigation/Menu/Menu.tsx` (Menu.Trigger)
- `src/COMPOSITION/controls/Select/Select.tsx` (Select.Trigger)

**Not connected (no callingName/style in public props):**
- `src/COMPOSITION/layout/AppHeader/AppHeader.tsx` (AppHeader)

## 3. Data collected (example output)
Observations are recorded in a separate report with a snapshot from Storybook.

**Status:** Data collected. See `docs/reports/classname-inline-style-governance/T07_real_telemetry_snapshot.md`.

## 4. Observations
- Real observations are recorded in T07 (see item 3).

## 5. Clear non-conclusions
- No conclusions about the admissibility of className/style have been made.
- No decisions on enforcement have been made.

## 6. Open questions
- None. Real snapshot recorded in T07.
