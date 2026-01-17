# ADR: Disabled Semantic Tokens (runtime)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** Accepted and Implemented  
**Decision:** В рантайме используются явные disabled‑токены

---

## Контекст

В UI есть состояние disabled, которое должно быть доступно как явные токены, а не как opacity‑трюк. Это необходимо для доступности и стабильной семантики.

---

## Реальное состояние

В текущем рантайме выставляются:

- `--tm-disabled`
- `--tm-disabled-foreground`

Источники:
- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/theme/applyMode.ts`

---

## Что это НЕ означает

- Это **не означает**, что полный Theme Contract v1 включён в рантайм.
- Реестр `required-tokens.ts` остаётся build‑time/contract референсом.

---

## Rationale

- Прозрачность через opacity не даёт стабильной семантики
- Disabled должен быть контролируемым цветом
- Лучше для WCAG и enterprise‑требований

---

## Проверка факта

- `src/FOUNDATION/theme/applyMode.ts` (установка CSS‑переменных)
- `src/FOUNDATION/tokens/colors.ts` (значения для disabled)
