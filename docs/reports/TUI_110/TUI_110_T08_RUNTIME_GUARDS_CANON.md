# TUI_110_T08_RUNTIME_GUARDS_CANON

## Контекст
Цель — зафиксировать канон runtime-guards: семантика определяется **только** runtime-строкой, а TypeScript **не** является источником истины для semantic-guards. Enforcement строго DEV-only, PROD — no-op.

## Дата/время
2026-02-06

## Выполненные команды
- `rg -n ...` (поиск по коду)
- `sed -n ...` (просмотр файлов)

## Что изменено в runtime-guards.ts
- Добавлен канонический header-comment с правилом: **TS ≠ source of truth**.
- `warnOnForbiddenSemanticElement` приведён к канону:
  - принимает `asTag: string | undefined` и `forbiddenTags: readonly string[]`.
  - использует DEV-only guard.
  - default message формируется внутри helper.

## Канонические правила (зафиксировано)
- Semantic-guards работают **только** через runtime string extraction (`as`/`asChild`/`child.type`).
- Никаких сравнений типизированных компонентов.
- Никаких TS-хаков или расширений типов ради семантики.
- DEV-only warnings, PROD no-op.
- Enforcement только в точках контроля композиции.

## Где сознательно игнорируется TS
- Внутри guards значения приводятся к `string | undefined` через runtime extraction, а не через типовые сравнения.
- TS не используется для вывода семантики; это отдельный runtime слой.

## Тестовое подтверждение
- `src/__tests__/canonical-composition.guard.test.tsx`
  - Проверка default message helper через runtime string path.
  - Проверка, что в PROD warnings не срабатывают.

## Files changed
- `src/COMPOSITION/utils/runtime-guards.ts`
- `src/__tests__/canonical-composition.guard.test.tsx`
- `docs/reports/TUI_110/TUI_110_T08_RUNTIME_GUARDS_CANON.md`

## Remaining unknowns
- Нет. Канон зафиксирован и протестирован.
