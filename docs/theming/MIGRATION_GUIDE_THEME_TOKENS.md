# Migration Guide: Theme Tokens (current state)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** CURRENT (migration-in-progress)  
**Purpose:** Отражает реальное состояние токенов и путь миграции

---

## Текущее состояние

Сейчас рантайм выставляет **и legacy токены**, и часть `--tm-*` токенов:

- legacy: `--background`, `--foreground`, `--border`, `--ring`, `--card`, `--popover`, …
- semantic TM (частично): `--tm-primary`, `--tm-secondary`, `--tm-accent`, `--tm-disabled`, …

Полный список выставляемых переменных находится в:
- `src/FOUNDATION/theme/applyMode.ts`

**Важно:** Полный набор `--tm-*` из `required-tokens.ts` **не выставляется** рантаймом.

---

## Что считается целью миграции

- единый набор семантических `--tm-*` токенов для всех визуальных слоёв
- отказ от legacy `--background`/`--foreground` в компонентах
- единая семантика и parity токенов

Это направление описано в `required-tokens.ts`, но **не реализовано полностью**.

---

## Практический смысл миграции

Если вы обновляете компонент:

1) **Предпочитайте `--tm-*`**, когда они уже выставляются рантаймом.
2) **Не удаляйте legacy‑использование**, если `--tm-*` ещё не покрывают нужную семантику.
3) Не вводите новые локальные переменные в компонентах — используйте токены.

---

## Реальные источники токенов

- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/tokens/spacing.ts`
- `src/FOUNDATION/tokens/radius.ts`
- `src/FOUNDATION/tokens/typography.ts`
- `src/FOUNDATION/theme/applyMode.ts`

---

## Пример корректного кода (реальность)

```tsx
// Хорошо: семантические токены (если они реально есть)
const Button = styled.button`
  background-color: hsl(var(--tm-primary));
  color: hsl(var(--tm-primary-foreground));
`;
```

```tsx
// Допустимо пока: legacy токены (если tm-эквивалента нет)
const Card = styled.div`
  background-color: var(--card);
  color: var(--card-foreground);
`;
```

---

## Отдельно про required-tokens.ts

`src/FOUNDATION/tokens/required-tokens.ts` — это реестр для tooling/контракта.  
Он **не является** полным источником для рантайма на данный момент.

---

## Где смотреть правду

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/FOUNDATION/tokens/*`
- `src/themes/*`
