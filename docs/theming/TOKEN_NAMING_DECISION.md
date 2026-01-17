# Token Naming Decision (ADR) — current reality

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** Decision Record  
**Type:** Architecture Decision Record (Mini-ADR)

---

## Reality Check (важно)

- В рантайме **используется смесь legacy и `--tm-*` токенов**.
- `--tm-*` выставляются **частично** (primary/secondary/accent/disabled и др.).
- `required-tokens.ts` — **реестр для tooling**, а не источник для рантайма.

---

## Контекст

Нужен стабильный префикс для семантических CSS‑переменных. Выбран префикс `--tm-` (Tenerife Music). Решение остаётся валидным, но **в рантайме внедрено не полностью**.

---

## Решение

**Primary Prefix:** `--tm-`

**Причины:**
- brand‑tied
- короткий
- уже используется частично

---

## Текущая реализация (факты)

Что реально выставляется в рантайме:

- `--tm-primary`, `--tm-primary-foreground`
- `--tm-secondary`, `--tm-secondary-foreground`
- `--tm-accent`, `--tm-accent-foreground`
- `--tm-disabled`, `--tm-disabled-foreground`

Источник: `src/FOUNDATION/theme/applyMode.ts`

---

## Реестр required-tokens.ts

`src/FOUNDATION/tokens/required-tokens.ts` — реестр для build‑time tooling.  
Он **не отражает** текущий набор CSS‑переменных, выставляемых в рантайме.

---

## Правила именования (актуальные)

- Для новых семантических токенов — только `--tm-*`
- Суффикс `-foreground` — канонический
- Суффикс `-fg` — deprecated, не использовать в новом коде

---

## Где смотреть правду

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/tokens/required-tokens.ts`
