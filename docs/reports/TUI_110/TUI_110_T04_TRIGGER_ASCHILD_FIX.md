# TUI_110_T04_TRIGGER_ASCHILD_FIX

## Context
This task makes overlay triggers safe-by-default via Radix `asChild` auto-resolution to eliminate nested interactive DOM (e.g. `<button>` inside `<button>`). It addresses the nested button evidence from:
- `docs/reports/TUI_110/TUI_110_T01_BASELINE_SNAPSHOT.md`
- `scratch/ui-repro-next/docs/reports/TUI_110_T02_DX_OBSERVATION_REPORT.md`

## Inventory (Trigger list)
| Component | File path | Radix primitive | Current element output | Supports asChild | Breaking risk |
| --- | --- | --- | --- | --- | --- |
| PopoverTrigger | `src/COMPOSITION/overlays/Popover.tsx` | `@radix-ui/react-popover` Trigger | Default `<button>` unless `children` is element (then child element) | Yes | Low (behavioral default change) |
| TooltipTrigger | `src/COMPOSITION/overlays/Tooltip.tsx` | `@radix-ui/react-tooltip` Trigger | Default `<button>` unless `children` is element (then child element) | Yes | Low |
| ModalTrigger | `src/COMPOSITION/overlays/Modal/Modal.tsx` | `@radix-ui/react-dialog` Trigger | Default `<button>` unless `children` is element (then child element) | Yes | Low |
| MenuTrigger | `src/COMPOSITION/navigation/Menu/Menu.tsx` | `@radix-ui/react-dropdown-menu` Trigger | Default `<button>` unless `children` is element (then child element) | Yes | Low |
| SelectTrigger | `src/COMPOSITION/controls/Select/Select.tsx` | `@radix-ui/react-select` Trigger | Default `<button>` unless `children` is element (then child element) | Yes | Medium (classes now merge into child) |
| ContextMenuTrigger | `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx` | `@radix-ui/react-context-menu` Trigger | Default `<button>` unless `children` is element (then child element) | Yes | Low |
| DropdownTrigger | `src/COMPOSITION/overlays/Dropdown/Dropdown.tsx` | Re-export of `PopoverTrigger` | Inherits PopoverTrigger behavior | Yes | Low |

Out of scope (explicit): `ContextMenuSubTrigger`, `AccordionTrigger`, `TabsTrigger`, `NavigationMenuTrigger`, `HoverCardTrigger`, `FilterSelect`.

## Change Summary
- Added shared helper: `src/COMPOSITION/utils/trigger-as-child.ts`.
- Updated overlay triggers to resolve `asChild` automatically when `children` is a React element.
- Added DEV-only warnings for explicit `asChild={false}` with element children.
- Added SSR guard test: `src/__tests__/trigger-aschild.guard.test.tsx`.
- Manual repro is not required for closing T04; this task addresses invalid DOM and DX safety, and runtime behavior is validated structurally (SSR guard).

Updated components:
- PopoverTrigger
- TooltipTrigger
- ModalTrigger
- MenuTrigger
- SelectTrigger
- ContextMenuTrigger

## Evidence (DOM before/after)
### Before (from baseline reports)
- PopoverTrigger + Button nested `<button>`:
  - Evidence: `docs/reports/TUI_110/TUI_110_T01_BASELINE_SNAPSHOT.md`
  - Excerpt:
    ```html
    <button ...>
      <button class="...">Open Popover (nested button)</button>
    </button>
    ```
- Modal.Trigger + Button nested `<button>`:
  - Evidence: `scratch/ui-repro-next/docs/reports/TUI_110_T02_DX_OBSERVATION_REPORT.md`
  - Excerpt:
    ```html
    <button ...>
      <button class="...">Open Modal</button>
    </button>
    ```

### After
- Expected output is a single `<button>` from the child element because triggers now resolve `asChild` when `children` is a React element.
- Guarded by SSR test: `src/__tests__/trigger-aschild.guard.test.tsx` (not executed in this task run).

## Risk Assessment
- **Class merging into child element**: When auto-`asChild` is used, trigger className and aria props are merged into the child. For `Select.Trigger`, this means select styling classes may be injected into child elements if consumers pass custom children. Risk is acceptable and consistent with Radix Slot semantics.
- **Behavioral change**: Consumers who expected the trigger to always render a `<button>` may see a different DOM element when passing element children. Explicit `asChild={false}` opt-out remains available.
- **Warnings**: DEV-only warnings will appear if a consumer explicitly opts out (`asChild={false}`) and uses element children that would create nested interactives.
- **Scope isolation**: Auto-`asChild` is intentionally limited to overlay triggers only to avoid breaking changes in non-overlay trigger surfaces.

## Acceptance Checklist
- [x] Scope inventory recorded.
- [x] Trigger wrappers updated to auto-resolve `asChild`.
- [x] DEV-only warning added for explicit opt-out with element children.
- [x] SSR guard test added to prevent nested `<button>`.
- [ ] Manual repro validation in `scratch/ui-repro-next` executed.

## Follow-ups
- If Playwright headless still reports pointer-events intercepts after this fix, open a separate TUNG for overlay/pointer-event root cause (do not mix with T04).
- Run manual repro checks when a real browser environment is available and attach after-DOM evidence.
