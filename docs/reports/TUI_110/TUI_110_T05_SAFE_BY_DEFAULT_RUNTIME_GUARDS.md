# TUI_110_T05_SAFE_BY_DEFAULT_RUNTIME_GUARDS

## Context
Цель — убрать silent misuse для **custom context hooks** и обеспечить safe-by-default поведение: DEV должен падать с понятной ошибкой, PROD — не ломать приложение. Radix composition misuse в этом TUNG не трогаем (out-of-scope).

## Guard Inventory (component → guard type → behavior)
| Component / Hook | Guard Type | DEV behavior | PROD behavior |
| --- | --- | --- | --- |
| `useModalContext` (`ModalProvider.tsx`) | Missing Provider / Context | Throw: "useModalContext must be used within a ModalProvider" | No-op fallback (safe) |
| `useNotificationCenterContext` (`NotificationCenter.Provider.tsx`) | Missing Provider / Context | Throw: "useNotificationCenterContext must be used within a NotificationCenterProvider" | No-op fallback (safe) |
| `useComboboxContext` (`Combobox.tsx`) | Missing Provider / Context | Throw: "Combobox components must be used within ComboboxRoot" | No-op fallback (safe) |
| `useSegmentedControlContext` (`SegmentedControl.tsx`) | Missing Provider / Context | Throw: "SegmentedControl components must be used within SegmentedControl.Root" | No-op fallback (safe) |
| `useCarouselContext` (`Carousel.context.tsx`) | Missing Provider / Context | Throw: "Carousel compound components must be used within Carousel.Root" | No-op fallback (safe) |
| `useOverlaySlotContext` (`OverlaySlot.context.tsx`) | Missing Provider / Context | Throw: "OverlaySlot compound components must be used within OverlaySlot.Root" | No-op fallback (safe) |
| `useHeroMediaContext` (`HeroMedia.context.tsx`) | Missing Provider / Context | Throw: "HeroMedia compound components must be used within HeroMedia.Root" | No-op fallback (safe) |

## Before / After (behavior examples)
### Before
- Любой missing provider приводил к `throw new Error(...)` **в dev и prod**.

### After
- **DEV**: точный throw с названием компонента и указанием нужного Provider/Root.
- **PROD**: безопасный no-op fallback (не ломает рендер), без скрытых throw.

## Exact DEV Messages
- `useModalContext must be used within a ModalProvider`
- `useNotificationCenterContext must be used within a NotificationCenterProvider`
- `Combobox components must be used within ComboboxRoot`
- `SegmentedControl components must be used within SegmentedControl.Root`
- `Carousel compound components must be used within Carousel.Root`
- `OverlaySlot compound components must be used within OverlaySlot.Root`
- `HeroMedia compound components must be used within HeroMedia.Root`

## Why This Guard Exists (1–2 sentences each)
- **ModalProvider**: отсутствие контекста ломает управление модалками; dev error делает misuse очевидным, prod fallback сохраняет стабильность.
- **NotificationCenter**: уведомления должны быть безопасны при интеграции; отсутствие provider не должно падать в проде.
- **Combobox / SegmentedControl / Carousel / OverlaySlot / HeroMedia**: compound компоненты требуют Root для состояния и управления; guard устраняет silent failure и делает контракт явным.

## Confirmation: PROD Unaffected
- В production окружении контекст‑хуки возвращают безопасные no‑op значения и не бросают исключения.

## Out of Scope (explicit)
- Любые guards для Radix composition misuse (Trigger/Content вне Root) **не выполнялись** в этом TUNG.

## Tests Added
- `src/__tests__/runtime-guards.test.tsx`:
  - DEV: проверка `throw` при missing provider
  - PROD: проверка отсутствия throw + SSR renderToString
  - Исключено: `Combobox.Input` без Root, т.к. это вызывает Radix guard для Popover (out-of-scope в этом TUNG).

## Files Changed
- `src/COMPOSITION/utils/runtime-guards.ts`
- `src/COMPOSITION/overlays/ModalProvider/ModalProvider.tsx`
- `src/DOMAIN/notifications/NotificationCenter.Provider.tsx`
- `src/COMPOSITION/overlays/Combobox/Combobox.tsx`
- `src/COMPOSITION/navigation/segmented-control/SegmentedControl.tsx`
- `src/COMPOSITION/carousel/Carousel/Carousel.context.tsx`
- `src/COMPOSITION/overlay/OverlaySlot/OverlaySlot.context.tsx`
- `src/COMPOSITION/hero/HeroMedia/HeroMedia.context.tsx`
- `src/__tests__/runtime-guards.test.tsx`
