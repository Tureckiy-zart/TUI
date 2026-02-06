# TUI_110_T06_CANONICAL_USAGE_PATTERNS

## Component-by-component canonical patterns
Canonical doc: `docs/reference/CANONICAL_USAGE_PATTERNS.md`

Covered components:
- Popover
- Tooltip
- Modal / Dialog
- Drawer
- Select
- Menu (DropdownMenu)
- AppHeader
- Button (as trigger)
- Link (as trigger)

## Trigger composition rules
- Trigger uses `asChild` automatically when child is a React element.
- Nested interactive elements are forbidden (no `<button>` inside `<button>`).
- Use `Button` for trigger styling; use `Link` when navigation semantics are required.

## Provider placement rules
- `ModalProvider` only when using `useModalContext`.
- `NotificationCenterProvider` only when using `useNotificationCenterContext`.

## Explicitly discouraged patterns
- Explicit `asChild={false}` with interactive child (creates nested interactive DOM).
- Naive `<Select>` usage with `<option>` (invalid API usage; TS error).
- Invalid `AppHeader` children (only `AppHeader.Brand/Nav/Actions` allowed).
- Calling `useModalContext` / `useNotificationCenterContext` without Provider.

## Mapping: misuse → runtime guard / error
| Misuse | Guard / Error | Source |
| --- | --- | --- |
| `PopoverTrigger asChild={false}` + `Button` | DEV warning: nested interactive | `src/COMPOSITION/utils/trigger-as-child.ts` |
| Naive `<Select>` usage | TS error: `Select` is not a JSX component | TUI_110_T02 evidence |
| `AppHeader` invalid child | DEV warning: invalid child / multiple slots | `src/COMPOSITION/layout/AppHeader/AppHeader.tsx` |
| `useModalContext` without Provider | DEV throw: must be used within ModalProvider | `src/COMPOSITION/overlays/ModalProvider/ModalProvider.tsx` |
| `useNotificationCenterContext` without Provider | DEV throw: must be used within NotificationCenterProvider | `src/DOMAIN/notifications/NotificationCenter.Provider.tsx` |

## Confirmation: document matches current code
- All patterns are derived from current exports in `src/index.ts`.
- No speculative or future APIs documented.
- Radix composition misuse is **out-of-scope** and intentionally excluded.

## Files added/updated
- `docs/reference/CANONICAL_USAGE_PATTERNS.md`
- `docs/reports/TUI_110/TUI_110_T06_CANONICAL_USAGE_PATTERNS.md`
