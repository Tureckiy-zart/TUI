# Theme System Architecture (runtime)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** CURRENT (runtime implementation)  
**Purpose:** Описывает **фактическую** архитектуру темы в текущем коде

---

## Ключевая реальность

Сейчас тема применяется **в рантайме** через JS и установку CSS‑переменных.  
CSS‑файлы тем (`theme.*.css`) в рантайме **не используются**.

---

## Каноническая модель (как есть в коде)

### Атрибуты DOM

`applyDocumentTheme()` выставляет атрибуты на `<html>`:

- `data-mode`: `day | night`
- `data-theme-name`: `default | dark | brand`
- `data-theme`: дублирует `data-mode` (используется как вторичный атрибут)
- `class="dark"`: ставится при `night` для Tailwind

### Источник токенов

Токены — это JS‑объекты в `src/FOUNDATION/tokens/*`.  
Они объединяются с оверрайдами темы/бренда и применяются в `updateCSSVariablesFromTokens()`.

### Применение токенов

`updateCSSVariablesFromTokens(mode)` синхронно выставляет CSS‑переменные:

- legacy переменные (`--background`, `--foreground`, `--border`, `--ring`, …)
- surface/text/semantic группы (`--surface-*`, `--text-*`, `--semantic-*`)
- color scales (`--primary-*`, `--secondary-*`, `--accent-*`)
- часть `--tm-*` токенов (`--tm-primary`, `--tm-secondary`, `--tm-accent`, `--tm-disabled`, …)

Полный список выставляемых переменных — в `src/FOUNDATION/theme/applyMode.ts`.

---

## ThemeProvider (runtime controller)

`ThemeProvider`:

- хранит `mode` (`day|night`) и `theme` (`default|dark|brand`)
- читает и пишет `localStorage` (`tm_mode`, `tm_theme`, `tm_brand`)
- вызывает `applyDocumentTheme()` при изменениях
- регистрирует дефолтные бренды (`neon`, `minimal`)

Файл: `src/FOUNDATION/theme/ThemeProvider.tsx`

---

## Темы и бренды

Темы/бренды описаны в `src/themes/*`:

- `default.ts`, `dark.ts`, `brand.ts`
- `neon.ts`, `minimal.ts`

Бренд‑оверрайды применяются через `src/themes/brand_engine.ts`.

---

## SSR и синхронная инициализация

Для ранней инициализации есть `initThemeSync()` в `applyMode.ts`:

- читает `data-mode` или `localStorage`
- синхронно выставляет CSS‑переменные
- применяется до первого рендера

`ThemeProvider` — client‑only компонент.

---

## Theme Contract v1 и registry

`src/FOUNDATION/tokens/required-tokens.ts` — реестр для tooling/контракта.  
Он **не используется** как источник для рантайм‑выставления токенов.

---

## Где смотреть правду

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/FOUNDATION/tokens/*`
- `src/themes/*`
