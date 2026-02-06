# TUI_110_T07_CANONICAL_COMPOSITION_ENFORCEMENT

## Контекст
Цель — DEV-only enforcement канонической композиции без новых компонентов. PROD-поведение не меняем. Вся логика — предупреждения в точках, где библиотека реально контролирует композицию (`as`/`asChild`, слоты AppHeader).

## Дата/время
2026-02-06

## Выполненные команды
- `rg -n ...` (поиск по коду)
- `sed -n ...` (просмотр файлов)

## Summary of enforced rules
- Запрещено использовать `Box` с `as="nav" | "header" | "footer" | "main"` без канонического компонента.
- Запрещено использовать `NavRoot asChild` c `<nav>` (дублирует канонический путь).
- `AppHeader` предупреждает о невалидных дочерних элементах и дублирующихся слотах.
- Overlay trigger enforcement не менялся (T04–T05 стабилизировали это ранее).

## List of new canonical components or wrappers
- **Нет.** В этом TUNG новые компоненты не добавлялись.

## List of guards added
- `warnOnForbiddenSemanticElement` (DEV-only) в `runtime-guards.ts` (единственный helper, fallback message по канону).
- `Box` предупреждает при `as="nav"|"header"|"footer"|"main"` с точными каноническими сообщениями.
- `NavRoot` предупреждает при `asChild` с `<nav>` (message: `NavRoot already renders <nav>...`).
- `AppHeader` использует `devWarnOnce` для invalid children/multiple slots (без спама).
- Внутренний AppHeader рендер подавляет `Box`-warning через `data-semantic-guard="allow"` (чтобы канонический путь не шумел).

## Test coverage overview
- **Negative (warn)**: `src/__tests__/canonical-composition.guard.test.tsx`
  - `Box as="nav/header/footer/main"` → warn
  - `NavRoot asChild` + `<nav>` → warn
  - `AppHeader` invalid child → warn
  - `PopoverTrigger asChild={false}` + `<Button>` → warn (guard из T04)
- **Positive (no warn)**: `src/__tests__/canonical-composition.valid.test.tsx`
  - `NavRoot` canonical usage
  - `AppHeader` корректные слоты
  - `PopoverTrigger` с `Button` без `asChild={false}`

## Explicit statement of what is now impossible to do (DEV)
- Нельзя использовать `Box` с raw semantic `<nav>/<header>/<footer>/<main>` без предупреждения.
- Нельзя использовать `NavRoot asChild` с `<nav>` без предупреждения.
- Нельзя складывать в `AppHeader` произвольные дети без предупреждения.

## Before / After evidence
### Before
- DEV не сигнализировал о неправильном использовании `Box as="nav/header/footer/main"`.
- `NavRoot asChild` + `<nav>` не подсвечивалось.

### After
- DEV предупреждает точной формулировкой с одним каноническим компонентом.
- Для `<main>` — предупреждение без навязанного replacement.

## Guard wording rules (фиксированная политика)
- Каждый warning даёт **один** канонический путь (без «или»).
- `<main>` предупреждается без конкретного replacement.

## Out of scope (explicit)
- Любые runtime guards для Radix composition misuse.
- Guard на raw `<a>` внутри `NavItem` **не добавлялся** (риск false positives).
- Raw HTML вне библиотечных компонентов остаётся невидимым для runtime guard’ов.

## Files changed
- `src/COMPOSITION/utils/runtime-guards.ts`
- `src/COMPOSITION/layout/Box/Box.tsx`
- `src/COMPOSITION/navigation/NavRoot/NavRoot.tsx`
- `src/__tests__/canonical-composition.guard.test.tsx`
- `src/__tests__/canonical-composition.valid.test.tsx`
- `docs/reports/TUI_110/TUI_110_T07_CANONICAL_COMPOSITION_ENFORCEMENT.md`

## Remaining unknowns
- Raw semantic HTML вне компонентов библиотеки остаётся вне зоны контроля (по дизайну).
