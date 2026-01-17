# Theme Extension Contract (runtime)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** CURRENT (runtime implementation)  
**Purpose:** Как расширяется тема в текущем коде

---

## Ключевая реальность

Сейчас расширение темы происходит **через бренды и оверрайды** в `src/themes/*`, а не через CSS‑файлы тем.

- Бренды загружаются через `brand_engine`
- Оверрайды применяются в `applyDocumentTheme()`
- CSS‑файлы из `src/EXTENSIONS/themes/` не используются

---

## Как добавить новый бренд (фактический путь)

1) Создать файл в `src/themes/` (например, `ocean.ts`).
2) Описать `ThemeOverride` (цветовые шкалы и семантические токены).
3) Зарегистрировать бренд в `ThemeProvider` (как это сделано для `neon` и `minimal`).
4) Указывать бренд через `setBrand(brandId)`.

**Кодовые точки:**
- `src/themes/brand_engine.ts`
- `src/themes/types.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`

---

## Какие токены реально задействованы

`updateCSSVariablesFromTokens()` выставляет набор legacy и semantic токенов, включая:

- `--background`, `--foreground`, `--border`, `--ring`, …
- `--surface-*`, `--text-*`, `--semantic-*`
- `--primary-*`, `--secondary-*`, `--accent-*`
- часть `--tm-*` (`--tm-primary`, `--tm-secondary`, `--tm-accent`, `--tm-disabled`, …)

Полный список — `src/FOUNDATION/theme/applyMode.ts`.

---

## Про `--tm-*` и extension‑tokens

`--tm-*` сейчас используются частично и задаются рантаймом.  
Клиентские `--tmx-*` токены **не используются** в рантайме по умолчанию и не проверяются.

Если хотите использовать свои CSS‑переменные, делайте это в продуктовой части и не полагайтесь на рантайм‑контракт.

---

## Что НЕ является текущей реальностью

- CSS‑файлы тем вида `theme.<palette>-<mode>.css`
- `data-theme="<palette>-<mode>"`
- обязательный parity‑check по CSS‑файлам тем

Эти вещи относятся к tooling/контракту и сейчас не управляют рантаймом.

---

## Где смотреть правду

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/themes/*`
